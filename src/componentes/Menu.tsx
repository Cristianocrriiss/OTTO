import estilos from './Menu.module.css';
import {Link} from 'react-router-dom'


type Props = {
  aberta: boolean;
};

export function Menu({ aberta }: Props) {
  return (
    <div className={`${estilos.gridConteiner} ${aberta ? estilos.aberta : ''}`}>
      
      <section className={estilos.conteinerBotoes}>

        <Link
          className={estilos.botao}
          to={'/'}
        >Boas vindas</Link>


        <Link
          className={estilos.botao}
          to={'funcionalidade1'}
        >Função 1</Link>

        <Link 
          className={estilos.botao}
          to={'funcionalidade2'}
        >Função 2</Link>

        <Link 
          className={estilos.botao}
          to={'funcionalidade3'}
        >Função 3</Link>

      </section>
      
    </div>
  );
}
