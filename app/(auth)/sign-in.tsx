import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useSignIn, useOAuth } from '@clerk/expo';
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import InputField from '../../components/ui/InputField';
import PrimaryButton from '../../components/ui/PrimaryButton';

WebBrowser.maybeCompleteAuthSession();

export default function Screen() {
  useWarmUpBrowser();
  const insets = useSafeAreaInsets();
  const { signIn, setActive, isLoaded } = useSignIn();
  
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({ strategy: 'oauth_apple' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

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
        // If not fully signed in (e.g. requires 2FA or new user setup), push to onboarding
        router.push('/(auth)/onboarding/username');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setErrorText(err.errors?.[0]?.message || err.message || `Failed to sign in with ${strategy}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSignIn = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setErrorText('');
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
      
      await setActive({ session: completeSignIn.createdSessionId });
      router.replace('/(tabs)/feed');
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setErrorText(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

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

        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

        <PrimaryButton 
          label={loading ? "Signing in..." : "Sign In"} 
          onPress={handleSignIn} 
          disabled={!email || !password || loading} 
        />

        <Text style={styles.orText}>— or —</Text>

        <PrimaryButton label="Continue with Google" variant="secondary" onPress={() => onSelectAuth('google')} disabled={loading} />
        <PrimaryButton label="Continue with Apple" variant="secondary" onPress={() => onSelectAuth('apple')} disabled={loading} />
        
        <PrimaryButton label="Don't have an account? Sign Up" variant="secondary" onPress={() => router.replace('/(auth)/sign-up')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF7' },
  content: { paddingHorizontal: 16, gap: 12 },
  title: { color: '#2A2418', fontSize: 30, fontFamily: 'Inter_700Bold' },
  subtitle: { color: '#6E604C', fontFamily: 'Inter_400Regular', marginBottom: 4 },
  errorText: { color: '#D9534F', fontSize: 13, fontFamily: 'Inter_400Regular' },
  orText: { color: '#9A8F7D', textAlign: 'center', marginVertical: 8, fontFamily: 'Inter_400Regular' },
});
