# Alex Howe — artist site

Plain HTML, CSS, and JavaScript. No build step, no framework, no npm install,
no dependencies to update. Open `index.html` in a browser and it just works.

That's deliberate: there's nothing here that can rot, expire, or start costing
money. Free to build, free to host, free to keep running.

---

## What you edit

**`assets/js/content.js`** — links, videos, shows, socials, booking form.
This is the file you'll touch 95% of the time. It's heavily commented.

**`index.html`** — your name, the tagline, the bio paragraph, and the three
bullet points in the booking section. All plain English, near the top.

Everything else (`style.css`, `main.js`) you can ignore.

---

## Getting it live — 3 steps, ~15 minutes

### 1. Put it on GitHub

Create a new **public** repo at <https://github.com/new>.

Name it `alexhowe.com` if you plan to buy that domain, or
`alex-howe-music` if not. Don't add a README — this folder has one.

Then, from inside this folder:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git && git branch -M main && git push -u origin main
```

### 2. Turn on GitHub Pages

In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `root` → Save.**

Wait about a minute. Your site is live at
**https://alexhowelive.com** (repo: alexdhowe/alexhowemusic).

From here on, every `git push` updates the live site automatically.

### 3. Hook up the booking form

The form works right now without this — it falls back to opening the visitor's
email app. But a real form converts much better, so:

1. Sign up free at <https://formspree.io> (50 submissions/month, no card).
2. Create a new form, pointed at `alexdhowe@gmail.com`.
3. They give you an endpoint like `https://formspree.io/f/xabcdefg`.
4. Open `assets/js/content.js` and set `formspreeId: "xabcdefg"`.
5. Push.

Submit the form once yourself — Formspree emails you a one-time confirmation
link the first time. Until you click it, submissions don't get delivered.

---

## Adding your stuff

### A photo

Already done — `assets/img/hero.jpg` is the cutout from your tip flyer, cropped
to the 4:5 frame and sat high so the "available for booking" sticker fills the
space at the bottom. `assets/img/og-image.jpg` (1200×630) is the matching share
preview for iMessage and Facebook.

**Note:** the crop stops well above the flyer's QR codes, so your Venmo code and
phone number are not on the site anywhere.

To swap in a different photo later, just overwrite `assets/img/hero.jpg`:

- Portrait orientation, 4:5. Around **1000px wide** and under ~400KB.
- A 9MB phone photo will make the page crawl on mobile data. On a Mac, open it
  in Preview → **Tools → Adjust Size**, then **File → Export** at ~70% quality.

If the file is ever missing or misnamed, the page falls back to the "AH" block
on its own rather than showing a broken image.

### Live videos

Your performance videos are 300–450MB each. **Don't put those in this repo** —
GitHub will reject them and hosting video is where "free" ends.

Upload them to YouTube instead (free, unlimited), then paste the video IDs into
`content.js`. The site shows the thumbnail and only loads the player when
someone actually clicks, so the page stays fast.

### Shows

Add them to `shows` in `content.js` using `YYYY-MM-DD` dates. Past dates remove
themselves automatically the morning after — you never have to clean the list
up, and the site never shows a stale gig.

With no upcoming shows, that section turns into a "no dates yet — let's fix
that" panel that points at the booking form. So it's never dead space.

---

## Making changes without the command line

On github.com, click any file → the pencil icon → edit → **Commit changes**.
The live site updates in about a minute. Good for adding a show from your phone.

---

## A custom domain (optional, ~$12/year)

**Done** — the site runs on `alexhowelive.com`, bought through Cloudflare. Recorded here in case you ever need to redo it:

Cloudflare DNS, all five records set to **DNS only** (grey cloud, not proxied —
the orange cloud causes an infinite redirect loop with GitHub Pages):

| Type | Name | Value |
|------|------|-------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |
| CNAME | www | `alexdhowe.github.io` |

The `CNAME` file in this folder is what tells GitHub which domain to answer on —
don't delete it. SSL is a free Let's Encrypt cert that GitHub renews on its own.

`www.alexhowelive.com` and the old `alexdhowe.github.io/alexhowemusic` URL both
redirect to the bare domain, so old links keep working.

## Previewing locally

Double-clicking `index.html` works fine. If you want a proper local server:

```bash
python3 -m http.server 8765 --directory .
```

Then visit <http://localhost:8765>.

If you edit a file and don't see the change, it's browser cache — hard-refresh
with **Cmd+Shift+R**.

---

## Design notes

Colors and fonts are defined once at the top of `assets/css/style.css`, in the
`:root` block. Change `--gold`, `--rust`, or `--indigo` there and the whole
site follows.

The palette is sampled from your **Turn Around** cover art — marigold, burnt
sienna, and deep indigo on warm cream — so the site and the record read as the
same person's work.

If you swap colors, two rules keep the text readable:

- text on `--rust` should be `--paper`, never `--ink`
- text on `--gold` and `--paper` should be `--ink`

The look is built on screen-printed gig-poster logic: flat color, hard edges,
and offset shadows that shift on hover like slightly misregistered ink. There
are deliberately no gradients, rounded cards, or soft drop shadows.

Every text/background pair on the site currently clears WCAG AA contrast.
