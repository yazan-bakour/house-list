<script setup>
  import { defineProps, ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import ModalComponent from './ModalComponent.vue'
  import { formatNumberWithComma } from '@/helper';

  const store = useStore();
  const activeModal = ref(false);

  const props = defineProps(['data', 'navigate']);

  const deleteHouse = async (houseId) => {
    await store.dispatch('deleteHouseById', houseId);
    store.dispatch('toggleModal', houseId);
  };

  const toggleModal = (houseId) => {
    activeModal.value = !activeModal.value;
    store.dispatch('toggleModal', houseId);
  };

  const isModalVisible = computed(() => (houseId) => store.getters.isVisibleModal(houseId));
</script>

<template>
  <div v-for="house in data" :key="house.id" class="result-card">
    <div class="image" @click="props.navigate(house.id, 'HouseDetails')">
      <img alt="Result img" :src="house.image" >
    </div>

    <div class="info">
      <p class="name">{{ house.location.street + ' ' + house.location.houseNumber }}</p>
      <p class="price">€ {{ formatNumberWithComma(house.price) }}</p>
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
        <button @click="props.navigate(house.id, 'NewLisiting')"><img alt="Edit icon" src="@/assets/ic_edit@3x.png" ></button>
        <button @click="toggleModal(house.id)"><img alt="delete icon" src="@/assets/ic_delete@3x.png" ></button>
      </div>
      <ModalComponent v-if="isModalVisible(house.id)">
        <div class="modal-wrapper">
          <div class="texts">
            <h1>Delete listing</h1>
            <p>Are you sure you want to this listing? This action cannot be undone.</p>
          </div>
          <div class="buttons">
            <button class="delete" @click="deleteHouse(house.id)" type="button">YES, DELETE</button>
            <button class="cancle" @click="toggleModal(house.id)" type="button">GO BACK</button>
          </div>
        </div>
      </ModalComponent>
    </div>
  </div>
</template>
<style>
.result-card {
  position: relative;
  margin: 20px 0;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  box-shadow: rgba(14, 30, 37, 0.12) -1px 2px 4px 0px, rgba(14, 30, 37, 0.12) 4px -3px 16px 0px;
}
.result-card .image {
  display: flex;
  flex: 1;
  margin-right: 10px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
}
.result-card .image img {
  width: 110px;
  margin: 0;
}
.result-card .info {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: start;
}
.result-card .tools {
  position: absolute;
  right: 10px;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: end;
}
.tools img {
  width: 18px;
  height: 18px;
}
.result-card .tools button {
  width: 48px;
  height: 48px;
  background: 0;
}
.rooms {
  display: flex;
}
.result-card .rooms div {
  display: flex;
  align-items: start;
  margin-right: 12px;
}
.rooms img {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
.rooms p {
  margin-bottom: 0;
}
.result-card .info p {
  font-size: 12px;
  margin: 0 0 9px 0;
}
.result-card .info .name {
 font-weight: 700;
 color: var(--color-text-primary);
}
.result-card .info .price {
  font-weight: 500;
  color: var(--color-background-secondary);
}
.result-card .info .address {
  font-weight: 300;
  color: var(--color-background-tertiary);
}

@media (min-width: 480px) {
  .result-card .image img {
    width: 130px;
    height: 118px;
  }
  .result-card .info p {
    font-size: 18px; 
  }
  .result-card .info .address {
    margin-bottom: 18px;
  }
}
@media (min-width: 600px) {
  .rooms img {
    width: 24px;
    height: 24px;
  }
  .result-card .image img {
    width: 246px;
    height: 180px;
  }
  .result-card .image {
    border-radius: 5px;
    height: 180px;
    margin-right: 25px;
  }
  .result-card .info .name {
    font-size: 22px;
  }
  .result-card .info p {
    font-size: 18px; 
    margin-bottom: 18px; 
  }
  .result-card .info .address {
    margin-bottom: 25px;
  }
  .result-card .info {
    padding-top: 10px;
  }
}
@media (min-width: 1024px) {
  .result-card .info {
    flex: 3;
  }
}
</style>