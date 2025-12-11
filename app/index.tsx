import { useNetAuth } from '@/components/NetAuth';
import { useAuth } from '@/components/authContext';
import { Redirect, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [token, setToken] = useState<boolean | null>(null);
    const { setRefresh, load, refresh, isConnected, isInternetReachable } = useNetAuth();
    const { apiCall } = useAuth();
    const router = useRouter();


    useEffect(() => {
    load();
    },[]);

    useEffect(() => {
        if(isConnected === false || isInternetReachable === false){
            //show alert that you are disconnect
            SplashScreen.hideAsync();
            return router.replace('/nointernet');
        }else if(isInternetReachable === true) {
            const checkToken = async () => {
            let Tokens = await SecureStore.getItemAsync('activeJwt');
            if(!Tokens) {
                setToken(false);
                return;
            }
            const response = await apiCall('https://concept-server-production.up.railway.app/auth', { method: 'POST' });
            console.log(response);
            if(!response.ok && response.message === 'Unauthorized token!'){
                    setToken(false);
            } else if(!response.ok && response.message === 'Invalid JSON response!'){
                    SplashScreen.hideAsync();
                    return router.replace('/nointernet');
            }
            else if(response.message === 'active token verified!') {
                setToken(true);
            }
          }
        
          checkToken();
        }
    },[isConnected, isInternetReachable]);

    useEffect(() => {
        console.log(isConnected, isInternetReachable, refresh);
    },[isConnected, isInternetReachable]);

    useEffect(() => {
        if(token !== null) {
            SplashScreen.hideAsync();
        }
    }, [token]);

        if(token === null) return null

    return(
        token ? <Redirect href='/dashboard' /> : <Redirect href='/login' />
    );
}