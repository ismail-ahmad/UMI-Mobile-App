import Heading from '@/components/heading';
import MainWrapper from '@/components/main_wrapper';
import { StyleSheet, Text, View } from 'react-native';


export default function Admin(){
    return(
        <MainWrapper style={{justifyContent: 'center', alignItems: 'center', gap: 20}}>
            <Heading text='Admin' />
            <View>
                <Text style={{color: 'white'}}>1</Text>
            </View>
            <View>
                <Text style={{color: 'white'}}>1</Text>
            </View>
            <View>
                <Text style={{color: 'white'}}>1</Text>
            </View>
        </MainWrapper>
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