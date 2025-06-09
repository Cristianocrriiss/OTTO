import estilos from './ChatBot.module.css'
import { TextBox } from '../componentes/TextBox'

export function ChatBot(){
    return(
            <div className={estilos.gridConteiner}>
            
                <h2 className="roboto-medium" style={{ color: 'var(--azul-escuro)' }}>
                    Olá professor
                </h2>
                <div className={estilos.TextBox}>
                    <TextBox/>
                </div>
            </div>
    )
}