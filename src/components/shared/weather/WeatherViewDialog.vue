<template>
  <div>
    <slot />
    <v-dialog
      activator="parent"
      width="auto"
      v-model="dialog"
      transition="dialog-center-transition"
    >
      <v-card>
        <v-card-actions>
          <v-flex>
            <v-btn color="primary" block @click="dialog = false"
              >Close Dialog</v-btn
            >
          </v-flex>
        </v-card-actions>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dialog = ref(false);

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
});
</script>
