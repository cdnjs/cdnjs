/**
  * Klass.js - copyright @ded & @fat
  * https://github.com/polvero/klass
  * MIT License
  */
!function (context) {

  function noop() {}

  function methods(o) {
    for (var k in o) {
      o.hasOwnProperty(k) && wrapper.call(this, o, k);
    }
    return this;
  }

  function statics(o) {
    for (var k in o) {
      o.hasOwnProperty(k) && (this[k] = o[k]);
    }
    return this;
  }

  function wrapper (o, k) {
    var sup = this.prototype.constructor.sup;
    this.prototype[k] = function () {
      this._name = k;
      this.sup = sup;
      return o[k].apply(this, arguments);
    };
  }

  function klass(fn) {
    var o = typeof fn != 'function' && fn;
    fn = (typeof fn == 'function') ? fn : noop;

    fn.methods = methods;
    fn.statics = statics;
    fn.extend = extend;
    fn.prototype.implement = implement;
    return o ? fn.methods(o) : fn;
  }

  function extend(sub) {
    var sup = this;

    function fn() {
      sup.apply(this, arguments);
      typeof sub == 'function' && sub.apply(this, arguments);
    }

    var F = function (){};
    F.prototype = sup.prototype;
    fn.prototype = new F();
    klass(fn);


    fn.prototype.constructor = fn;
    fn.prototype.constructor.sup = sup;
    fn.prototype.supr = function () {
      if (this.sup.prototype[this._name]) {
        return this.sup.prototype[this._name].apply(this, arguments);
      }
    };

    return (typeof sub != 'function' && sub && fn.methods(sub)) || fn;
  }

  function implement(o) {
    this.constructor.methods(o);
    return this;
  }


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = klass;
  } else {
    context.klass = klass;
  }

}(this);