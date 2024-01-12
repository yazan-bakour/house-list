
<script setup>
  import HouseDetailsLayout from './common/layouts/HouseDetailsLayout.vue';
  import MainLayout from './common/layouts/MainLayout.vue';
  import Toast from "./common/components/ToastComponent.vue";
  import { ref, computed, getCurrentInstance, watch } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const apiStatus = ref(null)
  const instance = getCurrentInstance();

  const isHouseDetailsRoute = computed(() => {
    return instance.proxy.$route?.name === 'HouseDetails';
  });
  watch(() => {
    apiStatus.value = store.getters.getHouseStatus;
  });
  

  const handleToast = (index) => {
    store.dispatch('clearHouseStatus', index);
  }
</script>

<template>
  <Toast :toasts="apiStatus" :clearToast="handleToast" />
  <MainLayout v-if="!isHouseDetailsRoute" />
  <HouseDetailsLayout v-if="isHouseDetailsRoute" />
</template>

<style>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.toast {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  opacity: 0.9;
}

.error {
  background-color: var(--color-background-primary);
}
.success {
  background-color: var(--color-background-message)
}
</style>
