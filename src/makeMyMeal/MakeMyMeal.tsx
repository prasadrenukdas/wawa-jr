import * as React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  ViewStyle,
  View,
  Text,
  TextStyle,
  TouchableHighlight,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Mains } from 'src/components/Mains';
import { Sides } from 'src/components/Sides';
import { Drinks } from 'src/components/Drinks';
import { Example } from 'src/carouselExample/ExamplePage';
const Carousel = require('react-native-carousel');
const { width } = Dimensions.get('window');
const height = width * 0.8;
interface Props {}

interface State {
  data: any;
  mains: any;
  sides: any;
  drinks: any;
}
export class MakeMyMeal extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      mains: [],
      drinks: [],
      sides: [],
    };
  }
  onPressButton() {}

  componentWillMount() {
    fetch('https://s3.amazonaws.com/mob-training/wawa/wawa-jr.json')
      .then(data => data.json())
      .then(data => {
        const map1 = data.menu.main.map(item => {
          return {
            illustration: item.url,
            title: item.name,
          };
        });
        const map2 = data.menu.drink.map(item => {
          return {
            illustration: item.url,
            title: item.name,
          };
        });
        const map3 = data.menu.side.map(item => {
          return {
            illustration: item.url,
            title: item.name,
          };
        });
        this.setState({
          mains: map1,
          drinks: map2,
          sides: map3,
        });
        return [{ mains: map1 }, { drinks: map2 }, { sides: map3 }];
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight onPress={this.onPressButton} underlayColor="white">
          <View style={styles.mainsContainer}>
            <View>
              <Text style={styles.makeMyMealHeader}>Main Course</Text>
            </View>
            <View style={styles.scrollContainer}>
              <Example data={this.state.mains} />
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.sidesContainer}>
          <Text style={styles.recentHeader}>Sides</Text>
          <View style={styles.scrollContainer}>
            <Example data={this.state.sides} />
          </View>
        </View>
        <View style={styles.drinksContainer}>
          <Text style={styles.recentHeader}>Drinks</Text>
          <View style={styles.scrollContainer}>
            <Example data={this.state.drinks} />
          </View>
        </View>
        <View style={styles.makeItContainer}>
          <Text>Make it</Text>
        </View>
      </ScrollView>
    );
  }
}

// Connected component is used with Redux store
export const MakeMyMealPage = connect()(MakeMyMeal);

// This helps auto-completion / type safety with `StyleSheet.create`
interface Style {
  container: ViewStyle;
  textContent: TextStyle;
  mainsContainer: ViewStyle;
  sidesContainer: ViewStyle;
  drinksContainer: ViewStyle;
  makeMyMealHeader: TextStyle;
  recentHeader: TextStyle;
  scrollContainer;
  image;
  makeItContainer;
  recentsContainer;
}

// React hoists variables. We declare the styles here to keep them out of the
// way of the component definition
const styles = StyleSheet.create<Style>({
  recentsContainer: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  makeItContainer: {
    flex: 0.5,
  },
  scrollContainer: {
    height,
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    paddingTop: 10,
  },
  image: {
    width,
    height,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
  },
  textContent: {
    fontSize: 25,
    textAlign: 'center',
  },
  mainsContainer: {
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
  },
  sidesContainer: {
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    paddingTop: 10,
  },
  drinksContainer: {
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    paddingTop: 10,
  },
  makeMyMealHeader: {
    fontSize: 25,
  },
  recentHeader: {
    fontSize: 25,
  },
});
