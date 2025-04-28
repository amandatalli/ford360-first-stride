
import React from "react";
import Ford360Logo from "@/components/Ford360Logo";
import { CompanyDashboard } from "@/components/companies/CompanyDashboard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-ford-dark text-white flex flex-col">
      {/* Navigation */}
      <header className="border-b border-gray-800 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Ford360Logo />
          <div className="flex items-center space-x-4">
            <Link 
              to="/company-evaluation" 
              className="px-4 py-2 bg-ford-blue hover:bg-ford-skyBlue transition-colors rounded text-white"
            >
              Nova Avaliação
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Gestão de Empresas</h1>
            <p className="text-gray-400 mt-2">Avalie e monitore empresas para potenciais aquisições</p>
          </div>
          
          <div className="bg-ford-charcoal p-6 rounded-xl shadow-lg">
            <CompanyDashboard />
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
