import * as Network from 'expo-network';
import { createContext, ReactNode, useContext, useState } from 'react';


interface NetContextProps {
    isConnected: boolean | undefined;
    setIsConnect: (isConnect: boolean) => void;
    isInternetReachable: boolean | undefined;
    setIsInternetReachable: (isInternetReachable: boolean) => void;
    refresh: boolean | undefined;
    setRefresh: (refresh: boolean) => void;
    load: () => Promise<void>;
    }

const NetContext = createContext<NetContextProps>({
    isConnected: undefined,
    setIsConnect: (isConnect: boolean) => {},
    isInternetReachable: undefined,
    setIsInternetReachable: (isInternetReachable: boolean) => {},
    refresh: undefined,
    setRefresh: () => {},
    load: async() => {},
});

export const NetContextProvider = ({children}: {children:ReactNode}) => {

    const [isConnected, setIsConnect] = useState<boolean | undefined> (undefined);
    const [isInternetReachable, setIsInternetReachable] = useState<boolean | undefined> (undefined);
    const [refresh, setRefresh] = useState<boolean>(true);


    const load = async():Promise<void> => {
            try{
                const network = await Network.getNetworkStateAsync();
                if(network){
                    setIsConnect(() => network.isConnected);
                    setIsInternetReachable(() => network.isInternetReachable);
                    setRefresh(false);
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