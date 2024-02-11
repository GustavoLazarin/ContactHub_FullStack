import { Input } from "../../forms/Input"
import { MdClose } from "react-icons/md"
import { GoTriangleDown } from "react-icons/go";
import styles from "./style.module.scss"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IContactEdit, editContactFormSchema } from "./editContactFormSchema"
import { IContactContext, useContactContext } from "../../../providers/ContactProvider";

export const EditContactModal = () => {

    const { editingContact, setEditingContact, editContact } = useContactContext() as IContactContext;

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(editContactFormSchema),
        values: {
            name: editingContact?.name,
            email: editingContact?.email,
            phone_number: editingContact?.phone_number,
            type: editingContact?.type
        }
    })


    const submit = (formData: IContactEdit) => {
        editContact(formData, editingContact?.id!);
    }

    return (
        <div className={styles.modalOverlay} role="dialog">
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2 className="primary">Editar Contato</h2>
                    <button onClick={() => setEditingContact(null)} title="Fechar" aria-label="close-create"><MdClose size={24}/></button>
                </div>
                <div className={styles.modalContent}>
                    <form onSubmit={handleSubmit(submit)}>
                        <Input label="Nome" id="name" placeholder="Nome do contato" error={errors.name} {...register("name")}/>
                        <Input label="Email" id="email" placeholder="Email do contato" error={errors.email} {...register("email")}/>
                        <Input label="Telefone" id="phone_number" placeholder="Telefone do contato" error={errors.phone_number} {...register("phone_number")}/>
                        <label htmlFor="status">Tipo <GoTriangleDown /></label>
                        <select id="status" defaultValue="" {...register("type")}>
                            <option value="" disabled>Selecione o tipo de contato</option>
                            <option value="executive">Executivo</option>
                            <option value="business">Comercial</option>
                            <option value="supplier">Fornecedor</option>
                            <option value="storage">Armazém</option>
                        </select>
                        <button className="primary button" type="submit">Salvar Alterações</button>
                    </form>
                </div>
            </div>
        </div>
    )
}