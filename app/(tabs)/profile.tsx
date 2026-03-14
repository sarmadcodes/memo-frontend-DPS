import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: 130 + insets.bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.banner} />

      <View style={styles.avatarWrap}>
        <View style={styles.avatar} />
      </View>

      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>Ava Carter</Text>
          <Text style={styles.handle}>@avawrites</Text>
        </View>
        <Pressable style={styles.settingsBtn}>
          <Feather name="settings" size={17} color="#3E3528" />
        </Pressable>
      </View>

      <Text style={styles.bio}>Quiet reflections, warm photos, and tiny stories I do not want to forget.</Text>

      <View style={styles.statsRow}>
        {[
          ['128', 'Posts'],
          ['2.3K', 'Followers'],
          ['684', 'Following'],
        ].map(([value, label]) => (
          <View key={label} style={styles.statItem}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.editBtn}>
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </Pressable>

      <View style={styles.tabsRow}>
        <Pressable style={[styles.sectionTab, styles.sectionTabActive]}>
          <Text style={[styles.sectionTabText, styles.sectionTabTextActive]}>Posts</Text>
        </Pressable>
        <Pressable style={styles.sectionTab}>
          <Text style={styles.sectionTabText}>Your Notes</Text>
        </Pressable>
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Recent Posts</Text>
      </View>

      <View style={styles.grid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View key={i} style={styles.gridItem} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F1',
  },
  content: {
    paddingBottom: 120,
  },
  banner: {
    height: 150,
    backgroundColor: '#DCC9A6',
  },
  avatarWrap: {
    marginTop: -38,
    paddingHorizontal: 16,
  },
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    color: '#221E16',
    fontFamily: 'Inter_700Bold',
  },
  handle: {
    color: '#756B58',
    fontFamily: 'Inter_400Regular',
  },
  settingsBtn: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#EFE6D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bio: {
    paddingHorizontal: 16,
    marginTop: 8,
    color: '#514634',
    lineHeight: 20,
    fontFamily: 'Lora_400Regular',
  },
  statsRow: {
    marginTop: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 17,
    color: '#2B2418',
    fontFamily: 'Inter_700Bold',
  },
  statLabel: {
    marginTop: 2,
    fontSize: 12,
    color: '#736753',
    fontFamily: 'Inter_400Regular',
  },
  editBtn: {
    marginTop: 14,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#2D261A',
    alignItems: 'center',
    paddingVertical: 12,
  },
  editBtnText: {
    color: '#FFF7E9',
    fontFamily: 'Inter_700Bold',
  },
  tabsRow: {
    marginTop: 14,
    marginHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
  },
  sectionTab: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3D9C7',
    backgroundColor: '#F7EFE0',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionTabActive: {
    backgroundColor: '#2D261A',
    borderColor: '#2D261A',
  },
  sectionTabText: {
    color: '#514634',
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
  },
  sectionTabTextActive: {
    color: '#FFF7E9',
  },
  sectionHead: {
    marginTop: 18,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#2A2419',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  grid: {
    marginTop: 10,
    paddingHorizontal: 16,
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
});
