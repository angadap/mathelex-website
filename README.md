# Mathelex Website

Marketing site for [Mathelex](https://mathmagic-295.pages.dev) — a gamified CBSE/ICSE math learning app for Nursery–Class 5.

## Structure

```
mathelex-website/
├── index.html        homepage (parent/kid-facing, playful design)
├── schools.html       schools/principal-facing page (calmer, credibility-first)
├── css/
│   ├── home.css       styles for index.html
│   └── schools.css    styles for schools.html
├── js/
│   ├── home.js         behavior for index.html
│   └── schools.js      behavior for schools.html
├── _headers            Cloudflare Pages security headers (CSP, etc.)
└── README.md
```

CSS and JS are fully external — no `<style>` or inline `<script>` blocks remain in either HTML file. No inline event handlers (`onclick=`, etc.) are used; every interactive element uses a `data-open-modal` / `data-close-modal` attribute and is wired up in the matching JS file via `addEventListener`.

The Mathelex logo is embedded as base64 inside each HTML file — no external image assets required.

## Security

- `_headers` sets a Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and a restrictive Permissions-Policy — Cloudflare Pages picks this up automatically on deploy.
- `script-src` in the CSP is locked to `'self'` — no inline scripts are permitted or present.
- `style-src` allows `'unsafe-inline'` because many one-off spacing/color tweaks are still done via inline `style=""` attributes in the HTML. This is a known, deliberate trade-off — inline styles are far lower risk than inline scripts. If you want to close this gap later, those inline styles would need to move into the CSS files as utility classes.
- Form inputs are stripped of newline characters before being placed into the `mailto:` link, to prevent header-injection-style tricks in the subject/body.
- No user data is collected or stored anywhere — the "Talk to us" / "Request a demo" forms only ever open the visitor's own email client via `mailto:`.

## Deploy

Static hosting only, no build step required. Intended for Cloudflare Pages:

1. Connect this repo to a new Cloudflare Pages project
2. Build command: none
3. Build output directory: `/`
4. Deploy — `_headers` is picked up automatically

Once a custom domain (e.g. `mathelex.in`) is purchased, attach it in Cloudflare Pages settings.

## Download section (Legend tier)

The homepage's "Legend" section (`#legend`) now shows two platform cards:
- **Android** — QR code encodes the real future Play Store URL (`https://play.google.com/store/apps/details?id=in.mathmagicapp.app`). This will start working automatically the moment the app goes live on Play Store — no code change needed. The on-page button is intentionally display-only (no click-through) until then, matching the "show, don't redirect" approach used elsewhere on the site.
- **iOS** — QR code and button both link live to `https://app.mathelex.in`, the PWA iOS users add to their Home Screen. This is fully functional today.

QR source images live in `assets/qr-android.png` and `assets/qr-ios.png`. Regenerate them with the `qrcode` Python package if either destination URL ever changes.

## Contact form

The "Talk to us" / "Request a demo" modals build a `mailto:` link (opens the visitor's email client, addressed to mathelex@zohomail.in). This works without a backend. A future upgrade would replace this with a Cloudflare Function + email API for true auto-send.

## SEO

Implemented in this repo:

- **Favicon** — `favicon.ico` + PNG sizes in `assets/` (16, 32, 180 apple-touch, 192, 512), linked in both HTML `<head>`s
- **`robots.txt`** and **`sitemap.xml`** at the site root, listing both pages
- **`site.webmanifest`** for PWA-style home-screen icon support
- **Unique `<title>` and meta description** per page (previously generic)
- **Open Graph + Twitter Card tags** per page, each with its own share image (`assets/og-image.png` for the homepage, `assets/og-image-schools.png` for the schools page) — so WhatsApp/LinkedIn/Twitter link previews look intentional instead of blank

### Manual steps (need your Google/Cloudflare login — can't be done from a repo)

1. **Google Search Console**
   - Go to https://search.google.com/search-console → Add property → `mathelex.in`
   - Verify via the **DNS TXT record** method (add the TXT record Google gives you in Cloudflare DNS) — this is more reliable than HTML file upload for a Cloudflare Pages site
   - Once verified, submit `https://mathelex.in/sitemap.xml` under Sitemaps

2. **Cloudflare Web Analytics**
   - Cloudflare dashboard → your account → **Analytics & Logs → Web Analytics**
   - Add `mathelex.in` as a site (if not already tracked) — Cloudflare auto-injects the beacon at the edge, no code change needed
   - This repo's `_headers` CSP already allows `static.cloudflareinsights.com`, so the beacon won't be blocked once enabled

## Contact

mathelex@zohomail.in
