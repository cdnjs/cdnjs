/**
  * Klass.js - copyright @dedfat
  * version 1.0
  * https://github.com/ded/klass
  * Follow our software http://twitter.com/dedfat :)
  * MIT License
  */
!function (context, f) {
  var fnTest = /xyz/.test(function () {
    xyz;
    }) ? /\bsupr\b/ : /.*/,
      noop = function (){},
      proto = 'prototype',
      isFn = function (o) {
        return typeof o === f;
      };

  function klass(o) {
    return extend.call(isFn(o) ? o : noop, o, 1);
  }

  function wrap(k, fn, supr) {
    return function () {
      var tmp = this.supr;
      this.supr = supr[proto][k];
      var ret = fn.apply(this, arguments);
      this.supr = tmp;
      return ret;
    };
  }

  function process(what, o, supr) {
    for (var k in o) {
      if (o.hasOwnProperty(k)) {
        what[k] = isFn(o[k])
          && isFn(supr[proto][k])
          && fnTest.test(o[k])
          ? wrap(k, o[k], supr) : o[k];
      }
    }
  }

  function extend(o, fromSub) {
    // must redefine noop each time so it doesn't inherit from previous arbitrary classes
    function noop() {}
    noop[proto] = this[proto];
    var supr = this,
        prototype = new noop(),
        isFunction = isFn(o),
        _constructor = isFunction ? o : this,
        _methods = isFunction ? {} : o,
        fn = function () {
          if (this.initialize) {
            this.initialize.apply(this, arguments);
          } else {
            fromSub || isFunction && supr.apply(this, arguments);
            _constructor.apply(this, arguments);
          }
        };

    fn.methods = function (o) {
      process(prototype, o, supr);
      fn[proto] = prototype;
      return this;
    };

    fn.methods.call(fn, _methods).prototype.constructor = fn;

    fn.extend = arguments.callee;
    fn[proto].implement = fn.statics = function (o, optFn) {
      o = typeof o == 'string' ? (function () {
        var obj = {};
        obj[o] = optFn;
        return obj;
      }()) : o;
      process(this, o, supr);
      return this;
    };

    return fn;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = klass;
  } else {
    var old = context.klass;
    klass.noConflict = function () {
      context.klass = old;
      return this;
    };
    context.klass = klass;
  }

}(this, 'function');