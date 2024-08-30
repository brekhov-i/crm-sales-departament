<template>
  <div class="menu">
    <MenuItem class="menu__item" label='Главная' :icon="Home"/>
    <MenuItem class="menu__item" label='Звонки' :icon="Home"/>
  </div>
</template>

<script setup lang="ts">
import Home from '@/shared/ui/icons/home.vue';
import MenuItem from './MenuItem.vue';
</script>

<style scoped lang="scss">
.menu {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}
</style>
