
import React from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Ford360Logo from "@/components/Ford360Logo";
import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-ford-dark text-white flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-800 py-4 px-6">
        <Ford360Logo className="text-2xl" />
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Header */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="text-ford-blue">Ford</span> 360
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Sua central de comando inteligente para transformar dados em valor.
                </p>
              </div>

              <div className="bg-secondary/30 p-6 rounded-lg space-y-4 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-xl font-medium text-ford-blue">Transforme dados em decisões</h2>
                <p className="text-gray-300">
                  A plataforma que centraliza dados estratégicos, operacionais e financeiros 
                  para potencializar a gestão pós-aquisição e maximizar a geração de valor.
                </p>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="bg-ford-charcoal rounded-xl shadow-2xl p-8 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Primeiro Acesso</h2>
                <p className="text-gray-400">
                  Complete seu cadastro para acessar a plataforma
                </p>
              </div>

              <RegistrationForm />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-ford-darkGray">
                <AccordionTrigger className="text-left">Já tenho conta</AccordionTrigger>
                <AccordionContent>
                  Se você já possui uma conta na plataforma Ford 360, você pode{" "}
                  <Link to="/login" className="text-ford-blue hover:underline">
                    fazer login aqui
                  </Link>.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-ford-darkGray">
                <AccordionTrigger className="text-left">Esqueci minha senha</AccordionTrigger>
                <AccordionContent>
                  Caso tenha esquecido sua senha, acesse a{" "}
                  <Link to="/login" className="text-ford-blue hover:underline">
                    página de login
                  </Link>{" "}
                  e clique em "Esqueci minha senha" para redefini-la.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-ford-darkGray">
                <AccordionTrigger className="text-left">Não consigo acessar minha conta</AccordionTrigger>
                <AccordionContent>
                  Se você está tendo problemas para acessar sua conta, entre em contato com nossa equipe 
                  de suporte através do e-mail{" "}
                  <a 
                    href="mailto:suporte@ford360.com" 
                    className="text-ford-blue hover:underline"
                  >
                    suporte@ford360.com
                  </a>.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>

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

export default Index;
