/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './social/App';
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';

AppRegistry.registerComponent(appName, () => App);
