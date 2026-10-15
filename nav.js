(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }
  function closeDrops(except) {
    document.querySelectorAll(".nav-drop.open").forEach(function (drop) {
      if (drop !== except) {
        drop.classList.remove("open");
        var btn = drop.querySelector(".drop-btn");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }
  document.querySelectorAll(".nav-drop .drop-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var drop = btn.closest(".nav-drop");
      var wasOpen = drop.classList.contains("open");
      closeDrops(drop);
      if (!wasOpen) {
        drop.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      } else {
        drop.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-drop")) closeDrops(null);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrops(null);
  });
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      if (!item) return;
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      var a = item.querySelector(".faq-a");
      if (a) a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
    });
  });
})();

/* Ported effects: scroll reveals, header shadow on scroll, back-to-top. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".card, .coverage-card, .related-card, .stat-cell, .logo-story, .section-head, .page-hero h1, .page-hero p, .page-hero .breadcrumb, .stat-strip, .services .section-head, .cta-band, .hero h1, .hero .lede, .hero-actions, .hero-side").forEach(function (el, i) {
    el.classList.add("reveal");
    var p = el.parentNode;
    var isGridChild = p && p.classList && (p.classList.contains("grid") || p.classList.contains("grid-3") || p.classList.contains("coverage-grid") || p.classList.contains("related-grid") || p.classList.contains("stat-grid"));
    el.style.transitionDelay = isGridChild ? ((i % 3) * 90) + "ms" : "0ms";
    io.observe(el);
  });
})();
(function () {
  var h = document.querySelector(".site-header");
  if (!h) return;
  function onScroll() { h.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var b = document.createElement("button");
  b.className = "to-top";
  b.setAttribute("aria-label", "Back to top");
  b.textContent = "↑";
  document.body.appendChild(b);
  window.addEventListener("scroll", function () {
    b.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  b.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  });
})();
