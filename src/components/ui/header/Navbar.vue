<template>
  <v-app-bar
    :elevation="0"
    :class="!theme.global.current.value.dark && 'app-bar-light'"
  >
    <v-container>
      <v-row no-gutters align="center">
        <v-col cols="12" md="4" align="start"> Weather App </v-col>
        <v-col cols="12" md="8" align="end">
          <div class="icon-buttons">
            <search-bar />
            <!-- DROPDOWN BUTTON FOR CHANGING THE LANGUAGE -->
            <language-switcher />
            <!-- ICON BUTTON FOR TOGGLE THE THEME -->
            <icon-button
              :on-click-handler="toggleTheme"
              :class="`icon-${
                theme.global.current.value.dark ? 'sun' : 'moon'
              }`"
              :icons="`fas fa-${
                theme.global.current.value.dark ? 'sun' : 'moon'
              }`"
              :title="`Activate ${
                theme.global.current.value.dark ? 'light' : 'dark'
              } mode`"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify';
import { setTheme } from '../../../utils/theme-local-storage';
import IconButton from '../../shared/buttons/IconButton.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';
import SearchBar from './SearchBar.vue';

const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  // setting the theme in the local storage
  setTheme(theme.global.name.value);
};
</script>

<style scoped>
.app-bar-light {
  background-color: #f8f8f8;
  border-bottom: 1px solid #f0f0f0;
}

.icon-buttons {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
}

.icon-moon {
  color: #193154;
}

.icon-sun {
  color: #ffd43b;
}
</style>
