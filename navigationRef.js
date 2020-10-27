// Redux 와 같은 외부 파일에서 화면 이동이 필요한 경우
// App.js

import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>{/* ... */}</NavigationContainer>
  );
}

// RootNavigation
import * as React from 'react';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// 어디서든 불러온다
import * as RootNavigation from './path/to/RootNavigation.js';

// ...

RootNavigation.navigate('ChatScreen', {userName: 'Lucy'});

// 스택 액션 추가
import {StackActions} from '@react-navigation/native';

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

// 마운트 확인하기
// App.js

import {NavigationContainer} from '@react-navigation/native';
import {navigationRef, isReadyRef} from './RootNavigation';

export default function App() {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      {/* ... */}
    </NavigationContainer>
  );
}
