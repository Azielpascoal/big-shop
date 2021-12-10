import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import FeedMedia from '../FeedItem/FeedMedia';
import dynamicStyles from './style';
import AppStyles from '../../AppStyles';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { useColorScheme } from 'react-native-appearance';
import ActionSheet from 'react-native-actionsheet';
import TruncateText from 'react-native-view-more-text';
import { Viewport } from '@skele/components';
import { TNStoryItem, TNTouchableIcon } from '../../Core/truly-native';
import { IMRichTextView } from '../../Core/mentions';
import { timeFormat } from '../../Core';
import { IMLocalized } from '../../Core/localization/IMLocalization';

const ViewportAwareSwiper = Viewport.Aware(Swiper);
// const mediaHeight = 0;
const mediaHeight = AppStyles.WINDOW_HEIGHT * 0.3;

function DetailsPostViewer(props) {
  const {
    feedIndex,
    item,
    isLastItem,
    onCommentPress,
    containerStyle,
    onUserItemPress,
    onMediaPress,
    shouldReSizeMedia,
    onReaction,
    onSharePost,
    onDeletePost,
    onUserReport,
    user,
    willBlur,
    shouldDisplayViewAllComments,
    onTextFieldUserPress,
    onTextFieldHashTagPress,
    footerIconContainerView,
  } = props;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  let defaultReaction = 'heartUnfilled';

  const [postMediaIndex, setPostMediaIndex] = useState(0);
  const [inViewPort, setInViewPort] = useState(false);
  const lastPress = useRef(0);

  const didPressMedia = async (filteredImages, index) => {
    const time = new Date().getTime();
    const delta = time - lastPress.current;
    const DOUBLE_PRESS_DELAY = 400;

    if (delta < DOUBLE_PRESS_DELAY && selectedIcon !== 'filledHeart') {
      const reationCountToUpdate = item.reactions['like'];
      setSelectedIcon('filledHeart');
      setReactionCount(reactionCount + 1);
      onReaction('like', item);
    }
    lastPress.current = time;
  };

  const moreArray = [IMLocalized('Share Post')];

  moreArray.push(IMLocalized('Cancel'));

  const onMediaResize = ({ height }) => {
    const maxMediaHeight = Math.floor(AppStyles.WINDOW_HEIGHT * 0.55);
    if (shouldReSizeMedia && height) {
      setCalcMediaHeight(height > maxMediaHeight ? maxMediaHeight : height);
    }
  };
  return (
    //Componente criado por Aziel
    <View style={styles.container}>
      {item.postMedia.map((media, index) => (
        <View style={styles.containerImage}>
          <FeedMedia
            key={index}
            inViewPort={inViewPort}
            index={index}
            postMediaIndex={postMediaIndex}
            media={media}
            mediaStyle={{ width: '100%', height: '100%', borderRadius: 25 }}
            item={item}
            isLastItem={isLastItem}
            onMediaResize={onMediaResize}
            onMediaPress={didPressMedia}
            dynamicStyles={styles}
            willBlur={willBlur}
          />
        </View>
      ))}
    </View>
  );
}

export default DetailsPostViewer;
