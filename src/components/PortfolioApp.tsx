"client";

import { useReactive } from "@adaptivejs/web";
import { useEffect } from "@adaptivejs/web";

const stack = [
  "Rust",
  "Axum",
  "Node.js",
  "TypeScript",
  "React",
  "Next.js",
  "Kotlin",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "LLMs",
];

const capabilities = [
  {
    id: "CAP_01",
    title: "Backends de alta performance",
    description: "Rust, Axum, microsservicos e APIs orientadas a throughput, previsibilidade e latencia baixa.",
  },
  {
    id: "CAP_02",
    title: "Full-stack de produto",
    description: "Node.js, React, Next.js e interfaces reativas com foco em clareza tecnica e experiencia de uso.",
  },
  {
    id: "CAP_03",
    title: "IA aplicada",
    description: "RAG, embeddings, pipelines de assistentes e sistemas de busca vetorial integrados ao produto.",
  },
  {
    id: "CAP_04",
    title: "Arquitetura e lideranca",
    description: "Decisao tecnica, onboarding, automacao interna e evolucao de produtos sob contexto real de negocio.",
  },
];

const experience = [
  {
    id: "EXP_01",
    role: "Engenheiro de Software Senior",
    company: "Study Travel Work",
    place: "Portugal",
    period: "DEZ 2022 -> PRESENTE",
    highlights: [
      "Lideranca tecnica no desenvolvimento de microsservicos em Rust e Node.js.",
      "Arquitetura de APIs REST e GraphQL com ganho de performance reportado em 40%.",
      "Assistentes internos de IA, automacoes e suporte ao onboarding de engenheiros.",
    ],
  },
  {
    id: "EXP_02",
    role: "Engenheiro de Software Freelancer",
    company: "Brasil + Portugal",
    place: "Remoto",
    period: "2017 -> PRESENTE",
    highlights: [
      "Backends em Rust, APIs Node.js e dashboards em React.",
      "Pipelines RAG, chatbots de IA e integracoes escalaveis.",
      "Consultoria em arquitetura, performance e produtos full-stack.",
    ],
  },
  {
    id: "EXP_03",
    role: "Desenvolvedor Mobile / Engenheiro de Software",
    company: "Elite Educacao + Superinfor",
    place: "Brasil",
    period: "2015 -> 2016",
    highlights: [
      "Aplicativos Android em Java e Kotlin com foco offline-first.",
      "Manutencao de e-commerce, suporte tecnico e otimizacao de ativos digitais.",
    ],
  },
];

const featuredProjects = [
  {
    id: "OBJ_01",
    name: "AdaptiveJS / TSX5",
    label: "framework reativo",
    status: "[ ACTIVE ]",
    description:
      "Linha de pesquisa e produto para interface reativa com TSX, SSR, hooks proprios, IR por pagina e caminho multiplataforma.",
    stack: ["TypeScript", "TSX", "Compiler", "SSR", "Reactive UI"],
  },
  {
    id: "OBJ_02",
    name: "DeckFusion",
    label: "jogo estrategico 3D",
    status: "[ R&D ]",
    description:
      "Projeto de jogo com identidade propria em LibGDX e Kotlin, explorando sistemas visuais, regras taticas e runtime grafico.",
    stack: ["Kotlin", "LibGDX", "3D Gameplay"],
  },
  {
    id: "OBJ_03",
    name: "Gdx Effekseer",
    label: "camada open-source grafica",
    status: "[ OSS ]",
    description:
      "Integracao open-source voltada para efeitos visuais e pipeline grafico, com foco em performance e ergonomia para desenvolvimento.",
    stack: ["Kotlin", "C++", "Graphics", "Effects"],
  },
];

const certifications = [
  "Android Jetpack Bootcamp",
  "Beginning C++ Programming",
  "Complete Rust Programming Course",
  "Monitor em Programacao Orientada a Objetos para Android",
];

