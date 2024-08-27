<template>
  <div class="cabinetLayout">
    <Sidebar class="cabinetLayout__sidebar" />
    <Header class="cabinetLayout__header" />
    <div class="cabinetLayout__main">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';


</script>

<style scoped>

</style>
