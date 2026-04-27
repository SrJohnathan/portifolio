"client";

import { createContext, useContext, useEffect, useReactive } from "@adaptivejs/web";

const ThemeContext = createContext({
  name: "Adaptive hooks",
  color: "#0e7467",
  accent: "#d7efe8",
});

function ThemeBadge() {
  const theme = useContext(ThemeContext);

  return (
    <span
      className="hookBadge"
      style={() => ({
        backgroundColor: theme.current.accent,
        color: theme.current.color,
      })}
    >
      {() => `Context: ${theme.current.name}`}
    </span>
  );
}

function CounterPanel(props: { title: string; description: string }) {
  const [count, setCount] = useReactive(0);

  return (
    <article className="hookCard">
      <p className="hookCardEyebrow">Reactive state</p>
      <h3>{props.title}</h3>
      <p className="hookCardText">{props.description}</p>

      <div className="hookMetricRow">
        <strong className="hookMetricValue">{() => count()}</strong>
        <span className="hookMetricLabel">updates</span>
      </div>

      <button
        type="button"
        className="hookButton"
        onClick={() => setCount((current) => current + 1)}
      >
        Incrementar contador
      </button>
    </article>
  );
}

export default function JsxHooksApp() {
  const [name, setName] = useReactive("Adaptive");
  const [effectLog, setEffectLog] = useReactive("Aguardando interacao");
  const [lastSync, setLastSync] = useReactive("idle");

  useEffect(() => {
    setEffectLog(`useEffect sincronizou com "${name()}"`);
    setLastSync(new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }));
  }, [name]);

  return (
    <ThemeContext.Provider
      value={{
        name: "JSX components",
        color: "#0e7467",
        accent: "#d7efe8",
      }}
    >
      <section className="hookShowcase">
        <div className="hookShowcaseTop">
          <div>
            <p className="sectionTag">JSX Hooks Demo</p>
            <h1 className="hookTitle">Hooks funcionando em componentes JSX normais.</h1>
            <p className="hookIntro">
              Esta tela prova que `useReactive`, `useContext` e `useEffect`
              continuam elegantes mesmo quando a autoria vai pelo caminho JSX mais
              tradicional.
            </p>
          </div>

          <div className="hookMetaPanel">
            <ThemeBadge />
            <div className="hookStatus">
              <span className="hookStatusLabel">Status do effect</span>
              <strong>{() => effectLog()}</strong>
              <small>{() => `Ultima sincronizacao: ${lastSync()}`}</small>
            </div>
          </div>
        </div>

        <div className="hookComposer">
          <label className="hookFieldLabel" htmlFor="jsx-name">
            Nome compartilhado reativo
          </label>
          <input
            id="jsx-name"
            className="hookInput"
            value={() => name()}
            onInput={(event) => setName((event.target as HTMLInputElement).value)}
            placeholder="Digite algo para disparar o effect"
          />
          <p className="hookMirror">
            {() => `Valor atual propagado para o effect: ${name()}`}
          </p>
        </div>

        <div className="hookGrid">
          <CounterPanel
            title="Counter A"
            description="Cada clique atualiza um estado isolado via useReactive e rerenderiza so o necessario."
          />
          <CounterPanel
            title="Counter B"
            description="O mesmo componente reaproveitado, com estado proprio, reforcando a composicao do runtime."
          />
        </div>
      </section>
    </ThemeContext.Provider>
  );
}
