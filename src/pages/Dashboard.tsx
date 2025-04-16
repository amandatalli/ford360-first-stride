
import React from "react";
import Ford360Logo from "@/components/Ford360Logo";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-ford-dark text-white">
      <header className="border-b border-gray-800 py-4 px-6">
        <Ford360Logo />
      </header>
      
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-secondary p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Bem-vindo à Ford 360</h2>
          <p className="text-gray-300">
            Sua central de comando inteligente está pronta para transformar dados em valor.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
