
<script setup>
  import HouseDetailsLayout from './common/layouts/HouseDetailsLayout.vue';
  import MainLayout from './common/layouts/MainLayout.vue';
  import { computed, getCurrentInstance } from 'vue';

  const instance = getCurrentInstance();

  const isHouseDetailsRoute = computed(() => {
    return instance.proxy.$route?.name === 'HouseDetails';
  });

</script>

<template>
  <MainLayout v-if="!isHouseDetailsRoute" />
  <HouseDetailsLayout v-if="isHouseDetailsRoute" />
</template>
