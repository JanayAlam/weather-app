<template>
  <div class="container">
    <v-icon :icon="icon" />
    <div>
      {{
        typeof content === 'string' || typeof content === 'number'
          ? content
          : content[currentLanguage]
      }}
    </div>
    <v-tooltip
      :text="
        typeof title === 'string' || typeof title === 'number'
          ? title
          : title[currentLanguage] || null
      "
      activator="parent"
      :location="location"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  content: {
    type: [Object, String, Number],
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: [Object, String, Number],
    required: true,
  },
  location: {
    type: String,
    required: false,
    default: 'top',
  },
});

const currentLanguage = computed(() => store.getters.getCurrentLanguage);
</script>

<style scoped>
.container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
