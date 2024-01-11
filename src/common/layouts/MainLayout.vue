<script setup>
  import HeaderComponent from '@/common/components/HeaderComponent.vue';
  import { computed, getCurrentInstance } from 'vue';
  const instance = getCurrentInstance();

  const isNewLisiting = computed(() => {
    return instance.proxy.$route?.name === 'NewLisiting';
  });
</script>
<template>
  <div class="layout">
    <HeaderComponent />
    <div v-bind:class="isNewLisiting ? 'main background' : 'main'">
      <div class="body-wrapper">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<style>
  .background {
    background-image: url("@/assets/img_background@3x.png");
    background-size: cover;
  }
</style>
