import estilos from './BlobUser.module.css';

interface BlobUserProps {
  texto: string;
}

export function BlobUser({ texto }: BlobUserProps) {
  return (
    <div className={estilos.conteiner}>
      <p>{texto}</p>
    </div>
  );
}
