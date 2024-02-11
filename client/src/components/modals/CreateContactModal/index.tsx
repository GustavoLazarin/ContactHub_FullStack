import { Input } from "../../forms/Input"
import { MdClose } from "react-icons/md"
import { GoTriangleDown } from "react-icons/go";
import styles from "./style.module.scss"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IContactCreate, createContactFormSchema } from "./createContactFormSchema"
import { IContactContext, useContactContext } from "../../../providers/ContactProvider";

export const CreateContactModal = () => {

    const { setIsCreateModalOpen, createContact } = useContactContext() as IContactContext;

    const {register, reset, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(createContactFormSchema)
    })


    const submit = (formData: any) => {
        createContact(formData, reset);
    }

    return (
        <div className={styles.modalOverlay} role="dialog">
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2 className="primary">Cadastrar Contato</h2>
                    <button onClick={() => setIsCreateModalOpen(false)} title="Fechar" aria-label="close-create"><MdClose size={24}/></button>
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
                        {errors.type? <p className="headline danger">Obrigatório.</p> : null}
                        <button className="primary button" type="submit">Cadastrar Contato</button>
                    </form>
                </div>
            </div>
        </div>
    )
}