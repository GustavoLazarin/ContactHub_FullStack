import { useEffect } from "react";
import { Header } from "../../components/Header";
import styles from "./style.module.scss";
import { IUserContext, useUserContext } from "../../providers/UserProvider";

export const ProfilePage = () => {

    const { getUser } =  useUserContext() as IUserContext;

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("contact_hub:@user")!).id;
        getUser(userId);
    }, [])

    return (
        <>
            <Header/>
            <main className={styles.container}>
                <section className={styles.profile}>
                    <h2>Perfil</h2>
                </section>
            </main>
        </>
    )
};