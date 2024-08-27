<template>
  <div class="field">
    <label :for="id" class="field__label" v-if="label">{{ label }}</label>
    <slot />
    <small v-if="invalid && error" class="field__error">{{ error.$message }}</small>
  </div>
</template>

<script setup lang="ts">
import { ErrorObject } from '@vuelidate/core';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  label?: string,
  gap?: number,
  error?: ErrorObject,
  invalid?: boolean
  id: string
}>(), {
  gap: 10,
  invalid: false
})

const gap = computed(() => props.gap + 'px')
</script>

<style scoped lang="scss">
.field {
  --gap: v-bind(gap);

  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: var(--gap);

  &__label {
    font-size: 18px;
    font-weight: 300;
    margin-left: 10px;
  }

  &__error {
    font-size: 12px;
    font-weight: 500;
    color: var(--theme-error-color);
    margin-left: 10px;
  }
}
</style>
