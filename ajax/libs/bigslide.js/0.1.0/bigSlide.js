/*! bigSlide - v0.1.0-alpha - 2013-10-27
* https://github.com/ascott1/bigSlide.js
* Copyright (c) 2013 Adam D. Scott; Licensed MIT */
(function($) {
  'use strict';

  $.fn.bigSlide = function(options) {

    var settings = $.extend({
      'menu': ('#menu'),
      'push': ('.push'),
      'menuWidth': '15.625em',
      'speed': '300'
    }, options);

    var menuLink = this,
        menu = $(settings.menu),
        push = $(settings.push),
        width = settings.menuWidth;

    var positionOffScreen = {
      'position': 'fixed',
      'top': '0',
      'bottom': '0',
      'left': '-' + settings.menuWidth,
      'width': settings.menuWidth,
      'height': '100%'
    };

    var animateSlide = {
      '-webkit-transition': 'left ' + settings.speed + 'ms ease',
      '-moz-transition': 'left ' + settings.speed + 'ms ease',
      '-ms-transition': 'left ' + settings.speed + 'ms ease',
      '-o-transition': 'left ' + settings.speed + 'ms ease',
      'transition': 'left ' + settings.speed + 'ms ease'
    };

    menu.css(positionOffScreen);

    menuLink.on('click.bigSlide', function() {

      menu.css(animateSlide);
      push.css(animateSlide);

      menu.toggleClass('slide');
      push.toggleClass('slide');

      if (menu.hasClass('slide') === true) {
        menu.css('left', '0');
      } else {
        menu.css('left', '-' + width);
      }

      if (push.hasClass('slide') === true) {
        push.css('left', width);
      } else {
        push.css('left', '0');
      }


      return false;
    });

  };

}(jQuery));