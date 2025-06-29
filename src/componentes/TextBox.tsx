import { useRef, useState } from 'react';
import estilos from './TextBox.module.css';

type TextBoxProps = { // props da mensagem
  onSend?: (mensagem: string) => void;
};

export function TextBox({ onSend }: TextBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mensagem, setMensagem] = useState('');

  const ajustarAltura = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleEnviar = () => {
    const texto = mensagem.trim();
    if (texto !== '') {
      onSend?.(texto); // chama a função passada da página anterior
      setMensagem('');
      ajustarAltura();
    }
  };

  return (
    <div className={estilos.conteiner}>
      <div className={estilos.TextBox}>
        <textarea
          ref={textareaRef}
          placeholder="Pergunte alguma coisa..."
          className={estilos.TextInput}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onInput={ajustarAltura}
          rows={1}
        />
        <button className={estilos.btnEnviar} onClick={handleEnviar}>
          <span className="material-symbols-outlined" style={{ fontSize: '30px', color: 'white' }}>
            arrow_right_alt
          </span>
        </button>
      </div>
    </div>
  );
}
