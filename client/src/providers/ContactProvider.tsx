import { createContext, useContext, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

interface IContactContextProps {
    children: React.ReactNode
};

export interface IContactProvider {
    getAllContacts: () => Promise<void>
    contacts: any                                   //TROCAR TIPAAGEM <<<<<<<<<<<<<<----------------------------
};

export const ContactContext = createContext<IContactProvider>({} as IContactProvider);

export const useContactProvider = () => useContext(ContactContext);

export const ContactProvider = ({children}: IContactContextProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [contacts, setContacts] = useState([]);

    const getAllContacts = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("contact_hub:@token");
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            const {data} = await api.get("/contacts");
            setContacts(data);
        } catch (error: any) {
            console.log(error);
            if (error.response.status === 401) {
                toast.error("Ops, faça login novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const values: IContactProvider = {
        getAllContacts,
        contacts
    }

    return (
        <ContactContext.Provider value={values}>{children}</ContactContext.Provider>
    )
};
