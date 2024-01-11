<script setup>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { ref, onMounted, computed, watchEffect } from "vue";
  import ListingComponent from '@/common/components/ListingComponent.vue'
  import ModalComponent from '@/common/components/ModalComponent.vue';
  import { formatNumberWithComma } from '@/helper';

  const router = useRouter();
  const store = useStore();

  const activeModal = ref(false);

  // If we edit and update an exisiting house
  const newHouseData = ref(null)

  const selectedHouseDetails = computed(() => store.getters.getSelectedHouseDetails ? store.getters.getSelectedHouseDetails[0] : '');

  watchEffect(() => {
    newHouseData.value = selectedHouseDetails.value
  });

  const navigateBackToHouseListing = () => {
    router.push({ name: 'houses' });
  }
  
  onMounted(async () => {
    await store.dispatch('fetchHousesData');
    const houseId = window.location.pathname.split('/').pop();
    navigateToHouseDetails(houseId);
  });

  const housesData = computed(() => store.getters.getHousesData);

  const filteredHousesData = computed(() => {
    const selectedHouseId = selectedHouseDetails.value.id;
    return housesData.value.filter(house => house.id !== selectedHouseId).slice(0, 3);
  });

  const deleteHouse = async (houseId) => {
    await store.dispatch('deleteHouseById', houseId);
    store.dispatch('toggleModal');
  };

  const toggleModal = (houseId) => {
    activeModal.value = !activeModal.value;
    store.dispatch('toggleModal', houseId);
  };

  const navigateToHouseDetails = async (houseId, route) => {
    await store.dispatch('setSelectedHouseId', houseId);
    selectedHouseDetails.value = store.getters.getSelectedHouseDetails;
    router.push({ name: route, params: { id: houseId } });
  };
</script>

