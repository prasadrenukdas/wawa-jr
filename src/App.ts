import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { configureStore } from 'src/Store';
import { registerScreens } from './screens';

const store = configureStore();

// Register navigation for the app. Update this file to register all navigation
// paths for the app, set the base navigation type (single screen, tabs, or
// other options available), and handle initial navigation.

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Home',
    title: 'WAWA JR',
  },
});
