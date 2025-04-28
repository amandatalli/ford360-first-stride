
import { supabase } from "@/integrations/supabase/client";
import type { RegistrationFormValues } from "@/lib/validations/registration";

export async function registerUser(data: RegistrationFormValues) {
  const { email, password, ...businessData } = data;
  
  // First, directly insert into user_registrations table
  const { data: registrationData, error: registrationError } = await supabase
    .from("user_registrations")
    .insert({
      company_name: businessData.companyName,
      email: email,
      sector: businessData.sector,
      estimated_annual_revenue: businessData.estimatedAnnualRevenue,
      gross_margin: parseFloat(businessData.grossMargin),
      operating_margin: parseFloat(businessData.operatingMargin),
      leverage: parseFloat(businessData.leverage),
      revenue_cagr: parseFloat(businessData.revenueCagr),
      competitive_advantage: businessData.competitiveAdvantage,
      main_location: businessData.mainLocation,
      revenue_model: businessData.revenueModel,
      full_name: businessData.companyName
    });

  if (registrationError) {
    throw registrationError;
  }

  // Then, attempt to sign up with authentication
  const { error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        company_name: businessData.companyName,
        sector: businessData.sector,
        estimated_annual_revenue: businessData.estimatedAnnualRevenue
      },
    },
  });

  if (authError) {
    console.warn("Auth signup warning:", authError);
  }

  return { registrationData, authError };
}

