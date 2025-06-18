/*!
 * pinia v3.0.0
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
var Pinia = (function (exports, vue) {
  'use strict';

  /**
   * setActivePinia must be called to handle SSR at the top of functions like
   * `fetch`, `setup`, `serverPrefetch` and others
   */
  let activePinia;
  /**
   * Sets or unsets the active pinia. Used in SSR and internally when calling
   * actions and getters
   *
   * @param pinia - Pinia instance
   */
  // @ts-expect-error: cannot constrain the type of the return
  const setActivePinia = (pinia) => (activePinia = pinia);
  /**
   * Get the currently active pinia if there is any.
   */
  const getActivePinia = () => (vue.hasInjectionContext() && vue.inject(piniaSymbol)) || activePinia;
  const piniaSymbol = (Symbol('pinia') );

  var __create$1 = Object.create;
  var __defProp$1 = Object.defineProperty;
  var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames$1 = Object.getOwnPropertyNames;
  var __getProtoOf$1 = Object.getPrototypeOf;
  var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
  var __esm$1 = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames$1(fn)[0]])(fn = 0)), res;
  };
  var __commonJS$1 = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps$1 = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames$1(from))
        if (!__hasOwnProp$1.call(to, key) && key !== except)
          __defProp$1(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM$1 = (mod, isNodeMode, target2) => (target2 = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    __defProp$1(target2, "default", { value: mod, enumerable: true }) ,
    mod
  ));

  // ../../node_modules/.pnpm/tsup@8.3.5_@microsoft+api-extractor@7.48.1_@types+node@22.10.5__jiti@2.4.2_postcss@8.4.49_tsx_s7k37zks4wtn7x2grzma6lrsfa/node_modules/tsup/assets/esm_shims.js
  var init_esm_shims$1 = __esm$1({
    "../../node_modules/.pnpm/tsup@8.3.5_@microsoft+api-extractor@7.48.1_@types+node@22.10.5__jiti@2.4.2_postcss@8.4.49_tsx_s7k37zks4wtn7x2grzma6lrsfa/node_modules/tsup/assets/esm_shims.js"() {
    }
  });

  // ../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js
  var require_rfdc = __commonJS$1({
    "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(exports, module) {
      init_esm_shims$1();
      module.exports = rfdc2;
      function copyBuffer(cur) {
        if (cur instanceof Buffer) {
          return Buffer.from(cur);
        }
        return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
      }
      function rfdc2(opts) {
        opts = opts || {};
        if (opts.circles) return rfdcCircles(opts);
        const constructorHandlers = /* @__PURE__ */ new Map();
        constructorHandlers.set(Date, (o) => new Date(o));
        constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
        constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
        if (opts.constructorHandlers) {
          for (const handler2 of opts.constructorHandlers) {
            constructorHandlers.set(handler2[0], handler2[1]);
          }
        }
        let handler = null;
        return opts.proto ? cloneProto : clone;
        function cloneArray(a, fn) {
          const keys = Object.keys(a);
          const a2 = new Array(keys.length);
          for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            const cur = a[k];
            if (typeof cur !== "object" || cur === null) {
              a2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              a2[k] = handler(cur, fn);
            } else if (ArrayBuffer.isView(cur)) {
              a2[k] = copyBuffer(cur);
            } else {
              a2[k] = fn(cur);
            }
          }
          return a2;
        }
        function clone(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, clone);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, clone);
          }
          const o2 = {};
          for (const k in o) {
            if (Object.hasOwnProperty.call(o, k) === false) continue;
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, clone);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              o2[k] = clone(cur);
            }
          }
          return o2;
        }
        function cloneProto(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, cloneProto);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, cloneProto);
          }
          const o2 = {};
          for (const k in o) {
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, cloneProto);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              o2[k] = cloneProto(cur);
            }
          }
          return o2;
        }
      }
      function rfdcCircles(opts) {
        const refs = [];
        const refsNew = [];
        const constructorHandlers = /* @__PURE__ */ new Map();
        constructorHandlers.set(Date, (o) => new Date(o));
        constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
        constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
        if (opts.constructorHandlers) {
          for (const handler2 of opts.constructorHandlers) {
            constructorHandlers.set(handler2[0], handler2[1]);
          }
        }
        let handler = null;
        return opts.proto ? cloneProto : clone;
        function cloneArray(a, fn) {
          const keys = Object.keys(a);
          const a2 = new Array(keys.length);
          for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            const cur = a[k];
            if (typeof cur !== "object" || cur === null) {
              a2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              a2[k] = handler(cur, fn);
            } else if (ArrayBuffer.isView(cur)) {
              a2[k] = copyBuffer(cur);
            } else {
              const index = refs.indexOf(cur);
              if (index !== -1) {
                a2[k] = refsNew[index];
              } else {
                a2[k] = fn(cur);
              }
            }
          }
          return a2;
        }
        function clone(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, clone);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, clone);
          }
          const o2 = {};
          refs.push(o);
          refsNew.push(o2);
          for (const k in o) {
            if (Object.hasOwnProperty.call(o, k) === false) continue;
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, clone);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              const i = refs.indexOf(cur);
              if (i !== -1) {
                o2[k] = refsNew[i];
              } else {
                o2[k] = clone(cur);
              }
            }
          }
          refs.pop();
          refsNew.pop();
          return o2;
        }
        function cloneProto(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, cloneProto);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, cloneProto);
          }
          const o2 = {};
          refs.push(o);
          refsNew.push(o2);
          for (const k in o) {
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, cloneProto);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              const i = refs.indexOf(cur);
              if (i !== -1) {
                o2[k] = refsNew[i];
              } else {
                o2[k] = cloneProto(cur);
              }
            }
          }
          refs.pop();
          refsNew.pop();
          return o2;
        }
      }
    }
  });

  // src/index.ts
  init_esm_shims$1();

  // src/constants.ts
  init_esm_shims$1();

  // src/env.ts
  init_esm_shims$1();
  var isBrowser = typeof navigator !== "undefined";
  var target = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : {};
  typeof target.chrome !== "undefined" && !!target.chrome.devtools;
  isBrowser && target.self !== target.top;
  var _a$1;
  typeof navigator !== "undefined" && ((_a$1 = navigator.userAgent) == null ? undefined : _a$1.toLowerCase().includes("electron"));

  // src/general.ts
  init_esm_shims$1();
  var import_rfdc = __toESM$1(require_rfdc());
  var classifyRE = /(?:^|[-_/])(\w)/g;
  function toUpper(_, c) {
    return c ? c.toUpperCase() : "";
  }
  function classify(str) {
    return str && `${str}`.replace(classifyRE, toUpper);
  }
  function basename(filename, ext) {
    let normalizedFilename = filename.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
    if (normalizedFilename.endsWith(`index${ext}`)) {
      normalizedFilename = normalizedFilename.replace(`/index${ext}`, ext);
    }
    const lastSlashIndex = normalizedFilename.lastIndexOf("/");
    const baseNameWithExt = normalizedFilename.substring(lastSlashIndex + 1);
    {
      const extIndex = baseNameWithExt.lastIndexOf(ext);
      return baseNameWithExt.substring(0, extIndex);
    }
  }
  var deepClone = (0, import_rfdc.default)({ circles: true });

  const DEBOUNCE_DEFAULTS = {
    trailing: true
  };
  function debounce(fn, wait = 25, options = {}) {
    options = { ...DEBOUNCE_DEFAULTS, ...options };
    if (!Number.isFinite(wait)) {
      throw new TypeError("Expected `wait` to be a finite number");
    }
    let leadingValue;
    let timeout;
    let resolveList = [];
    let currentPromise;
    let trailingArgs;
    const applyFn = (_this, args) => {
      currentPromise = _applyPromised(fn, _this, args);
      currentPromise.finally(() => {
        currentPromise = null;
        if (options.trailing && trailingArgs && !timeout) {
          const promise = applyFn(_this, trailingArgs);
          trailingArgs = null;
          return promise;
        }
      });
      return currentPromise;
    };
    return function(...args) {
      if (currentPromise) {
        if (options.trailing) {
          trailingArgs = args;
        }
        return currentPromise;
      }
      return new Promise((resolve) => {
        const shouldCallNow = !timeout && options.leading;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          timeout = null;
          const promise = options.leading ? leadingValue : applyFn(this, args);
          for (const _resolve of resolveList) {
            _resolve(promise);
          }
          resolveList = [];
        }, wait);
        if (shouldCallNow) {
          leadingValue = applyFn(this, args);
          resolve(leadingValue);
        } else {
          resolveList.push(resolve);
        }
      });
    };
  }
  async function _applyPromised(fn, _this, args) {
    return await fn.apply(_this, args);
  }

  function flatHooks(configHooks, hooks = {}, parentName) {
    for (const key in configHooks) {
      const subHook = configHooks[key];
      const name = parentName ? `${parentName}:${key}` : key;
      if (typeof subHook === "object" && subHook !== null) {
        flatHooks(subHook, hooks, name);
      } else if (typeof subHook === "function") {
        hooks[name] = subHook;
      }
    }
    return hooks;
  }
  const defaultTask = { run: (function_) => function_() };
  const _createTask = () => defaultTask;
  const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
  function serialTaskCaller(hooks, args) {
    const name = args.shift();
    const task = createTask(name);
    return hooks.reduce(
      (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
      Promise.resolve()
    );
  }
  function parallelTaskCaller(hooks, args) {
    const name = args.shift();
    const task = createTask(name);
    return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
  }
  function callEachWith(callbacks, arg0) {
    for (const callback of [...callbacks]) {
      callback(arg0);
    }
  }

  class Hookable {
    constructor() {
      this._hooks = {};
      this._before = undefined;
      this._after = undefined;
      this._deprecatedMessages = undefined;
      this._deprecatedHooks = {};
      this.hook = this.hook.bind(this);
      this.callHook = this.callHook.bind(this);
      this.callHookWith = this.callHookWith.bind(this);
    }
    hook(name, function_, options = {}) {
      if (!name || typeof function_ !== "function") {
        return () => {
        };
      }
      const originalName = name;
      let dep;
      while (this._deprecatedHooks[name]) {
        dep = this._deprecatedHooks[name];
        name = dep.to;
      }
      if (dep && !options.allowDeprecated) {
        let message = dep.message;
        if (!message) {
          message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
        }
        if (!this._deprecatedMessages) {
          this._deprecatedMessages = /* @__PURE__ */ new Set();
        }
        if (!this._deprecatedMessages.has(message)) {
          console.warn(message);
          this._deprecatedMessages.add(message);
        }
      }
      if (!function_.name) {
        try {
          Object.defineProperty(function_, "name", {
            get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
            configurable: true
          });
        } catch {
        }
      }
      this._hooks[name] = this._hooks[name] || [];
      this._hooks[name].push(function_);
      return () => {
        if (function_) {
          this.removeHook(name, function_);
          function_ = undefined;
        }
      };
    }
    hookOnce(name, function_) {
      let _unreg;
      let _function = (...arguments_) => {
        if (typeof _unreg === "function") {
          _unreg();
        }
        _unreg = undefined;
        _function = undefined;
        return function_(...arguments_);
      };
      _unreg = this.hook(name, _function);
      return _unreg;
    }
    removeHook(name, function_) {
      if (this._hooks[name]) {
        const index = this._hooks[name].indexOf(function_);
        if (index !== -1) {
          this._hooks[name].splice(index, 1);
        }
        if (this._hooks[name].length === 0) {
          delete this._hooks[name];
        }
      }
    }
    deprecateHook(name, deprecated) {
      this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
      const _hooks = this._hooks[name] || [];
      delete this._hooks[name];
      for (const hook of _hooks) {
        this.hook(name, hook);
      }
    }
    deprecateHooks(deprecatedHooks) {
      Object.assign(this._deprecatedHooks, deprecatedHooks);
      for (const name in deprecatedHooks) {
        this.deprecateHook(name, deprecatedHooks[name]);
      }
    }
    addHooks(configHooks) {
      const hooks = flatHooks(configHooks);
      const removeFns = Object.keys(hooks).map(
        (key) => this.hook(key, hooks[key])
      );
      return () => {
        for (const unreg of removeFns.splice(0, removeFns.length)) {
          unreg();
        }
      };
    }
    removeHooks(configHooks) {
      const hooks = flatHooks(configHooks);
      for (const key in hooks) {
        this.removeHook(key, hooks[key]);
      }
    }
    removeAllHooks() {
      for (const key in this._hooks) {
        delete this._hooks[key];
      }
    }
    callHook(name, ...arguments_) {
      arguments_.unshift(name);
      return this.callHookWith(serialTaskCaller, name, ...arguments_);
    }
    callHookParallel(name, ...arguments_) {
      arguments_.unshift(name);
      return this.callHookWith(parallelTaskCaller, name, ...arguments_);
    }
    callHookWith(caller, name, ...arguments_) {
      const event = this._before || this._after ? { name, args: arguments_, context: {} } : undefined;
      if (this._before) {
        callEachWith(this._before, event);
      }
      const result = caller(
        name in this._hooks ? [...this._hooks[name]] : [],
        arguments_
      );
      if (result instanceof Promise) {
        return result.finally(() => {
          if (this._after && event) {
            callEachWith(this._after, event);
          }
        });
      }
      if (this._after && event) {
        callEachWith(this._after, event);
      }
      return result;
    }
    beforeEach(function_) {
      this._before = this._before || [];
      this._before.push(function_);
      return () => {
        if (this._before !== undefined) {
          const index = this._before.indexOf(function_);
          if (index !== -1) {
            this._before.splice(index, 1);
          }
        }
      };
    }
    afterEach(function_) {
      this._after = this._after || [];
      this._after.push(function_);
      return () => {
        if (this._after !== undefined) {
          const index = this._after.indexOf(function_);
          if (index !== -1) {
            this._after.splice(index, 1);
          }
        }
      };
    }
  }
  function createHooks() {
    return new Hookable();
  }

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target22) => (target22 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    __defProp(target22, "default", { value: mod, enumerable: true }) ,
    mod
  ));

  // ../../node_modules/.pnpm/tsup@8.3.5_@microsoft+api-extractor@7.48.1_@types+node@22.10.5__jiti@2.4.2_postcss@8.4.49_tsx_s7k37zks4wtn7x2grzma6lrsfa/node_modules/tsup/assets/esm_shims.js
  var init_esm_shims = __esm({
    "../../node_modules/.pnpm/tsup@8.3.5_@microsoft+api-extractor@7.48.1_@types+node@22.10.5__jiti@2.4.2_postcss@8.4.49_tsx_s7k37zks4wtn7x2grzma6lrsfa/node_modules/tsup/assets/esm_shims.js"() {
    }
  });

  // ../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js
  var require_speakingurl = __commonJS({
    "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(exports, module) {
      init_esm_shims();
      (function(root) {
        var charMap = {
          // latin
          "\xC0": "A",
          "\xC1": "A",
          "\xC2": "A",
          "\xC3": "A",
          "\xC4": "Ae",
          "\xC5": "A",
          "\xC6": "AE",
          "\xC7": "C",
          "\xC8": "E",
          "\xC9": "E",
          "\xCA": "E",
          "\xCB": "E",
          "\xCC": "I",
          "\xCD": "I",
          "\xCE": "I",
          "\xCF": "I",
          "\xD0": "D",
          "\xD1": "N",
          "\xD2": "O",
          "\xD3": "O",
          "\xD4": "O",
          "\xD5": "O",
          "\xD6": "Oe",
          "\u0150": "O",
          "\xD8": "O",
          "\xD9": "U",
          "\xDA": "U",
          "\xDB": "U",
          "\xDC": "Ue",
          "\u0170": "U",
          "\xDD": "Y",
          "\xDE": "TH",
          "\xDF": "ss",
          "\xE0": "a",
          "\xE1": "a",
          "\xE2": "a",
          "\xE3": "a",
          "\xE4": "ae",
          "\xE5": "a",
          "\xE6": "ae",
          "\xE7": "c",
          "\xE8": "e",
          "\xE9": "e",
          "\xEA": "e",
          "\xEB": "e",
          "\xEC": "i",
          "\xED": "i",
          "\xEE": "i",
          "\xEF": "i",
          "\xF0": "d",
          "\xF1": "n",
          "\xF2": "o",
          "\xF3": "o",
          "\xF4": "o",
          "\xF5": "o",
          "\xF6": "oe",
          "\u0151": "o",
          "\xF8": "o",
          "\xF9": "u",
          "\xFA": "u",
          "\xFB": "u",
          "\xFC": "ue",
          "\u0171": "u",
          "\xFD": "y",
          "\xFE": "th",
          "\xFF": "y",
          "\u1E9E": "SS",
          // language specific
          // Arabic
          "\u0627": "a",
          "\u0623": "a",
          "\u0625": "i",
          "\u0622": "aa",
          "\u0624": "u",
          "\u0626": "e",
          "\u0621": "a",
          "\u0628": "b",
          "\u062A": "t",
          "\u062B": "th",
          "\u062C": "j",
          "\u062D": "h",
          "\u062E": "kh",
          "\u062F": "d",
          "\u0630": "th",
          "\u0631": "r",
          "\u0632": "z",
          "\u0633": "s",
          "\u0634": "sh",
          "\u0635": "s",
          "\u0636": "dh",
          "\u0637": "t",
          "\u0638": "z",
          "\u0639": "a",
          "\u063A": "gh",
          "\u0641": "f",
          "\u0642": "q",
          "\u0643": "k",
          "\u0644": "l",
          "\u0645": "m",
          "\u0646": "n",
          "\u0647": "h",
          "\u0648": "w",
          "\u064A": "y",
          "\u0649": "a",
          "\u0629": "h",
          "\uFEFB": "la",
          "\uFEF7": "laa",
          "\uFEF9": "lai",
          "\uFEF5": "laa",
          // Persian additional characters than Arabic
          "\u06AF": "g",
          "\u0686": "ch",
          "\u067E": "p",
          "\u0698": "zh",
          "\u06A9": "k",
          "\u06CC": "y",
          // Arabic diactrics
          "\u064E": "a",
          "\u064B": "an",
          "\u0650": "e",
          "\u064D": "en",
          "\u064F": "u",
          "\u064C": "on",
          "\u0652": "",
          // Arabic numbers
          "\u0660": "0",
          "\u0661": "1",
          "\u0662": "2",
          "\u0663": "3",
          "\u0664": "4",
          "\u0665": "5",
          "\u0666": "6",
          "\u0667": "7",
          "\u0668": "8",
          "\u0669": "9",
          // Persian numbers
          "\u06F0": "0",
          "\u06F1": "1",
          "\u06F2": "2",
          "\u06F3": "3",
          "\u06F4": "4",
          "\u06F5": "5",
          "\u06F6": "6",
          "\u06F7": "7",
          "\u06F8": "8",
          "\u06F9": "9",
          // Burmese consonants
          "\u1000": "k",
          "\u1001": "kh",
          "\u1002": "g",
          "\u1003": "ga",
          "\u1004": "ng",
          "\u1005": "s",
          "\u1006": "sa",
          "\u1007": "z",
          "\u1005\u103B": "za",
          "\u100A": "ny",
          "\u100B": "t",
          "\u100C": "ta",
          "\u100D": "d",
          "\u100E": "da",
          "\u100F": "na",
          "\u1010": "t",
          "\u1011": "ta",
          "\u1012": "d",
          "\u1013": "da",
          "\u1014": "n",
          "\u1015": "p",
          "\u1016": "pa",
          "\u1017": "b",
          "\u1018": "ba",
          "\u1019": "m",
          "\u101A": "y",
          "\u101B": "ya",
          "\u101C": "l",
          "\u101D": "w",
          "\u101E": "th",
          "\u101F": "h",
          "\u1020": "la",
          "\u1021": "a",
          // consonant character combos
          "\u103C": "y",
          "\u103B": "ya",
          "\u103D": "w",
          "\u103C\u103D": "yw",
          "\u103B\u103D": "ywa",
          "\u103E": "h",
          // independent vowels
          "\u1027": "e",
          "\u104F": "-e",
          "\u1023": "i",
          "\u1024": "-i",
          "\u1009": "u",
          "\u1026": "-u",
          "\u1029": "aw",
          "\u101E\u103C\u1031\u102C": "aw",
          "\u102A": "aw",
          // numbers
          "\u1040": "0",
          "\u1041": "1",
          "\u1042": "2",
          "\u1043": "3",
          "\u1044": "4",
          "\u1045": "5",
          "\u1046": "6",
          "\u1047": "7",
          "\u1048": "8",
          "\u1049": "9",
          // virama and tone marks which are silent in transliteration
          "\u1039": "",
          "\u1037": "",
          "\u1038": "",
          // Czech
          "\u010D": "c",
          "\u010F": "d",
          "\u011B": "e",
          "\u0148": "n",
          "\u0159": "r",
          "\u0161": "s",
          "\u0165": "t",
          "\u016F": "u",
          "\u017E": "z",
          "\u010C": "C",
          "\u010E": "D",
          "\u011A": "E",
          "\u0147": "N",
          "\u0158": "R",
          "\u0160": "S",
          "\u0164": "T",
          "\u016E": "U",
          "\u017D": "Z",
          // Dhivehi
          "\u0780": "h",
          "\u0781": "sh",
          "\u0782": "n",
          "\u0783": "r",
          "\u0784": "b",
          "\u0785": "lh",
          "\u0786": "k",
          "\u0787": "a",
          "\u0788": "v",
          "\u0789": "m",
          "\u078A": "f",
          "\u078B": "dh",
          "\u078C": "th",
          "\u078D": "l",
          "\u078E": "g",
          "\u078F": "gn",
          "\u0790": "s",
          "\u0791": "d",
          "\u0792": "z",
          "\u0793": "t",
          "\u0794": "y",
          "\u0795": "p",
          "\u0796": "j",
          "\u0797": "ch",
          "\u0798": "tt",
          "\u0799": "hh",
          "\u079A": "kh",
          "\u079B": "th",
          "\u079C": "z",
          "\u079D": "sh",
          "\u079E": "s",
          "\u079F": "d",
          "\u07A0": "t",
          "\u07A1": "z",
          "\u07A2": "a",
          "\u07A3": "gh",
          "\u07A4": "q",
          "\u07A5": "w",
          "\u07A6": "a",
          "\u07A7": "aa",
          "\u07A8": "i",
          "\u07A9": "ee",
          "\u07AA": "u",
          "\u07AB": "oo",
          "\u07AC": "e",
          "\u07AD": "ey",
          "\u07AE": "o",
          "\u07AF": "oa",
          "\u07B0": "",
          // Georgian https://en.wikipedia.org/wiki/Romanization_of_Georgian
          // National system (2002)
          "\u10D0": "a",
          "\u10D1": "b",
          "\u10D2": "g",
          "\u10D3": "d",
          "\u10D4": "e",
          "\u10D5": "v",
          "\u10D6": "z",
          "\u10D7": "t",
          "\u10D8": "i",
          "\u10D9": "k",
          "\u10DA": "l",
          "\u10DB": "m",
          "\u10DC": "n",
          "\u10DD": "o",
          "\u10DE": "p",
          "\u10DF": "zh",
          "\u10E0": "r",
          "\u10E1": "s",
          "\u10E2": "t",
          "\u10E3": "u",
          "\u10E4": "p",
          "\u10E5": "k",
          "\u10E6": "gh",
          "\u10E7": "q",
          "\u10E8": "sh",
          "\u10E9": "ch",
          "\u10EA": "ts",
          "\u10EB": "dz",
          "\u10EC": "ts",
          "\u10ED": "ch",
          "\u10EE": "kh",
          "\u10EF": "j",
          "\u10F0": "h",
          // Greek
          "\u03B1": "a",
          "\u03B2": "v",
          "\u03B3": "g",
          "\u03B4": "d",
          "\u03B5": "e",
          "\u03B6": "z",
          "\u03B7": "i",
          "\u03B8": "th",
          "\u03B9": "i",
          "\u03BA": "k",
          "\u03BB": "l",
          "\u03BC": "m",
          "\u03BD": "n",
          "\u03BE": "ks",
          "\u03BF": "o",
          "\u03C0": "p",
          "\u03C1": "r",
          "\u03C3": "s",
          "\u03C4": "t",
          "\u03C5": "y",
          "\u03C6": "f",
          "\u03C7": "x",
          "\u03C8": "ps",
          "\u03C9": "o",
          "\u03AC": "a",
          "\u03AD": "e",
          "\u03AF": "i",
          "\u03CC": "o",
          "\u03CD": "y",
          "\u03AE": "i",
          "\u03CE": "o",
          "\u03C2": "s",
          "\u03CA": "i",
          "\u03B0": "y",
          "\u03CB": "y",
          "\u0390": "i",
          "\u0391": "A",
          "\u0392": "B",
          "\u0393": "G",
          "\u0394": "D",
          "\u0395": "E",
          "\u0396": "Z",
          "\u0397": "I",
          "\u0398": "TH",
          "\u0399": "I",
          "\u039A": "K",
          "\u039B": "L",
          "\u039C": "M",
          "\u039D": "N",
          "\u039E": "KS",
          "\u039F": "O",
          "\u03A0": "P",
          "\u03A1": "R",
          "\u03A3": "S",
          "\u03A4": "T",
          "\u03A5": "Y",
          "\u03A6": "F",
          "\u03A7": "X",
          "\u03A8": "PS",
          "\u03A9": "O",
          "\u0386": "A",
          "\u0388": "E",
          "\u038A": "I",
          "\u038C": "O",
          "\u038E": "Y",
          "\u0389": "I",
          "\u038F": "O",
          "\u03AA": "I",
          "\u03AB": "Y",
          // Latvian
          "\u0101": "a",
          // 'č': 'c', // duplicate
          "\u0113": "e",
          "\u0123": "g",
          "\u012B": "i",
          "\u0137": "k",
          "\u013C": "l",
          "\u0146": "n",
          // 'š': 's', // duplicate
          "\u016B": "u",
          // 'ž': 'z', // duplicate
          "\u0100": "A",
          // 'Č': 'C', // duplicate
          "\u0112": "E",
          "\u0122": "G",
          "\u012A": "I",
          "\u0136": "k",
          "\u013B": "L",
          "\u0145": "N",
          // 'Š': 'S', // duplicate
          "\u016A": "U",
          // 'Ž': 'Z', // duplicate
          // Macedonian
          "\u040C": "Kj",
          "\u045C": "kj",
          "\u0409": "Lj",
          "\u0459": "lj",
          "\u040A": "Nj",
          "\u045A": "nj",
          "\u0422\u0441": "Ts",
          "\u0442\u0441": "ts",
          // Polish
          "\u0105": "a",
          "\u0107": "c",
          "\u0119": "e",
          "\u0142": "l",
          "\u0144": "n",
          // 'ó': 'o', // duplicate
          "\u015B": "s",
          "\u017A": "z",
          "\u017C": "z",
          "\u0104": "A",
          "\u0106": "C",
          "\u0118": "E",
          "\u0141": "L",
          "\u0143": "N",
          "\u015A": "S",
          "\u0179": "Z",
          "\u017B": "Z",
          // Ukranian
          "\u0404": "Ye",
          "\u0406": "I",
          "\u0407": "Yi",
          "\u0490": "G",
          "\u0454": "ye",
          "\u0456": "i",
          "\u0457": "yi",
          "\u0491": "g",
          // Romanian
          "\u0103": "a",
          "\u0102": "A",
          "\u0219": "s",
          "\u0218": "S",
          // 'ş': 's', // duplicate
          // 'Ş': 'S', // duplicate
          "\u021B": "t",
          "\u021A": "T",
          "\u0163": "t",
          "\u0162": "T",
          // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
          // ICAO
          "\u0430": "a",
          "\u0431": "b",
          "\u0432": "v",
          "\u0433": "g",
          "\u0434": "d",
          "\u0435": "e",
          "\u0451": "yo",
          "\u0436": "zh",
          "\u0437": "z",
          "\u0438": "i",
          "\u0439": "i",
          "\u043A": "k",
          "\u043B": "l",
          "\u043C": "m",
          "\u043D": "n",
          "\u043E": "o",
          "\u043F": "p",
          "\u0440": "r",
          "\u0441": "s",
          "\u0442": "t",
          "\u0443": "u",
          "\u0444": "f",
          "\u0445": "kh",
          "\u0446": "c",
          "\u0447": "ch",
          "\u0448": "sh",
          "\u0449": "sh",
          "\u044A": "",
          "\u044B": "y",
          "\u044C": "",
          "\u044D": "e",
          "\u044E": "yu",
          "\u044F": "ya",
          "\u0410": "A",
          "\u0411": "B",
          "\u0412": "V",
          "\u0413": "G",
          "\u0414": "D",
          "\u0415": "E",
          "\u0401": "Yo",
          "\u0416": "Zh",
          "\u0417": "Z",
          "\u0418": "I",
          "\u0419": "I",
          "\u041A": "K",
          "\u041B": "L",
          "\u041C": "M",
          "\u041D": "N",
          "\u041E": "O",
          "\u041F": "P",
          "\u0420": "R",
          "\u0421": "S",
          "\u0422": "T",
          "\u0423": "U",
          "\u0424": "F",
          "\u0425": "Kh",
          "\u0426": "C",
          "\u0427": "Ch",
          "\u0428": "Sh",
          "\u0429": "Sh",
          "\u042A": "",
          "\u042B": "Y",
          "\u042C": "",
          "\u042D": "E",
          "\u042E": "Yu",
          "\u042F": "Ya",
          // Serbian
          "\u0452": "dj",
          "\u0458": "j",
          // 'љ': 'lj',  // duplicate
          // 'њ': 'nj', // duplicate
          "\u045B": "c",
          "\u045F": "dz",
          "\u0402": "Dj",
          "\u0408": "j",
          // 'Љ': 'Lj', // duplicate
          // 'Њ': 'Nj', // duplicate
          "\u040B": "C",
          "\u040F": "Dz",
          // Slovak
          "\u013E": "l",
          "\u013A": "l",
          "\u0155": "r",
          "\u013D": "L",
          "\u0139": "L",
          "\u0154": "R",
          // Turkish
          "\u015F": "s",
          "\u015E": "S",
          "\u0131": "i",
          "\u0130": "I",
          // 'ç': 'c', // duplicate
          // 'Ç': 'C', // duplicate
          // 'ü': 'u', // duplicate, see langCharMap
          // 'Ü': 'U', // duplicate, see langCharMap
          // 'ö': 'o', // duplicate, see langCharMap
          // 'Ö': 'O', // duplicate, see langCharMap
          "\u011F": "g",
          "\u011E": "G",
          // Vietnamese
          "\u1EA3": "a",
          "\u1EA2": "A",
          "\u1EB3": "a",
          "\u1EB2": "A",
          "\u1EA9": "a",
          "\u1EA8": "A",
          "\u0111": "d",
          "\u0110": "D",
          "\u1EB9": "e",
          "\u1EB8": "E",
          "\u1EBD": "e",
          "\u1EBC": "E",
          "\u1EBB": "e",
          "\u1EBA": "E",
          "\u1EBF": "e",
          "\u1EBE": "E",
          "\u1EC1": "e",
          "\u1EC0": "E",
          "\u1EC7": "e",
          "\u1EC6": "E",
          "\u1EC5": "e",
          "\u1EC4": "E",
          "\u1EC3": "e",
          "\u1EC2": "E",
          "\u1ECF": "o",
          "\u1ECD": "o",
          "\u1ECC": "o",
          "\u1ED1": "o",
          "\u1ED0": "O",
          "\u1ED3": "o",
          "\u1ED2": "O",
          "\u1ED5": "o",
          "\u1ED4": "O",
          "\u1ED9": "o",
          "\u1ED8": "O",
          "\u1ED7": "o",
          "\u1ED6": "O",
          "\u01A1": "o",
          "\u01A0": "O",
          "\u1EDB": "o",
          "\u1EDA": "O",
          "\u1EDD": "o",
          "\u1EDC": "O",
          "\u1EE3": "o",
          "\u1EE2": "O",
          "\u1EE1": "o",
          "\u1EE0": "O",
          "\u1EDE": "o",
          "\u1EDF": "o",
          "\u1ECB": "i",
          "\u1ECA": "I",
          "\u0129": "i",
          "\u0128": "I",
          "\u1EC9": "i",
          "\u1EC8": "i",
          "\u1EE7": "u",
          "\u1EE6": "U",
          "\u1EE5": "u",
          "\u1EE4": "U",
          "\u0169": "u",
          "\u0168": "U",
          "\u01B0": "u",
          "\u01AF": "U",
          "\u1EE9": "u",
          "\u1EE8": "U",
          "\u1EEB": "u",
          "\u1EEA": "U",
          "\u1EF1": "u",
          "\u1EF0": "U",
          "\u1EEF": "u",
          "\u1EEE": "U",
          "\u1EED": "u",
          "\u1EEC": "\u01B0",
          "\u1EF7": "y",
          "\u1EF6": "y",
          "\u1EF3": "y",
          "\u1EF2": "Y",
          "\u1EF5": "y",
          "\u1EF4": "Y",
          "\u1EF9": "y",
          "\u1EF8": "Y",
          "\u1EA1": "a",
          "\u1EA0": "A",
          "\u1EA5": "a",
          "\u1EA4": "A",
          "\u1EA7": "a",
          "\u1EA6": "A",
          "\u1EAD": "a",
          "\u1EAC": "A",
          "\u1EAB": "a",
          "\u1EAA": "A",
          // 'ă': 'a', // duplicate
          // 'Ă': 'A', // duplicate
          "\u1EAF": "a",
          "\u1EAE": "A",
          "\u1EB1": "a",
          "\u1EB0": "A",
          "\u1EB7": "a",
          "\u1EB6": "A",
          "\u1EB5": "a",
          "\u1EB4": "A",
          "\u24EA": "0",
          "\u2460": "1",
          "\u2461": "2",
          "\u2462": "3",
          "\u2463": "4",
          "\u2464": "5",
          "\u2465": "6",
          "\u2466": "7",
          "\u2467": "8",
          "\u2468": "9",
          "\u2469": "10",
          "\u246A": "11",
          "\u246B": "12",
          "\u246C": "13",
          "\u246D": "14",
          "\u246E": "15",
          "\u246F": "16",
          "\u2470": "17",
          "\u2471": "18",
          "\u2472": "18",
          "\u2473": "18",
          "\u24F5": "1",
          "\u24F6": "2",
          "\u24F7": "3",
          "\u24F8": "4",
          "\u24F9": "5",
          "\u24FA": "6",
          "\u24FB": "7",
          "\u24FC": "8",
          "\u24FD": "9",
          "\u24FE": "10",
          "\u24FF": "0",
          "\u24EB": "11",
          "\u24EC": "12",
          "\u24ED": "13",
          "\u24EE": "14",
          "\u24EF": "15",
          "\u24F0": "16",
          "\u24F1": "17",
          "\u24F2": "18",
          "\u24F3": "19",
          "\u24F4": "20",
          "\u24B6": "A",
          "\u24B7": "B",
          "\u24B8": "C",
          "\u24B9": "D",
          "\u24BA": "E",
          "\u24BB": "F",
          "\u24BC": "G",
          "\u24BD": "H",
          "\u24BE": "I",
          "\u24BF": "J",
          "\u24C0": "K",
          "\u24C1": "L",
          "\u24C2": "M",
          "\u24C3": "N",
          "\u24C4": "O",
          "\u24C5": "P",
          "\u24C6": "Q",
          "\u24C7": "R",
          "\u24C8": "S",
          "\u24C9": "T",
          "\u24CA": "U",
          "\u24CB": "V",
          "\u24CC": "W",
          "\u24CD": "X",
          "\u24CE": "Y",
          "\u24CF": "Z",
          "\u24D0": "a",
          "\u24D1": "b",
          "\u24D2": "c",
          "\u24D3": "d",
          "\u24D4": "e",
          "\u24D5": "f",
          "\u24D6": "g",
          "\u24D7": "h",
          "\u24D8": "i",
          "\u24D9": "j",
          "\u24DA": "k",
          "\u24DB": "l",
          "\u24DC": "m",
          "\u24DD": "n",
          "\u24DE": "o",
          "\u24DF": "p",
          "\u24E0": "q",
          "\u24E1": "r",
          "\u24E2": "s",
          "\u24E3": "t",
          "\u24E4": "u",
          "\u24E6": "v",
          "\u24E5": "w",
          "\u24E7": "x",
          "\u24E8": "y",
          "\u24E9": "z",
          // symbols
          "\u201C": '"',
          "\u201D": '"',
          "\u2018": "'",
          "\u2019": "'",
          "\u2202": "d",
          "\u0192": "f",
          "\u2122": "(TM)",
          "\xA9": "(C)",
          "\u0153": "oe",
          "\u0152": "OE",
          "\xAE": "(R)",
          "\u2020": "+",
          "\u2120": "(SM)",
          "\u2026": "...",
          "\u02DA": "o",
          "\xBA": "o",
          "\xAA": "a",
          "\u2022": "*",
          "\u104A": ",",
          "\u104B": ".",
          // currency
          "$": "USD",
          "\u20AC": "EUR",
          "\u20A2": "BRN",
          "\u20A3": "FRF",
          "\xA3": "GBP",
          "\u20A4": "ITL",
          "\u20A6": "NGN",
          "\u20A7": "ESP",
          "\u20A9": "KRW",
          "\u20AA": "ILS",
          "\u20AB": "VND",
          "\u20AD": "LAK",
          "\u20AE": "MNT",
          "\u20AF": "GRD",
          "\u20B1": "ARS",
          "\u20B2": "PYG",
          "\u20B3": "ARA",
          "\u20B4": "UAH",
          "\u20B5": "GHS",
          "\xA2": "cent",
          "\xA5": "CNY",
          "\u5143": "CNY",
          "\u5186": "YEN",
          "\uFDFC": "IRR",
          "\u20A0": "EWE",
          "\u0E3F": "THB",
          "\u20A8": "INR",
          "\u20B9": "INR",
          "\u20B0": "PF",
          "\u20BA": "TRY",
          "\u060B": "AFN",
          "\u20BC": "AZN",
          "\u043B\u0432": "BGN",
          "\u17DB": "KHR",
          "\u20A1": "CRC",
          "\u20B8": "KZT",
          "\u0434\u0435\u043D": "MKD",
          "z\u0142": "PLN",
          "\u20BD": "RUB",
          "\u20BE": "GEL"
        };
        var lookAheadCharArray = [
          // burmese
          "\u103A",
          // Dhivehi
          "\u07B0"
        ];
        var diatricMap = {
          // Burmese
          // dependent vowels
          "\u102C": "a",
          "\u102B": "a",
          "\u1031": "e",
          "\u1032": "e",
          "\u102D": "i",
          "\u102E": "i",
          "\u102D\u102F": "o",
          "\u102F": "u",
          "\u1030": "u",
          "\u1031\u102B\u1004\u103A": "aung",
          "\u1031\u102C": "aw",
          "\u1031\u102C\u103A": "aw",
          "\u1031\u102B": "aw",
          "\u1031\u102B\u103A": "aw",
          "\u103A": "\u103A",
          // this is special case but the character will be converted to latin in the code
          "\u1000\u103A": "et",
          "\u102D\u102F\u1000\u103A": "aik",
          "\u1031\u102C\u1000\u103A": "auk",
          "\u1004\u103A": "in",
          "\u102D\u102F\u1004\u103A": "aing",
          "\u1031\u102C\u1004\u103A": "aung",
          "\u1005\u103A": "it",
          "\u100A\u103A": "i",
          "\u1010\u103A": "at",
          "\u102D\u1010\u103A": "eik",
          "\u102F\u1010\u103A": "ok",
          "\u103D\u1010\u103A": "ut",
          "\u1031\u1010\u103A": "it",
          "\u1012\u103A": "d",
          "\u102D\u102F\u1012\u103A": "ok",
          "\u102F\u1012\u103A": "ait",
          "\u1014\u103A": "an",
          "\u102C\u1014\u103A": "an",
          "\u102D\u1014\u103A": "ein",
          "\u102F\u1014\u103A": "on",
          "\u103D\u1014\u103A": "un",
          "\u1015\u103A": "at",
          "\u102D\u1015\u103A": "eik",
          "\u102F\u1015\u103A": "ok",
          "\u103D\u1015\u103A": "ut",
          "\u1014\u103A\u102F\u1015\u103A": "nub",
          "\u1019\u103A": "an",
          "\u102D\u1019\u103A": "ein",
          "\u102F\u1019\u103A": "on",
          "\u103D\u1019\u103A": "un",
          "\u101A\u103A": "e",
          "\u102D\u102F\u101C\u103A": "ol",
          "\u1009\u103A": "in",
          "\u1036": "an",
          "\u102D\u1036": "ein",
          "\u102F\u1036": "on",
          // Dhivehi
          "\u07A6\u0787\u07B0": "ah",
          "\u07A6\u0781\u07B0": "ah"
        };
        var langCharMap = {
          "en": {},
          // default language
          "az": {
            // Azerbaijani
            "\xE7": "c",
            "\u0259": "e",
            "\u011F": "g",
            "\u0131": "i",
            "\xF6": "o",
            "\u015F": "s",
            "\xFC": "u",
            "\xC7": "C",
            "\u018F": "E",
            "\u011E": "G",
            "\u0130": "I",
            "\xD6": "O",
            "\u015E": "S",
            "\xDC": "U"
          },
          "cs": {
            // Czech
            "\u010D": "c",
            "\u010F": "d",
            "\u011B": "e",
            "\u0148": "n",
            "\u0159": "r",
            "\u0161": "s",
            "\u0165": "t",
            "\u016F": "u",
            "\u017E": "z",
            "\u010C": "C",
            "\u010E": "D",
            "\u011A": "E",
            "\u0147": "N",
            "\u0158": "R",
            "\u0160": "S",
            "\u0164": "T",
            "\u016E": "U",
            "\u017D": "Z"
          },
          "fi": {
            // Finnish
            // 'å': 'a', duplicate see charMap/latin
            // 'Å': 'A', duplicate see charMap/latin
            "\xE4": "a",
            // ok
            "\xC4": "A",
            // ok
            "\xF6": "o",
            // ok
            "\xD6": "O"
            // ok
          },
          "hu": {
            // Hungarian
            "\xE4": "a",
            // ok
            "\xC4": "A",
            // ok
            // 'á': 'a', duplicate see charMap/latin
            // 'Á': 'A', duplicate see charMap/latin
            "\xF6": "o",
            // ok
            "\xD6": "O",
            // ok
            // 'ő': 'o', duplicate see charMap/latin
            // 'Ő': 'O', duplicate see charMap/latin
            "\xFC": "u",
            "\xDC": "U",
            "\u0171": "u",
            "\u0170": "U"
          },
          "lt": {
            // Lithuanian
            "\u0105": "a",
            "\u010D": "c",
            "\u0119": "e",
            "\u0117": "e",
            "\u012F": "i",
            "\u0161": "s",
            "\u0173": "u",
            "\u016B": "u",
            "\u017E": "z",
            "\u0104": "A",
            "\u010C": "C",
            "\u0118": "E",
            "\u0116": "E",
            "\u012E": "I",
            "\u0160": "S",
            "\u0172": "U",
            "\u016A": "U"
          },
          "lv": {
            // Latvian
            "\u0101": "a",
            "\u010D": "c",
            "\u0113": "e",
            "\u0123": "g",
            "\u012B": "i",
            "\u0137": "k",
            "\u013C": "l",
            "\u0146": "n",
            "\u0161": "s",
            "\u016B": "u",
            "\u017E": "z",
            "\u0100": "A",
            "\u010C": "C",
            "\u0112": "E",
            "\u0122": "G",
            "\u012A": "i",
            "\u0136": "k",
            "\u013B": "L",
            "\u0145": "N",
            "\u0160": "S",
            "\u016A": "u",
            "\u017D": "Z"
          },
          "pl": {
            // Polish
            "\u0105": "a",
            "\u0107": "c",
            "\u0119": "e",
            "\u0142": "l",
            "\u0144": "n",
            "\xF3": "o",
            "\u015B": "s",
            "\u017A": "z",
            "\u017C": "z",
            "\u0104": "A",
            "\u0106": "C",
            "\u0118": "e",
            "\u0141": "L",
            "\u0143": "N",
            "\xD3": "O",
            "\u015A": "S",
            "\u0179": "Z",
            "\u017B": "Z"
          },
          "sv": {
            // Swedish
            // 'å': 'a', duplicate see charMap/latin
            // 'Å': 'A', duplicate see charMap/latin
            "\xE4": "a",
            // ok
            "\xC4": "A",
            // ok
            "\xF6": "o",
            // ok
            "\xD6": "O"
            // ok
          },
          "sk": {
            // Slovak
            "\xE4": "a",
            "\xC4": "A"
          },
          "sr": {
            // Serbian
            "\u0459": "lj",
            "\u045A": "nj",
            "\u0409": "Lj",
            "\u040A": "Nj",
            "\u0111": "dj",
            "\u0110": "Dj"
          },
          "tr": {
            // Turkish
            "\xDC": "U",
            "\xD6": "O",
            "\xFC": "u",
            "\xF6": "o"
          }
        };
        var symbolMap = {
          "ar": {
            "\u2206": "delta",
            "\u221E": "la-nihaya",
            "\u2665": "hob",
            "&": "wa",
            "|": "aw",
            "<": "aqal-men",
            ">": "akbar-men",
            "\u2211": "majmou",
            "\xA4": "omla"
          },
          "az": {},
          "ca": {
            "\u2206": "delta",
            "\u221E": "infinit",
            "\u2665": "amor",
            "&": "i",
            "|": "o",
            "<": "menys que",
            ">": "mes que",
            "\u2211": "suma dels",
            "\xA4": "moneda"
          },
          "cs": {
            "\u2206": "delta",
            "\u221E": "nekonecno",
            "\u2665": "laska",
            "&": "a",
            "|": "nebo",
            "<": "mensi nez",
            ">": "vetsi nez",
            "\u2211": "soucet",
            "\xA4": "mena"
          },
          "de": {
            "\u2206": "delta",
            "\u221E": "unendlich",
            "\u2665": "Liebe",
            "&": "und",
            "|": "oder",
            "<": "kleiner als",
            ">": "groesser als",
            "\u2211": "Summe von",
            "\xA4": "Waehrung"
          },
          "dv": {
            "\u2206": "delta",
            "\u221E": "kolunulaa",
            "\u2665": "loabi",
            "&": "aai",
            "|": "noonee",
            "<": "ah vure kuda",
            ">": "ah vure bodu",
            "\u2211": "jumula",
            "\xA4": "faisaa"
          },
          "en": {
            "\u2206": "delta",
            "\u221E": "infinity",
            "\u2665": "love",
            "&": "and",
            "|": "or",
            "<": "less than",
            ">": "greater than",
            "\u2211": "sum",
            "\xA4": "currency"
          },
          "es": {
            "\u2206": "delta",
            "\u221E": "infinito",
            "\u2665": "amor",
            "&": "y",
            "|": "u",
            "<": "menos que",
            ">": "mas que",
            "\u2211": "suma de los",
            "\xA4": "moneda"
          },
          "fa": {
            "\u2206": "delta",
            "\u221E": "bi-nahayat",
            "\u2665": "eshgh",
            "&": "va",
            "|": "ya",
            "<": "kamtar-az",
            ">": "bishtar-az",
            "\u2211": "majmooe",
            "\xA4": "vahed"
          },
          "fi": {
            "\u2206": "delta",
            "\u221E": "aarettomyys",
            "\u2665": "rakkaus",
            "&": "ja",
            "|": "tai",
            "<": "pienempi kuin",
            ">": "suurempi kuin",
            "\u2211": "summa",
            "\xA4": "valuutta"
          },
          "fr": {
            "\u2206": "delta",
            "\u221E": "infiniment",
            "\u2665": "Amour",
            "&": "et",
            "|": "ou",
            "<": "moins que",
            ">": "superieure a",
            "\u2211": "somme des",
            "\xA4": "monnaie"
          },
          "ge": {
            "\u2206": "delta",
            "\u221E": "usasruloba",
            "\u2665": "siqvaruli",
            "&": "da",
            "|": "an",
            "<": "naklebi",
            ">": "meti",
            "\u2211": "jami",
            "\xA4": "valuta"
          },
          "gr": {},
          "hu": {
            "\u2206": "delta",
            "\u221E": "vegtelen",
            "\u2665": "szerelem",
            "&": "es",
            "|": "vagy",
            "<": "kisebb mint",
            ">": "nagyobb mint",
            "\u2211": "szumma",
            "\xA4": "penznem"
          },
          "it": {
            "\u2206": "delta",
            "\u221E": "infinito",
            "\u2665": "amore",
            "&": "e",
            "|": "o",
            "<": "minore di",
            ">": "maggiore di",
            "\u2211": "somma",
            "\xA4": "moneta"
          },
          "lt": {
            "\u2206": "delta",
            "\u221E": "begalybe",
            "\u2665": "meile",
            "&": "ir",
            "|": "ar",
            "<": "maziau nei",
            ">": "daugiau nei",
            "\u2211": "suma",
            "\xA4": "valiuta"
          },
          "lv": {
            "\u2206": "delta",
            "\u221E": "bezgaliba",
            "\u2665": "milestiba",
            "&": "un",
            "|": "vai",
            "<": "mazak neka",
            ">": "lielaks neka",
            "\u2211": "summa",
            "\xA4": "valuta"
          },
          "my": {
            "\u2206": "kwahkhyaet",
            "\u221E": "asaonasme",
            "\u2665": "akhyait",
            "&": "nhin",
            "|": "tho",
            "<": "ngethaw",
            ">": "kyithaw",
            "\u2211": "paungld",
            "\xA4": "ngwekye"
          },
          "mk": {},
          "nl": {
            "\u2206": "delta",
            "\u221E": "oneindig",
            "\u2665": "liefde",
            "&": "en",
            "|": "of",
            "<": "kleiner dan",
            ">": "groter dan",
            "\u2211": "som",
            "\xA4": "valuta"
          },
          "pl": {
            "\u2206": "delta",
            "\u221E": "nieskonczonosc",
            "\u2665": "milosc",
            "&": "i",
            "|": "lub",
            "<": "mniejsze niz",
            ">": "wieksze niz",
            "\u2211": "suma",
            "\xA4": "waluta"
          },
          "pt": {
            "\u2206": "delta",
            "\u221E": "infinito",
            "\u2665": "amor",
            "&": "e",
            "|": "ou",
            "<": "menor que",
            ">": "maior que",
            "\u2211": "soma",
            "\xA4": "moeda"
          },
          "ro": {
            "\u2206": "delta",
            "\u221E": "infinit",
            "\u2665": "dragoste",
            "&": "si",
            "|": "sau",
            "<": "mai mic ca",
            ">": "mai mare ca",
            "\u2211": "suma",
            "\xA4": "valuta"
          },
          "ru": {
            "\u2206": "delta",
            "\u221E": "beskonechno",
            "\u2665": "lubov",
            "&": "i",
            "|": "ili",
            "<": "menshe",
            ">": "bolshe",
            "\u2211": "summa",
            "\xA4": "valjuta"
          },
          "sk": {
            "\u2206": "delta",
            "\u221E": "nekonecno",
            "\u2665": "laska",
            "&": "a",
            "|": "alebo",
            "<": "menej ako",
            ">": "viac ako",
            "\u2211": "sucet",
            "\xA4": "mena"
          },
          "sr": {},
          "tr": {
            "\u2206": "delta",
            "\u221E": "sonsuzluk",
            "\u2665": "ask",
            "&": "ve",
            "|": "veya",
            "<": "kucuktur",
            ">": "buyuktur",
            "\u2211": "toplam",
            "\xA4": "para birimi"
          },
          "uk": {
            "\u2206": "delta",
            "\u221E": "bezkinechnist",
            "\u2665": "lubov",
            "&": "i",
            "|": "abo",
            "<": "menshe",
            ">": "bilshe",
            "\u2211": "suma",
            "\xA4": "valjuta"
          },
          "vn": {
            "\u2206": "delta",
            "\u221E": "vo cuc",
            "\u2665": "yeu",
            "&": "va",
            "|": "hoac",
            "<": "nho hon",
            ">": "lon hon",
            "\u2211": "tong",
            "\xA4": "tien te"
          }
        };
        var uricChars = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join("");
        var uricNoSlashChars = [";", "?", ":", "@", "&", "=", "+", "$", ","].join("");
        var markChars = [".", "!", "~", "*", "'", "(", ")"].join("");
        var getSlug = function getSlug2(input, opts) {
          var separator = "-";
          var result = "";
          var diatricString = "";
          var convertSymbols = true;
          var customReplacements = {};
          var maintainCase;
          var titleCase;
          var truncate;
          var uricFlag;
          var uricNoSlashFlag;
          var markFlag;
          var symbol;
          var langChar;
          var lucky;
          var i;
          var ch;
          var l;
          var lastCharWasSymbol;
          var lastCharWasDiatric;
          var allowedChars = "";
          if (typeof input !== "string") {
            return "";
          }
          if (typeof opts === "string") {
            separator = opts;
          }
          symbol = symbolMap.en;
          langChar = langCharMap.en;
          if (typeof opts === "object") {
            maintainCase = opts.maintainCase || false;
            customReplacements = opts.custom && typeof opts.custom === "object" ? opts.custom : customReplacements;
            truncate = +opts.truncate > 1 && opts.truncate || false;
            uricFlag = opts.uric || false;
            uricNoSlashFlag = opts.uricNoSlash || false;
            markFlag = opts.mark || false;
            convertSymbols = opts.symbols === false || opts.lang === false ? false : true;
            separator = opts.separator || separator;
            if (uricFlag) {
              allowedChars += uricChars;
            }
            if (uricNoSlashFlag) {
              allowedChars += uricNoSlashChars;
            }
            if (markFlag) {
              allowedChars += markChars;
            }
            symbol = opts.lang && symbolMap[opts.lang] && convertSymbols ? symbolMap[opts.lang] : convertSymbols ? symbolMap.en : {};
            langChar = opts.lang && langCharMap[opts.lang] ? langCharMap[opts.lang] : opts.lang === false || opts.lang === true ? {} : langCharMap.en;
            if (opts.titleCase && typeof opts.titleCase.length === "number" && Array.prototype.toString.call(opts.titleCase)) {
              opts.titleCase.forEach(function(v) {
                customReplacements[v + ""] = v + "";
              });
              titleCase = true;
            } else {
              titleCase = !!opts.titleCase;
            }
            if (opts.custom && typeof opts.custom.length === "number" && Array.prototype.toString.call(opts.custom)) {
              opts.custom.forEach(function(v) {
                customReplacements[v + ""] = v + "";
              });
            }
            Object.keys(customReplacements).forEach(function(v) {
              var r;
              if (v.length > 1) {
                r = new RegExp("\\b" + escapeChars(v) + "\\b", "gi");
              } else {
                r = new RegExp(escapeChars(v), "gi");
              }
              input = input.replace(r, customReplacements[v]);
            });
            for (ch in customReplacements) {
              allowedChars += ch;
            }
          }
          allowedChars += separator;
          allowedChars = escapeChars(allowedChars);
          input = input.replace(/(^\s+|\s+$)/g, "");
          lastCharWasSymbol = false;
          lastCharWasDiatric = false;
          for (i = 0, l = input.length; i < l; i++) {
            ch = input[i];
            if (isReplacedCustomChar(ch, customReplacements)) {
              lastCharWasSymbol = false;
            } else if (langChar[ch]) {
              ch = lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/) ? " " + langChar[ch] : langChar[ch];
              lastCharWasSymbol = false;
            } else if (ch in charMap) {
              if (i + 1 < l && lookAheadCharArray.indexOf(input[i + 1]) >= 0) {
                diatricString += ch;
                ch = "";
              } else if (lastCharWasDiatric === true) {
                ch = diatricMap[diatricString] + charMap[ch];
                diatricString = "";
              } else {
                ch = lastCharWasSymbol && charMap[ch].match(/[A-Za-z0-9]/) ? " " + charMap[ch] : charMap[ch];
              }
              lastCharWasSymbol = false;
              lastCharWasDiatric = false;
            } else if (ch in diatricMap) {
              diatricString += ch;
              ch = "";
              if (i === l - 1) {
                ch = diatricMap[diatricString];
              }
              lastCharWasDiatric = true;
            } else if (
              // process symbol chars
              symbol[ch] && !(uricFlag && uricChars.indexOf(ch) !== -1) && !(uricNoSlashFlag && uricNoSlashChars.indexOf(ch) !== -1)
            ) {
              ch = lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/) ? separator + symbol[ch] : symbol[ch];
              ch += input[i + 1] !== undefined && input[i + 1].match(/[A-Za-z0-9]/) ? separator : "";
              lastCharWasSymbol = true;
            } else {
              if (lastCharWasDiatric === true) {
                ch = diatricMap[diatricString] + ch;
                diatricString = "";
                lastCharWasDiatric = false;
              } else if (lastCharWasSymbol && (/[A-Za-z0-9]/.test(ch) || result.substr(-1).match(/A-Za-z0-9]/))) {
                ch = " " + ch;
              }
              lastCharWasSymbol = false;
            }
            result += ch.replace(new RegExp("[^\\w\\s" + allowedChars + "_-]", "g"), separator);
          }
          if (titleCase) {
            result = result.replace(/(\w)(\S*)/g, function(_, i2, r) {
              var j = i2.toUpperCase() + (r !== null ? r : "");
              return Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0 ? j : j.toLowerCase();
            });
          }
          result = result.replace(/\s+/g, separator).replace(new RegExp("\\" + separator + "+", "g"), separator).replace(new RegExp("(^\\" + separator + "+|\\" + separator + "+$)", "g"), "");
          if (truncate && result.length > truncate) {
            lucky = result.charAt(truncate) === separator;
            result = result.slice(0, truncate);
            if (!lucky) {
              result = result.slice(0, result.lastIndexOf(separator));
            }
          }
          if (!maintainCase && !titleCase) {
            result = result.toLowerCase();
          }
          return result;
        };
        var createSlug = function createSlug2(opts) {
          return function getSlugWithConfig(input) {
            return getSlug(input, opts);
          };
        };
        var escapeChars = function escapeChars2(input) {
          return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
        };
        var isReplacedCustomChar = function(ch, customReplacements) {
          for (var c in customReplacements) {
            if (customReplacements[c] === ch) {
              return true;
            }
          }
        };
        if (typeof module !== "undefined" && module.exports) {
          module.exports = getSlug;
          module.exports.createSlug = createSlug;
        } else if (typeof define !== "undefined" && define.amd) {
          define([], function() {
            return getSlug;
          });
        } else {
          try {
            if (root.getSlug || root.createSlug) {
              throw "speakingurl: globals exists /(getSlug|createSlug)/";
            } else {
              root.getSlug = getSlug;
              root.createSlug = createSlug;
            }
          } catch (e) {
          }
        }
      })(exports);
    }
  });

  // ../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js
  var require_speakingurl2 = __commonJS({
    "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(exports, module) {
      init_esm_shims();
      module.exports = require_speakingurl();
    }
  });

  // src/index.ts
  init_esm_shims();

  // src/core/index.ts
  init_esm_shims();

  // src/compat/index.ts
  init_esm_shims();

  // src/ctx/index.ts
  init_esm_shims();

  // src/ctx/api.ts
  init_esm_shims();

  // src/core/component-highlighter/index.ts
  init_esm_shims();

  // src/core/component/state/bounding-rect.ts
  init_esm_shims();

  // src/core/component/utils/index.ts
  init_esm_shims();
  function getComponentTypeName(options) {
    var _a25;
    const name = options.name || options._componentTag || options.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || options.__name;
    if (name === "index" && ((_a25 = options.__file) == null ? undefined : _a25.endsWith("index.vue"))) {
      return "";
    }
    return name;
  }
  function getComponentFileName(options) {
    const file = options.__file;
    if (file)
      return classify(basename(file, ".vue"));
  }
  function saveComponentGussedName(instance, name) {
    instance.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = name;
    return name;
  }
  function getAppRecord(instance) {
    if (instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
      return instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    else if (instance.root)
      return instance.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  }
  function isFragment(instance) {
    var _a25, _b25;
    const subTreeType = (_a25 = instance.subTree) == null ? undefined : _a25.type;
    const appRecord = getAppRecord(instance);
    if (appRecord) {
      return ((_b25 = appRecord == null ? undefined : appRecord.types) == null ? undefined : _b25.Fragment) === subTreeType;
    }
    return false;
  }
  function getInstanceName(instance) {
    var _a25, _b25, _c;
    const name = getComponentTypeName((instance == null ? undefined : instance.type) || {});
    if (name)
      return name;
    if ((instance == null ? undefined : instance.root) === instance)
      return "Root";
    for (const key in (_b25 = (_a25 = instance.parent) == null ? undefined : _a25.type) == null ? undefined : _b25.components) {
      if (instance.parent.type.components[key] === (instance == null ? undefined : instance.type))
        return saveComponentGussedName(instance, key);
    }
    for (const key in (_c = instance.appContext) == null ? undefined : _c.components) {
      if (instance.appContext.components[key] === (instance == null ? undefined : instance.type))
        return saveComponentGussedName(instance, key);
    }
    const fileName = getComponentFileName((instance == null ? undefined : instance.type) || {});
    if (fileName)
      return fileName;
    return "Anonymous Component";
  }
  function getUniqueComponentId(instance) {
    var _a25, _b25, _c;
    const appId = (_c = (_b25 = (_a25 = instance == null ? undefined : instance.appContext) == null ? undefined : _a25.app) == null ? undefined : _b25.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__) != null ? _c : 0;
    const instanceId = instance === (instance == null ? undefined : instance.root) ? "root" : instance.uid;
    return `${appId}:${instanceId}`;
  }
  function getComponentInstance(appRecord, instanceId) {
    instanceId = instanceId || `${appRecord.id}:root`;
    const instance = appRecord.instanceMap.get(instanceId);
    return instance || appRecord.instanceMap.get(":root");
  }

  // src/core/component/state/bounding-rect.ts
  function createRect() {
    const rect = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      get width() {
        return rect.right - rect.left;
      },
      get height() {
        return rect.bottom - rect.top;
      }
    };
    return rect;
  }
  var range;
  function getTextRect(node) {
    if (!range)
      range = document.createRange();
    range.selectNode(node);
    return range.getBoundingClientRect();
  }
  function getFragmentRect(vnode) {
    const rect = createRect();
    if (!vnode.children)
      return rect;
    for (let i = 0, l = vnode.children.length; i < l; i++) {
      const childVnode = vnode.children[i];
      let childRect;
      if (childVnode.component) {
        childRect = getComponentBoundingRect(childVnode.component);
      } else if (childVnode.el) {
        const el = childVnode.el;
        if (el.nodeType === 1 || el.getBoundingClientRect)
          childRect = el.getBoundingClientRect();
        else if (el.nodeType === 3 && el.data.trim())
          childRect = getTextRect(el);
      }
      if (childRect)
        mergeRects(rect, childRect);
    }
    return rect;
  }
  function mergeRects(a, b) {
    if (!a.top || b.top < a.top)
      a.top = b.top;
    if (!a.bottom || b.bottom > a.bottom)
      a.bottom = b.bottom;
    if (!a.left || b.left < a.left)
      a.left = b.left;
    if (!a.right || b.right > a.right)
      a.right = b.right;
    return a;
  }
  var DEFAULT_RECT = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0
  };
  function getComponentBoundingRect(instance) {
    const el = instance.subTree.el;
    if (typeof window === "undefined") {
      return DEFAULT_RECT;
    }
    if (isFragment(instance))
      return getFragmentRect(instance.subTree);
    else if ((el == null ? undefined : el.nodeType) === 1)
      return el == null ? undefined : el.getBoundingClientRect();
    else if (instance.subTree.component)
      return getComponentBoundingRect(instance.subTree.component);
    else
      return DEFAULT_RECT;
  }

  // src/core/component/tree/el.ts
  init_esm_shims();
  function getRootElementsFromComponentInstance(instance) {
    if (isFragment(instance))
      return getFragmentRootElements(instance.subTree);
    if (!instance.subTree)
      return [];
    return [instance.subTree.el];
  }
  function getFragmentRootElements(vnode) {
    if (!vnode.children)
      return [];
    const list = [];
    vnode.children.forEach((childVnode) => {
      if (childVnode.component)
        list.push(...getRootElementsFromComponentInstance(childVnode.component));
      else if (childVnode == null ? undefined : childVnode.el)
        list.push(childVnode.el);
    });
    return list;
  }

  // src/core/component-highlighter/index.ts
  var CONTAINER_ELEMENT_ID = "__vue-devtools-component-inspector__";
  var CARD_ELEMENT_ID = "__vue-devtools-component-inspector__card__";
  var COMPONENT_NAME_ELEMENT_ID = "__vue-devtools-component-inspector__name__";
  var INDICATOR_ELEMENT_ID = "__vue-devtools-component-inspector__indicator__";
  var containerStyles = {
    display: "block",
    zIndex: 2147483640,
    position: "fixed",
    backgroundColor: "#42b88325",
    border: "1px solid #42b88350",
    borderRadius: "5px",
    transition: "all 0.1s ease-in",
    pointerEvents: "none"
  };
  var cardStyles = {
    fontFamily: "Arial, Helvetica, sans-serif",
    padding: "5px 8px",
    borderRadius: "4px",
    textAlign: "left",
    position: "absolute",
    left: 0,
    color: "#e9e9e9",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "24px",
    backgroundColor: "#42b883",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
  };
  var indicatorStyles = {
    display: "inline-block",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "12px",
    opacity: 0.7
  };
  function getContainerElement() {
    return document.getElementById(CONTAINER_ELEMENT_ID);
  }
  function getCardElement() {
    return document.getElementById(CARD_ELEMENT_ID);
  }
  function getIndicatorElement() {
    return document.getElementById(INDICATOR_ELEMENT_ID);
  }
  function getNameElement() {
    return document.getElementById(COMPONENT_NAME_ELEMENT_ID);
  }
  function getStyles(bounds) {
    return {
      left: `${Math.round(bounds.left * 100) / 100}px`,
      top: `${Math.round(bounds.top * 100) / 100}px`,
      width: `${Math.round(bounds.width * 100) / 100}px`,
      height: `${Math.round(bounds.height * 100) / 100}px`
    };
  }
  function create(options) {
    var _a25;
    const containerEl = document.createElement("div");
    containerEl.id = (_a25 = options.elementId) != null ? _a25 : CONTAINER_ELEMENT_ID;
    Object.assign(containerEl.style, {
      ...containerStyles,
      ...getStyles(options.bounds),
      ...options.style
    });
    const cardEl = document.createElement("span");
    cardEl.id = CARD_ELEMENT_ID;
    Object.assign(cardEl.style, {
      ...cardStyles,
      top: options.bounds.top < 35 ? 0 : "-35px"
    });
    const nameEl = document.createElement("span");
    nameEl.id = COMPONENT_NAME_ELEMENT_ID;
    nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
    const indicatorEl = document.createElement("i");
    indicatorEl.id = INDICATOR_ELEMENT_ID;
    indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
    Object.assign(indicatorEl.style, indicatorStyles);
    cardEl.appendChild(nameEl);
    cardEl.appendChild(indicatorEl);
    containerEl.appendChild(cardEl);
    document.body.appendChild(containerEl);
    return containerEl;
  }
  function update(options) {
    const containerEl = getContainerElement();
    const cardEl = getCardElement();
    const nameEl = getNameElement();
    const indicatorEl = getIndicatorElement();
    if (containerEl) {
      Object.assign(containerEl.style, {
        ...containerStyles,
        ...getStyles(options.bounds)
      });
      Object.assign(cardEl.style, {
        top: options.bounds.top < 35 ? 0 : "-35px"
      });
      nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
      indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
    }
  }
  function highlight(instance) {
    const bounds = getComponentBoundingRect(instance);
    if (!bounds.width && !bounds.height)
      return;
    const name = getInstanceName(instance);
    const container = getContainerElement();
    container ? update({ bounds, name }) : create({ bounds, name });
  }
  function unhighlight() {
    const el = getContainerElement();
    if (el)
      el.style.display = "none";
  }
  var inspectInstance = null;
  function inspectFn(e) {
    const target22 = e.target;
    if (target22) {
      const instance = target22.__vueParentComponent;
      if (instance) {
        inspectInstance = instance;
        const el = instance.vnode.el;
        if (el) {
          const bounds = getComponentBoundingRect(instance);
          const name = getInstanceName(instance);
          const container = getContainerElement();
          container ? update({ bounds, name }) : create({ bounds, name });
        }
      }
    }
  }
  function selectComponentFn(e, cb) {
    e.preventDefault();
    e.stopPropagation();
    if (inspectInstance) {
      const uniqueComponentId = getUniqueComponentId(inspectInstance);
      cb(uniqueComponentId);
    }
  }
  var inspectComponentHighLighterSelectFn = null;
  function cancelInspectComponentHighLighter() {
    unhighlight();
    window.removeEventListener("mouseover", inspectFn);
    window.removeEventListener("click", inspectComponentHighLighterSelectFn, true);
    inspectComponentHighLighterSelectFn = null;
  }
  function inspectComponentHighLighter() {
    window.addEventListener("mouseover", inspectFn);
    return new Promise((resolve) => {
      function onSelect(e) {
        e.preventDefault();
        e.stopPropagation();
        selectComponentFn(e, (id) => {
          window.removeEventListener("click", onSelect, true);
          inspectComponentHighLighterSelectFn = null;
          window.removeEventListener("mouseover", inspectFn);
          const el = getContainerElement();
          if (el)
            el.style.display = "none";
          resolve(JSON.stringify({ id }));
        });
      }
      inspectComponentHighLighterSelectFn = onSelect;
      window.addEventListener("click", onSelect, true);
    });
  }
  function scrollToComponent(options) {
    const instance = getComponentInstance(activeAppRecord.value, options.id);
    if (instance) {
      const [el] = getRootElementsFromComponentInstance(instance);
      if (typeof el.scrollIntoView === "function") {
        el.scrollIntoView({
          behavior: "smooth"
        });
      } else {
        const bounds = getComponentBoundingRect(instance);
        const scrollTarget = document.createElement("div");
        const styles = {
          ...getStyles(bounds),
          position: "absolute"
        };
        Object.assign(scrollTarget.style, styles);
        document.body.appendChild(scrollTarget);
        scrollTarget.scrollIntoView({
          behavior: "smooth"
        });
        setTimeout(() => {
          document.body.removeChild(scrollTarget);
        }, 2e3);
      }
      setTimeout(() => {
        const bounds = getComponentBoundingRect(instance);
        if (bounds.width || bounds.height) {
          const name = getInstanceName(instance);
          const el2 = getContainerElement();
          el2 ? update({ ...options, name, bounds }) : create({ ...options, name, bounds });
          setTimeout(() => {
            if (el2)
              el2.style.display = "none";
          }, 1500);
        }
      }, 1200);
    }
  }

  // src/core/component-inspector/index.ts
  init_esm_shims();
  var _a, _b;
  (_b = (_a = target).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null ? _b : _a.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = true;
  function waitForInspectorInit(cb) {
    let total = 0;
    const timer = setInterval(() => {
      if (target.__VUE_INSPECTOR__) {
        clearInterval(timer);
        total += 30;
        cb();
      }
      if (total >= /* 5s */
      5e3)
        clearInterval(timer);
    }, 30);
  }
  function setupInspector() {
    const inspector = target.__VUE_INSPECTOR__;
    const _openInEditor = inspector.openInEditor;
    inspector.openInEditor = async (...params) => {
      inspector.disable();
      _openInEditor(...params);
    };
  }
  function getComponentInspector() {
    return new Promise((resolve) => {
      function setup() {
        setupInspector();
        resolve(target.__VUE_INSPECTOR__);
      }
      if (!target.__VUE_INSPECTOR__) {
        waitForInspectorInit(() => {
          setup();
        });
      } else {
        setup();
      }
    });
  }

  // src/core/component/state/editor.ts
  init_esm_shims();

  // src/shared/stub-vue.ts
  init_esm_shims();
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw" /* RAW */]);
    }
    return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw" /* RAW */];
    return raw ? toRaw(raw) : observed;
  }

  // src/core/component/state/editor.ts
  var StateEditor = class {
    constructor() {
      this.refEditor = new RefStateEditor();
    }
    set(object, path, value, cb) {
      const sections = Array.isArray(path) ? path : path.split(".");
      while (sections.length > 1) {
        const section = sections.shift();
        if (object instanceof Map)
          object = object.get(section);
        if (object instanceof Set)
          object = Array.from(object.values())[section];
        else object = object[section];
        if (this.refEditor.isRef(object))
          object = this.refEditor.get(object);
      }
      const field = sections[0];
      const item = this.refEditor.get(object)[field];
      if (cb) {
        cb(object, field, value);
      } else {
        if (this.refEditor.isRef(item))
          this.refEditor.set(item, value);
        else object[field] = value;
      }
    }
    get(object, path) {
      const sections = Array.isArray(path) ? path : path.split(".");
      for (let i = 0; i < sections.length; i++) {
        if (object instanceof Map)
          object = object.get(sections[i]);
        else
          object = object[sections[i]];
        if (this.refEditor.isRef(object))
          object = this.refEditor.get(object);
        if (!object)
          return undefined;
      }
      return object;
    }
    has(object, path, parent = false) {
      if (typeof object === "undefined")
        return false;
      const sections = Array.isArray(path) ? path.slice() : path.split(".");
      const size = !parent ? 1 : 2;
      while (object && sections.length > size) {
        const section = sections.shift();
        object = object[section];
        if (this.refEditor.isRef(object))
          object = this.refEditor.get(object);
      }
      return object != null && Object.prototype.hasOwnProperty.call(object, sections[0]);
    }
    createDefaultSetCallback(state) {
      return (object, field, value) => {
        if (state.remove || state.newKey) {
          if (Array.isArray(object))
            object.splice(field, 1);
          else if (toRaw(object) instanceof Map)
            object.delete(field);
          else if (toRaw(object) instanceof Set)
            object.delete(Array.from(object.values())[field]);
          else Reflect.deleteProperty(object, field);
        }
        if (!state.remove) {
          const target22 = object[state.newKey || field];
          if (this.refEditor.isRef(target22))
            this.refEditor.set(target22, value);
          else if (toRaw(object) instanceof Map)
            object.set(state.newKey || field, value);
          else if (toRaw(object) instanceof Set)
            object.add(value);
          else
            object[state.newKey || field] = value;
        }
      };
    }
  };
  var RefStateEditor = class {
    set(ref, value) {
      if (isRef(ref)) {
        ref.value = value;
      } else {
        if (ref instanceof Set && Array.isArray(value)) {
          ref.clear();
          value.forEach((v) => ref.add(v));
          return;
        }
        const currentKeys = Object.keys(value);
        if (ref instanceof Map) {
          const previousKeysSet2 = new Set(ref.keys());
          currentKeys.forEach((key) => {
            ref.set(key, Reflect.get(value, key));
            previousKeysSet2.delete(key);
          });
          previousKeysSet2.forEach((key) => ref.delete(key));
          return;
        }
        const previousKeysSet = new Set(Object.keys(ref));
        currentKeys.forEach((key) => {
          Reflect.set(ref, key, Reflect.get(value, key));
          previousKeysSet.delete(key);
        });
        previousKeysSet.forEach((key) => Reflect.deleteProperty(ref, key));
      }
    }
    get(ref) {
      return isRef(ref) ? ref.value : ref;
    }
    isRef(ref) {
      return isRef(ref) || isReactive(ref);
    }
  };

  // src/core/open-in-editor/index.ts
  init_esm_shims();

  // src/ctx/state.ts
  init_esm_shims();

  // src/core/timeline/storage.ts
  init_esm_shims();
  var TIMELINE_LAYERS_STATE_STORAGE_ID = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
  function getTimelineLayersStateFromStorage() {
    if (!isBrowser || typeof localStorage === "undefined" || localStorage === null) {
      return {
        recordingState: false,
        mouseEventEnabled: false,
        keyboardEventEnabled: false,
        componentEventEnabled: false,
        performanceEventEnabled: false,
        selected: ""
      };
    }
    const state = localStorage.getItem(TIMELINE_LAYERS_STATE_STORAGE_ID);
    return state ? JSON.parse(state) : {
      recordingState: false,
      mouseEventEnabled: false,
      keyboardEventEnabled: false,
      componentEventEnabled: false,
      performanceEventEnabled: false,
      selected: ""
    };
  }

  // src/ctx/hook.ts
  init_esm_shims();

  // src/ctx/inspector.ts
  init_esm_shims();

  // src/ctx/timeline.ts
  init_esm_shims();
  var _a2, _b2;
  (_b2 = (_a2 = target).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null ? _b2 : _a2.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = [];
  var devtoolsTimelineLayers = new Proxy(target.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
    get(target22, prop, receiver) {
      return Reflect.get(target22, prop, receiver);
    }
  });
  function addTimelineLayer(options, descriptor) {
    devtoolsState.timelineLayersState[descriptor.id] = false;
    devtoolsTimelineLayers.push({
      ...options,
      descriptorId: descriptor.id,
      appRecord: getAppRecord(descriptor.app)
    });
  }

  // src/ctx/inspector.ts
  var _a3, _b3;
  (_b3 = (_a3 = target).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null ? _b3 : _a3.__VUE_DEVTOOLS_KIT_INSPECTOR__ = [];
  var devtoolsInspector = new Proxy(target.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
    get(target22, prop, receiver) {
      return Reflect.get(target22, prop, receiver);
    }
  });
  var callInspectorUpdatedHook = debounce(() => {
    devtoolsContext.hooks.callHook("sendInspectorToClient" /* SEND_INSPECTOR_TO_CLIENT */, getActiveInspectors());
  });
  function addInspector(inspector, descriptor) {
    var _a25, _b25;
    devtoolsInspector.push({
      options: inspector,
      descriptor,
      treeFilterPlaceholder: (_a25 = inspector.treeFilterPlaceholder) != null ? _a25 : "Search tree...",
      stateFilterPlaceholder: (_b25 = inspector.stateFilterPlaceholder) != null ? _b25 : "Search state...",
      treeFilter: "",
      selectedNodeId: "",
      appRecord: getAppRecord(descriptor.app)
    });
    callInspectorUpdatedHook();
  }
  function getActiveInspectors() {
    return devtoolsInspector.filter((inspector) => inspector.descriptor.app === activeAppRecord.value.app).filter((inspector) => inspector.descriptor.id !== "components").map((inspector) => {
      var _a25;
      const descriptor = inspector.descriptor;
      const options = inspector.options;
      return {
        id: options.id,
        label: options.label,
        logo: descriptor.logo,
        icon: `custom-ic-baseline-${(_a25 = options == null ? undefined : options.icon) == null ? undefined : _a25.replace(/_/g, "-")}`,
        packageName: descriptor.packageName,
        homepage: descriptor.homepage,
        pluginId: descriptor.id
      };
    });
  }
  function getInspector(id, app) {
    return devtoolsInspector.find((inspector) => inspector.options.id === id && (app ? inspector.descriptor.app === app : true));
  }
  function createDevToolsCtxHooks() {
    const hooks2 = createHooks();
    hooks2.hook("addInspector" /* ADD_INSPECTOR */, ({ inspector, plugin }) => {
      addInspector(inspector, plugin.descriptor);
    });
    const debounceSendInspectorTree = debounce(async ({ inspectorId, plugin }) => {
      var _a25;
      if (!inspectorId || !((_a25 = plugin == null ? undefined : plugin.descriptor) == null ? undefined : _a25.app) || devtoolsState.highPerfModeEnabled)
        return;
      const inspector = getInspector(inspectorId, plugin.descriptor.app);
      const _payload = {
        app: plugin.descriptor.app,
        inspectorId,
        filter: (inspector == null ? undefined : inspector.treeFilter) || "",
        rootNodes: []
      };
      await new Promise((resolve) => {
        hooks2.callHookWith(async (callbacks) => {
          await Promise.all(callbacks.map((cb) => cb(_payload)));
          resolve();
        }, "getInspectorTree" /* GET_INSPECTOR_TREE */);
      });
      hooks2.callHookWith(async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb({
          inspectorId,
          rootNodes: _payload.rootNodes
        })));
      }, "sendInspectorTreeToClient" /* SEND_INSPECTOR_TREE_TO_CLIENT */);
    }, 120);
    hooks2.hook("sendInspectorTree" /* SEND_INSPECTOR_TREE */, debounceSendInspectorTree);
    const debounceSendInspectorState = debounce(async ({ inspectorId, plugin }) => {
      var _a25;
      if (!inspectorId || !((_a25 = plugin == null ? undefined : plugin.descriptor) == null ? undefined : _a25.app) || devtoolsState.highPerfModeEnabled)
        return;
      const inspector = getInspector(inspectorId, plugin.descriptor.app);
      const _payload = {
        app: plugin.descriptor.app,
        inspectorId,
        nodeId: (inspector == null ? undefined : inspector.selectedNodeId) || "",
        state: null
      };
      const ctx = {
        currentTab: `custom-inspector:${inspectorId}`
      };
      if (_payload.nodeId) {
        await new Promise((resolve) => {
          hooks2.callHookWith(async (callbacks) => {
            await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
            resolve();
          }, "getInspectorState" /* GET_INSPECTOR_STATE */);
        });
      }
      hooks2.callHookWith(async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb({
          inspectorId,
          nodeId: _payload.nodeId,
          state: _payload.state
        })));
      }, "sendInspectorStateToClient" /* SEND_INSPECTOR_STATE_TO_CLIENT */);
    }, 120);
    hooks2.hook("sendInspectorState" /* SEND_INSPECTOR_STATE */, debounceSendInspectorState);
    hooks2.hook("customInspectorSelectNode" /* CUSTOM_INSPECTOR_SELECT_NODE */, ({ inspectorId, nodeId, plugin }) => {
      const inspector = getInspector(inspectorId, plugin.descriptor.app);
      if (!inspector)
        return;
      inspector.selectedNodeId = nodeId;
    });
    hooks2.hook("timelineLayerAdded" /* TIMELINE_LAYER_ADDED */, ({ options, plugin }) => {
      addTimelineLayer(options, plugin.descriptor);
    });
    hooks2.hook("timelineEventAdded" /* TIMELINE_EVENT_ADDED */, ({ options, plugin }) => {
      var _a25;
      const internalLayerIds = ["performance", "component-event", "keyboard", "mouse"];
      if (devtoolsState.highPerfModeEnabled || !((_a25 = devtoolsState.timelineLayersState) == null ? undefined : _a25[plugin.descriptor.id]) && !internalLayerIds.includes(options.layerId))
        return;
      hooks2.callHookWith(async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb(options)));
      }, "sendTimelineEventToClient" /* SEND_TIMELINE_EVENT_TO_CLIENT */);
    });
    hooks2.hook("getComponentInstances" /* GET_COMPONENT_INSTANCES */, async ({ app }) => {
      const appRecord = app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
      if (!appRecord)
        return null;
      const appId = appRecord.id.toString();
      const instances = [...appRecord.instanceMap].filter(([key]) => key.split(":")[0] === appId).map(([, instance]) => instance);
      return instances;
    });
    hooks2.hook("getComponentBounds" /* GET_COMPONENT_BOUNDS */, async ({ instance }) => {
      const bounds = getComponentBoundingRect(instance);
      return bounds;
    });
    hooks2.hook("getComponentName" /* GET_COMPONENT_NAME */, ({ instance }) => {
      const name = getInstanceName(instance);
      return name;
    });
    hooks2.hook("componentHighlight" /* COMPONENT_HIGHLIGHT */, ({ uid }) => {
      const instance = activeAppRecord.value.instanceMap.get(uid);
      if (instance) {
        highlight(instance);
      }
    });
    hooks2.hook("componentUnhighlight" /* COMPONENT_UNHIGHLIGHT */, () => {
      unhighlight();
    });
    return hooks2;
  }

  // src/ctx/state.ts
  var _a4, _b4;
  (_b4 = (_a4 = target).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null ? _b4 : _a4.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = [];
  var _a5, _b5;
  (_b5 = (_a5 = target).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null ? _b5 : _a5.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {};
  var _a6, _b6;
  (_b6 = (_a6 = target).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null ? _b6 : _a6.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "";
  var _a7, _b7;
  (_b7 = (_a7 = target).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null ? _b7 : _a7.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = [];
  var _a8, _b8;
  (_b8 = (_a8 = target).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null ? _b8 : _a8.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = [];
  var STATE_KEY = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
  function initStateFactory() {
    return {
      connected: false,
      clientConnected: false,
      vitePluginDetected: true,
      appRecords: [],
      activeAppRecordId: "",
      tabs: [],
      commands: [],
      highPerfModeEnabled: true,
      devtoolsClientDetected: {},
      perfUniqueGroupId: 0,
      timelineLayersState: getTimelineLayersStateFromStorage()
    };
  }
  var _a9, _b9;
  (_b9 = (_a9 = target)[STATE_KEY]) != null ? _b9 : _a9[STATE_KEY] = initStateFactory();
  var callStateUpdatedHook = debounce((state) => {
    devtoolsContext.hooks.callHook("devtoolsStateUpdated" /* DEVTOOLS_STATE_UPDATED */, { state });
  });
  debounce((state, oldState) => {
    devtoolsContext.hooks.callHook("devtoolsConnectedUpdated" /* DEVTOOLS_CONNECTED_UPDATED */, { state, oldState });
  });
  var devtoolsAppRecords = new Proxy(target.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
    get(_target, prop, receiver) {
      if (prop === "value")
        return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__;
      return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__[prop];
    }
  });
  var activeAppRecord = new Proxy(target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
    get(_target, prop, receiver) {
      if (prop === "value")
        return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__;
      else if (prop === "id")
        return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__;
      return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[prop];
    }
  });
  function updateAllStates() {
    callStateUpdatedHook({
      ...target[STATE_KEY],
      appRecords: devtoolsAppRecords.value,
      activeAppRecordId: activeAppRecord.id,
      tabs: target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
      commands: target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
    });
  }
  function setActiveAppRecord(app) {
    target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = app;
    updateAllStates();
  }
  function setActiveAppRecordId(id) {
    target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = id;
    updateAllStates();
  }
  var devtoolsState = new Proxy(target[STATE_KEY], {
    get(target22, property) {
      if (property === "appRecords") {
        return devtoolsAppRecords;
      } else if (property === "activeAppRecordId") {
        return activeAppRecord.id;
      } else if (property === "tabs") {
        return target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__;
      } else if (property === "commands") {
        return target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__;
      }
      return target[STATE_KEY][property];
    },
    deleteProperty(target22, property) {
      delete target22[property];
      return true;
    },
    set(target22, property, value) {
      ({ ...target[STATE_KEY] });
      target22[property] = value;
      target[STATE_KEY][property] = value;
      return true;
    }
  });
  function openInEditor(options = {}) {
    var _a25, _b25, _c;
    const { file, host, baseUrl = window.location.origin, line = 0, column = 0 } = options;
    if (file) {
      if (host === "chrome-extension") {
        const fileName = file.replace(/\\/g, "\\\\");
        const _baseUrl = (_b25 = (_a25 = window.VUE_DEVTOOLS_CONFIG) == null ? undefined : _a25.openInEditorHost) != null ? _b25 : "/";
        fetch(`${_baseUrl}__open-in-editor?file=${encodeURI(file)}`).then((response) => {
          if (!response.ok) {
            const msg = `Opening component ${fileName} failed`;
            console.log(`%c${msg}`, "color:red");
          }
        });
      } else if (devtoolsState.vitePluginDetected) {
        const _baseUrl = (_c = target.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? _c : baseUrl;
        target.__VUE_INSPECTOR__.openInEditor(_baseUrl, file, line, column);
      }
    }
  }

  // src/core/plugin/index.ts
  init_esm_shims();

  // src/api/index.ts
  init_esm_shims();

  // src/api/v6/index.ts
  init_esm_shims();

  // src/core/plugin/plugin-settings.ts
  init_esm_shims();

  // src/ctx/plugin.ts
  init_esm_shims();
  var _a10, _b10;
  (_b10 = (_a10 = target).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null ? _b10 : _a10.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = [];
  var devtoolsPluginBuffer = new Proxy(target.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
    get(target22, prop, receiver) {
      return Reflect.get(target22, prop, receiver);
    }
  });

  // src/core/plugin/plugin-settings.ts
  function _getSettings(settings) {
    const _settings = {};
    Object.keys(settings).forEach((key) => {
      _settings[key] = settings[key].defaultValue;
    });
    return _settings;
  }
  function getPluginLocalKey(pluginId) {
    return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${pluginId}__`;
  }
  function getPluginSettingsOptions(pluginId) {
    var _a25, _b25, _c;
    const item = (_b25 = (_a25 = devtoolsPluginBuffer.find((item2) => {
      var _a26;
      return item2[0].id === pluginId && !!((_a26 = item2[0]) == null ? undefined : _a26.settings);
    })) == null ? undefined : _a25[0]) != null ? _b25 : null;
    return (_c = item == null ? undefined : item.settings) != null ? _c : null;
  }
  function getPluginSettings(pluginId, fallbackValue) {
    var _a25, _b25, _c;
    const localKey = getPluginLocalKey(pluginId);
    if (localKey) {
      const localSettings = localStorage.getItem(localKey);
      if (localSettings) {
        return JSON.parse(localSettings);
      }
    }
    if (pluginId) {
      const item = (_b25 = (_a25 = devtoolsPluginBuffer.find((item2) => item2[0].id === pluginId)) == null ? undefined : _a25[0]) != null ? _b25 : null;
      return _getSettings((_c = item == null ? undefined : item.settings) != null ? _c : {});
    }
    return _getSettings(fallbackValue);
  }
  function initPluginSettings(pluginId, settings) {
    const localKey = getPluginLocalKey(pluginId);
    const localSettings = localStorage.getItem(localKey);
    if (!localSettings) {
      localStorage.setItem(localKey, JSON.stringify(_getSettings(settings)));
    }
  }
  function setPluginSettings(pluginId, key, value) {
    const localKey = getPluginLocalKey(pluginId);
    const localSettings = localStorage.getItem(localKey);
    const parsedLocalSettings = JSON.parse(localSettings || "{}");
    const updated = {
      ...parsedLocalSettings,
      [key]: value
    };
    localStorage.setItem(localKey, JSON.stringify(updated));
    devtoolsContext.hooks.callHookWith((callbacks) => {
      callbacks.forEach((cb) => cb({
        pluginId,
        key,
        oldValue: parsedLocalSettings[key],
        newValue: value,
        settings: updated
      }));
    }, "setPluginSettings" /* SET_PLUGIN_SETTINGS */);
  }

  // src/hook/index.ts
  init_esm_shims();

  // src/types/index.ts
  init_esm_shims();

  // src/types/app.ts
  init_esm_shims();

  // src/types/command.ts
  init_esm_shims();

  // src/types/component.ts
  init_esm_shims();

  // src/types/hook.ts
  init_esm_shims();

  // src/types/inspector.ts
  init_esm_shims();

  // src/types/plugin.ts
  init_esm_shims();

  // src/types/router.ts
  init_esm_shims();

  // src/types/tab.ts
  init_esm_shims();

  // src/types/timeline.ts
  init_esm_shims();

  // src/hook/index.ts
  var _a11, _b11;
  var devtoolsHooks = (_b11 = (_a11 = target).__VUE_DEVTOOLS_HOOK) != null ? _b11 : _a11.__VUE_DEVTOOLS_HOOK = createHooks();
  var on = {
    vueAppInit(fn) {
      devtoolsHooks.hook("app:init" /* APP_INIT */, fn);
    },
    vueAppUnmount(fn) {
      devtoolsHooks.hook("app:unmount" /* APP_UNMOUNT */, fn);
    },
    vueAppConnected(fn) {
      devtoolsHooks.hook("app:connected" /* APP_CONNECTED */, fn);
    },
    componentAdded(fn) {
      return devtoolsHooks.hook("component:added" /* COMPONENT_ADDED */, fn);
    },
    componentEmit(fn) {
      return devtoolsHooks.hook("component:emit" /* COMPONENT_EMIT */, fn);
    },
    componentUpdated(fn) {
      return devtoolsHooks.hook("component:updated" /* COMPONENT_UPDATED */, fn);
    },
    componentRemoved(fn) {
      return devtoolsHooks.hook("component:removed" /* COMPONENT_REMOVED */, fn);
    },
    setupDevtoolsPlugin(fn) {
      devtoolsHooks.hook("devtools-plugin:setup" /* SETUP_DEVTOOLS_PLUGIN */, fn);
    },
    perfStart(fn) {
      return devtoolsHooks.hook("perf:start" /* PERFORMANCE_START */, fn);
    },
    perfEnd(fn) {
      return devtoolsHooks.hook("perf:end" /* PERFORMANCE_END */, fn);
    }
  };
  var hook = {
    on,
    setupDevToolsPlugin(pluginDescriptor, setupFn) {
      return devtoolsHooks.callHook("devtools-plugin:setup" /* SETUP_DEVTOOLS_PLUGIN */, pluginDescriptor, setupFn);
    }
  };

  // src/api/v6/index.ts
  var DevToolsV6PluginAPI = class {
    constructor({ plugin, ctx }) {
      this.hooks = ctx.hooks;
      this.plugin = plugin;
    }
    get on() {
      return {
        // component inspector
        visitComponentTree: (handler) => {
          this.hooks.hook("visitComponentTree" /* VISIT_COMPONENT_TREE */, handler);
        },
        inspectComponent: (handler) => {
          this.hooks.hook("inspectComponent" /* INSPECT_COMPONENT */, handler);
        },
        editComponentState: (handler) => {
          this.hooks.hook("editComponentState" /* EDIT_COMPONENT_STATE */, handler);
        },
        // custom inspector
        getInspectorTree: (handler) => {
          this.hooks.hook("getInspectorTree" /* GET_INSPECTOR_TREE */, handler);
        },
        getInspectorState: (handler) => {
          this.hooks.hook("getInspectorState" /* GET_INSPECTOR_STATE */, handler);
        },
        editInspectorState: (handler) => {
          this.hooks.hook("editInspectorState" /* EDIT_INSPECTOR_STATE */, handler);
        },
        // timeline
        inspectTimelineEvent: (handler) => {
          this.hooks.hook("inspectTimelineEvent" /* INSPECT_TIMELINE_EVENT */, handler);
        },
        timelineCleared: (handler) => {
          this.hooks.hook("timelineCleared" /* TIMELINE_CLEARED */, handler);
        },
        // settings
        setPluginSettings: (handler) => {
          this.hooks.hook("setPluginSettings" /* SET_PLUGIN_SETTINGS */, handler);
        }
      };
    }
    // component inspector
    notifyComponentUpdate(instance) {
      var _a25;
      if (devtoolsState.highPerfModeEnabled) {
        return;
      }
      const inspector = getActiveInspectors().find((i) => i.packageName === this.plugin.descriptor.packageName);
      if (inspector == null ? undefined : inspector.id) {
        if (instance) {
          const args = [
            instance.appContext.app,
            instance.uid,
            (_a25 = instance.parent) == null ? undefined : _a25.uid,
            instance
          ];
          devtoolsHooks.callHook("component:updated" /* COMPONENT_UPDATED */, ...args);
        } else {
          devtoolsHooks.callHook("component:updated" /* COMPONENT_UPDATED */);
        }
        this.hooks.callHook("sendInspectorState" /* SEND_INSPECTOR_STATE */, { inspectorId: inspector.id, plugin: this.plugin });
      }
    }
    // custom inspector
    addInspector(options) {
      this.hooks.callHook("addInspector" /* ADD_INSPECTOR */, { inspector: options, plugin: this.plugin });
      if (this.plugin.descriptor.settings) {
        initPluginSettings(options.id, this.plugin.descriptor.settings);
      }
    }
    sendInspectorTree(inspectorId) {
      if (devtoolsState.highPerfModeEnabled) {
        return;
      }
      this.hooks.callHook("sendInspectorTree" /* SEND_INSPECTOR_TREE */, { inspectorId, plugin: this.plugin });
    }
    sendInspectorState(inspectorId) {
      if (devtoolsState.highPerfModeEnabled) {
        return;
      }
      this.hooks.callHook("sendInspectorState" /* SEND_INSPECTOR_STATE */, { inspectorId, plugin: this.plugin });
    }
    selectInspectorNode(inspectorId, nodeId) {
      this.hooks.callHook("customInspectorSelectNode" /* CUSTOM_INSPECTOR_SELECT_NODE */, { inspectorId, nodeId, plugin: this.plugin });
    }
    visitComponentTree(payload) {
      return this.hooks.callHook("visitComponentTree" /* VISIT_COMPONENT_TREE */, payload);
    }
    // timeline
    now() {
      if (devtoolsState.highPerfModeEnabled) {
        return 0;
      }
      return Date.now();
    }
    addTimelineLayer(options) {
      this.hooks.callHook("timelineLayerAdded" /* TIMELINE_LAYER_ADDED */, { options, plugin: this.plugin });
    }
    addTimelineEvent(options) {
      if (devtoolsState.highPerfModeEnabled) {
        return;
      }
      this.hooks.callHook("timelineEventAdded" /* TIMELINE_EVENT_ADDED */, { options, plugin: this.plugin });
    }
    // settings
    getSettings(pluginId) {
      return getPluginSettings(pluginId != null ? pluginId : this.plugin.descriptor.id, this.plugin.descriptor.settings);
    }
    // utilities
    getComponentInstances(app) {
      return this.hooks.callHook("getComponentInstances" /* GET_COMPONENT_INSTANCES */, { app });
    }
    getComponentBounds(instance) {
      return this.hooks.callHook("getComponentBounds" /* GET_COMPONENT_BOUNDS */, { instance });
    }
    getComponentName(instance) {
      return this.hooks.callHook("getComponentName" /* GET_COMPONENT_NAME */, { instance });
    }
    highlightElement(instance) {
      const uid = instance.__VUE_DEVTOOLS_NEXT_UID__;
      return this.hooks.callHook("componentHighlight" /* COMPONENT_HIGHLIGHT */, { uid });
    }
    unhighlightElement() {
      return this.hooks.callHook("componentUnhighlight" /* COMPONENT_UNHIGHLIGHT */);
    }
  };

  // src/api/index.ts
  var DevToolsPluginAPI = DevToolsV6PluginAPI;

  // src/core/plugin/components.ts
  init_esm_shims();

  // src/core/component/state/index.ts
  init_esm_shims();

  // src/core/component/state/process.ts
  init_esm_shims();

  // src/core/component/state/constants.ts
  init_esm_shims();
  var UNDEFINED = "__vue_devtool_undefined__";
  var INFINITY = "__vue_devtool_infinity__";
  var NEGATIVE_INFINITY = "__vue_devtool_negative_infinity__";
  var NAN = "__vue_devtool_nan__";

  // src/core/component/state/util.ts
  init_esm_shims();

  // src/core/component/state/is.ts
  init_esm_shims();

  // src/core/component/state/util.ts
  var tokenMap = {
    [UNDEFINED]: "undefined",
    [NAN]: "NaN",
    [INFINITY]: "Infinity",
    [NEGATIVE_INFINITY]: "-Infinity"
  };
  Object.entries(tokenMap).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});

  // src/core/component/tree/walker.ts
  init_esm_shims();

  // src/core/component/tree/filter.ts
  init_esm_shims();

  // src/core/timeline/index.ts
  init_esm_shims();

  // src/core/timeline/perf.ts
  init_esm_shims();

  // src/core/vm/index.ts
  init_esm_shims();

  // src/core/plugin/index.ts
  var _a12, _b12;
  (_b12 = (_a12 = target).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null ? _b12 : _a12.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set();
  function setupDevToolsPlugin(pluginDescriptor, setupFn) {
    return hook.setupDevToolsPlugin(pluginDescriptor, setupFn);
  }
  function callDevToolsPluginSetupFn(plugin, app) {
    const [pluginDescriptor, setupFn] = plugin;
    if (pluginDescriptor.app !== app)
      return;
    const api = new DevToolsPluginAPI({
      plugin: {
        setupFn,
        descriptor: pluginDescriptor
      },
      ctx: devtoolsContext
    });
    if (pluginDescriptor.packageName === "vuex") {
      api.on.editInspectorState((payload) => {
        api.sendInspectorState(payload.inspectorId);
      });
    }
    setupFn(api);
  }
  function registerDevToolsPlugin(app, options) {
    if (target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(app)) {
      return;
    }
    if (devtoolsState.highPerfModeEnabled && !(options == null ? undefined : options.inspectingComponent)) {
      return;
    }
    target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(app);
    devtoolsPluginBuffer.forEach((plugin) => {
      callDevToolsPluginSetupFn(plugin, app);
    });
  }

  // src/core/router/index.ts
  init_esm_shims();

  // src/ctx/router.ts
  init_esm_shims();
  var ROUTER_KEY = "__VUE_DEVTOOLS_ROUTER__";
  var ROUTER_INFO_KEY = "__VUE_DEVTOOLS_ROUTER_INFO__";
  var _a13, _b13;
  (_b13 = (_a13 = target)[ROUTER_INFO_KEY]) != null ? _b13 : _a13[ROUTER_INFO_KEY] = {
    currentRoute: null,
    routes: []
  };
  var _a14, _b14;
  (_b14 = (_a14 = target)[ROUTER_KEY]) != null ? _b14 : _a14[ROUTER_KEY] = {};
  new Proxy(target[ROUTER_INFO_KEY], {
    get(target22, property) {
      return target[ROUTER_INFO_KEY][property];
    }
  });
  new Proxy(target[ROUTER_KEY], {
    get(target22, property) {
      if (property === "value") {
        return target[ROUTER_KEY];
      }
    }
  });

  // src/core/router/index.ts
  function getRoutes(router) {
    const routesMap = /* @__PURE__ */ new Map();
    return ((router == null ? undefined : router.getRoutes()) || []).filter((i) => !routesMap.has(i.path) && routesMap.set(i.path, 1));
  }
  function filterRoutes(routes) {
    return routes.map((item) => {
      let { path, name, children, meta } = item;
      if (children == null ? undefined : children.length)
        children = filterRoutes(children);
      return {
        path,
        name,
        children,
        meta
      };
    });
  }
  function filterCurrentRoute(route) {
    if (route) {
      const { fullPath, hash, href, path, name, matched, params, query } = route;
      return {
        fullPath,
        hash,
        href,
        path,
        name,
        params,
        query,
        matched: filterRoutes(matched)
      };
    }
    return route;
  }
  function normalizeRouterInfo(appRecord, activeAppRecord2) {
    function init() {
      var _a25;
      const router = (_a25 = appRecord.app) == null ? undefined : _a25.config.globalProperties.$router;
      const currentRoute = filterCurrentRoute(router == null ? undefined : router.currentRoute.value);
      const routes = filterRoutes(getRoutes(router));
      const c = console.warn;
      console.warn = () => {
      };
      target[ROUTER_INFO_KEY] = {
        currentRoute: currentRoute ? deepClone(currentRoute) : {},
        routes: deepClone(routes)
      };
      target[ROUTER_KEY] = router;
      console.warn = c;
    }
    init();
    hook.on.componentUpdated(debounce(() => {
      var _a25;
      if (((_a25 = activeAppRecord2.value) == null ? undefined : _a25.app) !== appRecord.app)
        return;
      init();
      if (devtoolsState.highPerfModeEnabled)
        return;
      devtoolsContext.hooks.callHook("routerInfoUpdated" /* ROUTER_INFO_UPDATED */, { state: target[ROUTER_INFO_KEY] });
    }, 200));
  }

  // src/ctx/api.ts
  function createDevToolsApi(hooks2) {
    return {
      // get inspector tree
      async getInspectorTree(payload) {
        const _payload = {
          ...payload,
          app: activeAppRecord.value.app,
          rootNodes: []
        };
        await new Promise((resolve) => {
          hooks2.callHookWith(async (callbacks) => {
            await Promise.all(callbacks.map((cb) => cb(_payload)));
            resolve();
          }, "getInspectorTree" /* GET_INSPECTOR_TREE */);
        });
        return _payload.rootNodes;
      },
      // get inspector state
      async getInspectorState(payload) {
        const _payload = {
          ...payload,
          app: activeAppRecord.value.app,
          state: null
        };
        const ctx = {
          currentTab: `custom-inspector:${payload.inspectorId}`
        };
        await new Promise((resolve) => {
          hooks2.callHookWith(async (callbacks) => {
            await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
            resolve();
          }, "getInspectorState" /* GET_INSPECTOR_STATE */);
        });
        return _payload.state;
      },
      // edit inspector state
      editInspectorState(payload) {
        const stateEditor2 = new StateEditor();
        const _payload = {
          ...payload,
          app: activeAppRecord.value.app,
          set: (obj, path = payload.path, value = payload.state.value, cb) => {
            stateEditor2.set(obj, path, value, cb || stateEditor2.createDefaultSetCallback(payload.state));
          }
        };
        hooks2.callHookWith((callbacks) => {
          callbacks.forEach((cb) => cb(_payload));
        }, "editInspectorState" /* EDIT_INSPECTOR_STATE */);
      },
      // send inspector state
      sendInspectorState(inspectorId) {
        const inspector = getInspector(inspectorId);
        hooks2.callHook("sendInspectorState" /* SEND_INSPECTOR_STATE */, { inspectorId, plugin: {
          descriptor: inspector.descriptor,
          setupFn: () => ({})
        } });
      },
      // inspect component inspector
      inspectComponentInspector() {
        return inspectComponentHighLighter();
      },
      // cancel inspect component inspector
      cancelInspectComponentInspector() {
        return cancelInspectComponentHighLighter();
      },
      // get component render code
      getComponentRenderCode(id) {
        const instance = getComponentInstance(activeAppRecord.value, id);
        if (instance)
          return !((instance == null ? undefined : instance.type) instanceof Function) ? instance.render.toString() : instance.type.toString();
      },
      // scroll to component
      scrollToComponent(id) {
        return scrollToComponent({ id });
      },
      // open in editor
      openInEditor,
      // get vue inspector
      getVueInspector: getComponentInspector,
      // toggle app
      toggleApp(id, options) {
        const appRecord = devtoolsAppRecords.value.find((record) => record.id === id);
        if (appRecord) {
          setActiveAppRecordId(id);
          setActiveAppRecord(appRecord);
          normalizeRouterInfo(appRecord, activeAppRecord);
          callInspectorUpdatedHook();
          registerDevToolsPlugin(appRecord.app, options);
        }
      },
      // inspect dom
      inspectDOM(instanceId) {
        const instance = getComponentInstance(activeAppRecord.value, instanceId);
        if (instance) {
          const [el] = getRootElementsFromComponentInstance(instance);
          if (el) {
            target.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = el;
          }
        }
      },
      updatePluginSettings(pluginId, key, value) {
        setPluginSettings(pluginId, key, value);
      },
      getPluginSettings(pluginId) {
        return {
          options: getPluginSettingsOptions(pluginId),
          values: getPluginSettings(pluginId)
        };
      }
    };
  }

  // src/ctx/env.ts
  init_esm_shims();
  var _a15, _b15;
  (_b15 = (_a15 = target).__VUE_DEVTOOLS_ENV__) != null ? _b15 : _a15.__VUE_DEVTOOLS_ENV__ = {
    vitePluginDetected: false
  };

  // src/ctx/index.ts
  var hooks = createDevToolsCtxHooks();
  var _a16, _b16;
  (_b16 = (_a16 = target).__VUE_DEVTOOLS_KIT_CONTEXT__) != null ? _b16 : _a16.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
    hooks,
    get state() {
      return {
        ...devtoolsState,
        activeAppRecordId: activeAppRecord.id,
        activeAppRecord: activeAppRecord.value,
        appRecords: devtoolsAppRecords.value
      };
    },
    api: createDevToolsApi(hooks)
  };
  var devtoolsContext = target.__VUE_DEVTOOLS_KIT_CONTEXT__;

  // src/core/app/index.ts
  init_esm_shims();
  __toESM(require_speakingurl2());
  var _a17, _b17;
  (_b17 = (_a17 = target).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null ? _b17 : _a17.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
    id: 0,
    appIds: /* @__PURE__ */ new Set()
  };

  // src/core/high-perf-mode/index.ts
  init_esm_shims();
  function toggleHighPerfMode(state) {
    devtoolsState.highPerfModeEnabled = state != null ? state : !devtoolsState.highPerfModeEnabled;
    if (!state && activeAppRecord.value) {
      registerDevToolsPlugin(activeAppRecord.value.app);
    }
  }

  // src/core/component/state/format.ts
  init_esm_shims();

  // src/core/component/state/reviver.ts
  init_esm_shims();

  // src/core/devtools-client/detected.ts
  init_esm_shims();
  function updateDevToolsClientDetected(params) {
    devtoolsState.devtoolsClientDetected = {
      ...devtoolsState.devtoolsClientDetected,
      ...params
    };
    const devtoolsClientVisible = Object.values(devtoolsState.devtoolsClientDetected).some(Boolean);
    toggleHighPerfMode(!devtoolsClientVisible);
  }
  var _a18, _b18;
  (_b18 = (_a18 = target).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null ? _b18 : _a18.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = updateDevToolsClientDetected;

  // src/messaging/index.ts
  init_esm_shims();

  // src/messaging/presets/index.ts
  init_esm_shims();

  // src/messaging/presets/broadcast-channel/index.ts
  init_esm_shims();

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/index.js
  init_esm_shims();

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/class-registry.js
  init_esm_shims();

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/registry.js
  init_esm_shims();

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/double-indexed-kv.js
  init_esm_shims();
  var DoubleIndexedKV = class {
    constructor() {
      this.keyToValue = /* @__PURE__ */ new Map();
      this.valueToKey = /* @__PURE__ */ new Map();
    }
    set(key, value) {
      this.keyToValue.set(key, value);
      this.valueToKey.set(value, key);
    }
    getByKey(key) {
      return this.keyToValue.get(key);
    }
    getByValue(value) {
      return this.valueToKey.get(value);
    }
    clear() {
      this.keyToValue.clear();
      this.valueToKey.clear();
    }
  };

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/registry.js
  var Registry = class {
    constructor(generateIdentifier) {
      this.generateIdentifier = generateIdentifier;
      this.kv = new DoubleIndexedKV();
    }
    register(value, identifier) {
      if (this.kv.getByValue(value)) {
        return;
      }
      if (!identifier) {
        identifier = this.generateIdentifier(value);
      }
      this.kv.set(identifier, value);
    }
    clear() {
      this.kv.clear();
    }
    getIdentifier(value) {
      return this.kv.getByValue(value);
    }
    getValue(identifier) {
      return this.kv.getByKey(identifier);
    }
  };

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/class-registry.js
  var ClassRegistry = class extends Registry {
    constructor() {
      super((c) => c.name);
      this.classToAllowedProps = /* @__PURE__ */ new Map();
    }
    register(value, options) {
      if (typeof options === "object") {
        if (options.allowProps) {
          this.classToAllowedProps.set(value, options.allowProps);
        }
        super.register(value, options.identifier);
      } else {
        super.register(value, options);
      }
    }
    getAllowedProps(value) {
      return this.classToAllowedProps.get(value);
    }
  };

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/custom-transformer-registry.js
  init_esm_shims();

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/util.js
  init_esm_shims();
  function valuesOfObj(record) {
    if ("values" in Object) {
      return Object.values(record);
    }
    const values = [];
    for (const key in record) {
      if (record.hasOwnProperty(key)) {
        values.push(record[key]);
      }
    }
    return values;
  }
  function find(record, predicate) {
    const values = valuesOfObj(record);
    if ("find" in values) {
      return values.find(predicate);
    }
    const valuesNotNever = values;
    for (let i = 0; i < valuesNotNever.length; i++) {
      const value = valuesNotNever[i];
      if (predicate(value)) {
        return value;
      }
    }
    return undefined;
  }
  function forEach(record, run) {
    Object.entries(record).forEach(([key, value]) => run(value, key));
  }
  function includes(arr, value) {
    return arr.indexOf(value) !== -1;
  }
  function findArr(record, predicate) {
    for (let i = 0; i < record.length; i++) {
      const value = record[i];
      if (predicate(value)) {
        return value;
      }
    }
    return undefined;
  }

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/custom-transformer-registry.js
  var CustomTransformerRegistry = class {
    constructor() {
      this.transfomers = {};
    }
    register(transformer) {
      this.transfomers[transformer.name] = transformer;
    }
    findApplicable(v) {
      return find(this.transfomers, (transformer) => transformer.isApplicable(v));
    }
    findByName(name) {
      return this.transfomers[name];
    }
  };

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/plainer.js
  init_esm_shims();

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/is.js
  init_esm_shims();
  var getType = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
  var isUndefined = (payload) => typeof payload === "undefined";
  var isNull = (payload) => payload === null;
  var isPlainObject2 = (payload) => {
    if (typeof payload !== "object" || payload === null)
      return false;
    if (payload === Object.prototype)
      return false;
    if (Object.getPrototypeOf(payload) === null)
      return true;
    return Object.getPrototypeOf(payload) === Object.prototype;
  };
  var isEmptyObject = (payload) => isPlainObject2(payload) && Object.keys(payload).length === 0;
  var isArray = (payload) => Array.isArray(payload);
  var isString = (payload) => typeof payload === "string";
  var isNumber = (payload) => typeof payload === "number" && !isNaN(payload);
  var isBoolean = (payload) => typeof payload === "boolean";
  var isRegExp = (payload) => payload instanceof RegExp;
  var isMap = (payload) => payload instanceof Map;
  var isSet = (payload) => payload instanceof Set;
  var isSymbol = (payload) => getType(payload) === "Symbol";
  var isDate = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
  var isError = (payload) => payload instanceof Error;
  var isNaNValue = (payload) => typeof payload === "number" && isNaN(payload);
  var isPrimitive2 = (payload) => isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
  var isBigint = (payload) => typeof payload === "bigint";
  var isInfinite = (payload) => payload === Infinity || payload === -Infinity;
  var isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
  var isURL = (payload) => payload instanceof URL;

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/pathstringifier.js
  init_esm_shims();
  var escapeKey = (key) => key.replace(/\./g, "\\.");
  var stringifyPath = (path) => path.map(String).map(escapeKey).join(".");
  var parsePath = (string) => {
    const result = [];
    let segment = "";
    for (let i = 0; i < string.length; i++) {
      let char = string.charAt(i);
      const isEscapedDot = char === "\\" && string.charAt(i + 1) === ".";
      if (isEscapedDot) {
        segment += ".";
        i++;
        continue;
      }
      const isEndOfSegment = char === ".";
      if (isEndOfSegment) {
        result.push(segment);
        segment = "";
        continue;
      }
      segment += char;
    }
    const lastSegment = segment;
    result.push(lastSegment);
    return result;
  };

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/transformer.js
  init_esm_shims();
  function simpleTransformation(isApplicable, annotation, transform, untransform) {
    return {
      isApplicable,
      annotation,
      transform,
      untransform
    };
  }
  var simpleRules = [
    simpleTransformation(isUndefined, "undefined", () => null, () => undefined),
    simpleTransformation(isBigint, "bigint", (v) => v.toString(), (v) => {
      if (typeof BigInt !== "undefined") {
        return BigInt(v);
      }
      console.error("Please add a BigInt polyfill.");
      return v;
    }),
    simpleTransformation(isDate, "Date", (v) => v.toISOString(), (v) => new Date(v)),
    simpleTransformation(isError, "Error", (v, superJson) => {
      const baseError = {
        name: v.name,
        message: v.message
      };
      superJson.allowedErrorProps.forEach((prop) => {
        baseError[prop] = v[prop];
      });
      return baseError;
    }, (v, superJson) => {
      const e = new Error(v.message);
      e.name = v.name;
      e.stack = v.stack;
      superJson.allowedErrorProps.forEach((prop) => {
        e[prop] = v[prop];
      });
      return e;
    }),
    simpleTransformation(isRegExp, "regexp", (v) => "" + v, (regex) => {
      const body = regex.slice(1, regex.lastIndexOf("/"));
      const flags = regex.slice(regex.lastIndexOf("/") + 1);
      return new RegExp(body, flags);
    }),
    simpleTransformation(
      isSet,
      "set",
      // (sets only exist in es6+)
      // eslint-disable-next-line es5/no-es6-methods
      (v) => [...v.values()],
      (v) => new Set(v)
    ),
    simpleTransformation(isMap, "map", (v) => [...v.entries()], (v) => new Map(v)),
    simpleTransformation((v) => isNaNValue(v) || isInfinite(v), "number", (v) => {
      if (isNaNValue(v)) {
        return "NaN";
      }
      if (v > 0) {
        return "Infinity";
      } else {
        return "-Infinity";
      }
    }, Number),
    simpleTransformation((v) => v === 0 && 1 / v === -Infinity, "number", () => {
      return "-0";
    }, Number),
    simpleTransformation(isURL, "URL", (v) => v.toString(), (v) => new URL(v))
  ];
  function compositeTransformation(isApplicable, annotation, transform, untransform) {
    return {
      isApplicable,
      annotation,
      transform,
      untransform
    };
  }
  var symbolRule = compositeTransformation((s, superJson) => {
    if (isSymbol(s)) {
      const isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
      return isRegistered;
    }
    return false;
  }, (s, superJson) => {
    const identifier = superJson.symbolRegistry.getIdentifier(s);
    return ["symbol", identifier];
  }, (v) => v.description, (_, a, superJson) => {
    const value = superJson.symbolRegistry.getValue(a[1]);
    if (!value) {
      throw new Error("Trying to deserialize unknown symbol");
    }
    return value;
  });
  var constructorToName = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    Uint8ClampedArray
  ].reduce((obj, ctor) => {
    obj[ctor.name] = ctor;
    return obj;
  }, {});
  var typedArrayRule = compositeTransformation(isTypedArray, (v) => ["typed-array", v.constructor.name], (v) => [...v], (v, a) => {
    const ctor = constructorToName[a[1]];
    if (!ctor) {
      throw new Error("Trying to deserialize unknown typed array");
    }
    return new ctor(v);
  });
  function isInstanceOfRegisteredClass(potentialClass, superJson) {
    if (potentialClass == null ? undefined : potentialClass.constructor) {
      const isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
      return isRegistered;
    }
    return false;
  }
  var classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
    const identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
    return ["class", identifier];
  }, (clazz, superJson) => {
    const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
    if (!allowedProps) {
      return { ...clazz };
    }
    const result = {};
    allowedProps.forEach((prop) => {
      result[prop] = clazz[prop];
    });
    return result;
  }, (v, a, superJson) => {
    const clazz = superJson.classRegistry.getValue(a[1]);
    if (!clazz) {
      throw new Error(`Trying to deserialize unknown class '${a[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
    }
    return Object.assign(Object.create(clazz.prototype), v);
  });
  var customRule = compositeTransformation((value, superJson) => {
    return !!superJson.customTransformerRegistry.findApplicable(value);
  }, (value, superJson) => {
    const transformer = superJson.customTransformerRegistry.findApplicable(value);
    return ["custom", transformer.name];
  }, (value, superJson) => {
    const transformer = superJson.customTransformerRegistry.findApplicable(value);
    return transformer.serialize(value);
  }, (v, a, superJson) => {
    const transformer = superJson.customTransformerRegistry.findByName(a[1]);
    if (!transformer) {
      throw new Error("Trying to deserialize unknown custom value");
    }
    return transformer.deserialize(v);
  });
  var compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
  var transformValue = (value, superJson) => {
    const applicableCompositeRule = findArr(compositeRules, (rule) => rule.isApplicable(value, superJson));
    if (applicableCompositeRule) {
      return {
        value: applicableCompositeRule.transform(value, superJson),
        type: applicableCompositeRule.annotation(value, superJson)
      };
    }
    const applicableSimpleRule = findArr(simpleRules, (rule) => rule.isApplicable(value, superJson));
    if (applicableSimpleRule) {
      return {
        value: applicableSimpleRule.transform(value, superJson),
        type: applicableSimpleRule.annotation
      };
    }
    return undefined;
  };
  var simpleRulesByAnnotation = {};
  simpleRules.forEach((rule) => {
    simpleRulesByAnnotation[rule.annotation] = rule;
  });
  var untransformValue = (json, type, superJson) => {
    if (isArray(type)) {
      switch (type[0]) {
        case "symbol":
          return symbolRule.untransform(json, type, superJson);
        case "class":
          return classRule.untransform(json, type, superJson);
        case "custom":
          return customRule.untransform(json, type, superJson);
        case "typed-array":
          return typedArrayRule.untransform(json, type, superJson);
        default:
          throw new Error("Unknown transformation: " + type);
      }
    } else {
      const transformation = simpleRulesByAnnotation[type];
      if (!transformation) {
        throw new Error("Unknown transformation: " + type);
      }
      return transformation.untransform(json, superJson);
    }
  };

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/accessDeep.js
  init_esm_shims();
  var getNthKey = (value, n) => {
    if (n > value.size)
      throw new Error("index out of bounds");
    const keys = value.keys();
    while (n > 0) {
      keys.next();
      n--;
    }
    return keys.next().value;
  };
  function validatePath(path) {
    if (includes(path, "__proto__")) {
      throw new Error("__proto__ is not allowed as a property");
    }
    if (includes(path, "prototype")) {
      throw new Error("prototype is not allowed as a property");
    }
    if (includes(path, "constructor")) {
      throw new Error("constructor is not allowed as a property");
    }
  }
  var getDeep = (object, path) => {
    validatePath(path);
    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      if (isSet(object)) {
        object = getNthKey(object, +key);
      } else if (isMap(object)) {
        const row = +key;
        const type = +path[++i] === 0 ? "key" : "value";
        const keyOfRow = getNthKey(object, row);
        switch (type) {
          case "key":
            object = keyOfRow;
            break;
          case "value":
            object = object.get(keyOfRow);
            break;
        }
      } else {
        object = object[key];
      }
    }
    return object;
  };
  var setDeep = (object, path, mapper) => {
    validatePath(path);
    if (path.length === 0) {
      return mapper(object);
    }
    let parent = object;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (isArray(parent)) {
        const index = +key;
        parent = parent[index];
      } else if (isPlainObject2(parent)) {
        parent = parent[key];
      } else if (isSet(parent)) {
        const row = +key;
        parent = getNthKey(parent, row);
      } else if (isMap(parent)) {
        const isEnd = i === path.length - 2;
        if (isEnd) {
          break;
        }
        const row = +key;
        const type = +path[++i] === 0 ? "key" : "value";
        const keyOfRow = getNthKey(parent, row);
        switch (type) {
          case "key":
            parent = keyOfRow;
            break;
          case "value":
            parent = parent.get(keyOfRow);
            break;
        }
      }
    }
    const lastKey = path[path.length - 1];
    if (isArray(parent)) {
      parent[+lastKey] = mapper(parent[+lastKey]);
    } else if (isPlainObject2(parent)) {
      parent[lastKey] = mapper(parent[lastKey]);
    }
    if (isSet(parent)) {
      const oldValue = getNthKey(parent, +lastKey);
      const newValue = mapper(oldValue);
      if (oldValue !== newValue) {
        parent.delete(oldValue);
        parent.add(newValue);
      }
    }
    if (isMap(parent)) {
      const row = +path[path.length - 2];
      const keyToRow = getNthKey(parent, row);
      const type = +lastKey === 0 ? "key" : "value";
      switch (type) {
        case "key": {
          const newKey = mapper(keyToRow);
          parent.set(newKey, parent.get(keyToRow));
          if (newKey !== keyToRow) {
            parent.delete(keyToRow);
          }
          break;
        }
        case "value": {
          parent.set(keyToRow, mapper(parent.get(keyToRow)));
          break;
        }
      }
    }
    return object;
  };

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/plainer.js
  function traverse(tree, walker2, origin = []) {
    if (!tree) {
      return;
    }
    if (!isArray(tree)) {
      forEach(tree, (subtree, key) => traverse(subtree, walker2, [...origin, ...parsePath(key)]));
      return;
    }
    const [nodeValue, children] = tree;
    if (children) {
      forEach(children, (child, key) => {
        traverse(child, walker2, [...origin, ...parsePath(key)]);
      });
    }
    walker2(nodeValue, origin);
  }
  function applyValueAnnotations(plain, annotations, superJson) {
    traverse(annotations, (type, path) => {
      plain = setDeep(plain, path, (v) => untransformValue(v, type, superJson));
    });
    return plain;
  }
  function applyReferentialEqualityAnnotations(plain, annotations) {
    function apply(identicalPaths, path) {
      const object = getDeep(plain, parsePath(path));
      identicalPaths.map(parsePath).forEach((identicalObjectPath) => {
        plain = setDeep(plain, identicalObjectPath, () => object);
      });
    }
    if (isArray(annotations)) {
      const [root, other] = annotations;
      root.forEach((identicalPath) => {
        plain = setDeep(plain, parsePath(identicalPath), () => plain);
      });
      if (other) {
        forEach(other, apply);
      }
    } else {
      forEach(annotations, apply);
    }
    return plain;
  }
  var isDeep = (object, superJson) => isPlainObject2(object) || isArray(object) || isMap(object) || isSet(object) || isInstanceOfRegisteredClass(object, superJson);
  function addIdentity(object, path, identities) {
    const existingSet = identities.get(object);
    if (existingSet) {
      existingSet.push(path);
    } else {
      identities.set(object, [path]);
    }
  }
  function generateReferentialEqualityAnnotations(identitites, dedupe) {
    const result = {};
    let rootEqualityPaths = undefined;
    identitites.forEach((paths) => {
      if (paths.length <= 1) {
        return;
      }
      if (!dedupe) {
        paths = paths.map((path) => path.map(String)).sort((a, b) => a.length - b.length);
      }
      const [representativePath, ...identicalPaths] = paths;
      if (representativePath.length === 0) {
        rootEqualityPaths = identicalPaths.map(stringifyPath);
      } else {
        result[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
      }
    });
    if (rootEqualityPaths) {
      if (isEmptyObject(result)) {
        return [rootEqualityPaths];
      } else {
        return [rootEqualityPaths, result];
      }
    } else {
      return isEmptyObject(result) ? undefined : result;
    }
  }
  var walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = /* @__PURE__ */ new Map()) => {
    var _a25;
    const primitive = isPrimitive2(object);
    if (!primitive) {
      addIdentity(object, path, identities);
      const seen = seenObjects.get(object);
      if (seen) {
        return dedupe ? {
          transformedValue: null
        } : seen;
      }
    }
    if (!isDeep(object, superJson)) {
      const transformed2 = transformValue(object, superJson);
      const result2 = transformed2 ? {
        transformedValue: transformed2.value,
        annotations: [transformed2.type]
      } : {
        transformedValue: object
      };
      if (!primitive) {
        seenObjects.set(object, result2);
      }
      return result2;
    }
    if (includes(objectsInThisPath, object)) {
      return {
        transformedValue: null
      };
    }
    const transformationResult = transformValue(object, superJson);
    const transformed = (_a25 = transformationResult == null ? undefined : transformationResult.value) != null ? _a25 : object;
    const transformedValue = isArray(transformed) ? [] : {};
    const innerAnnotations = {};
    forEach(transformed, (value, index) => {
      if (index === "__proto__" || index === "constructor" || index === "prototype") {
        throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
      }
      const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index], [...objectsInThisPath, object], seenObjects);
      transformedValue[index] = recursiveResult.transformedValue;
      if (isArray(recursiveResult.annotations)) {
        innerAnnotations[index] = recursiveResult.annotations;
      } else if (isPlainObject2(recursiveResult.annotations)) {
        forEach(recursiveResult.annotations, (tree, key) => {
          innerAnnotations[escapeKey(index) + "." + key] = tree;
        });
      }
    });
    const result = isEmptyObject(innerAnnotations) ? {
      transformedValue,
      annotations: !!transformationResult ? [transformationResult.type] : undefined
    } : {
      transformedValue,
      annotations: !!transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
    };
    if (!primitive) {
      seenObjects.set(object, result);
    }
    return result;
  };

  // ../../node_modules/.pnpm/copy-anything@3.0.5/node_modules/copy-anything/dist/index.js
  init_esm_shims();

  // ../../node_modules/.pnpm/is-what@4.1.16/node_modules/is-what/dist/index.js
  init_esm_shims();
  function getType2(payload) {
    return Object.prototype.toString.call(payload).slice(8, -1);
  }
  function isArray2(payload) {
    return getType2(payload) === "Array";
  }
  function isPlainObject3(payload) {
    if (getType2(payload) !== "Object")
      return false;
    const prototype = Object.getPrototypeOf(payload);
    return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
  }

  // ../../node_modules/.pnpm/copy-anything@3.0.5/node_modules/copy-anything/dist/index.js
  function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
    const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
    if (propType === "enumerable")
      carry[key] = newVal;
    if (includeNonenumerable && propType === "nonenumerable") {
      Object.defineProperty(carry, key, {
        value: newVal,
        enumerable: false,
        writable: true,
        configurable: true
      });
    }
  }
  function copy(target22, options = {}) {
    if (isArray2(target22)) {
      return target22.map((item) => copy(item, options));
    }
    if (!isPlainObject3(target22)) {
      return target22;
    }
    const props = Object.getOwnPropertyNames(target22);
    const symbols = Object.getOwnPropertySymbols(target22);
    return [...props, ...symbols].reduce((carry, key) => {
      if (isArray2(options.props) && !options.props.includes(key)) {
        return carry;
      }
      const val = target22[key];
      const newVal = copy(val, options);
      assignProp(carry, key, newVal, target22, options.nonenumerable);
      return carry;
    }, {});
  }

  // ../../node_modules/.pnpm/superjson@2.2.2/node_modules/superjson/dist/index.js
  var SuperJSON = class {
    /**
     * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
     */
    constructor({ dedupe = false } = {}) {
      this.classRegistry = new ClassRegistry();
      this.symbolRegistry = new Registry((s) => {
        var _a25;
        return (_a25 = s.description) != null ? _a25 : "";
      });
      this.customTransformerRegistry = new CustomTransformerRegistry();
      this.allowedErrorProps = [];
      this.dedupe = dedupe;
    }
    serialize(object) {
      const identities = /* @__PURE__ */ new Map();
      const output = walker(object, identities, this, this.dedupe);
      const res = {
        json: output.transformedValue
      };
      if (output.annotations) {
        res.meta = {
          ...res.meta,
          values: output.annotations
        };
      }
      const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
      if (equalityAnnotations) {
        res.meta = {
          ...res.meta,
          referentialEqualities: equalityAnnotations
        };
      }
      return res;
    }
    deserialize(payload) {
      const { json, meta } = payload;
      let result = copy(json);
      if (meta == null ? undefined : meta.values) {
        result = applyValueAnnotations(result, meta.values, this);
      }
      if (meta == null ? undefined : meta.referentialEqualities) {
        result = applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
      }
      return result;
    }
    stringify(object) {
      return JSON.stringify(this.serialize(object));
    }
    parse(string) {
      return this.deserialize(JSON.parse(string));
    }
    registerClass(v, options) {
      this.classRegistry.register(v, options);
    }
    registerSymbol(v, identifier) {
      this.symbolRegistry.register(v, identifier);
    }
    registerCustom(transformer, name) {
      this.customTransformerRegistry.register({
        name,
        ...transformer
      });
    }
    allowErrorProps(...props) {
      this.allowedErrorProps.push(...props);
    }
  };
  SuperJSON.defaultInstance = new SuperJSON();
  SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
  SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
  SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
  SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
  SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
  SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
  SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
  SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);

  // src/messaging/presets/broadcast-channel/context.ts
  init_esm_shims();

  // src/messaging/presets/electron/index.ts
  init_esm_shims();

  // src/messaging/presets/electron/client.ts
  init_esm_shims();

  // src/messaging/presets/electron/context.ts
  init_esm_shims();

  // src/messaging/presets/electron/proxy.ts
  init_esm_shims();

  // src/messaging/presets/electron/server.ts
  init_esm_shims();

  // src/messaging/presets/extension/index.ts
  init_esm_shims();

  // src/messaging/presets/extension/client.ts
  init_esm_shims();

  // src/messaging/presets/extension/context.ts
  init_esm_shims();

  // src/messaging/presets/extension/proxy.ts
  init_esm_shims();

  // src/messaging/presets/extension/server.ts
  init_esm_shims();

  // src/messaging/presets/iframe/index.ts
  init_esm_shims();

  // src/messaging/presets/iframe/client.ts
  init_esm_shims();

  // src/messaging/presets/iframe/context.ts
  init_esm_shims();

  // src/messaging/presets/iframe/server.ts
  init_esm_shims();

  // src/messaging/presets/vite/index.ts
  init_esm_shims();

  // src/messaging/presets/vite/client.ts
  init_esm_shims();

  // src/messaging/presets/vite/context.ts
  init_esm_shims();

  // src/messaging/presets/vite/server.ts
  init_esm_shims();

  // src/messaging/presets/ws/index.ts
  init_esm_shims();

  // src/messaging/presets/ws/client.ts
  init_esm_shims();

  // src/messaging/presets/ws/context.ts
  init_esm_shims();

  // src/messaging/presets/ws/server.ts
  init_esm_shims();

  // src/messaging/index.ts
  var _a19, _b19;
  (_b19 = (_a19 = target).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null ? _b19 : _a19.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = [];
  var _a20, _b20;
  (_b20 = (_a20 = target).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null ? _b20 : _a20.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null;
  var _a21, _b21;
  (_b21 = (_a21 = target).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null ? _b21 : _a21.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null;
  var _a22, _b22;
  (_b22 = (_a22 = target).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null ? _b22 : _a22.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null;
  var _a23, _b23;
  (_b23 = (_a23 = target).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null ? _b23 : _a23.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null;
  var _a24, _b24;
  (_b24 = (_a24 = target).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null ? _b24 : _a24.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null;

  // src/shared/index.ts
  init_esm_shims();

  // src/shared/env.ts
  init_esm_shims();

  // src/shared/time.ts
  init_esm_shims();

  // src/shared/util.ts
  init_esm_shims();

  // src/core/component/state/replacer.ts
  init_esm_shims();

  // src/core/component/state/custom.ts
  init_esm_shims();

  // src/shared/transfer.ts
  init_esm_shims();

  function isPlainObject(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  o) {
      return (o &&
          typeof o === 'object' &&
          Object.prototype.toString.call(o) === '[object Object]' &&
          typeof o.toJSON !== 'function');
  }
  // type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
  // TODO: can we change these to numbers?
  /**
   * Possible types for SubscriptionCallback
   */
  exports.MutationType = void 0;
  (function (MutationType) {
      /**
       * Direct mutation of the state:
       *
       * - `store.name = 'new name'`
       * - `store.$state.name = 'new name'`
       * - `store.list.push('new item')`
       */
      MutationType["direct"] = "direct";
      /**
       * Mutated the state with `$patch` and an object
       *
       * - `store.$patch({ name: 'newName' })`
       */
      MutationType["patchObject"] = "patch object";
      /**
       * Mutated the state with `$patch` and a function
       *
       * - `store.$patch(state => state.name = 'newName')`
       */
      MutationType["patchFunction"] = "patch function";
      // maybe reset? for $state = {} and $reset
  })(exports.MutationType || (exports.MutationType = {}));

  const IS_CLIENT = typeof window !== 'undefined';

  /*
   * FileSaver.js A saveAs() FileSaver implementation.
   *
   * Originally by Eli Grey, adapted as an ESM module by Eduardo San Martin
   * Morote.
   *
   * License : MIT
   */
  // The one and only way of getting global scope in all environments
  // https://stackoverflow.com/q/3277182/1008999
  const _global = /*#__PURE__*/ (() => typeof window === 'object' && window.window === window
      ? window
      : typeof self === 'object' && self.self === self
          ? self
          : typeof global === 'object' && global.global === global
              ? global
              : typeof globalThis === 'object'
                  ? globalThis
                  : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
      // prepend BOM for UTF-8 XML and text/* types (including HTML)
      // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
      if (autoBom &&
          /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
          return new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });
      }
      return blob;
  }
  function download(url, name, opts) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onload = function () {
          saveAs(xhr.response, name, opts);
      };
      xhr.onerror = function () {
          console.error('could not download file');
      };
      xhr.send();
  }
  function corsEnabled(url) {
      const xhr = new XMLHttpRequest();
      // use sync to avoid popup blocker
      xhr.open('HEAD', url, false);
      try {
          xhr.send();
      }
      catch (e) { }
      return xhr.status >= 200 && xhr.status <= 299;
  }
  // `a.click()` doesn't work for all browsers (#465)
  function click(node) {
      try {
          node.dispatchEvent(new MouseEvent('click'));
      }
      catch (e) {
          const evt = document.createEvent('MouseEvents');
          evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
          node.dispatchEvent(evt);
      }
  }
  const _navigator = typeof navigator === 'object' ? navigator : { userAgent: '' };
  // Detect WebView inside a native macOS app by ruling out all browsers
  // We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
  // https://www.whatismybrowser.com/guides/the-latest-user-agent/macos
  const isMacOSWebView = /*#__PURE__*/ (() => /Macintosh/.test(_navigator.userAgent) &&
      /AppleWebKit/.test(_navigator.userAgent) &&
      !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT
      ? () => { } // noop
      : // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
          typeof HTMLAnchorElement !== 'undefined' &&
              'download' in HTMLAnchorElement.prototype &&
              !isMacOSWebView
              ? downloadSaveAs
              : // Use msSaveOrOpenBlob as a second approach
                  'msSaveOrOpenBlob' in _navigator
                      ? msSaveAs
                      : // Fallback to using FileReader and a popup
                          fileSaverSaveAs;
  function downloadSaveAs(blob, name = 'download', opts) {
      const a = document.createElement('a');
      a.download = name;
      a.rel = 'noopener'; // tabnabbing
      // TODO: detect chrome extensions & packaged apps
      // a.target = '_blank'
      if (typeof blob === 'string') {
          // Support regular links
          a.href = blob;
          if (a.origin !== location.origin) {
              if (corsEnabled(a.href)) {
                  download(blob, name, opts);
              }
              else {
                  a.target = '_blank';
                  click(a);
              }
          }
          else {
              click(a);
          }
      }
      else {
          // Support blobs
          a.href = URL.createObjectURL(blob);
          setTimeout(function () {
              URL.revokeObjectURL(a.href);
          }, 4e4); // 40s
          setTimeout(function () {
              click(a);
          }, 0);
      }
  }
  function msSaveAs(blob, name = 'download', opts) {
      if (typeof blob === 'string') {
          if (corsEnabled(blob)) {
              download(blob, name, opts);
          }
          else {
              const a = document.createElement('a');
              a.href = blob;
              a.target = '_blank';
              setTimeout(function () {
                  click(a);
              });
          }
      }
      else {
          // @ts-ignore: works on windows
          navigator.msSaveOrOpenBlob(bom(blob, opts), name);
      }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
      // Open a popup immediately do go around popup blocker
      // Mostly only available on user interaction and the fileReader is async so...
      popup = popup || open('', '_blank');
      if (popup) {
          popup.document.title = popup.document.body.innerText = 'downloading...';
      }
      if (typeof blob === 'string')
          return download(blob, name, opts);
      const force = blob.type === 'application/octet-stream';
      const isSafari = /constructor/i.test(String(_global.HTMLElement)) || 'safari' in _global;
      const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((isChromeIOS || (force && isSafari) || isMacOSWebView) &&
          typeof FileReader !== 'undefined') {
          // Safari doesn't allow downloading of blob URLs
          const reader = new FileReader();
          reader.onloadend = function () {
              let url = reader.result;
              if (typeof url !== 'string') {
                  popup = null;
                  throw new Error('Wrong reader.result type');
              }
              url = isChromeIOS
                  ? url
                  : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
              if (popup) {
                  popup.location.href = url;
              }
              else {
                  location.assign(url);
              }
              popup = null; // reverse-tabnabbing #460
          };
          reader.readAsDataURL(blob);
      }
      else {
          const url = URL.createObjectURL(blob);
          if (popup)
              popup.location.assign(url);
          else
              location.href = url;
          popup = null; // reverse-tabnabbing #460
          setTimeout(function () {
              URL.revokeObjectURL(url);
          }, 4e4); // 40s
      }
  }

  /**
   * Shows a toast or console.log
   *
   * @param message - message to log
   * @param type - different color of the tooltip
   */
  function toastMessage(message, type) {
      const piniaMessage = '🍍 ' + message;
      if (typeof __VUE_DEVTOOLS_TOAST__ === 'function') {
          // No longer available :(
          __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
      }
      else if (type === 'error') {
          console.error(piniaMessage);
      }
      else if (type === 'warn') {
          console.warn(piniaMessage);
      }
      else {
          console.log(piniaMessage);
      }
  }
  function isPinia(o) {
      return '_a' in o && 'install' in o;
  }

  /**
   * This file contain devtools actions, they are not Pinia actions.
   */
  // ---
  function checkClipboardAccess() {
      if (!('clipboard' in navigator)) {
          toastMessage(`Your browser doesn't support the Clipboard API`, 'error');
          return true;
      }
  }
  function checkNotFocusedError(error) {
      if (error instanceof Error &&
          error.message.toLowerCase().includes('document is not focused')) {
          toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', 'warn');
          return true;
      }
      return false;
  }
  async function actionGlobalCopyState(pinia) {
      if (checkClipboardAccess())
          return;
      try {
          await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
          toastMessage('Global state copied to clipboard.');
      }
      catch (error) {
          if (checkNotFocusedError(error))
              return;
          toastMessage(`Failed to serialize the state. Check the console for more details.`, 'error');
          console.error(error);
      }
  }
  async function actionGlobalPasteState(pinia) {
      if (checkClipboardAccess())
          return;
      try {
          loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
          toastMessage('Global state pasted from clipboard.');
      }
      catch (error) {
          if (checkNotFocusedError(error))
              return;
          toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, 'error');
          console.error(error);
      }
  }
  async function actionGlobalSaveState(pinia) {
      try {
          saveAs(new Blob([JSON.stringify(pinia.state.value)], {
              type: 'text/plain;charset=utf-8',
          }), 'pinia-state.json');
      }
      catch (error) {
          toastMessage(`Failed to export the state as JSON. Check the console for more details.`, 'error');
          console.error(error);
      }
  }
  let fileInput;
  function getFileOpener() {
      if (!fileInput) {
          fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = '.json';
      }
      function openFile() {
          return new Promise((resolve, reject) => {
              fileInput.onchange = async () => {
                  const files = fileInput.files;
                  if (!files)
                      return resolve(null);
                  const file = files.item(0);
                  if (!file)
                      return resolve(null);
                  return resolve({ text: await file.text(), file });
              };
              // @ts-ignore: TODO: changed from 4.3 to 4.4
              fileInput.oncancel = () => resolve(null);
              fileInput.onerror = reject;
              fileInput.click();
          });
      }
      return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
      try {
          const open = getFileOpener();
          const result = await open();
          if (!result)
              return;
          const { text, file } = result;
          loadStoresState(pinia, JSON.parse(text));
          toastMessage(`Global state imported from "${file.name}".`);
      }
      catch (error) {
          toastMessage(`Failed to import the state from JSON. Check the console for more details.`, 'error');
          console.error(error);
      }
  }
  function loadStoresState(pinia, state) {
      for (const key in state) {
          const storeState = pinia.state.value[key];
          // store is already instantiated, patch it
          if (storeState) {
              Object.assign(storeState, state[key]);
          }
          else {
              // store is not instantiated, set the initial state
              pinia.state.value[key] = state[key];
          }
      }
  }

  function formatDisplay(display) {
      return {
          _custom: {
              display,
          },
      };
  }
  const PINIA_ROOT_LABEL = '🍍 Pinia (root)';
  const PINIA_ROOT_ID = '_root';
  function formatStoreForInspectorTree(store) {
      return isPinia(store)
          ? {
              id: PINIA_ROOT_ID,
              label: PINIA_ROOT_LABEL,
          }
          : {
              id: store.$id,
              label: store.$id,
          };
  }
  function formatStoreForInspectorState(store) {
      if (isPinia(store)) {
          const storeNames = Array.from(store._s.keys());
          const storeMap = store._s;
          const state = {
              state: storeNames.map((storeId) => ({
                  editable: true,
                  key: storeId,
                  value: store.state.value[storeId],
              })),
              getters: storeNames
                  .filter((id) => storeMap.get(id)._getters)
                  .map((id) => {
                  const store = storeMap.get(id);
                  return {
                      editable: false,
                      key: id,
                      value: store._getters.reduce((getters, key) => {
                          getters[key] = store[key];
                          return getters;
                      }, {}),
                  };
              }),
          };
          return state;
      }
      const state = {
          state: Object.keys(store.$state).map((key) => ({
              editable: true,
              key,
              value: store.$state[key],
          })),
      };
      // avoid adding empty getters
      if (store._getters && store._getters.length) {
          state.getters = store._getters.map((getterName) => ({
              editable: false,
              key: getterName,
              value: store[getterName],
          }));
      }
      if (store._customProperties.size) {
          state.customProperties = Array.from(store._customProperties).map((key) => ({
              editable: true,
              key,
              value: store[key],
          }));
      }
      return state;
  }
  function formatEventData(events) {
      if (!events)
          return {};
      if (Array.isArray(events)) {
          // TODO: handle add and delete for arrays and objects
          return events.reduce((data, event) => {
              data.keys.push(event.key);
              data.operations.push(event.type);
              data.oldValue[event.key] = event.oldValue;
              data.newValue[event.key] = event.newValue;
              return data;
          }, {
              oldValue: {},
              keys: [],
              operations: [],
              newValue: {},
          });
      }
      else {
          return {
              operation: formatDisplay(events.type),
              key: formatDisplay(events.key),
              oldValue: events.oldValue,
              newValue: events.newValue,
          };
      }
  }
  function formatMutationType(type) {
      switch (type) {
          case exports.MutationType.direct:
              return 'mutation';
          case exports.MutationType.patchFunction:
              return '$patch';
          case exports.MutationType.patchObject:
              return '$patch';
          default:
              return 'unknown';
      }
  }

  // timeline can be paused when directly changing the state
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = 'pinia:mutations';
  const INSPECTOR_ID = 'pinia';
  const { assign: assign$1 } = Object;
  /**
   * Gets the displayed name of a store in devtools
   *
   * @param id - id of the store
   * @returns a formatted string
   */
  const getStoreType = (id) => '🍍 ' + id;
  /**
   * Add the pinia plugin without any store. Allows displaying a Pinia plugin tab
   * as soon as it is added to the application.
   *
   * @param app - Vue application
   * @param pinia - pinia instance
   */
  function registerPiniaDevtools(app, pinia) {
      setupDevToolsPlugin({
          id: 'dev.esm.pinia',
          label: 'Pinia 🍍',
          logo: 'https://pinia.vuejs.org/logo.svg',
          packageName: 'pinia',
          homepage: 'https://pinia.vuejs.org',
          componentStateTypes,
          app,
      }, (api) => {
          if (typeof api.now !== 'function') {
              toastMessage('You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.');
          }
          api.addTimelineLayer({
              id: MUTATIONS_LAYER_ID,
              label: `Pinia 🍍`,
              color: 0xe5df88,
          });
          api.addInspector({
              id: INSPECTOR_ID,
              label: 'Pinia 🍍',
              icon: 'storage',
              treeFilterPlaceholder: 'Search stores',
              actions: [
                  {
                      icon: 'content_copy',
                      action: () => {
                          actionGlobalCopyState(pinia);
                      },
                      tooltip: 'Serialize and copy the state',
                  },
                  {
                      icon: 'content_paste',
                      action: async () => {
                          await actionGlobalPasteState(pinia);
                          api.sendInspectorTree(INSPECTOR_ID);
                          api.sendInspectorState(INSPECTOR_ID);
                      },
                      tooltip: 'Replace the state with the content of your clipboard',
                  },
                  {
                      icon: 'save',
                      action: () => {
                          actionGlobalSaveState(pinia);
                      },
                      tooltip: 'Save the state as a JSON file',
                  },
                  {
                      icon: 'folder_open',
                      action: async () => {
                          await actionGlobalOpenStateFile(pinia);
                          api.sendInspectorTree(INSPECTOR_ID);
                          api.sendInspectorState(INSPECTOR_ID);
                      },
                      tooltip: 'Import the state from a JSON file',
                  },
              ],
              nodeActions: [
                  {
                      icon: 'restore',
                      tooltip: 'Reset the state (with "$reset")',
                      action: (nodeId) => {
                          const store = pinia._s.get(nodeId);
                          if (!store) {
                              toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, 'warn');
                          }
                          else if (typeof store.$reset !== 'function') {
                              toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, 'warn');
                          }
                          else {
                              store.$reset();
                              toastMessage(`Store "${nodeId}" reset.`);
                          }
                      },
                  },
              ],
          });
          api.on.inspectComponent((payload) => {
              const proxy = (payload.componentInstance &&
                  payload.componentInstance.proxy);
              if (proxy && proxy._pStores) {
                  const piniaStores = payload.componentInstance.proxy._pStores;
                  Object.values(piniaStores).forEach((store) => {
                      payload.instanceData.state.push({
                          type: getStoreType(store.$id),
                          key: 'state',
                          editable: true,
                          value: store._isOptionsAPI
                              ? {
                                  _custom: {
                                      value: vue.toRaw(store.$state),
                                      actions: [
                                          {
                                              icon: 'restore',
                                              tooltip: 'Reset the state of this store',
                                              action: () => store.$reset(),
                                          },
                                      ],
                                  },
                              }
                              : // NOTE: workaround to unwrap transferred refs
                                  Object.keys(store.$state).reduce((state, key) => {
                                      state[key] = store.$state[key];
                                      return state;
                                  }, {}),
                      });
                      if (store._getters && store._getters.length) {
                          payload.instanceData.state.push({
                              type: getStoreType(store.$id),
                              key: 'getters',
                              editable: false,
                              value: store._getters.reduce((getters, key) => {
                                  try {
                                      getters[key] = store[key];
                                  }
                                  catch (error) {
                                      // @ts-expect-error: we just want to show it in devtools
                                      getters[key] = error;
                                  }
                                  return getters;
                              }, {}),
                          });
                      }
                  });
              }
          });
          api.on.getInspectorTree((payload) => {
              if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                  let stores = [pinia];
                  stores = stores.concat(Array.from(pinia._s.values()));
                  payload.rootNodes = (payload.filter
                      ? stores.filter((store) => '$id' in store
                          ? store.$id
                              .toLowerCase()
                              .includes(payload.filter.toLowerCase())
                          : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase()))
                      : stores).map(formatStoreForInspectorTree);
              }
          });
          // Expose pinia instance as $pinia to window
          globalThis.$pinia = pinia;
          api.on.getInspectorState((payload) => {
              if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                  const inspectedStore = payload.nodeId === PINIA_ROOT_ID
                      ? pinia
                      : pinia._s.get(payload.nodeId);
                  if (!inspectedStore) {
                      // this could be the selected store restored for a different project
                      // so it's better not to say anything here
                      return;
                  }
                  if (inspectedStore) {
                      // Expose selected store as $store to window
                      if (payload.nodeId !== PINIA_ROOT_ID)
                          globalThis.$store = vue.toRaw(inspectedStore);
                      payload.state = formatStoreForInspectorState(inspectedStore);
                  }
              }
          });
          api.on.editInspectorState((payload) => {
              if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                  const inspectedStore = payload.nodeId === PINIA_ROOT_ID
                      ? pinia
                      : pinia._s.get(payload.nodeId);
                  if (!inspectedStore) {
                      return toastMessage(`store "${payload.nodeId}" not found`, 'error');
                  }
                  const { path } = payload;
                  if (!isPinia(inspectedStore)) {
                      // access only the state
                      if (path.length !== 1 ||
                          !inspectedStore._customProperties.has(path[0]) ||
                          path[0] in inspectedStore.$state) {
                          path.unshift('$state');
                      }
                  }
                  else {
                      // Root access, we can omit the `.value` because the devtools API does it for us
                      path.unshift('state');
                  }
                  isTimelineActive = false;
                  payload.set(inspectedStore, path, payload.state.value);
                  isTimelineActive = true;
              }
          });
          api.on.editComponentState((payload) => {
              if (payload.type.startsWith('🍍')) {
                  const storeId = payload.type.replace(/^🍍\s*/, '');
                  const store = pinia._s.get(storeId);
                  if (!store) {
                      return toastMessage(`store "${storeId}" not found`, 'error');
                  }
                  const { path } = payload;
                  if (path[0] !== 'state') {
                      return toastMessage(`Invalid path for store "${storeId}":\n${path}\nOnly state can be modified.`);
                  }
                  // rewrite the first entry to be able to directly set the state as
                  // well as any other path
                  path[0] = '$state';
                  isTimelineActive = false;
                  payload.set(store, path, payload.state.value);
                  isTimelineActive = true;
              }
          });
      });
  }
  function addStoreToDevtools(app, store) {
      if (!componentStateTypes.includes(getStoreType(store.$id))) {
          componentStateTypes.push(getStoreType(store.$id));
      }
      setupDevToolsPlugin({
          id: 'dev.esm.pinia',
          label: 'Pinia 🍍',
          logo: 'https://pinia.vuejs.org/logo.svg',
          packageName: 'pinia',
          homepage: 'https://pinia.vuejs.org',
          componentStateTypes,
          app,
          settings: {
              logStoreChanges: {
                  label: 'Notify about new/deleted stores',
                  type: 'boolean',
                  defaultValue: true,
              },
              // useEmojis: {
              //   label: 'Use emojis in messages ⚡️',
              //   type: 'boolean',
              //   defaultValue: true,
              // },
          },
      }, (api) => {
          // gracefully handle errors
          const now = typeof api.now === 'function' ? api.now.bind(api) : Date.now;
          store.$onAction(({ after, onError, name, args }) => {
              const groupId = runningActionId++;
              api.addTimelineEvent({
                  layerId: MUTATIONS_LAYER_ID,
                  event: {
                      time: now(),
                      title: '🛫 ' + name,
                      subtitle: 'start',
                      data: {
                          store: formatDisplay(store.$id),
                          action: formatDisplay(name),
                          args,
                      },
                      groupId,
                  },
              });
              after((result) => {
                  activeAction = undefined;
                  api.addTimelineEvent({
                      layerId: MUTATIONS_LAYER_ID,
                      event: {
                          time: now(),
                          title: '🛬 ' + name,
                          subtitle: 'end',
                          data: {
                              store: formatDisplay(store.$id),
                              action: formatDisplay(name),
                              args,
                              result,
                          },
                          groupId,
                      },
                  });
              });
              onError((error) => {
                  activeAction = undefined;
                  api.addTimelineEvent({
                      layerId: MUTATIONS_LAYER_ID,
                      event: {
                          time: now(),
                          logType: 'error',
                          title: '💥 ' + name,
                          subtitle: 'end',
                          data: {
                              store: formatDisplay(store.$id),
                              action: formatDisplay(name),
                              args,
                              error,
                          },
                          groupId,
                      },
                  });
              });
          }, true);
          store._customProperties.forEach((name) => {
              vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
                  api.notifyComponentUpdate();
                  api.sendInspectorState(INSPECTOR_ID);
                  if (isTimelineActive) {
                      api.addTimelineEvent({
                          layerId: MUTATIONS_LAYER_ID,
                          event: {
                              time: now(),
                              title: 'Change',
                              subtitle: name,
                              data: {
                                  newValue,
                                  oldValue,
                              },
                              groupId: activeAction,
                          },
                      });
                  }
              }, { deep: true });
          });
          store.$subscribe(({ events, type }, state) => {
              api.notifyComponentUpdate();
              api.sendInspectorState(INSPECTOR_ID);
              if (!isTimelineActive)
                  return;
              // rootStore.state[store.id] = state
              const eventData = {
                  time: now(),
                  title: formatMutationType(type),
                  data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
                  groupId: activeAction,
              };
              if (type === exports.MutationType.patchFunction) {
                  eventData.subtitle = '⤵️';
              }
              else if (type === exports.MutationType.patchObject) {
                  eventData.subtitle = '🧩';
              }
              else if (events && !Array.isArray(events)) {
                  eventData.subtitle = events.type;
              }
              if (events) {
                  eventData.data['rawEvent(s)'] = {
                      _custom: {
                          display: 'DebuggerEvent',
                          type: 'object',
                          tooltip: 'raw DebuggerEvent[]',
                          value: events,
                      },
                  };
              }
              api.addTimelineEvent({
                  layerId: MUTATIONS_LAYER_ID,
                  event: eventData,
              });
          }, { detached: true, flush: 'sync' });
          const hotUpdate = store._hotUpdate;
          store._hotUpdate = vue.markRaw((newStore) => {
              hotUpdate(newStore);
              api.addTimelineEvent({
                  layerId: MUTATIONS_LAYER_ID,
                  event: {
                      time: now(),
                      title: '🔥 ' + store.$id,
                      subtitle: 'HMR update',
                      data: {
                          store: formatDisplay(store.$id),
                          info: formatDisplay(`HMR update`),
                      },
                  },
              });
              // update the devtools too
              api.notifyComponentUpdate();
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
          });
          const { $dispose } = store;
          store.$dispose = () => {
              $dispose();
              api.notifyComponentUpdate();
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
              api.getSettings().logStoreChanges &&
                  toastMessage(`Disposed "${store.$id}" store 🗑`);
          };
          // trigger an update so it can display new registered stores
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.getSettings().logStoreChanges &&
              toastMessage(`"${store.$id}" store installed 🆕`);
      });
  }
  let runningActionId = 0;
  let activeAction;
  /**
   * Patches a store to enable action grouping in devtools by wrapping the store with a Proxy that is passed as the
   * context of all actions, allowing us to set `runningAction` on each access and effectively associating any state
   * mutation to the action.
   *
   * @param store - store to patch
   * @param actionNames - list of actionst to patch
   */
  function patchActionForGrouping(store, actionNames, wrapWithProxy) {
      // original actions of the store as they are given by pinia. We are going to override them
      const actions = actionNames.reduce((storeActions, actionName) => {
          // use toRaw to avoid tracking #541
          storeActions[actionName] = vue.toRaw(store)[actionName];
          return storeActions;
      }, {});
      for (const actionName in actions) {
          store[actionName] = function () {
              // the running action id is incremented in a before action hook
              const _actionId = runningActionId;
              const trackedStore = wrapWithProxy
                  ? new Proxy(store, {
                      get(...args) {
                          activeAction = _actionId;
                          return Reflect.get(...args);
                      },
                      set(...args) {
                          activeAction = _actionId;
                          return Reflect.set(...args);
                      },
                  })
                  : store;
              // For Setup Stores we need https://github.com/tc39/proposal-async-context
              activeAction = _actionId;
              const retValue = actions[actionName].apply(trackedStore, arguments);
              // this is safer as async actions in Setup Stores would associate mutations done outside of the action
              activeAction = undefined;
              return retValue;
          };
      }
  }
  /**
   * pinia.use(devtoolsPlugin)
   */
  function devtoolsPlugin({ app, store, options }) {
      // HMR module
      if (store.$id.startsWith('__hot:')) {
          return;
      }
      // detect option api vs setup api
      store._isOptionsAPI = !!options.state;
      // Do not overwrite actions mocked by @pinia/testing (#2298)
      if (!store._p._testing) {
          patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
          // Upgrade the HMR to also update the new actions
          const originalHotUpdate = store._hotUpdate;
          vue.toRaw(store)._hotUpdate = function (newStore) {
              originalHotUpdate.apply(this, arguments);
              patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
          };
      }
      addStoreToDevtools(app, 
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store);
  }

  /**
   * Creates a Pinia instance to be used by the application
   */
  function createPinia() {
      const scope = vue.effectScope(true);
      // NOTE: here we could check the window object for a state and directly set it
      // if there is anything like it with Vue 3 SSR
      const state = scope.run(() => vue.ref({}));
      let _p = [];
      // plugins added before calling app.use(pinia)
      let toBeInstalled = [];
      const pinia = vue.markRaw({
          install(app) {
              // this allows calling useStore() outside of a component setup after
              // installing pinia's plugin
              setActivePinia(pinia);
              pinia._a = app;
              app.provide(piniaSymbol, pinia);
              app.config.globalProperties.$pinia = pinia;
              /* istanbul ignore else */
              if (IS_CLIENT) {
                  registerPiniaDevtools(app, pinia);
              }
              toBeInstalled.forEach((plugin) => _p.push(plugin));
              toBeInstalled = [];
          },
          use(plugin) {
              if (!this._a) {
                  toBeInstalled.push(plugin);
              }
              else {
                  _p.push(plugin);
              }
              return this;
          },
          _p,
          // it's actually undefined here
          // @ts-expect-error
          _a: null,
          _e: scope,
          _s: new Map(),
          state,
      });
      // pinia devtools rely on dev only features so they cannot be forced unless
      // the dev build of Vue is used. Avoid old browsers like IE11.
      if (IS_CLIENT && typeof Proxy !== 'undefined') {
          pinia.use(devtoolsPlugin);
      }
      return pinia;
  }
  /**
   * Dispose a Pinia instance by stopping its effectScope and removing the state, plugins and stores. This is mostly
   * useful in tests, with both a testing pinia or a regular pinia and in applications that use multiple pinia instances.
   * Once disposed, the pinia instance cannot be used anymore.
   *
   * @param pinia - pinia instance
   */
  function disposePinia(pinia) {
      pinia._e.stop();
      pinia._s.clear();
      pinia._p.splice(0);
      pinia.state.value = {};
      // @ts-expect-error: non valid
      pinia._a = null;
  }

  /**
   * Checks if a function is a `StoreDefinition`.
   *
   * @param fn - object to test
   * @returns true if `fn` is a StoreDefinition
   */
  const isUseStore = (fn) => {
      return typeof fn === 'function' && typeof fn.$id === 'string';
  };
  /**
   * Mutates in place `newState` with `oldState` to _hot update_ it. It will
   * remove any key not existing in `newState` and recursively merge plain
   * objects.
   *
   * @param newState - new state object to be patched
   * @param oldState - old state that should be used to patch newState
   * @returns - newState
   */
  function patchObject(newState, oldState) {
      // no need to go through symbols because they cannot be serialized anyway
      for (const key in oldState) {
          const subPatch = oldState[key];
          // skip the whole sub tree
          if (!(key in newState)) {
              continue;
          }
          const targetValue = newState[key];
          if (isPlainObject(targetValue) &&
              isPlainObject(subPatch) &&
              !vue.isRef(subPatch) &&
              !vue.isReactive(subPatch)) {
              newState[key] = patchObject(targetValue, subPatch);
          }
          else {
              // objects are either a bit more complex (e.g. refs) or primitives, so we
              // just set the whole thing
              newState[key] = subPatch;
          }
      }
      return newState;
  }
  /**
   * Creates an _accept_ function to pass to `import.meta.hot` in Vite applications.
   *
   * @example
   * ```js
   * const useUser = defineStore(...)
   * if (import.meta.hot) {
   *   import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
   * }
   * ```
   *
   * @param initialUseStore - return of the defineStore to hot update
   * @param hot - `import.meta.hot`
   */
  function acceptHMRUpdate(initialUseStore, hot) {
      return (newModule) => {
          const pinia = hot.data.pinia || initialUseStore._pinia;
          if (!pinia) {
              // this store is still not used
              return;
          }
          // preserve the pinia instance across loads
          hot.data.pinia = pinia;
          // console.log('got data', newStore)
          for (const exportName in newModule) {
              const useStore = newModule[exportName];
              // console.log('checking for', exportName)
              if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
                  // console.log('Accepting update for', useStore.$id)
                  const id = useStore.$id;
                  if (id !== initialUseStore.$id) {
                      console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
                      // return import.meta.hot.invalidate()
                      return hot.invalidate();
                  }
                  const existingStore = pinia._s.get(id);
                  if (!existingStore) {
                      console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
                      return;
                  }
                  useStore(pinia, existingStore);
              }
          }
      };
  }

  const noop = () => { };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
      subscriptions.push(callback);
      const removeSubscription = () => {
          const idx = subscriptions.indexOf(callback);
          if (idx > -1) {
              subscriptions.splice(idx, 1);
              onCleanup();
          }
      };
      if (!detached && vue.getCurrentScope()) {
          vue.onScopeDispose(removeSubscription);
      }
      return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
      subscriptions.slice().forEach((callback) => {
          callback(...args);
      });
  }

  const fallbackRunWithContext = (fn) => fn();
  /**
   * Marks a function as an action for `$onAction`
   * @internal
   */
  const ACTION_MARKER = Symbol();
  /**
   * Action name symbol. Allows to add a name to an action after defining it
   * @internal
   */
  const ACTION_NAME = Symbol();
  function mergeReactiveObjects(target, patchToApply) {
      // Handle Map instances
      if (target instanceof Map && patchToApply instanceof Map) {
          patchToApply.forEach((value, key) => target.set(key, value));
      }
      else if (target instanceof Set && patchToApply instanceof Set) {
          // Handle Set instances
          patchToApply.forEach(target.add, target);
      }
      // no need to go through symbols because they cannot be serialized anyway
      for (const key in patchToApply) {
          if (!patchToApply.hasOwnProperty(key))
              continue;
          const subPatch = patchToApply[key];
          const targetValue = target[key];
          if (isPlainObject(targetValue) &&
              isPlainObject(subPatch) &&
              target.hasOwnProperty(key) &&
              !vue.isRef(subPatch) &&
              !vue.isReactive(subPatch)) {
              // NOTE: here I wanted to warn about inconsistent types but it's not possible because in setup stores one might
              // start the value of a property as a certain type e.g. a Map, and then for some reason, during SSR, change that
              // to `undefined`. When trying to hydrate, we want to override the Map with `undefined`.
              target[key] = mergeReactiveObjects(targetValue, subPatch);
          }
          else {
              // @ts-expect-error: subPatch is a valid value
              target[key] = subPatch;
          }
      }
      return target;
  }
  const skipHydrateSymbol = Symbol('pinia:skipHydration')
      ;
  /**
   * Tells Pinia to skip the hydration process of a given object. This is useful in setup stores (only) when you return a
   * stateful object in the store but it isn't really state. e.g. returning a router instance in a setup store.
   *
   * @param obj - target object
   * @returns obj
   */
  function skipHydrate(obj) {
      return Object.defineProperty(obj, skipHydrateSymbol, {});
  }
  /**
   * Returns whether a value should be hydrated
   *
   * @param obj - target variable
   * @returns true if `obj` should be hydrated
   */
  function shouldHydrate(obj) {
      return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
      return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
      const { state, actions, getters } = options;
      const initialState = pinia.state.value[id];
      let store;
      function setup() {
          if (!initialState && (!hot)) {
              /* istanbul ignore if */
              pinia.state.value[id] = state ? state() : {};
          }
          // avoid creating a state in pinia.state.value
          const localState = hot
              ? // use ref() to unwrap refs inside state TODO: check if this is still necessary
                  vue.toRefs(vue.ref(state ? state() : {}).value)
              : vue.toRefs(pinia.state.value[id]);
          return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
              if (name in localState) {
                  console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
              }
              computedGetters[name] = vue.markRaw(vue.computed(() => {
                  setActivePinia(pinia);
                  // it was created just before
                  const store = pinia._s.get(id);
                  // allow cross using stores
                  // @ts-expect-error
                  // return getters![name].call(context, context)
                  // TODO: avoid reading the getter while assigning with a global variable
                  return getters[name].call(store, store);
              }));
              return computedGetters;
          }, {}));
      }
      store = createSetupStore(id, setup, options, pinia, hot, true);
      return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
      let scope;
      const optionsForPlugin = assign({ actions: {} }, options);
      /* istanbul ignore if */
      if (!pinia._e.active) {
          throw new Error('Pinia destroyed');
      }
      // watcher options for $subscribe
      const $subscribeOptions = { deep: true };
      /* istanbul ignore else */
      {
          $subscribeOptions.onTrigger = (event) => {
              /* istanbul ignore else */
              if (isListening) {
                  debuggerEvents = event;
                  // avoid triggering this while the store is being built and the state is being set in pinia
              }
              else if (isListening == false && !store._hotUpdating) {
                  // let patch send all the events together later
                  /* istanbul ignore else */
                  if (Array.isArray(debuggerEvents)) {
                      debuggerEvents.push(event);
                  }
                  else {
                      console.error('🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.');
                  }
              }
          };
      }
      // internal state
      let isListening; // set to true at the end
      let isSyncListening; // set to true at the end
      let subscriptions = [];
      let actionSubscriptions = [];
      let debuggerEvents;
      const initialState = pinia.state.value[$id];
      // avoid setting the state for option stores if it is set
      // by the setup
      if (!isOptionsStore && !initialState && (!hot)) {
          /* istanbul ignore if */
          pinia.state.value[$id] = {};
      }
      const hotState = vue.ref({});
      // avoid triggering too many listeners
      // https://github.com/vuejs/pinia/issues/1129
      let activeListener;
      function $patch(partialStateOrMutator) {
          let subscriptionMutation;
          isListening = isSyncListening = false;
          // reset the debugger events since patches are sync
          /* istanbul ignore else */
          {
              debuggerEvents = [];
          }
          if (typeof partialStateOrMutator === 'function') {
              partialStateOrMutator(pinia.state.value[$id]);
              subscriptionMutation = {
                  type: exports.MutationType.patchFunction,
                  storeId: $id,
                  events: debuggerEvents,
              };
          }
          else {
              mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
              subscriptionMutation = {
                  type: exports.MutationType.patchObject,
                  payload: partialStateOrMutator,
                  storeId: $id,
                  events: debuggerEvents,
              };
          }
          const myListenerId = (activeListener = Symbol());
          vue.nextTick().then(() => {
              if (activeListener === myListenerId) {
                  isListening = true;
              }
          });
          isSyncListening = true;
          // because we paused the watcher, we need to manually call the subscriptions
          triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
      }
      const $reset = isOptionsStore
          ? function $reset() {
              const { state } = options;
              const newState = state ? state() : {};
              // we use a patch to group all changes into one single subscription
              this.$patch(($state) => {
                  // @ts-expect-error: FIXME: shouldn't error?
                  assign($state, newState);
              });
          }
          : /* istanbul ignore next */
              () => {
                      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
                  }
                  ;
      function $dispose() {
          scope.stop();
          subscriptions = [];
          actionSubscriptions = [];
          pinia._s.delete($id);
      }
      /**
       * Helper that wraps function so it can be tracked with $onAction
       * @param fn - action to wrap
       * @param name - name of the action
       */
      const action = (fn, name = '') => {
          if (ACTION_MARKER in fn) {
              fn[ACTION_NAME] = name;
              return fn;
          }
          const wrappedAction = function () {
              setActivePinia(pinia);
              const args = Array.from(arguments);
              const afterCallbackList = [];
              const onErrorCallbackList = [];
              function after(callback) {
                  afterCallbackList.push(callback);
              }
              function onError(callback) {
                  onErrorCallbackList.push(callback);
              }
              // @ts-expect-error
              triggerSubscriptions(actionSubscriptions, {
                  args,
                  name: wrappedAction[ACTION_NAME],
                  store,
                  after,
                  onError,
              });
              let ret;
              try {
                  ret = fn.apply(this && this.$id === $id ? this : store, args);
                  // handle sync errors
              }
              catch (error) {
                  triggerSubscriptions(onErrorCallbackList, error);
                  throw error;
              }
              if (ret instanceof Promise) {
                  return ret
                      .then((value) => {
                      triggerSubscriptions(afterCallbackList, value);
                      return value;
                  })
                      .catch((error) => {
                      triggerSubscriptions(onErrorCallbackList, error);
                      return Promise.reject(error);
                  });
              }
              // trigger after callbacks
              triggerSubscriptions(afterCallbackList, ret);
              return ret;
          };
          wrappedAction[ACTION_MARKER] = true;
          wrappedAction[ACTION_NAME] = name; // will be set later
          // @ts-expect-error: we are intentionally limiting the returned type to just Fn
          // because all the added properties are internals that are exposed through `$onAction()` only
          return wrappedAction;
      };
      const _hmrPayload = /*#__PURE__*/ vue.markRaw({
          actions: {},
          getters: {},
          state: [],
          hotState,
      });
      const partialStore = {
          _p: pinia,
          // _s: scope,
          $id,
          $onAction: addSubscription.bind(null, actionSubscriptions),
          $patch,
          $reset,
          $subscribe(callback, options = {}) {
              const removeSubscription = addSubscription(subscriptions, callback, options.detached, () => stopWatcher());
              const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
                  if (options.flush === 'sync' ? isSyncListening : isListening) {
                      callback({
                          storeId: $id,
                          type: exports.MutationType.direct,
                          events: debuggerEvents,
                      }, state);
                  }
              }, assign({}, $subscribeOptions, options)));
              return removeSubscription;
          },
          $dispose,
      };
      const store = vue.reactive(assign({
              _hmrPayload,
              _customProperties: vue.markRaw(new Set()), // devtools custom properties
          }, partialStore
          // must be added later
          // setupStore
          )
          );
      // store the partial store now so the setup of stores can instantiate each other before they are finished without
      // creating infinite loops.
      pinia._s.set($id, store);
      const runWithContext = (pinia._a && pinia._a.runWithContext) || fallbackRunWithContext;
      // TODO: idea create skipSerialize that marks properties as non serializable and they are skipped
      const setupStore = runWithContext(() => pinia._e.run(() => (scope = vue.effectScope()).run(() => setup({ action }))));
      // overwrite existing actions to support $onAction
      for (const key in setupStore) {
          const prop = setupStore[key];
          if ((vue.isRef(prop) && !isComputed(prop)) || vue.isReactive(prop)) {
              // mark it as a piece of state to be serialized
              if (hot) {
                  hotState.value[key] = vue.toRef(setupStore, key);
                  // createOptionStore directly sets the state in pinia.state.value so we
                  // can just skip that
              }
              else if (!isOptionsStore) {
                  // in setup stores we must hydrate the state and sync pinia state tree with the refs the user just created
                  if (initialState && shouldHydrate(prop)) {
                      if (vue.isRef(prop)) {
                          prop.value = initialState[key];
                      }
                      else {
                          // probably a reactive object, lets recursively assign
                          // @ts-expect-error: prop is unknown
                          mergeReactiveObjects(prop, initialState[key]);
                      }
                  }
                  // transfer the ref to the pinia state to keep everything in sync
                  pinia.state.value[$id][key] = prop;
              }
              /* istanbul ignore else */
              {
                  _hmrPayload.state.push(key);
              }
              // action
          }
          else if (typeof prop === 'function') {
              const actionValue = hot ? prop : action(prop, key);
              // this a hot module replacement store because the hotUpdate method needs
              // to do it with the right context
              // @ts-expect-error
              setupStore[key] = actionValue;
              /* istanbul ignore else */
              {
                  _hmrPayload.actions[key] = prop;
              }
              // list actions so they can be used in plugins
              // @ts-expect-error
              optionsForPlugin.actions[key] = prop;
          }
          else {
              // add getters for devtools
              if (isComputed(prop)) {
                  _hmrPayload.getters[key] = isOptionsStore
                      ? // @ts-expect-error
                          options.getters[key]
                      : prop;
                  if (IS_CLIENT) {
                      const getters = setupStore._getters ||
                          // @ts-expect-error: same
                          (setupStore._getters = vue.markRaw([]));
                      getters.push(key);
                  }
              }
          }
      }
      // add the state, getters, and action properties
      /* istanbul ignore if */
      assign(store, setupStore);
      // allows retrieving reactive objects with `storeToRefs()`. Must be called after assigning to the reactive object.
      // Make `storeToRefs()` work with `reactive()` #799
      assign(vue.toRaw(store), setupStore);
      // use this instead of a computed with setter to be able to create it anywhere
      // without linking the computed lifespan to wherever the store is first
      // created.
      Object.defineProperty(store, '$state', {
          get: () => (hot ? hotState.value : pinia.state.value[$id]),
          set: (state) => {
              /* istanbul ignore if */
              if (hot) {
                  throw new Error('cannot set hotState');
              }
              $patch(($state) => {
                  // @ts-expect-error: FIXME: shouldn't error?
                  assign($state, state);
              });
          },
      });
      // add the hotUpdate before plugins to allow them to override it
      /* istanbul ignore else */
      {
          store._hotUpdate = vue.markRaw((newStore) => {
              store._hotUpdating = true;
              newStore._hmrPayload.state.forEach((stateKey) => {
                  if (stateKey in store.$state) {
                      const newStateTarget = newStore.$state[stateKey];
                      const oldStateSource = store.$state[stateKey];
                      if (typeof newStateTarget === 'object' &&
                          isPlainObject(newStateTarget) &&
                          isPlainObject(oldStateSource)) {
                          patchObject(newStateTarget, oldStateSource);
                      }
                      else {
                          // transfer the ref
                          newStore.$state[stateKey] = oldStateSource;
                      }
                  }
                  // patch direct access properties to allow store.stateProperty to work as
                  // store.$state.stateProperty
                  // @ts-expect-error: any type
                  store[stateKey] = vue.toRef(newStore.$state, stateKey);
              });
              // remove deleted state properties
              Object.keys(store.$state).forEach((stateKey) => {
                  if (!(stateKey in newStore.$state)) {
                      // @ts-expect-error: noop if doesn't exist
                      delete store[stateKey];
                  }
              });
              // avoid devtools logging this as a mutation
              isListening = false;
              isSyncListening = false;
              pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, 'hotState');
              isSyncListening = true;
              vue.nextTick().then(() => {
                  isListening = true;
              });
              for (const actionName in newStore._hmrPayload.actions) {
                  const actionFn = newStore[actionName];
                  // @ts-expect-error: actionName is a string
                  store[actionName] =
                      //
                      action(actionFn, actionName);
              }
              // TODO: does this work in both setup and option store?
              for (const getterName in newStore._hmrPayload.getters) {
                  const getter = newStore._hmrPayload.getters[getterName];
                  const getterValue = isOptionsStore
                      ? // special handling of options api
                          vue.computed(() => {
                              setActivePinia(pinia);
                              return getter.call(store, store);
                          })
                      : getter;
                  // @ts-expect-error: getterName is a string
                  store[getterName] =
                      //
                      getterValue;
              }
              // remove deleted getters
              Object.keys(store._hmrPayload.getters).forEach((key) => {
                  if (!(key in newStore._hmrPayload.getters)) {
                      // @ts-expect-error: noop if doesn't exist
                      delete store[key];
                  }
              });
              // remove old actions
              Object.keys(store._hmrPayload.actions).forEach((key) => {
                  if (!(key in newStore._hmrPayload.actions)) {
                      // @ts-expect-error: noop if doesn't exist
                      delete store[key];
                  }
              });
              // update the values used in devtools and to allow deleting new properties later on
              store._hmrPayload = newStore._hmrPayload;
              store._getters = newStore._getters;
              store._hotUpdating = false;
          });
      }
      if (IS_CLIENT) {
          const nonEnumerable = {
              writable: true,
              configurable: true,
              // avoid warning on devtools trying to display this property
              enumerable: false,
          };
          ['_p', '_hmrPayload', '_getters', '_customProperties'].forEach((p) => {
              Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
          });
      }
      // apply all plugins
      pinia._p.forEach((extender) => {
          /* istanbul ignore else */
          if (IS_CLIENT) {
              const extensions = scope.run(() => extender({
                  store: store,
                  app: pinia._a,
                  pinia,
                  options: optionsForPlugin,
              }));
              Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
              assign(store, extensions);
          }
          else {
              assign(store, scope.run(() => extender({
                  store: store,
                  app: pinia._a,
                  pinia,
                  options: optionsForPlugin,
              })));
          }
      });
      if (store.$state &&
          typeof store.$state === 'object' &&
          typeof store.$state.constructor === 'function' &&
          !store.$state.constructor.toString().includes('[native code]')) {
          console.warn(`[🍍]: The "state" must be a plain object. It cannot be\n` +
              `\tstate: () => new MyClass()\n` +
              `Found in store "${store.$id}".`);
      }
      // only apply hydrate to option stores with an initial state in pinia
      if (initialState &&
          isOptionsStore &&
          options.hydrate) {
          options.hydrate(store.$state, initialState);
      }
      isListening = true;
      isSyncListening = true;
      return store;
  }
  // allows unused stores to be tree shaken
  /*! #__NO_SIDE_EFFECTS__ */
  function defineStore(
  // TODO: add proper types from above
  id, setup, setupOptions) {
      let options;
      const isSetupStore = typeof setup === 'function';
      // the option store setup will contain the actual options in this case
      options = isSetupStore ? setupOptions : setup;
      function useStore(pinia, hot) {
          const hasContext = vue.hasInjectionContext();
          pinia =
              // in test mode, ignore the argument provided as we can always retrieve a
              // pinia instance with getActivePinia()
              (pinia) ||
                  (hasContext ? vue.inject(piniaSymbol, null) : null);
          if (pinia)
              setActivePinia(pinia);
          if (!activePinia) {
              throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?\n` +
                  `See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.\n` +
                  `This will fail in production.`);
          }
          pinia = activePinia;
          if (!pinia._s.has(id)) {
              // creating the store registers it in `pinia._s`
              if (isSetupStore) {
                  createSetupStore(id, setup, options, pinia);
              }
              else {
                  createOptionsStore(id, options, pinia);
              }
              /* istanbul ignore else */
              {
                  // @ts-expect-error: not the right inferred type
                  useStore._pinia = pinia;
              }
          }
          const store = pinia._s.get(id);
          if (hot) {
              const hotId = '__hot:' + id;
              const newStore = isSetupStore
                  ? createSetupStore(hotId, setup, options, pinia, true)
                  : createOptionsStore(hotId, assign({}, options), pinia, true);
              hot._hotUpdate(newStore);
              // cleanup the state properties and the store from the cache
              delete pinia.state.value[hotId];
              pinia._s.delete(hotId);
          }
          if (IS_CLIENT) {
              const currentInstance = vue.getCurrentInstance();
              // save stores in instances to access them devtools
              if (currentInstance &&
                  currentInstance.proxy &&
                  // avoid adding stores that are just built for hot module replacement
                  !hot) {
                  const vm = currentInstance.proxy;
                  const cache = '_pStores' in vm ? vm._pStores : (vm._pStores = {});
                  cache[id] = store;
              }
          }
          // StoreGeneric cannot be casted towards Store
          return store;
      }
      useStore.$id = id;
      return useStore;
  }

  let mapStoreSuffix = 'Store';
  /**
   * Changes the suffix added by `mapStores()`. Can be set to an empty string.
   * Defaults to `"Store"`. Make sure to extend the MapStoresCustomization
   * interface if you are using TypeScript.
   *
   * @param suffix - new suffix
   */
  function setMapStoreSuffix(suffix // could be 'Store' but that would be annoying for JS
  ) {
      mapStoreSuffix = suffix;
  }
  /**
   * Allows using stores without the composition API (`setup()`) by generating an
   * object to be spread in the `computed` field of a component. It accepts a list
   * of store definitions.
   *
   * @example
   * ```js
   * export default {
   *   computed: {
   *     // other computed properties
   *     ...mapStores(useUserStore, useCartStore)
   *   },
   *
   *   created() {
   *     this.userStore // store with id "user"
   *     this.cartStore // store with id "cart"
   *   }
   * }
   * ```
   *
   * @param stores - list of stores to map to an object
   */
  function mapStores(...stores) {
      if (Array.isArray(stores[0])) {
          console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:\n` +
              `Replace\n` +
              `\tmapStores([useAuthStore, useCartStore])\n` +
              `with\n` +
              `\tmapStores(useAuthStore, useCartStore)\n` +
              `This will fail in production if not fixed.`);
          stores = stores[0];
      }
      return stores.reduce((reduced, useStore) => {
          // @ts-expect-error: $id is added by defineStore
          reduced[useStore.$id + mapStoreSuffix] = function () {
              return useStore(this.$pinia);
          };
          return reduced;
      }, {});
  }
  /**
   * Allows using state and getters from one store without using the composition
   * API (`setup()`) by generating an object to be spread in the `computed` field
   * of a component.
   *
   * @param useStore - store to map from
   * @param keysOrMapper - array or object
   */
  function mapState(useStore, keysOrMapper) {
      return Array.isArray(keysOrMapper)
          ? keysOrMapper.reduce((reduced, key) => {
              reduced[key] = function () {
                  // @ts-expect-error: FIXME: should work?
                  return useStore(this.$pinia)[key];
              };
              return reduced;
          }, {})
          : Object.keys(keysOrMapper).reduce((reduced, key) => {
              // @ts-expect-error
              reduced[key] = function () {
                  const store = useStore(this.$pinia);
                  const storeKey = keysOrMapper[key];
                  // for some reason TS is unable to infer the type of storeKey to be a
                  // function
                  return typeof storeKey === 'function'
                      ? storeKey.call(this, store)
                      : // @ts-expect-error: FIXME: should work?
                          store[storeKey];
              };
              return reduced;
          }, {});
  }
  /**
   * Alias for `mapState()`. You should use `mapState()` instead.
   * @deprecated use `mapState()` instead.
   */
  const mapGetters = mapState;
  /**
   * Allows directly using actions from your store without using the composition
   * API (`setup()`) by generating an object to be spread in the `methods` field
   * of a component.
   *
   * @param useStore - store to map from
   * @param keysOrMapper - array or object
   */
  function mapActions(useStore, keysOrMapper) {
      return Array.isArray(keysOrMapper)
          ? keysOrMapper.reduce((reduced, key) => {
              // @ts-expect-error
              reduced[key] = function (...args) {
                  // @ts-expect-error: FIXME: should work?
                  return useStore(this.$pinia)[key](...args);
              };
              return reduced;
          }, {})
          : Object.keys(keysOrMapper).reduce((reduced, key) => {
              // @ts-expect-error
              reduced[key] = function (...args) {
                  // @ts-expect-error: FIXME: should work?
                  return useStore(this.$pinia)[keysOrMapper[key]](...args);
              };
              return reduced;
          }, {});
  }
  /**
   * Allows using state and getters from one store without using the composition
   * API (`setup()`) by generating an object to be spread in the `computed` field
   * of a component.
   *
   * @param useStore - store to map from
   * @param keysOrMapper - array or object
   */
  function mapWritableState(useStore, keysOrMapper) {
      return Array.isArray(keysOrMapper)
          ? keysOrMapper.reduce((reduced, key) => {
              reduced[key] = {
                  get() {
                      return useStore(this.$pinia)[key];
                  },
                  set(value) {
                      return (useStore(this.$pinia)[key] = value);
                  },
              };
              return reduced;
          }, {})
          : Object.keys(keysOrMapper).reduce((reduced, key) => {
              reduced[key] = {
                  get() {
                      return useStore(this.$pinia)[keysOrMapper[key]];
                  },
                  set(value) {
                      return (useStore(this.$pinia)[keysOrMapper[key]] = value);
                  },
              };
              return reduced;
          }, {});
  }

  /**
   * Creates an object of references with all the state, getters, and plugin-added
   * state properties of the store. Similar to `toRefs()` but specifically
   * designed for Pinia stores so methods and non reactive properties are
   * completely ignored.
   *
   * @param store - store to extract the refs from
   */
  function storeToRefs(store) {
      const rawStore = vue.toRaw(store);
      const refs = {};
      for (const key in rawStore) {
          const value = rawStore[key];
          // There is no native method to check for a computed
          // https://github.com/vuejs/core/pull/4165
          if (value.effect) {
              // @ts-expect-error: too hard to type correctly
              refs[key] =
                  // ...
                  vue.computed({
                      get: () => store[key],
                      set(value) {
                          store[key] = value;
                      },
                  });
          }
          else if (vue.isRef(value) || vue.isReactive(value)) {
              // @ts-expect-error: the key is state or getter
              refs[key] =
                  // ---
                  vue.toRef(store, key);
          }
      }
      return refs;
  }

  /**
   * Vue 2 Plugin that must be installed for pinia to work. Note **you don't need
   * this plugin if you are using Nuxt.js**. Use the `buildModule` instead:
   * https://pinia.vuejs.org/ssr/nuxt.html.
   *
   * @example
   * ```js
   * import Vue from 'vue'
   * import { PiniaVuePlugin, createPinia } from 'pinia'
   *
   * Vue.use(PiniaVuePlugin)
   * const pinia = createPinia()
   *
   * new Vue({
   *   el: '#app',
   *   // ...
   *   pinia,
   * })
   * ```
   *
   * @param _Vue - `Vue` imported from 'vue'.
   */
  const PiniaVuePlugin = function (_Vue) {
      // Equivalent of
      // app.config.globalProperties.$pinia = pinia
      _Vue.mixin({
          beforeCreate() {
              const options = this.$options;
              if (options.pinia) {
                  const pinia = options.pinia;
                  // HACK: taken from provide(): https://github.com/vuejs/composition-api/blob/main/src/apis/inject.ts#L31
                  /* istanbul ignore else */
                  if (!this._provided) {
                      const provideCache = {};
                      Object.defineProperty(this, '_provided', {
                          get: () => provideCache,
                          set: (v) => Object.assign(provideCache, v),
                      });
                  }
                  this._provided[piniaSymbol] = pinia;
                  // propagate the pinia instance in an SSR friendly way
                  // avoid adding it to nuxt twice
                  /* istanbul ignore else */
                  if (!this.$pinia) {
                      this.$pinia = pinia;
                  }
                  pinia._a = this;
                  if (IS_CLIENT) {
                      // this allows calling useStore() outside of a component setup after
                      // installing pinia's plugin
                      setActivePinia(pinia);
                  }
                  if (IS_CLIENT) {
                      registerPiniaDevtools(pinia._a, pinia);
                  }
              }
              else if (!this.$pinia && options.parent && options.parent.$pinia) {
                  this.$pinia = options.parent.$pinia;
              }
          },
          destroyed() {
              delete this._pStores;
          },
      });
  };

  exports.PiniaVuePlugin = PiniaVuePlugin;
  exports.acceptHMRUpdate = acceptHMRUpdate;
  exports.createPinia = createPinia;
  exports.defineStore = defineStore;
  exports.disposePinia = disposePinia;
  exports.getActivePinia = getActivePinia;
  exports.mapActions = mapActions;
  exports.mapGetters = mapGetters;
  exports.mapState = mapState;
  exports.mapStores = mapStores;
  exports.mapWritableState = mapWritableState;
  exports.setActivePinia = setActivePinia;
  exports.setMapStoreSuffix = setMapStoreSuffix;
  exports.shouldHydrate = shouldHydrate;
  exports.skipHydrate = skipHydrate;
  exports.storeToRefs = storeToRefs;

  return exports;

})({}, Vue);
