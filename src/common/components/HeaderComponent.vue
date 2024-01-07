<template>
  <div class="header">
    <div class="wrapper">
      <img alt="DTT logo" src="@/assets/img_logo_dtt@3x.png" />
      <nav>
        <router-link to="/">Houses</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </div>
  </div>
  <RouterView />
</template>

<style lang="scss">
.header {
  height: 78px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
  }
  img {
    width: 100px;
    height: 38px;
    margin-right: 50px;
  }
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #4a4b4c;
    margin-right: 50px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #000000;
    }
  }
}
</style>
