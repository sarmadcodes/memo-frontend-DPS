import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const notifications = [
  '[Maya] started following you',
  '[Noah] felt: sending warmth',
  '[Ava] replied with a voice note',
  'A memory you sealed is now open',
  'You and [Kai] both remembered Oct 3rd',
  'This week: write about a place that changed you',
  'Day 7 of showing up for yourself',
  'Your Sunday reflection is here',
  'Your October story is written',
];

export default function Screen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24 + insets.bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Gentle updates, no pressure, no red badges.</Text>

      {notifications.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.card}>
          <View style={styles.iconWrap}>
            <Feather name="bell" size={14} color="#5A4A2A" />
          </View>
          <Text style={styles.cardText}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },
  content: {
    paddingHorizontal: 16,
    gap: 10,
  },
  title: {
    fontSize: 28,
    color: '#2A2419',
    fontFamily: 'Lora_400Regular_Italic',
  },
  subtitle: {
    marginBottom: 8,
    color: '#6B6254',
    fontFamily: 'Inter_400Regular',
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7DCCB',
    backgroundColor: '#FFFDF8',
    paddingHorizontal: 12,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: '#F3E8D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    color: '#3E3528',
    lineHeight: 19,
    fontFamily: 'Inter_400Regular',
  },
  label: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
});
