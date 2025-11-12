import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";
import { useAuth } from '../../src/context/AuthContext';

const SignUp = () => {
  const { logIn, signUp } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSignUp, setIsSignUp] = useState(true);
    const [isLogIn, setIsLogIn] = useState(false);
    const router = useRouter()


    const handleSignUp = async() => {
        if(!email || !password || !name){
            setError("Please fill in all the fields!")
            return;
        }
       try{
        console.log(`user details:, ${email, password, name}`)
         const user = await signUp(email, password, name)
         console.log("sign up clicked")
          setError(null)
          setMessage(`Sign up successful, ${user.uid}`)
          setIsSignUp(false)
          setIsLogIn(true)
       }catch(error){
        console.log("Unable to signup:", error)
        setError("Unable to sign up. Please try again!")
       }
    }

    const handleLogIn = async () => {
      if(!email || !password){
        setError("Please enter your email and password")
        return;
      }

      try {
        const user = await logIn(email, password)
        setError(null)
        setIsSignUp(false)
        setMessage("Log in details correct, Logging in...")
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Log in successful!.',
          position: 'top'
        });
        router.replace("/(tabs)")
      }catch(error){
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Unable to log in. Please try again',
          position: 'top'
        });
        console.log("Unable to log in:", error)
        setError("Unable to log in. Please try again!")
      }
    }
  return (
    <SafeAreaView>
      <View>
         {isSignUp ? 
        (
         <Text>
           Already have an account?{''} <TouchableOpacity onPress={() => {setIsSignUp(false); setIsLogIn(true); setEmail(""); setPassword("")}}><Text>Log in</Text></TouchableOpacity>
          </Text> 
        )
        : (
            <Text>
              Create an account{''}. <TouchableOpacity  onPress={() => {setIsLogIn(false); setIsSignUp(true); }}><Text>Sign up</Text></TouchableOpacity>
            </Text>)}
      </View>
      {
        isSignUp && (
          <View>
           <TextInput placeholder="Enter your full name" value={name} onChangeText={setName}/>
           <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail}/>
            <TextInput placeholder="Enter your password" value={password} onChangeText={setPassword}/>
            <Button onPress={handleSignUp} title="Create Account"/>
             
        </View>
        )
      }

      {/* for log in part */}
     { !isSignUp && (
      <View>
         <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail}/>
          <TextInput placeholder="Enter your password" value={password} onChangeText={setPassword}/>
          <Button onPress={handleLogIn} title="Log in"/>
      </View>)
    }
     {/* Error / Message */}
     {error ? <Text style={{ color: "red", marginTop: 8 }}>{error}</Text> : null}
      {message ? <Text style={{ color: "green", marginTop: 8 }}>{message}</Text> : null}
    </SafeAreaView>
  )
}

export default SignUp