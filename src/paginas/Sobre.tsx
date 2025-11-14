import estilos from "./Sobre.module.css";

export function Sobre() {
  return (
    <div className={estilos.sobreWrapper}> {/* Container principal da página */}

      <section className={estilos.heroSection}> {/* Seção com fundo parallax */}
        <div className={estilos.heroContent}>
          <h1 className={estilos.titulo}>OTTO</h1>
          <p className={estilos.subtitulo}>
            Um Assistente para Professores, Uma Revolução para a Educação.
          </p>
        </div>
      </section>

      <section className={estilos.textSection}> {/* Conteúdo explicativo */}
        <div className={estilos.sectionContent}>
          <h2>O que é o projeto?</h2>
          <p>
            OTTO é um assistente virtual baseado em inteligência artificial, pensado para atender às demandas da educação brasileira. Diferente de ferramentas generalistas, OTTO é uma solução especializada, treinada para compreender o vocabulário, a rotina e os desafios enfrentados por professores da Educação Básica e da Educação Profissional e Tecnológica (EPT), bem como pelos profissionais da gestão escolar.
          </p>
          <p>
            O sistema integra duas frentes principais: um chatbot acessado via navegador, que auxilia na preparação de aulas, correções e organização pedagógica; e um assistente de voz físico, embarcado em um microcontrolador ESP32-S3, que permite interações por comando de voz diretamente em sala de aula. Juntos, esses módulos oferecem um suporte completo para otimizar o tempo dos docentes, automatizar tarefas repetitivas e melhorar a comunicação dentro da escola.
          </p>
          <p>
            Criado por estudantes da Etec de Hortolândia, OTTO é fruto de pesquisa, escuta ativa de professores e desenvolvimento técnico com base em tecnologias acessíveis e de código aberto. Mais do que um produto, OTTO é uma proposta de transformação educacional construída com propósito, inovação e compromisso social.
          </p>
        </div>
        <div className={estilos.sectionContent}>
          <h2>Nossa Missão</h2>
          <p>Nossa missão é empoderar professores e profissionais da educação com uma ferramenta inteligente, acessível e alinhada à realidade das escolas brasileiras. OTTO foi criado para transformar a rotina escolar por meio da automação de tarefas repetitivas, da organização eficiente do tempo e da valorização do trabalho pedagógico, permitindo que o foco volte ao que realmente importa: ensinar e aprender.</p>

<p>Comprometido com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU, o projeto OTTO atua diretamente sobre dois pilares essenciais:</p>

<p><strong>ODS 4 – Educação de Qualidade:</strong> ao auxiliar no planejamento de aulas, na geração de conteúdos alinhados à BNCC e na melhoria da comunicação escolar, OTTO contribui para um ensino mais estruturado, inclusivo e eficiente, elevando a qualidade da aprendizagem e o bem-estar docente.</p>

<p><strong>ODS 9 – Indústria, Inovação e Infraestrutura:</strong> ao propor uma solução tecnológica nacional, escalável e baseada em plataformas de código aberto, o projeto fomenta a inovação educacional com baixo custo, incentivando o uso estratégico da inteligência artificial para modernizar processos e criar uma infraestrutura digital acessível.</p>

<p>Mais do que uma ferramenta, OTTO é uma proposta de impacto. Nosso compromisso é com uma educação mais justa, inteligente e preparada para os desafios do presente e do futuro.</p>
        </div>

        <div className={estilos.sectionContent}>
          <h2>(Futuras) Funcionalidades</h2>
          <p>O projeto OTTO ainda encontra-se em desenvolvimento para atender da melhor forma possível as demandas dos professores e da gestão escolar.</p>

<p>Em breve,serão incorporadas à plataforma funcionalidades que permitam/integrem:</p>

<ul>
  <li>Correção automatizada de atividades com base em critérios pedagógicos pré-estabelecidos;</li>
  <li>Geração de conteúdos alinhados à BNCC e à EPT;</li>
  <li>Sugestões de perguntas e desafios no estilo de olimpíadas do conhecimento;</li>
  <li>Painel administrativo para coordenação, secretaria e direção escolar;</li>
  <li>Integração com plataformas de ensino virtuais.</li>
</ul>

<p>Cada uma dessas evoluções busca tornar o OTTO um parceiro ainda mais completo na jornada educacional, aliando tecnologia, praticidade e eficiência em favor da qualidade do ensino.</p>
        </div>

        <div className={estilos.sectionContent}>
          <h2>Desenvolvedores do projeto</h2>
          <p>
            O projeto OTTO está em processo de desenvolvimento para ser apresentado como
            TCC pelos alunos Cristiano Secco Júnior, Daniel Ayron Silva de Oliveira,
            Paulo Eduardo Ferreira Junior e Vicente Matheus Collin Pedroso.
          </p>
        </div>
      </section>
    </div>
  );
}
