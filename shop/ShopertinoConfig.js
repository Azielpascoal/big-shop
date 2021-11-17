import { Platform } from 'react-native';
import AppStyles from './AppStyles';
import { IMLocalized, setI18nConfig } from './Core/localization/IMLocalization';

setI18nConfig();

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;
const ShopertinoConfig = {
  currency: '$',
  isSMSAuthEnabled: true,
  appIdentifier: 'rn-social-network-android',
  onboardingConfig: {
    welcomeTitle: IMLocalized('Welcome to your app'),
    welcomeCaption: IMLocalized(
      'Use this codebase to build your own ecommerce in minutes.',
    ),
    walkthroughScreens: [
      {
        icon: require('../assets/images/shopping-bag.png'),
        title: IMLocalized('Shopping Bag'),
        description: IMLocalized(
          'Add products to your shopping cart, and check them out later.',
        ),
      },
      {
        icon: require('../assets/images/quick-search.png'),
        title: IMLocalized('Quick Search'),
        description: IMLocalized(
          'Quickly find the products you like the most.',
        ),
      },
      {
        icon: require('../assets/images/wishlist.png'),
        title: IMLocalized('Wishlist'),
        description: IMLocalized(
          'Build a wishlist with your favourite products to buy them later.',
        ),
      },
      {
        icon: require('../assets/images/delivery.png'),
        title: IMLocalized('Order Tracking'),
        description: IMLocalized(
          'Monitor your orders and get updates when something changes.',
        ),
      },
      {
        icon: require('../assets/images/notification.png'),
        title: IMLocalized('Group Chats'),
        description: IMLocalized(
          'Get notifications for new products, promotions and discounts.',
        ),
      },
      {
        icon: require('../assets/images/payment.png'),
        title: IMLocalized('Stripe Payments'),
        description: IMLocalized(
          'We support all payment options, thanks to stripe.',
        ),
      },
      {
        icon:
          Platform.OS === 'ios'
            ? require('../assets/images/apple-pay.png')
            : require('../assets/images/google-pay.png'),
        title:
          Platform.OS === 'ios'
            ? IMLocalized('Apple Pay')
            : IMLocalized('Google Pay'),
        description:
          Platform.OS === 'ios'
            ? IMLocalized('Pay with a single click with Apple Pay.')
            : IMLocalized('Pay with a single click with Google Pay.'),
      },
    ],
  },
  tabIcons: {
    Feed: {
      focus: AppStyles.iconSet.homefilled,
      unFocus: AppStyles.iconSet.homeUnfilled,
    },
    Discover: {
      focus: AppStyles.iconSet.search,
      unFocus: AppStyles.iconSet.search,
    },
    Chat: {
      focus: AppStyles.iconSet.commentFilled,
      unFocus: AppStyles.iconSet.commentUnfilled,
    },
    Friends: {
      focus: AppStyles.iconSet.friendsFilled,
      unFocus: AppStyles.iconSet.friendsUnfilled,
    },
    Profile: {
      focus: AppStyles.iconSet.profileFilled,
      unFocus: AppStyles.iconSet.profileUnfilled,
    },
  },
  drawerMenuConfig: {
    upperMenu: [
      {
        title: IMLocalized('HOME'),
        icon: AppStyles.iconSet.homeDrawer,
        navigationPath: 'Home',
      },
      {
        title: IMLocalized('SHOP'),
        icon: AppStyles.iconSet.shopDrawer,
        navigationPath: 'Shop',
      },
      {
        title: IMLocalized('BAG'),
        icon: AppStyles.iconSet.shoppingBagDrawer,
        navigationPath: 'ShoppingBag',
      },
      {
        title: IMLocalized('SEARCH'),
        icon: AppStyles.iconSet.searchDrawer,
        navigationPath: 'Search',
      },
      {
        title: IMLocalized('ORDERS'),
        icon: AppStyles.iconSet.orderDrawer,
        navigationPath: 'Order',
      },
      {
        title: IMLocalized('WISHLIST'),
        icon: AppStyles.iconSet.wishlistDrawer,
        navigationPath: 'Wishlist',
      },
      {
        title: IMLocalized('PROFILE'),
        icon: AppStyles.iconSet.profileDrawer,
        navigationPath: 'Profile',
      },
    ],
    lowerMenu: [
      {
        title: IMLocalized('LOGOUT'),
        icon: AppStyles.iconSet.logoutDrawer,
        action: 'logout',
      },
    ],
  },
  tosLink: 'https://www.instamobile.io/eula-instachatty/',
  editProfileFields: {
    sections: [
      {
        title: IMLocalized('PUBLIC PROFILE'),
        fields: [
          {
            displayName: IMLocalized('First Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'firstName',
            placeholder: 'Your first name',
          },
          {
            displayName: IMLocalized('Last Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'lastName',
            placeholder: 'Your last name',
          },
        ],
      },
      {
        title: IMLocalized('PRIVATE DETAILS'),
        fields: [
          {
            displayName: IMLocalized('E-mail Address'),
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Your email address',
          },
          {
            displayName: IMLocalized('Phone Number'),
            type: 'text',
            editable: true,
            regex: regexForPhoneNumber,
            key: 'phone',
            placeholder: 'Your phone number',
          },
        ],
      },
    ],
  },
  userSettingsFields: {
    sections: [
      {
        title: IMLocalized('GENERAL'),
        fields: [
          {
            displayName: IMLocalized('Allow Push Notifications'),
            type: 'switch',
            editable: true,
            key: 'push_notifications_enabled',
            value: true,
          },
          {
            ...(Platform.OS === 'ios'
              ? {
                  displayName: IMLocalized('Enable Face ID / Touch ID'),
                  type: 'switch',
                  editable: true,
                  key: 'face_id_enabled',
                  value: false,
                }
              : {}),
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Save'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsFields: {
    sections: [
      {
        title: IMLocalized('CONTACT'),
        fields: [
          {
            displayName: IMLocalized('Address'),
            type: 'text',
            editable: false,
            key: 'push_notifications_enabled',
            value: '142 Steiner Street, San Francisco, CA, 94115',
          },
          {
            displayName: IMLocalized('E-mail us'),
            value: 'florian@instamobile.io',
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Your email address',
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Call Us'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsPhoneNumber: '+16504850000',
  stripeEnv: {
    API: {
      baseURL: 'https://murmuring-caverns-94283.herokuapp.com/', //your copied heroku link
      timeout: 15000,
    },
  },
  stripeConfig: {
    PUBLISHABLE_KEY: 'pk_test_LSo5mTIQqkRiTWd0eBMSDAXf00QZGCttt3', // "pk_test_..." in test mode and ""pk_live_..."" in live mode
    MERCHANT_ID: 'Your_merchant_id_goes_here',
    ANDROID_PAYMENT_MODE: 'test', // test || production
  },
  FIREBASE_COLLECTIONS: {
    USERS: 'users',
    PAYMENT_METHODS: 'payment_methods',
    STRIPE_CUSTOMERS: 'stripe_customers',
    CATEGORIES: 'shopertino_categories',
    CHARGES: 'charges',
    ORDERS: 'shopertino_orders',
    SOURCES: 'sources',
    PRODUCTS: 'shopertino_products',
    SHIPPING_METHODS: 'shipping_methods',
  },
};

export default ShopertinoConfig;
