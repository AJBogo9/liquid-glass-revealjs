/**
 * liquid-glass — a RevealJS plugin
 *
 * Wraps each content slide's children in a .glass-panel div.
 * Toggles .lg-blur-active on the viewport so the blurred background
 * layer fades in on content slides and out on the title slide.
 */
var LiquidGlass = function () {
  return {
    id: 'liquid-glass',

    init: function (deck) {
      var viewport = document.querySelector('.reveal-viewport');

      // Inject the blurred background layer once
      var blurBg = document.createElement('div');
      blurBg.className = 'lg-blurred-bg';
      viewport.insertBefore(blurBg, viewport.firstChild);

      function isTitle(section) {
        return !section ||
          section.id === 'title-slide' ||
          section.classList.contains('quarto-title-block');
      }

      function wrapSection(section) {
        if (section.querySelector('.glass-panel')) return;
        var panel = document.createElement('div');
        panel.className = 'glass-panel';
        Array.from(section.childNodes).forEach(function (node) {
          panel.appendChild(node);
        });
        section.appendChild(panel);
      }

      function wrapSlides() {
        deck.getSlides().forEach(function (section) {
          if (isTitle(section)) return;
          wrapSection(section);
        });

        var titleSection = document.getElementById('title-slide');
        if (titleSection) wrapSection(titleSection);
      }

      function updateBackground() {
        var current = deck.getCurrentSlide();
        viewport.classList.toggle('lg-blur-active', !isTitle(current));
      }

      wrapSlides();
      updateBackground();

      deck.on('slidechanged', function () {
        wrapSlides();
        updateBackground();
      });
    }
  };
};
