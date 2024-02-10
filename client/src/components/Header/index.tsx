import { IContactContext, useContactContext } from "../../providers/ContactProvider";
import { IUserContext, useUserContext } from "../../providers/UserProvider";
import styles from "./style.module.scss";
import { MdAddCircleOutline, MdOutlineExitToApp } from "react-icons/md";

export const Header = () => {

    const { logout } = useUserContext() as IUserContext;

    const { setIsCreateModalOpen } = useContactContext() as IContactContext;

    const { user } = useUserContext() as IUserContext;

    return (
        <header className={styles.header}>
            <h1 className="white">Contact_Hub</h1>
            <button title="Adicionar contato" aria-label="add-contact" onClick={() => setIsCreateModalOpen(true)}><MdAddCircleOutline size={40}/></button>
            <div className={styles.profileBox}>
                <img src={user ? user.profile_img : "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"}/>
                <button title="Sair" aria-label="logout" onClick={logout}><MdOutlineExitToApp size={40}/></button>
            </div>
        </header>
    )
};