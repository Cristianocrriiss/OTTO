import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; 

// 2. Interfaces TypeScript para a requisição (o que enviamos )
interface ChatRequest {
  user_id: string;
  message: string;
  conversation_id?: string; // Opcional para novas conversas
}

// 3. Interfaces TypeScript para a resposta (o que recebemos)
interface IntentMetadata {
  detected: string;
  confidence: number;
  matched_patterns: string[];
}

interface ResponseMetadata {
  is_new_conversation: boolean;
  knowledge_used: boolean;
  sources: string[];
  response_type: string;
  timestamp: string;
}

export interface ChatResponse {
  success: boolean;
  content: string;
  conversation_id: string;
  user_id: string;
  intent: IntentMetadata;
  metadata: ResponseMetadata;
  error?: string; // Adicionado para capturar erros do backend
}

/**
 * Envia uma mensagem para o backend OTTO e recebe a resposta.
 * 
 * @param user_id O ID do usuário logado (ex: email).
 * @param message A mensagem de texto do usuário.
 * @param conversation_id O ID da conversa atual (opcional, se for a primeira mensagem).
 * @returns Uma Promise que resolve para o objeto ChatResponse.
 */
export async function sendChatMessage(
  user_id: string,
  message: string,
  conversation_id?: string
): Promise<ChatResponse> {
  
  const payload: ChatRequest = {
    user_id,
    message,
  };

  // Adiciona o conversation_id apenas se ele existir
  if (conversation_id) {
    payload.conversation_id = conversation_id;
  }

  try {
    const response = await axios.post<ChatResponse>(`${API_BASE_URL}/chat`, payload);
    
    // O backend retorna 200 mesmo em caso de sucesso: false, então verificamos o corpo
    if (response.data.success) {
      return response.data;
    } else {
      // Trata o caso de sucesso: false (erro interno do agente)
      console.error("Erro do Agente OTTO:", response.data.error);
      return {
        ...response.data,
        content: response.data.content || "Desculpe, ocorreu um erro interno no assistente. Tente novamente.",
      } as ChatResponse;
    }

  } catch (error) {
    // Trata erros de rede ou HTTP (ex: 404, 500)
    console.error("Erro de comunicação com a API:", error);
    
    // Retorna um objeto de erro estruturado
    return {
      success: false,
      content: "Erro de rede ou servidor. Verifique se o backend está rodando em " + API_BASE_URL,
      conversation_id: conversation_id || '',
      user_id: user_id,
      intent: { detected: 'error', confidence: 1, matched_patterns: [] },
      metadata: { is_new_conversation: false, knowledge_used: false, sources: [], response_type: 'error', timestamp: new Date().toISOString() },
      error: axios.isAxiosError(error) ? error.message : 'Erro desconhecido de comunicação',
    };
  }
}
// Certifique-se de ter o axios instalado: npm install axios ou yarn add axios
