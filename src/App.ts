import { Navigation } from 'react-native-navigation';
import { registerScreens } from 'src/registerScreens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Home',
    title: 'Home',
  },
});
