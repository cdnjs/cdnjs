// src/utils.js
var eq = (x) => (y) => x === y;
var not = (fn) => (x) => !fn(x);
var getValues = (
  /*::<Obj: Object>*/
  (o) => Object.values(o)
);
var notUndefined = (x) => x !== void 0;
var isXError = (x) => (error) => error.keyword === x;
var isRequiredError = isXError("required");
var isAnyOfError = isXError("anyOf");
var isEnumError = isXError("enum");
var getErrors = (node) => node && node.errors ? node.errors.map(
  (e) => e.keyword === "errorMessage" ? { ...e.params.errors[0], message: e.message } : e
) : [];
var getChildren = (node) => node && getValues(node.children) || [];
var getSiblings = (parent) => (node) => getChildren(parent).filter(not(eq(node)));
var concatAll = (
  /*::<T>*/
  (xs) => (ys) => ys.reduce((zs, z) => zs.concat(z), xs)
);
export {
  concatAll,
  getChildren,
  getErrors,
  getSiblings,
  isAnyOfError,
  isEnumError,
  isRequiredError,
  notUndefined
};
//# sourceMappingURL=utils.mjs.map
