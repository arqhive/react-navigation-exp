import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      usertoken: null,
    },
  );

  React.useEffect(() => {
    // 스토리에서 토큰을 Fetch 그리고 원하는 장소로 내비게이트
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // 토큰 불러오기 실패
      }

      // 토큰을 불러오면, 아마 프로덕션앱인 경우 검증이 필요할 것이다.

      // 이것은 앱 화면을 전환시킨다.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // 프로덕션 앱에서는 서버로 보낼 몇가지 데이터 (아마 사용자명, 비밀번호)가 필요하다
        // 또는 실패시 에러를 핸들링할 로직도 필요하다
        // 토큰을 얻은 뒤에는 AsyncStorage에 영구적으로 저장하다.
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data) => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {signIn} = React.useContext(AuthContext);

    return (
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={() => signIn({username, password})} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {state.userToken === null ? (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
