import React, { createContext, useContext } from "react";
import { TLoginFormData } from "../pages/LoginPage/loginFormSchema";
import { api } from "../services/api";

interface IUserContextProps {
    children: React.ReactNode
}

export interface IUserContext {
    login: (formData: TLoginFormData) => Promise<void>
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const useUserContext = () => {
    const abc = useContext(UserContext);
    return abc
};

export const UserProvider = ({children}: IUserContextProps) => {

    const login = async (formData: TLoginFormData) => {
        try {
            const { data } = await api.post("/login", formData);
            const { token } = data;
            localStorage.setItem("Contact_Hub:@Token", token)
        } catch (error) {
            console.log(error);
        }
    }

    // const values: IUserContext = {
    //     login
    // };

    return  <UserContext.Provider value={{login}}>{children}</UserContext.Provider>
}