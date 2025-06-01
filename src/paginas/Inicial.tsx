import estilos from './Inicial.module.css'

export function Inicial(){
    return(
        <div className={estilos.gridConteiner}>
            <header> <h1 className="roboto-bold">Header</h1></header>
            <aside><h1 className="roboto-bold">Aside</h1> </aside>
            <article> <h1 className="roboto-bold">Main</h1></article>
        </div>
    )
}