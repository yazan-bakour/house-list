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

    <div class="search-results-container">
      <div v-if="searchResults.length > 0">
        <ul>
          <li v-for="result in searchResults" :key="result.id">
            {{ result.name }}
          </li>
        </ul>
      </div>
      <div v-else>No results found. Please try another keyword.</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const searchResults = ref([]);

const search = () => {
  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  searchResults.value = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};
</script>

<style>
.search-container {
  width: 100%;
}
.search-results-container {
  margin-top: 20px;
  display: flex;
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
.search-container img {
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
.price {
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
