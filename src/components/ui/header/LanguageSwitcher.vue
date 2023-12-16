<template>
  <v-btn>
    <div v-if="currentLang" class="language-switcher-container">
      <flag :iso="languages[currentLang].icon" :squared="true" />
      <span class="ml-2">{{ languages[currentLang].short }}</span>
    </div>
    <v-menu activator="parent">
      <v-list>
        <v-list-item
          v-for="key in Object.keys(languages)"
          :key="languages[key].id"
          :value="languages[key].value"
          @click="changeLang(key)"
        >
          <v-list-item-title>
            <flag :iso="languages[key].icon" :squared="true" />
            <span class="ml-2">{{ languages[key].content }}</span>
          </v-list-item-title>
          <v-tooltip
            :text="`Change language to ${languages[key].content}`"
            activator="parent"
            location="start"
          />
        </v-list-item>
      </v-list>
    </v-menu>
    <v-tooltip text="Change language" activator="parent" location="start" />
  </v-btn>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { setLanguage } from '../../../utils/lang-local-storage';

const store = useStore();

const languages = computed(() => store.getters.getAllLanguages);
const currentLang = computed(() => store.getters.getCurrentLanguage);

/**
 * Save the object in the current language state and local storage.
 * @param {Object} languageObj the language object that will be saved
 */
const changeLang = (key) => {
  store.dispatch('changeLanguage', key);
  // setting the language in the local storage
  setLanguage(key || 'en');
};
</script>

<style scoped>
.language-switcher-container {
  min-width: 70px;
}
</style>
