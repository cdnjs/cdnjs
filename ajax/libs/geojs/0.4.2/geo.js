/** @namespace */
var geo = {};     // jshint ignore: line
window.geo = geo; // jshint ignore: line

geo.renderers = {};
geo.features = {};
geo.fileReaders = {};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convenient function to define JS inheritance
 */
//////////////////////////////////////////////////////////////////////////////
geo.inherit = function (C, P) { // jshint ignore: line
  "use strict";

  var F = inherit.func();
  F.prototype = P.prototype;
  C.prototype = new F();
  C.prototype.constructor = C;
};
geo.inherit.func = function () {
  "use strict";
  return function () {};
};

// Should get rid of this at some point.
window.inherit = geo.inherit;

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a new file reader type
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerFileReader = function (name, func) {
  "use strict";

  if (geo.fileReaders === undefined) {
    geo.fileReaders = {};
  }

  geo.fileReaders[name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new file reader
 */
//////////////////////////////////////////////////////////////////////////////
geo.createFileReader = function (name, opts) {
  "use strict";

  if (geo.fileReaders.hasOwnProperty(name)) {
    return geo.fileReaders[name](opts);
  }
  return null;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a new renderer type
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerRenderer = function (name, func) {
  "use strict";

  if (geo.renderers === undefined) {
    geo.renderers = {};
  }

  geo.renderers[name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of the renderer
 */
//////////////////////////////////////////////////////////////////////////////
geo.createRenderer  = function (name, layer, canvas) {
  "use strict";

  if (geo.renderers.hasOwnProperty(name)) {
    var ren = geo.renderers[name](
      {"layer": layer, "canvas": canvas}
    );
    ren._init();
    return ren;
  }
  return null;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a new feature type
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerFeature = function (category, name, func) {
  "use strict";

  if (geo.features === undefined) {
    geo.features = {};
  }

  if (!(category in geo.features)) {
    geo.features[category] = {};
  }

  // TODO Add warning if the name already exists
  geo.features[category][name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of the renderer
 */
//////////////////////////////////////////////////////////////////////////////
geo.createFeature  = function (name, layer, renderer, arg) {
  "use strict";

  var category = renderer.api(),
      options = {"layer": layer, "renderer": renderer};
  if (category in geo.features && name in geo.features[category]) {
    if (arg !== undefined) {
      $.extend(true, options, arg);
    }
    return geo.features[category][name](options);
  }
  return null;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a new layer type
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerLayer = function (name, func) {
  "use strict";

  if (geo.layers === undefined) {
    geo.layers = {};
  }

  geo.layers[name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of the layer
 */
//////////////////////////////////////////////////////////////////////////////
geo.createLayer = function (name, map, arg) {
  "use strict";

  /// Default renderer is vgl
  var options = {"map": map, "renderer": "vgl"},
      layer = null;

  if (name in geo.layers) {
    if (arg !== undefined) {
      $.extend(true, options, arg);
    }
    layer = geo.layers[name](options);
    layer._init();
    return layer;
  } else {
    return null;
  }
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a new widget type
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerWidget = function (category, name, func) {
  "use strict";

  if (geo.widgets === undefined) {
    geo.widgets = {};
  }

  if (!(category in geo.widgets)) {
    geo.widgets[category] = {};
  }

  // TODO Add warning if the name already exists
  geo.widgets[category][name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of the widget
 */
//////////////////////////////////////////////////////////////////////////////
geo.createWidget  = function (name, layer, renderer, arg) {
  "use strict";

  var category = renderer.api(),
      options = {"layer": layer, "renderer": renderer};
  if (category in geo.widgets && name in geo.widgets[category]) {
    if (arg !== undefined) {
      $.extend(true, options, arg);
    }
    return geo.widgets[category][name](options);
  }
  return null;
};

// Add a polyfill for window.requestAnimationFrame.
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (func) {
    "use strict";

    window.setTimeout(func, 15);
  };
}

// Add a polyfill for Math.log2
if (!Math.log2) {
  Math.log2 = function () {
    "use strict";

    return Math.log.apply(Math, arguments) / Math.LN2;
  };
}

/*global geo*/

geo.version = "0.4.2";


(function () {
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  /**
   * Takes a variable number of arguments and returns the first numeric value
   * it finds.
   * @private
   */
  function setNumeric() {
    var i;
    for (i = 0; i < arguments.length; i += 1) {
      if (isFinite(arguments[i])) {
        return arguments[i];
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Contains utility classes and methods used by geojs.
   * @namespace
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.util = {
    /**
     * Returns true if the given point lies in the given polygon.
     * Algorithm description:
     *   http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
     * @param {geo.screenPosition} point The test point
     * @param {geo.screenPosition[]} outer The outer boundary of the polygon
     * @param {geo.screenPosition[][]?} inner Inner boundaries (holes)
     */
    pointInPolygon: function (point, outer, inner) {
      var inside = false, n = outer.length;

      if (n < 3) {
        // we need 3 coordinates for this to make sense
        return false;
      }

      outer.forEach(function (vert, i) {
        var j = (n + i - 1) % n;
        var intersect = (
          ((outer[i].y > point.y) !== (outer[j].y > point.y)) &&
          (point.x < (outer[j].x - outer[i].x) *
                     (point.y - outer[i].y) /
                     (outer[j].y - outer[i].y) + outer[i].x)
        );
        if (intersect) {
          inside = !inside;
        }
      });

      (inner || []).forEach(function (hole) {
        inside = inside && !geo.util.pointInPolygon(point, hole);
      });

      return inside;
    },

    /**
     * Returns true if the argument is a function.
     */
    isFunction: function (f) {
      return typeof f === "function";
    },

    /**
     * Returns the argument if it is function, otherwise returns a function
     * that returns the argument.
     */
    ensureFunction: function (f) {
      if (geo.util.isFunction(f)) {
        return f;
      } else {
        return function () { return f; };
      }
    },

    /**
     * Return a random string of length n || 8.
     */
    randomString: function (n) {
      var s, i, r;
      n = n || 8;
      s = "";
      for (i = 0; i < n; i += 1) {
        r = Math.floor(Math.random() * chars.length);
        s += chars.substring(r, r + 1);
      }
      return s;
    },

    /**
     * Convert a color from hex value or css name to rgb objects
     */
    convertColor: function (color) {
      if (color.r !== undefined && color.g !== undefined &&
          color.b !== undefined) {
        return color;
      }
      if (typeof color === "string") {
        if (geo.util.cssColors.hasOwnProperty(color)) {
          color = geo.util.cssColors[color];
        } else if (color.charAt(0) === "#") {
          color = parseInt(color.slice(1), 16);
        }
      }
      // jshint -W016
      if (isFinite(color)) {
        color = {
          r: ((color & 0xff0000) >> 16) / 255,
          g: ((color & 0xff00) >> 8) / 255,
          b: ((color & 0xff)) / 255
        };
      }
      // jshint +W016
      return color;
    },

    /**
     * Normalize a coordinate object into {x: ..., y: ..., z: ... } form.
     * Accepts 2-3d arrays,
     * latlng objects
     * latitude -> lat -> y
     * longitude -> lon -> lng -> x
     */
    normalizeCoordinates: function (p) {
      p = p || {};
      if (Array.isArray(p)) {
        return {
          x: p[0],
          y: p[1],
          z: p[2] || 0
        };
      }
      if (p instanceof geo.latlng) {
        return {
          x: p.lng(),
          y: p.lat(),
          z: 0
        };
      }
      return {
        x: setNumeric(
          p.x,
          p.longitude,
          p.lng,
          p.lon,
          0
        ),
        y: setNumeric(
          p.y,
          p.latitude,
          p.lat,
          0
        ),
        z: setNumeric(
          p.z,
          p.elevation,
          p.elev,
          p.height,
          0
        )
      };
    }
  };

  geo.util.cssColors = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };
}());

//////////////////////////////////////////////////////////////////////////////
/*
 * Includes several support classes adapted from wigglemaps.
 *
 * https://github.com/dotskapes/wigglemaps
 *
 * Copyright 2013 Preston and Krejci (dotSkapes Virtual Lab)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//////////////////////////////////////////////////////////////////////////////

/* jshint ignore: start */
(function () {
    'use strict';

    var RangeNode = function (elem, start, end, current) {
        this.data = elem[current];
        this.left = null;
        this.right = null;
        if (start !== current)
            this.left = new RangeNode(elem, start, current - 1, parseInt((start + (current - 1)) / 2, 10));
        if (end !== current)
            this.right = new RangeNode(elem, current + 1, end, parseInt((end + (current + 1)) / 2, 10));
        this.elem = elem;
        this.start = start;
        this.end = end;
        this.subtree = null; /* This is populated as needed */
        this.search = rangeNodeSearch;
    };

    var rangeNodeSearch = function (result, box) {
        var m_this = this;

        var xrange = function (b) {
            return (b.x_in(m_this.elem[m_this.start]) &&
                    b.x_in(m_this.elem[m_this.end]));
        };

        var yrange = function (b, start, end) {
            return (b.y_in(m_this.subtree[start]) &&
                    b.y_in(m_this.subtree[end]));
        };

        var subquery = function (result, box, start, end, current) {
            if (yrange(box, start, end)) {
                for (var i = start; i <= end; i ++) {
                    result.push(m_this.subtree[i]);
                }
                return;
            }
            if (box.y_in(m_this.subtree[current]))
                result.push(m_this.subtree[current]);
            if (box.y_left(m_this.subtree[current])){
                if (current !== end)
                    subquery(result, box, current + 1, end, parseInt((end + (current + 1)) / 2, 10));
            } else if (box.x_right(m_this.subtree[current])) {
                if (current !== start)
                    subquery(result, box, start, current - 1, parseInt((start + (current - 1)) / 2, 10));
            } else {
                if (current !== end)
                    subquery(result, box, current + 1, end, parseInt((end + (current + 1)) / 2, 10));
                if (current !== start)
                    subquery(result, box, start, current - 1, parseInt((start + (current - 1)) / 2, 10));
            }
        };

        if (xrange(box)) {
            if (!this.subtree) {
                this.subtree = this.elem.slice(this.start, this.end + 1);
                this.subtree.sort(function (a, b) {
                    return a.y - b.y;
                });
            }
            subquery(result, box, 0, this.subtree.length - 1, parseInt((this.subtree.length - 1) / 2, 10));
            return;
        } else {
            if (box.contains(this.data))
                result.push(this.data);
            if (box.x_left(this.data)) {
                if (this.right)
                    this.right.search(result, box);
            } else if (box.x_right(this.data)) {
                if (this.left)
                    this.left.search(result, box);
            } else {
                if (this.left)
                    this.left.search(result, box);
                if (this.right)
                    this.right.search(result, box);
            }
        }
    };

    var RangeTree = function (elem) {
        elem.sort(function (a, b) {
            return a.x - b.x;
        });
        if (elem.length > 0)
            this.root = new RangeNode(elem, 0, elem.length - 1, parseInt((elem.length - 1) / 2, 10));
        else
            this.root = null;

        this.search = function (_box) {
            if (!this.root)
                return [];
            //var box = new Box (min, max);
            var box = _box.clone ();
            var result = [];
            this.root.search (result, box);
            return result;
        };
    };

    var Box = function (v1, v2) {
        this.min = v1.clone ();
        this.max = v2.clone ();
        this.contains = function (p) {
            return (v1.x <= p.x) && (v2.x >= p.x) && (v1.y <= p.y) && (v2.y >= p.y);
        };

        this.x_in = function (p) {
            return (v1.x <= p.x) && (v2.x >= p.x);
        };

        this.x_left = function (p) {
            return (v1.x >= p.x);
        };

        this.x_right = function (p) {
            return (v2.x <= p.x);
        };

        this.y_in = function (p) {
            return (v1.y <= p.y) && (v2.y >= p.y);
        };

        this.y_left = function (p) {
            return (v1.y >= p.y);
        };

        this.y_right = function (p) {
            return (v2.y <= p.y);
        };

        this.area = function () {
            return (this.max.x - this.min.x) * (this.max.y - this.min.y);
        };

        this.height = function () {
            return this.max.y - this.min.y;
        };

        this.width = function () {
            return this.max.x - this.min.x;
        };

        this.vertex = function (index) {
            switch (index) {
            case 0:
                return this.min.clone ();
            case 1:
                return new vect (this.max.x, this.min.y);
            case 2:
                return this.max.clone ();
            case 3:
                return new vect (this.min.x, this.max.y);
            default:
                throw "Index out of bounds: " + index ;
            }
        };

        this.intersects = function (box) {
            for (var i = 0; i < 4; i ++) {
                for (var j = 0; j < 4; j ++) {
                    if (vect.intersects (this.vertex (i), this.vertex ((i + 1) % 4),
                                         box.vertex (j), box.vertex ((j + 1) % 4)))
                        return true;
                }
            }
            if (this.contains (box.min) &&
                this.contains (box.max) &&
                this.contains (new vect (box.min.x, box.max.y)) &&
                this.contains (new vect (box.max.x, box.min.y)))
                return true;
            if (box.contains (this.min) &&
                box.contains (this.max) &&
                box.contains (new vect (this.min.x, this.max.y)) &&
                box.contains (new vect (this.max.x, this.min.y)))
                return true;
            return false;
        };

        this.union = function (b) {
            this.min.x = Math.min (this.min.x, b.min.x);
            this.min.y = Math.min (this.min.y, b.min.y);

            this.max.x = Math.max (this.max.x, b.max.x);
            this.max.y = Math.max (this.max.y, b.max.y);
        };

        this.centroid = function () {
            return new vect ((this.max.x + this.min.x) / 2, (this.max.y + this.min.y) / 2);
        };

        this.clone = function () {
            return new Box (v1, v2);
        };
    };

    // A basic vector type. Supports standard 2D vector operations
    var Vector2D = function (x, y) {
        this.x = x;
        this.y = y;

        this.add = function (v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        };
        this.sub = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        };
        this.scale = function (s) {
            this.x *= s;
            this.y *= s;
            return this;
        };
        this.length = function () {
            return Math.sqrt (this.x * this.x + this.y * this.y);
        };
        this.normalize = function () {
            var scale = this.length ();
            if (scale === 0)
                return this;
            this.x /= scale;
            this.y /= scale;
            return this;
        };
        this.div = function (v) {
            this.x /= v.x;
            this.y /= v.y;
            return this;
        };
        this.floor = function () {
            this.x = Math.floor (this.x);
            this.y = Math.floor (this.y);
            return this;
        };
        this.zero = function (tol) {
            tol = tol || 0;
            return (this.length() <= tol);
        };
        this.dot = function (v) {
            return (this.x * v.x) + (this.y * v.y);
        };
        this.cross = function (v) {
            return (this.x * v.y) - (this.y * v.x);
        };
        this.rotate = function (omega) {
            var cos = Math.cos (omega);
            var sin = Math.sin (omega);
            xp = cos * this.x - sin * this.y;
            yp = sin * this.x + cos * this.y;
            this.x = xp;
            this.y = yp;
            return this;
        };
        this.clone = function () {
            return new Vector2D (this.x, this.y);
        };

        this.array = function () {
            return [this.x, this.y];
        };
    };

    // A shortcut for the vector constructor
    function vect (x, y) {
        return new Vector2D (x, y);
    }

    // Shorthand operations for vectors for operations that make new vectors

    vect.scale = function (v, s) {
        return v.clone ().scale (s);
    };

    vect.add = function (v1, v2) {
        return v1.clone ().add (v2);
    };

    vect.sub = function (v1, v2) {
        return v1.clone ().sub (v2);
    };

    vect.dist = function (v1, v2) {
        return v1.clone ().sub (v2).length ();
    };

    vect.dir = function (v1, v2) {
        return v1.clone ().sub (v2).normalize ();
    };

    vect.dot = function (v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y);
    };

    vect.cross = function (v1, v2) {
        return (v1.x * v2.y) - (v1.y * v2.x);
    };

    vect.left = function (a, b, c, tol) {
        if (!tol)
            tol = 0;
        var v1 = vect.sub (b, a);
        var v2 = vect.sub (c, a);
        return (vect.cross (v1, v2) >= -tol);
    };

    vect.intersects = function (a, b, c, d, tol) {
        if (!tol)
            tol = 0;
        return (vect.left (a, b, c, tol) != vect.left (a, b, d, tol) &&
                vect.left (c, d, b, tol) != vect.left (c, d, a, tol));
    };

    vect.intersect2dt = function (a, b, c, d) {
        var denom = a.x * (d.y - c.y) +
            b.x * (c.y - d.y) +
            d.x * (b.y - a.y) +
            c.x * (a.y - b.y);

        if (denom === 0)
            return Infinity;

        var num_s = a.x * (d.y - c.y) +
            c.x * (a.y - d.y) +
            d.x * (c.y - a.y);
        var s = num_s / denom;

        var num_t = -(a.x * (c.y - b.y) +
                      b.x * (a.y - c.y) +
                      c.x * (b.y - a.y));
        var t = num_t / denom;

        return t;
    };

    vect.intersect2dpos = function (a, b, c, d) {
        var denom = a.x * (d.y - c.y) +
            b.x * (c.y - d.y) +
            d.x * (b.y - a.y) +
            c.x * (a.y - b.y);

        if (denom === 0)
            return Infinity;

        var num_s = a.x * (d.y - c.y) +
            c.x * (a.y - d.y) +
            d.x * (c.y - a.y);
        var s = num_s / denom;

        /*var num_t = -(a.x * (c.y - b.y) +
                      b.x * (a.y - c.y) +
                      c.x * (b.y - a.y));
        var t = num_t / denom;*/

        var dir = vect.sub (b, a);
        dir.scale (s);
        return vect.add (a, dir);
    };

    vect.rotate = function (v, omega) {
        var cos = Math.cos (omega);
        var sin = Math.sin (omega);
        xp = cos * v.x - sin * v.y;
        yp = sin * v.x + cos * v.y;
        var c = new vect (xp, yp);
        return c;
    };

    vect.normalize = function (v) {
        return v.clone ().normalize ();
    };

    // Export to geo.util module
    geo.util.RangeTree = RangeTree;
    geo.util.Box = Box;
    geo.util.vect = vect;
}());
/* jshint ignore: end */

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class object
 *
 * @class
 * @extends vgl.object
 * @returns {geo.object}
 */
//////////////////////////////////////////////////////////////////////////////
geo.object = function () {
  "use strict";
  if (!(this instanceof geo.object)) {
    return new geo.object();
  }

  var m_this = this,
      m_eventHandlers = {},
      m_idleHandlers = [],
      m_deferredCount = 0;

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Bind a handler that will be called once when all deferreds are resolved.
   *
   *  @param {function} handler A function taking no arguments
   *  @returns {geo.object[]|geo.object} this
   */
  //////////////////////////////////////////////////////////////////////////////
  this.onIdle = function (handler) {
    if (m_deferredCount) {
      m_idleHandlers.push(handler);
    } else {
      handler();
    }
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Add a new deferred object preventing idle event handlers from being called.
   *
   *  @param {$.defer} defer A jquery defered object
   */
  //////////////////////////////////////////////////////////////////////////////
  this.addDeferred = function (defer) {
    m_deferredCount += 1;
    defer.done(function () {
      m_deferredCount -= 1;
      if (!m_deferredCount) {
        m_idleHandlers.splice(0, m_idleHandlers.length)
          .forEach(function (handler) {
            handler();
          });
      }
    });
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Bind an event handler to this object
   *
   *  @param {String} event
   *    An event from {geo.events}
   *  @param {function} handler
   *    A function that will be called when ``event`` is triggered.  The
   *    function will be given an event object as a first parameter and
   *    optionally a second argument provided by the triggerer.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.geoOn = function (event, handler) {
    if (Array.isArray(event)) {
      event.forEach(function (e) {
        m_this.geoOn(e, handler);
      });
      return m_this;
    }
    if (!m_eventHandlers.hasOwnProperty(event)) {
      m_eventHandlers[event] = [];
    }
    m_eventHandlers[event].push(handler);
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Trigger an event (or events) on this object and call all handlers
   *
   *  @param {String} event An event from {geo.events}
   *  @param {Object} args An optional argument to pass to handlers
   */
  //////////////////////////////////////////////////////////////////////////////
  this.geoTrigger = function (event, args) {

    // if we have an array of events, recall with single events
    if (Array.isArray(event)) {
      event.forEach(function (e) {
        m_this.geoTrigger(e, args);
      });
      return m_this;
    }

    if (m_eventHandlers.hasOwnProperty(event)) {
      m_eventHandlers[event].forEach(function (handler) {
        handler.call(m_this, args);
      });
    }

    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Remove handlers from an event (or an array of events).  If no event is
   *  provided all hanlders will be removed.
   *
   *  @param {string?} event An event from {geo.events}
   *  @param {object?} arg A function or array of functions to remove from the events
   *                      or if falsey remove all handlers from the events
   */
  //////////////////////////////////////////////////////////////////////////////
  this.geoOff = function (event, arg) {
    if (event === undefined) {
      m_eventHandlers = {};
      m_idleHandlers = [];
      m_deferredCount = 0;
    }
    if (Array.isArray(event)) {
      event.forEach(function (e) {
        m_this.geoOff(e, arg);
      });
      return m_this;
    }
    if (!arg) {
      m_eventHandlers[event] = [];
    } else if (Array.isArray(arg)) {
      arg.forEach(function (handler) {
        m_this.geoOff(event, handler);
      });
      return m_this;
    }
    // What do we do if the handler is not already bound?
    //   ignoring for now...
    if (m_eventHandlers.hasOwnProperty(event)) {
      m_eventHandlers[event] = m_eventHandlers[event].filter(function (f) {
          return f !== arg;
        }
      );
    }
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Free all resources and destroy the object.
   */
  //////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.geoOff();
  };

  vgl.object.call(this);

  return this;
};

inherit(geo.object, vgl.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sceneObject, which extends the object's
 * event handling with a tree-based event propagation.
 *
 * @class
 * @extends geo.object
 * @returns {geo.sceneObject}
 */
//////////////////////////////////////////////////////////////////////////////
geo.sceneObject = function (arg) {
  "use strict";
  if (!(this instanceof geo.sceneObject)) {
    return new geo.sceneObject();
  }
  geo.object.call(this, arg);

  var m_this = this,
      m_parent = null,
      m_children = [],
      s_exit = this._exit,
      s_trigger = this.geoTrigger,
      s_addDeferred = this.addDeferred,
      s_onIdle = this.onIdle;

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Override object.addDeferred to propagate up the scene tree.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.addDeferred = function (defer) {
    if (m_parent) {
      m_parent.addDeferred(defer);
    } else {
      s_addDeferred(defer);
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Override object.onIdle to propagate up the scene tree.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.onIdle = function (handler) {
    if (m_parent) {
      m_parent.onIdle(handler);
    } else {
      s_onIdle(handler);
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Get/set parent of the object
   *  @param {?geo.sceneObject} parent
   */
  //////////////////////////////////////////////////////////////////////////////
  this.parent = function (arg) {
    if (arg === undefined) {
      return m_parent;
    }
    m_parent = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Add a child (or an array of children) to the object
   */
  //////////////////////////////////////////////////////////////////////////////
  this.addChild = function (child) {
    if (Array.isArray(child)) {
      child.forEach(m_this.addChild);
      return m_this;
    }
    child.parent(m_this);
    m_children.push(child);
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Remove a child (or array of children) from the object
   */
  //////////////////////////////////////////////////////////////////////////////
  this.removeChild = function (child) {
    if (Array.isArray(child)) {
      child.forEach(m_this.removeChild);
      return m_this;
    }
    m_children = m_children.filter(function (c) { return c !== child; });
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Get an array of child objects
   */
  //////////////////////////////////////////////////////////////////////////////
  this.children = function () {
    return m_children.slice();
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Force redraw of a scene object, to be implemented by subclasses.
   *  Base class just calls draw of child objects.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.draw = function (arg) {
    m_this.children().forEach(function (child) {
      child.draw(arg);
    });
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Trigger an event (or events) on this object and call all handlers.
   *  @param {String} event the event to trigger
   *  @param {Object} args arbitrary argument to pass to the handler
   *  @param {Boolean} childrenOnly if true, only propagate down the tree
   */
  //////////////////////////////////////////////////////////////////////////////
  this.geoTrigger = function (event, args, childrenOnly) {

    var geoArgs;

    args = args || {};
    geoArgs = args.geo || {};
    args.geo = geoArgs;

    // stop propagation if requested by the handler
    if (geoArgs.stopPropagation) {
      return m_this;
    }

    // If the event was not triggered by the parent, just propagate up the tree
    if (!childrenOnly && m_parent && geoArgs._triggeredBy !== m_parent) {
      geoArgs._triggeredBy = m_this;
      m_parent.geoTrigger(event, args);
      return m_this;
    }

    // call the object's own handlers
    s_trigger.call(m_this, event, args);

    // stop propagation if requested by the handler
    if (geoArgs.stopPropagation) {
      return m_this;
    }

    // trigger the event on the children
    m_children.forEach(function (child) {
      geoArgs._triggeredBy = m_this;
      child.geoTrigger(event, args);
    });

    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Free all resources and destroy the object.
   */
  //////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.children = [];
    delete m_this.parent;
    s_exit();
  };

  return this;
};

inherit(geo.sceneObject, geo.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class timestamp
 *
 * @class
 * @extends vgl.timestamp
 * @returns {geo.timestamp}
 */
//////////////////////////////////////////////////////////////////////////////
geo.timestamp = function () {
  'use strict';
  if (!(this instanceof geo.timestamp)) {
    return new geo.timestamp();
  }
  vgl.timestamp.call(this);
};

inherit(geo.timestamp, vgl.timestamp);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create an instance of quadratic surface generator
 * in Cartesian coordinates by the equation
 * <code>(x / a)^2 + (y / b)^2 + (z / c)^2 = 1</code>. Used
 * primarily to create planetary bodies
 *
 * @class
 * @param {Number} [x=0]  Radius in X direction
 * @param {Number} [y=0]  Radius in Y direction
 * @param {Number} [z=0]  Radius in Z direction
 *
 * @returns {geo.ellipsoid}
 */
 //////////////////////////////////////////////////////////////////////////////
geo.ellipsoid = function (x, y, z) {
  'use strict';
  if (!(this instanceof geo.ellipsoid)) {
    return new geo.ellipsoid(x, y, z);
  }

  x = vgl.defaultValue(x, 0.0);
  y = vgl.defaultValue(y, 0.0);
  z = vgl.defaultValue(z, 0.0);

  if (x < 0.0 || y < 0.0 || z < 0.0) {
    return console.log('[error] Al radii components must be greater than zero');
  }

  var m_this = this,
      m_radii = new vec3.fromValues(x, y, z),
      m_radiiSquared = new vec3.fromValues(
        x * x, y * y, z * z),
      m_minimumRadius = Math.min(x, y, z),
      m_maximumRadius = Math.max(x, y, z);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return radii of ellipsoid
   */
  ////////////////////////////////////////////////////////////////////////////
  this.radii = function () {
    return m_radii;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return squared radii of the ellipsoid
   */
  ////////////////////////////////////////////////////////////////////////////
  this.radiiSquared = function () {
    return m_radiiSquared;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return maximum radius of the ellipsoid
   *
   * @return {Number} The maximum radius of the ellipsoid
   */
  ////////////////////////////////////////////////////////////////////////////
  this.maximumRadius = function () {
    return m_maximumRadius;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return minimum radius of the ellipsoid
   *
   * @return {Number} The maximum radius of the ellipsoid
   */
  ////////////////////////////////////////////////////////////////////////////
  this.minimumRadius = function () {
    return m_minimumRadius;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Computes the normal of the plane tangent to the surface of
   * the ellipsoid at the provided position
   *
   * @param {Number} lat The cartographic latitude for which
   *  to to determine the geodetic normal
   * @param {Number} lon The cartographic longitude for which
   *  to to determine the geodetic normal
   *
   * @return {vec3}
   *
   * @exception {DeveloperError} cartographic is required.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeGeodeticSurfaceNormal = function (lat, lon) {
    if (typeof lat === 'undefined' || typeof lon === 'undefined') {
      throw '[error] Valid latitude and longitude is required';
    }

    var cosLatitude = Math.cos(lat),
        result = vec3.create();

    result[0] = cosLatitude * Math.cos(lon);
    result[1] = cosLatitude * Math.sin(lon);
    result[2] = Math.sin(lat);

    vec3.normalize(result, result);
    return result;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Converts the provided geographic latitude, longitude,
   * and height to WGS84 coordinate system
   *
   * @param {Number} lat Latitude in radians
   * @param {Number} lon Longitude in radians
   * @param {Number} elev Elevation
   * @return {vec3} Position in the WGS84 coordinate system
   */
  ////////////////////////////////////////////////////////////////////////////
  this.transformPoint = function (lat, lon, elev) {
    lat = lat *  (Math.PI / 180.0);
    lon = lon * (Math.PI / 180.0);

    var n = m_this.computeGeodeticSurfaceNormal(lat, lon),
        k = vec3.create(),
        gamma  = Math.sqrt(vec3.dot(n, k)),
        result = vec3.create();

    vec3.multiply(k, m_radiiSquared, n);
    vec3.scale(k, k, 1 / gamma);
    vec3.scale(n, n, elev);
    vec3.add(result, n, k);
    return result;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Converts the provided geographic latitude, longitude,
   * and height to WGS84 coordinate system
   *
   * @param {vgl.geometryData} geom
   */
  ////////////////////////////////////////////////////////////////////////////
  this.transformGeometry = function (geom) {
    if (!geom) {
      throw '[error] Failed to transform to cartesian. Invalid geometry.';
    }

    var sourceData = geom.sourceData(vgl.vertexAttributeKeys.Position),
        sourceDataArray = sourceData.data(),
        noOfComponents =  sourceData.attributeNumberOfComponents(
          vgl.vertexAttributeKeys.Position),
        stride = sourceData.attributeStride(
          vgl.vertexAttributeKeys.Position),
        offset = sourceData.attributeOffset(
          vgl.vertexAttributeKeys.Position),
        sizeOfDataType = sourceData.sizeOfAttributeDataType(
          vgl.vertexAttributeKeys.Position),
        index = null,
        count = sourceDataArray.length * (1.0 / noOfComponents),
        gamma = null,
        n = null,
        j = 0,
        k = vec3.create(),
        result = vec3.create();

    stride /= sizeOfDataType;
    offset /= sizeOfDataType;

    if (noOfComponents !== 3) {
      throw ('[error] Requires positions with three components');
    }

    for (j = 0; j < count; j += 1) {
      index = j * stride + offset;

      sourceDataArray[index] = sourceDataArray[index] * (Math.PI / 180.0);
      sourceDataArray[index + 1] = sourceDataArray[index + 1] * (Math.PI / 180.0);

      n = m_this.computeGeodeticSurfaceNormal(sourceDataArray[index + 1],
                                            sourceDataArray[index]);
      vec3.multiply(k, m_radiiSquared, n);
      gamma = Math.sqrt(vec3.dot(n, k));
      vec3.scale(k, k, 1 / gamma);
      vec3.scale(n, n, sourceDataArray[index + 2]);
      vec3.add(result, n, k);

      sourceDataArray[index] = result[0];
      sourceDataArray[index + 1] = result[1];
      sourceDataArray[index + 2] = result[2];
    }
  };

  return m_this;
};

////////////////////////////////////////////////////////////////////////////
/**
 * An Ellipsoid instance initialized to the WGS84 standard.
 * @memberof ellipsoid
 *
 */
////////////////////////////////////////////////////////////////////////////
geo.ellipsoid.WGS84 = vgl.freezeObject(
  geo.ellipsoid(6378137.0, 6378137.0, 6356752.3142451793));

////////////////////////////////////////////////////////////////////////////
/**
 * An Ellipsoid instance initialized to radii of (1.0, 1.0, 1.0).
 * @memberof ellipsoid
 */
////////////////////////////////////////////////////////////////////////////
geo.ellipsoid.UNIT_SPHERE = vgl.freezeObject(
  geo.ellipsoid(1.0, 1.0, 1.0));

/** @namespace */
geo.mercator = {
  r_major: 6378137.0  //Equatorial Radius, WGS84
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Returns the polar radius based on the projection.
 *
 * @param {Boolean} sperical
 * @returns {Number}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.r_minor = function (spherical) {
  'use strict';

  var r_minor;

  spherical = spherical !== undefined ? spherical : false;

  if (spherical) {
    r_minor = 6378137.0;
  } else {
    r_minor = 6356752.314245179;
  }

  return r_minor;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * 1/f=(a-b)/a , a=r_major, b=r_minor
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.f = function (spherical) {
  'use strict';

  return (geo.mercator.r_major - geo.mercator.r_minor(spherical)) / geo.mercator.r_major;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert longitude (Degree) to Tile X
 *
 *  @param {float} lon
 *  @param {integer} z
 *  @returns {integer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.long2tilex = function (lon, z) {
  'use strict';
  var rad = (lon + 180.0) / 360.0,
      f = Math.floor(rad * Math.pow(2.0, z));
  return f;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert latitude (Degree) to Tile Y
 *
 *  @param {float} lat
 *  @param {integer} z
 *  @returns {integer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.lat2tiley = function (lat, z) {
  'use strict';
  var rad = lat * Math.PI / 180.0;
  return Math.floor((1.0 - rad / Math.PI) / 2.0 * Math.pow(2.0, z));
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert Longitute (Degree) to Tile X and fraction.
 *
 *  @param {float} lon
 *  @param {integer} z
 *  @returns {number[]}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.long2tilex2 = function (lon, z) {
  'use strict';
  var rad = (lon + 180.0) / 360.0,
      f = rad * Math.pow(2.0, z),
      ret = Math.floor(f),
      frac = f - ret;
  return [ret, frac];
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert Latitude (Degree) to Tile Y and fraction
 *
 *  @param {float} lat
 *  @param {integer} z
 *  @returns {number[]}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.lat2tiley2 = function (lat, z) {
  'use strict';
  var rad = lat * Math.PI / 180.0,
      f = (1.0 - Math.log(Math.tan(rad) + 1.0 / Math.cos(rad)) /
           Math.PI) / 2.0 * Math.pow(2.0, z),
      ret = Math.floor(f),
      frac = f - ret;
  return [ret, frac];
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert Tile X to Longitute (Degree)
 *
 *  @param {integer} x
 *  @param {integer} z
 *  @returns {float}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.tilex2long = function (x, z) {
  'use strict';
  return x / Math.pow(2.0, z) * 360.0 - 180.0;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert Tile Y to Latitute (Degree)
 *
 *  @param {integer} y
 *  @param {integer} z
 *  @returns {float}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.tiley2lat = function (y, z) {
  'use strict';
  var n = Math.PI - 2.0 * Math.PI * y / Math.pow(2.0, z);
  return 180.0 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert spherical mercator Y to latitude
 *
 *  @param {float} a
 *  @returns {float}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.y2lat = function (a) {
  'use strict';
  return 180 / Math.PI * (2 * Math.atan(Math.exp(a * Math.PI / 180)) - Math.PI / 2);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert latitude into Y position in spherical mercator
 *
 *  @param {float} a
 *  @returns {float}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.lat2y = function (a) {
  'use strict';
  return 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + a * (Math.PI / 180) / 2));
};

//////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param {float} d
 * @returns {number}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.deg2rad = function (d) {
  'use strict';
  var r = d * (Math.PI / 180.0);
  return r;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert radian to degree
 *
 * @param {float} r
 * @returns {number}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.rad2deg = function (r) {
  'use strict';
  var d = r / (Math.PI / 180.0);
  return d;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert latlon to mercator
 *
 * @param {float} lon
 * @param {float} lat
 * @returns {object}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.ll2m = function (lon, lat, spherical) {
  'use strict';

  if (lat > 89.5) {
    lat = 89.5;
  }

  if (lat < -89.5) {
    lat = -89.5;
  }

  var x = this.r_major * this.deg2rad(lon),
      temp = this.r_minor(spherical) / this.r_major,
      es = 1.0 - (temp * temp),
      eccent = Math.sqrt(es),
      phi = this.deg2rad(lat),
      sinphi = Math.sin(phi),
      con = eccent * sinphi,
      com = 0.5 * eccent,
      con2 = Math.pow((1.0 - con) / (1.0 + con), com),
      ts = Math.tan(0.5 * (Math.PI * 0.5 - phi)) / con2,
      y = -this.r_major * Math.log(ts),
      ret = {'x': x, 'y': y};

  return ret;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convert mercator to lat lon
 *
 * @param {float} x
 * @param {float} y
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.m2ll = function (x, y, spherical) {
  'use strict';
  var lon = this.rad2deg((x / this.r_major)),
      temp = this.r_minor(spherical) / this.r_major,
      e = Math.sqrt(1.0 - (temp * temp)),
      lat = this.rad2deg(this.pjPhi2(Math.exp(-(y / this.r_major)), e)),
      ret = {'lon': lon, 'lat': lat};

  return ret;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * pjPhi2
 *
 * @param {float} ts
 * @param {float} e
 * @returns {number}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mercator.pjPhi2 = function (ts, e) {
  'use strict';
  var N_ITER = 15,
      HALFPI = Math.PI / 2,
      TOL = 0.0000000001,
      con, dphi,
      i = N_ITER,
      eccnth = 0.5 * e,
      Phi = HALFPI - 2.0 * Math.atan(ts);

  do {
    con = e * Math.sin(Phi);
    dphi = HALFPI - 2.0 * Math.atan(ts * Math.pow(
            (1.0 - con) / (1.0 + con), eccnth)) - Phi;
    Phi += dphi;
    i -= 1;
  } while (Math.abs(dphi) > TOL && i);
  return Phi;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of latlng
 *
 * A latlng encapsulates geodesy coordinates defined by latitude and
 * longitude (depreciated)
 *
 * @class
 * @returns {geo.latlng}
 */
//////////////////////////////////////////////////////////////////////////////
geo.latlng = function (arg1, arg2, arg3) {
  "use strict";
  if (!(this instanceof geo.latlng)) {
    return new geo.latlng(arg1, arg2, arg3);
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_lat = arg2 === undefined && arg3 === undefined ? arg1.lat() : arg1,
      m_lng = arg2 === undefined && arg3 === undefined ? arg1.lng() : arg2,
      m_elv = arg2 === undefined && arg3 === undefined ? arg1.elv() : arg3;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return latitude
   */
  //////////////////////////////////////////////////////////////////////////////
  this.lat = function (val) {
    if (val === undefined) {
      return m_lat;
    } else {
      m_lat = val;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return longitude
   */
  //////////////////////////////////////////////////////////////////////////////
  this.lng = function (val) {
    if (val === undefined) {
      return m_lng;
    } else {
      m_lng = val;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return elevation
   */
  //////////////////////////////////////////////////////////////////////////////
  this.elv = function (val) {
    if (val === undefined) {
      return m_elv;
    } else {
      m_elv = val;
    }
  };


  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return x coordinate
   */
  //////////////////////////////////////////////////////////////////////////////
  this.x = function (val) {
    if (val === undefined) {
      return m_this.lng();
    } else {
      m_lng = val;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return y coordinate
   */
  //////////////////////////////////////////////////////////////////////////////
  this.y = function (val) {
    if (val === undefined) {
      return m_this.lat();
    } else {
      m_lat = val;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return z coordinate
   */
  //////////////////////////////////////////////////////////////////////////////
  this.z = function (val) {
    if (val === undefined) {
      return m_this.elv();
    } else {
      m_elv = val;
    }
  };


  return this;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @class
 * @extends geo.sceneObject
 * @returns {geo.layer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.layer = function (arg) {
  "use strict";

  if (!(this instanceof geo.layer)) {
    return new geo.layer(arg);
  }
  arg = arg || {};
  geo.sceneObject.call(this, arg);

  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      m_style = arg.style === undefined ? {"opacity": 0.5,
                                           "color": [0.8, 0.8, 0.8],
                                           "visible": true,
                                           "bin": 100} : arg.style,
      m_id = arg.id === undefined ? geo.layer.newLayerId() : arg.id,
      m_name = "",
      m_gcs = "EPSG:4326",
      m_timeRange = null,
      m_source = arg.source || null,
      m_map = arg.map === undefined ? null : arg.map,
      m_isReference = false,
      m_x = 0,
      m_y = 0,
      m_width = 0,
      m_height = 0,
      m_node = null,
      m_canvas = null,
      m_renderer = null,
      m_initialized = false,
      m_rendererName = arg.renderer  === undefined ? "vgl" : arg.renderer,
      m_dataTime = geo.timestamp(),
      m_updateTime = geo.timestamp(),
      m_drawTime = geo.timestamp(),
      m_sticky = arg.sticky === undefined ? true : arg.sticky,
      m_active = arg.active === undefined ? true : arg.active;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get whether or not the layer is sticky (navigates with the map).
   *
   * @returns {Boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.sticky = function () {
    return m_sticky;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get whether or not the layer is active.  An active layer will receive
   * native mouse when the layer is on top.  Non-active layers will never
   * receive native mouse events.
   *
   * @returns {Boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.active = function () {
    return m_active;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set root node of the layer
   *
   * @returns {div}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.node = function () {
    return m_node;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set id of the layer
   *
   * @returns {String}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.id = function (val) {
    if (val === undefined) {
      return m_id;
    }
    m_id = geo.newLayerId();
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set name of the layer
   *
   * @returns {String}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.name = function (val) {
    if (val === undefined) {
      return m_name;
    }
    m_name = val;
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set opacity of the layer
   *
   * @returns {Number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.opacity = function (val) {
    if (val === undefined) {
      return m_style.opacity;
    }
    m_style.opacity = val;
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set visibility of the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.visible = function (val) {
    if (val === undefined) {
      return m_style.visible;
    }
    m_style.visible = val;
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set bin of the layer
   *
   * @returns {Number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bin = function (val) {
    if (val === undefined) {
      return m_style.bin;
    }
    m_style.bin = val;
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set projection of the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.gcs = function (val) {
    if (val === undefined) {
      return m_gcs;
    }
    m_gcs = val;
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform layer to the reference layer gcs
   */
  ////////////////////////////////////////////////////////////////////////////
  this.transform = function (val) {
    geo.transform.transformLayer(val, m_this, m_map.baseLayer());
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set time range of the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.timeRange = function (val) {
    if (val === undefined) {
      return m_timeRange;
    }
    m_timeRange = val;
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set source of the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.source = function (val) {
    if (val === undefined) {
      return m_source;
    }
    m_source = val;
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set map of the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.map = function (val) {
    if (val === undefined) {
      return m_map;
    }
    m_map = val;
    m_map.node().append(m_node);
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get renderer for the layer if any
   */
  ////////////////////////////////////////////////////////////////////////////
  this.renderer = function () {
    return m_renderer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get canvas of the layer
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.canvas = function () {
    return m_canvas;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get viewport of the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.viewport = function () {
    return [m_x, m_y, m_width, m_height];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return last time data got changed
   */
  ////////////////////////////////////////////////////////////////////////////
  this.dataTime = function () {
    return m_dataTime;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the modified time for the last update that did something
   */
  ////////////////////////////////////////////////////////////////////////////
  this.updateTime = function () {
    return m_updateTime;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the modified time for the last draw call that did something
   */
  ////////////////////////////////////////////////////////////////////////////
  this.drawTime = function () {
    return m_drawTime;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Run query and return results for it
   */
  ////////////////////////////////////////////////////////////////////////////
  this.query = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set layer as the reference layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.referenceLayer = function (val) {
    if (val !== undefined) {
      m_isReference = val;
      m_this.modified();
      return m_this;
    }
    return m_isReference;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set if the layer has been initialized
   */
  ////////////////////////////////////////////////////////////////////////////
  this.initialized = function (val) {
    if (val !== undefined) {
      m_initialized = val;
      return m_this;
    }
    return m_initialized;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform a point or array of points in GCS space to
   * local space of the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.toLocal = function (input) {
    return input;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform a point or array of points in local space to
   * latitude-longitude space
   */
  ////////////////////////////////////////////////////////////////////////////
  this.fromLocal = function (input) {
    return input;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Init layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    if (m_initialized) {
      return m_this;
    }

    // Create top level div for the layer
    m_node = $(document.createElement("div"));
    m_node.attr("id", m_name);
    // TODO: need to position according to offsets from the map element
    //       and maybe respond to events in case the map element moves
    //       around the page.
    m_node.css("position", "absolute");

    if (m_map) {
      m_map.node().append(m_node);

    }

    // Share context if have valid one
    if (m_canvas) {
      m_renderer = geo.createRenderer(m_rendererName, m_this, m_canvas);
    } else {
      m_renderer = geo.createRenderer(m_rendererName, m_this);
      m_canvas = m_renderer.canvas();
    }

    if (!m_this.active()) {
      m_node.css("pointerEvents", "none");
    }

    m_initialized = true;

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Clean up resouces
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_renderer._exit();
    m_node.off();
    m_node.remove();
    m_node = null;
    arg = {};
    m_canvas = null;
    m_renderer = null;
    s_exit();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Respond to resize event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._resize = function (x, y, w, h) {
    m_x = x;
    m_y = y;
    m_width = w;
    m_height = h;
    m_node.width(w);
    m_node.height(h);

    m_this.modified();
    m_this.geoTrigger(geo.event.resize,
      {x: x, y: y, width: m_width, height: m_height});

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the width of the layer in pixels
   */
  ////////////////////////////////////////////////////////////////////////////
  this.width = function () {
    return m_width;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the height of the layer in pixels
   */
  ////////////////////////////////////////////////////////////////////////////
  this.height = function () {
    return m_height;
  };

  return this;
};

/**
 * Gets a new id number for a layer.
 * @protected
 * @instance
 * @returns {number}
 */
geo.layer.newLayerId = (function () {
    "use strict";
    var currentId = 1;
    return function () {
      var id = currentId;
      currentId += 1;
      return id;
    };
  }()
);

/**
 * General object specification for feature types.
 * @typedef geo.layer.spec
 * @type {object}
 * @property {string} [type="feature"] For feature compatibility
 * with more than one kind of creatable layer
 * @property {object[]} [data=[]] The default data array to
 * apply to each feature if none exists
 * @property {string} [renderer="vgl"] The renderer to use
 * @property {geo.feature.spec[]} [features=[]] Features
 * to add to the layer
 */

/**
 * Create a layer from an object.  Any errors in the creation
 * of the layer will result in returning null.
 * @param {geo.map} map The map to add the layer to
 * @param {geo.layer.spec} spec The object specification
 * @returns {geo.layer|null}
 */
geo.layer.create = function (map, spec) {
  "use strict";

  spec = spec || {};

  // add osmLayer later
  spec.type = "feature";
  if (spec.type !== "feature") {
    console.warn("Unsupported layer type");
    return null;
  }

  spec.renderer = spec.renderer || "vgl";
  if (spec.renderer !== "d3" && spec.renderer !== "vgl") {
    console.warn("Invalid renderer");
    return null;
  }

  var layer = map.createLayer(spec.type, spec);
  if (!layer) {
    console.warn("Unable to create a layer");
    return null;
  }

  // probably move this down to featureLayer eventually
  spec.features.forEach(function (f) {
    f.data = f.data || spec.data;
    f.feature = geo.feature.create(layer, f);
  });

  return layer;
};

inherit(geo.layer, geo.sceneObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * Layer to draw points, lines, and polygons on the map The polydata layer
 * provide mechanisms to create and draw geometrical shapes such as points,
 * lines, and polygons.
 * @class
 * @extends geo.layer
 * @returns {geo.featureLayer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.featureLayer = function (arg) {
  "use strict";
  if (!(this instanceof geo.featureLayer)) {
    return new geo.featureLayer(arg);
  }
  geo.layer.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_features = [],
      s_init = this._init,
      s_exit = this._exit,
      s_update = this._update,
      s_draw = this.draw;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create feature give a name
   *
   * @returns {geo.Feature} Will return a new feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.createFeature = function (featureName, arg) {

    var newFeature = geo.createFeature(
      featureName, m_this, m_this.renderer(), arg);

    m_this.addChild(newFeature);
    m_features.push(newFeature);
    m_this.features(m_features);
    m_this.modified();
    return newFeature;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Delete feature
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.deleteFeature = function (feature) {
    var i;

    for (i = 0; i < m_features.length; i += 1) {
      if (m_features[i] === feature) {
        m_features[i]._exit();
        m_this.dataTime().modified();
        m_this.modified();
        m_features.splice(i, 1);
      }
    }
    m_this.removeChild(feature);

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set drawables
   *
   * @returns {Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.features = function (val) {
    if (val === undefined) {
      return m_features;
    } else {
      m_features = val.slice(0);
      m_this.dataTime().modified();
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   *
   * Do not call parent _init method as its already been executed
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    if (m_this.initialized()) {
      return m_this;
    }

    /// Call super class init
    s_init.call(m_this);

    /// Bind events to handlers
    m_this.geoOn(geo.event.resize, function (event) {
      m_this.renderer()._resize(event.x, event.y, event.width, event.height);
      m_this._update({});
      m_this.renderer()._render();
    });

    m_this.geoOn(geo.event.pan, function (event) {
      m_this._update({event: event});
      m_this.renderer()._render();
    });

    m_this.geoOn(geo.event.zoom, function (event) {
      m_this._update({event: event});
      m_this.renderer()._render();
    });

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function (request) {
    var i;

    if (!m_features.length) {
      return m_this;
    }

    /// Call base class update
    s_update.call(m_this, request);

    if (!m_this.source() && m_features && m_features.length === 0) {
      console.log("[info] No valid data source found.");
      return;
    }

    if (m_this.dataTime().getMTime() > m_this.updateTime().getMTime()) {
      for (i = 0; i < m_features.length; i += 1) {
        m_features[i].renderer(m_this.renderer());
      }
    }

    for (i = 0; i < m_features.length; i += 1) {
      m_features[i]._update();
    }

    m_this.updateTime().modified();

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Free all resources
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.clear();
    s_exit();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Draw
   */
  ////////////////////////////////////////////////////////////////////////////
  this.draw = function () {
    // Call sceneObject.draw, which calls draw on all child objects.
    s_draw();

    // Now call render on the renderer. In certain cases it may not do
    // anything if the if the child objects are drawn on the screen already.
    m_this.renderer()._render();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Clear all features in layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clear = function () {
    var i;

    if (!m_features.length) {
      return m_this;
    }

    for (i = 0; i < m_features.length; i += 1) {
      m_features[i]._exit();
      m_this.removeChild(m_features[i]);
    }

    m_this.dataTime().modified();
    m_this.modified();
    m_features = [];

    return m_this;
  };

  return m_this;
};

inherit(geo.featureLayer, geo.layer);

// Now register it
geo.registerLayer("feature", geo.featureLayer);

//////////////////////////////////////////////////////////////////////////////
/**
 * Common object containing all event types that are provided by the GeoJS
 * API.  Each property contained here is a valid target for event handling
 * via {@link geo.object#geoOn}.  The event object provided to handlers is
 * different for each event type.  Each handler will generally be called
 * with a the <code>this</code> context being the class that caused the event.<br>
 * <br>
 * The following properties are common to all event objects:
 *
 * @namespace
 * @property type {string} The event type that was triggered
 * @property geo {object} A universal event object for controlling propagation
 *
 * @example
 * map.geoOn(geo.event.layerAdd, function (event) {
 *   // event is an object with type: {@link geo.event.layerAdd}
 * });
 *
 */
//////////////////////////////////////////////////////////////////////////////
geo.event = {};

//////////////////////////////////////////////////////////////////////////////
/*
 * Event types
 */
//////////////////////////////////////////////////////////////////////////////

// The following were not triggered nor used anywhere.  Removing until their
// purpose is defined more clearly.
//
// geo.event.update = "geo_update";
// geo.event.opacityUpdate = "geo_opacityUpdate";
// geo.event.layerToggle = "geo_layerToggle";
// geo.event.layerSelect = "geo_layerSelect";
// geo.event.layerUnselect = "geo_layerUnselect";
// geo.event.rotate = "geo_rotate";
// geo.event.query = "geo_query";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when a layer is added to the map.
 *
 * @property target {geo.map} The current map
 * @property layer {geo.layer} The new layer
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.layerAdd = "geo_layerAdd";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when a layer is removed from the map.
 *
 * @property target {geo.map} The current map
 * @property layer {geo.layer} The old layer
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.layerRemove = "geo_layerRemove";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when the map's zoom level is changed.  Note that zoom is never
 * triggered on the map itself.  Instead it is triggered individually on
 * layers, starting with the base layer.
 *
 * @property zoomLevel {Number} New zoom level
 * @property screenPosition {object} The screen position of mouse pointer
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.zoom = "geo_zoom";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when the map is panned either by user interaction or map
 * transition.
 *
 * @property screenDelta {object} The number of pixels to pan the map by
 * @property center {object} The new map center
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.pan = "geo_pan";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when the map's canvas is resized.
 *
 * @property width {Number} The new width in pixels
 * @property height {Number} The new height in pixels
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.resize = "geo_resize";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered on every call to {@link geo.map#draw} before the map is rendered.
 *
 * @property target {geo.map} The current map
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.draw = "geo_draw";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered on every call to {@link geo.map#draw} after the map is rendered.
 *
 * @property target {geo.map} The current map
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.drawEnd = "geo_drawEnd";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered on every "mousemove" over the map's DOM element.  The event
 * object extends {@link geo.mouseState}.
 * @mixes geo.mouseState
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.mousemove = "geo_mousemove";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered on every "mousedown" over the map's DOM element.  The event
 * object extends {@link geo.mouseState}.
 * @mixes geo.mouseState
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.mouseclick = "geo_mouseclick";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered on every "mousemove" during a brushing selection.
 * The event object extends {@link geo.brushSelection}.
 * @mixes geo.brushSelection
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.brush = "geo_brush";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered after a brush selection ends.
 * The event object extends {@link geo.brushSelection}.
 * @mixes geo.brushSelection
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.brushend = "geo_brushend";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when a brush selection starts.
 * The event object extends {@link geo.brushSelection}.
 * @mixes geo.brushSelection
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.brushstart = "geo_brushstart";


//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered before a map navigation animation begins.  Set
 * <code>event.geo.cancelAnimation</code> to cancel the animation
 * of the navigation.  This will cause the map to navigate to the
 * target location immediately.  Set <code>event.geo.cancelNavigation</code>
 * to cancel the navigation completely.  The transition options can
 * be modified in place.
 *
 * @property {geo.geoPosition} center The target center
 * @property {Number} zoom The target zoom level
 * @property {Number} duration The duration of the transition in milliseconds
 * @property {function} ease The easing function
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.transitionstart = "geo_transitionstart";

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered after a map navigation animation ends.
 *
 * @property {geo.geoPosition} center The target center
 * @property {Number} zoom The target zoom level
 * @property {Number} duration The duration of the transition in milliseconds
 * @property {function} ease The easing function
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.transitionend = "geo_transitionend";

////////////////////////////////////////////////////////////////////////////
/**
 * @namespace
 */
////////////////////////////////////////////////////////////////////////////
geo.event.clock = {
  play: "geo_clock_play",
  stop: "geo_clock_stop",
  pause: "geo_clock_pause",
  change: "geo_clock_change"
};

////////////////////////////////////////////////////////////////////////////
/**
 * This event object provides mouse/keyboard events that can be handled
 * by the features.  This provides a similar interface as core events,
 * but with different names so the events don't interfere.  Subclasses
 * can override this to provide custom events.
 *
 * These events will only be triggered on features which were instantiated
 * with the option "selectionAPI".
 * @namespace
 */
////////////////////////////////////////////////////////////////////////////
geo.event.feature = {
  mousemove:  "geo_feature_mousemove",
  mouseover:  "geo_feature_mouseover",
  mouseout:   "geo_feature_mouseout",
  mouseon:    "geo_feature_mouseon",
  mouseoff:   "geo_feature_mouseoff",
  mouseclick: "geo_feature_mouseclick",
  brushend:   "geo_feature_brushend",
  brush:      "geo_feature_brush"
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of mapInteractor
 *
 * @class
 * @extends geo.object
 * @returns {geo.mapInteractor}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mapInteractor = function (args) {
  'use strict';
  if (!(this instanceof geo.mapInteractor)) {
    return new geo.mapInteractor(args);
  }
  geo.object.call(this);

  var m_options = args || {},
      m_this = this,
      m_mouse,
      m_keyboard,
      m_state,
      $node,
      m_wheelQueue = { x: 0, y: 0 },
      m_throttleTime = 10,
      m_wait = false,
      m_disableThrottle = true,
      m_selectionLayer = null,
      m_selectionPlane = null;

  // Helper method to decide if the current button/modifiers match a set of
  // conditions.
  // button: 'left' | 'right' | 'middle'
  // modifiers: [ 'alt' | 'meta' | 'ctrl' | 'shift' ]
  function eventMatch(button, modifiers) {
    /* jshint -W018 */
    return (button === 'wheel' || m_mouse.buttons[button]) &&
      (!!m_mouse.modifiers.alt)   === (!!modifiers.alt)   &&
      (!!m_mouse.modifiers.meta)  === (!!modifiers.meta)  &&
      (!!m_mouse.modifiers.shift) === (!!modifiers.shift) &&
      (!!m_mouse.modifiers.ctrl)  === (!!modifiers.ctrl);
    /* jshint +W018 */
  }

  // Helper method to calculate the speed from a velocity
  function calcSpeed(v) {
    var x = v.x, y = v.y;
    return Math.sqrt(x * x + y * y);
  }

  // For throttling mouse events this is a function that
  // returns true if no actions are in progress and starts
  // a timer to block events for the next `m_throttleTime` ms.
  // If it returns false, the caller should ignore the
  // event.
  function doRespond() {
    if (m_disableThrottle) {
      return true;
    }
    if (m_wait) {
      return false;
    }
    m_wait = true;
    window.setTimeout(function () {
      m_wait = false;
      m_wheelQueue = {
        x: 0,
        y: 0
      };
    }, m_throttleTime);
    return true;
  }

  // copy the options object with defaults
  m_options = $.extend(
    true,
    {
      panMoveButton: 'left',
      panMoveModifiers: {},
      zoomMoveButton: 'right',
      zoomMoveModifiers: {},
      panWheelEnabled: false,
      panWheelModifiers: {},
      zoomWheelEnabled: true,
      zoomWheelModifiers: {},
      wheelScaleX: 1,
      wheelScaleY: 1,
      zoomScale: 1,
      selectionButton: 'left',
      selectionModifiers: {'shift': true},
      momentum: {
        enabled: true,
        maxSpeed: 2.5,
        minSpeed: 0.01,
        drag: 0.01
      },
      spring: {
        enabled: false,
        springConstant: 0.00005
      }
    },
    m_options
  );

  // options supported:
  // {
  //   // button that must be pressed to initiate a pan on mousedown
  //   panMoveButton: 'right' | 'left' | 'middle'
  //
  //   // modifier keys that must be pressed to initiate a pan on mousemove
  //   panMoveModifiers: { 'ctrl' | 'alt' | 'meta' | 'shift' }
  //
  //   // button that must be pressed to initiate a zoom on mousedown
  //   zoomMoveButton: 'right' | 'left' | 'middle'
  //
  //   // modifier keys that must be pressed to initiate a zoom on mousemove
  //   zoomMoveModifiers: { 'ctrl' | 'alt' | 'meta' | 'shift' }
  //
  //   // enable or disable panning with the mouse wheel
  //   panWheelEnabled: true | false
  //
  //   // modifier keys that must be pressed to trigger a pan on wheel
  //   panWheelModifiers: {...}
  //
  //   // enable or disable zooming with the mouse wheel
  //   zoomWheelEnabled: true | false
  //
  //   // modifier keys that must be pressed to trigger a zoom on wheel
  //   zoomWheelModifiers: {...}
  //
  //   // wheel scale factor to change the magnitude of wheel interactions
  //   wheelScaleX: 1
  //   wheelScaleY: 1
  //
  //   // zoom scale factor to change the magnitude of zoom move interactions
  //   zoomScale: 1
  //
  //   // button that must be pressed to enable drag selection
  //    selectionButton: 'right' | 'left' | 'middle'
  //
  //   // keyboard modifiers that must be pressed to initiate a selection
  //   selectionModifiers: {...}
  //
  //   // enable momentum when panning
  //   momentum: {
  //     enabled: true | false,
  //     drag: number, // drag coefficient
  //     maxSpeed: number, // don't allow animation to pan faster than this
  //     minSpeed: number  // stop animations if the speed is less than this
  //   }
  //
  //   // enable spring clamping to screen edges to enforce clamping
  //   spring: {
  //     enabled: true | false,
  //     springConstant: number,
  //   }
  // }

  // A bunch of type definitions for api documentation:
  /**
   * General representation of rectangular bounds in world coordinates
   * @typedef geo.geoBounds
   * @type {object}
   * @property {geo.geoPosition} upperLeft Upper left corner
   * @property {geo.geoPosition} upperRight Upper right corner
   * @property {geo.geoPosition} lowerLeft Lower left corner
   * @property {geo.geoPosition} lowerRight Lower right corner
   */

  /**
   * General representation of rectangular bounds in pixel coordinates
   * @typedef geo.screenBounds
   * @type {object}
   * @property {geo.screenPosition} upperLeft Upper left corner
   * @property {geo.screenPosition} upperRight Upper right corner
   * @property {geo.screenPosition} lowerLeft Lower left corner
   * @property {geo.screenPosition} lowerRight Lower right corner
   */

  /**
   * General representation of a point on the screen.
   * @typedef geo.screenPosition
   * @type {object}
   * @property {Number} x Horizontal coordinate in pixels
   * @property {Number} y Vertical coordinate in pixels
   */

  /**
   * General represention of a point on the earth.
   * @typedef geo.geoPosition
   * @type {object}
   * @property {Number} x Horizontal coordinate in degrees longitude
   * @property {Number} y Vertical coordinate in degrees latitude
   */

  /**
   * The status of all mouse buttons.
   * @typedef geo.mouseButtons
   * @type {object}
   * @property {true|false} left The left mouse button
   * @property {true|false} right The right mouse button
   * @property {true|false} middle The middle mouse button
   */

  /**
   * The status of all modifier keys these are copied from the
   * standard DOM events.
   * @typedef geo.modifierKeys
   * @type {object}
   * @property {true|false} alt <code>Event.alt</code>
   * @property {true|false} ctrl <code>Event.ctrl</code>
   * @property {true|false} shift <code>Event.shift</code>
   * @property {true|false} meta <code>Event.meta</code>
   */

  /**
   * Provides information about the state of the mouse
   * @typedef geo.mouseState
   * @type {object}
   * @property {geo.screenPosition} page Mouse location in pixel space
   * @property {geo.geoPosition} map Mouse location in world space
   * @property {geo.mouseButtons} buttons The current state of the mouse buttons
   * @property {geo.modifierKeys} modifiers The current state of all modifier keys
   * @property {Date} time The timestamp the event took place
   * @property {Number} deltaTime The time in milliseconds since the last mouse event
   * @property {geo.screenPosition} velocity The velocity of the mouse pointer
   * in pixels per second
   */

  /**
   * @typedef geo.brushSelection
   * @type {object}
   * @property {geo.screenBounds} display The selection bounds in pixel space
   * @property {geo.geoBounds} gcs The selection bounds in world space
   * @property {geo.mouseState} mouse The current mouse state
   * @property {geo.mouseState} origin The mouse state at the start of the
   * brush action
   */


  // default mouse object
  m_mouse = {
    page: { // mouse position relative to the page
      x: 0,
      y: 0
    },
    map: { // mouse position relative to the map
      x: 0,
      y: 0
    },
    // mouse button status
    buttons: {
      left: false,
      right: false,
      middle: false
    },
    // keyboard modifier status
    modifiers: {
      alt: false,
      ctrl: false,
      shift: false,
      meta: false
    },
    // time the event was captured
    time: new Date(),
    // time elapsed since the last mouse event
    deltaTime: 1,
    // pixels/ms
    velocity: {
      x: 0,
      y: 0
    }
  };

  // default keyboard object
  // (keyboard events not implemented yet)
  m_keyboard = {
  };

  // The interactor state determines what actions are taken in response to
  // core browser events.
  //
  // i.e.
  // {
  //    'action': 'pan',      // an ongoing pan event
  //    'origin': {...},      // mouse object at the start of the action
  //    'delta': {x: *, y: *} // mouse movement since action start
  //                          // not including the current event
  //  }
  //
  //  {
  //    'action': 'zoom',  // an ongoing zoom event
  //    ...
  //  }
  //
  //  {
  //    'acton': 'select',
  //    'origin': {...},
  //    'delta': {x: *, y: *}
  //  }
  //
  //  {
  //    'action': 'momentum',
  //    'origin': {...},
  //    'handler': function () { }, // called in animation loop
  //    'timer': animate loop timer
  //  }
  m_state = {};

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Connects events to a map.  If the map is not set, then this does nothing.
   * @returns {geo.mapInteractor}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._connectEvents = function () {
    if (!m_options.map) {
      return m_this;
    }

    // prevent double binding to dom elements
    m_this._disconnectEvents();

    // store the connected element
    $node = $(m_options.map.node());


    // add event handlers
    $node.on('mousemove.geojs', m_this._handleMouseMove);
    $node.on('mousedown.geojs', m_this._handleMouseDown);
    $node.on('mouseup.geojs', m_this._handleMouseUp);
    $node.on('wheel.geojs', m_this._handleMouseWheel);
    if (m_options.panMoveButton === 'right' ||
        m_options.zoomMoveButton === 'right') {
      $node.on('contextmenu.geojs', function () { return false; });
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Disonnects events to a map.  If the map is not set, then this does nothing.
   * @returns {geo.mapInteractor}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._disconnectEvents = function () {
    if ($node) {
      $node.off('.geojs');
      $node = null;
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Sets or gets map for this interactor, adds draw region layer if needed
   *
   * @param {geo.map} newMap optional
   * @returns {geo.interactorStyle|geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.map = function (val) {
    if (val !== undefined) {
      m_options.map = val;
      m_this._connectEvents();
      return m_this;
    }
    return m_options.map;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Gets/sets the options object for the interactor.
   *
   * @param {Object} opts optional
   * @returns {geo.interactorStyle|Object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.options = function (opts) {
    if (opts === undefined) {
      return $.extend({}, m_options);
    }
    $.extend(m_options, opts);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Stores the current mouse position from an event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getMousePosition = function (evt) {
    var offset = $node.offset(), dt, t;

    t = (new Date()).valueOf();
    dt = t - m_mouse.time;
    m_mouse.time = t;
    m_mouse.deltaTime = dt;
    m_mouse.velocity = {
      x: (evt.pageX - m_mouse.page.x) / dt,
      y: (evt.pageY - m_mouse.page.y) / dt
    };
    m_mouse.page = {
      x: evt.pageX,
      y: evt.pageY
    };
    m_mouse.map = {
      x: evt.pageX - offset.left,
      y: evt.pageY - offset.top
    };
    try {
      m_mouse.geo = m_this.map().displayToGcs(m_mouse.map);
    } catch (e) {
      // catch georeferencing problems and move on
      // needed for handling the map before the base layer
      // is attached
      m_mouse.geo = null;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Stores the current mouse button
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getMouseButton = function (evt) {
    if (evt.which === 1) {
      m_mouse.buttons.left = evt.type !== 'mouseup';
    } else if (evt.which === 3) {
      m_mouse.buttons.right = evt.type !== 'mouseup';
    } else if (evt.which === 2) {
      m_mouse.buttons.middle = evt.type !== 'mouseup';
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Stores the current keyboard modifiers
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getMouseModifiers = function (evt) {
    m_mouse.modifiers.alt = evt.altKey;
    m_mouse.modifiers.ctrl = evt.ctrlKey;
    m_mouse.modifiers.meta = evt.metaKey;
    m_mouse.modifiers.shift = evt.shiftKey;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute a selection information object.
   * @private
   * @returns {Object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getSelection = function () {
    var origin = m_state.origin,
        mouse = m_this.mouse(),
        map = m_this.map(),
        display = {}, gcs = {};

    // TODO: clamp to map bounds
    // Get the display coordinates
    display.upperLeft = {
      x: Math.min(origin.map.x, mouse.map.x),
      y: Math.min(origin.map.y, mouse.map.y)
    };

    display.lowerRight = {
      x: Math.max(origin.map.x, mouse.map.x),
      y: Math.max(origin.map.y, mouse.map.y)
    };

    display.upperRight = {
      x: display.lowerRight.x,
      y: display.upperLeft.y
    };

    display.lowerLeft = {
      x: display.upperLeft.x,
      y: display.lowerRight.y
    };

    // Get the gcs coordinates
    gcs.upperLeft = map.displayToGcs(display.upperLeft);
    gcs.lowerRight = map.displayToGcs(display.lowerRight);
    gcs.upperRight = map.displayToGcs(display.upperRight);
    gcs.lowerLeft = map.displayToGcs(display.lowerLeft);

    m_selectionPlane.origin([
      display.lowerLeft.x,
      display.lowerLeft.y,
      0
    ]);
    m_selectionPlane.upperLeft([
      display.upperLeft.x,
      display.upperLeft.y,
      0
    ]);
    m_selectionPlane.lowerRight([
      display.lowerRight.x,
      display.lowerRight.y,
      0
    ]);
    m_selectionPlane.draw();

    return {
      display: display,
      gcs: gcs,
      mouse: mouse,
      origin: $.extend({}, m_state.origin)
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Immediately cancel an ongoing action.
   *
   * @param {string?} action The action type, if null cancel any action
   * @returns {bool} If an action was canceled
   */
  ////////////////////////////////////////////////////////////////////////////
  this.cancel = function (action) {
    var out;
    if (!action) {
      out = !!m_state.action;
    } else {
      out = m_state.action === action;
    }
    if (out) {
      m_state = {};
    }
    return out;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle event when a mouse button is pressed
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseDown = function (evt) {
    var action = null;

    if (m_state.action === 'momentum') {
      // cancel momentum on click
      m_state = {};
    }

    m_this._getMousePosition(evt);
    m_this._getMouseButton(evt);
    m_this._getMouseModifiers(evt);

    if (eventMatch(m_options.panMoveButton, m_options.panMoveModifiers)) {
      action = 'pan';
    } else if (eventMatch(m_options.zoomMoveButton, m_options.zoomMoveModifiers)) {
      action = 'zoom';
    } else if (eventMatch(m_options.selectionButton, m_options.selectionModifiers)) {
      action = 'select';
    }

    m_mouse.velocity = {
      x: 0,
      y: 0
    };

    if (action) {
      // store the state object
      m_state = {
        action: action,
        origin: $.extend(true, {}, m_mouse),
        delta: {x: 0, y: 0}
      };

      if (action === 'select') {
        // Make sure the old selection layer is gone.
        if (m_selectionLayer) {
          m_selectionLayer.clear();
          m_this.map().deleteLayer(m_selectionLayer);
          m_selectionLayer = null;
        }
        // Create a feature layer and plane feature to show the selection bounds
        m_selectionLayer = m_this.map().createLayer('feature', {renderer: 'd3'});
        m_selectionPlane = m_selectionLayer.createFeature('plane');
        m_selectionPlane.style({
          screenCoordinates: true,
          fillOpacity: function () { return 0.25; }
        });
        m_this.map().geoTrigger(geo.event.brushstart, m_this._getSelection());
      }

      // bind temporary handlers to document
      $(document).on('mousemove.geojs', m_this._handleMouseMoveDocument);
      $(document).on('mouseup.geojs', m_this._handleMouseUpDocument);
    }

  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse move event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseMove = function (evt) {
    if (m_state.action) {
      // If currently performing a navigation action, the mouse
      // coordinates will be captured by the document handler.
      return;
    }
    m_this._getMousePosition(evt);
    m_this._getMouseButton(evt);
    m_this._getMouseModifiers(evt);
    m_this.map().geoTrigger(geo.event.mousemove, m_this.mouse());
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse move event on the document (temporary bindings)
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseMoveDocument = function (evt) {
    var dx, dy, selectionObj;
    m_this._getMousePosition(evt);
    m_this._getMouseButton(evt);
    m_this._getMouseModifiers(evt);

    if (!m_state.action) {
      // This shouldn't happen
      console.log('WARNING: Invalid state in mapInteractor.');
      return;
    }

    // when throttled, do nothing
    if (!doRespond()) {
      return;
    }

    // calculate the delta from the origin point to avoid
    // accumulation of floating point errors
    dx = m_mouse.map.x - m_state.origin.map.x - m_state.delta.x;
    dy = m_mouse.map.y - m_state.origin.map.y - m_state.delta.y;
    m_state.delta.x += dx;
    m_state.delta.y += dy;

    if (m_state.action === 'pan') {
      m_this.map().pan({x: dx, y: dy});
    } else if (m_state.action === 'zoom') {
      m_this.map().zoom(
        m_this.map().zoom() - dy * m_options.zoomScale / 120
      );
    } else if (m_state.action === 'select') {
      // Get the bounds of the current selection
      selectionObj = m_this._getSelection();
      m_this.map().geoTrigger(geo.event.brush, selectionObj);
    }

    // Prevent default to stop text selection in particular
    evt.preventDefault();
  };

  /**
   * Use interactor options to modify the mouse velocity by momentum
   * or spring equations depending on the current map state.
   * @private
   * @param {object} v Current velocity in pixels / ms
   * @param {number} deltaT The time delta
   * @returns {object} New velocity
   */
  function modifyVelocity(v, deltaT) {
    deltaT = deltaT <= 0 ? 30 : deltaT;
    var sf = springForce();
    var speed = calcSpeed(v);
    var vx = v.x / speed;
    var vy = v.y / speed;

    speed = speed * Math.exp(-m_options.momentum.drag * deltaT);

    // |force| + |velocity| < c <- stopping condition
    if (calcSpeed(sf) * deltaT + speed < m_options.momentum.minSpeed) {
      return null;
    }

    if (speed > 0) {
      vx = vx * speed;
      vy = vy * speed;
    } else {
      vx = 0;
      vy = 0;
    }

    return {
      x: vx - sf.x * deltaT,
      y: vy - sf.y * deltaT
    };
  }

  /**
   * Get the spring force for the current map bounds
   * (This method might need to move elsewhere to deal
   * with different projections)
   * @private
   * @returns {object} The spring force
   */
  function springForce() {
    var xplus,  // force to the right
        xminus, // force to the left
        yplus,  // force to the top
        yminus; // force to the bottom

    if (!m_options.spring.enabled) {
      return {x: 0, y: 0};
    }
    // get screen coordinates of corners
    var ul = m_this.map().gcsToDisplay({
      x: -180,
      y: 82
    });
    var lr = m_this.map().gcsToDisplay({
      x: 180,
      y: -82
    });

    var c = m_options.spring.springConstant;
    // Arg... map needs to expose the canvas size
    var width = m_this.map().node().width();
    var height = m_this.map().node().height();

    xplus = c * Math.max(0, ul.x);
    xminus = c * Math.max(0, width - lr.x);
    yplus = c * Math.max(0, ul.y) / 2;
    yminus = c * Math.max(0, height - lr.y) / 2;

    return {
      x: xplus - xminus,
      y: yplus - yminus
    };
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle event when a mouse button is unpressed on the document.
   * Removes temporary bindings.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseUpDocument = function (evt) {
    var selectionObj, oldAction;

    m_this._getMouseButton(evt);
    m_this._getMouseModifiers(evt);

    // unbind temporary handlers on document
    $(document).off('.geojs');

    if (m_mouse.buttons.right) {
      evt.preventDefault();
    }

    if (m_state.action === 'select') {
      selectionObj = m_this._getSelection();

      m_selectionLayer.clear();
      m_this.map().deleteLayer(m_selectionLayer);
      m_selectionLayer = null;
      m_selectionPlane = null;

      m_this.map().geoTrigger(geo.event.brushend, selectionObj);
    }

    // reset the interactor state
    oldAction = m_state.action;
    m_state = {};

    // if momentum is enabled, start the action here
    if (m_options.momentum.enabled && oldAction === 'pan') {
      m_this.springBack(true);
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle event when a mouse button is unpressed
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseUp = function (evt) {
    m_this._getMouseButton(evt);
    m_this._getMouseModifiers(evt);

    // fire a click event here
    m_this.map().geoTrigger(geo.event.mouseclick, m_this.mouse());
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse wheel event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseWheel = function (evt) {
    var zoomFactor, direction;

    // try to normalize deltas using the wheel event standard:
    //   https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
    evt.deltaFactor = 1;
    if (evt.originalEvent.deltaMode === 1) {
      // DOM_DELTA_LINE -- estimate line height
      evt.deltaFactor = 12;
    } else if (evt.originalEvent.deltaMode === 2) {
      // DOM_DELTA_PAGE -- get window height
      evt.deltaFactor = $(window).height();
    }

    // If the browser doesn't support the standard then
    // just set the delta's to zero.
    evt.deltaX = evt.originalEvent.deltaX || 0;
    evt.deltaY = evt.originalEvent.deltaY || 0;

    m_this._getMouseModifiers(evt);
    evt.deltaX = evt.deltaX * m_options.wheelScaleX * evt.deltaFactor / 120;
    evt.deltaY = evt.deltaY * m_options.wheelScaleY * evt.deltaFactor / 120;

    evt.preventDefault();
    if (!doRespond()) {
      m_wheelQueue.x += evt.deltaX;
      m_wheelQueue.y += evt.deltaY;
      return;
    }

    evt.deltaX += m_wheelQueue.x;
    evt.deltaY += m_wheelQueue.y;

    m_wheelQueue = {
      x: 0,
      y: 0
    };

    if (m_options.panWheelEnabled &&
        eventMatch('wheel', m_options.panWheelModifiers)) {

      m_this.map().pan({
        x: evt.deltaX,
        y: -evt.deltaY
      });

    } else if (m_options.zoomWheelEnabled &&
               eventMatch('wheel', m_options.zoomWheelModifiers)) {

      zoomFactor = -evt.deltaY;
      direction = m_mouse.map;

      m_this.map().zoom(
        m_this.map().zoom() + zoomFactor,
        direction
      );
    }
  };


  ////////////////////////////////////////////////////////////////////////////
  /**
   * Start up a spring back action when the map bounds are out of range.
   * Not to be user callable.
   * @todo Move this and momentum handling to the map class
   * @protected
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.springBack = function (initialVelocity) {
    if (m_state.action === 'momentum') {
      return;
    }
    if (!initialVelocity) {
      m_mouse.velocity = {
        x: 0,
        y: 0
      };
    }
    m_state.action = 'momentum';
    m_state.origin = m_this.mouse();
    m_state.start = new Date();
    m_state.handler = function () {
      var v, s, last, dt;

      // Not sure the correct way to do this.  We need the delta t for the
      // next time step...  Maybe use a better interpolator and the time
      // parameter from requestAnimationFrame.
      dt = Math.min(m_mouse.deltaTime, 30);
      if (m_state.action !== 'momentum' ||
          !m_this.map() ||
          m_this.map().transition()) {
        // cancel if a new action was performed
        return;
      }

      last = m_state.start.valueOf();
      m_state.start = new Date();

      v = modifyVelocity(m_mouse.velocity, m_state.start - last);

      // stop panning when the speed is below the threshold
      if (!v) {
        m_state = {};
        return;
      }

      s = calcSpeed(v);
      if (s > m_options.momentum.maxSpeed) {
        s = m_options.momentum.maxSpeed / s;
        v.x = v.x * s;
        v.y = v.y * s;
      }

      if (!isFinite(v.x) || !isFinite(v.y)) {
        v.x = 0;
        v.y = 0;
      }
      m_mouse.velocity.x = v.x;
      m_mouse.velocity.y = v.y;

      m_this.map().pan({
        x: m_mouse.velocity.x * dt,
        y: m_mouse.velocity.y * dt
      });

      if (m_state.handler) {
        window.requestAnimationFrame(m_state.handler);
      }
    };
    if (m_state.handler) {
      window.requestAnimationFrame(m_state.handler);
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle double click event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleDoubleClick = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Public method that unbinds all events
   */
  ////////////////////////////////////////////////////////////////////////////
  this.destroy = function () {
    m_this._disconnectEvents();
    m_this.map(null);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get current mouse information
   */
  ////////////////////////////////////////////////////////////////////////////
  this.mouse = function () {
    return $.extend(true, {}, m_mouse);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get current keyboard information
   */
  ////////////////////////////////////////////////////////////////////////////
  this.keyboard = function () {
    return $.extend(true, {}, m_keyboard);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the current interactor state
   */
  ////////////////////////////////////////////////////////////////////////////
  this.state = function () {
    return $.extend(true, {}, m_state);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Simulate a DOM mouse event on connected map.
   *
   * The options for creating the events are as follows, not all
   * options are required for every event type. ::
   *
   *   options = {
   *     page: {x, y} // position on the page
   *     map: {x, y}  // position on the map (overrides page)
   *     button: 'left' | 'right' | 'middle'
   *     modifiers: [ 'alt' | 'ctrl' | 'meta' | 'shift' ]
   *     wheelDelta: {x, y}
   *   }
   *
   * @param {string} type Event type 'mousemove', 'mousedown', 'mouseup', ...
   * @param {object} options
   * @returns {mapInteractor}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.simulateEvent = function (type, options) {
    var evt, page, offset, which;

    if (!m_this.map()) {
      return m_this;
    }

    page = options.page || {};

    if (options.map) {
      offset = $node.offset();
      page.x = options.map.x + offset.left;
      page.y = options.map.y + offset.top;
    }

    if (options.button === 'left') {
      which = 1;
    } else if (options.button === 'right') {
      which = 3;
    } else if (options.button === 'middle') {
      which = 2;
    }

    options.modifiers = options.modifiers || [];
    options.wheelDelta = options.wheelDelta || {};

    evt = $.Event(
      type,
      {
        pageX: page.x,
        pageY: page.y,
        which: which,
        altKey: options.modifiers.indexOf('alt') >= 0,
        ctrlKey: options.modifiers.indexOf('ctrl') >= 0,
        metaKey: options.modifiers.indexOf('meta') >= 0,
        shiftKey: options.modifiers.indexOf('shift') >= 0,
        originalEvent: {
          deltaX: options.wheelDelta.x,
          deltaY: options.wheelDelta.y,
          deltaMode: options.wheelMode
        }
      }
    );
    $node.trigger(evt);
  };
  this._connectEvents();
  return this;
};

inherit(geo.mapInteractor, geo.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * Stores the current time for a map, triggers time keeping events, and
 * handles the animation state and interaction.
 *
 * @class geo.clock
 * @extends geo.object
 * @returns {geo.clock}
 */
//////////////////////////////////////////////////////////////////////////////
geo.clock = function (opts) {
  'use strict';

  if (!(this instanceof geo.clock)) {
    return new geo.clock(opts);
  }
  opts = opts || {};
  geo.object.call(this, opts);

  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_now = new Date(0),
      m_start = null,
      m_end = null,
      m_step = null,
      m_rate = null,
      m_loop = Number.POSITIVE_INFINITY,
      m_currentLoop = 0,
      m_state = 'stop',
      m_currentAnimation = null,
      m_object = null;

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the geo.object to trigger events on.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.object = function (arg) {
    if (arg === undefined) {
      return m_object;
    }
    m_object = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Returns true if attached to a valid geo.object.
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._attached = function () {
    return (m_object instanceof geo.object);
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the current time.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.now = function (arg) {
    var previous = m_now;
    if (arg === undefined) {
      return m_now;
    }
    m_now = arg;

    if (m_now !== previous &&
        m_this._attached()) {
      m_this.object().geoTrigger(geo.event.clock.change, {
        previous: previous,
        current: m_now,
        clock: m_this
      });
    }
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the animation start time.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.start = function (arg) {
    if (arg === undefined) {
      return m_start;
    }
    m_start = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the animation end time.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.end = function (arg) {
    if (arg === undefined) {
      return m_end;
    }
    m_end = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the animation time step.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.step = function (arg) {
    if (arg === undefined) {
      return m_step;
    }
    m_step = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set looping control of the clock.  This controls how many times the
   * animation will repeat before stopping.  Default
   * ``Number.POSITIVE_INFINITY``, the animation repeats forever.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.loop = function (arg) {
    if (arg === undefined) {
      return m_loop;
    }
    m_loop = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the animation state.  Valid values are:
   *
   *   * 'stop'
   *   * 'play'
   *   * 'pause'
   *
   * This will also trigger relevant events, but they may be fired
   * asynchronously.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.state = function (arg, step) {

    if (arg === undefined) {
      return m_state;
    }
    if (['stop', 'play', 'pause'].indexOf(arg) < 0) {
      console.log('WARNING: Ignored invalid state: ' + arg);
      return m_this;
    }

    if (arg === 'play' && m_state === 'stop') {
      // reset animation parameters
      m_currentLoop = 0;
      m_this.now(m_this.start());
    }

    if (arg === 'play' && m_state !== 'play') {
      // Start a new animation.
      m_state = arg;
      m_this._animate(step || 1);
    }

    m_state = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the animation frame rate.  This is approximately the number
   * of frames displayed per second.  A null value will use the browser's
   * native requestAnimationFrame to draw new frames.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.framerate = function (arg) {
    if (arg === undefined) {
      return m_rate;
    }
    m_rate = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Step to the next frame in the animation.  Pauses the animation if it is
   * playing.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.stepForward = function () {
    m_this.state('pause');
    m_this._setNextFrame(1);
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Step to the previous frame in the animation.  Pauses the animation if it is
   * playing.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.stepBackward = function () {
    m_this.state('pause');
    m_this._setNextFrame(-1);
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Step to the next frame in the animation.  Will set the state to stop
   * if the animation has reached the end and there are no more loops.
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._setNextFrame = function (step) {
    var next = new Date(m_this.now().valueOf() + step * m_this.step());

    if (next >= m_this.end() || next <= m_this.start()) {
      if (m_this.loop() <= m_currentLoop) {
        m_this.state('stop');
        return;
      }
      m_currentLoop += 1;
      if (step >= 0) {
        m_this.now(m_this.start());
      } else {
        m_this.now(m_this.end());
      }
      return;
    }
    m_this.now(next);
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Start an animation.
   * @param {integer} step The animation frame step (+1 for forward -1 for
   *                       reverse, etc).
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._animate = function (step) {
    var myAnimation = {};
    m_currentAnimation = myAnimation;

    function frame() {
      if (myAnimation !== m_currentAnimation) {
        // A new animation has started, so kill this one.
        return;
      }
      m_this._setNextFrame(step);
      if (m_this.state() === 'play') {

        // Queue the next frame
        if (!m_this.framerate()) {
          window.requestAnimationFrame(frame);
        } else {
          window.setTimeout(frame, 1000 / m_this.framerate());
        }
      } else if (m_this._attached()) {
        m_this.object().geoTrigger(geo.event.clock[m_this.state()], {
          current: m_this.now(),
          clock: m_this
        });
      }
    }

    // trigger the play event
    if (m_this._attached()) {
      m_this.object().geoTrigger(geo.event.clock.play, {
        current: m_this.now(),
        clock: m_this
      });
    }

    // Queue the first frame
    if (!m_this.framerate()) {
      window.requestAnimationFrame(frame);
    } else {
      window.setTimeout(frame, 1000 / m_this.framerate());
    }
  };
};
inherit(geo.clock, geo.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class fileReader
 *
 * @class
 * @extends geo.object
 * @returns {geo.fileReader}
 */
//////////////////////////////////////////////////////////////////////////////
geo.fileReader = function (arg) {
  "use strict";
  if (!(this instanceof geo.fileReader)) {
    return new geo.fileReader(arg);
  }
  geo.object.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  arg = arg || {};

  if (!(arg.layer instanceof geo.featureLayer)) {
    throw "fileReader must be given a feature layer";
  }

  var m_layer = arg.layer;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the feature layer attached to the reader
   */
  ////////////////////////////////////////////////////////////////////////////
  this.layer = function () {
    return m_layer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Tells the caller if it can handle the given file by returning a boolean.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.canRead = function () {
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Reads the file object and calls the done function when finished.  As an
   * argument to done, provides a boolean that reports if the read was a
   * success.  Possibly, it can call done with an object containing details
   * of the read operation.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.read = function (file, done) {
    done(false);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return a FileReader with handlers attached.
   */
  ////////////////////////////////////////////////////////////////////////////
  function newFileReader(done, progress) {
    var reader = new FileReader();
    if (progress) {
      reader.onprogress = progress;
    }
    reader.onloadend = function () {
      if (!reader.result) {
        done(reader.error);
      }
      done(reader.result);
    };
    return reader;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private method for reading a file object as a string.  Calls done with
   * the string content when finished or an error object if unsuccessful.
   * Optionally, the caller can provide a progress method that is called
   * after reading each slice.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getString = function (file, done, progress) {
    var reader = newFileReader(done, progress);
    reader.readAsText(file);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Like _getString, but returns an ArrayBuffer object.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getArrayBuffer = function (file, done, progress) {
    var reader = newFileReader(done, progress);
    reader.readAsText(file);
  };

  return this;
};

inherit(geo.fileReader, geo.object);

/*global File*/
//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class jsonReader
 *
 * @class
 * @extends geo.fileReader
 * @returns {geo.jsonReader}
 */
//////////////////////////////////////////////////////////////////////////////
geo.jsonReader = function (arg) {
  'use strict';
  if (!(this instanceof geo.jsonReader)) {
    return new geo.jsonReader(arg);
  }

  var m_this = this, m_style = arg.style || {};
  m_style = $.extend({
      'strokeWidth': 2,
      'strokeColor': {r: 0, g: 0, b: 0},
      'strokeOpacity': 1,
      'fillColor': {r: 1, g: 0, b: 0},
      'fillOpacity': 1
    }, m_style);

  geo.fileReader.call(this, arg);

  this.canRead = function (file) {
    if (file instanceof File) {
      return (file.type === 'application/json' || file.name.match(/\.json$/));
    } else if (typeof file === 'string') {
      try {
        JSON.parse(file);
      } catch (e) {
        return false;
      }
      return true;
    }
    try {
      if (Array.isArray(m_this._featureArray(file))) {
        return true;
      }
    } catch (e) {}
    return false;
  };

  this._readObject = function (file, done, progress) {
    var object;
    function onDone(fileString) {
      if (typeof fileString !== 'string') {
        done(false);
      }

      // We have two possibilities here:
      // 1) fileString is a JSON string or is
      // a URL.
      try {
        object = JSON.parse(fileString);
        done(object);
      } catch (e) {
        if (!object) {
          $.ajax({
            type: 'GET',
            url: fileString,
            dataType: 'text'
          }).done(function (data) {
            object = JSON.parse(data);
            done(object);
          }).fail(function () {
            done(false);
          });
        }
      }
    }

    if (file instanceof File) {
      m_this._getString(file, onDone, progress);
    } else if (typeof file === 'string') {
      onDone(file);
    } else {
      done(file);
    }
  };

  this._featureArray = function (spec) {
    if (spec.type === 'FeatureCollection') {
      return spec.features || [];
    }
    if (spec.type === 'GeometryCollection') {
      throw 'GeometryCollection not yet implemented.';
    }
    if (Array.isArray(spec.coordinates)) {
      return spec;
    }
    throw 'Unsupported collection type: ' + spec.type;
  };

  this._featureType = function (spec) {
    var geometry = spec.geometry || {};
    if (geometry.type === 'Point' || geometry.type === 'MultiPoint') {
      return 'point';
    }
    if (geometry.type === 'LineString') {
      return 'line';
    }
    if (geometry.type === 'Polygon') {
      return 'polygon';
    }
    return null;
  };

  this._getCoordinates = function (spec) {
    var geometry = spec.geometry || {},
        coordinates = geometry.coordinates || [], elv;

    if ((coordinates.length === 2 || coordinates.length === 3) &&
        (isFinite(coordinates[0]) && isFinite(coordinates[1]))) {

      // Do we have a elevation component
      if (isFinite(coordinates[2])) {
        elv = coordinates[2];
      }

      // special handling for single point coordinates
      return [{x: coordinates[0], y: coordinates[1], z: elv}];
    }

    // need better handling here, but we can plot simple polygons
    // by taking just the outer linearring
    if (Array.isArray(coordinates[0][0])) {
      coordinates = coordinates[0];
    }

    // return an array of latlng's for LineString, MultiPoint, etc...
    return coordinates.map(function (c) {
      return {
        x: c[0],
        y: c[1],
        z: c[2]
      };
    });
  };

  this._getStyle = function (spec) {
    return spec.properties;
  };

  this.read = function (file, done, progress) {

    function _done(object) {
      var features, allFeatures = [];

      features = m_this._featureArray(object);

      features.forEach(function (feature) {
        var type = m_this._featureType(feature),
            coordinates = m_this._getCoordinates(feature),
            style = m_this._getStyle(feature);
        if (type) {
          if (type === 'line') {
            style.fill = style.fill || false;
            allFeatures.push(m_this._addFeature(
              type,
              [coordinates],
              style,
              feature.properties
            ));
          } else if (type === 'point') {
            style.stroke = style.stroke || false;
            allFeatures.push(m_this._addFeature(
              type,
              coordinates,
              style,
              feature.properties
            ));
          } else if (type === 'polygon') {
            style.fill = style.fill === undefined ? true : style.fill;
            style.fillOpacity = (
              style.fillOpacity === undefined ? 0.25 : style.fillOpacity
            );
            // polygons not yet supported
            allFeatures.push(m_this._addFeature(
              'line',
              [coordinates],
              style,
              feature.properties
            ));
          }
        } else {
          console.log('unsupported feature type: ' + feature.geometry.type);
        }
      });

      if (done) {
        done(allFeatures);
      }
    }

    m_this._readObject(file, _done, progress);
  };


  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build the data array for a feature given the coordinates and properties
   * from the geojson.
   *
   * @private
   * @param {Object[]} coordinates Coordinate data array
   * @param {Object} properties Geojson properties object
   * @param {Object} style Global style defaults
   * @returns {Object[]}
   */
  //////////////////////////////////////////////////////////////////////////////
  this._buildData = function (coordinates, properties, style) {
    return coordinates.map(function (coord) {
      return {
        coordinates: coord,
        properties: properties,
        style: style
      };
    });
  };

  this._addFeature = function (type, coordinates, style, properties) {
    var _style = $.extend({}, m_style, style);
    var feature = m_this.layer().createFeature(type)
      .data(m_this._buildData(coordinates, properties, style))
      .style(_style);

    if (type === 'line') {
      feature.line(function (d) { return d.coordinates; });
    } else {
      feature.position(function (d) { return d.coordinates; });
    }
    return feature;
  };

};

inherit(geo.jsonReader, geo.fileReader);

geo.registerFileReader('jsonReader', geo.jsonReader);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class map
 *
 * Creates a new map inside of the given HTML layer (Typically DIV)
 * @class
 * @extends geo.sceneObject
 * @returns {geo.map}
 */
//////////////////////////////////////////////////////////////////////////////
geo.map = function (arg) {
  "use strict";
  if (!(this instanceof geo.map)) {
    return new geo.map(arg);
  }
  arg = arg || {};
  geo.sceneObject.call(this, arg);
  arg.layers = arg.layers === undefined ? [] : arg.layers;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private member variables
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      m_x = 0,
      m_y = 0,
      m_node = $(arg.node),
      m_width = arg.width || m_node.width(),
      m_height = arg.height || m_node.height(),
      m_gcs = arg.gcs === undefined ? "EPSG:4326" : arg.gcs,
      m_uigcs = arg.uigcs === undefined ? "EPSG:4326" : arg.uigcs,
      m_center = { x: 0, y: 0 },
      m_zoom = arg.zoom === undefined ? 1 : arg.zoom,
      m_baseLayer = null,
      m_fileReader = null,
      m_interactor = null,
      m_validZoomRange = { min: 0, max: 16 },
      m_transition = null,
      m_queuedTransition = null,
      m_clock = null,
      m_bounds = {};

  arg.center = geo.util.normalizeCoordinates(arg.center);
  arg.autoResize = arg.autoResize === undefined ? true : arg.autoResize;
  arg.clampBounds = arg.clampBounds === undefined ? true : arg.clampBounds;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get map gcs
   *
   * @returns {string}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.gcs = function (arg) {
    if (arg === undefined) {
      return m_gcs;
    }
    m_gcs = arg;
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get map user interface GCS
   *
   * @returns {string}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.uigcs = function () {
    return m_uigcs;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get root node of the map
   *
   * @returns {object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.node = function () {
    return m_node;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set zoom level of the map
   *
   * @returns {Number|geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.zoom = function (val, direction) {
    var base, evt, recenter = false;
    if (val === undefined) {
      return m_zoom;
    }

    val = Math.min(m_validZoomRange.max, Math.max(val, m_validZoomRange.min));
    if (val === m_zoom) {
      return m_this;
    }

    base = m_this.baseLayer();

    evt = {
      geo: {},
      zoomLevel: val,
      screenPosition: direction,
      eventType: geo.event.zoom
    };
    if (base) {
      base.renderer().geoTrigger(geo.event.zoom, evt, true);
    }

    recenter = evt.center;
    if (!evt.geo.preventDefault) {

      m_zoom = val;
      m_this._updateBounds();

      m_this.children().forEach(function (child) {
        child.geoTrigger(geo.event.zoom, evt, true);
      });

      m_this.modified();
    }

    if (evt.center) {
      m_this.center(recenter);
    } else {
      m_this.pan({x: 0, y: 0});
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Pan the map by (x: dx, y: dy) pixels.
   *
   * @param {Object} delta
   * @param {bool?} force Disable bounds clamping
   * @returns {geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pan = function (delta, force) {
    var base = m_this.baseLayer(),
        evt, pt, corner1, corner2;

    if (arg.clampBounds && !force && m_width && m_height) {
      pt = m_this.displayToGcs({
        x: delta.x,
        y: delta.y
      });

      corner1 = m_this.gcsToDisplay({
        x: -180,
        y: 82
      });
      corner2 = m_this.gcsToDisplay({
        x: 180,
        y: -82
      });

      if (corner1.x > 0 && corner2.x < m_width) {
        // if the map is too small horizontally
        delta.x = (-corner1.x + m_width - corner2.x) / 2;
      } else {
        delta.x = Math.max(Math.min(delta.x, -corner1.x), m_width - corner2.x);
      }
      if (corner1.y > 0 && corner2.y < m_height) {
        // if the map is too small horizontally
        delta.y = (-corner1.y + m_height - corner2.y) / 2;
      } else {
        delta.y = Math.max(Math.min(delta.y, -corner1.y), m_height - corner2.y);
      }
    }

    evt = {
      geo: {},
      screenDelta: delta,
      eventType: geo.event.pan
    };
    // first pan the base layer
    if (base) {
      base.renderer().geoTrigger(geo.event.pan, evt, true);
    }

    // If the base renderer says the pan is invalid, then cancel the action.
    if (evt.geo.preventDefault) {
      return;
    }
    m_center = m_this.displayToGcs({
      x: m_width / 2,
      y: m_height / 2
    });
    m_this._updateBounds();

    m_this.children().forEach(function (child) {
      child.geoTrigger(geo.event.pan, evt, true);
    });

    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set center of the map to the given geographic coordinates, or get the
   * current center.  Uses bare objects {x: 0, y: 0}.
   *
   * @param {Object} coordinates
   * @returns {Object|geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.center = function (coordinates, force) {
    var newCenter, currentCenter;

    if (coordinates === undefined) {
      return m_center;
    }

    // get the screen coordinates of the new center
    coordinates = geo.util.normalizeCoordinates(coordinates);
    newCenter = m_this.gcsToDisplay(coordinates);
    currentCenter = m_this.gcsToDisplay(m_center);

    // call the pan method
    m_this.pan({
      x: currentCenter.x - newCenter.x,
      y: currentCenter.y - newCenter.y
    }, force);

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add layer to the map
   *
   * @param {geo.layer} layer to be added to the map
   * @return {geom.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.createLayer = function (layerName, arg) {
    var newLayer = geo.createLayer(
      layerName, m_this, arg);

    if (newLayer !== null || newLayer !== undefined) {
      newLayer._resize(m_x, m_y, m_width, m_height);
    } else {
      return null;
    }

    if (newLayer.referenceLayer() || m_this.children().length === 0) {
      m_this.baseLayer(newLayer);
    }
    m_this.addChild(newLayer);
    m_this.modified();

    // TODO: need a better way to set the initial coordinates of a layer
    if (!newLayer.referenceLayer()) {
      m_this.center(m_this.center());
    }

    m_this.geoTrigger(geo.event.layerAdd, {
      type: geo.event.layerAdd,
      target: m_this,
      layer: newLayer
    });

    return newLayer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove layer from the map
   *
   * @param {geo.layer} layer that should be removed from the map
   * @return {geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.deleteLayer = function (layer) {

    if (layer !== null && layer !== undefined) {
      layer._exit();

      m_this.removeChild(layer);

      m_this.modified();

      m_this.geoTrigger(geo.event.layerRemove, {
        type: geo.event.layerRemove,
        target: m_this,
        layer: layer
      });
    }

    /// Return deleted layer (similar to createLayer) as in the future
    /// we may provide extension of this method to support deletion of
    /// layer using id or some sort.
    return layer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Toggle visibility of a layer
   *
   *  @param {geo.layer} layer
   *  @returns {Boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.toggle = function (layer) {
    if (layer !== null && layer !== undefined) {
      layer.visible(!layer.visible());
      m_this.modified();

      m_this.geoTrigger(geo.event.layerToggle, {
        type: geo.event.layerToggle,
        target: m_this,
        layer: layer
      });
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Resize map
   *
   * @param {Number} x x-offset in display space
   * @param {Number} y y-offset in display space
   * @param {Number} w width in display space
   * @param {Number} h height in display space
   */
  ////////////////////////////////////////////////////////////////////////////
  this.resize = function (x, y, w, h) {
    var i, layers = m_this.children();

    m_x = x;
    m_y  = y;
    m_width = w;
    m_height = h;

    for (i = 0; i < layers.length; i += 1) {
      layers[i]._resize(x, y, w, h);
    }

    m_this.geoTrigger(geo.event.resize, {
      type: geo.event.resize,
      target: m_this,
      x: m_x,
      y: m_y,
      width: w,
      height: h
    });

    m_this._updateBounds();
    m_this.pan({x: 0, y: 0});
    m_this.modified();

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from gcs coordinates to display coordinates
   *
   * @param {*} input {[geo.latlng], [{x:_x, y: _y}], [x1,y1, x2, y2]}
   * @return {object}
   *
   * @note Currently only lat-lon inputs are supported
   */
  ////////////////////////////////////////////////////////////////////////////
  this.gcsToDisplay = function (input) {
    var world, output;

    /// Now handle different data types
    if ((input instanceof Array &&
         input.length > 0) || input instanceof Object) {
      world = m_baseLayer.toLocal(input);
      output = m_baseLayer.renderer().worldToDisplay(world);
    } else {
      /// Everything else
      throw "Conversion method latLonToDisplay does not handle " + input;
    }

    return output;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from display to latitude longitude coordinates
   */
  ////////////////////////////////////////////////////////////////////////////
  this.displayToGcs = function (input) {
    var output;

    /// Now handle different data types
    if ((input instanceof Array && input.length > 0) ||
         input instanceof Object) {
      output = m_baseLayer.renderer().displayToWorld(input);
      output = m_baseLayer.fromLocal(output);
    } else {
      throw "Conversion method displayToGcs does not handle " + input;
    }
    return output;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Queries each layer for information at this location.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.query = function () {
    // TODO Implement this
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Sets or gets base layer for this map
   *
   * @param {geo.layer} baseLayer optional
   * @returns {geo.map|geo.layer}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.baseLayer = function (baseLayer) {
    var save;
    if (baseLayer !== undefined) {

      // The GCS of the layer must match the map
      if (m_gcs !== baseLayer.gcs()) {
        m_this.gcs(baseLayer.gcs());
      }

      m_baseLayer = baseLayer;

      // Set the layer as the reference layer
      m_baseLayer.referenceLayer(true);

      if (arg.center) {
        // This assumes that the base layer is initially centered at
        // (0, 0).  May want to add an explicit call to the base layer
        // to set a given center.
        m_this.center(arg.center, true);
      }
      save = m_zoom;
      m_zoom = null;
      m_this.zoom(save);

      m_this._updateBounds();

      // This forces the map into a state with valid bounds
      // when clamping is on.  The original call to center
      // is forced to initialize the camera position in the
      // base layer so no adjustment is done there.
      m_this.pan({x: 0, y: 0});
      return m_this;
    }
    return m_baseLayer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Manually force to render map
   */
  ////////////////////////////////////////////////////////////////////////////
  this.draw = function () {
    var i, layers = m_this.children();

    m_this.geoTrigger(geo.event.draw, {
        type: geo.event.draw,
        target: m_this
      }
    );

    m_this._update();

    for (i = 0; i < layers.length; i += 1) {
      layers[i].draw();
    }

    m_this.geoTrigger(geo.event.drawEnd, {
        type: geo.event.drawEnd,
        target: m_this
      }
    );

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Attach a file reader to a layer in the map to be used as a drop target.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.fileReader = function (readerType, opts) {
    var layer, renderer;
    opts = opts || {};
    if (!readerType) {
      return m_fileReader;
    }
    layer = opts.layer;
    if (!layer) {
      renderer = opts.renderer;
      if (!renderer) {
        renderer = "d3";
      }
      layer = m_this.createLayer("feature", {renderer: renderer});
    }
    opts.layer = layer;
    opts.renderer = renderer;
    m_fileReader = geo.createFileReader(readerType, opts);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize the map
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    var i;

    if (m_node === undefined || m_node === null) {
      throw "Map require DIV node";
    }

    if (arg !== undefined && arg.layers !== undefined) {
      for (i = 0; i < arg.layers.length; i += 1) {
        if (i === 0) {
          m_this.baseLayer(arg.layers[i]);
        }

        m_this.addLayer(arg.layers[i]);
      }
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update map
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function (request) {
    var i, layers = m_this.children();
    for (i = 0; i < layers.length; i += 1) {
      layers[i]._update(request);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Exit this map
   */
  ////////////////////////////////////////////////////////////////////////////
  this.exit = function () {
    var i, layers = m_this.children();
    for (i = 0; i < layers.length; i += 1) {
      layers[i]._exit();
    }
    if (m_this.interactor()) {
      m_this.interactor().destroy();
      m_this.interactor(null);
    }
    m_this.node().off(".geo");
    $(window).off("resize", resizeSelf);
    s_exit();
  };

  this._init(arg);

  // set up drag/drop handling
  this.node().on("dragover.geo", function (e) {
    var evt = e.originalEvent;

    if (m_this.fileReader()) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = "copy";
    }
  })
  .on("drop.geo", function (e) {
    var evt = e.originalEvent, reader = m_this.fileReader(),
        i, file;

    function done() {
      m_this.draw();
    }

    if (reader) {
      evt.stopPropagation();
      evt.preventDefault();

      for (i = 0; i < evt.dataTransfer.files.length; i += 1) {
        file = evt.dataTransfer.files[i];
        if (reader.canRead(file)) {
          reader.read(file, done); // to do: trigger event on done
        }
      }
    }
  });

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the map interactor
   */
  ////////////////////////////////////////////////////////////////////////////
  this.interactor = function (arg) {
    if (arg === undefined) {
      return m_interactor;
    }
    m_interactor = arg;

    // this makes it possible to set a null interactor
    // i.e. map.interactor(null);
    if (m_interactor) {
      m_interactor.map(m_this);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the map clock
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clock = function (arg) {
    if (arg === undefined) {
      return m_clock;
    }
    m_clock = arg;

    if (m_clock) {
      m_clock.object(m_this);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the min/max zoom range.
   *
   * @param {Object} arg {min: minimumzoom, max: maximumzom}
   * @returns {Object|geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.zoomRange = function (arg) {
    if (arg === undefined) {
      return $.extend({}, m_validZoomRange);
    }
    m_validZoomRange.min = arg.min;
    m_validZoomRange.max = arg.max;
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Start an animated zoom/pan.
   *
   * Options:
   * <pre>
   *   opts = {
   *     center: { x: ... , y: ... } // the new center
   *     zoom: ... // the new zoom level
   *     duration: ... // the duration (in ms) of the transition
   *     ease: ... // an easing function [0, 1] -> [0, 1]
   *   }
   * </pre>
   *
   * Call with no arguments to return the current transition information.
   *
   * @param {object?} opts
   * @returns {geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.transition = function (opts) {

    if (opts === undefined) {
      return m_transition;
    }

    if (m_transition) {
      m_queuedTransition = opts;
      return m_this;
    }

    function interp1(p0, p1, t) {
      return p0 + (p1 - p0) * t;
    }
    function defaultInterp(p0, p1) {
      return function (t) {
        return [
          interp1(p0[0], p1[0], t),
          interp1(p0[1], p1[1], t),
          interp1(p0[2], p1[2], t)
        ];
      };
    }

    // Transform zoom level into z-coordinate and inverse
    function zoom2z(z) {
      return 360 * Math.pow(2, -1 - z);
    }
    function z2zoom(z) {
      return -1 - Math.log2(z / 360);
    }

    var defaultOpts = {
      center: m_this.center(),
      zoom: m_this.zoom(),
      duration: 1000,
      ease: function (t) {
        return t;
      },
      interp: defaultInterp,
      done: null,
      zCoord: true
    };

    if (opts.center) {
      opts.center = geo.util.normalizeCoordinates(opts.center);
    }
    $.extend(defaultOpts, opts);

    m_transition = {
      start: {
        center: m_this.center(),
        zoom: m_this.zoom()
      },
      end: {
        center: defaultOpts.center,
        zoom: defaultOpts.zoom
      },
      ease: defaultOpts.ease,
      zCoord: defaultOpts.zCoord,
      done: defaultOpts.done,
      duration: defaultOpts.duration
    };

    if (defaultOpts.zCoord) {
      m_transition.interp = defaultOpts.interp(
        [
          m_transition.start.center.x,
          m_transition.start.center.y,
          zoom2z(m_transition.start.zoom)
        ],
        [
          m_transition.end.center.x,
          m_transition.end.center.y,
          zoom2z(m_transition.end.zoom)
        ]
      );
    } else {
      m_transition.interp = defaultOpts.interp(
        [
          m_transition.start.center.x,
          m_transition.start.center.y,
          m_transition.start.zoom
        ],
        [
          m_transition.end.center.x,
          m_transition.end.center.y,
          m_transition.end.zoom
        ]
      );
    }

    function anim(time) {
      var done = m_transition.done, next;
      next = m_queuedTransition;

      if (!m_transition.start.time) {
        m_transition.start.time = time;
        m_transition.end.time = time + defaultOpts.duration;
      }
      m_transition.time = time - m_transition.start.time;
      if (time >= m_transition.end.time || next) {
        if (!next) {
          m_this.center(m_transition.end.center);
          m_this.zoom(m_transition.end.zoom);
        }

        m_transition = null;

        m_this.geoTrigger(geo.event.transitionend, defaultOpts);

        if (done) {
          done();
        }

        if (next) {
          m_queuedTransition = null;
          m_this.transition(next);
        }

        return;
      }

      var z = m_transition.ease(
        (time - m_transition.start.time) / defaultOpts.duration
      );

      var p = m_transition.interp(z);
      if (m_transition.zCoord) {
        p[2] = z2zoom(p[2]);
      }
      m_this.center({
        x: p[0],
        y: p[1]
      });
      m_this.zoom(p[2]);

      window.requestAnimationFrame(anim);
    }

    m_this.geoTrigger(geo.event.transitionstart, defaultOpts);

    if (defaultOpts.cancelNavigation) {
      m_this.geoTrigger(geo.event.transitionend, defaultOpts);
      return m_this;
    } else if (defaultOpts.cancelAnimation) {
      // run the navigation synchronously
      defaultOpts.duration = 0;
      anim(0);
    } else {
      window.requestAnimationFrame(anim);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update the internally cached map bounds.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  this._updateBounds = function () {
    m_bounds.lowerLeft = m_this.displayToGcs({
      x: 0,
      y: m_height
    });
    m_bounds.lowerRight = m_this.displayToGcs({
      x: m_width,
      y: m_height
    });
    m_bounds.upperLeft = m_this.displayToGcs({
      x: 0,
      y: 0
    });
    m_bounds.upperRight = m_this.displayToGcs({
      x: m_width,
      y: 0
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/set the locations of the current map corners as latitudes/longitudes.
   * When provided the argument should be an object containing the keys
   * lowerLeft and upperRight declaring the desired new map bounds.  The
   * new bounds will contain at least the min/max lat/lngs provided.  In any
   * case, the actual new bounds will be returned by this function.
   *
   * @param {geo.geoBounds} [bds] The requested map bounds
   * @return {geo.geoBounds} The actual new map bounds
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bounds = function (bds) {
    var nav;

    if (bds === undefined) {
      return m_bounds;
    }

    nav = m_this.zoomAndCenterFromBounds(bds);
    m_this.zoom(nav.zoom);
    m_this.center(nav.center);
    return m_bounds;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the center zoom level necessary to display the given lat/lon bounds.
   *
   * @param {geo.geoBounds} [bds] The requested map bounds
   * @return {object} Object containing keys "center" and "zoom"
   */
  ////////////////////////////////////////////////////////////////////////////
  this.zoomAndCenterFromBounds = function (bds) {
    var ll, ur, dx, dy, zx, zy, center;

    // Caveat:
    // Much of the following is invalid for alternative map projections.  These
    // computations should really be defered to the base layer, but there is
    // no clear path for doing that with the current base layer api.

    // extract bounds info and check for validity
    ll = geo.util.normalizeCoordinates(bds.lowerLeft || {});
    ur = geo.util.normalizeCoordinates(bds.upperRight || {});

    if (ll.x >= ur.x || ll.y >= ur.y) {
      throw new Error("Invalid bounds provided");
    }

    center = {
      x: (ll.x + ur.x) / 2,
      y: (ll.y + ur.y) / 2
    };

    // calculate the current extend
    dx = m_bounds.upperRight.x - m_bounds.lowerLeft.x;
    dy = m_bounds.upperRight.y - m_bounds.lowerLeft.y;

    // calculate the zoom levels necessary to fit x and y bounds
    zx = m_zoom - Math.log2((ur.x - ll.x) / dx);
    zy = m_zoom - Math.log2((ur.y - ll.y) / dy);

    return {
      zoom: Math.min(zx, zy),
      center: center
    };
  };

  this.interactor(arg.interactor || geo.mapInteractor());
  this.clock(arg.clock || geo.clock());

  function resizeSelf() {
    m_this.resize(0, 0, m_node.width(), m_node.height());
  }

  if (arg.autoResize) {
    $(window).resize(resizeSelf);
  }

  return this;
};

/**
 * General object specification for map types.  Any additional
 * values in the object are passed to the map constructor.
 * @typedef geo.map.spec
 * @type {object}
 * @property {object[]} [data=[]] The default data array to
 * apply to each feature if none exists
 * @property {geo.layer.spec[]} [layers=[]] Layers to create
 */

/**
 * Create a map from an object.  Any errors in the creation
 * of the map will result in returning null.
 * @param {geo.map.spec} spec The object specification
 * @returns {geo.map|null}
 */
geo.map.create = function (spec) {
  "use strict";

  var map = geo.map(spec);

  if (!map) {
    console.warn("Could not create map.");
    return null;
  }

  spec.data = spec.data || [];
  spec.layers = spec.layers || [];

  spec.layers.forEach(function (l) {
    l.data = l.data || spec.data;
    l.layer = geo.layer.create(map, l);
  });

  return map;
};

inherit(geo.map, geo.sceneObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class feature
 *
 * @class
 * @extends geo.sceneObject
 * @returns {geo.feature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.feature = function (arg) {
  "use strict";
  if (!(this instanceof geo.feature)) {
    return new geo.feature(arg);
  }
  geo.sceneObject.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  arg = arg || {};

  var m_this = this,
      s_exit = this._exit,
      m_selectionAPI = arg.selectionAPI === undefined ? false : arg.selectionAPI,
      m_style = {},
      m_layer = arg.layer === undefined ? null : arg.layer,
      m_gcs = arg.gcs === undefined ? "EPSG:4326" : arg.gcs,
      m_visible = arg.visible === undefined ? true : arg.visible,
      m_bin = arg.bin === undefined ? 0 : arg.bin,
      m_renderer = arg.renderer === undefined ? null : arg.renderer,
      m_dataTime = geo.timestamp(),
      m_buildTime = geo.timestamp(),
      m_updateTime = geo.timestamp(),
      m_selectedFeatures = [];

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private method to bind mouse handlers on the map element.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._bindMouseHandlers = function () {

    // Don't bind handlers for improved performance on features that don't
    // require it.
    if (!m_selectionAPI) {
      return;
    }

    // First unbind to be sure that the handlers aren't bound twice.
    m_this._unbindMouseHandlers();

    m_this.geoOn(geo.event.mousemove, m_this._handleMousemove);
    m_this.geoOn(geo.event.mouseclick, m_this._handleMouseclick);
    m_this.geoOn(geo.event.brushend, m_this._handleBrushend);
    m_this.geoOn(geo.event.brush, m_this._handleBrush);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private method to unbind mouse handlers on the map element.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._unbindMouseHandlers = function () {
    m_this.geoOff(geo.event.mousemove, m_this._handleMousemove);
    m_this.geoOff(geo.event.mouseclick, m_this._handleMouseclick);
    m_this.geoOff(geo.event.brushend, m_this._handleBrushend);
    m_this.geoOff(geo.event.brush, m_this._handleBrush);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * For binding mouse events, use functions with
   * the following call signatures:
   *
   * function handler(arg) {
   *   // arg.data - the data object of the feature
   *   // arg.index - the index inside the data array of the featue
   *   // arg.mouse - mouse information object (see src/core/mapInteractor.js)
   * }
   *
   * i.e.
   *
   * feature.geoOn(geo.event.feature.mousemove, function (arg) {
   *   // do something with the feature marker.
   * });
   */
  ////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Search for features containing the given point.
   *
   * Returns an object: ::
   *
   *   {
   *     data: [...] // an array of data objects for matching features
   *     index: [...] // an array of indices of the matching features
   *   }
   *
   * @argument {Object} coordinate
   * @returns {Object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pointSearch = function () {
    // base class method does nothing
    return {
      index: [],
      found: []
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private mousemove handler
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMousemove = function () {
    var mouse = m_this.layer().map().interactor().mouse(),
        data = m_this.data(),
        over = m_this.pointSearch(mouse.geo),
        newFeatures = [], oldFeatures = [], lastTop = -1, top = -1;

    // Get the index of the element that was previously on top
    if (m_selectedFeatures.length) {
      lastTop = m_selectedFeatures[m_selectedFeatures.length - 1];
    }

    // There are probably faster ways of doing this:
    newFeatures = over.index.filter(function (i) {
      return m_selectedFeatures.indexOf(i) < 0;
    });
    oldFeatures = m_selectedFeatures.filter(function (i) {
      return over.index.indexOf(i) < 0;
    });

    geo.feature.eventID += 1;
    // Fire events for mouse in first.
    newFeatures.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.mouseover, {
        data: data[i],
        index: i,
        mouse: mouse,
        eventID: geo.feature.eventID,
        top: idx === newFeatures.length - 1
      }, true);
    });

    geo.feature.eventID += 1;
    // Fire events for mouse out next
    oldFeatures.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.mouseout, {
        data: data[i],
        index: i,
        mouse: mouse,
        eventID: geo.feature.eventID,
        top: idx === oldFeatures.length - 1
      }, true);
    });

    geo.feature.eventID += 1;
    // Fire events for mouse move last
    over.index.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.mousemove, {
        data: data[i],
        index: i,
        mouse: mouse,
        eventID: geo.feature.eventID,
        top: idx === over.index.length - 1
      }, true);
    });

    // Replace the selected features array
    m_selectedFeatures = over.index;

    // Get the index of the element that is now on top
    if (m_selectedFeatures.length) {
      top = m_selectedFeatures[m_selectedFeatures.length - 1];
    }

    if (lastTop !== top) {
      // The element on top changed so we need to fire mouseon/mouseoff
      if (lastTop !== -1) {
        m_this.geoTrigger(geo.event.feature.mouseoff, {
          data: data[lastTop],
          index: lastTop,
          mouse: mouse
        }, true);
      }

      if (top !== -1) {
        m_this.geoTrigger(geo.event.feature.mouseon, {
          data: data[top],
          index: top,
          mouse: mouse
        }, true);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private mouseclick handler
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseclick = function () {
    var mouse = m_this.layer().map().interactor().mouse(),
        data = m_this.data(),
        over = m_this.pointSearch(mouse.geo);

    geo.feature.eventID += 1;
    over.index.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.mouseclick, {
        data: data[i],
        index: i,
        mouse: mouse,
        eventID: geo.feature.eventID,
        top: idx === over.index.length - 1
      }, true);
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private brush handler.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleBrush = function (brush) {
    var idx = m_this.boxSearch(brush.gcs.lowerLeft, brush.gcs.upperRight),
        data = m_this.data();

    geo.feature.eventID += 1;
    idx.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.brush, {
        data: data[i],
        index: i,
        mouse: brush.mouse,
        brush: brush,
        eventID: geo.feature.eventID,
        top: idx === idx.length - 1
      }, true);
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private brushend handler.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleBrushend = function (brush) {
    var idx = m_this.boxSearch(brush.gcs.lowerLeft, brush.gcs.upperRight),
        data = m_this.data();

    geo.feature.eventID += 1;
    idx.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.brushend, {
        data: data[i],
        index: i,
        mouse: brush.mouse,
        brush: brush,
        eventID: geo.feature.eventID,
        top: idx === idx.length - 1
      }, true);
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set style used by the feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.style = function (arg1, arg2) {
    if (arg1 === undefined) {
      return m_style;
    } else if (typeof arg1 === "string" && arg2 === undefined) {
      return m_style[arg1];
    } else if (arg2 === undefined) {
      m_style = $.extend({}, m_style, arg1);
      m_this.modified();
      return m_this;
    } else {
      m_style[arg1] = arg2;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * A uniform getter that always returns a function even for constant styles.
   * Maybe extend later to support accessor-like objects.  If undefined input,
   * return all the styles as an object.
   *
   * @param {string|undefined} key
   * @return {function}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.style.get = function (key) {
    var tmp, out;
    if (key === undefined) {
      var all = {}, k;
      for (k in m_style) {
        if (m_style.hasOwnProperty(k)) {
          all[k] = m_this.style.get(k);
        }
      }
      return all;
    }
    if (key.toLowerCase().match(/color$/)) {
      if (geo.util.isFunction(m_style[key])) {
        tmp = geo.util.ensureFunction(m_style[key]);
        out = function () {
          return geo.util.convertColor(
            tmp.apply(this, arguments)
          );
        };
      } else {
        // if the color is not a function, only convert it once
        out = geo.util.ensureFunction(geo.util.convertColor(m_style[key]));
      }
    } else {
      out = geo.util.ensureFunction(m_style[key]);
    }
    return out;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get layer referenced by the feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.layer = function () {
    return m_layer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get renderer used by the feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.renderer = function () {
    return m_renderer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get list of drawables or nodes that are context/api specific.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.drawables = function () {
    return m_this._drawables();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set projection of the feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.gcs = function (val) {
    if (val === undefined) {
      return m_gcs;
    } else {
      m_gcs = val;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set visibility of the feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.visible = function (val) {
    if (val === undefined) {
      return m_visible;
    } else {
      m_visible = val;
      m_this.modified();

      // bind or unbind mouse handlers on visibility change
      if (m_visible) {
        m_this._bindMouseHandlers();
      } else {
        m_this._unbindMouseHandlers();
      }

      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set bin of the feature
   *
   * Bin number is typically used for sorting the order of rendering
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bin = function (val) {
    if (val === undefined) {
      return m_bin;
    } else {
      m_bin = val;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set timestamp of data change
   */
  ////////////////////////////////////////////////////////////////////////////
  this.dataTime = function (val) {
    if (val === undefined) {
      return m_dataTime;
    } else {
      m_dataTime = val;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set timestamp of last time build happened
   */
  ////////////////////////////////////////////////////////////////////////////
  this.buildTime = function (val) {
    if (val === undefined) {
      return m_buildTime;
    } else {
      m_buildTime = val;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set timestamp of last time update happened
   */
  ////////////////////////////////////////////////////////////////////////////
  this.updateTime = function (val) {
    if (val === undefined) {
      return m_updateTime;
    } else {
      m_updateTime = val;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set data
   *
   * @returns {Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.data = function (data) {
    if (data === undefined) {
      return m_this.style("data") || [];
    } else {
      m_this.style("data", data);
      m_this.dataTime().modified();
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Query if the selection API is enabled for this feature.
   * @returns {bool}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.selectionAPI = function () {
    return m_selectionAPI;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   *
   * Derived class should implement this
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    if (!m_layer) {
      throw "Feature requires a valid layer";
    }
    m_style = $.extend({},
                {"opacity": 1.0}, arg.style === undefined ? {} :
                arg.style);
    m_this._bindMouseHandlers();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * Derived class should implement this
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get context specific drawables
   *
   * Derived class should implement this
   */
  ////////////////////////////////////////////////////////////////////////////
  this._drawables = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * Derived class should implement this
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   *
   * Derived class should implement this
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this._unbindMouseHandlers();
    m_selectedFeatures = [];
    m_style = {};
    arg = {};
    s_exit();
  };

  this._init(arg);
  return this;
};

/**
 * The most recent feature event triggered.
 * @type {number}
 */
geo.feature.eventID = 0;

/**
 * General object specification for feature types.
 * @typedef geo.feature.spec
 * @type {object}
 * @property {string} type A supported feature type.
 * @property {object[]} [data=[]] An array of arbitrary objects used to
 * construct the feature.  These objects (and their associated
 * indices in the array) will be passed back to style and attribute
 * accessors provided by the user.  In general the number of
 * "markers" drawn will be equal to the length of this array.
 */

/**
 * Create a feature from an object.  The implementation here is
 * meant to define the general interface of creating features
 * from a javascript object.  See documentation from individual
 * feature types for specific details.  In case of an error in
 * the arguments this method will return null;
 * @param {geo.layer} layer The layer to add the feature to
 * @param {geo.feature.spec} [spec={}] The object specification
 * @returns {geo.feature|null}
 */
geo.feature.create = function (layer, spec) {
  "use strict";

  var type = spec.type;

  // Check arguments
  if (!layer instanceof geo.layer) {
    console.warn("Invalid layer");
    return null;
  }
  if (typeof spec !== "object") {
    console.warn("Invalid spec");
    return null;
  }
  var feature = layer.createFeature(type);
  if (!feature) {
    console.warn("Could not create feature type '" + type + "'");
    return null;
  }

  spec = spec || {};
  spec.data = spec.data || [];
  return feature.style(spec);
};

inherit(geo.feature, geo.sceneObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class pointFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.pointFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.pointFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.pointFeature)) {
    return new geo.pointFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      m_rangeTree = null,
      m_rangeTreeTime = geo.timestamp(),
      s_data = this.data,
      m_maxRadius = 0;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set position
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function (val) {
    if (val === undefined) {
      return m_this.style("position");
    } else {
      m_this.style("position", val);
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update the current range tree object.  Should be called whenever the
   * data changes.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._updateRangeTree = function () {
    if (m_rangeTreeTime.getMTime() >= m_this.dataTime().getMTime()) {
      return;
    }
    var pts, position,
        radius = m_this.style.get("radius"),
        stroke = m_this.style.get("stroke"),
        strokeWidth = m_this.style.get("strokeWidth");

    position = m_this.position();

    m_maxRadius = 0;

    // create an array of positions in geo coordinates
    pts = m_this.data().map(function (d, i) {
      var pt = position(d);
      pt.idx = i;

      // store the maximum point radius
      m_maxRadius = Math.max(
        m_maxRadius,
        radius(d, i) + (stroke(d, i) ? strokeWidth(d, i) : 0)
      );

      return pt;
    });

    m_rangeTree = new geo.util.RangeTree(pts);
    m_rangeTreeTime.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns an array of datum indices that contain the given point.
   * Largely adapted from wigglemaps pointQuerier:
   *
   * https://github.com/dotskapes/wigglemaps/blob/cf5bed3fbfe2c3e48d31799462a80c564be1fb60/src/query/PointQuerier.js
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pointSearch = function (p) {
    var min, max, data, idx = [], box, found = [], ifound = [], map, pt,
        stroke = m_this.style.get("stroke"),
        strokeWidth = m_this.style.get("strokeWidth"),
        radius = m_this.style.get("radius");

    if (!m_this.selectionAPI()) {
      return [];
    }

    data = m_this.data();
    if (!data || !data.length) {
      return {
        found: [],
        index: []
      };
    }

    map = m_this.layer().map();
    pt = map.gcsToDisplay(p);

    // Get the upper right corner in geo coordinates
    min = map.displayToGcs({
      x: pt.x - m_maxRadius,
      y: pt.y + m_maxRadius   // GCS coordinates are bottom to top
    });

    // Get the lower left corner in geo coordinates
    max = map.displayToGcs({
      x: pt.x + m_maxRadius,
      y: pt.y - m_maxRadius
    });

    // Find points inside the bounding box
    box = new geo.util.Box(geo.util.vect(min.x, min.y), geo.util.vect(max.x, max.y));
    m_this._updateRangeTree();
    m_rangeTree.search(box).forEach(function (q) {
      idx.push(q.idx);
    });

    // Filter by circular region
    idx.forEach(function (i) {
      var d = data[i],
          p = m_this.position()(d, i),
          dx, dy, rad;

      rad = radius(data[i], i);
      rad += stroke(data[i], i) ? strokeWidth(data[i], i) : 0;
      p = map.gcsToDisplay(p);
      dx = p.x - pt.x;
      dy = p.y - pt.y;
      if (Math.sqrt(dx * dx + dy * dy) <= rad) {
        found.push(d);
        ifound.push(i);
      }
    });

    return {
      data: found,
      index: ifound
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns an array of datum indices that are contained in the given box.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.boxSearch = function (lowerLeft, upperRight) {
    var pos = m_this.position(),
        idx = [];
    // TODO: use the range tree
    m_this.data().forEach(function (d, i) {
      var p = pos(d);
      if (p.x >= lowerLeft.x &&
          p.x <= upperRight.x &&
          p.y >= lowerLeft.y &&
          p.y <= upperRight.y
      ) {
        idx.push(i);
      }
    });
    return idx;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Overloaded data method that updates the internal range tree on write.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.data = function (data) {
    if (data === undefined) {
      return s_data();
    }
    s_data(data);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns the bounding box for a given datum in screen coordinates as an
   * object: ::
   *
   *   {
   *     min: {
   *       x: value,
   *       y: value
   *     },
   *     max: {
   *       x: value,
   *       y: value
   *     }
   *   }
   *
   * @returns {object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._boundingBox = function (d) {
    var pt, radius;

    // get the position in geo coordinates
    pt = m_this.position()(d);

    // convert to screen coordinates
    pt = m_this.layer().map().gcsToDisplay(pt);

    // get the radius of the points (should we add stroke width?)
    radius = m_this.style().radius(d);

    return {
      min: {
        x: pt.x - radius,
        y: pt.y - radius
      },
      max: {
        x: pt.x + radius,
        y: pt.y + radius
      }
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        radius: 10.0,
        stroke: true,
        strokeColor: { r: 0.0, g: 1.0, b: 0.0 },
        strokeWidth: 2.0,
        strokeOpacity: 1.0,
        fillColor: { r: 1.0, g: 0.0, b: 0.0 },
        fill: true,
        fillOpacity: 1.0,
        sprites: false,
        sprites_image: null,
        position: function (d) { return d; }
      },
      arg.style === undefined ? {} : arg.style
    );

    if (arg.position !== undefined) {
      defaultStyle.position = arg.position;
    }

    m_this.style(defaultStyle);
    m_this.dataTime().modified();
  };

  return m_this;
};

geo.event.pointFeature = $.extend({}, geo.event.feature);

/**
 * Object specification for a point feature.
 *
 * @extends geo.feature.spec // need to make a jsdoc plugin for this to work
 * @typedef geo.pointFeature.spec
 * @type {object}
 */

/**
 * Create a pointFeature from an object.
 * @see {@link geo.feature.create}
 * @param {geo.layer} layer The layer to add the feature to
 * @param {geo.pointFeature.spec} spec The object specification
 * @returns {geo.pointFeature|null}
 */
geo.pointFeature.create = function (layer, renderer, spec) {
  "use strict";

  spec.type = "point";
  return geo.feature.create(layer, spec);
};

inherit(geo.pointFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class lineFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.lineFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.lineFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.lineFeature)) {
    return new geo.lineFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set line accessor
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.line = function (val) {
    if (val === undefined) {
      return m_this.style("line");
    } else {
      m_this.style("line", val);
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set position accessor
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function (val) {
    if (val === undefined) {
      return m_this.style("position");
    } else {
      m_this.style("position", val);
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns an array of datum indices that contain the given point.
   * This is a slow implementation with runtime order of the number of
   * vertices.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pointSearch = function (p) {
    var data, pt, map, line, width, indices = [], found = [], pos;
    data = m_this.data();
    if (!data || !data.length) {
      return {
        found: [],
        index: []
      };
    }

    map = m_this.layer().map();
    line = m_this.line();
    width = m_this.style.get("strokeWidth");
    pos = m_this.position();
    pt = map.gcsToDisplay(p);

    // minimum l2 distance squared from
    // q -> line(u, v)
    function lineDist2(q, u, v) {
      var t, l2 = dist2(u, v);

      if (l2 < 1) {
        // u, v are within 1 pixel
        return dist2(q, u);
      }

      t = ((q.x - u.x) * (v.x - u.x) + (q.y - u.y) * (v.y - u.y)) / l2;
      if (t < 0) { return dist2(q, u); }
      if (t > 1) { return dist2(q, v); }
      return dist2(
        q,
        {
          x: u.x + t * (v.x - u.x),
          y: u.y + t * (v.y - u.y)
        }
      );
    }

    // l2 distance squared from u to v
    function dist2(u, v) {
      var dx = u.x - v.x,
          dy = u.y - v.y;
      return dx * dx + dy * dy;
    }

    // for each line
    data.forEach(function (d, index) {
      var last = null;

      try {
        line(d, index).forEach(function (current, j) {

          // get the screen coordinates of the current point
          var p = pos(current, j, d, index);
          var s = map.gcsToDisplay(p);
          var r = Math.ceil(width(p, j, d, index) / 2) + 2;
          r = r * r;

          if (last) {
            // test the line segment s -> last
            if (lineDist2(pt, s, last) <= r) {

              // short circuit the loop here
              throw "found";
            }
          }

          last = s;
        });
      } catch (err) {
        if (err !== "found") {
          throw err;
        }
        found.push(d);
        indices.push(index);
      }
    });

    return {
      data: found,
      index: indices
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns an array of line indices that are contained in the given box.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.boxSearch = function (lowerLeft, upperRight, opts) {
    var pos = m_this.position(),
        idx = [],
        line = m_this.line();

    opts = opts || {};
    opts.partial = opts.partial || false;
    if (opts.partial) {
      throw "Unimplemented query method.";
    }

    m_this.data().forEach(function (d, i) {
      var inside = true;
      line(d, i).forEach(function (e, j) {
        if (!inside) { return; }
        var p = pos(e, j, d, i);
        if (!(p.x >= lowerLeft.x  &&
              p.x <= upperRight.x &&
              p.y >= lowerLeft.y  &&
              p.y <= upperRight.y)
        ) {
          inside = false;
        }
      });
      if (inside) {
        idx.push(i);
      }
    });
    return idx;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        "strokeWidth": 1.0,
        // Default to gold color for lines
        "strokeColor": { r: 1.0, g: 0.8431372549, b: 0.0 },
        "strokeStyle": "solid",
        "strokeOpacity": 1.0,
        "line": function (d) { return d; },
        "position": function (d) { return d; }
      },
      arg.style === undefined ? {} : arg.style
    );

    if (arg.line !== undefined) {
      defaultStyle.line = arg.line;
    }

    if (arg.position !== undefined) {
      defaultStyle.position = arg.position;
    }


    m_this.style(defaultStyle);

    m_this.dataTime().modified();
  };

  this._init(arg);
  return this;
};

/**
 * Create a lineFeature from an object.
 * @see {@link geo.feature.create}
 * @param {geo.layer} layer The layer to add the feature to
 * @param {geo.lineFeature.spec} spec The object specification
 * @returns {geo.lineFeature|null}
 */
geo.lineFeature.create = function (layer, spec) {
  "use strict";

  spec.type = "line";
  return geo.feature.create(layer, spec);
};

inherit(geo.lineFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class pathFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.pathFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.pathFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.pathFeature)) {
    return new geo.pathFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_position = arg.position === undefined ? [] : arg.position,
      s_init = this._init;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set positions
   *
   * @returns {geo.pathFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function (val) {
    if (val === undefined) {
      return m_position;
    }
    // Copy incoming array of positions
    m_position = val;
    m_this.dataTime().modified();
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        "strokeWidth": function () { return 1; },
        "strokeColor": function () { return { r: 1.0, g: 1.0, b: 1.0 }; }
      },
      arg.style === undefined ? {} : arg.style
    );

    m_this.style(defaultStyle);

    if (m_position) {
      m_this.dataTime().modified();
    }
  };

  this._init(arg);
  return this;
};

inherit(geo.pathFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class polygonFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.polygonFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.polygonFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.polygonFeature)) {
    return new geo.polygonFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_position,
      m_polygon,
      s_init = this._init,
      s_data = this.data,
      m_coordinates = {outer: [], inner: []};

  if (arg.line === undefined) {
    m_polygon = function (d) {
      return d;
    };
  } else {
    m_polygon = arg.polygon;
  }

  if (arg.position === undefined) {
    m_position = function (d) {
      return d;
    };
  } else {
    m_position = arg.position;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Override the parent data method to keep track of changes to the
   * internal coordinates.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.data = function (arg) {
    var ret = s_data(arg);
    if (arg !== undefined) {
      getCoordinates();
    }
    return ret;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the internal coordinates whenever the data changes.  For now, we do
   * the computation in world coordinates, but we will need to work in GCS
   * for other projections.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function getCoordinates() {
    var posFunc = m_this.position(),
        polyFunc = m_this.polygon();
    m_coordinates = m_this.data().map(function (d, i) {
      var poly = polyFunc(d);
      var outer, inner;

      outer = (poly.outer || []).map(function (d0, j) {
        return posFunc.call(m_this, d0, j, d, i);
      });

      inner = (poly.inner || []).map(function (hole) {
        return (hole || []).map(function (d0, k) {
          return posFunc.call(m_this, d0, k, d, i);
        });
      });
      return {
        outer: outer,
        inner: inner
      };
    });
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set line accessor
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.polygon = function (val) {
    if (val === undefined) {
      return m_polygon;
    } else {
      m_polygon = val;
      m_this.dataTime().modified();
      m_this.modified();
      getCoordinates();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set position accessor
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function (val) {
    if (val === undefined) {
      return m_position;
    } else {
      m_position = val;
      m_this.dataTime().modified();
      m_this.modified();
      getCoordinates();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Point searce method for selection api.  Returns markers containing the
   * given point.
   * @argument {Object} coordinate
   * @returns {Object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pointSearch = function (coordinate) {
    var found = [], indices = [], data = m_this.data();
    m_coordinates.forEach(function (coord, i) {
      var inside = geo.util.pointInPolygon(
        coordinate,
        coord.outer,
        coord.inner
      );
      if (inside) {
        indices.push(i);
        found.push(data[i]);
      }
    });
    return {
      index: indices,
      found: found
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        "fillColor": { r: 0.0,  g: 0.5, b: 0.5 },
        "fillOpacity": 1.0
      },
      arg.style === undefined ? {} : arg.style
    );

    m_this.style(defaultStyle);

    if (m_position) {
      m_this.dataTime().modified();
    }
  };

  this._init(arg);
  return this;
};

inherit(geo.polygonFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class planeFeature
 *
 * @class
 * @extends geo.polygonFeature
 * @returns {geo.planeFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.planeFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.planeFeature)) {
    return new geo.planeFeature(arg);
  }
  arg = arg || {};

  // Defaults
  arg.ul = arg.ul === undefined ? [0.0, 1.0, 0.0] : arg.ul;
  arg.lr = arg.lr === undefined ? [1.0, 0.0, 0.0] : arg.lr;
  arg.depth = arg.depth === undefined ? 0.0 : arg.depth;

  geo.polygonFeature.call(this, arg);

  var m_this = this,
      m_origin = [arg.ul.x, arg.lr.y, arg.depth],
      m_upperLeft = [arg.ul.x, arg.ul.y, arg.depth],
      m_lowerRight = [arg.lr.x, arg.lr.y, arg.depth],
      m_defaultDepth = arg.depth,
      m_drawOnAsyncResourceLoad = arg.drawOnAsyncResourceLoad === undefined ?
                                    true : false,
      s_init = this._init;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set origin
   *
   * @returns {geo.planeFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.origin = function (val) {
    if (val === undefined) {
      return m_origin;
    } else if (val instanceof Array) {
      if (val.length > 3 || val.length < 2) {
        throw "Upper left point requires point in 2 or 3 dimension";
      }
      m_origin = val.slice(0);
      if (m_origin.length === 2) {
        m_origin[2] = m_defaultDepth;
      }
    } else if (val instanceof geo.latlng) {
      m_origin = [val.x(), val.y(), m_defaultDepth];
    }
    m_this.dataTime().modified();
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set pt1
   *
   * @returns {geo.planeFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.upperLeft = function (val) {
    if (val === undefined) {
      return m_upperLeft;
    } else if (val instanceof Array) {
      if (val.length > 3 || val.length < 2) {
        throw "Upper left point requires point in 2 or 3 dimension";
      }
      m_upperLeft = val.slice(0);
      if (m_upperLeft.length === 2) {
        m_upperLeft[2] = m_defaultDepth;
      }
    } else if (val instanceof geo.latlng) {
      m_upperLeft = [val.x(), val.y(), m_defaultDepth];
    }
    m_this.dataTime().modified();
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set origin
   *
   * @returns {geo.planeFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.lowerRight = function (val) {
    if (val === undefined) {
      return m_lowerRight;
    } else if (val instanceof Array) {
      if (val.length > 3 || val.length < 2) {
        throw "Upper left point requires point in 2 or 3 dimension";
      }
      m_lowerRight = val.slice(0);
      if (m_lowerRight.length === 2) {
        m_lowerRight[2] = m_defaultDepth;
      }
      m_this.dataTime().modified();
    } else if (val instanceof geo.latlng) {
      m_lowerRight = [val.x(), val.y(), m_defaultDepth];
    }
    m_this.dataTime().modified();
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set if draw should happen as soon as a async resource is loaded
   */
  ////////////////////////////////////////////////////////////////////////////
  this.drawOnAsyncResourceLoad = function (val) {
    if (val === undefined) {
      return m_drawOnAsyncResourceLoad;
    } else {
      m_drawOnAsyncResourceLoad = val;
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    var style = null;
    s_init.call(m_this, arg);
    style = m_this.style();
    if (style.image === undefined) {
      style.image = null;
    }
    m_this.style(style);
  };

  this._init(arg);
  return this;
};

inherit(geo.planeFeature, geo.polygonFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class vectorFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.vectorFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.vectorFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.vectorFeature)) {
    return new geo.vectorFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      s_style = this.style;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the accessor for the origin of the vector.  This is the point
   * that the vector base resides at.  Defaults to (0, 0, 0).
   * @param {geo.accessor|geo.geoPosition} [accessor] The origin accessor
   */
  ////////////////////////////////////////////////////////////////////////////
  this.origin = function (val) {
    if (val === undefined) {
      return s_style('origin');
    } else {
      s_style('origin', val);
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the accessor for the displacement (coordinates) of the vector.
   * @param {geo.accessor|geo.geoPosition} [accessor] The accessor
   */
  ////////////////////////////////////////////////////////////////////////////
  this.delta = function (val) {
    if (val === undefined) {
      return s_style('delta');
    } else {
      s_style('delta', val);
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        strokeColor: 'black',
        strokeWidth: 2.0,
        strokeOpacity: 1.0,
        // TODO: define styles for the end markers
        // originStyle: 'none',
        // endStyle: 'arrow',
        origin: {x: 0, y: 0, z: 0},
        delta: function (d) { return d; },
        scale: null // size scaling factor (null -> renderer decides)
      },
      arg.style === undefined ? {} : arg.style
    );

    if (arg.origin !== undefined) {
      defaultStyle.origin = arg.origin;
    }

    m_this.style(defaultStyle);
    m_this.dataTime().modified();
  };
};

inherit(geo.vectorFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class geomFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.geomFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.geomFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.geomFeature)) {
    return new geo.geomFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  arg.style = arg.style === undefined ? $.extend({}, {
    "color": [1.0, 1.0, 1.0],
    "point_sprites": false,
    "point_sprites_image": null
  }, arg.style) : arg.style;

  // Update style
  this.style(arg.style);

  return this;
};

inherit(geo.geomFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class graphFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.graphFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.graphFeature = function (arg) {
  "use strict";

  if (!(this instanceof geo.graphFeature)) {
    return new geo.graphFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_draw = this.draw,
      s_style = this.style,
      m_nodes = null,
      m_points = null,
      m_children = function (d) { return d.children; },
      m_links = [],
      s_init = this._init,
      s_exit = this._exit;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(true, {},
      {
        nodes: {
          radius: 5.0,
          fill: true,
          fillColor: { r: 1.0, g: 0.0, b: 0.0 },
          strokeColor: { r: 0, g: 0, b: 0 }
        },
        links: {
          strokeColor: { r: 0.0, g: 0.0, b: 0.0 }
        },
        linkType: "path" /* 'path' || 'line' */
      },
      arg.style === undefined ? {} : arg.style
    );

    m_this.style(defaultStyle);
    m_this.nodes(function (d) { return d; });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Call child _build methods
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    m_this.children().forEach(function (child) {
      child._build();
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Call child _update methods
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    m_this.children().forEach(function (child) {
      child._update();
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Custom _exit method to remove all sub-features
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.data([]);
    m_links.forEach(function (link) {
      link._exit();
      m_this.removeChild(link);
    });
    m_links = [];
    m_points._exit();
    m_this.removeChild(m_points);
    s_exit();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set style
   */
  ////////////////////////////////////////////////////////////////////////////
  this.style = function (arg, arg2) {
    var out = s_style.call(m_this, arg, arg2);
    if (out !== m_this) {
      return out;
    }
    // set styles for sub-features
    m_points.style(arg.nodes);
    m_links.forEach(function (l) {
      l.style(arg.links);
    });
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set links accessor.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.links = function (arg) {
    if (arg === undefined) {
      return m_children;
    }

    m_children = geo.util.ensureFunction(arg);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set nodes
   */
  ////////////////////////////////////////////////////////////////////////////
  this.nodes = function (val) {
    if (val === undefined) {
      return m_nodes;
    }
    m_nodes = val;
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get internal node feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.nodeFeature = function () {
    return m_points;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get internal link features
   */
  ////////////////////////////////////////////////////////////////////////////
  this.linkFeatures = function () {
    return m_links;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build the feature for drawing
   */
  ////////////////////////////////////////////////////////////////////////////
  this.draw = function () {

    var layer = m_this.layer(),
        data = m_this.data(),
        nLinks = 0,
        style;

    // get the feature style object
    style = m_this.style();

    // Bind data to the point nodes
    m_points.data(data);
    m_points.style(style.nodes);

    // get links from node connections
    data.forEach(function (source) {
      (source.children || []).forEach(function (target) {
        var link;
        nLinks += 1;
        if (m_links.length < nLinks) {
          link = geo.createFeature(
            style.linkType, layer, layer.renderer()
          ).style(style.links);
          m_this.addChild(link);
          m_links.push(link);
        }
        m_links[nLinks - 1].data([source, target]);
      });
    });

    m_links.splice(nLinks, m_links.length - nLinks).forEach(function (l) {
      l._exit();
      m_this.removeChild(l);
    });

    s_draw();
    return m_this;
  };

  m_points = geo.createFeature(
    "point",
    this.layer(),
    this.layer().renderer()
  );
  m_this.addChild(m_points);

  if (arg.nodes) {
    this.nodes(arg.nodes);
  }

  this._init(arg);
  return this;
};

inherit(geo.graphFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Transform geometric data of a feature from source projection to destination
 * projection.
 *
 * @namespace
 */
//////////////////////////////////////////////////////////////////////////////
geo.transform = {};

//////////////////////////////////////////////////////////////////////////////
/**
 * Custom transform for a feature used for OpenStreetMap
 */
//////////////////////////////////////////////////////////////////////////////
geo.transform.osmTransformFeature = function (destGcs, feature, inplace) {
  /// TODO
  /// Currently we make assumption that incoming feature is in 4326
  /// which may not be true.

  "use strict";

  if (!feature) {
    console.log("[warning] Invalid (null) feature");
    return;
  }

  if (feature.gcs() === destGcs) {
    return;
  }

  if (!(feature instanceof geo.pointFeature ||
        feature instanceof geo.lineFeature)) {
    throw "Supports only point or line feature";
  }

  var noOfComponents = null,
      pointOffset = 0,
      count = null,
      inPos = null,
      outPos = null,
      srcGcs = feature.gcs(),
      i,
      yCoord;

  inplace = !!inplace;
  if (feature instanceof geo.pointFeature ||
      feature instanceof geo.lineFeature) {

    ///  If source GCS is not in 4326, transform it first into 4326
    /// before we transform it for OSM.
    if (srcGcs !== "EPSG:4326") {
      geo.transform.transformFeature("EPSG:4326", feature, true);
    }

    inPos = feature.positions();
    count = inPos.length;

    if (!(inPos instanceof Array)) {
      throw "Supports Array of 2D and 3D points";
    }

    if (inPos.length > 0 && inPos[0] instanceof geo.latlng) {
      noOfComponents = 2;
      pointOffset = 1;
    } else {
      noOfComponents = (count % 2 === 0 ? 2 :
                       (count % 3 === 0 ? 3 : null));
      pointOffset = noOfComponents;
    }

    if (noOfComponents !== 2 && noOfComponents !== 3) {
      throw "Transform points require points in 2D or 3D";
    }

    if (inplace) {
      outPos = inPos;
    } else {
      outPos = inPos.slice(0);
    }

    for (i = 0; i < count; i += pointOffset) {

      /// Y goes from 0 (top edge is 85.0511 °N) to 2zoom − 1
      /// (bottom edge is 85.0511 °S) in a Mercator projection.
      if (inPos[i] instanceof geo.latlng) {
        yCoord = inPos[i].lat();
      } else {
        yCoord = inPos[i + 1];
      }

      if (yCoord > 85.0511) {
        yCoord = 85.0511;
      }
      if (yCoord < -85.0511) {
        yCoord = -85.0511;
      }
      if (inPos[i] instanceof geo.latlng) {
        outPos[i] = geo.latlng(geo.mercator.lat2y(yCoord), outPos[i].lng());
      } else {
        outPos[i + 1] = geo.mercator.lat2y(yCoord);
      }
    }

    if (inplace) {
      feature.positions(outPos);
      feature.gcs(destGcs);
    }
    return outPos;
  }

  return null;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Transform a feature to destination GCS
 */
//////////////////////////////////////////////////////////////////////////////
geo.transform.transformFeature = function (destGcs, feature, inplace) {
  "use strict";

  if (!feature) {
    throw "Invalid (null) feature";
  }

  if (!(feature instanceof geo.pointFeature ||
        feature instanceof geo.lineFeature)) {
    throw "Supports only point or line feature";
  }

  if (feature.gcs() === destGcs) {
    return feature.positions();
  }

  if (destGcs === "EPSG:3857") {
    return geo.transform.osmTransformFeature(destGcs, feature, inplace);
  }

  var noOfComponents = null,
      pointOffset = 0,
      count = null,
      inPos = null,
      outPos = null,
      projPoint = null,
      srcGcs = feature.gcs(),
      i,
      projSrcGcs = new proj4.Proj(srcGcs),
      projDestGcs = new proj4.Proj(destGcs);

  inplace = !!inplace;
  if (feature instanceof geo.pointFeature ||
      feature instanceof geo.lineFeature) {
    inPos = feature.positions();
    count = inPos.length;

    if (!(inPos instanceof Array)) {
      throw "Supports Array of 2D and 3D points";
    }

    if (inPos.length > 0 && inPos[0] instanceof geo.latlng) {
      noOfComponents = 2;
      pointOffset = 1;
    } else {
      noOfComponents = (count % 2 === 0 ? 2 :
                       (count % 3 === 0 ? 3 : null));
      pointOffset = noOfComponents;
    }

    if (noOfComponents !== 2 && noOfComponents !== 3) {
      throw "Transform points require points in 2D or 3D";
    }

    if (inplace) {
      outPos = inPos;
    } else {
      outPos = [];
      outPos.length = inPos.length;
    }

    for (i = 0; i < count; i += pointOffset) {
      if (noOfComponents === 2) {
        projPoint = new proj4.Point(inPos[i], inPos[i + 1], 0.0);
      } else {
        projPoint = new proj4.Point(inPos[i], inPos[i + 1], inPos[i + 2]);
      }

      proj4.transform(projSrcGcs, projDestGcs, projPoint);

      if (noOfComponents === 2) {
        outPos[i] =  projPoint.x;
        outPos[i + 1] = projPoint.y;
      } else {
        outPos[i] = projPoint.x;
        outPos[i + 1] = projPoint.y;
        outPos[i + 2] = projPoint.z;
      }
    }

    if (inplace) {
      feature.positions(outPos);
      feature.gcs(destGcs);
    }

    return outPos;
  }

  return null;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Transform geometric data of a layer from source projection to destination
 * projection.
 */
//////////////////////////////////////////////////////////////////////////////
geo.transform.transformLayer = function (destGcs, layer, baseLayer) {
  "use strict";

  var features, count, i;

  if (!layer) {
    throw "Requires valid layer for tranformation";
  }

  if (!baseLayer) {
    throw "Requires baseLayer used by the map";
  }

  if (layer === baseLayer) {
    return;
  }

  if (layer instanceof geo.featureLayer) {
    features = layer.features();
    count = features.length;
    i = 0;

    for (i = 0; i < count; i += 1) {
      if (destGcs === "EPSG:3857" && baseLayer instanceof geo.osmLayer) {
        geo.transform.osmTransformFeature(
          destGcs, features[i], true);
      } else {
        geo.transform.transformFeature(
          destGcs, features[i], true);
      }
    }

    layer.gcs(destGcs);
  } else {
    throw "Only feature layer transformation is supported";
  }
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Transform position coordinates from source projection to destination
 * projection.
 *
 * @param {string} srcGcs GCS of the coordinates
 * @param {string} destGcs Desired GCS of the transformed coordinates
 * @param {object} coordinates
 * @return {geo.latlng|geo.latlng[]} Transformed coordinates
 */
//////////////////////////////////////////////////////////////////////////////
geo.transform.transformCoordinates = function (srcGcs, destGcs, coordinates,
                                               numberOfComponents) {
  "use strict";

  var i, count, offset, xCoord, yCoord, zCoord, xAcc,
      yAcc, zAcc, writer, output, projPoint,
      projSrcGcs = new proj4.Proj(srcGcs),
      projDestGcs = new proj4.Proj(destGcs);

  /// Default Z accessor
  zAcc = function () {
    return 0.0;
  };

  if (destGcs === srcGcs) {
    return coordinates;
  }

  /// TODO: Can we check for EPSG code?
  if (!destGcs || !srcGcs) {
    throw "Invalid source or destination GCS";
  }

  /// Helper methods
  function handleLatLngCoordinates() {
    if (coordinates[0] && coordinates[0] instanceof geo.latlng) {
      xAcc = function (index) {
        return coordinates[index].x();
      };
      yAcc = function (index) {
        return coordinates[index].y();
      };
      writer = function (index, x, y) {
        output[index] = geo.latlng(y, x);
      };
    } else {
      xAcc = function () {
        return coordinates.x();
      };
      yAcc = function () {
        return coordinates.y();
      };
      writer = function (index, x, y) {
        output = geo.latlng(y, x);
      };
    }
  }

  /// Helper methods
  function handleArrayCoordinates() {
    if (coordinates[0] instanceof Array) {
      if (coordinates[0].length === 2) {
        xAcc = function (index) {
          return coordinates[index][0];
        };
        yAcc = function (index) {
          return coordinates[index][1];
        };
        writer = function (index, x, y) {
          output[index] = [x, y];
        };
      } else if (coordinates[0].length === 3) {
        xAcc = function (index) {
          return coordinates[index][0];
        };
        yAcc = function (index) {
          return coordinates[index][1];
        };
        zAcc = function (index) {
          return coordinates[index][2];
        };
        writer = function (index, x, y, z) {
          output[index] = [x, y, z];
        };
      } else {
        throw "Invalid coordinates. Requires two or three components per array";
      }
    } else {
      if (coordinates.length === 2) {
        offset = 2;

        xAcc = function (index) {
          return coordinates[index * offset];
        };
        yAcc = function (index) {
          return coordinates[index * offset + 1];
        };
        writer = function (index, x, y) {
          output[index] = x;
          output[index + 1] = y;
        };
      } else if (coordinates.length === 3) {
        offset = 3;

        xAcc = function (index) {
          return coordinates[index * offset];
        };
        yAcc = function (index) {
          return coordinates[index * offset + 1];
        };
        zAcc = function (index) {
          return coordinates[index * offset + 2];
        };
        writer = function (index, x, y, z) {
          output[index] = x;
          output[index + 1] = y;
          output[index + 2] = z;
        };
      } else if (numberOfComponents) {
        if (numberOfComponents === 2 || numberOfComponents || 3) {
          offset = numberOfComponents;

          xAcc = function (index) {
            return coordinates[index];
          };
          yAcc = function (index) {
            return coordinates[index + 1];
          };
          if (numberOfComponents === 2) {
            writer = function (index, x, y) {
              output[index] = x;
              output[index + 1] = y;
            };
          } else {
            zAcc = function (index) {
              return coordinates[index + 2];
            };
            writer = function (index, x, y, z) {
              output[index] = x;
              output[index + 1] = y;
              output[index + 2] = z;
            };
          }
        } else {
          throw "Number of components should be two or three";
        }
      } else {
        throw "Invalid coordinates";
      }
    }
  }

  /// Helper methods
  function handleObjectCoordinates() {
    if (coordinates[0] &&
        "x" in coordinates[0] &&
        "y" in coordinates[0]) {
      xAcc = function (index) {
        return coordinates[index].x;
      };
      yAcc = function (index) {
        return coordinates[index].y;
      };

      if ("z" in coordinates[0]) {
        zAcc = function (index) {
          return coordinates[index].z;
        };
        writer = function (index, x, y, z) {
          output[i] = {x: x, y: y, z: z};
        };
      } else {
        writer = function (index, x, y) {
          output[index] = {x: x, y: y};
        };
      }
    } else if (coordinates &&
        "x" in coordinates && "y" in coordinates) {
      xAcc = function () {
        return coordinates.x;
      };
      yAcc = function () {
        return coordinates.y;
      };

      if ("z" in coordinates) {
        zAcc = function () {
          return coordinates.z;
        };
        writer = function (index, x, y, z) {
          output = {x: x, y: y, z: z};
        };
      } else {
        writer = function (index, x, y) {
          output = {x: x, y: y};
        };
      }
    } else {
      throw "Invalid coordinates";
    }
  }

  if (coordinates instanceof Array) {
    output = [];
    output.length = coordinates.length;
    count = coordinates.length;

    if (coordinates[0] instanceof Array ||
        coordinates[0] instanceof geo.latlng ||
        coordinates[0] instanceof Object) {
      offset = 1;

      if (coordinates[0] instanceof Array) {
        handleArrayCoordinates();
      } else if (coordinates[0] instanceof geo.latlng) {
        handleLatLngCoordinates();
      } else if (coordinates[0] instanceof Object) {
        handleObjectCoordinates();
      }
    } else {
      handleArrayCoordinates();
    }
  } else if (coordinates && coordinates instanceof Object) {
    count = 1;
    offset = 1;
    if (coordinates instanceof geo.latlng) {
      handleLatLngCoordinates();
    } else if (coordinates && "x" in coordinates && "y" in coordinates) {
      handleObjectCoordinates();
    } else {
      throw "Coordinates are not valid";
    }
  }

  if (destGcs === "EPSG:3857" && srcGcs === "EPSG:4326") {
    for (i = 0; i < count; i += offset) {
      /// Y goes from 0 (top edge is 85.0511 °N) to 2zoom − 1
      /// (bottom edge is 85.0511 °S) in a Mercator projection.
      xCoord = xAcc(i);
      yCoord = yAcc(i);
      zCoord = zAcc(i);

      if (yCoord > 85.0511) {
        yCoord = 85.0511;
      }
      if (yCoord < -85.0511) {
        yCoord = -85.0511;
      }

      writer(i, xCoord, geo.mercator.lat2y(yCoord), zCoord);
    }

    return output;
  } else {
    for (i = 0; i < count; i += offset) {
      projPoint = new proj4.Point(xAcc(i), yAcc(i), zAcc(i));
      proj4.transform(projSrcGcs, projDestGcs, projPoint);
      writer(i, projPoint.x, projPoint.y, projPoint.z);
      return output;
    }
  }
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class renderer
 *
 * @class
 * @extends geo.object
 * @returns {geo.renderer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.renderer = function (arg) {
  "use strict";

  if (!(this instanceof geo.renderer)) {
    return new geo.renderer(arg);
  }
  geo.object.call(this);

  arg = arg || {};
  var m_this = this,
      m_layer = arg.layer === undefined ? null : arg.layer,
      m_canvas = arg.canvas === undefined ? null : arg.canvas,
      m_initialized = false;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get layer of the renderer
   *
   * @returns {*}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.layer = function () {
    return m_layer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get canvas for the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.canvas = function (val) {
    if (val === undefined) {
      return m_canvas;
    } else {
      m_canvas = val;
      m_this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get map that this renderer belongs to
   */
  ////////////////////////////////////////////////////////////////////////////
  this.map = function () {
    if (m_layer) {
      return m_layer.map();
    } else {
      return null;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get base layer that belongs to this renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.baseLayer = function () {
    if (m_this.map()) {
      return m_this.map().baseLayer();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set if renderer has been initialized
   */
  ////////////////////////////////////////////////////////////////////////////
  this.initialized = function (val) {
    if (val === undefined) {
      return m_initialized;
    } else {
      m_initialized = val;
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get render API used by the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.api = function () {
    throw "Should be implemented by derivied classes";
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Reset to default
   */
  ////////////////////////////////////////////////////////////////////////////
  this.reset = function () {
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert array of points from world to GCS coordinate space
   */
  ////////////////////////////////////////////////////////////////////////////
  this.worldToGcs = function () {
    throw "Should be implemented by derivied classes";
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert array of points from display to GCS space
   */
  ////////////////////////////////////////////////////////////////////////////
  this.displayToGcs = function () {
    throw "Should be implemented by derivied classes";
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert array of points from display to GCS space
   */
  ////////////////////////////////////////////////////////////////////////////
  this.gcsToDisplay = function () {
    throw "Should be implemented by derivied classes";
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert array of points from world to display space
   */
  ////////////////////////////////////////////////////////////////////////////
  this.worldToDisplay = function () {
    throw "Should be implemented by derivied classes";
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert array of points from display to world space
   */
  ////////////////////////////////////////////////////////////////////////////
  this.displayToWorld = function () {
    throw "Should be implemented by derivied classes";
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get mouse coodinates related to canvas
   *
   * @param {object} event
   * @returns {object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.relMouseCoords = function (event) {
    var totalOffsetX = 0,
        totalOffsetY = 0,
        canvasX = 0,
        canvasY = 0,
        currentElement = m_this.canvas();

    do {
      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
      totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      currentElement = currentElement.offsetParent;
    } while (currentElement);

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {
      x: canvasX,
      y: canvasY
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle resize event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._resize = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render
   */
  ////////////////////////////////////////////////////////////////////////////
  this._render = function () {
  };

  return this;
};

inherit(geo.renderer, geo.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of osmLayer
 *
 * @class
 * @extends geo.featureLayer
 *
 * @param {Object} arg - arg can contain following keys: baseUrl,
 *        imageFormat (such as png or jpeg), and displayLast
 *        (to decide whether or not render tiles from last zoom level).
 */
//////////////////////////////////////////////////////////////////////////////
geo.osmLayer = function (arg) {
  "use strict";

  if (!(this instanceof geo.osmLayer)) {
    return new geo.osmLayer(arg);
  }
  geo.featureLayer.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private member variables
   *
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
    s_exit = this._exit,
    m_tiles = {},
    m_hiddenBinNumber = -1,
    m_lastVisibleBinNumber = -1,
    m_visibleBinNumber = 1000,
    m_pendingNewTiles = [],
    m_pendingInactiveTiles = [],
    m_numberOfCachedTiles = 0,
    m_tileCacheSize = 100,
    m_baseUrl = "http://tile.openstreetmap.org/",
    m_mapOpacity = 1.0,
    m_imageFormat = "png",
    m_updateTimerId = null,
    m_lastVisibleZoom = null,
    m_visibleTilesRange = {},
    s_init = this._init,
    m_pendingNewTilesStat = {},
    s_update = this._update,
    m_updateDefer = null,
    m_zoom = null,
    m_tileUrl,
    m_tileUrlFromTemplate;

  if (arg && arg.baseUrl !== undefined) {
    m_baseUrl = arg.baseUrl;
  }

  if (m_baseUrl.charAt(m_baseUrl.length - 1) !== "/") {
    m_baseUrl += "/";
  }

  if (arg && arg.mapOpacity !== undefined) {
    m_mapOpacity = arg.mapOpacity;
  }
  if (arg && arg.imageFormat !== undefined) {
    m_imageFormat = arg.imageFormat;
  }

  if (arg && arg.displayLast !== undefined && arg.displayLast) {
    m_lastVisibleBinNumber = 999;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns a url string containing the requested tile.  This default
   * version uses the open street map standard, but the user can
   * change the default behavior.
   *
   * @param {integer} zoom The zoom level
   * @param {integer} x The tile from the xth row
   * @param {integer} y The tile from the yth column
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  m_tileUrl = function (zoom, x, y) {
    return m_baseUrl + zoom + "/" + x +
      "/" + y + "." + m_imageFormat;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns an OSM tile server formatting function from a standard format
   * string: replaces <zoom>, <x>, and <y>.
   *
   * @param {string} base The tile format string
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  m_tileUrlFromTemplate = function (base) {
    return function (zoom, x, y) {
      return base.replace("<zoom>", zoom)
        .replace("<x>", x)
        .replace("<y>", y);
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Check if a tile is visible in current view
   *
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function isTileVisible(tile) {
    if (tile.zoom in m_visibleTilesRange) {
      if (tile.index_x >= m_visibleTilesRange[tile.zoom].startX &&
          tile.index_x <= m_visibleTilesRange[tile.zoom].endX &&
          tile.index_y >= m_visibleTilesRange[tile.zoom].startY &&
          tile.index_y <= m_visibleTilesRange[tile.zoom].endY) {
        return true;
      }
    }
    return false;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Draw new tiles and remove the old ones
   *
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function drawTiles() {
    m_this._removeTiles();
    m_this.draw();
    delete m_pendingNewTilesStat[m_updateTimerId];
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set tile cache size
   */
  ////////////////////////////////////////////////////////////////////////////
  this.tileCacheSize = function (val) {
    if (val === undefined) {
      return m_tileCacheSize;
    }
    m_tileCacheSize = val;
    m_this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set the tile url formatting function.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.tileUrl = function (val) {
    if (val === undefined) {
      return m_tileUrl;
    } else if (typeof val === "string") {
      m_tileUrl = m_tileUrlFromTemplate(val);
    } else {
      m_tileUrl = val;
    }
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform a point or array of points in latitude-longitude-altitude
   * space to local space of the layer
   *
   * @param {*} input
   * Input can be of following types:
   *
   *   1. geo.latlng
   *   2. [geo.latlng]
   *   3. [x1,y1, x2, y2]
   *   4. [[x,y]]
   *   5. {x:val: y:val, z:val},
   *   6. [{x:val: y:val}]
   *
   * returns geo.latlng, [geo.latlng], or {x:lon, y:lat}, [{x:lon, y:lat}]
   * [x1,y1, x2, y2], [[x,y]]
   */
  ////////////////////////////////////////////////////////////////////////////
  this.toLocal = function (input) {
    var i, output, delta;

    /// Now handle different data types
    if (input instanceof Array && input.length > 0) {
      output = [];
      output.length = input.length;

      /// Input is array of geo.latlng
      if (input[0] instanceof geo.latlng) {
        for (i = 0; i < input.length; i += 1) {
          output[i] = geo.latlng(input[i]);
          output[i].lat(geo.mercator.lat2y(output[i].lat()));
        }
      } else if (input[0] instanceof Array) {
        delta = input % 3 === 0 ? 3 : 2;

        if (delta === 2) {
          for (i = 0; i < input.length; i += delta) {
            output[i] = input[i];
            output[i + 1] = geo.mercator.lat2y(input[i + 1]);
          }
        } else {
          for (i = 0; i < input.length; i += delta) {
            output[i] = input[i];
            output[i + 1] = geo.mercator.lat2y(input[i + 1]);
            output[i + 2] = input[i + 2];
          }
        }
      } else if (input[0] instanceof Object &&
                 "x" in input[0] && "y" in input[0] && "z" in input[0]) {
        /// Input is array of object
        output[i] = { x: input[i].x, y: geo.mercator.lat2y(input[i].y),
                      z: input[i].z };
      } else if (input[0] instanceof Object &&
                 "x" in input[0] && "y" in input[0] && "z" in input[0]) {
        /// Input is array of object
        output[i] = { x: input[i].x, y: geo.mercator.lat2y(input[i].y)};
      } else if (input.length >= 2) {
        output = input.slice(0);
        output[1] = geo.mercator.lat2y(input[1]);
      }
    } else if (input instanceof geo.latlng) {
      output = {};
      output.x = input.x();
      output.y = geo.mercator.lat2y(input.y());
    } else {
      output = {};
      output.x = input.x;
      output.y = geo.mercator.lat2y(input.y);
    }

    return output;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform a point or array of points in local space to
   * latitude-longitude space
   *
   * @input Input An object, array, of array of objects/array representing 2D
   * point in space. [x,y], [[x,y]], [{x:val: y:val}], {x:val, y:val}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.fromLocal = function (input) {
    var i, output;

    if (input instanceof Array && input.length > 0) {
      output = [];
      output.length = input.length;

      if (input[0] instanceof Object) {
        for (i = 0; i < input.length; i += 1) {
          output[i] = {};
          output[i].x = input[i].x;
          output[i].y = geo.mercator.y2lat(input[i].y);
        }
      } else if (input[0] instanceof Array) {
        for (i = 0; i < input.length; i += 1) {
          output[i] = input[i];
          output[i][1] = geo.mercator.y2lat(input[i][1]);
        }
      } else {
        for (i = 0; i < input.length; i += 1) {
          output[i] = input[i];
          output[i + 1] = geo.mercator.y2lat(input[i + 1]);
        }
      }
    } else {
      output = {};
      output.x = input.x;
      output.y = geo.mercator.y2lat(input.y);
    }

    return output;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Check if a tile exists in the cache
   *
   * @param {number} zoom The zoom value for the map [1-17]
   * @param {number} x X axis tile index
   * @param {number} y Y axis tile index
   */
  ////////////////////////////////////////////////////////////////////////////
  this._hasTile = function (zoom, x, y) {
    if (!m_tiles[zoom]) {
      return false;
    }
    if (!m_tiles[zoom][x]) {
      return false;
    }
    if (!m_tiles[zoom][x][y]) {
      return false;
    }
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create a new tile
   * @param {number} x X axis tile index
   * @param {number} y Y axis tile index
   */
  ////////////////////////////////////////////////////////////////////////////
  this._addTile = function (request, zoom, x, y) {
    if (!m_tiles[zoom]) {
      m_tiles[zoom] = {};
    }
    if (!m_tiles[zoom][x]) {
      m_tiles[zoom][x] = {};
    }
    if (m_tiles[zoom][x][y]) {
      return;
    }

    /// Compute corner points
    var noOfTilesX = Math.max(1, Math.pow(2, zoom)),
        noOfTilesY = Math.max(1, Math.pow(2, zoom)),
        /// Convert into mercator
        totalLatDegrees = 360.0,
        lonPerTile = 360.0 / noOfTilesX,
        latPerTile = totalLatDegrees / noOfTilesY,
        llx = -180.0 + x * lonPerTile,
        lly = -totalLatDegrees * 0.5 + y * latPerTile,
        urx = -180.0 + (x + 1) * lonPerTile,
        ury = -totalLatDegrees * 0.5 + (y + 1) * latPerTile,
        tile = new Image();

    tile.LOADING = true;
    tile.LOADED = false;
    tile.REMOVED = false;
    tile.REMOVING = false;
    tile.INVALID = false;

    tile.crossOrigin = "anonymous";
    tile.zoom = zoom;
    tile.index_x = x;
    tile.index_y = y;
    tile.llx = llx;
    tile.lly = lly;
    tile.urx = urx;
    tile.ury = ury;
    tile.lastused = new Date();

    tile.src = m_tileUrl(zoom, x, Math.pow(2, zoom) - 1 - y);

    m_tiles[zoom][x][y] = tile;
    m_pendingNewTiles.push(tile);
    m_numberOfCachedTiles += 1;
    return tile;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Clear tiles that are no longer required
   */
  ////////////////////////////////////////////////////////////////////////////
  /* jshint -W089 */
  this._removeTiles = function () {
    var i, x, y, tile, zoom, currZoom = m_zoom,
        lastZoom = m_lastVisibleZoom;

    if (!m_tiles) {
      return m_this;
    }

    for (zoom in m_tiles) {
      for (x in m_tiles[zoom]) {
        for (y in m_tiles[zoom][x]) {
          tile = m_tiles[zoom][x][y];
          if (tile) {
            tile.REMOVING = true;
            m_pendingInactiveTiles.push(tile);
          }
        }
      }
    }

    /// First remove the tiles if we have cached more than max cached limit
    m_pendingInactiveTiles.sort(function (a, b) {
      return a.lastused - b.lastused;
    });

    i = 0;

    /// Get rid of tiles if we have reached our threshold. However,
    /// If the tile is required for current zoom, then do nothing.
    /// Also do not delete the tile if it is from the previous zoom
    while (m_numberOfCachedTiles > m_tileCacheSize &&
      i < m_pendingInactiveTiles.length) {
      tile = m_pendingInactiveTiles[i];

      if (isTileVisible(tile)) {
        i += 1;
      } else {
        m_this.deleteFeature(tile.feature);
        delete m_tiles[tile.zoom][tile.index_x][tile.index_y];
        m_pendingInactiveTiles.splice(i, 1);
        m_numberOfCachedTiles -= 1;
      }
    }

    for (i = 0; i < m_pendingInactiveTiles.length; i += 1) {
      tile = m_pendingInactiveTiles[i];
      tile.REMOVING = false;
      tile.REMOVED = false;
      if (tile.zoom !== currZoom && tile.zoom === lastZoom) {
        tile.feature.bin(m_lastVisibleBinNumber);
      } else if (tile.zoom !== currZoom) {
        tile.feature.bin(m_hiddenBinNumber);
      } else {
        tile.lastused = new Date();
        tile.feature.bin(m_visibleBinNumber);
      }
      tile.feature._update();
    }
    m_pendingInactiveTiles = [];

    return m_this;
  };
  /* jshint +W089 */

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create / delete tiles as necessary
   */
  ////////////////////////////////////////////////////////////////////////////
  this._addTiles = function (request) {
    var feature, ren = m_this.renderer(),
        /// First get corner points
        /// In display coordinates the origin is on top left corner (0, 0)
        llx = 0.0, lly = m_this.height(), urx = m_this.width(), ury = 0.0,
        temp = null, tile = null, tile1x = null, tile1y = null, tile2x = null,
        tile2y = null, invJ = null, i = 0, j = 0, lastStartX, lastStartY,
        lastEndX, lastEndY, currStartX, currStartY, currEndX, currEndY,
        worldPt1 = ren.displayToWorld([llx, lly]),
        worldPt2 = ren.displayToWorld([urx, ury]),
        worldDeltaY = null, displayDeltaY = null,
        worldDelta = null, displayDelta = null,
        noOfTilesRequired = null, worldDeltaPerTile = null,
        minDistWorldDeltaPerTile = null, distWorldDeltaPerTile;

    worldPt1[0] = Math.max(worldPt1[0], -180.0);
    worldPt1[0] = Math.min(worldPt1[0], 180.0);
    worldPt1[1] = Math.max(worldPt1[1], -180.0);
    worldPt1[1] = Math.min(worldPt1[1], 180.0);

    worldPt2[0] = Math.max(worldPt2[0], -180.0);
    worldPt2[0] = Math.min(worldPt2[0], 180.0);
    worldPt2[1] = Math.max(worldPt2[1], -180.0);
    worldPt2[1] = Math.min(worldPt2[1], 180.0);

    /// Compute tile zoom
    worldDelta = Math.abs(worldPt2[0] - worldPt1[0]);
    worldDeltaY = Math.abs(worldPt2[1] - worldPt1[1]);

    displayDelta = urx - llx;
    displayDeltaY = lly - ury;

    /// Reuse variables
    if (displayDeltaY > displayDelta) {
      displayDelta = displayDeltaY;
      worldDelta = worldDeltaY;
    }

    noOfTilesRequired = Math.round(displayDelta / 256.0);
    worldDeltaPerTile = worldDelta / noOfTilesRequired;

    /// Minimize per pixel distortion
    minDistWorldDeltaPerTile = Number.POSITIVE_INFINITY;
    for (i = 20; i >= 2; i = i - 1) {
      distWorldDeltaPerTile = Math.abs(360.0 / Math.pow(2, i) - worldDeltaPerTile);
      if (distWorldDeltaPerTile < minDistWorldDeltaPerTile) {
        minDistWorldDeltaPerTile = distWorldDeltaPerTile;
        m_zoom = i;
      }
    }

    /// Compute tilex and tiley
    tile1x = geo.mercator.long2tilex(worldPt1[0], m_zoom);
    tile1y = geo.mercator.lat2tiley(worldPt1[1], m_zoom);

    tile2x = geo.mercator.long2tilex(worldPt2[0], m_zoom);
    tile2y = geo.mercator.lat2tiley(worldPt2[1], m_zoom);

    /// Clamp tilex and tiley
    tile1x = Math.max(tile1x, 0);
    tile1x = Math.min(Math.pow(2, m_zoom) - 1, tile1x);
    tile1y = Math.max(tile1y, 0);
    tile1y = Math.min(Math.pow(2, m_zoom) - 1, tile1y);

    tile2x = Math.max(tile2x, 0);
    tile2x = Math.min(Math.pow(2, m_zoom) - 1, tile2x);
    tile2y = Math.max(tile2y, 0);
    tile2y = Math.min(Math.pow(2, m_zoom) - 1, tile2y);

    /// Check and update variables appropriately if view
    /// direction is flipped. This should not happen but
    /// just in case.
    if (tile1x > tile2x) {
      temp = tile1x;
      tile1x = tile2x;
      tile2x = temp;
    }
    if (tile2y > tile1y) {
      temp = tile1y;
      tile1y = tile2y;
      tile2y = temp;
    }

    /// Compute current tile indices
    currStartX = tile1x;
    currEndX = tile2x;
    currStartY = (Math.pow(2, m_zoom) - 1 - tile1y);
    currEndY = (Math.pow(2, m_zoom) - 1 - tile2y);
    if (currEndY < currStartY) {
      temp = currStartY;
      currStartY = currEndY;
      currEndY = temp;
    }

    /// Compute last tile indices
    lastStartX = geo.mercator.long2tilex(worldPt1[0],
                   m_lastVisibleZoom);
    lastStartY = geo.mercator.lat2tiley(worldPt1[1],
                   m_lastVisibleZoom);
    lastEndX = geo.mercator.long2tilex(worldPt2[0],
                   m_lastVisibleZoom);
    lastEndY = geo.mercator.lat2tiley(worldPt2[1],
                   m_lastVisibleZoom);
    lastStartY = Math.pow(2, m_lastVisibleZoom) - 1 - lastStartY;
    lastEndY   = Math.pow(2, m_lastVisibleZoom) - 1 - lastEndY;

    if (lastEndY < lastStartY) {
      temp = lastStartY;
      lastStartY = lastEndY;
      lastEndY = temp;
    }

    m_visibleTilesRange = {};
    m_visibleTilesRange[m_zoom] = { startX: currStartX, endX: currEndX,
                                    startY: currStartY, endY: currEndY };

    m_visibleTilesRange[m_lastVisibleZoom] =
                                { startX: lastStartX, endX: lastEndX,
                                  startY: lastStartY, endY: lastEndY };
    m_pendingNewTilesStat[m_updateTimerId] = { total:
      ((tile2x - tile1x + 1) * (tile1y - tile2y + 1)), count: 0 };

    for (i = tile1x; i <= tile2x; i += 1) {
      for (j = tile2y; j <= tile1y; j += 1) {
        invJ = (Math.pow(2, m_zoom) - 1 - j);
        if (!m_this._hasTile(m_zoom, i, invJ)) {
          tile = m_this._addTile(request, m_zoom, i, invJ);
        } else {
          tile = m_tiles[m_zoom][i][invJ];
          tile.feature.bin(m_visibleBinNumber);
          if (tile.LOADED && m_updateTimerId in m_pendingNewTilesStat) {
            m_pendingNewTilesStat[m_updateTimerId].count += 1;
          }
          tile.lastused = new Date();
          tile.feature._update();
        }
        tile.updateTimerId = m_updateTimerId;
      }
    }

    // define a function here to set tile properties after it is loaded
    function tileOnLoad(tile) {
      var defer = $.Deferred();
      m_this.addDeferred(defer);

      return function () {
        if (tile.INVALID) {
          return;
        }
        tile.LOADING = false;
        tile.LOADED = true;
        if ((tile.REMOVING || tile.REMOVED) &&
          tile.feature &&
          tile.zoom !== m_zoom) {
          tile.feature.bin(m_hiddenBinNumber);
          tile.REMOVING = false;
          tile.REMOVED = true;
        } else {
          tile.REMOVED = false;
          tile.lastused = new Date();
          tile.feature.bin(m_visibleBinNumber);
        }

        if (tile.updateTimerId === m_updateTimerId &&
            m_updateTimerId in m_pendingNewTilesStat) {
          tile.feature.bin(m_visibleBinNumber);
          m_pendingNewTilesStat[m_updateTimerId].count += 1;
        } else {
          tile.REMOVED = true;
          tile.feature.bin(m_hiddenBinNumber);
        }
        tile.feature._update();

        if (m_updateTimerId in m_pendingNewTilesStat &&
            m_pendingNewTilesStat[m_updateTimerId].count >=
            m_pendingNewTilesStat[m_updateTimerId].total) {
          drawTiles();
        }
        defer.resolve();
      };
    }

    /// And now finally add them
    for (i = 0; i < m_pendingNewTiles.length; i += 1) {
      tile = m_pendingNewTiles[i];
      feature = m_this.createFeature(
        "plane", {drawOnAsyncResourceLoad: false, onload: tileOnLoad(tile)})
        .origin([tile.llx, tile.lly])
        .upperLeft([tile.llx, tile.ury])
        .lowerRight([tile.urx, tile.lly])
        .gcs("EPSG:3857")
        .style({image: tile, opacity: m_mapOpacity});
      tile.feature = feature;
      tile.feature._update();
    }
    m_pendingNewTiles = [];

    if (m_updateTimerId in m_pendingNewTilesStat &&
        m_pendingNewTilesStat[m_updateTimerId].count >=
        m_pendingNewTilesStat[m_updateTimerId].total) {
      drawTiles();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update OSM tiles as needed
   */
  ////////////////////////////////////////////////////////////////////////////
  function updateOSMTiles(request) {
    if (request === undefined) {
      request = {};
    }

    if (!m_zoom) {
      m_zoom = m_this.map().zoom();
    }

    if (!m_lastVisibleZoom) {
      m_lastVisibleZoom = m_zoom;
    }

    /// Add tiles that are currently visible
    m_this._addTiles(request);

    /// Update the zoom
    if (m_lastVisibleZoom !== m_zoom) {
      m_lastVisibleZoom = m_zoom;
    }

    m_this.updateTime().modified();
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create / delete tiles as necessary
   */
  ////////////////////////////////////////////////////////////////////////////
  this._updateTiles = function (request) {
    var defer = $.Deferred();
    m_this.addDeferred(defer);

    if (m_updateTimerId !== null) {
      clearTimeout(m_updateTimerId);
      m_updateDefer.resolve();
      m_updateDefer = defer;
      if (m_updateTimerId in m_pendingNewTilesStat) {
        delete m_pendingNewTilesStat[m_updateTimerId];
      }
      /// Set timeout for 60 ms. 60 ms seems to playing well
      /// with the events. Also, 60ms corresponds to 15 FPS.
      m_updateTimerId = setTimeout(function () {
        updateOSMTiles(request);
        m_updateDefer.resolve();
      }, 100);
    } else {
      m_updateDefer = defer;
      m_updateTimerId = setTimeout(function () {
        updateOSMTiles(request);
        m_updateDefer.resolve();
      }, 0);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   *
   * Do not call parent _init method as its already been executed
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    s_init.call(m_this);
    m_this.gcs("EPSG:3857");
    m_this.map().zoomRange({
      min: 0,
      max: 18
    });
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function (request) {
    /// Update tiles (create new / delete old etc...)
    m_this._updateTiles(request);

    /// Now call base class update
    s_update.call(m_this, request);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update baseUrl for map tiles.  Map all tiles as needing to be refreshed.
   * If no argument is given the tiles will be forced refreshed.
   *
   * @param baseUrl: the new baseUrl for the map.
   */
  ////////////////////////////////////////////////////////////////////////////
  /* jshint -W089 */
  this.updateBaseUrl = function (baseUrl) {
    if (baseUrl && baseUrl.charAt(m_baseUrl.length - 1) !== "/") {
      baseUrl += "/";
    }
    if (baseUrl !== m_baseUrl) {

      if (baseUrl !== undefined) {
        m_baseUrl = baseUrl;
      }

      var tile, x, y, zoom;
      for (zoom in m_tiles) {
        for (x in m_tiles[zoom]) {
          for (y in m_tiles[zoom][x]) {
            tile = m_tiles[zoom][x][y];
            tile.INVALID = true;
            m_this.deleteFeature(tile.feature);
          }
        }
      }
      m_tiles = {};
      m_pendingNewTiles = [];
      m_pendingInactiveTiles = [];
      m_numberOfCachedTiles = 0;
      m_visibleTilesRange = {};
      m_pendingNewTilesStat = {};

      if (m_updateTimerId !== null) {
        clearTimeout(m_updateTimerId);
        m_updateTimerId = null;
      }
      this._update();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set map opacity
   *
   * @returns {geo.osmLayer}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.mapOpacity = function (val) {
    if (val === undefined) {
      return m_mapOpacity;
    } else if (val !== m_mapOpacity) {
      m_mapOpacity = val;
      var zoom, x, y, tile;
      for (zoom in m_tiles) {
        for (x in m_tiles[zoom]) {
          for (y in m_tiles[zoom][x]) {
            tile = m_tiles[zoom][x][y];
            tile.feature.style().opacity = val;
            tile.feature._update();
          }
        }
      }
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Exit
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_tiles = {};
    m_pendingNewTiles = [];
    m_pendingInactiveTiles = [];
    m_numberOfCachedTiles = 0;
    m_visibleTilesRange = {};
    m_pendingNewTilesStat = {};
    s_exit();
  };

  if (arg && arg.tileUrl !== undefined) {
    this.tileUrl(arg.tileUrl);
  }


  return this;
};

inherit(geo.osmLayer, geo.featureLayer);

geo.registerLayer("osm", geo.osmLayer);

/**
 * @namespace
 */
geo.gl = {};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class vglRenderer
 *
 * @class
 * @extends geo.renderer
 * @param canvas
 * @returns {geo.gl.renderer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.renderer = function (arg) {
  'use strict';

  if (!(this instanceof geo.gl.renderer)) {
    return new geo.gl.renderer(arg);
  }
  geo.renderer.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get context specific renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.contextRenderer = function () {
    throw 'Should be implemented by derived classes';
  };

  return this;
};

inherit(geo.gl.renderer, geo.renderer);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of lineFeature
 *
 * @class
 * @extends geo.lineFeature
 * @returns {geo.gl.lineFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.lineFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.gl.lineFeature)) {
    return new geo.gl.lineFeature(arg);
  }
  arg = arg || {};
  geo.lineFeature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      m_actor = null,
      m_mapper = null,
      m_material = null,
      m_pixelWidthUnif = null,
      m_aspectUniform = null,
      m_dynamicDraw = arg.dynamicDraw === undefined ? false : arg.dynamicDraw,
      s_init = this._init,
      s_update = this._update;

  function createVertexShader() {
    var vertexShaderSource = [
      '#ifdef GL_ES',
      '  precision highp float;',
      '#endif',
      'attribute vec3 pos;',
      'attribute vec3 prev;',
      'attribute vec3 next;',
      'attribute float offset;',

      'attribute vec3 strokeColor;',
      'attribute float strokeOpacity;',
      'attribute float strokeWidth;',

      'uniform mat4 modelViewMatrix;',
      'uniform mat4 projectionMatrix;',
      'uniform float pixelWidth;',
      'uniform float aspect;',

      'varying vec3 strokeColorVar;',
      'varying float strokeWidthVar;',
      'varying float strokeOpacityVar;',

      'void main(void)',
      '{',
      /* If any vertex has been deliberately set to a negative opacity,
       * skip doing computations on it. */
      '  if (strokeOpacity < 0.0) {',
      '    gl_Position = vec4(2, 2, 0, 1);',
      '    return;',
      '  }',
      '  const float PI = 3.14159265358979323846264;',
      '  vec4 worldPos = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1);',
      '  if (worldPos.w != 0.0) {',
      '    worldPos = worldPos/worldPos.w;',
      '  }',
      '  vec4 worldNext = projectionMatrix * modelViewMatrix * vec4(next.xyz, 1);',
      '  if (worldNext.w != 0.0) {',
      '    worldNext = worldNext/worldNext.w;',
      '  }',
      '  vec4 worldPrev = projectionMatrix* modelViewMatrix * vec4(prev.xyz, 1);',
      '  if (worldPrev.w != 0.0) {',
      '    worldPrev = worldPrev/worldPrev.w;',
      '  }',
      '  strokeColorVar = strokeColor;',
      '  strokeWidthVar = strokeWidth;',
      '  strokeOpacityVar = strokeOpacity;',
      '  vec2 deltaNext = worldNext.xy - worldPos.xy;',
      '  vec2 deltaPrev = worldPos.xy - worldPrev.xy;',
      '  float angleNext = 0.0, anglePrev = 0.0;',
      '  if (deltaNext.xy != vec2(0.0, 0.0))',
      '    angleNext = atan(deltaNext.y / aspect, deltaNext.x);',
      '  if (deltaPrev.xy == vec2(0.0, 0.0)) anglePrev = angleNext;',
      '  else  anglePrev = atan(deltaPrev.y / aspect, deltaPrev.x);',
      '  if (deltaNext.xy == vec2(0.0, 0.0)) angleNext = anglePrev;',
      '  float angle = (anglePrev + angleNext) / 2.0;',
      '  float cosAngle = cos(anglePrev - angle);',
      '  if (cosAngle < 0.1) { cosAngle = sign(cosAngle) * 1.0; angle = 0.0; }',
      '  float distance = (offset * strokeWidth * pixelWidth) /',
      '                    cosAngle;',
      '  worldPos.x += distance * sin(angle);',
      '  worldPos.y -= distance * cos(angle) * aspect;',
      '  gl_Position = worldPos;',
      '}'
    ].join('\n'),
    shader = new vgl.shader(gl.VERTEX_SHADER);
    shader.setShaderSource(vertexShaderSource);
    return shader;
  }

  function createFragmentShader() {
    var fragmentShaderSource = [
      '#ifdef GL_ES',
      '  precision highp float;',
      '#endif',
      'varying vec3 strokeColorVar;',
      'varying float strokeWidthVar;',
      'varying float strokeOpacityVar;',
      'void main () {',
      '  gl_FragColor = vec4 (strokeColorVar, strokeOpacityVar);',
      '}'
    ].join('\n'),
    shader = new vgl.shader(gl.FRAGMENT_SHADER);
    shader.setShaderSource(fragmentShaderSource);
    return shader;
  }

  function createGLLines() {
    var data = m_this.data(),
        i, j, k, v,
        numSegments = 0, len,
        lineItem, lineItemData,
        vert = [{}, {}], vertTemp,
        pos, posIdx3,
        position = [],
        posFunc = m_this.position(),
        strkWidthFunc = m_this.style.get('strokeWidth'),
        strkColorFunc = m_this.style.get('strokeColor'),
        strkOpacityFunc = m_this.style.get('strokeOpacity'),
        order = m_this.featureVertices(),
        posBuf, nextBuf, prevBuf, offsetBuf, indicesBuf,
        strokeWidthBuf, strokeColorBuf, strokeOpacityBuf,
        dest, dest3,
        geom = m_mapper.geometryData();

    for (i = 0; i < data.length; i += 1) {
      lineItem = m_this.line()(data[i], i);
      numSegments += lineItem.length - 1;
      for (j = 0; j < lineItem.length; j += 1) {
        pos = posFunc(lineItem[j], j, lineItem, i);
        if (pos instanceof geo.latlng) {
          position.push(pos.x());
          position.push(pos.y());
          position.push(0.0);
        } else {
          position.push(pos.x);
          position.push(pos.y);
          position.push(pos.z || 0.0);
        }
      }
    }

    position = geo.transform.transformCoordinates(
                 m_this.gcs(), m_this.layer().map().gcs(),
                 position, 3);

    len = numSegments * order.length;
    posBuf           = getBuffer(geom, 'pos', len * 3);
    nextBuf          = getBuffer(geom, 'next', len * 3);
    prevBuf          = getBuffer(geom, 'prev', len * 3);
    offsetBuf        = getBuffer(geom, 'offset', len * 1);
    strokeWidthBuf   = getBuffer(geom, 'strokeWidth', len * 1);
    strokeColorBuf   = getBuffer(geom, 'strokeColor', len * 3);
    strokeOpacityBuf = getBuffer(geom, 'strokeOpacity', len * 1);
    indicesBuf = geom.primitive(0).indices();
    if (!(indicesBuf instanceof Uint16Array) || indicesBuf.length !== len) {
      indicesBuf = new Uint16Array(len);
      geom.primitive(0).setIndices(indicesBuf);
    }

    for (i = posIdx3 = dest = dest3 = 0; i < data.length; i += 1) {
      lineItem = m_this.line()(data[i], i);
      for (j = 0; j < lineItem.length; j += 1, posIdx3 += 3) {
        lineItemData = lineItem[j];
        /* swap entries in vert so that vert[0] is the first vertex, and
         * vert[1] will be reused for the second vertex */
        if (j) {
          vertTemp = vert[0];
          vert[0] = vert[1];
          vert[1] = vertTemp;
        }
        vert[1].pos = posIdx3;
        vert[1].prev = posIdx3 - (j ? 3 : 0);
        vert[1].next = posIdx3 + (j + 1 < lineItem.length ? 3 : 0);
        vert[1].strokeWidth = strkWidthFunc(lineItemData, j, lineItem, i);
        vert[1].strokeColor = strkColorFunc(lineItemData, j, lineItem, i);
        vert[1].strokeOpacity = strkOpacityFunc(lineItemData, j, lineItem, i);
        if (j) {
          for (k = 0; k < order.length; k += 1, dest += 1, dest3 += 3) {
            v = vert[order[k][0]];
            posBuf[dest3]     = position[v.pos];
            posBuf[dest3 + 1] = position[v.pos + 1];
            posBuf[dest3 + 2] = position[v.pos + 2];
            prevBuf[dest3]     = position[v.prev];
            prevBuf[dest3 + 1] = position[v.prev + 1];
            prevBuf[dest3 + 2] = position[v.prev + 2];
            nextBuf[dest3]     = position[v.next];
            nextBuf[dest3 + 1] = position[v.next + 1];
            nextBuf[dest3 + 2] = position[v.next + 2];
            offsetBuf[dest] = order[k][1];
            /* We can ignore the indicies (they will all be zero) */
            strokeWidthBuf[dest] = v.strokeWidth;
            strokeColorBuf[dest3]     = v.strokeColor.r;
            strokeColorBuf[dest3 + 1] = v.strokeColor.g;
            strokeColorBuf[dest3 + 2] = v.strokeColor.b;
            strokeOpacityBuf[dest] = v.strokeOpacity;
          }
        }
      }
    }

    geom.boundsDirty(true);
    m_mapper.modified();
    m_mapper.boundsDirtyTimestamp().modified();
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get a buffer for a geometry source.  If a buffer already exists and is
   * the correct size, return it.  Otherwise, allocate a new buffer; any data
   * in an old buffer is discarded.
   *
   * @param geom: the geometry to reference and modify.
   * @param srcName: the name of the source.
   * @param len: the number of elements for the array.
   * @returns {Float32Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  function getBuffer(geom, srcName, len) {
    var src = geom.sourceByName(srcName), data;

    data = src.data();
    if (data instanceof Float32Array && data.length === len) {
      return data;
    }
    data = new Float32Array(len);
    src.setData(data);
    return data;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the arrangement of vertices used for each line segment.
   *
   * @returns {Number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.featureVertices = function () {
    return [[0, 1], [1, -1], [0, -1], [0, 1], [1, 1], [1, -1]];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the number of vertices used for each line segment.
   *
   * @returns {Number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.verticesPerFeature = function () {
    return this.featureVertices().length;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    var prog = vgl.shaderProgram(),
        vs = createVertexShader(),
        fs = createFragmentShader(),
        // Vertex attributes
        posAttr = vgl.vertexAttribute('pos'),
        prvAttr = vgl.vertexAttribute('prev'),
        nxtAttr = vgl.vertexAttribute('next'),
        offAttr = vgl.vertexAttribute('offset'),
        strkWidthAttr = vgl.vertexAttribute('strokeWidth'),
        strkColorAttr = vgl.vertexAttribute('strokeColor'),
        strkOpacityAttr = vgl.vertexAttribute('strokeOpacity'),
        // Shader uniforms
        mviUnif = new vgl.modelViewUniform('modelViewMatrix'),
        prjUnif = new vgl.projectionUniform('projectionMatrix'),
        geom = vgl.geometryData(),
        // Sources
        posData = vgl.sourceDataP3fv({'name': 'pos'}),
        prvPosData = vgl.sourceDataAnyfv(
            3, vgl.vertexAttributeKeysIndexed.Four, {'name': 'prev'}),
        nxtPosData = vgl.sourceDataAnyfv(
            3, vgl.vertexAttributeKeysIndexed.Five, {'name': 'next'}),
        offPosData = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Six, {'name': 'offset'}),
        strkWidthData = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.One, {'name': 'strokeWidth'}),
        strkColorData = vgl.sourceDataAnyfv(
            3, vgl.vertexAttributeKeysIndexed.Two, {'name': 'strokeColor'}),
        strkOpacityData = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Three,
            {'name': 'strokeOpacity'}),
        // Primitive indices
        triangles = vgl.triangles();

    m_pixelWidthUnif =  new vgl.floatUniform('pixelWidth',
                          1.0 / m_this.renderer().width());
    m_aspectUniform = new vgl.floatUniform('aspect',
        m_this.renderer().width() / m_this.renderer().height());

    s_init.call(m_this, arg);
    m_material = vgl.material();
    m_mapper = vgl.mapper({dynamicDraw: m_dynamicDraw});

    prog.addVertexAttribute(posAttr, vgl.vertexAttributeKeys.Position);
    prog.addVertexAttribute(strkWidthAttr, vgl.vertexAttributeKeysIndexed.One);
    prog.addVertexAttribute(strkColorAttr, vgl.vertexAttributeKeysIndexed.Two);
    prog.addVertexAttribute(strkOpacityAttr, vgl.vertexAttributeKeysIndexed.Three);
    prog.addVertexAttribute(prvAttr, vgl.vertexAttributeKeysIndexed.Four);
    prog.addVertexAttribute(nxtAttr, vgl.vertexAttributeKeysIndexed.Five);
    prog.addVertexAttribute(offAttr, vgl.vertexAttributeKeysIndexed.Six);

    prog.addUniform(mviUnif);
    prog.addUniform(prjUnif);
    prog.addUniform(m_pixelWidthUnif);
    prog.addUniform(m_aspectUniform);

    prog.addShader(fs);
    prog.addShader(vs);

    m_material.addAttribute(prog);
    m_material.addAttribute(vgl.blend());

    m_actor = vgl.actor();
    m_actor.setMaterial(m_material);
    m_actor.setMapper(m_mapper);

    geom.addSource(posData);
    geom.addSource(prvPosData);
    geom.addSource(nxtPosData);
    geom.addSource(strkWidthData);
    geom.addSource(strkColorData);
    geom.addSource(strkOpacityData);
    geom.addSource(offPosData);
    geom.addPrimitive(triangles);
    m_mapper.setGeometryData(geom);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return list of actors
   *
   * @returns {vgl.actor[]}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.actors = function () {
    if (!m_actor) {
      return [];
    }
    return [m_actor];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    if (m_actor) {
      m_this.renderer().contextRenderer().removeActor(m_actor);
    }

    createGLLines();

    m_this.renderer().contextRenderer().addActor(m_actor);
    m_this.buildTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.dataTime().getMTime() >= m_this.buildTime().getMTime() ||
        m_this.updateTime().getMTime() <= m_this.getMTime()) {
      m_this._build();
    }

    m_pixelWidthUnif.set(1.0 / m_this.renderer().width());
    m_aspectUniform.set(m_this.renderer().width() /
                        m_this.renderer().height());
    m_actor.setVisible(m_this.visible());
    m_actor.material().setBinNumber(m_this.bin());
    m_this.updateTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer().contextRenderer().removeActor(m_actor);
    s_exit();
  };

  this._init(arg);
  return this;
};

inherit(geo.gl.lineFeature, geo.lineFeature);

// Now register it
geo.registerFeature('vgl', 'line', geo.gl.lineFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of pointFeature
 *
 * @class
 * @extends geo.pointFeature
 * @returns {geo.gl.pointFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.pointFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.gl.pointFeature)) {
    return new geo.gl.pointFeature(arg);
  }
  arg = arg || {};
  geo.pointFeature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      m_actor = null,
      m_mapper = null,
      m_pixelWidthUniform = null,
      m_aspectUniform = null,
      m_dynamicDraw = arg.dynamicDraw === undefined ? false : arg.dynamicDraw,
      m_primitiveShape = "sprite", // arg can change this, below
      s_init = this._init,
      s_update = this._update,
      vertexShaderSource = null,
      fragmentShaderSource = null;

  if (arg.primitiveShape === "triangle" ||
      arg.primitiveShape === "square" ||
      arg.primitiveShape === "sprite") {
    m_primitiveShape = arg.primitiveShape;
  }

  vertexShaderSource = [
    "#ifdef GL_ES",
    "  precision highp float;",
    "#endif",
    "attribute vec3 pos;",
    "attribute float rad;",
    "attribute vec3 fillColor;",
    "attribute vec3 strokeColor;",
    "attribute float fillOpacity;",
    "attribute float strokeWidth;",
    "attribute float strokeOpacity;",
    "attribute float fill;",
    "attribute float stroke;",
    "uniform float pixelWidth;",
    "uniform float aspect;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "varying vec4 fillColorVar;",
    "varying vec4 strokeColorVar;",
    "varying float radiusVar;",
    "varying float strokeWidthVar;",
    "varying float fillVar;",
    "varying float strokeVar;"
  ];

  if (m_primitiveShape !== "sprite") {
    vertexShaderSource = vertexShaderSource.concat([
      "attribute vec2 unit;",
      "varying vec3 unitVar;"
    ]);
  }

  vertexShaderSource.push.apply(vertexShaderSource, [
    "void main(void)",
    "{",
    "  strokeWidthVar = strokeWidth;",
    "  // No stroke or fill implies nothing to draw",
    "  if (stroke < 1.0 || strokeWidth <= 0.0 || strokeOpacity <= 0.0) {",
    "    strokeVar = 0.0;",
    "    strokeWidthVar = 0.0;",
    "  }",
    "  else",
    "    strokeVar = 1.0;",
    "  if (fill < 1.0 || rad <= 0.0 || fillOpacity <= 0.0)",
    "    fillVar = 0.0;",
    "  else",
    "    fillVar = 1.0;",
    /* If the point has no visible pixels, skip doing computations on it. */
    "  if (fillVar == 0.0 && strokeVar == 0.0) {",
    "    gl_Position = vec4(2, 2, 0, 1);",
    "    return;",
    "  }",
    "  fillColorVar = vec4 (fillColor, fillOpacity);",
    "  strokeColorVar = vec4 (strokeColor, strokeOpacity);",
    "  radiusVar = rad;"
  ]);

  if (m_primitiveShape === "sprite") {
    vertexShaderSource.push.apply(vertexShaderSource, [
      "  gl_Position = (projectionMatrix * modelViewMatrix * vec4(pos, 1.0)).xyzw;",
      "  gl_PointSize = 2.0 * (rad + strokeWidthVar); ",
      "}"
    ]);
  } else {
    vertexShaderSource.push.apply(vertexShaderSource, [
        "  unitVar = vec3 (unit, 1.0);",
        "  vec4 p = (projectionMatrix * modelViewMatrix * vec4(pos, 1.0)).xyzw;",
        "  if (p.w != 0.0) {",
        "    p = p / p.w;",
        "  }",
        "  p += (rad + strokeWidthVar) * ",
        "       vec4 (unit.x * pixelWidth, unit.y * pixelWidth * aspect, 0.0, 1.0);",
        "  gl_Position = vec4(p.xyz, 1.0);",
        "}"
      ]);
  }
  vertexShaderSource = vertexShaderSource.join("\n");

  fragmentShaderSource = [
    "#ifdef GL_ES",
    "  precision highp float;",
    "#endif",
    "uniform float aspect;",
    "varying vec4 fillColorVar;",
    "varying vec4 strokeColorVar;",
    "varying float radiusVar;",
    "varying float strokeWidthVar;",
    "varying float fillVar;",
    "varying float strokeVar;"
  ];

  if (m_primitiveShape !== "sprite") {
    fragmentShaderSource.push("varying vec3 unitVar;");
  }

  fragmentShaderSource.push.apply(fragmentShaderSource, [
    "void main () {",
    "  vec4 strokeColor, fillColor;",
    "  float endStep;",
    "  // No stroke or fill implies nothing to draw",
    "  if (fillVar == 0.0 && strokeVar == 0.0)",
    "    discard;"
  ]);

  if (m_primitiveShape === "sprite") {
    fragmentShaderSource.push(
      "  float rad = 2.0 * length (gl_PointCoord - vec2(0.5));");
  } else {
    fragmentShaderSource.push(
      "  float rad = length (unitVar.xy);");
  }

  fragmentShaderSource.push.apply(fragmentShaderSource, [
    "  if (rad > 1.0)",
    "    discard;",
    "  // If there is no stroke, the fill region should transition to nothing",
    "  if (strokeVar == 0.0) {",
    "    strokeColor = vec4 (fillColorVar.rgb, 0.0);",
    "    endStep = 1.0;",
    "  } else {",
    "    strokeColor = strokeColorVar;",
    "    endStep = radiusVar / (radiusVar + strokeWidthVar);",
    "  }",
    "  // Likewise, if there is no fill, the stroke should transition to nothing",
    "  if (fillVar == 0.0)",
    "    fillColor = vec4 (strokeColor.rgb, 0.0);",
    "  else",
    "    fillColor = fillColorVar;",
    "  // Distance to antialias over",
    "  float antialiasDist = 3.0 / (2.0 * radiusVar);",
    "  if (rad < endStep) {",
    "    float step = smoothstep (endStep - antialiasDist, endStep, rad);",
    "    gl_FragColor = mix (fillColor, strokeColor, step);",
    "  } else {",
    "    float step = smoothstep (1.0 - antialiasDist, 1.0, rad);",
    "    gl_FragColor = mix (strokeColor, vec4 (strokeColor.rgb, 0.0), step);",
    "  }",
    "}"
  ]);

  fragmentShaderSource = fragmentShaderSource.join("\n");

  function createVertexShader() {
    var shader = new vgl.shader(gl.VERTEX_SHADER);
    shader.setShaderSource(vertexShaderSource);
    return shader;
  }

  function createFragmentShader() {
    var shader = new vgl.shader(gl.FRAGMENT_SHADER);
    shader.setShaderSource(fragmentShaderSource);
    return shader;
  }

  function pointPolygon(x, y, w, h) {
    var verts;
    switch (m_primitiveShape) {
      case "triangle":
        /* Use an equilateral triangle.  While this has 30% more area than a
         * square, the reduction in vertices should help more than the
         * processing the additional fragments. */
        verts = [
          x, y - h * 2,
          x - w * Math.sqrt(3.0), y + h,
          x + w * Math.sqrt(3.0), y + h
        ];
        break;
      case "sprite":
        /* Point sprite uses only one vertex per point. */
        verts = [x, y];
        break;
      default: // "square"
        /* Use a surrounding square split diagonally into two triangles. */
        verts = [
          x - w, y + h,
          x - w, y - h,
          x + w, y + h,
          x - w, y - h,
          x + w, y - h,
          x + w, y + h
        ];
        break;
    }
    return verts;
  }

  function createGLPoints() {
    // unit and associated data is not used when drawing sprite
    var i, j, numPts = m_this.data().length,
        unit = pointPolygon(0, 0, 1, 1),
        position = new Array(numPts * 3), posBuf, posVal, posFunc,
        unitBuf, indices,
        radius, radiusVal, radFunc,
        stroke, strokeVal, strokeFunc,
        strokeWidth, strokeWidthVal, strokeWidthFunc,
        strokeOpacity, strokeOpacityVal, strokeOpactityFunc,
        strokeColor, strokeColorVal, strokeColorFunc,
        fill, fillVal, fillFunc,
        fillOpacity, fillOpacityVal, fillOpacityFunc,
        fillColor, fillColorVal, fillColorFunc,
        vpf = m_this.verticesPerFeature(),
        data = m_this.data(),
        item, ivpf, ivpf3, iunit, i3,
        geom = m_mapper.geometryData();

    posFunc = m_this.position();
    radFunc = m_this.style.get("radius");
    strokeFunc = m_this.style.get("stroke");
    strokeWidthFunc = m_this.style.get("strokeWidth");
    strokeOpactityFunc = m_this.style.get("strokeOpacity");
    strokeColorFunc = m_this.style.get("strokeColor");
    fillFunc = m_this.style.get("fill");
    fillOpacityFunc = m_this.style.get("fillOpacity");
    fillColorFunc = m_this.style.get("fillColor");

    /* It is more efficient to do a transform on a single array rather than on
     * an array of arrays or an array of objects. */
    for (i = i3 = 0; i < numPts; i += 1, i3 += 3) {
      posVal = posFunc(data[i]);
      position[i3]     = posVal.x;
      position[i3 + 1] = posVal.y;
      position[i3 + 2] = posVal.z || 0;
    }
    position = geo.transform.transformCoordinates(
                  m_this.gcs(), m_this.layer().map().gcs(),
                  position, 3);

    posBuf        = getBuffer(geom, "pos", vpf * numPts * 3);

    if (m_primitiveShape !== "sprite") {
      unitBuf       = getBuffer(geom, "unit", vpf * numPts * 2);
    }

    radius        = getBuffer(geom, "rad", vpf * numPts * 1);
    stroke        = getBuffer(geom, "stroke", vpf * numPts * 1);
    strokeWidth   = getBuffer(geom, "strokeWidth", vpf * numPts * 1);
    strokeOpacity = getBuffer(geom, "strokeOpacity", vpf * numPts * 1);
    strokeColor   = getBuffer(geom, "strokeColor", vpf * numPts * 3);
    fill          = getBuffer(geom, "fill", vpf * numPts * 1);
    fillOpacity   = getBuffer(geom, "fillOpacity", vpf * numPts * 1);
    fillColor     = getBuffer(geom, "fillColor", vpf * numPts * 3);
    indices = geom.primitive(0).indices();
    if (!(indices instanceof Uint16Array) || indices.length !== vpf * numPts) {
      indices = new Uint16Array(vpf * numPts);
      geom.primitive(0).setIndices(indices);
    }

    for (i = ivpf = ivpf3 = iunit = i3 = 0; i < numPts; i += 1, i3 += 3) {
      item = data[i];
      if (m_primitiveShape !== "sprite") {
        for (j = 0; j < unit.length; j += 1, iunit += 1) {
          unitBuf[iunit] = unit[j];
        }
      }
      /* We can ignore the indicies (they will all be zero) */
      radiusVal = radFunc(item);
      strokeVal = strokeFunc(item) ? 1.0 : 0.0;
      strokeWidthVal = strokeWidthFunc(item);
      strokeOpacityVal = strokeOpactityFunc(item);
      strokeColorVal = strokeColorFunc(item);
      fillVal = fillFunc(item) ? 1.0 : 0.0;
      fillOpacityVal = fillOpacityFunc(item);
      fillColorVal = fillColorFunc(item);
      for (j = 0; j < vpf; j += 1, ivpf += 1, ivpf3 += 3) {
        posBuf[ivpf3]     = position[i3];
        posBuf[ivpf3 + 1] = position[i3 + 1];
        posBuf[ivpf3 + 2] = position[i3 + 2];
        radius[ivpf] = radiusVal;
        stroke[ivpf] = strokeVal;
        strokeWidth[ivpf] = strokeWidthVal;
        strokeOpacity[ivpf] = strokeOpacityVal;
        strokeColor[ivpf3]     = strokeColorVal.r;
        strokeColor[ivpf3 + 1] = strokeColorVal.g;
        strokeColor[ivpf3 + 2] = strokeColorVal.b;
        fill[ivpf] = fillVal;
        fillOpacity[ivpf] = fillOpacityVal;
        fillColor[ivpf3]     = fillColorVal.r;
        fillColor[ivpf3 + 1] = fillColorVal.g;
        fillColor[ivpf3 + 2] = fillColorVal.b;
      }
    }

    geom.boundsDirty(true);
    m_mapper.modified();
    m_mapper.boundsDirtyTimestamp().modified();
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get a buffer for a geometry source.  If a buffer already exists and is
   * the correct size, return it.  Otherwise, allocate a new buffer; any data
   * in an old buffer is discarded.
   *
   * @param geom: the geometry to reference and modify.
   * @param srcName: the name of the source.
   * @param len: the number of elements for the array.
   * @returns {Float32Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  function getBuffer(geom, srcName, len) {
    var src = geom.sourceByName(srcName), data;

    data = src.data();
    if (data instanceof Float32Array && data.length === len) {
      return data;
    }
    data = new Float32Array(len);
    src.setData(data);
    return data;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return list of actors
   *
   * @returns {vgl.actor[]}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.actors = function () {
    if (!m_actor) {
      return [];
    }
    return [m_actor];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the number of vertices used for each point.
   *
   * @returns {Number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.verticesPerFeature = function () {
    var unit = pointPolygon(0, 0, 1, 1);
    return unit.length / 2;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    var prog = vgl.shaderProgram(),
        vertexShader = createVertexShader(),
        fragmentShader = createFragmentShader(),
        posAttr = vgl.vertexAttribute("pos"),
        unitAttr = vgl.vertexAttribute("unit"),
        radAttr = vgl.vertexAttribute("rad"),
        strokeWidthAttr = vgl.vertexAttribute("strokeWidth"),
        fillColorAttr = vgl.vertexAttribute("fillColor"),
        fillAttr = vgl.vertexAttribute("fill"),
        strokeColorAttr = vgl.vertexAttribute("strokeColor"),
        strokeAttr = vgl.vertexAttribute("stroke"),
        fillOpacityAttr = vgl.vertexAttribute("fillOpacity"),
        strokeOpacityAttr = vgl.vertexAttribute("strokeOpacity"),
        modelViewUniform = new vgl.modelViewUniform("modelViewMatrix"),
        projectionUniform = new vgl.projectionUniform("projectionMatrix"),
        mat = vgl.material(),
        blend = vgl.blend(),
        geom = vgl.geometryData(),
        sourcePositions = vgl.sourceDataP3fv({"name": "pos"}),
        sourceUnits = vgl.sourceDataAnyfv(
            2, vgl.vertexAttributeKeysIndexed.One, {"name": "unit"}),
        sourceRadius = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Two, {"name": "rad"}),
        sourceStrokeWidth = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Three, {"name": "strokeWidth"}),
        sourceFillColor = vgl.sourceDataAnyfv(
            3, vgl.vertexAttributeKeysIndexed.Four, {"name": "fillColor"}),
        sourceFill = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Five, {"name": "fill"}),
        sourceStrokeColor = vgl.sourceDataAnyfv(
            3, vgl.vertexAttributeKeysIndexed.Six, {"name": "strokeColor"}),
        sourceStroke = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Seven, {"name": "stroke"}),
        sourceAlpha = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Eight, {"name": "fillOpacity"}),
        sourceStrokeOpacity = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Nine, {"name": "strokeOpacity"}),
        primitive = new vgl.triangles();

    if (m_primitiveShape === "sprite") {
      primitive = new vgl.points();
    }

    m_pixelWidthUniform = new vgl.floatUniform("pixelWidth",
                            2.0 / m_this.renderer().width());
    m_aspectUniform = new vgl.floatUniform("aspect",
                        m_this.renderer().width() / m_this.renderer().height());

    s_init.call(m_this, arg);
    m_mapper = vgl.mapper({dynamicDraw: m_dynamicDraw});

    // TODO: Right now this is ugly but we will fix it.
    prog.addVertexAttribute(posAttr, vgl.vertexAttributeKeys.Position);
    if (m_primitiveShape !== "sprite") {
      prog.addVertexAttribute(unitAttr, vgl.vertexAttributeKeysIndexed.One);
    }

    prog.addVertexAttribute(radAttr, vgl.vertexAttributeKeysIndexed.Two);
    prog.addVertexAttribute(strokeWidthAttr, vgl.vertexAttributeKeysIndexed.Three);
    prog.addVertexAttribute(fillColorAttr, vgl.vertexAttributeKeysIndexed.Four);
    prog.addVertexAttribute(fillAttr, vgl.vertexAttributeKeysIndexed.Five);
    prog.addVertexAttribute(strokeColorAttr, vgl.vertexAttributeKeysIndexed.Six);
    prog.addVertexAttribute(strokeAttr, vgl.vertexAttributeKeysIndexed.Seven);
    prog.addVertexAttribute(fillOpacityAttr, vgl.vertexAttributeKeysIndexed.Eight);
    prog.addVertexAttribute(strokeOpacityAttr, vgl.vertexAttributeKeysIndexed.Nine);

    prog.addUniform(m_pixelWidthUniform);
    prog.addUniform(m_aspectUniform);
    prog.addUniform(modelViewUniform);
    prog.addUniform(projectionUniform);

    prog.addShader(fragmentShader);
    prog.addShader(vertexShader);

    mat.addAttribute(prog);
    mat.addAttribute(blend);

    m_actor = vgl.actor();
    m_actor.setMaterial(mat);
    m_actor.setMapper(m_mapper);

    geom.addSource(sourcePositions);
    geom.addSource(sourceUnits);
    geom.addSource(sourceRadius);
    geom.addSource(sourceStrokeWidth);
    geom.addSource(sourceFillColor);
    geom.addSource(sourceFill);
    geom.addSource(sourceStrokeColor);
    geom.addSource(sourceStroke);
    geom.addSource(sourceAlpha);
    geom.addSource(sourceStrokeOpacity);
    geom.addPrimitive(primitive);
    m_mapper.setGeometryData(geom);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {

    if (m_actor) {
      m_this.renderer().contextRenderer().removeActor(m_actor);
    }

    createGLPoints();

    m_this.renderer().contextRenderer().addActor(m_actor);
    m_this.renderer().contextRenderer().render();
    m_this.buildTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {

    s_update.call(m_this);

    // For now build if the data or style changes. In the future we may
    // we able to partially update the data using dynamic gl buffers.
    if (m_this.dataTime().getMTime() >= m_this.buildTime().getMTime() ||
        m_this.updateTime().getMTime() < m_this.getMTime()) {
      m_this._build();
    }

    // Update uniforms
    m_pixelWidthUniform.set(2.0 / m_this.renderer().width());
    m_aspectUniform.set(m_this.renderer().width() /
                        m_this.renderer().height());

    m_actor.setVisible(m_this.visible());
    m_actor.material().setBinNumber(m_this.bin());

    m_this.updateTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer().contextRenderer().removeActor(m_actor);
    s_exit();
  };

  m_this._init();
  return this;
};

inherit(geo.gl.pointFeature, geo.pointFeature);

// Now register it
geo.registerFeature("vgl", "point", geo.gl.pointFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of geomFeature
 *
 * @class
 * @extends geo.geomFeature
 * @param {vgl.geometryData} arg
 * @returns {geo.gl.geomFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.geomFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.gl.geomFeature)) {
    return new geo.gl.geomFeature(arg);
  }
  arg = arg || {};
  geo.geomFeature.call(this, arg);

  // Initialize
  var m_this = this,
      m_geom = arg.geom || null,
      m_actor = vgl.actor(),
      m_mapper = vgl.mapper(),
      m_material = null,
      m_scalar = null,
      m_color = arg.color || [1.0, 1.0, 1.0],
      m_buildTime = null,
      m_noOfPrimitives = 0;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var style = m_this.style();

    // Vertex color gets the preference
    if (m_geom !== null) {
      m_scalar = m_geom.sourceData(vgl.vertexAttributeKeys.Scalar);
      m_color = m_geom.sourceData(vgl.vertexAttributeKeys.Color);
      m_mapper.setGeometryData(m_geom);
    }

    this.setMapper(m_mapper);

    if (style.point_sprites !== undefined && style.point_sprites &&
        style.point_sprites_image !== undefined &&
        style.point_sprites_image !== null &&
        m_noOfPrimitives === 1 &&
        m_geom.primitive(0).primitiveType() === gl.POINTS) {
      m_material = vgl.utils.createPointSpritesMaterial(
                     style.point_sprites_image);
    } else if (m_scalar) {
      if (m_color instanceof vgl.lookupTable) {
        m_color.updateRange(m_scalar.scalarRange());
        m_material = vgl.utils.createColorMappedMaterial(m_color);
      } else {
        m_color = vgl.lookupTable();
        m_color.updateRange(m_scalar.scalarRange());
        m_material = vgl.utils.createColorMappedMaterial(m_color);
      }
    } else if (m_color) {
      m_material = vgl.utils.createColorMaterial();
    } else {
      m_material = vgl.utils.createSolidColorMaterial();
    }
    m_actor.setMaterial(m_material);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @private
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    if (m_buildTime &&
        m_buildTime.getMTime() < m_this.getMTime()) {
      if (m_color instanceof vgl.lookupTable) {
        vgl.utils.updateColorMappedMaterial(m_this.material(),
          m_this.style.color);
      }/* else {
        // TODO
      }*/
    } else {
      m_buildTime = vgl.timestamp();
      m_buildTime.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set geometry
   *
   * @returns {geo.gl.geomFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.geometry = function (val) {
    if (val === undefined) {
      return m_geom;
    } else {
      m_geom = val;
      m_this.modified();
      return m_this;
    }
  };

  return this;
};

inherit(geo.gl.geomFeature, geo.geomFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a plane feature given a lower left corner point geo.latlng
 * and and upper right corner point geo.latlng
 * @class
 * @extends geo.planeFeature
 * @param lowerleft
 * @param upperright
 * @returns {geo.planeFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.planeFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.gl.planeFeature)) {
    return new geo.gl.planeFeature(arg);
  }
  geo.planeFeature.call(this, arg);

  var m_this = this,
      s_exit = this._exit,
      m_actor = null,
      m_onloadCallback = arg.onload === undefined ? null : arg.onload;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the coordinates for this plane
   *
   * @returns {Array} [[origin], [upper left] [lower right]]
   */
  ////////////////////////////////////////////////////////////////////////////
  this.coords = function () {
    return [m_this.origin(), m_this.upperLeft(), m_this.lowerRight()];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build this feature
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var or = m_this.origin(),
        ul = m_this.upperLeft(),
        lr = m_this.lowerRight(),
        /// img could be a source or an Image
        img = m_this.style().image,
        image = null,
        texture = null;

    /// TODO If for some reason base layer changes its gcs at run time
    /// then we need to trigger an event to rebuild every feature
    or = geo.transform.transformCoordinates(m_this.gcs(),
                                            m_this.layer().map().gcs(),
                                            or);
    ul = geo.transform.transformCoordinates(m_this.gcs(),
                                            m_this.layer().map().gcs(),
                                            ul);
    lr = geo.transform.transformCoordinates(m_this.gcs(),
                                            m_this.layer().map().gcs(),
                                            lr);

    m_this.buildTime().modified();

    if (m_actor) {
      m_this.renderer().contextRenderer().removeActor(m_actor);
    }

    if (img && img instanceof Image) {
      image = img;
    } else if (img) {
      image = new Image();
      image.src = img;
    }

    if (!image) {
      m_actor = vgl.utils.createPlane(or[0], or[1], or[2],
        ul[0], ul[1], ul[2],
        lr[0], lr[1], lr[2]);

      m_actor.material().shaderProgram().uniform("opacity").set(
        m_this.style().opacity !== undefined ? m_this.style().opacity : 1);

      m_this.renderer().contextRenderer().addActor(m_actor);

    } else {
      m_actor = vgl.utils.createTexturePlane(or[0], or[1], or[2],
        lr[0], lr[1], lr[2],
        ul[0], ul[1], ul[2], true);

      m_actor.material().shaderProgram().uniform("opacity").set(
        m_this.style().opacity !== undefined ? m_this.style().opacity : 1);

      texture = vgl.texture();
      m_this.visible(false);

      /// TODO: Is there a reliable way to make sure that image is loaded already?
      m_this.renderer().contextRenderer().addActor(m_actor);

      if (image.complete) {
        texture.setImage(image);
        m_actor.material().addAttribute(texture);
        /// NOTE Currently we assume that we want to show the feature as
        /// soon as the image gets loaded. However, there might be a case
        /// where we want to lock down the visibility. We will deal with that
        /// later.
        m_this.visible(true);

        if (m_onloadCallback) {
          m_onloadCallback.call(m_this);
        }
        //}
      } else {
        image.onload = function () {
          texture.setImage(image);
          m_actor.material().addAttribute(texture);
          /// NOTE Currently we assume that we want to show the feature as
          /// soon as the image gets loaded. However, there might be a case
          /// where we want to lock down the visibility. We will deal with that
          /// later.
          m_this.visible(true);

          if (m_onloadCallback) {
            m_onloadCallback.call(m_this);
          }

          if (m_this.drawOnAsyncResourceLoad()) {
            m_this._update();
            m_this.layer().draw();
          }
        };
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    if (m_this.buildTime().getMTime() <= m_this.dataTime().getMTime()) {
      m_this._build();
    }

    if (m_this.updateTime().getMTime() <= m_this.getMTime()) {
      m_actor.setVisible(m_this.visible());
      m_actor.material().setBinNumber(m_this.bin());
      m_actor.material().shaderProgram().uniform("opacity").set(
        m_this.style().opacity !== undefined ? m_this.style().opacity : 1);
    }

    m_this.updateTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer().contextRenderer().removeActor(m_actor);
    s_exit();
  };

  return this;
};

inherit(geo.gl.planeFeature, geo.planeFeature);

// Now register it
geo.registerFeature("vgl", "plane", geo.gl.planeFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of polygonFeature
 *
 * @class
 * @extends geo.polygonFeature
 * @returns {geo.gl.polygonFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.polygonFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.gl.polygonFeature)) {
    return new geo.gl.polygonFeature(arg);
  }
  arg = arg || {};
  geo.polygonFeature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      m_actor = vgl.actor(),
      m_mapper = vgl.mapper(),
      m_material = vgl.material(),
      s_init = this._init,
      s_update = this._update;

  function createVertexShader() {
    var vertexShaderSource = [
      'attribute vec3 pos;',
      'attribute vec3 fillColor;',
      'attribute float fillOpacity;',
      'uniform mat4 modelViewMatrix;',
      'uniform mat4 projectionMatrix;',
      'uniform float pixelWidth;',
      'varying vec3 fillColorVar;',
      'varying float fillOpacityVar;',

      'void main(void)',
      '{',
      '  vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1);',
      '  if (clipPos.w != 0.0) {',
      '    clipPos = clipPos/clipPos.w;',
      '  }',
      '  fillColorVar = fillColor;',
      '  fillOpacityVar = fillOpacity;',
      '  gl_Position = clipPos;',
      '}'
    ].join('\n'),
    shader = new vgl.shader(gl.VERTEX_SHADER);
    shader.setShaderSource(vertexShaderSource);
    return shader;
  }

  function createFragmentShader() {
    var fragmentShaderSource = [
      '#ifdef GL_ES',
      '  precision highp float;',
      '#endif',
      'varying vec3 fillColorVar;',
      'varying float fillOpacityVar;',
      'void main () {',
      '  gl_FragColor = vec4 (fillColorVar, fillOpacityVar);',
      '}'
    ].join('\n'),
    shader = new vgl.shader(gl.FRAGMENT_SHADER);
    shader.setShaderSource(fragmentShaderSource);
    return shader;
  }

  function createGLPolygons() {
    var i = null,
        numPts = null,
        start = null,
        itemIndex = 0,
        polygonItemCoordIndex = 0,
        position = [],
        fillColor = [],
        fillOpacity = [],
        fillColorNew = [],
        fillOpacityNew = [],
        posFunc = null,
        fillColorFunc = null,
        polygonItem = null,
        fillOpacityFunc = null,
        buffers = vgl.DataBuffers(1024),
        sourcePositions = vgl.sourceDataP3fv(),
        sourceFillColor =
          vgl.sourceDataAnyfv(3, vgl.vertexAttributeKeysIndexed.Two),
        sourceFillOpacity =
          vgl.sourceDataAnyfv(1, vgl.vertexAttributeKeysIndexed.Three),
        trianglePrimitive = vgl.triangles(),
        geom = vgl.geometryData(),
        polygon = null,
        holes = null,
        extRing = null,
        extIndex = 0,
        extLength = null,
        intIndex = 0,
        posInstance = null,
        triangulator = new PNLTRI.Triangulator(),
        triangList = null,
        newTriangList = null,
        fillColorInstance = null,
        currentIndex = null;

    posFunc = m_this.position();
    fillColorFunc = m_this.style.get('fillColor');
    fillOpacityFunc = m_this.style.get('fillOpacity');

    m_this.data().forEach(function (item) {
      polygon = m_this.polygon()(item, itemIndex);
      polygonItem = polygon.outer || [];
      holes = polygon.inner || [];
      polygonItemCoordIndex = 0;
      extRing = [];
      extIndex = 0;
      extLength = polygonItem.length - 1;
      extRing[0] = [];
      intIndex = 0;

      polygonItem.forEach(function (extRingCoords) {
        if (extIndex !== extLength) {
          //extRing = extRing.concat(extRingCoords);
          posInstance = posFunc(extRingCoords,
                                polygonItemCoordIndex,
                                item, itemIndex);
          if (posInstance instanceof geo.latlng) {
            extRing[0].push({
              x: posInstance.x(), y: posInstance.y(), i: fillColor.length
            });
          } else {
            extRing[0].push({
              x: posInstance.x, y: posInstance.y, i: fillColor.length
            });
          }

          fillColorInstance = fillColorFunc(extRingCoords,
                                            polygonItemCoordIndex,
                                            item, itemIndex);
          fillColor.push([fillColorInstance.r,
                          fillColorInstance.g,
                          fillColorInstance.b]);
          fillOpacity.push(fillOpacityFunc(extRingCoords,
                                           polygonItemCoordIndex,
                                           item,
                                           itemIndex));
          polygonItemCoordIndex += 1;
        }
        extIndex += 1;
      });

      polygonItemCoordIndex = 0;
      holes.forEach(function (hole) {
        extRing[intIndex + 1] = [];
        hole.forEach(function (intRingCoords) {
          posInstance = posFunc(intRingCoords, polygonItemCoordIndex,
                                item, itemIndex);
          if (posInstance instanceof geo.latlng) {
            extRing[intIndex + 1].push({
              x: posInstance.x(), y: posInstance.y(), i: fillColor.length
            });
          } else {
            extRing[intIndex + 1].push({
              x: posInstance.x, y: posInstance.y, i: fillColor.length
            });
          }
          fillColorInstance = fillColorFunc(intRingCoords,
                                            polygonItemCoordIndex,
                                            item, itemIndex);
          fillColor.push([fillColorInstance.r,
                          fillColorInstance.g,
                          fillColorInstance.b]);
          fillOpacity.push(fillOpacityFunc(intRingCoords,
                                           polygonItemCoordIndex,
                                           item, itemIndex));
          polygonItemCoordIndex += 1;
        });
        intIndex += 1;
      });

      //console.log("extRing ", extRing);
      //console.log("result", PolyK.Triangulate(extRing));
      triangList = triangulator.triangulate_polygon(extRing);
      newTriangList = [];

      triangList.forEach(function (newIndices) {
        Array.prototype.push.apply(newTriangList, newIndices);
      });

      for (i = 1; i < extRing.length; i += 1) {
        extRing[0] = extRing[0].concat(extRing[i]);
      }

      newTriangList.forEach(function (polygonIndex) {
        var polygonItemCoords = extRing[0][polygonIndex];
        position.push([polygonItemCoords.x,
                       polygonItemCoords.y,
                       polygonItemCoords.z || 0.0]);
        fillColorNew.push(fillColor[polygonItemCoords.i]);
        fillOpacityNew.push(fillOpacity[polygonItemCoords.i]);
      });

      itemIndex += 1;
    });

    position = geo.transform.transformCoordinates(
                 m_this.gcs(), m_this.layer().map().gcs(),
                 position, 3);

    buffers.create('pos', 3);
    buffers.create('indices', 1);
    buffers.create('fillColor', 3);
    buffers.create('fillOpacity', 1);

    numPts = position.length;

    start = buffers.alloc(numPts);
    currentIndex = start;

    //console.log("numPts ", numPts);
    for (i = 0; i < numPts; i += 1) {
      buffers.write('pos', position[i], start + i, 1);
      buffers.write('indices', [i], start + i, 1);
      buffers.write('fillColor', fillColorNew[i], start + i, 1);
      buffers.write('fillOpacity', [fillOpacityNew[i]], start + i, 1);
    }

    //console.log(buffers.get('fillColor'));
    sourcePositions.pushBack(buffers.get('pos'));
    geom.addSource(sourcePositions);

    sourceFillColor.pushBack(buffers.get('fillColor'));
    geom.addSource(sourceFillColor);

    sourceFillOpacity.pushBack(buffers.get('fillOpacity'));
    geom.addSource(sourceFillOpacity);

    //console.log(buffers.get('indices'));
    trianglePrimitive.setIndices(buffers.get('indices'));
    geom.addPrimitive(trianglePrimitive);

    m_mapper.setGeometryData(geom);
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    var blend = vgl.blend(),
        prog = vgl.shaderProgram(),
        posAttr = vgl.vertexAttribute('pos'),
        fillColorAttr = vgl.vertexAttribute('fillColor'),
        fillOpacityAttr = vgl.vertexAttribute('fillOpacity'),
        modelViewUniform = new vgl.modelViewUniform('modelViewMatrix'),
        projectionUniform = new vgl.projectionUniform('projectionMatrix'),
        vertexShader = createVertexShader(),
        fragmentShader = createFragmentShader();

    s_init.call(m_this, arg);

    prog.addVertexAttribute(posAttr, vgl.vertexAttributeKeys.Position);
    prog.addVertexAttribute(fillColorAttr, vgl.vertexAttributeKeysIndexed.Two);
    prog.addVertexAttribute(fillOpacityAttr, vgl.vertexAttributeKeysIndexed.Three);

    prog.addUniform(modelViewUniform);
    prog.addUniform(projectionUniform);

    prog.addShader(fragmentShader);
    prog.addShader(vertexShader);

    m_material.addAttribute(prog);
    m_material.addAttribute(blend);

    m_actor.setMapper(m_mapper);
    m_actor.setMaterial(m_material);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    if (m_actor) {
      m_this.renderer().contextRenderer().removeActor(m_actor);
    }

    createGLPolygons();

    m_this.renderer().contextRenderer().addActor(m_actor);
    m_this.buildTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.dataTime().getMTime() >= m_this.buildTime().getMTime() ||
        m_this.updateTime().getMTime() <= m_this.getMTime()) {
      m_this._build();
    }

    m_actor.setVisible(m_this.visible());
    m_actor.material().setBinNumber(m_this.bin());
    m_this.updateTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer().contextRenderer().removeActor(m_actor);
    s_exit();
  };

  this._init(arg);
  return this;
};

inherit(geo.gl.polygonFeature, geo.polygonFeature);

// Now register it
geo.registerFeature('vgl', 'polygon', geo.gl.polygonFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Single VGL viewer
 *
 * This singleton instance is used to share a single GL context across multiple
 * vlgRenderer and therefore layers.
 * @private
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl._vglViewerInstances = {
  viewers: [],
  maps: []
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Retrives the singleton, lazily constructs as necessary.
 *
 * @return {vgl.viewer} the single viewer instance.
 */
//////////////////////////////////////////////////////////////////////////////

geo.gl.vglViewerInstance = function (map) {
  "use strict";

  var mapIdx,
      maps = geo.gl._vglViewerInstances.maps,
      viewers = geo.gl._vglViewerInstances.viewers,
      canvas;

  function makeViewer() {
    canvas = $(document.createElement("canvas"));
    canvas.attr("class", "webgl-canvas");
    var viewer = vgl.viewer(canvas.get(0));
    viewer.renderWindow().removeRenderer(
    viewer.renderWindow().activeRenderer());
    viewer.init();
    return viewer;
  }

  for (mapIdx = 0; mapIdx < maps.length; mapIdx += 1) {
    if (map === maps[mapIdx]) {
      break;
    }
  }

  if (map !== maps[mapIdx]) {
    maps[mapIdx] = map;
    viewers[mapIdx] = makeViewer();
  }

  viewers[mapIdx]._exit = function () {
    if (canvas) {
      canvas.off();
      canvas.remove();
    }
  };

  return viewers[mapIdx];
};

geo.gl.vglViewerInstance.deleteCache = function (viewer) {
  "use strict";

  var mapIdx,
      maps = geo.gl._vglViewerInstances.maps,
      viewers = geo.gl._vglViewerInstances.viewers;

  for (mapIdx = 0; mapIdx < viewers.length; mapIdx += 1) {
    if (viewer === undefined || viewer === viewers[mapIdx]) {
      viewer._exit();
      maps.splice(mapIdx, 1);
      viewers.splice(mapIdx, 1);
    }
  }
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class vglRenderer
 *
 * @class
 * @extends geo.gl.renderer
 * @param canvas
 * @returns {geo.gl.vglRenderer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.vglRenderer = function (arg) {
  "use strict";

  if (!(this instanceof geo.gl.vglRenderer)) {
    return new geo.gl.vglRenderer(arg);
  }
  geo.gl.renderer.call(this, arg);

  var m_this = this,
      s_exit = this._exit,
      m_viewer = geo.gl.vglViewerInstance(this.layer().map()),
      m_contextRenderer = vgl.renderer(),
      m_width = 0,
      m_height = 0,
      s_init = this._init;

  m_contextRenderer.setResetScene(false);

  /// TODO: Move this API to the base class
  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return width of the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.width = function () {
    return m_width;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return height of the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.height = function () {
    return m_height;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert input data in display space to world space
   *
   * @param {object} input {x:val, y:val}, [{x:val, y:val}],
   * [{x:val, y:val}], [x1,y1], [[x,y]]
   *
   * @returns {object} {x:val, y:val, z:val, w:val}, [{x:val, y:val, z:val, w:val}],
              [[x, y, z, w]], [x1,y1,z1,w]
   */
  ////////////////////////////////////////////////////////////////////////////
  this.displayToWorld = function (input) {
    var i,
        delta,
        ren = m_this.contextRenderer(),
        cam = ren.camera(),
        fdp = ren.focusDisplayPoint(),
        output,
        temp,
        point;

    /// Handle if the input is an array [...]
    if (input instanceof Array && input.length > 0) {
      output = [];
    /// Input is array of object {x:val, y:val}
      if (input[0] instanceof Object) {
        delta = 1;
        for (i = 0; i < input.length; i += delta) {
          point = input[i];
          temp = ren.displayToWorld(vec4.fromValues(
                   point.x, point.y, fdp[2], 1.0),
                   cam.viewMatrix(), cam.projectionMatrix(),
                   m_width, m_height);
          output.push({x: temp[0], y: temp[1], z: temp[2], w: temp[3]});
        }
    /// Input is array of 2d array [[x,y], [x,y]]
      } else if (input[0] instanceof Array) {
        delta = 1;
        for (i = 0; i < input.length; i += delta) {
          point = input[i];
          temp = ren.displayToWorld(vec4.fromValues(
                   point[0], point[1], fdp[2], 1.0),
                   cam.viewMatrix(), cam.projectionMatrix(),
                   m_width, m_height);
          output.push(temp);
        }
    /// Input is flat array [x1,y1,x2,y2]
      } else {
        delta = input.length % 3 === 0 ? 3 : 2;
        for (i = 0; i < input.length; i += delta) {
          temp = ren.displayToWorld(vec4.fromValues(
            input[i],
            input[i + 1],
            fdp[2],
            1.0), cam.viewMatrix(), cam.projectionMatrix(),
            m_width, m_height);
          output.push(temp[0]);
          output.push(temp[1]);
          output.push(temp[2]);
          output.push(temp[3]);
        }
      }
    /// Input is object {x:val, y:val}
    } else if (input instanceof Object) {
      output = {};
      temp = ren.displayToWorld(vec4.fromValues(
               input.x, input.y, fdp[2], 1.0),
               cam.viewMatrix(), cam.projectionMatrix(),
               m_width, m_height);
      output = {x: temp[0], y: temp[1], z: temp[2], w: temp[3]};
    } else {
      throw "Display to world conversion requires array of 2D/3D points";
    }
    return output;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert input data in world space to display space
   *
   * @param {object} input {x:val, y:val} or {x:val, y:val, z:val} or [{x:val, y:val}]
   * [{x:val, y:val, z:val}] or [[x,y]] or  [[x,y,z]] or [x1,y1,z1, x2, y2, z2]
   *
   * @returns {object} {x:val, y:val} or [{x:val, y:val}] or [[x,y]] or
   * [x1,y1, x2, y2]
   */
  ////////////////////////////////////////////////////////////////////////////
  this.worldToDisplay = function (input) {
    var i, temp, delta,
        ren = m_this.contextRenderer(), cam = ren.camera(),
        fp = cam.focalPoint(), output = [];

    /// Input is an array
    if (input instanceof Array && input.length > 0) {
      output = [];

      /// Input is an array of objects
      if (input[0] instanceof Object) {
        delta = 1;
        for (i = 0; i < input.length; i += delta) {
          temp = ren.worldToDisplay(vec4.fromValues(
                   input[i].x, input[i].y, fp[2], 1.0), cam.viewMatrix(),
                   cam.projectionMatrix(),
                   m_width, m_height);
          output[i] = { x: temp[0], y: temp[1], z: temp[2] };
        }
      } else if (input[0] instanceof Array) {
        /// Input is an array of array
        delta = 1;
        for (i = 0; i < input.length; i += delta) {
          temp = ren.worldToDisplay(
                   vec4.fromValues(input[i][0], input[i][1], fp[2], 1.0),
                   cam.viewMatrix(), cam.projectionMatrix(), m_width, m_height);
          output[i].push(temp);
        }
      } else {
        /// Input is a flat array of 2 or 3 dimension
        delta = input.length % 3 === 0 ? 3 : 2;
        if (delta === 2) {
          for (i = 0; i < input.length; i += delta) {
            temp = ren.worldToDisplay(vec4.fromValues(
                     input[i], input[i + 1], fp[2], 1.0), cam.viewMatrix(),
                     cam.projectionMatrix(),
                     m_width, m_height);
            output.push(temp[0]);
            output.push(temp[1]);
            output.push(temp[2]);
          }
        } else {
          for (i = 0; i < input.length; i += delta) {
            temp = ren.worldToDisplay(vec4.fromValues(
                         input[i], input[i + 1], input[i + 2], 1.0), cam.viewMatrix(),
                         cam.projectionMatrix(),
                         m_width, m_height);
            output.push(temp[0]);
            output.push(temp[1]);
            output.push(temp[2]);
          }
        }
      }
    } else if (input instanceof Object) {
      temp = ren.worldToDisplay(vec4.fromValues(
               input.x, input.y, fp[2], 1.0), cam.viewMatrix(),
               cam.projectionMatrix(),
               m_width, m_height);

      output = {x: temp[0], y: temp[1], z: temp[2]};
    } else {
      throw "World to display conversion requires array of 2D/3D points";
    }

    return output;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get context specific renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.contextRenderer = function () {
    return m_contextRenderer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get API used by the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.api = function () {
    return "vgl";
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    if (m_this.initialized()) {
      return m_this;
    }

    s_init.call(m_this);

    m_this.canvas($(m_viewer.canvas()));
    if (m_viewer.renderWindow().renderers().length > 0) {
      m_contextRenderer.setLayer(m_viewer.renderWindow().renderers().length);
      m_contextRenderer.setResetScene(false);
    }
    m_viewer.renderWindow().addRenderer(m_contextRenderer);

    m_this.layer().node().append(m_this.canvas());

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle resize event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._resize = function (x, y, w, h) {
    m_width = w;
    m_height = h;
    m_this.canvas().attr("width", w);
    m_this.canvas().attr("height", h);
    m_viewer.renderWindow().positionAndResize(x, y, w, h);
    m_this._render();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render
   */
  ////////////////////////////////////////////////////////////////////////////
  this._render = function () {
    m_viewer.render();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Exit
   * @todo remove all vgl objects
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    geo.gl.vglViewerInstance.deleteCache(m_viewer);
    s_exit();
  };

  this._updateRendererCamera = function () {
    var vglRenderer = m_this.contextRenderer(),
        renderWindow = m_viewer.renderWindow(),
        camera = vglRenderer.camera(),
        pos, fp, cr;

    vglRenderer.resetCameraClippingRange();
    pos = camera.position();
    fp = camera.focalPoint();
    cr = camera.clippingRange();
    renderWindow.renderers().forEach(function (renderer) {
      var cam = renderer.camera();

      if (cam !== camera) {
        cam.setPosition(pos[0], pos[1], pos[2]);
        cam.setFocalPoint(fp[0], fp[1], fp[2]);
        cam.setClippingRange(cr[0], cr[1]);
        renderer.render();
      }
    });
  };

  // connect to interactor events
  this.geoOn(geo.event.pan, function (evt) {
    var vglRenderer = m_this.contextRenderer(),
        camera,
        focusPoint,
        centerDisplay,
        centerGeo,
        newCenterDisplay,
        newCenterGeo,
        renderWindow,
        layer = m_this.layer();

    // only the base layer needs to respond
    if (layer.map().baseLayer() !== layer) {
      return;
    }

    // skip handling if the renderer is unconnected
    if (!vglRenderer || !vglRenderer.camera()) {
      console.log("Pan event triggered on unconnected vgl renderer.");
    }

    renderWindow = m_viewer.renderWindow();
    camera = vglRenderer.camera();
    focusPoint = renderWindow.focusDisplayPoint();

    // Calculate the center in display coordinates
    centerDisplay = [m_width / 2, m_height / 2, 0];

    // Calculate the center in world coordinates
    centerGeo = renderWindow.displayToWorld(
      centerDisplay[0],
      centerDisplay[1],
      focusPoint,
      vglRenderer
    );

    newCenterDisplay = [
      centerDisplay[0] + evt.screenDelta.x,
      centerDisplay[1] + evt.screenDelta.y
    ];

    newCenterGeo = renderWindow.displayToWorld(
      newCenterDisplay[0],
      newCenterDisplay[1],
      focusPoint,
      vglRenderer
    );

    camera.pan(
      centerGeo[0] - newCenterGeo[0],
      centerGeo[1] - newCenterGeo[1],
      centerGeo[2] - newCenterGeo[2]
    );

    evt.center = {
      x: newCenterGeo[0],
      y: newCenterGeo[1],
      z: newCenterGeo[2]
    };

    m_this._updateRendererCamera();
  });

  this.geoOn(geo.event.zoom, function (evt) {
    var vglRenderer = m_this.contextRenderer(),
        camera,
        renderWindow,
        layer = m_this.layer(),
        center,
        dir,
        focusPoint,
        position,
        newZ;

    // only the base layer needs to respond
    if (layer.map().baseLayer() !== layer) {
      return;
    }

    // skip handling if the renderer is unconnected
    if (!vglRenderer || !vglRenderer.camera()) {
      console.log("Zoom event triggered on unconnected vgl renderer.");
    }

    renderWindow = m_viewer.renderWindow();
    camera = vglRenderer.camera();
    focusPoint = camera.focalPoint();
    position = camera.position();
    newZ = 360 * Math.pow(2, -evt.zoomLevel);

    evt.pan = null;
    if (evt.screenPosition) {
      center = renderWindow.displayToWorld(
        evt.screenPosition.x,
        evt.screenPosition.y,
        focusPoint,
        vglRenderer
      );
      dir = [center[0] - position[0], center[1] - position[1], center[2] - position[2]];
      evt.center = layer.fromLocal({
        x: position[0] + dir[0] * (1 - newZ / position[2]),
        y: position[1] + dir[1] * (1 - newZ / position[2])
      });
    }

    camera.setPosition(position[0], position[1], 360 * Math.pow(2, -evt.zoomLevel));

    m_this._updateRendererCamera();
  });

  return this;
};

inherit(geo.gl.vglRenderer, geo.gl.renderer);

geo.registerRenderer("vgl", geo.gl.vglRenderer);

/** @namespace */
geo.d3 = {};

(function () {
  'use strict';

  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
    strLength = 8;

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get a random string to use as a div ID
   * @returns {string}
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.d3.uniqueID = function () {
    var strArray = [],
        i;
    strArray.length = strLength;
    for (i = 0; i < strLength; i += 1) {
      strArray[i] = chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return strArray.join('');
  };

  // event propagated when the d3 renderer rescales its group element
  geo.event.d3Rescale = 'geo_d3_rescale';
}());

//////////////////////////////////////////////////////////////////////////////
/**
 * D3 specific subclass of object which adds an id property for d3 selections
 * on groups of objects by class id.
 * @class
 * @extends geo.sceneObject
 */
//////////////////////////////////////////////////////////////////////////////

geo.d3.object = function (arg) {
  'use strict';
  // this is used to extend other geojs classes, so only generate
  // a new object when that is not the case... like if this === window
  if (!(this instanceof geo.object)) {
    return new geo.d3.object(arg);
  }
  geo.sceneObject.call(this);

  var m_id = 'd3-' + geo.d3.uniqueID(),
      s_exit = this._exit,
      m_this = this,
      s_draw = this.draw;

  this._d3id = function () {
    return m_id;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Returns a d3 selection for the feature elements
  */
  ////////////////////////////////////////////////////////////////////////////
  this.select = function () {
    return m_this.renderer().select(m_this._d3id());
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Redraw the object.
  */
  ////////////////////////////////////////////////////////////////////////////
  this.draw = function () {
    m_this._update();
    s_draw();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Removes the element from the svg and the renderer
  */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer()._removeFeature(m_this._d3id());
    s_exit();
  };

  return this;
};

inherit(geo.d3.object, geo.sceneObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of pointFeature
 *
 * @class
 * @extends geo.pointFeature
 * @extends geo.d3.object
 * @returns {geo.d3.pointFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.pointFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.d3.pointFeature)) {
    return new geo.d3.pointFeature(arg);
  }
  arg = arg || {};
  geo.pointFeature.call(this, arg);
  geo.d3.object.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      s_update = this._update,
      m_buildTime = geo.timestamp(),
      m_style = {},
      m_sticky;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);
    m_sticky = m_this.layer().sticky();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var data = m_this.data(),
        s_style = m_this.style.get(),
        m_renderer = m_this.renderer(),
        pos_func = m_this.position();

    // call super-method
    s_update.call(m_this);

    // default to empty data array
    if (!data) { data = []; }

    // fill in d3 renderer style object defaults
    m_style.id = m_this._d3id();
    m_style.data = data;
    m_style.append = 'circle';
    m_style.attributes = {
      r: m_renderer._convertScale(s_style.radius),
      cx: function (d) {
        return m_renderer.worldToDisplay(pos_func(d)).x;
      },
      cy: function (d) {
        return m_renderer.worldToDisplay(pos_func(d)).y;
      }
    };
    m_style.style = s_style;
    m_style.classes = ['d3PointFeature'];

    // pass to renderer to draw
    m_this.renderer()._drawFeatures(m_style);

    // update time stamps
    m_buildTime.modified();
    m_this.updateTime().modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.getMTime() >= m_buildTime.getMTime()) {
      m_this._build();
    }

    return m_this;
  };

  this._init(arg);
  return this;
};

inherit(geo.d3.pointFeature, geo.pointFeature);

// Now register it
geo.registerFeature('d3', 'point', geo.d3.pointFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class lineFeature
 *
 * @class
 * @extends geo.lineFeature
 * @extends geo.d3.object
 * @returns {geo.d3.lineFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.lineFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.d3.lineFeature)) {
    return new geo.d3.lineFeature(arg);
  }
  arg = arg || {};
  geo.lineFeature.call(this, arg);
  geo.d3.object.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      m_buildTime = geo.timestamp(),
      s_update = this._update;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var data = m_this.data() || [],
        s_style = m_this.style(),
        m_renderer = m_this.renderer(),
        pos_func = m_this.position(),
        line = d3.svg.line()
                .x(function (d) { return m_renderer.worldToDisplay(d).x; })
                .y(function (d) { return m_renderer.worldToDisplay(d).y; });

    s_update.call(m_this);
    s_style.fill = function () { return false; };

    data.forEach(function (item, idx) {
      var m_style;
      var ln = m_this.line()(item, idx);

      var style = {}, key;
      function wrapStyle(func) {
        if (geo.util.isFunction(func)) {
          return function () {
            return func(ln[0], 0, item, idx);
          };
        } else {
          return func;
        }
      }
      for (key in s_style) {
        if (s_style.hasOwnProperty(key)) {
          style[key] = wrapStyle(s_style[key]);
        }
      }

      // item is an object representing a single line
      // m_this.line()(item) is an array of coordinates
      m_style = {
        data: [ln.map(function (d, i) { return pos_func(d, i, item, idx);})],
        append: 'path',
        attributes: {
          d: line
        },
        id: m_this._d3id() + idx,
        classes: ['d3LineFeature', 'd3SubLine-' + idx],
        style: style
      };

      m_renderer._drawFeatures(m_style);
    });

    m_buildTime.modified();
    m_this.updateTime().modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.getMTime() >= m_buildTime.getMTime()) {
      m_this._build();
    }

    return m_this;
  };

  this._init(arg);
  return this;
};

inherit(geo.d3.lineFeature, geo.lineFeature);

geo.registerFeature('d3', 'line', geo.d3.lineFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class pathFeature
 *
 * @class
 * @extends geo.pathFeature
 * @extends geo.d3.object
 * @returns {geo.d3.pathFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.pathFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.d3.pathFeature)) {
    return new geo.d3.pathFeature(arg);
  }
  arg = arg || {};
  geo.pathFeature.call(this, arg);
  geo.d3.object.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      m_buildTime = geo.timestamp(),
      s_update = this._update,
      m_style = {};

  m_style.style = {};

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var data = m_this.data() || [],
        s_style = m_this.style(),
        m_renderer = m_this.renderer(),
        tmp, diag;
    s_update.call(m_this);

    diag = function (d) {
        var p = {
          source: d.source,
          target: d.target
        };
        return d3.svg.diagonal()(p);
      };
    tmp = [];
    data.forEach(function (d, i) {
      var src, trg;
      if (i < data.length - 1) {
        src = d;
        trg = data[i + 1];
        tmp.push({
          source: m_renderer.worldToDisplay(src),
          target: m_renderer.worldToDisplay(trg)
        });
      }
    });
    m_style.data = tmp;
    m_style.attributes = {
      d: diag
    };

    m_style.id = m_this._d3id();
    m_style.append = 'path';
    m_style.classes = ['d3PathFeature'];
    m_style.style = $.extend({
      'fill': function () { return false; },
      'fillColor': function () { return { r: 0, g: 0, b: 0 }; }
    }, s_style);

    m_this.renderer()._drawFeatures(m_style);

    m_buildTime.modified();
    m_this.updateTime().modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.dataTime().getMTime() >= m_buildTime.getMTime()) {
      m_this._build();
    }

    return m_this;
  };

  this._init(arg);
  return this;
};

inherit(geo.d3.pathFeature, geo.pathFeature);

geo.registerFeature('d3', 'path', geo.d3.pathFeature);

/**
 * @class
 * @extends geo.graphFeature
 */
geo.d3.graphFeature = function (arg) {
  'use strict';

  var m_this = this;

  if (!(this instanceof geo.d3.graphFeature)) {
    return new geo.d3.graphFeature(arg);
  }
  geo.graphFeature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Returns a d3 selection for the graph elements
  */
  ////////////////////////////////////////////////////////////////////////////
  this.select = function () {
    var renderer = m_this.renderer(),
        selection = {},
        node = m_this.nodeFeature(),
        links = m_this.linkFeatures();
    selection.nodes = renderer.select(node._d3id());
    selection.links = links.map(function (link) {
      return renderer.select(link._d3id());
    });
    return selection;
  };

  return this;
};

inherit(geo.d3.graphFeature, geo.graphFeature);

geo.registerFeature('d3', 'graph', geo.d3.graphFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a plane feature given a lower left corner point geo.latlng
 * and and upper right corner point geo.latlng
 *
 * *CURRENTLY BROKEN*
 *
 * @class
 * @extends geo.planeFeature
 * @param lowerleft
 * @param upperright
 * @returns {geo.d3.planeFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.planeFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.d3.planeFeature)) {
    return new geo.d3.planeFeature(arg);
  }
  geo.planeFeature.call(this, arg);
  geo.d3.object.call(this);

  var m_this = this,
      m_style = {},
      s_update = this._update,
      s_init = this._init,
      m_buildTime = geo.timestamp();

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Normalize a coordinate as an object {x: ..., y: ...}
   *
   * @private
   * @returns {Object}
   */
  //////////////////////////////////////////////////////////////////////////////
  function normalize(pt) {
    if (Array.isArray(pt)) {
      return {
        x: pt[0],
        y: pt[1]
      };
    } else if (pt instanceof geo.latlng) {
      return {
        x: pt.x(),
        y: pt.y()
      };
    }
    return pt;
  }

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Build the feature object and pass to the renderer for drawing.
   *
   * @private
   * @returns {geo.d3.planeFeature}
   */
  //////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var origin = normalize(m_this.origin()),
        ul = normalize(m_this.upperLeft()),
        lr = normalize(m_this.lowerRight()),
        renderer = m_this.renderer(),
        s = m_this.style();

    delete s.fill_color;
    delete s.color;
    delete s.opacity;
    if (!s.screenCoordinates) {
      origin = renderer.worldToDisplay(origin);
      ul = renderer.worldToDisplay(ul);
      lr = renderer.worldToDisplay(lr);
    }
    m_style.id = m_this._d3id();
    m_style.style = s;
    m_style.attributes = {
      x: ul.x,
      y: ul.y,
      width: lr.x - origin.x,
      height: origin.y - ul.y
    };
    m_style.append = 'rect';
    m_style.data = [0];
    m_style.classes = ['d3PlaneFeature'];

    renderer._drawFeatures(m_style);
    m_buildTime.modified();
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Redraw the plane feature if necessary.
   *
   * @private
   * @returns {geo.d3.planeFeature}
   */
  //////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.dataTime().getMTime() >= m_buildTime.getMTime()) {
      m_this._build();
    }
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Initializes the plane feature style (over-riding the parent default).
   *
   * @private
   * @returns {geo.d3.planeFeature}
   */
  //////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg || {});
    m_this.style({
      stroke: function () { return false; },
      fill: function () { return true; },
      fillColor: function () { return {r: 0.3, g: 0.3, b: 0.3}; },
      fillOpacity: function () { return 0.5; }
    });
    return m_this;
  };

  this._init();
  return this;
};

inherit(geo.d3.planeFeature, geo.planeFeature);

geo.registerFeature('d3', 'plane', geo.d3.planeFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of vectorFeature
 *
 * @class
 * @extends geo.vectorFeature
 * @extends geo.d3.object
 * @returns {geo.d3.vectorFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.vectorFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.d3.vectorFeature)) {
    return new geo.d3.vectorFeature(arg);
  }
  arg = arg || {};
  geo.vectorFeature.call(this, arg);
  geo.d3.object.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      s_exit = this._exit,
      s_update = this._update,
      m_buildTime = geo.timestamp(),
      m_style = {},
      m_sticky;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Generate a unique ID for a marker definition
   * @private
   * @param {object} d Unused datum (for d3 compat)
   * @param {number} i The marker index
   */
  ////////////////////////////////////////////////////////////////////////////
  function markerID(d, i) {
    return m_this._d3id() + '_marker_' + i;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add marker styles for vector arrows.
   * @private
   * @param {object[]} data The vector data array
   * @param {function} stroke The stroke accessor
   * @param {function} opacity The opacity accessor
   */
  ////////////////////////////////////////////////////////////////////////////
  function updateMarkers(data, stroke, opacity) {

    var renderer = m_this.renderer();
    var sel = m_this.renderer()._definitions()
      .selectAll('marker.geo-vector')
        .data(data);
    sel.enter()
      .append('marker')
        .attr('id', markerID)
        .attr('class', 'geo-vector')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', '1')
        .attr('refY', '5')
        .attr('markerWidth', '5')
        .attr('markerHeight', '5')
        .attr('orient', 'auto')
        .append('path')
          .attr('d', 'M 0 0 L 10 5 L 0 10 z');

    sel.exit().remove();

    sel.style('stroke', renderer._convertColor(stroke))
      .style('fill', renderer._convertColor(stroke))
      .style('opacity', opacity);
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);
    m_sticky = m_this.layer().sticky();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var data = m_this.data(),
        s_style = m_this.style.get(),
        m_renderer = m_this.renderer(),
        orig_func = m_this.origin(),
        size_func = m_this.delta(),
        cache = [],
        scale = m_this.style('scale'),
        max = Number.NEGATIVE_INFINITY;

    // call super-method
    s_update.call(m_this);

    // default to empty data array
    if (!data) { data = []; }

    // cache the georeferencing
    cache = data.map(function (d, i) {
      var origin = m_renderer.worldToDisplay(orig_func(d, i)),
          delta = size_func(d, i);
      max = Math.max(max, delta.x * delta.x + delta.y * delta.y);
      return {
        x1: origin.x,
        y1: origin.y,
        dx: delta.x,
        dy: -delta.y
      };
    });

    max = Math.sqrt(max);
    if (!scale) {
      scale = 75 / max;
    }

    function getScale() {
      return scale / m_renderer.scaleFactor();
    }

    // fill in d3 renderer style object defaults
    m_style.id = m_this._d3id();
    m_style.data = data;
    m_style.append = 'line';
    m_style.attributes = {
      x1: function (d, i) {
        return cache[i].x1;
      },
      y1: function (d, i) {
        return cache[i].y1;
      },
      x2: function (d, i) {
        return cache[i].x1 + getScale() * cache[i].dx;
      },
      y2: function (d, i) {
        return cache[i].y1 + getScale() * cache[i].dy;
      },
      'marker-end': function (d, i) {
        return 'url(#' + markerID(d, i) + ')';
      }
    };
    m_style.style = {
      stroke: function () { return true; },
      strokeColor: s_style.strokeColor,
      strokeWidth: s_style.strokeWidth,
      strokeOpacity: s_style.strokeOpacity
    };
    m_style.classes = ['d3VectorFeature'];

    // Add markers to the defition list
    updateMarkers(data, s_style.strokeColor, s_style.strokeOpacity);

    // pass to renderer to draw
    m_this.renderer()._drawFeatures(m_style);

    // update time stamps
    m_buildTime.modified();
    m_this.updateTime().modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.getMTime() >= m_buildTime.getMTime()) {
      m_this._build();
    } else {
      updateMarkers(
        m_style.data,
        m_style.style.strokeColor,
        m_style.style.strokeOpacity
      );
    }

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Exit
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    s_exit.call(m_this);
    m_style = {};
    updateMarkers([], null, null);
  };

  this._init(arg);
  return this;
};

inherit(geo.d3.vectorFeature, geo.vectorFeature);

// Now register it
geo.registerFeature('d3', 'vector', geo.d3.vectorFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class d3Renderer
 *
 * @class
 * @extends geo.renderer
 * @returns {geo.d3.d3Renderer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.d3Renderer = function (arg) {
  'use strict';

  if (!(this instanceof geo.d3.d3Renderer)) {
    return new geo.d3.d3Renderer(arg);
  }
  geo.renderer.call(this, arg);

  var s_exit = this._exit;

  geo.d3.object.call(this, arg);

  arg = arg || {};

  var m_this = this,
      m_sticky = null,
      m_features = {},
      m_corners = null,
      m_width = null,
      m_height = null,
      m_scale = 1,
      m_dx = 0,
      m_dy = 0,
      m_svg = null,
      m_defs = null;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set attributes to a d3 selection.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function setAttrs(select, attrs) {
    var key;
    for (key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        select.attr(key, attrs[key]);
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Meta functions for converting from geojs styles to d3.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  this._convertColor = function (f, g) {
    f = geo.util.ensureFunction(f);
    g = g || function () { return true; };
    return function () {
      var c = 'none';
      if (g.apply(this, arguments)) {
        c = f.apply(this, arguments);
        if (c.hasOwnProperty('r') &&
            c.hasOwnProperty('g') &&
            c.hasOwnProperty('b')) {
          c = d3.rgb(255 * c.r, 255 * c.g, 255 * c.b);
        }
      }
      return c;
    };
  };

  this._convertPosition = function (f) {
    f = geo.util.ensureFunction(f);
    return function () {
      return m_this.worldToDisplay(f.apply(this, arguments));
    };
  };

  this._convertScale = function (f) {
    f = geo.util.ensureFunction(f);
    return function () {
      return f.apply(this, arguments) / m_scale;
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set styles to a d3 selection. Ignores unkown style keys.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function setStyles(select, styles) {
    /* jshint validthis:true */
    var key, k, f;
    function fillFunc() {
      if (styles.fill.apply(this, arguments)) {
        return null;
      } else {
        return 'none';
      }
    }
    function strokeFunc() {
      if (styles.stroke.apply(this, arguments)) {
        return null;
      } else {
        return 'none';
      }
    }
    for (key in styles) {
      if (styles.hasOwnProperty(key)) {
        f = null;
        k = null;
        if (key === 'strokeColor') {
          k = 'stroke';
          f = m_this._convertColor(styles[key], styles.stroke);
        } else if (key === 'stroke' && styles[key]) {
          k = 'stroke';
          f = strokeFunc;
        } else if (key === 'strokeWidth') {
          k = 'stroke-width';
          f = m_this._convertScale(styles[key]);
        } else if (key === 'strokeOpacity') {
          k = 'stroke-opacity';
          f = styles[key];
        } else if (key === 'fillColor') {
          k = 'fill';
          f = m_this._convertColor(styles[key], styles.fill);
        } else if (key === 'fill' && !styles.hasOwnProperty('fillColor')) {
          k = 'fill';
          f = fillFunc;
        } else if (key === 'fillOpacity') {
          k = 'fill-opacity';
          f = styles[key];
        }
        if (k) {
          select.style(k, f);
        }
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the map instance or return null if not connected to a map.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function getMap() {
    var layer = m_this.layer();
    if (!layer) {
      return null;
    }
    return layer.map();
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the svg group element associated with this renderer instance.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function getGroup() {
    return m_svg.select('.group-' + m_this._d3id());
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set the initial lat-lon coordinates of the map view.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function initCorners() {
    var layer = m_this.layer(),
        map = layer.map(),
        width = m_this.layer().width(),
        height = m_this.layer().height();

    m_width = width;
    m_height = height;
    if (!m_width || !m_height) {
      throw 'Map layer has size 0';
    }
    m_corners = {
      'upperLeft': map.displayToGcs({'x': 0, 'y': 0}),
      'lowerRight': map.displayToGcs({'x': width, 'y': height})
    };
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set the translation, scale, and zoom for the current view.
   * @note rotation not yet supported
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function setTransform() {

    if (!m_corners) {
      initCorners();
    }

    if (!m_sticky) {
      return;
    }

    var layer = m_this.layer(),
        map = layer.map(),
        upperLeft = map.gcsToDisplay(m_corners.upperLeft),
        lowerRight = map.gcsToDisplay(m_corners.lowerRight),
        group = getGroup(),
        dx, dy, scale;

    // calculate the translation
    dx = upperLeft.x;
    dy = upperLeft.y;

    // calculate the scale
    scale = (lowerRight.y - upperLeft.y) / m_height;

    // set the group transform property
    group.attr('transform', 'matrix(' + [scale, 0, 0, scale, dx, dy].join() + ')');

    // set internal variables
    m_scale = scale;
    m_dx = dx;
    m_dy = dy;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from screen pixel coordinates to the local coordinate system
   * in the SVG group element taking into account the transform.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function baseToLocal(pt) {
    return {
      x: (pt.x - m_dx) / m_scale,
      y: (pt.y - m_dy) / m_scale
    };
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from the local coordinate system in the SVG group element
   * to screen pixel coordinates.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function localToBase(pt) {
    return {
      x: pt.x * m_scale + m_dx,
      y: pt.y * m_scale + m_dy
    };
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    if (!m_this.canvas()) {
      var canvas;
      m_svg = d3.select(m_this.layer().node().get(0)).append('svg');

      // create a global svg definitions element
      m_defs = m_svg.append('defs');

      var shadow = m_defs
        .append('filter')
          .attr('id', 'geo-highlight')
          .attr('x', '-100%')
          .attr('y', '-100%')
          .attr('width', '300%')
          .attr('height', '300%');
      shadow
        .append('feMorphology')
          .attr('operator', 'dilate')
          .attr('radius', 2)
          .attr('in', 'SourceAlpha')
          .attr('result', 'dilateOut');
      shadow
        .append('feGaussianBlur')
          .attr('stdDeviation', 5)
          .attr('in', 'dilateOut')
          .attr('result', 'blurOut');
      shadow
        .append('feColorMatrix')
          .attr('type', 'matrix')
          .attr('values', '-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0')
          .attr('in', 'blurOut')
          .attr('result', 'invertOut');
      shadow
        .append('feBlend')
          .attr('in', 'SourceGraphic')
          .attr('in2', 'invertOut')
          .attr('mode', 'normal');
      canvas = m_svg.append('g');

      shadow = m_defs.append('filter')
          .attr('id', 'geo-blur')
          .attr('x', '-100%')
          .attr('y', '-100%')
          .attr('width', '300%')
          .attr('height', '300%');

      shadow
        .append('feGaussianBlur')
          .attr('stdDeviation', 20)
          .attr('in', 'SourceGraphic');

      m_sticky = m_this.layer().sticky();
      m_svg.attr('class', m_this._d3id());
      m_svg.attr('width', m_this.layer().node().width());
      m_svg.attr('height', m_this.layer().node().height());

      canvas.attr('class', 'group-' + m_this._d3id());

      m_this.canvas(canvas);
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from coordinates in the svg group element to lat/lon.
   * Supports objects or arrays of objects.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.displayToWorld = function (pt) {
    var map = getMap();
    if (!map) {
      throw 'Cannot project until this layer is connected to a map.';
    }
    if (Array.isArray(pt)) {
      pt = pt.map(function (x) {
        return map.displayToGcs(localToBase(x));
      });
    } else {
      pt = map.displayToGcs(localToBase(pt));
    }
    return pt;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from lat/lon to pixel coordinates in the svg group element.
   * Supports objects or arrays of objects.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.worldToDisplay = function (pt) {
    var map = getMap();
    if (!map) {
      throw 'Cannot project until this layer is connected to a map.';
    }
    var v;
    if (Array.isArray(pt)) {
      v = pt.map(function (x) {
        return baseToLocal(map.gcsToDisplay(x));
      });
    } else {
      v = baseToLocal(map.gcsToDisplay(pt));
    }
    return v;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get API used by the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.api = function () {
    return 'd3';
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the current scaling factor to build features that shouldn't
   * change size during zooms.  For example:
   *
   *  selection.append('circle')
   *    .attr('r', r0 / renderer.scaleFactor());
   *
   * This will create a circle element with radius r0 independent of the
   * current zoom level.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.scaleFactor = function () {
    return m_scale;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle resize event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._resize = function (x, y, w, h) {
    if (!m_corners) {
      initCorners();
    }
    m_svg.attr('width', w);
    m_svg.attr('height', h);
    setTransform();
    m_this.layer().geoTrigger(geo.event.d3Rescale, { scale: m_scale }, true);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update noop for geo.d3.object api.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Exit
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_features = {};
    m_this.canvas().remove();
    s_exit();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the definitions dom element for the layer
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._definitions = function () {
    return m_defs;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create a new feature element from an object that describes the feature
   * attributes.  To be called from feature classes only.
   *
   * Input:
   *  {
   *    id:         A unique string identifying the feature.
   *    data:       Array of data objects used in a d3 data method.
   *    index:      A function that returns a unique id for each data element.
   *    style:      An object containing element CSS styles.
   *    attributes: An object containing element attributes.
   *    classes:    An array of classes to add to the elements.
   *    append:     The element type as used in d3 append methods.
   *  }
   */
  ////////////////////////////////////////////////////////////////////////////
  this._drawFeatures = function (arg) {
    m_features[arg.id] = {
      data: arg.data,
      index: arg.dataIndex,
      style: arg.style,
      attributes: arg.attributes,
      classes: arg.classes,
      append: arg.append
    };
    return m_this.__render(arg.id);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Updates a feature by performing a d3 data join.  If no input id is
  *  provided then this method will update all features.
  */
  ////////////////////////////////////////////////////////////////////////////
  this.__render = function (id) {
    var key;
    if (id === undefined) {
      for (key in m_features) {
        if (m_features.hasOwnProperty(key)) {
          m_this.__render(key);
        }
      }
      return m_this;
    }
    var data = m_features[id].data,
        index = m_features[id].index,
        style = m_features[id].style,
        attributes = m_features[id].attributes,
        classes = m_features[id].classes,
        append = m_features[id].append,
        selection = m_this.select(id).data(data, index);
    selection.enter().append(append);
    selection.exit().remove();
    setAttrs(selection, attributes);
    selection.attr('class', classes.concat([id]).join(' '));
    setStyles(selection, style);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Returns a d3 selection for the given feature id.
  */
  ////////////////////////////////////////////////////////////////////////////
  this.select = function (id) {
    return getGroup().selectAll('.' + id);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Removes a feature from the layer.
  */
  ////////////////////////////////////////////////////////////////////////////
  this._removeFeature = function (id) {
    m_this.select(id).remove();
    delete m_features[id];
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Override draw method to do nothing.
  */
  ////////////////////////////////////////////////////////////////////////////
  this.draw = function () {
  };

  // connect to pan event
  this.layer().geoOn(geo.event.pan, setTransform);

  // connect to zoom event
  this.layer().geoOn(geo.event.zoom, function () {
    setTransform();
    m_this.__render();
    m_this.layer().geoTrigger(geo.event.d3Rescale, { scale: m_scale }, true);
  });

  this.layer().geoOn(geo.event.resize, function (event) {
    m_this._resize(event.x, event.y, event.width, event.height);
  });

  this._init(arg);
  return this;
};

inherit(geo.d3.d3Renderer, geo.renderer);

geo.registerRenderer('d3', geo.d3.d3Renderer);

//////////////////////////////////////////////////////////////////////////////
/**
 * @namespace
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui = {};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class uiLayer
 *
 * @class
 * @extends {geo.layer}
 * @returns {geo.gui.uiLayer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui.uiLayer = function (arg) {
  'use strict';

  // The widget stays fixed on the screen.  (only available in d3 at the moment)
  arg.renderer = 'd3';
  arg.sticky = false;

  if (!(this instanceof geo.gui.uiLayer)) {
    return new geo.gui.uiLayer(arg);
  }
  geo.layer.call(this, arg);

  var m_this = this,
      s_exit = this._exit;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create a new ui control
   *
   * @returns {geo.gui.Widget} Will return a new control widget
   */
  ////////////////////////////////////////////////////////////////////////////
  this.createWidget = function (widgetName, arg) {

    var newWidget = geo.createWidget(
      widgetName, m_this, m_this.renderer(), arg);

    m_this.addChild(newWidget);
    newWidget._init();
    m_this.modified();
    return newWidget;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Delete a ui control
   */
  ////////////////////////////////////////////////////////////////////////////
  this.deleteWidget = function (widget) {
    widget._exit();
    m_this.removeChild(widget);
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Free memory and destroy the layer.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.children().forEach(function (child) {
      m_this.deleteWidget(child);
    });
    s_exit();
  };
};

inherit(geo.gui.uiLayer, geo.layer);

geo.registerLayer('ui', geo.gui.uiLayer);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class widget
 *
 * @class
 * @extends {geo.sceneObject}
 * @returns {geo.gui.widget}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui.widget = function (arg) {
  'use strict';
  if (!(this instanceof geo.gui.widget)) {
    return new geo.gui.widget(arg);
  }
  geo.sceneObject.call(this, arg);

  var m_this = this,
      s_exit = this._exit,
      m_layer = arg.layer;

  this._init = function () {
    m_this.modified();
  };

  this._exit = function () {
    m_this.children().forEach(function (child) {
      m_this._deleteFeature(child);
    });
    s_exit();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create feature give a name
   *
   * @returns {geo.Feature} Will return a new feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this._createFeature = function (featureName, arg) {

    var newFeature = geo.createFeature(
      featureName, m_this, m_this.renderer(), arg);

    m_this.addChild(newFeature);
    m_this.modified();
    return newFeature;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Delete feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this._deleteFeature = function (feature) {
    m_this.removeChild(feature);
    feature._exit();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the layer associated with this widget.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.layer = function () {
    return m_layer;
  };
};
inherit(geo.gui.widget, geo.sceneObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sliderWidget
 *
 * @class
 * @extends {geo.gui.widget}
 * @returns {geo.gui.sliderWidget}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui.sliderWidget = function (arg) {
  'use strict';
  if (!(this instanceof geo.gui.sliderWidget)) {
    return new geo.gui.sliderWidget(arg);
  }
  geo.gui.widget.call(this, arg);

  var m_this = this,
      s_exit = this._exit,
      m_xscale,
      m_yscale,
      m_plus,
      m_minus,
      m_track,
      m_nub,
      m_width = 20, // Approximate size of the widget in pixels
      m_height = 100,
      m_nubSize = 10,
      m_plusIcon,
      m_minusIcon,
      m_group,
      m_lowContrast,
      m_highlightDur = 100;

  /* http://icomoon.io */
  /* CC BY 3.0 http://creativecommons.org/licenses/by/3.0/ */
  /* jshint -W101 */
  m_plusIcon = 'M512 81.92c-237.568 0-430.080 192.614-430.080 430.080 0 237.568 192.563 430.080 430.080 430.080s430.080-192.563 430.080-430.080c0-237.517-192.563-430.080-430.080-430.080zM564.326 564.326v206.182h-104.653v-206.182h-206.234v-104.653h206.182v-206.234h104.704v206.182h206.182v104.704h-206.182z';
  m_minusIcon = 'M512 81.92c-237.568 0-430.080 192.614-430.080 430.080 0 237.568 192.563 430.080 430.080 430.080s430.080-192.563 430.080-430.080c0-237.517-192.563-430.080-430.080-430.080zM770.56 459.674v104.704h-517.12v-104.704h517.12z';
  /* jshint +W101 */

  // Define off-white gray colors for low contrast ui (unselected).
  m_lowContrast = {
    white: '#f4f4f4',
    black: '#505050'
  };

//////////////////////////////////////////////////////////////////////////////
/**
 * Add an icon from a path string.  Returns a d3 group element.
 *
 * @function
 * @argument {String} icon svg path string
 * @argument {Array} base where to append the element (d3 selection)
 * @argument {Number} cx Center x-coordinate
 * @argument {Number} cy Center y-coordinate
 * @argument {Number} size Icon size in pixels
 * @returns {object}
 * @private
 */
//////////////////////////////////////////////////////////////////////////////
  function put_icon(icon, base, cx, cy, size) {
    var g = base.append('g');

    // the scale factor
    var s = size / 1024;

    g.append('g')
      .append('g')
        .attr(
          'transform',
          'translate(' + cx + ',' + cy + ') scale(' + s + ') translate(-512,-512)'
      )
      .append('path')
        .attr('d', icon)
        .attr('class', 'geo-glyphicon');

    return g;
  }

//////////////////////////////////////////////////////////////////////////////
/**
 * Initialize the slider widget in the map.
 *
 * @function
 * @returns {geo.gui.sliderWidget}
 * @private
 */
//////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    var svg = m_this.layer().renderer().canvas(),
        x0 = 40,
        y0 = 40 + m_width,
        map = m_this.layer().map();

    // create d3 scales for positioning
    // TODO: make customizable and responsive
    m_xscale = d3.scale.linear().domain([-4, 4]).range([x0, x0 + m_width]);
    m_yscale = d3.scale.linear().domain([0, 1]).range([y0, y0 + m_height]);

    // Create the main group element
    svg = svg.append('g').classed('geo-ui-slider', true);
    m_group = svg;

    // Create + zoom button
    m_plus = svg.append('g');
    m_plus.append('circle')
      .datum({
        fill: 'white',
        stroke: null
      })
      .classed('geo-zoom-in', true)
      .attr('cx', m_xscale(0))
      .attr('cy', m_yscale(0.0) - m_width + 2)
      .attr('r', m_width / 2)
      .style({
        'cursor': 'pointer'
      })
      .on('click', function () {
        var z = map.zoom();
        map.transition({
          zoom: z + 1,
          ease: d3.ease('cubic-in-out'),
          duration: 500
        });
      })
      .on('mousedown', function () {
        d3.event.stopPropagation();
      });

    put_icon(
      m_plusIcon,
      m_plus,
      m_xscale(0),
      m_yscale(0) - m_width + 2,
      m_width + 5
    ).style('cursor', 'pointer')
      .style('pointer-events', 'none')
      .select('path')
      .datum({
        fill: 'black',
        stroke: null
      });

    // Create the - zoom button
    m_minus = svg.append('g');
    m_minus.append('circle')
      .datum({
        fill: 'white',
        stroke: null
      })
      .classed('geo-zoom-out', true)
      .attr('cx', m_xscale(0))
      .attr('cy', m_yscale(1.0) + m_width - 2)
      .attr('r', m_width / 2)
      .style({
        'cursor': 'pointer'
      })
      .on('click', function () {
        var z = map.zoom();
        map.transition({
          zoom: z - 1,
          ease: d3.ease('cubic-in-out'),
          duration: 500
        });
      })
      .on('mousedown', function () {
        d3.event.stopPropagation();
      });

    put_icon(
      m_minusIcon,
      m_minus,
      m_xscale(0),
      m_yscale(1) + m_width - 2,
      m_width + 5
    ).style('cursor', 'pointer')
      .style('pointer-events', 'none')
      .select('path')
      .datum({
        fill: 'black',
        stroke: null
      });

    // Respond to a mouse event on the widget
    function respond(evt, trans) {
      var z = m_yscale.invert(d3.mouse(m_this.layer().node()[0])[1]),
          zrange = map.zoomRange();
      z = (1 - z) * (zrange.max - zrange.min) + zrange.min;
      if (trans) {
        map.transition({
          zoom: z,
          ease: d3.ease('cubic-in-out'),
          duration: 500,
          done: m_this._update()
        });
      } else {
        map.zoom(z);
        m_this._update();
      }
      evt.stopPropagation();
    }

    // Create the track
    m_track = svg.append('rect')
      .datum({
        fill: 'white',
        stroke: 'black'
      })
      .classed('geo-zoom-track', true)
      .attr('x', m_xscale(0) - m_width / 6)
      .attr('y', m_yscale(0))
      .attr('rx', m_width / 10)
      .attr('ry', m_width / 10)
      .attr('width', m_width / 3)
      .attr('height', m_height)
      .style({
        'cursor': 'pointer'
      })
      .on('click', function () {
        respond(d3.event, true);
      });

    // Create the nub
    m_nub = svg.append('rect')
      .datum({
        fill: 'black',
        stroke: null
      })
      .classed('geo-zoom-nub', true)
      .attr('x', m_xscale(-4))
      .attr('y', m_yscale(0.5) - m_nubSize / 2)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', m_width)
      .attr('height', m_nubSize)
      .style({
        'cursor': 'pointer'
      })
      .on('mousedown', function () {
        d3.select(document).on('mousemove.geo.slider', function () {
          respond(d3.event);
        });
        d3.select(document).on('mouseup.geo.slider', function () {
          respond(d3.event);
          d3.select(document).on('.geo.slider', null);
        });
        d3.event.stopPropagation();
      });

    var mouseOver = function () {
      d3.select(this).attr('filter', 'url(#geo-highlight)');
      m_group.selectAll('rect,path,circle').transition()
        .duration(m_highlightDur)
        .style('fill', function (d) {
          return d.fill || null;
        })
        .style('stroke', function (d) {
          return d.stroke || null;
        });

    };

    var mouseOut = function () {
      d3.select(this).attr('filter', null);
      m_group.selectAll('circle,rect,path').transition()
        .duration(m_highlightDur)
        .style('fill', function (d) {
          return m_lowContrast[d.fill] || null;
        })
        .style('stroke', function (d) {
          return m_lowContrast[d.stroke] || null;
        });
    };

    m_group.selectAll('*')
      .on('mouseover', mouseOver)
      .on('mouseout', mouseOut);

    // Update the nub position on zoom
    m_this.layer().geoOn(geo.event.zoom, function () {
      m_this._update();
    });

    mouseOut();
    m_this._update();
  };

//////////////////////////////////////////////////////////////////////////////
/**
 * Removes the slider element from the map and unbinds all handlers.
 *
 * @function
 * @returns {geo.gui.sliderWidget}
 * @private
 */
//////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_group.remove();
    m_this.layer().geoOff(geo.event.zoom);
    s_exit();
  };

//////////////////////////////////////////////////////////////////////////////
/**
 * Update the slider widget state in reponse to map changes.  I.e. zoom
 * range changes.
 *
 * @function
 * @returns {geo.gui.sliderWidget}
 * @private
 */
//////////////////////////////////////////////////////////////////////////////
  this._update = function (obj) {
    var map = m_this.layer().map(),
        zoomRange = map.zoomRange(),
        zoom = map.zoom(),
        zoomScale = d3.scale.linear();

    obj = obj || {};
    zoom = obj.value || zoom;
    zoomScale.domain([zoomRange.min, zoomRange.max])
      .range([1, 0])
      .clamp(true);

    m_nub.attr('y', m_yscale(zoomScale(zoom)) - m_nubSize / 2);
  };
};

inherit(geo.gui.sliderWidget, geo.gui.widget);

geo.registerWidget('d3', 'slider', geo.gui.sliderWidget);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class legendWidget
 *
 * @class
 * @extends geo.gui.widget
 * @returns {geo.gui.legendWidget}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui.legendWidget = function (arg) {
  'use strict';
  if (!(this instanceof geo.gui.legendWidget)) {
    return new geo.gui.legendWidget(arg);
  }
  geo.gui.widget.call(this, arg);

  /** @private */
  var m_this = this,
      m_categories = [],
      m_top = null,
      m_group = null,
      m_border = null,
      m_spacing = 20, // distance in pixels between lines
      m_padding = 12; // padding in pixels inside the border

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the category array associated with
   * the legend.  Each element of this array is
   * an object: ::
   *     {
   *         name: string,
   *         style: object,
   *         type: 'point' | 'line' | ...
   *     }
   *
   * The style property can contain the following feature styles:
   *     * fill: bool
   *     * fillColor: object | string
   *     * fillOpacity: number
   *     * stroke: bool
   *     * strokeColor: object | string
   *     * strokeWidth: number
   *     * strokeOpacity: number
   *
   * The type controls how the element is displayed, point as a circle,
   * line as a line segment.  Any other value will display as a rounded
   * rectangle.
   *
   * @param {object[]?} categories The categories to display
   */
  //////////////////////////////////////////////////////////////////////////////
  this.categories = function (arg) {
    if (arg === undefined) {
      return m_categories.slice();
    }
    m_categories = arg.slice().map(function (d) {
      if (d.type === 'line') {
        d.style.fill = false;
        d.style.stroke = true;
      }
      return d;
    });
    m_this.draw();
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get the widget's size
   * @return {{width: number, height: number}} The size in pixels
   */
  //////////////////////////////////////////////////////////////////////////////
  this.size = function () {
    var width = 1, height;
    var test =  m_this.layer().renderer().canvas().append('text')
      .style('opacity', 1e-6);

    m_categories.forEach(function (d) {
      test.text(d.name);
      width = Math.max(width, test.node().getBBox().width);
    });
    test.remove();

    height = m_spacing * (m_categories.length + 1);
    return {
      width: width + 50,
      height: height
    };
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Redraw the legend
   */
  //////////////////////////////////////////////////////////////////////////////
  this.draw = function () {

    m_this._init();
    function applyColor(selection) {
      selection.style('fill', function (d) {
          if (d.style.fill || d.style.fill === undefined) {
            return d.style.fillColor;
          } else {
            return 'none';
          }
        })
        .style('fill-opacity', function (d) {
          if (d.style.fillOpacity === undefined) {
            return 1;
          }
          return d.style.fillOpacity;
        })
        .style('stroke', function (d) {
          if (d.style.stroke || d.style.stroke === undefined) {
            return d.style.strokeColor;
          } else {
            return 'none';
          }
        })
        .style('stroke-opacity', function (d) {
          if (d.style.strokeOpacity === undefined) {
            return 1;
          }
          return d.style.strokeOpacity;
        })
        .style('stroke-width', function (d) {
          if (d.style.strokeWidth === undefined) {
            return 1.5;
          }
          return d.style.strokeWidth;
        });
    }

    m_border.attr('height', m_this.size().height + 2 * m_padding)
      .style('display', null);

    var scale = m_this._scale();

    var labels = m_group.selectAll('g.geo-label')
      .data(m_categories, function (d) { return d.name; });

    var g = labels.enter().append('g')
      .attr('class', 'geo-label')
      .attr('transform', function (d, i) {
        return 'translate(0,' + scale.y(i) + ')';
      });

    applyColor(g.filter(function (d) {
        return d.type !== 'point' && d.type !== 'line';
      }).append('rect')
        .attr('x', 0)
        .attr('y', -6)
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('width', 40)
        .attr('height', 12)
    );

    applyColor(g.filter(function (d) {
        return d.type === 'point';
      }).append('circle')
        .attr('cx', 20)
        .attr('cy', 0)
        .attr('r', 6)
    );

    applyColor(g.filter(function (d) {
        return d.type === 'line';
      }).append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 40)
        .attr('y2', 0)
    );

    g.append('text')
      .attr('x', '50px')
      .attr('y', 0)
      .attr('dy', '0.3em')
      .text(function (d) {
        return d.name;
      });

    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get scales for the x and y axis for the current size.
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._scale = function () {
    return {
      x: d3.scale.linear()
        .domain([0, 1])
        .range([0, m_this.size().width]),
      y: d3.scale.linear()
        .domain([0, m_categories.length - 1])
        .range([m_padding / 2, m_this.size().height - m_padding / 2])
    };
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Private initialization.  Creates the widget's DOM container and internal
   * variables.
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    var w = m_this.size().width + 2 * m_padding,
        h = m_this.size().height + 2 * m_padding,
        nw = m_this.layer().map().node().width(),
        margin = 20;
    if (m_top) {
      m_top.remove();
    }
    m_top = m_this.layer().renderer().canvas().append('g')
        .attr('transform', 'translate(' + (nw - w - margin) + ',' + margin + ')');
    m_group = m_top
      .append('g')
        .attr('transform', 'translate(' + [m_padding - 1.5, m_padding] + ')');
    m_border = m_group.append('rect')
      .attr('x', -m_padding)
      .attr('y', -m_padding)
      .attr('width', w)
      .attr('height', h)
      .attr('rx', 3)
      .attr('ry', 3)
      .style({
        'stroke': 'black',
        'stroke-width': '1.5px',
        'fill': 'white',
        'fill-opacity': 0.75,
        'display': 'none'
      });
    m_group.on('mousedown', function () {
      d3.event.stopPropagation();
    });
    m_group.on('mouseover', function () {
      m_border.transition()
        .duration(250)
        .style('fill-opacity', 1);
    });
    m_group.on('mouseout', function () {
      m_border.transition()
        .duration(250)
        .style('fill-opacity', 0.75);
    });
  };

  this.geoOn(geo.event.resize, function () {
    this.draw();
  });

};

inherit(geo.gui.legendWidget, geo.gui.widget);

geo.registerWidget('d3', 'legend', geo.gui.legendWidget);

/*jscs:disable validateIndentation*/
(function ($, geo, d3) {
  'use strict';

  var load = function () {

  // This requires jquery ui, which we don't want to make a
  // hard requirement, so bail out here if the widget factory
  // is not available and throw a helpful message when the
  // tries to use it.
  if (!$.widget) {
    $.fn.geojsMap = function () {
      throw new Error(
        'The geojs jquery plugin requires jquery ui to be available.'
      );
    };
    return;
  }

  /**
   * Takes an option key and returns true if it should
   * return a color accessor.
   * @private
   */
  function isColorKey(key) {
    return key.slice(key.length - 5, key.length)
      .toLowerCase() === 'color';
  }

  /**
   * Take an array of data and an accessor for a color property
   * and return a wrapped accessor mapping to actual color
   * values.  This allows users to pass arbitrary strings
   * or numbers as any color property and this will wrap
   * a categorical scale or linear scale.
   *
   * Requires d3
   * @private
   * @param {Object[]} data A data array
   * @param {(string|number|function)} acc A color accessor
   * @return {function}
   */
  function makeColorScale(data, acc) {
    if (!d3) {
      console.warn('d3 is unavailable, cannot apply color scales.');
      return acc;
    }
    var domain;
    var cannotHandle = false;
    var doNotHandle = true;
    var categorical = false;
    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;

    function wrap(func) {
      if (geo.util.isFunction(func)) {
        return function () {
          return func(acc.apply(this, arguments));
        };
      } else {
        return func(acc);
      }
    }

    if (geo.util.isFunction(acc)) {
      domain = d3.set(data.map(acc)).values();
    } else {
      domain = [acc];
    }
    domain.forEach(function (v) {
      if (!(typeof v === 'string' &&
            typeof geo.util.convertColor(v) === 'object')) {
        // This is to handle cases when values are css names or
        // hex strings.  We don't want to apply a categorical
        // scale.
        doNotHandle = false;
      }
      if (typeof v === 'string') {
        categorical = true;
      } else if (!isFinite(v)) {
        cannotHandle = true;
      } else if (+v > max) {
        max = +v;
      } else if (+v < min) {
        min = +v;
      }
    });
    if (cannotHandle) {
      // At least one value is not a string or a numeric value.
      // Pass the bare accessor back to geojs to handle it.
      return acc;
    }
    if (doNotHandle) {
      return acc;
    }
    if (categorical) {
      if (domain.length <= 10) {
        return wrap(d3.scale.category10().domain(domain));
      } else if (domain.length <= 20) {
        return wrap(d3.scale.category20().domain(domain));
      } else {
        // TODO: sort domain by most used and make an "other" category
        return wrap(d3.scale.category20().domain(domain));
      }
    }
    // http://colorbrewer2.org/?type=diverging&scheme=RdYlBu&n=3
    return wrap(d3.scale.linear()
      .range([
        'rgb(252,141,89)',
        'rgb(255,255,191)',
        'rgb(145,191,219)'
      ])
      .domain([
        min,
        (min + max) / 2,
        max
      ]));
  }

  /**
   * @class geojsMap
   * @memberOf jQuery.fn
   *
   * @description Generates a geojs map inside an element.
   *
   *
   * Due to current limitations in geojs, only a single map can be instantiated
   * on a page.  Trying to create a second map will throw an error
   * (see issue
   * <a href="https://github.com/OpenGeoscience/geojs/issues/154">#154</a>).
   *
   * @example <caption>Create a map with the default options.</caption>
   * $("#map").geojsMap();
   * @example <caption>Create a map with a given initial center and zoom</caption>
   * $("#map").geojsMap({
   *    longitude: -125,
   *    latitude: 35,
   *    zoom: 5
   * });
   * @example <caption>Create a map with points</caption>
   * $("#map").geojsMap({
   *   data: [...],
   *   layers: [{
   *     renderer: 'vgl',
   *     features: [{
   *       type: 'point',
   *       radius: 5,
   *       position: function (d) { return {x: d.geometry.x, y: d.geometry.y} },
   *       fillColor: function (d, i) { return i < 5 ? 'red' : 'blue' },
   *       stroke: false
   *     }]
   *   }]
   * };
   * @example <caption>Create a map with points, lines and multiple layers</caption>
   * $("#map").geojsMap({
   *   center: { x: -130, y: 40 },
   *   zoom: 3,
   *   layers: [{
   *     renderer: 'vgl',
   *     features: [{
   *       data: [...],
   *       type: 'point',
   *       radius: 5,
   *       position: function (d) { return {x: d.geometry.x, y: d.geometry.y} },
   *       fillColor: function (d, i) { return i < 5 ? 'red' : 'blue' },
   *       stroke: false
   *     }]
   *   },
   *   {
   *      renderer: 'd3',
   *      features[{
   *        data: [...],
   *        type: 'line',
   *        position: function (d) { return { x: d[0], y: d[1] } },
   *        line: function (d) { return d.coordinates; },
   *        strokeWidth: 3,
   *        strokeColor: 'black',
   *        strokeOpacity: 0.5
   *      }]
   *   }]
   * };
   */
  // jscs:disable requireSpaceBetweenArguments
  $.widget('geojs.geojsMap', /** @lends jQuery.fn.geojsMap */{
  // jscs:enable requireSpaceBetweenArguments
    /**
     * A coordinate object as accepted by geojs to express positions in an
     * arbitrary coordinate system (geographic, screen, etc).  Coordinates returned by
     * geojs methods are always expressed with "x" and "y" properties, but
     * it will accept any of the aliased properties.
     * @typedef coordinate
     * @type {object}
     * @property {number} longitude Alias: "x", "lng", or "lon"
     * @property {number} latitude Alias: "y" or "lat"
     * @property {number} [elevation=0] Alias: "z", "elev", or "height"
     */

    /**
     * Colors can be expressed in multiple ways:
     * <ul>
     *   <li>css name (<code>"steelblue"</code>)</li>
     *   <li>24 bit hex value (<code>0xff0051</code>)</li>
     *   <li>25 bit hex string (<code>"#ff0051"</code>)</li>
     *   <li>rgb object (values from 0-1, <code>{r: 1, g: 0.5, b: 0}</code>)</li>
     * </ul>
     * @typedef color
     * @type {*}
     */

    /**
     * Point feature options object.  All styles can be
     * given as accessor functions or constants.  Accessor
     * functions are called with the following signature:
     * <pre>
     *     function func(d, i) {
     *         // d    - data object
     *         // i    - index of d in the data array
     *         // this - geo.pointFeature
     *     }
     * </pre>
     * Pass null to remove saved options from previous calls.
     * @typedef pointOptions
     * @type {Object}
     * @property {Object[]} data Data array
     * @property {coordinate} position Location of the point center
     * @property {number} radius
     *  Radius of the circle in pixels (ignored when <code>size</code>
     *  is present)
     * @property {function} size
     *   A function returning a numerical value
     * @property {boolean} fill Presence or absence of the fill
     * @property {color} fillColor Interior color
     * @property {float} fillOpacity Opacity of the interior <code>[0,1]</code>
     * @property {boolean} stroke Presence or absence of the stroke
     * @property {color} strokeColor Stroke color
     * @property {float} strokeOpacity Opacity of the stroke <code>[0,1]</code>
     */

    /**
     * @instance
     * @description
     * Map options (not fully implemented).
     * @example <caption>Get the current map center</caption>
     * var center=$("#map").geojsMap("center");
     * @example <caption>Pan the map to a new center</caption>
     * $("#map").geojsMap("center", {lat: 10, lng: -100});
     * @property {object[]} [data=[]] The default data array used for
     * features/layers not already containing data.
     * @property {coordinate} [center={lat: 0, lng: 0}] The map center
     * @property {number} [zoom=0] The zoom level (floating point >= 0)
     * @property {(number|null)} [width=null]
     *   The width of the map in pixels or null for 100%
     * @property {(number|null)} [height=null]
     *   The height of the map in pixels or null for 100%
     * @property {geo.layer.spec[]} [layers=[]]
     *   Describes layers added to the map
     * @property {boolean} [autoresize=true]
     *   Resize the map on <code>window.resize</code> (initialization only)
     * @property {string} [tileServer]
     *   The open street map tile server spec default:
     *   <code>http://tile.openstreetmap.org/<zoom>/<x>/<y>.png</code>
     */
    options: {
      center: {latitude: 0, longitude: 0},
      zoom: 0,
      width: null,
      height: null,
      layers: [],
      data: [],
      tileUrl: 'http://tile.openstreetmap.org/<zoom>/<x>/<y>.png',

      // These options are for future use, but shouldn't
      // be changed at the moment, so they aren't documented.
      baseLayer: 'osm',
      baseRenderer: 'vgl'
    },

    /**
     * Internal constructor
     * @instance
     * @protected
     */
    _create: function () {
      if (this._map || !this.element.length) {
        // when called multiple times on a single element, do nothing
        return;
      }

      // create the map
      this._map = geo.map({
        width: this.options.width,
        height: this.options.height,
        zoom: this.options.zoom,
        center: this.options.center,
        node: this.element.get(0)
      });

      // create the base layer
      this._baseLayer = this._map.createLayer(
        this.options.baseLayer,
        {
          renderer: this.options.baseRenderer,
          tileUrl: this.options.tileUrl
        }
      );

      // Trigger a resize to a valid size before adding
      // the feature layer to handle some of the bugs that
      // occur when initializing onto a node of size 0.
      this._resize({width: 800, height: 600});

      this._layers = [];
      this.update();
    },

    /**
     * Update the layers and features using a new array of
     * {@link geo.layer.spec} objects.  All existing layers
     * and features are deleted.  If only the data has changed,
     * you can usually just call {@link jQuery.fn.geojsMap#redraw redraw}.
     * @instance
     * @param {geo.layer.spec[]} [layers] New map layers
     * @example <caption>Delete and recreate all existing layers</caption>
     * $("#map").geojsMap("update");
     * @example <caption>Remove all existing feature layers.</caption>
     * $("#map").geojsMap("update", []);
     */
    update: function (layers) {
      var m_this = this;
      this.options.layers = layers || this.options.layers || [];

      // delete existing layers
      this._layers.forEach(function (layer) {
        layer.clear();
        m_this._map.deleteLayer(layer);
      });

      // create new layers
      this._layers = this.options.layers.map(function (layer) {
        layer.data = layer.data || m_this.options.data;

        // Until auto color scaling gets moved into geojs core, we will
        // mutate the spec and replace the color and radius options.
        (layer.features || []).forEach(function (feature) {
          var data = feature.data || layer.data || [];
          var scl;
          if (feature.type === 'point') {
            if (feature.size) {
              feature._size = geo.util.ensureFunction(feature.size);
            } else if (feature.size === null) {
              delete feature._size;
            }

            if (data.length && feature._size) {
              scl = d3.scale.linear()
                .domain(
                  d3.extent(data, feature._size)
                )
                .range([5, 20]);
              feature.radius = function () {
                // TODO: wrong `this` (wait for style refactor)
                return scl(feature._size.apply(this, arguments));
              };
            }
            delete feature.size;
          }

          var key;
          for (key in feature) {
            if (feature.hasOwnProperty(key) &&
                isColorKey(key)) {
              feature[key] = makeColorScale(data, feature[key]);
            }
          }
        });
        return geo.layer.create(m_this._map, layer);
      });

      // trigger an initial draw
      this.redraw();

      return this;
    },

    /**
     * Return the geojs map object.
     * @instance
     * @returns {geo.map}
     */
    map: function () {
      return this._map;
    },

    /**
     * Set the tile server URL.
     * @instance
     * @param {string} url The url format string of an OSM tile server.
     */
    tileUrl: function (url) {
      this._baseLayer.tileUrl(url);
      this._baseLayer.updateBaseUrl();
      return this;
    },

    /**
     * Resize the map canvas.
     * @instance
     * @protected
     * @param {object?} size Explicit size or use this.options.
     */
    _resize: function (size) {
      var width = this.options.width,
          height = this.options.height;
      if (size) {
        width = size.width;
        height = size.height;
      }
      if (!width) {
        width = this.element.width();
      }
      if (!height) {
        height = this.element.height();
      }
      this._map.resize(0, 0, width, height);
    },

    /**
     * Do a full redraw of the map.  In general, users shouldn't need to
     * call this method, but it could be useful when accessing lower
     * level features of the mapping api.
     * @todo This function may need to go through each feature and call
     * {@link geo.feature#modified} to properly update.
     * @instance
     */
    redraw: function () {
      this._resize();
      return this;
    }
  });

  // Some argument type definitions used only by this plugin:
  /**
   * A geojs renderer is one of the following:
   * <ul>
   *   <li><code>"vgl"</code>: Uses webGL</li>
   *   <li><code>"d3"</code>: Uses svg</li>
   * </ul>
   * @typedef renderer
   * @type {string}
   */

  };

  $(load);
})($ || window.$, geo || window.geo, d3 || window.d3);
