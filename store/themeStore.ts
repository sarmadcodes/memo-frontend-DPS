import { create } from 'zustand';
import { defaultTheme, getTheme } from '../themes';
import type { ThemeName } from '../themes';

type ThemeState = {
	themeName: ThemeName;
	setThemeName: (name: ThemeName) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
	themeName: defaultTheme,
	setThemeName: (themeName) => set({ themeName }),
}));

export const selectTheme = (state: ThemeState) => getTheme(state.themeName);

