/* =========================================================
   VALEX HVAC MECHANICAL — interactions
   Vanilla JS, no dependencies. Respects prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Current year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector("[data-header]");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) header.setAttribute("data-scrolled", "");
    else header.removeAttribute("data-scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Hero medallion: scroll-driven flip (sun & ice swap) ----------
     Static at the top of the page; as the hero scrolls away, the sky
     environment rotates 0deg -> 180deg so sun and snow swap top/bottom.
     The house stays upright and centered. Disabled for reduced-motion.   */
  var flipEnv = document.querySelector("[data-env]");
  var heroEl = document.querySelector(".hero");
  if (flipEnv && heroEl && !reduceMotion) {
    var flipTicking = false;
    function applyFlip() {
      flipTicking = false;
      var range = Math.max(heroEl.offsetHeight * 0.9, 1);
      var progress = Math.min(Math.max(window.scrollY / range, 0), 1);
      var angle = (progress * 180).toFixed(2);
      flipEnv.setAttribute("transform", "rotate(" + angle + " 200 200)");
    }
    function onFlipScroll() {
      if (!flipTicking) { flipTicking = true; requestAnimationFrame(applyFlip); }
    }
    applyFlip();
    window.addEventListener("scroll", onFlipScroll, { passive: true });
    window.addEventListener("resize", onFlipScroll, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  var scrim = document.querySelector("[data-scrim]");

  function openNav() {
    if (!mobileNav) return;
    mobileNav.hidden = false;
    scrim.hidden = false;
    requestAnimationFrame(function () {
      mobileNav.setAttribute("data-open", "");
      scrim.setAttribute("data-open", "");
    });
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.removeAttribute("data-open");
    scrim.removeAttribute("data-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
    window.setTimeout(function () {
      mobileNav.hidden = true;
      scrim.hidden = true;
    }, 380);
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") closeNav();
      else openNav();
    });
  }
  if (scrim) scrim.addEventListener("click", closeNav);
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeNav); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle && toggle.getAttribute("aria-expanded") === "true") closeNav();
  });

  /* ---------- Scroll reveal (staggered) ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var groups = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var parent = el.parentElement;
        var idx = groups.get(parent) || 0;
        el.style.transitionDelay = Math.min(idx * 70, 420) + "ms";
        groups.set(parent, idx + 1);
        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Smooth anchor scroll (offset for sticky header) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var headerH = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH + 2;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ---------- Booking form ----------
     Smooth async submit (no page reload). Priority:
       1. If FORM_ENDPOINT is set  -> POST as JSON (Formspree/Netlify/etc.)
       2. Otherwise                -> open a pre-filled email as fallback
     Either way the visitor sees an inline success panel.
     To go fully hands-free, set FORM_ENDPOINT (see README).            */
  var FORM_ENDPOINT = "";                                  // e.g. "https://formspree.io/f/xxxxxx"
  var BUSINESS_EMAIL = "valexhvacmechanical@gmail.com";

  var form = document.querySelector("[data-book-form]");
  if (form) {
    var statusEl = form.querySelector("[data-status]");
    var body = form.querySelector(".form__body");
    var successPanel = form.querySelector("[data-success]");
    var successMsg = form.querySelector("[data-success-msg]");
    var submitBtn = form.querySelector("[data-submit]");

    function setError(field, msg) {
      var wrap = field.closest(".field");
      var err = wrap.querySelector("[data-error]");
      if (msg) { wrap.classList.add("field--invalid"); if (err) err.textContent = msg; }
      else { wrap.classList.remove("field--invalid"); if (err) err.textContent = ""; }
    }

    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () { setError(input, ""); });
    });

    function showSuccess(message) {
      if (successMsg && message) successMsg.textContent = message;
      if (body && successPanel) {
        body.hidden = true;
        successPanel.hidden = false;
        successPanel.focus && successPanel.setAttribute("tabindex", "-1");
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusEl.textContent = "";
      statusEl.removeAttribute("data-state");

      // Honeypot: if filled, silently treat as spam
      if (form.elements["company"] && form.elements["company"].value) {
        showSuccess("Thanks — we'll be in touch shortly.");
        return;
      }

      var name = form.elements["name"];
      var phone = form.elements["phone"];
      var email = form.elements["email"];
      var valid = true, firstBad = null;

      if (!name.value.trim()) { setError(name, "Please enter your name."); valid = false; firstBad = firstBad || name; }
      var digits = phone.value.replace(/\D/g, "");
      if (digits.length < 10) { setError(phone, "Enter a valid phone number."); valid = false; firstBad = firstBad || phone; }
      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setError(email, "Check the email address."); valid = false; firstBad = firstBad || email;
      }

      if (!valid) {
        statusEl.textContent = "Please fix the highlighted fields.";
        statusEl.setAttribute("data-state", "err");
        if (firstBad) firstBad.focus();
        return;
      }

      var data = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        service: form.elements["service"].value,
        message: form.elements["message"].value.trim()
      };

      // Option A: real endpoint (fully smooth, no email app)
      if (FORM_ENDPOINT) {
        submitBtn.setAttribute("data-loading", "");
        submitBtn.disabled = true;
        fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (!r.ok) throw new Error("bad");
          showSuccess("Thanks, " + data.name.split(" ")[0] + "! Your request is in — we'll reach out shortly to schedule.");
        }).catch(function () {
          statusEl.textContent = "Something went wrong. Please call 310 926 0495.";
          statusEl.setAttribute("data-state", "err");
        }).finally(function () {
          submitBtn.removeAttribute("data-loading");
          submitBtn.disabled = false;
        });
        return;
      }

      // Option B (default): open a pre-filled email, then show success
      var subject = "Booking request — " + data.service + " (" + data.name + ")";
      var mailBody =
        "New booking request from the Valex website:\n\n" +
        "Name: " + data.name + "\n" +
        "Phone: " + data.phone + "\n" +
        "Email: " + (data.email || "—") + "\n" +
        "Service: " + data.service + "\n" +
        "Details: " + (data.message || "—") + "\n";
      var mailto = "mailto:" + BUSINESS_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(mailBody);

      window.location.href = mailto;
      showSuccess("Almost done — your email app is opening with the details. Prefer to talk? Call 310 926 0495.");
    });
  }
})();
