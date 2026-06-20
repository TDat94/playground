import { Fraunces } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-quote',
  display: 'swap',
});

type QuoteProps = {
  text: string;
  attribution: string;
  fileLabel?: string;
};

export function Quote({
  text,
  attribution,
  fileLabel = '~/quote.md',
}: QuoteProps) {
  return (
    <div
      className={`${fraunces.variable} bg-card border-border overflow-hidden rounded-lg border`}
    >
      <div className="border-border text-mauve flex items-center border-b px-4 py-2 font-mono text-xs tracking-wider uppercase">
        <span>{fileLabel}</span>
      </div>
      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <blockquote className="font-quote text-foreground text-xl leading-relaxed italic sm:text-2xl">
          &ldquo;{text}&rdquo;
        </blockquote>
        <p className="text-muted-foreground mt-6 text-right font-mono text-sm">
          ~ {attribution} ~
        </p>
      </div>
    </div>
  );
}
