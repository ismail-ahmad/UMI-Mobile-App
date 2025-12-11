import { useAuth } from '@/components/authContext';
import Button from '@/components/button';
import Heading from '@/components/heading';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home(){
    const safeArea = useSafeAreaInsets();
    const { logout } = useAuth();
  
    return(
        <View style={[styles.home, {paddingTop: safeArea.top + 32}]}>
          <Heading text='Settings' />
          <Button text='logout' onPressFunction={() => {logout()}} />
        </View>
    );
}
const styles = StyleSheet.create({
  home:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8
  }
})