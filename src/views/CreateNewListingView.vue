<script setup>

  import { ref, computed, onMounted } from "vue";
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
// TODO add validation, background Image, and fix image upload and edit api
  const store = useStore();
  const router = useRouter();

  const selectedHouseDetails = computed(() => store.getters.getSelectedHouseDetails ? store.getters.getSelectedHouseDetails[0] : '');

  const streetName = ref("");
  const houseNumber = ref("");
  const numberAddition = ref("");
  const zip = ref("");
  const city = ref("");
  const image = ref(null);
  const price = ref("");
  const size = ref("");
  const hasGarage = ref(false);
  const bedrooms = ref("");
  const bathrooms = ref("");
  const constructionYear = ref("");
  const description = ref("");

  onMounted(() => {
    if (selectedHouseDetails.value) {
      streetName.value = selectedHouseDetails.value.location.street;
      houseNumber.value = selectedHouseDetails.value.location.houseNumber;
      numberAddition.value = selectedHouseDetails.value.location.houseNumberAddition;
      zip.value = selectedHouseDetails.value.location.zip;
      city.value = selectedHouseDetails.value.location.city;
      price.value = selectedHouseDetails.value.price;
      size.value = selectedHouseDetails.value.size;
      hasGarage.value = selectedHouseDetails.value.hasGarage;
      bedrooms.value = selectedHouseDetails.value.rooms.bedrooms;
      bathrooms.value = selectedHouseDetails.value.rooms.bathrooms;
      constructionYear.value = selectedHouseDetails.value.constructionYear;
      description.value = selectedHouseDetails.value.description;
    }
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    image.value = file;
  };

  const navigateBackToHouseListing = () => {
    if (selectedHouseDetails.value) {
      router.push({ name: 'HouseDetails', params: { id: selectedHouseDetails.value.id } });
    } else {
      router.push({ name: 'houses'});
    }
  };

  const imageUpload = async (file, id) => {
    if (id && file) {
      await store.dispatch('uploadImage', {
        houseId: id,
        image: file
      })
    }
  }

  const submitForm = async () => {
    if (selectedHouseDetails.value) {
      await store.dispatch('editHouseById', {
        houseId: selectedHouseDetails.value.id,
        updatedHouseData: {
          price: price.value,
          bedrooms: bedrooms.value,
          bathrooms: bathrooms.value,
          size: size.value,
          streetName: streetName.value,
          houseNumber: houseNumber.value,
          numberAddition: numberAddition.value,
          zip: zip.value,
          constructionYear: constructionYear.value,
          city: city.value,
          description: description.value,
          hasGarage: hasGarage.value
        }
      });
      imageUpload(image.value, selectedHouseDetails.value.id)
      router.push({ name: 'HouseDetails', params: { id: selectedHouseDetails.value.id } });
    } else {
      const newHouseData = await store.dispatch('postNewHouse', {
        price: price.value,
        bedrooms: bedrooms.value,
        bathrooms: bathrooms.value,
        size: size.value,
        streetName: streetName.value,
        houseNumber: houseNumber.value,
        numberAddition: numberAddition.value,
        zip: zip.value,
        constructionYear: constructionYear.value,
        city: city.value,
        description: description.value,
        hasGarage: hasGarage.value
      });
      imageUpload(image.value, newHouseData)
      router.push({ name: 'HouseDetails', params: { id: newHouseData } });
    }
  };
</script>

<template>
  <div class="create-container">
    <div class="heading">
      <button class="back" @click="navigateBackToHouseListing">
        <img src="@/assets/ic_back_grey@3x.png" alt="back">
        <p>Back to overview</p>
      </button>
      <h1>{{ selectedHouseDetails ? 'Edit lisiting' : 'Creae new lisiting'}}</h1>
    </div>

    <form @submit.prevent="submitForm">
      <div>
        <label for="street">Street Name*</label>
        <input v-model="streetName" id="street" required />
      </div>
      <div class="pair">
        <div>
          <label for="houseNumber">House Number*</label>
          <input v-model="houseNumber" id="houseNumber" required />
        </div>
        <div>
          <label for="addition">Addition (optional)</label>
          <input v-model="numberAddition" id="addition" />
        </div>
      </div>
      <div>
        <label for="postalCode">Postal Code*</label>
        <input v-model="zip" id="postalCode" required />
      </div>
      <div>
        <label for="city">City*</label>
        <input v-model="city" id="city" required />
      </div>
      <div>
        <label for="picture">Upload Picture*</label>
        <input type="file" @change="handleFileUpload" accept="image/*" />
      </div>
      <div>
        <label for="price">Price*</label>
        <input v-model="price" id="price" required />
      </div>
      <div class="pair">
        <div>
          <label for="size">Size*</label>
          <input v-model="size" id="size" required />
        </div>
        <div>
          <label for="garage">Garage*</label>
          <input type="checkbox" v-model="hasGarage" id="garage" />
        </div>
      </div>
      <div class="pair">
        <div>
          <label for="bedrooms">Bedrooms*</label>
          <input v-model="bedrooms" id="bedrooms" required />
        </div>
        <div>
          <label for="bathrooms">Bathrooms*</label>
          <input v-model="bathrooms" id="bathrooms" required />
        </div>
      </div>
      <div>
        <label for="constructionDate">Construction Date*</label>
        <input
          v-model="constructionYear"
          id="constructionDate"
          required
        />
      </div>
      <div>
        <label for="description">Description*</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>
      <button class="cta" type="submit">{{ selectedHouseDetails ? 'Save' : 'Submit' }}</button>
    </form>
  </div>
</template>

<style>
  .create-container {
    display: flex;
    flex-direction: column;
    align-self: start;
    width: 100%;
    padding-top: 20px;
  }
  .create-container .heading {
    display: flex;
    width: 100%;
  }
  .create-container .heading h1 {
    display: flex;
    flex: 2;
    margin: 0;
  }
  .create-container .back {
    display: flex;
    flex: 1;
    background: 0;
    border: 0;
    margin-bottom: 20px;
    padding: 0;
  }
  .create-container .back p {
    display: none;
  }
  .create-container .back img  {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  .create-container form {
    max-width: 340px;
    width: 100%;
    margin-top: 20px;
  }
  .create-container form .pair div:first-child { 
    margin-right: 20px;
  }
  .create-container form .pair {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
  }
  .create-container form div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    align-items: start;
  }
  .create-container form div label {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .create-container form div input {
    height: 30px;
    border-radius: 6px;
    border: 1px solid #C3C3C3;
    width: 100%;
    padding-left: 10px;
  }
  .create-container form div textarea {
    height: 100px;
    border-radius: 6px;
    border: 1px solid #C3C3C3;
    width: 100%;
    padding: 10px;
  }
  .create-container .cta {
    border: 0;
    background-color: #EB5440;
    height: 48px;
    width: 100%;
    border-radius: 6px;
    color: #fff;
    font-weight: 700;
  }

  @media (min-width: 600px) {
    .create-container .heading {
      flex-direction: column;
      margin-bottom: 20px;
    }
    .create-container .back {
      align-items: center;
    }
    .create-container .back p {
      display: block;
    }
    .create-container .cta {
      width: 50%;
      float: right;
    }
  }
</style>
