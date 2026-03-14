import type { Theme } from './types';

export const themes = {
	'ivory-gold': {
		name: 'Ivory & Gold',
		background: '#FAFAF7',
		surface: '#FFFFFF',
		primary: '#C9A84C',
		text: '#1C1917',
		textMuted: '#78716C',
		border: '#E7E5E4',
		cardBg: '#FFFFFF',
	},
	'midnight-blue': {
		name: 'Midnight Blue',
		background: '#0F0F1A',
		surface: '#1A1A2E',
		primary: '#4361EE',
		text: '#F1F5F9',
		textMuted: '#94A3B8',
		border: '#2D2D44',
		cardBg: '#1E1E35',
	},
	'sage-cream': {
		name: 'Sage & Cream',
		background: '#F5F7F2',
		surface: '#FFFFFF',
		primary: '#6E8B74',
		text: '#1F2937',
		textMuted: '#6B7280',
		border: '#DDE3DB',
		cardBg: '#FFFFFF',
	},
	'blush-rose': {
		name: 'Blush Rose',
		background: '#FFF6F7',
		surface: '#FFFFFF',
		primary: '#D36A86',
		text: '#3F2B33',
		textMuted: '#9A7783',
		border: '#F2DCE2',
		cardBg: '#FFFFFF',
	},
	'charcoal-minimal': {
		name: 'Charcoal Minimal',
		background: '#111315',
		surface: '#1A1D21',
		primary: '#9CA3AF',
		text: '#F3F4F6',
		textMuted: '#9CA3AF',
		border: '#2A2F36',
		cardBg: '#1F2329',
	},
	'forest-moss': {
		name: 'Forest & Moss',
		background: '#0F1C17',
		surface: '#162821',
		primary: '#5FA777',
		text: '#E8F3EC',
		textMuted: '#9EC2AE',
		border: '#274236',
		cardBg: '#1B3128',
	},
	'lavender-dusk': {
		name: 'Lavender Dusk',
		background: '#F5F2FF',
		surface: '#FFFFFF',
		primary: '#8B72D9',
		text: '#2F2646',
		textMuted: '#7D7398',
		border: '#E2DBF4',
		cardBg: '#FFFFFF',
	},
	'warm-paper': {
		name: 'Warm Paper',
		background: '#FBF6EC',
		surface: '#FFFDF7',
		primary: '#A66B2E',
		text: '#3A2B1B',
		textMuted: '#8A725A',
		border: '#E9DFC9',
		cardBg: '#FFFDF7',
	},
} as const satisfies Record<string, Theme>;

export type ThemeName = keyof typeof themes;

export const getTheme = (name: ThemeName): Theme => themes[name];

export const defaultTheme: ThemeName = 'ivory-gold';

