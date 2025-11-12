import { useAuth } from '@/src/context/AuthContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'


const Profile = () => {
  const router = useRouter()
  const {logOut, fetchUserData, currentUser} = useAuth()
  const handleLogOut = async () =>{
    await logOut
    router.replace("/(auth)/SignUp")
  }

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
    const user = await fetchUserData(currentUser.uid)
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Profile edited successfully!.',
      position: 'top'
    });
  }
  return (
    <SafeAreaView>
      
    </SafeAreaView>
  )
}

export default Profile