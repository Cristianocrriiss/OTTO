import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../paginas/Login'
import { Inicial } from '../paginas/Inicial'
import { Chat } from '../paginas/Chat'
import { ChatBot } from '../paginas/ChatBot'
import { Sobre } from '../paginas/Sobre'
import { Funcao1 } from '../paginas/Funcoes/Funcao1'
import { Funcao2 } from '../paginas/Funcoes/Funcao2'
import { Funcao3 } from '../paginas/Funcoes/Funcao3'

export function Rotas() {
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path='/' element={ <Login /> } />
                    <Route path='inicial' element={ <Inicial /> } >
                    <Route index element={<ChatBot />} />
                    <Route path='chat' element={<Chat />} />
                    <Route path='sobre' element={<Sobre />} />
                    <Route path='funcionalidade1' element={<Funcao1 />} />
                    <Route path='funcionalidade2' element={<Funcao2 />} />
                    <Route path='funcionalidade3' element={<Funcao3 />} />
                </Route>
            </Routes>     
            
       </BrowserRouter>
    )
}
