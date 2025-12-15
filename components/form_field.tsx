import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FormField({text, children, route}: {text:string, route: string, children: ReactNode}){
    const router = useRouter();
    return(
        <TouchableOpacity style={[styles.topView]} onPress={() => {router.push(route as any)}}>
            {children}
            <Text style={{color: 'white', textAlign:'center'}}>{text}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    topView: {
        borderWidth: 1,
        borderColor: 'dodgerblue',
        borderStyle: 'solid',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        gap: 20,
        padding: 16
    }
});