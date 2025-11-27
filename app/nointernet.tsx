import { useNetAuth } from '@/components/NetAuth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Nointernet(){
  const router = useRouter();
  const { load, isConnected, isInternetReachable, refresh, setRefresh } = useNetAuth();
  const handleRefresh = () => {
    load();
  }

  useEffect(() => {
    if(isConnected === true && isInternetReachable === true){
      router.replace('/');
    } else if(isConnected === false && isInternetReachable === false){
      // Alert.alert('Connection Error!', 'You are not Connected to the internet!');
    } else if(isConnected === true && isInternetReachable === false) {
      // Alert.alert('Network Error!', 'Internet is inaccessible!');
    }
  },[isConnected, isInternetReachable]);
    return(
        <View style={styles.container}>
          <Text style={styles.title}>No Internet</Text>
          <Pressable onPress={() => {handleRefresh();}} style={styles.refreshButton}><Text style={styles.refreshButtonText}>Refresh</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50
  },
  title: {
    color: 'white',
    fontWeight: 500,
    fontSize: 32
  },
  refreshButton: {
    width: '100%',

  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 500,
    fontSize: 16,
    backgroundColor: 'dodgerblue',
    textAlign: 'center',
    padding: 8,
    fontStyle: 'italic'
  }
});