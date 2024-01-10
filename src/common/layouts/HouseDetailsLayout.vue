<template>
  <div class="layout">
    <HeaderComponent />
    <div class="house-details-main">
      <div class="house-details-body-wrapper">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup>
  import HeaderComponent from '@/common/components/HeaderComponent.vue';
</script>
