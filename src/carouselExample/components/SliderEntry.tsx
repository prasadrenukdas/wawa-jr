import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import { styles } from '../styles/SliderEntry';

import reactNativePopupDialog from 'react-native-popup-dialog';
import reactNativeBarcodeBuilder from 'react-native-barcode-builder';
import reactNativeModalOverlay from 'react-native-modal-overlay';

const Overlay = reactNativeModalOverlay;

interface Props {
  data: any;
  parallax: any;
  parallaxProps: any;
  even: any;
}

const PopupDialog = reactNativePopupDialog;
const DialogTitle = reactNativePopupDialog;
const Barcode = reactNativeBarcodeBuilder;
interface State {
  modalVisible;
}

export class SliderEntry extends React.Component<Props, State> {
  popupDialog: any;
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
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

  onCarouselPress = () => {
    this.setState({
      modalVisible: true,
    });
    this.popupDialog.show();
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
          onPress={this.onCarouselPress}
          activeOpacity={1}
          style={styles.slideInnerContainer}
        >
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
          <View
            style={[styles.textContainer, even ? styles.textContainerEven : {}]}
          >
            {uppercaseTitle}
            <Text
              style={[styles.subtitle, even ? styles.subtitleEven : {}]}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          </View>
          <PopupDialog
            style={{}}
            ref={popupDialog => {
              this.popupDialog = popupDialog;
            }}
          >
            <View>
              <Barcode
                marginTop="100"
                width="2"
                height="50"
                value="Hello World"
                format="CODE128"
              />
            </View>
          </PopupDialog>
        </TouchableOpacity>
      </View>
    );
  }
}
