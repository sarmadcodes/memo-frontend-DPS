import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export default function IndexScreen() {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.92);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 700 });
    logoScale.value = withTiming(1, { duration: 700 });
    taglineOpacity.value = withDelay(450, withTiming(1, { duration: 600 }));

    const timeout = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [logoOpacity, logoScale, taglineOpacity]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, logoStyle]}>Memo</Animated.Text>
      <Animated.Text style={[styles.tagline, taglineStyle]}>Your moments. Your story.</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logo: {
    color: '#F5F1E8',
    fontFamily: 'Lora_400Regular_Italic',
    fontSize: 46,
  },
  tagline: {
    color: '#C7C5D1',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});
