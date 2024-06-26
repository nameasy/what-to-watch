<script setup="">
const props = defineProps(['savedMovies', 'hasSavedMovies']);

const emit = defineEmits(['delete-movie', 'close-saves']);

const deleteMovie = (index) => {
  emit('delete-movie', index);
};

const closeSaves = () => {
  emit('close-saves');
};
</script>

<template>
  <div class="saves">
    <header class="saves__header">
      <div class="saves__title">Сохранено</div>
      <button class="button saves__close" type="button" @click="closeSaves">
        <svg
          class="button__icon saves__close-icon"
          aria-hidden="true"
          height="24"
          width="14"
        >
          <use href="#x"></use>
        </svg>
      </button>
    </header>
    <ul class="saves__list" v-if="hasSavedMovies">
      <li
        class="saves__item"
        v-for="(savedMovie, index) in savedMovies"
        :key="index"
      >
        <span class="saves__text">{{ savedMovie }}</span>
        <button
          class="button saves__delete"
          type="button"
          @click="deleteMovie(index)"
        >
          <svg
            class="button__icon saves__delete-icon"
            aria-hidden="true"
            height="24"
            width="20"
          >
            <use href="#trash"></use>
          </svg>
        </button>
      </li>
    </ul>
    <div class="saves__empty" v-else="">
      <span class="saves__empty-text">Пока ничего не сохранено</span>
    </div>
  </div>
</template>
