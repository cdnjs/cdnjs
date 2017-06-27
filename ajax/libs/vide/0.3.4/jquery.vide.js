/*
 *  Vide - v0.3.4
 *  Easy as hell jQuery plugin for video backgrounds.
 *  http://vodkabears.github.io/vide/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */
!(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(root.jQuery);
  }
})(this, function($) {

  'use strict';

  /**
   * Name of the plugin
   * @private
   * @const
   * @type {String}
   */
  var PLUGIN_NAME = 'vide';

  /**
   * Default settings
   * @private
   * @const
   * @type {Object}
   */
  var DEFAULTS = {
    volume: 1,
    playbackRate: 1,
    muted: true,
    loop: true,
    autoplay: true,
    position: '50% 50%',
    posterType: 'detect',
    resizing: true
  };

  /**
   * Parse a string with options
   * @private
   * @param {String} str
   * @returns {Object|String}
   */
  function parseOptions(str) {
    var obj = {};
    var delimiterIndex;
    var option;
    var prop;
    var val;
    var arr;
    var len;
    var i;

    // Remove spaces around delimiters and split
    arr = str.replace(/\s*:\s*/g, ':').replace(/\s*,\s*/g, ',').split(',');

    // Parse a string
    for (i = 0, len = arr.length; i < len; i++) {
      option = arr[i];

      // Ignore urls and a string without colon delimiters
      if (
        option.search(/^(http|https|ftp):\/\//) !== -1 ||
        option.search(':') === -1
      ) {
        break;
      }

      delimiterIndex = option.indexOf(':');
      prop = option.substring(0, delimiterIndex);
      val = option.substring(delimiterIndex + 1);

      // If val is an empty string, make it undefined
      if (!val) {
        val = undefined;
      }

      // Convert a string value if it is like a boolean
      if (typeof val === 'string') {
        val = val === 'true' || (val === 'false' ? false : val);
      }

      // Convert a string value if it is like a number
      if (typeof val === 'string') {
        val = !isNaN(val) ? +val : val;
      }

      obj[prop] = val;
    }

    // If nothing is parsed
    if (prop == null && val == null) {
      return str;
    }

    return obj;
  }

  /**
   * Parse a position option
   * @private
   * @param {String} str
   * @returns {Object}
   */
  function parsePosition(str) {
    str = '' + str;

    // Default value is a center
    var args = str.split(/\s+/);
    var x = '50%';
    var y = '50%';
    var len;
    var arg;
    var i;

    for (i = 0, len = args.length; i < len; i++) {
      arg = args[i];

      // Convert values
      if (arg === 'left') {
        x = '0%';
      } else if (arg === 'right') {
        x = '100%';
      } else if (arg === 'top') {
        y = '0%';
      } else if (arg === 'bottom') {
        y = '100%';
      } else if (arg === 'center') {
        if (i === 0) {
          x = '50%';
        } else {
          y = '50%';
        }
      } else {
        if (i === 0) {
          x = arg;
        } else {
          y = arg;
        }
      }
    }

    return { x: x, y: y };
  }

  /**
   * Search a poster
   * @private
   * @param {String} path
   * @param {Function} callback
   */
  function findPoster(path, callback) {
    var onLoad = function() {
      callback(this.src);
    };

    $('<img src="' + path + '.gif">').load(onLoad);
    $('<img src="' + path + '.jpg">').load(onLoad);
    $('<img src="' + path + '.jpeg">').load(onLoad);
    $('<img src="' + path + '.png">').load(onLoad);
  }

  /**
   * Vide constructor
   * @param {HTMLElement} element
   * @param {Object|String} path
   * @param {Object|String} options
   * @constructor
   */
  function Vide(element, path, options) {
    this.$element = $(element);

    // Parse path
    if (typeof path === 'string') {
      path = parseOptions(path);
    }

    // Parse options
    if (!options) {
      options = {};
    } else if (typeof options === 'string') {
      options = parseOptions(options);
    }

    // Remove an extension
    if (typeof path === 'string') {
      path = path.replace(/\.\w*$/, '');
    } else if (typeof path === 'object') {
      for (var i in path) {
        if (path.hasOwnProperty(i)) {
          path[i] = path[i].replace(/\.\w*$/, '');
        }
      }
    }

    this.settings = $.extend({}, DEFAULTS, options);
    this.path = path;

    this.init();
  }

  /**
   * Initialization
   * @public
   */
  Vide.prototype.init = function() {
    var vide = this;
    var position = parsePosition(vide.settings.position);
    var sources = '';
    var poster;

    // Set styles of a video wrapper
    vide.$wrapper = $('<div>').css({
      position: 'absolute',
      'z-index': -1,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      overflow: 'hidden',
      '-webkit-background-size': 'cover',
      '-moz-background-size': 'cover',
      '-o-background-size': 'cover',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': position.x + ' ' + position.y
    });

    // Get a poster path
    poster = vide.path;
    if (typeof vide.path === 'object') {
      if (vide.path.poster) {
        poster = vide.path.poster;
      } else {
        if (vide.path.mp4) {
          poster = vide.path.mp4;
        } else if (vide.path.webm) {
          poster = vide.path.webm;
        } else if (vide.path.ogv) {
          poster = vide.path.ogv;
        }
      }
    }

    // Set a video poster
    if (vide.settings.posterType === 'detect') {
      findPoster(poster, function(url) {
        vide.$wrapper.css('background-image', 'url(' + url + ')');
      });
    } else if (vide.settings.posterType !== 'none') {
      vide.$wrapper
        .css('background-image', 'url(' + poster + '.' + vide.settings.posterType + ')');
    }

    // If a parent element has a static position, make it relative
    if (vide.$element.css('position') === 'static') {
      vide.$element.css('position', 'relative');
    }

    vide.$element.prepend(vide.$wrapper);

    if (typeof vide.path === 'object') {
      if (vide.path.mp4) {
        sources += '<source src="' + vide.path.mp4 + '.mp4" type="video/mp4">';
      }

      if (vide.path.webm) {
        sources += '<source src="' + vide.path.webm + '.webm" type="video/webm">';
      }

      if (vide.path.ogv) {
        sources += '<source src="' + vide.path.ogv + '.ogv" type="video/ogv">';
      }

      vide.$video = $('<video>' + sources + '</video>');
    } else {
      vide.$video = $('<video>' +
        '<source src="' + vide.path + '.mp4" type="video/mp4">' +
        '<source src="' + vide.path + '.webm" type="video/webm">' +
        '<source src="' + vide.path + '.ogv" type="video/ogg">' +
        '</video>');
    }

    vide.$video

      // Set video properties
      .prop({
        autoplay: vide.settings.autoplay,
        loop: vide.settings.loop,
        volume: vide.settings.volume,
        muted: vide.settings.muted,
        defaultMuted: vide.settings.muted,
        playbackRate: vide.settings.playbackRate,
        defaultPlaybackRate: vide.settings.playbackRate
      })

      // Video alignment
      .css({
        margin: 'auto',
        position: 'absolute',
        'z-index': -1,
        top: position.y,
        left: position.x,
        '-webkit-transform': 'translate(-' + position.x + ', -' + position.y + ')',
        '-ms-transform': 'translate(-' + position.x + ', -' + position.y + ')',
        '-moz-transform': 'translate(-' + position.x + ', -' + position.y + ')',
        transform: 'translate(-' + position.x + ', -' + position.y + ')',

        // Disable visibility, while loading
        visibility: 'hidden'
      })

      // Resize a video, when it's loaded
      .on('canplaythrough.' + PLUGIN_NAME, function() {
        vide.$video.css('visibility', 'visible');
        vide.resize();
        vide.$wrapper.css('background-image', 'none');
      });

    // Resize event is available only for 'window'
    // Use another code solutions to detect DOM elements resizing
    vide.$element.on('resize.' + PLUGIN_NAME, function() {
      if (vide.settings.resizing) {
        vide.resize();
      }
    });

    // Append a video
    vide.$wrapper.append(vide.$video);
  };

  /**
   * Get a video element
   * @public
   * @returns {HTMLVideoElement}
   */
  Vide.prototype.getVideoObject = function() {
    return this.$video[0];
  };

  /**
   * Resize a video background
   * @public
   */
  Vide.prototype.resize = function() {
    if (!this.$video) {
      return;
    }

    // Get a native video size
    var videoHeight = this.$video[0].videoHeight;
    var videoWidth = this.$video[0].videoWidth;

    // Get a wrapper size
    var wrapperHeight = this.$wrapper.height();
    var wrapperWidth = this.$wrapper.width();

    if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
      this.$video.css({

        // +2 pixels to prevent an empty space after transformation
        width: wrapperWidth + 2,
        height: 'auto'
      });
    } else {
      this.$video.css({
        width: 'auto',

        // +2 pixels to prevent an empty space after transformation
        height: wrapperHeight + 2
      });
    }
  };

  /**
   * Destroy a video background
   * @public
   */
  Vide.prototype.destroy = function() {
    this.$element.off(PLUGIN_NAME);

    if (this.$video) {
      this.$video.off(PLUGIN_NAME);
    }

    delete $[PLUGIN_NAME].lookup[this.index];
    this.$element.removeData(PLUGIN_NAME);
    this.$wrapper.remove();
  };

  /**
   * Special plugin object for instances.
   * @public
   * @type {Object}
   */
  $[PLUGIN_NAME] = {
    lookup: []
  };

  /**
   * Plugin constructor
   * @param {Object|String} path
   * @param {Object|String} options
   * @returns {JQuery}
   * @constructor
   */
  $.fn[PLUGIN_NAME] = function(path, options) {
    var instance;

    this.each(function() {
      instance = $.data(this, PLUGIN_NAME);

      if (instance) {

        // Destroy the plugin instance if exists
        instance.destroy();
      }

      // Create the plugin instance
      instance = new Vide(this, path, options);
      instance.index = $[PLUGIN_NAME].lookup.push(instance) - 1;
      $.data(this, PLUGIN_NAME, instance);
    });

    return this;
  };

  $(document).ready(function() {
    var $window = $(window);

    // Window resize event listener
    $window.on('resize.' + PLUGIN_NAME, function() {
      for (var len = $[PLUGIN_NAME].lookup.length, i = 0, instance; i < len; i++) {
        instance = $[PLUGIN_NAME].lookup[i];

        if (instance && instance.settings.resizing) {
          instance.resize();
        }
      }
    });

    // https://github.com/VodkaBears/Vide/issues/68
    $window.on('unload.' + PLUGIN_NAME, function() {
      return false;
    });

    // Auto initialization
    // Add 'data-vide-bg' attribute with a path to the video without extension
    // Also you can pass options throw the 'data-vide-options' attribute
    // 'data-vide-options' must be like 'muted: false, volume: 0.5'
    $(document).find('[data-' + PLUGIN_NAME + '-bg]').each(function(i, element) {
      var $element = $(element);
      var options = $element.data(PLUGIN_NAME + '-options');
      var path = $element.data(PLUGIN_NAME + '-bg');

      $element[PLUGIN_NAME](path, options);
    });
  });

});
