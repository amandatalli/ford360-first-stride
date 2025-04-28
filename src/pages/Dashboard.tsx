
import React from "react";
import Ford360Logo from "@/components/Ford360Logo";
import { CompanyDashboard } from "@/components/companies/CompanyDashboard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-ford-dark text-white">
      <header className="border-b border-gray-800 py-4 px-6">
        <Ford360Logo />
      </header>
      
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Gestão de Empresas</h1>
        <div className="bg-secondary p-6 rounded-lg">
          <CompanyDashboard />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
