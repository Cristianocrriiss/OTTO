import estilos from './Inicial.module.css'
import {Menu} from '../componentes/Menu'
import {Header} from '../componentes/Header'
import { Outlet } from 'react-router-dom'


export function Inicial(){
    return(
        <div className={estilos.gridConteiner}>
            <header> <Header/></header>
            <aside><Menu/></aside>
            <article><Outlet/></article>
        </div>
    )
}