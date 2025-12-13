import { StyleSheet, Text, View } from 'react-native';


export default function MasterAdmin(){
    return(
        <View style={[styles.mainView]}>
                <Text style={[styles.text]}>Master Admin</Text>
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