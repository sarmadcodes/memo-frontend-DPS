import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
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
  const router = useRouter();
  const [isLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomUrl, setZoomUrl] = useState<any | null>(null);
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState<{ id: string; user: string; text: string; time: string }[]>([
    { id: '1', user: 'ohmahad', text: 'khoobsurat', time: '2h' },
    { id: '2', user: 'sohaib', text: 'kyaa baat hai yaal', time: '1h' },
  ]);

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    setLocalComments(prev => [...prev, {
      id: Math.random().toString(),
      user: 'sarmadd',
      text: commentText.trim(),
      time: 'Now',
    }]);
    setCommentText('');
  };

  const post = useMemo(() => dummyPosts.find((item) => item.id === id), [id]);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24, paddingHorizontal: 16, gap: 12 }}
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
            <Pressable 
              style={({ pressed }) => [styles.authorRow, pressed && { opacity: 0.7 }]}
              onPress={() => router.push(`/profile/${post.author.username}`)}
            >
              <UserAvatar name={post.author.name} size={40} />
              <View style={styles.metaCol}>
                <Text style={styles.author}>{post.author.name}</Text>
                <Text style={styles.time}>{new Date(post.createdAt).toLocaleString()}</Text>
              </View>
              <VisibilityBadge visibility={post.visibility} />
            </Pressable>

            <Text style={styles.body}>{post.content}</Text>

            {post.mediaUrls.length ? (
              <View style={styles.photoStack}>
                {post.mediaUrls.map((url, i) => (
                  <Pressable key={i} onPress={() => setZoomUrl(url)}>
                    <Image 
                      source={typeof url === 'string' ? { uri: url } : url} 
                      style={styles.photo} 
                      contentFit="cover"
                      transition={200}
                      cachePolicy="memory-disk"
                    />
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

            <View style={styles.divider} />
            <Text style={styles.commentsTitle}>Comments</Text>
            <View style={styles.commentsWrap}>
              {localComments.length > 0 ? (
                localComments.map((comment) => (
                  <View key={comment.id} style={styles.commentItem}>
                    <Pressable onPress={() => router.push(`/profile/${comment.user}`)}>
                      <UserAvatar name={comment.user} size={32} />
                    </Pressable>
                    <View style={styles.commentContent}>
                      <View style={styles.commentHeader}>
                        <Pressable onPress={() => router.push(`/profile/${comment.user}`)}>
                          <Text style={styles.commentAuthor}>@{comment.user}</Text>
                        </Pressable>
                        <Text style={styles.commentTime}>{comment.time}</Text>
                      </View>
                      <Text style={styles.commentText}>{comment.text}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noCommentsText}>No comments yet. Be the first!</Text>
              )}
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

      {post ? (
        <View style={[styles.commentBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            placeholderTextColor="#8A7D67"
            value={commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={300}
          />
          <Pressable
            style={({ pressed }) => [styles.sendBtn, (!commentText.trim() || pressed) && { opacity: 0.5 }]}
            onPress={handleSendComment}
            disabled={!commentText.trim()}
          >
            <Ionicons name="send" size={20} color="#F5EFE2" />
          </Pressable>
        </View>
      ) : null}

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
            {zoomUrl ? <Image source={typeof zoomUrl === 'string' ? { uri: zoomUrl } : zoomUrl} style={styles.zoomImage} resizeMode="contain" /> : null}
          </ScrollView>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
  divider: { height: 1, backgroundColor: '#E4DAC5', marginVertical: 8 },
  commentsTitle: { color: '#2F271A', fontFamily: 'Inter_700Bold', fontSize: 16, marginBottom: 4 },
  commentsWrap: { gap: 16 },
  commentItem: { flexDirection: 'row', gap: 10 },
  commentContent: { flex: 1, gap: 2 },
  commentHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  commentAuthor: { color: '#2F271A', fontFamily: 'Inter_700Bold', fontSize: 13 },
  commentTime: { color: '#7B705B', fontFamily: 'Inter_400Regular', fontSize: 11 },
  commentText: { color: '#433722', fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 20 },
  noCommentsText: { color: '#8A7D67', fontFamily: 'Inter_400Regular', fontSize: 14, fontStyle: 'italic', textAlign: 'center', paddingVertical: 12 },
  commentBar: {
    backgroundColor: '#FFFDFA',
    borderTopWidth: 1,
    borderTopColor: '#E4DAC5',
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#F5EEE0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 100,
    minHeight: 40,
    color: '#2F271A',
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3E3528',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2, // optical center for send icon
  },
});
