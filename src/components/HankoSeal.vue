<script setup lang="ts">
/* Il timbro "AG": al passaggio del mouse si inclina, come un sigillo premuto sulla carta. */
</script>

<template>
  <span class="seal" aria-hidden="true">AG</span>
</template>

<style scoped>
.seal {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: var(--accent);
  color: var(--on-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 17px;
  transition:
    transform 320ms var(--ease-spring),
    background-color 400ms ease;
}

a:hover .seal {
  transform: rotate(-8deg) scale(1.06);
}
</style>
