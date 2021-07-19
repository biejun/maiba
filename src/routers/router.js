import React from 'react';
import { router, dynamic } from 'dva';
import ScrollToTop from '../components/ScrollToTop';

import Index from '../views/Index';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Warehouse from '../views/Warehouse';
import Reference from '../views/Reference';

const NoMatch = dynamic({
  component: () => import('../views/404')
});

const Suggest = dynamic({
  component: () => import('../views/Suggest')
});

const { Router, Route, Switch } = router;

function RouterConfig({ history }) {

  return (
    <Router history={history}>
      <div className="app-layout">
        <ScrollToTop/>
        <Header/>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/warehouse.html" component={Warehouse} />
          <Route path="/suggest.html" component={Suggest} />
          <Route path="/reference.html" component={Reference} />
          <Route component={NoMatch} />
        </Switch>
        <Footer/>
      </div>
    </Router>

  );
}

export default RouterConfig;
