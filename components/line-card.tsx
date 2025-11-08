import { StyleSheet, Text, View } from 'react-native';
type lineCard = {
    lineName: string,
    lineStatus: string,
    lineStatusColor: string,
    lineStatusBackgroundColor: string,
    ProductionValue: string,
    progressBarBackgroundColor: string,
    progressBarWidth: string | number,
    Efficiency: string,
    OEE: string,
    Achievement: string,
    Alterations: string
};

export default function LineCard({lineName, lineStatus, lineStatusColor, lineStatusBackgroundColor, ProductionValue, progressBarBackgroundColor, progressBarWidth, Efficiency, OEE, Achievement, Alterations}: lineCard) {
    return(
        <View style={styles.lineContainer}>
            <View style={styles.lineHeader}>
                <Text style={styles.lineName}>{lineName}</Text><Text style={[styles.lineStatus, {color: lineStatusColor, backgroundColor: lineStatusBackgroundColor}]}>{lineStatus}</Text>
            </View>
            <View style={styles.productionHeader}><Text style={styles.production}>Production:</Text><Text style={styles.productionValue}>{ProductionValue} units</Text></View>
            <View style={[styles.progressBarContainer]}>
                <View style={[styles.progressBar, {width: progressBarWidth, backgroundColor: progressBarBackgroundColor}]}></View>
            </View>
            <View style={styles.subheadingsHeader}>
                <View style={styles.subheadings}><Text style={styles.subHeaders}>Efficiency:</Text><Text>{Efficiency}</Text></View>
                <View style={styles.subheadings}><Text style={styles.subHeaders}>OEE:</Text><Text>{OEE}</Text></View>
                <View style={styles.subheadings}><Text style={styles.subHeaders}>Achievement:</Text><Text>{Achievement}</Text></View>
                <View style={styles.subheadings}><Text style={styles.subHeaders}>Alterations:</Text><Text>{Alterations}</Text></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    lineHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    lineName: {
        fontWeight: 'bold',
        fontSize: 18
    },
    lineStatus: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 4,
        paddingRight: 10,
        paddingBottom: 4,
        paddingLeft: 10,
        borderRadius: 20
    },
    lineContainer: {
        backgroundColor: 'white',
        width: '100%',
        padding: 14,
        borderRadius: 10,
        fontSize: 18,
    },
    productionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 8,
    },
    production: {
        fontWeight: 'bold',
        fontSize: 16
    },
    productionValue: {
        fontSize: 16
    },
    progressBarContainer: {
        marginTop: 18,
        marginBottom: 18,
        height: 8,
        width: '100%',
        backgroundColor: '#ecf0f1',
        borderRadius: 4,
        position: 'relative'
    },
    progressBar: {
        position: 'absolute',
        height: 8,
        top: 0,
        left: 0,
        borderRadius: 4,
    },
    subheadingsHeader: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'space-between',
    },
    subheadings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '45%',
    },
    subHeaders: {
        fontWeight: 'bold'
    }
});