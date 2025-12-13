import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { useNetworkErrors } from './network_errors';


type loginProps = (email:string, password: string) => void;


interface AuthContextProps {
    isAuthenticated: boolean | null;
    isLoading: boolean | null;
    apiCall: (
    url: string,
    options: {
        method: string,
        headers?: Record<string, string>,
        body?: string
    }
) => Promise<Record<string, any> | {ok?: boolean; status?: number; message?: string;}>;
    login: loginProps;
    logout: () => void ;
    getNewActiveToken: () => Promise<boolean | undefined>;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: null,
    isLoading: null,
    apiCall: async (url, options) => {return {ok: false, status: 500, message: 'Not Initialized!'} },
    login: (email, password) => {},
    logout: async() => {},
    getNewActiveToken: async() => false
});

export const AuthContextProvider = ({children}: {children:ReactNode}) => {

    //network timeout errors:
    const { setFailedRequest } = useNetworkErrors();
    
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [isConnected, setIsConnect] = useState<boolean | undefined> (undefined);
    const [isInternetReachable, setIsInternetReachable] = useState<boolean | undefined> (undefined);
    const [refresh, setRefresh] = useState<boolean>(true);


    const getNewActiveToken = async() => {
        const refreshToken = await SecureStore.getItemAsync('refreshJwt');
        if(!refreshToken){
            return false;
        }
            try{
                const refreshToken = await SecureStore.getItemAsync('refreshJwt');
                const response = await fetch('https://concept-server-production.up.railway.app/refresh-token', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${refreshToken}`
                }
            });
            const res = await response.json();
            if(!res?.ok && (res.message === 'token not found!' || res.message === 'Refresh token expired!')){
                return false;
            };

            const newActiveJwt = res.activeJwt;
            await SecureStore.setItemAsync('activeJwt', newActiveJwt);
            return true;
            }catch(err){
                console.log(`Error: There was a problem connecting to the server. Please try again! ${JSON.stringify(err)}`);
            }
        }



    //API Call Request

    const apiCall = async (
        url: string,
        options: {
            method: string,
            headers?: Record<string, string>,
            body?: string
        }
    ) => {

        const activeToken = await SecureStore.getItemAsync('activeJwt');
        let headers;
        if(!options.headers?.authorization){
            headers = {
            ...options.headers,
            authorization: `Bearer ${activeToken}`,
        }
        } else {
            headers = {
            ...options.headers
        }
        }
        
        const requestBody = options.body ?? undefined;
        const requestMethod = options.method;
        let data;
        try{
            const response = await fetch(url.trim(),{
            method: requestMethod,
            headers,
            body: requestBody
        });
            data = await response.json();
        }catch(err){
            setFailedRequest(url.trim())
            router.replace('/request_timeout');
            console.log(err);
            data = {
                ok: false,
                status: 0,
                message: 'Network Request Failed!'
            }
            return data; // need to work on in the future for better error handling, right now loose error handling
        }
            if(!data?.ok){
            if(data?.message === 'active token expired!'){
                const newToken = await getNewActiveToken();
                if(newToken){
                    //make the actual api call
                    const newActiveToken = await SecureStore.getItemAsync('activeJwt');
                    let headers;
                    if(!options.headers?.authorization){
                        headers = {
                        ...options.headers,
                        authorization: `Bearer ${newActiveToken}`,
                    }
                    } else {
                        headers = {
                        ...options.headers
                    }
                    }
                    
                    return await apiCall(url, {
                        method: requestMethod,
                        headers,
                        body: requestBody
                    });
                    
                } else {
                    
                    setIsAuthenticated(false);
                    await SecureStore.deleteItemAsync('refreshJwt');
                    await SecureStore.deleteItemAsync('activeJwt');
                    return {ok: false, status: 403, message: 'Unauthorized token!'};
                }
            }
        }
            return data;

        //Fetch from the server
        //Check response from the server if it's ok
        //if response is not ok check if status is active token expired! if so fetch with url /refresh
        //if response if error code 500 then console.log that error
        //if response is ok then parse the response and send it back to the caller
    }

    //Login Request
    const login = (email: string, password: string) => {
                setIsLoading(true);
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
                const url='https://concept-server-production.up.railway.app/signin';
                try{
                    fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: email.trim(), password: password.trim()})
                })
                .then((res) => {
                    return res.json();
                })
                .then( async(res) => {
                    if (res.status === 'signin') {
                            //Save Tokens in the mobile secure store
                            await SecureStore.setItemAsync('activeJwt', res.activeToken);
                            await SecureStore.setItemAsync('refreshJwt', res.refreshToken);
                            setIsAuthenticated(true);
                            setIsLoading(false);
                    }
                    else if(res.status === 'Invalid Email or Password!') {
                         setIsLoading(false);
                         setIsAuthenticated(false);
                         Alert.alert('Invalid Email or Password!', 'Try again!');
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    setIsAuthenticated(false);
                    console.log(err.message);
                    Alert.alert('Error!', 'Unable to reach the server, Please check your internet connection and try again!');
                })
                } catch(err){
                    Alert.alert('Network Connection issue!', JSON.stringify(err));
                }
    }

    //Logout Request
    const logout = async () => {
        let res;
        
        try{
            const refresh = await SecureStore.getItemAsync('refreshJwt');
            res = await fetch('https://concept-server-production.up.railway.app/signout', {
            method: 'POST',
            headers: { authorization: `Bearer ${refresh} `}
        });

        let logoutResponse = await res.json();


        if(!logoutResponse.ok && logoutResponse?.message === 'no token found!'){
            setIsAuthenticated(false);
            router.replace('/login');
            await SecureStore.deleteItemAsync('activeJwt');
            await SecureStore.deleteItemAsync('refreshJwt');
        }

        if(logoutResponse.message === 'sign out successful!'){
            setIsAuthenticated(false);
            await SecureStore.deleteItemAsync('activeJwt');
            await SecureStore.deleteItemAsync('refreshJwt');
            router.replace('/login');
        }
        }catch(err){
            const refreshToken = await SecureStore.getItemAsync('refreshJwt');

            if(refreshToken){
                // await SecureStore.setItemAsync('discardedRefreshToken', refreshToken); to later use for offline logout
                await SecureStore.deleteItemAsync('activeJwt');
                await SecureStore.deleteItemAsync('refreshJwt');
                return router.replace('/login');
            }
            await SecureStore.deleteItemAsync('activeJwt');
            router.replace('/login');
        }
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, isLoading, apiCall, login, logout, getNewActiveToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);