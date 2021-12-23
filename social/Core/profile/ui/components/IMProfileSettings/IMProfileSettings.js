import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TNStoryItem, TNTouchableIcon } from '../../../../../Core/truly-native';
import { useSelector } from 'react-redux';
import { authManager } from '../../../../onboarding/utils/api';
import dynamicStyles from './styles';
import AppStyles from '../../../../../AppStyles';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../../../localization/IMLocalization';

function IMProfileSettings(props) {
  const {
    navigation,
    onLogout,
    lastScreenTitle,
    appStyles,
    appConfig,
    user,
    isOtherUser,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const currentUser = useSelector((state) => state.auth.user);

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

  const onSettingsTypePress = async (
    type,
    routeName,
    form,
    screenTitle,
    phone,
  ) => {
    if (type === 'Logout') {
      authManager.logout(currentUser);
      onLogout();
      props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'LoadScreen',
            params: { appStyles: appStyles, appConfig: appConfig },
          },
        ],
      });
    } else {
      navigation.navigate(lastScreenTitle + routeName, {
        appStyles: appStyles,
        form,
        screenTitle,
        phone,
      });
    }
  };

  const renderSettingsType = ({
    type,
    routeName,
    form,
    screenTitle,
    phone,
  }) => (
    <TouchableOpacity
      style={styles.settingsTypeContainer}
      onPress={() => onSettingsTypePress(type, routeName, form, screenTitle)}>
      <Text style={styles.settingsType}>{type}</Text>
      <Image
        style={styles.settingsTypeContainerImage}
        source={appStyles.iconSet.arrowRight}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.settingsBack}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.settingsTypeContainerImage}
            source={appStyles.iconSet.arrowBack}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.settingsTitleContainer}>
        <Text style={styles.settingsTitle}>
          {'Meu '}
          <Text style={styles.settingsTitleBold}>{'Perfil'}</Text>
        </Text>
      </View>
      <View style={styles.userCard}>
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
      </View>
      <View style={styles.settingsTypesContainer}>
        {renderSettingsType({
          type: 'Account Details',
          routeName: 'EditProfile',
          form: appConfig.editProfileFields,
          screenTitle: IMLocalized('Edit Profile'),
        })}
        {renderSettingsType({
          type: 'Blocked Users',
          routeName: 'BlockedSettings',
          screenTitle: IMLocalized('Blocked Users'),
        })}
        {renderSettingsType({
          type: 'Settings',
          routeName: 'AppSettings',
          form: appConfig.userSettingsFields,
          screenTitle: IMLocalized('User Settings'),
        })}
        {renderSettingsType({
          type: 'Contact Us',
          routeName: 'ContactUs',
          form: appConfig.contactUsFields,
          phone: appConfig.contactUsPhoneNumber,
          screenTitle: IMLocalized('Contact Us'),
        })}
        {renderSettingsType({ type: 'Logout' })}
      </View>
    </View>
  );
}

IMProfileSettings.propTypes = {};

export default IMProfileSettings;
