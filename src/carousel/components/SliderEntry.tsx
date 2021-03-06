import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import { styles, itemWidth } from '../styles/SliderEntry';

// import reactNativeBarcodeBuilder from 'react-native-barcode-builder';
import reactNativeBarcodePdf417 from 'react-native-barcode-pdf417';

interface Props {
  data: any;
  parallax: any;
  parallaxProps: any;
  even: any;
  showBarcode: any;
}

const Barcode = reactNativeBarcodePdf417;
// const Barcode = reactNativeBarcodeBuilder;
interface State {
  modalVisible;
}

// tslint:disable-next-line:function-name
function ShowBarCode(props) {
  if (props.show) {
    return (
      <View>
        <Barcode text={props.data.title} width={itemWidth} height={100} />
      </View>
    );
  }
  return null;
}

// tslint:disable-next-line:function-name
function ShowOverlay(props) {
  if (props.show) {
    return (
      <View style={styles.overlay}>
        <Image
          style={{ width: 50, height: 50, alignSelf: 'flex-end' }}
          source={require('../../../assets/images/cancel.png')}
        />
        <View style={styles.barcodeContainer}>
          <ShowBarCode show={props.showBarcode} data={props.data} />
        </View>
      </View>
    );
  }
  return null;
}

export class SliderEntry extends React.Component<Props, State> {
  popupDialog: any;
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };

    this.onCarouselPress = this.onCarouselPress.bind(this);
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: { illustration },
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: illustration }} style={styles.image} />
    );
  }

  onCarouselPress = (data, showBarcode) => {
    let skip = false;
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
    if (!showBarcode) {
      AsyncStorage.getItem('item')
        .then(storedItems => {
          if (storedItems) {
            const newPayload = JSON.parse(storedItems);
            newPayload.forEach(item => {
              if (item.title === data.title) {
                skip = true;
              }
            });
            if (!skip) {
              newPayload.push(data);
              AsyncStorage.setItem('item', JSON.stringify(newPayload));
            }
          } else {
            const payload = [];
            payload.push(data);
            AsyncStorage.setItem('item', JSON.stringify(payload));
          }
        })
        .catch(error => {});
    }
  };

  render() {
    const { data: { title, subtitle }, even } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}
      >
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <View>
        <TouchableOpacity
          // tslint:disable-next-line:jsx-no-lambda
          onPress={() =>
            this.onCarouselPress(this.props.data, this.props.showBarcode)
          }
          activeOpacity={1}
          style={styles.slideInnerContainer}
        >
          <ShowOverlay
            show={this.state.modalVisible}
            showBarcode={this.props.showBarcode}
            data={this.props.data}
          />
          <View style={styles.shadow} />
          <View
            style={[
              styles.imageContainer,
              even ? styles.imageContainerEven : {},
            ]}
          >
            {this.image}
            <View
              style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
            />
          </View>
          <View style={[styles.textContainer]}>
            {uppercaseTitle}
            <Text style={[styles.subtitle]} numberOfLines={2}>
              {subtitle}
            </Text>
          </View>
          <View>
            <View>
              <ShowBarCode show={false} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
