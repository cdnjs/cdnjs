/*!
 * Bootstrap-submenu v1.2.12 (http://vsn4ik.github.io/bootstrap-submenu)
 * Copyright 2015 Vasily A. (https://github.com/vsn4ik)
 * Licensed under MIT (https://github.com/vsn4ik/bootstrap-submenu/blob/master/LICENSE)
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
  // Or ':not(.disabled):has(a)';
  var desc = ':not(.disabled, .divider, .dropdown-header)';

  function Submenupicker(element) {
    this.$element = $(element);
    this.$main = this.$element.closest('.dropdown, .dropup, .btn-group');
    this.$menu = this.$element.parent();
    this.$drop = this.$menu.parent().parent();
    this.$menus = this.$menu.siblings('.dropdown-submenu');

    var $children = this.$menu.find('> .dropdown-menu > ' + desc);

    this.$submenus = $children.filter('.dropdown-submenu');
    this.$items = $children.not('.dropdown-submenu');

    this.init();
  }

  Submenupicker.prototype = {
    init: function() {
      this.$element.on({
        'click.bs.dropdown': this.click.bind(this),
        keydown: this.keydown.bind(this)
      });

      this.$menu.on('hide.bs.submenu', this.hide.bind(this));
      this.$items.on('keydown', this.item_keydown.bind(this));

      // Bootstrap fix
      this.$menu.nextAll(desc + ':first:not(.dropdown-submenu)').children('a').on('keydown', this.next_keydown.bind(this));
    },
    click: function(event) {
      event.stopPropagation();

      this.toggle();
    },
    toggle: function() {
      if (this.$menu.hasClass('open')) {
        this.close();
      }
      else {
        this.$menu.addClass('open');
        this.$menus.trigger('hide.bs.submenu');
      }
    },
    hide: function(event) {
      // Stop event bubbling
      event.stopPropagation();

      this.close();
    },
    close: function() {
      this.$menu.removeClass('open');
      this.$submenus.trigger('hide.bs.submenu');
    },
    keydown: function(event) {
      // 13: Return, 27: Esc, 32: Spacebar
      // 38: Arrow up, 40: Arrow down

      // Off vertical scrolling
      if (/^(32|38|40)$/.test(event.keyCode)) {
        event.preventDefault();
      }

      if (/^(13|32)$/.test(event.keyCode)) {
        this.toggle();
      }
      else if (/^(27|38|40)$/.test(event.keyCode)) {
        event.stopPropagation();

        if (event.keyCode == 27) {
          if (this.$menu.hasClass('open')) {
            this.close();
          }
          else {
            this.$menus.trigger('hide.bs.submenu');
            this.$drop.removeClass('open').children('a').trigger('focus');
          }
        }
        else {
          var $items = this.$main.find('li:not(.disabled):visible > a');

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
    },
    item_keydown: function(event) {
      // 27: Esc

      if (event.keyCode != 27) {
        return;
      }

      event.stopPropagation();

      this.close();
      this.$element.trigger('focus');
    },
    next_keydown: function(event) {
      // 38: Arrow up

      if (event.keyCode != 38) {
        return;
      }

      // Off vertical scrolling
      event.preventDefault();

      event.stopPropagation();

      // Use this.$drop instead this.$main (optimally)
      var $items = this.$drop.find('li:not(.disabled):visible > a');

      var index = $items.index(event.target);

      $items.eq(index - 1).trigger('focus');
    }
  };

  // For AMD/Node/CommonJS used elements (optional)
  // http://learn.jquery.com/jquery-ui/environments/amd/
  return $.fn.submenupicker = function(elements) {
    var $elements = this instanceof $ ? this : $(elements);

    return $elements.each(function() {
      var data = $.data(this, 'bs.submenu');

      if (!data) {
        data = new Submenupicker(this);

        $.data(this, 'bs.submenu', data);
      }
    });
  };
});
