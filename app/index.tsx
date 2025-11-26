import { useNetAuth } from '@/components/NetAuth';
import { useAuth } from '@/components/authContext';
import { Redirect, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [token, setToken] = useState<boolean | null>(null);
    const { setRefresh, load, refresh } = useNetAuth();
    const [isConnected, setIsConnect] = useState<boolean | undefined> (undefined);
    const [isInternetReachable, setIsInternetReachable] = useState<boolean | undefined> (undefined);
    const { apiCall } = useAuth();
    const router = useRouter();


    useEffect(() => {
    load();
    },[]);

    useEffect(() => {
        if(isConnected === false){
            //show alert that you are disconnect
            SplashScreen.hideAsync();
            router.replace('/nointernet');
            Alert.alert('Connection Error!', 'You are not Connected to the internet!');
            setRefresh(false);
        } else if(isInternetReachable === false) {
            SplashScreen.hideAsync();
            router.replace('/nointernet');
            Alert.alert('Network Error!', 'Internet is inaccessible');
            setRefresh(false);
        } else {
            const checkToken = async () => {
            let Tokens = await SecureStore.getItemAsync('activeJwt');
            if(!Tokens) {
                setToken(false);
                return;
            }
            const response = await apiCall('https://concept-server-production.up.railway.app/auth', { method: 'POST' });
            if(response !== null){
                if(!response.ok){
                    setToken(false);
                }
                setToken(true);
            }
          }
        
          checkToken();
        }
    },[isConnected, isInternetReachable]);

    useEffect(() => {
        if(token !== null) {
            SplashScreen.hideAsync();
        }
    }, [token]);

        if(token === null) return null

    return(
        token ? <Redirect href='/home' /> : <Redirect href='/login' />
    );
}