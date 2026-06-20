import { basePath } from '@/components/global/constants';
import { Button } from '@/components/ui/button';

export const AboutMe = () => {
  return (
    <div className="bg-card border-border overflow-hidden rounded-lg border">
      <div className="border-border text-mauve flex items-center border-b px-4 py-2 font-mono text-xs tracking-wider uppercase">
        <span>~/about.md</span>
      </div>
      <div className="space-y-4 px-6 py-6 font-mono text-sm sm:px-8 sm:py-8">
        <h2 className="text-foreground text-xl font-bold sm:text-2xl">
          Đỗ Phan Tuấn Đạt
        </h2>
        <p className="text-foreground/90 leading-relaxed">
          I grew up in Da Nang city, Vietnam, so I&apos;m as Vietnamese as it
          gets. I moved to Ho Chi Minh city initially for University, but I
          ended up finding a job and will probably spend even more time here
          than I have in Da Nang. I will soon graduate from University of
          Science, VNU-HCM with a Bachelor&apos;s degree in Information
          Technology. My original plan was to become a software developer, but
          during my study at university, I realized I was more interested in
          messing with completed software projects than building new ones, so I
          am now focusing on software testing and quality assurance. I am
          excited to see where my career will take me in the future.
        </p>
        <div className="pt-2">
          <Button asChild variant="default" size="sm">
            <a href={`${basePath}/resume`}>
              My Resume <span aria-hidden>&rarr;</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
