import { useAuth } from '@/components/authContext';
import Button from '@/components/button';
import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function App(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated } = useAuth();
    if(isAuthenticated) {
            return <Redirect href='/home' />
        }
    return(
         <View style={styles.Container}>
            <Heading text='Concept' />
            <View style={styles.fields}>
                <FormField value={email} onChangeText={(text) => {setEmail(text.toLowerCase())}} placeHolder='Email'/>
                <FormField value={password} onChangeText={(text) => {
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
    }
});