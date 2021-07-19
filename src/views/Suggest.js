import React from 'react';
import css from './suggest.less';

class Suggest extends React.Component{

  render() {
    document.title = '意见反馈 - 买吧';

    return (
      <div className="app-content">
        <div className={css.suggest}>
          <h3>#1 没有我想要购买的商品</h3>
          <p>请将您想要购买商品的<strong>名称</strong>、<strong>价格</strong>以及<strong>图片</strong>发送至我们的邮箱。</p>
          <br/>
          <h3>#2 我有一个大胆的想法</h3>
          <p>请将您大胆的想法或者要对我们说的话留言至我们的邮箱。</p>
          <br/>
          <h3>#3 关于消费时头像上出现的鸡汤</h3>
          <p>所有鸡汤内容来自网络，不代表马云先生说过此类话。</p>
          <p>如果你有好的鸡汤也可以分享给我们，鸡汤内容将会在消费时以气泡形式展现在头像上。</p>
          <br/>
          <div className={css.disclaimer}>
            <p>投递邮箱：314704059@qq.com （只要Maiba.Fun还在，投递长期有效）</p>
            <p style={{fontSize:'12px'}}>免责申明：网站中出现的文案、配图及价格仅供大众娱乐或参考，无任何商业营利目的，其中如有侵犯到您的权利，请联系我们尽快删除</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Suggest;
