import { useAuth } from '@/src/context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


const Profile = () => {
  const router = useRouter()
  const {logOut, fetchUserData, currentUser} = useAuth()
 const [userData, setUserData] = useState()

  
  

    const handleLogOut = async() => {
      await logOut;
      router.replace('/(auth)/SignUp')
      Toast.show({
        type: 'success',
        text1: 'You have been logged out',
        text2: 'Log in to view yiur posts!.',
        position: 'top'
      });

    }
  

  const get = async () => {
    console.log("current user:", currentUser.displayName)
    const user = await fetchUserData(currentUser.uid);
    setUserData(user); // async
    console.log("user from fire:", user); // shows correct data
  };
  
  useEffect(() => {
    get();
  }, []);
  
  useEffect(() => {
    console.log("React state userData updated:", userData);
  }, [userData]);
  return (
    <SafeAreaView>
      <MaterialIcons name="person-outline" size={60} color="white" />
      <Text>{currentUser.email}</Text>
      <View>
        <Button title="Edit Profile"/>
        <Button onPress={handleLogOut} title="Log Out"/>
      </View>
      
    </SafeAreaView>
  )
}

export default Profile