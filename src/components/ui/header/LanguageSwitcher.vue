<template>
  <v-btn>
    <div v-if="currentLang" class="language-switcher-container">
      <flag :iso="currentLang.icon" :squared="true" />
      <span class="ml-2">{{ currentLang.short }}</span>
    </div>
    <v-menu activator="parent">
      <v-list>
        <v-list-item
          v-for="key in Object.keys(languages)"
          :key="languages[key].id"
          :value="languages[key].value"
          @click="changeLang(languages[key])"
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
import { setLanguage, getLanguage } from '../../../utils/lang-local-storage';
import { onMounted } from 'vue';
import { ref } from 'vue';

const languages = {
  en: {
    id: 1,
    value: 'en',
    content: 'English',
    short: 'ENG',
    icon: 'GB',
  },
  jp: {
    id: 2,
    value: 'jp',
    content: '日本語',
    short: '日本語',
    icon: 'JP',
  },
  bd: {
    id: 3,
    value: 'bd',
    content: 'বাংলা',
    short: 'বাংলা',
    icon: 'BD',
  },
};

const currentLang = ref(null);

onMounted(() => {
  const lang = getLanguage();
  changeLang(languages[lang] || languages.en);
});

/**
 * Save the object in the current language state and local storage.
 * @param {Object} languageObj the language object that will be saved
 */
const changeLang = (languageObj) => {
  currentLang.value = languageObj;
  // setting the language in the local storage
  setLanguage(languageObj.value);
};
</script>

<style scoped>
.language-switcher-container {
  min-width: 70px;
}
</style>
