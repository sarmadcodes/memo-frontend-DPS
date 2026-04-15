import { View, Pressable, StyleSheet, Dimensions, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

export default function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  
  // Calculate a very tight, responsive gap below the bar.
  // We use `insets.bottom` but decrease it significantly to push the pill down.
  // Minimum padding is 10px on Android/older iPhones.
  const paddingBottom = Math.max(insets.bottom - 15, 12);
  
  return (
    <View style={[styles.container, { bottom: paddingBottom }]}>
      <BlurView intensity={80} tint="light" style={styles.pill}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Map icons dynamically based on route name.
          let iconName: React.ComponentProps<typeof Feather>['name'] = 'circle';
          if (route.name === 'feed') iconName = 'home';
          if (route.name === 'explore') iconName = 'search';
          if (route.name === 'create') iconName = 'plus-circle';
          if (route.name === 'recaps') iconName = 'calendar';
          if (route.name === 'profile') iconName = 'user';

          // Colors and sizing
          const color = isFocused ? '#3F2E20' : '#9A8F80';
          const isCreate = route.name === 'create';
          const activeColor = isCreate ? '#C9A84C' : color;
          const size = isCreate ? 26 : (isFocused ? 24 : 22);

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
            >
              <Feather name={iconName} size={size} color={activeColor} />
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#3F2E20',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});