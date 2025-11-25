import { useAuth } from '@/components/authContext';
import * as Network from 'expo-network';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [token, setToken] = useState<boolean | null>(null);
    const [isConnected, setIsConnect] = useState<boolean | undefined> (undefined);
    const [isInternetReachable, setIsInternetReachable] = useState<boolean | undefined> (undefined);
    const [ip, setIp] = useState<string| null>(null);
    const { apiCall } = useAuth();


    useEffect(() => {
        const load = async() => {
        const network = await  Network.getNetworkStateAsync();
        const ip = await Network.getIpAddressAsync();
        setIp(() => ip);
        setIsConnect(() => network.isConnected);
        setIsInternetReachable(() => network.isInternetReachable);
        console.log(isConnected, isInternetReachable);
    };
    load();
    },[]);

    useEffect(() => {
        if(isConnected === false){
            //show alert that you are disconnect
            SplashScreen.hideAsync();
            Alert.alert('Connection Error!', 'You are not Connected to the internet!');
        } else if(isInternetReachable === false) {
            SplashScreen.hideAsync();
            Alert.alert('Network Error!', 'Internet is not accessible!');
        } else {
            console.log(isConnected, isInternetReachable);
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