import estilos from './Menu.module.css';
import { NavLink } from 'react-router-dom';

type Props = {
  aberta: boolean;
};

export function Menu({ aberta }: Props) {
  return (
    <div className={`${estilos.gridConteiner} ${aberta ? estilos.aberta : ''}`}>
      
      <section className={estilos.conteinerBotoes}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            account_circle
          </span>
          <p className="roboto-regular">Login</p>
        </NavLink>

        <NavLink
          to="/inicial"
          end
          className={({ isActive }) =>
            isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            smart_toy
          </span>
          <p className="roboto-regular">ChatBot</p>
        </NavLink>

        <NavLink
          to="/inicial/funcionalidade1"
          className={({ isActive }) =>
            isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            menu_book
          </span>
          <p className="roboto-regular">(Função 1)</p>
        </NavLink>

        <NavLink
          to="/inicial/funcionalidade2"
          className={({ isActive }) =>
            isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            animated_images
          </span>
          <p className="roboto-regular">(Função 2)</p>
        </NavLink>

        <NavLink
          to="/inicial/funcionalidade3"
          className={({ isActive }) =>
            isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            text_fields_alt
          </span>
          <p className="roboto-regular">(Função 3)</p>
        </NavLink>

        <NavLink
          to="/inicial/sobre"
          className={({ isActive }) =>
            isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            info
          </span>
          <p className="roboto-regular">Sobre</p>
        </NavLink>

      
      </section>
      
    </div>
  );
}
