import {useState} from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import estilos from './CorrigirRedacao.module.css';

// Define a estrutura dos dados do formulário
type FormData = {
  tipo: 'enem' | 'fuvest' | 'unicamp' | 'outro';
  titulo: string;
  alunoNome: string;
  alunoSala: string;
  redacao: string;
  comentarios: string;
};

// Define a estrutura do que a IA vai gerar
type CorrecaoGerada = {
  nota: string;
  analiseGeral: string;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  c5: string;
  sugestoes: string;
};

export function CorrigirRedacao() {
  // Estados para o formulário
  const [formData, setFormData] = useState<FormData>({
    tipo: 'enem',
    titulo: 'O Desafio da Evasão Escolar',
    alunoNome: 'João da Silva',
    alunoSala: '3º B',
    redacao: 'A evasão escolar no Brasil é um problema estrutural que persiste...\n(Cole a redação aqui)',
    comentarios: 'Focar na análise da Competência 3 (Argumentação).',
  });

  // Estados para o resultado
  const [correcaoGerada, setCorrecaoGerada] = useState<CorrecaoGerada | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Atualiza o estado do formulário
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as any }));
  };

  // Simulação da chamada de IA
  const handleGerarCorrecao = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCorrecaoGerada(null);
    setIsEditing(false);

    // Simulando uma chamada de API
    setTimeout(() => {
      setCorrecaoGerada({
        nota: '840 / 1000',
        analiseGeral: `O texto apresenta uma excelente compreensão do tema e defende seu ponto de vista de forma clara. A argumentação é sólida, porém pode ser melhorada com o uso de mais repertório sociocultural. A proposta de intervenção está completa, mas poderia ser mais detalhada.`,
        c1: 'O texto demonstra bom domínio, com poucos desvios gramaticais. Houve um erro de concordância verbal no 3º parágrafo.',
        c2: 'Demonstra excelente compreensão da proposta, aplicando conceitos de várias áreas do conhecimento.',
        c3: 'Argumentação sólida, mas o repertório é baseado principalmente no senso comum. Faltou citar dados ou teóricos para fortalecer a tese.',
        c4: 'Os mecanismos de coesão são usados de forma eficaz, garantindo a fluidez da leitura.',
        c5: 'A proposta é vaga. Apresenta agente e ação, mas faltam o "modo/meio", o "detalhamento" e o "efeito esperado".',
        sugestoes: `• Revisar a concordância verbal em frases longas.
• Para a C3, tentar memorizar e aplicar citações de filósofos (Ex: Zygmunt Bauman) ou dados do IBGE/MEC.
• Na C5, sempre usar o "GOMIFES" (Governo, ONGs, Mídia, Indivíduo, Família, Escola, Sociedade) e detalhar a ação.`
      });
      setIsLoading(false);
    }, 1500);
  };

  // Função para ligar/desligar o modo de edição
  const handleToggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  // Função para atualizar o estado 'correcaoGerada' quando o usuário digita
  const handleCorrecaoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCorrecaoGerada(prevCorrecao => {
      if (!prevCorrecao) return null;
      return {
        ...prevCorrecao,
        [name]: value
      };
    });
  };

  // Função auxiliar para auto-ajustar a altura dos textareas
  const autoAdjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };


  return (
    <div className={estilos.container}>
      {/* ============================================= */}
      {/* PAINEL ESQUERDO (FORMULÁRIO)                  */}
      {/* ============================================= */}
      <aside className={estilos.painelEsquerdo}>
        <h1 className={estilos.tituloPainel} >Corretor de Redações</h1>
        <p className={estilos.subtituloPainel}>
          Insira o texto do aluno e os parâmetros de correção.
        </p>

        <form onSubmit={handleGerarCorrecao} className={estilos.formulario}>
          {/* Tipo de Correção */}
          <div className={estilos.campoGrupo}>
            <label htmlFor="tipo" className={estilos.campoLabel}>Tipo de Correção</label>
            <select
              id="tipo"
              name="tipo"
              className={estilos.campoSelect}
              value={formData.tipo}
              onChange={handleFormChange}
            >
              <option value="enem">ENEM (5 Competências)</option>
              <option value="fuvest">FUVEST (Argumentação)</option>
              <option value="unicamp">UNICAMP (Gênero Textual)</option>
              <option value="outro">Correção Genérica</option>
            </select>
          </div>

          {/* Título da Redação */}
          <div className={estilos.campoGrupo}>
            <label htmlFor="titulo" className={estilos.campoLabel}>Título da Redação</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className={estilos.campoInput}
              placeholder="Ex: O Desafio da Evasão Escolar"
              value={formData.titulo}
              onChange={handleFormChange}
            />
          </div>

          {/* Linha Dupla: Nome e Sala */}
          <div className={estilos.linhaCampos}>
            <div className={estilos.campoGrupo}>
              <label htmlFor="alunoNome" className={estilos.campoLabel}>Nome do Aluno</label>
              <input
                type="text"
                id="alunoNome"
                name="alunoNome"
                className={estilos.campoInput}
                placeholder="Ex: João da Silva"
                value={formData.alunoNome}
                onChange={handleFormChange}
              />
            </div>
            <div className={estilos.campoGrupo}>
              <label htmlFor="alunoSala" className={estilos.campoLabel}>Sala</label>
              <input
                type="text"
                id="alunoSala"
                name="alunoSala"
                className={estilos.campoInput}
                placeholder="Ex: 3º B"
                value={formData.alunoSala}
                onChange={handleFormChange}
              />
            </div>
          </div>

          {/* Redação */}
          <div className={estilos.campoGrupo}>
            <label htmlFor="redacao" className={estilos.campoLabel}>Cole a Redação Aqui</label>
            <textarea
              id="redacao"
              name="redacao"
              className={estilos.campoTextarea}
              rows={15}
              placeholder="Era uma vez, em um mundo..."
              value={formData.redacao}
              onChange={handleFormChange}
            />
          </div>

          {/* Comentários Adicionais */}
          <div className={estilos.campoGrupo}>
            <label htmlFor="comentarios" className={estilos.campoLabel}>Comentários Adicionais (Opcional)</label>
            <textarea
              id="comentarios"
              name="comentarios"
              className={estilos.campoTextarea}
              rows={4}
              placeholder="Ex: Focar na coesão textual."
              value={formData.comentarios}
              onChange={handleFormChange}
            />
          </div>

          {/* Botão Gerar */}
          <button type="submit" className={estilos.botaoGerar} disabled={isLoading}>
            {isLoading ? (
              <span className={estilos.spinner}></span>
            ) : (
              'Corrigir com OTTO'
            )}
          </button>
        </form>
      </aside>

      {/* ============================================= */}
      {/* PAINEL DIREITO (RESULTADO)                    */}
      {/* ============================================= */}
      <main className={estilos.painelDireito}>
        {isLoading && (
          <div className={estilos.estadoInicial}>
            <span className={estilos.spinnerGrande}></span>
            <h2 className={estilos.tituloEstado}>Analisando a redação...</h2>
            <p className={estilos.subtituloEstado}>Aguarde, o OTTO está trabalhando.</p>
          </div>
        )}

        {!isLoading && !correcaoGerada && (
          <div className={estilos.estadoInicial}>
            <span className={`material-symbols-outlined ${estilos.iconeEstado}`}>
              rule
            </span>
            <h2 className={estilos.tituloEstado}>A correção aparecerá aqui</h2>
            <p className={estilos.subtituloEstado}>
              Preencha os campos ao lado e clique em "Corrigir" para começar.
            </p>
          </div>
        )}

        {correcaoGerada && (
          <div className={estilos.planoGeradoContainer}>
            <div className={estilos.planoToolbar}>
              <button className={estilos.botaoToolbar}>
                <span className="material-symbols-outlined">content_copy</span>
                Copiar
              </button>
              <button
                className={`${estilos.botaoToolbar} ${isEditing ? estilos.botaoSalvar : ''}`}
                onClick={handleToggleEdit}
              >
                <span className="material-symbols-outlined">
                  {isEditing ? 'save' : 'edit'}
                </span>
                {isEditing ? 'Salvar Edições' : 'Editar'}
              </button>
            </div>

            <h2 className={estilos.tituloPlano}>Análise da Redação: "{formData.titulo}"</h2>

            {/* Seções de Identificação (Não editáveis) */}
            <section className={estilos.planoSecao}>
              <h3>Identificação</h3>
              <p><strong>Aluno(a):</strong> {formData.alunoNome}</p>
              <p><strong>Sala:</strong> {formData.alunoSala}</p>
              <p><strong>Tipo de Correção:</strong> {formData.tipo.toUpperCase()}</p>
            </section>

            {/* Seções Geradas (Editáveis) */}
            <section className={estilos.planoSecao}>
              <h3>Análise Geral (Modelo {formData.tipo.toUpperCase()})</h3>
              <p>
                <strong>Nota Sugerida: </strong>
                {isEditing ? (
                  <input 
                    name="nota" 
                    className={estilos.campoEdicaoInput} 
                    value={correcaoGerada.nota} 
                    onChange={(e) => handleCorrecaoChange(e as any)} // Ajuste de tipo
                  />
                ) : (
                  <span className={estilos.nota}>{correcaoGerada.nota}</span>
                )}
              </p>
              {isEditing ? (
                <textarea
                  name="analiseGeral"
                  className={estilos.campoEdicao}
                  value={correcaoGerada.analiseGeral}
                  onChange={handleCorrecaoChange}
                  onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)}
                />
              ) : (
                <pre>{correcaoGerada.analiseGeral}</pre>
              )}
            </section>

            <section className={estilos.planoSecao}>
              <h3>Análise por Competência</h3>
              <p><strong>C1 (Norma Culta):</strong></p>
              {isEditing ? (
                <textarea name="c1" className={estilos.campoEdicao} value={correcaoGerada.c1} onChange={handleCorrecaoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : ( <pre>{correcaoGerada.c1}</pre> )}
              
              <p><strong>C2 (Compreensão do Tema):</strong></p>
              {isEditing ? (
                <textarea name="c2" className={estilos.campoEdicao} value={correcaoGerada.c2} onChange={handleCorrecaoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : ( <pre>{correcaoGerada.c2}</pre> )}
              
              <p><strong>C3 (Argumentação):</strong></p>
              {isEditing ? (
                <textarea name="c3" className={estilos.campoEdicao} value={correcaoGerada.c3} onChange={handleCorrecaoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : ( <pre>{correcaoGerada.c3}</pre> )}
              
              <p><strong>C4 (Coesão):</strong></p>
              {isEditing ? (
                <textarea name="c4" className={estilos.campoEdicao} value={correcaoGerada.c4} onChange={handleCorrecaoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : ( <pre>{correcaoGerada.c4}</pre> )}
              
              <p><strong>C5 (Proposta de Intervenção):</strong></p>
              {isEditing ? (
                <textarea name="c5" className={estilos.campoEdicao} value={correcaoGerada.c5} onChange={handleCorrecaoChange} onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)} />
              ) : ( <pre>{correcaoGerada.c5}</pre> )}
            </section>
            
            <section className={estilos.planoSecao}>
              <h3>Sugestões de Melhoria</h3>
              {isEditing ? (
                <textarea
                  name="sugestoes"
                  className={estilos.campoEdicao}
                  value={correcaoGerada.sugestoes}
                  onChange={handleCorrecaoChange}
                  onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)}
                />
              ) : (
                <pre>{correcaoGerada.sugestoes}</pre>
              )}
            </section>

          </div>
        )}
      </main>
    </div>
  );
}