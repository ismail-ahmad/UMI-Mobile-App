import Button from '@/components/button';
import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function App(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignin, setIsSignin] = useState(false);
    if(isSignin) {
            return <Redirect href='/dashboard' />
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
            <Button text='Sign in' onPressFunction={() => {
                if(!email && !password){
                    Alert.alert('Credentials missing!');
                    return
                } else if(!email) {
                    Alert.alert('Email is missing');
                    return
                } else if( !password) {
                    Alert.alert('Password is missing');
                    return
                }
                const url='https://designsgravitas.com/signin';
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: email, password: password})
                })
                .then((res) => {
                    if(!res.ok) {
                        throw new Error(`HTTP ${res.status}`)
                    }
                    return res.json();
                })
                .then( async(res) => {
                    if (res.status === 'signin') {
                        try{
                            //Save Tokens in the mobile secure store 
                            const active = await SecureStore.setItemAsync('activeJwt', res.activeToken);
                            const refresh = await SecureStore.setItemAsync('refreshJwt', res.refreshToken);
                            console.log(JSON.stringify(active), JSON.stringify(refresh));
                            setIsSignin(true);
                        }
                        catch(err){
                            console.log(JSON.stringify(err));
                            Alert.alert('Server Error', 'Couldn\'t save the session, Please try again!');
                        }
                    }
                    else if(res.status === 'Invalid Email or Password!') {Alert.alert('Invalid Email or Password!', 'Try again!');}
                })
                .catch((err) => {
                    console.log(err);
                })
            }} />
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