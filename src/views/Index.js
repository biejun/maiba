import React from 'react';
import { throttle } from 'lodash';
import { connect } from 'dva';
import cls from 'classnames';
import css from './index.less';

import ProductWrap from '../components/ProductWrap';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import Analysis from '../components/Analysis';

import { getProducts } from '../services/store';

/**
 首页
 @based React 16.4.1
 @date 2020.03.28

 todo
 4. 消费行为分析

 特别策划： 挑选值得展示的商品
 */

class Index extends React.Component {

  constructor(props) {

    super(props);

    const { store } = this.props;

    this.state = {
      types: [
        {
          name: '出行',
          code: 'journey'
        },
        {
          name: '美食',
          code: 'food'
        },
        {
          name: '数码',
          code: 'digital'
        },
        {
          name: '时尚',
          code: 'fashion'
        },
        {
          name: '投资',
          code: 'investment'
        },
        {
          name: '任性',
          code: 'charity'
        },
      ],
      loading: true
    };


    this.$storeWrap = React.createRef();
    this.$storeWrapTop = 0;


    let $products = document.getElementById('products');
    if(!$products || !$products.hasChildNodes()) {

      document.title = '挥霍马云爸爸的财富 | 富豪模拟器 | 买吧';

      this.getTypeData(store.type);
    }else{
      this.state.loading = false;
    }

    if(navigator.userAgent !== 'ReactSnap' && !this.props.money.isStart) {
      this.handleShow(1, true);
    }
  }

  getTypeData(typeCode) {

    const { dispatch } = this.props;

    getProducts(typeCode).then(res => {
      dispatch({
        type: 'store/setProducts',
        payload: {
          typeCode,
          products: res.data.products
        }
      });
      this.setState({
        loading: false
      })

    }).catch(e => {
      this.setState({
        loading: false
      })
    });
  }

  scrollWindowHandler() {
    let scrollHeight = window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop || 0;
    let offsetTop = this.$storeWrapTop;

    if(offsetTop) {

      const { dispatch, common } = this.props;

      if(scrollHeight >= offsetTop - 25) {

        !common.headerFixed && dispatch({
          type: 'common/setHeaderFixed',
          payload: true
        });

      }else if(scrollHeight < offsetTop){

        common.headerFixed && dispatch({
          type: 'common/setHeaderFixed',
          payload: false
        });
      }
    }
  }

  componentDidMount() {

    let $storeWrap = this.$storeWrap.current;
    if($storeWrap) this.$storeWrapTop = $storeWrap.offsetTop;

    this.onScroll = throttle(this.scrollWindowHandler.bind(this), 200);

    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    if(this.onScroll) {

      this.props.dispatch({
        type: 'common/setHeaderFixed',
        payload: false
      });

      window.removeEventListener('scroll', this.onScroll);
    }
  }

  onChangeType(typeCode) {

    const { dispatch, store } = this.props;

    dispatch({
      type: 'store/setType',
      payload: typeCode
    });

    if(!store.typeData[typeCode]) {

      this.setState({
        loading: true
      });

      dispatch({
        type: 'store/setProducts',
        payload: {
          typeCode,
          products: []
        }
      });

      this.getTypeData(typeCode);
    }
  }

  handleShow(type = 1, status) {
    this.props.dispatch({
      type: type === 1 ? 'money/showStartUse' : 'money/showSpentAll',
      payload: status || false
    });
  }

  startUse() {
    this.props.dispatch({
      type: 'common/setStartTime'
    });
    this.handleShow(1, false);
  }

  render() {
    const { types, loading } = this.state;
    const { type } = this.props.store;
    const { showStartUse, showSpentAll } = this.props.money;

    return (
      <div className="app-content">
        <div className={css.storeTypes} ref={this.$storeWrap}>{

          types.map(v => <div key={v.code} className={css.typeItem}>
              <span className={cls({
                [css.typeItemName]: true,
                [css.typeItemNameActive]: v.code === type
              })} onClick={this.onChangeType.bind(this, v.code)}>{v.name}</span>
          </div>)

        }</div>
        {
          loading ?
            <div className={cls([css.loadingWrap, css.loading])}>
              <Spinner loading={true}></Spinner>
            </div>
            : <ProductWrap></ProductWrap>
        }
        <Modal visible={showStartUse}
               title={'😊 \u00a0\u00a0何以解忧，唯有买买买'}
               modalStyle={{top:'13vh',width:'320px'}}
               handleClose={this.handleShow.bind(this, 1, false)}>
          <p className={css.welcomeText}>马云爸爸曾说"花钱是一门很高的技术"，来看看你花光马云的3021亿需要多久...</p>
          <button onClick={this.startUse.bind(this)} type="button" className="app-btn app-btn-primary">开始花钱</button>
        </Modal>
        <Modal visible={showSpentAll}
               title={'马云的财富已被您挥霍一空'}
               modalStyle={{top:'13vh',width:'320px'}}
               handleClose={this.handleShow.bind(this, 2, false)}>
          <Analysis types={types}/>
        </Modal>
      </div>
    )
  }
}

export default connect((state) => (state))(Index);
