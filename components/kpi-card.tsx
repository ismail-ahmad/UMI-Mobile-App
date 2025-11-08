import { StyleSheet, Text, View } from "react-native";
type KpiProps = {
    heading: string,
    kpiAchievement: string,
    kpiProductionDetail: string,
    numColor?: string
}

export default function KpiCard({heading, kpiAchievement, kpiProductionDetail, numColor}: KpiProps){
    return(
        <View style={styles.parent}>
          <View><Text style={styles.headingText}>{heading}</Text></View>
          <View><Text style={[styles.numberText, {color: numColor}]}>{kpiAchievement}</Text></View>
          <View><Text style={styles.unitText}>{kpiProductionDetail}</Text></View>
        </View>
    );
}

const styles = StyleSheet.create({
    headingText:{
        color: '#34495e',
        fontSize: 16,
        fontWeight: 'bold'
    },
    numberText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 6,

    },
    unitText: {
        color: '#6b7280'
    },
    parent: {
        width: '100%',
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 18,
        alignSelf: 'center'
    }
});