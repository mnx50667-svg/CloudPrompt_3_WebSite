# Building the site's CSS

Every page loads one stylesheet: `css/site.css`. It contains only the Tailwind CSS classes the pages actually use, and it is generated from:

- `tailwind.config.js` (the colours and font used by the site, and which files are scanned)
- `src/tailwind.css` (the Tailwind entry file, which also holds the Inter `@font-face` rules)

Visitors only ever download `css/site.css`. The tools used to build it (`package.json`, `node_modules/`) are never served to them.

## When to rebuild

Rebuild `css/site.css` whenever you:

- add or change a Tailwind class in any page (for example `text-lg` or `bg-apple-blue`), or
- add a new page.

If you skip the rebuild, any new class will have no styling on the live site.

## How to rebuild

You need Node.js installed. In a terminal, inside this folder:

1. First time only: `npm install`
2. Every time: `npm run build:css`

Commit the updated `css/site.css` together with your page changes.

## Bump the version number

Each page links the stylesheet as `/css/site.css?v=20261004b`. Whenever `css/site.css` changes, change that `?v=` value on **every** page (for example to the new date, `?v=20261115`). This makes browsers download the new file instead of using an old cached copy.

## Images

Large images are served as lighter copies made by `scripts/optimize-images.js`:

| Original (kept) | Served copy |
|---|---|
| `images/hero-library.png` | `images/hero-library.webp` |
| `images/logo.png` | `images/logo-56.png` (small nav/footer icon only) |
| `images/og-image.png` | `images/og-image.jpg` (social preview, 1200px wide) |
| `images/twitter-card.png` | `images/twitter-card.jpg` (same file, correct name) |

To recreate the copies (for example after replacing an original), run `npm install` (first time only), then `npm run optimize:images`.

- Keep the original files. Old links and shared posts may still point at them, and the script needs them as its source.
- `images/logo.png` stays the logo used in the page data for Google (it must be at least 112px) and in `site.webmanifest`.
- Every `<img>` should have `width` and `height` set to the real pixel size of the file it shows.

## Fonts

The site uses the Inter font, stored in `fonts/inter/` and served from this site. The files were downloaded once from Google Fonts (Inter 400, 500, 600 and 700); the `@font-face` rules for them are at the top of `src/tailwind.css`.

- Inter is free to use under the SIL Open Font License. The licence is in `fonts/inter/OFL.txt` and must stay next to the font files.
- Do not add Google Fonts links back to the pages. Loading fonts from this site is faster and does not send visitors' requests to Google.
- Every page preloads the main (Latin) font file. If the font files are ever replaced, update that preload link on every page and the URLs in `src/tailwind.css`, then rebuild the CSS.
