<template>
  <v-btn variant="flat" style="text-transform: capitalize; opacity: 0.7">
    <v-icon icon="fas fa-magnifying-glass" />
    <span class="ml-3">{{ contents[lang].body }}</span>
    <span class="ml-3 tip">Ctrl+K</span>
    <v-tooltip
      :text="contents[lang].title"
      activator="parent"
      location="start"
    />
  </v-btn>
</template>

<script setup>
import { getLanguage } from '../../../utils/lang-local-storage';

const contents = {
  en: {
    body: 'Search',
    title: 'Search any city',
  },
  jp: {
    body: '検索',
    title: '任意の都市を検索',
  },
  bd: {
    body: 'অনুসন্ধান',
    title: 'শহর অনুসন্ধান করুন',
  },
};

const lang = getLanguage();
</script>

<style scoped>
.tip {
  border: 1px solid #ebebeb;
  padding: 2px;
  opacity: 0.5;
  border-radius: 5px;
}
</style>
