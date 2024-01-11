<script setup>
  import { ref, onMounted, getCurrentInstance } from 'vue';
  import { useRoute } from 'vue-router'

  const router = useRoute()
  const instance = getCurrentInstance();

  const activeHouseRef = ref('')

  onMounted(() => {
    const currentRoute = instance.proxy.$route?.name;
    activeHouseRef.value = currentRoute === 'about' ? 'about' : '/';
  });

  const toggleNav = (route) => {
    activeHouseRef.value = activeHouseRef.value === route ? '' : route;
  };
  const isActive = (paths) => {
    if (router.path === '/about') {
      return false;
    }
    return  paths.some(path => router.path.startsWith(path))
  }
</script>

<template>
  <div class="header">
    <div class="wrapper">
      <img alt="DTT logo" src="@/assets/img_logo_dtt@3x.png" />
      <nav>
        <router-link :to="{ path: '/' }" :class="{ active: isActive(['/', '/details', '/new-listing']) }">Houses</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </div>
  </div>
  <!-- Mobile/ teblet view -->
  <div class="header-mobile">  
    <div class="wrapper">
      <nav>
        <router-link to="/" @click="toggleNav('/')">
          <img class="icon" alt="DTT logo" :src="require(`@/assets/${activeHouseRef === '/' ? 'ic_mobile_navigarion_home_active' : 'ic_mobile_navigarion_home'}@3x.png`)" />
        </router-link>
        <router-link to="/about" @click="toggleNav('about')">
          <img class="icon" alt="DTT logo" :src="require(`@/assets/${activeHouseRef === 'about' ? 'ic_mobile_navigarion_info_active' : 'ic_mobile_navigarion_info'}@3x.png`)" />
        </router-link>
      </nav>
    </div>
  </div>
</template>

<style>
.header nav .active {
  color: var(--color-text-primary);
}
.icon {
  width: 29px;
  height: 29px;
}
.header-mobile .wrapper nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-mobile .wrapper {
  z-index: 99;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: var(--color-background);
  box-shadow: rgba(149, 157, 165, 0.2) 0px -6px 7px;
}
.header-mobile nav {
  padding: 20px 60px;
}

/* Desktop */
.header {
  height: 78px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: none;
}
.header img {
  height: 40px;
  margin-right: 30px;
}
.header .wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: content-box;
  max-width: 780px;
  padding: 0 20px;
  margin: 0 auto;
}
.header nav {
  padding: 30px;
}
.header nav a {
  font-weight: bold;
  color: var(--color-background-tertiary);
  margin-right: 50px;
  text-decoration: none;
}
.header nav .router-link-exact-active {
  color: var(--color-text-primary);
}
@media (min-width: 600px) {
  .header-mobile {
    display: none;
  }
  .header {
    display: block;
  }
  .header .wrapper {
    max-width: 1000px;
  }
}
@media (min-width: 1024px) {
  .header .wrapper {
    max-width: 1000px;
  }
}

</style>
