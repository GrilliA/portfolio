import { describe, expect, it } from "vitest";
import {
  changeReps,
  changeWeight,
  deliver,
  goOffline,
  goOnline,
  initialState,
  recordSet,
  resendClose,
  retryDelays,
} from "./offlineDemo";

describe("demo offline di traccia", () => {
  it("salva subito una serie registrata online", () => {
    const state = recordSet(initialState());
    expect(state.saved).toBe(1);
    expect(state.log[0].status).toBe("sent");
  });

  it("tiene in coda le serie registrate offline e le invia insieme al ritorno della rete", () => {
    let state = goOffline(initialState());
    state = recordSet(recordSet(state));
    expect(state.saved).toBe(0);
    expect(state.log.map((set) => set.status)).toEqual(["queued", "queued"]);

    state = goOnline(state);
    expect(state.log.map((set) => set.status)).toEqual(["sending", "sending"]);

    state = deliver(state);
    expect(state.saved).toBe(2);
    expect(state.log.every((set) => set.status === "sent")).toBe(true);
  });

  it("non crea doppioni quando la chiusura viene rimandata", () => {
    const state = resendClose(recordSet(initialState()));
    expect(state.saved).toBe(1);
  });

  it("non scende sotto zero kg né sotto una ripetizione", () => {
    let state = { ...initialState(), weight: 0, reps: 1 };
    state = changeReps(changeWeight(state, -1), -1);
    expect(state.weight).toBe(0);
    expect(state.reps).toBe(1);
  });

  it("raddoppia l'attesa fino a un minuto", () => {
    expect(retryDelays()).toEqual([2, 4, 8, 16, 32, 60]);
  });
});
