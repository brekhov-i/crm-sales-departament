<template>
  <div :class="['menuItem', { 'menuItem--active': active }]">
    <div class="menuItem__icon">
      <component v-if="icon && typeof icon !== 'string'" :is="icon" />
      <span v-else-if="icon" :class="[icon]"></span>
    </div>
    <div class="menuItem__label">{{ label }}</div>
    <div class="menuItem__right">
      <div class="menuItem__badge" v-if="badge">{{ badge }}</div>
      <div class="menuItem__arrow" v-if="menuItems && menuItems.length > 0">
        <AngleBottom />
      </div>
    </div>
    <div class="menuItem__dropdown"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import AngleBottom from '@/shared/ui/icons/angleBottom.vue';
const props = withDefaults(defineProps<{
  icon?: string | Component,
  label: string,
  link?: string | RouteLocationRaw
  active?: boolean
  menuItems?: any[]
  badge?: number
  command?: () => void
}>(), {
  active: false
})

const getComponent = computed(() => {
  if (props.link) return 'router-link'
  else 'div'
})
</script>

<style scoped lang="scss">
.menuItem {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 10px 6px 20px;
  gap: 20px;
  border-radius: 10px;

  &:hover {
    background-color: rgba(#722ED1, 0.1);
    cursor: pointer;
  }

  &--active {
    background-color: rgba(#722ED1, 0.1);

    .menuItem__label {
      color: var(--theme-main-color)
    }

    .menuItem__icon {
      color: var(--theme-main-color)
    }
  }

  &__icon {
    width: 16px;
    height: 16px;
    color: var(--theme-secondary-color);

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__label {
    font-size: 16px;
    font-weight: 400;
    color: var(--theme-secondary-color);
  }

  &__right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
  }

  &__badge {
    background-color: rgba(#722ED1, 0.2);
    color: var(--theme-main-color);
    font-weight: bold;
    font-size: 14px;
    width: auto;
    height: auto;
    border-radius: 100%;
    padding: 4px 7px 4px 6px;
    margin-left: auto;
  }

  &__arrow {
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
