import React, { createContext, useContext, useState, useEffect } from "react";
import { TLoginFormData } from "../pages/LoginPage/loginFormSchema";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { TRegisterFormData } from "../pages/RegisterPage/registerFormSchema";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface IUserContextProps {
    children: React.ReactNode
}

interface IUser {
    id: string
    profile_img: string
}

export interface IUserContext {
    login: (formData: TLoginFormData) => Promise<void>
    logout: () => void
    signUp: (formData: TRegisterFormData) => Promise<void>
    isLoading: boolean,
    user: IUser | null
}


export const UserContext = createContext<IUserContext>({} as IUserContext);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({children}: IUserContextProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("contact_hub:@token");
        if (token) {
            decodeUser(token);
            navigate("/dashboard");
        }
    }, [])
    
    const navigate = useNavigate();

    const decodeUser = (token: string) => {
        const decoded: any = jwtDecode(token);
        const {profile_img, sub} = decoded;
        setUser({id: sub, profile_img})
    };

    const login = async (formData: TLoginFormData) => {
        try {
            setIsLoading(true);
            const { data } = await api.post("/login", formData);
            const { token } = data;
            localStorage.setItem("contact_hub:@token", token);
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            decodeUser(token);
            navigate("/dashboard");
        } catch (error: any) {
            if (error.response.data.statusCode === 401) {
                toast.error("Email ou senha inválido(a).")
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("contact_hub:@token");
        toast.success("Volte sempre!")
        navigate("/");
    };

    const signUp = async (formData: TRegisterFormData) => {
        try {
            setIsLoading(true);
            const response = await api.post("/users", formData);
            toast.success(`${response.data.name} registrado(a) com sucesso!`)
            navigate("/");
        } catch (error: any) {
            console.log(error);
            if (error.response.status === 409) {
                toast.error("Usuário ja possui cadastro.")
            }
        } finally {
            setIsLoading(false);
        }
    };

    const values: IUserContext = {
        login,
        logout,
        signUp,
        isLoading,
        user
    };

    return  <UserContext.Provider value={values}>{children}</UserContext.Provider>
}