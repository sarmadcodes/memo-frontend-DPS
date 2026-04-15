import { ScrollView, StyleSheet, Text, View, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import SkeletonCard from '../../components/ui/SkeletonCard';
import EmptyState from '../../components/ui/EmptyState';

const types = [
  ['Freewrite', 'edit-3', '/create/editor?type=freewrite'],
  ['Photo Dump', 'image', '/create/editor?type=photo_dump'],
  ['Time Capsule', 'clock', '/create/time-capsule'],
] as const;

export default function CreateScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isCompact = width < 390;
  const [isLoading] = useState(false);
  const hasTemplates = true;

  return (
    <LinearGradient colors={['#FFF9F1', '#F7EEE0']} style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 132 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, isCompact && styles.titleCompact]}>Create</Text>
        <Text style={styles.subtitle}>What's on your mind?</Text>

        <View style={styles.topNoteCard}>
          <Text style={styles.topNoteLabel}>Quick Start</Text>
          <Text style={styles.topNoteBody}>Choose a format below to start expressing your thoughts.</Text>
        </View>

        {isLoading ? <SkeletonCard /> : null}

        {!isLoading && !hasTemplates ? (
          <EmptyState title="No templates" subtitle="Please pull to refresh and try again." />
        ) : null}

        {!isLoading && hasTemplates ? (
          <View style={styles.typeGrid}>
            {types.map(([label, icon, route]) => (
              <Pressable 
                key={label} 
                style={styles.typeCard}
                onPress={() => router.push(route)}
              >
                <View style={styles.iconContainer}>
                  <Feather name={icon} size={20} color="#6A5323" />
                </View>
                <View style={styles.typeTextContainer}>
                  <Text style={styles.typeText}>{label}</Text>
                  <Feather name="chevron-right" size={16} color="#A89F91" />
                </View>
              </Pressable>
            ))}
          </View>
        ) : null}

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
    gap: 14,
  },
  title: {
    fontSize: 30,
    color: '#2C2418',
    fontFamily: 'Inter_700Bold',
  },
  titleCompact: {
    fontSize: 28,
  },
  subtitle: {
    color: '#6D604C',
    fontFamily: 'Inter_400Regular',
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
  typeGrid: {
    marginTop: 10,
    flexDirection: 'column',
    gap: 12,
  },
  typeCard: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7DDCB',
    backgroundColor: '#FFFDF8',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3ECD8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeText: {
    color: '#362B1C',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
});
