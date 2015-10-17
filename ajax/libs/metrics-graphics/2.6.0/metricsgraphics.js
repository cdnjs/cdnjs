(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['d3', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('d3'), require('jquery'));
  } else {
    root.MG = factory(root.d3, root.jQuery);
  }
}(this, function(d3, $) {
window.MG = {version: '2.6.0'};

function register(chartType, descriptor, defaults) {
    MG.charts[chartType] = {
        descriptor: descriptor,
        defaults: defaults || {}
    };
}

MG.register = register;

/**
    Record of all registered hooks.
    For internal use only.
*/
MG._hooks = {};

/**
    Add a hook callthrough to the stack.

    Hooks are executed in the order that they were registered.
*/
MG.add_hook = function(name, func, context) {
    var hooks;

    if (!MG._hooks[name]) {
        MG._hooks[name] = [];
    }

    hooks = MG._hooks[name];

    var already_registered =
        hooks.filter(function(hook) {
            return hook.func === func;
        })
        .length > 0;

    if (already_registered) {
        throw 'That function is already registered.';
    }

    hooks.push({
        func: func,
        context: context
    });
};

/**
    Execute registered hooks.

    Optional arguments
*/
MG.call_hook = function(name) {
    var hooks = MG._hooks[name],
        result = [].slice.apply(arguments, [1]),
        processed;

    if (hooks) {
        hooks.forEach(function(hook) {
            if (hook.func) {
                var params = processed || result;

                if (params && params.constructor !== Array) {
                    params = [params];
                }

                params = [].concat.apply([], params);
                processed = hook.func.apply(hook.context, params);
            }
        });
    }

    return processed || result;
};

MG.globals = {};
MG.deprecations = {
    rollover_callback: { replacement: 'mouseover', version: '2.0' },
    rollout_callback: { replacement: 'mouseout', version: '2.0' },
    show_years: { replacement: 'show_secondary_x_label', version: '2.1' }
};
MG.globals.link = false;
MG.globals.version = "1.1";

MG.charts = {};

MG.data_graphic = function(args) {
    'use strict';
    var defaults = {
        missing_is_zero: false,                // if true, missing values will be treated as zeros
        missing_is_hidden: false,              // if true, missing values will appear as broken segments
        missing_is_hidden_accessor: null, // the accessor that determines the boolean value for missing data points
        legend: '' ,                           // an array identifying the labels for a chart's lines
        legend_target: '',                     // if set, the specified element is populated with a legend
        error: '',                             // if set, a graph will show an error icon and log the error to the console
        animate_on_load: false,                // animate lines on load
        top: 40,                               // the size of the top margin
        bottom: 30,                            // the size of the bottom margin
        right: 10,                             // size of the right margin
        left: 50,                              // size of the left margin
        buffer: 8,                             // the buffer between the actual chart area and the margins
        width: 350,                            // the width of the entire graphic
        height: 220,                           // the height of the entire graphic
        full_width: false,                     // sets the graphic width to be the width of the parent element and resizes dynamically
        full_height: false,                    // sets the graphic width to be the width of the parent element and resizes dynamically
        small_height_threshold: 120,           // the height threshold for when smaller text appears
        small_width_threshold: 160,            // the width  threshold for when smaller text appears
        small_text: false,                     // coerces small text regardless of graphic size
        xax_count: 6,                          // number of x axis ticks
        xax_tick_length: 5,                    // x axis tick length
        xax_start_at_min: false,
        yax_count: 5,                          // number of y axis ticks
        yax_tick_length: 5,                    // y axis tick length
        x_extended_ticks: false,               // extends x axis ticks across chart - useful for tall charts
        y_extended_ticks: false,               // extends y axis ticks across chart - useful for long charts
        y_scale_type: 'linear',
        max_x: null,
        max_y: null,
        min_x: null,
        min_y: null,                           // if set, y axis starts at an arbitrary value
        min_y_from_data: false,                // if set, y axis will start at minimum value rather than at 0
        point_size: 2.5,                       // the size of the dot that appears on a line on mouse-over
        x_accessor: 'date',
        xax_units: '',
        x_label: '',
        x_axis: true,
        y_axis: true,
        y_accessor: 'value',
        y_label: '',
        yax_units: '',
        x_rug: false,
        y_rug: false,
        transition_on_update: true,
        mouseover: null,
        show_rollover_text: true,
        show_confidence_band: null,            // given [l, u] shows a confidence at each point from l to u
        xax_format: null,                      // xax_format is a function that formats the labels for the x axis.
        area: true,
        chart_type: 'line',
        data: [],
        decimals: 2,                           // the number of decimals in any rollover
        format: 'count',                       // format = {count, percentage}
        inflator: 10/9,                        // for setting y axis max
        linked: false,                         // links together all other graphs with linked:true, so rollovers in one trigger rollovers in the others
        linked_format: '%Y-%m-%d',             // What granularity to link on for graphs. Default is at day
        list: false,
        baselines: null,                       // sets the baseline lines
        markers: null,                         // sets the marker lines
        scalefns: {},
        scales: {},
        show_year_markers: false,
        show_secondary_x_label: true,
        target: '#viz',
        interpolate: 'cardinal',               // interpolation method to use when rendering lines
        interpolate_tension: 0.7,              // its range is from 0 to 1; increase if your data is irregular and you notice artifacts
        custom_line_color_map: [],             // allows arbitrary mapping of lines to colors, e.g. [2,3] will map line 1 to color 2 and line 2 to color 3
        max_data_size: null,                   // explicitly specify the the max number of line series, for use with custom_line_color_map
        aggregate_rollover: false,             // links the lines in a multi-line chart
        show_tooltips: true                    // if enabled, a chart's description will appear in a tooltip (requires jquery)
    };

    MG.call_hook('global.defaults', defaults);

    if (!args) { args = {}; }

    var selected_chart = MG.charts[args.chart_type || defaults.chart_type];
    merge_with_defaults(args, selected_chart.defaults, defaults);

    if (args.list) {
        args.x_accessor = 0;
        args.y_accessor = 1;
    }

    // check for deprecated parameters
    for (var key in MG.deprecations) {
        if (args.hasOwnProperty(key)) {
            var deprecation = MG.deprecations[key],
                message = 'Use of `args.' + key + '` has been deprecated',
                replacement = deprecation.replacement,
                version;

            // transparently alias the deprecated
            if (replacement) {
                if (args[replacement]) {
                    message += '. The replacement - `args.' + replacement + '` - has already been defined. This definition will be discarded.';
                } else {
                    args[replacement] = args[key];
                }
            }

            if (deprecation.warned) {
                continue;
            }

            deprecation.warned = true;

            if (replacement) {
                message += ' in favor of `args.' + replacement + '`';
            }

            warn_deprecation(message, deprecation.version);
        }
    }

    MG.call_hook('global.before_init', args);

    new selected_chart.descriptor(args);

    return args.data;
};

if (typeof jQuery !== 'undefined') {
    /*!
     * Bootstrap v3.3.1 (http://getbootstrap.com)
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     */

    /*!
     * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=698666b23215c58f23d4)
     * Config saved to config.json and https://gist.github.com/698666b23215c58f23d4
     */

    /* ========================================================================
     * Bootstrap: tooltip.js v3.3.1
     * http://getbootstrap.com/javascript/#tooltip
     * Inspired by the original jQuery.tipsy by Jason Frame
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */


    +function ($) {
      'use strict';
      
      if(typeof $().tooltip == 'function')
        return true;

      // TOOLTIP PUBLIC CLASS DEFINITION
      // ===============================

      var Tooltip = function (element, options) {
        this.type       =
        this.options    =
        this.enabled    =
        this.timeout    =
        this.hoverState =
        this.$element   = null;

        this.init('tooltip', element, options);
      };

      Tooltip.VERSION  = '3.3.1';

      Tooltip.TRANSITION_DURATION = 150;

      Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false,
        viewport: {
          selector: 'body',
          padding: 0
        }
      };

      Tooltip.prototype.init = function (type, element, options) {
        this.enabled   = true;
        this.type      = type;
        this.$element  = $(element);
        this.options   = this.getOptions(options);
        this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);

        var triggers = this.options.trigger.split(' ');

        for (var i = triggers.length; i--;) {
          var trigger = triggers[i];

          if (trigger == 'click') {
            this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
          } else if (trigger != 'manual') {
            var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin';
            var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

            this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
            this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
          }
        }

        this.options.selector ?
          (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
          this.fixTitle();
      };

      Tooltip.prototype.getDefaults = function () {
        return Tooltip.DEFAULTS;
      };

      Tooltip.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);

        if (options.delay && typeof options.delay == 'number') {
          options.delay = {
            show: options.delay,
            hide: options.delay
          };
        }

        return options;
      };

      Tooltip.prototype.getDelegateOptions = function () {
        var options  = {};
        var defaults = this.getDefaults();

        this._options && $.each(this._options, function (key, value) {
          if (defaults[key] != value) options[key] = value;
        });

        return options;
      };

      Tooltip.prototype.enter = function (obj) {
        var self = obj instanceof this.constructor ?
          obj : $(obj.currentTarget).data('bs.' + this.type);

        if (self && self.$tip && self.$tip.is(':visible')) {
          self.hoverState = 'in';
          return;
        }

        if (!self) {
          self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
          $(obj.currentTarget).data('bs.' + this.type, self);
        }

        clearTimeout(self.timeout);

        self.hoverState = 'in';

        if (!self.options.delay || !self.options.delay.show) return self.show();

        self.timeout = setTimeout(function () {
          if (self.hoverState == 'in') self.show();
        }, self.options.delay.show);
      };

      Tooltip.prototype.leave = function (obj) {
        var self = obj instanceof this.constructor ?
          obj : $(obj.currentTarget).data('bs.' + this.type);

        if (!self) {
          self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
          $(obj.currentTarget).data('bs.' + this.type, self);
        }

        clearTimeout(self.timeout);

        self.hoverState = 'out';

        if (!self.options.delay || !self.options.delay.hide) return self.hide();

        self.timeout = setTimeout(function () {
          if (self.hoverState == 'out') self.hide();
        }, self.options.delay.hide);
      };

      Tooltip.prototype.show = function () {
        var e = $.Event('show.bs.' + this.type);

        if (this.hasContent() && this.enabled) {
          this.$element.trigger(e);

          var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
          if (e.isDefaultPrevented() || !inDom) return;
          var that = this;

          var $tip = this.tip();

          var tipId = this.getUID(this.type);

          this.setContent();
          $tip.attr('id', tipId);
          this.$element.attr('aria-describedby', tipId);

          if (this.options.animation) $tip.addClass('fade');

          var placement = typeof this.options.placement == 'function' ?
            this.options.placement.call(this, $tip[0], this.$element[0]) :
            this.options.placement;

          var autoToken = /\s?auto?\s?/i;
          var autoPlace = autoToken.test(placement);
          if (autoPlace) placement = placement.replace(autoToken, '') || 'top';

          $tip
            .detach()
            .css({ top: 0, left: 0, display: 'block' })
            .addClass(placement)
            .data('bs.' + this.type, this);

          this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);

          var pos          = this.getPosition();
          var actualWidth  = $tip[0].offsetWidth;
          var actualHeight = $tip[0].offsetHeight;

          if (autoPlace) {
            var orgPlacement = placement;
            var $container   = this.options.container ? $(this.options.container) : this.$element.parent();
            var containerDim = this.getPosition($container);

            placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                        placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                        placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                        placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                        placement;

            $tip
              .removeClass(orgPlacement)
              .addClass(placement);
          }

          var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

          this.applyPlacement(calculatedOffset, placement);

          var complete = function () {
            var prevHoverState = that.hoverState;
            that.$element.trigger('shown.bs.' + that.type);
            that.hoverState = null;

            if (prevHoverState == 'out') that.leave(that);
          };

          $.support.transition && this.$tip.hasClass('fade') ?
            $tip
              .one('bsTransitionEnd', complete)
              .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
            complete();
        }
      };

      Tooltip.prototype.applyPlacement = function (offset, placement) {
        var $tip   = this.tip();
        var width  = $tip[0].offsetWidth;
        var height = $tip[0].offsetHeight;

        // manually read margins because getBoundingClientRect includes difference
        var marginTop = parseInt($tip.css('margin-top'), 10);
        var marginLeft = parseInt($tip.css('margin-left'), 10);

        // we must check for NaN for ie 8/9
        if (isNaN(marginTop))  marginTop  = 0;
        if (isNaN(marginLeft)) marginLeft = 0;

        offset.top  = offset.top  + marginTop;
        offset.left = offset.left + marginLeft;

        // $.fn.offset doesn't round pixel values
        // so we use setOffset directly with our own function B-0
        $.offset.setOffset($tip[0], $.extend({
          using: function (props) {
            $tip.css({
              top: Math.round(props.top),
              left: Math.round(props.left)
            });
          }
        }, offset), 0);

        $tip.addClass('in');

        // check to see if placing tip in new offset caused the tip to resize itself
        var actualWidth  = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;

        if (placement == 'top' && actualHeight != height) {
          offset.top = offset.top + height - actualHeight;
        }

        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

        if (delta.left) offset.left += delta.left;
        else offset.top += delta.top;

        var isVertical          = /top|bottom/.test(placement);
        var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
        var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';

        $tip.offset(offset);
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
      };

      Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
        this.arrow()
          .css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
          .css(isHorizontal ? 'top' : 'left', '');
      };

      Tooltip.prototype.setContent = function () {
        var $tip  = this.tip();
        var title = this.getTitle();

        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
        $tip.removeClass('fade in top bottom left right');
      };

      Tooltip.prototype.hide = function (callback) {
        var that = this;
        var $tip = this.tip();
        var e    = $.Event('hide.bs.' + this.type);

        function complete() {
          if (that.hoverState != 'in') $tip.detach();
          that.$element
            .removeAttr('aria-describedby')
            .trigger('hidden.bs.' + that.type);
          callback && callback();
        }

        this.$element.trigger(e);

        if (e.isDefaultPrevented()) return;

        $tip.removeClass('in');

        $.support.transition && this.$tip.hasClass('fade') ?
          $tip
            .one('bsTransitionEnd', complete)
            .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
          complete();

        this.hoverState = null;

        return this;
      };

      Tooltip.prototype.fixTitle = function () {
        var $e = this.$element;
        if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
          $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
        }
      };

      Tooltip.prototype.hasContent = function () {
        return this.getTitle();
      };

      Tooltip.prototype.getPosition = function ($element) {
        $element   = $element || this.$element;

        var el     = $element[0];
        var isBody = el.tagName == 'BODY';

        var elRect    = el.getBoundingClientRect();
        if (elRect.width == null) {
          // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
          elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top });
        }
        var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset();
        var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() };
        var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null;

        return $.extend({}, elRect, scroll, outerDims, elOffset);
      };

      Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
               placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
               placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
            /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   };

      };

      Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
        var delta = { top: 0, left: 0 };
        if (!this.$viewport) return delta;

        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
        var viewportDimensions = this.getPosition(this.$viewport);

        if (/right|left/.test(placement)) {
          var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll;
          var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
          if (topEdgeOffset < viewportDimensions.top) { // top overflow
            delta.top = viewportDimensions.top - topEdgeOffset;
          } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
            delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
          }
        } else {
          var leftEdgeOffset  = pos.left - viewportPadding;
          var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
          if (leftEdgeOffset < viewportDimensions.left) { // left overflow
            delta.left = viewportDimensions.left - leftEdgeOffset;
          } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
            delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
          }
        }

        return delta;
      };

      Tooltip.prototype.getTitle = function () {
        var title;
        var $e = this.$element;
        var o  = this.options;

        title = $e.attr('data-original-title')
          || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title);

        return title;
      };

      Tooltip.prototype.getUID = function (prefix) {
        do prefix += ~~(Math.random() * 1000000);
        while (document.getElementById(prefix));
        return prefix;
      };

      Tooltip.prototype.tip = function () {
        return (this.$tip = this.$tip || $(this.options.template));
      };

      Tooltip.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'));
      };

      Tooltip.prototype.enable = function () {
        this.enabled = true;
      };

      Tooltip.prototype.disable = function () {
        this.enabled = false;
      };

      Tooltip.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      };

      Tooltip.prototype.toggle = function (e) {
        var self = this;
        if (e) {
          self = $(e.currentTarget).data('bs.' + this.type);
          if (!self) {
            self = new this.constructor(e.currentTarget, this.getDelegateOptions());
            $(e.currentTarget).data('bs.' + this.type, self);
          }
        }

        self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
      };

      Tooltip.prototype.destroy = function () {
        var that = this;
        clearTimeout(this.timeout);
        this.hide(function () {
          that.$element.off('.' + that.type).removeData('bs.' + that.type);
        });
      };


      // TOOLTIP PLUGIN DEFINITION
      // =========================

      function Plugin(option) {
        return this.each(function () {
          var $this    = $(this);
          var data     = $this.data('bs.tooltip');
          var options  = typeof option == 'object' && option;
          var selector = options && options.selector;

          if (!data && option == 'destroy') return;
          if (selector) {
            if (!data) $this.data('bs.tooltip', (data = {}));
            if (!data[selector]) data[selector] = new Tooltip(this, options);
          } else {
            if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)));
          }
          if (typeof option == 'string') data[option]();
        });
      }

      var old = $.fn.tooltip;

      $.fn.tooltip             = Plugin;
      $.fn.tooltip.Constructor = Tooltip;


      // TOOLTIP NO CONFLICT
      // ===================

      $.fn.tooltip.noConflict = function () {
        $.fn.tooltip = old;
        return this;
      };

    }(jQuery);

    /* ========================================================================
     * Bootstrap: popover.js v3.3.1
     * http://getbootstrap.com/javascript/#popovers
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */


    +function ($) {
      'use strict';

      if(typeof $().popover == 'function')
        return true;
          
      // POPOVER PUBLIC CLASS DEFINITION
      // ===============================

      var Popover = function (element, options) {
        this.init('popover', element, options);
      };

      if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');

      Popover.VERSION  = '3.3.1';

      Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
      });


      // NOTE: POPOVER EXTENDS tooltip.js
      // ================================

      Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);

      Popover.prototype.constructor = Popover;

      Popover.prototype.getDefaults = function () {
        return Popover.DEFAULTS;
      };

      Popover.prototype.setContent = function () {
        var $tip    = this.tip();
        var title   = this.getTitle();
        var content = this.getContent();

        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
        $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
          this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
        ](content);

        $tip.removeClass('fade top bottom left right in');

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
      };

      Popover.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      };

      Popover.prototype.getContent = function () {
        var $e = this.$element;
        var o  = this.options;

        return $e.attr('data-content')
          || (typeof o.content == 'function' ?
                o.content.call($e[0]) :
                o.content);
      };

      Popover.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'));
      };

      Popover.prototype.tip = function () {
        if (!this.$tip) this.$tip = $(this.options.template);
        return this.$tip;
      };


      // POPOVER PLUGIN DEFINITION
      // =========================

      function Plugin(option) {
        return this.each(function () {
          var $this    = $(this);
          var data     = $this.data('bs.popover');
          var options  = typeof option == 'object' && option;
          var selector = options && options.selector;

          if (!data && option == 'destroy') return;
          if (selector) {
            if (!data) $this.data('bs.popover', (data = {}));
            if (!data[selector]) data[selector] = new Popover(this, options);
          } else {
            if (!data) $this.data('bs.popover', (data = new Popover(this, options)));
          }
          if (typeof option == 'string') data[option]();
        });
      }

      var old = $.fn.popover;

      $.fn.popover             = Plugin;
      $.fn.popover.Constructor = Popover;


      // POPOVER NO CONFLICT
      // ===================

      $.fn.popover.noConflict = function () {
        $.fn.popover = old;
        return this;
      };

    }(jQuery);
}
function chart_title(args) {
    'use strict';

    var container = d3.select(args.target);

    // remove the current title if it exists
    container.select('.mg-chart-title').remove();

    if (args.target && args.title) {
        //only show question mark if there's a description
        var optional_question_mark = (args.show_tooltips && args.description)
            ? '<i class="fa fa-question-circle fa-inverse description"></i>'
            : '';

        container.insert('h2', ':first-child')
            .attr('class', 'mg-chart-title')
            .html(args.title + optional_question_mark);

        //activate the question mark if we have a description
        if (args.show_tooltips && args.description) {
            var $newTitle = $(container.node()).find('h2.mg-chart-title');

            $newTitle.popover({
                html: true,
                animation: false,
                content: args.description,
                trigger: 'hover',
                placement: 'top',
                container: $newTitle
            });
        }
    }

    if (args.error) {
        error(args);
    }
}

