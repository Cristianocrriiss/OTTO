import './global.css'
import {Rotas} from './rotas/Rotas'
import { AutenticacaoProvider } from './contextos/AutenticacaoContexto'


function App() {

  return (
    <AutenticacaoProvider>
      <Rotas />
   </AutenticacaoProvider>
  )
}

export default App
