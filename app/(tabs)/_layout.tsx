import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '.';
import CreatePost from './CreatePost';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="index" component={HomeScreen} />
      <Tab.Screen name="CreatePost" component={CreatePost} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
