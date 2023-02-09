import _typeof from "@babel/runtime/helpers/typeof";
export var isRefObject = function isRefObject(refObject) {
  return _typeof(refObject) === 'object' && refObject !== null && refObject.hasOwnProperty('current');
};
//# sourceMappingURL=isRefObject.js.map