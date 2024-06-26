<script setup="">
import { computed } from 'vue';

const props = defineProps([
  'showFilters',
  'selectedType',
  'selectedYear',
  'selectedGenre',
  'selectedCountry',
  'uniqueTypes',
  'uniqueYears',
  'uniqueGenres',
  'uniqueCountries',
  'showResetButton',
]);

const emit = defineEmits([
  'close-filters',
  'update:type',
  'update:year',
  'update:genre',
  'update:country',
  'reset-filters',
]);

const sortedUniqueTypes = computed(() => {
  return props.uniqueTypes.sort((a, b) => b.localeCompare(a));
});

const sortedUniqueYears = computed(() => {
  return props.uniqueYears.sort((a, b) => b.localeCompare(a));
});

const sortedUniqueGenres = computed(() => {
  return props.uniqueGenres.sort();
});

const sortedUniqueCountries = computed(() => {
  return props.uniqueCountries.sort();
});

const closeFilters = () => {
  emit('close-filters');
};

const updateType = (value) => {
  emit('update:type', value);
};

const updateYear = (value) => {
  emit('update:year', value);
};

const updateGenre = (value) => {
  emit('update:genre', value);
};

const updateCountry = (value) => {
  emit('update:country', value);
};

const resetFilters = () => {
  emit('reset-filters');
};
</script>

<template>
  <div :class="['modal', { 'modal--is-open': showFilters }]">
    <div class="modal__inner">
      <header class="modal__header">
        <div class="modal__title">Фильтры</div>
        <button class="button modal__close" type="button" @click="closeFilters">
          <svg class="button__icon modal__close-icon" height="24" width="14">
            <use href="#x"></use>
          </svg>
        </button>
      </header>
      <form class="form modal__filter" autocomplete="off">
        <div class="form__group">
          <label class="form__label" for="type">Тип</label>
          <select
            class="select form__select"
            id="type"
            @change="updateType($event.target.value)"
            :value="selectedType"
          >
            <option value="">Любой</option>
            <option
              v-for="(type, typeIndex) in sortedUniqueTypes"
              :key="typeIndex"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <div class="form__group">
          <label class="form__label" for="year">Год</label>
          <select
            class="select form__select"
            id="year"
            @change="updateYear($event.target.value)"
            :value="selectedYear"
          >
            <option value="">Любой</option>
            <option
              v-for="(year, yearIndex) in sortedUniqueYears"
              :key="yearIndex"
            >
              {{ year }}
            </option>
          </select>
        </div>
        <div class="form__group">
          <label class="form__label" for="genre">Жанр</label>
          <select
            class="select form__select"
            id="genre"
            @change="updateGenre($event.target.value)"
            :value="selectedGenre"
          >
            <option value="">Любой</option>
            <option
              v-for="(genre, genreIndex) in sortedUniqueGenres"
              :key="genreIndex"
            >
              {{ genre }}
            </option>
          </select>
        </div>
        <div class="form__group">
          <label class="form__label" for="country">Страна</label>
          <select
            class="select form__select"
            id="country"
            @change="updateCountry($event.target.value)"
            :value="selectedCountry"
          >
            <option value="">Любая</option>
            <option
              v-for="(country, countryIndex) in sortedUniqueCountries"
              :key="countryIndex"
            >
              {{ country }}
            </option>
          </select>
        </div>
        <button
          class="button button--primary form__button"
          type="button"
          @click="closeFilters"
        >
          Обновить
        </button>
        <button
          class="button form__button"
          type="reset"
          v-if="showResetButton"
          @click="resetFilters"
        >
          Сбросить
        </button>
      </form>
    </div>
  </div>
</template>
