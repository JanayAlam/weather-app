<template>
  <v-col>
    <div :class="`tip text-align-${textAlign}`">
      <v-icon :icon="`fas fa-${icon}`" />
      <div>{{ content }}</div>
    </div>
    <v-tooltip activator="parent" location="top">
      {{ title }}
    </v-tooltip>
  </v-col>
</template>

<script setup>
const props = defineProps({
  icon: String,
  content: String,
  title: String,
});
</script>

<style scoped>
.tip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.text-align-start {
  text-align: center;
}

.text-align-end {
  text-align: center;
}
</style>
