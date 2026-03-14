import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

type FeedPost = {
  id: string;
  author: string;
  time: string;
  text: string;
  visibility: string;
  isPolaroid?: boolean;
  comments: CommentItem[];
};

type CommentReply = {
  id: string;
  user: string;
  text: string;
};

type CommentItem = {
  id: string;
  user: string;
  text: string;
  replies: CommentReply[];
};

const initialPosts: FeedPost[] = [
  {
    id: '1',
    author: 'Ava',
    time: '2h ago',
    text: 'Write about a place that changed you, even if only a little.',
    visibility: 'Only Me',
    comments: [
      {
        id: 'c1',
        user: 'Maya',
        text: 'This made me think about my old school library.',
        replies: [{ id: 'r1', user: 'You', text: 'That is such a beautiful memory.' }],
      },
      {
        id: 'c2',
        user: 'Noah',
        text: 'So soft and honest.',
        replies: [],
      },
    ],
  },
  {
    id: '2',
    author: 'Noah',
    time: '5h ago',
    text: 'Write about a place that changed you, even if only a little.',
    visibility: 'Followers',
    isPolaroid: true,
    comments: [
      {
        id: 'c3',
        user: 'Ava',
        text: 'Beautiful frame!',
        replies: [{ id: 'r2', user: 'You', text: 'Thank you so much.' }],
      },
      {
        id: 'c4',
        user: 'Kai',
        text: 'This looks so cute omg.',
        replies: [],
      },
      {
        id: 'c5',
        user: 'Reem',
        text: 'The mood is perfect.',
        replies: [],
      },
    ],
  },
];

