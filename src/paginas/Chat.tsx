import { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAutenticacao } from '../contextos/AutenticacaoContexto';
import estilos from './Chat.module.css';
import { TextBox as RawTextBox } from '../componentes/TextBox';
import { BlobUser } from "../componentes/BlobUser";
import { BlobBot } from "../componentes/BlobBot";

type LocalTextBoxProps = {
  onSend: (mensagem: string) => void | Promise<void>;
  disabled?: boolean;
};
function TextBox(props: LocalTextBoxProps) {
  const { onSend } = props;
  return <RawTextBox onSend={onSend} />;
}
import { firestoreDB } from '../firebase/firebaseConexao';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

import { sendChatMessage } from '../api/ottoAPI';
import type { ChatResponse } from '../api/ottoAPI';

// tipo que vem do Firestore 
type MensagemFirestore = {
  content: string;
  metadata?: any; 
  role?: string;  
  timestamp?: Timestamp; 
};

type MensagemLocal = { 
  texto: string, 
  tipo: 'usuario' | 'bot',
  conversationId?: string 
};

export function Chat() {
  const [mensagens, setMensagens] = useState<MensagemLocal[]>([]);
  const [carregando, setCarregando] = useState(false); 
  const [conversationId, setConversationId] = useState<string | undefined>(undefined); 
  
  const location = useLocation();
  
  const { chatId } = useParams<{ chatId: string }>(); 
  const { usuarioLogado } = useAutenticacao();

  const isInitialLoad = useRef(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  useEffect(() => {
    const fetchMensagens = async () => {
      if (!usuarioLogado || !usuarioLogado.email) {
        console.log("Usuário não logado, não posso buscar histórico.");
        setCarregando(false);
        return;
      }

      console.log(`Carregando histórico do chat: ${chatId}`);
      setCarregando(true);
      isInitialLoad.current = false; 
      
      try {
        const userDocId = usuarioLogado.email;        
        const chatDocRef = doc(firestoreDB, 'users', userDocId, 'conversations', chatId as string);
        
        const docSnap = await getDoc(chatDocRef);

        if (docSnap.exists()) {
          const chatData = docSnap.data();
          
          const msgsHistorico = (chatData.messages as MensagemFirestore[]).map((msg: MensagemFirestore) => {
            const roleLimpo = msg.role?.trim(); 
            const tipoMsg = (roleLimpo === 'user' ? 'usuario' : 'bot') as 'usuario' | 'bot';

            return {
              texto: msg.content,
              tipo: tipoMsg
            };
          });
          
          setMensagens(msgsHistorico);
          setConversationId(chatId); 
        } else {
          console.error("Chat não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao carregar mensagens: ", error);
      }
      setCarregando(false);
    };

    if (chatId) {
      fetchMensagens();
    }
  }, [chatId, usuarioLogado]); 

  useEffect(() => {
    if (isInitialLoad.current && !chatId && location.state?.mensagem) {
      isInitialLoad.current = false;
      handleEnviar(location.state.mensagem); 
    }
  }, [location.state, chatId]); 

  
  const handleEnviar = async (mensagem: string) => {
    if (!mensagem.trim() || !usuarioLogado?.email) return;
    
    const userMessage: MensagemLocal = { texto: mensagem, tipo: 'usuario' };
    
    setMensagens(prev => [...prev, userMessage]);
    setCarregando(true); // Inicia o loading para a resposta do bot

    try {
      const response: ChatResponse = await sendChatMessage(
        usuarioLogado.email,
        mensagem,
        conversationId 
      );

      if (response.conversation_id && response.conversation_id !== conversationId) {
        setConversationId(response.conversation_id);

      }

      const botMessage: MensagemLocal = { 
        texto: response.content, 
        tipo: 'bot',
        conversationId: response.conversation_id
      };
      
      setMensagens(prev => [...prev, botMessage]);

    } catch (error) {
      const errorMessage: MensagemLocal = { 
        texto: "Erro ao comunicar com o servidor. Verifique o console.", 
        tipo: 'bot' 
      };
      setMensagens(prev => [...prev, errorMessage]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={estilos.gridConteiner}>
      <div className={estilos.ScrollView}>
        <div className={estilos.mensagensContainer}>
          {carregando && mensagens.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>Carregando histórico...</p>
            </div>
          )}

          {mensagens.map((msg, index) => (
            msg.tipo === "usuario" ? (
              <BlobUser key={index} texto={msg.texto} />
            ) : (
              <BlobBot key={index} texto={msg.texto} />
            )
          ))}
          {carregando && mensagens.length > 0 && (
             <div style={{ textAlign: 'center', padding: '10px' }}>
              <p>OTTO está pensando...</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className={estilos.TextBox}>
        <TextBox onSend={handleEnviar} disabled={carregando} />
      </div>
    </div>
  );
}
