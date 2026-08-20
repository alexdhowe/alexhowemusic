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

  formspreeId: "mbgrzvel",

  contactEmail: "alexdhowe@gmail.com",


  /* ── 2. LIVE VIDEOS ─────────────────────────────────────────
     Upload to YouTube (free), then grab the ID from the URL:

       https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                     └──── this bit ────┘

     Thumbnails are pulled from YouTube automatically. The video
     only loads when someone clicks it, so the page stays fast.

     Your channel: https://www.youtube.com/@alexdhowe
     Upload a performance, open it, copy the ID from the address
     bar into a line below, and delete the two leading slashes.

     The Watch section stays hidden until at least one is filled
     in, so the live site never shows an empty shelf.

     Add  vertical: true  for anything filmed on a phone held
     upright. YouTube pads those out to a wide frame with a
     darkened copy of the same shot; the flag crops that away.
     Leave it off for normal widescreen video.                  */

  videos: [
    { id: "TbYCoFNHU6M", title: "Rocket Man",            where: "Elton John \u00b7 Lion's Tail", vertical: true },
    { id: "gCDnay9MaCQ", title: "White Blank Page",      where: "Mumford & Sons \u00b7 Denim Park", vertical: true },
    { id: "WT_v72d4Nb0", title: "Fake Plastic Trees",    where: "Radiohead \u00b7 Lion's Tail",  vertical: true },
  ],


  /* ── 3. WHERE TO LISTEN ─────────────────────────────────────
     Paste the full public URL to your artist page / profile.
     Delete any line you're not on yet.                          */

  platforms: [
    { name: "Spotify",    url: "https://open.spotify.com/artist/2u2IKqVi8S3WMlwzaTtom3" },
    { name: "SoundCloud", url: "https://soundcloud.com/alexhowe" },
    // { name: "Apple Music", url: "" },
    // { name: "Bandcamp",    url: "" },
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
     `network` picks the icon. These six have their own:
       instagram, youtube, tiktok, facebook, spotify, soundcloud
     Anything else (bandcamp, x, threads, your own newsletter…)
     gets a clean diagonal arrow instead. That's a
     deliberate part of the design, not a missing icon — the name
     is set in huge type right next to it.

     Your email is added to the bottom of this list automatically.  */

  socials: [
    { network: "instagram", handle: "@alexdhowe", url: "https://www.instagram.com/alexdhowe/" },
    { network: "tiktok",    handle: "@adhowe",    url: "https://www.tiktok.com/@adhowe" },
    { network: "youtube",    handle: "@alexdhowe", url: "https://www.youtube.com/@alexdhowe" },
    { network: "spotify",    handle: "Alex Howe",  url: "https://open.spotify.com/artist/2u2IKqVi8S3WMlwzaTtom3" },
    { network: "soundcloud", handle: "alexhowe",   url: "https://soundcloud.com/alexhowe" },
    // { network: "facebook", handle: "Alex Howe Music", url: "" },
  ],

};
