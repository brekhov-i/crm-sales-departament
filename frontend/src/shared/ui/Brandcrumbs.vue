<template>
  <div class="brandcrumbs">
    <router-link to="/" class="brandcrumbs__link">
      <Home />
    </router-link>
    <span class="brandcrumbs__seporator">/</span>
    <div class="brandcrumbs__currentPage">403</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Home from '@/shared/ui/icons/home.vue';

const route = useRoute()

onMounted(() => {
  console.log(route.matched)
})
</script>

<style scoped lang="scss">
.brandcrumbs {
  --font-size: 16px;
  width: auto;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size);
  line-height: var(--font-size);

  svg {
    width: var(--font-size);
    height: var(--font-size);
  }

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--theme-secondary-color);

    &:hover {
      color: var(--theme-black);
    }
  }

  &__seporator {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--theme-disabled-text);
  }

  &__currentPage {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--theme-disabled-text);
  }
}
</style>
