import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMemo, useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useSignUp, useOAuth } from '@clerk/expo';
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import InputField from '../../components/ui/InputField';
import PrimaryButton from '../../components/ui/PrimaryButton';

WebBrowser.maybeCompleteAuthSession();

export default function Screen() {
  useWarmUpBrowser();
  const insets = useSafeAreaInsets();
  const { isLoaded, signUp, setActive } = useSignUp();
  
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({ strategy: 'oauth_apple' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);
  const passwordValid = password.length >= 8;

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setErrorText('');

    try {
      if (email.length > 0 && !emailValid) {
        throw new Error('Enter a valid email address');
      }
      if (password.length > 0 && !passwordValid) {
        throw new Error('Password must be at least 8 characters');
      }

      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error('Sign Up Error:', JSON.stringify(err, null, 2));
      setErrorText(err.message || err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setErrorText('');

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/(auth)/onboarding/username');
      } else {
        setErrorText('Verification not complete. Try again.');
      }
    } catch (err: any) {
      console.error('Verification Error:', JSON.stringify(err, null, 2));
      setErrorText(err.message || err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Invalid code.');
    } finally {
      setLoading(false);
    }
  };

  const onSelectAuth = useCallback(async (strategy: 'google' | 'apple') => {
    try {
      setLoading(true);
      setErrorText('');
      const startOAuthFlow = strategy === 'google' ? startGoogleOAuthFlow : startAppleOAuthFlow;
      
      const { createdSessionId, setActive: setOAuthActive } = await startOAuthFlow();
      if (createdSessionId) {
        setOAuthActive!({ session: createdSessionId });
        router.replace('/(tabs)/feed');
      } else {
        // Triggers the next step (like username setup)
        router.push('/(auth)/onboarding/username');
      }
    } catch (err: any) {
      console.error('OAuth Error:', JSON.stringify(err, null, 2));
      setErrorText(err.errors?.[0]?.message || err.message || `Failed to sign in with ${strategy}`);
    } finally {
      setLoading(false);
    }
  }, []);

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24 + insets.bottom }]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>We sent a verification code to {email}</Text>

          <InputField
            label="Verification Code"
            value={code}
            onChangeText={setCode}
            placeholder="123456"
            keyboardType="numeric"
          />

          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

          <PrimaryButton
            label={loading ? 'Verifying...' : 'Verify Email'}
            onPress={onPressVerify}
            disabled={code.length < 6 || loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

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
          autoCapitalize="none"
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

        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

        <PrimaryButton
          label={loading ? 'Continuing...' : 'Continue'}
          onPress={onSignUpPress}
          disabled={!emailValid || !passwordValid || loading}
        />

        <Text style={styles.orText}>— or —</Text>

        <PrimaryButton label="Sign up with Google" variant="secondary" onPress={() => onSelectAuth('google')} disabled={loading} />
        <PrimaryButton label="Sign up with Apple" variant="secondary" onPress={() => onSelectAuth('apple')} disabled={loading} />

        <PrimaryButton label="Already have an account? Sign In" variant="secondary" onPress={() => router.replace('/(auth)/sign-in')} />

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
  errorText: { color: '#D9534F', fontSize: 13, fontFamily: 'Inter_400Regular' },
  orText: { color: '#9A8F7D', textAlign: 'center', marginVertical: 8, fontFamily: 'Inter_400Regular' },
});
