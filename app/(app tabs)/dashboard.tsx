import KpiCard from '@/components/kpi-card';
import LineCard from '@/components/line-card';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Dashboard = () => {
  const safeArea = useSafeAreaInsets();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [firstShow, setFirstShow] = useState<boolean>(false);
  const [secondShow, setSecondShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [kpiData, setKpiData] = useState<any>(null);
  const [lineData, setLineData] = useState<any[]>([]);
  const [dateRangeText, setDateRangeText] = useState<string>('');

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz7fPoc8NI0HGDIX1ur_tI6BjZMuW0ARZB_2Dk4_iXNtVs7A5koeUOG7OT41___YtASKQ/exec";

  const fmtPct = (v: number) => isFinite(v) ? v.toFixed(2) + '%' : '0.00%';
  const fmtNum = (v: number) => isFinite(v) ? v.toLocaleString() : '0';

  const getKpiColor = (metric: string, value: number) => {
    switch(metric) {
      case 'achievement':
      case 'efficiency':
      case 'oee':
      case 'capacity':
        if (value >= 70) return '#27ae60'; // Dark green for excellent
        if (value >= 50) return '#2980b9'; // Dark blue for good
        return '#c0392b'; // Dark red for critical
      case 'alteration':
        if (value <= 5) return '#27ae60';
        if (value <= 10) return '#f39c12'; // Orange for medium
        return '#c0392b';
      case 'shortfall':
        return value === 0 ? '#27ae60' : '#c0392b';
      default:
        return '#2c3e50'; // Default dark gray
    }
  };

  const onStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
    setFirstShow(false);
    setSecondShow(true);
  };

  const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setEndDate(selectedDate);
    }
    setSecondShow(false);
    console.log(selectedDate);
    fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();

      let fromDate = startDate ? new Date(startDate) : null;
      let toDate = endDate ? new Date(endDate) : null;
      if (toDate) toDate.setDate(toDate.getDate() + 1); // include last day

      const filtered = data.filter((r: any) => {
        const d = new Date(r['Date']);
        return (!fromDate || d >= fromDate) && (!toDate || d < toDate);
      });

      if (filtered.length === 0) {
        Alert.alert('No Data', 'No data found in the selected date range');
        return;
      }

      processRecords(filtered);
      setDateRangeText(`Showing data from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
    } catch (e) {
      console.error('Error loading data', e);
      Alert.alert('Error', 'Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const processRecords = (rows: any[]) => {
    let totalPred = 0, totalAct = 0, totalAlt = 0, sumEff = 0, sumOee = 0, sumMin = 0, sumAvail = 0, cEff = 0, cOee = 0;
    const byLine: any = {};

    rows.forEach((r: any) => {
      const line = r['Line'] || 'Unknown';
      const pred = +r['Predicted Qty'] || 0;
      const act = +r['Actual Qty'] || 0;
      const eff = +r['Efficiency %'] || 0;
      const oee = +r['OEE %'] || 0;
      const alt = +r['Alter Qty'] || 0;
      const sm = +r['Sum Minutes'] || 0;
      const av = +r['Available Minutes'] || 0;
      
      totalPred += pred;
      totalAct += act;
      totalAlt += alt;
      sumEff += eff;
      sumOee += oee;
      sumMin += sm;
      sumAvail += av;
      cEff++;
      cOee++;

      if (!byLine[line]) byLine[line] = { pred: 0, act: 0, eff: [], oee: [], alt: 0 };
      byLine[line].pred += pred;
      byLine[line].act += act;
      byLine[line].eff.push(eff);
      byLine[line].oee.push(oee);
      byLine[line].alt += alt;
    });

    const ach = totalPred ? (totalAct / totalPred) * 100 : 0;
    const effAvg = cEff ? sumEff / cEff : 0;
    const oeeAvg = cOee ? sumOee / cOee : 0;
    const cap = sumAvail ? (sumMin / sumAvail) * 100 : 0;
    const altAvg = totalAct ? (totalAlt / totalAct) * 100 : 0;
    const shortfall = Math.max(totalPred - totalAct, 0);

    // Set KPI data with proper formatting and colors
    setKpiData({
      achievement: {
        value: fmtPct(ach),
        detail: `${fmtNum(totalAct)} / ${fmtNum(totalPred)} units`,
        color: getKpiColor('achievement', ach)
      },
      efficiency: {
        value: fmtPct(effAvg),
        detail: `Target: 70%`,
        color: getKpiColor('efficiency', effAvg)
      },
      oee: {
        value: fmtPct(oeeAvg),
        detail: `Target: 85%`,
        color: getKpiColor('oee', oeeAvg)
      },
      capacity: {
        value: fmtPct(cap),
        detail: `${fmtNum(sumMin)} / ${fmtNum(sumAvail)} minutes`,
        color: getKpiColor('capacity', cap)
      },
      alteration: {
        value: fmtPct(altAvg),
        detail: `${fmtNum(totalAlt)} units altered`,
        color: getKpiColor('alteration', altAvg)
      },
      shortfall: {
        value: fmtNum(shortfall),
        detail: `${fmtNum(totalPred)} units target`,
        color: getKpiColor('shortfall', shortfall)
      }
    });

    // Process line data as before
    const lines = Object.keys(byLine).map(lineName => {
      const data = byLine[lineName];
      const eAvg = data.eff.reduce((a: number, b: number) => a + b, 0) / data.eff.length;
      const oAvg = data.oee.reduce((a: number, b: number) => a + b, 0) / data.oee.length;
      const achL = data.pred ? (data.act / data.pred) * 100 : 0;
      const altL = data.act ? (data.alt / data.act) * 100 : 0;
      
      let status = 'Critical';
      let statusColor = 'white';
      let statusBgColor = '#e74c3c';
      let progressBarBgColor = '#e74c3c';

      if (eAvg >= 70) {
        status = 'Excellent';
        statusColor = 'white';
        statusBgColor = '#27ae60';
        progressBarBgColor = '#27ae60';
      } else if (eAvg >= 50) {
        status = 'Good';
        statusColor = 'white';
        statusBgColor = '#2980b9';
        progressBarBgColor = '#2980b9';
      }

      return {
        lineName,
        lineStatus: status,
        lineStatusColor: statusColor,
        lineStatusBackgroundColor: statusBgColor,
        ProductionValue: `${fmtNum(data.act)} / ${fmtNum(data.pred)}`,
        progressBarBackgroundColor: progressBarBgColor,
        progressBarWidth: `${Math.min(achL, 100)}%`,
        Efficiency: fmtPct(eAvg),
        OEE: fmtPct(oAvg),
        Achievement: fmtPct(achL),
        Alterations: fmtPct(altL)
      };
    });

    setLineData(lines);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: safeArea.top + 32 }]} style={{ backgroundColor: '#060606' }}>
      <View style={styles.dateSelectorContainer}>
        <Button 
          title={isLoading ? "Loading..." : "Choose a Date Range"} 
          onPress={() => setFirstShow(true)}
          disabled={isLoading}
        />
        {firstShow && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}
        {secondShow && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
          />
        )}
      </View>

      {dateRangeText ? (
        <Text style={styles.dateRangeText}>{dateRangeText}</Text>
      ) : (
        <Text style={styles.dateRangeText}>Showing latest data</Text>
      )}

      {/* 6 KPI Cards */}
      {kpiData && (
        <>
          <KpiCard 
            heading="Overall Achievement" 
            kpiAchievement={kpiData.achievement.value}
            kpiProductionDetail={kpiData.achievement.detail}
            numColor={kpiData.achievement.color}
          />
          <KpiCard 
            heading="Average Efficiency" 
            kpiAchievement={kpiData.efficiency.value}
            kpiProductionDetail={kpiData.efficiency.detail}
            numColor={kpiData.efficiency.color}
          />
          <KpiCard 
            heading="Average OEE" 
            kpiAchievement={kpiData.oee.value}
            kpiProductionDetail={kpiData.oee.detail}
            numColor={kpiData.oee.color}
          />
          <KpiCard 
            heading="Capacity Utilization" 
            kpiAchievement={kpiData.capacity.value}
            kpiProductionDetail={kpiData.capacity.detail}
            numColor={kpiData.capacity.color}
          />
          <KpiCard 
            heading="Alteration Rate" 
            kpiAchievement={kpiData.alteration.value}
            kpiProductionDetail={kpiData.alteration.detail}
            numColor={kpiData.alteration.color}
          />
          <KpiCard 
            heading="Shortfall" 
            kpiAchievement={kpiData.shortfall.value}
            kpiProductionDetail={kpiData.shortfall.detail}
            numColor={kpiData.shortfall.color}
          />
        </>
      )}

      {lineData.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Line Performance</Text>
          {lineData.map((line, index) => (
            <LineCard key={index} {...line} />
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#060606',
    flexDirection: 'column',
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  dateSelectorContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  dateRangeText: {
    color: '#95a5a6',
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 10
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    width: '100%'
  }
});

export default Dashboard;