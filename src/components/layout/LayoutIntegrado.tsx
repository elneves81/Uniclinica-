"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  Calendar,
  Users,
  UserCheck,
  Stethoscope,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  Activity
} from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Recepção', href: '/recepcao', icon: UserCheck },
  { name: 'Agenda', href: '/agenda', icon: Calendar },
  { name: 'Fila de Atendimento', href: '/fila-atendimento', icon: Activity },
  { name: 'Pacientes', href: '/pacientes', icon: Users },
  { name: 'Prontuários', href: '/prontuarios', icon: FileText },
  { name: 'Financeiro', href: '/financeiro', icon: DollarSign },
];

const specialties = [
  { name: 'Clínica Geral', href: '/especialidades/clinica-geral' },
  { name: 'Pediatria', href: '/especialidades/pediatria' },
  { name: 'Dermatologia', href: '/especialidades/dermatologia' },
  { name: 'Ginecologia', href: '/especialidades/ginecologia' },
  { name: 'Ortopedia', href: '/especialidades/ortopedia' },
];

interface LayoutIntegradoProps {
  children: React.ReactNode;
}

export default function LayoutIntegrado({ children }: LayoutIntegradoProps) {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        
        {/* Logo */}
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-xl font-bold text-gray-900">Uniclínica</span>
          </Link>
        </div>

        {/* Navegação Principal */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Especialidades */}
          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Especialidades
            </h3>
            <div className="mt-2 space-y-1">
              {specialties.map((specialty) => {
                const isActive = pathname === specialty.href;
                return (
                  <Link
                    key={specialty.name}
                    href={specialty.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Stethoscope className="h-4 w-4 mr-3" />
                    {specialty.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="space-y-2">
            <Link
              href="/configuracoes"
              className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Settings className="h-5 w-5 mr-3" />
              Configurações
            </Link>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
