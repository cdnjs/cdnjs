/*!
 * jQuery.BgSwitcher
 *
 * @version  0.4.0
 * @author   rewish <rewish.org@gmail.com>
 * @license  MIT License (https://github.com/rewish/jquery-bgswitcher/LICENSE.md)
 * @link     https://github.com/rewish/jquery-bgswitcher
 */
!function($) {
  'use strict';

  var loadedImages = {},

      slice = Array.prototype.slice,
      toString = Object.prototype.toString,

      edges = ['Top', 'Right', 'Bottom', 'Left'],
      backgroundProperties = [
        'Attachment', 'Color', 'Image', 'Repeat',
        'Position', 'Size', 'Clip', 'Origin'
      ];

  $.fn.bgswitcher = function() {
    var args = arguments,
        instanceKey = BgSwitcher.keys.instance;

    return this.each(function() {
      var instance = $.data(this, instanceKey);

      if (!instance) {
        instance = new BgSwitcher(this);
        $.data(this, instanceKey, instance);
      }

      instance.dispatch.apply(instance, args);
    });
  };

  // Backward Compatibility
  $.fn.bgSwitcher = $.fn.bgswitcher;

  /**
   * BgSwitcher
   *
   * @param {HTMLElement} el
   * @constructor
   */
  function BgSwitcher(el) {
    this.$el = $(el);
    this.index = 0;
    this.config = $.extend({}, BgSwitcher.defaultConfig);

    this._setupBackgroundElement();
    this._listenToResize();
  }

  $.extend(BgSwitcher.prototype, {
    /**
     * Dispatch
     *
     * @param {string|Array} one
     */
    dispatch: function(one) {
      switch (toString.call(one)) {
        case '[object String]':
          this[one].apply(this, slice.call(arguments, 1));
          break;
        case '[object Object]':
          this.setConfig(one);
          break;
        default:
          this.setConfig();
      }
    },

    /**
     * Set config
     *
     * @param {Object} config
     */
    setConfig: function(config) {
      this.config = $.extend(this.config, config);

      if (typeof this.config.random !== 'undefined') {
        this.config.shuffle = this.config.random;
      }

      this._prepare();
    },

    /**
     * Set images
     *
     * @param {Array} images
     */
    setImages: function(images) {
      this.imageList = new this.constructor.ImageList(images);
      this.config && this.config.shuffle && this.imageList.shuffle();
    },

    /**
     * Set switch handler
     *
     * @param {Function} fn
     */
    setSwitchHandler: function(fn) {
      this.switchHandler = $.proxy(fn, this);
    },

    /**
     * Default switch handler
     *
     * @param {string} type
     * @returns {Function}
     */
    getBuiltInSwitchHandler: function(type) {
      return this.constructor.switchHandlers[type || this.config.effect];
    },

    /**
     * Adjust rectangle
     */
    adjustRectangle: function() {
      var edge, i = 0,
          offset = this.$el.position(),
          copiedStyles = {
            top: offset.top,
            left: offset.left,
            width: this.$el.innerWidth(),
            height: this.$el.innerHeight()
          };

      while (edge = edges[i++]) {
        copiedStyles['margin' + edge] = this.$el.css('margin' + edge);
        copiedStyles['border' + edge] = this.$el.css('border' + edge);
      }

      this.$bg.css(copiedStyles);
    },

    /**
     * Start switching
     */
    start: function() {
      if (!this._timerID) {
        this._timerID = setTimeout($.proxy(this, 'next'), this.config.interval);
      }
    },

    /**
     * Stop switching
     */
    stop: function() {
      if (this._timerID) {
        clearTimeout(this._timerID);
        this._timerID = null;
      }
    },

    /**
     * Toggle between start/stop
     */
    toggle: function() {
      if (this._timerID) {
        this.stop();
      } else {
        this.start();
      }
    },

    /**
     * Reset switching
     */
    reset: function() {
      this.index = 0;
      this._prepareSwitching();
    },

    /**
     * Go to next switching
     */
    next: function() {
      var max = this.imageList.count();

      if (!this.config.loop && this.index + 1 === max) {
        return;
      }

      if (++this.index === max) {
        this.index = 0;
      }

      this.switching();
    },

    /**
     * Go to previous switching
     */
    prev: function() {
      if (!this.config.loop && this.index === 0) {
        return;
      }

      if (--this.index === -1) {
        this.index = this.imageList.count() - 1;
      }

      this.switching();
    },

    /**
     * Switching the background image
     */
    switching: function() {
      var started = !!this._timerID;
      started && this.stop();

      this.$clone && this.$clone.remove();
      this.$clone = this.$bg.clone();
      this.$clone.css({top: 0, left: 0, border: 'none'});
      this.$bg.append(this.$clone);
      this._prepareSwitching();
      this.switchHandler(this.$clone);

      started && this.start();
    },

    /**
     * Destroy...
     */
    destroy: function() {
      this.stop();
      this._stopListeningToResize();

      if (this.$clone) {
        this.$clone.stop();
        this.$clone.remove();
        this.$clone = null;
      }

      if (this.$bg) {
        this.$bg.remove();
        this.$bg = null;
      }

      this.$el.removeAttr('style');
      this.$el.removeData(this.constructor.keys.instance);
      this.$el = null;
    },

    /**
     * Prepare
     */
    _prepare: function() {
      this.setImages(this.config.images);
      this.setSwitchHandler(this.getBuiltInSwitchHandler());
      this._prepareSwitching();
      this.config.start && this.start();
    },

    /**
     * Setup background element
     */
    _setupBackgroundElement: function() {
      this.$bg = $(document.createElement('div'));
      this.$bg.css({
        position: 'absolute',
        zIndex: (this.$el.css('zIndex')|0) - 1,
        overflow: 'hidden'
      });

      this._copyBackgroundStyles();
      this.adjustRectangle();

      if (this.$el[0].tagName === 'BODY') {
        this.$el.prepend(this.$bg);
      } else {
        this.$el.before(this.$bg);
        this.$el.css('background', 'none');
      }
    },

    /**
     * Copy background styles
     */
    _copyBackgroundStyles: function () {
      var prop,
          copiedStyle = {},
          i = 0;

      while (prop = backgroundProperties[i++]) {
        prop = 'background' + prop;
        copiedStyle[prop] = this.$el.css(prop);
      }

      this.$bg.css(copiedStyle);
    },

    /**
     * Listen to the resize event
     */
    _listenToResize: function() {
      var that = this;
      this._resizeHandler = function() {
        that.adjustRectangle();
      };
      $(window).on('resize', this._resizeHandler);
    },

    /**
     * Stop listening to the resize event
     */
    _stopListeningToResize: function() {
      $(window).off('resize', this._resizeHandler);
      this._resizeHandler = null;
    },

    /**
     * Prepare to switching the background image
     */
    _prepareSwitching: function() {
      this.$bg.css('backgroundImage', this.imageList.url(this.index));
    }
  });

  /**
   * Data Keys
   * @type {Object}
   */
  BgSwitcher.keys = {
    instance: 'bgSwitcher'
  };

  /**
   * Default Config
   * @type {Object}
   */
  BgSwitcher.defaultConfig = {
    images: [],
    interval: 5000,
    start: true,
    loop: true,
    shuffle: false,
    effect: 'fade',
    duration: 1000,
    easing: 'swing'
  };

  /**
   * Built-In switch handlers (effects)
   * @type {Object}
   */
  BgSwitcher.switchHandlers = {
    fade: function($el) {
      $el.animate({opacity: 0}, this.config.duration, this.config.easing);
    },

    blind: function($el) {
      $el.animate({height: 0}, this.config.duration, this.config.easing);
    },

    clip: function($el) {
      $el.animate({
        top: parseInt($el.css('top'), 10) + $el.height() / 2,
        height: 0
      }, this.config.duration, this.config.easing);
    },

    slide: function($el) {
      $el.animate({top: -$el.height()}, this.config.duration, this.config.easing);
    },

    drop: function($el) {
      $el.animate({
        left: -$el.width(),
        opacity: 0
      }, this.config.duration, this.config.easing);
    },

    hide: function($el) {
      $el.hide();
    }
  };

  /**
   * BgSwitcher.ImageList
   *
   * @param {Array} images
   * @constructor
   */
  BgSwitcher.ImageList = function(images) {
    this.images = images;
    this.createImagesBySequence();
    this.preload();
  };

  $.extend(BgSwitcher.ImageList.prototype, {
    /**
     * Images is sequenceable
     *
     * @returns {boolean}
     */
    isSequenceable: function() {
      return typeof this.images[0] === 'string' &&
          typeof this.images[1] === 'number' &&
          typeof this.images[2] === 'number';
    },

    /**
     * Create an images by sequence
     */
    createImagesBySequence: function() {
      if (!this.isSequenceable()) {
        return;
      }

      var images = [],
          base = this.images[0],
          min = this.images[1],
          max = this.images[2];

      do {
        images.push(base.replace(/\.\w+$/, min + '$&'));
      } while (++min <= max);

      this.images = images;
    },

    /**
     * Preload an images
     */
    preload: function() {
      var path, i = 0;

      while (path = this.images[i++]) {
        if (!loadedImages[path]) {
          loadedImages[path] = new Image();
          loadedImages[path].src = path;
        }
      }
    },

    /**
     * Shuffle an images
     */
    shuffle: function() {
      var j, t,
          i = this.images.length,
          original = this.images.join();

      if (!i) {
        return;
      }

      while (i) {
        j = Math.floor(Math.random() * i);
        t = this.images[--i];
        this.images[i] = this.images[j];
        this.images[j] = t;
      }

      if (this.images.join() === original) {
        this.shuffle();
      }
    },

    /**
     * Get the image from index
     *
     * @param {number} index
     * @returns {string}
     */
    get: function(index) {
      return this.images[index];
    },

    /**
     * Get the URL with function of CSS
     *
     * @param {number} index
     * @returns {string}
     */
    url: function(index) {
      return 'url(' + this.get(index) + ')';
    },

    /**
     * Count of images
     *
     * @returns {number}
     */
    count: function() {
      return this.images.length;
    }
  });

  $.BgSwitcher = BgSwitcher;
}(jQuery);
