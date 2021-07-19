import React from 'react';
import { connect } from 'dva';
import css from './analysis.less';
import {add, multiply, divide, formatMoney} from '../utils/numbers';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';

function calcSpeed(startTime, endTime) {
  let seconds = Math.floor((endTime - startTime) / 1000); //未来时间距离现在的秒数
  let days = Math.floor(seconds / 86400); //整数部分代表的是天；一天有24*60*60=86400秒 ；
  seconds = seconds % 86400; //余数代表剩下的秒数；
  let hours = Math.floor(seconds / 3600); //整数部分代表小时；
  seconds %= 3600; //余数代表 剩下的秒数；
  let minute = Math.floor(seconds / 60);
  seconds %= 60;

  let speed  = '';
  if(days > 0) {
    speed += ` ${days}天 `;
  }
  if(hours > 0) {
    speed += ` ${hours}小时 `;
  }
  if(minute > 0) {
    speed += ` ${minute}分钟 `;
  }
  if(seconds > 0) {
    speed += ` ${seconds}秒 `;
  }
  return speed;
};

class Analysis extends React.Component{

  constructor(props) {
    super(props);

    const { money, common, warehouse, types } = this.props;
    const { totalAssets } = money;
    const speed = calcSpeed(common.startTime, new Date().getTime());

    // 分析消费行为，记录个数与总数
    const consumerBehavior = [];

    types.forEach(v => {
      let count = 0, amount = 0;
      let data = warehouse.filter(item => item.type === v.code);
      data.forEach(item => {
        count = add(count, item.count);
        amount = add(amount, multiply(item.price, item.count));
      });
      consumerBehavior.push({
        ...v,
        count,
        amount,
        percent: multiply(divide(amount, totalAssets), 100)
      })
    });

    let maxCount = Math.max.apply(null, consumerBehavior.map(v => v.count));
    let maxAmount = Math.max.apply(null, consumerBehavior.map(v => v.amount));

    let report = {
      maxCount: {
        type: '',
        count: 0
      },
      maxAmount: {
        type: '',
        amount: ''
      }
    };
    console.log(maxAmount)
    consumerBehavior.forEach(v => {
      if(v.count === maxCount) {
        report.maxCount = {
          type: v.name,
          count: v.count
        }
      }

      if(v.amount === maxAmount) {
        report.maxAmount = {
          type: v.name,
          amount: v.amount
        }
      }
    });

    this.state = {
      speed,
      consumerBehavior,
      report
    }
  }

  handleSave() {
    let dom = document.getElementById("analysis-result");
    let width = dom.offsetWidth, height = dom.offsetHeight,
      offsetX = window.scrollX + dom.getBoundingClientRect().left,
      offsetY = window.scrollY + dom.getBoundingClientRect().top;

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
    const { speed, consumerBehavior, report } = this.state;
    return (
      <div>
        <div id="analysis-result" className={css.resultWrap}>
          <div className={css.result}>
            <div className={css.itemTitle}>花光耗时</div>
            <div className={css.itemContent}><strong className={css.speed}>{speed}</strong></div>
            <div className={css.itemTitle}>消费行为分析</div>
            <div className={css.itemContent}>
              <ul className={css.consumerBehavior}>
                {
                  consumerBehavior.map(v =>
                      <li key={v.code}>
                  <span>
                    {v.name}
                  </span>
                        <span className={css.progressBar} data-title={'支出 '+formatMoney(v.amount)+'元'}>
                    <div className={css.progressInner} style={{width: v.percent+'%'}}></div>
                  </span>
                      </li>
                  )
                }
              </ul>
              <p>您在<strong>{report.maxCount.type}</strong>领域数量最多，一共买下<strong>{report.maxCount.count}</strong>个</p>
              <p>您在<strong>{report.maxAmount.type}</strong>领域花钱最多，一共花了<strong>{formatMoney(report.maxAmount.amount)}</strong>元</p>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="app-btn" onClick={this.handleSave}>
            <svg className={css.download} viewBox="0 0 1024 1024" width="16" height="16">
              <path
                d="M878 570c18.59 0 33.695 14.92 34 33.438v216.288c0 50.488-40.648 91.448-91.024 92.262l-1.53 0.012H204.554c-50.568 0-91.723-40.454-92.54-90.747l-0.013-1.527V604c0-18.778 15.222-34 34-34 18.59 0 33.695 14.92 33.995 33.438L180 604v240h664V604c0-18.778 15.222-34 34-34zM514 113c17.673 0 32 14.327 32 32v460.752l108.704-108.785 0.4-0.394c13.303-12.887 34.533-12.764 47.683 0.377l0.395 0.4c12.887 13.302 12.763 34.533-0.377 47.683L542.43 705.524l-0.177 0.2c-0.145 0.16-0.267 0.282-0.4 0.408l-0.29 0.268c-16.416 16.405-43.034 16.388-59.424-0.058l-161.19-161.31-0.395-0.4c-12.877-13.312-12.738-34.542 0.412-47.682l0.401-0.395c13.312-12.877 34.542-12.738 47.682 0.412L478 606V145c0-17.673 14.327-32 32-32z"
                p-id="3050"></path>
            </svg>
            保存图片
          </button>
        </div>
      </div>
    )
  }
}

Analysis.propTypes = {

};

export default connect((state) => (state))(Analysis);
