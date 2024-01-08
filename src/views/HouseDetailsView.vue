<script setup>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { onMounted, computed } from "vue";
  import ListingComponent from '@/common/components/ListingComponent.vue'
  const router = useRouter();

  const navigateBackToHouseListing = () => {
    router.push({ name: 'houses'});
  }

  const convertNumberWithComma = (x) => {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  const store = useStore();
  const selectedHouseDetails = computed(() => store.getters.getSelectedHouseDetails[0]);
  const housesData = computed(() => store.getters.getHousesData);

  const filteredHousesData = computed(() => {
    const selectedHouseId = selectedHouseDetails.value.id;
    return housesData.value.filter(house => house.id !== selectedHouseId).slice(0, 3);
  });

  onMounted(async () => {
    await store.dispatch('fetchHousesData');
  });

  const navigateToHouseDetails = async (houseId) => {
    await store.dispatch('setSelectedHouseId', houseId);
    selectedHouseDetails.value = store.getters.getSelectedHouseDetails;

    router.push({ name: 'HouseDetails'});
  };
  
</script>

<template>
  <div class="house-details">
    <div class="body-wrapper">
      <button class="back" @click="navigateBackToHouseListing">
        <img class="mobile" src="@/assets/ic_back_white@3x.png" alt="back">
        <div>
          <img class="desktop" src="@/assets/ic_back_grey@3x.png" alt="back">
          <p>Back to overview</p>
        </div>
      </button>
      <div class="childs-wrapper">
        <div class="left-section">
          <div class="main-image"><img :src="selectedHouseDetails.image" alt="main-image"></div>
          <div class="details-container">
            <div class="first-child">
              <div class="info">
                <p class="name">{{ selectedHouseDetails.location.street + ' ' + selectedHouseDetails.location.houseNumber }}</p>
                <div class="group">
                  <div class="location">
                    <img src="@/assets/ic_location@3x.png" alt="location">
                    <p>{{ selectedHouseDetails.location.zip + ' ' + selectedHouseDetails.location.city }}</p>
                  </div>
                  <br>
                  <div class="child-group">
                    <div class="price">
                      <img src="@/assets/ic_price@3x.png" alt="price">
                      <p>{{ convertNumberWithComma(selectedHouseDetails.price) }}</p>
                    </div>
                    <div class="size">
                      <img src="@/assets/ic_size@3x.png" alt="size">
                      <p>{{ selectedHouseDetails.size }} m2</p>
                    </div>
                    <div class="built">
                      <img src="@/assets/ic_construction_date@3x.png" alt="constructed">
                      <p>Built in {{ selectedHouseDetails.constructionYear }}</p>
                    </div>
                  </div>
                  <br>
                  <div class="rooms">
                    <div>
                      <img alt="Bed" src="@/assets/ic_bed@3x.png" >
                      <p>{{ selectedHouseDetails.rooms.bedrooms }}</p>
                    </div>
                    <div>
                      <img alt="Bathroom" src="@/assets/ic_bath@3x.png" >
                      <p>{{ selectedHouseDetails.rooms.bathrooms }}</p>
                    </div>
                    <div>
                      <img alt="Size" src="@/assets/ic_garage@3x.png" >
                      <p>{{ selectedHouseDetails.hasGarage }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tools">
                <button class="edit"><img alt="Edit icon" src="@/assets/ic_edit_white@3x.png" ></button>
                <button><img alt="delete icon" src="@/assets/ic_delete_white@3x.png" ></button>
              </div>
            </div>
            <div class="second-child">
              <p>{{ selectedHouseDetails.description }}</p>
            </div>
          </div>
        </div>
        <div class="right-section">
          <p>Recommended for you</p>
          <ListingComponent :data="filteredHousesData" :navigate="navigateToHouseDetails" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .right-section {
    display: none;
    flex-direction: column;
    width: 380px;
  }
  .right-section p {
    font-size: 18px;
    font-weight: 700;
    color: #000000;
    display: flex;
    padding-left: 20px;
    margin: 0;
  }
  .house-details .body-wrapper {
    padding: 0;
  }

  .group {
    display: flex;
    flex-direction: column;
  }
  .group .location {
    display: flex;
    width: 100%;
    align-items: end;
  }
  .group .location img {
    width: 14px;
  }
  .group img {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  .group p {
    margin-bottom: 0;
  }
  .rooms div {
    align-items: end;
  }

  .group .child-group {
    display: flex;
    width: 100%;
  }
  .group .child-group div {
    display: flex;
    margin-right: 10px;
    align-items: end;
    
  }
  .details-container .tools {
    display: flex;
    position: absolute;
    top: 50px;
    right: 20px;
  }
  .details-container .info {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 20px;
  }
  .info .group p {
    color: #4A4B4C;
  }
  .details-container .info .name {
    font-size: 18px;
    margin-bottom: 20px;
  }
  .tools button {
    background: 0;
    border: 0;
  }
  .tools .edit {
    margin-right: 10px;
  }
  .back {
    background: 0;
    border: 0;
    position: absolute;
    left: 20px;
    top: 50px;
  }
  .main-image {
    display: flex;
  }
  .back img  {
    width: 18px;
    height: 18px;
  }
  .back div {
    display: none;
  }
  .left-section .details-container {
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;
    margin-top: -20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .details-container .first-child {
    background-color: #fff;
  }
  .details-container .second-child {
    display: flex;
    align-items: start;
    padding: 0 20px;
  }
  .details-container .second-child p {
    color: #4A4B4C;
    font-size: 14px;
    text-align: left;
    line-height: 16px;
  }
  .main-image img {
    height: 300px;
    width: 100%;
  }
  @media (min-width: 600px) {
    .right-section {
      width: 100%;
    }
    .main-image img {
      margin: 0;
    }
    .back {
      position: inherit;
      margin-left: 10px;
    }
    .back div {
      display: flex;
      align-items: center;
    }
    .back .mobile {
      display: none;
    }
    .back div img {
      margin-right: 10px;
    }
    .details-container .tools {
      position: relative; 
    }
  }
  @media (min-width: 1024px) {
    .left-section .details-container {
      border-radius: 0;
      overflow: visible;
      margin-top: 0;
    }
    .house-details .childs-wrapper {
      display: flex;
      flex-direction: row;
    }
    .right-section {
      width: 300px;
    }
    .house-details .left-section {
      margin-right: 20px;
    }
  }
</style>
