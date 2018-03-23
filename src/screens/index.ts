import { Navigation } from 'react-native-navigation';
import { Home } from 'src/home/HomePage';
import { MakeMyMeal } from 'src/makeMyMeal/MakeMyMeal';

export function registerScreens() {
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('MakeMyMeal', () => MakeMyMeal);
}
