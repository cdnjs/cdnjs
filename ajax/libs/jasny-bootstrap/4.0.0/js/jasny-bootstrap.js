/*!
 * Jasny Bootstrap v4.0.0 (http://jasny.github.io/bootstrap)
 * Copyright 2012-2019 Arnold Daniels
 * Licensed under  ()
 */

if (typeof jQuery === 'undefined') { throw new Error('Jasny Bootstrap\'s JavaScript requires jQuery') }

/* ========================================================================
 * Bootstrap: transition.js v4.0.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  if ($.support.transition !== undefined) return  // Prevent conflict with vanilla Bootstrap

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: offcanvas.js v4.0.0
 * http://jasny.github.io/bootstrap/javascript/#offcanvas
 * ========================================================================
 * Copyright 2013-2014 Arnold Daniels
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

+function ($) { "use strict"

  // OFFCANVAS PUBLIC CLASS DEFINITION
  // =================================
  var isIphone = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))
  var OffCanvas = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, OffCanvas.DEFAULTS, options)
    this.state    = null
    this.placement = null
    this.$calcClone = null

    this.calcClone()

    if (this.options.recalc) {
      $(window).on('resize', $.proxy(this.recalc, this))
    }

    if (this.options.autohide && !this.options.modal) {
      var eventName = (navigator.userAgent.match(/(iPad|iPhone)/i) === null) ? 'click' : 'touchstart'
      $(document).on('click touchstart', $.proxy(this.autohide, this))
    }

    // Backdrop is added to dropdown on it's open, if device is touchable (or desctop FF, https://github.com/twbs/bootstrap/issues/13748)
    // and dropdown is not inside .navbar-nav. So we remove it
    $(this.$element).on('shown.bs.dropdown', $.proxy(function(e) {
        $(this.$element).find('.dropdown .dropdown-backdrop').remove()
    }, this))

    if (typeof(this.options.disablescrolling) === "boolean") {
        this.options.disableScrolling = this.options.disablescrolling
        delete this.options.disablescrolling
    }

    if (this.options.toggle) this.toggle()
  }

  OffCanvas.DEFAULTS = {
    toggle: true,
    placement: 'auto',
    autohide: true,
    recalc: true,
    disableScrolling: true,
    modal: false,
    backdrop: false,
    exclude: null
  }

  OffCanvas.prototype.setWidth = function () {
    var size = this.$element.outerWidth()
    var max = $(window).width()
    max -= 68 //Minimum space between menu and screen edge

    this.$element.css('width', size > max ? max : size)
  }

  OffCanvas.prototype.offset = function () {
    switch (this.placement) {
      case 'left':
      case 'right':  return this.$element.outerWidth()
      case 'top':
      case 'bottom': return this.$element.outerHeight()
    }
  }

  OffCanvas.prototype.calcPlacement = function () {
    if (this.options.placement !== 'auto') {
        this.placement = this.options.placement
        return
    }

    if (!this.$element.hasClass('in')) {
      this.$element.css('visiblity', 'hidden !important').addClass('in')
    }

    var horizontal = $(window).width() / this.$element.outerWidth()
    var vertical = $(window).height() / this.$element.outerHeight()

    var element = this.$element
    function ab(a, b) {
      if (element.css(b) === 'auto') return a
      if (element.css(a) === 'auto') return b

      var size_a = parseInt(element.css(a), 10)
      var size_b = parseInt(element.css(b), 10)

      return size_a > size_b ? b : a
    }

    this.placement = horizontal > vertical ? ab('left', 'right') : ab('top', 'bottom')

    if (this.$element.css('visibility') === 'hidden !important') {
      this.$element.removeClass('in').css('visiblity', '')
    }
  }

  OffCanvas.prototype.opposite = function (placement) {
    switch (placement) {
      case 'top':    return 'bottom'
      case 'left':   return 'right'
      case 'bottom': return 'top'
      case 'right':  return 'left'
    }
  }

  OffCanvas.prototype.getCanvasElements = function() {
    // Return a set containing the canvas plus all fixed elements
    var canvas = this.options.canvas ? $(this.options.canvas) : this.$element

    var fixed_elements = canvas.find('*').filter(function() {
      return getComputedStyle(this).getPropertyValue('position') === 'fixed'
    }).not(this.options.exclude)

    return canvas.add(fixed_elements)
  }

  OffCanvas.prototype.slide = function (elements, offset, callback) {
    // Use jQuery animation if CSS transitions aren't supported
    if (!$.support.transition) {
      var anim = {}
      anim[this.placement] = "+=" + offset
      anim[this.opposite(this.placement)] = "-=" + offset

      return elements.animate(anim, 350, callback)
    }

    var placement = this.placement
    var opposite = this.opposite(placement)

    elements.each(function() {
      if ($(this).css(placement) !== 'auto') {
        $(this).css(placement, (parseInt($(this).css(placement), 10) || 0) + offset)
      }

      if ($(this).css(opposite) !== 'auto') {
        $(this).css(opposite, (parseInt($(this).css(opposite), 10) || 0) - offset)
      }
    })

    this.$element
      .one($.support.transition.end, callback)
      .emulateTransitionEnd(350)
  }

  OffCanvas.prototype.disableScrolling = function() {
    var bodyWidth = $('body').width()
    var prop = 'padding-right'

    if ($('body').data('offcanvas-style') === undefined) {
      $('body').data('offcanvas-style', $('body').attr('style') || '')
    }

    $('body').css('overflow', 'hidden')
    //Fix iPhone scrolling
    if (isIphone) {
      $('body').addClass('lockIphone')
    }

    if ($('body').width() > bodyWidth) {
      var padding = parseInt($('body').css(prop), 10) + $('body').width() - bodyWidth

      setTimeout(function() {
        $('body').css(prop, padding)
      }, 1)
    }
    //disable scrolling on mobiles (they ignore overflow:hidden)
    $('body').on('touchmove.bs', function(e) {
      if (!$(event.target).closest('.offcanvas').length)
        e.preventDefault()
    })
  }

  OffCanvas.prototype.enableScrolling = function() {
    $('body').off('touchmove.bs')
    $('body').removeClass('lockIphone')
  }

  OffCanvas.prototype.show = function () {
    if (this.state) return

    var startEvent = $.Event('show.bs.offcanvas')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    this.hideOthers($.proxy(function() {
      this.state = 'slide-in'
      this.$element.css('width', '')
      this.calcPlacement()
      this.setWidth()

      var elements = this.getCanvasElements()
      var placement = this.placement
      var opposite = this.opposite(placement)
      var offset = this.offset()

      if (elements.index(this.$element) !== -1) {
        $(this.$element).data('offcanvas-style', $(this.$element).attr('style') || '')
        this.$element.css(placement, -1 * offset)
        this.$element.css(placement) // Workaround: Need to get the CSS property for it to be applied before the next line of code
      }

      elements.addClass('canvas-sliding').each(function() {
        var $this = $(this)
        if ($this.data('offcanvas-style') === undefined) $this.data('offcanvas-style', $this.attr('style') || '')
        if ($this.css('position') === 'static' && !isIphone) $this.css('position', 'relative')
        if (($this.css(placement) === 'auto' || $this.css(placement) === '0px') &&
            ($this.css(opposite) === 'auto' || $this.css(opposite) === '0px')) {
          $this.css(placement, 0)
        }
      })

      if (this.options.disableScrolling) this.disableScrolling()
      if (this.options.modal || this.options.backdrop) this.toggleBackdrop()

      var complete = function () {
        if (this.state != 'slide-in') return

        this.state = 'slid'

        elements.removeClass('canvas-sliding').addClass('canvas-slid')
        this.$element.trigger('shown.bs.offcanvas')
      }

      setTimeout($.proxy(function() {
        this.$element.addClass('in')
        this.slide(elements, offset, $.proxy(complete, this))
      }, this), 1)
    }, this))
  }

  //Hide other opened offcanvas menus, and then open this one
  OffCanvas.prototype.hideOthers = function (callback) {
    var doHide = false
    var id = this.$element.attr('id')
    var $clones = $('.offcanvas-clone:not([data-id="' + id + '"])')

    if (!$clones.length) return callback()

    $clones.each(function(index, clone) {
      var id = $(clone).attr('data-id')
      var $menu = $('#' + id)
      doHide = $menu.hasClass('canvas-slid')

      if (!doHide) return

      $menu.one('hidden.bs.offcanvas', callback)
      $menu.offcanvas('hide')
    })

    if (!doHide) callback()
  }

  OffCanvas.prototype.hide = function () {
    if (this.state !== 'slid') return

    var startEvent = $.Event('hide.bs.offcanvas')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    this.state = 'slide-out'

    var elements = $('.canvas-slid')
    var placement = this.placement
    var offset = -1 * this.offset()

    var complete = function () {
      if (this.state != 'slide-out') return

      this.state = null
      this.placement = null

      this.$element.removeClass('in')

      elements.removeClass('canvas-sliding')
      elements.add(this.$element).add('body').each(function() {
        $(this).attr('style', $(this).data('offcanvas-style')).removeData('offcanvas-style')
      })

      this.$element.css('width', '')
      this.$element.trigger('hidden.bs.offcanvas')
    }

    if (this.options.disableScrolling) this.enableScrolling()
    if (this.options.modal || this.options.backdrop) this.toggleBackdrop()

    elements.removeClass('canvas-slid').addClass('canvas-sliding')

    setTimeout($.proxy(function() {
      this.slide(elements, offset, $.proxy(complete, this))
    }, this), 1)
  }

  OffCanvas.prototype.toggle = function () {
    if (this.state === 'slide-in' || this.state === 'slide-out') return
    this[this.state === 'slid' ? 'hide' : 'show']()
  }

  OffCanvas.prototype.toggleBackdrop = function (callback) {
    callback = callback || $.noop
    var time = 150

    if (this.state == 'slide-in') {
      var $body = $('body')
      var doAnimate = $.support.transition

      this.$backdrop = $('<div class="modal-backdrop fade" />')
      if (this.options.backdrop) {
        this.$backdrop.addClass('allow-navbar')

        if (this.options.canvas && $(this.options.canvas)[0] !== $body[0]) {
          $(this.options.canvas).addClass('limit-backdrop')
          this.$backdrop.appendTo(this.options.canvas)
        } else {
          this.$backdrop.insertAfter(this.$element)
        }
      } else {
        this.$backdrop.insertAfter(this.$element)
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      $body.addClass('modal-open')
      this.$backdrop.addClass('show').show()
      this.$backdrop.on('click.bs', $.proxy(this.autohide, this))

      doAnimate ?
        this.$backdrop
        .one($.support.transition.end, callback)
        .emulateTransitionEnd(time) :
        callback()
    } else if (this.state == 'slide-out' && this.$backdrop) {
      var self = this

      this.$backdrop.hide().removeClass('show')
      $('body').removeClass('modal-open').off('touchmove.bs')

      if ($.support.transition) {
        this.$backdrop
          .one($.support.transition.end, function() {
            self.$backdrop.remove()
            callback()
            self.$backdrop = null
          })
        .emulateTransitionEnd(time)
      } else {
        this.$backdrop.remove()
        this.$backdrop = null
        callback()
      }

      if (this.options.canvas && $(this.options.canvas)[0] !== $('body')[0]) {
        var canvas = this.options.canvas
        setTimeout(function() {
          $(canvas).removeClass('limit-backdrop')
        }, time)
      }
    } else if (callback) {
      callback()
    }
  }

  OffCanvas.prototype.calcClone = function() {
    var id = this.$element.attr('id')
    this.$calcClone = $('.offcanvas-clone[data-id="' + id + '"]')

    if (!this.$calcClone.length) {
      this.$calcClone = this.$element.clone()
        .addClass('offcanvas-clone')
        .attr('data-id', id)
        .removeAttr('id')
        .appendTo($('body'))
        .html('')
    }

    this.$calcClone.removeClass('in')
  }

  OffCanvas.prototype.recalc = function () {
    if (this.$calcClone.css('display') === 'none' || (this.state !== 'slid' && this.state !== 'slide-in')) return

    this.state = null
    this.placement = null
    var elements = this.getCanvasElements()

    this.$element.trigger('hide.bs.offcanvas')
    this.$element.removeClass('in')

    elements.removeClass('canvas-slid')
    elements.add(this.$element).add('body').each(function() {
      $(this).attr('style', $(this).data('offcanvas-style')).removeData('offcanvas-style')
    })

    this.$element.trigger('hidden.bs.offcanvas')
  }

  OffCanvas.prototype.autohide = function (e) {
    var $target = $(e.target)
    var doHide = !$target.hasClass('dropdown-backdrop') && $target.closest(this.$element).length === 0

    if (doHide) this.hide()
  }

  // OFFCANVAS PLUGIN DEFINITION
  // ==========================

  var old = $.fn.offcanvas

  $.fn.offcanvas = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.offcanvas')
      var options = $.extend({}, OffCanvas.DEFAULTS, $this.data(), typeof option === 'object' && option)

      //In case if user does smth like $('.navmenu-fixed-left').offcanvas('hide'),
      //thus selecting also menu clone (that can cause issues)
      if ($this.hasClass('offcanvas-clone')) return

      if (!data) $this.data('bs.offcanvas', (data = new OffCanvas(this, options)))
      if (typeof option === 'string') data[option]()
    })
  }

  $.fn.offcanvas.Constructor = OffCanvas


  // OFFCANVAS NO CONFLICT
  // ====================

  $.fn.offcanvas.noConflict = function () {
    $.fn.offcanvas = old
    return this
  }


  // OFFCANVAS DATA-API
  // =================

  $(document).on('click.bs.offcanvas.data-api', '[data-toggle=offcanvas]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $canvas = $(target)
    var data    = $canvas.data('bs.offcanvas')
    var option = data ? 'toggle' : $.extend($this.data(), $canvas.data())

    e.preventDefault()
    e.stopPropagation()

    if (data) data.toggle()
      else $canvas.offcanvas(option)
  })

}(window.jQuery)

/* ============================================================
 * Bootstrap: rowlink.js v4.0.0
 * http://jasny.github.io/bootstrap/javascript/#rowlink
 * ============================================================
 * Copyright 2012-2014 Arnold Daniels
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

+function ($) { "use strict";

  var Rowlink = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, Rowlink.DEFAULTS, options)

    this.$element.on('click.bs.rowlink mouseup.bs.rowlink', 'td:not(.rowlink-skip)', $.proxy(this.click, this))
  }

  Rowlink.DEFAULTS = {
    target: "a"
  }

  Rowlink.prototype.click = function(e, ctrlKey) {
    var target = $(e.currentTarget).closest('tr').find(this.options.target)[0]

    if (typeof target === 'undefined' || $(e.target)[0] === target) return
    if (e.type === 'mouseup' && e.which !== 2) return

    e.preventDefault();
    ctrlKey = ctrlKey || e.ctrlKey || (e.type === 'mouseup' && e.which === 2)

    if (!ctrlKey && target.click) {
      target.click()
    } else if (document.createEvent) {
      var evt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
          ctrlKey: ctrlKey
       });
      target.dispatchEvent(evt);
    }
  }


  // ROWLINK PLUGIN DEFINITION
  // ===========================

  var old = $.fn.rowlink

  $.fn.rowlink = function (options) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.rowlink')
      if (!data) $this.data('bs.rowlink', (data = new Rowlink(this, options)))
    })
  }

  $.fn.rowlink.Constructor = Rowlink


  // ROWLINK NO CONFLICT
  // ====================

  $.fn.rowlink.noConflict = function () {
    $.fn.rowlink = old
    return this
  }


  // ROWLINK DATA-API
  // ==================

  $(document).on('click.bs.rowlink.data-api mouseup.bs.rowlink.data-api', '[data-link="row"]', function (e) {
    if (e.type === 'mouseup' && e.which !== 2) return
    if ($(e.target).closest('.rowlink-skip').length !== 0) return

    var $this = $(this)
    if ($this.data('bs.rowlink')) return
    $this.rowlink($this.data())

    var ctrlKey = e.ctrlKey || e.which === 2
    $(e.target).trigger('click.bs.rowlink', [ctrlKey])
  })

}(window.jQuery);

/* ===========================================================
 * Bootstrap: fileinput.js v4.0.0
 * http://jasny.github.com/bootstrap/javascript/#fileinput
 * ===========================================================
 * Copyright 2012-2014 Arnold Daniels
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) { "use strict";

  var isIE = window.navigator.appName == 'Microsoft Internet Explorer'

  // FILEUPLOAD PUBLIC CLASS DEFINITION
  // =================================

  var Fileinput = function (element, options) {
    this.$element = $(element)

    this.options = $.extend({}, Fileinput.DEFAULTS, options)
    this.$input = this.$element.find(':file')
    if (this.$input.length === 0) return

    this.name = this.$input.attr('name') || options.name

    this.$hidden = this.$element.find('input[type=hidden][name="' + this.name + '"]')
    if (this.$hidden.length === 0) {
      this.$hidden = $('<input type="hidden">').insertBefore(this.$input)
    }

    this.$preview = this.$element.find('.fileinput-preview')
    var height = this.$preview.css('height')
    if (this.$preview.css('display') !== 'inline' && height !== '0px' && height !== 'none') {
      this.$preview.css('line-height', height)
    }

    this.original = {
      exists: this.$element.hasClass('fileinput-exists'),
      preview: this.$preview.html(),
      hiddenVal: this.$hidden.val()
    }

    this.listen()
    this.reset()
  }

  Fileinput.DEFAULTS = {
    clearName: true
  }

  Fileinput.prototype.listen = function() {
    this.$input.on('change.bs.fileinput', $.proxy(this.change, this))
    $(this.$input[0].form).on('reset.bs.fileinput', $.proxy(this.reset, this))

    this.$element.find('[data-trigger="fileinput"]').on('click.bs.fileinput', $.proxy(this.trigger, this))
    this.$element.find('[data-dismiss="fileinput"]').on('click.bs.fileinput', $.proxy(this.clear, this))
  },

  Fileinput.prototype.verifySizes = function(files) {
    if (typeof this.options.maxSize === 'undefined') return true

    var max = parseFloat(this.options.maxSize)
    if (max !== this.options.maxSize) return true

    for (var i = 0; i < files.length; i++) {
      var size = typeof files[i].size !== 'undefined' ? files[i].size : null
      if (size === null) continue

      size = size / 1000 / 1000 /* convert from bytes to MB */
      if (size > max) return false
    }

    return true
  }

  Fileinput.prototype.change = function(e) {
    var files = e.target.files === undefined ? (e.target && e.target.value ? [{ name: e.target.value.replace(/^.+\\/, '')}] : []) : e.target.files

    e.stopPropagation()

    if (files.length === 0) {
      this.clear()
      this.$element.trigger('clear.bs.fileinput')
      return
    }

    if (!this.verifySizes(files)) {
      this.$element.trigger('max_size.bs.fileinput')

      this.clear()
      this.$element.trigger('clear.bs.fileinput')
      return
    }

    this.$hidden.val('')
    this.$hidden.attr('name', '')
    this.$input.attr('name', this.name)

    var file = files[0]

    if (this.$preview.length > 0 && (typeof file.type !== "undefined" ? file.type.match(/^image\/(gif|png|jpeg|svg\+xml)$/) : file.name.match(/\.(gif|png|jpe?g|svg)$/i)) && typeof FileReader !== "undefined") {
      var Fileinput = this
      var reader = new FileReader()
      var preview = this.$preview
      var element = this.$element

      reader.onload = function(re) {
        var $img = $('<img>')
        $img[0].src = re.target.result
        files[0].result = re.target.result

        element.find('.fileinput-filename').text(file.name)

        // if parent has max-height, using `(max-)height: 100%` on child doesn't take padding and border into account
        if (preview.css('max-height') != 'none') {
          var mh = parseInt(preview.css('max-height'), 10) || 0
          var pt = parseInt(preview.css('padding-top'), 10) || 0
          var pb = parseInt(preview.css('padding-bottom'), 10) || 0
          var bt = parseInt(preview.css('border-top'), 10) || 0
          var bb = parseInt(preview.css('border-bottom'), 10) || 0

          $img.css('max-height', mh - pt - pb - bt - bb)
        }

        preview.html($img)
        if (Fileinput.options.exif) {
          //Fix image tranformation if this is possible
          Fileinput.setImageTransform($img, file);
        }
        element.addClass('fileinput-exists').removeClass('fileinput-new')

        element.trigger('change.bs.fileinput', files)
      }

      reader.readAsDataURL(file)
    } else {
      var text = file.name
      var $nameView = this.$element.find('.fileinput-filename')

      if (files.length > 1) {
        text = $.map(files, function(file) {
          return file.name;
        }).join(', ')
      }

      $nameView.text(text)
      this.$preview.text(file.name)
      this.$element.addClass('fileinput-exists').removeClass('fileinput-new')
      this.$element.trigger('change.bs.fileinput')
    }
  },

  Fileinput.prototype.setImageTransform = function($img, file) {
      var Fileinput = this;
      var reader = new FileReader();
      reader.onload = function(me) {
        var transform = false;
        var view = new DataView(reader.result);
        var exif = Fileinput.getImageExif(view);
        if (exif) {
            Fileinput.resetOrientation($img, exif);
        }
      }

      reader.readAsArrayBuffer(file);
  }

  Fileinput.prototype.getImageExif = function(view) {
    if (view.getUint16(0, false) != 0xFFD8) {
      return -2;
    }
    var length = view.byteLength, offset = 2;
    while (offset < length) {
      var marker = view.getUint16(offset, false);
          offset += 2;
      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966) {
          return -1;
        }
        var little = view.getUint16(offset += 6, false) == 0x4949;
            offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
            offset += 2;
        for (var i = 0; i < tags; i++)   {
          if (view.getUint16(offset + (i * 12), little) == 0x0112) {
            return view.getUint16(offset + (i * 12) + 8, little);
          }
        }
      }
      else if ((marker & 0xFF00) != 0xFF00){
         break;
      } else {
        offset += view.getUint16(offset, false);
      }
    }

    return -1;
  }

  Fileinput.prototype.resetOrientation = function($img, transform) {
  var img = new Image();

  img.onload = function() {
    var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");

    // set proper canvas dimensions before transform & export
    if ([5,6,7,8].indexOf(transform) > -1) {
      canvas.width = height;
      canvas.height = width;
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    // transform context before drawing image
    switch (transform) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height , width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: ctx.transform(1, 0, 0, 1, 0, 0);
    }

    // draw image
    ctx.drawImage(img, 0, 0);

    // export base64
    $img.attr('src', canvas.toDataURL());
  };

  img.src = $img.attr('src');
};

  Fileinput.prototype.clear = function(e) {
    if (e) e.preventDefault()

    this.$hidden.val('')
    this.$hidden.attr('name', this.name)
    if (this.options.clearName) this.$input.attr('name', '')

    //ie8+ doesn't support changing the value of input with type=file so clone instead
    if (isIE) {
      var inputClone = this.$input.clone(true);
      this.$input.after(inputClone);
      this.$input.remove();
      this.$input = inputClone;
    } else {
      this.$input.val('')
    }

    this.$preview.html('')
    this.$element.find('.fileinput-filename').text('')
    this.$element.addClass('fileinput-new').removeClass('fileinput-exists')

    if (e !== undefined) {
      this.$input.trigger('change')
      this.$element.trigger('clear.bs.fileinput')
    }
  },

  Fileinput.prototype.reset = function() {
    this.clear()

    this.$hidden.val(this.original.hiddenVal)
    this.$preview.html(this.original.preview)
    this.$element.find('.fileinput-filename').text('')

    if (this.original.exists) this.$element.addClass('fileinput-exists').removeClass('fileinput-new')
     else this.$element.addClass('fileinput-new').removeClass('fileinput-exists')

    this.$element.trigger('reseted.bs.fileinput')
  },

  Fileinput.prototype.trigger = function(e) {
    this.$input.trigger('click')
    e.preventDefault()
  }


  // FILEUPLOAD PLUGIN DEFINITION
  // ===========================

  var old = $.fn.fileinput

  $.fn.fileinput = function (options) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data('bs.fileinput')
      if (!data) $this.data('bs.fileinput', (data = new Fileinput(this, options)))
      if (typeof options == 'string') data[options]()
    })
  }

  $.fn.fileinput.Constructor = Fileinput


  // FILEINPUT NO CONFLICT
  // ====================

  $.fn.fileinput.noConflict = function () {
    $.fn.fileinput = old
    return this
  }


  // FILEUPLOAD DATA-API
  // ==================

  $(document).on('click.fileinput.data-api', '[data-provides="fileinput"]', function (e) {
    var $this = $(this)
    if ($this.data('bs.fileinput')) return
    $this.fileinput($this.data())

    var $target = $(e.target).closest('[data-dismiss="fileinput"],[data-trigger="fileinput"]');
    if ($target.length > 0) {
      e.preventDefault()
      $target.trigger('click.bs.fileinput')
    }
  })

}(window.jQuery);
