import { debounce } from 'lodash';

let sayTimer = null;

export default {

  namespace: 'common',

  state: {
    headerFixed: false,
    hasProduct: false,
    say: '',
    showSay: false,
    startTime: new Date().getTime()
  },

  reducers: {
    setHeaderFixed(state, { payload: isFixed }) {
      state.headerFixed = isFixed;
      return {...state};
    },
    setWarehouseStatus(state, { payload: hasProduct }) {
      state.hasProduct = hasProduct;
      return {...state};
    },
    setSay(state, { payload: say}) {
      state.say = say;
      state.showSay = say !== '';
      return {...state};
    },
    setStartTime(state) {
      state.startTime = new Date().getTime();
      return {...state};
    },
    hideSay(state) {
      state.showSay = false;
      return {...state};
    }
  },
  effects: {
    // call:用于调用异步逻辑，支持 promise
    // put：用于触发 action
    // select：用于从 state 里获取数据
    *mySay({ payload }, { call, put }) {
      if(sayTimer) sayTimer.cancel();
      yield put({ type: 'setSay', payload});
      sayTimer = debounce(function (resolve) {
        sayTimer = null;
        resolve()
      }, 3000);
      yield new Promise(resolve => sayTimer(resolve));
      yield put({ type: 'hideSay'});
    },
  },
};
