import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      data: {},
      isAgree: false,
      step: 1,
    };
  },

  mutations: {
    setData(state, { data, step }) {
      state.data = { ...state.data, ...data };
      state.step = step;
    },
    checkAgree(state, payload) {
      state.isAgree = payload.isCheckAgree;
      state.step = payload.step;
    },
    setStep(state, payload) {
      state.step = payload;
    },
  },

  actions: {
    setInfomation({ commit }, payload) {
      commit("setData", payload);
    },
    setCheckAgree({ commit }, payload) {
      commit("checkAgree", payload);
    },
    setStep({ commit }, payload) {
      commit("setStep", payload);
    },
  },
});
