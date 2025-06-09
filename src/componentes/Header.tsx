import estilos from './Header.module.css'

type Props = {
  aoAbrirMenu: () => void;
};

export function Header({ aoAbrirMenu }: Props) {
  return (
    <div className={estilos.gridConteiner}>
      <button onClick={aoAbrirMenu} className={estilos.btnMenuLateral}>☰ </button>
      <h1>OTTO</h1>
    </div>
  );
}
