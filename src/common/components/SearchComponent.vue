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
        <button class="price" :style="{ backgroundColor: priceButtonColor }" @click="sortByPrice">Price</button>
        <button class="size" :style="{ backgroundColor: sizeButtonColor }" @click="sortBySize">Size</button>
      </div>
    </div>

    <div v-if="filteredAndSortedHouses.length > 0" class="items-results">
      <div v-for="house in filteredAndSortedHouses" :key="house.id" class="result-card" @click="navigateToHouseDetails(house.id)">
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
    </div>
    <div v-else>No results found. Please try another keyword.</div>

  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, onMounted, computed } from "vue";
import { useRouter } from 'vue-router';
import './SearchCss.css'

const router = useRouter();
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

const filteredAndSortedHouses = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) {
    return housesData.value;
  }

  const filteredHouses = housesData.value.filter((house) => {
    const searchString = `${house.location.street} ${house.location.houseNumber} ${house.price} ${house.location.zip} ${house.location.city}`.toLowerCase();
    return searchString.includes(query);
  });

  return filteredHouses.sort((a, b) => {
    return a.price - b.price;
  });
});
// TODO OPTIMIZE THE SORTING LOGIC
const sortingOptions = {
  PRICE: 'price',
  SIZE: 'size',
};

const currentSortingOption = ref(sortingOptions.PRICE);

const priceButtonColor = computed(() => {
  return currentSortingOption.value === sortingOptions.PRICE ? '#eb5440' : '#C3C3C3';
});

const sizeButtonColor = computed(() => {
  return currentSortingOption.value === sortingOptions.SIZE ? '#eb5440' : '#C3C3C3';
});

const sortByPrice = () => {
  filteredAndSortedHouses.value.sort((a, b) => a.price - b.price);
  currentSortingOption.value = sortingOptions.PRICE;
};

const sortBySize = () => {
  filteredAndSortedHouses.value.sort((a, b) => a.size - b.size);
  currentSortingOption.value = sortingOptions.SIZE;
};

const navigateToHouseDetails = (houseId) => {
  store.dispatch('setSelectedHouseId', houseId);
  router.push({ name: 'HouseDetails'});
};

</script>
