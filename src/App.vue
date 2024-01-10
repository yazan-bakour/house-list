
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

<style>
  body {
    margin: 0;
  }
  p {
     margin: 0;
  }
  h1 {
    font-size: 20px;
  }
  button {
    cursor: pointer;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* width: 100%; */
    height: 100%;
    box-sizing: content-box;
  }
  .heading {
    width: 100%;
    text-align: center;
  }
  .main {
    padding-top: 10px;
  }
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
  .body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: content-box;
    padding-bottom: 150px;
  }
  @media (min-width: 600px) {
    .house-details-main {
      padding: 20px 0;
    }
    .main {
      padding-top: 50px;
    }
    .body-wrapper {
      max-width: 780px;
      align-items: start;
    }
    .heading {
      text-align: left;
    }
  }
  @media (min-width: 1024px) {
    .body-wrapper {
      max-width: 1000px;
    }
    .house-details-body-wrapper {
      padding: 0 20px;
      max-width: 1000px;
    }
  }
</style>
