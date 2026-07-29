"use strict";
(() => {
  // src/scripts/motion.ts
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = matchMedia("(hover: none)").matches;
  var EASE = "cubic-bezier(.22, 1, .36, 1)";
  var FRAMES = {
    up: [{ opacity: 0, transform: "translate3d(0, 26px, 0)" }, { opacity: 1, transform: "none" }],
    scale: [{ opacity: 0, transform: "translate3d(0, 14px, 0) scale(.955)" }, { opacity: 1, transform: "none" }],
    left: [{ opacity: 0, transform: "translate3d(-32px, 0, 0)" }, { opacity: 1, transform: "none" }],
    right: [{ opacity: 0, transform: "translate3d(32px, 0, 0)" }, { opacity: 1, transform: "none" }]
  };
  function reveal(el) {
    var _a, _b;
    el.classList.add("in");
    if (reduced) return;
    const delay = Number((_a = el.dataset.revealDelay) != null ? _a : 0);
    if (el.classList.contains("kin")) {
      const words = el.querySelectorAll(".w > span");
      words.forEach(
        (w, i) => w.animate([{ transform: "translateY(105%)" }, { transform: "translateY(0)" }], {
          duration: 820,
          delay: delay + i * 42,
          easing: EASE,
          fill: "backwards"
        })
      );
      return;
    }
    const kind = el.getAttribute("data-reveal") || "up";
    el.animate((_b = FRAMES[kind]) != null ? _b : FRAMES.up, {
      duration: 620,
      delay,
      easing: EASE,
      fill: "backwards"
    });
  }
  function initReveal() {
    const els = document.querySelectorAll("[data-reveal], .kin");
    if (!els.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          reveal(e.target);
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
  }
  function initKinetic() {
    document.querySelectorAll(".kin").forEach((el) => {
      if (el.dataset.split === "done") return;
      const walk = (node) => {
        [...node.childNodes].forEach((child) => {
          var _a;
          if (child.nodeType === Node.TEXT_NODE) {
            const text = (_a = child.textContent) != null ? _a : "";
            if (!text.trim()) return;
            const frag = document.createDocumentFragment();
            text.split(/(\s+)/).forEach((tok) => {
              if (!tok.trim()) {
                frag.appendChild(document.createTextNode(tok));
                return;
              }
              const w = document.createElement("span");
              w.className = "w";
              const inner = document.createElement("span");
              inner.textContent = tok;
              w.appendChild(inner);
              frag.appendChild(w);
            });
            child.replaceWith(frag);
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            walk(child);
          }
        });
      };
      walk(el);
      el.querySelectorAll(".w > span").forEach((s, i) => s.style.setProperty("--i", String(i)));
      el.dataset.split = "done";
    });
  }
  function initCounters() {
    const nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    const run = (el) => {
      var _a, _b, _c;
      const target = parseFloat(el.dataset.count);
      const decimals = Number((_a = el.dataset.countDecimals) != null ? _a : 0);
      const suffix = (_b = el.dataset.countSuffix) != null ? _b : "";
      const prefix = (_c = el.dataset.countPrefix) != null ? _c : "";
      if (reduced) {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
        return;
      }
      const dur = 1500;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    // The markup ships the real figure so crawlers and no-JS visitors read the
    // truth ("73 reports", not "0 reports"). Zero it here, before first paint,
    // so the count-up still starts from nothing instead of visibly jumping
    // back down when the element scrolls into view.
    if (!reduced) {
      nums.forEach((el) => {
        var _p, _s, _d;
        const decimals = Number((_d = el.dataset.countDecimals) != null ? _d : 0);
        const prefix = (_p = el.dataset.countPrefix) != null ? _p : "";
        const suffix = (_s = el.dataset.countSuffix) != null ? _s : "";
        el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
      });
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      }),
      { threshold: 0.5 }
    );
    nums.forEach((n) => io.observe(n));
  }
  function initPointer() {
    if (reduced || isTouch) return;
    document.querySelectorAll(".tilt").forEach((el) => {
      var _a;
      const max = Number((_a = el.dataset.tilt) != null ? _a : 7);
      let raf = 0;
      el.addEventListener("pointermove", (ev) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = el.getBoundingClientRect();
          const px = (ev.clientX - r.left) / r.width - 0.5;
          const py = (ev.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--ry", `${px * max * 2}deg`);
          el.style.setProperty("--rx", `${-py * max * 2}deg`);
        });
      }, { passive: true });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
      });
    });
    document.querySelectorAll(".spot").forEach((el) => {
      let raf = 0;
      el.addEventListener("pointermove", (ev) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${ev.clientX - r.left}px`);
          el.style.setProperty("--my", `${ev.clientY - r.top}px`);
        });
      }, { passive: true });
    });
    document.querySelectorAll(".magnetic").forEach((el) => {
      var _a;
      const strength = Number((_a = el.dataset.magnetic) != null ? _a : 0.28);
      let raf = 0;
      el.addEventListener("pointermove", (ev) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = el.getBoundingClientRect();
          const x = (ev.clientX - (r.left + r.width / 2)) * strength;
          const y = (ev.clientY - (r.top + r.height / 2)) * strength;
          el.style.translate = `${x}px ${y}px`;
        });
      }, { passive: true });
      el.addEventListener("pointerleave", () => {
        el.style.translate = "0 0";
      });
    });
  }
  function initNav() {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;
    let last = 0, raf = 0;
    const onScroll = () => {
      if (nav.classList.contains("is-open") || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        nav.classList.toggle("is-stuck", y > 20);
        nav.classList.toggle("is-hidden", y > 560 && y > last && !nav.contains(document.activeElement));
        last = y;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const toggle = nav.querySelector("[data-nav-toggle]");
    const drawer = nav.querySelector("[data-nav-drawer]");
    const root = document.documentElement;
    let lockedAt = 0;
    const setDrawer = (open) => {
      nav.classList.toggle("is-open", open);
      toggle == null ? void 0 : toggle.setAttribute("aria-expanded", String(open));
      root.classList.toggle("nav-open", open);
      if (open) {
        lockedAt = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${lockedAt}px`;
        document.body.style.insetInline = "0";
      } else {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.insetInline = "";
        window.scrollTo({ top: lockedAt, behavior: "instant" });
      }
    };
    toggle == null ? void 0 : toggle.addEventListener("click", () => setDrawer(!nav.classList.contains("is-open")));
    drawer == null ? void 0 : drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setDrawer(false)));
    addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setDrawer(false);
        toggle == null ? void 0 : toggle.focus();
      }
    });
  }
  function initTheme() {
    const btns = document.querySelectorAll("[data-theme-toggle]");
    if (!btns.length) return;
    const current = () => {
      var _a;
      return (_a = document.documentElement.getAttribute("data-theme")) != null ? _a : "light";
    };
    const paint = () => {
      const t = current();
      btns.forEach((b) => {
        b.setAttribute("aria-pressed", String(t === "dark"));
        b.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
      });
    };
    btns.forEach(
      (b) => b.addEventListener("click", () => {
        const next = current() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem("edv-theme", next);
        } catch {
        }
        paint();
      })
    );
    paint();
  }
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((root) => {
      const tabs = [...root.querySelectorAll('[role="tab"]')];
      const panels = [...root.querySelectorAll('[role="tabpanel"]')];
      if (!tabs.length) return;
      const glider = root.querySelector(".flag__glider");
      const strip = root.querySelector(".flag__tabs");
      const moveGlider = (i) => {
        const t = tabs[i];
        if (glider) {
          glider.style.width = `${t.offsetWidth}px`;
          glider.style.transform = `translateX(${t.offsetLeft}px)`;
        }
        if (strip && strip.scrollWidth > strip.clientWidth) {
          const left = t.offsetLeft - (strip.clientWidth - t.offsetWidth) / 2;
          strip.scrollTo({ left: Math.max(0, left), behavior: reduced ? "auto" : "smooth" });
        }
      };
      const select = (i, focus = true) => {
        tabs.forEach((t, n) => {
          const on = n === i;
          t.setAttribute("aria-selected", String(on));
          t.tabIndex = on ? 0 : -1;
        });
        panels.forEach((p, n) => p.toggleAttribute("hidden", n !== i));
        moveGlider(i);
        if (focus) tabs[i].focus();
      };
      const active = Math.max(0, tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"));
      requestAnimationFrame(() => moveGlider(active));
      // A lazy image inside a `hidden` panel is never fetched — the browser
      // will not load what it cannot display — so the first click on a tab
      // used to land on an empty frame while its screenshot started
      // downloading. Once the strip is on screen the inactive panels are one
      // click away, so their images stop being lazy at that point: nothing is
      // paid for on first load, and no tab opens blank.
      const shots = [...root.querySelectorAll(".flag__shot img[loading='lazy']")];
      if (shots.length && "IntersectionObserver" in window) {
        const warm = new IntersectionObserver((entries, obs) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          shots.forEach((img) => img.setAttribute("loading", "eager"));
          obs.disconnect();
        }, { rootMargin: "300px" });
        warm.observe(root);
      }
      if ("ResizeObserver" in window) {
        new ResizeObserver(() => {
          const cur = Math.max(0, tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"));
          moveGlider(cur);
        }).observe(root);
      }
      tabs.forEach((t, i) => {
        t.addEventListener("click", () => select(i, false));
        t.addEventListener("keydown", (e) => {
          const map = {
            ArrowRight: (i + 1) % tabs.length,
            ArrowLeft: (i - 1 + tabs.length) % tabs.length,
            Home: 0,
            End: tabs.length - 1
          };
          if (e.key in map) {
            e.preventDefault();
            select(map[e.key]);
          }
        });
      });
    });
  }
  function initMarquee() {
    document.querySelectorAll(".marquee").forEach((m) => {
      const track = m.querySelector(".marquee__track");
      if (!track || track.dataset.cloned === "1") return;
      const clone = track.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.dataset.cloned = "1";
      track.dataset.cloned = "1";
      m.appendChild(clone);
    });
  }
  // Onboarding: hovering or focusing a step swaps the artwork in the side panel.
  // Pointer AND focus, so this is not a mouse-only interaction.
  function initSteps() {
    document.querySelectorAll(".onb__wrap[data-steps]").forEach((root) => {
      const steps = [...root.querySelectorAll(".onb__s")];
      const arts = [...root.querySelectorAll(".onb__art")];
      if (!steps.length || !arts.length) return;
      const show = (i) => {
        steps.forEach((s, n) => s.classList.toggle("is-active", n === i));
        arts.forEach((a, n) => a.classList.toggle("is-active", n === i));
      };
      steps.forEach((s, i) => {
        s.addEventListener("pointerenter", () => show(i));
        s.addEventListener("focus", () => show(i));
      });
    });
  }

  function initFaq() {
    document.querySelectorAll("details.faq").forEach((d) => {
      const body = d.querySelector(".faq__body");
      if (!body) return;
      d.addEventListener("toggle", () => {
        if (reduced) return;
        if (d.open) {
          body.style.height = "0px";
          requestAnimationFrame(() => {
            body.style.height = `${body.scrollHeight}px`;
          });
          body.addEventListener("transitionend", function done() {
            body.style.height = "auto";
            body.removeEventListener("transitionend", done);
          });
        }
      });
      d.addEventListener("toggle", () => {
        var _a;
        if (!d.open) return;
        (_a = d.parentElement) == null ? void 0 : _a.querySelectorAll("details.faq").forEach((o) => {
          if (o !== d) o.open = false;
        });
      });
    });
  }
  function initHeroSlider() {
    document.querySelectorAll("[data-hero-slider]").forEach((root) => {
      const slides = [...root.querySelectorAll(".hero__slide")];
      const dots = [...root.querySelectorAll(".hero__dot")];
      // Everything that changes with the slide — the eyebrow, the paragraph
      // and the primary button as well as the visual — carries data-syn, so
      // the copy column stays in step without the script knowing about it.
      const syn = [...root.querySelectorAll("[data-syn]")];
      if (slides.length < 2) return;
      const DUR = 6e3;
      let i = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
      let timer = null;
      let paused = false;
      const schedule = () => {
        clearTimeout(timer);
        if (reduced || paused) return;
        timer = setTimeout(() => show(i + 1), DUR);
      };
      // Each copy stack collapses to whatever the active slide actually needs,
      // so a short slide is not left holding the tallest one's empty space.
      const stacks = [...root.querySelectorAll(".hero__stack")];
      const sizeStacks = () => {
        stacks.forEach((st) => {
          const on = st.querySelector(".is-active");
          if (on) st.style.height = on.offsetHeight + "px";
        });
      };
      const show = (n) => {
        i = (n + slides.length) % slides.length;
        syn.forEach((el) => el.classList.toggle("is-active", Number(el.dataset.syn) === i));
        sizeStacks();
        slides.forEach((s, k) => {
          if (k === i) s.removeAttribute("inert");
          else s.setAttribute("inert", "");
        });
        dots.forEach((d, k) => {
          const on = k === i;
          d.classList.toggle("is-active", on);
          d.setAttribute("aria-selected", String(on));
          d.tabIndex = on ? 0 : -1;
        });
        schedule();
      };
      const setPaused = (v) => {
        paused = v;
        dots.forEach((d) => d.classList.toggle("is-paused", v));
        if (v) clearTimeout(timer);
        else schedule();
      };
      dots.forEach((d, k) => {
        d.addEventListener("click", () => show(k));
        d.addEventListener("keydown", (e) => {
          const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: slides.length - 1 };
          if (!(e.key in map)) return;
          e.preventDefault();
          show(map[e.key]);
          dots[i].focus();
        });
      });
      const prev = root.querySelector("[data-hero-prev]");
      const next = root.querySelector("[data-hero-next]");
      if (prev) prev.addEventListener("click", () => show(i - 1));
      if (next) next.addEventListener("click", () => show(i + 1));
      // Autoplay yields to anyone who is actually looking at it, and stops
      // outright on a hidden tab so a backgrounded page is not animating.
      root.addEventListener("pointerenter", () => setPaused(true));
      root.addEventListener("pointerleave", () => setPaused(false));
      root.addEventListener("focusin", () => setPaused(true));
      root.addEventListener("focusout", (e) => {
        if (!root.contains(e.relatedTarget)) setPaused(false);
      });
      document.addEventListener("visibilitychange", () => setPaused(document.hidden));
      let x0 = null;
      root.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
      root.addEventListener("touchend", (e) => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 44) show(dx < 0 ? i + 1 : i - 1);
        x0 = null;
      }, { passive: true });
      root.style.setProperty("--hero-dur", DUR + "ms");
      // A width change rewraps the copy, so the pinned heights have to be
      // recomputed or the stacks keep the old viewport's line count.
      if ("ResizeObserver" in window) {
        let w = root.clientWidth;
        new ResizeObserver(() => {
          if (root.clientWidth === w) return;
          w = root.clientWidth;
          stacks.forEach((st) => { st.style.height = ""; });
          requestAnimationFrame(sizeStacks);
        }).observe(root);
      }
      show(i);
    });
  }
  function boot() {
    initKinetic();
    initReveal();
    initCounters();
    initPointer();
    initNav();
    initTheme();
    initTabs();
    initMarquee();
    initFaq();
    initSteps();
    initHeroSlider();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
