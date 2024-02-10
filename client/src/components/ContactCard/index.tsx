import styles from "./style.module.scss";
import executiveImg from "../../assets/contact-executive.png";
import businessImg from "../../assets/contact-business.png";
import supplierImg from "../../assets/contact-supplier.png";
import storageImg from "../../assets/contact-storage.png";
import { MdMail, MdPhone, MdEdit, MdDeleteForever } from "react-icons/md";
import { IContactContext, useContactContext } from "../../providers/ContactProvider";

interface ICardProps {
    contact: any
}

export const ContactCard = ({contact}: ICardProps) => {
    const { id, type, name, email, phone_number  } = contact;

    const { deleteContact } = useContactContext() as IContactContext;

    const image = () => {
        switch(type) {
            case "executive":
                return executiveImg;
            case "business":
                return businessImg;
            case "supplier":
                return supplierImg;
            case "storage":
                return storageImg;
            default:
                return "null";
        }
    }
    return (
        <li className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.cardImg}>
                    <img src={image()} alt={type} />
                </div>
                <div className={styles.infos}>
                    <div>
                        <h3>{name}</h3>
                    </div>
                    <div>
                        <MdMail/>
                        <h3>{email}</h3>
                    </div>
                    <div>
                        <MdPhone/>   
                        <h3>{phone_number.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')}</h3>
                    </div>
                </div>
            </div>
            <div className={styles.cardButtons}>
                <button><MdEdit /></button>
                <button onClick={() => deleteContact(id)}><MdDeleteForever/></button>
            </div>
        </li>
    )
};