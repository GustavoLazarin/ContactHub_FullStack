import { createContext, useContext, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { IContact, IContactCreate } from "../components/modals/CreateContactModal/createContactFormSchema";
import { UseFormReset, FieldValues } from "react-hook-form";
import { IContactEdit } from "../components/modals/EditContactModal/editContactFormSchema";

interface IContactContextProps {
    children: React.ReactNode
};

export interface IContactContext {
    getAllContacts: () => Promise<void>
    contacts: IContact[] | []        
    isCreateModalOpen: boolean
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    createContact: (formData: IContactCreate, reset: UseFormReset<FieldValues>) => Promise<void>
    editContact: (formData: IContactEdit, id: string) => Promise<void>
    deleteContact: (id: string) => Promise<void>
    editingContact: IContact | null
    setEditingContact: React.Dispatch<React.SetStateAction<IContact | null>>
};

export const ContactContext = createContext<IContactContext>({} as IContactContext);

export const useContactContext = () => useContext(ContactContext);

export const ContactProvider = ({children}: IContactContextProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<IContact | null>(null);
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
    };

    const createContact = async (formData: IContactCreate, reset: UseFormReset<FieldValues>) => {
        try {
            setIsLoading(true);
            const { data } = await api.post("/contacts", formData);
            setContacts([...contacts, data])
            reset();
            setIsCreateModalOpen(false);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    const editContact = async (formData: IContactEdit, id: string) => {
        try {
            setIsLoading(true);
            const { data } = await api.patch(`contacts/${id}`, formData);
            setEditingContact(null);
            setContacts(contacts.map(contact => (contact.id !== id ? contact : data )))
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteContact = async (id: string) => {
        try {
            setIsLoading(true)
            await api.delete(`/contacts/${id}`);
            toast.success("Contato removido.")
            setContacts(contacts.filter(contact => contact.id !== id))
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const values: IContactContext = {
        getAllContacts,
        contacts,
        isCreateModalOpen,
        setIsCreateModalOpen,
        createContact,
        editContact,
        deleteContact,
        editingContact,
        setEditingContact,
    }

    return (
        <ContactContext.Provider value={values}>{children}</ContactContext.Provider>
    )
};
