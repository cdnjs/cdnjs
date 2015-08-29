/*
 *  Remodal - v0.6.3
 *  Flat, responsive, lightweight, easy customizable modal window plugin with declarative state notation and hash tracking.
 *  http://vodkabears.github.io/remodal/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */
!(function($) {
  'use strict';

  /**
   * Name of the plugin
   * @private
   * @type {String}
   */
  var pluginName = 'remodal';

  /**
   * Namespace for CSS and events
   * @private
   * @type {String}
   */
  var namespace = window.remodalGlobals && window.remodalGlobals.namespace || pluginName;

  /**
   * Default settings
   * @private
   * @type {Object}
   */
  var defaults = $.extend({
    hashTracking: true,
    closeOnConfirm: true,
    closeOnCancel: true,
    closeOnEscape: true,
    closeOnAnyClick: true
  }, window.remodalGlobals && window.remodalGlobals.defaults);

  /**
   * Current modal
   * @private
   * @type {Remodal}
   */
  var current;

  /**
   * Scrollbar position
   * @private
   * @type {Number}
   */
  var scrollTop;

  /**
   * Get a transition duration in ms
   * @private
   * @param {jQuery} $elem
   * @return {Number}
   */
  function getTransitionDuration($elem) {
    var duration = $elem.css('transition-duration') ||
        $elem.css('-webkit-transition-duration') ||
        $elem.css('-moz-transition-duration') ||
        $elem.css('-o-transition-duration') ||
        $elem.css('-ms-transition-duration') ||
        '0s';

    var delay = $elem.css('transition-delay') ||
        $elem.css('-webkit-transition-delay') ||
        $elem.css('-moz-transition-delay') ||
        $elem.css('-o-transition-delay') ||
        $elem.css('-ms-transition-delay') ||
        '0s';

    var max;
    var len;
    var num;
    var i;

    duration = duration.split(', ');
    delay = delay.split(', ');

    // The duration length is the same as the delay length
    for (i = 0, len = duration.length, max = Number.NEGATIVE_INFINITY; i < len; i++) {
      num = parseFloat(duration[i]) + parseFloat(delay[i]);

      if (num > max) {
        max = num;
      }
    }

    return num * 1000;
  }

  /**
   * Get a scrollbar width
   * @private
   * @return {Number}
   */
  function getScrollbarWidth() {
    if ($(document.body).height() <= $(window).height()) {
      return 0;
    }

    var outer = document.createElement('div');
    var inner = document.createElement('div');
    var widthNoScroll;
    var widthWithScroll;

    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    document.body.appendChild(outer);

    widthNoScroll = outer.offsetWidth;

    // Force scrollbars
    outer.style.overflow = 'scroll';

    // Add inner div
    inner.style.width = '100%';
    outer.appendChild(inner);

    widthWithScroll = inner.offsetWidth;

    // Remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  /**
   * Lock the screen
   * @private
   */
  function lockScreen() {
    var $html = $('html');
    var lockedClass = namespace + '-is-locked';
    var paddingRight;
    var $body;

    if (!$html.hasClass(lockedClass)) {
      $body = $(document.body);

      // Zepto does not support '-=', '+=' in the `css` method
      paddingRight = parseInt($body.css('padding-right'), 10) + getScrollbarWidth();

      $body.css('padding-right', paddingRight + 'px');
      $html.addClass(lockedClass);
    }
  }

  /**
   * Unlock the screen
   * @private
   */
  function unlockScreen() {
    var $html = $('html');
    var lockedClass = namespace + '-is-locked';
    var paddingRight;
    var $body;

    if ($html.hasClass(lockedClass)) {
      $body = $(document.body);

      // Zepto does not support '-=', '+=' in the `css` method
      paddingRight = parseInt($body.css('padding-right'), 10) - getScrollbarWidth();

      $body.css('padding-right', paddingRight + 'px');
      $html.removeClass(lockedClass);
    }
  }

  /**
   * Parse a string with options
   * @private
   * @param str
   * @returns {Object}
   */
  function parseOptions(str) {
    var obj = {};
    var arr;
    var len;
    var val;
    var i;

    // Remove spaces before and after delimiters
    str = str.replace(/\s*:\s*/g, ':').replace(/\s*,\s*/g, ',');

    // Parse a string
    arr = str.split(',');
    for (i = 0, len = arr.length; i < len; i++) {
      arr[i] = arr[i].split(':');
      val = arr[i][1];

      // Convert a string value if it is like a boolean
      if (typeof val === 'string' || val instanceof String) {
        val = val === 'true' || (val === 'false' ? false : val);
      }

      // Convert a string value if it is like a number
      if (typeof val === 'string' || val instanceof String) {
        val = !isNaN(val) ? +val : val;
      }

      obj[arr[i][0]] = val;
    }

    return obj;
  }

  /**
   * Remodal constructor
   * @param {jQuery} $modal
   * @param {Object} options
   * @constructor
   */
  function Remodal($modal, options) {
    var remodal = this;
    var tdOverlay;
    var tdModal;
    var tdBg;

    remodal.settings = $.extend({}, defaults, options);

    // Build DOM
    remodal.$body = $(document.body);
    remodal.$overlay = $('.' + namespace + '-overlay');

    if (!remodal.$overlay.length) {
      remodal.$overlay = $('<div>').addClass(namespace + '-overlay');
      remodal.$body.append(remodal.$overlay);
    }

    remodal.$bg = $('.' + namespace + '-bg');
    remodal.$closeButton = $('<a href="#"></a>').addClass(namespace + '-close');
    remodal.$wrapper = $('<div>').addClass(namespace + '-wrapper');
    remodal.$modal = $modal;
    remodal.$modal.addClass(namespace);
    remodal.$modal.css('visibility', 'visible');

    remodal.$modal.append(remodal.$closeButton);
    remodal.$wrapper.append(remodal.$modal);
    remodal.$body.append(remodal.$wrapper);
    remodal.$confirmButton = remodal.$modal.find('.' + namespace + '-confirm');
    remodal.$cancelButton = remodal.$modal.find('.' + namespace + '-cancel');

    // Calculate timeouts
    tdOverlay = getTransitionDuration(remodal.$overlay);
    tdModal = getTransitionDuration(remodal.$modal);
    tdBg = getTransitionDuration(remodal.$bg);
    remodal.td = tdModal > tdOverlay ? tdModal : tdOverlay;
    remodal.td = tdBg > remodal.td ? tdBg : remodal.td;

    // Add the close button event listener
    remodal.$wrapper.on('click.' + namespace, '.' + namespace + '-close', function(e) {
      e.preventDefault();

      remodal.close();
    });

    // Add the cancel button event listener
    remodal.$wrapper.on('click.' + namespace, '.' + namespace + '-cancel', function(e) {
      e.preventDefault();

      remodal.$modal.trigger('cancel');

      if (remodal.settings.closeOnCancel) {
        remodal.close('cancellation');
      }
    });

    // Add the confirm button event listener
    remodal.$wrapper.on('click.' + namespace, '.' + namespace + '-confirm', function(e) {
      e.preventDefault();

      remodal.$modal.trigger('confirm');

      if (remodal.settings.closeOnConfirm) {
        remodal.close('confirmation');
      }
    });

    // Add the keyboard event listener
    $(document).on('keyup.' + namespace, function(e) {
      if (e.keyCode === 27 && remodal.settings.closeOnEscape) {
        remodal.close();
      }
    });

    // Add the overlay event listener
    remodal.$wrapper.on('click.' + namespace, function(e) {
      var $target = $(e.target);

      if (!$target.hasClass(namespace + '-wrapper')) {
        return;
      }

      if (remodal.settings.closeOnAnyClick) {
        remodal.close();
      }
    });

    remodal.index = $[pluginName].lookup.push(remodal) - 1;
    remodal.busy = false;
  }

  /**
   * Open a modal window
   * @public
   */
  Remodal.prototype.open = function() {

    // Check if the animation was completed
    if (this.busy) {
      return;
    }

    var remodal = this;
    var id;

    remodal.busy = true;
    remodal.$modal.trigger('open');

    id = remodal.$modal.attr('data-' + pluginName + '-id');

    if (id && remodal.settings.hashTracking) {
      scrollTop = $(window).scrollTop();
      location.hash = id;
    }

    if (current && current !== remodal) {
      current.$overlay.hide();
      current.$wrapper.hide();
      current.$body.removeClass(namespace + '-is-active');
    }

    current = remodal;

    lockScreen();
    remodal.$overlay.show();
    remodal.$wrapper.show();

    setTimeout(function() {
      remodal.$body.addClass(namespace + '-is-active');

      setTimeout(function() {
        remodal.busy = false;
        remodal.$modal.trigger('opened');
      }, remodal.td + 50);
    }, 25);
  };

  /**
   * Close a modal window
   * @public
   * @param {String|undefined} reason A reason to close
   */
  Remodal.prototype.close = function(reason) {

    // Check if the animation was completed
    if (this.busy) {
      return;
    }

    var remodal = this;

    remodal.busy = true;
    remodal.$modal.trigger({
      type: 'close',
      reason: reason
    });

    if (remodal.settings.hashTracking &&
      remodal.$modal.attr('data-' + pluginName + '-id') === location.hash.substr(1)) {

      location.hash = '';
      $(window).scrollTop(scrollTop);
    }

    remodal.$body.removeClass(namespace + '-is-active');

    setTimeout(function() {
      remodal.$overlay.hide();
      remodal.$wrapper.hide();
      unlockScreen();

      remodal.busy = false;
      remodal.$modal.trigger({
        type: 'closed',
        reason: reason
      });
    }, remodal.td + 50);
  };

  /**
   * Special plugin object for instances.
   * @public
   * @type {Object}
   */
  $[pluginName] = {
    lookup: []
  };

  /**
   * Plugin constructor
   * @param {Object} options
   * @returns {JQuery}
   * @constructor
   */
  $.fn[pluginName] = function(opts) {
    var instance;
    var $elem;

    this.each(function(index, elem) {
      $elem = $(elem);

      if ($elem.data(pluginName) == null) {
        instance = new Remodal($elem, opts);
        $elem.data(pluginName, instance.index);

        if (instance.settings.hashTracking &&
          $elem.attr('data-' + pluginName + '-id') === location.hash.substr(1)) {

          instance.open();
        }
      } else {
        instance = $[pluginName].lookup[$elem.data(pluginName)];
      }
    });

    return instance;
  };

  $(document).ready(function() {

    // data-remodal-target opens a modal window with the special Id.
    $(document).on('click', '[data-' + pluginName + '-target]', function(e) {
      e.preventDefault();

      var elem = e.currentTarget;
      var id = elem.getAttribute('data-' + pluginName + '-target');
      var $target = $('[data-' + pluginName + '-id=' + id + ']');

      $[pluginName].lookup[$target.data(pluginName)].open();
    });

    // Auto initialization of modal windows.
    // They should have the 'remodal' class attribute.
    // Also you can write `data-remodal-options` attribute to pass params into the modal.
    $(document).find('.' + namespace).each(function(i, container) {
      var $container = $(container);
      var options = $container.data(pluginName + '-options');

      if (!options) {
        options = {};
      } else if (typeof options === 'string' || options instanceof String) {
        options = parseOptions(options);
      }

      $container[pluginName](options);
    });
  });

  /**
   * Hashchange handler
   * @private
   * @param {Event} e
   * @param {Boolean} [closeOnEmptyHash=true]
   */
  function hashHandler(e, closeOnEmptyHash) {
    var id = location.hash.replace('#', '');
    var instance;
    var $elem;

    if (typeof closeOnEmptyHash === 'undefined') {
      closeOnEmptyHash = true;
    }

    if (!id) {
      if (closeOnEmptyHash) {

        // Check if we have currently opened modal and animation was completed
        if (current && !current.busy && current.settings.hashTracking) {
          current.close();
        }
      }
    } else {

      // Catch syntax error if your hash is bad
      try {
        $elem = $(
          '[data-' + pluginName + '-id=' +
          id.replace(new RegExp('/', 'g'), '\\/') + ']'
        );
      } catch (err) {}

      if ($elem && $elem.length) {
        instance = $[pluginName].lookup[$elem.data(pluginName)];

        if (instance && instance.settings.hashTracking) {
          instance.open();
        }
      }

    }
  }

  $(window).bind('hashchange.' + namespace, hashHandler);

})(window.jQuery || window.Zepto);
