import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Inicial } from '../paginas/Inicial'
import { ChatBot } from '../paginas/ChatBot'
import { Funcao1 } from '../paginas/Funções/Funcao1'
import { Funcao2 } from '../paginas/Funções/Funcao2'
import { Funcao3 } from '../paginas/Funções/Funcao3'

export function Rotas() {
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path='/' element={<Inicial />}>
                    <Route index element={<ChatBot />} />
                    <Route path='funcionalidade1' element={<Funcao1 />} />
                    <Route path='funcionalidade2' element={<Funcao2 />} />
                    <Route path='funcionalidade3' element={<Funcao3 />} />
                </Route>
            </Routes>     
            
       </BrowserRouter>
    )
}
