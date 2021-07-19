import React from 'react';
import { debounce } from 'lodash';
import cls from 'classnames';
import {formatMoney} from "../utils/numbers";

class AmountUpdate extends React.Component{

  constructor(props) {

    super(props);

    this.state = {
      showAmount: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.amount !== 0 && !prevState.showAmount && !this.state.showAmount) {
      this.setState({
        showAmount: true
      });
      debounce(function () {
        let { dispatch } = this.props;
        this.setState({
          showAmount: false
        });
        dispatch({
          type: 'money/setAmount',
          payload: 0
        })
      }.bind(this) , 1500)();
    }
  }

  render() {

    let { behaviour, amount } = this.props;

    let { showAmount } = this.state;

    return (
      <div className={cls(['amountUpdate', showAmount ? 'showAmount' : ''])}>
        {amount !== 0 ? behaviour === 'buy' ? '-' : '+' : ''}{amount !== 0 ? formatMoney(amount, 2) : ''}
      </div>
    )
  }
}

export default AmountUpdate;
