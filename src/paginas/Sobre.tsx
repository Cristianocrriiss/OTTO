import estilos from "./Sobre.module.css";

export function Sobre() {
  return (
    <div className={estilos.container}>

      {/* Hero Section */}
      <header className={estilos.hero}>
        <div className={estilos.heroContent}>
          <h1 className={estilos.titulo}>Conheça o OTTO</h1>
          <p className={estilos.subtitulo}>
            Um Assistente para os Professores, uma Revolução para a Educação
          </p>
        </div>
      </header>

      <div className={estilos.contentWrapper}>


        {/* === SOBRE O PROJETO === */}
        <div className={estilos.sectionContent}>
          <h2>O que é o projeto?</h2>
          <p>
            OTTO é um <strong>assistente baseado em inteligência artificial </strong>, pensado para atender às demandas da educação brasileira. Diferente de ferramentas generalistas, OTTO é uma solução especializada, treinada para compreender o vocabulário, a rotina e os desafios enfrentados por professores da Educação Básica e da Educação Profissional e Tecnológica (EPT), bem como pelos profissionais da gestão escolar.
          </p>
          <p>
            O sistema integra duas frentes principais: um <strong>chatbot</strong> acessado via navegador, que auxilia na preparação de aulas, correções e organização pedagógica; e um <strong>assistente de voz físico</strong>, embarcado em um <strong>microcontrolador ESP32-S3-Korvo-1</strong>, que permite interações por comando de voz diretamente em sala de aula. Juntos, esses módulos oferecem um suporte completo para otimizar o tempo dos docentes, automatizar tarefas repetitivas e melhorar a comunicação dentro da escola.
          </p>
          <p>
            Criado por estudantes da Etec de Hortolândia, OTTO é fruto de pesquisa, escuta ativa de professores e desenvolvimento técnico com base em tecnologias acessíveis e de código aberto. Mais do que um produto, OTTO é uma proposta de transformação educacional construída com propósito, inovação e compromisso social.
          </p>
        </div>

        {/* === MISSÃO === */}
        <div className={estilos.sectionContent}>
          <h2>Nossa Missão</h2>
          <p>Nossa missão é empoderar professores e profissionais da educação com uma ferramenta inteligente, acessível e alinhada à realidade das escolas brasileiras. OTTO foi criado para transformar a rotina escolar por meio da automação de tarefas repetitivas, da organização eficiente do tempo e da valorização do trabalho pedagógico, permitindo que o foco volte ao que realmente importa: ensinar e aprender.</p>
          <p>Comprometido com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU, o projeto OTTO atua diretamente sobre dois pilares essenciais:</p>
          <p><strong>ODS 4 – Educação de Qualidade:</strong> ao auxiliar no planejamento de aulas, na geração de conteúdos alinhados à BNCC e na melhoria da comunicação escolar, OTTO contribui para um ensino mais estruturado, inclusivo e eficiente, elevando a qualidade da aprendizagem e o bem-estar docente.</p>
          <p><strong>ODS 9 – Indústria, Inovação e Infraestrutura:</strong> ao propor uma solução tecnológica nacional, escalável e baseada em plataformas de código aberto, o projeto fomenta a inovação educacional com baixo custo, incentivando o uso estratégico da inteligência artificial para modernizar processos e criar uma infraestrutura digital acessível.</p>
          <p>Mais do que uma ferramenta, OTTO é uma proposta de impacto. Nosso compromisso é com uma educação mais justa, inteligente e preparada para os desafios do presente e do futuro.</p>
        </div>




        {/* === FUNCIONALIDADES === */}
        <div className={estilos.sectionContent}>
          <h2>Nossas Funcionalidades</h2>
          <p>
            O desenvolvimento do OTTO foi guiado por uma premissa fundamental: <strong>escuta ativa</strong>. Antes de escrevermos a primeira linha de código, conversamos com professores da rede pública e privada para mapear as reais dores da rotina escolar. Foi essa análise que moldou nossas funções atuais:
          </p>
          <ul className={estilos.listaTopicos}>
            <li><strong>Chatbot Pedagógico:</strong> Um assistente pronto para responder dúvidas imediatas, sugerir dinâmicas e auxiliar na gestão de tempo.</li>
            <li><strong>Corretor de Redações:</strong> Uma ferramenta que não apenas atribui nota, mas analisa o texto com base nas competências oficiais (ENEM, Fuvest), reduzindo drasticamente o tempo de correção.</li>
            <li><strong>Gerador de Planos de Aula:</strong> Automação da burocracia pedagógica, criando roteiros estruturados e alinhados à BNCC em segundos.</li>
            <li><strong>Adaptador de Conteúdo:</strong> Ferramenta de inclusão que simplifica textos complexos para diferentes níveis de leitura e necessidades cognitivas.</li>
          </ul>
          <p>
            E isso é apenas o começo. O OTTO é um organismo vivo, e futuras atualizações preveem integração com diários de classe digitais e geração de slides automatizada.
          </p>
        </div>

        {/* === MANUAL DO USUÁRIO === */}
        <div className={estilos.sectionContent}>
          <h2>Manual do Usuário: Como o OTTO te ajuda?</h2>
          <p>
            O OTTO foi desenhado para ser intuitivo. Não é necessário ser um especialista em tecnologia para extrair o máximo da ferramenta. Veja como ele se encaixa na sua rotina:
          </p>
          <div className={estilos.manualGrid}>
            <div>
              <strong>1. No Planejamento (Pré-Aula):</strong>
              <p>Acesse o "Gerador de Planos de Aula". Informe o tema, a turma e a duração. Em instantes, você terá objetivos, metodologia e critérios de avaliação prontos para copiar ou imprimir.</p>
            </div>
            <div>
              <strong>2. Na Avaliação (Pós-Aula):</strong>
              <p>Use o "Corretor de Redações". Cole o texto do aluno e receba um feedback detalhado por competência. Use isso para dar retornos mais rápidos e personalizados aos estudantes.</p>
            </div>
            <div>
              <strong>3. Na Inclusão (Dia a Dia):</strong>
              <p>Tem um texto difícil? Use o "Adaptador" para criar versões simplificadas ou glossários automáticos, garantindo que todos os alunos acompanhem o conteúdo.</p>
            </div>
          </div>
        </div>

        {/* === AGRADECIMENTOS === */}
        <div className={estilos.sectionContent}>
          <h2>Agradecimentos Especiais</h2>
          <p>
            Nenhum projeto dessa magnitude se constrói sozinho. Gostaríamos de expressar nossa profunda gratidão à todas pessoas que contribuiram de alguma forma para a realização do OTTO:
          </p>
          <p>
            À professora <strong>Priscila Batista Martins</strong>, pelos ensinamento sobre o Relatório de Pesquisa, pela ajuda nas aulas de PDTCC, pelo incentivo à feiras e pela orientação durante todo o desenvolvimento do projeto.
          </p>
          <p>
            Ao professor <strong>Rafael de Colle</strong>, pelo apoio total ao projeto, pelos incentivos à feiras e desafios tecnológicos, pela ajuda no sistema de microcontroladores e por acreditar no potencial do projeto.
          </p>
          <p>
            Ao professor <strong>Ralf Della Croce Filho</strong>, pelo incentivo e pelo ensinamento sobre React.js, que foi fundamental para o desenvolvimento do front-end do OTTO.
          </p>
          <p>
            Ao professor <strong>Flávio Cunha</strong>, pelos ensinamentos sobre o uso de inteligência artificial em suas aulas e por compartilhar sua experiência como docente conosco. 
          </p>
          <p>
            À <strong>Lucia Rodrigues</strong>, pela definição do nosso projeto como agente de IA e por apresentar uma perspectiva de negócios ao projeto.
          </p>

           <p>
            Aos diretores <strong>José Izidro Luiz Marques</strong> e <strong>Márcio Bredariol</strong> da Etec Hortolândia e Etec Monte Mor, por validarem e por apresentarem uma visão superintendente ao projeto.
          </p>
          <p>
            O OTTO é, também, fruto do apoio de vocês.
          </p>
        </div>

      </div>

      {/* === DESENVOLVEDORES === */}
      <section className={estilos.devSection}>
        <h2 className={estilos.devTitulo}>Quem faz acontecer</h2>
        <p className={estilos.devSubtitulo}>A equipe por trás do código</p>

        <div className={estilos.devGrid}>

          {/* Card 1 - Cristiano */}
          <div className={estilos.devCard}>
            <div className={estilos.devAvatar}>CS</div> {/* Substituir por <img src... /> se tiver foto */}
            <h3>Cristiano Secco Júnior</h3>
            <span className={estilos.devRole}>Desenvolvedor Fullstack</span>
            <p className={estilos.devDesc}>
              Atuou de forma versátil no projeto, contribuindo na documentação, no front-end e no back-end.
            </p>
            <a href="https://www.linkedin.com/in/cristianoseccojr" target="_blank" rel="noopener noreferrer" className={estilos.linkedinBtn}>
              Conectar no LinkedIn
            </a>
          </div>

          {/* Card 2 - Daniel */}
          <div className={estilos.devCard}>
            <div className={estilos.devAvatar}>DA</div>
            <h3>Daniel Ayron Silva</h3>
            <span className={estilos.devRole}>Frontend e Engenheiro de IA</span>
            <p className={estilos.devDesc}>
              Desenvolvedor de uma parte significativa da interface web e engenharia de prompt para programação mais fluida.
            </p>
            <a href="https://www.linkedin.com/in/daniel-ayron" target="_blank" rel="noopener noreferrer" className={estilos.linkedinBtn}>
              Conectar no LinkedIn
            </a>
          </div>

          {/* Card 3 - Paulo */}
          <div className={estilos.devCard}>
            <div className={estilos.devAvatar}>PE</div>
            <h3>Paulo Eduardo Ferreira Junior</h3>
            <span className={estilos.devRole}>Engenheiro de Embarcados & Documentador Técnico</span>
            <p className={estilos.devDesc}>
              Desenvolvedor da estrutura lógica e programável do assistente de voz e redator da documentação oficial do projeto.
            </p>
            <a href="https://www.linkedin.com/in/paulo-eduardo-ferreira-junior" target="_blank" rel="noopener noreferrer" className={estilos.linkedinBtn}>
              Conectar no LinkedIn
            </a>
          </div>

          {/* Card 4 - Vicente */}
          <div className={estilos.devCard}>
            <div className={estilos.devAvatar}>VM</div>
            <h3>Vicente Matheus Collin Pedroso</h3>
            <span className={estilos.devRole}>Backend & Agente de IA</span>
            <p className={estilos.devDesc}>
              Desenvolvedor do backend e da estrutura RAG do agente de IA responsavel pelo processamento de respostas.
            </p>
            <a href="https://www.https://www.linkedin.com/in/vimathss.com/" target="_blank" rel="noopener noreferrer" className={estilos.linkedinBtn}>
              Conectar no LinkedIn
            </a>
          </div>

        </div>
      </section>

      {/* Rodapé */}
      <footer className={estilos.rodape}>
        <p>© 2025 Projeto OTTO - Etec de Hortolândia</p>
      </footer>
    </div>
  )
}
;