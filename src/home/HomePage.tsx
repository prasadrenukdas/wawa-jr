/**
 * This represents a simple screen-level container component with rendering
 * and styling that is hooked up to the redux store.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import reactNativePopupDialog from 'react-native-popup-dialog';
import {
  StyleSheet,
  ViewStyle,
  View,
  Text,
  TextStyle,
  TouchableHighlight,
  Dimensions,
  Button,
  AsyncStorage,
} from 'react-native';
import { Example } from 'src/carouselExample/ExamplePage';
import reactNativeBarcodeBuilder from 'react-native-barcode-builder';

const PopupDialog = reactNativePopupDialog;
const Barcode = reactNativeBarcodeBuilder;
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
  popupDialog: any;
  constructor(props) {
    super(props);
    this.onPressButton = this.onPressButton.bind(this);
    this.state = {
      data: [],
    };
  }

  async componentWillMount() {
    // AsyncStorage.removeItem('item');
    try {
      const value = await AsyncStorage.getItem('item');
      if (value !== null) {
        this.setState({
          data: JSON.parse(value),
        });
      }
    } catch (error) {
      // Error retrieving data
    }
    /*   fetch('https://s3.amazonaws.com/mob-training/wawa/wawa-jr.json')
      .then(data => data.json())
      .then(data =>
        data.menu.main.map(item => {
          return {
            illustration: item.url,
            title: item.name,
          };
        }),
      )
      .then(data => this.setState({ data })); */
  }
  onPressButton() {
    this.props.navigator.push({
      screen: 'MakeMyMeal',
      title: 'Make My Meal',
    });
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
        <View style={styles.scrollContainer}>
          <View>
            <Text style={styles.title}>{`Recents`}</Text>
          </View>
          <TouchableHighlight
            // tslint:disable-next-line:jsx-no-lambda
            onPress={() => {
              this.popupDialog.show();
            }}
            underlayColor="white"
          >
            <Example showBarcode data={this.state.data} />
          </TouchableHighlight>
        </View>

        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
        >
          <View>
            <Barcode value="Hello World" format="CODE128" />
          </View>
        </PopupDialog>
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
}

// React hoists variables. We declare the styles here to keep them out of the
// way of the component definition
const styles = StyleSheet.create<Style>({
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
    height,
    flex: 0.7,
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
