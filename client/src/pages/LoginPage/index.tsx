import { useForm } from "react-hook-form";
import styles from "./style.module.scss";
import { Input } from "../../components/forms/Input";
import { loginSchema } from "./loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { IUserContext, useUserContext } from "../../providers/UserProvider";
import { Spinner } from "../../components/Spinner";
import { Link } from "react-router-dom";

export const LoginPage = () => {

    const { login, isLoading } = useUserContext() as IUserContext;

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(loginSchema)
    })

    const submit = async (formData: any) => {
        login(formData);
    }

    return (
        <>
            <main className={styles.container}>
                <div className={styles.boxContainer}>
                    <div className={styles.headerBox}>
                        <h1 className="white">Contact_Hub</h1>
                    </div>
                    <form className="form-box" onSubmit={handleSubmit(submit)}>
                        <div>
                            <Input id="email" label="Email" placeholder="Ex: jose_silva@mail.com.br" error={errors.email} {...register("email")}/>
                            <Input id="password" label="Senha" type="password" placeholder="Insira uma senha forte" error={errors.password} {...register("password")}/>
                        </div>
                        <button className="primary button" disabled={isLoading}>{isLoading ? <Spinner/> : "Entrar"}</button>
                    </form>
                    <p>Ainda não possui uma conta? <Link to="/register" className="primary">Cadastrar</Link></p>
                </div>
            </main>
        </>
    )
}