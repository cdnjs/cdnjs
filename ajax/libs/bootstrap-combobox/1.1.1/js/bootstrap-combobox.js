/* =============================================================
 * bootstrap-combobox.js v1.1.1
 * =============================================================
 * Copyright 2012 Daniel Farrell
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

!function( $ ) {

 "use strict";

  var Combobox = function ( element, options ) {
    this.options = $.extend({}, $.fn.combobox.defaults, options)
    this.$source = $(element)
    this.$container = this.setup()
    this.$element = this.$container.find('input[type=text]')
    this.$target = this.$container.find('input[type=hidden]')
    this.$button = this.$container.find('.dropdown-toggle')
    this.$menu = $(this.options.menu).appendTo('body')
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.shown = false
    this.selected = false
    this.refresh()
    this.transferAttributes()
    this.listen()
  }

  /* NOTE: COMBOBOX EXTENDS BOOTSTRAP-TYPEAHEAD.js
     ========================================== */

  Combobox.prototype = $.extend({}, $.fn.typeahead.Constructor.prototype, {

    constructor: Combobox

  , setup: function () {
      var combobox = $(this.options.template)
      this.$source.before(combobox)
      this.$source.hide()
      return combobox
    }

  , parse: function () {
      var that = this
        , map = {}
        , source = []
        , selected = false
      this.$source.find('option').each(function() {
        var option = $(this)
        if (option.val() === '') {
          that.options.placeholder = option.text()
          return
        }
        map[option.text()] = option.val()
        source.push(option.text())
        if(option.attr('selected')) selected = option.html()
      })
      this.map = map
      if (selected) {
        this.$element.val(selected)
        this.$container.addClass('combobox-selected')
        this.selected = true
      }
      return source
    }

  , transferAttributes: function() {
    this.options.placeholder = this.$source.attr('data-placeholder') || this.options.placeholder
    this.$element.attr('placeholder', this.options.placeholder)
    this.$target.prop('name', this.$source.prop('name'))
    this.$source.removeAttr('name')  // Remove from source otherwise form will pass parameter twice.
    this.$element.attr('required', this.$source.attr('required'))
    this.$element.attr('rel', this.$source.attr('rel'))
    this.$element.attr('title', this.$source.attr('title'))
    this.$element.attr('class', this.$source.attr('class'))
  }

  , toggle: function () {
    if (this.$container.hasClass('combobox-selected')) {
      this.clearTarget()
      this.triggerChange()
      this.clearElement()
    } else {
      if (this.shown) {
        this.hide()
      } else {
        this.clearElement()
        this.lookup()
      }
    }
  }

  , clearElement: function () {
    this.$element.val('').focus()
  }

  , clearTarget: function () {
    this.$source.val('')
    this.$target.val('')
    this.$container.removeClass('combobox-selected')
    this.selected = false
  }

  , triggerChange: function () {
    this.$source.trigger('change')
  }

  , refresh: function () {
    this.source = this.parse()
    this.options.items = this.source.length
  }

  // modified typeahead function adding container and target handling
  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element.val(this.updater(val)).trigger('change')
      this.$source.val(this.map[val]).trigger('change')
      this.$target.val(this.map[val]).trigger('change')
      this.$container.addClass('combobox-selected')
      this.selected = true
      return this.hide()
    }

  // modified typeahead function removing the blank handling and source function handling
  , lookup: function (event) {
      this.query = this.$element.val()
      return this.process(this.source)
    }

  // modified typeahead function adding button handling and remove mouseleave
  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))

      this.$button
        .on('click', $.proxy(this.toggle, this))
    }

  // modified typeahead function to clear on type and prevent on moving around
  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 39: // right arrow
        case 38: // up arrow
        case 37: // left arrow
        case 36: // home
        case 35: // end
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.clearTarget()
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  // modified typeahead function to force a match and add a delay on hide
  , blur: function (e) {
      var that = this
      this.focused = false
      var val = this.$element.val()
      if (!this.selected && val !== '' ) {
        this.$element.val('')
        this.$source.val('').trigger('change')
        this.$target.val('').trigger('change')
      }
      if (!this.mousedover && this.shown) setTimeout(function () { that.hide() }, 200)
    }

  // modified typeahead function to not hide
  , mouseleave: function (e) {
      this.mousedover = false
    }
  })

  /* COMBOBOX PLUGIN DEFINITION
   * =========================== */

  $.fn.combobox = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('combobox')
        , options = typeof option == 'object' && option
      if(!data) $this.data('combobox', (data = new Combobox(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.combobox.defaults = {
  template: '<div class="combobox-container"><input type="hidden" /><input type="text" autocomplete="off" /><span class="add-on btn dropdown-toggle" data-dropdown="dropdown"><span class="caret"/><span class="combobox-clear"><i class="icon-remove"/></span></span></div>'
  , menu: '<ul class="typeahead typeahead-long dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  }

  $.fn.combobox.Constructor = Combobox

}( window.jQuery );
