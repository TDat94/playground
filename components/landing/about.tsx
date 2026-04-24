'use client';

import { CustomButton } from '@/components/ui/custom-button';
import { basePath } from '@/components/global/constants';

export const AboutMe = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <h2 className="text-foreground text-2xl font-semibold tracking-tighter">
        About Me
      </h2>
      <h3 className="text-foreground text-xl font-medium">Đỗ Phan Tuấn Đạt</h3>
      <p className="text-md text-foreground">
        I grew up in Da Nang city, Vietnam, so I&apos;m as Vietnamese as it
        gets. I moved to Ho Chi Minh city initially for University, but I ended
        up finding a job and will probably spend even more time here than I have
        in Da Nang. I will soon graduate from University of Science, VNU-HCM
        with a Bachelor&apos;s degree in Information Technology. My original
        plan was to become a software developer, but during my study at
        university, I realized I was more interested in messing with completed
        software projects than building new ones, so I am now focusing on
        software testing and quality assurance. I am excited to see where my
        career will take me in the future.
      </p>

      {/* Portfolio and Resume Buttons */}
      <div className="flex w-full flex-wrap justify-center gap-4">
        <a href={`${basePath}/portfolio`}>
          <CustomButton>
            My Portfolio
            <span className="nf nf-fa-chevron_right" />
          </CustomButton>
        </a>
        <a href={`${basePath}/resume`}>
          <CustomButton>
            My Resume
            <span className="nf nf-fa-chevron_right" />
          </CustomButton>
        </a>
      </div>
    </div>
  );
};
