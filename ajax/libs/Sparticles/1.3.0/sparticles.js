/**!
 * Sparticles - Lightweight, High Performance Particles in Canvas
 * @version 1.3.0
 * @license MPL-2.0
 * @author simeydotme <simey.me@gmail.com>
 * @website http://sparticlesjs.dev
 * @repository https://github.com/simeydotme/sparticles.git
 */

var Sparticles = (function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /**
   * Limited Animation Frame method, to allow running
   * a given handler at the maximum desired frame rate.
   * inspired from https://gist.github.com/addyosmani/5434533
   * @param {Function} handler method to execute upon every frame
   * @param {Number} fps how many frames to render every second
   */
  var AnimationFrame = function AnimationFrame() {
    var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    var fps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
    this.fps = fps;
    this.handler = handler;
    var renderId = 0;
    /**
     * begin the animation loop which is assigned
     * to the instance in the constructor
     */

    this.start = function () {
      var _this = this;

      if (!this.started) {
        var then = performance.now();
        var interval = 1000 / this.fps;
        var tolerance = 0;

        var loop = function loop(now) {
          var delta = now - then;
          renderId = requestAnimationFrame(loop);

          if (delta >= interval - tolerance) {
            _this.handler(delta);

            then = now - delta % interval;
          }
        };

        renderId = requestAnimationFrame(loop);
        this.started = true;
      }
    };
    /**
     * stop the currently running animation loop
     */


    this.stop = function () {
      cancelAnimationFrame(renderId);
      this.started = false;
    };
  };

  /**
   * return the cartesian x/y delta value from a degree
   * eg: 90 (→) = [1,0]
   * @param {Number} angle angle in degrees
   * @returns {Number[]} cartesian delta values
   */
  var cartesian = function cartesian(angle) {
    return [Math.cos(radian(angle - 90)), Math.sin(radian(angle - 90))];
  };
  /**
   * clamp the input number to the min/max values
   * @param {Number} value value to clamp between min and max
   * @param {Number} min minimum value possible
   * @param {Number} max maximum value possible
   * @returns {Number} the input num clamped between min/max
   */

  var clamp = function clamp(value) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Math.max(min, Math.min(max, value));
  };
  /**
   * return the radian equivalent to a degree value
   * @param {Number} angle angle in degrees
   * @returns {Number} radian equivalent
   */

  var radian = function radian(angle) {
    return angle * Math.PI / 180;
  };
  /**
   * return random number between a min and max value
   * @param {Number} min minimum value
   * @param {Number} max maximum value
   * @param {Boolean} rounded should the result be rounded
   * @returns {Number} a random number between min and max
   */

  var random = function random() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.random();

    if (max <= min) {
      value = min;
    } else if ((min !== 0 || max !== 1) && max > min) {
      value = value * (max - min) + min;
    }

    return value;
  };
  /**
   * return a random value from an array
   * @param {Array} array an array to get random value from
   * @returns {*} random value from array
   */

  var randomArray = function randomArray(array) {
    return array[Math.floor(random(0, array.length))];
  };
  /**
   * return a random HSL colour string for use in random color effect
   * @returns {String} "hsl(100,100,80)"
   */

  var randomHsl = function randomHsl() {
    var h = round(random(0, 360));
    var s = round(random(90, 100));
    var l = round(random(45, 85));
    return "hsl(".concat(h, ",").concat(s, "%,").concat(l, "%)");
  };
  /**
   * return a boolean to pass a dice roll
   * @param {Number} odds a fraction to use as the probability, can be supplied as "1/2"
   * @returns {Boolean}
   */

  var roll = function roll(odds) {
    return odds > random();
  };
  /**
   * round a number to the nearest integer value
   * @param {Number} value value to round to the nearest integer
   * @returns {Number} nearest integer
   */

  var round = function round(value) {
    return 0.5 + value | 0;
  };

  /**
   * Sparticle Constructor;
   * creates an individual particle for use in the Sparticles() class
   * @param {Object} parent - the parent Sparticles() instance this belongs to
   * @returns {Object} - reference to a new Sparticle instance
   */

  var Sparticle = function Sparticle(parent) {
    if (parent) {
      this.canvas = parent.canvas;
      this.settings = parent.settings;
      this.colors = parent.colors;
      this.shapes = parent.shapes;
      this.images = parent.images;
      this.styles = parent.styles;
      this.ctx = parent.canvas.getContext("2d");
      this.setup();
      this.init();
    } else {
      console.warn("Invalid parameters given to Sparticle()", arguments);
    }

    return this;
  };
  /**
   * set up the particle with some random values
   * before it is initialised on the canvas
   * these values will randomize when the particle goes offscreen
   */

  Sparticle.prototype.setup = function () {
    var _ = this.settings;
    this.frame = 0;
    this.frameoffset = round(random(0, 360));
    this.size = round(random(_.minSize, _.maxSize));
    this.da = this.getAlphaDelta();
    this.dx = this.getDeltaX();
    this.dy = this.getDeltaY();
    this.dd = this.getDriftDelta();
    this.dr = this.getRotationDelta();
    this.color = this.getColor();
    this.shape = this.getShape();
    this.image = this.getImage();
    this.style = this.getStyle();
    this.rotation = _.rotate ? radian(random(0, 360)) : 0;
    this.vertical = _.direction > 150 && _.direction < 210 || _.direction > 330 && _.direction < 390 || _.direction > -30 && _.direction < 30;
    this.horizontal = _.direction > 60 && _.direction < 120 || _.direction > 240 && _.direction < 300;
  };
  /**
   * initialise a particle with the default values from
   * the Sparticles instance settings.
   * these values do not change when the particle goes offscreen
   */


  Sparticle.prototype.init = function () {
    var _ = this.settings;
    var canvas = this.canvas;
    this.alpha = 0;

    if (_.speed > 0 || _.alphaSpeed === 0) {
      this.alpha = random(_.minAlpha, _.maxAlpha);
    }

    if (_.bounce) {
      this.px = round(random(2, canvas.width - this.size - 2));
      this.py = round(random(2, canvas.height - this.size - 2));
    } else {
      this.px = round(random(-this.size * 2, canvas.width + this.size));
      this.py = round(random(-this.size * 2, canvas.height + this.size));
    }
  };
  /**
   * reset the particle after it has gone off canvas.
   * this should be better than popping it from the array
   * and creating a new particle instance.
   */


  Sparticle.prototype.reset = function () {
    // give the particle a new set of initial values
    this.setup(); // set the particle's Y position

    if (this.py < 0) {
      this.py = this.canvas.height + this.size * 2;
    } else if (this.py > this.canvas.height) {
      this.py = 0 - this.size * 2;
    } // set the particle's X position


    if (this.px < 0) {
      this.px = this.canvas.width + this.size * 2;
    } else if (this.px > this.canvas.width) {
      this.px = 0 - this.size * 2;
    }
  };
  /**
   * bounce the particle off the edge of canvas
   * when it has touched
   */


  Sparticle.prototype.bounce = function () {
    var _ = this.settings;
    var dir = _.direction; // reverse the particle's Y position

    if (this.py <= 0 || this.py + this.size >= this.canvas.height) {
      this.dy = -this.dy;

      if (this.horizontal) {
        this.dd = -this.dd;
      }
    } // reverse the particle's X position


    if (this.px <= 0 || this.px + this.size >= this.canvas.width) {
      this.dx = -this.dx;

      if (this.vertical) {
        this.dd = -this.dd;
      }
    }
  };
  /**
   * check if the particle is off the canvas based
   * on it's current position
   * @returns {Boolean} is the particle completely off canvas
   */


  Sparticle.prototype.isOffCanvas = function () {
    var topleft = 0 - this.size * 2;
    var bottom = this.canvas.height + this.size * 2;
    var right = this.canvas.width + this.size * 2;
    return this.px < topleft || this.px > right || this.py < topleft || this.py > bottom;
  };
  /**
   * check if the particle is touching the canvas edge
   * @returns {Boolean} is the particle touching edge
   */


  Sparticle.prototype.isTouchingEdge = function () {
    var topleft = 0;
    var bottom = this.canvas.height - this.size;
    var right = this.canvas.width - this.size;
    return this.px < topleft || this.px > right || this.py < topleft || this.py > bottom;
  };
  /**
   * get a random color for the particle from the
   * array of colors set in the options object
   * @returns {String} - random color from color array
   */


  Sparticle.prototype.getColor = function () {
    if (this.settings.color === "random") {
      return randomArray(this.colors);
    } else if (Array.isArray(this.settings.color)) {
      return randomArray(this.settings.color);
    } else {
      return this.settings.color;
    }
  };
  /**
   * get a random shape for the particle from the
   * array of shapes set in the options object
   * @returns {String} - random shape from shape array
   */


  Sparticle.prototype.getShape = function () {
    if (this.settings.shape === "random") {
      return randomArray(this.shapes);
    } else if (Array.isArray(this.settings.shape)) {
      return randomArray(this.settings.shape);
    } else {
      return this.settings.shape;
    }
  };
  /**
   * get the image for the particle from the array
   * of possible image urls
   * @returns {String} - random imageUrl from imageUrl array
   */


  Sparticle.prototype.getImage = function () {
    if (Array.isArray(this.settings.imageUrl)) {
      return randomArray(this.settings.imageUrl);
    } else {
      return this.settings.imageUrl;
    }
  };
  /**
   * get the style of the particle, either "fill" or "stroke"
   * depending on the settings as fill/stroke/both
   * @returns {String} - either "fill" or "stroke"
   */


  Sparticle.prototype.getStyle = function () {
    return randomArray(this.styles);
  };
  /**
   * get a random delta (velocity) for the particle
   * based on the speed, and the parallax value (if applicable)
   * @returns {Number} - the velocity to be applied to the particle
   */


  Sparticle.prototype.getDelta = function () {
    var baseDelta = this.settings.speed * 0.1;

    if (this.settings.speed && this.settings.parallax) {
      return baseDelta + this.size * this.settings.parallax / 50;
    } else {
      return baseDelta;
    }
  };
  /**
   * get a random variable speed for use as a multiplier,
   * based on the values given in the settings object, this
   * can be positive or negative
   * @returns {Number} - a variable delta speed
   */


  Sparticle.prototype.getDeltaVariance = function () {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var s = this.settings.speed || 10;

    if (v > 0) {
      return random(-v, v) * s / 100;
    } else {
      return 0;
    }
  };
  /**
   * get a random delta on the X axis, taking in to account
   * the variance range in the settings object and the particle's
   * direction as a multiplier
   * @returns {Number} - the X delta to be applied to particle
   */


  Sparticle.prototype.getDeltaX = function () {
    var d = this.getDelta();
    var dv = this.getDeltaVariance(this.settings.xVariance);
    return cartesian(this.settings.direction)[0] * d + dv;
  };
  /**
   * get a random delta on the Y axis, taking in to account
   * the variance range in the settings object and the particle's
   * direction as a multiplier
   * @returns {Number} - the Y delta to be applied to particle
   */


  Sparticle.prototype.getDeltaY = function () {
    var d = this.getDelta();
    var dv = this.getDeltaVariance(this.settings.yVariance);
    return cartesian(this.settings.direction)[1] * d + dv;
  };
  /**
   * get a random delta for the alpha change over time from
   * between a positive and negative alpha variance value
   * @returns {Number} - the alpha delta to be applied to particle
   */


  Sparticle.prototype.getAlphaDelta = function () {
    var variance = this.settings.alphaVariance;
    var a = random(1, variance + 1);

    if (roll(1 / 2)) {
      a = -a;
    }

    return a;
  };
  /**
   * return a random drift value either positive or negative
   * @returns {Number} - the drift value
   */


  Sparticle.prototype.getDriftDelta = function () {
    if (!this.settings.drift) {
      return 0;
    } else {
      return random(this.settings.drift - this.settings.drift / 2, this.settings.drift + this.settings.drift / 2);
    }
  };
  /**
   * return a random rotation value either positive or negative
   * @returns {Number} - the rotation value
   */


  Sparticle.prototype.getRotationDelta = function () {
    var r = 0;

    if (this.settings.rotate && this.settings.rotation) {
      r = radian(random(0.5, 1.5) * this.settings.rotation);

      if (roll(1 / 2)) {
        r = -r;
      }
    }

    return r;
  };
  /**
   * progress the particle's frame number, as well
   * as the internal values for both the particle's
   * position and the particle's alpha.
   * @returns {Object} - reference to the current Sparticle instance
   */


  Sparticle.prototype.update = function () {
    this.frame += 1;
    this.updatePosition();
    this.updateAlpha();
    return this;
  };
  /**
   * progress the particle's alpha value depending on the
   * alphaSpeed and the twinkle setting
   * @returns {Number} - new alpha value of the particle
   */


  Sparticle.prototype.updateAlpha = function () {
    if (this.settings.alphaSpeed > 0) {
      if (this.settings.twinkle) {
        this.alpha = this.updateTwinkle();
      } else {
        this.alpha = this.updateFade();
      }
    }

    return this.alpha;
  };
  /**
   * progress the particle's alpha value according to
   * the fading effect
   * @returns {Number} - new alpha value of the particle
   */


  Sparticle.prototype.updateFade = function () {
    var tick = this.da / 1000 * this.settings.alphaSpeed * 0.5;
    var alpha = this.alpha + tick;
    var over = this.da > 0 && alpha > this.settings.maxAlpha;
    var under = this.da < 0 && alpha < this.settings.minAlpha; // if the alpha is over or under the min or max values,
    // then we reverse the delta so that it can increase or
    // decrease in opacity in the opposite direction

    if (over || under) {
      this.da = -this.da;
      alpha = this.settings.maxAlpha;

      if (under) {
        alpha = this.settings.minAlpha;
      }
    }

    return alpha;
  };
  /**
   * progress the particle's alpha value according to
   * the twinkle effect
   * @returns {Number} - new alpha value of the particle
   */


  Sparticle.prototype.updateTwinkle = function () {
    var alpha = this.alpha;
    var delta = Math.abs(this.da);
    var over = alpha > this.settings.maxAlpha;
    var under = alpha < this.settings.minAlpha;
    var tick = delta / 1000 * this.settings.alphaSpeed * 0.5;
    var flickerOn = roll(1 / 30);
    var flickerOff = roll(1 / 30); // if the particle is resetting the twinkle effect, then
    // we simply want to quickly get back to max alpha
    // over a short period of time, otherwise just advance the tick

    if (this.resettingTwinkle) {
      alpha += tick * 5;
    } else if (flickerOn) {
      alpha += tick * 50;
    } else if (flickerOff) {
      alpha -= tick * 25;
    } else {
      alpha -= tick;
    } // once the alpha is under the min alpha value, then we need
    // to set the twinkle effect to reset, and once it is over
    // the max alpha, we stop resetting.


    if (under) {
      this.resettingTwinkle = true;
      alpha = this.settings.minAlpha;
    } else if (over) {
      this.resettingTwinkle = false;
      alpha = this.settings.maxAlpha;
    }

    return alpha;
  };
  /**
   * progress the particle's position values, rotation and drift
   * according to the settings given
   */


  Sparticle.prototype.updatePosition = function () {
    if (this.settings.bounce && this.isTouchingEdge()) {
      this.bounce();
    } else if (this.isOffCanvas()) {
      this.reset();
      return;
    }

    this.px += this.dx;
    this.py += this.dy; // drift must be applied after position x/y
    // as it modifies the values by wave function

    this.updateDrift();
    this.updateRotation();
  };
  /**
   * progress the particle's rotation value according
   * to the settings given
   */


  Sparticle.prototype.updateRotation = function () {
    if (this.settings.rotate && this.settings.rotation) {
      this.rotation += this.dr;
    }
  };
  /**
   * progress the particle's drift value according
   * to the settings given
   */


  Sparticle.prototype.updateDrift = function () {
    var _ = this.settings;
    var dir = _.direction;

    if (_.drift && _.speed) {
      if (this.vertical) {
        // apply HORIZONTAL drift ~ when "direction" is mostly vertical.
        this.px += cartesian(this.frame + this.frameoffset)[0] * this.dd / (this.getDelta() * 15);
      } else if (this.horizontal) {
        // apply VERTICAL drift ~ when "direction" is mostly horizontal.
        this.py += cartesian(this.frame + this.frameoffset)[1] * this.dd / (this.getDelta() * 15);
      }
    }
  };

  Sparticle.prototype.render = function (canvasses) {
    var particleCanvas;

    if (this.shape !== "image") {
      particleCanvas = canvasses[this.color][this.shape][this.style];
    } else {
      particleCanvas = canvasses[this.color][this.shape][this.image];
    }

    var canvasSize = particleCanvas.width;
    var scale = this.size / canvasSize;
    var px = this.px / scale;
    var py = this.py / scale;
    this.ctx.globalAlpha = clamp(this.alpha, 0, 1);
    this.renderRotate();
    this.ctx.transform(scale, 0, 0, scale, 0, 0);
    this.ctx.drawImage(particleCanvas, 0, 0, canvasSize, canvasSize, px, py, canvasSize, canvasSize);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    return this;
  };

  Sparticle.prototype.renderRotate = function () {
    if (this.shape !== "circle" && this.settings.rotate) {
      var centerX = this.px + this.size / 2;
      var centerY = this.py + this.size / 2;
      this.ctx.translate(centerX, centerY);
      this.ctx.rotate(this.rotation);
      this.ctx.translate(-centerX, -centerY);
    }
  };

  /**
   * Sparticles Constructor;
   * Create a <canvas>, append to the given node, and start the particle effect
   * @param {HTMLElement} [node=document.body] - element to which canvas is appended to
   * @param {Object} [options={}] - settings to use for the particle effect
   * @param {String} [options.composition=source-over] - canvas globalCompositeOperation value for particles
   * @param {Number} [options.count=50] - number of particles on the canvas simultaneously
   * @param {Number} [options.speed=10] - default velocity of every particle
   * @param {Number} [options.parallax=1] - speed multiplier effect for larger particles (0 = none)
   * @param {Number} [options.direction=180] - default direction of particles in degrees (0 = ↑, 180 = ↓)
   * @param {Number} [options.xVariance=2] - random deviation of particles on x-axis from default direction
   * @param {Number} [options.yVariance=2] - random deviation of particles on y-axis from default direction
   * @param {Number} [options.rotate=true] - can particles rotate
   * @param {Number} [options.rotation=1] - default rotational speed for every particle
   * @param {Number} [options.alphaSpeed=10] - rate of change in alpha over time
   * @param {Number} [options.alphaVariance=1] - random deviation of alpha change
   * @param {Number} [options.minAlpha=0] - minumum alpha value of every particle
   * @param {Number} [options.maxAlpha=1] - maximum alpha value of every particle
   * @param {Number} [options.minSize=1] - minimum size of every particle
   * @param {Number} [options.maxSize=10] - maximum size of every particle
   * @param {Boolean} [options.bounce=false] - should the particles bounce off edge of canvas
   * @param {Number} [options.drift=1] - the "driftiness" of particles which have a horizontal/vertical direction
   * @param {Number} [options.glow=0] - the glow effect size of each particle
   * @param {Boolean} [options.twinkle=false] - particles to exhibit an alternative alpha transition as "twinkling"
   * @param {String} [options.style=fill] - fill style of particles (one of; "fill", "stroke" or "both")
   * @param {(String|String[])} [options.shape=circle] - shape of particles (any of; circle, square, triangle, diamond, line, image) or "random"
   * @param {(String|String[])} [options.imageUrl=] - if shape is "image", define an image url (can be data-uri, must be square (1:1 ratio))
   * @param {(String|String[])} [options.color=random] - css color as string, or array of color strings (can also be "random")
   * @param {Function} [options.randomColor=randomHsl(index,total)] - a custom function for setting the random colors when color="random"
   * @param {Number} [options.randomColorCount=3] - the number of random colors to generate when color is "random"
   * @param {Number} [width] - the width of the canvas element
   * @param {Number} [height=width] - the height of the canvas element
   * @returns {Object} - reference to a new Sparticles instance
   */

  var Sparticles = function Sparticles(node, options, width, height) {
    if (arguments.length >= 1 && !(arguments[0] instanceof HTMLElement)) {
      options = arguments[0];
      width = arguments[1];
      height = arguments[2];
      node = undefined;
    }

    if (width && !height) {
      height = width;
    }

    var defaults = {
      alphaSpeed: 10,
      alphaVariance: 1,
      bounce: false,
      color: "random",
      randomColor: randomHsl,
      randomColorCount: 3,
      composition: "source-over",
      count: 50,
      direction: 180,
      drift: 1,
      glow: 0,
      imageUrl: "",
      maxAlpha: 1,
      maxSize: 10,
      minAlpha: 0,
      minSize: 1,
      parallax: 1,
      rotate: true,
      rotation: 1,
      shape: "circle",
      speed: 10,
      style: "fill",
      twinkle: false,
      xVariance: 2,
      yVariance: 2
    };
    this.el = node || document.body;
    this.settings = _objectSpread2(_objectSpread2({}, defaults), options);
    this.resizable = !width && !height;
    this.width = this.resizable ? this.el.clientWidth : width;
    this.height = this.resizable ? this.el.clientHeight : height;
    /**
     * initialise the sparticles instance
     * @returns {Object} - reference to the Sparticles instance
     */

    this.init = function () {
      var _this = this;

      this.sparticles = [];
      this.colors = this.getColorArray();
      this.shapes = this.getShapeArray();
      this.styles = this.getStyleArray();
      this.imageUrls = this.getImageArray();
      this.setupMainCanvas();
      this.setupOffscreenCanvasses(function () {
        _this.createSparticles();

        _this.start();
      }); // defer to the default "handleEvent" handler
      // https://developer.mozilla.org/en-US/docs/Web/API/EventListener/handleEvent

      window.addEventListener("resize", this);
      return this;
    };
    /**
     * handle event for screen resize;
     * debounce a canvas resize,
     * reset the particles
     */


    this.handleEvent = function (event) {
      var _this2 = this;

      if (event.type === "resize") {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
          if (_this2.resizable) {
            _this2.width = _this2.el.clientWidth;
            _this2.height = _this2.el.clientHeight;

            _this2.setCanvasSize().resetSparticles();
          }
        }, 200);
      }
    };
    /**
     * start/resume the sparticles animation
     * @returns {Object} - the Sparticle instance (for chaining)
     */


    this.start = function () {
      var me = this;

      if (!this.loop) {
        this.loop = new AnimationFrame(function (t) {
          me.drawFrame(t);
        });
      }

      this.loop.start();
      return this;
    };
    /**
     * stop/pause the sparticles animation
     * @returns {Object} - the Sparticle instance (for chaining)
     */


    this.stop = function () {
      this.loop.stop();
      return this;
    };
    /**
     * destroy the current instance and free up some memory
     * @returns {Object} - the Sparticle instance (for chaining)
     */


    this.destroy = function () {
      // stop the rendering and updating
      this.stop(); // remove the canvas element from the DOM

      this.el.removeChild(this.canvas); // remove the resize event for this instance

      window.removeEventListener("resize", this); // delete all the properties from the instance
      // to free up memory

      for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
          delete this[prop];
        }
      }

      return this;
    };
    /**
     * set the canvas width and height
     * @param {Number} width - the width of the canvas
     * @param {Number} height - the height of the canvas
     * @returns {Object} - the Sparticle instance (for chaining)
     */


    this.setCanvasSize = function (width, height) {
      if (width) {
        this.resizable = false;
      }

      this.width = width || this.width;
      this.height = height || this.height;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      return this;
    };
    /**
     * create an array and populate it with new Sparticle instances.
     * @returns {Array} the array of Sparticle instances
     */


    this.resetSparticles = this.createSparticles = function () {
      this.sparticles = [];
      this.ctx.globalCompositeOperation = this.settings.composition;

      for (var i = 0; i < this.settings.count; i++) {
        this.sparticles.push(new Sparticle(this, i));
      }

      this.sort();
      return this.sparticles;
    };
    /**
     * sort the particle array by size so that parallax effect
     * doesn't appear to have slower/smaller particles in foreground
     */


    this.sort = function () {
      if (this.settings.parallax) {
        this.sparticles.sort(function (a, b) {
          return a.size - b.size;
        });
      }
    }; // initialise the sparticles, and return the instance.


    return this.init();
  };
  /**
   * convert the input color to an array if it isn't already
   * @returns {Array} - array of colors for use in rendering
   */


  Sparticles.prototype.getColorArray = function () {
    var colors = Array.isArray(this.settings.color) ? this.settings.color : [this.settings.color];
    var isRandom = colors.some(function (c) {
      return c === "random";
    });

    if (isRandom) {
      for (var i = 0; i < this.settings.randomColorCount; i++) {
        colors[i] = this.settings.randomColor(i, this.settings.randomColorCount);
      }
    }

    return colors;
  };
  /**
   * convert the input shape to an array if it isn't already
   * @returns {Array} - array of shapes for use in rendering
   */


  Sparticles.prototype.getShapeArray = function () {
    var shapes = Array.isArray(this.settings.shape) ? this.settings.shape : [this.settings.shape];
    var isRandom = shapes.some(function (c) {
      return c === "random";
    });

    if (isRandom) {
      shapes = ["square", "circle", "triangle"];
    }

    return shapes;
  };
  /**
   * convert the imageUrl option to an array if it isn't already
   * @returns {Array} - array of image urls for use in rendering
   */


  Sparticles.prototype.getImageArray = function () {
    return Array.isArray(this.settings.imageUrl) ? this.settings.imageUrl : [this.settings.imageUrl];
  };
  /**
   * convert the input style to an array
   * @returns {Array} - array of styles for use in rendering
   */


  Sparticles.prototype.getStyleArray = function () {
    var styles = this.settings.style;

    if (styles !== "fill" && styles !== "stroke") {
      styles = ["fill", "stroke"];
    } else {
      styles = [styles];
    }

    return styles;
  };
  /**
   * set up the canvas and bind to a property for
   * access later on, append it to the DOM
   * @returns {HTMLCanvasElement} - the canvas element which was appended to DOM
   */


  Sparticles.prototype.setupMainCanvas = function () {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("class", "sparticles");
    this.ctx = this.canvas.getContext("2d");
    this.setCanvasSize();
    this.el.appendChild(this.canvas);
    return this.canvas;
  };
  /**
   * create a new offscreen canvas element for each color & shape
   * combination, so that we can reference it later during render
   * (huge performance gains here)
   * @param {Function} [callback] - function to execute after image loads
   * @returns {HTMLCanvasElement} - the created offscreen canvas
   */


  Sparticles.prototype.setupOffscreenCanvasses = function (callback) {
    var _this3 = this;

    var colors = this.colors.filter(function (item, index) {
      return _this3.colors.indexOf(item) === index;
    });
    var shapes = this.shapes.filter(function (item, index) {
      return _this3.shapes.indexOf(item) === index;
    });
    var styles = this.styles.filter(function (item, index) {
      return _this3.styles.indexOf(item) === index;
    });
    var imageUrls = this.imageUrls.filter(function (item, index) {
      return _this3.imageUrls.indexOf(item) === index;
    });
    var imageCount = colors.length * imageUrls.length;
    var canvasCount = colors.length * shapes.length * styles.length;
    var imagesLoaded = 0;
    var canvassesCreated = 0;
    this.canvasses = this.canvasses || {};
    colors.forEach(function (color) {
      _this3.canvasses[color] = _this3.canvasses[color] || {};
      shapes.forEach(function (shape) {
        _this3.canvasses[color][shape] = _this3.canvasses[color][shape] || {};

        if (shape === "image") {
          imageUrls.forEach(function (imageUrl, i) {
            var image = new Image();
            var imageCanvas = document.createElement("canvas");
            _this3.canvasses[color][shape][imageUrl] = imageCanvas;

            image.onload = function () {
              imagesLoaded++;

              _this3.drawOffscreenCanvasForImage(image, color, imageCanvas);

              if (callback && imagesLoaded === imageCount) {
                callback();
              }
            };

            image.onerror = function () {
              console.error("failed to load source image: ", imageUrl);
            };

            image.src = imageUrl;
          });
        } else {
          styles.forEach(function (style) {
            var canvas = document.createElement("canvas");
            _this3.canvasses[color][shape][style] = canvas;
            canvassesCreated++;

            _this3.drawOffscreenCanvas(shape, style, color, canvas);

            if (callback && canvassesCreated === canvasCount) {
              callback();
            }
          });
        }
      });
    });
  };
  /**
   * return the size of the glow effect (shadowBlur) for each particle
   * @param {Number} size - the size of the particle
   * @returns {Number} - the size of the glow/shadow
   */


  Sparticles.prototype.getGlowSize = function (size) {
    return this.settings.glow;
  };
  /**
   * return the outline or stroke size of each particle
   * @param {Number} size - the size of the particle
   * @returns {Number} - the size of the outline/stroke
   */


  Sparticles.prototype.getLineSize = function (size) {
    return clamp(size / 20, 1, 5);
  };
  /**
   * return the offscreenCanvas size to generate for
   * @returns {Number} - the maxSize of the offscreen canvas
   */


  Sparticles.prototype.getOffscreenCanvasSize = function () {
    return clamp(this.settings.maxSize, this.settings.minSize, this.settings.maxSize);
  };
  /**
   * set the fill/stroke style (color & width) for each particle's offscreen canvas
   * @param {CanvasRenderingContext2D} ctx - the canvas context
   * @param {String} color - the color to fill/stroke with
   * @param {Number} lineSize - size/thickness of the stroke
   * @param {String} style - style (either "fill" or "stroke")
   */


  Sparticles.prototype.renderStyle = function (ctx, color, lineSize, style) {
    if (style === "fill") {
      ctx.fillStyle = color;
    } else {
      ctx.lineWidth = lineSize;
      ctx.strokeStyle = color;
    }
  };
  /**
   * set the shadowBlur (glow effect) for each particle's offscreen canvas
   * @param {CanvasRenderingContext2D} ctx - the canvas context
   * @param {String} color - the color to fill/stroke with
   * @param {Number} size - size of the shadow/glow
   */


  Sparticles.prototype.renderGlow = function (ctx, color, size) {
    var glowSize = this.getGlowSize(size) / 2;
    ctx.shadowColor = color;
    ctx.shadowBlur = glowSize;
  };
  /**
   * fill or stroke each particle's offscreen canvas depending on the given setting
   * @param {CanvasRenderingContext2D} ctx - the canvas context
   * @param {String} style - style (either "fill" or "stroke")
   */


  Sparticles.prototype.renderColor = function (ctx, style, path) {
    if (style === "fill") {
      if (path) {
        ctx.fill(path);
      } else {
        ctx.fill();
      }
    } else {
      if (path) {
        ctx.stroke(path);
      } else {
        ctx.stroke();
      }
    }
  };
  /**
   * pass-through the needed parameters to the offscreen canvas
   * draw function associated with the given shape
   * @param {String} shape -  shape of the canvas to draw (eg: "circle")
   * @param {String} style -  style (either "fill" or "stroke")
   * @param {String} color - the color to fill/stroke with
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @returns {HTMLCanvasElement} - the created offscreen canvas
   */


  Sparticles.prototype.drawOffscreenCanvas = function (shape, style, color, canvas) {
    return this.offScreenCanvas[shape].call(this, style, color, canvas);
  };
  /**
   * object of shapes to draw
   */


  Sparticles.prototype.offScreenCanvas = {};
  /**
   * create, setup and render an offscreen canvas for a
   * Circle Particle of the given color
   * @param {String} style -  style (either "fill" or "stroke")
   * @param {String} color - the color to fill/stroke with
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @returns {HTMLCanvasElement} - the created offscreen canvas
   */

  Sparticles.prototype.offScreenCanvas.circle = function (style, color, canvas) {
    var ctx = canvas.getContext("2d");
    var size = this.getOffscreenCanvasSize();
    var lineSize = this.getLineSize(size);
    var glowSize = this.getGlowSize(size);
    var canvasSize = size + lineSize * 2 + glowSize;
    var shapeSize = style === "stroke" ? size - lineSize : size;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    this.renderGlow(ctx, color, size);
    this.renderStyle(ctx, color, lineSize, style);
    ctx.beginPath();
    ctx.ellipse(canvasSize / 2, canvasSize / 2, shapeSize / 2, shapeSize / 2, 0, 0, 360);
    this.renderColor(ctx, style);
    return canvas;
  };
  /**
   * create, setup and render an offscreen canvas for a
   * Square Particle of the given color
   * @param {String} style -  style (either "fill" or "stroke")
   * @param {String} color - the color to fill/stroke with
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @returns {HTMLCanvasElement} - the created offscreen canvas
   */


  Sparticles.prototype.offScreenCanvas.square = function (style, color, canvas) {
    var ctx = canvas.getContext("2d");
    var size = this.getOffscreenCanvasSize();
    var lineSize = this.getLineSize(size);
    var glowSize = this.getGlowSize(size);
    var canvasSize = size + lineSize * 2 + glowSize;
    var shapeSize = style === "stroke" ? size - lineSize : size;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    this.renderGlow(ctx, color, size);
    this.renderStyle(ctx, color, lineSize, style);
    ctx.beginPath();
    ctx.rect(canvasSize / 2 - shapeSize / 2, canvasSize / 2 - shapeSize / 2, shapeSize, shapeSize);
    this.renderColor(ctx, style);
    return canvas;
  };
  /**
   * create, setup and render an offscreen canvas for a
   * Line/Curve Particle of the given color
   * @param {String} style -  style (either "fill" or "stroke")
   * @param {String} color - the color to fill/stroke with
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @returns {HTMLCanvasElement} - the created offscreen canvas
   */


  Sparticles.prototype.offScreenCanvas.line = function (style, color, canvas) {
    var ctx = canvas.getContext("2d");
    var size = this.getOffscreenCanvasSize() * 1.5;
    var lineSize = this.getLineSize(size);
    var glowSize = this.getGlowSize(size);
    var canvasSize = size + lineSize * 2 + glowSize;
    var startx = canvasSize / 2 - size / 2;
    var starty = canvasSize / 2 - size / 2;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    this.renderGlow(ctx, color, size);
    ctx.lineWidth = lineSize;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    ctx.lineTo(startx + size, starty + size);
    ctx.stroke();
    ctx.closePath();
    return canvas;
  };
  /**
   * create, setup and render an offscreen canvas for a
   * Triangle Particle of the given color
   * @param {String} style -  style (either "fill" or "stroke")
   * @param {String} color - the color to fill/stroke with
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @returns {HTMLCanvasElement} - the created offscreen canvas
   */


  Sparticles.prototype.offScreenCanvas.triangle = function (style, color, canvas) {
    var ctx = canvas.getContext("2d");
    var size = this.getOffscreenCanvasSize();
    var lineSize = this.getLineSize(size);
    var glowSize = this.getGlowSize(size);
    var canvasSize = size + lineSize * 2 + glowSize;
    var shapeSize = style === "stroke" ? size - lineSize : size;
    var height = shapeSize * (Math.sqrt(3) / 2);
    var startx = canvasSize / 2;
    var starty = canvasSize / 2 - shapeSize / 2;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    this.renderGlow(ctx, color, size);
    this.renderStyle(ctx, color, lineSize, style);
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    ctx.lineTo(startx - shapeSize / 2, starty + height);
    ctx.lineTo(startx + shapeSize / 2, starty + height);
    ctx.closePath();
    this.renderColor(ctx, style);
    return canvas;
  };
  /**
   * create, setup and render an offscreen canvas for a
   * Diamond Sparkle Particle of the given color
   * @param {String} style -  style (either "fill" or "stroke")
   * @param {String} color - the color to fill/stroke with
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @returns {HTMLCanvasElement} - the created offscreen canvas
   */


  Sparticles.prototype.offScreenCanvas.diamond = function (style, color, canvas) {
    var pathSize = 100;
    var path = new Path2D("M43,83.74,48.63,99a1.46,1.46,0,0,0,2.74,0L57,83.74A45.09,45.09,0,0,1,83.74,57L99,51.37a1.46,1.46,0,0,0,0-2.74L83.74,43A45.11,45.11,0,0,1,57,16.26L51.37,1a1.46,1.46,0,0,0-2.74,0L43,16.26A45.11,45.11,0,0,1,16.26,43L1,48.63a1.46,1.46,0,0,0,0,2.74L16.26,57A45.09,45.09,0,0,1,43,83.74Z");
    var ctx = canvas.getContext("2d");
    var size = this.getOffscreenCanvasSize();
    var lineSize = this.getLineSize(size);
    var glowSize = this.getGlowSize(size);
    var canvasSize = size + lineSize * 2 + glowSize;
    var scale = canvasSize / ((pathSize + glowSize) * 1.1);
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    this.renderGlow(ctx, color, size);
    this.renderStyle(ctx, color, lineSize / scale, style);
    ctx.scale(scale, scale);
    ctx.translate(pathSize * 0.05 + glowSize * 0.5, pathSize * 0.05 + glowSize * 0.5);
    this.renderColor(ctx, style, path);
    return canvas;
  };
  /**
   * create, setup and render an offscreen canvas for a
   * Star Particle of the given color
   * @param {String} style -  style (either "fill" or "stroke")
   * @param {String} color - the color to fill/stroke with
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @returns {HTMLCanvasElement} - the created offscreen canvas
   */


  Sparticles.prototype.offScreenCanvas.star = function (style, color, canvas) {
    var pathSize = 100;
    var path = new Path2D("M99.86,36.45a2.94,2.94,0,0,0-2.37-2l-31-4.54L52.63,1.64a2.93,2.93,0,0,0-5.26,0L33.51,29.91l-31,4.54a3,3,0,0,0-2.37,2,3,3,0,0,0,.74,3l22.44,22L18,92.55A2.94,2.94,0,0,0,20.91,96a2.86,2.86,0,0,0,1.36-.34L50,81,77.73,95.66a2.91,2.91,0,0,0,3.08-.22A3,3,0,0,0,82,92.55l-5.3-31.07,22.44-22A3,3,0,0,0,99.86,36.45Z");
    var ctx = canvas.getContext("2d");
    var size = this.getOffscreenCanvasSize();
    var lineSize = this.getLineSize(size);
    var glowSize = this.getGlowSize(size);
    var canvasSize = size + lineSize * 2 + glowSize;
    var scale = canvasSize / ((pathSize + glowSize) * 1.1);
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.scale(scale, scale);
    this.renderGlow(ctx, color, size);
    this.renderStyle(ctx, color, lineSize / scale, style);
    ctx.translate(pathSize * 0.05 + glowSize * 0.5, pathSize * 0.05 + glowSize * 0.5);
    this.renderColor(ctx, style, path);
    return canvas;
  };
  /**
   * create, setup and render an offscreen canvas for a
   * Custom Image Particle of the given color
   * @param {HTMLImageElement} image - the image element that has loaded
   * @param {String} color - the color to fill/stroke with
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @returns {HTMLCanvasElement} - the created offscreen canvas
   */


  Sparticles.prototype.drawOffscreenCanvasForImage = function (image, color, canvas) {
    var size = image.width;
    var ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(image, 0, 0, size, size, 0, 0, size, size);
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    return canvas;
  };
  /**
   * - wipe the canvas,
   * - update each sparticle,
   * - render each sparticle
   * - sort so that larger particles on top
   * @returns {Array} the array of Sparticle instances
   */


  Sparticles.prototype.drawFrame = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (var i = 0; i < this.sparticles.length; i++) {
      var sparticle = this.sparticles[i];
      sparticle.update().render(this.canvasses);
    }

    this.sort();
    return this.sparticles;
  };

  return Sparticles;

}());
