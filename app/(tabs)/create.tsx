import { ScrollView, StyleSheet, Text, View, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import SkeletonCard from '../../components/ui/SkeletonCard';
import EmptyState from '../../components/ui/EmptyState';

const types = [
  ['Freewrite', 'edit-3'],
  ['Photo Dump', 'image'],
] as const;

export default function CreateScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
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
        <Text style={styles.subtitle}>Pick a format and capture your moment softly.</Text>

        <View style={styles.topNoteCard}>
          <Text style={styles.topNoteLabel}>Quick Start</Text>
          <Text style={styles.topNoteBody}>Choose a post type, write your moment, then set visibility.</Text>
        </View>

        {isLoading ? <SkeletonCard /> : null}

        {!isLoading && !hasTemplates ? (
          <EmptyState title="No templates" subtitle="Please pull to refresh and try again." />
        ) : null}

        {!isLoading && hasTemplates ? (
          <View style={styles.typeGrid}>
            {types.map(([label, icon]) => (
              <Pressable key={label} style={styles.typeCard}>
                <Feather name={icon} size={16} color="#4A3820" />
                <Text style={styles.typeText}>{label}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <View style={styles.editorCard}>
          <Text style={styles.sectionTitle}>Step 2: Editor</Text>
          <Text style={styles.paragraph}>Freewrite supports text. Photo Dump supports photos with an optional caption.</Text>
          <View style={styles.row}>
            <Pressable style={styles.ghostBtn}><Text style={styles.ghostText}>Attach Media</Text></Pressable>
            <Pressable style={styles.ghostBtn}><Text style={styles.ghostText}>Add Location</Text></Pressable>
          </View>
        </View>

        <View style={styles.editorCard}>
          <Text style={styles.sectionTitle}>Step 3: Visibility</Text>
          <Text style={styles.paragraph}>Pick who can see this post.</Text>
          <View style={styles.visibilityRow}>
            {['Public', 'Followers', 'Only Me'].map((v) => (
              <View key={v} style={styles.visibilityPill}>
                <Text style={styles.visibilityText}>{v}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.shareButton}>
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
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
    marginTop: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeCard: {
    width: '48.8%',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E7DDCB',
    backgroundColor: '#FFFDF8',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeText: {
    color: '#362B1C',
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
  },
  editorCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DDCB',
    backgroundColor: '#FFFCF6',
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    color: '#2F271A',
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  paragraph: {
    color: '#675A45',
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  ghostBtn: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2D4BF',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F8F1E4',
  },
  ghostText: {
    color: '#4A3B25',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
  visibilityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  visibilityPill: {
    borderRadius: 999,
    backgroundColor: '#F3EBDD',
    borderWidth: 1,
    borderColor: '#E2D3B8',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  visibilityText: {
    color: '#4A3B25',
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  shareButton: {
    borderRadius: 14,
    backgroundColor: '#2C2418',
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  shareText: {
    color: '#FFF8E8',
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
});
