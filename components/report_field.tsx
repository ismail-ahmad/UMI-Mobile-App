import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ReportField({text, children, route}: {text:string, route: string, children: ReactNode}){
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
        borderRadius: 4,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        padding: 16
    }
});