import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, 'É necessário preencher o campo de nome.'),
  email: z
    .string()
    .min(1, 'É necessário preencher o campo de email.')
    .email('Insira um email valido.'),
  password: z
    .string()
    .min(8, 'É necessário pelo menos oito caracteres.')
    .regex(/(?=.*?[A-Z])/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/(?=.*?[a-z])/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/(?=.*?[0-9])/, 'A senha deve conter pelo menos um número.'),
  confirmPass: z.string().min(1, 'É necessário confirmar a senha.'),
  phone_number: z.string().length(11, 'O número deve conter 11 digitos.')
}).refine(({password, confirmPass})=> password === confirmPass , {
    message: 'As senhas não conferem.',
    path: ['confirmPass'] 
})

export type TRegisterFormData = z.infer<typeof registerSchema>