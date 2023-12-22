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

    <v-dialog v-model="searchDialog" activator="parent" width="auto">
      <v-card min-width="500px" min-height="150px">
        <v-form @submit.prevent="searchHandler">
          <v-text-field
            v-model="location"
            color="primary"
            focused
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
        </v-form>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const searchDialog = ref(false);
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
const currentLanguage = computed(() => store.getters.getCurrentLanguage);

const searchHandler = () => {
  isFetching.value = true;

  location.value = '';
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
