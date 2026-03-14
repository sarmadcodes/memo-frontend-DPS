import { useThemeStore } from '../store/themeStore';
import { getTheme } from '../themes';
import type { ThemeName } from '../themes';

export const useTheme = () => {
	const themeName = useThemeStore((state) => state.themeName);
	const setThemeName = useThemeStore((state) => state.setThemeName);

	return {
		themeName,
		theme: getTheme(themeName),
		setThemeName: (name: ThemeName) => setThemeName(name),
	};
};

