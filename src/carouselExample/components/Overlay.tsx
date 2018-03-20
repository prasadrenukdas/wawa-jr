import * as React from 'react';
import { Overlay } from 'react-native-overlay';
const BlurView = require('react-native-blur').BlurView;
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
          <ActivityIndicatorIOS size="large" animating style={styles.spinner} />
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
