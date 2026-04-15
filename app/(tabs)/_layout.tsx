import { Tabs } from 'expo-router';
import BottomTabBar from '../../components/layout/BottomTabBar';

export default function TabsLayout() {
	return (
		<Tabs
			tabBar={(props) => <BottomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen name="feed" options={{ title: 'Home' }} />
			<Tabs.Screen name="explore" options={{ title: 'Explore' }} />
			<Tabs.Screen name="create" options={{ title: 'Create' }} />
			<Tabs.Screen name="recaps" options={{ title: 'Recaps' }} />
			<Tabs.Screen name="profile" options={{ title: 'Profile' }} />
		</Tabs>
	);
}
