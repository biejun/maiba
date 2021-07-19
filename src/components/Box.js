import React from 'react';
import css from './box.less'

class Box extends React.Component {

  render() {
    return (
      <div className={css.box}>
        {this.props.children}
      </div>
    )
  }
}

export default Box;
