<script setup="">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import HeaderComponent from './components/Header.vue';
import MovieComponent from './components/Movie.vue';
import SavesComponent from './components/Saves.vue';
import FooterComponent from './components/Footer.vue';
import ModalComponent from './components/Modal.vue';

const movies = ref([]);
const movieTitle = ref('');
const movieType = ref('');
const movieYear = ref('');
const movieGenre = ref('');
const movieCountry = ref('');
const savedMovies = ref([]);
const selectedType = ref('');
const selectedYear = ref('');
const selectedGenre = ref('');
const selectedCountry = ref('');
const showFilters = ref(false);
const showSaves = ref(false);
const randomMovieAnimate = ref(false);
const saveMovieAnimate = ref(false);
const showResetButton = ref(false);

const savedMovieCount = computed(() => {
  return savedMovies.value.length;
});

const isSavedMovie = computed(() => {
  return savedMovies.value.includes(movieTitle.value);
});

const hasSavedMovies = computed(() => {
  return savedMovies.value.length > 0;
});

const uniqueTypes = computed(() => {
  return [...new Set(movies.value.map((movie) => movie.type))];
});

const uniqueYears = computed(() => {
  return [...new Set(movies.value.flatMap((movie) => movie.year.split('-')))];
});

const uniqueGenres = computed(() => {
  return [...new Set(movies.value.flatMap((movie) => movie.genre.split(', ')))];
});

const uniqueCountries = computed(() => {
  return [
    ...new Set(movies.value.flatMap((movie) => movie.country.split(', '))),
  ];
});

const fetchData = () => {
  fetch('./data.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      movies.value = data.movies;
      getRandomMovie();
    })
    .catch((error) => {
      console.error(error);
    });
};

const getRandomMovie = () => {
  const filteredMovies = movies.value.filter((movie) => {
    const matchType =
      selectedType.value === '' || movie.type === selectedType.value;
    const matchYear =
      selectedYear.value === '' || movie.year.includes(selectedYear.value);
    const matchGenre =
      selectedGenre.value === '' || movie.genre.includes(selectedGenre.value);
    const matchCountry =
      selectedCountry.value === '' ||
      movie.country.includes(selectedCountry.value);
    return matchType && matchYear && matchGenre && matchCountry;
  });
  updateSelectOptions(filteredMovies, 'type', 'type');
  updateSelectOptions(filteredMovies, 'year', 'year');
  updateSelectOptions(filteredMovies, 'genre', 'genre');
  updateSelectOptions(filteredMovies, 'country', 'country');
  if (filteredMovies.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const { title, type, year, genre, country } = filteredMovies[randomIndex];
    movieTitle.value = title;
    movieType.value = type;
    movieYear.value = year;
    movieGenre.value = genre;
    movieCountry.value = country;
    randomMovieAnimate.value = true;
  } else {
    movieTitle.value = 'Ничего не нашлось (·_·)';
  }
};

const updateSelectOptions = (filteredMovies, selectId, property) => {
  const selectElement = document.getElementById(selectId);
  if (!selectElement || !selectElement.options) {
    return;
  }
  [...selectElement.options].forEach((option) => {
    if (option.value === '') {
      return;
    }
    const isEnabled = filteredMovies.some((movie) => {
      return movie[property].includes(option.value);
    });
    option.disabled = !isEnabled;
  });
};

const saveMovie = () => {
  if (movieTitle.value === 'Ничего не нашлось (·_·)') {
    alert('Фильмы не найдены');
    return;
  }
  if (savedMovies.value.includes(movieTitle.value)) {
    alert('Фильм уже сохранён');
    return;
  }
  // savedMovies.value.push(movieTitle.value);
  savedMovies.value.unshift(movieTitle.value);
  localStorage.setItem('savedMovies', JSON.stringify(savedMovies.value));
  saveMovieAnimate.value = true;
};

const removeClass = (buttonName) => {
  switch (buttonName) {
    case 'randomMovieAnimate':
      randomMovieAnimate.value = false;
      break;
    case 'saveMovieAnimate':
      saveMovieAnimate.value = false;
      break;
    default:
      break;
  }
};

