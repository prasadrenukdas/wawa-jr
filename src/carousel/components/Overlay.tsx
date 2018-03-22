import * as React from 'react';
import { Overlay } from 'react-native-overlay';
import { BlurView } from 'react-native-blur';
// const BlurView = require('react-native-blur').BlurView;
import {
  StyleSheet,
  ViewStyle,
  View,
  Text,
  TextStyle,
  TouchableHighlight,
  Dimensions,
  Button,
  ActivityIndicatorIOS,
} from 'react-native';

interface Props {
  isVisible;
}

interface State {}
export class LoadingOverlay extends React.Component<Props, State> {
  render() {
    return (
      <Overlay isVisible={this.props.isVisible}>
        <BlurView style={styles.background} blurType="dark">
          <Text>hola</Text>
        </BlurView>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
});
