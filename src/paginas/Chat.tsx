import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import estilos from './Chat.module.css';
import { TextBox } from '../componentes/TextBox';

export function Chat() {
  const [mensagens, setMensagens] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const mensagemInicial = location.state?.mensagem;
    if (mensagemInicial) {
      setMensagens([mensagemInicial]);
    }
  }, [location.state]);

  const handleEnviar = (mensagem: string) => {
    setMensagens((prev) => [...prev, mensagem]);
  };

  return (
    <div className={estilos.gridConteiner}>
      <div className={estilos.ScrollView}>
        {mensagens.map((msg, index) => (
          <div key={index} className={estilos.mensagem}>
            {msg}
          </div>
        ))}
      </div>

      <div className={estilos.TextBox}>
        <TextBox onSend={handleEnviar} />
      </div>
    </div>
  );
}
