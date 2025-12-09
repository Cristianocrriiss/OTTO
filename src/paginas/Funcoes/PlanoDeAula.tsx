import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import estilos from './PlanoDeAula.module.css';
import { useAutenticacao } from '../../contextos/AutenticacaoContexto';
import { sendPlanoDeAula } from '../../api/ottoAPI';
import type { PlanoDeAulaRequest } from '../../api/ottoAPI';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';

// Tipos e Interfaces
type PlanoGerado = {
  objetivos: any; 
  metodologia: any;
  recursos: any;
  instrumentosAvaliacao: any;
  criteriosAvaliacao: any;
};

type FormData = {
  disciplina: string;
  turma: string;
  cargaHoraria: string;
  data: string;
  periodo: string;
  numAula: string;
  tema: string;
  subtemasBNCC: string;
};

export function PlanoDeAula() {
  const { usuarioLogado } = useAutenticacao();

  const [formData, setFormData] = useState<FormData>({
    disciplina: 'Sociologia',
    turma: '1º Ano A',
    cargaHoraria: '2 aulas (100 min)',
    data: new Date().toISOString().split('T')[0],
    periodo: 'Manhã',
    numAula: '14',
    tema: 'A Indústria Cultural e a Cultura de Massa',
    subtemasBNCC: 'EM13CHS101, EM13CHS102',
  });

  const [planoGerado, setPlanoGerado] = useState<PlanoGerado | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGerarPlano = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!usuarioLogado?.email) {
      setErrorMessage("Você precisa estar logado para gerar planos.");
      return;
    }

    setIsLoading(true);
    setPlanoGerado(null);
    setErrorMessage(null);
    setIsEditing(false); 

    try {
      const payload: PlanoDeAulaRequest = {
        user_id: usuarioLogado.email,
        disciplina: formData.disciplina,
        turma: formData.turma,
        cargaHoraria: formData.cargaHoraria,
        tema: formData.tema,
        subtemasBNCC: formData.subtemasBNCC
      };

      const response = await sendPlanoDeAula(payload);

      if (response.success) {
        setPlanoGerado({
          objetivos: response.objetivos || "Não gerado.",
          metodologia: response.metodologia || "Não gerado.",
          recursos: response.recursos || "Não gerado.",
          instrumentosAvaliacao: response.instrumentosAvaliacao || "Não gerado.",
          criteriosAvaliacao: response.criteriosAvaliacao || "Não gerado.",
        });
      } else {
        setErrorMessage(response.error || "Erro ao gerar o plano de aula. Tente novamente.");
      }

    } catch (error) {
      console.error(error);
      setErrorMessage("Erro inesperado ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // --- FUNÇÕES AUXILIARES ---

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

  // Remove caracteres de Markdown (*, #) para o PDF ficar limpo
  const cleanMarkdownForPDF = (text: any): string => {
    let str = safeMarkdown(text);
    // Remove negrito (**texto** -> texto)
    str = str.replace(/\*\*(.*?)\*\*/g, '$1');
    // Remove itálico (*texto* -> texto)
    str = str.replace(/\*(.*?)\*/g, '$1');
    // Remove títulos (# Título -> Título)
    str = str.replace(/^#+\s+/gm, '');
    return str;
  };

  // --- NOVA FUNÇÃO: Exportar PDF ---
  const handleExportarPDF = () => {
    if (!planoGerado) return;

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
      cursorY += (linhas.length * (tamanho / 2)) + 4; 
    };

    // Cabeçalho
    doc.setFillColor(10, 74, 144); 
    doc.rect(0, 0, 210, 15, 'F'); 
    
    cursorY = 30;
    adicionarTexto(`Plano de Aula - OTTO`, 18, true);
    cursorY += 5;

    // Identificação
    adicionarTexto(`Disciplina: ${formData.disciplina}`, 12, true);
    adicionarTexto(`Turma: ${formData.turma} | Duração: ${formData.cargaHoraria}`, 12);
    adicionarTexto(`Professor: ${usuarioLogado?.email || "Não informado"}`, 12);
    adicionarTexto(`Data: ${formData.data} (${formData.periodo}) | Aula nº: ${formData.numAula}`, 12);
    
    doc.setDrawColor(200);
    doc.line(margemEsquerda, cursorY, margemEsquerda + larguraTexto, cursorY); 
    cursorY += 10;

    // Conteúdo Principal
    adicionarTexto(`Tema: ${formData.tema}`, 14, true);
    adicionarTexto(`Habilidades BNCC: ${formData.subtemasBNCC}`, 11);
    cursorY += 8;

    // Seções Geradas
    const secoes = [
      { titulo: "3. Objetivos de Aprendizagem", conteudo: planoGerado.objetivos },
      { titulo: "4. Metodologia", conteudo: planoGerado.metodologia },
      { titulo: "5. Recursos Didáticos", conteudo: planoGerado.recursos },
      { titulo: "6. Instrumentos de Avaliação", conteudo: planoGerado.instrumentosAvaliacao },
      { titulo: "7. Critérios de Avaliação", conteudo: planoGerado.criteriosAvaliacao },
    ];

    secoes.forEach(secao => {
      adicionarTexto(secao.titulo, 12, true);
      // Limpa o markdown antes de escrever no PDF
      adicionarTexto(cleanMarkdownForPDF(secao.conteudo), 11);
      cursorY += 3;
    });

    // Rodapé
    const paginas = doc.getNumberOfPages();
    for(let i = 1; i <= paginas; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text(`Gerado por OTTO - Assistente Inteligente | Página ${i} de ${paginas}`, 105, 290, { align: "center" });
    }

    // Nome do arquivo sanitizado
    const nomeArquivo = `plano_${formData.disciplina.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${formData.data}.pdf`;
    doc.save(nomeArquivo);
  };

  const handleToggleEdit = () => {
    setIsEditing(prev => !prev);
  };
  
  const handlePlanoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlanoGerado(prevPlano => {
      if (!prevPlano) return null;
      return { ...prevPlano, [name]: value };
    });
  };
  
  const autoAdjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const getValueForEdit = (content: any): string => {
     return safeMarkdown(content);
  };

  return (
    <div className={estilos.container}>
      <aside className={estilos.painelEsquerdo}>
        <h1 className={estilos.tituloPainel}>Gerador de Plano de Aula</h1>
        <p className={estilos.subtituloPainel}>
          Preencha os dados principais e deixe o OTTO gerar a metodologia e a avaliação.
        </p>

        <form onSubmit={handleGerarPlano} className={estilos.formulario}>
          {/* ... (Campos do formulário permanecem idênticos) ... */}
          <div className={estilos.campoGrupo}>
            <label className={estilos.campoLabel}>Professor(a)</label>
            <input type="text" className={`${estilos.campoInput} ${estilos.campoInputReadonly}`} value={usuarioLogado?.email || 'Carregando...'} readOnly />
          </div>
          <div className={estilos.linhaCampos}>
            <div className={estilos.campoGrupo}>
              <label htmlFor="disciplina" className={estilos.campoLabel}>Disciplina</label>
              <input type="text" id="disciplina" name="disciplina" className={estilos.campoInput} value={formData.disciplina} onChange={handleFormChange} />
            </div>
            <div className={estilos.campoGrupo}>
              <label htmlFor="turma" className={estilos.campoLabel}>Turma</label>
              <input type="text" id="turma" name="turma" className={estilos.campoInput} value={formData.turma} onChange={handleFormChange} />
            </div>
          </div>
          <div className={estilos.linhaCampos}>
            <div className={estilos.campoGrupo}>
              <label htmlFor="cargaHoraria" className={estilos.campoLabel}>Carga Horária</label>
              <input type="text" id="cargaHoraria" name="cargaHoraria" className={estilos.campoInput} value={formData.cargaHoraria} onChange={handleFormChange} />
            </div>
             <div className={estilos.campoGrupo}>
              <label htmlFor="numAula" className={estilos.campoLabel}>Nº da Aula</label>
              <input type="number" id="numAula" name="numAula" className={estilos.campoInput} value={formData.numAula} onChange={handleFormChange} />
            </div>
          </div>
          <div className={estilos.linhaCampos}>
            <div className={estilos.campoGrupo}>
              <label htmlFor="data" className={estilos.campoLabel}>Data</label>
              <input type="date" id="data" name="data" className={estilos.campoInput} value={formData.data} onChange={handleFormChange} />
            </div>
            <div className={estilos.campoGrupo}>
              <label htmlFor="periodo" className={estilos.campoLabel}>Período</label>
              <select id="periodo" name="periodo" className={estilos.campoSelect} value={formData.periodo} onChange={handleFormChange}>
                <option>Manhã</option><option>Tarde</option><option>Noite</option>
              </select>
            </div>
          </div>
          <div className={estilos.campoGrupo}>
            <label htmlFor="tema" className={estilos.campoLabel}>Tema e Conteúdo Principal da Aula</label>
            <textarea id="tema" name="tema" className={estilos.campoTextarea} rows={3} value={formData.tema} onChange={handleFormChange} />
          </div>
          <div className={estilos.campoGrupo}>
            <label htmlFor="subtemasBNCC" className={estilos.campoLabel}>Habilidades da BNCC (Subtemas)</label>
            <input type="text" id="subtemasBNCC" name="subtemasBNCC" className={estilos.campoInput} placeholder="Ex: EM13CHS101, EM13CHS102" value={formData.subtemasBNCC} onChange={handleFormChange} />
          </div>

          {errorMessage && <div style={{ color: 'red', marginBottom: '10px', fontSize: '0.9rem', textAlign: 'center' }}>{errorMessage}</div>}

          <button type="submit" className={estilos.botaoGerar} disabled={isLoading}>
            {isLoading ? <span className={estilos.spinner}></span> : 'Gerar Plano com OTTO'}
          </button>
        </form>
      </aside>

      <main className={estilos.painelDireito}>
        {isLoading && (
          <div className={estilos.estadoInicial}>
            <span className={estilos.spinnerGrande}></span>
            <h2 className={estilos.tituloEstado}>Gerando seu plano...</h2>
            <p className={estilos.subtituloEstado}>Aguarde, o OTTO está trabalhando.</p>
          </div>
        )}

        {!isLoading && !planoGerado && (
          <div className={estilos.estadoInicial}>
            <span className={`material-symbols-outlined ${estilos.iconeEstado}`}>edit_document</span>
            <h2 className={estilos.tituloEstado}>Seu plano de aula aparecerá aqui</h2>
            <p className={estilos.subtituloEstado}>Preencha os campos ao lado e clique em "Gerar" para começar.</p>
          </div>
        )}

        {planoGerado && (
          <div className={estilos.planoGeradoContainer}>
            <div className={estilos.planoToolbar}>
              <button className={estilos.botaoToolbar}>
                <span className="material-symbols-outlined">content_copy</span> Copiar
              </button>
              {/* --- NOVO BOTÃO PDF --- */}
              <button className={estilos.botaoToolbar} onClick={handleExportarPDF}>
                <span className="material-symbols-outlined">picture_as_pdf</span> PDF
              </button>
              <button className={`${estilos.botaoToolbar} ${isEditing ? estilos.botaoSalvar : ''}`} onClick={handleToggleEdit}>
                <span className="material-symbols-outlined">{isEditing ? 'save' : 'edit'}</span>
                {isEditing ? 'Salvar Edições' : 'Editar'}
              </button>
            </div>

            <h2 className={estilos.tituloPlano}>Plano de Aula Gerado</h2>

            <section className={estilos.planoSecao}>
              <h3>1. Identificação</h3>
              <p><strong>Professor(a):</strong> {usuarioLogado?.email}</p>
              <p><strong>Disciplina:</strong> {formData.disciplina}</p>
              <p><strong>Turma:</strong> {formData.turma}</p>
              <p><strong>Carga Horária:</strong> {formData.cargaHoraria}</p>
              <p><strong>Data e Período:</strong> {formData.data} ({formData.periodo})</p>
              <p><strong>Nº da Aula:</strong> {formData.numAula}</p>
            </section>

            <section className={estilos.planoSecao}>
              <h3>2. Conteúdo</h3>
              <p><strong>Tema Principal:</strong> {formData.tema}</p>
              <p><strong>Habilidades (BNCC):</strong> {formData.subtemasBNCC}</p>
            </section>

            <section className={estilos.planoSecao}>
              <h3>3. Objetivos de Aprendizagem</h3>
              {isEditing ? (
                <textarea name="objetivos" className={estilos.campoEdicao} value={getValueForEdit(planoGerado.objetivos)} onChange={handlePlanoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : (
                <div className={estilos.markdownContent}>
                  <ReactMarkdown>{safeMarkdown(planoGerado.objetivos)}</ReactMarkdown>
                </div>
              )}
            </section>

            <section className={estilos.planoSecao}>
              <h3>4. Metodologia</h3>
              {isEditing ? (
                <textarea name="metodologia" className={estilos.campoEdicao} value={getValueForEdit(planoGerado.metodologia)} onChange={handlePlanoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : (
                <div className={estilos.markdownContent}>
                  <ReactMarkdown>{safeMarkdown(planoGerado.metodologia)}</ReactMarkdown>
                </div>
              )}
            </section>

            <section className={estilos.planoSecao}>
              <h3>5. Recursos Didáticos</h3>
              {isEditing ? (
                <textarea name="recursos" className={estilos.campoEdicao} value={getValueForEdit(planoGerado.recursos)} onChange={handlePlanoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : (
                <div className={estilos.markdownContent}>
                  <ReactMarkdown>{safeMarkdown(planoGerado.recursos)}</ReactMarkdown>
                </div>
              )}
            </section>

            <section className={estilos.planoSecao}>
              <h3>6. Instrumentos de Avaliação</h3>
              {isEditing ? (
                <textarea name="instrumentosAvaliacao" className={estilos.campoEdicao} value={getValueForEdit(planoGerado.instrumentosAvaliacao)} onChange={handlePlanoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : (
                <div className={estilos.markdownContent}>
                  <ReactMarkdown>{safeMarkdown(planoGerado.instrumentosAvaliacao)}</ReactMarkdown>
                </div>
              )}
            </section>

            <section className={estilos.planoSecao}>
              <h3>7. Critérios de Avaliação</h3>
              {isEditing ? (
                <textarea name="criteriosAvaliacao" className={estilos.campoEdicao} value={getValueForEdit(planoGerado.criteriosAvaliacao)} onChange={handlePlanoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : (
                <div className={estilos.markdownContent}>
                  <ReactMarkdown>{safeMarkdown(planoGerado.criteriosAvaliacao)}</ReactMarkdown>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}