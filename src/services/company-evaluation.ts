
import { supabase } from "@/integrations/supabase/client";
import type { CompanyEvaluationFormValues } from "@/lib/validations/company-evaluation";
import { toast } from "sonner";

export async function createCompanyEvaluation(data: CompanyEvaluationFormValues) {
  const { data: evaluation, error } = await supabase
    .from("company_evaluations")
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
    })
    .select()
    .single();

  if (error) {
    toast.error("Erro ao registrar avaliação");
    throw error;
  }

  return evaluation;
}
