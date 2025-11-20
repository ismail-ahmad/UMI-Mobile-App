import { AuthContextProvider } from '@/components/authContext';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView style={styles.LayoutFrame}>
     <Slot />
     <StatusBar style="light" backgroundColor='black'/>
    </SafeAreaView>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  LayoutFrame: {
    backgroundColor: 'black',
    flex: 1
    
  }
})