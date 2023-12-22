<template>
  <v-btn
    :color="active ? 'primary' : 'default'"
    @click="() => onClickHandler(item.current.date)"
  >
    {{ isToady(item.current.date) ? 'Today' : item.current.date }}
  </v-btn>
</template>

<script setup>
import { format } from 'date-fns';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  onClickHandler: {
    type: Function,
    required: true,
  },
});

const isToady = (date) => {
  return format(new Date(), 'yyyy-MM-dd') === date;
};
</script>
