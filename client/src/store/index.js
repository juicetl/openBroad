import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  
  namespaced: true,
  state: {
    tabledata: null,
    chartArray: [], //所有图的basedata
    selectChartId: "", //选中图表的ID
    isActive: false,
    templateData: "",
    covidkey: [],
    imgkey: [],
  },
  actions: {
    changeData(ctx, data) {
      ctx.commit('changeData', data)
    }
  },
  mutations: {
    getimgkey(state, data) {
      state.imgkey = data
    },
    getcovidkey(state,data){
      state.covidkey = data 
    },
    changeData(state, data) {
      state.tabledata = data
    },
    changeSelectId(state, payload) {
      state.selectChartId = payload;
    },
  },
  getters: {
    setcovidkey(state){
      return state.covidkey
    },
    setimgkey(state){
      return state.imgkey
    },
    getIsActive: state => {
      return state.isActive
    },
    getSelectChartId: state => {
      return state.selectChartId
    },
    
  },
  modules: {},
})
