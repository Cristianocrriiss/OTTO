import estilos from './BlobBot.module.css';
import ReactMarkdown from 'react-markdown';


interface BlobBotProps {
  texto: string;
}

export function BlobBot({ texto }: BlobBotProps) {
  return (
    <div className={estilos.conteiner}>
      <div className="markdown-container">
            <ReactMarkdown>{texto}</ReactMarkdown>
      </div>
    </div>
  );
}
