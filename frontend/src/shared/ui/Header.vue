<template>
   <header class="header">
    <Button class="header__btnBack" :icon="AngleLeft" size="large" @click="router.back()" />
    <h2 class="header__title">{{ route.meta.title }}</h2>
    <Brandcrumbs class="header__brandcrumbs"/>
    
   </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Button from './Button.vue';
import AngleLeft from './icons/angleLeft.vue';
import Brandcrumbs from './Brandcrumbs.vue';

const router = useRouter()
const route = useRoute()
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
