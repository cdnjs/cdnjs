/*
 * JSFace Object Oriented Programming Library - Plug and Play pointcut plugin
 * https://github.com/tnhu/jsface
 *
 * Copyright (c) Tan Nhu
 * Licensed under MIT license (https://github.com/tnhu/jsface/blob/master/LICENSE.txt).
 */
(function(context) {
  var jsface        = context.jsface || require("./jsface"),
      Class         = jsface.Class,
      classOrNil    = jsface.classOrNil,
      functionOrNil = jsface.functionOrNil,
      extend        = jsface.extend,
      mapOrNil      = jsface.mapOrNil,
      WRAPPER       = "___wrapper___",
      BEFORE        = "___before_fns___",
      AFTER         = "___after_fns___",
      ORIGIN        = "___origin_fn___",
      ADVISOR       = "___advisors___",
      noop          = function(){};

  /**
   * Wrap a function with before & after.
   */
  function wrap(fn, before, after, advisor) {
    var ignoredKeys = { prototype: 1 };

    function wrapper() {
      var _before = wrapper[BEFORE],
          bLen    = _before.length,
          _after  = wrapper[AFTER],
          aLen    = _after.length,
          _fn     = wrapper[ORIGIN],
          ret, r;

      // Invoke before, if it returns { $skip: true } then skip fn() and after() and returns $data
      while (bLen--) {
        r = _before[bLen].apply(this, arguments);
        if (mapOrNil(r) && r.$skip === true) {
          return r.$data;
        }
      }

      // Invoke fn, save return value
      ret = _fn.apply(this, arguments);

      while (aLen--) {
        r = _after[aLen].apply(this, arguments);
        if (mapOrNil(r) && r.$skip === true) {
          return ret;
        }
      }
      return ret;
    }

    // wrapper exists? reuse it
    if (fn[WRAPPER] === fn) {
      fn[BEFORE].push(before);
      fn[AFTER].push(after);
      fn[ADVISOR].push(advisor);
      return fn;
    }

    // create a reusable wrapper structure
    extend(wrapper, fn, 0, true);
    if (classOrNil(fn)) {
      wrapper.prototype = fn.prototype;

      // this destroys the origin of wrapper[ORIGIN], in theory, prototype.constructor should point
      // to the class constructor itself, but it's no harm to not let that happen
      // wrapper.prototype.constructor = wrapper;
    }

    wrapper[BEFORE]  = [ before ];
    wrapper[AFTER]   = [ after ];
    wrapper[ORIGIN]  = fn;
    wrapper[ADVISOR] = [ advisor ];
    wrapper[WRAPPER] = wrapper;
    wrapper.$super   = fn.$super;
    wrapper.$superp  = fn.$superp;
    return wrapper;
  }

  /**
   * Restore a function to its origin state.
   * @return function's origin state
   */
  function restore(fn, advisor) {
    var origin, index, len;

    if (fn && fn === fn[WRAPPER]) {
      if ( !advisor) {
        origin = fn[ORIGIN];
        delete fn[ORIGIN];
        delete fn[ADVISOR];
        delete fn[BEFORE];
        delete fn[AFTER];
        delete fn[WRAPPER];
      } else {
        index = len = fn[ADVISOR].length;
        while (index--) {
          if (fn[ADVISOR][index] === advisor) { break; }
        }
        if (index >= 0) {
          if (len === 1) { return restore(fn); }
          fn[ADVISOR].splice(index, 1);
          fn[BEFORE].splice(index, 1);
          fn[AFTER].splice(index, 1);
        }
      }
    }
    return origin;
  }

  /**
   * Do unpointcut: Remove pointcuts from subject.
   * Execute from public pointcut api:
   *  - poincut(subject, "remove");
   *  - poincut(subject, "remove constructor foo bar");
   *  - poincut(subject, "remove", advisor);
   */
  function unpointcut(clazz, opts, advisor, iClass, iInstance, bindTo) {
    var constructor, re, keys, fn, c;

    function doRestore(collection, advisor) {
      var c, key, iConstructor, iStatic, fn;

      for (c in collection) {
        key          = c/1 == c ? collection[c] : c;
        iConstructor = (key === "constructor");
        iStatic      = iClass && clazz[key];

        if (key === "constructor" && iClass) {
          constructor = restore(iClass, advisor);;
        } else {
          if (clazz[key]) {
            clazz[key] = restore(clazz[key], advisor);
          }
          if (bindTo[key]) {
            bindTo[key] = restore(bindTo[key], advisor);
          }
        }
      }
    }

    if (opts === "remove") {
      if ( !advisor) {                                                         // type 1: "remove"
        constructor = iClass && (clazz === clazz[WRAPPER]) && clazz[ORIGIN];
        for (var name in bindTo) {
          bindTo[name] = restore(bindTo[name]) || bindTo[name];
        }
        for (var name in clazz) {
          clazz[name] = restore(clazz[name]) || clazz[name];
        }
      } else {                                                                 // type 2: "remove", advisor
        doRestore(advisor, advisor);
      }
    } else if ((re = /^remove /.exec(opts)) !== null) {                        // type 3: "remove contructor foo"
      keys = opts.replace(re, "").split(" ");
      doRestore(keys);
    } else {
      throw "Invalid params";
    }
    return constructor || clazz;
  }

  /**
   * Apply pointcut to a subject.
   */
  jsface.pointcut = function pointcut(clazz, opts) {
    var iClass    = classOrNil(clazz) || functionOrNil(clazz),
        iInstance = mapOrNil(clazz),
        iRemove   = (/^remove ?/.exec(opts) !== null),
        advisor   = iRemove && arguments[2],
        bindTo, method, pointcuts;

    if ( !(iClass || iInstance) || !(mapOrNil(opts) || iRemove)) {
      throw "Invalid params";
    }
    bindTo = iClass ? clazz.prototype : clazz;

    if (iRemove) {
      return unpointcut(clazz, opts, advisor, iClass, iInstance, bindTo);
    };

    for (method in opts) {
      pointcuts = opts[method];
      pointcuts = functionOrNil(pointcuts) ? { before: pointcuts } : pointcuts;   // sugar syntax

      var before = mapOrNil(pointcuts) && !pointcuts.before ? noop : pointcuts.before,
          after  = mapOrNil(pointcuts) && !pointcuts.after ? noop : pointcuts.after,
          isStatic, found = false;

      // check if before & after are valid
      if ( !functionOrNil(before)) {
        throw "Invalid " + method + ":before";
      }
      if ( !functionOrNil(after)) {
        throw "Invalid " + method + ":after";
      }

      if (iInstance) {
        if (functionOrNil(bindTo[method])) {
          bindTo[method] = wrap(bindTo[method], before, after, opts);
        } else {
          throw "Non-function property named " + method + " on instance";
        }
      } else {
        if (method === "constructor") {
          clazz = wrap(clazz, before, after, opts);
        } else {
          if (functionOrNil(clazz[method])) {     // static method
            clazz[method] = wrap(clazz[method], before, after, opts);
            found = true;
          }

          if (functionOrNil(bindTo[method])) {  // normal (non-static) method
            bindTo[method] = wrap(bindTo[method], before, after, opts);
            found = true;
          }

          if ( !found) {
            throw "Non-function property named " + method + " on class";
          }
        }
      }
    }
    return clazz;
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = jsface.pointcut;
  }
})(this);
