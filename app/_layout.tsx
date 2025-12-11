import { AuthContextProvider } from '@/components/authContext';
import { NetContextProvider } from '@/components/NetAuth';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { Platform, View } from "react-native";

export default function RootLayout() {
useEffect(() => {

  const applyAndroidNavBar = async () => {
    try {
      await NavigationBar.setStyle('dark');
      await NavigationBar.setBackgroundColorAsync('black');
    } catch (error) {
      console.error('Failed to update navigation bar:', error);
    }
  };

  if (Platform.OS === 'android') {
    applyAndroidNavBar();
  }
}, []);



  return(
    
      <AuthContextProvider>
        <NetContextProvider>
          <View style={{ flex: 1, backgroundColor: 'black'}}>{/* use this to style backgroundColor of the root View on iOS */}
            <Stack screenOptions={{headerShown: false}} />
            <StatusBar style="light" />
          </View>
     </NetContextProvider>
    </AuthContextProvider>
  );
}