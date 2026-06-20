# Design Guidelines

The visual + interaction language for this site. Every change that touches the chrome of a page should follow these guidelines.

---

## 1. Identity

The site is a **personal playground** styled as a well-riced i3 desktop. The prompt `tuan@dat:~/playground $` is the brand mark — there is no separate logo, no wordmark, no mascot. The header IS the identity.

**Voice:** opinionated, technical, restrained. Mono everywhere, one accent, terminal chrome. We're not doing "playful" or "soft" — we're doing "ricer's terminal that's also a portfolio."

**Don't** introduce a second brand mark, a hero illustration, a marketing-tone microcopy. If a section feels like it could be on a SaaS landing page, it doesn't belong here.

---

## 2. Typography

Three roles, three families, three weights.

| Role          | Family         | Weight                        | Used for                                                         |
| ------------- | -------------- | ----------------------------- | ---------------------------------------------------------------- |
| **Display**   | JetBrains Mono | 700                           | Page H1s (`~/news.log`, `~/resume.pdf`, `~/roadmap.md`), hero H1 |
| **Body / UI** | JetBrains Mono | 400 (default), 500 (emphasis) | All paragraphs, buttons, nav, labels, card body, directory rows  |
| **Quote**     | Fraunces       | 400 italic                    | ONLY the Avicii quote on the landing page                        |

**Implementation:**

- Both JetBrains Mono and Fraunces are loaded via `next/font/google` in their respective files.
- Display class: `font-display` (defined in `app/globals.css`, currently mapped to JetBrains Mono 700).
- Quote class: `font-quote` (defined in `app/globals.css`, mapped to Fraunces via `--font-quote` set in `components/landing/quote.tsx`).
- The legacy Inter / Geist / Geist Mono / Lora imports have been removed. Do not reintroduce them.

**Rules:**

- Never use Fraunces outside the Avicii quote.
- Never use a non-mono font for body, UI, nav, or buttons.
- Bold is rare. Use `font-bold` only for the H1 and the monogram profile card's name line.
- Tracking: `tracking-tighter` on the H1s only.

---

## 3. Color

**One accent: Mauve.** It is the only color that signals "this is the current thing" — active nav, hover underline, hero glow word, "primary" buttons, focus ring, terminal pane title bars, and the polybar username.

Other Catppuccin colors are **categorical, not decorative**:

| Token             | Mocha hex  | Latte hex  | Used for                                                              |
| ----------------- | ---------- | ---------- | --------------------------------------------------------------------- |
| `--mauve`         | `#cba6f7`  | `#8839ef`  | The single accent (see above)                                         |
| `--cat-sapphire`  | `#74c7ec`  | `#209fb5`  | `programming` directory row                                           |
| `--mauve` (reuse) | —          | —          | `art-and-design` directory row                                        |
| `--cat-peach`     | `#fab387`  | `#fe640b`  | `languages` directory row                                             |
| `--cat-green`     | `#a6e3a1`  | `#40a02b`  | `sports` directory row, `● online` status dot                         |
| `--cat-red`       | `#f38ba8`  | `#d20f39`  | `music` directory row                                                 |
| `--cat-yellow`    | `#f9e2af`  | `#df8e1d`  | `games` directory row                                                 |
| (kanban tokens)   | per column | per column | Status color circles on roadmap cards (already wired in `kanban.tsx`) |

**Rules:**

- Each non-mauve categorical color appears **at most once per page** (excluding kanban column colors, which are status-driven).
- Never use a categorical color for buttons, links, borders, or icons.
- Never use a multi-color icon system.
- Forbidden: purple gradients on white, the default shadcn-vega neutral ramp, rainbow palettes.

**Theming.** All four themes are kept (`light`, `dark`, `catppuccin-latte`, `catppuccin-mocha`). The site defaults to **Catppuccin Mocha** but is themeable via the polybar's theme pill. The Mauve mapping must remain consistent across all four themes — see `app/globals.css` for token values.

**Surfaces** in Mocha:

- `--background` = `#1e1e2e` (base, e.g. page body)
- `--card` = `#181825` (terminal pane surface)
- `--border` = `#45475a` (1px hairlines)
- Kanban cards "float" on the surface: card bg = `--background`, card border = `--border`, pane bg = `--card`.

