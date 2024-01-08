<template>
  <div class="search-container">
    <div class="functions">
      <div class="input-container">
        <img
          class="search-icon"
          alt="Search icon"
          src="@/assets/ic_search@3x.png"
        />
        <input
          v-model="searchQuery"
          @input="search"
          type="text"
          placeholder="Search for a house"
        />
      </div>
      <div class="sorting">
        <button class="price">Price</button>
        <button class="size">Size</button>
      </div>
    </div>

    <div class="items-results">
      <div v-for="house in housesData" :key="house.id" class="result-card">
        <img class="image" alt="Result img" :src="house.image" >
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
      </div>

      <!-- <div v-if="searchResults.length > 0">
        <ul>
          <li v-for="result in searchResults" :key="result.id">
            {{ result.name }}
          </li>
        </ul>
      </div>
      <div v-else>No results found. Please try another keyword.</div> -->
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, onMounted  } from "vue";

const store = useStore();
const housesData = ref([]);

onMounted(async () => {
  await store.dispatch('fetchHousesData');
  housesData.value = store.getters.getHousesData;
});

const convertNumberWithComma = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const searchQuery = ref("");
// const searchResults = ref([]);

// const search = () => {
//   const data = [
//     { id: 1, name: "Item 1" },
//     { id: 2, name: "Item 2" },
//     { id: 3, name: "Item 3" },
//   ];

//   searchResults.value = data.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
//   );
// };
</script>

<style>
.result-card {
  margin: 20px 0;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  box-shadow: rgba(14, 30, 37, 0.12) -1px 2px 4px 0px, rgba(14, 30, 37, 0.12) 4px -3px 16px 0px;
}
.result-card .image {
  border-radius: 5px;
  height: 140px;
  width: 180px;
  margin-right: 20px;
}
.result-card .info {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.rooms {
  display: flex;
}
.rooms div {
  display: flex;
  align-items: start;
  margin-right: 10px;
}
.rooms img {
  width: 22px;
  height: 22px;
  margin-right: 20px;
}
.rooms p {
  margin-bottom: 0;
}
.info p {
  font-size: 18px;
  margin: 0 0 15px 0;
}
.info .name {
 font-weight: 700;
 color: #000000;
}
.info .price {
  font-weight: 500;
  color: #4A4B4C;
}
.info .address {
  font-weight: 300;
  color: #C3C3C3;
}
.search-container {
  width: 100%;
}
.items-results {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.search-container input {
  width: 100%;
  height: 36px;
  padding-left: 55px;
  border: 0;
  background-color: #e8e8e8;
  border-radius: 5px;
}
.input-container {
  display: flex;
  position: relative;
  margin-bottom: 20px;
}
.search-container .search-icon {
  width: 18px;
  height: 18px;
  margin: 0;
  position: absolute;
  top: 10px;
  left: 20px;
}
.functions {
  width: 100%;
}
.functions, .sorting {
  display: flex;
}
.functions {
  flex-direction: column;
  
}
.functions button {
  border: 0;
  width: 50%;
  color: #fff;
  font-weight: 700;
}
.sorting .price {
  background-color: #eb5440;
}
.size {
  background-color: #C3C3C3;
}
.sorting {
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  height: 40px;
}
@media (min-width: 600px) {
  .sorting {
    width: 260px;
  }
  .search-container input {
    width: 300px;
  }
  .functions {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
