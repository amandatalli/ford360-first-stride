import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, DollarSign, Percent, TrendingUp, Award, MapPin, List } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PasswordInput } from "./registration/PasswordInput";
import { registerUser } from "@/services/registration";
import { registrationFormSchema, type RegistrationFormValues } from "@/lib/validations/registration";
import { revenueOptions, competitiveAdvantageOptions, revenueModelOptions } from "@/lib/constants/registration-options";

const RegistrationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      companyName: "",
      sector: "",
      estimatedAnnualRevenue: "",
      grossMargin: "",
      operatingMargin: "",
      leverage: "",
      revenueCagr: "",
      competitiveAdvantage: "",
      mainLocation: "",
      revenueModel: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await registerUser(data);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo à Ford 360.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration process error:", error);
      
      if (error.message?.includes("already registered") || error.code === "23505") {
        setError("E-mail já cadastrado. Por favor, use outro e-mail ou faça login.");
      } else {
        setError(error.message || "Erro ao processar cadastro. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 animate-fade-in">
          {error && (
            <Alert variant="destructive" className="border-red-600 bg-red-100/10 text-red-500">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Empresa</FormLabel>
                <FormControl>
                  <div className="relative form-input-animation">
                    <Briefcase className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="Digite o nome da empresa" 
                      className="pl-10 bg-transparent border-ford-darkGray" 
                      {...field} 
                    />
                  </div>
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
                  <div className="relative form-input-animation">
                    <Briefcase className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="Ex: Alimentos Especiais" 
                      className="pl-10 bg-transparent border-ford-darkGray" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedAnnualRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receita Anual Estimada</FormLabel>
                <FormControl>
                  <div className="relative form-input-animation">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="pl-10 bg-transparent border-ford-darkGray">
                        <SelectValue placeholder="Selecione a faixa de receita" />
                      </SelectTrigger>
                      <SelectContent>
                        {revenueOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="grossMargin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Margem Bruta (%)</FormLabel>
                  <FormControl>
                    <div className="relative form-input-animation">
                      <Percent className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        type="number" 
                        placeholder="Ex: 35" 
                        className="pl-10 bg-transparent border-ford-darkGray" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operatingMargin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Margem Operacional (%)</FormLabel>
                  <FormControl>
                    <div className="relative form-input-animation">
                      <Percent className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        type="number" 
                        placeholder="Ex: 15" 
                        className="pl-10 bg-transparent border-ford-darkGray" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="leverage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alavancagem (Net Debt/EBITDA)</FormLabel>
                  <FormControl>
                    <div className="relative form-input-animation">
                      <TrendingUp className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        type="number" 
                        step="0.1"
                        placeholder="Ex: 2.5" 
                        className="pl-10 bg-transparent border-ford-darkGray" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="revenueCagr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Revenue CAGR (%)</FormLabel>
                  <FormControl>
                    <div className="relative form-input-animation">
                      <Percent className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        type="number" 
                        placeholder="Ex: 12" 
                        className="pl-10 bg-transparent border-ford-darkGray" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="competitiveAdvantage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vantagem Competitiva</FormLabel>
                <FormControl>
                  <div className="relative form-input-animation">
                    <Award className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="pl-10 bg-transparent border-ford-darkGray">
                        <SelectValue placeholder="Selecione a principal vantagem" />
                      </SelectTrigger>
                      <SelectContent>
                        {competitiveAdvantageOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="mainLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização Principal</FormLabel>
                  <FormControl>
                    <div className="relative form-input-animation">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder="Estado ou região" 
                        className="pl-10 bg-transparent border-ford-darkGray" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="revenueModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo de Receita</FormLabel>
                  <FormControl>
                    <div className="relative form-input-animation">
                      <List className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="pl-10 bg-transparent border-ford-darkGray">
                          <SelectValue placeholder="Selecione o modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          {revenueModelOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <div className="relative form-input-animation">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <Input 
                      type="email" 
                      placeholder="seu-email@exemplo.com" 
                      className="pl-10 bg-transparent border-ford-darkGray" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PasswordInput form={form} />

          <Button 
            type="submit" 
            className="w-full bg-ford-blue hover:bg-ford-skyBlue text-white btn-animation"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Cadastrando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span>Cadastrar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
