
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type CompanyWithRating = Database["public"]["Tables"]["user_registrations"]["Row"] & {
  rating?: Database["public"]["Tables"]["company_ratings"]["Row"];
};

export async function fetchCompaniesWithRatings() {
  const { data: companies, error } = await supabase
    .from("user_registrations")
    .select(`
      *,
      rating:company_ratings(*)
    `);

  if (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }

  return companies as CompanyWithRating[];
}

export async function updateCompanyRating(
  companyId: string,
  rating: number,
  approvalStatus: "Approved" | "Under Evaluation" | "Not Approved",
  justification: string
) {
  const { data: existingRating } = await supabase
    .from("company_ratings")
    .select("*")
    .eq("company_registration_id", companyId)
    .maybeSingle();

  if (existingRating) {
    const { error } = await supabase
      .from("company_ratings")
      .update({
        rating,
        approval_status: approvalStatus,
        justification
      })
      .eq("company_registration_id", companyId);

    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("company_ratings")
      .insert({
        company_registration_id: companyId,
        evaluator_id: (await supabase.auth.getUser()).data.user?.id,
        rating,
        approval_status: approvalStatus,
        justification
      });

    if (error) throw error;
  }
}
