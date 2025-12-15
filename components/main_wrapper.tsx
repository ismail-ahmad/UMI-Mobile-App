import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MainWrapper({children, style}: {children:ReactNode, style?:{}}){
    const safeArea = useSafeAreaInsets();
    return(
        <View style={[{paddingTop: safeArea.top + 32, paddingBottom: 32}, styles.wrapper, style]}>
            {children}
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'black',
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8
    }
});