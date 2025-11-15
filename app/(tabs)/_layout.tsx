import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
// import HomeScreen from '.';
// import CreatePost from './CreatePost';
// import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title: 'HomeScreen', tabBarIcon:  ({color}) => <Ionicons name="home" size={24} color={color}/>}} />
      <Tabs.Screen name="CreatePost" options={{title: 'Create', tabBarIcon:  ({color}) => <Ionicons name="add-circle" size={24} color={color}/>}} />
      <Tabs.Screen name="Profile" options={{title: 'Profle', tabBarIcon:  ({color}) => <Ionicons name="person" size={24} color={color}/>
     }}/>
    </Tabs>
  );
}
