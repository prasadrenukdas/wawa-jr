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
} from 'react-native';

interface Props {
  navigator: any;
}

interface State {}

// Export component without provider for testing purposes
export class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.onPressButton = this.onPressButton.bind(this);
  }
  onPressButton() {
    this.props.navigator.push({
      screen: 'MakeMyMeal',
      title: 'Pushed Screen',
    });
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
        <View style={styles.recentContainer}>
          <Text style={styles.recentHeader}>Recent</Text>
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
}

// React hoists variables. We declare the styles here to keep them out of the
// way of the component definition
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 100,
    borderWidth: 2,
    borderColor: 'red',
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