---

## 4. Motion

One orchestrated motion language. The goal is "a clean scrollback," not "a dashboard."

**Allowed:**

- **Page-load stagger** (Landing only): hero text → 2 lines per 80ms stagger, then sections fade-up. See `components/landing/hero.tsx`.
- **Underline draw-in** (200ms ease-out, Mauve): nav links on hover/active. See `.nav-underline` in `app/globals.css`.
- **Border tint** (150ms): cards (kanban, terminal panes, directory rows) shift border to Mauve on hover.
- **1–2px lift** (150ms): card hover translates `y: -2px`.
- **Theme cross-fade** (400ms via View Transitions API): the existing view-transition pair in `app/globals.css`.
- **Theme pill icon swap** (150ms): `AnimatePresence` cross-fade with 45° rotate.
- **Directory panel expand** (200ms): height + opacity transition (framer-motion).
- **Blinking `$` prompt** (1s): CSS `animate-pulse` on the polybar.

**Forbidden:**

- Parallax, scroll-jacking, scroll-triggered reveals.
- Marquees, tickers, auto-playing carousels.
- Spring/bounce on layout elements.
- `whileHover={{ scale: ... }}` on buttons or links. (The previous `theme-switcher-button.tsx` had this — it is gone.)
- Anything that fires repeatedly without user input.

**Reduced motion.** The existing `prefers-reduced-motion` block in `app/globals.css` neutralizes CSS transitions and animations. framer-motion respects it via `useReducedMotion()`. New framer-motion animations should check `useReducedMotion()` and pass `undefined` for `animate`/`transition` to skip the effect. CSS animations are already covered globally.

---

## 5. The polybar (global header)

Two strips, 80px total, fixed at the top, opaque (no backdrop blur).

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  tuan@dat:~/playground $                                       [Mocha] 14:23 ● online │  <- 32px, bg-card
├──────────────────────────────────────────────────────────────────────────────┤
│  home   news   resume   roadmap                                                   │  <- 48px, bg-background
└──────────────────────────────────────────────────────────────────────────────┘
```

- **Top strip (`bg-card`):**
  - Left: `tuan@dat:~/playground $` in mono, Mauve on `tuan`, `dat`, `$`; muted on `@`, `:`; foreground on `~`, `/playground`. The `$` blinks via `animate-pulse`.
  - Right: theme pill (Lucide icon + theme name, click opens a listbox), `<time>` HH:MM (updates every 30s), `● online` (Green dot + "online" in muted).
- **Nav strip (`bg-background`):**
  - Four mono nav links. Active = Mauve text + 2px Mauve bottom border. Hover = Mauve text + underline draws in.
- Implementation: `components/global/polybar.tsx`. Do not inline polybar logic in pages.

**`<main>` padding:** must be `pt-20` (80px) to clear the polybar.

---

## 6. Terminal pane pattern

Any "card" or content block follows this structure:

```tsx
<div className="bg-card border-border overflow-hidden rounded-lg border">
  <div className="border-border text-mauve flex items-center border-b px-4 py-2 font-mono text-xs tracking-wider uppercase">
    <span>~/section-name</span>
  </div>
  <div className="px-6 py-6 ...">{/* content */}</div>
