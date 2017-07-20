/*
Copyright 2014, modulex-base@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:41:19 GMT
*/
modulex.add("base", ["modulex-util","attribute"], function(require, exports, module) {
var modulexUtil = require("modulex-util");
var attribute = require("attribute");
/*
combined modules:
base
*/
var base;
base = function (exports) {
  /**!
   * @ignore
   * KISSY Class System
   * @author yiminghe@gmail.com
   */
  var util = modulexUtil;
  var Attribute = attribute;
  var ucfirst = util.ucfirst, ON_SET = '_onSet', noop = util.noop;
  function __getHook(method, reverse) {
    return function (origFn) {
      return function wrap() {
        var self = this;
        if (reverse) {
          if (origFn !== noop) {
            origFn.apply(self, arguments);
          }
        } else {
          self.callSuper.apply(self, arguments);
        }
        // can not use wrap in old ie
        /*jshint noarg: false*/
        var extensions = arguments.callee.__owner__.__extensions__ || [];
        if (reverse) {
          extensions.reverse();
        }
        callExtensionsMethod(self, extensions, method, arguments);
        if (reverse) {
          self.callSuper.apply(self, arguments);
        } else {
          if (origFn !== noop) {
            origFn.apply(self, arguments);
          }
        }
      };
    };
  }
  //noinspection JSValidateJSDoc
  /**
   * @class Base
   * @mixins base
   *
   * A base class which objects requiring bases, extension, plugin, custom event support can
   * extend.
   * bases configured
   * through the static {@link Base#static-ATTRS} property for each class
   * in the hierarchy will be initialized by Base.
   */
  var Base = Attribute.extend({
    constructor: function () {
      var self = this;
      self.callSuper.apply(self, arguments);
      // setup listeners
      var listeners = self.get('listeners');
      if (listeners) {
        for (var n in listeners) {
          self.on(n, listeners[n]);
        }
      }
      // initializer
      self.initializer();
      // call plugins
      constructPlugins(self);
      callPluginsMethod.call(self, 'pluginInitializer');
      // bind attr change
      self.bindInternal();
      // sync attr
      self.syncInternal();
    },
    initializer: noop,
    __getHook: __getHook,
    __callPluginsMethod: callPluginsMethod,
    /**
     * bind base change event
     * @protected
     */
    bindInternal: function () {
      var self = this, attrs = self.getAttrs(), attr, m;
      for (attr in attrs) {
        m = ON_SET + ucfirst(attr);
        if (self[m]) {
          // 自动绑定事件到对应函数
          self.on('after' + ucfirst(attr) + 'Change', onSetAttrChange);
        }
      }
    },
    /**
     * sync base change event
     * @protected
     */
    syncInternal: function () {
      var self = this, cs = [], i, c = self.constructor, attrs = self.getAttrs();
      while (c) {
        cs.push(c);
        c = c.superclass && c.superclass.constructor;
      }
      cs.reverse();
      // from super class to sub class
      for (i = 0; i < cs.length; i++) {
        var ATTRS = cs[i].ATTRS || {};
        for (var baseName in ATTRS) {
          if (baseName in attrs) {
            var baseValue, onSetMethod;
            var onSetMethodName = ON_SET + ucfirst(baseName);
            // 存在方法，并且用户设置了初始值或者存在默认值，就同步状态
            if ((onSetMethod = self[onSetMethodName]) && // 用户如果设置了显式不同步，就不同步，
              // 比如一些值从 html 中读取，不需要同步再次设置
              attrs[baseName].sync !== 0 && (baseValue = self.get(baseName)) !== undefined) {
              onSetMethod.call(self, baseValue);
            }
          }
        }
      }
    },
    /**
     * plugin a new plugins to current instance
     * @param {Function|Object} plugin
     * @chainable
     */
    plug: function (plugin) {
      var self = this;
      if (typeof plugin === 'function') {
        var Plugin = plugin;
        plugin = new Plugin();
      }
      // initialize plugin
      //noinspection JSUnresolvedVariable
      if (plugin.pluginInitializer) {
        // noinspection JSUnresolvedFunction
        plugin.pluginInitializer(self);
      }
      self.get('plugins').push(plugin);
      return self;
    },
    /**
     * unplug by pluginId or plugin instance.
     * if called with no parameter, then destroy all plugins.
     * @param {Object|String} [plugin]
     * @chainable
     */
    unplug: function (plugin) {
      var plugins = [], self = this, isString = typeof plugin === 'string';
      util.each(self.get('plugins'), function (p) {
        var keep = 0, pluginId;
        if (plugin) {
          if (isString) {
            // user defined takes priority
            pluginId = p.get && p.get('pluginId') || p.pluginId;
            if (pluginId !== plugin) {
              plugins.push(p);
              keep = 1;
            }
          } else {
            if (p !== plugin) {
              plugins.push(p);
              keep = 1;
            }
          }
        }
        if (!keep) {
          p.pluginDestructor(self);
        }
      });
      self.setInternal('plugins', plugins);
      return self;
    },
    /**
     * get specified plugin instance by id
     * @param {String} id pluginId of plugin instance
     * @return {Object}
     */
    getPlugin: function (id) {
      var plugin = null;
      util.each(this.get('plugins'), function (p) {
        // user defined takes priority
        var pluginId = p.get && p.get('pluginId') || p.pluginId;
        if (pluginId === id) {
          plugin = p;
          return false;
        }
        return undefined;
      });
      return plugin;
    },
    destructor: noop,
    destroy: function () {
      var self = this, args = util.makeArray(arguments);
      if (!self.get('destroyed')) {
        callPluginsMethod.call(self, 'pluginDestructor', args);
        self.destructor.apply(self, args);
        self.set('destroyed', true);
        self.fire('destroy');
        self.detach();
      }
    }
  });
  util.mix(Base, {
    version: '1.0.1',
    __hooks__: {
      initializer: __getHook(),
      destructor: __getHook('__destructor', true)
    },
    ATTRS: {
      /**
       * Plugins for current component.
       * @cfg {Function[]/Object[]} plugins
       */
      /**
       * @ignore
       */
      plugins: {
        valueFn: function () {
          return [];
        }
      },
      destroyed: { value: false },
      /**
       * Config listener on created.
       *
       * for example:
       *
       *      {
           *          click:{
           *              context:{x:1},
           *              fn:function(){
           *                  alert(this.x);
           *              }
           *          }
           *      }
       *      // or
       *      {
           *          click:function(){
           *              alert(this.x);
           *          }
           *      }
       *
       * @cfg {Object} listeners
       */
      /**
       * @ignore
       */
      listeners: {}
    },
    /**
     * create a new class from extensions and static/prototype properties/methods.
     * @param {Function[]} [extensions] extension classes
     * @param {Object} [px] key-value map for prototype properties/methods.
     * @param {Object} [sx] key-value map for static properties/methods.
     * @param {String} [sx.name] new Class's name.
     * @return {Function} new class which extend called, it also has a static extend method
     * @static
     *
     * for example:
     *
     *      var Parent = Base.extend({
         *          isParent: 1
         *      });
     *      var Child = Parent.extend({
         *          isChild: 1,
         *          isParent: 0
         *      })
     */
    extend: function extend(extensions, px, sx) {
      if (!util.isArray(extensions)) {
        sx = px;
        px = /**@type {Object} @ignore*/
        extensions;
        extensions = [];
      }
      var SubClass = Attribute.extend.call(this, px, sx);
      SubClass.__extensions__ = extensions;
      // stub hooks for extensions
      baseAddMembers.call(SubClass, {});
      // merge extensions
      if (extensions.length) {
        var attrs = {};
        var prototype = {};
        // [ex1,ex2]，扩展类后面的优先，ex2 定义的覆盖 ex1 定义的
        // 主类最优先
        util.each(extensions.concat(SubClass), function (ext) {
          if (ext) {
            // 合并 ATTRS 到主类
            // 不覆盖主类上的定义(主类位于 constructors 最后)
            // 因为继承层次上扩展类比主类层次高
            // 注意：最好 value 必须是简单对象，自定义 new 出来的对象就会有问题
            // (用 function return 出来)!
            // a {y:{value:2}} b {y:{value:3,getter:fn}}
            // b is a extension of a
            // =>
            // a {y:{value:2,getter:fn}}
            util.each(ext.ATTRS, function (v, name) {
              var av = attrs[name] = attrs[name] || {};
              util.mix(av, v);
            });
            // 方法合并
            var exp = ext.prototype, p;
            for (p in exp) {
              // do not mess with parent class
              if (exp.hasOwnProperty(p)) {
                prototype[p] = exp[p];
              }
            }
          }
        });
        SubClass.ATTRS = attrs;
        prototype.constructor = SubClass;
        util.augment(SubClass, prototype);
      }
      SubClass.extend = sx && sx.extend || extend;
      SubClass.addMembers = baseAddMembers;
      return SubClass;
    }
  });
  var addMembers = Base.addMembers;
  function baseAddMembers(px) {
    var self = this;
    var extensions = self.__extensions__;
    var hooks = self.__hooks__;
    var proto = self.prototype;
    if (extensions.length && hooks) {
      // stub for call extension method
      for (var h in hooks) {
        // do not override current with stub function
        if (proto.hasOwnProperty(h) && !px.hasOwnProperty(h)) {
          continue;
        }
        px[h] = px[h] || noop;
      }
    }
    return addMembers.call(self, px);
  }
  /**
   * The default set of bases which will be available for instances of this class, and
   * their configuration
   *
   * By default if the value is an object literal or an array it will be 'shallow' cloned, to
   * protect the default value.
   *
   *      for example:
   *      @example
   *      {
       *          x:{
       *              value: // default value
       *              valueFn: // default function to get value
       *              getter: // getter function
       *              setter: // setter function
       *          }
       *      }
   *
   * @property ATTRS
   * @member Base
   * @static
   * @type {Object}
   */
  function onSetAttrChange(e) {
    var self = this, method;
    // ignore bubbling
    if (e.target === self) {
      method = self[ON_SET + e.type.slice(5).slice(0, -6)];
      method.call(self, e.newVal, e);
    }
  }
  function constructPlugins(self) {
    var plugins = self.get('plugins'), Plugin;
    util.each(plugins, function (plugin, i) {
      if (typeof plugin === 'function') {
        Plugin = plugin;
        plugins[i] = new Plugin();
      }
    });
  }
  function callPluginsMethod(method, args) {
    var len, fn, self = this, plugins = self.get('plugins');
    args = args || [];
    args = [self].concat(args);
    if (len = plugins.length) {
      for (var i = 0; i < len; i++) {
        fn = plugins[i][method];
        if (fn) {
          fn.apply(plugins[i], args);
        }
      }
    }
  }
  function callExtensionsMethod(self, extensions, method, args) {
    var len;
    if (len = extensions && extensions.length) {
      for (var i = 0; i < len; i++) {
        var fn = extensions[i] && (!method ? extensions[i] : extensions[i].prototype[method]);
        if (fn) {
          fn.apply(self, args || []);
        }
      }
    }
  }
  exports = Base;
  return exports;
}();
module.exports = base;
});