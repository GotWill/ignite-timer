import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import * as C from './styles'

export function Default(){
    return (
        <C.LayoutContainer>
            <Header/>
            <Outlet/>
        </C.LayoutContainer>
    )
}