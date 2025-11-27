import * as Network from 'expo-network';
import { router, usePathname } from 'expo-router';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';


interface NetContextProps {
    isConnected: boolean | undefined;
    setIsConnect: (isConnect: boolean) => void;
    isInternetReachable: boolean | undefined;
    setIsInternetReachable: (isInternetReachable: boolean) => void;
    refresh: boolean | null;
    setRefresh: (refresh: boolean) => void;
    load: () => Promise<void>;
    }

const NetContext = createContext<NetContextProps>({
    isConnected: undefined,
    setIsConnect: (isConnect: boolean) => {},
    isInternetReachable: undefined,
    setIsInternetReachable: (isInternetReachable: boolean) => {},
    refresh: null,
    setRefresh: () => {},
    load: async() => {},
});

export const NetContextProvider = ({children}: {children:ReactNode}) => {

    const pathname = usePathname();

    const [isConnected, setIsConnect] = useState<boolean | undefined> (undefined);
    const [isInternetReachable, setIsInternetReachable] = useState<boolean | undefined> (undefined);
    const [refresh, setRefresh] = useState<boolean | null>(null);


    const load = async():Promise<void> => {
            try{
                const network = await Network.getNetworkStateAsync();
                if(network){
                    setIsConnect(network.isConnected);
                    setIsInternetReachable(network.isInternetReachable);
                    if(!network.isInternetReachable){
                            router.replace('/nointernet');
                        if(!network.isConnected){
                            Alert.alert('Connection Error!', 'You are not Connected to the internet!');
                        } else{
                            Alert.alert('Network Error!', 'Internet is inaccessible!');
                        }
                    }
                    console.log(network.isConnected, network.isInternetReachable);
                }
            }catch(err){
                console.log(err);
            }
        };

    return(
        <NetContext.Provider value={{ isConnected, setIsConnect, isInternetReachable, setIsInternetReachable, refresh, setRefresh, load}}>
            {children}
        </NetContext.Provider>
    );
}

export const useNetAuth = () => useContext(NetContext);