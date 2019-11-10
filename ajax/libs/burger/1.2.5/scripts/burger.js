(function() {
  'use strict';

  var burgerContain = document.getElementsByClassName('burger-contain')[0],
    burgerNav = document.getElementsByClassName('burger-nav')[0],
    burgerBrand = document.getElementsByClassName('burger-brand')[0];

  burgerContain.onclick = function() {
    toggleClass('open', burgerNav);
    if (burgerNav.style.display === 'block') {
      fadeOut(burgerNav);
    } else {
      fadeIn(burgerNav);
    }
    toggleClass('open', burgerContain);
    toggleClass('open', burgerBrand);
  };

  function toggleClass(className, el) {
    var current = el.className.split(/\s+/),
      exist = ~current.indexOf(className);
    el.className = (exist ? (current.splice(-exist >> 1, 1), current) : current.concat([className])).join(' ');
  }

  function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
      if ((el.style.opacity -= 0.11) < 0) {
        el.style.display = 'none';
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  function fadeIn(el) {
    el.style.opacity = 0;
    el.style.display = 'block';

    (function fade() {
      var val = parseFloat(el.style.opacity);
      if ((val += 0.1) <= 1) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }

})();
