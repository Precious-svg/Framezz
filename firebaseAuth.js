

import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from "./firebaseConfig";




export const signUpWithEmail = async(email, password, name) => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        try {
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              email: user.email,
              createdAt: Date.now(),
              displayName: name || ""
            });
       } catch (firestoreError) {
            console.warn("Firestore user document could not be created:", firestoreError);
            // Optional: you can still continue, or delete the user if you want strict consistency
        }
      
        return user;

    } catch(error){
        throw error;
    }
};

export const signInWithEmail = async(email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Logged in as:", user.email)
    } catch(error){
        throw error;
    };
}

export const resetPassword = async(email) => {
    try{
        const userCredential = await sendPasswordResetEmail(auth, email);
        const user = userCredential.user;
        console.log("This is the user email:", user.email)
    } catch(error){
        console.error("Failed to fetch user email");
        throw error;
    };
}

export const editProfile = async(userId, updatedData) => {
       
    try{
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, updatedData);
    }catch(error){
        console.error("Error updating task data:", error)
    }
}

export const signOutUser = async () => {
    await signOut(auth);
}


// sign in with google

export const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      // Optional: access user info

      if (!result || !result.user) {
        console.warn('Google sign-in returned no user');
        return null;
      } 
      const user = result.user;
      console.log('User signed in:', user.displayName);
      return user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
};

export const fetchUser = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            throw new Error("user not found");
        }

        return userSnap.data();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null; // Ensures the function always returns something
    }
};

// check auth state

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback)
}