</div>
```

- Outer wrapper: `bg-card border border-border overflow-hidden rounded-lg`.
- Title bar: `border-b` divider, `text-mauve` label, mono uppercase `text-xs tracking-wider`, `px-4 py-2`.
- Body: `px-6 py-6` (or `px-6 py-8 sm:px-10 sm:py-10` for spacious sections like the quote).
- File label: prefix with `~/` and use a `.md` / `.log` / `.pdf` extension. The label is part of the visual identity, not a description of the content.

**Examples in code:**

- `components/landing/about.tsx` — `~/about.md`
- `components/landing/directory.tsx` — `~/interests/`
- `components/resume/resume.tsx` — `DoPhanTuanDat_CV.pdf` (left of title bar) + action buttons (right)
- `components/kanban-board/column.tsx` — uppercase status name (e.g. `BACKLOG`, `IN PROGRESS`)

**Don't:**

- Use `shadow-lg` or any heavy drop-shadow.
- Use the shadcn `<Card>` component for new sections — its padding/gap system fights the terminal pane aesthetic. The shadcn Card is still used inside the kanban (for `KanbanBoardCardTitle` / `Description`), but new top-level sections should be built directly.
- Put a colored gradient or image background on a terminal pane.

---

## 7. Directory listing pattern (`~/interests/` and similar)

Use this when a list of "categories" needs to be displayed and each can be opened to reveal items.

```
drwxr-xr-x   programming          →  5 items
drwxr-xr-x   art-and-design       →  4 items
...
```

- Each row is a `<button>` with `aria-expanded` + `aria-controls`.
- Row layout: a small mono `<ChevronRight>` (rotates 90° when open) + `drwxr-xr-x` (mono, muted) + a colored square swatch (2×2, rounded) + category slug (mono, foreground) + flex-1 spacer + `→  N items` (mono, muted).
- Expanded panel slides down with framer-motion `AnimatePresence` + height/opacity transition. The panel has a 2px left border in the row's accent color.
- Items inside: mono bullets with a `~` prefix; items with URLs become `<a target="_blank">`; items without are `<span>`.
- Reference: `components/landing/directory.tsx`.

---

## 8. Page archetypes

### Landing (`/`)

Sections, top to bottom, each separated by 96px (`gap-24`):

1. **Hero** — 2-col grid (`md:grid-cols-[1fr_auto]`): left = `Hero` (display H1 + glow + sub-line), right = `Monogram` (terminal-window profile card). Collapses to 1-col on mobile.
2. **Quote** — `<Quote>` terminal pane, Fraunces italic.
3. **About** — `<AboutMe>` terminal pane, mono body, single "My Resume" button.
4. **Directory** — `<Directory>` terminal pane, 6 expandable rows.
5. **Footer** — `<Footer>` mono line, `tuan@dat · made with next.js + catppuccin · © {year}`.

### News (`/news`)

- H1 in display font: `~/news.log`.
- Comment line below: `# {n} entries · sorted newest first` (mono muted).
- Single-column flat list of entries, each with: date (mono muted, tabular-nums, `w-20`), Mauve `●` bullet, content (mono foreground).
- Each row has `border-l-2 border-border hover:border-mauve pl-4 py-3`. 32px vertical gap.
- Reference: `components/news/news-log.tsx`.

### Resume (`/resume`)

- H1: `~/resume.pdf`.
- Comment: `# embedded · click open for full screen`.
- Terminal-framed iframe (80vh). Title bar shows the file name on the left and two `Button variant="ghost" size="xs"` on the right: `Download` icon + `download` text, `ExternalLink` icon + `open` text.
- Reference: `components/resume/resume.tsx`.

### Roadmap (`/roadmap`)

- H1: `~/roadmap.md`.
- Comment: `# {total} items · last updated {YYYY-MM-DD}` where `total` is derived from data.
- Kanban with 4 columns, each in a terminal pane:
  - Title bar: mono uppercase status name (Mauve) with a Nerd Font status glyph (`nf nf-oct-circle` / `nf nf-md-progress_clock` / `nf nf-md-eye` / `nf nf-oct-check`).
  - Card count on the right.
  - Body: cards.
- Cards: `bg-background border border-border rounded-lg`, mono body, hover: border tints Mauve, `translate-y-[-2px]`.
- The kanban dnd core (`components/kanban.tsx`) and its accessibility wiring are NOT to be modified.

---

## 9. Class & token quick reference

