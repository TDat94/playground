export type RecommendationType =
  | 'app'
  | 'website'
  | 'game'
  | 'artist'
  | 'song'
  | 'movie'
  | 'irl-tool'
  | 'theme'
  | 'place'
  | 'other';

export type Platform =
  | 'web'
  | 'windows'
  | 'linux'
  | 'macos'
  | 'android'
  | 'ios'
  | 'cross-platform';

export interface Recommendation {
  id: string; // unique, used for routing/state
  name: string;

  type: RecommendationType;
  tags: string[];

  description: string; // main content in window
  reason?: string; // why I personally recommend it

  link?: string; // official site / download
  platform?: Platform[];
}

export const RECOMMENDATION_TYPE_ICON: Record<RecommendationType, string> = {
  app: 'nf-md-application',
  website: 'nf-md-web',
  game: 'nf-md-gamepad_variant',
  artist: 'nf-md-account',
  song: 'nf-md-music',
  movie: 'nf-md-movie',
  'irl-tool': 'nf-md-tools',
  theme: 'nf-md-palette',
  place: 'nf-md-map_marker',
  other: 'nf-md-file-question',
};

export function getRecommendationIcon(type: RecommendationType): string {
  return RECOMMENDATION_TYPE_ICON[type];
}
