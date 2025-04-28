
import React from "react";
import { Link } from "react-router-dom";
import Ford360Logo from "@/components/Ford360Logo";
import CompanyEvaluationForm from "@/components/evaluation/CompanyEvaluationForm";

const CompanyEvaluation = () => {
  return (
    <div className="min-h-screen bg-ford-dark text-white flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-800 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Ford360Logo className="text-2xl" />
          <Link to="/dashboard" className="text-ford-blue hover:text-ford-skyBlue transition-colors">
            Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Avaliação de Empresas — Ford 360
            </h1>
            <p className="text-gray-400">
              Registre e avalie potenciais alvos de aquisição de acordo com critérios estratégicos e financeiros.
            </p>
          </div>

          <div className="bg-ford-charcoal rounded-xl shadow-2xl p-8">
            <CompanyEvaluationForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4 px-6">
        <div className="container mx-auto text-center text-sm text-gray-500">
          Ford 360 — Command Center
        </div>
      </footer>
    </div>
  );
};

export default CompanyEvaluation;
