import * as React from 'react';
import * as Analytics from 'expo-firebase-analytics';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          Analytics.setCurrentScreen(currentRouteName);
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}>
      {/* ... */}
    </NavigationContainer>
  );
}
