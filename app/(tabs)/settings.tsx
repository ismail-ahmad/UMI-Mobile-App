import { useAuth } from '@/components/authContext';
import Button from '@/components/button';
import Heading from '@/components/heading';
import MainWrapper from '@/components/main_wrapper';
import { StyleSheet } from 'react-native';


export default function Home(){
    const { logout } = useAuth();
  
    return(
        <MainWrapper style={{justifyContent: 'space-between'}}>
          <Heading text='Settings' />
          <Button text='logout' onPressFunction={() => {logout()}} />
        </MainWrapper>
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