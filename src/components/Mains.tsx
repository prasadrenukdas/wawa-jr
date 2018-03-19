/**
 * This represents a simple screen-level container component with rendering
 * and styling that is hooked up to the redux store.
 */

import * as React from 'react';
// import { connect } from 'react-redux';

import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const height = width * 0.8;

interface Props {
  images: any;
}

interface State {}

// Export component without provider for testing purposes
export class Mains extends React.Component<Props, State> {
  onPressButton() {
    // console.log('hello');
  }
  render() {
    const images = this.props.images;
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {images.map(image => (
          <TouchableHighlight onPress={this.onPressButton}>
            <Image style={styles.image} source={image.source} />
          </TouchableHighlight>
        ))}
      </ScrollView>
    );
  }
}

// Connected component is used with Redux store
// export const MainsPage = connect()(Mains);

// This helps auto-completion / type safety with `StyleSheet.create`
interface Style {
  container: ViewStyle;
  textContent: TextStyle;
  image;
}

// React hoists variables. We declare the styles here to keep them out of the
// way of the component definition
const styles = StyleSheet.create<Style>({
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
  textContent: {
    fontSize: 25,
    textAlign: 'center',
  },
});
