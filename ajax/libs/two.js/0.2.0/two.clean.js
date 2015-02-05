/**
 * two.js
 * a two-dimensional drawing api meant for modern browsers. It is renderer 
 * agnostic enabling the same api for rendering in multiple contexts: webgl, 
 * canvas2d, and svg.
 *
 * Copyright (c) 2012 - 2013 jonobr1 / http://jonobr1.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = 
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());
(function() {

  var root = this;
  var previousTwo = root.Two || {};

  /**
   * Constants
   */

  var sin = Math.sin,
    cos = Math.cos,
    atan2 = Math.atan2,
    sqrt = Math.sqrt,
    round = Math.round,
    abs = Math.abs,
    PI = Math.PI,
    TWO_PI = PI * 2,
    HALF_PI = PI / 2,
    pow = Math.pow;

  /**
   * Cross browser dom events.
   */
  var dom = {

    hasEventListeners: _.isFunction(root.addEventListener),

    bind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.addEventListener(event, func, !!bool);
      } else {
        elem.attachEvent('on' + event, func);
      }
      return this;
    },

    unbind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.removeEventListeners(event, func, !!bool);
      } else {
        elem.detachEvent('on' + event, func);
      }
      return this;
    }

  };

  /**
   * @class
   */
  var Two = root.Two = function(options) {

    // Determine what Renderer to use and setup a scene.

    var params = _.defaults(options || {}, {
      fullscreen: false,
      width: 640,
      height: 480,
      type: Two.Types.svg,
      autostart: false
    });

    this.type = params.type;
    this.renderer = new Two[this.type](this);
    Two.Utils.setPlaying.call(this, params.autostart);
    this.frameCount = 0;

    if (params.fullscreen) {

      var fitted = _.bind(fitToWindow, this);
      _.extend(document.body.style, {
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      _.extend(this.renderer.domElement.style, {
        display: 'block',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      dom.bind(window, 'resize', fitted);
      fitted();


    } else {

      this.renderer.setSize(params.width, params.height);
      this.width = params.width;
      this.height = params.height;

    }

    this.scene = new Two.Group();
    this.renderer.add(this.scene);

    Two.Instances.push(this);

  };

  _.extend(Two, {

    /**
     * Primitive
     */

    Array: root.Float32Array || Array,

    Types: {
      webgl: 'WebGLRenderer',
      svg: 'SVGRenderer',
      canvas: 'CanvasRenderer'
    },

    Properties: {
      hierarchy: 'hierarchy',
      demotion: 'demotion'
    },

    Events: {
      play: 'play',
      pause: 'pause',
      update: 'update',
      render: 'render',
      resize: 'resize',
      change: 'change'
    },

    Resolution: 8,

    Instances: [],

    noConflict: function() {
      root.Two = previousTwo;
      return this;
    },

    Utils: {

      Curve: {

        CollinearityEpsilon: pow(10, -30),

        RecursionLimit: 16,

        CuspLimit: 0,

        Tolerance: {
          distance: 0.25,
          angle: 0,
          epsilon: 0.01
        }

      },

      /**
       * Properly defer play calling until after all objects
       * have been updated with their newest styles.
       */
      setPlaying: function(b) {

        _.defer(_.bind(function() {
          this.playing = !!b;
        }, this));

      },

      applySvgAttributes: function(node, elem) {

        elem.cap = 'butt';
        elem.join = 'bevel';

        _.each(node.attributes, function(v, k) {

          var property = v.nodeName;

          switch (property) {

            case 'transform':

              // Need to figure out how to decompose matrix into
              // translation, rotation, scale.

              // var transforms = node[k].baseVal;
              // var matrix = new Two.Matrix();
              // _.each(_.range(transforms.numberOfItems), function(i) {
              //   var m = transforms.getItem(i).matrix;
              //   matrix.multiply(m.a, m.b, m.c, m.d, m.e, m.f);
              // });
              // elem.setMatrix(matrix);
              break;
            case 'visibility':
              elem.visible = !!v.nodeValue;
              break;
            case 'stroke-linecap':
              elem.cap = v.nodeValue;
              break;
            case 'stroke-linejoin':
              elem.join = v.nodeValue;
              break;
            case 'stroke-miterlimit':
              elem.miter = v.nodeValue;
              break;
            case 'stroke-width':
              elem.linewidth = parseFloat(v.nodeValue);
              break;
            case 'stroke-opacity':
            case 'fill-opacity':
              elem.opacity = v.nodeValue;
              break;
            case 'fill':
              elem.fill = v.nodeValue;
              break;
            case 'stroke':
              elem.stroke = v.nodeValue;
              break;
          }

        });

        return elem;

      },

      /**
       * Read any number of SVG node types and create Two equivalents of them.
       */
      read: {

        svg: function() {
          return Two.Utils.read.g.apply(this, arguments);
        },

        g: function(node) {

          var group = new Two.Group();

          this.add(group);

          _.each(node.childNodes, function(n) {

            if (!n.localName) {
              return;
            }

            var tag = n.localName.toLowerCase();

            if ((tag in Two.Utils.read)) {
              n = Two.Utils.read[tag].call(this, n);
              group.add(n);
            }

          }, this);

          return Two.Utils.applySvgAttributes(node, group);

        },

        polygon: function(node, open) {

          var points = node.points;
          var verts = _.map(_.range(points.numberOfItems), function(i) {
            var p = points.getItem(i);
            return new Two.Vector(p.x, p.y);
          });

          var poly = new Two.Polygon(verts, !open).noStroke();

          return Two.Utils.applySvgAttributes(node, poly);

        },

        polyline: function(node) {
          return Two.Utils.read.polygon(node, true);
        },

        path: function(node) {

          var data = node.getAttribute('d');
          // Retrieve an array of all commands.
          var paths = _.flatten(_.map(_.compact(data.split(/M/g)), function(str) {
            var rels = _.map(_.compact(str.split(/m/g)), function(str, i) {
              if (i <= 0) {
                return str;
              }
              return 'm' + str;
            });
            rels[0] = 'M' + rels[0];
            return rels;
          }));

          // Create Two.Polygons from the paths.
          var length = paths.length;
          var coord = new Two.Vector();
          var control = new Two.Vector();
          var polys = _.map(paths, function(path) {

            var coords, relative = false;
            var closed = false;

            var points = _.flatten(_.map(path.match(/[a-z][^a-z]*/ig), function(command) {

              var result, x, y;
              var type = command[0];
              var lower = type.toLowerCase();

              coords = command.slice(1).trim().split(/[\s,]+|(?=[+\-])/);
              relative = type === lower;

              var x1, y1, x2, y2, x3, y3, x4, y4, reflection;

              switch(lower) {

                case 'z':
                  closed = true;
                  break;

                case 'm':
                case 'l':

                  x = parseFloat(coords[0]);
                  y = parseFloat(coords[1]);

                  result = new Two.Vector(x, y);

                  if (relative) {
                    result.addSelf(coord);
                  }

                  coord.copy(result);
                  break;

                case 'h':
                case 'v':

                  var a = lower === 'h' ? 'x' : 'y';
                  var b = a === 'x' ? 'y' : 'x';

                  result = new Two.Vector();
                  result[a] = parseFloat(coords[0]);
                  result[b] = coord[b];

                  if (relative) {
                    result[a] += coord[a];
                  }

                  coord.copy(result);
                  break;

                case 's':
                case 'c':

                  x1 = coord.x, y1 = coord.y;

                  if (lower === 'c') {

                    x2 = parseFloat(coords[0]), y2 = parseFloat(coords[1]);
                    x3 = parseFloat(coords[2]), y3 = parseFloat(coords[3]);
                    x4 = parseFloat(coords[4]), y4 = parseFloat(coords[5]);

                  } else {

                    // Calculate reflection control point for proper x2, y2
                    // inclusion.

                    reflection = new Two.Vector().copy(coord).subSelf(control);

                    x2 = parseFloat(reflection.x), y2 = parseFloat(reflection.y);
                    x3 = parseFloat(coords[0]), y3 = parseFloat(coords[1]);
                    x4 = parseFloat(coords[2]), y4 = parseFloat(coords[3]);

                  }

                  if (relative) {
                    x2 += x1, y2 += y1;
                    x3 += x1, y3 += y1;
                    x4 += x1, y4 += y1;
                  }

                  result = Two.Utils.subdivide(x1, y1, x2, y2, x3, y3, x4, y4);
                  coord.set(x4, y4);
                  control.set(x3, y3);
                  break;

                case 't':
                case 'q':

                  x1 = coord.x, y1 = coord.y;
                  if (control.isZero()) {
                    x2 = x1, y2 = y1;
                  } else {
                    x2 = control.x, y1 = control.y;
                  }

                  if (lower === 'q') {

                    x3 = parseFloat(coords[0]), y3 = parseFloat(coords[1]);
                    x4 = parseFloat(coords[1]), y4 = parseFloat(coords[2]);

                  } else {

                    reflection = new Two.Vector().copy(coord).subSelf(control);

                    x3 = parseFloat(reflection.x), y3 = parseFloat(reflection.y);
                    x4 = parseFloat(coords[0]), y4 = parseFloat(coords[1]);

                  }

                  if (relative) {
                    x2 += x1, y2 += y1;
                    x3 += x1, y3 += y1;
                    x4 += x1, y4 += y1;
                  }

                  result = Two.Utils.subdivide(x1, y1, x2, y2, x3, y3, x4, y4);
                  coord.set(x4, y4);
                  control.set(x3, y3);
                  break;

                case 'a':
                  throw new Two.Utils.Error('not yet able to interpret Elliptical Arcs.');
              }

              return result;

            }));

            if (_.isUndefined(points[points.length - 1])) {
              points.pop();
            }

            var poly = new Two.Polygon(points, closed).noStroke();
            return Two.Utils.applySvgAttributes(node, poly);

          });

          return polys;

        },

        circle: function(node) {

          var x = parseFloat(node.getAttribute('cx'));
          var y = parseFloat(node.getAttribute('cy'));
          var r = parseFloat(node.getAttribute('r'));

          var amount = Two.Resolution;
          var points = _.map(_.range(amount), function(i) {
            var pct = i / amount;
            var theta = pct * TWO_PI;
            var x = r * cos(theta);
            var y = r * sin(theta);
            return new Two.Vector(x, y);
          }, this);

          var circle = new Two.Polygon(points, true, true).noStroke();
          circle.translation.set(x, y);

          return Two.Utils.applySvgAttributes(node, circle);

        },

        ellipse: function(node) {

          var x = parseFloat(node.getAttribute('cx'));
          var y = parseFloat(node.getAttribute('cy'));
          var width = parseFloat(node.getAttribute('rx'));
          var height = parseFloat(node.getAttribute('ry'));

          var amount = Two.Resolution;
          var points = _.map(_.range(amount), function(i) {
            var pct = i / amount;
            var theta = pct * TWO_PI;
            var x = width * cos(theta);
            var y = height * sin(theta);
            return new Two.Vector(x, y);
          }, this);

          var ellipse = new Two.Polygon(points, true, true).noStroke();
          ellipse.translation.set(x, y);

          return Two.Utils.applySvgAttributes(node, ellipse);

        },

        rect: function(node) {

          var x = parseFloat(node.getAttribute('x'));
          var y = parseFloat(node.getAttribute('y'));
          var width = parseFloat(node.getAttribute('width'));
          var height = parseFloat(node.getAttribute('height'));

          var w2 = width / 2;
          var h2 = height / 2;

          var points = [
            new Two.Vector(w2, h2),
            new Two.Vector(-w2, h2),
            new Two.Vector(-w2, -h2),
            new Two.Vector(w2, -h2)
          ];

          var rect = new Two.Polygon(points, true).noStroke();
          rect.translation.set(x + w2, y + h2);

          return Two.Utils.applySvgAttributes(node, rect);

        },

        line: function(node) {

          var x1 = parseFloat(node.getAttribute('x1'));
          var y1 = parseFloat(node.getAttribute('y1'));
          var x2 = parseFloat(node.getAttribute('x2'));
          var y2 = parseFloat(node.getAttribute('y2'));

          var width = x2 - x1;
          var height = y2 - y1;

          var w2 = width / 2;
          var h2 = height / 2;

          var points = [
            new Two.Vector(- w2, - h2),
            new Two.Vector(w2, h2)
          ];

          // Center line and translate to desired position.

          var line = new Two.Polygon(points).noFill();
          line.translation.set(x1 + w2, y1 + h2);

          return Two.Utils.applySvgAttributes(node, line);

        }

      },

      /**
       * Given 2 points (a, b) and corresponding control point for each
       * return an array of points that represent an Adaptive Subdivision
       * of Bezier Curves. Founded in the online article:
       *
       * http://www.antigrain.com/research/adaptive_bezier/index.html
       *
       * Where level represents how many levels deep the function has
       * already recursed.
       *
       */
      subdivide: function(x1, y1, x2, y2, x3, y3, x4, y4, level) {

        // Constants
        var epsilon = Two.Utils.Curve.CollinearityEpsilon,
          limit = Two.Utils.Curve.RecursionLimit,
          cuspLimit = Two.Utils.Curve.CuspLimit,
          tolerance = Two.Utils.Curve.Tolerance,
          da1, da2;

        level = level || 0;

        if (level > limit) {
          return [];
        }

        var x12 = (x1 + x2) / 2,
            y12 = (y1 + y2) / 2,
            x23 = (x2 + x3) / 2,
            y23 = (y2 + y3) / 2,
            x34 = (x3 + x4) / 2,
            y34 = (y3 + y4) / 2,
            x123  = (x12 + x23) / 2,
            y123  = (y12 + y23) / 2,
            x234  = (x23 + x34) / 2,
            y234  = (y23 + y34) / 2,
            x1234 = (x123 + x234) / 2,
            y1234 = (y123 + y234) / 2;


        // Try to approximate the full cubic curve by a single straight line.
        var dx = x4 - x1;
        var dy = y4 - y1;

        var d2 = abs(((x2 - x4) * dy - (y2 - y4) * dx));
        var d3 = abs(((x3 - x4) * dy - (y3 - y4) * dx));

        if (level > 0) {

          if (d2 > epsilon && d3 > epsilon) {

            if ((d2 + d3) * (d2 + d3) <= tolerance.distance * (dx * dx + dy * dy)) {

              if (tolerance.angle < tolerance.epsilon) {
                return [new Two.Vector(x1234, y1234)];
              }

              var a23 = atan2(y3 - y2, x3 - x2);
              da1 = abs(a23 - atan2(y2 - y1, x2 - x1));
              da2 = abs(atan2(y4 - y3, x4 - x3) - a23);

              if (da1 >= PI) da1 = TWO_PI - da1;
              if (da2 >= PI) da2 = TWO_PI - da2;

              if (da1 + da2 < tolerance.angle) {
                return [new Two.Vector(x1234, y1234)];
              }

              if (cuspLimit !== 0) {

                if (da1 > cuspLimit) {
                  return [new Two.Vector(x2, y2)];
                }

                if (da2 > cuspLimit) {
                  return [new Two.Vector(x3, y3)];
                }

              }

            }

          }

        } else {

          if (d2 > epsilon) {

            if (d2 * d2 <= tolerance.distance * (dx * dx + dy * dy)) {

              if (tolerance.angle < tolerance.epsilon) {
                return [new Two.Vector(x1234, y1234)];
              }

              da1 = abs(atan2(y3 - y2, x3 - x2) - atan2(y2 - y1, x2 - x1));
              if (da1 >= PI) da1 = TWO_PI - da1;

              if (da1 < tolerance.angle) {
                return [
                  new Two.Vector(x2, y2),
                  new Two.Vector(x3, y3)
                ];
              }

              if (cuspLimit !== 0) {

                if (da1 > cuspLimit) {
                  return [new Two.Vector(x2, y2)];
                }

              }

            } else if (d3 > epsilon) {

              if (d3 * d3 <= tolerance.distance * (dx * dx + dy * dy)) {

                if (tolerance.angle < tolerance.epsilon) {
                  return [new Two.Vector(x1234, y1234)];
                }

                da1 = abs(atan2(y4 - y3, x4 - x3) - atan2(y3 - y2, x3 - x2));
                if (da1 >= PI) da1 = TWO_PI - da1;

                if (da1 < tolerance.angle) {
                  return [
                    new Two.Vector(x2, y2),
                    new Two.Vector(x3, y3)
                  ];
                }

                if (cuspLimit !== 0) {

                  if (da1 > cuspLimit) {
                    return [new Two.Vector2(x3, y3)];
                  }

                }

              }

            } else {

              dx = x1234 - (x1 + x4) / 2;
              dy = y1234 - (y1 + y4) / 2;
              if (dx * dx + dy * dy <= tolerance.distance) {
                return [new Two.Vector(x1234, y1234)];
              }

            }

          }

        }

        return Two.Utils.subdivide(
          x1, y1, x12, y12, x123, y123, x1234, y1234, level + 1
        ).concat(Two.Utils.subdivide(
          x1234, y1234, x234, y234, x34, y34, x4, y4, level + 1
        ));

      },

      /**
       * Creates a set of points that have u, v values for anchor positions
       */
      getCurveFromPoints: function(points, closed) {

        var curve = [], l = points.length, last = l - 1;

        for (var i = 0; i < l; i++) {

          var p = points[i];
          var point = { x: p.x, y: p.y };
          curve.push(point);

          var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

          var a = points[prev];
          var b = point;
          var c = points[next];
          getControlPoints(a, b, c);

          if (!b.u.x && !b.u.y) {
            b.u.x = b.x;
            b.u.y = b.y;
          }

          if (!b.v.x && !b.v.y) {
            b.v.x = b.x;
            b.v.y = b.y;
          }

        }

        return curve;

      },

      /**
       * Given three coordinates return the control points for the middle, b,
       * vertex.
       */
      getControlPoints: function(a, b, c) {

        var a1 = angleBetween(a, b);
        var a2 = angleBetween(c, b);

        var d1 = distanceBetween(a, b);
        var d2 = distanceBetween(c, b);

        var mid = (a1 + a2) / 2;

        // So we know which angle corresponds to which side.

        var u, v;

        if (d1 < 0.0001 || d2 < 0.0001) {
          b.u = { x: b.x, y: b.y };
          b.v = { x: b.x, y: b.y };
          return b;
        }

        d1 *= 0.33; // Why 0.33?
        d2 *= 0.33;

        if (a2 < a1) {
          mid += HALF_PI;
        } else {
          mid -= HALF_PI;
        }

        u = {
          x: b.x + cos(mid) * d1,
          y: b.y + sin(mid) * d1
        };

        mid -= PI;

        v = {
          x: b.x + cos(mid) * d2,
          y: b.y + sin(mid) * d2
        };

        b.u = u;
        b.v = v;

        return b;

      },

      angleBetween: function(A, B) {

        var dx = A.x - B.x;
        var dy = A.y - B.y;

        return atan2(dy, dx);

      },

      distanceBetweenSquared: function(p1, p2) {

        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;

        return dx * dx + dy * dy;

      },

      distanceBetween: function(p1, p2) {

        return sqrt(distanceBetweenSquared(p1, p2));

      },

      mod: function(v, l) {

        while (v < 0) {
          v += l;
        }

        return v % l;

      },

      // Custom Error Throwing for Two.js

      Error: function(message) {
        this.name = 'two.js';
        this.message = message;
      }

    }

  });

  Two.Utils.Error.prototype = new Error();
  Two.Utils.Error.prototype.constructor = Two.Utils.Error;

  // Localize utils

  var distanceBetween = Two.Utils.distanceBetween,
    distanceBetweenSquared = Two.Utils.distanceBetweenSquared,
    angleBetween = Two.Utils.angleBetween,
    getControlPoints = Two.Utils.getControlPoints,
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    solveSegmentIntersection = Two.Utils.solveSegmentIntersection,
    decoupleShapes = Two.Utils.decoupleShapes,
    mod = Two.Utils.mod;

  _.extend(Two.prototype, Backbone.Events, {

    appendTo: function(elem) {

      elem.appendChild(this.renderer.domElement);
      return this;

    },

    play: function() {

      Two.Utils.setPlaying.call(this, true);

      return this.trigger(Two.Events.play);

    },

    pause: function() {

      this.playing = false;

      return this.trigger(Two.Events.pause);

    },

    /**
     * Update positions and calculations in one pass before rendering.
     */
    update: function() {

      var animated = !!this._lastFrame;
      var now = getNow();

      this.frameCount++;

      if (animated) {
        this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
      }
      this._lastFrame = now;

      var width = this.width;
      var height = this.height;
      var renderer = this.renderer;

      // Update width / height for the renderer
      if (width !== renderer.width || height !== renderer.height) {
        renderer.setSize(width, height);
      }

      this.trigger(Two.Events.update, this.frameCount, this.timeDelta);

      return this.render();

    },

    /**
     * Render all drawable - visible objects of the scene.
     */
    render: function() {

      this.renderer.render();

      return this.trigger(Two.Events.render, this.frameCount);

    },

    /**
     * Convenience Methods
     */

    add: function(o) {

      var objects = o;
      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      this.scene.add(objects);
      return this;

    },

    makeLine: function(x1, y1, x2, y2) {

      var width = x2 - x1;
      var height = y2 - y1;

      var w2 = width / 2;
      var h2 = height / 2;

      var points = [
        new Two.Vector(- w2, - h2),
        new Two.Vector(w2, h2)
      ];

      // Center line and translate to desired position.

      var line = new Two.Polygon(points).noFill();
      line.translation.set(x1 + w2, y1 + h2);

      this.scene.add(line);
      return line;

    },

    makeRectangle: function(x, y, width, height) {

      var w2 = width / 2;
      var h2 = height / 2;

      var points = [
        new Two.Vector(w2, h2),
        new Two.Vector(-w2, h2),
        new Two.Vector(-w2, -h2),
        new Two.Vector(w2, -h2)
      ];

      var rect = new Two.Polygon(points, true);
      rect.translation.set(x, y);

      this.scene.add(rect);
      return rect;

    },

    makeCircle: function(ox, oy, r) {

      return this.makeEllipse(ox, oy, r, r);

    },

    makeEllipse: function(ox, oy, width, height) {

      var amount = Two.Resolution;

      var points = _.map(_.range(amount), function(i) {
        var pct = i / amount;
        var theta = pct * TWO_PI;
        var x = width * cos(theta);
        var y = height * sin(theta);
        return new Two.Vector(x, y);
      }, this);

      var ellipse = new Two.Polygon(points, true, true);
      ellipse.translation.set(ox, oy);

      this.scene.add(ellipse);

      return ellipse;

    },

    makeCurve: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Vector(x, y));
        }
      }

      var last = arguments[l - 1];
      var poly = new Two.Polygon(points, !(_.isBoolean(last) ? last : undefined), true);
      var rect = poly.getBoundingClientRect();

      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      _.each(poly.vertices, function(v) {
        v.x -= cx;
        v.y -= cy;
      });

      poly.translation.set(cx, cy);

      this.scene.add(poly);

      return poly;

    },

    /**
     * Convenience method to make and draw a Two.Polygon.
     */
    makePolygon: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Vector(x, y));
        }
      }

      var last = arguments[l - 1];
      var poly = new Two.Polygon(points, !(_.isBoolean(last) ? last : undefined));
      poly.center();

      this.scene.add(poly);

      return poly;

    },

    makeGroup: function(o) {

      var objects = o;
      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      var group = new Two.Group();
      this.scene.add(group);
      group.add(objects);

      return group;

    },

    // Utility Functions will go here.

    /**
     * Interpret an SVG Node and add it to this instance's scene. The
     * distinction should be made that this doesn't `import` svg's, it solely
     * interprets them into something compatible for Two.js — this is slightly
     * different than a direct transcription.
     */
    interpret: function(svgNode) {

      var tag = svgNode.tagName.toLowerCase();

      if (!(tag in Two.Utils.read)) {
        return null;
      }

      var node = Two.Utils.read[tag].call(this, svgNode);

      this.add(node);

      return node;

    }

  });

  function fitToWindow() {

    var wr = document.body.getBoundingClientRect();

    var width = this.width = wr.width;
    var height = this.height = wr.height;

    this.renderer.setSize(width, height);
    this.trigger(Two.Events.resize, width, height);

  }

  function getNow() {
    return ((window.performance && window.performance.now)
      ? window.performance : Date).now();
  }

  // Request Animation Frame

  (function() {

    _.each(Two.Instances, function(t) {

      if (t.playing) {
        t.update();
      }

    });

    requestAnimationFrame(arguments.callee);

  })();

})();
(function() {

  var Vector = Two.Vector = function(x, y) {

    x = x || 0;
    y = y || 0;

    Object.defineProperty(this, 'x', {
      get: function() {
        return x;
      },
      set: function(v) {
        x = v;
        this.trigger('change', 'x');
      }
    });

    Object.defineProperty(this, 'y', {
      get: function() {
        return y;
      },
      set: function(v) {
        y = v;
        this.trigger('change', 'y');
      }
    });

  };

  _.extend(Vector, {

  });

  _.extend(Vector.prototype, Backbone.Events, {

    set: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    copy: function(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    },

    clear: function() {
      this.x = 0;
      this.y = 0;
      return this;
    },

    clone: function() {
      return new Vector(this.x, this.y);
    },

    add: function(v1, v2) {
      this.x = v1.x + v2.x;
      this.y = v1.y + v2.y;
      return this;
    },

    addSelf: function(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    },

    sub: function(v1, v2) {
      this.x = v1.x - v2.x;
      this.y = v1.y - v2.y;
      return this;
    },

    subSelf: function(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    },

    multiplySelf: function(v) {
      this.x *= v.x;
      this.y *= v.y;
      return this;
    },

    multiplyScalar: function(s) {
      this.x *= s;
      this.y *= s;
      return this;
    },

    divideScalar: function(s) {
      if (s) {
        this.x /= s;
        this.y /= s;
      } else {
        this.set(0, 0);
      }
      return this;
    },

    negate: function() {
      return this.multiplyScalar(-1);
    },

    dot: function(v) {
      return this.x * v.x + this.y * v.y;
    },

    lengthSquared: function() {
      return this.x * this.x + this.y * this.y;
    },

    length: function() {
      return Math.sqrt(this.lengthSquared());
    },

    normalize: function() {
      return this.divideScalar(this.length());
    },

    distanceTo: function(v) {
      return Math.sqrt(this.distanceToSquared(v));
    },

    distanceToSquared: function(v) {
      var dx = this.x - v.x, dy = this.y - v.y;
      return dx * dx + dy * dy;
    },

    setLength: function(l) {
      return this.normalize().multiplyScalar(l);
    },

    equals: function(v) {
      return (this.distanceTo(v) < 0.0001 /* almost same position */);
    },

    lerp: function(v, t) {
      var x = (v.x - this.x) * t + this.x;
      var y = (v.y - this.y) * t + this.y;
      return this.set(x, y);
    },

    isZero: function() {
      return (this.length() < 0.0001 /* almost zero */ );
    }

  });

})();
(function() {

  /**
   * Constants
   */
  var range = _.range(6),
    cos = Math.cos, sin = Math.sin, tan = Math.tan;

  /**
   * Two.Matrix contains an array of elements that represent
   * the two dimensional 3 x 3 matrix as illustrated below:
   *
   * =====
   * a b c
   * d e f
   * g h i  // this row is not really used in 2d transformations
   * =====
   *
   * String order is for transform strings: a, d, b, e, c, f
   *
   * @class
   */
  var Matrix = Two.Matrix = function(a, b, c, d, e, f) {

    this.elements = new Two.Array(9);

    var elements = a;
    if (!_.isArray(elements)) {
      elements = _.toArray(arguments);
    }

    // initialize the elements with default values.

    this.identity().set(elements);

  };

  _.extend(Matrix, {

    Identity: [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ],

    /**
     * Multiply two matrix 3x3 arrays
     */
    Multiply: function(A, B) {

      if (B.length <= 3) { // Multiply Vector

        var x, y, z;
        var a = B[0] || 0, b = B[1] || 0, c = B[2] || 0;
        var e = A;

        // Go down rows first
        // a, d, g, b, e, h, c, f, i

        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;

        return { x: x, y: y, z: z };

      }

      var A0 = A[0], A1 = A[1], A2 = A[2];
      var A3 = A[3], A4 = A[4], A5 = A[5];
      var A6 = A[6], A7 = A[7], A8 = A[8];

      var B0 = B[0], B1 = B[1], B2 = B[2];
      var B3 = B[3], B4 = B[4], B5 = B[5];
      var B6 = B[6], B7 = B[7], B8 = B[8];

      return [
        A0 * B0 + A1 * B3 + A2 * B6,
        A0 * B1 + A1 * B4 + A2 * B7,
        A0 * B2 + A1 * B5 + A2 * B8,
        A3 * B0 + A4 * B3 + A5 * B6,
        A3 * B1 + A4 * B4 + A5 * B7,
        A3 * B2 + A4 * B5 + A5 * B8,
        A6 * B0 + A7 * B3 + A8 * B6,
        A6 * B1 + A7 * B4 + A8 * B7,
        A6 * B2 + A7 * B5 + A8 * B8
      ];
    }

  });

  _.extend(Matrix.prototype, {

    /**
     * Takes an array of elements or the arguments list itself to
     * set and update the current matrix's elements. Only updates
     * specified values.
     */
    set: function(a, b, c, d, e, f) {

      var elements = a, l = arguments.length;
      if (!_.isArray(elements)) {
        elements = _.toArray(arguments);
      }

      _.each(elements, function(v, i) {
        if (_.isNumber(v)) {
          this.elements[i] = v;
        }
      }, this);

      return this;

    },

    /**
     * Turn matrix to identity, like resetting.
     */
    identity: function() {

      this.set(Matrix.Identity);

      return this;

    },

    /**
     * Multiply scalar or multiply by another matrix.
     */
    multiply: function(a, b, c, d, e, f, g, h, i) {

      var elements = arguments, l = elements.length;

      // Multiply scalar

      if (l <= 1) {

        _.each(this.elements, function(v, i) {
          this.elements[i] = v * a;
        }, this);

        return this;

      }

      if (l <= 3) { // Multiply Vector

        var x, y, z;
        a = a || 0, b = b || 0, c = c || 0;
        e = this.elements;

        // Go down rows first
        // a, d, g, b, e, h, c, f, i

        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;

        return { x: x, y: y, z: z };

      }

      // Multiple matrix

      var A = this.elements;
      var B = elements;

      A0 = A[0], A1 = A[1], A2 = A[2];
      A3 = A[3], A4 = A[4], A5 = A[5];
      A6 = A[6], A7 = A[7], A8 = A[8];

      B0 = B[0], B1 = B[1], B2 = B[2];
      B3 = B[3], B4 = B[4], B5 = B[5];
      B6 = B[6], B7 = B[7], B8 = B[8];

      this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
      this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
      this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;

      this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
      this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
      this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;

      this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
      this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
      this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;

      return this;

    },

    /**
     * Set a scalar onto the matrix.
     */
    scale: function(sx, sy) {

      var l = arguments.length;
      if (l <= 1) {
        sy = sx;
      }

      return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);

    },

    /**
     * Rotate the matrix.
     */
    rotate: function(radians) {

      var c = cos(radians);
      var s = sin(radians);

      return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);

    },

    /**
     * Translate the matrix.
     */
    translate: function(x, y) {

      return this.multiply(1, 0, x, 0, 1, y, 0, 0, 1);

    },

    /*
     * Skew the matrix by an angle in the x axis direction.
     */
    skewX: function(radians) {

      var a = tan(radians);

      return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);

    },

    /*
     * Skew the matrix by an angle in the y axis direction.
     */
    skewY: function(radians) {

      var a = tan(radians);

      return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);

    },

    /**
     * Create a transform string to be used with rendering apis.
     */
    toString: function() {

      return this.toArray().join(' ');

    },

    /**
     * Create a transform array to be used with rendering apis.
     */
    toArray: function(fullMatrix) {

      var elements = this.elements;

      var a = parseFloat(elements[0].toFixed(3));
      var b = parseFloat(elements[1].toFixed(3));
      var c = parseFloat(elements[2].toFixed(3));
      var d = parseFloat(elements[3].toFixed(3));
      var e = parseFloat(elements[4].toFixed(3));
      var f = parseFloat(elements[5].toFixed(3));

      if (!!fullMatrix) {

        var g = parseFloat(elements[6].toFixed(3));
        var h = parseFloat(elements[7].toFixed(3));
        var i = parseFloat(elements[8].toFixed(3));

        return [
          a, d, g, b, e, h, c, f, i
        ];
      }

      return [
        a, d, b, e, c, f  // Specific format see LN:19
      ];

    },

    /**
     * Clone the current matrix.
     */
    clone: function() {

      var a = this.elements[0],
          b = this.elements[1],
          c = this.elements[2],
          d = this.elements[3],
          e = this.elements[4],
          f = this.elements[5];
          g = this.elements[6];
          h = this.elements[7];
          i = this.elements[8];

      return new Two.Matrix(a, b, c, d, e, f, g, h, i);

    }

  });

})();
(function() {

  /**
   * Scope specific variables
   */

  // Localize variables
  var getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  var svg = {

    version: 1.1,

    ns: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink',

    /**
     * Create an svg namespaced element.
     */
    createElement: function(name, attrs) {
      var tag = name.toLowerCase();
      var elem = document.createElementNS(this.ns, tag);
      if (tag === 'svg') {
        attrs = _.defaults(attrs || {}, {
          version: this.version
        });
      }
      if (_.isObject(attrs)) {
        this.setAttributes(elem, attrs);
      }
      return elem;
    },

    /**
     * Add attributes from an svg element.
     */
    setAttributes: function(elem, attrs) {
      _.each(attrs, function(v, k) {
        this.setAttribute(k, v);
      }, elem);
      return this;
    },

    /**
     * Remove attributes from an svg element.
     */
    removeAttributes: function(elem, attrs) {
      _.each(attrs, function(a) {
        this.removeAttribute(a);
      }, elem);
      return this;
    },

    /**
     * Turn a set of vertices into a string for the d property of a path
     * element. It is imperative that the string collation is as fast as
     * possible, because this call will be happening multiple times a 
     * second.
     */
    toString: function(points, closed, curved) {

      var l = points.length,
        last = l - 1;

      if (!curved) {
        return _.map(points, function(v, i) {
          var command;
          if (i <= 0) {
            command = 'M';
          } else {
            command = 'L';
          }
          command += ' ' + v.x.toFixed(3) + ' ' + v.y.toFixed(3);
          if (i >= last && closed) {
            command += ' Z';
          }
          return command;
        }).join(' ');
      }

      var curve = getCurveFromPoints(points, closed);

      return _.map(curve, function(b, i) {

        var command;
        var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
        var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

        var a = curve[prev];
        var c = curve[next];

        var vx = a.v.x.toFixed(3);
        var vy = a.v.y.toFixed(3);

        var ux = b.u.x.toFixed(3);
        var uy = b.u.y.toFixed(3);

        var x = b.x.toFixed(3);
        var y = b.y.toFixed(3);

        if (i <= 0) {
          command = 'M ' + x + ' ' + y;
        } else {
          command = 'C ' + 
            vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
        }

        // Add a final point and close it off

        if (i >= last && closed) {

          vx = b.v.x.toFixed(3);
          vy = b.v.y.toFixed(3);

          ux = c.u.x.toFixed(3);
          uy = c.u.y.toFixed(3);

          x = c.x.toFixed(3);
          y = c.y.toFixed(3);

          command += 
            ' C ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;

          command += ' Z';
        }

        return command;

      }).join(' ');

    }

  };

  /**
   * @class
   */
  var Renderer = Two[Two.Types.svg] = function() {

    this.count = 0;
    this.domElement = svg.createElement('svg');
    this.elements = [];

    this.domElement.style.visibility = 'hidden';

    this.unveil = _.once(_.bind(function() {
      this.domElement.style.visibility = 'visible';
    }, this));

  };

  _.extend(Renderer, {

    Identifier: 'two-'

  });

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height) {

      this.width = width;
      this.height = height;

      svg.setAttributes(this.domElement, {
        width: width,
        height: height
      });

      return this;

    },

    /**
     * Add an object or objects to the renderer.
     */
    add: function(o) {

      var l = arguments.length,
        objects = o,
        elements = this.elements,
        domElement = this.domElement;

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      _.each(objects, function(object) {

        var elem, tag, styles, isGroup = object instanceof Two.Group;

        if (_.isUndefined(object.id)) {
          object.id = generateId.call(this);
        }

        // Generate an SVG equivalent element here.

        if (isGroup) {
          tag = 'g';
          if (_.isUndefined(object.parent)) { // For the "scene".
            object.parent = this;
            object.unbind(Two.Events.change)
              .bind(Two.Events.change, _.bind(this.update, this));
          }
          styles = getStyles(object);
          // Remove unnecessary fluff from group
          delete styles.stroke;
          delete styles.fill;
          delete styles['fill-opacity'];
          delete styles['stroke-opacity'];
          delete styles['stroke-linecap'];
          delete styles['stroke-linejoin'];
          delete styles['stroke-miterlimit'];
          delete styles['stroke-width'];
        } else {
          tag = 'path';
          styles = getStyles(object);
        }

        elem = svg.createElement(tag, styles);

        domElement.appendChild(elem);
        elements.push(elem);

      }, this);

      return this;

    },

    update: function(id, property, value, closed, curved) {

      var elements = this.elements;
      var elem = elements[id];

      switch (property) {

        case Two.Properties.hierarchy:
          _.each(value, function(j) {
            elem.appendChild(elements[j]);
          });
          break;
        case Two.Properties.demotion:
          _.each(value, function(j) {
            elem.removeChild(elements[j]);
          });
          break;
        default:
          setStyles(elem, property, value, closed, curved);
      }

      return this;

    },

    render: function() {

      this.unveil();

      return this;

    }

  });

  function getStyles(o) {

    var styles = {},
      id = o.id,
      translation = o.translation,
      rotation = o.rotation,
      scale = o.scale,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = Renderer.Identifier + id;
    }
    if (translation && _.isNumber(scale) && _.isNumber(rotation)) {
      // styles.transform = 'translate(' + translation.x + ',' + translation.y
      //   + ') scale(' + scale + ') rotate(' + rotation + ')'
      styles.transform = 'matrix(' + o._matrix.toString() + ')';
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
    }
    if (opacity) {
      styles['stroke-opacity'] = styles['fill-opacity'] = opacity;
    }
    // if (visible) {
    styles.visibility = visible ? 'visible' : 'hidden';
    // }
    if (cap) {
      styles['stroke-linecap'] = cap;
    }
    if (join) {
      styles['stroke-linejoin'] = join;
    }
    if (miter) {
      styles['stroke-miterlimit'] = miter;
    }
    if (linewidth) {
      styles['stroke-width'] = linewidth;
    }
    if (vertices) {
      styles.d = svg.toString(vertices, closed, curved);
    }

    return styles;

  }

  function setStyles(elem, property, value, closed, curved) {

    switch (property) {

      case 'matrix':
        property = 'transform';
        value = 'matrix(' + value.toString() + ')';
        break;
      case 'visible':
        property = 'visibility';
        value = value ? 'visible' : 'hidden';
        break;
      case 'cap':
        property = 'stroke-linecap';
        break;
      case 'join':
        property = 'stroke-linejoin';
        break;
      case 'miter':
        property = 'stroke-miterlimit';
        break;
      case 'linewidth':
        property = 'stroke-width';
        break;
      case 'vertices':
        property = 'd';
        value = svg.toString(value, closed, curved);
        break;
      case 'opacity':
        svg.setAttributes(elem, {
          'stroke-opacity': value,
          'fill-opacity': value
        });
        return;

    }

    elem.setAttribute(property, value);

  }

  function generateId() {
    var count = this.count;
    this.count++;
    return count;
  }

})();
(function() {

  /**
   * Constants
   */

  // Localize variables
  var getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  /**
   * A canvas specific representation of Two.Group
   */
  var Group = function(styles) {

    _.each(styles, function(v, k) {
      this[k] = v;
    }, this);

    this.children = {};

  };

  _.extend(Group.prototype, {

    appendChild: function(elem) {

      var parent = elem.parent;
      var id = elem.id;

      if (!_.isUndefined(parent)) {
        delete parent.children[id];
      }

      this.children[id] = elem;
      elem.parent = this;

      return this;

    },

    removeChild: function(elem) {

      delete this.children[elem.id];

      return this;

    },

    render: function(ctx) {

      var matrix = this.matrix;

      ctx.save();
      ctx.transform(
        matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

      _.each(this.children, function(child) {
        child.render(ctx);
      });

      ctx.restore();

      return this;

    }

  });

  /**
   * A canvas specific representation of a drawable element.
   */
  var Element = function(styles) {

    _.each(styles, function(v, k) {
      this[k] = v;
    }, this);

  };

  _.extend(Element.prototype, {

    render: function(ctx) {

      var matrix = this.matrix,
        stroke = this.stroke,
        linewidth = this.linewidth,
        fill = this.fill,
        opacity = this.opacity,
        visible = this.visible,
        cap = this.cap,
        join = this.join,
        miter = this.miter,
        curved = this.curved,
        closed = this.closed,
        commands = this.commands,
        length = commands.length,
        last = length - 1;

      if (!visible) {
        return this;
      }

      // Transform

      ctx.save();

      if (matrix) {
        ctx.transform(
          matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
      }

      // Styles

      if (fill) {
        ctx.fillStyle = fill;
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
      }
      if (linewidth) {
        ctx.lineWidth = linewidth;
      }
      if (miter) {
        ctx.miterLimit = miter;
      }
      if (join) {
        ctx.lineJoin = join;
      }
      if (cap) {
        ctx.lineCap = cap;
      }
      if (_.isNumber(opacity)) {
        ctx.globalAlpha = opacity;
      }

      ctx.beginPath();
      _.each(commands, function(b, i) {

        var x = b.x.toFixed(3), y = b.y.toFixed(3);

        if (curved) {

          var prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

          var a = commands[prev];
          var c = commands[next];

          var vx = a.v.x.toFixed(3);
          var vy = a.v.y.toFixed(3);

          var ux = b.u.x.toFixed(3);
          var uy = b.u.y.toFixed(3);

          if (i <= 0) {

            ctx.moveTo(x, y);

          } else {

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            // Add a final point and close it off

            if (i >= last && closed) {

              vx = b.v.x.toFixed(3);
              vy = b.v.y.toFixed(3);

              ux = c.u.x.toFixed(3);
              uy = c.u.y.toFixed(3);

              x = c.x.toFixed(3);
              y = c.y.toFixed(3);

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

          }

        } else {

          if (i <= 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

        }
      });

      // Loose ends

      if (closed && !curved) {
        ctx.closePath();
      }

      ctx.fill();
      ctx.stroke();

      ctx.restore();

    }

  });

  var canvas = {

    /**
     * Turn a set of vertices into a string for drawing in a canvas.
     */
    toArray: function(points, curved, closed) {

      var l = points.length,
        last = l - 1;

      if (!curved) {
        return _.map(points, function(v, i) {
          return { x: v.x, y: v.y };
        });
      }

      return getCurveFromPoints(points, closed);

    }

  };

  var Renderer = Two[Two.Types.canvas] = function() {

    this.count = 0;
    this.domElement = document.createElement('canvas');
    this.ctx = this.domElement.getContext('2d');

    this.elements = [];

    // Everything drawn on the canvas needs to come from the stage.
    this.stage = null;

  };

  _.extend(Renderer, {

    

  });

  _.extend(Renderer, {

    Group: Group,

    Element: Element,

    getStyles: getStyles,

    setStyles: setStyles,

    Utils: canvas

  });

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height) {

      this.width = this.domElement.width = width;
      this.height = this.domElement.height = height;

      _.extend(this.domElement.style, {
        width: this.width + 'px',
        height: this.height + 'px'
      });

      return this;

    },

    add: function(o) {

      var proto = Object.getPrototypeOf(this);
        constructor = proto.constructor;

      var l = arguments.length,
        objects = o,
        elements = this.elements,
        domElement = this.domElement,

        // For extensibility with WebGlRenderer

        Group = constructor.Group,
        Element = constructor.Element,
        getStyles = constructor.getStyles;

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      _.each(objects, function(object) {

        var elem, tag, styles, isGroup = object instanceof Two.Group,
          isStage = _.isNull(this.stage);

        if (_.isUndefined(object.id)) {
          object.id = generateId.call(this);
        }

        // Generate an element, a JavaScript object, that holds all the
        // necessary information to draw to the canvas successfully.

        if (isGroup) {
          // Kind of represents a matrix, save and restore set.
          styles = getStyles.call(this, object);
          delete styles.stroke;
          delete styles.fill;
          delete styles.opacity;
          delete styles.cap;
          delete styles.join;
          delete styles.miter;
          delete styles.linewidth;
          elem = new Group(styles);
          if (isStage) { // Set the stage

            this.stage = elem;
            this.stage.object = object; // Reference for BoundingBox calc.

            object.parent = this;
            object.unbind(Two.Events.change)
              .bind(Two.Events.change, _.bind(this.update, this));

          }
        } else {
          // Has styles and draw commands.
          elem = new Element(getStyles.call(this, object));
        }

        elements.push(elem);
        if (!isStage) {
          this.stage.appendChild(elem);
        }

      }, this);

      return this;

    },

    update: function(id, property, value, closed, curved, strokeChanged) {

      var proto = Object.getPrototypeOf(this);
      var constructor = proto.constructor;

      var elements = this.elements;
      var elem = elements[id];

      switch (property) {
        case Two.Properties.hierarchy:
          _.each(value, function(j) {
            elem.appendChild(elements[j]);
          });
          break;
        case Two.Properties.demotion:
          _.each(value, function(j) {
            elem.removeChild(elements[j]);
            this.elements[j] = null;
          }, this);
          break;
        default:
          constructor.setStyles.call(this, elem, property, value, closed, curved, strokeChanged);
      }

      return this;

    },

    render: function() {

      if (_.isNull(this.stage)) {
        return this;
      }

      // TODO: Test performance between these two

      // var rect = this.stage.object.getBoundingClientRect();
      // this.ctx.clearRect(rect.left, rect.top, rect.width, rect.height);

      this.ctx.clearRect(0, 0, this.width, this.height);

      this.stage.render(this.ctx);

      return this;

    }

  });

  function resetTransform(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function getStyles(o) {

    var styles = {},
      id = o.id,
      matrix = o._matrix,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = id;
    }
    if (_.isObject(matrix)) {
      styles.matrix = matrix.toArray();
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
    }
    if (_.isNumber(opacity)) {
      styles.opacity = opacity;
    }
    if (cap) {
      styles.cap = cap;
    }
    if (join) {
      styles.join = join;
    }
    if (miter) {
      styles.miter = miter;
    }
    if (linewidth) {
      styles.linewidth = linewidth;
    }
    if (vertices) {
      styles.commands = canvas.toArray(vertices, curved, closed);
    }
    styles.visible = !!visible;
    styles.curved = !!curved;
    styles.closed = !!closed;

    return styles;

  }

  function setStyles(elem, property, value, closed, curved) {

    switch (property) {

      case 'matrix':
        property = 'matrix';
        value = value.toArray();
        break;
      case 'vertices':
        property = 'commands';
        elem.curved = curved;
        elem.closed = closed;
        value = canvas.toArray(value, elem.curved, elem.closed);
        break;

    }

    elem[property] = value;

  }

  function generateId() {
    var count = this.count;
    this.count++;
    return count;
  }

})();
(function() {

  var CanvasRenderer = Two[Two.Types.canvas],
    multiplyMatrix = Two.Matrix.Multiply,
    getCommands = Two[Two.Types.canvas].Utils.toArray,
    mod = Two.Utils.mod;

  var Group = function(styles) {

    CanvasRenderer.Group.call(this, styles);

  };

  _.extend(Group.prototype, CanvasRenderer.Group.prototype, {

    appendChild: function() {

      CanvasRenderer.Group.prototype.appendChild.apply(this, arguments);

      this.updateMatrix();

      return this;

    },

    updateTexture: function(ctx) {

      _.each(this.children, function(child) {
        child.updateTexture(ctx);
      });

      return this;

    },

    updateMatrix: function(parent) {

      var matrix = (parent && parent._matrix) || this.parent && this.parent._matrix;
      var scale = (parent && parent._scale) || this.parent && this.parent._scale;

      if (!matrix) {
        return this;
      }

      this._matrix = multiplyMatrix(this.matrix, matrix);
      this._scale = this.scale * scale;

      _.each(this.children, function(child) {
        child.updateMatrix(this);
      }, this);

      return this;

    },

    render: function(gl, program) {

      _.each(this.children, function(child) {
        child.render(gl, program);
      });

    }

  });

  var Element = function(styles) {

    CanvasRenderer.Element.call(this, styles);

  };

  _.extend(Element.prototype, CanvasRenderer.Element.prototype, {

    updateMatrix: function(parent) {

      var matrix = (parent && parent._matrix) || this.parent && this.parent._matrix;
      var scale = (parent && parent._scale) || this.parent && this.parent._scale;

      if (!matrix) {
        return this;
      }

      this._matrix = multiplyMatrix(this.matrix, matrix);
      this._scale = this.scale * scale;

      return this;

    },

    updateTexture: function(ctx) {

      webgl.updateTexture(ctx, this);
      return this;

    },

    render: function(gl, program) {

      if (!this.visible || !this.opacity || !this.buffer) {
        return this;
      }

      // Draw Texture

      gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordsBuffer);

      gl.vertexAttribPointer(program.textureCoords, 2, gl.FLOAT, false, 0, 0);

      gl.bindTexture(gl.TEXTURE_2D, this.texture);


      // Draw Rect

      gl.uniformMatrix3fv(program.matrix, false, this._matrix);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

      gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      return this;

    }

  });

  var webgl = {

    canvas: document.createElement('canvas'),

    uv: new Two.Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1
    ]),

    /**
     * Returns the rect of a set of verts. Typically takes vertices that are
     * "centered" around 0 and returns them to be anchored upper-left.
     */
    getBoundingClientRect: function(vertices, border, curved) {

      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(vertices, function(v, i) {

        var x = v.x, y = v.y, a, b, c, d;

        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        bottom = Math.max(y, bottom);

        if (!!curved) {

          a = v.u.x, b = v.u.y;
          c = v.v.x, d = v.v.y;

          top = Math.min(b, d, top);
          left = Math.min(a, c, left);
          right = Math.max(a, c, right);
          bottom = Math.max(b, d, bottom);

        }

      });

      // Expand borders

      if (_.isNumber(border)) {
        top -= border;
        left -= border;
        right += border;
        bottom += border;
      }

      var width = right - left;
      var height = bottom - top;

      var centroid = {
        x: Math.abs(left),
        y: Math.abs(top)
      };

      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: width,
        height: height,
        centroid: centroid
      };

    },

    getTriangles: function(rect) {
      var top = rect.top,
        left = rect.left,
        right = rect.right,
        bottom = rect.bottom;
      return new Two.Array([
        left, top,
        right, top,
        left, bottom,
        left, bottom,
        right, top,
        right, bottom
      ]);
    },

    updateCanvas: function(elem) {

      var commands = elem.commands;
      var canvas = this.canvas;
      var ctx = this.ctx;

      // Styles

      var scale = elem._scale,
        stroke = elem.stroke,
        linewidth = elem.linewidth * scale,
        fill = elem.fill,
        opacity = elem.opacity,
        cap = elem.cap,
        join = elem.join,
        miter = elem.miter,
        curved = elem.curved,
        closed = elem.closed,
        length = commands.length,
        last = length - 1;

      canvas.width = Math.max(Math.ceil(elem.rect.width * scale), 1);
      canvas.height = Math.max(Math.ceil(elem.rect.height * scale), 1);

      var centroid = elem.rect.centroid;
      var cx = centroid.x * scale, cy = centroid.y * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fill) {
        ctx.fillStyle = fill;
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
      }
      if (linewidth) {
        ctx.lineWidth = linewidth;
      }
      if (miter) {
        ctx.miterLimit = miter;
      }
      if (join) {
        ctx.lineJoin = join;
      }
      if (cap) {
        ctx.lineCap = cap;
      }
      if (_.isNumber(opacity)) {
        ctx.globalAlpha = opacity;
      }

      ctx.beginPath();
      _.each(commands, function(b, i) {

        var x = (b.x * scale + cx).toFixed(3),
          y = (b.y * scale + cy).toFixed(3);

        if (curved) {

          var prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

          var a = commands[prev];
          var c = commands[next];

          var vx = (a.v.x * scale + cx).toFixed(3);
          var vy = (a.v.y * scale + cy).toFixed(3);

          var ux = (b.u.x * scale + cx).toFixed(3);
          var uy = (b.u.y * scale + cy).toFixed(3);

          if (i <= 0) {

            ctx.moveTo(x, y);

          } else {

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            // Add a final point and close it off

            if (i >= last && closed) {

              vx = (b.v.x * scale + cx).toFixed(3);
              vy = (b.v.y * scale + cy).toFixed(3);

              ux = (c.u.x * scale + cx).toFixed(3);
              uy = (c.u.y * scale + cy).toFixed(3);

              x = (c.x * scale + cx).toFixed(3);
              y = (c.y * scale + cy).toFixed(3);

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

          }

        } else {

          if (i <= 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

        }
      });

      // Loose ends

      if (closed && !curved) {
        ctx.closePath();
      }

      ctx.fill();
      ctx.stroke();

    },

    updateTexture: function(gl, elem) {

      this.updateCanvas(elem);

      if (elem.texture) {
        gl.deleteTexture(elem.texture);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.textureCoordsBuffer);

      elem.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, elem.texture);

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      // Upload the image into the texture.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);

    },

    updateBuffer: function(gl, elem, program) {

      if (_.isObject(elem.buffer)) {
        gl.deleteBuffer(elem.buffer);
      }

      elem.buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.buffer);
      gl.enableVertexAttribArray(program.position);

      gl.bufferData(gl.ARRAY_BUFFER, elem.triangles, gl.STATIC_DRAW);

      if (_.isObject(elem.textureCoordsBuffer)) {
        gl.deleteBuffer(elem.textureCoordsBuffer);
      }

      elem.textureCoordsBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.textureCoordsBuffer);
      gl.enableVertexAttribArray(program.textureCoords);

      gl.bufferData(gl.ARRAY_BUFFER, this.uv, gl.STATIC_DRAW);

    },

    program: {

      create: function(gl, shaders) {

        var program = gl.createProgram();
        _.each(shaders, function(s) {
          gl.attachShader(program, s);
        });

        gl.linkProgram(program);
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
          error = gl.getProgramInfoLog(program);
          gl.deleteProgram(program);
          throw new Two.Utils.Error('unable to link program: ' + error);
        }

        return program;

      }

    },

    shaders: {

      create: function(gl, source, type) {

        var shader = gl.createShader(gl[type]);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
          var error = gl.getShaderInfoLog(shader);
          gl.deleteShader(shader);
          throw new Two.Utils.Error('unable to compile shader ' + shader + ': ' + error);
        }

        return shader;

      },

      types: {
        vertex: 'VERTEX_SHADER',
        fragment: 'FRAGMENT_SHADER'
      },

      vertex: [
        'attribute vec2 a_position;',
        'attribute vec2 a_textureCoords;',
        '',
        'uniform mat3 u_matrix;',
        'uniform vec2 u_resolution;',
        '',
        'varying vec2 v_textureCoords;',
        '',
        'void main() {',
        '   vec2 projected = (u_matrix * vec3(a_position, 1)).xy;',
        '   vec2 normal = projected / u_resolution;',
        '   vec2 clipspace = (normal * 2.0) - 1.0;',
        '',
        '   gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);',
        '   v_textureCoords = a_textureCoords;',
        '}'
      ].join('\n'),

      fragment: [
        'precision mediump float;',
        '',
        'uniform sampler2D u_image;',
        'varying vec2 v_textureCoords;',
        '',
        'void main() {',
        '  gl_FragColor = texture2D(u_image, v_textureCoords);',
        '}'
      ].join('\n')

    }

  };

  webgl.ctx = webgl.canvas.getContext('2d');

  var Renderer = Two[Two.Types.webgl] = function(options) {

    this.count = 0;
    this.domElement = document.createElement('canvas');

    this.elements = [];

    // Everything drawn on the canvas needs to come from the stage.
    this.stage = null;

    // http://games.greggman.com/game/webgl-and-alpha/
    // http://www.khronos.org/registry/webgl/specs/latest/#5.2
    var params = _.defaults(options || {}, {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      stencil: true,
      preserveDrawingBuffer: false
    });

    var gl = this.ctx = this.domElement.getContext('webgl', params) || 
      this.domElement.getContext('experimental-webgl', params);

    if (!this.ctx) {
      throw new Two.Utils.Error(
        'unable to create a webgl context. Try using another renderer.');
    }

    // Compile Base Shaders to draw in pixel space.
    var vs = webgl.shaders.create(
      gl, webgl.shaders.vertex, webgl.shaders.types.vertex);
    var fs = webgl.shaders.create(
      gl, webgl.shaders.fragment, webgl.shaders.types.fragment);

    this.program = webgl.program.create(gl, [vs, fs]);
    gl.useProgram(this.program);

    // Create and bind the drawing buffer

    // look up where the vertex data needs to go.
    this.program.position = gl.getAttribLocation(this.program, 'a_position');
    this.program.matrix = gl.getUniformLocation(this.program, 'u_matrix');
    this.program.textureCoords = gl.getAttribLocation(this.program, 'a_textureCoords');

    // Copied from Three.js WebGLRenderer
    gl.disable(gl.DEPTH_TEST);

    // Setup some initial statements of the gl context
    gl.enable(gl.BLEND);
    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE, gl.ONE_MINUS_SRC_ALPHA );

  };

  _.extend(Renderer, {

    Group: Group,

    Element: Element,

    getStyles: getStyles,

    setStyles: setStyles

  });

  _.extend(Renderer.prototype, Backbone.Events, CanvasRenderer.prototype, {

    setSize: function(width, height) {

      CanvasRenderer.prototype.setSize.apply(this, arguments);

      this.ctx.viewport(0, 0, width, height);

      var resolutionLocation = this.ctx.getUniformLocation(
        this.program, 'u_resolution');
      this.ctx.uniform2f(resolutionLocation, width, height);

      return this;

    },

    render: function() {

      if (_.isNull(this.stage)) {
        return this;
      }

      // Draw a green rectangle

      this.stage.render(this.ctx, this.program);

      return this;

    }

  });

  function getStyles(o) {

    var styles = {},
      id = o.id,
      matrix = o._matrix,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = id;
    }
    if (_.isObject(matrix)) {
      styles.matrix = styles._matrix = matrix.toArray(true);
      styles.scale = styles._scale = 1;
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
    }
    if (_.isNumber(opacity)) {
      styles.opacity = opacity;
    }
    if (cap) {
      styles.cap = cap;
    }
    if (join) {
      styles.join = join;
    }
    if (miter) {
      styles.miter = miter;
    }
    if (linewidth) {
      styles.linewidth = linewidth;
    }
    if (vertices) {
      styles.vertices = getCommands(vertices, curved, closed);
      styles.commands = styles.vertices;
      styles.rect = webgl.getBoundingClientRect(styles.commands, styles.linewidth, styles.curved);
      styles.triangles = webgl.getTriangles(styles.rect);
    }
    styles.visible = !!visible;
    styles.curved = !!curved;
    styles.closed = !!closed;

    // Update buffer and texture

    if (o instanceof Two.Polygon) {
      webgl.updateBuffer(this.ctx, styles, this.program);
      Element.prototype.updateTexture.call(styles, this.ctx);
    }

    return styles;

  }

  function setStyles(elem, property, value, closed, curved, strokeChanged) {

    var textureNeedsUpdate = false;

    if (/matrix/.test(property)) {
      elem[property] = value.toArray(true);
      if (_.isNumber(closed)) {
        textureNeedsUpdate = elem.scale !== closed;
        elem.scale = closed;
      }
      elem.updateMatrix();
    } else if (/(stroke|fill|opacity|cap|join|miter|linewidth)/.test(property)) {
      elem[property] = value;
      elem.rect = webgl.getBoundingClientRect(elem.commands, elem.linewidth, elem.curved);
      elem.triangles = webgl.getTriangles(elem.rect);
      webgl.updateBuffer(this.ctx, elem, this.program);
      textureNeedsUpdate = true;
    } else if (property === 'vertices') {
      if (!_.isUndefined(closed)) {
        elem.closed = closed;
      }
      if (!_.isUndefined(curved)) {
        elem.curved = curved;
      }
      if (strokeChanged) {
        elem.commands = getCommands(value, elem.curved, elem.closed);
      } else {
        elem.vertices = getCommands(value, elem.curved, elem.closed);
        elem.commands = elem.vertices;
      }
      elem.rect = webgl.getBoundingClientRect(elem.vertices, elem.linewidth, elem.curved);
      elem.triangles = webgl.getTriangles(elem.rect);
      webgl.updateBuffer(this.ctx, elem, this.program);
      textureNeedsUpdate = true;
    } else {
      elem[property] = value;
    }

    if (textureNeedsUpdate) {
      elem.updateTexture(this.ctx);
    }

  }

})();
(function() {

  var Shape = Two.Shape = function(limited) {

    // Define matrix properties which all inherited
    // objects of Shape have.

    this._matrix = new Two.Matrix();

    var updateMatrix = _.debounce(_.bind(function() {
      var transform = this._matrix
        .identity()
        .translate(this.translation.x, this.translation.y)
        .scale(this.scale)
        .rotate(this.rotation);
      this.trigger(Two.Events.change, this.id, 'matrix', transform, this.scale);
    }, this), 0);

    this._rotation = 'rotation';

    Object.defineProperty(this, 'rotation', {
      get: function() {
        return this._rotation;
      },
      set: function(v) {
        this._rotation = v;
        updateMatrix();
      }
    });

    this._scale = 'scale';

    Object.defineProperty(this, 'scale', {
      get: function() {
        return this._scale;
      },
      set: function(v) {
        this._scale = v;
        updateMatrix();
      }
    });

    this.translation = new Two.Vector();
    this.rotation = 0.0;
    this.scale = 1.0;

    this.translation.bind(Two.Events.change, updateMatrix);

    if (!!limited) {
      return this;
    }

    // Style properties

    Shape.MakeGetterSetter(this, Shape.Properties);

    this.fill = '#fff';
    this.stroke = '#000';
    this.linewidth = 1.0;
    this.opacity = 1.0;
    this.visible = true;

    this.cap = 'round';
    this.join = 'round';
    this.miter = 1;

  };

  _.extend(Shape, {

    Properties: [
      'fill',
      'stroke',
      'linewidth',
      'opacity',
      'visible',
      'cap',
      'join',
      'miter'
    ],

    MakeGetterSetter: function(shape, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {

        var secret = '_' + k;

        Object.defineProperty(shape, k, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this.trigger(Two.Events.change, this.id, k, v, this);
          }
        });

      });

    }

  });

  _.extend(Shape.prototype, Backbone.Events, {

    addTo: function(group) {
      group.add(this);
      return this;
    },

    noFill: function() {
      this.fill = 'transparent';
      return this;
    },

    noStroke: function() {
      this.stroke = 'transparent';
      return this;
    },

    clone: function() {
      var clone = new Shape();
      clone.translation.copy(this.translation);
      _.each(Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      return this;
    }

  });

})();
(function() {

  var Group = Two.Group = function(o) {

    Two.Shape.call(this, true);

    delete this.stroke;
    delete this.fill;
    delete this.linewidth;
    delete this.opacity;

    delete this.cap;
    delete this.join;
    delete this.miter;

    Group.MakeGetterSetter(this, Two.Shape.Properties);

    this.children = {};

  };

  _.extend(Group, {

    MakeGetterSetter: function(group, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {

        var secret = '_' + k;

        Object.defineProperty(group, k, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            _.each(this.children, function(child) { // Trickle down styles
              child[k] = v;
            });
          }
        });

      });

    }

  });

  _.extend(Group.prototype, Two.Shape.prototype, {

    /**
     * Group has a gotcha in that it's at the moment required to be bound to
     * an instance of two in order to add elements correctly. This needs to
     * be rethought and fixed.
     */
    clone: function(parent) {

      parent = parent || this.parent;

      var children = _.map(this.children, function(child) {
        return child.clone(parent);
      });

      var group = new Group();
      parent.add(group);
      group.add(children);

      group.translation.copy(this.translation);
      group.rotation = this.rotation;
      group.scale = this.scale;

      return group;

    },

    /**
     * Anchors all children around the center of the group.
     */
    center: function() {

      var rect = this.getBoundingClientRect();

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.children, function(child) {
        child.translation.subSelf(rect.centroid);
      });

      this.translation.copy(rect.centroid);

      return this;

    },

    /**
     * Add an object to the group.
     */
    add: function(o) {

      var l = arguments.length,
        objects = o,
        children = this.children,
        grandparent = this.parent,
        ids = [];

      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      // A bubbled up version of 'change' event for the children.

      var broadcast = _.bind(function(id, property, value, closed, curved, strokeChanged) {
        this.trigger(Two.Events.change, id, property, value, closed, curved, strokeChanged);
      }, this);

      // Add the objects

      _.each(objects, function(object) {

        var id = object.id, parent = object.parent;

        if (_.isUndefined(id)) {
          grandparent.add(object);
          id = object.id;
        }

        if (_.isUndefined(children[id])) {
          // Release object from previous parent.
          if (parent) {
            delete parent.children[id];
          }
          // Add it to this group and update parent-child relationship.
          children[id] = object;
          object.parent = this;
          object.unbind(Two.Events.change)
            .bind(Two.Events.change, broadcast);
          ids.push(id);
        }

      }, this);

      if (ids.length > 0) {
        this.trigger(Two.Events.change, this.id, Two.Properties.hierarchy, ids);
      }

      return this;
      // return this.center();

    },

    /**
     * Remove an object from the group.
     */
    remove: function(o) {

      var l = arguments.length,
        objects = o,
        children = this.children,
        grandparent = this.parent,
        ids = [];

      if (l <= 0 && grandparent) {
        grandparent.remove(this);
        return this;
      }

      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      _.each(objects, function(object) {

        var id = object.id, grandchildren = object.children;

        if (!(id in children)) {
          return;
        }

        delete children[id];
        object.unbind(Two.Events.change);

        ids.push(id);

      });

      if (ids.length > 0) {
        this.trigger(Two.Events.change, this.id, Two.Properties.demotion, ids);
      }

      return this;
      // return this.center();

    },

    /**
     * Return an object with top, left, right, bottom, width, and height
     * parameters of the group.
     */
    getBoundingClientRect: function() {

      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(this.children, function(child) {

        var rect = child.getBoundingClientRect();

        if (!top || !left || !right || !bottom) {
          return;
        }

        top = Math.min(rect.top, top);
        left = Math.min(rect.left, left);
        right = Math.max(rect.right, right);
        bottom = Math.max(rect.bottom, bottom);

      }, this);

      var ul = this._matrix.multiply(left, top, 1);
      var ll = this._matrix.multiply(right, bottom, 1);

      return {
        top: ul.y,
        left: ul.x,
        right: ll.x,
        bottom: ll.y,
        width: ll.x - ul.x,
        height: ll.y - ul.y
      };

    },

    /**
     * Trickle down of noFill
     */
    noFill: function() {
      _.each(this.children, function(child) {
        child.noFill();
      });
      return this;
    },

    /**
     * Trickle down of noStroke
     */
    noStroke: function() {
      _.each(this.children, function(child) {
        child.noStroke();
      });
      return this;
    }

  });

})();

