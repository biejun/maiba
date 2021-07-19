import css from './404.less';

export default ({ location }) => {

  document.title = '404 Not Found Page - 买吧';

  return (
    <div className="app-content">
      <div className={css.notFoundPage}>
        <p><a href="/" class={css.link}>点击这里进入游戏</a></p>
      </div>
    </div>
  )
}
