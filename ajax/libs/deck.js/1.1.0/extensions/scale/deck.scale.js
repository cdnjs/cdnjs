/*!
Deck JS - deck.scale
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
*/

/*
This module adds automatic scaling to the deck.  Slides are scaled down
using CSS transforms to fit within the deck container. If the container is
big enough to hold the slides without scaling, no scaling occurs. The user
can disable and enable scaling with a keyboard shortcut.

Note: CSS transforms may make Flash videos render incorrectly.  Presenters
that need to use video may want to disable scaling to play them.  HTML5 video
works fine.
*/
(function($, undefined) {
  var $document = $(document);
  var $window = $(window);
  var baseHeight, timer, rootSlides;

  /*
  Internal function to do all the dirty work of scaling the slides.
  */
  var scaleDeck = function() {
    var options = $.deck('getOptions');
    var $container = $.deck('getContainer');
    var baseHeight = options.baseHeight;

    if (!baseHeight) {
      baseHeight = $container.height();
    }

    // Scale each slide down if necessary (but don't scale up)
    $.each(rootSlides, function(i, $slide) {
      var slideHeight = $slide.innerHeight();
      var $scaler = $slide.find('.' + options.classes.scaleSlideWrapper);
      var shouldScale = $container.hasClass(options.classes.scale);
      var scale = shouldScale ? baseHeight / slideHeight : 1;

      if (scale === 1) {
        $scaler.css('transform', '');
      }
      else {
        $scaler.css('transform', 'scale(' + scale + ')');
        window.setTimeout(function() {
          $container.scrollTop(0)
        }, 1);
      }
    });
  };

  var populateRootSlides = function() {
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

  var wrapRootSlideContent = function() {
    var options = $.deck('getOptions');
    var wrap = '<div class="' + options.classes.scaleSlideWrapper + '"/>';
    $.each(rootSlides, function(i, $slide) {
      $slide.children().wrapAll(wrap);
    });
  };

  var scaleOnResizeAndLoad = function() {
    var options = $.deck('getOptions');

    $window.unbind('resize.deckscale');
    $window.bind('resize.deckscale', function() {
      window.clearTimeout(timer);
      timer = window.setTimeout(scaleDeck, options.scaleDebounce);
    });
    $.deck('enableScale');
    $window.unbind('load.deckscale');
    $window.bind('load.deckscale', scaleDeck);
  };

  var bindKeyEvents = function() {
    var options = $.deck('getOptions');
    $document.unbind('keydown.deckscale');
    $document.bind('keydown.deckscale', function(event) {
      var isKey = event.which === options.keys.scale;
      isKey = isKey || $.inArray(event.which, options.keys.scale) > -1;
      if (isKey) {
        $.deck('toggleScale');
        event.preventDefault();
      }
    });
  };

  /*
  Extends defaults/options.

  options.classes.scale
    This class is added to the deck container when scaling is enabled.
    It is enabled by default when the module is included.

  options.classes.scaleSlideWrapper
    Scaling is done using a wrapper around the contents of each slide. This
    class is applied to that wrapper.

  options.keys.scale
    The numeric keycode used to toggle enabling and disabling scaling.

  options.baseHeight
    When baseHeight is falsy, as it is by default, the deck is scaled in
    proportion to the height of the deck container. You may instead specify
    a height as a number of px, and slides will be scaled against this
    height regardless of the container size.

  options.scaleDebounce
    Scaling on the browser resize event is debounced. This number is the
    threshold in milliseconds. You can learn more about debouncing here:
    http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

  */
  $.extend(true, $.deck.defaults, {
    classes: {
      scale: 'deck-scale',
      scaleSlideWrapper: 'deck-slide-scaler'
    },

    keys: {
      scale: 83 // s
    },

    baseHeight: null,
    scaleDebounce: 200
  });

  /*
  jQuery.deck('disableScale')

  Disables scaling and removes the scale class from the deck container.
  */
  $.deck('extend', 'disableScale', function() {
    $.deck('getContainer').removeClass($.deck('getOptions').classes.scale);
    scaleDeck();
  });

  /*
  jQuery.deck('enableScale')

  Enables scaling and adds the scale class to the deck container.
  */
  $.deck('extend', 'enableScale', function() {
    $.deck('getContainer').addClass($.deck('getOptions').classes.scale);
    scaleDeck();
  });

  /*
  jQuery.deck('toggleScale')

  Toggles between enabling and disabling scaling.
  */
  $.deck('extend', 'toggleScale', function() {
    var $container = $.deck('getContainer');
    var isScaled = $container.hasClass($.deck('getOptions').classes.scale);
    $.deck(isScaled? 'disableScale' : 'enableScale');
  });

  $document.bind('deck.init', function() {
    populateRootSlides();
    wrapRootSlideContent();
    scaleOnResizeAndLoad();
    bindKeyEvents();
  });
})(jQuery, 'deck', this);

