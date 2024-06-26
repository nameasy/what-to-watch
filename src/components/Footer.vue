<script setup="">
const props = defineProps(['showFilters', 'showSaves']);
</script>

<template>
  <footer
    :class="['footer', { 'footer--is-hidden': showFilters || showSaves }]"
  >
    <div class="footer__text">
      Проект
      <a class="link" href="https://lyubavtsev.ru/">Степана Любавцева</a>
    </div>
  </footer>
</template>
