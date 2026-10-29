<script setup lang="ts">
import { usePalette } from "../composables/usePalette";

const { current } = usePalette();
</script>

<template>
  <div class="plate" aria-hidden="true">
    <div class="plate__sun" />
    <div class="plate__band" />
    <div class="plate__ground" />
    <div class="plate__diamond" />
    <span class="plate__label">{{ current.name }}</span>
  </div>
</template>

<style scoped>
.plate {
  position: relative;
  height: 420px;
  border-radius: var(--radius-sm);
  background: var(--paper-deep);
  border: 1px solid #d9cbb2;
  overflow: hidden;
}

.plate > div {
  position: absolute;
  transition: background-color 500ms ease, transform 700ms var(--ease-spring);
}

.plate__sun {
  left: 14%;
  top: 11%;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: var(--accent);
}

.plate:hover .plate__sun {
  transform: translateY(-12px);
}

.plate__band {
  right: 0;
  top: 36%;
  width: 58%;
  height: 120px;
  background: var(--second);
}

.plate__ground {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 110px;
  background: var(--third);
}

.plate__diamond {
  left: 36px;
  bottom: 70px;
  width: 120px;
  height: 120px;
  background: var(--paper);
  transform: rotate(45deg);
}

.plate:hover .plate__diamond {
  transform: rotate(90deg);
}

.plate__label {
  position: absolute;
  right: 28px;
  bottom: 26px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 480px) {
  .plate {
    height: 320px;
  }

  .plate__sun {
    width: 140px;
    height: 140px;
  }
}
</style>
