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


  /* ── 4. GIGS ────────────────────────────────────────────────
     One list, two places on the page:

       • The CALENDAR above the booking form shows every gig in
         the month you're looking at — played ones in rust,
         upcoming ones in gold.
       • The SHOWS list (section 03) shows upcoming gigs only.
         Past dates drop off it by themselves the morning after,
         so you never have to tidy up.

     `date` must be YYYY-MM-DD.
     `title`, `start`, `end` and `ticketUrl` are all optional —
     anything you leave out is simply left off the display.        */

  shows: [
    {
      date: "2026-08-13",
      title: "Alex Howe Live & Acoustic",
      venue: "Lion's Tail Brewery",
      city: "Wauwatosa, WI",
      start: "6:00 PM",
      end: "8:30 PM",
      ticketUrl: ""
    },
    {
      date: "2026-08-19",
      title: "Alex Howe Live & Acoustic",
      venue: "Birch / Denim Park MKE",
      city: "Milwaukee, WI",
      start: "6:00 PM",
      end: "8:30 PM",
      ticketUrl: ""
    },
  ],


  /* ── 4b. BLOCKED-OUT DATES ──────────────────────────────────
     Days you're not available. They show on the calendar as a
     hatched block so anyone browsing can see you're spoken for,
     without saying why.

     `end` is inclusive — the range below covers the 17th, 18th,
     19th AND 20th. Drop `end` for a single day.

     `label` is optional and defaults to "Unavailable". Whatever
     you put here is PUBLIC, so keep it vague unless you don't
     mind people knowing ("Out of town" is fine, "Dentist" isn't). */

  blocked: [
    { start: "2026-09-17", end: "2026-09-20" },
    { start: "2026-10-24", end: "2026-10-31" },
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
