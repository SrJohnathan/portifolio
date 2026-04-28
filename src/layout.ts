import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRouter } from "@adaptivejs/web/server";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";

export async function generateMetadata(context: { pathname: string }) {
  const origin = "https://portifolio-johnathan.netlify.app";
  const canonical = `${origin}${context.pathname === "/" ? "" : context.pathname}`;

  return {
    title: "Antonio Johnathan Galdino Boto | Engenheiro de Software Full-Stack",
    description:
      "Portfolio de Antonio Johnathan Galdino Boto com foco em Rust, Node.js, React, IA aplicada, sistemas distribuidos e arquitetura de produto.",
    canonical,
    url: canonical,
    image: `${origin}/avatar.jpeg`,
    siteName: "Portifolio Johnathan",
    locale: "pt_BR",
    type: "website",
    themeColor: "#efe4cf",
    keywords: [
      "Rust",
      "Node.js",
      "React",
      "TypeScript",
      "IA",
      "LLMs",
      "Portfolio",
      "Backend",
      "Full-stack"
    ],
    openGraph: {
      title: "Antonio Johnathan Galdino Boto | Engenheiro de Software Full-Stack",
      description:
        "Backend, full-stack e IA aplicada com foco em performance, arquitetura e sistemas distribuidos.",
      image: `${origin}/avatar.jpeg`,
      url: canonical,
      siteName: "Portifolio Johnathan",
      locale: "pt_BR",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Antonio Johnathan Galdino Boto | Engenheiro de Software Full-Stack",
      description:
        "Portfolio com projetos, experiencia e foco em Rust, Node.js, React e IA aplicada.",
      image: `${origin}/avatar.jpeg`
    }
  };
}

export default async function render(url: string) {
  return createRouter(url, [], {
    isProduction,
    sourceDir: isProduction ? path.resolve(__dirname, "..", "..", "src") : __dirname,
    serverBuildDir: isProduction ? __dirname : path.resolve(__dirname, "..", "dist", "server"),
    clientBuildDir: isProduction ? path.resolve(__dirname, "..", "client") : path.resolve(__dirname, "..", "dist", "client")
  });
}
