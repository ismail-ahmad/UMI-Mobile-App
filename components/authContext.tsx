import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';


type loginProps = (email:string, password: string) => void;
type apiCallProps<T = unknown> = (
    url: string,
    options: {
        method: string,
        headers?: Record<string, string>,
        body?: string
    }
) => Promise<T>;


interface AuthContextProps {
    isAuthenticated: boolean | null;
    isLoading: boolean | null;
    apiCall: apiCallProps;
    login: loginProps;
    logout: () => void ;
    getNewActiveToken: () => unknown;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: null,
    isLoading: null,
    apiCall: async (url, options) => {},
    login: (email, password) => {},
    logout: async() => {},
    getNewActiveToken: async() => {}
});

export const AuthContextProvider = ({children}: {children:ReactNode}) => {

    
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(null);

    const getNewActiveToken = async() => {
        const refreshToken = await SecureStore.getItemAsync('refreshJwt');
        if(!refreshToken){
            return false;
        }
            try{
                const res = await fetch('https://concept-server-production.up.railway.app/refresh-token', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${refreshToken}`
                }
            });
            if(!res?.ok){
                    return false;
            };
            const data = await res.json();
            await SecureStore.setItemAsync('activeJwt', data.activeJwt)
            return true;
            }catch(err){
                console.log(`Error: There was a problem connecting to the server. Please try again!`);
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
        
        const requestBody = options.body ? JSON.stringify(options.body) : undefined;
        const requestMethod = options.method;

        const response = await fetch(url,{
            method: requestMethod,
            headers,
            body: requestBody
        });
        let data;
        try{
            data = await response.json();
        }catch(err){
            data = null
        }

        if(!data.ok){
            if(data?.message === 'active token expired!'){
                const newToken = await getNewActiveToken();
                if(newToken){
                    //make the actual api call
                    return apiCall(url, {method: requestMethod, headers, body: requestBody})
                    
                } else {
                    setIsAuthenticated(false);
                    await SecureStore.deleteItemAsync('refreshJwt');
                    await SecureStore.deleteItemAsync('activeJwt');
                    return router.replace('/login');
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