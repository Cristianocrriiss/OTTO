import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; 

// --- Interfaces do Chat (Existentes) ---
interface ChatRequest {
  user_id: string;
  message: string;
  conversation_id?: string;
}

export interface ChatResponse {
  success: boolean;
  content: string;
  conversation_id: string;
  user_id: string;
  intent: any;
  metadata: any;
  error?: string;
}

// --- Interfaces de Redação (Existentes) ---
export interface RedacaoRequest {
  user_id: string;
  tipo: string;
  titulo: string;
  alunoNome: string;
  alunoSala: string;
  redacao: string;
  comentarios: string;
}

export interface RedacaoResponse {
  success: boolean;
  content: string;
  user_id: string;
  knowledge_used: boolean;
  sources: string[];
  nota?: string;
  analiseGeral?: string;
  c1?: string;
  c2?: string;
  c3?: string;
  c4?: string;
  c5?: string;
  sugestoes?: string;
  error?: string;
}

// --- NOVAS Interfaces para Plano de Aula (Backend) ---
export interface PlanoDeAulaRequest {
  user_id: string;
  disciplina: string;
  turma: string;
  cargaHoraria: string;
  tema: string;
  subtemasBNCC: string;
}

export interface PlanoDeAulaResponse {
  success: boolean;
  content: string;
  user_id: string;
  // Campos específicos que o backend expande no JSON
  objetivos?: string;
  metodologia?: string;
  recursos?: string;
  instrumentosAvaliacao?: string;
  criteriosAvaliacao?: string;
  error?: string;
}

export interface AdaptadorRequest {
  user_id: string;
  textoOriginal: string;
  tipoAdaptacao: string; // 'simplificar', 'resumir', etc.
  comentarios: string;
}

export interface AdaptadorResponse {
  success: boolean;
  content: string; // Mensagem de sistema
  titulo?: string; // Título gerado pela IA
  conteudoAdaptado?: string; // O texto principal
  error?: string;
}

// --- Funções de API ---

export async function sendChatMessage(
  user_id: string,
  message: string,
  conversation_id?: string
): Promise<ChatResponse> {
  const payload: ChatRequest = { user_id, message };
  if (conversation_id) payload.conversation_id = conversation_id;

  try {
    const response = await axios.post<ChatResponse>(`${API_BASE_URL}/chat`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro na API de Chat:", error);
    return {
      success: false,
      content: "Erro de conexão.",
      conversation_id: conversation_id || '',
      user_id,
      intent: {},
      metadata: {},
      error: axios.isAxiosError(error) ? error.message : 'Erro desconhecido'
    } as ChatResponse;
  }
}

export async function sendRedacaoParaCorrecao(
  dados: RedacaoRequest
): Promise<RedacaoResponse> {
  try {
    const response = await axios.post<RedacaoResponse>(`${API_BASE_URL}/redacao`, dados);
    if (response.data.success) {
      return response.data;
    } else {
      return {
        ...response.data,
        content: response.data.content || "Ocorreu um erro na correção."
      };
    }
  } catch (error) {
    console.error("Erro na API de Redação:", error);
    return {
      success: false,
      content: "Erro de comunicação com o servidor.",
      user_id: dados.user_id,
      knowledge_used: false,
      sources: [],
      error: axios.isAxiosError(error) ? error.message : 'Erro desconhecido'
    };
  }
}

export async function sendPlanoDeAula(
  dados: PlanoDeAulaRequest
): Promise<PlanoDeAulaResponse> {
  try {
    const response = await axios.post<PlanoDeAulaResponse>(`${API_BASE_URL}/plano-de-aula`, dados);
    
    if (response.data.success) {
      return response.data;
    } else {
      console.error("Erro no backend (Plano):", response.data.error);
      return {
        ...response.data,
        content: response.data.content || "Erro ao gerar o plano de aula."
      };
    }
  } catch (error) {
    console.error("Erro na API de Plano de Aula:", error);
    return {
      success: false,
      content: "Erro de comunicação com o servidor.",
      user_id: dados.user_id,
      error: axios.isAxiosError(error) ? error.message : 'Erro desconhecido'
    };
  }
}

export async function sendAdaptarConteudo(
  dados: AdaptadorRequest
): Promise<AdaptadorResponse> {
  try {
    const response = await axios.post<AdaptadorResponse>(`${API_BASE_URL}/adaptar`, dados);
    if (response.data.success) {
      return response.data;
    } else {
      return {
        ...response.data,
        content: response.data.content || "Erro ao adaptar conteúdo."
      };
    }
  } catch (error) {
    console.error("Erro na API de Adaptação:", error);
    return {
      success: false,
      content: "Erro de conexão.",
      error: axios.isAxiosError(error) ? error.message : 'Erro desconhecido'
    };
  }
}