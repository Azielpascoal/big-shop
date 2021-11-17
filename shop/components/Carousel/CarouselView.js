import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
const renderItemWidth = width * 0.7;

function CarouselView(props) {
  const { dataSource, renderItem } = props;

  return (
    <Carousel
      data={dataSource}
      renderItem={({ item, index }) => renderItem({ item, index })}
      sliderWidth={width}
      itemWidth={renderItemWidth}
      hasParallaxImages={true}
      firstItem={1}
      inactiveSlideScale={0.74}
      inactiveSlideOpacity={Platform.OS === 'android' ? 1 : 0.65}
      loop={false}
      loopClonesPerSide={2}
      autoplay={false}
      autoplayDelay={500}
      autoplayInterval={3000}
    />
  );
}

CarouselView.propTypes = {
  dataSource: PropTypes.array,
  renderItem: PropTypes.func,
  onIndexChange: PropTypes.func,
  currentIndex: PropTypes.number,
};

export default CarouselView;
