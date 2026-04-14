import { useMemo, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { dummyPosts } from '../../constants/dummyData';
import EmptyState from '../../components/ui/EmptyState';
import PostCard from '../../components/ui/PostCard';
import SkeletonCard from '../../components/ui/SkeletonCard';

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading] = useState(false);

  const posts = useMemo(() => dummyPosts, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <LinearGradient colors={['#FAFAF7', '#F4EFE4']} style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(16, insets.top + 8), paddingBottom: 128 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#C9A84C" />}
      >
        <View style={styles.headerRow}>
          <Text style={styles.logo}>Memo</Text>
          <Pressable style={styles.iconBtn} onPress={() => router.push('/settings/notifications')}>
            <Feather name="bell" size={18} color="#3A3327" />
            <View style={styles.unreadDot} />
          </Pressable>
        </View>

        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : null}

        {!isLoading && posts.length === 0 ? (
          <EmptyState title="Nothing here yet" subtitle="Follow some people to fill your feed." />
        ) : null}

        {!isLoading ? posts.map((post) => <PostCard key={post.id} post={post} onPress={() => router.push(`/post/${post.id}`)} />) : null}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  logo: {
    color: '#2D251A',
    fontSize: 30,
    fontFamily: 'Lora_400Regular_Italic',
  },
  iconBtn: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F0E2',
  },
  unreadDot: {
    position: 'absolute',
    right: 9,
    top: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#C9A84C',
  },
});
