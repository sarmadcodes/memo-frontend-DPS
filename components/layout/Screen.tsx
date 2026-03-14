import { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type ScreenProps = PropsWithChildren;

export default function Screen({ children }: ScreenProps) {
	const { theme } = useTheme();

	return <SafeAreaView style={[styles.base, { backgroundColor: theme.background }]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
	base: {
		flex: 1,
	},
});

