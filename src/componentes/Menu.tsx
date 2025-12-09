import estilos from './Menu.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAutenticacao } from '../contextos/AutenticacaoContexto';
import { Historico } from './Historico'; // Importação do Histórico

type Props = {
  aberta: boolean;
};

export function Menu({ aberta }: Props) {
  const { usuarioLogado, deslogar } = useAutenticacao();
  const navegacao = useNavigate();

  const handleLogout = async () => {
    const sucesso = await deslogar();
    if (sucesso) {
      navegacao('/');
    }
  };

  return (
    <div className={`${estilos.gridConteiner} ${aberta ? estilos.aberta : ''}`}>
      
      {usuarioLogado && (
        <section className={estilos.perfilConteiner}>
          <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>
            account_circle
          </span>
          <p className={estilos.emailUsuario}>{usuarioLogado.email}</p>
          <button onClick={handleLogout} className={estilos.botaoSair}>
            Sair
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              logout
            </span>
          </button>
        </section>
      )}

      
      {/* Componente de Histórico renderizado aqui */}
      {usuarioLogado && (
        <Historico />
      )}

      <section className={estilos.conteinerBotoes}>
        {!usuarioLogado && (
            <NavLink to="/" end className={({ isActive }) => isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao}>
              <span className="material-symbols-outlined">account_circle</span>
              <p>Login</p>
            </NavLink>
        )}

        <NavLink to="/inicial" end className={({ isActive }) => isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao}>
          <span className="material-symbols-outlined">smart_toy</span>
          <p>ChatBot</p>
        </NavLink>

        <NavLink to="/inicial/corrigirredacao" className={({ isActive }) => isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao}>
          <span className="material-symbols-outlined">auto_awesome</span>
          <p>Redações</p>
        </NavLink>
        
        <NavLink to="/inicial/planodeaula" className={({ isActive }) => isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao}>
          <span className="material-symbols-outlined">menu_book</span>
          <p>Plano de Aula</p>
        </NavLink>

        <NavLink to="/inicial/adaptadorconteudo" className={({ isActive }) => isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao}>
          <span className="material-symbols-outlined">text_fields_alt</span>
          <p>Adaptador de Conteúdo</p>
        </NavLink>

        <NavLink to="/inicial/sobre" className={({ isActive }) => isActive ? `${estilos.botao} ${estilos.ativo}` : estilos.botao}>
          <span className="material-symbols-outlined">info</span>
          <p>Sobre</p>
        </NavLink>
      </section>
    </div>
  );
}