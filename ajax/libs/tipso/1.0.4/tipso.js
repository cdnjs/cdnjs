/*!
 * tipso - A Lightweight Responsive jQuery Tooltip Plugin v1.0.4
 * Copyright (c) 2014-2015 Bojan Petkovski
 * http://tipso.object505.com
 * Licensed under the MIT license
 * http://object505.mit-license.org/
 */
;(function($, window, document, undefined) {
  var pluginName = "tipso",
    defaults = {
      speed           : 400,
      background      : '#55b555',
      color           : '#ffffff',
      position        : 'top',
      width           : 200,
      delay           : 200,
      animationIn     : '',
      animationOut    : '',
      offsetX         : 0,
      offsetY         : 0,
      content         : null,
      ajaxContentUrl  : null,
      useTitle        : true,
      onBeforeShow    : null,
      onShow          : null,
      onHide          : null
    };

  function Plugin(element, options) {
    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this._title = this.element.attr('title');
    this.mode = 'hide';
    this.ieFade = false;
    if ( !supportsTransitions ) {        
      this.ieFade = true;      
    }
    this.init();
  }
  $.extend(Plugin.prototype, {
    init: function() {
      var obj = this,
        $e = this.element;
      $e.addClass('tipso_style').removeAttr('title');
      if (isTouchSupported()) {
        $e.on('click' + '.' + pluginName, function(e) {
          obj.mode == 'hide' ? obj.show() : obj.hide();
          e.stopPropagation();
        });
        $(document).on('click', function() {
          if (obj.mode == 'show') {
            obj.hide();
          }
        });
      } else {
        $e.on('mouseover' + '.' + pluginName, function() {
          obj.show();
        });
        $e.on('mouseout' + '.' + pluginName, function() {
          obj.hide();
        });
      }
    },
    tooltip: function() {
      if (!this.tipso_bubble) {
        this.tipso_bubble = $(
          '<div class="tipso_bubble"><div class="tipso_content"></div><div class="tipso_arrow"></div></div>'
        );
      }
      return this.tipso_bubble;
    },
    show: function() {
      var tipso_bubble = this.tooltip(),
        obj = this,
        $win = $(window);
      if ($.isFunction(obj.settings.onBeforeShow)) {
        obj.settings.onBeforeShow($(this));
      }
      tipso_bubble.css({
        background: obj.settings.background,
        color: obj.settings.color,
        width: obj.settings.width
      }).hide();
      tipso_bubble.find('.tipso_content').html(obj.content());
      reposition(obj);
      $win.resize(function() {
        reposition(obj);
      });
      obj.timeout = window.setTimeout(function() {
        if (obj.ieFade || obj.settings.animationIn === '' || obj.settings.animationOut === ''){
          tipso_bubble.appendTo('body').stop(true, true).fadeIn(obj.settings
          .speed, function() {
            obj.mode = 'show';
            if ($.isFunction(obj.settings.onShow)) {
              obj.settings.onShow($(this));
            }
          });
        } else {
          tipso_bubble.remove().appendTo('body')
          .stop(true, true)
          .removeClass('animated ' + obj.settings.animationOut)
          .addClass('noAnimation')
          .removeClass('noAnimation')
          .addClass('animated ' + obj.settings.animationIn).fadeIn(obj.settings.speed, function() {
            $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              $(this).removeClass('animated ' + obj.settings.animationIn);
            });
            obj.mode = 'show';
            if ($.isFunction(obj.settings.onShow)) {
              obj.settings.onShow($(this));
            }
          });
        }
      }, obj.settings.delay);
    },
    hide: function() {
      var obj = this,
        tipso_bubble = this.tooltip();
      window.clearTimeout(obj.timeout);
      obj.timeout = null;
      if (obj.ieFade || obj.settings.animationIn === '' || obj.settings.animationOut === ''){
        tipso_bubble.stop(true, true).fadeOut(obj.settings.speed,
        function() {
          $(this).remove();
          if ($.isFunction(obj.settings.onHide) && obj.mode == 'show') {
            obj.settings.onHide($(this));
          }
          obj.mode = 'hide';
        });
      } else {
        tipso_bubble.stop(true, true)
        .removeClass('animated ' + obj.settings.animationIn)
        .addClass('noAnimation').removeClass('noAnimation')
        .addClass('animated ' + obj.settings.animationOut)
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){          
          $(this).removeClass('animated ' + obj.settings.animationOut).remove();          
          if ($.isFunction(obj.settings.onHide) && obj.mode == 'show') {
            obj.settings.onHide($(this));
          }
          obj.mode = 'hide';
        });
      }
    },
    destroy: function() {
      var $e = this.element;
      $e.off('.' + pluginName);
      $e.removeData(pluginName);
      $e.removeClass('tipso_style').attr('title', this._title);
    },
    content: function() {
      var content,
        $e = this.element,
        obj = this,
        title = this._title;
      if (obj.settings.ajaxContentUrl) {
        content = $.ajax({
          type: "GET",
          url: obj.settings.ajaxContentUrl,
          async: false
        }).responseText;
      } else if (obj.settings.content) {
        content = obj.settings.content;
      } else {
        if (obj.settings.useTitle === true) {
          content = title;
        } else {
          content = $e.data('tipso');
        }
      }
      return content;
    },
    update: function(key, value) {
      var obj = this;
      if (value) {
        obj.settings[key] = value;
      } else {
        return obj.settings[key];
      }
    }
  });

  function isTouchSupported() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = "ontouchstart" in document.createElement(
      "div");
    if (msTouchEnabled || generalTouchEnabled) {
      return true;
    }
    return false;
  }

  function realHeight(obj) {
    var clone = obj.clone();
    clone.css("visibility", "hidden");
    $('body').append(clone);
    var height = clone.outerHeight();
    clone.remove();
    return height;
  }

  var supportsTransitions = (function() {
    var s = document.createElement('p').style, 
        v = ['ms','O','Moz','Webkit'];
    if( s['transition'] == '' ) return true; 
    while( v.length ) 
        if( v.pop() + 'Transition' in s )
            return true;
    return false;
  })();

  function reposition(thisthat) {
    var tipso_bubble = thisthat.tooltip(),
      $e = thisthat.element,
      obj = thisthat,
      $win = $(window),
      arrow = 10,
      pos_top, pos_left, diff;

      if ( $e.parent().outerWidth() > $win.outerWidth() ){
        $win = $e.parent();
      }
    switch (obj.settings.position) {
      case 'top':
        pos_left = $e.offset().left + ($e.outerWidth() / 2) - (tipso_bubble
          .outerWidth() / 2);
        pos_top = $e.offset().top - realHeight(tipso_bubble) - arrow;
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -8
        });
        if (pos_top < $win.scrollTop()) {
          pos_top = $e.offset().top + $e.outerHeight() + arrow;
          tipso_bubble.find('.tipso_arrow').css({
            'border-bottom-color': obj.settings.background,
            'border-top-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('bottom');
        } else {
          tipso_bubble.find('.tipso_arrow').css({
            'border-top-color': obj.settings.background,
            'border-bottom-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('top');
        }
        break;
      case 'bottom':
        pos_left = $e.offset().left + ($e.outerWidth() / 2) - (tipso_bubble
          .outerWidth() / 2);
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -8
        });
        if (pos_top + realHeight(tipso_bubble) > $win.scrollTop() + $win.outerHeight()) {
          pos_top = $e.offset().top - realHeight(tipso_bubble) - arrow;
          tipso_bubble.find('.tipso_arrow').css({
            'border-top-color': obj.settings.background,
            'border-bottom-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('top');
        } else {
          tipso_bubble.find('.tipso_arrow').css({
            'border-bottom-color': obj.settings.background,
            'border-top-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass(obj.settings.position);
        }
        break;
      case 'left':
        pos_left = $e.offset().left - tipso_bubble.outerWidth() - arrow;
        pos_top = $e.offset().top + ($e.outerHeight() / 2) - (realHeight(
          tipso_bubble) / 2);
        tipso_bubble.find('.tipso_arrow').css({
          marginTop: -8,
          marginLeft: ''
        });
        if (pos_left < $win.scrollLeft()) {
          pos_left = $e.offset().left + $e.outerWidth() + arrow;
          tipso_bubble.find('.tipso_arrow').css({
            'border-right-color': obj.settings.background,
            'border-left-color': 'transparent',
            'border-top-color': 'transparent',
            'border-bottom-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('right');
        } else {
          tipso_bubble.find('.tipso_arrow').css({
            'border-left-color': obj.settings.background,
            'border-right-color': 'transparent',
            'border-top-color': 'transparent',
            'border-bottom-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass(obj.settings.position);
        }
        break;
      case 'right':
        pos_left = $e.offset().left + $e.outerWidth() + arrow;
        pos_top = $e.offset().top + ($e.outerHeight() / 2) - (realHeight(
          tipso_bubble) / 2);
        tipso_bubble.find('.tipso_arrow').css({
          marginTop: -8,
          marginLeft: ''
        });
        if (pos_left + arrow + obj.settings.width > $win.scrollLeft() +
          $win.outerWidth()) {
          pos_left = $e.offset().left - tipso_bubble.outerWidth() - arrow;
          tipso_bubble.find('.tipso_arrow').css({
            'border-left-color': obj.settings.background,
            'border-right-color': 'transparent',
            'border-top-color': 'transparent',
            'border-bottom-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('left');
        } else {
          tipso_bubble.find('.tipso_arrow').css({
            'border-right-color': obj.settings.background,
            'border-left-color': 'transparent',
            'border-top-color': 'transparent',
            'border-bottom-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass(obj.settings.position);
        }
        break;
    }
    if (pos_left < $win.scrollLeft() && (obj.settings.position == 'bottom' ||
      obj.settings.position == 'top')) {
      tipso_bubble.find('.tipso_arrow').css({
        marginLeft: pos_left - 8
      });
      pos_left = 0;
    }
    if (pos_left + obj.settings.width > $win.outerWidth() && (obj.settings.position ==
      'bottom' || obj.settings.position == 'top')) {
      diff = $win.outerWidth() - (pos_left + obj.settings.width);
      tipso_bubble.find('.tipso_arrow').css({
        marginLeft: -diff - 8,
        marginTop: ''
      });
      pos_left = pos_left + diff;
    }
    if (pos_left < $win.scrollLeft() && (obj.settings.position == 'left' ||
      obj.settings.position == 'right')) {
      pos_left = $e.offset().left + ($e.outerWidth() / 2) - (tipso_bubble.outerWidth() /
        2);
      tipso_bubble.find('.tipso_arrow').css({
        marginLeft: -8,
        marginTop: ''
      });
      pos_top = $e.offset().top - realHeight(tipso_bubble) - arrow;
      if (pos_top < $win.scrollTop()) {
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find('.tipso_arrow').css({
          'border-bottom-color': obj.settings.background,
          'border-top-color': 'transparent',
          'border-left-color': 'transparent',
          'border-right-color': 'transparent'
        });
        tipso_bubble.removeClass('top bottom left right');
        tipso_bubble.addClass('bottom');
      } else {
        tipso_bubble.find('.tipso_arrow').css({
          'border-top-color': obj.settings.background,
          'border-bottom-color': 'transparent',
          'border-left-color': 'transparent',
          'border-right-color': 'transparent'
        });
        tipso_bubble.removeClass('top bottom left right');
        tipso_bubble.addClass('top');
      }
      if (pos_left + obj.settings.width > $win.outerWidth()) {
        diff = $win.outerWidth() - (pos_left + obj.settings.width);
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -diff - 8,
          marginTop: ''
        });
        pos_left = pos_left + diff;
      }
      if (pos_left < $win.scrollLeft()) {
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: pos_left - 8
        });
        pos_left = 0;
      }
    }
    if (pos_left + obj.settings.width > $win.outerWidth() && (obj.settings.position ==
      'left' || obj.settings.position == 'right')) {
      pos_left = $e.offset().left + ($e.outerWidth() / 2) - (tipso_bubble.outerWidth() /
        2);
      tipso_bubble.find('.tipso_arrow').css({
        marginLeft: -8,
        marginTop: ''
      });
      pos_top = $e.offset().top - realHeight(tipso_bubble) - arrow;
      if (pos_top < $win.scrollTop()) {
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find('.tipso_arrow').css({
          'border-bottom-color': obj.settings.background,
          'border-top-color': 'transparent',
          'border-left-color': 'transparent',
          'border-right-color': 'transparent'
        });
        tipso_bubble.removeClass('top bottom left right');
        tipso_bubble.addClass('bottom');
      } else {
        tipso_bubble.find('.tipso_arrow').css({
          'border-top-color': obj.settings.background,
          'border-bottom-color': 'transparent',
          'border-left-color': 'transparent',
          'border-right-color': 'transparent'
        });
        tipso_bubble.removeClass('top bottom left right');
        tipso_bubble.addClass('top');
      }
      if (pos_left + obj.settings.width > $win.outerWidth()) {
        diff = $win.outerWidth() - (pos_left + obj.settings.width);
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -diff - 8,
          marginTop: ''
        });
        pos_left = pos_left + diff;
      }
      if (pos_left < $win.scrollLeft()) {
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: pos_left - 8
        });
        pos_left = 0;
      }
    }
    tipso_bubble.css({
      left: pos_left + obj.settings.offsetX,
      top: pos_top + obj.settings.offsetY
    });
  }
  $[pluginName] = $.fn[pluginName] = function(options) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      if (!(this instanceof $)) {
        $.extend(defaults, options);
      }
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !==
      'init') {
      var returns;
      this.each(function() {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (!instance) {
          instance = $.data(this, 'plugin_' + pluginName, new Plugin(
            this, options));
        }
        if (instance instanceof Plugin && typeof instance[options] ===
          'function') {
          returns = instance[options].apply(instance, Array.prototype.slice
            .call(args, 1));
        }
        if (options === 'destroy') {
          $.data(this, 'plugin_' + pluginName, null);
        }
      });
      return returns !== undefined ? returns : this;
    }
  };
})(jQuery, window, document);