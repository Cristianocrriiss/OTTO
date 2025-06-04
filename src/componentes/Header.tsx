import estilos from './Header.module.css'

export function Header(){
    return(
        <div className={estilos.gridConteiner}>
           <h1 className="roboto-bold">Header</h1>
        </div>
    )
}