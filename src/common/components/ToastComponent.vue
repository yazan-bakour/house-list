<script setup>
  import { defineProps } from 'vue';

  const props = defineProps(['toasts', 'clearToast']);

</script>

<template>
  <div class="toast-container">
    <div v-for="(toast, index) in props.toasts" :key="index" class="toast" :class="toast.error ? 'error' : 'success'">
      <img @click="props.clearToast(index)" src="@/assets/ic_clear_white@3x.png" alt="clear">
      <div>
        <p>{{ toast?.error?.code || toast?.success }}</p>
        <p v-if="toast?.error">{{ toast?.error?.message }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
.toast-container img {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}

.toast {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  opacity: 0.9;
  display: flex;
}

.toast p {
  font-size: 14px;
}

.error {
  background-color: var(--color-background-primary);
}
.success {
  background-color: var(--color-background-message)
}
</style>