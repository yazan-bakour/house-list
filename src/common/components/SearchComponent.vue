<script setup>
  import { useStore } from 'vuex';
  import { ref, onMounted, computed, watchEffect } from "vue";
  import { useRouter } from 'vue-router';
  import ListingComponent from './ListingComponent.vue'

  const router = useRouter();
  const store = useStore();
  const housesData = ref([]);
  const selectedHouseDetails = ref(null);

  const currentPage = ref(1);
  const itemsPerPage = 10;

  onMounted(async () => {
    watchEffect(() => {
      housesData.value = store.getters.getHousesData;
    });
    await store.dispatch('fetchHousesData');
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

  const navigateToHouseDetails = async (houseId, route) => {
    await store.dispatch('setSelectedHouseId', houseId);
    selectedHouseDetails.value = store.getters.getSelectedHouseDetails;
    router.push({ name: route, params: { id: houseId } });
  };

  const paginatedHouses = computed(() => {
    const startIdx = (currentPage.value - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return filteredAndSortedHouses.value.slice(startIdx, endIdx);
  });

  const totalPages = computed(() => Math.ceil(filteredAndSortedHouses.value.length / itemsPerPage));

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };
  const clearSearchQuery = () => {
    searchQuery.value = ''
  }
</script>

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
        <button class="clear-button" v-show="searchQuery" @click="clearSearchQuery"><img src="@/assets/ic_clear@3x.png" alt="clear"></button>
      </div>
      <div class="sorting">
        <button class="price" :style="{ backgroundColor: priceButtonColor }" @click="sortByPrice">Price</button>
        <button class="size" :style="{ backgroundColor: sizeButtonColor }" @click="sortBySize">Size</button>
      </div>
    </div>

    <div v-if="filteredAndSortedHouses.length > 0" class="items-results">
      <ListingComponent :data="paginatedHouses" :navigate="navigateToHouseDetails" />

      <div class="pagination">
        <button class="previous" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button class="next" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
    <div v-else>
      <div class="no-results">
        <img src="@/assets/img_empty_houses@3x.png" alt="No results">
        <p>No results found. Please try another keyword.</p>
      </div>
    </div>

  </div>
</template>

<style>
.clear-button {
  position: absolute;
  right: 0;
  height: 36px;
  background: none;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.clear-button img {
  width: 100%;
  height: 18px;
}
.no-results {
  max-width: 380px;
  margin: 40px auto;
  padding: 30px 2px;
}
.no-results img {
  width: 100%;
  margin-bottom: 40px;
}
.no-results p {
  font-size: 14px;
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
  background-color: var(--color-background-tertiary-soft);
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
.functions .sorting button {
  border: 0;
  width: 50%;
  color: var(--color-background);
  font-weight: 700;
}
.sorting {
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  height: 40px;
}
.pagination {
  margin-top: 30px;
}
.pagination span {
  border-top: 1px solid var(--color-background-tertiary-soft);
  border-bottom: 1px solid var(--color-background-tertiary-soft);
  padding: 8px;
}
.pagination button {
  border: 0;
  background-color: var(--color-background-tertiary-soft);
  width: 200px;
  padding: 8px 0;
}
.pagination .previous {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.pagination .next {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
@media (min-width: 600px) {
  .no-results p {
    font-size: 18px;
  }
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
