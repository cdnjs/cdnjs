/*!
 * A lightweight, dependency-free and responsive javascript plugin for particle backgrounds.
 *
 * @author Marc Bruederlin <hello@marcbruederlin.com>
 * @version 2.2.0
 * @license MIT
 * @see https://github.com/marcbruederlin/particles.js
 */

/* exported Particles */
var Particles = (function(window, document) {
  'use strict';

  var Plugin, Particle = {};

  function particleCompareFunc(p1, p2) {
    if (p1.x < p2.x) {
      return -1;
    } else if (p1.x > p2.x) {
      return 1;
    } else if (p1.y < p2.y) {
      return -1;
    } else if (p1.y > p2.y) {
      return 1;
    }

    return 0;
  }

  /**
   * Represents the plugin.
   *
   * @constructor
   */
  Plugin = (function() {
    function Plugin() {
      var _ = this;

      _.defaults = {
        responsive: null,
        selector: null,
        maxParticles: 100,
        sizeVariations: 3,
        showParticles: true,
        speed: 0.5,
        color: '#000000',
        minDistance: 120,
        connectParticles: false,
      };

      _.element = null;
      _.context = null;
      _.ratio = null;
      _.breakpoints = [];
      _.activeBreakpoint = null;
      _.breakpointSettings = [];
      _.originalSettings = null;
      _.storage = [];
      _.usingPolyfill = false;
    }

    return Plugin;
  }());

  /**
   * Initializes the plugin with user settings.
   *
   * @public
   * @param {object} settings
   */
  Plugin.prototype.init = function(settings) {
    var _ = this;

    _.options = _._extend(_.defaults, settings);
    _.originalSettings = JSON.parse(JSON.stringify(_.options));

    _._animate = _._animate.bind(_);

    _._initializeCanvas();
    _._initializeEvents();
    _._registerBreakpoints();
    _._checkResponsive();
    _._initializeStorage();
    _._animate();

    return _;
  };

  /**
   * Setup the canvas element.
   *
   * @private
   */
  Plugin.prototype._initializeCanvas = function() {
    var _ = this, devicePixelRatio, backingStoreRatio;

    if(!_.options.selector) {
      console.warn('particles.js: No selector specified! Check https://github.com/marcbruederlin/particles.js#options');
      return false;
    }

    _.element = document.querySelector(_.options.selector);
    _.context = _.element.getContext('2d');

    devicePixelRatio = window.devicePixelRatio || 1;
    backingStoreRatio = _.context.webkitBackingStorePixelRatio || _.context.mozBackingStorePixelRatio || _.context.msBackingStorePixelRatio ||
                        _.context.oBackingStorePixelRatio || _.context.backingStorePixelRatio || 1;

    _.ratio = devicePixelRatio / backingStoreRatio;

    _.element.width = _.element.offsetParent.clientWidth * _.ratio;
    if (_.element.offsetParent.nodeName === 'BODY') {
      _.element.height = window.innerHeight * _.ratio;
    } else {
      _.element.height = _.element.offsetParent.clientHeight * _.ratio;
    }
    _.element.style.width = '100%';
    _.element.style.height = '100%';

    _.context.scale(_.ratio, _.ratio);
  };

  /**
   * Register event listeners.
   *
   * @private
   */
  Plugin.prototype._initializeEvents = function() {
    var _ = this;

    window.addEventListener('resize', _._resize.bind(_), false);
  };

  /**
   * Initialize the particle storage.
   *
   * @private
   */
  Plugin.prototype._initializeStorage = function() {
    var _ = this;

    _.storage = [];

    for(var i = _.options.maxParticles; i--;) {
      _.storage.push(new Particle(_.context, _.options));
    }
  };

  /**
   * Register responsive breakpoints if the user declared some.
   *
   * @private
   */
  Plugin.prototype._registerBreakpoints = function() {
    var _ = this, breakpoint, currentBreakpoint, l, responsiveSettings = _.options.responsive || null;

    if(typeof responsiveSettings === 'object' && responsiveSettings !== null && responsiveSettings.length) {
      for(breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;
        currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

        if(responsiveSettings.hasOwnProperty(breakpoint)) {
          if(responsiveSettings[breakpoint].options.color) {
            responsiveSettings[breakpoint].options.color = _._hex2rgb(responsiveSettings[breakpoint].options.color);
          }

          while(l >= 0) {
            if(_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }

            l--;
          }

          _.breakpoints.push(currentBreakpoint);
          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].options;
        }
      }

      _.breakpoints.sort(function(a, b) {
        return b-a;
      });
    }
  };

  /**
   * Check if a breakpoint is active and load the breakpoints options.
   *
   * @private
   */
  Plugin.prototype._checkResponsive = function() {
    var _ = this, breakpoint, targetBreakpoint = false, windowWidth = window.innerWidth;

    if(_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
      targetBreakpoint = null;

      for(breakpoint in _.breakpoints) {
        if(_.breakpoints.hasOwnProperty(breakpoint)) {
          if(windowWidth <= _.breakpoints[breakpoint]) {
            targetBreakpoint = _.breakpoints[breakpoint];
          }
        }
      }

      if(targetBreakpoint !== null) {
        _.activeBreakpoint = targetBreakpoint;
        _.options = _._extend(_.options, _.breakpointSettings[targetBreakpoint]);
      } else {
        if(_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          targetBreakpoint = null;

          _.options = _._extend(_.options, _.originalSettings);
        }
      }
    }
  };

  /**
   * Rebuild the storage and update the canvas.
   *
   * @private
   */
  Plugin.prototype._refresh = function() {
    var _ = this;

    _._initializeStorage();
    _._draw();
  };

  /**
   * Kick off various things on window resize.
   *
   * @private
   */
  Plugin.prototype._resize = function() {
    var _ = this;

    _.element.width = _.element.offsetParent.clientWidth * _.ratio;

    if (_.element.offsetParent.nodeName === 'BODY') {
      _.element.height = window.innerHeight * _.ratio;
    } else {
      _.element.height = _.element.offsetParent.clientHeight * _.ratio;
    }

    _.context.scale(_.ratio, _.ratio);

    clearTimeout(_.windowDelay);

    _.windowDelay = window.setTimeout(function() {
      _._checkResponsive();
      _._refresh();
    }, 50);
  };

  /**
   * Animates the plugin particles by calling the draw method.
   *
   * @private
   */
  Plugin.prototype._animate = function() {
    var _ = this;

    _._draw();
    _._animation = window.requestAnimFrame(_._animate);
  };

  /**
   * Restarts the particles animation by calling _animate.
   *
   * @public
   */
  Plugin.prototype.resumeAnimation = function() {
    var _ = this;

    if (!_._animation) {
      _._animate();
    }
  };

  /**
   * Pauses/stops the particle animation.
   *
   * @public
   */
  Plugin.prototype.pauseAnimation = function() {
    var _ = this;

    if (!_._animation) {
      return;
    }

    if (_.usingPolyfill) {
      window.clearTimeout(_._animation);
    } else {
      var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;
      cancelAnimationFrame(_._animation);
    }

    _._animation = null;
  };

  /**
   * Draws the plugin particles.
   *
   * @private
   */
  Plugin.prototype._draw = function() {
    var _ = this,
        element = _.element,
        parentWidth = element.offsetParent.clientWidth,
        parentHeight = element.offsetParent.clientHeight,
        showParticles = _.options.showParticles,
        storage = _.storage;

    if (element.offsetParent.nodeName === 'BODY') {
      parentHeight = window.innerHeight;
    }

    _.context.clearRect(0, 0, element.width, element.height);
    _.context.beginPath();

    for(var i = storage.length; i--;) {
      var particle = storage[i];
      
      if (showParticles) {
        particle._draw();
      }

      particle._updateCoordinates(parentWidth, parentHeight);
    }

    if (_.options.connectParticles) {
      storage.sort(particleCompareFunc);
      _._updateEdges();
    }
  };

  /**
   * Updates the edges.
   *
   * @private
   */
  Plugin.prototype._updateEdges = function() {
    var _ = this,
        minDistance = _.options.minDistance,
        sqrt = Math.sqrt,
        abs = Math.abs,
        storage = _.storage,
        storageLength = storage.length;

    for(var i = 0; i < storageLength; i++) {
      var p1 = storage[i];

      for(var j = i + 1; j < storageLength; j++) {
        var p2 = storage[j],
            distance, r = p1.x - p2.x, dy = p1.y - p2.y;

        distance = sqrt(r * r + dy * dy);

        if (abs(r) > minDistance) {
          break;
        }

        if (distance <= minDistance) {
          _._drawEdge(p1, p2, (1.2 - distance/minDistance));
        }
      }
    }
  };

  /**
   * Draws an edge between two points.
   *
   * @private
   * @param {Particle} p1
   * @param {Particle} p2
   * @param {number} opacity
   */
  Plugin.prototype._drawEdge = function(p1, p2, opacity) {
    var _ = this,
        gradient = _.context.createLinearGradient(p1.x, p1.y, p2.x, p2.y);

    var color1 = this._hex2rgb(p1.color);
    var color2 = this._hex2rgb(p2.color);

    gradient.addColorStop(0, 'rgba(' + color1.r + ',' + color1.g + ',' + color1.b + ',' + opacity);
    gradient.addColorStop(1, 'rgba(' + color2.r + ',' + color2.g + ',' + color2.b + ',' + opacity);

    _.context.beginPath();
    _.context.strokeStyle = gradient;
    _.context.moveTo(p1.x, p1.y);
    _.context.lineTo(p2.x, p2.y);
    _.context.stroke();
    _.context.fill();
    _.context.closePath();
  };

  /**
   * Merges the keys of two objects.
   *
   * @private
   * @param {object} source
   * @param {object} obj
   */
  Plugin.prototype._extend = function(source, obj) {
    Object.keys(obj).forEach(function(key) {
      source[key] = obj[key];
    });

    return source;
  };

  /**
   * Converts a hex string to a rgb object.
   *
   * @private
   * @param {string} hex
   * @return {object}
   */
  Plugin.prototype._hex2rgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  /**
   * Represents a single particle.
   *
   * @constructor
   * @param {object} context
   * @param {object} options
   */
  Particle = function(context, options) {
    var _ = this,
        random = Math.random,
        speed = options.speed,
        color = (options.color instanceof Array) ? options.color[Math.floor(Math.random() * options.color.length)] : options.color;

    _.context = context;
    _.options = options;

    var canvas = document.querySelector(options.selector);
    _.x = random() * canvas.offsetParent.clientWidth;

    if (canvas.offsetParent.nodeName === 'BODY') {
      _.y = random() * window.innerHeight;
    } else {
      _.y = random() * canvas.offsetParent.clientHeight;
    }

    _.vx = random() * speed * 2 - speed;
    _.vy = random() * speed * 2 - speed;
    _.radius = random() * random() * options.sizeVariations;
    _.color = color;

    _._draw();
  };

  /**
   * The particles draw function (renders the circle).
   *
   * @private
   */
  Particle.prototype._draw = function() {
    var _ = this;

    _.context.save();
    _.context.translate(_.x, _.y);
    _.context.moveTo(0, 0);
    _.context.beginPath();
    _.context.arc(0, 0, _.radius, 0, Math.PI * 2, false);
    _.context.fillStyle = _.color;
    _.context.fill();
    _.context.restore();
  };

  /**
   * This updates the particles coordinates.
   *
   * @private
   * @param parentWidth
   * @param parentHeight
   */
  Particle.prototype._updateCoordinates = function(parentWidth, parentHeight) {
    var _ = this,
    
        x = _.x + this.vx,
        y = _.y + this.vy,
        radius = _.radius;

    if(x + radius > parentWidth) {
      x = radius;
    } else if(x - radius < 0) {
      x = parentWidth - radius;
    }

    if(y + radius > parentHeight) {
      y = radius;
    } else if(y - radius < 0) {
      y = parentHeight - radius;
    }

    _.x = x;
    _.y = y;
  };

  /**
   * A polyfill for requestAnimFrame.
   *
   * @return {function}
   */
  window.requestAnimFrame = (function() {
    var _ = this,
    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    
    if (requestAnimationFrame) {
      return requestAnimationFrame;
    }

    _._usingPolyfill = true;

    return function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  return new Plugin();
})(window, document);

(function() {
  'use strict';

  if(typeof define === 'function' && define.amd) {
    define('Particles', function () { return Particles; });
  } else if(typeof module !== 'undefined' && module.exports) {
    module.exports = Particles;
  } else {
    window.Particles = Particles;
  }
})();
