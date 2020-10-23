import * as React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// navigation -> 화면의 탐색 props
// route -> 화면의 경로 props

// 스택 내비게이터 만들기
function HomeScreen({route, navigation}) {
  const [count, setCount] = React.useState(1);
  // React.useEffect(() => {
  //   if (route.params?.post) {
  //   }
  // }, [route.params?.post]);

  // 헤더가 화면과 상호작용하는 방법
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update Count" />
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            // 직렬화가 가능한 데이터만 전달됨
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
      <Button
        title="Create Post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({title: 'Updated!'})} // options 변경 방법
      />
      <Text style={{margin: 10}}>Post: {route.params?.post}</Text>
      <Text>{count}</Text>
    </View>
  );
}

function CreatePostScreen({navigation, route}) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          navigation.navigate('Home', {post: postText}); // 이전 화면에 params을 넘겨 줄 수도 있음
        }}
      />
    </>
  );
}

function DetailsScreen({route, navigation}) {
  const {itemId, otherParam} = route.params;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>DetailsScreen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {itemId: Math.floor(Math.random() * 100)})
        } // 이미 있는 경로지만 새로 경로를 추가한다.
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()} // 스택의 첫번째 화면으로 이동함
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        // 공통 옵션
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Overview',
            // 헤더 View 스타일
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff', // 뒤로 버튼과 제목 색상
            headerTitleStyle: {
              // 타이틀 스타일
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          initialParams={{itemId: 42, otherParam: 'default'}}>
          {(props) => <DetailsScreen {...props} myData="myData" />}
        </Stack.Screen>
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          // options={({route, navigation}) => ({title: route.params.name})} // 매개 변수를 이용할수있다.
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
