import React from 'react';
import { debounce } from 'lodash';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cls from 'classnames';
import css from './productItem.less';
import { multiply, formatMoney } from '../utils/numbers';

// 随机取值
function shuffle(array) {
  let currentIndex = array.length
    , temporaryValue
    , randomIndex
  ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class ProductItem extends React.Component{

  constructor(props) {

    super(props);

    let havIncome = props.type === 'investment';
    let incomeRate = 0;
    if(havIncome) {
      let rate = [-30, -20, -10, -5, -2.5, 2.5, 5, 10, 20, 30];
      incomeRate = shuffle(rate)[0];
    }

    this.state = {
      count: 1,
      value: this.calcTotalAmount(1),
      haveBought: false,
      isFocus: false,
      havIncome,
      incomeRate
    };

    this.$timer = null;

  }

  handleBuy() {

    const { dispatch, store, image, name, price } = this.props;

    const { count, value, havIncome, incomeRate } = this.state;

    const type = store.type;

    dispatch({
      type: 'warehouse/add',
      payload: {
        type,
        image,
        name,
        price,
        count
      }
    });

    dispatch({
      type: 'money/spend',
      payload: value
    });

    if(havIncome) {
      dispatch({
        type: 'money/updateIncomeQueue',
        payload: {
          type,
          name,
          incomeRate,
          price
        }
      });
    }

    dispatch({
      type: 'common/setWarehouseStatus',
      payload: true
    });

    dispatch({
      type: 'common/mySay',
      payload: shuffle(window.says[name === '让马爸爸夸我一下' ? 'praise' :type])[0]
    });

    this.setState({
      count: 1,
      value: this.calcTotalAmount(1),
      haveBought: true
    });

    // 清除正在运行的定时任务
    if(this.$timer)  this.$timer.cancel();

    this.$timer = debounce(function () {
      this.setState({
        haveBought: false
      });
      this.$timer = null;
    }.bind(this) , 1000);
    this.$timer();
  }

  onFocus() {
    this.setState({
      isFocus: true
    });
  }

  onBlur() {
    this.setState({
      isFocus: false
    });
  }

  calcTotalAmount(count) {
    let { price } = this.props;
    return multiply(price, count);
  }

  handleNumberInput(event) {
    let count = Math.abs(event.target.value);

    this.setState({
      count,
      value: this.calcTotalAmount(count),
    });
  }

  increase() {
    this.setState((state) => {
      let count = state.count + 1;
      return {
        count,
        value: this.calcTotalAmount(count)
      }
    });
  }

  decrease() {
    this.setState((state) => {
      let count = state.count > 0 ? state.count - 1 : 0;
      return {
        count,
        value: this.calcTotalAmount(count)
      }
    });
  }

  componentWillUnmount() {
    // 清除正在运行的定时任务
    if(this.$timer)  this.$timer.cancel();
    //if(this.$sayTimer) this.$sayTimer.cancel();
  }

  render() {

    let { image, name, price, isUser } = this.props;
    const { count, value, haveBought, isFocus, havIncome, incomeRate } = this.state;

    //console.log(this.state)
    const { balance } = this.props.money;
    price = formatMoney(price, 2);

    return (
      <div className={css.productItem}>
        <div className={css.productRef}>{isUser? '网友提供': ''}</div>
        <div className={css.productImage}>
          <img src={image} alt=""/>
          <div className={cls([css.haveBought, haveBought ? css.showBought : ''])}>
            <span className={css.shoppingCar}>
              <i className="icon icon-gouwuche"></i>
            </span>
            <span>
              支付成功
            </span>
          </div>
        </div>
        <div className={css.productInfo}>
          <h3 className={css.productName}>{name}</h3>
          <div className={css.productPrice}>
            <small>￥</small>
            <span>{price}</span>
            {havIncome ? <strong title="收益率" className={cls([css.productIncome, incomeRate>0 ? 'pos' : 'neg'])}>{incomeRate>0?'+':''}{incomeRate}%</strong> : null}
          </div>
          <div className={cls({
            [css.productBuy]: true,
            'cf': true
          })}>
            <div className={cls([css.buyLeft, isFocus ? css.buyLeftFocus : ''])}>
              <div className={css.buyNumberInputLeft}>
                <div role="button" className={cls([css.numberHandle, value === 0 ? css.numberHandleDisabled: ''])}
                     onClick={this.decrease.bind(this)}>
                  <span><i className="icon icon-move"></i></span>
                </div>
              </div>
              <input type="number" min="0" value={count}
                     onFocus={this.onFocus.bind(this)}
                     onBlur={this.onBlur.bind(this)}
                     onChange={this.handleNumberInput.bind(this)}/>
              <div className={css.buyNumberInputRight}>
                <div role="button" className={cls([css.numberHandle])}
                     onClick={this.increase.bind(this)}>
                  <span><i className="icon icon-add"></i></span>
                </div>
              </div>
            </div>
            <div className={css.buyRight}>
              <button type="button" className="app-btn app-btn-primary"
                      onClick={this.handleBuy.bind(this)}
                      disabled={count === 0 || value === 0 || value > balance}
              >{value > balance ? '买不起' : this.props.customText ? this.props.customText : '买买买'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductItem.propTypes = {
  price: PropTypes.number
};

export default connect((state) => (state))(ProductItem);
