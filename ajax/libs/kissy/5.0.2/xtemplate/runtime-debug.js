/*
Copyright 2014, xtemplate@3.7.1
MIT Licensed
build time: Tue, 02 Dec 2014 03:44:52 GMT
*/
define("xtemplate/runtime", [], function(require, exports, module) {

/*
combined modules:
xtemplate/runtime
xtemplate/runtime/util
xtemplate/runtime/commands
xtemplate/runtime/scope
xtemplate/runtime/linked-buffer
*/
var xtemplateRuntimeUtil, xtemplateRuntimeScope, xtemplateRuntimeLinkedBuffer, xtemplateRuntimeCommands, xtemplateRuntime;
xtemplateRuntimeUtil = function (exports) {
  // http://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
  // http://wonko.com/post/html-escaping
  var htmlEntities = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '`': '&#x60;',
    '/': '&#x2F;',
    '"': '&quot;',
    /*jshint quotmark:false*/
    '\'': '&#x27;'
  };
  var possibleEscapeHtmlReg = /[&<>"'`]/;
  var escapeHtmlReg = getEscapeReg();
  var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g;
  var win = typeof global !== 'undefined' ? global : window;
  function getEscapeReg() {
    var str = '';
    for (var entity in htmlEntities) {
      str += entity + '|';
    }
    str = str.slice(0, -1);
    escapeHtmlReg = new RegExp(str, 'g');
    return escapeHtmlReg;
  }
  var util;
  var toString = Object.prototype.toString;
  exports = util = {
    isArray: Array.isArray || function (obj) {
      return toString.call(obj) === '[object Array]';
    },
    keys: Object.keys || function (o) {
      var result = [];
      var p;
      for (p in o) {
        if (o.hasOwnProperty(p)) {
          result.push(p);
        }
      }
      return result;
    },
    each: function (object, fn, context) {
      if (object) {
        var key, val, keys;
        var i = 0;
        var length = object && object.length;
        var isObj = length === undefined || Object.prototype.toString.call(object) === '[object Function]';
        context = context || null;
        if (isObj) {
          keys = util.keys(object);
          for (; i < keys.length; i++) {
            key = keys[i];
            if (fn.call(context, object[key], key, object) === false) {
              break;
            }
          }
        } else {
          for (val = object[0]; i < length; val = object[++i]) {
            if (fn.call(context, val, i, object) === false) {
              break;
            }
          }
        }
      }
      return object;
    },
    mix: function (t, s) {
      for (var p in s) {
        t[p] = s[p];
      }
      return t;
    },
    globalEval: function (data) {
      if (win.execScript) {
        win.execScript(data);
      } else {
        (function (data) {
          win['eval'].call(win, data);
        }(data));
      }
    },
    substitute: function (str, o, regexp) {
      if (typeof str !== 'string' || !o) {
        return str;
      }
      return str.replace(regexp || SUBSTITUTE_REG, function (match, name) {
        if (match.charAt(0) === '\\') {
          return match.slice(1);
        }
        return o[name] === undefined ? '' : o[name];
      });
    },
    escapeHtml: function (str) {
      str = '' + str;
      if (!possibleEscapeHtmlReg.test(str)) {
        return str;
      }
      return (str + '').replace(escapeHtmlReg, function (m) {
        return htmlEntities[m];
      });
    },
    merge: function () {
      var i = 0;
      var len = arguments.length;
      var ret = {};
      for (; i < len; i++) {
        var arg = arguments[i];
        if (arg) {
          util.mix(ret, arg);
        }
      }
      return ret;
    }
  };
  return exports;
}();
xtemplateRuntimeScope = function (exports) {
  function Scope(data, affix, parent) {
    if (data !== undefined) {
      this.data = data;
    } else {
      this.data = {};
    }
    if (parent) {
      this.parent = parent;
      this.root = parent.root;
    } else {
      this.parent = undefined;
      this.root = this;
    }
    this.affix = affix || {};
    this.ready = false;
  }
  Scope.prototype = {
    isScope: 1,
    constructor: Scope,
    setParent: function (parentScope) {
      this.parent = parentScope;
      this.root = parentScope.root;
    },
    set: function (name, value) {
      this.affix[name] = value;
    },
    setData: function (data) {
      this.data = data;
    },
    getData: function () {
      return this.data;
    },
    mix: function (v) {
      var affix = this.affix;
      for (var name in v) {
        affix[name] = v[name];
      }
    },
    get: function (name) {
      var data = this.data;
      var v;
      var affix = this.affix;
      if (data != null) {
        v = data[name];
      }
      if (v !== undefined) {
        return v;
      }
      return affix[name];
    },
    resolveInternalOuter: function (parts) {
      var part0 = parts[0];
      var v;
      var self = this;
      var scope = self;
      if (part0 === 'this') {
        v = self.data;
      } else if (part0 === 'root') {
        scope = scope.root;
        v = scope.data;
      } else if (part0) {
        do {
          v = scope.get(part0);
        } while (v === undefined && (scope = scope.parent));
      } else {
        return [scope.data];
      }
      return [
        undefined,
        v
      ];
    },
    resolveInternal: function (parts) {
      var ret = this.resolveInternalOuter(parts);
      if (ret.length === 1) {
        return ret[0];
      }
      var i;
      var len = parts.length;
      var v = ret[1];
      if (v === undefined) {
        return undefined;
      }
      for (i = 1; i < len; i++) {
        v = v[parts[i]];
      }
      return v;
    },
    resolveLooseInternal: function (parts) {
      var ret = this.resolveInternalOuter(parts);
      if (ret.length === 1) {
        return ret[0];
      }
      var i;
      var len = parts.length;
      var v = ret[1];
      for (i = 1; v != null && i < len; i++) {
        v = v[parts[i]];
      }
      return v;
    },
    resolveUp: function (parts) {
      return this.parent && this.parent.resolveInternal(parts);
    },
    resolveLooseUp: function (parts) {
      return this.parent && this.parent.resolveLooseInternal(parts);
    },
    resolveOuter: function (parts, depth) {
      var self = this;
      var scope = self;
      var v;
      if (!depth && parts.length === 1) {
        v = self.get(parts[0]);
        if (v !== undefined) {
          return [v];
        } else {
          depth = 1;
        }
      }
      if (depth) {
        while (scope && depth--) {
          scope = scope.parent;
        }
      }
      if (!scope) {
        return [undefined];
      }
      return [
        undefined,
        scope
      ];
    },
    resolveLoose: function (parts, depth) {
      var ret = this.resolveOuter(parts, depth);
      if (ret.length === 1) {
        return ret[0];
      }
      return ret[1].resolveLooseInternal(parts);
    },
    resolve: function (parts, depth) {
      var ret = this.resolveOuter(parts, depth);
      if (ret.length === 1) {
        return ret[0];
      }
      return ret[1].resolveInternal(parts);
    }
  };
  exports = Scope;
  return exports;
}();
xtemplateRuntimeLinkedBuffer = function (exports) {
  var util = xtemplateRuntimeUtil;
  function Buffer(list, next, tpl) {
    this.list = list;
    this.init();
    this.next = next;
    this.ready = false;
    this.tpl = tpl;
  }
  Buffer.prototype = {
    constructor: Buffer,
    isBuffer: 1,
    init: function () {
      this.data = '';
    },
    append: function (data) {
      this.data += data;
      return this;
    },
    write: function (data) {
      if (data != null) {
        if (data.isBuffer) {
          return data;
        } else {
          this.data += data;
        }
      }
      return this;
    },
    writeEscaped: function (data) {
      if (data != null) {
        if (data.isBuffer) {
          return data;
        } else {
          this.data += util.escapeHtml(data);
        }
      }
      return this;
    },
    insert: function () {
      var self = this;
      var list = self.list;
      var tpl = self.tpl;
      var nextFragment = new Buffer(list, self.next, tpl);
      var asyncFragment = new Buffer(list, nextFragment, tpl);
      self.next = asyncFragment;
      self.ready = true;
      return asyncFragment;
    },
    async: function (fn) {
      var asyncFragment = this.insert();
      var nextFragment = asyncFragment.next;
      fn(asyncFragment);
      return nextFragment;
    },
    error: function (e) {
      var callback = this.list.callback;
      if (callback) {
        var tpl = this.tpl;
        if (tpl) {
          if (e instanceof Error) {
          } else {
            e = new Error(e);
          }
          var name = tpl.name;
          var line = tpl.pos.line;
          var errorStr = 'XTemplate error in file: ' + name + ' at line ' + line + ': ';
          e.stack = errorStr + e.stack;
          e.message = errorStr + e.message;
          e.xtpl = {
            pos: { line: line },
            name: name
          };
        }
        this.list.callback = null;
        callback(e, undefined);
      }
    },
    end: function () {
      var self = this;
      if (self.list.callback) {
        self.ready = true;
        self.list.flush();
      }
      return self;
    }
  };
  function LinkedBuffer(callback, config) {
    var self = this;
    self.config = config;
    self.head = new Buffer(self, undefined);
    self.callback = callback;
    this.init();
  }
  LinkedBuffer.prototype = {
    constructor: LinkedBuffer,
    init: function () {
      this.data = '';
    },
    append: function (data) {
      this.data += data;
    },
    end: function () {
      this.callback(null, this.data);
      this.callback = null;
    },
    flush: function () {
      var self = this;
      var fragment = self.head;
      while (fragment) {
        if (fragment.ready) {
          this.data += fragment.data;
        } else {
          self.head = fragment;
          return;
        }
        fragment = fragment.next;
      }
      self.end();
    }
  };
  LinkedBuffer.Buffer = Buffer;
  exports = LinkedBuffer;
  return exports;
}();
xtemplateRuntimeCommands = function (exports) {
  var Scope = xtemplateRuntimeScope;
  var util = xtemplateRuntimeUtil;
  var commands = {
    range: function (scope, option) {
      var params = option.params;
      var start = params[0];
      var end = params[1];
      var step = params[2];
      if (!step) {
        step = start > end ? -1 : 1;
      } else if (start > end && step > 0 || start < end && step < 0) {
        step = -step;
      }
      var ret = [];
      for (var i = start; start < end ? i < end : i > end; i += step) {
        ret.push(i);
      }
      return ret;
    },
    foreach: function (scope, option, buffer) {
      var params = option.params;
      var param0 = params[0];
      var xindexName = params[2] || 'xindex';
      var valueName = params[1];
      var xcount, opScope, affix, xindex;
      if (param0) {
        xcount = param0.length;
        for (xindex = 0; xindex < xcount; xindex++) {
          opScope = new Scope(param0[xindex], {
            xcount: xcount,
            xindex: xindex
          }, scope);
          affix = opScope.affix;
          if (xindexName !== 'xindex') {
            affix[xindexName] = xindex;
            affix.xindex = undefined;
          }
          if (valueName) {
            affix[valueName] = param0[xindex];
          }
          buffer = option.fn(opScope, buffer);
        }
      }
      return buffer;
    },
    forin: function (scope, option, buffer) {
      var params = option.params;
      var param0 = params[0];
      var xindexName = params[2] || 'xindex';
      var valueName = params[1];
      var opScope, affix, name;
      if (param0) {
        for (name in param0) {
          opScope = new Scope(param0[name], { xindex: name }, scope);
          affix = opScope.affix;
          if (xindexName !== 'xindex') {
            affix[xindexName] = name;
            affix.xindex = undefined;
          }
          if (valueName) {
            affix[valueName] = param0[name];
          }
          buffer = option.fn(opScope, buffer);
        }
      }
      return buffer;
    },
    each: function (scope, option, buffer) {
      var params = option.params;
      var param0 = params[0];
      if (param0) {
        if (util.isArray(param0)) {
          return commands.foreach(scope, option, buffer);
        } else {
          return commands.forin(scope, option, buffer);
        }
      }
      return buffer;
    },
    'with': function (scope, option, buffer) {
      var params = option.params;
      var param0 = params[0];
      if (param0) {
        var opScope = new Scope(param0, undefined, scope);
        buffer = option.fn(opScope, buffer);
      }
      return buffer;
    },
    'if': function (scope, option, buffer) {
      var params = option.params;
      var param0 = params[0];
      if (param0) {
        var fn = option.fn;
        if (fn) {
          buffer = fn(scope, buffer);
        }
      } else {
        var matchElseIf = false;
        var elseIfs = option.elseIfs;
        var inverse = option.inverse;
        if (elseIfs) {
          for (var i = 0, len = elseIfs.length; i < len; i++) {
            var elseIf = elseIfs[i];
            matchElseIf = elseIf.test(scope);
            if (matchElseIf) {
              buffer = elseIf.fn(scope, buffer);
              break;
            }
          }
        }
        if (!matchElseIf && inverse) {
          buffer = inverse(scope, buffer);
        }
      }
      return buffer;
    },
    set: function (scope, option, buffer) {
      scope.mix(option.hash);
      return buffer;
    },
    include: 1,
    parse: 1,
    extend: 1,
    block: function (scope, option, buffer) {
      var self = this;
      var runtime = self.runtime;
      var params = option.params;
      var blockName = params[0];
      var type;
      if (params.length === 2) {
        type = params[0];
        blockName = params[1];
      }
      var blocks = runtime.blocks = runtime.blocks || {};
      var head = blocks[blockName], cursor;
      var current = {
        fn: option.fn,
        type: type
      };
      if (!head) {
        blocks[blockName] = current;
      } else if (head.type) {
        if (head.type === 'append') {
          current.next = head;
          blocks[blockName] = current;
        } else if (head.type === 'prepend') {
          var prev;
          cursor = head;
          while (cursor && cursor.type === 'prepend') {
            prev = cursor;
            cursor = cursor.next;
          }
          current.next = cursor;
          prev.next = current;
        }
      }
      if (!runtime.extendTpl) {
        cursor = blocks[blockName];
        while (cursor) {
          if (cursor.fn) {
            buffer = cursor.fn.call(self, scope, buffer);
          }
          cursor = cursor.next;
        }
      }
      return buffer;
    },
    macro: function (scope, option, buffer) {
      var hash = option.hash;
      var params = option.params;
      var macroName = params[0];
      var params1 = params.slice(1);
      var self = this;
      var runtime = self.runtime;
      var macros = runtime.macros = runtime.macros || {};
      var macro = macros[macroName];
      if (option.fn) {
        macros[macroName] = {
          paramNames: params1,
          hash: hash,
          fn: option.fn
        };
      } else if (macro) {
        var paramValues = macro.hash || {};
        var paramNames;
        if (paramNames = macro.paramNames) {
          for (var i = 0, len = paramNames.length; i < len; i++) {
            var p = paramNames[i];
            paramValues[p] = params1[i];
          }
        }
        if (hash) {
          for (var h in hash) {
            paramValues[h] = hash[h];
          }
        }
        var newScope = new Scope(paramValues);
        newScope.root = scope.root;
        buffer = macro.fn.call(self, newScope, buffer);
      } else {
        var error = 'can not find macro: ' + macroName;
        buffer.error(error);
      }
      return buffer;
    }
  };
  commands['debugger'] = function () {
    if ('@DEBUG@') {
      util.globalEval('debugger');
    }
  };
  exports = commands;
  return exports;
}();
xtemplateRuntime = function (exports) {
  var util = xtemplateRuntimeUtil;
  var nativeCommands = xtemplateRuntimeCommands;
  var commands = {};
  var Scope = xtemplateRuntimeScope;
  var LinkedBuffer = xtemplateRuntimeLinkedBuffer;
  function TplWrap(name, runtime, root, scope, buffer, originalName, fn, parent) {
    this.name = name;
    this.originalName = originalName || name;
    this.runtime = runtime;
    this.root = root;
    this.pos = { line: 1 };
    this.scope = scope;
    this.buffer = buffer;
    this.fn = fn;
    this.parent = parent;
  }
  function findCommand(runtimeCommands, instanceCommands, parts) {
    var name = parts[0];
    var cmd = runtimeCommands && runtimeCommands[name] || instanceCommands && instanceCommands[name] || commands[name];
    if (parts.length === 1) {
      return cmd;
    }
    if (cmd) {
      var len = parts.length;
      for (var i = 1; i < len; i++) {
        cmd = cmd[parts[i]];
        if (!cmd) {
          return false;
        }
      }
    }
    return cmd;
  }
  function getSubNameFromParentName(parentName, subName) {
    var parts = parentName.split('/');
    var subParts = subName.split('/');
    parts.pop();
    for (var i = 0, l = subParts.length; i < l; i++) {
      var subPart = subParts[i];
      if (subPart === '.') {
      } else if (subPart === '..') {
        parts.pop();
      } else {
        parts.push(subPart);
      }
    }
    return parts.join('/');
  }
  function callFn(tpl, scope, option, buffer, parts, depth) {
    var caller, fn, command1;
    if (!depth) {
      command1 = findCommand(tpl.runtime.commands, tpl.root.config.commands, parts);
    }
    if (command1) {
      return command1.call(tpl, scope, option, buffer);
    } else if (command1 !== false) {
      caller = scope.resolve(parts.slice(0, -1), depth);
      fn = caller[parts[parts.length - 1]];
      if (fn) {
        return fn.apply(caller, option.params);
      }
    }
    buffer.error('Command Not Found: ' + parts.join('.'));
    return buffer;
  }
  var utils = {
    callFn: callFn,
    callCommand: function (tpl, scope, option, buffer, parts) {
      return callFn(tpl, scope, option, buffer, parts);
    }
  };
  function XTemplateRuntime(fn, config) {
    var self = this;
    self.fn = fn;
    self.config = util.merge(XTemplateRuntime.globalConfig, config);
    this.subNameResolveCache = {};
  }
  util.mix(XTemplateRuntime, {
    config: function (key, v) {
      var globalConfig = this.globalConfig = this.globalConfig || {};
      if (arguments.length) {
        if (v !== undefined) {
          globalConfig[key] = v;
        } else {
          util.mix(globalConfig, key);
        }
      } else {
        return globalConfig;
      }
    },
    version: '3.7.1',
    nativeCommands: nativeCommands,
    utils: utils,
    util: util,
    addCommand: function (commandName, fn) {
      commands[commandName] = fn;
    },
    removeCommand: function (commandName) {
      delete commands[commandName];
    }
  });
  function resolve(self, subName, parentName) {
    if (subName.charAt(0) !== '.') {
      return subName;
    }
    var key = parentName + '_ks_' + subName;
    var nameResolveCache = self.subNameResolveCache;
    var cached = nameResolveCache[key];
    if (cached) {
      return cached;
    }
    subName = nameResolveCache[key] = getSubNameFromParentName(parentName, subName);
    return subName;
  }
  function includeInternal(self, scope, escape, buffer, tpl, originalName) {
    var name = resolve(self, originalName, tpl.name);
    var newBuffer = buffer.insert();
    var next = newBuffer.next;
    loadInternal(self, name, tpl.runtime, scope, newBuffer, originalName, escape, buffer.tpl);
    return next;
  }
  function includeModuleInternal(self, scope, buffer, tpl, tplFn) {
    var newBuffer = buffer.insert();
    var next = newBuffer.next;
    var newTpl = new TplWrap(tplFn.TPL_NAME, tpl.runtime, self, scope, newBuffer, undefined, tplFn, buffer.tpl);
    newBuffer.tpl = newTpl;
    renderTpl(newTpl);
    return next;
  }
  function loadInternal(self, name, runtime, scope, buffer, originalName, escape, parentTpl) {
    var tpl = new TplWrap(name, runtime, self, scope, buffer, originalName, undefined, parentTpl);
    buffer.tpl = tpl;
    self.config.loader.load(tpl, function (error, tplFn) {
      if (typeof tplFn === 'function') {
        tpl.fn = tplFn;
        renderTpl(tpl);
      } else if (error) {
        buffer.error(error);
      } else {
        tplFn = tplFn || '';
        if (escape) {
          buffer.writeEscaped(tplFn);
        } else {
          buffer.data += tplFn;
        }
        buffer.end();
      }
    });
  }
  function renderTpl(tpl) {
    var buffer = tpl.fn();
    if (buffer) {
      var runtime = tpl.runtime;
      var extendTpl = runtime.extendTpl;
      var extendTplName;
      if (extendTpl) {
        extendTplName = extendTpl.params[0];
        if (!extendTplName) {
          return buffer.error('extend command required a non-empty parameter');
        }
      }
      var extendTplFn = runtime.extendTplFn;
      var extendTplBuffer = runtime.extendTplBuffer;
      if (extendTplFn) {
        runtime.extendTpl = null;
        runtime.extendTplBuffer = null;
        runtime.extendTplFn = null;
        includeModuleInternal(tpl.root, tpl.scope, extendTplBuffer, tpl, extendTplFn).end();
      } else if (extendTplName) {
        runtime.extendTpl = null;
        runtime.extendTplBuffer = null;
        includeInternal(tpl.root, tpl.scope, 0, extendTplBuffer, tpl, extendTplName).end();
      }
      return buffer.end();
    }
  }
  XTemplateRuntime.prototype = {
    constructor: XTemplateRuntime,
    Scope: Scope,
    nativeCommands: nativeCommands,
    utils: utils,
    removeCommand: function (commandName) {
      var config = this.config;
      if (config.commands) {
        delete config.commands[commandName];
      }
    },
    addCommand: function (commandName, fn) {
      var config = this.config;
      config.commands = config.commands || {};
      config.commands[commandName] = fn;
    },
    include: function (scope, option, buffer, tpl) {
      var params = option.params;
      var newScope;
      newScope = scope;
      var hash = option.hash;
      var escape = option && option.escape;
      if (hash) {
        newScope = new Scope(hash, undefined, scope);
      }
      if (!params[0]) {
        return buffer.error('include command required a non-empty parameter');
      }
      buffer = includeInternal(this, newScope, escape, buffer, tpl, params[0]);
      return buffer;
    },
    includeModule: function (scope, option, buffer, tpl) {
      var params = option.params;
      var newScope = scope;
      var hash = option.hash;
      if (hash) {
        newScope = new Scope(hash, undefined, scope);
      }
      if (!params[0]) {
        return buffer.error('include command required a non-empty parameter');
      }
      buffer = includeModuleInternal(this, newScope, buffer, tpl, params[0]);
      return buffer;
    },
    render: function (data, option, callback) {
      var html = '';
      var self = this;
      var fn = self.fn;
      var config = self.config;
      if (typeof option === 'function') {
        callback = option;
        option = null;
      }
      option = option || {};
      callback = callback || function (error, ret) {
        if (error) {
          if (!(error instanceof Error)) {
            error = new Error(error);
          }
          throw error;
        }
        html = ret;
      };
      var name = self.config.name;
      if (!name && fn && fn.TPL_NAME) {
        name = fn.TPL_NAME;
      }
      var scope;
      if (data instanceof Scope) {
        scope = data;
      } else {
        scope = new Scope(data);
      }
      var buffer = new XTemplateRuntime.LinkedBuffer(callback, config).head;
      var tpl = new TplWrap(name, { commands: option.commands }, self, scope, buffer, name, fn);
      buffer.tpl = tpl;
      if (!fn) {
        config.loader.load(tpl, function (err, fn) {
          if (fn) {
            tpl.fn = self.fn = fn;
            renderTpl(tpl);
          } else if (err) {
            buffer.error(err);
          }
        });
        return html;
      }
      renderTpl(tpl);
      return html;
    }
  };
  XTemplateRuntime.Scope = Scope;
  XTemplateRuntime.LinkedBuffer = LinkedBuffer;
  exports = XTemplateRuntime;
  return exports;
}();
module.exports = xtemplateRuntime;
});