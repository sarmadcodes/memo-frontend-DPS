import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { DummyPost } from '../../constants/dummyData';
import EchoBubble from './EchoBubble';
import UserAvatar from './UserAvatar';
import VisibilityBadge from './VisibilityBadge';

type PostCardProps = {
  post: DummyPost;
  onPress?: () => void;
};

export default function PostCard({ post, onPress }: PostCardProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed ? styles.pressed : null]}
    >
      <View style={styles.authorRow}>
        <Pressable onPress={() => router.push(`/profile/${post.author.username}`)}>
          <UserAvatar name={post.author.name} size={38} />
        </Pressable>
        <Pressable 
          style={styles.metaCol}
          onPress={() => router.push(`/profile/${post.author.username}`)}
        >
          <Text style={styles.name}>{post.author.name}</Text>
          <Text style={styles.handle}>@{post.author.username}</Text>
        </Pressable>
        <VisibilityBadge visibility={post.visibility} />
      </View>

      {post.mediaUrls[0] ? <Image source={{ uri: post.mediaUrls[0] }} style={styles.photo} /> : null}

      <Text style={styles.body}>{post.content}</Text>

      <View style={styles.echoRow}>
        {post.echoes.length ? (
          post.echoes.map((echo) => <EchoBubble key={`${post.id}-${echo.text}`} text={echo.text} count={echo.count} />)
        ) : (
          <Text style={styles.noEcho}>No echoes yet</Text>
        )}
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.actionBtn} onPress={(e) => { e.stopPropagation(); setLiked(!liked); }}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={18} color={liked ? "#D9534F" : "#5C503C"} />
        </Pressable>
        <Pressable style={styles.actionBtn} onPress={(e) => { e.stopPropagation(); router.push(`/post/${post.id}`); }}>
          <Feather name="message-circle" size={16} color="#5C503C" />
        </Pressable>
        <Pressable style={styles.actionBtn} onPress={(e) => { e.stopPropagation(); setSaved(!saved); }}>
          <Ionicons name={saved ? "bookmark" : "bookmark-outline"} size={16} color="#5C503C" />
        </Pressable>
        <Pressable style={styles.actionBtn} onPress={(e) => { e.stopPropagation(); }}>
          <Feather name="more-horizontal" size={16} color="#5C503C" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFDFA',
    borderWidth: 1,
    borderColor: '#E4DAC5',
    borderRadius: 16,
    padding: 12,
    gap: 10,
  },
  pressed: {
    opacity: 0.86,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaCol: {
    flex: 1,
  },
  name: {
    color: '#2F271A',
    fontFamily: 'Inter_700Bold',
  },
  handle: {
    color: '#7B705B',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  photo: {
    width: '100%',
    height: 190,
    borderRadius: 12,
  },
  body: {
    color: '#3E3528',
    fontFamily: 'Lora_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  echoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  noEcho: {
    color: '#8A7D67',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5EEE0',
  },
});
