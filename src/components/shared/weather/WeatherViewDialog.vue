<template>
  <div>
    <slot></slot>
    <v-dialog
      activator="parent"
      width="auto"
      v-model="dialog"
      persistent
      transition="dialog-center-transition"
    >
      <weather-details
        :close-dialog="closeDialog"
        :weather="weather"
        :is-delete-able="isDeleteAble"
      />
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WeatherDetails from './WeatherDetails.vue';

const dialog = ref(false);

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
  isDeleteAble: {
    type: Boolean,
    default: true,
  },
});

const closeDialog = () => {
  dialog.value = false;
};
</script>
