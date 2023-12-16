<template>
  <v-btn @click="onClickHandler" density="comfortable" icon="" variant="tonal">
    <v-icon :icon="icons || ''" :class="classes || ''" />
    <v-tooltip :text="title || ''" activator="parent" location="bottom" />
  </v-btn>
</template>

<script setup>
const props = defineProps({
  onClickHandler: Function,
  title: String,
  classes: String,
  icons: String,
});
</script>
