import { Routes, Route } from "react-router-dom"
import { RegisterPage } from "../pages/RegisterPage"
import { LoginPage } from "../pages/LoginPage"

export const RoutesMain = () => {

    return (
        <>
            <Routes> 
                <Route path="/" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </>
    )
}