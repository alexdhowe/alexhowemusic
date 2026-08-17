# Alexander Howe — artist site

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

Name it `alexanderhowe.com` if you plan to buy that domain, or
`alexander-howe-music` if not. Don't add a README — this folder has one.

Then, from inside this folder:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git && git branch -M main && git push -u origin main
```

### 2. Turn on GitHub Pages

In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `root` → Save.**

Wait about a minute. Your site is live at
`https://YOUR-USERNAME.github.io/YOUR-REPO/`.

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

Drop a photo at **`assets/img/hero.jpg`** and it replaces the blue "AH" block
automatically. No code change needed.

- Portrait orientation works best (the frame is 4:5).
- Resize it to about **1000px wide** before adding it, and keep it under
  ~400KB. A 9MB phone photo will make the page slow to load on mobile data.
  Preview on a Mac: open the image, **Tools → Adjust Size**, then
  **File → Export** and drag quality to ~70%.

For the link preview when someone shares the site (iMessage, Facebook), add a
second image at `assets/img/og-image.jpg`, landscape, 1200×630.

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

The only thing here that isn't free. If you buy `alexanderhowe.com`:

1. Repo **Settings → Pages → Custom domain** → enter it → Save.
2. At your registrar, add these DNS records:

   | Type | Name | Value |
   |------|------|-------|
   | A | @ | `185.199.108.153` |
   | A | @ | `185.199.109.153` |
   | A | @ | `185.199.110.153` |
   | A | @ | `185.199.111.153` |
   | CNAME | www | `YOUR-USERNAME.github.io` |

3. Back in Pages, tick **Enforce HTTPS** once it becomes available
   (can take a few hours — this is normal, don't panic).

---

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
`:root` block. Change `--acid`, `--flame`, or `--cobalt` there and the whole
site follows.

The look is built on screen-printed gig-poster logic: flat color, hard edges,
and offset shadows that shift on hover like slightly misregistered ink. There
are deliberately no gradients, rounded cards, or soft drop shadows.
