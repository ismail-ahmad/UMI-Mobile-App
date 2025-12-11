import Button from '@/components/button';
import Heading from '@/components/heading';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Home(){
    const router = useRouter();
  
    return(
        <View style={[styles.home]}>
          <Heading text='Forms' />
          <Button text='forms' onPressFunction={() => {router.push('/form')}} />
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