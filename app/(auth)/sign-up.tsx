import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import InputField from '../../components/ui/InputField';
import PrimaryButton from '../../components/ui/PrimaryButton';

export default function Screen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);
  const passwordValid = password.length >= 8;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24 + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Start your quiet corner on Memo.</Text>

        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          error={email.length > 0 && !emailValid ? 'Enter a valid email address' : undefined}
        />

        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="At least 8 characters"
          secureTextEntry
          error={password.length > 0 && !passwordValid ? 'Password must be at least 8 characters' : undefined}
        />

        <View style={styles.validationRow}>
          <Text style={[styles.rule, emailValid ? styles.rulePass : null]}>Email format valid</Text>
          <Text style={[styles.rule, passwordValid ? styles.rulePass : null]}>Password length valid</Text>
        </View>

        <PrimaryButton
          label="Continue"
          onPress={() => router.push('/(auth)/onboarding/username')}
          disabled={!emailValid || !passwordValid}
        />
        <PrimaryButton label="Continue with Google" variant="secondary" />
        <PrimaryButton label="Continue with Apple" variant="secondary" />

        <Text style={styles.footnote}>By signing up, you agree to our Terms and Privacy Policy.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF7' },
  content: { paddingHorizontal: 16, gap: 12 },
  title: {
    color: '#2A2418',
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    color: '#6E604C',
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  validationRow: { gap: 6, marginBottom: 4 },
  rule: { color: '#9A8E79', fontFamily: 'Inter_400Regular', fontSize: 12 },
  rulePass: { color: '#356A3A' },
  footnote: {
    color: '#8A7B61',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: 4,
  },
});
