import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    
    // Mock da fila de atendimento
    const mockQueue = [
      {
        id: "queue_1",
        patientId: "1",
        appointmentId: "1", 
        patientName: "MARIA SILVA SANTOS",
        specialty: "CLÍNICA GERAL",
        doctorName: "DR. JOÃO SANTOS",
        position: 1,
        status: "waiting",
        calledAt: null,
        startedAt: null,
        priority: "normal"
      },
      {
        id: "queue_2", 
        patientId: "2",
        appointmentId: "2",
        patientName: "JOÃO OLIVEIRA COSTA", 
        specialty: "PEDIATRIA",
        doctorName: "DRA. ANA COSTA",
        position: 1,
        status: "in-progress",
        calledAt: new Date(Date.now() - 300000).toISOString(), // 5 min atrás
        startedAt: new Date(Date.now() - 180000).toISOString(), // 3 min atrás
        priority: "normal"
      }
    ];
    
    let filteredQueue = mockQueue;
    
    if (specialty) {
      filteredQueue = mockQueue.filter(entry => 
        entry.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }
    
    return NextResponse.json({
      queue: filteredQueue,
      waiting: filteredQueue.filter(entry => entry.status === 'waiting').length,
      inProgress: filteredQueue.filter(entry => entry.status === 'in-progress').length,
      success: true
    });
    
  } catch (error) {
    console.error('Erro na API da fila:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { patientId, appointmentId, specialty } = await request.json();
    
    if (!patientId || !appointmentId) {
      return NextResponse.json(
        { error: 'patientId e appointmentId são obrigatórios', success: false },
        { status: 400 }
      );
    }
    
    const newQueueEntry = {
      id: `queue_${Date.now()}`,
      patientId,
      appointmentId,
      specialty: specialty || "CLÍNICA GERAL",
      position: Math.floor(Math.random() * 5) + 1, // Posição simulada
      status: "waiting",
      calledAt: null,
      startedAt: null
    };
    
    return NextResponse.json({
      queueEntry: newQueueEntry,
      message: 'Paciente adicionado à fila com sucesso',
      success: true
    }, { status: 201 });
    
  } catch (error) {
    console.error('Erro ao adicionar à fila:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'id e status são obrigatórios', success: false },
        { status: 400 }
      );
    }
    
    const updatedEntry = {
      id,
      status,
      calledAt: status === 'called' ? new Date().toISOString() : null,
      startedAt: status === 'in-progress' ? new Date().toISOString() : null,
      completedAt: status === 'completed' ? new Date().toISOString() : null
    };
    
    return NextResponse.json({
      queueEntry: updatedEntry,
      message: 'Status da fila atualizado com sucesso',
      success: true
    });
    
  } catch (error) {
    console.error('Erro ao atualizar fila:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}
