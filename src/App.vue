
<script setup>
  import MainLayout from './common/layouts/MainLayout.vue';
</script>

<template>
  <MainLayout />
</template>

<style>
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
  .body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: content-box;
  }
  @media (min-width: 600px) {
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
  }
</style>
