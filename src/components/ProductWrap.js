import React from 'react';
import {connect} from "dva";
import css from '../views/index.less';
import ProductItem from './ProductItem';

class ProductWrap extends React.Component{

  render() {
    const { type, typeData } = this.props.store;
    const data = Object.values(typeData);
    const types = Object.keys(typeData);

    return (
      <div id="products">
        {
          data.map((products, i) =>
            <div className={[css.productWrap, type === types[i] ? '' : 'hide' ].join(' ')} key={i}>{
              products.map((v, k) => <div className={css.productCol} key={k}>
                <ProductItem {...v} type={types[i]}></ProductItem>
              </div>)
            }</div>
          )
        }
      </div>
    )
  }
}

export default connect((state) => (state))(ProductWrap);
