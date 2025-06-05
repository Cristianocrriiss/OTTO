import estilos from './Header.module.css'


type Props = {
  aoAbrirMenu: () => void;
};

export function Header({ aoAbrirMenu }: Props) {
  return (
    <div className={estilos.gridConteiner}>
      <button onClick={aoAbrirMenu} className={estilos.btnLateral}>☰ </button>
      <h1>O.T.T.O</h1>
    </div>
  );
}