MG.chart_title = chart_title;

function y_rug(args) {
    'use strict';
    var svg = mg_get_svg_child_of(args.target);

    var buffer_size = args.chart_type === 'point'
        ? args.buffer / 2
        : args.buffer * 2 / 3;

    var all_data = [];
    for (var i = 0; i < args.data.length; i++) {
        for (var j = 0; j < args.data[i].length; j++) {
            all_data.push(args.data[i][j]);
        }
    }

    var rug = svg.selectAll('line.mg-y-rug').data(all_data);

    //set the attributes that do not change after initialization, per
    //D3's general update pattern
    rug.enter().append('svg:line')
        .attr('class', 'mg-y-rug')
        .attr('opacity', 0.3);

    //remove rug elements that are no longer in use
    rug.exit().remove();

    //set coordinates of new rug elements
    rug.exit().remove();

    rug.attr('x1', args.left + 1)
        .attr('x2', args.left+buffer_size)
        .attr('y1', args.scalefns.yf)
        .attr('y2', args.scalefns.yf);

    if (args.color_accessor) {
        rug.attr('stroke', args.scalefns.color);
        rug.classed('mg-y-rug-mono', false);
    } else {
        rug.attr('stroke', null);
        rug.classed('mg-y-rug-mono', true);
    }
}

MG.y_rug = y_rug;

function y_axis(args) {
    if (!args.processed) {
        args.processed = {};
    }

    var svg = mg_get_svg_child_of(args.target);

    var g;

    var min_y,
        max_y;

    args.scalefns.yf = function(di) {
        return args.scales.Y(di[args.y_accessor]);
    };

    var _set = false,
        gtZeroFilter = function(d) { return d[args.y_accessor] > 0; },
        mapToY = function(d) { return d[args.y_accessor]; };
    for (var i = 0; i < args.data.length; i++) {
        var a = args.data[i];

        if (args.y_scale_type === 'log') {
            // filter positive values
            a = a.filter(gtZeroFilter);
        }

        if (a.length > 0) { // get min/max in one pass
            var extent = d3.extent(a, mapToY);

            if (!_set) {
                // min_y and max_y haven't been set
                min_y = extent[0];
                max_y = extent[1];
                _set = true;
            } else {
                min_y = Math.min(extent[0], min_y);
                max_y = Math.max(extent[1], max_y);
            }
        }
    }

    // the default case is for the y-axis to start at 0, unless we explicitly want it
    // to start at an arbitrary number or from the data's minimum value
    if (min_y >= 0 && !args.min_y && !args.min_y_from_data) {
        min_y = 0;
    }

    if (args.chart_type === 'bar') {
        min_y = 0;
        max_y = d3.max(args.data[0], function(d) {
            var trio = [];
            trio.push(d[args.y_accessor]);

            if (args.baseline_accessor !== null) {
                trio.push(d[args.baseline_accessor]);
            }

            if (args.predictor_accessor !== null) {
                trio.push(d[args.predictor_accessor]);
            }

            return Math.max.apply(null, trio);
        });
    }
    //if a min_y or max_y have been set, use those instead
    min_y = args.min_y !== null ? args.min_y : min_y;
    max_y = args.max_y !== null ? args.max_y : max_y * args.inflator;
    if (args.y_scale_type !== 'log') {
        //we are currently saying that if the min val > 0, set 0 as min y
        if (min_y >= 0) {
            args.y_axis_negative = false;
        } else {
            min_y = min_y  - (max_y * (args.inflator - 1));
            args.y_axis_negative = true;
        }
    }

    if (!args.min_y && args.min_y_from_data) {
        min_y = min_y / args.inflator;
    }

    args.processed.min_y = min_y;
    args.processed.max_y = max_y;

    MG.call_hook('y_axis.process_min_max', args, min_y, max_y);
    min_y = args.processed.min_y;
    max_y = args.processed.max_y;

    if (args.y_scale_type === 'log') {
        if (args.chart_type === 'histogram') {
            // log histogram plots should start just below 1
            // so that bins with single counts are visible
            min_y = 0.2;
        } else {
            if (min_y <= 0) {
                min_y = 1;
            }
        }
        args.scales.Y = d3.scale.log()
            .domain([min_y, max_y])
            .range([args.height - args.bottom - args.buffer, args.top])
            .clamp(true);
    } else {
        args.scales.Y = d3.scale.linear()
            .domain([min_y, max_y])
            .range([args.height - args.bottom - args.buffer, args.top]);
    }

    //used for ticks and such, and designed to be paired with log or linear
    args.scales.Y_axis = d3.scale.linear()
        .domain([args.processed.min_y, args.processed.max_y])
        .range([args.height - args.bottom - args.buffer, args.top]);

    var yax_format = args.yax_format;
    if (!yax_format) {
        if (args.format === 'count') {
            yax_format = function(f) {
                if (f < 1.0) {
                    // Don't scale tiny values.
                    return args.yax_units + d3.round(f, args.decimals);
                } else {
                    var pf = d3.formatPrefix(f);
                    return args.yax_units + pf.scale(f) + pf.symbol;
                }
            };
        } else { //percentage
            yax_format = function(d_) {
                var n = d3.format('2p');
                return n(d_);
            };
        }
    }

    //remove the old y-axis, add new one
    svg.selectAll('.mg-y-axis').remove();

    if (!args.y_axis) {
        return this;
    }

    //y axis
    g = svg.append('g')
        .classed('mg-y-axis', true)
        .classed('mg-y-axis-small', args.use_small_class);

    //are we adding a label?
    if (args.y_label) {
        g.append('text')
            .attr('class', 'label')
            .attr('x', function() {
                return -1 * (args.top + args.buffer +
                        ((args.height - args.bottom - args.buffer)
                            - (args.top + args.buffer)) / 2);
            })
            .attr('y', function() {
                return args.left / 2;
            })
            .attr("dy", "0.4em")
            .attr('text-anchor', 'middle')
            .text(function(d) {
                return args.y_label;
            })
            .attr("transform", function(d) {
                return "rotate(-90)";
            });
    }

    var scale_ticks = args.scales.Y.ticks(args.yax_count);

    function log10(val) {
         if (val === 1000) {
            return 3;
         }
         if (val === 1000000) {
            return 7;
         }
         return Math.log(val) / Math.LN10;
    }

    if (args.y_scale_type === 'log') {
        // get out only whole logs
        scale_ticks = scale_ticks.filter(function(d) {
            return Math.abs(log10(d)) % 1 < 1e-6 || Math.abs(log10(d)) % 1 > 1-1e-6;
        });
    }

    //filter out fraction ticks if our data is ints and if ymax > number of generated ticks
    var number_of_ticks = args.scales.Y.ticks(args.yax_count).length;

    //is our data object all ints?
    var data_is_int = true;
    args.data.forEach(function(d, i) {
        d.forEach(function(d, i) {
            if (d[args.y_accessor] % 1 !== 0) {
                data_is_int = false;
                return false;
            }
        });
    });

    if (data_is_int && number_of_ticks > max_y && args.format === 'count') {
        //remove non-integer ticks
        scale_ticks = scale_ticks.filter(function(d) {
            return d % 1 === 0;
        });
    }

    //add the y-axis line; if we have 0s hide the line
    var tick_length = scale_ticks.length;
    if (!args.x_extended_ticks && !args.y_extended_ticks && tick_length) {
        var y1scale, y2scale;
        if (tick_length) {
            y1scale = args.scales.Y(scale_ticks[0]).toFixed(2);
            y2scale = args.scales.Y(scale_ticks[tick_length - 1]).toFixed(2);
        } else {
            y1scale = 0;
            y2scale = 0;
        }

        g.append('line')
            .attr('x1', args.left)
            .attr('x2', args.left)
            .attr('y1', y1scale)
            .attr('y2', y2scale);
    }

    //add y ticks
    g.selectAll('.mg-yax-ticks')
        .data(scale_ticks).enter()
            .append('line')
                .classed('mg-extended-y-ticks', args.y_extended_ticks)
                .attr('x1', args.left)
                .attr('x2', function() {
                    return (args.y_extended_ticks)
                        ? args.width - args.right
                        : args.left - args.yax_tick_length;
                })
                .attr('y1', function(d) { return args.scales.Y(d).toFixed(2); })
                .attr('y2', function(d) { return args.scales.Y(d).toFixed(2); });

    g.selectAll('.mg-yax-labels')
        .data(scale_ticks).enter()
            .append('text')
                .attr('x', args.left - args.yax_tick_length * 3 / 2)
                .attr('dx', -3).attr('y', function(d) {
                    return args.scales.Y(d).toFixed(2);
                })
                .attr('dy', '.35em')
                .attr('text-anchor', 'end')
                .text(function(d) {
                    var o = yax_format(d);
                    return o;
                });

    if (args.y_rug) {
        y_rug(args);
    }

    return this;
}

MG.y_axis = y_axis;

function y_axis_categorical(args) {
    // first, come up with y_axis
    args.scales.Y = d3.scale.ordinal()
        .domain(args.categorical_variables)
        .rangeRoundBands([args.height - args.bottom - args.buffer, args.top], args.padding_percentage, args.outer_padding_percentage);

    args.scalefns.yf = function(di) {
        return args.scales.Y(di[args.y_accessor]);
    };

    var svg = mg_get_svg_child_of(args.target);

    //remove the old y-axis, add new one
    svg.selectAll('.mg-y-axis').remove();

    var g = svg.append('g')
        .classed('mg-y-axis', true)
        .classed('mg-y-axis-small', args.use_small_class);

    if (!args.y_axis) {
        return this;
    }

    var labels = g.selectAll('text').data(args.categorical_variables).enter().append('svg:text')
        .attr('x', args.left)
        .attr('y', function(d) {
            return args.scales.Y(d) + args.scales.Y.rangeBand() / 2
                + (args.buffer)*args.outer_padding_percentage;
        })
        .attr('dy', '.35em')
        .attr('text-anchor', 'end')
        .text(String);

    if (args.rotate_y_labels) {
        labels.attr({
            dy: 0,
            transform: function() {
                var elem = d3.select(this);
                return 'rotate('+args.rotate_y_labels+' '+elem.attr('x')+','+elem.attr('y')+')';
            }
        });
    }

    return this;
}

MG.y_axis_categorical = y_axis_categorical;

function x_rug(args) {
    'use strict';
    var buffer_size = args.chart_type === 'point'
        ? args.buffer / 2
        : args.buffer;
    var svg = mg_get_svg_child_of(args.target);

    var all_data = mg_flatten_array(args.data)
    // for (var i=0; i<args.data.length; i++) {
    //     for (var j=0; j<args.data[i].length; j++) {
    //         all_data.push(args.data[i][j]);
    //     }
    // }

    var rug = svg.selectAll('line.mg-x-rug').data(all_data);

    //set the attributes that do not change after initialization, per
    //D3's general update pattern
    rug.enter().append('svg:line')
        .attr('class', 'mg-x-rug')
        .attr('opacity', 0.3);

    //remove rug elements that are no longer in use
    rug.exit().remove();

    //set coordinates of new rug elements
    rug.exit().remove();

    rug.attr('x1', args.scalefns.xf)
        .attr('x2', args.scalefns.xf)
        .attr('y1', args.height-args.top+buffer_size)
        .attr('y2', args.height-args.top);

    if (args.color_accessor) {
        rug.attr('stroke', args.scalefns.color);
        rug.classed('mg-x-rug-mono', false);
    } else {
        rug.attr('stroke', null);
        rug.classed('mg-x-rug-mono', true);
    }
}

MG.x_rug = x_rug;

function x_axis(args) {
    'use strict';
    var svg = mg_get_svg_child_of(args.target);
    var g;
    var min_x;
    var max_x;

    args.processed = {};
    var all_data = [];
    for (var i = 0; i < args.data.length; i++) {
        for (var j = 0; j < args.data[i].length; j++) {
            all_data.push(args.data[i][j]);
        }
    }
    args.scalefns.xf = function(di) {
        return args.scales.X(di[args.x_accessor]);
    };

    if (args.chart_type === 'point') {
        mg_point_add_color_scale(args);
        mg_point_add_size_scale(args);
    }

    mg_find_min_max_x(args);

    args.scales.X = (args.time_series)
        ? d3.time.scale()
        : d3.scale.linear();

    args.scales.X
        .domain([args.processed.min_x, args.processed.max_x])
        .range([args.left + args.buffer, args.width - args.right - args.buffer - args.additional_buffer]);

    //remove the old x-axis, add new one
    svg.selectAll('.mg-x-axis').remove();

    if (!args.x_axis) {
        return this;
    }

    //x axis
    g = svg.append('g')
        .classed('mg-x-axis', true)
        .classed('mg-x-axis-small', args.use_small_class);

    var last_i = args.scales.X.ticks(args.xax_count).length - 1;

    //are we adding a label?
    if (args.x_label) {
        mg_add_x_label(g, args);
    }

    mg_add_x_ticks(g, args);
    mg_add_x_tick_labels(g, args);

    if (args.x_rug) {
        x_rug(args);
    }

    return this;
}

MG.x_axis = x_axis;

function x_axis_categorical(args) {
    var svg = mg_get_svg_child_of(args.target);

    var svg_width = args.width,
        additional_buffer = 0;

    if (args.chart_type === 'bar') {
        additional_buffer = args.buffer + 5;
    }

    args.scales.X = d3.scale.ordinal()
        .domain(args.categorical_variables.reverse())
        .rangeRoundBands([args.left, args.width - args.right - args.buffer - additional_buffer]);

    args.scalefns.xf = function(di) {
        return args.scales.X(di[args.x_accessor]);
    };

    //remove the old x-axis, add new one
    svg.selectAll('.mg-x-axis').remove();

    var g = svg.append('g')
        .classed('mg-x-axis', true)
        .classed('mg-x-axis-small', args.use_small_class);

    if (!args.x_axis) {
        return this;
    }

    var labels = g.selectAll('text').data(args.categorical_variables).enter().append('svg:text');

    labels.attr('x', function(d) {
            return args.scales.X(d) + args.scales.X.rangeBand() / 2
                + (args.buffer) * args.outer_padding_percentage + (additional_buffer / 2);
        })
        .attr('y', args.height - args.bottom + args.buffer)
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .text(String);

    if (args.rotate_x_labels) {
        labels.attr({
            dy: 0,
            'text-anchor': 'end',
            transform: function() {
                var elem = d3.select(this);
                return 'rotate('+args.rotate_x_labels+' '+elem.attr('x')+','+elem.attr('y')+')';
            }
        });
    }

    if (args.truncate_x_labels) {
        labels.each(function(d, idx) {
            var elem = this,
                width = args.scales.X.rangeBand();
            truncate_text(elem, d, width);
        });
    }

    return this;
}

MG.x_axis_categorical = x_axis_categorical;

function mg_point_add_color_scale(args) {
    var min_color, max_color,
        color_domain, color_range;

    if (args.color_accessor !== null) {
        if (args.color_domain === null) {
            if (args.color_type === 'number') {
                min_color = d3.min(args.data[0], function(d) {
                    return d[args.color_accessor];
                });

                max_color = d3.max(args.data[0], function(d) {
                    return d[args.color_accessor];
                });

                color_domain = [min_color, max_color];
            }
            else if (args.color_type === 'category') {
                color_domain = d3.set(args.data[0]
                    .map(function(d) {
                        return d[args.color_accessor];
                    }))
                    .values();

                color_domain.sort();
            }
        } else {
            color_domain = args.color_domain;
        }

        if (args.color_range === null) {
            if (args.color_type === 'number') {
                color_range = ['blue', 'red'];
            } else {
                color_range = null;
            }
        } else {
            color_range = args.color_range;
        }

    if (args.color_type === 'number') {
            args.scales.color = d3.scale.linear()
                .domain(color_domain)
                .range(color_range)
                .clamp(true);
        } else {
            args.scales.color = args.color_range !== null
                ? d3.scale.ordinal().range(color_range)
                : (color_domain.length > 10
                    ? d3.scale.category20() : d3.scale.category10());

            args.scales.color.domain(color_domain);
        }

        args.scalefns.color = function(di) {
            return args.scales.color(di[args.color_accessor]);
        };
    }
}

