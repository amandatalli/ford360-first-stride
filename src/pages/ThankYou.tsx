
import React from "react";
import { Link } from "react-router-dom";
import Ford360Logo from "@/components/Ford360Logo";

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-ford-dark text-white flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-800 py-4 px-6">
        <Ford360Logo />
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto text-center space-y-6">
          <div className="animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ford-blue mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Cadastro Realizado!</h1>
            <p className="text-gray-400 mb-6">
              Obrigado por se registrar no Ford 360. Nossa equipe entrará em contato em breve.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              to="/" 
              className="block w-full bg-ford-blue hover:bg-ford-skyBlue text-white font-medium py-3 px-4 rounded transition-colors"
            >
              Voltar para a página inicial
            </Link>
            
            <Link
              to="/login"
              className="block w-full bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300 font-medium py-3 px-4 rounded transition-colors"
            >
              Ir para o login
            </Link>
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

export default ThankYou;
