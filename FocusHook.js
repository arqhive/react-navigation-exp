import * as React from 'react';
import {View} from 'react-native';

function ProfileScreen({navigation}) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return <View />;
}

import {useFocusEffect} from '@react-navigation/native';

function Profile({userId}) {
  const [user, setUser] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = API.subscribe(userId, (user) => setUser(data));

      return () => unsubscribe();
    }, [userId]),
  );

  return <ProfileContent user={user} />;
}

import * as React from 'react';
import {Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

function Profile() {
  // This hook returns `true` if the screen is focused, `false` otherwise
  const isFocused = useIsFocused();

  return <Text>{isFocused ? 'focused' : 'unfocused'}</Text>;
}
