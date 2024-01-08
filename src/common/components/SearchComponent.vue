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
      <ListingComponent :data="filteredAndSortedHouses" :navigate="navigateToHouseDetails" />
    </div>
    <div v-else>No results found. Please try another keyword.</div>

  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, onMounted, computed } from "vue";
import { useRouter } from 'vue-router';
import ListingComponent from './ListingComponent.vue'
import './SearchCss.css'

const router = useRouter();
const store = useStore();
const housesData = ref([]);
const selectedHouseDetails = ref(null);

onMounted(async () => {
  await store.dispatch('fetchHousesData');
  housesData.value = store.getters.getHousesData;
});

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

const navigateToHouseDetails = async (houseId) => {
  await store.dispatch('setSelectedHouseId', houseId);
  selectedHouseDetails.value = store.getters.getSelectedHouseDetails;

  router.push({ name: 'HouseDetails'});
};

</script>
