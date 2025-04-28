
import { supabase } from "@/integrations/supabase/client";
import type { CompanyEvaluationFormValues } from "@/lib/validations/company-evaluation";
import { toast } from "sonner";

// Since we can't modify the Supabase types.ts file, we'll use a type assertion approach
export async function createCompanyEvaluation(data: CompanyEvaluationFormValues) {
  try {
    // Use type assertion to bypass type checking for table name
    const { data: evaluation, error } = await (supabase
      .from("company_evaluations" as any)
      .insert({
        company_name: data.company_name,
        sector: data.sector,
        main_location: data.main_location,
        estimated_annual_revenue: data.estimated_annual_revenue,
        gross_margin: parseFloat(data.gross_margin),
        operating_margin: parseFloat(data.operating_margin),
        leverage: parseFloat(data.leverage),
        revenue_cagr: parseFloat(data.revenue_cagr),
        competitive_advantage: data.competitive_advantage,
        revenue_model: data.revenue_model,
        strategic_rating: data.strategic_rating,
        financial_rating: data.financial_rating,
        operational_rating: data.operational_rating,
        overall_rating: data.overall_rating,
        evaluation_notes: data.evaluation_notes,
        approval_status: "Pending"
      } as any)
      .select()
      .single());

    if (error) {
      console.error("Error creating company evaluation:", error);
      toast.error("Erro ao registrar avaliação");
      throw error;
    }

    toast.success("Empresa registrada com sucesso para avaliação");
    return evaluation;
  } catch (error) {
    console.error("Error in createCompanyEvaluation:", error);
    toast.error("Erro ao registrar avaliação");
    throw error;
  }
}
