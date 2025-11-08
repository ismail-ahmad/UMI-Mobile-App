import LineCard from "@/components/line-card";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const safeArea = useSafeAreaInsets();
  return (
      <ScrollView contentContainerStyle={[styles.container]}>
          {/* <KpiCard heading="Overall Achivement" kpiAchievement="39.08%" kpiProductionDetail="259,223 / 663,392 units" /> */}
          <LineCard />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#060606',
    flexDirection: 'column',
    padding: 20,
    gap: 16
  }
});
