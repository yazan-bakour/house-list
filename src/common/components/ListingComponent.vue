<script setup>
  import { defineProps } from 'vue';

  const props = defineProps(['data', 'navigate']);

  const convertNumberWithComma = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };
</script>

<template>
  <div v-for="house in data" :key="house.id" class="result-card" @click="props.navigate(house.id)">
    <div class="image">
      <img alt="Result img" :src="house.image" >
    </div>

    <div class="info">
      <p class="name">{{ house.location.street + ' ' + house.location.houseNumber }}</p>
      <p class="price">€ {{ convertNumberWithComma(house.price) }}</p>
      <p class="address">{{ house.location.zip + ' ' + house.location.city }}</p>
      <div class="rooms">
        <div>
          <img alt="Bed" src="@/assets/ic_bed@3x.png" >
          <p>{{ house.rooms.bedrooms }}</p>
        </div>
        <div>
          <img alt="Bathroom" src="@/assets/ic_bath@3x.png" >
          <p>{{ house.rooms.bathrooms }}</p>
        </div>
        <div>
          <img alt="Size" src="@/assets/ic_size@3x.png" >
          <p>{{ house.size }} m2</p>
        </div>
      </div>
    </div>

    <div class="tools">
      <div>
        <button><img alt="Edit icon" src="@/assets/ic_edit@3x.png" ></button>
        <button><img alt="delete icon" src="@/assets/ic_delete@3x.png" ></button>
      </div>
    </div>
  </div>
</template>