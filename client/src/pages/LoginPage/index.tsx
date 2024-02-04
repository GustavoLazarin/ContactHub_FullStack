import { useForm } from 'react-hook-form';
import styles from './style.module.scss';
import { Input } from '../../components/forms/Input';
import { loginSchema } from './loginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod'

export const LoginPage = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(loginSchema)
    })

    const submit = (formData: any) => {
        console.log(formData);
    }

    return (
        <>
            <main className={styles.container}>
                <div className={styles.boxContainer}>
                    <div className={styles.headerBox}>
                        <h1 className='white'>Olá, novamente!</h1>
                    </div>
                    <form className='form-box' onSubmit={handleSubmit(submit)}>
                            <Input id='email' label='Email' placeholder='Ex: jose_silva@mail.com.br' error={errors.email} {...register('email')}/>
                            <Input id='password' label='Senha' type='password' placeholder='Insira uma senha forte' error={errors.password} {...register('password')}/>
                            <button className='primary'>Entrar</button>
                    </form>
                    <p>Ainda não possui uma conta? <a href='/' className='primary'>Cadastrar</a></p>
                </div>
            </main>
        </>
    )
}