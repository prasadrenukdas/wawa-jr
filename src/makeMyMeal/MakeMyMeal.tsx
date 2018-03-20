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

import { Example } from 'src/carouselExample/ExamplePage';

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
      <View style={styles.container}>
        <ScrollView>
          <TouchableHighlight
            onPress={this.onPressButton}
            underlayColor="white"
          >
            <View style={styles.mainsContainer}>
              <View>
                <Text style={styles.title}>Main Course</Text>
              </View>
              <View style={styles.scrollContainer}>
                <Example data={this.state.mains} />
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.sidesContainer}>
            <Text style={styles.title}>Sides</Text>
            <View style={styles.scrollContainer}>
              <Example data={this.state.sides} />
            </View>
          </View>
          <View style={styles.drinksContainer}>
            <Text style={styles.title}>Drinks</Text>
            <View style={styles.scrollContainer}>
              <Example data={this.state.drinks} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.makeItContainer}>
          <Text style={styles.makeItHeader}>Make it</Text>
        </View>
      </View>
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
  title;
  makeItHeader;
}

// React hoists variables. We declare the styles here to keep them out of the
// way of the component definition
const styles = StyleSheet.create<Style>({
  makeItHeader: {
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    backgroundColor: 'rgb(196, 18, 48)',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgb(66, 32, 5)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recentsContainer: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  makeItContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(196, 18, 48)',
  },
  scrollContainer: {
    height,
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
  },
  textContent: {
    fontSize: 25,
    textAlign: 'center',
  },
  mainsContainer: {
    alignItems: 'center',
  },
  sidesContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  drinksContainer: {
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
