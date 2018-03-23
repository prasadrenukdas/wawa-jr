import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Home',
    title: 'WAWA JR',
    animated: true,
    animationType: 'fade',
    navigatorStyle: {
      navBarTextColor: 'rgb(66, 32, 5)',
      navBarTextFontSize: 20,
      navBarHideOnScroll: true,
      navBarButtonColor: 'rgb(66, 32, 5)',
    },
  },
});
