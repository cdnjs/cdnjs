/*!
Deck JS - deck.hash
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
*/

/*
This module adds deep linking to individual slides, enables internal links
to slides within decks, and updates the address bar with the hash as the user
moves through the deck. A permalink anchor is also updated. Standard themes
hide this link in browsers that support the History API, and show it for
those that do not. Slides that do not have an id are assigned one according to
the hashPrefix option. In addition to the on-slide container state class
kept by core, this module adds an on-slide state class that uses the id of each
slide.
*/
(function ($, undefined) {
  var $document = $(document);
  var $window = $(window);

  /* Collection of internal fragment links in the deck */
  var $fragmentLinks;

  /*
  Internal only function.  Given a string, extracts the id from the hash,
  matches it to the appropriate slide, and navigates there.
  */
  var goByHash = function(str) {
    var id = str.substr(str.indexOf("#") + 1);
    var slides = $.deck('getSlides');

    $.each(slides, function(i, $slide) {
      if ($slide.attr('id') === id) {
        $.deck('go', i);
        return false;
      }
    });

    // If we don't set these to 0 the container scrolls due to hashchange
    if ($.deck('getOptions').preventFragmentScroll) {
      $.deck('getContainer').scrollLeft(0).scrollTop(0);
    }
  };

  var assignSlideId = function(i, $slide) {
    var options = $.deck('getOptions');
    var currentId = $slide.attr('id');
    var previouslyAssigned = $slide.data('deckAssignedId') === currentId;
    if (!currentId || previouslyAssigned) {
      $slide.attr('id', options.hashPrefix + i);
      $slide.data('deckAssignedId', options.hashPrefix + i);
    }
  };

  var removeContainerStateClass = function(id) {
    var options = $.deck('getOptions');
    $.deck('getContainer').removeClass(options.classes.onPrefix + id);
  };

  var addContainerStateClass = function(id) {
    var options = $.deck('getOptions');
    $.deck('getContainer').addClass(options.classes.onPrefix + id);
  };

  /*
  Extends defaults/options.

  options.selectors.hashLink
    The element matching this selector has its href attribute updated to
    the hash of the current slide as the user navigates through the deck.

  options.hashPrefix
    Every slide that does not have an id is assigned one at initialization.
    Assigned ids take the form of hashPrefix + slideIndex, e.g., slide-0,
    slide-12, etc.

  options.preventFragmentScroll
    When deep linking to a hash of a nested slide, this scrolls the deck
    container to the top, undoing the natural browser behavior of scrolling
    to the document fragment on load.
  */
  $.extend(true, $.deck.defaults, {
    selectors: {
      hashLink: '.deck-permalink'
    },

    hashPrefix: 'slide-',
    preventFragmentScroll: true
  });


  $document.bind('deck.init', function() {
    var options = $.deck('getOptions');
    var slides = $.deck('getSlides');

    $fragmentLinks = $();
    $.each(slides, function(i, $slide) {
      var hash;

      assignSlideId(i, $slide);
      hash = '#' + $slide.attr('id');
      if (hash === window.location.hash) {
        setTimeout(function() {
          $.deck('go', i);
        }, 1);
      }
      $fragmentLinks = $fragmentLinks.add('a[href="' + hash + '"]');
    });

    /* Set up first id container state class */
    if (slides.length) {
      addContainerStateClass($.deck('getSlide').attr('id'));
    };
  });

  /* Update permalink, address bar, and state class on a slide change */
  $document.bind('deck.change', function(event, from, to) {
    var hash = '#' + $.deck('getSlide', to).attr('id');
    var hashPath = window.location.href.replace(/#.*/, '') + hash;
    var options = $.deck('getOptions');

    removeContainerStateClass($.deck('getSlide', from).attr('id'));
    addContainerStateClass($.deck('getSlide', to).attr('id'));
    $(options.selectors.hashLink).attr('href', hashPath);
    if (Modernizr.history) {
      window.history.replaceState({}, "", hashPath);
    }
  });

  $window.bind('hashchange.deckhash', function(event) {
    if (event.originalEvent && event.originalEvent.newURL) {
      goByHash(event.originalEvent.newURL);
    }
    else {
      goByHash(window.location.hash);
    }
  })

  $window.bind('load', function() {
    if ($.deck('getOptions').preventFragmentScroll) {
      $.deck('getContainer').scrollLeft(0).scrollTop(0);
    }
  });
})(jQuery);