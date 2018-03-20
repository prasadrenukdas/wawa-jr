/**
 * This represents a simple screen-level container component with rendering
 * and styling that is hooked up to the redux store.
 */

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
} from 'react-native';
import { Example } from 'src/carouselExample/ExamplePage';

const { width } = Dimensions.get('window');
const height = width * 0.8;

interface Props {
  navigator: any;
  images: any;
}

interface State {
  data;
}

// Export component without provider for testing purposes
export class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.onPressButton = this.onPressButton.bind(this);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    fetch('https://s3.amazonaws.com/mob-training/wawa/wawa-jr.json')
      .then(data => data.json())
      .then(data =>
        data.menu.main.map(item => {
          return {
            illustration: item.url,
            title: item.name,
          };
        }),
      )
      .then(data => this.setState({ data }));
  }
  onPressButton() {
    this.props.navigator.push({
      screen: 'MakeMyMeal',
      title: 'Pushed Screen',
    });
  }

  getImages() {
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
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.makeMyMealContainer}
          onPress={this.onPressButton}
          underlayColor="white"
        >
          <View>
            <Text style={styles.makeMyMealHeader}>Make My Meal</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.scrollContainer}>
          <View>
            <Text style={styles.makeMyMealHeader}>Recents</Text>
          </View>
          <Example data={this.state.data} />
        </View>
      </View>
    );
  }
}

// Connected component is used with Redux store
export const HomePage = connect()(Home);

// This helps auto-completion / type safety with `StyleSheet.create`
interface Style {
  container: ViewStyle;
  textContent: TextStyle;
  makeMyMealContainer: ViewStyle;
  recentContainer: ViewStyle;
  makeMyMealHeader: TextStyle;
  recentHeader: TextStyle;
  scrollContainer;
  image;
  recentsContainer;
}

// React hoists variables. We declare the styles here to keep them out of the
// way of the component definition
const styles = StyleSheet.create<Style>({
  scrollContainer: {
    height,
    flex: 0.7,
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
    justifyContent: 'center',
    paddingBottom: 100,
    borderWidth: 2,
    borderColor: 'red',
  },
  recentsContainer: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textContent: {
    fontSize: 25,
    textAlign: 'center',
  },
  makeMyMealContainer: {
    flex: 0.3,
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentContainer: {
    flex: 0.7,
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
