import estilos from './ChatBot.module.css'
import { TextBox } from '../componentes/TextBox'
import { useNavigate } from 'react-router-dom'

export function ChatBot() {
  const navigate = useNavigate();

    const handleEnviar = (mensagem: string) => {
    navigate('chat', {
      state: { mensagem },
    })
  }

  return (
    <div className={estilos.gridConteiner}>
      <h2 className="roboto-medium" style={{ color: 'var(--azul-escuro)' }}>
        Olá, professor!
      </h2>
      <div className={estilos.TextBox}>
        <TextBox onSend={handleEnviar} />
      </div>
    </div>
  );
}
