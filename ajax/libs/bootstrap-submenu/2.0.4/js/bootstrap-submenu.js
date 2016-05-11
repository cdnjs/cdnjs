/*!
 * Bootstrap-submenu v2.0.4 (https://vsn4ik.github.io/bootstrap-submenu/)
 * Copyright 2014-2016 Vasily A. (https://github.com/vsn4ik)
 * Licensed under the MIT license
 */

/**
 * $.inArray: friends with IE8. Use Array.prototype.indexOf in future.
 * $.proxy: friends with IE8. Use Function.prototype.bind in future.
 */

'use strict';

(function(factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  }
  else if (typeof exports == 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  }
  else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  function Item(element) {
    this.$element = $(element);
    this.$menu = this.$element.closest('.dropdown-menu');
    this.$main = this.$menu.parent();
    this.$items = this.$menu.children('.dropdown-submenu');

    this.init();
  }

  Item.prototype = {
    init: function() {
      this.$element.on('keydown', $.proxy(this, 'keydown'));
    },
    close: function() {
      this.$main.removeClass('open');
      this.$items.trigger('hide.bs.submenu');
    },
    keydown: function(event) {
      // 27: Esc

      if (event.keyCode == 27) {
        event.stopPropagation();

        this.close();
        this.$main.children('a, button').trigger('focus');
      }
    }
  };

  function SubmenuItem(element) {
    this.$element = $(element);
    this.$main = this.$element.parent();
    this.$menu = this.$main.children('.dropdown-menu');
    this.$subs = this.$main.siblings('.dropdown-submenu');
    this.$items = this.$menu.children('.dropdown-submenu');

    this.init();
  }

  $.extend(SubmenuItem.prototype, Item.prototype, {
    init: function() {
      this.$element.on({
        click: $.proxy(this, 'click'),
        keydown: $.proxy(this, 'keydown')
      });

      this.$main.on('hide.bs.submenu', $.proxy(this, 'hide'));
    },
    click: function(event) {
      // Fix a[href="#"]. For community
      event.preventDefault();

      event.stopPropagation();

      this.toggle();
    },
    hide: function(event) {
      // Stop event bubbling
      event.stopPropagation();

      this.close();
    },
    open: function() {
      this.$main.addClass('open');
      this.$subs.trigger('hide.bs.submenu');
    },
    toggle: function() {
      if (this.$main.hasClass('open')) {
        this.close();
      }
      else {
        this.open();
      }
    },
    keydown: function(event) {
      // 13: Return, 32: Spacebar

      if (event.keyCode == 32) {
        // Off vertical scrolling
        event.preventDefault();
      }

      if ($.inArray(event.keyCode, [13, 32]) != -1) {
        this.toggle();
      }
    }
  });

  function Submenupicker(element) {
    this.$element = $(element);
    this.$main = this.$element.parent();
    this.$menu = this.$main.children('.dropdown-menu');
    this.$items = this.$menu.children('.dropdown-submenu');

    this.init();
  }

  Submenupicker.prototype = {
    init: function() {
      this.$menu.off('keydown.bs.dropdown.data-api');
      this.$menu.on('keydown', $.proxy(this, 'itemKeydown'));

      this.$menu.find('li > a').each(function() {
        new Item(this);
      });

      this.$menu.find('.dropdown-submenu > a').each(function() {
        new SubmenuItem(this);
      });

      this.$main.on('hidden.bs.dropdown', $.proxy(this, 'hidden'));
    },
    hidden: function() {
      this.$items.trigger('hide.bs.submenu');
    },
    itemKeydown: function(event) {
      // 38: Arrow up, 40: Arrow down

      if ($.inArray(event.keyCode, [38, 40]) != -1) {
        // Off vertical scrolling
        event.preventDefault();

        event.stopPropagation();

        var $items = this.$menu.find('li:not(.disabled):visible > a');
        var index = $items.index(event.target);

        if (event.keyCode == 38 && index !== 0) {
          index--;
        }
        else if (event.keyCode == 40 && index !== $items.length - 1) {
          index++;
        }
        else {
          return;
        }

        $items.eq(index).trigger('focus');
      }
    }
  };

  var old = $.fn.submenupicker;

  // For AMD/Node/CommonJS used elements (optional)
  // http://learn.jquery.com/jquery-ui/environments/amd/
  $.fn.submenupicker = function(elements) {
    var $elements = this instanceof $ ? this : $(elements);

    return $elements.each(function() {
      var data = $.data(this, 'bs.submenu');

      if (!data) {
        data = new Submenupicker(this);

        $.data(this, 'bs.submenu', data);
      }
    });
  };

  $.fn.submenupicker.Constructor = Submenupicker;
  $.fn.submenupicker.noConflict = function() {
    $.fn.submenupicker = old;
    return this;
  };

  return $.fn.submenupicker;
});
