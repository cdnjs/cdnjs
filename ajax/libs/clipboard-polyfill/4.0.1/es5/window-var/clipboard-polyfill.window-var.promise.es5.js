"use strict";
(function() {
  // src/clipboard-polyfill/builtins/window-globalThis.ts
  var originalWindow = typeof window === "undefined" ? void 0 : window;
  var originalGlobalThis = typeof globalThis === "undefined" ? void 0 : globalThis;

  // src/clipboard-polyfill/builtins/promise-constructor.ts
  var _a, _b, _c;
  var promiseConstructorImpl = (_c = (_a = originalWindow) == null ? void 0 : _a.Promise) != null ? _c : (_b = originalGlobalThis) == null ? void 0 : _b.Promise;
  function setPromiseConstructor(newPromiseConstructorImpl) {
    promiseConstructorImpl = newPromiseConstructorImpl;
  }
  function getPromiseConstructor() {
    if (!promiseConstructorImpl) {
      throw new Error(
        "No `Promise` implementation available for `clipboard-polyfill`. Consider using: https://github.com/lgarron/clipboard-polyfill#flat-file-version-with-promise-included"
      );
    }
    return promiseConstructorImpl;
  }

  // src/clipboard-polyfill/promise/polyfill.ts
  function finallyConstructor(callback) {
    var thisConstructor = this.constructor;
    return this.then(
      function(value) {
        return thisConstructor.resolve(callback()).then(function() {
          return value;
        });
      },
      function(reason) {
        return thisConstructor.resolve(callback()).then(function() {
          return thisConstructor.reject(reason);
        });
      }
    );
  }
  function allSettled(arr) {
    var P = this;
    return new P(function(resolve2, reject2) {
      if (!(arr && typeof arr.length !== "undefined")) {
        return reject2(
          new TypeError(
            typeof arr + " " + arr + " is not iterable(cannot read property Symbol(Symbol.iterator))"
          )
        );
      }
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0)
        return resolve2([]);
      var remaining = args.length;
      function res(i2, val) {
        if (val && (typeof val === "object" || typeof val === "function")) {
          var then = val.then;
          if (typeof then === "function") {
            then.call(
              val,
              function(val2) {
                res(i2, val2);
              },
              function(e) {
                args[i2] = { status: "rejected", reason: e };
                if (--remaining === 0) {
                  resolve2(args);
                }
              }
            );
            return;
          }
        }
        args[i2] = { status: "fulfilled", value: val };
        if (--remaining === 0) {
          resolve2(args);
        }
      }
      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  }
  var setTimeoutFunc = setTimeout;
  function isArray(x) {
    return Boolean(x && typeof x.length !== "undefined");
  }
  function noop() {
  }
  function bind(fn, thisArg) {
    return function() {
      fn.apply(thisArg, arguments);
    };
  }
  function PromisePolyfill(fn) {
    if (!(this instanceof PromisePolyfill))
      throw new TypeError("Promises must be constructed via new");
    if (typeof fn !== "function")
      throw new TypeError("not a function");
    this._state = 0;
    this._handled = false;
    this._value = void 0;
    this._deferreds = [];
    doResolve(fn, this);
  }
  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    PromisePolyfill._immediateFn(function() {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }
  function resolve(self, newValue) {
    try {
      if (newValue === self)
        throw new TypeError("A promise cannot be resolved with itself.");
      if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
        var then = newValue.then;
        if (newValue instanceof PromisePolyfill) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === "function") {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }
  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }
  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      PromisePolyfill._immediateFn(function() {
        if (!self._handled) {
          PromisePolyfill._unhandledRejectionFn(self._value);
        }
      });
    }
    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }
  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
    this.onRejected = typeof onRejected === "function" ? onRejected : null;
    this.promise = promise;
  }
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(
        function(value) {
          if (done)
            return;
          done = true;
          resolve(self, value);
        },
        function(reason) {
          if (done)
            return;
          done = true;
          reject(self, reason);
        }
      );
    } catch (ex) {
      if (done)
        return;
      done = true;
      reject(self, ex);
    }
  }
  PromisePolyfill.prototype["catch"] = function(onRejected) {
    return this.then(null, onRejected);
  };
  PromisePolyfill.prototype.then = function(onFulfilled, onRejected) {
    var prom = new this.constructor(noop);
    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };
  PromisePolyfill.prototype["finally"] = finallyConstructor;
  PromisePolyfill.all = function(arr) {
    return new PromisePolyfill(function(resolve2, reject2) {
      if (!isArray(arr)) {
        return reject2(new TypeError("Promise.all accepts an array"));
      }
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0)
        return resolve2([]);
      var remaining = args.length;
      function res(i2, val) {
        try {
          if (val && (typeof val === "object" || typeof val === "function")) {
            var then = val.then;
            if (typeof then === "function") {
              then.call(
                val,
                function(val2) {
                  res(i2, val2);
                },
                reject2
              );
              return;
            }
          }
          args[i2] = val;
          if (--remaining === 0) {
            resolve2(args);
          }
        } catch (ex) {
          reject2(ex);
        }
      }
      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };
  PromisePolyfill.allSettled = allSettled;
  PromisePolyfill.resolve = function(value) {
    if (value && typeof value === "object" && value.constructor === PromisePolyfill) {
      return value;
    }
    return new PromisePolyfill(function(resolve2) {
      resolve2(value);
    });
  };
  PromisePolyfill.reject = function(value) {
    return new PromisePolyfill(function(resolve2, reject2) {
      reject2(value);
    });
  };
  PromisePolyfill.race = function(arr) {
    return new PromisePolyfill(function(resolve2, reject2) {
      if (!isArray(arr)) {
        return reject2(new TypeError("Promise.race accepts an array"));
      }
      for (var i = 0, len = arr.length; i < len; i++) {
        PromisePolyfill.resolve(arr[i]).then(resolve2, reject2);
      }
    });
  };
  PromisePolyfill._immediateFn = typeof setImmediate === "function" && function(fn) {
    setImmediate(fn);
  } || function(fn) {
    setTimeoutFunc(fn, 0);
  };
  PromisePolyfill._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== "undefined" && console) {
      console.warn("Possible Unhandled Promise Rejection:", err);
    }
  };
  var PromisePolyfillConstructor = PromisePolyfill;
  setPromiseConstructor(PromisePolyfillConstructor);

  // src/clipboard-polyfill/promise/set-promise-polyfill-if-needed.ts
  var _a2;
  ((_a2 = originalWindow) == null ? void 0 : _a2.Promise) || setPromiseConstructor(PromisePolyfillConstructor);

  // src/clipboard-polyfill/builtins/builtin-globals.ts
  var originalNavigator = typeof navigator === "undefined" ? void 0 : navigator;
  var originalNavigatorClipboard = originalNavigator == null ? void 0 : originalNavigator.clipboard;
  var _a3;
  var originalNavigatorClipboardRead = (_a3 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.read) == null ? void 0 : _a3.bind(
    originalNavigatorClipboard
  );
  var _a4;
  var originalNavigatorClipboardReadText = (_a4 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.readText) == null ? void 0 : _a4.bind(
    originalNavigatorClipboard
  );
  var _a5;
  var originalNavigatorClipboardWrite = (_a5 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.write) == null ? void 0 : _a5.bind(
    originalNavigatorClipboard
  );
  var _a6;
  var originalNavigatorClipboardWriteText = (_a6 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.writeText) == null ? void 0 : _a6.bind(
    originalNavigatorClipboard
  );
  var _a7;
  var originalWindowClipboardItem = (_a7 = originalWindow) == null ? void 0 : _a7.ClipboardItem;
  var promiseConstructor = getPromiseConstructor();

  // src/clipboard-polyfill/ClipboardItem/data-types.ts
  var TEXT_PLAIN = "text/plain";
  var TEXT_HTML = "text/html";

  // src/clipboard-polyfill/promise/promise-compat.ts
  function promiseRecordMap(keys, f) {
    var promiseList = [];
    for (var i in keys) {
      var key = keys[i];
      promiseList.push(f(key));
    }
    return promiseConstructor.all(promiseList).then(function(vList) {
      var dataOut = {};
      for (var i2 = 0; i2 < keys.length; i2++) {
        dataOut[keys[i2]] = vList[i2];
      }
      return dataOut;
    });
  }
  var voidPromise = promiseConstructor.resolve();
  var truePromiseFn = function() {
    return promiseConstructor.resolve(true);
  };
  var falsePromise = promiseConstructor.resolve(false);
  function rejectThrownErrors(executor) {
    return new promiseConstructor(function(resolve2, reject2) {
      try {
        resolve2(executor());
      } catch (e) {
        reject2(e);
      }
    });
  }

  // src/clipboard-polyfill/ClipboardItem/convert.ts
  function stringToBlob(type, str) {
    return new Blob([str], {
      type: type
    });
  }
  function blobToString(blob) {
    return new promiseConstructor(function(resolve2, reject2) {
      var fileReader = new FileReader();
      fileReader.addEventListener("load", function() {
        var result = fileReader.result;
        if (typeof result === "string") {
          resolve2(result);
        } else {
          reject2("could not convert blob to string");
        }
      });
      fileReader.readAsText(blob);
    });
  }
  function clipboardItemToGlobalClipboardItem(clipboardItem) {
    return promiseRecordMap(clipboardItem.types, function(type) {
      return clipboardItem.getType(type);
    }).then(function(items) {
      return new Promise(function(resolve2, reject2) {
        var options = {};
        if (clipboardItem.presentationStyle) {
          options.presentationStyle = clipboardItem.presentationStyle;
        }
        if (originalWindowClipboardItem) {
          resolve2(new originalWindowClipboardItem(items, options));
        } else {
          reject2("window.ClipboardItem is not defined");
        }
      });
    });
  }
  function textToClipboardItem(text) {
    var items = {};
    items[TEXT_PLAIN] = stringToBlob(text, TEXT_PLAIN);
    return new ClipboardItemPolyfill(items);
  }
  function getTypeAsString(clipboardItem, type) {
    return clipboardItem.getType(type).then(function(text) {
      return blobToString(text);
    });
  }
  function toStringItem(data) {
    return promiseRecordMap(data.types, function(type) {
      return getTypeAsString(data, type);
    });
  }

  // src/clipboard-polyfill/ClipboardItem/ClipboardItemPolyfill.ts
  function ClipboardItemPolyfillImpl(items, options) {
    var _a8;
    var types = Object.keys(items);
    var _items = {};
    for (var type in items) {
      var item = items[type];
      if (typeof item === "string") {
        _items[type] = stringToBlob(type, item);
      } else {
        _items[type] = item;
      }
    }
    var presentationStyle = (_a8 = options == null ? void 0 : options.presentationStyle) != null ? _a8 : "unspecified";
    function getType(type2) {
      return promiseConstructor.resolve(_items[type2]);
    }
    return {
      types: types,
      presentationStyle: presentationStyle,
      getType: getType
    };
  }
  var ClipboardItemPolyfill = ClipboardItemPolyfillImpl;

  // src/clipboard-polyfill/ClipboardItem/check.ts
  function hasItemWithType(clipboardItems, typeName) {
    for (var i in clipboardItems) {
      var item = clipboardItems[i];
      if (item.types.indexOf(typeName) !== -1) {
        return true;
      }
    }
    return false;
  }

  // src/clipboard-polyfill/debug.ts
  var debugLogImpl = function(s) {
  };
  function debugLog(s) {
    debugLogImpl(s);
  }
  function setDebugLog(logFn) {
    debugLogImpl = logFn;
  }
  var showWarnings = true;
  function suppressWarnings() {
    showWarnings = false;
  }
  function shouldShowWarnings() {
    return showWarnings;
  }
  function warnOrLog() {
    (console.warn || console.log).apply(console, arguments);
  }
  var warn = warnOrLog.bind("[clipboard-polyfill]");

  // src/clipboard-polyfill/strategies/internet-explorer.ts
  var ieWindow = originalWindow;
  function seemToBeInIE() {
    return typeof ClipboardEvent === "undefined" && typeof (ieWindow == null ? void 0 : ieWindow.clipboardData) !== "undefined" && typeof (ieWindow == null ? void 0 : ieWindow.clipboardData.setData) !== "undefined";
  }
  function writeTextIE(text) {
    if (!ieWindow.clipboardData) {
      return false;
    }
    var success = ieWindow.clipboardData.setData("Text", text);
    if (success) {
      debugLog("writeTextIE worked");
    }
    return success;
  }
  function readTextIE() {
    if (!ieWindow.clipboardData) {
      throw new Error("Cannot read IE clipboard Data ");
    }
    var text = ieWindow.clipboardData.getData("Text");
    if (text === "") {
      throw new Error(
        "Empty clipboard or could not read plain text from clipboard"
      );
    }
    return text;
  }

  // src/clipboard-polyfill/strategies/dom.ts
  function copyListener(tracker, data, e) {
    debugLog("listener called");
    tracker.success = true;
    for (var type in data) {
      var value = data[type];
      var clipboardData = e.clipboardData;
      clipboardData.setData(type, value);
      if (type === TEXT_PLAIN && clipboardData.getData(type) !== value) {
        debugLog("setting text/plain failed");
        tracker.success = false;
      }
    }
    e.preventDefault();
  }
  function execCopy(data) {
    var tracker = { success: false };
    var listener = copyListener.bind(this, tracker, data);
    document.addEventListener("copy", listener);
    try {
      document.execCommand("copy");
    } finally {
      document.removeEventListener("copy", listener);
    }
    return tracker.success;
  }
  function copyUsingTempSelection(e, data) {
    selectionSet(e);
    var success = execCopy(data);
    selectionClear();
    return success;
  }
  function copyUsingTempElem(data) {
    var tempElem = document.createElement("div");
    tempElem.setAttribute("style", "-webkit-user-select: text !important");
    tempElem.textContent = "temporary element";
    document.body.appendChild(tempElem);
    var success = copyUsingTempSelection(tempElem, data);
    document.body.removeChild(tempElem);
    return success;
  }
  function copyTextUsingDOM(str) {
    debugLog("copyTextUsingDOM");
    var tempElem = document.createElement("div");
    tempElem.setAttribute("style", "-webkit-user-select: text !important");
    var spanParent = tempElem;
    if (tempElem.attachShadow) {
      debugLog("Using shadow DOM.");
      spanParent = tempElem.attachShadow({ mode: "open" });
    }
    var span = document.createElement("span");
    span.innerText = str;
    spanParent.appendChild(span);
    document.body.appendChild(tempElem);
    selectionSet(span);
    var result = document.execCommand("copy");
    selectionClear();
    document.body.removeChild(tempElem);
    return result;
  }
  function selectionSet(elem) {
    var sel = document.getSelection();
    if (sel) {
      var range = document.createRange();
      range.selectNodeContents(elem);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
  function selectionClear() {
    var sel = document.getSelection();
    if (sel) {
      sel.removeAllRanges();
    }
  }

  // src/clipboard-polyfill/implementations/write-fallback.ts
  function writeFallback(stringItem) {
    var hasTextPlain = TEXT_PLAIN in stringItem;
    if (seemToBeInIE()) {
      if (!hasTextPlain) {
        throw new Error("No `text/plain` value was specified.");
      }
      if (writeTextIE(stringItem[TEXT_PLAIN])) {
        return true;
      } else {
        throw new Error("Copying failed, possibly because the user rejected it.");
      }
    }
    if (execCopy(stringItem)) {
      debugLog("regular execCopy worked");
      return true;
    }
    if (navigator.userAgent.indexOf("Edge") > -1) {
      debugLog('UA "Edge" => assuming success');
      return true;
    }
    if (copyUsingTempSelection(document.body, stringItem)) {
      debugLog("copyUsingTempSelection worked");
      return true;
    }
    if (copyUsingTempElem(stringItem)) {
      debugLog("copyUsingTempElem worked");
      return true;
    }
    if (copyTextUsingDOM(stringItem[TEXT_PLAIN])) {
      debugLog("copyTextUsingDOM worked");
      return true;
    }
    return false;
  }

  // src/clipboard-polyfill/implementations/text.ts
  function stringToStringItem(s) {
    var stringItem = {};
    stringItem[TEXT_PLAIN] = s;
    return stringItem;
  }
  function writeText(s) {
    return rejectThrownErrors(function() {
      if (originalNavigatorClipboardWriteText) {
        debugLog("Using `navigator.clipboard.writeText()`.");
        return originalNavigatorClipboardWriteText(s).catch(
          writeTextStringFallback
        );
      }
      return promiseConstructor.resolve(writeTextStringFallback(s));
    });
  }
  function writeTextStringFallback(s) {
    if (!writeFallback(stringToStringItem(s))) {
      throw new Error("writeText() failed");
    }
  }
  function readText() {
    return rejectThrownErrors(function() {
      if (originalNavigatorClipboardReadText) {
        debugLog("Using `navigator.clipboard.readText()`.");
        return originalNavigatorClipboardReadText();
      }
      if (seemToBeInIE()) {
        var result = readTextIE();
        return promiseConstructor.resolve(result);
      }
      throw new Error("Read is not supported in your browser.");
    });
  }

  // src/clipboard-polyfill/implementations/blob.ts
  function write(data) {
    return rejectThrownErrors(function() {
      if (originalNavigatorClipboardWrite && originalWindowClipboardItem) {
        var originalNavigatorClipboardWriteCached = originalNavigatorClipboardWrite;
        debugLog("Using `navigator.clipboard.write()`.");
        return promiseConstructor.all(data.map(clipboardItemToGlobalClipboardItem)).then(
          function(globalClipboardItems) {
            return originalNavigatorClipboardWriteCached(globalClipboardItems).then(truePromiseFn).catch(function(e) {
              if (!hasItemWithType(data, TEXT_PLAIN) && !hasItemWithType(data, TEXT_HTML)) {
                throw e;
              }
              return falsePromise;
            });
          }
        );
      }
      return falsePromise;
    }).then(function(success) {
      if (success) {
        return voidPromise;
      }
      var hasTextPlain = hasItemWithType(data, TEXT_PLAIN);
      if (shouldShowWarnings() && !hasTextPlain) {
        debugLog(
          "clipboard.write() was called without a `text/plain` data type. On some platforms, this may result in an empty clipboard. Call suppressWarnings() to suppress this warning."
        );
      }
      return toStringItem(data[0]).then(function(stringItem) {
        if (!writeFallback(stringItem)) {
          throw new Error("write() failed");
        }
      });
    });
  }
  function read() {
    return rejectThrownErrors(function() {
      if (originalNavigatorClipboardRead) {
        debugLog("Using `navigator.clipboard.read()`.");
        return originalNavigatorClipboardRead();
      }
      return readText().then(function(text) {
        return [textToClipboardItem(text)];
      });
    });
  }

  // src/clipboard-polyfill/entries/es5/window-var.ts
  window.clipboard = {
    read: read,
    readText: readText,
    write: write,
    writeText: writeText,
    ClipboardItem: ClipboardItemPolyfill,
    setDebugLog: setDebugLog,
    suppressWarnings: suppressWarnings
  };

  // src/clipboard-polyfill/entries/es5/window-var.promise.ts
  window.PromisePolyfill = PromisePolyfillConstructor;
})();
//# sourceMappingURL=clipboard-polyfill.window-var.promise.es5.js.map
