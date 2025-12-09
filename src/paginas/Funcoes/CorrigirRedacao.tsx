import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import estilos from './CorrigirRedacao.module.css';
import { useAutenticacao } from '../../contextos/AutenticacaoContexto';
import { sendRedacaoParaCorrecao} from '../../api/ottoAPI';
import type { RedacaoRequest } from '../../api/ottoAPI';
import { jsPDF } from "jspdf"; 
import ReactMarkdown from 'react-markdown'; 

// Tipos locais
type FormData = {
  tipo: 'enem' | 'fuvest' | 'unicamp' | 'outro';
  titulo: string;
  alunoNome: string;
  alunoSala: string;
  redacao: string;
  comentarios: string;
};

type CorrecaoGerada = {
  nota: string;
  analiseGeral: any; // Mudado para 'any' para aceitar arrays se a IA mandar
  c1: any;
  c2: any;
  c3: any;
  c4: any;
  c5: any;
  sugestoes: any;
};

export function CorrigirRedacao() {
  const { usuarioLogado } = useAutenticacao();

  const [formData, setFormData] = useState<FormData>({
    tipo: 'enem',
    titulo: '',
    alunoNome: '',
    alunoSala: '',
    redacao: '', 
    comentarios: '',
  });

  const [correcaoGerada, setCorrecaoGerada] = useState<CorrecaoGerada | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGerarCorrecao = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!usuarioLogado?.email) {
      setErrorMessage("Você precisa estar logado para corrigir redações.");
      return;
    }
    
    if (!formData.redacao.trim()) {
      setErrorMessage("Por favor, insira o texto da redação.");
      return;
    }

    setIsLoading(true);
    setCorrecaoGerada(null);
    setErrorMessage(null);
    setIsEditing(false);

    try {
      const payload: RedacaoRequest = {
        user_id: usuarioLogado.email,
        tipo: formData.tipo,
        titulo: formData.titulo || "Sem título",
        alunoNome: formData.alunoNome || "Aluno não identificado",
        alunoSala: formData.alunoSala || "Sala não informada",
        redacao: formData.redacao.trim(), 
        comentarios: formData.comentarios
      };

      const response = await sendRedacaoParaCorrecao(payload);

      if (response.success) {
        setCorrecaoGerada({
          nota: response.nota || "Nota não atribuída",
          analiseGeral: response.analiseGeral || response.content,
          c1: response.c1 || "Não avaliado",
          c2: response.c2 || "Não avaliado",
          c3: response.c3 || "Não avaliado",
          c4: response.c4 || "Não avaliado",
          c5: response.c5 || "Não avaliado",
          sugestoes: response.sugestoes || "Sem sugestões."
        });
      } else {
        setErrorMessage(response.error || "Erro ao processar a correção.");
      }

    } catch (error) {
      setErrorMessage("Ocorreu um erro inesperado. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNÇÕES AUXILIARES DE FORMATAÇÃO ---

  // Converte qualquer retorno da IA em string segura para Markdown
  const safeMarkdown = (content: any): string => {
    if (!content) return "";
    if (Array.isArray(content)) {
      return content.map(item => `- ${String(item)}`).join('\n');
    }
    if (typeof content === 'object') {
        return JSON.stringify(content);
    }
    return String(content);
  };

  // Helper para o modo de edição (textarea)
  const getValueForEdit = (content: any): string => {
     return safeMarkdown(content);
  };

  // Limpa Markdown para o PDF
  const cleanMarkdownForPDF = (text: any): string => {
    let str = safeMarkdown(text);
    str = str.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove negrito
    str = str.replace(/\*(.*?)\*/g, '$1');     // Remove itálico
    str = str.replace(/^#+\s+/gm, '');         // Remove títulos
    return str;
  };

  // --- PDF ---
  const handleExportarPDF = () => {
    if (!correcaoGerada) return;

    const doc = new jsPDF();
    const margemEsquerda = 20;
    const larguraTexto = 170; 
    let cursorY = 20;

    doc.setFont("helvetica", "normal");

    const adicionarTexto = (texto: string, tamanho: number, negrito: boolean = false) => {
      doc.setFontSize(tamanho);
      doc.setFont("helvetica", negrito ? "bold" : "normal");
      const linhas = doc.splitTextToSize(texto, larguraTexto);
      
      if (cursorY + (linhas.length * 7) > 280) {
        doc.addPage();
        cursorY = 20;
      }

      doc.text(linhas, margemEsquerda, cursorY);
      cursorY += (linhas.length * (tamanho / 2)) + 5; 
    };

    doc.setFillColor(10, 74, 144); 
    doc.rect(0, 0, 210, 15, 'F'); 
    
    cursorY = 30;
    adicionarTexto(`Correção de Redação - OTTO`, 18, true);
    cursorY += 5;

    adicionarTexto(`Título: ${formData.titulo}`, 12, true);
    adicionarTexto(`Aluno: ${formData.alunoNome} | Sala: ${formData.alunoSala}`, 12);
    adicionarTexto(`Tipo: ${formData.tipo.toUpperCase()}`, 12);
    
    doc.setDrawColor(200);
    doc.line(margemEsquerda, cursorY, margemEsquerda + larguraTexto, cursorY); 
    cursorY += 10;

    adicionarTexto(`Nota Final: ${correcaoGerada.nota}`, 14, true);
    cursorY += 5;

    adicionarTexto("Análise Geral:", 12, true);
    adicionarTexto(cleanMarkdownForPDF(correcaoGerada.analiseGeral), 11);
    cursorY += 5;

    adicionarTexto("Detalhamento por Competência:", 12, true);
    
    const competencias = [
      { nome: "C1 - Norma Culta", texto: correcaoGerada.c1 },
      { nome: "C2 - Compreensão/Tema", texto: correcaoGerada.c2 },
      { nome: "C3 - Argumentação", texto: correcaoGerada.c3 },
      { nome: "C4 - Coesão", texto: correcaoGerada.c4 },
      { nome: "C5 - Proposta de Intervenção", texto: correcaoGerada.c5 },
    ];

    competencias.forEach(comp => {
      adicionarTexto(comp.nome, 11, true);
      adicionarTexto(cleanMarkdownForPDF(comp.texto), 11);
      cursorY += 2;
    });

    cursorY += 5;
    adicionarTexto("Sugestões de Melhoria:", 12, true);
    adicionarTexto(cleanMarkdownForPDF(correcaoGerada.sugestoes), 11);

    const paginas = doc.getNumberOfPages();
    for(let i = 1; i <= paginas; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text(`Gerado por OTTO | Página ${i} de ${paginas}`, 105, 290, { align: "center" });
    }

    const nomeSanitizado = formData.alunoNome.replace(/[^a-z0-9]/gi, '_').toLowerCase() || "aluno";
    doc.save(`correcao_${nomeSanitizado}.pdf`);
  };

  const handleToggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  const handleCorrecaoChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setCorrecaoGerada(prev => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  const autoAdjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  return (
    <div className={estilos.container}>
      <aside className={estilos.painelEsquerdo}>
        <h1 className={estilos.tituloPainel}>Corretor de Redações</h1>
        <p className={estilos.subtituloPainel}>
          Insira o texto do aluno e os parâmetros de correção.
        </p>

        <form onSubmit={handleGerarCorrecao} className={estilos.formulario}>
          <div className={estilos.campoGrupo}>
            <label htmlFor="tipo" className={estilos.campoLabel}>Tipo de Correção</label>
            <select id="tipo" name="tipo" className={estilos.campoSelect} value={formData.tipo} onChange={handleFormChange}>
              <option value="enem">ENEM (5 Competências)</option>
              <option value="fuvest">FUVEST (Argumentação)</option>
              <option value="unicamp">UNICAMP (Gênero Textual)</option>
              <option value="outro">Correção Genérica</option>
            </select>
          </div>

          <div className={estilos.campoGrupo}>
            <label htmlFor="titulo" className={estilos.campoLabel}>Título da Redação</label>
            <input type="text" id="titulo" name="titulo" className={estilos.campoInput} placeholder="Ex: O Desafio da Evasão Escolar" value={formData.titulo} onChange={handleFormChange} />
          </div>

          <div className={estilos.linhaCampos}>
            <div className={estilos.campoGrupo}>
              <label htmlFor="alunoNome" className={estilos.campoLabel}>Nome do Aluno</label>
              <input type="text" id="alunoNome" name="alunoNome" className={estilos.campoInput} placeholder="Ex: João da Silva" value={formData.alunoNome} onChange={handleFormChange} />
            </div>
            <div className={estilos.campoGrupo}>
              <label htmlFor="alunoSala" className={estilos.campoLabel}>Sala</label>
              <input type="text" id="alunoSala" name="alunoSala" className={estilos.campoInput} placeholder="Ex: 3º B" value={formData.alunoSala} onChange={handleFormChange} />
            </div>
          </div>

          <div className={estilos.campoGrupo}>
            <label htmlFor="redacao" className={estilos.campoLabel}>Cole a Redação Aqui</label>
            <textarea
              id="redacao"
              name="redacao"
              className={estilos.campoTextarea}
              rows={15}
              placeholder="Cole aqui o texto completo da redação..."
              value={formData.redacao}
              onChange={handleFormChange}
            />
          </div>

          <div className={estilos.campoGrupo}>
            <label htmlFor="comentarios" className={estilos.campoLabel}>Comentários Adicionais (Opcional)</label>
            <textarea id="comentarios" name="comentarios" className={estilos.campoTextarea} rows={4} placeholder="Ex: Focar na coesão textual." value={formData.comentarios} onChange={handleFormChange} />
          </div>

          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '10px', fontSize: '0.9rem' }}>
              {errorMessage}
            </div>
          )}

          <button type="submit" className={estilos.botaoGerar} disabled={isLoading}>
            {isLoading ? <span className={estilos.spinner}></span> : 'Corrigir com OTTO'}
          </button>
        </form>
      </aside>

      <main className={estilos.painelDireito}>
        {isLoading && (
          <div className={estilos.estadoInicial}>
            <span className={estilos.spinnerGrande}></span>
            <h2 className={estilos.tituloEstado}>Analisando a redação...</h2>
            <p className={estilos.subtituloEstado}>Isso pode levar alguns segundos.</p>
          </div>
        )}

        {!isLoading && !correcaoGerada && (
          <div className={estilos.estadoInicial}>
            <span className={`material-symbols-outlined ${estilos.iconeEstado}`}>rule</span>
            <h2 className={estilos.tituloEstado}>A correção aparecerá aqui</h2>
            <p className={estilos.subtituloEstado}>Preencha os campos ao lado e clique em "Corrigir".</p>
          </div>
        )}

        {correcaoGerada && (
          <div className={estilos.planoGeradoContainer}>
            <div className={estilos.planoToolbar}>
              <button className={estilos.botaoToolbar} onClick={() => {navigator.clipboard.writeText(safeMarkdown(correcaoGerada.analiseGeral)); alert("Resumo copiado!");}}>
                <span className="material-symbols-outlined">content_copy</span> Copiar
              </button>
              <button className={estilos.botaoToolbar} onClick={handleExportarPDF}>
                <span className="material-symbols-outlined">picture_as_pdf</span> PDF
              </button>
              <button className={`${estilos.botaoToolbar} ${isEditing ? estilos.botaoSalvar : ''}`} onClick={handleToggleEdit}>
                <span className="material-symbols-outlined">{isEditing ? 'save' : 'edit'}</span>
                {isEditing ? 'Salvar Edições' : 'Editar'}
              </button>
            </div>

            <h2 className={estilos.tituloPlano}>Análise da Redação: "{formData.titulo}"</h2>

            <section className={estilos.planoSecao}>
              <h3>Identificação</h3>
              <p><strong>Aluno(a):</strong> {formData.alunoNome}</p>
              <p><strong>Sala:</strong> {formData.alunoSala}</p>
              <p><strong>Tipo:</strong> {formData.tipo.toUpperCase()}</p>
            </section>

            {/* --- USO DO MARKDOWN NAS SEÇÕES --- */}
            
            <section className={estilos.planoSecao}>
              <h3>Análise Geral</h3>
              <p>
                <strong>Nota Sugerida: </strong>
                {isEditing ? (
                  <input name="nota" className={estilos.campoEdicaoInput} value={correcaoGerada.nota} onChange={handleCorrecaoChange as any} />
                ) : (
                  <span className={estilos.nota}>{correcaoGerada.nota}</span>
                )}
              </p>
              {isEditing ? (
                <textarea name="analiseGeral" className={estilos.campoEdicao} value={getValueForEdit(correcaoGerada.analiseGeral)} onChange={handleCorrecaoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : (
                <div className={estilos.markdownContent}>
                  <ReactMarkdown>{safeMarkdown(correcaoGerada.analiseGeral)}</ReactMarkdown>
                </div>
              )}
            </section>

            <section className={estilos.planoSecao}>
              <h3>Análise por Competência</h3>
              {['c1', 'c2', 'c3', 'c4', 'c5'].map((comp, index) => (
                <div key={comp}>
                  <p><strong>C{index + 1} ({getCompetenciaName(index, formData.tipo)}):</strong></p>
                  {isEditing ? (
                    <textarea name={comp} className={estilos.campoEdicao} value={getValueForEdit(correcaoGerada[comp as keyof CorrecaoGerada])} onChange={handleCorrecaoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
                  ) : (
                    <div className={estilos.markdownContent}>
                        <ReactMarkdown>{safeMarkdown(correcaoGerada[comp as keyof CorrecaoGerada])}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}
            </section>

            <section className={estilos.planoSecao}>
              <h3>Sugestões de Melhoria</h3>
              {isEditing ? (
                <textarea name="sugestoes" className={estilos.campoEdicao} value={getValueForEdit(correcaoGerada.sugestoes)} onChange={handleCorrecaoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : (
                <div className={estilos.markdownContent}>
                    <ReactMarkdown>{safeMarkdown(correcaoGerada.sugestoes)}</ReactMarkdown>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function getCompetenciaName(index: number, _tipo: string) {
  const nomesEnem = ['Norma Culta', 'Compreensão/Tema', 'Argumentação', 'Coesão', 'Proposta de Intervenção'];
  return nomesEnem[index] || `Critério ${index + 1}`;
}