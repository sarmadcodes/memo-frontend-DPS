import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useUser } from '@clerk/expo';
import InputField from '../../../components/ui/InputField';
import PrimaryButton from '../../../components/ui/PrimaryButton';

export default function Screen() {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const status = useMemo(() => {
    if (!username.trim()) return 'idle';
    if (username.length < 3 || username.length > 20) return 'invalid';
    if (!/^[a-z0-9_]+$/i.test(username)) return 'invalid';
    return 'available';
  }, [username]);

  const onUpdateUsername = async () => {
    if (status !== 'available' || !user) return;
    
    setLoading(true);
    setErrorText('');
    
    try {
      await user.update({ username });
      router.push('/(auth)/onboarding/profile');
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      // Clerk throws an error if the username is already taken globally
      setErrorText(err.errors?.[0]?.message || 'Something went wrong. Username might be taken.');
    } finally {
      setLoading(false);
    }
  };

  const suggestions = useMemo(
    () => [`${username}memo`, `${username}_writes`, `${username}daily`].filter((x) => x.length <= 20),
    [username],
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24 + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Pick a username</Text>
        <Text style={styles.subtitle}>This is how people find you on Memo.</Text>

        <InputField label="Username" value={username} onChangeText={setUsername} placeholder="your_name" />

        <Text style={styles.status}>
          {status === 'idle' && 'Type a username...'}
          {status === 'invalid' && 'Use 3-20 letters, numbers, or underscores.'}
          {status === 'available' && 'Username format is valid!'}
        </Text>
        
        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

        <PrimaryButton
          label={loading ? "Checking & Saving..." : "Continue"}
          onPress={onUpdateUsername}
          disabled={status !== 'available' || loading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF7' },
  content: { paddingHorizontal: 16, gap: 12 },
  title: { color: '#2A2418', fontSize: 30, fontFamily: 'Inter_700Bold' },
  subtitle: { color: '#6E604C', fontFamily: 'Inter_400Regular' },
  status: { color: '#6A5E48', fontFamily: 'Inter_400Regular', fontSize: 12 },
  errorText: { color: '#D9534F', fontSize: 13, fontFamily: 'Inter_400Regular', marginBottom: 8 },
  suggestionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    borderRadius: 999,
    backgroundColor: '#F3EBDD',
    borderWidth: 1,
    borderColor: '#E2D3B8',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillText: { color: '#4A3B25', fontSize: 11, fontFamily: 'Inter_700Bold' },
  pressed: { opacity: 0.8 },
});
