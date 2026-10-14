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
