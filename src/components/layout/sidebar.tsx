"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  CalendarDays, 
  Users, 
  FileText, 
  DollarSign, 
  Settings, 
  Home,
  Stethoscope,
  Baby,
  Eye,
  Heart,
  Search,
  UserPlus,
  Clock,
  Shield,
  List,
  Bone
} from "lucide-react";

const menuItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/recepcao", label: "Recepção", icon: UserPlus },
  { href: "/fila-atendimento", label: "Fila de Atendimento", icon: Clock },
  { href: "/pacientes", label: "Pacientes", icon: Users },
  { href: "/busca-usuarios", label: "Pesquisa de Usuário", icon: Search },
  { href: "/prontuarios", label: "Prontuários", icon: FileText },
  { href: "/financeiro", label: "Financeiro", icon: DollarSign },
  {
    label: "Especialidades",
    icon: Stethoscope,
    submenu: [
      { href: "/especialidades/clinica-geral", label: "Clínica Geral", icon: Stethoscope },
      { href: "/especialidades/pediatria", label: "Pediatria", icon: Baby },
      { href: "/especialidades/dermatologia", label: "Dermatologia", icon: Eye },
      { href: "/especialidades/ginecologia", label: "Ginecologia", icon: Heart },
      { href: "/especialidades/ortopedia", label: "Ortopedia", icon: Bone },
    ]
  },
  { href: "/relatorios", label: "Relatórios", icon: FileText },
  { href: "/acesso-profissional", label: "Acesso Profissional", icon: Shield },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Uniclínica</h1>
        </div>
      </div>

      <nav className="px-4 pb-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.submenu ? (
                <div className="space-y-1">
                  <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700">
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </div>
                  <ul className="ml-6 space-y-1">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                            pathname === subItem.href
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <subItem.icon className="w-4 h-4 mr-3" />
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