(function() {

  /**
   * Constants
   */

  var min = Math.min, max = Math.max, round = Math.round;

  var Polygon = Two.Polygon = function(vertices, closed, curved) {

    Two.Shape.call(this);

    // Further getter setters for Polygon for closed and curved properties

    // Add additional logic for watching the vertices.

    closed = !!closed;
    curved = !!curved;
    
    var beginning = 0.0;
    var ending = 1.0;
    var strokeChanged = false;
    var renderedVertices = vertices.slice(0);

    var updateVertices = _.debounce(_.bind(function(property) { // Call only once a frame.

      var l, ia, ib, last;

      if (strokeChanged) {

        l = this.vertices.length;
        last = l - 1;

        ia = round((beginning) * last);
        ib = round((ending) * last);

        renderedVertices.length = 0;

        for (var i = ia; i < ib + 1; i++) {
          var v = this.vertices[i];
          renderedVertices.push(new Two.Vector(v.x, v.y));
        }

      }

      this.trigger(Two.Events.change,
        this.id, 'vertices', renderedVertices, closed, curved, strokeChanged);

      strokeChanged = false;

    }, this), 0);

    Object.defineProperty(this, 'closed', {
      get: function() {
        return closed;
      },
      set: function(v) {
        closed = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'curved', {
      get: function() {
        return curved;
      },
      set: function(v) {
        curved = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'beginning', {
      get: function() {
        return beginning;
      },
      set: function(v) {
        beginning = min(max(v, 0.0), 1.0);
        strokeChanged = true;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'ending', {
      get: function() {
        return ending;
      },
      set: function(v) {
        ending = min(max(v, 0.0), 1);
        strokeChanged = true;
        updateVertices();
      }
    });

    // At the moment cannot alter the array itself, just it's points.

    this.vertices = vertices.slice(0);

    _.each(this.vertices, function(v) {

      v.bind(Two.Events.change, updateVertices);

    }, this);

    updateVertices();

  };

  _.extend(Polygon.prototype, Two.Shape.prototype, {

    clone: function() {

      var points = _.map(this.vertices, function(v) {
        return new Two.Vector(v.x, v.y);
      });

      var clone = new Polygon(points, this.closed, this.curved);

      _.each(Two.Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      return clone;

    },

    center: function() {

      var rect = this.getBoundingClientRect();

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.vertices, function(v) {
        v.subSelf(rect.centroid);
      });

      this.translation.addSelf(rect.centroid);

      return this;

    },

    /**
     * Remove self from the scene / parent.
     */
    remove: function() {

      if (!this.parent) {
        return this;
      }

      this.parent.remove(this);

      return this;

    },

    getBoundingClientRect: function() {

      var border = this.linewidth;
      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(this.vertices, function(v) {
        var x = v.x, y = v.y;
        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        bottom = Math.max(y, bottom);
      });

      // Expand borders

      top -= border;
      left -= border;
      right += border;
      bottom += border;

      var ul = this._matrix.multiply(left, top, 1);
      var ll = this._matrix.multiply(right, bottom, 1);

      return {
        top: ul.y,
        left: ul.x,
        right: ll.x,
        bottom: ll.y,
        width: ll.x - ul.x,
        height: ll.y - ul.y
      };

    }

  });

})();