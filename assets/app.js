/* =========================================================================
   創投恐怖故事 · VC Horror Stories · app.js
   (vanilla, zero-build, no chart lib, no framework)

   A single long page assembled from an ordered list of typed section-blocks:

     window.SITE_META     -> { title:{en,zh}, subtitle:{en,zh} }
     window.SITE_THEMES   -> [ { key, en, zh } ]   (story filter + chips)
     window.SITE_SECTIONS -> [ { type, id, ... } ] (rendered in order)

   RENDERERS is the SECTION-TYPE REGISTRY: one function per `type`. To add a
   block type, add one entry here (+ optionally a NAV_ICON). Custom types added
   for this project: `roster` (Hall of Shame) and `stories` (rich pitch-room
   cards with a theme filter + detail dialog).

   A single render() repaints EVERY section + sticky nav + chrome + <title> in
   the active language, so the zh/en toggle never leaves anything stuck.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- data ---------- */
  var META = window.SITE_META || { title: {}, subtitle: {} };
  var SECTIONS = Array.isArray(window.SITE_SECTIONS) ? window.SITE_SECTIONS : [];
  var THEMES = Array.isArray(window.SITE_THEMES) ? window.SITE_THEMES : [];

  /* ---------- i18n strings (UI chrome only) ---------- */
  var I18N = {
    en: { footer: "A curated, bilingual archive of founders' public VC horror stories. Stories belong to their authors.",
          close: "Close", menu: "On this page", all: "All",
          named: "Named", source: "Source", showing: "Showing", of: "of", stories: "stories",
          respondedTag: "publicly responded" },
    zh: { footer: "一份經過整理的雙語檔案,收錄創辦人公開分享的創投恐怖故事。故事版權皆屬原作者。",
          close: "關閉", menu: "本頁導覽", all: "全部",
          named: "點名", source: "出處", showing: "顯示", of: "/", stories: "則故事",
          respondedTag: "已公開回應" }
  };

  /* ---------- safe localStorage (sandbox / file:// may throw) ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  /* ---------- global state ---------- */
  var state = {
    lang:  lsGet("lang")  || "zh",       // default language: zh
    theme: lsGet("theme") || "dark",     // default theme: dark (it's a horror anthology)
    storyFilter: "all"
  };

  /* ---------- dom refs ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var sectionsEl = $("sections");
  var navInner   = $("sectionNavInner");
  var dialog     = $("dialog");
  var dialogBody = $("dialogBody");

  /* ---------- helpers ---------- */
  function t(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] || obj.en || obj.zh || "";
  }
  function ui(key) { return (I18N[state.lang] || I18N.en)[key]; }
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  function r(n) { return Math.round(n * 100) / 100; }
  function fmt(n) { try { return Number(n).toLocaleString("en-US"); } catch (e) { return String(n); } }

  /* multi-paragraph body: split on blank lines -> <p>, single \n -> <br> */
  function paragraphs(str) {
    return String(str || "").split(/\n{2,}/).map(function (p) {
      return "<p>" + escapeHtml(p).replace(/\n/g, "<br>") + "</p>";
    }).join("");
  }

  function themeLabel(key) {
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].key === key) return t(THEMES[i]);
    return key;
  }

  /* a shared <header class="section-head"> for every section */
  function sectionHead(sec) {
    var sub = t(sec.subtitle)
      ? '<p class="section-head__sub">' + escapeHtml(t(sec.subtitle)) + "</p>"
      : "";
    return '<header class="section-head">' +
      '<h2 id="' + escapeHtml(sec.id) + '-heading">' + escapeHtml(t(sec.title)) + "</h2>" +
      sub + "</header>";
  }

  function namedBadges(arr) {
    if (!arr || !arr.length) return "";
    return '<div class="named-row">' +
      '<span class="named-row__lead">' + escapeHtml(ui("named")) + "</span>" +
      arr.map(function (n) {
        return '<span class="named-badge">' + escapeHtml(n) + "</span>";
      }).join("") + "</div>";
  }

  /* a region pill (flag + localized label); US is the default if unset */
  var DEFAULT_REGION = { flag: "🇺🇸", en: "USA", zh: "美國" };
  function regionBadge(item) {
    var rg = item.region || DEFAULT_REGION;
    var flag = rg.flag ? escapeHtml(rg.flag) + " " : "";
    return '<span class="region">' + flag + escapeHtml(t(rg)) + "</span>";
  }

  /* =======================================================================
     SECTION-TYPE REGISTRY
     ===================================================================== */
  var RENDERERS = {

    /* ---- hero: lead-in + animated stat counters ---- */
    hero: function (sec) {
      var stats = (sec.stats || []).map(function (s) {
        return '<div class="hero__stat" data-item>' +
          '<b class="hero__stat-value" data-count="' + escapeHtml(String(s.value)) + '">0</b>' +
          '<span class="hero__stat-label">' + escapeHtml(t(s.label)) + "</span>" +
        "</div>";
      }).join("");
      return '<div class="hero__inner">' +
        '<span class="hero__eyebrow">' + (state.lang === "zh" ? "創投 · 恐怖故事檔案" : "VENTURE CAPITAL · A HORROR ANTHOLOGY") + "</span>" +
        sectionHead(sec) +
        (stats ? '<div class="hero__stats">' + stats + "</div>" : "") +
        "</div>";
    },

    /* ---- roster: "Hall of Shame" case-file cards ---- */
    roster: function (sec) {
      var cards = (sec.entries || []).map(function (e) {
        var responded = e.response
          ? '<div class="case__response"><span class="material-symbols-rounded" aria-hidden="true">reply</span>' +
              "<span>" + escapeHtml(t(e.response)) + "</span></div>"
          : "";
        return '<article class="case" data-item>' +
          '<div class="case__stamp">' + escapeHtml(ui("named")) + "</div>" +
          '<h3 class="case__name">' + escapeHtml(e.name) + "</h3>" +
          '<p class="case__person">' + escapeHtml(t(e.person)) + "</p>" +
          '<span class="case__severity">' + escapeHtml(t(e.severity)) + "</span>" +
          '<p class="case__accused">' + escapeHtml(t(e.accused)) + "</p>" +
          '<p class="case__by">— ' + escapeHtml(e.by) + "</p>" +
          responded +
        "</article>";
      }).join("");
      return sectionHead(sec) + '<div class="case-grid">' + cards + "</div>";
    },

    /* ---- stories: theme-filterable pitch-room cards -> detail dialog ---- */
    stories: function (sec) {
      // which themes actually appear, in THEMES order
      var present = THEMES.filter(function (th) {
        return (sec.items || []).some(function (it) {
          return (it.themes || []).indexOf(th.key) !== -1;
        });
      });
      var chips = ['<button class="chip' + (state.storyFilter === "all" ? " chip--active" : "") +
          '" type="button" data-filter="all">' + escapeHtml(ui("all")) + "</button>"]
        .concat(present.map(function (th) {
          return '<button class="chip' + (state.storyFilter === th.key ? " chip--active" : "") +
            '" type="button" data-filter="' + escapeHtml(th.key) + '">' + escapeHtml(t(th)) + "</button>";
        })).join("");

      var cards = (sec.items || []).map(function (item) {
        var themeTags = (item.themes || []).map(function (k) {
          return '<span class="tag">' + escapeHtml(themeLabel(k)) + "</span>";
        }).join("");
        return '<article class="card" tabindex="0" role="button" data-item ' +
            'data-slug="' + escapeHtml(item.slug) + '" ' +
            'data-themes="' + escapeHtml((item.themes || []).join(" ")) + '" ' +
            'aria-label="' + escapeHtml(t(item.founder || item.title)) + '">' +
          '<div class="card__head">' +
            '<h3 class="card__title">' + escapeHtml(t(item.founder || item.title)) + "</h3>" +
            (item.handle ? '<span class="card__handle">' + escapeHtml(item.handle) + "</span>" : "") +
            regionBadge(item) +
          "</div>" +
          (t(item.company) ? '<p class="card__company">' + escapeHtml(t(item.company)) + "</p>" : "") +
          '<p class="card__summary">' + escapeHtml(t(item.summary)) + "</p>" +
          namedBadges(item.named) +
          '<div class="card__foot">' +
            (themeTags ? '<div class="card__tags">' + themeTags + "</div>" : "<span></span>") +
            (t(item.meta) ? '<span class="card__meta">' + escapeHtml(t(item.meta)) + "</span>" : "") +
          "</div>" +
        "</article>";
      }).join("");

      return sectionHead(sec) +
        '<div class="chiprow" role="group" aria-label="filter">' + chips + "</div>" +
        '<p class="resultcount" id="resultCount" aria-live="polite"></p>' +
        '<div class="grid grid--stories">' + cards + "</div>";
    },

    /* ---- bars: inline-SVG bar chart (no chart library) ---- */
    bars: function (sec) {
      var series = sec.series || [];
      var W = 560, H = 280, padL = 16, padR = 16, padT = 24, padB = 50;
      var plotW = W - padL - padR, plotH = H - padT - padB;
      var max = Math.max.apply(null, series.map(function (d) { return d.value; }).concat([1]));
      var n = series.length || 1, gap = 14;
      var bw = (plotW - gap * (n - 1)) / n;
      var baseY = padT + plotH;
      var title = escapeHtml(t(sec.title));

      var bars = series.map(function (d, i) {
        var x = padL + i * (bw + gap);
        var h = (d.value / max) * plotH;
        var y = baseY - h;
        var label = escapeHtml(t(d.label));
        var val = escapeHtml(String(d.value));
        return (
          '<rect class="bar-rect" x="' + r(x) + '" y="' + r(y) + '" width="' + r(bw) +
            '" height="' + r(h) + '" rx="4"><title>' + label + ": " + val + "</title></rect>" +
          '<text class="bar-value" x="' + r(x + bw / 2) + '" y="' + r(y - 7) +
            '" text-anchor="middle">' + val + "</text>" +
          '<text class="bar-label" x="' + r(x + bw / 2) + '" y="' + r(baseY + 22) +
            '" text-anchor="middle">' + label + "</text>"
        );
      }).join("");

      var svg =
        '<svg viewBox="0 0 ' + W + " " + H + '" role="img" ' +
          'preserveAspectRatio="xMidYMid meet" aria-label="' + title + '">' +
          "<title>" + title + "</title>" +
          '<line class="axis-line" x1="' + padL + '" y1="' + r(baseY) +
            '" x2="' + r(W - padR) + '" y2="' + r(baseY) + '" />' +
          bars +
        "</svg>";
      return sectionHead(sec) +
        '<figure class="chart-card" data-item><div class="chart-wrap">' + svg + "</div></figure>";
    },

    /* ---- quotes: pull-quote cards ---- */
    quotes: function (sec) {
      var items = (sec.quotes || []).map(function (q) {
        var by = q.by ? '<figcaption class="quote-by">— ' + escapeHtml(q.by) + "</figcaption>" : "";
        return '<figure class="quote-card" data-item>' +
          '<span class="material-symbols-rounded quote-mark" aria-hidden="true">format_quote</span>' +
          "<blockquote>" + escapeHtml(t(q.text)) + "</blockquote>" +
          by +
        "</figure>";
      }).join("");
      return sectionHead(sec) + '<div class="quotes-grid">' + items + "</div>";
    },

    /* ---- accordion: native <details> Q&A ---- */
    accordion: function (sec) {
      var items = (sec.qa || []).map(function (row) {
        return '<details class="acc-item" data-item>' +
          '<summary class="acc-q">' +
            "<span>" + escapeHtml(t(row.q)) + "</span>" +
            '<span class="material-symbols-rounded acc-chevron" aria-hidden="true">expand_more</span>' +
          "</summary>" +
          '<div class="acc-a">' + escapeHtml(t(row.a)) + "</div>" +
        "</details>";
      }).join("");
      return sectionHead(sec) + '<div class="accordion">' + items + "</div>";
    },

    /* ---- prose: ordered rich-text blocks (p / h3 / ul) ---- */
    prose: function (sec) {
      var body = (sec.blocks || []).map(function (b) {
        if (b.type === "h3") return "<h3>" + escapeHtml(t(b.text)) + "</h3>";
        if (b.type === "ul") {
          var arr = (b.items && (b.items[state.lang] || b.items.en || b.items.zh)) || [];
          return "<ul>" + arr.map(function (li) {
            return "<li>" + escapeHtml(li) + "</li>";
          }).join("") + "</ul>";
        }
        return "<p>" + escapeHtml(t(b.text)) + "</p>";
      }).join("");
      return sectionHead(sec) + '<div class="prose" data-item>' + body + "</div>";
    },

    /* ---- cta: closing call-to-action ---- */
    cta: function (sec) {
      var link = "";
      if (sec.link && sec.link.url) {
        link = '<a class="cta-btn" href="' + escapeHtml(sec.link.url) + '" ' +
          'target="_blank" rel="noopener">' +
          escapeHtml(t(sec.link.label)) +
          '<span class="material-symbols-rounded" aria-hidden="true">arrow_outward</span></a>';
      }
      return '<div class="cta-card" data-item>' +
        "<h2>" + escapeHtml(t(sec.title)) + "</h2>" +
        (t(sec.text) ? "<p>" + escapeHtml(t(sec.text)) + "</p>" : "") +
        link +
      "</div>";
    }
  };

  /* icon shown in the section nav pill, keyed by type */
  var NAV_ICONS = {
    hero: "skull", roster: "gavel", stories: "menu_book",
    bars: "bar_chart", quotes: "format_quote", accordion: "quiz",
    prose: "article", cta: "newspaper"
  };

  /* =======================================================================
     RENDER
     ===================================================================== */
  function paintSections() {
    sectionsEl.innerHTML = "";
    SECTIONS.forEach(function (sec) {
      var fn = RENDERERS[sec.type];
      if (!fn) return;
      var el = document.createElement("section");
      el.className = "section section--" + sec.type;
      el.id = sec.id;
      if (sec.type !== "cta" && sec.type !== "hero") el.setAttribute("aria-labelledby", sec.id + "-heading");
      el.innerHTML = fn(sec, state.lang);
      sectionsEl.appendChild(el);
    });
    wireCards();
    wireChips();
    applyStoryFilter();
  }

  function paintNav() {
    navInner.innerHTML = "";
    SECTIONS.forEach(function (sec) {
      var a = document.createElement("a");
      a.className = "navpill";
      a.href = "#" + sec.id;
      a.dataset.target = sec.id;
      a.innerHTML =
        '<span class="material-symbols-rounded" aria-hidden="true">' +
          (NAV_ICONS[sec.type] || "label") + "</span>" +
        "<span>" + escapeHtml(t(sec.title)) + "</span>";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.getElementById(sec.id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#" + sec.id);
      });
      navInner.appendChild(a);
    });
  }

  function paintChrome() {
    document.documentElement.setAttribute("lang", state.lang);
    var titleStr = t(META.title);
    var subStr = t(META.subtitle);
    document.title = titleStr + (state.lang === "zh" ? " — 創投界最不堪的募資現場" : " — the worst the pitch room has to offer");
    var brand = $("brandName");
    if (brand) brand.textContent = titleStr;
    var tagline = $("brandTag");
    if (tagline) tagline.textContent = state.lang === "zh" ? "點名 · 雙語檔案" : "named & bilingual";
    var foot = $("footerText");
    if (foot) foot.textContent = ui("footer");
    var nav = $("sectionNav");
    if (nav) nav.setAttribute("aria-label", ui("menu"));
    var dc = $("dialogClose");
    if (dc) dc.setAttribute("aria-label", ui("close"));
  }

  /* full-page repaint — used on load AND on every language switch */
  function render() {
    paintChrome();
    paintNav();
    paintSections();
    setupScrollSpy();
    animateCounters();
  }

  /* =======================================================================
     STORY THEME FILTER (show/hide, no full re-render -> no counter replay)
     ===================================================================== */
  function applyStoryFilter() {
    var cards = [].slice.call(document.querySelectorAll(".card[data-themes]"));
    if (!cards.length) return;
    var shown = 0;
    cards.forEach(function (card) {
      var themes = (card.dataset.themes || "").split(/\s+/);
      var match = state.storyFilter === "all" || themes.indexOf(state.storyFilter) !== -1;
      card.hidden = !match;
      if (match) shown++;
    });
    var rc = $("resultCount");
    if (rc) rc.textContent = ui("showing") + " " + shown + " " + ui("of") + " " + cards.length + " " + ui("stories");
  }

  function wireChips() {
    [].forEach.call(document.querySelectorAll(".chip[data-filter]"), function (chip) {
      chip.addEventListener("click", function () {
        state.storyFilter = chip.dataset.filter;
        [].forEach.call(document.querySelectorAll(".chip[data-filter]"), function (c) {
          c.classList.toggle("chip--active", c.dataset.filter === state.storyFilter);
        });
        applyStoryFilter();
      });
    });
  }

  /* =======================================================================
     HERO COUNT-UP
     ===================================================================== */
  function animateCounters() {
    var els = [].slice.call(document.querySelectorAll(".hero__stat-value[data-count]"));
    if (!els.length) return;

    function run(el) {
      if (el.dataset.done === "1") return;
      el.dataset.done = "1";
      var target = parseFloat(el.dataset.count) || 0;
      var dur = 1300, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);              // easeOutCubic
        el.textContent = fmt(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = fmt(target);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* =======================================================================
     SCROLLSPY
     ===================================================================== */
  var spyObserver = null;
  function setupScrollSpy() {
    if (spyObserver) { spyObserver.disconnect(); spyObserver = null; }
    if (!("IntersectionObserver" in window)) return;
    var pills = {};
    [].forEach.call(navInner.children, function (a) { pills[a.dataset.target] = a; });

    spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var pill = pills[en.target.id];
        if (!pill) return;
        if (en.isIntersecting) {
          [].forEach.call(navInner.children, function (p) {
            p.classList.remove("navpill--active");
            p.removeAttribute("aria-current");
          });
          pill.classList.add("navpill--active");
          pill.setAttribute("aria-current", "true");
          if (pill.scrollIntoView) {
            pill.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
          }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    SECTIONS.forEach(function (sec) {
      var el = document.getElementById(sec.id);
      if (el) spyObserver.observe(el);
    });
  }

  /* =======================================================================
     DIALOG — rich card detail with #slug deep links + Esc
     ===================================================================== */
  function findCard(slug) {
    for (var i = 0; i < SECTIONS.length; i++) {
      var sec = SECTIONS[i];
      if (sec.type !== "stories" || !sec.items) continue;
      for (var j = 0; j < sec.items.length; j++) {
        if (sec.items[j].slug === slug) return sec.items[j];
      }
    }
    return null;
  }

  function openDialog(slug) {
    var item = findCard(slug);
    if (!item) return;
    var themeTags = (item.themes || []).map(function (k) {
      return '<span class="tag">' + escapeHtml(themeLabel(k)) + "</span>";
    }).join("");
    var src = (item.source && item.source.url)
      ? '<a class="dialog__source" href="' + escapeHtml(item.source.url) + '" target="_blank" rel="noopener">' +
          '<span class="material-symbols-rounded" aria-hidden="true">open_in_new</span>' +
          escapeHtml(t(item.source.label) || ui("source")) + "</a>"
      : "";
    dialogBody.innerHTML =
      '<header class="dialog__head">' +
        '<h2 id="dialogTitle">' + escapeHtml(t(item.founder || item.title)) + "</h2>" +
        '<p class="dialog__sub">' +
          regionBadge(item) +
          (item.handle ? '<span class="dialog__handle">' + escapeHtml(item.handle) + "</span>" : "") +
          (t(item.company) ? "<span>" + escapeHtml(t(item.company)) + "</span>" : "") +
        "</p>" +
        (t(item.meta) ? '<p class="dialog__meta">' + escapeHtml(t(item.meta)) + "</p>" : "") +
      "</header>" +
      namedBadges(item.named) +
      (themeTags ? '<div class="card__tags dialog__tags">' + themeTags + "</div>" : "") +
      '<div class="dialog__story">' + paragraphs(t(item.overview) || t(item.summary)) + "</div>" +
      src;
    if (!dialog.open) dialog.showModal();
    dialogBody.scrollTop = 0;
    if (location.hash.slice(1) !== slug) history.replaceState(null, "", "#" + slug);
  }
  function closeDialog() {
    if (dialog.open) dialog.close();
    if (isSlugHash()) history.replaceState(null, "", location.pathname + location.search);
  }
  function isSlugHash() {
    var h = location.hash.slice(1);
    return !!h && !!findCard(h);
  }

  function wireCards() {
    [].forEach.call(document.querySelectorAll(".card[data-slug]"), function (card) {
      var slug = card.dataset.slug;
      card.addEventListener("click", function () { openDialog(slug); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDialog(slug); }
      });
    });
  }

  /* =======================================================================
     THEME + LANG
     ===================================================================== */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var icon = $("themeIcon");
    if (icon) icon.textContent = state.theme === "dark" ? "light_mode" : "dark_mode";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", state.theme === "dark" ? "#0c0a0d" : "#fbf7f2");
    lsSet("theme", state.theme);
  }
  function applyLangChrome() {
    var label = $("langLabel");
    if (label) label.textContent = state.lang === "en" ? "EN" : "中";
    lsSet("lang", state.lang);
  }

  /* =======================================================================
     WIRING
     ===================================================================== */
  function wire() {
    $("themeToggle").addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
    });

    $("langToggle").addEventListener("click", function () {
      state.lang = state.lang === "en" ? "zh" : "en";
      applyLangChrome();
      var openSlug = isSlugHash() ? location.hash.slice(1) : null;
      render();
      if (dialog.open && openSlug) openDialog(openSlug);
    });

    $("dialogClose").addEventListener("click", closeDialog);
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeDialog(); });
    dialog.addEventListener("close", function () {
      if (isSlugHash()) history.replaceState(null, "", location.pathname + location.search);
    });

    window.addEventListener("hashchange", syncFromHash);
  }

  function syncFromHash() {
    var slug = location.hash.slice(1);
    if (slug && findCard(slug)) openDialog(slug);
    else if (!slug && dialog.open) dialog.close();
  }

  /* =======================================================================
     INIT
     ===================================================================== */
  function init() {
    applyTheme();
    applyLangChrome();
    render();
    wire();
    syncFromHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
