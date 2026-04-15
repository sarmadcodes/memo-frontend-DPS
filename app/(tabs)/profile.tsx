import { ScrollView, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import EmptyState from '../../components/ui/EmptyState';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { dummyProfile } from '../../constants/dummyData';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const isLoading = false;
  const hasPosts = true;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: 130 + insets.bottom }]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="never"
    >
      <View style={styles.banner}>
        {dummyProfile.banner && <Image source={dummyProfile.banner} style={styles.bannerImage} />}
      </View>

      <View style={styles.avatarWrap}>
        <Image source={dummyProfile.avatar} style={styles.avatar} />
      </View>

      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>{dummyProfile.name}</Text>
          <Text style={styles.handle}>@{dummyProfile.username}</Text>
        </View>
        <Pressable style={styles.settingsBtn} onPress={() => router.push('/settings')}>
          <Feather name="settings" size={17} color="#3E3528" />
        </Pressable>
      </View>

      <Text style={styles.bio}>{dummyProfile.bio}</Text>

      <View style={styles.statsRow}>
        {[
          [dummyProfile.stats.posts, 'Posts'],
          [dummyProfile.stats.followers, 'Followers'],
          [dummyProfile.stats.following, 'Following'],
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

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Posts</Text>
      </View>

      {isLoading ? <SkeletonCard compact /> : null}

      {!isLoading && !hasPosts ? (
        <EmptyState title="No posts yet" subtitle="Your posts will appear here once you share your first moment." />
      ) : null}

      {!isLoading && hasPosts ? (
        <>
          {dummyProfile.pinnedPost && (
            <View style={styles.pinnedCard}>
              <Feather name="bookmark" size={14} color="#6C5A35" />
              <Text style={styles.pinnedText}>{dummyProfile.pinnedPost.title}</Text>
            </View>
          )}

          <View style={styles.grid}>
            {dummyProfile.gridPosts.map((item, i) => (
              item.type === 'PHOTO' ? (
                <Image key={item.id || i} source={item.media} style={styles.gridItem} />
              ) : (
                <View key={item.id || i} style={[styles.gridItem, styles.gridTextItem]}>
                  <Text style={styles.gridText} numberOfLines={4}>
                    {item.content}
                  </Text>
                </View>
              )
            ))}
          </View>
        </>
      ) : null}
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
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  sectionHead: {
    marginTop: 18,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#2A2419',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  pinnedCard: {
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4D6BB',
    backgroundColor: '#F8F1E0',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pinnedText: {
    color: '#5B4B2E',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
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
    resizeMode: 'cover',
  },
  gridTextItem: {
    backgroundColor: '#F8F1E0',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridText: {
    fontSize: 12,
    color: '#5B4B2E',
    fontFamily: 'Lora_400Regular',
    textAlign: 'center',
  },
});
