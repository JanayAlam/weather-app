<template>
  <v-btn variant="flat" style="text-transform: capitalize; opacity: 0.7">
    <v-icon icon="fas fa-magnifying-glass" />
    <span class="ml-3">{{ contents[currentLanguage].body }}</span>
    <span class="ml-3 tip">Ctrl+K</span>
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
            :disabled="isFetching"
            :placeholder="contents[currentLanguage].placeholder"
          />
          <div class="px-2" v-if="isFetching">
            <v-progress-linear
              indeterminate
              color="primary"
            ></v-progress-linear>
            <p class="mt-2 text-center">Fetching weather...</p>
          </div>
          <template v-else>
            <v-list :items="histories"></v-list>
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
import {
cacheHistory,
getCacheHistories,
} from '../../../utils/search-history-local-storage';
import WeatherDetails from '../../shared/weather/WeatherDetails.vue';

const searchDialog = ref(false);
const detailDialog = ref(false);
const detailWeather = ref(null);
const location = ref('');
const isFetching = ref(false);

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
const histories = ref([]);

const currentLanguage = computed(() => store.getters.getCurrentLanguage);

onMounted(() => {
  histories.value = getCacheHistories();
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
    cacheHistory(location.value);
    searchDialog.value = false;
    detailDialog.value = true;
  } catch (e) {
    console.log(e);
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
