//@ sourceMappingURL=jquery.logosDistort.map
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "logosDistort";
    defaults = {
      enable: true,
      effectWeight: 1,
      enableSmoothing: true,
      smoothingMultiplier: 1,
      activeOnlyInside: false,
      outerBuffer: 1.10,
      elementDepth: 140,
      directions: [1, 1, 1, 1, -1, -1, 1, 1],
      weights: [0.0000310, 0.0001800, 0.0000164, 0.0000019, 0.0001200],
      container: window,
      cssClasses: {
        smartContainer: "ld-smart-container",
        overlapContainer: "ld-overlap-container",
        parent3d: "ld-3d-parent",
        transformTarget: "ld-transform-target",
        active: "ld-transform-active",
        object3d: "ld-3d-object"
      },
      onInit: function() {},
      onDestroy: function() {}
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.applyTransform = __bind(this.applyTransform, this);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.container = $(this.settings.container);
        this.$el = $(this.element);
        this.winW = this.container.innerWidth();
        this.winH = this.container.innerHeight();
        this.center = this.getCenterOfContainer();
        this.outerCon = null;
        this.outerConParent = null;
        this.transformTarget = null;
        this.objects3d = null;
        this.mouseX = this.mouseY = 0;
        this.effectX = this.effectY = 0;
        this.has3dSupport = this.has3d();
        this.paused = false;
        this.raf = null;
        this.init();
      }

      Plugin.prototype.init = function() {
        var logos;
        this.createEnvironment();
        this.settings.onInit();
        logos = this;
        $(document).on('mousemove', function(e) {
          logos.mouseX = e.pageX;
          logos.mouseY = e.pageY;
          if (!logos.settings.enableSmoothing && logos.has3dSupport) {
            return logos.draw();
          }
        });
        $(window).on('resize', function() {
          return logos.resizeHandler();
        });
        if (this.has3dSupport) {
          return this.draw();
        } else {
          return console.log("Error: Browser 3d Support Not detected");
        }
      };

      Plugin.prototype.createEnvironment = function() {
        var child, parent3d, _i, _len, _ref;
        this.objects3d = this.$el.children();
        this.$el.html("");
        _ref = this.objects3d;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          $(child).addClass("" + this.settings.cssClasses.object3d);
        }
        this.outerConParent = $("<div class='" + this.settings.cssClasses.smartContainer + "'></div>");
        this.outerCon = $("<div class='" + this.settings.cssClasses.overlapContainer + "'></div>");
        parent3d = $("<div class='" + this.settings.cssClasses.parent3d + "'></div>");
        this.transformTarget = $("<div class='" + this.settings.cssClasses.transformTarget + " " + this.settings.cssClasses.active + "'></div>");
        this.$el.append(this.outerConParent.append(this.outerCon.append(parent3d.append(this.transformTarget.append(this.objects3d)))));
        this.calculateOuterContainer();
        return this.calculate3dObjects();
      };

      Plugin.prototype.setImageDefaults = function(element) {
        var logos;
        logos = this;
        if (element.is("img")) {
          return element.one("load", function() {
            return logos.calculatePerspective(element);
          }).each(function() {
            if (this.complete) {
              return $(this).load();
            }
          });
        } else {
          return logos.calculatePerspective(element);
        }
      };

      Plugin.prototype.calculateOuterContainer = function() {
        var height, width;
        width = this.outerConParent.innerWidth() * this.settings.outerBuffer;
        height = this.outerConParent.innerHeight() * this.settings.outerBuffer;
        return this.outerCon.css({
          width: width.toFixed(2),
          height: height.toFixed(2),
          left: -((width - this.winW) / 2).toFixed(2),
          top: -((height - this.winH) / 2).toFixed(2)
        });
      };

      Plugin.prototype.calculate3dObjects = function() {
        var child, _i, _len, _ref, _results;
        _ref = this.objects3d;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          _results.push(this.setImageDefaults($(child)));
        }
        return _results;
      };

      Plugin.prototype.calculatePerspective = function(ele) {
        var aspect, aspectDevice, aspectElement, dIndex, depth, difference, height, left, top, width;
        ele = $(ele);
        dIndex = ele.index() + 1;
        if (this.objects3d.length > 4) {
          dIndex = dIndex - (this.objects3d.length / 2);
        }
        depth = dIndex * this.settings.elementDepth;
        aspectDevice = this.getAspectRatio();
        aspectElement = this.getAspectRatio(ele);
        if ((isNaN(aspectElement[0])) || ele.is("div")) {
          aspect = aspectDevice;
        } else {
          aspect = aspectElement;
        }
        height = (this.outerConParent.innerHeight() * this.settings.outerBuffer).toFixed(2);
        width = (height * aspect[0]).toFixed(2);
        if (width < this.winW * this.settings.outerBuffer) {
          difference = this.winW / width;
          width = (width * difference * this.settings.outerBuffer).toFixed(2);
          height = (height * difference * this.settings.outerBuffer).toFixed(2);
        }
        left = -((width - this.winW) / 2).toFixed(2);
        top = -((height - this.winH) / 2).toFixed(2);
        return ele.attr('style', "transform: translate3d(" + left + "px, " + top + "px, " + depth + "px); width:" + width + "px; height:" + height + "px;");
      };

      /*
        Drawing Involved Functions
      */


      Plugin.prototype.draw = function() {
        var logos;
        logos = this;
        if (!this.settings.enableSmoothing) {
          this.effectX = this.mouseX;
          this.effectY = this.mouseY;
          if (!this.paused) {
            this.changePerspective(this.transformTarget, this.effectX, this.effectY);
            return this.raf = requestAnimationFrame(function() {
              return logos.draw();
            });
          }
        } else {
          return setInterval((function() {
            logos.calculateSmoothing();
            return logos.changePerspective(logos.transformTarget, logos.effectX, logos.effectY);
          }), 15);
        }
      };

      Plugin.prototype.start = function() {
        var paused;
        paused = false;
        return this.draw();
      };

      Plugin.prototype.stop = function() {
        var paused;
        return paused = true;
      };

      Plugin.prototype.changePerspective = function(element, appliedX, appliedY) {
        var logos;
        logos = this;
        return requestAnimationFrame(function() {
          return $(element).attr('style', logos.calculateTransform(appliedX, appliedY));
        });
      };

      Plugin.prototype.calculateTransform = function(appliedX, appliedY) {
        var transform1, transform2, transform3, transform4, transform5, transform6, transform7, transform8;
        transform1 = (this.settings.directions[0] * (1 - (this.applyTransform(this.getDistanceFromCenter(appliedX, appliedY), 0)) * this.settings.effectWeight)).toFixed(5);
        transform2 = (this.settings.directions[1] * (this.applyTransform(this.getDistanceFromCenterY(appliedX), 1)) * this.settings.effectWeight).toFixed(5);
        transform3 = (this.settings.directions[2] * (this.applyTransform(this.getDistanceFromEdgeCenterAndCenter(appliedX, appliedY), 2)) * this.settings.effectWeight).toFixed(5);
        transform4 = (this.settings.directions[3] * (1 - (this.applyTransform(this.getDistanceFromCenter(appliedX, appliedY), 3)) * this.settings.effectWeight)).toFixed(5);
        transform5 = (this.settings.directions[4] * (this.applyTransform(this.getDistanceFromCenterX(appliedY), 4)) * this.settings.effectWeight).toFixed(5);
        transform6 = (this.settings.directions[5] * transform2).toFixed(5);
        transform7 = (this.settings.directions[6] * transform5).toFixed(5);
        transform8 = (this.settings.directions[7] * (Math.abs(transform4))).toFixed(5);
        return "transform: matrix3d(" + transform1 + ", 0, " + transform2 + ", 0, " + transform3 + ", " + transform4 + ", " + transform5 + ",          0, " + transform6 + ", " + transform7 + ", " + transform8 + ", 0, 0, 0, 100, 1)";
      };

      Plugin.prototype.applyTransform = function(distance, effect) {
        return distance * this.settings.weights[effect];
      };

      Plugin.prototype.getDistanceFromCenter = function(appliedX, appliedY) {
        return this.getDistance2d(appliedX, appliedY, this.center.x, this.center.y);
      };

      Plugin.prototype.getDistanceFromCenterY = function(appliedX) {
        return appliedX - this.center.x / 2;
      };

      Plugin.prototype.getDistanceFromCenterX = function(appliedY) {
        return appliedY - this.center.y / 2;
      };

      Plugin.prototype.getDistanceFromEdgeCenterAndCenter = function(appliedX, appliedY) {
        var fromCenter, fromX, fromY;
        fromCenter = this.getDistanceFromCenter(appliedX, appliedY);
        fromX = this.getDistanceFromCenterX(appliedY);
        fromY = this.getDistanceFromCenterY(appliedX);
        return -((fromCenter / 100) * (fromX / 50) * (fromY / 50));
      };

      /*
        Smoothing Functions
      */


      Plugin.prototype.calculateSmoothing = function() {
        this.effectX += (this.mouseX - this.effectX) / (20 * this.settings.smoothingMultiplier);
        return this.effectY += (this.mouseY - this.effectY) / (20 * this.settings.smoothingMultiplier);
      };

      /*
        Basic Support Functions
      */


      Plugin.prototype.getDistance2d = function(currX, currY, targetX, targetY) {
        return Math.sqrt((Math.pow(currX - targetX, 2)) + (Math.pow(currY - targetY, 2)));
      };

      Plugin.prototype.getCenterOfContainer = function() {
        return {
          x: this.winW / 2,
          y: this.winH / 2
        };
      };

      Plugin.prototype.getAspectRatio = function(ele) {
        if (ele == null) {
          ele = window;
        }
        ele = $(ele);
        return [ele.innerWidth() / ele.innerHeight(), ele.innerHeight() / ele.innerWidth()];
      };

      Plugin.prototype.resizeHandler = function() {
        this.container = $(this.settings.container);
        this.winW = this.container.innerWidth();
        this.winH = this.container.innerHeight();
        this.center = this.getCenterOfContainer();
        this.calculateOuterContainer();
        return this.calculate3dObjects();
      };

      /*
        Checks for browser compatibility of 'transform: Matrix3d'
        Based on a Gist by Tiffany B. Brown
        http://tiffanybbrown.com/2012/09/04/testing-for-css-3d-transforms-support/
      */


      Plugin.prototype.has3d = function() {
        var el, support3d, t, transforms;
        el = document.createElement('p');
        transforms = {
          'WebkitTransform': '-webkit-transform',
          'OTransform': '-o-transform',
          'MSTransform': '-ms-transform',
          'MozTransform': '-moz-transform',
          'transform': 'transform'
        };
        support3d = void 0;
        document.body.insertBefore(el, document.body.lastChild);
        for (t in transforms) {
          if (el.style[t] !== void 0) {
            el.style[t] = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
            support3d = window.getComputedStyle(el);
            support3d = support3d.getPropertyValue(transforms[t]);
          }
        }
        if (support3d != null) {
          return support3d !== 'none';
        } else {
          return false;
        }
      };

      Plugin.prototype.destroy = function() {
        this.$el.remove();
        this.hook('onDestroy');
        return this.$el.removeData("plugin_" + pluginName);
      };

      Plugin.prototype.hook = function(hookName) {
        if (options[hookName] != null) {
          return options[hookName].call(this.element);
        }
      };

      return Plugin;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window, document);

  /*
  http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  CoffeeScript implementation by Mathew Kleppin
  MIT license
  */


  (function() {
    var lastTime, vendor, vendorSetup, vendors, _i, _len;
    lastTime = 0;
    vendors = ['ms', 'moz', 'webkit', 'o'];
    vendorSetup = function(vendor) {
      window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
      return window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
    };
    for (_i = 0, _len = vendors.length; _i < _len; _i++) {
      vendor = vendors[_i];
      vendorSetup(vendor);
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime, id, timeToCall;
        currTime = new Date().getTime();
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
        id = window.setTimeout((function() {
          return callback(currTime + timeToCall);
        }), timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      return window.cancelAnimationFrame = function(id) {
        return clearTimeout(id);
      };
    }
  });

}).call(this);
