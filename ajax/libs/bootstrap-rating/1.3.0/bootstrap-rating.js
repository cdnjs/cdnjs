(function ($, undefined) {
  'use strict';

  var OFFSET = 5;

  function Rating(element, options) {
    this.$input = $(element);
    this.$rating = $('<span></span>').insertBefore(this.$input);
    // Merge data and parameter options.
    // Those provided as parameter prevail over the data ones.
    this.options = (function (opts) {
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
      // Inherit default filled if none is defined for the selected symbol.
      opts.filledSelected = opts.filledSelected || opts.filled;
      return opts;
    }($.extend({}, this.$input.data(), options)));

    this._init();
  };

  Rating.prototype = {
    _init: function () {
      var rating = this,
          $input = this.$input,
          $rating = this.$rating;

      var ifEnabled = function (f) {
        return function (e) {
          // According to the W3C attribute readonly is not allowed on input
          // elements with type hidden.
          // Keep readonly prop for legacy but its use should be deprecated.
          if (!$input.prop('disabled') && !$input.prop('readonly') &&
              $input.data('readonly') === undefined) {
            f.call(this, e);
          }
        }
      };

      // Build the rating control.
      for (var i = 1; i <= this._rateToIndex(this.options.stop); i++) {
        // Create the rating symbol container.
        var $symbol = $('<div class="rating-symbol"></div>').css({
            display: 'inline-block',
            position: 'relative'
        });
        // Add background symbol to the symbol container.
        $('<div class="rating-symbol-background ' + this.options.empty + '"></div>')
          .appendTo($symbol);
        // Add foreground symbol to the symbol container.
        // The filled icon is wrapped with a div to allow fractional selection.
        $('<div class="rating-symbol-foreground"></div>')
          .append('<span></span>')
          .css({
            display: 'inline-block',
            position: 'absolute',
            overflow: 'hidden',
            left: 0,
            width: 0
          }).appendTo($symbol);
        $rating.append($symbol);
        this.options.extendSymbol.call($symbol, this._indexToRate(i));
      }
      // Initialize the rating control with the associated input value rate.
      this._updateRate($input.val());

      // Keep rating control and its associated input in sync.
      $input
        .on('change', function () {
          rating._updateRate($(this).val());
        });

      var fractionalIndex = function (e) {
        var $symbol = $(e.currentTarget);
        var x = (e.pageX || e.originalEvent.touches[0].pageX) - $symbol.offset().left;
        // NOTE: When the mouse pointer is close to the left side of the symbol
        // a negative x is returned. Probably some precision error in the
        // calculation.
        // x should never be less than 0 because this would mean that we are in
        // the previous symbol.
        x = x > 0 ? x : rating.options.scale * 0.1;
        return $symbol.index() + x / $symbol.width();
      };
      // Keep the current highlighted index (fractional or not).
      var index;
      $rating
        .on('mousedown touchstart', '.rating-symbol', ifEnabled(function (e) {
          // Set input 'trigger' the change event.
          $input.val(rating._indexToRate(fractionalIndex(e))).change();
        }))
        .on('mousemove touchmove', '.rating-symbol', ifEnabled(function (e) {
          var current = rating._roundToFraction(fractionalIndex(e));
          if (current !== index) {
            // Trigger pseudo rate leave event if the mouse pointer is not
            // leaving from another symbol (mouseleave).
            if (index !== undefined) $(this).trigger('rating.rateleave');
            // Update index and trigger rate enter event.
            index = current;
            $(this).trigger('rating.rateenter', [rating._indexToRate(index)]);
          }
          // Fill the symbols as fractions chunks.
          rating._fillUntil(current);
        }))
        .on('mouseleave touchend', '.rating-symbol', ifEnabled(function () {
          // When a symbol is left, reset index and trigger rate leave event.
          index = undefined;
          $(this).trigger('rating.rateleave');
          // Restore on hover out.
          rating._fillUntil(rating._rateToIndex(parseFloat($input.val())));
        }));

    },
    // Fill rating symbols until index.
    _fillUntil: function (index) {
      var $rating = this.$rating;
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
      $rates.slice(0, i).width('auto')
        .find('span').attr('class', this.options.filled);
      // Amend selected symbol.
      $rates.eq(index % 1 ? i : i - 1)
        .find('span').attr('class', this.options.filledSelected);
      // Partially fill the fractional one.
      $rates.eq(i).width(index % 1 * 100 + '%');
    },
    // Calculate the rate of an index according the the start and step.
    _indexToRate: function (index) {
      return this.options.start + Math.floor(index) * this.options.step +
        this.options.step * this._roundToFraction(index % 1);
    },
    // Calculate the corresponding index for a rate.
    _rateToIndex: function (rate) {
      return (rate - this.options.start) / this.options.step;
    },
    // Round index to the configured opts.fractions.
    _roundToFraction: function (index) {
      // Get the closest top fraction.
      var fraction = Math.ceil(index % 1 * this.options.fractions) / this.options.fractions;
      // Truncate decimal trying to avoid float precission issues.
      var p = Math.pow(10, this.options.scale);
      return Math.floor(index) + Math.floor(fraction * p) / p;
    },
    // Check the rate is in the proper range [start..stop].
    _contains: function (rate) {
      var start = this.options.step > 0 ? this.options.start : this.options.stop;
      var stop = this.options.step > 0 ? this.options.stop : this.options.start;
      return start <= rate && rate <= stop;
    },
    // Update empty and filled rating symbols according to a rate.
    _updateRate: function (rate) {
      var value = parseFloat(rate);
      if (this._contains(value)) {
        this._fillUntil(this._rateToIndex(value));
        this.$input.val(value);
      }
    },
    rate: function (value) {
      if (value === undefined) {
        return this.$input.val();
      }
      this._updateRate(value);
    }
  };

  $.fn.rating = function (options) {
    var args = Array.prototype.slice.call(arguments, 1),
        result;
    this.each(function () {
      var $input = $(this);
      var rating = $input.data('rating');
      if (!rating) {
        $input.data('rating', (rating = new Rating(this, options)));
      }
      // Underscore are used for private methods.
      if (typeof options === 'string' && options[0] !== '_') {
        result = rating[options].apply(rating, args);
      }
    });
    return result || this;
  };

  // Plugin defaults.
  $.fn.rating.defaults = {
    filled: 'glyphicon glyphicon-star',
    filledSelected: undefined,
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
