import { useAuth } from '@/src/context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


const Profile = () => {
  const router = useRouter()
  const {logOut, fetchUserData, currentUser} = useAuth()
 const [userData, setUserData] = useState()
  const handleEditUser = async() => { 
    if(!currentUser) return;
    try{

    }catch(error){
      Toast.show({
        type: 'error',
        text1: 'Success',
        text2: 'Eerror editing your profile!.',
        position: 'top'
      });
    }

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
    const user = await fetchUserData(currentUser.uid)
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Profile edited successfully!.',
      position: 'top'
    });
  }

  useEffect( () => {
    const get = async ()=> {
      const user = await fetchUserData(currentUser.uid)
      setUserData(user)
    }
   get()
  }, [])
  return (
    <SafeAreaView>
      <MaterialIcons name="person-outline" size={60} color="white" />
      <Text>{user.name}</Text>
      <View>
        <Button title="Edit Profile"/>
        <Button onPress={handleLogOut} title="Log Out"/>
      </View>
      
    </SafeAreaView>
  )
}

export default Profile