'use client';

import { Download, ExternalLink } from 'lucide-react';
import { basePath } from '@/components/global/constants';
import { Button } from '@/components/ui/button';

const PDF_PATH = `${basePath}/DoPhanTuanDat_CV.pdf`;

export const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = PDF_PATH;
    link.download = 'DoPhanTuanDat_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-card border-border overflow-hidden rounded-lg border">
      <div className="border-border flex items-center justify-between gap-2 border-b px-4 py-2">
        <span className="text-foreground font-mono text-sm">
          DoPhanTuanDat_CV.pdf
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleDownload}
            className="font-mono"
            aria-label="Download PDF"
          >
            <Download data-icon="inline-start" />
            download
          </Button>
          <Button
            variant="ghost"
            size="xs"
            asChild
            className="font-mono"
            aria-label="Open in new tab"
          >
            <a href={PDF_PATH} target="_blank" rel="noopener noreferrer">
              <ExternalLink data-icon="inline-start" />
              open
            </a>
          </Button>
        </div>
      </div>
      <div className="p-2">
        <iframe
          src={PDF_PATH}
          title="Resume PDF"
          className="bg-background h-[80vh] w-full rounded-sm"
        />
      </div>
    </div>
  );
};
