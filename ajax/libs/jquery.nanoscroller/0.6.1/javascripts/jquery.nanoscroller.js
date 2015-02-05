
(function($, window, document) {
  "use strict";
  var BROWSER_IS_IE7, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, MOUSEDOWN, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, RESIZE, SCROLL, SCROLLBAR, TOUCHMOVE, UP, WHEEL, defaults, getBrowserScrollbarWidth;
  defaults = {
    paneClass: 'pane',
    sliderClass: 'slider',
    sliderMinHeight: 20,
    contentClass: 'content',
    iOSNativeScrolling: false,
    preventPageScrolling: false,
    disableResize: false
  };
  SCROLLBAR = 'scrollbar';
  SCROLL = 'scroll';
  MOUSEDOWN = 'mousedown';
  MOUSEMOVE = 'mousemove';
  MOUSEWHEEL = 'mousewheel';
  MOUSEUP = 'mouseup';
  RESIZE = 'resize';
  DRAG = 'drag';
  UP = 'up';
  PANEDOWN = 'panedown';
  DOMSCROLL = 'DOMMouseScroll';
  DOWN = 'down';
  WHEEL = 'wheel';
  TOUCHMOVE = 'touchmove';
  BROWSER_IS_IE7 = window.navigator.appName === 'Microsoft Internet Explorer' && /msie 7./i.test(window.navigator.appVersion) && window.ActiveXObject;
  BROWSER_SCROLLBAR_WIDTH = null;
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
  NanoScroll = (function() {

    function NanoScroll(el, options) {
      this.options = options;
      BROWSER_SCROLLBAR_WIDTH || (BROWSER_SCROLLBAR_WIDTH = getBrowserScrollbarWidth());
      this.el = $(el);
      this.doc = $(document);
      this.win = $(window);
      this.generate();
      this.createEvents();
      this.addEvents();
      this.reset();
    }

    NanoScroll.prototype.preventScrolling = function(e, direction) {
      switch (e.type) {
        case DOMSCROLL:
          if (direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) {
            e.preventDefault();
          }
          break;
        case MOUSEWHEEL:
          if (!e.originalEvent) return;
          if (!e.originalEvent.wheelDelta) return;
          if (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) {
            e.preventDefault();
          }
      }
    };

    NanoScroll.prototype.createEvents = function() {
      var _this = this;
      this.events = {
        down: function(e) {
          _this.isBeingDragged = true;
          _this.offsetY = e.clientY - _this.slider.offset().top;
          _this.pane.addClass('active');
          _this.doc.bind(MOUSEMOVE, _this.events[DRAG]).bind(MOUSEUP, _this.events[UP]);
          return false;
        },
        drag: function(e) {
          _this.sliderY = e.clientY - _this.el.offset().top - _this.offsetY;
          _this.scroll();
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
          _this.sliderY = e.offsetY - (_this.sliderHeight * 0.5);
          _this.scroll();
          _this.events.down(e);
          return false;
        },
        scroll: function(e) {
          var maxScrollTop, maxSliderTop, scrollTop, sliderTop;
          if (_this.isBeingDragged) return;
          maxScrollTop = _this.content[0].scrollHeight - _this.content[0].clientHeight;
          scrollTop = _this.content[0].scrollTop;
          maxSliderTop = _this.paneHeight - _this.sliderHeight;
          sliderTop = scrollTop * maxSliderTop / maxScrollTop;
          _this.slider.css({
            top: sliderTop
          });
          if (e == null) return;
          if (scrollTop >= maxScrollTop) {
            if (_this.options.preventPageScrolling) {
              _this.preventScrolling(e, DOWN);
            }
            _this.el.trigger('scrollend');
          } else if (scrollTop === 0) {
            if (_this.options.preventPageScrolling) _this.preventScrolling(e, UP);
            _this.el.trigger('scrolltop');
          }
        },
        wheel: function(e) {
          if (e == null) return;
          _this.sliderY += -e.wheelDeltaY || -e.delta;
          _this.scroll();
          return false;
        }
      };
    };

    NanoScroll.prototype.addEvents = function() {
      var events;
      events = this.events;
      if (!this.options.disableResize) this.win.bind(RESIZE, events[RESIZE]);
      this.slider.bind(MOUSEDOWN, events[DOWN]);
      this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind(MOUSEWHEEL, events[WHEEL]).bind(DOMSCROLL, events[WHEEL]);
      this.content.bind(MOUSEWHEEL, events[SCROLL]).bind(DOMSCROLL, events[SCROLL]).bind(TOUCHMOVE, events[SCROLL]);
    };

    NanoScroll.prototype.removeEvents = function() {
      var events;
      events = this.events;
      if (!this.options.disableResize) this.win.unbind(RESIZE, events[RESIZE]);
      this.slider.unbind(MOUSEDOWN, events[DOWN]);
      this.pane.unbind(MOUSEDOWN, events[PANEDOWN]).unbind(MOUSEWHEEL, events[WHEEL]).unbind(DOMSCROLL, events[WHEEL]);
      this.content.unbind(MOUSEWHEEL, events[SCROLL]).unbind(DOMSCROLL, events[SCROLL]).unbind(TOUCHMOVE, events[SCROLL]);
    };

    NanoScroll.prototype.generate = function() {
      var contentClass, cssRule, options, paneClass, sliderClass;
      options = this.options;
      paneClass = options.paneClass, sliderClass = options.sliderClass, contentClass = options.contentClass;
      this.el.append("<div class=\"" + paneClass + "\"><div class=\"" + sliderClass + "\" /></div>");
      this.content = $(this.el.children("." + contentClass)[0]);
      this.slider = this.el.find("." + sliderClass);
      this.pane = this.el.find("." + paneClass);
      cssRule = {
        right: -BROWSER_SCROLLBAR_WIDTH
      };
      if (options.iOSNativeScrolling) cssRule.WebkitOverflowScrolling = 'touch';
      this.content.css(cssRule);
      return this;
    };

    NanoScroll.prototype.elementsExist = function() {
      return this.el.find("." + this.options.paneClass).length;
    };

    NanoScroll.prototype.restore = function() {
      this.stopped = false;
      this.pane.show();
      return this.addEvents();
    };

    NanoScroll.prototype.reset = function() {
      var content, contentHeight, contentStyle, contentStyleOverflowY, maxSliderTop, paneBottom, paneHeight, paneOuterHeight, paneTop, sliderHeight, sliderMinHeight;
      if (!this.elementsExist()) this.generate().stop();
      if (this.stopped) this.restore();
      content = this.content[0];
      contentStyle = content.style;
      contentStyleOverflowY = contentStyle.overflowY;
      if (BROWSER_IS_IE7) {
        this.content.css({
          height: this.content.height()
        });
      }
      contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH;
      paneHeight = this.pane.outerHeight();
      paneTop = parseInt(this.pane.css('top'), 10);
      paneBottom = parseInt(this.pane.css('bottom'), 10);
      paneOuterHeight = paneHeight + paneTop + paneBottom;
      sliderMinHeight = this.options.sliderMinHeight;
      sliderHeight = Math.round(paneOuterHeight / contentHeight * paneOuterHeight);
      sliderHeight = sliderHeight > this.options.sliderMinHeight ? sliderHeight : this.options.sliderMinHeight;
      if (contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL) {
        sliderHeight += BROWSER_SCROLLBAR_WIDTH;
      }
      maxSliderTop = paneOuterHeight - sliderHeight;
      this.contentHeight = contentHeight;
      this.paneHeight = paneHeight;
      this.paneOuterHeight = paneOuterHeight;
      this.sliderHeight = sliderHeight;
      this.maxSliderTop = maxSliderTop;
      this.slider.height(sliderHeight);
      this.events.scroll();
      this.pane.show();
      if (this.paneOuterHeight >= content.scrollHeight && contentStyleOverflowY !== SCROLL) {
        this.pane.hide();
      } else if (this.el.height() === content.scrollHeight && contentStyleOverflowY === SCROLL) {
        this.slider.hide();
      } else {
        this.slider.show();
      }
      return this;
    };

    NanoScroll.prototype.scroll = function() {
      this.sliderY = Math.max(0, this.sliderY);
      this.sliderY = Math.min(this.maxSliderTop, this.sliderY);
      this.content.scrollTop((this.paneHeight - this.contentHeight + BROWSER_SCROLLBAR_WIDTH) * this.sliderY / this.maxSliderTop * -1);
      this.slider.css({
        top: this.sliderY
      });
      return this;
    };

    NanoScroll.prototype.scrollBottom = function(offsetY) {
      this.reset();
      this.content.scrollTop(this.contentHeight - this.content.height() - offsetY).trigger(MOUSEWHEEL);
      return this;
    };

    NanoScroll.prototype.scrollTop = function(offsetY) {
      this.reset();
      this.content.scrollTop(+offsetY).trigger(MOUSEWHEEL);
      return this;
    };

    NanoScroll.prototype.scrollTo = function(node) {
      var fraction, new_slider, offset;
      this.reset();
      offset = $(node).offset().top;
      if (offset > this.maxSliderTop) {
        fraction = offset / this.contentHeight;
        new_slider = this.maxSliderTop * fraction;
        this.sliderY = new_slider;
        this.scroll();
      }
      return this;
    };

    NanoScroll.prototype.stop = function() {
      this.stopped = true;
      this.removeEvents();
      this.pane.hide();
      return this;
    };

    return NanoScroll;

  })();
  $.fn.nanoScroller = function(settings) {
    var options, scroll, scrollBottom, scrollTo, scrollTop, stop;
    if (settings != null) {
      scrollBottom = settings.scrollBottom, scrollTop = settings.scrollTop, scrollTo = settings.scrollTo, scroll = settings.scroll, stop = settings.stop;
    }
    options = $.extend({}, defaults, settings);
    this.each(function() {
      var me, scrollbar;
      me = this;
      scrollbar = $.data(me, SCROLLBAR);
      if (!scrollbar) {
        scrollbar = new NanoScroll(me, options);
        $.data(me, SCROLLBAR, scrollbar);
      } else {
        $.extend(scrollbar.options, settings);
      }
      if (scrollBottom) return scrollbar.scrollBottom(scrollBottom);
      if (scrollTop) return scrollbar.scrollTop(scrollTop);
      if (scrollTo) return scrollbar.scrollTo(scrollTo);
      if (scroll === 'bottom') return scrollbar.scrollBottom(0);
      if (scroll === 'top') return scrollbar.scrollTop(0);
      if (scroll instanceof $) return scrollbar.scrollTo(scroll);
      if (stop) return scrollbar.stop();
      return scrollbar.reset();
    });
  };
})(jQuery, window, document);
