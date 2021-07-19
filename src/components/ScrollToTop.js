import React from "react";
import { router } from "dva";
const { withRouter } = router;

class ScrollToTop extends React.Component {

  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
