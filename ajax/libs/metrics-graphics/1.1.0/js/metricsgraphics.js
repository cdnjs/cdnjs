

var charts = {};
var globals = {};
globals.link = false;
globals.version = "1.1";

function data_graphic() {
    'use strict';
    var moz = {};
    moz.defaults = {};
    moz.defaults.all = {
        missing_is_zero: false,       // if true, missing values will be treated as zeros
        legend: '' ,                  // an array identifying the labels for a chart's lines
        legend_target: '',            // if set, the specified element is populated with a legend
        error: '',                    // if set, a graph will show an error icon and log the error to the console
        animate_on_load: false,       // animate lines on load
        top: 40,                      // the size of the top margin
        bottom: 30,                   // the size of the bottom margin
        right: 10,                    // size of the right margin
        left: 50,                     // size of the left margin
        buffer: 8,                    // the buffer between the actual chart area and the margins
        width: 350,                   // the width of the entire graphic
        height: 220,                  // the height of the entire graphic
        small_height_threshold: 120,  // the height threshold for when smaller text appears
        small_width_threshold: 160,   // the width  threshold for when smaller text appears
        small_text: false,            // coerces small text regardless of graphic size
        xax_count: 6,                 // number of x axis ticks
        xax_tick_length: 5,           // x axis tick length
        yax_count: 5,                 // number of y axis ticks
        yax_tick_length: 5,           // y axis tick length
        x_extended_ticks: false,      // extends x axis ticks across chart - useful for tall charts
        y_extended_ticks: false,      // extends y axis ticks across chart - useful for long charts
        y_scale_type: 'linear',
        max_x: null,
        max_y: null,
        min_x: null,
        min_y: null,                  // if set, y axis starts at an arbitrary value
        min_y_from_data: false,       // if set, y axis will start at minimum value rather than at 0
        point_size: 2.5,              // the size of the dot that appears on a line on mouse-over
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
        rollover_callback: null,
        show_rollover_text: true,
        show_confidence_band: null,   // given [l, u] shows a confidence at each point from l to u
        xax_format: function(d) {
            var df = d3.time.format('%b %d');
            var pf = d3.formatPrefix(d);

            // format as date or not, of course user can pass in 
            // a custom function if desired
            switch($.type(args.data[0][0][args.x_accessor])) {
                case 'date':
                    return df(d);
                    break;
                case 'number':
                    return pf.scale(d) + pf.symbol;
                    break;
                default:
                    return d;
            }
        },
        area: true,
        chart_type: 'line',   
        data: [],
        decimals: 2,                  // the number of decimals in any rollover
        format: 'count',              // format = {count, percentage}
        inflator: 10/9,               // for setting y axis max
        linked: false,                // links together all other graphs with linked:true, so rollovers in one trigger rollovers in the others
        list: false,
        baselines: null,              // sets the baseline lines
        markers: null,                // sets the marker lines
        scalefns: {},
        scales: {},
        show_years: true,
        target: '#viz',
        interpolate: 'cardinal',       // interpolation method to use when rendering lines
        custom_line_color_map: [],     // allows arbitrary mapping of lines to colors, e.g. [2,3] will map line 1 to color 2 and line 2 to color 3
        max_data_size: null            // explicitly specify the the max number of line series, for use with custom_line_color_map
    }
    moz.defaults.point = {
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
    }
    moz.defaults.histogram = {
        rollover_callback: function(d, i) {
            $('#histogram svg .active_datapoint')
                .html('Frequency Count: ' + d.y);
        },
        binned: false,
        bins: null,
        processed_x_accessor: 'x',
        processed_y_accessor: 'y',
        processed_dx_accessor: 'dx',
        bar_margin: 1
    }
    moz.defaults.bar = {
        y_accessor: 'factor',
        x_accessor: 'value',
        baseline_accessor: null,
        predictor_accessor: null,
        predictor_proportion: 5,
        dodge_accessor: null,
        binned: true,
        padding_percentage: 0,
        outer_padding_percentage: .1,
        height: 500,
        top: 20,
        bar_height: 20,
        left: 70
    }
    moz.defaults.missing = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        legend_target: '',
        width: 350,
        height: 220,
        missing_text: 'Data currently missing or unavailable'
    }

    var args = arguments[0];
    if (!args) { args = {}; }
    //args = merge_with_defaults(args, moz.defaults.all);

    var g = '';
    if (args.list) {
        args.x_accessor = 0;
        args.y_accessor = 1;
    }
    
    //build the chart
    if(args.chart_type == 'missing-data'){
        args = merge_with_defaults(args, moz.defaults.missing);
        charts.missing(args);
    }
    else if(args.chart_type == 'point'){
        var a = merge_with_defaults(moz.defaults.point, moz.defaults.all);
        args = merge_with_defaults(args, a);
        charts.point(args).mainPlot().markers().rollover();
    }
    else if(args.chart_type == 'histogram'){
        var a = merge_with_defaults(moz.defaults.histogram, moz.defaults.all);
        args = merge_with_defaults(args, a);
        charts.histogram(args).mainPlot().markers().rollover();
    }
    else if (args.chart_type == 'bar'){
        var a = merge_with_defaults(moz.defaults.bar, moz.defaults.all);
        args = merge_with_defaults(args, a);
        charts.bar(args).mainPlot().markers().rollover();
    }
    else {
        args = merge_with_defaults(args, moz.defaults.all);
        charts.line(args).markers().mainPlot().rollover();
    }

    return args.data;
}

/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=698666b23215c58f23d4)
 * Config saved to config.json and https://gist.github.com/698666b23215c58f23d4
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

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
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.1'

  Tooltip.TRANSITION_DURATION = 150

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
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
    this.arrow()
      .css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isHorizontal ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this    = $(this)
      var data     = $this.data('bs.tooltip')
      var options  = typeof option == 'object' && option
      var selector = options && options.selector

      if (!data && option == 'destroy') return
      if (selector) {
        if (!data) $this.data('bs.tooltip', (data = {}))
        if (!data[selector]) data[selector] = new Tooltip(this, options)
      } else {
        if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      }
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

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
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.1'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this    = $(this)
      var data     = $this.data('bs.popover')
      var options  = typeof option == 'object' && option
      var selector = options && options.selector

      if (!data && option == 'destroy') return
      if (selector) {
        if (!data) $this.data('bs.popover', (data = {}))
        if (!data[selector]) data[selector] = new Popover(this, options)
      } else {
        if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      }
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

function chart_title(args) {
    //is chart title different than existing, if so, clear the fine 
    //gentleman, otherwise, move along
    'use strict';
    var currentTitle = $(args.target).find('h2.chart_title');
    if(args.title && args.title !== currentTitle.text())
        currentTitle.remove();
    else
        return;

    if (args.target && args.title) {
        var newTitle;
        //only show question mark if there's a description
        var optional_question_mark = (args.description)
            ? '<i class="fa fa-question-circle fa-inverse"></i>'
            : '';
    
        $(args.target).prepend('<h2 class="chart_title">' 
            + args.title + optional_question_mark + '</h2>');
            
        //activate the question mark if we have a description
        if (args.description){
            newTitle = $(args.target).find('h2.chart_title');
                newTitle.popover({
                    html: true,
                    animation: false,
                    content: args.description,
                    trigger: 'hover',
                    placement: 'top',
                    container: newTitle
                });
        }   
    }
    
    if(args.error) {
        error(args);
    }
}
function y_rug(args) {
    'use strict';
    var svg = d3.select($(args.target).find('svg').get(0));
    var buffer_size = args.chart_type == 'point' 
        ? args.buffer / 2 
        : args.buffer * 2 / 3;

    var all_data = [];
    for (var i=0; i<args.data.length; i++) {
        for (var j=0; j<args.data[i].length; j++) {
            all_data.push(args.data[i][j]);
        }
    }
    var rug = svg.selectAll('line.y_rug').data(all_data)
        .enter().append('svg:line')
            .attr('x1', args.left + 1)
            .attr('x2', args.left+buffer_size)
            .attr('y1', args.scalefns.yf)
            .attr('y2', args.scalefns.yf)
            .attr('class', 'y-rug')
            .attr('opacity', 0.3);

    if (args.color_accessor) {
        rug.attr('stroke', args.scalefns.color);
    }
    else {
        rug.classed('y-rug-mono', true);
    }
}

