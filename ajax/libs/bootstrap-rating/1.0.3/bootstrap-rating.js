(function ($, undefined) {
  'use strict';

  var OFFSET = 5;

  $.fn.rating = function (options) {
    return this.each(function () {
      var $input = $(this);
      // Prevent against multiple instantiations.
      if ($input.data('rating'))
        return;
      $input.data('rating', true);
      // Merge data and parameter options.
      // Those provided as parameter prevail over the data ones.
      var opts = $.extend({}, $input.data(), options);
      // Sanitize start, stop, step, and fractions.
      // All of them start, stop, and step must be integers.
      opts.start = parseInt(opts.start, 10);
      opts.start = isNaN(opts.start) ? undefined : opts.start;
      // In case we don't have a valid stop rate try to get a reasonable
      // one based on the existence of a valid start rate.
      opts.stop = parseInt(opts.stop, 10);
      opts.stop = isNaN(opts.stop) ?
        opts.start + OFFSET || undefined : opts.stop;
      // 0 step is ignored.
      opts.step = parseInt(opts.step, 10) || undefined;
      // Symbol fractions and scale (number of significant digits).
      // 0 is ignored and negative numbers are turned to positive.
      opts.fractions = Math.abs(parseInt(opts.fractions, 10)) || undefined;
      opts.scale = Math.abs(parseInt(opts.scale, 10)) || undefined;

      // Extend/Override the default options with those provided either as
      // data attributes or function parameters.
      opts = $.extend({}, $.fn.rating.defaults, opts);

      // Fill rating symbols until index.
      var fillUntil = function (index) {
        // Get the index of the last whole symbol.
        var i = Math.floor(index);
        // Hide completely hidden symbols background.
        $rating.find('.rating-symbol-background')
          .css('visibility', 'visible')
          .slice(0, i).css('visibility', 'hidden');
        var $rates = $rating.find('.rating-symbol-foreground');
        // Reset foreground
        $rates.width(0);
        // Fill all the foreground symbols up to the selected one.
        $rates.slice(0, i).width('auto');
        // Partially fill the fractional one.
        $rates.eq(i).width(index % 1 * 100 + '%');
      };

      // Calculate the rate of an index according the the start and step.
      var indexToRate = function (index) {
        return opts.start + Math.floor(index) * opts.step +
          opts.step * roundToFraction(index % 1);
      };

      // Calculate the corresponding index for a rate.
      var rateToIndex = function (rate) {
        return (rate - opts.start) / opts.step;
      };

      // Round index to the configured opts.fractions.
      var roundToFraction = function (index) {
        // Get the closest top fraction.
        var fraction = Math.ceil(index % 1 * opts.fractions) / opts.fractions;
        // Truncate decimal trying to avoid float precission issues.
        var p = Math.pow(10, opts.scale);
        return Math.floor(index) + Math.floor(fraction * p) / p;
      };

      // Check the rate is in the proper range [start..stop].
      var contains = function (rate) {
        var start = opts.step > 0 ? opts.start : opts.stop;
        var stop = opts.step > 0 ? opts.stop : opts.start;
        return start <= rate && rate <= stop;
      };

      // Update empty and filled rating symbols according to a rate.
      var updateRate = function (rate) {
        var value = parseFloat(rate);
        if (contains(value)) {
          fillUntil(rateToIndex(value));
        }
      };

      // Call f only if the input is enabled.
      var ifEnabled = function (f) {
        return function (e) {
          if (!$input.prop('disabled') && !$input.prop('readonly')) {
            f.call(this, e);
          }
        }
      };

      // Build the rating control.
      var $rating = $('<span></span>').insertBefore($input);
      for (var i = 1; i <= rateToIndex(opts.stop); i++) {
        // Create the rating symbol container.
        var $symbol = $('<div class="rating-symbol"></div>').css({
            display: 'inline-block',
            position: 'relative'
        });
        // Add background symbol to the symbol container.
        $('<div class="rating-symbol-background ' + opts.empty + '"></div>')
          .appendTo($symbol);
        // Add foreground symbol to the symbol container.
        // The filled icon is wrapped with a div to allow fractional selection.
        $('<div class="rating-symbol-foreground"></div>')
          .append('<span class="' + opts.filled + '"></span>')
          .css({
            display: 'inline-block',
            position: 'absolute',
            overflow: 'hidden',
            left: 0,
            width: 0
          }).appendTo($symbol);
        $rating.append($symbol);
        opts.extendSymbol.call($symbol, indexToRate(i));
      }
      // Initialize the rating control with the associated input value rate.
      updateRate($input.val());

      // Keep rating control and its associated input in sync.
      $input
        .on('change', function () {
          updateRate($(this).val());
        });

      var fractionalIndex = function (e) {
        var $symbol = $(e.currentTarget);
        var x = (e.pageX || e.originalEvent.touches[0].pageX) - $symbol.offset().left;
        return $symbol.index() + x / $symbol.width();
      };
      $rating
        .on('mousedown touchstart', '.rating-symbol', ifEnabled(function (e) {
          // Set input 'trigger' the change event.
          $input.val(indexToRate(fractionalIndex(e))).change();
        }))
        .on('mousemove touchmove', '.rating-symbol', ifEnabled(function (e) {
          // Fill the symbols as fractions chunks.
          fillUntil(roundToFraction(fractionalIndex(e)));
        }))
        .on('mouseleave touchend', '.rating-symbol', ifEnabled(function () {
          // Restore on hover out.
          fillUntil(rateToIndex(parseFloat($input.val())));
        }));
    });
  };

  // Plugin defaults.
  $.fn.rating.defaults = {
    filled: 'glyphicon glyphicon-star',
    empty: 'glyphicon glyphicon-star-empty',
    start: 0,
    stop: OFFSET,
    step: 1,
    fractions: 1,
    scale: 3,
    extendSymbol: function (rate) {},
  };

  $(function () {
    $('input.rating').rating();
  });
}(jQuery));
