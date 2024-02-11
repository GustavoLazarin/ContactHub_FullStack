import { useEffect } from "react";
import { Header } from "../../components/Header";
import styles from "./style.module.scss";
import { IUserContext, useUserContext } from "../../providers/UserProvider";
import { Input } from "../../components/forms/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserFormSchema } from "./editUserFormSchema";

export const ProfilePage = () => {

    const { getUser, editUser, user, isLoading } =  useUserContext() as IUserContext;

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("contact_hub:@user")!).id;
        getUser(userId);
    }, [])

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(editUserFormSchema),
        values: {
            name: user?.name,
            email: user?.email,
            phone_number: user?.phone_number,
            profile_img: user?.profile_img
        }
    })

    const submit = (formData: any) => {
        const filteredData: any = {};

        for (const key in formData) {
          if (formData[key] !== "") {
            filteredData[key] = formData[key];
          }
        }

        const userId = JSON.parse(localStorage.getItem("contact_hub:@user")!).id;
        editUser(filteredData, userId);
    };

    return (
        <>
            <Header/>
            <main className={styles.container}>
                <section className={styles.profile}>
                    <h2>Perfil</h2>
                    <form className={`${styles.form} form-box`} onSubmit={handleSubmit(submit)}>
                            <Input id='name' label='Nome' placeholder='Ex: José da Silva' error={errors.name} {...register('name')}/>
                            <Input id='email' label='Email' placeholder='Ex: jose_silva@mail.com.br' error={errors.email} {...register('email')}/>
                            <Input id='phone_number' label='Telefone' placeholder='Ex: 45999990000' error={errors.phone_number} {...register('phone_number')}/>
                            <Input id='profile_img' label='Imagem de perfil' placeholder='Ex: http://link-da-imagem.com.br' error={errors.profile_img} {...register('profile_img')}/>
                            <div>
                                <Input id='password' label='Senha' placeholder='********' error={errors.password} {...register('password')}/>
                                <label className="headline">Obs: Preencha caso desejar alterar a senha, ou deixe em branco para manter a atual.</label>
                            </div>
                        <button className='primary button' disabled={isLoading}>Salvar dados</button>
                        </form>
                        <button className={`${styles.danger} button`} disabled={isLoading}>Excluir conta</button>
                </section>
            </main>
        </>
    )
};