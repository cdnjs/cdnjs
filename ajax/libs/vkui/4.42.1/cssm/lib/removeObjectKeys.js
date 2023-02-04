import _objectSpread from "@babel/runtime/helpers/objectSpread2";
export function removeObjectKeys(obj) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var newObj = _objectSpread({}, obj);
  keys.forEach(function (key) {
    return delete newObj[key];
  });
  return newObj;
}
//# sourceMappingURL=removeObjectKeys.js.map