function mg_point_add_size_scale(args) {
    var min_size, max_size, size_domain, size_range;
    if (args.size_accessor !== null) {
        if (args.size_domain === null) {
            min_size = d3.min(args.data[0], function(d) {
                return d[args.size_accessor];
            });

            max_size = d3.max(args.data[0], function(d) {
                return d[args.size_accessor];
            });

            size_domain = [min_size, max_size];
        } else {
            size_domain = args.size_domain;
        }
        if (args.size_range === null) {
            size_range = [1,5]; //args.size_domain;
        } else {
            size_range = args.size_range;
        }

        args.scales.size = d3.scale.linear()
            .domain(size_domain)
            .range(size_range)
            .clamp(true);

        args.scalefns.size = function(di) {
            return args.scales.size(di[args.size_accessor]);
        };
    }
}

function mg_add_x_label(g, args) {
    g.append('text')
        .attr('class', 'label')
        .attr('x', function() {
            return (args.left + args.width - args.right) / 2;
        })
        .attr('y', (args.height - args.bottom / 2).toFixed(2))
        .attr('dy', '.50em')
        .attr('text-anchor', 'middle')
        .text(function(d) {
            return args.x_label;
        });
}

function mg_default_bar_xax_format(args) {
    return function(f) {
        if (f < 1.0) {
            //don't scale tiny values
            return args.xax_units + d3.round(f, args.decimals);
        } else {
            var pf = d3.formatPrefix(f);
            return args.xax_units + pf.scale(f) + pf.symbol;
        }
    };
}

function mg_get_time_frame(diff){
    // diff should be (max_x - min_x) / 1000, in other words, the difference in seconds.
    if (diff < 60) {
        time_frame = 'seconds';
    } else if (diff / (60 * 60) <= 24) {
        time_frame = 'less-than-a-day';
    } else if (diff / (60 * 60) <= 24 * 4) {
        time_frame = 'four-days';
    } else {
        time_frame = 'default';
    }
    return time_frame;
}

function mg_get_time_format(diff){
    if (diff < 60) {
        main_time_format = d3.time.format('%M:%S');
    } else if (diff / (60 * 60) <= 24) {
        main_time_format = d3.time.format('%H:%M');
    } else if (diff / (60 * 60) <= 24 * 4) {
        main_time_format = d3.time.format('%H:%M');
    } else {
        main_time_format = d3.time.format('%b %d');
    }
    return main_time_format;
}

function mg_default_xax_format(args) {
    if (args.xax_format) {
        return args.xax_format;
    }
    var test_point = mg_flatten_array(args.data)[0][args.x_accessor]

    return function(d) {
        var diff;
        var main_time_format;
        var time_frame;

        if (args.time_series) {
            diff = (args.processed.max_x - args.processed.min_x) / 1000;

            time_frame = mg_get_time_frame(diff);
            main_time_format = mg_get_time_format(diff);
        }

        args.processed.main_x_time_format = main_time_format;
        args.processed.x_time_frame = time_frame;

        var df = d3.time.format('%b %d');
        var pf = d3.formatPrefix(d);

        // format as date or not, of course user can pass in
        // a custom function if desired
        if(test_point instanceof Date) {
            return args.processed.main_x_time_format(new Date(d));
        } else if (typeof test_point === 'number') {
            if (d < 1.0) {
                //don't scale tiny values
                return args.xax_units + d3.round(d, args.decimals);
            } else {
                pf = d3.formatPrefix(d);
                return args.xax_units + pf.scale(d) + pf.symbol;
            }
        } else {
            return d;
        }
    };
}

function mg_add_x_ticks(g, args) {
    var last_i = args.scales.X.ticks(args.xax_count).length - 1;
    var ticks = args.scales.X.ticks(args.xax_count);

    //force min to be the first tick rather than the first element in ticks
    if(args.xax_start_at_min) {
        ticks[0] = args.processed.min_x;
    }

    if (args.chart_type !== 'bar' && !args.x_extended_ticks && !args.y_extended_ticks) {
        //draw x-axis line
        g.append('line')
            .attr('x1', function() {
                //start the axis line from the beginning, domain's min, or the auto-generated
                //ticks' first element, depending on whether xax_count is set to 0 or
                //xax_start_at_min is set to true
                if (args.xax_count === 0) {
                    return args.left + args.buffer;
                }
                else if (args.xax_start_at_min) {
                    return args.scales.X(args.processed.min_x).toFixed(2)
                }
                else {
                    return (args.scales.X(args.scales.X.ticks(args.xax_count)[0])).toFixed(2);
                }
            })
            .attr('x2',
                (args.xax_count === 0)
                    ? args.width - args.right - args.buffer
                    : (args.scales.X(args.scales.X.ticks(args.xax_count)[last_i])).toFixed(2)
            )
            .attr('y1', args.height - args.bottom)
            .attr('y2', args.height - args.bottom);
    }

    g.selectAll('.mg-xax-ticks')
        .data(ticks).enter()
            .append('line')
                .attr('x1', function(d) { return args.scales.X(d).toFixed(2); })
                .attr('x2', function(d) { return args.scales.X(d).toFixed(2); })
                .attr('y1', args.height - args.bottom)
                .attr('y2', function() {
                    return (args.x_extended_ticks)
                        ? args.top
                        : args.height - args.bottom + args.xax_tick_length;
                })
                .attr('class', function() {
                    if (args.x_extended_ticks) {
                        return 'mg-extended-x-ticks';
                    }
                });
}

function mg_add_x_tick_labels(g, args) {
    var ticks = args.scales.X.ticks(args.xax_count);

    //force min to be the first tick rather than the first element in ticks
    if(args.xax_start_at_min) {
        ticks[0] = args.processed.min_x;
    }

    g.selectAll('.mg-xax-labels')
        .data(ticks).enter()
            .append('text')
                .attr('x', function(d) { return args.scales.X(d).toFixed(2); })
                .attr('y', (args.height - args.bottom + args.xax_tick_length * 7 / 3).toFixed(2))
                .attr('dy', '.50em')
                .attr('text-anchor', 'middle')
                .text(function(d) {
                    return args.xax_units + args.processed.xax_format(d);
                });

    if (args.time_series && (args.show_years || args.show_secondary_x_label)) {
        var secondary_marks,
            secondary_function, yformat;

        var time_frame = args.processed.x_time_frame;

        switch(time_frame) {
            case 'seconds':
                secondary_function = d3.time.days;
                yformat = d3.time.format('%I %p');
                break;
            case 'less-than-a-day':
                secondary_function = d3.time.days;
                yformat = d3.time.format('%b %d');
                break;
            case 'four-days':
                secondary_function = d3.time.days;
                yformat = d3.time.format('%b %d');
                break;
            default:
                secondary_function = d3.time.years;
                yformat = d3.time.format('%Y');
        }

        var years = secondary_function(args.processed.min_x, args.processed.max_x);

        //if xax_start_at_min is set
        if (args.xax_start_at_min && years.length === 0) {
            var first_tick = ticks[0];
            years = [first_tick];
        } else if (years.length === 0) {
            var first_tick = args.scales.X.ticks(args.xax_count)[0];
            years = [first_tick];
        }

        //append year marker to x-axis group
        g = g.append('g')
            .classed('mg-year-marker', true)
            .classed('mg-year-marker-small', args.use_small_class);

        if (time_frame === 'default' && args.show_year_markers) {
            g.selectAll('.mg-year-marker')
                .data(years).enter()
                    .append('line')
                        .attr('x1', function(d) { return args.scales.X(d).toFixed(2); })
                        .attr('x2', function(d) { return args.scales.X(d).toFixed(2); })
                        .attr('y1', args.top)
                        .attr('y2', args.height - args.bottom);
        }

        g.selectAll('.mg-year-marker')
            .data(years).enter()
                .append('text')
                    .attr('x', function(d, i) {
                        if (args.xax_start_at_min && i == 0) {
                            d = ticks[0];
                        }

                        return args.scales.X(d).toFixed(2);
                    })
                    .attr('y', (args.height - args.bottom + args.xax_tick_length * 7 / 1.3).toFixed(2))
                    .attr('dy', args.use_small_class ? -3 : 0)
                    .attr('text-anchor', 'middle')
                    .text(function(d) {
                        return yformat(new Date(d));
                    });
    }
}

function mg_find_min_max_x(args) {
    var last_i,
        extent_x = [],
        min_x,
        max_x,
        all_data = [].concat.apply([], args.data),
        mapDtoX = function(d) { return d[args.x_accessor]; };

    if (args.chart_type === 'line' || args.chart_type === 'point' || args.chart_type === 'histogram') {
        extent_x = d3.extent(all_data, mapDtoX);
        min_x = extent_x[0];
        max_x = extent_x[1];

    } else if (args.chart_type === 'bar') {
        min_x = 0;
        max_x = d3.max(all_data, function(d) {
            var trio = [
                d[args.x_accessor],
                (d[args.baseline_accessor]) ? d[args.baseline_accessor] : 0,
                (d[args.predictor_accessor]) ? d[args.predictor_accessor] : 0
            ];
            return Math.max.apply(null, trio);
        });
    }
    //if data set is of length 1, expand the range so that we can build the x-axis
    if (min_x === max_x
            && !(args.min_x && args.max_x)
        ) {
        if (min_x instanceof Date) {
            var yesterday = MG.clone(min_x).setDate(min_x.getDate() - 1);
            var tomorrow = MG.clone(min_x).setDate(min_x.getDate() + 1);

            min_x = yesterday;
            max_x = tomorrow;
        } else if (typeof min_x === 'number') {
            min_x = min_x - 1;
            max_x = max_x + 1;
        } else if (typeof min_x === 'string') {
            min_x = Number(min_x) - 1;
            max_x = Number(max_x) + 1;
        }

        //force xax_count to be 2
        args.xax_count = 2;
    }

    min_x = args.min_x || min_x;
    max_x = args.max_x || max_x;
    args.x_axis_negative = false;

    args.processed.min_x = min_x;
    args.processed.max_x = max_x;

    mg_select_xax_format(args);

    MG.call_hook('x_axis.process_min_max', args, min_x, max_x);

    if (!args.time_series) {
        if (args.processed.min_x < 0) {
            args.processed.min_x = args.processed.min_x  - (args.processed.max_x * (args.inflator - 1));
            args.x_axis_negative = true;
        }
    }

    if (args.chart_type === 'bar') {
        args.additional_buffer = args.buffer * 5;
    } else {
        args.additional_buffer = 0;
    }
}

function mg_select_xax_format(args) {
    var c = args.chart_type;

    if (!args.processed.xax_format) {
        if (args.xax_format) {
            args.processed.xax_format = args.xax_format;
        } else {
          if (c === 'line' || c === 'point' || c === 'histogram') {
              args.processed.xax_format = mg_default_xax_format(args);
          } else if (c === 'bar') {
              args.processed.xax_format = mg_default_bar_xax_format(args);
          }
        }
    }
}

function init(args) {
    'use strict';
    var defaults = {
        target: null,
        title: null,
        description: null
    };

    // If you pass in a dom element for args.target, the expectation
    // of a string elsewhere will break.

    args = arguments[0];
    if (!args) { args = {}; }
    args = merge_with_defaults(args, defaults);
    if (d3.select(args.target).empty()) {
        console.warn('The specified target element "' + args.target + '" could not be found in the page. The chart will not be rendered.');
        return;
    }

    var container = d3.select(args.target);
    var svg = container.selectAll('svg');

    //this is how we're dealing with passing in a single array of data,
    //but with the intention of using multiple values for multilines, etc.

    //do we have a time_series?

    function is_time_series(args) {
        var flat_data = [];
        var first_elem = mg_flatten_array(args.data)[0];
        return first_elem[args.x_accessor] instanceof Date;
    }

    args.time_series = is_time_series(args);

    var svg_width = args.width;
    var svg_height = args.height;

    //are we setting the aspect ratio
    if (args.full_width) {
        // get parent element
        svg_width = get_width(args.target);
    }

    if (args.full_height) {
        svg_height = get_height(args.target);
    }

    if (args.chart_type === 'bar' && svg_height === null) {
        svg_height = args.height = args.data[0].length * args.bar_height + args.top + args.bottom;
    }

    //remove the svg if the chart type has changed
    if ((!svg.selectAll('.mg-main-line').empty() && args.chart_type !== 'line')
            || (!svg.selectAll('.mg-points').empty() && args.chart_type !== 'point')
            || (!svg.selectAll('.mg-histogram').empty() && args.chart_type !== 'histogram')
            || (!svg.selectAll('.mg-barplot').empty() && args.chart_type !== 'bar')
        ) {
        svg.remove();
    }

    //add svg if it doesn't already exist
    //using trim on html rather than :empty to ignore white spaces if they exist
    if (mg_get_svg_child_of(args.target).empty()) {
        //add svg
        svg = d3.select(args.target)
            .append('svg')
                .classed('linked', args.linked)
                .attr('width', svg_width)
                .attr('height', svg_height);
    }

    args.width = svg_width;
    args.height = svg_height;

    // add clip path element to svg
    svg.selectAll('.mg-clip-path').remove();

    svg.append('defs')
        .attr('class', 'mg-clip-path')
        .append('clipPath')
            .attr('id', 'mg-plot-window-' + mg_target_ref(args.target))
        .append('svg:rect')
            .attr('x', args.left)
            .attr('y', args.top)
            .attr('width', args.width - args.left - args.right - args.buffer)
            .attr('height', args.height - args.top - args.bottom - args.buffer + 1);

    //has the width or height changed?
    if (svg_width !== Number(svg.attr('width'))) {
        svg.attr('width', svg_width);
    }

    if (svg_height !== Number(svg.attr('height'))) {
        svg.attr('height', svg_height);
    }

    // @todo need to reconsider how we handle automatic scaling
    svg.attr('viewBox', '0 0 ' + svg_width + ' ' + svg_height);

    if (args.full_width || args.full_height) {
        svg.attr('preserveAspectRatio', 'xMinYMin meet');
    }

    // remove missing class
    svg.classed('mg-missing', false);

    // remove missing text
    svg.selectAll('.mg-missing-text').remove();
    svg.selectAll('.mg-missing-pane').remove();

    //add chart title if it's different than existing one
    chart_title(args);

    //draw axes
    args.use_small_class = args.height - args.top - args.bottom - args.buffer
            <= args.small_height_threshold && args.width - args.left-args.right - args.buffer * 2
            <= args.small_width_threshold || args.small_text;

    //if we're updating an existing chart and we have fewer lines than
    //before, remove the outdated lines, e.g. if we had 3 lines, and we're calling
    //data_graphic() on the same target with 2 lines, remove the 3rd line

    var i = 0;
    if (svg.selectAll('.mg-main-line')[0].length >= args.data.length) {
        //now, the thing is we can't just remove, say, line3 if we have a custom
        //line-color map, instead, see which are the lines to be removed, and delete those
        if (args.custom_line_color_map.length > 0) {
            var array_full_series = function(len) {
                var arr = new Array(len);
                for (var i = 0; i < arr.length; i++) { arr[i] = i + 1; }
                return arr;
            };

            //get an array of lines ids to remove
            var lines_to_remove = arr_diff(
                array_full_series(args.max_data_size),
                args.custom_line_color_map);

            for (i = 0; i < lines_to_remove.length; i++) {
                svg.selectAll('.mg-main-line.mg-line' + lines_to_remove[i] + '-color')
                    .remove();
            }
        }
        //if we don't have a customer line-color map, just remove the lines from the end
        else {
            var num_of_new = args.data.length;
            var num_of_existing = svg.selectAll('.mg-main-line')[0].length;

            for (i = num_of_existing; i > num_of_new; i--) {
                svg.selectAll('.mg-main-line.mg-line' + i + '-color')
                    .remove();
            }
        }
    }

    return this;
}

MG.init = init;



function markers(args) {
    'use strict';
    var svg = mg_get_svg_child_of(args.target);
    var gm;
    var gb;

    //remove existing markers and baselines
    svg.selectAll('.mg-markers').remove();
    svg.selectAll('.mg-baselines').remove();

    if (args.markers) {
        gm = svg.append('g')
            .attr('class', 'mg-markers');

        gm.selectAll('.mg-markers')
            .data(args.markers.filter(inRange))
            .enter()
            .append('line')
                .attr('x1', xPositionFixed)
                .attr('x2', xPositionFixed)
                .attr('y1', args.top)
                .attr('y2', function() {
                    return args.height - args.bottom - args.buffer;
                })
                .attr('stroke-dasharray', '3,1');

        gm.selectAll('.mg-markers')
            .data(args.markers.filter(inRange))
            .enter()
            .append('text')
                .attr('class', 'mg-marker-text')
                .attr('x', xPosition)
                .attr('y', args.top - 8)
                .attr('text-anchor', 'middle')
                .text(function(d) {
                    return d.label;
                });

        preventHorizontalOverlap(gm.selectAll('.mg-marker-text')[0], args);
    }

    
    function xPosition(d) {
        return args.scales.X(d[args.x_accessor]);
    }

    function xPositionFixed(d) {
        return xPosition(d).toFixed(2);
    }

    function inRange(d) {
        return (args.scales.X(d[args.x_accessor]) > args.buffer + args.left)
            && (args.scales.X(d[args.x_accessor]) < args.width - args.buffer - args.right);
    }

    if (args.baselines) {
        gb = svg.append('g')
            .attr('class', 'mg-baselines')
            .classed('mg-baselines-small', args.use_small_class);

        gb.selectAll('.mg-baselines')
            .data(args.baselines)
            .enter().append('line')
                .attr('x1', args.left + args.buffer)
                .attr('x2', args.width-args.right-args.buffer)
                .attr('y1', function(d){
                    return args.scales.Y(d.value).toFixed(2);
                })
                .attr('y2', function(d){
                    return args.scales.Y(d.value).toFixed(2);
                });

        gb.selectAll('.mg-baselines')
            .data(args.baselines)
            .enter().append('text')
                .attr('x', args.width-args.right - args.buffer)
                .attr('y', function(d){
                    return args.scales.Y(d.value).toFixed(2);
                })
                .attr('dy', -3)
                .attr('text-anchor', 'end')
                .text(function(d) {
                    return d.label;
                });
    }

    return this;
}

MG.markers = markers;

function mg_window_listeners(args){
	mg_if_aspect_ratio_resize_svg(args);
}

function mg_if_aspect_ratio_resize_svg(args){
	// If we've asked the svg to fill a div, resize with div.
    if (args.full_width || args.full_height){
        window.addEventListener('resize', function(){
            var svg = d3.select(args.target).select('svg');
            var aspect = svg.attr('height') / svg.attr('width');
            var newWidth = get_width(args.target);

            svg.attr('width', newWidth);
            svg.attr('height', aspect * newWidth);
        }, true);
    }

}

