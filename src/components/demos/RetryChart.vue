<script setup lang="ts">
import { retryDelays } from "./offlineDemo";

const delays = retryDelays();
const longest = Math.max(...delays);
const label = `Attese tra i tentativi: ${delays.join(", ")} secondi`;
</script>

<template>
  <figure class="chart" role="img" :aria-label="label">
    <div v-for="(delay, index) in delays" :key="delay" class="chart__row">
      <span class="chart__label">{{ delay }} s</span>
      <span
        class="chart__bar"
        :class="{ 'chart__bar--cap': delay === longest }"
        :style="{ '--size': delay / longest, '--i': index }"
      />
    </div>
    <figcaption class="chart__caption">Il tetto è un minuto: oltre, l'attesa smette di crescere.</figcaption>
  </figure>
</template>

<style scoped>
.chart {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.chart__row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.chart__label {
  width: 3.25rem;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.chart__bar {
  height: 22px;
  width: calc(var(--size) * 85%);
  min-width: 6px;
  background: var(--shu);
  transform-origin: left;
  animation: grow 700ms var(--ease-spring) both;
  animation-delay: calc(var(--i) * 90ms);
}

.chart__bar--cap {
  background: var(--konjo);
}

@keyframes grow {
  from {
    transform: scaleX(0);
  }
}

.chart__caption {
  font-size: var(--text-sm);
  color: var(--ink-muted);
}
</style>
