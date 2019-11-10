(function ($, undefined) {
  'use strict';

  var OFFSET = 5;

  $.fn.rating = function (options) {
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

      // Fill rating symbols until index.
      var fillUntil = function (index) {
        var $rates = $rating.children();
        // Empty all just in case index is NaN.
        $rates.removeClass(opts.filled).addClass(opts.empty);
        // Fill all the symbols up to the selected one.
        $rates.eq(index).prevAll('.rating-symbol').addBack()
          .removeClass(opts.empty).addClass(opts.filled);
      };

      // Calculate the rate of an index according the the start and step.
      var indexToRate = function (index) {
        return opts.start + index * opts.step;
      };

      // Get the corresponding index of a rate or NaN if rate is not a number.
      var rateToIndex = function (rate) {
        return Math.max(Math.ceil((rate - opts.start) / opts.step), 0);
      };

      // Check the rate is in the proper range [start..stop) and with
      // the proper step.
      var contains = function (rate) {
        var start = opts.step > 0 ? opts.start : opts.stop;
        var stop = opts.step > 0 ? opts.stop - 1 : opts.start + 1;
        return start <= rate && rate <= stop && (opts.start + rate) % opts.step === 0;
      };

      // Update empty and filled rating symbols according to a rate.
      var updateRate = function (rate) {
        var value = parseInt(rate, 10);
        if (contains(value)) {
          fillUntil(rateToIndex(value));
        }
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
      for (var i = 0; i < rateToIndex(opts.stop); i++) {
        $rating.append('<div class="rating-symbol ' + opts.empty + '"></div>');
      }
      // Initialize the rating control with the associated input value rate.
      updateRate($input.val());

      // Keep rating control and its associated input in sync.
      $input
        .on('change', function () {
          updateRate($(this).val());
        });

      $rating
        .on('click', '.rating-symbol', ifEnabled(function () {
          // Set input to the current value and 'trigger' the change handler.
          $input.val(indexToRate($(this).index())).change();
        }))
        .on('mouseenter', '.rating-symbol', ifEnabled(function () {
          // Emphasize on hover in.
          fillUntil($(this).index());
        }))
        .on('mouseleave', '.rating-symbol', ifEnabled(function () {
          // Restore on hover out.
          fillUntil(rateToIndex(parseInt($input.val(), 10)));
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
