<template>
  <v-btn @click="onClickHandler" density="comfortable" icon="" variant="tonal">
    <v-icon :icon="icons || ''" :class="classes || '' + ' icon'" />
    <v-tooltip
      v-if="title"
      :text="title || ''"
      activator="parent"
      location="bottom"
    />
  </v-btn>
</template>

<script setup>
const props = defineProps({
  onClickHandler: {
    type: Function,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  classes: {
    type: String,
    required: false,
  },
  icons: {
    type: String,
    required: true,
  },
});

console.log(props);
</script>

<style scoped>
.icon {
  font-size: 1.3rem;
}
</style>
