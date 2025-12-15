import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export default function FormFieldContainer({children, style}: {children:ReactNode; style?: {};}){
    return(
        <View style={[styles.View, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    View: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 18,
        paddingTop: 28
    }
});