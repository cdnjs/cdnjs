/*!
 * jquery-drawer v3.1.0
 * Flexible drawer menu using jQuery, iScroll and CSS.
 * http://git.blivesta.com/drawer
 * License : MIT
 * Author : blivesta <design@blivesta.com> (http://blivesta.com/)
 */

;(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function($) {
  'use strict';
  var namespace = 'drawer';
  var touches = typeof document.ontouchstart != 'undefined';
  var __ = {
    init: function(options) {
      options = $.extend({
        iscroll: {
          mouseWheel: true,
          preventDefault: false
        },
        showOverlay: true
      }, options);

      __.settings = {
        state: false,
        class: {
          nav: 'drawer-nav',
          toggle: 'drawer-toggle',
          overlay: 'drawer-overlay',
          open: 'drawer-open',
          close: 'drawer-close',
          dropdown: 'drawer-dropdown'
        },
        events: {
          opened: 'drawer.opened',
          closed: 'drawer.closed'
        },
        dropdownEvents: {
          opened: 'shown.bs.dropdown',
          closed: 'hidden.bs.dropdown'
        }
      };

      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);

        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, { options: options });

          var iScroll = new IScroll('.' + __.settings.class.nav, options.iscroll);

          if (options.showOverlay) {
            __.addOverlay.call(_this);
          }

          $('.' + __.settings.class.toggle).on('click.' + namespace, function() {
            __.toggle.call(_this);
            return iScroll.refresh();
          });

          $(window).resize(function() {
            __.close.call(_this);
            return iScroll.refresh();
          });

          $('.' + __.settings.class.dropdown)
            .on(__.settings.dropdownEvents.opened + ' ' + __.settings.dropdownEvents.closed, function() {
              return iScroll.refresh();
            });
        }

      }); // end each
    },

    addOverlay: function() {
      var _this = this;
      var $this = $(this);
      var $overlay = $('<div>').addClass(__.settings.class.overlay + ' ' + __.settings.class.toggle);

      return $this.append($overlay);
    },

    toggle: function() {
      var _this = this;

      if (__.settings.state){
        return __.close.call(_this);
      } else {
        return __.open.call(_this);
      }
    },

    open: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;

      if (touches) {
        $this.on('touchmove.' + namespace, function(event) {
          event.preventDefault();
        });
      }

      return $this
        .removeClass(__.settings.class.close)
        .addClass(__.settings.class.open)
        .css({ 'overflow': 'hidden' })
        .drawerCallback(function(){
          __.settings.state = true;
          $this.trigger(__.settings.events.opened);
        });
    },

    close: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;

      if (touches) $this.off('touchmove.' + namespace);

      return $this
        .removeClass(__.settings.class.open)
        .addClass(__.settings.class.close)
        .css({ 'overflow': 'auto' })
        .drawerCallback(function(){
          __.settings.state = false;
          $this.trigger(__.settings.events.closed);
        });
    },

    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).off('.' + namespace);
        $this.removeData(namespace);
      });
    }

  };

  $.fn.drawerCallback = function(callback){
    var end = 'transitionend webkitTransitionEnd';
    return this.each(function() {
      var $this = $(this);
      $this.on(end, function(){
        $this.off(end);
        return callback.call(this);
      });
    });
  };

  $.fn.drawer = function(method) {
    if (__[method]) {
      return __[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return __.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.' + namespace);
    }
  };

}));
