<script setup="">
const props = defineProps(['showFilters', 'showSaves', 'savedMovieCount']);

const emit = defineEmits(['open-filters', 'open-saves']);

const openFilters = () => {
  emit('open-filters');
};

const openSaves = () => {
  emit('open-saves');
};
</script>

<template>
  <header
    :class="['header', { 'header--is-hidden': showFilters || showSaves }]"
  >
    <div class="header__logo">
      <div class="header__logo-text">Что посмотреть?</div>
    </div>
    <div class="header__actions">
      <button
        class="button header__actions-button"
        type="button"
        @click="openFilters"
      >
        Фильтры
      </button>
      <button
        class="button header__actions-button"
        type="button"
        @click="openSaves"
      >
        Сохранено
        <template v-if="savedMovieCount > 0">({{ savedMovieCount }})</template>
      </button>
    </div>
  </header>
</template>
