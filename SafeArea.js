// SafeArea는 아래 4가지를 제외한 부분을 말함
// 1. 물리적 노치 2. 상태 표시줄 오버레이 3. iOS 홈활동 인디케이터, 4. 안드로이드 내비게이션 바
import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// 아래의 코드에 맞춰서 작성한다. (가로모드에서도 적용됨)
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function Demo() {
  // 이 훅을 사용하면 instets.top, insets.bottom 값으로 안전영역만큼 패딩을 사용할수 있음
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>This is top text.</Text>
        <Text>This is bottom text.</Text>
      </View>
    </SafeAreaView>
  );
}
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* 헤더를 렌더링 하지 않아서 안전영역이 모두 드러남 */}
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home">
            {() => (
              // 탭바를 렌더링 하지 않아서 안전영역이 모두 드러남
              <Tab.Navigator initialRouteName="Analytics" tabBar={() => null}>
                <Tab.Screen name="Analytics" component={Demo} />
                <Tab.Screen name="Profile" component={Demo} />
              </Tab.Navigator>
            )}
          </Stack.Screen>

          <Stack.Screen name="Settings" component={Demo} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
