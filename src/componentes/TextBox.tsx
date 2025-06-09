import estilos from './TextBox.module.css'

export function TextBox (){
    return(
        <div className={estilos.conteiner}>
            <div className={estilos.TextBox}>
                <input type="text" placeholder="Pergunte alguma coisa..." className={estilos.TextInput}/>
                <button className={estilos.btnEnviar}> <span className="material-symbols-outlined" style={{ fontSize: '30px', color: 'white' }}> arrow_right_alt </span> </button>
            </div>
        </div>
    )
}