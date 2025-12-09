import estilos from './Header.module.css'
import logoOTTO from '../assets/OTTO LOGO.png'


type Props = {
  aoAbrirMenu: () => void;
};

export function Header({ aoAbrirMenu }: Props) {
  return (
    <div className={estilos.gridConteiner}>
      <button onClick={aoAbrirMenu} className={estilos.btnMenuLateral}>☰ </button>
      <div className={estilos.logoHeader}><img src={logoOTTO} alt="Logo OTTO"/></div>
      
    </div>
  );
}
