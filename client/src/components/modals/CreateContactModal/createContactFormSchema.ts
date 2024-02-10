import { z } from "zod";

export const createContactFormSchema = z.object({
    name: z.string().min(1, "Campo vazio.").max(120, "Maximo 120 caracteres."),
    email: z.string().email("Email inválido.").max(120, "Maximo 120 caracteres."),
    phone_number: z.string().length(11, "Deve conter 11 digitos."),
    type: z.enum(["executive", "business", "supplier", "storage"]).default("executive")
});

export type IContactCreate = z.infer<typeof createContactFormSchema>;

export interface IContact extends IContactCreate {
    id: string;
}