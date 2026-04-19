'use client';

import Link from 'next/link';
import { ThemeSwitcherButton } from './theme-switcher-button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { basePath } from './constants';

export function Header({ className }: { className?: string }) {
  const navLinks = ['About', 'Works', 'News', 'Gaming'];

  return (
    <header
      className={cn(
        'border-border bg-background/80 border-b backdrop-blur-md',
        className,
      )}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        {/* Logo and Title */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src={`${basePath}/logo.png`}
              alt="Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-foreground text-3xl font-medium">
              Tuan Dat
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden gap-8 sm:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-foreground hover:text-muted-foreground text-md font-regular transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcherButton />
      </div>
    </header>
  );
}
