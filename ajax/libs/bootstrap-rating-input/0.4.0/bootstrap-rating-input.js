(function ($) {
  'use strict';

  var clearClass = 'rating-clear',
    clearSelector = '.' + clearClass,
    hiddenClass = 'hidden',
    DEFAULTS = {
      'min': 1,
      'max': 5,
      'empty-value': 0,
      'iconLib': 'glyphicon',
      'activeIcon': 'glyphicon-star',
      'inactiveIcon': 'glyphicon-star-empty',
      'clearable': false,
      'clearableIcon': 'glyphicon-remove',
      'inline': false,
      'readonly': false
    };

  function starSelector(value) {
    return '[data-value' + (value ? ('=' + value) : '') + ']';
  }

  function toggleActive($el, active, options) {
    var activeClass = options.activeIcon,
      inactiveClass = options.inactiveIcon;
    $el.removeClass(active ? inactiveClass : activeClass).addClass(active ? activeClass : inactiveClass);
  }

  function parseOptions($input, options) {
    var data = $.extend({}, DEFAULTS, $input.data(), options);
    data.inline = data.inline === '' || data.inline;
    data.readonly = data.readonly === '' || data.readonly;
    if (data.clearable === false) {
      data.clearableLabel = '';
    } else {
      data.clearableLabel = data.clearable;
    }
    data.clearable = data.clearable === '' || data.clearable;
    return data;
  }

  function createRatingEl($input, options) {
    // Inline option
    if (options.inline) {
      var $ratingEl = $('<span class="rating-input"></span>');
    } else {
      var $ratingEl = $('<div class="rating-input"></div>');
    }

    // Copy original classes but the rating class
    $ratingEl.addClass($input.attr('class'));
    $ratingEl.removeClass('rating');

    // Render rating icons
    for (var i = options.min; i <= options.max; i++) {
      $ratingEl.append('<i class="' + options.iconLib + '" data-value="' + i + '"></i>');
    }

    // Render clear link
    if (options.clearable && !options.readonly) {
      $ratingEl.append('&nbsp;').append(
        '<a class="' + clearClass + '">' +
          '<i class="' + options.iconLib + ' ' + options.clearableIcon + '"/>' +
          options.clearableLabel +
        '</a>'
      );
    }
    return $ratingEl;
  }

  var Rating = function(input, options) {
    var $input = this.$input = input;
    this.options = parseOptions($input, options);
    var $ratingEl = this.$el = createRatingEl($input, this.options);
    $input.addClass(hiddenClass).before($ratingEl);
    $input.attr('type', 'hidden');
    this.highlight($input.val());
  };

  Rating.VERSION = '0.4.0';

  Rating.DEFAULTS = DEFAULTS;

  Rating.prototype = {

    clear: function() {
      this.setValue(this.options['empty-value']);
    },

    setValue: function(value) {
      this.highlight(value);
      this.updateInput(value);
    },

    highlight: function(value, skipClearable) {
      var options = this.options;
      var $el = this.$el;
      if (value >= this.options.min && value <= this.options.max) {
        var $selected = $el.find(starSelector(value));
        toggleActive($selected.prevAll('i').andSelf(), true, options);
        toggleActive($selected.nextAll('i'), false, options);
      } else {
        toggleActive($el.find(starSelector()), false, options);
      }
      if (!skipClearable) {
        if (!value || value == this.options['empty-value']) {
          $el.find(clearSelector).addClass(hiddenClass);
        } else {
          $el.find(clearSelector).removeClass(hiddenClass);
        }
      }
    },

    updateInput: function(value) {
      var $input = this.$input;
      if ($input.val() != value) {
        $input.val(value).change();
      }
    }

  };

  var Plugin = $.fn.rating = function(options) {
    return this.filter('input[type=number]').each(function() {
      var $input = $(this);
      var optionsObject = typeof options === 'object' && options || {};
      var rating = new Rating($input, optionsObject);
      if (!rating.options.readonly) {
        rating.$el
          .on('mouseenter', starSelector(), function() {
            rating.highlight($(this).data('value'), true);
          })
          .on('mouseleave', starSelector(), function() {
            rating.highlight($input.val(), true);
          })
          .on('click', starSelector(), function() {
            rating.setValue($(this).data('value'));
          })
          .on('click', clearSelector, function() {
            rating.clear();
          });
      }
    });
  };

  Plugin.Constructor = Rating;

  $(function() {
    $('input.rating[type=number]').each(function() {
      $(this).rating();
    });
  });

}(jQuery));
