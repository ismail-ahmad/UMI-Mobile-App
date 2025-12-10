import { useAuth } from '@/components/authContext';
import Button from '@/components/button';
import Heading from '@/components/heading';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Home(){
    const router = useRouter();
    const { logout } = useAuth();
  
    return(
        <View style={[styles.home]}>
          <Heading text='Reports' />
          <Button text='Reports' onPressFunction={() => {router.push('/reports')}} />
        </View>
    );
}
const styles = StyleSheet.create({
  home:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8
  }
})