import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import stores from './lib/root.store';
import lazyLoad from './components/lazy-load';
import ProtectedRoute from './components/protected-route';

const LandingPage = lazyLoad(() => import('./containers/landing'));
const NotesPage = lazyLoad(() => import('./containers/notes'));

class App extends Component {
  render() {
    return (
      <Provider {...stores}>        
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/notes" component={NotesPage} />
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default observer(App);
