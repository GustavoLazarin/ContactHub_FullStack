import { createContext, useContext, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { IContact, IContactCreate } from "../components/modals/CreateContactModal/createContactFormSchema";

interface IContactContextProps {
    children: React.ReactNode
};

export interface IContactContext {
    getAllContacts: () => Promise<void>
    contacts: IContact[] | []        
    isCreateModalOpen: boolean
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    createContact: (formData: IContactCreate) => Promise<void>
};

export const ContactContext = createContext<IContactContext>({} as IContactContext);

export const useContactContext = () => useContext(ContactContext);

export const ContactProvider = ({children}: IContactContextProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [contacts, setContacts] = useState<IContact[]>([]);

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

    const createContact = async (formData: IContactCreate) => {
        try {
            setIsLoading(true);
            const { data } = await api.post("/contacts", formData);
            setContacts([...contacts, data])
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const values: IContactContext = {
        getAllContacts,
        contacts,
        isCreateModalOpen,
        setIsCreateModalOpen,
        createContact
    }

    return (
        <ContactContext.Provider value={values}>{children}</ContactContext.Provider>
    )
};
