/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.2.0
 */
(function($) {
  var data = {};
  var check_binded = false;
  var check_lock = false;
  var defaults = {
    interval: 250
  }
  var $window = $(window);
  var $document = $(document);

  function process() {
    check_lock = false;
    for (var selector in data) {
      var $appeared = $(selector).filter(function() {
        return $(this).is(':appeared');
      });

      if ($appeared.length) {
        if (data[selector]) {
          data[selector]($appeared);
        } else {
          $appeared.first().trigger('appear', [$appeared]);
        }
      }
    }
  }

  // "appeared" custom filter
  $.expr[':']['appeared'] = function(element) {
    var $element = $(element);
    if (!$element.is(':visible')) {
      return false;
    }

    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;

    if (top + $element.height() >= window_top &&
        top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
        left + $element.width() >= window_left &&
        left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
      return true;
    } else {
      return false;
    }
  }

  $.fn.extend({
    // watching for element's appearance in browser viewport
    appear: function(callback, options) {
      $.extend(defaults, options || {});
      if (!check_binded) {
        var on_check = function() {
          if (check_lock) {
            return;
          }
          check_lock = true;

          setTimeout(process, defaults.interval);
        };

        $(window).scroll(on_check).resize(on_check);
        check_binded = true;
      }

      if (options && options.force_process) {
        setTimeout(process, defaults.interval);
      }
      data[this.selector] = callback;
      return $(this.selector);
    }
  });

  $.extend({
    // force elements's appearance check
    force_appear: function() {
      if (check_binded) {
        process();
        return true;
      };
      return false;
    }
  });
})(jQuery);
