"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Adicionar dias vazios do início
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Adicionar dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDayClick = (day: number | null) => {
    if (!day) return;
    
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateParam = selectedDate.toISOString().split('T')[0]; // formato YYYY-MM-DD
    
    // Redireciona para a página de agenda com a data selecionada
    router.push(`/agenda?date=${dateParam}`);
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date().getDate();
  const isCurrentMonth = currentDate.getMonth() === new Date().getMonth() && 
                         currentDate.getFullYear() === new Date().getFullYear();

  // Dias com agendamentos (exemplo de dados)
  const daysWithAppointments = [8, 12, 15, 18, 22, 25, 28];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Calendário Médico
        </h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <h4 className="text-sm font-medium text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`
              text-center text-sm py-2 rounded-md transition-colors relative
              ${day === null ? 'invisible' : 'cursor-pointer'}
              ${day === today && isCurrentMonth 
                ? 'bg-blue-500 text-white font-medium hover:bg-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
              }
              ${day && daysWithAppointments.includes(day) && !(day === today && isCurrentMonth)
                ? 'bg-green-50 text-green-700 border border-green-200'
                : ''
              }
            `}
          >
            {day}
            {day && daysWithAppointments.includes(day) && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center justify-between">
            <span>Consultas hoje:</span>
            <span className="font-medium text-blue-600">8</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Próxima consulta:</span>
            <span className="font-medium text-green-600">14:30</span>
          </div>
          <div className="text-xs text-gray-500 mt-3">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Clique em uma data para ver agendamentos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
