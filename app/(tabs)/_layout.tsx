import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
	const insets = useSafeAreaInsets();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#3F2E20',
				tabBarInactiveTintColor: '#9A8F80',
				tabBarStyle: {
					height: 60 + Math.max(12, insets.bottom),
					paddingTop: 8,
					paddingBottom: Math.max(8, insets.bottom),
					backgroundColor: '#FFF9F1',
					borderTopColor: '#EDE2D3',
				},
				tabBarLabelStyle: {
					fontSize: 11,
					fontFamily: 'Inter_700Bold',
				},
			}}
		>
			<Tabs.Screen
				name="feed"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: 'Explore',
					tabBarIcon: ({ color, size }) => <Feather name="search" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: 'Create',
					tabBarIcon: ({ color, size }) => <Feather name="plus" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="recaps"
				options={{
					title: 'Recaps',
					tabBarIcon: ({ color, size }) => <Feather name="calendar" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}

