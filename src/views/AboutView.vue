<template>
  <div class="about">
    <h1 class="heading">About</h1>

    <div class="passage">
      <h2>About DTT Real Estate</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>

    <div class="sign">
      <h2>Design and Development</h2>
      <div class="content">
        <img src="@/assets/img_logo_dtt@3x.png" alt="DTT">
        <div>
          <p>By DTT</p>
          <a href="https://www.d-tt.nl/" target="_blank">www.d-tt.nl</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .about .heading {
    margin-bottom: 30px;
    font-weight: 700;
  }
  .passage, .sign {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 30px;
  }
  .about h2 {
    line-height: 26px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .about p {
    text-align: left;
    line-height: 22px;
  }
  .sign .content {
    display: flex;
    align-items: center;
  }
  .sign img {
    height: 36px;
    margin-right: 20px;
  }
  .sign p {
    line-height: 18px;
  }
  @media (min-width: 600px) {
    .sign img {
      height: 44px;
    }
  }
</style>
