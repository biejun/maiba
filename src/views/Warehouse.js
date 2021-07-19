import React from 'react';
import {connect} from 'dva';
import { multiply } from '../utils/numbers';
import Modal from '../components/Modal';

import css from './warehouse.less';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';

/**
 仓库
 @date 2018.07.28
 */
class Warehouse extends React.Component {

  constructor(props) {

    super(props);

    const { dispatch, common } = this.props;

    if(common.hasProduct) {
      dispatch({
        type: 'common/setWarehouseStatus',
        payload: false
      });
    }

    document.title = '仓库 - 买吧';
  }

  onSell(v) {
    const { dispatch } = this.props;
    const { price, count, name, type } = v;
    const income = multiply(multiply(price, count), 0.3);
    const havIncome = type === 'investment';

    dispatch({
      type: 'warehouse/remove',
      payload: v
    });

    dispatch({
      type: 'money/income',
      payload: income
    });

    if(havIncome) {
      dispatch({
        type: 'money/updateIncomeQueue',
        payload: {
          type,
          name,
          incomeRate: 0,
          price,
          isRemove: true
        }
      });
    }
  }

  handleShow(status) {
    this.props.dispatch({
      type: 'money/showWealth',
      payload: status || false
    });
  }

  handleSave() {
    let dom = document.getElementById("result");
    let width = dom.offsetWidth, height = dom.offsetHeight,
      offsetX = window.scrollX + dom.getBoundingClientRect().left,
      offsetY = window.scrollY + dom.getBoundingClientRect().top - 10;

    html2canvas(dom, {
      scale: 1,
      width: width,
      height: height,
      x: offsetX,
      y: offsetY
    }).then(canvas => {
      FileSaver.saveAs(canvas.toDataURL("image/png"), 'image.png');
    });
  }

  render() {
    const { warehouse } = this.props;
    const { showWealth } = this.props.money;

    return (
      <div className="app-content">
        <div className={css.warehouse}>
          <div className={css.header}>
            <span className={css.title}>仓库</span>
            <span className={css.xuanfu}>
              <button type="button" className={['app-btn', warehouse.length ? '' : 'hide'].join(' ')} onClick={this.handleShow.bind(this, true)}>打印消费小票</button>
            </span>
          </div>
          {
            warehouse.length ?
              warehouse.map((v, k) =>
                <div className={css.productItem} key={k}>
                  <div className={css.productItemBody}>
                    <div className={css.productImage}><img src={v.image} alt=""/></div>
                    <div className={css.productInfo}>
                      <div className={css.productName}>{v.name}</div>
                      ￥{v.price} × <strong>{v.count}</strong>
                    </div>
                  </div>
                  {v.type === 'charity' ? null : <div className={css.productOperation}>
                    <button className="app-btn app-btn-primary" onClick={this.onSell.bind(this, v)}>3折甩卖</button>
                  </div>}

                </div>
              ) : <div className={css.noData}>
                <div className={css.noContent}><i className="icon icon-qian"></i></div>
                <div>穷得只剩下钱了~</div>
              </div>
          }
        </div>
        <Modal visible={showWealth}
               title={'打印消费小票'}
               modalStyle={{top:'13vh',width:'320px'}}
               handleClose={this.handleShow.bind(this, false)}>
          <div>
            <div>
              <button type="button" className="app-btn" onClick={this.handleSave}>
                <svg className={css.download} viewBox="0 0 1024 1024" width="16" height="16">
                  <path
                    d="M878 570c18.59 0 33.695 14.92 34 33.438v216.288c0 50.488-40.648 91.448-91.024 92.262l-1.53 0.012H204.554c-50.568 0-91.723-40.454-92.54-90.747l-0.013-1.527V604c0-18.778 15.222-34 34-34 18.59 0 33.695 14.92 33.995 33.438L180 604v240h664V604c0-18.778 15.222-34 34-34zM514 113c17.673 0 32 14.327 32 32v460.752l108.704-108.785 0.4-0.394c13.303-12.887 34.533-12.764 47.683 0.377l0.395 0.4c12.887 13.302 12.763 34.533-0.377 47.683L542.43 705.524l-0.177 0.2c-0.145 0.16-0.267 0.282-0.4 0.408l-0.29 0.268c-16.416 16.405-43.034 16.388-59.424-0.058l-161.19-161.31-0.395-0.4c-12.877-13.312-12.738-34.542 0.412-47.682l0.401-0.395c13.312-12.877 34.542-12.738 47.682 0.412L478 606V145c0-17.673 14.327-32 32-32z"
                    p-id="3050"></path>
                </svg>
                下载
              </button>
            </div>
            <div className={css.recordsWrap}>
              <div id="result" className={css.records}>
                <div className={css.systemText}>尊贵的钻石VIP会员您好,以下是您的消费记录</div>
                {
                  warehouse.map((v, k) =>
                    <div className={css.productItem} key={k}>
                      <div className={css.productItemBody}>
                        <div className={css.productImage}><img src={v.image} alt=""/></div>
                        <div className={css.productInfo}>
                          <div className={css.productName}>{v.name}</div>
                          ￥{v.price} × <strong>{v.count}</strong>
                        </div>
                      </div>
                    </div>)
                }
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default connect((state) => (state) )(Warehouse);
