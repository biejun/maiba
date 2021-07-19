import React from 'react';
import { connect, router } from 'dva';
import cls from 'classnames';
import css from './header.less';

import  { CSSTransitionGroup } from 'react-transition-group';
import AmountUpdate from './AmountUpdate';

import {formatMoney} from "../utils/numbers";
import avatar from '../assets/img/mayun.jpg';
import avatarCry from '../assets/img/mayuncry.jpg';
import logo from '../assets/img/logo.png';

const { NavLink, withRouter } = router;

class Header extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      menu: [
        {title: '商店', to: '/'},
        {title: '仓库', to: '/warehouse.html'}
      ]
    }
  }

  render() {
    const { menu } = this.state;
    const { dispatch, money, common } = this.props;
    const { behaviour, amount } = money;
    const balance = formatMoney(money.balance, 2);
    const { headerFixed , hasProduct, say, showSay} = common;

    return (
      <header className={css.header}>
        <div className={cls([css.headerHook, headerFixed ? css.headerFixed : ''])}>
          <div className={cls([[css.headerWrap], 'cf'])}>
            <NavLink to="/" className={css.logo}>
              <img src={logo} alt="MaiBa.Fun"/>
            </NavLink>
            <div className={css.content}>
              <div className={cls([[css.assets], 'cf'])}>
                <div className={cls([css.message, showSay ? css.showMessage : ''])}>
                  {say}
                </div>
                <div className={css.avatar}>

                  <img src={behaviour === 'buy' ? avatarCry : avatar} alt="mayun"/>
                </div>
                <div className={css.assetStatus}>
                  <h3 className={css.assetsUser}>
                    挥霍马云爸爸的财富
                  </h3>
                  <div className={css.assetsMoney}>
                    <div className={css.verticalMiddle}>
                      <span>可用余额 (元)</span>
                      <NavLink to="/reference.html" className={css.info} title="数据来源"><i className="icon icon-tishi"></i></NavLink>
                    </div>
                    <CSSTransitionGroup component="div"
                                        transitionName={behaviour === 'buy' ? 'number' : 'number-increase'}
                                        className={css.assetBalance}
                                        transitionEnterTimeout={200}
                                        transitionLeaveTimeout={200}>
                      <div key={balance} className={css.dynamicNumber}>{balance}</div>
                    </CSSTransitionGroup>
                    <div className={cls([css.amount, behaviour === 'buy' ? 'neg' : 'pos'])}>
                      <AmountUpdate dispatch={dispatch} behaviour={behaviour} amount={amount}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.menuWrap}>
              <ul className={css.menu}>
                {menu.map((value, key) =>
                  <li key={key}>
                    <NavLink to={value.to}
                             activeClassName={css.active}
                             exact>
                      {value.to === '/warehouse.html' && hasProduct ? <sup className={css.dot}></sup> : null}
                      {value.title}</NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
};

// 因为connect()实现了shouldComponentUpdate，导致路由更新时header不会重新渲染
// 可以通过两种方式解决，一种是Redux提供的方案，将pure置为false 如 connect((state) => (state), null, null, {pure: false}
// 但这会产生性能消耗，更好的办法是采用React-Router 提供的withRouter包装一下Redux的connect
export default withRouter(connect((state) => (state))(Header));
