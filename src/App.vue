<template>
  <v-app>
    <navbar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { useStore } from 'vuex';
import Navbar from './components/ui/header/Navbar.vue';
import { getTheme } from './utils/theme-local-storage';

const theme = useTheme();
const store = useStore();

store.dispatch('fetchLanguage');

onMounted(() => {
  // setting theme from local storage
  const localTheme = getTheme();
  localTheme == 'dark'
    ? (theme.global.name.value = 'dark')
    : (theme.global.name.value = 'light');
});
</script>

<style scoped>
.position-sticky {
  position: sticky;
}
</style>
