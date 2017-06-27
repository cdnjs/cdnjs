/*!
Deck JS - deck.status
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
*/

/*
This module adds a (current)/(total) style status indicator to the deck.
*/
(function($, undefined) {
  var $document = $(document);
  var rootCounter;

  var updateCurrent = function(event, from, to) {
    var options = $.deck('getOptions');
    var currentSlideNumber = to + 1;
    if (!options.countNested) {
      currentSlideNumber = $.deck('getSlide', to).data('rootSlide');
    }
    $(options.selectors.statusCurrent).text(currentSlideNumber);
  };

  var markRootSlides = function() {
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

    rootCounter = 0;
    $.each($.deck('getSlides'), function(i, $slide) {
      var $parentSlides = $slide.parentsUntil(
        options.selectors.container,
        slideTest
      );

      if ($parentSlides.length) {
        $slide.data('rootSlide', $parentSlides.last().data('rootSlide'));
      }
      else {
        ++rootCounter;
        $slide.data('rootSlide', rootCounter);
      }
    });
  };

  var setInitialSlideNumber = function() {
    var slides = $.deck('getSlides');
    var $currentSlide = $.deck('getSlide');
    var index;

    $.each(slides, function(i, $slide) {
      if ($slide === $currentSlide) {
        index = i;
        return false;
      }
    });
    updateCurrent(null, index, index);
  };

  var setTotalSlideNumber = function() {
    var options = $.deck('getOptions');
    var slides = $.deck('getSlides');

    if (options.countNested) {
      $(options.selectors.statusTotal).text(slides.length);
    }
    else {
      $(options.selectors.statusTotal).text(rootCounter);
    }
  };

  /*
  Extends defaults/options.

  options.selectors.statusCurrent
    The element matching this selector displays the current slide number.

  options.selectors.statusTotal
    The element matching this selector displays the total number of slides.

  options.countNested
    If false, only top level slides will be counted in the current and
    total numbers.
  */
  $.extend(true, $.deck.defaults, {
    selectors: {
      statusCurrent: '.deck-status-current',
      statusTotal: '.deck-status-total'
    },

    countNested: true
  });

  $document.bind('deck.init', function() {
    markRootSlides();
    setInitialSlideNumber();
    setTotalSlideNumber();
  });
  $document.bind('deck.change', updateCurrent);
})(jQuery, 'deck');

