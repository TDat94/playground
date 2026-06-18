import type { BoardData } from '~/types/kanban';

export const roadmap: BoardData = [
  {
    id: 'Backlog',
    color: 'gray',
    cards: [
      {
        id: 'backlog-ittools',
        title: 'Add IT tools section',
        description: 'Create a /ittools route with many useful tools.',
      },
      {
        id: 'backlog-recommendations',
        title: 'Recommendations page',
        description:
          'Implement the recommendations page, which is a dedicated section for showcasing recommended materials.',
      },
    ],
  },
  {
    id: 'Planned',
    color: 'blue',
    cards: [
      {
        id: 'planned-app-router',
        title: 'Migrate to App Router fully',
        description:
          'Audit the project and move any remaining pages-router patterns to the App Router.',
      },
    ],
  },
  {
    id: 'In Progress',
    color: 'yellow',
    cards: [],
  },
  {
    id: 'Completed',
    color: 'green',
    cards: [
      {
        id: 'completed-news',
        title: 'News timeline',
        description:
          'News page with a timeline of notable moments in life. Dynamically compute gaps between items to compress distant events and let recent ones breathe.',
      },
      {
        id: 'completed-theme',
        title: 'Theme switcher polish',
        description:
          'Smooth transitions between themes. Persist last selected theme in localStorage.',
      },
      {
        id: 'completed-kanban',
        title: 'Build a Kanban roadmap page',
        description:
          'Read-only board that mirrors what is planned, in progress, and recently shipped.',
      },
      {
        id: 'completed-catppuccin',
        title: 'Set up Catppuccin themes',
        description:
          'Add Catppuccin Latte and Mocha as first-class theme options alongside light and dark.',
      },
      {
        id: 'completed-gh-pages',
        title: 'Configure GitHub Pages deployment',
        description:
          'Static export with the correct basePath, unoptimized images, and a working 404 fallback.',
      },
      {
        id: 'completed-landing',
        title: 'Polish landing page',
        description:
          'Quote section, greeting, about, and interests sections rendered with consistent spacing and typography.',
      },
    ],
  },
];
