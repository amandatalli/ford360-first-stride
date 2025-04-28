
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

import { companyEvaluationSchema, type CompanyEvaluationFormValues } from "@/lib/validations/company-evaluation";
import { createCompanyEvaluation } from "@/services/company-evaluation";
import { 
  revenueOptions, 
  competitiveAdvantageOptions, 
  revenueModelOptions 
} from "@/lib/constants/registration-options";

const CompanyEvaluationForm = () => {
  const navigate = useNavigate();
  const form = useForm<CompanyEvaluationFormValues>({
    resolver: zodResolver(companyEvaluationSchema),
    defaultValues: {
      strategic_rating: 3,
      financial_rating: 3,
      operational_rating: 3,
      overall_rating: 3,
    },
  });

  const onSubmit = async (data: CompanyEvaluationFormValues) => {
    try {
      await createCompanyEvaluation(data);
      toast.success("Empresa registrada com sucesso para avaliação");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting evaluation:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ford-blue">Informações Básicas</h3>
            
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setor</FormLabel>
                  <FormControl>
                    <Input placeholder="Setor de atuação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="main_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade/Estado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ford-blue">Informações Financeiras</h3>
            
            <FormField
              control={form.control}
              name="estimated_annual_revenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receita Anual Estimada</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a faixa de receita" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {revenueOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gross_margin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Margem Bruta (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ex: 35" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operating_margin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Margem Operacional (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ex: 15" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leverage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alavancagem (Dívida/EBITDA)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ex: 2.5" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="revenue_cagr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CAGR de Receita (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ex: 25" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Strategic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ford-blue">Informações Estratégicas</h3>
          
          <FormField
            control={form.control}
            name="competitive_advantage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Principal Vantagem Competitiva</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a vantagem competitiva" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {competitiveAdvantageOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="revenue_model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo de Receita</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o modelo de receita" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {revenueModelOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Ratings */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-ford-blue">Avaliação</h3>
          
          <FormField
            control={form.control}
            name="strategic_rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avaliação Estratégica (1-5)</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(values) => field.onChange(values[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="financial_rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avaliação Financeira (1-5)</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(values) => field.onChange(values[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="operational_rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avaliação Operacional (1-5)</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(values) => field.onChange(values[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="overall_rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avaliação Geral (1-5)</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(values) => field.onChange(values[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="evaluation_notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Adicione notas relevantes sobre a avaliação"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Salvando..." : "Salvar Avaliação"}
        </Button>
      </form>
    </Form>
  );
};

export default CompanyEvaluationForm;
