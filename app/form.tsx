import Heading from '@/components/heading';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Report(){
    const safeArea = useSafeAreaInsets();
    return(
        <View style={[styles.mainView]}>
                <Heading text='Forms'></Heading>
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