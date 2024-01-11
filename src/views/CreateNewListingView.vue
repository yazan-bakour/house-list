<script setup>

  import { ref, computed, onMounted, watchEffect } from "vue";
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  const store = useStore();
  const router = useRouter();

  const selectedHouseDetails = computed(() => store.getters.getSelectedHouseDetails ? store.getters.getSelectedHouseDetails[0] : '');

  const fileInput = ref(null);
  const uploadedFileUrl = ref(null);

  const valid = ref(false)
  const validationCondition = ref(true)
  
  const streetName = ref("");
  const houseNumber = ref("");
  const numberAddition = ref("");
  const zip = ref("");
  const city = ref("");
  const image = ref(null);
  const price = ref("");
  const size = ref("");
  const hasGarage = ref(null);
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
      image.value = selectedHouseDetails.value.image;
      uploadedFileUrl.value = selectedHouseDetails.value.image;
      validationCondition.value = false
    }
  });

  const triggerFileInput = () => {
    fileInput.value.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    image.value = file;
    uploadedFileUrl.value = URL.createObjectURL(file);
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
  watchEffect(() => {
    validationCondition.value = !description.value || !image.value || !price.value || !bedrooms.value || !bathrooms.value || !size.value || !streetName.value || !houseNumber.value || !zip.value || !constructionYear.value
  });

  const handleDisabledClick = () => {
    if (validationCondition.value) {
      valid.value = true
    } else {
      valid.value = false
    }
  }

  const submitForm = async () => {
    if (validationCondition.value) {
      valid.value = true
    } else {
      valid.value = false
    }

    if (valid.value) {
      return null
    } else {
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
          validationCondition.value = false
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
        await imageUpload(image.value, newHouseData)
        validationCondition.value = false
        if (newHouseData) {
          router.push({ name: 'HouseDetails', params: { id: newHouseData } });
        }
      }
    }
  };
  const isEditButtonClicked = store.getters.isEditButtonClicked
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
      <div class="single-field-h">
        <label for="street">Street Name*</label>
        <input :class="valid && !streetName ? 'inputBorderError' : ''" placeholder="Enter the street name" v-model="streetName" id="street"  />
        <p class="validation" v-if="valid && !streetName">Require filed missing </p>
      </div>
      <div class="pair">
        <div>
          <label for="houseNumber">House Number*</label>
          <input :class="valid && !houseNumber ? 'inputBorderError' : ''" placeholder="Enter house number" v-model="houseNumber" id="houseNumber"  />
          <p class="validation" v-if="valid && !houseNumber">Require filed missing </p>
        </div>
        <div>
          <label for="addition">Addition (optional)</label>
          <input placeholder="e.g A" v-model="numberAddition" id="addition" />
        </div>
      </div>
      <div class="single-field-h">
        <label for="postalCode">Postal Code*</label>
        <input :class="valid && !zip ? 'inputBorderError' : ''" placeholder="e.g 1000 AA" v-model="zip" id="postalCode"  />
        <p class="validation" v-if="valid && !zip">Require filed missing </p>
      </div>
      <div class="single-field-h">
        <label for="city">City*</label>
        <input :class="valid && !city ? 'inputBorderError' : ''" placeholder="e.g Utrecht" v-model="city" id="city"  />
        <p class="validation" v-if="valid && !city">Require filed missing </p>
      </div>
      <div class="large-h">
        <label for="picture">Upload Picture (PNG or JPG)*</label>
        <div :class="valid && !image ? 'inputBorderError' : ''" class="uploader">
          <input ref="fileInput" type="file" style="display: none" @change="handleFileUpload" accept="image/*" />
          <img :class="uploadedFileUrl ? 'uploaded-image' : 'normal-image'" :src="uploadedFileUrl || require('@/assets/ic_upload@3x.png')" alt="Upload" @click="triggerFileInput" />
        </div>
        <p class="validation" v-if="valid && !image">Require filed missing </p>
      </div>
      <div class="single-field-h">
        <label for="price">Price*</label>
        <input :class="valid && !price ? 'inputBorderError' : ''" placeholder="e.g €150.000" v-model="price" id="price"  />
        <p class="validation" v-if="valid && !price">Require filed missing </p>
      </div>
      <div class="pair">
        <div>
          <label for="size">Size*</label>
          <input :class="valid && !size ? 'inputBorderError' : ''" placeholder="e.g 60m2" v-model="size" id="size"  />
          <p class="validation" v-if="valid && !size">Require filed missing </p>
        </div>
        <div class="garage">
          <label for="garage">Garage*</label>
          <select :class="valid && !hasGarage ? 'inputBorderError' : ''" id="garage" v-model="hasGarage">
            <option disabled :value="null">Select</option>
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
          <p class="validation" v-if="valid && hasGarage == null">Require filed missing </p>
        </div>
      </div>
      <div class="pair">
        <div>
          <label for="bedrooms">Bedrooms*</label>
          <input :class="valid && !bedrooms ? 'inputBorderError' : ''" placeholder="Enter amount" v-model="bedrooms" id="bedrooms"  />
          <p class="validation" v-if="valid && !bedrooms">Require filed missing </p>
        </div>
        <div>
          <label for="bathrooms">Bathrooms*</label>
          <input :class="valid && !bathrooms ? 'inputBorderError' : ''" placeholder="Enter amount" v-model="bathrooms" id="bathrooms"  />
          <p class="validation" v-if="valid && !bathrooms">Require filed missing </p>
        </div>
      </div>
      <div class="single-field-h">
        <label placeholder="e.g 1990" for="constructionDate">Construction Date*</label>
        <input :class="valid && !constructionYear ? 'inputBorderError' : ''" placeholder="Enter description" v-model="constructionYear" id="constructionDate" />
        <p class="validation" v-if="valid && !constructionYear">Require filed missing </p>
      </div>
      <div class="large-h">
        <label for="description">Description*</label>
        <textarea :class="valid && !description ? 'inputBorderError' : ''" placeholder="Description" v-model="description" id="description" ></textarea>
        <p class="validation" v-if="valid && !description">Require filed missing </p>
      </div>
      <div class="submit-button">
        <div v-if="validationCondition" class="cta-disabled" @click="handleDisabledClick">{{ (selectedHouseDetails && isEditButtonClicked) ? 'Save' : 'Submit' }}</div>
        <button v-if="!validationCondition" class="cta" type="submit">{{ (selectedHouseDetails && isEditButtonClicked) ? 'Save' : 'Submit' }}</button>
      </div>
    </form>
  </div>