export default function FeedScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isCompact = width < 390;
  const polaroidWidth = width - 32;
  const polaroidPhotoHeight = Math.round(polaroidWidth * 0.74);
  const [posts, setPosts] = useState(initialPosts);
  const [savedPostIds, setSavedPostIds] = useState<Record<string, boolean>>({});
  const [likedPostIds, setLikedPostIds] = useState<Record<string, boolean>>({});
  const [quickWrite, setQuickWrite] = useState('');
  const [showQuickWrite, setShowQuickWrite] = useState(false);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);

  const activePost = useMemo(() => posts.find((post) => post.id === activePostId) ?? null, [activePostId, posts]);
  const replyTargetUser = useMemo(
    () => activePost?.comments.find((comment) => comment.id === replyToCommentId)?.user ?? null,
    [activePost, replyToCommentId],
  );

  const handleSave = (postId: string) => {
    setSavedPostIds((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleLike = (postId: string) => {
    setLikedPostIds((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleShare = async (post: FeedPost) => {
    await Share.share({ message: `${post.author}: ${post.text}` });
  };

  const handleQuickWriteSubmit = () => {
    if (!quickWrite.trim()) {
      return;
    }

    setPosts((prev) => [
      {
        id: `${Date.now()}`,
        author: 'You',
        time: 'Just now',
        text: quickWrite.trim(),
        visibility: 'Only Me',
        comments: [],
      },
      ...prev,
    ]);
    setQuickWrite('');
    setShowQuickWrite(false);
  };

  const handleAddComment = () => {
    if (!activePostId || !commentInput.trim()) {
      return;
    }

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== activePostId) {
          return post;
        }

        if (replyToCommentId) {
          return {
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === replyToCommentId
                ? {
                    ...comment,
                    replies: [
                      ...comment.replies,
                      {
                        id: `r${Date.now()}`,
                        user: 'You',
                        text: commentInput.trim(),
                      },
                    ],
                  }
                : comment,
            ),
          };
        }

        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c${Date.now()}`,
              user: 'You',
              text: commentInput.trim(),
              replies: [],
            },
          ],
        };
      }),
    );
    setCommentInput('');
    setReplyToCommentId(null);
  };

  return (
    <LinearGradient colors={['#FFF9F1', '#F7F0E5']} style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 138 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={[styles.headerTitle, isCompact && styles.headerTitleSmall]}>Home</Text>
          <Pressable style={styles.headerIconButton} onPress={() => router.push('/settings/notifications')}>
            <Feather name="bell" size={18} color="#3A3327" />
          </Pressable>
        </View>

        <View style={styles.promptCardTop}>
          <View style={styles.promptTextWrap}>
            <Text style={styles.promptHeading}>Reflection Corner</Text>
            <Text style={styles.promptBody}>Write about a place that changed you, even if only a little.</Text>
          </View>
          <Pressable style={styles.promptAction} onPress={() => setShowQuickWrite((prev) => !prev)}>
            <Text style={styles.promptActionText}>Write now</Text>
          </Pressable>
        </View>

        {showQuickWrite ? (
          <View style={styles.quickWriteCard}>
            <TextInput
              value={quickWrite}
              onChangeText={setQuickWrite}
              placeholder="Write your moment..."
              placeholderTextColor="#8C7B63"
              multiline
              style={styles.quickWriteInput}
            />

            <View style={styles.writeToolsRow}>
              <View style={styles.writeToolsLeft}>
                <Pressable style={styles.writeToolBtn}><Feather name="plus" size={14} color="#4B3C26" /></Pressable>
                <Pressable style={styles.writeToolBtn}><Feather name="edit-3" size={14} color="#4B3C26" /></Pressable>
                <Pressable style={styles.writeToolBtn}>
                  <Feather name="mic" size={14} color="#4B3C26" />
                </Pressable>
                <Pressable style={styles.writeToolBtn}>
                  <Feather name="image" size={14} color="#4B3C26" />
                </Pressable>
                <Pressable style={styles.writeToolBtn}>
                  <Feather name="music" size={14} color="#4B3C26" />
                </Pressable>
              </View>

              <Pressable style={styles.quickWriteButton} onPress={handleQuickWriteSubmit}>
                <Feather name="send" size={14} color="#FFF8E8" />
              </Pressable>
            </View>
          </View>
        ) : null}

        <Pressable style={styles.onThisDayCard}>
          <View>
            <Text style={styles.onThisDayLabel}>On This Day</Text>
            <Text style={styles.onThisDayText}>A memory from one year ago is waiting for you</Text>
          </View>
          <Feather name="chevron-right" size={18} color="#3A3327" />
        </Pressable>

        {posts.map((post) =>
          post.isPolaroid ? (
            <View key={post.id} style={[styles.polaroidWrap, { width: polaroidWidth }]}> 
              <View style={[styles.polaroidImage, { height: polaroidPhotoHeight }]} />
              <Text style={styles.polaroidCaption}>{post.text}</Text>
              <Text style={styles.polaroidMeta}>{post.author} • {post.time}</Text>

              <View style={styles.polaroidActions}>
                <Pressable style={styles.actionBtn} onPress={() => handleLike(post.id)}>
                  <Feather name="heart" size={15} color={likedPostIds[post.id] ? '#8D2F36' : '#594E3B'} />
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={() => setActivePostId(post.id)}>
                  <Feather name="message-circle" size={15} color="#594E3B" />
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={() => handleSave(post.id)}>
                  <Feather name={savedPostIds[post.id] ? 'bookmark' : 'bookmark'} size={15} color="#594E3B" />
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={() => handleShare(post)}>
                  <Feather name="share-2" size={15} color="#594E3B" />
                </Pressable>
              </View>
            </View>
          ) : (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View>
                  <Text style={styles.postAuthor}>{post.author}</Text>
                  <Text style={styles.postMeta}>{post.time} • {post.visibility}</Text>
                </View>
              </View>
              <Text style={styles.postBody}>{post.text}</Text>

              <View style={styles.postActions}>
                <Pressable style={styles.actionBtn} onPress={() => handleLike(post.id)}>
                  <Feather name="heart" size={15} color={likedPostIds[post.id] ? '#8D2F36' : '#594E3B'} />
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={() => setActivePostId(post.id)}>
                  <Feather name="message-circle" size={15} color="#594E3B" />
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={() => handleSave(post.id)}>
                  <Feather name={savedPostIds[post.id] ? 'bookmark' : 'bookmark'} size={15} color="#594E3B" />
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={() => handleShare(post)}>
                  <Feather name="share-2" size={15} color="#594E3B" />
                </Pressable>
              </View>
            </View>
          ),
        )}
      </ScrollView>

      <Modal visible={!!activePost} transparent animationType="slide" onRequestClose={() => setActivePostId(null)}>
        <View style={styles.modalRoot}>
          <Pressable style={styles.modalBackdrop} onPress={() => setActivePostId(null)} />
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={[styles.commentSheet, { paddingBottom: 12 + insets.bottom }]}> 
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Comments</Text>
            <ScrollView style={styles.commentList} contentContainerStyle={styles.commentListContent} keyboardShouldPersistTaps="handled">
              {activePost?.comments.length ? (
                activePost.comments.map((comment, index) => (
                  <View key={`${comment.id}-${index}`} style={styles.commentBubble}>
                    <View style={styles.commentHeadRow}>
                      <Text style={styles.commentUser}>{comment.user}</Text>
                      <Pressable style={styles.replyBtn} onPress={() => setReplyToCommentId(comment.id)}>
                        <Feather name="corner-up-left" size={12} color="#6C5E47" />
                        <Text style={styles.replyBtnText}>Reply</Text>
                      </Pressable>
                    </View>
                    <Text style={styles.commentText}>{comment.text}</Text>

                    {comment.replies.map((reply) => (
                      <View key={reply.id} style={styles.replyBubble}>
                        <Text style={styles.replyUser}>{reply.user}</Text>
                        <Text style={styles.replyText}>{reply.text}</Text>
                      </View>
                    ))}
                  </View>
                ))
              ) : (
                <Text style={styles.emptyComments}>No comments yet. Start the conversation.</Text>
              )}
            </ScrollView>

            {replyTargetUser ? (
              <View style={styles.replyingToRow}>
                <Text style={styles.replyingToText}>Replying to {replyTargetUser}</Text>
                <Pressable onPress={() => setReplyToCommentId(null)}>
                  <Feather name="x" size={14} color="#6E614B" />
                </Pressable>
              </View>
            ) : null}

            <View style={styles.commentInputRow}>
              <TextInput
                value={commentInput}
                onChangeText={setCommentInput}
                placeholder={replyTargetUser ? `Reply to ${replyTargetUser}` : 'Write a comment'}
                placeholderTextColor="#8C7B63"
                style={styles.commentInput}
              />
              <Pressable style={styles.commentSendBtn} onPress={handleAddComment}>
                <Text style={styles.commentSendText}>Send</Text>
              </Pressable>
            </View>
            </View>
          </KeyboardAvoidingView>
          </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 31,
    color: '#2A2418',
    fontFamily: 'Inter_700Bold',
  },
  headerTitleSmall: {
    fontSize: 28,
  },
  headerIconButton: {
    height: 38,
    width: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2E9D9',
  },
  promptCardTop: {
    backgroundColor: '#FFFDF8',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E6DDCC',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  promptTextWrap: {
    flex: 1,
  },
  promptHeading: {
    color: '#5F4A21',
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
  },
  onThisDayCard: {
    backgroundColor: '#F0E4CF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  onThisDayLabel: {
    fontSize: 13,
    color: '#6B4F18',
    fontFamily: 'Inter_700Bold',
  },
  onThisDayText: {
    marginTop: 4,
    color: '#3F3526',
    fontFamily: 'Inter_400Regular',
  },
  promptBody: {
    marginTop: 6,
    color: '#3F3526',
    lineHeight: 20,
    fontFamily: 'Lora_400Regular',
  },
  promptAction: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#2A2418',
    alignSelf: 'center',
  },
  promptActionText: {
    color: '#FFF8E8',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
  quickWriteCard: {
    borderRadius: 14,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#E6DDCC',
    padding: 12,
    gap: 10,
  },
  quickWriteInput: {
    minHeight: 72,
    color: '#3D3325',
    fontFamily: 'Lora_400Regular',
    textAlignVertical: 'top',
  },
  writeToolsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  writeToolsLeft: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
  },
  writeToolBtn: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#F6EDDE',
    borderWidth: 1,
    borderColor: '#E6D9C1',
  },
  quickWriteButton: {
    height: 32,
    width: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#2A2418',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickWriteButtonText: {
    color: '#FFF8E8',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
  postCard: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#FFFEFA',
    borderWidth: 1,
    borderColor: '#E7DECC',
    gap: 8,
  },
  postHeader: {
    marginBottom: 4,
  },
  postAuthor: {
    color: '#2A2418',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
  postMeta: {
    fontSize: 11,
    color: '#766B57',
    fontFamily: 'Inter_400Regular',
  },
  polaroidWrap: {
    alignSelf: 'stretch',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFEFA',
    borderWidth: 1,
    borderColor: '#E7DECC',
    marginBottom: 10,
    shadowColor: '#1E1A13',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  polaroidImage: {
    width: '100%',
    backgroundColor: '#D7C8AE',
  },
  polaroidCaption: {
    paddingHorizontal: 9,
    paddingTop: 8,
    color: '#3B3123',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  polaroidMeta: {
    paddingHorizontal: 9,
    paddingBottom: 7,
    paddingTop: 4,
    color: '#7A6B54',
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
  },
  polaroidActions: {
    paddingHorizontal: 9,
    paddingBottom: 10,
    marginTop: 2,
    flexDirection: 'row',
    gap: 10,
  },
  postBody: {
    color: '#3D3325',
    lineHeight: 21,
    fontFamily: 'Lora_400Regular',
  },
  postActions: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionBtn: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#F5ECDD',
    borderWidth: 1,
    borderColor: '#E7DCC8',
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(32, 24, 14, 0.25)',
  },
  commentSheet: {
    backgroundColor: '#FFFCF7',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 10,
    maxHeight: '72%',
    minHeight: 300,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DDCFB4',
    marginBottom: 10,
  },
  sheetTitle: {
    color: '#2A2418',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    marginBottom: 10,
  },
  commentList: {
    maxHeight: 300,
  },
  commentListContent: {
    gap: 8,
    paddingBottom: 8,
  },
  commentBubble: {
    backgroundColor: '#F7EEDC',
    borderWidth: 1,
    borderColor: '#E8DCC5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  commentHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentUser: {
    color: '#3D3222',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
  replyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  replyBtnText: {
    color: '#6C5E47',
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
  },
  commentText: {
    color: '#4A3E2D',
    fontFamily: 'Inter_400Regular',
  },
  replyBubble: {
    marginTop: 8,
    marginLeft: 12,
    borderRadius: 10,
    backgroundColor: '#FBF3E6',
    borderWidth: 1,
    borderColor: '#E7DAC3',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  replyUser: {
    color: '#4D402D',
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    marginBottom: 2,
  },
  replyText: {
    color: '#5D4F39',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  emptyComments: {
    color: '#7A705E',
    fontFamily: 'Inter_400Regular',
  },
  replyingToRow: {
    marginTop: 8,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6D9C2',
    backgroundColor: '#F9F1E2',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  replyingToText: {
    color: '#5F5038',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
  commentInputRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#F8EFDF',
    borderWidth: 1,
    borderColor: '#E4D7BF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#3D3325',
    fontFamily: 'Inter_400Regular',
  },
  commentSendBtn: {
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2418',
  },
  commentSendText: {
    color: '#FFF8E8',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
});
