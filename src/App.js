import React, { Component } from 'react';
import '../src/styles/app.min.css';

import UsersListContainer from './containers/UsersListContainer';

class App extends Component {

  render() {
    return (
      <div className="app">
        <UsersListContainer />
      </div>
    );
  }
}

export default App;
