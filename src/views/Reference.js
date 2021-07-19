import React from 'react';
import css from './reference.less'

class Reference extends React.Component{
  render() {
    document.title = '马云3021亿元登顶中国富人榜 - 买吧';

    return (
      <div className="app-content">
        <div className={css.articleWrap}>
          <div className={css.articleTitle}>
            <h1>马云3021亿元登顶中国富人榜</h1>
            <time>2020-05-12 09:00</time>
          </div>
          <div className={css.articleContent}>
            <p>据榜单显示，中国最富有的10人分别是马云（3021.4亿元）、马化腾（2767.3亿元）、许家印（1981亿元）、杨惠妍（1769.2亿元）、孙飘扬/钟慧娟（1738.8亿元）、何享健家族（1652.7亿元）、王健林/王思聪（1381.5亿元）、黄峥（1368.4亿元）、丁磊（1245.5亿元）、张勇/舒萍（1172.1亿元），他们的总财富水平达到1.8万亿元。</p>
            <p className={css.articleImage}>
              <img src="http://5b0988e595225.cdn.sohucs.com/images/20200512/0d4b13ec7e3f4550ae242ce994f2a3b3.png" alt="财富排行榜" />
            </p>
            <p>
              从整体来看，前500富人的总财富首次突破10万亿元大关，再创历史新高，上榜门槛在去年大跌至45亿元之后，回升至63.3亿元，同比大涨40%，上榜者的人均财富则从2019年的162亿元升至214亿元，创下历史新高。榜单上6成富人财富上涨超过10%，4成富人上涨超过50%。值得注意的是，今年百亿富人已达315位。
            </p>
            <p>
              从行业来看，互联网的创富能量呈聚合态势，新富更是如雨后春笋。互联网行业今年在榜单上再次大肆扩张，上榜者数量从去年的80人增加到96人，人数同比上涨20%。对于仅有500人的顶级富人榜单来说，互联网创富已实现榜单垄断。此外，机械电气设备、医药生物、日用消费品等行业上榜人数分列第2至4名。
            </p>
            <p>
              小编想说：<strong>虽然榜中没有找到你的名字，但我相信，只有毒鸡汤喝到饱，成功的运气就不会跑，相信将来的你定会成为有钱人，毕竟马爸爸还说，"人还是要有梦想的，万一哪天实现了呢？"</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Reference;
