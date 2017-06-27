/* ========================================================================
 * Bootstrap: drawer.js v1.0.6
 # Heavily based on collapse, but had to change the name to "fold" to 
 # avoid transition conflicts.
 * ========================================================================
*/


(function ($) {
  'use strict';

  // OFF CANVAS PUBLIC CLASS DEFINITION
  // ================================

  var Drawer = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Drawer.DEFAULTS, options)
    this.$trigger      = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndDrawerdClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Drawer.VERSION  = '3.3.2'

  Drawer.TRANSITION_DURATION = 350

  Drawer.DEFAULTS = {
    toggle: true,
    trigger: '[data-toggle="drawer"]'
  }

  Drawer.prototype.dimension = function () {
    var isRight = this.$element.hasClass('drawer-right')
    return isRight ? 'margin-right' : 'margin-left'
  }

  Drawer.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('open')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.drawer')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.drawer')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.drawer', null)
    }

    var dimension = this.dimension()

    this.$element
      .addClass('folding').css(dimension, 0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('folded')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('folding')
        .addClass('fold open').css(dimension, '')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.drawer')
    }

    if (!$.support.transition) {
        return complete.call(this)
    } else {
        this.transEventName = $.support.transition.end;
    }

    this.$element
      .one(this.transEventName, $.proxy(complete, this))
      .emulateTransitionEnd(Drawer.TRANSITION_DURATION).css(dimension, 0)
  }

  Drawer.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('open')) return

    var startEvent = $.Event('hide.bs.drawer')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      .addClass('folding')
      .removeClass('open')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('folded')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('folding')
        .addClass('fold')
        .trigger('hidden.bs.drawer')
    }

    if (!$.support.transition) {
        return complete.call(this)
    } else {
        this.transEventName = $.support.transition.end;
    }

    this.$element
      .css(dimension, '')
      .one(this.transEventName, $.proxy(complete, this))
      .emulateTransitionEnd(Drawer.TRANSITION_DURATION)
  }

  Drawer.prototype.toggle = function () {
    this[this.$element.hasClass('open') ? 'hide' : 'show']()
  }

  Drawer.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="drawer"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndDrawerdClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Drawer.prototype.addAriaAndDrawerdClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('open')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('folded', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // OFFCANVAS PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.drawer')
      var options = $.extend({}, Drawer.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') options.toggle = false
      if (!data) $this.data('bs.drawer', (data = new Drawer(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.fold

  $.fn.drawer             = Plugin
  $.fn.drawer.Constructor = Drawer


  // OFFCANVAS NO CONFLICT
  // ====================

  $.fn.drawer.noConflict = function () {
    $.fn.fold = old
    return this
  }


  // OFFCANVAS DATA-API
  // =================

  $(document).on('click.bs.drawer.data-api', '[data-toggle="drawer"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.drawer')
    var option  = data ? 'toggle' : $.extend({}, $this.data(), { trigger: this })

    Plugin.call($target, option)
  })

})(window.jQuery || {});
