<template>
  <div>
    <slot
      :on-click-handler="openDialog"
      id="remove-button-dialog-trigger-btn"
    ></slot>
    <v-dialog
      v-model="dialog"
      activator="parent"
      max-width="500px"
      :transition="false"
      id="remove-button-dialog-container"
    >
      <v-card>
        <v-card-text>
          <div
            class="text-weight-bold"
            id="remove-button-dialog-text-container"
          >
            {{ text }}
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="px-4">
            <v-btn
              color="primary"
              variant="flat"
              @click="dialog = false"
              class="px-3"
            >
              {{
                currentLanguage === 'jp'
                  ? `いいえ`
                  : currentLanguage === 'bd'
                  ? `না`
                  : `No`
              }}
            </v-btn>
            <v-btn
              color="error"
              variant="flat"
              @click="onRemoveHandler"
              class="px-3"
            >
              {{
                currentLanguage === 'jp'
                  ? `はい、取り除く`
                  : currentLanguage === 'bd'
                  ? `হ্যা, অপসারন করুন`
                  : `Yes, remove it`
              }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const dialog = ref(false);

const store = useStore();

const openDialog = () => {
  dialog.value = true;
};

const props = defineProps({
  text: {
    type: String,
    default: 'Are you sure?',
  },
  onRemoveHandler: {
    type: Function,
    required: true,
  },
});

const currentLanguage = computed(() => store.getters.getCurrentLanguage);
</script>
