import Button from '@/components/button';
import { useNetworkErrors } from '@/components/network_errors';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export default function Report(){
    const router = useRouter();
    const {failedRequest} = useNetworkErrors();
    return(
        <View style={[styles.mainView]}>
                <Text style={[styles.text]}>Request Timeout!</Text>
                <Button text={'Refresh'} onPressFunction={() => {if(failedRequest !== undefined){
                    const route = failedRequest.split('/')[3];
                    console.log(route);
                    if(route === 'auth'){
                        router.replace('/');
                    } else if(route === 'new_client_request') {
                        router.replace('/addClient');
                    }else {
                        router.replace(`/${route}` as any);
                        console.log('not yet handling confidently, might take a look at me!');
                    }
                }}}></Button>
        </View>
    );
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignContent: 'center'
    },
    text: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
    }
});