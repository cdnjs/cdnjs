(function() {
  'use strict';

  var body = document.body;
  var burgerContain = document.getElementsByClassName('burger-contain')[0];
  var burgerNav = document.getElementsByClassName('burger-nav')[0];
  var burgerBrand = document.getElementsByClassName('burger-brand')[0];

  burgerContain.addEventListener('click', function toggleClasses() {
    [body, burgerContain, burgerNav, burgerBrand].forEach(function (el) {
      el.classList.toggle('open');
    });
  }, false);
})();
