import { StyleSheet, Text } from 'react-native';
type headingProps = {
    text: string
}

export default function Heading({text}: headingProps) {
    return(
        <Text style={styles.Text}>{text}</Text>
    );
}
const styles = StyleSheet.create({
    Text: {
        fontSize: 32,
        color: 'white',
        fontWeight: 500,
        textAlign: 'center',
        fontStyle: 'italic'
    }
});