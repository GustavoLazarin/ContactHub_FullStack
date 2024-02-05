import { Input } from '../../components/forms/Input';
import { useForm } from 'react-hook-form';
import styles from './style.module.scss';
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from './registerFormSchema';

export const RegisterPage = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(registerSchema)
    })

    const submit = (formData: any) => {
        console.log(formData);
    }

    return (
        <>
            <main className={styles.container}>
                <div className={styles.formContainer}>
                    <div className={styles.leftBox}>
                        <h1 className='white'>Cadastrar-se</h1>
                        <form className='form-box white' onSubmit={handleSubmit(submit)}>
                            <Input id='name' label='Nome' placeholder='Ex: José da Silva' error={errors.name} {...register('name')}/>
                            <Input id='email' label='Email' placeholder='Ex: jose_silva@mail.com.br' error={errors.email} {...register('email')}/>
                            <Input id='password' label='Senha' type='password' placeholder='Insira uma senha forte' error={errors.password} {...register('password')}/>
                            <Input id='confirm_pass' label='Confirmar senha' type='password' placeholder='Repita a senha' error={errors.confirmPass} {...register('confirmPass')}/>
                        </form>
                    </div>
                    <div className={styles.rightBox}>
                        <h1 className='primary'>Contact_Hub</h1>
                        <form className='form-box' onSubmit={handleSubmit(submit)}>
                            <Input id='phone_number' label='Telefone' placeholder='Ex: 45999990000' error={errors.phone_number} {...register('phone_number')}/>
                            <Input id='profile_img' label='Imagem de perfil' placeholder='Ex: http://link-da-imagem.com.br' error={errors.profile_img} {...register('profile_img')}/>
                        <button className='primary'>Enviar</button>
                        </form>
                        <p>Já possui uma conta? <a href='/' className='primary'>Entrar</a></p>
                    </div>
                </div>
            </main>
        </>
    )
}