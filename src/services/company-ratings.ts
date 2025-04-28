
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

  // Process the data to handle the array of ratings
  const processedCompanies = companies?.map(company => {
    // If ratings exist and it's an array, take the first rating (most recent)
    if (company.rating && Array.isArray(company.rating) && company.rating.length > 0) {
      return {
        ...company,
        rating: company.rating[0]
      };
    }
    // If no ratings, return company with undefined rating
    return {
      ...company,
      rating: undefined
    };
  });

  return processedCompanies as CompanyWithRating[];
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
