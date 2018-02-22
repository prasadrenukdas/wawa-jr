import * as React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, ViewStyle, View, Text, TextStyle } from 'react-native';

export class HomeComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContent}>Edit or remove this file.</Text>
      </View>
    );
  }
}

export const Home = connect()(HomeComponent);

interface Style {
  container: ViewStyle;
  textContent: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  textContent: {
    fontSize: 25,
    textAlign: 'center',
  },
});
