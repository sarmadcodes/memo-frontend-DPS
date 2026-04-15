import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { DummyPost } from '../../constants/dummyData';
import EchoBubble from '../ui/EchoBubble';
import UserAvatar from '../ui/UserAvatar';
import VisibilityBadge from '../ui/VisibilityBadge';

type PostCardProps = {
  post: DummyPost;
  onPress?: () => void;
};

export default function PostCard({ post, onPress }: PostCardProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Use a pseudo-random or formatted date for diary feel if available, 
  // falling back to a dummy string
  const diaryDate = new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.wrapper, pressed ? styles.pressed : null]}
    >
      <View style={styles.card}>
        <View style={styles.diaryHeader}>
          <Text style={styles.dateText}>
            {post.postType === 'PHOTO' ? <Feather name="camera" size={10} color="#8D8471" style={{ marginRight: 4 }} /> : null}
            {' '}{diaryDate}
          </Text>
          <VisibilityBadge visibility={post.visibility} />
        </View>

        {post.postType === 'VOICENOTE' && (
          <View style={styles.voiceNoteContainer}>
            <Pressable style={styles.playButton}>
              <Ionicons name="play" size={20} color="#FAF8F5" />
            </Pressable>
            <View style={styles.waveformContainer}>
              <View style={[styles.waveformBar, { height: '30%' }]} />
              <View style={[styles.waveformBar, { height: '50%' }]} />
              <View style={[styles.waveformBar, { height: '80%' }]} />
              <View style={[styles.waveformBar, { height: '100%' }]} />
              <View style={[styles.waveformBar, { height: '60%' }]} />
              <View style={[styles.waveformBar, { height: '40%' }]} />
              <View style={[styles.waveformBar, { height: '70%' }]} />
              <View style={[styles.waveformBar, { height: '90%' }]} />
              <View style={[styles.waveformBar, { height: '50%' }]} />
              <View style={[styles.waveformBar, { height: '20%' }]} />
            </View>
            <Text style={styles.durationText}>0:14</Text>
          </View>
        )}

        {post.postType !== 'PHOTO' && post.content ? (
          <View style={styles.contentBody}>
            <Text style={styles.bodyText}>{post.content}</Text>
          </View>
        ) : null}

        {post.mediaUrls && post.mediaUrls.length > 0 ? (
        <View style={post.mediaUrls.length === 1 ? styles.mediaContainerSingle : styles.mediaContainerMultiple}>
          <ScrollView 
            horizontal={post.mediaUrls.length > 1}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={post.mediaUrls.length > 1 ? styles.mediaScrollContent : null}
            snapToInterval={312} // width(300) + gap(12)
            decelerationRate="fast"
            pagingEnabled={false}
            bounces={false}
          >
            {post.mediaUrls.map((mediaUrl: any, idx: number) => (
              <Image 
                key={idx} 
                source={typeof mediaUrl === 'string' ? { uri: mediaUrl } : mediaUrl} 
                style={post.mediaUrls.length > 1 ? styles.photoMultiple : styles.photoSingle}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              />
            ))}
          </ScrollView>
        </View>
        ) : null}

        {post.postType === 'PHOTO' && post.content ? (
          <View style={styles.captionBody}>
            <Text style={styles.captionText}>{post.content}</Text>
          </View>
        ) : null}

        <View style={styles.echoContainer}>
          <Text style={styles.echoLabel}>Echoes</Text>
          <View style={styles.echoRow}>
            {post.echoes && post.echoes.length ? (
              post.echoes.map((echo) => (
                <EchoBubble key={`${post.id}-${echo.text}`} text={echo.text} count={echo.count} />
              ))
            ) : (
              <Text style={styles.noEcho}>Quiet as a whisper...</Text>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable 
            style={styles.authorRow}
            onPress={(e) => { e.stopPropagation(); router.push(`/profile/${post.author.username}`); }}
          >
            <UserAvatar name={post.author.name} avatar={post.author.avatar} size={32} />
            <View>
              <Text style={styles.name}>{post.author.name}</Text>
              <Text style={styles.handle}>@{post.author.username}</Text>
            </View>
          </Pressable>

          <View style={styles.actionsRow}>
            <Pressable style={styles.actionBtn} onPress={(e) => { e.stopPropagation(); setLiked(!liked); }}>
              <Ionicons name={liked ? "heart" : "heart-outline"} size={20} color={liked ? "#D9534F" : "#8A7D67"} />
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={(e) => { e.stopPropagation(); router.push(`/post/${post.id}`); }}>
              <Feather name="message-circle" size={18} color="#8A7D67" />
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={(e) => { e.stopPropagation(); setSaved(!saved); }}>
              <Ionicons name={saved ? "bookmark" : "bookmark-outline"} size={18} color="#8A7D67" />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEA',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  diaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3EFEB',
  },
  dateText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#8D8471',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contentBody: {
    marginBottom: 12,
  },
  bodyText: {
    color: '#2A2419',
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 24,
  },
  captionBody: {
    marginTop: 4,
    marginBottom: 16,
    paddingLeft: 4,
    borderLeftWidth: 2,
    borderLeftColor: '#EBE5DB',
  },
  captionText: {
    color: '#5C5441',
    fontFamily: 'Lora_400Regular_Italic',
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: 8,
  },
  mediaContainerSingle: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mediaContainerMultiple: {
    marginBottom: 12,
    marginHorizontal: -16, // Bleed out slightly to edges of the card inner padding
  },
  mediaScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  photoSingle: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    backgroundColor: '#F3EFEB',
  },
  photoMultiple: {
    width: 300,
    height: 300,
    borderRadius: 16,
    backgroundColor: '#F3EFEB',
  },
  voiceNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E1D5',
    padding: 12,
    borderRadius: 24,
    marginBottom: 16,
    gap: 12,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8A7D67',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2, 
  },
  waveformContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 24,
  },
  waveformBar: {
    width: 3,
    backgroundColor: '#A69B86',
    borderRadius: 2,
  },
  durationText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#8A7D67',
  },
  echoContainer: {
    backgroundColor: '#F3EFE6',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  echoLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: '#A69B86',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  echoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  noEcho: {
    color: '#8A7D67',
    fontFamily: 'Lora_400Regular_Italic',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E8E1D5',
    paddingTop: 16,
    marginTop: 4,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    color: '#2D251A',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  handle: {
    color: '#8A7D67',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionBtn: {
    padding: 4,
  },
});


