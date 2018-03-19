import * as React from 'react';
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import { sliderWidth, itemWidth } from './styles/SliderEntry';
import { SliderEntry } from './components/SliderEntry';
import { styles, colors } from './styles/index';
import { ENTRIES1, ENTRIES2 } from './static/entries';
import { scrollInterpolators, animatedStyles } from './utils/animations';
import { connect } from 'react-redux';
import { LinearGradient } from 'react-native-linear-gradient';
// import { Carousel } from 'react-native-snap-carousel';
const Carousel = require('react-native-carousel');

// tslint:disable-next-line:import-name
// import LinearGradient from 'react-native-linear-gradient';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

interface Props {}

interface State {
  slider1ActiveSlide: any;
}
export class Example extends React.Component<Props, State> {
  slider1Ref: any;
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  /*  renderItem({ item, index }) {
     return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
   } */

  renderItem({ item, index }) {
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }

  renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax
        parallaxProps={parallaxProps}
      />
    );
  }

  renderLightItem({ item }) {
    return <SliderEntry data={item} even={false} parallax parallaxProps />;
  }

  renderDarkItem({ item }) {
    return <SliderEntry data={item} even parallax parallaxProps />;
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        style={styles.gradient}
      />
    );
  }

  mainExample(number, title) {
    const { slider1ActiveSlide } = this.state;
    return (
      <Carousel
        ref={c => (this.slider1Ref = c)}
        data={[
          {
            title: 'Beautiful and dramatic Antelope Canyon',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
            illustration: 'https://i.imgur.com/UYiroysl.jpg',
          },
        ]}
        renderItem={this.renderLightItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    );
  }

  render() {
    // tslint:disable-next-line:max-line-length
    const example1 = this.mainExample;

    return (
      <Carousel animate={false} width={375}>
        <View style={styles.container}>
          <Text>Page 1</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 2</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 3</Text>
        </View>
      </Carousel>
    );
  }
}

export const ExamplePage = connect()(Example);
