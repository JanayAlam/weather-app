<script setup>
import { onMounted } from 'vue';
import Navbar from './components/ui/Navbar.vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

onMounted(() => {
  // setting theme from local storage
  const localTheme = localStorage.getItem('theme') || 'light';
  localTheme == 'dark'
    ? theme.global.name.value = 'dark'
    : theme.global.name.value = 'light';

});
</script>

<template>
  <v-app>
    <navbar />
  </v-app>
</template>

<style scoped>
</style>
