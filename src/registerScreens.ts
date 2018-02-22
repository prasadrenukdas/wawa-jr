import { Navigation } from 'react-native-navigation';

import HomeScreen from 'src/HomeScreen';

export function registerScreens() {
  Navigation.registerComponent('Home', () => HomeScreen);
}
