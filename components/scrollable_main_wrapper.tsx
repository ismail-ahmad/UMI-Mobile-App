import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScrollableMainWrapper({children, style}: {children:ReactNode, style?:{}}){
    const safeArea = useSafeAreaInsets();
    return(
        <ScrollView style={[{paddingTop: safeArea.top + 32, paddingBottom: 32}, styles.wrapper, style]}>
            {children}
        </ScrollView>
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