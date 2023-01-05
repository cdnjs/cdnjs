import {
  TEXT_HTML,
  TEXT_PLAIN,
  debugLog,
  falsePromise,
  originalNavigatorClipboardRead,
  originalNavigatorClipboardWrite,
  originalWindowClipboardItem,
  promiseConstructor,
  promiseRecordMap,
  readText,
  setDebugLog,
  shouldShowWarnings,
  suppressWarnings,
  truePromiseFn,
  voidPromise,
  writeFallback,
  writeText
} from "./chunk-QHYQR4J4.js";

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
  var _a;
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
  var presentationStyle = (_a = options == null ? void 0 : options.presentationStyle) != null ? _a : "unspecified";
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
    var options = {};
    if (clipboardItem.presentationStyle) {
      options.presentationStyle = clipboardItem.presentationStyle;
    }
    return new originalWindowClipboardItem(items, options);
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
  return (() => {
    if (originalNavigatorClipboardWrite && originalWindowClipboardItem) {
      debugLog("Using `navigator.clipboard.write()`.");
      return promiseConstructor.all(data.map(clipboardItemToGlobalClipboardItem)).then(
        (globalClipboardItems) => {
          return originalNavigatorClipboardWrite(globalClipboardItems).then(truePromiseFn).catch((e) => {
            if (!hasItemWithType(data, TEXT_PLAIN) && !hasItemWithType(data, TEXT_HTML)) {
              throw e;
            }
            return falsePromise;
          });
        }
      );
    }
    return falsePromise;
  })().then((success) => {
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
  if (originalNavigatorClipboardRead) {
    debugLog("Using `navigator.clipboard.read()`.");
    return originalNavigatorClipboardRead();
  }
  readText().then((text) => {
    return [textToClipboardItem(text)];
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
