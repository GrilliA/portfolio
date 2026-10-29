<script setup lang="ts">
import HeroPlate from "../components/HeroPlate.vue";
import PaletteSwitcher from "../components/PaletteSwitcher.vue";
import ProjectCard from "../components/ProjectCard.vue";
import SiteFooter from "../components/SiteFooter.vue";
import { NOTES, PROJECTS } from "../data/projects";
</script>

<template>
  <section class="container hero">
    <div class="hero__text">
      <!-- TODO: inserire la città -->
      <p class="hero__kicker">Sviluppatore full-stack · [CITTÀ]</p>
      <h1 class="hero__title">Costruisco software con la cura di un artigiano.</h1>
      <p class="hero__lead">
        Progetto e sviluppo app web e mobile, dal database all'ultima micro-interazione. Qui racconto come le
        costruisco, con demo che puoi toccare.
      </p>
      <div class="hero__actions">
        <a class="btn btn--solid" href="#progetti">Vedi i progetti</a>
        <a class="btn" href="#contatti">Scrivimi</a>
      </div>
    </div>
    <div class="hero__art">
      <HeroPlate />
      <PaletteSwitcher />
    </div>
  </section>

  <section id="progetti" class="projects">
    <div class="container projects__inner">
      <div class="section-head">
        <h2 class="section-title">Progetti</h2>
        <p class="projects__intro">
          Ogni progetto è un caso studio, con una demo da provare e le scelte tecniche spiegate.
        </p>
      </div>
      <div class="projects__grid">
        <ProjectCard v-for="project in PROJECTS" :key="project.slug" :project="project" />
      </div>
    </div>
  </section>

  <section id="note" class="container notes">
    <div class="notes__head">
      <h2 class="section-title">Note dal banco di lavoro</h2>
      <p class="muted">Articoli brevi su problemi incontrati costruendo i progetti. In preparazione.</p>
    </div>
    <ol class="notes__list">
      <li v-for="note in NOTES" :key="note.title" class="note">
        <span class="note__tag">{{ note.tag }}</span>
        <span class="note__title">{{ note.title }}</span>
        <span class="note__status">In preparazione</span>
      </li>
    </ol>
  </section>

  <section id="chi-sono" class="about">
    <div class="container about__inner">
      <!-- TODO: sostituire con una foto -->
      <div class="about__photo" aria-hidden="true">[TUA FOTO]</div>
      <div class="about__text">
        <h2 class="section-title">Chi sono</h2>
        <p class="about__lead">[DUE O TRE RIGHE SU DI TE: cosa fai oggi, cosa ti appassiona, cosa cerchi.]</p>
        <p class="muted">
          Lavoro con TypeScript su tutto lo stack: React e Vue sul web, Expo su mobile, Express, Drizzle e Postgres
          dietro.
        </p>
      </div>
    </div>
  </section>

  <SiteFooter />
</template>

<style scoped>
.hero {
  padding-block: var(--space-8) var(--space-9);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  align-items: center;
}

.hero__text {
  flex: 999 1 30rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.hero__kicker {
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  transition: color 400ms ease;
}

.hero__title {
  font-size: var(--text-display);
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.hero__lead {
  max-width: 35rem;
  font-size: var(--text-xl);
  color: var(--ink-soft);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.hero__art {
  flex: 1 1 28rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.section-title {
  font-size: var(--text-h2);
}

.section-head {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: baseline;
  justify-content: space-between;
}

.muted {
  font-size: 1.0625rem;
  color: var(--ink-soft);
}

.projects {
  background: var(--ink);
  color: var(--on-ink);
}

.projects__inner {
  padding-block: var(--space-9);
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
}

.projects__intro {
  max-width: 29rem;
  font-size: 1.0625rem;
  color: var(--on-ink-muted);
}

.projects__grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.notes {
  padding-block: var(--space-9);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.notes__head {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.notes__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.note {
  padding-block: var(--space-5);
  border-top: 1px solid var(--paper-line);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-6);
  align-items: baseline;
}

.note:last-child {
  border-bottom: 1px solid var(--paper-line);
}

.note__tag {
  width: 7.5rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--accent);
}

.note__title {
  flex: 1 1 22rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 1.25;
}

.note__status {
  font-size: var(--text-sm);
  color: var(--ink-muted);
}

.about {
  background: var(--paper-deep);
}

.about__inner {
  padding-block: var(--space-9);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-7);
}

.about__photo {
  flex: 0 0 220px;
  height: 220px;
  border-radius: 50%;
  background: var(--second);
  color: var(--on-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  transition: background-color 500ms ease;
}

.about__text {
  flex: 999 1 26rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.about__lead {
  max-width: 40rem;
  font-size: var(--text-lg);
  line-height: 1.7;
}
</style>
