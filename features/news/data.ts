'use client';

type NewsItem = {
  time: string;
  date: Date;
  icon: string;
  content: string;
};

const monthMap: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const parseNewsDate = (raw: string): Date => {
  const cleaned = raw
    .toLowerCase()
    .replace(/(\d+)(st|nd|rd|th)/g, '$1')
    .replace(/,/g, '')
    .trim();

  const tokens = cleaned.split(/\s+/);
  let month = 0;
  let day = 1;
  let year: number | null = null;

  for (const token of tokens) {
    if (token in monthMap) {
      month = monthMap[token];
    } else if (/^\d{1,2}$/.test(token)) {
      day = parseInt(token, 10);
    } else if (/^\d{4}$/.test(token)) {
      year = parseInt(token, 10);
    }
  }

  if (year === null) {
    return new Date(NaN);
  }

  return new Date(year, month, day);
};

const rawNews: Omit<NewsItem, 'date'>[] = [
  {
    time: 'June 2026',
    icon: 'nf-fa-briefcase',
    content:
      'Officially started working at Netcompany as a Fresher Manual Tester.',
  },
  {
    time: 'July 2025',
    icon: 'nf-fa-map',
    content:
      'Vietnam underwent an administrative reorganization. Hoi An City was merged with Da Nang City, becoming a ward within Da Nang.',
  },
  {
    time: 'September 2022',
    icon: 'nf-fa-school',
    content:
      'Graduated from University of Science, VNU-HCM with a Bachelor of Computer Science.',
  },
  {
    time: 'June 2022',
    icon: 'nf-fa-graduation_cap',
    content: 'Graduated from Le Thanh Tong High School for the Gifted.',
  },
  {
    time: 'April 9th 2004',
    icon: 'nf-fa-cake_candles',
    content: 'Born in Hoi An City, Central Vietnam.',
  },
];

export const news: NewsItem[] = rawNews
  .map((item) => ({ ...item, date: parseNewsDate(item.time) }))
  .sort((a, b) => b.date.getTime() - a.date.getTime());
