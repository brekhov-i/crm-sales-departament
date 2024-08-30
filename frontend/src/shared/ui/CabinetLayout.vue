<template>
  <div class="cabinetLayout">
    <Sidebar class="cabinetLayout__sidebar" />
    <!-- <Header class="cabinetLayout__header" /> -->
    <div class="cabinetLayout__main">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sidebar } from '@/widgets/Sidebar';


</script>

<style scoped lang="scss">
.cabinetLayout {
  width: 100dvw;
  height: 100dvh;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 30px;
}
</style>
