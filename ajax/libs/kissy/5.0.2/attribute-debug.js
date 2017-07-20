/*
Copyright 2014, modulex-attribute@1.0.2
MIT Licensed
build time: Thu, 16 Oct 2014 04:37:46 GMT
*/
modulex.add("attribute", ["modulex-util","modulex-event-custom"], function(require, exports, module) {
var modulexUtil = require("modulex-util");
var modulexEventCustom = require("modulex-event-custom");
/*
combined modules:
attribute
*/
var attribute;
attribute = function (exports) {
  /**!
   * @ignore
   * attribute management
   * @author yiminghe@gmail.com, lifesinger@gmail.com
   */
  var util = modulexUtil;
  /* global CustomEvent: true */
  var CustomEvent = modulexEventCustom;
  function bind(v) {
    if (v === util.noop) {
      return function () {
      };
    } else {
      return util.bind(v);
    }
  }
  // atomic flag
  var INVALID = {};
  var FALSE = false;
  function normalFn(host, method) {
    if (typeof method === 'string') {
      return host[method];
    }
    return method;
  }
  function getAttrVals(self) {
    return self.__attrVals || (self.__attrVals = {});
  }
  function whenAttrChangeEventName(when, name) {
    return when + util.ucfirst(name) + 'Change';
  }
  // fire attribute value change
  function __fireAttrChange(self, when, name, prevVal, newVal, subAttrName, attrName, data) {
    attrName = attrName || name;
    return self.fire(whenAttrChangeEventName(when, name), util.mix({
      attrName: attrName,
      subAttrName: subAttrName,
      prevVal: prevVal,
      newVal: newVal
    }, data));
  }
  function ensureNonEmpty(obj, name, doNotCreate) {
    var ret = obj[name];
    if (!doNotCreate && !ret) {
      obj[name] = ret = {};
    }
    return ret || {};
  }
  /*
   o, [x,y,z] => o[x][y][z]
   */
  function getValueByPath(o, path) {
    for (var i = 0, len = path.length; o !== undefined && i < len; i++) {
      o = o[path[i]];
    }
    return o;
  }
  /*
   o, [x,y,z], val => o[x][y][z]=val
   */
  function setValueByPath(o, path, val) {
    var len = path.length - 1, s = o;
    if (len >= 0) {
      for (var i = 0; i < len; i++) {
        o = o[path[i]];
      }
      if (o !== undefined) {
        o[path[i]] = val;
      } else {
        s = undefined;
      }
    }
    return s;
  }
  function getPathNamePair(name) {
    var path;
    if (name.indexOf('.') !== -1) {
      path = name.split('.');
      name = path.shift();
    }
    return {
      path: path,
      name: name
    };
  }
  function getValueBySubValue(prevVal, path, value) {
    var tmp = value;
    if (path) {
      if (prevVal === undefined) {
        tmp = {};
      } else {
        tmp = util.clone(prevVal);
      }
      setValueByPath(tmp, path, value);
    }
    return tmp;
  }
  function prepareDefaultSetFn(self, name) {
    var defaultBeforeFns = ensureNonEmpty(self, '__defaultBeforeFns');
    if (defaultBeforeFns[name]) {
      return;
    }
    defaultBeforeFns[name] = 1;
    var beforeChangeEventName = whenAttrChangeEventName('before', name);
    self.publish(beforeChangeEventName, {
      defaultFn: defaultSetFn,
      // only process its own default function
      defaultTargetOnly: true
    });
  }
  function setInternal(self, name, value, opts, attrs) {
    var path, subVal, prevVal, pathNamePair = getPathNamePair(name), fullName = name;
    name = pathNamePair.name;
    path = pathNamePair.path;
    prevVal = self.get(name);
    prepareDefaultSetFn(self, name);
    if (path) {
      subVal = getValueByPath(prevVal, path);
    }
    // if no change, just return
    // pass equal check to fire change event
    if (!opts.force) {
      if (!path && prevVal === value) {
        return undefined;
      } else if (path && subVal === value) {
        return undefined;
      }
    }
    value = getValueBySubValue(prevVal, path, value);
    var beforeEventObject = util.mix({
      attrName: name,
      subAttrName: fullName,
      prevVal: prevVal,
      newVal: value,
      _opts: opts,
      _attrs: attrs,
      target: self
    }, opts.data);
    // check before event
    if (opts.silent) {
      if (FALSE === defaultSetFn.call(self, beforeEventObject)) {
        return FALSE;
      }
    } else {
      if (FALSE === self.fire(whenAttrChangeEventName('before', name), beforeEventObject)) {
        return FALSE;
      }
    }
    return self;
  }
  function defaultSetFn(e) {
    var self = this, value = e.newVal, prevVal = e.prevVal, name = e.attrName, fullName = e.subAttrName, attrs = e._attrs, opts = e._opts;
    // set it
    var ret = self.setInternal(name, value);
    if (ret === FALSE) {
      return ret;
    }
    // fire after event
    if (!opts.silent) {
      value = getAttrVals(self)[name];
      __fireAttrChange(self, 'after', name, prevVal, value, fullName, null, opts.data);
      if (attrs) {
        attrs.push({
          prevVal: prevVal,
          newVal: value,
          attrName: name,
          subAttrName: fullName
        });
      } else {
        __fireAttrChange(self, '', '*', [prevVal], [value], [fullName], [name], opts.data);
      }
    }
    return undefined;
  }
  /**
   * attribute management
   * @class KISSY.Attribute
   */
  function Attribute(config) {
    var self = this, c = self.constructor;
    // save user config
    self.userConfig = config;
    // define
    while (c) {
      addAttrs(self, c.ATTRS);
      c = c.superclass ? c.superclass.constructor : null;
    }
    // initial attr
    initAttrs(self, config);
  }
  Attribute.version = '1.0.2';
  function wrapProtoForSuper(px, SubClass) {
    var hooks = SubClass.__hooks__;
    // in case px contains toString
    if (hooks) {
      for (var p in hooks) {
        if (p in px) {
          px[p] = hooks[p](px[p]);
        }
      }
    }
    util.each(px, function (v, p) {
      if (typeof v === 'function') {
        var wrapped = 0;
        if (v.__owner__) {
          var originalOwner = v.__owner__;
          delete v.__owner__;
          delete v.__name__;
          wrapped = v.__wrapped__ = 1;
          var newV = bind(v);
          newV.__owner__ = originalOwner;
          newV.__name__ = p;
          originalOwner.prototype[p] = newV;
        } else if (v.__wrapped__) {
          wrapped = 1;
        }
        if (wrapped) {
          px[p] = v = bind(v);
        }
        v.__owner__ = SubClass;
        v.__name__ = p;
      }
    });
  }
  function addMembers(px) {
    var self = this;
    wrapProtoForSuper(px, self);
    util.mix(self.prototype, px);
  }
  Attribute.extend = function extend(px, sx) {
    var SubClass, self = this;
    sx = util.merge(sx);
    // px is shared among classes
    px = util.merge(px);
    var hooks, sxHooks = sx.__hooks__;
    if (hooks = self.__hooks__) {
      sxHooks = sx.__hooks__ = sx.__hooks__ || {};
      util.mix(sxHooks, hooks, false);
    }
    var name = sx.name || 'AttributeDerived';
    if (px.hasOwnProperty('constructor')) {
      SubClass = px.constructor;
    } else {
      // debug mode, give the right name for constructor
      if ('@DEBUG@') {
        /*jshint evil: true*/
        SubClass = new Function('return function ' + util.camelCase(name) + '(){ ' + 'this.callSuper.apply(this, arguments);' + '}')();
      } else {
        SubClass = function () {
          this.callSuper.apply(this, arguments);
        };
      }
    }
    px.constructor = SubClass;
    SubClass.__hooks__ = sxHooks;
    wrapProtoForSuper(px, SubClass);
    var inheritedStatics, sxInheritedStatics = sx.inheritedStatics;
    if (inheritedStatics = self.inheritedStatics) {
      sxInheritedStatics = sx.inheritedStatics = sx.inheritedStatics || {};
      util.mix(sxInheritedStatics, inheritedStatics, false);
    }
    util.extend(SubClass, self, px, sx);
    if (sxInheritedStatics) {
      util.mix(SubClass, sxInheritedStatics);
    }
    SubClass.extend = sx.extend || extend;
    SubClass.addMembers = addMembers;
    return SubClass;
  };
  function addAttrs(host, attrs) {
    if (attrs) {
      for (var attr in attrs) {
        // 子类上的 ATTRS 配置优先
        // 父类后加，父类不覆盖子类的相同设置
        // 属性对象会 merge
        // a: {y: {getter: fn}}, b: {y: {value: 3}}
        // b extends a
        // =>
        // b {y: {value: 3, getter: fn}}
        host.addAttr(attr, attrs[attr], false);
      }
    }
  }
  function initAttrs(host, config) {
    if (config) {
      for (var attr in config) {
        // 用户设置会调用 setter/validator 的，但不会触发属性变化事件
        host.setInternal(attr, config[attr]);
      }
    }
  }
  util.augment(Attribute, CustomEvent.Target, {
    INVALID: INVALID,
    callSuper: function () {
      var method, obj, self = this, args = arguments;
      if (typeof self === 'function' && self.__name__) {
        method = self;
        obj = args[0];
        args = Array.prototype.slice.call(args, 1);
      } else {
        /*jshint noarg: false*/
        method = arguments.callee.caller;
        if (method.__wrapped__) {
          method = method.caller;
        }
        obj = self;
      }
      var name = method.__name__;
      if (!name) {
        //S.log('can not find method name for callSuper [' + self.constructor.name + ']: ' + method.toString());
        return undefined;
      }
      var member = method.__owner__.superclass[name];
      if (!member) {
        //S.log('can not find method [' + name + '] for callSuper: ' + method.__owner__.name);
        return undefined;
      }
      return member.apply(obj, args || []);
    },
    /**
     * get un-cloned attr config collections
     * @return {Object}
     * @private
     */
    getAttrs: function () {
      return this.__attrs || (this.__attrs = {});
    },
    /**
     * get un-cloned attr value collections
     * @return {Object}
     */
    getAttrVals: function () {
      var self = this, o = {}, a, attrs = self.getAttrs();
      for (a in attrs) {
        o[a] = self.get(a);
      }
      return o;
    },
    /**
     * Adds an attribute with the provided configuration to the host object.
     * @param {String} name attrName
     * @param {Object} attrConfig The config supports the following properties
     * @param [attrConfig.value] simple object or system native object
     * @param [attrConfig.valueFn] a function which can return current attribute 's default value
     * @param {Function} [attrConfig.setter] call when set attribute 's value
     * pass current attribute 's value as parameter
     * if return value is not undefined,set returned value as real value
     * @param {Function} [attrConfig.getter] call when get attribute 's value
     * pass current attribute 's value as parameter
     * return getter's returned value to invoker
     * @param {Function} [attrConfig.validator]  call before set attribute 's value
     * if return false,cancel this set action
     * @param {Boolean} [override] whether override existing attribute config ,default true
     * @chainable
     */
    addAttr: function (name, attrConfig, override) {
      var self = this, attrs = self.getAttrs(), attr,
        // shadow clone
        cfg = util.merge(attrConfig);
      if (cfg.value && typeof cfg.value === 'object') {
        cfg.value = util.clone(cfg.value);
        console.log('please use valueFn instead of value for ' + name + ' attribute', 'warn');
      }
      if (attr = attrs[name]) {
        util.mix(attr, cfg, override);
      } else {
        attrs[name] = cfg;
      }
      return self;
    },
    /**
     * Configures a group of attributes, and sets initial values.
     * @param {Object} attrConfigs  An object with attribute name/configuration pairs.
     * @param {Object} initialValues user defined initial values
     * @chainable
     */
    addAttrs: function (attrConfigs, initialValues) {
      var self = this;
      util.each(attrConfigs, function (attrConfig, name) {
        self.addAttr(name, attrConfig);
      });
      if (initialValues) {
        self.set(initialValues);
      }
      return self;
    },
    /**
     * Checks if the given attribute has been added to the host.
     * @param {String} name attribute name
     * @return {Boolean}
     */
    hasAttr: function (name) {
      return this.getAttrs().hasOwnProperty(name);
    },
    /**
     * Removes an attribute from the host object.
     * @chainable
     */
    removeAttr: function (name) {
      var self = this;
      var __attrVals = getAttrVals(self);
      var __attrs = self.getAttrs();
      if (self.hasAttr(name)) {
        delete __attrs[name];
        delete __attrVals[name];
      }
      return self;
    },
    /**
     * Sets the value of an attribute.
     * @param {String|Object} name attribute 's name or attribute name and value map
     * @param [value] attribute 's value
     * @param {Object} [opts] some options
     * @param {Boolean} [opts.silent] whether fire change event
     * @param {Function} [opts.error] error handler
     * @return {Boolean} whether pass validator
     */
    set: function (name, value, opts) {
      var self = this, e;
      if (typeof name !== 'string') {
        opts = value;
        opts = opts || {};
        var all = Object(name), attrs = [], errors = [];
        for (name in all) {
          // bulk validation
          // if any one failed,all values are not set
          if ((e = validate(self, name, all[name], all)) !== undefined) {
            errors.push(e);
          }
        }
        if (errors.length) {
          if (opts.error) {
            opts.error(errors);
          }
          return FALSE;
        }
        for (name in all) {
          setInternal(self, name, all[name], opts, attrs);
        }
        var attrNames = [], prevVals = [], newVals = [], subAttrNames = [];
        util.each(attrs, function (attr) {
          prevVals.push(attr.prevVal);
          newVals.push(attr.newVal);
          attrNames.push(attr.attrName);
          subAttrNames.push(attr.subAttrName);
        });
        if (attrNames.length) {
          __fireAttrChange(self, '', '*', prevVals, newVals, subAttrNames, attrNames, opts.data);
        }
        return self;
      }
      opts = opts || {};
      // validator check
      e = validate(self, name, value);
      if (e !== undefined) {
        if (opts.error) {
          opts.error(e);
        }
        return FALSE;
      }
      return setInternal(self, name, value, opts);
    },
    /**
     * internal use, no event involved, just set.
     * override by model
     * @protected
     */
    setInternal: function (name, value) {
      var self = this, setValue,
        // if host does not have meta info corresponding to (name,value)
        // then register on demand in order to collect all data meta info
        // 一定要注册属性元数据，否则其他模块通过 _attrs 不能枚举到所有有效属性
        // 因为属性在声明注册前可以直接设置值
        attrConfig = ensureNonEmpty(self.getAttrs(), name), setter = attrConfig.setter;
      // if setter has effect
      if (setter && (setter = normalFn(self, setter))) {
        setValue = setter.call(self, value, name);
      }
      if (setValue === INVALID) {
        return FALSE;
      }
      if (setValue !== undefined) {
        value = setValue;
      }
      // finally set
      getAttrVals(self)[name] = value;
      return undefined;
    },
    /**
     * Gets the current value of the attribute.
     * @param {String} name attribute 's name
     * @return {*}
     */
    get: function (name) {
      var self = this, dot = '.', path, attrVals = getAttrVals(self), attrConfig, getter, ret;
      if (name.indexOf(dot) !== -1) {
        path = name.split(dot);
        name = path.shift();
      }
      attrConfig = ensureNonEmpty(self.getAttrs(), name, 1);
      getter = attrConfig.getter;
      // get user-set value or default value
      //user-set value takes privilege
      ret = name in attrVals ? attrVals[name] : getDefAttrVal(self, name);
      // invoke getter for this attribute
      if (getter && (getter = normalFn(self, getter))) {
        ret = getter.call(self, ret, name);
      }
      if (!(name in attrVals) && ret !== undefined) {
        attrVals[name] = ret;
      }
      if (path) {
        ret = getValueByPath(ret, path);
      }
      return ret;
    },
    /**
     * Resets the value of an attribute.just reset what addAttr set
     * (not what invoker set when call new Xx(cfg))
     * @param {String} name name of attribute
     * @param {Object} [opts] some options
     * @param {Boolean} [opts.silent] whether fire change event
     * @chainable
     */
    reset: function (name, opts) {
      var self = this;
      if (typeof name === 'string') {
        if (self.hasAttr(name)) {
          // if attribute does not have default value, then set to undefined
          return self.set(name, getDefAttrVal(self, name), opts);
        } else {
          return self;
        }
      }
      opts = name;
      var attrs = self.getAttrs(), values = {};
      // reset all
      for (name in attrs) {
        values[name] = getDefAttrVal(self, name);
      }
      self.set(values, opts);
      return self;
    }
  });
  // get default attribute value from valueFn/value
  function getDefAttrVal(self, name) {
    var attrs = self.getAttrs(), attrConfig = ensureNonEmpty(attrs, name, 1), valFn = attrConfig.valueFn, val;
    if (valFn && (valFn = normalFn(self, valFn))) {
      val = valFn.call(self);
      if (val !== undefined) {
        attrConfig.value = val;
      }
      delete attrConfig.valueFn;
      attrs[name] = attrConfig;
    }
    return attrConfig.value;
  }
  function validate(self, name, value, all) {
    var path, prevVal, pathNamePair;
    pathNamePair = getPathNamePair(name);
    name = pathNamePair.name;
    path = pathNamePair.path;
    if (path) {
      prevVal = self.get(name);
      value = getValueBySubValue(prevVal, path, value);
    }
    var attrConfig = ensureNonEmpty(self.getAttrs(), name), e, validator = attrConfig.validator;
    if (validator && (validator = normalFn(self, validator))) {
      e = validator.call(self, value, name, all);
      // undefined and true validate successfully
      if (e !== undefined && e !== true) {
        return e;
      }
    }
    return undefined;
  }
  exports = Attribute;
  Attribute.version = '1.0.2';
  return exports;
}();
module.exports = attribute;
});