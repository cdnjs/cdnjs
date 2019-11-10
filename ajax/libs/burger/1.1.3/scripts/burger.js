'use strict';

$(document).ready(function () {

  var burgerNav = $('.burger-nav'),
  burgerItem = burgerNav.find('li'),
  burgerBrand = $('.burger-brand'),
  isNavOpen = false,
  burgerContain = $('.burger-contain');

  burgerContain.click(function () {
    burgerNav.fadeToggle(400);

		if (isNavOpen === false) {
			isNavOpen = true;
      burgerNav.addClass('open');
      burgerContain.addClass('open');
      burgerBrand.addClass('open');
			openNav();

		} else {
			isNavOpen = false;
      burgerNav.removeClass('open');
      burgerContain.removeClass('open');
      burgerBrand.removeClass('open');
			closeNav();
		}
  });

  function openNav() {
    var transformDelay = 0;

    for (var i = 0; i < burgerItem.length; i++) {
      $(burgerItem[i]).velocity({
          opacity: [1, 0],
          translateX: [0, -250],
          translateZ: [0, -100]
        }, {
          duration: 400,
          delay: transformDelay,
          easing: 'ease',
        });
      transformDelay += 50;
    }
  }

  function closeNav() {

    var transformDelay = 0;

    for (var i = burgerItem.length - 1; i >= 0; i--) {
      $(burgerItem[i]).velocity({
        opacity: 0,
        translateX: -250,
        translateZ: -100,
      }, {
        duration: 400,
        delay: transformDelay,
        easing: 'ease',
      });

      transformDelay += 50;
    }

  }
});
