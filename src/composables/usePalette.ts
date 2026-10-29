import { computed, ref, watchEffect } from "vue";

export type Combination = {
  id: string;
  name: string;
  colors: readonly [string, string, string];
};

export const COMBINATIONS: readonly Combination[] = [
  { id: "shu", name: "Shu · vermiglione", colors: ["#b8371a", "#1f3b5c", "#e0a526"] },
  { id: "konjo", name: "Konjō · blu di Prussia", colors: ["#1f3b5c", "#e0a526", "#9dbfa6"] },
  { id: "matsuba", name: "Matsuba · verde pino", colors: ["#2f5d46", "#6b2d4f", "#e9b8a0"] },
  { id: "budo", name: "Budō · prugna", colors: ["#6b2d4f", "#2f5d46", "#e0a526"] },
];

const STORAGE_KEY = "palette";

function readSaved(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function save(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Storage non disponibile: la scelta vale solo per questa visita.
  }
}

const pickedId = ref(readSaved() ?? COMBINATIONS[0].id);

const current = computed(
  () => COMBINATIONS.find((combination) => combination.id === pickedId.value) ?? COMBINATIONS[0],
);

watchEffect(() => {
  const [accent, second, third] = current.value.colors;
  const root = document.documentElement.style;
  root.setProperty("--accent", accent);
  root.setProperty("--second", second);
  root.setProperty("--third", third);
});

/** La combinazione di colori scelta, condivisa da tutto il sito. */
export function usePalette() {
  const pick = (id: string) => {
    pickedId.value = id;
    save(id);
  };

  return { combinations: COMBINATIONS, current, pick };
}
