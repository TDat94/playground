export const THEMES = [
  { name: 'light', label: 'Light Mode', isDark: false },
  { name: 'dark', label: 'Dark Mode', isDark: true },
  { name: 'catppuccin-latte', label: 'Catppuccin Latte', isDark: false },
  { name: 'catppuccin-mocha', label: 'Catppuccin Mocha', isDark: true },
] as const;

export type ThemeName = (typeof THEMES)[number]['name'];

export const THEME_NAMES: ThemeName[] = THEMES.map((t) => t.name);

export const THEME_LABELS: Record<ThemeName, string> = Object.fromEntries(
  THEMES.map((t) => [t.name, t.label]),
) as Record<ThemeName, string>;

export const THEME_MODES: Record<ThemeName, 'light' | 'dark'> =
  Object.fromEntries(
    THEMES.map((t) => [t.name, t.isDark ? 'dark' : 'light']),
  ) as Record<ThemeName, 'light' | 'dark'>;

export const STORAGE_KEY = 'theme-preference';
