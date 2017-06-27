/*

    P R O C E S S I N G . J S - @VERSION@
    a port of the Processing visualization language

    License       : MIT
    Developer     : John Resig: http://ejohn.org
    Web Site      : http://processingjs.org
    Java Version  : http://processing.org
    Github Repo.  : http://github.com/jeresig/processing-js
    Bug Tracking  : http://processing-js.lighthouseapp.com
    Mozilla POW!  : http://wiki.Mozilla.org/Education/Projects/ProcessingForTheWeb
    Maintained by : Seneca: http://zenit.senecac.on.ca/wiki/index.php/Processing.js
                    Hyper-Metrix: http://hyper-metrix.com/#Processing
                    BuildingSky: http://weare.buildingsky.net/pages/processing-js

 */

(function() {

  var undef; // intentionally left undefined

  var ajax = function ajax(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType("text/plain");
    }
    xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 1960 00:00:00 GMT");
    xhr.send(null);
    // failed request?
    if (xhr.status !== 200 && xhr.status !== 0) { throw ("XMLHttpRequest failed, status code " + xhr.status); }
    return xhr.responseText;
  };

  var isDOMPresent = ("document" in this) && !("fake" in this.document);

  /* Browsers fixes start */
  function fixReplaceByRegExp() {
    var re = /t/g;
    if ("t".replace(re,"") !== null && re.exec("t")) {
      return; // it is not necessary
    }
    var _ie_replace = String.prototype.replace;
    String.prototype.replace = function(searchValue, repaceValue) {
      var result = _ie_replace.apply(this, arguments);
      if (searchValue instanceof RegExp && searchValue.global) {
        searchValue.lastIndex = 0;
      }
      return result;
    };
  }

  function fixMatchByRegExp() {
    var re = /t/g;
    if ("t".match(re) !== null && re.exec("t")) {
      return; // it is not necessary
    }
    var _ie_match = String.prototype.match;
    String.prototype.match = function(searchValue) {
      var result = _ie_match.apply(this, arguments);
      if(searchValue instanceof RegExp && searchValue.global) {
        searchValue.lastIndex = 0;
      }
      return result;
    };
  }
  fixReplaceByRegExp();
  fixMatchByRegExp();

  (function fixOperaCreateImageData() {
    try {
      if (!("createImageData" in CanvasRenderingContext2D.prototype)) {
        CanvasRenderingContext2D.prototype.createImageData = function (sw, sh) {
          return new ImageData(sw, sh);
        };
      }
    } catch(e) {}
  }());
  /* Browsers fixes end */

  var PConstants = {
    X: 0,
    Y: 1,
    Z: 2,

    R: 3,
    G: 4,
    B: 5,
    A: 6,

    U: 7,
    V: 8,

    NX: 9,
    NY: 10,
    NZ: 11,

    EDGE: 12,

    // Stroke
    SR: 13,
    SG: 14,
    SB: 15,
    SA: 16,

    SW: 17,

    // Transformations (2D and 3D)
    TX: 18,
    TY: 19,
    TZ: 20,

    VX: 21,
    VY: 22,
    VZ: 23,
    VW: 24,

    // Material properties
    AR: 25,
    AG: 26,
    AB: 27,

    DR: 3,
    DG: 4,
    DB: 5,
    DA: 6,

    SPR: 28,
    SPG: 29,
    SPB: 30,

    SHINE: 31,

    ER: 32,
    EG: 33,
    EB: 34,

    BEEN_LIT: 35,

    VERTEX_FIELD_COUNT: 36,

    // Renderers
    P2D:    1,
    JAVA2D: 1,
    WEBGL:  2,
    P3D:    2,
    OPENGL: 2,
    PDF:    0,
    DXF:    0,

    // Platform IDs
    OTHER:   0,
    WINDOWS: 1,
    MAXOSX:  2,
    LINUX:   3,

    EPSILON: 0.0001,

    MAX_FLOAT:  3.4028235e+38,
    MIN_FLOAT: -3.4028235e+38,
    MAX_INT:    2147483647,
    MIN_INT:   -2147483648,

    PI:         Math.PI,
    TWO_PI:     2 * Math.PI,
    HALF_PI:    Math.PI / 2,
    THIRD_PI:   Math.PI / 3,
    QUARTER_PI: Math.PI / 4,

    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,

    WHITESPACE: " \t\n\r\f\u00A0",

    // Color modes
    RGB:   1,
    ARGB:  2,
    HSB:   3,
    ALPHA: 4,
    CMYK:  5,

    // Image file types
    TIFF:  0,
    TARGA: 1,
    JPEG:  2,
    GIF:   3,

    // Filter/convert types
    BLUR:      11,
    GRAY:      12,
    INVERT:    13,
    OPAQUE:    14,
    POSTERIZE: 15,
    THRESHOLD: 16,
    ERODE:     17,
    DILATE:    18,

    // Blend modes
    REPLACE:    0,
    BLEND:      1 << 0,
    ADD:        1 << 1,
    SUBTRACT:   1 << 2,
    LIGHTEST:   1 << 3,
    DARKEST:    1 << 4,
    DIFFERENCE: 1 << 5,
    EXCLUSION:  1 << 6,
    MULTIPLY:   1 << 7,
    SCREEN:     1 << 8,
    OVERLAY:    1 << 9,
    HARD_LIGHT: 1 << 10,
    SOFT_LIGHT: 1 << 11,
    DODGE:      1 << 12,
    BURN:       1 << 13,

    // Color component bit masks
    ALPHA_MASK: 0xff000000,
    RED_MASK:   0x00ff0000,
    GREEN_MASK: 0x0000ff00,
    BLUE_MASK:  0x000000ff,

    // Projection matrices
    CUSTOM:       0,
    ORTHOGRAPHIC: 2,
    PERSPECTIVE:  3,

    // Shapes
    POINT:          2,
    POINTS:         2,
    LINE:           4,
    LINES:          4,
    TRIANGLE:       8,
    TRIANGLES:      9,
    TRIANGLE_STRIP: 10,
    TRIANGLE_FAN:   11,
    QUAD:           16,
    QUADS:          16,
    QUAD_STRIP:     17,
    POLYGON:        20,
    PATH:           21,
    RECT:           30,
    ELLIPSE:        31,
    ARC:            32,
    SPHERE:         40,
    BOX:            41,

    GROUP:          0,
    PRIMITIVE:      1,
    //PATH:         21, // shared with Shape PATH
    GEOMETRY:       3,

    // Shape Vertex
    VERTEX:        0,
    BEZIER_VERTEX: 1,
    CURVE_VERTEX:  2,
    BREAK:         3,
    CLOSESHAPE:    4,

    // Shape closing modes
    OPEN:  1,
    CLOSE: 2,

    // Shape drawing modes
    CORNER:          0, // Draw mode convention to use (x, y) to (width, height)
    CORNERS:         1, // Draw mode convention to use (x1, y1) to (x2, y2) coordinates
    RADIUS:          2, // Draw mode from the center, and using the radius
    CENTER_RADIUS:   2, // Deprecated! Use RADIUS instead
    CENTER:          3, // Draw from the center, using second pair of values as the diameter
    DIAMETER:        3, // Synonym for the CENTER constant. Draw from the center
    CENTER_DIAMETER: 3, // Deprecated! Use DIAMETER instead

    // Text vertical alignment modes
    BASELINE: 0,   // Default vertical alignment for text placement
    TOP:      101, // Align text to the top
    BOTTOM:   102, // Align text from the bottom, using the baseline

    // UV Texture coordinate modes
    NORMAL:     1,
    NORMALIZED: 1,
    IMAGE:      2,

    // Text placement modes
    MODEL: 4,
    SHAPE: 5,

    // Stroke modes
    SQUARE:  'butt',
    ROUND:   'round',
    PROJECT: 'square',
    MITER:   'miter',
    BEVEL:   'bevel',

    // Lighting modes
    AMBIENT:     0,
    DIRECTIONAL: 1,
    //POINT:     2, Shared with Shape constant
    SPOT:        3,

    // Key constants

    // Both key and keyCode will be equal to these values
    BACKSPACE: 8,
    TAB:       9,
    ENTER:     10,
    RETURN:    13,
    ESC:       27,
    DELETE:    127,
    CODED:     0xffff,

    // p.key will be CODED and p.keyCode will be this value
    SHIFT:     16,
    CONTROL:   17,
    ALT:       18,
    CAPSLK:    20,
    PGUP:      33,
    PGDN:      34,
    END:       35,
    HOME:      36,
    LEFT:      37,
    UP:        38,
    RIGHT:     39,
    DOWN:      40,
    INS:       45,
    DEL:       46,
    F1:        112,
    F2:        113,
    F3:        114,
    F4:        115,
    F5:        116,
    F6:        117,
    F7:        118,
    F8:        119,
    F9:        120,
    F10:       121,
    F11:       122,
    F12:       123,
    NUMLK:     144,

    // Cursor types
    ARROW:    'default',
    CROSS:    'crosshair',
    HAND:     'pointer',
    MOVE:     'move',
    TEXT:     'text',
    WAIT:     'wait',
    NOCURSOR: "url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto",

    // Hints
    DISABLE_OPENGL_2X_SMOOTH:     1,
    ENABLE_OPENGL_2X_SMOOTH:     -1,
    ENABLE_OPENGL_4X_SMOOTH:      2,
    ENABLE_NATIVE_FONTS:          3,
    DISABLE_DEPTH_TEST:           4,
    ENABLE_DEPTH_TEST:           -4,
    ENABLE_DEPTH_SORT:            5,
    DISABLE_DEPTH_SORT:          -5,
    DISABLE_OPENGL_ERROR_REPORT:  6,
    ENABLE_OPENGL_ERROR_REPORT:  -6,
    ENABLE_ACCURATE_TEXTURES:     7,
    DISABLE_ACCURATE_TEXTURES:   -7,
    HINT_COUNT:                  10,

    // PJS defined constants
    SINCOS_LENGTH:      parseInt(360 / 0.5, 10),
    PRECISIONB:         15, // fixed point precision is limited to 15 bits!!
    PRECISIONF:         1 << 15,
    PREC_MAXVAL:        (1 << 15) - 1,
    PREC_ALPHA_SHIFT:   24 - 15,
    PREC_RED_SHIFT:     16 - 15,
    NORMAL_MODE_AUTO:   0,
    NORMAL_MODE_SHAPE:  1,
    NORMAL_MODE_VERTEX: 2,
    MAX_LIGHTS:         8
  };

  // Typed Arrays: fallback to WebGL arrays or Native JS arrays if unavailable
  function setupTypedArray(name, fallback) {
    // check if TypedArray exists
    // typeof on Minefield and Chrome return function, typeof on Webkit returns object.
    if (typeof this[name] !== "function" && typeof this[name] !== "object") {
      // nope.. check if WebGLArray exists
      if (typeof this[fallback] === "function") {
        this[name] = this[fallback];
      } else {
        // nope.. set as Native JS array
        this[name] = function(obj) {
          if (obj instanceof Array) {
            return obj;
          } else if (typeof obj === "number") {
            var arr = [];
            arr.length = obj;
            return arr;
          }
        };
      }
    }
  }

  setupTypedArray("Float32Array", "WebGLFloatArray");
  setupTypedArray("Int32Array",   "WebGLIntArray");
  setupTypedArray("Uint16Array",  "WebGLUnsignedShortArray");
  setupTypedArray("Uint8Array",   "WebGLUnsignedByteArray");

  /**
   * Returns Java hashCode() result for the object. If the object has the "hashCode" function,
   * it preforms the call of this function. Otherwise it uses/creates the "$id" property,
   * which is used as the hashCode.
   *
   * @param {Object} obj          The object.
   * @returns {int}               The object's hash code.
   */
  function virtHashCode(obj) {
    if (obj.constructor === String) {
      var hash = 0;
      for (var i = 0; i < obj.length; ++i) {
        hash = (hash * 31 + obj.charCodeAt(i)) & 0xFFFFFFFF;
      }
      return hash;
    } else if (typeof(obj) !== "object") {
      return obj & 0xFFFFFFFF;
    } else if (obj.hashCode instanceof Function) {
      return obj.hashCode();
    } else {
      if (obj.$id === undef) {
        obj.$id = ((Math.floor(Math.random() * 0x10000) - 0x8000) << 16) | Math.floor(Math.random() * 0x10000);
      }
      return obj.$id;
    }
  }

  /**
   * Returns Java equals() result for two objects. If the first object
   * has the "equals" function, it preforms the call of this function.
   * Otherwise the method uses the JavaScript === operator.
   *
   * @param {Object} obj          The first object.
   * @param {Object} other        The second object.
   *
   * @returns {boolean}           true if the objects are equal.
   */
  function virtEquals(obj, other) {
    if (obj === null || other === null) {
      return (obj === null) && (other === null);
    } else if (obj.constructor === String) {
      return obj === other;
    } else if (typeof(obj) !== "object") {
      return obj === other;
    } else if (obj.equals instanceof Function) {
      return obj.equals(other);
    } else {
      return obj === other;
    }
  }

  /**
   * An ArrayList stores a variable number of objects.
   *
   * @param {int} initialCapacity optional defines the initial capacity of the list, it's empty by default
   *
   * @returns {ArrayList} new ArrayList object
   */
  var ArrayList = (function() {
    function Iterator(array) {
      var index = 0;
      this.hasNext = function() {
        return index < array.length;
      };

      this.next = function() {
        return array[index++];
      };

      this.remove = function() {
        array.splice(index, 1);
      };
    }

    function ArrayList() {
      var array;
      if (arguments.length === 0) {
        array = [];
      } else if (arguments.length > 0 && typeof arguments[0] !== 'number') {
        array = arguments[0];
      } else {
        array = [];
        array.length = 0 | arguments[0];
      }

      /**
       * @member ArrayList
       * ArrayList.get() Returns the element at the specified position in this list.
       *
       * @param {int} i index of element to return
       *
       * @returns {Object} the element at the specified position in this list.
       */
      this.get = function(i) {
        return array[i];
      };
      /**
       * @member ArrayList
       * ArrayList.contains() Returns true if this list contains the specified element.
       *
       * @param {Object} item element whose presence in this List is to be tested.
       *
       * @returns {boolean} true if the specified element is present; false otherwise.
       */
      this.contains = function(item) {
        for (var i = 0, len = array.length; i < len; ++i) {
          if (virtEquals(item, array[i])) {
            return true;
          }
        }
        return false;
      };
      /**
       * @member ArrayList
       * ArrayList.add() Adds the specified element to this list.
       *
       * @param {int}    index  optional index at which the specified element is to be inserted
       * @param {Object} object element to be added to the list
       */
      this.add = function() {
        if (arguments.length === 1) {
          array.push(arguments[0]); // for add(Object)
        } else if (arguments.length === 2) {
          var arg0 = arguments[0];
          if (typeof arg0 === 'number') {
            if (arg0 >= 0 && arg0 <= array.length) {
              array.splice(arg0, 0, arguments[1]); // for add(i, Object)
            } else {
              throw(arg0 + " is not a valid index");
            }
          } else {
            throw(typeof arg0 + " is not a number");
          }
        } else {
          throw("Please use the proper number of parameters.");
        }
      };

      /**
       * @member ArrayList
       * ArrayList.set() Replaces the element at the specified position in this list with the specified element.
       *
       * @param {int}    index  index of element to replace
       * @param {Object} object element to be stored at the specified position
       */
      this.set = function() {
        if (arguments.length === 2) {
          var arg0 = arguments[0];
          if (typeof arg0 === 'number') {
            if (arg0 >= 0 && arg0 < array.length) {
              array.splice(arg0, 1, arguments[1]);
            } else {
              throw(arg0 + " is not a valid index.");
            }
          } else {
            throw(typeof arg0 + " is not a number");
          }
        } else {
          throw("Please use the proper number of parameters.");
        }
      };

      /**
       * @member ArrayList
       * ArrayList.size() Returns the number of elements in this list.
       *
       * @returns {int} the number of elements in this list
       */
      this.size = function() {
        return array.length;
      };

      /**
       * @member ArrayList
       * ArrayList.clear() Removes all of the elements from this list. The list will be empty after this call returns.
       */
      this.clear = function() {
        array.length = 0;
      };

      /**
       * @member ArrayList
       * ArrayList.remove() Removes the element at the specified position in this list.
       * Shifts any subsequent elements to the left (subtracts one from their indices).
       *
       * @param {int} index the index of the element to removed.
       *
       * @returns {Object} the element that was removed from the list
       */
      this.remove = function(i) {
        return array.splice(i, 1)[0];
      };

      /**
       * @member ArrayList
       * ArrayList.isEmpty() Tests if this list has no elements.
       *
       * @returns {boolean} true if this list has no elements; false otherwise
       */
      this.isEmpty = function() {
         return !array.length;
      };

      /**
       * @member ArrayList
       * ArrayList.clone() Returns a shallow copy of this ArrayList instance. (The elements themselves are not copied.)
       *
       * @returns {ArrayList} a clone of this ArrayList instance
       */
      this.clone = function() {
        return new ArrayList(array.slice(0));
      };

      /**
       * @member ArrayList
       * ArrayList.toArray() Returns an array containing all of the elements in this list in the correct order.
       *
       * @returns {Object[]} Returns an array containing all of the elements in this list in the correct order
       */
      this.toArray = function() {
        return array.slice(0);
      };

      this.iterator = function() {
        return new Iterator(array);
      };
    }

    return ArrayList;
  }());

  /**
  * A HashMap stores a collection of objects, each referenced by a key. This is similar to an Array, only
  * instead of accessing elements with a numeric index, a String  is used. (If you are familiar with
  * associative arrays from other languages, this is the same idea.)
  *
  * @param {int} initialCapacity          defines the initial capacity of the map, it's 16 by default
  * @param {float} loadFactor             the load factor for the map, the default is 0.75
  * @param {Map} m                        gives the new HashMap the same mappings as this Map
  */
  var HashMap = (function() {
    /**
    * @member HashMap
    * A HashMap stores a collection of objects, each referenced by a key. This is similar to an Array, only
    * instead of accessing elements with a numeric index, a String  is used. (If you are familiar with
    * associative arrays from other languages, this is the same idea.)
    *
    * @param {int} initialCapacity          defines the initial capacity of the map, it's 16 by default
    * @param {float} loadFactor             the load factor for the map, the default is 0.75
    * @param {Map} m                        gives the new HashMap the same mappings as this Map
    */
    function HashMap() {
      if (arguments.length === 1 && arguments[0].constructor === HashMap) {
        return arguments[0].clone();
      }

      var initialCapacity = arguments.length > 0 ? arguments[0] : 16;
      var loadFactor = arguments.length > 1 ? arguments[1] : 0.75;
      var buckets = [];
      buckets.length = initialCapacity;
      var count = 0;
      var hashMap = this;

      function ensureLoad() {
        if (count <= loadFactor * buckets.length) {
          return;
        }
        var allEntries = [];
        for (var i = 0; i < buckets.length; ++i) {
          if (buckets[i] !== undef) {
            allEntries = allEntries.concat(buckets[i]);
          }
        }
        buckets = [];
        buckets.length = buckets.length * 2;
        for (var j = 0; j < allEntries.length; ++j) {
          var index = virtHashCode(allEntries[j].key) % buckets.length;
          var bucket = buckets[index];
          if (bucket === undef) {
            buckets[index] = bucket = [];
          }
          bucket.push(allEntries[j]);
        }
      }

      function Iterator(conversion, removeItem) {
        var bucketIndex = 0;
        var itemIndex = -1;
        var endOfBuckets = false;

        function findNext() {
          while (!endOfBuckets) {
            ++itemIndex;
            if (bucketIndex >= buckets.length) {
              endOfBuckets = true;
            } else if (buckets[bucketIndex] === undef || itemIndex >= buckets[bucketIndex].length) {
              itemIndex = -1;
              ++bucketIndex;
            } else {
              return;
            }
          }
        }

        /*
        * @member Iterator
        * Checks if the Iterator has more items
        */
        this.hasNext = function() {
          return !endOfBuckets;
        };

        /*
        * @member Iterator
        * Return the next Item
        */
        this.next = function() {
          var result = conversion(buckets[bucketIndex][itemIndex]);
          findNext();
          return result;
        };

        /*
        * @member Iterator
        * Remove the current item
        */
        this.remove = function() {
          removeItem(this.next());
          --itemIndex;
        };

        findNext();
      }

      function Set(conversion, isIn, removeItem) {
        this.clear = function() {
          hashMap.clear();
        };

        this.contains = function(o) {
          return isIn(o);
        };

        this.containsAll = function(o) {
          var it = o.iterator();
          while (it.hasNext()) {
            if (!this.contains(it.next())) {
              return false;
            }
          }
          return true;
        };

        this.isEmpty = function() {
          return hashMap.isEmpty();
        };

        this.iterator = function() {
          return new Iterator(conversion, removeItem);
        };

        this.remove = function(o) {
          if (this.contains(o)) {
            removeItem(o);
            return true;
          }
          return false;
        };

        this.removeAll = function(c) {
          var it = c.iterator();
          var changed = false;
          while (it.hasNext()) {
            var item = it.next();
            if (this.contains(item)) {
              removeItem(item);
              changed = true;
            }
          }
          return true;
        };

        this.retainAll = function(c) {
          var it = this.iterator();
          var toRemove = [];
          while (it.hasNext()) {
            var entry = it.next();
            if (!c.contains(entry)) {
              toRemove.push(entry);
            }
          }
          for (var i = 0; i < toRemove.length; ++i) {
            removeItem(toRemove[i]);
          }
          return toRemove.length > 0;
        };

        this.size = function() {
          return hashMap.size();
        };

        this.toArray = function() {
          var result = [];
          var it = this.iterator();
          while (it.hasNext()) {
            result.push(it.next());
          }
          return result;
        };
      }

      function Entry(pair) {
        this._isIn = function(map) {
          return map === hashMap && (pair.removed === undef);
        };

        this.equals = function(o) {
          return virtEquals(pair.key, o.getKey());
        };

        this.getKey = function() {
          return pair.key;
        };

        this.getValue = function() {
          return pair.value;
        };

        this.hashCode = function(o) {
          return virtHashCode(pair.key);
        };

        this.setValue = function(value) {
          var old = pair.value;
          pair.value = value;
          return old;
        };
      }

      this.clear = function() {
        count = 0;
        buckets = [];
        buckets.length = initialCapacity;
      };

      this.clone = function() {
        var map = new HashMap();
        map.putAll(this);
        return map;
      };

      this.containsKey = function(key) {
        var index = virtHashCode(key) % buckets.length;
        var bucket = buckets[index];
        if (bucket === undef) {
          return false;
        }
        for (var i = 0; i < bucket.length; ++i) {
          if (virtEquals(bucket[i].key, key)) {
            return true;
          }
        }
        return false;
      };

      this.containsValue = function(value) {
        for (var i = 0; i < buckets.length; ++i) {
          var bucket = buckets[i];
          if (bucket === undef) {
            continue;
          }
          for (var j = 0; j < bucket.length; ++j) {
            if (virtEquals(bucket[j].value, value)) {
              return true;
            }
          }
        }
        return false;
      };

      this.entrySet = function() {
        return new Set(

        function(pair) {
          return new Entry(pair);
        },

        function(pair) {
          return pair.constructor === Entry && pair._isIn(hashMap);
        },

        function(pair) {
          return hashMap.remove(pair.getKey());
        });
      };

      this.get = function(key) {
        var index = virtHashCode(key) % buckets.length;
        var bucket = buckets[index];
        if (bucket === undef) {
          return null;
        }
        for (var i = 0; i < bucket.length; ++i) {
          if (virtEquals(bucket[i].key, key)) {
            return bucket[i].value;
          }
        }
        return null;
      };

      this.isEmpty = function() {
        return count === 0;
      };

      this.keySet = function() {
        return new Set(

        function(pair) {
          return pair.key;
        },

        function(key) {
          return hashMap.containsKey(key);
        },

        function(key) {
          return hashMap.remove(key);
        });
      };

      this.put = function(key, value) {
        var index = virtHashCode(key) % buckets.length;
        var bucket = buckets[index];
        if (bucket === undef) {
          ++count;
          buckets[index] = [{
            key: key,
            value: value
          }];
          ensureLoad();
          return null;
        }
        for (var i = 0; i < bucket.length; ++i) {
          if (virtEquals(bucket[i].key, key)) {
            var previous = bucket[i].value;
            bucket[i].value = value;
            return previous;
          }
        }
        ++count;
        bucket.push({
          key: key,
          value: value
        });
        ensureLoad();
        return null;
      };

      this.putAll = function(m) {
        var it = m.entrySet().iterator();
        while (it.hasNext()) {
          var entry = it.next();
          this.put(entry.getKey(), entry.getValue());
        }
      };

      this.remove = function(key) {
        var index = virtHashCode(key) % buckets.length;
        var bucket = buckets[index];
        if (bucket === undef) {
          return null;
        }
        for (var i = 0; i < bucket.length; ++i) {
          if (virtEquals(bucket[i].key, key)) {
            --count;
            var previous = bucket[i].value;
            bucket[i].removed = true;
            if (bucket.length > 1) {
              bucket.splice(i, 1);
            } else {
              buckets[index] = undef;
            }
            return previous;
          }
        }
        return null;
      };

      this.size = function() {
        return count;
      };

      this.values = function() {
        var result = [];
        var it = this.entrySet().iterator();
        while (it.hasNext()) {
          var entry = it.next();
          result.push(entry.getValue());
        }
        return result;
      };
    }

    return HashMap;
  }());

  var PVector = (function() {
    function PVector(x, y, z) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }

    function createPVectorMethod(method) {
      return function(v1, v2) {
        var v = v1.get();
        v[method](v2);
        return v;
      };
    }

    function createSimplePVectorMethod(method) {
      return function(v1, v2) {
        return v1[method](v2);
      };
    }

    var simplePVMethods = "dist dot cross".split(" ");
    var method = simplePVMethods.length;

    PVector.angleBetween = function(v1, v2) {
      return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
    };

    // Common vector operations for PVector
    PVector.prototype = {
      set: function(v, y, z) {
        if (arguments.length === 1) {
          this.set(v.x || v[0], v.y || v[1], v.z || v[2]);
        } else {
          this.x = v;
          this.y = y;
          this.z = z;
        }
      },
      get: function() {
        return new PVector(this.x, this.y, this.z);
      },
      mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      },
      add: function(v, y, z) {
        if (arguments.length === 3) {
          this.x += v;
          this.y += y;
          this.z += z;
        } else if (arguments.length === 1) {
          this.x += v.x;
          this.y += v.y;
          this.z += v.z;
        }
      },
      sub: function(v, y, z) {
        if (arguments.length === 3) {
          this.x -= v;
          this.y -= y;
          this.z -= z;
        } else if (arguments.length === 1) {
          this.x -= v.x;
          this.y -= v.y;
          this.z -= v.z;
        }
      },
      mult: function(v) {
        if (typeof v === 'number') {
          this.x *= v;
          this.y *= v;
          this.z *= v;
        } else if (typeof v === 'object') {
          this.x *= v.x;
          this.y *= v.y;
          this.z *= v.z;
        }
      },
      div: function(v) {
        if (typeof v === 'number') {
          this.x /= v;
          this.y /= v;
          this.z /= v;
        } else if (typeof v === 'object') {
          this.x /= v.x;
          this.y /= v.y;
          this.z /= v.z;
        }
      },
      dist: function(v) {
        var dx = this.x - v.x,
            dy = this.y - v.y,
            dz = this.z - v.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
      },
      dot: function(v, y, z) {
        if (arguments.length === 3) {
          return (this.x * v + this.y * y + this.z * z);
        } else if (arguments.length === 1) {
          return (this.x * v.x + this.y * v.y + this.z * v.z);
        }
      },
      cross: function(v) {
        return new PVector(this.y * v.z - v.y * this.z,
                           this.z * v.x - v.z * this.x,
                           this.x * v.y - v.x * this.y);
      },
      normalize: function() {
        var m = this.mag();
        if (m > 0) {
          this.div(m);
        }
      },
      limit: function(high) {
        if (this.mag() > high) {
          this.normalize();
          this.mult(high);
        }
      },
      heading2D: function() {
        return (-Math.atan2(-this.y, this.x));
      },
      toString: function() {
        return "[" + this.x + ", " + this.y + ", " + this.z + "]";
      },
      array: function() {
        return [this.x, this.y, this.z];
      }
    };

    while (method--) {
      PVector[simplePVMethods[method]] = createSimplePVectorMethod(simplePVMethods[method]);
    }

    for (method in PVector.prototype) {
      if (PVector.prototype.hasOwnProperty(method) && !PVector.hasOwnProperty(method)) {
        PVector[method] = createPVectorMethod(method);
      }
    }

    return PVector;
  }());

  /**
  * A ObjectIterator is an iterator wrapper for objects. If passed object contains
  * the iterator method, the object instance will be replaced by the result returned by
  * this method call. If passed object is an array, the ObjectIterator instance iterates
  * through its items.
  *
  * @param {Object} obj          The object to be iterated.
  */
  var ObjectIterator = function(obj) {
    if (obj.iterator instanceof Function) {
      return obj.iterator();
    } else if (obj instanceof Array) {
      // iterate through array items
      var index = -1;
      this.hasNext = function() {
        return ++index < obj.length;
      };
      this.next = function() {
        return obj[index];
      };
    } else {
      throw "Unable to iterate: " + obj;
    }
  };

  // Building defaultScope. Changing of the prototype protects
  // internal Processing code from the changes in defaultScope
  function DefaultScope() {}
  DefaultScope.prototype = PConstants;

  var defaultScope = new DefaultScope();
  defaultScope.ArrayList   = ArrayList;
  defaultScope.HashMap     = HashMap;
  defaultScope.PVector     = PVector;
  defaultScope.ObjectIterator = ObjectIterator;
  //defaultScope.PImage    = PImage;     // TODO
  //defaultScope.PShape    = PShape;     // TODO
  //defaultScope.PShapeSVG = PShapeSVG;  // TODO

  var Processing = this.Processing = function Processing(curElement, aCode) {
    // Previously we allowed calling Processing as a func instead of ctor, but no longer.
    if (!(this instanceof Processing)) {
      throw("called Processing constructor as if it were a function: missing 'new'.");
    }

    // When something new is added to "p." it must also be added to the "names" array.
    // The names array contains the names of everything that is inside "p."
    var p = this;

    // PJS specific (non-p5) methods and properties to externalize
    p.externals = {
      canvas:  curElement,
      context: undef,
      sketch:  undef
    };

    p.name            = 'Processing.js Instance'; // Set Processing defaults / environment variables
    p.use3DContext    = false; // default '2d' canvas context

    /**
     * Confirms if a Processing program is "focused", meaning that it is
     * active and will accept input from mouse or keyboard. This variable
     * is "true" if it is focused and "false" if not. This variable is
     * often used when you want to warn people they need to click on the
     * browser before it will work.
    */
    p.focused         = false;
    p.breakShape      = false;

    // Glyph path storage for textFonts
    p.glyphTable      = {};

    // Global vars for tracking mouse position
    p.pmouseX         = 0;
    p.pmouseY         = 0;
    p.mouseX          = 0;
    p.mouseY          = 0;
    p.mouseButton     = 0;
    p.mouseScroll     = 0;

    // Undefined event handlers to be replaced by user when needed
    p.mouseClicked    = undef;
    p.mouseDragged    = undef;
    p.mouseMoved      = undef;
    p.mousePressed    = undef;
    p.mouseReleased   = undef;
    p.mouseScrolled   = undef;
    p.mouseOver       = undef;
    p.mouseOut        = undef;
    p.touchStart      = undef;
    p.touchEnd        = undef;
    p.touchMove       = undef;
    p.touchCancel     = undef;
    p.key             = undef;
    p.keyCode         = undef;
    p.keyPressed      = function(){};  // needed to remove function checks
    p.keyReleased     = function(){};
    p.keyTyped        = function(){};
    p.draw            = undef;
    p.setup           = undef;

    // Remapped vars
    p.__mousePressed  = false;
    p.__keyPressed    = false;
    p.__frameRate     = 0;

    // The current animation frame
    p.frameCount      = 0;

    // The height/width of the canvas
    p.width           = curElement.width  - 0;
    p.height          = curElement.height - 0;

    p.defineProperty = function(obj, name, desc) {
      if("defineProperty" in Object) {
        Object.defineProperty(obj, name, desc);
      } else {
        if (desc.hasOwnProperty("get")) {
          obj.__defineGetter__(name, desc.get);
        }
        if (desc.hasOwnProperty("set")) {
          obj.__defineSetter__(name, desc.set);
        }
      }
    };

    // "Private" variables used to maintain state
    var curContext,
        curSketch,
        online = true,
        doFill = true,
        fillStyle = [1.0, 1.0, 1.0, 1.0],
        currentFillColor = 0xFFFFFFFF,
        isFillDirty = true,
        doStroke = true,
        strokeStyle = [0.8, 0.8, 0.8, 1.0],
        currentStrokeColor = 0xFFFDFDFD,
        isStrokeDirty = true,
        lineWidth = 1,
        loopStarted = false,
        doLoop = true,
        looping = 0,
        curRectMode = PConstants.CORNER,
        curEllipseMode = PConstants.CENTER,
        normalX = 0,
        normalY = 0,
        normalZ = 0,
        normalMode = PConstants.NORMAL_MODE_AUTO,
        inDraw = false,
        curFrameRate = 60,
        curCursor = PConstants.ARROW,
        oldCursor = curElement.style.cursor,
        curMsPerFrame = 1,
        curShape = PConstants.POLYGON,
        curShapeCount = 0,
        curvePoints = [],
        curTightness = 0,
        curveDet = 20,
        curveInited = false,
        bezDetail = 20,
        colorModeA = 255,
        colorModeX = 255,
        colorModeY = 255,
        colorModeZ = 255,
        pathOpen = false,
        mouseDragging = false,
        curColorMode = PConstants.RGB,
        curTint = null,
        curTextSize = 12,
        curTextFont = {name: "\"Arial\", sans-serif", origName: "Arial"},
        curTextLeading = 14,
        getLoaded = false,
        start = new Date().getTime(),
        timeSinceLastFPS = start,
        framesSinceLastFPS = 0,
        textcanvas,
        curveBasisMatrix,
        curveToBezierMatrix,
        curveDrawMatrix,
        bezierDrawMatrix,
        bezierBasisInverse,
        bezierBasisMatrix,
        // Keys and Keystrokes
        firstCodedDown = true,    // first coded key stroke
        firstEDGKeyDown = true,   // first Enter - Delete Google key stroke
        firstEDMKeyDown = true,   // first Enter - Delete Mozilla key stroke
        firstMKeyDown = true,     // first Mozilla key stroke
        firstGKeyDown = true,     // first Google key stroke
        gRefire = false,          // Google refire
        curContextCache = { attributes: {}, locations: {} },
        // Shaders
        programObject3D,
        programObject2D,
        programObjectUnlitShape,
        boxBuffer,
        boxNormBuffer,
        boxOutlineBuffer,
        rectBuffer,
        rectNormBuffer,
        sphereBuffer,
        lineBuffer,
        fillBuffer,
        fillColorBuffer,
        strokeColorBuffer,
        pointBuffer,
        shapeTexVBO,
        canTex,   // texture for createGraphics
        textTex,   // texture for 3d tex
        curTexture = {width:0,height:0},
        curTextureMode = PConstants.IMAGE,
        usingTexture = false,
        textBuffer,
        textureBuffer,
        indexBuffer,
        // Text alignment
        horizontalTextAlignment = PConstants.LEFT,
        verticalTextAlignment = PConstants.BASELINE,
        baselineOffset = 0.2, // percent
        tMode = PConstants.MODEL,
        // Pixels cache
        originalContext,
        proxyContext = null,
        isContextReplaced = false,
        setPixelsCached,
        maxPixelsCached = 1000,
        codedKeys = [ PConstants.SHIFT, PConstants.CONTROL, PConstants.ALT, PConstants.CAPSLK, PConstants.PGUP, PConstants.PGDN,
                      PConstants.END, PConstants.HOME, PConstants.LEFT, PConstants.UP, PConstants.RIGHT, PConstants.DOWN, PConstants.NUMLK,
                      PConstants.INS, PConstants.F1, PConstants.F2, PConstants.F3, PConstants.F4, PConstants.F5, PConstants.F6, PConstants.F7,
                      PConstants.F8, PConstants.F9, PConstants.F10, PConstants.F11, PConstants.F12 ];

    // Get padding and border style widths for mouse offsets
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;

    if (document.defaultView && document.defaultView.getComputedStyle) {
      stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(curElement, null)['paddingLeft'], 10)      || 0;
      stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(curElement, null)['paddingTop'], 10)       || 0;
      styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(curElement, null)['borderLeftWidth'], 10)  || 0;
      styleBorderTop   = parseInt(document.defaultView.getComputedStyle(curElement, null)['borderTopWidth'], 10)   || 0;
    }

    // User can only have MAX_LIGHTS lights
    var lightCount = 0;

    //sphere stuff
    var sphereDetailV = 0,
        sphereDetailU = 0,
        sphereX = [],
        sphereY = [],
        sphereZ = [],
        sinLUT = new Float32Array(PConstants.SINCOS_LENGTH),
        cosLUT = new Float32Array(PConstants.SINCOS_LENGTH),
        sphereVerts,
        sphereNorms;

    // Camera defaults and settings
    var cam,
        cameraInv,
        forwardTransform,
        reverseTransform,
        modelView,
        modelViewInv,
        userMatrixStack,
        inverseCopy,
        projection,
        manipulatingCamera = false,
        frustumMode = false,
        cameraFOV = 60 * (Math.PI / 180),
        cameraX = curElement.width / 2,
        cameraY = curElement.height / 2,
        cameraZ = cameraY / Math.tan(cameraFOV / 2),
        cameraNear = cameraZ / 10,
        cameraFar = cameraZ * 10,
        cameraAspect = curElement.width / curElement.height;

    var vertArray = [],
        curveVertArray = [],
        curveVertCount = 0,
        isCurve = false,
        isBezier = false,
        firstVert = true;

    //PShape stuff
    var curShapeMode = PConstants.CORNER;

    var colors = {
      aliceblue:            "#f0f8ff",
      antiquewhite:         "#faebd7",
      aqua:                 "#00ffff",
      aquamarine:           "#7fffd4",
      azure:                "#f0ffff",
      beige:                "#f5f5dc",
      bisque:               "#ffe4c4",
      black:                "#000000",
      blanchedalmond:       "#ffebcd",
      blue:                 "#0000ff",
      blueviolet:           "#8a2be2",
      brown:                "#a52a2a",
      burlywood:            "#deb887",
      cadetblue:            "#5f9ea0",
      chartreuse:           "#7fff00",
      chocolate:            "#d2691e",
      coral:                "#ff7f50",
      cornflowerblue:       "#6495ed",
      cornsilk:             "#fff8dc",
      crimson:              "#dc143c",
      cyan:                 "#00ffff",
      darkblue:             "#00008b",
      darkcyan:             "#008b8b",
      darkgoldenrod:        "#b8860b",
      darkgray:             "#a9a9a9",
      darkgreen:            "#006400",
      darkkhaki:            "#bdb76b",
      darkmagenta:          "#8b008b",
      darkolivegreen:       "#556b2f",
      darkorange:           "#ff8c00",
      darkorchid:           "#9932cc",
      darkred:              "#8b0000",
      darksalmon:           "#e9967a",
      darkseagreen:         "#8fbc8f",
      darkslateblue:        "#483d8b",
      darkslategray:        "#2f4f4f",
      darkturquoise:        "#00ced1",
      darkviolet:           "#9400d3",
      deeppink:             "#ff1493",
      deepskyblue:          "#00bfff",
      dimgray:              "#696969",
      dodgerblue:           "#1e90ff",
      firebrick:            "#b22222",
      floralwhite:          "#fffaf0",
      forestgreen:          "#228b22",
      fuchsia:              "#ff00ff",
      gainsboro:            "#dcdcdc",
      ghostwhite:           "#f8f8ff",
      gold:                 "#ffd700",
      goldenrod:            "#daa520",
      gray:                 "#808080",
      green:                "#008000",
      greenyellow:          "#adff2f",
      honeydew:             "#f0fff0",
      hotpink:              "#ff69b4",
      indianred:            "#cd5c5c",
      indigo:               "#4b0082",
      ivory:                "#fffff0",
      khaki:                "#f0e68c",
      lavender:             "#e6e6fa",
      lavenderblush:        "#fff0f5",
      lawngreen:            "#7cfc00",
      lemonchiffon:         "#fffacd",
      lightblue:            "#add8e6",
      lightcoral:           "#f08080",
      lightcyan:            "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgrey:            "#d3d3d3",
      lightgreen:           "#90ee90",
      lightpink:            "#ffb6c1",
      lightsalmon:          "#ffa07a",
      lightseagreen:        "#20b2aa",
      lightskyblue:         "#87cefa",
      lightslategray:       "#778899",
      lightsteelblue:       "#b0c4de",
      lightyellow:          "#ffffe0",
      lime:                 "#00ff00",
      limegreen:            "#32cd32",
      linen:                "#faf0e6",
      magenta:              "#ff00ff",
      maroon:               "#800000",
      mediumaquamarine:     "#66cdaa",
      mediumblue:           "#0000cd",
      mediumorchid:         "#ba55d3",
      mediumpurple:         "#9370d8",
      mediumseagreen:       "#3cb371",
      mediumslateblue:      "#7b68ee",
      mediumspringgreen:    "#00fa9a",
      mediumturquoise:      "#48d1cc",
      mediumvioletred:      "#c71585",
      midnightblue:         "#191970",
      mintcream:            "#f5fffa",
      mistyrose:            "#ffe4e1",
      moccasin:             "#ffe4b5",
      navajowhite:          "#ffdead",
      navy:                 "#000080",
      oldlace:              "#fdf5e6",
      olive:                "#808000",
      olivedrab:            "#6b8e23",
      orange:               "#ffa500",
      orangered:            "#ff4500",
      orchid:               "#da70d6",
      palegoldenrod:        "#eee8aa",
      palegreen:            "#98fb98",
      paleturquoise:        "#afeeee",
      palevioletred:        "#d87093",
      papayawhip:           "#ffefd5",
      peachpuff:            "#ffdab9",
      peru:                 "#cd853f",
      pink:                 "#ffc0cb",
      plum:                 "#dda0dd",
      powderblue:           "#b0e0e6",
      purple:               "#800080",
      red:                  "#ff0000",
      rosybrown:            "#bc8f8f",
      royalblue:            "#4169e1",
      saddlebrown:          "#8b4513",
      salmon:               "#fa8072",
      sandybrown:           "#f4a460",
      seagreen:             "#2e8b57",
      seashell:             "#fff5ee",
      sienna:               "#a0522d",
      silver:               "#c0c0c0",
      skyblue:              "#87ceeb",
      slateblue:            "#6a5acd",
      slategray:            "#708090",
      snow:                 "#fffafa",
      springgreen:          "#00ff7f",
      steelblue:            "#4682b4",
      tan:                  "#d2b48c",
      teal:                 "#008080",
      thistle:              "#d8bfd8",
      tomato:               "#ff6347",
      turquoise:            "#40e0d0",
      violet:               "#ee82ee",
      wheat:                "#f5deb3",
      white:                "#ffffff",
      whitesmoke:           "#f5f5f5",
      yellow:               "#ffff00",
      yellowgreen:          "#9acd32"
    };

    // Stores states for pushStyle() and popStyle().
    var styleArray = [];

    // Vertices are specified in a counter-clockwise order
    // triangles are in this order: back, front, right, bottom, left, top
    var boxVerts = new Float32Array([
       0.5,  0.5, -0.5,  0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5,  0.5, -0.5,  0.5,  0.5, -0.5,
       0.5,  0.5,  0.5, -0.5,  0.5,  0.5, -0.5, -0.5,  0.5, -0.5, -0.5,  0.5,  0.5, -0.5,  0.5,  0.5,  0.5,  0.5,
       0.5,  0.5, -0.5,  0.5,  0.5,  0.5,  0.5, -0.5,  0.5,  0.5, -0.5,  0.5,  0.5, -0.5, -0.5,  0.5,  0.5, -0.5,
       0.5, -0.5, -0.5,  0.5, -0.5,  0.5, -0.5, -0.5,  0.5, -0.5, -0.5,  0.5, -0.5, -0.5, -0.5,  0.5, -0.5, -0.5,
      -0.5, -0.5, -0.5, -0.5, -0.5,  0.5, -0.5,  0.5,  0.5, -0.5,  0.5,  0.5, -0.5,  0.5, -0.5, -0.5, -0.5, -0.5,
       0.5,  0.5,  0.5,  0.5,  0.5, -0.5, -0.5,  0.5, -0.5, -0.5,  0.5, -0.5, -0.5,  0.5,  0.5,  0.5,  0.5,  0.5]);

    var boxOutlineVerts = new Float32Array([
       0.5,  0.5,  0.5,  0.5, -0.5,  0.5,  0.5,  0.5, -0.5,  0.5, -0.5, -0.5,
      -0.5,  0.5, -0.5, -0.5, -0.5, -0.5, -0.5,  0.5,  0.5, -0.5, -0.5,  0.5,
       0.5,  0.5,  0.5,  0.5,  0.5, -0.5,  0.5,  0.5, -0.5, -0.5,  0.5, -0.5,
      -0.5,  0.5, -0.5, -0.5,  0.5,  0.5, -0.5,  0.5,  0.5,  0.5,  0.5,  0.5,
       0.5, -0.5,  0.5,  0.5, -0.5, -0.5,  0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
      -0.5, -0.5, -0.5, -0.5, -0.5,  0.5, -0.5, -0.5,  0.5,  0.5, -0.5,  0.5]);

    var boxNorms = new Float32Array([
       0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,
       0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,
       1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,
       0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,
      -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0,
       0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0]);

    // These verts are used for the fill and stroke using TRIANGLE_FAN and LINE_LOOP
    var rectVerts = new Float32Array([0,0,0, 0,1,0, 1,1,0, 1,0,0]);

    var rectNorms = new Float32Array([0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1]);

    // Vertex shader for points and lines
    var vShaderSrcUnlitShape =
      "varying vec4 frontColor;" +

      "attribute vec3 aVertex;" +
      "attribute vec4 aColor;" +

      "uniform mat4 uView;" +
      "uniform mat4 uProjection;" +

      "void main(void) {" +
      "  frontColor = aColor;" +
      "  gl_Position = uProjection * uView * vec4(aVertex, 1.0);" +
      "}";

    var fShaderSrcUnlitShape =
      "#ifdef GL_ES\n" +
      "precision highp float;\n" +
      "#endif\n" +

      "varying vec4 frontColor;" +

      "void main(void){" +
      "  gl_FragColor = frontColor;" +
      "}";

    // Vertex shader for points and lines
    var vertexShaderSource2D =
      "varying vec4 frontColor;" +

      "attribute vec3 Vertex;" +
      "attribute vec2 aTextureCoord;" +
      "uniform vec4 color;" +

      "uniform mat4 model;" +
      "uniform mat4 view;" +
      "uniform mat4 projection;" +
      "uniform float pointSize;" +
      "varying vec2 vTextureCoord;"+

      "void main(void) {" +
      "  gl_PointSize = pointSize;" +
      "  frontColor = color;" +
      "  gl_Position = projection * view * model * vec4(Vertex, 1.0);" +
      "  vTextureCoord = aTextureCoord;" +
      "}";

    var fragmentShaderSource2D =
      "#ifdef GL_ES\n" +
      "precision highp float;\n" +
      "#endif\n" +

      "varying vec4 frontColor;" +
      "varying vec2 vTextureCoord;"+

      "uniform sampler2D uSampler;"+
      "uniform int picktype;"+

      "void main(void){" +
      "  if(picktype == 0){"+
      "    gl_FragColor = frontColor;" +
      "  }" +
      "  else if(picktype == 1){"+
      "    float alpha = texture2D(uSampler, vTextureCoord).a;"+
      "    gl_FragColor = vec4(frontColor.rgb*alpha, alpha);\n"+
      "  }"+
      "}";

    // Vertex shader for boxes and spheres
    var vertexShaderSource3D =
      "varying vec4 frontColor;" +

      "attribute vec3 Vertex;" +
      "attribute vec3 Normal;" +
      "attribute vec4 aColor;" +
      "attribute vec2 aTexture;" +
      "varying   vec2 vTexture;" +

      "uniform vec4 color;" +

      "uniform bool usingMat;" +
      "uniform vec3 specular;" +
      "uniform vec3 mat_emissive;" +
      "uniform vec3 mat_ambient;" +
      "uniform vec3 mat_specular;" +
      "uniform float shininess;" +

      "uniform mat4 model;" +
      "uniform mat4 view;" +
      "uniform mat4 projection;" +
      "uniform mat4 normalTransform;" +

      "uniform int lightCount;" +
      "uniform vec3 falloff;" +

      // careful changing the order of these fields. Some cards
      // have issues with memory alignment
      "struct Light {" +
      "  int type;" +
      "  vec3 color;" +
      "  vec3 position;" +
      "  vec3 direction;" +
      "  float angle;" +
      "  vec3 halfVector;" +
      "  float concentration;" +
      "};" +

      // nVidia cards have issues with arrays of structures
      // so instead we create 8 instances of Light
      "uniform Light lights0;" +
      "uniform Light lights1;" +
      "uniform Light lights2;" +
      "uniform Light lights3;" +
      "uniform Light lights4;" +
      "uniform Light lights5;" +
      "uniform Light lights6;" +
      "uniform Light lights7;" +

     // GLSL does not support switch
      "Light getLight(int index){" +
      "  if(index == 0) return lights0;" +
      "  if(index == 1) return lights1;" +
      "  if(index == 2) return lights2;" +
      "  if(index == 3) return lights3;" +
      "  if(index == 4) return lights4;" +
      "  if(index == 5) return lights5;" +
      "  if(index == 6) return lights6;" +
      // some cards complain that not all paths return if we have
      // this last one in a conditional.
      "  return lights7;" +
      "}" +

      "void AmbientLight( inout vec3 totalAmbient, in vec3 ecPos, in Light light ) {" +
      // Get the vector from the light to the vertex
      // Get the distance from the current vector to the light position
      "  float d = length( light.position - ecPos );" +
      "  float attenuation = 1.0 / ( falloff[0] + ( falloff[1] * d ) + ( falloff[2] * d * d ));" +
      "  totalAmbient += light.color * attenuation;" +
      "}" +

      "void DirectionalLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in Light light ) {" +
      "  float powerfactor = 0.0;" +
      "  float nDotVP = max(0.0, dot( vertNormal, normalize(-light.position) ));" +
      "  float nDotVH = max(0.0, dot( vertNormal, normalize(-light.position-ecPos )));" +

      "  if( nDotVP != 0.0 ){" +
      "    powerfactor = pow( nDotVH, shininess );" +
      "  }" +

      "  col += light.color * nDotVP;" +
      "  spec += specular * powerfactor;" +
      "}" +

      "void PointLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in vec3 eye, in Light light ) {" +
      "  float powerfactor;" +

      // Get the vector from the light to the vertex
      "   vec3 VP = light.position - ecPos;" +

      // Get the distance from the current vector to the light position
      "  float d = length( VP ); " +

      // Normalize the light ray so it can be used in the dot product operation.
      "  VP = normalize( VP );" +

      "  float attenuation = 1.0 / ( falloff[0] + ( falloff[1] * d ) + ( falloff[2] * d * d ));" +

      "  float nDotVP = max( 0.0, dot( vertNormal, VP ));" +
      "  vec3 halfVector = normalize( VP + eye );" +
      "  float nDotHV = max( 0.0, dot( vertNormal, halfVector ));" +

      "  if( nDotVP == 0.0) {" +
      "    powerfactor = 0.0;" +
      "  }" +
      "  else{" +
      "    powerfactor = pow( nDotHV, shininess );" +
      "  }" +

      "  spec += specular * powerfactor * attenuation;" +
      "  col += light.color * nDotVP * attenuation;" +
      "}" +

      /*
      */
      "void SpotLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in vec3 eye, in Light light ) {" +
      "  float spotAttenuation;" +
      "  float powerfactor;" +

      // calculate the vector from the current vertex to the light.
      "  vec3 VP = light.position - ecPos; " +
      "  vec3 ldir = normalize( -light.direction );" +

      // get the distance from the spotlight and the vertex
      "  float d = length( VP );" +
      "  VP = normalize( VP );" +

      "  float attenuation = 1.0 / ( falloff[0] + ( falloff[1] * d ) + ( falloff[2] * d * d ) );" +

      // dot product of the vector from vertex to light and light direction.
      "  float spotDot = dot( VP, ldir );" +

      // if the vertex falls inside the cone
      // The following is failing on Windows systems
      // removed until we find a workaround
      //"  if( spotDot < cos( light.angle ) ) {" +
      //"    spotAttenuation = pow( spotDot, light.concentration );" +
      //"  }" +
      //"  else{" +
      "    spotAttenuation = 1.0;" +
      //"  }" +
      "  attenuation *= spotAttenuation;" +

      "  float nDotVP = max( 0.0, dot( vertNormal, VP ));" +
      "  vec3 halfVector = normalize( VP + eye );" +
      "  float nDotHV = max( 0.0, dot( vertNormal, halfVector ));" +

      "  if( nDotVP == 0.0 ) {" +
      "    powerfactor = 0.0;" +
      "  }" +
      "  else {" +
      "    powerfactor = pow( nDotHV, shininess );" +
      "  }" +

      "  spec += specular * powerfactor * attenuation;" +
      "  col += light.color * nDotVP * attenuation;" +
      "}" +

      "void main(void) {" +
      "  vec3 finalAmbient = vec3( 0.0, 0.0, 0.0 );" +
      "  vec3 finalDiffuse = vec3( 0.0, 0.0, 0.0 );" +
      "  vec3 finalSpecular = vec3( 0.0, 0.0, 0.0 );" +

      "  vec4 col = color;" +

      "  if(color[0] == -1.0){" +
      "    col = aColor;" +
      "  }" +

      "  vec3 norm = vec3( normalTransform * vec4( Normal, 0.0 ) );" +

      "  vec4 ecPos4 = view * model * vec4(Vertex,1.0);" +
      "  vec3 ecPos = (vec3(ecPos4))/ecPos4.w;" +
      "  vec3 eye = vec3( 0.0, 0.0, 1.0 );" +

      // If there were no lights this draw call, just use the
      // assigned fill color of the shape and the specular value
      "  if( lightCount == 0 ) {" +
      "    frontColor = col + vec4(mat_specular,1.0);" +
      "  }" +
      "  else {" +
           // WebGL forces us to iterate over a constant value
           // so we can't iterate using lightCount
      "    for( int i = 0; i < 8; i++ ) {" +
      "      Light l = getLight(i);" +

      // We can stop iterating if we know we have gone past
      // the number of lights which are on
      "      if( i >= lightCount ){" +
      "        break;" +
      "      }" +

      "      if( l.type == 0 ) {" +
      "        AmbientLight( finalAmbient, ecPos, l );" +
      "      }" +
      "      else if( l.type == 1 ) {" +
      "        DirectionalLight( finalDiffuse, finalSpecular, norm, ecPos, l );" +
      "      }" +
      "      else if( l.type == 2 ) {" +
      "        PointLight( finalDiffuse, finalSpecular, norm, ecPos, eye, l );" +
      "      }" +
      "      else {" +
      "        SpotLight( finalDiffuse, finalSpecular, norm, ecPos, eye, l );" +
      "      }" +
      "    }" +

      "   if( usingMat == false ) {" +
      "     frontColor = vec4(" +
      "       vec3(col) * finalAmbient +" +
      "       vec3(col) * finalDiffuse +" +
      "       vec3(col) * finalSpecular," +
      "       col[3] );" +
      "   }" +
      "   else{" +
      "     frontColor = vec4( " +
      "       mat_emissive + " +
      "       (vec3(col) * mat_ambient * finalAmbient) + " +
      "       (vec3(col) * finalDiffuse) + " +
      "       (mat_specular * finalSpecular), " +
      "       col[3] );" +
      "    }" +
      "  }" +

      "  vTexture.xy = aTexture.xy;" +
      "  gl_Position = projection * view * model * vec4( Vertex, 1.0 );" +
      "}";

    var fragmentShaderSource3D =
      "#ifdef GL_ES\n" +
      "precision highp float;\n" +
      "#endif\n" +

      "varying vec4 frontColor;" +

      "uniform sampler2D sampler;" +
      "uniform bool usingTexture;" +
      "varying vec2 vTexture;" +

      // In Processing, when a texture is used, the fill color is ignored
      "void main(void){" +
      "  if(usingTexture){" +
      "    gl_FragColor =  vec4(texture2D(sampler, vTexture.xy));" +
      "  }"+
      "  else{" +
      "    gl_FragColor = frontColor;" +
      "  }" +
      "}";

    ////////////////////////////////////////////////////////////////////////////
    // 3D Functions
    ////////////////////////////////////////////////////////////////////////////

    /*
     * Sets a uniform variable in a program object to a particular
     * value. Before calling this function, ensure the correct
     * program object has been installed as part of the current
     * rendering state by calling useProgram.
     *
     * On some systems, if the variable exists in the shader but isn't used,
     * the compiler will optimize it out and this function will fail.
     *
     * @param {WebGLProgram} programObj program object returned from
     * createProgramObject
     * @param {String} varName the name of the variable in the shader
     * @param {float | Array} varValue either a scalar value or an Array
     *
     * @returns none
     *
     * @see uniformi
     * @see uniformMatrix
    */
    function uniformf(cacheId, programObj, varName, varValue) {
      var varLocation = curContextCache.locations[cacheId];
      if(varLocation === undef) {
        varLocation = curContext.getUniformLocation(programObj, varName);
        curContextCache.locations[cacheId] = varLocation;
      }
      // the variable won't be found if it was optimized out.
      if (varLocation !== -1) {
        if (varValue.length === 4) {
          curContext.uniform4fv(varLocation, varValue);
        } else if (varValue.length === 3) {
          curContext.uniform3fv(varLocation, varValue);
        } else if (varValue.length === 2) {
          curContext.uniform2fv(varLocation, varValue);
        } else {
          curContext.uniform1f(varLocation, varValue);
        }
      }
    }

    /**
     * Sets a uniform int or int array in a program object to a particular
     * value. Before calling this function, ensure the correct
     * program object has been installed as part of the current
     * rendering state.
     *
     * On some systems, if the variable exists in the shader but isn't used,
     * the compiler will optimize it out and this function will fail.
     *
     * @param {WebGLProgram} programObj program object returned from
     * createProgramObject
     * @param {String} varName the name of the variable in the shader
     * @param {int | Array} varValue either a scalar value or an Array
     *
     * @returns none
     *
     * @see uniformf
     * @see uniformMatrix
    */
    function uniformi(cacheId, programObj, varName, varValue) {
      var varLocation = curContextCache.locations[cacheId];
      if(varLocation === undef) {
        varLocation = curContext.getUniformLocation(programObj, varName);
        curContextCache.locations[cacheId] = varLocation;
      }
      // the variable won't be found if it was optimized out.
      if (varLocation !== -1) {
        if (varValue.length === 4) {
          curContext.uniform4iv(varLocation, varValue);
        } else if (varValue.length === 3) {
          curContext.uniform3iv(varLocation, varValue);
        } else if (varValue.length === 2) {
          curContext.uniform2iv(varLocation, varValue);
        } else {
          curContext.uniform1i(varLocation, varValue);
        }
      }
    }

    /**
     * Binds the VBO, sets the vertex attribute data for the program
     * object and enables the attribute.
     *
     * On some systems, if the attribute exists in the shader but
     * isn't used, the compiler will optimize it out and this
     * function will fail.
     *
     * @param {WebGLProgram} programObj program object returned from
     * createProgramObject
     * @param {String} varName the name of the variable in the shader
     * @param {int} size the number of components per vertex attribute
     * @param {WebGLBuffer} VBO Vertex Buffer Object
     *
     * @returns none
     *
     * @see disableVertexAttribPointer
    */
    function vertexAttribPointer(cacheId, programObj, varName, size, VBO) {
      var varLocation = curContextCache.attributes[cacheId];
      if(varLocation === undef) {
        varLocation = curContext.getAttribLocation(programObj, varName);
        curContextCache.attributes[cacheId] = varLocation;
      }
      if (varLocation !== -1) {
        curContext.bindBuffer(curContext.ARRAY_BUFFER, VBO);
        curContext.vertexAttribPointer(varLocation, size, curContext.FLOAT, false, 0, 0);
        curContext.enableVertexAttribArray(varLocation);
      }
    }

    /**
     * Disables a program object attribute from being sent to WebGL.
     *
     * @param {WebGLProgram} programObj program object returned from
     * createProgramObject
     * @param {String} varName name of the attribute
     *
     * @returns none
     *
     * @see vertexAttribPointer
    */
    function disableVertexAttribPointer(cacheId, programObj, varName){
      var varLocation = curContextCache.attributes[cacheId];
      if(varLocation === undef) {
        varLocation = curContext.getAttribLocation(programObj, varName);
        curContextCache.attributes[cacheId] = varLocation;
      }
      if (varLocation !== -1) {
        curContext.disableVertexAttribArray(varLocation);
      }
    }

    /**
     * Sets the value of a uniform matrix variable in a program
     * object. Before calling this function, ensure the correct
     * program object has been installed as part of the current
     * rendering state.
     *
     * On some systems, if the variable exists in the shader but
     * isn't used, the compiler will optimize it out and this
     * function will fail.
     *
     * @param {WebGLProgram} programObj program object returned from
     * createProgramObject
     * @param {String} varName the name of the variable in the shader
     * @param {boolean} transpose must be false
     * @param {Array} matrix an array of 4, 9 or 16 values
     *
     * @returns none
     *
     * @see uniformi
     * @see uniformf
    */
    function uniformMatrix(cacheId, programObj, varName, transpose, matrix) {
      var varLocation = curContextCache.locations[cacheId];
      if(varLocation === undef) {
        varLocation = curContext.getUniformLocation(programObj, varName);
        curContextCache.locations[cacheId] = varLocation;
      }
      // the variable won't be found if it was optimized out.
      if (varLocation !== -1) {
        if (matrix.length === 16) {
          curContext.uniformMatrix4fv(varLocation, transpose, matrix);
        } else if (matrix.length === 9) {
          curContext.uniformMatrix3fv(varLocation, transpose, matrix);
        } else {
          curContext.uniformMatrix2fv(varLocation, transpose, matrix);
        }
      }
    }

    var imageModeCorner = function imageModeCorner(x, y, w, h, whAreSizes) {
      return {
        x: x,
        y: y,
        w: w,
        h: h
      };
    };
    var imageModeConvert = imageModeCorner;

    var imageModeCorners = function imageModeCorners(x, y, w, h, whAreSizes) {
      return {
        x: x,
        y: y,
        w: whAreSizes ? w : w - x,
        h: whAreSizes ? h : h - y
      };
    };

    var imageModeCenter = function imageModeCenter(x, y, w, h, whAreSizes) {
      return {
        x: x - w / 2,
        y: y - h / 2,
        w: w,
        h: h
      };
    };

    /**
     * Creates a WebGL program object.
     *
     * @param {String} vetexShaderSource
     * @param {String} fragmentShaderSource
     *
     * @returns {WebGLProgram} A program object
    */
    var createProgramObject = function(curContext, vetexShaderSource, fragmentShaderSource) {
      var vertexShaderObject = curContext.createShader(curContext.VERTEX_SHADER);
      curContext.shaderSource(vertexShaderObject, vetexShaderSource);
      curContext.compileShader(vertexShaderObject);
      if (!curContext.getShaderParameter(vertexShaderObject, curContext.COMPILE_STATUS)) {
        throw curContext.getShaderInfoLog(vertexShaderObject);
      }

      var fragmentShaderObject = curContext.createShader(curContext.FRAGMENT_SHADER);
      curContext.shaderSource(fragmentShaderObject, fragmentShaderSource);
      curContext.compileShader(fragmentShaderObject);
      if (!curContext.getShaderParameter(fragmentShaderObject, curContext.COMPILE_STATUS)) {
        throw curContext.getShaderInfoLog(fragmentShaderObject);
      }

      var programObject = curContext.createProgram();
      curContext.attachShader(programObject, vertexShaderObject);
      curContext.attachShader(programObject, fragmentShaderObject);
      curContext.linkProgram(programObject);
      if (!curContext.getProgramParameter(programObject, curContext.LINK_STATUS)) {
        throw "Error linking shaders.";
      }

      return programObject;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Char handling
    ////////////////////////////////////////////////////////////////////////////
    var charMap = {};

    var Char = p.Character = function Char(chr) {
      if (typeof chr === 'string' && chr.length === 1) {
        this.code = chr.charCodeAt(0);
      } else {
        this.code = NaN;
      }

      return (charMap[this.code] === undef) ? charMap[this.code] = this : charMap[this.code];
    };

    Char.prototype.toString = function() {
      return String.fromCharCode(this.code);
    };

    Char.prototype.valueOf = function() {
      return this.code;
    };

    /**
     * Datatype for storing shapes. Processing can currently load and display SVG (Scalable Vector Graphics) shapes.
     * Before a shape is used, it must be loaded with the <b>loadShape()</b> function. The <b>shape()</b> function is used to draw the shape to the display window.
     * The <b>PShape</b> object contain a group of methods, linked below, that can operate on the shape data.
     * <br><br>The <b>loadShape()</b> method supports SVG files created with Inkscape and Adobe Illustrator.
     * It is not a full SVG implementation, but offers some straightforward support for handling vector data.
     *
     * @param {int} family the shape type, one of GROUP, PRIMITIVE, PATH, or GEOMETRY
     *
     * @see #shape()
     * @see #loadShape()
     * @see #shapeMode()
     */
    var PShape = p.PShape = function(family) {
      this.family    = family || PConstants.GROUP;
      this.visible   = true;
      this.style     = true;
      this.children  = [];
      this.nameTable = [];
      this.params    = [];
      this.name      = "";
      this.image     = null;  //type PImage
      this.matrix    = null;
      this.kind      = null;
      this.close     = null;
      this.width     = null;
      this.height    = null;
      this.parent    = null;
    };
    /**
      * PShape methods
      * missing: findChild(), apply(), contains(), findChild(), getPrimitive(), getParams(), getVertex() , getVertexCount(),
      * getVertexCode() , getVertexCodes() , getVertexCodeCount(), getVertexX(), getVertexY(), getVertexZ()
      */
    PShape.prototype = {
      /**
       * @member PShape
       * The isVisible() function returns a boolean value "true" if the image is set to be visible, "false" if not. This is modified with the <b>setVisible()</b> parameter.
       * <br><br>The visibility of a shape is usually controlled by whatever program created the SVG file.
       * For instance, this parameter is controlled by showing or hiding the shape in the layers palette in Adobe Illustrator.
       *
       * @return {boolean}  returns "true" if the image is set to be visible, "false" if not
       */
      isVisible: function(){
        return this.visible;
      },
      /**
       * @member PShape
       * The setVisible() function sets the shape to be visible or invisible. This is determined by the value of the <b>visible</b> parameter.
       * <br><br>The visibility of a shape is usually controlled by whatever program created the SVG file.
       * For instance, this parameter is controlled by showing or hiding the shape in the layers palette in Adobe Illustrator.
       *
       * @param {boolean} visible "false" makes the shape invisible and "true" makes it visible
       */
      setVisible: function (visible){
        this.visible = visible;
      },
      /**
       * @member PShape
       * The disableStyle() function disables the shape's style data and uses Processing's current styles. Styles include attributes such as colors, stroke weight, and stroke joints.
       * Overrides this shape's style information and uses PGraphics styles and colors. Identical to ignoreStyles(true). Also disables styles for all child shapes.
       */
      disableStyle: function(){
        this.style = false;
        for(var i = 0, j=this.children.length; i<j; i++) {
          this.children[i].disableStyle();
        }
      },
      /**
       * @member PShape
       * The enableStyle() function enables the shape's style data and ignores Processing's current styles. Styles include attributes such as colors, stroke weight, and stroke joints.
       */
      enableStyle: function(){
        this.style = true;
        for(var i = 0, j=this.children.length; i<j; i++) {
          this.children[i].enableStyle();
        }
      },
      /**
       * @member PShape
       * The getFamily function returns the shape type
       *
       * @return {int} the shape type, one of GROUP, PRIMITIVE, PATH, or GEOMETRY
       */
      getFamily: function(){
        return this.family;
      },
      /**
       * @member PShape
       * The getWidth() function gets the width of the drawing area (not necessarily the shape boundary).
       */
      getWidth: function(){
        return this.width;
      },
      /**
       * @member PShape
       * The getHeight() function gets the height of the drawing area (not necessarily the shape boundary).
       */
      getHeight: function(){
        return this.height;
      },
      /**
       * @member PShape
       * The setName() function sets the name of the shape
       *
       * @param {String} name the name of the shape
       */
      setName: function(name){
        this.name = name;
      },
      /**
       * @member PShape
       * The getName() function returns the name of the shape
       *
       * @return {String} the name of the shape
       */
      getName: function(){
        return this.name;
      },
      /**
       * @member PShape
       * Called by the following (the shape() command adds the g)
       * PShape s = loadShapes("blah.svg");
       * shape(s);
       */
      draw: function(){
        if (this.visible) {
          this.pre();
          this.drawImpl();
          this.post();
        }
      },
      /**
       * @member PShape
       * the drawImpl() function draws the SVG document.
       */
      drawImpl: function(){
        if (this.family === PConstants.GROUP) {
          this.drawGroup();
        } else if (this.family === PConstants.PRIMITIVE) {
          this.drawPrimitive();
        } else if (this.family === PConstants.GEOMETRY) {
          this.drawGeometry();
        } else if (this.family === PConstants.PATH) {
          this.drawPath();
        }
      },
      /**
       * @member PShape
       * The drawPath() function draws the <path> part of the SVG document.
       */
      drawPath: function(){
        var i, j;
        if (this.vertices.length === 0) { return; }
        p.beginShape();
        if (this.vertexCodes.length === 0) {  // each point is a simple vertex
          if (this.vertices[0].length === 2) {  // drawing 2D vertices
            for (i = 0, j = this.vertices.length; i < j; i++) {
              p.vertex(this.vertices[i][0], this.vertices[i][1]);
            }
          } else {  // drawing 3D vertices
            for (i = 0, j = this.vertices.length; i < j; i++) {
              p.vertex(this.vertices[i][0],
                       this.vertices[i][1],
                       this.vertices[i][2]);
            }
          }
        } else {  // coded set of vertices
          var index = 0;
          if (this.vertices[0].length === 2) {  // drawing a 2D path
            for (i = 0, j = this.vertexCodes.length; i < j; i++) {
              if (this.vertexCodes[i] === PConstants.VERTEX) {
                p.vertex(this.vertices[index][0], this.vertices[index][1]);
                if ( this.vertices[index]["moveTo"] === true) {
                  vertArray[vertArray.length-1]["moveTo"] = true;
                } else if ( this.vertices[index]["moveTo"] === false) {
                  vertArray[vertArray.length-1]["moveTo"] = false;
                }
                p.breakShape = false;
                index++;
              } else if (this.vertexCodes[i] === PConstants.BEZIER_VERTEX) {
                p.bezierVertex(this.vertices[index+0][0],
                               this.vertices[index+0][1],
                               this.vertices[index+1][0],
                               this.vertices[index+1][1],
                               this.vertices[index+2][0],
                               this.vertices[index+2][1]);
                index += 3;
              } else if (this.vertexCodes[i] === PConstants.CURVE_VERTEX) {
                p.curveVertex(this.vertices[index][0],
                              this.vertices[index][1]);
                index++;
              } else if (this.vertexCodes[i] ===  PConstants.BREAK) {
                p.breakShape = true;
              }
            }
          } else {  // drawing a 3D path
            for (i = 0, j = this.vertexCodes.length; i < j; i++) {
              if (this.vertexCodes[i] === PConstants.VERTEX) {
                p.vertex(this.vertices[index][0],
                         this.vertices[index][1],
                         this.vertices[index][2]);
                if (this.vertices[index]["moveTo"] === true) {
                  vertArray[vertArray.length-1]["moveTo"] = true;
                } else if (this.vertices[index]["moveTo"] === false) {
                  vertArray[vertArray.length-1]["moveTo"] = false;
                }
                p.breakShape = false;
              } else if (this.vertexCodes[i] ===  PConstants.BEZIER_VERTEX) {
                p.bezierVertex(this.vertices[index+0][0],
                               this.vertices[index+0][1],
                               this.vertices[index+0][2],
                               this.vertices[index+1][0],
                               this.vertices[index+1][1],
                               this.vertices[index+1][2],
                               this.vertices[index+2][0],
                               this.vertices[index+2][1],
                               this.vertices[index+2][2]);
                index += 3;
              } else if (this.vertexCodes[i] === PConstants.CURVE_VERTEX) {
                p.curveVertex(this.vertices[index][0],
                              this.vertices[index][1],
                              this.vertices[index][2]);
                index++;
              } else if (this.vertexCodes[i] === PConstants.BREAK) {
                p.breakShape = true;
              }
            }
          }
        }
        p.endShape(this.close ? PConstants.CLOSE : PConstants.OPEN);
      },
      /**
       * @member PShape
       * The drawGeometry() function draws the geometry part of the SVG document.
       */
      drawGeometry: function() {
        var i, j;
        p.beginShape(this.kind);
        if (this.style) {
          for (i = 0, j = this.vertices.length; i < j; i++) {
            p.vertex(this.vertices[i]);
          }
        } else {
          for (i = 0, j = this.vertices.length; i < j; i++) {
            var vert = this.vertices[i];
            if (vert[2] === 0) {
              p.vertex(vert[0], vert[1]);
            } else {
              p.vertex(vert[0], vert[1], vert[2]);
            }
          }
        }
        p.endShape();
      },
      /**
       * @member PShape
       * The drawGroup() function draws the <g> part of the SVG document.
       */
      drawGroup: function() {
        for (var i = 0, j = this.children.length; i < j; i++) {
          this.children[i].draw();
        }
      },
      /**
       * @member PShape
       * The drawPrimitive() function draws SVG document shape elements. These can be point, line, triangle, quad, rect, ellipse, arc, box, or sphere.
       */
      drawPrimitive: function() {
        if (this.kind === PConstants.POINT) {
          p.point(this.params[0], this.params[1]);
        } else if (this.kind === PConstants.LINE) {
          if (this.params.length === 4) {  // 2D
            p.line(this.params[0], this.params[1],
                   this.params[2], this.params[3]);
          } else {  // 3D
            p.line(this.params[0], this.params[1], this.params[2],
                   this.params[3], this.params[4], this.params[5]);
          }
        } else if (this.kind === PConstants.TRIANGLE) {
          p.triangle(this.params[0], this.params[1],
                     this.params[2], this.params[3],
                     this.params[4], this.params[5]);
        } else if (this.kind === PConstants.QUAD) {
          p.quad(this.params[0], this.params[1],
                 this.params[2], this.params[3],
                 this.params[4], this.params[5],
                 this.params[6], this.params[7]);
        } else if (this.kind === PConstants.RECT) {
          if (this.image !== null) {
            p.imageMode(PConstants.CORNER);
            p.image(this.image,
                    this.params[0],
                    this.params[1],
                    this.params[2],
                    this.params[3]);
          } else {
            p.rectMode(PConstants.CORNER);
            p.rect(this.params[0],
                   this.params[1],
                   this.params[2],
                   this.params[3]);
          }
        } else if (this.kind === PConstants.ELLIPSE) {
          p.ellipseMode(PConstants.CORNER);
          p.ellipse(this.params[0],
                    this.params[1],
                    this.params[2],
                    this.params[3]);
        } else if (this.kind === PConstants.ARC) {
          p.ellipseMode(PConstants.CORNER);
          p.arc(this.params[0],
                this.params[1],
                this.params[2],
                this.params[3],
                this.params[4],
                this.params[5]);
        } else if (this.kind === PConstants.BOX) {
          if (this.params.length === 1) {
            p.box(this.params[0]);
          } else {
            p.box(this.params[0], this.params[1], this.params[2]);
          }
        } else if (this.kind === PConstants.SPHERE) {
          p.sphere(this.params[0]);
        }
      },
      /**
       * @member PShape
       * The pre() function performs the preparations before the SVG is drawn. This includes doing transformations and storing previous styles.
       */
      pre: function() {
        if (this.matrix) {
          p.pushMatrix();
          curContext.transform(this.matrix.elements[0],
                               this.matrix.elements[3],
                               this.matrix.elements[1],
                               this.matrix.elements[4],
                               this.matrix.elements[2],
                               this.matrix.elements[5]);
          //p.applyMatrix(this.matrix.elements[0],this.matrix.elements[0]);
        }
        if (this.style) {
          p.pushStyle();
          this.styles();
        }
      },
      /**
       * @member PShape
       * The post() function performs the necessary actions after the SVG is drawn. This includes removing transformations and removing added styles.
       */
      post: function() {
        if (this.matrix) {
          p.popMatrix();
        }
        if (this.style) {
          p.popStyle();
        }
      },
      /**
       * @member PShape
       * The styles() function changes the Processing's current styles
       */
      styles: function() {
        if (this.stroke) {
          p.stroke(this.strokeColor);
          p.strokeWeight(this.strokeWeight);
          p.strokeCap(this.strokeCap);
          p.strokeJoin(this.strokeJoin);
        } else {
          p.noStroke();
        }

        if (this.fill) {
          p.fill(this.fillColor);

        } else {
          p.noFill();
        }
      },
      /**
       * @member PShape
       * The getChild() function extracts a child shape from a parent shape. Specify the name of the shape with the <b>target</b> parameter or the
       * layer position of the shape to get with the <b>index</b> parameter.
       * The shape is returned as a <b>PShape</b> object, or <b>null</b> is returned if there is an error.
       *
       * @param {String} target   the name of the shape to get
       * @param {int} index   the layer position of the shape to get
       *
       * @return {PShape} returns a child element of a shape as a PShape object or null if there is an error
       */
      getChild: function(child) {
        var i, j;
        if (typeof child === 'number') {
          return this.children[child];
        } else {
          var found;
          if(child === "" || this.name === child){
            return this;
          } else {
            if(this.nameTable.length > 0) {
              for(i = 0, j = this.nameTable.length; i < j || found; i++) {
                if(this.nameTable[i].getName === child) {
                  found = this.nameTable[i];
                }
              }
              if (found) { return found; }
            }
            for(i = 0, j = this.children.length; i < j; i++) {
              found = this.children[i].getChild(child);
              if(found) { return found; }
            }
          }
          return null;
        }
      },
      /**
       * @member PShape
       * The getChildCount() returns the number of children
       *
       * @return {int} returns a count of children
       */
      getChildCount: function () {
        return this.children.length;
      },
      /**
       * @member PShape
       * The addChild() adds a child to the PShape.
       *
       * @param {PShape} child the child to add
       */
      addChild: function( child ) {
        this.children.push(child);
        child.parent = this;
        if (child.getName() !== null) {
          this.addName(child.getName(), child);
        }
      },
      /**
       * @member PShape
       * The addName() functions adds a shape to the name lookup table.
       *
       * @param {String} name   the name to be added
       * @param {PShape} shape  the shape
       */
      addName: function(name,  shape) {
        if (this.parent !== null) {
          this.parent.addName( name, shape );
        } else {
          this.nameTable.push( [name, shape] );
        }
      },
      /**
       * @member PShape
       * The translate() function specifies an amount to displace the shape. The <b>x</b> parameter specifies left/right translation, the <b>y</b> parameter specifies up/down translation, and the <b>z</b> parameter specifies translations toward/away from the screen.
       * Subsequent calls to the method accumulates the effect. For example, calling <b>translate(50, 0)</b> and then <b>translate(20, 0)</b> is the same as <b>translate(70, 0)</b>.
       * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
       * <br><br>Using this method with the <b>z</b> parameter requires using the P3D or OPENGL parameter in combination with size.
       *
       * @param {int|float} x left/right translation
       * @param {int|float} y up/down translation
       * @param {int|float} z forward/back translation
       *
       * @see PMatrix2D#translate
       * @see PMatrix3D#translate
       */
      translate: function() {
        if(arguments.length === 2)
        {
          this.checkMatrix(2);
          this.matrix.translate(arguments[0], arguments[1]);
        } else {
          this.checkMatrix(3);
          this.matrix.translate(arguments[0], arguments[1], 0);
        }
      },
      /**
       * @member PShape
       * The checkMatrix() function makes sure that the shape's matrix is 1) not null, and 2) has a matrix
       * that can handle <em>at least</em> the specified number of dimensions.
       *
       * @param {int} dimensions the specified number of dimensions
       */
      checkMatrix: function(dimensions) {
        if(this.matrix === null) {
          if(dimensions === 2) {
            this.matrix = new p.PMatrix2D();
          } else {
            this.matrix = new p.PMatrix3D();
          }
        }else if(dimensions === 3 && this.matrix instanceof p.PMatrix2D) {
          this.matrix = new p.PMatrix3D();
        }
      },
      /**
       * @member PShape
       * The rotateX() function rotates a shape around the x-axis the amount specified by the <b>angle</b> parameter. Angles should be specified in radians (values from 0 to TWO_PI) or converted to radians with the <b>radians()</b> method.
       * <br><br>Shapes are always rotated around the upper-left corner of their bounding box. Positive numbers rotate objects in a clockwise direction.
       * Subsequent calls to the method accumulates the effect. For example, calling <b>rotateX(HALF_PI)</b> and then <b>rotateX(HALF_PI)</b> is the same as <b>rotateX(PI)</b>.
       * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
       * <br><br>This method requires a 3D renderer. You need to pass P3D or OPENGL as a third parameter into the <b>size()</b> method as shown in the example above.
       *
       * @param {float}angle angle of rotation specified in radians
       *
       * @see PMatrix3D#rotateX
       */
      rotateX: function(angle) {
        this.rotate(angle, 1, 0, 0);
      },
      /**
       * @member PShape
       * The rotateY() function rotates a shape around the y-axis the amount specified by the <b>angle</b> parameter. Angles should be specified in radians (values from 0 to TWO_PI) or converted to radians with the <b>radians()</b> method.
       * <br><br>Shapes are always rotated around the upper-left corner of their bounding box. Positive numbers rotate objects in a clockwise direction.
       * Subsequent calls to the method accumulates the effect. For example, calling <b>rotateY(HALF_PI)</b> and then <b>rotateY(HALF_PI)</b> is the same as <b>rotateY(PI)</b>.
       * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
       * <br><br>This method requires a 3D renderer. You need to pass P3D or OPENGL as a third parameter into the <b>size()</b> method as shown in the example above.
       *
       * @param {float}angle angle of rotation specified in radians
       *
       * @see PMatrix3D#rotateY
       */
      rotateY: function(angle) {
        this.rotate(angle, 0, 1, 0);
      },
      /**
       * @member PShape
       * The rotateZ() function rotates a shape around the z-axis the amount specified by the <b>angle</b> parameter. Angles should be specified in radians (values from 0 to TWO_PI) or converted to radians with the <b>radians()</b> method.
       * <br><br>Shapes are always rotated around the upper-left corner of their bounding box. Positive numbers rotate objects in a clockwise direction.
       * Subsequent calls to the method accumulates the effect. For example, calling <b>rotateZ(HALF_PI)</b> and then <b>rotateZ(HALF_PI)</b> is the same as <b>rotateZ(PI)</b>.
       * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
       * <br><br>This method requires a 3D renderer. You need to pass P3D or OPENGL as a third parameter into the <b>size()</b> method as shown in the example above.
       *
       * @param {float}angle angle of rotation specified in radians
       *
       * @see PMatrix3D#rotateZ
       */
      rotateZ: function(angle) {
        this.rotate(angle, 0, 0, 1);
      },
      /**
       * @member PShape
       * The rotate() function rotates a shape the amount specified by the <b>angle</b> parameter. Angles should be specified in radians (values from 0 to TWO_PI) or converted to radians with the <b>radians()</b> method.
       * <br><br>Shapes are always rotated around the upper-left corner of their bounding box. Positive numbers rotate objects in a clockwise direction.
       * Transformations apply to everything that happens after and subsequent calls to the method accumulates the effect.
       * For example, calling <b>rotate(HALF_PI)</b> and then <b>rotate(HALF_PI)</b> is the same as <b>rotate(PI)</b>.
       * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
       * If optional parameters x,y,z are supplied, the rotate is about the point (x, y, z).
       *
       * @param {float}angle  angle of rotation specified in radians
       * @param {float}x      x-coordinate of the point
       * @param {float}y      y-coordinate of the point
       * @param {float}z      z-coordinate of the point
       * @see PMatrix2D#rotate
       * @see PMatrix3D#rotate
       */
      rotate: function() {
        if(arguments.length === 1){
          this.checkMatrix(2);
          this.matrix.rotate(arguments[0]);
        } else {
          this.checkMatrix(3);
          this.matrix.rotate(arguments[0],
                             arguments[1],
                             arguments[2],
                             arguments[3]);
        }
      },
      /**
       * @member PShape
       * The scale() function increases or decreases the size of a shape by expanding and contracting vertices. Shapes always scale from the relative origin of their bounding box.
       * Scale values are specified as decimal percentages. For example, the method call <b>scale(2.0)</b> increases the dimension of a shape by 200%.
       * Subsequent calls to the method multiply the effect. For example, calling <b>scale(2.0)</b> and then <b>scale(1.5)</b> is the same as <b>scale(3.0)</b>.
       * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
       * <br><br>Using this fuction with the <b>z</b> parameter requires passing P3D or OPENGL into the size() parameter.
       *
       * @param {float}s      percentage to scale the object
       * @param {float}x      percentage to scale the object in the x-axis
       * @param {float}y      percentage to scale the object in the y-axis
       * @param {float}z      percentage to scale the object in the z-axis
       *
       * @see PMatrix2D#scale
       * @see PMatrix3D#scale
       */
      scale: function() {
        if(arguments.length === 2) {
          this.checkMatrix(2);
          this.matrix.scale(arguments[0], arguments[1]);
        } else if (arguments.length === 3) {
          this.checkMatrix(2);
          this.matrix.scale(arguments[0], arguments[1], arguments[2]);
        } else {
          this.checkMatrix(2);
          this.matrix.scale(arguments[0]);
        }
      },
      /**
       * @member PShape
       * The resetMatrix() function resets the matrix
       *
       * @see PMatrix2D#reset
       * @see PMatrix3D#reset
       */
      resetMatrix: function() {
        this.checkMatrix(2);
        this.matrix.reset();
      },
      /**
       * @member PShape
       * The applyMatrix() function multiplies this matrix by another matrix of type PMatrix3D or PMatrix2D.
       * Individual elements can also be provided
       *
       * @param {PMatrix3D|PMatrix2D} matrix   the matrix to multiply by
       *
       * @see PMatrix2D#apply
       * @see PMatrix3D#apply
       */
      applyMatrix: function(matrix) {
        if (arguments.length === 1) {
          this.applyMatrix(matrix.elements[0],
                           matrix.elements[1], 0,
                           matrix.elements[2],
                           matrix.elements[3],
                           matrix.elements[4], 0,
                           matrix.elements[5],
                           0, 0, 1, 0,
                           0, 0, 0, 1);
        } else if (arguments.length === 6) {
          this.checkMatrix(2);
          this.matrix.apply(arguments[0], arguments[1], arguments[2], 0,
                            arguments[3], arguments[4], arguments[5], 0,
                            0,   0,   1,   0,
                            0,   0,   0,   1);

        } else if (arguments.length === 16) {
          this.checkMatrix(3);
          this.matrix.apply(arguments[0],
                            arguments[1],
                            arguments[2],
                            arguments[3],
                            arguments[4],
                            arguments[5],
                            arguments[6],
                            arguments[7],
                            arguments[8],
                            arguments[9],
                            arguments[10],
                            arguments[11],
                            arguments[12],
                            arguments[13],
                            arguments[14],
                            arguments[15]);
        }
      }
    };

    /**
     * SVG stands for Scalable Vector Graphics, a portable graphics format. It is
     * a vector format so it allows for infinite resolution and relatively small
     * file sizes. Most modern media software can view SVG files, including Adobe
     * products, Firefox, etc. Illustrator and Inkscape can edit SVG files.
     *
     * @param {PApplet} parent     typically use "this"
     * @param {String} filename    name of the SVG file to load
     * @param {XMLElement} xml     an XMLElement element
     * @param {PShapeSVG} parent   the parent PShapeSVG
     *
     * @see PShape
     */
    var PShapeSVG = p.PShapeSVG = function() {
      p.PShape.call( this ); // PShape is the base class.
      if (arguments.length === 1) { //xml element coming in
        this.element  = arguments[0] ;//new p.XMLElement(null, arguments[0]);
        // set values to their defaults according to the SVG spec
        this.vertexCodes         = [];
        this.vertices            = [];
        this.opacity             = 1;

        this.stroke              = false;
        this.strokeColor         = PConstants.ALPHA_MASK;
        this.strokeWeight        = 1;
        this.strokeCap           = PConstants.SQUARE;  // BUTT in svg spec
        this.strokeJoin          = PConstants.MITER;
        this.strokeGradient      = null;
        this.strokeGradientPaint = null;
        this.strokeName          = null;
        this.strokeOpacity       = 1;

        this.fill                = true;
        this.fillColor           = PConstants.ALPHA_MASK;
        this.fillGradient        = null;
        this.fillGradientPaint   = null;
        this.fillName            = null;
        this.fillOpacity         = 1;

        if (this.element.getName() !== "svg") {
          throw("root is not <svg>, it's <" + this.element.getName() + ">");
        }
      }
      else if (arguments.length === 2) {
        if (typeof arguments[1] === 'string') {
          if (arguments[1].indexOf(".svg") > -1) { //its a filename
            this.element = new p.XMLElement(null, arguments[1]);
            // set values to their defaults according to the SVG spec
            this.vertexCodes         = [];
            this.vertices            = [];
            this.opacity             = 1;

            this.stroke              = false;
            this.strokeColor         = PConstants.ALPHA_MASK;
            this.strokeWeight        = 1;
            this.strokeCap           = PConstants.SQUARE;  // BUTT in svg spec
            this.strokeJoin          = PConstants.MITER;
            this.strokeGradient      = "";
            this.strokeGradientPaint = "";
            this.strokeName          = "";
            this.strokeOpacity       = 1;

            this.fill                = true;
            this.fillColor           = PConstants.ALPHA_MASK;
            this.fillGradient        = null;
            this.fillGradientPaint   = null;
            this.fillOpacity         = 1;

          }
        } else { // XMLElement
          if (arguments[0]) { // PShapeSVG
            this.element             = arguments[1];
            this.vertexCodes         = arguments[0].vertexCodes.slice();
            this.vertices            = arguments[0].vertices.slice();

            this.stroke              = arguments[0].stroke;
            this.strokeColor         = arguments[0].strokeColor;
            this.strokeWeight        = arguments[0].strokeWeight;
            this.strokeCap           = arguments[0].strokeCap;
            this.strokeJoin          = arguments[0].strokeJoin;
            this.strokeGradient      = arguments[0].strokeGradient;
            this.strokeGradientPaint = arguments[0].strokeGradientPaint;
            this.strokeName          = arguments[0].strokeName;

            this.fill                = arguments[0].fill;
            this.fillColor           = arguments[0].fillColor;
            this.fillGradient        = arguments[0].fillGradient;
            this.fillGradientPaint   = arguments[0].fillGradientPaint;
            this.fillName            = arguments[0].fillName;
            this.strokeOpacity       = arguments[0].strokeOpacity;
            this.fillOpacity         = arguments[0].fillOpacity;
            this.opacity             = arguments[0].opacity;
          }
        }
      }

      this.name      = this.element.getStringAttribute("id");
      var displayStr = this.element.getStringAttribute("display", "inline");
      this.visible   = displayStr !== "none";
      var str = this.element.getAttribute("transform");
      if (str) {
        this.matrix = this.parseMatrix(str);
      }
      // not proper parsing of the viewBox, but will cover us for cases where
      // the width and height of the object is not specified
      var viewBoxStr = this.element.getStringAttribute("viewBox");
      if ( viewBoxStr !== null ) {
        var viewBox = viewBoxStr.split(" ");
        this.width  = viewBox[2];
        this.height = viewBox[3];
      }

      // TODO if viewbox is not same as width/height, then use it to scale
      // the original objects. for now, viewbox only used when width/height
      // are empty values (which by the spec means w/h of "100%"
      var unitWidth  = this.element.getStringAttribute("width");
      var unitHeight = this.element.getStringAttribute("height");
      if (unitWidth !== null) {
        this.width  = this.parseUnitSize(unitWidth);
        this.height = this.parseUnitSize(unitHeight);
      } else {
        if ((this.width === 0) || (this.height === 0)) {
          // For the spec, the default is 100% and 100%. For purposes
          // here, insert a dummy value because this is prolly just a
          // font or something for which the w/h doesn't matter.
          this.width  = 1;
          this.height = 1;

          //show warning
          throw("The width and/or height is not " +
                "readable in the <svg> tag of this file.");
        }
      }
      this.parseColors(this.element);
      this.parseChildren(this.element);

    };
    /**
     * PShapeSVG methods
     * missing: getChild(), print(), parseStyleAttributes(), styles() - deals with strokeGradient and fillGradient
     */
    PShapeSVG.prototype = new PShape();
    /**
     * @member PShapeSVG
     * The parseMatrix() function parses the specified SVG matrix into a PMatrix2D. Note that PMatrix2D
     * is rotated relative to the SVG definition, so parameters are rearranged
     * here. More about the transformation matrices in
     * <a href="http://www.w3.org/TR/SVG/coords.html#TransformAttribute">this section</a>
     * of the SVG documentation.
     *
     * @param {String} str text of the matrix param.
     *
     * @return {PMatrix2D} a PMatrix2D
     */
    PShapeSVG.prototype.parseMatrix = function(str) {
      this.checkMatrix(2);
      var pieces = [];
      str.replace(/\s*(\w+)\((.*?)\)/g, function(all) {
        // get a list of transform definitions
        pieces.push(p.trim(all));
      });
      if (pieces.length === 0) {
        //p.println("Transformation:" + str + " is empty");
        return null;
      }
      for (var i = 0, j = pieces.length; i < j; i++) {
        var m = [];
        pieces[i].replace(/\((.*?)\)/, (function() {
          return function(all, params) {
            // get the coordinates that can be separated by spaces or a comma
            m = params.replace(/,+/g, " ").split(/\s+/);
          };
        }()));

        if (pieces[i].indexOf("matrix") !== -1) {
          this.matrix.set(m[0], m[2], m[4], m[1], m[3], m[5]);
        } else if (pieces[i].indexOf("translate") !== -1) {
          var tx = m[0];
          var ty = (m.length === 2) ? m[1] : 0;
          this.matrix.translate(tx,ty);
        } else if (pieces[i].indexOf("scale") !== -1) {
          var sx = m[0];
          var sy = (m.length === 2) ? m[1] : m[0];
          this.matrix.scale(sx,sy);
        } else if (pieces[i].indexOf("rotate") !== -1) {
          var angle = m[0];
          if (m.length === 1) {
            this.matrix.rotate(p.radians(angle));
          } else if (m.length === 3) {
            this.matrix.translate(m[1], m[2]);
            this.matrix.rotate(p.radians(m[0]));
            this.matrix.translate(-m[1], -m[2]);
          }
        } else if (pieces[i].indexOf("skewX") !== -1) {
          this.matrix.skewX(parseFloat(m[0]));
        } else if (pieces[i].indexOf("skewY") !== -1) {
          this.matrix.skewY(m[0]);
        }
      }
      return this.matrix;
    };
    /**
     * @member PShapeSVG
     * The parseChildren() function parses the specified XMLElement
     *
     * @param {XMLElement}element the XMLElement to parse
     */
    PShapeSVG.prototype.parseChildren = function(element) {
      var newelement = element.getChildren();
      var children   = new p.PShape();
      for (var i = 0, j = newelement.length; i < j; i++) {
        var kid = this.parseChild(newelement[i]);
        if (kid) {
          children.addChild(kid);
        }
      }
      this.children.push(children);
    };
    /**
     * @member PShapeSVG
     * The getName() function returns the name
     *
     * @return {String} the name
     */
    PShapeSVG.prototype.getName = function() {
      return this.name;
    };
    /**
     * @member PShapeSVG
     * The parseChild() function parses a child XML element.
     *
     * @param {XMLElement} elem the element to parse
     *
     * @return {PShape} the newly created PShape
     */
    PShapeSVG.prototype.parseChild = function( elem ) {
      var name = elem.getName();
      var shape;
      if (name === "g") {
        shape = new PShapeSVG(this, elem);
      } else if (name === "defs") {
        // generally this will contain gradient info, so may
        // as well just throw it into a group element for parsing
        shape = new PShapeSVG(this, elem);
      } else if (name === "line") {
        shape = new PShapeSVG(this, elem);
        shape.parseLine();
      } else if (name === "circle") {
        shape = new PShapeSVG(this, elem);
        shape.parseEllipse(true);
      } else if (name === "ellipse") {
        shape = new PShapeSVG(this, elem);
        shape.parseEllipse(false);
      } else if (name === "rect") {
        shape = new PShapeSVG(this, elem);
        shape.parseRect();
      } else if (name === "polygon") {
        shape = new PShapeSVG(this, elem);
        shape.parsePoly(true);
      } else if (name === "polyline") {
        shape = new PShapeSVG(this, elem);
        shape.parsePoly(false);
      } else if (name === "path") {
        shape = new PShapeSVG(this, elem);
        shape.parsePath();
      } else if (name === "radialGradient") {
        //return new RadialGradient(this, elem);
      } else if (name === "linearGradient") {
        //return new LinearGradient(this, elem);
      } else if (name === "text") {
        //p.println("Text in SVG files is not currently supported " +
        //          "convert text to outlines instead.");
      } else if (name === "filter") {
        //p.println("Filters are not supported.");
      } else if (name === "mask") {
        //p.println("Masks are not supported.");
      } else {
        //p.println("Ignoring  <" + name + "> tag.");
      }
      return shape;
    };
    /**
     * @member PShapeSVG
     * The parsePath() function parses the <path> element of the svg file
     * A path is defined by including a path element which contains a d="(path data)" attribute, where the d attribute contains
     * the moveto, line, curve (both cubic and quadratic Beziers), arc and closepath instructions.
     **/
    PShapeSVG.prototype.parsePath = function() {
      this.family = PConstants.PATH;
      this.kind = 0;
      var pathDataChars = [];
      var c;
      //change multiple spaces and commas to single space
      var pathData = p.trim(this.element.getStringAttribute("d")
                            .replace(/[\s,]+/g,' '));
      if (pathData === null) {
        return;
      }
      pathData = p.__toCharArray(pathData);
      var cx     = 0,
          cy     = 0,
          ctrlX  = 0,
          ctrlY  = 0,
          ctrlX1 = 0,
          ctrlX2 = 0,
          ctrlY1 = 0,
          ctrlY2 = 0,
          endX   = 0,
          endY   = 0,
          ppx    = 0,
          ppy    = 0,
          px     = 0,
          py     = 0,
          i      = 0,
          valOf  = 0;
      var str = "";
      var tmpArray =[];
      var flag = false;
      var lastInstruction;
      var command;
      var j, k;
      while (i< pathData.length) {
        valOf = pathData[i].valueOf();
        if ((valOf >= 65 && valOf <= 90) || (valOf >= 97 && valOf <= 122)) {
          // if it's a letter
          // populate the tmpArray with coordinates
          j = i;
          i++;
          if (i < pathData.length) { // don't go over boundary of array
            tmpArray = [];
            valOf = pathData[i].valueOf();
            while (!((valOf >= 65 && valOf <= 90) ||
                     (valOf >= 97 && valOf <= 100) ||
                     (valOf >= 102 && valOf <= 122))
                     && flag === false) { // if its NOT a letter
              if (valOf === 32) { //if its a space and the str isn't empty
                // sometimes you get a space after the letter
                if (str !== "") {
                  tmpArray.push(parseFloat(str));
                  str = "";
                }
                i++;
              } else if (valOf === 45) { //if it's a -
                // allow for 'e' notation in numbers, e.g. 2.10e-9
                if (pathData[i-1].valueOf() === 101) {
                  str += pathData[i].toString();
                  i++;
                } else {
                  // sometimes no space separator after (ex: 104.535-16.322)
                  if (str !== "") {
                    tmpArray.push(parseFloat(str));
                  }
                  str = pathData[i].toString();
                  i++;
                }
              } else {
                str += pathData[i].toString();
                i++;
              }
              if (i === pathData.length) { // don't go over boundary of array
                flag = true;
              } else {
                valOf = pathData[i].valueOf();
              }
            }
          }
          if (str !== "") {
            tmpArray.push(parseFloat(str));
            str = "";
          }
          command = pathData[j];
          valOf = command.valueOf();
          if (valOf === 77) {  // M - move to (absolute)
            if (tmpArray.length >= 2 && tmpArray.length % 2 ===0) {
              // need one+ pairs of co-ordinates
              cx = tmpArray[0];
              cy = tmpArray[1];
              this.parsePathMoveto(cx, cy);
              if (tmpArray.length > 2) {
                for (j = 2, k = tmpArray.length; j < k; j+=2) {
                  // absolute line to
                  cx = tmpArray[j];
                  cy = tmpArray[j+1];
                  this.parsePathLineto(cx,cy);
                }
              }
            }
          } else if (valOf === 109) {  // m - move to (relative)
            if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
              // need one+ pairs of co-ordinates
              this.parsePathMoveto(cx,cy);
              if (tmpArray.length > 2) {
                for (j = 2, k = tmpArray.length; j < k; j+=2) {
                  // relative line to
                  cx += tmpArray[j];
                  cy += tmpArray[j + 1];
                  this.parsePathLineto(cx,cy);
                }
              }
            }
          } else if (valOf === 76) { // L - lineto (absolute)
            if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
              // need one+ pairs of co-ordinates
              for (j = 0, k = tmpArray.length; j < k; j+=2) {
                cx = tmpArray[j];
                cy = tmpArray[j + 1];
                this.parsePathLineto(cx,cy);
              }
            }
          } else if (valOf === 108) { // l - lineto (relative)
            if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
              // need one+ pairs of co-ordinates
              for (j = 0, k = tmpArray.length; j < k; j+=2) {
                cx += tmpArray[j];
                cy += tmpArray[j+1];
                this.parsePathLineto(cx,cy);
              }
            }
          } else if (valOf === 72) { // H - horizontal lineto (absolute)
            for (j = 0, k = tmpArray.length; j < k; j++) {
              // multiple x co-ordinates can be provided
              cx = tmpArray[j];
              this.parsePathLineto(cx, cy);
            }
          } else if (valOf === 104) { // h - horizontal lineto (relative)
            for (j = 0, k = tmpArray.length; j < k; j++) {
              // multiple x co-ordinates can be provided
              cx += tmpArray[j];
              this.parsePathLineto(cx, cy);
            }
          } else if (valOf === 86) { // V - vertical lineto (absolute)
            for (j = 0, k = tmpArray.length; j < k; j++) {
              // multiple y co-ordinates can be provided
              cy = tmpArray[j];
              this.parsePathLineto(cx, cy);
            }
          } else if (valOf === 118) { // v - vertical lineto (relative)
            for (j = 0, k = tmpArray.length; j < k; j++) {
              // multiple y co-ordinates can be provided
              cy += tmpArray[j];
              this.parsePathLineto(cx, cy);
            }
          } else if (valOf === 67) { // C - curve to (absolute)
            if (tmpArray.length >= 6 && tmpArray.length % 6 === 0) {
              // need one+ multiples of 6 co-ordinates
              for (j = 0, k = tmpArray.length; j < k; j+=6) {
                ctrlX1 = tmpArray[j];
                ctrlY1 = tmpArray[j + 1];
                ctrlX2 = tmpArray[j + 2];
                ctrlY2 = tmpArray[j + 3];
                endX   = tmpArray[j + 4];
                endY   = tmpArray[j + 5];
                this.parsePathCurveto(ctrlX1,
                                      ctrlY1,
                                      ctrlX2,
                                      ctrlY2,
                                      endX,
                                      endY);
                cx = endX;
                cy = endY;
              }
            }
          } else if (valOf === 99) { // c - curve to (relative)
            if (tmpArray.length >= 6 && tmpArray.length % 6 === 0) {
              // need one+ multiples of 6 co-ordinates
              for (j = 0, k = tmpArray.length; j < k; j+=6) {
                ctrlX1 = cx + tmpArray[j];
                ctrlY1 = cy + tmpArray[j + 1];
                ctrlX2 = cx + tmpArray[j + 2];
                ctrlY2 = cy + tmpArray[j + 3];
                endX   = cx + tmpArray[j + 4];
                endY   = cy + tmpArray[j + 5];
                this.parsePathCurveto(ctrlX1,
                                      ctrlY1,
                                      ctrlX2,
                                      ctrlY2,
                                      endX,
                                      endY);
                cx = endX;
                cy = endY;
              }
            }
          } else if (valOf === 83) { // S - curve to shorthand (absolute)
            if (tmpArray.length >= 4 && tmpArray.length % 4 === 0) {
              // need one+ multiples of 4 co-ordinates
              for (j = 0, k = tmpArray.length; j < k; j+=4) {
                if (lastInstruction.toLowerCase() ===  "c" ||
                    lastInstruction.toLowerCase() ===  "s") {
                  ppx    = this.vertices[ this.vertices.length-2 ][0];
                  ppy    = this.vertices[ this.vertices.length-2 ][1];
                  px     = this.vertices[ this.vertices.length-1 ][0];
                  py     = this.vertices[ this.vertices.length-1 ][1];
                  ctrlX1 = px + (px - ppx);
                  ctrlY1 = py + (py - ppy);
                } else {
                  //If there is no previous curve,
                  //the current point will be used as the first control point.
                  ctrlX1 = this.vertices[this.vertices.length-1][0];
                  ctrlY1 = this.vertices[this.vertices.length-1][1];
                }
                ctrlX2 = tmpArray[j];
                ctrlY2 = tmpArray[j + 1];
                endX   = tmpArray[j + 2];
                endY   = tmpArray[j + 3];
                this.parsePathCurveto(ctrlX1,
                                      ctrlY1,
                                      ctrlX2,
                                      ctrlY2,
                                      endX,
                                      endY);
                cx = endX;
                cy = endY;
              }
            }
          } else if (valOf === 115) { // s - curve to shorthand (relative)
            if (tmpArray.length >= 4 && tmpArray.length % 4 === 0) {
              // need one+ multiples of 4 co-ordinates
              for (j = 0, k = tmpArray.length; j < k; j+=4) {
                if (lastInstruction.toLowerCase() ===  "c" ||
                    lastInstruction.toLowerCase() ===  "s") {
                  ppx    = this.vertices[this.vertices.length-2][0];
                  ppy    = this.vertices[this.vertices.length-2][1];
                  px     = this.vertices[this.vertices.length-1][0];
                  py     = this.vertices[this.vertices.length-1][1];
                  ctrlX1 = px + (px - ppx);
                  ctrlY1 = py + (py - ppy);
                } else {
                  //If there is no previous curve,
                  //the current point will be used as the first control point.
                  ctrlX1 = this.vertices[this.vertices.length-1][0];
                  ctrlY1 = this.vertices[this.vertices.length-1][1];
                }
                ctrlX2 = cx + tmpArray[j];
                ctrlY2 = cy + tmpArray[j + 1];
                endX   = cx + tmpArray[j + 2];
                endY   = cy + tmpArray[j + 3];
                this.parsePathCurveto(ctrlX1,
                                      ctrlY1,
                                      ctrlX2,
                                      ctrlY2,
                                      endX,
                                      endY);
                cx = endX;
                cy = endY;
              }
            }
          } else if (valOf === 81) { // Q - quadratic curve to (absolute)
            if (tmpArray.length >= 4 && tmpArray.length % 4 === 0) {
              // need one+ multiples of 4 co-ordinates
              for (j = 0, k = tmpArray.length; j < k; j+=4) {
                ctrlX = tmpArray[j];
                ctrlY = tmpArray[j + 1];
                endX  = tmpArray[j + 2];
                endY  = tmpArray[j + 3];
                this.parsePathQuadto(cx, cy, ctrlX, ctrlY, endX, endY);
                cx = endX;
                cy = endY;
              }
            }
          } else if (valOf === 113) { // q - quadratic curve to (relative)
            if (tmpArray.length >= 4 && tmpArray.length % 4 === 0) {
              // need one+ multiples of 4 co-ordinates
              for (j = 0, k = tmpArray.length; j < k; j+=4) {
                ctrlX = cx + tmpArray[j];
                ctrlY = cy + tmpArray[j + 1];
                endX  = cx + tmpArray[j + 2];
                endY  = cy + tmpArray[j + 3];
                this.parsePathQuadto(cx, cy, ctrlX, ctrlY, endX, endY);
                cx = endX;
                cy = endY;
              }
            }
          } else if (valOf === 84) {
            // T - quadratic curve to shorthand (absolute)
            if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
              // need one+ pairs of co-ordinates
              for (j = 0, k = tmpArray.length; j < k; j+=2) {
                if (lastInstruction.toLowerCase() ===  "q" ||
                    lastInstruction.toLowerCase() ===  "t") {
                  ppx   = this.vertices[this.vertices.length-2][0];
                  ppy   = this.vertices[this.vertices.length-2][1];
                  px    = this.vertices[this.vertices.length-1][0];
                  py    = this.vertices[this.vertices.length-1][1];
                  ctrlX = px + (px - ppx);
                  ctrlY = py + (py - ppy);
                } else {
                  // If there is no previous command or if the previous command
                  // was not a Q, q, T or t, assume the control point is
                  // coincident with the current point.
                  ctrlX = cx;
                  ctrlY = cy;
                }
                endX  = tmpArray[j];
                endY  = tmpArray[j + 1];
                this.parsePathQuadto(cx, cy, ctrlX, ctrlY, endX, endY);
                cx = endX;
                cy = endY;
              }
            }
          } else if (valOf === 116) {
            // t - quadratic curve to shorthand (relative)
            if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
              // need one+ pairs of co-ordinates
              for (j = 0, k = tmpArray.length; j < k; j+=2) {
                if (lastInstruction.toLowerCase() ===  "q" ||
                    lastInstruction.toLowerCase() ===  "t") {
                  ppx   = this.vertices[this.vertices.length-2][0];
                  ppy   = this.vertices[this.vertices.length-2][1];
                  px    = this.vertices[this.vertices.length-1][0];
                  py    = this.vertices[this.vertices.length-1][1];
                  ctrlX = px + (px - ppx);
                  ctrlY = py + (py - ppy);
                } else {
                  // If there is no previous command or if the previous command
                  // was not a Q, q, T or t, assume the control point is
                  // coincident with the current point.
                  ctrlX = cx;
                  ctrlY = cy;
                }
                endX  = cx + tmpArray[j];
                endY  = cy + tmpArray[j + 1];
                this.parsePathQuadto(cx, cy, ctrlX, ctrlY, endX, endY);
                cx = endX;
                cy = endY;
              }
            }
          } else if (valOf === 90) {
            //Z
          } else if (valOf === 122) { //z
            this.close = true;
          }
          lastInstruction = command.toString();
        } else { i++;}
      }
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parsePath() helper function
     *
     * @see PShapeSVG#parsePath
     */
    PShapeSVG.prototype.parsePathQuadto = function(x1, y1, cx, cy, x2, y2) {
      if (this.vertices.length > 0) {
        this.parsePathCode(PConstants.BEZIER_VERTEX);
        // x1/y1 already covered by last moveto, lineto, or curveto
        this.parsePathVertex(x1 + ((cx-x1)*2/3), y1 + ((cy-y1)*2/3));
        this.parsePathVertex(x2 + ((cx-x2)*2/3), y2 + ((cy-y2)*2/3));
        this.parsePathVertex(x2, y2);
      } else {
        throw ("Path must start with M/m");
      }
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parsePath() helper function
     *
     * @see PShapeSVG#parsePath
     */
    PShapeSVG.prototype.parsePathCurveto = function(x1,  y1, x2, y2, x3, y3) {
      if (this.vertices.length > 0) {
        this.parsePathCode(PConstants.BEZIER_VERTEX );
        this.parsePathVertex(x1, y1);
        this.parsePathVertex(x2, y2);
        this.parsePathVertex(x3, y3);
      } else {
        throw ("Path must start with M/m");
      }
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parsePath() helper function
     *
     * @see PShapeSVG#parsePath
     */
    PShapeSVG.prototype.parsePathLineto = function(px, py) {
      if (this.vertices.length > 0) {
        this.parsePathCode(PConstants.VERTEX);
        this.parsePathVertex(px, py);
        // add property to distinguish between curContext.moveTo
        // or curContext.lineTo
        this.vertices[this.vertices.length-1]["moveTo"] = false;
      } else {
        throw ("Path must start with M/m");
      }
    };

    PShapeSVG.prototype.parsePathMoveto = function(px, py) {
      if (this.vertices.length > 0) {
        this.parsePathCode(PConstants.BREAK);
      }
      this.parsePathCode(PConstants.VERTEX);
      this.parsePathVertex(px, py);
      // add property to distinguish between curContext.moveTo
      // or curContext.lineTo
      this.vertices[this.vertices.length-1]["moveTo"] = true;
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parsePath() helper function
     *
     * @see PShapeSVG#parsePath
     */
    PShapeSVG.prototype.parsePathVertex = function(x,  y) {
      var verts = [];
      verts[0]  = x;
      verts[1]  = y;
      this.vertices.push(verts);
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parsePath() helper function
     *
     * @see PShapeSVG#parsePath
     */
    PShapeSVG.prototype.parsePathCode = function(what) {
      this.vertexCodes.push(what);
    };
    /**
     * @member PShapeSVG
     * The parsePoly() function parses a polyline or polygon from an SVG file.
     *
     * @param {boolean}val true if shape is closed (polygon), false if not (polyline)
     */
    PShapeSVG.prototype.parsePoly = function(val) {
      this.family    = PConstants.PATH;
      this.close     = val;
      var pointsAttr = p.trim(this.element.getStringAttribute("points")
                              .replace(/[,\s]+/g,' '));
      if (pointsAttr !== null) {
        //split into array
        var pointsBuffer = pointsAttr.split(" ");
        if (pointsBuffer.length % 2 === 0) {
          for (var i = 0, j = pointsBuffer.length; i < j; i++) {
            var verts = [];
            verts[0]  = pointsBuffer[i];
            verts[1]  = pointsBuffer[++i];
            this.vertices.push(verts);
          }
        } else {
          //p.println("Error parsing polygon points: " +
          //          "odd number of coordinates provided");
        }
      }
    };
    /**
     * @member PShapeSVG
     * The parseRect() function parses a rect from an SVG file.
     */
    PShapeSVG.prototype.parseRect = function() {
      this.kind      = PConstants.RECT;
      this.family    = PConstants.PRIMITIVE;
      this.params    = [];
      this.params[0] = this.element.getFloatAttribute("x");
      this.params[1] = this.element.getFloatAttribute("y");
      this.params[2] = this.element.getFloatAttribute("width");
      this.params[3] = this.element.getFloatAttribute("height");
    };
    /**
     * @member PShapeSVG
     * The parseEllipse() function handles parsing ellipse and circle tags.
     *
     * @param {boolean}val true if this is a circle and not an ellipse
     */
    PShapeSVG.prototype.parseEllipse = function(val) {
      this.kind   = PConstants.ELLIPSE;
      this.family = PConstants.PRIMITIVE;
      this.params = [];

      this.params[0] = this.element.getFloatAttribute("cx");
      this.params[1] = this.element.getFloatAttribute("cy");

      var rx, ry;
      if (val) {
        rx = ry = this.element.getFloatAttribute("r");
      } else {
        rx = this.element.getFloatAttribute("rx");
        ry = this.element.getFloatAttribute("ry");
      }
      this.params[0] -= rx;
      this.params[1] -= ry;

      this.params[2] = rx*2;
      this.params[3] = ry*2;
    };
    /**
     * @member PShapeSVG
     * The parseLine() function handles parsing line tags.
     *
     * @param {boolean}val true if this is a circle and not an ellipse
     */
    PShapeSVG.prototype.parseLine = function() {
      this.kind = PConstants.LINE;
      this.family = PConstants.PRIMITIVE;
      this.params = [];
      this.params[0] = this.element.getFloatAttribute("x1");
      this.params[1] = this.element.getFloatAttribute("y1");
      this.params[2] = this.element.getFloatAttribute("x2");
      this.params[3] = this.element.getFloatAttribute("y2");
    };
    /**
     * @member PShapeSVG
     * The parseColors() function handles parsing the opacity, strijem stroke-width, stroke-linejoin,stroke-linecap, fill, and style attributes
     *
     * @param {XMLElement}element the element of which attributes to parse
     */
    PShapeSVG.prototype.parseColors = function(element) {
      if (element.hasAttribute("opacity")) {
        this.setOpacity(element.getAttribute("opacity"));
      }
      if (element.hasAttribute("stroke")) {
        this.setStroke(element.getAttribute("stroke"));
      }
      if (element.hasAttribute("stroke-width")) {
        // if NaN (i.e. if it's 'inherit') then default
        // back to the inherit setting
        this.setStrokeWeight(element.getAttribute("stroke-width"));
      }
      if (element.hasAttribute("stroke-linejoin") ) {
        this.setStrokeJoin(element.getAttribute("stroke-linejoin"));
      }
      if (element.hasAttribute("stroke-linecap")) {
        this.setStrokeCap(element.getStringAttribute("stroke-linecap"));
      }
      // fill defaults to black (though stroke defaults to "none")
      // http://www.w3.org/TR/SVG/painting.html#FillProperties
      if (element.hasAttribute("fill")) {
        this.setFill(element.getStringAttribute("fill"));
      }
      if (element.hasAttribute("style")) {
        var styleText   = element.getStringAttribute("style");
        var styleTokens = styleText.toString().split( ";" );

        for (var i = 0, j = styleTokens.length; i < j; i++) {
          var tokens = p.trim(styleTokens[i].split( ":" ));
          if (tokens[0] === "fill") {
              this.setFill(tokens[1]);
          } else if (tokens[0] === "fill-opacity") {
              this.setFillOpacity(tokens[1]);
          } else if (tokens[0] === "stroke") {
              this.setStroke(tokens[1]);
          } else if (tokens[0] === "stroke-width") {
              this.setStrokeWeight(tokens[1]);
          } else if (tokens[0] === "stroke-linecap") {
              this.setStrokeCap(tokens[1]);
          } else if (tokens[0] === "stroke-linejoin") {
              this.setStrokeJoin(tokens[1]);
          } else if (tokens[0] === "stroke-opacity") {
              this.setStrokeOpacity(tokens[1]);
          } else if (tokens[0] === "opacity") {
              this.setOpacity(tokens[1]);
          } // Other attributes are not yet implemented
        }
      }
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parseColors() helper function
     *
     * @param {String} opacityText the value of fillOpacity
     *
     * @see PShapeSVG#parseColors
     */
    PShapeSVG.prototype.setFillOpacity = function(opacityText) {
      this.fillOpacity = parseFloat(opacityText);
      this.fillColor   = this.fillOpacity * 255  << 24 |
                         this.fillColor & 0xFFFFFF;
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parseColors() helper function
     *
     * @param {String} fillText the value of fill
     *
     * @see PShapeSVG#parseColors
     */
    PShapeSVG.prototype.setFill = function (fillText) {
      var opacityMask = this.fillColor & 0xFF000000;
      if (fillText === "none") {
        this.fill = false;
      } else if (fillText.indexOf("#") === 0) {
        this.fill      = true;
        this.fillColor = opacityMask |
                         (parseInt(fillText.substring(1), 16 )) &
                         0xFFFFFF;
      } else if (fillText.indexOf("rgb") === 0) {
        this.fill      = true;
        this.fillColor = opacityMask | this.parseRGB(fillText);
      } else if (fillText.indexOf("url(#") === 0) {
        this.fillName = fillText.substring(5, fillText.length - 1 );
        /*Object fillObject = findChild(fillName);
        if (fillObject instanceof Gradient) {
          fill = true;
          fillGradient = (Gradient) fillObject;
          fillGradientPaint = calcGradientPaint(fillGradient); //, opacity);
        } else {
          System.err.println("url " + fillName + " refers to unexpected data");
        }*/
      } else {
        if (colors[fillText]) {
          this.fill      = true;
          this.fillColor = opacityMask |
                           (parseInt(colors[fillText].substring(1), 16)) &
                           0xFFFFFF;
        }
      }
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parseColors() helper function
     *
     * @param {String} opacity the value of opacity
     *
     * @see PShapeSVG#parseColors
     */
    PShapeSVG.prototype.setOpacity = function(opacity) {
      this.strokeColor = parseFloat(opacity) * 255 << 24 |
                         this.strokeColor & 0xFFFFFF;
      this.fillColor   = parseFloat(opacity) * 255 << 24 |
                         this.fillColor & 0xFFFFFF;
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parseColors() helper function
     *
     * @param {String} strokeText the value to set stroke to
     *
     * @see PShapeSVG#parseColors
     */
    PShapeSVG.prototype.setStroke = function(strokeText) {
      var opacityMask = this.strokeColor & 0xFF000000;
      if (strokeText === "none") {
        this.stroke = false;
      } else if (strokeText.charAt( 0 ) === "#") {
        this.stroke      = true;
        this.strokeColor = opacityMask |
                           (parseInt( strokeText.substring( 1 ), 16 )) &
                           0xFFFFFF;
      } else if (strokeText.indexOf( "rgb" ) === 0 ) {
        this.stroke = true;
        this.strokeColor = opacityMask | this.parseRGB(strokeText);
      } else if (strokeText.indexOf( "url(#" ) === 0) {
        this.strokeName = strokeText.substring(5, strokeText.length - 1);
          //this.strokeObject = findChild(strokeName);
        /*if (strokeObject instanceof Gradient) {
          strokeGradient = (Gradient) strokeObject;
          strokeGradientPaint = calcGradientPaint(strokeGradient);
                                //, opacity);
        } else {
          System.err.println("url " + strokeName +
                             " refers to unexpected data");
        }*/
      } else {
        if (colors[strokeText]){
          this.stroke      = true;
          this.strokeColor = opacityMask |
                             (parseInt(colors[strokeText].substring(1), 16)) &
                             0xFFFFFF;
        }
      }
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parseColors() helper function
     *
     * @param {String} weight the value to set strokeWeight to
     *
     * @see PShapeSVG#parseColors
     */
    PShapeSVG.prototype.setStrokeWeight = function(weight) {
      this.strokeWeight = this.parseUnitSize(weight);
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parseColors() helper function
     *
     * @param {String} linejoin the value to set strokeJoin to
     *
     * @see PShapeSVG#parseColors
     */
    PShapeSVG.prototype.setStrokeJoin = function(linejoin) {
      if (linejoin === "miter") {
        this.strokeJoin = PConstants.MITER;

      } else if (linejoin === "round") {
        this.strokeJoin = PConstants.ROUND;

      } else if (linejoin === "bevel") {
        this.strokeJoin = PConstants.BEVEL;
      }
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parseColors() helper function
     *
     * @param {String} linecap the value to set strokeCap to
     *
     * @see PShapeSVG#parseColors
     */
    PShapeSVG.prototype.setStrokeCap = function (linecap) {
      if (linecap === "butt") {
        this.strokeCap = PConstants.SQUARE;

      } else if (linecap === "round") {
        this.strokeCap = PConstants.ROUND;

      } else if (linecap === "square") {
        this.strokeCap = PConstants.PROJECT;
      }
    };
    /**
     * @member PShapeSVG
     * PShapeSVG.parseColors() helper function
     *
     * @param {String} opacityText the value to set stroke opacity to
     *
     * @see PShapeSVG#parseColors
     */
    PShapeSVG.prototype.setStrokeOpacity =  function (opacityText) {
      this.strokeOpacity = parseFloat(opacityText);
      this.strokeColor   = this.strokeOpacity * 255 << 24 |
                           this.strokeColor &
                           0xFFFFFF;
    };
    /**
     * @member PShapeSVG
     * The parseRGB() function parses an rbg() color string and returns a color int
     *
     * @param {String} color the color to parse in rbg() format
     *
     * @return {int} the equivalent color int
     */
    PShapeSVG.prototype.parseRGB = function(color) {
      var sub    = color.substring(color.indexOf('(') + 1, color.indexOf(')'));
      var values = sub.split(", ");
      return (values[0] << 16) | (values[1] << 8) | (values[2]);
    };
    /**
     * @member PShapeSVG
     * The parseUnitSize() function parse a size that may have a suffix for its units.
     * Ignoring cases where this could also be a percentage.
     * The <A HREF="http://www.w3.org/TR/SVG/coords.html#Units">units</A> spec:
     * <UL>
     * <LI>"1pt" equals "1.25px" (and therefore 1.25 user units)
     * <LI>"1pc" equals "15px" (and therefore 15 user units)
     * <LI>"1mm" would be "3.543307px" (3.543307 user units)
     * <LI>"1cm" equals "35.43307px" (and therefore 35.43307 user units)
     * <LI>"1in" equals "90px" (and therefore 90 user units)
     * </UL>
     */
    PShapeSVG.prototype.parseUnitSize = function (text) {
      var len = text.length - 2;
      if (len < 0) { return text; }
      if (text.indexOf("pt") === len) {
        return parseFloat(text.substring(0, len)) * 1.25;
      } else if (text.indexOf("pc") === len) {
        return parseFloat( text.substring( 0, len)) * 15;
      } else if (text.indexOf("mm") === len) {
        return parseFloat( text.substring(0, len)) * 3.543307;
      } else if (text.indexOf("cm") === len) {
        return parseFloat(text.substring(0, len)) * 35.43307;
      } else if (text.indexOf("in") === len) {
        return parseFloat(text.substring(0, len)) * 90;
      } else if (text.indexOf("px") === len) {
        return parseFloat(text.substring(0, len));
      } else {
        return parseFloat(text);
      }
    };
    /**
     * The shape() function displays shapes to the screen.
     * Processing currently works with SVG shapes only.
     * The <b>shape</b> parameter specifies the shape to display and the <b>x</b>
     * and <b>y</b> parameters define the location of the shape from its
     * upper-left corner.
     * The shape is displayed at its original size unless the <b>width</b>
     * and <b>height</b> parameters specify a different size.
     * The <b>shapeMode()</b> function changes the way the parameters work.
     * A call to <b>shapeMode(CORNERS)</b>, for example, will change the width
     * and height parameters to define the x and y values of the opposite corner
     * of the shape.
     * <br><br>
     * Note complex shapes may draw awkwardly with P2D, P3D, and OPENGL. Those
     * renderers do not yet support shapes that have holes or complicated breaks.
     *
     * @param {PShape} shape       the shape to display
     * @param {int|float} x        x-coordinate of the shape
     * @param {int|float} y        y-coordinate of the shape
     * @param {int|float} width    width to display the shape
     * @param {int|float} height   height to display the shape
     *
     * @see PShape
     * @see loadShape()
     * @see shapeMode()
     */
    p.shape = function(shape, x, y, width, height) {
      if (arguments.length >= 1 && arguments[0] !== null) {
        if (shape.isVisible()) {
          p.pushMatrix();
          if (curShapeMode === PConstants.CENTER) {
            if (arguments.length === 5) {
              p.translate(x - width/2, y - height/2);
              p.scale(width / shape.getWidth(), height / shape.getHeight());
            } else if (arguments.length === 3) {
              p.translate(x - shape.getWidth()/2, - shape.getHeight()/2);
            } else {
              p.translate(-shape.getWidth()/2, -shape.getHeight()/2);
            }
          } else if (curShapeMode === PConstants.CORNER) {
            if (arguments.length === 5) {
              p.translate(x, y);
              p.scale(width / shape.getWidth(), height / shape.getHeight());
            } else if (arguments.length === 3) {
              p.translate(x, y);
            }
          } else if (curShapeMode === PConstants.CORNERS) {
            if (arguments.length === 5) {
              width  -= x;
              height -= y;
              p.translate(x, y);
              p.scale(width / shape.getWidth(), height / shape.getHeight());
            } else if (arguments.length === 3) {
              p.translate(x, y);
            }
          }
          shape.draw();
          if ((arguments.length === 1 && curShapeMode === PConstants.CENTER ) || arguments.length > 1) {
            p.popMatrix();
          }
        }
      }
    };

    /**
     * The shapeMode() function modifies the location from which shapes draw.
     * The default mode is <b>shapeMode(CORNER)</b>, which specifies the
     * location to be the upper left corner of the shape and uses the third
     * and fourth parameters of <b>shape()</b> to specify the width and height.
     * The syntax <b>shapeMode(CORNERS)</b> uses the first and second parameters
     * of <b>shape()</b> to set the location of one corner and uses the third
     * and fourth parameters to set the opposite corner.
     * The syntax <b>shapeMode(CENTER)</b> draws the shape from its center point
     * and uses the third and forth parameters of <b>shape()</b> to specify the
     * width and height.
     * The parameter must be written in "ALL CAPS" because Processing syntax
     * is case sensitive.
     *
     * @param {int} mode One of CORNER, CORNERS, CENTER
     *
     * @see shape()
     * @see rectMode()
     */
    p.shapeMode = function (mode) {
      curShapeMode = mode;
    };

    /**
     * The loadShape() function loads vector shapes into a variable of type PShape. Currently, only SVG files may be loaded.
     * In most cases, <b>loadShape()</b> should be used inside <b>setup()</b> because loading shapes inside <b>draw()</b> will reduce the speed of a sketch.
     *
     * @param {String} filename     an SVG file
     *
     * @return {PShape} a object of type PShape or null
     * @see PShape
     * @see PApplet#shape()
     * @see PApplet#shapeMode()
     */
    p.loadShape = function (filename) {
      if (arguments.length === 1) {
        if (filename.indexOf(".svg") > -1) {
          return new PShapeSVG(null, filename);
        }
      }
      return null;
    };

    /**
     * XMLAttribute is an attribute of a XML element. This is an internal class
     *
     * @param {String} fname     the full name of the attribute
     * @param {String} n         the short name of the attribute
     * @param {String} namespace the namespace URI of the attribute
     * @param {String} v         the value of the attribute
     * @param {String }t         the type of the attribute
     *
     * @see XMLElement
     */
    var XMLAttribute = function(fname, n, nameSpace, v, t){
      this.fullName = fname || "";
      this.name = n || "";
      this.namespace = nameSpace || "";
      this.value = v;
      this.type = t;
    };
    /**
     * XMLAttribute methods
     */
    XMLAttribute.prototype = {
      /**
       * @member XMLAttribute
       * The getName() function returns the short name of the attribute
       *
       * @return {String} the short name of the attribute
       */
      getName: function() {
        return this.name;
      },
      /**
       * @member XMLAttribute
       * The getFullName() function returns the full name of the attribute
       *
       * @return {String} the full name of the attribute
       */
      getFullName: function() {
        return this.fullName;
      },
      /**
       * @member XMLAttribute
       * The getNamespace() function returns the namespace of the attribute
       *
       * @return {String} the namespace of the attribute
       */
      getNamespace: function() {
        return this.namespace;
      },
      /**
       * @member XMLAttribute
       * The getValue() function returns the value of the attribute
       *
       * @return {String} the value of the attribute
       */
      getValue: function() {
        return this.value;
      },
      /**
       * @member XMLAttribute
       * The getValue() function returns the type of the attribute
       *
       * @return {String} the type of the attribute
       */
      getType: function() {
        return this.type;
      },
      /**
       * @member XMLAttribute
       * The setValue() function sets the value of the attribute
       *
       * @param {String} newval the new value
       */
      setValue: function(newval) {
        this.value = newval;
      }
    };

    /**
     * XMLElement is a representation of an XML object. The object is able to parse XML code
     *
     * @param {PApplet} parent   typically use "this"
     * @param {String} filename  name of the XML/SVG file to load
     * @param {String} xml       the xml/svg string
     * @param {String} fullname  the full name of the element
     * @param {String} namespace the namespace  of the URI
     * @param {String} systemID  the system ID of the XML data where the element starts
     * @param {Integer }lineNr   the line in the XML data where the element starts
     */
    var XMLElement = p.XMLElement = function() {
      if (arguments.length === 4) {
        this.attributes = [];
        this.children   = [];
        this.fullName   = arguments[0] || "";
        if (arguments[1]) {
          this.name = arguments[1];
        } else {
          var index = this.fullName.indexOf(':');
          if (index >= 0) {
            this.name = this.fullName.substring(index + 1);
          } else {
            this.name = this.fullName;
          }
        }
        this.namespace = arguments[1];
        this.content   = "";
        this.lineNr    = arguments[3];
        this.systemID  = arguments[2];
        this.parent    = null;
      }
      else if ((arguments.length === 2 && arguments[1].indexOf(".") > -1) ) { // filename or svg xml element
        this.attributes = [];
        this.children   = [];
        this.fullName   = "";
        this.name       = "";
        this.namespace  = "";
        this.content    = "";
        this.systemID   = "";
        this.lineNr     = "";
        this.parent     = null;
        this.parse(arguments[arguments.length -1]);
      } else if (arguments.length === 1 && typeof arguments[0] === "string"){
        //xml string
        this.attributes = [];
        this.children   = [];
        this.fullName   = "";
        this.name       = "";
        this.namespace  = "";
        this.content    = "";
        this.systemID   = "";
        this.lineNr     = "";
        this.parent     = null;
        this.parse(arguments[0]);
      }
      else { //empty ctor
        this.attributes = [];
        this.children   = [];
        this.fullName   = "";
        this.name       = "";
        this.namespace  = "";
        this.content    = "";
        this.systemID   = "";
        this.lineNr     = "";
        this.parent     = null;
      }
    };
    /**
     * XMLElement methods
     * missing: enumerateAttributeNames(), enumerateChildren(),
     * NOTE: parse does not work when a url is passed in
     */
    XMLElement.prototype = {
      /**
       * @member XMLElement
       * The parse() function retrieves the file via ajax() and uses DOMParser() parseFromString method to make an XML document
       * @addon
       *
       * @param {String} filename name of the XML/SVG file to load
       *
       * @throws ExceptionType Error loading document
       *
       * @see XMLElement#parseChildrenRecursive
       */
      parse: function(filename) {
        var xmlDoc;
        try {
          if (filename.indexOf(".xml") > -1 || filename.indexOf(".svg") > -1) {
            filename = ajax(filename);
          }
          xmlDoc = new DOMParser().parseFromString(filename, "text/xml");
          var elements = xmlDoc.documentElement;
          if (elements) {
            this.parseChildrenRecursive(null, elements);
          } else {
            throw ("Error loading document");
          }
          return this;
        } catch(e) {
          throw(e);
        }
      },
      /**
       * @member XMLElement
       * The createElement() function Creates an empty element
       *
       * @param {String} fullName   the full name of the element
       * @param {String} namespace  the namespace URI
       * @param {String} systemID   the system ID of the XML data where the element starts
       * @param {int} lineNr    the line in the XML data where the element starts
       */
      createElement: function () {
        if (arguments.length === 2) {
          return new XMLElement(arguments[0], arguments[1], null, null);
        } else {
          return new XMLElement(arguments[0], arguments[1], arguments[2], arguments[3]);
        }
      },
      /**
       * @member XMLElement
       * The hasAttribute() function returns whether an attribute exists
       *
       * @param {String} name      name of the attribute
       * @param {String} namespace the namespace URI of the attribute
       *
       * @return {boolean} true if the attribute exists
       */
      hasAttribute: function () {
        if (arguments.length === 1) {
          return this.getAttribute(arguments[0]) !== null;
        } else if (arguments.length === 2) {
          return this.getAttribute(arguments[0],arguments[1]) !== null;
        }
      },
      /**
       * @member XMLElement
       * The createPCDataElement() function creates an element to be used for #PCDATA content
       *
       * @return {XMLElement} new XMLElement element
       */
      createPCDataElement: function () {
        return new XMLElement();
      },
      /**
       * @member XMLElement
       * The equals() function checks to see if the element being passed in equals another element
       *
       * @param {Object} rawElement the element to compare to
       *
       * @return {boolean} true if the element equals another element
       */
      equals: function(object){
        if (typeof object === "Object") {
          return this.equalsXMLElement(object);
        }
      },
      /**
       * @member XMLElement
       * The equalsXMLElement() function checks to see if the XMLElement being passed in equals another XMLElement
       *
       * @param {XMLElement} rawElement the element to compare to
       *
       * @return {boolean} true if the element equals another element
       */
      equalsXMLElement: function (object) {
        if (object instanceof XMLElement) {
          var i, j;
          if (this.name !== object.getLocalName()) { return false; }
          if (this.attributes.length !== object.getAttributeCount()) { return false; }
          for (i = 0, j = this.attributes.length; i < j; i++){
            if (! object.hasAttribute(this.attributes[i].getName(), this.attributes[i].getNamespace())) { return false; }
            if (this.attributes[i].getValue() !== object.attributes[i].getValue()) { return false; }
            if (this.attributes[i].getType()  !== object.attributes[i].getType()) { return false; }
          }
          if (this.children.length !== object.getChildCount()) { return false; }
          var child1, child2;
          for (i = 0, j = this.children.length; i < j; i++) {
            child1 = this.getChildAtIndex(i);
            child2 = object.getChildAtIndex(i);
            if (! child1.equalsXMLElement(child2)) { return false; }
          }
          return true;
        }
      },
      /**
       * @member XMLElement
       * The getContent() function returns the content of an element. If there is no such content, null is returned
       *
       * @return {String} the (possibly null) content
       */
      getContent: function(){
         return this.content;
      },
      /**
       * @member XMLElement
       * The getAttribute() function returns the value of an attribute
       *
       * @param {String} name         the non-null full name of the attribute
       * @param {String} namespace    the namespace URI, which may be null
       * @param {String} defaultValue the default value of the attribute
       *
       * @return {String} the value, or defaultValue if the attribute does not exist
       */
      getAttribute: function (){
        var attribute;
        if( arguments.length === 2 ){
          attribute = this.findAttribute(arguments[0]);
          if (attribute) {
            return attribute.getValue();
          } else {
            return arguments[1];
          }
        } else if (arguments.length === 1) {
          attribute = this.findAttribute(arguments[0]);
          if (attribute) {
            return attribute.getValue();
          } else {
            return null;
          }
        } else if (arguments.length === 3) {
          attribute = this.findAttribute(arguments[0],arguments[1]);
          if (attribute) {
            return attribute.getValue();
          } else {
            return arguments[2];
          }
        }
      },
      /**
       * @member XMLElement
       * The getStringAttribute() function returns the string attribute of the element
       * If the <b>defaultValue</b> parameter is used and the attribute doesn't exist, the <b>defaultValue</b> value is returned.
       * When calling the function without the <b>defaultValue</b> parameter, if the attribute doesn't exist, the value 0 is returned.
       *
       * @param name         the name of the attribute
       * @param defaultValue value returned if the attribute is not found
       *
       * @return {String} the value, or defaultValue if the attribute does not exist
       */
      getStringAttribute: function() {
        if (arguments.length === 1) {
          return this.getAttribute(arguments[0]);
        } else if (arguments.length === 2){
          return this.getAttribute(arguments[0], arguments[1]);
        } else {
          return this.getAttribute(arguments[0], arguments[1],arguments[2]);
        }
      },
      /**
       * @member XMLElement
       * The getFloatAttribute() function returns the float attribute of the element.
       * If the <b>defaultValue</b> parameter is used and the attribute doesn't exist, the <b>defaultValue</b> value is returned.
       * When calling the function without the <b>defaultValue</b> parameter, if the attribute doesn't exist, the value 0 is returned.
       *
       * @param name         the name of the attribute
       * @param defaultValue value returned if the attribute is not found
       *
       * @return {float} the value, or defaultValue if the attribute does not exist
       */
      getFloatAttribute: function() {
        if (arguments.length === 1 ) {
          return parseFloat(this.getAttribute(arguments[0], 0));
        } else if (arguments.length === 2 ){
          return this.getAttribute(arguments[0], arguments[1]);
        } else {
          return this.getAttribute(arguments[0], arguments[1],arguments[2]);
        }
      },
      /**
       * @member XMLElement
       * The getIntAttribute() function returns the integer attribute of the element.
       * If the <b>defaultValue</b> parameter is used and the attribute doesn't exist, the <b>defaultValue</b> value is returned.
       * When calling the function without the <b>defaultValue</b> parameter, if the attribute doesn't exist, the value 0 is returned.
       *
       * @param name         the name of the attribute
       * @param defaultValue value returned if the attribute is not found
       *
       * @return {int} the value, or defaultValue if the attribute does not exist
       */
      getIntAttribute: function () {
        if (arguments.length === 1) {
          return this.getAttribute( arguments[0], 0 );
        } else if (arguments.length === 2) {
          return this.getAttribute(arguments[0], arguments[1]);
        } else {
          return this.getAttribute(arguments[0], arguments[1],arguments[2]);
        }
      },
      /**
       * @member XMLElement
       * The hasChildren() function returns whether the element has children.
       *
       * @return {boolean} true if the element has children.
       */
      hasChildren: function () {
        return this.children.length > 0 ;
      },
      /**
       * @member XMLElement
       * The addChild() function adds a child element
       *
       * @param {XMLElement} child the non-null child to add.
       */
      addChild: function (child) {
        if (child !== null) {
          child.parent = this;
          this.children.push(child);
        }
      },
      /**
       * @member XMLElement
       * The insertChild() function inserts a child element at the index provided
       *
       * @param {XMLElement} child  the non-null child to add.
       * @param {int} index     where to put the child.
       */
      insertChild: function (child, index) {
        if (child) {
          if ((child.getLocalName() === null) && (! this.hasChildren())) {
            var lastChild = this.children[this.children.length -1];
            if (lastChild.getLocalName() === null) {
                lastChild.setContent(lastChild.getContent() + child.getContent());
                return;
            }
          }
          child.parent = this;
          this.children.splice(index,0,child);
        }
      },
      /**
       * @member XMLElement
       * The getChild() returns the child XMLElement as specified by the <b>index</b> parameter.
       * The value of the <b>index</b> parameter must be less than the total number of children to avoid going out of the array storing the child elements.
       * When the <b>path</b> parameter is specified, then it will return all children that match that path. The path is a series of elements and sub-elements, separated by slashes.
       *
       * @param {int} index     where to put the child.
       * @param {String} path       path to a particular element
       *
       * @return {XMLElement} the element
       */
      getChild: function (){
        if (typeof arguments[0]  === "number") {
          return this.children[arguments[0]];
        }
        else if (arguments[0].indexOf('/') !== -1) { // path was given
          this.getChildRecursive(arguments[0].split("/"), 0);
        } else {
          var kid, kidName;
          for (var i = 0, j = this.getChildCount(); i < j; i++) {
            kid = this.getChild(i);
            kidName = kid.getName();
            if (kidName !== null && kidName === arguments[0]) {
                return kid;
            }
          }
          return null;
        }
      },
      /**
       * @member XMLElement
       * The getChildren() returns all of the children as an XMLElement array.
       * When the <b>path</b> parameter is specified, then it will return all children that match that path.
       * The path is a series of elements and sub-elements, separated by slashes.
       *
       * @param {String} path       element name or path/to/element
       *
       * @return {XMLElement} array of child elements that match
       *
       * @see XMLElement#getChildCount()
       * @see XMLElement#getChild()
       */
      getChildren: function(){
        if (arguments.length === 1) {
          if (typeof arguments[0]  === "number") {
            return this.getChild( arguments[0]);
          } else if (arguments[0].indexOf('/') !== -1) { // path was given
            return this.getChildrenRecursive( arguments[0].split("/"), 0);
          } else {
            var matches = [];
            var kid, kidName;
            for (var i = 0, j = this.getChildCount(); i < j; i++) {
              kid = this.getChild(i);
              kidName = kid.getName();
              if (kidName !== null && kidName === arguments[0]) {
                matches.push(kid);
              }
            }
            return matches;
          }
        }else {
          return this.children;
        }
      },
      /**
       * @member XMLElement
       * The getChildCount() returns the number of children for the element.
       *
       * @return {int} the count
       *
       * @see XMLElement#getChild()
       * @see XMLElement#getChildren()
       */
      getChildCount: function(){
        return this.children.length;
      },
      /**
       * @member XMLElement
       * Internal helper function for getChild().
       *
       * @param {String[]} items   result of splitting the query on slashes
       * @param {int} offset   where in the items[] array we're currently looking
       *
       * @return {XMLElement} matching element or null if no match
       */
      getChildRecursive: function (items, offset) {
        var kid, kidName;
        for(var i = 0, j = this.getChildCount(); i < j; i++) {
            kid = this.getChild(i);
            kidName = kid.getName();
            if (kidName !== null && kidName === items[offset]) {
              if (offset === items.length-1) {
                return kid;
              } else {
                offset += 1;
                return kid.getChildRecursive(items, offset);
              }
            }
        }
        return null;
      },
      /**
       * @member XMLElement
       * Internal helper function for getChildren().
       *
       * @param {String[]} items   result of splitting the query on slashes
       * @param {int} offset   where in the items[] array we're currently looking
       *
       * @return {XMLElement[]} matching elements or empty array if no match
       */
      getChildrenRecursive: function (items, offset) {
        if (offset === items.length-1) {
          return this.getChildren(items[offset]);
        }
        var matches = this.getChildren(items[offset]);
        var kidMatches = [];
        for (var i = 0; i < matches.length; i++) {
          kidMatches = kidMatches.concat(matches[i].getChildrenRecursive(items, offset+1));
        }
        return kidMatches;
      },
      /**
       * @member XMLElement
       * Internal helper function for parse().
       * Loops through the
       * @addon
       *
       * @param {XMLElement} parent                      the parent node
       * @param {XML document childNodes} elementpath    the remaining nodes that need parsing
       *
       * @return {XMLElement} the new element and its children elements
       */
      parseChildrenRecursive: function (parent , elementpath){
        var xmlelement,
          xmlattribute,
          tmpattrib,
          l, m;
        if (!parent) {
          this.fullName = elementpath.localName;
          this.name     = elementpath.nodeName;
          this.content  = elementpath.textContent || "";
          xmlelement    = this;
        } else { // a parent
          xmlelement         = new XMLElement(elementpath.localName, elementpath.nodeName, "", "");
          xmlelement.content = elementpath.textContent || "";
          xmlelement.parent  = parent;
        }

        for (l = 0, m = elementpath.attributes.length; l < m; l++) {
          tmpattrib    = elementpath.attributes[l];
          xmlattribute = new XMLAttribute(tmpattrib.getname,
                                          tmpattrib.nodeName,
                                          tmpattrib.namespaceURI,
                                          tmpattrib.nodeValue,
                                          tmpattrib.nodeType);
          xmlelement.attributes.push(xmlattribute);
        }

        for (l = 0, m = elementpath.childNodes.length; l < m; l++) {
          var node = elementpath.childNodes[l];
          if (node.nodeType === 1) { // ELEMENT_NODE type
            xmlelement.children.push(xmlelement.parseChildrenRecursive(xmlelement, node));
          }
        }
        return xmlelement;
      },
      /**
       * @member XMLElement
       * The isLeaf() function returns whether the element is a leaf element.
       *
       * @return {boolean} true if the element has no children.
       */
      isLeaf: function(){
        return !this.hasChildren();
      },
      /**
       * @member XMLElement
       * The listChildren() function put the names of all children into an array. Same as looping through
       * each child and calling getName() on each XMLElement.
       *
       * @return {String[]} a list of element names.
       */
      listChildren: function() {
        var arr = [];
        for (var i = 0, j = this.children.length; i < j; i++) {
          arr.push( this.getChild(i).getName());
        }
        return arr;
      },
      /**
       * @member XMLElement
       * The removeAttribute() function removes an attribute
       *
       * @param {String} name        the non-null name of the attribute.
       * @param {String} namespace   the namespace URI of the attribute, which may be null.
       */
      removeAttribute: function (name , namespace) {
        this.namespace = namespace || "";
        for (var i = 0, j = this.attributes.length; i < j; i++) {
          if (this.attributes[i].getName() === name && this.attributes[i].getNamespace() === this.namespace) {
            this.attributes.splice(i, 1);
            break;
          }
        }
      },
      /**
       * @member XMLElement
       * The removeChild() removes a child element.
       *
       * @param {XMLElement} child      the the non-null child to be renoved
       */
      removeChild: function(child) {
        if (child) {
          for (var i = 0, j = this.children.length; i < j; i++) {
            if (this.children[i].equalsXMLElement(child)) {
              this.children.splice(i, 1);
              break;
            }
          }
        }
      },
      /**
       * @member XMLElement
       * The removeChildAtIndex() removes the child located at a certain index
       *
       * @param {int} index      the index of the child, where the first child has index 0
       */
      removeChildAtIndex: function(index) {
        if (this.children.length > index) { //make sure its not outofbounds
          this.children.splice(index, 1);
          return;
        }
      },
      /**
       * @member XMLElement
       * The findAttribute() function searches an attribute
       *
       * @param {String} name        fullName the non-null full name of the attribute
       * @param {String} namespace   the name space, which may be null
       *
       * @return {XMLAttribute} the attribute, or null if the attribute does not exist.
       */
      findAttribute: function (name, namespace) {
        this.namespace = namespace || "";
        for (var i = 0, j = this.attributes.length; i < j; i++) {
          if (this.attributes[i].getName() === name && this.attributes[i].getNamespace() === this.namespace) {
             return this.attributes[i];
          }
        }
      },
      /**
       * @member XMLElement
       * The setAttribute() function sets an attribute.
       *
       * @param {String} name        the non-null full name of the attribute
       * @param {String} namespace   the non-null value of the attribute
       */
      setAttribute: function() {
        var attr;
        if (arguments.length === 3) {
          var index = arguments[0].indexOf(':');
          var name  = arguments[0].substring(index + 1);
          attr      = this.findAttribute( name, arguments[1] );
          if (attr) {
            attr.setValue(arguments[2]);
          } else {
            attr = new XMLAttribute(arguments[0], name, arguments[1], arguments[2], "CDATA");
            this.attributes.push(attr);
          }
        } else {
          attr = this.findAttribute(arguments[0]);
          if (attr) {
            attr.setValue(arguments[1]);
          } else {
            attr = new XMLAttribute(arguments[0], arguments[0], null, arguments[1], "CDATA");
            this.attributes.push(attr);
          }
        }
      },
      /**
       * @member XMLElement
       * The setContent() function sets the #PCDATA content. It is an error to call this method with a
       * non-null value if there are child objects.
       *
       * @param {String} content     the (possibly null) content
       */
      setContent: function(content) {
        this.content = content;
      },
      /**
       * @member XMLElement
       * The setName() function sets the full name. This method also sets the short name and clears the
       * namespace URI.
       *
       * @param {String} name        the non-null name
       * @param {String} namespace   the namespace URI, which may be null.
       */
      setName: function() {
        if (arguments.length === 1) {
          this.name      = arguments[0];
          this.fullName  = arguments[0];
          this.namespace = null;
        } else {
          var index = arguments[0].indexOf(':');
          if ((arguments[1] === null) || (index < 0)) {
              this.name = arguments[0];
          } else {
              this.name = arguments[0].substring(index + 1);
          }
          this.fullName  = arguments[0];
          this.namespace = arguments[1];
        }
      },
      /**
       * @member XMLElement
       * The getName() function returns the full name (i.e. the name including an eventual namespace
       * prefix) of the element.
       *
       * @return {String} the name, or null if the element only contains #PCDATA.
       */
      getName: function() {
        return this.fullName;
      },
      getLocalName: function() {
        return this.name;
      },
      getAttributeCount: function() {
        return this.attributes.length;
      }
    };


    ////////////////////////////////////////////////////////////////////////////
    // 2D Matrix
    ////////////////////////////////////////////////////////////////////////////
    /**
     * Helper function for printMatrix(). Finds the largest scalar
     * in the matrix, then number of digits left of the decimal.
     * Call from PMatrix2D and PMatrix3D's print() function.
     */
    var printMatrixHelper = function printMatrixHelper(elements) {
      var big = 0;
      for (var i = 0; i < elements.length; i++) {
        if (i !== 0) {
          big = Math.max(big, Math.abs(elements[i]));
        } else {
          big = Math.abs(elements[i]);
        }
      }

      var digits = (big + "").indexOf(".");
      if (digits === 0) {
        digits = 1;
      } else if (digits === -1) {
        digits = (big + "").length;
      }

      return digits;
    };
    /**
     * PMatrix2D is a 3x2 affine matrix implementation. The constructor accepts another PMatrix2D or a list of six float elements.
     * If no parameters are provided the matrix is set to the identity matrix.
     *
     * @param {PMatrix2D} matrix  the initial matrix to set to
     * @param {float} m00         the first element of the matrix
     * @param {float} m01         the second element of the matrix
     * @param {float} m02         the third element of the matrix
     * @param {float} m10         the fourth element of the matrix
     * @param {float} m11         the fifth element of the matrix
     * @param {float} m12         the sixth element of the matrix
     */
    var PMatrix2D = p.PMatrix2D = function() {
      if (arguments.length === 0) {
        this.reset();
      } else if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
        this.set(arguments[0].array());
      } else if (arguments.length === 6) {
        this.set(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
      }
    };
    /**
     * PMatrix2D methods
     */
    PMatrix2D.prototype = {
      /**
       * @member PMatrix2D
       * The set() function sets the matrix elements. The function accepts either another PMatrix2D, an array of elements, or a list of six floats.
       *
       * @param {PMatrix2D} matrix    the matrix to set this matrix to
       * @param {float[]} elements    an array of elements to set this matrix to
       * @param {float} m00           the first element of the matrix
       * @param {float} m01           the third element of the matrix
       * @param {float} m10           the fourth element of the matrix
       * @param {float} m11           the fith element of the matrix
       * @param {float} m12           the sixth element of the matrix
       */
      set: function() {
        if (arguments.length === 6) {
          var a = arguments;
          this.set([a[0], a[1], a[2],
                    a[3], a[4], a[5]]);
        } else if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
          this.elements = arguments[0].array();
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          this.elements = arguments[0].slice();
        }
      },
      /**
       * @member PMatrix2D
       * The get() function returns a copy of this PMatrix2D.
       *
       * @return {PMatrix2D} a copy of this PMatrix2D
       */
      get: function() {
        var outgoing = new PMatrix2D();
        outgoing.set(this.elements);
        return outgoing;
      },
      /**
       * @member PMatrix2D
       * The reset() function sets this PMatrix2D to the identity matrix.
       */
      reset: function() {
        this.set([1, 0, 0, 0, 1, 0]);
      },
      /**
       * @member PMatrix2D
       * The array() function returns a copy of the element values.
       * @addon
       *
       * @return {float[]} returns a copy of the element values
       */
      array: function array() {
        return this.elements.slice();
      },
      /**
       * @member PMatrix2D
       * The translate() function translates this matrix by moving the current coordinates to the location specified by tx and ty.
       *
       * @param {float} tx  the x-axis coordinate to move to
       * @param {float} ty  the y-axis coordinate to move to
       */
      translate: function(tx, ty) {
        this.elements[2] = tx * this.elements[0] + ty * this.elements[1] + this.elements[2];
        this.elements[5] = tx * this.elements[3] + ty * this.elements[4] + this.elements[5];
      },
       /**
       * @member PMatrix2D
       * The transpose() function is not used in processingjs.
       */
      transpose: function() {
        // Does nothing in Processing.
      },
      /**
       * @member PMatrix2D
       * The mult() function multiplied this matrix.
       * If two array elements are passed in the function will multiply a two element vector against this matrix.
       * If target is null or not length four, a new float array will be returned.
       * The values for vec and target can be the same (though that's less efficient).
       * If two PVectors are passed in the function multiply the x and y coordinates of a PVector against this matrix.
       *
       * @param {PVector} source, target  the PVectors used to multiply this matrix
       * @param {float[]} source, target  the arrays used to multiply this matrix
       *
       * @return {PVector|float[]} returns a PVector or an array representing the new matrix
       */
      mult: function(source, target) {
        var x, y;
        if (source instanceof PVector) {
          x = source.x;
          y = source.y;
          if (!target) {
            target = new PVector();
          }
        } else if (source instanceof Array) {
          x = source[0];
          y = source[1];
          if (!target) {
            target = [];
          }
        }
        if (target instanceof Array) {
          target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2];
          target[1] = this.elements[3] * x + this.elements[4] * y + this.elements[5];
        } else if (target instanceof PVector) {
          target.x = this.elements[0] * x + this.elements[1] * y + this.elements[2];
          target.y = this.elements[3] * x + this.elements[4] * y + this.elements[5];
          target.z = 0;
        }
        return target;
      },
      /**
       * @member PMatrix2D
       * The multX() function calculates the x component of a vector from a transformation.
       *
       * @param {float} x the x component of the vector being transformed
       * @param {float} y the y component of the vector being transformed
       *
       * @return {float} returnes the result of the calculation
       */
      multX: function(x, y) {
        return (x * this.elements[0] + y * this.elements[1] + this.elements[2]);
      },
      /**
       * @member PMatrix2D
       * The multY() function calculates the y component of a vector from a transformation.
       *
       * @param {float} x the x component of the vector being transformed
       * @param {float} y the y component of the vector being transformed
       *
       * @return {float} returnes the result of the calculation
       */
      multY: function(x, y) {
        return (x * this.elements[3] + y * this.elements[4] + this.elements[5]);
      },
      /**
       * @member PMatrix2D
       * The skewX() function skews the matrix along the x-axis the amount specified by the angle parameter.
       * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
       *
       * @param {float} angle  angle of skew specified in radians
       */
      skewX: function(angle) {
        this.apply(1, 0, 1, angle, 0, 0);
      },
      /**
       * @member PMatrix2D
       * The skewY() function skews the matrix along the y-axis the amount specified by the angle parameter.
       * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
       *
       * @param {float} angle  angle of skew specified in radians
       */
      skewY: function(angle) {
        this.apply(1, 0, 1,  0, angle, 0);
      },
      /**
       * @member PMatrix2D
       * The determinant() function calvculates the determinant of this matrix.
       *
       * @return {float} the determinant of the matrix
       */
      determinant: function() {
        return (this.elements[0] * this.elements[4] - this.elements[1] * this.elements[3]);
      },
      /**
       * @member PMatrix2D
       * The invert() function inverts this matrix
       *
       * @return {boolean} true if successful
       */
      invert: function() {
        var d = this.determinant();
        if (Math.abs( d ) > PConstants.MIN_INT) {
          var old00 = this.elements[0];
          var old01 = this.elements[1];
          var old02 = this.elements[2];
          var old10 = this.elements[3];
          var old11 = this.elements[4];
          var old12 = this.elements[5];
          this.elements[0] =  old11 / d;
          this.elements[3] = -old10 / d;
          this.elements[1] = -old01 / d;
          this.elements[4] =  old00 / d;
          this.elements[2] = (old01 * old12 - old11 * old02) / d;
          this.elements[5] = (old10 * old02 - old00 * old12) / d;
          return true;
        }
        return false;
      },
      /**
       * @member PMatrix2D
       * The scale() function increases or decreases the size of a shape by expanding and contracting vertices. When only one parameter is specified scale will occur in all dimensions.
       * This is equivalent to a two parameter call.
       *
       * @param {float} sx  the amount to scale on the x-axis
       * @param {float} sy  the amount to scale on the y-axis
       */
      scale: function(sx, sy) {
        if (sx && !sy) {
          sy = sx;
        }
        if (sx && sy) {
          this.elements[0] *= sx;
          this.elements[1] *= sy;
          this.elements[3] *= sx;
          this.elements[4] *= sy;
        }
      },
      /**
       * @member PMatrix2D
       * The apply() function multiplies the current matrix by the one specified through the parameters. Note that either a PMatrix2D or a list of floats can be passed in.
       *
       * @param {PMatrix2D} matrix    the matrix to apply this matrix to
       * @param {float} m00           the first element of the matrix
       * @param {float} m01           the third element of the matrix
       * @param {float} m10           the fourth element of the matrix
       * @param {float} m11           the fith element of the matrix
       * @param {float} m12           the sixth element of the matrix
       */
      apply: function() {
        var source;
        if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
          source = arguments[0].array();
        } else if (arguments.length === 6) {
          source = Array.prototype.slice.call(arguments);
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          source = arguments[0];
        }

        var result = [0, 0, this.elements[2],
                      0, 0, this.elements[5]];
        var e = 0;
        for (var row = 0; row < 2; row++) {
          for (var col = 0; col < 3; col++, e++) {
            result[e] += this.elements[row * 3 + 0] * source[col + 0] +
                         this.elements[row * 3 + 1] * source[col + 3];
          }
        }
        this.elements = result.slice();
      },
      /**
       * @member PMatrix2D
       * The preApply() function applies another matrix to the left of this one. Note that either a PMatrix2D or elements of a matrix can be passed in.
       *
       * @param {PMatrix2D} matrix    the matrix to apply this matrix to
       * @param {float} m00           the first element of the matrix
       * @param {float} m01           the third element of the matrix
       * @param {float} m10           the fourth element of the matrix
       * @param {float} m11           the fith element of the matrix
       * @param {float} m12           the sixth element of the matrix
       */
      preApply: function() {
        var source;
        if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
          source = arguments[0].array();
        } else if (arguments.length === 6) {
          source = Array.prototype.slice.call(arguments);
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          source = arguments[0];
        }
        var result = [0, 0, source[2],
                      0, 0, source[5]];
        result[2] = source[2] + this.elements[2] * source[0] + this.elements[5] * source[1];
        result[5] = source[5] + this.elements[2] * source[3] + this.elements[5] * source[4];
        result[0] = this.elements[0] * source[0] + this.elements[3] * source[1];
        result[3] = this.elements[0] * source[3] + this.elements[3] * source[4];
        result[1] = this.elements[1] * source[0] + this.elements[4] * source[1];
        result[4] = this.elements[1] * source[3] + this.elements[4] * source[4];
        this.elements = result.slice();
      },
      /**
       * @member PMatrix2D
       * The rotate() function rotates the matrix.
       *
       * @param {float} angle         the angle of rotation in radiants
       */
      rotate: function(angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var temp1 = this.elements[0];
        var temp2 = this.elements[1];
        this.elements[0] =  c * temp1 + s * temp2;
        this.elements[1] = -s * temp1 + c * temp2;
        temp1 = this.elements[3];
        temp2 = this.elements[4];
        this.elements[3] =  c * temp1 + s * temp2;
        this.elements[4] = -s * temp1 + c * temp2;
      },
      /**
       * @member PMatrix2D
       * The rotateZ() function rotates the matrix.
       *
       * @param {float} angle         the angle of rotation in radiants
       */
      rotateZ: function(angle) {
        this.rotate(angle);
      },
      /**
       * @member PMatrix2D
       * The print() function prints out the elements of this matrix
       */
      print: function() {
        var digits = printMatrixHelper(this.elements);
        var output = "" + p.nfs(this.elements[0], digits, 4) + " " +
                     p.nfs(this.elements[1], digits, 4) + " " +
                     p.nfs(this.elements[2], digits, 4) + "\n" +
                     p.nfs(this.elements[3], digits, 4) + " " +
                     p.nfs(this.elements[4], digits, 4) + " " +
                     p.nfs(this.elements[5], digits, 4) + "\n\n";
        p.println(output);
      }
    };

    /**
     * PMatrix3D is a 4x4  matrix implementation. The constructor accepts another PMatrix3D or a list of six or sixteen float elements.
     * If no parameters are provided the matrix is set to the identity matrix.
     */
    var PMatrix3D = p.PMatrix3D = function PMatrix3D() {
      // When a matrix is created, it is set to an identity matrix
      this.reset();
    };
    /**
     * PMatrix3D methods
     */
    PMatrix3D.prototype = {
      /**
       * @member PMatrix2D
       * The set() function sets the matrix elements. The function accepts either another PMatrix3D, an array of elements, or a list of six or sixteen floats.
       *
       * @param {PMatrix3D} matrix    the initial matrix to set to
       * @param {float[]} elements    an array of elements to set this matrix to
       * @param {float} m00           the first element of the matrix
       * @param {float} m01           the second element of the matrix
       * @param {float} m02           the third element of the matrix
       * @param {float} m03           the fourth element of the matrix
       * @param {float} m10           the fifth element of the matrix
       * @param {float} m11           the sixth element of the matrix
       * @param {float} m12           the seventh element of the matrix
       * @param {float} m13           the eight element of the matrix
       * @param {float} m20           the nineth element of the matrix
       * @param {float} m21           the tenth element of the matrix
       * @param {float} m22           the eleventh element of the matrix
       * @param {float} m23           the twelveth element of the matrix
       * @param {float} m30           the thirteenth element of the matrix
       * @param {float} m31           the fourtheenth element of the matrix
       * @param {float} m32           the fivetheenth element of the matrix
       * @param {float} m33           the sixteenth element of the matrix
       */
      set: function() {
        if (arguments.length === 16) {
          this.elements = Array.prototype.slice.call(arguments);
        } else if (arguments.length === 1 && arguments[0] instanceof PMatrix3D) {
          this.elements = arguments[0].array();
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          this.elements = arguments[0].slice();
        }
      },
      /**
       * @member PMatrix3D
       * The get() function returns a copy of this PMatrix3D.
       *
       * @return {PMatrix3D} a copy of this PMatrix3D
       */
      get: function() {
        var outgoing = new PMatrix3D();
        outgoing.set(this.elements);
        return outgoing;
      },
      /**
       * @member PMatrix3D
       * The reset() function sets this PMatrix3D to the identity matrix.
       */
      reset: function() {
        this.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      },
      /**
       * @member PMatrix3D
       * The array() function returns a copy of the element values.
       * @addon
       *
       * @return {float[]} returns a copy of the element values
       */
      array: function array() {
        return this.elements.slice();
      },
      /**
       * @member PMatrix3D
       * The translate() function translates this matrix by moving the current coordinates to the location specified by tx, ty, and tz.
       *
       * @param {float} tx  the x-axis coordinate to move to
       * @param {float} ty  the y-axis coordinate to move to
       * @param {float} tz  the z-axis coordinate to move to
       */
      translate: function(tx, ty, tz) {
        if (tz === undef) {
          tz = 0;
        }

        this.elements[3]  += tx * this.elements[0]  + ty * this.elements[1]  + tz * this.elements[2];
        this.elements[7]  += tx * this.elements[4]  + ty * this.elements[5]  + tz * this.elements[6];
        this.elements[11] += tx * this.elements[8]  + ty * this.elements[9]  + tz * this.elements[10];
        this.elements[15] += tx * this.elements[12] + ty * this.elements[13] + tz * this.elements[14];
      },
      /**
       * @member PMatrix2D
       * The transpose() function transpose this matrix.
       */
      transpose: function() {
        var temp = this.elements.slice();
        this.elements[0]  = temp[0];
        this.elements[1]  = temp[4];
        this.elements[2]  = temp[8];
        this.elements[3]  = temp[12];
        this.elements[4]  = temp[1];
        this.elements[5]  = temp[5];
        this.elements[6]  = temp[9];
        this.elements[7]  = temp[13];
        this.elements[8]  = temp[2];
        this.elements[9]  = temp[6];
        this.elements[10] = temp[10];
        this.elements[11] = temp[14];
        this.elements[12] = temp[3];
        this.elements[13] = temp[7];
        this.elements[14] = temp[11];
        this.elements[15] = temp[15];
      },
      /**
       * @member PMatrix3D
       * The mult() function multiplied this matrix.
       * If two array elements are passed in the function will multiply a two element vector against this matrix.
       * If target is null or not length four, a new float array will be returned.
       * The values for vec and target can be the same (though that's less efficient).
       * If two PVectors are passed in the function multiply the x and y coordinates of a PVector against this matrix.
       *
       * @param {PVector} source, target  the PVectors used to multiply this matrix
       * @param {float[]} source, target  the arrays used to multiply this matrix
       *
       * @return {PVector|float[]} returns a PVector or an array representing the new matrix
       */
      mult: function(source, target) {
        var x, y, z, w;
        if (source instanceof PVector) {
          x = source.x;
          y = source.y;
          z = source.z;
          w = 1;
          if (!target) {
            target = new PVector();
          }
        } else if (source instanceof Array) {
          x = source[0];
          y = source[1];
          z = source[2];
          w = source[3] || 1;

          if ( !target || (target.length !== 3 && target.length !== 4) ) {
            target = [0, 0, 0];
          }
        }

        if (target instanceof Array) {
          if (target.length === 3) {
            target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3];
            target[1] = this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7];
            target[2] = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
          } else if (target.length === 4) {
            target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3] * w;
            target[1] = this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7] * w;
            target[2] = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11] * w;
            target[3] = this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15] * w;
          }
        }
        if (target instanceof PVector) {
          target.x = this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3];
          target.y = this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7];
          target.z = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
        }
        return target;
      },
      /**
       * @member PMatrix3D
       * The preApply() function applies another matrix to the left of this one. Note that either a PMatrix3D or elements of a matrix can be passed in.
       *
       * @param {PMatrix3D} matrix    the matrix to apply this matrix to
       * @param {float} m00           the first element of the matrix
       * @param {float} m01           the second element of the matrix
       * @param {float} m02           the third element of the matrix
       * @param {float} m03           the fourth element of the matrix
       * @param {float} m10           the fifth element of the matrix
       * @param {float} m11           the sixth element of the matrix
       * @param {float} m12           the seventh element of the matrix
       * @param {float} m13           the eight element of the matrix
       * @param {float} m20           the nineth element of the matrix
       * @param {float} m21           the tenth element of the matrix
       * @param {float} m22           the eleventh element of the matrix
       * @param {float} m23           the twelveth element of the matrix
       * @param {float} m30           the thirteenth element of the matrix
       * @param {float} m31           the fourtheenth element of the matrix
       * @param {float} m32           the fivetheenth element of the matrix
       * @param {float} m33           the sixteenth element of the matrix
       */
      preApply: function() {
        var source;
        if (arguments.length === 1 && arguments[0] instanceof PMatrix3D) {
          source = arguments[0].array();
        } else if (arguments.length === 16) {
          source = Array.prototype.slice.call(arguments);
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          source = arguments[0];
        }

        var result = [0, 0, 0, 0,
                      0, 0, 0, 0,
                      0, 0, 0, 0,
                      0, 0, 0, 0];
        var e = 0;
        for (var row = 0; row < 4; row++) {
          for (var col = 0; col < 4; col++, e++) {
            result[e] += this.elements[col + 0] * source[row * 4 + 0] + this.elements[col + 4] *
                         source[row * 4 + 1] + this.elements[col + 8] * source[row * 4 + 2] +
                         this.elements[col + 12] * source[row * 4 + 3];
          }
        }
        this.elements = result.slice();
      },
      /**
       * @member PMatrix3D
       * The apply() function multiplies the current matrix by the one specified through the parameters. Note that either a PMatrix3D or a list of floats can be passed in.
       *
       * @param {PMatrix3D} matrix    the matrix to apply this matrix to
       * @param {float} m00           the first element of the matrix
       * @param {float} m01           the second element of the matrix
       * @param {float} m02           the third element of the matrix
       * @param {float} m03           the fourth element of the matrix
       * @param {float} m10           the fifth element of the matrix
       * @param {float} m11           the sixth element of the matrix
       * @param {float} m12           the seventh element of the matrix
       * @param {float} m13           the eight element of the matrix
       * @param {float} m20           the nineth element of the matrix
       * @param {float} m21           the tenth element of the matrix
       * @param {float} m22           the eleventh element of the matrix
       * @param {float} m23           the twelveth element of the matrix
       * @param {float} m30           the thirteenth element of the matrix
       * @param {float} m31           the fourtheenth element of the matrix
       * @param {float} m32           the fivetheenth element of the matrix
       * @param {float} m33           the sixteenth element of the matrix
       */
      apply: function() {
        var source;
        if (arguments.length === 1 && arguments[0] instanceof PMatrix3D) {
          source = arguments[0].array();
        } else if (arguments.length === 16) {
          source = Array.prototype.slice.call(arguments);
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          source = arguments[0];
        }

        var result = [0, 0, 0, 0,
                      0, 0, 0, 0,
                      0, 0, 0, 0,
                      0, 0, 0, 0];
        var e = 0;
        for (var row = 0; row < 4; row++) {
          for (var col = 0; col < 4; col++, e++) {
            result[e] += this.elements[row * 4 + 0] * source[col + 0] + this.elements[row * 4 + 1] *
                         source[col + 4] + this.elements[row * 4 + 2] * source[col + 8] +
                         this.elements[row * 4 + 3] * source[col + 12];
          }
        }
        this.elements = result.slice();
      },
      /**
       * @member PMatrix3D
       * The rotate() function rotates the matrix.
       *
       * @param {float} angle         the angle of rotation in radiants
       */
      rotate: function(angle, v0, v1, v2) {
        if (!v1) {
          this.rotateZ(angle);
        } else {
          // TODO should make sure this vector is normalized
          var c = p.cos(angle);
          var s = p.sin(angle);
          var t = 1.0 - c;

          this.apply((t * v0 * v0) + c,
                     (t * v0 * v1) - (s * v2),
                     (t * v0 * v2) + (s * v1),
                     0,
                     (t * v0 * v1) + (s * v2),
                     (t * v1 * v1) + c,
                     (t * v1 * v2) - (s * v0),
                     0,
                     (t * v0 * v2) - (s * v1),
                     (t * v1 * v2) + (s * v0),
                     (t * v2 * v2) + c,
                     0, 0, 0, 0, 1);
        }
      },
      /**
       * @member PMatrix2D
       * The invApply() function applies the inverted matrix to this matrix.
       *
       * @param {float} m00           the first element of the matrix
       * @param {float} m01           the second element of the matrix
       * @param {float} m02           the third element of the matrix
       * @param {float} m03           the fourth element of the matrix
       * @param {float} m10           the fifth element of the matrix
       * @param {float} m11           the sixth element of the matrix
       * @param {float} m12           the seventh element of the matrix
       * @param {float} m13           the eight element of the matrix
       * @param {float} m20           the nineth element of the matrix
       * @param {float} m21           the tenth element of the matrix
       * @param {float} m22           the eleventh element of the matrix
       * @param {float} m23           the twelveth element of the matrix
       * @param {float} m30           the thirteenth element of the matrix
       * @param {float} m31           the fourtheenth element of the matrix
       * @param {float} m32           the fivetheenth element of the matrix
       * @param {float} m33           the sixteenth element of the matrix
       *
       * @return {boolean} returns true if the operation was successful.
       */
      invApply: function() {
        if (inverseCopy === undef) {
          inverseCopy = new PMatrix3D();
        }
        var a = arguments;
        inverseCopy.set(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8],
                        a[9], a[10], a[11], a[12], a[13], a[14], a[15]);

        if (!inverseCopy.invert()) {
          return false;
        }
        this.preApply(inverseCopy);
        return true;
      },
      /**
       * @member PMatrix3D
       * The rotateZ() function rotates the matrix.
       *
       * @param {float} angle         the angle of rotation in radiants
       */
      rotateX: function(angle) {
        var c = p.cos(angle);
        var s = p.sin(angle);
        this.apply([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
      },
      /**
       * @member PMatrix3D
       * The rotateY() function rotates the matrix.
       *
       * @param {float} angle         the angle of rotation in radiants
       */
      rotateY: function(angle) {
        var c = p.cos(angle);
        var s = p.sin(angle);
        this.apply([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
      },
      /**
       * @member PMatrix3D
       * The rotateZ() function rotates the matrix.
       *
       * @param {float} angle         the angle of rotation in radiants
       */
      rotateZ: function(angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        this.apply([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      },
      /**
       * @member PMatrix3D
       * The scale() function increases or decreases the size of a matrix by expanding and contracting vertices. When only one parameter is specified scale will occur in all dimensions.
       * This is equivalent to a three parameter call.
       *
       * @param {float} sx  the amount to scale on the x-axis
       * @param {float} sy  the amount to scale on the y-axis
       * @param {float} sz  the amount to scale on the z-axis
       */
      scale: function(sx, sy, sz) {
        if (sx && !sy && !sz) {
          sy = sz = sx;
        } else if (sx && sy && !sz) {
          sz = 1;
        }

        if (sx && sy && sz) {
          this.elements[0]  *= sx;
          this.elements[1]  *= sy;
          this.elements[2]  *= sz;
          this.elements[4]  *= sx;
          this.elements[5]  *= sy;
          this.elements[6]  *= sz;
          this.elements[8]  *= sx;
          this.elements[9]  *= sy;
          this.elements[10] *= sz;
          this.elements[12] *= sx;
          this.elements[13] *= sy;
          this.elements[14] *= sz;
        }
      },
      /**
       * @member PMatrix3D
       * The skewX() function skews the matrix along the x-axis the amount specified by the angle parameter.
       * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
       *
       * @param {float} angle  angle of skew specified in radians
       */
      skewX: function(angle) {
        var t = Math.tan(angle);
        this.apply(1, t, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      },
      /**
       * @member PMatrix3D
       * The skewY() function skews the matrix along the y-axis the amount specified by the angle parameter.
       * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
       *
       * @param {float} angle  angle of skew specified in radians
       */
      skewY: function(angle) {
        var t = Math.tan(angle);
        this.apply(1, 0, 0, 0, t, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      },
      multX: function(x, y, z, w) {
        if (!z) {
          return this.elements[0] * x + this.elements[1] * y + this.elements[3];
        } else if (!w) {
          return this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3];
        } else {
          return this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3] * w;
        }
      },
      multY: function(x, y, z, w) {
        if (!z) {
          return this.elements[4] * x + this.elements[5] * y + this.elements[7];
        } else if (!w) {
          return this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7];
        } else {
          return this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7] * w;
        }
      },
      multZ: function(x, y, z, w) {
        if (!w) {
          return this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
        } else {
          return this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11] * w;
        }
      },
      multW: function(x, y, z, w) {
        if (!w) {
          return this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15];
        } else {
          return this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15] * w;
        }
      },
      /**
       * @member PMatrix3D
       * The invert() function inverts this matrix
       *
       * @return {boolean} true if successful
       */
      invert: function() {
        var fA0 = this.elements[0] * this.elements[5] - this.elements[1] * this.elements[4];
        var fA1 = this.elements[0] * this.elements[6] - this.elements[2] * this.elements[4];
        var fA2 = this.elements[0] * this.elements[7] - this.elements[3] * this.elements[4];
        var fA3 = this.elements[1] * this.elements[6] - this.elements[2] * this.elements[5];
        var fA4 = this.elements[1] * this.elements[7] - this.elements[3] * this.elements[5];
        var fA5 = this.elements[2] * this.elements[7] - this.elements[3] * this.elements[6];
        var fB0 = this.elements[8] * this.elements[13] - this.elements[9] * this.elements[12];
        var fB1 = this.elements[8] * this.elements[14] - this.elements[10] * this.elements[12];
        var fB2 = this.elements[8] * this.elements[15] - this.elements[11] * this.elements[12];
        var fB3 = this.elements[9] * this.elements[14] - this.elements[10] * this.elements[13];
        var fB4 = this.elements[9] * this.elements[15] - this.elements[11] * this.elements[13];
        var fB5 = this.elements[10] * this.elements[15] - this.elements[11] * this.elements[14];

        // Determinant
        var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;

        // Account for a very small value
        // return false if not successful.
        if (Math.abs(fDet) <= 1e-9) {
          return false;
        }

        var kInv = [];
        kInv[0]  = +this.elements[5] * fB5 - this.elements[6] * fB4 + this.elements[7] * fB3;
        kInv[4]  = -this.elements[4] * fB5 + this.elements[6] * fB2 - this.elements[7] * fB1;
        kInv[8]  = +this.elements[4] * fB4 - this.elements[5] * fB2 + this.elements[7] * fB0;
        kInv[12] = -this.elements[4] * fB3 + this.elements[5] * fB1 - this.elements[6] * fB0;
        kInv[1]  = -this.elements[1] * fB5 + this.elements[2] * fB4 - this.elements[3] * fB3;
        kInv[5]  = +this.elements[0] * fB5 - this.elements[2] * fB2 + this.elements[3] * fB1;
        kInv[9]  = -this.elements[0] * fB4 + this.elements[1] * fB2 - this.elements[3] * fB0;
        kInv[13] = +this.elements[0] * fB3 - this.elements[1] * fB1 + this.elements[2] * fB0;
        kInv[2]  = +this.elements[13] * fA5 - this.elements[14] * fA4 + this.elements[15] * fA3;
        kInv[6]  = -this.elements[12] * fA5 + this.elements[14] * fA2 - this.elements[15] * fA1;
        kInv[10] = +this.elements[12] * fA4 - this.elements[13] * fA2 + this.elements[15] * fA0;
        kInv[14] = -this.elements[12] * fA3 + this.elements[13] * fA1 - this.elements[14] * fA0;
        kInv[3]  = -this.elements[9] * fA5 + this.elements[10] * fA4 - this.elements[11] * fA3;
        kInv[7]  = +this.elements[8] * fA5 - this.elements[10] * fA2 + this.elements[11] * fA1;
        kInv[11] = -this.elements[8] * fA4 + this.elements[9] * fA2 - this.elements[11] * fA0;
        kInv[15] = +this.elements[8] * fA3 - this.elements[9] * fA1 + this.elements[10] * fA0;

        // Inverse using Determinant
        var fInvDet = 1.0 / fDet;
        kInv[0]  *= fInvDet;
        kInv[1]  *= fInvDet;
        kInv[2]  *= fInvDet;
        kInv[3]  *= fInvDet;
        kInv[4]  *= fInvDet;
        kInv[5]  *= fInvDet;
        kInv[6]  *= fInvDet;
        kInv[7]  *= fInvDet;
        kInv[8]  *= fInvDet;
        kInv[9]  *= fInvDet;
        kInv[10] *= fInvDet;
        kInv[11] *= fInvDet;
        kInv[12] *= fInvDet;
        kInv[13] *= fInvDet;
        kInv[14] *= fInvDet;
        kInv[15] *= fInvDet;

        this.elements = kInv.slice();
        return true;
      },
      toString: function() {
        var str = "";
        for (var i = 0; i < 15; i++) {
          str += this.elements[i] + ", ";
        }
        str += this.elements[15];
        return str;
      },
      /**
       * @member PMatrix3D
       * The print() function prints out the elements of this matrix
       */
      print: function() {
        var digits = printMatrixHelper(this.elements);

        var output = "" + p.nfs(this.elements[0], digits, 4) + " " + p.nfs(this.elements[1], digits, 4) +
                     " " + p.nfs(this.elements[2], digits, 4) + " " + p.nfs(this.elements[3], digits, 4) +
                     "\n" + p.nfs(this.elements[4], digits, 4) + " " + p.nfs(this.elements[5], digits, 4) +
                     " " + p.nfs(this.elements[6], digits, 4) + " " + p.nfs(this.elements[7], digits, 4) +
                     "\n" + p.nfs(this.elements[8], digits, 4) + " " + p.nfs(this.elements[9], digits, 4) +
                     " " + p.nfs(this.elements[10], digits, 4) + " " + p.nfs(this.elements[11], digits, 4) +
                     "\n" + p.nfs(this.elements[12], digits, 4) + " " + p.nfs(this.elements[13], digits, 4) +
                     " " + p.nfs(this.elements[14], digits, 4) + " " + p.nfs(this.elements[15], digits, 4) + "\n\n";
        p.println(output);
      },
      invTranslate: function(tx, ty, tz) {
        this.preApply(1, 0, 0, -tx, 0, 1, 0, -ty, 0, 0, 1, -tz, 0, 0, 0, 1);
      },
      invRotateX: function(angle) {
        var c = Math.cos(-angle);
        var s = Math.sin(-angle);
        this.preApply([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
      },
      invRotateY: function(angle) {
        var c = Math.cos(-angle);
        var s = Math.sin(-angle);
        this.preApply([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
      },
      invRotateZ: function(angle) {
        var c = Math.cos(-angle);
        var s = Math.sin(-angle);
        this.preApply([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      },
      invScale: function(x, y, z) {
        this.preApply([1 / x, 0, 0, 0, 0, 1 / y, 0, 0, 0, 0, 1 / z, 0, 0, 0, 0, 1]);
      }
    };

    /**
     * @private
     * The matrix stack stores the transformations and translations that occur within the space.
     */
    var PMatrixStack = p.PMatrixStack = function PMatrixStack() {
      this.matrixStack = [];
    };

    /**
     * @member PMatrixStack
     * load pushes the matrix given in the function into the stack
     *
     * @param {Object | Array} matrix the matrix to be pushed into the stack
     */
    PMatrixStack.prototype.load = function load() {
      var tmpMatrix;
      if (p.use3DContext) {
        tmpMatrix = new PMatrix3D();
      } else {
        tmpMatrix = new PMatrix2D();
      }

      if (arguments.length === 1) {
        tmpMatrix.set(arguments[0]);
      } else {
        tmpMatrix.set(arguments);
      }
      this.matrixStack.push(tmpMatrix);
    };

    /**
     * @member PMatrixStack
     * push adds a duplicate of the top of the stack onto the stack - uses the peek function
     */
    PMatrixStack.prototype.push = function push() {
      this.matrixStack.push(this.peek());
    };

    /**
     * @member PMatrixStack
     * pop removes returns the matrix at the top of the stack
     *
     * @returns {Object} the matrix at the top of the stack
     */
    PMatrixStack.prototype.pop = function pop() {
      return this.matrixStack.pop();
    };

    /**
     * @member PMatrixStack
     * peek returns but doesn't remove the matrix at the top of the stack
     *
     * @returns {Object} the matrix at the top of the stack
     */
    PMatrixStack.prototype.peek = function peek() {
      var tmpMatrix;
      if (p.use3DContext) {
        tmpMatrix = new PMatrix3D();
      } else {
        tmpMatrix = new PMatrix2D();
      }

      tmpMatrix.set(this.matrixStack[this.matrixStack.length - 1]);
      return tmpMatrix;
    };

    /**
     * @member PMatrixStack
     * this function multiplies the matrix at the top of the stack with the matrix given as a parameter
     *
     * @param {Object | Array} matrix the matrix to be multiplied into the stack
     */
    PMatrixStack.prototype.mult = function mult(matrix) {
      this.matrixStack[this.matrixStack.length - 1].apply(matrix);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Array handling
    ////////////////////////////////////////////////////////////////////////////

    /**
    * The split() function breaks a string into pieces using a character or string
    * as the divider. The delim  parameter specifies the character or characters that
    * mark the boundaries between each piece. A String[] array is returned that contains
    * each of the pieces.
    * If the result is a set of numbers, you can convert the String[] array to to a float[]
    * or int[] array using the datatype conversion functions int() and float() (see example above).
    * The splitTokens() function works in a similar fashion, except that it splits using a range
    * of characters instead of a specific character or sequence.
    *
    * @param {String} str       the String to be split
    * @param {String} delim     the character or String used to separate the data
    *
    * @returns {string[]} The new string array
    *
    * @see splitTokens
    * @see join
    * @see trim
    */
    p.split = function(str, delim) {
      return str.split(delim);
    };

    /**
    * The splitTokens() function splits a String at one or many character "tokens." The tokens
    * parameter specifies the character or characters to be used as a boundary.
    * If no tokens character is specified, any whitespace character is used to split.
    * Whitespace characters include tab (\t), line feed (\n), carriage return (\r), form
    * feed (\f), and space. To convert a String to an array of integers or floats, use the
    * datatype conversion functions int() and float() to convert the array of Strings.
    *
    * @param {String} str       the String to be split
    * @param {Char[]} tokens    list of individual characters that will be used as separators
    *
    * @returns {string[]} The new string array
    *
    * @see split
    * @see join
    * @see trim
    */
    p.splitTokens = function(str, tokens) {
      if (arguments.length === 1) {
        tokens = "\n\t\r\f ";
      }

      tokens = "[" + tokens + "]";

      var ary = [];
      var index = 0;
      var pos = str.search(tokens);

      while (pos >= 0) {
        if (pos === 0) {
          str = str.substring(1);
        } else {
          ary[index] = str.substring(0, pos);
          index++;
          str = str.substring(pos);
        }
        pos = str.search(tokens);
      }

      if (str.length > 0) {
        ary[index] = str;
      }

      if (ary.length === 0) {
        ary = undef;
      }

      return ary;
    };

    /**
    * Expands an array by one element and adds data to the new position. The datatype of
    * the element parameter must be the same as the datatype of the array.
    * When using an array of objects, the data returned from the function must be cast to
    * the object array's data type. For example: SomeClass[] items = (SomeClass[])
    * append(originalArray, element).
    *
    * @param {boolean[]|byte[]|char[]|int[]|float[]|String[]|array of objects} array boolean[],
    * byte[], char[], int[], float[], or String[], or an array of objects
    * @param {boolean[]|byte[]|char[]|int[]|float[]|String[]|array of objects} element new data for the array
    *
    * @returns Array (the same datatype as the input)
    *
    * @see shorten
    * @see expand
    */
    p.append = function(array, element) {
      array[array.length] = element;
      return array;
    };

    /**
    * Concatenates two arrays. For example, concatenating the array { 1, 2, 3 } and the
    * array { 4, 5, 6 } yields { 1, 2, 3, 4, 5, 6 }. Both parameters must be arrays of the
    * same datatype.
    * When using an array of objects, the data returned from the function must be cast to the
    * object array's data type. For example: SomeClass[] items = (SomeClass[]) concat(array1, array2).
    *
    * @param {boolean[]|byte[]|char[]|int[]|float[]|String[]|array of objects} array1 boolean[],
    * byte[], char[], int[], float[], String[], or an array of objects
    * @param {boolean[]|byte[]|char[]|int[]|float[]|String[]|array of objects} array2 boolean[],
    * byte[], char[], int[], float[], String[], or an array of objects
    *
    * @returns Array (the same datatype as the input)
    *
    * @see splice
    */
    p.concat = function(array1, array2) {
      return array1.concat(array2);
    };

    /**
     * Sorts an array of numbers from smallest to largest and puts an array of
     * words in alphabetical order. The original array is not modified, a
     * re-ordered array is returned. The count parameter states the number of
     * elements to sort. For example if there are 12 elements in an array and
     * if count is the value 5, only the first five elements on the array will
     * be sorted. Alphabetical ordering is case insensitive.
     *
     * @param {String[] | int[] | float[]}  array Array of elements to sort
     * @param {int}                         numElem Number of elements to sort
     *
     * @returns {String[] | int[] | float[]} Array (same datatype as the input)
     *
     * @see reverse
    */
    p.sort = function(array, numElem) {
      var ret = [];

      // depending on the type used (int, float) or string
      // we'll need to use a different compare function
      if (array.length > 0) {
        // copy since we need to return another array
        var elemsToCopy = numElem > 0 ? numElem : array.length;
        for (var i = 0; i < elemsToCopy; i++) {
          ret.push(array[i]);
        }
        if (typeof array[0] === "string") {
          ret.sort();
        }
        // int or float
        else {
          ret.sort(function(a, b) {
            return a - b;
          });
        }

        // copy on the rest of the elements that were not sorted in case the user
        // only wanted a subset of an array to be sorted.
        if (numElem > 0) {
          for (var j = ret.length; j < array.length; j++) {
            ret.push(array[j]);
          }
        }
      }
      return ret;
    };

    /**
    * Inserts a value or array of values into an existing array. The first two parameters must
    * be of the same datatype. The array parameter defines the array which will be modified
    * and the second parameter defines the data which will be inserted. When using an array
    * of objects, the data returned from the function must be cast to the object array's data
    * type. For example: SomeClass[] items = (SomeClass[]) splice(array1, array2, index).
    *
    * @param {boolean[]|byte[]|char[]|int[]|float[]|String[]|array of objects} array boolean[],
    * byte[], char[], int[], float[], String[], or an array of objects
    * @param {boolean|byte|char|int|float|String|boolean[]|byte[]|char[]|int[]|float[]|String[]|array of objects}
    * value boolean, byte, char, int, float, String, boolean[], byte[], char[], int[],
    * float[], String[], or other Object: value or an array of objects to be spliced in
    * @param {int} index                position in the array from which to insert data
    *
    * @returns Array (the same datatype as the input)
    *
    * @see contract
    * @see subset
    */
    p.splice = function(array, value, index) {

      // Trying to splice an empty array into "array" in P5 won't do
      // anything, just return the original.
      if(value.length === 0)
      {
        return array;
      }

      // If the second argument was an array, we'll need to iterate over all
      // the "value" elements and add one by one because
      // array.splice(index, 0, value);
      // would create a multi-dimensional array which isn't what we want.
      if(value instanceof Array) {
        for(var i = 0, j = index; i < value.length; j++,i++) {
          array.splice(j, 0, value[i]);
        }
      } else {
        array.splice(index, 0, value);
      }

      return array;
    };

    /**
    * Extracts an array of elements from an existing array. The array parameter defines the
    * array from which the elements will be copied and the offset and length parameters determine
    * which elements to extract. If no length is given, elements will be extracted from the offset
    * to the end of the array. When specifying the offset remember the first array element is 0.
    * This function does not change the source array.
    * When using an array of objects, the data returned from the function must be cast to the
    * object array's data type.
    *
    * @param {boolean[]|byte[]|char[]|int[]|float[]|String[]|array of objects} array boolean[],
    * byte[], char[], int[], float[], String[], or an array of objects
    * @param {int} offset         position to begin
    * @param {int} length         number of values to extract
    *
    * @returns Array (the same datatype as the input)
    *
    * @see splice
    */
    p.subset = function(array, offset, length) {
      if (arguments.length === 2) {
        return array.slice(offset, array.length - offset);
      } else if (arguments.length === 3) {
        return array.slice(offset, offset + length);
      }
    };

    /**
    * Combines an array of Strings into one String, each separated by the character(s) used for
    * the separator parameter. To join arrays of ints or floats, it's necessary to first convert
    * them to strings using nf() or nfs().
    *
    * @param {Array} array              array of Strings
    * @param {char|String} separator    char or String to be placed between each item
    *
    * @returns {String} The combined string
    *
    * @see split
    * @see trim
    * @see nf
    * @see nfs
    */
    p.join = function(array, seperator) {
      return array.join(seperator);
    };

    /**
    * Decreases an array by one element and returns the shortened array. When using an
    * array of objects, the data returned from the function must be cast to the object array's
    * data type. For example: SomeClass[] items = (SomeClass[]) shorten(originalArray).
    *
    * @param {boolean[]|byte[]|char[]|int[]|float[]|String[]|array of objects} array
    * boolean[], byte[], char[], int[], float[], or String[], or an array of objects
    *
    * @returns Array (the same datatype as the input)
    *
    * @see append
    * @see expand
    */
    p.shorten = function(ary) {
      var newary = [];

      // copy array into new array
      var len = ary.length;
      for (var i = 0; i < len; i++) {
        newary[i] = ary[i];
      }
      newary.pop();

      return newary;
    };

    /**
    * Increases the size of an array. By default, this function doubles the size of the array,
    * but the optional newSize parameter provides precise control over the increase in size.
    * When using an array of objects, the data returned from the function must be cast to the
    * object array's data type. For example: SomeClass[] items = (SomeClass[]) expand(originalArray).
    *
    * @param {boolean[]|byte[]|char[]|int[]|float[]|String[]|array of objects} ary
    * boolean[], byte[], char[], int[], float[], String[], or an array of objects
    * @param {int} newSize              positive int: new size for the array
    *
    * @returns Array (the same datatype as the input)
    *
    * @see contract
    */
    p.expand = function(ary, newSize) {
      var temp = ary.slice(0);
      if (arguments.length === 1) {
        // double size of array
        temp.length = ary.length * 2;
        return temp;
      } else if (arguments.length === 2) {
        // size is newSize
        temp.length = newSize;
        return temp;
      }
    };

    /**
    * Copies an array (or part of an array) to another array. The src array is copied to the
    * dst array, beginning at the position specified by srcPos and into the position specified
    * by dstPos. The number of elements to copy is determined by length. The simplified version
    * with two arguments copies an entire array to another of the same size. It is equivalent
    * to "arrayCopy(src, 0, dst, 0, src.length)". This function is far more efficient for copying
    * array data than iterating through a for and copying each element.
    *
    * @param {Array} src an array of any data type: the source array
    * @param {Array} dest an array of any data type (as long as it's the same as src): the destination array
    * @param {int} srcPos     starting position in the source array
    * @param {int} destPos    starting position in the destination array
    * @param {int} length     number of array elements to be copied
    *
    * @returns none
    */
    p.arrayCopy = function() { // src, srcPos, dest, destPos, length) {
      var src, srcPos = 0, dest, destPos = 0, length;

      if (arguments.length === 2) {
        // recall itself and copy src to dest from start index 0 to 0 of src.length
        src = arguments[0];
        dest = arguments[1];
        length = src.length;
      } else if (arguments.length === 3) {
        // recall itself and copy src to dest from start index 0 to 0 of length
        src = arguments[0];
        dest = arguments[1];
        length = arguments[2];
      } else if (arguments.length === 5) {
        src = arguments[0];
        srcPos = arguments[1];
        dest = arguments[2];
        destPos = arguments[3];
        length = arguments[4];
      }

      // copy src to dest from index srcPos to index destPos of length recursivly on objects
      for (var i = srcPos, j = destPos; i < length + srcPos; i++, j++) {
        if (dest[j] !== undef) {
          dest[j] = src[i];
        } else {
          throw "array index out of bounds exception";
        }
      }
    };

    /**
    * Reverses the order of an array.
    *
    * @param {boolean[]|byte[]|char[]|int[]|float[]|String[]} array
    * boolean[], byte[], char[], int[], float[], or String[]
    *
    * @returns Array (the same datatype as the input)
    *
    * @see sort
    */
    p.reverse = function(array) {
      return array.reverse();
    };


    ////////////////////////////////////////////////////////////////////////////
    // Color functions
    ////////////////////////////////////////////////////////////////////////////

    // helper functions for internal blending modes
    p.mix = function(a, b, f) {
      return a + (((b - a) * f) >> 8);
    };

    p.peg = function(n) {
      return (n < 0) ? 0 : ((n > 255) ? 255 : n);
    };

    // blending modes
    /**
    * These are internal blending modes used for BlendColor()
    *
    * @param {Color} c1       First Color to blend
    * @param {Color} c2       Second Color to blend
    *
    * @returns {Color}        The blended Color
    *
    * @see BlendColor
    * @see Blend
    */
    p.modes = {
      replace: function(c1, c2) {
        return c2;
      },
      blend: function(c1, c2) {
        var f = (c2 & PConstants.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                p.mix(c1 & PConstants.RED_MASK, c2 & PConstants.RED_MASK, f) & PConstants.RED_MASK |
                p.mix(c1 & PConstants.GREEN_MASK, c2 & PConstants.GREEN_MASK, f) & PConstants.GREEN_MASK |
                p.mix(c1 & PConstants.BLUE_MASK, c2 & PConstants.BLUE_MASK, f));
      },
      add: function(c1, c2) {
        var f = (c2 & PConstants.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                Math.min(((c1 & PConstants.RED_MASK) + ((c2 & PConstants.RED_MASK) >> 8) * f), PConstants.RED_MASK) & PConstants.RED_MASK |
                Math.min(((c1 & PConstants.GREEN_MASK) + ((c2 & PConstants.GREEN_MASK) >> 8) * f), PConstants.GREEN_MASK) & PConstants.GREEN_MASK |
                Math.min((c1 & PConstants.BLUE_MASK) + (((c2 & PConstants.BLUE_MASK) * f) >> 8), PConstants.BLUE_MASK));
      },
      subtract: function(c1, c2) {
        var f = (c2 & PConstants.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                Math.max(((c1 & PConstants.RED_MASK) - ((c2 & PConstants.RED_MASK) >> 8) * f), PConstants.GREEN_MASK) & PConstants.RED_MASK |
                Math.max(((c1 & PConstants.GREEN_MASK) - ((c2 & PConstants.GREEN_MASK) >> 8) * f), PConstants.BLUE_MASK) & PConstants.GREEN_MASK |
                Math.max((c1 & PConstants.BLUE_MASK) - (((c2 & PConstants.BLUE_MASK) * f) >> 8), 0));
      },
      lightest: function(c1, c2) {
        var f = (c2 & PConstants.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                Math.max(c1 & PConstants.RED_MASK, ((c2 & PConstants.RED_MASK) >> 8) * f) & PConstants.RED_MASK |
                Math.max(c1 & PConstants.GREEN_MASK, ((c2 & PConstants.GREEN_MASK) >> 8) * f) & PConstants.GREEN_MASK |
                Math.max(c1 & PConstants.BLUE_MASK, ((c2 & PConstants.BLUE_MASK) * f) >> 8));
      },
      darkest: function(c1, c2) {
        var f = (c2 & PConstants.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                p.mix(c1 & PConstants.RED_MASK, Math.min(c1 & PConstants.RED_MASK, ((c2 & PConstants.RED_MASK) >> 8) * f), f) & PConstants.RED_MASK |
                p.mix(c1 & PConstants.GREEN_MASK, Math.min(c1 & PConstants.GREEN_MASK, ((c2 & PConstants.GREEN_MASK) >> 8) * f), f) & PConstants.GREEN_MASK |
                p.mix(c1 & PConstants.BLUE_MASK, Math.min(c1 & PConstants.BLUE_MASK, ((c2 & PConstants.BLUE_MASK) * f) >> 8), f));
      },
      difference: function(c1, c2) {
        var f  = (c2 & PConstants.ALPHA_MASK) >>> 24;
        var ar = (c1 & PConstants.RED_MASK) >> 16;
        var ag = (c1 & PConstants.GREEN_MASK) >> 8;
        var ab = (c1 & PConstants.BLUE_MASK);
        var br = (c2 & PConstants.RED_MASK) >> 16;
        var bg = (c2 & PConstants.GREEN_MASK) >> 8;
        var bb = (c2 & PConstants.BLUE_MASK);
        // formula:
        var cr = (ar > br) ? (ar - br) : (br - ar);
        var cg = (ag > bg) ? (ag - bg) : (bg - ag);
        var cb = (ab > bb) ? (ab - bb) : (bb - ab);
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) |
                (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) |
                (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      exclusion: function(c1, c2) {
        var f  = (c2 & PConstants.ALPHA_MASK) >>> 24;
        var ar = (c1 & PConstants.RED_MASK) >> 16;
        var ag = (c1 & PConstants.GREEN_MASK) >> 8;
        var ab = (c1 & PConstants.BLUE_MASK);
        var br = (c2 & PConstants.RED_MASK) >> 16;
        var bg = (c2 & PConstants.GREEN_MASK) >> 8;
        var bb = (c2 & PConstants.BLUE_MASK);
        // formula:
        var cr = ar + br - ((ar * br) >> 7);
        var cg = ag + bg - ((ag * bg) >> 7);
        var cb = ab + bb - ((ab * bb) >> 7);
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) |
                (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) |
                (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      multiply: function(c1, c2) {
        var f  = (c2 & PConstants.ALPHA_MASK) >>> 24;
        var ar = (c1 & PConstants.RED_MASK) >> 16;
        var ag = (c1 & PConstants.GREEN_MASK) >> 8;
        var ab = (c1 & PConstants.BLUE_MASK);
        var br = (c2 & PConstants.RED_MASK) >> 16;
        var bg = (c2 & PConstants.GREEN_MASK) >> 8;
        var bb = (c2 & PConstants.BLUE_MASK);
        // formula:
        var cr = (ar * br) >> 8;
        var cg = (ag * bg) >> 8;
        var cb = (ab * bb) >> 8;
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) |
                (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) |
                (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      screen: function(c1, c2) {
        var f  = (c2 & PConstants.ALPHA_MASK) >>> 24;
        var ar = (c1 & PConstants.RED_MASK) >> 16;
        var ag = (c1 & PConstants.GREEN_MASK) >> 8;
        var ab = (c1 & PConstants.BLUE_MASK);
        var br = (c2 & PConstants.RED_MASK) >> 16;
        var bg = (c2 & PConstants.GREEN_MASK) >> 8;
        var bb = (c2 & PConstants.BLUE_MASK);
        // formula:
        var cr = 255 - (((255 - ar) * (255 - br)) >> 8);
        var cg = 255 - (((255 - ag) * (255 - bg)) >> 8);
        var cb = 255 - (((255 - ab) * (255 - bb)) >> 8);
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) |
                (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) |
                (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      hard_light: function(c1, c2) {
        var f  = (c2 & PConstants.ALPHA_MASK) >>> 24;
        var ar = (c1 & PConstants.RED_MASK) >> 16;
        var ag = (c1 & PConstants.GREEN_MASK) >> 8;
        var ab = (c1 & PConstants.BLUE_MASK);
        var br = (c2 & PConstants.RED_MASK) >> 16;
        var bg = (c2 & PConstants.GREEN_MASK) >> 8;
        var bb = (c2 & PConstants.BLUE_MASK);
        // formula:
        var cr = (br < 128) ? ((ar * br) >> 7) : (255 - (((255 - ar) * (255 - br)) >> 7));
        var cg = (bg < 128) ? ((ag * bg) >> 7) : (255 - (((255 - ag) * (255 - bg)) >> 7));
        var cb = (bb < 128) ? ((ab * bb) >> 7) : (255 - (((255 - ab) * (255 - bb)) >> 7));
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) |
                (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) |
                (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      soft_light: function(c1, c2) {
        var f  = (c2 & PConstants.ALPHA_MASK) >>> 24;
        var ar = (c1 & PConstants.RED_MASK) >> 16;
        var ag = (c1 & PConstants.GREEN_MASK) >> 8;
        var ab = (c1 & PConstants.BLUE_MASK);
        var br = (c2 & PConstants.RED_MASK) >> 16;
        var bg = (c2 & PConstants.GREEN_MASK) >> 8;
        var bb = (c2 & PConstants.BLUE_MASK);
        // formula:
        var cr = ((ar * br) >> 7) + ((ar * ar) >> 8) - ((ar * ar * br) >> 15);
        var cg = ((ag * bg) >> 7) + ((ag * ag) >> 8) - ((ag * ag * bg) >> 15);
        var cb = ((ab * bb) >> 7) + ((ab * ab) >> 8) - ((ab * ab * bb) >> 15);
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) |
                (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) |
                (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      overlay: function(c1, c2) {
        var f  = (c2 & PConstants.ALPHA_MASK) >>> 24;
        var ar = (c1 & PConstants.RED_MASK) >> 16;
        var ag = (c1 & PConstants.GREEN_MASK) >> 8;
        var ab = (c1 & PConstants.BLUE_MASK);
        var br = (c2 & PConstants.RED_MASK) >> 16;
        var bg = (c2 & PConstants.GREEN_MASK) >> 8;
        var bb = (c2 & PConstants.BLUE_MASK);
        // formula:
        var cr = (ar < 128) ? ((ar * br) >> 7) : (255 - (((255 - ar) * (255 - br)) >> 7));
        var cg = (ag < 128) ? ((ag * bg) >> 7) : (255 - (((255 - ag) * (255 - bg)) >> 7));
        var cb = (ab < 128) ? ((ab * bb) >> 7) : (255 - (((255 - ab) * (255 - bb)) >> 7));
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) |
                (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) |
                (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      dodge: function(c1, c2) {
        var f  = (c2 & PConstants.ALPHA_MASK) >>> 24;
        var ar = (c1 & PConstants.RED_MASK) >> 16;
        var ag = (c1 & PConstants.GREEN_MASK) >> 8;
        var ab = (c1 & PConstants.BLUE_MASK);
        var br = (c2 & PConstants.RED_MASK) >> 16;
        var bg = (c2 & PConstants.GREEN_MASK) >> 8;
        var bb = (c2 & PConstants.BLUE_MASK);
        // formula:
        var cr = (br === 255) ? 255 : p.peg((ar << 8) / (255 - br)); // division requires pre-peg()-ing
        var cg = (bg === 255) ? 255 : p.peg((ag << 8) / (255 - bg)); // "
        var cb = (bb === 255) ? 255 : p.peg((ab << 8) / (255 - bb)); // "
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) |
                (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) |
                (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      burn: function(c1, c2) {
        var f  = (c2 & PConstants.ALPHA_MASK) >>> 24;
        var ar = (c1 & PConstants.RED_MASK) >> 16;
        var ag = (c1 & PConstants.GREEN_MASK) >> 8;
        var ab = (c1 & PConstants.BLUE_MASK);
        var br = (c2 & PConstants.RED_MASK) >> 16;
        var bg = (c2 & PConstants.GREEN_MASK) >> 8;
        var bb = (c2 & PConstants.BLUE_MASK);
        // formula:
        var cr = (br === 0) ? 0 : 255 - p.peg(((255 - ar) << 8) / br); // division requires pre-peg()-ing
        var cg = (bg === 0) ? 0 : 255 - p.peg(((255 - ag) << 8) / bg); // "
        var cb = (bb === 0) ? 0 : 255 - p.peg(((255 - ab) << 8) / bb); // "
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) |
                (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) |
                (p.peg(ab + (((cb - ab) * f) >> 8))));
      }
    };

    function color$4(aValue1, aValue2, aValue3, aValue4) {
      var r, g, b, a;

      if (curColorMode === PConstants.HSB) {
        var rgb = p.color.toRGB(aValue1, aValue2, aValue3);
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
      } else {
        r = Math.round(255 * (aValue1 / colorModeX));
        g = Math.round(255 * (aValue2 / colorModeY));
        b = Math.round(255 * (aValue3 / colorModeZ));
      }

      a = Math.round(255 * (aValue4 / colorModeA));

      // Limit values greater than 255
      r = (r > 255) ? 255 : r;
      g = (g > 255) ? 255 : g;
      b = (b > 255) ? 255 : b;
      a = (a > 255) ? 255 : a;

      // Create color int
      return (a << 24) & PConstants.ALPHA_MASK | (r << 16) & PConstants.RED_MASK | (g << 8) & PConstants.GREEN_MASK | b & PConstants.BLUE_MASK;
    }

    function color$2(aValue1, aValue2) {
      var a;

      // Color int and alpha
      if (aValue1 & PConstants.ALPHA_MASK) {
        a = Math.round(255 * (aValue2 / colorModeA));
        a = (a > 255) ? 255 : a;

        return aValue1 - (aValue1 & PConstants.ALPHA_MASK) + ((a << 24) & PConstants.ALPHA_MASK);
      }
      // Grayscale and alpha
      else {
        if (curColorMode === PConstants.RGB) {
          return color$4(aValue1, aValue1, aValue1, aValue2);
        } else if (curColorMode === PConstants.HSB) {
          return color$4(0, 0, (aValue1 / colorModeX) * colorModeZ, aValue2);
        }
      }
    }

    function color$1(aValue1) {
      // Grayscale
      if (aValue1 <= colorModeX && aValue1 >= 0) {
          if (curColorMode === PConstants.RGB) {
            return color$4(aValue1, aValue1, aValue1, colorModeA);
          } else if (curColorMode === PConstants.HSB) {
            return color$4(0, 0, (aValue1 / colorModeX) * colorModeZ, colorModeA);
          }
      }
      // Color int
      else if (aValue1) {
        return aValue1;
      }
    }

    /**
    * Creates colors for storing in variables of the color datatype. The parameters are
    * interpreted as RGB or HSB values depending on the current colorMode(). The default
    * mode is RGB values from 0 to 255 and therefore, the function call color(255, 204, 0)
    * will return a bright yellow color. More about how colors are stored can be found in
    * the reference for the color datatype.
    *
    * @param {int|float} aValue1        red or hue or grey values relative to the current color range.
    * Also can be color value in hexadecimal notation (i.e. #FFCC00 or 0xFFFFCC00)
    * @param {int|float} aValue2        green or saturation values relative to the current color range
    * @param {int|float} aValue3        blue or brightness values relative to the current color range
    * @param {int|float} aValue4        relative to current color range. Represents alpha
    *
    * @returns {color} the color
    *
    * @see colorMode
    */
    p.color = function color(aValue1, aValue2, aValue3, aValue4) {

      // 4 arguments: (R, G, B, A) or (H, S, B, A)
      if (aValue1 !== undef && aValue2 !== undef && aValue3 !== undef && aValue4 !== undef) {
        return color$4(aValue1, aValue2, aValue3, aValue4);
      }

      // 3 arguments: (R, G, B) or (H, S, B)
      if (aValue1 !== undef && aValue2 !== undef && aValue3 !== undef) {
        return color$4(aValue1, aValue2, aValue3, colorModeA);
      }

      // 2 arguments: (Color, A) or (Grayscale, A)
      if (aValue1 !== undef && aValue2 !== undef) {
        return color$2(aValue1, aValue2);
      }

      // 1 argument: (Grayscale) or (Color)
      if (typeof aValue1 === "number") {
        return color$1(aValue1);
      }

      // Default
      return color$4(colorModeX, colorModeY, colorModeZ, colorModeA);
    };

    // Ease of use function to extract the colour bits into a string
    p.color.toString = function(colorInt) {
      return "rgba(" + ((colorInt & PConstants.RED_MASK) >>> 16) + "," + ((colorInt & PConstants.GREEN_MASK) >>> 8) +
             "," + ((colorInt & PConstants.BLUE_MASK)) + "," + ((colorInt & PConstants.ALPHA_MASK) >>> 24) / 255 + ")";
    };

    // Easy of use function to pack rgba values into a single bit-shifted color int.
    p.color.toInt = function(r, g, b, a) {
      return (a << 24) & PConstants.ALPHA_MASK | (r << 16) & PConstants.RED_MASK | (g << 8) & PConstants.GREEN_MASK | b & PConstants.BLUE_MASK;
    };

    // Creates a simple array in [R, G, B, A] format, [255, 255, 255, 255]
    p.color.toArray = function(colorInt) {
      return [(colorInt & PConstants.RED_MASK) >>> 16, (colorInt & PConstants.GREEN_MASK) >>> 8,
              colorInt & PConstants.BLUE_MASK, (colorInt & PConstants.ALPHA_MASK) >>> 24];
    };

    // Creates a WebGL color array in [R, G, B, A] format. WebGL wants the color ranges between 0 and 1, [1, 1, 1, 1]
    p.color.toGLArray = function(colorInt) {
      return [((colorInt & PConstants.RED_MASK) >>> 16) / 255, ((colorInt & PConstants.GREEN_MASK) >>> 8) / 255,
              (colorInt & PConstants.BLUE_MASK) / 255, ((colorInt & PConstants.ALPHA_MASK) >>> 24) / 255];
    };

    // HSB conversion function from Mootools, MIT Licensed
    p.color.toRGB = function(h, s, b) {
      // Limit values greater than range
      h = (h > colorModeX) ? colorModeX : h;
      s = (s > colorModeY) ? colorModeY : s;
      b = (b > colorModeZ) ? colorModeZ : b;

      h = (h / colorModeX) * 360;
      s = (s / colorModeY) * 100;
      b = (b / colorModeZ) * 100;

      var br = Math.round(b / 100 * 255);

      if (s === 0) { // Grayscale
        return [br, br, br];
      } else {
        var hue = h % 360;
        var f = hue % 60;
        var p = Math.round((b * (100 - s)) / 10000 * 255);
        var q = Math.round((b * (6000 - s * f)) / 600000 * 255);
        var t = Math.round((b * (6000 - s * (60 - f))) / 600000 * 255);
        switch (Math.floor(hue / 60)) {
        case 0:
          return [br, t, p];
        case 1:
          return [q, br, p];
        case 2:
          return [p, br, t];
        case 3:
          return [p, q, br];
        case 4:
          return [t, p, br];
        case 5:
          return [br, p, q];
        }
      }
    };

    p.color.toHSB = function( colorInt ) {
      var red, green, blue;

      red   = ((colorInt & PConstants.RED_MASK) >>> 16) / 255;
      green = ((colorInt & PConstants.GREEN_MASK) >>> 8) / 255;
      blue  = (colorInt & PConstants.BLUE_MASK) / 255;

      var max = p.max(p.max(red,green), blue),
          min = p.min(p.min(red,green), blue),
          hue, saturation;

      if (min === max) {
        return [0, 0, max];
      } else {
        saturation = (max - min) / max;

        if (red === max) {
          hue = (green - blue) / (max - min);
        } else if (green === max) {
          hue = 2 + ((blue - red) / (max - min));
        } else {
          hue = 4 + ((red - green) / (max - min));
        }

        hue /= 6;

        if (hue < 0) {
          hue += 1;
        } else if (hue > 1) {
          hue -= 1;
        }
      }
      return [hue*colorModeX, saturation*colorModeY, max*colorModeZ];
    };

    /**
    * Extracts the brightness value from a color.
    *
    * @param {color} colInt any value of the color datatype
    *
    * @returns {float} The brightness color value.
    *
    * @see red
    * @see green
    * @see blue
    * @see hue
    * @see saturation
    */
    p.brightness = function(colInt){
      return  p.color.toHSB(colInt)[2];
    };

    /**
    * Extracts the saturation value from a color.
    *
    * @param {color} colInt any value of the color datatype
    *
    * @returns {float} The saturation color value.
    *
    * @see red
    * @see green
    * @see blue
    * @see hue
    * @see brightness
    */
    p.saturation = function(colInt){
      return  p.color.toHSB(colInt)[1];
    };

    /**
    * Extracts the hue value from a color.
    *
    * @param {color} colInt any value of the color datatype
    *
    * @returns {float} The hue color value.
    *
    * @see red
    * @see green
    * @see blue
    * @see saturation
    * @see brightness
    */
    p.hue = function(colInt){
      return  p.color.toHSB(colInt)[0];
    };

    var verifyChannel = function verifyChannel(aColor) {
      if (aColor.constructor === Array) {
        return aColor;
      } else {
        return p.color(aColor);
      }
    };

    /**
    * Extracts the red value from a color, scaled to match current colorMode().
    * This value is always returned as a float so be careful not to assign it to an int value.
    *
    * @param {color} aColor any value of the color datatype
    *
    * @returns {float} The red color value.
    *
    * @see green
    * @see blue
    * @see alpha
    * @see >> right shift
    * @see hue
    * @see saturation
    * @see brightness
    */
    p.red = function(aColor) {
      return ((aColor & PConstants.RED_MASK) >>> 16) / 255 * colorModeX;
    };

    /**
    * Extracts the green value from a color, scaled to match current colorMode().
    * This value is always returned as a float so be careful not to assign it to an int value.
    *
    * @param {color} aColor any value of the color datatype
    *
    * @returns {float} The green color value.
    *
    * @see red
    * @see blue
    * @see alpha
    * @see >> right shift
    * @see hue
    * @see saturation
    * @see brightness
    */
    p.green = function(aColor) {
      return ((aColor & PConstants.GREEN_MASK) >>> 8) / 255 * colorModeY;
    };

    /**
    * Extracts the blue value from a color, scaled to match current colorMode().
    * This value is always returned as a float so be careful not to assign it to an int value.
    *
    * @param {color} aColor any value of the color datatype
    *
    * @returns {float} The blue color value.
    *
    * @see red
    * @see green
    * @see alpha
    * @see >> right shift
    * @see hue
    * @see saturation
    * @see brightness
    */
    p.blue = function(aColor) {
      return (aColor & PConstants.BLUE_MASK) / 255 * colorModeZ;
    };

    /**
    * Extracts the alpha value from a color, scaled to match current colorMode().
    * This value is always returned as a float so be careful not to assign it to an int value.
    *
    * @param {color} aColor any value of the color datatype
    *
    * @returns {float} The alpha color value.
    *
    * @see red
    * @see green
    * @see blue
    * @see >> right shift
    * @see hue
    * @see saturation
    * @see brightness
    */
    p.alpha = function(aColor) {
      return ((aColor & PConstants.ALPHA_MASK) >>> 24) / 255 * colorModeA;
    };

    /**
    * Calculates a color or colors between two colors at a specific increment.
    * The amt parameter is the amount to interpolate between the two values where 0.0
    * equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
    *
    * @param {color} c1     interpolate from this color
    * @param {color} c2     interpolate to this color
    * @param {float} amt    between 0.0 and 1.0
    *
    * @returns {float} The blended color.
    *
    * @see blendColor
    * @see color
    */
    p.lerpColor = function lerpColor(c1, c2, amt) {
      // Get RGBA values for Color 1 to floats
      var colorBits1 = p.color(c1);
      var r1 = (colorBits1 & PConstants.RED_MASK) >>> 16;
      var g1 = (colorBits1 & PConstants.GREEN_MASK) >>> 8;
      var b1 = (colorBits1 & PConstants.BLUE_MASK);
      var a1 = ((colorBits1 & PConstants.ALPHA_MASK) >>> 24) / colorModeA;

      // Get RGBA values for Color 2 to floats
      var colorBits2 = p.color(c2);
      var r2 = (colorBits2 & PConstants.RED_MASK) >>> 16;
      var g2 = (colorBits2 & PConstants.GREEN_MASK) >>> 8;
      var b2 = (colorBits2 & PConstants.BLUE_MASK);
      var a2 = ((colorBits2 & PConstants.ALPHA_MASK) >>> 24) / colorModeA;

      // Return lerp value for each channel, INT for color, Float for Alpha-range
      var r = parseInt(p.lerp(r1, r2, amt), 10);
      var g = parseInt(p.lerp(g1, g2, amt), 10);
      var b = parseInt(p.lerp(b1, b2, amt), 10);
      var a = parseFloat(p.lerp(a1, a2, amt) * colorModeA);

      return p.color.toInt(r, g, b, a);
    };

    // Forced default color mode for #aaaaaa style
    /**
    * Convert 3 int values to a color in the default color mode RGB even if curColorMode is not set to RGB
    *
    * @param {int} aValue1              range for the red color
    * @param {int} aValue2              range for the green color
    * @param {int} aValue3              range for the blue color
    *
    * @returns {Color}
    *
    * @see color
    */
    p.defaultColor = function(aValue1, aValue2, aValue3) {
      var tmpColorMode = curColorMode;
      curColorMode = PConstants.RGB;
      var c = p.color(aValue1 / 255 * colorModeX, aValue2 / 255 * colorModeY, aValue3 / 255 * colorModeZ);
      curColorMode = tmpColorMode;
      return c;
    };

    /**
    * Changes the way Processing interprets color data. By default, fill(), stroke(), and background()
    * colors are set by values between 0 and 255 using the RGB color model. It is possible to change the
    * numerical range used for specifying colors and to switch color systems. For example, calling colorMode(RGB, 1.0)
    * will specify that values are specified between 0 and 1. The limits for defining colors are altered by setting the
    * parameters range1, range2, range3, and range 4.
    *
    * @param {MODE} mode Either RGB or HSB, corresponding to Red/Green/Blue and Hue/Saturation/Brightness
    * @param {int|float} range              range for all color elements
    * @param {int|float} range1             range for the red or hue depending on the current color mode
    * @param {int|float} range2             range for the green or saturation depending on the current color mode
    * @param {int|float} range3             range for the blue or brightness depending on the current color mode
    * @param {int|float} range4             range for the alpha
    *
    * @returns none
    *
    * @see background
    * @see fill
    * @see stroke
    */
    p.colorMode = function colorMode() { // mode, range1, range2, range3, range4
      curColorMode = arguments[0];
      if (arguments.length > 1) {
        colorModeX   = arguments[1];
        colorModeY   = arguments[2] || arguments[1];
        colorModeZ   = arguments[3] || arguments[1];
        colorModeA   = arguments[4] || arguments[1];
      }
    };

    /**
    * Blends two color values together based on the blending mode given as the MODE parameter.
    * The possible modes are described in the reference for the blend() function.
    *
    * @param {color} c1 color: the first color to blend
    * @param {color} c2 color: the second color to blend
    * @param {MODE} MODE Either BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE, EXCLUSION, MULTIPLY,
    * SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, or BURN
    *
    * @returns {float} The blended color.
    *
    * @see blend
    * @see color
    */
    p.blendColor = function(c1, c2, mode) {
      var color = 0;
      switch (mode) {
      case PConstants.REPLACE:
        color = p.modes.replace(c1, c2);
        break;
      case PConstants.BLEND:
        color = p.modes.blend(c1, c2);
        break;
      case PConstants.ADD:
        color = p.modes.add(c1, c2);
        break;
      case PConstants.SUBTRACT:
        color = p.modes.subtract(c1, c2);
        break;
      case PConstants.LIGHTEST:
        color = p.modes.lightest(c1, c2);
        break;
      case PConstants.DARKEST:
        color = p.modes.darkest(c1, c2);
        break;
      case PConstants.DIFFERENCE:
        color = p.modes.difference(c1, c2);
        break;
      case PConstants.EXCLUSION:
        color = p.modes.exclusion(c1, c2);
        break;
      case PConstants.MULTIPLY:
        color = p.modes.multiply(c1, c2);
        break;
      case PConstants.SCREEN:
        color = p.modes.screen(c1, c2);
        break;
      case PConstants.HARD_LIGHT:
        color = p.modes.hard_light(c1, c2);
        break;
      case PConstants.SOFT_LIGHT:
        color = p.modes.soft_light(c1, c2);
        break;
      case PConstants.OVERLAY:
        color = p.modes.overlay(c1, c2);
        break;
      case PConstants.DODGE:
        color = p.modes.dodge(c1, c2);
        break;
      case PConstants.BURN:
        color = p.modes.burn(c1, c2);
        break;
      }
      return color;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Canvas-Matrix manipulation
    ////////////////////////////////////////////////////////////////////////////

    function saveContext() {
      curContext.save();
    }

    function restoreContext() {
      curContext.restore();
      isStrokeDirty = true;
      isFillDirty = true;
    }

    /**
    * Prints the current matrix to the text window.
    *
    * @returns none
    *
    * @see pushMatrix
    * @see popMatrix
    * @see resetMatrix
    * @see applyMatrix
    */
    p.printMatrix = function printMatrix() {
      modelView.print();
    };

    /**
    * Specifies an amount to displace objects within the display window. The x parameter specifies left/right translation,
    * the y parameter specifies up/down translation, and the z parameter specifies translations toward/away from the screen.
    * Using this function with the z  parameter requires using the P3D or OPENGL parameter in combination with size as shown
    * in the above example. Transformations apply to everything that happens after and subsequent calls to the function
    * accumulates the effect. For example, calling translate(50, 0) and then translate(20, 0) is the same as translate(70, 0).
    * If translate() is called within draw(), the transformation is reset when the loop begins again.
    * This function can be further controlled by the pushMatrix() and popMatrix().
    *
    * @param {int|float} x        left/right translation
    * @param {int|float} y        up/down translation
    * @param {int|float} z        forward/back translation
    *
    * @returns none
    *
    * @see pushMatrix
    * @see popMatrix
    * @see scale
    * @see rotate
    * @see rotateX
    * @see rotateY
    * @see rotateZ
    */
    p.translate = function translate(x, y, z) {
      if (p.use3DContext) {
        forwardTransform.translate(x, y, z);
        reverseTransform.invTranslate(x, y, z);
      } else {
        curContext.translate(x, y);
      }
    };

    /**
    * Increases or decreases the size of a shape by expanding and contracting vertices. Objects always scale from their
    * relative origin to the coordinate system. Scale values are specified as decimal percentages. For example, the
    * function call scale(2.0) increases the dimension of a shape by 200%. Transformations apply to everything that
    * happens after and subsequent calls to the function multiply the effect. For example, calling scale(2.0) and
    * then scale(1.5) is the same as scale(3.0). If scale() is called within draw(), the transformation is reset when
    * the loop begins again. Using this fuction with the z  parameter requires passing P3D or OPENGL into the size()
    * parameter as shown in the example above. This function can be further controlled by pushMatrix() and popMatrix().
    *
    * @param {int|float} size     percentage to scale the object
    * @param {int|float} x        percentage to scale the object in the x-axis
    * @param {int|float} y        percentage to scale the object in the y-axis
    * @param {int|float} z        percentage to scale the object in the z-axis
    *
    * @returns none
    *
    * @see pushMatrix
    * @see popMatrix
    * @see translate
    * @see rotate
    * @see rotateX
    * @see rotateY
    * @see rotateZ
    */
    p.scale = function scale(x, y, z) {
      if (p.use3DContext) {
        forwardTransform.scale(x, y, z);
        reverseTransform.invScale(x, y, z);
      } else {
        curContext.scale(x, y || x);
      }
    };

    /**
    * Pushes the current transformation matrix onto the matrix stack. Understanding pushMatrix() and popMatrix()
    * requires understanding the concept of a matrix stack. The pushMatrix() function saves the current coordinate
    * system to the stack and popMatrix() restores the prior coordinate system. pushMatrix() and popMatrix() are
    * used in conjuction with the other transformation methods and may be embedded to control the scope of
    * the transformations.
    *
    * @returns none
    *
    * @see popMatrix
    * @see translate
    * @see rotate
    * @see rotateX
    * @see rotateY
    * @see rotateZ
    */
    p.pushMatrix = function pushMatrix() {
      if (p.use3DContext) {
        userMatrixStack.load(modelView);
      } else {
        saveContext();
      }
    };

    /**
    * Pops the current transformation matrix off the matrix stack. Understanding pushing and popping requires
    * understanding the concept of a matrix stack. The pushMatrix() function saves the current coordinate system to
    * the stack and popMatrix() restores the prior coordinate system. pushMatrix() and popMatrix() are used in
    * conjuction with the other transformation methods and may be embedded to control the scope of the transformations.
    *
    * @returns none
    *
    * @see popMatrix
    * @see pushMatrix
    */
    p.popMatrix = function popMatrix() {
      if (p.use3DContext) {
        modelView.set(userMatrixStack.pop());
      } else {
        restoreContext();
      }
    };

    /**
    * Replaces the current matrix with the identity matrix. The equivalent function in OpenGL is glLoadIdentity().
    *
    * @returns none
    *
    * @see popMatrix
    * @see pushMatrix
    * @see applyMatrix
    * @see printMatrix
    */
    p.resetMatrix = function resetMatrix() {
      if (p.use3DContext) {
        forwardTransform.reset();
        reverseTransform.reset();
      } else {
        curContext.setTransform(1,0,0,1,0,0);
      }
    };

    /**
    * Multiplies the current matrix by the one specified through the parameters. This is very slow because it will
    * try to calculate the inverse of the transform, so avoid it whenever possible. The equivalent function
    * in OpenGL is glMultMatrix().
    *
    * @param {int|float} n00-n15      numbers which define the 4x4 matrix to be multiplied
    *
    * @returns none
    *
    * @see popMatrix
    * @see pushMatrix
    * @see resetMatrix
    * @see printMatrix
    */
    p.applyMatrix = function applyMatrix() {
      var a = arguments;
      if (!p.use3DContext) {
        for (var cnt = a.length; cnt < 16; cnt++) {
          a[cnt] = 0;
        }
        a[10] = a[15] = 1;
      }

      forwardTransform.apply(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
      reverseTransform.invApply(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
    };

    /**
    * Rotates a shape around the x-axis the amount specified by the angle parameter. Angles should be
    * specified in radians (values from 0 to PI*2) or converted to radians with the radians()  function.
    * Objects are always rotated around their relative position to the origin and positive numbers
    * rotate objects in a counterclockwise direction. Transformations apply to everything that happens
    * after and subsequent calls to the function accumulates the effect. For example, calling rotateX(PI/2)
    * and then rotateX(PI/2) is the same as rotateX(PI). If rotateX() is called within the draw(), the
    * transformation is reset when the loop begins again. This function requires passing P3D or OPENGL
    * into the size() parameter as shown in the example above.
    *
    * @param {int|float} angleInRadians     angle of rotation specified in radians
    *
    * @returns none
    *
    * @see rotateY
    * @see rotateZ
    * @see rotate
    * @see translate
    * @see scale
    * @see popMatrix
    * @see pushMatrix
    */
    p.rotateX = function(angleInRadians) {
      forwardTransform.rotateX(angleInRadians);
      reverseTransform.invRotateX(angleInRadians);
    };

    /**
    * Rotates a shape around the z-axis the amount specified by the angle parameter. Angles should be
    * specified in radians (values from 0 to PI*2) or converted to radians with the radians()  function.
    * Objects are always rotated around their relative position to the origin and positive numbers
    * rotate objects in a counterclockwise direction. Transformations apply to everything that happens
    * after and subsequent calls to the function accumulates the effect. For example, calling rotateZ(PI/2)
    * and then rotateZ(PI/2) is the same as rotateZ(PI). If rotateZ() is called within the draw(), the
    * transformation is reset when the loop begins again. This function requires passing P3D or OPENGL
    * into the size() parameter as shown in the example above.
    *
    * @param {int|float} angleInRadians     angle of rotation specified in radians
    *
    * @returns none
    *
    * @see rotateX
    * @see rotateY
    * @see rotate
    * @see translate
    * @see scale
    * @see popMatrix
    * @see pushMatrix
    */
    p.rotateZ = function(angleInRadians) {
      forwardTransform.rotateZ(angleInRadians);
      reverseTransform.invRotateZ(angleInRadians);
    };

    /**
    * Rotates a shape around the y-axis the amount specified by the angle parameter. Angles should be
    * specified in radians (values from 0 to PI*2) or converted to radians with the radians()  function.
    * Objects are always rotated around their relative position to the origin and positive numbers
    * rotate objects in a counterclockwise direction. Transformations apply to everything that happens
    * after and subsequent calls to the function accumulates the effect. For example, calling rotateY(PI/2)
    * and then rotateY(PI/2) is the same as rotateY(PI). If rotateY() is called within the draw(), the
    * transformation is reset when the loop begins again. This function requires passing P3D or OPENGL
    * into the size() parameter as shown in the example above.
    *
    * @param {int|float} angleInRadians     angle of rotation specified in radians
    *
    * @returns none
    *
    * @see rotateX
    * @see rotateZ
    * @see rotate
    * @see translate
    * @see scale
    * @see popMatrix
    * @see pushMatrix
    */
    p.rotateY = function(angleInRadians) {
      forwardTransform.rotateY(angleInRadians);
      reverseTransform.invRotateY(angleInRadians);
    };

    /**
    * Rotates a shape the amount specified by the angle parameter. Angles should be specified in radians
    * (values from 0 to TWO_PI) or converted to radians with the radians() function. Objects are always
    * rotated around their relative position to the origin and positive numbers rotate objects in a
    * clockwise direction. Transformations apply to everything that happens after and subsequent calls
    * to the function accumulates the effect. For example, calling rotate(HALF_PI) and then rotate(HALF_PI)
    * is the same as rotate(PI). All tranformations are reset when draw() begins again. Technically,
    * rotate() multiplies the current transformation matrix by a rotation matrix. This function can be
    * further controlled by the pushMatrix() and popMatrix().
    *
    * @param {int|float} angleInRadians     angle of rotation specified in radians
    *
    * @returns none
    *
    * @see rotateX
    * @see rotateY
    * @see rotateZ
    * @see rotate
    * @see translate
    * @see scale
    * @see popMatrix
    * @see pushMatrix
    */
    p.rotate = function rotate(angleInRadians) {
      if (p.use3DContext) {
        forwardTransform.rotateZ(angleInRadians);
        reverseTransform.invRotateZ(angleInRadians);
      } else {
        curContext.rotate(angleInRadians);
      }
    };

    /**
    * The pushStyle() function saves the current style settings and popStyle()  restores the prior settings.
    * Note that these functions are always used together. They allow you to change the style settings and later
    * return to what you had. When a new style is started with pushStyle(), it builds on the current style information.
    * The pushStyle() and popStyle() functions can be embedded to provide more control (see the second example
    * above for a demonstration.)
    * The style information controlled by the following functions are included in the style: fill(), stroke(), tint(),
    * strokeWeight(), strokeCap(), strokeJoin(), imageMode(), rectMode(), ellipseMode(), shapeMode(), colorMode(),
    * textAlign(), textFont(), textMode(), textSize(), textLeading(), emissive(), specular(), shininess(), ambient()
    *
    * @returns none
    *
    * @see popStyle
    */
    p.pushStyle = function pushStyle() {
      // Save the canvas state.
      saveContext();

      p.pushMatrix();

      var newState = {
        'doFill': doFill,
        'currentFillColor': currentFillColor,
        'doStroke': doStroke,
        'currentStrokeColor': currentStrokeColor,
        'curTint': curTint,
        'curRectMode': curRectMode,
        'curColorMode': curColorMode,
        'colorModeX': colorModeX,
        'colorModeZ': colorModeZ,
        'colorModeY': colorModeY,
        'colorModeA': colorModeA,
        'curTextFont': curTextFont,
        'curTextSize': curTextSize
      };

      styleArray.push(newState);
    };

    /**
    * The pushStyle() function saves the current style settings and popStyle()  restores the prior settings; these
    * functions are always used together. They allow you to change the style settings and later return to what you had.
    * When a new style is started with pushStyle(), it builds on the current style information. The pushStyle() and
    * popStyle() functions can be embedded to provide more control (see the second example above for a demonstration.)
    *
    * @returns none
    *
    * @see pushStyle
    */
    p.popStyle = function popStyle() {
      var oldState = styleArray.pop();

      if (oldState) {
        restoreContext();

        p.popMatrix();

        doFill = oldState.doFill;
        currentFillColor = oldState.currentFillColor;
        doStroke = oldState.doStroke;
        currentStrokeColor = oldState.currentStrokeColor;
        curTint = oldState.curTint;
        curRectMode = oldState.curRectmode;
        curColorMode = oldState.curColorMode;
        colorModeX = oldState.colorModeX;
        colorModeZ = oldState.colorModeZ;
        colorModeY = oldState.colorModeY;
        colorModeA = oldState.colorModeA;
        curTextFont = oldState.curTextFont;
        curTextSize = oldState.curTextSize;
      } else {
        throw "Too many popStyle() without enough pushStyle()";
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Time based functions
    ////////////////////////////////////////////////////////////////////////////

    /**
    * Processing communicates with the clock on your computer.
    * The year() function returns the current year as an integer (2003, 2004, 2005, etc).
    *
    * @returns {float} The current year.
    *
    * @see millis
    * @see second
    * @see minute
    * @see hour
    * @see day
    * @see month
    */
    p.year = function year() {
      return new Date().getFullYear();
    };
    /**
    * Processing communicates with the clock on your computer.
    * The month() function returns the current month as a value from 1 - 12.
    *
    * @returns {float} The current month.
    *
    * @see millis
    * @see second
    * @see minute
    * @see hour
    * @see day
    * @see year
    */
    p.month = function month() {
      return new Date().getMonth() + 1;
    };
    /**
    * Processing communicates with the clock on your computer.
    * The day() function returns the current day as a value from 1 - 31.
    *
    * @returns {float} The current day.
    *
    * @see millis
    * @see second
    * @see minute
    * @see hour
    * @see month
    * @see year
    */
    p.day = function day() {
      return new Date().getDate();
    };
    /**
    * Processing communicates with the clock on your computer.
    * The hour() function returns the current hour as a value from 0 - 23.
    *
    * @returns {float} The current hour.
    *
    * @see millis
    * @see second
    * @see minute
    * @see month
    * @see day
    * @see year
    */
    p.hour = function hour() {
      return new Date().getHours();
    };
    /**
    * Processing communicates with the clock on your computer.
    * The minute() function returns the current minute as a value from 0 - 59.
    *
    * @returns {float} The current minute.
    *
    * @see millis
    * @see second
    * @see month
    * @see hour
    * @see day
    * @see year
    */
    p.minute = function minute() {
      return new Date().getMinutes();
    };
    /**
    * Processing communicates with the clock on your computer.
    * The second() function returns the current second as a value from 0 - 59.
    *
    * @returns {float} The current minute.
    *
    * @see millis
    * @see month
    * @see minute
    * @see hour
    * @see day
    * @see year
    */
    p.second = function second() {
      return new Date().getSeconds();
    };
    /**
    * Returns the number of milliseconds (thousandths of a second) since starting a sketch.
    * This information is often used for timing animation sequences.
    *
    * @returns {long} The number of milliseconds since starting the sketch.
    *
    * @see month
    * @see second
    * @see minute
    * @see hour
    * @see day
    * @see year
    */
    p.millis = function millis() {
      return new Date().getTime() - start;
    };

    /**
    * Executes the code within draw() one time. This functions allows the program to update
    * the display window only when necessary, for example when an event registered by
    * mousePressed() or keyPressed() occurs.
    * In structuring a program, it only makes sense to call redraw() within events such as
    * mousePressed(). This is because redraw() does not run draw() immediately (it only sets
    * a flag that indicates an update is needed).
    * Calling redraw() within draw() has no effect because draw() is continuously called anyway.
    *
    * @returns none
    *
    * @see noLoop
    * @see loop
    */
    p.redraw = function redraw() {
      var sec = (new Date().getTime() - timeSinceLastFPS) / 1000;
      framesSinceLastFPS++;
      var fps = framesSinceLastFPS / sec;

      // recalculate FPS every half second for better accuracy.
      if (sec > 0.5) {
        timeSinceLastFPS = new Date().getTime();
        framesSinceLastFPS = 0;
        p.__frameRate = fps;
      }

      p.frameCount++;

      inDraw = true;

      if (p.use3DContext) {
        // even if the color buffer isn't cleared with background(),
        // the depth buffer needs to be cleared regardless.
        curContext.clear(curContext.DEPTH_BUFFER_BIT);
        curContextCache = { attributes: {}, locations: {} };
        // Delete all the lighting states and the materials the
        // user set in the last draw() call.
        p.noLights();
        p.lightFalloff(1, 0, 0);
        p.shininess(1);
        p.ambient(255, 255, 255);
        p.specular(0, 0, 0);
        p.camera();
        p.draw();
      } else {
        saveContext();
        p.draw();
        restoreContext();
      }

      inDraw = false;
    };

    /**
    * Stops Processing from continuously executing the code within draw(). If loop() is
    * called, the code in draw() begin to run continuously again. If using noLoop() in
    * setup(), it should be the last line inside the block.
    * When noLoop() is used, it's not possible to manipulate or access the screen inside event
    * handling functions such as mousePressed() or keyPressed(). Instead, use those functions
    * to call redraw() or loop(), which will run draw(), which can update the screen properly.
    * This means that when noLoop() has been called, no drawing can happen, and functions like
    * saveFrame() or loadPixels() may not be used.
    * Note that if the sketch is resized, redraw() will be called to update the sketch, even
    * after noLoop() has been specified. Otherwise, the sketch would enter an odd state until
    * loop() was called.
    *
    * @returns none
    *
    * @see redraw
    * @see draw
    * @see loop
    */
    p.noLoop = function noLoop() {
      doLoop = false;
      loopStarted = false;
      clearInterval(looping);
    };

    /**
    * Causes Processing to continuously execute the code within draw(). If noLoop() is called,
    * the code in draw() stops executing.
    *
    * @returns none
    *
    * @see noLoop
    */
    p.loop = function loop() {
      if (loopStarted) {
        return;
      }

      timeSinceLastFPS = new Date().getTime();
      framesSinceLastFPS = 0;

      looping = window.setInterval(function() {
        try {
          p.redraw();
        } catch(e_loop) {
          window.clearInterval(looping);
          throw e_loop;
        }
      }, curMsPerFrame);
      doLoop = true;
      loopStarted = true;
    };

    /**
    * Specifies the number of frames to be displayed every second. If the processor is not
    * fast enough to maintain the specified rate, it will not be achieved. For example, the
    * function call frameRate(30) will attempt to refresh 30 times a second. It is recommended
    * to set the frame rate within setup(). The default rate is 60 frames per second.
    *
    * @param {int} aRate        number of frames per second.
    *
    * @returns none
    *
    * @see delay
    */
    p.frameRate = function frameRate(aRate) {
      curFrameRate = aRate;
      curMsPerFrame = 1000 / curFrameRate;

      // clear and reset interval
      if (doLoop) {
        p.noLoop();
        p.loop();
      }
    };

    var eventHandlers = [];

    /**
    * Quits/stops/exits the program. Programs without a draw() function exit automatically
    * after the last line has run, but programs with draw() run continuously until the
    * program is manually stopped or exit() is run.
    * Rather than terminating immediately, exit() will cause the sketch to exit after draw()
    * has completed (or after setup() completes if called during the setup() method).
    *
    * @returns none
    */
    p.exit = function exit() {
      window.clearInterval(looping);

      removeInstance(p.externals.canvas.id);

      // Step through the libraries to detach them
      for (var lib in Processing.lib) {
        if (Processing.lib.hasOwnProperty(lib)) {
          if (Processing.lib[lib].hasOwnProperty("detach")) {
            Processing.lib[lib].detach(p);
          }
        }
      }

      for (var i=0, ehl=eventHandlers.length; i<ehl; i++) {
        var elem = eventHandlers[i][0],
            type = eventHandlers[i][1],
            fn   = eventHandlers[i][2];

        if (elem.removeEventListener) {
          elem.removeEventListener(type, fn, false);
        } else if (elem.detachEvent) {
          elem.detachEvent("on" + type, fn);
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // MISC functions
    ////////////////////////////////////////////////////////////////////////////

    /**
    * Sets the cursor to a predefined symbol, an image, or turns it on if already hidden.
    * If you are trying to set an image as the cursor, it is recommended to make the size
    * 16x16 or 32x32 pixels. It is not possible to load an image as the cursor if you are
    * exporting your program for the Web. The values for parameters x and y must be less
    * than the dimensions of the image.
    *
    * @param {MODE} MODE either ARROW, CROSS, HAND, MOVE, TEXT, WAIT
    * @param {PImage} image       any variable of type PImage
    * @param {int}    x           the horizonal active spot of the cursor
    * @param {int}    y           the vertical active spot of the cursor
    *
    * @returns none
    *
    * @see noCursor
    */
    p.cursor = function cursor() {
      if (arguments.length > 1 || (arguments.length === 1 && arguments[0] instanceof p.PImage)) {
        var image = arguments[0],
          x, y;
        if (arguments.length >= 3) {
          x = arguments[1];
          y = arguments[2];
          if (x < 0 || y < 0 || y >= image.height || x >= image.width) {
            throw "x and y must be non-negative and less than the dimensions of the image";
          }
        } else {
          x = image.width >>> 1;
          y = image.height >>> 1;
        }

        // see https://developer.mozilla.org/en/Using_URL_values_for_the_cursor_property
        var imageDataURL = image.toDataURL();
        var style = "url(\"" + imageDataURL + "\") " + x + " " + y + ", default";
        curCursor = curElement.style.cursor = style;
      } else if (arguments.length === 1) {
        var mode = arguments[0];
        curCursor = curElement.style.cursor = mode;
      } else {
        curCursor = curElement.style.cursor = oldCursor;
      }
    };

    /**
    * Hides the cursor from view.
    *
    * @returns none
    *
    * @see cursor
    */
    p.noCursor = function noCursor() {
      curCursor = curElement.style.cursor = PConstants.NOCURSOR;
    };

    /**
    * Links to a webpage either in the same window or in a new window. The complete URL
    * must be specified.
    *
    * @param {String} href      complete url as a String in quotes
    * @param {String} target    name of the window to load the URL as a string in quotes
    *
    * @returns none
    */
    p.link = function(href, target) {
      if (target !== undef) {
        window.open(href, target);
      } else {
        window.location = href;
      }
    };

    // PGraphics methods
    // TODO: These functions are suppose to be called before any operations are called on the
    //       PGraphics object. They currently do nothing.
    p.beginDraw = function beginDraw() {};
    p.endDraw = function endDraw() {};

    // Imports an external Processing.js library
    p.Import = function Import(lib) {
      // Replace evil-eval method with a DOM <script> tag insert method that
      // binds new lib code to the Processing.lib names-space and the current
      // p context. -F1LT3R
    };

    var contextMenu = function(e) {
      e.preventDefault();
      e.stopPropagation();
    };

    p.disableContextMenu = function disableContextMenu() {
      curElement.addEventListener('contextmenu', contextMenu, false);
    };

    p.enableContextMenu = function enableContextMenu() {
      curElement.removeEventListener('contextmenu', contextMenu, false);
    };

    /**
    * Displays message in the browser's status area. This is the text area in the lower
    * left corner of the browser. The status() function will only work when the
    * Processing program is running in a web browser.
    *
    * @param {String} text      any valid String
    *
    * @returns none
    */
    p.status = function(text) {
      window.status = text;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Binary Functions
    ////////////////////////////////////////////////////////////////////////////

    function decToBin(value, numBitsInValue) {
      var mask = 1;
      mask = mask << (numBitsInValue - 1);

      var str = "";
      for (var i = 0; i < numBitsInValue; i++) {
        str += (mask & value) ? "1" : "0";
        mask = mask >>> 1;
      }
      return str;
    }

    /*
      This function does not always work when trying to convert
      colors and bytes to binary values because the types passed in
      cannot be determined.
    */
    /**
    * Converts a byte, char, int, or color to a String containing the equivalent binary
    * notation. For example color(0, 102, 153, 255) will convert to the String
    * "11111111000000000110011010011001". This function can help make your geeky debugging
    * sessions much happier.
    *
    * @param {byte|char|int|color} num          byte, char, int, color: value to convert
    * @param {int} numBits                      number of digits to return
    *
    * @returns {String}
    *
    * @see unhex
    * @see hex
    * @see unbinary
    */
    p.binary = function(num, numBits) {
      var numBitsInValue = 32;

      // color, int, byte
      if (typeof num === "number") {
        if(numBits){
          numBitsInValue = numBits;
        }
        return decToBin(num, numBitsInValue);
      }

      // char
      if (num instanceof Char) {
        num = num.toString().charCodeAt(0);
        if (numBits) {
          numBitsInValue = 32;
        } else {
          numBitsInValue = 16;
        }
      }

      var str = decToBin(num, numBitsInValue);

      // trim string if user wanted less chars
      if (numBits) {
        str = str.substr(-numBits);
      }
      return str;
    };

    /**
    * Converts a String representation of a binary number to its equivalent integer value.
    * For example, unbinary("00001000") will return 8.
    *
    * @param {String} binaryString String
    *
    * @returns {Int}
    *
    * @see hex
    * @see binary
    * @see unbinary
    */
    p.unbinary = function unbinary(binaryString) {
      var binaryPattern = new RegExp("^[0|1]{8}$");
      var addUp = 0;
      var i;

      if (binaryString instanceof Array) {
        var values = [];
        for (i = 0; i < binaryString.length; i++) {
          values[i] = p.unbinary(binaryString[i]);
        }
        return values;
      } else {
        if (isNaN(binaryString)) {
          throw "NaN_Err";
        } else {
          if (arguments.length === 1 || binaryString.length === 8) {
            if (binaryPattern.test(binaryString)) {
              for (i = 0; i < 8; i++) {
                addUp += (Math.pow(2, i) * parseInt(binaryString.charAt(7 - i), 10));
              }
              return addUp + "";
            } else {
              throw "notBinary: the value passed into unbinary was not an 8 bit binary number";
            }
          } else {
            throw "longErr";
          }
        }
      }
    };

    function nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group) {
      var sign = (value < 0) ? minus : plus;
      var autoDetectDecimals = rightDigits === 0;
      var rightDigitsOfDefault = (rightDigits === undef || rightDigits < 0) ? 0 : rightDigits;

      var absValue = Math.abs(value);
      if (autoDetectDecimals) {
        rightDigitsOfDefault = 1;
        absValue *= 10;
        while (Math.abs(Math.round(absValue) - absValue) > 1e-6 && rightDigitsOfDefault < 7) {
          ++rightDigitsOfDefault;
          absValue *= 10;
        }
      } else if (rightDigitsOfDefault !== 0) {
        absValue *= Math.pow(10, rightDigitsOfDefault);
      }

      // Using Java's default rounding policy HALF_EVEN. This policy is based
      // on the idea that 0.5 values round to the nearest even number, and
      // everything else is rounded normally.
      var number, doubled = absValue * 2;
      if (Math.floor(absValue) === absValue) {
        number = absValue;
      } else if (Math.floor(doubled) === doubled) {
        var floored = Math.floor(absValue);
        number = floored + (floored % 2);
      } else {
        number = Math.round(absValue);
      }

      var buffer = "";
      var totalDigits = leftDigits + rightDigitsOfDefault;
      while (totalDigits > 0 || number > 0) {
        totalDigits--;
        buffer = "" + (number % 10) + buffer;
        number = Math.floor(number / 10);
      }
      if (group !== undef) {
        var i = buffer.length - 3 - rightDigitsOfDefault;
        while(i > 0) {
          buffer = buffer.substring(0,i) + group + buffer.substring(i);
          i-=3;
        }
      }
      if (rightDigitsOfDefault > 0) {
        return sign + buffer.substring(0, buffer.length - rightDigitsOfDefault) +
               "." + buffer.substring(buffer.length - rightDigitsOfDefault, buffer.length);
      } else {
         return sign + buffer;
      }
    }

    function nfCore(value, plus, minus, leftDigits, rightDigits, group) {
      if (value instanceof Array) {
        var arr = [];
        for (var i = 0, len = value.length; i < len; i++) {
          arr.push(nfCoreScalar(value[i], plus, minus, leftDigits, rightDigits, group));
        }
        return arr;
      } else {
        return nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group);
      }
    }

    /**
    * Utility function for formatting numbers into strings. There are two versions, one for
    * formatting floats and one for formatting ints. The values for the digits, left, and
    * right parameters should always be positive integers.
    * As shown in the above example, nf() is used to add zeros to the left and/or right
    * of a number. This is typically for aligning a list of numbers. To remove digits from
    * a floating-point number, use the int(), ceil(), floor(), or round() functions.
    *
    * @param {int|int[]|float|float[]} value   the number(s) to format
    * @param {int} left                        number of digits to the left of the decimal point
    * @param {int} right                       number of digits to the right of the decimal point
    *
    * @returns {String or String[]}
    *
    * @see nfs
    * @see nfp
    * @see nfc
    */
    p.nf  = function(value, leftDigits, rightDigits) { return nfCore(value, "", "-", leftDigits, rightDigits); };

    /**
    * Utility function for formatting numbers into strings. Similar to nf()  but leaves a blank space in front
    * of positive numbers so they align with negative numbers in spite of the minus symbol. There are two
    * versions, one for formatting floats and one for formatting ints. The values for the digits, left,
    * and right parameters should always be positive integers.
    *
    * @param {int|int[]|float|float[]} value   the number(s) to format
    * @param {int} left                        number of digits to the left of the decimal point
    * @param {int} right                       number of digits to the right of the decimal point
    *
    * @returns {String or String[]}
    *
    * @see nf
    * @see nfp
    * @see nfc
    */
    p.nfs = function(value, leftDigits, rightDigits) { return nfCore(value, " ", "-", leftDigits, rightDigits); };

    /**
    * Utility function for formatting numbers into strings. Similar to nf()  but puts a "+" in front of
    * positive numbers and a "-" in front of negative numbers. There are two versions, one for formatting
    * floats and one for formatting ints. The values for the digits, left, and right parameters should
    * always be positive integers.
    *
    * @param {int|int[]|float|float[]} value   the number(s) to format
    * @param {int} left                        number of digits to the left of the decimal point
    * @param {int} right                       number of digits to the right of the decimal point
    *
    * @returns {String or String[]}
    *
    * @see nfs
    * @see nf
    * @see nfc
    */
    p.nfp = function(value, leftDigits, rightDigits) { return nfCore(value, "+", "-", leftDigits, rightDigits); };

    /**
    * Utility function for formatting numbers into strings and placing appropriate commas to mark
    * units of 1000. There are two versions, one for formatting ints and one for formatting an array
    * of ints. The value for the digits parameter should always be a positive integer.
    *
    * @param {int|int[]|float|float[]} value   the number(s) to format
    * @param {int} left                        number of digits to the left of the decimal point
    * @param {int} right                       number of digits to the right of the decimal point
    *
    * @returns {String or String[]}
    *
    * @see nf
    * @see nfs
    * @see nfp
    */
    p.nfc = function(value, leftDigits, rightDigits) { return nfCore(value, "", "-", leftDigits, rightDigits, ","); };

    var decimalToHex = function decimalToHex(d, padding) {
      //if there is no padding value added, default padding to 8 else go into while statement.
      padding = (padding === undef || padding === null) ? padding = 8 : padding;
      if (d < 0) {
        d = 0xFFFFFFFF + d + 1;
      }
      var hex = Number(d).toString(16).toUpperCase();
      while (hex.length < padding) {
        hex = "0" + hex;
      }
      if (hex.length >= padding) {
        hex = hex.substring(hex.length - padding, hex.length);
      }
      return hex;
    };

    // note: since we cannot keep track of byte, int types by default the returned string is 8 chars long
    // if no 2nd argument is passed.  closest compromise we can use to match java implementation Feb 5 2010
    // also the char parser has issues with chars that are not digits or letters IE: !@#$%^&*
    /**
    * Converts a byte, char, int, or color to a String containing the equivalent hexadecimal notation.
    * For example color(0, 102, 153, 255) will convert to the String "FF006699". This function can help
    * make your geeky debugging sessions much happier.
    *
    * @param {byte|char|int|Color} value   the value to turn into a hex string
    * @param {int} digits                 the number of digits to return
    *
    * @returns {String}
    *
    * @see unhex
    * @see binary
    * @see unbinary
    */
    p.hex = function hex(value, len) {
      if (arguments.length === 1) {
        if (value instanceof Char) {
          len = 4;
        } else { // int or byte, indistinguishable at the moment, default to 8
          len = 8;
        }
      }
      return decimalToHex(value, len);
    };

    function unhexScalar(hex) {
      var value = parseInt("0x" + hex, 16);

      // correct for int overflow java expectation
      if (value > 2147483647) {
        value -= 4294967296;
      }
      return value;
    }

    /**
    * Converts a String representation of a hexadecimal number to its equivalent integer value.
    *
    * @param {String} hex   the hex string to convert to an int
    *
    * @returns {int}
    *
    * @see hex
    * @see binary
    * @see unbinary
    */
    p.unhex = function(hex) {
      if (hex instanceof Array) {
        var arr = [];
        for (var i = 0; i < hex.length; i++) {
          arr.push(unhexScalar(hex[i]));
        }
        return arr;
      } else {
        return unhexScalar(hex);
      }
    };

    // Load a file or URL into strings
    /**
    * Reads the contents of a file or url and creates a String array of its individual lines.
    * The filename parameter can also be a URL to a file found online.  If the file is not available or an error occurs,
    * null will be returned and an error message will be printed to the console. The error message does not halt
    * the program.
    *
    * @param {String} filename    name of the file or url to load
    *
    * @returns {String[]}
    *
    * @see loadBytes
    * @see saveStrings
    * @see saveBytes
    */
    p.loadStrings = function loadStrings(filename) {
      if (localStorage[filename]) {
        return localStorage[filename].split("\n");
      }

      var filecontent = ajax(filename);
      if(typeof filecontent !== "string" || filecontent === "") {
        return [];
      }

      // deal with the fact that Windows uses \r\n, Unix uses \n,
      // Mac uses \r, and we actually expect \n
      filecontent = filecontent.replace(/(\r\n?)/g,"\n").replace(/\n$/,"");

      return filecontent.split("\n");
    };

    // Writes an array of strings to a file, one line per string
    /**
    * Writes an array of strings to a file, one line per string. This file is saved to the localStorage.
    *
    * @param {String} filename    name of the file to save to localStorage
    * @param {String[]} strings   string array to be written
    *
    * @see loadBytes
    * @see loadStrings
    * @see saveBytes
    */
    p.saveStrings = function saveStrings(filename, strings) {
      localStorage[filename] = strings.join('\n');
    };

    /**
    * Reads the contents of a file or url and places it in a byte array. If a file is specified, it must be located in the localStorage.
    * The filename parameter can also be a URL to a file found online.
    *
    * @param {String} filename   name of a file in the localStorage or a URL.
    *
    * @returns {byte[]}
    *
    * @see loadStrings
    * @see saveStrings
    * @see saveBytes
    */
    p.loadBytes = function loadBytes(url, strings) {
      var string = ajax(url);
      var ret = [];

      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }

      return ret;
    };

    /**
     * Removes the first argument from the arguments set -- shifts.
     *
     * @param {Arguments} args  The Arguments object.
     *
     * @return {Object[]}       Returns an array of arguments except first one.
     *
     * @see #match
     */
    function removeFirstArgument(args) {
      return Array.prototype.slice.call(args, 1);
    }

    ////////////////////////////////////////////////////////////////////////////
    // String Functions
    ////////////////////////////////////////////////////////////////////////////
    /**
     * The matchAll() function is identical to match(), except that it returns an array of all matches in
     * the specified String, rather than just the first.
     *
     * @param {String} aString  the String to search inside
     * @param {String} aRegExp  the regexp to be used for matching
     *
     * @return {String[]} returns an array of matches
     *
     * @see #match
     */
    p.matchAll = function matchAll(aString, aRegExp) {
      var results = [],
          latest;
      var regexp = new RegExp(aRegExp, "g");
      while ((latest = regexp.exec(aString)) !== null) {
        results.push(latest);
        if (latest[0].length === 0) {
          ++regexp.lastIndex;
        }
      }
      return results.length > 0 ? results : null;
    };
    /**
     * The __replaceAll() function searches all matches between a substring (or regular expression) and a string,
     * and replaces the matched substring with a new substring
     *
     * @param {String} subject    a substring
     * @param {String} regex      a substring or a regular expression
     * @param {String} replace    the string to replace the found value
     *
     * @return {String} returns result
     *
     * @see #match
     */
    p.__replaceAll = function(subject, regex, replacement) {
      if (typeof subject !== "string") {
        return subject.replaceAll.apply(subject, removeFirstArgument(arguments));
      }

      return subject.replace(new RegExp(regex, "g"), replacement);
    };
    /**
     * The __replaceFirst() function searches first matche between a substring (or regular expression) and a string,
     * and replaces the matched substring with a new substring
     *
     * @param {String} subject    a substring
     * @param {String} regex      a substring or a regular expression
     * @param {String} replace    the string to replace the found value
     *
     * @return {String} returns result
     *
     * @see #match
     */
    p.__replaceFirst = function(subject, regex, replacement) {
      if (typeof subject !== "string") {
        return subject.replaceFirst.apply(subject, removeFirstArgument(arguments));
      }

      return subject.replace(new RegExp(regex, ""), replacement);
    };
    /**
     * The __replace() function searches all matches between a substring and a string,
     * and replaces the matched substring with a new substring
     *
     * @param {String} subject         a substring
     * @param {String} what         a substring to find
     * @param {String} replacement    the string to replace the found value
     *
     * @return {String} returns result
     */
    p.__replace = function(subject, what, replacement) {
      if (typeof subject !== "string") {
        return subject.replace.apply(subject, removeFirstArgument(arguments));
      }
      if (what instanceof RegExp) {
        return subject.replace(what, replacement);
      }

      if (typeof what !== "string") {
        what = what.toString();
      }
      if (what === "") {
        return subject;
      }

      var i = subject.indexOf(what);
      if (i < 0) {
        return subject;
      }

      var j = 0, result = "";
      do {
        result += subject.substring(j, i) + replacement;
        j = i + what.length;
      } while ( (i = subject.indexOf(what, j)) >= 0);
      return result + subject.substring(j);
    };
    /**
     * The __equals() function compares two strings (or objects) to see if they are the same.
     * This method is necessary because it's not possible to compare strings using the equality operator (==).
     * Returns true if the strings are the same and false if they are not.
     *
     * @param {String} subject  a string used for comparison
     * @param {String} other  a string used for comparison with
     *
     * @return {boolean} true is the strings are the same false otherwise
     */
    p.__equals = function(subject, other) {
      if (subject.equals instanceof Function) {
        return subject.equals.apply(subject, removeFirstArgument(arguments));
      }

      // TODO use virtEquals for HashMap here
      return subject.valueOf() === other.valueOf();
    };
    /**
     * The __toCharArray() function splits the string into a char array.
     *
     * @param {String} subject The string
     *
     * @return {Char[]} a char array
     */
    p.__toCharArray = function(subject) {
      if (typeof subject !== "string") {
        return subject.toCharArray.apply(subject, removeFirstArgument(arguments));
      }

      var chars = [];
      for (var i = 0, len = subject.length; i < len; ++i) {
        chars[i] = new Char(subject.charAt(i));
      }
      return chars;
    };
    /**
     * The match() function matches a string with a regular expression, and returns the match as an
     * array. The first index is the matching expression, and array elements
     * [1] and higher represent each of the groups (sequences found in parens).
     *
     * @param {String} str      the String to be searched
     * @param {String} regexp   the regexp to be used for matching
     *
     * @return {String[]} an array of matching strings
     */
    p.match = function(str, regexp) {
      return str.match(regexp);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Other java specific functions
    ////////////////////////////////////////////////////////////////////////////

    /**
     * The returns hash code of the.
     *
     * @param {Object} subject The string
     *
     * @return {int} a hash code
     */
    p.__hashCode = function(subject) {
      if (subject.hashCode instanceof Function) {
        return subject.hashCode.apply(subject, removeFirstArgument(arguments));
      }

      // TODO use virtHashCode for HashMap here
      return 0 | subject;
    };
    /**
     * The __printStackTrace() prints stack trace to the console.
     *
     * @param {Exception} subject The error
     */
    p.__printStackTrace = function(subject) {
      p.println("Exception: " + subject.toString() );
    };

    var logBuffer = [];

    p.console = window.console || Processing.logger;
    /**
     * The println() function writes to the console area of the Processing environment.
     * Each call to this function creates a new line of output. Individual elements can be separated with quotes ("") and joined with the string concatenation operator (+).
     *
     * @param {String} message the string to write to the console
     *
     * @see #join
     * @see #print
     */
    p.println = function println(message) {
      var bufferLen = logBuffer.length;
      if (bufferLen) {
        Processing.logger.log(logBuffer.join(""));
        logBuffer.length = 0; // clear log buffer
      }

      if (arguments.length === 0 && bufferLen === 0) {
        Processing.logger.log("");
      } else if (arguments.length !== 0) {
        Processing.logger.log(message);
      }
    };
    /**
     * The print() function writes to the console area of the Processing environment.
     *
     * @param {String} message the string to write to the console
     *
     * @see #join
     */
    p.print = function print(message) {
      logBuffer.push(message);
    };

    // Alphanumeric chars arguments automatically converted to numbers when
    // passed in, and will come out as numbers.
    p.str = function str(val) {
      if (val instanceof Array) {
        var arr = [];
        for (var i = 0; i < val.length; i++) {
          arr.push(val[i].toString() + "");
        }
        return arr;
      } else {
        return (val.toString() + "");
      }
    };
    /**
     * Remove whitespace characters from the beginning and ending
     * of a String or a String array. Works like String.trim() but includes the
     * unicode nbsp character as well. If an array is passed in the function will return a new array not effecting the array passed in.
     *
     * @param {String} str    the string to trim
     * @param {String[]} str  the string array to trim
     *
     * @return {String|String[]} retrurns a string or an array will removed whitespaces
     */
    p.trim = function(str) {
      if (str instanceof Array) {
        var arr = [];
        for (var i = 0; i < str.length; i++) {
          arr.push(str[i].replace(/^\s*/, '').replace(/\s*$/, '').replace(/\r*$/, ''));
        }
        return arr;
      } else {
        return str.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\r*$/, '');
      }
    };

    // Conversion
    function booleanScalar(val) {
      if (typeof val === 'number') {
        return val !== 0;
      } else if (typeof val === 'boolean') {
        return val;
      } else if (typeof val === 'string') {
        return val.toLowerCase() === 'true';
      } else if (val instanceof Char) {
        // 1, T or t
        return val.code === 49 || val.code === 84 || val.code === 116;
      }
    }

    /**
     * Converts the passed parameter to the function to its boolean value.
     * It will return an array of booleans if an array is passed in.
     *
     * @param {int, byte, string} what          the parameter to be converted to boolean
     * @param {int[], byte[], string[]} what    the array to be converted to boolean
     *
     * @return {boolean|boolean[]} retrurns a boolean or an array of booleans
     */
    p.parseBoolean = function (what) {
        return p['boolean'](what);
    };

    p['boolean'] = function(val) {
      if (val instanceof Array) {
        var ret = [];
        for (var i = 0; i < val.length; i++) {
          ret.push(booleanScalar(val[i]));
        }
        return ret;
      } else {
        return booleanScalar(val);
      }
    };

    // a byte is a number between -128 and 127
    p['byte'] = function(aNumber) {
      if (aNumber instanceof Array) {
        var bytes = [];
        for (var i = 0; i < aNumber.length; i++) {
          bytes.push((0 - (aNumber[i] & 0x80)) | (aNumber[i] & 0x7F));
        }
        return bytes;
      } else {
        return (0 - (aNumber & 0x80)) | (aNumber & 0x7F);
      }
    };

    p['char'] = function(key) {
      if (typeof key === "number") {
        return new Char(String.fromCharCode(key & 0xFFFF));
      } else if (key instanceof Array) {
        var ret = [];
        for (var i = 0; i < key.length; i++) {
          ret.push(new Char(String.fromCharCode(key[i] & 0xFFFF)));
        }
        return ret;
      } else {
        throw "char() may receive only one argument of type int, byte, int[], or byte[].";
      }
    };

    // Processing doc claims good argument types are: int, char, byte, boolean,
    // String, int[], char[], byte[], boolean[], String[].
    // floats should not work. However, floats with only zeroes right of the
    // decimal will work because JS converts those to int.
    function floatScalar(val) {
      if (typeof val === 'number') {
        return val;
      } else if (typeof val === 'boolean') {
        return val ? 1 : 0;
      } else if (typeof val === 'string') {
        return parseFloat(val);
      } else if (val instanceof Char) {
        return val.code;
      }
    }

    p['float'] = function(val) {
      if (val instanceof Array) {
        var ret = [];
        for (var i = 0; i < val.length; i++) {
          ret.push(floatScalar(val[i]));
        }
        return ret;
      } else {
        return floatScalar(val);
      }
    };

    function intScalar(val) {
      if (typeof val === 'number') {
        return val & 0xFFFFFFFF;
      } else if (typeof val === 'boolean') {
        return val ? 1 : 0;
      } else if (typeof val === 'string') {
        var number = parseInt(val, 10); // Force decimal radix. Don't convert hex or octal (just like p5)
        return number & 0xFFFFFFFF;
      } else if (val instanceof Char) {
        return val.code;
      }
    }

    p['int'] = function(val) {
      if (val instanceof Array) {
        var ret = [];
        for (var i = 0; i < val.length; i++) {
          if (typeof val[i] === 'string' && !/^\s*[+\-]?\d+\s*$/.test(val[i])) {
            ret.push(0);
          } else {
            ret.push(intScalar(val[i]));
          }
        }
        return ret;
      } else {
        return intScalar(val);
      }
    };

    p.__int_cast = function(val) {
      return 0|val;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Math functions
    ////////////////////////////////////////////////////////////////////////////

    // Calculation
    /**
    * Calculates the absolute value (magnitude) of a number. The absolute value of a number is always positive.
    *
    * @param {int|float} value   int or float
    *
    * @returns {int|float}
    */
    p.abs = Math.abs;

    /**
    * Calculates the closest int value that is greater than or equal to the value of the parameter.
    * For example, ceil(9.03) returns the value 10.
    *
    * @param {float} value   float
    *
    * @returns {int}
    *
    * @see floor
    * @see round
    */
    p.ceil = Math.ceil;

    /**
    * Constrains a value to not exceed a maximum and minimum value.
    *
    * @param {int|float} value   the value to constrain
    * @param {int|float} value   minimum limit
    * @param {int|float} value   maximum limit
    *
    * @returns {int|float}
    *
    * @see max
    * @see min
    */
    p.constrain = function(aNumber, aMin, aMax) {
      return aNumber > aMax ? aMax : aNumber < aMin ? aMin : aNumber;
    };

    /**
    * Calculates the distance between two points.
    *
    * @param {int|float} x1     int or float: x-coordinate of the first point
    * @param {int|float} y1     int or float: y-coordinate of the first point
    * @param {int|float} z1     int or float: z-coordinate of the first point
    * @param {int|float} x2     int or float: x-coordinate of the second point
    * @param {int|float} y2     int or float: y-coordinate of the second point
    * @param {int|float} z2     int or float: z-coordinate of the second point
    *
    * @returns {float}
    */
    p.dist = function() {
      var dx, dy, dz;
      if (arguments.length === 4) {
        dx = arguments[0] - arguments[2];
        dy = arguments[1] - arguments[3];
        return Math.sqrt(dx * dx + dy * dy);
      } else if (arguments.length === 6) {
        dx = arguments[0] - arguments[3];
        dy = arguments[1] - arguments[4];
        dz = arguments[2] - arguments[5];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
      }
    };

    /**
    * Returns Euler's number e (2.71828...) raised to the power of the value parameter.
    *
    * @param {int|float} value   int or float: the exponent to raise e to
    *
    * @returns {float}
    */
    p.exp = Math.exp;

    /**
    * Calculates the closest int value that is less than or equal to the value of the parameter.
    *
    * @param {int|float} value        the value to floor
    *
    * @returns {int|float}
    *
    * @see ceil
    * @see round
    */
    p.floor = Math.floor;

    /**
    * Calculates a number between two numbers at a specific increment. The amt  parameter is the
    * amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very
    * near the first point, 0.5 is half-way in between, etc. The lerp function is convenient for
    * creating motion along a straight path and for drawing dotted lines.
    *
    * @param {int|float} value1       float or int: first value
    * @param {int|float} value2       float or int: second value
    * @param {int|float} amt          float: between 0.0 and 1.0
    *
    * @returns {float}
    *
    * @see curvePoint
    * @see bezierPoint
    */
    p.lerp = function(value1, value2, amt) {
      return ((value2 - value1) * amt) + value1;
    };

    /**
    * Calculates the natural logarithm (the base-e logarithm) of a number. This function
    * expects the values greater than 0.0.
    *
    * @param {int|float} value        int or float: number must be greater then 0.0
    *
    * @returns {float}
    */
    p.log = Math.log;

    /**
    * Calculates the magnitude (or length) of a vector. A vector is a direction in space commonly
    * used in computer graphics and linear algebra. Because it has no "start" position, the magnitude
    * of a vector can be thought of as the distance from coordinate (0,0) to its (x,y) value.
    * Therefore, mag() is a shortcut for writing "dist(0, 0, x, y)".
    *
    * @param {int|float} a       float or int: first value
    * @param {int|float} b       float or int: second value
    * @param {int|float} c       float or int: third value
    *
    * @returns {float}
    *
    * @see dist
    */
    p.mag = function(a, b, c) {
      if (arguments.length === 2) {
        return Math.sqrt(a * a + b * b);
      } else if (arguments.length === 3) {
        return Math.sqrt(a * a + b * b + c * c);
      }
    };

    /**
    * Re-maps a number from one range to another. In the example above, the number '25' is converted from
    * a value in the range 0..100 into a value that ranges from the left edge (0) to the right edge (width) of the screen.
    * Numbers outside the range are not clamped to 0 and 1, because out-of-range values are often intentional and useful.
    *
    * @param {float} value        The incoming value to be converted
    * @param {float} istart       Lower bound of the value's current range
    * @param {float} istop        Upper bound of the value's current range
    * @param {float} ostart       Lower bound of the value's target range
    * @param {float} ostop        Upper bound of the value's target range
    *
    * @returns {float}
    *
    * @see norm
    * @see lerp
    */
    p.map = function(value, istart, istop, ostart, ostop) {
      return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    };

    /**
    * Determines the largest value in a sequence of numbers.
    *
    * @param {int|float} value1         int or float
    * @param {int|float} value2         int or float
    * @param {int|float} value3         int or float
    * @param {int|float} array          int or float array
    *
    * @returns {int|float}
    *
    * @see min
    */
    p.max = function() {
      if (arguments.length === 2) {
        return arguments[0] < arguments[1] ? arguments[1] : arguments[0];
      } else {
        var numbers = arguments.length === 1 ? arguments[0] : arguments; // if single argument, array is used
        if (! ("length" in numbers && numbers.length > 0)) {
          throw "Non-empty array is expected";
        }
        var max = numbers[0],
          count = numbers.length;
        for (var i = 1; i < count; ++i) {
          if (max < numbers[i]) {
            max = numbers[i];
          }
        }
        return max;
      }
    };

    /**
    * Determines the smallest value in a sequence of numbers.
    *
    * @param {int|float} value1         int or float
    * @param {int|float} value2         int or float
    * @param {int|float} value3         int or float
    * @param {int|float} array          int or float array
    *
    * @returns {int|float}
    *
    * @see max
    */
    p.min = function() {
      if (arguments.length === 2) {
        return arguments[0] < arguments[1] ? arguments[0] : arguments[1];
      } else {
        var numbers = arguments.length === 1 ? arguments[0] : arguments; // if single argument, array is used
        if (! ("length" in numbers && numbers.length > 0)) {
          throw "Non-empty array is expected";
        }
        var min = numbers[0],
          count = numbers.length;
        for (var i = 1; i < count; ++i) {
          if (min > numbers[i]) {
            min = numbers[i];
          }
        }
        return min;
      }
    };

    /**
    * Normalizes a number from another range into a value between 0 and 1.
    * Identical to map(value, low, high, 0, 1);
    * Numbers outside the range are not clamped to 0 and 1, because out-of-range
    * values are often intentional and useful.
    *
    * @param {float} aNumber    The incoming value to be converted
    * @param {float} low        Lower bound of the value's current range
    * @param {float} high       Upper bound of the value's current range
    *
    * @returns {float}
    *
    * @see map
    * @see lerp
    */
    p.norm = function(aNumber, low, high) {
      return (aNumber - low) / (high - low);
    };

    /**
    * Facilitates exponential expressions. The pow() function is an efficient way of
    * multiplying numbers by themselves (or their reciprocal) in large quantities.
    * For example, pow(3, 5) is equivalent to the expression 3*3*3*3*3 and pow(3, -5)
    * is equivalent to 1 / 3*3*3*3*3.
    *
    * @param {int|float} num        base of the exponential expression
    * @param {int|float} exponent   power of which to raise the base
    *
    * @returns {float}
    *
    * @see sqrt
    */
    p.pow = Math.pow;

    /**
    * Calculates the integer closest to the value parameter. For example, round(9.2) returns the value 9.
    *
    * @param {float} value        number to round
    *
    * @returns {int}
    *
    * @see floor
    * @see ceil
    */
    p.round = Math.round;

    /**
    * Squares a number (multiplies a number by itself). The result is always a positive number,
    * as multiplying two negative numbers always yields a positive result. For example, -1 * -1 = 1.
    *
    * @param {float} value        int or float
    *
    * @returns {float}
    *
    * @see sqrt
    */
    p.sq = function(aNumber) {
      return aNumber * aNumber;
    };

    /**
    * Calculates the square root of a number. The square root of a number is always positive,
    * even though there may be a valid negative root. The square root s of number a is such
    * that s*s = a. It is the opposite of squaring.
    *
    * @param {float} value        int or float, non negative
    *
    * @returns {float}
    *
    * @see pow
    * @see sq
    */
    p.sqrt = Math.sqrt;

    // Trigonometry
    /**
    * The inverse of cos(), returns the arc cosine of a value. This function expects the
    * values in the range of -1 to 1 and values are returned in the range 0 to PI (3.1415927).
    *
    * @param {float} value        the value whose arc cosine is to be returned
    *
    * @returns {float}
    *
    * @see cos
    * @see asin
    * @see atan
    */
    p.acos = Math.acos;

    /**
    * The inverse of sin(), returns the arc sine of a value. This function expects the values
    * in the range of -1 to 1 and values are returned in the range -PI/2 to PI/2.
    *
    * @param {float} value        the value whose arc sine is to be returned
    *
    * @returns {float}
    *
    * @see sin
    * @see acos
    * @see atan
    */
    p.asin = Math.asin;

    /**
    * The inverse of tan(), returns the arc tangent of a value. This function expects the values
    * in the range of -Infinity to Infinity (exclusive) and values are returned in the range -PI/2 to PI/2 .
    *
    * @param {float} value        -Infinity to Infinity (exclusive)
    *
    * @returns {float}
    *
    * @see tan
    * @see asin
    * @see acos
    */
    p.atan = Math.atan;

    /**
    * Calculates the angle (in radians) from a specified point to the coordinate origin as measured from
    * the positive x-axis. Values are returned as a float in the range from PI to -PI. The atan2() function
    * is most often used for orienting geometry to the position of the cursor. Note: The y-coordinate of the
    * point is the first parameter and the x-coordinate is the second due the the structure of calculating the tangent.
    *
    * @param {float} y        y-coordinate of the point
    * @param {float} x        x-coordinate of the point
    *
    * @returns {float}
    *
    * @see tan
    */
    p.atan2 = Math.atan2;

    /**
    * Calculates the cosine of an angle. This function expects the values of the angle parameter to be provided
    * in radians (values from 0 to PI*2). Values are returned in the range -1 to 1.
    *
    * @param {float} value        an angle in radians
    *
    * @returns {float}
    *
    * @see tan
    * @see sin
    */
    p.cos = Math.cos;

    /**
    * Converts a radian measurement to its corresponding value in degrees. Radians and degrees are two ways of
    * measuring the same thing. There are 360 degrees in a circle and 2*PI radians in a circle. For example,
    * 90 degrees = PI/2 = 1.5707964. All trigonometric methods in Processing require their parameters to be specified in radians.
    *
    * @param {int|float} value        an angle in radians
    *
    * @returns {float}
    *
    * @see radians
    */
    p.degrees = function(aAngle) {
      return (aAngle * 180) / Math.PI;
    };

    /**
    * Converts a degree measurement to its corresponding value in radians. Radians and degrees are two ways of
    * measuring the same thing. There are 360 degrees in a circle and 2*PI radians in a circle. For example,
    * 90 degrees = PI/2 = 1.5707964. All trigonometric methods in Processing require their parameters to be specified in radians.
    *
    * @param {int|float} value        an angle in radians
    *
    * @returns {float}
    *
    * @see degrees
    */
    p.radians = function(aAngle) {
      return (aAngle / 180) * Math.PI;
    };

    /**
    * Calculates the sine of an angle. This function expects the values of the angle parameter to be provided in
    * radians (values from 0 to 6.28). Values are returned in the range -1 to 1.
    *
    * @param {float} value        an angle in radians
    *
    * @returns {float}
    *
    * @see cos
    * @see radians
    */
    p.sin = Math.sin;

    /**
    * Calculates the ratio of the sine and cosine of an angle. This function expects the values of the angle
    * parameter to be provided in radians (values from 0 to PI*2). Values are returned in the range infinity to -infinity.
    *
    * @param {float} value        an angle in radians
    *
    * @returns {float}
    *
    * @see cos
    * @see sin
    * @see radians
    */
    p.tan = Math.tan;

    var currentRandom = Math.random;

    /**
    * Generates random numbers. Each time the random() function is called, it returns an unexpected value within
    * the specified range. If one parameter is passed to the function it will return a float between zero and the
    * value of the high parameter. The function call random(5) returns values between 0 and 5 (starting at zero,
    * up to but not including 5). If two parameters are passed, it will return a float with a value between the
    * parameters. The function call random(-5, 10.2) returns values starting at -5 up to (but not including) 10.2.
    * To convert a floating-point random number to an integer, use the int() function.
    *
    * @param {int|float} value1         if one parameter is used, the top end to random from, if two params the low end
    * @param {int|float} value2         the top end of the random range
    *
    * @returns {float}
    *
    * @see randomSeed
    * @see noise
    */
    p.random = function random() {
      if(arguments.length === 0) {
        return currentRandom();
      } else if(arguments.length === 1) {
        return currentRandom() * arguments[0];
      } else {
        var aMin = arguments[0], aMax = arguments[1];
        return currentRandom() * (aMax - aMin) + aMin;
      }
    };

    // Pseudo-random generator
    function Marsaglia(i1, i2) {
      // from http://www.math.uni-bielefeld.de/~sillke/ALGORITHMS/random/marsaglia-c
      var z=i1 || 362436069, w= i2 || 521288629;
      var nextInt = function() {
        z=(36969*(z&65535)+(z>>>16)) & 0xFFFFFFFF;
        w=(18000*(w&65535)+(w>>>16)) & 0xFFFFFFFF;
        return (((z&0xFFFF)<<16) | (w&0xFFFF)) & 0xFFFFFFFF;
      };

      this.nextDouble = function() {
        var i = nextInt() / 4294967296;
        return i < 0 ? 1 + i : i;
      };
      this.nextInt = nextInt;
    }
    Marsaglia.createRandomized = function() {
      var now = new Date();
      return new Marsaglia((now / 60000) & 0xFFFFFFFF, now & 0xFFFFFFFF);
    };

    /**
    * Sets the seed value for random(). By default, random() produces different results each time the
    * program is run. Set the value parameter to a constant to return the same pseudo-random numbers
    * each time the software is run.
    *
    * @param {int|float} seed         int
    *
    * @see random
    * @see noise
    * @see noiseSeed
    */
    p.randomSeed = function(seed) {
      currentRandom = (new Marsaglia(seed)).nextDouble;
    };

    // Random
    // We have two random()'s in the code... what does this do ? and which one is current ?
    p.Random = function(seed) {
      var haveNextNextGaussian = false, nextNextGaussian, random;

      this.nextGaussian = function() {
        if (haveNextNextGaussian) {
          haveNextNextGaussian = false;
          return nextNextGaussian;
        } else {
          var v1, v2, s;
          do {
            v1 = 2 * random() - 1; // between -1.0 and 1.0
            v2 = 2 * random() - 1; // between -1.0 and 1.0
            s = v1 * v1 + v2 * v2;
          }
          while (s >= 1 || s === 0);

          var multiplier = Math.sqrt(-2 * Math.log(s) / s);
          nextNextGaussian = v2 * multiplier;
          haveNextNextGaussian = true;

          return v1 * multiplier;
        }
      };

      // by default use standard random, otherwise seeded
      random = (seed === undef) ? Math.random : (new Marsaglia(seed)).nextDouble;
    };

    // Noise functions and helpers
    function PerlinNoise(seed) {
      var rnd = seed !== undef ? new Marsaglia(seed) : Marsaglia.createRandomized();
      var i, j;
      // http://www.noisemachine.com/talk1/17b.html
      // http://mrl.nyu.edu/~perlin/noise/
      // generate permutation
      var perm = new Uint8Array(512);
      for(i=0;i<256;++i) { perm[i] = i; }
      for(i=0;i<256;++i) { var t = perm[j = rnd.nextInt() & 0xFF]; perm[j] = perm[i]; perm[i] = t; }
      // copy to avoid taking mod in perm[0];
      for(i=0;i<256;++i) { perm[i + 256] = perm[i]; }

      function grad3d(i,x,y,z) {
        var h = i & 15; // convert into 12 gradient directions
        var u = h<8 ? x : y,
            v = h<4 ? y : h===12||h===14 ? x : z;
        return ((h&1) === 0 ? u : -u) + ((h&2) === 0 ? v : -v);
      }

      function grad2d(i,x,y) {
        var v = (i & 1) === 0 ? x : y;
        return (i&2) === 0 ? -v : v;
      }

      function grad1d(i,x) {
        return (i&1) === 0 ? -x : x;
      }

      function lerp(t,a,b) { return a + t * (b - a); }

      this.noise3d = function(x, y, z) {
        var X = Math.floor(x)&255, Y = Math.floor(y)&255, Z = Math.floor(z)&255;
        x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
        var fx = (3-2*x)*x*x, fy = (3-2*y)*y*y, fz = (3-2*z)*z*z;
        var p0 = perm[X]+Y, p00 = perm[p0] + Z, p01 = perm[p0 + 1] + Z,
            p1 = perm[X + 1] + Y, p10 = perm[p1] + Z, p11 = perm[p1 + 1] + Z;
        return lerp(fz,
          lerp(fy, lerp(fx, grad3d(perm[p00], x, y, z), grad3d(perm[p10], x-1, y, z)),
                   lerp(fx, grad3d(perm[p01], x, y-1, z), grad3d(perm[p11], x-1, y-1,z))),
          lerp(fy, lerp(fx, grad3d(perm[p00 + 1], x, y, z-1), grad3d(perm[p10 + 1], x-1, y, z-1)),
                   lerp(fx, grad3d(perm[p01 + 1], x, y-1, z-1), grad3d(perm[p11 + 1], x-1, y-1,z-1))));
      };

      this.noise2d = function(x, y) {
        var X = Math.floor(x)&255, Y = Math.floor(y)&255;
        x -= Math.floor(x); y -= Math.floor(y);
        var fx = (3-2*x)*x*x, fy = (3-2*y)*y*y;
        var p0 = perm[X]+Y, p1 = perm[X + 1] + Y;
        return lerp(fy,
          lerp(fx, grad2d(perm[p0], x, y), grad2d(perm[p1], x-1, y)),
          lerp(fx, grad2d(perm[p0 + 1], x, y-1), grad2d(perm[p1 + 1], x-1, y-1)));
      };

      this.noise1d = function(x) {
        var X = Math.floor(x)&255;
        x -= Math.floor(x);
        var fx = (3-2*x)*x*x;
        return lerp(fx, grad1d(perm[X], x), grad1d(perm[X+1], x-1));
      };
    }

    // processing defaults
    var noiseProfile = { generator: undef, octaves: 4, fallout: 0.5, seed: undef};

    /**
    * Returns the Perlin noise value at specified coordinates. Perlin noise is a random sequence
    * generator producing a more natural ordered, harmonic succession of numbers compared to the
    * standard random() function. It was invented by Ken Perlin in the 1980s and been used since
    * in graphical applications to produce procedural textures, natural motion, shapes, terrains etc.
    * The main difference to the random() function is that Perlin noise is defined in an infinite
    * n-dimensional space where each pair of coordinates corresponds to a fixed semi-random value
    * (fixed only for the lifespan of the program). The resulting value will always be between 0.0
    * and 1.0. Processing can compute 1D, 2D and 3D noise, depending on the number of coordinates
    * given. The noise value can be animated by moving through the noise space as demonstrated in
    * the example above. The 2nd and 3rd dimension can also be interpreted as time.
    * The actual noise is structured similar to an audio signal, in respect to the function's use
    * of frequencies. Similar to the concept of harmonics in physics, perlin noise is computed over
    * several octaves which are added together for the final result.
    * Another way to adjust the character of the resulting sequence is the scale of the input
    * coordinates. As the function works within an infinite space the value of the coordinates
    * doesn't matter as such, only the distance between successive coordinates does (eg. when using
    * noise() within a loop). As a general rule the smaller the difference between coordinates, the
    * smoother the resulting noise sequence will be. Steps of 0.005-0.03 work best for most applications,
    * but this will differ depending on use.
    *
    * @param {float} x          x coordinate in noise space
    * @param {float} y          y coordinate in noise space
    * @param {float} z          z coordinate in noise space
    *
    * @returns {float}
    *
    * @see random
    * @see noiseDetail
    */
    p.noise = function(x, y, z) {
      if(noiseProfile.generator === undef) {
        // caching
        noiseProfile.generator = new PerlinNoise(noiseProfile.seed);
      }
      var generator = noiseProfile.generator;
      var effect = 1, k = 1, sum = 0;
      for(var i=0; i<noiseProfile.octaves; ++i) {
        effect *= noiseProfile.fallout;
        switch (arguments.length) {
        case 1:
          sum += effect * (1 + generator.noise1d(k*x))/2; break;
        case 2:
          sum += effect * (1 + generator.noise2d(k*x, k*y))/2; break;
        case 3:
          sum += effect * (1 + generator.noise3d(k*x, k*y, k*z))/2; break;
        }
        k *= 2;
      }
      return sum;
    };

    /**
    * Adjusts the character and level of detail produced by the Perlin noise function.
    * Similar to harmonics in physics, noise is computed over several octaves. Lower octaves
    * contribute more to the output signal and as such define the overal intensity of the noise,
    * whereas higher octaves create finer grained details in the noise sequence. By default,
    * noise is computed over 4 octaves with each octave contributing exactly half than its
    * predecessor, starting at 50% strength for the 1st octave. This falloff amount can be
    * changed by adding an additional function parameter. Eg. a falloff factor of 0.75 means
    * each octave will now have 75% impact (25% less) of the previous lower octave. Any value
    * between 0.0 and 1.0 is valid, however note that values greater than 0.5 might result in
    * greater than 1.0 values returned by noise(). By changing these parameters, the signal
    * created by the noise() function can be adapted to fit very specific needs and characteristics.
    *
    * @param {int} octaves          number of octaves to be used by the noise() function
    * @param {float} falloff        falloff factor for each octave
    *
    * @see noise
    */
    p.noiseDetail = function(octaves, fallout) {
      noiseProfile.octaves = octaves;
      if(fallout !== undef) {
        noiseProfile.fallout = fallout;
      }
    };

    /**
    * Sets the seed value for noise(). By default, noise() produces different results each
    * time the program is run. Set the value parameter to a constant to return the same
    * pseudo-random numbers each time the software is run.
    *
    * @param {int} seed         int
    *
    * @returns {float}
    *
    * @see random
    * @see radomSeed
    * @see noise
    * @see noiseDetail
    */
    p.noiseSeed = function(seed) {
      noiseProfile.seed = seed;
      noiseProfile.generator = undef;
    };

    // Set default background behavior for 2D and 3D contexts
    var refreshBackground = function() {
      if (!curSketch.options.isTransparent) {
        if (p.use3DContext) {
          // fill background default opaque gray
          curContext.clearColor(204 / 255, 204 / 255, 204 / 255, 1.0);
          curContext.clear(curContext.COLOR_BUFFER_BIT | curContext.DEPTH_BUFFER_BIT);
        } else {
          // fill background default opaque gray
          curContext.fillStyle = "rgb(204, 204, 204)";
          curContext.fillRect(0, 0, p.width, p.height);
          isFillDirty = true;
        }
      }
    };

    // Changes the size of the Canvas ( this resets context properties like 'lineCap', etc.
    /**
    * Defines the dimension of the display window in units of pixels. The size() function must
    * be the first line in setup(). If size() is not called, the default size of the window is
    * 100x100 pixels. The system variables width and height are set by the parameters passed to
    * the size() function.
    *
    * @param {int} aWidth     width of the display window in units of pixels
    * @param {int} aHeight    height of the display window in units of pixels
    * @param {MODE} aMode     Either P2D, P3D, JAVA2D, or OPENGL
    *
    * @see createGraphics
    * @see screen
    */
    p.size = (function() {
      var size3DCalled = false;

      return function size(aWidth, aHeight, aMode) {
        if (aMode && (aMode === PConstants.WEBGL)) {
          if (size3DCalled) {
            throw "Multiple calls to size() for 3D renders are not allowed.";
          }
          size3DCalled = true;

          // get the 3D rendering context
          try {
            // If the HTML <canvas> dimensions differ from the
            // dimensions specified in the size() call in the sketch, for
            // 3D sketches, browsers will either not render or render the
            // scene incorrectly. To fix this, we need to adjust the
            // width and height attributes of the canvas.
            if (curElement.width !== aWidth || curElement.height !== aHeight) {
              curElement.setAttribute("width", aWidth);
              curElement.setAttribute("height", aHeight);
            }
            curContext = curElement.getContext("experimental-webgl");
            p.use3DContext = true;
            canTex = curContext.createTexture(); // texture
            textTex = curContext.createTexture(); // texture
          } catch(e_size) {
            Processing.debug(e_size);
          }

          if (!curContext) {
            throw "WebGL context is not supported on this browser.";
          } else {
            for (var i = 0; i < PConstants.SINCOS_LENGTH; i++) {
              sinLUT[i] = p.sin(i * (PConstants.PI / 180) * 0.5);
              cosLUT[i] = p.cos(i * (PConstants.PI / 180) * 0.5);
            }
            // Set defaults
            curContext.viewport(0, 0, curElement.width, curElement.height);
            curContext.enable(curContext.DEPTH_TEST);
            curContext.enable(curContext.BLEND);
            curContext.blendFunc(curContext.SRC_ALPHA, curContext.ONE_MINUS_SRC_ALPHA);
            refreshBackground(); // sets clearColor default;

            // Create the program objects to render 2D (points, lines) and
            // 3D (spheres, boxes) shapes. Because 2D shapes are not lit,
            // lighting calculations could be ommitted from that program object.
            programObject2D = createProgramObject(curContext, vertexShaderSource2D, fragmentShaderSource2D);

            // set the defaults
            curContext.useProgram(programObject2D);
            p.strokeWeight(1.0);

            programObject3D = createProgramObject(curContext, vertexShaderSource3D, fragmentShaderSource3D);
            programObjectUnlitShape = createProgramObject(curContext, vShaderSrcUnlitShape, fShaderSrcUnlitShape);

            // Now that the programs have been compiled, we can set the default
            // states for the lights.
            curContext.useProgram(programObject3D);

            // assume we aren't using textures by default
            uniformi("usingTexture3d", programObject3D, "usingTexture", usingTexture);
            p.lightFalloff(1, 0, 0);
            p.shininess(1);
            p.ambient(255, 255, 255);
            p.specular(0, 0, 0);

            // Create buffers for 3D primitives
            boxBuffer = curContext.createBuffer();
            curContext.bindBuffer(curContext.ARRAY_BUFFER, boxBuffer);
            curContext.bufferData(curContext.ARRAY_BUFFER, boxVerts, curContext.STATIC_DRAW);

            boxNormBuffer = curContext.createBuffer();
            curContext.bindBuffer(curContext.ARRAY_BUFFER, boxNormBuffer);
            curContext.bufferData(curContext.ARRAY_BUFFER, boxNorms, curContext.STATIC_DRAW);

            boxOutlineBuffer = curContext.createBuffer();
            curContext.bindBuffer(curContext.ARRAY_BUFFER, boxOutlineBuffer);
            curContext.bufferData(curContext.ARRAY_BUFFER, boxOutlineVerts, curContext.STATIC_DRAW);

            // used to draw the rectangle and the outline
            rectBuffer = curContext.createBuffer();
            curContext.bindBuffer(curContext.ARRAY_BUFFER, rectBuffer);
            curContext.bufferData(curContext.ARRAY_BUFFER, rectVerts, curContext.STATIC_DRAW);

            rectNormBuffer = curContext.createBuffer();
            curContext.bindBuffer(curContext.ARRAY_BUFFER, rectNormBuffer);
            curContext.bufferData(curContext.ARRAY_BUFFER, rectNorms, curContext.STATIC_DRAW);

            // The sphere vertices are specified dynamically since the user
            // can change the level of detail. Everytime the user does that
            // using sphereDetail(), the new vertices are calculated.
            sphereBuffer = curContext.createBuffer();

            lineBuffer = curContext.createBuffer();

            // Shape buffers
            fillBuffer = curContext.createBuffer();
            fillColorBuffer = curContext.createBuffer();
            strokeColorBuffer = curContext.createBuffer();
            shapeTexVBO = curContext.createBuffer();

            pointBuffer = curContext.createBuffer();
            curContext.bindBuffer(curContext.ARRAY_BUFFER, pointBuffer);
            curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array([0, 0, 0]), curContext.STATIC_DRAW);

            textBuffer = curContext.createBuffer();
            curContext.bindBuffer(curContext.ARRAY_BUFFER, textBuffer );
            curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array([1,1,0,-1,1,0,-1,-1,0,1,-1,0]), curContext.STATIC_DRAW);

            textureBuffer = curContext.createBuffer();
            curContext.bindBuffer(curContext.ARRAY_BUFFER, textureBuffer);
            curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array([0,0,1,0,1,1,0,1]), curContext.STATIC_DRAW);

            indexBuffer = curContext.createBuffer();
            curContext.bindBuffer(curContext.ELEMENT_ARRAY_BUFFER, indexBuffer);
            curContext.bufferData(curContext.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,2,3,0]), curContext.STATIC_DRAW);

            cam = new PMatrix3D();
            cameraInv = new PMatrix3D();
            forwardTransform = new PMatrix3D();
            reverseTransform = new PMatrix3D();
            modelView = new PMatrix3D();
            modelViewInv = new PMatrix3D();
            projection = new PMatrix3D();
            p.camera();
            p.perspective();
            forwardTransform = modelView;
            reverseTransform = modelViewInv;

            userMatrixStack = new PMatrixStack();
            // used by both curve and bezier, so just init here
            curveBasisMatrix = new PMatrix3D();
            curveToBezierMatrix = new PMatrix3D();
            curveDrawMatrix = new PMatrix3D();
            bezierDrawMatrix = new PMatrix3D();
            bezierBasisInverse = new PMatrix3D();
            bezierBasisMatrix = new PMatrix3D();
            bezierBasisMatrix.set(-1, 3, -3, 1, 3, -6, 3, 0, -3, 3, 0, 0, 1, 0, 0, 0);
          }
          p.stroke(0);
          p.fill(255);
        } else {
          if (curContext === undef) {
            // size() was called without p.init() default context, ie. p.createGraphics()
            curContext = curElement.getContext("2d");
            p.use3DContext = false;
            userMatrixStack = new PMatrixStack();
            modelView = new PMatrix2D();
          }
        }

        // The default 2d context has already been created in the p.init() stage if
        // a 3d context was not specified. This is so that a 2d context will be
        // available if size() was not called.
        var props = {
          fillStyle: curContext.fillStyle,
          strokeStyle: curContext.strokeStyle,
          lineCap: curContext.lineCap,
          lineJoin: curContext.lineJoin
        };
        // remove the style width and height properties to ensure that the canvas gets set to
        // aWidth and aHeight coming in
        if (curElement.style.length > 0 ) {
          curElement.style.removeProperty("width");
          curElement.style.removeProperty("height");
        }

        curElement.width = p.width = aWidth || 100;
        curElement.height = p.height = aHeight || 100;

        for (var j in props) {
          if (props) {
            curContext[j] = props[j];
          }
        }

        // Reset the text style. This is a terrible hack, only because of how 3D contexts are initialized
        this.textSize(curTextSize);

        // redraw the background if background was called before size
        refreshBackground();

        // set 5% for pixels to cache (or 1000)
        maxPixelsCached = Math.max(1000, aWidth * aHeight * 0.05);

        // Externalize the context
        p.externals.context = curContext;
      };
    })();

    ////////////////////////////////////////////////////////////////////////////
    // Lights
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Adds an ambient light. Ambient light doesn't come from a specific direction,
     * the rays have light have bounced around so much that objects are evenly lit
     * from all sides. Ambient lights are almost always used in combination with
     * other types of lights. Lights need to be included in the <b>draw()</b> to
     * remain persistent in a looping program. Placing them in the <b>setup()</b>
     * of a looping program will cause them to only have an effect the first time
     * through the loop. The effect of the parameters is determined by the current
     * color mode.
     *
     * @param {int | float} r red or hue value
     * @param {int | float} g green or hue value
     * @param {int | float} b blue or hue value
     *
     * @param {int | float} x
     * @param {int | float} y
     * @param {int | float} z
     *
     * @returns none
     *
     * @see lights
     * @see directionalLight
     * @see pointLight
     * @see spotLight
    */
    p.ambientLight = function(r, g, b, x, y, z) {
      if (p.use3DContext) {
        if (lightCount === PConstants.MAX_LIGHTS) {
          throw "can only create " + PConstants.MAX_LIGHTS + " lights";
        }

        var pos = new PVector(x, y, z);
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.mult(pos, pos);

        curContext.useProgram(programObject3D);
        uniformf("lights.color.3d." + lightCount, programObject3D, "lights" + lightCount + ".color", [r/255, g/255, b/255]);
        uniformf("lights.position.3d." + lightCount, programObject3D, "lights" + lightCount + ".position", pos.array());
        uniformi("lights.type.3d." + lightCount, programObject3D, "lights" + lightCount + ".type", 0);
        uniformi("lightCount3d", programObject3D, "lightCount", ++lightCount);
      }
    };

    /**
     * Adds a directional light. Directional light comes from one direction and
     * is stronger when hitting a surface squarely and weaker if it hits at a
     * gentle angle. After hitting a surface, a directional lights scatters in
     * all directions. Lights need to be included in the <b>draw()</b> to remain
     * persistent in a looping program. Placing them in the <b>setup()</b> of a
     * looping program will cause them to only have an effect the first time
     * through the loop. The affect of the <br>r</b>, <br>g</b>, and <br>b</b>
     * parameters is determined by the current color mode. The <b>nx</b>,
     * <b>ny</b>, and <b>nz</b> parameters specify the direction the light is
     * facing. For example, setting <b>ny</b> to -1 will cause the geometry to be
     * lit from below (the light is facing directly upward).
     *
     * @param {int | float} r red or hue value
     * @param {int | float} g green or hue value
     * @param {int | float} b blue or hue value
     *
     * @param {int | float} nx direction along the x axis
     * @param {int | float} ny direction along the y axis
     * @param {int | float} nz direction along the z axis
     *
     * @returns none
     *
     * @see lights
     * @see ambientLight
     * @see pointLight
     * @see spotLight
    */
    p.directionalLight = function(r, g, b, nx, ny, nz) {
      if (p.use3DContext) {
        if (lightCount === PConstants.MAX_LIGHTS) {
          throw "can only create " + PConstants.MAX_LIGHTS + " lights";
        }

        curContext.useProgram(programObject3D);

        // We need to multiply the direction by the model view matrix, but
        // the mult function checks the w component of the vector, if it isn't
        // present, it uses 1, so we use a very small value as a work around.
        var dir = [nx, ny, nz, -0.00000000001];
        var view = new PMatrix3D();
        view.set(modelView.array());
        view.mult(dir, dir);

        uniformf("lights.color.3d." + lightCount, programObject3D, "lights" + lightCount + ".color", [r/255, g/255, b/255]);
        uniformf("lights.position.3d." + lightCount, programObject3D, "lights" + lightCount + ".position", [dir[0], -dir[1], dir[2]]);
        uniformi("lights.type.3d." + lightCount, programObject3D, "lights" + lightCount + ".type", 1);
        uniformi("lightCount3d", programObject3D, "lightCount", ++lightCount);
      }
    };

    /**
     * Sets the falloff rates for point lights, spot lights, and ambient lights.
     * The parameters are used to determine the falloff with the following equation:
     *
     * d = distance from light position to vertex position
     * falloff = 1 / (CONSTANT + d * LINEAR + (d*d) * QUADRATIC)
     *
     * Like <b>fill()</b>, it affects only the elements which are created after it in the
     * code. The default value if <b>LightFalloff(1.0, 0.0, 0.0)</b>. Thinking about an
     * ambient light with a falloff can be tricky. It is used, for example, if you
     * wanted a region of your scene to be lit ambiently one color and another region
     * to be lit ambiently by another color, you would use an ambient light with location
     * and falloff. You can think of it as a point light that doesn't care which direction
     * a surface is facing.
     *
     * @param {int | float} constant constant value for determining falloff
     * @param {int | float} linear linear value for determining falloff
     * @param {int | float} quadratic quadratic value for determining falloff
     *
     * @returns none
     *
     * @see lights
     * @see ambientLight
     * @see pointLight
     * @see spotLight
     * @see lightSpecular
    */
    p.lightFalloff = function lightFalloff(constant, linear, quadratic) {
      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformf("falloff3d", programObject3D, "falloff", [constant, linear, quadratic]);
      }
    };

    /**
     * Sets the specular color for lights. Like <b>fill()</b>, it affects only the
     * elements which are created after it in the code. Specular refers to light
     * which bounces off a surface in a perferred direction (rather than bouncing
     * in all directions like a diffuse light) and is used for creating highlights.
     * The specular quality of a light interacts with the specular material qualities
     * set through the <b>specular()</b> and <b>shininess()</b> functions.
     *
     * @param {int | float} r red or hue value
     * @param {int | float} g green or hue value
     * @param {int | float} b blue or hue value
     *
     * @returns none
     *
     * @see lights
     * @see ambientLight
     * @see pointLight
     * @see spotLight
    */
    p.lightSpecular = function lightSpecular(r, g, b) {
      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformf("specular3d", programObject3D, "specular", [r / 255, g / 255, b / 255]);
      }
    };

    /**
     * Sets the default ambient light, directional light, falloff, and specular
     * values. The defaults are ambientLight(128, 128, 128) and
     * directionalLight(128, 128, 128, 0, 0, -1), lightFalloff(1, 0, 0), and
     * lightSpecular(0, 0, 0). Lights need to be included in the draw() to remain
     * persistent in a looping program. Placing them in the setup() of a looping
     * program will cause them to only have an effect the first time through the
     * loop.
     *
     * @returns none
     *
     * @see ambientLight
     * @see directionalLight
     * @see pointLight
     * @see spotLight
     * @see noLights
     *
    */
    p.lights = function lights() {
      p.ambientLight(128, 128, 128);
      p.directionalLight(128, 128, 128, 0, 0, -1);
      p.lightFalloff(1, 0, 0);
      p.lightSpecular(0, 0, 0);
    };

    /**
     * Adds a point light. Lights need to be included in the <b>draw()</b> to remain
     * persistent in a looping program. Placing them in the <b>setup()</b> of a
     * looping program will cause them to only have an effect the first time through
     * the loop. The affect of the <b>r</b>, <b>g</b>, and <b>b</b> parameters
     * is determined by the current color mode. The <b>x</b>, <b>y</b>, and <b>z</b>
     * parameters set the position of the light.
     *
     * @param {int | float} r red or hue value
     * @param {int | float} g green or hue value
     * @param {int | float} b blue or hue value
     * @param {int | float} x x coordinate of the light
     * @param {int | float} y y coordinate of the light
     * @param {int | float} z z coordinate of the light
     *
     * @returns none
     *
     * @see lights
     * @see directionalLight
     * @see ambientLight
     * @see spotLight
    */
    p.pointLight = function(r, g, b, x, y, z) {
      if (p.use3DContext) {
        if (lightCount === PConstants.MAX_LIGHTS) {
          throw "can only create " + PConstants.MAX_LIGHTS + " lights";
        }

        // place the point in view space once instead of once per vertex
        // in the shader.
        var pos = new PVector(x, y, z);
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.mult(pos, pos);

        curContext.useProgram(programObject3D);
        uniformf("lights.color.3d." + lightCount, programObject3D, "lights" + lightCount + ".color", [r / 255, g / 255, b / 255]);
        uniformf("lights.position.3d." + lightCount, programObject3D, "lights" + lightCount + ".position", pos.array());
        uniformi("lights.type.3d." + lightCount, programObject3D, "lights" + lightCount + ".type", 2);
        uniformi("lightCount3d", programObject3D, "lightCount", ++lightCount);
      }
    };

    /**
     * Disable all lighting. Lighting is turned off by default and enabled with
     * the lights() method. This function can be used to disable lighting so
     * that 2D geometry (which does not require lighting) can be drawn after a
     * set of lighted 3D geometry.
     *
     * @returns none
     *
     * @see lights
    */
    p.noLights = function noLights() {
      if (p.use3DContext) {
        lightCount = 0;
        curContext.useProgram(programObject3D);
        uniformi("lightCount3d", programObject3D, "lightCount", lightCount);
      }
    };

    /**
     * Adds a spot light. Lights need to be included in the <b>draw()</b> to
     * remain persistent in a looping program. Placing them in the <b>setup()</b>
     * of a looping program will cause them to only have an effect the first time
     * through the loop. The affect of the <b>r</b>, <b>g</b>, and <b>b</b> parameters
     * is determined by the current color mode. The <b>x</b>, <b>y</b>, and <b>z</b>
     * parameters specify the position of the light and <b>nx</b>, <b>ny</b>, <b>nz</b>
     * specify the direction or light. The angle parameter affects <b>angle</b> of the
     * spotlight cone.
     *
     * @param {int | float} r red or hue value
     * @param {int | float} g green or hue value
     * @param {int | float} b blue or hue value
     * @param {int | float} x coordinate of the light
     * @param {int | float} y coordinate of the light
     * @param {int | float} z coordinate of the light
     * @param {int | float} nx direction along the x axis
     * @param {int | float} ny direction along the y axis
     * @param {int | float} nz direction along the z axis
     * @param {float} angle angle of the spotlight cone
     * @param {float} concentration exponent determining the center bias of the cone
     *
     * @returns none
     *
     * @see lights
     * @see directionalLight
     * @see ambientLight
     * @see pointLight
    */
    p.spotLight = function spotLight(r, g, b, x, y, z, nx, ny, nz, angle, concentration) {
      if (p.use3DContext) {
        if (lightCount === PConstants.MAX_LIGHTS) {
          throw "can only create " + PConstants.MAX_LIGHTS + " lights";
        }

        curContext.useProgram(programObject3D);

        // place the point in view space once instead of once per vertex
        // in the shader.
        var pos = new PVector(x, y, z);
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.mult(pos, pos);

        // We need to multiply the direction by the model view matrix, but
        // the mult function checks the w component of the vector, if it isn't
        // present, it uses 1, so we use a very small value as a work around.
        var dir = [nx, ny, nz, -0.00000001];
        view.set(modelView.array());
        view.mult(dir, dir);

        uniformf("lights.color.3d." + lightCount, programObject3D, "lights" + lightCount + ".color", [r / 255, g / 255, b / 255]);
        uniformf("lights.position.3d." + lightCount, programObject3D, "lights" + lightCount + ".position", pos.array());
        uniformf("lights.direction.3d." + lightCount, programObject3D, "lights" + lightCount + ".direction", [dir[0], -dir[1], dir[2]]);
        uniformf("lights.concentration.3d." + lightCount, programObject3D, "lights" + lightCount + ".concentration", concentration);
        uniformf("lights.angle.3d." + lightCount, programObject3D, "lights" + lightCount + ".angle", angle);
        uniformi("lights.type.3d." + lightCount, programObject3D, "lights" + lightCount + ".type", 3);
        uniformi("lightCount3d", programObject3D, "lightCount", ++lightCount);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Camera functions
    ////////////////////////////////////////////////////////////////////////////

    /**
     * The <b>beginCamera()</b> and <b>endCamera()</b> functions enable advanced customization of the camera space.
     * The functions are useful if you want to more control over camera movement, however for most users, the <b>camera()</b>
     * function will be sufficient.<br /><br />The camera functions will replace any transformations (such as <b>rotate()</b>
     * or <b>translate()</b>) that occur before them in <b>draw()</b>, but they will not automatically replace the camera
     * transform itself. For this reason, camera functions should be placed at the beginning of <b>draw()</b> (so that
     * transformations happen afterwards), and the <b>camera()</b> function can be used after <b>beginCamera()</b> if
     * you want to reset the camera before applying transformations.<br /><br />This function sets the matrix mode to the
     * camera matrix so calls such as <b>translate()</b>, <b>rotate()</b>, applyMatrix() and resetMatrix() affect the camera.
     * <b>beginCamera()</b> should always be used with a following <b>endCamera()</b> and pairs of <b>beginCamera()</b> and
     * <b>endCamera()</b> cannot be nested.
     *
     * @see camera
     * @see endCamera
     * @see applyMatrix
     * @see resetMatrix
     * @see translate
     * @see rotate
     * @see scale
     */
    p.beginCamera = function beginCamera() {
      if (manipulatingCamera) {
        throw ("You cannot call beginCamera() again before calling endCamera()");
      } else {
        manipulatingCamera = true;
        forwardTransform = cameraInv;
        reverseTransform = cam;
      }
    };

    /**
     * The <b>beginCamera()</b> and <b>endCamera()</b> functions enable advanced customization of the camera space.
     * Please see the reference for <b>beginCamera()</b> for a description of how the functions are used.
     *
     * @see beginCamera
     */
    p.endCamera = function endCamera() {
      if (!manipulatingCamera) {
        throw ("You cannot call endCamera() before calling beginCamera()");
      } else {
        modelView.set(cam);
        modelViewInv.set(cameraInv);
        forwardTransform = modelView;
        reverseTransform = modelViewInv;
        manipulatingCamera = false;
      }
    };

    /**
     * Sets the position of the camera through setting the eye position, the center of the scene, and which axis is facing
     * upward. Moving the eye position and the direction it is pointing (the center of the scene) allows the images to be
     * seen from different angles. The version without any parameters sets the camera to the default position, pointing to
     * the center of the display window with the Y axis as up. The default values are camera(width/2.0, height/2.0,
     * (height/2.0) / tan(PI*60.0 / 360.0), width/2.0, height/2.0, 0, 0, 1, 0). This function is similar to gluLookAt()
     * in OpenGL, but it first clears the current camera settings.
     *
     * @param {float} eyeX    x-coordinate for the eye
     * @param {float} eyeY    y-coordinate for the eye
     * @param {float} eyeZ    z-coordinate for the eye
     * @param {float} centerX x-coordinate for the center of the scene
     * @param {float} centerY y-coordinate for the center of the scene
     * @param {float} centerZ z-coordinate for the center of the scene
     * @param {float} upX     usually 0.0, 1.0, -1.0
     * @param {float} upY     usually 0.0, 1.0, -1.0
     * @param {float} upZ     usually 0.0, 1.0, -1.0
     *
     * @see beginCamera
     * @see endCamera
     * @see frustum
     */
    p.camera = function camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
      if (arguments.length === 0) {
        //in case canvas is resized
        cameraX = curElement.width / 2;
        cameraY = curElement.height / 2;
        cameraZ = cameraY / Math.tan(cameraFOV / 2);
        eyeX = cameraX;
        eyeY = cameraY;
        eyeZ = cameraZ;
        centerX = cameraX;
        centerY = cameraY;
        centerZ = 0;
        upX = 0;
        upY = 1;
        upZ = 0;
      }

      var z = new PVector(eyeX - centerX, eyeY - centerY, eyeZ - centerZ);
      var y = new PVector(upX, upY, upZ);
      var transX, transY, transZ;
      z.normalize();
      var x = PVector.cross(y, z);
      y = PVector.cross(z, x);
      x.normalize();
      y.normalize();

      cam.set(x.x, x.y, x.z, 0, y.x, y.y, y.z, 0, z.x, z.y, z.z, 0, 0, 0, 0, 1);

      cam.translate(-eyeX, -eyeY, -eyeZ);

      cameraInv.reset();
      cameraInv.invApply(x.x, x.y, x.z, 0, y.x, y.y, y.z, 0, z.x, z.y, z.z, 0, 0, 0, 0, 1);

      cameraInv.translate(eyeX, eyeY, eyeZ);

      modelView.set(cam);
      modelViewInv.set(cameraInv);
    };

    /**
     * Sets a perspective projection applying foreshortening, making distant objects appear smaller than closer ones. The
     * parameters define a viewing volume with the shape of truncated pyramid. Objects near to the front of the volume appear
     * their actual size, while farther objects appear smaller. This projection simulates the perspective of the world more
     * accurately than orthographic projection. The version of perspective without parameters sets the default perspective and
     * the version with four parameters allows the programmer to set the area precisely. The default values are:
     * perspective(PI/3.0, width/height, cameraZ/10.0, cameraZ*10.0) where cameraZ is ((height/2.0) / tan(PI*60.0/360.0));
     *
     * @param {float} fov     field-of-view angle (in radians) for vertical direction
     * @param {float} aspect  ratio of width to height
     * @param {float} zNear   z-position of nearest clipping plane
     * @param {float} zFar    z-positions of farthest clipping plane
     */
    p.perspective = function perspective(fov, aspect, near, far) {
      if (arguments.length === 0) {
        //in case canvas is resized
        cameraY = curElement.height / 2;
        cameraZ = cameraY / Math.tan(cameraFOV / 2);
        cameraNear = cameraZ / 10;
        cameraFar = cameraZ * 10;
        cameraAspect = curElement.width / curElement.height;
        fov = cameraFOV;
        aspect = cameraAspect;
        near = cameraNear;
        far = cameraFar;
      }

      var yMax, yMin, xMax, xMin;
      yMax = near * Math.tan(fov / 2);
      yMin = -yMax;
      xMax = yMax * aspect;
      xMin = yMin * aspect;
      p.frustum(xMin, xMax, yMin, yMax, near, far);
    };

    /**
     * Sets a perspective matrix defined through the parameters. Works like glFrustum, except it wipes out the current
     * perspective matrix rather than muliplying itself with it.
     *
     * @param {float} left   left coordinate of the clipping plane
     * @param {float} right  right coordinate of the clipping plane
     * @param {float} bottom bottom coordinate of the clipping plane
     * @param {float} top    top coordinate of the clipping plane
     * @param {float} near   near coordinate of the clipping plane
     * @param {float} far    far coordinate of the clipping plane
     *
     * @see beginCamera
     * @see camera
     * @see endCamera
     * @see perspective
     */
    p.frustum = function frustum(left, right, bottom, top, near, far) {
      frustumMode = true;
      projection = new PMatrix3D();
      projection.set((2 * near) / (right - left), 0, (right + left) / (right - left),
                     0, 0, (2 * near) / (top - bottom), (top + bottom) / (top - bottom),
                     0, 0, 0, -(far + near) / (far - near), -(2 * far * near) / (far - near),
                     0, 0, -1, 0);
    };

    /**
     * Sets an orthographic projection and defines a parallel clipping volume. All objects with the same dimension appear
     * the same size, regardless of whether they are near or far from the camera. The parameters to this function specify
     * the clipping volume where left and right are the minimum and maximum x values, top and bottom are the minimum and
     * maximum y values, and near and far are the minimum and maximum z values. If no parameters are given, the default
     * is used: ortho(0, width, 0, height, -10, 10).
     *
     * @param {float} left   left plane of the clipping volume
     * @param {float} right  right plane of the clipping volume
     * @param {float} bottom bottom plane of the clipping volume
     * @param {float} top    top plane of the clipping volume
     * @param {float} near   maximum distance from the origin to the viewer
     * @param {float} far    maximum distance from the origin away from the viewer
     */
    p.ortho = function ortho(left, right, bottom, top, near, far) {
      if (arguments.length === 0) {
        left = 0;
        right = p.width;
        bottom = 0;
        top = p.height;
        near = -10;
        far = 10;
      }

      var x = 2 / (right - left);
      var y = 2 / (top - bottom);
      var z = -2 / (far - near);

      var tx = -(right + left) / (right - left);
      var ty = -(top + bottom) / (top - bottom);
      var tz = -(far + near) / (far - near);

      projection = new PMatrix3D();
      projection.set(x, 0, 0, tx, 0, y, 0, ty, 0, 0, z, tz, 0, 0, 0, 1);

      frustumMode = false;
    };
    /**
     * The printProjection() prints the current projection matrix to the text window.
     */
    p.printProjection = function() {
      projection.print();
    };
    /**
     * The printCamera() function prints the current camera matrix.
     */
    p.printCamera = function() {
      cam.print();
    };

    ////////////////////////////////////////////////////////////////////////////
    // Shapes
    ////////////////////////////////////////////////////////////////////////////
    /**
     * The box() function renders a box. A box is an extruded rectangle. A box with equal dimension on all sides is a cube.
     * Calling this function with only one parameter will create a cube.
     *
     * @param {int|float} w  dimension of the box in the x-dimension
     * @param {int|float} h  dimension of the box in the y-dimension
     * @param {int|float} d  dimension of the box in the z-dimension
     */
    p.box = function(w, h, d) {
      if (p.use3DContext) {
        // user can uniformly scale the box by
        // passing in only one argument.
        if (!h || !d) {
          h = d = w;
        }

        // Modeling transformation
        var model = new PMatrix3D();
        model.scale(w, h, d);

        // viewing transformation needs to have Y flipped
        // becuase that's what Processing does.
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.transpose();

        var proj = new PMatrix3D();
        proj.set(projection);
        proj.transpose();

        if (doFill === true) {
          curContext.useProgram(programObject3D);

          uniformMatrix("model3d", programObject3D, "model", false, model.array());
          uniformMatrix("view3d", programObject3D, "view", false, view.array());
          uniformMatrix("projection3d", programObject3D, "projection", false, proj.array());

          // fix stitching problems. (lines get occluded by triangles
          // since they share the same depth values). This is not entirely
          // working, but it's a start for drawing the outline. So
          // developers can start playing around with styles.
          curContext.enable(curContext.POLYGON_OFFSET_FILL);
          curContext.polygonOffset(1, 1);

          uniformf("color3d", programObject3D, "color", fillStyle);

          // Create the normal transformation matrix
          var v = new PMatrix3D();
          v.set(view);

          var m = new PMatrix3D();
          m.set(model);

          v.mult(m);

          var normalMatrix = new PMatrix3D();
          normalMatrix.set(v);
          normalMatrix.invert();
          normalMatrix.transpose();

          uniformMatrix("normalTransform3d", programObject3D, "normalTransform", false, normalMatrix.array());

          vertexAttribPointer("vertex3d", programObject3D, "Vertex", 3, boxBuffer);
          vertexAttribPointer("normal3d", programObject3D, "Normal", 3, boxNormBuffer);

          // Turn off per vertex colors
          disableVertexAttribPointer("aColor3d", programObject3D, "aColor");
          disableVertexAttribPointer("aTexture3d", programObject3D, "aTexture");

          curContext.drawArrays(curContext.TRIANGLES, 0, boxVerts.length / 3);
          curContext.disable(curContext.POLYGON_OFFSET_FILL);
        }

        if (lineWidth > 0 && doStroke) {
          curContext.useProgram(programObject2D);
          uniformMatrix("model2d", programObject2D, "model", false, model.array());
          uniformMatrix("view2d", programObject2D, "view", false, view.array());
          uniformMatrix("projection2d", programObject2D, "projection", false, proj.array());

          uniformf("color2d", programObject2D, "color", strokeStyle);
          uniformi("picktype2d", programObject2D, "picktype", 0);

          vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, boxOutlineBuffer);
          disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");

          curContext.lineWidth(lineWidth);
          curContext.drawArrays(curContext.LINES, 0, boxOutlineVerts.length / 3);
        }
      }
    };
    /**
     * The initSphere() function is a helper function used by <b>sphereDetail()</b>
     * This function creates and stores sphere vertices every time the user changes sphere detail.
     *
     * @see #sphereDetail
     */
    var initSphere = function() {
      var i;
      sphereVerts = [];

      for (i = 0; i < sphereDetailU; i++) {
        sphereVerts.push(0);
        sphereVerts.push(-1);
        sphereVerts.push(0);
        sphereVerts.push(sphereX[i]);
        sphereVerts.push(sphereY[i]);
        sphereVerts.push(sphereZ[i]);
      }
      sphereVerts.push(0);
      sphereVerts.push(-1);
      sphereVerts.push(0);
      sphereVerts.push(sphereX[0]);
      sphereVerts.push(sphereY[0]);
      sphereVerts.push(sphereZ[0]);

      var v1, v11, v2;

      // middle rings
      var voff = 0;
      for (i = 2; i < sphereDetailV; i++) {
        v1 = v11 = voff;
        voff += sphereDetailU;
        v2 = voff;
        for (var j = 0; j < sphereDetailU; j++) {
          sphereVerts.push(parseFloat(sphereX[v1]));
          sphereVerts.push(parseFloat(sphereY[v1]));
          sphereVerts.push(parseFloat(sphereZ[v1++]));
          sphereVerts.push(parseFloat(sphereX[v2]));
          sphereVerts.push(parseFloat(sphereY[v2]));
          sphereVerts.push(parseFloat(sphereZ[v2++]));
        }

        // close each ring
        v1 = v11;
        v2 = voff;

        sphereVerts.push(parseFloat(sphereX[v1]));
        sphereVerts.push(parseFloat(sphereY[v1]));
        sphereVerts.push(parseFloat(sphereZ[v1]));
        sphereVerts.push(parseFloat(sphereX[v2]));
        sphereVerts.push(parseFloat(sphereY[v2]));
        sphereVerts.push(parseFloat(sphereZ[v2]));
      }

      // add the northern cap
      for (i = 0; i < sphereDetailU; i++) {
        v2 = voff + i;

        sphereVerts.push(parseFloat(sphereX[v2]));
        sphereVerts.push(parseFloat(sphereY[v2]));
        sphereVerts.push(parseFloat(sphereZ[v2]));
        sphereVerts.push(0);
        sphereVerts.push(1);
        sphereVerts.push(0);
      }

      sphereVerts.push(parseFloat(sphereX[voff]));
      sphereVerts.push(parseFloat(sphereY[voff]));
      sphereVerts.push(parseFloat(sphereZ[voff]));
      sphereVerts.push(0);
      sphereVerts.push(1);
      sphereVerts.push(0);

      //set the buffer data
      curContext.bindBuffer(curContext.ARRAY_BUFFER, sphereBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(sphereVerts), curContext.STATIC_DRAW);
    };

    /**
     * The sphereDetail() function controls the detail used to render a sphere by adjusting the number of
     * vertices of the sphere mesh. The default resolution is 30, which creates
     * a fairly detailed sphere definition with vertices every 360/30 = 12
     * degrees. If you're going to render a great number of spheres per frame,
     * it is advised to reduce the level of detail using this function.
     * The setting stays active until <b>sphereDetail()</b> is called again with
     * a new parameter and so should <i>not</i> be called prior to every
     * <b>sphere()</b> statement, unless you wish to render spheres with
     * different settings, e.g. using less detail for smaller spheres or ones
     * further away from the camera. To control the detail of the horizontal
     * and vertical resolution independently, use the version of the functions
     * with two parameters. Calling this function with one parameter sets the number of segments
     *(minimum of 3) used per full circle revolution. This is equivalent to calling the function with
     * two identical values.
     *
     * @param {int} ures    number of segments used horizontally (longitudinally) per full circle revolution
     * @param {int} vres    number of segments used vertically (latitudinally) from top to bottom
     *
     * @see #sphere()
     */
    p.sphereDetail = function sphereDetail(ures, vres) {
      var i;

      if (arguments.length === 1) {
        ures = vres = arguments[0];
      }

      if (ures < 3) {
        ures = 3;
      } // force a minimum res
      if (vres < 2) {
        vres = 2;
      } // force a minimum res
      // if it hasn't changed do nothing
      if ((ures === sphereDetailU) && (vres === sphereDetailV)) {
        return;
      }

      var delta = PConstants.SINCOS_LENGTH / ures;
      var cx = new Float32Array(ures);
      var cz = new Float32Array(ures);
      // calc unit circle in XZ plane
      for (i = 0; i < ures; i++) {
        cx[i] = cosLUT[parseInt((i * delta) % PConstants.SINCOS_LENGTH, 10)];
        cz[i] = sinLUT[parseInt((i * delta) % PConstants.SINCOS_LENGTH, 10)];
      }

      // computing vertexlist
      // vertexlist starts at south pole
      var vertCount = ures * (vres - 1) + 2;
      var currVert = 0;

      // re-init arrays to store vertices
      sphereX = new Float32Array(vertCount);
      sphereY = new Float32Array(vertCount);
      sphereZ = new Float32Array(vertCount);

      var angle_step = (PConstants.SINCOS_LENGTH * 0.5) / vres;
      var angle = angle_step;

      // step along Y axis
      for (i = 1; i < vres; i++) {
        var curradius = sinLUT[parseInt(angle % PConstants.SINCOS_LENGTH, 10)];
        var currY = -cosLUT[parseInt(angle % PConstants.SINCOS_LENGTH, 10)];
        for (var j = 0; j < ures; j++) {
          sphereX[currVert] = cx[j] * curradius;
          sphereY[currVert] = currY;
          sphereZ[currVert++] = cz[j] * curradius;
        }
        angle += angle_step;
      }
      sphereDetailU = ures;
      sphereDetailV = vres;

      // make the sphere verts and norms
      initSphere();
    };

    /**
     * The sphere() function draws a sphere with radius r centered at coordinate 0, 0, 0.
     * A sphere is a hollow ball made from tessellated triangles.
     *
     * @param {int|float} r the radius of the sphere
     */
    p.sphere = function() {
      if (p.use3DContext) {
        var sRad = arguments[0], c;

        if ((sphereDetailU < 3) || (sphereDetailV < 2)) {
          p.sphereDetail(30);
        }

        // Modeling transformation
        var model = new PMatrix3D();
        model.scale(sRad, sRad, sRad);

        // viewing transformation needs to have Y flipped
        // becuase that's what Processing does.
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.transpose();

        var proj = new PMatrix3D();
        proj.set(projection);
        proj.transpose();

        if (doFill === true) {
          // Create a normal transformation matrix
          var v = new PMatrix3D();
          v.set(view);

          var m = new PMatrix3D();
          m.set(model);

          v.mult(m);

          var normalMatrix = new PMatrix3D();
          normalMatrix.set(v);
          normalMatrix.invert();
          normalMatrix.transpose();

          curContext.useProgram(programObject3D);
          disableVertexAttribPointer("aTexture3d", programObject3D, "aTexture");

          uniformMatrix("model3d", programObject3D, "model", false, model.array());
          uniformMatrix("view3d", programObject3D, "view", false, view.array());
          uniformMatrix("projection3d", programObject3D, "projection", false, proj.array());
          uniformMatrix("normalTransform3d", programObject3D, "normalTransform", false, normalMatrix.array());

          vertexAttribPointer("vertex3d", programObject3D, "Vertex", 3, sphereBuffer);
          vertexAttribPointer("normal3d", programObject3D, "Normal", 3, sphereBuffer);

          // Turn off per vertex colors
          disableVertexAttribPointer("aColor3d", programObject3D, "aColor");

          // fix stitching problems. (lines get occluded by triangles
          // since they share the same depth values). This is not entirely
          // working, but it's a start for drawing the outline. So
          // developers can start playing around with styles.
          curContext.enable(curContext.POLYGON_OFFSET_FILL);
          curContext.polygonOffset(1, 1);

          uniformf("color3d", programObject3D, "color", fillStyle);

          curContext.drawArrays(curContext.TRIANGLE_STRIP, 0, sphereVerts.length / 3);
          curContext.disable(curContext.POLYGON_OFFSET_FILL);
        }

        if (lineWidth > 0 && doStroke) {
          curContext.useProgram(programObject2D);
          uniformMatrix("model2d", programObject2D, "model", false, model.array());
          uniformMatrix("view2d", programObject2D, "view", false, view.array());
          uniformMatrix("projection2d", programObject2D, "projection", false, proj.array());

          vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, sphereBuffer);
          disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");

          uniformf("color2d", programObject2D, "color", strokeStyle);
          uniformi("picktype2d", programObject2D, "picktype", 0);

          curContext.lineWidth(lineWidth);
          curContext.drawArrays(curContext.LINE_STRIP, 0, sphereVerts.length / 3);
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Coordinates
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Returns the three-dimensional X, Y, Z position in model space. This returns
     * the X value for a given coordinate based on the current set of transformations
     * (scale, rotate, translate, etc.) The X value can be used to place an object
     * in space relative to the location of the original point once the transformations
     * are no longer in use.<br />
     * <br />
     *
     * @param {int | float} x 3D x coordinate to be mapped
     * @param {int | float} y 3D y coordinate to be mapped
     * @param {int | float} z 3D z coordinate to be mapped
     *
     * @returns {float}
     *
     * @see modelY
     * @see modelZ
    */
    p.modelX = function modelX(x, y, z) {
      var mv = modelView.array();
      var ci = cameraInv.array();

      var ax = mv[0] * x + mv[1] * y + mv[2] * z + mv[3];
      var ay = mv[4] * x + mv[5] * y + mv[6] * z + mv[7];
      var az = mv[8] * x + mv[9] * y + mv[10] * z + mv[11];
      var aw = mv[12] * x + mv[13] * y + mv[14] * z + mv[15];

      var ox = ci[0] * ax + ci[1] * ay + ci[2] * az + ci[3] * aw;
      var ow = ci[12] * ax + ci[13] * ay + ci[14] * az + ci[15] * aw;

      return (ow !== 0) ? ox / ow : ox;
    };

    /**
     * Returns the three-dimensional X, Y, Z position in model space. This returns
     * the Y value for a given coordinate based on the current set of transformations
     * (scale, rotate, translate, etc.) The Y value can be used to place an object in
     * space relative to the location of the original point once the transformations
     * are no longer in use.<br />
     * <br />
     *
     * @param {int | float} x 3D x coordinate to be mapped
     * @param {int | float} y 3D y coordinate to be mapped
     * @param {int | float} z 3D z coordinate to be mapped
     *
     * @returns {float}
     *
     * @see modelX
     * @see modelZ
    */
    p.modelY = function modelY(x, y, z) {
      var mv = modelView.array();
      var ci = cameraInv.array();

      var ax = mv[0] * x + mv[1] * y + mv[2] * z + mv[3];
      var ay = mv[4] * x + mv[5] * y + mv[6] * z + mv[7];
      var az = mv[8] * x + mv[9] * y + mv[10] * z + mv[11];
      var aw = mv[12] * x + mv[13] * y + mv[14] * z + mv[15];

      var oy = ci[4] * ax + ci[5] * ay + ci[6] * az + ci[7] * aw;
      var ow = ci[12] * ax + ci[13] * ay + ci[14] * az + ci[15] * aw;

      return (ow !== 0) ? oy / ow : oy;
    };

    /**
     * Returns the three-dimensional X, Y, Z position in model space. This returns
     * the Z value for a given coordinate based on the current set of transformations
     * (scale, rotate, translate, etc.) The Z value can be used to place an object in
     * space relative to the location of the original point once the transformations
     * are no longer in use.
     *
     * @param {int | float} x 3D x coordinate to be mapped
     * @param {int | float} y 3D y coordinate to be mapped
     * @param {int | float} z 3D z coordinate to be mapped
     *
     * @returns {float}
     *
     * @see modelX
     * @see modelY
    */
    p.modelZ = function modelZ(x, y, z) {
      var mv = modelView.array();
      var ci = cameraInv.array();

      var ax = mv[0] * x + mv[1] * y + mv[2] * z + mv[3];
      var ay = mv[4] * x + mv[5] * y + mv[6] * z + mv[7];
      var az = mv[8] * x + mv[9] * y + mv[10] * z + mv[11];
      var aw = mv[12] * x + mv[13] * y + mv[14] * z + mv[15];

      var oz = ci[8] * ax + ci[9] * ay + ci[10] * az + ci[11] * aw;
      var ow = ci[12] * ax + ci[13] * ay + ci[14] * az + ci[15] * aw;

      return (ow !== 0) ? oz / ow : oz;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Material Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Sets the ambient reflectance for shapes drawn to the screen. This is
     * combined with the ambient light component of environment. The color
     * components set through the parameters define the reflectance. For example in
     * the default color mode, setting v1=255, v2=126, v3=0, would cause all the
     * red light to reflect and half of the green light to reflect. Used in combination
     * with <b>emissive()</b>, <b>specular()</b>, and <b>shininess()</b> in setting
     * the materal properties of shapes.
     *
     * @param {int | float} gray
     *
     * @returns none
     *
     * @see emissive
     * @see specular
     * @see shininess
    */
    p.ambient = function ambient() {
      // create an alias to shorten code
      var a = arguments;

      // either a shade of gray or a 'color' object.
      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformi("usingMat3d", programObject3D, "usingMat", true);

        if (a.length === 1) {
          // color object was passed in
          if (typeof a[0] === "string") {
            var c = a[0].slice(5, -1).split(",");
            uniformf("mat_ambient3d", programObject3D, "mat_ambient", [c[0] / 255, c[1] / 255, c[2] / 255]);
          }
          // else a single number was passed in for gray shade
          else {
            uniformf("mat_ambient3d", programObject3D, "mat_ambient", [a[0] / 255, a[0] / 255, a[0] / 255]);
          }
        }
        // Otherwise three values were provided (r,g,b)
        else {
          uniformf("mat_ambient3d", programObject3D, "mat_ambient", [a[0] / 255, a[1] / 255, a[2] / 255]);
        }
      }
    };

    /**
     * Sets the emissive color of the material used for drawing shapes
     * drawn to the screen. Used in combination with ambient(), specular(),
     * and shininess() in setting the material properties of shapes.
     *
     * Can be called in the following ways:
     *
     * emissive(gray)
     * @param {int | float} gray number specifying value between white and black
     *
     * emissive(color)
     * @param {color} color any value of the color datatype
     *
     * emissive(v1, v2, v3)
     * @param {int | float} v1 red or hue value
     * @param {int | float} v2 green or saturation value
     * @param {int | float} v3 blue or brightness value
     *
     * @returns none
     *
     * @see ambient
     * @see specular
     * @see shininess
    */
    p.emissive = function emissive() {
      // create an alias to shorten code
      var a = arguments;

      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformi("usingMat3d", programObject3D, "usingMat", true);

        // If only one argument was provided, the user either gave us a
        // shade of gray or a 'color' object.
        if (a.length === 1) {
          // color object was passed in
          if (typeof a[0] === "string") {
            var c = a[0].slice(5, -1).split(",");
            uniformf("mat_emissive3d", programObject3D, "mat_emissive", [c[0] / 255, c[1] / 255, c[2] / 255]);
          }
          // else a regular number was passed in for gray shade
          else {
            uniformf("mat_emissive3d", programObject3D, "mat_emissive", [a[0] / 255, a[0] / 255, a[0] / 255]);
          }
        }
        // Otherwise three values were provided (r,g,b)
        else {
          uniformf("mat_emissive3d", programObject3D, "mat_emissive", [a[0] / 255, a[1] / 255, a[2] / 255]);
        }
      }
    };

    /**
     * Sets the amount of gloss in the surface of shapes. Used in combination with
     * <b>ambient()</b>, <b>specular()</b>, and <b>emissive()</b> in setting the
     * material properties of shapes.
     *
     * @param {float} shine degree of shininess
     *
     * @returns none
    */
    p.shininess = function shininess(shine) {
      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformi("usingMat3d", programObject3D, "usingMat", true);
        uniformf("shininess3d", programObject3D, "shininess", shine);
      }
    };

    /**
     * Sets the specular color of the materials used for shapes drawn to the screen,
     * which sets the color of hightlights. Specular refers to light which bounces
     * off a surface in a perferred direction (rather than bouncing in all directions
     * like a diffuse light). Used in combination with emissive(), ambient(), and
     * shininess() in setting the material properties of shapes.
     *
     * Can be called in the following ways:
     *
     * specular(gray)
     * @param {int | float} gray number specifying value between white and black
     *
     * specular(gray, alpha)
     * @param {int | float} gray number specifying value between white and black
     * @param {int | float} alpha opacity
     *
     * specular(color)
     * @param {color} color any value of the color datatype
     *
     * specular(v1, v2, v3)
     * @param {int | float} v1 red or hue value
     * @param {int | float} v2 green or saturation value
     * @param {int | float} v3 blue or brightness value
     *
     * specular(v1, v2, v3, alpha)
     * @param {int | float} v1 red or hue value
     * @param {int | float} v2 green or saturation value
     * @param {int | float} v3 blue or brightness value
     * @param {int | float} alpha opacity
     *
     * @returns none
     *
     * @see ambient
     * @see emissive
     * @see shininess
    */
    p.specular = function specular() {
      var c = p.color.apply(this, arguments);

      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformi("usingMat3d", programObject3D, "usingMat", true);
        uniformf("mat_specular3d", programObject3D, "mat_specular", p.color.toGLArray(c).slice(0, 3));
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Coordinates
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Takes a three-dimensional X, Y, Z position and returns the X value for
     * where it will appear on a (two-dimensional) screen.
     *
     * @param {int | float} x 3D x coordinate to be mapped
     * @param {int | float} y 3D y coordinate to be mapped
     * @param {int | float} z 3D z coordinate to be mapped
     *
     * @returns {float}
     *
     * @see screenY
     * @see screenZ
    */
    p.screenX = function screenX( x, y, z ) {
      var mv = modelView.array();
      var pj = projection.array();

      var ax = mv[ 0]*x + mv[ 1]*y + mv[ 2]*z + mv[ 3];
      var ay = mv[ 4]*x + mv[ 5]*y + mv[ 6]*z + mv[ 7];
      var az = mv[ 8]*x + mv[ 9]*y + mv[10]*z + mv[11];
      var aw = mv[12]*x + mv[13]*y + mv[14]*z + mv[15];

      var ox = pj[ 0]*ax + pj[ 1]*ay + pj[ 2]*az + pj[ 3]*aw;
      var ow = pj[12]*ax + pj[13]*ay + pj[14]*az + pj[15]*aw;

      if ( ow !== 0 ){
        ox /= ow;
      }
      return p.width * ( 1 + ox ) / 2.0;
    };

    /**
     * Takes a three-dimensional X, Y, Z position and returns the Y value for
     * where it will appear on a (two-dimensional) screen.
     *
     * @param {int | float} x 3D x coordinate to be mapped
     * @param {int | float} y 3D y coordinate to be mapped
     * @param {int | float} z 3D z coordinate to be mapped
     *
     * @returns {float}
     *
     * @see screenX
     * @see screenZ
    */
    p.screenY = function screenY( x, y, z ) {
      var mv = modelView.array();
      var pj = projection.array();

      var ax = mv[ 0]*x + mv[ 1]*y + mv[ 2]*z + mv[ 3];
      var ay = mv[ 4]*x + mv[ 5]*y + mv[ 6]*z + mv[ 7];
      var az = mv[ 8]*x + mv[ 9]*y + mv[10]*z + mv[11];
      var aw = mv[12]*x + mv[13]*y + mv[14]*z + mv[15];

      var oy = pj[ 4]*ax + pj[ 5]*ay + pj[ 6]*az + pj[ 7]*aw;
      var ow = pj[12]*ax + pj[13]*ay + pj[14]*az + pj[15]*aw;

      if ( ow !== 0 ){
        oy /= ow;
      }
      return p.height * ( 1 + oy ) / 2.0;
    };

    /**
     * Takes a three-dimensional X, Y, Z position and returns the Z value for
     * where it will appear on a (two-dimensional) screen.
     *
     * @param {int | float} x 3D x coordinate to be mapped
     * @param {int | float} y 3D y coordinate to be mapped
     * @param {int | float} z 3D z coordinate to be mapped
     *
     * @returns {float}
     *
     * @see screenX
     * @see screenY
    */
    p.screenZ = function screenZ( x, y, z ) {
      var mv = modelView.array();
      var pj = projection.array();

      var ax = mv[ 0]*x + mv[ 1]*y + mv[ 2]*z + mv[ 3];
      var ay = mv[ 4]*x + mv[ 5]*y + mv[ 6]*z + mv[ 7];
      var az = mv[ 8]*x + mv[ 9]*y + mv[10]*z + mv[11];
      var aw = mv[12]*x + mv[13]*y + mv[14]*z + mv[15];

      var oz = pj[ 8]*ax + pj[ 9]*ay + pj[10]*az + pj[11]*aw;
      var ow = pj[12]*ax + pj[13]*ay + pj[14]*az + pj[15]*aw;

      if ( ow !== 0 ) {
        oz /= ow;
      }
      return ( oz + 1 ) / 2.0;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Style functions
    ////////////////////////////////////////////////////////////////////////////
    /**
     * The fill() function sets the color used to fill shapes. For example, if you run <b>fill(204, 102, 0)</b>, all subsequent shapes will be filled with orange.
     * This color is either specified in terms of the RGB or HSB color depending on the current <b>colorMode()</b>
     *(the default color space is RGB, with each value in the range from 0 to 255).
     * <br><br>When using hexadecimal notation to specify a color, use "#" or "0x" before the values (e.g. #CCFFAA, 0xFFCCFFAA).
     * The # syntax uses six digits to specify a color (the way colors are specified in HTML and CSS). When using the hexadecimal notation starting with "0x",
     * the hexadecimal value must be specified with eight characters; the first two characters define the alpha component and the remainder the red, green, and blue components.
     * <br><br>The value for the parameter "gray" must be less than or equal to the current maximum value as specified by <b>colorMode()</b>. The default maximum value is 255.
     * <br><br>To change the color of an image (or a texture), use tint().
     *
     * @param {int|float} gray    number specifying value between white and black
     * @param {int|float} value1  red or hue value
     * @param {int|float} value2  green or saturation value
     * @param {int|float} value3  blue or brightness value
     * @param {int|float} alpha   opacity of the fill
     * @param {Color} color       any value of the color datatype
     * @param {int} hex           color value in hexadecimal notation (i.e. #FFCC00 or 0xFFFFCC00)
     *
     * @see #noFill()
     * @see #stroke()
     * @see #tint()
     * @see #background()
     * @see #colorMode()
     */
    p.fill = function fill() {
      var color = p.color(arguments[0], arguments[1], arguments[2], arguments[3]);
      if(color === currentFillColor && doFill) {
        return;
      }
      doFill = true;
      currentFillColor = color;

      if (p.use3DContext) {
        fillStyle = p.color.toGLArray(color);
      } else {
        isFillDirty = true;
      }
    };

    function executeContextFill() {
      if(doFill) {
        if(isFillDirty) {
          curContext.fillStyle = p.color.toString(currentFillColor);
          isFillDirty = false;
        }
        curContext.fill();
      }
    }

    /**
     * The noFill() function disables filling geometry. If both <b>noStroke()</b> and <b>noFill()</b>
     * are called, no shapes will be drawn to the screen.
     *
     * @see #fill()
     *
     */
    p.noFill = function noFill() {
      doFill = false;
    };

    /**
     * The stroke() function sets the color used to draw lines and borders around shapes. This color
     * is either specified in terms of the RGB or HSB color depending on the
     * current <b>colorMode()</b> (the default color space is RGB, with each
     * value in the range from 0 to 255).
     * <br><br>When using hexadecimal notation to specify a color, use "#" or
     * "0x" before the values (e.g. #CCFFAA, 0xFFCCFFAA). The # syntax uses six
     * digits to specify a color (the way colors are specified in HTML and CSS).
     * When using the hexadecimal notation starting with "0x", the hexadecimal
     * value must be specified with eight characters; the first two characters
     * define the alpha component and the remainder the red, green, and blue
     * components.
     * <br><br>The value for the parameter "gray" must be less than or equal
     * to the current maximum value as specified by <b>colorMode()</b>.
     * The default maximum value is 255.
     *
     * @param {int|float} gray    number specifying value between white and black
     * @param {int|float} value1  red or hue value
     * @param {int|float} value2  green or saturation value
     * @param {int|float} value3  blue or brightness value
     * @param {int|float} alpha   opacity of the stroke
     * @param {Color} color       any value of the color datatype
     * @param {int} hex           color value in hexadecimal notation (i.e. #FFCC00 or 0xFFFFCC00)
     *
     * @see #fill()
     * @see #noStroke()
     * @see #tint()
     * @see #background()
     * @see #colorMode()
     */
    p.stroke = function stroke() {
      var color = p.color(arguments[0], arguments[1], arguments[2], arguments[3]);
      if(color === currentStrokeColor && doStroke) {
        return;
      }
      doStroke = true;
      currentStrokeColor = color;

      if (p.use3DContext) {
        strokeStyle = p.color.toGLArray(color);
      } else {
        isStrokeDirty = true;
      }
    };

    function executeContextStroke() {
      if(doStroke) {
        if(isStrokeDirty) {
          curContext.strokeStyle = p.color.toString(currentStrokeColor);
          isStrokeDirty = false;
        }
        curContext.stroke();
      }
    }

    /**
     * The noStroke() function disables drawing the stroke (outline). If both <b>noStroke()</b> and
     * <b>noFill()</b> are called, no shapes will be drawn to the screen.
     *
     * @see #stroke()
     */
    p.noStroke = function noStroke() {
      doStroke = false;
    };

    /**
     * The strokeWeight() function sets the width of the stroke used for lines, points, and the border around shapes.
     * All widths are set in units of pixels.
     *
     * @param {int|float} w the weight (in pixels) of the stroke
     */
    p.strokeWeight = function strokeWeight(w) {
      lineWidth = w;

      if (p.use3DContext) {
        curContext.useProgram(programObject2D);
        uniformf("pointSize2d", programObject2D, "pointSize", w);
      } else {
        curContext.lineWidth = w;
      }
    };

    /**
     * The strokeCap() function sets the style for rendering line endings. These ends are either squared, extended, or rounded and
     * specified with the corresponding parameters SQUARE, PROJECT, and ROUND. The default cap is ROUND.
     * This function is not available with the P2D, P3D, or OPENGL renderers
     *
     * @param {int} value Either SQUARE, PROJECT, or ROUND
     */
    p.strokeCap = function strokeCap(value) {
      curContext.lineCap = value;
    };

    /**
     * The strokeJoin() function sets the style of the joints which connect line segments.
     * These joints are either mitered, beveled, or rounded and specified with the corresponding parameters MITER, BEVEL, and ROUND. The default joint is MITER.
     * This function is not available with the P2D, P3D, or OPENGL renderers
     *
     * @param {int} value Either SQUARE, PROJECT, or ROUND
     */
    p.strokeJoin = function strokeJoin(value) {
      curContext.lineJoin = value;
    };

    /**
     * The smooth() function draws all geometry with smooth (anti-aliased) edges. This will slow down the frame rate of the application,
     * but will enhance the visual refinement. <br/><br/>
     * Note that smooth() will also improve image quality of resized images, and noSmooth() will disable image (and font) smoothing altogether.
     *
     * @see #noSmooth()
     * @see #hint()
     * @see #size()
     */
    p.smooth = function() {
      curElement.style.setProperty("image-rendering", "optimizeQuality", "important");
      if (!p.use3DContext && "mozImageSmoothingEnabled" in curContext) {
        curContext.mozImageSmoothingEnabled = true;
      }
    };

    /**
     * The noSmooth() function draws all geometry with jagged (aliased) edges.
     *
     * @see #smooth()
     */
    p.noSmooth = function() {
      curElement.style.setProperty("image-rendering", "optimizeSpeed", "important");
      if (!p.use3DContext && "mozImageSmoothingEnabled" in curContext) {
        curContext.mozImageSmoothingEnabled = false;
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Vector drawing functions
    ////////////////////////////////////////////////////////////////////////////

    function colorBlendWithAlpha(c1, c2, k) {
        var f = 0|(k * ((c2 & PConstants.ALPHA_MASK) >>> 24));
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                p.mix(c1 & PConstants.RED_MASK, c2 & PConstants.RED_MASK, f) & PConstants.RED_MASK |
                p.mix(c1 & PConstants.GREEN_MASK, c2 & PConstants.GREEN_MASK, f) & PConstants.GREEN_MASK |
                p.mix(c1 & PConstants.BLUE_MASK, c2 & PConstants.BLUE_MASK, f));
    }

    /**
     * The point() function draws a point, a coordinate in space at the dimension of one pixel.
     * The first parameter is the horizontal value for the point, the second
     * value is the vertical value for the point, and the optional third value
     * is the depth value. Drawing this shape in 3D using the <b>z</b>
     * parameter requires the P3D or OPENGL parameter in combination with
     * size as shown in the above example.
     *
     * @param {int|float} x x-coordinate of the point
     * @param {int|float} y y-coordinate of the point
     * @param {int|float} z z-coordinate of the point
     *
     * @see #beginShape()
     */
    p.point = function point(x, y, z) {
      if (p.use3DContext) {
        var model = new PMatrix3D();

        // move point to position
        model.translate(x, y, z || 0);
        model.transpose();

        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.transpose();

        var proj = new PMatrix3D();
        proj.set(projection);
        proj.transpose();

        curContext.useProgram(programObject2D);
        uniformMatrix("model2d", programObject2D, "model", false, model.array());
        uniformMatrix("view2d", programObject2D, "view", false, view.array());
        uniformMatrix("projection2d", programObject2D, "projection", false, proj.array());

        if (lineWidth > 0 && doStroke) {
          // this will be replaced with the new bit shifting color code
          uniformf("color2d", programObject2D, "color", strokeStyle);
          uniformi("picktype2d", programObject2D, "picktype", 0);

          vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, pointBuffer);
          disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");

          curContext.drawArrays(curContext.POINTS, 0, 1);
        }
      } else {
        if (doStroke) {
          // TODO if strokeWeight > 1, do circle

          if (curSketch.options.crispLines) {
            var alphaOfPointWeight = Math.PI / 4;  // TODO dependency of strokeWeight
            var c = p.get(x, y);
            p.set(x, y, colorBlendWithAlpha(c, currentStrokeColor, alphaOfPointWeight));
          } else {
            if (lineWidth > 1){
              curContext.fillStyle = p.color.toString(currentStrokeColor);
              isFillDirty = true;
              curContext.beginPath();
              curContext.arc(x, y, lineWidth / 2, 0, PConstants.TWO_PI, false);
              curContext.fill();
              curContext.closePath();
            } else {
              curContext.fillStyle = p.color.toString(currentStrokeColor);
              curContext.fillRect(Math.round(x), Math.round(y), 1, 1);
              isFillDirty = true;
            }
          }
        }
      }
    };

    /**
     * Using the <b>beginShape()</b> and <b>endShape()</b> functions allow creating more complex forms.
     * <b>beginShape()</b> begins recording vertices for a shape and <b>endShape()</b> stops recording.
     * The value of the <b>MODE</b> parameter tells it which types of shapes to create from the provided vertices.
     * With no mode specified, the shape can be any irregular polygon. After calling the <b>beginShape()</b> function,
     * a series of <b>vertex()</b> commands must follow. To stop drawing the shape, call <b>endShape()</b>.
     * The <b>vertex()</b> function with two parameters specifies a position in 2D and the <b>vertex()</b>
     * function with three parameters specifies a position in 3D. Each shape will be outlined with the current
     * stroke color and filled with the fill color.
     *
     * @param {int} MODE either POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, and QUAD_STRIP.
     *
     * @see endShape
     * @see vertex
     * @see curveVertex
     * @see bezierVertex
     */
    p.beginShape = function beginShape(type) {
      curShape = type;
      curvePoints = [];
      vertArray = [];
    };

    /**
     * All shapes are constructed by connecting a series of vertices. <b>vertex()</b> is used to specify the vertex
     * coordinates for points, lines, triangles, quads, and polygons and is used exclusively within the <b>beginShape()</b>
     * and <b>endShape()</b> function. <br /><br />Drawing a vertex in 3D using the <b>z</b> parameter requires the P3D or
     * OPENGL parameter in combination with size as shown in the above example.<br /><br />This function is also used to map a
     * texture onto the geometry. The <b>texture()</b> function declares the texture to apply to the geometry and the <b>u</b>
     * and <b>v</b> coordinates set define the mapping of this texture to the form. By default, the coordinates used for
     * <b>u</b> and <b>v</b> are specified in relation to the image's size in pixels, but this relation can be changed with
     * <b>textureMode()</b>.
     *
     * @param {int | float} x x-coordinate of the vertex
     * @param {int | float} y y-coordinate of the vertex
     * @param {int | float} z z-coordinate of the vertex
     * @param {int | float} u horizontal coordinate for the texture mapping
     * @param {int | float} v vertical coordinate for the texture mapping
     *
     * @see beginShape
     * @see endShape
     * @see bezierVertex
     * @see curveVertex
     * @see texture
     */
    p.vertex = function vertex() {
      var vert = [];

      if (firstVert) { firstVert = false; }

      if (arguments.length === 4) { //x, y, u, v
        vert[0] = arguments[0];
        vert[1] = arguments[1];
        vert[2] = 0;
        vert[3] = arguments[2];
        vert[4] = arguments[3];
      } else { // x, y, z, u, v
        vert[0] = arguments[0];
        vert[1] = arguments[1];
        vert[2] = arguments[2] || 0;
        vert[3] = arguments[3] || 0;
        vert[4] = arguments[4] || 0;
      }

      vert["isVert"] =  true;

      if (p.use3DContext) {
        // fill rgba
        vert[5] = fillStyle[0];
        vert[6] = fillStyle[1];
        vert[7] = fillStyle[2];
        vert[8] = fillStyle[3];
        // stroke rgba
        vert[9] = strokeStyle[0];
        vert[10] = strokeStyle[1];
        vert[11] = strokeStyle[2];
        vert[12] = strokeStyle[3];
        //normals
        vert[13] = normalX;
        vert[14] = normalY;
        vert[15] = normalZ;
      } else {
        // fill and stroke color
        vert[5] = currentFillColor;
        vert[6] = currentStrokeColor;
      }

      vertArray.push(vert);
    };

    /**
     * @private
     * Renders 3D points created from calls to vertex and beginShape/endShape
     *
     * @param {Array} vArray an array of vertex coordinate
     * @param {Array} cArray an array of colours used for the vertices
     *
     * @see beginShape
     * @see endShape
     * @see vertex
     */
    var point3D = function point3D(vArray, cArray){
      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

      var proj = new PMatrix3D();
      proj.set(projection);
      proj.transpose();

      curContext.useProgram(programObjectUnlitShape);
      uniformMatrix("uViewUS", programObjectUnlitShape, "uView", false, view.array());
      uniformMatrix("uProjectionUS", programObjectUnlitShape, "uProjection", false, proj.array());

      vertexAttribPointer("aVertexUS", programObjectUnlitShape, "aVertex", 3, pointBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(vArray), curContext.STREAM_DRAW);

      vertexAttribPointer("aColorUS", programObjectUnlitShape, "aColor", 4, fillColorBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(cArray), curContext.STREAM_DRAW);

      curContext.drawArrays(curContext.POINTS, 0, vArray.length/3);
    };

    /**
     * @private
     * Renders 3D lines created from calls to beginShape/vertex/endShape - based on the mode specified LINES, LINE_LOOP, etc.
     *
     * @param {Array} vArray an array of vertex coordinate
     * @param {String} mode  either LINES, LINE_LOOP, or LINE_STRIP
     * @param {Array} cArray an array of colours used for the vertices
     *
     * @see beginShape
     * @see endShape
     * @see vertex
     */
    var line3D = function line3D(vArray, mode, cArray){
      var ctxMode;
      if (mode === "LINES"){
        ctxMode = curContext.LINES;
      }
      else if(mode === "LINE_LOOP"){
        ctxMode = curContext.LINE_LOOP;
      }
      else{
        ctxMode = curContext.LINE_STRIP;
      }

      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

      var proj = new PMatrix3D();
      proj.set(projection);
      proj.transpose();

      curContext.useProgram(programObjectUnlitShape);
      uniformMatrix("uViewUS", programObjectUnlitShape, "uView", false, view.array());
      uniformMatrix("uProjectionUS", programObjectUnlitShape, "uProjection", false, proj.array());

      vertexAttribPointer("aVertexUS", programObjectUnlitShape, "aVertex", 3, lineBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(vArray), curContext.STREAM_DRAW);

      vertexAttribPointer("aColorUS", programObjectUnlitShape, "aColor", 4, strokeColorBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(cArray), curContext.STREAM_DRAW);

      curContext.lineWidth(lineWidth);

      curContext.drawArrays(ctxMode, 0, vArray.length/3);
    };

    /**
     * @private
     * Render filled shapes created from calls to beginShape/vertex/endShape - based on the mode specified TRIANGLES, etc.
     *
     * @param {Array} vArray an array of vertex coordinate
     * @param {String} mode  either LINES, LINE_LOOP, or LINE_STRIP
     * @param {Array} cArray an array of colours used for the vertices
     * @param {Array} tArray an array of u,v coordinates for textures
     *
     * @see beginShape
     * @see endShape
     * @see vertex
     */
    var fill3D = function fill3D(vArray, mode, cArray, tArray){
      var ctxMode;
      if(mode === "TRIANGLES"){
        ctxMode = curContext.TRIANGLES;
      }
      else if(mode === "TRIANGLE_FAN"){
        ctxMode = curContext.TRIANGLE_FAN;
      }
      else{
        ctxMode = curContext.TRIANGLE_STRIP;
      }

      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

      var proj = new PMatrix3D();
      proj.set(projection);
      proj.transpose();

      curContext.useProgram( programObject3D );
      uniformMatrix("model3d", programObject3D, "model", false,  [1,0,0,0,  0,1,0,0,   0,0,1,0,   0,0,0,1] );
      uniformMatrix("view3d", programObject3D, "view", false, view.array() );
      uniformMatrix("projection3d", programObject3D, "projection", false, proj.array() );

      curContext.enable( curContext.POLYGON_OFFSET_FILL );
      curContext.polygonOffset( 1, 1 );

      uniformf("color3d", programObject3D, "color", [-1,0,0,0]);

      vertexAttribPointer("vertex3d", programObject3D, "Vertex", 3, fillBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(vArray), curContext.STREAM_DRAW);

      vertexAttribPointer("aColor3d", programObject3D, "aColor", 4, fillColorBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(cArray), curContext.STREAM_DRAW);

      // No support for lights....yet
      disableVertexAttribPointer("normal3d", programObject3D, "Normal");

      var i;

      if(usingTexture){
        if(curTextureMode === PConstants.IMAGE){
          for(i = 0; i < tArray.length; i += 2){
            tArray[i] = tArray[i]/curTexture.width;
            tArray[i+1] /= curTexture.height;
          }
        }

        // hack to handle when users specifies values
        // greater than 1.0 for texture coords.
        for(i = 0; i < tArray.length; i += 2){
          if( tArray[i+0] > 1.0 ){ tArray[i+0] -= (tArray[i+0] - 1.0);}
          if( tArray[i+1] > 1.0 ){ tArray[i+1] -= (tArray[i+1] - 1.0);}
        }

        uniformi("usingTexture3d", programObject3D, "usingTexture", usingTexture);
        vertexAttribPointer("aTexture3d", programObject3D, "aTexture", 2, shapeTexVBO);
        curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(tArray), curContext.STREAM_DRAW);
      }

      curContext.drawArrays( ctxMode, 0, vArray.length/3 );
      curContext.disable( curContext.POLYGON_OFFSET_FILL );
    };

    /**
     * The endShape() function is the companion to beginShape() and may only be called after beginShape().
     * When endshape() is called, all of image data defined since the previous call to beginShape() is written
     * into the image buffer.
     *
     * @param {int} MODE Use CLOSE to close the shape
     *
     * @see beginShape
     */
    p.endShape = function endShape(mode){
      var closeShape = mode === PConstants.CLOSE;
      var lineVertArray = [];
      var fillVertArray = [];
      var colorVertArray = [];
      var strokeVertArray = [];
      var texVertArray = [];

      firstVert = true;
      var i, j, k;
      var last = vertArray.length - 1;

      for (i = 0; i < vertArray.length; i++) {
        for (j = 0; j < 3; j++) {
          fillVertArray.push(vertArray[i][j]);
        }
      }

      // 5,6,7,8
      // R,G,B,A - fill colour
      for (i = 0; i < vertArray.length; i++) {
        for (j = 5; j < 9; j++) {
          colorVertArray.push(vertArray[i][j]);
        }
      }

      // 9,10,11,12
      // R, G, B, A - stroke colour
      for (i = 0; i < vertArray.length; i++) {
        for (j = 9; j < 13; j++) {
          strokeVertArray.push(vertArray[i][j]);
        }
      }

      // texture u,v
      for (i = 0; i < vertArray.length; i++) {
        texVertArray.push(vertArray[i][3]);
        texVertArray.push(vertArray[i][4]);
      }

      // if shape is closed, push the first point into the last point (including colours)
      if (closeShape) {
        fillVertArray.push(vertArray[0][0]);
        fillVertArray.push(vertArray[0][1]);
        fillVertArray.push(vertArray[0][2]);

        for (i = 5; i < 9; i++) {
          colorVertArray.push(vertArray[0][i]);
        }

       for (i = 9; i < 13; i++) {
          strokeVertArray.push(vertArray[0][i]);
        }

        texVertArray.push(vertArray[0][3]);
        texVertArray.push(vertArray[0][4]);
      }

      // curveVertex
      if ( isCurve && (curShape === PConstants.POLYGON || curShape === undef) ) {
        if (p.use3DContext) {
          lineVertArray = fillVertArray;
          if (doStroke) {
            line3D(lineVertArray, null, strokeVertArray);
          }
          if (doFill) {
            fill3D(fillVertArray, null, colorVertArray); // fill isn't working in 3d curveVertex
          }
        } else {
          if (vertArray.length > 3) {
            var b = [],
                s = 1 - curTightness;
            curContext.beginPath();
            curContext.moveTo(vertArray[1][0], vertArray[1][1]);
              /*
              * Matrix to convert from Catmull-Rom to cubic Bezier
              * where t = curTightness
              * |0         1          0         0       |
              * |(t-1)/6   1          (1-t)/6   0       |
              * |0         (1-t)/6    1         (t-1)/6 |
              * |0         0          0         0       |
              */
            for (i = 1; (i+2) < vertArray.length; i++) {
              b[0] = [vertArray[i][0], vertArray[i][1]];
              b[1] = [vertArray[i][0] + (s * vertArray[i+1][0] - s * vertArray[i-1][0]) / 6,
                     vertArray[i][1] + (s * vertArray[i+1][1] - s * vertArray[i-1][1]) / 6];
              b[2] = [vertArray[i+1][0] + (s * vertArray[i][0] - s * vertArray[i+2][0]) / 6,
                     vertArray[i+1][1] + (s * vertArray[i][1] - s * vertArray[i+2][1]) / 6];
              b[3] = [vertArray[i+1][0], vertArray[i+1][1]];
              curContext.bezierCurveTo(b[1][0], b[1][1], b[2][0], b[2][1], b[3][0], b[3][1]);
            }
            // close the shape
            if (closeShape) {
              curContext.lineTo(vertArray[0][0], vertArray[0][1]);
            }
            executeContextFill();
            executeContextStroke();
            curContext.closePath();
          }
        }
      }
      // bezierVertex
      else if ( isBezier && (curShape === PConstants.POLYGON || curShape === undef) ) {
        if (p.use3DContext) {
          lineVertArray = fillVertArray;
          lineVertArray.splice(lineVertArray.length - 3);
          strokeVertArray.splice(strokeVertArray.length - 4);
          if (doStroke) {
            line3D(lineVertArray, null, strokeVertArray);
          }
          if (doFill) {
            fill3D(fillVertArray, "TRIANGLES", colorVertArray);
          }

          // TODO: Fill not properly working yet, will fix later
          /*fillVertArray = [];
          colorVertArray = [];
          tempArray.reverse();
          for(i = 0; (i+1) < 10; i++){
            for(j = 0; j < 3; j++){
              fillVertArray.push(tempArray[i][j]);
            }
            for(j = 5; j < 9; j++){
              colorVertArray.push(tempArray[i][j]);
            }
            for(j = 0; j < 3; j++){
              fillVertArray.push(vertArray[i][j]);
            }
            for(j = 5; j < 9; j++){
              colorVertArray.push(vertArray[i][j]);
            }
            for(j = 0; j < 3; j++){
              fillVertArray.push(vertArray[i+1][j]);
            }
            for(j = 5; j < 9; j++){
              colorVertArray.push(vertArray[i][j]);
            }
          }

          strokeVertArray = [];
          for(i = 0; i < tempArray.length/3; i++){
            strokeVertArray.push(255);
            strokeVertArray.push(0);
            strokeVertArray.push(0);
            strokeVertArray.push(255);
          }
          point3D(tempArray, strokeVertArray);*/
        } else {
          curContext.beginPath();
          for (i = 0; i < vertArray.length; i++) {
            if (vertArray[i]["isVert"] === true) { //if it is a vertex move to the position
              if (vertArray[i]["moveTo"] === true) {
                curContext.moveTo(vertArray[i][0], vertArray[i][1]);
              } else if (vertArray[i]["moveTo"] === false){
                curContext.lineTo(vertArray[i][0], vertArray[i][1]);
              } else {
                curContext.moveTo(vertArray[i][0], vertArray[i][1]);
              }
            } else { //otherwise continue drawing bezier
              curContext.bezierCurveTo(vertArray[i][0], vertArray[i][1], vertArray[i][2], vertArray[i][3], vertArray[i][4], vertArray[i][5]);
            }
          }
          // close the shape
          if (closeShape) {
            curContext.lineTo(vertArray[0][0], vertArray[0][1]);
          }
          executeContextFill();
          executeContextStroke();
          curContext.closePath();
        }
      } else {  // render the vertices provided
        if (p.use3DContext) { // in 3D context
          if (curShape === PConstants.POINTS) {       // if POINTS was the specified parameter in beginShape
            for (i = 0; i < vertArray.length; i++) {  // loop through and push the point location information to the array
              for (j = 0; j < 3; j++) {
                lineVertArray.push(vertArray[i][j]);
              }
            }
            point3D(lineVertArray, strokeVertArray);  // render function for points
          } else if (curShape === PConstants.LINES) { // if LINES was the specified parameter in beginShape
            for (i = 0; i < vertArray.length; i++) {  // loop through and push the point location information to the array
              for (j = 0; j < 3; j++) {
                lineVertArray.push(vertArray[i][j]);
              }
            }
            for (i = 0; i < vertArray.length; i++) {  // loop through and push the color information to the array
              for (j = 5; j < 9; j++) {
                colorVertArray.push(vertArray[i][j]);
              }
            }
            line3D(lineVertArray, "LINES", strokeVertArray);  // render function for lines
          } else if (curShape === PConstants.TRIANGLES) {     // if TRIANGLES was the specified parameter in beginShape
            if (vertArray.length > 2) {
              for (i = 0; (i+2) < vertArray.length; i+=3) {   // loop through the array per triangle
                fillVertArray = [];
                texVertArray = [];
                lineVertArray = [];
                colorVertArray = [];
                strokeVertArray = [];
                for (j = 0; j < 3; j++) {
                  for (k = 0; k < 3; k++) {                   // loop through and push
                    lineVertArray.push(vertArray[i+j][k]);    // the line point location information
                    fillVertArray.push(vertArray[i+j][k]);    // and fill point location information
                  }
                }
                for (j = 0; j < 3; j++) {                     // loop through and push the texture information
                  for (k = 3; k < 5; k++) {
                    texVertArray.push(vertArray[i+j][k]);
                  }
                }
                for (j = 0; j < 3; j++) {
                  for (k = 5; k < 9; k++) {                   // loop through and push
                    colorVertArray.push(vertArray[i+j][k]);   // the colour information
                    strokeVertArray.push(vertArray[i+j][k+4]);// and the stroke information
                  }
                }
                if (doStroke) {
                  line3D(lineVertArray, "LINE_LOOP", strokeVertArray );               // line render function
                }
                if (doFill || usingTexture) {
                  fill3D(fillVertArray, "TRIANGLES", colorVertArray, texVertArray);   // fill shape render function
                }
              }
            }
          } else if (curShape === PConstants.TRIANGLE_STRIP) {    // if TRIANGLE_STRIP was the specified parameter in beginShape
            if (vertArray.length > 2) {
              for (i = 0; (i+2) < vertArray.length; i++) {
                lineVertArray = [];
                fillVertArray = [];
                strokeVertArray = [];
                colorVertArray = [];
                texVertArray = [];
                for (j = 0; j < 3; j++) {
                  for (k = 0; k < 3; k++) {
                    lineVertArray.push(vertArray[i+j][k]);
                    fillVertArray.push(vertArray[i+j][k]);
                  }
                }
                for (j = 0; j < 3; j++) {
                  for (k = 3; k < 5; k++) {
                    texVertArray.push(vertArray[i+j][k]);
                  }
                }
                for (j = 0; j < 3; j++) {
                  for (k = 5; k < 9; k++) {
                    strokeVertArray.push(vertArray[i+j][k+4]);
                    colorVertArray.push(vertArray[i+j][k]);
                  }
                }

                if (doFill || usingTexture) {
                  fill3D(fillVertArray, "TRIANGLE_STRIP", colorVertArray, texVertArray);
                }
                if (doStroke) {
                  line3D(lineVertArray, "LINE_LOOP", strokeVertArray);
                }
              }
            }
          } else if (curShape === PConstants.TRIANGLE_FAN) {
            if (vertArray.length > 2) {
              for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                  lineVertArray.push(vertArray[i][j]);
                }
              }
              for (i = 0; i < 3; i++) {
                for (j = 9; j < 13; j++) {
                  strokeVertArray.push(vertArray[i][j]);
                }
              }
              if (doStroke) {
                line3D(lineVertArray, "LINE_LOOP", strokeVertArray);
              }

              for (i = 2; (i+1) < vertArray.length; i++) {
                lineVertArray = [];
                strokeVertArray = [];
                lineVertArray.push(vertArray[0][0]);
                lineVertArray.push(vertArray[0][1]);
                lineVertArray.push(vertArray[0][2]);

                strokeVertArray.push(vertArray[0][9]);
                strokeVertArray.push(vertArray[0][10]);
                strokeVertArray.push(vertArray[0][11]);
                strokeVertArray.push(vertArray[0][12]);

                for (j = 0; j < 2; j++) {
                  for (k = 0; k < 3; k++) {
                    lineVertArray.push(vertArray[i+j][k]);
                  }
                }
                for (j = 0; j < 2; j++) {
                  for (k = 9; k < 13; k++) {
                    strokeVertArray.push(vertArray[i+j][k]);
                  }
                }
                if (doStroke) {
                  line3D(lineVertArray, "LINE_STRIP",strokeVertArray);
                }
              }
              if (doFill || usingTexture) {
                fill3D(fillVertArray, "TRIANGLE_FAN", colorVertArray, texVertArray);
              }
            }
          } else if (curShape === PConstants.QUADS) {
            for (i = 0; (i + 3) < vertArray.length; i+=4) {
              lineVertArray = [];
              for (j = 0; j < 4; j++) {
                for (k = 0; k < 3; k++) {
                  lineVertArray.push(vertArray[i+j][k]);
                }
              }
              if (doStroke) {
                line3D(lineVertArray, "LINE_LOOP",strokeVertArray);
              }

              if (doFill) {
                fillVertArray = [];
                colorVertArray = [];
                texVertArray = [];
                for (j = 0; j < 3; j++) {
                  fillVertArray.push(vertArray[i][j]);
                }
                for (j = 5; j < 9; j++) {
                  colorVertArray.push(vertArray[i][j]);
                }

                for (j = 0; j < 3; j++) {
                  fillVertArray.push(vertArray[i+1][j]);
                }
                for (j = 5; j < 9; j++) {
                  colorVertArray.push(vertArray[i+1][j]);
                }

                for (j = 0; j < 3; j++) {
                  fillVertArray.push(vertArray[i+3][j]);
                }
                for (j = 5; j < 9; j++) {
                  colorVertArray.push(vertArray[i+3][j]);
                }

                for (j = 0; j < 3; j++) {
                  fillVertArray.push(vertArray[i+2][j]);
                }
                for (j = 5; j < 9; j++) {
                  colorVertArray.push(vertArray[i+2][j]);
                }

                if (usingTexture) {
                  texVertArray.push(vertArray[i+0][3]);
                  texVertArray.push(vertArray[i+0][4]);
                  texVertArray.push(vertArray[i+1][3]);
                  texVertArray.push(vertArray[i+1][4]);
                  texVertArray.push(vertArray[i+3][3]);
                  texVertArray.push(vertArray[i+3][4]);
                  texVertArray.push(vertArray[i+2][3]);
                  texVertArray.push(vertArray[i+2][4]);
                }

                fill3D(fillVertArray, "TRIANGLE_STRIP", colorVertArray, texVertArray);
              }
            }
          } else if (curShape === PConstants.QUAD_STRIP) {
            var tempArray = [];
            if (vertArray.length > 3) {
              for (i = 0; i < 2; i++) {
                for (j = 0; j < 3; j++) {
                  lineVertArray.push(vertArray[i][j]);
                }
              }

              for (i = 0; i < 2; i++) {
                for (j = 9; j < 13; j++) {
                  strokeVertArray.push(vertArray[i][j]);
                }
              }

              line3D(lineVertArray, "LINE_STRIP", strokeVertArray);
              if (vertArray.length > 4 && vertArray.length % 2 > 0) {
                tempArray = fillVertArray.splice(fillVertArray.length - 3);
                vertArray.pop();
              }
              for (i = 0; (i+3) < vertArray.length; i+=2) {
                lineVertArray = [];
                strokeVertArray = [];
                for (j = 0; j < 3; j++) {
                  lineVertArray.push(vertArray[i+1][j]);
                }
                for (j = 0; j < 3; j++) {
                  lineVertArray.push(vertArray[i+3][j]);
                }
                for (j = 0; j < 3; j++) {
                  lineVertArray.push(vertArray[i+2][j]);
                }
                for (j = 0; j < 3; j++) {
                  lineVertArray.push(vertArray[i+0][j]);
                }
                for (j = 9; j < 13; j++) {
                  strokeVertArray.push(vertArray[i+1][j]);
                }
                for (j = 9; j < 13; j++) {
                  strokeVertArray.push(vertArray[i+3][j]);
                }
                for (j = 9; j < 13; j++) {
                  strokeVertArray.push(vertArray[i+2][j]);
                }
                for (j = 9; j < 13; j++) {
                  strokeVertArray.push(vertArray[i+0][j]);
                }
                if (doStroke) {
                  line3D(lineVertArray, "LINE_STRIP", strokeVertArray);
                }
              }

              if (doFill || usingTexture) {
                fill3D(fillVertArray, "TRIANGLE_LIST", colorVertArray, texVertArray);
              }
            }
          }
          // If the user didn't specify a type (LINES, TRIANGLES, etc)
          else {
            // If only one vertex was specified, it must be a point
            if (vertArray.length === 1) {
              for (j = 0; j < 3; j++) {
                lineVertArray.push(vertArray[0][j]);
              }
              for (j = 9; j < 13; j++) {
                strokeVertArray.push(vertArray[0][j]);
              }
              point3D(lineVertArray,strokeVertArray);
            } else {
              for (i = 0; i < vertArray.length; i++) {
                for (j = 0; j < 3; j++) {
                  lineVertArray.push(vertArray[i][j]);
                }
                for (j = 5; j < 9; j++) {
                  strokeVertArray.push(vertArray[i][j]);
                }
              }
              if (closeShape) {
                line3D(lineVertArray, "LINE_LOOP", strokeVertArray);
              } else {
                line3D(lineVertArray, "LINE_STRIP", strokeVertArray);
              }

              // fill is ignored if textures are used
              if (doFill || usingTexture) {
                fill3D(fillVertArray, "TRIANGLE_FAN", colorVertArray, texVertArray);
              }
            }
          }
          // everytime beginShape is followed by a call to
          // texture(), texturing it turned back on. We do this to
          // figure out if the shape should be textured or filled
          // with a color.
          usingTexture = false;
          curContext.useProgram(programObject3D);
          uniformi("usingTexture3d", programObject3D, "usingTexture", usingTexture);
        }

        // 2D context
        else {
          if (curShape === PConstants.POINTS) {
            for (i = 0; i < vertArray.length; i++) {
              if (doStroke) {
                p.stroke(vertArray[i][6]);
              }
              p.point(vertArray[i][0], vertArray[i][1]);
            }
          } else if (curShape === PConstants.LINES) {
            for (i = 0; (i + 1) < vertArray.length; i+=2) {
              if (doStroke) {
                p.stroke(vertArray[i+1][6]);
              }
              p.line(vertArray[i][0], vertArray[i][1], vertArray[i+1][0], vertArray[i+1][1]);
            }
          } else if (curShape === PConstants.TRIANGLES) {
            for (i = 0; (i + 2) < vertArray.length; i+=3) {
              curContext.beginPath();
              curContext.moveTo(vertArray[i][0], vertArray[i][1]);
              curContext.lineTo(vertArray[i+1][0], vertArray[i+1][1]);
              curContext.lineTo(vertArray[i+2][0], vertArray[i+2][1]);
              curContext.lineTo(vertArray[i][0], vertArray[i][1]);

              if (doFill) {
                p.fill(vertArray[i+2][5]);
                executeContextFill();
              }
              if (doStroke) {
                p.stroke(vertArray[i+2][6]);
                executeContextStroke();
              }

              curContext.closePath();
            }
          } else if (curShape === PConstants.TRIANGLE_STRIP) {
            for (i = 0; (i+1) < vertArray.length; i++) {
              curContext.beginPath();
              curContext.moveTo(vertArray[i+1][0], vertArray[i+1][1]);
              curContext.lineTo(vertArray[i][0], vertArray[i][1]);

              if (doStroke) {
                p.stroke(vertArray[i+1][6]);
              }
              if (doFill) {
                p.fill(vertArray[i+1][5]);
              }

              if (i + 2 < vertArray.length) {
                curContext.lineTo(vertArray[i+2][0], vertArray[i+2][1]);
                if (doStroke) {
                  p.stroke(vertArray[i+2][6]);
                }
                if (doFill) {
                  p.fill(vertArray[i+2][5]);
                }
              }
              executeContextFill();
              executeContextStroke();
              curContext.closePath();
            }
          } else if (curShape === PConstants.TRIANGLE_FAN) {
            if (vertArray.length > 2) {
              curContext.beginPath();
              curContext.moveTo(vertArray[0][0], vertArray[0][1]);
              curContext.lineTo(vertArray[1][0], vertArray[1][1]);
              curContext.lineTo(vertArray[2][0], vertArray[2][1]);

              if (doFill) {
                p.fill(vertArray[2][5]);
                executeContextFill();
              }
              if (doStroke) {
                p.stroke(vertArray[2][6]);
                executeContextStroke();
              }

              curContext.closePath();
              for (i = 3; i < vertArray.length; i++) {
                curContext.beginPath();
                curContext.moveTo(vertArray[0][0], vertArray[0][1]);
                curContext.lineTo(vertArray[i-1][0], vertArray[i-1][1]);
                curContext.lineTo(vertArray[i][0], vertArray[i][1]);

                if (doFill) {
                  p.fill(vertArray[i][5]);
                  executeContextFill();
                }
                if (doStroke) {
                  p.stroke(vertArray[i][6]);
                  executeContextStroke();
                }

                curContext.closePath();
              }
            }
          } else if (curShape === PConstants.QUADS) {
            for (i = 0; (i + 3) < vertArray.length; i+=4) {
              curContext.beginPath();
              curContext.moveTo(vertArray[i][0], vertArray[i][1]);
              for (j = 1; j < 4; j++) {
                curContext.lineTo(vertArray[i+j][0], vertArray[i+j][1]);
              }
              curContext.lineTo(vertArray[i][0], vertArray[i][1]);

              if (doFill) {
                p.fill(vertArray[i+3][5]);
                executeContextFill();
              }
              if (doStroke) {
                p.stroke(vertArray[i+3][6]);
                executeContextStroke();
              }

              curContext.closePath();
            }
          } else if (curShape === PConstants.QUAD_STRIP) {
            if (vertArray.length > 3) {
              for (i = 0; (i+1) < vertArray.length; i+=2) {
                curContext.beginPath();
                if (i+3 < vertArray.length) {
                  curContext.moveTo(vertArray[i+2][0], vertArray[i+2][1]);
                  curContext.lineTo(vertArray[i][0], vertArray[i][1]);
                  curContext.lineTo(vertArray[i+1][0], vertArray[i+1][1]);
                  curContext.lineTo(vertArray[i+3][0], vertArray[i+3][1]);

                  if (doFill) {
                    p.fill(vertArray[i+3][5]);
                  }
                  if (doStroke) {
                    p.stroke(vertArray[i+3][6]);
                  }
                } else {
                  curContext.moveTo(vertArray[i][0], vertArray[i][1]);
                  curContext.lineTo(vertArray[i+1][0], vertArray[i+1][1]);
                }
                executeContextFill();
                executeContextStroke();
                curContext.closePath();
              }
            }
          } else {
            curContext.beginPath();
            curContext.moveTo(vertArray[0][0], vertArray[0][1]);
            for (i = 1; i < vertArray.length; i++) {
              if (vertArray[i]["isVert"] === true ) { //if it is a vertex move to the position
                if (vertArray[i]["moveTo"] === true) {
                  curContext.moveTo(vertArray[i][0], vertArray[i][1]);
                } else if (vertArray[i]["moveTo"] === false){
                  curContext.lineTo(vertArray[i][0], vertArray[i][1]);
                } else {
                  curContext.lineTo(vertArray[i][0], vertArray[i][1]);
                }
              }
            }
            if (closeShape) {
              curContext.lineTo(vertArray[0][0], vertArray[0][1]);
            }
            executeContextFill();
            executeContextStroke();
            curContext.closePath();
          }
        }
      }
      isCurve = false;
      isBezier = false;
      curveVertArray = [];
      curveVertCount = 0;
    };

    /**
     * The function splineForward() setup forward-differencing matrix to be used for speedy
     * curve rendering. It's based on using a specific number
     * of curve segments and just doing incremental adds for each
     * vertex of the segment, rather than running the mathematically
     * expensive cubic equation. This function is used by both curveDetail and bezierDetail.
     *
     * @param {int} segments      number of curve segments to use when drawing
     * @param {PMatrix3D} matrix  target object for the new matrix
     */
    var splineForward = function(segments, matrix) {
      var f = 1.0 / segments;
      var ff = f * f;
      var fff = ff * f;

      matrix.set(0, 0, 0, 1, fff, ff, f, 0, 6 * fff, 2 * ff, 0, 0, 6 * fff, 0, 0, 0);
    };

    /**
     * The curveInit() function set the number of segments to use when drawing a Catmull-Rom
     * curve, and setting the s parameter, which defines how tightly
     * the curve fits to each vertex. Catmull-Rom curves are actually
     * a subset of this curve type where the s is set to zero.
     * This in an internal function used by curveDetail() and curveTightness().
     */
    var curveInit = function() {
      // allocate only if/when used to save startup time
      if (!curveDrawMatrix) {
        curveBasisMatrix = new PMatrix3D();
        curveDrawMatrix = new PMatrix3D();
        curveInited = true;
      }

      var s = curTightness;
      curveBasisMatrix.set((s - 1) / 2, (s + 3) / 2, (-3 - s) / 2, (1 - s) / 2,
                           (1 - s), (-5 - s) / 2, (s + 2), (s - 1) / 2,
                           (s - 1) / 2, 0, (1 - s) / 2, 0, 0, 1, 0, 0);

      splineForward(curveDet, curveDrawMatrix);

      if (!bezierBasisInverse) {
        //bezierBasisInverse = bezierBasisMatrix.get();
        //bezierBasisInverse.invert();
        curveToBezierMatrix = new PMatrix3D();
      }

      // TODO only needed for PGraphicsJava2D? if so, move it there
      // actually, it's generally useful for other renderers, so keep it
      // or hide the implementation elsewhere.
      curveToBezierMatrix.set(curveBasisMatrix);
      curveToBezierMatrix.preApply(bezierBasisInverse);

      // multiply the basis and forward diff matrices together
      // saves much time since this needn't be done for each curve
      curveDrawMatrix.apply(curveBasisMatrix);
    };

    /**
     * Specifies vertex coordinates for Bezier curves. Each call to <b>bezierVertex()</b> defines the position of two control
     * points and one anchor point of a Bezier curve, adding a new segment to a line or shape. The first time
     * <b>bezierVertex()</b> is used within a <b>beginShape()</b> call, it must be prefaced with a call to <b>vertex()</b>
     * to set the first anchor point. This function must be used between <b>beginShape()</b> and <b>endShape()</b> and only
     * when there is no MODE parameter specified to <b>beginShape()</b>. Using the 3D version of requires rendering with P3D
     * or OPENGL (see the Environment reference for more information). <br /> <br /> <b>NOTE: </b> Fill does not work properly yet.
     *
     * @param {float | int} cx1 The x-coordinate of 1st control point
     * @param {float | int} cy1 The y-coordinate of 1st control point
     * @param {float | int} cz1 The z-coordinate of 1st control point
     * @param {float | int} cx2 The x-coordinate of 2nd control point
     * @param {float | int} cy2 The y-coordinate of 2nd control point
     * @param {float | int} cz2 The z-coordinate of 2nd control point
     * @param {float | int} x   The x-coordinate of the anchor point
     * @param {float | int} y   The y-coordinate of the anchor point
     * @param {float | int} z   The z-coordinate of the anchor point
     *
     * @see curveVertex
     * @see vertex
     * @see bezier
     */
    p.bezierVertex = function bezierVertex() {
      isBezier = true;
      var vert = [];
      if (firstVert) {
        throw ("vertex() must be used at least once before calling bezierVertex()");
      } else {
        if (arguments.length === 9) {
          if (p.use3DContext) {
            if (bezierDrawMatrix === undef) {
              bezierDrawMatrix = new PMatrix3D();
            }
            // setup matrix for forward differencing to speed up drawing
            var lastPoint = vertArray.length - 1;
            splineForward( bezDetail, bezierDrawMatrix );
            bezierDrawMatrix.apply( bezierBasisMatrix );
            var draw = bezierDrawMatrix.array();
            var x1 = vertArray[lastPoint][0],
                y1 = vertArray[lastPoint][1],
                z1 = vertArray[lastPoint][2];
            var xplot1 = draw[4] * x1 + draw[5] * arguments[0] + draw[6] * arguments[3] + draw[7] * arguments[6];
            var xplot2 = draw[8] * x1 + draw[9] * arguments[0] + draw[10]* arguments[3] + draw[11]* arguments[6];
            var xplot3 = draw[12]* x1 + draw[13]* arguments[0] + draw[14]* arguments[3] + draw[15]* arguments[6];

            var yplot1 = draw[4] * y1 + draw[5] * arguments[1] + draw[6] * arguments[4] + draw[7] * arguments[7];
            var yplot2 = draw[8] * y1 + draw[9] * arguments[1] + draw[10]* arguments[4] + draw[11]* arguments[7];
            var yplot3 = draw[12]* y1 + draw[13]* arguments[1] + draw[14]* arguments[4] + draw[15]* arguments[7];

            var zplot1 = draw[4] * z1 + draw[5] * arguments[2] + draw[6] * arguments[5] + draw[7] * arguments[8];
            var zplot2 = draw[8] * z1 + draw[9] * arguments[2] + draw[10]* arguments[5] + draw[11]* arguments[8];
            var zplot3 = draw[12]* z1 + draw[13]* arguments[2] + draw[14]* arguments[5] + draw[15]* arguments[8];
            for (var j = 0; j < bezDetail; j++) {
              x1 += xplot1; xplot1 += xplot2; xplot2 += xplot3;
              y1 += yplot1; yplot1 += yplot2; yplot2 += yplot3;
              z1 += zplot1; zplot1 += zplot2; zplot2 += zplot3;
              p.vertex(x1, y1, z1);
            }
            p.vertex(arguments[6], arguments[7], arguments[8]);
          }
        } else {
          for (var i = 0; i < arguments.length; i++) {
            vert[i] = arguments[i];
          }
          vertArray.push(vert);
          vertArray[vertArray.length -1]["isVert"] = false;
        }
      }
    };

    // texImage2D function changed http://www.khronos.org/webgl/public-mailing-list/archives/1007/msg00034.html
    // This method tries the new argument pattern first and falls back to the old version
    var executeTexImage2D = function () {
      var canvas2d = document.createElement('canvas');

      try { // new way.
        curContext.texImage2D(curContext.TEXTURE_2D, 0, curContext.RGBA, curContext.RGBA, curContext.UNSIGNED_BYTE, canvas2d);
        executeTexImage2D = function(texture) {
          curContext.texImage2D(curContext.TEXTURE_2D, 0, curContext.RGBA, curContext.RGBA, curContext.UNSIGNED_BYTE, texture);
        };
      } catch (e) {
        executeTexImage2D = function(texture) {
          curContext.texImage2D(curContext.TEXTURE_2D, 0, texture, false);
        };
      }

      executeTexImage2D.apply(this, arguments);
    };

    /**
     * Sets a texture to be applied to vertex points. The <b>texture()</b> function
     * must be called between <b>beginShape()</b> and <b>endShape()</b> and before
     * any calls to vertex().
     *
     * When textures are in use, the fill color is ignored. Instead, use tint() to
     * specify the color of the texture as it is applied to the shape.
     *
     * @param {PImage} pimage the texture to apply
     *
     * @returns none
     *
     * @see textureMode
     * @see beginShape
     * @see endShape
     * @see vertex
    */
    p.texture = function(pimage) {
      if (pimage.localName === "canvas") {
        curContext.bindTexture(curContext.TEXTURE_2D, canTex);
        executeTexImage2D(pimage);
        curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_MAG_FILTER, curContext.LINEAR);
        curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_MIN_FILTER, curContext.LINEAR);
        curContext.generateMipmap(curContext.TEXTURE_2D);
      } else if (!pimage.__texture) {
        var texture = curContext.createTexture();
        pimage.__texture = texture;

        var cvs = document.createElement('canvas');

        var pot;

        // WebGL requires power of two textures
        if (pimage.width & (pimage.width-1) === 0) {
          cvs.width = pimage.width;
        } else {
          pot = 1;
          while (pot < pimage.width) {
            pot *= 2;
          }
          cvs.width = pot;
        }

        if (pimage.height & (pimage.height-1) === 0) {
          cvs.height = pimage.height;
        } else {
          pot = 1;
          while (pot < pimage.height) {
            pot *= 2;
          }
          cvs.height = pot;
        }

        var ctx = cvs.getContext('2d');
        var textureImage = ctx.createImageData(cvs.width, cvs.height);

        var imgData = pimage.toImageData();

        for (var i = 0; i < cvs.width; i += 1) {
          for (var j = 0; j < cvs.height; j += 1) {
          var index = (j * cvs.width + i) * 4;
            textureImage.data[index + 0] = imgData.data[index + 0];
            textureImage.data[index + 1] = imgData.data[index + 1];
            textureImage.data[index + 2] = imgData.data[index + 2];
            textureImage.data[index + 3] = 255;
          }
        }

        ctx.putImageData(textureImage, 0, 0);
        pimage.__cvs = cvs;

        curContext.bindTexture(curContext.TEXTURE_2D, pimage.__texture);
        curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_MIN_FILTER, curContext.LINEAR_MIPMAP_LINEAR);
        curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_MAG_FILTER, curContext.LINEAR);
        curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_WRAP_T, curContext.CLAMP_TO_EDGE);
        curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_WRAP_S, curContext.CLAMP_TO_EDGE);
        executeTexImage2D(pimage.__cvs);
        curContext.generateMipmap(curContext.TEXTURE_2D);
      } else {
        curContext.bindTexture(curContext.TEXTURE_2D, pimage.__texture);
      }

      curTexture.width = pimage.width;
      curTexture.height = pimage.height;
      usingTexture = true;
      curContext.useProgram(programObject3D);
      uniformi("usingTexture3d", programObject3D, "usingTexture", usingTexture);
    };

    /**
     * Sets the coordinate space for texture mapping. There are two options, IMAGE,
     * which refers to the actual coordinates of the image, and NORMALIZED, which
     * refers to a normalized space of values ranging from 0 to 1. The default mode
     * is IMAGE. In IMAGE, if an image is 100 x 200 pixels, mapping the image onto
     * the entire size of a quad would require the points (0,0) (0,100) (100,200) (0,200).
     * The same mapping in NORMAL_SPACE is (0,0) (0,1) (1,1) (0,1).
     *
     * @param MODE either IMAGE or NORMALIZED
     *
     * @returns none
     *
     * @see texture
    */
    p.textureMode = function(mode){
      curTextureMode = mode;
    };
    /**
     * The curveVertexSegment() function handle emitting a specific segment of Catmull-Rom curve. Internal helper function used by <b>curveVertex()</b>.
     */
    var curveVertexSegment = function(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
      var x0 = x2;
      var y0 = y2;
      var z0 = z2;

      var draw = curveDrawMatrix.array();

      var xplot1 = draw[4] * x1 + draw[5] * x2 + draw[6] * x3 + draw[7] * x4;
      var xplot2 = draw[8] * x1 + draw[9] * x2 + draw[10] * x3 + draw[11] * x4;
      var xplot3 = draw[12] * x1 + draw[13] * x2 + draw[14] * x3 + draw[15] * x4;

      var yplot1 = draw[4] * y1 + draw[5] * y2 + draw[6] * y3 + draw[7] * y4;
      var yplot2 = draw[8] * y1 + draw[9] * y2 + draw[10] * y3 + draw[11] * y4;
      var yplot3 = draw[12] * y1 + draw[13] * y2 + draw[14] * y3 + draw[15] * y4;

      var zplot1 = draw[4] * z1 + draw[5] * z2 + draw[6] * z3 + draw[7] * z4;
      var zplot2 = draw[8] * z1 + draw[9] * z2 + draw[10] * z3 + draw[11] * z4;
      var zplot3 = draw[12] * z1 + draw[13] * z2 + draw[14] * z3 + draw[15] * z4;

      p.vertex(x0, y0, z0);
      for (var j = 0; j < curveDet; j++) {
        x0 += xplot1; xplot1 += xplot2; xplot2 += xplot3;
        y0 += yplot1; yplot1 += yplot2; yplot2 += yplot3;
        z0 += zplot1; zplot1 += zplot2; zplot2 += zplot3;
        p.vertex(x0, y0, z0);
      }
    };

    /**
     * Specifies vertex coordinates for curves. This function may only be used between <b>beginShape()</b> and
     * <b>endShape()</b> and only when there is no MODE parameter specified to <b>beginShape()</b>. The first and last points
     * in a series of <b>curveVertex()</b> lines will be used to guide the beginning and end of a the curve. A minimum of four
     * points is required to draw a tiny curve between the second and third points. Adding a fifth point with
     * <b>curveVertex()</b> will draw the curve between the second, third, and fourth points. The <b>curveVertex()</b> function
     * is an implementation of Catmull-Rom splines. Using the 3D version of requires rendering with P3D or OPENGL (see the
     * Environment reference for more information). <br /> <br /><b>NOTE: </b> Fill does not work properly yet.
     *
     * @param {float | int} x The x-coordinate of the vertex
     * @param {float | int} y The y-coordinate of the vertex
     * @param {float | int} z The z-coordinate of the vertex
     *
     * @see curve
     * @see beginShape
     * @see endShape
     * @see vertex
     * @see bezierVertex
     */
    p.curveVertex = function(x, y, z) {
      isCurve = true;
      if(p.use3DContext){
        if (!curveInited){
          curveInit();
        }
        var vert = [];
        vert[0] = x;
        vert[1] = y;
        vert[2] = z;
        curveVertArray.push(vert);
        curveVertCount++;

        if (curveVertCount > 3){
          curveVertexSegment( curveVertArray[curveVertCount-4][0],
                              curveVertArray[curveVertCount-4][1],
                              curveVertArray[curveVertCount-4][2],
                              curveVertArray[curveVertCount-3][0],
                              curveVertArray[curveVertCount-3][1],
                              curveVertArray[curveVertCount-3][2],
                              curveVertArray[curveVertCount-2][0],
                              curveVertArray[curveVertCount-2][1],
                              curveVertArray[curveVertCount-2][2],
                              curveVertArray[curveVertCount-1][0],
                              curveVertArray[curveVertCount-1][1],
                              curveVertArray[curveVertCount-1][2] );
        }
      }
      else{
        p.vertex(x, y, z);
      }
    };

    /**
     * The curve() function draws a curved line on the screen. The first and second parameters
     * specify the beginning control point and the last two parameters specify
     * the ending control point. The middle parameters specify the start and
     * stop of the curve. Longer curves can be created by putting a series of
     * <b>curve()</b> functions together or using <b>curveVertex()</b>.
     * An additional function called <b>curveTightness()</b> provides control
     * for the visual quality of the curve. The <b>curve()</b> function is an
     * implementation of Catmull-Rom splines. Using the 3D version of requires
     * rendering with P3D or OPENGL (see the Environment reference for more
     * information).
     *
     * @param {int|float} x1 coordinates for the beginning control point
     * @param {int|float} y1 coordinates for the beginning control point
     * @param {int|float} z1 coordinates for the beginning control point
     * @param {int|float} x2 coordinates for the first point
     * @param {int|float} y2 coordinates for the first point
     * @param {int|float} z2 coordinates for the first point
     * @param {int|float} x3 coordinates for the second point
     * @param {int|float} y3 coordinates for the second point
     * @param {int|float} z3 coordinates for the second point
     * @param {int|float} x4 coordinates for the ending control point
     * @param {int|float} y4 coordinates for the ending control point
     * @param {int|float} z4 coordinates for the ending control point
     *
     * @see #curveVertex()
     * @see #curveTightness()
     * @see #bezier()
     */
    p.curve = function curve() {
      if (arguments.length === 8) // curve(x1, y1, x2, y2, x3, y3, x4, y4)
      {
        p.beginShape();
        p.curveVertex(arguments[0], arguments[1]);
        p.curveVertex(arguments[2], arguments[3]);
        p.curveVertex(arguments[4], arguments[5]);
        p.curveVertex(arguments[6], arguments[7]);
        p.endShape();
      } else { // curve( x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4);
        if (p.use3DContext) {
          p.beginShape();
          p.curveVertex(arguments[0], arguments[1], arguments[2]);
          p.curveVertex(arguments[3], arguments[4], arguments[5]);
          p.curveVertex(arguments[6], arguments[7], arguments[8]);
          p.curveVertex(arguments[9], arguments[10], arguments[11]);
          p.endShape();
        }
      }
    };

    /**
     * The curveTightness() function modifies the quality of forms created with <b>curve()</b> and
     * <b>curveVertex()</b>. The parameter <b>squishy</b> determines how the
     * curve fits to the vertex points. The value 0.0 is the default value for
     * <b>squishy</b> (this value defines the curves to be Catmull-Rom splines)
     * and the value 1.0 connects all the points with straight lines.
     * Values within the range -5.0 and 5.0 will deform the curves but
     * will leave them recognizable and as values increase in magnitude,
     * they will continue to deform.
     *
     * @param {float} tightness amount of deformation from the original vertices
     *
     * @see #curve()
     * @see #curveVertex()
     *
     */
    p.curveTightness = function(tightness) {
      curTightness = tightness;
    };

    /**
     * The curveDetail() function sets the resolution at which curves display. The default value is 20.
     * This function is only useful when using the P3D or OPENGL renderer.
     *
     * @param {int} detail resolution of the curves
     *
     * @see curve()
     * @see curveVertex()
     * @see curveTightness()
     */
    p.curveDetail = function curveDetail(detail) {
      curveDet = detail;
      curveInit();
    };

    /**
    * Modifies the location from which rectangles draw. The default mode is rectMode(CORNER), which
    * specifies the location to be the upper left corner of the shape and uses the third and fourth
    * parameters of rect() to specify the width and height. The syntax rectMode(CORNERS) uses the
    * first and second parameters of rect() to set the location of one corner and uses the third and
    * fourth parameters to set the opposite corner. The syntax rectMode(CENTER) draws the image from
    * its center point and uses the third and forth parameters of rect() to specify the image's width
    * and height. The syntax rectMode(RADIUS) draws the image from its center point and uses the third
    * and forth parameters of rect()  to specify half of the image's width and height. The parameter must
    * be written in ALL CAPS because Processing is a case sensitive language. Note: In version 125, the
    * mode named CENTER_RADIUS was shortened to RADIUS.
    *
    * @param {MODE} MODE      Either CORNER, CORNERS, CENTER, or RADIUS
    *
    * @see rect
    */
    p.rectMode = function rectMode(aRectMode) {
      curRectMode = aRectMode;
    };

    /**
    * Modifies the location from which images draw. The default mode is imageMode(CORNER), which specifies
    * the location to be the upper left corner and uses the fourth and fifth parameters of image() to set
    * the image's width and height. The syntax imageMode(CORNERS) uses the second and third parameters of
    * image() to set the location of one corner of the image and uses the fourth and fifth parameters to
    * set the opposite corner. Use imageMode(CENTER) to draw images centered at the given x and y position.
    * The parameter to imageMode() must be written in ALL CAPS because Processing is a case sensitive language.
    *
    * @param {MODE} MODE      Either CORNER, CORNERS, or CENTER
    *
    * @see loadImage
    * @see PImage
    * @see image
    * @see background
    */
    p.imageMode = function(mode) {
      switch (mode) {
      case PConstants.CORNER:
        imageModeConvert = imageModeCorner;
        break;
      case PConstants.CORNERS:
        imageModeConvert = imageModeCorners;
        break;
      case PConstants.CENTER:
        imageModeConvert = imageModeCenter;
        break;
      default:
        throw "Invalid imageMode";
      }
    };

    /**
    * The origin of the ellipse is modified by the ellipseMode() function. The default configuration is
    * ellipseMode(CENTER), which specifies the location of the ellipse as the center of the shape. The RADIUS
    * mode is the same, but the width and height parameters to ellipse()  specify the radius of the ellipse,
    * rather than the diameter. The CORNER mode draws the shape from the upper-left corner of its bounding box.
    * The CORNERS mode uses the four parameters to ellipse() to set two opposing corners of the ellipse's bounding
    * box. The parameter must be written in "ALL CAPS" because Processing is a case sensitive language.
    *
    * @param {MODE} MODE      Either CENTER, RADIUS, CORNER, or CORNERS.
    *
    * @see ellipse
    */
    p.ellipseMode = function ellipseMode(aEllipseMode) {
      curEllipseMode = aEllipseMode;
    };

    /**
     * The arc() function draws an arc in the display window.
     * Arcs are drawn along the outer edge of an ellipse defined by the
     * <b>x</b>, <b>y</b>, <b>width</b> and <b>height</b> parameters.
     * The origin or the arc's ellipse may be changed with the
     * <b>ellipseMode()</b> function.
     * The <b>start</b> and <b>stop</b> parameters specify the angles
     * at which to draw the arc.
     *
     * @param {float} a       x-coordinate of the arc's ellipse
     * @param {float} b       y-coordinate of the arc's ellipse
     * @param {float} c       width of the arc's ellipse
     * @param {float} d       height of the arc's ellipse
     * @param {float} start   angle to start the arc, specified in radians
     * @param {float} stop    angle to stop the arc, specified in radians
     *
     * @see #ellipseMode()
     * @see #ellipse()
     */
    p.arc = function arc(x, y, width, height, start, stop) {
      if (width <= 0 || stop < start) { return; }

      if (curEllipseMode === PConstants.CORNERS) {
        width = width - x;
        height = height - y;

      } else if (curEllipseMode === PConstants.RADIUS) {
        x = x - width;
        y = y - height;
        width = width * 2;
        height = height * 2;

      } else if (curEllipseMode === PConstants.CENTER) {
        x = x - width/2;
        y = y - height/2;
      }
      // make sure that we're starting at a useful point
      while (start < 0) {
        start += PConstants.TWO_PI;
        stop += PConstants.TWO_PI;
      }
      if (stop - start > PConstants.TWO_PI) {
        start = 0;
        stop = PConstants.TWO_PI;
      }
      var hr = width / 2;
      var vr = height / 2;
      var centerX = x + hr;
      var centerY = y + vr;
      var i, ii, startLUT, stopLUT;
      if (doFill) {
        // shut off stroke for a minute
        var savedStroke = doStroke;
        doStroke = false;
        startLUT = 0.5 + (start / PConstants.TWO_PI) * PConstants.SINCOS_LENGTH;
        stopLUT  = 0.5 + (stop / PConstants.TWO_PI) * PConstants.SINCOS_LENGTH;
        p.beginShape();
        p.vertex(centerX, centerY);
        for (i = startLUT; i < stopLUT; i++) {
          ii = i % PConstants.SINCOS_LENGTH;
          if (ii < 0) { ii += PConstants.SINCOS_LENGTH; }
          p.vertex(centerX + parseFloat(Math.cos(ii * PConstants.DEG_TO_RAD * 0.5)) * hr,centerY + parseFloat(Math.sin(ii * PConstants.DEG_TO_RAD * 0.5)) * vr);
        }
        p.endShape(PConstants.CLOSE);
        doStroke = savedStroke;
      }

      if (doStroke) {
        // and doesn't include the first (center) vertex.
        var savedFill = doFill;
        doFill = false;
        startLUT = 0.5 + (start / PConstants.TWO_PI) * PConstants.SINCOS_LENGTH;
        stopLUT  = 0.5 + (stop / PConstants.TWO_PI) * PConstants.SINCOS_LENGTH;
        p.beginShape();
        for (i = startLUT; i < stopLUT; i ++) {
          ii = i % PConstants.SINCOS_LENGTH;
          if (ii < 0) { ii += PConstants.SINCOS_LENGTH; }
          p.vertex(centerX + parseFloat(Math.cos(ii * PConstants.DEG_TO_RAD * 0.5)) * hr, centerY + parseFloat(Math.sin(ii * PConstants.DEG_TO_RAD * 0.5)) * vr);
        }
        p.endShape();
        doFill = savedFill;
      }
    };

    /**
    * Draws a line (a direct path between two points) to the screen. The version of line() with four parameters
    * draws the line in 2D. To color a line, use the stroke() function. A line cannot be filled, therefore the
    * fill()  method will not affect the color of a line. 2D lines are drawn with a width of one pixel by default,
    * but this can be changed with the strokeWeight()  function. The version with six parameters allows the line
    * to be placed anywhere within XYZ space. Drawing this shape in 3D using the z parameter requires the P3D or
    * OPENGL parameter in combination with size.
    *
    * @param {int|float} x1       x-coordinate of the first point
    * @param {int|float} y1       y-coordinate of the first point
    * @param {int|float} z1       z-coordinate of the first point
    * @param {int|float} x2       x-coordinate of the second point
    * @param {int|float} y2       y-coordinate of the second point
    * @param {int|float} z2       z-coordinate of the second point
    *
    * @see strokeWeight
    * @see strokeJoin
    * @see strokeCap
    * @see beginShape
    */
    p.line = function line() {
      var x1, y1, z1, x2, y2, z2;

      if (p.use3DContext) {
        if (arguments.length === 6) {
          x1 = arguments[0];
          y1 = arguments[1];
          z1 = arguments[2];
          x2 = arguments[3];
          y2 = arguments[4];
          z2 = arguments[5];
        } else if (arguments.length === 4) {
          x1 = arguments[0];
          y1 = arguments[1];
          z1 = 0;
          x2 = arguments[2];
          y2 = arguments[3];
          z2 = 0;
        }

        var lineVerts = [x1, y1, z1, x2, y2, z2];

        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.transpose();

        var proj = new PMatrix3D();
        proj.set(projection);
        proj.transpose();

        if (lineWidth > 0 && doStroke) {
          curContext.useProgram(programObject2D);

          uniformMatrix("model2d", programObject2D, "model", false, [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1]);
          uniformMatrix("view2d", programObject2D, "view", false, view.array());
          uniformMatrix("projection2d", programObject2D, "projection", false, proj.array());

          uniformf("color2d", programObject2D, "color", strokeStyle);
          uniformi("picktype2d", programObject2D, "picktype", 0);

          curContext.lineWidth(lineWidth);

          vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, lineBuffer);
          disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");

          curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(lineVerts), curContext.STREAM_DRAW);
          curContext.drawArrays(curContext.LINES, 0, 2);
        }
      } else {
        x1 = arguments[0];
        y1 = arguments[1];
        x2 = arguments[2];
        y2 = arguments[3];

        // if line is parallel to axis and lineWidth is less than 1px, trying to do it "crisp"
        if ((x1 === x2 || y1 === y2) && lineWidth <= 1.0 && doStroke && curSketch.options.crispLines) {
          var temp;
          if(x1 === x2) {
            if(y1 > y2) { temp = y1; y1 = y2; y2 = temp; }
            for(var y=y1;y<=y2;++y) {
              p.set(x1, y, currentStrokeColor);
            }
          } else {
            if(x1 > x2) { temp = x1; x1 = x2; x2 = temp; }
            for(var x=x1;x<=x2;++x) {
              p.set(x, y1, currentStrokeColor);
            }
          }
          return;
        }

        if (doStroke) {
          curContext.beginPath();
          curContext.moveTo(x1 || 0, y1 || 0);
          curContext.lineTo(x2 || 0, y2 || 0);
          executeContextStroke();
          curContext.closePath();
        }
      }
    };

    /**
     * Draws a Bezier curve on the screen. These curves are defined by a series of anchor and control points. The first
     * two parameters specify the first anchor point and the last two parameters specify the other anchor point. The
     * middle parameters specify the control points which define the shape of the curve. Bezier curves were developed
     * by French engineer Pierre Bezier. Using the 3D version of requires rendering with P3D or OPENGL (see the
     * Environment reference for more information).
     *
     * @param {int | float} x1,y1,z1    coordinates for the first anchor point
     * @param {int | float} cx1,cy1,cz1 coordinates for the first control point
     * @param {int | float} cx2,cy2,cz2 coordinates for the second control point
     * @param {int | float} x2,y2,z2    coordinates for the second anchor point
     *
     * @see bezierVertex
     * @see curve
     */
    p.bezier = function bezier() {
      if( arguments.length === 8 && !p.use3DContext ){
          p.beginShape();
          p.vertex( arguments[0], arguments[1] );
          p.bezierVertex( arguments[2], arguments[3],
                          arguments[4], arguments[5],
                          arguments[6], arguments[7] );
          p.endShape();
      }
      else if( arguments.length === 12 && p.use3DContext ){
          p.beginShape();
          p.vertex( arguments[0], arguments[1], arguments[2] );
          p.bezierVertex( arguments[3], arguments[4], arguments[5],
                          arguments[6], arguments[7], arguments[8],
                          arguments[9], arguments[10], arguments[11] );
          p.endShape();
      }
      else {
        throw("Please use the proper parameters!");
      }
    };

    /**
     * Sets the resolution at which Beziers display. The default value is 20. This function is only useful when using the P3D
     * or OPENGL renderer as the default (JAVA2D) renderer does not use this information.
     *
     * @param {int} detail resolution of the curves
     *
     * @see curve
     * @see curveVertex
     * @see curveTightness
     */
    p.bezierDetail = function bezierDetail( detail ){
      bezDetail = detail;
    };

    /**
     * The bezierPoint() function evalutes quadratic bezier at point t for points a, b, c, d.
     * The parameter t varies between 0 and 1. The a and d parameters are the
     * on-curve points, b and c are the control points. To make a two-dimensional
     * curve, call this function once with the x coordinates and a second time
     * with the y coordinates to get the location of a bezier curve at t.
     *
     * @param {float} a   coordinate of first point on the curve
     * @param {float} b   coordinate of first control point
     * @param {float} c   coordinate of second control point
     * @param {float} d   coordinate of second point on the curve
     * @param {float} t   value between 0 and 1
     *
     * @see #bezier()
     * @see #bezierVertex()
     * @see #curvePoint()
     */
    p.bezierPoint = function bezierPoint(a, b, c, d, t) {
      return (1 - t) * (1 - t) * (1 - t) * a + 3 * (1 - t) * (1 - t) * t * b + 3 * (1 - t) * t * t * c + t * t * t * d;
    };

    /**
     * The bezierTangent() function calculates the tangent of a point on a Bezier curve. There is a good
     * definition of "tangent" at Wikipedia: <a href="http://en.wikipedia.org/wiki/Tangent" target="new">http://en.wikipedia.org/wiki/Tangent</a>
     *
     * @param {float} a   coordinate of first point on the curve
     * @param {float} b   coordinate of first control point
     * @param {float} c   coordinate of second control point
     * @param {float} d   coordinate of second point on the curve
     * @param {float} t   value between 0 and 1
     *
     * @see #bezier()
     * @see #bezierVertex()
     * @see #curvePoint()
     */
    p.bezierTangent = function bezierTangent(a, b, c, d, t) {
      return (3 * t * t * (-a + 3 * b - 3 * c + d) + 6 * t * (a - 2 * b + c) + 3 * (-a + b));
    };

    /**
     * The curvePoint() function evalutes the Catmull-Rom curve at point t for points a, b, c, d. The
     * parameter t varies between 0 and 1, a and d are points on the curve,
     * and b and c are the control points. This can be done once with the x
     * coordinates and a second time with the y coordinates to get the
     * location of a curve at t.
     *
     * @param {int|float} a   coordinate of first point on the curve
     * @param {int|float} b   coordinate of second point on the curve
     * @param {int|float} c   coordinate of third point on the curve
     * @param {int|float} d   coordinate of fourth point on the curve
     * @param {float} t       value between 0 and 1
     *
     * @see #curve()
     * @see #curveVertex()
     * @see #bezierPoint()
     */
    p.curvePoint = function curvePoint(a, b, c, d, t) {
      return 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
    };

    /**
     * The curveTangent() function calculates the tangent of a point on a Catmull-Rom curve.
     * There is a good definition of "tangent" at Wikipedia: <a href="http://en.wikipedia.org/wiki/Tangent" target="new">http://en.wikipedia.org/wiki/Tangent</a>.
     *
     * @param {int|float} a   coordinate of first point on the curve
     * @param {int|float} b   coordinate of first control point
     * @param {int|float} c   coordinate of second control point
     * @param {int|float} d   coordinate of second point on the curve
     * @param {float} t       value between 0 and 1
     *
     * @see #curve()
     * @see #curveVertex()
     * @see #curvePoint()
     * @see #bezierTangent()
     */
    p.curveTangent = function curveTangent(a, b, c, d, t) {
      return 0.5 * ((-a + c) + 2 * (2 * a - 5 * b + 4 * c - d) * t + 3 * (-a + 3 * b - 3 * c + d) * t * t);
    };

    /**
     * A triangle is a plane created by connecting three points. The first two arguments specify the first point,
     * the middle two arguments specify the second point, and the last two arguments specify the third point.
     *
     * @param {int | float} x1 x-coordinate of the first point
     * @param {int | float} y1 y-coordinate of the first point
     * @param {int | float} x2 x-coordinate of the second point
     * @param {int | float} y2 y-coordinate of the second point
     * @param {int | float} x3 x-coordinate of the third point
     * @param {int | float} y3 y-coordinate of the third point
     */
    p.triangle = function triangle(x1, y1, x2, y2, x3, y3) {
      p.beginShape(PConstants.TRIANGLES);
      p.vertex(x1, y1, 0);
      p.vertex(x2, y2, 0);
      p.vertex(x3, y3, 0);
      p.endShape();
    };

    /**
     * A quad is a quadrilateral, a four sided polygon. It is similar to a rectangle, but the angles between its
     * edges are not constrained to ninety degrees. The first pair of parameters (x1,y1) sets the first vertex
     * and the subsequent pairs should proceed clockwise or counter-clockwise around the defined shape.
     *
     * @param {float | int} x1 x-coordinate of the first corner
     * @param {float | int} y1 y-coordinate of the first corner
     * @param {float | int} x2 x-coordinate of the second corner
     * @param {float | int} y2 y-coordinate of the second corner
     * @param {float | int} x3 x-coordinate of the third corner
     * @param {float | int} y3 y-coordinate of the third corner
     * @param {float | int} x4 x-coordinate of the fourth corner
     * @param {float | int} y4 y-coordinate of the fourth corner
     */
    p.quad = function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
      p.beginShape(PConstants.QUADS);
      p.vertex(x1, y1, 0);
      p.vertex(x2, y2, 0);
      p.vertex(x3, y3, 0);
      p.vertex(x4, y4, 0);
      p.endShape();
    };

    /**
    * Draws a rectangle to the screen. A rectangle is a four-sided shape with every angle at ninety
    * degrees. The first two parameters set the location, the third sets the width, and the fourth
    * sets the height. The origin is changed with the rectMode() function.
    *
    * @param {int|float} x        x-coordinate of the rectangle
    * @param {int|float} y        y-coordinate of the rectangle
    * @param {int|float} width    width of the rectangle
    * @param {int|float} height   height of the rectangle
    *
    * @see rectMode
    * @see quad
    */
    p.rect = function rect(x, y, width, height) {
      if (p.use3DContext) {
        // Modeling transformation
        var model = new PMatrix3D();
        model.translate(x, y, 0);
        model.scale(width, height, 1);
        model.transpose();

        // viewing transformation needs to have Y flipped
        // becuase that's what Processing does.
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.transpose();

        var proj = new PMatrix3D();
        proj.set(projection);
        proj.transpose();

        if (lineWidth > 0 && doStroke) {
          curContext.useProgram(programObject2D);
          uniformMatrix("model2d", programObject2D, "model", false, model.array());
          uniformMatrix("view2d", programObject2D, "view", false, view.array());
          uniformMatrix("projection2d", programObject2D, "projection", false, proj.array());

          uniformf("color2d", programObject2D, "color", strokeStyle);
          uniformi("picktype2d", programObject2D, "picktype", 0);

          vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, rectBuffer);
          disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");

          curContext.lineWidth(lineWidth);
          curContext.drawArrays(curContext.LINE_LOOP, 0, rectVerts.length / 3);
        }

        if (doFill) {
          curContext.useProgram(programObject3D);
          uniformMatrix("model3d", programObject3D, "model", false, model.array());
          uniformMatrix("view3d", programObject3D, "view", false, view.array());
          uniformMatrix("projection3d", programObject3D, "projection", false, proj.array());

          // fix stitching problems. (lines get occluded by triangles
          // since they share the same depth values). This is not entirely
          // working, but it's a start for drawing the outline. So
          // developers can start playing around with styles.
          curContext.enable(curContext.POLYGON_OFFSET_FILL);
          curContext.polygonOffset(1, 1);

          uniformf("color3d", programObject3D, "color", fillStyle);

          var v = new PMatrix3D();
          v.set(view);

          var m = new PMatrix3D();
          m.set(model);

          v.mult(m);

          var normalMatrix = new PMatrix3D();
          normalMatrix.set(v);
          normalMatrix.invert();
          normalMatrix.transpose();

          uniformMatrix("normalTransform3d", programObject3D, "normalTransform", false, normalMatrix.array());

          vertexAttribPointer("vertex3d", programObject3D, "Vertex", 3, rectBuffer);
          vertexAttribPointer("normal3d", programObject3D, "Normal", 3, rectNormBuffer);

          curContext.drawArrays(curContext.TRIANGLE_FAN, 0, rectVerts.length / 3);
          curContext.disable(curContext.POLYGON_OFFSET_FILL);
        }
      }
      else{
        if (!width && !height) {
          return;
        }

        // if only stroke is enabled, do it "crisp"
        if (doStroke && !doFill && lineWidth <= 1.0 && curSketch.options.crispLines) {
          var i, x2 = x + width - 1, y2 = y + height - 1;
          for(i=0;i<width;++i) {
            p.set(x + i, y, currentStrokeColor);
            p.set(x + i, y2, currentStrokeColor);
          }
          for(i=0;i<height;++i) {
            p.set(x, y + i, currentStrokeColor);
            p.set(x2, y + i, currentStrokeColor);
          }
          return;
        }

        curContext.beginPath();

        var offsetStart = 0;
        var offsetEnd = 0;

        if (curRectMode === PConstants.CORNERS) {
          width -= x;
          height -= y;
        }

        if (curRectMode === PConstants.RADIUS) {
          width *= 2;
          height *= 2;
        }

        if (curRectMode === PConstants.CENTER || curRectMode === PConstants.RADIUS) {
          x -= width / 2;
          y -= height / 2;
        }

        curContext.rect(
        Math.round(x) - offsetStart, Math.round(y) - offsetStart, Math.round(width) + offsetEnd, Math.round(height) + offsetEnd);

        executeContextFill();
        executeContextStroke();

        curContext.closePath();
      }
    };

    /**
     * Draws an ellipse (oval) in the display window. An ellipse with an equal <b>width</b> and <b>height</b> is a circle.
     * The first two parameters set the location, the third sets the width, and the fourth sets the height. The origin may be
     * changed with the <b>ellipseMode()</b> function.
     *
     * @param {float|int} x      x-coordinate of the ellipse
     * @param {float|int} y      y-coordinate of the ellipse
     * @param {float|int} width  width of the ellipse
     * @param {float|int} height height of the ellipse
     *
     * @see ellipseMode
     */
    p.ellipse = function ellipse(x, y, width, height) {
      x = x || 0;
      y = y || 0;

      if (width <= 0 && height <= 0) {
        return;
      }

      if (curEllipseMode === PConstants.RADIUS) {
        width *= 2;
        height *= 2;
      }

      if (curEllipseMode === PConstants.CORNERS) {
        width = width - x;
        height = height - y;
      }

      if (curEllipseMode === PConstants.CORNER || curEllipseMode === PConstants.CORNERS) {
        x += width / 2;
        y += height / 2;
      }

      var offsetStart = 0;

      // Shortcut for drawing a 2D circle
      if ((!p.use3DContext) && (width === height)) {
        curContext.beginPath();
        curContext.arc(x - offsetStart, y - offsetStart, width / 2, 0, PConstants.TWO_PI, false);
        executeContextFill();
        executeContextStroke();
        curContext.closePath();
      }
      else {
        var w = width / 2,
          h = height / 2,
          C = 0.5522847498307933;
        var c_x = C * w,
          c_y = C * h;

        if(!p.use3DContext){
          // TODO: Audit
          p.beginShape();
          p.vertex(x + w, y);
          p.bezierVertex(x + w, y - c_y, x + c_x, y - h, x, y - h);
          p.bezierVertex(x - c_x, y - h, x - w, y - c_y, x - w, y);
          p.bezierVertex(x - w, y + c_y, x - c_x, y + h, x, y + h);
          p.bezierVertex(x + c_x, y + h, x + w, y + c_y, x + w, y);
          p.endShape();
        }
        else{
          p.beginShape();
          p.vertex(x + w, y);
          p.bezierVertex(x + w, y - c_y, 0, x + c_x, y - h, 0, x, y - h, 0);
          p.bezierVertex(x - c_x, y - h, 0, x - w, y - c_y, 0, x - w, y, 0);
          p.bezierVertex(x - w, y + c_y, 0, x - c_x, y + h, 0, x, y + h, 0);
          p.bezierVertex(x + c_x, y + h, 0, x + w, y + c_y, 0, x + w, y, 0);
          p.endShape();

          //temporary workaround to not working fills for bezier -- will fix later
          var xAv = 0, yAv = 0, i, j;
          for(i = 0; i < vertArray.length; i++){
            xAv += vertArray[i][0];
            yAv += vertArray[i][1];
          }
          xAv /= vertArray.length;
          yAv /= vertArray.length;
          var vert = [],
              fillVertArray = [],
              colorVertArray = [];
          vert[0] = xAv;
          vert[1] = yAv;
          vert[2] = 0;
          vert[3] = 0;
          vert[4] = 0;
          vert[5] = fillStyle[0];
          vert[6] = fillStyle[1];
          vert[7] = fillStyle[2];
          vert[8] = fillStyle[3];
          vert[9] = strokeStyle[0];
          vert[10] = strokeStyle[1];
          vert[11] = strokeStyle[2];
          vert[12] = strokeStyle[3];
          vert[13] = normalX;
          vert[14] = normalY;
          vert[15] = normalZ;
          vertArray.unshift(vert);
          for(i = 0; i < vertArray.length; i++){
            for(j = 0; j < 3; j++){
              fillVertArray.push(vertArray[i][j]);
            }
            for(j = 5; j < 9; j++){
              colorVertArray.push(vertArray[i][j]);
            }
          }
          fill3D(fillVertArray, "TRIANGLE_FAN", colorVertArray);
        }
      }
    };

    /**
    * Sets the current normal vector. This is for drawing three dimensional shapes and surfaces and
    * specifies a vector perpendicular to the surface of the shape which determines how lighting affects
    * it. Processing attempts to automatically assign normals to shapes, but since that's imperfect,
    * this is a better option when you want more control. This function is identical to glNormal3f() in OpenGL.
    *
    * @param {float} nx       x direction
    * @param {float} ny       y direction
    * @param {float} nz       z direction
    *
    * @see beginShape
    * @see endShape
    * @see lights
    */
    p.normal = function normal(nx, ny, nz) {
      if (arguments.length !== 3 || !(typeof nx === "number" && typeof ny === "number" && typeof nz === "number")) {
        throw "normal() requires three numeric arguments.";
      }

      normalX = nx;
      normalY = ny;
      normalZ = nz;

      if (curShape !== 0) {
        if (normalMode === PConstants.NORMAL_MODE_AUTO) {
          normalMode = PConstants.NORMAL_MODE_SHAPE;
        } else if (normalMode === PConstants.NORMAL_MODE_SHAPE) {
          normalMode = PConstants.NORMAL_MODE_VERTEX;
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Raster drawing functions
    ////////////////////////////////////////////////////////////////////////////

    /**
    * Saves an image from the display window. Images are saved in TIFF, TARGA, JPEG, and PNG format
    * depending on the extension within the filename  parameter. For example, "image.tif" will have
    * a TIFF image and "image.png" will save a PNG image. If no extension is included in the filename,
    * the image will save in TIFF format and .tif will be added to the name. These files are saved to
    * the sketch's folder, which may be opened by selecting "Show sketch folder" from the "Sketch" menu.
    * It is not possible to use save() while running the program in a web browser.  All images saved
    * from the main drawing window will be opaque. To save images without a background, use createGraphics().
    *
    * @param {String} filename      any sequence of letters and numbers
    *
    * @see saveFrame
    * @see createGraphics
    */
    p.save = function save(file, img) {
      // file is unused at the moment
      // may implement this differently in later release
      if (img !== undef) {
        return window.open(img.toDataURL(),"_blank");
      } else {
        return window.open(p.externals.canvas.toDataURL(),"_blank");
      }
    };

    var saveNumber = 0;

    p.saveFrame = function saveFrame(file) {
      if(file === undef) {
        // use default name template if parameter is not specified
        file = "screen-####.png";
      }
      // Increment changeable part: screen-0000.png, screen-0001.png, ...
      var frameFilename = file.replace(/#+/, function(all) {
        var s = "" + (saveNumber++);
        while(s.length < all.length) {
          s = "0" + s;
        }
        return s;
      });
      p.save(frameFilename);
    };

    var utilityContext2d = document.createElement("canvas").getContext("2d");

    var canvasDataCache = [undef, undef, undef]; // we need three for now

    function getCanvasData(obj, w, h) {
      var canvasData = canvasDataCache.shift();

      if (canvasData === undef) {
        canvasData = {};
        canvasData.canvas = document.createElement("canvas");
        canvasData.context = canvasData.canvas.getContext('2d');
      }

      canvasDataCache.push(canvasData);

      var canvas = canvasData.canvas, context = canvasData.context,
          width = w || obj.width, height = h || obj.height;

      canvas.width = width;
      canvas.height = height;

      if (!obj) {
        context.clearRect(0, 0, width, height);
      } else if ("data" in obj) { // ImageData
        context.putImageData(obj, 0, 0);
      } else {
        context.clearRect(0, 0, width, height);
        context.drawImage(obj, 0, 0, width, height);
      }
      return canvasData;
    }

    /**
    * Datatype for storing images. Processing can display .gif, .jpg, .tga, and .png images. Images may be
    * displayed in 2D and 3D space. Before an image is used, it must be loaded with the loadImage() function.
    * The PImage object contains fields for the width and height of the image, as well as an array called
    * pixels[]  which contains the values for every pixel in the image. A group of methods, described below,
    * allow easy access to the image's pixels and alpha channel and simplify the process of compositing.
    * Before using the pixels[] array, be sure to use the loadPixels() method on the image to make sure that the
    * pixel data is properly loaded. To create a new image, use the createImage() function (do not use new PImage()).
    *
    * @param {int} width                image width
    * @param {int} height               image height
    * @param {MODE} format              Either RGB, ARGB, ALPHA (grayscale alpha channel)
    *
    * @returns {PImage}
    *
    * @see loadImage
    * @see imageMode
    * @see createImage
    */
    var PImage = function PImage(aWidth, aHeight, aFormat) {
      this.get = function(x, y, w, h) {
        if (!arguments.length) {
          return p.get(this);
        } else if (arguments.length === 2) {
          return p.get(x, y, this);
        } else if (arguments.length === 4) {
          return p.get(x, y, w, h, this);
        }
      };

      /**
      * @member PImage
      * Changes the color of any pixel or writes an image directly into the image. The x and y parameter
      * specify the pixel or the upper-left corner of the image. The color parameter specifies the color value.
      * Setting the color of a single pixel with set(x, y) is easy, but not as fast as putting the data
      * directly into pixels[]. The equivalent statement to "set(x, y, #000000)" using pixels[] is
      * "pixels[y*width+x] = #000000". Processing requires calling loadPixels() to load the display window
      * data into the pixels[] array before getting the values and calling updatePixels() to update the window.
      *
      * @param {int} x        x-coordinate of the pixel or upper-left corner of the image
      * @param {int} y        y-coordinate of the pixel or upper-left corner of the image
      * @param {color} color  any value of the color datatype
      *
      * @see get
      * @see pixels[]
      * @see copy
      */
      this.set = function(x, y, c) {
        p.set(x, y, c, this);
      };

      /**
      * @member PImage
      * Blends a region of pixels into the image specified by the img parameter. These copies utilize full
      * alpha channel support and a choice of the following modes to blend the colors of source pixels (A)
      * with the ones of pixels in the destination image (B):
      * BLEND - linear interpolation of colours: C = A*factor + B
      * ADD - additive blending with white clip: C = min(A*factor + B, 255)
      * SUBTRACT - subtractive blending with black clip: C = max(B - A*factor, 0)
      * DARKEST - only the darkest colour succeeds: C = min(A*factor, B)
      * LIGHTEST - only the lightest colour succeeds: C = max(A*factor, B)
      * DIFFERENCE - subtract colors from underlying image.
      * EXCLUSION - similar to DIFFERENCE, but less extreme.
      * MULTIPLY - Multiply the colors, result will always be darker.
      * SCREEN - Opposite multiply, uses inverse values of the colors.
      * OVERLAY - A mix of MULTIPLY and SCREEN. Multiplies dark values, and screens light values.
      * HARD_LIGHT - SCREEN when greater than 50% gray, MULTIPLY when lower.
      * SOFT_LIGHT - Mix of DARKEST and LIGHTEST. Works like OVERLAY, but not as harsh.
      * DODGE - Lightens light tones and increases contrast, ignores darks. Called "Color Dodge" in Illustrator and Photoshop.
      * BURN - Darker areas are applied, increasing contrast, ignores lights. Called "Color Burn" in Illustrator and Photoshop.
      * All modes use the alpha information (highest byte) of source image pixels as the blending factor.
      * If the source and destination regions are different sizes, the image will be automatically resized to
      * match the destination size. If the srcImg parameter is not used, the display window is used as the source image.
      * This function ignores imageMode().
      *
      * @param {int} x              X coordinate of the source's upper left corner
      * @param {int} y              Y coordinate of the source's upper left corner
      * @param {int} width          source image width
      * @param {int} height         source image height
      * @param {int} dx             X coordinate of the destinations's upper left corner
      * @param {int} dy             Y coordinate of the destinations's upper left corner
      * @param {int} dwidth         destination image width
      * @param {int} dheight        destination image height
      * @param {PImage} srcImg      an image variable referring to the source image
      * @param {MODE} MODE          Either BLEND, ADD, SUBTRACT, LIGHTEST, DARKEST, DIFFERENCE, EXCLUSION,
      * MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN
      *
      * @see alpha
      * @see copy
      */
      this.blend = function(srcImg, x, y, width, height, dx, dy, dwidth, dheight, MODE) {
        if (arguments.length === 9) {
          p.blend(this, srcImg, x, y, width, height, dx, dy, dwidth, dheight, this);
        } else if (arguments.length === 10) {
          p.blend(srcImg, x, y, width, height, dx, dy, dwidth, dheight, MODE, this);
        }
        delete this.sourceImg;
      };

      /**
      * @member PImage
      * Copies a region of pixels from one image into another. If the source and destination regions
      * aren't the same size, it will automatically resize source pixels to fit the specified target region.
      * No alpha information is used in the process, however if the source image has an alpha channel set,
      * it will be copied as well. This function ignores imageMode().
      *
      * @param {int} sx             X coordinate of the source's upper left corner
      * @param {int} sy             Y coordinate of the source's upper left corner
      * @param {int} swidth         source image width
      * @param {int} sheight        source image height
      * @param {int} dx             X coordinate of the destinations's upper left corner
      * @param {int} dy             Y coordinate of the destinations's upper left corner
      * @param {int} dwidth         destination image width
      * @param {int} dheight        destination image height
      * @param {PImage} srcImg      an image variable referring to the source image
      *
      * @see alpha
      * @see blend
      */
      this.copy = function(srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, dheight) {
        if (arguments.length === 8) {
          p.blend(this, srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, PConstants.REPLACE, this);
        } else if (arguments.length === 9) {
          p.blend(srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, dheight, PConstants.REPLACE, this);
        }
        delete this.sourceImg;
      };

      /**
      * @member PImage
      * Filters an image as defined by one of the following modes:
      * THRESHOLD - converts the image to black and white pixels depending if they are above or below
      * the threshold defined by the level parameter. The level must be between 0.0 (black) and 1.0(white).
      * If no level is specified, 0.5 is used.
      * GRAY - converts any colors in the image to grayscale equivalents
      * INVERT - sets each pixel to its inverse value
      * POSTERIZE - limits each channel of the image to the number of colors specified as the level parameter
      * BLUR - executes a Guassian blur with the level parameter specifying the extent of the blurring.
      * If no level parameter is used, the blur is equivalent to Guassian blur of radius 1.
      * OPAQUE - sets the alpha channel to entirely opaque.
      * ERODE - reduces the light areas with the amount defined by the level parameter.
      * DILATE - increases the light areas with the amount defined by the level parameter
      *
      * @param {MODE} MODE        Either THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, or DILATE
      * @param {int|float} param  in the range from 0 to 1
      */
      this.filter = function(mode, param) {
        if (arguments.length === 2) {
          p.filter(mode, param, this);
        } else if (arguments.length === 1) {
          // no param specified, send null to show its invalid
          p.filter(mode, null, this);
        }
        delete this.sourceImg;
      };

      /**
      * @member PImage
      * Saves the image into a file. Images are saved in TIFF, TARGA, JPEG, and PNG format depending on
      * the extension within the filename  parameter. For example, "image.tif" will have a TIFF image and
      * "image.png" will save a PNG image. If no extension is included in the filename, the image will save
      * in TIFF format and .tif will be added to the name. These files are saved to the sketch's folder,
      * which may be opened by selecting "Show sketch folder" from the "Sketch" menu. It is not possible to
      * use save() while running the program in a web browser.
      * To save an image created within the code, rather than through loading, it's necessary to make the
      * image with the createImage() function so it is aware of the location of the program and can therefore
      * save the file to the right place. See the createImage() reference for more information.
      *
      * @param {String} filename        a sequence of letters and numbers
      */
      this.save = function(file){
        p.save(file,this);
      };

      /**
      * @member PImage
      * Resize the image to a new width and height. To make the image scale proportionally, use 0 as the
      * value for the wide or high parameter.
      *
      * @param {int} wide         the resized image width
      * @param {int} high         the resized image height
      *
      * @see get
      */
      this.resize = function(w, h) {
        if (this.isRemote) { // Remote images cannot access imageData
          throw "Image is loaded remotely. Cannot resize.";
        } else {
          if (this.width !== 0 || this.height !== 0) {
            // make aspect ratio if w or h is 0
            if (w === 0 && h !== 0) {
              w = Math.floor(this.width / this.height * h);
            } else if (h === 0 && w !== 0) {
              h = Math.floor(this.height / this.width * w);
            }
            // put 'this.imageData' into a new canvas
            var canvas = getCanvasData(this.imageData).canvas;
            // pull imageData object out of canvas into ImageData object
            var imageData = getCanvasData(canvas, w, h).context.getImageData(0, 0, w, h);
            // set this as new pimage
            this.fromImageData(imageData);
          }
        }
      };

      /**
      * @member PImage
      * Masks part of an image from displaying by loading another image and using it as an alpha channel.
      * This mask image should only contain grayscale data, but only the blue color channel is used. The
      * mask image needs to be the same size as the image to which it is applied.
      * In addition to using a mask image, an integer array containing the alpha channel data can be
      * specified directly. This method is useful for creating dynamically generated alpha masks. This
      * array must be of the same length as the target image's pixels array and should contain only grayscale
      * data of values between 0-255.
      *
      * @param {PImage} maskImg         any PImage object used as the alpha channel for "img", needs to be same
      *                                 size as "img"
      * @param {int[]} maskArray        any array of Integer numbers used as the alpha channel, needs to be same
      *                                 length as the image's pixel array
      */
      this.mask = function(mask) {
        this.__mask = undef;

        if (mask.constructor.name === "PImage") {
          if (mask.width === this.width && mask.height === this.height) {
            this.__mask = mask;
          } else {
            throw "mask must have the same dimensions as PImage.";
          }
        } else if (typeof mask === "object" && mask.constructor === Array) { // this is a pixel array
          // mask pixel array needs to be the same length as this.pixels
          // how do we update this for 0.9 this.imageData holding pixels ^^
          // mask.constructor ? and this.pixels.length = this.imageData.data.length instead ?
          if (this.pixels.length === mask.length) {
            this.__mask = mask;
          } else {
            throw "mask array must be the same length as PImage pixels array.";
          }
        }
      };

      // handle the sketch code for pixels[] and pixels.length
      // parser code converts pixels[] to getPixels()
      // or setPixels(), .length becomes getLength()
      this.pixels = {
        getLength: (function(aImg) {
          if (aImg.isRemote) { // Remote images cannot access imageData
            throw "Image is loaded remotely. Cannot get length.";
          } else {
            return function() {
              return aImg.imageData.data.length ? aImg.imageData.data.length/4 : 0;
            };
          }
        }(this)),
        getPixel: (function(aImg) {
          if (aImg.isRemote) { // Remote images cannot access imageData
            throw "Image is loaded remotely. Cannot get pixels.";
          } else {
            return function(i) {
              var offset = i*4;
              return p.color.toInt(aImg.imageData.data[offset], aImg.imageData.data[offset+1],
                                   aImg.imageData.data[offset+2], aImg.imageData.data[offset+3]);
            };
          }
        }(this)),
        setPixel: (function(aImg) {
          if (aImg.isRemote) { // Remote images cannot access imageData
            throw "Image is loaded remotely. Cannot set pixel.";
          } else {
            return function(i,c) {
              var offset = i*4;
              aImg.imageData.data[offset+0] = (c & PConstants.RED_MASK) >>> 16;
              aImg.imageData.data[offset+1] = (c & PConstants.GREEN_MASK) >>> 8;
              aImg.imageData.data[offset+2] = (c & PConstants.BLUE_MASK);
              aImg.imageData.data[offset+3] = (c & PConstants.ALPHA_MASK) >>> 24;
            };
          }
        }(this)),
        set: function(arr) {
          if (this.isRemote) { // Remote images cannot access imageData
            throw "Image is loaded remotely. Cannot set pixels.";
          } else {
            for (var i = 0, aL = arr.length; i < aL; i++) {
              this.setPixel(i, arr[i]);
            }
          }
        }
      };

      // These are intentionally left blank for PImages, we work live with pixels and draw as necessary
      /**
      * @member PImage
      * Loads the pixel data for the image into its pixels[] array. This function must always be called
      * before reading from or writing to pixels[].
      * Certain renderers may or may not seem to require loadPixels() or updatePixels(). However, the
      * rule is that any time you want to manipulate the pixels[] array, you must first call loadPixels(),
      * and after changes have been made, call updatePixels(). Even if the renderer may not seem to use
      * this function in the current Processing release, this will always be subject to change.
      */
      this.loadPixels = function() {};

      /**
      * @member PImage
      * Updates the image with the data in its pixels[] array. Use in conjunction with loadPixels(). If
      * you're only reading pixels from the array, there's no need to call updatePixels().
      * Certain renderers may or may not seem to require loadPixels() or updatePixels(). However, the rule
      * is that any time you want to manipulate the pixels[] array, you must first call loadPixels(), and
      * after changes have been made, call updatePixels(). Even if the renderer may not seem to use this
      * function in the current Processing release, this will always be subject to change.
      * Currently, none of the renderers use the additional parameters to updatePixels().
      */
      this.updatePixels = function() {};

      this.toImageData = function() {
        if (this.isRemote) { // Remote images cannot access imageData, send source image instead
          return this.sourceImg;
        } else {
          var canvasData = getCanvasData(this.imageData);
          return canvasData.context.getImageData(0, 0, this.width, this.height);
        }
      };

      this.toDataURL = function() {
        if (this.isRemote) { // Remote images cannot access imageData
          throw "Image is loaded remotely. Cannot create dataURI.";
        } else {
          var canvasData = getCanvasData(this.imageData);
          return canvasData.canvas.toDataURL();
        }
      };

      this.fromImageData = function(canvasImg) {
        this.width = canvasImg.width;
        this.height = canvasImg.height;
        this.imageData = canvasImg;
        // changed for 0.9
        this.format = PConstants.ARGB;
      };

      this.fromHTMLImageData = function(htmlImg) {
        // convert an <img> to a PImage
        var canvasData = getCanvasData(htmlImg);
        try {
          var imageData = canvasData.context.getImageData(0, 0, htmlImg.width, htmlImg.height);
          this.fromImageData(imageData);
        } catch(e) {
          if (htmlImg.width && htmlImg.height) {
            this.isRemote = true;
            this.width = htmlImg.width;
            this.height = htmlImg.height;
          }
        }
        this.sourceImg = htmlImg;
      };

      if (arguments.length === 1) {
        // convert an <img> to a PImage
        this.fromHTMLImageData(arguments[0]);
      } else if (arguments.length === 2 || arguments.length === 3) {
        this.width = aWidth || 1;
        this.height = aHeight || 1;
        this.imageData = utilityContext2d.createImageData(this.width, this.height);
        this.format = (aFormat === PConstants.ARGB || aFormat === PConstants.ALPHA) ? aFormat : PConstants.RGB;
      } else {
        this.width = 0;
        this.height = 0;
        this.imageData = utilityContext2d.createImageData(1, 1);
        this.format = PConstants.ARGB;
      }
    };

    p.PImage = PImage;

    /**
    * Creates a new PImage (the datatype for storing images). This provides a fresh buffer of pixels to play
    * with. Set the size of the buffer with the width and height parameters. The format parameter defines how
    * the pixels are stored. See the PImage reference for more information.
    * Be sure to include all three parameters, specifying only the width and height (but no format) will
    * produce a strange error.
    * Advanced users please note that createImage() should be used instead of the syntax new PImage().
    *
    * @param {int} width                image width
    * @param {int} height               image height
    * @param {MODE} format              Either RGB, ARGB, ALPHA (grayscale alpha channel)
    *
    * @returns {PImage}
    *
    * @see PImage
    * @see PGraphics
    */
    p.createImage = function createImage(w, h, mode) {
      return new PImage(w,h,mode);
    };

    // Loads an image for display. Type is an extension. Callback is fired on load.
    /**
    * Loads an image into a variable of type PImage. Four types of images ( .gif, .jpg, .tga, .png) images may
    * be loaded. To load correctly, images must be located in the data directory of the current sketch. In most
    * cases, load all images in setup() to preload them at the start of the program. Loading images inside draw()
    * will reduce the speed of a program.
    * The filename parameter can also be a URL to a file found online. For security reasons, a Processing sketch
    * found online can only download files from the same server from which it came. Getting around this restriction
    * requires a signed applet.
    * The extension parameter is used to determine the image type in cases where the image filename does not end
    * with a proper extension. Specify the extension as the second parameter to loadImage(), as shown in the
    * third example on this page.
    * If an image is not loaded successfully, the null value is returned and an error message will be printed to
    * the console. The error message does not halt the program, however the null value may cause a NullPointerException
    * if your code does not check whether the value returned from loadImage() is null.
    * Depending on the type of error, a PImage object may still be returned, but the width and height of the image
    * will be set to -1. This happens if bad image data is returned or cannot be decoded properly. Sometimes this happens
    * with image URLs that produce a 403 error or that redirect to a password prompt, because loadImage() will attempt
    * to interpret the HTML as image data.
    *
    * @param {String} filename        name of file to load, can be .gif, .jpg, .tga, or a handful of other image
    *                                 types depending on your platform.
    * @param {String} extension       the type of image to load, for example "png", "gif", "jpg"
    *
    * @returns {PImage}
    *
    * @see PImage
    * @see image
    * @see imageMode
    * @see background
    */
    p.loadImage = function loadImage(file, type, callback) {
      // if type is specified add it with a . to file to make the filename
      if (type) {
        file = file + "." + type;
      }
      // if image is in the preloader cache return a new PImage
      if (curSketch.imageCache.images[file]) {
        return new PImage(curSketch.imageCache.images[file]);
      }
      // else async load it
      else {
        var pimg = new PImage();
        var img = document.createElement('img');

        pimg.sourceImg = img;

        img.onload = (function(aImage, aPImage, aCallback) {
          var image = aImage;
          var pimg = aPImage;
          var callback = aCallback;
          return function() {
            // change the <img> object into a PImage now that its loaded
            pimg.fromHTMLImageData(image);
            pimg.loaded = true;
            if (callback) {
              callback();
            }
          };
        }(img, pimg, callback));

        img.src = file; // needs to be called after the img.onload function is declared or it wont work in opera
        return pimg;
      }
    };

    // async loading of large images, same functionality as loadImage above
    /**
    * This function load images on a separate thread so that your sketch does not freeze while images load during
    * setup(). While the image is loading, its width and height will be 0. If an error occurs while loading the image,
    * its width and height will be set to -1. You'll know when the image has loaded properly because its width and
    * height will be greater than 0. Asynchronous image loading (particularly when downloading from a server) can
    * dramatically improve performance.
    * The extension parameter is used to determine the image type in cases where the image filename does not end
    * with a proper extension. Specify the extension as the second parameter to requestImage().
    *
    * @param {String} filename        name of file to load, can be .gif, .jpg, .tga, or a handful of other image
    *                                 types depending on your platform.
    * @param {String} extension       the type of image to load, for example "png", "gif", "jpg"
    *
    * @returns {PImage}
    *
    * @see PImage
    * @see loadImage
    */
    p.requestImage = p.loadImage;

    function get$0() {
      //return a PImage of curContext
      var c = new PImage(p.width, p.height, PConstants.RGB);
      c.fromImageData(curContext.getImageData(0, 0, p.width, p.height));
      return c;
    }
    function get$2(x,y) {
      var data;
      // return the color at x,y (int) of curContext
      // create a PImage object of size 1x1 and return the int of the pixels array element 0
      if (x < p.width && x >= 0 && y >= 0 && y < p.height) {
        if(isContextReplaced) {
          var offset = ((0|x) + p.width * (0|y))*4;
          data = p.imageData.data;
          return p.color.toInt(data[offset], data[offset+1],
                           data[offset+2], data[offset+3]);
        }
        // x,y is inside canvas space
        data = curContext.getImageData(0|x, 0|y, 1, 1).data;
        // changed for 0.9
        return p.color.toInt(data[0], data[1], data[2], data[3]);
      } else {
        // x,y is outside image return transparent black
        return 0;
      }
    }
    function get$3(x,y,img) {
      if (img.isRemote) { // Remote images cannot access imageData
        throw "Image is loaded remotely. Cannot get x,y.";
      } else {
        // PImage.get(x,y) was called, return the color (int) at x,y of img
        // changed in 0.9
        var offset = y * img.width * 4 + (x * 4);
        return p.color.toInt(img.imageData.data[offset],
                           img.imageData.data[offset + 1],
                           img.imageData.data[offset + 2],
                           img.imageData.data[offset + 3]);
      }
    }
    function get$4(x, y, w, h) {
      // return a PImage of w and h from cood x,y of curContext
      var c = new PImage(w, h, PConstants.RGB);
      c.fromImageData(curContext.getImageData(x, y, w, h));
      return c;
    }
    function get$5(x, y, w, h, img) {
      if (img.isRemote) { // Remote images cannot access imageData
        throw "Image is loaded remotely. Cannot get x,y,w,h.";
      } else {
        // PImage.get(x,y,w,h) was called, return x,y,w,h PImage of img
        // changed for 0.9, offset start point needs to be *4
        var c = new PImage(w, h, PConstants.RGB), cData = c.imageData.data,
          imgWidth = img.width, imgHeight = img.height, imgData = img.imageData.data;
        // Don't need to copy pixels from the image outside ranges.
        var startRow = Math.max(0, -y), startColumn = Math.max(0, -x),
          stopRow = Math.min(h, imgHeight - y), stopColumn = Math.min(w, imgWidth - x);
        for (var i = startRow; i < stopRow; ++i) {
          var sourceOffset = ((y + i) * imgWidth + (x + startColumn)) * 4;
          var targetOffset = (i * w + startColumn) * 4;
          for (var j = startColumn; j < stopColumn; ++j) {
            cData[targetOffset++] = imgData[sourceOffset++];
            cData[targetOffset++] = imgData[sourceOffset++];
            cData[targetOffset++] = imgData[sourceOffset++];
            cData[targetOffset++] = imgData[sourceOffset++];
          }
        }
        return c;
      }
    }

    // Gets a single pixel or block of pixels from the current Canvas Context or a PImage
    /**
    * Reads the color of any pixel or grabs a section of an image. If no parameters are specified, the entire
    * image is returned. Get the value of one pixel by specifying an x,y coordinate. Get a section of the display
    * window by specifying an additional width and height parameter. If the pixel requested is outside of the image
    * window, black is returned. The numbers returned are scaled according to the current color ranges, but only RGB
    * values are returned by this function. For example, even though you may have drawn a shape with colorMode(HSB),
    * the numbers returned will be in RGB.
    * Getting the color of a single pixel with get(x, y) is easy, but not as fast as grabbing the data directly
    * from pixels[]. The equivalent statement to "get(x, y)" using pixels[] is "pixels[y*width+x]". Processing
    * requires calling loadPixels() to load the display window data into the pixels[] array before getting the values.
    * This function ignores imageMode().
    *
    * @param {int} x            x-coordinate of the pixel
    * @param {int} y            y-coordinate of the pixel
    * @param {int} width        width of pixel rectangle to get
    * @param {int} height       height of pixel rectangle to get
    *
    * @returns {Color|PImage}
    *
    * @see set
    * @see pixels[]
    * @see imageMode
    */
    p.get = function get(x, y, w, h, img) {
      // for 0 2 and 4 arguments use curContext, otherwise PImage.get was called
      if (arguments.length === 2) {
        return get$2(x, y);
      } else if (arguments.length === 0) {
        return get$0();
      } else if (arguments.length === 5) {
        return get$5(x, y, w, h, img);
      } else if (arguments.length === 4) {
        return get$4(x, y, w, h);
      } else if (arguments.length === 3) {
        return get$3(x, y, w);
      } else if (arguments.length === 1) {
        // PImage.get() was called, return the PImage
        return x;
      }
    };

    /**
     * Creates and returns a new <b>PGraphics</b> object of the types P2D, P3D, and JAVA2D. Use this class if you need to draw
     * into an off-screen graphics buffer. It's not possible to use <b>createGraphics()</b> with OPENGL, because it doesn't
     * allow offscreen use. The DXF and PDF renderers require the filename parameter. <br /><br /> It's important to call
     * any drawing commands between beginDraw() and endDraw() statements. This is also true for any commands that affect
     * drawing, such as smooth() or colorMode().<br /><br /> Unlike the main drawing surface which is completely opaque,
     * surfaces created with createGraphics() can have transparency. This makes it possible to draw into a graphics and
     * maintain the alpha channel.
     *
     * @param {int} width       width in pixels
     * @param {int} height      height in pixels
     * @param {int} renderer    Either P2D, P3D, JAVA2D, PDF, DXF
     * @param {String} filename the name of the file (not supported yet)
     */
    p.createGraphics = function createGraphics(w, h, render) {
      var canvas = document.createElement("canvas");
      var pg = new Processing(canvas);
      pg.size(w, h, render);
      pg.canvas = canvas;

      /**
      * This function takes content from a canvas and turns it into an ImageData object to be used with a PImage
      *
      * @returns {ImageData}        ImageData object to attach to a PImage (1D array of pixel data)
      *
      * @see PImage
      */
      pg.toImageData = function() {
        var curContext = this.externals.context;
        if(!this.use3DContext){
          return curContext.getImageData(0, 0, this.width, this.height);
        } else {
          var c = document.createElement("canvas");
          var ctx = c.getContext("2d");
          var obj = ctx.createImageData(this.width, this.height);
          var uBuff = new Uint8Array(this.width * this.height * 4);
          curContext.readPixels(0,0,this.width,this.height,curContext.RGBA,curContext.UNSIGNED_BYTE, uBuff);
          for(var i=0, ul=uBuff.length, h=this.height, w=this.width, obj_data=obj.data; i < ul; i++){
            obj_data[i] = uBuff[(h - 1 - Math.floor(i / 4 / w)) * w * 4 + (i % (w * 4))];
          }

          return obj;
        }
      };

      return pg;
    };

    // pixels caching
    function resetContext() {
      if(isContextReplaced) {
        curContext = originalContext;
        isContextReplaced = false;

        p.updatePixels();
      }
    }
    function SetPixelContextWrapper() {
      function wrapFunction(newContext, name) {
        function wrapper() {
          resetContext();
          curContext[name].apply(curContext, arguments);
        }
        newContext[name] = wrapper;
      }
      function wrapProperty(newContext, name) {
        function getter() {
          resetContext();
          return curContext[name];
        }
        function setter(value) {
          resetContext();
          curContext[name] = value;
        }
        p.defineProperty(newContext, name, { get: getter, set: setter });
      }
      for(var n in curContext) {
        if(typeof curContext[n] === 'function') {
          wrapFunction(this, n);
        } else {
          wrapProperty(this, n);
        }
      }
    }
    function replaceContext() {
      if(isContextReplaced) {
        return;
      }
      p.loadPixels();
      if(proxyContext === null) {
        originalContext = curContext;
        proxyContext = new SetPixelContextWrapper();
      }
      isContextReplaced = true;
      curContext = proxyContext;
      setPixelsCached = 0;
    }

    function set$3(x, y, c) {
      if (x < p.width && x >= 0 && y >= 0 && y < p.height) {
        replaceContext();
        p.pixels.setPixel((0|x)+p.width*(0|y), c);
        if(++setPixelsCached > maxPixelsCached) {
          resetContext();
        }
      }
    }
    function set$4(x, y, obj, img) {
      if (img.isRemote) { // Remote images cannot access imageData
        throw "Image is loaded remotely. Cannot set x,y.";
      } else {
        var c = p.color.toArray(obj);
        var offset = y * img.width * 4 + (x*4);
        var data = img.imageData.data;
        data[offset] = c[0];
        data[offset+1] = c[1];
        data[offset+2] = c[2];
        data[offset+3] = c[3];
      }
    }

    // Paints a pixel array into the canvas
    /**
    * Changes the color of any pixel or writes an image directly into the display window. The x and y parameters
    * specify the pixel to change and the color  parameter specifies the color value. The color parameter is affected
    * by the current color mode (the default is RGB values from 0 to 255). When setting an image, the x and y
    * parameters define the coordinates for the upper-left corner of the image.
    * Setting the color of a single pixel with set(x, y) is easy, but not as fast as putting the data directly
    * into pixels[]. The equivalent statement to "set(x, y, #000000)" using pixels[] is "pixels[y*width+x] = #000000".
    * You must call loadPixels() to load the display window data into the pixels[] array before setting the values
    * and calling updatePixels() to update the window with any changes. This function ignores imageMode().
    *
    * @param {int} x            x-coordinate of the pixel
    * @param {int} y            y-coordinate of the pixel
    * @param {Color} obj        any value of the color datatype
    * @param {PImage} img       any valid variable of type PImage
    *
    * @see get
    * @see pixels[]
    * @see imageMode
    */
    p.set = function set(x, y, obj, img) {
      var color, oldFill;
      if (arguments.length === 3) {
        // called p.set(), was it with a color or a img ?
        if (typeof obj === "number") {
          set$3(x, y, obj);
        } else if (obj instanceof PImage) {
          p.image(obj, x, y);
        }
      } else if (arguments.length === 4) {
        // PImage.set(x,y,c) was called, set coordinate x,y color to c of img
        set$4(x, y, obj, img);
      }
    };
    p.imageData = {};

    // handle the sketch code for pixels[]
    // parser code converts pixels[] to getPixels() or setPixels(),
    // .length becomes getLength()
    /**
    * Array containing the values for all the pixels in the display window. These values are of the color datatype.
    * This array is the size of the display window. For example, if the image is 100x100 pixels, there will be 10000
    * values and if the window is 200x300 pixels, there will be 60000 values. The index value defines the position
    * of a value within the array. For example, the statment color b = pixels[230] will set the variable b to be
    * equal to the value at that location in the array.
    * Before accessing this array, the data must loaded with the loadPixels() function. After the array data has
    * been modified, the updatePixels() function must be run to update the changes.
    *
    * @param {int} index      must not exceed the size of the array
    *
    * @see loadPixels
    * @see updatePixels
    * @see get
    * @see set
    * @see PImage
    */
    p.pixels = {
      getLength: function() { return p.imageData.data.length ? p.imageData.data.length/4 : 0; },
      getPixel: function(i) {
        var offset = i*4;
        return (p.imageData.data[offset+3] << 24) & 0xff000000 |
               (p.imageData.data[offset+0] << 16) & 0x00ff0000 |
               (p.imageData.data[offset+1] << 8) & 0x0000ff00 |
               p.imageData.data[offset+2] & 0x000000ff;
      },
      setPixel: function(i,c) {
        var offset = i*4;
        p.imageData.data[offset+0] = (c & 0x00ff0000) >>> 16; // RED_MASK
        p.imageData.data[offset+1] = (c & 0x0000ff00) >>> 8;  // GREEN_MASK
        p.imageData.data[offset+2] = (c & 0x000000ff);        // BLUE_MASK
        p.imageData.data[offset+3] = (c & 0xff000000) >>> 24; // ALPHA_MASK
      },
      set: function(arr) {
        for (var i = 0, aL = arr.length; i < aL; i++) {
          this.setPixel(i, arr[i]);
        }
      }
    };

    // Gets a 1-Dimensional pixel array from Canvas
    /**
    * Loads the pixel data for the display window into the pixels[] array. This function must always be called
    * before reading from or writing to pixels[].
    * Certain renderers may or may not seem to require loadPixels() or updatePixels(). However, the rule is that
    * any time you want to manipulate the pixels[] array, you must first call loadPixels(), and after changes
    * have been made, call updatePixels(). Even if the renderer may not seem to use this function in the current
    * Processing release, this will always be subject to change.
    *
    * @see pixels[]
    * @see updatePixels
    */
    p.loadPixels = function() {
      p.imageData = curContext.getImageData(0, 0, p.width, p.height);
    };

    // Draws a 1-Dimensional pixel array to Canvas
    /**
    * Updates the display window with the data in the pixels[] array. Use in conjunction with loadPixels(). If
    * you're only reading pixels from the array, there's no need to call updatePixels() unless there are changes.
    * Certain renderers may or may not seem to require loadPixels() or updatePixels(). However, the rule is that
    * any time you want to manipulate the pixels[] array, you must first call loadPixels(), and after changes
    * have been made, call updatePixels(). Even if the renderer may not seem to use this function in the current
    * Processing release, this will always be subject to change.
    * Currently, none of the renderers use the additional parameters to updatePixels(), however this may be
    * implemented in the future.
    *
    * @see loadPixels
    * @see pixels[]
    */
    p.updatePixels = function() {
      if (p.imageData) {
        curContext.putImageData(p.imageData, 0, 0);
      }
    };

    /**
    * Set various hints and hacks for the renderer. This is used to handle obscure rendering features that cannot be
    * implemented in a consistent manner across renderers. Many options will often graduate to standard features
    * instead of hints over time.
    * hint(ENABLE_OPENGL_4X_SMOOTH) - Enable 4x anti-aliasing for OpenGL. This can help force anti-aliasing if
    * it has not been enabled by the user. On some graphics cards, this can also be set by the graphics driver's
    * control panel, however not all cards make this available. This hint must be called immediately after the
    * size() command because it resets the renderer, obliterating any settings and anything drawn (and like size(),
    * re-running the code that came before it again).
    * hint(DISABLE_OPENGL_2X_SMOOTH) - In Processing 1.0, Processing always enables 2x smoothing when the OpenGL
    * renderer is used. This hint disables the default 2x smoothing and returns the smoothing behavior found in
    * earlier releases, where smooth() and noSmooth() could be used to enable and disable smoothing, though the
    * quality was inferior.
    * hint(ENABLE_NATIVE_FONTS) - Use the native version fonts when they are installed, rather than the bitmapped
    * version from a .vlw file. This is useful with the JAVA2D renderer setting, as it will improve font rendering
    * speed. This is not enabled by default, because it can be misleading while testing because the type will look
    * great on your machine (because you have the font installed) but lousy on others' machines if the identical
    * font is unavailable. This option can only be set per-sketch, and must be called before any use of textFont().
    * hint(DISABLE_DEPTH_TEST) - Disable the zbuffer, allowing you to draw on top of everything at will. When depth
    * testing is disabled, items will be drawn to the screen sequentially, like a painting. This hint is most often
    * used to draw in 3D, then draw in 2D on top of it (for instance, to draw GUI controls in 2D on top of a 3D
    * interface). Starting in release 0149, this will also clear the depth buffer. Restore the default with
    * hint(ENABLE_DEPTH_TEST), but note that with the depth buffer cleared, any 3D drawing that happens later in
    * draw() will ignore existing shapes on the screen.
    * hint(ENABLE_DEPTH_SORT) - Enable primitive z-sorting of triangles and lines in P3D and OPENGL. This can slow
    * performance considerably, and the algorithm is not yet perfect. Restore the default with hint(DISABLE_DEPTH_SORT).
    * hint(DISABLE_OPENGL_ERROR_REPORT) - Speeds up the OPENGL renderer setting by not checking for errors while
    * running. Undo with hint(ENABLE_OPENGL_ERROR_REPORT).
    * As of release 0149, unhint() has been removed in favor of adding additional ENABLE/DISABLE constants to reset
    * the default behavior. This prevents the double negatives, and also reinforces which hints can be enabled or disabled.
    *
    * @param {MODE} item          constant: name of the hint to be enabled or disabled
    *
    * @see PGraphics
    * @see createGraphics
    * @see size
    */
    p.hint = function hint(which) {
      if (which === PConstants.DISABLE_DEPTH_TEST) {
         curContext.disable(curContext.DEPTH_TEST);
         curContext.depthMask(false);
         curContext.clear(curContext.DEPTH_BUFFER_BIT);
      }
      else if (which === PConstants.ENABLE_DEPTH_TEST) {
         curContext.enable(curContext.DEPTH_TEST);
         curContext.depthMask(true);
      }
    };

    /**
     * The background() function sets the color used for the background of the Processing window.
     * The default background is light gray. In the <b>draw()</b> function, the background color is used to clear the display window at the beginning of each frame.
     * An image can also be used as the background for a sketch, however its width and height must be the same size as the sketch window.
     * To resize an image 'b' to the size of the sketch window, use b.resize(width, height).
     * Images used as background will ignore the current <b>tint()</b> setting.
     * For the main drawing surface, the alpha value will be ignored. However,
     * alpha can be used on PGraphics objects from <b>createGraphics()</b>. This is
     * the only way to set all the pixels partially transparent, for instance.
     * If the 'gray' parameter is passed in the function sets the background to a grayscale value, based on the
     * current colorMode.
     * <p>
     * Note that background() should be called before any transformations occur,
     * because some implementations may require the current transformation matrix
     * to be identity before drawing.
     *
     * @param {int|float} gray    specifies a value between white and black
     * @param {int|float} value1  red or hue value (depending on the current color mode)
     * @param {int|float} value2  green or saturation value (depending on the current color mode)
     * @param {int|float} value3  blue or brightness value (depending on the current color mode)
     * @param {int|float} alpha   opacity of the background
     * @param {Color} color       any value of the color datatype
     * @param {int} hex           color value in hexadecimal notation (i.e. #FFCC00 or 0xFFFFCC00)
     *
     * @see #stroke()
     * @see #fill()
     * @see #tint()
     * @see #colorMode()
     */
    // Draw an image or a color to the background
    p.background = function background() {
      var color, a, img;
      // background params are either a color or a PImage
      if (typeof arguments[0] === 'number') {
        color = p.color.apply(this, arguments);

        // override alpha value, processing ignores the alpha for background color
        if (!curSketch.options.isTransparent) {
          color = color | PConstants.ALPHA_MASK;
        }
      } else if (arguments.length === 1 && arguments[0] instanceof PImage) {
        img = arguments[0];

        if (!img.pixels || img.width !== p.width || img.height !== p.height) {
          throw "Background image must be the same dimensions as the canvas.";
        }
      } else {
        throw "Incorrect background parameters.";
      }

      if (p.use3DContext) {
        if (color !== undef) {
          var c = p.color.toGLArray(color);
          refreshBackground = function() {
            curContext.clearColor(c[0], c[1], c[2], c[3]);
            curContext.clear(curContext.COLOR_BUFFER_BIT | curContext.DEPTH_BUFFER_BIT);
          };
        } else {
          // Handle image background for 3d context. not done yet.
          refreshBackground = function() {};
        }
      } else { // 2d context
        if (color !== undef) {
          refreshBackground = function() {
            saveContext();
            curContext.setTransform(1, 0, 0, 1, 0, 0);

            if (curSketch.options.isTransparent) {
              curContext.clearRect(0,0, p.width, p.height);
            }
            curContext.fillStyle = p.color.toString(color);
            curContext.fillRect(0, 0, p.width, p.height);
            isFillDirty = true;
            restoreContext();
          };
        } else {
          refreshBackground = function() {
            saveContext();
            curContext.setTransform(1, 0, 0, 1, 0, 0);
            p.image(img, 0, 0);
            restoreContext();
          };
        }
      }

      refreshBackground();
    };

    // Draws an image to the Canvas
    /**
    * Displays images to the screen. The images must be in the sketch's "data" directory to load correctly. Select "Add
    * file..." from the "Sketch" menu to add the image. Processing currently works with GIF, JPEG, and Targa images. The
    * color of an image may be modified with the tint() function and if a GIF has transparency, it will maintain its
    * transparency. The img parameter specifies the image to display and the x and y parameters define the location of
    * the image from its upper-left corner. The image is displayed at its original size unless the width and height
    * parameters specify a different size. The imageMode() function changes the way the parameters work. A call to
    * imageMode(CORNERS) will change the width and height parameters to define the x and y values of the opposite
    * corner of the image.
    *
    * @param {PImage} img            the image to display
    * @param {int|float} x           x-coordinate of the image
    * @param {int|float} y           y-coordinate of the image
    * @param {int|float} width       width to display the image
    * @param {int|float} height      height to display the image
    *
    * @see loadImage
    * @see PImage
    * @see imageMode
    * @see tint
    * @see background
    * @see alpha
    */
    p.image = function image(img, x, y, w, h) {
      if (img.width > 0) {
        var wid = w || img.width;
        var hgt = h || img.height;
        if (p.use3DContext) {
          p.beginShape(p.QUADS);
          p.texture(img.externals.canvas);
          p.vertex(x, y, 0, 0, 0);
          p.vertex(x, y+hgt, 0, 0, hgt);
          p.vertex(x+wid, y+hgt, 0, wid, hgt);
          p.vertex(x+wid, y, 0, wid, 0);
          p.endShape();
        } else {
          var bounds = imageModeConvert(x || 0, y || 0, w || img.width, h || img.height, arguments.length < 4);
          //var fastImage = ("sourceImg" in img) && curTint === null && !img.__mask;
          var fastImage = !!img.sourceImg && curTint === null && !img.__mask;
          if (fastImage) {
            var htmlElement = img.sourceImg;
            // Using HTML element's width and height in case if the image was resized.
            curContext.drawImage(htmlElement, 0, 0,
              htmlElement.width, htmlElement.height, bounds.x, bounds.y, bounds.w, bounds.h);
          } else {
            var obj = img.toImageData();

            if (img.__mask) {
              var j, size;
              if (img.__mask.constructor.name === "PImage") {
                var objMask = img.__mask.toImageData();
                for (j = 2, size = img.width * img.height * 4; j < size; j += 4) {
                  // using it as an alpha channel
                  obj.data[j + 1] = objMask.data[j];
                  // but only the blue color channel
                }
              } else {
                for (j = 0, size = img.__mask.length; j < size; ++j) {
                  obj.data[(j << 2) + 3] = img.__mask[j];
                }
              }
            }

            // Tint the image
            if(curTint !== null) {
              curTint(obj);
            }

            curContext.drawImage(getCanvasData(obj).canvas, 0, 0,
              img.width, img.height, bounds.x, bounds.y, bounds.w, bounds.h);
          }
        }
      }
    };

    // Clears a rectangle in the Canvas element or the whole Canvas
    p.clear = function clear(x, y, width, height) {
      if (arguments.length === 0) {
        curContext.clearRect(0, 0, p.width, p.height);
      } else {
        curContext.clearRect(x, y, width, height);
      }
    };

    /**
     * The tint() function sets the fill value for displaying images. Images can be tinted to
     * specified colors or made transparent by setting the alpha.
     * <br><br>To make an image transparent, but not change it's color,
     * use white as the tint color and specify an alpha value. For instance,
     * tint(255, 128) will make an image 50% transparent (unless
     * <b>colorMode()</b> has been used).
     *
     * <br><br>When using hexadecimal notation to specify a color, use "#" or
     * "0x" before the values (e.g. #CCFFAA, 0xFFCCFFAA). The # syntax uses six
     * digits to specify a color (the way colors are specified in HTML and CSS).
     * When using the hexadecimal notation starting with "0x", the hexadecimal
     * value must be specified with eight characters; the first two characters
     * define the alpha component and the remainder the red, green, and blue
     * components.
     * <br><br>The value for the parameter "gray" must be less than or equal
     * to the current maximum value as specified by <b>colorMode()</b>.
     * The default maximum value is 255.
     * <br><br>The tint() method is also used to control the coloring of
     * textures in 3D.
     *
     * @param {int|float} gray    any valid number
     * @param {int|float} alpha    opacity of the image
     * @param {int|float} value1  red or hue value
     * @param {int|float} value2  green or saturation value
     * @param {int|float} value3  blue or brightness value
     * @param {int|float} color    any value of the color datatype
     * @param {int} hex            color value in hexadecimal notation (i.e. #FFCC00 or 0xFFFFCC00)
     *
     * @see #noTint()
     * @see #image()
     */
    p.tint = function tint() {
      var tintColor = p.color.apply(this, arguments);
      var r = p.red(tintColor) / colorModeX;
      var g = p.green(tintColor) / colorModeY;
      var b = p.blue(tintColor) / colorModeZ;
      var a = p.alpha(tintColor) / colorModeA;

      curTint = function(obj) {
        var data = obj.data,
            length = 4 * obj.width * obj.height;
        for (var i = 0; i < length;) {
          data[i++] *= r;
          data[i++] *= g;
          data[i++] *= b;
          data[i++] *= a;
        }
      };
    };

    /**
     * The noTint() function removes the current fill value for displaying images and reverts to displaying images with their original hues.
     *
     * @see #tint()
     * @see #image()
     */
    p.noTint = function noTint() {
      curTint = null;
    };

    /**
    * Copies a region of pixels from the display window to another area of the display window and copies a region of pixels from an
    * image used as the srcImg  parameter into the display window. If the source and destination regions aren't the same size, it will
    * automatically resize the source pixels to fit the specified target region. No alpha information is used in the process, however
    * if the source image has an alpha channel set, it will be copied as well. This function ignores imageMode().
    *
    * @param {int} x            X coordinate of the source's upper left corner
    * @param {int} y            Y coordinate of the source's upper left corner
    * @param {int} width        source image width
    * @param {int} height       source image height
    * @param {int} dx           X coordinate of the destination's upper left corner
    * @param {int} dy           Y coordinate of the destination's upper left corner
    * @param {int} dwidth       destination image width
    * @param {int} dheight      destination image height
    * @param {PImage} srcImg    image variable referring to the source image
    *
    * @see blend
    * @see get
    */
    p.copy = function copy(src, sx, sy, sw, sh, dx, dy, dw, dh) {
      if (arguments.length === 8) {
        // shift everything, and introduce p
        dh = dw;
        dw = dy;
        dy = dx;
        dx = sh;
        sh = sw;
        sw = sy;
        sy = sx;
        sx = src;
        src = p;
      }
      p.blend(src, sx, sy, sw, sh, dx, dy, dw, dh, PConstants.REPLACE);
    };

    /**
    * Blends a region of pixels from one image into another (or in itself again) with full alpha channel support. There
    * is a choice of the following modes to blend the source pixels (A) with the ones of pixels in the destination image (B):
    * BLEND - linear interpolation of colours: C = A*factor + B
    * ADD - additive blending with white clip: C = min(A*factor + B, 255)
    * SUBTRACT - subtractive blending with black clip: C = max(B - A*factor, 0)
    * DARKEST - only the darkest colour succeeds: C = min(A*factor, B)
    * LIGHTEST - only the lightest colour succeeds: C = max(A*factor, B)
    * DIFFERENCE - subtract colors from underlying image.
    * EXCLUSION - similar to DIFFERENCE, but less extreme.
    * MULTIPLY - Multiply the colors, result will always be darker.
    * SCREEN - Opposite multiply, uses inverse values of the colors.
    * OVERLAY - A mix of MULTIPLY and SCREEN. Multiplies dark values, and screens light values.
    * HARD_LIGHT - SCREEN when greater than 50% gray, MULTIPLY when lower.
    * SOFT_LIGHT - Mix of DARKEST and LIGHTEST. Works like OVERLAY, but not as harsh.
    * DODGE - Lightens light tones and increases contrast, ignores darks. Called "Color Dodge" in Illustrator and Photoshop.
    * BURN - Darker areas are applied, increasing contrast, ignores lights. Called "Color Burn" in Illustrator and Photoshop.
    * All modes use the alpha information (highest byte) of source image pixels as the blending factor. If the source and
    * destination regions are different sizes, the image will be automatically resized to match the destination size. If the
    * srcImg parameter is not used, the display window is used as the source image.  This function ignores imageMode().
    *
    * @param {int} x            X coordinate of the source's upper left corner
    * @param {int} y            Y coordinate of the source's upper left corner
    * @param {int} width        source image width
    * @param {int} height       source image height
    * @param {int} dx           X coordinate of the destination's upper left corner
    * @param {int} dy           Y coordinate of the destination's upper left corner
    * @param {int} dwidth       destination image width
    * @param {int} dheight      destination image height
    * @param {PImage} srcImg    image variable referring to the source image
    * @param {PImage} MODE      Either BLEND, ADD, SUBTRACT, LIGHTEST, DARKEST, DIFFERENCE, EXCLUSION, MULTIPLY, SCREEN,
    *                           OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN
    * @see filter
    */
    p.blend = function blend(src, sx, sy, sw, sh, dx, dy, dw, dh, mode, pimgdest) {
      if (arguments.length === 9) {
        // shift everything, and introduce p
        mode = dh;
        dh = dw;
        dw = dy;
        dy = dx;
        dx = sh;
        sh = sw;
        sw = sy;
        sy = sx;
        sx = src;
        src = p;
      }

      var sx2 = sx + sw;
      var sy2 = sy + sh;
      var dx2 = dx + dw;
      var dy2 = dy + dh;
      var dest;
      if (src.isRemote) { // Remote images cannot access imageData
        throw "Image is loaded remotely. Cannot blend image.";
      } else {
        // check if pimgdest is there and pixels, if so this was a call from pimg.blend
        if (arguments.length === 10 || arguments.length === 9) {
          p.loadPixels();
          dest = p;
        } else if (arguments.length === 11 && pimgdest && pimgdest.imageData) {
          dest = pimgdest;
        }
        if (src === p) {
          if (p.intersect(sx, sy, sx2, sy2, dx, dy, dx2, dy2)) {
            p.blit_resize(p.get(sx, sy, sx2 - sx, sy2 - sy), 0, 0, sx2 - sx - 1, sy2 - sy - 1,
                          dest.imageData.data, dest.width, dest.height, dx, dy, dx2, dy2, mode);
          } else {
            // same as below, except skip the loadPixels() because it'd be redundant
            p.blit_resize(src, sx, sy, sx2, sy2, dest.imageData.data, dest.width, dest.height, dx, dy, dx2, dy2, mode);
          }
        } else {
          src.loadPixels();
          p.blit_resize(src, sx, sy, sx2, sy2, dest.imageData.data, dest.width, dest.height, dx, dy, dx2, dy2, mode);
        }
        if (arguments.length === 10) {
          p.updatePixels();
        }
      }
    };

    // helper function for filter()
    var buildBlurKernel = function buildBlurKernel(r) {
      var radius = p.floor(r * 3.5), i, radiusi;
      radius = (radius < 1) ? 1 : ((radius < 248) ? radius : 248);
      if (p.shared.blurRadius !== radius) {
        p.shared.blurRadius = radius;
        p.shared.blurKernelSize = 1 + (p.shared.blurRadius<<1);
        p.shared.blurKernel = new Float32Array(p.shared.blurKernelSize);
        // init blurKernel
        for (i = 0; i < p.shared.blurKernelSize; i++) {
          p.shared.blurKernel[i] = 0;
        }

        for (i = 1, radiusi = radius - 1; i < radius; i++) {
          p.shared.blurKernel[radius+i] = p.shared.blurKernel[radiusi] = radiusi * radiusi;
        }
        p.shared.blurKernel[radius] = radius * radius;
      }
    };

    var blurARGB = function blurARGB(r, aImg) {
      var sum, cr, cg, cb, ca, c, m;
      var read, ri, ym, ymi, bk0;
      var wh = aImg.pixels.getLength();
      var r2 = new Float32Array(wh);
      var g2 = new Float32Array(wh);
      var b2 = new Float32Array(wh);
      var a2 = new Float32Array(wh);
      var yi = 0;
      var x, y, i;

      buildBlurKernel(r);

      for (y = 0; y < aImg.height; y++) {
        for (x = 0; x < aImg.width; x++) {
          cb = cg = cr = ca = sum = 0;
          read = x - p.shared.blurRadius;
          if (read<0) {
            bk0 = -read;
            read = 0;
          } else {
            if (read >= aImg.width) {
              break;
            }
            bk0=0;
          }
          for (i = bk0; i < p.shared.blurKernelSize; i++) {
            if (read >= aImg.width) {
              break;
            }
            c = aImg.pixels.getPixel(read + yi);
            m = p.shared.blurKernel[i];
            ca += m * ((c & PConstants.ALPHA_MASK) >>> 24);
            cr += m * ((c & PConstants.RED_MASK) >> 16);
            cg += m * ((c & PConstants.GREEN_MASK) >> 8);
            cb += m * (c & PConstants.BLUE_MASK);
            sum += m;
            read++;
          }
          ri = yi + x;
          a2[ri] = ca / sum;
          r2[ri] = cr / sum;
          g2[ri] = cg / sum;
          b2[ri] = cb / sum;
        }
        yi += aImg.width;
      }

      yi = 0;
      ym = -p.shared.blurRadius;
      ymi = ym*aImg.width;

      for (y = 0; y < aImg.height; y++) {
        for (x = 0; x < aImg.width; x++) {
          cb = cg = cr = ca = sum = 0;
          if (ym<0) {
            bk0 = ri = -ym;
            read = x;
          } else {
            if (ym >= aImg.height) {
              break;
            }
            bk0 = 0;
            ri = ym;
            read = x + ymi;
          }
          for (i = bk0; i < p.shared.blurKernelSize; i++) {
            if (ri >= aImg.height) {
              break;
            }
            m = p.shared.blurKernel[i];
            ca += m * a2[read];
            cr += m * r2[read];
            cg += m * g2[read];
            cb += m * b2[read];
            sum += m;
            ri++;
            read += aImg.width;
          }
          aImg.pixels.setPixel(x+yi, ((ca/sum)<<24 | (cr/sum)<<16 | (cg/sum)<<8 | (cb/sum)));
        }
        yi += aImg.width;
        ymi += aImg.width;
        ym++;
      }
    };

    // helper funtion for ERODE and DILATE modes of filter()
    var dilate = function dilate(isInverted, aImg) {
      var currIdx = 0;
      var maxIdx = aImg.pixels.getLength();
      var out = new Int32Array(maxIdx);
      var currRowIdx, maxRowIdx, colOrig, colOut, currLum;
      var idxRight, idxLeft, idxUp, idxDown,
          colRight, colLeft, colUp, colDown,
          lumRight, lumLeft, lumUp, lumDown;

      if (!isInverted) {
        // erosion (grow light areas)
        while (currIdx<maxIdx) {
          currRowIdx = currIdx;
          maxRowIdx = currIdx + aImg.width;
          while (currIdx < maxRowIdx) {
            colOrig = colOut = aImg.pixels.getPixel(currIdx);
            idxLeft = currIdx - 1;
            idxRight = currIdx + 1;
            idxUp = currIdx - aImg.width;
            idxDown = currIdx + aImg.width;
            if (idxLeft < currRowIdx) {
              idxLeft = currIdx;
            }
            if (idxRight >= maxRowIdx) {
              idxRight = currIdx;
            }
            if (idxUp < 0) {
              idxUp = 0;
            }
            if (idxDown >= maxIdx) {
              idxDown = currIdx;
            }
            colUp = aImg.pixels.getPixel(idxUp);
            colLeft = aImg.pixels.getPixel(idxLeft);
            colDown = aImg.pixels.getPixel(idxDown);
            colRight = aImg.pixels.getPixel(idxRight);

            // compute luminance
            currLum = 77*(colOrig>>16&0xff) + 151*(colOrig>>8&0xff) + 28*(colOrig&0xff);
            lumLeft = 77*(colLeft>>16&0xff) + 151*(colLeft>>8&0xff) + 28*(colLeft&0xff);
            lumRight = 77*(colRight>>16&0xff) + 151*(colRight>>8&0xff) + 28*(colRight&0xff);
            lumUp = 77*(colUp>>16&0xff) + 151*(colUp>>8&0xff) + 28*(colUp&0xff);
            lumDown = 77*(colDown>>16&0xff) + 151*(colDown>>8&0xff) + 28*(colDown&0xff);

            if (lumLeft > currLum) {
              colOut = colLeft;
              currLum = lumLeft;
            }
            if (lumRight > currLum) {
              colOut = colRight;
              currLum = lumRight;
            }
            if (lumUp > currLum) {
              colOut = colUp;
              currLum = lumUp;
            }
            if (lumDown > currLum) {
              colOut = colDown;
              currLum = lumDown;
            }
            out[currIdx++] = colOut;
          }
        }
      } else {
        // dilate (grow dark areas)
        while (currIdx < maxIdx) {
          currRowIdx = currIdx;
          maxRowIdx = currIdx + aImg.width;
          while (currIdx < maxRowIdx) {
            colOrig = colOut = aImg.pixels.getPixel(currIdx);
            idxLeft = currIdx - 1;
            idxRight = currIdx + 1;
            idxUp = currIdx - aImg.width;
            idxDown = currIdx + aImg.width;
            if (idxLeft < currRowIdx) {
              idxLeft = currIdx;
            }
            if (idxRight >= maxRowIdx) {
              idxRight = currIdx;
            }
            if (idxUp < 0) {
              idxUp = 0;
            }
            if (idxDown >= maxIdx) {
              idxDown = currIdx;
            }
            colUp = aImg.pixels.getPixel(idxUp);
            colLeft = aImg.pixels.getPixel(idxLeft);
            colDown = aImg.pixels.getPixel(idxDown);
            colRight = aImg.pixels.getPixel(idxRight);

            // compute luminance
            currLum = 77*(colOrig>>16&0xff) + 151*(colOrig>>8&0xff) + 28*(colOrig&0xff);
            lumLeft = 77*(colLeft>>16&0xff) + 151*(colLeft>>8&0xff) + 28*(colLeft&0xff);
            lumRight = 77*(colRight>>16&0xff) + 151*(colRight>>8&0xff) + 28*(colRight&0xff);
            lumUp = 77*(colUp>>16&0xff) + 151*(colUp>>8&0xff) + 28*(colUp&0xff);
            lumDown = 77*(colDown>>16&0xff) + 151*(colDown>>8&0xff) + 28*(colDown&0xff);

            if (lumLeft < currLum) {
              colOut = colLeft;
              currLum = lumLeft;
            }
            if (lumRight < currLum) {
              colOut = colRight;
              currLum = lumRight;
            }
            if (lumUp < currLum) {
              colOut = colUp;
              currLum = lumUp;
            }
            if (lumDown < currLum) {
              colOut = colDown;
              currLum = lumDown;
            }
            out[currIdx++]=colOut;
          }
        }
      }
      aImg.pixels.set(out);
      //p.arraycopy(out,0,pixels,0,maxIdx);
    };

    /**
    * Filters the display window as defined by one of the following modes:
    * THRESHOLD - converts the image to black and white pixels depending if they are above or below the threshold
    * defined by the level parameter. The level must be between 0.0 (black) and 1.0(white). If no level is specified, 0.5 is used.
    * GRAY - converts any colors in the image to grayscale equivalents
    * INVERT - sets each pixel to its inverse value
    * POSTERIZE - limits each channel of the image to the number of colors specified as the level parameter
    * BLUR - executes a Guassian blur with the level parameter specifying the extent of the blurring. If no level parameter is
    * used, the blur is equivalent to Guassian blur of radius 1.
    * OPAQUE - sets the alpha channel to entirely opaque.
    * ERODE - reduces the light areas with the amount defined by the level parameter.
    * DILATE - increases the light areas with the amount defined by the level parameter.
    *
    * @param {MODE} MODE          Either THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, or DILATE
    * @param {int|float} level    defines the quality of the filter
    *
    * @see blend
    */
    p.filter = function filter(kind, param, aImg){
      var img, col, lum, i;

      if (arguments.length === 3) {
        aImg.loadPixels();
        img = aImg;
      } else {
        p.loadPixels();
        img = p;
      }

      if (param === undef) {
        param = null;
      }
      if (img.isRemote) { // Remote images cannot access imageData
        throw "Image is loaded remotely. Cannot filter image.";
      } else {
        // begin filter process
        var imglen = img.pixels.getLength();
        switch (kind) {
          case PConstants.BLUR:
            var radius = param || 1; // if no param specified, use 1 (default for p5)
            blurARGB(radius, img);
            break;

          case PConstants.GRAY:
            if (img.format === PConstants.ALPHA) { //trouble
              // for an alpha image, convert it to an opaque grayscale
              for (i = 0; i < imglen; i++) {
                col = 255 - img.pixels.getPixel(i);
                img.pixels.setPixel(i,(0xff000000 | (col << 16) | (col << 8) | col));
              }
              img.format = PConstants.RGB; //trouble
            } else {
              for (i = 0; i < imglen; i++) {
                col = img.pixels.getPixel(i);
                lum = (77*(col>>16&0xff) + 151*(col>>8&0xff) + 28*(col&0xff))>>8;
                img.pixels.setPixel(i,((col & PConstants.ALPHA_MASK) | lum<<16 | lum<<8 | lum));
              }
            }
            break;

          case PConstants.INVERT:
            for (i = 0; i < imglen; i++) {
              img.pixels.setPixel(i, (img.pixels.getPixel(i) ^ 0xffffff));
            }
            break;

          case PConstants.POSTERIZE:
            if (param === null) {
              throw "Use filter(POSTERIZE, int levels) instead of filter(POSTERIZE)";
            }
            var levels = p.floor(param);
            if ((levels < 2) || (levels > 255)) {
              throw "Levels must be between 2 and 255 for filter(POSTERIZE, levels)";
            }
            var levels1 = levels - 1;
            for (i = 0; i < imglen; i++) {
              var rlevel = (img.pixels.getPixel(i) >> 16) & 0xff;
              var glevel = (img.pixels.getPixel(i) >> 8) & 0xff;
              var blevel = img.pixels.getPixel(i) & 0xff;
              rlevel = (((rlevel * levels) >> 8) * 255) / levels1;
              glevel = (((glevel * levels) >> 8) * 255) / levels1;
              blevel = (((blevel * levels) >> 8) * 255) / levels1;
              img.pixels.setPixel(i, ((0xff000000 & img.pixels.getPixel(i)) | (rlevel << 16) | (glevel << 8) | blevel));
            }
            break;

          case PConstants.OPAQUE:
            for (i = 0; i < imglen; i++) {
              img.pixels.setPixel(i, (img.pixels.getPixel(i) | 0xff000000));
            }
            img.format = PConstants.RGB; //trouble
            break;

          case PConstants.THRESHOLD:
            if (param === null) {
              param = 0.5;
            }
            if ((param < 0) || (param > 1)) {
              throw "Level must be between 0 and 1 for filter(THRESHOLD, level)";
            }
            var thresh = p.floor(param * 255);
            for (i = 0; i < imglen; i++) {
              var max = p.max((img.pixels.getPixel(i) & PConstants.RED_MASK) >> 16, p.max((img.pixels.getPixel(i) & PConstants.GREEN_MASK) >> 8, (img.pixels.getPixel(i) & PConstants.BLUE_MASK)));
              img.pixels.setPixel(i, ((img.pixels.getPixel(i) & PConstants.ALPHA_MASK) | ((max < thresh) ? 0x000000 : 0xffffff)));
            }
            break;

          case PConstants.ERODE:
            dilate(true, img);
            break;

          case PConstants.DILATE:
            dilate(false, img);
            break;
        }
        img.updatePixels();
      }
    };


    // shared variables for blit_resize(), filter_new_scanline(), filter_bilinear(), filter()
    // change this in the future to not be exposed to p
    p.shared = {
      fracU: 0,
      ifU: 0,
      fracV: 0,
      ifV: 0,
      u1: 0,
      u2: 0,
      v1: 0,
      v2: 0,
      sX: 0,
      sY: 0,
      iw: 0,
      iw1: 0,
      ih1: 0,
      ul: 0,
      ll: 0,
      ur: 0,
      lr: 0,
      cUL: 0,
      cLL: 0,
      cUR: 0,
      cLR: 0,
      srcXOffset: 0,
      srcYOffset: 0,
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      srcBuffer: null,
      blurRadius: 0,
      blurKernelSize: 0,
      blurKernel: null
    };

    p.intersect = function intersect(sx1, sy1, sx2, sy2, dx1, dy1, dx2, dy2) {
      var sw = sx2 - sx1 + 1;
      var sh = sy2 - sy1 + 1;
      var dw = dx2 - dx1 + 1;
      var dh = dy2 - dy1 + 1;
      if (dx1 < sx1) {
        dw += dx1 - sx1;
        if (dw > sw) {
          dw = sw;
        }
      } else {
        var w = sw + sx1 - dx1;
        if (dw > w) {
          dw = w;
        }
      }
      if (dy1 < sy1) {
        dh += dy1 - sy1;
        if (dh > sh) {
          dh = sh;
        }
      } else {
        var h = sh + sy1 - dy1;
        if (dh > h) {
          dh = h;
        }
      }
      return ! (dw <= 0 || dh <= 0);
    };

    p.filter_new_scanline = function filter_new_scanline() {
      p.shared.sX = p.shared.srcXOffset;
      p.shared.fracV = p.shared.srcYOffset & PConstants.PREC_MAXVAL;
      p.shared.ifV = PConstants.PREC_MAXVAL - p.shared.fracV;
      p.shared.v1 = (p.shared.srcYOffset >> PConstants.PRECISIONB) * p.shared.iw;
      p.shared.v2 = Math.min((p.shared.srcYOffset >> PConstants.PRECISIONB) + 1, p.shared.ih1) * p.shared.iw;
    };

    p.filter_bilinear = function filter_bilinear() {
      p.shared.fracU = p.shared.sX & PConstants.PREC_MAXVAL;
      p.shared.ifU = PConstants.PREC_MAXVAL - p.shared.fracU;
      p.shared.ul = (p.shared.ifU * p.shared.ifV) >> PConstants.PRECISIONB;
      p.shared.ll = (p.shared.ifU * p.shared.fracV) >> PConstants.PRECISIONB;
      p.shared.ur = (p.shared.fracU * p.shared.ifV) >> PConstants.PRECISIONB;
      p.shared.lr = (p.shared.fracU * p.shared.fracV) >> PConstants.PRECISIONB;
      p.shared.u1 = (p.shared.sX >> PConstants.PRECISIONB);
      p.shared.u2 = Math.min(p.shared.u1 + 1, p.shared.iw1);
      // get color values of the 4 neighbouring texels
      // changed for 0.9
      var cULoffset = (p.shared.v1 + p.shared.u1) * 4;
      var cURoffset = (p.shared.v1 + p.shared.u2) * 4;
      var cLLoffset = (p.shared.v2 + p.shared.u1) * 4;
      var cLRoffset = (p.shared.v2 + p.shared.u2) * 4;
      p.shared.cUL = p.color.toInt(p.shared.srcBuffer[cULoffset], p.shared.srcBuffer[cULoffset+1],
                     p.shared.srcBuffer[cULoffset+2], p.shared.srcBuffer[cULoffset+3]);
      p.shared.cUR = p.color.toInt(p.shared.srcBuffer[cURoffset], p.shared.srcBuffer[cURoffset+1],
                     p.shared.srcBuffer[cURoffset+2], p.shared.srcBuffer[cURoffset+3]);
      p.shared.cLL = p.color.toInt(p.shared.srcBuffer[cLLoffset], p.shared.srcBuffer[cLLoffset+1],
                     p.shared.srcBuffer[cLLoffset+2], p.shared.srcBuffer[cLLoffset+3]);
      p.shared.cLR = p.color.toInt(p.shared.srcBuffer[cLRoffset], p.shared.srcBuffer[cLRoffset+1],
                     p.shared.srcBuffer[cLRoffset+2], p.shared.srcBuffer[cLRoffset+3]);
      p.shared.r = ((p.shared.ul * ((p.shared.cUL & PConstants.RED_MASK) >> 16) + p.shared.ll *
                   ((p.shared.cLL & PConstants.RED_MASK) >> 16) + p.shared.ur * ((p.shared.cUR & PConstants.RED_MASK) >> 16) +
                   p.shared.lr * ((p.shared.cLR & PConstants.RED_MASK) >> 16)) << PConstants.PREC_RED_SHIFT) & PConstants.RED_MASK;
      p.shared.g = ((p.shared.ul * (p.shared.cUL & PConstants.GREEN_MASK) + p.shared.ll * (p.shared.cLL & PConstants.GREEN_MASK) +
                   p.shared.ur * (p.shared.cUR & PConstants.GREEN_MASK) + p.shared.lr *
                   (p.shared.cLR & PConstants.GREEN_MASK)) >>> PConstants.PRECISIONB) & PConstants.GREEN_MASK;
      p.shared.b = (p.shared.ul * (p.shared.cUL & PConstants.BLUE_MASK) + p.shared.ll * (p.shared.cLL & PConstants.BLUE_MASK) +
                   p.shared.ur * (p.shared.cUR & PConstants.BLUE_MASK) + p.shared.lr * (p.shared.cLR & PConstants.BLUE_MASK)) >>> PConstants.PRECISIONB;
      p.shared.a = ((p.shared.ul * ((p.shared.cUL & PConstants.ALPHA_MASK) >>> 24) + p.shared.ll *
                   ((p.shared.cLL & PConstants.ALPHA_MASK) >>> 24) + p.shared.ur * ((p.shared.cUR & PConstants.ALPHA_MASK) >>> 24) +
                   p.shared.lr * ((p.shared.cLR & PConstants.ALPHA_MASK) >>> 24)) << PConstants.PREC_ALPHA_SHIFT) & PConstants.ALPHA_MASK;
      return p.shared.a | p.shared.r | p.shared.g | p.shared.b;
    };

    p.blit_resize = function blit_resize(img, srcX1, srcY1, srcX2, srcY2, destPixels,
                                         screenW, screenH, destX1, destY1, destX2, destY2, mode) {
      var x, y; // iterator vars
      if (srcX1 < 0) {
        srcX1 = 0;
      }
      if (srcY1 < 0) {
        srcY1 = 0;
      }
      if (srcX2 >= img.width) {
        srcX2 = img.width - 1;
      }
      if (srcY2 >= img.height) {
        srcY2 = img.height - 1;
      }
      var srcW = srcX2 - srcX1;
      var srcH = srcY2 - srcY1;
      var destW = destX2 - destX1;
      var destH = destY2 - destY1;
      var smooth = true; // may as well go with the smoothing these days
      if (!smooth) {
        srcW++;
        srcH++;
      }
      if (destW <= 0 || destH <= 0 || srcW <= 0 || srcH <= 0 || destX1 >= screenW ||
          destY1 >= screenH || srcX1 >= img.width || srcY1 >= img.height) {
        return;
      }
      var dx = Math.floor(srcW / destW * PConstants.PRECISIONF);
      var dy = Math.floor(srcH / destH * PConstants.PRECISIONF);
      p.shared.srcXOffset = Math.floor(destX1 < 0 ? -destX1 * dx : srcX1 * PConstants.PRECISIONF);
      p.shared.srcYOffset = Math.floor(destY1 < 0 ? -destY1 * dy : srcY1 * PConstants.PRECISIONF);
      if (destX1 < 0) {
        destW += destX1;
        destX1 = 0;
      }
      if (destY1 < 0) {
        destH += destY1;
        destY1 = 0;
      }
      destW = Math.min(destW, screenW - destX1);
      destH = Math.min(destH, screenH - destY1);
      // changed in 0.9, TODO
      var destOffset = destY1 * screenW + destX1;
      var destColor;
      p.shared.srcBuffer = img.imageData.data;
      if (smooth) {
        // use bilinear filtering
        p.shared.iw = img.width;
        p.shared.iw1 = img.width - 1;
        p.shared.ih1 = img.height - 1;
        switch (mode) {
        case PConstants.BLEND:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.blend(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.blend(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.ADD:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.add(destColor, p.filter_bilinear()));
              destColor = p.color.toArray(p.modes.add(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.add(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.SUBTRACT:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.subtract(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.subtract(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.LIGHTEST:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.lightest(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.lightest(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.DARKEST:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.darkest(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.darkest(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.REPLACE:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.filter_bilinear());
              //destPixels[destOffset + x] = p.filter_bilinear();
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.DIFFERENCE:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.difference(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.difference(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.EXCLUSION:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.exclusion(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.exclusion(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.MULTIPLY:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.multiply(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.multiply(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.SCREEN:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.screen(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.screen(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.OVERLAY:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.overlay(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.overlay(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.HARD_LIGHT:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.hard_light(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.hard_light(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.SOFT_LIGHT:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.soft_light(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.soft_light(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.DODGE:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.dodge(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.dodge(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case PConstants.BURN:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4],
                                        destPixels[((destOffset + x) * 4) + 1],
                                        destPixels[((destOffset + x) * 4) + 2],
                                        destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.burn(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.burn(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Font handling
    ////////////////////////////////////////////////////////////////////////////

    // Defines system (non-SVG) font.
    function PFont(name) {
      this.name = "sans-serif";
      if(name !== undef) {
        switch(name) {
          case "sans-serif":
          case "serif":
          case "monospace":
          case "fantasy":
          case "cursive":
            this.name = name;
            break;
          default:
            this.name = "\"" + name + "\", sans-serif";
            break;
        }
      }
      this.origName = name;
    }
    PFont.prototype.width = function(str) {
      if ("measureText" in curContext) {
        return curContext.measureText(typeof str === "number" ? String.fromCharCode(str) : str).width / curTextSize;
      } else if ("mozMeasureText" in curContext) {
        return curContext.mozMeasureText(typeof str === "number" ? String.fromCharCode(str) : str) / curTextSize;
      } else {
        return 0;
      }
    };
    // Lists all standard fonts
    PFont.list = function() {
      return ["sans-serif", "serif", "monospace", "fantasy", "cursive"];
    };
    p.PFont = PFont;

    /**
     * loadFont() Loads a font into a variable of type PFont.
     *
     * @param {String} name filename of the font to load
     *
     * @returns {PFont} new PFont object
     *
     * @see #PFont
     * @see #textFont
     * @see #text
     * @see #createFont
     */
    p.loadFont = function loadFont(name) {
      if (name === undef || name.indexOf(".svg") === -1) {
        return new PFont(name);
      } else {
        // If the font is a glyph, calculate by SVG table
        var font = p.loadGlyphs(name);

        return {
          name: name,
          glyph: true,
          units_per_em: font.units_per_em,
          horiz_adv_x: 1 / font.units_per_em * font.horiz_adv_x,
          ascent: font.ascent,
          descent: font.descent,
          width: function(str) {
            var width = 0;
            var len = str.length;
            for (var i = 0; i < len; i++) {
              try {
                width += parseFloat(p.glyphLook(p.glyphTable[name], str[i]).horiz_adv_x);
              }
              catch(e) {
                Processing.debug(e);
              }
            }
            return width / p.glyphTable[name].units_per_em;
          }
        };
      }
    };

    /**
     * createFont() Loads a font into a variable of type PFont.
     *
     * @param {String}    name    filename of the font to load
     * @param {int|float} size    font size in pixels
     * @param {boolean}   smooth  optional true for an antialiased font, false for aliased
     * @param {char[]}    charset optional array containing characters to be generated
     *
     * @returns {PFont} new PFont object
     *
     * @see #PFont
     * @see #textFont
     * @see #text
     * @see #loadFont
     */
    p.createFont = function(name, size, smooth, charset) {
      if (arguments.length === 2) {
        p.textSize(size);
        return p.loadFont(name);
      } else if (arguments.length === 3) {
        // smooth: true for an antialiased font, false for aliased
        p.textSize(size);
        return p.loadFont(name);
      } else if (arguments.length === 4) {
        // charset: char array containing characters to be generated
        p.textSize(size);
        return p.loadFont(name);
      } else {
        throw("incorrent number of parameters for createFont");
      }
    };

    /**
     * textFont() Sets the current font.
     *
     * @param {PFont}     name filename of the font to load
     * @param {int|float} size optional font size in pixels
     *
     * @see #createFont
     * @see #loadFont
     * @see #PFont
     * @see #text
     */
    p.textFont = function textFont(font, size) {
      curTextFont = font;
      if (size) {
        p.textSize(size);
      } else {
        curContext.font = curContext.mozTextStyle = curTextSize + "px " + curTextFont.name;
      }
    };

    /**
     * textSize() Sets the current font size in pixels.
     *
     * @param {int|float} size font size in pixels
     *
     * @see #textFont
     * @see #loadFont
     * @see #PFont
     * @see #text
     */
    p.textSize = function textSize(size) {
      if (size) {
        curTextSize = size;
        curContext.font = curContext.mozTextStyle = curTextSize + "px " + curTextFont.name;
      }
    };

    /**
     * textAlign() Sets the current alignment for drawing text.
     *
     * @param {int} ALIGN  Horizontal alignment, either LEFT, CENTER, or RIGHT
     * @param {int} YALIGN optional vertical alignment, either TOP, BOTTOM, CENTER, or BASELINE
     *
     * @see #loadFont
     * @see #PFont
     * @see #text
     */
    p.textAlign = function textAlign() {
      if(arguments.length === 1) {
        horizontalTextAlignment = arguments[0];
      } else if(arguments.length === 2) {
        horizontalTextAlignment = arguments[0];
        verticalTextAlignment = arguments[1];
      }
    };

    /**
     * textWidth() Calculates and returns the width of any character or text string in pixels.
     *
     * @param {char|String} str char or String to be measured
     *
     * @return {float} width of char or String in pixels
     *
     * @see #loadFont
     * @see #PFont
     * @see #text
     * @see #textFont
     */
    p.textWidth = function textWidth(str) {
      if (p.use3DContext) {
        if (textcanvas === undef) {
          textcanvas = document.createElement("canvas");
        }
        var oldContext = curContext;
        curContext = textcanvas.getContext("2d");
        curContext.font = curContext.mozTextStyle = curTextSize + "px " + curTextFont.name;
        if ("fillText" in curContext) {
          textcanvas.width = curContext.measureText(str).width;
        } else if ("mozDrawText" in curContext) {
          textcanvas.width = curContext.mozMeasureText(str);
        }
        curContext = oldContext;
        return textcanvas.width;
      } else {
        curContext.font = curTextSize + "px " + curTextFont.name;
        if ("fillText" in curContext) {
          return curContext.measureText(str).width;
        } else if ("mozDrawText" in curContext) {
          return curContext.mozMeasureText(str);
        }
      }
    };

    p.textLeading = function textLeading(leading) {
      curTextLeading = leading;
    };

    function MeasureTextCanvas(fontFace, fontSize, baseLine, text) {
      this.canvas = document.createElement('canvas');
      this.canvas.setAttribute('width', fontSize + "px");
      this.canvas.setAttribute('height', fontSize + "px");
      this.ctx = this.canvas.getContext("2d");
      this.ctx.font = fontSize + "pt " + fontFace;
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, fontSize, fontSize);
      this.ctx.fillStyle = "white";
      this.ctx.fillText(text, 0, baseLine);
      this.imageData = this.ctx.getImageData(0, 0, fontSize, fontSize);

      this.get = function(x, y) {
        return this.imageData.data[((y*(this.imageData.width*4)) + (x*4))];
      };
    }

    /**
     * textAscent() height of the font above the baseline of the current font at its current size, in pixels.
     *
     * @returns {float} height of the font above the baseline of the current font at its current size, in pixels
     *
     * @see #textDescent
     */
    p.textAscent = (function() {
      var oldTextSize = undef,
          oldTextFont = undef,
          ascent      = undef,
          graphics    = undef;
      return function textAscent() {
        // if text size or font has changed, recalculate ascent value
        if (oldTextFont !== curTextFont || oldTextSize !== curTextSize) {
          // store current size and font
          oldTextFont = curTextFont;
          oldTextSize = curTextSize;

          var found       = false,
              character   = "k",
              colour      = p.color(0),
              top         = 0,
              bottom      = curTextSize,
              yLoc        = curTextSize/2;

          // setup off screen image to write and measure text from
          graphics = new MeasureTextCanvas(curTextFont.name, curTextSize, curTextSize, character);

          // binary search for highest pixel
          while(yLoc !== bottom) {
            for (var xLoc = 0; xLoc < curTextSize; xLoc++) {
              if (graphics.get(xLoc, yLoc) !== colour) {
                found = true;
                xLoc = curTextSize;
              }
            }
            if (found) {
              // y--
              bottom = yLoc;
              found = false;
            } else {
              // y++
              top = yLoc;
            }
            yLoc = Math.ceil((bottom + top)/2);
          }
          ascent = ((curTextSize-1) - yLoc) + 1;
          return ascent;
        } else { // text size and font have not changed since last time
          return ascent;
        }
      };
    }());

    /**
     * textDescent() height of the font below the baseline of the current font at its current size, in pixels.
     *
     * @returns {float} height of the font below the baseline of the current font at its current size, in pixels
     *
     * @see #textAscent
     */
    p.textDescent = (function() {
      var oldTextSize = undef,
          oldTextFont = undef,
          descent     = undef,
          graphics    = undef;
      return function textDescent() {
        // if text size or font has changed, recalculate descent value
        if (oldTextFont !== curTextFont || oldTextSize !== curTextSize) {
          // store current size and font
          oldTextFont = curTextFont;
          oldTextSize = curTextSize;

          var found       = false,
              character   = "p",
              colour      = p.color(0),
              top         = 0,
              bottom      = curTextSize,
              yLoc        = curTextSize/2;

          // setup off screen image to write and measure text from
          graphics = new MeasureTextCanvas(curTextFont.name, curTextSize, 0, character);

          // binary search for lowest pixel
          while(yLoc !== bottom) {
            for (var xLoc = 0; xLoc < curTextSize; xLoc++) {
              if (graphics.get(xLoc, yLoc) !== colour) {
                found = true;
                xLoc = curTextSize;
              }
            }
            if (found) {
              // y++
              top = yLoc;
              found = false;
            } else {
              // y--
              bottom = yLoc;
            }
            yLoc = Math.ceil((bottom + top)/2);
          }
          descent = yLoc + 1;
          return descent;
        } else { // text size and font have not changed since last time
          return descent;
        }
      };
    }());

    // A lookup table for characters that can not be referenced by Object
    p.glyphLook = function glyphLook(font, chr) {
      try {
        switch (chr) {
        case "1":
          return font.one;
        case "2":
          return font.two;
        case "3":
          return font.three;
        case "4":
          return font.four;
        case "5":
          return font.five;
        case "6":
          return font.six;
        case "7":
          return font.seven;
        case "8":
          return font.eight;
        case "9":
          return font.nine;
        case "0":
          return font.zero;
        case " ":
          return font.space;
        case "$":
          return font.dollar;
        case "!":
          return font.exclam;
        case '"':
          return font.quotedbl;
        case "#":
          return font.numbersign;
        case "%":
          return font.percent;
        case "&":
          return font.ampersand;
        case "'":
          return font.quotesingle;
        case "(":
          return font.parenleft;
        case ")":
          return font.parenright;
        case "*":
          return font.asterisk;
        case "+":
          return font.plus;
        case ",":
          return font.comma;
        case "-":
          return font.hyphen;
        case ".":
          return font.period;
        case "/":
          return font.slash;
        case "_":
          return font.underscore;
        case ":":
          return font.colon;
        case ";":
          return font.semicolon;
        case "<":
          return font.less;
        case "=":
          return font.equal;
        case ">":
          return font.greater;
        case "?":
          return font.question;
        case "@":
          return font.at;
        case "[":
          return font.bracketleft;
        case "\\":
          return font.backslash;
        case "]":
          return font.bracketright;
        case "^":
          return font.asciicircum;
        case "`":
          return font.grave;
        case "{":
          return font.braceleft;
        case "|":
          return font.bar;
        case "}":
          return font.braceright;
        case "~":
          return font.asciitilde;
          // If the character is not 'special', access it by object reference
        default:
          return font[chr];
        }
      } catch(e) {
        Processing.debug(e);
      }
    };

    function toP5String(obj) {
      if(obj instanceof String) {
        return obj;
      } else if(typeof obj === 'number') {
        // check if an int
        if(obj === (0 | obj)) {
          return obj.toString();
        } else {
          return p.nf(obj, 0, 3);
        }
      } else if(obj === null || obj === undef) {
        return "";
      } else {
        return obj.toString();
      }
    }

    // Print some text to the Canvas
    function text$line(str, x, y, z, align) {
      var textWidth = 0, xOffset = 0;
      // If the font is a standard Canvas font...
      if (!curTextFont.glyph) {
        if (str && ("fillText" in curContext || "mozDrawText" in curContext)) {
          if (isFillDirty) {
            curContext.fillStyle = p.color.toString(currentFillColor);
            isFillDirty = false;
          }

          // horizontal offset/alignment
          if(align === PConstants.RIGHT || align === PConstants.CENTER) {
            if ("fillText" in curContext) {
              textWidth = curContext.measureText(str).width;
            } else if ("mozDrawText" in curContext) {
              textWidth = curContext.mozMeasureText(str);
            }

            if(align === PConstants.RIGHT) {
              xOffset = -textWidth;
            } else { // if(align === PConstants.CENTER)
              xOffset = -textWidth/2;
            }
          }

          if ("fillText" in curContext) {
            curContext.fillText(str, x+xOffset, y);
          } else if ("mozDrawText" in curContext) {
            saveContext();
            curContext.translate(x+xOffset, y);
            curContext.mozDrawText(str);
            restoreContext();
          }
        }
      } else {
        // If the font is a Batik SVG font...
        var font = p.glyphTable[curTextFont.name];
        saveContext();
        curContext.translate(x, y + curTextSize);

        // horizontal offset/alignment
        if(align === PConstants.RIGHT || align === PConstants.CENTER) {
          textWidth = font.width(str);

          if(align === PConstants.RIGHT) {
            xOffset = -textWidth;
          } else { // if(align === PConstants.CENTER)
            xOffset = -textWidth/2;
          }
        }

        var upem   = font.units_per_em,
          newScale = 1 / upem * curTextSize;

        curContext.scale(newScale, newScale);

        for (var i=0, len=str.length; i < len; i++) {
          // Test character against glyph table
          try {
            p.glyphLook(font, str[i]).draw();
          } catch(e) {
            Processing.debug(e);
          }
        }
        restoreContext();
      }
    }

    function text$line$3d(str, x, y, z, align) {
      // handle case for 3d text
      if (textcanvas === undef) {
        textcanvas = document.createElement("canvas");
      }
      var oldContext = curContext;
      curContext = textcanvas.getContext("2d");
      curContext.font = curContext.mozTextStyle = curTextSize + "px " + curTextFont.name;
      var textWidth = 0;
      if ("fillText" in curContext) {
        textWidth = curContext.measureText(str).width;
      } else if ("mozDrawText" in curContext) {
        textWidth = curContext.mozMeasureText(str);
      }
      textcanvas.width = textWidth;
      textcanvas.height = curTextSize;
      curContext = textcanvas.getContext("2d"); // refreshes curContext
      curContext.font = curContext.mozTextStyle = curTextSize + "px " + curTextFont.name;
      curContext.textBaseline="top";

      // paint on 2D canvas
      text$line(str,0,0,0,PConstants.LEFT);

      // use it as a texture
      var aspect = textcanvas.width/textcanvas.height;
      curContext = oldContext;

      curContext.bindTexture(curContext.TEXTURE_2D, textTex);
      executeTexImage2D(textcanvas);
      curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_MAG_FILTER, curContext.LINEAR);
      curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_MIN_FILTER, curContext.LINEAR);
      curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_WRAP_T, curContext.CLAMP_TO_EDGE);
      curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_WRAP_S, curContext.CLAMP_TO_EDGE);
      // If we don't have a power of two texture, we can't mipmap it.
      // curContext.generateMipmap(curContext.TEXTURE_2D);

      // horizontal offset/alignment
      var xOffset = 0;
      if (align === PConstants.RIGHT) {
        xOffset = -textWidth;
      } else if(align === PConstants.CENTER) {
        xOffset = -textWidth/2;
      }
      var model = new PMatrix3D();
      var scalefactor = curTextSize * 0.5;
      model.translate(x+xOffset-scalefactor/2, y-scalefactor, z);
      model.scale(-aspect*scalefactor, -scalefactor, scalefactor);
      model.translate(-1, -1, -1);
      model.transpose();

      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

      var proj = new PMatrix3D();
      proj.set(projection);
      proj.transpose();

      curContext.useProgram(programObject2D);
      vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, textBuffer);
      vertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord", 2, textureBuffer);
      uniformi("uSampler2d", programObject2D, "uSampler", [0]);
      uniformi("picktype2d", programObject2D, "picktype", 1);
      uniformMatrix("model2d", programObject2D, "model", false,  model.array());
      uniformMatrix("view2d", programObject2D, "view", false, view.array());
      uniformMatrix("projection2d", programObject2D, "projection", false, proj.array());
      uniformf("color2d", programObject2D, "color", fillStyle);
      curContext.bindBuffer(curContext.ELEMENT_ARRAY_BUFFER, indexBuffer);
      curContext.drawElements(curContext.TRIANGLES, 6, curContext.UNSIGNED_SHORT, 0);
    }

    function text$4(str, x, y, z) {
      var lineFunction = p.use3DContext ?  text$line$3d : text$line;
      var lines, linesCount;
      if(str.indexOf('\n') < 0) {
        lines = [str];
        linesCount = 1;
      } else {
        lines = str.split(/\r?\n/g);
        linesCount = lines.length;
      }
      // handle text line-by-line

      var yOffset;
      if(verticalTextAlignment === PConstants.TOP) {
        yOffset = (1-baselineOffset) * curTextLeading;
      } else if(verticalTextAlignment === PConstants.CENTER) {
        yOffset = (1-baselineOffset - linesCount/2) * curTextLeading;
      } else if(verticalTextAlignment === PConstants.BOTTOM) {
        yOffset = (1-baselineOffset - linesCount) * curTextLeading;
      } else { //  if(verticalTextAlignment === PConstants.BASELINE) {
        yOffset = 0;
      }
      for(var i=0;i<linesCount;++i) {
        var line = lines[i];
        lineFunction(line, x, y + yOffset, z, horizontalTextAlignment);
        yOffset += curTextLeading;
      }
    }

    function text$6(str, x, y, width, height, z) {
      // 'fail' on 0-valued dimensions
      if (str.length === 0 || width === 0 || height === 0) {
        return;
      }
      // also 'fail' if the text height is larger than the bounding height
      if(curTextSize > height) {
        return;
      }

      var spaceMark = -1;
      var start = 0;
      var lineWidth = 0;
      var textboxWidth = width;
      var yOffset = 0;
      curContext.font = curTextSize + "px " + curTextFont.name;
      var drawCommands = [];

      // run through text, character-by-character
      for (var charPos=0, len=str.length; charPos < len; charPos++)
      {
        var currentChar = str[charPos];
        var letterWidth = 0;
        var spaceChar = (currentChar === " ");

        if ("fillText" in curContext) {
          letterWidth = curContext.measureText(currentChar).width;
        } else if ("mozDrawText" in curContext) {
          letterWidth = curContext.mozMeasureText(currentChar);
        }

        // if we aren't looking at a newline, and the text still fits, keep processing
        if (currentChar !== "\n" && (lineWidth + letterWidth < textboxWidth)) {
          if (spaceChar) { spaceMark = charPos; }
          lineWidth += letterWidth;
        }

        // if we're looking at a newline, or the text no longer fits, push the section that fit into the drawcommand list
        else
        {
          if (spaceMark + 1 === start) {
            if(charPos>0) {
              // Whole line without spaces so far.
              spaceMark = charPos;
            } else {
              // 'fail', because the line can't even fit the first character
              return;
            }
          }

          if (currentChar === "\n") {
            drawCommands.push({text:str.substring(start, charPos), width: lineWidth, offset: yOffset});
            start = charPos + 1;
          } else {
            // current is not a newline, which means the line doesn't fit in box. push text.
            drawCommands.push({text:str.substring(start, spaceMark), width: lineWidth, offset: yOffset});
            start = spaceMark + 1;
          }

          // newline + return
          yOffset += curTextSize;
          lineWidth = 0;
          charPos = start - 1;
        }
      }

      // push the remaining text
      if (start < len) {
        drawCommands.push({text:str.substring(start), width: lineWidth, offset: yOffset});
        yOffset += curTextSize;
      }

      // determine which function to use for drawing text
      var lineFunction = p.use3DContext ?  text$line$3d : text$line;
      var xOffset = 0;
      if(horizontalTextAlignment === PConstants.CENTER) {
        xOffset = width / 2;
      } else if(horizontalTextAlignment === PConstants.RIGHT) {
        xOffset = width;
      }

      // offsets for alignment
      var boxYOffset1 = (1-baselineOffset) * curTextSize, boxYOffset2 = 0;
      if(verticalTextAlignment === PConstants.BOTTOM) {
        boxYOffset2 = height - (drawCommands.length * curTextLeading);
      } else if(verticalTextAlignment === PConstants.CENTER) {
        boxYOffset2 = (height - (drawCommands.length * curTextLeading)) / 2;
      }

      for (var command=0, end=drawCommands.length; command<end; command++) {
        var drawCommand = drawCommands[command];
        // skip if not inside box yet
        if (drawCommand.offset + boxYOffset2 < 0) { continue; }
        // stop if no enough space for one more line draw
        if (drawCommand.offset + boxYOffset2 + curTextSize > height) { break; }
        // finally, draw text on canvas
        lineFunction(drawCommand.text, x + xOffset, y + drawCommand.offset + boxYOffset1 + boxYOffset2, z, horizontalTextAlignment);
      }
    }

    /**
     * text() Draws text to the screen.
     *
     * @param {String|char|int|float} data       the alphanumeric symbols to be displayed
     * @param {int|float}             x          x-coordinate of text
     * @param {int|float}             y          y-coordinate of text
     * @param {int|float}             z          optional z-coordinate of text
     * @param {String}                stringdata optional letters to be displayed
     * @param {int|float}             width      optional width of text box
     * @param {int|float}             height     optional height of text box
     *
     * @see #textAlign
     * @see #textMode
     * @see #loadFont
     * @see #PFont
     * @see #textFont
     */
    p.text = function text() {
      if (tMode === PConstants.SCREEN) {  // TODO: 3D Screen not working yet due to 3D not working in textAscent
        p.pushMatrix();
        p.resetMatrix();
        var asc = p.textAscent();
        var des = p.textDescent();
        var tWidth = p.textWidth(arguments[0]);
        var tHeight = asc + des;
        var font = p.loadFont(curTextFont.origName);
        var hud = p.createGraphics(tWidth, tHeight);
        hud.beginDraw();
        hud.fill(currentFillColor);
        hud.opaque = false;
        hud.background(0, 0, 0, 0);
        hud.textFont(font);
        hud.textSize(curTextSize);
        hud.text(arguments[0], 0, asc);
        hud.endDraw();
        if (arguments.length === 5 || arguments.length === 6) {
          p.image(hud, arguments[1], arguments[2]-asc, arguments[3], arguments[4]);
        } else {
          p.image(hud, arguments[1], arguments[2]-asc);
        }
        p.popMatrix();
      }
      else if (tMode === PConstants.SHAPE) {
        // TODO: requires beginRaw function
        return;
      } else {
        if (arguments.length === 3) { // for text( str, x, y)
          text$4(toP5String(arguments[0]), arguments[1], arguments[2], 0);
        } else if (arguments.length === 4) { // for text( str, x, y, z)
          text$4(toP5String(arguments[0]), arguments[1], arguments[2], arguments[3]);
        } else if (arguments.length === 5) { // for text( str, x, y , width, height)
          text$6(toP5String(arguments[0]), arguments[1], arguments[2], arguments[3], arguments[4], 0);
        } else if (arguments.length === 6) { // for text( stringdata, x, y , width, height, z)
          text$6(toP5String(arguments[0]), arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
      }
    };

    /**
     * Sets the way text draws to the screen. In the default configuration (the MODEL mode), it's possible to rotate,
     * scale, and place letters in two and three dimensional space. <br /><br /> Changing to SCREEN mode draws letters
     * directly to the front of the window and greatly increases rendering quality and speed when used with the P2D and
     * P3D renderers. textMode(SCREEN) with OPENGL and JAVA2D (the default) renderers will generally be slower, though
     * pixel accurate with P2D and P3D. With textMode(SCREEN), the letters draw at the actual size of the font (in pixels)
     * and therefore calls to <b>textSize()</b> will not affect the size of the letters. To create a font at the size you
     * desire, use the "Create font..." option in the Tools menu, or use the createFont() function. When using textMode(SCREEN),
     * any z-coordinate passed to a text() command will be ignored, because your computer screen is...flat!
     *
     * @param {int} MODE Either MODEL, SCREEN or SHAPE (not yet supported)
     *
     * @see loadFont
     * @see PFont
     * @see text
     * @see textFont
     * @see createFont
     */
    p.textMode = function textMode(mode){
      tMode = mode;
    };

    // Load Batik SVG Fonts and parse to pre-def objects for quick rendering
    p.loadGlyphs = function loadGlyph(url) {
      var x, y, cx, cy, nx, ny, d, a, lastCom, lenC, horiz_adv_x, getXY = '[0-9\\-]+', path;

      // Return arrays of SVG commands and coords
      // get this to use p.matchAll() - will need to work around the lack of null return
      var regex = function regex(needle, hay) {
        var i = 0,
          results = [],
          latest, regexp = new RegExp(needle, "g");
        latest = results[i] = regexp.exec(hay);
        while (latest) {
          i++;
          latest = results[i] = regexp.exec(hay);
        }
        return results;
      };

      var buildPath = function buildPath(d) {
        var c = regex("[A-Za-z][0-9\\- ]+|Z", d);

        // Begin storing path object
        path = "var path={draw:function(){saveContext();curContext.beginPath();";

        x = 0;
        y = 0;
        cx = 0;
        cy = 0;
        nx = 0;
        ny = 0;
        d = 0;
        a = 0;
        lastCom = "";
        lenC = c.length - 1;

        // Loop through SVG commands translating to canvas eqivs functions in path object
        for (var j = 0; j < lenC; j++) {
          var com = c[j][0], xy = regex(getXY, com);

          switch (com[0]) {
            case "M":
              //curContext.moveTo(x,-y);
              x = parseFloat(xy[0][0]);
              y = parseFloat(xy[1][0]);
              path += "curContext.moveTo(" + x + "," + (-y) + ");";
              break;

            case "L":
              //curContext.lineTo(x,-y);
              x = parseFloat(xy[0][0]);
              y = parseFloat(xy[1][0]);
              path += "curContext.lineTo(" + x + "," + (-y) + ");";
              break;

            case "H":
              //curContext.lineTo(x,-y)
              x = parseFloat(xy[0][0]);
              path += "curContext.lineTo(" + x + "," + (-y) + ");";
              break;

            case "V":
              //curContext.lineTo(x,-y);
              y = parseFloat(xy[0][0]);
              path += "curContext.lineTo(" + x + "," + (-y) + ");";
              break;

            case "T":
              //curContext.quadraticCurveTo(cx,-cy,nx,-ny);
              nx = parseFloat(xy[0][0]);
              ny = parseFloat(xy[1][0]);

              if (lastCom === "Q" || lastCom === "T") {
                d = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(cy - y, 2));
                a = Math.PI + Math.atan2(cx - x, cy - y);
                cx = x + (Math.sin(a) * (d));
                cy = y + (Math.cos(a) * (d));
              } else {
                cx = x;
                cy = y;
              }

              path += "curContext.quadraticCurveTo(" + cx + "," + (-cy) + "," + nx + "," + (-ny) + ");";
              x = nx;
              y = ny;
              break;

            case "Q":
              //curContext.quadraticCurveTo(cx,-cy,nx,-ny);
              cx = parseFloat(xy[0][0]);
              cy = parseFloat(xy[1][0]);
              nx = parseFloat(xy[2][0]);
              ny = parseFloat(xy[3][0]);
              path += "curContext.quadraticCurveTo(" + cx + "," + (-cy) + "," + nx + "," + (-ny) + ");";
              x = nx;
              y = ny;
              break;

            case "Z":
              //curContext.closePath();
              path += "curContext.closePath();";
              break;
          }
          lastCom = com[0];
        }

        path += "executeContextFill();executeContextStroke();";
        path += "restoreContext();";
        path += "curContext.translate(" + horiz_adv_x + ",0);";
        path += "}}";

        return path;
      };

      // Parse SVG font-file into block of Canvas commands
      var parseSVGFont = function parseSVGFontse(svg) {
        // Store font attributes
        var font = svg.getElementsByTagName("font");
        p.glyphTable[url].horiz_adv_x = font[0].getAttribute("horiz-adv-x");

        var font_face = svg.getElementsByTagName("font-face")[0];
        p.glyphTable[url].units_per_em = parseFloat(font_face.getAttribute("units-per-em"));
        p.glyphTable[url].ascent = parseFloat(font_face.getAttribute("ascent"));
        p.glyphTable[url].descent = parseFloat(font_face.getAttribute("descent"));

        var glyph = svg.getElementsByTagName("glyph"),
          len = glyph.length;

        // Loop through each glyph in the SVG
        for (var i = 0; i < len; i++) {
          // Store attributes for this glyph
          var unicode = glyph[i].getAttribute("unicode");
          var name = glyph[i].getAttribute("glyph-name");
          horiz_adv_x = glyph[i].getAttribute("horiz-adv-x");
          if (horiz_adv_x === null) {
            horiz_adv_x = p.glyphTable[url].horiz_adv_x;
          }
          d = glyph[i].getAttribute("d");
          // Split path commands in glpyh
          if (d !== undef) {
            path = buildPath(d);
            eval(path);
            // Store glyph data to table object
            p.glyphTable[url][name] = {
              name: name,
              unicode: unicode,
              horiz_adv_x: horiz_adv_x,
              draw: path.draw
            };
          }
        } // finished adding glyphs to table
      };

      // Load and parse Batik SVG font as XML into a Processing Glyph object
      var loadXML = function loadXML() {
        var xmlDoc;

        try {
          xmlDoc = document.implementation.createDocument("", "", null);
        }
        catch(e_fx_op) {
          Processing.debug(e_fx_op.message);
          return;
        }

        try {
          xmlDoc.async = false;
          xmlDoc.load(url);
          parseSVGFont(xmlDoc.getElementsByTagName("svg")[0]);
        }
        catch(e_sf_ch) {
          // Google Chrome, Safari etc.
          Processing.debug(e_sf_ch);
          try {
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", url, false);
            xmlhttp.send(null);
            parseSVGFont(xmlhttp.responseXML.documentElement);
          }
          catch(e) {
            Processing.debug(e_sf_ch);
          }
        }
      };

      // Create a new object in glyphTable to store this font
      p.glyphTable[url] = {};

      // Begin loading the Batik SVG font...
      loadXML(url);

      // Return the loaded font for attribute grabbing
      return p.glyphTable[url];
    };

    ////////////////////////////////////////////////////////////////////////////
    // Class methods
    ////////////////////////////////////////////////////////////////////////////

    function extendClass(subClass, baseClass) {
      function extendGetterSetter(propertyName) {
        p.defineProperty(subClass, propertyName, {
          get: function() {
            return baseClass[propertyName];
          },
          set: function(v) {
            baseClass[propertyName]=v;
          },
          enumerable: true
        });
      }

      var properties = [];
      for (var propertyName in baseClass) {
        if (!(propertyName in subClass)) {
          if (typeof baseClass[propertyName] === 'function') {
            subClass[propertyName] = baseClass[propertyName];
          } else if(propertyName !== "$upcast") {
            // Delaying the properties extension due to the IE9 bug (see #918).
            properties.push(propertyName);
          }
        }
      }
      while (properties.length > 0) {
        extendGetterSetter(properties.shift());
      }
    }

    p.extendClassChain = function(base) {
      var path = [base];
      for (var self = base.$upcast; self; self = self.$upcast) {
        extendClass(self, base);
        path.push(self);
        base = self;
      }
      while (path.length > 0) {
        path.pop().$self=base;
      }
    };

    p.extendStaticMembers = function(derived, base) {
      extendClass(derived, base);
    };

    p.addMethod = function addMethod(object, name, fn, superAccessor) {
      if (object[name]) {
        var args = fn.length,
          oldfn = object[name];

        object[name] = function() {
          if (arguments.length === args) {
            return fn.apply(this, arguments);
          } else {
            return oldfn.apply(this, arguments);
          }
        };
      } else {
        object[name] = fn;
      }
    };

    p.createJavaArray = function createJavaArray(type, bounds) {
      var result = null;
      if (typeof bounds[0] === 'number') {
        var itemsCount = 0 | bounds[0];
        if (bounds.length <= 1) {
          if (type === "int") {
            result = new Int32Array(itemsCount);
          } else if (type === "float") {
            result = new Float32Array(itemsCount);
          } else {
            result = [];
            result.length = itemsCount;
          }
          for (var i = 0; i < itemsCount; ++i) {
            result[i] = 0;
          }
        } else {
          result = [];
          var newBounds = bounds.slice(1);
          for (var j = 0; j < itemsCount; ++j) {
            result.push(createJavaArray(type, newBounds));
          }
        }
      }
      return result;
    };

    //////////////////////////////////////////////////////////////////////////
    // Event handling
    //////////////////////////////////////////////////////////////////////////

    function attach(elem, type, fn) {
      if (elem.addEventListener) {
        elem.addEventListener(type, fn, false);
      } else {
        elem.attachEvent("on" + type, fn);
      }
      eventHandlers.push([elem, type, fn]);
    }

    function detach(elem, type, fn) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, fn, false);
      } else if (elem.detachEvent) {
        elem.detachEvent("on" + type, fn);
      }
    }

    function calculateOffset(curElement, event) {
      var element = curElement,
        offsetX = 0,
        offsetY = 0;

      p.pmouseX = p.mouseX;
      p.pmouseY = p.mouseY;

      // Find element offset
      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while (!!(element = element.offsetParent));
      }

      // Find Scroll offset
      element = curElement;
      do {
        offsetX -= element.scrollLeft || 0;
        offsetY -= element.scrollTop || 0;
      } while (!!(element = element.parentNode));

      // Add padding and border style widths to offset
      offsetX += stylePaddingLeft;
      offsetY += stylePaddingTop;

      offsetX += styleBorderLeft;
      offsetY += styleBorderTop;

      // Take into account any scrolling done
      offsetX += window.pageXOffset;
      offsetY += window.pageYOffset;

      return {'X':offsetX,'Y':offsetY};
    }

    function updateMousePosition(curElement, event) {
      var offset = calculateOffset(curElement, event);

      // Dropping support for IE clientX and clientY, switching to pageX and pageY so we don't have to calculate scroll offset.
      // Removed in ticket #184. See rev: 2f106d1c7017fed92d045ba918db47d28e5c16f4
      p.mouseX = event.pageX - offset.X;
      p.mouseY = event.pageY - offset.Y;
    }

    // Return a TouchEvent with canvas-specific x/y co-ordinates
    function addTouchEventOffset(t) {
      var offset = calculateOffset(t.changedTouches[0].target, t.changedTouches[0]),
          i;

      for (i = 0; i < t.touches.length; i++) {
        var touch = t.touches[i];
        touch.offsetX = touch.pageX - offset.X;
        touch.offsetY = touch.pageY - offset.Y;
      }
      for (i = 0; i < t.targetTouches.length; i++) {
        var targetTouch = t.targetTouches[i];
        targetTouch.offsetX = targetTouch.pageX - offset.X;
        targetTouch.offsetY = targetTouch.pageY - offset.Y;
      }
      for (i = 0; i < t.changedTouches.length; i++) {
        var changedTouch = t.changedTouches[i];
        changedTouch.offsetX = changedTouch.pageX - offset.X;
        changedTouch.offsetY = changedTouch.pageY - offset.Y;
      }

      return t;
    }

    //////////////////////////////////////////////////////////////////////////
    // Touch event handling
    //////////////////////////////////////////////////////////////////////////

    attach(curElement, "touchstart", function (t) {
      // Removes unwanted behaviour of the canvas when touching canvas
      curElement.setAttribute("style","-webkit-user-select: none");
      curElement.setAttribute("onclick","void(0)");
      curElement.setAttribute("style","-webkit-tap-highlight-color:rgba(0,0,0,0)");
      // Loop though eventHandlers and remove mouse listeners
      for (var i=0, ehl=eventHandlers.length; i<ehl; i++) {
        var elem = eventHandlers[i][0],
            type = eventHandlers[i][1],
            fn   = eventHandlers[i][2];
        // Have this function remove itself from the eventHandlers list too
        if (type === "mouseout" ||  type === "mousemove" ||
            type === "mousedown" || type === "mouseup" ||
            type === "DOMMouseScroll" || type === "mousewheel" || type === "touchstart") {
          detach(elem, type, fn);
        }
      }

      // If there are any native touch events defined in the sketch, connect all of them
      // Otherwise, connect all of the emulated mouse events
      if (p.touchStart !== undef || p.touchMove !== undef ||
          p.touchEnd !== undef || p.touchCancel !== undef) {
        attach(curElement, "touchstart", function(t) {
          if (p.touchStart !== undef) {
            t = addTouchEventOffset(t);
            p.touchStart(t);
          }
        });

        attach(curElement, "touchmove", function(t) {
          if (p.touchMove !== undef) {
            t.preventDefault(); // Stop the viewport from scrolling
            t = addTouchEventOffset(t);
            p.touchMove(t);
          }
        });

        attach(curElement, "touchend", function(t) {
          if (p.touchEnd !== undef) {
            t = addTouchEventOffset(t);
            p.touchEnd(t);
          }
        });

        attach(curElement, "touchcancel", function(t) {
          if (p.touchCancel !== undef) {
            t = addTouchEventOffset(t);
            p.touchCancel(t);
          }
        });

      } else {
        // Emulated touch start/mouse down event
        attach(curElement, "touchstart", function(e) {
          updateMousePosition(curElement, e.touches[0]);

          p.__mousePressed = true;
          p.mouseDragging = false;
          p.mouseButton = PConstants.LEFT;

          if (typeof p.mousePressed === "function") {
            p.mousePressed();
          }
        });

        // Emulated touch move/mouse move event
        attach(curElement, "touchmove", function(e) {
          e.preventDefault();
          updateMousePosition(curElement, e.touches[0]);

          if (typeof p.mouseMoved === "function" && !p.__mousePressed) {
            p.mouseMoved();
          }
          if (typeof p.mouseDragged === "function" && p.__mousePressed) {
            p.mouseDragged();
            p.mouseDragging = true;
          }
        });

        // Emulated touch up/mouse up event
        attach(curElement, "touchend", function(e) {
          p.__mousePressed = false;

          if (typeof p.mouseClicked === "function" && !p.mouseDragging) {
            p.mouseClicked();
          }

          if (typeof p.mouseReleased === "function") {
            p.mouseReleased();
          }
        });
      }

      // Refire the touch start event we consumed in this function
      curElement.dispatchEvent(t);
    });

    //////////////////////////////////////////////////////////////////////////
    // Mouse event handling
    //////////////////////////////////////////////////////////////////////////

    attach(curElement, "mousemove", function(e) {
      updateMousePosition(curElement, e);
      if (typeof p.mouseMoved === "function" && !p.__mousePressed) {
        p.mouseMoved();
      }
      if (typeof p.mouseDragged === "function" && p.__mousePressed) {
        p.mouseDragged();
        p.mouseDragging = true;
      }
    });

    attach(curElement, "mouseout", function(e) {
      if (typeof p.mouseOut === "function") {
        p.mouseOut();
      }
    });

    attach(curElement, "mouseover", function(e) {
      updateMousePosition(curElement, e);
      if (typeof p.mouseOver === "function") {
        p.mouseOver();
      }
    });

    attach(curElement, "mousedown", function(e) {
      p.__mousePressed = true;
      p.mouseDragging = false;
      switch (e.which) {
      case 1:
        p.mouseButton = PConstants.LEFT;
        break;
      case 2:
        p.mouseButton = PConstants.CENTER;
        break;
      case 3:
        p.mouseButton = PConstants.RIGHT;
        break;
      }

      if (typeof p.mousePressed === "function") {
        p.mousePressed();
      }
    });

    attach(curElement, "mouseup", function(e) {
      p.__mousePressed = false;

      if (typeof p.mouseClicked === "function" && !p.mouseDragging) {
        p.mouseClicked();
      }

      if (typeof p.mouseReleased === "function") {
        p.mouseReleased();
      }
    });

    var mouseWheelHandler = function(e) {
      var delta = 0;

      if (e.wheelDelta) {
        delta = e.wheelDelta / 120;
        if (window.opera) {
          delta = -delta;
        }
      } else if (e.detail) {
        delta = -e.detail / 3;
      }

      p.mouseScroll = delta;

      if (delta && typeof p.mouseScrolled === 'function') {
        p.mouseScrolled();
      }
    };

    // Support Gecko and non-Gecko scroll events
    attach(document, 'DOMMouseScroll', mouseWheelHandler);
    attach(document, 'mousewheel', mouseWheelHandler);

    //////////////////////////////////////////////////////////////////////////
    // Keyboard Events
    //////////////////////////////////////////////////////////////////////////

    // Get the DOM element if string was passed
    if (typeof curElement === "string") {
      curElement = document.getElementById(curElement);
    }

    // In order to catch key events in a canvas, it needs to be "specially focusable",
    // by assigning it a tabindex. If no tabindex is specified on-page, set this to 0.
    if (!curElement.getAttribute("tabindex")) {
      curElement.setAttribute("tabindex", 0);
    }

    function keyCodeMap(code){
      // Coded keys
      if (codedKeys.indexOf(code) >= 0) {
        p.keyCode = code;
        if (code === p.INS) {
          p.keyCode = 155;
        }
        return PConstants.CODED;
      }
      switch(code){
        case 13:
          return 10;  // Enter
        case 46:
          return 127; // Delete
      }
      return code;
    }

    function charCodeMap(code, shift) {
      // Letters
      if (code >= 65 && code <= 90) { // A-Z
        // Keys return ASCII for upcased letters.
        // Convert to downcase if shiftKey is not pressed.
        if (shift) {
          return code;
        }
        else {
          return code + 32;
        }
      }

      // Numbers and their shift-symbols
      else if (code >= 48 && code <= 57) { // 0-9
        if (shift) {
          switch (code) {
          case 49:
            return 33; // !
          case 50:
            return 64; // @
          case 51:
            return 35; // #
          case 52:
            return 36; // $
          case 53:
            return 37; // %
          case 54:
            return 94; // ^
          case 55:
            return 38; // &
          case 56:
            return 42; // *
          case 57:
            return 40; // (
          case 48:
            return 41; // )
          }
        }
      }

      // Symbols and their shift-symbols
      else {
        if (shift) {
          switch (code) {
          case 107:
            return 43; // +
          case 219:
            return 123; // {
          case 221:
            return 125; // }
          case 222:
            return 34; // "
          }
        } else {
          switch (code) {
          case 188:
            return 44; // ,
          case 109:
            return 45; // -
          case 190:
            return 46; // .
          case 191:
            return 47; // /
          case 192:
            return 96; // ~
          case 219:
            return 91; // [
          case 220:
            return 92; // \
          case 221:
            return 93; // ]
          case 222:
            return 39; // '
          }
        }
      }
      return code;
    }

    // used to reproduce P5 key strokes (normally the first stroke)
    function normalKeyDown(){
      var tempKeyCode;
      p.keyPressed();
      tempKeyCode = p.keyCode;
      p.keyCode = 0;
      p.keyTyped();
      p.keyCode = tempKeyCode;
    }

    // used to reproduce P5 key strokes (generally the refiring of keys)
    function refireKeyDown(){
      var tempKeyCode;
      p.keyPressed();
      tempKeyCode = p.keyCode;
      p.keyCode = 0;
      p.keyTyped();
      p.keyCode = tempKeyCode;
    }

    // event listeners call this function in order to deal with the keys being pressed
    function keyFunc(e, type) {
      var tempKeyCode;
      p.key = keyCodeMap(e.keyCode, e.shiftKey);
      if (type === "keypress") {
        if (e.keyCode === e.charCode) {  // Hack for Google Chrome that bypasses problem with keys being the same keyCode
          p.keyCode = -1;               // for keydown and keypress - like s and F4 give the same keyCode of 115
        }
      }
      switch (p.keyCode) {
        case 19:  // Pause-Break
        case 33:  // Page Up
        case 34:  // Page Down
        case 35:  // End
        case 36:  // Home
        case 37:  // Left Arrow
        case 38:  // Up Arrow
        case 39:  // Right Arrow
        case 40:  // Down Arrow
        case 45:  // Insert
        case 112: // F1
        case 113: // F2
        case 114: // F3
        case 115: // F4
        case 116: // F5
        case 117: // F6
        case 118: // F7
        case 119: // F8
        case 120: // F9
        case 121: // F10
        case 122: // F11
        case 123: // F12
        case 145: // Scroll Lock
        case 155: // Insert
        case 224: // NumPad Up
        case 225: // NumPad Down
        case 226: // NumPad Left
        case 227: // NumPad Right
          if (type === "keydown") {
            if (gRefire) {
              p.keyReleased();
              p.keyPressed();
            } else {
              p.keyPressed();
              gRefire = true;
            }
          } else if (type === "keypress") {
            if (firstCodedDown) {
              firstCodedDown = false;
            } else {
              p.keyReleased();
              p.keyPressed();
            }
          } else if (type === "keyup") {
            p.keyReleased();
            if (firstCodedDown === false) { firstCodedDown = true; }
            if (gRefire){ gRefire = false; }
          }
          break;
        case 16:  // Shift
        case 17:  // Ctrl
        case 18:  // Alt
        case 20:  // Caps Lock
        case 144: // Num Lock
          if (type === "keydown") {
            p.keyPressed();
          } else if (type === "keyup") {
            p.keyReleased();
          }
          break;
        case 46:  // Delete
        case 13: // Enter
          if (type === "keydown") {
            if (firstEDGKeyDown === true) {
              firstEDGKeyDown = false;
              normalKeyDown();
            } else {
              refireKeyDown();
            }
          } else if (type === "keypress") {
            if (firstEDMKeyDown === true) {
              firstEDMKeyDown = false;
            } else {
              refireKeyDown();
            }
          } else if (type === "keyup") {
            p.keyCode = e.keyCode;
            p.keyReleased();
            if (firstEDGKeyDown === false) { firstEDGKeyDown = true; }
            if (firstEDMKeyDown === false) { firstEDMKeyDown = true; }
          }
          break;
        default:
          if (p.keyCode === -1) {
            p.keyCode = e.keyCode;
          }
          if (e.keyCode === 0) {
            p.key = charCodeMap(e.charCode, e.shiftKey);  // dealing with Mozilla key strokes
            if (type === "keypress") {
              if (firstMKeyDown === true) {
                firstMKeyDown = false;
              } else {
                refireKeyDown();
              }
            } else if (type === "keyup") {
              p.keyCode = e.keyCode;
              p.keyReleased();
              if (firstMKeyDown === false) { firstMKeyDown = true; }
            }
          } else {
            p.key = charCodeMap(e.keyCode, e.shiftKey);  // dealing with Google key strokes
            if (type === "keydown") {
              if (firstGKeyDown === true) {
                firstGKeyDown = false;
                normalKeyDown();
              } else {
                refireKeyDown();
              }
            } else if (type === "keyup") {
              p.keyCode = e.keyCode;
              p.keyReleased();
              if (firstMKeyDown === false) { firstMKeyDown = true; }
              if (firstGKeyDown === false) { firstGKeyDown = true; }
            }
          }
          break;
      }
    }

    // Place-holder for debugging function
    Processing.debug = function(e) {};

    // Send aCode Processing syntax to be converted to JavaScript
    if (aCode) {
      if (aCode instanceof Processing.Sketch) {
        // Use sketch as is
        curSketch = aCode;
      } else if (typeof aCode === "function") {
        // Wrap function with default sketch parameters
        curSketch = new Processing.Sketch(aCode);
      } else {
//#if PARSER
        // Compile the code
        curSketch = Processing.compile(aCode);
//#else
//      throw "PJS compile is not supported";
//#endif
      }

      // Expose internal field for diagnostics and testing
      p.externals.sketch = curSketch;

      p.use3DContext = curSketch.use3DContext;

      if ("mozOpaque" in curElement) {
        curElement.mozOpaque = !curSketch.options.isTransparent;
      }

      // the onfocus and onblur events are handled in two parts.
      // 1) the p.focused property is handled per sketch
      curElement.onfocus = function() {
        p.focused = true;
      };

      curElement.onblur = function() {
        p.focused = false;
      };

      // 2) looping status is handled per page, based on the pauseOnBlur @pjs directive
      if (curSketch.options.pauseOnBlur) {
        attach(window, 'focus', function() {
          if (doLoop) {
            p.loop();
          }
        });

        attach(window, 'blur', function() {
          if (doLoop && loopStarted) {
            p.noLoop();
            doLoop = true; // make sure to keep this true after the noLoop call
          }
        });
      }

      // if keyboard events should be handled globally, the listeners should
      // be bound to the document window, rather than to the current canvas
      var keyTrigger = curSketch.options.globalKeyEvents ? window : curElement;

      attach(keyTrigger, "keydown", function(e) {
        p.keyCode = e.keyCode;
        p.__keyPressed = true;
        p.key = keyCodeMap(e.keyCode, e.shiftKey);
        if (p.key !== PConstants.CODED) {
          p.key = charCodeMap(e.keyCode, e.shiftKey);
        }
        keyFunc(e, "keydown");
      });

      attach(keyTrigger, "keypress", function (e) {
        keyFunc(e, "keypress");
      });

      attach(keyTrigger, "keyup", function(e) {
        p.keyCode = e.keyCode;
        p.__keyPressed = false;
        p.key = keyCodeMap(e.keyCode, e.shiftKey);
        if (p.key !== PConstants.CODED) {
          p.key = charCodeMap(e.keyCode, e.shiftKey);
        }
        keyFunc(e, "keyup");
      });

      if (!curSketch.use3DContext) {
        // Setup default 2d canvas context.
        curContext = curElement.getContext('2d');

        // Externalize the default context
        p.externals.context = curContext;

        modelView = new PMatrix2D();

        // Canvas has trouble rendering single pixel stuff on whole-pixel
        // counts, so we slightly offset it (this is super lame).
        curContext.translate(0.5, 0.5);

        curContext.lineCap = 'round';

        // Set default stroke and fill color
        p.stroke(0);
        p.fill(255);
        p.noSmooth();
        p.disableContextMenu();
      }

      // Step through the libraries that were attached at doc load...
      for (var i in Processing.lib) {
        if (Processing.lib.hasOwnProperty(i)) {
          if(Processing.lib[i].hasOwnProperty("attach")) {
            // use attach function if present
            Processing.lib[i].attach(p);
          } else if(Processing.lib[i] instanceof Function)  {
            // Init the libraries in the context of this p_instance (legacy)
            Processing.lib[i].call(this);
          }
        }
      }

      // Sets all of the Processing defaults. Called before setup() in executeSketch()
      var setDefaults = function(processing) {
        // Default size in P5 is 100x100 with a light gray background, but only set this for 2D
        if (!processing.use3DContext) {
          processing.size(100, 100);
          processing.background(204, 204, 204);
        }
      };

      var executeSketch = function(processing) {
        // Don't start until all specified images and fonts in the cache are preloaded
        if (!curSketch.imageCache.pending && curSketch.fonts.pending()) {
          // Run void setDefaults() before attach() to work with embedded scripts
          setDefaults(processing);

          curSketch.attach(processing, defaultScope);

          // Run void setup()
          if (processing.setup) {
            processing.setup();
            // if any transforms were performed in setup reset to identify matrix so draw loop is unpolluted
            if (!curSketch.use3DContext) {
              curContext.setTransform(1, 0, 0, 1, 0, 0);
            }
          }

          // some pixels can be cached, flushing
          resetContext();

          if (processing.draw) {
            if (!doLoop) {
              processing.redraw();
            } else {
              processing.loop();
            }
          }
        } else {
          window.setTimeout(function() { executeSketch(processing); }, 10);
        }
      };

      // Only store an instance of non-createGraphics instances.
      addInstance(this);

      // The parser adds custom methods to the processing context
      // this renames p to processing so these methods will run
      executeSketch(p);
    } else {
      // No executable sketch was specified
      // or called via createGraphics
      curSketch = new Processing.Sketch();
      curSketch.options.isTransparent = true;
    }
  }; // Processing() ends

  Processing.prototype = defaultScope;

//#if PARSER
  // Processing global methods and constants for the parser
  function getGlobalMembers() {
    // The names array contains the names of everything that is inside "p."
    // When something new is added to "p." it must also be added to this list.
    var names = [ /* this code is generated by jsglobals.js */
      "abs", "acos", "alpha", "ambient", "ambientLight", "append", "applyMatrix",
      "arc", "arrayCopy", "asin", "atan", "atan2", "background", "beginCamera",
      "beginDraw", "beginShape", "bezier", "bezierDetail", "bezierPoint",
      "bezierTangent", "bezierVertex", "binary", "blend", "blendColor",
      "blit_resize", "blue", "boolean", "box", "breakShape", "brightness",
      "byte", "camera", "ceil", "char", "Character", "clear", "color",
      "colorMode", "concat", "console", "constrain", "copy", "cos", "createFont",
      "createGraphics", "createImage", "cursor", "curve", "curveDetail",
      "curvePoint", "curveTangent", "curveTightness", "curveVertex", "day",
      "defaultColor", "degrees", "directionalLight", "disableContextMenu",
      "dist", "draw", "ellipse", "ellipseMode", "emissive", "enableContextMenu",
      "endCamera", "endDraw", "endShape", "exit", "exp", "expand", "externals",
      "fill", "filter", "filter_bilinear", "filter_new_scanline", "float",
      "floor", "focused", "frameCount", "frameRate", "frustum", "get",
      "glyphLook", "glyphTable", "green", "height", "hex", "hint", "hour", "hue",
      "image", "imageMode", "Import", "int", "intersect", "join", "key",
      "keyCode", "keyPressed", "keyReleased", "keyTyped", "lerp", "lerpColor",
      "lightFalloff", "lights", "lightSpecular", "line", "link", "loadBytes",
      "loadFont", "loadGlyphs", "loadImage", "loadPixels", "loadShape",
      "loadStrings", "log", "loop", "mag", "map", "match", "matchAll", "max",
      "millis", "min", "minute", "mix", "modelX", "modelY", "modelZ", "modes",
      "month", "mouseButton", "mouseClicked", "mouseDragged", "mouseMoved",
      "mouseOut", "mouseOver", "mousePressed", "mouseReleased", "mouseScroll",
      "mouseScrolled", "mouseX", "mouseY", "name", "nf", "nfc", "nfp", "nfs",
      "noCursor", "noFill", "noise", "noiseDetail", "noiseSeed", "noLights",
      "noLoop", "norm", "normal", "noSmooth", "noStroke", "noTint", "ortho",
      "parseBoolean", "peg", "perspective", "PFont", "PImage", "pixels",
      "PMatrix2D", "PMatrix3D", "PMatrixStack", "pmouseX", "pmouseY", "point",
      "pointLight", "popMatrix", "popStyle", "pow", "print", "printCamera",
      "println", "printMatrix", "printProjection", "PShape", "PShapeSVG",
      "pushMatrix", "pushStyle", "quad", "radians", "random", "Random",
      "randomSeed", "rect", "rectMode", "red", "redraw", "requestImage",
      "resetMatrix", "reverse", "rotate", "rotateX", "rotateY", "rotateZ",
      "round", "saturation", "save", "saveFrame", "saveStrings", "scale",
      "screenX", "screenY", "screenZ", "second", "set", "setup", "shape",
      "shapeMode", "shared", "shininess", "shorten", "sin", "size", "smooth",
      "sort", "specular", "sphere", "sphereDetail", "splice", "split",
      "splitTokens", "spotLight", "sq", "sqrt", "status", "str", "stroke",
      "strokeCap", "strokeJoin", "strokeWeight", "subset", "tan", "text",
      "textAlign", "textAscent", "textDescent", "textFont", "textLeading",
      "textMode", "textSize", "texture", "textureMode", "textWidth", "tint",
      "touchCancel", "touchEnd", "touchMove", "touchStart", "translate",
      "triangle", "trim", "unbinary", "unhex", "updatePixels", "use3DContext",
      "vertex", "width", "XMLElement", "year", "__equals", "__frameRate",
      "__hashCode", "__int_cast", "__keyPressed", "__mousePressed",
      "__printStackTrace", "__replace", "__replaceAll", "__replaceFirst",
      "__toCharArray"];

    var members = {};
    var i, l;
    for (i = 0, l = names.length; i < l ; ++i) {
      members[names[i]] = null;
    }
    for (var lib in Processing.lib) {
      if (Processing.lib.hasOwnProperty(lib)) {
        if (Processing.lib[lib].exports) {
          var exportedNames = Processing.lib[lib].exports;
          for (i = 0, l = exportedNames.length; i < l; ++i) {
           members[exportedNames[i]] = null;
          }
        }
      }
    }
    return members;
  }

/*

    Parser converts Java-like syntax into JavaScript.
    Creates an Abstract Syntax Tree -- "Light AST" from the Java-like code.

    It is an object tree. The root object is created from the AstRoot class, which contains statements.

    A statement object can be of type: AstForStatement, AstCatchStatement, AstPrefixStatement, AstMethod, AstClass,
    AstInterface, AstFunction, AstStatementBlock and AstLabel.

    AstPrefixStatement can be a statement of type: if, switch, while, with, do, else, finally, return, throw, try, break, and continue.

    These object's toString function returns the JavaScript code for the statement.

    Any processing calls need "processing." prepended to them.

    Similarly, calls from inside classes need "$this_1.", prepended to them,
    with 1 being the depth level for inner classes.
    This includes members passed down from inheritance.

    The resulting code is then eval'd and run.

*/

  function parseProcessing(code) {
    var globalMembers = getGlobalMembers();

    // masks parentheses, brackets and braces with '"A5"'
    // where A is the bracket type, and 5 is the index in an array containing all brackets split into atoms
    // 'while(true){}' -> 'while"B1""A2"'
    // parentheses() = B, brackets[] = C and braces{} = A
    function splitToAtoms(code) {
      var atoms = [];
      var items = code.split(/([\{\[\(\)\]\}])/);
      var result = items[0];

      var stack = [];
      for(var i=1; i < items.length; i += 2) {
        var item = items[i];
        if(item === '[' || item === '{' || item === '(') {
          stack.push(result); result = item;
        } else if(item === ']' || item === '}' || item === ')') {
          var kind = item === '}' ? 'A' : item === ')' ? 'B' : 'C';
          var index = atoms.length; atoms.push(result + item);
          result = stack.pop() + '"' + kind + (index + 1) + '"';
        }
        result += items[i + 1];
      }
      atoms.unshift(result);
      return atoms;
    }

    // replaces strings and regexs keyed by index with an array of strings
    function injectStrings(code, strings) {
      return code.replace(/'(\d+)'/g, function(all, index) {
        var val = strings[index];
        if(val.charAt(0) === "/") {
          return val;
        } else {
          return (/^'((?:[^'\\\n])|(?:\\.[0-9A-Fa-f]*))'$/).test(val) ? "(new $p.Character(" + val + "))" : val;
        }
      });
    }

    // trims off leading and trailing spaces
    // returns an object. object.left, object.middle, object.right, object.untrim
    function trimSpaces(string) {
      var m1 = /^\s*/.exec(string), result;
      if(m1[0].length === string.length) {
        result = {left: m1[0], middle: "", right: ""};
      } else {
        var m2 = /\s*$/.exec(string);
        result = {left: m1[0], middle: string.substring(m1[0].length, m2.index), right: m2[0]};
      }
      result.untrim = function(t) { return this.left + t + this.right; };
      return result;
    }

    // simple trim of leading and trailing spaces
    function trim(string) {
      return string.replace(/^\s+/,'').replace(/\s+$/,'');
    }

    function appendToLookupTable(table, array) {
      for(var i=0,l=array.length;i<l;++i) {
        table[array[i]] = null;
      }
      return table;
    }

    function isLookupTableEmpty(table) {
      for(var i in table) {
        if(table.hasOwnProperty(i)) {
          return false;
        }
      }
      return true;
    }

    function getAtomIndex(templ) { return templ.substring(2, templ.length - 1); }

    // remove carriage returns "\r"
    var codeWoExtraCr = code.replace(/\r\n?|\n\r/g, "\n");

    // masks strings and regexs with "'5'", where 5 is the index in an array containing all strings and regexs
    // also removes all comments
    var strings = [];
    var codeWoStrings = codeWoExtraCr.replace(/("(?:[^"\\\n]|\\.)*")|('(?:[^'\\\n]|\\.)*')|(([\[\(=|&!\^:?]\s*)(\/(?![*\/])(?:[^\/\\\n]|\\.)*\/[gim]*)\b)|(\/\/[^\n]*\n)|(\/\*(?:(?!\*\/)(?:.|\n))*\*\/)/g,
    function(all, quoted, aposed, regexCtx, prefix, regex, singleComment, comment) {
      var index;
      if(quoted || aposed) { // replace strings
        index = strings.length; strings.push(all);
        return "'" + index + "'";
      } else if(regexCtx) { // replace RegExps
        index = strings.length; strings.push(regex);
        return prefix + "'" + index + "'";
      } else { // kill comments
        return comment !== "" ? " " : "\n";
      }
    });

    var atoms = splitToAtoms(codeWoStrings);
    var replaceContext;
    var declaredClasses = {}, currentClassId, classIdSeed = 0;

    function addAtom(text, type) {
      var lastIndex = atoms.length;
      atoms.push(text);
      return '"' + type + lastIndex + '"';
    }

    function generateClassId() {
      return "class" + (++classIdSeed);
    }

    function appendClass(class_, classId, scopeId) {
      class_.classId = classId;
      class_.scopeId = scopeId;
      declaredClasses[classId] = class_;
    }

    // functions defined below
    var transformClassBody, transformStatementsBlock, transformStatements, transformMain, transformExpression;

    var classesRegex = /\b((?:(?:public|private|final|protected|static|abstract)\s+)*)(class|interface)\s+([A-Za-z_$][\w$]*\b)(\s+extends\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\b)?(\s+implements\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\b)*)?\s*("A\d+")/g;
    var methodsRegex = /\b((?:(?:public|private|final|protected|static|abstract|synchronized)\s+)*)((?!(?:else|new|return|throw|function|public|private|protected)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*([A-Za-z_$][\w$]*\b)\s*("B\d+")(\s*throws\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)*)?\s*("A\d+"|;)/g;
    var fieldTest = /^((?:(?:public|private|final|protected|static)\s+)*)((?!(?:else|new|return|throw)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*([A-Za-z_$][\w$]*\b)\s*(?:"C\d+"\s*)*([=,]|$)/;
    var cstrsRegex = /\b((?:(?:public|private|final|protected|static|abstract)\s+)*)((?!(?:new|return|throw)\b)[A-Za-z_$][\w$]*\b)\s*("B\d+")(\s*throws\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)*)?\s*("A\d+")/g;
    var attrAndTypeRegex = /^((?:(?:public|private|final|protected|static)\s+)*)((?!(?:new|return|throw)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*/;
    var functionsRegex = /\bfunction(?:\s+([A-Za-z_$][\w$]*))?\s*("B\d+")\s*("A\d+")/g;

    // This converts classes, methods and functions into atoms, and adds them to the atoms array.
    // classes = E, methods = D and functions = H
    function extractClassesAndMethods(code) {
      var s = code;
      s = s.replace(classesRegex, function(all) {
        return addAtom(all, 'E');
      });
      s = s.replace(methodsRegex, function(all) {
        return addAtom(all, 'D');
      });
      s = s.replace(functionsRegex, function(all) {
        return addAtom(all, 'H');
      });
      return s;
    }

    // This converts constructors into atoms, and adds them to the atoms array.
    // constructors = G
    function extractConstructors(code, className) {
      var result = code.replace(cstrsRegex, function(all, attr, name, params, throws_, body) {
        if(name !== className) {
          return all;
        } else {
          return addAtom(all, 'G');
        }
      });
      return result;
    }

    // AstParam contains the name of a parameter inside a function declaration
    function AstParam(name) {
      this.name = name;
    }
    AstParam.prototype.toString = function() {
      return this.name;
    };
    // AstParams contains an array of AstParam objects
    function AstParams(params) {
      this.params = params;
    }
    AstParams.prototype.getNames = function() {
      var names = [];
      for(var i=0,l=this.params.length;i<l;++i) {
        names.push(this.params[i].name);
      }
      return names;
    };
    AstParams.prototype.toString = function() {
      if(this.params.length === 0) {
        return "()";
      }
      var result = "(";
      for(var i=0,l=this.params.length;i<l;++i) {
        result += this.params[i] + ", ";
      }
      return result.substring(0, result.length - 2) + ")";
    };

    function transformParams(params) {
      var paramsWoPars = trim(params.substring(1, params.length - 1));
      var result = [];
      if(paramsWoPars !== "") {
        var paramList = paramsWoPars.split(",");
        for(var i=0; i < paramList.length; ++i) {
          var param = /\b([A-Za-z_$][\w$]*\b)\s*("[ABC][\d]*")?$/.exec(paramList[i]);
          result.push(new AstParam(param[1]));
        }
      }
      return new AstParams(result);
    }

    function preExpressionTransform(expr) {
      var s = expr;
      // new type[] {...} --> {...}
      s = s.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\s*"C\d+")+\s*("A\d+")/g, function(all, type, init) {
        return init;
      });
      // new Runnable() {...} --> "F???"
      s = s.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\s*"B\d+")\s*("A\d+")/g, function(all, type, init) {
        return addAtom(all, 'F');
      });
      // function(...) { } --> "H???"
      s = s.replace(functionsRegex, function(all) {
        return addAtom(all, 'H');
      });
      // new type[?] --> createJavaArray('type', [?])
      s = s.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)\s*("C\d+"(?:\s*"C\d+")*)/g, function(all, type, index) {
        var args = index.replace(/"C(\d+)"/g, function(all, j) { return atoms[j]; })
          .replace(/\[\s*\]/g, "[null]").replace(/\s*\]\s*\[\s*/g, ", ");
        var arrayInitializer = "{" + args.substring(1, args.length - 1) + "}";
        var createArrayArgs = "('" + type + "', " + addAtom(arrayInitializer, 'A') + ")";
        return '$p.createJavaArray' + addAtom(createArrayArgs, 'B');
      });
      // .length() --> .length
      s = s.replace(/(\.\s*length)\s*"B\d+"/g, "$1");
      // #000000 --> 0x000000
      s = s.replace(/#([0-9A-Fa-f]{6})\b/g, function(all, digits) {
        return "0xFF" + digits;
      });
      // delete (type)???, except (int)???
      s = s.replace(/"B(\d+)"(\s*(?:[\w$']|"B))/g, function(all, index, next) {
        var atom = atoms[index];
        if(!/^\(\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\s*(?:"C\d+"\s*)*\)$/.test(atom)) {
          return all;
        } else if(/^\(\s*int\s*\)$/.test(atom)) {
          return "(int)" + next;
        } else {
          var indexParts = atom.split(/"C(\d+)"/g);
          if(indexParts.length > 1) {
            // even items contains atom numbers, can check only first
            if(! /^\[\s*\]$/.test(atoms[indexParts[1]])) {
              return all; // fallback - not a cast
            }
          }
          return "" + next;
        }
      });
      // (int)??? -> __int_cast(???)
      s = s.replace(/\(int\)([^,\]\)\}\?\:\*\+\-\/\^\|\%\&\~]+)/g, function(all, arg) {
        var trimmed = trimSpaces(arg);
        return trimmed.untrim("__int_cast(" + trimmed.middle + ")");
      });
      // super() -> $superCstr(), super. -> $super.;
      s = s.replace(/\bsuper(\s*"B\d+")/g, "$$superCstr$1").replace(/\bsuper(\s*\.)/g, "$$super$1");
      // 000.43->0.43 and 0010f->10, but not 0010
      s = s.replace(/\b0+((\d*)(?:\.[\d*])?(?:[eE][\-\+]?\d+)?[fF]?)\b/, function(all, numberWo0, intPart) {
        if( numberWo0 === intPart) {
          return all;
        }
        return intPart === "" ? "0" + numberWo0 : numberWo0;
      });
      // 3.0f -> 3.0
      s = s.replace(/\b(\.?\d+\.?)[fF]\b/g, "$1");
      // Weird (?) parsing errors with %
      s = s.replace(/([^\s])%([^=\s])/g, "$1 % $2");
      // Since frameRate() and frameRate are different things,
      // we need to differentiate them somehow. So when we parse
      // the Processing.js source, replace frameRate so it isn't
      // confused with frameRate(), as well as keyPressed and mousePressed
      s = s.replace(/\b(frameRate|keyPressed|mousePressed)\b(?!\s*"B)/g, "__$1");
      // "pixels" replacements:
      //   pixels[i] = c => pixels.setPixel(i,c) | pixels[i] => pixels.getPixel(i)
      //   pixels.length => pixels.getLength()
      //   pixels = ar => pixels.set(ar) | pixels => pixels.toArray()
      s = s.replace(/\bpixels\s*(("C(\d+)")|\.length)?(\s*=(?!=)([^,\]\)\}]+))?/g,
        function(all, indexOrLength, index, atomIndex, equalsPart, rightSide) {
          if(index) {
            var atom = atoms[atomIndex];
            if(equalsPart) {
              return "pixels.setPixel" + addAtom("(" +atom.substring(1, atom.length - 1) +
                "," + rightSide + ")", 'B');
            } else {
              return "pixels.getPixel" + addAtom("(" + atom.substring(1, atom.length - 1) +
                ")", 'B');
            }
          } else if(indexOrLength) {
            // length
            return "pixels.getLength" + addAtom("()", 'B');
          } else {
            if(equalsPart) {
              return "pixels.set" + addAtom("(" + rightSide + ")", 'B');
            } else {
              return "pixels.toArray" + addAtom("()", 'B');
            }
          }
        });
      // Java method replacements for: replace, replaceAll, replaceFirst, equals, hashCode, etc.
      //   xxx.replace(yyy) -> __replace(xxx, yyy)
      //   "xx".replace(yyy) -> __replace("xx", yyy)
      var repeatJavaReplacement;
      do {
        repeatJavaReplacement = false;
        s = s.replace(/((?:'\d+'|\b[A-Za-z_$][\w$]*\s*(?:"[BC]\d+")*)\s*\.\s*(?:[A-Za-z_$][\w$]*\s*(?:"[BC]\d+"\s*)*\.\s*)*)(replace|replaceAll|replaceFirst|equals|hashCode|toCharArray|printStackTrace)\s*"B(\d+)"/g,
          function(all, subject, method, atomIndex) {
            var atom = atoms[atomIndex];
            repeatJavaReplacement = true;
            var trimmed = trimSpaces(atom.substring(1, atom.length - 1));
            return "__" + method  + ( trimmed.middle === "" ? addAtom("(" + subject.replace(/\.\s*$/, "") + ")", 'B') :
              addAtom("(" + subject.replace(/\.\s*$/, "") + "," + trimmed.middle + ")", 'B') );
          });
      } while (repeatJavaReplacement);
      // this() -> $constr()
      s = s.replace(/\bthis(\s*"B\d+")/g, "$$constr$1");

      return s;
    }

    function AstInlineClass(baseInterfaceName, body) {
      this.baseInterfaceName = baseInterfaceName;
      this.body = body;
      body.owner = this;
    }
    AstInlineClass.prototype.toString = function() {
      return "new (" + this.body + ")";
    };

    function transformInlineClass(class_) {
      var m = new RegExp(/\bnew\s*(Runnable)\s*"B\d+"\s*"A(\d+)"/).exec(class_);
      if(m === null) {
        return "null";
      } else {
        var oldClassId = currentClassId, newClassId = generateClassId();
        currentClassId = newClassId;
        // only Runnable supported
        var inlineClass = new AstInlineClass("Runnable", transformClassBody(atoms[m[2]], m[1]));
        appendClass(inlineClass, newClassId, oldClassId);

        currentClassId = oldClassId;
        return inlineClass;
      }
    }

    function AstFunction(name, params, body) {
      this.name = name;
      this.params = params;
      this.body = body;
    }
    AstFunction.prototype.toString = function() {
      var oldContext = replaceContext;
      // saving "this." and parameters
      var names = appendToLookupTable({"this":null}, this.params.getNames());
      replaceContext = function (subject) {
        return names.hasOwnProperty(subject.name) ? subject.name : oldContext(subject);
      };
      var result = "function";
      if(this.name) {
        result += " " + this.name;
      }
      result += this.params + " " + this.body;
      replaceContext = oldContext;
      return result;
    };

    function transformFunction(class_) {
      var m = new RegExp(/\b([A-Za-z_$][\w$]*)\s*"B(\d+)"\s*"A(\d+)"/).exec(class_);
      return new AstFunction( m[1] !== "function" ? m[1] : null,
        transformParams(atoms[m[2]]), transformStatementsBlock(atoms[m[3]]));
    }

    function AstInlineObject(members) {
      this.members = members;
    }
    AstInlineObject.prototype.toString = function() {
      var oldContext = replaceContext;
      replaceContext = function (subject) {
          return subject.name === "this" ? "this" : oldContext(subject); // saving "this."
      };
      var result = "";
      for(var i=0,l=this.members.length;i<l;++i) {
        if(this.members[i].label) {
          result += this.members[i].label + ": ";
        }
        result += this.members[i].value.toString() + ", ";
      }
      replaceContext = oldContext;
      return result.substring(0, result.length - 2);
    };

    function transformInlineObject(obj) {
      var members = obj.split(',');
      for(var i=0; i < members.length; ++i) {
        var label = members[i].indexOf(':');
        if(label < 0) {
          members[i] = { value: transformExpression(members[i]) };
        } else {
          members[i] = { label: trim(members[i].substring(0, label)),
            value: transformExpression( trim(members[i].substring(label + 1)) ) };
        }
      }
      return new AstInlineObject(members);
    }

    function expandExpression(expr) {
      if(expr.charAt(0) === '(' || expr.charAt(0) === '[') {
        return expr.charAt(0) + expandExpression(expr.substring(1, expr.length - 1)) + expr.charAt(expr.length - 1);
      } else if(expr.charAt(0) === '{') {
        if(/^\{\s*(?:[A-Za-z_$][\w$]*|'\d+')\s*:/.test(expr)) {
          return "{" + addAtom(expr.substring(1, expr.length - 1), 'I') + "}";
        } else {
          return "[" + expandExpression(expr.substring(1, expr.length - 1)) + "]";
        }
      } else {
        var trimmed = trimSpaces(expr);
        var result = preExpressionTransform(trimmed.middle);
        result = result.replace(/"[ABC](\d+)"/g, function(all, index) {
          return expandExpression(atoms[index]);
        });
        return trimmed.untrim(result);
      }
    }

    function replaceContextInVars(expr) {
      return expr.replace(/(\.\s*)?(\b[A-Za-z_$][\w$]*\b)(\s*\.\s*(\b[A-Za-z_$][\w$]*\b)(\s*\()?)?/g,
        function(all, memberAccessSign, identifier, suffix, subMember, callSign) {
          if(memberAccessSign) {
            return all;
          } else {
            var subject = { name: identifier, member: subMember, callSign: !!callSign };
            return replaceContext(subject) + (suffix === undef ? "" : suffix);
          }
        });
    }

    function AstExpression(expr, transforms) {
      this.expr = expr;
      this.transforms = transforms;
    }
    AstExpression.prototype.toString = function() {
      var transforms = this.transforms;
      var expr = replaceContextInVars(this.expr);
      return expr.replace(/"!(\d+)"/g, function(all, index) {
        return transforms[index].toString();
      });
    };

    transformExpression = function(expr) {
      var transforms = [];
      var s = expandExpression(expr);
      s = s.replace(/"H(\d+)"/g, function(all, index) {
        transforms.push(transformFunction(atoms[index]));
        return '"!' + (transforms.length - 1) + '"';
      });
      s = s.replace(/"F(\d+)"/g, function(all, index) {
        transforms.push(transformInlineClass(atoms[index]));
        return '"!' + (transforms.length - 1) + '"';
      });
      s = s.replace(/"I(\d+)"/g, function(all, index) {
        transforms.push(transformInlineObject(atoms[index]));
        return '"!' + (transforms.length - 1) + '"';
      });

      return new AstExpression(s, transforms);
    };

    function AstVarDefinition(name, value, isDefault) {
      this.name = name;
      this.value = value;
      this.isDefault = isDefault;
    }
    AstVarDefinition.prototype.toString = function() {
      return this.name + ' = ' + this.value;
    };

    function transformVarDefinition(def, defaultTypeValue) {
      var eqIndex = def.indexOf("=");
      var name, value, isDefault;
      if(eqIndex < 0) {
        name = def;
        value = defaultTypeValue;
        isDefault = true;
      } else {
        name = def.substring(0, eqIndex);
        value = transformExpression(def.substring(eqIndex + 1));
        isDefault = false;
      }
      return new AstVarDefinition( trim(name.replace(/(\s*"C\d+")+/g, "")),
        value, isDefault);
    }

    function getDefaultValueForType(type) {
        if(type === "int" || type === "float") {
          return "0";
        } else if(type === "boolean") {
          return "false";
        } else if(type === "color") {
          return "0x00000000";
        } else {
          return "null";
        }
    }

    function AstVar(definitions, varType) {
      this.definitions = definitions;
      this.varType = varType;
    }
    AstVar.prototype.getNames = function() {
      var names = [];
      for(var i=0,l=this.definitions.length;i<l;++i) {
        names.push(this.definitions[i].name);
      }
      return names;
    };
    AstVar.prototype.toString = function() {
      return "var " + this.definitions.join(",");
    };
    function AstStatement(expression) {
      this.expression = expression;
    }
    AstStatement.prototype.toString = function() {
      return this.expression.toString();
    };

    function transformStatement(statement) {
      if(fieldTest.test(statement)) {
        var attrAndType = attrAndTypeRegex.exec(statement);
        var definitions = statement.substring(attrAndType[0].length).split(",");
        var defaultTypeValue = getDefaultValueForType(attrAndType[2]);
        for(var i=0; i < definitions.length; ++i) {
          definitions[i] = transformVarDefinition(definitions[i], defaultTypeValue);
        }
        return new AstVar(definitions, attrAndType[2]);
      } else {
        return new AstStatement(transformExpression(statement));
      }
    }

    function AstForExpression(initStatement, condition, step) {
      this.initStatement = initStatement;
      this.condition = condition;
      this.step = step;
    }
    AstForExpression.prototype.toString = function() {
      return "(" + this.initStatement + "; " + this.condition + "; " + this.step + ")";
    };

    function AstForInExpression(initStatement, container) {
      this.initStatement = initStatement;
      this.container = container;
    }
    AstForInExpression.prototype.toString = function() {
      var init = this.initStatement.toString();
      if(init.indexOf("=") >= 0) { // can be without var declaration
        init = init.substring(0, init.indexOf("="));
      }
      return "(" + init + " in " + this.container + ")";
    };

    function AstForEachExpression(initStatement, container) {
      this.initStatement = initStatement;
      this.container = container;
    }
    AstForEachExpression.iteratorId = 0;
    AstForEachExpression.prototype.toString = function() {
      var init = this.initStatement.toString();
      var iterator = "$it" + (AstForEachExpression.iteratorId++);
      var variableName = init.replace(/^\s*var\s*/, "").split("=")[0];
      var initIteratorAndVariable = "var " + iterator + " = new $p.ObjectIterator(" + this.container + "), " +
         variableName + " = void(0)";
      var nextIterationCondition = iterator + ".hasNext() && ((" +
         variableName + " = " + iterator + ".next()) || true)";
      return "(" + initIteratorAndVariable + "; " + nextIterationCondition + ";)";
    };

    function transformForExpression(expr) {
      var content;
      if (/\bin\b/.test(expr)) {
        content = expr.substring(1, expr.length - 1).split(/\bin\b/g);
        return new AstForInExpression( transformStatement(trim(content[0])),
          transformExpression(content[1]));
      } else if (expr.indexOf(":") >= 0 && expr.indexOf(";") < 0) {
        content = expr.substring(1, expr.length - 1).split(":");
        return new AstForEachExpression( transformStatement(trim(content[0])),
          transformExpression(content[1]));
      } else {
        content = expr.substring(1, expr.length - 1).split(";");
        return new AstForExpression( transformStatement(trim(content[0])),
          transformExpression(content[1]), transformExpression(content[2]));
      }
    }

    function sortByWeight(array) {
      array.sort(function (a,b) {
        return b.weight - a.weight;
      });
    }

    function AstInnerInterface(name) {
      this.name = name;
    }
    AstInnerInterface.prototype.toString = function() {
      return  "this." + this.name + " = function " + this.name + "() { "+
        "throw 'This is an interface'; };";
    };
    function AstInnerClass(name, body, isStatic) {
      this.name = name;
      this.body = body;
      this.isStatic = isStatic;
      body.owner = this;
    }
    AstInnerClass.prototype.toString = function() {
      return "" + this.body;
    };

    function transformInnerClass(class_) {
      var m = classesRegex.exec(class_); // 1 - attr, 2 - class|int, 3 - name, 4 - extends, 5 - implements, 6 - body
      classesRegex.lastIndex = 0;
      var isStatic = m[1].indexOf("static") >= 0;
      var body = atoms[getAtomIndex(m[6])];
      if(m[2] === "interface") {
        return new AstInnerInterface(m[3]);
      } else {
        var oldClassId = currentClassId, newClassId = generateClassId();
        currentClassId = newClassId;
        var innerClass = new AstInnerClass(m[3], transformClassBody(body, m[3], m[4], m[5]), isStatic);
        appendClass(innerClass, newClassId, oldClassId);
        currentClassId = oldClassId;
        return innerClass;
      }
    }

    function AstClassMethod(name, params, body, isStatic) {
      this.name = name;
      this.params = params;
      this.body = body;
      this.isStatic = isStatic;
    }
    AstClassMethod.prototype.toString = function(){
      var thisReplacement = replaceContext({ name: "[this]" });
      var paramNames = appendToLookupTable({}, this.params.getNames());
      var oldContext = replaceContext;
      replaceContext = function (subject) {
        return paramNames.hasOwnProperty(subject.name) ? subject.name : oldContext(subject);
      };
      var result = "function " + this.methodId + this.params + " " + this.body +"\n";
      replaceContext = oldContext;
      return result;
    };

    function transformClassMethod(method) {
      var m = methodsRegex.exec(method);
      methodsRegex.lastIndex = 0;
      var isStatic = m[1].indexOf("static") >= 0;
      var body = m[6] !== ';' ? atoms[getAtomIndex(m[6])] : "{}";
      return new AstClassMethod(m[3], transformParams(atoms[getAtomIndex(m[4])]),
        transformStatementsBlock(body), isStatic );
    }

    function AstClassField(definitions, fieldType, isStatic) {
      this.definitions = definitions;
      this.fieldType = fieldType;
      this.isStatic = isStatic;
    }
    AstClassField.prototype.getNames = function() {
      var names = [];
      for(var i=0,l=this.definitions.length;i<l;++i) {
        names.push(this.definitions[i].name);
      }
      return names;
    };
    AstClassField.prototype.toString = function() {
      var thisPrefix = replaceContext({ name: "[this]" });
      if(this.isStatic) {
        var className = this.owner.name;
        var staticDeclarations = [];
        for(var i=0,l=this.definitions.length;i<l;++i) {
          var definition = this.definitions[i];
          var name = definition.name, staticName = className + "." + name;
          var declaration = "if(" + staticName + " === void(0)) {\n" +
            " " + staticName + " = " + definition.value + "; }\n" +
            "$p.defineProperty(" + thisPrefix + ", " +
            "'" + name + "', { get: function(){return " + staticName + ";}, " +
            "set: function(val){" + staticName + " = val;} });\n";
          staticDeclarations.push(declaration);
        }
        return staticDeclarations.join("");
      } else {
        return thisPrefix + "." + this.definitions.join("; " + thisPrefix + ".");
      }
    };

    function transformClassField(statement) {
      var attrAndType = attrAndTypeRegex.exec(statement);
      var isStatic = attrAndType[1].indexOf("static") >= 0;
      var definitions = statement.substring(attrAndType[0].length).split(/,\s*/g);
      var defaultTypeValue = getDefaultValueForType(attrAndType[2]);
      for(var i=0; i < definitions.length; ++i) {
        definitions[i] = transformVarDefinition(definitions[i], defaultTypeValue);
      }
      return new AstClassField(definitions, attrAndType[2], isStatic);
    }

    function AstConstructor(params, body) {
      this.params = params;
      this.body = body;
    }
    AstConstructor.prototype.toString = function() {
      var paramNames = appendToLookupTable({}, this.params.getNames());
      var oldContext = replaceContext;
      replaceContext = function (subject) {
        return paramNames.hasOwnProperty(subject.name) ? subject.name : oldContext(subject);
      };
      var prefix = "function $constr_" + this.params.params.length + this.params.toString();
      var body = this.body.toString();
      if(!/\$(superCstr|constr)\b/.test(body)) {
        body = "{\n$superCstr();\n" + body.substring(1);
      }
      replaceContext = oldContext;
      return prefix + body + "\n";
    };

    function transformConstructor(cstr) {
      var m = new RegExp(/"B(\d+)"\s*"A(\d+)"/).exec(cstr);
      var params = transformParams(atoms[m[1]]);

      return new AstConstructor(params, transformStatementsBlock(atoms[m[2]]));
    }

    function AstClassBody(name, baseClassName, functions, methods, fields, cstrs, innerClasses, misc) {
      var i,l;
      this.name = name;
      this.baseClassName = baseClassName;
      this.functions = functions;
      this.methods = methods;
      this.fields = fields;
      this.cstrs = cstrs;
      this.innerClasses = innerClasses;
      this.misc = misc;
      for(i=0,l=fields.length; i<l; ++i) {
        fields[i].owner = this;
      }
    }
    AstClassBody.prototype.getMembers = function(classFields, classMethods, classInners) {
      if(this.owner.base) {
        this.owner.base.body.getMembers(classFields, classMethods, classInners);
      }
      var i, j, l, m;
      for(i=0,l=this.fields.length;i<l;++i) {
        var fieldNames = this.fields[i].getNames();
        for(j=0,m=fieldNames.length;j<m;++j) {
          classFields[fieldNames[j]] = this.fields[i];
        }
      }
      for(i=0,l=this.methods.length;i<l;++i) {
        var method = this.methods[i];
        classMethods[method.name] = method;
      }
      for(i=0,l=this.innerClasses.length;i<l;++i) {
        var innerClass = this.innerClasses[i];
        classInners[innerClass.name] = innerClass;
      }
    };
    AstClassBody.prototype.toString = function() {
      function getScopeLevel(p) {
        var i = 0;
        while(p) {
          ++i;
          p=p.scope;
        }
        return i;
      }

      var scopeLevel = getScopeLevel(this.owner);

      var selfId = "$this_" + scopeLevel;
      var className = this.name;
      var result = "var " + selfId + " = this;\n";
      var staticDefinitions = "";

      var thisClassFields = {}, thisClassMethods = {}, thisClassInners = {};
      this.getMembers(thisClassFields, thisClassMethods, thisClassInners);

      var oldContext = replaceContext;
      replaceContext = function (subject) {
        var name = subject.name;
        if(name === "this") {
          // returns "$this_N.$self" pointer instead of "this" in cases:
          // "this()", "this.XXX()", "this", but not for "this.XXX"
          return subject.callSign || !subject.member ? selfId + ".$self" : selfId;
        } else if(thisClassFields.hasOwnProperty(name)) {
          return thisClassFields[name].isStatic ? className + "." + name : selfId + "." + name;
        } else if(thisClassInners.hasOwnProperty(name)) {
          return selfId + "." + name;
        } else if(thisClassMethods.hasOwnProperty(name)) {
          return thisClassMethods[name].isStatic ? className + "." + name : selfId + ".$self." + name;
        }
        return oldContext(subject);
      };

      if (this.baseClassName) {
        result += "var $super = { $upcast: " + selfId + " };\n";
        result += "function $superCstr(){" + oldContext({name: this.baseClassName}) +
          ".apply($super,arguments);if(!('$self' in $super)) $p.extendClassChain($super)}\n";
      } else {
        result += "function $superCstr(){$p.extendClassChain("+ selfId +")}\n";
      }

      if (this.base) {
        // base class name can be present, but class is not
        staticDefinitions += "$p.extendStaticMembers(" + className + ", " + this.baseClassName + ");\n";
      }

      var i, l, j, m;

      if (this.functions.length > 0) {
        result += this.functions.join('\n') + '\n';
      }

      sortByWeight(this.innerClasses);
      for (i = 0, l = this.innerClasses.length; i < l; ++i) {
        var innerClass = this.innerClasses[i];
        if (innerClass.isStatic) {
          staticDefinitions += className + "." + innerClass.name + " = " + innerClass + ";\n";
          result += selfId + "." + innerClass.name + " = " + className + "." + innerClass.name + ";\n";
        } else {
          result += selfId + "." + innerClass.name + " = " + innerClass + ";\n";
        }
      }

      for (i = 0, l = this.fields.length; i < l; ++i) {
        var field = this.fields[i];
        if (field.isStatic) {
          staticDefinitions += className + "." + field.definitions.join(";\n" + className + ".") + ";\n";
          for (j = 0, m = field.definitions.length; j < m; ++j) {
            var fieldName = field.definitions[j].name, staticName = className + "." + fieldName;
            result += "$p.defineProperty(" + selfId + ", '" + fieldName + "', {" +
              "get: function(){return " + staticName + "}, " +
              "set: function(val){" + staticName + " = val}});\n";
          }
        } else {
          result += selfId + "." + field.definitions.join(";\n" + selfId + ".") + ";\n";
        }
      }
      var methodOverloads = {};
      for (i = 0, l = this.methods.length; i < l; ++i) {
        var method = this.methods[i];
        var overload = methodOverloads[method.name];
        var methodId = method.name + "$" + method.params.params.length;
        if (overload) {
          ++overload;
          methodId += "_" + overload;
        } else {
          overload = 1;
        }
        method.methodId = methodId;
        methodOverloads[method.name] = overload;
        if (method.isStatic) {
          staticDefinitions += method;
          staticDefinitions += "$p.addMethod(" + className + ", '" + method.name + "', " + methodId + ");\n";
          result += "$p.addMethod(" + selfId + ", '" + method.name + "', " + methodId + ");\n";
        } else {
          result += method;
          result += "$p.addMethod(" + selfId + ", '" + method.name + "', " + methodId + ");\n";
        }
      }
      result += trim(this.misc.tail);

      if (this.cstrs.length > 0) {
        result += this.cstrs.join('\n') + '\n';
      }

      result += "function $constr() {\n";
      var cstrsIfs = [];
      for (i = 0, l = this.cstrs.length; i < l; ++i) {
        var paramsLength = this.cstrs[i].params.params.length;
        cstrsIfs.push("if(arguments.length === " + paramsLength + ") { " +
          "$constr_" + paramsLength + ".apply(" + selfId + ", arguments); }");
      }
      if(cstrsIfs.length > 0) {
        result += cstrsIfs.join(" else ") + " else ";
      }
      // ??? add check if length is 0, otherwise fail
      result += "$superCstr();\n}\n";
      result += "$constr.apply(null, arguments);\n";

      replaceContext = oldContext;
      return "(function() {\n" +
        "function " + className + "() {\n" + result + "}\n" +
        staticDefinitions +
        "return " + className + ";\n" +
        "})()";
    };

    transformClassBody = function(body, name, baseName, impls) {
      var declarations = body.substring(1, body.length - 1);
      declarations = extractClassesAndMethods(declarations);
      declarations = extractConstructors(declarations, name);
      var methods = [], classes = [], cstrs = [], functions = [];
      declarations = declarations.replace(/"([DEGH])(\d+)"/g, function(all, type, index) {
        if(type === 'D') { methods.push(index); }
        else if(type === 'E') { classes.push(index); }
        else if(type === 'H') { functions.push(index); }
        else { cstrs.push(index); }
        return "";
      });
      var fields = declarations.split(/;(?:\s*;)*/g);
      var baseClassName;
      var i;

      if(baseName !== undef) {
        baseClassName = baseName.replace(/^\s*extends\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)\s*$/g, "$1");
      }

      for(i = 0; i < functions.length; ++i) {
        functions[i] = transformFunction(atoms[functions[i]]);
      }
      for(i = 0; i < methods.length; ++i) {
        methods[i] = transformClassMethod(atoms[methods[i]]);
      }
      for(i = 0; i < fields.length - 1; ++i) {
        var field = trimSpaces(fields[i]);
        fields[i] = transformClassField(field.middle);
      }
      var tail = fields.pop();
      for(i = 0; i < cstrs.length; ++i) {
        cstrs[i] = transformConstructor(atoms[cstrs[i]]);
      }
      for(i = 0; i < classes.length; ++i) {
        classes[i] = transformInnerClass(atoms[classes[i]]);
      }

      return new AstClassBody(name, baseClassName, functions, methods, fields, cstrs,
        classes, { tail: tail });
    };

    function AstInterface(name) {
      this.name = name;
    }
    AstInterface.prototype.toString = function() {
      return "function " + this.name + "() {  throw 'This is an interface'; }\n" +
        "$p." + this.name + " = " + this.name + ";";
    };
    function AstClass(name, body) {
      this.name = name;
      this.body = body;
      body.owner = this;
    }
    AstClass.prototype.toString = function() {
      return "var " + this.name + " = " + this.body + ";\n" +
        "$p." + this.name + " = " + this.name + ";";
    };

    function transformGlobalClass(class_) {
      var m = classesRegex.exec(class_); // 1 - attr, 2 - class|int, 3 - name, 4 - extends, 5 - implements, 6 - body
      classesRegex.lastIndex = 0;
      var body = atoms[getAtomIndex(m[6])];
      if(m[2] === "interface") {
        return new AstInterface(m[3]);
      } else {
        var oldClassId = currentClassId, newClassId = generateClassId();
        currentClassId = newClassId;
        var globalClass = new AstClass(m[3], transformClassBody(body, m[3], m[4], m[5]) );
        appendClass(globalClass, newClassId, oldClassId);

        currentClassId = oldClassId;
        return globalClass;
      }
    }

    function AstMethod(name, params, body) {
      this.name = name;
      this.params = params;
      this.body = body;
    }
    AstMethod.prototype.toString = function(){
      var paramNames = appendToLookupTable({}, this.params.getNames());
      var oldContext = replaceContext;
      replaceContext = function (subject) {
        return paramNames.hasOwnProperty(subject.name) ? subject.name : oldContext(subject);
      };
      var result = "function " + this.name + this.params + " " + this.body + "\n" +
        "$p." + this.name + " = " + this.name + ";";
      replaceContext = oldContext;
      return result;
    };

    function transformGlobalMethod(method) {
      var m = methodsRegex.exec(method);
      var result =
      methodsRegex.lastIndex = 0;
      return new AstMethod(m[3], transformParams(atoms[getAtomIndex(m[4])]),
        transformStatementsBlock(atoms[getAtomIndex(m[6])]));
    }

    function preStatementsTransform(statements) {
      var s = statements;
      // turns multiple catch blocks into one, because we have no way to properly get into them anyway.
      s = s.replace(/\b(catch\s*"B\d+"\s*"A\d+")(\s*catch\s*"B\d+"\s*"A\d+")+/g, "$1");
      return s;
    }

    function AstForStatement(argument, misc) {
      this.argument = argument;
      this.misc = misc;
    }
    AstForStatement.prototype.toString = function() {
      return this.misc.prefix + this.argument.toString();
    };
    function AstCatchStatement(argument, misc) {
      this.argument = argument;
      this.misc = misc;
    }
    AstCatchStatement.prototype.toString = function() {
      return this.misc.prefix + this.argument.toString();
    };
    function AstPrefixStatement(name, argument, misc) {
      this.name = name;
      this.argument = argument;
      this.misc = misc;
    }
    AstPrefixStatement.prototype.toString = function() {
      var result = this.misc.prefix;
      if(this.argument !== undef) {
        result += this.argument.toString();
      }
      return result;
    };
    function AstLabel(label) {
      this.label = label;
    }
    AstLabel.prototype.toString = function() {
      return this.label;
    };

    transformStatements = function(statements, transformMethod, transformClass) {
      var nextStatement = new RegExp(/\b(catch|for|if|switch|while|with)\s*"B(\d+)"|\b(do|else|finally|return|throw|try|break|continue)\b|("[ADEH](\d+)")|\b((?:case\s[^:]+|[A-Za-z_$][\w$]*\s*):)|(;)/g);
      var res = [];
      statements = preStatementsTransform(statements);
      var lastIndex = 0, m, space;
      // m contains the matches from the nextStatement regexp, null if there are no matches.
      // nextStatement.exec starts searching at nextStatement.lastIndex.
      while((m = nextStatement.exec(statements)) !== null) {
        if(m[1] !== undef) { // catch, for ...
          var i = statements.lastIndexOf('"B', nextStatement.lastIndex);
          var statementsPrefix = statements.substring(lastIndex, i);
          if(m[1] === "for") {
            res.push(new AstForStatement(transformForExpression(atoms[m[2]]),
              { prefix: statementsPrefix }) );
          } else if(m[1] === "catch") {
            res.push(new AstCatchStatement(transformParams(atoms[m[2]]),
              { prefix: statementsPrefix }) );
          } else {
            res.push(new AstPrefixStatement(m[1], transformExpression(atoms[m[2]]),
              { prefix: statementsPrefix }) );
          }
        } else if(m[3] !== undef) { // do, else, ...
            res.push(new AstPrefixStatement(m[3], undef,
              { prefix: statements.substring(lastIndex, nextStatement.lastIndex) }) );
        } else if(m[4] !== undef) { // block, class and methods
          space = statements.substring(lastIndex, nextStatement.lastIndex - m[4].length);
          if(trim(space).length !== 0) { continue; } // avoiding new type[] {} construct
          res.push(space);
          var kind = m[4].charAt(1), atomIndex = m[5];
          if(kind === 'D') {
            res.push(transformMethod(atoms[atomIndex]));
          } else if(kind === 'E') {
            res.push(transformClass(atoms[atomIndex]));
          } else if(kind === 'H') {
            res.push(transformFunction(atoms[atomIndex]));
          } else {
            res.push(transformStatementsBlock(atoms[atomIndex]));
          }
        } else if(m[6] !== undef) { // label
          space = statements.substring(lastIndex, nextStatement.lastIndex - m[6].length);
          if(trim(space).length !== 0) { continue; } // avoiding ?: construct
          res.push(new AstLabel(statements.substring(lastIndex, nextStatement.lastIndex)) );
        } else { // semicolon
          var statement = trimSpaces(statements.substring(lastIndex, nextStatement.lastIndex - 1));
          res.push(statement.left);
          res.push(transformStatement(statement.middle));
          res.push(statement.right + ";");
        }
        lastIndex = nextStatement.lastIndex;
      }
      var statementsTail = trimSpaces(statements.substring(lastIndex));
      res.push(statementsTail.left);
      if(statementsTail.middle !== "") {
        res.push(transformStatement(statementsTail.middle));
        res.push(";" + statementsTail.right);
      }
      return res;
    };

    function getLocalNames(statements) {
      var localNames = [];
      for(var i=0,l=statements.length;i<l;++i) {
        var statement = statements[i];
        if(statement instanceof AstVar) {
          localNames = localNames.concat(statement.getNames());
        } else if(statement instanceof AstForStatement &&
          statement.argument.initStatement instanceof AstVar) {
          localNames = localNames.concat(statement.argument.initStatement.getNames());
        } else if(statement instanceof AstInnerInterface || statement instanceof AstInnerClass ||
          statement instanceof AstInterface || statement instanceof AstClass ||
          statement instanceof AstMethod || statement instanceof AstFunction) {
          localNames.push(statement.name);
        }
      }
      return appendToLookupTable({}, localNames);
    }

    function AstStatementsBlock(statements) {
      this.statements = statements;
    }
    AstStatementsBlock.prototype.toString = function() {
      var localNames = getLocalNames(this.statements);
      var oldContext = replaceContext;

      // replacing context only when necessary
      if(!isLookupTableEmpty(localNames)) {
        replaceContext = function (subject) {
          return localNames.hasOwnProperty(subject.name) ? subject.name : oldContext(subject);
        };
      }

      var result = "{\n" + this.statements.join('') + "\n}";
      replaceContext = oldContext;
      return result;
    };

    transformStatementsBlock = function(block) {
      var content = trimSpaces(block.substring(1, block.length - 1));
      return new AstStatementsBlock(transformStatements(content.middle));
    };

    function AstRoot(statements) {
      this.statements = statements;
    }
    AstRoot.prototype.toString = function() {
      var classes = [], otherStatements = [];
      for (var i = 0, len = this.statements.length; i < len; ++i) {
        if (this.statements[i] instanceof AstClass) {
          classes.push(this.statements[i]);
        } else {
          otherStatements.push(this.statements[i]);
        }
      }
      sortByWeight(classes);

      var localNames = getLocalNames(this.statements);
      replaceContext = function (subject) {
        var name = subject.name;
        if(localNames.hasOwnProperty(name)) {
          return name;
        } else if(globalMembers.hasOwnProperty(name) ||
                  PConstants.hasOwnProperty(name) ||
                  defaultScope.hasOwnProperty(name)) {
          return "$p." + name;
        }
        return name;
      };
      var result = "// this code was autogenerated from PJS\n" +
        "(function($p) {\n" +
        classes.join('') + "\n" +
        otherStatements.join('') + "\n})";
      replaceContext = null;
      return result;
    };

    transformMain = function() {
      var statements = extractClassesAndMethods(atoms[0]);
      statements = statements.replace(/\bimport\s+[^;]+;/g, "");
      return new AstRoot( transformStatements(statements,
        transformGlobalMethod, transformGlobalClass) );
    };

    function generateMetadata(ast) {
      var globalScope = {};
      var id, class_;
      for(id in declaredClasses) {
        if(declaredClasses.hasOwnProperty(id)) {
          class_ = declaredClasses[id];
          var scopeId = class_.scopeId, name = class_.name;
          if(scopeId) {
            var scope = declaredClasses[scopeId];
            class_.scope = scope;
            if(scope.inScope === undef) {
              scope.inScope = {};
            }
            scope.inScope[name] = class_;
          } else {
            globalScope[name] = class_;
          }
        }
      }

      function findInScopes(class_, name) {
        var parts = name.split('.');
        var currentScope = class_.scope, found;
        while(currentScope) {
          if(currentScope.hasOwnProperty(parts[0])) {
            found = currentScope[parts[0]]; break;
          }
          currentScope = currentScope.scope;
        }
        if(found === undef) {
          found = globalScope[parts[0]];
        }
        for(var i=1,l=parts.length;i<l && found;++i) {
          found = found.inScope[parts[i]];
        }
        return found;
      }

      for(id in declaredClasses) {
        if(declaredClasses.hasOwnProperty(id)) {
          class_ = declaredClasses[id];
          var baseClassName = class_.body.baseClassName;
          if(baseClassName) {
            var parent = findInScopes(class_, baseClassName);
            if (parent) {
              class_.base = parent;
              if (!parent.derived) {
                parent.derived = [];
              }
              parent.derived.push(class_);
            }
          }
        }
      }
    }

    function setWeight(ast) {
      var queue = [], checked = {};
      var id, class_;
      // queue most inner and non-inherited
      for (id in declaredClasses) {
        if (declaredClasses.hasOwnProperty(id)) {
          class_ = declaredClasses[id];
          if (!class_.inScope && !class_.derived) {
            queue.push(id);
            checked[id] = true;
            class_.weight = 0;
          }
        }
      }
      while (queue.length > 0) {
        id = queue.shift();
        class_ = declaredClasses[id];
        if (class_.scopeId && !checked[class_.scopeId]) {
          queue.push(class_.scopeId);
          checked[class_.scopeId] = true;
          declaredClasses[class_.scopeId].weight = class_.weight + 1;
        }
        if (class_.base && !checked[class_.base.classId]) {
          queue.push(class_.base.classId);
          checked[class_.base.classId] = true;
          class_.base.weight = class_.weight + 1;
        }
      }
    }

    var transformed = transformMain();
    generateMetadata(transformed);
    setWeight(transformed);

    var redendered = transformed.toString();

    // remove empty extra lines with space
    redendered = redendered.replace(/\s*\n(?:[\t ]*\n)+/g, "\n\n");

    return injectStrings(redendered, strings);
  }// Parser ends

  function preprocessCode(aCode, sketch) {
    // Parse out @pjs directive, if any.
    var dm = new RegExp(/\/\*\s*@pjs\s+((?:[^\*]|\*+[^\*\/])*)\*\//g).exec(aCode);
    if (dm && dm.length === 2) {
      // masks contents of a JSON to be replaced later
      // to protect the contents from further parsing
      var jsonItems = [],
          directives = dm.splice(1, 2)[0].replace(/\{([\s\S]*?)\}/g, (function() {
            return function(all, item) {
              jsonItems.push(item);
              return "{" + (jsonItems.length-1) + "}";
            };
          }())).replace('\n', '').replace('\r', '').split(";");

      // We'll L/RTrim, and also remove any surrounding double quotes (e.g., just take string contents)
      var clean = function(s) {
        return s.replace(/^\s*["']?/, '').replace(/["']?\s*$/, '');
      };

      for (var i = 0, dl = directives.length; i < dl; i++) {
        var pair = directives[i].split('=');
        if (pair && pair.length === 2) {
          var key = clean(pair[0]),
              value = clean(pair[1]),
              list = [];
          // A few directives require work beyond storying key/value pairings
          if (key === "preload") {
            list = value.split(',');
            // All pre-loaded images will get put in imageCache, keyed on filename
            for (var j = 0, jl = list.length; j < jl; j++) {
              var imageName = clean(list[j]);
              sketch.imageCache.add(imageName);
            }
          } else if (key === "transparent") {
            sketch.options.isTransparent = value === "true";
          // fonts can be declared as a string containing a url,
          // or a JSON object, containing a font name, and a url
          } else if (key === "font") {
            list = value.split(",");
            for (var x = 0, xl = list.length; x < xl; x++) {
              var fontName = clean(list[x]),
                  index = /^\{(\d*?)\}$/.exec(fontName);
              // if index is not null, send JSON, otherwise, send string
              sketch.fonts.add(index ? JSON.parse("{" + jsonItems[index[1]] + "}") : fontName);
            }
          } else if (key === "crisp") {
            sketch.options.crispLines = value === "true";
          } else if (key === "pauseOnBlur") {
            sketch.options.pauseOnBlur = value === "true";
          } else if (key === "globalKeyEvents") {
            sketch.options.globalKeyEvents = value === "true";
          } else {
            sketch.options[key] = value;
          }
        }
      }
    }

    // Check if 3D context is invoked -- this is not the best way to do this.
    // Following regex replaces strings, comments and regexs with an empty string
    var codeWoStrings = aCode.replace(/("(?:[^"\\\n]|\\.)*")|('(?:[^'\\\n]|\\.)*')|(([\[\(=|&!\^:?]\s*)(\/(?![*\/])(?:[^\/\\\n]|\\.)*\/[gim]*)\b)|(\/\/[^\n]*\n)|(\/\*(?:(?!\*\/)(?:.|\n))*\*\/)/g, "");
    if (codeWoStrings.match(/\bsize\((?:.+),(?:.+),\s*(OPENGL|P3D)\s*\);/)) {
      sketch.use3DContext = true;
    }
    return aCode;
  }

  // Parse/compiles Processing (Java-like) syntax to JavaScript syntax
  Processing.compile = function(pdeCode) {
    var sketch = new Processing.Sketch();
    var code = preprocessCode(pdeCode, sketch);
    var compiledPde = parseProcessing(code);
    sketch.sourceCode = compiledPde;
    return sketch;
  };
//#endif

  // tinylog lite JavaScript library
  // http://purl.eligrey.com/tinylog/lite
  /*global tinylog,print*/
  var tinylogLite = (function() {
    "use strict";

    var tinylogLite = {},
      undef = "undefined",
      func = "function",
      False = !1,
      True = !0,
      logLimit = 512,
      log = "log";

    if (typeof tinylog !== undef && typeof tinylog[log] === func) {
      // pre-existing tinylog present
      tinylogLite[log] = tinylog[log];
    } else if (typeof document !== undef && !document.fake) {
      (function() {
        // DOM document
        var doc = document,

        $div = "div",
        $style = "style",
        $title = "title",

        containerStyles = {
          zIndex: 10000,
          position: "fixed",
          bottom: "0px",
          width: "100%",
          height: "15%",
          fontFamily: "sans-serif",
          color: "#ccc",
          backgroundColor: "black"
        },
        outputStyles = {
          position: "relative",
          fontFamily: "monospace",
          overflow: "auto",
          height: "100%",
          paddingTop: "5px"
        },
        resizerStyles = {
          height: "5px",
          marginTop: "-5px",
          cursor: "n-resize",
          backgroundColor: "darkgrey"
        },
        closeButtonStyles = {
          position: "absolute",
          top: "5px",
          right: "20px",
          color: "#111",
          MozBorderRadius: "4px",
          webkitBorderRadius: "4px",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "normal",
          textAlign: "center",
          padding: "3px 5px",
          backgroundColor: "#333",
          fontSize: "12px"
        },
        entryStyles = {
          //borderBottom: "1px solid #d3d3d3",
          minHeight: "16px"
        },
        entryTextStyles = {
          fontSize: "12px",
          margin: "0 8px 0 8px",
          maxWidth: "100%",
          whiteSpace: "pre-wrap",
          overflow: "auto"
        },

        view = doc.defaultView,
          docElem = doc.documentElement,
          docElemStyle = docElem[$style],

        setStyles = function() {
          var i = arguments.length,
            elemStyle, styles, style;

          while (i--) {
            styles = arguments[i--];
            elemStyle = arguments[i][$style];

            for (style in styles) {
              if (styles.hasOwnProperty(style)) {
                elemStyle[style] = styles[style];
              }
            }
          }
        },

        observer = function(obj, event, handler) {
          if (obj.addEventListener) {
            obj.addEventListener(event, handler, False);
          } else if (obj.attachEvent) {
            obj.attachEvent("on" + event, handler);
          }
          return [obj, event, handler];
        },
        unobserve = function(obj, event, handler) {
          if (obj.removeEventListener) {
            obj.removeEventListener(event, handler, False);
          } else if (obj.detachEvent) {
            obj.detachEvent("on" + event, handler);
          }
        },
        clearChildren = function(node) {
          var children = node.childNodes,
            child = children.length;

          while (child--) {
            node.removeChild(children.item(0));
          }
        },
        append = function(to, elem) {
          return to.appendChild(elem);
        },
        createElement = function(localName) {
          return doc.createElement(localName);
        },
        createTextNode = function(text) {
          return doc.createTextNode(text);
        },

        createLog = tinylogLite[log] = function(message) {
          // don't show output log until called once
          var uninit,
            originalPadding = docElemStyle.paddingBottom,
            container = createElement($div),
            containerStyle = container[$style],
            resizer = append(container, createElement($div)),
            output = append(container, createElement($div)),
            closeButton = append(container, createElement($div)),
            resizingLog = False,
            previousHeight = False,
            previousScrollTop = False,
            messages = 0,

            updateSafetyMargin = function() {
              // have a blank space large enough to fit the output box at the page bottom
              docElemStyle.paddingBottom = container.clientHeight + "px";
            },
            setContainerHeight = function(height) {
              var viewHeight = view.innerHeight,
                resizerHeight = resizer.clientHeight;

              // constrain the container inside the viewport's dimensions
              if (height < 0) {
                height = 0;
              } else if (height + resizerHeight > viewHeight) {
                height = viewHeight - resizerHeight;
              }

              containerStyle.height = height / viewHeight * 100 + "%";

              updateSafetyMargin();
            },
            observers = [
              observer(doc, "mousemove", function(evt) {
                if (resizingLog) {
                  setContainerHeight(view.innerHeight - evt.clientY);
                  output.scrollTop = previousScrollTop;
                }
              }),

              observer(doc, "mouseup", function() {
                if (resizingLog) {
                  resizingLog = previousScrollTop = False;
                }
              }),

              observer(resizer, "dblclick", function(evt) {
                evt.preventDefault();

                if (previousHeight) {
                  setContainerHeight(previousHeight);
                  previousHeight = False;
                } else {
                  previousHeight = container.clientHeight;
                  containerStyle.height = "0px";
                }
              }),

              observer(resizer, "mousedown", function(evt) {
                evt.preventDefault();
                resizingLog = True;
                previousScrollTop = output.scrollTop;
              }),

              observer(resizer, "contextmenu", function() {
                resizingLog = False;
              }),

              observer(closeButton, "click", function() {
                uninit();
              })
            ];

          uninit = function() {
            // remove observers
            var i = observers.length;

            while (i--) {
              unobserve.apply(tinylogLite, observers[i]);
            }

            // remove tinylog lite from the DOM
            docElem.removeChild(container);
            docElemStyle.paddingBottom = originalPadding;

            clearChildren(output);
            clearChildren(container);

            tinylogLite[log] = createLog;
          };

          setStyles(
          container, containerStyles, output, outputStyles, resizer, resizerStyles, closeButton, closeButtonStyles);

          closeButton[$title] = "Close Log";
          append(closeButton, createTextNode("\u2716"));

          resizer[$title] = "Double-click to toggle log minimization";

          docElem.insertBefore(container, docElem.firstChild);

          tinylogLite[log] = function(message) {
            if (messages === logLimit) {
              output.removeChild(output.firstChild);
            } else {
              messages++;
            }

            var entry = append(output, createElement($div)),
              entryText = append(entry, createElement($div));

            entry[$title] = (new Date()).toLocaleTimeString();

            setStyles(
            entry, entryStyles, entryText, entryTextStyles);

            append(entryText, createTextNode(message));
            output.scrollTop = output.scrollHeight;
          };

          tinylogLite[log](message);
        };
      }());
    } else if (typeof print === func) { // JS shell
      tinylogLite[log] = print;
    }

    return tinylogLite;
  }());
  // end of tinylog lite JavaScript library

  Processing.logger = tinylogLite;

  Processing.version = "@VERSION@";

  // Share lib space
  Processing.lib = {};

  Processing.registerLibrary = function(name, desc) {
    Processing.lib[name] = desc;

    if(desc.hasOwnProperty("init")) {
      desc.init(defaultScope);
    }
  };

  // Store Processing instances. Only Processing.instances,
  // Processing.getInstanceById are exposed.
  Processing.instances = [];
  var processingInstanceIds = {};

  var removeInstance = function(id) {
    Processing.instances.splice(processingInstanceIds[id], 1);
    delete processingInstanceIds[id];
  };

  var addInstance = function(processing) {
    if (processing.externals.canvas.id === undef || !processing.externals.canvas.id.length) {
      processing.externals.canvas.id = "__processing" + Processing.instances.length;
    }
    processingInstanceIds[processing.externals.canvas.id] = Processing.instances.length;
    Processing.instances.push(processing);
  };

  Processing.getInstanceById = function(name) {
    return Processing.instances[processingInstanceIds[name]];
  };

  Processing.Sketch = function(attachFunction) {
    this.attachFunction = attachFunction; // can be optional
    this.use3DContext = false;
    this.options = {
      isTransparent: false,
      crispLines: false,
      pauseOnBlur: false,
      globalKeyEvents: false
    };
    this.imageCache = {
      pending: 0,
      images: {},
      add: function(href) {
        if(isDOMPresent) {
          var img = new Image();
          img.onload = (function(owner) {
            return function() {
              owner.pending--;
            };
          }(this));
          this.pending++;
          this.images[href] = img;
          img.src = href;
        } else {
          this.images[href] = null;
        }
      }
    };
    this.fonts = {
      // template element used to compare font sizes
      template: (function() {
        if(!isDOMPresent) {
          return null;
        }
        var element = document.createElement('p');
        element.style.fontFamily = "serif";
        element.style.fontSize = "72px";
        element.style.visibility = "hidden";
        element.innerHTML = "abcmmmmmmmmmmlll";
        document.getElementsByTagName("body")[0].appendChild(element);
        return element;
      }()),
      // number of attempts to load a font
      attempt: 0,
      // returns true is fonts are all loaded,
      // true if number of attempts hits the limit,
      // false otherwise
      pending: function() {
        var r = true;
        for (var i = 0; i < this.fontList.length; i++) {
          // compares size of text in pixels, if equal, custom font is not yet loaded
          if (this.fontList[i].offsetWidth === this.template.offsetWidth && this.fontList[i].offsetHeight === this.template.offsetHeight) {
            r = false;
            this.attempt++;
          } else {
            // removes loaded font from the array and dom, so we don't compare it again
            document.getElementsByTagName("body")[0].removeChild(this.fontList[i]);
            this.fontList.splice(i--, 1);
            this.attempt = 0;
          }
        }
        // give up loading after max attempts have been reached
        if (this.attempt >= 30) {
          r = true;
          // remove remaining elements from the dom and array
          for (var j = 0; j < this.fontList.length; j++) {
            document.getElementsByTagName("body")[0].removeChild(this.fontList[j]);
            this.fontList.splice(j--, 1);
          }
        }
        // Remove the template element from the dom once done comparing
        if (r) {
          document.getElementsByTagName("body")[0].removeChild(this.template);
        }
        return r;
      },
      // fontList contains elements to compare font sizes against a template
      fontList: [],
      // string containing a css @font-face list of custom fonts
      fontFamily: "",
      // style element to hold the @font-face string
      style: (isDOMPresent ? document.createElement('style') : null),
      // adds a font to the font cache
      // creates an element using the font, to start loading the font,
      // and compare against a default font to see if the custom font is loaded
      add: function(fontSrc) {
        // fontSrc can be a string or a JSON object
        // string contains a url to a font
        // JSON object would contain a name and a url
        // acceptable fonts are .ttf, .otf, and a data uri
        var fontName = (typeof fontSrc === 'object' ? fontSrc.fontFace : fontSrc),
            fontUrl = (typeof fontSrc === 'object' ? fontSrc.url : fontSrc);
        // creating the @font-face style
        this.fontFamily += "@font-face{\n  font-family: '" + fontName + "';\n  src:  url('" + fontUrl + "');\n}\n";
        this.style.innerHTML = this.fontFamily;
        document.getElementsByTagName("head")[0].appendChild(this.style);
        // creating the element to load, and compare the new font
        var preLoader = document.createElement('p');
        preLoader.style.fontFamily = "'" + fontName + "', serif";
        preLoader.style.fontSize = "72px";
        preLoader.style.visibility = "hidden";
        preLoader.innerHTML = "abcmmmmmmmmmmlll";
        document.getElementsByTagName("body")[0].appendChild(preLoader);
        this.fontList.push(preLoader);
      }
    };
    this.sourceCode = undefined;
    this.attach = function(processing) {
      // either attachFunction or sourceCode must be present on attach
      if(typeof this.attachFunction === "function") {
        this.attachFunction(processing);
      } else if(this.sourceCode) {
        var func = eval(this.sourceCode);
        func(processing);
        this.attachFunction = func;
      } else {
        throw "Unable to attach sketch to the processing instance";
      }
    };
//#if PARSER
    this.toString = function() {
      var i;
      var code = "((function(Sketch) {\n";
      code += "var sketch = new Sketch(\n" + this.sourceCode + ");\n";
      code += "sketch.use3DContext = " + this.use3DContext + ";\n";
      for(i in this.options) {
        if(this.options.hasOwnProperty(i)) {
          var value = this.options[i];
          code += "sketch.options." + i + " = " +
            (typeof value === 'string' ? '\"' + value + '\"' : "" + value) + ";\n";
        }
      }
      for(i in this.imageCache) {
        if(this.options.hasOwnProperty(i)) {
          code += "sketch.imageCache.add(\"" + i + "\");\n";
        }
      }
      // TODO serialize fonts
      code += "return sketch;\n})(Processing.Sketch))";
      return code;
    };
//#endif
  };

  // Automatic Initialization Method
  var init = function() {
    function loadAndExecute(canvas, sources) {
      var code = [], errors = [], sourcesCount = sources.length, loaded = 0;

      function ajaxAsync(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            var error;
            if (xhr.status !== 200 && xhr.status !== 0) {
              error = "Invalid XHR status " + xhr.status;
            } else if (xhr.responseText === "") {
              error = "No content";
            }
            callback(xhr.responseText, error);
          }
        };
        xhr.open("GET", url, true);
        if (xhr.overrideMimeType) {
          xhr.overrideMimeType("application/json");
        }
        xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 1960 00:00:00 GMT"); // no cache
        xhr.send(null);
      }

      function loadBlock(index, filename) {
        ajaxAsync(filename, function (block, error) {
          code[index] = block;
          ++loaded;
          if (error) {
            errors.push("  " + filename + " ==> " + error);
          }
          if (loaded === sourcesCount) {
            if (errors.length === 0) {
              try {
                return new Processing(canvas, code.join("\n"));
              } catch(e) {
                Processing.logger.log("Unable to execute pjs sketch: " + e);
              }
            } else {
              Processing.logger.log("Unable to load pjs sketch files:\n" + errors.join("\n"));
            }
          }
        });
      }

      for (var i = 0; i < sourcesCount; ++i) {
        loadBlock(i, sources[i]);
      }
    }

    var canvas = document.getElementsByTagName('canvas');

    for (var i = 0, l = canvas.length; i < l; i++) {
      // datasrc and data-src are deprecated.
      var processingSources = canvas[i].getAttribute('data-processing-sources');
      if (processingSources === null) {
        // Temporary fallback for datasrc and data-src
        processingSources = canvas[i].getAttribute('data-src');
        if (processingSources === null) {
          processingSources = canvas[i].getAttribute('datasrc');
        }
      }
      if (processingSources) {
        var filenames = processingSources.split(' ');
        for (var j = 0; j < filenames.length;) {
          if (filenames[j]) {
            j++;
          } else {
            filenames.splice(j, 1);
          }
        }

        loadAndExecute(canvas[i], filenames);
      }
    }
  };

  if(isDOMPresent) {
    window['Processing'] = Processing;

    document.addEventListener('DOMContentLoaded', function() {
      init();
    }, false);
  } else {
    // DOM is not found
    this.Processing = Processing;
  }
}());
