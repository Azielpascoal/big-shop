import React, { useState, useEffect } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import AppContainer from './screens/AppContainer';
import { setI18nConfig } from './Core/localization/IMLocalization';
import * as RNLocalize from 'react-native-localize';
import { enableScreens } from 'react-native-screens';

const store = configureStore();
// const handleLocalizationChange = () => {
//   setI18nConfig();
// };

const App = (props) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  enableScreens();

  useEffect(() => {
    YellowBox.ignoreWarnings(['Remote Debugger']);
    console.disableYellowBox = true;
    setI18nConfig();
    Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
  }, []);

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <AppContainer />
      </AppearanceProvider>
    </Provider>
  );
};

export default App;
