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
    status: [],
    visibleModals: [],
    editButtonClicked: false
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
    setHouseStatus(state, status) {
      state.status.push(status)
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
    clearHouseStatus(state, index) {
      state.status.splice(index, 1);
    },
  },
  actions: {
    clearHouseStatus({ commit }, index) {
      commit('clearHouseStatus', index);
    },
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
        commit('setHouseStatus', { error: error.response.data })
      }
    },

    async setSelectedHouseId({ commit }, houseId) {
      try {
        commit('setHouseId', houseId);
        const response = await api.get(`${houseId}`);
        commit('setHouseDetails', response.data);
      } catch (error) {
        commit('setHouseStatus', { error: error.response.data })
      }
    },

    async postNewHouse({ dispatch, commit }, newHouseData) {
      try {
        const response = await api.post('', newHouseData);
        dispatch('fetchHousesData');
        commit('setHouseStatus', { success: 'House is posted successfully!' })
        return response.data.id;
      } catch (error) {
        if (error.response.data) {
          commit('setHouseStatus', { error: error.response.data })
        }
      }
    },

    async uploadImage({ dispatch, commit }, { houseId, image }) {
      try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await api.post(`/${houseId}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        commit('setHouseStatus', { success: 'Image uploaded successfully!' });
        console.log('Image uploaded successfully', response.data);
        dispatch('fetchHousesData');
      } catch (error) {
        commit('setHouseStatus', { error: error.response.data })
      }
    },

    async editHouseById({ dispatch, commit }, { houseId, updatedHouseData }) {
      try {
        const response = await api.post(`/${houseId}`, updatedHouseData);
        console.log('House edited successfully', response.data);
        commit('setHouseStatus', { success: 'House edited successfully!' })
        dispatch('fetchHousesData');
      } catch (error) {
        commit('setHouseStatus', { error: error.response.data })
      }
    },

    async deleteHouseById({ dispatch, commit }, houseId) {
      try {
        const response = await api.delete(`/${houseId}`);
        console.log('House deleted successfully', response.data);
        commit('setHouseStatus', { success: 'House deleted successfully!' })
        dispatch('fetchHousesData');
      } catch (error) {
        commit('setHouseStatus', { error: error.response.data })
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
    getHouseStatus: (state) => state.status,
    isVisibleModal: (state) => (houseId) => state.visibleModals.includes(houseId),
    isEditButtonClicked: (state) => state.editButtonClicked,
  },
});