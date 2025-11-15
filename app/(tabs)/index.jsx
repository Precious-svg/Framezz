import { onAuthStateChangedListener } from '@/firebaseAuth';
import { db } from '@/firebaseConfig';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../src/context/AuthContext';
import { postAuth } from '../../src/context/PostContext';
const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [allPosts, setAllPosts] = useState(null)
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { fetchAllPosts, deleteNewPost} = postAuth()
  const { logOut, currentUser} = useAuth()
  const router = useRouter()

  const handledel = async(id) => {
      await deleteNewPost(id)
      router.replace('/(tabs)/')
      Toast.show({
        type: 'success',
        text1: 'Post deleted',
        text2: 'Your post has been deleted successfully.',
        position: 'top'
      });
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((usr) => {
      setUser(prev => (prev?.uid !== usr?.uid ? usr : prev));
    });
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);


  useEffect(() => {
    if( !user) return;
   

  setLoadingPosts(true);

  const postsRef = collection(db, "posts");

  const unsubscribe = onSnapshot(postsRef, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAllPosts(data);
    setLoadingPosts(false);
  });

  // Cleanup listener on unmount
  return () => {
    unsubscribe(); // no need for `?` here
  };
    
  }, [user])

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No user signed in</Text>
      </View>
    );
  }

  if(loadingPosts) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading post feed...</Text>
      </View>
    )
  }

 

  const renderPostItems = ({item}) => {
    return (
    
      <View  style={{marginTop: 50, borderRadius: 8, alignSelf: 'center', backgroundColor:'#f8fafc', flexDirection: 'column', justifyContent: 'flex-start', width: 340, height: 320, border: 8, borderColor: "#fafafa"}}>
        
      <View style={{borderTopRightRadius: 8, borderTopLeftRadius: 8, width: 340, height: 240, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Image  source={{ uri: item.imageUrl }} style={{ width: 340, height: 240, marginVertical: 10, objectFit: 'fill' }}  />
       </View>
      <View  style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10}}>
          
          <TouchableOpacity style={{}}>
             <MaterialIcons name="favorite" size={30}  color="#74d4ff"/>
         </TouchableOpacity>
         <TouchableOpacity style={{}}>
           <MaterialIcons name="add-comment" size={30}  color="#ff2056"/>
         </TouchableOpacity>
         
         <TouchableOpacity style={{}} onPress={() => handledel(item.id)}>
           <Ionicons  name="trash-outline" size={24}   color="#ff2056"/>
         </TouchableOpacity>
         <Text>
         {(() => {
           const likes = item.likes ?? []; // default to empty array
            if (likes.length === 0) return "Be the first to like this"; // no likes yet
            if (likes.length === 1) return `Liked by ${likes[0].uid}`;
           return `Liked by ${likes[0].uid} and ${likes.length - 1} others`;
           })()}
         </Text>

         <Text>{item?.caption}</Text>
        
        </View>
    </View>
    )
  }

  return (
    <SafeAreaView style={{ width: '100%', paddingTop: 10, backgroundColor: '#0c0a09', flex: 1}}>
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignContent: 'center'}}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32}}>Framez</Text>
      <View style={{ flexDirection: 'row', height:60, width: 60, borderRadius: 30, alignItems: 'center', gap: 20, position: 'relative' }}>
        
        {/* Profile Icon */}
        <TouchableOpacity onPress={() => console.log("Go to Profile")}>
          <Ionicons name="person-circle-outline" size={60} color="white" />
        </TouchableOpacity>
       <TouchableOpacity onPress={() => console.log("Add something")} style={{position: 'absolute', bottom: '0', right: '0'}}>
         <MaterialIcons name="add-circle" size={30}  color="red"/>
      </TouchableOpacity>
    </View>
  </View>

  {/* main area that shows post */}
  <FlatList data={allPosts} renderItem={renderPostItems}  keyExtractor={(item, index) => item.id ?? index.toString()}
  />
  </SafeAreaView>
  );
}
export default HomeScreen