import { Feather } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import InputField from '../../../components/ui/InputField';
import PrimaryButton from '../../../components/ui/PrimaryButton';

export default function Screen() {
  const insets = useSafeAreaInsets();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24 + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.bannerPlaceholder}>
          <Text style={styles.bannerText}>Optional banner image</Text>
        </View>

        <Pressable style={({ pressed }) => [styles.avatarWrap, pressed ? styles.pressed : null]}>
          <View style={styles.avatar}>
            <Feather name="camera" size={20} color="#5F4F30" />
          </View>
          <View style={styles.cameraBadge}>
            <Feather name="plus" size={12} color="#FFF8EA" />
          </View>
        </Pressable>

        <InputField label="Display name" value={displayName} onChangeText={setDisplayName} placeholder="Your name" />
        <InputField
          label="Bio"
          value={bio}
          onChangeText={setBio}
          placeholder="A gentle line about you"
          maxLength={120}
          multiline
        />

        <PrimaryButton label="Continue" onPress={() => router.push('/(auth)/onboarding/done')} disabled={!displayName.trim()} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF7' },
  content: { paddingHorizontal: 16, gap: 12 },
  bannerPlaceholder: {
    borderRadius: 14,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFE3CD',
    borderWidth: 1,
    borderColor: '#E3D2B2',
  },
  bannerText: { color: '#7B694A', fontFamily: 'Inter_700Bold', fontSize: 12 },
  avatarWrap: { alignSelf: 'center', marginTop: -40 },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    borderWidth: 3,
    borderColor: '#FAFAF7',
    backgroundColor: '#E8D7B7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    right: 3,
    bottom: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2E271B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.82 },
});
