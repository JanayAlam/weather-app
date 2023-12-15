<template>
  <v-app>
    <navbar />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import Navbar from './components/ui/header/Navbar.vue';
import { useTheme } from 'vuetify';
import { getTheme } from './utils/theme-local-storage';

const theme = useTheme();

onMounted(() => {
  // setting theme from local storage
  const localTheme = getTheme();
  localTheme == 'dark'
    ? (theme.global.name.value = 'dark')
    : (theme.global.name.value = 'light');
});
</script>

<style scoped></style>
