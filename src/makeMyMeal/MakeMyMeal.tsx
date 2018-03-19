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
const { width } = Dimensions.get('window');
const height = width * 0.8;

export class MakeMyMeal extends React.Component {
  onPressButton() {}
  getMainCourse() {
    const images = [
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
        },
      },
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
        },
      },
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
        },
      },
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg',
        },
      },
    ];
    return images;
  }

  getSides() {
    const images = [
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
        },
      },
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
        },
      },
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
        },
      },
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg',
        },
      },
    ];
    return images;
  }

  getDrinks() {
    const images = [
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
        },
      },
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
        },
      },
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
        },
      },
      {
        source: {
          uri:
            'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg',
        },
      },
    ];
    return images;
  }
  render() {
    const images = this.getMainCourse();
    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight
          style={styles.mainsContainer}
          onPress={this.onPressButton}
          underlayColor="white"
        >
          <View style={styles.scrollContainer}>
            <View>
              <Text style={styles.makeMyMealHeader}>Main Course</Text>
            </View>
            <Mains images={images} />
          </View>
        </TouchableHighlight>
        <View style={styles.sidesContainer}>
          <Text style={styles.recentHeader}>Sides</Text>
          <View style={styles.scrollContainer}>
            <Sides images={images} />
          </View>
        </View>
        <View style={styles.drinksContainer}>
          <Text style={styles.recentHeader}>Drinks</Text>
          <View style={styles.scrollContainer}>
            <Drinks images={images} />
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
}

// React hoists variables. We declare the styles here to keep them out of the
// way of the component definition
const styles = StyleSheet.create<Style>({
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
