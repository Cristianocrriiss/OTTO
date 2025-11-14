import { createContext,useEffect, useState, useContext } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { autenticacao } from '../firebase/firebaseConexao'
import type { UsuarioTipo } from '../tipos/usuario'
import type { ReactNode } from 'react'

interface UsuarioProviderProps {
    children: ReactNode
}

interface UsuarioTipoContexto {
    usuarioLogado: UsuarioTipo | null
    carregando: boolean
    criarAutenticacaoUsuario: (email: string, senha: string) => Promise<boolean>
    autenticarUsuario: (email: string, senha: string) => Promise<boolean>
    deslogar: () => Promise<boolean>
}

const AutenticacaoContexto = createContext<UsuarioTipoContexto>({
    usuarioLogado: null,
    carregando: true,  
    criarAutenticacaoUsuario: async () => false,
    autenticarUsuario: async () => false,
    deslogar: async () => false  
})

export const AutenticacaoProvider = ({ children }: UsuarioProviderProps) => {

  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioTipo | null>(null)
  const [carregando, setCarregando] = useState<boolean>(true)

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(autenticacao, async (usuarioFirebase) => {

      if (usuarioFirebase) {

        const usuarioDados: UsuarioTipo = {
          codigo: usuarioFirebase.uid,
          email: usuarioFirebase.email
        }
        setUsuarioLogado(usuarioDados)
        setCarregando(false)
      }
    })

    return () => unsubscribe()
  }, [])


  const criarAutenticacaoUsuario = async (email: string, senha: string) => {
    try {
      await createUserWithEmailAndPassword(autenticacao, email, senha)
      return true
    } catch (error) {
      console.error(`Erro na criação do usuário! (${error})`)
      return false
    }
  }

  const autenticarUsuario = async (email: string, senha: string) => {
    try {
      await signInWithEmailAndPassword(autenticacao, email, senha)
      return true
    } catch (error) {
      console.error(`Erro na autenticação do usuário! (${error})`)
      return false
    }
  }

  const deslogar = async () => {
    try {
      await signOut(autenticacao)
      return true
    } catch (error) {
      console.error(`Erro ao deslogar usuário! (${error})`)
      return false
    }
  }

  return (
    <AutenticacaoContexto.Provider 
      value={{ usuarioLogado, carregando, criarAutenticacaoUsuario, autenticarUsuario, deslogar }}
    >
      {children}
    </AutenticacaoContexto.Provider>
  )
}

export const useAutenticacao = (): UsuarioTipoContexto => useContext(AutenticacaoContexto)