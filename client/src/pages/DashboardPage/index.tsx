import { useEffect } from "react";
import { Header } from "../../components/Header";
import styles from "./style.module.scss";
import { IContactContext, useContactContext } from "../../providers/ContactProvider";
import { ContactCard } from "../../components/ContactCard";
import { CreateContactModal } from "../../components/modals/CreateContactModal";

export const DashboardPage = () => {

    const { getAllContacts, contacts, isCreateModalOpen } = useContactContext() as IContactContext;

    useEffect(() => {
        getAllContacts()
        console.log(contacts)
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
        </>
    )
};