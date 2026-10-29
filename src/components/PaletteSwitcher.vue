<script setup lang="ts">
import { usePalette } from "../composables/usePalette";

const { combinations, current, pick } = usePalette();
</script>

<template>
  <fieldset class="switcher">
    <legend class="switcher__legend">Scegli una combinazione, ispirata ai colori di Sanzo Wada:</legend>
    <div class="switcher__options">
      <button
        v-for="combination in combinations"
        :key="combination.id"
        type="button"
        class="option"
        :aria-pressed="combination.id === current.id"
        @click="pick(combination.id)"
      >
        <span class="option__swatch" aria-hidden="true">
          <span v-for="color in combination.colors" :key="color" :style="{ background: color }" />
        </span>
        {{ combination.name }}
      </button>
    </div>
  </fieldset>
</template>

<style scoped>
.switcher {
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.switcher__legend {
  padding: 0;
  margin-bottom: var(--space-3);
  font-size: var(--text-sm);
  color: var(--ink-soft);
}

.switcher__options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.option {
  min-height: 48px;
  padding: 6px 14px 6px 6px;
  border-radius: var(--radius-pill);
  border: 2px solid transparent;
  background: var(--paper-light);
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: transform 260ms var(--ease-spring);
}

.option:hover {
  transform: translateY(-2px);
}

.option:active {
  transform: scale(0.96);
}

.option[aria-pressed="true"] {
  border-color: var(--ink);
}

.option__swatch {
  display: flex;
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.option__swatch span {
  width: 22px;
  height: 32px;
}
</style>
