import { StyleSheet, Text, TouchableOpacity } from "react-native";
type buttonProps = {
    text: string,
    onPressFunction: () => void
}

export default function Button({text, onPressFunction}: buttonProps) {
    return(
        <TouchableOpacity style={styles.Button} onPress={onPressFunction}>
            <Text style={styles.ButtonText}>{text}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    Button: {
        backgroundColor: 'dodgerblue',
        borderRadius: 16,
        padding: 8,
    },
    ButtonText: {
        color: 'white',
        fontWeight: '500',
        fontStyle: 'italic',
        fontSize: 16,
        textAlign: 'center',
    }
});