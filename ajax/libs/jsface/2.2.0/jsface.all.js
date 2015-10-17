/*
 * JSFace Object Oriented Programming Library
 * https://github.com/tnhu/jsface
 *
 * Copyright (c) 2009-2013 Tan Nhu
 * Licensed under MIT license (https://github.com/tnhu/jsface/blob/master/LICENSE.txt)
 */
(function(context, OBJECT, NUMBER, LENGTH, toString, undefined, oldClass, jsface) {
  /**
   * Return a map itself or null. A map is a set of { key: value }
   * @param obj object to be checked
   * @return obj itself as a map or false
   */
  function mapOrNil(obj) { return (obj && typeof obj === OBJECT && !(typeof obj.length === NUMBER && !(obj.propertyIsEnumerable(LENGTH))) && obj) || null; }

  /**
   * Return an array itself or null
   * @param obj object to be checked
   * @return obj itself as an array or null
   */
  function arrayOrNil(obj) { return (obj && typeof obj === OBJECT && typeof obj.length === NUMBER && !(obj.propertyIsEnumerable(LENGTH)) && obj) || null; }

  /**
   * Return a function itself or null
   * @param obj object to be checked
   * @return obj itself as a function or null
   */
  function functionOrNil(obj) { return (obj && typeof obj === "function" && obj) || null; }

  /**
   * Return a string itself or null
   * @param obj object to be checked
   * @return obj itself as a string or null
   */
  function stringOrNil(obj) { return (toString.apply(obj) === "[object String]" && obj) || null; }

  /**
   * Return a class itself or null
   * @param obj object to be checked
   * @return obj itself as a class or false
   */
  function classOrNil(obj) { return (functionOrNil(obj) && (obj.prototype && obj === obj.prototype.constructor) && obj) || null; }

  /**
   * Util for extend() to copy a map of { key:value } to an object
   * @param key key
   * @param value value
   * @param ignoredKeys ignored keys
   * @param object object
   * @param iClass true if object is a class
   * @param oPrototype object prototype
   */
  function copier(key, value, ignoredKeys, object, iClass, oPrototype) {
    if ( !ignoredKeys || !ignoredKeys.hasOwnProperty(key)) {
      object[key] = value;
      if (iClass) { oPrototype[key] = value; }                       // class? copy to prototype as well
    }
  }

  /**
   * Extend object from subject, ignore properties in ignoredKeys
   * @param object the child
   * @param subject the parent
   * @param ignoredKeys (optional) keys should not be copied to child
   */
  function extend(object, subject, ignoredKeys) {
    if (arrayOrNil(subject)) {
      for (var len = subject.length; --len >= 0;) { extend(object, subject[len], ignoredKeys); }
    } else {
      ignoredKeys = ignoredKeys || { constructor: 1, $super: 1, prototype: 1, $superp: 1 };

      var iClass     = classOrNil(object),
          isSubClass = classOrNil(subject),
          oPrototype = object.prototype, supez, key, proto;

      // copy static properties and prototype.* to object
      if (mapOrNil(subject)) {
        for (key in subject) {
          copier(key, subject[key], ignoredKeys, object, iClass, oPrototype);
        }
      }

      if (isSubClass) {
        proto = subject.prototype;
        for (key in proto) {
          copier(key, proto[key], ignoredKeys, object, iClass, oPrototype);
        }
      }

      // prototype properties
      if (iClass && isSubClass) { extend(oPrototype, subject.prototype, ignoredKeys); }
    }
  }

  /**
   * Create a class.
   * @param parent parent class(es)
   * @param api class api
   * @return class
   */
  function Class(parent, api) {
    if ( !api) {
      parent = (api = parent, 0);                                     // !api means there's no parent
    }

    var clazz, constructor, singleton, statics, key, bindTo, len, i = 0, p,
        ignoredKeys = { constructor: 1, $singleton: 1, $statics: 1, prototype: 1, $super: 1, $superp: 1, main: 1, toString: 0 },
        plugins     = Class.plugins;

    api         = (typeof api === "function" ? api() : api) || {};             // execute api if it's a function
    constructor = api.hasOwnProperty("constructor") ? api.constructor : 0;     // hasOwnProperty is a must, constructor is special
    singleton   = api.$singleton;
    statics     = api.$statics;

    // add plugins' keys into ignoredKeys
    for (key in plugins) { ignoredKeys[key] = 1; }

    // construct constructor
    clazz  = singleton ? {} : (constructor ? constructor : function(){});

    // determine bindTo: where api should be bound
    bindTo = singleton ? clazz : clazz.prototype;

    // make sure parent is always an array
    parent = !parent || arrayOrNil(parent) ? parent : [ parent ];

    // do inherit
    len = parent && parent.length;
    while (i < len) {
      p = parent[i++];
      for (key in p) {
        if ( !ignoredKeys[key]) {
          bindTo[key] = p[key];
          if ( !singleton) { clazz[key] = p[key]; }
        }
      }
      for (key in p.prototype) { if ( !ignoredKeys[key]) { bindTo[key] = p.prototype[key]; } }
    }

    // copy properties from api to bindTo
    for (key in api) {
      if ( !ignoredKeys[key]) {
        bindTo[key] = api[key];
      }
    }

    // copy static properties from statics to both clazz and bindTo
    for (key in statics) { clazz[key] = bindTo[key] = statics[key]; }

    // if class is not a singleton, add $super and $superp
    if ( !singleton) {
      p = parent && parent[0] || parent;
      clazz.$super  = p;
      clazz.$superp = p && p.prototype ? p.prototype : p;
      bindTo.$class = clazz;
    }

    for (key in plugins) { plugins[key](clazz, parent, api); }                 // pass control to plugins
    if (functionOrNil(api.main)) { api.main.call(clazz, clazz); }              // execute main()
    return clazz;
  }

  /* Class plugins repository */
  Class.plugins = {};

  /* Initialization */
  jsface = {
    Class        : Class,
    extend       : extend,
    mapOrNil     : mapOrNil,
    arrayOrNil   : arrayOrNil,
    functionOrNil: functionOrNil,
    stringOrNil  : stringOrNil,
    classOrNil   : classOrNil
  };

  if (typeof module !== "undefined" && module.exports) {                       // NodeJS/CommonJS
    module.exports = jsface;
  } else {
    oldClass          = context.Class;                                         // save current Class namespace
    context.Class     = Class;                                                 // bind Class and jsface to global scope
    context.jsface    = jsface;
    jsface.noConflict = function() { context.Class = oldClass; };              // no conflict
  }
})(this, "object", "number", "length", Object.prototype.toString);
/*
 * JSFace Object Oriented Programming Library - Ready plugin
 * https://github.com/tnhu/jsface
 *
 * Copyright (c) 2009-2012 Tan Nhu
 * Licensed under MIT license (https://github.com/tnhu/jsface/blob/master/LICENSE.txt)
 */
