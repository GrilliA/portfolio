export type Project = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  stack: readonly string[];
  /** Colori della tavola illustrata della card. */
  plate: { ground: string; colors: readonly [string, string, string] };
  /** Nome della route del caso studio; assente se non è ancora pronto. */
  route?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "traccia",
    number: "01",
    title: "traccia",
    summary:
      "Pannello coach sul web e app atleta per iOS e Android. Una sessione d'allenamento che non si perde, nemmeno senza rete.",
    stack: ["React", "Expo", "Express", "Postgres"],
    plate: { ground: "#f4d9c8", colors: ["#b8371a", "#1f3b5c", "#e0a526"] },
    route: "traccia",
  },
  {
    slug: "voyage",
    number: "02",
    title: "Voyage",
    summary:
      "Confronta proposte di viaggio: costi per categoria, il totale e quanto paga davvero ognuno.",
    stack: ["Vue 3", "TypeScript", "Drizzle", "Postgres"],
    plate: { ground: "#d6e2d5", colors: ["#2f5d46", "#6b2d4f", "#b8371a"] },
  },
];

export type Note = {
  tag: string;
  title: string;
};

export const NOTES: readonly Note[] = [
  { tag: "voyage", title: "Perché i soldi si contano in centesimi" },
  { tag: "traccia", title: "Inviare due volte senza salvare due volte" },
  { tag: "architettura", title: "Un contratto, due client: Zod tra web e mobile" },
];
