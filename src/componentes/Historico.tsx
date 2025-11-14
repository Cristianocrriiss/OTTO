import { useEffect, useState } from 'react';
import { firestoreDB } from '../firebase/firebaseConexao';
import { useAutenticacao } from '../contextos/AutenticacaoContexto';
import { collection, query, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
// Não se esqueça de criar este arquivo CSS
import estilos from './Historico.module.css'; 

// Tipo para os dados que esperamos do Firestore (baseado na sua print)
type MensagemFirestore = {
  content: string;
  metadata: {
    role: 'user' | 'assistant' | 'bot';
    timestamp: Timestamp;
  }
};

type ConversaInfo = {
  id: string;   // ex: "2025-10-18_21-41-51"
  titulo: string; // O texto da primeira mensagem
  data: string;   // Data formatada
};

export function Historico() {
  const { usuarioLogado } = useAutenticacao();
  const [conversas, setConversas] = useState<ConversaInfo[]>([]);
  const [carregando, setCarregando] = useState(true); // Começa true para mostrar o loading inicial

  useEffect(() => {
    // A função assíncrona é definida aqui
    const fetchConversas = async () => {
      setCarregando(true); // Liga o loading sempre que a busca iniciar

      // Verificação de usuário
      if (!usuarioLogado || !usuarioLogado.email) {
        console.log("Usuário não logado ou sem email, pulando busca.");
        setCarregando(false); // Desliga o loading
        setConversas([]); // Limpa conversas antigas se o usuário deslogar
        return; // Sai da função
      }

      try {
        // --- CORREÇÃO (baseada na sua última print) ---
        // O ID do documento no Firestore é o email completo do usuário.
        const userDocId = usuarioLogado.email;
        // --- FIM DA CORREÇÃO ---
        
        if (!userDocId) {
          setCarregando(false);
          return;
        }

        // Caminho para a sub-coleção de conversas do usuário
        const conversasRef = collection(firestoreDB, 'users', userDocId, 'conversations');
        
        // Query para ordenar da mais nova para a mais antiga
        const q = query(conversasRef, orderBy('created_at', 'desc'));
        
        const querySnapshot = await getDocs(q);

        const listaConversas = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const mensagensArray = data.messages as MensagemFirestore[];
          
          // Pega a primeira mensagem para usar como título
          let tituloPreview = "Conversa sem título";
          if (mensagensArray && mensagensArray.length > 0) {
            tituloPreview = mensagensArray[0].content;
          }

          // Formata a data
          const dataConversa = (data.created_at as Timestamp).toDate();
          const dataFormatada = dataConversa.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short'
          });

          return {
            id: doc.id, // O ID do documento (ex: "2025-10-18_...")
            titulo: tituloPreview.length > 35 ? tituloPreview.substring(0, 35) + '...' : tituloPreview,
            data: dataFormatada
          };
        });

        setConversas(listaConversas);

      } catch (error) {
        console.error("Erro ao buscar histórico: ", error);
        // Pode ser que o documento 'userDocId' não exista.
      }
      setCarregando(false); // Desliga o loading ao final (com sucesso ou erro)
    };

    fetchConversas(); // Chama a função
  }, [usuarioLogado]); // Dependência: Roda a função sempre que o 'usuarioLogado' mudar

  if (carregando) {
    return <div className={estilos.carregando}>Carregando...</div>;
  }

  // Renderização do componente
  return (
    <nav className={estilos.historicoContainer}>
      <p className={estilos.tituloHistorico}>Histórico</p>
      {conversas.length === 0 && !carregando && (
        <p className={estilos.semHistorico}>Nenhum chat salvo.</p>
      )}
      {conversas.map(conversa => (
        <NavLink
          key={conversa.id}
          // O link agora leva para a rota do chat, passando o ID da conversa
          to={`/inicial/chat/${conversa.id}`} 
          className={({ isActive }) => isActive ? `${estilos.link} ${estilos.ativo}` : estilos.link}
        >
          <span className={estilos.tituloLink}>{conversa.titulo}</span>
          <span className={estilos.dataLink}>{conversa.data}</span>
        </NavLink>
      ))}
    </nav>
  );
}