# Building the site's CSS

Every page loads one stylesheet: `css/site.css`. It contains only the Tailwind CSS classes the pages actually use, and it is generated from:

- `tailwind.config.js` (the colours and font used by the site, and which files are scanned)
- `src/tailwind.css` (the Tailwind entry file)

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

Each page links the stylesheet as `/css/site.css?v=20261004`. Whenever `css/site.css` changes, change that `?v=` value on **every** page (for example to the new date, `?v=20261115`). This makes browsers download the new file instead of using an old cached copy.
