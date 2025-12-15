import { StyleSheet, TextInput } from 'react-native';

type formFieldProps = {
    placeHolder: string,
    placeholderTextColor?: string
    secureText?: boolean
    onChangeText: (text: string) => void
    value: string
}

export default function TextInputField({placeHolder, placeholderTextColor, secureText, onChangeText, value}: formFieldProps) {
    return(
            <TextInput placeholder={placeHolder} secureTextEntry={secureText ? secureText : false} onChangeText={onChangeText} value={value} placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'grey'} style={[styles.inputField]}></TextInput>
    );
}

const styles = StyleSheet.create({
    inputField: {
        borderStyle: 'solid',
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: 'grey',
        color: 'white',
        padding: 8,
        paddingLeft: 16
    }
});