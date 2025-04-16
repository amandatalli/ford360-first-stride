
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import Ford360Logo from "@/components/Ford360Logo";
import { supabaseClient } from "@/lib/supabase-placeholder";

// Form schema validation
const formSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "Senha é obrigatória" })
});

type FormValues = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { email, password } = data;
      
      // Sign in with Supabase
      const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      
      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Credenciais inválidas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-ford-dark flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-800 py-4 px-6">
        <Ford360Logo />
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Entrar</h1>
            <p className="mt-2 text-sm text-gray-400">
              Acesse sua central de comando inteligente
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="border-red-600 bg-red-100/10 text-red-500">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative form-input-animation">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Digite sua senha" 
                          className="pl-3 pr-10 bg-transparent border-ford-darkGray" 
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

              <div className="flex items-center justify-end">
                <Link to="/reset-password" className="text-sm text-ford-blue hover:underline">
                  Esqueci minha senha
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-ford-blue hover:bg-ford-skyBlue text-white btn-animation"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Entrando...</span>
                  </div>
                ) : (
                  "Entrar"
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Não tem uma conta?{" "}
                  <Link to="/" className="text-ford-blue hover:underline">
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link to="/termos" className="hover:text-ford-blue">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-ford-blue">Política de Privacidade</Link>
          </div>
          <div>
            <a href="mailto:suporte@ford360.com" className="hover:text-ford-blue">
              suporte@ford360.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
