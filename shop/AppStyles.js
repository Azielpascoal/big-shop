import { Platform, Dimensions } from 'react-native';
import TNColor from './Core/truly-native/TNColor';
import { AppleButton } from '@invertase/react-native-apple-authentication';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const lightColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  mainThemeForegroundColor: '#333333',
  mainTextColor: '#555555',
  mainSubtextColor: '#999999',
  hairlineColor: '#cccccc',
  subHairlineColor: '#f2f2f3',
  grey0: '#eaeaea',
  grey3: '#e6e6f2',
  grey6: '#d6d6d6',
  grey9: '#939393',
  tint: '#3068CC',
  ghostWhite: '#f2f2f3',
  light: '#fff',
  facebook: '#4267b2',
  grey: 'grey',
  whiteSmoke: '#f5f5f5',
};

const darkColorSet = {
  mainThemeBackgroundColor: TNColor('#ffffff'),
  mainThemeForegroundColor: '#333333',
  mainTextColor: TNColor('#555555'),
  mainSubtextColor: TNColor('#999999'),
  hairlineColor: TNColor('#cccccc'),
  subHairlineColor: TNColor('#f2f2f3'),
  grey0: TNColor('#eaeaea'),
  grey3: TNColor('#e6e6f2'),
  grey6: TNColor('#d6d6d6'),
  grey9: TNColor('#939393'),
  tint: TNColor('#3068CC'),
  ghostWhite: TNColor('#f2f2f3'),
  light: TNColor('#fff'),
  facebook: TNColor('#4267b2'),
  grey: 'grey',
  whiteSmoke: TNColor('#f5f5f5'),
};

const colorSet = {
  light: lightColorSet,
  dark: darkColorSet,
  'no-preference': lightColorSet,
};

const lightNavBar = {
  backgroundColor: '#fff',
  fontColor: '#333333',
  activeTintColor: '#3875e8',
  inactiveTintColor: '#ccc',
  hairlineColor: '#e0e0e0',
  mainSubtextColor: '#999999',
};

const darkNavBar = {
  backgroundColor: '#121212',
  fontColor: '#fff',
  activeTintColor: '#3875e8',
  inactiveTintColor: '#888',
  hairlineColor: '#222222',
  mainSubtextColor: '#f5f5f5',
};

const navThemeConstants = {
  light: lightNavBar,
  dark: darkNavBar,
  'no-preference': lightNavBar,
  main: '#3875e8',
};

const imageSet = {
  shoppingBag: require('../assets/images/shopping-bag.png'),
  quickSearch: require('../assets/images/quick-search.png'),
  wishlist: require('../assets/images/wishlist.png'),
  delivery: require('../assets/images/delivery.png'),
  notification: require('../assets/images/notification.png'),
  payment: require('../assets/images/payment.png'),
  applePay: require('../assets/images/apple-pay.png'),
  googlePay: require('../assets/images/google-pay.png'),
  googlePayColored: require('../assets/images/google-pay-colored.png'),
  creditCard: require('../assets/images/credit-card.png'),
  box: require('../assets/images/box.png'),
};

const iconSet = {
  logo: require('../assets/images/shopertino-logo.png'),
  userAvatar: require('./CoreAssets/default-avatar.jpg'),
  homeDrawer: require('../assets/icons/home-drawer.png'),
  logoutDrawer: require('../assets/icons/logout-drawer.png'),
  orderDrawer: require('../assets/icons/order-drawer.png'),
  profileDrawer: require('../assets/icons/profile-drawer.png'),
  searchDrawer: require('../assets/icons/search-drawer.png'),
  shopDrawer: require('../assets/icons/shop-drawer.png'),
  shoppingBagDrawer: require('../assets/icons/shopping-bag-drawer.png'),
  wishlistDrawer: require('../assets/icons/wishlist-drawer.png'),
  menuHamburger: require('../assets/icons/menu-hamburger.png'),
  shoppingBagFilled: require('../assets/icons/shopping-bag-filled.png'),
  accountDetail: require('../assets/icons/account-detail.png'),
  settings: require('../assets/icons/settings.png'),
  contactUs: require('../assets/icons/contact-us.png'),
  rightArrow: require('../assets/icons/right-arrow.png'),
  wishlistFilled: require('../assets/icons/wishlist-filled.png'),
  wishlistUnFilled: require('../assets/icons/wishlist-unfilled.png'),
  arrowDown: require('../assets/icons/down-arrow.png'),
  share: require('../assets/icons/share.png'),
  simpleCheck: require('../assets/icons/simple-check.png'),
  appleFilled: require('../assets/icons/apple-filled.png'),
  add: require('../assets/icons/add.png'),
  minus: require('../assets/icons/minus.png'),
  creditCardIcon: require('../assets/icons/credit-card-icon.png'),
  tick: require('../assets/icons/tick.png'),
  plus: require('../assets/icons/plus.png'),
  visaPay: require('../assets/icons/visa.png'),
  americanExpress: require('../assets/icons/american-express.png'),
  dinersClub: require('../assets/icons/diners-club.png'),
  discover: require('../assets/icons/discover.png'),
  jcb: require('../assets/icons/jcb.png'),
  mastercard: require('../assets/icons/mastercard.png'),
  unionpay: require('../assets/icons/unionpay.png'),
  backArrow: require('../assets/icons/backArrow.png'),
};

const fontFamily = {
  boldFont: 'Oswald-Bold',
  semiBoldFont: 'Oswald-SemiBold',
  regularFont: 'Oswald-Regular',
  mediumFont: 'Oswald-Medium',
  lightFont: 'Oswald-Light',
  extraLightFont: 'Oswald-ExtraLight',
};

const fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
  title: 30,
  content: 20,
};

const loadingModal = {
  color: '#FFFFFF',
  size: 20,
  overlayColor: 'rgba(0,0,0,0.5)',
  closeOnTouch: false,
  loadingType: 'Spinner', // 'Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'
};

const sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 25,
};

const styleSet = {
  menuBtn: {
    container: {
      backgroundColor: colorSet.grayBgColor,
      borderRadius: 22.5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    icon: {
      tintColor: 'black',
      width: 15,
      height: 15,
    },
  },
  searchBar: {
    container: {
      marginLeft: Platform.OS === 'ios' ? 30 : 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      flex: 1,
    },
    input: {
      backgroundColor: colorSet.inputBgColor,
      borderRadius: 10,
      color: 'black',
    },
  },
  rightNavButton: {
    marginRight: 10,
  },
  borderRadius: {
    main: 25,
    small: 5,
  },
  textInputWidth: {
    main: '80%',
  },
  backArrowStyle: {
    resizeMode: 'center',
    tintColor: '#4395f8',
    width: 30,
    height: 30,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 10,
  },
};

const appleButtonStyle = {
  dark: AppleButton?.Style?.WHITE,
  light: AppleButton?.Style?.BLACK,
  'no-preference': AppleButton?.Style?.WHITE,
};

const StyleDict = {
  imageSet,
  iconSet,
  fontFamily,
  colorSet,
  fontSet,
  sizeSet,
  navThemeConstants,
  styleSet,
  loadingModal,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  appleButtonStyle,
};

export default StyleDict;
