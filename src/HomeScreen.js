// NOTE: This file exists for hot reloading with react-native-navigation
// Currently this module requires a default es6-style export which is
// impossible with TypeScript. Fortunately this thin wrapper does the job.
//
// You will have to create a similar wrapper for any other screen-level
// components if you want hot reloading of those screens to work properly

import React from 'react';
import { Provider } from 'react-redux';

import { Home } from './Home';
import { store } from 'src/Store';

// For reasons that are unclear to me this only works with a class component
// and not with an SFC
class HomeScreen extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home {...this.props} />
      </Provider>
    );
  }
}

export default HomeScreen;
