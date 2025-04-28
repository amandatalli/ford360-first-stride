
import { z } from "zod";

export const registrationFormSchema = z.object({
  companyName: z.string().min(2, { message: "Nome da empresa é obrigatório" }),
  sector: z.string().min(2, { message: "Setor é obrigatório" }),
  estimatedAnnualRevenue: z.string().min(1, { message: "Receita anual estimada é obrigatória" }),
  grossMargin: z.string().min(1, { message: "Margem bruta é obrigatória" })
    .refine(val => !isNaN(Number(val)), { message: "Deve ser um número válido" }),
  operatingMargin: z.string().min(1, { message: "Margem operacional é obrigatória" })
    .refine(val => !isNaN(Number(val)), { message: "Deve ser um número válido" }),
  leverage: z.string().min(1, { message: "Alavancagem é obrigatória" })
    .refine(val => !isNaN(Number(val)), { message: "Deve ser um número válido" }),
  revenueCagr: z.string().min(1, { message: "CAGR de receita é obrigatório" })
    .refine(val => !isNaN(Number(val)), { message: "Deve ser um número válido" }),
  competitiveAdvantage: z.string().min(2, { message: "Vantagem competitiva é obrigatória" }),
  mainLocation: z.string().min(2, { message: "Localização principal é obrigatória" }),
  revenueModel: z.string().min(1, { message: "Modelo de receita é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

