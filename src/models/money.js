import { subtract, add, multiply, divide } from '../utils/numbers';
import {debounce} from "lodash";

// 延迟执行
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// 总资产
const totalAssets = 302140000000.00;
let _incomeTimer = null;

export default {

  namespace: 'money',

  state: {
    totalAssets,
    balance: totalAssets,
    behaviour: '',
    amount: 0,
    showStartUse: false,
    showSpentAll: false,
    isStart: false,
    showWealth: false,
    incomeQueue: [],
    incomeTimer: null
  },

  reducers: {
    spend(state, { payload: amount }) {
      state.balance = subtract(state.balance, amount);
      state.behaviour = 'buy';
      state.amount = amount;
      state.showSpentAll = state.balance === 0;
      return { ...state };
    },
    income(state, { payload: amount }) {
      state.balance = add(state.balance, amount);
      state.behaviour = 'sell';
      state.amount = amount;
      return { ...state };
    },
    setAmount(state, {payload: amount}) {
      state.amount = amount;
      return {...state};
    },
    showStartUse(state, {payload: status}) {
      state.showStartUse = status;
      if(!status) {
        state.isStart = true;
      }
      return {...state};
    },
    showSpentAll(state, {payload: status}) {
      state.showSpentAll = status;
      return {...state};
    },
    showWealth(state, {payload: status}) {
      state.showWealth = status;
      return {...state};
    },
    setIncomeQueue(state, { payload: incomeQueue }) {
      state.incomeQueue = incomeQueue;
      return {...state};
    },
    updateBalance(state, { payload }) {
      let income = multiply(payload.price, divide(payload.incomeRate, 100));
      if(payload.incomeRate > 0) {
        state.balance = subtract(state.balance, income);
        state.behaviour = 'sell';
      }else{
        state.balance = add(state.balance, income);
        state.behaviour = 'buy';
      }
      state.amount = Math.abs(income);
      return { ...state };
    }
  },
  effects: {
    // call:用于调用异步逻辑，支持 promise
    // put：用于触发 action
    // select：用于从 state 里获取数据
    *updateIncomeQueue({ payload: product }, { fork, cancelled, cancel, call, put, select }) {
      let incomeQueue = yield select(state=> state.money.incomeQueue);
      let oldIncome = incomeQueue.find(v => v.name === product.name);
      let incomeRate = product.incomeRate || 0;
      // 如果已经存在收益
      if(oldIncome) {
        if(!product.isRemove) {
          // 则收益累加
          incomeRate += oldIncome.incomeRate;
        }
        incomeQueue.splice(incomeQueue.indexOf(oldIncome), 1);
      }
      if(_incomeTimer) {
        yield cancel(_incomeTimer);
      }

      if(!product.isRemove) {
        let newIncome = {
          name: product.name,
          incomeRate: incomeRate,
          price: product.price
        };
        incomeQueue.push(newIncome);
      }

      if(incomeQueue.length) {
        // 收益计算规则，总投资额 * 总利率
        let totalRate = incomeQueue.reduce((total, next) => add(total, next.incomeRate), 0);
        let totalPrice = incomeQueue.reduce((total, next) => add(total, next.price), 0);

        // 需要用 redux-saga 的 fork 来处生成一个 Task，在需要的时候取消 Task 即可
        _incomeTimer = yield fork(function *() {
          try {
            while (true) {
              yield delay(3000);
              yield put({
                type: 'updateBalance',
                payload: {
                  incomeRate: totalRate,
                  price: totalPrice
                }
              })
            }
          } finally {
            if (yield cancelled()) {
              // 取消之后的操作，这里什么都不做
            }
          }
        });
      }else{
        _incomeTimer = null;
      }

      //console.log(incomeQueue)

      yield put({
        type: 'setIncomeQueue',
        payload: incomeQueue
      });
    },
  },
};
