import estilos from './Login.module.css'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {ModalMensagem} from '../componentes/ModalMensagem'
import {useNavigate} from 'react-router-dom'
import { useAutenticacao } from '../contextos/AutenticacaoContexto'


type FormValues = {
    email: string
    senha: string
}

const loginSchema = z.object({

    email: z.string()
            .email({message: 'Informe um e-mail válido!'}),

    senha: z.string()
           
})

export function Login(){

   const { autenticarUsuario } = useAutenticacao()

    const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
    const [modalMensagemTitulo, setModalMensagemTitulo] = useState('')
    const [modalMensagemTexto, setModalMensagemTexto] = useState('')

    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm<FormValues>({
        resolver: zodResolver(loginSchema)
    })

    const navegacao = useNavigate()

    
  const verificarUsuario = async (data: FormValues) => {
        
        let sucesso = await autenticarUsuario(data.email, data.senha)

        if(sucesso){
            navegacao('inicial')
        }else{
            setModalMensagemTitulo( 'Erro!')
            setModalMensagemTexto('Falha na verificação do usuário! Verifique seus dados.')
            exibirModal()
        }
    }



    function exibirModal(){
        setModalMensagemVisivel(true)
    }

    function ocultarModal(){
        setModalMensagemVisivel(false)
    }

    return(
       <div className={estilos.container}>

    <div className={estilos.ladoEsquerdo}>
      <h1 className={estilos.tituloEsquerda}>
        <img src="src/assets/OTTO LOGO - Sombra.png" alt="Logo OTTO" width={400} />

      </h1>
    </div>

  <div className={estilos.formConteiner}>
    <h1 className={estilos.titulo}>Boas vindas</h1>

    <form className={estilos.formulario}
     onSubmit={handleSubmit(verificarUsuario)}
     >
      
      <label>Email</label>
      <input 
        {...register('email')}
        className={estilos.campo}
        placeholder='ex: user@gmail.com'      

      />
      {errors?.email && (
        <p className={estilos.mensagem}>
          {errors.email.message}
        </p>
      )}

      <label>Senha</label>
      <input 
        {...register('senha')}
        className={estilos.campo}
        placeholder='ex: 123....'      
        type='password'      
      />
      {errors?.senha && (
        <p className={estilos.mensagem}>
          {errors.senha.message}
        </p>
      )}

      <button className={estilos.botao}>Entrar</button>
    </form>

    <ModalMensagem 
      exibir={modalMensagemVisivel}
      ocultar={ocultarModal}
      titulo={modalMensagemTitulo}
      texto={modalMensagemTexto}
    />
  </div>
</div>

    )
}
