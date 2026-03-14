import { ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const topics = ['Growth', 'Healing', 'Photo Dump', 'Song Moment', 'Voice Note'];
const cards = [
  { id: '1', title: 'quiet mornings', tall: true },
  { id: '2', title: 'tiny wins', tall: false },
  { id: '3', title: 'sunset train', tall: false },
  { id: '4', title: 'old letters', tall: true },
];

export default function ExploreScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const horizontalPadding = width < 380 ? 14 : 16;
  const gap = width < 380 ? 8 : 10;
  const cardWidth = (width - horizontalPadding * 2 - gap) / 2;
  const isCompact = width < 390;

  return (
    <LinearGradient colors={['#FFF9F1', '#F7F0E5']} style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: horizontalPadding,
            paddingTop: Math.max(20, insets.top + 10),
            paddingBottom: 132 + insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
      <Text style={[styles.title, isCompact && styles.titleCompact]}>Explore</Text>

      <View style={styles.topNoteCard}>
        <Text style={styles.topNoteLabel}>Discover</Text>
        <Text style={styles.topNoteBody}>Find people and posts that feel like your vibe.</Text>
      </View>

      <View style={styles.searchWrap}>
        <Feather name="search" size={16} color="#7A705D" />
        <TextInput placeholder="Find users, stories, moods" placeholderTextColor="#9A9283" style={styles.searchInput} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topicRow}>
        {topics.map((topic) => (
          <View key={topic} style={styles.topicPill}>
            <Text style={styles.topicText}>{topic}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>People you might like</Text>
      </View>
      <View style={styles.suggestRow}>
        {['Maya', 'Noah', 'Ava'].map((name) => (
          <View key={name} style={styles.personCard}>
            <View style={styles.avatar} />
            <Text style={styles.personName}>{name}</Text>
              <Text style={styles.personMeta}>public profile</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Trending public posts</Text>
      <View style={styles.masonryWrap}>
        {cards.map((card) => (
          <View
            key={card.id}
            style={[
              styles.masonryCard,
              {
                width: cardWidth,
                height: card.tall ? (width < 380 ? 170 : 190) : width < 380 ? 126 : 140,
              },
            ]}
          >
            <Text style={styles.masonryTag}>PUBLIC</Text>
            <Text style={styles.masonryTitle}>{card.title}</Text>
          </View>
        ))}
      </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },
  content: {
    gap: 14,
  },
  title: {
    fontSize: 30,
    color: '#2A2418',
    fontFamily: 'Inter_700Bold',
  },
  titleCompact: {
    fontSize: 28,
  },
  topNoteCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DDCB',
    backgroundColor: '#FFFEFA',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  topNoteLabel: {
    color: '#6A5323',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  topNoteBody: {
    marginTop: 4,
    color: '#4B3E2C',
    fontFamily: 'Inter_400Regular',
  },
  searchWrap: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3DCCB',
    backgroundColor: '#FFFEFA',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    color: '#2E2A22',
    fontFamily: 'Inter_400Regular',
  },
  topicRow: {
    gap: 8,
  },
  topicPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#EFE7D7',
  },
  topicText: {
    color: '#5F4F2D',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  sectionHead: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#29241A',
    fontFamily: 'Inter_700Bold',
  },
  suggestRow: {
    flexDirection: 'row',
    gap: 8,
  },
  personCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#E7DECE',
    padding: 10,
  },
  avatar: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: '#DAC9A2',
  },
  personName: {
    marginTop: 8,
    color: '#2F291E',
    fontFamily: 'Inter_700Bold',
  },
  personMeta: {
    fontSize: 11,
    color: '#7A705E',
    fontFamily: 'Inter_400Regular',
  },
  masonryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    columnGap: 10,
  },
  masonryCard: {
    borderRadius: 16,
    backgroundColor: '#EFE2CC',
    padding: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4D8C1',
  },
  masonryTag: {
    fontSize: 10,
    color: '#6E5A2C',
    letterSpacing: 1,
    fontFamily: 'Inter_700Bold',
  },
  masonryTitle: {
    fontSize: 17,
    color: '#31281A',
    fontFamily: 'Inter_700Bold',
  },
});
