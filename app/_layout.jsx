// app/_layout.tsx
import { Slot, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import AuthProvider, { useAuth } from "../src/context/AuthContext";
import PostProvider from "../src/context/PostContext";
import { toastConfig } from "../src/toast/toast.config";

export default function RootLayout() {
  return (
    <AuthProvider>
      <PostProvider>
       <AuthGate />
       <Toast config={toastConfig}/>
      </PostProvider>
    </AuthProvider>
  );
}

function AuthGate() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const redirectedRef = useRef(false); // prevents multiple redirects

  useEffect(() => {
    if (!loading && !redirectedRef.current) {
      redirectedRef.current = true;

      if (!currentUser) {
        router.replace("/(auth)/SignUp");
      } else {
        router.replace("/"); // or "/(tabs)/"
      }
    }
  }, [loading, currentUser, router]);

  // Always render <Slot /> but show loading overlay if not ready
  return (
    <>
      <Slot />
      {loading && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" }}>
          <Text style={{ color: "white" }}>Loading…</Text>
        </View>
      )}
    </>
  )
}