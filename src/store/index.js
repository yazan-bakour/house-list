import { createStore } from 'vuex';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.intern.d-tt.nl/api/houses/',
  headers: {
    "X-API-Key": 'P6CU2iMrh_AFYnTqfIXjZcl4sN3bEk59'
  },
});

export default createStore({
  state: {
    housesData: [],
    selectedHouseId: null,
    selectedHouseDetails: null,
    error: null,
    visibleModals: [],
    editButtonClicked: false,
  },
  mutations: {
    setHousesData(state, data) {
      state.housesData = data;
    },
    setHouseId(state, houseId) {
      state.selectedHouseId = houseId;
    },
    clearHouseId(state) {
      state.selectedHouseId = null;
      state.selectedHouseDetails = null;
    },
    setHouseDetails(state, details) {
      state.selectedHouseDetails = details;
    },
    setPostNewHouseError(state, newError) {
      state.error = newError
    },
    toggleModal(state, houseId) {
      const index = state.visibleModals.indexOf(houseId);
      if (index !== -1) {
        state.visibleModals.splice(index, 1);
      } else {
        state.visibleModals.push(houseId);
      }
    },
    setEditButtonClicked(state, value) {
      state.editButtonClicked = value;
    },
  },
  actions: {
    setEditButtonClicked({ commit }, value) {
      commit('setEditButtonClicked', value);
    },
    toggleModal({ commit }, houseId) {
      commit('toggleModal', houseId);
    },
    async fetchHousesData({ commit }) {
      try {
        const response = await api.get('');
        commit('setHousesData', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async setSelectedHouseId({ commit }, houseId) {
      try {
        commit('setHouseId', houseId);
        const response = await api.get(`${houseId}`);
        commit('setHouseDetails', response.data);
      } catch (error) {
        console.error('Error fetching house details:', error);
      }
    },

    async postNewHouse({ dispatch, commit }, newHouseData) {
      try {
        const response = await api.post('', newHouseData);
        dispatch('fetchHousesData');
        console.log('Response:', response);
        if (typeof response.data === 'string' || response.data.code) {
          commit('setPostNewHouseError', response.data.code || response.data)
        }
        return response.data.id;
      } catch (error) {
        console.error('Error posting new house:', error);
      }
    },

    async uploadImage({ dispatch }, { houseId, image }) {
      try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await api.post(`/${houseId}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Image uploaded successfully:', response.data);
        dispatch('fetchHousesData');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },

    async editHouseById({ dispatch }, { houseId, updatedHouseData }) {
      try {
        const response = await api.post(`/${houseId}`, updatedHouseData);
        console.log('House edited successfully:', response.data);
        dispatch('fetchHousesData');
      } catch (error) {
        console.error('Error editing house:', error);
      }
    },

    async deleteHouseById({ dispatch }, houseId) {
      try {
        const response = await api.delete(`/${houseId}`);
        console.log('House deleted successfully:', response.data);
        dispatch('fetchHousesData');
      } catch (error) {
        console.error('Error deleting house:', error);
      }
    },

    clearSelectedHouseId({ commit }) {
      commit('clearHouseId');
    },
  },
  getters: {
    getHousesData: (state) => state.housesData,
    getSelectedHouseId: (state) => state.selectedHouseId,
    getSelectedHouseDetails: (state) => state.selectedHouseDetails,
    getPostNewHouseError: (state) => state.error,
    isVisibleModal: (state) => (houseId) => state.visibleModals.includes(houseId),
    isEditButtonClicked: (state) => state.editButtonClicked,
  },
});