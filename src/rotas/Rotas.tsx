import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../paginas/Login'
import { Inicial } from '../paginas/Inicial'
import { Chat } from '../paginas/Chat'
import { ChatBot } from '../paginas/ChatBot'
import { CorrigirRedacao } from '../paginas/Funcoes/CorrigirRedacao'
import { PlanoDeAula } from '../paginas/Funcoes/PlanoDeAula'
import { AdaptadorConteudo} from '../paginas/Funcoes/AdaptadorConteudo'
import { Sobre } from '../paginas/Sobre'
import { ProtecaoRotas } from './ProtecaoRotas'


export function Rotas() {
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path='/' element={ <Login /> } />
                    <Route path='inicial' element={ <ProtecaoRotas><Inicial /> </ProtecaoRotas>} >
                    <Route index element={<ProtecaoRotas><ChatBot /></ProtecaoRotas>} />
                    <Route path='chat' element={<ProtecaoRotas><Chat /></ProtecaoRotas>} />
                    <Route path='corrigirredacao' element={<ProtecaoRotas><CorrigirRedacao /></ProtecaoRotas>} />
                    <Route path='planodeaula' element={<ProtecaoRotas><PlanoDeAula /></ProtecaoRotas>} />
                    <Route path='adaptadorconteudo' element={<ProtecaoRotas><AdaptadorConteudo /></ProtecaoRotas>} />
                    <Route path="chat/:chatId" element={<Chat />}></Route>
                    <Route path='sobre' element={<ProtecaoRotas><Sobre /></ProtecaoRotas>} />
                </Route>
            </Routes>     
            
       </BrowserRouter>
    )
}
