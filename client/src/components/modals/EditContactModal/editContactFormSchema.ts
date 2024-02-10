import { z } from "zod";
import { createContactFormSchema } from "../CreateContactModal/createContactFormSchema";

export const editContactFormSchema = createContactFormSchema.partial();

export type IContactEdit = z.infer<typeof editContactFormSchema>;