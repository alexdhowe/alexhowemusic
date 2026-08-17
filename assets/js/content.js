/* ═══════════════════════════════════════════════════════════════
   ★ THIS IS THE ONLY FILE YOU NEED TO EDIT ★

   Fill in your links below, save, refresh the page. That's it.
   Anything you leave blank simply won't appear on the site —
   nothing breaks, nothing shows a placeholder.

   Rules of thumb:
     • Keep the quote marks around every value.
     • Keep the commas at the end of each line.
     • Delete whole { ... } blocks you don't want.
   ═══════════════════════════════════════════════════════════════ */

const CONTENT = {

  /* ── 1. BOOKING FORM ────────────────────────────────────────
     Sign up free at https://formspree.io  →  New Form  →  copy
     the form ID out of the endpoint they give you.

     They show you:  https://formspree.io/f/xabcdefg
     You paste:      "xabcdefg"

     Until you do, the Send button falls back to opening the
     visitor's email app addressed to you — so the site works
     right now, today, either way.                              */

  formspreeId: "",

  contactEmail: "alexdhowe@gmail.com",


  /* ── 2. LIVE VIDEOS ─────────────────────────────────────────
     Upload to YouTube (free), then grab the ID from the URL:

       https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                     └──── this bit ────┘

     Thumbnails are pulled from YouTube automatically. The video
     only loads when someone clicks it, so the page stays fast.  */

  videos: [
    // { id: "PASTE_ID_HERE", title: "Either Way",  where: "Live, 2026" },
    // { id: "PASTE_ID_HERE", title: "I Am Yours",  where: "Live, 2026" },
    // { id: "PASTE_ID_HERE", title: "Work Out",    where: "Live, 2026" },
  ],


  /* ── 3. WHERE TO LISTEN ─────────────────────────────────────
     Paste the full public URL to your artist page / profile.
     Delete any line you're not on yet.                          */

  platforms: [
    { name: "Spotify", url: "https://open.spotify.com/artist/2u2IKqVi8S3WMlwzaTtom3" },
    // { name: "Apple Music", url: "" },
    // { name: "Bandcamp",    url: "" },
    // { name: "SoundCloud",  url: "" },
  ],


  /* ── 4. UPCOMING SHOWS ──────────────────────────────────────
     Date must be YYYY-MM-DD. Past dates disappear on their own
     the morning after the show — you never have to clean up.
     `ticketUrl` is optional; leave it "" for free/no-ticket gigs. */

  shows: [
    // { date: "2026-09-12", venue: "Company Brewing", city: "Milwaukee, WI", ticketUrl: "" },
    // { date: "2026-10-03", venue: "Anodyne Coffee",  city: "Milwaukee, WI", ticketUrl: "" },
  ],


  /* ── 5. SOCIALS ─────────────────────────────────────────────
     `network` picks the icon. These five have their own:
       instagram, youtube, tiktok, facebook, spotify
     Anything else (bandcamp, soundcloud, x, threads, your own
     newsletter…) gets a clean diagonal arrow instead. That's a
     deliberate part of the design, not a missing icon — the name
     is set in huge type right next to it.

     Your email is added to the bottom of this list automatically.  */

  socials: [
    { network: "instagram", handle: "@alexdhowe", url: "https://www.instagram.com/alexdhowe/" },
    { network: "tiktok",    handle: "@adhowe",    url: "https://www.tiktok.com/@adhowe" },
    { network: "spotify",   handle: "Alex Howe",  url: "https://open.spotify.com/artist/2u2IKqVi8S3WMlwzaTtom3" },
    // { network: "youtube",  handle: "@yourchannel", url: "https://youtube.com/@yourchannel" },
    // { network: "facebook", handle: "Alex Howe Music", url: "" },
  ],

};
