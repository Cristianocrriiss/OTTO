import { useRef, useState, useEffect } from 'react'
import type {FormEvent, KeyboardEvent} from 'react'
import estilos from './TextBox.module.css'

type TextBoxProps = {
  onSend?: (mensagem: string) => void;
  mensagemInicial?: string;
};

export function TextBox({ onSend, mensagemInicial }: TextBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mensagem, setMensagem] = useState(mensagemInicial || '')

  useEffect(() => {
    setMensagem(mensagemInicial || '')
    setTimeout(ajustarAltura, 0)
  }, [mensagemInicial])

  const ajustarAltura = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  };

  //Funções e tratativas para mandar mensagens ao apertar enter
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const texto = mensagem.trim();
    if (texto !== '') {
      onSend?.(texto)
      setMensagem('')

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Se a tecla for "Enter" E a tecla "Shift" NÃO estiver pressionada
    if (e.key === 'Enter' && !e.shiftKey) {
      // Impede que o "Enter" crie uma nova linha
      e.preventDefault() 
      
      // Encontra o formulário pai e o submete
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <div className={estilos.conteiner}>
      <form className={estilos.TextBox} onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          placeholder="Pergunte alguma coisa..."
          className={estilos.TextInput}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onInput={ajustarAltura}
          onKeyDown={handleKeyDown} 
          rows={1}
        />
        <button className={estilos.btnEnviar} type="submit">
          <span className="material-symbols-outlined" style={{ fontSize: '30px', color: 'white' }}>
            arrow_right_alt
          </span>
        </button>
      </form>
    </div>
  );
}