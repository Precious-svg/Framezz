import { useAuth } from '@/src/context/AuthContext';
import { postAuth } from '@/src/context/PostContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreatePost = () => {
  const {addNewPost} = postAuth()
  const {currentUser} = useAuth()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(""); // { uri: '...' }
  const [caption, setCaption] = useState("");
  if (!currentUser) return <Text>Loading your profile...</Text>;

  const postToAdd = {
    imageUrl : selectedImage,
    caption: caption
  }

  const pickImage = async () => {
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
  
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,    // optional: crop image
      quality: 1,             // 0..1
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);  // set image URI
    }
  };

  // function to take a photoi
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
    
  // function to add a new post
  const handleAddNewPost = async() =>{
    console.log("clicked")
    if(!selectedImage){
      console.log("please select or take an image");
      return;
    }
    try{

      console.log("router called")
      
      const newPostId = await addNewPost(postToAdd)
      console.log("firebase called")
      router.replace('/(tabs)/')
      setSelectedImage("");
      setCaption("")
    }catch(error){
      console.log("unable to add new post, please try again:", error)
    }
   
  }
  
  return (
    <SafeAreaView style={{ width: '100%', paddingTop: 10, paddingHorizontal: 6, backgroundColor: '#e7e5e4', flex: 1}}>
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignContent: 'center'}}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32}}>Framez</Text>
        <View style={{ flexDirection: 'row', height:60, width: 60, borderRadius: 30, alignItems: 'center', gap: 20, position: 'relative' }}>
          
          {/* Profile Icon */}
          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="person-circle-outline" size={60} color="white" />
          </TouchableOpacity>
         <TouchableOpacity onPress={takePhoto} style={{position: 'absolute', bottom: '0', right: '0'}}>
           <MaterialIcons name="add-circle" size={30}  color="red"/>
        </TouchableOpacity>
      </View>

     </View>

     <View  style={{marginTop: 50, borderRadius: 8, alignSelf: 'center', backgroundColor:'#f8fafc', flexDirection: 'column', justifyContent: 'flex-start', width: 340, height: 320, border: 8, borderColor: "#fafafa"}}>
       <View style={{borderTopRightRadius: 8, borderTopLeftRadius: 8, width: 340, height: 240,  backgroundColor: '#0c0a09', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {selectedImage ? (
              <Image  source={{ uri: selectedImage }} style={{ width: 340, height: 240, marginVertical: 10, objectFit: 'fill' }}  />
          ): (
           <TouchableOpacity onPress={takePhoto} style={{}}>
              <MaterialIcons name="add-a-photo" size={30}  color="#e7e5e4"/>
             </TouchableOpacity>
          )}
        </View>
         <View  style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10}}>
           
           <TouchableOpacity onPress={pickImage} style={{}}>
              <MaterialIcons name="collections" size={30}  color="#74d4ff"/>
          </TouchableOpacity>

          <TextInput placeholder='Add a message' value={caption} onChangeText={setCaption} style={{backgroundColor: '#fff',
             borderRadius: 10,
             shadowColor: '#000',
             shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5, paddingVertical: 20, paddingHorizontal: 25}}/>

          <TouchableOpacity onPress={handleAddNewPost} style={{}}>
            <MaterialIcons name="send" size={30}  color="#ff2056"/>
          </TouchableOpacity>
         </View>
     </View>
    </SafeAreaView>
  )
}

export default CreatePost
const styles = StyleSheet.create({})