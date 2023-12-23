<template>
  <v-btn
    variant="flat"
    style="text-transform: capitalize; opacity: 0.7"
    @keyup.ctrl.q="searchDialog = true"
  >
    <v-icon icon="fas fa-magnifying-glass" />
    <span class="ml-3">{{ contents[currentLanguage].body }}</span>
    <span class="ml-3 tip">Ctrl+q</span>
    <v-tooltip
      :text="contents[currentLanguage].title"
      activator="parent"
      location="start"
    />
    <v-dialog
      v-model="searchDialog"
      activator="parent"
      width="auto"
      :transition="false"
    >
      <v-card min-width="500px" min-height="150px">
        <v-form @submit.prevent="searchHandler">
          <v-text-field
            v-model="location"
            color="primary"
            :disabled="isFetching || isLoading"
            :placeholder="contents[currentLanguage].placeholder"
            ref="searchBar"
          />
          <div
            class="px-2 mb-1 text-center text-weight-bold text-primary"
            v-if="isLoading"
          >
            <v-progress-linear
              indeterminate
              color="primary"
              class="mb-2"
            ></v-progress-linear>
            <p class="mt-2">
              {{
                currentLanguage === 'jp'
                  ? '履歴の読み込み中...'
                  : currentLanguage === 'bd'
                  ? 'ইতিহাস লোড হচ্ছে...'
                  : 'Loading histories...'
              }}
            </p>
          </div>
          <div class="px-2" v-if="isFetching">
            <v-progress-linear
              indeterminate
              color="primary"
              class="mb-2"
            ></v-progress-linear>
            <p class="mt-2 text-center">
              {{
                currentLanguage === 'jp'
                  ? '天気の詳細を検索しています...'
                  : currentLanguage === 'bd'
                  ? 'আবহাওয়ার বিবরণ খোঁজা হচ্ছে...'
                  : 'Searching weather details...'
              }}
            </p>
          </div>
          <template v-else>
            <p
              class="mb-2 text-center text-weight-bold text-primary"
              v-if="histories.length === 0"
            >
              {{
                currentLanguage === 'jp'
                  ? '空の'
                  : currentLanguage === 'bd'
                  ? 'খালি'
                  : 'Empty'
              }}
            </p>
            <v-list :items="histories"> </v-list>
          </template>
        </v-form>
      </v-card>
    </v-dialog>
    <div>
      <v-dialog
        v-model="detailDialog"
        v-if="detailWeather"
        width="auto"
        persistent
      >
        <weather-details
          :is-delete-able="true"
          :close-dialog="closeDetailsDialog"
          :weather="detailWeather"
        />
      </v-dialog>
    </div>
  </v-btn>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import getWeatherInfo from '../../../api/fetch-weather';
import WeatherDetails from '../../shared/weather/WeatherDetails.vue';

const searchDialog = ref(false);
const detailDialog = ref(false);
const detailWeather = ref(null);
const location = ref('');
const isFetching = ref(false);
const isLoading = ref(true);
// const searchBar = ref(null);

const contents = {
  en: {
    body: 'Search...',
    title: 'Search any city',
    placeholder: 'Enter a city name',
  },
  jp: {
    body: '検索...',
    title: '任意の都市を検索',
    placeholder: '都市名を入力',
  },
  bd: {
    body: 'অনুসন্ধান...',
    title: 'শহর অনুসন্ধান করুন',
    placeholder: 'শহরের নাম লিখুন',
  },
};

const store = useStore();
const toast = useToast();

const currentLanguage = computed(() => store.getters.getCurrentLanguage);
const histories = computed(() => store.getters.getSearchHistories);

onMounted(() => {
  store.dispatch('fetchHistories');
  isLoading.value = false;
});

const closeDetailsDialog = () => {
  detailDialog.value = false;
};

const searchHandler = async () => {
  if (location.value === '') {
    toast.error('City name required');
    return;
  }
  try {
    isFetching.value = true;
    detailWeather.value = await getWeatherInfo(location.value);
    store.dispatch('addNewHistory', location.value);
    searchDialog.value = false;
    detailDialog.value = true;
  } catch (e) {
    if (e.data) {
      toast.error(e.data.error.message);
    } else {
      toast.error(e.message);
    }
  } finally {
    location.value = '';
    isFetching.value = false;
  }
};
</script>

<style scoped>
.tip {
  border: 1px solid #ebebeb;
  padding: 2px;
  opacity: 0.5;
  border-radius: 5px;
}
</style>
