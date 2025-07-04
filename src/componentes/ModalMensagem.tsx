import estilos from './ModalMensagem.module.css'

interface ModalMensagemProps {
    exibir: boolean
    titulo: string
    texto: string
    ocultar: () => void
}

export function ModalMensagem({exibir, ocultar, titulo, texto}: ModalMensagemProps) {

    if (exibir) {

        return(
            <div className={estilos.conteiner}>

                <p className={estilos.titulo}>{titulo}</p>

                <div className={estilos.conteinerMensagem}>
                    <p className={estilos.mensagem}>{
                        texto.split('\n').map( linha => <p>{String(linha).slice(0,60)}</p> )
                    }</p>
                </div>
                
                <button 
                    className={estilos.botao}
                    onClick={ocultar}
                >Fechar</button>

            </div>
        )    
    }
}