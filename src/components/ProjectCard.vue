<script setup lang="ts">
import type { Project } from "../data/projects";

defineProps<{ project: Project }>();
</script>

<template>
  <article class="card">
    <div class="card__plate" aria-hidden="true" :style="{ background: project.plate.ground }">
      <span class="shape shape--a" :style="{ background: project.plate.colors[0] }" />
      <span class="shape shape--b" :style="{ background: project.plate.colors[1] }" />
      <span class="shape shape--c" :style="{ background: project.plate.colors[2] }" />
    </div>
    <div class="card__body">
      <p class="kicker" :style="{ color: project.plate.colors[0] }">Caso studio · {{ project.number }}</p>
      <h3 class="card__title">{{ project.title }}</h3>
      <p class="card__summary">{{ project.summary }}</p>
      <ul class="card__stack" aria-label="Tecnologie">
        <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
      </ul>
      <RouterLink v-if="project.route" :to="{ name: project.route }" class="card__link">
        Leggi il caso studio <span aria-hidden="true">→</span>
      </RouterLink>
      <p v-else class="card__soon">Caso studio in arrivo</p>
    </div>
  </article>
</template>

<style scoped>
.card {
  flex: 1 1 26rem;
  min-width: 0;
  background: var(--paper);
  color: var(--ink);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card__plate {
  position: relative;
  height: 260px;
  overflow: hidden;
}

.shape {
  position: absolute;
  transition: transform 600ms var(--ease-spring);
}

.shape--a {
  left: 40px;
  top: 40px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.shape--b {
  left: 150px;
  top: 110px;
  width: 240px;
  height: 70px;
}

.shape--c {
  right: 40px;
  bottom: 32px;
  width: 90px;
  height: 90px;
}

.card:hover .shape--a {
  transform: translate(10px, -8px);
}

.card:hover .shape--b {
  transform: translateX(-16px);
}

.card:hover .shape--c {
  transform: rotate(45deg);
}

.card__body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  flex-grow: 1;
}

.card__title {
  font-size: var(--text-h3);
}

.card__summary {
  font-size: 1.0625rem;
  color: var(--ink-soft);
}

.card__stack {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: 0.8125rem;
  font-weight: 500;
}

.card__stack li {
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--paper-line);
}

.card__link,
.card__soon {
  margin-top: auto;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 700;
}

.card__link span {
  transition: transform 260ms var(--ease-spring);
}

.card__link:hover span {
  transform: translateX(6px);
}

.card__soon {
  color: var(--ink-muted);
}
</style>
