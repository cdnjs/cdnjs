// src/clipboard-polyfill/ClipboardItem/data-types.ts
var TEXT_PLAIN = "text/plain";
var TEXT_HTML = "text/html";

// src/clipboard-polyfill/debug.ts
var debugLogImpl = (s) => {
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

// src/clipboard-polyfill/builtins/window-globalThis.ts
var originalWindow = typeof window === "undefined" ? void 0 : window;
var originalGlobalThis = typeof globalThis === "undefined" ? void 0 : globalThis;

// src/clipboard-polyfill/builtins/promise-constructor.ts
var _a, _b, _c;
var promiseConstructorImpl = (_c = (_a = originalWindow) == null ? void 0 : _a.Promise) != null ? _c : (_b = originalGlobalThis) == null ? void 0 : _b.Promise;
function getPromiseConstructor() {
  if (!promiseConstructorImpl) {
    throw new Error(
      "No `Promise` implementation available for `clipboard-polyfill`. Consider using: https://github.com/lgarron/clipboard-polyfill#flat-file-version-with-promise-included"
    );
  }
  return promiseConstructorImpl;
}

// src/clipboard-polyfill/builtins/builtin-globals.ts
var originalNavigator = typeof navigator === "undefined" ? void 0 : navigator;
var originalNavigatorClipboard = originalNavigator == null ? void 0 : originalNavigator.clipboard;
var _a2;
var originalNavigatorClipboardRead = (_a2 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.read) == null ? void 0 : _a2.bind(
  originalNavigatorClipboard
);
var _a3;
var originalNavigatorClipboardReadText = (_a3 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.readText) == null ? void 0 : _a3.bind(
  originalNavigatorClipboard
);
var _a4;
var originalNavigatorClipboardWrite = (_a4 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.write) == null ? void 0 : _a4.bind(
  originalNavigatorClipboard
);
var _a5;
var originalNavigatorClipboardWriteText = (_a5 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.writeText) == null ? void 0 : _a5.bind(
  originalNavigatorClipboard
);
var _a6;
var originalWindowClipboardItem = (_a6 = originalWindow) == null ? void 0 : _a6.ClipboardItem;
var promiseConstructor = getPromiseConstructor();

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

// src/clipboard-polyfill/promise/promise-compat.ts
function promiseRecordMap(keys, f) {
  var promiseList = [];
  for (var i in keys) {
    var key = keys[i];
    promiseList.push(f(key));
  }
  return promiseConstructor.all(promiseList).then((vList) => {
    var dataOut = {};
    for (var i2 = 0; i2 < keys.length; i2++) {
      dataOut[keys[i2]] = vList[i2];
    }
    return dataOut;
  });
}
var voidPromise = promiseConstructor.resolve();
var truePromiseFn = () => promiseConstructor.resolve(true);
var falsePromise = promiseConstructor.resolve(false);
function rejectThrownErrors(executor) {
  return new promiseConstructor((resolve, reject) => {
    try {
      resolve(executor());
    } catch (e) {
      reject(e);
    }
  });
}

// src/clipboard-polyfill/implementations/text.ts
function stringToStringItem(s) {
  var stringItem = {};
  stringItem[TEXT_PLAIN] = s;
  return stringItem;
}
function writeText(s) {
  return rejectThrownErrors(() => {
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
  return rejectThrownErrors(() => {
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

// src/clipboard-polyfill/ClipboardItem/ClipboardItemPolyfill.ts
function ClipboardItemPolyfillImpl(items, options) {
  var _a7;
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
  var presentationStyle = (_a7 = options == null ? void 0 : options.presentationStyle) != null ? _a7 : "unspecified";
  function getType(type2) {
    return promiseConstructor.resolve(_items[type2]);
  }
  return {
    types,
    presentationStyle,
    getType
  };
}
var ClipboardItemPolyfill = ClipboardItemPolyfillImpl;

// src/clipboard-polyfill/ClipboardItem/convert.ts
function stringToBlob(type, str) {
  return new Blob([str], {
    type
  });
}
function blobToString(blob) {
  return new promiseConstructor((resolve, reject) => {
    var fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      var result = fileReader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject("could not convert blob to string");
      }
    });
    fileReader.readAsText(blob);
  });
}
function clipboardItemToGlobalClipboardItem(clipboardItem) {
  return promiseRecordMap(clipboardItem.types, function(type) {
    return clipboardItem.getType(type);
  }).then((items) => {
    return new Promise((resolve, reject) => {
      var options = {};
      if (clipboardItem.presentationStyle) {
        options.presentationStyle = clipboardItem.presentationStyle;
      }
      if (originalWindowClipboardItem) {
        resolve(new originalWindowClipboardItem(items, options));
      } else {
        reject("window.ClipboardItem is not defined");
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
  return clipboardItem.getType(type).then((text) => {
    return blobToString(text);
  });
}
function toStringItem(data) {
  return promiseRecordMap(data.types, function(type) {
    return getTypeAsString(data, type);
  });
}

// src/clipboard-polyfill/implementations/blob.ts
function write(data) {
  return rejectThrownErrors(() => {
    if (originalNavigatorClipboardWrite && originalWindowClipboardItem) {
      var originalNavigatorClipboardWriteCached = originalNavigatorClipboardWrite;
      debugLog("Using `navigator.clipboard.write()`.");
      return promiseConstructor.all(data.map(clipboardItemToGlobalClipboardItem)).then(
        (globalClipboardItems) => {
          return originalNavigatorClipboardWriteCached(globalClipboardItems).then(truePromiseFn).catch((e) => {
            if (!hasItemWithType(data, TEXT_PLAIN) && !hasItemWithType(data, TEXT_HTML)) {
              throw e;
            }
            return falsePromise;
          });
        }
      );
    }
    return falsePromise;
  }).then((success) => {
    if (success) {
      return voidPromise;
    }
    var hasTextPlain = hasItemWithType(data, TEXT_PLAIN);
    if (shouldShowWarnings() && !hasTextPlain) {
      debugLog(
        "clipboard.write() was called without a `text/plain` data type. On some platforms, this may result in an empty clipboard. Call suppressWarnings() to suppress this warning."
      );
    }
    return toStringItem(data[0]).then((stringItem) => {
      if (!writeFallback(stringItem)) {
        throw new Error("write() failed");
      }
    });
  });
}
function read() {
  return rejectThrownErrors(() => {
    if (originalNavigatorClipboardRead) {
      debugLog("Using `navigator.clipboard.read()`.");
      return originalNavigatorClipboardRead();
    }
    return readText().then((text) => {
      return [textToClipboardItem(text)];
    });
  });
}
export {
  ClipboardItemPolyfill as ClipboardItem,
  read,
  readText,
  setDebugLog,
  suppressWarnings,
  write,
  writeText
};
//# sourceMappingURL=clipboard-polyfill.es6.js.map