(function(context) {
  var jsface        = context.jsface || require("./jsface"),
      Class         = jsface.Class,
      functionOrNil = jsface.functionOrNil,
      readyFns      = [],
      readyCount    = 0;

  Class.plugins.$ready = function invoke(clazz, parent, api, loop) {
    var r       = api.$ready,
        len     = parent ? parent.length : 0,
        count   = len,
        _super  = len && parent[0].$super,
        pa, i, entry;

    // find and invoke $ready from parent(s)
    while (len--) {
      for (i = 0; i < readyCount; i++) {
        entry = readyFns[i];
        pa    = parent[len];

        if (pa === entry[0]) {
          entry[1].call(pa, clazz, parent, api);
          count--;
        }

        if ( !count) { break; }
      }
    }

    // call $ready from grandparent(s), if any
    if (_super) {
      invoke(clazz, [ _super ], api, true);
    }

    // in an environment where there are a lot of class creating/removing (rarely)
    // this implementation might cause a leak (saving pointers to clazz and $ready)
    if ( !loop && functionOrNil(r)) {
      r.call(clazz, clazz, parent, api);  // invoke ready from current class
      readyFns.push([ clazz,  r ]);
      readyCount++;
    }
  };
})(this);

/*
 * JSFace Object Oriented Programming Library - Plug and Play pointcut plugin
 * https://github.com/tnhu/jsface
 *
 * Copyright (c) 2009-2012 Tan Nhu
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
      INVALID       = "Invalid ",
      NON_FUNC      = "Non-function property named ",
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
        iStatic      = iClass && bindTo[key] === clazz[key];
        fn           = restore(iConstructor && iClass && clazz || bindTo[key], advisor);

        constructor = constructor || (iConstructor && fn);
        if (fn && !iConstructor) {
          bindTo[key] = fn;
          if (iStatic) {
            clazz[key] = fn;
          }
        }
      }
    }

    if (opts === "remove") {
      if ( !advisor) {                                                         // type 1: "remove"
        constructor = iClass && (clazz === clazz[WRAPPER]) && clazz[ORIGIN];
        for (var name in bindTo) {
          var fn      = bindTo[name],
              iStatic = iClass && bindTo[name] === clazz[name];

          bindTo[name] = restore(fn) || bindTo[name];

          // restore static method
          if (iStatic) {
            clazz[name] = bindTo[name];
          }
        }
      } else {                                                                 // type 2: "remove", advisor
        doRestore(advisor, advisor);
      }
    } else if ((re = /^remove /.exec(opts)) !== null) {                        // type 3: "remove contructor foo"
      keys = opts.replace(re, "").split(" ");
      doRestore(keys);
    } else {
      throw INVALID + "params";
    }
    return constructor || clazz;
  }

  /**
   * Apply pointcut to a subject.
   */
  jsface.pointcut = function pointcut(clazz, opts) {
    var iClass    = functionOrNil(clazz),
        iInstance = mapOrNil(clazz),
        iRemove   = (/^remove ?/.exec(opts) !== null),
        advisor   = iRemove && arguments[2],
        bindTo, method, pointcuts;

    if ( !(iClass || iInstance) || !(mapOrNil(opts) || iRemove)) {
      throw INVALID + "params";
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
          isStatic;

      // check if before & after are valid
      if ( !functionOrNil(before)) {
        throw INVALID + method + ":before";
      }
      if ( !functionOrNil(after)) {
        throw INVALID + method + ":after";
      }

      if (iInstance) {
        if (functionOrNil(bindTo[method])) {
          bindTo[method] = wrap(bindTo[method], before, after, opts);
        } else {
          throw NON_FUNC + method;
        }
      } else {
        if (method === "constructor") {
          clazz = wrap(clazz, before, after, opts);
        } else {
          if (functionOrNil(bindTo[method])) {
            isStatic = iClass && bindTo[method] === clazz[method];
            bindTo[method] = wrap(bindTo[method], before, after, opts);
            if (isStatic) { clazz[method] = bindTo[method]; }
          } else {
            throw NON_FUNC + method;
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
