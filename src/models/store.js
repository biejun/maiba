
export default {

  namespace: 'store',

  state: {
    type: 'journey',
    typeData: {}
  },

  subscriptions: {
    // setup({ dispatch, history }) {  // eslint-disable-line
    //   console.log(history)
    // },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'add' });
    },
  },

  reducers: {
    setType(state, { payload }) {
      state.type = payload;
      return {...state};
    },
    setProducts(state, { payload }) {
      const { typeCode, products } = payload;
      if(!state.typeData[typeCode]) {
        state.typeData[typeCode] = [];
      }
      state.typeData[typeCode] = products
      return {...state};
    },
  },

};
