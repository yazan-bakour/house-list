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
  .main {
    padding-top: 10px;
  }
  .body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 20px 20px 150px;
    box-sizing: content-box;
  }
  @media (min-width: 600px) {
    .main {
      padding-top: 50px;
    }
    .body-wrapper {
      max-width: 780px;
      align-items: start;
      padding: 0 20px 150px;
    }
  }
  @media (min-width: 1024px) {
    .body-wrapper {
      max-width: 1000px;
    }
  }
</style>
