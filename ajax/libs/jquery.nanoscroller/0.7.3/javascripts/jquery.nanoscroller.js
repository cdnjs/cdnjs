/*! nanoScrollerJS - v0.7.3 - 2013
* http://jamesflorentino.github.com/nanoScrollerJS/
* Copyright (c) 2013 James Florentino; Licensed MIT */
(function($, window, document) {
  "use strict";
  var BROWSER_IS_IE7, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, KEYDOWN, KEYUP, MOUSEDOWN, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, RESIZE, SCROLL, SCROLLBAR, TOUCHMOVE, UP, WHEEL, defaults, getBrowserScrollbarWidth;

  defaults = {
    /**
      a classname for the pane element.
      @property paneClass
      @type String
      @default 'pane'
    */

    paneClass: 'pane',
    /**
      a classname for the slider element.
      @property sliderClass
      @type String
      @default 'slider'
    */

    sliderClass: 'slider',
    /**
      a classname for the content element.
      @property contentClass
      @type String
      @default 'content'
    */

    contentClass: 'content',
    /**
      a setting to enable native scrolling in iOS devices.
      @property iOSNativeScrolling
      @type Boolean
      @default false
    */

    iOSNativeScrolling: false,
    /**
      a setting to prevent the rest of the page being
      scrolled when user scrolls the `.content` element.
      @property preventPageScrolling
      @type Boolean
      @default false
    */

    preventPageScrolling: false,
    /**
      a setting to disable binding to the resize event.
      @property disableResize
      @type Boolean
      @default false
    */

    disableResize: false,
    /**
      a setting to make the scrollbar always visible.
      @property alwaysVisible
      @type Boolean
      @default false
    */

    alwaysVisible: false,
    /**
      a default timeout for the `flash()` method.
      @property flashDelay
      @type Number
      @default 1500
    */

    flashDelay: 1500,
    /**
      a minimum height for the `.slider` element.
      @property sliderMinHeight
      @type Number
      @default 20
    */

    sliderMinHeight: 20,
    /**
      a maximum height for the `.slider` element.
      @property sliderMaxHeight
      @type Number
      @default null
    */

    sliderMaxHeight: null,
    /**
      an alternate document context.
      @property documentContext
      @type Document
      @default null
    */

    documentContext: null,
    /**
      an alternate window context.
      @property windowContext
      @type Window
      @default null
    */

    windowContext: null
  };
  /**
    @property SCROLLBAR
    @type String
    @static
    @final
    @private
  */

  SCROLLBAR = 'scrollbar';
  /**
    @property SCROLL
    @type String
    @static
    @final
    @private
  */

  SCROLL = 'scroll';
  /**
    @property MOUSEDOWN
    @type String
    @final
    @private
  */

  MOUSEDOWN = 'mousedown';
  /**
    @property MOUSEMOVE
    @type String
    @static
    @final
    @private
  */

  MOUSEMOVE = 'mousemove';
  /**
    @property MOUSEWHEEL
    @type String
    @final
    @private
  */

  MOUSEWHEEL = 'mousewheel';
  /**
    @property MOUSEUP
    @type String
    @static
    @final
    @private
  */

  MOUSEUP = 'mouseup';
  /**
    @property RESIZE
    @type String
    @final
    @private
  */

  RESIZE = 'resize';
  /**
    @property DRAG
    @type String
    @static
    @final
    @private
  */

  DRAG = 'drag';
  /**
    @property UP
    @type String
    @static
    @final
    @private
  */

  UP = 'up';
  /**
    @property PANEDOWN
    @type String
    @static
    @final
    @private
  */

  PANEDOWN = 'panedown';
  /**
    @property DOMSCROLL
    @type String
    @static
    @final
    @private
  */

  DOMSCROLL = 'DOMMouseScroll';
  /**
    @property DOWN
    @type String
    @static
    @final
    @private
  */

  DOWN = 'down';
  /**
    @property WHEEL
    @type String
    @static
    @final
    @private
  */

  WHEEL = 'wheel';
  /**
    @property KEYDOWN
    @type String
    @static
    @final
    @private
  */

  KEYDOWN = 'keydown';
  /**
    @property KEYUP
    @type String
    @static
    @final
    @private
  */

  KEYUP = 'keyup';
  /**
    @property TOUCHMOVE
    @type String
    @static
    @final
    @private
  */

  TOUCHMOVE = 'touchmove';
  /**
    @property BROWSER_IS_IE7
    @type Boolean
    @static
    @final
    @private
  */

  BROWSER_IS_IE7 = window.navigator.appName === 'Microsoft Internet Explorer' && /msie 7./i.test(window.navigator.appVersion) && window.ActiveXObject;
  /**
    @property BROWSER_SCROLLBAR_WIDTH
    @type Number
    @static
    @default null
    @private
  */

  BROWSER_SCROLLBAR_WIDTH = null;
  /**
    Returns browser's native scrollbar width
    @method getBrowserScrollbarWidth
    @return {Number} the scrollbar width in pixels
    @static
    @private
  */

  getBrowserScrollbarWidth = function() {
    var outer, outerStyle, scrollbarWidth;

    outer = document.createElement('div');
    outerStyle = outer.style;
    outerStyle.position = 'absolute';
    outerStyle.width = '100px';
    outerStyle.height = '100px';
    outerStyle.overflow = SCROLL;
    outerStyle.top = '-9999px';
    document.body.appendChild(outer);
    scrollbarWidth = outer.offsetWidth - outer.clientWidth;
    document.body.removeChild(outer);
    return scrollbarWidth;
  };
  /**
    @class NanoScroll
    @param element {HTMLElement|Node} the main element
    @param options {Object} nanoScroller's options
    @constructor
  */

  NanoScroll = (function() {
    function NanoScroll(el, options) {
      this.el = el;
      this.options = options;
      BROWSER_SCROLLBAR_WIDTH || (BROWSER_SCROLLBAR_WIDTH = getBrowserScrollbarWidth());
      this.$el = $(this.el);
      this.doc = $(this.options.documentContext || document);
      this.win = $(this.options.windowContext || window);
      this.$content = this.$el.children("." + options.contentClass);
      this.$content.attr('tabindex', 0);
      this.content = this.$content[0];
      if (this.options.iOSNativeScrolling && (this.el.style.WebkitOverflowScrolling != null)) {
        this.nativeScrolling();
      } else {
        this.generate();
      }
      this.createEvents();
      this.addEvents();
      this.reset();
    }

    /**
      Prevents the rest of the page being scrolled
      when user scrolls the `.content` element.
      @method preventScrolling
      @param event {Event}
      @param direction {String} Scroll direction (up or down)
      @private
    */


    NanoScroll.prototype.preventScrolling = function(e, direction) {
      if (!this.isActive) {
        return;
      }
      if (e.type === DOMSCROLL) {
        if (direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) {
          e.preventDefault();
        }
      } else if (e.type === MOUSEWHEEL) {
        if (!e.originalEvent || !e.originalEvent.wheelDelta) {
          return;
        }
        if (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) {
          e.preventDefault();
        }
      }
    };

    /**
      Enable iOS native scrolling
    */


    NanoScroll.prototype.nativeScrolling = function() {
      this.$content.css({
        WebkitOverflowScrolling: 'touch'
      });
      this.iOSNativeScrolling = true;
      this.isActive = true;
    };

    /**
      Updates those nanoScroller properties that
      are related to current scrollbar position.
      @method updateScrollValues
      @private
    */


    NanoScroll.prototype.updateScrollValues = function() {
      var content;

      content = this.content;
      this.maxScrollTop = content.scrollHeight - content.clientHeight;
      this.prevScrollTop = this.contentScrollTop || 0;
      this.contentScrollTop = content.scrollTop;
      if (!this.iOSNativeScrolling) {
        this.maxSliderTop = this.paneHeight - this.sliderHeight;
        this.sliderTop = this.contentScrollTop * this.maxSliderTop / this.maxScrollTop;
      }
    };

    /**
      Creates event related methods
      @method createEvents
      @private
    */


    NanoScroll.prototype.createEvents = function() {
      var _this = this;

      this.events = {
        down: function(e) {
          _this.isBeingDragged = true;
          _this.offsetY = e.pageY - _this.slider.offset().top;
          _this.pane.addClass('active');
          _this.doc.bind(MOUSEMOVE, _this.events[DRAG]).bind(MOUSEUP, _this.events[UP]);
          return false;
        },
        drag: function(e) {
          _this.sliderY = e.pageY - _this.$el.offset().top - _this.offsetY;
          _this.scroll();
          _this.updateScrollValues();
          if (_this.contentScrollTop >= _this.maxScrollTop && _this.prevScrollTop !== _this.maxScrollTop) {
            _this.$el.trigger('scrollend');
          } else if (_this.contentScrollTop === 0 && _this.prevScrollTop !== 0) {
            _this.$el.trigger('scrolltop');
          }
          return false;
        },
        up: function(e) {
          _this.isBeingDragged = false;
          _this.pane.removeClass('active');
          _this.doc.unbind(MOUSEMOVE, _this.events[DRAG]).unbind(MOUSEUP, _this.events[UP]);
          return false;
        },
        resize: function(e) {
          _this.reset();
        },
        panedown: function(e) {
          _this.sliderY = (e.offsetY || e.originalEvent.layerY) - (_this.sliderHeight * 0.5);
          _this.scroll();
          _this.events.down(e);
          return false;
        },
        scroll: function(e) {
          if (_this.isBeingDragged) {
            return;
          }
          _this.updateScrollValues();
          if (!_this.iOSNativeScrolling) {
            _this.sliderY = _this.sliderTop;
            _this.slider.css({
              top: _this.sliderTop
            });
          }
          if (e == null) {
            return;
          }
          if (_this.contentScrollTop >= _this.maxScrollTop) {
            if (_this.options.preventPageScrolling) {
              _this.preventScrolling(e, DOWN);
            }
            if (_this.prevScrollTop !== _this.maxScrollTop) {
              _this.$el.trigger('scrollend');
            }
          } else if (_this.contentScrollTop === 0) {
            if (_this.options.preventPageScrolling) {
              _this.preventScrolling(e, UP);
            }
            if (_this.prevScrollTop !== 0) {
              _this.$el.trigger('scrolltop');
            }
          }
        },
        wheel: function(e) {
          var delta;

          if (e == null) {
            return;
          }
          delta = e.delta || e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail || (e.originalEvent && -e.originalEvent.detail);
          if (delta) {
            _this.sliderY += -delta / 3;
          }
          _this.scroll();
          return false;
        }
      };
    };

    /**
      Adds event listeners with jQuery.
      @method addEvents
      @private
    */


    NanoScroll.prototype.addEvents = function() {
      var events;

      this.removeEvents();
      events = this.events;
      if (!this.options.disableResize) {
        this.win.bind(RESIZE, events[RESIZE]);
      }
      if (!this.iOSNativeScrolling) {
        this.slider.bind(MOUSEDOWN, events[DOWN]);
        this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind("" + MOUSEWHEEL + " " + DOMSCROLL, events[WHEEL]);
      }
      this.$content.bind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
    };

    /**
      Removes event listeners with jQuery.
      @method removeEvents
      @private
    */


    NanoScroll.prototype.removeEvents = function() {
      var events;

      events = this.events;
      this.win.unbind(RESIZE, events[RESIZE]);
      if (!this.iOSNativeScrolling) {
        this.slider.unbind();
        this.pane.unbind();
      }
      this.$content.unbind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
    };

    /**
      Generates nanoScroller's scrollbar and elements for it.
      @method generate
      @chainable
      @private
    */


    NanoScroll.prototype.generate = function() {
      var contentClass, cssRule, options, paneClass, sliderClass;

      options = this.options;
      paneClass = options.paneClass, sliderClass = options.sliderClass, contentClass = options.contentClass;
      if (!this.$el.find("" + paneClass).length && !this.$el.find("" + sliderClass).length) {
        this.$el.append("<div class=\"" + paneClass + "\"><div class=\"" + sliderClass + "\" /></div>");
      }
      this.pane = this.$el.children("." + paneClass);
      this.slider = this.pane.find("." + sliderClass);
      if (BROWSER_SCROLLBAR_WIDTH) {
        cssRule = {
          right: -BROWSER_SCROLLBAR_WIDTH
        };
        this.$el.addClass('has-scrollbar');
      }
      if (cssRule != null) {
        this.$content.css(cssRule);
      }
      return this;
    };

    /**
      @method restore
      @private
    */


    NanoScroll.prototype.restore = function() {
      this.stopped = false;
      this.pane.show();
      this.addEvents();
    };

    /**
      Resets nanoScroller's scrollbar.
      @method reset
      @chainable
      @example
          $(".nano").nanoScroller();
    */


    NanoScroll.prototype.reset = function() {
      var content, contentHeight, contentStyle, contentStyleOverflowY, paneBottom, paneHeight, paneOuterHeight, paneTop, parentMaxHeight, sliderHeight;

      if (this.iOSNativeScrolling) {
        this.contentHeight = this.content.scrollHeight;
        return;
      }
      if (!this.$el.find("." + this.options.paneClass).length) {
        this.generate().stop();
      }
      if (this.stopped) {
        this.restore();
      }
      content = this.content;
      contentStyle = content.style;
      contentStyleOverflowY = contentStyle.overflowY;
      if (BROWSER_IS_IE7) {
        this.$content.css({
          height: this.$content.height()
        });
      }
      contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH;
      parentMaxHeight = parseInt(this.$el.css("max-height"), 10);
      if (parentMaxHeight > 0) {
        this.$el.height("");
        this.$el.height(content.scrollHeight > parentMaxHeight ? parentMaxHeight : content.scrollHeight);
      }
      paneHeight = this.pane.outerHeight();
      paneTop = parseInt(this.pane.css('top'), 10);
      paneBottom = parseInt(this.pane.css('bottom'), 10);
      paneOuterHeight = paneHeight + paneTop + paneBottom;
      sliderHeight = Math.round(paneOuterHeight / contentHeight * paneOuterHeight);
      if (sliderHeight < this.options.sliderMinHeight) {
        sliderHeight = this.options.sliderMinHeight;
      } else if ((this.options.sliderMaxHeight != null) && sliderHeight > this.options.sliderMaxHeight) {
        sliderHeight = this.options.sliderMaxHeight;
      }
      if (contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL) {
        sliderHeight += BROWSER_SCROLLBAR_WIDTH;
      }
      this.maxSliderTop = paneOuterHeight - sliderHeight;
      this.contentHeight = contentHeight;
      this.paneHeight = paneHeight;
      this.paneOuterHeight = paneOuterHeight;
      this.sliderHeight = sliderHeight;
      this.slider.height(sliderHeight);
      this.events.scroll();
      this.pane.show();
      this.isActive = true;
      if ((content.scrollHeight === content.clientHeight) || (this.pane.outerHeight(true) >= content.scrollHeight && contentStyleOverflowY !== SCROLL)) {
        this.pane.hide();
        this.isActive = false;
      } else if (this.el.clientHeight === content.scrollHeight && contentStyleOverflowY === SCROLL) {
        this.slider.hide();
      } else {
        this.slider.show();
      }
      this.pane.css({
        opacity: (this.options.alwaysVisible ? 1 : ''),
        visibility: (this.options.alwaysVisible ? 'visible' : '')
      });
      return this;
    };

    /**
      @method scroll
      @private
      @example
          $(".nano").nanoScroller({ scroll: 'top' });
    */


    NanoScroll.prototype.scroll = function() {
      if (!this.isActive) {
        return;
      }
      this.sliderY = Math.max(0, this.sliderY);
      this.sliderY = Math.min(this.maxSliderTop, this.sliderY);
      this.$content.scrollTop((this.paneHeight - this.contentHeight + BROWSER_SCROLLBAR_WIDTH) * this.sliderY / this.maxSliderTop * -1);
      if (!this.iOSNativeScrolling) {
        this.slider.css({
          top: this.sliderY
        });
      }
      return this;
    };

    /**
      Scroll at the bottom with an offset value
      @method scrollBottom
      @param offsetY {Number}
      @chainable
      @example
          $(".nano").nanoScroller({ scrollBottom: value });
    */


    NanoScroll.prototype.scrollBottom = function(offsetY) {
      if (!this.isActive) {
        return;
      }
      this.reset();
      this.$content.scrollTop(this.contentHeight - this.$content.height() - offsetY).trigger(MOUSEWHEEL);
      return this;
    };

    /**
      Scroll at the top with an offset value
      @method scrollTop
      @param offsetY {Number}
      @chainable
      @example
          $(".nano").nanoScroller({ scrollTop: value });
    */


    NanoScroll.prototype.scrollTop = function(offsetY) {
      if (!this.isActive) {
        return;
      }
      this.reset();
      this.$content.scrollTop(+offsetY).trigger(MOUSEWHEEL);
      return this;
    };

    /**
      Scroll to an element
      @method scrollTo
      @param node {Node} A node to scroll to.
      @chainable
      @example
          $(".nano").nanoScroller({ scrollTo: $('#a_node') });
    */


    NanoScroll.prototype.scrollTo = function(node) {
      if (!this.isActive) {
        return;
      }
      this.reset();
      this.scrollTop($(node).get(0).offsetTop);
      return this;
    };

    /**
      To stop the operation.
      This option will tell the plugin to disable all event bindings and hide the gadget scrollbar from the UI.
      @method stop
      @chainable
      @example
          $(".nano").nanoScroller({ stop: true });
    */


    NanoScroll.prototype.stop = function() {
      this.stopped = true;
      this.removeEvents();
      this.pane.hide();
      return this;
    };

    /**
      Destroys nanoScroller and restores browser's native scrollbar.
      @method destroy
      @chainable
      @example
          $(".nano").nanoScroller({ destroy: true });
    */


    NanoScroll.prototype.destroy = function() {
      if (!this.stopped) {
        this.stop();
      }
      if (this.pane.length) {
        this.pane.remove();
      }
      if (BROWSER_IS_IE7) {
        this.$content.height('');
      }
      this.$content.removeAttr('tabindex');
      if (this.$el.hasClass('has-scrollbar')) {
        this.$el.removeClass('has-scrollbar');
        this.$content.css({
          right: ''
        });
      }
      return this;
    };

    /**
      To flash the scrollbar gadget for an amount of time defined in plugin settings (defaults to 1,5s).
      Useful if you want to show the user (e.g. on pageload) that there is more content waiting for him.
      @method flash
      @chainable
      @example
          $(".nano").nanoScroller({ flash: true });
    */


    NanoScroll.prototype.flash = function() {
      var _this = this;

      if (!this.isActive) {
        return;
      }
      this.reset();
      this.pane.addClass('flashed');
      setTimeout(function() {
        _this.pane.removeClass('flashed');
      }, this.options.flashDelay);
      return this;
    };

    return NanoScroll;

  })();
  $.fn.nanoScroller = function(settings) {
    return this.each(function() {
      var options, scrollbar;

      if (!(scrollbar = this.nanoscroller)) {
        options = $.extend({}, defaults, settings);
        this.nanoscroller = scrollbar = new NanoScroll(this, options);
      }
      if (settings && typeof settings === "object") {
        $.extend(scrollbar.options, settings);
        if (settings.scrollBottom) {
          return scrollbar.scrollBottom(settings.scrollBottom);
        }
        if (settings.scrollTop) {
          return scrollbar.scrollTop(settings.scrollTop);
        }
        if (settings.scrollTo) {
          return scrollbar.scrollTo(settings.scrollTo);
        }
        if (settings.scroll === 'bottom') {
          return scrollbar.scrollBottom(0);
        }
        if (settings.scroll === 'top') {
          return scrollbar.scrollTop(0);
        }
        if (settings.scroll && settings.scroll instanceof $) {
          return scrollbar.scrollTo(settings.scroll);
        }
        if (settings.stop) {
          return scrollbar.stop();
        }
        if (settings.destroy) {
          return scrollbar.destroy();
        }
        if (settings.flash) {
          return scrollbar.flash();
        }
      }
      return scrollbar.reset();
    });
  };
})(jQuery, window, document);

/*
//@ sourceMappingURL=jquery.nanoscroller.js.map
*/