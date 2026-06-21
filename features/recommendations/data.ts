import {
  Recommendation,
  type RecommendationType,
} from '../../types/mimic-file-system';

export const recommendations: Recommendation[] = [
  {
    id: 'asus-tuf-f16',
    name: 'ASUS TUF Gaming F16 (2025)',
    type: 'irl-tool',
    tags: ['gaming', 'laptop'],
    description: 'High-performance gaming laptop with cutting-edge technology.',
    reason:
      'Excellent performance and durability. Good cooling system and build quality. A bit less portable due to size.',
    link: 'https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-f16-2025/',
  },
  {
    id: 'ms-powertoys',
    name: 'Microsoft PowerToys',
    type: 'app',
    tags: ['productivity', 'utilities'],
    description: 'A set of utilities for power users to maximize productivity.',
    reason: 'Great for customizing and improving the Windows experience.',
    link: 'https://learn.microsoft.com/en-us/windows/powertoys/',
    platform: ['windows'],
  },
  {
    id: 'winhawk',
    name: 'WinHawk',
    type: 'app',
    tags: ['utilities', 'customization'],
    description:
      'A collection of tools for customizing and enhancing the Windows experience.',
    reason:
      'Helpful for making the most of Windows features and improving productivity, as well as for advanced customization and personalization.',
    link: 'https://windhawk.net/',
    platform: ['windows'],
  },
  {
    id: 'razer-blackshark-v2',
    name: 'Razer BlackShark V2',
    type: 'irl-tool',
    tags: ['gaming', 'headset'],
    description:
      'A high-quality gaming headset with excellent sound and comfort.',
    reason:
      'Good price-to-performance ratio. Surround sound supports immersive gaming experiences and long gaming sessions. Earcups stays comfortable after 3 years of daily use.',
    link: 'https://www.razer.com/mena-en/gaming-headsets/razer-blackshark-v2',
  },
  {
    id: 'hoian-danang',
    name: 'Hoi An Ward, Da Nang City, Vietnam',
    type: 'place',
    tags: ['travel', 'culture'],
    description:
      'A historic town in central Vietnam known for its well-preserved architecture and cultural heritage.',
    reason:
      'My hometown. Beautiful architecture and rich cultural history. Less traffic so less noise and pollution. Good for a short trip from Da Nang City.',
    link: 'https://en.wikipedia.org/wiki/H%E1%BB%99i_An_(city)',
  },
  {
    id: 'umamusume',
    name: 'Umamusume: Pretty Derby',
    type: 'game',
    tags: ['gaming'],
    description:
      'Game where players train and compete with anime characters based on real horses.',
    reason: 'Cute anime girls + horse racing.',
    link: 'https://store.steampowered.com/app/3224770/Umamusume_Pretty_Derby/',
    platform: ['cross-platform'],
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    type: 'app',
    tags: ['programming'],
    description:
      'Open source agent that helps you write code in your terminal, IDE, or desktop.',
    reason: 'Open source and cheaper alternative to popular agent tools.',
    link: 'https://opencode.ai',
  },
  {
    id: 'wallpaper-theme-converter',
    name: 'Wallpaper Theme Converter',
    type: 'website',
    tags: ['utilities'],
    description: 'A webpage that converts any image to any colour palette.',
    reason:
      "Open source tool. Useful for customizing your device's appearance with your favorite images.",
    link: 'https://notneelpatel.xyz/WallpaperThemeConverter/',
  },
  {
    id: 'virustotal',
    name: 'VirusTotal',
    type: 'website',
    tags: ['security', 'utilities'],
    description:
      'A website that analyzes files and URLs for viruses and other malicious content.',
    reason:
      'Free and easy to use. Useful for quickly checking the safety of files and links.',
    link: 'https://www.virustotal.com/gui/home/upload',
  },
];

export interface RecommendationGroup {
  type: RecommendationType;
  items: Recommendation[];
}

export function groupByType(items: Recommendation[]): RecommendationGroup[] {
  const map = new Map<RecommendationType, Recommendation[]>();
  for (const item of items) {
    const list = map.get(item.type) ?? [];
    list.push(item);
    map.set(item.type, list);
  }
  const groups: RecommendationGroup[] = Array.from(map, ([type, list]) => ({
    type,
    items: list.sort((a, b) =>
      a.id.localeCompare(b.id, undefined, { sensitivity: 'base' }),
    ),
  }));
  groups.sort((a, b) =>
    a.type.localeCompare(b.type, undefined, { sensitivity: 'base' }),
  );
  return groups;
}

export function typeCount(items: Recommendation[]): number {
  return new Set(items.map((i) => i.type)).size;
}
