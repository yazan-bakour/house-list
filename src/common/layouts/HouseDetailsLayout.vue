<script setup>
  import HeaderComponent from '@/common/components/HeaderComponent.vue';
</script>
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
<style>
  .house-details-main {
    padding: 0;
  }
  .house-details-body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    box-sizing: content-box;
    padding-bottom: 150px;
  }
  @media (min-width: 600px) {
    .house-details-main {
      padding: 50px 0;
    }
  }
  @media (min-width: 1024px) {
    .house-details-body-wrapper {
      padding: 0 20px;
      max-width: 1000px;
    }
  }
</style>
