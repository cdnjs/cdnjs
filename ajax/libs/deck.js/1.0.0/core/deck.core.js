/*!
Deck JS - deck.core
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
*/

/*
The deck.core module provides all the basic functionality for creating and
moving through a deck.  It does so by applying classes to indicate the state of
the deck and its slides, allowing CSS to take care of the visual representation
of each state.  It also provides methods for navigating the deck and inspecting
its state, as well as basic key bindings for going to the next and previous
slides.  More functionality is provided by wholly separate extension modules
that use the API provided by core.
*/
(function($, undefined) {
  var slides, currentIndex, $container;

  var events = {
    /*
    This event fires at the beginning of a slide change, before the actual
    change occurs. Its purpose is to give extension authors a way to prevent
    the slide change from occuring. This is done by calling preventDefault
    on the event object within this event. If that is done, the deck.change
    event will never be fired and the slide will not change.
    */
    beforeChange: 'deck.beforeChange',

    /*
    This event fires whenever the current slide changes, whether by way of
    next, prev, or go. The callback function is passed two parameters, from
    and to, equal to the indices of the old slide and the new slide
    respectively. If preventDefault is called on the event within this handler
    the slide change does not occur.

    $(document).bind('deck.change', function(event, from, to) {
       alert('Moving from slide ' + from + ' to ' + to);
    });
    */
    change: 'deck.change',

    /*
    This event fires at the beginning of deck initialization, after the options
    are set but before the slides array is created.  This event makes a good hook
    for preprocessing extensions looking to modify the deck.
    */
    beforeInitialize: 'deck.beforeInit',

    /*
    This event fires at the end of deck initialization. Extensions should
    implement any code that relies on user extensible options (key bindings,
    element selectors, classes) within a handler for this event. Native
    events associated with Deck JS should be scoped under a .deck event
    namespace, as with the example below:

    var $d = $(document);
    $.deck.defaults.keys.myExtensionKeycode = 70; // 'h'
    $d.bind('deck.init', function() {
       $d.bind('keydown.deck', function(event) {
          if (event.which === $.deck.getOptions().keys.myExtensionKeycode) {
             // Rock out
          }
       });
    });
    */
    initialize: 'deck.init'
  };

  var options = {};
  var $document = $(document);
  var stopPropagation = function(event) {
    event.stopPropagation();
  };

  var updateContainerState = function() {
    var oldIndex = $container.data('onSlide');
    $container.removeClass(options.classes.onPrefix + oldIndex);
    $container.addClass(options.classes.onPrefix + currentIndex);
    $container.data('onSlide', currentIndex);
  };

  var updateChildCurrent = function() {
    var $oldCurrent = $('.' + options.classes.current);
    var $oldParents = $oldCurrent.parentsUntil(options.selectors.container);
    var $newCurrent = slides[currentIndex];
    var $newParents = $newCurrent.parentsUntil(options.selectors.container);
    $oldParents.removeClass(options.classes.childCurrent);
    $newParents.addClass(options.classes.childCurrent);
  };

  var removeOldSlideStates = function() {
    var $all = $();
    $.each(slides, function(i, el) {
      $all = $all.add(el);
    });
    $all.removeClass([
      options.classes.before,
      options.classes.previous,
      options.classes.current,
      options.classes.next,
      options.classes.after
    ].join(' '));
  };

  var addNewSlideStates = function() {
    slides[currentIndex].addClass(options.classes.current);
    if (currentIndex > 0) {
      slides[currentIndex-1].addClass(options.classes.previous);
    }
    if (currentIndex + 1 < slides.length) {
      slides[currentIndex+1].addClass(options.classes.next);
    }
    if (currentIndex > 1) {
      $.each(slides.slice(0, currentIndex - 1), function(i, $slide) {
        $slide.addClass(options.classes.before);
      });
    }
    if (currentIndex + 2 < slides.length) {
      $.each(slides.slice(currentIndex+2), function(i, $slide) {
        $slide.addClass(options.classes.after);
      });
    }
  };

  var updateStates = function() {
    updateContainerState();
    updateChildCurrent();
    removeOldSlideStates();
    addNewSlideStates();
  };

  var initSlidesArray = function(elements) {
    if ($.isArray(elements)) {
      $.each(elements, function(i, element) {
        slides.push($(element));
      });
    }
    else {
      $(elements).each(function(i, element) {
        slides.push($(element));
      });
    }
  };

  var bindKeyEvents = function() {
    var editables = [
      'input',
      'textarea',
      'select',
      'button',
      'meter',
      'progress',
      '[contentEditable]'
    ].join(', ');

    $document.unbind('keydown.deck').bind('keydown.deck', function(event) {
      var isNext = event.which === options.keys.next;
      var isPrev = event.which === options.keys.previous;
      isNext = isNext || $.inArray(event.which, options.keys.next) > -1;
      isPrev = isPrev || $.inArray(event.which, options.keys.previous) > -1;

      if (isNext) {
        methods.next();
        event.preventDefault();
      }
      else if (isPrev) {
        methods.prev();
        event.preventDefault();
      }
    });

    $document.undelegate(editables, 'keydown.deck', stopPropagation);
    $document.delegate(editables, 'keydown.deck', stopPropagation);
  };

  var bindTouchEvents = function() {
    var startTouch;

    $container.unbind('touchstart.deck');
    $container.bind('touchstart.deck', function(event) {
      if (!startTouch) {
        startTouch = $.extend({}, event.originalEvent.targetTouches[0]);
      }
    });

    $container.unbind('touchmove.deck');
    $container.bind('touchmove.deck', function(event) {
      $.each(event.originalEvent.changedTouches, function(i, touch) {
        if (!startTouch || touch.identifier !== startTouch.identifier) {
          return true;
        }
        var xDistance = touch.screenX - startTouch.screenX;
        var yDistance = touch.screenY - startTouch.screenY;
        var swipedLeftToRight = xDistance > options.touch.swipeTolerance;
        var swipedRightToLeft = xDistance < -options.touch.swipeTolerance;
        var swipedTopToBottom = yDistance > options.touch.swipeTolerance;
        var swipedBottomToTop = yDistance < -options.touch.swipeTolerance;

        if (swipedLeftToRight || swipedTopToBottom) {
          $.deck('prev');
          startTouch = undefined;
        }
        else if (swipedRightToLeft || swipedBottomToTop) {
          $.deck('next');
          startTouch = undefined;
        }
        return false;
      });
      event.preventDefault();
    });

    $container.unbind('touchend.deck');
    $container.bind('touchend.deck', function(event) {
      $.each(event.originalEvent.changedTouches, function(i, touch) {
        if (startTouch && touch.identifier === startTouch.identifier) {
          startTouch = undefined;
        }
      });
    });
  };

  /*
      Kick iframe videos, which dont like to redraw w/ transforms.
      Remove this if Webkit ever fixes it.
       */
  var hackWebkitIframes = function() {
    $.each(slides, function(i, $slide) {
      $slide.unbind('webkitTransitionEnd.deck');
      $slide.bind('webkitTransitionEnd.deck', function(event) {
        if ($el.hasClass($.deck('getOptions').classes.current)) {
          var embeds = $(this).find('iframe').css('opacity', 0);
          window.setTimeout(function() {
            embeds.css('opacity', 1);
          }, 100);
        }
      });
    });
  };

  var indexInBounds = function(index) {
    return typeof index === 'number' && index >=0 && index < slides.length;
  };

  /* Methods exposed in the jQuery.deck namespace */
  var methods = {

    /*
    jQuery.deck(selector, options)

    selector: string | jQuery | array
    options: object, optional

    Initializes the deck, using each element matched by selector as a slide.
    May also be passed an array of string selectors or jQuery objects, in
    which case each selector in the array is considered a slide. The second
    parameter is an optional options object which will extend the default
    values.

    $.deck('.slide');

    or

    $.deck([
       '#first-slide',
       '#second-slide',
       '#etc'
    ]);
    */
    init: function(elements, opts) {
      options = $.extend(true, {}, $.deck.defaults, opts);
      slides = [];
      currentIndex = 0;
      $container = $(options.selectors.container);
      tolerance = options.touch.swipeTolerance;

      // Pre init event for preprocessing hooks
      $document.trigger(events.beforeInitialize);

      // Hide the deck while states are being applied to kill transitions
      $container.addClass(options.classes.loading);

      initSlidesArray(elements);
      bindKeyEvents();
      bindTouchEvents();
      // hackWebkitIframes();
      $container.scrollLeft(0).scrollTop(0);

      if (slides.length) {
        updateStates();
      }

      // Show deck again now that slides are in place
      $container.removeClass(options.classes.loading);
      $document.trigger(events.initialize);
    },

    /*
    jQuery.deck('go', index)

    index: integer | string

    Moves to the slide at the specified index if index is a number. Index is
    0-based, so $.deck('go', 0); will move to the first slide. If index is a
    string this will move to the slide with the specified id. If index is out
    of bounds or doesn't match a slide id the call is ignored.
    */
    go: function(indexOrId) {
      var beforeChangeEvent = $.Event(events.beforeChange);
      var index;

      /* Number index, easy. */
      if (indexInBounds(indexOrId)) {
        index = indexOrId;
      }
      /* Id string index, search for it and set integer index */
      else if (typeof indexOrId === 'string') {
        $.each(slides, function(i, $slide) {
          if ($slide.attr('id') === indexOrId) {
            index = i;
            return false;
          }
        });
      }
      if (typeof index === 'undefined') {
        return;
      }

      /* Trigger beforeChange. If nothing prevents the change, trigger
      the slide change. */
      $document.trigger(beforeChangeEvent, [currentIndex, index]);
      if (!beforeChangeEvent.isDefaultPrevented()) {
        $document.trigger(events.change, [currentIndex, index]);
        currentIndex = index;
        updateStates();
      }
    },

    /*
    jQuery.deck('next')

    Moves to the next slide. If the last slide is already active, the call
    is ignored.
    */
    next: function() {
      methods.go(currentIndex+1);
    },

    /*
    jQuery.deck('prev')

    Moves to the previous slide. If the first slide is already active, the
    call is ignored.
    */
    prev: function() {
      methods.go(currentIndex-1);
    },

    /*
    jQuery.deck('getSlide', index)

    index: integer, optional

    Returns a jQuery object containing the slide at index. If index is not
    specified, the current slide is returned.
    */
    getSlide: function(index) {
      index = typeof index !== 'undefined' ? index : currentIndex;
      if (!indexInBounds(index)) {
        return null;
      }
      return slides[index];
    },

    /*
    jQuery.deck('getSlides')

    Returns all slides as an array of jQuery objects.
    */
    getSlides: function() {
      return slides;
    },

    /*
    jQuery.deck('getContainer')

    Returns a jQuery object containing the deck container as defined by the
    container option.
    */
    getContainer: function() {
      return $container;
    },

    /*
    jQuery.deck('getOptions')

    Returns the options object for the deck, including any overrides that
    were defined at initialization.
    */
    getOptions: function() {
      return options;
    },

    /*
    jQuery.deck('extend', name, method)

    name: string
    method: function

    Adds method to the deck namespace with the key of name. This doesn’t
    give access to any private member data — public methods must still be
    used within method — but lets extension authors piggyback on the deck
    namespace rather than pollute jQuery.

    $.deck('extend', 'alert', function(msg) {
       alert(msg);
    });

    // Alerts 'boom'
    $.deck('alert', 'boom');
    */
    extend: function(name, method) {
      methods[name] = method;
    }
  };

  /* jQuery extension */
  $.deck = function(method, arg) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (methods[method]) {
      return methods[method].apply(this, args);
    }
    else {
      return methods.init(method, arg);
    }
  };

  /*
  The default settings object for a deck. All deck extensions should extend
  this object to add defaults for any of their options.

  options.classes.after
    This class is added to all slides that appear after the 'next' slide.

  options.classes.before
    This class is added to all slides that appear before the 'previous'
    slide.

  options.classes.childCurrent
    This class is added to all elements in the DOM tree between the
    'current' slide and the deck container. For standard slides, this is
    mostly seen and used for nested slides.

  options.classes.current
    This class is added to the current slide.

  options.classes.loading
    This class is applied to the deck container during loading phases and is
    primarily used as a way to short circuit transitions between states
    where such transitions are distracting or unwanted.  For example, this
    class is applied during deck initialization and then removed to prevent
    all the slides from appearing stacked and transitioning into place
    on load.

  options.classes.next
    This class is added to the slide immediately following the 'current'
    slide.

  options.classes.onPrefix
    This prefix, concatenated with the current slide index, is added to the
    deck container as you change slides.

  options.classes.previous
    This class is added to the slide immediately preceding the 'current'
    slide.

  options.selectors.container
    Elements matched by this CSS selector will be considered the deck
    container. The deck container is used to scope certain states of the
    deck, as with the onPrefix option, or with extensions such as deck.goto
    and deck.menu.

  options.keys.next
    The numeric keycode used to go to the next slide.

  options.keys.previous
    The numeric keycode used to go to the previous slide.

  options.touch.swipeTolerance
    The number of pixels the users finger must travel to produce a swipe
    gesture.
  */
  $.deck.defaults = {
    classes: {
      after: 'deck-after',
      before: 'deck-before',
      childCurrent: 'deck-child-current',
      current: 'deck-current',
      loading: 'deck-loading',
      next: 'deck-next',
      onPrefix: 'on-slide-',
      previous: 'deck-previous'
    },

    selectors: {
      container: '.deck-container'
    },

    keys: {
      // enter, space, page down, right arrow, down arrow,
      next: [13, 32, 34, 39, 40],
      // backspace, page up, left arrow, up arrow
      previous: [8, 33, 37, 38]
    },

    touch: {
      swipeTolerance: 60
    }
  };

  $document.ready(function() {
    $('html').addClass('ready');
  });
})(jQuery);
