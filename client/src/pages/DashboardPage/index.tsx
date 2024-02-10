import { useEffect } from "react";
import { Header } from "../../components/Header";
import styles from "./style.module.scss";
import { IContactContext, useContactContext } from "../../providers/ContactProvider";
import { ContactCard } from "../../components/ContactCard";
import { CreateContactModal } from "../../components/modals/CreateContactModal";
import { EditContactModal } from "../../components/modals/EditContactModal";

export const DashboardPage = () => {

    const { getAllContacts, contacts, isCreateModalOpen, editingContact } = useContactContext() as IContactContext;

    useEffect(() => {
        getAllContacts();
    }, [])

    return (
        <>
            <Header/>
            <main className={styles.container}>
                <ul className={styles.cardContainer}>
                    {contacts.map(contact => <ContactCard key={contact.id} contact={contact}/>)}
                </ul>
            </main>
            {isCreateModalOpen && <CreateContactModal/>}
            {editingContact && <EditContactModal />}
        </>
    )
};