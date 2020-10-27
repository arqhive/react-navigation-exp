import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>{/* content */}</NavigationContainer>
  );
}

import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

export default () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* content */}
      </NavigationContainer>
    </AppearanceProvider>
  );
};
