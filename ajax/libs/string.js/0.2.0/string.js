(function() {
  var S, clobberPrototype, methodsAdded, restorePrototype, wrap;

  S = (function() {

    function S(s) {
      this.s = s;
      if (this.s == null) this.s = this;
    }

    S.prototype.camelize = function() {
      var s;
      s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function(match, sep, c) {
        return (c ? c.toUpperCase() : '');
      });
      return new S(s);
    };

    S.prototype.capitalize = function() {
      return new S(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());
    };

    S.prototype.collapseWhitespace = function() {
      var s;
      s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
      return new S(s);
    };

    S.prototype.contains = function(ss) {
      return this.s.indexOf(ss) >= 0;
    };

    S.prototype.dasherize = function() {
      var s;
      s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
      return new S(s);
    };

    S.prototype.endsWith = function(suffix) {
      var l;
      l = this.s.length - suffix.length;
      return l >= 0 && this.s.indexOf(suffix, l) === l;
    };

    S.prototype.isAlpha = function() {
      return !/[^a-zA-Z]/.test(this.s);
    };

    S.prototype.isAlphaNumeric = function() {
      return !/[^a-zA-Z0-9]/.test(this.s);
    };

    S.prototype.isEmpty = function() {
      return /^[\s\xa0]*$/.test(this.s);
    };

    S.prototype.isLower = function() {
      return !/[^a-z]/.test(this.s);
    };

    S.prototype.isNumeric = function() {
      return !/[^0-9]/.test(this.s);
    };

    S.prototype.isUpper = function() {
      return !/[^A-Z]/.test(this.s);
    };

    S.prototype.left = function(N) {
      var s;
      if (N >= 2) {
        s = this.s.substr(0, N);
        return new S(s);
      } else {
        return this.right(-N);
      }
    };

    S.prototype.ltrim = function() {
      var s;
      s = this.s.replace(/(^\s*)/g, '');
      return new S(s);
    };

    S.prototype.replaceAll = function(ss, r) {
      var s;
      s = this.s.replace(new RegExp(ss, 'g'), r);
      return new S(s);
    };

    S.prototype.right = function(N) {
      var s;
      if (N >= 0) {
        s = this.s.substr(this.s.length - N, N);
        return new S(s);
      } else {
        return this.left(-N);
      }
    };

    S.prototype.rtrim = function() {
      var s;
      s = this.s.replace(/\s+$/, '');
      return new S(s);
    };

    S.prototype.startsWith = function(prefix) {
      return this.s.lastIndexOf(prefix, 0) === 0;
    };

    S.prototype.times = function(n) {
      return new S(new Array(n + 1).join(this.s));
    };

    S.prototype.trim = function() {
      var s;
      if (typeof String.prototype.trim === 'undefined') {
        s = this.s.replace(/(^\s*|\s*$)/g, '');
      } else {
        s = this.s.trim();
      }
      return new S(s);
    };

    S.prototype.toString = function() {
      return this.s;
    };

    S.prototype.underscore = function() {
      var s;
      s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
      if ((new S(this.s.charAt(0))).isUpper()) s = '_' + s;
      return new S(s);
    };

    S.prototype.repeat = S.prototype.times;

    S.prototype.include = S.prototype.contains;

    return S;

  })();

  wrap = function(str) {
    return new S(str);
  };

  methodsAdded = [];

  clobberPrototype = function() {
    var func, name, newS, _results;
    newS = new S();
    _results = [];
    for (name in newS) {
      func = newS[name];
      if (!String.prototype.hasOwnProperty(name)) {
        methodsAdded.push(name);
        _results.push(String.prototype[name] = function() {
          String.prototype.s = this;
          return func.apply(this, arguments);
        });
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  restorePrototype = function() {
    var name, _i, _len;
    for (_i = 0, _len = methodsAdded.length; _i < _len; _i++) {
      name = methodsAdded[_i];
      delete String.prototype[name];
    }
    return methodsAdded.length = 0;
  };

  if (typeof window !== "undefined" && window !== null) {
    window.S = wrap;
    window.S.clobberPrototype = clobberPrototype;
    window.S.restorePrototype = restorePrototype;
  } else {
    module.exports = wrap;
    module.exports.clobberPrototype = clobberPrototype;
    module.exports.restorePrototype = restorePrototype;
  }

}).call(this);
