<template>
  <v-btn
    @click="onClickHandler"
    :class="btnClasses"
    density="comfortable"
    icon=""
    :variant="variant"
    id="icon-button-btn"
  >
    <v-icon
      :icon="icons || ''"
      :class="classes + ' icon'"
      id="icon-button-icon"
    />
    <v-tooltip
      id="icon-button-tooltip"
      v-if="title"
      :text="title || ''"
      activator="parent"
      :location="tooltipLocation"
    />
  </v-btn>
</template>

<script setup>
const props = defineProps({
  onClickHandler: {
    type: Function,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  classes: {
    type: String,
    default: '',
  },
  btnClasses: {
    type: String,
    default: '',
  },
  icons: {
    type: String,
    required: true,
  },
  tooltipLocation: {
    type: String,
    default: 'bottom',
  },
  variant: {
    type: String,
    default: 'tonal',
  },
});
</script>

<style scoped>
.icon {
  font-size: 1.3rem;
}
</style>
