'use client';

import { LayoutIntegrado } from '@/components/LayoutIntegrado';

export default function PediatriaPage() {
  return (
    <LayoutIntegrado>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pediatria
          </h1>
          <p className="text-gray-600">
            Atendimento especializado em pediatria
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Consulta Pediátrica</h2>
          <p className="text-gray-600">
            Sistema de atendimento pediátrico integrado com APIs especializadas.
          </p>
        </div>
      </div>
    </LayoutIntegrado>
  );
}