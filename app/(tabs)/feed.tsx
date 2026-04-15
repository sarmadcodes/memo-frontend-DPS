import { useMemo, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import EmptyState from '../../components/ui/EmptyState';
import PostCard from '../../components/post/PostCard';
import SkeletonCard from '../../components/ui/SkeletonCard';
import UserAvatar from '../../components/ui/UserAvatar';

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading] = useState(false);

  const [posts, setPosts] = useState<any[]>([]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <LinearGradient colors={['#F9F8F5', '#F2EDE1']} style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(16, insets.top + 8), paddingBottom: 128 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#A69B86" />}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.logo}>{getGreeting()}, Sarms.</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconBtn} onPress={() => router.push('/settings/notifications')}>
              <Feather name="bell" size={20} color="#2D251A" />
              <View style={styles.unreadDot} />
            </Pressable>
          </View>
        </View>

        {isLoading ? (
          <View style={{ paddingHorizontal: 16 }}>
            <SkeletonCard />
            <SkeletonCard />
          </View>
        ) : null}

        {!isLoading && posts.length === 0 ? (
          <View style={{ paddingTop: 60 }}>
            <EmptyState title="Nothing here yet" subtitle="Follow some people to fill your feed." />
          </View>
        ) : null}

        <View style={styles.feedList}>
          {!isLoading ? posts.map((post) => <PostCard key={post.id} post={post} onPress={() => router.push(`/post/${post.id}`)} />) : null}
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
    gap: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  headerLeft: {
    gap: 2,
  },
  dateText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#A69B86',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  logo: {
    color: '#2D251A',
    fontSize: 20,
    fontFamily: 'Lora_400Regular',
    letterSpacing: 0.3,
  },
  headerRight: {
    paddingTop: 4,
  },
  iconBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBE4D5',
  },
  unreadDot: {
    position: 'absolute',
    right: 10,
    top: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9534F',
    borderWidth: 1,
    borderColor: '#EBE4D5',
  },
  highlightsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#A69B86',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  highlightScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  highlightItem: {
    alignItems: 'center',
    width: 76,
  },
  highlightAvatarRing: {
    padding: 3,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: '#C9A84C',
    borderStyle: 'dashed',
    marginBottom: 8,
  },
  highlightName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#2D251A',
    textAlign: 'center',
  },
  feedList: {
    marginTop: 8,
  },
});
