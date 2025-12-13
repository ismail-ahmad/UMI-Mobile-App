import { createContext, useContext, useState } from "react";

const NetworkErrorsContext = createContext<{
    failedRequest: string | undefined,
    setFailedRequest: (prop: string | undefined) => void
}>({
    failedRequest: undefined,
    setFailedRequest: () => {}
});

export function NetworkErrorsContextProvider({children}: {children: React.ReactNode}) {
    const [failedRequest, setFailedRequest] = useState<string | undefined>(undefined);
    return(
        <NetworkErrorsContext.Provider value={{failedRequest, setFailedRequest}}>
            {children}
        </NetworkErrorsContext.Provider>
    );
}
export const useNetworkErrors = () => useContext(NetworkErrorsContext);