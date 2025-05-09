export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      company_ratings: {
        Row: {
          approval_status: string
          company_registration_id: string
          created_at: string
          evaluator_id: string
          growth_weight: number | null
          id: string
          justification: string
          rating: number
          risk_weight: number | null
          strategic_fit_weight: number | null
          updated_at: string
          valuation_weight: number | null
        }
        Insert: {
          approval_status: string
          company_registration_id: string
          created_at?: string
          evaluator_id: string
          growth_weight?: number | null
          id?: string
          justification: string
          rating: number
          risk_weight?: number | null
          strategic_fit_weight?: number | null
          updated_at?: string
          valuation_weight?: number | null
        }
        Update: {
          approval_status?: string
          company_registration_id?: string
          created_at?: string
          evaluator_id?: string
          growth_weight?: number | null
          id?: string
          justification?: string
          rating?: number
          risk_weight?: number | null
          strategic_fit_weight?: number | null
          updated_at?: string
          valuation_weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_company_registration"
            columns: ["company_registration_id"]
            isOneToOne: false
            referencedRelation: "user_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_registrations: {
        Row: {
          company_name: string
          competitive_advantage: string | null
          created_at: string
          email: string
          estimated_annual_revenue: string | null
          full_name: string
          gross_margin: number | null
          id: string
          leverage: number | null
          main_location: string | null
          operating_margin: number | null
          revenue_cagr: number | null
          revenue_model: string | null
          sector: string | null
        }
        Insert: {
          company_name: string
          competitive_advantage?: string | null
          created_at?: string
          email: string
          estimated_annual_revenue?: string | null
          full_name: string
          gross_margin?: number | null
          id?: string
          leverage?: number | null
          main_location?: string | null
          operating_margin?: number | null
          revenue_cagr?: number | null
          revenue_model?: string | null
          sector?: string | null
        }
        Update: {
          company_name?: string
          competitive_advantage?: string | null
          created_at?: string
          email?: string
          estimated_annual_revenue?: string | null
          full_name?: string
          gross_margin?: number | null
          id?: string
          leverage?: number | null
          main_location?: string | null
          operating_margin?: number | null
          revenue_cagr?: number | null
          revenue_model?: string | null
          sector?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
