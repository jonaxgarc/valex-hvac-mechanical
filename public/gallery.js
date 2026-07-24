(function () {
  "use strict";

  var cards = Array.from(document.querySelectorAll("[data-gallery-card]"));
  var filters = Array.from(document.querySelectorAll("[data-gallery-filter]"));
  var count = document.querySelector("[data-gallery-count]");
  var lightbox = document.querySelector("[data-gallery-lightbox]");
  var image = document.querySelector("[data-gallery-image]");
  var caption = document.querySelector("[data-gallery-caption]");
  var position = document.querySelector("[data-gallery-position]");
  var visibleCards = cards.slice();
  var activeIndex = 0;

  function applyFilter(category) {
    visibleCards = cards.filter(function (card) {
      var show = category === "all" || card.dataset.category === category;
      card.hidden = !show;
      return show;
    });
    filters.forEach(function (filter) {
      var selected = filter.dataset.galleryFilter === category;
      filter.classList.toggle("is-active", selected);
      filter.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    if (count) {
      count.textContent = category === "all"
        ? "Showing all 39 photos"
        : "Showing " + visibleCards.length + " matching photos";
    }
  }

  function showPhoto(index) {
    if (!visibleCards.length || !lightbox) return;
    activeIndex = (index + visibleCards.length) % visibleCards.length;
    var card = visibleCards[activeIndex];
    var full = card.querySelector("[data-full-src]");
    var thumb = card.querySelector("img");
    image.src = full.dataset.fullSrc;
    image.alt = thumb.alt;
    caption.textContent = thumb.alt;
    position.textContent = (activeIndex + 1) + " / " + visibleCards.length;
    if (!lightbox.open) lightbox.showModal();
  }

  filters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      applyFilter(filter.dataset.galleryFilter);
    });
  });

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      showPhoto(visibleCards.indexOf(card));
    });
  });

  document.querySelector("[data-gallery-close]")?.addEventListener("click", function () {
    lightbox.close();
  });
  document.querySelector("[data-gallery-prev]")?.addEventListener("click", function () {
    showPhoto(activeIndex - 1);
  });
  document.querySelector("[data-gallery-next]")?.addEventListener("click", function () {
    showPhoto(activeIndex + 1);
  });
  lightbox?.addEventListener("click", function (event) {
    if (event.target === lightbox) lightbox.close();
  });
  document.addEventListener("keydown", function (event) {
    if (!lightbox?.open) return;
    if (event.key === "ArrowLeft") showPhoto(activeIndex - 1);
    if (event.key === "ArrowRight") showPhoto(activeIndex + 1);
  });

  applyFilter("all");
})();
