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
import reactNativeSnapCarousel, {
  Pagination,
} from 'react-native-snap-carousel';

const Carousel = reactNativeSnapCarousel;
const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

interface Props {
  data;
}

interface State {
  slider1ActiveSlide: any;
  entries: any;
}
export class Example extends React.Component<Props, State> {
  // tslint:disable-next-line:variable-name
  _slider1Ref: any;
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      entries: ENTRIES2,
    };
  }

  yoo = () => {
    alert('hello');
  };

  renderItem({ item, index, parallaxProps }) {
    return (
      <SliderEntry
        parallaxProps={parallaxProps}
        data={item}
        parallax={false}
        even={(index + 1) % 2 === 0}
      />
    );
  }

  renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={false}
        parallaxProps={parallaxProps}
      />
    );
  }

  renderLightItem({ item }) {
    return (
      <SliderEntry data={item} even={false} parallax={false} parallaxProps />
    );
  }

  renderDarkItem({ item }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even
        parallax={false}
        parallaxProps={parallaxProps}
      />
    );
  }

  layoutExample(number, title, type) {
    const isTinder = type === 'tinder';
    return (
      // tslint:disable-next-line:max-line-length
      <View
        style={[
          styles.exampleContainer,
          isTinder ? styles.exampleContainerDark : styles.exampleContainerLight,
        ]}
      >
        <Text
          style={[styles.title, isTinder ? {} : styles.titleDark]}
        >{`Example ${number}`}</Text>
        <Text style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>
          {title}
        </Text>
        <Carousel
          data={isTinder ? ENTRIES2 : ENTRIES1}
          renderItem={isTinder ? this.renderItem : this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop
        />
      </View>
    );
  }

  mainExample(number, title) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>{title}</Text>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={this.props.data ? this.props.data : ENTRIES1}
          renderItem={this.renderLightItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loopClonesPerSide={2}
          autoplayDelay={500}
          autoplayInterval={3000}
          // tslint:disable-next-line:jsx-no-lambda
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  render() {
    const example1 = this.mainExample(1, 'Tap on the item to select');

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={'rgba(0, 0, 0, 0.3)'}
            barStyle={'light-content'}
          />

          <ScrollView style={styles.scrollview} scrollEventThrottle={200}>
            {example1}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export const ExamplePage = connect()(Example);