const deleteMovie = (index) => {
  if (index < 0 || index >= savedMovies.value.length) {
    return;
  }
  savedMovies.value.splice(index, 1);
  localStorage.setItem('savedMovies', JSON.stringify(savedMovies.value));
};

const updateType = (value) => {
  selectedType.value = value;
  updateFilters();
};

const updateYear = (value) => {
  selectedYear.value = value;
  updateFilters();
};

const updateGenre = (value) => {
  selectedGenre.value = value;
  updateFilters();
};

const updateCountry = (value) => {
  selectedCountry.value = value;
  updateFilters();
};

const updateFilters = () => {
  getRandomMovie();
  const anyFilterSelected =
    selectedType.value !== '' ||
    selectedYear.value !== '' ||
    selectedGenre.value !== '' ||
    selectedCountry.value !== '';
  updateResetButtonVisibility(anyFilterSelected);
};

const resetFilters = () => {
  selectedType.value = '';
  selectedYear.value = '';
  selectedGenre.value = '';
  selectedCountry.value = '';
  getRandomMovie();
  updateResetButtonVisibility(false);
};

const updateResetButtonVisibility = (visible) => {
  showResetButton.value = visible;
};

const openFilters = () => {
  showFilters.value = true;
  document.querySelector('body').style.backgroundColor = 'var(--color-bg-dark)';
};

const openSaves = () => {
  showSaves.value = true;
  document.querySelector('body').style.backgroundColor = 'var(--color-bg-dark)';
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    closeFilters();
    closeSaves();
  }
};

const closeFilters = () => {
  showFilters.value = false;
  document.querySelector('body').style.removeProperty('background-color');
};

const closeSaves = () => {
  showSaves.value = false;
  document.querySelector('body').style.removeProperty('background-color');
};

onMounted(() => {
  fetchData();
  savedMovies.value = JSON.parse(localStorage.getItem('savedMovies')) || [];
  document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <header-component
    @open-filters="openFilters"
    @open-saves="openSaves"
    :show-filters="showFilters"
    :show-saves="showSaves"
    :saved-movie-count="savedMovieCount"
  ></header-component>
  <main class="main">
    <section class="section">
      <h1 class="visually-hidden">Что посмотреть?</h1>
      <div class="section__layout">
        <div
          :class="[
            'section__content',
            { 'section__content--is-hidden': showFilters || showSaves },
          ]"
        >
          <movie-component
            @get-random-movie="getRandomMovie"
            @save-movie="saveMovie"
            @remove-class="removeClass"
            :title="movieTitle"
            :type="movieType"
            :year="movieYear"
            :genre="movieGenre"
            :country="movieCountry"
            :is-saved-movie="isSavedMovie"
            :random-movie-animate="randomMovieAnimate"
            :save-movie-animate="saveMovieAnimate"
          ></movie-component>
        </div>
        <aside
          :class="['section__aside', { 'section__aside--is-open': showSaves }]"
        >
          <saves-component
            @delete-movie="deleteMovie"
            @close-saves="closeSaves"
            :saved-movies="savedMovies"
            :has-saved-movies="hasSavedMovies"
          ></saves-component>
        </aside>
      </div>
    </section>
  </main>
  <footer-component
    :show-filters="showFilters"
    :show-saves="showSaves"
  ></footer-component>
  <modal-component
    @close-filters="closeFilters"
    @update:type="updateType"
    @update:year="updateYear"
    @update:genre="updateGenre"
    @update:country="updateCountry"
    @reset-filters="resetFilters"
    :show-filters="showFilters"
    :selected-type="selectedType"
    :selected-year="selectedYear"
    :selected-genre="selectedGenre"
    :selected-country="selectedCountry"
    :unique-types="uniqueTypes"
    :unique-years="uniqueYears"
    :unique-genres="uniqueGenres"
    :unique-countries="uniqueCountries"
    :show-reset-button="showResetButton"
  ></modal-component>
</template>
