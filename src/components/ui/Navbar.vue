<script setup>
import { useTheme } from 'vuetify';

const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  localStorage.setItem('theme', JSON.stringify(theme.global.name.value));
}

</script>

<template>
  <v-app-bar :elevation="0" :class="!theme.global.current.value.dark && 'app-bar-light'">
      <v-container>
        App
        <v-btn @click="toggleTheme">
          <font-awesome-icon :icon="['fas', 'moon']" />
        </v-btn>
      </v-container>
    </v-app-bar>
</template>

<style scoped>
.app-bar-light {
  background-color: #f8f8f8;
  border-bottom: 1px solid #f0f0f0;
}
</style>
