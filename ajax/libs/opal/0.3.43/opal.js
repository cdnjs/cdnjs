(function(undefined) {
  // The Opal object that is exposed globally
  var Opal = this.Opal = {};

  // Very root class
  function BasicObject(){}

  // Core Object class
  function Object(){}

  // Class' class
  function Class(){}

  // the class of nil
  function NilClass(){}

  // TopScope is used for inheriting constants from the top scope
  var TopScope = function(){};

  // Opal just acts as the top scope
  TopScope.prototype = Opal;

  // To inherit scopes
  Opal.alloc  = TopScope;

  // This is a useful reference to global object inside ruby files
  Opal.global = this;

  // Minify common function calls
  var __hasOwn = Opal.hasOwnProperty;
  var __slice  = Opal.slice = Array.prototype.slice;

  // Generates unique id for every ruby object
  var unique_id = 0;

  // Return next unique id
  Opal.uid = function() {
    return unique_id++;
  };

  // Table holds all class variables
  Opal.cvars = {};

  // Globals table
  Opal.gvars = {};

  Opal.klass = function(base, superklass, id, constructor) {
    var klass;
    if (base._isObject) {
      base = base._klass;
    }

    if (superklass === null) {
      superklass = Object;
    }

    if (__hasOwn.call(base._scope, id)) {
      klass = base._scope[id];
    }
    else {
      if (!superklass._methods) {
        var bridged = superklass;
        superklass  = Object;
        klass       = bridge_class(bridged);
      }
      else {
        klass = boot_class(superklass, constructor);
      }

      klass._name = (base === Object ? id : base._name + '::' + id);

      var const_alloc   = function() {};
      var const_scope   = const_alloc.prototype = new base._scope.alloc();
      klass._scope      = const_scope;
      const_scope.base  = klass;
      const_scope.alloc = const_alloc;

      base[id] = base._scope[id] = klass;

      if (superklass.$inherited) {
        superklass.$inherited(klass);
      }
    }

    return klass;
  };

  // Define new module (or return existing module)
  Opal.module = function(base, id, constructor) {
    var klass;
    if (base._isObject) {
      base = base._klass;
    }

    if (__hasOwn.call(base._scope, id)) {
      klass = base._scope[id];
    }
    else {
      klass = boot_class(Class, constructor);
      klass._name = (base === Object ? id : base._name + '::' + id);

      klass.$included_in = [];

      var const_alloc   = function() {};
      var const_scope   = const_alloc.prototype = new base._scope.alloc();
      klass._scope      = const_scope;
      const_scope.alloc = const_alloc;

      base[id] = base._scope[id]    = klass;
    }

    return klass;
  }

  // Utility function to raise a "no block given" error
  var no_block_given = function() {
    throw new Error('no block given');
  };

  // Boot a base class (makes instances).
  var boot_defclass = function(id, constructor, superklass) {
    if (superklass) {
      var ctor           = function() {};
          ctor.prototype = superklass.prototype;

      constructor.prototype = new ctor();
    }

    var prototype = constructor.prototype;

    prototype.constructor = constructor;
    prototype._isObject   = true;
    prototype._klass      = constructor;

    constructor._inherited    = [];
    constructor._included_in  = [];
    constructor._isClass      = true;
    constructor._name         = id;
    constructor._super        = superklass;
    constructor._methods      = [];
    constructor._smethods     = [];
    constructor._isObject     = false;

    constructor._donate = __donate;
    constructor._defs = __defs;

    constructor['$==='] = module_eqq;
    constructor.$to_s = module_to_s;
    constructor.toString = module_to_s;

    Opal[id] = constructor;

    return constructor;
  };

  // Create generic class with given superclass.
  var boot_class = Opal.boot = function(superklass, constructor) {
    var ctor = function() {};
        ctor.prototype = superklass.prototype;

    constructor.prototype = new ctor();
    var prototype = constructor.prototype;

    prototype._klass      = constructor;
    prototype.constructor = constructor;

    constructor._inherited    = [];
    constructor._included_in  = [];
    constructor._isClass      = true;
    constructor._super        = superklass;
    constructor._methods      = [];
    constructor._isObject     = false;
    constructor._klass        = Class;
    constructor._donate       = __donate
    constructor._defs = __defs;

    constructor['$==='] = module_eqq;
    constructor.$to_s = module_to_s;
    constructor.toString = module_to_s;

    constructor['$[]'] = undefined;
    constructor['$call'] = undefined;

    var smethods;

    smethods = superklass._smethods.slice();

    constructor._smethods = smethods;
    for (var i = 0, length = smethods.length; i < length; i++) {
      var m = smethods[i];
      constructor[m] = superklass[m];
    }

    superklass._inherited.push(constructor);

    return constructor;
  };

  var bridge_class = function(constructor) {
    constructor.prototype._klass = constructor;

    constructor._inherited    = [];
    constructor._included_in  = [];
    constructor._isClass      = true;
    constructor._super        = Object;
    constructor._klass        = Class;
    constructor._methods      = [];
    constructor._smethods     = [];
    constructor._isObject     = false;

    constructor._donate = function(){};
    constructor._defs = __defs;

    constructor['$==='] = module_eqq;
    constructor.$to_s = module_to_s;
    constructor.toString = module_to_s;

    var smethods = constructor._smethods = Class._methods.slice();
    for (var i = 0, length = smethods.length; i < length; i++) {
      var m = smethods[i];
      constructor[m] = Object[m];
    }

    bridged_classes.push(constructor);

    var table = Object.prototype, methods = Object._methods;

    for (var i = 0, length = methods.length; i < length; i++) {
      var m = methods[i];
      constructor.prototype[m] = table[m];
    }

    constructor._smethods.push('$allocate');

    return constructor;
  };

  Opal.puts = function(a) { console.log(a); };

  var mm_mid = '';

  var method_missing_dispatcher = function() {
    this.$method_missing._p = method_missing_dispatcher._p;
    return this.$method_missing.apply(this, [mm_mid].concat(__slice.call(arguments)));
  };

  // Method missing dispatcher
  Opal.mm = function(mid) {
    mm_mid = mid;
    return method_missing_dispatcher;
  };

  // Const missing dispatcher
  Opal.cm = function(name) {
    return this.base.$const_missing(name);
  };

  // Arity count error dispatcher
  Opal.ac = function(actual, expected, object, meth) {
    var inspect = (object._isObject ? object._klass._name + '#' : object._name + '.') + meth;
    var msg = '[' + inspect + '] wrong number of arguments(' + actual + ' for ' + expected + ')'
    throw Opal.ArgumentError.$new(msg);
  };

  /*
    Call a ruby method on a ruby object with some arguments:

      var my_array = [1, 2, 3, 4]
      Opal.send(my_array, 'length')     # => 4
      Opal.send(my_array, 'reverse!')   # => [4, 3, 2, 1]

    A missing method will be forwarded to the object via
    method_missing.

    The result of either call with be returned.

    @param [Object] recv the ruby object
    @param [String] mid ruby method to call
  */
  Opal.send = function(recv, mid) {
    var args = __slice.call(arguments, 2),
        func = recv['$' + mid];

    if (func) {
      return func.apply(recv, args);
    }

    return recv.$method_missing.apply(recv, [mid].concat(args));
  };

  // Initialization
  // --------------

  boot_defclass('BasicObject', BasicObject)
  boot_defclass('Object', Object, BasicObject);
  boot_defclass('Class', Class, Object);

  Class.prototype = Function.prototype;

  BasicObject._klass = Object._klass = Class._klass = Class;

  // Implementation of Class#===
  function module_eqq(object) {
    if (object == null) {
      return false;
    }

    var search = object._klass;

    while (search) {
      if (search === this) {
        return true;
      }

      search = search._super;
    }

    return false;
  }

  // Implementation of Class#to_s
  function module_to_s() {
    return this._name;
  }

  // Donator for all 'normal' classes and modules
  function __donate(defined, indirect) {
    var methods = this._methods, included_in = this.$included_in;

    // if (!indirect) {
      this._methods = methods.concat(defined);
    // }

    if (included_in) {
      for (var i = 0, length = included_in.length; i < length; i++) {
        var includee = included_in[i];
        var dest = includee.prototype;

        for (var j = 0, jj = defined.length; j < jj; j++) {
          var method = defined[j];
          dest[method] = this.prototype[method];
        }

        if (includee.$included_in) {
          includee._donate(defined, true);
        }
      }

    }
  }

  // Define a singleton method on a class
  function __defs(mid, body) {
    this._smethods.push(mid);
    this[mid] = body;

    var inherited = this._inherited;
    if (inherited.length) {
      for (var i = 0, length = inherited.length, subclass; i < length; i++) {
        subclass = inherited[i];
        if (!subclass[mid]) {
          subclass._defs(mid, body);
        }
      }
    }
  }

  // Defines methods onto Object (which are then donated to bridged classes)
  Object._defn = function (mid, body) {
    this.prototype[mid] = body;
    this._donate([mid]);
  };

  var bridged_classes = Object.$included_in = [];

  Opal.base = Object;
  BasicObject._scope = Object._scope = Opal;
  Opal.Module = Opal.Class;
  Opal.Kernel = Object;

  var class_const_alloc = function(){};
  var class_const_scope = new TopScope();
  class_const_scope.alloc = class_const_alloc;
  Class._scope = class_const_scope;

  Object.prototype.toString = function() {
    return this.$to_s();
  };

  Opal.top = new Object;

  Opal.klass(Object, Object, 'NilClass', NilClass)
  var nil = Opal.nil = new NilClass;
  nil.call = nil.apply = function() { throw Opal.LocalJumpError.$new('no block given'); };

  Opal.breaker  = new Error('unexpected break');
}).call(this);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  return (function(__base, __super){
    function Class() {};
    Class = __klass(__base, __super, "Class", Class);

    var def = Class.prototype, __scope = Class._scope, TMP_1, TMP_2, TMP_3, TMP_4;

    Class._defs('$new', TMP_1 = function(sup) {
      var _a, block;
      block = TMP_1._p || nil, TMP_1._p = null;
      if (sup == null) {
        sup = ((_a = __scope.Object) == null ? __opal.cm("Object") : _a)
      }
      
      function AnonClass(){};
      var klass   = Opal.boot(sup, AnonClass)
      klass._name = nil;
      klass._scope = sup._scope;

      sup.$inherited(klass);

      if (block !== nil) {
        var block_self = block._s;
        block._s = null;
        block.call(klass);
        block._s = block_self;
      }

      return klass;
    
    });

    def.$allocate = function() {
      
      
      var obj = new this;
      obj._id = Opal.uid();
      return obj;
    
    };

    def.$alias_method = function(newname, oldname) {
      
      this.prototype['$' + newname] = this.prototype['$' + oldname];
      return this;
    };

    def.$ancestors = function() {
      
      
      var parent = this,
          result = [];

      while (parent) {
        result.push(parent);
        parent = parent._super;
      }

      return result;
    
    };

    def.$append_features = function(klass) {
      
      
      var module = this;

      if (!klass.$included_modules) {
        klass.$included_modules = [];
      }

      for (var idx = 0, length = klass.$included_modules.length; idx < length; idx++) {
        if (klass.$included_modules[idx] === module) {
          return;
        }
      }

      klass.$included_modules.push(module);

      if (!module.$included_in) {
        module.$included_in = [];
      }

      module.$included_in.push(klass);

      var donator   = module.prototype,
          prototype = klass.prototype,
          methods   = module._methods;

      for (var i = 0, length = methods.length; i < length; i++) {
        var method = methods[i];
        prototype[method] = donator[method];
      }

      if (prototype._smethods) {
        prototype._smethods.push.apply(prototype._smethods, methods);  
      }

      if (klass.$included_in) {
        klass._donate(methods.slice(), true);
      }
    
      return this;
    };

    def.$attr_accessor = function(names) {
      var _a, _b;names = __slice.call(arguments, 0);
      ((_a = this).$attr_reader || $mm('attr_reader')).apply(_a, [].concat(names));
      return ((_b = this).$attr_writer || $mm('attr_writer')).apply(_b, [].concat(names));
    };

    def.$attr_reader = function(names) {
      names = __slice.call(arguments, 0);
      
      var proto = this.prototype, cls = this;
      for (var i = 0, length = names.length; i < length; i++) {
        (function(name) {
          proto[name] = nil;
          var func = function() { return this[name] };

          if (cls._isSingleton) {
            proto._defs('$' + name, func);
          }
          else {
            proto['$' + name] = func;
          }
        })(names[i]);
      }
    
      return nil;
    };

    def.$attr_writer = function(names) {
      names = __slice.call(arguments, 0);
      
      var proto = this.prototype, cls = this;
      for (var i = 0, length = names.length; i < length; i++) {
        (function(name) {
          proto[name] = nil;
          var func = function(value) { return this[name] = value; };

          if (cls._isSingleton) {
            proto._defs('$' + name + '=', func);
          }
          else {
            proto['$' + name + '='] = func;
          }
        })(names[i]);
      }
    
      return nil;
    };

    def.$attr = def.$attr_accessor;

    def['$const_defined?'] = function(name) {
      
      return !!(this._scope[name]);
    };

    def.$const_get = function(name) {
      var _a;
      
      var result = this._scope[name];

      if (result == null) {
        return ((_a = this).$const_missing || $mm('const_missing')).call(_a, name);
      }

      return result;
    
    };

    def.$const_missing = function(const$) {
      var name = nil, _a, _b;
      name = this._name;
      return ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.NameError) == null ? __opal.cm("NameError") : _b), "uninitialized constant " + (name) + "::" + (const$));
    };

    def.$const_set = function(name, value) {
      var _a, _b, _c, _d, _e, _f, _g;
      if ((_a = ((_b = name)['$=~'] || $mm('=~')).call(_b, /^[A-Z]/)) === false || _a === nil) {
        ((_a = this).$raise || $mm('raise')).call(_a, ((_c = __scope.NameError) == null ? __opal.cm("NameError") : _c), "wrong constant name " + (name))
      };
      if ((_c = ((_d = name)['$=~'] || $mm('=~')).call(_d, /^[\w_]+$/)) === false || _c === nil) {
        ((_c = this).$raise || $mm('raise')).call(_c, ((_e = __scope.NameError) == null ? __opal.cm("NameError") : _e), "wrong constant name " + (name))
      };
      try {
        name = ((_e = name).$to_str || $mm('to_str')).call(_e)
      } catch ($err) {
      if (true) {
        ((_f = this).$raise || $mm('raise')).call(_f, ((_g = __scope.TypeError) == null ? __opal.cm("TypeError") : _g), "conversion with #to_str failed")}
      else { throw $err; }
      };
      
      this._scope[name] = value;
      return value
    
    };

    def.$define_method = TMP_2 = function(name, method) {
      var block;
      block = TMP_2._p || nil, TMP_2._p = null;
      
      
      if (method) {
        block = method;
      }

      if (block === nil) {
        no_block_given();
      }

      var jsid    = '$' + name;
      block._jsid = jsid;
      block._sup  = this.prototype[jsid];
      block._s    = null;

      this.prototype[jsid] = block;
      this._donate([jsid]);

      return nil;
    
    };

    def.$include = function(mods) {
      var _a, _b;mods = __slice.call(arguments, 0);
      
      var i = mods.length - 1, mod;
      while (i >= 0) {
        mod = mods[i];
        i--;

        if (mod === this) {
          continue;
        }

        ((_a = (mod)).$append_features || $mm('append_features')).call(_a, this);
        ((_b = (mod)).$included || $mm('included')).call(_b, this);
      }

      return this;
    
    };

    def.$instance_methods = function(include_super) {
      if (include_super == null) {
        include_super = false
      }
      
      var methods = [], proto = this.prototype;

      for (var prop in this.prototype) {
        if (!include_super && !proto.hasOwnProperty(prop)) {
          continue;
        }

        if (prop.charAt(0) === '$') {
          methods.push(prop.substr(1));
        }
      }

      return methods;
    
    };

    def.$included = function(mod) {
      
      return nil;
    };

    def.$inherited = function(cls) {
      
      return nil;
    };

    def.$module_eval = TMP_3 = function() {
      var block;
      block = TMP_3._p || nil, TMP_3._p = null;
      
      
      if (block === nil) {
        no_block_given();
      }

      var block_self = block._s, result;

      block._s = null;
      result = block.call(this);
      block._s = block_self;

      return result;
    
    };

    def.$class_eval = def.$module_eval;

    def['$method_defined?'] = function(method) {
      
      
      if (typeof(this.prototype['$' + method]) === 'function') {
        return true;
      }

      return false;
    
    };

    def.$module_function = function(methods) {
      methods = __slice.call(arguments, 0);
      
      for (var i = 0, length = methods.length; i < length; i++) {
        var meth = methods[i], func = this.prototype['$' + meth];

        this['$' + meth] = func;
      }

      return this;
    
    };

    def.$name = function() {
      
      return this._name;
    };

    def.$new = TMP_4 = function(args) {
      var block;
      block = TMP_4._p || nil, TMP_4._p = null;
      args = __slice.call(arguments, 0);
      
      var obj = new this;
      obj._id = Opal.uid();

      obj.$initialize._p = block;
      obj.$initialize.apply(obj, args);
      return obj;
    
    };

    def.$public = function() {
      
      return nil;
    };

    def.$private = def.$public;

    def.$protected = def.$public;

    def.$superclass = function() {
      
      return this._super || nil;
    };

    def.$undef_method = function(symbol) {
      
      this.prototype['$' + symbol] = undefined;
      return this;
    };

    return nil;
  })(self, null)
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  return (function(__base, __super){
    function BasicObject() {};
    BasicObject = __klass(__base, __super, "BasicObject", BasicObject);

    var def = BasicObject.prototype, __scope = BasicObject._scope, TMP_1, TMP_2, TMP_3, TMP_4;

    def.$initialize = function() {
      
      return nil;
    };

    def['$=='] = function(other) {
      
      return this === other;
    };

    def.$__send__ = TMP_1 = function(symbol, args) {
      var block;
      block = TMP_1._p || nil, TMP_1._p = null;
      args = __slice.call(arguments, 1);
      
      var func = this['$' + symbol]

      if (func) {
        if (block !== nil) { func._p = block; }
        return func.apply(this, args);
      }

      if (block !== nil) { this.$method_missing._p = block; }
      return this.$method_missing.apply(this, [symbol].concat(args));
    
    };

    def['$eql?'] = def['$=='];

    def['$equal?'] = def['$=='];

    def.$instance_eval = TMP_2 = function() {
      var block;
      block = TMP_2._p || nil, TMP_2._p = null;
      
      
      if (block === nil) {
        no_block_given();
      }

      var block_self = block._s, result;

      block._s = null;
      result = block.call(this, this);
      block._s = block_self;

      return result;
    
    };

    def.$instance_exec = TMP_3 = function(args) {
      var block;
      block = TMP_3._p || nil, TMP_3._p = null;
      args = __slice.call(arguments, 0);
      
      if (block === nil) {
        no_block_given();
      }

      var block_self = block._s, result;

      block._s = null;
      result = block.apply(this, args);
      block._s = block_self;

      return result;
    
    };

    def.$method_missing = TMP_4 = function(symbol, args) {
      var _a, _b, block;
      block = TMP_4._p || nil, TMP_4._p = null;
      args = __slice.call(arguments, 1);
      return ((_a = ((_b = __scope.Kernel) == null ? __opal.cm("Kernel") : _b)).$raise || $mm('raise')).call(_a, ((_b = __scope.NoMethodError) == null ? __opal.cm("NoMethodError") : _b), "undefined method `" + (symbol) + "' for BasicObject instance");
    };

    return nil;
  })(self, null)
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __module = __opal.module;
  return (function(__base){
    function Kernel() {};
    Kernel = __module(__base, "Kernel", Kernel);
    var def = Kernel.prototype, __scope = Kernel._scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_6;

    def.$initialize = def.$initialize;

    def['$=='] = def['$=='];

    def.$__send__ = def.$__send__;

    def['$eql?'] = def['$eql?'];

    def['$equal?'] = def['$equal?'];

    def.$instance_eval = def.$instance_eval;

    def.$instance_exec = def.$instance_exec;

    def.$method_missing = TMP_1 = function(symbol, args) {
      var _a, _b, block;
      block = TMP_1._p || nil, TMP_1._p = null;
      args = __slice.call(arguments, 1);
      return ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.NoMethodError) == null ? __opal.cm("NoMethodError") : _b), "undefined method `" + (symbol) + "' for " + (((_b = this).$inspect || $mm('inspect')).call(_b)));
    };

    def['$=~'] = function(obj) {
      
      return false;
    };

    def['$==='] = function(other) {
      
      return this == other;
    };

    def.$as_json = function() {
      
      return nil;
    };

    def.$method = function(name) {
      var _a, _b;
      
      var recv = this,
          meth = recv['$' + name],
          func = function() {
            return meth.apply(recv, __slice.call(arguments, 0));
          };

      if (!meth) {
        ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.NameError) == null ? __opal.cm("NameError") : _b));
      }

      func._klass = ((_b = __scope.Method) == null ? __opal.cm("Method") : _b);
      return func;
    
    };

    def.$methods = function(all) {
      if (all == null) {
        all = true
      }
      
      var methods = [];
      for(var k in this) {
        if(k[0] == "$" && typeof (this)[k] === "function") {
          if(all === false || all === nil) {
            if(!Object.hasOwnProperty.call(this, k)) {
              continue;
            }
          }
          methods.push(k.substr(1));
        }
      }
      return methods;
    
    };

    def.$Array = function(object) {
      var _a, _b;
      
      if (object.$to_ary) {
        return ((_a = object).$to_ary || $mm('to_ary')).call(_a);
      }
      else if (object.$to_a) {
        return ((_b = object).$to_a || $mm('to_a')).call(_b);
      }

      return [object];
    
    };

    def.$class = function() {
      
      return this._klass;
    };

    def.$define_singleton_method = TMP_2 = function(name) {
      var body;
      body = TMP_2._p || nil, TMP_2._p = null;
      
      
      if (body === nil) {
        no_block_given();
      }

      var jsid   = '$' + name;
      body._jsid = jsid;
      body._sup  = this[jsid];
      body._s    = null;

      this[jsid] = body;

      return this;
    
    };

    def.$dup = function() {
      var _a, _b;
      return ((_a = ((_b = this).$class || $mm('class')).call(_b)).$allocate || $mm('allocate')).call(_a);
    };

    def.$enum_for = function(method, args) {
      var _a, _b;if (method == null) {
        method = "each"
      }args = __slice.call(arguments, 1);
      return ((_a = ((_b = __scope.Enumerator) == null ? __opal.cm("Enumerator") : _b)).$new || $mm('new')).apply(_a, [this, method].concat(args));
    };

    def['$equal?'] = function(other) {
      
      return this === other;
    };

    def.$extend = function(mods) {
      var _a, _b;mods = __slice.call(arguments, 0);
      
      for (var i = 0, length = mods.length; i < length; i++) {
        ((_a = ((_b = this).$singleton_class || $mm('singleton_class')).call(_b)).$include || $mm('include')).call(_a, mods[i]);
      }

      return this;
    
    };

    def.$format = function(format, args) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;args = __slice.call(arguments, 1);
      
      var idx = 0;
      return format.replace(/%(\d+\$)?([-+ 0]*)(\d*|\*(\d+\$)?)(?:\.(\d*|\*(\d+\$)?))?([cspdiubBoxXfgeEG])|(%%)/g, function(str, idx_str, flags, width_str, w_idx_str, prec_str, p_idx_str, spec, escaped) {
        if (escaped) {
          return '%';
        }

        var width,
        prec,
        is_integer_spec = ("diubBoxX".indexOf(spec) != -1),
        is_float_spec = ("eEfgG".indexOf(spec) != -1),
        prefix = '',
        obj;

        if (width_str === undefined) {
          width = undefined;
        } else if (width_str.charAt(0) == '*') {
          var w_idx = idx++;
          if (w_idx_str) {
            w_idx = parseInt(w_idx_str, 10) - 1;
          }
          width = ((_a = (args[w_idx])).$to_i || $mm('to_i')).call(_a);
        } else {
          width = parseInt(width_str, 10);
        }
        if (!prec_str) {
          prec = is_float_spec ? 6 : undefined;
        } else if (prec_str.charAt(0) == '*') {
          var p_idx = idx++;
          if (p_idx_str) {
            p_idx = parseInt(p_idx_str, 10) - 1;
          }
          prec = ((_b = (args[p_idx])).$to_i || $mm('to_i')).call(_b);
        } else {
          prec = parseInt(prec_str, 10);
        }
        if (idx_str) {
          idx = parseInt(idx_str, 10) - 1;
        }
        switch (spec) {
        case 'c':
          obj = args[idx];
          if (obj._isString) {
            str = obj.charAt(0);
          } else {
            str = String.fromCharCode(((_c = (obj)).$to_i || $mm('to_i')).call(_c));
          }
          break;
        case 's':
          str = ((_d = (args[idx])).$to_s || $mm('to_s')).call(_d);
          if (prec !== undefined) {
            str = str.substr(0, prec);
          }
          break;
        case 'p':
          str = ((_e = (args[idx])).$inspect || $mm('inspect')).call(_e);
          if (prec !== undefined) {
            str = str.substr(0, prec);
          }
          break;
        case 'd':
        case 'i':
        case 'u':
          str = ((_f = (args[idx])).$to_i || $mm('to_i')).call(_f).toString();
          break;
        case 'b':
        case 'B':
          str = ((_g = (args[idx])).$to_i || $mm('to_i')).call(_g).toString(2);
          break;
        case 'o':
          str = ((_h = (args[idx])).$to_i || $mm('to_i')).call(_h).toString(8);
          break;
        case 'x':
        case 'X':
          str = ((_i = (args[idx])).$to_i || $mm('to_i')).call(_i).toString(16);
          break;
        case 'e':
        case 'E':
          str = ((_j = (args[idx])).$to_f || $mm('to_f')).call(_j).toExponential(prec);
          break;
        case 'f':
          str = ((_k = (args[idx])).$to_f || $mm('to_f')).call(_k).toFixed(prec);
          break;
        case 'g':
        case 'G':
          str = ((_l = (args[idx])).$to_f || $mm('to_f')).call(_l).toPrecision(prec);
          break;
        }
        idx++;
        if (is_integer_spec || is_float_spec) {
          if (str.charAt(0) == '-') {
            prefix = '-';
            str = str.substr(1);
          } else {
            if (flags.indexOf('+') != -1) {
              prefix = '+';
            } else if (flags.indexOf(' ') != -1) {
              prefix = ' ';
            }
          }
        }
        if (is_integer_spec && prec !== undefined) {
          if (str.length < prec) {
            str = (_m = "0", _n = prec - str.length, typeof(_m) === 'number' ? _m * _n : _m['$*'](_n)) + str;
          }
        }
        var total_len = prefix.length + str.length;
        if (width !== undefined && total_len < width) {
          if (flags.indexOf('-') != -1) {
            str = str + (_m = " ", _n = width - total_len, typeof(_m) === 'number' ? _m * _n : _m['$*'](_n));
          } else {
            var pad_char = ' ';
            if (flags.indexOf('0') != -1) {
              str = (_m = "0", _n = width - total_len, typeof(_m) === 'number' ? _m * _n : _m['$*'](_n)) + str;
            } else {
              prefix = (_m = " ", _n = width - total_len, typeof(_m) === 'number' ? _m * _n : _m['$*'](_n)) + prefix;
            }
          }
        }
        var result = prefix + str;
        if ('XEG'.indexOf(spec) != -1) {
          result = result.toUpperCase();
        }
        return result;
      });
    
    };

    def.$hash = function() {
      
      return this._id;
    };

    def.$inspect = function() {
      var _a;
      return ((_a = this).$to_s || $mm('to_s')).call(_a);
    };

    def['$instance_of?'] = function(klass) {
      
      return this._klass === klass;
    };

    def['$instance_variable_defined?'] = function(name) {
      
      return __hasOwn.call(this, name.substr(1));
    };

    def.$instance_variable_get = function(name) {
      
      
      var ivar = this[name.substr(1)];

      return ivar == null ? nil : ivar;
    
    };

    def.$instance_variable_set = function(name, value) {
      
      return this[name.substr(1)] = value;
    };

    def.$instance_variables = function() {
      
      
      var result = [];

      for (var name in this) {
        if (name.charAt(0) !== '$') {
          result.push(name);
        }
      }

      return result;
    
    };

    def['$is_a?'] = function(klass) {
      
      
      var search = this._klass;

      while (search) {
        if (search === klass) {
          return true;
        }

        search = search._super;
      }

      return false;
    
    };

    def['$kind_of?'] = def['$is_a?'];

    def.$lambda = TMP_3 = function() {
      var block;
      block = TMP_3._p || nil, TMP_3._p = null;
      
      return block;
    };

    def.$loop = TMP_4 = function() {
      var block;
      block = TMP_4._p || nil, TMP_4._p = null;
      
      while (true) {;
      if (block.call(null) === __breaker) return __breaker.$v;
      };
      return this;
    };

    def['$nil?'] = function() {
      
      return false;
    };

    def.$object_id = function() {
      
      return this._id || (this._id = Opal.uid());
    };

    def.$printf = function(args) {
      var fmt = nil, _a, _b, _c, _d, _e;args = __slice.call(arguments, 0);
      if (((_a = ((_b = args).$length || $mm('length')).call(_b))['$>'] || $mm('>')).call(_a, 0)) {
        fmt = ((_c = args).$shift || $mm('shift')).call(_c);
        ((_d = this).$print || $mm('print')).call(_d, ((_e = this).$format || $mm('format')).apply(_e, [fmt].concat(args)));
      };
      return nil;
    };

    def.$proc = TMP_5 = function() {
      var _a, _b, block;
      block = TMP_5._p || nil, TMP_5._p = null;
      
      
      if (block === nil) {
        ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.ArgumentError) == null ? __opal.cm("ArgumentError") : _b), "no block given");
      }
      block.is_lambda = false;
      return block;
    
    };

    def.$puts = function(strs) {
      var _a, _b;strs = __slice.call(arguments, 0);
      
      for (var i = 0; i < strs.length; i++) {
        if(strs[i] instanceof Array) {
          ((_a = this).$puts || $mm('puts')).apply(_a, [].concat((strs[i])))
        } else {
          __opal.puts(((_b = (strs[i])).$to_s || $mm('to_s')).call(_b));
        }
      }
    
      return nil;
    };

    def.$p = function(args) {
      var _a, _b, _c;args = __slice.call(arguments, 0);
      console.log.apply(console, args);
      if (((_a = ((_b = args).$length || $mm('length')).call(_b))['$<='] || $mm('<=')).call(_a, 1)) {
        return ((_c = args)['$[]'] || $mm('[]')).call(_c, 0)
        } else {
        return args
      };
    };

    def.$print = def.$puts;

    def.$raise = function(exception, string) {
      var _a, _b, _c;if (exception == null) {
        exception = ""
      }
      
      if (typeof(exception) === 'string') {
        exception = ((_a = ((_b = __scope.RuntimeError) == null ? __opal.cm("RuntimeError") : _b)).$new || $mm('new')).call(_a, exception);
      }
      else if (!((_b = exception)['$is_a?'] || $mm('is_a?')).call(_b, ((_c = __scope.Exception) == null ? __opal.cm("Exception") : _c))) {
        exception = ((_c = exception).$new || $mm('new')).call(_c, string);
      }

      throw exception;
    
    };

    def.$rand = function(max) {
      
      return max == null ? Math.random() : Math.floor(Math.random() * max);
    };

    def['$respond_to?'] = function(name) {
      
      return !!this['$' + name];
    };

    def.$send = def.$__send__;

    def.$singleton_class = function() {
      
      
      if (this._isClass) {
        if (this._singleton) {
          return this._singleton;
        }

        var meta = new __opal.Class;
        meta._klass = __opal.Class;
        this._singleton = meta;
        meta.prototype = this;
        meta._isSingleton = true;

        return meta;
      }

      if (!this._isObject) {
        return this._klass;
      }

      if (this._singleton) {
        return this._singleton;
      }

      else {
        var orig_class = this._klass,
            class_id   = "#<Class:#<" + orig_class._name + ":" + orig_class._id + ">>";

        function Singleton() {};
        var meta = Opal.boot(orig_class, Singleton);
        meta._name = class_id;

        meta.prototype = this;
        this._singleton = meta;
        meta._klass = orig_class._klass;

        return meta;
      }
    
    };

    def.$sprintf = def.$format;

    def.$String = function(str) {
      
      return String(str);
    };

    def.$tap = TMP_6 = function() {
      var block;
      block = TMP_6._p || nil, TMP_6._p = null;
      
      if (block.call(null, this) === __breaker) return __breaker.$v;
      return this;
    };

    def.$to_json = function() {
      var _a, _b;
      return ((_a = ((_b = this).$to_s || $mm('to_s')).call(_b)).$to_json || $mm('to_json')).call(_a);
    };

    def.$to_proc = function() {
      
      return this;
    };

    def.$to_s = function() {
      
      return "#<" + this._klass._name + ":" + this._id + ">";
    };
        ;Kernel._donate(["$initialize", "$==", "$__send__", "$eql?", "$equal?", "$instance_eval", "$instance_exec", "$method_missing", "$=~", "$===", "$as_json", "$method", "$methods", "$Array", "$class", "$define_singleton_method", "$dup", "$enum_for", "$equal?", "$extend", "$format", "$hash", "$inspect", "$instance_of?", "$instance_variable_defined?", "$instance_variable_get", "$instance_variable_set", "$instance_variables", "$is_a?", "$kind_of?", "$lambda", "$loop", "$nil?", "$object_id", "$printf", "$proc", "$puts", "$p", "$print", "$raise", "$rand", "$respond_to?", "$send", "$singleton_class", "$sprintf", "$String", "$tap", "$to_json", "$to_proc", "$to_s"]);
  })(self)
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  return (function(__base, __super){
    function NilClass() {};
    NilClass = __klass(__base, __super, "NilClass", NilClass);

    var def = NilClass.prototype, __scope = NilClass._scope;

    def['$&'] = function(other) {
      
      return false;
    };

    def['$|'] = function(other) {
      
      return other !== false && other !== nil;
    };

    def['$^'] = function(other) {
      
      return other !== false && other !== nil;
    };

    def['$=='] = function(other) {
      
      return other === nil;
    };

    def.$as_json = function() {
      
      return this;
    };

    def.$dup = function() {
      var _a, _b;
      return ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.TypeError) == null ? __opal.cm("TypeError") : _b));
    };

    def.$inspect = function() {
      
      return "nil";
    };

    def['$nil?'] = function() {
      
      return true;
    };

    def.$singleton_class = function() {
      var _a;
      return ((_a = __scope.NilClass) == null ? __opal.cm("NilClass") : _a);
    };

    def.$to_a = function() {
      
      return [];
    };

    def.$to_h = function() {
      
      return __opal.hash();
    };

    def.$to_i = function() {
      
      return 0;
    };

    def.$to_f = def.$to_i;

    def.$to_json = function() {
      
      return "null";
    };

    def.$to_native = function() {
      
      return null;
    };

    def.$to_s = function() {
      
      return "";
    };

    return nil;
  })(self, null)
})(Opal);
(function(__opal) {
  var _a, self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  (function(__base, __super){
    function Boolean() {};
    Boolean = __klass(__base, __super, "Boolean", Boolean);

    var def = Boolean.prototype, __scope = Boolean._scope;

    def._isBoolean = true;

    def['$&'] = function(other) {
      
      return (this == true) ? (other !== false && other !== nil) : false;
    };

    def['$|'] = function(other) {
      
      return (this == true) ? true : (other !== false && other !== nil);
    };

    def['$^'] = function(other) {
      
      return (this == true) ? (other === false || other === nil) : (other !== false && other !== nil);
    };

    def['$=='] = function(other) {
      
      return (this == true) === other.valueOf();
    };

    def.$as_json = function() {
      
      return this;
    };

    def.$singleton_class = def.$class;

    def.$to_json = function() {
      
      return (this == true) ? 'true' : 'false';
    };

    def.$to_s = function() {
      
      return (this == true) ? 'true' : 'false';
    };

    return nil;
  })(self, Boolean);
  __scope.TrueClass = ((_a = __scope.Boolean) == null ? __opal.cm("Boolean") : _a);
  return __scope.FalseClass = ((_a = __scope.Boolean) == null ? __opal.cm("Boolean") : _a);
})(Opal);
(function(__opal) {
  var _a, self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  (function(__base, __super){
    function Exception() {};
    Exception = __klass(__base, __super, "Exception", Exception);

    var def = Exception.prototype, __scope = Exception._scope;
    def.message = nil;

    def.$message = function() {
      
      return this.message
    }, nil;

    Exception._defs('$new', function(message) {
      if (message == null) {
        message = ""
      }
      
      var err = new Error(message);
      err._klass = this;
      err.name = this._name;
      return err;
    
    });

    def.$backtrace = function() {
      
      
      var backtrace = this.stack;

      if (typeof(backtrace) === 'string') {
        return backtrace.split("\n").slice(0, 15);
      }
      else if (backtrace) {
        return backtrace.slice(0, 15);
      }

      return [];
    
    };

    def.$inspect = function() {
      var _a, _b;
      return "#<" + (((_a = ((_b = this).$class || $mm('class')).call(_b)).$name || $mm('name')).call(_a)) + ": '" + (this.message) + "'>";
    };

    return def.$to_s = def.$message;
  })(self, Error);
  (function(__base, __super){
    function StandardError() {};
    StandardError = __klass(__base, __super, "StandardError", StandardError);

    var def = StandardError.prototype, __scope = StandardError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function RuntimeError() {};
    RuntimeError = __klass(__base, __super, "RuntimeError", RuntimeError);

    var def = RuntimeError.prototype, __scope = RuntimeError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function LocalJumpError() {};
    LocalJumpError = __klass(__base, __super, "LocalJumpError", LocalJumpError);

    var def = LocalJumpError.prototype, __scope = LocalJumpError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function TypeError() {};
    TypeError = __klass(__base, __super, "TypeError", TypeError);

    var def = TypeError.prototype, __scope = TypeError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function NameError() {};
    NameError = __klass(__base, __super, "NameError", NameError);

    var def = NameError.prototype, __scope = NameError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function NoMethodError() {};
    NoMethodError = __klass(__base, __super, "NoMethodError", NoMethodError);

    var def = NoMethodError.prototype, __scope = NoMethodError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function ArgumentError() {};
    ArgumentError = __klass(__base, __super, "ArgumentError", ArgumentError);

    var def = ArgumentError.prototype, __scope = ArgumentError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function IndexError() {};
    IndexError = __klass(__base, __super, "IndexError", IndexError);

    var def = IndexError.prototype, __scope = IndexError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function KeyError() {};
    KeyError = __klass(__base, __super, "KeyError", KeyError);

    var def = KeyError.prototype, __scope = KeyError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function RangeError() {};
    RangeError = __klass(__base, __super, "RangeError", RangeError);

    var def = RangeError.prototype, __scope = RangeError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function StopIteration() {};
    StopIteration = __klass(__base, __super, "StopIteration", StopIteration);

    var def = StopIteration.prototype, __scope = StopIteration._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  (function(__base, __super){
    function SyntaxError() {};
    SyntaxError = __klass(__base, __super, "SyntaxError", SyntaxError);

    var def = SyntaxError.prototype, __scope = SyntaxError._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
  return (function(__base, __super){
    function SystemExit() {};
    SystemExit = __klass(__base, __super, "SystemExit", SystemExit);

    var def = SystemExit.prototype, __scope = SystemExit._scope;

    return nil
  })(self, ((_a = __scope.Exception) == null ? __opal.cm("Exception") : _a));
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass, __gvars = __opal.gvars;
  (function(__base, __super){
    function Regexp() {};
    Regexp = __klass(__base, __super, "Regexp", Regexp);

    var def = Regexp.prototype, __scope = Regexp._scope;

    Regexp._defs('$escape', function(string) {
      
      return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\^\$\|]/g, '\\$&');
    });

    Regexp._defs('$new', function(string, options) {
      
      return new RegExp(string, options);
    });

    def['$=='] = function(other) {
      
      return other.constructor == RegExp && this.toString() === other.toString();
    };

    def['$==='] = def.test;

    def['$=~'] = function(string) {
      var _a;
      
      var result = this.exec(string);

      if (result) {
        result.$to_s    = match_to_s;
        result.$inspect = match_inspect;
        result._klass = ((_a = __scope.MatchData) == null ? __opal.cm("MatchData") : _a);

        __gvars["~"] = result;
      }
      else {
        __gvars["~"] = nil;
      }

      return result ? result.index : nil;
    
    };

    def['$eql?'] = def['$=='];

    def.$inspect = def.toString;

    def.$match = function(pattern, pos) {
      var _a;
      
      var result  = this.exec(pattern);

      if (result) {
        result.$to_s    = match_to_s;
        result.$inspect = match_inspect;
        result._klass = ((_a = __scope.MatchData) == null ? __opal.cm("MatchData") : _a);

        return __gvars["~"] = result;
      }
      else {
        return __gvars["~"] = nil;
      }
    
    };

    def.$to_s = function() {
      
      return this.source;
    };

    
    function match_to_s() {
      return this[0];
    }

    function match_inspect() {
      return "<#MatchData " + this[0].$inspect() + ">";
    }
  
  })(self, RegExp);
  return (function(__base, __super){
    function MatchData() {};
    MatchData = __klass(__base, __super, "MatchData", MatchData);

    var def = MatchData.prototype, __scope = MatchData._scope;

    return nil
  })(self, null);
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __module = __opal.module;
  return (function(__base){
    function Comparable() {};
    Comparable = __module(__base, "Comparable", Comparable);
    var def = Comparable.prototype, __scope = Comparable._scope;

    def['$<'] = function(other) {
      var _a, _b;
      return ((_a = ((_b = this)['$<=>'] || $mm('<=>')).call(_b, other))['$=='] || $mm('==')).call(_a, -1);
    };

    def['$<='] = function(other) {
      var _a, _b;
      return ((_a = ((_b = this)['$<=>'] || $mm('<=>')).call(_b, other))['$<='] || $mm('<=')).call(_a, 0);
    };

    def['$=='] = function(other) {
      var _a, _b;
      return ((_a = ((_b = this)['$<=>'] || $mm('<=>')).call(_b, other))['$=='] || $mm('==')).call(_a, 0);
    };

    def['$>'] = function(other) {
      var _a, _b;
      return ((_a = ((_b = this)['$<=>'] || $mm('<=>')).call(_b, other))['$=='] || $mm('==')).call(_a, 1);
    };

    def['$>='] = function(other) {
      var _a, _b;
      return ((_a = ((_b = this)['$<=>'] || $mm('<=>')).call(_b, other))['$>='] || $mm('>=')).call(_a, 0);
    };

    def['$between?'] = function(min, max) {
      var _a, _b, _c;
      return ((_a = ((_b = this)['$>'] || $mm('>')).call(_b, min)) ? ((_c = this)['$<'] || $mm('<')).call(_c, max) : _a);
    };
        ;Comparable._donate(["$<", "$<=", "$==", "$>", "$>=", "$between?"]);
  })(self)
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __module = __opal.module;
  return (function(__base){
    function Enumerable() {};
    Enumerable = __module(__base, "Enumerable", Enumerable);
    var def = Enumerable.prototype, __scope = Enumerable._scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_6, TMP_7, TMP_8, TMP_9, TMP_10, TMP_11, TMP_12, TMP_13, TMP_14;

    def['$all?'] = TMP_1 = function() {
      var block;
      block = TMP_1._p || nil, TMP_1._p = null;
      
      
      var result = true, proc;

      if (block !== nil) {
        proc = function(obj) {
          var value;
          var args = [];
          for(var i = 0; i < arguments.length; i ++) {
            args[i] = arguments[i];
          }
          
          if ((value = block.apply(this, args)) === __breaker) {
            return __breaker.$v;
          }
             
          if (value === false || value === nil) {
            result = false;
            __breaker.$v = nil;

            return __breaker;
          }
        }
      }
      else {
        proc = function(obj) {
          if ((obj === false || obj === nil) && arguments.length < 2) {  
            result = false;
            __breaker.$v = nil;

            return __breaker;
          }
        }
      }

      this.$each._p = proc;
      this.$each();

      return result;
    
    };

    def['$any?'] = TMP_2 = function() {
      var block;
      block = TMP_2._p || nil, TMP_2._p = null;
      
      
      var result = false, proc;

      if (block !== nil) {
        proc = function(obj) {
          var value;
          var args = [];
          for(var i = 0; i < arguments.length; i ++) {
            args[i] = arguments[i];
          }
          
          if ((value = block.apply(this, args)) === __breaker) {
            return __breaker.$v;
          }

          if (value !== false && value !== nil) {
            result       = true;
            __breaker.$v = nil;

            return __breaker;
          }
        }
      }
      else {
        proc = function(obj) {
          if ((obj !== false && obj !== nil) || arguments.length >= 2) {
            result      = true;
            __breaker.$v = nil;
            
            return __breaker;
          }
        }
      }

      this.$each._p = proc;
      this.$each();

      return result;
    
    };

    def.$collect = TMP_3 = function() {
      var block;
      block = TMP_3._p || nil, TMP_3._p = null;
      
      
      var result = [];

      var proc = function() {
        var obj = __slice.call(arguments), value;

        if ((value = block.apply(null, obj)) === __breaker) {
          return __breaker.$v;
        }

        result.push(value);
      };

      this.$each._p = proc;
      this.$each();

      return result;
    
    };

    def.$reduce = TMP_4 = function(object) {
      var block;
      block = TMP_4._p || nil, TMP_4._p = null;
      
      
      var result = object == undefined ? 0 : object;

      var proc = function() {
        var obj = __slice.call(arguments), value;

        if ((value = block.apply(null, [result].concat(obj))) === __breaker) {
          result = __breaker.$v;
          __breaker.$v = nil;

          return __breaker;
        }

        result = value;
      };

      this.$each._p = proc;
      this.$each();

      return result;
    
    };

    def.$count = TMP_5 = function(object) {
      var _a, block;
      block = TMP_5._p || nil, TMP_5._p = null;
      
      
      var result = 0;

      if (object != null) {
        block = function(obj) { return ((_a = (obj))['$=='] || $mm('==')).call(_a, object); };
      }
      else if (block === nil) {
        block = function() { return true; };
      }

      var proc = function(obj) {
        var value;

        if ((value = block(obj)) === __breaker) {
          return __breaker.$v;
        }

        if (value !== false && value !== nil) {
          result++;
        }
      }

      this.$each._p = proc;
      this.$each();

      return result;
    
    };

    def.$detect = TMP_6 = function(ifnone) {
      var _a, block;
      block = TMP_6._p || nil, TMP_6._p = null;
      
      
      var result = nil;

      this.$each._p = function(obj) {
        var value;

        if ((value = block(obj)) === __breaker) {
          return __breaker.$v;
        }

        if (value !== false && value !== nil) {
          result      = obj;
          __breaker.$v = nil;

          return __breaker;
        }
      };

      this.$each();

      if (result !== nil) {
        return result;
      }

      if (typeof(ifnone) === 'function') {
        return ((_a = ifnone).$call || $mm('call')).call(_a);
      }

      return ifnone == null ? nil : ifnone;
    
    };

    def.$drop = function(number) {
      
      
      var result  = [],
          current = 0;

      this.$each._p = function(obj) {
        if (number < current) {
          result.push(e);
        }

        current++;
      };

      this.$each()

      return result;
    
    };

    def.$drop_while = TMP_7 = function() {
      var block;
      block = TMP_7._p || nil, TMP_7._p = null;
      
      
      var result = [];

      this.$each._p = function(obj) {
        var value;

        if ((value = block(obj)) === __breaker) {
          return __breaker;
        }

        if (value === false || value === nil) {
          result.push(obj);
          return value;
        }

        return __breaker;
      };

      this.$each();

      return result;
    
    };

    def.$each_slice = TMP_8 = function(n) {
      var block;
      block = TMP_8._p || nil, TMP_8._p = null;
      
      
      var all = [];

      this.$each._p = function(obj) {
        all.push(obj);

        if (all.length == n) {
          block(all.slice(0));
          all = [];
        }
      };

      this.$each();

      // our "last" group, if smaller than n then wont have been yielded
      if (all.length > 0) {
        block(all.slice(0));
      }

      return nil;
    
    };

    def.$each_with_index = TMP_9 = function() {
      var block;
      block = TMP_9._p || nil, TMP_9._p = null;
      
      
      var index = 0;

      this.$each._p = function(obj) {
        var value;

        if ((value = block(obj, index)) === __breaker) {
          return __breaker.$v;
        }

        index++;
      };
      this.$each();

      return nil;
    
    };

    def.$each_with_object = TMP_10 = function(object) {
      var block;
      block = TMP_10._p || nil, TMP_10._p = null;
      
      
      this.$each._p = function(obj) {
        var value;

        if ((value = block(obj, object)) === __breaker) {
          return __breaker.$v;
        }
      };

      this.$each();

      return object;
    
    };

    def.$entries = function() {
      
      
      var result = [];

      this.$each._p = function(obj) {
        result.push(obj);
      };

      this.$each();

      return result;
    
    };

    def.$find = def.$detect;

    def.$find_all = TMP_11 = function() {
      var block;
      block = TMP_11._p || nil, TMP_11._p = null;
      
      
      var result = [];

      this.$each._p = function(obj) {
        var value;

        if ((value = block(obj)) === __breaker) {
          return __breaker.$v;
        }

        if (value !== false && value !== nil) {
          result.push(obj);
        }
      };

      this.$each();

      return result;
    
    };

    def.$find_index = TMP_12 = function(object) {
      var _a, block;
      block = TMP_12._p || nil, TMP_12._p = null;
      
      
      var proc, result = nil, index = 0;

      if (object != null) {
        proc = function (obj) {
          if (((_a = (obj))['$=='] || $mm('==')).call(_a, object)) {
            result = index;
            return __breaker;
          }
          index += 1;
        };
      }
      else {
        proc = function(obj) {
          var value;

          if ((value = block(obj)) === __breaker) {
            return __breaker.$v;
          }

          if (value !== false && value !== nil) {
            result     = index;
            __breaker.$v = index;

            return __breaker;
          }
          index += 1;
        };
      }

      this.$each._p = proc;
      this.$each();

      return result;
    
    };

    def.$first = function(number) {
      
      
      var result = [],
          current = 0,
          proc;

      if (number == null) {
        result = nil;
        proc = function(obj) {
            result = obj; return __breaker;
          };
      } else {
        proc = function(obj) {
            if (number <= current) {
              return __breaker;
            }

            result.push(obj);

            current++;
          };
      }

      this.$each._p = proc;
      this.$each();

      return result;
    
    };

    def.$grep = TMP_13 = function(pattern) {
      var _a, _b, block;
      block = TMP_13._p || nil, TMP_13._p = null;
      
      
      var result = [];

      this.$each._p = (block !== nil
        ? function(obj) {
            var value = ((_a = pattern)['$==='] || $mm('===')).call(_a, obj);

            if (value !== false && value !== nil) {
              if ((value = block(obj)) === __breaker) {
                return __breaker.$v;
              }

              result.push(value);
            }
          }
        : function(obj) {
            var value = ((_b = pattern)['$==='] || $mm('===')).call(_b, obj);

            if (value !== false && value !== nil) {
              result.push(obj);
            }
          });

      this.$each();

      return result;
    
    };

    def.$group_by = TMP_14 = function() {
      var hash = nil, TMP_15, _a, _b, _c, TMP_16, block;
      block = TMP_14._p || nil, TMP_14._p = null;
      
      hash = (_a = ((_b = ((_c = __scope.Hash) == null ? __opal.cm("Hash") : _c)).$new || $mm('new')), _a._p = (TMP_15 = function(h, k) {

        var self = TMP_15._s || this, _a;
        if (h == null) h = nil;
if (k == null) k = nil;

        return ((_a = h)['$[]='] || $mm('[]=')).call(_a, k, [])
      }, TMP_15._s = this, TMP_15), _a).call(_b);
      (_a = ((_c = this).$each || $mm('each')), _a._p = (TMP_16 = function(el) {

        var self = TMP_16._s || this, _a, _b, _c;
        if (el == null) el = nil;

        return ((_a = ((_b = hash)['$[]'] || $mm('[]')).call(_b, ((_c = block).$call || $mm('call')).call(_c, el)))['$<<'] || $mm('<<')).call(_a, el)
      }, TMP_16._s = this, TMP_16), _a).call(_c);
      return hash;
    };

    def.$map = def.$collect;

    def.$select = def.$find_all;

    def.$take = def.$first;

    def.$to_a = def.$entries;

    def.$inject = def.$reduce;
        ;Enumerable._donate(["$all?", "$any?", "$collect", "$reduce", "$count", "$detect", "$drop", "$drop_while", "$each_slice", "$each_with_index", "$each_with_object", "$entries", "$find", "$find_all", "$find_index", "$first", "$grep", "$group_by", "$map", "$select", "$take", "$to_a", "$inject"]);
  })(self)
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  return (function(__base, __super){
    function Enumerator() {};
    Enumerator = __klass(__base, __super, "Enumerator", Enumerator);

    var def = Enumerator.prototype, __scope = Enumerator._scope, _a, _b, TMP_1;
    def.object = def.method = def.args = def.cache = nil;

    ((_a = Enumerator).$include || $mm('include')).call(_a, ((_b = __scope.Enumerable) == null ? __opal.cm("Enumerable") : _b));

    def.$initialize = function(obj, method, args) {
      if (method == null) {
        method = "each"
      }args = __slice.call(arguments, 2);
      this.object = obj;
      this.method = method;
      return this.args = args;
    };

    def.$each = TMP_1 = function() {
      var _a, TMP_2, _b, _c, block;
      block = TMP_1._p || nil, TMP_1._p = null;
      
      if (block === nil) {
        return ((_a = this).$enum_for || $mm('enum_for')).call(_a, "each")
      };
      return (_b = ((_c = this.object).$__send__ || $mm('__send__')), _b._p = (TMP_2 = function(e) {

        var self = TMP_2._s || this, _a;
        if (e == null) e = nil;

        return ((_a = block).$call || $mm('call')).call(_a, e)
      }, TMP_2._s = this, TMP_2), _b).apply(_c, [this.method].concat(this.args));
    };

    def.$next = function() {
      var _a, _b, _c, _d;
      ((_a = this.cache), _a !== false && _a !== nil ? _a : this.cache = ((_b = this).$to_a || $mm('to_a')).call(_b));
      if ((_a = ((_c = this.cache)['$empty?'] || $mm('empty?')).call(_c)) !== false && _a !== nil) {
        ((_a = this).$raise || $mm('raise')).call(_a, ((_d = __scope.StopIteration) == null ? __opal.cm("StopIteration") : _d), "end of enumeration")
      };
      return ((_d = this.cache).$shift || $mm('shift')).call(_d);
    };

    def.$rewind = function() {
      
      this.cache = nil;
      return this;
    };

    return nil;
  })(self, null)
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  return (function(__base, __super){
    function Array() {};
    Array = __klass(__base, __super, "Array", Array);

    var def = Array.prototype, __scope = Array._scope, _a, _b, TMP_1, TMP_3, TMP_4, TMP_5, TMP_6, TMP_7, TMP_8, TMP_9, TMP_10, TMP_11, TMP_12, TMP_13, TMP_14, TMP_15, TMP_16, TMP_17, TMP_18, TMP_19, TMP_20, TMP_21;

    ((_a = Array).$include || $mm('include')).call(_a, ((_b = __scope.Enumerable) == null ? __opal.cm("Enumerable") : _b));

    def._isArray = true;

    Array._defs('$[]', function(objects) {
      objects = __slice.call(arguments, 0);
      return objects
    });

    Array._defs('$new', TMP_1 = function(size, obj) {
      var block;
      block = TMP_1._p || nil, TMP_1._p = null;
      if (obj == null) {
        obj = nil
      }
      
      var arr = [];

      if (size && size._isArray) {
        for (var i = 0; i < size.length; i++) {
          arr[i] = size[i];
        }
      }
      else {
        if (block === nil) {
          for (var i = 0; i < size; i++) {
            arr[i] = obj;
          }
        }
        else {
          for (var i = 0; i < size; i++) {
            arr[i] = block(i);
          }
        }
      }

      return arr;
    
    });

    Array._defs('$try_convert', function(obj) {
      
      
      if (obj._isArray) {
        return obj;
      }

      return nil;
    
    });

    def['$&'] = function(other) {
      
      
      var result = [],
          seen   = {};

      for (var i = 0, length = this.length; i < length; i++) {
        var item = this[i];

        if (!seen[item]) {
          for (var j = 0, length2 = other.length; j < length2; j++) {
            var item2 = other[j];

            if ((item === item2) && !seen[item]) {
              seen[item] = true;

              result.push(item);
            }
          }
        }
      }

      return result;
    
    };

    def['$*'] = function(other) {
      
      
      if (typeof(other) === 'string') {
        return this.join(other);
      }

      var result = [];

      for (var i = 0; i < other; i++) {
        result = result.concat(this);
      }

      return result;
    
    };

    def['$+'] = function(other) {
      
      return this.concat(other);
    };

    def['$-'] = function(other) {
      var TMP_2, _a, _b;
      return (_a = ((_b = this).$reject || $mm('reject')), _a._p = (TMP_2 = function(i) {

        var self = TMP_2._s || this, _a;
        if (i == null) i = nil;

        return ((_a = other)['$include?'] || $mm('include?')).call(_a, i)
      }, TMP_2._s = this, TMP_2), _a).call(_b);
    };

    def['$<<'] = function(object) {
      
      this.push(object);
      return this;
    };

    def['$<=>'] = function(other) {
      var _a, _b, _c;
      
      if (((_a = this).$hash || $mm('hash')).call(_a) === ((_b = other).$hash || $mm('hash')).call(_b)) {
        return 0;
      }

      if (this.length != other.length) {
        return (this.length > other.length) ? 1 : -1;
      }

      for (var i = 0, length = this.length, tmp; i < length; i++) {
        if ((tmp = ((_c = (this[i]))['$<=>'] || $mm('<=>')).call(_c, other[i])) !== 0) {
          return tmp;
        }
      }

      return 0;
    
    };

    def['$=='] = function(other) {
      var _a;
      
      if (!other || (this.length !== other.length)) {
        return false;
      }

      for (var i = 0, length = this.length; i < length; i++) {
        if (!((_a = (this[i]))['$=='] || $mm('==')).call(_a, other[i])) {
          return false;
        }
      }

      return true;
    
    };

    def['$[]'] = function(index, length) {
      var _a;
      
      var size = this.length;

      if (typeof index !== 'number') {
        if (index._isRange) {
          var exclude = index.exclude;
          length      = index.end;
          index       = index.begin;

          if (index > size) {
            return nil;
          }

          if (length < 0) {
            length += size;
          }

          if (!exclude) length += 1;
          return this.slice(index, length);
        }
        else {
          ((_a = this).$raise || $mm('raise')).call(_a, "bad arg for Array#[]");
        }
      }

      if (index < 0) {
        index += size;
      }

      if (length !== undefined) {
        if (length < 0 || index > size || index < 0) {
          return nil;
        }

        return this.slice(index, index + length);
      }
      else {
        if (index >= size || index < 0) {
          return nil;
        }

        return this[index];
      }
    
    };

    def['$[]='] = function(index, value) {
      
      
      var size = this.length;

      if (index < 0) {
        index += size;
      }

      return this[index] = value;
    
    };

    def.$assoc = function(object) {
      var _a;
      
      for (var i = 0, length = this.length, item; i < length; i++) {
        if (item = this[i], item.length && ((_a = (item[0]))['$=='] || $mm('==')).call(_a, object)) {
          return item;
        }
      }

      return nil;
    
    };

    def.$at = function(index) {
      
      
      if (index < 0) {
        index += this.length;
      }

      if (index < 0 || index >= this.length) {
        return nil;
      }

      return this[index];
    
    };

    def.$clear = function() {
      
      this.splice(0, this.length);
      return this;
    };

    def.$clone = function() {
      
      return this.slice();
    };

    def.$collect = TMP_3 = function() {
      var block;
      block = TMP_3._p || nil, TMP_3._p = null;
      
      
      var result = [];

      for (var i = 0, length = this.length, value; i < length; i++) {
        if ((value = block(this[i])) === __breaker) {
          return __breaker.$v;
        }

        result.push(value);
      }

      return result;
    
    };

    def['$collect!'] = TMP_4 = function() {
      var block;
      block = TMP_4._p || nil, TMP_4._p = null;
      
      
      for (var i = 0, length = this.length, val; i < length; i++) {
        if ((val = block(this[i])) === __breaker) {
          return __breaker.$v;
        }

        this[i] = val;
      }
    
      return this;
    };

    def.$compact = function() {
      
      
      var result = [];

      for (var i = 0, length = this.length, item; i < length; i++) {
        if ((item = this[i]) !== nil) {
          result.push(item);
        }
      }

      return result;
    
    };

    def['$compact!'] = function() {
      
      
      var original = this.length;

      for (var i = 0, length = this.length; i < length; i++) {
        if (this[i] === nil) {
          this.splice(i, 1);

          length--;
          i--;
        }
      }

      return this.length === original ? nil : this;
    
    };

    def.$concat = function(other) {
      
      
      for (var i = 0, length = other.length; i < length; i++) {
        this.push(other[i]);
      }
    
      return this;
    };

    def.$count = function(object) {
      var _a;
      
      if (object == null) {
        return this.length;
      }

      var result = 0;

      for (var i = 0, length = this.length; i < length; i++) {
        if (((_a = (this[i]))['$=='] || $mm('==')).call(_a, object)) {
          result++;
        }
      }

      return result;
    
    };

    def.$delete = function(object) {
      var _a;
      
      var original = this.length;

      for (var i = 0, length = original; i < length; i++) {
        if (((_a = (this[i]))['$=='] || $mm('==')).call(_a, object)) {
          this.splice(i, 1);

          length--;
          i--;
        }
      }

      return this.length === original ? nil : object;
    
    };

    def.$delete_at = function(index) {
      
      
      if (index < 0) {
        index += this.length;
      }

      if (index < 0 || index >= this.length) {
        return nil;
      }

      var result = this[index];

      this.splice(index, 1);

      return result;
    
    };

    def.$delete_if = TMP_5 = function() {
      var block;
      block = TMP_5._p || nil, TMP_5._p = null;
      
      
      for (var i = 0, length = this.length, value; i < length; i++) {
        if ((value = block(this[i])) === __breaker) {
          return __breaker.$v;
        }

        if (value !== false && value !== nil) {
          this.splice(i, 1);

          length--;
          i--;
        }
      }
    
      return this;
    };

    def.$drop = function(number) {
      
      return this.slice(number);
    };

    def.$dup = def.$clone;

    def.$each = TMP_6 = function() {
      var _a, block;
      block = TMP_6._p || nil, TMP_6._p = null;
      
      if (block === nil) {
        return ((_a = this).$enum_for || $mm('enum_for')).call(_a, "each")
      };
      for (var i = 0, length = this.length; i < length; i++) {
      if (block.call(null, this[i]) === __breaker) return __breaker.$v;
      };
      return this;
    };

    def.$each_index = TMP_7 = function() {
      var block;
      block = TMP_7._p || nil, TMP_7._p = null;
      
      for (var i = 0, length = this.length; i < length; i++) {
      if (block.call(null, i) === __breaker) return __breaker.$v;
      };
      return this;
    };

    def['$empty?'] = function() {
      
      return !this.length;
    };

    def.$fetch = TMP_8 = function(index, defaults) {
      var _a, _b, block;
      block = TMP_8._p || nil, TMP_8._p = null;
      
      
      var original = index;

      if (index < 0) {
        index += this.length;
      }

      if (index >= 0 && index < this.length) {
        return this[index];
      }

      if (defaults != null) {
        return defaults;
      }

      if (block !== nil) {
        return block(original);
      }

      ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.IndexError) == null ? __opal.cm("IndexError") : _b), "Array#fetch");
    
    };

    def.$fill = TMP_9 = function(obj) {
      var block;
      block = TMP_9._p || nil, TMP_9._p = null;
      
      
      if (block !== nil) {
        for (var i = 0, length = this.length; i < length; i++) {
          this[i] = block(i);
        }
      }
      else {
        for (var i = 0, length = this.length; i < length; i++) {
          this[i] = obj;
        }
      }
    
      return this;
    };

    def.$first = function(count) {
      
      
      if (count != null) {
        return this.slice(0, count);
      }

      return this.length === 0 ? nil : this[0];
    
    };

    def.$flatten = function(level) {
      var _a, _b;
      
      var result = [];

      for (var i = 0, length = this.length, item; i < length; i++) {
        item = this[i];

        if (item._isArray) {
          if (level == null) {
            result = result.concat(((_a = (item)).$flatten || $mm('flatten')).call(_a));
          }
          else if (level === 0) {
            result.push(item);
          }
          else {
            result = result.concat(((_b = (item)).$flatten || $mm('flatten')).call(_b, level - 1));
          }
        }
        else {
          result.push(item);
        }
      }

      return result;
    
    };

    def['$flatten!'] = function(level) {
      var _a, _b;
      
      var size = this.length;
      ((_a = this).$replace || $mm('replace')).call(_a, ((_b = this).$flatten || $mm('flatten')).call(_b, level));

      return size === this.length ? nil : this;
    
    };

    def.$hash = function() {
      
      return this._id || (this._id = Opal.uid());
    };

    def['$include?'] = function(member) {
      var _a;
      
      for (var i = 0, length = this.length; i < length; i++) {
        if (((_a = (this[i]))['$=='] || $mm('==')).call(_a, member)) {
          return true;
        }
      }

      return false;
    
    };

    def.$index = TMP_10 = function(object) {
      var _a, block;
      block = TMP_10._p || nil, TMP_10._p = null;
      
      
      if (object != null) {
        for (var i = 0, length = this.length; i < length; i++) {
          if (((_a = (this[i]))['$=='] || $mm('==')).call(_a, object)) {
            return i;
          }
        }
      }
      else if (block !== nil) {
        for (var i = 0, length = this.length, value; i < length; i++) {
          if ((value = block(this[i])) === __breaker) {
            return __breaker.$v;
          }

          if (value !== false && value !== nil) {
            return i;
          }
        }
      }

      return nil;
    
    };

    def.$insert = function(index, objects) {
      var _a, _b;objects = __slice.call(arguments, 1);
      
      if (objects.length > 0) {
        if (index < 0) {
          index += this.length + 1;

          if (index < 0) {
            ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.IndexError) == null ? __opal.cm("IndexError") : _b), "" + (index) + " is out of bounds");
          }
        }
        if (index > this.length) {
          for (var i = this.length; i < index; i++) {
            this.push(nil);
          }
        }

        this.splice.apply(this, [index, 0].concat(objects));
      }
    
      return this;
    };

    def.$inspect = function() {
      var _a, _b, _c, _d;
      
      var i, inspect, el, el_insp, length, object_id;

      inspect = [];
      object_id = ((_a = this).$object_id || $mm('object_id')).call(_a);
      length = this.length;

      for (i = 0; i < length; i++) {
        el = ((_b = this)['$[]'] || $mm('[]')).call(_b, i);

        // Check object_id to ensure it's not the same array get into an infinite loop
        el_insp = ((_c = (el)).$object_id || $mm('object_id')).call(_c) === object_id ? '[...]' : ((_d = (el)).$inspect || $mm('inspect')).call(_d);

        inspect.push(el_insp);
      }
      return '[' + inspect.join(', ') + ']';
    
    };

    def.$join = function(sep) {
      var _a;if (sep == null) {
        sep = ""
      }
      
      var result = [];

      for (var i = 0, length = this.length; i < length; i++) {
        result.push(((_a = (this[i])).$to_s || $mm('to_s')).call(_a));
      }

      return result.join(sep);
    
    };

    def.$keep_if = TMP_11 = function() {
      var block;
      block = TMP_11._p || nil, TMP_11._p = null;
      
      
      for (var i = 0, length = this.length, value; i < length; i++) {
        if ((value = block(this[i])) === __breaker) {
          return __breaker.$v;
        }

        if (value === false || value === nil) {
          this.splice(i, 1);

          length--;
          i--;
        }
      }
    
      return this;
    };

    def.$last = function(count) {
      var _a, _b, _c, _d;
      
      var length = this.length;
      
      if (count === nil || typeof(count) == 'string') { 
        ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.TypeError) == null ? __opal.cm("TypeError") : _b), "no implicit conversion to integer");
      }
        
      if (typeof(count) == 'object') {
        if (typeof(count['$to_int']) == 'function') {
          count = count['$to_int']();
        } 
        else {
          ((_b = this).$raise || $mm('raise')).call(_b, ((_c = __scope.TypeError) == null ? __opal.cm("TypeError") : _c), "no implicit conversion to integer");
        }
      }
      
      if (count == null) {
        return length === 0 ? nil : this[length - 1];
      }
      else if (count < 0) {
        ((_c = this).$raise || $mm('raise')).call(_c, ((_d = __scope.ArgumentError) == null ? __opal.cm("ArgumentError") : _d), "negative count given");
      }

      if (count > length) {
        count = length;
      }

      return this.slice(length - count, length);
    
    };

    def.$length = function() {
      
      return this.length;
    };

    def.$map = def.$collect;

    def['$map!'] = def['$collect!'];

    def.$pop = function(count) {
      var _a;
      
      var length = this.length;

      if (count == null) {
        return length === 0 ? nil : this.pop();
      }

      if (count < 0) {
        ((_a = this).$raise || $mm('raise')).call(_a, "negative count given");
      }

      return count > length ? this.splice(0, this.length) : this.splice(length - count, length);
    
    };

    def.$push = function(objects) {
      objects = __slice.call(arguments, 0);
      
      for (var i = 0, length = objects.length; i < length; i++) {
        this.push(objects[i]);
      }
    
      return this;
    };

    def.$rassoc = function(object) {
      var _a;
      
      for (var i = 0, length = this.length, item; i < length; i++) {
        item = this[i];

        if (item.length && item[1] !== undefined) {
          if (((_a = (item[1]))['$=='] || $mm('==')).call(_a, object)) {
            return item;
          }
        }
      }

      return nil;
    
    };

    def.$reject = TMP_12 = function() {
      var block;
      block = TMP_12._p || nil, TMP_12._p = null;
      
      
      var result = [];

      for (var i = 0, length = this.length, value; i < length; i++) {
        if ((value = block(this[i])) === __breaker) {
          return __breaker.$v;
        }

        if (value === false || value === nil) {
          result.push(this[i]);
        }
      }
      return result;
    
    };

    def['$reject!'] = TMP_13 = function() {
      var _a, _b, _c, block;
      block = TMP_13._p || nil, TMP_13._p = null;
      
      
      var original = this.length;
      (_b = ((_c = this).$delete_if || $mm('delete_if')), _b._p = ((_a = block).$to_proc || $mm('to_proc')).call(_a), _b).call(_c);
      return this.length === original ? nil : this;
    
    };

    def.$replace = function(other) {
      
      
      this.splice(0, this.length);
      this.push.apply(this, other);
      return this;
    
    };

    def.$reverse = function() {
      
      return this.slice(0).reverse();
    };

    def['$reverse!'] = def.reverse;

    def.$reverse_each = TMP_14 = function() {
      var _a, _b, _c, _d, block;
      block = TMP_14._p || nil, TMP_14._p = null;
      
      (_b = ((_c = ((_d = this).$reverse || $mm('reverse')).call(_d)).$each || $mm('each')), _b._p = ((_a = block).$to_proc || $mm('to_proc')).call(_a), _b).call(_c);
      return this;
    };

    def.$rindex = TMP_15 = function(object) {
      var _a, block;
      block = TMP_15._p || nil, TMP_15._p = null;
      
      
      if (block !== nil) {
        for (var i = this.length - 1, value; i >= 0; i--) {
          if ((value = block(this[i])) === __breaker) {
            return __breaker.$v;
          }

          if (value !== false && value !== nil) {
            return i;
          }
        }
      }
      else {
        for (var i = this.length - 1; i >= 0; i--) {
          if (((_a = (this[i]))['$=='] || $mm('==')).call(_a, object)) {
            return i;
          }
        }
      }

      return nil;
    
    };

    def.$select = TMP_16 = function() {
      var block;
      block = TMP_16._p || nil, TMP_16._p = null;
      
      
      var result = [];

      for (var i = 0, length = this.length, item, value; i < length; i++) {
        item = this[i];

        if ((value = block(item)) === __breaker) {
          return __breaker.$v;
        }

        if (value !== false && value !== nil) {
          result.push(item);
        }
      }

      return result;
    
    };

    def['$select!'] = TMP_17 = function() {
      var _a, _b, _c, block;
      block = TMP_17._p || nil, TMP_17._p = null;
      
      
      var original = this.length;
      (_b = ((_c = this).$keep_if || $mm('keep_if')), _b._p = ((_a = block).$to_proc || $mm('to_proc')).call(_a), _b).call(_c);
      return this.length === original ? nil : this;
    
    };

    def.$shift = function(count) {
      
      
      if (this.length === 0) {
        return nil;
      }

      return count == null ? this.shift() : this.splice(0, count)
    
    };

    def.$size = def.$length;

    def.$shuffle = function() {
      
      
        for (var i = this.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = this[i];
          this[i] = this[j];
          this[j] = tmp;
        }

        return this;
    
    };

    def.$slice = def['$[]'];

    def['$slice!'] = function(index, length) {
      
      
      if (index < 0) {
        index += this.length;
      }

      if (length != null) {
        return this.splice(index, length);
      }

      if (index < 0 || index >= this.length) {
        return nil;
      }

      return this.splice(index, 1)[0];
    
    };

    def.$sort = TMP_18 = function() {
      var block;
      block = TMP_18._p || nil, TMP_18._p = null;
      
      
      var copy = this.slice();

      if (block !== nil) {
        return copy.sort(block);
      }

      return copy.sort();
    
    };

    def['$sort!'] = TMP_19 = function() {
      var block;
      block = TMP_19._p || nil, TMP_19._p = null;
      
      
      if (block !== nil) {
        return this.sort(block);
      }

      return this.sort();
    
    };

    def.$take = function(count) {
      
      return this.slice(0, count);
    };

    def.$take_while = TMP_20 = function() {
      var block;
      block = TMP_20._p || nil, TMP_20._p = null;
      
      
      var result = [];

      for (var i = 0, length = this.length, item, value; i < length; i++) {
        item = this[i];

        if ((value = block(item)) === __breaker) {
          return __breaker.$v;
        }

        if (value === false || value === nil) {
          return result;
        }

        result.push(item);
      }

      return result;
    
    };

    def.$to_a = function() {
      
      return this;
    };

    def.$to_ary = def.$to_a;

    def.$to_json = function() {
      var _a;
      
      var result = [];

      for (var i = 0, length = this.length; i < length; i++) {
        result.push(((_a = (this[i])).$to_json || $mm('to_json')).call(_a));
      }

      return '[' + result.join(', ') + ']';
    
    };

    def.$to_native = function() {
      var _a;
      
      var result = [], obj

      for (var i = 0, len = this.length; i < len; i++) {
        obj = this[i];

        if (obj.$to_native) {
          result.push(((_a = (obj)).$to_native || $mm('to_native')).call(_a));
        }
        else {
          result.push(obj);
        }
      }

      return result;
    
    };

    def.$to_s = def.$inspect;

    def.$uniq = function() {
      
      
      var result = [],
          seen   = {};

      for (var i = 0, length = this.length, item, hash; i < length; i++) {
        item = this[i];
        hash = item;

        if (!seen[hash]) {
          seen[hash] = true;

          result.push(item);
        }
      }

      return result;
    
    };

    def['$uniq!'] = function() {
      
      
      var original = this.length,
          seen     = {};

      for (var i = 0, length = original, item, hash; i < length; i++) {
        item = this[i];
        hash = item;

        if (!seen[hash]) {
          seen[hash] = true;
        }
        else {
          this.splice(i, 1);

          length--;
          i--;
        }
      }

      return this.length === original ? nil : this;
    
    };

    def.$unshift = function(objects) {
      objects = __slice.call(arguments, 0);
      
      for (var i = objects.length - 1; i >= 0; i--) {
        this.unshift(objects[i]);
      }

      return this;
    
    };

    def.$zip = TMP_21 = function(others) {
      var block;
      block = TMP_21._p || nil, TMP_21._p = null;
      others = __slice.call(arguments, 0);
      
      var result = [], size = this.length, part, o;

      for (var i = 0; i < size; i++) {
        part = [this[i]];

        for (var j = 0, jj = others.length; j < jj; j++) {
          o = others[j][i];

          if (o == null) {
            o = nil;
          }

          part[j + 1] = o;
        }

        result[i] = part;
      }

      if (block !== nil) {
        for (var i = 0; i < size; i++) {
          block(result[i]);
        }

        return nil;
      }

      return result;
    
    };

    return nil;
  })(self, Array)
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  return (function(__base, __super){
    function Hash() {};
    Hash = __klass(__base, __super, "Hash", Hash);

    var def = Hash.prototype, __scope = Hash._scope, _a, _b, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_6, TMP_7, TMP_8, TMP_9, TMP_10, TMP_11, TMP_12;
    def.proc = def.none = nil;

    ((_a = Hash).$include || $mm('include')).call(_a, ((_b = __scope.Enumerable) == null ? __opal.cm("Enumerable") : _b));

    
    __hash = Opal.hash = function() {
      var hash   = new Hash,
          args   = __slice.call(arguments),
          keys   = [],
          assocs = {};

      hash.map   = assocs;
      hash.keys  = keys;

      for (var i = 0, length = args.length, key; i < length; i++) {
        var key = args[i], obj = args[++i];

        if (assocs[key] == null) {
          keys.push(key);
        }

        assocs[key] = obj;
      }

      return hash;
    };
  

    
    __hash2 = Opal.hash2 = function(keys, map) {
      var hash = new Hash;
      hash.keys = keys;
      hash.map = map;
      return hash;
    };
  

    var __hasOwn = {}.hasOwnProperty;

    Hash._defs('$[]', function(objs) {
      objs = __slice.call(arguments, 0);
      return __hash.apply(null, objs);
    });

    Hash._defs('$allocate', function() {
      
      return __hash();
    });

    Hash._defs('$from_native', function(obj) {
      
      
      var hash = __hash(), map = hash.map, keys = hash.keys;

      for (var key in obj) {
        keys.push(key);
        map[key] = obj[key];
      }

      return hash;
    
    });

    Hash._defs('$new', TMP_1 = function(defaults) {
      var block;
      block = TMP_1._p || nil, TMP_1._p = null;
      
      
      var hash = __hash();

      if (defaults != null) {
        hash.none = defaults;
      }
      else if (block !== nil) {
        hash.proc = block;
      }

      return hash;
    
    });

    def['$=='] = function(other) {
      var _a, _b;
      
      if (this === other) {
        return true;
      }

      if (!other.map || !other.keys) {
        return false;
      }

      if (this.keys.length !== other.keys.length) {
        return false;
      }

      var map  = this.map,
          map2 = other.map;

      for (var i = 0, length = this.keys.length; i < length; i++) {
        var key = this.keys[i], obj = map[key], obj2 = map2[key];

        if ((_a = ((_b = (obj))['$=='] || $mm('==')).call(_b, obj2), (_a === nil || _a === false))) {
          return false;
        }
      }

      return true;
    
    };

    def['$[]'] = function(key) {
      var _a;
      
      var bucket = this.map[key];

      if (bucket != null) {
        return bucket;
      }

      var proc = this.proc;

      if (proc !== nil) {
        return ((_a = (proc)).$call || $mm('call')).call(_a, this, key);
      }

      return this.none;
    
    };

    def['$[]='] = function(key, value) {
      
      
      var map = this.map;

      if (!__hasOwn.call(map, key)) {
        this.keys.push(key);
      }

      map[key] = value;

      return value;
    
    };

    def.$assoc = function(object) {
      var _a;
      
      var keys = this.keys, key;

      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];

        if (((_a = (key))['$=='] || $mm('==')).call(_a, object)) {
          return [key, this.map[key]];
        }
      }

      return nil;
    
    };

    def.$clear = function() {
      
      
      this.map = {};
      this.keys = [];
      return this;
    
    };

    def.$clone = function() {
      
      
      var result = __hash(),
          map    = this.map,
          map2   = result.map,
          keys2  = result.keys;

      for (var i = 0, length = this.keys.length; i < length; i++) {
        keys2.push(this.keys[i]);
        map2[this.keys[i]] = map[this.keys[i]];
      }

      return result;
    
    };

    def.$default = function(val) {
      
      return this.none;
    };

    def['$default='] = function(object) {
      
      return this.none = object;
    };

    def.$default_proc = function() {
      
      return this.proc;
    };

    def['$default_proc='] = function(proc) {
      
      return this.proc = proc;
    };

    def.$delete = function(key) {
      
      
      var map  = this.map, result = map[key];

      if (result != null) {
        delete map[key];
        this.keys.$delete(key);

        return result;
      }

      return nil;
    
    };

    def.$delete_if = TMP_2 = function() {
      var block;
      block = TMP_2._p || nil, TMP_2._p = null;
      
      
      var map = this.map, keys = this.keys, value;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], obj = map[key];

        if ((value = block(key, obj)) === __breaker) {
          return __breaker.$v;
        }

        if (value !== false && value !== nil) {
          keys.splice(i, 1);
          delete map[key];

          length--;
          i--;
        }
      }

      return this;
    
    };

    def.$dup = def.$clone;

    def.$each = TMP_3 = function() {
      var block;
      block = TMP_3._p || nil, TMP_3._p = null;
      
      
      var map = this.map, keys = this.keys;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];

        if (block(key, map[key]) === __breaker) {
          return __breaker.$v;
        }
      }

      return this;
    
    };

    def.$each_key = TMP_4 = function() {
      var block;
      block = TMP_4._p || nil, TMP_4._p = null;
      
      
      var keys = this.keys;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];

        if (block(key) === __breaker) {
          return __breaker.$v;
        }
      }

      return this;
    
    };

    def.$each_pair = def.$each;

    def.$each_value = TMP_5 = function() {
      var block;
      block = TMP_5._p || nil, TMP_5._p = null;
      
      
      var map = this.map, keys = this.keys;

      for (var i = 0, length = keys.length; i < length; i++) {
        if (block(map[keys[i]]) === __breaker) {
          return __breaker.$v;
        }
      }

      return this;
    
    };

    def['$empty?'] = function() {
      
      
      return this.keys.length === 0;
    
    };

    def['$eql?'] = def['$=='];

    def.$fetch = TMP_6 = function(key, defaults) {
      var _a, _b, block;
      block = TMP_6._p || nil, TMP_6._p = null;
      
      
      var value = this.map[key];

      if (value != null) {
        return value;
      }

      if (block !== nil) {
        var value;

        if ((value = block(key)) === __breaker) {
          return __breaker.$v;
        }

        return value;
      }

      if (defaults != null) {
        return defaults;
      }

      ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.KeyError) == null ? __opal.cm("KeyError") : _b), "key not found");
    
    };

    def.$flatten = function(level) {
      var _a;
      
      var map = this.map, keys = this.keys, result = [];

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], value = map[key];

        result.push(key);

        if (value._isArray) {
          if (level == null || level === 1) {
            result.push(value);
          }
          else {
            result = result.concat(((_a = (value)).$flatten || $mm('flatten')).call(_a, level - 1));
          }
        }
        else {
          result.push(value);
        }
      }

      return result;
    
    };

    def['$has_key?'] = function(key) {
      
      return this.map[key] != null;
    };

    def['$has_value?'] = function(value) {
      var _a;
      
      for (var assoc in this.map) {
        if (((_a = (this.map[assoc]))['$=='] || $mm('==')).call(_a, value)) {
          return true;
        }
      }

      return false;
    
    };

    def.$hash = function() {
      
      return this._id;
    };

    def['$include?'] = def['$has_key?'];

    def.$index = function(object) {
      var _a;
      
      var map = this.map, keys = this.keys;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];

        if (((_a = object)['$=='] || $mm('==')).call(_a, map[key])) {
          return key;
        }
      }

      return nil;
    
    };

    def.$indexes = function(keys) {
      keys = __slice.call(arguments, 0);
      
      var result = [], map = this.map, val;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], val = map[key];

        if (val != null) {
          result.push(val);
        }
        else {
          result.push(this.none);
        }
      }

      return result;
    
    };

    def.$indices = def.$indexes;

    def.$inspect = function() {
      var _a, _b;
      
      var inspect = [], keys = this.keys, map = this.map;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];
        inspect.push(((_a = (key)).$inspect || $mm('inspect')).call(_a) + '=>' + ((_b = (map[key])).$inspect || $mm('inspect')).call(_b));
      }

      return '{' + inspect.join(', ') + '}';
    
    };

    def.$invert = function() {
      
      
      var result = __hash(), keys = this.keys, map = this.map,
          keys2 = result.keys, map2 = result.map;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], obj = map[key];

        keys2.push(obj);
        map2[obj] = key;
      }

      return result;
    
    };

    def.$keep_if = TMP_7 = function() {
      var block;
      block = TMP_7._p || nil, TMP_7._p = null;
      
      
      var map = this.map, keys = this.keys, value;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], obj = map[key];

        if ((value = block(key, obj)) === __breaker) {
          return __breaker.$v;
        }

        if (value === false || value === nil) {
          keys.splice(i, 1);
          delete map[key];

          length--;
          i--;
        }
      }

      return this;
    
    };

    def.$key = def.$index;

    def['$key?'] = def['$has_key?'];

    def.$keys = function() {
      
      
      return this.keys.slice(0);
    
    };

    def.$length = function() {
      
      
      return this.keys.length;
    
    };

    def['$member?'] = def['$has_key?'];

    def.$merge = TMP_8 = function(other) {
      var block;
      block = TMP_8._p || nil, TMP_8._p = null;
      
      
      var keys = this.keys, map = this.map,
          result = __hash(), keys2 = result.keys, map2 = result.map;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];

        keys2.push(key);
        map2[key] = map[key];
      }

      var keys = other.keys, map = other.map;

      if (block === nil) {
        for (var i = 0, length = keys.length; i < length; i++) {
          var key = keys[i];

          if (map2[key] == null) {
            keys2.push(key);
          }

          map2[key] = map[key];
        }
      }
      else {
        for (var i = 0, length = keys.length; i < length; i++) {
          var key = keys[i];

          if (map2[key] == null) {
            keys2.push(key);
            map2[key] = map[key];
          }
          else {
            map2[key] = block(key, map2[key], map[key]);
          }
        }
      }

      return result;
    
    };

    def['$merge!'] = TMP_9 = function(other) {
      var block;
      block = TMP_9._p || nil, TMP_9._p = null;
      
      
      var keys = this.keys, map = this.map,
          keys2 = other.keys, map2 = other.map;

      if (block === nil) {
        for (var i = 0, length = keys2.length; i < length; i++) {
          var key = keys2[i];

          if (map[key] == null) {
            keys.push(key);
          }

          map[key] = map2[key];
        }
      }
      else {
        for (var i = 0, length = keys2.length; i < length; i++) {
          var key = keys2[i];

          if (map[key] == null) {
            keys.push(key);
            map[key] = map2[key];
          }
          else {
            map[key] = block(key, map[key], map2[key]);
          }
        }
      }

      return this;
    
    };

    def.$rassoc = function(object) {
      var _a;
      
      var keys = this.keys, map = this.map;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], obj = map[key];

        if (((_a = (obj))['$=='] || $mm('==')).call(_a, object)) {
          return [key, obj];
        }
      }

      return nil;
    
    };

    def.$reject = TMP_10 = function() {
      var block;
      block = TMP_10._p || nil, TMP_10._p = null;
      
      
      var keys = this.keys, map = this.map,
          result = __hash(), map2 = result.map, keys2 = result.keys;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], obj = map[key], value;

        if ((value = block(key, obj)) === __breaker) {
          return __breaker.$v;
        }

        if (value === false || value === nil) {
          keys2.push(key);
          map2[key] = obj;
        }
      }

      return result;
    
    };

    def.$replace = function(other) {
      
      
      var map = this.map = {}, keys = this.keys = [];

      for (var i = 0, length = other.keys.length; i < length; i++) {
        var key = other.keys[i];
        keys.push(key);
        map[key] = other.map[key];
      }

      return this;
    
    };

    def.$select = TMP_11 = function() {
      var block;
      block = TMP_11._p || nil, TMP_11._p = null;
      
      
      var keys = this.keys, map = this.map,
          result = __hash(), map2 = result.map, keys2 = result.keys;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], obj = map[key], value;

        if ((value = block(key, obj)) === __breaker) {
          return __breaker.$v;
        }

        if (value !== false && value !== nil) {
          keys2.push(key);
          map2[key] = obj;
        }
      }

      return result;
    
    };

    def['$select!'] = TMP_12 = function() {
      var block;
      block = TMP_12._p || nil, TMP_12._p = null;
      
      
      var map = this.map, keys = this.keys, value, result = nil;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], obj = map[key];

        if ((value = block(key, obj)) === __breaker) {
          return __breaker.$v;
        }

        if (value === false || value === nil) {
          keys.splice(i, 1);
          delete map[key];

          length--;
          i--;
          result = this
        }
      }

      return result;
    
    };

    def.$shift = function() {
      
      
      var keys = this.keys, map = this.map;

      if (keys.length) {
        var key = keys[0], obj = map[key];

        delete map[key];
        keys.splice(0, 1);

        return [key, obj];
      }

      return nil;
    
    };

    def.$size = def.$length;

    def.$to_a = function() {
      
      
      var keys = this.keys, map = this.map, result = [];

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];
        result.push([key, map[key]]);
      }

      return result;
    
    };

    def.$to_hash = function() {
      
      return this;
    };

    def.$to_json = function() {
      var _a, _b;
      
      var inspect = [], keys = this.keys, map = this.map;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];
        inspect.push(((_a = (key)).$to_json || $mm('to_json')).call(_a) + ': ' + ((_b = (map[key])).$to_json || $mm('to_json')).call(_b));
      }

      return '{' + inspect.join(', ') + '}';
    
    };

    def.$to_native = function() {
      var _a;
      
      var result = {}, keys = this.keys, map = this.map, bucket, value;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], obj = map[key];

        if (obj.$to_native) {
          result[key] = ((_a = (obj)).$to_native || $mm('to_native')).call(_a);
        }
        else {
          result[key] = obj;
        }
      }

      return result;
    
    };

    def.$to_s = def.$inspect;

    def.$update = def['$merge!'];

    def['$value?'] = function(value) {
      var _a;
      
      var map = this.map;

      for (var assoc in map) {
        var v = map[assoc];
        if (((_a = (v))['$=='] || $mm('==')).call(_a, value)) {
          return true;
        }
      }

      return false;
    
    };

    def.$values_at = def.$indexes;

    def.$values = function() {
      
      
      var map    = this.map,
          result = [];

      for (var key in map) {
        result.push(map[key]);
      }

      return result;
    
    };

    return nil;
  })(self, null)
})(Opal);
(function(__opal) {
  var _a, self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass, __gvars = __opal.gvars;
  (function(__base, __super){
    function String() {};
    String = __klass(__base, __super, "String", String);

    var def = String.prototype, __scope = String._scope, _a, _b, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5;

    ((_a = String).$include || $mm('include')).call(_a, ((_b = __scope.Comparable) == null ? __opal.cm("Comparable") : _b));

    def._isString = true;

    String._defs('$try_convert', function(what) {
      var _a;
      try {
        return ((_a = what).$to_str || $mm('to_str')).call(_a)
      } catch ($err) {
      if (true) {
        nil}
      else { throw $err; }
      }
    });

    String._defs('$new', function(str) {
      if (str == null) {
        str = ""
      }
      
      return new String(str)
    ;
    });

    def['$%'] = function(data) {
      var _a, _b, _c;
      if ((_a = ((_b = data)['$is_a?'] || $mm('is_a?')).call(_b, ((_c = __scope.Array) == null ? __opal.cm("Array") : _c))) !== false && _a !== nil) {
        return ((_a = this).$format || $mm('format')).apply(_a, [this].concat(data))
        } else {
        return ((_c = this).$format || $mm('format')).call(_c, this, data)
      };
    };

    def['$*'] = function(count) {
      
      
      if (count < 1) {
        return '';
      }

      var result  = '',
          pattern = this.valueOf();

      while (count > 0) {
        if (count & 1) {
          result += pattern;
        }

        count >>= 1, pattern += pattern;
      }

      return result;
    
    };

    def['$+'] = function(other) {
      
      return this.toString() + other;
    };

    def['$<=>'] = function(other) {
      
      
      if (typeof other !== 'string') {
        return nil;
      }

      return this > other ? 1 : (this < other ? -1 : 0);
    
    };

    def['$<'] = function(other) {
      
      return this < other;
    };

    def['$<='] = function(other) {
      
      return this <= other;
    };

    def['$>'] = function(other) {
      
      return this > other;
    };

    def['$>='] = function(other) {
      
      return this >= other;
    };

    def['$=='] = function(other) {
      
      return other == String(this);
    };

    def['$==='] = def['$=='];

    def['$=~'] = function(other) {
      var _a, _b;
      
      if (typeof other === 'string') {
        ((_a = this).$raise || $mm('raise')).call(_a, "string given");
      }

      return ((_b = other)['$=~'] || $mm('=~')).call(_b, this);
    
    };

    def['$[]'] = function(index, length) {
      
      
      var size = this.length;

      if (index._isRange) {
        var exclude = index.exclude,
            length  = index.end,
            index   = index.begin;

        if (index < 0) {
          index += size;
        }

        if (length < 0) {
          length += size;
        }

        if (!exclude) {
          length += 1;
        }

        if (index > size) {
          return nil;
        }

        length = length - index;

        if (length < 0) {
          length = 0;
        }

        return this.substr(index, length);
      }

      if (index < 0) {
        index += this.length;
      }

      if (length == null) {
        if (index >= this.length || index < 0) {
          return nil;
        }

        return this.substr(index, 1);
      }

      if (index > this.length || index < 0) {
        return nil;
      }

      return this.substr(index, length);
    
    };

    def.$as_json = function() {
      
      return this;
    };

    def.$capitalize = function() {
      
      return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
    };

    def.$casecmp = function(other) {
      
      
      if (typeof other !== 'string') {
        return other;
      }

      var a = this.toLowerCase(),
          b = other.toLowerCase();

      return a > b ? 1 : (a < b ? -1 : 0);
    
    };

    def.$chars = TMP_1 = function() {
      var __yield;
      __yield = TMP_1._p || nil, TMP_1._p = null;
      
      
      for (var i = 0, length = this.length; i < length; i++) {
        if (__yield.call(null, this.charAt(i)) === __breaker) return __breaker.$v
      }
    
    };

    def.$chomp = function(separator) {
      if (separator == null) {
        separator = __gvars["/"]
      }
      
      if (separator === "\n") {
        return this.replace(/(\n|\r|\r\n)$/, '');
      }
      else if (separator === "") {
        return this.replace(/(\n|\r\n)+$/, '');
      }
      return this.replace(new RegExp(separator + '$'), '');
    
    };

    def.$chop = function() {
      
      return this.substr(0, this.length - 1);
    };

    def.$chr = function() {
      
      return this.charAt(0);
    };

    def.$count = function(str) {
      
      return (this.length - this.replace(new RegExp(str,"g"), '').length) / str.length;
    };

    def.$dasherize = function() {
      
      return this.replace(/[-\s]+/g, '-')
                .replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1-$2')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                .toLowerCase();
    };

    def.$demodulize = function() {
      
      
      var idx = this.lastIndexOf('::');

      if (idx > -1) {
        return this.substr(idx + 2);
      }
      
      return this;
    
    };

    def.$downcase = def.toLowerCase;

    def.$each_char = def.$chars;

    def.$each_line = TMP_2 = function(separator) {
      var __yield;
      __yield = TMP_2._p || nil, TMP_2._p = null;
      if (separator == null) {
        separator = __gvars["/"]
      }
      
      var splitted = this.split(separator);

      for (var i = 0, length = splitted.length; i < length; i++) {
        if (__yield.call(null, splitted[i] + separator) === __breaker) return __breaker.$v
      }
    
    };

    def['$empty?'] = function() {
      
      return this.length === 0;
    };

    def['$end_with?'] = function(suffixes) {
      suffixes = __slice.call(arguments, 0);
      
      for (var i = 0, length = suffixes.length; i < length; i++) {
        var suffix = suffixes[i];

        if (this.lastIndexOf(suffix) === this.length - suffix.length) {
          return true;
        }
      }

      return false;
    
    };

    def['$eql?'] = def['$=='];

    def['$equal?'] = function(val) {
      
      return this.toString() === val.toString();
    };

    def.$getbyte = def.charCodeAt;

    def.$gsub = TMP_3 = function(pattern, replace) {
      var _a, _b, _c, block;
      block = TMP_3._p || nil, TMP_3._p = null;
      
      if ((_a = ((_b = pattern)['$is_a?'] || $mm('is_a?')).call(_b, ((_c = __scope.String) == null ? __opal.cm("String") : _c))) !== false && _a !== nil) {
        pattern = (new RegExp("" + ((_a = ((_c = __scope.Regexp) == null ? __opal.cm("Regexp") : _c)).$escape || $mm('escape')).call(_a, pattern)))
      };
      
      var pattern = pattern.toString(),
          options = pattern.substr(pattern.lastIndexOf('/') + 1) + 'g',
          regexp  = pattern.substr(1, pattern.lastIndexOf('/') - 1);

      this.$sub._p = block;
      return this.$sub(new RegExp(regexp, options), replace);
    
    };

    def.$hash = def.toString;

    def.$hex = function() {
      var _a;
      return ((_a = this).$to_i || $mm('to_i')).call(_a, 16);
    };

    def['$include?'] = function(other) {
      
      return this.indexOf(other) !== -1;
    };

    def.$index = function(what, offset) {
      var _a, _b, _c, _d, _e;
      
      if (!what._isString && !what._isRegexp) {
        throw new Error('type mismatch');
      }

      var result = -1;

      if (offset != null) {
        if (offset < 0) {
          offset = this.length - offset;
        }

        if (((_a = what)['$is_a?'] || $mm('is_a?')).call(_a, ((_b = __scope.Regexp) == null ? __opal.cm("Regexp") : _b))) {
          result = ((_b = ((_c = what)['$=~'] || $mm('=~')).call(_c, this.substr(offset))), _b !== false && _b !== nil ? _b : -1)
        }
        else {
          result = this.substr(offset).indexOf(substr);
        }

        if (result !== -1) {
          result += offset;
        }
      }
      else {
        if (((_b = what)['$is_a?'] || $mm('is_a?')).call(_b, ((_d = __scope.Regexp) == null ? __opal.cm("Regexp") : _d))) {
          result = ((_d = ((_e = what)['$=~'] || $mm('=~')).call(_e, this)), _d !== false && _d !== nil ? _d : -1)
        }
        else {
          result = this.indexOf(substr);
        }
      }

      return result === -1 ? nil : result;
    
    };

    def.$inspect = function() {
      
      
      var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          meta      = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
          };

      escapable.lastIndex = 0;

      return escapable.test(this) ? '"' + this.replace(escapable, function(a) {
        var c = meta[a];

        return typeof c === 'string' ? c :
          '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + this + '"';
  
    };

    def.$intern = function() {
      
      return this;
    };

    def.$lines = def.$each_line;

    def.$length = function() {
      
      return this.length;
    };

    def.$ljust = function(integer, padstr) {
      var _a, _b;if (padstr == null) {
        padstr = " "
      }
      return ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.NotImplementedError) == null ? __opal.cm("NotImplementedError") : _b));
    };

    def.$lstrip = function() {
      
      return this.replace(/^\s*/, '');
    };

    def.$match = TMP_4 = function(pattern, pos) {
      var _a, _b, _c, _d, _e, _f, block;
      block = TMP_4._p || nil, TMP_4._p = null;
      
      return (_b = ((_c = (function() { if ((_d = ((_e = pattern)['$is_a?'] || $mm('is_a?')).call(_e, ((_f = __scope.Regexp) == null ? __opal.cm("Regexp") : _f))) !== false && _d !== nil) {
        return pattern
        } else {
        return (new RegExp("" + ((_d = ((_f = __scope.Regexp) == null ? __opal.cm("Regexp") : _f)).$escape || $mm('escape')).call(_d, pattern)))
      }; return nil; }).call(this)).$match || $mm('match')), _b._p = ((_a = block).$to_proc || $mm('to_proc')).call(_a), _b).call(_c, this, pos);
    };

    def.$next = function() {
      
      
      if (this.length === 0) {
        return "";
      }

      var initial = this.substr(0, this.length - 1);
      var last    = String.fromCharCode(this.charCodeAt(this.length - 1) + 1);

      return initial + last;
    
    };

    def.$ord = function() {
      
      return this.charCodeAt(0);
    };

    def.$partition = function(str) {
      
      
      var result = this.split(str);
      var splitter = (result[0].length === this.length ? "" : str);

      return [result[0], splitter, result.slice(1).join(str.toString())];
    
    };

    def.$reverse = function() {
      
      return this.split('').reverse().join('');
    };

    def.$rstrip = function() {
      
      return this.replace(/\s*$/, '');
    };

    def.$size = def.$length;

    def.$slice = def['$[]'];

    def.$split = function(pattern, limit) {
      var _a;if (pattern == null) {
        pattern = ((_a = __gvars[";"]), _a !== false && _a !== nil ? _a : " ")
      }
      return this.split(pattern, limit);
    };

    def['$start_with?'] = function(prefixes) {
      prefixes = __slice.call(arguments, 0);
      
      for (var i = 0, length = prefixes.length; i < length; i++) {
        if (this.indexOf(prefixes[i]) === 0) {
          return true;
        }
      }

      return false;
    
    };

    def.$strip = function() {
      
      return this.replace(/^\s*/, '').replace(/\s*$/, '');
    };

    def.$sub = TMP_5 = function(pattern, replace) {
      var _a, _b, _c, _d, _e, _f, _g, _h, block;
      block = TMP_5._p || nil, TMP_5._p = null;
      
      
      if (typeof(replace) === 'string') {
        return this.replace(pattern, replace);
      }
      if (block !== nil) {
        return this.replace(pattern, function(str, a) {
          nil;
          return block(str);
        });
      }
      else if (replace !== undefined) {
        if (((_a = replace)['$is_a?'] || $mm('is_a?')).call(_a, ((_b = __scope.Hash) == null ? __opal.cm("Hash") : _b))) {
          return this.replace(pattern, function(str) {
            var value = ((_b = replace)['$[]'] || $mm('[]')).call(_b, ((_c = this).$str || $mm('str')).call(_c));

            return (value == null) ? nil : ((_d = ((_e = this).$value || $mm('value')).call(_e)).$to_s || $mm('to_s')).call(_d);
          });
        }
        else {
          replace = ((_f = ((_g = __scope.String) == null ? __opal.cm("String") : _g)).$try_convert || $mm('try_convert')).call(_f, replace);

          if (replace == null) {
            ((_g = this).$raise || $mm('raise')).call(_g, ((_h = __scope.TypeError) == null ? __opal.cm("TypeError") : _h), "can't convert " + (((_h = replace).$class || $mm('class')).call(_h)) + " into String");
          }

          return this.replace(pattern, replace);
        }
      }
      else {
        return this.replace(pattern, replace.toString());
      }
    
    };

    def.$succ = def.$next;

    def.$sum = function(n) {
      if (n == null) {
        n = 16
      }
      
      var result = 0;

      for (var i = 0, length = this.length; i < length; i++) {
        result += (this.charCodeAt(i) % ((1 << n) - 1));
      }

      return result;
    
    };

    def.$swapcase = function() {
      var _a, _b;
      
      var str = this.replace(/([a-z]+)|([A-Z]+)/g, function($0,$1,$2) {
        return $1 ? $0.toUpperCase() : $0.toLowerCase();
      });

      if (this._klass === String) {
        return str;
      }

      return ((_a = ((_b = this).$class || $mm('class')).call(_b)).$new || $mm('new')).call(_a, str);
    
    };

    def.$to_a = function() {
      
      
      if (this.length === 0) {
        return [];
      }

      return [this];
    
    };

    def.$to_f = function() {
      
      
      var result = parseFloat(this);

      return isNaN(result) ? 0 : result;
    
    };

    def.$to_i = function(base) {
      if (base == null) {
        base = 10
      }
      
      var result = parseInt(this, base);

      if (isNaN(result)) {
        return 0;
      }

      return result;
    
    };

    def.$to_json = def.$inspect;

    def.$to_proc = function() {
      
      
      var name = '$' + this;

      return function(arg) {
        var meth = arg[name];
        return meth ? meth.call(arg) : arg.$method_missing(name);
      };
    
    };

    def.$to_s = def.toString;

    def.$to_str = def.$to_s;

    def.$to_sym = def.$intern;

    def.$underscore = function() {
      
      return this.replace(/[-\s]+/g, '_')
            .replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2')
            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
            .toLowerCase();
    };

    return def.$upcase = def.toUpperCase;
  })(self, String);
  return __scope.Symbol = ((_a = __scope.String) == null ? __opal.cm("String") : _a);
})(Opal);
(function(__opal) {
  var _a, self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  (function(__base, __super){
    function Numeric() {};
    Numeric = __klass(__base, __super, "Numeric", Numeric);

    var def = Numeric.prototype, __scope = Numeric._scope, _a, _b, TMP_1, TMP_2, TMP_3;

    ((_a = Numeric).$include || $mm('include')).call(_a, ((_b = __scope.Comparable) == null ? __opal.cm("Comparable") : _b));

    def._isNumber = true;

    def['$+'] = function(other) {
      
      return this + other;
    };

    def['$-'] = function(other) {
      
      return this - other;
    };

    def['$*'] = function(other) {
      
      return this * other;
    };

    def['$/'] = function(other) {
      
      return this / other;
    };

    def['$%'] = function(other) {
      
      return this % other;
    };

    def['$&'] = function(other) {
      
      return this & other;
    };

    def['$|'] = function(other) {
      
      return this | other;
    };

    def['$^'] = function(other) {
      
      return this ^ other;
    };

    def['$<'] = function(other) {
      
      return this < other;
    };

    def['$<='] = function(other) {
      
      return this <= other;
    };

    def['$>'] = function(other) {
      
      return this > other;
    };

    def['$>='] = function(other) {
      
      return this >= other;
    };

    def['$<<'] = function(count) {
      
      return this << count;
    };

    def['$>>'] = function(count) {
      
      return this >> count;
    };

    def['$+@'] = function() {
      
      return +this;
    };

    def['$-@'] = function() {
      
      return -this;
    };

    def['$~'] = function() {
      
      return ~this;
    };

    def['$**'] = function(other) {
      
      return Math.pow(this, other);
    };

    def['$=='] = function(other) {
      
      return this == other;
    };

    def['$<=>'] = function(other) {
      
      
      if (typeof(other) !== 'number') {
        return nil;
      }

      return this < other ? -1 : (this > other ? 1 : 0);
    
    };

    def.$abs = function() {
      
      return Math.abs(this);
    };

    def.$as_json = function() {
      
      return this;
    };

    def.$ceil = function() {
      
      return Math.ceil(this);
    };

    def.$chr = function() {
      
      return String.fromCharCode(this);
    };

    def.$downto = TMP_1 = function(finish) {
      var block;
      block = TMP_1._p || nil, TMP_1._p = null;
      
      
      for (var i = this; i >= finish; i--) {
        if (block(i) === __breaker) {
          return __breaker.$v;
        }
      }

      return this;
    
    };

    def['$eql?'] = def['$=='];

    def['$even?'] = function() {
      
      return this % 2 === 0;
    };

    def.$floor = function() {
      
      return Math.floor(this);
    };

    def.$hash = function() {
      
      return this.toString();
    };

    def['$integer?'] = function() {
      
      return this % 1 === 0;
    };

    def.$magnitude = def.$abs;

    def.$modulo = def['$%'];

    def.$next = function() {
      
      return this + 1;
    };

    def['$nonzero?'] = function() {
      
      return this === 0 ? nil : this;
    };

    def['$odd?'] = function() {
      
      return this % 2 !== 0;
    };

    def.$ord = function() {
      
      return this;
    };

    def.$pred = function() {
      
      return this - 1;
    };

    def.$succ = def.$next;

    def.$times = TMP_2 = function() {
      var block;
      block = TMP_2._p || nil, TMP_2._p = null;
      
      
      for (var i = 0; i < this; i++) {
        if (block(i) === __breaker) {
          return __breaker.$v;
        }
      }

      return this;
    
    };

    def.$to_f = function() {
      
      return parseFloat(this);
    };

    def.$to_i = function() {
      
      return parseInt(this);
    };

    def.$to_json = function() {
      
      return this.toString();
    };

    def.$to_s = function(base) {
      if (base == null) {
        base = 10
      }
      return this.toString();
    };

    def.$upto = TMP_3 = function(finish) {
      var _a, block;
      block = TMP_3._p || nil, TMP_3._p = null;
      
      if (block === nil) {
        return ((_a = this).$enum_for || $mm('enum_for')).call(_a, "upto", finish)
      };
      
      for (var i = this; i <= finish; i++) {
        if (block(i) === __breaker) {
          return __breaker.$v;
        }
      }

      return this;
    
    };

    def['$zero?'] = function() {
      
      return this == 0;
    };

    return nil;
  })(self, Number);
  return __scope.Fixnum = ((_a = __scope.Numeric) == null ? __opal.cm("Numeric") : _a);
})(Opal);
(function(__opal) {
  var _a, self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  (function(__base, __super){
    function Proc() {};
    Proc = __klass(__base, __super, "Proc", Proc);

    var def = Proc.prototype, __scope = Proc._scope, TMP_1;

    def._isProc = true;

    def.is_lambda = true;

    Proc._defs('$new', TMP_1 = function() {
      var block;
      block = TMP_1._p || nil, TMP_1._p = null;
      
      if (block === nil) no_block_given();
      block.is_lambda = false;
      return block;
    });

    def.$call = function(args) {
      args = __slice.call(arguments, 0);
      
      var result = this.apply(null, args);

      if (result === __breaker) {
        return __breaker.$v;
      }

      return result;
    
    };

    def['$[]'] = def.$call;

    def.$to_proc = function() {
      
      return this;
    };

    def['$lambda?'] = function() {
      
      return !!this.is_lambda;
    };

    def.$arity = function() {
      
      return this.length - 1;
    };

    return nil;
  })(self, Function);
  return (function(__base, __super){
    function Method() {};
    Method = __klass(__base, __super, "Method", Method);

    var def = Method.prototype, __scope = Method._scope;

    return nil
  })(self, ((_a = __scope.Proc) == null ? __opal.cm("Proc") : _a));
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  return (function(__base, __super){
    function Range() {};
    Range = __klass(__base, __super, "Range", Range);

    var def = Range.prototype, __scope = Range._scope, _a, _b, TMP_1;
    def.begin = def.end = nil;

    ((_a = Range).$include || $mm('include')).call(_a, ((_b = __scope.Enumerable) == null ? __opal.cm("Enumerable") : _b));

    
    Range.prototype._isRange = true;

    Opal.range = function(beg, end, exc) {
      var range         = new Range;
          range.begin   = beg;
          range.end     = end;
          range.exclude = exc;

      return range;
    };
  

    def.$begin = function() {
      
      return this.begin
    }, nil;

    def.$end = function() {
      
      return this.end
    }, nil;

    def.$initialize = function(min, max, exclude) {
      if (exclude == null) {
        exclude = false
      }
      this.begin = min;
      this.end = max;
      return this.exclude = exclude;
    };

    def['$=='] = function(other) {
      
      
      if (!other._isRange) {
        return false;
      }

      return this.exclude === other.exclude && this.begin == other.begin && this.end == other.end;
    
    };

    def['$==='] = function(obj) {
      
      return obj >= this.begin && (this.exclude ? obj < this.end : obj <= this.end);
    };

    def['$cover?'] = function(value) {
      var _a, _b, _c, _d, _e, _f;
      return ((_a = ((_b = (this.begin))['$<='] || $mm('<=')).call(_b, value)) ? ((_c = value)['$<='] || $mm('<=')).call(_c, (function() { if ((_d = ((_e = this)['$exclude_end?'] || $mm('exclude_end?')).call(_e)) !== false && _d !== nil) {
        return (_d = this.end, _f = 1, typeof(_d) === 'number' ? _d - _f : _d['$-'](_f))
        } else {
        return this.end;
      }; return nil; }).call(this)) : _a);
    };

    def.$each = TMP_1 = function() {
      var current = nil, _a, _b, _c, _d, _e, _f, block;
      block = TMP_1._p || nil, TMP_1._p = null;
      
      current = ((_a = this).$min || $mm('min')).call(_a);
      while ((_c = (_d = ((_e = current)['$=='] || $mm('==')).call(_e, ((_f = this).$max || $mm('max')).call(_f)), (_d === nil || _d === false))) !== false && _c !== nil){if (block.call(null, current) === __breaker) return __breaker.$v;
      current = ((_c = current).$succ || $mm('succ')).call(_c);};
      if ((_b = ((_d = this)['$exclude_end?'] || $mm('exclude_end?')).call(_d)) === false || _b === nil) {
        if (block.call(null, current) === __breaker) return __breaker.$v
      };
      return this;
    };

    def['$eql?'] = function(other) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if ((_a = ((_b = ((_c = __scope.Range) == null ? __opal.cm("Range") : _c))['$==='] || $mm('===')).call(_b, other)) === false || _a === nil) {
        return false
      };
      return (_a = ((_a = ((_c = ((_d = this)['$exclude_end?'] || $mm('exclude_end?')).call(_d))['$=='] || $mm('==')).call(_c, ((_e = other)['$exclude_end?'] || $mm('exclude_end?')).call(_e))) ? ((_f = (this.begin))['$eql?'] || $mm('eql?')).call(_f, ((_g = other).$begin || $mm('begin')).call(_g)) : _a), _a !== false && _a !== nil ? ((_a = (this.end))['$eql?'] || $mm('eql?')).call(_a, ((_h = other).$end || $mm('end')).call(_h)) : _a);
    };

    def['$exclude_end?'] = function() {
      
      return this.exclude;
    };

    def['$include?'] = function(val) {
      
      return obj >= this.begin && obj <= this.end;
    };

    def.$max = def.$end;

    def.$min = def.$begin;

    def['$member?'] = def['$include?'];

    def.$step = function(n) {
      var _a, _b;if (n == null) {
        n = 1
      }
      return ((_a = this).$raise || $mm('raise')).call(_a, ((_b = __scope.NotImplementedError) == null ? __opal.cm("NotImplementedError") : _b));
    };

    def.$to_s = function() {
      
      return this.begin + (this.exclude ? '...' : '..') + this.end;
    };

    return def.$inspect = def.$to_s;
  })(self, null)
})(Opal);
(function(__opal) {
  var days_of_week = nil, short_days = nil, short_months = nil, long_months = nil, self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  days_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  short_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  short_months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  long_months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (function(__base, __super){
    function Time() {};
    Time = __klass(__base, __super, "Time", Time);

    var def = Time.prototype, __scope = Time._scope, _a, _b;

    ((_a = Time).$include || $mm('include')).call(_a, ((_b = __scope.Comparable) == null ? __opal.cm("Comparable") : _b));

    Time._defs('$at', function(seconds, frac) {
      if (frac == null) {
        frac = 0
      }
      return new Date(seconds * 1000 + frac);
    });

    Time._defs('$new', function(year, month, day, hour, minute, second, millisecond) {
      
      
      switch (arguments.length) {
        case 1:
          return new Date(year);
        case 2:
          return new Date(year, month - 1);
        case 3:
          return new Date(year, month - 1, day);
        case 4:
          return new Date(year, month - 1, day, hour);
        case 5:
          return new Date(year, month - 1, day, hour, minute);
        case 6:
          return new Date(year, month - 1, day, hour, minute, second);
        case 7:
          return new Date(year, month - 1, day, hour, minute, second, millisecond);
        default:
          return new Date();
      }
    
    });

    Time._defs('$now', function() {
      
      return new Date();
    });

    Time._defs('$parse', function(str) {
      
      return Date.parse(str);
    });

    def['$+'] = function(other) {
      var _a, _b, _c, _d, _e;
      return ((_a = ((_b = __scope.Time) == null ? __opal.cm("Time") : _b)).$allocate || $mm('allocate')).call(_a, (_b = ((_d = this).$to_f || $mm('to_f')).call(_d), _c = ((_e = other).$to_f || $mm('to_f')).call(_e), typeof(_b) === 'number' ? _b + _c : _b['$+'](_c)));
    };

    def['$-'] = function(other) {
      var _a, _b, _c, _d, _e;
      return ((_a = ((_b = __scope.Time) == null ? __opal.cm("Time") : _b)).$allocate || $mm('allocate')).call(_a, (_b = ((_d = this).$to_f || $mm('to_f')).call(_d), _c = ((_e = other).$to_f || $mm('to_f')).call(_e), typeof(_b) === 'number' ? _b - _c : _b['$-'](_c)));
    };

    def['$<=>'] = function(other) {
      var _a, _b, _c;
      return ((_a = ((_b = this).$to_f || $mm('to_f')).call(_b))['$<=>'] || $mm('<=>')).call(_a, ((_c = other).$to_f || $mm('to_f')).call(_c));
    };

    def.$day = def.getDate;

    def['$eql?'] = function(other) {
      var _a, _b, _c;
      return (_a = ((_a = other)['$is_a?'] || $mm('is_a?')).call(_a, ((_b = __scope.Time) == null ? __opal.cm("Time") : _b)), _a !== false && _a !== nil ? ((_b = ((_c = this)['$<=>'] || $mm('<=>')).call(_c, other))['$zero?'] || $mm('zero?')).call(_b) : _a);
    };

    def['$friday?'] = function() {
      
      return this.getDay() === 5;
    };

    def.$hour = def.getHours;

    def.$inspect = def.toString;

    def.$mday = def.$day;

    def.$min = def.getMinutes;

    def.$mon = function() {
      
      return this.getMonth() + 1;
    };

    def['$monday?'] = function() {
      
      return this.getDay() === 1;
    };

    def.$month = def.$mon;

    def['$saturday?'] = function() {
      
      return this.getDay() === 6;
    };

    def.$sec = def.getSeconds;

    def.$strftime = function(format) {
      if (format == null) {
        format = ""
      }
      
      var d = this;

      return format.replace(/%(-?.)/g, function(full, m) {
        switch (m) {
          case 'a': return short_days[d.getDay()];
          case 'A': return days_of_week[d.getDay()];
          case 'b': return short_months[d.getMonth()];
          case 'B': return long_months[d.getMonth()];
          case '-d': return d.getDate();
          case 'Y': return d.getFullYear();
          default: return m ;
        }
      });
    
    };

    def['$sunday?'] = function() {
      
      return this.getDay() === 0;
    };

    def['$thursday?'] = function() {
      
      return this.getDay() === 4;
    };

    def.$to_f = function() {
      
      return this.getTime() / 1000;
    };

    def.$to_i = function() {
      
      return parseInt(this.getTime() / 1000);
    };

    def.$to_s = def.$inspect;

    def['$tuesday?'] = function() {
      
      return this.getDay() === 2;
    };

    def.$wday = def.getDay;

    def['$wednesday?'] = function() {
      
      return this.getDay() === 3;
    };

    return def.$year = def.getFullYear;
  })(self, Date);
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __module = __opal.module, __hash2 = __opal.hash2;
  var json_parse = JSON.parse, __hasOwn = Object.prototype.hasOwnProperty;
  return (function(__base){
    function JSON() {};
    JSON = __module(__base, "JSON", JSON);
    var def = JSON.prototype, __scope = JSON._scope;

    JSON._defs('$parse', function(source) {
      
      return to_opal(json_parse(source));
    });

    JSON._defs('$from_object', function(js_object) {
      
      return to_opal(js_object);
    });

    
    function to_opal(value) {
      switch (typeof value) {
        case 'string':
          return value;

        case 'number':
          return value;

        case 'boolean':
          return !!value;

        case 'null':
          return nil;

        case 'object':
          if (!value) return nil;

          if (value._isArray) {
            var arr = [];

            for (var i = 0, ii = value.length; i < ii; i++) {
              arr.push(to_opal(value[i]));
            }

            return arr;
          }
          else {
            var hash = __hash2([], {}), v, map = hash.map, keys = hash.keys;

            for (var k in value) {
              if (__hasOwn.call(value, k)) {
                v = to_opal(value[k]);
                keys.push(k);
                map[k] = v;
              }
            }
          }

          return hash;
      }
    };
  
    
  })(self);
})(Opal);
(function(__opal) {
  var _a, self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  return (function(__base, __super){
    function Native() {};
    Native = __klass(__base, __super, "Native", Native);

    var def = Native.prototype, __scope = Native._scope, TMP_1, TMP_2;
    def['native'] = nil;

    Native._defs('$global', function() {
      var _a, _b, _c;
      if (this.global == null) this.global = nil;

      return ((_a = this.global), _a !== false && _a !== nil ? _a : this.global = ((_b = ((_c = __scope.Native) == null ? __opal.cm("Native") : _c)).$new || $mm('new')).call(_b, Opal.global))
    });

    Native._defs('$[]', function(key) {
      var _a, _b;
      return ((_a = ((_b = this).$global || $mm('global')).call(_b))['$[]'] || $mm('[]')).call(_a, key)
    });

    def.$initialize = function(native$) {
      var _a, _b;
      
      if (native$ == null) {
        ((_a = ((_b = __scope.Kernel) == null ? __opal.cm("Kernel") : _b)).$raise || $mm('raise')).call(_a, "null or undefined passed to Native");
      }
    
      return this['native'] = native$;
    };

    def.$each = TMP_1 = function() {
      var _a, _b, block;
      block = TMP_1._p || nil, TMP_1._p = null;
      
      
      var n = this['native'], value;

      for (var key in n) {
        value = n[key];

        if (value == null) {
          value = nil;
        }
        else if (typeof(value) === 'object') {
          if (!value._klass) {
            value = ((_a = ((_b = __scope.Native) == null ? __opal.cm("Native") : _b)).$new || $mm('new')).call(_a, value);
          }
        }

        block(key, value);
      }
    
    };

    def['$key?'] = function(name) {
      
      return this['native'][name] != null;
    };

    def.$method_missing = TMP_2 = function(symbol, args) {
      var native$ = nil, _a, _b, _c, block;
      block = TMP_2._p || nil, TMP_2._p = null;
      args = __slice.call(arguments, 1);
      native$ = this['native'];
      
      var prop = native$[symbol];

      if (typeof(prop) === 'function') {
        prop = prop.apply(native$, args);

        if (typeof(prop) === 'object' || typeof(prop) === 'function') {
          if (!prop._klass) {
            return ((_a = ((_b = __scope.Native) == null ? __opal.cm("Native") : _b)).$new || $mm('new')).call(_a, prop);
          }
        }

        return prop;
      }
      else if (symbol.charAt(symbol.length - 1) === '=') {
        prop = symbol.slice(0, symbol.length - 1);
        return native$[prop] = args[0];
      }
      else if (prop != null) {
        if (typeof(prop) === 'object') {
          if (!prop._klass) {
            return ((_b = ((_c = __scope.Native) == null ? __opal.cm("Native") : _c)).$new || $mm('new')).call(_b, prop);
          }
        }
        return prop;
      }
    
      return nil;
    };

    def['$[]'] = function(key) {
      
      
      var value = this['native'][key];

      if (value == null) return nil;

      return value;
    
    };

    def['$=='] = function(other) {
      
      return this['native'] === other.native;
    };

    def.$to_a = function() {
      var _a, _b;
      
      var n = this['native'], result;

      if (n.length) {
        result = [];

        for (var i = 0, len = n.length; i < len; i++) {
          result.push(((_a = ((_b = __scope.Native) == null ? __opal.cm("Native") : _b)).$new || $mm('new')).call(_a, n[i]));
        }
      }
      else {
        result = [n];
      }

      return result;
    
    };

    def.$to_native = function() {
      
      return this['native'];
    };

    return nil;
  })(self, ((_a = __scope.BasicObject) == null ? __opal.cm("BasicObject") : _a))
})(Opal);
(function(__opal) {
  var _a, _b, self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, def = self._klass.prototype, __breaker = __opal.breaker, __slice = __opal.slice, __gvars = __opal.gvars;
  __gvars["~"] = nil;
  __gvars["/"] = "\n";
  __gvars["stderr"] = __gvars["stdout"] = ((_a = ((_b = __scope.Object) == null ? __opal.cm("Object") : _b)).$new || $mm('new')).call(_a);
  __scope.RUBY_ENGINE = "opal";
  __scope.RUBY_PLATFORM = "opal";
  self.$to_s = function() {
    
    return "main";
  };
  return self.$include = function(mod) {
    var _a, _b;
    return ((_a = ((_b = __scope.Object) == null ? __opal.cm("Object") : _b)).$include || $mm('include')).call(_a, mod);
  };
})(Opal);
