import { NextRequest, NextResponse } from "next/server";

const mockAppointments = [
  {
    id: "1",
    patientId: "1",
    patientName: "MARIA SILVA SANTOS", 
    doctorName: "DR. JOÃO SANTOS",
    specialty: "CLÍNICA GERAL",
    date: new Date().toISOString().split('T')[0], // Hoje
    time: "09:00",
    status: "scheduled",
    type: "consultation",
    priority: "normal",
    notes: "Consulta de rotina"
  },
  {
    id: "2",
    patientId: "2", 
    patientName: "JOÃO OLIVEIRA COSTA",
    doctorName: "DRA. ANA COSTA",
    specialty: "PEDIATRIA",
    date: new Date().toISOString().split('T')[0], // Hoje
    time: "14:30",
    status: "scheduled",
    type: "return",
    priority: "normal",
    notes: "Retorno para acompanhamento"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const patientId = searchParams.get('patientId');
    
    let filteredAppointments = mockAppointments;
    
    if (date) {
      filteredAppointments = filteredAppointments.filter(apt => apt.date === date);
    }
    
    if (patientId) {
      filteredAppointments = filteredAppointments.filter(apt => apt.patientId === patientId);
    }
    
    return NextResponse.json({
      appointments: filteredAppointments,
      total: filteredAppointments.length,
      success: true
    });
    
  } catch (error) {
    console.error('Erro na API de agendamentos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json();
    
    // Validação básica
    if (!appointmentData.patientId || !appointmentData.doctorName || !appointmentData.date || !appointmentData.time) {
      return NextResponse.json(
        { error: 'Dados obrigatórios: patientId, doctorName, date, time', success: false },
        { status: 400 }
      );
    }
    
    // Simular criação do agendamento
    const newAppointment = {
      id: `appointment_${Date.now()}`,
      ...appointmentData,
      status: 'scheduled'
    };
    
    return NextResponse.json({
      appointment: newAppointment,
      message: 'Agendamento criado com sucesso',
      success: true
    }, { status: 201 });
    
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const appointmentData = await request.json();
    
    if (!appointmentData.id) {
      return NextResponse.json(
        { error: 'ID do agendamento é obrigatório', success: false },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      appointment: appointmentData,
      message: 'Agendamento atualizado com sucesso', 
      success: true
    });
    
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}
