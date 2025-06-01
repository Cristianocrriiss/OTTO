import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Inicial} from '../paginas/Inicial'

export function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicial/>} /> 

            </Routes>
        </BrowserRouter>

    )

}