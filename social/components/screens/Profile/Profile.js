import React, { useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import * as ImagePicker from 'expo-image-picker';
import { TNStoryItem, TNTouchableIcon } from '../../../Core/truly-native';
import FeedMedia from '../../FeedItem/FeedMedia';
import ProfileButton from './ProfileButton';
import TNMediaViewerModal from '../../../Core/truly-native/TNMediaViewerModal';
import dynamicStyles from './styles';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import { TNEmptyStateView } from '../../../Core/truly-native';
import AppStyles from '../../../AppStyles';
import WishlistScreen from '../../../../shop/screens/WishlistScreen/WishlistScreen';
import { Appearance } from 'react-native-appearance';

function Profile(props) {
  let COLOR_SCHEME = Appearance.getColorScheme();
  let currentTheme = AppStyles.navThemeConstants[COLOR_SCHEME];
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    onMainButtonPress,
    recentUserFeeds,
    user,
    mainButtonTitle,
    isMediaViewerOpen,
    feedItems,
    onMediaClose,
    selectedMediaIndex,
    removePhoto,
    startUpload,
    uploadProgress,
    loading,
    handleOnEndReached,
    isFetching,
    isOtherUser,
    onFollowingButtonPress,
    onFollowersButtonPress,
    onPostPress,
    followingCount,
    followersCount,
    postCount,
    onEmptyStatePress,
    onPress,
  } = props;

  const updatePhotoDialogActionSheet = useRef();
  const photoUploadDialogActionSheet = useRef();

  const onProfilePicturePress = () => {
    if (isOtherUser) {
      return;
    }
    updatePhotoDialogActionSheet.current.show();
  };

  const onUpdatePhotoDialogDone = (index) => {
    if (index === 0) {
      photoUploadDialogActionSheet.current.show();
    }

    if (index === 1) {
      removePhoto();
    }
  };

  const onPhotoUploadDialogDone = (index) => {
    if (index === 0) {
      onLaunchCamera();
    }

    if (index === 1) {
      onOpenPhotos();
    }
  };

  const onLaunchCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    let result = await ImagePicker.launchCameraAsync();

    if (result?.uri) {
      startUpload(result);
    }
  };

  const onOpenPhotos = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();

    if (result?.uri) {
      startUpload(result);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <FeedMedia
        key={index + ''}
        index={index}
        onMediaPress={onPostPress}
        media={item.postMedia && item.postMedia[0]}
        item={item}
        mediaStyle={styles.gridItemImage}
        mediaContainerStyle={styles.gridItemContainer}
        dynamicStyles={styles}
      />
    );
  };

  renderListFooter = () => {
    if (loading) {
      return null;
    }
    if (isFetching) {
      return <ActivityIndicator style={{ marginVertical: 7 }} size="small" />;
    }
    return null;
  };

  const renderListHeader = () => {
    return (
      <View style={styles.subContainer}>
        <View style={styles.userCardContainer}>
          <TNStoryItem
            item={user}
            imageStyle={styles.userImage}
            imageContainerStyle={styles.userImageContainer}
            containerStyle={styles.userImageMainContainer}
            activeOpacity={1}
            title={true}
            onPress={onProfilePicturePress}
            textStyle={styles.userName}
            appStyles={AppStyles}
          />
        </View>

        {loading ? (
          <View style={styles.container}>
            <ActivityIndicator
              style={{ marginTop: 15, alignSelf: 'center' }}
              size="small"
            />
          </View>
        ) : (
          <View style={styles.FriendsContainer}></View>
        )}
      </View>
    );
  };

  RenderNavigationOptions = () => {
    return (
      <View style={styles.renderNavigationContainer}>
        <View style={styles.countItemsContainer}>
          <View>
            <TNTouchableIcon
              imageStyle={styles.iconImageStyle}
              iconSource={AppStyles.iconSet.followers}
              onPress={onFollowersButtonPress}
              appStyles={AppStyles}
              containerStyle={styles.iconContainerStyle}
            />
          </View>
          <View>
            <TNTouchableIcon
              imageStyle={styles.iconImageStyle}
              iconSource={AppStyles.iconSet.followers}
              onPress={onFollowingButtonPress}
              appStyles={AppStyles}
              containerStyle={styles.iconContainerStyle}
            />
          </View>
          <View>
            <TNTouchableIcon
              imageStyle={styles.iconImageStyle}
              iconSource={AppStyles.iconSet.openGift}
              onPress={() => {}}
              appStyles={AppStyles}
              containerStyle={styles.iconContainerStyle}
            />
          </View>
          {/* Change profile buton to icon */}
          {/* Icon should be settings icon or message icon.. check on is displayed in ProfileScreen */}
          <ProfileButton
            title={mainButtonTitle}
            containerStyle={{ width: '25%', marginTop: 25 }}
            onPress={onMainButtonPress}
          />
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    var emptyStateConfig = {
      title: IMLocalized('No Posts'),
      description: IMLocalized(
        'There are currently no posts on this profile. All the posts will show up here.',
      ),
    };
    if (!isOtherUser) {
      emptyStateConfig = {
        ...emptyStateConfig,
        buttonName: IMLocalized('Add Your First Post'),
        onPress: onEmptyStatePress,
      };
    }
    return (
      <TNEmptyStateView
        emptyStateConfig={emptyStateConfig}
        appStyles={AppStyles}
      />
    );
  };
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <RenderNavigationOptions />
      <View style={styles.container}>
        <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
        {recentUserFeeds && (
          <FlatList
            data={recentUserFeeds}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.5}
            numColumns={3}
            horizontal={false}
            onEndReached={handleOnEndReached}
            ListHeaderComponent={renderListHeader}
            ListFooterComponent={renderListFooter}
            ListEmptyComponent={renderEmptyComponent}
            style={{ width: '97%' }}
            showsVerticalScrollIndicator={false}
          />
        )}

        <TNMediaViewerModal
          mediaItems={feedItems}
          isModalOpen={isMediaViewerOpen}
          onClosed={onMediaClose}
          selectedMediaIndex={selectedMediaIndex}
        />
        <ActionSheet
          ref={updatePhotoDialogActionSheet}
          title={IMLocalized('Profile Picture')}
          options={[
            IMLocalized('Change Photo'),
            IMLocalized('Remove'),
            IMLocalized('Cancel'),
          ]}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={onUpdatePhotoDialogDone}
        />
        <ActionSheet
          ref={photoUploadDialogActionSheet}
          title={IMLocalized('Select Photo')}
          options={[
            IMLocalized('Camera'),
            IMLocalized('Library'),
            IMLocalized('Cancel'),
          ]}
          cancelButtonIndex={2}
          onPress={onPhotoUploadDialogDone}
        />
      </View>
    </View>
  );
}

Profile.propTypes = {
  onCommentPress: PropTypes.func,
  startUpload: PropTypes.func,
  removePhoto: PropTypes.func,
  onMainButtonPress: PropTypes.func,
  onSubButtonTitlePress: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  onFeedUserItemPress: PropTypes.func,
  user: PropTypes.object,
  friends: PropTypes.array,
  mainButtonTitle: PropTypes.string,
  subButtonTitle: PropTypes.string,
  feedItems: PropTypes.array,
  onMediaClose: PropTypes.func,
  isMediaViewerOpen: PropTypes.bool,
  onMediaPress: PropTypes.func,
  displaySubButton: PropTypes.bool,
  selectedMediaIndex: PropTypes.number,
  uploadProgress: PropTypes.number,
};

export default Profile;
