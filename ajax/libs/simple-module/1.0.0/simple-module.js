(function() {
  var Module, Plugin, Widget,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Module = (function() {
    function Module() {}

    Module.extend = function(obj) {
      var key, val, _ref;
      if (!((obj != null) && typeof obj === 'object')) {
        return;
      }
      for (key in obj) {
        val = obj[key];
        if (key !== 'included' && key !== 'extended') {
          this[key] = val;
        }
      }
      return (_ref = obj.extended) != null ? _ref.call(this) : void 0;
    };

    Module.include = function(obj) {
      var key, val, _ref;
      if (!((obj != null) && typeof obj === 'object')) {
        return;
      }
      for (key in obj) {
        val = obj[key];
        if (key !== 'included' && key !== 'extended') {
          this.prototype[key] = val;
        }
      }
      return (_ref = obj.included) != null ? _ref.call(this) : void 0;
    };

    Module.prototype.on = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = $(this)).on.apply(_ref, args);
    };

    Module.prototype.one = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = $(this)).one.apply(_ref, args);
    };

    Module.prototype.off = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = $(this)).off.apply(_ref, args);
    };

    Module.prototype.trigger = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = $(this)).trigger.apply(_ref, args);
    };

    Module.prototype.triggerHandler = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = $(this)).triggerHandler.apply(_ref, args);
    };

    return Module;

  })();

  Widget = (function(_super) {
    __extends(Widget, _super);

    Widget.connect = function(cls) {
      if (typeof cls !== 'function') {
        return;
      }
      if (!cls.className) {
        throw new Error('Widget.connect: lack of class property "className"');
        return;
      }
      if (!this._connectedClasses) {
        this._connectedClasses = [];
      }
      this._connectedClasses.push(cls);
      if (cls.className) {
        return this[cls.className] = cls;
      }
    };

    Widget.prototype._init = function() {};

    Widget.prototype.opts = {};

    function Widget(opts) {
      var cls, instance, instances, name, _base, _i, _len;
      this.opts = $.extend({}, this.opts, opts);
      (_base = this.constructor)._connectedClasses || (_base._connectedClasses = []);
      instances = (function() {
        var _i, _len, _ref, _results;
        _ref = this.constructor._connectedClasses;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cls = _ref[_i];
          name = cls.className.charAt(0).toLowerCase() + cls.className.slice(1);
          _results.push(this[name] = new cls(this));
        }
        return _results;
      }).call(this);
      this._init();
      for (_i = 0, _len = instances.length; _i < _len; _i++) {
        instance = instances[_i];
        if (typeof instance._init === "function") {
          instance._init();
        }
      }
      this.trigger('pluginconnected');
    }

    Widget.prototype.destroy = function() {};

    return Widget;

  })(Module);

  Plugin = (function(_super) {
    __extends(Plugin, _super);

    Plugin.className = 'Plugin';

    Plugin.prototype.opts = {};

    function Plugin(widget) {
      this.widget = widget;
      this.opts = $.extend({}, this.opts, this.widget.opts);
    }

    Plugin.prototype._init = function() {};

    return Plugin;

  })(Module);

  window.Module = Module;

  window.Widget = Widget;

  window.Plugin = Plugin;

}).call(this);
