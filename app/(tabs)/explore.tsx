import React, { useState } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  useWindowDimensions, 
  Pressable
} from 'react-native';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  useAnimatedScrollHandler
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import SkeletonCard from '../../components/ui/SkeletonCard';
import EmptyState from '../../components/ui/EmptyState';
import { EXPLORE_CHIPS, HERO_TOPICS, MASONRY_COLUMNS } from '../../constants/dummyData';

export default function ExploreScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const scrollY = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollY.value > 50 ? withTiming(1) : withTiming(0),
    };
  });

  const horizontalPadding = width < 380 ? 16 : 24;
  const gap = 12;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: 120 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#F9F6F0', '#FCFAf8']}
          style={[styles.headerGradient, { paddingTop: Math.max(40, insets.top + 20) }]}
        >
          <View style={{ paddingHorizontal: horizontalPadding }}>
            <Text style={styles.largeTitle}>Discover</Text>
            <Text style={styles.subtitle}>Curated moments & thoughts</Text>
            
            <View style={styles.searchBar}>
              <Feather name="search" size={20} color="#8A8275" />
              <TextInput 
                placeholder="Search ideas, places, moods..." 
                placeholderTextColor="#A8A196" 
                style={styles.searchInput}
              />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.contentBody}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.categoriesContainer, { paddingHorizontal: horizontalPadding }]}
          >
            {EXPLORE_CHIPS.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <Pressable 
                  key={cat} 
                  onPress={() => setActiveCategory(cat)}
                  style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                >
                  <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={{ paddingHorizontal: horizontalPadding, marginTop: 32 }}>
            <Text style={styles.sectionTitle}>Featured Stories</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.75 + gap}
            decelerationRate="fast"
            contentContainerStyle={[styles.heroScrollContainer, { paddingHorizontal: horizontalPadding }]}
          >
            {HERO_TOPICS.map((hero) => (
              <ImageBackground 
                key={hero.id} 
                source={typeof hero.image === 'string' ? { uri: hero.image } : hero.image}
                style={[
                  styles.heroCard, 
                  { width: width * 0.75 }
                ]}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              >
                <View style={styles.heroOverlay} />
                <View style={styles.heroContent}>
                  <View style={styles.heroTag}>
                    <Text style={styles.heroTagText}>EDITOR'S PICK</Text>
                  </View>
                  <View>
                    <Text style={[styles.heroTitle, { color: '#FFFFFF' }]} numberOfLines={2}>{hero.title}</Text>
                    <Text style={[styles.heroAuthor, { color: 'rgba(255,255,255,0.8)' }]}>By {hero.author}</Text>
                  </View>
                </View>
              </ImageBackground>
            ))}
          </ScrollView>

          <View style={{ paddingHorizontal: horizontalPadding, marginTop: 40, marginBottom: 16 }}>
            <Text style={styles.sectionTitle}>Inspired by your taste</Text>
          </View>
          
          <View style={[styles.masonryContainer, { paddingHorizontal: horizontalPadding }]}>
            {MASONRY_COLUMNS.map((col, colIndex) => (
              <View key={`col-${colIndex}`} style={styles.masonryColumn}>
                {col.map((item) => (
                  <Pressable key={item.id} style={[styles.masonryItem, { height: item.height }]}>
                    <ImageBackground
                      source={{ uri: `https://picsum.photos/seed/${item.query}/400/600` }}
                      style={styles.masonryImage}
                      imageStyle={styles.masonryImageRadius}
                      contentFit="cover"
                      transition={200}
                      cachePolicy="memory-disk"
                    >
                      <View style={styles.masonryOverlay} />
                      <Text style={styles.masonryLabel}>{item.title}</Text>
                    </ImageBackground>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFAf8',
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
  },
  blurContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  floatingHeaderTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1A1814',
  },
  headerGradient: {
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EBE0',
  },
  largeTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 36,
    color: '#1A1814',
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#8A8275',
    marginTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    gap: 12,
    borderWidth: 1,
    borderColor: '#F0EBE0',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1A1814',
  },
  contentBody: {
    paddingTop: 24,
  },
  categoriesContainer: {
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E6E1D6',
    backgroundColor: '#FCFAf8',
  },
  categoryPillActive: {
    backgroundColor: '#1A1814',
    borderColor: '#1A1814',
  },
  categoryText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#6e685f',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#1A1814',
    letterSpacing: -0.5,
  },
  heroScrollContainer: {
    gap: 12,
    marginTop: 16,
  },
  heroCard: {
    height: 380,
    borderRadius: 28,
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  heroTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  heroTagText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: '#1A1814',
    letterSpacing: 1,
  },
  heroTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#1A1814',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  heroAuthor: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: 'rgba(26,24,20,0.7)',
  },
  masonryContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 24,
  },
  masonryColumn: {
    flex: 1,
    gap: 12,
  },
  masonryItem: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  masonryImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  masonryImageRadius: {
    borderRadius: 24,
  },
  masonryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  masonryLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  }
});