if (typeof jQuery !== 'undefined') {
    /*!
     * Bootstrap v3.3.1 (http://getbootstrap.com)
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     */

    /*!
     * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=c3834cc5b59ef727da53)
     * Config saved to config.json and https://gist.github.com/c3834cc5b59ef727da53
     */

    /* ========================================================================
     * Bootstrap: dropdown.js v3.3.1
     * http://getbootstrap.com/javascript/#dropdowns
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */


    +function ($) {
      'use strict';

      if(typeof $().dropdown == 'function')
        return true;

      // DROPDOWN CLASS DEFINITION
      // =========================

      var backdrop = '.dropdown-backdrop';
      var toggle   = '[data-toggle="dropdown"]';
      var Dropdown = function (element) {
        $(element).on('click.bs.dropdown', this.toggle);
      };

      Dropdown.VERSION = '3.3.1';

      Dropdown.prototype.toggle = function (e) {
        var $this = $(this);

        if ($this.is('.disabled, :disabled')) return;

        var $parent  = getParent($this);
        var isActive = $parent.hasClass('open');

        clearMenus();

        if (!isActive) {
          if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
            // if mobile we use a backdrop because click events don't delegate
            $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
          }

          var relatedTarget = { relatedTarget: this };
          $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));

          if (e.isDefaultPrevented()) return;

          $this
            .trigger('focus')
            .attr('aria-expanded', 'true');

          $parent
            .toggleClass('open')
            .trigger('shown.bs.dropdown', relatedTarget);
        }

        return false;
      };

      Dropdown.prototype.keydown = function (e) {
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

        var $this = $(this);

        e.preventDefault();
        e.stopPropagation();

        if ($this.is('.disabled, :disabled')) return;

        var $parent  = getParent($this);
        var isActive = $parent.hasClass('open');

        if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
          if (e.which == 27) $parent.find(toggle).trigger('focus');
          return $this.trigger('click');
        }

        var desc = ' li:not(.divider):visible a';
        var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);

        if (!$items.length) return;

        var index = $items.index(e.target);

        if (e.which == 38 && index > 0)                 index--;                        // up
        if (e.which == 40 && index < $items.length - 1) index++;                        // down
        if (!~index)                                      index = 0;

        $items.eq(index).trigger('focus');
      };

      function clearMenus(e) {
        if (e && e.which === 3) return;
        $(backdrop).remove();
        $(toggle).each(function () {
          var $this         = $(this);
          var $parent       = getParent($this);
          var relatedTarget = { relatedTarget: this };

          if (!$parent.hasClass('open')) return;

          $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));

          if (e.isDefaultPrevented()) return;

          $this.attr('aria-expanded', 'false');
          $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
        });
      }

      function getParent($this) {
        var selector = $this.attr('data-target');

        if (!selector) {
          selector = $this.attr('href');
          selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
        }

        var $parent = selector && $(selector);

        return $parent && $parent.length ? $parent : $this.parent();
      }


      // DROPDOWN PLUGIN DEFINITION
      // ==========================

      function Plugin(option) {
        return this.each(function () {
          var $this = $(this);
          var data  = $this.data('bs.dropdown');

          if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)));
          if (typeof option == 'string') data[option].call($this);
        });
      }

      var old = $.fn.dropdown;

      $.fn.dropdown             = Plugin;
      $.fn.dropdown.Constructor = Dropdown;


      // DROPDOWN NO CONFLICT
      // ====================

      $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old;
        return this;
      };


      // APPLY TO STANDARD DROPDOWN ELEMENTS
      // ===================================

      $(document)
        .on('click.bs.dropdown.data-api', clearMenus)
        .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation(); })
        .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown);

    }(jQuery);
}
MG.button_layout = function(target) {
    'use strict';
    this.target = target;
    this.feature_set = {};
    this.public_name = {};
    this.sorters = {};
    this.manual = [];
    this.manual_map = {};
    this.manual_callback = {};

    this._strip_punctuation = function(s) {
        var punctuationless = s.replace(/[^a-zA-Z0-9 _]+/g, '');
        var finalString = punctuationless.replace(/ +?/g, "");
        return finalString;
    };

    this.data = function(data) {
        this._data = data;
        return this;
    };

    this.manual_button = function(feature, feature_set, callback) {
        this.feature_set[feature]=feature_set;
        this.manual_map[this._strip_punctuation(feature)] = feature;
        this.manual_callback[feature]=callback;// the default is going to be the first feature.
        return this;
    };

    this.button = function(feature) {
        if (arguments.length > 1) {
            this.public_name[feature] = arguments[1];
        }

        if (arguments.length > 2) {
            this.sorters[feature] = arguments[2];
        }

        this.feature_set[feature] = [];
        return this;
    };

    this.callback = function(callback) {
        this._callback = callback;
        return this;
    };

    this.display = function() {
        var callback = this._callback;
        var manual_callback = this.manual_callback;
        var manual_map = this.manual_map;

        var d,f, features, feat;
        features = Object.keys(this.feature_set);

        var mapDtoF = function(f) { return d[f]; };

        var i;

        // build out this.feature_set with this.data
        for (i = 0; i < this._data.length; i++) {
            d = this._data[i];
            f = features.map(mapDtoF);
            for (var j = 0; j < features.length; j++) {
                feat = features[j];
                if (this.feature_set[feat].indexOf(f[j]) === -1) {
                    this.feature_set[feat].push(f[j]);
                }
            }
        }

        for (feat in this.feature_set) {
            if (this.sorters.hasOwnProperty(feat)) {
                this.feature_set[feat].sort(this.sorters[feat]);
            }
        }

        $(this.target).empty();

        $(this.target).append("<div class='col-lg-12 segments text-center'></div>");

        var dropdownLiAClick = function() {
            var k = $(this).data('key');
            var feature = $(this).data('feature');
            var manual_feature;
            $('.' + feature + '-btns button.btn span.title').html(k);
            if (!manual_map.hasOwnProperty(feature)) {
                callback(feature, k);
            } else {
                manual_feature = manual_map[feature];
                manual_callback[manual_feature](k);
            }

            return false;
        };

        for (var feature in this.feature_set) {
            features = this.feature_set[feature];
            $(this.target + ' div.segments').append(
                    '<div class="btn-group '+this._strip_punctuation(feature)+'-btns text-left">' + // This never changes.
                    '<button type="button" class="btn btn-default btn-lg dropdown-toggle" data-toggle="dropdown">' +
                        "<span class='which-button'>" + (this.public_name.hasOwnProperty(feature) ? this.public_name[feature] : feature) +"</span>" +
                        "<span class='title'>" + (this.manual_callback.hasOwnProperty(feature) ? this.feature_set[feature][0] : 'all') +  "</span>" + // if a manual button, don't default to all in label.
                        '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" role="menu">' +
                        (!this.manual_callback.hasOwnProperty(feature) ? '<li><a href="#" data-feature="'+feature+'" data-key="all">All</a></li>' : "") +
                        (!this.manual_callback.hasOwnProperty(feature) ? '<li class="divider"></li>' : "") +
                    '</ul>'
            + '</div>');

            for (i = 0; i < features.length; i++) {
                if (features[i] !== 'all' && features[i] !== undefined) { // strange bug with undefined being added to manual buttons.
                    $(this.target + ' div.' + this._strip_punctuation(feature) + '-btns ul.dropdown-menu').append(
                        '<li><a href="#" data-feature="' + this._strip_punctuation(feature) + '" data-key="' + features[i] + '">'
                            + features[i] + '</a></li>'
                    );
                }
            }

            $('.' + this._strip_punctuation(feature) + '-btns .dropdown-menu li a').on('click', dropdownLiAClick);
        }

        return this;
    };

    return this;
};

