
import React from "react";
import Ford360Logo from "@/components/Ford360Logo";
import RegistrationForm from "@/components/RegistrationForm";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-ford-dark text-white flex flex-col">
      {/* Navigation */}
      <header className="border-b border-gray-800 py-4 px-6">
        <Ford360Logo />
      </header>
      
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
                <p className="mt-2 text-sm text-gray-400">
                  Complete seu cadastro para acessar a plataforma
                </p>
              </div>

              <RegistrationForm />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-ford-blue">Termos de Uso</a>
            <a href="#" className="hover:text-ford-blue">Política de Privacidade</a>
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

export default Dashboard;
