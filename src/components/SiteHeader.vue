<script setup lang="ts">
import HankoSeal from "./HankoSeal.vue";
</script>

<template>
  <header class="container header">
    <RouterLink to="/" class="brand">
      <HankoSeal />
      <span class="brand__name">Alessio Grilli</span>
    </RouterLink>
    <nav aria-label="Principale" class="nav">
      <RouterLink :to="{ path: '/', hash: '#progetti' }">Progetti</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#note' }">Note</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#chi-sono' }">Chi sono</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#contatti' }">Contatti</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  padding-block: var(--space-6);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
}

.brand__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-xl);
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-6);
  font-weight: 500;
}

.nav a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}
</style>
