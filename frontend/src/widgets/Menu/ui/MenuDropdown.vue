<template>
  <div class="dropdown">
    <RouterLink v-for="item in menuItems" :key="item.label" :to="item.link" class="dropdown__item">{{ item.label }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/shared/types/global'

defineProps<{
  menuItems: MenuItem[]
}>()
</script>

<style scoped>

</style>
