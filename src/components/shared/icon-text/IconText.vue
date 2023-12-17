<template>
  <div class="container">
    <v-icon :icon="icon" />
    <div>{{ content }}</div>
    <v-tooltip :text="title || ''" activator="parent" location="start" />
  </div>
</template>

<script setup>
defineProps({
  content: String,
  icon: String,
  title: String,
});
</script>

<style scoped>
.container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
