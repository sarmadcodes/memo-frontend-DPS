import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import InputField from '../../components/ui/InputField';
import PrimaryButton from '../../components/ui/PrimaryButton';

export default function Screen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24 + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Welcome back to your private space.</Text>

        <InputField label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" />
        <InputField label="Password" value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />

        <PrimaryButton label="Sign In" onPress={() => router.replace('/(tabs)/feed')} disabled={!email || !password} />
        <PrimaryButton label="Continue with Google" variant="secondary" />
        <PrimaryButton label="Continue with Apple" variant="secondary" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF7' },
  content: { paddingHorizontal: 16, gap: 12 },
  title: { color: '#2A2418', fontSize: 30, fontFamily: 'Inter_700Bold' },
  subtitle: { color: '#6E604C', fontFamily: 'Inter_400Regular', marginBottom: 4 },
});
