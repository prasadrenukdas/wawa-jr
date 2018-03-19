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
  Button,
  Alert,
} from 'react-native';

// Export component without provider for testing purposes
export class MakeMyMeal extends React.Component {
  onPressButton() {}
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.mainsContainer}
          onPress={this.onPressButton}
          underlayColor="white"
        >
          <View>
            <Text style={styles.makeMyMealHeader}>Mains</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.sidesContainer}>
          <Text style={styles.recentHeader}>Sides</Text>
        </View>
        <View style={styles.drinksContainer}>
          <Text style={styles.recentHeader}>Drinks</Text>
        </View>
      </View>
    );
  }
}

// Connected component is used with Redux store
export const HomePage = connect()(MakeMyMeal);

// This helps auto-completion / type safety with `StyleSheet.create`
interface Style {
  container: ViewStyle;
  textContent: TextStyle;
  mainsContainer: ViewStyle;
  sidesContainer: ViewStyle;
  drinksContainer: ViewStyle;
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
    borderWidth: 2,
    borderColor: 'red',
  },
  textContent: {
    fontSize: 25,
    textAlign: 'center',
  },
  mainsContainer: {
    flex: 0.3,
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
  },
  sidesContainer: {
    flex: 0.3,
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    paddingTop: 10,
  },
  drinksContainer: {
    flex: 0.3,
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
