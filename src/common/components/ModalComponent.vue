<template>
  <div class="modal-backstage"></div>
  <Teleport to="body">
    <div class="modal">
      <slot />
    </div>
  </Teleport>
</template>

<style>
.modal-backstage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 997;
}
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 100%;
  margin-left: -180px;
  border: 0;
  background: #fff;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}
.modal .modal-wrapper {
  width: 100%;
  max-width: 300px;
}
.modal .texts {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
}
.modal h1 {
  margin: 0  0 25px 0;
  font-weight: bold;
}
.modal .texts p {
  line-height: 26px;
}
.modal .buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.modal .buttons button {
  width: 100%;
  border: 0;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  color: #fff;
}
.modal .buttons .delete {
  background-color: #EB5440;
  margin-bottom: 20px;
}
.modal .buttons .cancle {
  background-color: #4A4B4C;
}
@media (min-width: 600px) {
  .modal {
    margin-left: -250px;
    max-width: 550px;
  }
  .modal-wrapper {
    max-width: 400px;
  }
}
</style>