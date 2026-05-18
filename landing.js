/* Just Real Health Facts — landing page interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';

  /* ---- Stats count-up on scroll into view ---- */
  function countUp(el) {
    var target = parseFloat(el.dataset.target) || 0;
    var suffix = el.dataset.suffix || '';
    var duration = 1400;
    var startTime = null;

    function frame(now) {
      if (startTime === null) startTime = now;
      var progress = Math.min((now - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(frame);
  }

  var statEls = document.querySelectorAll('.num[data-target]');
  if ('IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(function (el) { statObserver.observe(el); });
  } else {
    statEls.forEach(function (el) {
      el.textContent = (el.dataset.target || '') + (el.dataset.suffix || '');
    });
  }

  /* ---- Reveal elements on scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---- Category filter tabs ---- */
  var tabs = document.querySelectorAll('.tab');
  var cards = document.querySelectorAll('.acard');
  var emptyMsg = document.querySelector('.empty-cat');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var category = tab.dataset.category;
      var visible = 0;

      cards.forEach(function (card) {
        var match = category === 'all' || card.dataset.category === category;
        card.classList.toggle('is-hidden', !match);
        if (match) visible++;
      });

      if (emptyMsg) {
        emptyMsg.style.display = visible === 0 ? 'block' : 'none';
      }
    });
  });
})();
