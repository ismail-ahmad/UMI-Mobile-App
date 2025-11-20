import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [token, setToken] = useState<boolean | null>(null);
    useEffect(() => {
        const checkToken = async () => {
            // const Tokens = await SecureStore.getItemAsync('activeJwt');
            const Tokens = false;
            if(Tokens) {
                //auto sign in call via token
                //once finished calling set token to true
              setToken(true);
            } else {
              setToken(false);
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