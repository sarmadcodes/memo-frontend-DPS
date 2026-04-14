import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import PrimaryButton from '../../../components/ui/PrimaryButton';

export default function Screen() {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 500 });
    opacity.value = withTiming(1, { duration: 500 });
  }, [opacity, scale]);

  const iconStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24 + insets.bottom }]}>
      <View style={styles.centerWrap}>
        <Animated.View style={[styles.checkWrap, iconStyle]}>
          <Feather name="check" size={30} color="#FFF8EA" />
        </Animated.View>
        <Text style={styles.title}>You're all set</Text>
        <Text style={styles.subtitle}>Your quiet space is ready. Start writing when you're ready.</Text>
      </View>

      <PrimaryButton label="Start writing" onPress={() => router.replace('/(tabs)/feed')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF7',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  checkWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2D261A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#2A2418',
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    color: '#6E604C',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
});
