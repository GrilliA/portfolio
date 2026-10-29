<script setup lang="ts">
import SiteHeader from "./components/SiteHeader.vue";
</script>

<template>
  <a class="skip-link" href="#contenuto">Vai al contenuto</a>
  <SiteHeader />
  <main id="contenuto">
    <RouterView />
  </main>
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: var(--space-4);
  top: -100px;
  padding: var(--space-3) var(--space-4);
  background: var(--ink);
  color: var(--on-ink);
  border-radius: var(--radius-sm);
  z-index: 10;
}

.skip-link:focus {
  top: var(--space-4);
}
</style>