function y_axis(args) {
    var svg = d3.select($(args.target).find('svg').get(0));
    var $svg = $($(args.target).find('svg').get(0));
    var g;

    var min_y, max_y;

    args.scalefns.yf = function(di) {
        return args.scales.Y(di[args.y_accessor]);
    }

    var min_y, max_y;

    var _set = false;
    for (var i=0; i<args.data.length; i++) {
        var a = args.data[i];

        if (args.y_scale_type == 'log') {
            // filter positive values
            a = a.filter(function(d) { return d[args.y_accessor] > 0; });
        }

        if (a.length > 0) {
            // get min/max in one pass
            var extent = d3.extent(a,function(d) {
                return d[args.y_accessor];
            });

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

    // the default cause is for the y-axis to start at 0, unless we explicitly want it
    // to start at ab arbitrary number or from the data's minimum value
    if (min_y >= 0 && !args.min_y && !args.min_y_from_data){
        min_y = 0;
    }

    //if a min_y or max_y have been set, use those instead
    min_y = args.min_y ? args.min_y : min_y;
    max_y = args.max_y ? args.max_y : max_y;

    if (args.y_scale_type != 'log') {
        // we are currently saying that if the min val > 0, set 0 as min y.
        if (min_y >= 0){
            args.y_axis_negative = false;
        } else {
            min_y = min_y  - (max_y * (args.inflator-1));
            args.y_axis_negative = true;
        }
    }

    max_y = max_y * args.inflator;
    if (!args.min_y && args.min_y_from_data){
        min_y = min_y / args.inflator;    
    }

    if (args.y_scale_type == 'log'){
        if (args.chart_type == 'histogram') {
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

    // used for ticks and such, and designed to be paired with log or linear.
    args.scales.Y_axis = d3.scale.linear()
        .domain([min_y, max_y])
        .range([args.height - args.bottom - args.buffer, args.top]);

    var yax_format;
    if (args.format == 'count') {
        yax_format = function(f) {
            if (f < 1.0) {
                // Don't scale tiny values.
                return args.yax_units + d3.round(f, args.decimals);
            } else {
                var pf = d3.formatPrefix(f);
                return args.yax_units + pf.scale(f) + pf.symbol;
            }
        };
    }
    else {
        yax_format = function(d_) {
            var n = d3.format('%p');
            return n(d_);
        }
    }

    //remove the old y-axis, add new one
    $svg.find('.y-axis').remove();

    if (!args.y_axis) return this;

    //y axis
    g = svg.append('g')
        .classed('y-axis', true)
        .classed('y-axis-small', args.use_small_class);

    //are we adding a label?
    if(args.y_label) {
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
         //return Math.log(val) / Math.LN10;
         if (val == 1000){
            return 3;
         }
         if (val == 1000000) {
            return 7;
         }
         return Math.log(val) / Math.LN10;
    }

    if (args.y_scale_type == 'log') {
        // get out only whole logs
        scale_ticks = scale_ticks.filter(function(d){
            return Math.abs(log10(d)) % 1 < 1e-6 || Math.abs(log10(d)) % 1 > 1-1e-6;
        });
    }

    //filter out fraction ticks if our data is ints and if ymax > number of generated ticks
    var number_of_ticks = args.scales.Y.ticks(args.yax_count).length;
    
    //is our data object all ints?
    var data_is_int = true;
    $.each(args.data, function(i, d) {
        $.each(d, function(i, d) {
            if(d[args.y_accessor] % 1 !== 0) {
                data_is_int = false;
                return false;
            }
        });
    });

    if(data_is_int && number_of_ticks > max_y && args.format == 'count') {
        //remove non-integer ticks
        scale_ticks = scale_ticks.filter(function(d){
            return d % 1 === 0;
        });
    }

    var last_i = scale_ticks.length-1;
    if(!args.x_extended_ticks && !args.y_extended_ticks) {
        g.append('line')
            .attr('x1', args.left)
            .attr('x2', args.left)
            .attr('y1', args.scales.Y(scale_ticks[0]).toFixed(2))
            .attr('y2', args.scales.Y(scale_ticks[last_i]).toFixed(2));
    }

    //add y ticks
    g.selectAll('.yax-ticks')
        .data(scale_ticks).enter()
            .append('line')
                .classed('extended-y-ticks', args.y_extended_ticks)
                .attr('x1', args.left)
                .attr('x2', function() {
                    return (args.y_extended_ticks)
                        ? args.width - args.right
                        : args.left - args.yax_tick_length;
                })
                .attr('y1', function(d) { return args.scales.Y(d).toFixed(2); })
                .attr('y2', function(d) { return args.scales.Y(d).toFixed(2); });

    g.selectAll('.yax-labels')
        .data(scale_ticks).enter()
            .append('text')
                .attr('x', args.left - args.yax_tick_length * 3 / 2)
                .attr('dx', -3).attr('y', function(d) { 
                    return args.scales.Y(d).toFixed(2);
                })
                .attr('dy', '.35em')
                .attr('text-anchor', 'end')
                .text(function(d, i) {
                    var o = yax_format(d);
                    return o;
                })

    if (args.y_rug) {
        y_rug(args);
    }

    return this;
}

function y_axis_categorical(args) {
    // first, come up with y_axis 
    var svg_height = args.height;
    if (args.chart_type == 'bar' && svg_height == null){
        // we need to set a new height variable.
    }

    args.scales.Y = d3.scale.ordinal()
        .domain(args.categorical_variables)
        .rangeRoundBands([args.height - args.bottom - args.buffer, args.top], args.padding_percentage, args.outer_padding_percentage);

    args.scalefns.yf = function(di) {
        return args.scales.Y(di[args.y_accessor]);
    }

    var svg = d3.select($(args.target).find('svg').get(0));
    var $svg = $($(args.target).find('svg').get(0));

    //remove the old y-axis, add new one
    $svg.find('.y-axis').remove();

    var g = svg.append('g')
        .classed('y-axis', true)
        .classed('y-axis-small', args.use_small_class);

    if (!args.y_axis) return this;

    g.selectAll('text').data(args.categorical_variables).enter().append('svg:text')
        .attr('x', args.left)
        .attr('y', function(d) {
            return args.scales.Y(d) + args.scales.Y.rangeBand() / 2 
                + (args.buffer)*args.outer_padding_percentage;
        })
        .attr('dy', '.35em')
        .attr('text-anchor', 'end')
        .text(String)

    return this;
}

function x_rug(args) {
    'use strict';
    var buffer_size = args.chart_type =='point' 
        ? args.buffer / 2 
        : args.buffer;

    var svg = d3.select($(args.target).find('svg').get(0));
    var all_data=[];
    for (var i=0; i<args.data.length; i++) {
        for (var j=0; j<args.data[i].length; j++) {
            all_data.push(args.data[i][j]);
        }
    }

    var rug = svg.selectAll('line.x_rug').data(all_data)
        .enter().append('svg:line')
            .attr('x1', args.scalefns.xf)
            .attr('x2', args.scalefns.xf)
            .attr('y1', args.height-args.top+buffer_size)
            .attr('y2', args.height-args.top)
            .attr('class', 'x-rug')
            .attr('opacity', 0.3);

    if (args.color_accessor) {
        rug.attr('stroke', args.scalefns.color);
    }
    else {
        rug.classed('x-rug-mono', true);
    }
}

function x_axis(args) {
    'use strict';
    var svg = d3.select($(args.target).find('svg').get(0));
    var $svg = $($(args.target).find('svg').get(0));

    var g;
    var min_x;
    var max_x;

    args.scalefns.xf = function(di) {
        return args.scales.X(di[args.x_accessor]);
    }

    if (args.chart_type == 'point') {
        // figure out 
        var min_size, max_size, min_color, max_color, size_range, color_range, size_domain, color_domain;
        if (args.color_accessor != null) {
            if (args.color_domain == null) {
                if (args.color_type=='number') {
                    min_color = d3.min(args.data[0], function(d) {
                        return d[args.color_accessor]
                    });

                    max_color = d3.max(args.data[0], function(d){
                        return d[args.color_accessor]
                    });

                    color_domain = [min_color, max_color];
                }
                else if (args.color_type == 'category') {
                    color_domain = d3.set(args.data[0]
                        .map(function(d) {
                            return d[args.color_accessor];
                        }))
                        .values();

                    color_domain.sort();
                }
            }
            else {
                color_domain = args.color_domain;
            }

            if (args.color_range == null){
                if (args.color_type=='number') {
                    color_range = ['blue', 'red'];    
                } else {
                    color_range = null;
                }
                
            } else {
                color_range = args.color_range;
            }

            if (args.color_type=='number') {
                args.scales.color = d3.scale.linear()
                    .domain(color_domain)
                    .range(color_range)
                    .clamp(true);    
            } else {
                args.scales.color = args.color_range != null 
                    ? d3.scale.ordinal().range(color_range) 
                    : (color_domain.length > 10 
                        ? d3.scale.category20() : d3.scale.category10());

                args.scales.color.domain(color_domain);
            }

            args.scalefns.color = function(di) {
                return args.scales.color(di[args.color_accessor]);
            };
        }

        if (args.size_accessor != null) {
            if (args.size_domain == null) {
                min_size = d3.min(args.data[0], function(d){
                    return d[args.size_accessor]
                });

                max_size = d3.max(args.data[0], function(d){
                    return d[args.size_accessor];
                });

                size_domain = [min_size, max_size];
            } else {
                size_domain = args.size_domain;
            }
            if (args.size_range == null) {
                size_range = [1,5];//args.size_domain;
            } else {
                size_range = args.size_range;
            }

            args.scales.size=d3.scale.linear()
                .domain(size_domain)
                .range(size_range)
                .clamp(true);

            args.scalefns.size = function(di) {
                return args.scales.size(di[args.size_accessor]);
            };
        }
    }

    var last_i;

    if(args.chart_type == 'line') {
        for(var i=0; i<args.data.length; i++) {
            last_i = args.data[i].length-1;

            if(args.data[i][0][args.x_accessor] < min_x || !min_x)
                min_x = args.data[i][0][args.x_accessor];

            if(args.data[i][last_i][args.x_accessor] > max_x || !max_x)
                max_x = args.data[i][last_i][args.x_accessor];
        }
    }
    else if(args.chart_type == 'point') {
        max_x = d3.max(args.data[0], function(d){return d[args.x_accessor]});
        min_x = d3.min(args.data[0], function(d){return d[args.x_accessor]});
    }
    else if(args.chart_type == 'histogram') {
        min_x = d3.min(args.data[0], function(d){return d[args.x_accessor]});
        max_x = d3.max(args.data[0], function(d){return d[args.x_accessor]});
        
        //force override xax_format
        //todo revisit to see if this makes sense        
        args.xax_format = function(f) {
            if (f < 1.0) {
                //don't scale tiny values
                return args.yax_units + d3.round(f, args.decimals);
            }
            else {
                var pf = d3.formatPrefix(f);
                return args.xax_units + pf.scale(f) + pf.symbol;
            }
        }
    }
    else if(args.chart_type == 'bar') {
        //min_x = d3.min(args.data[0], function(d){return d[args.value_accessor]});

        min_x = 0; // TODO: think about what actually makes sense.
        max_x = d3.max(args.data[0], function(d){
            var trio = [];
            trio.push(d[args.x_accessor]);

            if (args.baseline_accessor!=null){
                trio.push(d[args.baseline_accessor]);
            };

            if (args.predictor_accessor!=null){
                trio.push(d[args.predictor_accessor]);
            }

            return Math.max.apply(null, trio);
        });

        args.xax_format = function(f) {
            if (f < 1.0) {
                //don't scale tiny values
                return args.yax_units + d3.round(f, args.decimals);
            }
            else {
                var pf = d3.formatPrefix(f);
                return args.xax_units + pf.scale(f) + pf.symbol;
            }
        }
    }

    min_x = args.min_x ? args.min_x : min_x;
    max_x = args.max_x ? args.max_x : max_x;
    args.x_axis_negative = false;

    if (!args.time_series) {
        if (min_x < 0){
            min_x = min_x  - (max_x * (args.inflator-1));
            args.x_axis_negative = true;
        }
    }

    // this is for some charts that might need additional buffer, such as the bar chart.
    var additional_buffer;

    if (args.chart_type == 'bar'){
        additional_buffer = args.buffer*5;
    } else {
        additional_buffer = 0;
    }

    args.scales.X = (args.time_series) 
        ? d3.time.scale() 
        : d3.scale.linear();

    args.scales.X
        .domain([min_x, max_x])
        .range([args.left + args.buffer, args.width - args.right - args.buffer - additional_buffer]);

    //remove the old x-axis, add new one
    $svg.find('.x-axis').remove();

    if (!args.x_axis) return this;

    //x axis
    g = svg.append('g')
        .classed('x-axis', true)
        .classed('x-axis-small', args.use_small_class);

    var last_i = args.scales.X.ticks(args.xax_count).length-1;

    //are we adding a label?
    if(args.x_label) {
        g.append('text')
            .attr('class', 'label')
            .attr('x', function() {
                return args.left + args.buffer
                    + ((args.width - args.right - args.buffer)
                        - (args.left + args.buffer)) / 2;
            })
            .attr('y', (args.height - args.bottom / 2).toFixed(2))
            .attr('dy', '.50em')
            .attr('text-anchor', 'middle')
            .text(function(d) {
                return args.x_label;
            })
    }

    if(args.chart_type != 'bar' && !args.x_extended_ticks && !args.y_extended_ticks) {
        //extend axis line across bottom, rather than from domain's min..max
        g.append('line')
            .attr('x1', 
                (args.concise == false || args.xax_count == 0)
                    ? args.left + args.buffer
                    : (args.scales.X(args.scales.X.ticks(args.xax_count)[0])).toFixed(2)
            )
            .attr('x2', 
                (args.concise == false || args.xax_count == 0)
                    ? args.width - args.right - args.buffer
                    : (args.scales.X(args.scales.X.ticks(args.xax_count)[last_i])).toFixed(2)
            )
            .attr('y1', args.height - args.bottom)
            .attr('y2', args.height - args.bottom);
    }

    //add x ticks
    g.selectAll('.xax-ticks')
        .data(args.scales.X.ticks(args.xax_count)).enter()
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
                    if(args.x_extended_ticks)
                        return 'extended-x-ticks';
                });

    g.selectAll('.xax-labels')
        .data(args.scales.X.ticks(args.xax_count)).enter()
            .append('text')
                .attr('x', function(d) { return args.scales.X(d).toFixed(2); })
                .attr('y', (args.height - args.bottom + args.xax_tick_length * 7 / 3).toFixed(2))
                .attr('dy', '.50em')
                .attr('text-anchor', 'middle')
                .text(function(d) {
                    return args.xax_units + args.xax_format(d);
                })

    //are we adding years to x-axis
    if (args.time_series && args.show_years) {
        var min_x;
        var max_x;

        for (var i=0; i<args.data.length; i++) {
            last_i = args.data[i].length-1;

            if(args.data[i][0][args.x_accessor] < min_x || !min_x)
                min_x = args.data[i][0][args.x_accessor];
            if(args.data[i][last_i][args.x_accessor] > max_x || !max_x)
                max_x = args.data[i][last_i][args.x_accessor];
        }

        var years = d3.time.years(min_x, max_x);

        if (years.length == 0){
            var first_tick = args.scales.X.ticks(args.xax_count)[0];
            years = [first_tick];
        }

        //append year marker to x-axis group
        g = g.append('g')
            .classed('year-marker', true)
            .classed('year-marker-small', args.use_small_class); 

        g.selectAll('.year_marker')
            .data(years).enter()
                .append('line')
                    .attr('x1', function(d) { return args.scales.X(d).toFixed(2); })
                    .attr('x2', function(d) { return args.scales.X(d).toFixed(2); })
                    .attr('y1', args.top)
                    .attr('y2', args.height - args.bottom);

        var yformat = d3.time.format('%Y');
        g.selectAll('.year_marker')
            .data(years).enter()
                .append('text')
                    .attr('x', function(d) { return args.scales.X(d).toFixed(2); })
                    .attr('y', (args.height - args.bottom + args.xax_tick_length * 7 / 1.3).toFixed(2))
                    .attr('dy', args.use_small_class ? -3 : 0)//(args.y_extended_ticks) ? 0 : 0 )
                    .attr('text-anchor', 'middle')
                    .text(function(d) {
                        return yformat(d);
                    });
    };  

    if (args.x_rug){
        x_rug(args);
    }

    return this;
}

function init(args) {
    'use strict';
    var defaults = {
        target: null,
        title: null,
        description: null
    };

    var args = arguments[0];
    if (!args) { args = {}; }
    args = merge_with_defaults(args, defaults);

    //this is how we're dealing with passing in a single array of data, 
    //but with the intention of using multiple values for multilines, etc.

    //do we have a time_series?
    if($.type(args.data[0][0][args.x_accessor]) == 'date') {
        args.time_series = true;
    }
    else {
        args.time_series = false;
    }

    var linked;

    var svg_width = args.width;
    var svg_height = args.height;

    if (args.chart_type=='bar' && svg_height == null){
        svg_height = args.height = args.data[0].length * args.bar_height + args.top + args.bottom;
    }
    //remove the svg if the chart type has changed
    var svg = $(args.target).find('svg');
    if((svg.find('.main-line').length > 0 && args.chart_type != 'line')
            || (svg.find('.points').length > 0 && args.chart_type != 'point')
            || (svg.find('.histogram').length > 0 && args.chart_type != 'histogram')
            || (svg.find('.barplot').length > 0 && args.chart_type != 'bar')
        ) {
        $(args.target).empty();

    }

    //add svg if it doesn't already exist
    //using trim on html rather than :empty to ignore white spaces if they exist
    if($.trim($(args.target).html()) == '') {
        //add svg
        d3.select(args.target)
            .append('svg')
                .classed('linked', args.linked)
                .attr('width', svg_width)
                .attr('height', svg_height);
    }

    var svg = d3.select(args.target).selectAll('svg');

    //has the width or height changed?
    if(args.width != Number(svg.attr('width')))
        svg.attr('width', args.width)

    if(args.height != Number(svg.attr('height')))
        svg.attr('height', args.height)

    // remove missing class
    svg.classed('missing', false);
    // remove missing text
    svg.selectAll('.missing-text').remove();

    //add chart title if it's different than existing one
    chart_title(args);

    //draw axes
    args.use_small_class = args.height - args.top - args.bottom - args.buffer 
            <= args.small_height_threshold && args.width - args.left-args.right - args.buffer * 2 
            <= args.small_width_threshold || args.small_text;

    //if we're updating an existing chart and we have fewer lines than
    //before, remove the outdated lines, e.g. if we had 3 lines, and we're calling
    //data_graphic() on the same target with 2 lines, remove the 3rd line
    if(args.data.length < $(args.target).find('svg .main-line').length) {
        //now, the thing is we can't just remove, say, line3 if we have a custom
        //line-color map, instead, see which are the lines to be removed, and delete those    
        if(args.custom_line_color_map.length > 0) {
            var array_full_series = function(len) {
                var arr = new Array(len);
                for(var i=0;i<arr.length;i++) { arr[i] = i + 1; }
                return arr;
            }

            //get an array of lines ids to remove
            var lines_to_remove = arrDiff(
                array_full_series(args.max_data_size), 
                args.custom_line_color_map);

            for(var i=0; i<lines_to_remove.length; i++) {
                $(args.target).find('svg .main-line.line' + lines_to_remove[i] + '-color')
                    .remove();
            }
        }
        //if we don't have a customer line-color map, just remove the lines from the end
        else {
            var num_of_new = args.data.length;
            var num_of_existing = $(args.target).find('svg .main-line').length;

            for(var i=num_of_existing; i>num_of_new; i--) {
                $(args.target).find('svg .main-line.line' + i + '-color').remove();
            }
        }
    }

    return this;
}

function markers(args) {
    'use strict';
    var svg = d3.select($(args.target).find('svg').get(0));
    var gm;
    var gb;

    if(args.markers) {
        $(args.target).find('svg .markers').remove();

        gm = svg.append('g')
            .attr('class', 'markers');

        gm.selectAll('.markers')
            .data(args.markers.filter(function(d){
                return (args.scales.X(d[args.x_accessor]) > args.buffer + args.left)
                    && (args.scales.X(d[args.x_accessor]) < args.width - args.buffer - args.right);
            }))
            .enter()
            .append('line')
                .attr('x1', function(d) {
                    return args.scales.X(d[args.x_accessor]).toFixed(2);
                })
                .attr('x2', function(d) {
                    return args.scales.X(d[args.x_accessor]).toFixed(2);
                })
                .attr('y1', args.top)
                .attr('y2', function() {
                    return args.height - args.bottom - args.buffer;
                })
                .attr('stroke-dasharray', '3,1');

        gm.selectAll('.markers')
            .data(args.markers.filter(function(d){
                return (args.scales.X(d[args.x_accessor]) > args.buffer + args.left)
                    && (args.scales.X(d[args.x_accessor]) < args.width - args.buffer - args.right);
            }))
            .enter()
            .append('text')
                .attr('x', function(d) {
                    return args.scales.X(d[args.x_accessor])
                })
                .attr('y', args.top - 8)
                .attr('text-anchor', 'middle')
                .text(function(d) {
                    return d['label'];
                });
    }

    if(args.baselines) {
        svg.selectAll('.baselines').remove();
        gb = svg.append('g')
            .attr('class', 'baselines');

        gb.selectAll('.baselines')
            .data(args.baselines)
            .enter().append('line')
                .attr('x1', args.left + args.buffer)
                .attr('x2', args.width-args.right-args.buffer)
                .attr('y1', function(d){
                    return args.scales.Y(d['value']).toFixed(2);
                })
                .attr('y2', function(d){
                    return args.scales.Y(d['value']).toFixed(2);
                });

        gb.selectAll('.baselines')
            .data(args.baselines)
            .enter().append('text')
                .attr('x', args.width-args.right - args.buffer)
                .attr('y', function(d){
                    return args.scales.Y(d['value']).toFixed(2);
                })
                .attr('dy', -3)
                .attr('text-anchor', 'end')
                .text(function(d) {
                    return d['label'];
                });
    }

    return this;
}

/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=c3834cc5b59ef727da53)
 * Config saved to config.json and https://gist.github.com/c3834cc5b59ef727da53
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

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

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.1'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

var button_layout = function(target) {
    'use strict';
    this.target = target;
    this.feature_set = {};
    this.public_name = {};
    this.sorters = {};
    this.manual = [];
    this.manual_map = {};
    this.manual_callback = {};

    this._strip_punctuation = function(s){
        var punctuationless = s.replace(/[^a-zA-Z0-9 _]+/g, '');
        var finalString = punctuationless.replace(/ +?/g, "");
        return finalString;
    }

    this.data = function(data) {
        this._data = data;
        return this;
    }

    this.manual_button = function(feature, feature_set, callback) {
        this.feature_set[feature]=feature_set;
        this.manual_map[this._strip_punctuation(feature)] = feature;
        this.manual_callback[feature]=callback;// the default is going to be the first feature.
        return this;
    }

    this.button = function(feature) {
        var sorter, the_label;
        if (arguments.length>1) {
            this.public_name[feature] = arguments[1];
        }

        if (arguments.length>2) {
            this.sorters[feature] = arguments[2];
        }

        this.feature_set[feature] = [];
        return this;
    }

    this.callback = function(callback) {
        this._callback = callback;
        return this;
    }

    this.display = function() {
        var callback = this._callback;
        var manual_callback = this.manual_callback;
        var manual_map = this.manual_map;

        var d,f, features, feat;
        features = Object.keys(this.feature_set);
        
        // build out this.feature_set with this.data
        for (var i=0; i < this._data.length; i++) {
            d = this._data[i];
            f = features.map(function(f) {return d[f]});
            for (var j=0;j<features.length;j++) {
                feat=features[j]; 
                if (this.feature_set[feat].indexOf(f[j])==-1)   this.feature_set[feat].push(f[j]);
            }
        }
        for (var feat in this.feature_set) {
            if (this.sorters.hasOwnProperty(feat)) {
                this.feature_set[feat].sort(this.sorters[feat]);
            }
        }

        $(this.target).empty();
        
        $(this.target).append("<div class='col-lg-12 segments text-center'></div>");
        var the_string = '';

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

            for (var i=0;i<features.length;i++) {
                if (features[i] != 'all' && features[i]!=undefined) { // strange bug with undefined being added to manual buttons.
                    $(this.target + ' div.' + this._strip_punctuation(feature) + '-btns ul.dropdown-menu').append(
                    '<li><a href="#" data-feature="' + this._strip_punctuation(feature) + '" data-key="' + features[i] + '">' 
                        + features[i] + '</a></li>'
                    ); 
                }
            }

            $('.' + this._strip_punctuation(feature) + '-btns .dropdown-menu li a').on('click', function() {
                var k = $(this).data('key'); 
                var feature = $(this).data('feature');
                var manual_feature;
                $('.' + this._strip_punctuation(feature) + '-btns button.btn span.title').html(k);
                if (!manual_map.hasOwnProperty(feature)) {
                    callback(feature, k);    
                } else {
                    manual_feature = manual_map[feature];
                    manual_callback[manual_feature](k);
                }
                
                return false;
            })
        }

        return this;
    }

    return this
}

