import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, User, Mail, Briefcase, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Form schema validation
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Nome completo deve ter pelo menos 3 caracteres" }),
  companyName: z.string().min(2, { message: "Nome da empresa é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { email, password, fullName, companyName } = data;
      
      // First, store the user registration in the user_registrations table
      const { error: registrationError } = await supabase
        .from("user_registrations")
        .insert({
          full_name: fullName,
          company_name: companyName,
          email: email
        });

      if (registrationError) throw registrationError;

      // Then, attempt to sign up (this is optional, depending on if you want authentication)
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
          },
        },
      });

      if (authError) throw authError;

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Obrigado por se registrar.",
      });
      
      // Redirect to a thank you page or the dashboard
      navigate("/thank-you");
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Handle specific error messages
      if (error.message?.includes("already registered") || error.code === "23505") {
        setError("E-mail já cadastrado. Por favor, use outro e-mail ou faça login.");
      } else {
        setError(error.message || "Erro ao processar cadastro. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
          {error && (
            <Alert variant="destructive" className="border-red-600 bg-red-100/10 text-red-500">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <div className="relative form-input-animation">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="Digite seu nome completo" 
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <div className="relative form-input-animation">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha / Código de Acesso</FormLabel>
                <FormControl>
                  <div className="relative form-input-animation">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Digite sua senha" 
                      className="pl-10 pr-10 bg-transparent border-ford-darkGray" 
                      {...field} 
                    />
                    <button 
                      type="button" 
                      className="absolute right-3 top-3" 
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
