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

// src/clipboard-polyfill/ClipboardItem/data-types.ts
var TEXT_PLAIN = "text/plain";
var TEXT_HTML = "text/html";

// src/clipboard-polyfill/promise/constructor.ts
var promiseConstructorImpl = window.Promise;
function getPromiseConstructor() {
  return promiseConstructorImpl;
}

// src/clipboard-polyfill/builtin-globals.ts
var originalNavigator = typeof navigator === "undefined" ? void 0 : navigator;
var originalNavigatorClipboard = originalNavigator == null ? void 0 : originalNavigator.clipboard;
var _a;
var originalNavigatorClipboardRead = (_a = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.read) == null ? void 0 : _a.bind(
  originalNavigatorClipboard
);
var _a2;
var originalNavigatorClipboardReadText = (_a2 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.readText) == null ? void 0 : _a2.bind(
  originalNavigatorClipboard
);
var _a3;
var originalNavigatorClipboardWrite = (_a3 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.write) == null ? void 0 : _a3.bind(
  originalNavigatorClipboard
);
var _a4;
var originalNavigatorClipboardWriteText = (_a4 = originalNavigatorClipboard == null ? void 0 : originalNavigatorClipboard.writeText) == null ? void 0 : _a4.bind(
  originalNavigatorClipboard
);
var originalWindow = typeof window === "undefined" ? void 0 : window;
var originalWindowClipboardItem = originalWindow == null ? void 0 : originalWindow.ClipboardItem;
var promiseConstructor = getPromiseConstructor();

// src/clipboard-polyfill/strategies/internet-explorer.ts
var ieWindow = originalWindow;
function seemToBeInIE() {
  return typeof ClipboardEvent === "undefined" && typeof ieWindow.clipboardData !== "undefined" && typeof ieWindow.clipboardData.setData !== "undefined";
}
function writeTextIE(text) {
  return ieWindow.clipboardData.setData("Text", text);
}
function readTextIE() {
  return new promiseConstructor((resolve, reject) => {
    var text = ieWindow.clipboardData.getData("Text");
    if (text === "") {
      reject(
        new Error(
          "Empty clipboard or could not read plain text from clipboard"
        )
      );
    }
    resolve(text);
  });
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
var truePromise = truePromiseFn();
var falsePromise = promiseConstructor.resolve(false);

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
      return truePromise;
    } else {
      throw new Error("Copying failed, possibly because the user rejected it.");
    }
  }
  if (execCopy(stringItem)) {
    debugLog("regular execCopy worked");
    return truePromise;
  }
  if (navigator.userAgent.indexOf("Edge") > -1) {
    debugLog('UA "Edge" => assuming success');
    return truePromise;
  }
  if (copyUsingTempSelection(document.body, stringItem)) {
    debugLog("copyUsingTempSelection worked");
    return truePromise;
  }
  if (copyUsingTempElem(stringItem)) {
    debugLog("copyUsingTempElem worked");
    return truePromise;
  }
  if (copyTextUsingDOM(stringItem[TEXT_PLAIN])) {
    debugLog("copyTextUsingDOM worked");
    return truePromise;
  }
  return falsePromise;
}

// src/clipboard-polyfill/implementations/text.ts
function stringToStringItem(s) {
  var stringItem = {};
  stringItem[TEXT_PLAIN] = s;
  return stringItem;
}
function writeText(s) {
  if (originalNavigatorClipboardWriteText) {
    debugLog("Using `navigator.clipboard.writeText()`.");
    return originalNavigatorClipboardWriteText(s);
  }
  if (!writeFallback(stringToStringItem(s))) {
    throw new Error("writeText() failed");
  }
}
function readText() {
  if (originalNavigatorClipboardReadText) {
    debugLog("Using `navigator.clipboard.readText()`.");
    return originalNavigatorClipboardReadText();
  }
  if (seemToBeInIE()) {
    debugLog("Reading text using IE strategy.");
    return readTextIE();
  }
  throw new Error("Read is not supported in your browser.");
}

export {
  TEXT_PLAIN,
  TEXT_HTML,
  debugLog,
  setDebugLog,
  suppressWarnings,
  shouldShowWarnings,
  originalNavigatorClipboardRead,
  originalNavigatorClipboardWrite,
  originalWindowClipboardItem,
  promiseConstructor,
  promiseRecordMap,
  voidPromise,
  truePromiseFn,
  falsePromise,
  writeFallback,
  writeText,
  readText
};
