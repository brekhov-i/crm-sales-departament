<template>
  <div :class="['inputText', {'inputText--password': password}, {'inputText--disabled': disabled}]">
    <component v-if="icon && typeof icon !== 'string'" :is="icon" />
    <input 
      v-model="modelValue" 
      :type="!password || isShowPassword ? 'text' : 'password'" 
      :name="id" 
      :id="id" 
      :disabled="disabled"
      class="inputText__input"
    />
    <div class="inputText__eye" @click="showPassword" v-if="password">
      <EyeVisible v-if="isShowPassword" />
      <EyeInVisible v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component, ref } from 'vue';
import EyeVisible from '@/shared/ui/icons/eyeVisible.vue';
import EyeInVisible from '../icons/eyeInVisible.vue';

withDefaults(defineProps<{
  id: string,
  icon?: string | Component
  password?: boolean
  disabled?: boolean
}>(), {
  password: false,
  disabled: false
})

const modelValue = defineModel<string>({required: true})

const isShowPassword = ref(false)
const showPassword = () => isShowPassword.value = !isShowPassword.value
</script>

<style scoped lang="scss">
.inputText {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &--disabled {
    border-color: gray;

    #{&}__eye {
      color: grey;
    }
  }

  &__input {
    width: 100%;
    height: 100%;
    padding-left: 8px;
  }

  &__eye {
    width: 22px;
    margin-right: 8px;
    margin-top: 3px;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
