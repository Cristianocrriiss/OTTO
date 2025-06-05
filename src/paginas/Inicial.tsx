import { useState } from 'react';
import estilos from './Inicial.module.css';
import { Menu } from '../componentes/Menu';
import { Header } from '../componentes/Header';
import { Outlet } from 'react-router-dom';

export function Inicial() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className={estilos.gridConteiner}>
      <header>
        <Header aoAbrirMenu={() => setMenuAberto(!menuAberto)} />
      </header>
      <aside>
        <Menu aberta={menuAberto} />
      </aside>
      <article>
        <Outlet />
      </article>
    </div>
  );
}
