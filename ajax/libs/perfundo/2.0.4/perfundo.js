/**
 * perfundo - a pure CSS lightbox
 * @author Markus Oberlehner https://perfundo.oberlehner.net/
 *
 * Parts of this file are copied from the code of the great awesomeplete
 * autocomplete widget by Lea Verou (http://leaverou.github.io/awesomplete)
 */

(function () {
  var _ = function (element, o) {
    var me = this;

    // Make it possible to initialize perfundo on multiple elements at once.
    if (typeof element === 'string' && $$(element).length > 1) {
      var object = [];
      $$(element).forEach(function (element) {
        object.push(new _(element, o));
      });
      return object;
    }

    me.element = $(element);
    me.options = {};

    // Return an empty object if the element does not exist.
    if (!me.element) {
      return {};
    }

    o = o || {};

    configure(me, {
      disableHistory: false,
      swipe: true,
      classNames: {
        link: 'perfundo__link',
        overlay: 'perfundo__overlay',
        content: 'perfundo__content',
        close: 'perfundo__close',
        prev: 'perfundo__prev',
        next: 'perfundo__next',
        untarget: 'perfundo__untarget',
        active: 'is-active'
      }
    }, o);

    $.bind($$('.' + me.options.classNames.link, me.element), {
      click: function (e) {
        if (me.options.disableHistory) {
          e.preventDefault();
        }
        me.open(this.getAttribute('href'));
      }
    });

    $.bind(me.element, {
      click: function (e) {
        if (e.target.classList.contains(me.options.classNames.close) || e.target.classList.contains(me.options.classNames.overlay)) {
          if (me.options.disableHistory) {
            e.preventDefault();
          }
          me.close();
        }
      }
    });

    if (me.options.swipe) {
      // Initialize swipe detection variables.
      var touchStartX = 0;
      var touchStartY = 0;
      var touchEndX = 0;
      var touchEndY = 0;
      // Store the swipe distance.
      var swipeDistanceX;
      var swipeDistanceY;
      // Min X distance to count as horizontal swipe.
      var swipeMinX = 50;
      // Max Y distance to still count as horizontal swipe.
      var swipeMaxY = 60;

      $.bind($$('.' + me.options.classNames.content, me.element), {
        touchstart: function (e) {
          // Save touchstart coordinates.
          touchStartX = e.changedTouches[0].clientX;
          touchStartY = e.changedTouches[0].clientY;
        },
        touchend: function (e) {
          // Save touchend coordinates.
          touchEndX = e.changedTouches[0].clientX;
          touchEndY = e.changedTouches[0].clientY;
          // Calculate swipe distances.
          swipeDistanceX = touchStartX - touchEndX;
          swipeDistanceY = touchStartY - touchEndY;
          // Check if touch gesture was a swipe.
          if ((Math.abs(swipeDistanceX) >= swipeMinX) && (Math.abs(swipeDistanceY) <= swipeMaxY)) {
            if (swipeDistanceX > swipeMinX) {
              me.next();
            }
            else {
              me.prev();
            }
          }
          // Reset variables to be ready to detect the next swipe.
          touchStartX = 0;
          touchStartY = 0;
          touchEndX = 0;
          touchEndY = 0;
          swipeDistanceX = null;
          swipeDistanceY = null;
        }
      });
    }
  };

  _.prototype = {
    open: function (overlay) {
      var me = this;
      var overlay = $(overlay);
      me.close();
      overlay.classList.add(me.options.classNames.active);
    },
    close: function () {
      var me = this;
      $$('.' + me.options.classNames.overlay + '.' + me.options.classNames.active, me.element).forEach(function (overlay) {
        overlay.classList.remove(me.options.classNames.active);
      });
    },
    next: function () {
      var me = this;
      var nextLink = $('.' + me.options.classNames.next, me.element);
      if (nextLink) {
        nextLink.click();
      }
    },
    prev: function () {
      var me = this;
      var prevLink = $('.' + me.options.classNames.prev, me.element);
      if (prevLink) {
        prevLink.click();
      }
    }
  };

  // Private functions.
  function configure(instance, properties, o) {
    for (var i in properties) {
      var initial = properties[i];
      var attrValue = instance.element.getAttribute('data-' + i.toLowerCase());

      if (typeof initial === 'number') {
        instance.options[i] = parseInt(attrValue);
      }
      else if (initial === false) {
        instance.options[i] = attrValue !== null;
      }
      else if (initial instanceof Function) {
        instance.options[i] = null;
      }
      else {
        instance.options[i] = attrValue;
      }

      if (!instance.options[i] && instance.options[i] !== 0) {
        instance.options[i] = (i in o) ? o[i] : initial;
      }
    }
  }

  // Helpers.
  var slice = Array.prototype.slice;

  function $(expr, con) {
    return typeof expr === 'string' ? (con || document).querySelector(expr) : expr || null;
  }

  function $$(expr, con) {
    return slice.call((con || document).querySelectorAll(expr));
  }

  $.bind = function(elements, o) {
    if (elements) {
      elements = elements.length ? elements : [elements];
      elements.forEach(function (element) {
        for (var event in o) {
          var callback = o[event];
          event.split(/\s+/).forEach(function (event) {
            element.addEventListener(event, callback);
          });
        }
      });
    }
  };

  _.$ = $;
  _.$$ = $$;

  // Make sure to export perfundo on self when in a browser.
  if (typeof self !== 'undefined') {
    self.perfundo = _;
  }

  // Expose perfundo as a CJS module.
  if (typeof module === 'object' && module.exports) {
    module.exports = _;
  }

  return _;
}());
