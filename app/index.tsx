import { useAuth } from '@/components/authContext';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [token, setToken] = useState<boolean | null>(null);
    const { apiCall } = useAuth();
    useEffect(() => {
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
    }, []);
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