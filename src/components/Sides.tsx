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

export class Sides extends React.Component<Props, State> {
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

interface Style {
  container: ViewStyle;
  textContent: TextStyle;
  image;
}

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
