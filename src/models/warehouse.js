
export default {

  namespace: 'warehouse',

  state: [],

  reducers: {
    add(state, { payload: bought }) {

      let len = state.length, isRepeat = false;
      for ( let i = 0; i < len; i++ ) {
        let row = state[i];
        if(row.type === bought.type && row.name === bought.name) {
          row.count += bought.count;
          isRepeat = true;
          break;
        }
      }

      return isRepeat ? state : state.concat(bought);
    },
    remove(state, { payload: bought }) {
      return state.filter(v => (v.type !== bought.type || v.name !== bought.name));
    },
  },

};
