import { useAuth } from '@/components/authContext';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Nointernet(){
  const { setRefresh } = useAuth();
    return(
        <View style={styles.container}>
          <Text style={styles.title}>No Internet</Text>
          <Pressable onPress={() => setRefresh(true)} style={styles.refreshButton}><Text style={styles.refreshButtonText}>Refresh</Text></Pressable>
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