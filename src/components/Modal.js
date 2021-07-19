import React, {Fragment} from 'react';
import Portal from './Portal';
import PropTypes from 'prop-types';

/*
* 一个简易的modal实现
* */
const windowIsUndefined = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const getParent = getContainer => {
  if (windowIsUndefined) {
    return null;
  }
  if (getContainer) {
    if (typeof getContainer === 'string') {
      return document.querySelectorAll(getContainer)[0];
    }
    if (typeof getContainer === 'function') {
      return getContainer();
    }
    if (
      typeof getContainer === 'object' &&
      getContainer instanceof window.HTMLElement
    ) {
      return getContainer;
    }
  }
  return document.body;
};

function ModelWrap(props) {
  const { handleClose, modalStyle, title } = props;
  // Fragment => <> </>
  return (
    <Fragment>
      <div className="modal-mask"></div>
      <div className="modal-wrapper">
        <div className="modal" style={{...modalStyle}}>
          <div className="modal-title">
            {title || ''}
          </div>
          <button onClick={handleClose} className="modal-close"><i className="icon icon-close"></i></button>
          <div className="modal-content">

            {props.children}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

function bodyHasOverflow() {
  return (
    document.body.scrollHeight >
    (window.innerHeight || document.documentElement.clientHeight) &&
    window.innerWidth > document.body.offsetWidth
  );
}

function getScrollBarWidth() {
  var scrollDiv = document.createElement("div");
  scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

class Modal extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const { visible } = this.props;
    if(this.container) {
      if(visible) {
        let scrollBarWidth = getScrollBarWidth();
        if (scrollBarWidth > 0 && bodyHasOverflow) {
          document.body.style.width = 'calc(100% - '+scrollBarWidth+'px)';
        }
        document.body.classList.add('body-hidden');
        this.container.style.display = null;
      }else{
        document.body.style.width = null;
        document.body.classList.remove('body-hidden');
        this.container.style.display = 'none';
      }
    }
  }

  componentWillUnmount() {
    this.container = null;
    this._component = null;
  }

  savePortal = c => {
    this._component = c;
  };

  getContainer = () => {
    if (windowIsUndefined) {
      return null;
    }
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'modal-root';
      const parent = getParent(this.props.getContainer);
      if (parent) {
        parent.appendChild(this.container);
      }
    }
    return this.container;
  };

  render() {
    const { children, visible, handleClose, modalStyle, title } = this.props;
    let portal = null;

    if (visible || this._component) {
      portal = (
        <Portal getContainer={this.getContainer} ref={this.savePortal}>
          <ModelWrap title={title} modalStyle={modalStyle} handleClose={handleClose}>{children}</ModelWrap>
        </Portal>
      );
    }
    return portal;
  }
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  modalStyle: PropTypes.object,
  title: PropTypes.string
};

export default Modal;
