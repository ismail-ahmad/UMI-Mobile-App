import { useAuth } from '@/components/authContext';
import Button from '@/components/button';
import Heading from '@/components/heading';
import InputTextField from '@/components/text_input_field';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function App(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated } = useAuth();
    if(isAuthenticated) {
            return <Redirect href='/dashboard' />
        }
    return(
         <View style={[styles.Container, styles.LayoutFrame]}>
            <Heading text='Concept' />
            <View style={styles.fields}>
                <InputTextField value={email} onChangeText={(text) => {setEmail(text.toLowerCase())}} placeHolder='Email'/>
                <InputTextField value={password} onChangeText={(text) => {
                    setPassword(text);
                }} placeHolder='Password' secureText={true} />
            </View>
            <Button text='Sign in' onPressFunction={() => {login(email, password)}} />
         </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'column',
        padding: 18,
        gap: 50,
        justifyContent: 'center'
    },
    fields: {
        gap: 12
    },
    LayoutFrame: {
    backgroundColor: 'black'
    
  }
});