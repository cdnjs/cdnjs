(function($) {

  var clearClass = 'rating-clear';
  var clearSelector = '.' + clearClass;
  var hiddenClass = 'hidden';

  var starSelector = function(value) {
    return '[data-value' + (value ? ('=' + value) : '') + ']';
  };

  var toggleActive = function($el, active, options) {
    var activeClass = options['active-icon'];
    var inactiveClass = options['inactive-icon'];
    $el.removeClass(active ? inactiveClass : activeClass).addClass(active ? activeClass : inactiveClass);
  };

  var createRatingEl = function($input, options) {
    var min = options.min;
    var max = options.max;
    var clearable = options.clearable;
    var $ratingEl = $('<div class="rating-input"></div>');
    for (var i = min; i <= max; i++) {
      $ratingEl.append('<i class="' + options['icon-lib'] + '" data-value="' + i + '"></i>');
    }
    if (clearable) {
      $ratingEl.append('&nbsp;').append(
        '<a class="' + clearClass + '">' +
          '<i class="' + options['icon-lib'] + ' ' + options['clearable-icon'] + '"/>' +
          clearable +
        '</a>'
      );
    }
    return $ratingEl;
  };

  var inputOptions = function($input) {
    var options = {};
    for (option in DEFAULTS) {
      options[option] = $input.data(option);
    };
    return options;
  };

  var DEFAULTS = {
    'min': 1,
    'max': 5,
    'empty-value': 0,
    'icon-lib': 'glyphicon',
    'active-icon': 'glyphicon-star',
    'inactive-icon': 'glyphicon-star-empty',
    'clearable': '',
    'clearable-icon': 'glyphicon-remove'
  };

  var Rating = function(input, options) {
    var $input = this.$input = $(input);
    var ratingOptions = this.options = $.extend({}, DEFAULTS, inputOptions($input), options);
    var $ratingEl = this.$el = createRatingEl($input, ratingOptions);
    $input.addClass(hiddenClass).before($ratingEl);
    this.highlight($input.val());
  };

  Rating.VERSION = '0.3.0';

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

  var Plugin = $.fn.rating = function(option) {
    return this.each(function() {
      var $input = $(this);
      var dataKey = 'rating';
      var rating = $input.data(dataKey);
      var options = typeof option === 'object' && option;

      if (!rating) {
        rating = new Rating($input, options);
        rating.$el
          .on('mouseenter', starSelector(), function () {
            rating.highlight($(this).data('value'), true);
          })
          .on('mouseleave', starSelector(), function () {
            rating.highlight($input.val(), true);
          })
          .on('click', starSelector(), function() {
            rating.setValue($(this).data('value'));
          })
          .on('click', clearSelector, function() {
            rating.clear();
          });
        $input.data(dataKey, rating);
      }

      if (option === 'clear') {
        rating.clear();
      } else if (option === 'setValue') {
        rating.setValue(arguments[1]);
      }
    });
  };

  Plugin.Constructor = Rating;

  $(function () {
    $('input.rating[type=number]').each(function() {
      $(this).rating();
    });
  });

}(jQuery));
