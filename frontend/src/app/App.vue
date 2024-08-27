<template>
  <component :is="layout" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AuthLayout from '@/shared/ui/AuthLayout.vue';
import CabinetLayout from '@/shared/ui/CabinetLayout.vue';


const route = useRoute()

const layout = computed(() => {
  switch(route.meta.layout) {
    case 'auth':
      return AuthLayout
    default:
      return CabinetLayout
  }
})

</script>

<style scoped>

</style>
