import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

const visibilityOptions = [
  { id: 'public', label: 'Public', description: 'Anyone on Memo can unfold this', icon: 'globe' },
  { id: 'followers', label: 'Followers', description: 'Only your followers can unfold this', icon: 'users' },
  { id: 'only_me', label: 'Only Me', description: 'Saved to your private archive', icon: 'lock' },
] as const;

export default function VisibilityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string>('public');

  const handlePost = () => {
    // Actually post here, for now just go to tab root
    router.replace('/(tabs)/feed');
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(20, insets.top) }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <Feather name="arrow-left" size={24} color="#2A2419" />
        </Pressable>
        <Text style={styles.headerTitle}>Visibility</Text>
        <View style={{ width: 40 }} />
      </View>

      <Text style={styles.sectionTitle}>Who can see this?</Text>

      <View style={styles.optionsContainer}>
        {visibilityOptions.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <Pressable
              key={opt.id}
              style={[styles.optionCard, isSelected && styles.optionCardSelected]}
              onPress={() => setSelected(opt.id)}
            >
              <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
                <Feather 
                  name={opt.icon as any} 
                  size={20} 
                  color={isSelected ? '#2A2419' : '#6B6254'} 
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                  {opt.label}
                </Text>
                <Text style={styles.optionDesc}>{opt.description}</Text>
              </View>
              {isSelected && (
                <Feather name="check" size={20} color="#2A2419" />
              )}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Share Moment</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E7DDCB',
  },
  iconBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#2A2419',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#2A2419',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DDCB',
    backgroundColor: '#FFFCF6',
  },
  optionCardSelected: {
    borderColor: '#2A2419',
    backgroundColor: '#F3ECD8',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3ECD8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconContainerSelected: {
    backgroundColor: '#FFF',
  },
  textContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#2A2419',
    marginBottom: 4,
  },
  optionLabelSelected: {
    color: '#1A1610',
  },
  optionDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: '#6B6254',
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
    paddingBottom: 40,
  },
  postButton: {
    backgroundColor: '#2A2419',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
