import { Routes, Route } from "react-router-dom"
import { RegisterPage } from "../pages/RegisterPage"
import { LoginPage } from "../pages/LoginPage"
import { DashboardPage } from "../pages/DashboardPage"
import { ProfilePage } from "../pages/ProfilePage"

export const RoutesMain = () => {

    return (
        <>
            <Routes> 
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
        </>
    )
}