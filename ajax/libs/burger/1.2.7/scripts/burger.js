(function() {
  'use strict';

  var body = document.body;
  var burgerContain = document.getElementsByClassName('burger-contain')[0];
  var burgerNav = document.getElementsByClassName('burger-nav')[0];
  var burgerBrand = document.getElementsByClassName('burger-brand')[0];

  burgerContain.onclick = function() {
    body.classList.toggle('open');
    burgerContain.classList.toggle('open');
    burgerNav.classList.toggle('open');
    burgerBrand.classList.toggle('open');
  };
})();
