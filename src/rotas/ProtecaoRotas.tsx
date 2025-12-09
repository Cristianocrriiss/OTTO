import type { ReactNode } from 'react'
import { Navigate } from "react-router-dom"
import { useAutenticacao } from '../contextos/AutenticacaoContexto'

interface ProtecaoRotasProps {
    children: ReactNode
}

export function ProtecaoRotas({ children }: ProtecaoRotasProps): ReactNode {

  const { usuarioLogado } = useAutenticacao()

  if (!usuarioLogado) {
    return <Navigate to="/" replace />
  }

  return children;
}
