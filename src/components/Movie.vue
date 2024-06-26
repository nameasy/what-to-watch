<script setup="">
const props = defineProps([
  'title',
  'type',
  'year',
  'genre',
  'country',
  'isSavedMovie',
  'randomMovieAnimate',
  'saveMovieAnimate',
]);

const emit = defineEmits(['get-random-movie', 'save-movie', 'remove-class']);

const getRandomMovie = () => {
  emit('get-random-movie');
};

const saveMovie = () => {
  emit('save-movie');
};

const removeClass = (className) => {
  emit('remove-class', className);
};
</script>

<template>
  <div class="movie">
    <div class="movie__title">{{ title }}</div>
    <div class="movie__info">
      <span class="movie__info-caption">Тип</span>
      <span class="movie__info-text">{{ type }}</span>
      <span class="movie__info-interpoint"> · </span>
      <span class="movie__info-caption">Год</span>
      <span class="movie__info-text">{{ year }}</span>
      <span class="movie__info-interpoint"> · </span>
      <span class="movie__info-caption">Жанр</span>
      <span class="movie__info-text">{{ genre }}</span>
      <span class="movie__info-interpoint"> · </span>
      <span class="movie__info-caption">Страна</span>
      <span class="movie__info-text">{{ country }}</span>
    </div>
    <div class="movie__actions">
      <button
        :class="[
          'button',
          'button--subtle',
          'movie__random',
          { 'movie__random--animate': randomMovieAnimate },
        ]"
        type="button"
        @click="getRandomMovie"
        @animationend="removeClass('randomMovieAnimate')"
      >
        <svg
          class="button__icon movie__random-icon"
          aria-hidden="true"
          height="24"
          width="21"
        >
          <use href="#refresh-ccw"></use>
        </svg>
        <span class="button__text movie__random-text">Показать ещё</span>
      </button>
      <button
        :class="[
          'button',
          'button--subtle',
          'movie__save',
          {
            'movie__save--active': isSavedMovie,
            'movie__save--animate': saveMovieAnimate,
          },
        ]"
        type="button"
        @click="saveMovie"
        @animationend="removeClass('saveMovieAnimate')"
      >
        <svg
          class="button__icon movie__save-icon"
          aria-hidden="true"
          height="24"
          width="22"
        >
          <use href="#heart"></use>
        </svg>
        <span class="button__text movie__save-text">Сохранить</span>
      </button>
    </div>
  </div>
</template>
