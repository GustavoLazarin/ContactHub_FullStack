import React, { createContext, useContext, useState, useEffect } from "react";
import { TLoginFormData } from "../pages/LoginPage/loginFormSchema";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { IUser, TRegisterFormData } from "../pages/RegisterPage/registerFormSchema";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { TEditUser } from "../pages/ProfilePage/editUserFormSchema";

interface IUserContextProps {
    children: React.ReactNode
};

interface IUserInfo {
    id: string
    profile_img: string
};

export interface IUserContext {
    login: (formData: TLoginFormData) => Promise<void>
    logout: () => void
    signUp: (formData: TRegisterFormData) => Promise<void>
    isLoading: boolean,
    userInfo: IUserInfo | null
    getUser: (id: string) => Promise<void>
    user: IUser | null
    editUser: (formData: TEditUser, id: string) => Promise<void>
    deleteUser: (id: string) => Promise<void>
};


export const UserContext = createContext<IUserContext>({} as IUserContext);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({children}: IUserContextProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

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
        setUserInfo({id: sub, profile_img})
        localStorage.setItem("contact_hub:@user", JSON.stringify({profile_img, id: sub}));
        localStorage.setItem("contact_hub:@token", token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`
    };

    const login = async (formData: TLoginFormData) => {
        try {
            setIsLoading(true);
            const { data } = await api.post("/login", formData);
            const { token } = data;
            localStorage.setItem("contact_hub:@token", token);
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            setUser(data);
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
        localStorage.removeItem("contact_hub:@user");
        toast.success("Volte sempre! 😊")
        navigate("/");
    };

    const signUp = async (formData: TRegisterFormData) => {
        try {
            setIsLoading(true);
            const response = await api.post("/users", formData);
            toast.success(`${response.data.name} registrado(a) com sucesso! 🚀`)
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

    const getUser = async (id: string) => {
        try {
            setIsLoading(true);
            const { data } = await api.get(`/users/${id}`);
            setUser(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const editUser = async (formData: TEditUser, id: string) => {
        try {
            setIsLoading(true);
            const { data } = await api.patch(`/users/${id}`, formData);
            toast.success("Informações editadas com sucesso! 📋")
            setUser(data);
            setUserInfo({id, profile_img: data.profile_img});
            navigate("/dashboard");

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    const deleteUser = async (id: string) => {
        try {
            setIsLoading(true);
            await api.delete(`/users/${id}`)
            navigate("/");
            toast.error("Conta de usuário deletada! 💣");
            localStorage.removeItem("contact_hub:@token");
            localStorage.removeItem("contact_hub:@user");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const values: IUserContext = {
        login,
        logout,
        signUp,
        isLoading,
        userInfo,
        getUser,
        user,
        editUser,
        deleteUser
    };

    return  <UserContext.Provider value={values}>{children}</UserContext.Provider>
};