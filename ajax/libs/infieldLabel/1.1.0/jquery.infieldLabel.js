(function($) {

  $.infieldLabel = function(el, options) {

    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;

    // Access to jQuery and DOM versions of element
    base.$el = $(el);

    // internal variables
    base.$input = null;

    base.init = function() {
      base.options = $.extend({}, $.infieldLabel.defaultOptions, options);
      base.setup();
    };

    /*
     * set up
     */

    // first time input setup
    base.setup = function() {
      base.$input = base.$el.find('input, textarea');
      base.$label = base.$el.find('label');

      base.$el.addClass('init');

      // hide label if there's already a value
      base.blur();

      // bind events
      base.bind();
    };

    // binds the focus, blur and change events
    base.bind = function() {
      base.$input
        .on('focus.infield', function() {
          base.$el
            .removeClass(base.options.hideClass)
            .addClass(base.options.focusClass);

        }).on('blur.infield change.infield', function() {
          base.blur();
        });

        base.$label.on('click.infield', function() {
          base.$el
            .removeClass(base.options.hideClass)
            .addClass(base.options.focusClass);

          base.$input.focus();
        });
    };

    base.blur = function() {
      if (base.$input.val() !== '') {
        base.$el
          .removeClass(base.options.focusClass)
          .addClass(base.options.hideClass);

      } else {
        base.$el
          .removeClass(base.options.focusClass + ' ' + base.options.hideClass);
      }
    };

    /*
     * initialize
     */

    base.init();
  };


  /*
   * options
   */

  $.infieldLabel.defaultOptions = {
    focusClass: 'placeholder-focus',
    hideClass: 'placeholder-hide'
  };

  $.fn.infieldLabel = function(options) {
    this.each(function() {
      new $.infieldLabel(this, options);
    });
  };

})(jQuery);
