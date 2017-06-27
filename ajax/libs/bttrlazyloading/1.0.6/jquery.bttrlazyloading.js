/*
BttrLazyLoading, Responsive Lazy Loading plugin for JQuery
by Julien Renaux http://bttrlazyloading.julienrenaux.fr

Version: 1.0.6
Full source at https://github.com/shprink/BttrLazyLoading

MIT License, https://github.com/shprink/BttrLazyLoading/blob/master/LICENSE
*/
(function() {
  "use strict";
  var $, BttrLazyLoading, BttrLazyLoadingGlobal;

  $ = jQuery;

  BttrLazyLoading = (function() {
    var _getImageSrc, _getImgObject, _getImgObjectPerRange, _getLargestImgObject, _getRangeFromScreenSize, _isUpdatable, _isWithinViewport, _setOptionsFromData, _setupEvents, _update, _updateCanvasSize;

    BttrLazyLoading.dpr = 1;

    function BttrLazyLoading(img, options) {
      var defaultOptions;
      if (options == null) {
        options = {};
      }
      this.$img = $(img);
      this.loaded = false;
      this.loading = false;
      defaultOptions = $.extend(true, {}, $.bttrlazyloading.constructor.options);
      this.options = $.extend(true, defaultOptions, options);
      this.ranges = $.bttrlazyloading.constructor.ranges;
      this.$container = $(this.options.container);
      if (typeof window.devicePixelRatio === 'number') {
        this.constructor.dpr = window.devicePixelRatio;
      }
      this.whiteList = ['lg', 'md', 'sm', 'xs'];
      this.blackList = [];
      _setOptionsFromData.call(this);
      this.$wrapper = $('<span class="bttrlazyloading-wrapper"></span>');
      if (this.options.wrapperClasses && typeof this.options.wrapperClasses === 'string') {
        this.$wrapper.addClass(this.options.wrapperClasses);
      }
      this.$img.before(this.$wrapper);
      this.$clone = $('<canvas class="bttrlazyloading-clone"></canvas>');
      _updateCanvasSize.call(this);
      this.$wrapper.append(this.$clone);
      this.$img.hide();
      this.$wrapper.append(this.$img);
      if (this.options.backgroundcolor) {
        this.$wrapper.css('background-color', this.options.backgroundcolor);
      }
      _setupEvents.call(this, 'on');
      setTimeout((function(_this) {
        return function() {
          return _update.call(_this);
        };
      })(this), 100);
    }


    /*
    	Private Functions
     */

    _updateCanvasSize = function() {
      var imgObject;
      imgObject = _getImgObject.call(this);
      this.$clone.attr('width', imgObject.width);
      return this.$clone.attr('height', imgObject.height);
    };

    _setOptionsFromData = function() {
      return $.each(this.$img.data(), (function(_this) {
        return function(i, v) {
          if (v) {
            if (i.indexOf('bttrlazyloading') !== 0) {
              return false;
            }
            i = i.replace('bttrlazyloading', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().split('-');
            if (i.length > 1) {
              if (typeof _this.options[i[0]][i[1]] !== 'undefined') {
                return _this.options[i[0]][i[1]] = v;
              }
            } else {
              if (typeof v === 'object') {
                return $.extend(_this.options[i[0]], v);
              } else {
                if (typeof _this.options[i[0]] !== 'undefined') {
                  return _this.options[i[0]] = v;
                }
              }
            }
          }
        };
      })(this));
    };

    _setupEvents = function(onOrOff) {
      var onBttrLoad, onError, onLoad, update;
      onLoad = (function(_this) {
        return function() {
          _this.$clone.hide();
          _this.$img.show();
          _this.$wrapper.addClass('bttrlazyloading-loaded');
          if (_this.options.animation) {
            _this.$img.addClass('animated ' + _this.options.animation);
          }
          _this.loaded = _this.$img.attr('src');
          return _this.$img.trigger('bttrlazyloading.afterLoad');
        };
      })(this);
      this.$img[onOrOff]('load', onLoad);
      onBttrLoad = (function(_this) {
        return function(e) {
          var imgObject;
          if (!_this.loading) {
            _this.loading = true;
            imgObject = _getImgObject.call(_this);
            if (!_this.loaded) {
              _this.$wrapper.css('background-image', "url('" + _this.options.placeholder + "')");
            } else {
              _this.$wrapper.removeClass('bttrlazyloading-loaded');
              if (_this.options.animation) {
                _this.$img.removeClass('animated ' + _this.options.animation);
              }
              _this.$img.removeAttr('src');
              _this.$img.hide();
              _this.$clone.attr('width', imgObject.width);
              _this.$clone.attr('height', imgObject.height);
              _this.$clone.show();
            }
            return setTimeout(function() {
              _this.$img.trigger('bttrlazyloading.beforeLoad');
              _this.$img.data('bttrlazyloading.range', imgObject.range);
              _this.$img.attr('src', _getImageSrc.call(_this, imgObject.src, imgObject.range));
              return _this.loading = false;
            }, _this.options.delay);
          }
        };
      })(this);
      this.$img[onOrOff]('bttrlazyloading.load', onBttrLoad);
      onError = (function(_this) {
        return function(e) {
          var range, src;
          src = _this.$img.attr('src');
          range = _this.$img.data('bttrlazyloading.range');
          if (_this.constructor.dpr >= 2 && _this.options.retina && src.match(/@2x/gi)) {
            _this.blackList.push(range + '@2x');
          } else {
            _this.blackList.push(range);
            _this.whiteList.splice(_this.whiteList.indexOf(range), 1);
            if (_this.whiteList.length === 0) {
              _this.$img.trigger('bttrlazyloading.error');
              return false;
            }
          }
          return _this.$img.trigger('bttrlazyloading.load');
        };
      })(this);
      this.$img[onOrOff]('error', onError);
      update = (function(_this) {
        return function(e) {
          return _update.call(_this);
        };
      })(this);
      this.$container[onOrOff](this.options.event, update);
      if (this.options.container !== window) {
        $(window)[onOrOff](this.options.event, update);
      }
      return $(window)[onOrOff]("resize", update);
    };

    _getRangeFromScreenSize = function() {
      var ww;
      ww = window.innerWidth;
      if (ww <= this.ranges.xs) {
        return 'xs';
      } else if ((this.ranges.sm <= ww && ww < this.ranges.md)) {
        return 'sm';
      } else if ((this.ranges.md <= ww && ww < this.ranges.lg)) {
        return 'md';
      } else if (this.ranges.lg <= ww) {
        return 'lg';
      }
    };

    _getImgObject = function() {
      this.range = _getRangeFromScreenSize.call(this);
      return _getLargestImgObject.call(this);
    };

    _getImageSrc = function(src, range) {
      if (this.constructor.dpr >= 2 && this.options.retina && this.blackList.indexOf(range + '@2x') === -1) {
        return src.replace(/\.\w+$/, function(match) {
          return '@2x' + match;
        });
      } else {
        return src;
      }
    };

    _getImgObjectPerRange = function(range) {
      if (typeof this.options[range].src !== 'undefined' && this.options[range].src !== null) {
        return this.options[range];
      }
      return null;
    };

    _getLargestImgObject = function() {
      var index, range, src, _i, _len, _ref;
      index = this.whiteList.indexOf(this.range);
      if (index > -1) {
        src = _getImgObjectPerRange.call(this, this.range);
        if (src) {
          src.range = this.range;
          return src;
        }
      }
      _ref = this.whiteList;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        range = _ref[index];
        src = _getImgObjectPerRange.call(this, range);
        if (src) {
          src.range = range;
          return src;
        }
      }
      return '';
    };

    _isUpdatable = function() {
      var imgObject, isWithinWindowViewport, threshold;
      if (!this.loaded && this.options.triggermanually) {
        return false;
      }
      if (this.loaded && this.options.updatemanually) {
        return false;
      }
      imgObject = _getImgObject.call(this);
      if (!imgObject.src || this.loaded === _getImageSrc.call(this, imgObject.src, imgObject.range)) {
        return false;
      }
      threshold = 0;
      if (!this.loaded) {
        threshold = this.options.threshold;
      }
      isWithinWindowViewport = _isWithinViewport.call(this, $(window), {
        top: $(window).scrollTop() + threshold,
        left: $(window).scrollLeft()
      });
      if (this.options.container !== window) {
        return isWithinWindowViewport && _isWithinViewport.call(this, this.$container, {
          top: this.$container.offset().top + threshold,
          left: this.$container.offset().left
        });
      }
      return isWithinWindowViewport;
    };

    _isWithinViewport = function($container, viewport) {
      var bounds;
      if (viewport == null) {
        viewport = {};
      }
      viewport.right = viewport.left + $container.width();
      viewport.bottom = viewport.top + $container.height();
      bounds = this.$wrapper.offset();
      bounds.right = bounds.left + this.$wrapper.outerWidth();
      bounds.bottom = bounds.top + this.$wrapper.outerHeight();
      return !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
    };

    _update = function() {
      if (this.range !== _getRangeFromScreenSize.call(this)) {
        _updateCanvasSize.call(this);
      }
      if (_isUpdatable.call(this)) {
        return this.$img.trigger('bttrlazyloading.load');
      }
    };


    /*
    	Public Functions
     */

    BttrLazyLoading.prototype.get$Img = function() {
      return this.$img;
    };

    BttrLazyLoading.prototype.get$Clone = function() {
      return this.$clone;
    };

    BttrLazyLoading.prototype.get$Wrapper = function() {
      return this.$wrapper;
    };

    BttrLazyLoading.prototype.destroy = function() {
      this.$wrapper.before(this.$img);
      this.$wrapper.remove();
      _setupEvents.call(this, 'off');
      this.$img.off('bttrlazyloading');
      this.$wrapper.removeClass('bttrlazyloading-loaded');
      if (this.options.animation) {
        this.$img.removeClass('animated ' + this.options.animation);
      }
      this.$img.removeData('bttrlazyloading');
      return this.$img;
    };

    return BttrLazyLoading;

  })();

  $.fn.extend({
    bttrlazyloading: function(options) {
      return this.each(function() {
        var $this, data;
        $this = $(this);
        data = $this.data('bttrlazyloading');
        if (typeof data === 'undefined') {
          data = new BttrLazyLoading(this, options);
          $this.data('bttrlazyloading', data);
        }
        if (typeof options === 'string' && typeof data[options] !== 'undefined') {
          return data[options].call(data);
        }
      });
    }
  });

  $.fn.bttrlazyloading.Constructor = BttrLazyLoading;

  BttrLazyLoadingGlobal = (function() {
    function BttrLazyLoadingGlobal() {}

    BttrLazyLoadingGlobal.prototype.version = '1.0.3';

    BttrLazyLoadingGlobal.ranges = {
      xs: 767,
      sm: 768,
      md: 992,
      lg: 1200
    };

    BttrLazyLoadingGlobal.options = {
      xs: {
        src: null,
        width: 100,
        height: 100
      },
      sm: {
        src: null,
        width: 100,
        height: 100
      },
      md: {
        src: null,
        width: 100,
        height: 100
      },
      lg: {
        src: null,
        width: 100,
        height: 100
      },
      retina: false,
      animation: 'bounceIn',
      delay: 0,
      event: 'scroll',
      container: window,
      threshold: 0,
      triggermanually: false,
      updatemanually: false,
      wrapperClasses: null,
      backgroundcolor: '#EEE',
      placeholder: 'data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'
    };

    BttrLazyLoadingGlobal.prototype.setOptions = function(object) {
      if (object == null) {
        object = {};
      }
      $.extend(true, this.constructor.options, object);
      return this;
    };

    BttrLazyLoadingGlobal.prototype.setRanges = function(object) {
      if (object == null) {
        object = {};
      }
      $.extend(true, this.constructor.ranges, object);
      return this;
    };

    return BttrLazyLoadingGlobal;

  })();

  $.bttrlazyloading = new BttrLazyLoadingGlobal();

}).call(this);