export default function PortfolioApp() {
  const [selectedProject, setSelectedProject] = useReactive(featuredProjects[0]);
  const titleMap: Record<"hero" | "stack" | "experience" | "projects" | "contact", string> = {
    hero: "Engenheiro de Software Full-Stack",
    stack: "Tecnologia como alavanca de produto, performance e clareza.",
    experience: "Uma trajetoria puxada por engenharia, produto e sistemas vivos.",
    projects: "Produtos, bibliotecas e exploracoes onde engenharia vira linguagem.",
    contact: "Se o desafio pede performance, produto e profundidade tecnica, vamos conversar.",
  };

  const [typedHeroTitle, setTypedHeroTitle] = useReactive("");
  const [typedStackTitle, setTypedStackTitle] = useReactive(titleMap.stack);
  const [typedExperienceTitle, setTypedExperienceTitle] = useReactive(titleMap.experience);
  const [typedProjectsTitle, setTypedProjectsTitle] = useReactive(titleMap.projects);
  const [typedContactTitle, setTypedContactTitle] = useReactive(titleMap.contact);
  const [stackTypingActive, setStackTypingActive] = useReactive(false);
  const [experienceTypingActive, setExperienceTypingActive] = useReactive(false);
  const [projectsTypingActive, setProjectsTypingActive] = useReactive(false);
  const [contactTypingActive, setContactTypingActive] = useReactive(false);

  useEffect(() => {
    setTypedHeroTitle("");
    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      setTypedHeroTitle(titleMap.hero.slice(0, frame));
      if (frame >= titleMap.hero.length) {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    const typeNodes = Array.from(document.querySelectorAll("[data-type-key]"));
    const activeTimers: number[] = [];
    const started = new Set<string>();

    const setters = {
      stack: setTypedStackTitle,
      experience: setTypedExperienceTitle,
      projects: setTypedProjectsTitle,
      contact: setTypedContactTitle,
    } as const;

    const cursorSetters = {
      stack: setStackTypingActive,
      experience: setExperienceTypingActive,
      projects: setProjectsTypingActive,
      contact: setContactTypingActive,
    } as const;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!(entry.target instanceof HTMLElement)) {
            continue;
          }

          const key = entry.target.dataset.typeKey as keyof typeof setters | undefined;

          if (!key || !entry.isIntersecting || started.has(key)) {
            continue;
          }

          const target = entry.target;
          const fullText = titleMap[key];
          const setValue = setters[key];
          const setCursorActive = cursorSetters[key];
          const step = Number(target.dataset.typeSpeed ?? "80");
          let frame = 0;

          started.add(key);
          setValue("");
          setCursorActive(true);

          const timer = window.setInterval(() => {
            frame += 1;
            setValue(fullText.slice(0, frame));

            if (frame >= fullText.length) {
              window.clearInterval(timer);
              setCursorActive(false);
            }
          }, step);

          activeTimers.push(timer);
          observer.unobserve(target);
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    typeNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) {
        return;
      }

      observer.observe(node);
    });

    return () => {
      observer.disconnect();
      activeTimers.forEach((timer) => window.clearInterval(timer));
    };
  });

  return (
    <main className="terminalPortfolio">
      <section className="terminalShell" id="home">
        <header className="terminalHeader">
          <div className="terminalBrand">
            <span className="terminalPrompt">$</span>
            <strong>Antonio Johnathan Galdino Boto</strong>
            <span className="terminalCursor" />
          </div>

          <nav className="terminalNav">
            <a href="#home">inicio</a>
            <a href="#stack">stack</a>
            <a href="#experience">experiencia</a>
            <a href="#projects">projetos</a>
            <a href="#contact">contato</a>
          </nav>
        </header>

        <div className="terminalTicker">
          <span className="tickerBadge">LIVE</span>
          <span className="tickerText">Rust · Node.js · React · IA aplicada · sistemas distribuidos · produto</span>
          <span className="tickerMeta">BR / REMOTO / PORTUGAL</span>
        </div>

        <div className="terminalHero">
          <div className="terminalHeroGrid">
            <div className="terminalHeroCopy">
              <div className="terminalCommand">
                <span className="cmdPrompt">root@adaptive:~$</span>
                <span className="cmdText">whoami</span>
              </div>

              <p className="terminalRole">
                Com foco em Rust, Node.js,
                React e arquiteturas orientadas por IA.
              </p>

              <h1 className="terminalTypingTitle">
                {() => typedHeroTitle()}
                <span className="terminalTypingCursor" aria-hidden="true" />
              </h1>

              <p className="terminalDescription">
                Atuo em microsservicos, automacoes internas, plataformas full-stack,
                Android/Kotlin e produtos com exigencia real de arquitetura,
                performance e clareza operacional.
              </p>

              <div className="terminalActions">
                <a className="terminalButton terminalButtonPrimary" href="mailto:johnathan.stark42@gmail.com">
                  [ SEND_EMAIL ]
                </a>
                <a className="terminalButton" href="https://github.com/SrJohnathan" target="_blank">
                  [ GITHUB ]
                </a>
                <a
                  className="terminalButton"
                  href="https://linkedin.com/in/johnathan-galdino-b2aa12174"
                  target="_blank"
                >
                  [ LINKEDIN ]
                </a>
              </div>
            </div>

            <aside className="terminalHeroVisual">
              <div className="terminalPortraitFrame">
                <img
                  className="terminalPortrait"
                  src="/avatar.jpeg"
                  alt="Foto de Antonio Johnathan Galdino Boto"
                />
              </div>

              <div className="terminalPortraitMeta">
                <span>PROFILE_IMG</span>
                <span>[ VERIFIED ]</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="terminalGridSection" id="stack">
        <article className="terminalPanel terminalPanelWide">
          <div className="terminalPanelBar">
            <span>MOD_01</span>
            <span>[ STACK ]</span>
          </div>

          <div className="terminalPanelBody">
            <h3 className="terminalScrollType" data-type-key="stack" data-type-speed="80">
              <span className="terminalScrollTypeInner">
                {() => typedStackTitle()}
                <span
                  className={"terminalTypingCursor terminalTypingCursorInline" + (stackTypingActive() ? "" : " terminalTypingCursorHidden")}
                  aria-hidden="true"
                />
              </span>
            </h3>
            <div className="terminalTagRow">
              {stack.map((item) => (
                <span className="terminalTag">{item}</span>
              ))}
            </div>
          </div>
        </article>

        <article className="terminalPanel terminalPanelSide">
          <div className="terminalPanelBar">
            <span>SYS_INFO</span>
            <span>[ ONLINE ]</span>
          </div>

          <div className="terminalPanelBody terminalStats">
            <div>
              <span className="statLabel">BASE</span>
              <strong>Sobral, Ceara, Brasil</strong>
            </div>
            <div>
              <span className="statLabel">MODO</span>
              <strong>Backend / Full-stack / IA</strong>
            </div>
            <div>
              <span className="statLabel">FOCO</span>
              <strong>Rust, Node.js, React, Kotlin</strong>
            </div>
          </div>
        </article>
      </section>

      <section className="terminalCapabilities">
        {capabilities.map((item) => (
          <article className="terminalPanel capabilityTerminalCard">
            <div className="terminalPanelBar">
              <span>{item.id}</span>
              <span>[ READY ]</span>
            </div>

            <div className="terminalPanelBody">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="terminalSectionBlock" id="experience">
        <div className="terminalSectionHeading">
          <span className="terminalSectionTag">[ EXPERIENCE ]</span>
          <h2 className="terminalScrollType" data-type-key="experience" data-type-speed="80">
            <span className="terminalScrollTypeInner">
              {() => typedExperienceTitle()}
              <span
                className={"terminalTypingCursor terminalTypingCursorInline" + (experienceTypingActive() ? "" : " terminalTypingCursorHidden")}
                aria-hidden="true"
              />
            </span>
          </h2>
        </div>

        <div className="terminalTimeline">
          {experience.map((item) => (
            <article className="terminalPanel terminalTimelineCard">
              <div className="terminalPanelBar">
                <span>{item.id}</span>
                <span>{item.period}</span>
              </div>

              <div className="terminalPanelBody">
                <div className="timelineTerminalHeader">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company} // {item.place}</p>
                  </div>
                </div>

                <ul className="terminalList">
                  {item.highlights.map((highlight) => (
                    <li>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="terminalSectionBlock" id="projects">
        <div className="terminalSectionHeading">
          <span className="terminalSectionTag">[ PROJECTS ]</span>
          <h2 className="terminalScrollType" data-type-key="projects" data-type-speed="80">
            <span className="terminalScrollTypeInner">
              {() => typedProjectsTitle()}
              <span
                className={"terminalTypingCursor terminalTypingCursorInline" + (projectsTypingActive() ? "" : " terminalTypingCursorHidden")}
                aria-hidden="true"
              />
            </span>
          </h2>
        </div>

        <div className="terminalProjectLayout">
          <div className="terminalProjectRail">
            {featuredProjects.map((project) => (
              <button
                type="button"
                className={
                  "terminalProjectButton" +
                  (selectedProject().name === project.name ? " terminalProjectButtonActive" : "")
                }
                onClick={() => setSelectedProject(project)}
              >
                <div className="terminalProjectButtonTop">
                  <span>{project.id}</span>
                  <span>{project.status}</span>
                </div>
                <strong>{project.name}</strong>
                <small>{project.label}</small>
              </button>
            ))}
          </div>

          <article className="terminalPanel terminalProjectPreview">
            <div className="terminalPanelBar">
              <span>{() => selectedProject().id}</span>
              <span>{() => selectedProject().status}</span>
            </div>

            <div className="terminalPanelBody">
              <span className="terminalSectionTag">[ ACTIVE_OBJECT ]</span>
              <h3>{() => selectedProject().name}</h3>
              <p>{() => selectedProject().description}</p>
              <div className="terminalTagRow">
                {() => selectedProject().stack.map((item) => (
                  <span className="terminalTag terminalTagDim">{item}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="terminalGridSection terminalFooterGrid">
        <article className="terminalPanel">
          <div className="terminalPanelBar">
            <span>OBJ_04</span>
            <span>[ TARGET ]</span>
          </div>

          <div className="terminalPanelBody">
            <h3>Objetivo</h3>
            <p>
              Atuar em equipes avancadas desenvolvendo backends de alta
              performance, sistemas distribuidos escalaveis, plataformas
              frontend modernas ou produtos baseados em IA e LLMs.
            </p>
          </div>
        </article>

        <article className="terminalPanel">
          <div className="terminalPanelBar">
            <span>OBJ_05</span>
            <span>[ CERTS ]</span>
          </div>

          <div className="terminalPanelBody">
            <h3>Formacao e certificacoes</h3>
            <p>Cubos Academy (2022) // Centec (2015)</p>
            <ul className="terminalList terminalCompactList">
              {certifications.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="terminalPanel terminalContactPanel" id="contact">
        <div className="terminalPanelBar">
          <span>CHANNELS</span>
          <span>[ OPEN ]</span>
        </div>

        <div className="terminalPanelBody">
          <span className="terminalSectionTag">[ CONTACT ]</span>
          <h3 className="terminalScrollType" data-type-key="contact" data-type-speed="80">
            <span className="terminalScrollTypeInner">
              {() => typedContactTitle()}
              <span
                className={"terminalTypingCursor terminalTypingCursorInline" + (contactTypingActive() ? "" : " terminalTypingCursorHidden")}
                aria-hidden="true"
              />
            </span>
          </h3>
          <p>
            Aberto a oportunidades envolvendo Rust, IA aplicada, sistemas
            distribuidos, apps full-stack e produtos com alta exigencia de
            arquitetura.
          </p>

          <div className="terminalActions">
            <a className="terminalButton terminalButtonPrimary" href="mailto:johnathan.stark42@gmail.com">
              [ johnathan.stark42@gmail.com ]
            </a>
            <a className="terminalButton" href="https://github.com/SrJohnathan" target="_blank">
              [ github.com/SrJohnathan ]
            </a>
            <a
              className="terminalButton"
              href="https://linkedin.com/in/johnathan-galdino-b2aa12174"
              target="_blank"
            >
              [ linkedin.com/in/johnathan-galdino-b2aa12174 ]
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
