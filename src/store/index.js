import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    today: new Date(),
    selectedDate: new Date(),
    week: null,
    fullMonth: null,
    mode: 'week',
    thisMonth: new Date().getMonth(),
  },

  mutations: {
    setWeek: (state, payload) => {
      state.week = payload;
    },
    setSelectedDate: (state, payload) => {
      state.selectedDate = payload;
    },
    setFullMonth: (state, payload) => {
      state.fullMonth = payload;
    },
    setMode: (state, payload) => {
      state.mode = payload;
    }
    
  },

  actions: {
    getWeek: (context, payload) => {
      function mod(n, m) {
        return ((n % m) + m) % m;
      }
      Date.prototype.getNormalDay = function() {
        return mod(this.getDay() - 1, 7);
      }
      let fromDate = new Date(payload);
      let monday = new Date(fromDate.setDate( fromDate.getDate() - fromDate.getNormalDay()))
      let week = [new Date(monday)]
      while (monday.setDate(monday.getDate() + 1) && monday.getDay() !== 1) {
          week.push(new Date(monday))
      }
      context.commit('setWeek', week)
    },
    changeSelectedDate: (context, payload) => {
      context.commit('setSelectedDate', payload);
    },
    getFullMonth: (context, thisMonth) => {
      let fullMonth = [];
      let selectedDate = context.state.selectedDate;
      const firstDate = new Date(selectedDate.getFullYear(), thisMonth, 1)
      const lastDate = new Date(selectedDate.getFullYear(), thisMonth + 1, 0)
      const firstRealDay = firstDate.getDay() == 0 ? 7 : firstDate.getDay();
      const lastRealDay = lastDate.getDay() == 0 ? 7 : firstDate.getDay();
      const prevLastDate = new Date(selectedDate.getFullYear(), thisMonth, 0).getDate()
      const year = selectedDate.getFullYear();
      for(let i = 0; i < firstRealDay - 1; i++) {
        const date = prevLastDate - i;
        fullMonth.unshift({
          fullDate: new Date(year, thisMonth - 1, date)
        })
      }
      for(let i = 1; i <= lastDate.getDate(); i++ ) {
        const date = i;
        fullMonth.push({
          fullDate: new Date(year, thisMonth, date)
        })
      }
      for(let i = 1; i < 6 - lastRealDay; i++) {
        const date = i;
        fullMonth.push({
          fullDate: new Date(year, thisMonth + 1, date)
        })
      }
      context.commit('setFullMonth', fullMonth);
    },
    switchMode: (context) => {
      if(context.state.mode == 'week') context.commit('setMode', 'day')
      else context.commit('setMode', 'week')
    }
  },

  modules: {}
});
