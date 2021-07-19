import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import css from './spinner.less'

class Spinner extends React.Component{

  render() {
    const loading = this.props;
    const svgCls = cls({
      [css.spinner]: true,
      [css.show]: loading,
    });
    return (
      <div>
        <svg className={svgCls} width="44px" height="44px" viewBox="0 0 44 44">
          <circle className={css.path} fill="none" strokeWidth="4" strokeLinecap="round" cx="22" cy="22" r="20" />
        </svg>
      </div>
    )
  }
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner;
