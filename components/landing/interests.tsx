'use client';

import { interests } from '@/features/landing/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Interests = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <h2 className="text-foreground text-2xl font-semibold tracking-tighter">
        My Interests
      </h2>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {interests.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item.name}>
                    {item.url !== '#' ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
