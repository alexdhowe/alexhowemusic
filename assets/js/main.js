/* ═══════════════════════════════════════════════════════════════
   Site behaviour. You shouldn't need to touch this file —
   everything you'd want to change lives in content.js.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var C = (typeof CONTENT !== "undefined" && CONTENT) || {};
  var $ = function (s) { return document.querySelector(s); };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ── icons ──────────────────────────────────────────────────
     Hand-drawn from primitives so nothing renders as garbage.
     Networks without a glyph get the diagonal arrow, which is a
     deliberate part of the system rather than a missing asset.  */
  var ICONS = {
    instagram:
      '<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<circle cx="17.5" cy="6.5" r="1.35"/>',
    youtube:
      '<rect x="1.6" y="4.6" width="20.8" height="14.8" rx="4.4" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M10 8.7l6.1 3.3-6.1 3.3z"/>',
    facebook:
      '<circle cx="12" cy="12" r="10.1" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M13.5 21.6v-7.7h2.6l.4-3.1h-3V8.8c0-.9.25-1.5 1.55-1.5h1.6V4.55c-.28-.04-1.25-.12-2.38-.12-2.36 0-3.97 1.44-3.97 4.08v2.28H7.7v3.1h2.6v7.7z"/>',
    spotify:
      '<circle cx="12" cy="12" r="10.1" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
      '<path d="M7.1 9.3c3.4-.85 7-.5 9.8 1.15"/>' +
      '<path d="M7.8 12.5c2.8-.7 5.7-.4 8 .85"/>' +
      '<path d="M8.5 15.5c2.2-.5 4.4-.3 6.2.75"/></g>',
    tiktok:
      '<path d="M13.1 2.2h2.9c.25 2 1.45 3.5 3.95 3.75v2.9c-1.5.05-2.9-.4-4.05-1.2v5.9a5.35 5.35 0 1 1-5.35-5.35c.28 0 .55.02.82.06v3.02a2.4 2.4 0 1 0 1.73 2.3z"/>',
    soundcloud:
      // waveform bars rising into a cloud, drawn from primitives
      '<g fill="currentColor">' +
      '<rect x="1.4" y="11.4" width="1.5" height="5.1" rx=".75"/>' +
      '<rect x="4.4" y="9.6"  width="1.5" height="6.9" rx=".75"/>' +
      '<rect x="7.4" y="8.2"  width="1.5" height="8.3" rx=".75"/>' +
      '<rect x="10.4" y="10.2" width="1.5" height="6.3" rx=".75"/></g>' +
      '<path d="M13.6 16.5V8.5a4.7 4.7 0 0 1 2.6-.8 4.5 4.5 0 0 1 4.4 3.7 2.9 2.9 0 0 1-.8 5.1z"/>',
    email:
      '<rect x="2.2" y="4.6" width="19.6" height="14.8" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M3.2 6.2L12 13l8.8-6.8" fill="none" stroke="currentColor" stroke-width="2"/>',
    _default:
      '<path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/>'
  };

  function icon(name) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = ICONS[String(name || "").toLowerCase()] || ICONS._default;
    return svg;
  }

  /* ── hero photo (falls back to the AH block if absent) ────── */
  (function heroPhoto() {
    var box = $(".photo");
    if (!box) return;
    var src = box.getAttribute("data-photo");
    if (!src) return;
    var probe = new Image();
    probe.onload = function () {
      box.style.backgroundImage = "url('" + src + "')";
      box.classList.add("has-img");
    };
    probe.src = src;
  })();

  /* ── marquee: duplicate the track so the loop is seamless ── */
  (function marquee() {
    var track = $(".marquee__track");
    if (!track) return;
    track.innerHTML += track.innerHTML;
  })();

  /* ── videos: click-to-load facade (fast + no tracking on load) ── */
  (function videos() {
    var list = (C.videos || []).filter(function (v) { return v && v.id; });
    var grid = $("#video-grid");
    if (!grid || !list.length) return;

    $("#watch").hidden = false;

    // If every clip is phone-shot, tighten the grid so the tall cards
    // don't each take a full-width column.
    if (list.every(function (v) { return v.vertical; })) {
      grid.classList.add("video-grid--vertical");
    }

    list.forEach(function (v) {
      var card = el("article", "vid reveal" + (v.vertical ? " vid--vertical" : ""));

      var btn = el("button", "vid__frame");
      btn.type = "button";
      btn.setAttribute("aria-label", "Play " + (v.title || "video"));

      var thumb = el("img");
      thumb.src = "https://i.ytimg.com/vi/" + v.id + "/maxresdefault.jpg";
      thumb.alt = "";
      thumb.loading = "lazy";
      // maxres doesn't exist for every upload; drop to the size that always does.
      thumb.onerror = function () {
        thumb.onerror = null;
        thumb.src = "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
      };

      var play = el("div", "vid__play");
      play.innerHTML =
        '<svg viewBox="0 0 100 100" aria-hidden="true">' +
        '<circle cx="50" cy="50" r="46" fill="#E3A11B" stroke="#1C1712" stroke-width="5"/>' +
        '<path d="M40 30l30 20-30 20z" fill="#1C1712"/></svg>';

      btn.appendChild(thumb);
      btn.appendChild(play);

      btn.addEventListener("click", function () {
        var frame = document.createElement("iframe");
        frame.src = "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&rel=0";
        frame.title = v.title || "Live video";
        frame.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen";
        frame.allowFullscreen = true;
        btn.replaceWith(frame);
      });

      var meta = el("div", "vid__meta");
      meta.appendChild(el("h3", "vid__title", v.title || "Untitled"));
      if (v.where) meta.appendChild(el("p", "vid__where", v.where));

      card.appendChild(btn);
      card.appendChild(meta);
      grid.appendChild(card);
    });
  })();

  /* ── streaming platforms ──────────────────────────────────── */
  (function platforms() {
    var list = (C.platforms || []).filter(function (p) { return p && p.url; });
    var wrap = $("#platforms");
    if (!wrap || !list.length) return;

    $("#listen").hidden = false;

    list.forEach(function (p) {
      var a = el("a", "plat reveal");
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.appendChild(el("span", "plat__name", p.name || "Listen"));
      a.appendChild(el("span", "plat__arrow", "↗"));
      wrap.appendChild(a);
    });
  })();

  /* ── shows: past dates drop off by themselves ─────────────── */
  (function shows() {
    var wrap = $("#shows-list");
    if (!wrap) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var upcoming = (C.shows || [])
      .filter(function (s) { return s && s.date && s.venue; })
      .map(function (s) {
        var p = String(s.date).split("-");
        // Built from parts, not Date.parse, so the date never slips a day by timezone.
        s._d = new Date(+p[0], +p[1] - 1, +p[2]);
        return s;
      })
      .filter(function (s) { return !isNaN(s._d) && s._d >= today; })
      .sort(function (a, b) { return a._d - b._d; });

    if (!upcoming.length) {
      var empty = el("div", "shows-empty reveal");
      empty.appendChild(el("p", null, "No dates on the books yet — let's fix that."));
      var cta = el("a", "btn btn--rust", "Book a gig");
      cta.href = "#book";
      empty.appendChild(cta);
      wrap.appendChild(empty);
      return;
    }

    var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    upcoming.forEach(function (s) {
      var row = el("article", "show reveal");

      var date = el("div", "show__date");
      date.appendChild(el("span", "show__mo", MONTHS[s._d.getMonth()]));
      date.appendChild(el("span", "show__day", String(s._d.getDate())));

      var info = el("div");
      info.appendChild(el("h3", "show__venue", s.venue));
      var sub = [s.city, s.start ? s.start + (s.end ? "\u2013" + s.end : "") : null]
        .filter(Boolean).join(" \u00b7 ");
      if (sub) info.appendChild(el("p", "show__city", sub));

      row.appendChild(date);
      row.appendChild(info);

      if (s.ticketUrl) {
        var a = el("a", "show__link", "Tickets");
        a.href = s.ticketUrl;
        a.target = "_blank";
        a.rel = "noopener";
        row.appendChild(a);
      }
      wrap.appendChild(row);
    });
  })();

  /* ── month calendar ───────────────────────────────────────────
     Same `shows` data as section 03. Shows the whole month one
     day per cell, played gigs in rust and upcoming ones in gold.
     Details appear on hover, on keyboard focus, and on tap —
     phones have no hover, so the tap path is the important one. */
  (function calendar() {
    var mount = $("#calendar");
    if (!mount) return;

    var MONTHS = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
    var DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    // Built from parts so a date never slips a day by timezone.
    var gigs = (C.shows || [])
      .filter(function (g) { return g && g.date && g.venue; })
      .map(function (g) {
        var p = String(g.date).split("-");
        var d = new Date(+p[0], +p[1] - 1, +p[2]);
        return isNaN(d) ? null : { d: d, g: g };
      })
      .filter(Boolean);

    function stamp(d) { return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(); }

    var byDay = {};
    gigs.forEach(function (x) { (byDay[stamp(x.d)] = byDay[stamp(x.d)] || []).push(x); });

    // Blocked-out ranges, expanded to one entry per day so a cell
    // lookup is a single hash hit like the gigs above.
    function parseDay(str) {
      var p = String(str).split("-");
      var d = new Date(+p[0], +p[1] - 1, +p[2]);
      return isNaN(d) ? null : d;
    }

    var blocked = {};
    (C.blocked || []).forEach(function (b) {
      if (!b || !b.start) return;
      var s0 = parseDay(b.start);
      var e0 = b.end ? parseDay(b.end) : (s0 && new Date(s0));
      if (!s0 || !e0 || e0 < s0) return;
      var range = { s: s0, e: e0, label: b.label || "Unavailable" };
      var cur = new Date(s0);
      while (cur <= e0) {
        blocked[stamp(cur)] = range;
        cur.setDate(cur.getDate() + 1);
      }
    });

    var view = new Date(today.getFullYear(), today.getMonth(), 1);
    var tip = el("div", "cal__tip");
    tip.setAttribute("aria-hidden", "true");

    // Built as DOM nodes, not an HTML string, so a stray < or & in a
    // venue name typed into content.js can never break the markup.
    function details(x) {
      var frag = document.createDocumentFragment();
      if (x.g.title) {
        frag.appendChild(el("strong", "cal__tipTitle", x.g.title));
      }
      frag.appendChild(el("span", null, x.g.venue + (x.g.city ? ", " + x.g.city : "")));
      frag.appendChild(el("span", "cal__tipWhen",
        DOW[x.d.getDay()] + " " + MONTHS[x.d.getMonth()] + " " + x.d.getDate() +
        (x.g.start ? " \u00b7 " + x.g.start + (x.g.end ? "\u2013" + x.g.end : "") : "")));
      return frag;
    }

    function shortDate(d) { return MONTHS[d.getMonth()].slice(0, 3) + " " + d.getDate(); }

    function blockDetails(blk) {
      var frag = document.createDocumentFragment();
      frag.appendChild(el("strong", "cal__tipTitle", blk.label));
      frag.appendChild(el("span", "cal__tipWhen",
        shortDate(blk.s) + (blk.e.getTime() !== blk.s.getTime()
          ? " \u2013 " + shortDate(blk.e) : "")));
      return frag;
    }

    function blockLabel(blk) {
      return blk.label + ", " + shortDate(blk.s) +
        (blk.e.getTime() !== blk.s.getTime() ? " to " + shortDate(blk.e) : "");
    }

    function label(x, past) {
      return (past ? "Played: " : "Upcoming: ") +
        (x.g.title ? x.g.title + ", " : "") + x.g.venue +
        (x.g.city ? ", " + x.g.city : "") + ", " +
        MONTHS[x.d.getMonth()] + " " + x.d.getDate() +
        (x.g.start ? ", " + x.g.start + (x.g.end ? " to " + x.g.end : "") : "");
    }

    function showTip(btn, build) {
      tip.textContent = "";
      tip.appendChild(build());
      tip.classList.add("is-on");
      // Position above the cell, clamped inside the calendar box.
      var cb = mount.getBoundingClientRect();
      var bb = btn.getBoundingClientRect();
      var w = tip.offsetWidth;
      var left = bb.left - cb.left + bb.width / 2 - w / 2;
      left = Math.max(8, Math.min(left, cb.width - w - 8));
      var top = bb.top - cb.top - tip.offsetHeight - 8;
      if (top < 4) top = bb.top - cb.top + bb.height + 8;   // flip below near the top row
      tip.style.left = left + "px";
      tip.style.top = top + "px";
    }

    function hideTip() { tip.classList.remove("is-on"); }

    function render() {
      mount.innerHTML = "";
      hideTip();

      var head = el("div", "cal__head");
      head.appendChild(el("p", "cal__month",
        MONTHS[view.getMonth()] + " " + view.getFullYear()));

      var nav = el("div", "cal__nav");
      [["←", -1, "Previous month"], ["→", 1, "Next month"]].forEach(function (n) {
        var b = el("button", null, n[0]);
        b.type = "button";
        b.setAttribute("aria-label", n[2]);
        b.addEventListener("click", function () {
          view = new Date(view.getFullYear(), view.getMonth() + n[1], 1);
          render();
        });
        nav.appendChild(b);
      });
      head.appendChild(nav);
      mount.appendChild(head);

      var grid = el("div", "cal__grid");
      DOW.forEach(function (d) { grid.appendChild(el("div", "cal__dow", d)); });

      var first = new Date(view.getFullYear(), view.getMonth(), 1);
      var days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();

      for (var i = 0; i < first.getDay(); i++) grid.appendChild(el("div", "cal__day cal__day--pad"));

      var count = 0, blockedCount = 0, playedCount = 0, bookedCount = 0;
      for (var day = 1; day <= days; day++) {
        var d = new Date(view.getFullYear(), view.getMonth(), day);
        var cell = el("div", "cal__day");
        if (d.getTime() === today.getTime()) cell.classList.add("cal__day--today");
        cell.appendChild(el("span", "cal__num", String(day)));

        var blk = blocked[stamp(d)];
        if (blk) {
          blockedCount++;
          cell.classList.add("cal__day--blocked");
          // A transparent button laid over the whole cell: keeps the
          // hatch clean while still being tappable and focusable.
          var bb = el("button", "cal__block");
          bb.type = "button";
          bb.setAttribute("aria-label", blockLabel(blk));
          var bbuild = (function (b2) { return function () { return blockDetails(b2); }; })(blk);
          bb.addEventListener("mouseenter", function () { showTip(bb, bbuild); });
          bb.addEventListener("mouseleave", hideTip);
          bb.addEventListener("focus", function () { showTip(bb, bbuild); });
          bb.addEventListener("blur", hideTip);
          bb.addEventListener("click", function (e) {
            e.stopPropagation();
            if (tip.classList.contains("is-on")) hideTip(); else showTip(bb, bbuild);
          });
          cell.appendChild(bb);
        }

        (byDay[stamp(d)] || []).forEach(function (x) {
          count++;
          var past = x.d < today;
          if (past) playedCount++; else bookedCount++;
          var btn = el("button", "cal__gig " + (past ? "cal__gig--past" : "cal__gig--next"));
          btn.type = "button";
          btn.setAttribute("aria-label", label(x, past));
          btn.appendChild(el("span", null, x.g.venue));

          var build = function () { return details(x); };
          btn.addEventListener("mouseenter", function () { showTip(btn, build); });
          btn.addEventListener("mouseleave", hideTip);
          btn.addEventListener("focus", function () { showTip(btn, build); });
          btn.addEventListener("blur", hideTip);
          btn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (tip.classList.contains("is-on")) hideTip(); else showTip(btn, build);
          });
          cell.appendChild(btn);
        });

        grid.appendChild(cell);
      }

      // Trailing pads so the last row is always a full seven.
      var trail = (7 - ((first.getDay() + days) % 7)) % 7;
      for (var t = 0; t < trail; t++) grid.appendChild(el("div", "cal__day cal__day--pad"));

      mount.appendChild(grid);

      // Only key what's actually on screen this month — a Played swatch
      // in a month with no gigs is noise.
      var legend = el("div", "cal__legend");
      function key(swatch, text) {
        var k = el("span", "cal__key");
        k.appendChild(el("span", "cal__swatch " + swatch));
        k.appendChild(el("span", null, text));
        legend.appendChild(k);
      }
      if (playedCount) key("cal__swatch--past", "Played");
      if (bookedCount) key("cal__swatch--next", "Booked");
      if (blockedCount) key("cal__swatch--blocked", "Unavailable");
      if (!count) legend.appendChild(el("span", "cal__key cal__key--none", "Nothing booked this month"));
      mount.appendChild(legend);

      mount.appendChild(tip);
    }

    document.addEventListener("click", hideTip);
    window.addEventListener("resize", hideTip);
    render();
  })();

  /* ── socials ──────────────────────────────────────────────── */
  (function socials() {
    var ul = $("#social-list");
    if (!ul) return;

    var list = (C.socials || []).filter(function (s) { return s && s.url; });

    // Always give people a way to reach him, even with zero socials filled in.
    if (C.contactEmail) {
      list = list.concat([{
        network: "email",
        handle: C.contactEmail,
        url: "mailto:" + C.contactEmail,
        label: "Email"
      }]);
    }
    if (!list.length) { ul.closest(".foot__socials").hidden = true; return; }

    list.forEach(function (s) {
      var li = el("li");
      var a = el("a");
      a.href = s.url;
      if (s.url.indexOf("mailto:") !== 0) { a.target = "_blank"; a.rel = "noopener"; }

      var name = s.label || s.network || "Link";
      a.appendChild(icon(s.network));
      a.appendChild(el("span", null, name));
      if (s.handle) a.appendChild(el("span", "handle", s.handle));

      li.appendChild(a);
      ul.appendChild(li);
    });
  })();

  /* ── booking form ─────────────────────────────────────────── */
  (function bookingForm() {
    var form = $("#book-form");
    var status = $("#form-status");
    if (!form) return;

    var id = (C.formspreeId || "").trim();
    var mail = (C.contactEmail || "").trim();

    function say(msg, kind) {
      status.textContent = msg;
      status.className = "form__status" + (kind ? " is-" + kind : "");
    }

    // No Formspree ID yet? Hand off to the visitor's mail app so the
    // button is never a dead end.
    function mailtoFallback(data) {
      if (!mail) { say("Booking form isn't connected yet — please try again soon.", "err"); return; }
      var body =
        "Name: " + (data.get("name") || "") + "\n" +
        "Email: " + (data.get("email") || "") + "\n" +
        "Date: " + (data.get("date") || "not set") + "\n" +
        "Event type: " + (data.get("event_type") || "") + "\n" +
        "Venue: " + (data.get("venue") || "") + "\n\n" +
        (data.get("message") || "");
      window.location.href =
        "mailto:" + mail +
        "?subject=" + encodeURIComponent("Gig inquiry — " + (data.get("name") || "")) +
        "&body=" + encodeURIComponent(body);
      say("Opening your email app…");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Mark fields so the invalid styling only appears after a real attempt.
      Array.prototype.forEach.call(form.elements, function (f) {
        if (f.classList) f.classList.add("is-touched");
      });
      if (!form.checkValidity()) {
        say("Please fill in your name, email, and a few details.", "err");
        var bad = form.querySelector(":invalid");
        if (bad) bad.focus();
        return;
      }

      var data = new FormData(form);
      if (data.get("_gotcha")) return;          // bot

      if (!id) { mailtoFallback(data); return; }

      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      say("Sending…");

      fetch("https://formspree.io/f/" + id, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            say("Got it — thanks. I'll be in touch shortly.", "ok");
          } else {
            return r.json().then(function (j) {
              var m = j && j.errors && j.errors.length ? j.errors[0].message : "Something went wrong.";
              say(m + " You can also email " + mail + ".", "err");
            });
          }
        })
        .catch(function () {
          say("Couldn't send — check your connection, or email " + mail + " directly.", "err");
        })
        .then(function () { btn.disabled = false; });
    });
  })();

  /* ── TikTok button in the hero ────────────────────────────────
     Built from the socials list rather than hardcoded, so the URL
     lives in exactly one place. Drop TikTok from content.js and
     this button disappears with it.                              */
  (function heroSocial() {
    var actions = $(".hero__actions");
    if (!actions) return;

    var tt = (C.socials || []).filter(function (s) {
      return s && s.url && String(s.network).toLowerCase() === "tiktok";
    })[0];
    if (!tt) return;

    var a = el("a", "btn btn--tiktok");
    a.href = tt.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.appendChild(icon("tiktok"));
    a.appendChild(el("span", null, "TikTok"));
    if (tt.handle) a.setAttribute("aria-label", "Follow " + tt.handle + " on TikTok");
    actions.appendChild(a);
  })();

  /* ── drop nav links that point at an empty (hidden) section ──
     Otherwise "Watch" sits in the menu doing nothing until the
     first video is added.                                       */
  (function pruneNav() {
    var sel = '.nav a[href^="#"], .mobile-nav a[href^="#"], .hero__actions a[href^="#"]';
    document.querySelectorAll(sel).forEach(function (a) {
      var target = document.getElementById(a.getAttribute("href").slice(1));
      if (target && target.hidden) a.remove();
    });
  })();

  /* ── mobile nav ───────────────────────────────────────────── */
  (function mobileNav() {
    var burger = $(".burger");
    var panel = $("#mobile-nav");
    if (!burger || !panel) return;

    burger.addEventListener("click", function () {
      var open = panel.hidden;
      panel.hidden = !open;
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    panel.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        panel.hidden = true;
        burger.setAttribute("aria-expanded", "false");
      }
    });
  })();

  /* ── nav highlight + scroll reveal ────────────────────────── */
  (function motion() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("is-in"); });
      return;
    }

    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        revealer.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".reveal").forEach(function (n) { revealer.observe(n); });

    var links = {};
    document.querySelectorAll(".nav a").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = links[en.target.id];
        if (a) a.classList.toggle("is-active", en.isIntersecting);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    ["watch", "listen", "shows", "book"].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  })();

  var yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
