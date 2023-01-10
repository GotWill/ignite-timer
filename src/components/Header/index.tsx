import * as C from './styles'
import logoImg from '../../assets/img/logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'



export function Header() {
    return (
        <C.Container>
            <img src={logoImg} />
            <nav>
                <NavLink to="/">
                    <Timer size={24} />
                </NavLink>



                <NavLink to="/history">
                    <Scroll size={24} />
                </NavLink>


            </nav>
        </C.Container>
    )
}