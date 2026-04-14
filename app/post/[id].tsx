import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dummyPosts } from '../../constants/dummyData';
import UserAvatar from '../../components/ui/UserAvatar';
import VisibilityBadge from '../../components/ui/VisibilityBadge';
import EmptyState from '../../components/ui/EmptyState';
import SkeletonCard from '../../components/ui/SkeletonCard';

const presetEchoes = ['this hit different', 'I felt this', 'sending warmth', 'you put it perfectly', 'beautifully said'];

export default function Screen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomUrl, setZoomUrl] = useState<string | null>(null);

  const post = useMemo(() => dummyPosts.find((item) => item.id === id), [id]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24 + insets.bottom, paddingHorizontal: 16, gap: 12 }}
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>Post</Text>
          <View style={styles.headerActions}>
            <Pressable style={({ pressed }) => [styles.iconBtn, pressed ? styles.pressed : null]} onPress={() => setSaved((prev) => !prev)}>
              <Feather name={saved ? 'bookmark' : 'bookmark'} size={16} color="#4D402B" />
            </Pressable>
            <Pressable style={({ pressed }) => [styles.iconBtn, pressed ? styles.pressed : null]} onPress={() => setMenuOpen((prev) => !prev)}>
              <Feather name="more-horizontal" size={16} color="#4D402B" />
            </Pressable>
          </View>
        </View>

        {isLoading ? <SkeletonCard /> : null}

        {!isLoading && !post ? (
          <EmptyState title="Post unavailable" subtitle="This post was removed or is no longer visible to you." />
        ) : null}

        {!isLoading && post ? (
          <View style={styles.card}>
            <View style={styles.authorRow}>
              <UserAvatar name={post.author.name} size={40} />
              <View style={styles.metaCol}>
                <Text style={styles.author}>{post.author.name}</Text>
                <Text style={styles.time}>{new Date(post.createdAt).toLocaleString()}</Text>
              </View>
              <VisibilityBadge visibility={post.visibility} />
            </View>

            <Text style={styles.body}>{post.content}</Text>

            {post.mediaUrls.length ? (
              <View style={styles.photoStack}>
                {post.mediaUrls.map((url) => (
                  <Pressable key={url} onPress={() => setZoomUrl(url)}>
                    <Image source={{ uri: url }} style={styles.photo} />
                  </Pressable>
                ))}
              </View>
            ) : null}

            <Text style={styles.echoTitle}>Echoes</Text>
            <View style={styles.echoWrap}>
              {presetEchoes.map((echo) => (
                <View key={echo} style={styles.echoBubble}>
                  <Text style={styles.echoText}>{echo}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {menuOpen ? (
          <View style={styles.menuCard}>
            {['Edit', 'Delete', 'Change Visibility', 'Copy Link', 'Report'].map((item) => (
              <Text key={item} style={[styles.menuItem, item === 'Delete' || item === 'Report' ? styles.menuDanger : null]}>{item}</Text>
            ))}
          </View>
        ) : null}
      </ScrollView>

      <Modal visible={!!zoomUrl} transparent animationType="fade" onRequestClose={() => setZoomUrl(null)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.modalClose} onPress={() => setZoomUrl(null)}>
            <Feather name="x" size={22} color="#F5EFE2" />
          </Pressable>
          <ScrollView
            style={styles.zoomWrap}
            contentContainerStyle={styles.zoomContent}
            maximumZoomScale={3}
            minimumZoomScale={1}
            centerContent
          >
            {zoomUrl ? <Image source={{ uri: zoomUrl }} style={styles.zoomImage} resizeMode="contain" /> : null}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF7' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#2A2418', fontSize: 30, fontFamily: 'Inter_700Bold' },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E3D6BB',
    backgroundColor: '#F5EEE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.8 },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFDFA',
    borderWidth: 1,
    borderColor: '#E4DAC5',
    padding: 12,
    gap: 12,
  },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  metaCol: { flex: 1 },
  author: { color: '#2F271A', fontFamily: 'Inter_700Bold' },
  time: { color: '#7B705B', fontFamily: 'Inter_400Regular', fontSize: 12 },
  body: { color: '#3E3528', fontFamily: 'Lora_400Regular', fontSize: 18, lineHeight: 28 },
  photoStack: { gap: 8 },
  photo: { width: '100%', height: 260, borderRadius: 12 },
  echoTitle: { color: '#2F271A', fontFamily: 'Inter_700Bold', fontSize: 15 },
  echoWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  echoBubble: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E4D7BD',
    backgroundColor: '#F8F1E0',
  },
  echoText: { color: '#594B30', fontFamily: 'Inter_400Regular', fontSize: 12 },
  menuCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4D7BD',
    backgroundColor: '#FFFDF8',
    padding: 12,
    gap: 8,
  },
  menuItem: { color: '#433722', fontFamily: 'Inter_700Bold', fontSize: 13 },
  menuDanger: { color: '#9F3434' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 15, 26, 0.92)',
    justifyContent: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 52,
    right: 20,
    zIndex: 2,
  },
  zoomWrap: { flex: 1 },
  zoomContent: { flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
  zoomImage: { width: '100%', height: 360 },
});
