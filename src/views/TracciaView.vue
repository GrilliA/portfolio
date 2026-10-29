<script setup lang="ts">
import OfflineSessionDemo from "../components/demos/OfflineSessionDemo.vue";
import RetryChart from "../components/demos/RetryChart.vue";

const CHOICES = [
  {
    tag: "Contratto",
    title: "Uno schema Zod, due client",
    text: "Web e mobile leggono le risposte dell'API con gli stessi schemi.",
  },
  {
    tag: "Accesso",
    title: "Cookie sul web, SecureStore sul telefono",
    text: "Ogni piattaforma conserva l'accesso nel posto più sicuro che ha.",
  },
  {
    tag: "Design",
    title: "Il sistema “Sole”",
    text: "Una serie alla volta, tasti grandi da usare con le mani sudate.",
  },
];

const FACTS = [
  { label: "Ruolo", value: "[IL TUO RUOLO]" },
  { label: "Web", value: "React · Vite · TypeScript" },
  { label: "Mobile", value: "Expo · React Native" },
  { label: "API", value: "Express · Drizzle · Postgres" },
];
</script>

<template>
  <article class="case">
    <header class="container intro">
      <RouterLink to="/" class="back">← Tutti i progetti</RouterLink>
      <p class="kicker case__kicker">Caso studio · 01 · traccia</p>
      <h1 class="intro__title">Un allenamento che non si perde mai.</h1>
      <p class="intro__lead">
        traccia unisce un pannello web per i coach e un'app per gli atleti. Il coach assegna le schede; l'atleta le
        esegue in palestra, una serie alla volta, anche quando il segnale sparisce.
      </p>
      <dl class="facts">
        <div v-for="fact in FACTS" :key="fact.label" class="facts__item">
          <dt>{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>
    </header>

    <section class="prose block">
      <h2 class="block__title">Il problema</h2>
      <p>
        In palestra il segnale va e viene: seminterrati, pareti spesse, il telefono che passa da Wi-Fi a 4G a niente.
        Se una sessione registrata a metà si perde, l'atleta non si fida più dell'app.
      </p>
      <p>
        Quindi l'app deve funzionare <strong>prima</strong> sul telefono e solo <strong>poi</strong> sul server. Prova
        tu.
      </p>
    </section>

    <div class="container demo-wrap">
      <OfflineSessionDemo />
    </div>

    <section class="prose block">
      <h2 class="block__title">Inviare due volte, salvare una</h2>
      <p>
        Quando la rete torna, l'app manda la chiusura della sessione con tutte le serie in
        <strong>una sola richiesta</strong>. Se la risposta si perde per strada, l'app non può sapere se il server l'ha
        ricevuta. Allora la rimanda.
      </p>
      <p>
        Il trucco è che rimandarla è sicuro: il server risponde a una chiusura ripetuta con la sessione già salvata.
        Niente doppioni, e il telefono non deve tenere traccia di cosa è arrivato.
      </p>
    </section>

    <section class="prose block">
      <h2 class="block__title">Ritentare con calma</h2>
      <p>
        Se l'invio fallisce, l'attesa raddoppia a ogni tentativo, fino a un minuto. Così un server in difficoltà non
        viene sommerso.
      </p>
      <RetryChart />
    </section>

    <section class="container choices">
      <h2 class="block__title">Altre scelte</h2>
      <div class="choices__grid">
        <div v-for="choice in CHOICES" :key="choice.title" class="choice">
          <p class="kicker">{{ choice.tag }}</p>
          <h3 class="choice__title">{{ choice.title }}</h3>
          <p class="choice__text">{{ choice.text }}</p>
        </div>
      </div>
    </section>

    <section class="prose block">
      <h2 class="block__title">Cosa ho imparato</h2>
      <!-- TODO: scrivere la riflessione finale -->
      <p>[DUE O TRE RIGHE: cosa rifaresti diversamente, cosa ti ha sorpreso.]</p>
      <div class="links">
        <a class="btn btn--accent" href="https://grillia.github.io/workoutPlanner/">Apri traccia</a>
        <a class="btn" href="https://github.com/GrilliA/workoutPlanner">Codice su GitHub</a>
      </div>
    </section>

    <footer class="next">
      <div class="container next__inner">
        <p class="next__label">Prossimo caso studio</p>
        <p class="next__title">Voyage, in arrivo</p>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.intro {
  padding-block: var(--space-6) var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.back {
  align-self: flex-start;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}

.case__kicker {
  color: var(--shu);
}

.intro__title {
  font-size: clamp(2.6rem, 1.6rem + 3.4vw, 4.8rem);
  line-height: 1.06;
  letter-spacing: -0.02em;
  max-width: 56rem;
}

.intro__lead {
  max-width: 42rem;
  font-size: var(--text-xl);
  color: var(--ink-soft);
}

.facts {
  margin: var(--space-4) 0 0;
  padding-block: var(--space-5);
  border-block: 1px solid var(--paper-line);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: var(--space-5);
}

.facts__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.facts dt {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.facts dd {
  margin: 0;
  font-size: 1.0625rem;
}

.block {
  padding-block: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  font-size: var(--text-lg);
  line-height: 1.75;
}

.block__title {
  font-size: clamp(2rem, 1.7rem + 1vw, 2.5rem);
}

.demo-wrap {
  padding-block: var(--space-6) var(--space-8);
}

.choices {
  padding-block: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.choices__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17.5rem, 1fr));
  gap: var(--space-5);
}

.choice {
  padding: var(--space-6);
  border-radius: 6px;
  background: var(--paper-deep);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.choice .kicker {
  color: var(--shu);
}

.choice__title {
  font-size: 1.375rem;
  font-weight: 700;
}

.choice__text {
  color: var(--ink-soft);
}

.links {
  margin-top: var(--space-3);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.next {
  margin-top: var(--space-8);
  background: var(--ink);
  color: var(--on-ink);
}

.next__inner {
  padding-block: var(--space-8);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: space-between;
  align-items: center;
}

.next__label {
  font-size: 0.9375rem;
  color: var(--on-ink-muted);
}

.next__title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 2rem;
}
</style>
