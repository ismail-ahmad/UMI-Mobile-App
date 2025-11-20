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
            const Tokens = await SecureStore.getItemAsync('activeJwt');
            if(Tokens) {
                const response = await apiCall('/auth', {
                    method: 'POST'
                }
                );
                if(!response){
                    setToken(false);
                    return;
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