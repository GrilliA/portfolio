<template>
  <footer id="contatti" class="container footer">
    <h2 class="footer__title">Hai un progetto in mente? Parliamone.</h2>
    <div class="footer__links">
      <!-- TODO: inserire email e LinkedIn -->
      <a class="btn btn--accent" href="mailto:[LA TUA EMAIL]">[LA TUA EMAIL]</a>
      <a class="btn" href="https://github.com/GrilliA">GitHub</a>
      <a class="btn" href="#">[LINKEDIN]</a>
    </div>
    <p class="footer__credit">Palette ispirata a Sanzo Wada, A Dictionary of Color Combinations (anni '30).</p>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: var(--space-9) var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.footer__title {
  font-size: clamp(2.2rem, 1.4rem + 2.6vw, 3.6rem);
  max-width: 48rem;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.footer__credit {
  margin-top: var(--space-5);
  padding-top: var(--space-5);
  border-top: 1px solid var(--paper-line);
  font-size: var(--text-sm);
  color: var(--ink-muted);
}
</style>
