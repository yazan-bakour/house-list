import { createStore } from 'vuex';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.intern.d-tt.nl/api/houses/',
  headers: {
    "X-API-Key": 'P6CU2iMrh_AFYnTqfIXjZcl4sN3bEk59',
  },
});

export default createStore({
  state: {
    housesData: [],
    selectedHouseId: null,
    selectedHouseDetails: null,
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
  },
  actions: {
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
    clearSelectedHouseId({ commit }) {
      commit('clearHouseId');
    },
  },
  getters: {
    getHousesData: (state) => state.housesData,
    getSelectedHouseId: (state) => state.selectedHouseId,
    getSelectedHouseDetails: (state) => state.selectedHouseDetails,
  },
});