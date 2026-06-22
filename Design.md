# ANF Design System

## Color Palette

| Token         | CSS Variable              | Value                    | Usage                  |
|---------------|---------------------------|--------------------------|------------------------|
| Primary       | `--primary`               | `oklch(0.6357 0.1775 147.02)` | Buttons, links, active states |
| Primary-foreground | `--primary-foreground` | `oklch(0.982 0.018 155.826)` | Text on primary bg |
| Background    | `--background`            | `oklch(1 0 0)`           | Page background        |
| Foreground    | `--foreground`            | `oklch(0.141 0.005 285.823)` | Body text            |
| Muted         | `--muted`                 | `oklch(0.967 0.001 286.375)` | Subtle backgrounds |
| Border        | `--border`                | `oklch(0.92 0.004 286.32)`   | Borders, dividers   |
| Card          | `--card`                  | `oklch(1 0 0)`            | Card backgrounds      |
| Ring          | `--ring`                  | `oklch(0.6357 0.1775 147.02)` | Focus rings          |

### Tailwind Shortcuts
- `bg-primary` / `text-primary-foreground` / `border-border`
- Emerald-500/600/700 for accents, green-50/100 for subtle backgrounds.

## Typography

- **Font (Latin):** Poppins (via Google Fonts) — weights 400, 500, 600, 700
- **Font (Bengali):** Hind Siliguri — class `.font-bangla`
- **Base:** `text-sm` (14px) on body, `text-base` (16px) for larger screens
- **Headings:** `text-lg`/`text-xl`/`text-2xl`/`text-3xl` with `font-semibold` or `font-bold`

## Spacing

- Page padding: `px-4 sm:px-6`
- Section gap: `space-y-12 md:space-y-16`
- Container: `container mx-auto`
- Border radius: `rounded-xl` for cards, `rounded-lg` for inputs, `rounded-full` for pills

## Component Conventions

### Buttons
- Primary: `bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg`
- Ghost: `hover:bg-accent hover:text-accent-foreground`
- Icon: `size-9` with flex centering

### Cards
- `bg-card text-card-foreground rounded-xl border border-border shadow-sm`
- Hover: `hover:shadow-md hover:border-primary/20`

### Inputs
- `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs`
- Focus: `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]`

### Sheet (Drawer)
- Trigger: Icon button with `hover:bg-accent`
- Content: `w-full sm:max-w-md p-0`
- Header: `p-6 pb-0`
- Body: `p-6 pt-4`

## Internationalization

- Use `useTranslations("Namespace")` from `next-intl`
- Messages stored in `messages/{locale}.json`
- Namespaces: `Auth`, `Navbar`, `HomePage`, `Programs`, `Common`
- String keys are camelCase (e.g. `emailLabel`, `loginButton`)
- Bengali font class `font-bangla` for Bengali text

## Auth Components

- AuthSheet: Slide-in drawer (right side) triggered by user icon
- Two modes: "login" and "register", toggled via tabs
- Form fields use Label + Input pattern from shadcn
- Submit button shows loading state via `isLoading` + `Loader2` spinner
- Validation handled client-side before API call

## Best Practices

- Always use `cn()` utility from `@/lib/utils` for conditional classes
- Keep components as `"use client"` when using hooks
- Import types from `@/types/` when available
- Use Lucide icons for all iconography
- Never hardcode strings; always use translation keys
- Use CSS variables (`--primary`, `--background`, etc.) rather than hardcoded colors
