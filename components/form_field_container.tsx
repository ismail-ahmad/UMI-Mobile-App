import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export default function FormFieldContainer({children}: {children:ReactNode}){
    return(
        <View style={[styles.View]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    View: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 18,
        paddingTop: 28
    }
});