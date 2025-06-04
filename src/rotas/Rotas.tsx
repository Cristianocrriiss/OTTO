import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Inicial } from '../paginas/Inicial'
import { ChatBot } from '../paginas/ChatBot'

export function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicial />}>
                    <Route index element={<ChatBot />} />
                </Route>
            </Routes>        </BrowserRouter>
    )
}
