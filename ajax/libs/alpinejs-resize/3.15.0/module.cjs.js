var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/resize/builds/module.js
var module_exports = {};
__export(module_exports, {
  default: () => module_default,
  resize: () => src_default
});
module.exports = __toCommonJS(module_exports);

// packages/resize/src/index.js
function src_default(Alpine) {
  Alpine.directive("resize", Alpine.skipDuringClone((el, { value, expression, modifiers }, { evaluateLater, cleanup }) => {
    let evaluator = evaluateLater(expression);
    let evaluate = (width, height) => {
      evaluator(() => {
      }, { scope: { "$width": width, "$height": height } });
    };
    let off = modifiers.includes("document") ? onDocumentResize(evaluate) : onElResize(el, evaluate);
    cleanup(() => off());
  }));
}
function onElResize(el, callback) {
  let observer = new ResizeObserver((entries) => {
    let [width, height] = dimensions(entries);
    callback(width, height);
  });
  observer.observe(el);
  return () => observer.disconnect();
}
var documentResizeObserver;
var documentResizeObserverCallbacks = /* @__PURE__ */ new Set();
function onDocumentResize(callback) {
  documentResizeObserverCallbacks.add(callback);
  if (!documentResizeObserver) {
    documentResizeObserver = new ResizeObserver((entries) => {
      let [width, height] = dimensions(entries);
      documentResizeObserverCallbacks.forEach((i) => i(width, height));
    });
    documentResizeObserver.observe(document.documentElement);
  }
  return () => {
    documentResizeObserverCallbacks.delete(callback);
  };
}
function dimensions(entries) {
  let width, height;
  for (let entry of entries) {
    width = entry.borderBoxSize[0].inlineSize;
    height = entry.borderBoxSize[0].blockSize;
  }
  return [width, height];
}

// packages/resize/builds/module.js
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resize
});
