import { useNavigate } from "react-router-dom";
import { IContactContext, useContactContext } from "../../providers/ContactProvider";
import { IUserContext, useUserContext } from "../../providers/UserProvider";
import styles from "./style.module.scss";
import { MdAddCircleOutline, MdOutlineExitToApp } from "react-icons/md";

export const Header = () => {

    const { userInfo, logout } = useUserContext() as IUserContext;
    const userProfileImg = userInfo?.profile_img;
    const { setIsCreateModalOpen } = useContactContext() as IContactContext;

    const navigate = useNavigate();


    return (
        <header className={styles.header}>
            <h1 className="white" onClick={() => navigate("/dashboard")}>Contact_Hub</h1>
            <button title="Adicionar contato" aria-label="add-contact" onClick={() => setIsCreateModalOpen(true)}><MdAddCircleOutline size={40}/></button>
            <div className={styles.profileBox}>
                <img src={userProfileImg ? userProfileImg : "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"} onClick={() => navigate("/profile")}/>
                <button title="Sair" aria-label="logout" onClick={logout}><MdOutlineExitToApp size={40}/></button>
            </div>
        </header>
    )
};