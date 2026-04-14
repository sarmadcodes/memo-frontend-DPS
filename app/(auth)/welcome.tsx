import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import PrimaryButton from '../../components/ui/PrimaryButton';

export default function Screen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={['#FFF8EC', '#F6EFDF']} style={styles.container}>
      <View style={[styles.content, { paddingTop: Math.max(28, insets.top + 20), paddingBottom: 24 + insets.bottom }]}>
        <View style={styles.headWrap}>
          <Text style={styles.brand}>Memo</Text>
          <Text style={styles.title}>A space that's entirely yours</Text>
          <Text style={styles.subtitle}>Post softly. Remember deeply. Keep your story close.</Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton label="Create Account" onPress={() => router.push('/(auth)/sign-up')} />
          <PrimaryButton label="Sign In" variant="secondary" onPress={() => router.push('/(auth)/sign-in')} />

          <Pressable style={({ pressed }) => [styles.socialBtn, pressed ? styles.pressed : null]}>
            <Text style={styles.socialText}>Continue with Google</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.socialBtn, pressed ? styles.pressed : null]}>
            <Text style={styles.socialText}>Continue with Apple</Text>
          </Pressable>
        </View>

        <Text style={styles.footnote}>By continuing you agree to our Terms and Privacy Policy.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headWrap: { gap: 10, marginTop: 36 },
  brand: {
    fontSize: 34,
    color: '#2A2418',
    fontFamily: 'Lora_400Regular_Italic',
  },
  title: {
    fontSize: 34,
    color: '#2D251A',
    lineHeight: 42,
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#6A5D48',
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  actions: { gap: 10 },
  socialBtn: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2D7C0',
    backgroundColor: '#FFFCF7',
  },
  socialText: {
    color: '#3F3424',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
  footnote: {
    color: '#8A7B61',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  pressed: { opacity: 0.82 },
});
