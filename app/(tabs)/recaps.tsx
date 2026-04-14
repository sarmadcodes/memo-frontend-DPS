import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RecapsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={['#FAFAF7', '#F4EFE4']} style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 132 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>Recaps</Text>
          <Feather name="calendar" size={18} color="#5B4D33" />
        </View>

        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Feather name="clock" size={16} color="#5D4A24" />
          </View>
          <Text style={styles.headline}>Coming soon</Text>
          <Text style={styles.body}>
            Recaps are intentionally out of v1 scope. We are focused on posting, feed, follow, and profile first.
          </Text>
          <Pressable style={styles.ghostBtn}>
            <Text style={styles.ghostBtnText}>Notify me when available</Text>
          </Pressable>
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
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    color: '#2C2418',
    fontFamily: 'Inter_700Bold',
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E6DCC9',
    backgroundColor: '#FFFDFA',
    padding: 16,
    gap: 10,
  },
  iconWrap: {
    height: 34,
    width: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7EFDF',
  },
  headline: {
    color: '#2F271A',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  body: {
    color: '#665941',
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  ghostBtn: {
    marginTop: 2,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#DFCFAF',
    borderRadius: 999,
    backgroundColor: '#F8EFDC',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ghostBtnText: {
    color: '#5A4A2E',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
});
