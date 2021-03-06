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
  AsyncStorage,
  ScrollView,
} from 'react-native';
import { WawaCarousel } from 'src/carousel/Carousel';

const { width } = Dimensions.get('window');
const height = width * 0.8;

interface Props {
  navigator: any;
  images: any;
}

interface State {
  data;
}

// tslint:disable-next-line:function-name
function ShowWawaCarousel(props) {
  if (props.data.length) {
    return (
      <View style={{ flex: 0.8 }}>
        <WawaCarousel showBarcode data={props.data} />
      </View>
    );
  } else {
    return (
      <View style={{ height: 350 }}>
        <Text style={styles.noRecentItems}> No Recent Items </Text>
      </View>
    );
  }
}
// Export component without provider for testing purposes
export class Home extends React.Component<Props, State> {
  popupDialog: any;
  constructor(props) {
    super(props);
    this.updateRecents = this.updateRecents.bind(this);
    this.onPressButton = this.onPressButton.bind(this);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    // AsyncStorage.removeItem('item');
    AsyncStorage.getItem('item')
      .then(value => {
        if (value !== null) {
          this.setState({
            data: JSON.parse(value),
          });
        }
      })
      .catch(error => {});
  }

  onPressButton() {
    this.props.navigator.push({
      screen: 'MakeMyMeal',
      title: 'Make My Meal',
      passProps: { homePage: this.updateRecents },
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarTextColor: 'rgb(66, 32, 5)',
        navBarTextFontSize: 20,
        navBarHideOnScroll: true,
        navBarButtonColor: 'rgb(66, 32, 5)',
      },
    });
  }

  updateRecents() {
    AsyncStorage.getItem('item')
      .then(value => {
        if (value !== null) {
          this.setState({
            data: JSON.parse(value),
          });
        }
      })
      .catch(error => {});
  }

  showPopup() {
    this.popupDialog.showPopup();
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
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.title}>{`Recents`}</Text>
          <ShowWawaCarousel data={this.state.data ? this.state.data : []} />

          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>
              {`There is no sincerer love than the love of food - George Bernard Shaw.`}
            </Text>
          </View>
        </ScrollView>
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
  title;
  quoteContainer;
  quote;
  noRecentItems;
}

// React hoists variables. We declare the styles here to keep them out of the
// way of the component definition
const styles = StyleSheet.create<Style>({
  noRecentItems: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgb(66, 32, 5)',
    fontSize: 20,

    textAlign: 'center',
    paddingTop: 140,
    paddingBottom: 20,
  },
  quote: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgb(66, 32, 5)',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  quoteContainer: {
    flex: 0.2,
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgb(66, 32, 5)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  scrollContainer: {
    height: 600,
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
  },
  recentsContainer: {
    width: 375,
    flex: 0.7,
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(196, 18, 48)',
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
    backgroundColor: 'rgb(196, 18, 48)',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Avenir-Medium',
  },
  recentHeader: {
    fontSize: 25,
  },
});
