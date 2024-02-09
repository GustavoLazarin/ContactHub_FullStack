import { useEffect } from "react";
import { Header } from "../../components/Header";
import styles from "./style.module.scss";
import { IContactProvider, useContactProvider } from "../../providers/ContactProvider";
import { ContactCard } from "../../components/ContactCard";

export const DashboardPage = () => {

    const { getAllContacts, contacts } = useContactProvider() as IContactProvider;

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
        </>
    )
};