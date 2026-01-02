import { ReactNode } from 'react';
import { View } from 'react-native';

export default function FormContainer({children}: {children?: ReactNode}) {
    return(
        <View style={{flex: 1, gap: 28, paddingRight: 16, paddingLeft: 16, justifyContent: 'center', alignItems: 'center'}}>
            {children}
        </View>
    );
}