import invert from 'invert-color';

const darkColorSet = {
  mainThemeBackgroundColor: invert('#ffffff'),
  mainThemeForegroundColor: '#4991ec',
  mainTextColor: invert('#151723'),
  mainSubtextColor: invert('#7e7e7e'),
  subTextColor: invert('#a6a6a6'),
  hairlineColor: invert('#e0e0e0'),
  subHairlineColor: invert('#f2f2f3'),
  tint: invert('#3068CC'),
  facebook: invert('#4267b2'),
  grey: invert('#acabac'),
  borderColor: invert('#efefef'),
  whiteSmoke: invert('#f5f5f5'),
  headerStyleColor: invert('#ffffff'),
  headerTintColor: invert('#000000'),
  bottomStyleColor: invert('#ffffff'),
  bottomTintColor: 'grey',
  mainButtonColor: invert('#e8f1fd'),
  subButtonColor: invert('#eaecf0'),
  tabColor: invert('#ffffff'),
};

const lightColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  mainThemeForegroundColor: '#4991ec',
  mainTextColor: '#151723',
  mainSubtextColor: '#7e7e7e',
  subTextColor: '#a6a6a6',
  hairlineColor: '#e0e0e0',
  subHairlineColor: '#f2f2f3',
  tint: '#3068CC',
  facebook: '#4267b2',
  grey: '#acabac',
  borderColor: '#efefef',
  whiteSmoke: '#f5f5f5',
  headerStyleColor: '#ffffff',
  headerTintColor: '#000000',
  bottomStyleColor: '#ffffff',
  bottomTintColor: 'grey',
  mainButtonColor: '#e8f1fd',
  subButtonColor: '#eaecf0',
  tabColor: '#ffffff',
};

const lightNavColorSet = {
  backgroundColor: '#ffffff',
  fontColor: '#000',
  secondaryFontColor: '#989898',
  secondaryFontColorFocused: '#0d0d0d',
  activeTintColor: '#4991ec',
  inactiveTintColor: '#888',
  hairlineColor: '#efefef',
  main: '#4991ec',
};

const darkNavColorSet = {
  backgroundColor: '#121212',
  fontColor: '#fff',
  secondaryFontColor: '#fff',
  secondaryFontColorFocused: '#a6a6a6',
  activeTintColor: '#4991ec',
  inactiveTintColor: '#ccc',
  hairlineColor: '#222222',
  main: '#4991ec',
};

const colorSet = {
  light: lightColorSet,
  dark: darkColorSet,
  'no-preference': lightColorSet,
};

const navThemeConstants = {
  light: lightNavColorSet,
  dark: darkNavColorSet,
  'no-preference': lightNavColorSet,
};

const composerStyle = {
  colorSet,
  navThemeConstants,
};

export default composerStyle;
