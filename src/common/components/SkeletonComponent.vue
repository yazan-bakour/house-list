<template>
  <div v-for="index in 5" :key="index" class="skeleton-card"></div>
</template>

<style scoped>
.skeleton-card {
  display: flex;
  width: 100%;
  height: 163px;
  margin-bottom: 20px;
  background-color: var(--color-background-tertiary-soft);
}
@media (min-width: 600px) {
  .skeleton-card {
    height: 212px;
  }
}
</style>