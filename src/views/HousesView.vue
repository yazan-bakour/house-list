<script setup>
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import SearchComponent from "@/common/components/SearchComponent.vue";
  
  const store = useStore()
  const router = useRouter();

  const createNewLisiting = () => {
    store.commit('clearHouseId');
    router.push({ name: 'NewLisiting'});
  }
</script>

<template>
  <div class="heading-container">
    <h2 class="heading">Houses</h2>
    <button class="mobile-button-container" @click="createNewLisiting">
      <img
        class="icon-mobile"
        alt="Add house mobile"
        src="@/assets/ic_plus_grey@3x.png"
      />
    </button>
    <button class="desktop-button-container" @click="createNewLisiting">
      <img
        class="icon-desktop"
        alt="Add house"
        src="@/assets/ic_plus_white@3x.png"
      />
      <p>CREATE NEW</p>
    </button>
  </div>
  <div class="functions">
    <SearchComponent />
  </div>
</template>

<style>
.houses {
  padding-top: 10px;
}
.heading-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.mobile-button-container {
  display: block;
  border: 0;
  background-color: #fff;
}
.mobile-button-container .icon-mobile {
  width: 24px;
  height: 24px;
}
.desktop-button-container {
  display: none;
}

@media (min-width: 600px) {
  .houses {
    padding-top: 50px;
  }
  .mobile-button-container {
    display: none;
  }
  .search-container input {
    width: 300px;
  }
  .desktop-button-container {
    width: 180px;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #eb5440;
    border: 0;
    border-radius: 5px;
    color: #fff;
    padding: 8px 15px;
  }
  .desktop-button-container p {
    width: 130px;
  }
  .desktop-button-container .icon-desktop {
    width: 18px;
    height: 18px;
    display: block;
    margin-right: 12px;
  }
}
</style>
