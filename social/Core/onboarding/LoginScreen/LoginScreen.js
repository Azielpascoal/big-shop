import React, { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import Button from 'react-native-button';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { setUserData } from '../redux/auth';
import { localizedErrorMessage } from '../utils/ErrorCode';
import IMGoogleSignInButton from '../components/IMGoogleSignInButton/IMGoogleSignInButton';

const LoginScreen = (props) => {
  const appConfig = props.route.params.appConfig;
  const authManager = props.route.params.authManager;

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const appStyles = props.route.params.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const onPressLogin = () => {
    setLoading(true);
    authManager
      .loginWithEmailAndPassword(
        email && email.trim(),
        password && password.trim(),
        appConfig,
      )
      .then((response) => {
        if (response?.user) {
          const user = response.user;
          props.setUserData({
            user: response.user,
          });
          Keyboard.dismiss();
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack', params: { user: user } }],
          });
        } else {
          setLoading(false);
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{ text: IMLocalized('OK') }],
            {
              cancelable: false,
            },
          );
        }
      });
  };

  const onFBButtonPress = () => {
    setLoading(true);
    authManager.loginOrSignUpWithFacebook(appConfig).then((response) => {
      if (response?.user) {
        const user = response.user;
        props.setUserData({
          user: response.user,
        });
        Keyboard.dismiss();
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { user: user } }],
        });
      } else {
        setLoading(false);
        Alert.alert(
          '',
          localizedErrorMessage(response.error),
          [{ text: IMLocalized('OK') }],
          {
            cancelable: false,
          },
        );
      }
    });
  };

  const onGoogleButtonPress = () => {
    setLoading(true);
    authManager.loginOrSignUpWithGoogle(appConfig).then((response) => {
      if (response?.user) {
        const user = response.user;
        props.setUserData({ user });
        Keyboard.dismiss();
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { user: user } }],
        });
      } else {
        setLoading(false);
        Alert.alert(
          '',
          localizedErrorMessage(response.error),
          [{ text: IMLocalized('OK') }],
          {
            cancelable: false,
          },
        );
      }
    });
  };

  const onAppleButtonPress = async () => {
    setLoading(true);
    authManager.loginOrSignUpWithApple(appConfig).then((response) => {
      if (response?.user) {
        const user = response.user;
        props.setUserData({ user });
        Keyboard.dismiss();
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { user: user } }],
        });
      } else {
        setLoading(false);
        Alert.alert(
          '',
          localizedErrorMessage(response.error),
          [{ text: IMLocalized('OK') }],
          {
            cancelable: false,
          },
        );
      }
    });
  };

  const onForgotPassword = async () => {
    props.navigation.push('ResetPassword', {
      isResetPassword: true,
      appStyles,
      appConfig,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding:10' : 'height'}
      style={{ flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always">
          <TouchableOpacity
            style={{ alignSelf: 'flex-start' }}
            onPress={() => props.navigation.goBack()}>
            <Image
              style={appStyles.styleSet.backArrowStyle}
              source={appStyles.iconSet.backArrow}
            />
          </TouchableOpacity>
          <View style={styles.logo}>
            <Image
              style={styles.logoImage}
              source={
                props.delayedMode
                  ? appStyles.iconSet.delayedLogo
                  : appStyles.undrawImageSet.login
              }
            />
          </View>
          <Text style={styles.title}>{IMLocalized('Login')}</Text>
          <View style={styles.InputContainer}>
            <Image
              style={styles.ImageInput}
              source={appStyles.iconSet.emailIcon}
            />
            <TextInput
              style={styles.Input}
              placeholder={IMLocalized('E-mail')}
              keyboardType="email-address"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.InputContainer}>
            <Image
              style={styles.ImageInput}
              source={appStyles.iconSet.passwordIcon}
            />
            <TextInput
              style={styles.Input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder={IMLocalized('Senha')}
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordText}
              onPress={() => onForgotPassword()}>
              {IMLocalized('Esqueci minha senha !')}
            </Button>
          </View>
          <Button
            containerStyle={styles.loginContainer}
            style={styles.loginText}
            onPress={() => onPressLogin()}>
            {IMLocalized('Entrar')}
          </Button>
          {appConfig.isSMSAuthEnabled && (
            <Button
              containerStyle={styles.phoneNumberContainer}
              style={styles.phoneNumberContainerText}
              onPress={() =>
                props.navigation.navigate('Sms', {
                  isSigningUp: false,
                  appStyles,
                  appConfig,
                  authManager,
                })
              }>
              {IMLocalized('Entrar com o número de telefone')}
            </Button>
          )}

          {loading && <TNActivityIndicator appStyles={appStyles} />}
        </KeyboardAwareScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default connect(null, {
  setUserData,
})(LoginScreen);
