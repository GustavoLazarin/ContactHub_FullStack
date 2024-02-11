import { z } from "zod";

export const editUserFormSchema = z.object({
  name: z.string().min(1, "É necessário preencher o campo de nome."),
  email: z
    .string()
    .min(1, "É necessário preencher o campo de email.")
    .email("Insira um email valido."),
  password: z
    .string().nullable(),
  phone_number: z.string().length(11, "O número deve conter 11 digitos."),
  profile_img: z.string().nullable(),
});

export type TEditUser = z.infer<typeof editUserFormSchema>;
