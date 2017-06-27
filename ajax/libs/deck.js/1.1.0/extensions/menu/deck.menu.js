/*!
Deck JS - deck.menu
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
*/

/*
This module adds the methods and key binding to show and hide a menu of all
slides in the deck. The deck menu state is indicated by the presence of a class
on the deck container.
*/
(function($, undefined) {
  var $document = $(document);
  var $html = $('html');
  var rootSlides;

  var populateRootSlidesArray = function() {
    var options = $.deck('getOptions');
    var slideTest = $.map([
      options.classes.before,
      options.classes.previous,
      options.classes.current,
      options.classes.next,
      options.classes.after
    ], function(el, i) {
      return '.' + el;
    }).join(', ');

    rootSlides = [];
    $.each($.deck('getSlides'), function(i, $slide) {
      var $parentSlides = $slide.parentsUntil(
        options.selectors.container,
        slideTest
      );
      if (!$parentSlides.length) {
        rootSlides.push($slide);
      }
    });
  };

  var bindKeyEvents = function() {
    var options = $.deck('getOptions');
    $document.unbind('keydown.deckmenu');
    $document.bind('keydown.deckmenu', function(event) {
      var isMenuKey = event.which === options.keys.menu;
      isMenuKey = isMenuKey || $.inArray(event.which, options.keys.menu) > -1;
      if (isMenuKey && !event.ctrlKey) {
        $.deck('toggleMenu');
        event.preventDefault();
      }
    });
  };

  var bindTouchEvents = function() {
    var $container = $.deck('getContainer');
    var options = $.deck('getOptions');
    var touchEndTime = 0;
    var currentSlide;

    $container.unbind('touchstart.deckmenu');
    $container.bind('touchstart.deckmenu', function() {
      currentSlide = $.deck('getSlide');
    });
    $container.unbind('touchend.deckmenu');
    $container.bind('touchend.deckmenu', function(event) {
      var now = Date.now();
      var isDoubletap = now - touchEndTime < options.touch.doubletapWindow;

      // Ignore this touch event if it caused a nav change (swipe)
      if (currentSlide !== $.deck('getSlide')) {
        return;
      }
      if (isDoubletap) {
        $.deck('toggleMenu');
        event.preventDefault();
      }
      touchEndTime = now;
    });
  };

  var setupMenuSlideSelection = function() {
    var options = $.deck('getOptions');

    $.each($.deck('getSlides'), function(i, $slide) {
      $slide.unbind('click.deckmenu');
      $slide.bind('click.deckmenu', function(event) {
        if (!$.deck('getContainer').hasClass(options.classes.menu)) {
          return;
        }
        $.deck('go', i);
        $.deck('hideMenu');
        event.stopPropagation();
        event.preventDefault();
      });
    });
  };

  /*
  Extends defaults/options.

  options.classes.menu
    This class is added to the deck container when showing the slide menu.

  options.keys.menu
    The numeric keycode used to toggle between showing and hiding the slide
    menu.

  options.touch.doubletapWindow
    Two consecutive touch events within this number of milliseconds will
    be considered a double tap, and will toggle the menu on touch devices.
  */
  $.extend(true, $.deck.defaults, {
    classes: {
      menu: 'deck-menu'
    },

    keys: {
      menu: 77 // m
    },

    touch: {
      doubletapWindow: 400
    }
  });

  /*
  jQuery.deck('showMenu')

  Shows the slide menu by adding the class specified by the menu class option
  to the deck container.
  */
  $.deck('extend', 'showMenu', function() {
    var $container = $.deck('getContainer');
    var options = $.deck('getOptions');

    if ($container.hasClass(options.classes.menu)) {
      return;
    }

    // Hide through loading class to short-circuit transitions (perf)
    $container.addClass([
      options.classes.loading,
      options.classes.menu
    ].join(' '));

    /* Forced to do this in JS until CSS learns second-grade math. Save old
    style value for restoration when menu is hidden. */
    if (Modernizr.csstransforms) {
      $.each(rootSlides, function(i, $slide) {
        $slide.data('oldStyle', $slide.attr('style'));
        $slide.css({
          'position': 'absolute',
          'left': ((i % 4) * 25) + '%',
          'top': (Math.floor(i / 4) * 25) + '%'
        });
      });
    }

    // Need to ensure the loading class renders first, then remove
    window.setTimeout(function() {
      $container.removeClass(options.classes.loading);
      $container.scrollTop($.deck('getSlide').position().top);
    }, 0);
  });

  /*
  jQuery.deck('hideMenu')

  Hides the slide menu by removing the class specified by the menu class
  option from the deck container.
  */
  $.deck('extend', 'hideMenu', function() {
    var $container = $.deck('getContainer');
    var options = $.deck('getOptions');

    if (!$container.hasClass(options.classes.menu)) {
      return;
    }

    $container.removeClass(options.classes.menu);
    $container.addClass(options.classes.loading);

    /* Restore old style value */
    if (Modernizr.csstransforms) {
      $.each(rootSlides, function(i, $slide) {
        var oldStyle = $slide.data('oldStyle');
        $slide.attr('style', oldStyle ? oldStyle : '');
      });
    }

    window.setTimeout(function() {
      $container.removeClass(options.classes.loading);
      $container.scrollTop(0);
    }, 0);
  });

  /*
  jQuery.deck('toggleMenu')

  Toggles between showing and hiding the slide menu.
  */
  $.deck('extend', 'toggleMenu', function() {
    $.deck('getContainer').hasClass($.deck('getOptions').classes.menu) ?
    $.deck('hideMenu') : $.deck('showMenu');
  });

  $document.bind('deck.init', function() {
    populateRootSlidesArray();
    bindKeyEvents();
    bindTouchEvents();
    setupMenuSlideSelection();
  });

  $document.bind('deck.change', function(event, from, to) {
    var $container = $.deck('getContainer');
    var containerScroll, slideTop;

    if ($container.hasClass($.deck('getOptions').classes.menu)) {
      containerScroll = $container.scrollTop();
      slideTop = $.deck('getSlide', to).position().top;
      $container.scrollTop(containerScroll + slideTop);
    }
  });
})(jQuery);
