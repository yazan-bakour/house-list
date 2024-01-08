import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    housesData: [],
    selectedHouseId: null,
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
    },
  },
  actions: {
    async fetchHousesData({ commit }) {
      try {
        const response = await axios.get('https://api.intern.d-tt.nl/api/houses', {
          headers: {
            "X-API-Key": 'P6CU2iMrh_AFYnTqfIXjZcl4sN3bEk59',
          },
        });
        commit('setHousesData', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    setSelectedHouseId({ commit }, houseId) {
      commit('setHouseId', houseId);
    },
    clearSelectedHouseId({ commit }) {
      commit('clearHouseId');
    },
  },
  getters: {
    getHousesData: (state) => state.housesData,
    getSelectedHouseId: (state) => state.selectedHouseId,
  },
});