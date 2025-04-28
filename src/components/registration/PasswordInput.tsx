
import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import type { RegistrationFormValues } from "@/lib/validations/registration";

interface PasswordInputProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function PasswordInput({ form }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <button 
                type="button" 
                className="absolute right-3 top-3" 
                onClick={() => setShowPassword(!showPassword)}
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
  );
}

