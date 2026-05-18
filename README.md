# Just Real Health Facts — landing page

A single static page (`index.html`, zero dependencies, no build step) for
`justrealhealthfacts.com`.

## Deploy to Vercel

From this directory (`C:\Users\james\justrealhealthfacts`):

```
vercel login      # one-time, interactive — opens a browser
vercel --prod     # deploys; outputs a *.vercel.app URL
```

Vercel auto-detects a static site — no framework, no build command needed.

## Connect the domain

1. In the Vercel dashboard: open the project → **Settings → Domains** → add
   `justrealhealthfacts.com` (and `www.justrealhealthfacts.com`).
2. Vercel will display the exact DNS records to set. Add them at your domain
   registrar:
   - Apex `justrealhealthfacts.com` → **A** record to `76.76.21.21`
   - `www` → **CNAME** to `cname.vercel-dns.com`
   - (Or point the registrar's nameservers at Vercel — the dashboard offers this.)
3. DNS propagation usually takes minutes; allow up to 48 hours. Vercel issues
   the HTTPS certificate automatically once records resolve.

Use whatever records the Vercel dashboard shows for your project — they are
authoritative if they differ from the defaults above.