</template>

<style>
  .single-field-h {
    height: 95px;
  }
  .large-h {
    height: 155px;
  }
  .create-container .validation {
    margin-top: 10px;
    color: var(--color-background-primary);
    font-size: 12px;
    font-style: italic;
  }
  .create-container {
    display: flex;
    flex-direction: column;
    align-self: start;
    width: 100%;
    position: relative;
  }
  .create-container .uploader {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-background-secondary);
    border-style: dashed;
    margin-bottom: 0;
  }
  .create-container .uploader img {
    cursor: pointer;
    width: 28px;
  }
  .create-container .uploader .normal-image {
    width: 28px;
  }
  .create-container .uploader .uploaded-image {
    width: 100%;
    height: inherit;
  }
  .create-container .main-background {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
  }
  .create-container .container-body {
    position: inherit;
    z-index: 1;
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
    margin-bottom: 40px;
    padding: 0;
  }
  .create-container .back p {
    display: none;
    font-size: 16px;
  }
  .create-container .back img  {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  .create-container form {
    max-width: 340px;
    width: 100%;
    height: 1400px;
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
    height: 135px;
  }
  .create-container .pair select {
    height: 40px;
    border-radius: 6px;
    border: 1px solid var(--color-background-tertiary-soft);
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
  }
  .create-container .pair .garage {
    flex: 1
  }
  .create-container form div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    align-items: start;
  }
  .create-container form div label {
    margin-bottom: 10px;
  }
  .create-container form div input {
    height: 40px;
    border-radius: 6px;
    border: 1px solid var(--color-background-tertiary-soft);
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
  }
  .create-container form div .inputBorderError {
    border: 1px solid var(--color-background-primary);
  }
  .create-container form div textarea {
    height: 100px;
    border-radius: 6px;
    border: 1px solid var(--color-background-tertiary-soft);
    width: 100%;
    padding: 10px;
  }
  .create-container .cta {
    border: 0;
    background-color: var(--color-background-primary);
    height: 48px;
    width: 100%;
    border-radius: 6px;
    color: var(--color-background);
    font-weight: 700;
  }
  .create-container .cta-disabled {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    background-color: var(--color-background-primary);
    height: 48px;
    width: 100%;
    border-radius: 6px;
    color: var(--color-background);
    font-weight: 700;
    opacity: 80%;
  }
  .create-container .submit-button {
    display: flex;
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
    }
    .create-container .cta-disabled {
      width: 50%;
    }
    .create-container .submit-button {
      align-items: end;
    }
  }
</style>
