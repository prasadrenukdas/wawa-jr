import * as React from 'react';
import { connect } from 'react-redux';

import { View, Text } from 'react-native';

export class HomeComponent extends React.Component {
  render() {
    return (
      <View>
        <Text>Testing</Text>
      </View>
    );
  }
}

export const Home = connect(undefined, undefined)(HomeComponent);
