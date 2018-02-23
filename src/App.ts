import { Navigation } from 'react-native-navigation';

import HomeScreen from 'src/HomeScreen';

// Register navigation for the app. Update this file to register all navigation
// paths for the app, set the base navigation type (single screen, tabs, or
// other options available), and handle initial navigation.

Navigation.registerComponent('Home', () => HomeScreen);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Home',
    title: 'Home',
  },
});
