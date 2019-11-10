(function ($, undefined) {
  'use strict';

  var OFFSET = 5;

  $.fn.rating = function (options) {
    var fillUntilRate = function ($rating, value, opts) {
      var $rates = $rating.children();
      // Empty all the rating symbols.
      $rates.removeClass(opts.filled).addClass(opts.empty);

      // Check the value is a valid rate according to the step.
      var rate = parseInt(value, 10);
      if (!isNaN(rate) && rate % opts.step === 0) {
        // Calculate the index according to the configured step.
        var index = Math.max(Math.ceil((rate - opts.start) / opts.step), 0);
        // Check the index is between the proper range [0..length).
        if (0 <= index && index < $rates.length) {
          // Fill all the symbols up to the selected one.
          $rates.eq(index).prevAll('.rating-symbol').addBack()
            .removeClass(opts.empty).addClass(opts.filled);
        }
      }
    };

    this.each(function () {
      var $input = $(this);
      // Merge data and parameter options.
      // Those provided as parameter prevail over the data ones.
      var opts = $.extend({}, $input.data(), options);
      // Sanitize start, stop, and step.
      // All of them start, stop, and step must be integers.
      // In case we don't have a valid stop rate try to get a reasonable
      // one based on the existence of a valid start rate.
      opts.start = parseInt(opts.start, 10) || undefined;
      opts.stop = parseInt(opts.stop, 10) ||
                     opts.start + OFFSET ||
                     undefined;
      opts.step = parseInt(opts.step, 10) || undefined;

      // Extend/Override the default options with those provided either as
      // data attributes or function parameters.
      opts = $.extend({}, $.fn.rating.defaults, opts);

      // Calculate the rate of an index according the the start and step.
      var indexToRate = function (index) {
        return opts.start + index * opts.step;
      };

      // Call f only if the input is enabled.
      var ifEnabled = function (f) {
        return function () {
          if (!$input.prop('disabled') && !$input.prop('readonly')) {
            f.call(this);
          }
        }
      };

      // Build the rating control.
      var $rating = $('<div></div>').insertBefore($input);
      var length = Math.max(Math.ceil((opts.stop - opts.start) / opts.step), 0);
      for (var i = 0; i < length; i++) {
        $rating.append('<div class="rating-symbol ' + opts.empty + '"></div>');
      }
      // Initialize the rating control with the associated input value.
      fillUntilRate($rating, $input.val(), opts);

      // Keep rating control and its associated input in sync.
      $input
        .on('change', function () {
          fillUntilRate($rating, $(this).val(), opts);
        });

      $rating
        .on('click', '.rating-symbol', ifEnabled(function () {
          // Set input to the current value and 'trigger' the change handler.
          $input.val(indexToRate($(this).index())).change();
        }))
        .on('mouseenter', '.rating-symbol', ifEnabled(function () {
          // Emphasize on hover in.
          fillUntilRate($rating, indexToRate($(this).index()), opts);
        }))
        .on('mouseleave', '.rating-symbol', ifEnabled(function () {
          // Restore on hover out.
          fillUntilRate($rating, $input.val(), opts);
        }));
    });
  };

  // Plugin defaults.
  $.fn.rating.defaults = {
    filled: 'glyphicon glyphicon-star',
    empty: 'glyphicon glyphicon-star-empty',
    start: 0,
    stop: OFFSET,
    step: 1
  };

  $(function () {
    $('input.rating').rating();
  });
}(jQuery));