(function() {
    'use strict';

    function lineChart(args) {

        this.init = function(args) {
            this.args = args;

            if (!args.data || args.data.length === 0) {
                args.error = 'No data was supplied';
                error(args);
                return this;
            }

            raw_data_transformation(args);

            process_line(args);
            
            init(args);
            x_axis(args);
            y_axis(args);

            this.markers();
            this.mainPlot();
            this.rollover();
            this.windowListeners();

            MG.call_hook('line.after_init', this);

            return this;
        };

        this.mainPlot = function() {
            var svg = mg_get_svg_child_of(args.target);

            //remove any old legends if they exist
            svg.selectAll('.mg-line-legend').remove();

            var legend_group;
            var this_legend;
            if (args.legend) {
                legend_group = svg.append('g')
                    .attr('class', 'mg-line-legend');
            }
            var g;
            var data_median = 0;
            var updateTransitionDuration = (args.transition_on_update) ? 1000 : 0;
            var mapToY = function(d) {
                return d[args.y_accessor];
            };

            //main line
            var line = d3.svg.line()
                .x(args.scalefns.xf)
                .y(args.scalefns.yf)
                .interpolate(args.interpolate)
                .tension(args.interpolate_tension);

            //if missing_is_zero is not set, then hide data points that fall in missing
            //data ranges or that have been explicitly identified as missing in the 
            //data source
            if(!args.missing_is_zero) {
                //a line is defined if the _missing attrib is not set to true
                //and the y-accessor is not null
                line = line.defined(function(d) {
                    return (d['_missing'] == undefined || d['_missing'] != true) 
                        && d[args.y_accessor] != null;
                })
            }

            //for animating line on first load
            var flat_line = d3.svg.line()
                .defined(function(d) {
                    return (d['_missing'] == undefined || d['_missing'] != true)
                        && d[args.y_accessor] != null;
                })
                .x(args.scalefns.xf)
                .y(function() { return args.scales.Y(data_median); })
                .interpolate(args.interpolate)
                .tension(args.interpolate_tension);

            //main area
            var area = d3.svg.area()
                .defined(line.defined())
                .x(args.scalefns.xf)
                .y0(args.scales.Y.range()[0])
                .y1(args.scalefns.yf)
                .interpolate(args.interpolate)
                .tension(args.interpolate_tension);

            //confidence band
            var confidence_area;
            var existing_band = svg.selectAll('.mg-confidence-band');

            if (args.show_confidence_band) {
                confidence_area = d3.svg.area()
                    .defined(line.defined())
                    .x(args.scalefns.xf)
                    .y0(function(d) {
                        var l = args.show_confidence_band[0];
                        return args.scales.Y(d[l]);
                    })
                    .y1(function(d) {
                        var u = args.show_confidence_band[1];
                        return args.scales.Y(d[u]);
                    })
                    .interpolate(args.interpolate)
                    .tension(args.interpolate_tension);
            }

            //for building the optional legend
            var legend = '';
            var this_data;
            var confidenceBand;

            // should we continue with the default line render? A `line.all_series` hook should return false to prevent the default.
            var continueWithDefault = MG.call_hook('line.before_all_series', [args]);
            if (continueWithDefault !== false) {
                for (var i = args.data.length - 1; i >= 0; i--) {
                    this_data = args.data[i];

                    // passing the data for the current line
                    MG.call_hook('line.before_each_series', [this_data, args]);

                    //override increment if we have a custom increment series
                    var line_id = i + 1;
                    if (args.custom_line_color_map.length > 0) {
                        line_id = args.custom_line_color_map[i];
                    }

                    args.data[i].line_id = line_id;

                    if (this_data.length === 0) {
                        continue;
                    }

                    //add confidence band
                    if (args.show_confidence_band) {
                        if (!existing_band.empty()) {
                            confidenceBand = existing_band
                                .transition()
                                .duration(function() {
                                    return (args.transition_on_update) ? 1000 : 0;
                                });
                        } else {
                            confidenceBand = svg.append('path')
                                .attr('class', 'mg-confidence-band');
                        }

                        confidenceBand
                            .attr('d', confidence_area(args.data[i]))
                            .attr('clip-path', 'url(#mg-plot-window-'+ mg_target_ref(args.target)+')');
                    }

                    //add the area
                    var areas = svg.selectAll('.mg-main-area.mg-area' + (line_id) + '-color');
                    var displayArea = args.area && !args.use_data_y_min && !args.y_axis_negative && args.data.length <= 1;
                    if (displayArea) {
                        //if area already exists, transition it
                        if (!areas.empty()) {
                            svg.select('.mg-y-axis').node().parentNode.appendChild(areas.node());

                            areas
                                .transition()
                                    .duration(updateTransitionDuration)
                                    .attr('d', area(args.data[i]))
                                    .attr('clip-path', 'url(#mg-plot-window-'+ mg_target_ref(args.target)+')');
                        } else { //otherwise, add the area
                            svg.append('path')
                                .attr('class', 'mg-main-area ' + 'mg-area' + (line_id) + '-color')
                                .attr('d', area(args.data[i]))
                                .attr('clip-path', 'url(#mg-plot-window-' + mg_target_ref(args.target) + ')');
                        }
                    } else if (!areas.empty()) {
                        areas.remove();
                    }

                    //add the line, if it already exists, transition the fine gentleman
                    var existing_line = svg.select('path.mg-main-line.mg-line' + (line_id) + '-color');
                    if (!existing_line.empty()) {
                        //$(svg.node()).find('.mg-y-axis').after($(existing_line.node()).detach());
                        svg.select('.mg-y-axis').node().parentNode.appendChild(existing_line.node());

                        var lineTransition = existing_line
                            .transition()
                            .duration(updateTransitionDuration);

                        if (!displayArea && args.transition_on_update) {
                            lineTransition.attrTween('d', path_tween(line(args.data[i]), 4));
                        } else {
                            lineTransition.attr('d', line(args.data[i]));
                        }
                    }
                    else { //otherwise...
                        //if we're animating on load, animate the line from its median value
                        if (args.animate_on_load) {
                            data_median = d3.median(args.data[i], mapToY);

                            svg.append('path')
                                .attr('class', 'mg-main-line ' + 'mg-line' + (line_id) + '-color')
                                .attr('d', flat_line(args.data[i]))
                                .transition()
                                    .duration(1000)
                                    .attr('d', line(args.data[i]))
                                    .attr('clip-path', 'url(#mg-plot-window-' + mg_target_ref(args.target) + ')');
                        } else { //or just add the line
                            svg.append('path')
                                .attr('class', 'mg-main-line ' + 'mg-line' + (line_id) + '-color')
                                .attr('d', line(args.data[i]))
                                .attr('clip-path', 'url(#mg-plot-window-' + mg_target_ref(args.target) + ')');
                        }
                    }

                    //build legend
                    if (args.legend) {
                        if (is_array(args.legend)) {
                            this_legend = args.legend[i];
                        } else if (is_function(args.legend)) {
                            this_legend = args.legend(this_data);
                        }

                        if (args.legend_target) {
                            legend = "<span class='mg-line" + line_id  + "-legend-color'>&mdash; "
                                + this_legend + "&nbsp; </span>" + legend;
                        } else {

                            var last_point = this_data[this_data.length-1];
                            legend_group.append('svg:text')
                                .classed('mg-line' + (line_id) + '-legend-color', true)
                                .attr('x', args.scalefns.xf(last_point))
                                .attr('dx', args.buffer)
                                .attr('y', args.scalefns.yf(last_point))
                                .attr('dy', '.35em')
                                .attr('font-size', 10)
                                .attr('font-weight', '300')
                                .text(this_legend);

                            preventVerticalOverlap(legend_group.selectAll('.mg-line-legend text')[0], args);
                        }
                    }

                    // passing the data for the current line
                    MG.call_hook('line.after_each_series', [this_data, existing_line, args]);
                }
            }

            if (args.legend_target) {
                d3.select(args.legend_target).html(legend);
            }

            return this;
        };

        this.markers = function() {
            markers(args);
            return this;
        };

        this.rollover = function() {
            var svg = mg_get_svg_child_of(args.target);
            var g;
            var i;

            //remove the old rollovers if they already exist
            svg.selectAll('.mg-rollover-rect').remove();
            svg.selectAll('.mg-voronoi').remove();

            //remove the old rollover text and circle if they already exist
            svg.selectAll('.mg-active-datapoint').remove();
            svg.selectAll('.mg-line-rollover-circle').remove();
            svg.selectAll('.mg-active-datapoint-container').remove();

            //rollover text
            svg.append('g')
                .attr('class', 'mg-active-datapoint-container')
                .attr('transform', 'translate(' + (args.width - args.right) + ',' + (args.top / 2) + ')')
                .append('text')
                    .attr('class', 'mg-active-datapoint')
                    .classed('mg-active-datapoint-small', args.use_small_class)
                    .attr('xml:space', 'preserve')
                    .attr('text-anchor', 'end');

            //append circle
            svg.selectAll('.mg-line-rollover-circle')
                .data(args.data).enter()
                    .append('circle')
                    .attr({
                      'class': function(d, i) {
                          return [
                              'mg-line-rollover-circle',
                              'mg-line' + d.line_id + '-color',
                              'mg-area' + d.line_id + '-color'
                          ].join(' ');
                      },
                      'cx': 0,
                      'cy': 0,
                      'r': 0
                    });

            //update our data by setting a unique line id for each series
            //increment from 1... unless we have a custom increment series
            var line_id = 1;

            for (i = 0; i < args.data.length; i++) {
                for (var j = 0; j < args.data[i].length; j++) {
                    //if custom line-color map is set, use that instead of line_id
                    if (args.custom_line_color_map.length > 0) {
                        args.data[i][j].line_id = args.custom_line_color_map[i];
                    } else {
                        args.data[i][j].line_id = line_id;
                    }
                }
                line_id++;
            }

            var data_nested;
            var xf;

            //for multi-line, use voronoi
            if (args.data.length > 1 && !args.aggregate_rollover) {

                //main rollover
                var voronoi = d3.geom.voronoi()
                    .x(function(d) { return args.scales.X(d[args.x_accessor]).toFixed(2); })
                    .y(function(d) { return args.scales.Y(d[args.y_accessor]).toFixed(2); })
                    .clipExtent([[args.buffer, args.buffer], [args.width - args.buffer, args.height - args.buffer]]);

                g = svg.append('g')
                    .attr('class', 'mg-voronoi');

                //we'll be using these when constructing the voronoi rollovers
                data_nested = d3.nest()
                    .key(function(d) {
                        return args.scales.X(d[args.x_accessor]) + ","
                            + args.scales.Y(d[args.y_accessor]);
                    })
                    .rollup(function(v) { return v[0]; })
                    .entries(d3.merge(args.data.map(function(d) { return d; })))
                    .map(function(d) { return d.values; });

                //add the voronoi rollovers
                g.selectAll('path')
                    .data(voronoi(data_nested))
                    .enter()
                        .append('path')
                            .filter(function(d) { return d !== undefined; })
                            .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
                            .datum(function(d) { return d.point; }) //because of d3.nest, reassign d
                            .attr('class', function(d) {
                                if (args.linked) {
                                    var v = d[args.x_accessor];
                                    var formatter = d3.time.format(args.linked_format);

                                    //only format when x-axis is date
                                    var id = (typeof v === 'number')
                                            ? i
                                            : formatter(v);

                                    return 'mg-line' + d.line_id + '-color ' + 'roll_' + id;
                                } else {
                                    return 'mg-line' + d.line_id + '-color';
                                }
                            })
                            .on('mouseover', this.rolloverOn(args))
                            .on('mouseout', this.rolloverOff(args))
                            .on('mousemove', this.rolloverMove(args));
            }

            // for multi-lines and aggregated rollovers, use rects
            else if (args.data.length > 1 && args.aggregate_rollover) {
                data_nested = d3.nest()
                    .key(function(d) { return d[args.x_accessor]; })
                    .entries(d3.merge(args.data))
                    .sort(function(a, b) { return new Date(a.key) - new Date(b.key); });

                xf = data_nested.map(function(di) {
                    return args.scales.X(new Date(di.key));
                });

                g = svg.append('g')
                  .attr('class', 'mg-rollover-rect');

                g.selectAll('.mg-rollover-rects')
                    .data(data_nested).enter()
                        .append('rect')
                            .attr('x', function(d, i) {
                                //if data set is of length 1
                                if(xf.length === 1) {
                                    return args.left + args.buffer;
                                } else if (i === 0) {
                                    return xf[i].toFixed(2);
                                } else {
                                    return ((xf[i-1] + xf[i])/2).toFixed(2);
                                }
                            })
                            .attr('y', args.top)
                            .attr('width', function(d, i) {
                                //if data set is of length 1
                                if(xf.length === 1) {
                                    return args.width - args.right - args.buffer;
                                } else if (i === 0) {
                                    return ((xf[i+1] - xf[i]) / 2).toFixed(2);
                                } else if (i == xf.length - 1) {
                                    return ((xf[i] - xf[i-1]) / 2).toFixed(2);
                                } else {
                                    return ((xf[i+1] - xf[i-1]) / 2).toFixed(2);
                                }
                            })
                            .attr('class', function(d) {
                                if (args.linked && d.values.length > 0) {
                                    var formatter = d3.time.format(args.linked_format);

                                    // add line classes for every line the rect contains
                                    var line_classes = d.values.map(function(datum) {
                                        return 'mg-line' + datum.line_id + '-color';
                                    }).join(" ");
                                    var first_datum = d.values[0];
                                    var v = first_datum[args.x_accessor];
                                    var id = (typeof v === 'number') ? i : formatter(v);

                                    return line_classes + ' roll_' + id;
                                } else {
                                    return line_classes;
                                }
                            })
                            .attr('height', args.height - args.bottom - args.top - args.buffer)
                            .attr('opacity', 0)
                            .on('mouseover', this.rolloverOn(args))
                            .on('mouseout', this.rolloverOff(args))
                            .on('mousemove', this.rolloverMove(args));
            }

            //for single line, use rects
            else {
                //set to 1 unless we have a custom increment series
                line_id = 1;
                if (args.custom_line_color_map.length > 0) {
                    line_id = args.custom_line_color_map[0];
                }

                g = svg.append('g')
                    .attr('class', 'mg-rollover-rect');

                xf = args.data[0].map(args.scalefns.xf);

                g.selectAll('.mg-rollover-rects')
                    .data(args.data[0]).enter()
                        .append('rect')
                            .attr('class', function(d, i) {
                                if (args.linked) {
                                    var v = d[args.x_accessor];
                                    var formatter = d3.time.format(args.linked_format);

                                    //only format when x-axis is date
                                    var id = (typeof v === 'number')
                                            ? i
                                            : formatter(v);

                                    return 'mg-line' + line_id + '-color ' + 'roll_' + id;
                                } else {
                                    return 'mg-line' + line_id + '-color';
                                }
                            })
                            .attr('x', function(d, i) {
                                //if data set is of length 1
                                if (xf.length === 1) {
                                    return args.left + args.buffer;
                                } else if (i === 0) {
                                    return xf[i].toFixed(2);
                                } else {
                                    return ((xf[i-1] + xf[i])/2).toFixed(2);
                                }
                            })
                            .attr('y', function(d, i) {
                                return (args.data.length > 1)
                                    ? args.scalefns.yf(d) - 6 //multi-line chart sensitivity
                                    : args.top;
                            })
                            .attr('width', function(d, i) {
                                //if data set is of length 1
                                if (xf.length === 1) {
                                    return args.width - args.right - args.buffer;
                                } else if (i === 0) {
                                    return ((xf[i+1] - xf[i]) / 2).toFixed(2);
                                } else if (i === xf.length - 1) {
                                    return ((xf[i] - xf[i-1]) / 2).toFixed(2);
                                } else {
                                    return ((xf[i+1] - xf[i-1]) / 2).toFixed(2);
                                }
                            })
                            .attr('height', function(d, i) {
                                return (args.data.length > 1)
                                    ? 12 //multi-line chart sensitivity
                                    : args.height - args.bottom - args.top - args.buffer;
                            })
                            .attr('opacity', 0)
                            .on('mouseover', this.rolloverOn(args))
                            .on('mouseout', this.rolloverOff(args))
                            .on('mousemove', this.rolloverMove(args));
            }

            //if the dataset is of length 1, trigger the rollover for our solitary rollover rect
            if (args.data.length == 1 && args.data[0].length == 1) {
                svg.select('.mg-rollover-rect rect')
                    .on('mouseover')(args.data[0][0], 0);
            } else if (args.data.length > 1) {
                //otherwise, trigger it for an appropriate line in a multi-line chart
                for (var i = 0; i < args.data.length; i++) {
                    var j = i + 1;

                    if (args.custom_line_color_map.length > 0
                        && args.custom_line_color_map[i] !== undefined) {
                        j = args.custom_line_color_map[i];
                    }

                    if (args.data[i].length == 1) {
                        svg.selectAll('.mg-voronoi .mg-line' + j + '-color')
                            .on('mouseover')(args.data[i][0], 0);

                        svg.selectAll('.mg-voronoi .mg-line' + j + '-color')
                            .on('mouseout')(args.data[i][0], 0);
                    }
                }
            }

            MG.call_hook('line.after_rollover', args);

            return this;
        };

        this.rolloverOn = function(args) {
            var svg = mg_get_svg_child_of(args.target);
            var fmt;
            switch(args.processed.x_time_frame) {
                case 'seconds':
                    fmt = d3.time.format('%b %e, %Y  %H:%M:%S');
                    break;
                case 'less-than-a-day':
                    fmt = d3.time.format('%b %e, %Y  %I:%M%p');
                    break;
                case 'four-days':
                    fmt = d3.time.format('%b %e, %Y  %I:%M%p');
                    break;
                default:
                    fmt = d3.time.format('%b %e, %Y');
            }

            return function(d, i) {

                if (args.aggregate_rollover && args.data.length > 1) {
                    // hide the circles in case a non-contiguous series is present
                    svg.selectAll('circle.mg-line-rollover-circle')
                        .style('opacity', 0);

                    d.values.forEach(function(datum) {

                      if (datum[args.x_accessor] >= args.processed.min_x &&
                          datum[args.x_accessor] <= args.processed.max_x &&
                          datum[args.y_accessor] >= args.processed.min_y &&
                          datum[args.y_accessor] <= args.processed.max_y
                      ){
                        var circle = svg.select('circle.mg-line-rollover-circle.mg-line' + datum.line_id + '-color')
                            .attr({
                                'cx': function() {
                                    return args.scales.X(datum[args.x_accessor]).toFixed(2);
                                },
                                'cy': function() {
                                    return args.scales.Y(datum[args.y_accessor]).toFixed(2);
                                },
                                'r': args.point_size
                            })
                            .style('opacity', 1);
                      }
                    });
                } else if ((args.missing_is_hidden && d['_missing']) 
                        || d[args.y_accessor] == null
                    ) {
                    //disable rollovers for hidden parts of the line
                    //recall that hidden parts are missing data ranges and possibly also
                    //data points that have been explicitly identified as missing
                    return;
                } else {
                    //show circle on mouse-overed rect
                    if (d[args.x_accessor] >= args.processed.min_x &&
                        d[args.x_accessor] <= args.processed.max_x &&
                        d[args.y_accessor] >= args.processed.min_y &&
                        d[args.y_accessor] <= args.processed.max_y
                    ) {
                        svg.selectAll('circle.mg-line-rollover-circle.mg-area' + d.line_id + '-color')
                            .attr('class', "")
                            .attr('class', 'mg-area' + d.line_id + '-color')
                            .classed('mg-line-rollover-circle', true)
                            .attr('cx', function() {
                                return args.scales.X(d[args.x_accessor]).toFixed(2);
                            })
                            .attr('cy', function() {
                                return args.scales.Y(d[args.y_accessor]).toFixed(2);
                            })
                            .attr('r', args.point_size)
                            .style('opacity', 1);
                    }
                }

                //trigger mouseover on all rects for this date in .linked charts
                if (args.linked && !MG.globals.link) {
                    MG.globals.link = true;

                    if (!args.aggregate_rollover || d.value || d.values.length > 0) {
                        var datum = d.values ? d.values[0] : d;
                        var formatter = d3.time.format(args.linked_format);
                        var v = datum[args.x_accessor];
                        var id = (typeof v === 'number') ? i : formatter(v);

                        //trigger mouseover on matching line in .linked charts
                        d3.selectAll('.mg-line' + datum.line_id + '-color.roll_' + id)
                            .each(function(d) {
                                d3.select(this).on('mouseover')(d,i);
                            });
                    }
                }

                svg.selectAll('text')
                    .filter(function(g, j) {
                        return d === g;
                    })
                    .attr('opacity', 0.3);

                var num = format_rollover_number(args);

                //update rollover text
                if (args.show_rollover_text) {
                    var textContainer = svg.select('.mg-active-datapoint'),
                        lineCount = 0,
                        lineHeight = 1.1;

                    textContainer.select('*').remove();

                    if (args.aggregate_rollover && args.data.length > 1) {
                        if (args.time_series) {
                            var date = new Date(d.key);

                            textContainer.append('tspan')
                                .text((fmt(date) + '  ' + args.yax_units).trim());

                            lineCount = 1;

                            d.values.forEach(function(datum) {
                                var label = textContainer.append('tspan')
                                    .attr({
                                      x: 0,
                                      y: (lineCount * lineHeight) + 'em'
                                    })
                                    .text(num(datum[args.y_accessor]));

                                textContainer.append('tspan')
                                    .attr({
                                      x: -label.node().getComputedTextLength(),
                                      y: (lineCount * lineHeight) + 'em'
                                    })
                                    .text('\u2014 ') // mdash
                                    .classed('mg-hover-line' + datum.line_id + '-color', true)
                                    .style('font-weight', 'bold');

                                lineCount++;
                            });

                            textContainer.append('tspan')
                                .attr('x', 0)
                                .attr('y', (lineCount * lineHeight) + 'em')
                                .text('\u00A0');
                        } else {
                            d.values.forEach(function(datum) {
                                var label = textContainer.append('tspan')
                                    .attr({
                                      x: 0,
                                      y: (lineCount * lineHeight) + 'em'
                                    })
                                    .text(args.x_accessor + ': ' + datum[args.x_accessor]
                                        + ', ' + args.y_accessor + ': ' + args.yax_units
                                        + num(datum[args.y_accessor]));

                                textContainer.append('tspan')
                                    .attr({
                                      x: -label.node().getComputedTextLength(),
                                      y: (lineCount * lineHeight) + 'em'
                                    })
                                    .text('\u2014 ') // mdash
                                    .classed('mg-hover-line' + datum.line_id + '-color', true)
                                    .style('font-weight', 'bold');

                                lineCount++;
                            });
                        }

                        // append an blank (&nbsp;) line to mdash positioning
                        textContainer.append('tspan')
                            .attr('x', 0)
                            .attr('y', (lineCount * lineHeight) + 'em')
                            .text('\u00A0');
                    } else {
                        if (args.time_series) {
                            var dd = new Date(+d[args.x_accessor]);
                            dd.setDate(dd.getDate());

                            textContainer.append('tspan')
                                .text(fmt(dd) + '  ' + args.yax_units
                                    + num(d[args.y_accessor]));
                        }
                        else {
                            textContainer.append('tspan')
                                .text(args.x_accessor + ': ' + d[args.x_accessor]
                                    + ', ' + args.y_accessor + ': ' + args.yax_units
                                    + num(d[args.y_accessor]));
                        }
                    }
                }

                if (args.mouseover) {
                    args.mouseover(d, i);
                }

                // MG.call_hook()
            };
        };

        this.rolloverOff = function(args) {
            var svg = mg_get_svg_child_of(args.target);

            return function(d, i) {
                if (args.linked && MG.globals.link) {
                    MG.globals.link = false;

                    var formatter = d3.time.format(args.linked_format);
                    var datums = d.values ? d.values : [d];
                    datums.forEach(function(datum) {
                        var v = datum[args.x_accessor];
                        var id = (typeof v === 'number') ? i : formatter(v);

                        //trigger mouseout on matching line in .linked charts
                        d3.selectAll('.roll_' + id)
                            .each(function(d) {
                                d3.select(this).on('mouseout')(d);
                            });
                    });
                }

                //remove all active data points when aggregate_rollover is enabled
                if (args.aggregate_rollover) {
                    svg.selectAll('circle.mg-line-rollover-circle')
                        .style('opacity', function() {
                            return 0;
                        });
                //remove active data point text on mouse out, except if we have a single point
                } else {
                    svg.selectAll('circle.mg-line-rollover-circle.mg-area' + (d.line_id) + '-color')
                        .style('opacity', function() {
                            var id = d.line_id - 1;

                            if (args.custom_line_color_map.length > 0
                                    && args.custom_line_color_map.indexOf(d.line_id) !== undefined
                                ) {
                                id = args.custom_line_color_map.indexOf(d.line_id);
                            }

                            if (args.data[id].length == 1) {
                            //if (args.data.length === 1 && args.data[0].length === 1) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        });
                }

                svg.select('.mg-active-datapoint')
                    .text('');

                if (args.mouseout) {
                    args.mouseout(d, i);
                }
            };
        };

        this.rolloverMove = function(args) {
            return function(d, i) {
                if (args.mousemove) {
                    args.mousemove(d, i);
                }
            };
        };

        this.windowListeners = function() {
            mg_window_listeners(this.args);
            return this;
        };

        this.init(args);
    }

    MG.register('line', lineChart);
}).call(this);

(function() {
    'use strict';

    function histogram(args) {
        this.init = function(args) {
            this.args = args;

            raw_data_transformation(args);
            process_histogram(args);
            init(args);
            x_axis(args);
            y_axis(args);

            this.mainPlot();
            this.markers();
            this.rollover();
            this.windowListeners();

            return this;
        };

        this.mainPlot = function() {
            var svg = mg_get_svg_child_of(args.target);

            //remove the old histogram, add new one
            svg.selectAll('.mg-histogram').remove();

            var g = svg.append('g')
                .attr('class', 'mg-histogram');

            var bar = g.selectAll('.mg-bar')
                .data(args.data[0])
                    .enter().append('g')
                        .attr('class', 'mg-bar')
                        .attr('transform', function(d) {
                            return "translate(" + args.scales.X(d[args.x_accessor]).toFixed(2)
                                + "," + args.scales.Y(d[args.y_accessor]).toFixed(2) + ")";
                        });

            //draw bars
            bar.append('rect')
                .attr('x', 1)
                .attr('width', function(d, i) {
                    if (args.data[0].length === 1) {
                            return (args.scalefns.xf(args.data[0][0])
                                - args.bar_margin).toFixed(2);
                    } else {
                        return (args.scalefns.xf(args.data[0][1])
                        - args.scalefns.xf(args.data[0][0])
                        - args.bar_margin).toFixed(2);
                    }
                })
                .attr('height', function(d) {
                    if (d[args.y_accessor] === 0) {
                        return 0;
                    }

                    return (args.height - args.bottom - args.buffer
                        - args.scales.Y(d[args.y_accessor])).toFixed(2);
                });

            return this;
        };

        this.markers = function() {
            markers(args);
            return this;
        };

        this.rollover = function() {
            var svg = mg_get_svg_child_of(args.target);
            var $svg = $($(args.target).find('svg').get(0));

            //remove the old rollovers if they already exist
            svg.selectAll('.mg-rollover-rect').remove();
            svg.selectAll('.mg-active-datapoint').remove();

            //rollover text
            svg.append('text')
                .attr('class', 'mg-active-datapoint')
                .attr('xml:space', 'preserve')
                .attr('x', args.width - args.right)
                .attr('y', args.top / 2)
                .attr('text-anchor', 'end');

            var g = svg.append('g')
                .attr('class', 'mg-rollover-rect');

            //draw rollover bars
            var bar = g.selectAll('.mg-bar')
                .data(args.data[0])
                    .enter().append('g')
                        .attr('class', function(d, i) {
                            if (args.linked) {
                                return 'mg-rollover-rects roll_' + i;
                            } else {
                                return 'mg-rollover-rects';
                            }
                        })
                        .attr('transform', function(d) {
                            return "translate(" + (args.scales.X(d[args.x_accessor])) + "," + 0 + ")";
                        });

            bar.append('rect')
                .attr('x', 1)
                .attr('y', 0)
                .attr('width', function(d, i) {
                    //if data set is of length 1
                    if (args.data[0].length === 1) {
                        return (args.scalefns.xf(args.data[0][0])
                            - args.bar_margin).toFixed(2);
                    } else if (i !== args.data[0].length - 1) {
                        return (args.scalefns.xf(args.data[0][i + 1])
                            - args.scalefns.xf(d)).toFixed(2);
                    } else {
                        return (args.scalefns.xf(args.data[0][1])
                            - args.scalefns.xf(args.data[0][0])).toFixed(2);
                    }
                })
                .attr('height', function(d) {
                    return args.height;
                })
                .attr('opacity', 0)
                .on('mouseover', this.rolloverOn(args))
                .on('mouseout', this.rolloverOff(args))
                .on('mousemove', this.rolloverMove(args));

            return this;
        };

        this.rolloverOn = function(args) {
            var svg = mg_get_svg_child_of(args.target);
            var x_formatter = d3.time.format('%Y-%m-%d');

            return function(d, i) {
                svg.selectAll('text')
                    .filter(function(g, j) {
                        return d === g;
                    })
                    .attr('opacity', 0.3);

                var fmt = d3.time.format('%b %e, %Y');
                var num = format_rollover_number(args);

                svg.selectAll('.mg-bar rect')
                    .filter(function(d, j) {
                        return j === i;
                    })
                    .classed('active', true);

                //trigger mouseover on all matching bars
                if (args.linked && !MG.globals.link) {
                    MG.globals.link = true;

                    //trigger mouseover on matching bars in .linked charts
                    d3.selectAll('.mg-rollover-rects.roll_' + i + ' rect')
                        .each(function(d) { //use existing i
                            d3.select(this).on('mouseover')(d,i);
                        });
                }

                //update rollover text
                if (args.show_rollover_text) {
                    svg.select('.mg-active-datapoint')
                        .text(function() {
                            if (args.time_series) {
                                var dd = new Date(+d[args.x_accessor]);
                                dd.setDate(dd.getDate());

                                return fmt(dd) + '  ' + args.yax_units
                                    + num(d[args.y_accessor]);
                            }
                            else {
                                return args.x_accessor + ': ' + num(d[args.x_accessor])
                                    + ', ' + args.y_accessor + ': ' + args.yax_units
                                    + num(d[args.y_accessor]);
                            }
                        });
                }

                if (args.mouseover) {
                    args.mouseover(d, i);
                }
            };
        };

        this.rolloverOff = function(args) {
            var svg = mg_get_svg_child_of(args.target);

            return function(d, i) {
                if (args.linked && MG.globals.link) {
                    MG.globals.link = false;

                    //trigger mouseout on matching bars in .linked charts
                    d3.selectAll('.mg-rollover-rects.roll_' + i + ' rect')
                        .each(function(d) { //use existing i
                            d3.select(this).on('mouseout')(d,i);
                        });
                }

                //reset active bar
                svg.selectAll('.mg-bar rect')
                    .classed('active', false);

                //reset active data point text
                svg.select('.mg-active-datapoint')
                    .text('');

                if (args.mouseout) {
                    args.mouseout(d, i);
                }
            };
        };

        this.rolloverMove = function(args) {
            return function(d, i) {
                if (args.mousemove) {
                    args.mousemove(d, i);
                }
            };
        };

        this.windowListeners = function() {
            mg_window_listeners(this.args);
            return this;
        };

        this.init(args);
    }

    var defaults = {
        mouseover: function(d, i) {
            d3.select('#histogram svg .mg-active-datapoint')
                .text('Frequency Count: ' + d.y);
        },
        binned: false,
        bins: null,
        processed_x_accessor: 'x',
        processed_y_accessor: 'y',
        processed_dx_accessor: 'dx',
        bar_margin: 1
    };

    MG.register('histogram', histogram, defaults);
}).call(this);

(function() {
    'use strict';

    function pointChart(args) {

        this.init = function(args) {
            this.args = args;

            raw_data_transformation(args);
            process_point(args);
            init(args);
            x_axis(args);
            y_axis(args);

            this.mainPlot();
            this.markers();
            this.rollover();
            this.windowListeners();

            return this;
        };

        this.markers = function() {
            markers(args);
            if (args.least_squares) {
                add_ls(args);
            }

            return this;
        };

        this.mainPlot = function() {
            var svg = mg_get_svg_child_of(args.target);
            var g;

            //remove the old points, add new one
            svg.selectAll('.mg-points').remove();

            // plot the points, pretty straight-forward
            g = svg.append('g')
                .classed('mg-points', true);

            var pts = g.selectAll('circle')
                .data(args.data[0])
                .enter().append('svg:circle')
                    .attr('class', function(d, i) { return 'path-' + i; })
                    .attr('cx', args.scalefns.xf)
                    .attr('cy', args.scalefns.yf);

            //are we coloring our points, or just using the default color?
            if (args.color_accessor !== null) {
                pts.attr('fill',   args.scalefns.color);
                pts.attr('stroke', args.scalefns.color);
            } else {
                pts.classed('mg-points-mono', true);
            }

            if (args.size_accessor !== null) {
                pts.attr('r', args.scalefns.size);
            } else {
                pts.attr('r', args.point_size);
            }

            return this;
        };

        this.rollover = function() {
            var svg = mg_get_svg_child_of(args.target);

            //remove the old rollovers if they already exist
            svg.selectAll('.mg-voronoi').remove();

            //remove the old rollover text and circle if they already exist
            svg.selectAll('.mg-active-datapoint').remove();

            //add rollover text
            svg.append('text')
                .attr('class', 'mg-active-datapoint')
                .attr('xml:space', 'preserve')
                .attr('x', args.width - args.right)
                .attr('y', args.top / 2)
                .attr('text-anchor', 'end');

            //add rollover paths
            var voronoi = d3.geom.voronoi()
                .x(args.scalefns.xf)
                .y(args.scalefns.yf)
                .clipExtent([[args.buffer, args.buffer], [args.width - args.buffer, args.height - args.buffer]]);

            var paths = svg.append('g')
                .attr('class', 'mg-voronoi');

            paths.selectAll('path')
                .data(voronoi(args.data[0]))
                .enter().append('path')
                    .attr('d', function(d) {
                        if (d === undefined) {
                            return;
                        }

                        return 'M' + d.join(',') + 'Z';
                    })
                    .attr('class', function(d,i) {
                        return 'path-' + i;
                    })
                    .style('fill-opacity', 0)
                    .on('mouseover', this.rolloverOn(args))
                    .on('mouseout', this.rolloverOff(args))
                    .on('mousemove', this.rolloverMove(args));

            return this;
        };

        this.rolloverOn = function(args) {
            var svg = mg_get_svg_child_of(args.target);

            return function(d, i) {
                svg.selectAll('.mg-points circle')
                    .classed('selected', false);

                //highlight active point
                var pts = svg.selectAll('.mg-points circle.path-' + i)
                    .classed('selected', true);

                if (args.size_accessor) {
                    pts.attr('r', function(di) {
                        return args.scalefns.size(di) + 1;
                    });
                } else {
                    pts.attr('r', args.point_size);
                }

                //trigger mouseover on all points for this class name in .linked charts
                if (args.linked && !MG.globals.link) {
                    MG.globals.link = true;

                    //trigger mouseover on matching point in .linked charts
                    d3.selectAll('.mg-voronoi .path-' + i)
                        .each(function() {
                            d3.select(this).on('mouseover')(d,i);
                        });
                }

                var fmt = d3.time.format('%b %e, %Y');
                var num = format_rollover_number(args);

                //update rollover text
                if (args.show_rollover_text) {
                    svg.select('.mg-active-datapoint')
                        .text(function() {
                            if (args.time_series) {
                                var dd = new Date(+d.point[args.x_accessor]);
                                dd.setDate(dd.getDate());

                                return fmt(dd) + '  ' + args.yax_units + num(d.point[args.y_accessor]);
                            } else {
                                return args.x_accessor + ': ' + num(d.point[args.x_accessor])
                                    + ', ' + args.y_accessor + ': ' + args.yax_units
                                    + num(d.point[args.y_accessor]);
                            }
                        });
                }

                if (args.mouseover) {
                    args.mouseover(d, i);
                }
            };
        };

        this.rolloverOff = function(args) {
            var svg = mg_get_svg_child_of(args.target);

            return function(d,i) {
                if (args.linked && MG.globals.link) {
                    MG.globals.link = false;

                    d3.selectAll('.mg-voronoi .path-' + i)
                        .each(function() {
                            d3.select(this).on('mouseout')(d,i);
                        });
                }

                //reset active point
                var pts = svg.selectAll('.mg-points circle')
                    .classed('unselected', false)
                    .classed('selected', false);

                if (args.size_accessor) {
                    pts.attr('r', args.scalefns.size);
                } else {
                    pts.attr('r', args.point_size);
                }

                //reset active data point text
                svg.select('.mg-active-datapoint')
                    .text('');

                if (args.mouseout) {
                    args.mouseout(d, i);
                }
            };
        };

        this.rolloverMove = function(args) {
            return function(d, i) {
                if (args.mousemove) {
                    args.mousemove(d, i);
                }
            };
        };

        this.update = function(args) {
            return this;
        };

        this.windowListeners = function() {
            mg_window_listeners(this.args);
            return this;
        };

        this.init(args);
    }

    var defaults = {
        buffer: 16,
        ls: false,
        lowess: false,
        point_size: 2.5,
        size_accessor: null,
        color_accessor: null,
        size_range: null,              // when we set a size_accessor option, this array determines the size range, e.g. [1,5]
        color_range: null,             // e.g. ['blue', 'red'] to color different groups of points
        size_domain: null,
        color_domain: null,
        color_type: 'number'           // can be either 'number' - the color scale is quantitative - or 'category' - the color scale is qualitative.
    };

    MG.register('point', pointChart, defaults);
}).call(this);

(function() {
    'use strict';

    // BARCHART:
    // x - function that processes data
    //     - pass in a feature name, get a count
    //     - have raw feature: value function
    // - need a way of changing the y axis and x axis
    // - need to sort out rollovers
    function barChart(args) {
        this.args = args;

        this.init = function(args) {
            this.args = args;

            raw_data_transformation(args);
            process_categorical_variables(args);
            init(args);

            this.is_vertical = (args.bar_orientation === 'vertical');

            if (this.is_vertical) {
                x_axis_categorical(args);
                y_axis(args);
            } else {
                x_axis(args);
                y_axis_categorical(args);
            }

            this.mainPlot();
            this.markers();
            this.rollover();
            this.windowListeners();

            return this;
        };

        this.mainPlot = function() {
            var svg = mg_get_svg_child_of(args.target);
            var data = args.data[0];
            var barplot = svg.select('g.mg-barplot');
            var fresh_render = barplot.empty();

            var bars;
            var predictor_bars;
            var pp, pp0;
            var baseline_marks;

            var perform_load_animation = fresh_render && args.animate_on_load;
            var should_transition = perform_load_animation || args.transition_on_update;
            var transition_duration = args.transition_duration || 1000;

            // draw the plot on first render
            if (fresh_render) {
                barplot = svg.append('g')
                    .classed('mg-barplot', true);
            }

            bars = bars = barplot.selectAll('.mg-bar')
                .data(data);

            bars.exit().remove();

            bars.enter().append('rect')
                .classed('mg-bar', true);

            if (args.predictor_accessor) {
                predictor_bars = barplot.selectAll('.mg-bar-prediction')
                    .data(data);

                predictor_bars.exit().remove();

                predictor_bars.enter().append('rect')
                    .classed('mg-bar-prediction', true);
            }

            if (args.baseline_accessor) {
                baseline_marks = barplot.selectAll('.mg-bar-baseline')
                    .data(data);

                baseline_marks.exit().remove();

                baseline_marks.enter().append('line')
                    .classed('mg-bar-baseline', true);
            }

            var appropriate_size;

            // setup transitions
            if (should_transition) {
                bars = bars.transition()
                    .duration(transition_duration);

                if (predictor_bars) {
                    predictor_bars = predictor_bars.transition()
                        .duration(transition_duration);
                }

                if (baseline_marks) {
                    baseline_marks = baseline_marks.transition()
                        .duration(transition_duration);
                }
            }

            // move the barplot after the axes so it doesn't overlap
            svg.select('.mg-y-axis').node().parentNode.appendChild(barplot.node());

            if (this.is_vertical) {
                appropriate_size = args.scales.X.rangeBand()/1.5;

                if (perform_load_animation) {
                    bars.attr({
                        height: 0,
                        y: args.scales.Y(0)
                    });

                    if (predictor_bars) {
                        predictor_bars.attr({
                            height: 0,
                            y: args.scales.Y(0)
                        });
                    }

                    if (baseline_marks) {
                        baseline_marks.attr({
                            y1: args.scales.Y(0),
                            y2: args.scales.Y(0)
                        });
                    }
                }

                bars.attr('y', args.scalefns.yf)
                    .attr('x', function(d) {
                        return args.scalefns.xf(d) + appropriate_size/2;
                    })
                    .attr('width', appropriate_size)
                    .attr('height', function(d) {
                        return 0 - (args.scalefns.yf(d) - args.scales.Y(0));
                    });


                if (args.predictor_accessor) {
                    pp = args.predictor_proportion;
                    pp0 = pp-1;

                    // thick line through bar;
                    predictor_bars
                        .attr('y', function(d) {
                            return args.scales.Y(0) - (args.scales.Y(0) - args.scales.Y(d[args.predictor_accessor]));
                        })
                        .attr('x', function(d) {
                            return args.scalefns.xf(d) + pp0*appropriate_size/(pp*2) + appropriate_size/2;
                        })
                        .attr('width', appropriate_size/pp)
                        .attr('height', function(d) {
                            return 0 - (args.scales.Y(d[args.predictor_accessor]) - args.scales.Y(0));
                        });
                }

                if (args.baseline_accessor) {
                    pp = args.predictor_proportion;

                    baseline_marks
                        .attr('x1', function(d) {
                            return args.scalefns.xf(d)+appropriate_size/2-appropriate_size/pp + appropriate_size/2;
                        })
                        .attr('x2', function(d) {
                            return args.scalefns.xf(d)+appropriate_size/2+appropriate_size/pp + appropriate_size/2;
                        })
                        .attr('y1', function(d) { return args.scales.Y(d[args.baseline_accessor]); })
                        .attr('y2', function(d) { return args.scales.Y(d[args.baseline_accessor]); });
                }
            } else {
                appropriate_size = args.scales.Y.rangeBand()/1.5;

                if (perform_load_animation) {
                    bars.attr('width', 0);

                    if (predictor_bars) {
                        predictor_bars.attr('width', 0);
                    }

                    if (baseline_marks) {
                        baseline_marks.attr({
                            x1: args.scales.X(0),
                            x2: args.scales.X(0)
                        });
                    }
                }

                bars.attr('x', args.scales.X(0))
                    .attr('y', function(d) {
                        return args.scalefns.yf(d) + appropriate_size/2;
                    })
                    .attr('height', appropriate_size)
                    .attr('width', function(d) {
                        return args.scalefns.xf(d) - args.scales.X(0);
                    });

                if (args.predictor_accessor) {
                    pp = args.predictor_proportion;
                    pp0 = pp-1;

                    // thick line  through bar;
                    predictor_bars
                        .attr('x', args.scales.X(0))
                        .attr('y', function(d) {
                            return args.scalefns.yf(d) + pp0 * appropriate_size/(pp*2) + appropriate_size / 2;
                        })
                        .attr('height', appropriate_size / pp)
                        .attr('width', function(d) {
                            return args.scales.X(d[args.predictor_accessor]) - args.scales.X(0);
                        });
                }

                if (args.baseline_accessor) {
                    pp = args.predictor_proportion;

                    baseline_marks
                        .attr('x1', function(d) { return args.scales.X(d[args.baseline_accessor]); })
                        .attr('x2', function(d) { return args.scales.X(d[args.baseline_accessor]); })
                        .attr('y1', function(d) {
                            return args.scalefns.yf(d) + appropriate_size / 2 - appropriate_size / pp + appropriate_size / 2;
                        })
                        .attr('y2', function(d) {
                            return args.scalefns.yf(d) + appropriate_size / 2 + appropriate_size / pp + appropriate_size / 2;
                        });
                }
            }

            return this;
        };

        this.markers = function() {
            markers(args);
            return this;
        };

        this.rollover = function() {
            var svg = mg_get_svg_child_of(args.target);
            var g;

            //remove the old rollovers if they already exist
            svg.selectAll('.mg-rollover-rect').remove();
            svg.selectAll('.mg-active-datapoint').remove();

            //rollover text
            svg.append('text')
                .attr('class', 'mg-active-datapoint')
                .attr('xml:space', 'preserve')
                .attr('x', args.width - args.right)
                .attr('y', args.top / 2)
                .attr('dy', '.35em')
                .attr('text-anchor', 'end');

            g = svg.append('g')
                .attr('class', 'mg-rollover-rect');

            //draw rollover bars
            var bar = g.selectAll(".mg-bar-rollover")
                .data(args.data[0]).enter()
                .append("rect")
                  .attr('class', 'mg-bar-rollover');

            if (this.is_vertical) {
                bar.attr("x", args.scalefns.xf)
                    .attr("y", function() {
                        return args.scales.Y(0) - args.height;
                    })
                    .attr('width', args.scales.X.rangeBand())
                    .attr('height', args.height)
                    .attr('opacity', 0)
                    .on('mouseover', this.rolloverOn(args))
                    .on('mouseout', this.rolloverOff(args))
                    .on('mousemove', this.rolloverMove(args));
            } else {
                bar.attr("x", args.scales.X(0))
                    .attr("y", args.scalefns.yf)
                    .attr('width', args.width)
                    .attr('height', args.scales.Y.rangeBand()+2)
                    .attr('opacity', 0)
                    .on('mouseover', this.rolloverOn(args))
                    .on('mouseout', this.rolloverOff(args))
                    .on('mousemove', this.rolloverMove(args));
            }
            return this;
        };

        this.rolloverOn = function(args) {
            var svg = mg_get_svg_child_of(args.target);
            var label_accessor = this.is_vertical ? args.x_accessor : args.y_accessor;
            var data_accessor = this.is_vertical ? args.y_accessor : args.x_accessor;
            var label_units = this.is_vertical ? args.yax_units : args.xax_units;

            return function(d, i) {
                svg.selectAll('text')
                    .filter(function(g, j) {
                        return d === g;
                    })
                    .attr('opacity', 0.3);

                var fmt = d3.time.format('%b %e, %Y');
                var num = format_rollover_number(args);

                //highlight active bar
                svg.selectAll('g.mg-barplot .mg-bar')
                    .filter(function(d, j) {
                        return j === i;
                    })
                    .classed('active', true);

                //update rollover text
                if (args.show_rollover_text) {
                    svg.select('.mg-active-datapoint')
                        .text(function() {
                            if (args.time_series) {
                                var dd = new Date(+d[data_accessor]);
                                dd.setDate(dd.getDate());

                                return fmt(dd) + '  ' + label_units + num(d[label_accessor]);
                            } else {
                                return d[label_accessor] + ': ' + num(d[data_accessor]);
                            }
                        });
                }

                if (args.mouseover) {
                    args.mouseover(d, i);
                }
            };
        };

        this.rolloverOff = function(args) {
            var svg = mg_get_svg_child_of(args.target);

            return function(d, i) {
                //reset active bar
                svg.selectAll('g.mg-barplot .mg-bar')
                    .classed('active', false);

                //reset active data point text
                svg.select('.mg-active-datapoint')
                    .text('');

                if (args.mouseout) {
                    args.mouseout(d, i);
                }
            };
        };

        this.rolloverMove = function(args) {
            return function(d, i) {
                if (args.mousemove) {
                    args.mousemove(d, i);
                }
            };
        };

        this.windowListeners = function() {
            mg_window_listeners(this.args);
            return this;
        };

        this.init(args);
    }

    var defaults = {
        y_accessor: 'factor',
        x_accessor: 'value',
        baseline_accessor: null,
        predictor_accessor: null,
        predictor_proportion: 5,
        dodge_accessor: null,
        binned: true,
        padding_percentage: 0,
        outer_padding_percentage: 0.1,
        height: 500,
        top: 20,
        bar_height: 20,
        left: 70,
        truncate_x_labels: true,
        truncate_y_labels: true,
        rotate_x_labels: 0,
        rotate_y_labels: 0
    };

    MG.register('bar', barChart, defaults);

}).call(this);

/*
Data Tables

Along with histograms, bars, lines, and scatters, a simple data table can take you far.
We often just want to look at numbers, organized as a table, where columns are variables,
and rows are data points. Sometimes we want a cell to have a small graphic as the main
column element, in which case we want small multiples. sometimes we want to

var table = New data_table(data)
                .target('div#data-table')
                .title({accessor: 'point_name', align: 'left'})
                .description({accessor: 'description'})
                .number({accessor: ''})

*/

MG.data_table = function(args) {
    'use strict';
    this.args = args;
    this.args.standard_col = { width: 150, font_size: 12, font_weight: 'normal' };
    this.args.columns = [];
    this.formatting_options = [['color', 'color'], ['font-weight', 'font_weight'], ['font-style', 'font_style'], ['font-size', 'font_size']];

    this._strip_punctuation = function(s) {
        var punctuationless = s.replace(/[^a-zA-Z0-9 _]+/g, '');
        var finalString = punctuationless.replace(/ +?/g, "");
        return finalString;
    };

    this._format_element = function(element, value, args) {
        this.formatting_options.forEach(function(fo) {
            var attr = fo[0];
            var key = fo[1];
            if (args[key]) element.style(attr,
                typeof args[key] === 'string' ||
                typeof args[key] === 'number' ?
                    args[key] : args[key](value));
        });
    };

    this._add_column = function(_args, arg_type) {
        var standard_column = this.args.standard_col;
        var args = merge_with_defaults(MG.clone(_args), MG.clone(standard_column));
        args.type = arg_type;
        this.args.columns.push(args);
    };

    this.target = function() {
        var target = arguments[0];
        this.args.target = target;
        return this;
    };

    this.title = function() {
        this._add_column(arguments[0], 'title');
        return this;
    };

    this.text = function() {
        this._add_column(arguments[0], 'text');
        return this;
    };

    this.bullet = function() {
        /*
        text label
        main value
        comparative measure
        any number of ranges

        additional args:
        no title
        xmin, xmax
        format: percentage
        xax_formatter
        */
        return this;
    };

    this.sparkline = function() {
        return this;
    };

    this.number = function() {
        this._add_column(arguments[0], 'number');
        return this;
    };

    this.display = function() {
        var args = this.args;

        chart_title(args);

        var target = args.target;
        var table = d3.select(target).append('table').classed('mg-data-table', true);
        var colgroup = table.append('colgroup');
        var thead = table.append('thead');
        var tbody = table.append('tbody');
        var this_column;
        var this_title;

        var tr, th, td_accessor, td_type, td_value, th_text, td_text, td;
        var col;
        var h;

        tr = thead.append('tr');

        for (h = 0; h < args.columns.length; h++) {
            var this_col = args.columns[h];
            td_type = this_col.type;
            th_text = this_col.label;
            th_text = th_text === undefined ? '' : th_text;
            th = tr.append('th')
                .style('width', this_col.width)
                .style('text-align', td_type === 'title' ? 'left' : 'right')
                .text(th_text);

            if (args.show_tooltips && this_col.description) {
                th.append('i')
                    .classed('fa', true)
                    .classed('fa-question-circle', true)
                    .classed('fa-inverse', true);

                $(th[0]).popover({
                    html: true,
                    animation: false,
                    content: this_col.description,
                    trigger: 'hover',
                    placement: 'top',
                    container: $(th[0])
                 });
            }
        }

        for (h = 0; h < args.columns.length; h++) {
            col = colgroup.append('col');
            if (args.columns[h].type === 'number') {
                col.attr('align', 'char').attr('char', '.');
            }
        }

        for (var i=0; i < args.data.length; i++) {
            tr = tbody.append('tr');
            for (var j = 0; j < args.columns.length; j++) {
                this_column = args.columns[j];
                td_accessor = this_column.accessor;
                td_value = td_text = args.data[i][td_accessor];
                td_type     = this_column.type;

                if (td_type === 'number') {
                    //td_text may need to be rounded
                    if (this_column.hasOwnProperty('round') && !this_column.hasOwnProperty('format')) {
                        // round according to the number value in this_column.round
                        td_text = d3.format('0,.'+this_column.round+'f')(td_text);
                    }

                    if (this_column.hasOwnProperty('value_formatter')) {
                        // provide a function that formats the text according to the function this_column.format.
                        td_text = this_column.value_formatter(td_text);
                    }

                    if (this_column.hasOwnProperty('format')) {
                        // this is a shorthand for percentage formatting, and others if need be.
                        // supported: 'percentage', 'count', 'temperature'

                        if (this_column.round) {
                            td_text = d3.round(td_text, this_column.round);
                        }

                        var this_format = this_column.format;
                        var formatter;

                        if (this_format === 'percentage')  formatter = d3.format('%p');
                        if (this_format === 'count')       formatter = d3.format("0,000");
                        if (this_format === 'temperature') formatter = function(t) { return t +'°'; };

                        td_text = formatter(td_text);
                    }

                    if (this_column.hasOwnProperty('currency')) {
                        // this is another shorthand for formatting according to a currency amount, which gets appended to front of number
                        td_text = this_column.currency + td_text;
                    }
                }

                td = tr.append('td')
                    .classed('table-' + td_type, true)
                    .classed('table-' + td_type + '-' + this._strip_punctuation(td_accessor), true)
                    .attr('data-value', td_value)
                    .style('width', this_column.width)
                    .style('text-align', td_type === 'title' || td_type === 'text' ? 'left' : 'right');

                this._format_element(td, td_value, this_column);

                if (td_type === 'title') {
                    this_title = td.append('div').text(td_text);
                    this._format_element(this_title, td_text, this_column);

                    if (args.columns[j].hasOwnProperty('secondary_accessor')) {
                        td.append('div')
                            .text(args.data[i][args.columns[j].secondary_accessor])
                            .classed("secondary-title", true);
                    }
                } else {
                    td.text(td_text);
                }
            }
        }

        return this;
    };

    return this;
};

(function() {
    'use strict';

    function missingData(args) {

        this.init = function(args) {
            this.args = args;

            var svg_width,
                svg_height;

            svg_width = args.width;
            svg_height = args.height;

            if (args.full_width) {
                // get parent element
                svg_width = get_width(args.target);
            }

            if (args.full_height) {
                svg_height = get_height(args.target);
            }

            chart_title(args);

            // create svg if one doesn't exist
            d3.select(args.target).selectAll('svg').data([args])
              .enter().append('svg')
                .attr('width', svg_width)
                .attr('height', svg_height);

            var svg = mg_get_svg_child_of(args.target);

            // has the width or height changed?
            if (svg_width !== Number(svg.attr('width'))) {
                svg.attr('width', svg_width);
            }

            if (svg_height !== Number(svg.attr('height'))) {
                svg.attr('height', svg_height);
            }

            // @todo need to reconsider how we handle automatic scaling
            svg.attr('viewBox', '0 0 ' + svg_width + ' ' + svg_height);

            // delete child elements
            d3.select(args.target).selectAll('svg *').remove();

            // add missing class
            svg.classed('mg-missing', true);

            // do we need to clear the legend?
            if (args.legend_target) {
                $(args.legend_target).html('');
            }

            //are we adding a background placeholder
            if (args.show_missing_background) {
                var data = [];
                for (var x = 1; x <= 50; x++) {
                    data.push({'x': x, 'y': Math.random() - (x * 0.03)});
                }

                args.scales.X = d3.scale.linear()
                    .domain([0, data.length])
                    .range([args.left + args.buffer, svg_width - args.right - args.buffer]);

                args.scales.Y = d3.scale.linear()
                    .domain([-2, 2])
                    .range([svg_height - args.bottom - args.buffer*2, args.top]);

                args.scalefns.xf = function(di) { return args.scales.X(di.x); };
                args.scalefns.yf = function(di) { return args.scales.Y(di.y); };

                var line = d3.svg.line()
                    .x(args.scalefns.xf)
                    .y(args.scalefns.yf)
                    .interpolate(args.interpolate);

                var area = d3.svg.area()
                    .x(args.scalefns.xf)
                    .y0(args.scales.Y.range()[0])
                    .y1(args.scalefns.yf)
                    .interpolate(args.interpolate);

                var g = svg.append('g')
                    .attr('class', 'mg-missing-pane');

                g.append('svg:rect')
                    .classed('mg-missing-background', true)
                    .attr('x', args.buffer)
                    .attr('y', args.buffer)
                    .attr('width', svg_width - args.buffer*2)
                    .attr('height', svg_height - args.buffer*2)
                    .attr('rx',15)
                    .attr('ry', 15);

                g.append('path')
                    .attr('class', 'mg-main-line mg-line1-color')
                    .attr('d', line(data));

                g.append('path')
                    .attr('class', 'mg-main-area mg-area1-color')
                    .attr('d', area(data));
            }

            // add missing text
            svg.selectAll('.mg-missing-text').data([args.missing_text])
              .enter().append('text')
                .attr('class', 'mg-missing-text')
                .attr('x', svg_width / 2)
                .attr('y', svg_height / 2)
                .attr('dy', '.50em')
                .attr('text-anchor', 'middle')
                .text(args.missing_text);

            return this;
        };

        this.init(args);
    }

    var defaults = {
        top: 40,                      // the size of the top margin
        bottom: 30,                   // the size of the bottom margin
        right: 10,                    // size of the right margin
        left: 10,                     // size of the left margin
        buffer: 8,                    // the buffer between the actual chart area and the margins
        legend_target: '',
        width: 350,
        height: 220,
        missing_text: 'Data currently missing or unavailable',
        scalefns: {},
        scales: {},
        show_tooltips: true,
        show_missing_background: true,
        interpolate: 'cardinal'
    };

    MG.register('missing-data', missingData, defaults);
}).call(this);

function raw_data_transformation(args) {
    'use strict';

    // dupe our data so we can modify it without adverse effect
    args.data = MG.clone(args.data);

    // We need to account for a few data format cases:
    // #1 [{key:__, value:__}, ...]                              // unnested obj-arrays
    // #2 [[{key:__, value:__}, ...], [{key:__, value:__}, ...]] // nested obj-arrays
    // #3 [[4323, 2343],..]                                      // unnested 2d array
    // #4 [[[4323, 2343],..] , [[4323, 2343],..]]                // nested 2d array

    var _is_nested_array = is_array_of_arrays(args.data);

    args.array_of_objects = false;
    args.array_of_arrays = false;
    args.nested_array_of_arrays = false;
    args.nested_array_of_objects = false;

    if (_is_nested_array) {
        args.nested_array_of_objects = args.data.map(function(d){
            return is_array_of_objects_or_empty(d);
        });                                                      // Case #2
        args.nested_array_of_arrays = args.data.map(function(d){
            return is_array_of_arrays(d);
        })                                                       // Case #4
    } else {
        args.array_of_objects = is_array_of_objects(args.data);       // Case #1
        args.array_of_arrays = is_array_of_arrays(args.data);         // Case #3
    }

    if (args.chart_type === 'line') {
        if (args.array_of_objects || args.array_of_arrays) {
            args.data = [args.data];
        }
    } else {
        if (!(args.data[0] instanceof Array)) {
            args.data = [args.data];
        }
    }

    if (args.y_accessor instanceof Array) {
        args.data = args.data.map(function(_d) {
            return args.y_accessor.map(function(ya) {
                return _d.map(function(di) {
                    di = MG.clone(di);
                    if (di[ya] === undefined) {
                        return undefined;
                    }
                    di['multiline_y_accessor'] = di[ya];
                    return di;
                }).filter(function(di) {
                    return di !== undefined;
                });
            });
        })[0];

        args.y_accessor = 'multiline_y_accessor';
    }

    //sort x-axis data
    if (args.chart_type === 'line') {
        for (var i = 0; i < args.data.length; i++) {
            args.data[i].sort(function(a, b) {
                return a[args.x_accessor] - b[args.x_accessor];
            });
        }
    }

    return this;
}

MG.raw_data_transformation = raw_data_transformation;

function process_line(args) {
    'use strict';
    var is_time_series;
    var time_frame;

    //do we have a time-series?
    var is_time_series = d3.sum(args.data.map(function(series) {
        return series.length > 0 && series[0][args.x_accessor] instanceof Date;
    })) > 0;

    // var is_time_series = args.data[0][0][args.x_accessor] instanceof Date
    //     ? true
    //     : false;

    //force linear interpolation when missing_is_hidden is enabled
    if (args.missing_is_hidden) {
        args.interpolate = 'linear';
    }

    //are we replacing missing y values with zeros?
    if ((args.missing_is_zero || args.missing_is_hidden)
            && args.chart_type === 'line'
            && is_time_series
        ) {
        for (var i = 0; i < args.data.length; i++) {
            //we need to have a dataset of length > 2, so if it's less than that, skip
            if (args.data[i].length == 1) {
                continue;
            }

            var first = args.data[i][0];
            var last = args.data[i][args.data[i].length-1];
            //initialize our new array for storing the processed data
            var processed_data = [];

            //we'll be starting from the day after our first date
            var start_date = MG.clone(first[args.x_accessor]).setDate(first[args.x_accessor].getDate() + 1);

            //if we've set a max_x, add data points up to there
            var from = (args.min_x) ? args.min_x : start_date;
            var upto = (args.max_x) ? args.max_x : last[args.x_accessor];

            time_frame = mg_get_time_frame((upto-from)/1000);

            if (time_frame == 'default' && args.missing_is_hidden_accessor == null) {
                for (var d = new Date(from); d <= upto; d.setDate(d.getDate() + 1)) {
                    var o = {};
                    d.setHours(0, 0, 0, 0);

                    //add the first date item
                    //we'll be starting from the day after our first date
                    if (Date.parse(d) === Date.parse(new Date(start_date))) {
                        processed_data.push(MG.clone(args.data[i][0]));
                    }

                    //check to see if we already have this date in our data object
                    var existing_o = null;
                    args.data[i].forEach(function(val, i) {
                        if (Date.parse(val[args.x_accessor]) === Date.parse(new Date(d))) {
                            existing_o = val;

                            return false;
                        }
                    });

                    //if we don't have this date in our data object, add it and set it to zero
                    if (!existing_o) {
                        o[args.x_accessor] = new Date(d);
                        o[args.y_accessor] = 0;
                        o['_missing'] = true; //we want to distinguish between zero-value and missing observations
                        processed_data.push(o);
                    } 
                    //if the data point has, say, a 'missing' attribute set or if its 
                    //y-value is null identify it internally as missing
                    else if (existing_o[args.missing_is_hidden_accessor] 
                            || existing_o[args.y_accessor] == null
                        ) {
                        existing_o['_missing'] = true;
                        processed_data.push(existing_o);
                    }
                    //otherwise, use the existing object for that date
                    else {
                        processed_data.push(existing_o);
                    }
                }
            }
            else {
                for (var j = 0; j < args.data[i].length; j += 1) {
                    o = MG.clone(args.data[i][j]);
                    o['_missing'] = args.data[i][j][args.missing_is_hidden_accessor];
                    processed_data.push(o);
                }
            }

            //update our date object
            args.data[i] = processed_data;
        }
    }

    return this;
}

MG.process_line = process_line;

function process_histogram(args) {
    'use strict';
    // if args.binned=False, then we need to bin the data appropriately.
    // if args.binned=True, then we need to make sure to compute the relevant computed data.
    // the outcome of either of these should be something in args.computed_data.
    // the histogram plotting function will be looking there for the data to plot.

    // we need to compute an array of objects.
    // each object has an x, y, and dx.

    // histogram data is always single dimension
    var our_data = args.data[0];

    var extracted_data;
    if (args.binned === false) {
        // use d3's built-in layout.histogram functionality to compute what you need.

        if (typeof(our_data[0]) === 'object') {
            // we are dealing with an array of objects. Extract the data value of interest.
            extracted_data = our_data
                .map(function(d) {
                    return d[args.x_accessor];
                });
        } else if (typeof(our_data[0]) === 'number') {
            // we are dealing with a simple array of numbers. No extraction needed.
            extracted_data = our_data;
        } else {
            console.log('TypeError: expected an array of numbers, found ' + typeof(our_data[0]));
            return;
        }

        var hist = d3.layout.histogram();
        if (args.bins) {
            hist = hist.bins(args.bins);
        }

        args.processed_data = hist(extracted_data)
            .map(function(d) {
                // extract only the data we need per data point.
                return {'x': d.x, 'y': d.y, 'dx': d.dx};
            });
    } else {
        // here, we just need to reconstruct the array of objects
        // take the x accessor and y accessor.
        // pull the data as x and y. y is count.

        args.processed_data = our_data.map(function(d) {
            return {'x': d[args.x_accessor], 'y': d[args.y_accessor]};
        });

        var this_pt;
        var next_pt;

        // we still need to compute the dx component for each data point
        for (var i=0; i < args.processed_data.length; i++) {
            this_pt = args.processed_data[i];
            if (i === args.processed_data.length - 1) {
                this_pt.dx = args.processed_data[i-1].dx;
            } else {
                next_pt = args.processed_data[i+1];
                this_pt.dx = next_pt.x - this_pt.x;
            }
        }
    }

    args.data = [args.processed_data];
    args.x_accessor = args.processed_x_accessor;
    args.y_accessor = args.processed_y_accessor;

    return this;
}

MG.process_histogram = process_histogram;

function process_categorical_variables(args) {
    // For use with bar charts, etc.
    'use strict';
    var extracted_data, processed_data={}, pd=[];
    var our_data = args.data[0];
    var label_accessor = args.bar_orientation === 'vertical' ? args.x_accessor : args.y_accessor;
    var data_accessor =  args.bar_orientation === 'vertical' ? args.y_accessor : args.x_accessor;

    args.categorical_variables = [];
    if (args.binned === false) {
        if (typeof(our_data[0]) === 'object') {
            // we are dealing with an array of objects. Extract the data value of interest.
            extracted_data = our_data
                .map(function(d) {
                    return d[label_accessor];
                });
        } else {
            extracted_data = our_data;
        }

        var this_dp;

        for (var i=0; i< extracted_data.length; i++) {
            this_dp=extracted_data[i];
            if (args.categorical_variables.indexOf(this_dp) === -1) args.categorical_variables.push(this_dp);
            if (!processed_data.hasOwnProperty(this_dp)) processed_data[this_dp] = 0;

            processed_data[this_dp] += 1;
        }

        processed_data = Object.keys(processed_data).map(function(d) {
            var obj = {};
            obj[data_accessor] = processed_data[d];
            obj[label_accessor] = d;
            return obj;
        });
    } else {
        // nothing needs to really happen here.
        processed_data = our_data;
        args.categorical_variables = d3.set(processed_data.map(function(d) {
            return d[label_accessor];
        })).values();
        args.categorical_variables.reverse();
    }

    args.data = [processed_data];
    return this;
}

MG.process_categorical_variables = process_categorical_variables;

function process_point(args) {
    'use strict';
    var data = args.data[0];
    var x = data.map(function(d) { return d[args.x_accessor]; });
    var y = data.map(function(d) { return d[args.y_accessor]; });

    if (args.least_squares) {
        args.ls_line = least_squares(x,y);
    }

    //args.lowess_line = lowess_robust(x,y, .5, 100)
    return this;

}

MG.process_point = process_point;

function add_ls(args) {
    var svg = mg_get_svg_child_of(args.target);
    var data = args.data[0];
    var min_x = args.scales.X.ticks(args.xax_count)[0];
    var max_x = args.scales.X.ticks(args.xax_count)[args.scales.X.ticks(args.xax_count).length - 1];

    d3.select(args.target).selectAll('.mg-least-squares-line').remove();

    svg.append('svg:line')
        .attr('x1', args.scales.X(min_x))
        .attr('x2', args.scales.X(max_x))
        .attr('y1', args.scales.Y(args.ls_line.fit(min_x)) )
        .attr('y2', args.scales.Y(args.ls_line.fit(max_x)) )
        .attr('class', 'mg-least-squares-line');
}

MG.add_ls = add_ls;

function add_lowess(args) {
    var svg = d3.select($(args.target).find('svg').get(0));
    var lowess = args.lowess_line;

    var line = d3.svg.line()
        .x(function(d) { return args.scales.X(d.x); })
        .y(function(d) { return args.scales.Y(d.y); })
            .interpolate(args.interpolate);

    svg.append('path')
        .attr('d', line(lowess))
        .attr('class', 'mg-lowess-line');
}

MG.add_lowess = add_lowess;

function lowess_robust(x, y, alpha, inc) {
    // Used http://www.unc.edu/courses/2007spring/biol/145/001/docs/lectures/Oct27.html
    // for the clear explanation of robust lowess.

    // calculate the the first pass.
    var _l;
    var r = [];
    var yhat = d3.mean(y);
    var i;
    for (i = 0; i < x.length; i += 1) { r.push(1); }
    _l = _calculate_lowess_fit(x,y,alpha, inc, r);
    var x_proto = _l.x;
    var y_proto = _l.y;

    // Now, take the fit, recalculate the weights, and re-run LOWESS using r*w instead of w.

    for (i = 0; i < 100; i += 1) {
        r = d3.zip(y_proto, y).map(function(yi) {
            return Math.abs(yi[1] - yi[0]);
        });

        var q = d3.quantile(r.sort(), 0.5);

        r = r.map(function(ri) {
            return _bisquare_weight(ri / (6 * q));
        });

        _l = _calculate_lowess_fit(x,y,alpha,inc, r);
        x_proto = _l.x;
        y_proto = _l.y;
    }

    return d3.zip(x_proto, y_proto).map(function(d) {
        var p = {};
        p.x = d[0];
        p.y = d[1];
        return p;
    });
}

MG.lowess_robust = lowess_robust;

function lowess(x, y, alpha, inc) {
    var r = [];
    for (var i = 0; i < x.length; i += 1) { r.push(1); }
    var _l = _calculate_lowess_fit(x, y, alpha, inc, r);
}

MG.lowess = lowess;

function least_squares(x_, y_) {
    var x, y, xi, yi,
        _x  = 0,
        _y  = 0,
        _xy = 0,
        _xx = 0;

    var n = x_.length;
    if (x_[0] instanceof Date) {
        x = x_.map(function(d) {
            return d.getTime();
        });
    } else {
        x = x_;
    }

    if (y_[0] instanceof Date) {
        y = y_.map(function(d) {
            return d.getTime();
        });
    } else {
        y = y_;
    }

    var xhat = d3.mean(x);
    var yhat = d3.mean(y);
    var numerator = 0, denominator = 0;

    for (var i = 0; i < x.length; i++) {
        xi = x[i];
        yi = y[i];
        numerator += (xi - xhat) * (yi - yhat);
        denominator += (xi - xhat) * (xi - xhat);
    }

    var beta = numerator / denominator;
    var x0 = yhat - beta * xhat;

    return {
        x0: x0,
        beta: beta,
        fit: function(x) {
            return x0 + x * beta;
        }
    };
}

MG.least_squares = least_squares;

function _pow_weight(u, w) {
    if (u >= 0 && u <= 1) {
        return Math.pow(1 - Math.pow(u,w), w);
    } else {
        return 0;
    }
}

function _bisquare_weight(u) {
    return _pow_weight(u, 2);
}

function _tricube_weight(u) {
    return _pow_weight(u, 3);
}

function _neighborhood_width(x0, xis) {
    return Array.max(xis.map(function(xi) {
        return Math.abs(x0 - xi);
    }));
}

function _manhattan(x1,x2) {
    return Math.abs(x1 - x2);
}

function _weighted_means(wxy) {
    var wsum = d3.sum(wxy.map(function(wxyi) { return wxyi.w; }));

    return {
        xbar: d3.sum(wxy.map(function(wxyi) {
            return wxyi.w * wxyi.x;
        })) / wsum,
        ybar:d3.sum(wxy.map(function(wxyi) {
            return wxyi.w * wxyi.y;
        })) / wsum
    };
}

function _weighted_beta(wxy, xbar, ybar) {
    var num = d3.sum(wxy.map(function(wxyi) {
        return Math.pow(wxyi.w, 2) * (wxyi.x - xbar) * (wxyi.y - ybar);
    }));

    var denom = d3.sum(wxy.map(function(wxyi) {
        return Math.pow(wxyi.w, 2) * Math.pow(wxyi.x - xbar, 2);
    }));

    return num / denom;
}

function _weighted_least_squares(wxy) {
    var ybar, xbar, beta_i, x0;

    var _wm = _weighted_means(wxy);

    xbar = _wm.xbar;
    ybar = _wm.ybar;

    var beta = _weighted_beta(wxy, xbar, ybar);

    return {
        beta : beta,
        xbar : xbar,
        ybar : ybar,
        x0   : ybar - beta * xbar

    };
}

function _calculate_lowess_fit(x, y, alpha, inc, residuals) {
    // alpha - smoothing factor. 0 < alpha < 1/
    //
    //
    var k = Math.floor(x.length * alpha);

    var sorted_x = x.slice();

    sorted_x.sort(function(a,b) {
        if (a < b) { return -1; }
        else if (a > b) { return 1; }

        return 0;
    });

    var x_max = d3.quantile(sorted_x, 0.98);
    var x_min = d3.quantile(sorted_x, 0.02);

    var xy = d3.zip(x, y, residuals).sort();

    var size = Math.abs(x_max - x_min) / inc;

    var smallest = x_min;
    var largest = x_max;
    var x_proto = d3.range(smallest, largest, size);

    var xi_neighbors;
    var x_i, beta_i, x0_i, delta_i, xbar, ybar;

    // for each prototype, find its fit.
    var y_proto = [];

    for (var i = 0; i < x_proto.length; i += 1) {
        x_i = x_proto[i];

        // get k closest neighbors.
        xi_neighbors = xy.map(function(xyi) {
            return [
                Math.abs(xyi[0] - x_i),
                xyi[0],
                xyi[1],
                xyi[2]];
        }).sort().slice(0, k);

        // Get the largest distance in the neighbor set.
        delta_i = d3.max(xi_neighbors)[0];

        // Prepare the weights for mean calculation and WLS.

        xi_neighbors = xi_neighbors.map(function(wxy) {
            return {
                w : _tricube_weight(wxy[0] / delta_i) * wxy[3],
                x : wxy[1],
                y  :wxy[2]
            };
        });

        // Find the weighted least squares, obviously.
        var _output = _weighted_least_squares(xi_neighbors);

        x0_i = _output.x0;
        beta_i = _output.beta;

        //
        y_proto.push(x0_i + beta_i * x_i);
    }

    return {x: x_proto, y: y_proto};
}

function format_rollover_number(args) {
    var num;
    if (args.format === 'count') {
        num = function(d_) {
            var is_float = d_ % 1 !== 0;
            var n = d3.format("0,000");
            d_ = is_float ? d3.round(d_, args.decimals) : d_;
            return n(d_);
        };
    } else {
        num = function(d_) {
            var fmt_string = (args.decimals ? '.' + args.decimals : '' ) + '%';
            var n = d3.format(fmt_string);
            return n(d_);
        };
    }
    return num;
}

MG.format_rollover_number = format_rollover_number;

// http://bl.ocks.org/mbostock/3916621
function path_tween(d1, precision) {
  return function() {
    var path0 = this,
        path1 = path0.cloneNode(),
        n0 = path0.getTotalLength() || 0,
        n1 = (path1.setAttribute("d", d1), path1).getTotalLength() || 0;

    // Uniform sampling of distance based on specified precision.
    var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
    while ((i += dt) < 1) distances.push(i);
    distances.push(1);

    // Compute point-interpolators at each distance.
    var points = distances.map(function(t) {
      var p0 = path0.getPointAtLength(t * n0),
          p1 = path1.getPointAtLength(t * n1);
      return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
    });

    return function(t) {
      return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
    };
  };
}

MG.path_tween = path_tween;

//a set of helper functions, some that we've written, others that we've borrowed

MG.convert = {};

MG.convert.date = function(data, accessor, time_format) {
    time_format = (typeof time_format === "undefined") ? '%Y-%m-%d' : time_format;
    data = data.map(function(d) {
        var fff = d3.time.format(time_format);
        d[accessor] = fff.parse(d[accessor]);
        return d;
    });

    return data;
};

MG.convert.number = function(data, accessor) {
    data = data.map(function(d) {
        d[accessor] = Number(d[accessor]);
        return d;
    });

    return data;
};


function is_array(thing){
    return Object.prototype.toString.call(thing) === '[object Array]';
}

function is_function(thing){
    return Object.prototype.toString.call(thing) === '[object Function]';
}

function is_empty_array(thing){
    return is_array(thing) && thing.length==0;
}

function is_object(thing){
    return Object.prototype.toString.call(thing) === '[object Object]';
}

function is_array_of_arrays(data){
    var all_elements = data.map(function(d){return is_array(d)===true && d.length>0});
    return d3.sum(all_elements) === data.length;
}

function is_array_of_objects(data){
    // is every element of data an object?
    var all_elements = data.map(function(d){return is_object(d)===true});
    return d3.sum(all_elements) === data.length;
}

function is_array_of_objects_or_empty(data){
    return is_empty_array(data) || is_array_of_objects(data);
}


function preventHorizontalOverlap(labels, args) {
    if (!labels || labels.length == 1) {
        return;
    }

    //see if each of our labels overlaps any of the other labels
    for (var i = 0; i < labels.length; i++) {
        //if so, nudge it up a bit, if the label it intersects hasn't already been nudged
        if (isHorizontallyOverlapping(labels[i], labels)) {
            var node = d3.select(labels[i]);
            var newY = +node.attr('y');
            if (newY + 8 == args.top) {
                newY = args.top - 16;
            }
            node.attr('y', newY);
        }
    }
}

function preventVerticalOverlap(labels, args) {
    if (!labels || labels.length == 1) {
        return;
    }

    labels.sort(function(b,a){
        return d3.select(a).attr('y') - d3.select(b).attr('y');
    });

    labels.reverse();

    var overlap_amount, label_i, label_j;

    //see if each of our labels overlaps any of the other labels
    for (var i = 0; i < labels.length; i++) {
        //if so, nudge it up a bit, if the label it intersects hasn't already been nudged
        label_i = d3.select(labels[i]).text();

        for (var j = 0; j < labels.length; j ++) {
            label_j = d3.select(labels[j]).text();
            overlap_amount = isVerticallyOverlapping(labels[i], labels[j]);

            if (overlap_amount !== false && label_i !== label_j) {
                var node = d3.select(labels[i]);
                var newY = +node.attr('y');
                newY = newY + overlap_amount;
                node.attr('y', newY);
            }
        }
    }
}

function isVerticallyOverlapping(element, sibling) {
    var element_bbox = element.getBoundingClientRect();
    var sibling_bbox = sibling.getBoundingClientRect();

    if (element_bbox.top <= sibling_bbox.bottom && element_bbox.top >= sibling_bbox.top) {
        return sibling_bbox.bottom - element_bbox.top;
    }

    return false;
}

function isHorizontallyOverlapping(element, labels) {
    var element_bbox = element.getBoundingClientRect();

    for (var i = 0; i < labels.length; i++) {
        if (labels[i] == element) {
            continue;
        }

        //check to see if this label overlaps with any of the other labels
        var sibling_bbox = labels[i].getBoundingClientRect();
        if (element_bbox.top === sibling_bbox.top &&
                !(sibling_bbox.left > element_bbox.right || sibling_bbox.right < element_bbox.left)
            ) {
            return true;
        }
    }

    return false;
}

function mg_get_svg_child_of(selector_or_node) {
    return d3.select(selector_or_node).select('svg');
}

function mg_flatten_array(arr) {
    var flat_data = [];
    return flat_data.concat.apply(flat_data, arr);
}

function mg_next_id() {
    if (typeof MG._next_elem_id === 'undefined') {
        MG._next_elem_id = 0;
    }

    return 'mg-'+(MG._next_elem_id++);
}

function mg_target_ref(target) {
    if (typeof target === 'string') {
        return mg_normalize(target);

    } else if (target instanceof HTMLElement) {
        target_ref = target.getAttribute('data-mg-uid');
        if (!target_ref) {
            target_ref = mg_next_id();
            target.setAttribute('data-mg-uid', target_ref);
        }

        return target_ref;

    } else {
        console.warn('The specified target should be a string or an HTMLElement.', target);
        return mg_normalize(target);
    }
}

function mg_normalize(string) {
    return string
        .replace(/[^a-zA-Z0-9 _-]+/g, '')
        .replace(/ +?/g, '');
}

function get_pixel_dimension(target, dimension) {
    return Number(d3.select(target).style(dimension).replace(/px/g, ''));
}

function get_width(target) {
    return get_pixel_dimension(target, 'width');
}

function get_height(target) {
    return get_pixel_dimension(target, 'height');
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

var each = function(obj, iterator, context) {
    // yanked out of underscore
    var breaker = {};
    if (obj === null) return obj;
    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var k in obj) {
        if (iterator.call(context, obj[k], k, obj) === breaker) return;
      }
    }

    return obj;
};

function merge_with_defaults(obj) {
    // taken from underscore
    each(Array.prototype.slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });

    return obj;
}

MG.merge_with_defaults = merge_with_defaults;

function number_of_values(data, accessor, value) {
    var values = data.filter(function(d) {
        return d[accessor] === value;
    });

    return values.length;
}

function has_values_below(data, accessor, value) {
    var values = data.filter(function(d) {
        return d[accessor] <= value;
    });

    return values.length > 0;
}

function has_too_many_zeros(data, accessor, zero_count) {
    return number_of_values(data, accessor, 0) >= zero_count;
}

//deep copy
//http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
MG.clone = function(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" !== typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = MG.clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = MG.clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

//give us the difference of two int arrays
//http://radu.cotescu.com/javascript-diff-function/
function arr_diff(a,b) {
    var seen = [],
        diff = [],
        i;
    for (i = 0; i < b.length; i++)
        seen[b[i]] = true;
    for (i = 0; i < a.length; i++)
        if (!seen[a[i]])
            diff.push(a[i]);
    return diff;
}

MG.arr_diff = arr_diff;

/**
    Print warning message to the console when a feature has been scheduled for removal

    @author Dan de Havilland (github.com/dandehavilland)
    @date 2014-12
*/
function warn_deprecation(message, untilVersion) {
  console.warn('Deprecation: ' + message + (untilVersion ? '. This feature will be removed in ' + untilVersion + '.' : ' the near future.'));
  console.trace();
}

MG.warn_deprecation = warn_deprecation;

/**
    Truncate a string to fit within an SVG text node
    CSS text-overlow doesn't apply to SVG <= 1.2

    @author Dan de Havilland (github.com/dandehavilland)
    @date 2014-12-02
*/
function truncate_text(textObj, textString, width) {
  var bbox,
    position = 0;

  textObj.textContent = textString;
  bbox = textObj.getBBox();

  while (bbox.width > width) {
    textObj.textContent = textString.slice(0, --position) + '...';
    bbox = textObj.getBBox();

    if (textObj.textContent === '...') {
      break;
    }
  }
}

MG.truncate_text = truncate_text;

/**
  Wrap the contents of a text node to a specific width

  Adapted from bl.ocks.org/mbostock/7555321

  @author Mike Bostock
  @author Dan de Havilland
  @date 2015-01-14
*/
function wrap_text(text, width, token, tspanAttrs) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(token || /\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = 0,
        tspan = text.text(null)
          .append("tspan")
          .attr("x", 0)
          .attr("y", dy + "em")
          .attr(tspanAttrs || {});

    while (!!(word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (width === null || tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
            .append("tspan")
            .attr("x", 0)
            .attr("y", ++lineNumber * lineHeight + dy + "em")
            .attr(tspanAttrs || {})
            .text(word);
      }
    }
  });
}

MG.wrap_text = wrap_text;

//call this to add a warning icon to a graph and log an error to the console
function error(args) {
    console.log('ERROR : ', args.target, ' : ', args.error);

    d3.select(args.target).select('.mg-chart-title')
        .append('i')
            .attr('class', 'fa fa-x fa-exclamation-circle warning');
}

MG.error = error;

return MG;
}));
