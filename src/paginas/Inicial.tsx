import { useState } from 'react';
import estilos from './Inicial.module.css';
import { Menu } from '../componentes/Menu';
import { Header } from '../componentes/Header';
import { Outlet } from 'react-router-dom';

export function Inicial() {
  const [menuAberto, setMenuAberto] = useState(false); // controle de estado para abrir/fechar o menu lateral

  return (
    // aplicação condicional de classe CSS para mudar o layout da grid conforme o menu está aberto ou não
    <div className={`${estilos.gridConteiner} ${menuAberto ? estilos.gridAberto : estilos.gridFechado}`}>
      
      <header>
        {/* função chamada ao clicar no botão do Header que alterna o estado do menu */}
        <Header aoAbrirMenu={() => setMenuAberto(!menuAberto)} />
      </header>

      <aside>
        {/* passa a prop "aberta" para o Menu, que pode usar isso para animar ou renderizar de acordo */}
        <Menu aberta={menuAberto} />
      </aside>

      <article>
        <Outlet />
      </article>
    </div>
  );
}
