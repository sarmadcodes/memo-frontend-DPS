import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const recapTypes = [
  ['Weekly Reflection', 'Every Sunday your gentle summary'],
  ['Monthly Recap', 'A chapter-like story of your month'],
  ['Letter to Future Self', 'Written from present-you to future-you'],
  ['Yearly Book of You', 'A complete life chapter export'],
];

export default function RecapsScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const fade = useRef(new Animated.Value(0)).current;
  const isCompact = width < 390;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  return (
    <LinearGradient colors={['#FFF9F2', '#F3E9DA']} style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 132 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headRow}>
          <Text style={[styles.title, isCompact && styles.titleCompact]}>Recaps</Text>
          <Feather name="calendar" size={19} color="#5B4D33" />
        </View>

        <View style={styles.topNoteCard}>
          <Text style={styles.topNoteLabel}>Your Story, Clearly</Text>
          <Text style={styles.topNoteBody}>Weekly and monthly reflections shaped from your real moments.</Text>
        </View>

        <Animated.View style={[styles.heroCard, { opacity: fade, transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] }]}>
          <Text style={styles.heroEyebrow}>This month</Text>
          <Text style={styles.heroTitle}>Your October story is written</Text>
          <Text style={styles.heroBody}>Growth and change were your strongest themes this month.</Text>
          <Pressable style={styles.heroAction}>
            <Text style={styles.heroActionText}>Read recap</Text>
          </Pressable>
        </Animated.View>

        {recapTypes.map(([name, desc]) => (
          <View key={name} style={styles.recapCard}>
            <Text style={styles.recapName}>{name}</Text>
            <Text style={styles.recapDesc}>{desc}</Text>
          </View>
        ))}

        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>21</Text>
            <Text style={styles.metricLabel}>Days Posted</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>7</Text>
            <Text style={styles.metricLabel}>Voice Notes</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>14</Text>
            <Text style={styles.metricLabel}>Streak</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    gap: 12,
  },
  headRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#2C2418',
    fontFamily: 'Inter_700Bold',
  },
  titleCompact: {
    fontSize: 28,
  },
  topNoteCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DDCB',
    backgroundColor: '#FFFEFA',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  topNoteLabel: {
    color: '#6A5323',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  topNoteBody: {
    marginTop: 4,
    color: '#4B3E2C',
    fontFamily: 'Inter_400Regular',
  },
  heroCard: {
    borderRadius: 18,
    backgroundColor: '#FFFDF8',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E4D8C5',
  },
  heroEyebrow: {
    fontSize: 12,
    letterSpacing: 0.7,
    color: '#7D622A',
    fontFamily: 'Inter_700Bold',
  },
  heroTitle: {
    marginTop: 4,
    fontSize: 21,
    color: '#2D2417',
    fontFamily: 'Inter_700Bold',
  },
  heroBody: {
    marginTop: 6,
    color: '#5A4B33',
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  heroAction: {
    marginTop: 12,
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2C2418',
  },
  heroActionText: {
    color: '#FFF6E4',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  recapCard: {
    borderRadius: 14,
    backgroundColor: '#FFFEFB',
    borderWidth: 1,
    borderColor: '#E7DECF',
    padding: 14,
    gap: 4,
  },
  recapName: {
    color: '#2D261A',
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  recapDesc: {
    color: '#6A5B43',
    fontFamily: 'Inter_400Regular',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  metricBox: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F8EFDF',
    borderWidth: 1,
    borderColor: '#E6D9C3',
  },
  metricValue: {
    color: '#473922',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  metricLabel: {
    color: '#705F43',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
});
