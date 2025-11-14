import estilos from './BlobBot.module.css';

interface BlobBotProps {
  texto: string;
}

export function BlobBot({ texto }: BlobBotProps) {
  return (
    <div className={estilos.conteiner}>
      <p>{texto}</p>
    </div>
  );
}
