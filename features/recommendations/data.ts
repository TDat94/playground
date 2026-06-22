import {
  Recommendation,
  type RecommendationType,
} from '../../types/mimic-file-system';

export const recommendations: Recommendation[] = [
  {
    id: 'yorushika',
    name: 'Yorushika / ヨルシカ',
    type: 'artist',
    tags: ['music', 'japanese'],
    description:
      'A Japanese rock duo known for their emotional and poetic lyrics, blending rock, pop, and electronic elements.',
    reason: 'Beautiful music. Nice vocals.',
    link: 'https://www.youtube.com/@nbuna',
  },
  {
    id: 'nagu',
    name: 'Nagu',
    type: 'artist',
    tags: ['digital art', 'anime'],
    description:
      'North American digital artist who specializes in anime-style illustrations and splash art.',
    reason: 'Beautiful art. Also if you know you know.',
    link: 'https://www.pixiv.net/en/users/316388/artworks',
  },
  {
    id: 'namie',
    name: 'Namie',
    type: 'artist',
    tags: ['digital art', 'anime'],
    description:
      'Australian digital artist specializing in anime-style character designs and splash art. She is well known for contributions to gacha games like Fate/Grand Order, Project SEKAI COLORFUL STAGE! Feat. Hatsune Miku, Azurlane, and Arknights.',
    reason: 'If you know you know.',
    link: 'https://www.namie.art/about',
  },
  {
    id: 'tetoris',
    name: 'Tetoris',
    type: 'song',
    tags: ['music', 'japanese', 'vocaloid'],
    description:
      'Song by Hiiragi Magnetite, with Kasane Teto as the vocalist and melody reminiscent of the original Tetris Soundtrack.',
    reason:
      'Catchy song. Makes good use of an old melody and modern vocaloid technology.',
    link: 'https://www.youtube.com/watch?v=Soy4jGPHr3g',
  },
  {
    id: 'confesison-of-rotten-girl',
    name: 'Confessions of a Rotten Girl',
    type: 'song',
    tags: ['music', 'english', 'vocaloid'],
    description:
      "Song by SAWTOWNE, with Hatsune Miku as the vocalist and melody reminiscent of Diana Boncheva's Beethoven Virus.",
    reason:
      'Addictive song. Makes good use of an old melody and modern vocaloid technology, plus Live2D for the MV.',
    link: 'https://www.youtube.com/watch?v=sV2H712ldOI',
  },
  {
    id: 'the-substance',
    name: 'The Substance',
    type: 'movie',
    tags: ['film', 'psychological horror', 'body horror', '18+'],
    description:
      'A psychological horror film about a woman who becomes consumed by her own identity.',
    reason: 'Good plot. Good visuals. Disgustingly good sound design.',
    link: 'https://www.imdb.com/title/tt17526714/',
  },
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
