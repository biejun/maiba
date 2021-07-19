import React from 'react';
import { router } from 'dva';
import css from './footer.less';
const { NavLink } = router;

class Footer extends React.Component{
  render() {
    return (
      <footer className={css.footer}>
        <p>这是一个可以体验富豪花钱的网站，喜欢记得点击☆收藏哦~</p>
        <p>© 2020 MaiBa.Fun <span><NavLink to="/suggest.html" title="意见反馈">意见反馈</NavLink></span></p>
      </footer>
    )
  }
}

export default Footer;
