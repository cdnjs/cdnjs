({define: (typeof define === 'function')
    ? define  // RequireJS
    : function(definition) {definition();} // CommonJS and <script>
}).define(function() {
  'use strict';

  var globall = (typeof global === 'undefined') ? window : global;
  var global_isNaN = globall.isNaN;
  var global_isFinite = globall.isFinite;

  var defineProperty = function(object, name, method) {
    if (!object[name]) {
      Object.defineProperty(object, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: method
      });
    }
  };

  var defineProperties = function(object, map) {
    Object.keys(map).forEach(function(name) {
      defineProperty(object, name, map[name]);
    });
  };

  defineProperties(String.prototype, {
    repeat: function(times) {
      return new Array(times + 1).join(this);
    },

    startsWith: function(substring) {
      return this.indexOf(substring) === 0;
    },

    endsWith: function(s) {
      var t = String(s);
      var index = this.lastIndexOf(t)
      return index >= 0 && index === this.length - t.length;
    },

    contains: function(s) {
      return this.indexOf(s) !== -1;
    },

    toArray: function() {
      return this.split('');
    }
  });

  defineProperties(Array, {
    from: function(iterable) {
      var object = Object(iterable);
      var array = [];

      for (var key = 0, length = object.length >>> 0; key < length; key++) {
        if (key in object) {
          array[key] = object[key];
        }
      }

      return array;
    },

    of: function() {
      return Array.prototype.slice.call(arguments);
    }
  });

  defineProperties(Number, {
    isInteger: function(value) {
      return typeof value === 'number' && global_isFinite(value) && 
        value > -9007199254740992 && value < 9007199254740992 &&
        Math.floor(value) === value;
    },

    isNaN: function(value) {
      return typeof value === 'number' && global_isNaN(value);
    },

    toInteger: function(value) {
      var n = +value;
      if (isNaN(n)) return +0;
      if (n === 0 || !global_isFinite(n)) return n;
      return Math.sign(n) * Math.floor(Math.abs(n));
    }
  });

  defineProperties(Object, {
    getOwnPropertyDescriptors: function(subject) {
      var descs = {};
      Object.getOwnPropertyNames(subject).forEach(function(propName) {
        descs[propName] = Object.getOwnPropertyDescriptor(subject, propName);
      });
      return descs;
    },

    getPropertyDescriptor: function(subject, name) {
      var pd = Object.getOwnPropertyDescriptor(subject, name);
      var proto = Object.getPrototypeOf(subject);
      while (pd === undefined && proto !== null) {
        pd = Object.getOwnPropertyDescriptor(proto, name);
        proto = Object.getPrototypeOf(proto);
      }
      return pd;
    },

    getPropertyNames: function(subject, name) {
      var result = Object.getOwnPropertyNames(subject);
      var proto = Object.getPrototypeOf(subject);
      var property;
      while (proto !== null) {
        Object.getOwnPropertyNames(proto).forEach(function(property) {
          if (result.indexOf(property) === -1) {
            result.push(property);
          }
        });
        proto = Object.getPrototypeOf(proto);
      }
      return result;
    },

    is: function(x, y) {
      if (x === y) {
        // 0 === -0, but they are not identical
        return x !== 0 || 1 / x === 1 / y;
      }

      // NaN !== NaN, but they are identical.
      // NaNs are the only non-reflexive value, i.e., if x !== x,
      // then x is a NaN.
      // isNaN is broken: it converts its argument to number, so
      // isNaN("foo") => true
      return x !== x && y !== y;
    }
  });
  
  defineProperties(Math, {
    sign: function(value) {
      var number = +value;
      if (global_isNaN(number) || number === 0) return number;
      return (number < 0) ? -1 : 1;
    }
  });

  defineProperties(globall, {
    Map: (function() {
      var indexOfIdentical = function(keys, key) {
        for (var i = 0, length = keys.length; i < length; i++) {
          if (Object.is(keys[i], key)) return i;
        }
        return -1;
      };

      function Map() {
        if (!(this instanceof Map)) return new Map;
        defineProperty(this, 'keys', []);
        defineProperty(this, 'values', []);
      }

      defineProperties(Map.prototype, {
        get: function(key) {
          var index = indexOfIdentical(this.keys, key);
          return index < 0 ? undefined : this.values[index];
        },

        has: function(key) {
          return indexOfIdentical(this.keys, key) >= 0;
        },

        set: function(key, value) {
          var keys = this.keys;
          var values = this.values;
          var index = indexOfIdentical(keys, key);
          if (index < 0) index = keys.length;
          keys[index] = key;
          values[index] = value;
        },

        'delete': function(key) {
          var keys = this.keys;
          var values = this.values;
          var index = indexOfIdentical(keys, key);
          if (index < 0) return false;
          keys.splice(index, 1);
          values.splice(index, 1);
          return true;
        }
      });
      return Map;
    })(),

    Set: (function() {
      function Set() {
        if (!(this instanceof Set)) return new Set;
        defineProperty(this, 'map', Map());
      }

      defineProperties(Set.prototype, {
        has: function(key) {
          return this.map.has(key);
        },

        add: function(key) {
          this.map.set(key, true);
        },

        'delete': function(key) {
          return this.map.delete(key);
        }
      });

      return Set;
    })()
  });
  
  /*defineProperties(globall.Set, {
    of: function(iterable) {
      var object = Object(iterable);
      var set = Set();

      for (var key = 0, length = object.length >>> 0; key < length; key++) {
        if (key in object && !(set.has(key))) {
          set.add(object[key]);
        }
      }

      return set;
    }
  });*/
});