charts.line = function(args) {
    'use strict';
    this.args = args;

    this.init = function(args) {
        raw_data_transformation(args);
        process_line(args);
        init(args);
        x_axis(args);
        y_axis(args);
        return this;
    }

    this.mainPlot = function() {
        var svg = d3.select($(args.target).find('svg').get(0));
        var g;
        var data_median = 0;

        //main area
        var area = d3.svg.area()
            .x(args.scalefns.xf)
            .y0(args.scales.Y.range()[0])
            .y1(args.scalefns.yf)
            .interpolate(args.interpolate);

        //confidence band
        var confidence_area;
        if(args.show_confidence_band) {
            var confidence_area = d3.svg.area()
                .x(args.scalefns.xf)
                .y0(function(d) {
                    var l = args.show_confidence_band[0];
                    return args.scales.Y(d[l]);
                })
                .y1(function(d) {
                    var u = args.show_confidence_band[1];
                    return args.scales.Y(d[u]);
                })
                .interpolate(args.interpolate);
        }

        //main line
        var line = d3.svg.line()
            .x(args.scalefns.xf)
            .y(args.scalefns.yf)
            .interpolate(args.interpolate);

        //for animating line on first load
        var flat_line = d3.svg.line()
            .x(args.scalefns.xf)
            .y(function() { return args.scales.Y(data_median); })
            .interpolate(args.interpolate);


        //for building the optional legend
        var legend = '';
        var this_data;

        for(var i=args.data.length-1; i>=0; i--) {
            this_data = args.data[i];

            //override increment if we have a custom increment series
            var line_id = i+1;
            if(args.custom_line_color_map.length > 0) {
                line_id = args.custom_line_color_map[i];
            }

            //add confidence band
            if(args.show_confidence_band) {
                svg.append('path')
                    .attr('class', 'confidence-band')
                    .attr('d', confidence_area(args.data[i]));
            }

            //add the area
            var $area = $(args.target).find('svg path.area' + (line_id) + '-color');
            if(args.area && !args.use_data_y_min && !args.y_axis_negative && args.data.length <= 1) {
                //if area already exists, transition it
                if($area.length > 0) {
                    d3.selectAll($(args.target).find('svg path.area' + (line_id) + '-color'))
                        .transition()
                            .duration(function() {
                                return (args.transition_on_update) ? 1000 : 0;
                            })
                            .attr('d', area(args.data[i]));
                }
                else { //otherwise, add the area
                    svg.append('path')
                        .attr('class', 'main-area ' + 'area' + (line_id) + '-color')
                        .attr('d', area(args.data[i]));
                }
            } else if ($area.length > 0) {
              $area.remove();
            }

            //add the line, if it already exists, transition the fine gentleman
            if($(args.target).find('svg path.line' + (line_id) + '-color').length > 0) {
                d3.selectAll($(args.target).find('svg path.line' + (line_id) + '-color'))
                    .transition()
                        .duration(function() {
                            return (args.transition_on_update) ? 1000 : 0;
                        })
                        .attr('d', line(args.data[i]));
            }
            else { //otherwise...
                //if we're animating on load, animate the line from its median value
                if(args.animate_on_load) {
                    data_median = d3.median(args.data[i], function(d) {
                        return d[args.y_accessor];
                    })

                    svg.append('path')
                        .attr('class', 'main-line ' + 'line' + (line_id) + '-color')
                        .attr('d', flat_line(args.data[i]))
                        .transition()
                            .duration(1000)
                            .attr('d', line(args.data[i]));
                }
                else { //or just add the line
                    svg.append('path')
                        .attr('class', 'main-line ' + 'line' + (line_id) + '-color')
                        .attr('d', line(args.data[i]));
                }
            }

            //build legend
            if(args.legend) {
                legend = "<span class='line" + line_id  + "-legend-color'>&mdash; "
                        + args.legend[i] + "&nbsp; </span>" + legend;
            }
        }

        if(args.legend) {
            $(args.legend_target).html(legend);
        }

        return this;
    }

    this.markers = function() {
        markers(args);
        return this;
    };

    this.rollover = function() {
        var svg = d3.select($(args.target).find('svg').get(0));
        var $svg = $($(args.target).find('svg').get(0));
        var g;

        //remove the old rollovers if they already exist
        $svg.find('.transparent-rollover-rect').remove();
        $svg.find('.voronoi').remove();

        //remove the old rollover text and circle if they already exist
        $svg.find('.active_datapoint').remove();
        $svg.find('.line_rollover_circle').remove();

        //rollover text
        svg.append('text')
            .attr('class', 'active_datapoint')
            .classed('active-datapoint-small', args.use_small_class)
            .attr('xml:space', 'preserve')
            .attr('x', args.width - args.right)
            .attr('y', args.top / 2)
            .attr('text-anchor', 'end');

        //append circle
        svg.append('circle')
            .classed('line_rollover_circle', true)
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 0);

        //update our data by setting a unique line id for each series
        //increment from 1... unless we have a custom increment series
        var line_id = 1;

        for(var i=0;i<args.data.length;i++) {
            for(var j=0;j<args.data[i].length;j++) {
                //if custom line-color map is set, use that instead of line_id
                if(args.custom_line_color_map.length > 0) {
                    args.data[i][j]['line_id'] = args.custom_line_color_map[i];
                }
                else {
                    args.data[i][j]['line_id'] = line_id;
                }
            }
            line_id++;
        }

        //for multi-line, use voronoi
        if(args.data.length > 1) {
            //main rollover
            var voronoi = d3.geom.voronoi()
                .x(function(d) { return args.scales.X(d[args.x_accessor]).toFixed(2); })
                .y(function(d) { return args.scales.Y(d[args.y_accessor]).toFixed(2); })
                .clipExtent([[args.buffer, args.buffer], [args.width - args.buffer, args.height - args.buffer]]);

            var g = svg.append('g')
                .attr('class', 'voronoi')

            //we'll be using these when constructing the voronoi rollovers
            var data_nested = d3.nest()
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
                        .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
                        .datum(function(d) { return d.point; }) //because of d3.nest, reassign d
                        .attr('class', function(d) {
                            if(args.linked) {
                                var v = d[args.x_accessor];
                                var formatter = d3.time.format('%Y-%m-%d');

                                //only format when x-axis is date
                                var id = (typeof v === 'number')
                                        ? i
                                        : formatter(v);

                                return 'line' + d['line_id'] + '-color ' + 'roll_' + id;
                            }
                            else {
                                return 'line' + d['line_id'] + '-color';
                            }
                        })
                        .on('mouseover', this.rolloverOn(args))
                        .on('mouseout', this.rolloverOff(args));
        }
        //for single line, use rects
        else {
            //set to 1 unless we have a custom increment series
            var line_id = 1;
            if(args.custom_line_color_map.length > 0) {
                line_id = args.custom_line_color_map[0];
            }

            var g = svg.append('g')
                .attr('class', 'transparent-rollover-rect')

            var xf = args.data[0].map(args.scalefns.xf);

            g.selectAll('.rollover-rects')
                .data(args.data[0]).enter()
                    .append('rect')
                        .attr('class', function(d, i) {
                            if(args.linked) {
                                var v = d[args.x_accessor];
                                var formatter = d3.time.format('%Y-%m-%d');

                                //only format when x-axis is date
                                var id = (typeof v === 'number')
                                        ? i
                                        : formatter(v);

                                return 'line' + line_id + '-color ' + 'roll_' + id;
                            }
                            else {
                                return 'line' + line_id + '-color';
                            }
                        })
                        .attr('x', function(d, i) {
                            if (i == 0) {
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
                            if (i == 0) {
                                return ((xf[i+1] - xf[i]) / 2).toFixed(2);
                            }
                            else if (i == xf.length - 1) {
                                return ((xf[i] - xf[i-1]) / 2).toFixed(2);
                            }
                            else {
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
                        .on('mouseout', this.rolloverOff(args));
        }

        return this;
    }

    this.rolloverOn = function(args) {
        var svg = d3.select($(args.target).find('svg').get(0));
        var x_formatter = d3.time.format('%Y-%m-%d');

        return function(d, i) {
            //show circle on mouse-overed rect
            svg.selectAll('circle.line_rollover_circle')
                .attr('class', "")
                .attr('class', 'area' + d['line_id'] + '-color')
                .classed('line_rollover_circle', true)
                .attr('cx', function() {
                    return args.scales.X(d[args.x_accessor]).toFixed(2);
                })
                .attr('cy', function() {
                    return args.scales.Y(d[args.y_accessor]).toFixed(2);
                })
                .attr('r', args.point_size)
                .style('opacity', 1);

            //trigger mouseover on all rects for this date in .linked charts
            if(args.linked && !globals.link) {
                globals.link = true;

                var v = d[args.x_accessor];
                var formatter = d3.time.format('%Y-%m-%d');

                //only format when y-axis is date
                var id = (typeof v === 'number')
                        ? i
                        : formatter(v);

                //trigger mouseover on matching line in .linked charts
                d3.selectAll('.line' + d['line_id'] + '-color.roll_' + id)
                    .each(function(d, i) {
                        d3.select(this).on('mouseover')(d,i);
                })
            }

            svg.selectAll('text')
                .filter(function(g, j) {
                    return d == g;
                })
                .attr('opacity', 0.3);

            var fmt = d3.time.format('%b %e, %Y');

            if (args.format == 'count') {
                var num = function(d_) {
                    var is_float = d_ % 1 != 0;
                    var n = d3.format("0,000");
                    d_ = is_float ? d3.round(d_, args.decimals) : d_;
                    return n(d_);
                }
            }
            else {
                var num = function(d_) {
                    var fmt_string = (args.decimals ? '.' + args.decimals : '' ) + '%';
                    var n = d3.format(fmt_string);
                    return n(d_);
                }
            }

            //update rollover text
            if (args.show_rollover_text) {
                svg.select('.active_datapoint')
                    .text(function() {
                        if(args.time_series) {
                            var dd = new Date(+d[args.x_accessor]);
                            dd.setDate(dd.getDate());

                            return fmt(dd) + '  ' + args.yax_units
                                + num(d[args.y_accessor]);
                        }
                        else {
                            return args.x_accessor + ': ' + d[args.x_accessor]
                                + ', ' + args.y_accessor + ': ' + args.yax_units
                                + num(d[args.y_accessor]);
                        }
                    });
            }

            if(args.rollover_callback) {
                args.rollover_callback(d, i);
            }
        }
    }

    this.rolloverOff = function(args) {
        var svg = d3.select($(args.target).find('svg').get(0));

        return function(d, i) {
            if(args.linked && globals.link) {
                globals.link = false;

                var v = d[args.x_accessor];
                var formatter = d3.time.format('%Y-%m-%d');

                //only format when y-axis is date
                var id = (typeof v === 'number')
                        ? i
                        : formatter(v);

                d3.selectAll('.roll_' + id)
                    .each(function(d, i) {
                        d3.select(this).on('mouseout')(d);
                });
            }

            //remove active datapoint text on mouse out
            svg.selectAll('circle.line_rollover_circle')
                .style('opacity', 0);

            svg.select('.active_datapoint')
                .text('');
        }
    }

    this.init(args);
    return this;
}

charts.histogram = function(args) {
    'use strict';
    this.args = args;

    this.init = function(args) {
        raw_data_transformation(args);
        process_histogram(args);
        init(args);
        x_axis(args);
        y_axis(args);
        return this;
    }

    this.mainPlot = function() {
        var svg = d3.select($(args.target).find('svg').get(0));
        var $svg = $($(args.target).find('svg').get(0));

        var g;

        //remove the old histogram, add new one
        $svg.find('.histogram').remove();

        var g = svg.append("g")
            .attr("class", "histogram");

        var bar = g.selectAll(".bar")
            .data(args.data[0])
                .enter().append("g")
                    .attr("class", "bar")
                    .attr("transform", function(d) {
                        return "translate(" + args.scales.X(d[args.x_accessor]).toFixed(2) 
                            + "," + args.scales.Y(d[args.y_accessor]).toFixed(2) + ")";
                        });

        //draw bars
        bar.append("rect")
            .attr("x", 1)
            .attr("width", function(d, i) {
                return (args.scalefns.xf(args.data[0][1])
                    - args.scalefns.xf(args.data[0][0])
                    - args.bar_margin).toFixed(2);
            })
            .attr("height", function(d) {
                if(d[args.y_accessor] == 0)
                    return 0;

                return (args.height - args.bottom - args.buffer 
                    - args.scales.Y(d[args.y_accessor])).toFixed(2);
            });

        return this;
    }

    this.markers = function() {
        markers(args);
        return this;
    };

    this.rollover = function() {
        var svg = d3.select($(args.target).find('svg').get(0));
        var $svg = $($(args.target).find('svg').get(0));
        var g;
        
        //remove the old rollovers if they already exist
        $svg.find('.transparent-rollover-rect').remove();
        $svg.find('.active_datapoint').remove();

        //rollover text
        svg.append('text')
            .attr('class', 'active_datapoint')
            .attr('xml:space', 'preserve')
            .attr('x', args.width - args.right)
            .attr('y', args.top / 2)
            .attr('text-anchor', 'end');

        var g = svg.append('g')
            .attr('class', 'transparent-rollover-rect')

        //draw rollover bars
        var bar = g.selectAll(".bar")
            .data(args.data[0])
                .enter().append("g")
                    .attr("class", "rollover-rects")
                    .attr("transform", function(d) {
                        return "translate(" + (args.scales.X(d[args.x_accessor])) + "," + 0 + ")";
                    });

        bar.append("rect")
            .attr("x", 1)
            .attr("y", 0)
            .attr("width", function(d, i) {
                if (i != args.data[0].length - 1) {
                    return (args.scalefns.xf(args.data[0][i + 1]) 
                        - args.scalefns.xf(d)).toFixed(2);
                }
                else {
                    return (args.scalefns.xf(args.data[0][1])
                        - args.scalefns.xf(args.data[0][0])).toFixed(2);
                }
            })
            .attr("height", function(d) {
                return args.height;
            })
            .attr('opacity', 0)
            .on('mouseover', this.rolloverOn(args))
            .on('mouseout', this.rolloverOff(args));
    }

    this.rolloverOn = function(args) {
        var svg = d3.select($(args.target).find('svg').get(0));
        var x_formatter = d3.time.format('%Y-%m-%d');

        return function(d, i) {
            svg.selectAll('text')
                .filter(function(g, j) {
                    return d == g;
                })
                .attr('opacity', 0.3);

            var fmt = d3.time.format('%b %e, %Y');
        
            if (args.format == 'count') {
                var num = function(d_) {
                    var is_float = d_ % 1 != 0;
                    var n = d3.format("0,000");
                    d_ = is_float ? d3.round(d_, args.decimals) : d_;
                    return n(d_);
                }
            }
            else {
                var num = function(d_) {
                    var fmt_string = (args.decimals ? '.' + args.decimals : '' ) + '%';
                    var n = d3.format(fmt_string);
                    return n(d_);
                }
            }

            //highlight active bar
            d3.selectAll($(args.target).find(' svg .bar :eq(' + i + ')'))
                .classed('active', true);

            //update rollover text
            if (args.show_rollover_text) {
                svg.select('.active_datapoint')
                    .text(function() {
                        if(args.time_series) {
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

            if(args.rollover_callback) {
                args.rollover_callback(d, i);
            }
        }
    }

    this.rolloverOff = function(args) {
        var svg = d3.select($(args.target).find('svg').get(0));

        return function(d, i) {
            //reset active bar
            d3.selectAll($(args.target).find('svg .bar :eq(' + i + ')'))
                .classed('active', false);
            
            //reset active data point text
            svg.select('.active_datapoint')
                .text('');
        }
    }

    this.init(args);
    return this;
}

charts.point = function(args) {
    'use strict';
    this.args = args;

    this.init = function(args) {
        raw_data_transformation(args);
        process_point(args);
        init(args);
        x_axis(args);
        y_axis(args);
        return this;
    }

    this.markers = function() {
        markers(args);
        if (args.least_squares) {
            add_ls(args);
        }

        return this
    }

    this.mainPlot = function() {
        var svg = d3.select($(args.target).find('svg').get(0));
        var $svg = $($(args.target).find('svg').get(0));
        var g;

        //remove the old points, add new one
        $svg.find('.points').remove();
        
        // plot the points, pretty straight-forward
        g = svg.append('g')
            .classed('points', true);

        var pts = g.selectAll('circle')
            .data(args.data[0])
            .enter().append('svg:circle')
                .attr('class', function(d, i) { return 'path-' + i; })
                .attr('cx', args.scalefns.xf)
                .attr('cy', args.scalefns.yf);

        //are we coloring our points, or just using the default color?
        if (args.color_accessor!=null) {
            pts.attr('fill',   args.scalefns.color);
            pts.attr('stroke', args.scalefns.color);
        }
        else {
            pts.classed('points-mono', true);
        }

        if (args.size_accessor != null) {
            pts.attr('r', args.scalefns.size);
        }
        else {
            pts.attr('r', args.point_size);
        }

        return this;
    }

    this.rollover = function() {
        var svg = d3.select($(args.target).find('svg').get(0));
        var $svg = $($(args.target).find('svg').get(0));

        //remove the old rollovers if they already exist
        $svg.find('.voronoi').remove();

        //remove the old rollover text and circle if they already exist
        $svg.find('.active_datapoint').remove();

        //add rollover text
        svg.append('text')
            .attr('class', 'active_datapoint')
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
            .attr('class', 'voronoi');

        paths.selectAll('path')
            .data(voronoi(args.data[0]))
            .enter().append('path')
                .attr('d', function(d) {
                    if(d == undefined) return; 
                    return 'M' + d.join(',') + 'Z';
                })
                .attr('class', function(d,i) { 
                    return 'path-' + i;
                })
                .style('fill-opacity', 0)
                .on('mouseover', this.rolloverOn(args))
                .on('mouseout', this.rolloverOff(args));

        return this;
    }

    this.rolloverOn = function(args) {
        var svg = d3.select($(args.target).find('svg').get(0));

        return function(d, i) {
            svg.selectAll('.points circle')
                .classed('selected', false);

            //highlight active point
            var pts = svg.selectAll('.points circle.path-' + i)
                .classed('selected', true);

            if (args.size_accessor) {
                pts.attr('r', function(di) {
                    return args.scalefns.size(di) + 1
                });
            } else {
                pts.attr('r', args.point_size);
            }

            //trigger mouseover on all points for this class name in .linked charts
            if(args.linked && !globals.link) {
                globals.link = true;

                //trigger mouseover on matching point in .linked charts
                d3.selectAll('.voronoi .path-' + i)
                    .each(function() {
                        d3.select(this).on('mouseover')(d,i);
                })
            }

            var fmt = d3.time.format('%b %e, %Y');
            if (args.format == 'count') {
                var num = function(d_) {
                    var is_float = d_ % 1 != 0;
                    var n = d3.format("0,000");
                    d_ = is_float ? d3.round(d_, args.decimals) : d_;
                    return n(d_);
                }
            }
            else {
                var num = function(d_) {
                    var fmt_string = (args.decimals ? '.' + args.decimals : '' ) + '%';
                    var n = d3.format(fmt_string);
                    return n(d_);
                }
            }

            //update rollover text
            if (args.show_rollover_text) {
                svg.select('.active_datapoint')
                    .text(function() {
                        if(args.time_series) {
                            var dd = new Date(+d['point'][args.x_accessor]);
                            dd.setDate(dd.getDate());
                            
                            return fmt(dd) + '  ' + args.yax_units 
                                + num(d['point'][args.y_accessor]);
                        }
                        else {
                            return args.x_accessor + ': ' + num(d['point'][args.x_accessor]) 
                                + ', ' + args.y_accessor + ': ' + args.yax_units 
                                + num(d['point'][args.y_accessor]);
                        }
                    });                
            }

            if(args.rollover_callback) {
                args.rollover_callback(d, i);
            }
        }
    }

    this.rolloverOff = function(args) {
        var svg = d3.select($(args.target).find('svg').get(0));

        return function(d,i) {
            if(args.linked && globals.link) {
                globals.link = false;

                d3.selectAll('.voronoi .path-' + i)
                    .each(function() {
                        d3.select(this).on('mouseout')(d,i);
                })
            }

            //reset active point
            var pts = svg.selectAll('.points circle')
                .classed('unselected', false)
                .classed('selected', false);

            if (args.size_accessor) {
                pts.attr('r', args.scalefns.size);
            }
            else {
                pts.attr('r', args.point_size);
            }

            //reset active data point text
            svg.select('.active_datapoint')
                .text('');
        }
    }

    this.update = function(args) {
        return this;
    }

    this.init(args);

    return this;
}

// BARCHART:
// x - function that processes data
//     - pass in a feature name, get a count
//     - have raw feature: value function
// - need a way of changing the y axis and x axis
// - need to sort out rollovers
charts.bar = function(args) {
    'use strict';
    this.args = args;

    this.init = function(args) {
        raw_data_transformation(args);
        process_categorical_variables(args);
        init(args);
        x_axis(args);
        y_axis_categorical(args);
        return this;
    }

    this.mainPlot = function() {
        var svg = d3.select($(args.target).find('svg').get(0));
        var $svg = $($(args.target).find('svg').get(0));
        var g;

        //remove the old barplot, add new one
        $svg.find('.barplot').remove();

        var data = args.data[0];

        var g = svg.append('g')
            .classed('barplot', true);

        var appropriate_height = args.scales.Y.rangeBand()/1.5;
        g.selectAll('.bar')
            .data(data).enter().append('rect')
            .classed('bar', true)
            .attr('x', args.scales.X(0))
            .attr('y', function(d){
                return args.scalefns.yf(d) + appropriate_height/2;
            })
            .attr('height', appropriate_height)
            .attr('width', function(d){ return args.scalefns.xf(d) - args.scales.X(0)});
        if (args.predictor_accessor){
            var pp=args.predictor_proportion;
            var pp0 = pp-1;
            // thick line  through bar;
            g.selectAll('.prediction')
                .data(data)
                .enter().append("rect")
                    .attr('class', 'bar-prediction')
                    .attr('x', args.scales.X(0))
                    .attr('y', function(d){
                        return args.scalefns.yf(d) + pp0*appropriate_height/(pp*2) + appropriate_height/2;
                    })
                    .attr('height', appropriate_height/pp)
                    .attr('width', function(d){
                        return args.scales.X(d[args.predictor_accessor]) - args.scales.X(0);
                    });
        }
        if (args.baseline_accessor){
            g.selectAll('.baseline')
                .data(data)
                .enter().append("line")
                    .attr('class', 'bar-baseline')
                    .attr('x1', function(d){return args.scales.X(d[args.baseline_accessor])})
                    .attr('x2', function(d){return args.scales.X(d[args.baseline_accessor])})
                    .attr('y1', function(d){
                        return args.scalefns.yf(d)+appropriate_height/2-appropriate_height/pp + appropriate_height/2;
                    })
                    .attr('y2', function(d){
                        return args.scalefns.yf(d)+appropriate_height/2+appropriate_height/pp + appropriate_height/2;
                    });
        }
        return this;
    }

    this.markers = function() {
        markers(args);
        return this;
    };

    this.rollover = function() {
        var svg = d3.select($(args.target).find('svg').get(0));
        var $svg = $($(args.target).find('svg').get(0));
        var g;

        //remove the old rollovers if they already exist
        $svg.find('.transparent-rollover-rect').remove();
        $svg.find('.active_datapoint').remove();

        //rollover text
        svg.append('text')
            .attr('class', 'active_datapoint')
            .attr('xml:space', 'preserve')
            .attr('x', args.width - args.right)
            .attr('y', args.top / 2)
            .attr('dy', '.35em')
            .attr('text-anchor', 'end');

        var g = svg.append('g')
            .attr('class', 'transparent-rollover-rect')

        //draw rollover bars
        var bar = g.selectAll(".bar")
            .data(args.data[0])
                .enter().append("rect")
                    .attr("x", args.scales.X(0))
                    .attr("y", args.scalefns.yf)
                    .attr('width', args.width)
                    .attr('height', args.scales.Y.rangeBand()+2)
                    .attr('opacity', 0)
                    .on('mouseover', this.rolloverOn(args))
                    .on('mouseout', this.rolloverOff(args));
    }

    this.rolloverOn = function(args) {
        var svg = d3.select($(args.target).find('svg').get(0));
        var x_formatter = d3.time.format('%Y-%m-%d');

        return function(d, i) {
            svg.selectAll('text')
                .filter(function(g, j) {
                    return d == g;
                })
                .attr('opacity', 0.3);

            var fmt = d3.time.format('%b %e, %Y');
        
            if (args.format == 'count') {
                var num = function(d_) {
                    var is_float = d_ % 1 != 0;
                    var n = d3.format("0,000");
                    d_ = is_float ? d3.round(d_, args.decimals) : d_;
                    return n(d_);
                }
            }
            else {
                var num = function(d_) {
                    var fmt_string = (args.decimals ? '.' + args.decimals : '' ) + '%';
                    var n = d3.format(fmt_string);
                    return n(d_);
                }
            }

            //highlight active bar
            d3.selectAll($(args.target + ' svg g.barplot .bar:eq(' + i + ')'))
                .classed('active', true);

            //update rollover text
            if (args.show_rollover_text) {
                svg.select('.active_datapoint')
                    .text(function() {
                        if(args.time_series) {
                            var dd = new Date(+d[args.x_accessor]);
                            dd.setDate(dd.getDate());
                            
                            return fmt(dd) + '  ' + args.yax_units 
                                + num(d[args.y_accessor]);
                        }
                        else {
                            return d[args.y_accessor] + ': ' + num(d[args.x_accessor]);
                        }
                    });                
            }

            if(args.rollover_callback) {
                args.rollover_callback(d, i);
            }
        }
    }

    this.rolloverOff = function(args) {
        var svg = d3.select($(args.target).find('svg').get(0));

        return function(d, i) {
            //reset active bar
            d3.selectAll($(args.target).find('svg g.barplot .bar:eq(' + i + ')'))
                .classed('active', false);
            
            //reset active data point text
            svg.select('.active_datapoint')
                .text('');
        }
    }

    this.init(args);
    return this;
}

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

function data_table(args){
	'use strict';
	this.args = args;
	this.args.standard_col = {width:150, font_size:12, font_weight:'normal'};
	this.args.columns = [];
	this.formatting_options = [['color', 'color'], ['font-weight', 'font_weight'], ['font-style', 'font_style'], ['font-size', 'font_size']];

	this._strip_punctuation = function(s){
        var punctuationless = s.replace(/[^a-zA-Z0-9 _]+/g, '');
        var finalString = punctuationless.replace(/ +?/g, "");
        return finalString;
    }

    this._format_element = function(element, value, args){
    	this.formatting_options.forEach(function(fo){
			var attr = fo[0];
			var key = fo[1];
			if (args[key]) element.style(attr, 
				typeof args[key] == 'string' || 
				typeof args[key] == 'number' ? 
					args[key] : args[key](value));
		});
    }

	this._add_column = function(_args, arg_type){
		var standard_column = this.args.standard_col;
		var args = merge_with_defaults(clone(_args), clone(standard_column));
		args.type=arg_type;
		this.args.columns.push(args);
	}

	this.target = function(){
		var target = arguments[0];
		this.args.target = target;
		return this;
	}

	this.title = function(){
		this._add_column(arguments[0], 'title');
		return this;
	}
	this.text = function(){
		this._add_column(arguments[0], 'text');
		return this;
	}
	this.bullet = function(){
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
	}
	this.sparkline = function(){

		return this;
	}
	this.number = function(){
		this._add_column(arguments[0], 'number');
		return this;
	}

	this.display = function(){

		var this_column;
		var args = this.args;

		chart_title(args);

		var target = args.target;
		var table = d3.select(target).append('table').classed('data-table', true);
		var colgroup = table.append('colgroup');
		var thead = table.append('thead');
		var tbody = table.append('tbody');

		var this_column, this_title;
		var tr, th, td_accessor, td_type, td_value, th_text, td_text, td;
		var col;

		tr = thead.append('tr');

		for (var h=0;h<args.columns.length;h++){
			var this_col = args.columns[h];
			td_type = this_col.type;
			th_text=this_col.label;
			th_text =th_text == undefined ? '' : th_text;
			th = tr.append('th')
				.style('width', this_col.width)
				.style('text-align', td_type=='title' ? 'left' : 'right')
				.text(th_text);
			if (this_col.description){
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
                 })
			}
		}

		for (var h=0;h<args.columns.length;h++){
			col = colgroup.append('col');
			if (args.columns[h].type=='number'){
				col.attr('align', 'char').attr('char', '.');
			}
		}

		for (var i=0;i<args.data.length;i++){
			tr = tbody.append('tr');
			for (var j=0;j<args.columns.length;j++){
				this_column = args.columns[j];
				td_accessor = this_column.accessor;
				td_value = td_text = args.data[i][td_accessor];
				td_type     = this_column.type;

				if (td_type=='number'){
					//td_text may need to be rounded.
					if (this_column.hasOwnProperty('round') && !this_column.hasOwnProperty('format')){
						// round according to the number value in this_column.round.
						//td_text = d3.round(td_text, this_column.round);
						td_text = d3.format('0,.'+this_column.round+'f')(td_text);
					}
					if (this_column.hasOwnProperty('value_formatter')){
						// provide a function that formats the text according to the function this_column.format.
						td_text = this_column.value_formatter(td_text);

					} if (this_column.hasOwnProperty('format')){
						// this is a shorthand for percentage formatting, and others if need be.
						// supported: 'percentage', 'count', 'temperature'
						
						if (this_column.round) td_text = d3.round(td_text, this_column.round);
						var this_format = this_column.format;
						var formatter;

						if (this_format=='percentage')  formatter = d3.format('%p');
						if (this_format=='count')       formatter = d3.format("0,000");
						if (this_format=='temperature') formatter = function(t){return t +'º'};
						
						td_text = formatter(td_text);

					} if (this_column.hasOwnProperty('currency')){
						// this is another shorthand for formatting according to a currency amount, which gets appended to front of number.
						td_text = this_column.currency + td_text;
					}
				}

				td = tr.append('td')
					.classed('table-' + td_type, true)
					.classed('table-' + td_type + '-' + this._strip_punctuation(td_accessor), true)
					.attr('data-value', td_value)
					.style('width', this_column.width)
					.style('text-align', td_type=='title' || td_type=='text' ? 'left' : 'right');

				this._format_element(td, td_value, this_column);

				if (td_type=='title'){
					this_title = td.append('div').text(td_text);
					this._format_element(this_title, td_text, this_column);
					if (args.columns[j].hasOwnProperty('secondary_accessor')){
						td.append('div')
							.text(args.data[i][args.columns[j].secondary_accessor])
							.classed("secondary-title", true)
					}
				} else {
					td.text(td_text);
				}
			}
		}

		return this;
	}

	return this;
}
charts.missing = function(args) {
    'use strict';
    this.args = args;

    this.init = function(args) {
        chart_title(args);

        // create svg if one doesn't exist
        d3.select(args.target).selectAll('svg').data([args])
          .enter().append('svg')
            .attr('width', args.width)
            .attr('height', args.height);

        // delete child elements
        d3.select(args.target).selectAll('svg *').remove()

        var svg = d3.select(args.target).select('svg')

        // add missing class
        svg.classed('missing', true);

        // do we need to clear the legend?
        if(args.legend_target)
            $(args.legend_target).html('');

        svg.append('rect')
            .attr('class', 'missing-pane')
            .attr('x', args.left)
            .attr('y', args.top)
            .attr('width', args.width - (args.left * 2))
            .attr('height', args.height - (args.top * 2));

        // add missing text
        svg.selectAll('.missing_text').data([args.missing_text])
          .enter().append('text')
            .attr('class', 'missing-text')
            .attr('x', args.width / 2)
            .attr('y', args.height / 2)
            .attr('dy', '.50em')
            .attr('text-anchor', 'middle')
            .text(args.missing_text)

        return this;
    }

    this.init(args);
    return this;
}

function raw_data_transformation(args){
    'use strict';
    //do we need to turn json data to 2d array?

    if(!$.isArray(args.data[0]))
        args.data = [args.data];
    //

    if ($.isArray(args.y_accessor)){
        args.data = args.data.map(function(_d){
            return args.y_accessor.map(function(ya){
                return _d.map(function(di){
                    di = clone(di);
                    if (di[ya]==undefined){
                        return undefined;
                    }
                    di['multiline_y_accessor'] = di[ya];
                    return di;
                }).filter(function(di){
                    return di != undefined;
                })
            })
        })[0];

        args.y_accessor = 'multiline_y_accessor';
    }

    //sort x-axis data
    if (args.chart_type == 'line'){
        for(var i=0; i<args.data.length; i++) {
            args.data[i].sort(function(a, b) {
                return a[args.x_accessor] - b[args.x_accessor];
            });
        }
    }

    return this
}

function process_line(args) {
    'use strict';
    //are we replacing missing y values with zeros?

    //do we have a time-series?
    var is_time_series = ($.type(args.data[0][0][args.x_accessor]) == 'date')
            ? true
            : false;

    if(args.missing_is_zero && args.chart_type == 'line' && is_time_series) {
        for(var i=0;i<args.data.length;i++) {
            var first = args.data[i][0];
            var last = args.data[i][args.data[i].length-1];
            //initialize our new array for storing the processed data
            var processed_data = [];

            //we'll be starting from the day after our first date
            var start_date = clone(first[args.x_accessor]).setDate(first[args.x_accessor].getDate() + 1);

            //if we've set a max_x, add data points up to there
            var from = (args.min_x) ? args.min_x : start_date;
            var upto = (args.max_x) ? args.max_x : last[args.x_accessor];
            for (var d = new Date(from); d <= upto; d.setDate(d.getDate() + 1)) {
                var o = {};
                d.setHours(0, 0, 0, 0);

                //add the first date item (judge me not, world)
                //we'll be starting from the day after our first date
                if(Date.parse(d) == Date.parse(new Date(start_date))) {
                    processed_data.push(clone(args.data[i][0]));
                }

                //check to see if we already have this date in our data object
                var existing_o = null;
                $.each(args.data[i], function(i, val) {
                    if(Date.parse(val.date) == Date.parse(new Date(d))) {
                        existing_o = val;

                        return false;
                    }
                })

                //if we don't have this date in our data object, add it and set it to zero
                if(!existing_o) {            
                    o[args.x_accessor] = new Date(d);
                    o[args.y_accessor] = 0;
                    processed_data.push(o);
                }
                //otherwise, use the existing object for that date
                else {
                    processed_data.push(existing_o);
                }
                
                //add the last data item
                if(Date.parse(d) == Date.parse(new Date(last[args.x_accessor]))) {
                    processed_data.push(last);
                }
            }

            //update our date object
            args.data[i] = processed_data;
        }
    }

    return this;
}

function process_histogram(args){
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
    if (args.binned==false){
        // use d3's built-in layout.histogram functionality to compute what you need.

        if (typeof(our_data[0]) == 'object'){
            // we are dealing with an array of objects. Extract the data value of interest.
            extracted_data = our_data
                .map(function(d){ 
                    return d[args.x_accessor];
                });
        } else if (typeof(our_data[0]) == 'number'){
            // we are dealing with a simple array of numbers. No extraction needed.
            extracted_data = our_data;
        } 
        else {
            console.log('TypeError: expected an array of numbers, found ' + typeof(our_data[0]));
            return;
        }

        var hist = d3.layout.histogram()
        if (args.bins){
            hist = hist.bins(args.bins);
        }
        args.processed_data = hist(extracted_data)
            .map(function(d){
                // extract only the data we need per data point.
                return {'x': d['x'], 'y':d['y'], 'dx': d['dx']};
            })
    } else {
        // here, we just need to reconstruct the array of objects
        // take the x accessor and y accessor.
        // pull the data as x and y. y is count.

        args.processed_data = our_data.map(function(d){
            return {'x': d[args.x_accessor], 'y': d[args.y_accessor]}
        });
        var this_pt;
        var next_pt;
        // we still need to compute the dx component for each data point
        for (var i=0; i < args.processed_data.length; i++){
            this_pt = args.processed_data[i];
            if (i == args.processed_data.length-1){
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

function process_categorical_variables(args){
    // For use with bar charts, etc.
    'use strict';
    var extracted_data, processed_data={}, pd=[];
    var our_data = args.data[0];
    args.categorical_variables = [];

    if (args.binned == false){
        if (typeof(our_data[0]) == 'object') {
            // we are dealing with an array of objects. Extract the data value of interest.
            extracted_data = our_data
                .map(function(d){ 
                    return d[args.y_accessor];
                });
        } else {
            extracted_data = our_data;
        }
        var this_dp;
        for (var i=0; i< extracted_data.length; i++){
            this_dp=extracted_data[i];
            if (args.categorical_variables.indexOf(this_dp) == -1) args.categorical_variables.push(this_dp)
            if (!processed_data.hasOwnProperty(this_dp)) processed_data[this_dp]=0;
            
            processed_data[this_dp]+=1;
        }
        processed_data = Object.keys(processed_data).map(function(d){
            var obj = {};
            obj[args.x_accessor] = processed_data[d];
            obj[args.y_accessor] = d;
            return obj;
        })
    } else {
        // nothing needs to really happen here.
        processed_data = our_data;
        args.categorical_variables = d3.set(processed_data.map(function(d){
            return d[args.y_accessor];
        })).values();
        args.categorical_variables.reverse();
    }
    args.data = [processed_data];
    return this;
}

function process_point(args){
    'use strict';
    var data = args.data[0];
    var x = data.map(function(d){return d[args.x_accessor]});
    var y = data.map(function(d){return d[args.y_accessor]});
    if (args.least_squares){
        args.ls_line = least_squares(x,y);    
    };
    
    //args.lowess_line = lowess_robust(x,y, .5, 100)
    return this;

}

function add_ls(args){
    var svg = d3.select($(args.target).find('svg').get(0));
    var data = args.data[0];
    //var min_x = d3.min(data, function(d){return d[args.x_accessor]});
    //var max_x = d3.max(data, function(d){return d[args.x_accessor]});
    var min_x = args.scales.X.ticks(args.xax_count)[0];
    var max_x = args.scales.X.ticks(args.xax_count)[args.scales.X.ticks(args.xax_count).length-1];
    
    svg.append('svg:line')
        .attr('x1', args.scales.X(min_x))
        .attr('x2', args.scales.X(max_x))
        .attr('y1', args.scales.Y(args.ls_line.fit(min_x)) )
        .attr('y2', args.scales.Y(args.ls_line.fit(max_x)) )
        .attr('class', 'least-squares-line')
}

function add_lowess(args){
    var svg = d3.select($(args.target).find('svg').get(0));
    var lowess = args.lowess_line;

    var line = d3.svg.line()
        .x(function(d){return args.scales.X(d.x)})
        .y(function(d){return args.scales.Y(d.y)})
            .interpolate(args.interpolate);

    svg.append('path')
        .attr('d', line(lowess))
        .attr('class', 'lowess-line')
}

function lowess_robust(x, y, alpha, inc){
    // Used http://www.unc.edu/courses/2007spring/biol/145/001/docs/lectures/Oct27.html
    // for the clear explanation of robust lowess.

    // calculate the the first pass.
    var _l;
    var r = [];
    var yhat = d3.mean(y);
    for (var i = 0; i < x.length; i += 1) {r.push(1)};
    _l = _calculate_lowess_fit(x,y,alpha, inc, r);
    var x_proto = _l.x;
    var y_proto = _l.y;

    // Now, take the fit, recalculate the weights, and re-run LOWESS using r*w instead of w.

    for (var i = 0; i < 100; i += 1){

        r = d3.zip(y_proto, y).map(function(yi){
        return Math.abs(yi[1] - yi[0])
        })

        var q = d3.quantile(r.sort(), .5)

        r = r.map(function(ri){
            return _bisquare_weight(ri / (6 * q))
        })

        _l = _calculate_lowess_fit(x,y,alpha,inc, r);
        x_proto = _l.x;
        y_proto = _l.y;
    }

    return d3.zip(x_proto, y_proto).map(function(d){
        var p = {};
        p.x = d[0];
        p.y = d[1];
        return p;
    });

}

function lowess(x, y, alpha, inc){
    var r = [];
    for (var i = 0; i < x.length; i += 1) {r.push(1)}
    var _l = _calculate_lowess_fit(x, y, alpha, inc, r);

}

function least_squares(x_, y_) {
    var x, y, xi, yi,
        _x  = 0,
        _y  = 0,
        _xy = 0,
        _xx = 0;

    var n = x_.length;
    if (x_[0] instanceof Date){
        x = x_.map(function(d){
            return d.getTime();
        });
    } else {
        x = x_;
    };

    if (y_[0] instanceof Date){
        y = y_.map(function(d){
            return d.getTime();
        });
    } else {
        y = y_;
    };

    var xhat = d3.mean(x);
    var yhat = d3.mean(y);
    var numerator = 0, denominator = 0;
    var xi, yi;
    for (var i=0; i < x.length; i++){
        xi = x[i];
        yi = y[i];
        numerator += (xi - xhat) * (yi - yhat);
        denominator += (xi - xhat) * (xi - xhat)
    }

    var beta = numerator / denominator;
    var x0 = yhat - beta * xhat;

    return {
        x0:x0, 
        beta:beta, 
        fit:function(x){
            return x0 + x * beta;
    }}
}

function _pow_weight(u, w){
    if (u >= 0 && u <= 1) {
        return Math.pow(1 - Math.pow(u,w), w)
    } else {
        return 0
    }
}

function _bisquare_weight(u){
    return _pow_weight(u, 2);
}

function _tricube_weight(u){
    return _pow_weight(u, 3);
}

function _neighborhood_width(x0, xis){
    return Array.max(xis.map(function(xi){
        return Math.abs(x0 - xi)
    }))
}

function _manhattan(x1,x2){
    return Math.abs(x1-x2)
}

function _weighted_means(wxy){
    var wsum = d3.sum(wxy.map(function(wxyi){return wxyi.w}));
    
    return {
        xbar:d3.sum(wxy.map(function(wxyi){
            return wxyi.w * wxyi.x
        })) / wsum,
        ybar:d3.sum(wxy.map(function(wxyi){
            return wxyi.w * wxyi.y
        })) / wsum
    }
}

function _weighted_beta(wxy, xbar, ybar){
    var num = d3.sum(wxy.map(function(wxyi){
        return Math.pow(wxyi.w, 2) * (wxyi.x - xbar) * (wxyi.y - ybar)
    }))
    var denom = d3.sum(wxy.map(function(wxyi){
        return Math.pow(wxyi.w, 2) * (Math.pow(wxyi.x - xbar), 2)
    }))
    return num / denom;
}

function _weighted_least_squares(wxy){

    var ybar, xbar, beta_i, x0;

    var _wm = _weighted_means(wxy);

    xbar = _wm.xbar;
    ybar = _wm.ybar;

    var beta = _weighted_beta(wxy, xbar, ybar)

    return {
        beta : beta,
        xbar : xbar,
        ybar : ybar,
        x0   : ybar - beta * xbar

    }
    return num / denom
}

function _calculate_lowess_fit(x, y, alpha, inc, residuals){
    // alpha - smoothing factor. 0 < alpha < 1/
    // 
    //
    var k = Math.floor(x.length * alpha);

    var sorted_x = x.slice();

    sorted_x.sort(function(a,b){
        if (a < b) {return -1}
        else if (a > b) {return 1}
        return 0
    });
    var x_max = d3.quantile(sorted_x, .98);
    var x_min = d3.quantile(sorted_x, .02); 

    var xy = d3.zip(x, y, residuals).sort();

    var size = Math.abs(x_max - x_min) / inc;

    var smallest = x_min// - size;
    var largest = x_max// + size;
    var x_proto = d3.range(smallest, largest, size);
    
    var xi_neighbors;
    var x_i, beta_i, x0_i, delta_i, xbar, ybar;

    // for each prototype, find its fit.
    var y_proto = [];

    for (var i = 0; i < x_proto.length; i += 1){

        x_i = x_proto[i]

        // get k closest neighbors.
        xi_neighbors = xy.map(function(xyi){
            return [
                Math.abs(xyi[0] - x_i), 
                xyi[0], 
                xyi[1],
                xyi[2]]
        }).sort().slice(0, k)

        // Get the largest distance in the neighbor set.
        delta_i = d3.max(xi_neighbors)[0]

        // Prepare the weights for mean calculation and WLS.

        xi_neighbors = xi_neighbors.map(function(wxy){
            return {
                w : _tricube_weight(wxy[0] / delta_i) * wxy[3], 
                x : wxy[1], 
                y  :wxy[2]
            }})
        
        // Find the weighted least squares, obviously.
        var _output = _weighted_least_squares(xi_neighbors)

        x0_i = _output.x0;
        beta_i = _output.beta;

        // 
        y_proto.push(x0_i + beta_i * x_i)
    }
    return {x:x_proto, y:y_proto};
}

//a set of helper functions, some that we've written, others that we've borrowed
function modify_time_period(data, past_n_days) {
    //splice time period
    var data_spliced = clone(data);
    if(past_n_days != '') {
        for(var i=0; i<data_spliced.length; i++) {
            var from = data_spliced[i].length - past_n_days;
            data_spliced[i].splice(0,from);
        }
    }

    return data_spliced;
}

function convert_dates(data, x_accessor, time_format) {
    time_format = (typeof time_format === "undefined") ? '%Y-%m-%d' : time_format;
    data = data.map(function(d) {
        var fff = d3.time.format(time_format);
        d[x_accessor] = fff.parse(d[x_accessor]);
        return d;
    });

    return data;
}

var each = function(obj, iterator, context) {
    // yanked out of underscore
    if (obj == null) return obj;
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
}

function merge_with_defaults(obj) {
    // taken from underscore
    each(Array.prototype.slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    })
    
    return obj;
}

function number_of_values(data, accessor, value) {
    var values = data.filter(function(d){
        return d[accessor] === value;
    })
    
    return values.length;
}

function has_values_below(data, accessor, value) {
    var values = data.filter(function(d){
        return d[accessor] <= value;
    })
    
    return values.length > 0;
}


function has_too_many_zeros(data, accessor, zero_count) {
    return number_of_values(data, accessor, 0) >= zero_count;
}

//deep copy
//http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    
    throw new Error("Unable to copy obj! Its type isn't supported.");
}

//give us the difference of two int arrays
//http://radu.cotescu.com/javascript-diff-function/
function arrDiff(a,b) {
    var seen = [], diff = [];
    for ( var i = 0; i < b.length; i++)
        seen[b[i]] = true;
    for ( var i = 0; i < a.length; i++)
        if (!seen[a[i]])
            diff.push(a[i]);
    return diff;
}

//call this to add a warning icon to a graph and log an error to the console
function error(args) {
    var error = '<i class="fa fa-x fa-exclamation-circle warning"></i>';
    console.log('ERROR : ', args.target, ' : ', args.error);
    
    $(args.target).find('.chart_title').append(error);
}

