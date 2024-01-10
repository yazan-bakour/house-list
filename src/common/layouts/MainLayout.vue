<template>
  <div class="layout">
    <HeaderComponent />
    <div class="main">
      <div class="body-wrapper">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup>
  import HeaderComponent from '@/common/components/HeaderComponent.vue';
</script>
