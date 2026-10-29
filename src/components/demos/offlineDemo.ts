/**
 * La logica della demo offline di traccia, senza Vue: lo stato entra, il nuovo stato esce.
 *
 * Imita il comportamento vero dell'app: le serie registrate senza rete restano sul
 * telefono; quando la rete torna partono tutte in una sola richiesta, e rimandare la
 * stessa richiesta non crea doppioni sul server.
 */

export type SetStatus = "queued" | "sending" | "sent";

export type LoggedSet = {
  n: number;
  weight: number;
  reps: number;
  status: SetStatus;
};

export type DemoState = {
  weight: number;
  reps: number;
  online: boolean;
  log: readonly LoggedSet[];
  /** Serie salvate sul server. */
  saved: number;
  message: string;
};

export const WEIGHT_STEP = 2.5;

export const initialState = (): DemoState => ({
  weight: 80,
  reps: 8,
  online: true,
  log: [],
  saved: 0,
  message: "",
});

export const changeWeight = (state: DemoState, direction: 1 | -1): DemoState => ({
  ...state,
  weight: Math.max(0, state.weight + direction * WEIGHT_STEP),
});

export const changeReps = (state: DemoState, direction: 1 | -1): DemoState => ({
  ...state,
  reps: Math.max(1, state.reps + direction),
});

export function recordSet(state: DemoState): DemoState {
  const set: LoggedSet = {
    n: state.log.length + 1,
    weight: state.weight,
    reps: state.reps,
    status: state.online ? "sent" : "queued",
  };

  return {
    ...state,
    log: [...state.log, set],
    saved: state.online ? state.saved + 1 : state.saved,
    message: state.online ? "" : "Niente rete: la serie resta sul telefono.",
  };
}

export const goOffline = (state: DemoState): DemoState => ({ ...state, online: false, message: "" });

/** La rete torna: le serie in coda partono insieme, in una richiesta. */
export function goOnline(state: DemoState): DemoState {
  const queued = state.log.filter((set) => set.status === "queued").length;

  return {
    ...state,
    online: true,
    message: queued > 0 ? `Rete tornata: invio ${queued} serie in una richiesta…` : "",
    log: state.log.map((set) => (set.status === "queued" ? { ...set, status: "sending" } : set)),
  };
}

/** Il server ha risposto: quello che era in viaggio ora è salvato. */
export function deliver(state: DemoState): DemoState {
  const sending = state.log.filter((set) => set.status === "sending").length;
  if (sending === 0) return state;

  return {
    ...state,
    saved: state.saved + sending,
    message: "Arrivate. Nessuna serie persa.",
    log: state.log.map((set) => (set.status === "sending" ? { ...set, status: "sent" } : set)),
  };
}

/** Rimandare la chiusura è sicuro: il server risponde con la sessione già salvata. */
export function resendClose(state: DemoState): DemoState {
  if (!state.online) {
    return { ...state, message: "Sei offline: riprova quando torna la rete." };
  }

  return {
    ...state,
    message: `Il server riconosce la richiesta e risponde con la sessione già salvata: ancora ${state.saved}, nessun doppione.`,
  };
}

export const hasSending = (state: DemoState) => state.log.some((set) => set.status === "sending");

/** Le attese tra un tentativo e l'altro nell'app: 2 s, 4 s, 8 s … fino a un minuto. */
export function retryDelays(first = 2, longest = 60): number[] {
  const delays: number[] = [];
  for (let delay = first; delays.at(-1) !== longest; delay *= 2) {
    delays.push(Math.min(delay, longest));
  }
  return delays;
}
