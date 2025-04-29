
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type CompanyWithRating = Database["public"]["Tables"]["user_registrations"]["Row"] & {
  rating?: Database["public"]["Tables"]["company_ratings"]["Row"];
};

export async function fetchCompaniesWithRatings() {
  try {
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
      const companyData = { ...company };
      
      // If ratings exist and it's an array, take the first rating (most recent)
      if (companyData.rating && Array.isArray(companyData.rating) && companyData.rating.length > 0) {
        return {
          ...companyData,
          rating: companyData.rating[0]
        };
      }
      
      // If no ratings, return company with undefined rating
      return {
        ...companyData,
        rating: undefined
      };
    });

    return processedCompanies as CompanyWithRating[];
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return [] as CompanyWithRating[];
  }
}

export async function updateCompanyRating(
  companyId: string,
  rating: number,
  approvalStatus: "Approved" | "Under Evaluation" | "Not Approved",
  justification: string,
  strategicFitWeight: number = 0.4,
  valuationWeight: number = 0.3,
  riskWeight: number = 0.2,
  growthWeight: number = 0.1
) {
  try {
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
          justification,
          strategic_fit_weight: strategicFitWeight,
          valuation_weight: valuationWeight,
          risk_weight: riskWeight,
          growth_weight: growthWeight
        })
        .eq("id", existingRating.id);

      if (error) {
        console.error("Error updating rating:", error);
        throw error;
      }
    } else {
      const { error } = await supabase
        .from("company_ratings")
        .insert({
          company_registration_id: companyId,
          evaluator_id: (await supabase.auth.getUser()).data.user?.id || "anonymous",
          rating,
          approval_status: approvalStatus,
          justification,
          strategic_fit_weight: strategicFitWeight,
          valuation_weight: valuationWeight,
          risk_weight: riskWeight,
          growth_weight: growthWeight
        });

      if (error) {
        console.error("Error inserting rating:", error);
        throw error;
      }
    }
  } catch (error) {
    console.error("Error in updateCompanyRating:", error);
    throw error;
  }
}
