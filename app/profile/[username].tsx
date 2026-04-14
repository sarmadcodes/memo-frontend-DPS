import { useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PrimaryButton from '../../components/ui/PrimaryButton';

export default function Screen() {
  const insets = useSafeAreaInsets();
  const { username } = useLocalSearchParams<{ username: string }>();
  const [following, setFollowing] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: Math.max(12, insets.top), paddingBottom: 24 + insets.bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.banner} />

      <View style={styles.avatarWrap}>
        <View style={styles.avatar} />
      </View>

      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>Profile User</Text>
          <Text style={styles.handle}>@{username ?? 'user'}</Text>
        </View>
      </View>

      <Text style={styles.bio}>Collected moments, quiet photos, and little reminders to stay present.</Text>

      <View style={styles.statsRow}>
        {[
          ['83', 'Posts'],
          ['1.1K', 'Followers'],
          ['402', 'Following'],
        ].map(([value, label]) => (
          <View key={label} style={styles.statItem}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <PrimaryButton
        label={following ? 'Following' : 'Follow'}
        variant={following ? 'secondary' : 'primary'}
        onPress={() => setFollowing((prev) => !prev)}
      />

      <View style={styles.grid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <Pressable key={i} style={({ pressed }) => [styles.gridItem, pressed ? styles.pressed : null]} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF7' },
  content: { paddingHorizontal: 16 },
  banner: {
    marginHorizontal: -16,
    height: 150,
    backgroundColor: '#DCC9A6',
  },
  avatarWrap: { marginTop: -38 },
  avatar: {
    height: 76,
    width: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: '#F8F6F1',
    backgroundColor: '#B69C69',
  },
  topRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 24, color: '#221E16', fontFamily: 'Inter_700Bold' },
  handle: { color: '#756B58', fontFamily: 'Inter_400Regular' },
  bio: {
    marginTop: 8,
    color: '#514634',
    lineHeight: 20,
    fontFamily: 'Lora_400Regular',
  },
  statsRow: {
    marginTop: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 17, color: '#2B2418', fontFamily: 'Inter_700Bold' },
  statLabel: { marginTop: 2, fontSize: 12, color: '#736753', fontFamily: 'Inter_400Regular' },
  grid: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  gridItem: {
    width: '31.8%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#D7CAB2',
  },
  pressed: { opacity: 0.82 },
});
