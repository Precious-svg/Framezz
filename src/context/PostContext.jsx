
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { useAuth } from "./AuthContext";


const PostContext = createContext()
const PostProvider = ({children}) => {
  const { currentUser } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if(!currentUser) return; //wait until user is authenticated
      const q = query(collection(db, "posts"),  orderBy("createdAt", "desc"));
      
      
     const unsubscribe = onSnapshot(q, (snapshot) => {
        const allPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(allPosts)
        setLoading(false);
    }, (error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false)
    });
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
    }, [currentUser])


    const uploadToCloudinary = async (imageUri) => {
      const data = new FormData();
      data.append("file", {
        uri: imageUri,
        type: "image/jpeg", // or detect from your file
        name: `${Date.now()}.jpg`
      });
      data.append("upload_preset", "framez"); // From Cloudinary dashboard
      data.append("cloud_name", "dpsdeutfi");
    
      const res = await fetch("https://api.cloudinary.com/v1_1/dpsdeutfi/image/upload", {
        method: "POST",
        body: data,
      });
    
      const result = await res.json();
      return result.secure_url; // This is the URL to save in Firestore
    };

    // to add post

    const addNewPost = async(newPost) => {
      console.log("to call add new")

      if(!currentUser){
        console.log("No currentUser found, not adding task.");
        return;
      }; 
      console.log("moved")
      try{
        console.log("trying firebase now")
        // Convert the local URI (web or mobile) into a blob
        let imageUrlToSave = newPost.imageUrl;
        let imageUrl;

        // ✅ Handle image upload for both mobile and web
        if (imageUrlToSave) {
          imageUrl = await uploadToCloudinary(imageUrlToSave)
      
          console.log("✅ Image uploaded successfully:", imageUrl);
        }
    
        // ✅ Save post to Firestore
        console.log("Image uploaded, saving post to Firestore...");
     
        const docRef = await addDoc(collection(db, "posts"), {
          ...newPost, imageUrl : imageUrl || "", userId: currentUser.uid, likes: [], createdAt: serverTimestamp()
        })
        console.log("added now")

        console.log("Firebase docRef returned:", docRef);
        console.log("Task added with ID:", docRef.id);
        return docRef.id
      }catch(error){
        console.log("Error adding new post:", error)
      }
    }

    const deleteNewPost = async(postId) => {
     try{
      await deleteDoc(doc(db, 'posts', postId))
      return true;
     }catch(error){
       console.log("error deleting post:", error)
     }
    }

    const toggleLike = async(postId, likes = []) => {
      const postRef = doc(db, 'posts', postId)
      const hasLiked = likes.includes(currentUser.uid)
      try {
        updateDoc(postRef, {
          likes: hasLiked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid)
        });

        return likes.length + 1;
      }catch(error){
        console.error("Error toggling like:", error);
      }
    }

    // to fetch all posts

    const fetchAllPosts = async() => {
      
      
      try{
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
       const allPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

       console.log("All posts:", allPosts);
         return allPosts;
      }catch(error){
        console.error("Error fetching posts:", error);
      }
    }

   const fetchPost = async(Id) => {
      try{
          const postRef = doc(db, "posts", userId);
          const postSnap = await getDoc(userRef);
          if(!postSnap.exists()) throw new Error("task not found");
          const postData = postSnap.data();
          return postData
      }catch(error){;
          console.error('error fetchung user:', error);
      }
  }
  return (
    <PostContext.Provider value={{addNewPost, deleteNewPost, toggleLike, fetchAllPosts, fetchPost, posts}}>
      {children}
    </PostContext.Provider>
  )
}
export const postAuth = () => {
  return useContext(PostContext)
}

export default PostProvider
