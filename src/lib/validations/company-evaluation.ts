
import { z } from "zod";

export const companyEvaluationSchema = z.object({
  company_name: z.string().min(2, { message: "Nome da empresa é obrigatório" }),
  sector: z.string().min(2, { message: "Setor é obrigatório" }),
  main_location: z.string().min(2, { message: "Localização principal é obrigatória" }),
  estimated_annual_revenue: z.string().min(1, { message: "Receita anual estimada é obrigatória" }),
  gross_margin: z.string()
    .min(1, { message: "Margem bruta é obrigatória" })
    .refine(val => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, 
      { message: "Margem bruta deve ser um número entre 0 e 100" }),
  operating_margin: z.string()
    .min(1, { message: "Margem operacional é obrigatória" })
    .refine(val => !isNaN(Number(val)) && Number(val) >= -100 && Number(val) <= 100, 
      { message: "Margem operacional deve ser um número entre -100 e 100" }),
  leverage: z.string()
    .min(1, { message: "Alavancagem é obrigatória" })
    .refine(val => !isNaN(Number(val)) && Number(val) >= 0, 
      { message: "Alavancagem deve ser um número positivo" }),
  revenue_cagr: z.string()
    .min(1, { message: "CAGR de receita é obrigatório" })
    .refine(val => !isNaN(Number(val)), 
      { message: "CAGR deve ser um número válido" }),
  competitive_advantage: z.string().min(2, { message: "Vantagem competitiva é obrigatória" }),
  revenue_model: z.string().min(1, { message: "Modelo de receita é obrigatório" }),
  strategic_rating: z.number().min(1).max(5),
  financial_rating: z.number().min(1).max(5),
  operational_rating: z.number().min(1).max(5),
  overall_rating: z.number().min(1).max(5),
  evaluation_notes: z.string().optional(),
});

export type CompanyEvaluationFormValues = z.infer<typeof companyEvaluationSchema>;