| Want                    | Use                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Display H1 (page title) | `font-display text-foreground text-3xl tracking-tighter sm:text-4xl`                                                                        |
| Hero H1                 | `font-display text-foreground text-4xl leading-[1.1] font-bold tracking-tighter sm:text-5xl lg:text-6xl`                                    |
| Mono body paragraph     | `font-mono text-sm leading-relaxed text-foreground`                                                                                         |
| Terminal pane           | `bg-card border-border overflow-hidden rounded-lg border`                                                                                   |
| Terminal pane title bar | `border-border text-mauve flex items-center border-b px-4 py-2 font-mono text-xs uppercase tracking-wider`                                  |
| Terminal pane body      | `px-6 py-6` (or `px-6 py-8 sm:px-10 sm:py-10` for spacious)                                                                                 |
| Nav link                | `nav-underline text-foreground hover:text-mauve px-3 py-1.5 transition-colors` (+ `text-mauve` and `data-active="true"` when active)        |
| Mauve text              | `text-mauve`                                                                                                                                |
| Mauve border on hover   | `hover:border-mauve`                                                                                                                        |
| Theme pill button       | `<Button variant="ghost" size="xs" className="h-6 gap-1.5 px-2 font-mono text-xs">`                                                         |
| News log row            | `hover:border-mauve border-l-2 border-border pl-4 py-3 transition-colors`                                                                   |
| Kanban card             | `border-border bg-background text-foreground hover:border-mauve ... rounded-lg border p-3 ... font-mono text-sm ... hover:-translate-y-0.5` |
| Status dot (online)     | `bg-cat-green inline-block size-1.5 rounded-full`                                                                                           |

All of these utility classes resolve to CSS variables defined in `app/globals.css` — no inline `style={{}}` color values, no raw hex codes in component files.

---

## 10. Adding a new page

1. Create `app/<route>/page.tsx` (1 line: `import Foo from '@/features/<route>/page'; export default Foo;`).
2. Create `features/<route>/page.tsx` and `features/<route>/data.ts` (data + composition).
3. Compose the page using the archetypes above. Always start with an H1 in display font using the file-label convention (`~/filename.ext`).
4. If the page needs a terminal pane section, follow §6.
5. If you need a directory listing, follow §7.
6. If you need a kanban or other complex surface, do NOT duplicate `kanban.tsx` — extend it or create a sibling in `components/<feature>/`.
7. Add a link to the page in the polybar's `navLinks` array (`components/global/polybar.tsx`) — keep it mono, lowercase, no spaces.
8. Run `pnpm build` to confirm static export still passes.

---

## 11. Adding a new shadcn component

`npx shadcn@latest add <component>` is allowed but:

- The default shadcn-vega neutral palette will not match the site. Use semantic tokens (`bg-card`, `text-mauve`, `text-muted-foreground`, `border-border`) — never raw colors.
- For buttons specifically, the shadcn button already supports `variant="default" | "outline" | "ghost" | "destructive"` and `size="xs" | "sm" | "default" | "lg" | "icon"`. The default variant resolves to Mauve `--primary` automatically — no need to recolor.
- If a new component is large or opinionated (e.g. `Dialog`, `Sheet`, `Combobox`), check first whether a custom Tailwind block would be simpler and more on-brand. The shadcn ecosystem tends toward rounded, shadowed, neutral surfaces that fight the terminal aesthetic.

---

## 12. Don'ts (hard rules)

- ❌ No purple gradients on white.
- ❌ No multi-color icon systems.
- ❌ No logo or wordmark in the header.
- ❌ No "click here" / "learn more" marketing copy. Buttons are imperative and short: `My Resume`, `download`, `open`.
- ❌ No emoji in copy or icons (Catppuccin already has the palette — use Mauve).
- ❌ No `font-sans` (Inter) — JetBrains Mono IS the sans.
- ❌ No raw `oklch(...)` / hex / `#rrggbb` colors in component files. Use the tokens from §9.
- ❌ No new pages that don't have a `~/filename.ext` H1 in the display font.
- ❌ No `whileHover={{ scale }}` on interactive elements.
- ❌ No `backdrop-blur` on the polybar.
- ❌ No removal of the four-theme switcher. All themes must remain selectable; Mocha is just the default.
- ❌ No new dependencies unless absolutely necessary. The current stack covers everything.

---

## 13. Files to know

- `app/globals.css` — color tokens, font variables, motion keyframes, `.nav-underline` utility. Single source of truth for the visual language.
- `app/layout.tsx` — fonts, default theme init, polybar mount.
- `components/global/polybar.tsx` — global header (top strip + nav strip + theme pill + clock + status).
- `components/providers/theme-provider.tsx` + `components/providers/themes.ts` — theme switching infrastructure. Do not modify.
- `components/kanban.tsx` — kanban dnd core. Do not modify.
