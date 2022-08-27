(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.keyboardJS = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var KeyCombo = /*#__PURE__*/function () {
    function KeyCombo(keyComboStr) {
      _classCallCheck(this, KeyCombo);

      this.sourceStr = keyComboStr;
      this.subCombos = KeyCombo.parseComboStr(keyComboStr);
      this.keyNames = this.subCombos.reduce(function (memo, nextSubCombo) {
        return memo.concat(nextSubCombo);
      }, []);
    }

    _createClass(KeyCombo, [{
      key: "check",
      value: function check(pressedKeyNames) {
        var startingKeyNameIndex = 0;

        for (var i = 0; i < this.subCombos.length; i += 1) {
          startingKeyNameIndex = this._checkSubCombo(this.subCombos[i], startingKeyNameIndex, pressedKeyNames);

          if (startingKeyNameIndex === -1) {
            return false;
          }
        }

        return true;
      }
    }, {
      key: "isEqual",
      value: function isEqual(otherKeyCombo) {
        if (!otherKeyCombo || typeof otherKeyCombo !== 'string' && _typeof(otherKeyCombo) !== 'object') {
          return false;
        }

        if (typeof otherKeyCombo === 'string') {
          otherKeyCombo = new KeyCombo(otherKeyCombo);
        }

        if (this.subCombos.length !== otherKeyCombo.subCombos.length) {
          return false;
        }

        for (var i = 0; i < this.subCombos.length; i += 1) {
          if (this.subCombos[i].length !== otherKeyCombo.subCombos[i].length) {
            return false;
          }
        }

        for (var _i = 0; _i < this.subCombos.length; _i += 1) {
          var subCombo = this.subCombos[_i];

          var otherSubCombo = otherKeyCombo.subCombos[_i].slice(0);

          for (var j = 0; j < subCombo.length; j += 1) {
            var keyName = subCombo[j];
            var index = otherSubCombo.indexOf(keyName);

            if (index > -1) {
              otherSubCombo.splice(index, 1);
            }
          }

          if (otherSubCombo.length !== 0) {
            return false;
          }
        }

        return true;
      }
    }, {
      key: "_checkSubCombo",
      value: function _checkSubCombo(subCombo, startingKeyNameIndex, pressedKeyNames) {
        subCombo = subCombo.slice(0);
        pressedKeyNames = pressedKeyNames.slice(startingKeyNameIndex);
        var endIndex = startingKeyNameIndex;

        for (var i = 0; i < subCombo.length; i += 1) {
          var keyName = subCombo[i];

          if (keyName[0] === '\\') {
            var escapedKeyName = keyName.slice(1);

            if (escapedKeyName === KeyCombo.comboDeliminator || escapedKeyName === KeyCombo.keyDeliminator) {
              keyName = escapedKeyName;
            }
          }

          var index = pressedKeyNames.indexOf(keyName);

          if (index > -1) {
            subCombo.splice(i, 1);
            i -= 1;

            if (index > endIndex) {
              endIndex = index;
            }

            if (subCombo.length === 0) {
              return endIndex;
            }
          }
        }

        return -1;
      }
    }]);

    return KeyCombo;
  }();
  KeyCombo.comboDeliminator = '>';
  KeyCombo.keyDeliminator = '+';

  KeyCombo.parseComboStr = function (keyComboStr) {
    var subComboStrs = KeyCombo._splitStr(keyComboStr, KeyCombo.comboDeliminator);

    var combo = [];

    for (var i = 0; i < subComboStrs.length; i += 1) {
      combo.push(KeyCombo._splitStr(subComboStrs[i], KeyCombo.keyDeliminator));
    }

    return combo;
  };

  KeyCombo._splitStr = function (str, deliminator) {
    var s = str;
    var d = deliminator;
    var c = '';
    var ca = [];

    for (var ci = 0; ci < s.length; ci += 1) {
      if (ci > 0 && s[ci] === d && s[ci - 1] !== '\\') {
        ca.push(c.trim());
        c = '';
        ci += 1;
      }

      c += s[ci];
    }

    if (c) {
      ca.push(c.trim());
    }

    return ca;
  };

  var Locale = /*#__PURE__*/function () {
    function Locale(name) {
      _classCallCheck(this, Locale);

      this.localeName = name;
      this.activeTargetKeys = [];
      this.pressedKeys = [];
      this._appliedMacros = [];
      this._keyMap = {};
      this._killKeyCodes = [];
      this._macros = [];
    }

    _createClass(Locale, [{
      key: "bindKeyCode",
      value: function bindKeyCode(keyCode, keyNames) {
        if (typeof keyNames === 'string') {
          keyNames = [keyNames];
        }

        this._keyMap[keyCode] = keyNames;
      }
    }, {
      key: "bindMacro",
      value: function bindMacro(keyComboStr, keyNames) {
        if (typeof keyNames === 'string') {
          keyNames = [keyNames];
        }

        var handler = null;

        if (typeof keyNames === 'function') {
          handler = keyNames;
          keyNames = null;
        }

        var macro = {
          keyCombo: new KeyCombo(keyComboStr),
          keyNames: keyNames,
          handler: handler
        };

        this._macros.push(macro);
      }
    }, {
      key: "getKeyCodes",
      value: function getKeyCodes(keyName) {
        var keyCodes = [];

        for (var keyCode in this._keyMap) {
          var index = this._keyMap[keyCode].indexOf(keyName);

          if (index > -1) {
            keyCodes.push(keyCode | 0);
          }
        }

        return keyCodes;
      }
    }, {
      key: "getKeyNames",
      value: function getKeyNames(keyCode) {
        return this._keyMap[keyCode] || [];
      }
    }, {
      key: "setKillKey",
      value: function setKillKey(keyCode) {
        if (typeof keyCode === 'string') {
          var keyCodes = this.getKeyCodes(keyCode);

          for (var i = 0; i < keyCodes.length; i += 1) {
            this.setKillKey(keyCodes[i]);
          }

          return;
        }

        this._killKeyCodes.push(keyCode);
      }
    }, {
      key: "pressKey",
      value: function pressKey(keyCode) {
        if (typeof keyCode === 'string') {
          var keyCodes = this.getKeyCodes(keyCode);

          for (var i = 0; i < keyCodes.length; i += 1) {
            this.pressKey(keyCodes[i]);
          }

          return;
        }

        this.activeTargetKeys.length = 0;
        var keyNames = this.getKeyNames(keyCode);

        for (var _i = 0; _i < keyNames.length; _i += 1) {
          this.activeTargetKeys.push(keyNames[_i]);

          if (this.pressedKeys.indexOf(keyNames[_i]) === -1) {
            this.pressedKeys.push(keyNames[_i]);
          }
        }

        this._applyMacros();
      }
    }, {
      key: "releaseKey",
      value: function releaseKey(keyCode) {
        if (typeof keyCode === 'string') {
          var keyCodes = this.getKeyCodes(keyCode);

          for (var i = 0; i < keyCodes.length; i += 1) {
            this.releaseKey(keyCodes[i]);
          }
        } else {
          var keyNames = this.getKeyNames(keyCode);

          var killKeyCodeIndex = this._killKeyCodes.indexOf(keyCode);

          if (killKeyCodeIndex !== -1) {
            this.pressedKeys.length = 0;
          } else {
            for (var _i2 = 0; _i2 < keyNames.length; _i2 += 1) {
              var index = this.pressedKeys.indexOf(keyNames[_i2]);

              if (index > -1) {
                this.pressedKeys.splice(index, 1);
              }
            }
          }

          this.activeTargetKeys.length = 0;

          this._clearMacros();
        }
      }
    }, {
      key: "_applyMacros",
      value: function _applyMacros() {
        var macros = this._macros.slice(0);

        for (var i = 0; i < macros.length; i += 1) {
          var macro = macros[i];

          if (macro.keyCombo.check(this.pressedKeys)) {
            if (macro.handler) {
              macro.keyNames = macro.handler(this.pressedKeys);
            }

            for (var j = 0; j < macro.keyNames.length; j += 1) {
              if (this.pressedKeys.indexOf(macro.keyNames[j]) === -1) {
                this.pressedKeys.push(macro.keyNames[j]);
              }
            }

            this._appliedMacros.push(macro);
          }
        }
      }
    }, {
      key: "_clearMacros",
      value: function _clearMacros() {
        for (var i = 0; i < this._appliedMacros.length; i += 1) {
          var macro = this._appliedMacros[i];

          if (!macro.keyCombo.check(this.pressedKeys)) {
            for (var j = 0; j < macro.keyNames.length; j += 1) {
              var index = this.pressedKeys.indexOf(macro.keyNames[j]);

              if (index > -1) {
                this.pressedKeys.splice(index, 1);
              }
            }

            if (macro.handler) {
              macro.keyNames = null;
            }

            this._appliedMacros.splice(i, 1);

            i -= 1;
          }
        }
      }
    }]);

    return Locale;
  }();

  var Keyboard = /*#__PURE__*/function () {
    function Keyboard(targetWindow, targetElement, targetPlatform, targetUserAgent) {
      _classCallCheck(this, Keyboard);

      this._locale = null;
      this._currentContext = '';
      this._contexts = {};
      this._listeners = [];
      this._appliedListeners = [];
      this._locales = {};
      this._targetElement = null;
      this._targetWindow = null;
      this._targetPlatform = '';
      this._targetUserAgent = '';
      this._isModernBrowser = false;
      this._targetKeyDownBinding = null;
      this._targetKeyUpBinding = null;
      this._targetResetBinding = null;
      this._paused = false;
      this._contexts.global = {
        listeners: this._listeners,
        targetWindow: targetWindow,
        targetElement: targetElement,
        targetPlatform: targetPlatform,
        targetUserAgent: targetUserAgent
      };
      this.setContext('global');
    }

    _createClass(Keyboard, [{
      key: "setLocale",
      value: function setLocale(localeName, localeBuilder) {
        var locale = null;

        if (typeof localeName === 'string') {
          if (localeBuilder) {
            locale = new Locale(localeName);
            localeBuilder(locale, this._targetPlatform, this._targetUserAgent);
          } else {
            locale = this._locales[localeName] || null;
          }
        } else {
          locale = localeName;
          localeName = locale._localeName;
        }

        this._locale = locale;
        this._locales[localeName] = locale;

        if (locale) {
          this._locale.pressedKeys = locale.pressedKeys;
        }

        return this;
      }
    }, {
      key: "getLocale",
      value: function getLocale(localName) {
        localName || (localName = this._locale.localeName);
        return this._locales[localName] || null;
      }
    }, {
      key: "bind",
      value: function bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault) {
        if (keyComboStr === null || typeof keyComboStr === 'function') {
          preventRepeatByDefault = releaseHandler;
          releaseHandler = pressHandler;
          pressHandler = keyComboStr;
          keyComboStr = null;
        }

        if (keyComboStr && _typeof(keyComboStr) === 'object' && typeof keyComboStr.length === 'number') {
          for (var i = 0; i < keyComboStr.length; i += 1) {
            this.bind(keyComboStr[i], pressHandler, releaseHandler);
          }

          return this;
        }

        this._listeners.push({
          keyCombo: keyComboStr ? new KeyCombo(keyComboStr) : null,
          pressHandler: pressHandler || null,
          releaseHandler: releaseHandler || null,
          preventRepeat: false,
          preventRepeatByDefault: preventRepeatByDefault || false,
          executingHandler: false
        });

        return this;
      }
    }, {
      key: "addListener",
      value: function addListener(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault) {
        return this.bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault);
      }
    }, {
      key: "on",
      value: function on(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault) {
        return this.bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault);
      }
    }, {
      key: "bindPress",
      value: function bindPress(keyComboStr, pressHandler, preventRepeatByDefault) {
        return this.bind(keyComboStr, pressHandler, null, preventRepeatByDefault);
      }
    }, {
      key: "bindRelease",
      value: function bindRelease(keyComboStr, releaseHandler) {
        return this.bind(keyComboStr, null, releaseHandler, preventRepeatByDefault);
      }
    }, {
      key: "unbind",
      value: function unbind(keyComboStr, pressHandler, releaseHandler) {
        if (keyComboStr === null || typeof keyComboStr === 'function') {
          releaseHandler = pressHandler;
          pressHandler = keyComboStr;
          keyComboStr = null;
        }

        if (keyComboStr && _typeof(keyComboStr) === 'object' && typeof keyComboStr.length === 'number') {
          for (var i = 0; i < keyComboStr.length; i += 1) {
            this.unbind(keyComboStr[i], pressHandler, releaseHandler);
          }

          return this;
        }

        for (var _i = 0; _i < this._listeners.length; _i += 1) {
          var listener = this._listeners[_i];
          var comboMatches = !keyComboStr && !listener.keyCombo || listener.keyCombo && listener.keyCombo.isEqual(keyComboStr);
          var pressHandlerMatches = !pressHandler && !releaseHandler || !pressHandler && !listener.pressHandler || pressHandler === listener.pressHandler;
          var releaseHandlerMatches = !pressHandler && !releaseHandler || !releaseHandler && !listener.releaseHandler || releaseHandler === listener.releaseHandler;

          if (comboMatches && pressHandlerMatches && releaseHandlerMatches) {
            this._listeners.splice(_i, 1);

            _i -= 1;
          }
        }

        return this;
      }
    }, {
      key: "removeListener",
      value: function removeListener(keyComboStr, pressHandler, releaseHandler) {
        return this.unbind(keyComboStr, pressHandler, releaseHandler);
      }
    }, {
      key: "off",
      value: function off(keyComboStr, pressHandler, releaseHandler) {
        return this.unbind(keyComboStr, pressHandler, releaseHandler);
      }
    }, {
      key: "setContext",
      value: function setContext(contextName) {
        if (this._locale) {
          this.releaseAllKeys();
        }

        if (!this._contexts[contextName]) {
          var globalContext = this._contexts.global;
          this._contexts[contextName] = {
            listeners: [],
            targetWindow: globalContext.targetWindow,
            targetElement: globalContext.targetElement,
            targetPlatform: globalContext.targetPlatform,
            targetUserAgent: globalContext.targetUserAgent
          };
        }

        var context = this._contexts[contextName];
        this._currentContext = contextName;
        this._listeners = context.listeners;
        this.stop();
        this.watch(context.targetWindow, context.targetElement, context.targetPlatform, context.targetUserAgent);
        return this;
      }
    }, {
      key: "getContext",
      value: function getContext() {
        return this._currentContext;
      }
    }, {
      key: "withContext",
      value: function withContext(contextName, callback) {
        var previousContextName = this.getContext();
        this.setContext(contextName);
        callback();
        this.setContext(previousContextName);
        return this;
      }
    }, {
      key: "watch",
      value: function watch(targetWindow, targetElement, targetPlatform, targetUserAgent) {
        var _this = this;

        this.stop();
        var win = typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};

        if (!targetWindow) {
          if (!win.addEventListener && !win.attachEvent) {
            // This was added so when using things like JSDOM watch can be used to configure watch
            // for the global namespace manually.
            if (this._currentContext === 'global') {
              return;
            }

            throw new Error('Cannot find window functions addEventListener or attachEvent.');
          }

          targetWindow = win;
        } // Handle element bindings where a target window is not passed


        if (typeof targetWindow.nodeType === 'number') {
          targetUserAgent = targetPlatform;
          targetPlatform = targetElement;
          targetElement = targetWindow;
          targetWindow = win;
        }

        if (!targetWindow.addEventListener && !targetWindow.attachEvent) {
          throw new Error('Cannot find addEventListener or attachEvent methods on targetWindow.');
        }

        this._isModernBrowser = !!targetWindow.addEventListener;
        var userAgent = targetWindow.navigator && targetWindow.navigator.userAgent || '';
        var platform = targetWindow.navigator && targetWindow.navigator.platform || '';
        targetElement && targetElement !== null || (targetElement = targetWindow.document);
        targetPlatform && targetPlatform !== null || (targetPlatform = platform);
        targetUserAgent && targetUserAgent !== null || (targetUserAgent = userAgent);

        this._targetKeyDownBinding = function (event) {
          _this.pressKey(event.keyCode, event);

          _this._handleCommandBug(event, platform);
        };

        this._targetKeyUpBinding = function (event) {
          _this.releaseKey(event.keyCode, event);
        };

        this._targetResetBinding = function (event) {
          _this.releaseAllKeys(event);
        };

        this._bindEvent(targetElement, 'keydown', this._targetKeyDownBinding);

        this._bindEvent(targetElement, 'keyup', this._targetKeyUpBinding);

        this._bindEvent(targetWindow, 'focus', this._targetResetBinding);

        this._bindEvent(targetWindow, 'blur', this._targetResetBinding);

        this._targetElement = targetElement;
        this._targetWindow = targetWindow;
        this._targetPlatform = targetPlatform;
        this._targetUserAgent = targetUserAgent;
        var currentContext = this._contexts[this._currentContext];
        currentContext.targetWindow = this._targetWindow;
        currentContext.targetElement = this._targetElement;
        currentContext.targetPlatform = this._targetPlatform;
        currentContext.targetUserAgent = this._targetUserAgent;
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (!this._targetElement || !this._targetWindow) {
          return;
        }

        this._unbindEvent(this._targetElement, 'keydown', this._targetKeyDownBinding);

        this._unbindEvent(this._targetElement, 'keyup', this._targetKeyUpBinding);

        this._unbindEvent(this._targetWindow, 'focus', this._targetResetBinding);

        this._unbindEvent(this._targetWindow, 'blur', this._targetResetBinding);

        this._targetWindow = null;
        this._targetElement = null;
        return this;
      }
    }, {
      key: "pressKey",
      value: function pressKey(keyCode, event) {
        if (this._paused) {
          return this;
        }

        if (!this._locale) {
          throw new Error('Locale not set');
        }

        this._locale.pressKey(keyCode);

        this._applyBindings(event);

        return this;
      }
    }, {
      key: "releaseKey",
      value: function releaseKey(keyCode, event) {
        if (this._paused) {
          return this;
        }

        if (!this._locale) {
          throw new Error('Locale not set');
        }

        this._locale.releaseKey(keyCode);

        this._clearBindings(event);

        return this;
      }
    }, {
      key: "releaseAllKeys",
      value: function releaseAllKeys(event) {
        if (this._paused) {
          return this;
        }

        if (!this._locale) {
          throw new Error('Locale not set');
        }

        this._locale.pressedKeys.length = 0;

        this._clearBindings(event);

        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        if (this._paused) {
          return this;
        }

        if (this._locale) {
          this.releaseAllKeys();
        }

        this._paused = true;
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        this._paused = false;
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.releaseAllKeys();
        this._listeners.length = 0;
        return this;
      }
    }, {
      key: "_bindEvent",
      value: function _bindEvent(targetElement, eventName, handler) {
        return this._isModernBrowser ? targetElement.addEventListener(eventName, handler, false) : targetElement.attachEvent('on' + eventName, handler);
      }
    }, {
      key: "_unbindEvent",
      value: function _unbindEvent(targetElement, eventName, handler) {
        return this._isModernBrowser ? targetElement.removeEventListener(eventName, handler, false) : targetElement.detachEvent('on' + eventName, handler);
      }
    }, {
      key: "_getGroupedListeners",
      value: function _getGroupedListeners() {
        var listenerGroups = [];
        var listenerGroupMap = [];
        var listeners = this._listeners;

        if (this._currentContext !== 'global') {
          listeners = [].concat(_toConsumableArray(listeners), _toConsumableArray(this._contexts.global.listeners));
        }

        listeners.sort(function (a, b) {
          return (b.keyCombo ? b.keyCombo.keyNames.length : 0) - (a.keyCombo ? a.keyCombo.keyNames.length : 0);
        }).forEach(function (l) {
          var mapIndex = -1;

          for (var i = 0; i < listenerGroupMap.length; i += 1) {
            if (listenerGroupMap[i] === null && l.keyCombo === null || listenerGroupMap[i] !== null && listenerGroupMap[i].isEqual(l.keyCombo)) {
              mapIndex = i;
            }
          }

          if (mapIndex === -1) {
            mapIndex = listenerGroupMap.length;
            listenerGroupMap.push(l.keyCombo);
          }

          if (!listenerGroups[mapIndex]) {
            listenerGroups[mapIndex] = [];
          }

          listenerGroups[mapIndex].push(l);
        });
        return listenerGroups;
      }
    }, {
      key: "_applyBindings",
      value: function _applyBindings(event) {
        var _this2 = this;

        var preventRepeat = false;
        event || (event = {});

        event.preventRepeat = function () {
          preventRepeat = true;
        };

        event.pressedKeys = this._locale.pressedKeys.slice(0);
        var activeTargetKeys = this._locale.activeTargetKeys;

        var pressedKeys = this._locale.pressedKeys.slice(0);

        var listenerGroups = this._getGroupedListeners();

        var _loop = function _loop(i) {
          var listeners = listenerGroups[i];
          var keyCombo = listeners[0].keyCombo;

          if (keyCombo === null || keyCombo.check(pressedKeys) && activeTargetKeys.some(function (k) {
            return keyCombo.keyNames.includes(k);
          })) {
            for (var j = 0; j < listeners.length; j += 1) {
              var listener = listeners[j];

              if (!listener.executingHandler && listener.pressHandler && !listener.preventRepeat) {
                listener.executingHandler = true;
                listener.pressHandler.call(_this2, event);
                listener.executingHandler = false;

                if (preventRepeat || listener.preventRepeatByDefault) {
                  listener.preventRepeat = true;
                  preventRepeat = false;
                }
              }

              if (_this2._appliedListeners.indexOf(listener) === -1) {
                _this2._appliedListeners.push(listener);
              }
            }

            if (keyCombo) {
              for (var _j = 0; _j < keyCombo.keyNames.length; _j += 1) {
                var index = pressedKeys.indexOf(keyCombo.keyNames[_j]);

                if (index !== -1) {
                  pressedKeys.splice(index, 1);
                  _j -= 1;
                }
              }
            }
          }
        };

        for (var i = 0; i < listenerGroups.length; i += 1) {
          _loop(i);
        }
      }
    }, {
      key: "_clearBindings",
      value: function _clearBindings(event) {
        event || (event = {});
        event.pressedKeys = this._locale.pressedKeys.slice(0);

        for (var i = 0; i < this._appliedListeners.length; i += 1) {
          var listener = this._appliedListeners[i];
          var keyCombo = listener.keyCombo;

          if (keyCombo === null || !keyCombo.check(this._locale.pressedKeys)) {
            listener.preventRepeat = false;

            if (keyCombo !== null || event.pressedKeys.length === 0) {
              this._appliedListeners.splice(i, 1);

              i -= 1;
            }

            if (!listener.executingHandler && listener.releaseHandler) {
              listener.executingHandler = true;
              listener.releaseHandler.call(this, event);
              listener.executingHandler = false;
            }
          }
        }
      }
    }, {
      key: "_handleCommandBug",
      value: function _handleCommandBug(event, platform) {
        // On Mac when the command key is kept pressed, keyup is not triggered for any other key.
        // In this case force a keyup for non-modifier keys directly after the keypress.
        var modifierKeys = ["shift", "ctrl", "alt", "capslock", "tab", "command"];

        if (platform.match("Mac") && this._locale.pressedKeys.includes("command") && !modifierKeys.includes(this._locale.getKeyNames(event.keyCode)[0])) {
          this._targetKeyUpBinding(event);
        }
      }
    }]);

    return Keyboard;
  }();

  function us(locale, platform, userAgent) {
    // general
    locale.bindKeyCode(3, ['cancel']);
    locale.bindKeyCode(8, ['backspace']);
    locale.bindKeyCode(9, ['tab']);
    locale.bindKeyCode(12, ['clear']);
    locale.bindKeyCode(13, ['enter']);
    locale.bindKeyCode(16, ['shift']);
    locale.bindKeyCode(17, ['ctrl']);
    locale.bindKeyCode(18, ['alt', 'menu']);
    locale.bindKeyCode(19, ['pause', 'break']);
    locale.bindKeyCode(20, ['capslock']);
    locale.bindKeyCode(27, ['escape', 'esc']);
    locale.bindKeyCode(32, ['space', 'spacebar']);
    locale.bindKeyCode(33, ['pageup']);
    locale.bindKeyCode(34, ['pagedown']);
    locale.bindKeyCode(35, ['end']);
    locale.bindKeyCode(36, ['home']);
    locale.bindKeyCode(37, ['left']);
    locale.bindKeyCode(38, ['up']);
    locale.bindKeyCode(39, ['right']);
    locale.bindKeyCode(40, ['down']);
    locale.bindKeyCode(41, ['select']);
    locale.bindKeyCode(42, ['printscreen']);
    locale.bindKeyCode(43, ['execute']);
    locale.bindKeyCode(44, ['snapshot']);
    locale.bindKeyCode(45, ['insert', 'ins']);
    locale.bindKeyCode(46, ['delete', 'del']);
    locale.bindKeyCode(47, ['help']);
    locale.bindKeyCode(145, ['scrolllock', 'scroll']);
    locale.bindKeyCode(188, ['comma', ',']);
    locale.bindKeyCode(190, ['period', '.']);
    locale.bindKeyCode(191, ['slash', 'forwardslash', '/']);
    locale.bindKeyCode(192, ['graveaccent', '`']);
    locale.bindKeyCode(219, ['openbracket', '[']);
    locale.bindKeyCode(220, ['backslash', '\\']);
    locale.bindKeyCode(221, ['closebracket', ']']);
    locale.bindKeyCode(222, ['apostrophe', '\'']); // 0-9

    locale.bindKeyCode(48, ['zero', '0']);
    locale.bindKeyCode(49, ['one', '1']);
    locale.bindKeyCode(50, ['two', '2']);
    locale.bindKeyCode(51, ['three', '3']);
    locale.bindKeyCode(52, ['four', '4']);
    locale.bindKeyCode(53, ['five', '5']);
    locale.bindKeyCode(54, ['six', '6']);
    locale.bindKeyCode(55, ['seven', '7']);
    locale.bindKeyCode(56, ['eight', '8']);
    locale.bindKeyCode(57, ['nine', '9']); // numpad

    locale.bindKeyCode(96, ['numzero', 'num0']);
    locale.bindKeyCode(97, ['numone', 'num1']);
    locale.bindKeyCode(98, ['numtwo', 'num2']);
    locale.bindKeyCode(99, ['numthree', 'num3']);
    locale.bindKeyCode(100, ['numfour', 'num4']);
    locale.bindKeyCode(101, ['numfive', 'num5']);
    locale.bindKeyCode(102, ['numsix', 'num6']);
    locale.bindKeyCode(103, ['numseven', 'num7']);
    locale.bindKeyCode(104, ['numeight', 'num8']);
    locale.bindKeyCode(105, ['numnine', 'num9']);
    locale.bindKeyCode(106, ['nummultiply', 'num*']);
    locale.bindKeyCode(107, ['numadd', 'num+']);
    locale.bindKeyCode(108, ['numenter']);
    locale.bindKeyCode(109, ['numsubtract', 'num-']);
    locale.bindKeyCode(110, ['numdecimal', 'num.']);
    locale.bindKeyCode(111, ['numdivide', 'num/']);
    locale.bindKeyCode(144, ['numlock', 'num']); // function keys

    locale.bindKeyCode(112, ['f1']);
    locale.bindKeyCode(113, ['f2']);
    locale.bindKeyCode(114, ['f3']);
    locale.bindKeyCode(115, ['f4']);
    locale.bindKeyCode(116, ['f5']);
    locale.bindKeyCode(117, ['f6']);
    locale.bindKeyCode(118, ['f7']);
    locale.bindKeyCode(119, ['f8']);
    locale.bindKeyCode(120, ['f9']);
    locale.bindKeyCode(121, ['f10']);
    locale.bindKeyCode(122, ['f11']);
    locale.bindKeyCode(123, ['f12']);
    locale.bindKeyCode(124, ['f13']);
    locale.bindKeyCode(125, ['f14']);
    locale.bindKeyCode(126, ['f15']);
    locale.bindKeyCode(127, ['f16']);
    locale.bindKeyCode(128, ['f17']);
    locale.bindKeyCode(129, ['f18']);
    locale.bindKeyCode(130, ['f19']);
    locale.bindKeyCode(131, ['f20']);
    locale.bindKeyCode(132, ['f21']);
    locale.bindKeyCode(133, ['f22']);
    locale.bindKeyCode(134, ['f23']);
    locale.bindKeyCode(135, ['f24']); // secondary key symbols

    locale.bindMacro('shift + `', ['tilde', '~']);
    locale.bindMacro('shift + 1', ['exclamation', 'exclamationpoint', '!']);
    locale.bindMacro('shift + 2', ['at', '@']);
    locale.bindMacro('shift + 3', ['number', '#']);
    locale.bindMacro('shift + 4', ['dollar', 'dollars', 'dollarsign', '$']);
    locale.bindMacro('shift + 5', ['percent', '%']);
    locale.bindMacro('shift + 6', ['caret', '^']);
    locale.bindMacro('shift + 7', ['ampersand', 'and', '&']);
    locale.bindMacro('shift + 8', ['asterisk', '*']);
    locale.bindMacro('shift + 9', ['openparen', '(']);
    locale.bindMacro('shift + 0', ['closeparen', ')']);
    locale.bindMacro('shift + -', ['underscore', '_']);
    locale.bindMacro('shift + =', ['plus', '+']);
    locale.bindMacro('shift + [', ['opencurlybrace', 'opencurlybracket', '{']);
    locale.bindMacro('shift + ]', ['closecurlybrace', 'closecurlybracket', '}']);
    locale.bindMacro('shift + \\', ['verticalbar', '|']);
    locale.bindMacro('shift + ;', ['colon', ':']);
    locale.bindMacro('shift + \'', ['quotationmark', '\'']);
    locale.bindMacro('shift + !,', ['openanglebracket', '<']);
    locale.bindMacro('shift + .', ['closeanglebracket', '>']);
    locale.bindMacro('shift + /', ['questionmark', '?']);

    if (platform.match('Mac')) {
      locale.bindMacro('command', ['mod', 'modifier']);
    } else {
      locale.bindMacro('ctrl', ['mod', 'modifier']);
    } //a-z and A-Z


    for (var keyCode = 65; keyCode <= 90; keyCode += 1) {
      var keyName = String.fromCharCode(keyCode + 32);
      var capitalKeyName = String.fromCharCode(keyCode);
      locale.bindKeyCode(keyCode, keyName);
      locale.bindMacro('shift + ' + keyName, capitalKeyName);
      locale.bindMacro('capslock + ' + keyName, capitalKeyName);
    } // browser caveats


    var semicolonKeyCode = userAgent.match('Firefox') ? 59 : 186;
    var dashKeyCode = userAgent.match('Firefox') ? 173 : 189;
    var equalKeyCode = userAgent.match('Firefox') ? 61 : 187;
    var leftCommandKeyCode;
    var rightCommandKeyCode;

    if (platform.match('Mac') && (userAgent.match('Safari') || userAgent.match('Chrome'))) {
      leftCommandKeyCode = 91;
      rightCommandKeyCode = 93;
    } else if (platform.match('Mac') && userAgent.match('Opera')) {
      leftCommandKeyCode = 17;
      rightCommandKeyCode = 17;
    } else if (platform.match('Mac') && userAgent.match('Firefox')) {
      leftCommandKeyCode = 224;
      rightCommandKeyCode = 224;
    }

    locale.bindKeyCode(semicolonKeyCode, ['semicolon', ';']);
    locale.bindKeyCode(dashKeyCode, ['dash', '-']);
    locale.bindKeyCode(equalKeyCode, ['equal', 'equalsign', '=']);
    locale.bindKeyCode(leftCommandKeyCode, ['command', 'windows', 'win', 'super', 'leftcommand', 'leftwindows', 'leftwin', 'leftsuper']);
    locale.bindKeyCode(rightCommandKeyCode, ['command', 'windows', 'win', 'super', 'rightcommand', 'rightwindows', 'rightwin', 'rightsuper']); // kill keys

    locale.setKillKey('command');
  }

  var keyboard = new Keyboard();
  keyboard.setLocale('us', us);
  keyboard.Keyboard = Keyboard;
  keyboard.Locale = Locale;
  keyboard.KeyCombo = KeyCombo;

  return keyboard;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Ym9hcmQuanMiLCJzb3VyY2VzIjpbIi4uL2xpYi9rZXktY29tYm8uanMiLCIuLi9saWIvbG9jYWxlLmpzIiwiLi4vbGliL2tleWJvYXJkLmpzIiwiLi4vbG9jYWxlcy91cy5qcyIsIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIEtleUNvbWJvIHtcbiAgY29uc3RydWN0b3Ioa2V5Q29tYm9TdHIpIHtcbiAgICB0aGlzLnNvdXJjZVN0ciA9IGtleUNvbWJvU3RyO1xuICAgIHRoaXMuc3ViQ29tYm9zID0gS2V5Q29tYm8ucGFyc2VDb21ib1N0cihrZXlDb21ib1N0cik7XG4gICAgdGhpcy5rZXlOYW1lcyAgPSB0aGlzLnN1YkNvbWJvcy5yZWR1Y2UoKG1lbW8sIG5leHRTdWJDb21ibykgPT5cbiAgICAgIG1lbW8uY29uY2F0KG5leHRTdWJDb21ibyksIFtdKTtcbiAgfVxuXG4gIGNoZWNrKHByZXNzZWRLZXlOYW1lcykge1xuICAgIGxldCBzdGFydGluZ0tleU5hbWVJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN1YkNvbWJvcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgc3RhcnRpbmdLZXlOYW1lSW5kZXggPSB0aGlzLl9jaGVja1N1YkNvbWJvKFxuICAgICAgICB0aGlzLnN1YkNvbWJvc1tpXSxcbiAgICAgICAgc3RhcnRpbmdLZXlOYW1lSW5kZXgsXG4gICAgICAgIHByZXNzZWRLZXlOYW1lc1xuICAgICAgKTtcbiAgICAgIGlmIChzdGFydGluZ0tleU5hbWVJbmRleCA9PT0gLTEpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGlzRXF1YWwob3RoZXJLZXlDb21ibykge1xuICAgIGlmIChcbiAgICAgICFvdGhlcktleUNvbWJvIHx8XG4gICAgICB0eXBlb2Ygb3RoZXJLZXlDb21ibyAhPT0gJ3N0cmluZycgJiZcbiAgICAgIHR5cGVvZiBvdGhlcktleUNvbWJvICE9PSAnb2JqZWN0J1xuICAgICkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGlmICh0eXBlb2Ygb3RoZXJLZXlDb21ibyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG90aGVyS2V5Q29tYm8gPSBuZXcgS2V5Q29tYm8ob3RoZXJLZXlDb21ibyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3ViQ29tYm9zLmxlbmd0aCAhPT0gb3RoZXJLZXlDb21iby5zdWJDb21ib3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdWJDb21ib3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0aGlzLnN1YkNvbWJvc1tpXS5sZW5ndGggIT09IG90aGVyS2V5Q29tYm8uc3ViQ29tYm9zW2ldLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN1YkNvbWJvcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc3ViQ29tYm8gICAgICA9IHRoaXMuc3ViQ29tYm9zW2ldO1xuICAgICAgY29uc3Qgb3RoZXJTdWJDb21ibyA9IG90aGVyS2V5Q29tYm8uc3ViQ29tYm9zW2ldLnNsaWNlKDApO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN1YkNvbWJvLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGtleU5hbWUgPSBzdWJDb21ib1tqXTtcbiAgICAgICAgY29uc3QgaW5kZXggICA9IG90aGVyU3ViQ29tYm8uaW5kZXhPZihrZXlOYW1lKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgIG90aGVyU3ViQ29tYm8uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG90aGVyU3ViQ29tYm8ubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBfY2hlY2tTdWJDb21ibyhzdWJDb21ibywgc3RhcnRpbmdLZXlOYW1lSW5kZXgsIHByZXNzZWRLZXlOYW1lcykge1xuICAgIHN1YkNvbWJvID0gc3ViQ29tYm8uc2xpY2UoMCk7XG4gICAgcHJlc3NlZEtleU5hbWVzID0gcHJlc3NlZEtleU5hbWVzLnNsaWNlKHN0YXJ0aW5nS2V5TmFtZUluZGV4KTtcblxuICAgIGxldCBlbmRJbmRleCA9IHN0YXJ0aW5nS2V5TmFtZUluZGV4O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViQ29tYm8ubGVuZ3RoOyBpICs9IDEpIHtcblxuICAgICAgbGV0IGtleU5hbWUgPSBzdWJDb21ib1tpXTtcbiAgICAgIGlmIChrZXlOYW1lWzBdID09PSAnXFxcXCcpIHtcbiAgICAgICAgY29uc3QgZXNjYXBlZEtleU5hbWUgPSBrZXlOYW1lLnNsaWNlKDEpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZXNjYXBlZEtleU5hbWUgPT09IEtleUNvbWJvLmNvbWJvRGVsaW1pbmF0b3IgfHxcbiAgICAgICAgICBlc2NhcGVkS2V5TmFtZSA9PT0gS2V5Q29tYm8ua2V5RGVsaW1pbmF0b3JcbiAgICAgICAgKSB7XG4gICAgICAgICAga2V5TmFtZSA9IGVzY2FwZWRLZXlOYW1lO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gcHJlc3NlZEtleU5hbWVzLmluZGV4T2Yoa2V5TmFtZSk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBzdWJDb21iby5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgICAgaWYgKGluZGV4ID4gZW5kSW5kZXgpIHtcbiAgICAgICAgICBlbmRJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWJDb21iby5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZW5kSW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xufVxuXG5LZXlDb21iby5jb21ib0RlbGltaW5hdG9yID0gJz4nO1xuS2V5Q29tYm8ua2V5RGVsaW1pbmF0b3IgICA9ICcrJztcblxuS2V5Q29tYm8ucGFyc2VDb21ib1N0ciA9IGZ1bmN0aW9uKGtleUNvbWJvU3RyKSB7XG4gIGNvbnN0IHN1YkNvbWJvU3RycyA9IEtleUNvbWJvLl9zcGxpdFN0cihrZXlDb21ib1N0ciwgS2V5Q29tYm8uY29tYm9EZWxpbWluYXRvcik7XG4gIGNvbnN0IGNvbWJvICAgICAgICA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IHN1YkNvbWJvU3Rycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbWJvLnB1c2goS2V5Q29tYm8uX3NwbGl0U3RyKHN1YkNvbWJvU3Ryc1tpXSwgS2V5Q29tYm8ua2V5RGVsaW1pbmF0b3IpKTtcbiAgfVxuICByZXR1cm4gY29tYm87XG59XG5cbktleUNvbWJvLl9zcGxpdFN0ciA9IGZ1bmN0aW9uKHN0ciwgZGVsaW1pbmF0b3IpIHtcbiAgY29uc3QgcyAgPSBzdHI7XG4gIGNvbnN0IGQgID0gZGVsaW1pbmF0b3I7XG4gIGxldCBjICA9ICcnO1xuICBjb25zdCBjYSA9IFtdO1xuXG4gIGZvciAobGV0IGNpID0gMDsgY2kgPCBzLmxlbmd0aDsgY2kgKz0gMSkge1xuICAgIGlmIChjaSA+IDAgJiYgc1tjaV0gPT09IGQgJiYgc1tjaSAtIDFdICE9PSAnXFxcXCcpIHtcbiAgICAgIGNhLnB1c2goYy50cmltKCkpO1xuICAgICAgYyA9ICcnO1xuICAgICAgY2kgKz0gMTtcbiAgICB9XG4gICAgYyArPSBzW2NpXTtcbiAgfVxuICBpZiAoYykgeyBjYS5wdXNoKGMudHJpbSgpKTsgfVxuXG4gIHJldHVybiBjYTtcbn07XG4iLCJpbXBvcnQgeyBLZXlDb21ibyB9IGZyb20gJy4va2V5LWNvbWJvJztcblxuXG5leHBvcnQgY2xhc3MgTG9jYWxlIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubG9jYWxlTmFtZSAgICAgICAgICA9IG5hbWU7XG4gICAgdGhpcy5hY3RpdmVUYXJnZXRLZXlzID0gW107XG4gICAgdGhpcy5wcmVzc2VkS2V5cyAgICAgICAgID0gW107XG4gICAgdGhpcy5fYXBwbGllZE1hY3JvcyAgICAgID0gW107XG4gICAgdGhpcy5fa2V5TWFwICAgICAgICAgICAgID0ge307XG4gICAgdGhpcy5fa2lsbEtleUNvZGVzICAgICAgID0gW107XG4gICAgdGhpcy5fbWFjcm9zICAgICAgICAgICAgID0gW107XG4gIH1cblxuICBiaW5kS2V5Q29kZShrZXlDb2RlLCBrZXlOYW1lcykge1xuICAgIGlmICh0eXBlb2Yga2V5TmFtZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBrZXlOYW1lcyA9IFtrZXlOYW1lc107XG4gICAgfVxuXG4gICAgdGhpcy5fa2V5TWFwW2tleUNvZGVdID0ga2V5TmFtZXM7XG4gIH07XG5cbiAgYmluZE1hY3JvKGtleUNvbWJvU3RyLCBrZXlOYW1lcykge1xuICAgIGlmICh0eXBlb2Yga2V5TmFtZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBrZXlOYW1lcyA9IFsga2V5TmFtZXMgXTtcbiAgICB9XG5cbiAgICBsZXQgaGFuZGxlciA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiBrZXlOYW1lcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaGFuZGxlciA9IGtleU5hbWVzO1xuICAgICAga2V5TmFtZXMgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hY3JvID0ge1xuICAgICAga2V5Q29tYm8gOiBuZXcgS2V5Q29tYm8oa2V5Q29tYm9TdHIpLFxuICAgICAga2V5TmFtZXMgOiBrZXlOYW1lcyxcbiAgICAgIGhhbmRsZXIgIDogaGFuZGxlclxuICAgIH07XG5cbiAgICB0aGlzLl9tYWNyb3MucHVzaChtYWNybyk7XG4gIH07XG5cbiAgZ2V0S2V5Q29kZXMoa2V5TmFtZSkge1xuICAgIGNvbnN0IGtleUNvZGVzID0gW107XG4gICAgZm9yIChjb25zdCBrZXlDb2RlIGluIHRoaXMuX2tleU1hcCkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9rZXlNYXBba2V5Q29kZV0uaW5kZXhPZihrZXlOYW1lKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7IGtleUNvZGVzLnB1c2goa2V5Q29kZXwwKTsgfVxuICAgIH1cbiAgICByZXR1cm4ga2V5Q29kZXM7XG4gIH07XG5cbiAgZ2V0S2V5TmFtZXMoa2V5Q29kZSkge1xuICAgIHJldHVybiB0aGlzLl9rZXlNYXBba2V5Q29kZV0gfHwgW107XG4gIH07XG5cbiAgc2V0S2lsbEtleShrZXlDb2RlKSB7XG4gICAgaWYgKHR5cGVvZiBrZXlDb2RlID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3Qga2V5Q29kZXMgPSB0aGlzLmdldEtleUNvZGVzKGtleUNvZGUpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlDb2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB0aGlzLnNldEtpbGxLZXkoa2V5Q29kZXNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2tpbGxLZXlDb2Rlcy5wdXNoKGtleUNvZGUpO1xuICB9O1xuXG4gIHByZXNzS2V5KGtleUNvZGUpIHtcbiAgICBpZiAodHlwZW9mIGtleUNvZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBrZXlDb2RlcyA9IHRoaXMuZ2V0S2V5Q29kZXMoa2V5Q29kZSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUNvZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMucHJlc3NLZXkoa2V5Q29kZXNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlVGFyZ2V0S2V5cy5sZW5ndGggPSAwO1xuICAgIGNvbnN0IGtleU5hbWVzID0gdGhpcy5nZXRLZXlOYW1lcyhrZXlDb2RlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleU5hbWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhcmdldEtleXMucHVzaChrZXlOYW1lc1tpXSk7XG4gICAgICBpZiAodGhpcy5wcmVzc2VkS2V5cy5pbmRleE9mKGtleU5hbWVzW2ldKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5wcmVzc2VkS2V5cy5wdXNoKGtleU5hbWVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9hcHBseU1hY3JvcygpO1xuICB9O1xuXG4gIHJlbGVhc2VLZXkoa2V5Q29kZSkge1xuICAgIGlmICh0eXBlb2Yga2V5Q29kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGtleUNvZGVzID0gdGhpcy5nZXRLZXlDb2RlcyhrZXlDb2RlKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5Q29kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy5yZWxlYXNlS2V5KGtleUNvZGVzW2ldKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBrZXlOYW1lcyAgICAgICAgID0gdGhpcy5nZXRLZXlOYW1lcyhrZXlDb2RlKTtcbiAgICAgIGNvbnN0IGtpbGxLZXlDb2RlSW5kZXggPSB0aGlzLl9raWxsS2V5Q29kZXMuaW5kZXhPZihrZXlDb2RlKTtcblxuICAgICAgaWYgKGtpbGxLZXlDb2RlSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMucHJlc3NlZEtleXMubGVuZ3RoID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5TmFtZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucHJlc3NlZEtleXMuaW5kZXhPZihrZXlOYW1lc1tpXSk7XG4gICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZEtleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3RpdmVUYXJnZXRLZXlzLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLl9jbGVhck1hY3JvcygpO1xuICAgIH1cbiAgfTtcblxuICBfYXBwbHlNYWNyb3MoKSB7XG4gICAgY29uc3QgbWFjcm9zID0gdGhpcy5fbWFjcm9zLnNsaWNlKDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFjcm9zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBtYWNybyA9IG1hY3Jvc1tpXTtcbiAgICAgIGlmIChtYWNyby5rZXlDb21iby5jaGVjayh0aGlzLnByZXNzZWRLZXlzKSkge1xuICAgICAgICBpZiAobWFjcm8uaGFuZGxlcikge1xuICAgICAgICAgIG1hY3JvLmtleU5hbWVzID0gbWFjcm8uaGFuZGxlcih0aGlzLnByZXNzZWRLZXlzKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hY3JvLmtleU5hbWVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJlc3NlZEtleXMuaW5kZXhPZihtYWNyby5rZXlOYW1lc1tqXSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWRLZXlzLnB1c2gobWFjcm8ua2V5TmFtZXNbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hcHBsaWVkTWFjcm9zLnB1c2gobWFjcm8pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfY2xlYXJNYWNyb3MoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hcHBsaWVkTWFjcm9zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBtYWNybyA9IHRoaXMuX2FwcGxpZWRNYWNyb3NbaV07XG4gICAgICBpZiAoIW1hY3JvLmtleUNvbWJvLmNoZWNrKHRoaXMucHJlc3NlZEtleXMpKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWFjcm8ua2V5TmFtZXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucHJlc3NlZEtleXMuaW5kZXhPZihtYWNyby5rZXlOYW1lc1tqXSk7XG4gICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZEtleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hY3JvLmhhbmRsZXIpIHtcbiAgICAgICAgICBtYWNyby5rZXlOYW1lcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXBwbGllZE1hY3Jvcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IExvY2FsZSB9IGZyb20gJy4vbG9jYWxlJztcbmltcG9ydCB7IEtleUNvbWJvIH0gZnJvbSAnLi9rZXktY29tYm8nO1xuXG5cbmV4cG9ydCBjbGFzcyBLZXlib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHRhcmdldFdpbmRvdywgdGFyZ2V0RWxlbWVudCwgdGFyZ2V0UGxhdGZvcm0sIHRhcmdldFVzZXJBZ2VudCkge1xuICAgIHRoaXMuX2xvY2FsZSAgICAgICAgICAgICAgID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50Q29udGV4dCAgICAgICA9ICcnO1xuICAgIHRoaXMuX2NvbnRleHRzICAgICAgICAgICAgID0ge307XG4gICAgdGhpcy5fbGlzdGVuZXJzICAgICAgICAgICAgPSBbXTtcbiAgICB0aGlzLl9hcHBsaWVkTGlzdGVuZXJzICAgICA9IFtdO1xuICAgIHRoaXMuX2xvY2FsZXMgICAgICAgICAgICAgID0ge307XG4gICAgdGhpcy5fdGFyZ2V0RWxlbWVudCAgICAgICAgPSBudWxsO1xuICAgIHRoaXMuX3RhcmdldFdpbmRvdyAgICAgICAgID0gbnVsbDtcbiAgICB0aGlzLl90YXJnZXRQbGF0Zm9ybSAgICAgICA9ICcnO1xuICAgIHRoaXMuX3RhcmdldFVzZXJBZ2VudCAgICAgID0gJyc7XG4gICAgdGhpcy5faXNNb2Rlcm5Ccm93c2VyICAgICAgPSBmYWxzZTtcbiAgICB0aGlzLl90YXJnZXRLZXlEb3duQmluZGluZyA9IG51bGw7XG4gICAgdGhpcy5fdGFyZ2V0S2V5VXBCaW5kaW5nICAgPSBudWxsO1xuICAgIHRoaXMuX3RhcmdldFJlc2V0QmluZGluZyAgID0gbnVsbDtcbiAgICB0aGlzLl9wYXVzZWQgICAgICAgICAgICAgICA9IGZhbHNlO1xuXG4gICAgdGhpcy5fY29udGV4dHMuZ2xvYmFsID0ge1xuICAgICAgbGlzdGVuZXJzOiB0aGlzLl9saXN0ZW5lcnMsXG4gICAgICB0YXJnZXRXaW5kb3csXG4gICAgICB0YXJnZXRFbGVtZW50LFxuICAgICAgdGFyZ2V0UGxhdGZvcm0sXG4gICAgICB0YXJnZXRVc2VyQWdlbnRcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRDb250ZXh0KCdnbG9iYWwnKTtcbiAgfVxuXG4gIHNldExvY2FsZShsb2NhbGVOYW1lLCBsb2NhbGVCdWlsZGVyKSB7XG4gICAgbGV0IGxvY2FsZSA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiBsb2NhbGVOYW1lID09PSAnc3RyaW5nJykge1xuXG4gICAgICBpZiAobG9jYWxlQnVpbGRlcikge1xuICAgICAgICBsb2NhbGUgPSBuZXcgTG9jYWxlKGxvY2FsZU5hbWUpO1xuICAgICAgICBsb2NhbGVCdWlsZGVyKGxvY2FsZSwgdGhpcy5fdGFyZ2V0UGxhdGZvcm0sIHRoaXMuX3RhcmdldFVzZXJBZ2VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2NhbGUgPSB0aGlzLl9sb2NhbGVzW2xvY2FsZU5hbWVdIHx8IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsZSAgICAgPSBsb2NhbGVOYW1lO1xuICAgICAgbG9jYWxlTmFtZSA9IGxvY2FsZS5fbG9jYWxlTmFtZTtcbiAgICB9XG5cbiAgICB0aGlzLl9sb2NhbGUgICAgICAgICAgICAgID0gbG9jYWxlO1xuICAgIHRoaXMuX2xvY2FsZXNbbG9jYWxlTmFtZV0gPSBsb2NhbGU7XG4gICAgaWYgKGxvY2FsZSkge1xuICAgICAgdGhpcy5fbG9jYWxlLnByZXNzZWRLZXlzID0gbG9jYWxlLnByZXNzZWRLZXlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0TG9jYWxlKGxvY2FsTmFtZSkge1xuICAgIGxvY2FsTmFtZSB8fCAobG9jYWxOYW1lID0gdGhpcy5fbG9jYWxlLmxvY2FsZU5hbWUpO1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGVzW2xvY2FsTmFtZV0gfHwgbnVsbDtcbiAgfVxuXG4gIGJpbmQoa2V5Q29tYm9TdHIsIHByZXNzSGFuZGxlciwgcmVsZWFzZUhhbmRsZXIsIHByZXZlbnRSZXBlYXRCeURlZmF1bHQpIHtcbiAgICBpZiAoa2V5Q29tYm9TdHIgPT09IG51bGwgfHwgdHlwZW9mIGtleUNvbWJvU3RyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcmV2ZW50UmVwZWF0QnlEZWZhdWx0ID0gcmVsZWFzZUhhbmRsZXI7XG4gICAgICByZWxlYXNlSGFuZGxlciAgICAgICAgID0gcHJlc3NIYW5kbGVyO1xuICAgICAgcHJlc3NIYW5kbGVyICAgICAgICAgICA9IGtleUNvbWJvU3RyO1xuICAgICAga2V5Q29tYm9TdHIgICAgICAgICAgICA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAga2V5Q29tYm9TdHIgJiZcbiAgICAgIHR5cGVvZiBrZXlDb21ib1N0ciA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBrZXlDb21ib1N0ci5sZW5ndGggPT09ICdudW1iZXInXG4gICAgKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUNvbWJvU3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYmluZChrZXlDb21ib1N0cltpXSwgcHJlc3NIYW5kbGVyLCByZWxlYXNlSGFuZGxlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLl9saXN0ZW5lcnMucHVzaCh7XG4gICAgICBrZXlDb21ibyAgICAgICAgICAgICAgOiBrZXlDb21ib1N0ciA/IG5ldyBLZXlDb21ibyhrZXlDb21ib1N0cikgOiBudWxsLFxuICAgICAgcHJlc3NIYW5kbGVyICAgICAgICAgIDogcHJlc3NIYW5kbGVyICAgICAgICAgICB8fCBudWxsLFxuICAgICAgcmVsZWFzZUhhbmRsZXIgICAgICAgIDogcmVsZWFzZUhhbmRsZXIgICAgICAgICB8fCBudWxsLFxuICAgICAgcHJldmVudFJlcGVhdCAgICAgICAgIDogZmFsc2UsXG4gICAgICBwcmV2ZW50UmVwZWF0QnlEZWZhdWx0OiBwcmV2ZW50UmVwZWF0QnlEZWZhdWx0IHx8IGZhbHNlLFxuICAgICAgZXhlY3V0aW5nSGFuZGxlciAgICAgIDogZmFsc2VcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkTGlzdGVuZXIoa2V5Q29tYm9TdHIsIHByZXNzSGFuZGxlciwgcmVsZWFzZUhhbmRsZXIsIHByZXZlbnRSZXBlYXRCeURlZmF1bHQpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5kKGtleUNvbWJvU3RyLCBwcmVzc0hhbmRsZXIsIHJlbGVhc2VIYW5kbGVyLCBwcmV2ZW50UmVwZWF0QnlEZWZhdWx0KTtcbiAgfVxuXG4gIG9uKGtleUNvbWJvU3RyLCBwcmVzc0hhbmRsZXIsIHJlbGVhc2VIYW5kbGVyLCBwcmV2ZW50UmVwZWF0QnlEZWZhdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMuYmluZChrZXlDb21ib1N0ciwgcHJlc3NIYW5kbGVyLCByZWxlYXNlSGFuZGxlciwgcHJldmVudFJlcGVhdEJ5RGVmYXVsdCk7XG4gIH1cblxuICBiaW5kUHJlc3Moa2V5Q29tYm9TdHIsIHByZXNzSGFuZGxlciwgcHJldmVudFJlcGVhdEJ5RGVmYXVsdCkge1xuICAgIHJldHVybiB0aGlzLmJpbmQoa2V5Q29tYm9TdHIsIHByZXNzSGFuZGxlciwgbnVsbCwgcHJldmVudFJlcGVhdEJ5RGVmYXVsdCk7XG4gIH1cblxuICBiaW5kUmVsZWFzZShrZXlDb21ib1N0ciwgcmVsZWFzZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5kKGtleUNvbWJvU3RyLCBudWxsLCByZWxlYXNlSGFuZGxlciwgcHJldmVudFJlcGVhdEJ5RGVmYXVsdCk7XG4gIH1cblxuICB1bmJpbmQoa2V5Q29tYm9TdHIsIHByZXNzSGFuZGxlciwgcmVsZWFzZUhhbmRsZXIpIHtcbiAgICBpZiAoa2V5Q29tYm9TdHIgPT09IG51bGwgfHwgdHlwZW9mIGtleUNvbWJvU3RyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZWxlYXNlSGFuZGxlciA9IHByZXNzSGFuZGxlcjtcbiAgICAgIHByZXNzSGFuZGxlciAgID0ga2V5Q29tYm9TdHI7XG4gICAgICBrZXlDb21ib1N0ciA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAga2V5Q29tYm9TdHIgJiZcbiAgICAgIHR5cGVvZiBrZXlDb21ib1N0ciA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBrZXlDb21ib1N0ci5sZW5ndGggPT09ICdudW1iZXInXG4gICAgKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUNvbWJvU3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMudW5iaW5kKGtleUNvbWJvU3RyW2ldLCBwcmVzc0hhbmRsZXIsIHJlbGVhc2VIYW5kbGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IHRoaXMuX2xpc3RlbmVyc1tpXTtcblxuICAgICAgY29uc3QgY29tYm9NYXRjaGVzICAgICAgICAgID0gIWtleUNvbWJvU3RyICYmICFsaXN0ZW5lci5rZXlDb21ibyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmtleUNvbWJvICYmIGxpc3RlbmVyLmtleUNvbWJvLmlzRXF1YWwoa2V5Q29tYm9TdHIpO1xuICAgICAgY29uc3QgcHJlc3NIYW5kbGVyTWF0Y2hlcyAgID0gIXByZXNzSGFuZGxlciAmJiAhcmVsZWFzZUhhbmRsZXIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhcHJlc3NIYW5kbGVyICYmICFsaXN0ZW5lci5wcmVzc0hhbmRsZXIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVzc0hhbmRsZXIgPT09IGxpc3RlbmVyLnByZXNzSGFuZGxlcjtcbiAgICAgIGNvbnN0IHJlbGVhc2VIYW5kbGVyTWF0Y2hlcyA9ICFwcmVzc0hhbmRsZXIgJiYgIXJlbGVhc2VIYW5kbGVyIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIXJlbGVhc2VIYW5kbGVyICYmICFsaXN0ZW5lci5yZWxlYXNlSGFuZGxlciB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2VIYW5kbGVyID09PSBsaXN0ZW5lci5yZWxlYXNlSGFuZGxlcjtcblxuICAgICAgaWYgKGNvbWJvTWF0Y2hlcyAmJiBwcmVzc0hhbmRsZXJNYXRjaGVzICYmIHJlbGVhc2VIYW5kbGVyTWF0Y2hlcykge1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpIC09IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZW1vdmVMaXN0ZW5lcihrZXlDb21ib1N0ciwgcHJlc3NIYW5kbGVyLCByZWxlYXNlSGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLnVuYmluZChrZXlDb21ib1N0ciwgcHJlc3NIYW5kbGVyLCByZWxlYXNlSGFuZGxlcik7XG4gIH1cblxuICBvZmYoa2V5Q29tYm9TdHIsIHByZXNzSGFuZGxlciwgcmVsZWFzZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy51bmJpbmQoa2V5Q29tYm9TdHIsIHByZXNzSGFuZGxlciwgcmVsZWFzZUhhbmRsZXIpO1xuICB9XG5cbiAgc2V0Q29udGV4dChjb250ZXh0TmFtZSkge1xuICAgIGlmKHRoaXMuX2xvY2FsZSkgeyB0aGlzLnJlbGVhc2VBbGxLZXlzKCk7IH1cblxuICAgIGlmICghdGhpcy5fY29udGV4dHNbY29udGV4dE5hbWVdKSB7XG4gICAgICBjb25zdCBnbG9iYWxDb250ZXh0ID0gdGhpcy5fY29udGV4dHMuZ2xvYmFsO1xuICAgICAgdGhpcy5fY29udGV4dHNbY29udGV4dE5hbWVdID0ge1xuICAgICAgICBsaXN0ZW5lcnMgICAgICA6IFtdLFxuICAgICAgICB0YXJnZXRXaW5kb3cgICA6IGdsb2JhbENvbnRleHQudGFyZ2V0V2luZG93LFxuICAgICAgICB0YXJnZXRFbGVtZW50ICA6IGdsb2JhbENvbnRleHQudGFyZ2V0RWxlbWVudCxcbiAgICAgICAgdGFyZ2V0UGxhdGZvcm0gOiBnbG9iYWxDb250ZXh0LnRhcmdldFBsYXRmb3JtLFxuICAgICAgICB0YXJnZXRVc2VyQWdlbnQ6IGdsb2JhbENvbnRleHQudGFyZ2V0VXNlckFnZW50XG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRleHQgICAgICAgID0gdGhpcy5fY29udGV4dHNbY29udGV4dE5hbWVdO1xuICAgIHRoaXMuX2N1cnJlbnRDb250ZXh0ID0gY29udGV4dE5hbWU7XG4gICAgdGhpcy5fbGlzdGVuZXJzICAgICAgPSBjb250ZXh0Lmxpc3RlbmVycztcblxuICAgIHRoaXMuc3RvcCgpO1xuICAgIHRoaXMud2F0Y2goXG4gICAgICBjb250ZXh0LnRhcmdldFdpbmRvdyxcbiAgICAgIGNvbnRleHQudGFyZ2V0RWxlbWVudCxcbiAgICAgIGNvbnRleHQudGFyZ2V0UGxhdGZvcm0sXG4gICAgICBjb250ZXh0LnRhcmdldFVzZXJBZ2VudFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldENvbnRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDb250ZXh0O1xuICB9XG5cbiAgd2l0aENvbnRleHQoY29udGV4dE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgcHJldmlvdXNDb250ZXh0TmFtZSA9IHRoaXMuZ2V0Q29udGV4dCgpO1xuICAgIHRoaXMuc2V0Q29udGV4dChjb250ZXh0TmFtZSk7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gICAgdGhpcy5zZXRDb250ZXh0KHByZXZpb3VzQ29udGV4dE5hbWUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3YXRjaCh0YXJnZXRXaW5kb3csIHRhcmdldEVsZW1lbnQsIHRhcmdldFBsYXRmb3JtLCB0YXJnZXRVc2VyQWdlbnQpIHtcbiAgICB0aGlzLnN0b3AoKTtcblxuICAgIGNvbnN0IHdpbiA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOlxuICAgICAgICAgICAgICAgIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDpcbiAgICAgICAgICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6XG4gICAgICAgICAgICAgICAge307XG5cbiAgICBpZiAoIXRhcmdldFdpbmRvdykge1xuICAgICAgaWYgKCF3aW4uYWRkRXZlbnRMaXN0ZW5lciAmJiAhd2luLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgIC8vIFRoaXMgd2FzIGFkZGVkIHNvIHdoZW4gdXNpbmcgdGhpbmdzIGxpa2UgSlNET00gd2F0Y2ggY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHdhdGNoXG4gICAgICAgIC8vIGZvciB0aGUgZ2xvYmFsIG5hbWVzcGFjZSBtYW51YWxseS5cbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRDb250ZXh0ID09PSAnZ2xvYmFsJykge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgd2luZG93IGZ1bmN0aW9ucyBhZGRFdmVudExpc3RlbmVyIG9yIGF0dGFjaEV2ZW50LicpO1xuICAgICAgfVxuICAgICAgdGFyZ2V0V2luZG93ID0gd2luO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBlbGVtZW50IGJpbmRpbmdzIHdoZXJlIGEgdGFyZ2V0IHdpbmRvdyBpcyBub3QgcGFzc2VkXG4gICAgaWYgKHR5cGVvZiB0YXJnZXRXaW5kb3cubm9kZVR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICB0YXJnZXRVc2VyQWdlbnQgPSB0YXJnZXRQbGF0Zm9ybTtcbiAgICAgIHRhcmdldFBsYXRmb3JtICA9IHRhcmdldEVsZW1lbnQ7XG4gICAgICB0YXJnZXRFbGVtZW50ICAgPSB0YXJnZXRXaW5kb3c7XG4gICAgICB0YXJnZXRXaW5kb3cgICAgPSB3aW47XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAmJiAhdGFyZ2V0V2luZG93LmF0dGFjaEV2ZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIGFkZEV2ZW50TGlzdGVuZXIgb3IgYXR0YWNoRXZlbnQgbWV0aG9kcyBvbiB0YXJnZXRXaW5kb3cuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5faXNNb2Rlcm5Ccm93c2VyID0gISF0YXJnZXRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcblxuICAgIGNvbnN0IHVzZXJBZ2VudCA9IHRhcmdldFdpbmRvdy5uYXZpZ2F0b3IgJiYgdGFyZ2V0V2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG4gICAgY29uc3QgcGxhdGZvcm0gID0gdGFyZ2V0V2luZG93Lm5hdmlnYXRvciAmJiB0YXJnZXRXaW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtICB8fCAnJztcblxuICAgIHRhcmdldEVsZW1lbnQgICAmJiB0YXJnZXRFbGVtZW50ICAgIT09IG51bGwgfHwgKHRhcmdldEVsZW1lbnQgICA9IHRhcmdldFdpbmRvdy5kb2N1bWVudCk7XG4gICAgdGFyZ2V0UGxhdGZvcm0gICYmIHRhcmdldFBsYXRmb3JtICAhPT0gbnVsbCB8fCAodGFyZ2V0UGxhdGZvcm0gID0gcGxhdGZvcm0pO1xuICAgIHRhcmdldFVzZXJBZ2VudCAmJiB0YXJnZXRVc2VyQWdlbnQgIT09IG51bGwgfHwgKHRhcmdldFVzZXJBZ2VudCA9IHVzZXJBZ2VudCk7XG5cbiAgICB0aGlzLl90YXJnZXRLZXlEb3duQmluZGluZyA9IChldmVudCkgPT4ge1xuICAgICAgdGhpcy5wcmVzc0tleShldmVudC5rZXlDb2RlLCBldmVudCk7XG4gICAgICB0aGlzLl9oYW5kbGVDb21tYW5kQnVnKGV2ZW50LCBwbGF0Zm9ybSk7XG4gICAgfTtcbiAgICB0aGlzLl90YXJnZXRLZXlVcEJpbmRpbmcgPSAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucmVsZWFzZUtleShldmVudC5rZXlDb2RlLCBldmVudCk7XG4gICAgfTtcbiAgICB0aGlzLl90YXJnZXRSZXNldEJpbmRpbmcgPSAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucmVsZWFzZUFsbEtleXMoZXZlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLl9iaW5kRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleWRvd24nLCB0aGlzLl90YXJnZXRLZXlEb3duQmluZGluZyk7XG4gICAgdGhpcy5fYmluZEV2ZW50KHRhcmdldEVsZW1lbnQsICdrZXl1cCcsICAgdGhpcy5fdGFyZ2V0S2V5VXBCaW5kaW5nKTtcbiAgICB0aGlzLl9iaW5kRXZlbnQodGFyZ2V0V2luZG93LCAgJ2ZvY3VzJywgICB0aGlzLl90YXJnZXRSZXNldEJpbmRpbmcpO1xuICAgIHRoaXMuX2JpbmRFdmVudCh0YXJnZXRXaW5kb3csICAnYmx1cicsICAgIHRoaXMuX3RhcmdldFJlc2V0QmluZGluZyk7XG5cbiAgICB0aGlzLl90YXJnZXRFbGVtZW50ICAgPSB0YXJnZXRFbGVtZW50O1xuICAgIHRoaXMuX3RhcmdldFdpbmRvdyAgICA9IHRhcmdldFdpbmRvdztcbiAgICB0aGlzLl90YXJnZXRQbGF0Zm9ybSAgPSB0YXJnZXRQbGF0Zm9ybTtcbiAgICB0aGlzLl90YXJnZXRVc2VyQWdlbnQgPSB0YXJnZXRVc2VyQWdlbnQ7XG5cbiAgICBjb25zdCBjdXJyZW50Q29udGV4dCAgICAgICAgICAgPSB0aGlzLl9jb250ZXh0c1t0aGlzLl9jdXJyZW50Q29udGV4dF07XG4gICAgY3VycmVudENvbnRleHQudGFyZ2V0V2luZG93ICAgID0gdGhpcy5fdGFyZ2V0V2luZG93O1xuICAgIGN1cnJlbnRDb250ZXh0LnRhcmdldEVsZW1lbnQgICA9IHRoaXMuX3RhcmdldEVsZW1lbnQ7XG4gICAgY3VycmVudENvbnRleHQudGFyZ2V0UGxhdGZvcm0gID0gdGhpcy5fdGFyZ2V0UGxhdGZvcm07XG4gICAgY3VycmVudENvbnRleHQudGFyZ2V0VXNlckFnZW50ID0gdGhpcy5fdGFyZ2V0VXNlckFnZW50O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICghdGhpcy5fdGFyZ2V0RWxlbWVudCB8fCAhdGhpcy5fdGFyZ2V0V2luZG93KSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5fdW5iaW5kRXZlbnQodGhpcy5fdGFyZ2V0RWxlbWVudCwgJ2tleWRvd24nLCB0aGlzLl90YXJnZXRLZXlEb3duQmluZGluZyk7XG4gICAgdGhpcy5fdW5iaW5kRXZlbnQodGhpcy5fdGFyZ2V0RWxlbWVudCwgJ2tleXVwJywgICB0aGlzLl90YXJnZXRLZXlVcEJpbmRpbmcpO1xuICAgIHRoaXMuX3VuYmluZEV2ZW50KHRoaXMuX3RhcmdldFdpbmRvdywgICdmb2N1cycsICAgdGhpcy5fdGFyZ2V0UmVzZXRCaW5kaW5nKTtcbiAgICB0aGlzLl91bmJpbmRFdmVudCh0aGlzLl90YXJnZXRXaW5kb3csICAnYmx1cicsICAgIHRoaXMuX3RhcmdldFJlc2V0QmluZGluZyk7XG5cbiAgICB0aGlzLl90YXJnZXRXaW5kb3cgID0gbnVsbDtcbiAgICB0aGlzLl90YXJnZXRFbGVtZW50ID0gbnVsbDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJlc3NLZXkoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICBpZiAodGhpcy5fcGF1c2VkKSB7IHJldHVybiB0aGlzOyB9XG4gICAgaWYgKCF0aGlzLl9sb2NhbGUpIHsgdGhyb3cgbmV3IEVycm9yKCdMb2NhbGUgbm90IHNldCcpOyB9XG5cbiAgICB0aGlzLl9sb2NhbGUucHJlc3NLZXkoa2V5Q29kZSk7XG4gICAgdGhpcy5fYXBwbHlCaW5kaW5ncyhldmVudCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlbGVhc2VLZXkoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICBpZiAodGhpcy5fcGF1c2VkKSB7IHJldHVybiB0aGlzOyB9XG4gICAgaWYgKCF0aGlzLl9sb2NhbGUpIHsgdGhyb3cgbmV3IEVycm9yKCdMb2NhbGUgbm90IHNldCcpOyB9XG5cbiAgICB0aGlzLl9sb2NhbGUucmVsZWFzZUtleShrZXlDb2RlKTtcbiAgICB0aGlzLl9jbGVhckJpbmRpbmdzKGV2ZW50KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVsZWFzZUFsbEtleXMoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5fcGF1c2VkKSB7IHJldHVybiB0aGlzOyB9XG4gICAgaWYgKCF0aGlzLl9sb2NhbGUpIHsgdGhyb3cgbmV3IEVycm9yKCdMb2NhbGUgbm90IHNldCcpOyB9XG5cbiAgICB0aGlzLl9sb2NhbGUucHJlc3NlZEtleXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9jbGVhckJpbmRpbmdzKGV2ZW50KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgaWYgKHRoaXMuX3BhdXNlZCkgeyByZXR1cm4gdGhpczsgfVxuICAgIGlmICh0aGlzLl9sb2NhbGUpIHsgdGhpcy5yZWxlYXNlQWxsS2V5cygpOyB9XG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVzdW1lKCkge1xuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnJlbGVhc2VBbGxLZXlzKCk7XG4gICAgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCA9IDA7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9iaW5kRXZlbnQodGFyZ2V0RWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTW9kZXJuQnJvd3NlciA/XG4gICAgICB0YXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSkgOlxuICAgICAgdGFyZ2V0RWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIF91bmJpbmRFdmVudCh0YXJnZXRFbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5faXNNb2Rlcm5Ccm93c2VyID9cbiAgICAgIHRhcmdldEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKSA6XG4gICAgICB0YXJnZXRFbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgX2dldEdyb3VwZWRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgbGlzdGVuZXJHcm91cHMgICA9IFtdO1xuICAgIGNvbnN0IGxpc3RlbmVyR3JvdXBNYXAgPSBbXTtcblxuICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRDb250ZXh0ICE9PSAnZ2xvYmFsJykge1xuICAgICAgbGlzdGVuZXJzID0gWy4uLmxpc3RlbmVycywgLi4udGhpcy5fY29udGV4dHMuZ2xvYmFsLmxpc3RlbmVyc107XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLnNvcnQoXG4gICAgICAoYSwgYikgPT5cbiAgICAgICAgKGIua2V5Q29tYm8gPyBiLmtleUNvbWJvLmtleU5hbWVzLmxlbmd0aCA6IDApIC1cbiAgICAgICAgKGEua2V5Q29tYm8gPyBhLmtleUNvbWJvLmtleU5hbWVzLmxlbmd0aCA6IDApXG4gICAgKS5mb3JFYWNoKChsKSA9PiB7XG4gICAgICBsZXQgbWFwSW5kZXggPSAtMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJHcm91cE1hcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAobGlzdGVuZXJHcm91cE1hcFtpXSA9PT0gbnVsbCAmJiBsLmtleUNvbWJvID09PSBudWxsIHx8XG4gICAgICAgICAgICBsaXN0ZW5lckdyb3VwTWFwW2ldICE9PSBudWxsICYmIGxpc3RlbmVyR3JvdXBNYXBbaV0uaXNFcXVhbChsLmtleUNvbWJvKSkge1xuICAgICAgICAgIG1hcEluZGV4ID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1hcEluZGV4ID09PSAtMSkge1xuICAgICAgICBtYXBJbmRleCA9IGxpc3RlbmVyR3JvdXBNYXAubGVuZ3RoO1xuICAgICAgICBsaXN0ZW5lckdyb3VwTWFwLnB1c2gobC5rZXlDb21ibyk7XG4gICAgICB9XG4gICAgICBpZiAoIWxpc3RlbmVyR3JvdXBzW21hcEluZGV4XSkge1xuICAgICAgICBsaXN0ZW5lckdyb3Vwc1ttYXBJbmRleF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyR3JvdXBzW21hcEluZGV4XS5wdXNoKGwpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyR3JvdXBzO1xuICB9XG5cbiAgX2FwcGx5QmluZGluZ3MoZXZlbnQpIHtcbiAgICBsZXQgcHJldmVudFJlcGVhdCA9IGZhbHNlO1xuXG4gICAgZXZlbnQgfHwgKGV2ZW50ID0ge30pO1xuICAgIGV2ZW50LnByZXZlbnRSZXBlYXQgPSAoKSA9PiB7IHByZXZlbnRSZXBlYXQgPSB0cnVlOyB9O1xuICAgIGV2ZW50LnByZXNzZWRLZXlzICAgPSB0aGlzLl9sb2NhbGUucHJlc3NlZEtleXMuc2xpY2UoMCk7XG5cbiAgICBjb25zdCBhY3RpdmVUYXJnZXRLZXlzID0gdGhpcy5fbG9jYWxlLmFjdGl2ZVRhcmdldEtleXM7XG4gICAgY29uc3QgcHJlc3NlZEtleXMgICAgICA9IHRoaXMuX2xvY2FsZS5wcmVzc2VkS2V5cy5zbGljZSgwKTtcbiAgICBjb25zdCBsaXN0ZW5lckdyb3VwcyAgID0gdGhpcy5fZ2V0R3JvdXBlZExpc3RlbmVycygpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lckdyb3Vwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbGlzdGVuZXJzID0gbGlzdGVuZXJHcm91cHNbaV07XG4gICAgICBjb25zdCBrZXlDb21ibyAgPSBsaXN0ZW5lcnNbMF0ua2V5Q29tYm87XG5cbiAgICAgIGlmIChcbiAgICAgICAga2V5Q29tYm8gPT09IG51bGwgfHxcbiAgICAgICAga2V5Q29tYm8uY2hlY2socHJlc3NlZEtleXMpICYmXG4gICAgICAgIGFjdGl2ZVRhcmdldEtleXMuc29tZShrID0+IGtleUNvbWJvLmtleU5hbWVzLmluY2x1ZGVzKGspKVxuICAgICAgKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGlzdGVuZXJzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgbGV0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2pdO1xuXG4gICAgICAgICAgaWYgKCFsaXN0ZW5lci5leGVjdXRpbmdIYW5kbGVyICYmIGxpc3RlbmVyLnByZXNzSGFuZGxlciAmJiAhbGlzdGVuZXIucHJldmVudFJlcGVhdCkge1xuICAgICAgICAgICAgbGlzdGVuZXIuZXhlY3V0aW5nSGFuZGxlciA9IHRydWU7XG4gICAgICAgICAgICBsaXN0ZW5lci5wcmVzc0hhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgICAgICBsaXN0ZW5lci5leGVjdXRpbmdIYW5kbGVyID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChwcmV2ZW50UmVwZWF0IHx8IGxpc3RlbmVyLnByZXZlbnRSZXBlYXRCeURlZmF1bHQpIHtcbiAgICAgICAgICAgICAgbGlzdGVuZXIucHJldmVudFJlcGVhdCA9IHRydWU7XG4gICAgICAgICAgICAgIHByZXZlbnRSZXBlYXQgICAgICAgICAgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fYXBwbGllZExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGxpZWRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleUNvbWJvKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBrZXlDb21iby5rZXlOYW1lcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwcmVzc2VkS2V5cy5pbmRleE9mKGtleUNvbWJvLmtleU5hbWVzW2pdKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgcHJlc3NlZEtleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgaiAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9jbGVhckJpbmRpbmdzKGV2ZW50KSB7XG4gICAgZXZlbnQgfHwgKGV2ZW50ID0ge30pO1xuICAgIGV2ZW50LnByZXNzZWRLZXlzID0gdGhpcy5fbG9jYWxlLnByZXNzZWRLZXlzLnNsaWNlKDApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hcHBsaWVkTGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IHRoaXMuX2FwcGxpZWRMaXN0ZW5lcnNbaV07XG4gICAgICBjb25zdCBrZXlDb21ibyA9IGxpc3RlbmVyLmtleUNvbWJvO1xuICAgICAgaWYgKGtleUNvbWJvID09PSBudWxsIHx8ICFrZXlDb21iby5jaGVjayh0aGlzLl9sb2NhbGUucHJlc3NlZEtleXMpKSB7XG4gICAgICAgIGxpc3RlbmVyLnByZXZlbnRSZXBlYXQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGtleUNvbWJvICE9PSBudWxsIHx8IGV2ZW50LnByZXNzZWRLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2FwcGxpZWRMaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWxpc3RlbmVyLmV4ZWN1dGluZ0hhbmRsZXIgJiYgbGlzdGVuZXIucmVsZWFzZUhhbmRsZXIpIHtcbiAgICAgICAgICBsaXN0ZW5lci5leGVjdXRpbmdIYW5kbGVyID0gdHJ1ZTtcbiAgICAgICAgICBsaXN0ZW5lci5yZWxlYXNlSGFuZGxlci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICBsaXN0ZW5lci5leGVjdXRpbmdIYW5kbGVyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaGFuZGxlQ29tbWFuZEJ1ZyhldmVudCwgcGxhdGZvcm0pIHtcbiAgICAvLyBPbiBNYWMgd2hlbiB0aGUgY29tbWFuZCBrZXkgaXMga2VwdCBwcmVzc2VkLCBrZXl1cCBpcyBub3QgdHJpZ2dlcmVkIGZvciBhbnkgb3RoZXIga2V5LlxuICAgIC8vIEluIHRoaXMgY2FzZSBmb3JjZSBhIGtleXVwIGZvciBub24tbW9kaWZpZXIga2V5cyBkaXJlY3RseSBhZnRlciB0aGUga2V5cHJlc3MuXG4gICAgY29uc3QgbW9kaWZpZXJLZXlzID0gW1wic2hpZnRcIiwgXCJjdHJsXCIsIFwiYWx0XCIsIFwiY2Fwc2xvY2tcIiwgXCJ0YWJcIiwgXCJjb21tYW5kXCJdO1xuICAgIGlmIChwbGF0Zm9ybS5tYXRjaChcIk1hY1wiKSAmJiB0aGlzLl9sb2NhbGUucHJlc3NlZEtleXMuaW5jbHVkZXMoXCJjb21tYW5kXCIpICYmXG4gICAgICAgICFtb2RpZmllcktleXMuaW5jbHVkZXModGhpcy5fbG9jYWxlLmdldEtleU5hbWVzKGV2ZW50LmtleUNvZGUpWzBdKSkge1xuICAgICAgdGhpcy5fdGFyZ2V0S2V5VXBCaW5kaW5nKGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIHVzKGxvY2FsZSwgcGxhdGZvcm0sIHVzZXJBZ2VudCkge1xuXG4gIC8vIGdlbmVyYWxcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDMsICAgWydjYW5jZWwnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg4LCAgIFsnYmFja3NwYWNlJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoOSwgICBbJ3RhYiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEyLCAgWydjbGVhciddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEzLCAgWydlbnRlciddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDE2LCAgWydzaGlmdCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDE3LCAgWydjdHJsJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTgsICBbJ2FsdCcsICdtZW51J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTksICBbJ3BhdXNlJywgJ2JyZWFrJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMjAsICBbJ2NhcHNsb2NrJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMjcsICBbJ2VzY2FwZScsICdlc2MnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgzMiwgIFsnc3BhY2UnLCAnc3BhY2ViYXInXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgzMywgIFsncGFnZXVwJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMzQsICBbJ3BhZ2Vkb3duJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMzUsICBbJ2VuZCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDM2LCAgWydob21lJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMzcsICBbJ2xlZnQnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgzOCwgIFsndXAnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgzOSwgIFsncmlnaHQnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg0MCwgIFsnZG93biddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDQxLCAgWydzZWxlY3QnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg0MiwgIFsncHJpbnRzY3JlZW4nXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg0MywgIFsnZXhlY3V0ZSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDQ0LCAgWydzbmFwc2hvdCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDQ1LCAgWydpbnNlcnQnLCAnaW5zJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNDYsICBbJ2RlbGV0ZScsICdkZWwnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg0NywgIFsnaGVscCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDE0NSwgWydzY3JvbGxsb2NrJywgJ3Njcm9sbCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDE4OCwgWydjb21tYScsICcsJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTkwLCBbJ3BlcmlvZCcsICcuJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTkxLCBbJ3NsYXNoJywgJ2ZvcndhcmRzbGFzaCcsICcvJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTkyLCBbJ2dyYXZlYWNjZW50JywgJ2AnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgyMTksIFsnb3BlbmJyYWNrZXQnLCAnWyddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDIyMCwgWydiYWNrc2xhc2gnLCAnXFxcXCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDIyMSwgWydjbG9zZWJyYWNrZXQnLCAnXSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDIyMiwgWydhcG9zdHJvcGhlJywgJ1xcJyddKTtcblxuICAvLyAwLTlcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDQ4LCBbJ3plcm8nLCAnMCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDQ5LCBbJ29uZScsICcxJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNTAsIFsndHdvJywgJzInXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg1MSwgWyd0aHJlZScsICczJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNTIsIFsnZm91cicsICc0J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNTMsIFsnZml2ZScsICc1J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNTQsIFsnc2l4JywgJzYnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg1NSwgWydzZXZlbicsICc3J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNTYsIFsnZWlnaHQnLCAnOCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDU3LCBbJ25pbmUnLCAnOSddKTtcblxuICAvLyBudW1wYWRcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDk2LCBbJ251bXplcm8nLCAnbnVtMCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDk3LCBbJ251bW9uZScsICdudW0xJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoOTgsIFsnbnVtdHdvJywgJ251bTInXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg5OSwgWydudW10aHJlZScsICdudW0zJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTAwLCBbJ251bWZvdXInLCAnbnVtNCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEwMSwgWydudW1maXZlJywgJ251bTUnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMDIsIFsnbnVtc2l4JywgJ251bTYnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMDMsIFsnbnVtc2V2ZW4nLCAnbnVtNyddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEwNCwgWydudW1laWdodCcsICdudW04J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTA1LCBbJ251bW5pbmUnLCAnbnVtOSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEwNiwgWydudW1tdWx0aXBseScsICdudW0qJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTA3LCBbJ251bWFkZCcsICdudW0rJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTA4LCBbJ251bWVudGVyJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTA5LCBbJ251bXN1YnRyYWN0JywgJ251bS0nXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMTAsIFsnbnVtZGVjaW1hbCcsICdudW0uJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTExLCBbJ251bWRpdmlkZScsICdudW0vJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTQ0LCBbJ251bWxvY2snLCAnbnVtJ10pO1xuXG4gIC8vIGZ1bmN0aW9uIGtleXNcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDExMiwgWydmMSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDExMywgWydmMiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDExNCwgWydmMyddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDExNSwgWydmNCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDExNiwgWydmNSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDExNywgWydmNiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDExOCwgWydmNyddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDExOSwgWydmOCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEyMCwgWydmOSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEyMSwgWydmMTAnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMjIsIFsnZjExJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTIzLCBbJ2YxMiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEyNCwgWydmMTMnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMjUsIFsnZjE0J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTI2LCBbJ2YxNSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEyNywgWydmMTYnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMjgsIFsnZjE3J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTI5LCBbJ2YxOCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEzMCwgWydmMTknXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMzEsIFsnZjIwJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTMyLCBbJ2YyMSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEzMywgWydmMjInXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMzQsIFsnZjIzJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTM1LCBbJ2YyNCddKTtcblxuICAvLyBzZWNvbmRhcnkga2V5IHN5bWJvbHNcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyBgJywgWyd0aWxkZScsICd+J10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIDEnLCBbJ2V4Y2xhbWF0aW9uJywgJ2V4Y2xhbWF0aW9ucG9pbnQnLCAnISddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyAyJywgWydhdCcsICdAJ10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIDMnLCBbJ251bWJlcicsICcjJ10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIDQnLCBbJ2RvbGxhcicsICdkb2xsYXJzJywgJ2RvbGxhcnNpZ24nLCAnJCddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyA1JywgWydwZXJjZW50JywgJyUnXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgNicsIFsnY2FyZXQnLCAnXiddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyA3JywgWydhbXBlcnNhbmQnLCAnYW5kJywgJyYnXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgOCcsIFsnYXN0ZXJpc2snLCAnKiddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyA5JywgWydvcGVucGFyZW4nLCAnKCddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyAwJywgWydjbG9zZXBhcmVuJywgJyknXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgLScsIFsndW5kZXJzY29yZScsICdfJ10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArID0nLCBbJ3BsdXMnLCAnKyddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyBbJywgWydvcGVuY3VybHlicmFjZScsICdvcGVuY3VybHlicmFja2V0JywgJ3snXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgXScsIFsnY2xvc2VjdXJseWJyYWNlJywgJ2Nsb3NlY3VybHlicmFja2V0JywgJ30nXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgXFxcXCcsIFsndmVydGljYWxiYXInLCAnfCddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyA7JywgWydjb2xvbicsICc6J10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIFxcJycsIFsncXVvdGF0aW9ubWFyaycsICdcXCcnXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgISwnLCBbJ29wZW5hbmdsZWJyYWNrZXQnLCAnPCddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyAuJywgWydjbG9zZWFuZ2xlYnJhY2tldCcsICc+J10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIC8nLCBbJ3F1ZXN0aW9ubWFyaycsICc/J10pO1xuXG4gIGlmIChwbGF0Zm9ybS5tYXRjaCgnTWFjJykpIHtcbiAgICBsb2NhbGUuYmluZE1hY3JvKCdjb21tYW5kJywgWydtb2QnLCAnbW9kaWZpZXInXSk7XG4gIH0gZWxzZSB7XG4gICAgbG9jYWxlLmJpbmRNYWNybygnY3RybCcsIFsnbW9kJywgJ21vZGlmaWVyJ10pO1xuICB9XG5cbiAgLy9hLXogYW5kIEEtWlxuICBmb3IgKGxldCBrZXlDb2RlID0gNjU7IGtleUNvZGUgPD0gOTA7IGtleUNvZGUgKz0gMSkge1xuICAgIHZhciBrZXlOYW1lID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXlDb2RlICsgMzIpO1xuICAgIHZhciBjYXBpdGFsS2V5TmFtZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5Q29kZSk7XG4gIFx0bG9jYWxlLmJpbmRLZXlDb2RlKGtleUNvZGUsIGtleU5hbWUpO1xuICBcdGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgJyArIGtleU5hbWUsIGNhcGl0YWxLZXlOYW1lKTtcbiAgXHRsb2NhbGUuYmluZE1hY3JvKCdjYXBzbG9jayArICcgKyBrZXlOYW1lLCBjYXBpdGFsS2V5TmFtZSk7XG4gIH1cblxuICAvLyBicm93c2VyIGNhdmVhdHNcbiAgY29uc3Qgc2VtaWNvbG9uS2V5Q29kZSA9IHVzZXJBZ2VudC5tYXRjaCgnRmlyZWZveCcpID8gNTkgIDogMTg2O1xuICBjb25zdCBkYXNoS2V5Q29kZSAgICAgID0gdXNlckFnZW50Lm1hdGNoKCdGaXJlZm94JykgPyAxNzMgOiAxODk7XG4gIGNvbnN0IGVxdWFsS2V5Q29kZSAgICAgPSB1c2VyQWdlbnQubWF0Y2goJ0ZpcmVmb3gnKSA/IDYxICA6IDE4NztcbiAgbGV0IGxlZnRDb21tYW5kS2V5Q29kZTtcbiAgbGV0IHJpZ2h0Q29tbWFuZEtleUNvZGU7XG4gIGlmIChwbGF0Zm9ybS5tYXRjaCgnTWFjJykgJiYgKHVzZXJBZ2VudC5tYXRjaCgnU2FmYXJpJykgfHwgdXNlckFnZW50Lm1hdGNoKCdDaHJvbWUnKSkpIHtcbiAgICBsZWZ0Q29tbWFuZEtleUNvZGUgID0gOTE7XG4gICAgcmlnaHRDb21tYW5kS2V5Q29kZSA9IDkzO1xuICB9IGVsc2UgaWYocGxhdGZvcm0ubWF0Y2goJ01hYycpICYmIHVzZXJBZ2VudC5tYXRjaCgnT3BlcmEnKSkge1xuICAgIGxlZnRDb21tYW5kS2V5Q29kZSAgPSAxNztcbiAgICByaWdodENvbW1hbmRLZXlDb2RlID0gMTc7XG4gIH0gZWxzZSBpZihwbGF0Zm9ybS5tYXRjaCgnTWFjJykgJiYgdXNlckFnZW50Lm1hdGNoKCdGaXJlZm94JykpIHtcbiAgICBsZWZ0Q29tbWFuZEtleUNvZGUgID0gMjI0O1xuICAgIHJpZ2h0Q29tbWFuZEtleUNvZGUgPSAyMjQ7XG4gIH1cbiAgbG9jYWxlLmJpbmRLZXlDb2RlKHNlbWljb2xvbktleUNvZGUsICAgIFsnc2VtaWNvbG9uJywgJzsnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZShkYXNoS2V5Q29kZSwgICAgICAgICBbJ2Rhc2gnLCAnLSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKGVxdWFsS2V5Q29kZSwgICAgICAgIFsnZXF1YWwnLCAnZXF1YWxzaWduJywgJz0nXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZShsZWZ0Q29tbWFuZEtleUNvZGUsICBbJ2NvbW1hbmQnLCAnd2luZG93cycsICd3aW4nLCAnc3VwZXInLCAnbGVmdGNvbW1hbmQnLCAnbGVmdHdpbmRvd3MnLCAnbGVmdHdpbicsICdsZWZ0c3VwZXInXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZShyaWdodENvbW1hbmRLZXlDb2RlLCBbJ2NvbW1hbmQnLCAnd2luZG93cycsICd3aW4nLCAnc3VwZXInLCAncmlnaHRjb21tYW5kJywgJ3JpZ2h0d2luZG93cycsICdyaWdodHdpbicsICdyaWdodHN1cGVyJ10pO1xuXG4gIC8vIGtpbGwga2V5c1xuICBsb2NhbGUuc2V0S2lsbEtleSgnY29tbWFuZCcpO1xufTtcbiIsImltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9saWIva2V5Ym9hcmQnO1xuaW1wb3J0IHsgTG9jYWxlIH0gZnJvbSAnLi9saWIvbG9jYWxlJztcbmltcG9ydCB7IEtleUNvbWJvIH0gZnJvbSAnLi9saWIva2V5LWNvbWJvJztcbmltcG9ydCB7IHVzIH0gZnJvbSAnLi9sb2NhbGVzL3VzJztcblxuY29uc3Qga2V5Ym9hcmQgPSBuZXcgS2V5Ym9hcmQoKTtcblxua2V5Ym9hcmQuc2V0TG9jYWxlKCd1cycsIHVzKTtcblxua2V5Ym9hcmQuS2V5Ym9hcmQgPSBLZXlib2FyZDtcbmtleWJvYXJkLkxvY2FsZSA9IExvY2FsZTtcbmtleWJvYXJkLktleUNvbWJvID0gS2V5Q29tYm87XG5cbmV4cG9ydCBkZWZhdWx0IGtleWJvYXJkO1xuIl0sIm5hbWVzIjpbIktleUNvbWJvIiwia2V5Q29tYm9TdHIiLCJzb3VyY2VTdHIiLCJzdWJDb21ib3MiLCJwYXJzZUNvbWJvU3RyIiwia2V5TmFtZXMiLCJyZWR1Y2UiLCJtZW1vIiwibmV4dFN1YkNvbWJvIiwiY29uY2F0IiwicHJlc3NlZEtleU5hbWVzIiwic3RhcnRpbmdLZXlOYW1lSW5kZXgiLCJpIiwibGVuZ3RoIiwiX2NoZWNrU3ViQ29tYm8iLCJvdGhlcktleUNvbWJvIiwic3ViQ29tYm8iLCJvdGhlclN1YkNvbWJvIiwic2xpY2UiLCJqIiwia2V5TmFtZSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImVuZEluZGV4IiwiZXNjYXBlZEtleU5hbWUiLCJjb21ib0RlbGltaW5hdG9yIiwia2V5RGVsaW1pbmF0b3IiLCJzdWJDb21ib1N0cnMiLCJfc3BsaXRTdHIiLCJjb21ibyIsInB1c2giLCJzdHIiLCJkZWxpbWluYXRvciIsInMiLCJkIiwiYyIsImNhIiwiY2kiLCJ0cmltIiwiTG9jYWxlIiwibmFtZSIsImxvY2FsZU5hbWUiLCJhY3RpdmVUYXJnZXRLZXlzIiwicHJlc3NlZEtleXMiLCJfYXBwbGllZE1hY3JvcyIsIl9rZXlNYXAiLCJfa2lsbEtleUNvZGVzIiwiX21hY3JvcyIsImtleUNvZGUiLCJoYW5kbGVyIiwibWFjcm8iLCJrZXlDb21ibyIsImtleUNvZGVzIiwiZ2V0S2V5Q29kZXMiLCJzZXRLaWxsS2V5IiwicHJlc3NLZXkiLCJnZXRLZXlOYW1lcyIsIl9hcHBseU1hY3JvcyIsInJlbGVhc2VLZXkiLCJraWxsS2V5Q29kZUluZGV4IiwiX2NsZWFyTWFjcm9zIiwibWFjcm9zIiwiY2hlY2siLCJLZXlib2FyZCIsInRhcmdldFdpbmRvdyIsInRhcmdldEVsZW1lbnQiLCJ0YXJnZXRQbGF0Zm9ybSIsInRhcmdldFVzZXJBZ2VudCIsIl9sb2NhbGUiLCJfY3VycmVudENvbnRleHQiLCJfY29udGV4dHMiLCJfbGlzdGVuZXJzIiwiX2FwcGxpZWRMaXN0ZW5lcnMiLCJfbG9jYWxlcyIsIl90YXJnZXRFbGVtZW50IiwiX3RhcmdldFdpbmRvdyIsIl90YXJnZXRQbGF0Zm9ybSIsIl90YXJnZXRVc2VyQWdlbnQiLCJfaXNNb2Rlcm5Ccm93c2VyIiwiX3RhcmdldEtleURvd25CaW5kaW5nIiwiX3RhcmdldEtleVVwQmluZGluZyIsIl90YXJnZXRSZXNldEJpbmRpbmciLCJfcGF1c2VkIiwiZ2xvYmFsIiwibGlzdGVuZXJzIiwic2V0Q29udGV4dCIsImxvY2FsZUJ1aWxkZXIiLCJsb2NhbGUiLCJfbG9jYWxlTmFtZSIsImxvY2FsTmFtZSIsInByZXNzSGFuZGxlciIsInJlbGVhc2VIYW5kbGVyIiwicHJldmVudFJlcGVhdEJ5RGVmYXVsdCIsImJpbmQiLCJwcmV2ZW50UmVwZWF0IiwiZXhlY3V0aW5nSGFuZGxlciIsInVuYmluZCIsImxpc3RlbmVyIiwiY29tYm9NYXRjaGVzIiwiaXNFcXVhbCIsInByZXNzSGFuZGxlck1hdGNoZXMiLCJyZWxlYXNlSGFuZGxlck1hdGNoZXMiLCJjb250ZXh0TmFtZSIsInJlbGVhc2VBbGxLZXlzIiwiZ2xvYmFsQ29udGV4dCIsImNvbnRleHQiLCJzdG9wIiwid2F0Y2giLCJjYWxsYmFjayIsInByZXZpb3VzQ29udGV4dE5hbWUiLCJnZXRDb250ZXh0Iiwid2luIiwiZ2xvYmFsVGhpcyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsIkVycm9yIiwibm9kZVR5cGUiLCJ1c2VyQWdlbnQiLCJuYXZpZ2F0b3IiLCJwbGF0Zm9ybSIsImRvY3VtZW50IiwiZXZlbnQiLCJfaGFuZGxlQ29tbWFuZEJ1ZyIsIl9iaW5kRXZlbnQiLCJjdXJyZW50Q29udGV4dCIsIl91bmJpbmRFdmVudCIsIl9hcHBseUJpbmRpbmdzIiwiX2NsZWFyQmluZGluZ3MiLCJldmVudE5hbWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGV0YWNoRXZlbnQiLCJsaXN0ZW5lckdyb3VwcyIsImxpc3RlbmVyR3JvdXBNYXAiLCJzb3J0IiwiYSIsImIiLCJmb3JFYWNoIiwibCIsIm1hcEluZGV4IiwiX2dldEdyb3VwZWRMaXN0ZW5lcnMiLCJzb21lIiwiayIsImluY2x1ZGVzIiwiY2FsbCIsIm1vZGlmaWVyS2V5cyIsIm1hdGNoIiwidXMiLCJiaW5kS2V5Q29kZSIsImJpbmRNYWNybyIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNhcGl0YWxLZXlOYW1lIiwic2VtaWNvbG9uS2V5Q29kZSIsImRhc2hLZXlDb2RlIiwiZXF1YWxLZXlDb2RlIiwibGVmdENvbW1hbmRLZXlDb2RlIiwicmlnaHRDb21tYW5kS2V5Q29kZSIsImtleWJvYXJkIiwic2V0TG9jYWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUNhQSxRQUFiO0VBQ0Usb0JBQVlDLFdBQVosRUFBeUI7RUFBQTs7RUFDdkIsU0FBS0MsU0FBTCxHQUFpQkQsV0FBakI7RUFDQSxTQUFLRSxTQUFMLEdBQWlCSCxRQUFRLENBQUNJLGFBQVQsQ0FBdUJILFdBQXZCLENBQWpCO0VBQ0EsU0FBS0ksUUFBTCxHQUFpQixLQUFLRixTQUFMLENBQWVHLE1BQWYsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFPQyxZQUFQO0VBQUEsYUFDckNELElBQUksQ0FBQ0UsTUFBTCxDQUFZRCxZQUFaLENBRHFDO0VBQUEsS0FBdEIsRUFDWSxFQURaLENBQWpCO0VBRUQ7O0VBTkg7RUFBQTtFQUFBLDBCQVFRRSxlQVJSLEVBUXlCO0VB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
