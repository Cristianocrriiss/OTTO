import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import estilos from './PlanoDeAula.module.css';
import { useAutenticacao } from '../../contextos/AutenticacaoContexto';
// Removido: import axios from 'axios';

// Define a estrutura do que a IA vai gerar
type PlanoGerado = {
  objetivos: string;
  metodologia: string;
  recursos: string;
  instrumentosAvaliacao: string;
  criteriosAvaliacao: string;
};

// Define a estrutura dos dados do formulário
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

  // Estados para o formulário
  const [formData, setFormData] = useState<FormData>({
    disciplina: '',
    turma: '',
    cargaHoraria: '',
    data: new Date().toISOString().split('T')[0], // Pega a data de hoje
    periodo: '',
    numAula: '',
    tema: '',
    subtemasBNCC: '',
  });

  // Estados para o resultado
  const [planoGerado, setPlanoGerado] = useState<PlanoGerado | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Removido: const [error, setError] = useState<string | null>(null);

  // Estado para controlar o "Modo de Edição"
  const [isEditing, setIsEditing] = useState(false);

  // Removido: const API_URL = ...

  // Atualiza o estado do formulário
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- MODIFICADO ---
  // A função volta a ser uma simulação simples
  const handleGerarPlano = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPlanoGerado(null);
    setIsEditing(false); 
    // Removido: setError(null);
    // Removido: Lógica de 'payload' e 'try/catch'

    // --- Simulação Restaurada ---
    setTimeout(() => {
      setPlanoGerado({
        objetivos: `1. Compreender o conceito sociológico de "Indústria Cultural".
2. Diferenciar "Cultura Popular", "Cultura Erudita" e "Cultura de Massa".
3. Analisar criticamente o papel da mídia e do consumo de bens culturais no cotidiano, com base nas habilidades ${formData.subtemasBNCC}.`,
        metodologia: `1. (15 min) Sensibilização: Tempestade de ideias (Brainstorming) sobre o consumo de mídia dos alunos.
2. (35 min) Exposição Dialogada: Apresentação dos conceitos de Adorno e Horkheimer (Escola de Frankfurt).
3. (30 min) Atividade Prática: Análise em grupos de letras de música ou videoclipes populares.
4. (20 min) Fechamento e Sistematização: Apresentação das conclusões dos grupos e debate final.`,
        recursos: `Quadro branco e pincéis.
Projetor Multimídia (Datashow).
Cópias de letras de música para análise em grupo.
Livro didático de Sociologia.`,
        instrumentosAvaliacao: `1. Atividade em grupo (Análise de música).
2. Participação no debate.`,
        criteriosAvaliacao: `A avaliação será formativa, observando:
1. A correta aplicação dos conceitos de "Indústria Cultural" e "Padronização" na análise da atividade.
2. A capacidade de argumentação e senso crítico durante o debate.
3. O engajamento e colaboração durante o trabalho em grupo.`,
      });
      setIsLoading(false); // O 'loading' termina dentro do timeout
    }, 1500);
    // --- Fim da Simulação ---
  };
  
  // Função para ligar/desligar o modo de edição
  const handleToggleEdit = () => {
    setIsEditing(prev => !prev);
  };
  
  // Função para atualizar o estado 'planoGerado' quando o usuário digita
  const handlePlanoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlanoGerado(prevPlano => {
      if (!prevPlano) return null;
      return {
        ...prevPlano,
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
        <h1 className={estilos.tituloPainel}>Gerador de Plano de Aula</h1>
        <p className={estilos.subtituloPainel}>
          Preencha os dados principais e deixe o OTTO gerar a metodologia e a avaliação.
        </p>

        <form onSubmit={handleGerarPlano} className={estilos.formulario}>
          {/* Nome do Professor (Automático) */}
          <div className={estilos.campoGrupo}>
            <label className={estilos.campoLabel}>Professor(a)</label>
            <input
              type="text"
              className={`${estilos.campoInput} ${estilos.campoInputReadonly}`}
              value={usuarioLogado?.email || 'Carregando...'}
              readOnly
            />
          </div>

          {/* Linha Dupla: Disciplina e Turma */}
          <div className={estilos.linhaCampos}>
            <div className={estilos.campoGrupo}>
              <label htmlFor="disciplina" className={estilos.campoLabel}>Disciplina</label>
              <input
                type="text"
                id="disciplina"
                name="disciplina"
                className={estilos.campoInput}
                value={formData.disciplina}
                onChange={handleFormChange}
              />
            </div>
            <div className={estilos.campoGrupo}>
              <label htmlFor="turma" className={estilos.campoLabel}>Turma</label>
              <input
                type="text"
                id="turma"
                name="turma"
                className={estilos.campoInput}
                value={formData.turma}
                onChange={handleFormChange}
              />
            </div>
          </div>
          
          {/* Linha Dupla: Carga Horária e Nº Aula */}
          <div className={estilos.linhaCampos}>
            <div className={estilos.campoGrupo}>
              <label htmlFor="cargaHoraria" className={estilos.campoLabel}>Carga Horária</label>
              <input
                type="text"
                id="cargaHoraria"
                name="cargaHoraria"
                className={estilos.campoInput}
                value={formData.cargaHoraria}
                onChange={handleFormChange}
              />
            </div>
             <div className={estilos.campoGrupo}>
              <label htmlFor="numAula" className={estilos.campoLabel}>Nº da Aula</label>
              <input
                type="number"
                id="numAula"
                name="numAula"
                className={estilos.campoInput}
                value={formData.numAula}
                onChange={handleFormChange}
              />
            </div>
          </div>
          
          {/* Linha Dupla: Data e Período */}
          <div className={estilos.linhaCampos}>
            <div className={estilos.campoGrupo}>
              <label htmlFor="data" className={estilos.campoLabel}>Data</label>
              <input
                type="date"
                id="data"
                name="data"
                className={estilos.campoInput}
                value={formData.data}
                onChange={handleFormChange}
              />
            </div>
            <div className={estilos.campoGrupo}>
              <label htmlFor="periodo" className={estilos.campoLabel}>Período</label>
              <select
                id="periodo"
                name="periodo"
                className={estilos.campoSelect}
                value={formData.periodo}
                onChange={handleFormChange}
              >
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Noite</option>
              </select>
            </div>
          </div>

          {/* Tema Principal */}
          <div className={estilos.campoGrupo}>
            <label htmlFor="tema" className={estilos.campoLabel}>Tema e Conteúdo Principal da Aula</label>
            <textarea
              id="tema"
              name="tema"
              className={estilos.campoTextarea}
              rows={3}
              value={formData.tema}
              onChange={handleFormChange}
            />
          </div>

          {/* Habilidades BNCC */}
          <div className={estilos.campoGrupo}>
            <label htmlFor="subtemasBNCC" className={estilos.campoLabel}>Habilidades da BNCC (Subtemas)</label>
            <input
              type="text"
              id="subtemasBNCC"
              name="subtemasBNCC"
              className={estilos.campoInput}
              placeholder="Ex: EM13CHS101, EM13CHS102"
              value={formData.subtemasBNCC}
              onChange={handleFormChange}
            />
          </div>

          {/* Removido: Bloco de erro */}

          {/* Botão Gerar */}
          <button type="submit" className={estilos.botaoGerar} disabled={isLoading}>
            {isLoading ? (
              <span className={estilos.spinner}></span>
            ) : (
              'Gerar Plano com OTTO'
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
            <h2 className={estilos.tituloEstado}>Gerando seu plano...</h2>
            <p className={estilos.subtituloEstado}>Aguarde, o OTTO está trabalhando.</p>
          </div>
        )}

        {!isLoading && !planoGerado && (
          <div className={estilos.estadoInicial}>
            <span className={`material-symbols-outlined ${estilos.iconeEstado}`}>
              edit_document
            </span>
            <h2 className={estilos.tituloEstado}>Seu plano de aula aparecerá aqui</h2>
            <p className={estilos.subtituloEstado}>
              Preencha os campos ao lado e clique em "Gerar" para começar.
            </p>
          </div>
        )}

        {/* O container do plano gerado com a lógica de edição */}
        {planoGerado && (
          <div className={estilos.planoGeradoContainer}>
            <div className={estilos.planoToolbar}>
              <button className={estilos.botaoToolbar}>
                <span className="material-symbols-outlined">content_copy</span>
                Copiar
              </button>
              {/* Botão de Editar/Salvar */}
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

            <h2 className={estilos.tituloPlano}>Plano de Aula Gerado</h2>

            {/* Seções de Identificação (Não editáveis) */}
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

            {/* Seções Geradas (Editáveis) */}
            <section className={estilos.planoSecao}>
              <h3>3. Objetivos de Aprendizagem</h3>
              {isEditing ? (
                <textarea
                  name="objetivos"
                  className={estilos.campoEdicao}
                  value={planoGerado.objetivos}
                  onChange={handlePlanoChange}
                  onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)}
                />
              ) : (
                <pre>{planoGerado.objetivos}</pre>
              )}
            </section>

            <section className={estilos.planoSecao}>
              <h3>4. Metodologia</h3>
              {isEditing ? (
                <textarea
                  name="metodologia"
                  className={estilos.campoEdicao}
                  value={planoGerado.metodologia}
                  onChange={handlePlanoChange}
                  onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)}
                />
              ) : (
                <pre>{planoGerado.metodologia}</pre>
              )}
            </section>

            <section className={estilos.planoSecao}>
              <h3>5. Recursos Didáticos</h3>
              {isEditing ? (
                <textarea
                  name="recursos"
                  className={estilos.campoEdicao}
                  value={planoGerado.recursos}
                  onChange={handlePlanoChange}
                  onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)}
                />
              ) : (
                <pre>{planoGerado.recursos}</pre>
              )}
            </section>

            <section className={estilos.planoSecao}>
              <h3>6. Instrumentos de Avaliação</h3>
              {isEditing ? (
                <textarea
                  name="instrumentosAvaliacao"
                  className={estilos.campoEdicao}
                  value={planoGerado.instrumentosAvaliacao}
                  onChange={handlePlanoChange}
                  onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)}
                />
              ) : (
                <pre>{planoGerado.instrumentosAvaliacao}</pre>
              )}
            </section>

            <section className={estilos.planoSecao}>
              <h3>7. Critérios de Avaliação</h3>
              {isEditing ? (
                <textarea
                  name="criteriosAvaliacao"
                  className={estilos.campoEdicao}
                  value={planoGerado.criteriosAvaliacao}
                  onChange={handlePlanoChange}
                  onInput={(e) => autoAdjustTextareaHeight(e.currentTarget)}
                />
              ) : (
                <pre>{planoGerado.criteriosAvaliacao}</pre>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}