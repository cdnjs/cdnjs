import {
  __name
} from "./chunk-T24N4LJA.mjs";

// src/interactionDb.ts
var interactionFunctions = [];
var addFunction = /* @__PURE__ */ __name((func) => {
  interactionFunctions.push(func);
}, "addFunction");
var attachFunctions = /* @__PURE__ */ __name(() => {
  interactionFunctions.forEach((f) => {
    f();
  });
  interactionFunctions = [];
}, "attachFunctions");

export {
  addFunction,
  attachFunctions
};
