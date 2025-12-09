import { useState } from 'react'
import type {FormEvent} from 'react'
import estilos from './AdaptadorConteudo.module.css';
import { useAutenticacao } from '../../contextos/AutenticacaoContexto';
import { sendAdaptarConteudo } from '../../api/ottoAPI';
import type {AdaptadorRequest} from '../../api/ottoAPI'
import ReactMarkdown from 'react-markdown';
import { jsPDF } from "jspdf";

type ResultadoAdaptacao = {
  titulo: string;
  texto: string;
};

export function AdaptadorConteudo() {
  const { usuarioLogado } = useAutenticacao();

  const [textoOriginal, setTextoOriginal] = useState("");
  const [tipoAdaptacao, setTipoAdaptacao] = useState("simplificar");
  const [comentarios, setComentarios] = useState("");

  const [resultado, setResultado] = useState<ResultadoAdaptacao | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAdaptar = async (e: FormEvent) => {
    e.preventDefault();
    if (!usuarioLogado?.email) return;
    if (!textoOriginal.trim()) {
      setErrorMessage("Insira o texto original para adaptar.");
      return;
    }

    setIsLoading(true);
    setResultado(null);
    setErrorMessage(null);
    setIsEditing(false);

    try {
      const payload: AdaptadorRequest = {
        user_id: usuarioLogado.email,
        textoOriginal: textoOriginal,
        tipoAdaptacao: tipoAdaptacao,
        comentarios: comentarios
      };

      const response = await sendAdaptarConteudo(payload);

      if (response.success) {
        setResultado({
          titulo: response.titulo || "Texto Adaptado",
          texto: response.conteudoAdaptado || ""
        });
      } else {
        setErrorMessage(response.error || "Erro na adaptação.");
      }
    } catch (error) {
      setErrorMessage("Erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportarPDF = () => {
    if (!resultado) return;
    const doc = new jsPDF();
    const margem = 20;
    const largura = 170;
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(resultado.titulo, margem, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    const textoLimpo = resultado.texto.replace(/\*\*/g, "").replace(/#/g, "");
    const linhas = doc.splitTextToSize(textoLimpo, largura);
    
    linhas.forEach((linha: string) => {
        if (y > 280) { doc.addPage(); y = 20; }
        doc.text(linha, margem, y);
        y += 7;
    });
    
    doc.save("material_adaptado.pdf");
  };

  // --- NOVA FUNÇÃO DE LIMPEZA ---
  // Remove o título do conteúdo se ele aparecer logo no início como Markdown (# Título)
  const cleanContentDisplay = (text: string, title: string) => {
    if (!text) return "";
    
    // Remove espaços extras
    const cleanText = text.trim();
    
    // Verifica se começa com # seguido do título (aproximadamente)
    // Ex: "# Como nosso cérebro aprende"
    if (cleanText.startsWith('#')) {
        // Pega a primeira linha
        const firstLineEnd = cleanText.indexOf('\n');
        if (firstLineEnd !== -1) {
            const firstLine = cleanText.substring(0, firstLineEnd).replace(/#/g, '').trim();
            
            // Se a primeira linha for muito parecida com o título, removemos ela
            if (title.toLowerCase().includes(firstLine.toLowerCase()) || firstLine.toLowerCase().includes(title.toLowerCase())) {
                return cleanText.substring(firstLineEnd).trim();
            }
        }
    }
    
    return cleanText;
  };

  return (
    <div className={estilos.container}>
      <aside className={estilos.painelEsquerdo}>
        <h1 className={estilos.tituloPainel}>Adaptador de Conteúdo</h1>
        <p className={estilos.subtituloPainel}>Transforme textos complexos em materiais acessíveis.</p>

        <form onSubmit={handleAdaptar} className={estilos.formulario}>
          <div className={estilos.campoGrupo}>
            <label className={estilos.campoLabel}>Texto Original</label>
            <textarea 
              className={estilos.campoTextarea} 
              rows={12} 
              placeholder="Cole aqui o texto (artigo, notícia, capítulo de livro)..."
              value={textoOriginal}
              onChange={(e) => setTextoOriginal(e.target.value)}
            />
          </div>

          <div className={estilos.campoGrupo}>
            <label className={estilos.campoLabel}>Objetivo da Adaptação</label>
            <select 
              className={estilos.campoSelect} 
              value={tipoAdaptacao}
              onChange={(e) => setTipoAdaptacao(e.target.value)}
            >
              <option value="simplificar">Simplificar Linguagem (Fundamental I)</option>
              <option value="resumir">Resumir em Tópicos</option>
              <option value="glossario">Criar Glossário de Termos</option>
              <option value="dislexia">Formato Acessível (Dislexia)</option>
              <option value="mapa_mental">Estrutura de Mapa Mental</option>
            </select>
          </div>

          <div className={estilos.campoGrupo}>
            <label className={estilos.campoLabel}>Instruções Extras (Opcional)</label>
            <textarea 
              className={estilos.campoTextarea} 
              rows={2} 
              placeholder="Ex: Foque nos parágrafos 2 e 3..."
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
            />
          </div>

          {errorMessage && <p className={estilos.erro}>{errorMessage}</p>}

          <button type="submit" className={estilos.botaoGerar} disabled={isLoading}>
            {isLoading ? <span className={estilos.spinner}></span> : 'Adaptar Texto'}
          </button>
        </form>
      </aside>

      <main className={estilos.painelDireito}>
        {!resultado && !isLoading && (
           <div className={estilos.estadoInicial}>
             <span className="material-symbols-outlined" style={{fontSize: '4rem', color: '#ccc'}}>transform</span> 
             <h2>O texto adaptado aparecerá aqui</h2>
           </div>
        )}
        
        {isLoading && (
           <div className={estilos.estadoInicial}>
             <span className={estilos.spinnerGrande}></span>
             <h2>Adaptando conteúdo...</h2>
           </div>
        )}

        {resultado && (
          <div className={estilos.resultadoContainer}>
            <div className={estilos.toolbar}>
               <button type="button" onClick={handleExportarPDF} className={estilos.botaoToolbar}>
                 <span className="material-symbols-outlined">picture_as_pdf</span> PDF
               </button>
               <button type="button" onClick={() => setIsEditing(!isEditing)} className={estilos.botaoToolbar}>
                 <span className="material-symbols-outlined">{isEditing ? 'save' : 'edit'}</span>
                 {isEditing ? 'Salvar' : 'Editar'}
               </button>
            </div>

            <h2 className={estilos.tituloResultado}>{resultado.titulo}</h2>
            
            {isEditing ? (
              <textarea 
                className={estilos.campoEdicao} 
                value={resultado.texto}
                onChange={(e) => setResultado({...resultado, texto: e.target.value})}
              />
            ) : (
              <div className={estilos.markdownContent}>
                {/* AQUI: Usamos a função para limpar o título duplicado antes de mostrar */}
                <ReactMarkdown>
                    {cleanContentDisplay(resultado.texto, resultado.titulo)}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}