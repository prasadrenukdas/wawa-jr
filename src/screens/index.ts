import { Navigation } from 'react-native-navigation';
import { Home } from 'src/home/HomePage';
import { MakeMyMeal } from 'src/makeMyMeal/MakeMyMeal';
import { Mains } from 'src/components/Mains';
import { Drinks } from 'src/components/Drinks';
import { Sides } from 'src/components/Sides';

export function registerScreens() {
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('MakeMyMeal', () => MakeMyMeal);
  Navigation.registerComponent('Mains', () => Mains);
  Navigation.registerComponent('Drinks', () => Drinks);
  Navigation.registerComponent('Sides', () => Sides);
}