<template>
  <div class="house-details">
    <button class="back" @click="navigateBackToHouseListing">
      <img class="mobile" src="@/assets/ic_back_white@3x.png" alt="back">
      <div>
        <img class="desktop" src="@/assets/ic_back_grey@3x.png" alt="back">
        <p>Back to overview</p>
      </div>
    </button>
    <div class="childs-wrapper">
      <div class="left-section">
        <div class="main-image"><img :src="newHouseData.image !== null && newHouseData.image" alt="main-image"></div>
        <div class="details-container">
          <div class="first-child">
            <div class="info">
              <p class="name">{{ newHouseData.location?.street + ' ' + newHouseData.location?.houseNumber }}</p>
              <div class="group">
                <div class="location">
                  <img src="@/assets/ic_location@3x.png" alt="location">
                  <p>{{ newHouseData.location?.zip + ' ' + newHouseData.location?.city }}</p>
                </div>
                <br>
                <div class="child-group">
                  <div class="price">
                    <img src="@/assets/ic_price@3x.png" alt="price">
                    <p>{{ newHouseData.price && formatNumberWithComma(newHouseData.price) }}</p>
                  </div>
                  <div class="size">
                    <img src="@/assets/ic_size@3x.png" alt="size">
                    <p>{{ newHouseData?.size }} m2</p>
                  </div>
                  <div class="built">
                    <img src="@/assets/ic_construction_date@3x.png" alt="constructed">
                    <p>Built in {{ newHouseData.constructionYear }}</p>
                  </div>
                </div>
                <br>
                <div class="rooms">
                  <div>
                    <img alt="Bed" src="@/assets/ic_bed@3x.png" >
                    <p>{{ newHouseData.rooms?.bedrooms }}</p>
                  </div>
                  <div>
                    <img alt="Bathroom" src="@/assets/ic_bath@3x.png" >
                    <p>{{ newHouseData.rooms?.bathrooms }}</p>
                  </div>
                  <div>
                    <img alt="Size" src="@/assets/ic_garage@3x.png" >
                    <p>{{ newHouseData.hasGarage }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="tools">
              <button class="edit" @click="navigateToHouseDetails(newHouseData.id, 'NewLisiting')">
                <img class="mobile" alt="Edit icon" src="@/assets/ic_edit_white@3x.png" >
                <img class="desktop" alt="Edit icon desktop" src="@/assets/ic_edit@3x.png" >
              </button>
              <button class="delete" @click="toggleModal(newHouseData.id)">
                <img class="mobile" alt="delete icon" src="@/assets/ic_delete_white@3x.png" >
                <img class="desktop" alt="delete icon desktop" src="@/assets/ic_delete@3x.png" >
              </button>
              <ModalComponent v-if="activeModal">
                <div class="modal-wrapper">
                  <div class="texts">
                    <h1>Delete listing</h1>
                    <p>Are you sure you want to this listing? This action cannot be undone.</p>
                  </div>
                  <div class="buttons">
                    <button class="delete" @click="deleteHouse(newHouseData.id)" type="button">YES, DELETE</button>
                    <button class="cancle" @click="toggleModal(newHouseData.id)" type="button">GO BACK</button>
                  </div>
                </div>
              </ModalComponent>
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
</template>
<style>
  .right-section {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
  .left-section .tools .desktop {
    display: none;
  }
  .right-section p {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-primary);
    display: flex;
    margin: 0;
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
    display: flex;
    align-items: end;
    margin-right: 12px;
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
  .details-container .info .group p {
    color: var(--color-background-secondary);
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
  .house-details {
    width: 100%;
  }
  .house-details .back {
    background: 0;
    border: 0;
    position: absolute;
    left: 20px;
    top: 50px;
  }
  .main-image {
    display: flex;
  }
  .house-details .back img  {
    width: 18px;
    height: 18px;
  }
  .house-details .back div {
    display: none;
  }
  .left-section .details-container {
    background-color: var(--color-background);
    border-radius: 20px;
    overflow: hidden;
    margin-top: -20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .details-container .first-child {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    background-color: var(--color-background);
  }
  .details-container .second-child {
    display: flex;
    align-items: start;
    padding: 0 20px;
  }
  .details-container .second-child p {
    color: var(--color-background-secondary);
    font-size: 14px;
    text-align: left;
    line-height: 22px;
    font-family: 'Open Sans', sans-serif;
  }
  .main-image img {
    height: 300px;
    width: 100%;
  }
  .right-section .result-card .tools {
    right: 0;
    top: 3px;
  }
  @media (min-width: 600px) {
    .right-section .result-card .info {
      padding-top: 0;
    }
    .left-section .tools .desktop {
      display: flex;
    }
    .main-image img {
      margin: 0;
      height: auto;
    }
    .house-details .back {
      position: inherit;
      display: flex;
      margin-bottom: 20px;
      margin-left: 15px
    }
    .house-details .back div {
      display: flex;
      align-items: center;
    }
    .house-details .back .mobile {
      display: none;
    }
    .house-details .back div img {
      margin-right: 10px;
    }
    .house-details .tools {
      position: relative;
      top: 0;
    }
    .right-section .result-card {
      position: relative;
      margin: 20px 0;
      border-radius: 5px;
      padding: 15px;
      display: flex;
      box-shadow: rgba(14, 30, 37, 0.12) -1px 2px 4px 0px, rgba(14, 30, 37, 0.12) 4px -3px 16px 0px;
    }
    .right-section .result-card .image {
      display: flex;
      flex: 1;
      margin-right: 10px;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      height: 90px;
      /* flex-grow: 12; */
      /* width: 40%; */
    }
    .right-section .result-card .image img {
      width: 110px;
      height: 90px;
      margin: 0;
    }
    .right-section .result-card .info {
      flex: 2;
      /* width: 40%; */
      display: flex;
      flex-direction: column;
      align-items: start;
    }
    .right-section .result-card .tools {
      position: absolute;
      right: 5px;
      top: 8px;
      display: flex;
      flex-direction: row;
      align-items: start;
      justify-content: end;
    }
    .right-section .tools img {
      width: 18px;
      height: 18px;
    }
    .right-section .result-card .tools button {
      width: 38px;
      height: 38px;
      background: 0;
      padding: 0;
    }
    .rooms {
      display: flex;
    }
    .right-section .result-card .rooms div {
      display: flex;
      align-items: start;
      margin-right: 12px;
    }
    .right-section .rooms img {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
    .right-section .rooms p {
      margin-bottom: 0;
      padding: 0;
    }
    .right-section .result-card .rooms p {
      padding: 0;
    }
    .right-section .result-card .info p {
      font-size: 12px;
      margin: 0 0 9px 0;
      padding: 0;
    }
    .right-section .result-card .info .name {
    font-weight: 700;
    color: var(--color-text-primary);
    }
    .right-section .result-card .info .price {
      font-weight: 500;
      color: var(--color-background-secondary);
    }
    .right-section .result-card .info .address {
      font-weight: 300;
      color: var(--color-background-tertiary);
    }
    .right-section .result-card .info {
      flex: 4;
    }
  }

  @media (min-width: 1024px) {
    .house-details .back {
      margin-left: 0;
    }
    .right-section .result-card .info {
      flex: 2;
    }
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
      width: 340px;
    }
    .house-details .left-section {
      margin-right: 50px;
    }
  }
</style>
