<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import {
  changeReps,
  changeWeight,
  deliver,
  goOffline,
  goOnline,
  hasSending,
  initialState,
  recordSet,
  resendClose,
  type DemoState,
  type SetStatus,
} from "./offlineDemo";

const DELIVERY_MS = 1100;

const state = ref<DemoState>(initialState());
let deliveryTimer: ReturnType<typeof setTimeout> | undefined;

const apply = (next: DemoState) => {
  state.value = next;
};

const toggleNetwork = () => {
  if (state.value.online) {
    apply(goOffline(state.value));
    return;
  }

  apply(goOnline(state.value));
  if (hasSending(state.value)) {
    clearTimeout(deliveryTimer);
    deliveryTimer = setTimeout(() => apply(deliver(state.value)), DELIVERY_MS);
  }
};

onBeforeUnmount(() => clearTimeout(deliveryTimer));

const formatKg = (kg: number) => kg.toLocaleString("it-IT");

const STATUS_LABEL: Record<SetStatus, string> = {
  queued: "in coda",
  sending: "invio…",
  sent: "salvata ✓",
};

const savedLabel = computed(() =>
  state.value.saved === 1 ? "1 serie salvata" : `${state.value.saved} serie salvate`,
);
</script>

<template>
  <section class="demo" aria-labelledby="demo-title">
    <div class="demo__head">
      <h2 id="demo-title" class="demo__title">Demo: registra una serie, poi spegni la rete</h2>
      <button
        type="button"
        class="network"
        :class="{ 'network--off': !state.online }"
        :aria-pressed="!state.online"
        @click="toggleNetwork"
      >
        <span class="network__dot" aria-hidden="true" />
        {{ state.online ? "Rete: online" : "Rete: offline" }}
        <span class="visually-hidden">— tocca per {{ state.online ? "spegnerla" : "riaccenderla" }}</span>
      </button>
    </div>

    <div class="demo__body">
      <div class="phone">
        <div class="phone__top">
          <span class="phone__set">Serie {{ state.log.length + 1 }}</span>
          <span class="phone__program">Full Body 3×</span>
        </div>
        <p class="phone__exercise">Squat con bilanciere</p>

        <div class="stepper">
          <span id="weight-label" class="stepper__label">Peso (kg)</span>
          <div class="stepper__row" role="group" aria-labelledby="weight-label">
            <button type="button" class="stepper__btn" aria-label="Meno 2,5 kg" @click="apply(changeWeight(state, -1))">
              −
            </button>
            <output class="stepper__value" aria-live="polite">{{ formatKg(state.weight) }}</output>
            <button type="button" class="stepper__btn" aria-label="Più 2,5 kg" @click="apply(changeWeight(state, 1))">
              +
            </button>
          </div>
        </div>

        <div class="stepper">
          <span id="reps-label" class="stepper__label">Ripetizioni</span>
          <div class="stepper__row" role="group" aria-labelledby="reps-label">
            <button
              type="button"
              class="stepper__btn"
              aria-label="Una ripetizione in meno"
              @click="apply(changeReps(state, -1))"
            >
              −
            </button>
            <output class="stepper__value" aria-live="polite">{{ state.reps }}</output>
            <button
              type="button"
              class="stepper__btn"
              aria-label="Una ripetizione in più"
              @click="apply(changeReps(state, 1))"
            >
              +
            </button>
          </div>
        </div>

        <button type="button" class="phone__record" @click="apply(recordSet(state))">Registra serie</button>
      </div>

      <div class="side">
        <div class="side__block">
          <p class="side__label">Sul telefono</p>
          <p v-if="state.log.length === 0" class="side__empty">Nessuna serie ancora. Registrane una.</p>
          <TransitionGroup v-else tag="ol" name="pop" class="log">
            <li v-for="set in state.log" :key="set.n" class="log__item">
              <span class="log__text">#{{ set.n }} · {{ formatKg(set.weight) }} kg × {{ set.reps }}</span>
              <span class="chip" :class="`chip--${set.status}`">{{ STATUS_LABEL[set.status] }}</span>
            </li>
          </TransitionGroup>
        </div>

        <div class="server">
          <p class="side__label">Sul server</p>
          <p class="server__count">{{ savedLabel }}</p>
          <button type="button" class="server__resend" @click="apply(resendClose(state))">
            Invia di nuovo la chiusura
          </button>
          <p class="server__message" aria-live="polite">{{ state.message }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demo {
  background: var(--ink);
  color: var(--on-ink);
  border-radius: var(--radius-md);
  padding: clamp(1.25rem, 4vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.demo__head {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
  justify-content: space-between;
}

.demo__title {
  font-size: clamp(1.5rem, 1.2rem + 1vw, 1.875rem);
}

.network {
  min-height: 48px;
  padding: 0 var(--space-5);
  border-radius: var(--radius-pill);
  border: 2px solid var(--celadon);
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 700;
  cursor: pointer;
  transition: border-color 300ms ease;
}

.network__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--celadon);
  transition: background-color 300ms ease;
}

.network--off {
  border-color: var(--gamboge);
}

.network--off .network__dot {
  background: var(--gamboge);
  animation: blink 1.2s ease-in-out infinite;
}

@keyframes blink {
  50% {
    opacity: 0.3;
  }
}

.demo__body {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.phone {
  flex: 1 1 20rem;
  min-width: 0;
  background: var(--paper-light);
  color: var(--ink);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.phone__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
}

.phone__set {
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background: #f6d9cc;
  color: #8e2a12;
  font-weight: 700;
  font-size: 0.9375rem;
}

.phone__program {
  font-size: var(--text-sm);
  color: var(--ink-muted);
}

.phone__exercise {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.875rem;
  line-height: 1.15;
}

.stepper {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.stepper__label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--ink-soft);
}

.stepper__row {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.stepper__btn {
  flex: 0 0 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: #f6d9cc;
  color: #8e2a12;
  font-size: 1.625rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 200ms var(--ease-spring);
}

.stepper__btn:active {
  transform: scale(0.88);
}

.stepper__value {
  flex: 1;
  text-align: center;
  padding: 10px;
  border-radius: 16px;
  background: #f5ecdf;
  font-size: 2.125rem;
  font-weight: 700;
}

.phone__record {
  min-height: 56px;
  border-radius: var(--radius-pill);
  border: none;
  background: var(--ink);
  color: var(--on-accent);
  font-size: 1.0625rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 200ms var(--ease-spring);
}

.phone__record:active {
  transform: scale(0.97);
}

.side {
  flex: 1 1 20rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.side__block {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.side__label {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--on-ink-muted);
}

.side__empty {
  padding: var(--space-4);
  border-radius: 10px;
  border: 1px dashed var(--ink-muted);
  color: var(--on-ink-muted);
  font-size: 0.9375rem;
}

.log {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.log__item {
  padding: 12px 16px;
  border-radius: 10px;
  background: #2b2520;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  font-size: 0.9375rem;
}

.log__text {
  font-family: var(--font-mono);
}

.chip {
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  color: var(--ink);
  font-size: 0.8125rem;
  font-weight: 700;
  white-space: nowrap;
}

.chip--queued {
  background: var(--gamboge);
}

.chip--sending {
  background: var(--celadon);
}

.chip--sent {
  background: var(--paper);
}

.pop-enter-active {
  transition:
    transform 380ms var(--ease-spring),
    opacity 200ms ease;
}

.pop-enter-from {
  transform: translateY(-8px) scale(0.96);
  opacity: 0;
}

.server {
  margin-top: auto;
  padding: var(--space-5);
  border-radius: 10px;
  border: 1px solid var(--ink-soft);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.server__count {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
}

.server__resend {
  align-self: flex-start;
  min-height: 44px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-pill);
  border: 2px solid var(--on-ink);
  background: transparent;
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
}

.server__message {
  min-height: 1.5em;
  font-size: 0.9375rem;
  color: var(--celadon);
}
</style>
