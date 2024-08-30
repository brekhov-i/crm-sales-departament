<template>
  <component :is="getComponent" :class="['button', className]">
    <template v-if="!$slots.default">
      <div class="button__icon" v-if="icon">
        <component v-if="icon && typeof icon !== 'string'" :is="icon" />
        <span v-else :class="[icon]"></span>
      </div>
      <div class="button__label" v-if="label">{{ label }}</div>
    </template>
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
import { type Component, computed } from 'vue';
import type { PositionX, Severity, Size } from '@/shared/types/global';

const props = withDefaults(defineProps<{
  label?: string
  link?: boolean
  icon?: string | Component
  iconPosition?: PositionX
  severity?: Severity
  size?: Size
  disabled?: boolean
}>(), {
  link: false,
  severity: 'success',
  iconPosition: 'left',
  size: 'normal',
  disabled: false
})

const getComponent = computed(() => {
  if (props.link) return 'router-link'
  return 'button'
})

const className = computed(() => {
  const classes = [];

  if (props.link) classes.push('button--link')

  if (!props.label && props.icon) classes.push('button--only-icon')
  if (props.icon) classes.push(`button--icon-${props.iconPosition}`);

  if (props.disabled) classes.push(`button--disabled`)

  classes.push(`button--${props.size}`);

  classes.push(`button--${props.severity}`);

  return classes.length === 0 ? '' : classes.join(' ')
})

const size = computed(() => {
  switch (props.size) {
    case 'xLarge':
      return '80px'
    case 'large':
      return '60px'
    case 'normal':
      return '40px'
    case 'small':
      return '20px'
    default:
      return '40px'
  }
})
</script>

<style scoped lang="scss">
.button {
  --size: v-bind(size);

  min-width: 200px;
  width: auto;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;

  &--only-icon {
    min-width: 0;
    width: var(--size);
    height: var(--size);
    border-radius: 100%;
    box-shadow: 0 4px 4px rgba(#000000, 0.3);
  }

  &--success {
    background-color: var(--theme-main-color);
    color: #ffffff;
  }

  &__icon {
    width: var(--size);
    height: var(--size);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
