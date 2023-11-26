import {
  Set_default,
  baseKeys_default,
  getTag_default,
  isEmpty_default
} from "./chunk-GI3XPZAN.mjs";
import {
  MapCache_default,
  Stack_default,
  Symbol_default,
  Uint8Array_default,
  arrayLikeKeys_default,
  assignValue_default,
  baseAssignValue_default,
  baseFor_default,
  baseGetTag_default,
  baseRest_default,
  baseUnary_default,
  cloneArrayBuffer_default,
  cloneBuffer_default,
  cloneTypedArray_default,
  constant_default,
  copyArray_default,
  copyObject_default,
  eq_default,
  getPrototype_default,
  identity_default,
  initCloneObject_default,
  isArguments_default,
  isArrayLikeObject_default,
  isArrayLike_default,
  isArray_default,
  isBuffer_default,
  isFunction_default,
  isIndex_default,
  isIterateeCall_default,
  isLength_default,
  isObjectLike_default,
  isObject_default,
  isTypedArray_default,
  keysIn_default,
  memoize_default,
  merge_default,
  nodeUtil_default,
  overRest_default,
  root_default,
  setToString_default
} from "./chunk-BHRT2E43.mjs";
import {
  __name
} from "./chunk-T24N4LJA.mjs";

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isSymbol.js
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
__name(isSymbol, "isSymbol");
var isSymbol_default = isSymbol;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
__name(arrayMap, "arrayMap");
var arrayMap_default = arrayMap;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseToString.js
var INFINITY = 1 / 0;
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
__name(baseToString, "baseToString");
var baseToString_default = baseToString;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_trimmedEndIndex.js
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
__name(trimmedEndIndex, "trimmedEndIndex");
var trimmedEndIndex_default = trimmedEndIndex;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseTrim.js
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
__name(baseTrim, "baseTrim");
var baseTrim_default = baseTrim;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/toNumber.js
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN;
  }
  if (isObject_default(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject_default(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim_default(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
__name(toNumber, "toNumber");
var toNumber_default = toNumber;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/toFinite.js
var INFINITY2 = 1 / 0;
var MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_default(value);
  if (value === INFINITY2 || value === -INFINITY2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
__name(toFinite, "toFinite");
var toFinite_default = toFinite;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/toInteger.js
function toInteger(value) {
  var result = toFinite_default(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
__name(toInteger, "toInteger");
var toInteger_default = toInteger;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/noop.js
function noop() {
}
__name(noop, "noop");
var noop_default = noop;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayEach.js
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
__name(arrayEach, "arrayEach");
var arrayEach_default = arrayEach;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseFindIndex.js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
__name(baseFindIndex, "baseFindIndex");
var baseFindIndex_default = baseFindIndex;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsNaN.js
function baseIsNaN(value) {
  return value !== value;
}
__name(baseIsNaN, "baseIsNaN");
var baseIsNaN_default = baseIsNaN;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_strictIndexOf.js
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
__name(strictIndexOf, "strictIndexOf");
var strictIndexOf_default = strictIndexOf;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIndexOf.js
function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf_default(array, value, fromIndex) : baseFindIndex_default(array, baseIsNaN_default, fromIndex);
}
__name(baseIndexOf, "baseIndexOf");
var baseIndexOf_default = baseIndexOf;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayIncludes.js
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf_default(array, value, 0) > -1;
}
__name(arrayIncludes, "arrayIncludes");
var arrayIncludes_default = arrayIncludes;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
__name(keys, "keys");
var keys_default = keys;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isKey.js
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_default(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
__name(isKey, "isKey");
var isKey_default = isKey;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_memoizeCapped.js
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_default(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
__name(memoizeCapped, "memoizeCapped");
var memoizeCapped_default = memoizeCapped;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stringToPath.js
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped_default(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var stringToPath_default = stringToPath;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
__name(toString, "toString");
var toString_default = toString;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_castPath.js
function castPath(value, object) {
  if (isArray_default(value)) {
    return value;
  }
  return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
__name(castPath, "castPath");
var castPath_default = castPath;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_toKey.js
var INFINITY3 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_default(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY3 ? "-0" : result;
}
__name(toKey, "toKey");
var toKey_default = toKey;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseGet.js
function baseGet(object, path) {
  path = castPath_default(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey_default(path[index++])];
  }
  return index && index == length ? object : void 0;
}
__name(baseGet, "baseGet");
var baseGet_default = baseGet;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/get.js
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet_default(object, path);
  return result === void 0 ? defaultValue : result;
}
__name(get, "get");
var get_default = get;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values2) {
  var index = -1, length = values2.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values2[index];
  }
  return array;
}
__name(arrayPush, "arrayPush");
var arrayPush_default = arrayPush;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isFlattenable.js
var spreadableSymbol = Symbol_default ? Symbol_default.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray_default(value) || isArguments_default(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
__name(isFlattenable, "isFlattenable");
var isFlattenable_default = isFlattenable;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseFlatten.js
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = isFlattenable_default);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush_default(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
__name(baseFlatten, "baseFlatten");
var baseFlatten_default = baseFlatten;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/flatten.js
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten_default(array, 1) : [];
}
__name(flatten, "flatten");
var flatten_default = flatten;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_flatRest.js
function flatRest(func) {
  return setToString_default(overRest_default(func, void 0, flatten_default), func + "");
}
__name(flatRest, "flatRest");
var flatRest_default = flatRest;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hasUnicode.js
var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange = "\\u0300-\\u036f";
var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange = "\\u20d0-\\u20ff";
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsVarRange = "\\ufe0e\\ufe0f";
var rsZWJ = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
__name(hasUnicode, "hasUnicode");
var hasUnicode_default = hasUnicode;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayReduce.js
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
__name(arrayReduce, "arrayReduce");
var arrayReduce_default = arrayReduce;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseAssign.js
function baseAssign(object, source) {
  return object && copyObject_default(source, keys_default(source), object);
}
__name(baseAssign, "baseAssign");
var baseAssign_default = baseAssign;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseAssignIn.js
function baseAssignIn(object, source) {
  return object && copyObject_default(source, keysIn_default(source), object);
}
__name(baseAssignIn, "baseAssignIn");
var baseAssignIn_default = baseAssignIn;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
__name(arrayFilter, "arrayFilter");
var arrayFilter_default = arrayFilter;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
__name(stubArray, "stubArray");
var stubArray_default = stubArray;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getSymbols.js
var objectProto = Object.prototype;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_copySymbols.js
function copySymbols(source, object) {
  return copyObject_default(source, getSymbols_default(source), object);
}
__name(copySymbols, "copySymbols");
var copySymbols_default = copySymbols;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getSymbolsIn.js
var nativeGetSymbols2 = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
  var result = [];
  while (object) {
    arrayPush_default(result, getSymbols_default(object));
    object = getPrototype_default(object);
  }
  return result;
};
var getSymbolsIn_default = getSymbolsIn;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_copySymbolsIn.js
function copySymbolsIn(source, object) {
  return copyObject_default(source, getSymbolsIn_default(source), object);
}
__name(copySymbolsIn, "copySymbolsIn");
var copySymbolsIn_default = copySymbolsIn;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
__name(baseGetAllKeys, "baseGetAllKeys");
var baseGetAllKeys_default = baseGetAllKeys;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
__name(getAllKeys, "getAllKeys");
var getAllKeys_default = getAllKeys;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getAllKeysIn.js
function getAllKeysIn(object) {
  return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
}
__name(getAllKeysIn, "getAllKeysIn");
var getAllKeysIn_default = getAllKeysIn;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_initCloneArray.js
var objectProto2 = Object.prototype;
var hasOwnProperty = objectProto2.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
__name(initCloneArray, "initCloneArray");
var initCloneArray_default = initCloneArray;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneDataView.js
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
__name(cloneDataView, "cloneDataView");
var cloneDataView_default = cloneDataView;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneRegExp.js
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
__name(cloneRegExp, "cloneRegExp");
var cloneRegExp_default = cloneRegExp;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneSymbol.js
var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
__name(cloneSymbol, "cloneSymbol");
var cloneSymbol_default = cloneSymbol;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_initCloneByTag.js
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var symbolTag2 = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer_default(object);
    case boolTag:
    case dateTag:
      return new Ctor(+object);
    case dataViewTag:
      return cloneDataView_default(object, isDeep);
    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return cloneTypedArray_default(object, isDeep);
    case mapTag:
      return new Ctor();
    case numberTag:
    case stringTag:
      return new Ctor(object);
    case regexpTag:
      return cloneRegExp_default(object);
    case setTag:
      return new Ctor();
    case symbolTag2:
      return cloneSymbol_default(object);
  }
}
__name(initCloneByTag, "initCloneByTag");
var initCloneByTag_default = initCloneByTag;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsMap.js
var mapTag2 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike_default(value) && getTag_default(value) == mapTag2;
}
__name(baseIsMap, "baseIsMap");
var baseIsMap_default = baseIsMap;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isMap.js
var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
var isMap_default = isMap;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsSet.js
var setTag2 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike_default(value) && getTag_default(value) == setTag2;
}
__name(baseIsSet, "baseIsSet");
var baseIsSet_default = baseIsSet;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isSet.js
var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
var isSet_default = isSet;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseClone.js
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG = 4;
var argsTag = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var errorTag = "[object Error]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var mapTag3 = "[object Map]";
var numberTag2 = "[object Number]";
var objectTag = "[object Object]";
var regexpTag2 = "[object RegExp]";
var setTag3 = "[object Set]";
var stringTag2 = "[object String]";
var symbolTag3 = "[object Symbol]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag2 = "[object DataView]";
var float32Tag2 = "[object Float32Array]";
var float64Tag2 = "[object Float64Array]";
var int8Tag2 = "[object Int8Array]";
var int16Tag2 = "[object Int16Array]";
var int32Tag2 = "[object Int32Array]";
var uint8Tag2 = "[object Uint8Array]";
var uint8ClampedTag2 = "[object Uint8ClampedArray]";
var uint16Tag2 = "[object Uint16Array]";
var uint32Tag2 = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag2] = cloneableTags[dataViewTag2] = cloneableTags[boolTag2] = cloneableTags[dateTag2] = cloneableTags[float32Tag2] = cloneableTags[float64Tag2] = cloneableTags[int8Tag2] = cloneableTags[int16Tag2] = cloneableTags[int32Tag2] = cloneableTags[mapTag3] = cloneableTags[numberTag2] = cloneableTags[objectTag] = cloneableTags[regexpTag2] = cloneableTags[setTag3] = cloneableTags[stringTag2] = cloneableTags[symbolTag3] = cloneableTags[uint8Tag2] = cloneableTags[uint8ClampedTag2] = cloneableTags[uint16Tag2] = cloneableTags[uint32Tag2] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject_default(value)) {
    return value;
  }
  var isArr = isArray_default(value);
  if (isArr) {
    result = initCloneArray_default(value);
    if (!isDeep) {
      return copyArray_default(value, result);
    }
  } else {
    var tag = getTag_default(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer_default(value)) {
      return cloneBuffer_default(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject_default(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result, value)) : copySymbols_default(value, baseAssign_default(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag_default(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack_default());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet_default(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_default(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach_default(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue_default(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
__name(baseClone, "baseClone");
var baseClone_default = baseClone;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/clone.js
var CLONE_SYMBOLS_FLAG2 = 4;
function clone(value) {
  return baseClone_default(value, CLONE_SYMBOLS_FLAG2);
}
__name(clone, "clone");
var clone_default = clone;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/cloneDeep.js
var CLONE_DEEP_FLAG2 = 1;
var CLONE_SYMBOLS_FLAG3 = 4;
function cloneDeep(value) {
  return baseClone_default(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG3);
}
__name(cloneDeep, "cloneDeep");
var cloneDeep_default = cloneDeep;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
__name(setCacheAdd, "setCacheAdd");
var setCacheAdd_default = setCacheAdd;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
__name(setCacheHas, "setCacheHas");
var setCacheHas_default = setCacheHas;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_SetCache.js
function SetCache(values2) {
  var index = -1, length = values2 == null ? 0 : values2.length;
  this.__data__ = new MapCache_default();
  while (++index < length) {
    this.add(values2[index]);
  }
}
__name(SetCache, "SetCache");
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
__name(arraySome, "arraySome");
var arraySome_default = arraySome;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
__name(cacheHas, "cacheHas");
var cacheHas_default = cacheHas;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
__name(equalArrays, "equalArrays");
var equalArrays_default = equalArrays;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapToArray.js
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
__name(mapToArray, "mapToArray");
var mapToArray_default = mapToArray;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_setToArray.js
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
__name(setToArray, "setToArray");
var setToArray_default = setToArray;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag3 = "[object Boolean]";
var dateTag3 = "[object Date]";
var errorTag2 = "[object Error]";
var mapTag4 = "[object Map]";
var numberTag3 = "[object Number]";
var regexpTag3 = "[object RegExp]";
var setTag4 = "[object Set]";
var stringTag3 = "[object String]";
var symbolTag4 = "[object Symbol]";
var arrayBufferTag3 = "[object ArrayBuffer]";
var dataViewTag3 = "[object DataView]";
var symbolProto3 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf2 = symbolProto3 ? symbolProto3.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag3:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag3:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag3:
    case dateTag3:
    case numberTag3:
      return eq_default(+object, +other);
    case errorTag2:
      return object.name == other.name && object.message == other.message;
    case regexpTag3:
    case stringTag3:
      return object == other + "";
    case mapTag4:
      var convert = mapToArray_default;
    case setTag4:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag4:
      if (symbolValueOf2) {
        return symbolValueOf2.call(object) == symbolValueOf2.call(other);
      }
  }
  return false;
}
__name(equalByTag, "equalByTag");
var equalByTag_default = equalByTag;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto3 = Object.prototype;
var hasOwnProperty2 = objectProto3.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
__name(equalObjects, "equalObjects");
var equalObjects_default = equalObjects;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag2 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var objectTag2 = "[object Object]";
var objectProto4 = Object.prototype;
var hasOwnProperty3 = objectProto4.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag2 : getTag_default(object), othTag = othIsArr ? arrayTag2 : getTag_default(other);
  objTag = objTag == argsTag2 ? objectTag2 : objTag;
  othTag = othTag == argsTag2 ? objectTag2 : othTag;
  var objIsObj = objTag == objectTag2, othIsObj = othTag == objectTag2, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty3.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty3.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
__name(baseIsEqualDeep, "baseIsEqualDeep");
var baseIsEqualDeep_default = baseIsEqualDeep;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
__name(baseIsEqual, "baseIsEqual");
var baseIsEqual_default = baseIsEqual;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsMatch.js
var COMPARE_PARTIAL_FLAG5 = 1;
var COMPARE_UNORDERED_FLAG3 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack_default();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
__name(baseIsMatch, "baseIsMatch");
var baseIsMatch_default = baseIsMatch;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isStrictComparable.js
function isStrictComparable(value) {
  return value === value && !isObject_default(value);
}
__name(isStrictComparable, "isStrictComparable");
var isStrictComparable_default = isStrictComparable;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getMatchData.js
function getMatchData(object) {
  var result = keys_default(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable_default(value)];
  }
  return result;
}
__name(getMatchData, "getMatchData");
var getMatchData_default = getMatchData;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_matchesStrictComparable.js
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
__name(matchesStrictComparable, "matchesStrictComparable");
var matchesStrictComparable_default = matchesStrictComparable;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseMatches.js
function baseMatches(source) {
  var matchData = getMatchData_default(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch_default(object, source, matchData);
  };
}
__name(baseMatches, "baseMatches");
var baseMatches_default = baseMatches;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseHasIn.js
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
__name(baseHasIn, "baseHasIn");
var baseHasIn_default = baseHasIn;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hasPath.js
function hasPath(object, path, hasFunc) {
  path = castPath_default(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey_default(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
__name(hasPath, "hasPath");
var hasPath_default = hasPath;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/hasIn.js
function hasIn(object, path) {
  return object != null && hasPath_default(object, path, baseHasIn_default);
}
__name(hasIn, "hasIn");
var hasIn_default = hasIn;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseMatchesProperty.js
var COMPARE_PARTIAL_FLAG6 = 1;
var COMPARE_UNORDERED_FLAG4 = 2;
function baseMatchesProperty(path, srcValue) {
  if (isKey_default(path) && isStrictComparable_default(srcValue)) {
    return matchesStrictComparable_default(toKey_default(path), srcValue);
  }
  return function(object) {
    var objValue = get_default(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
  };
}
__name(baseMatchesProperty, "baseMatchesProperty");
var baseMatchesProperty_default = baseMatchesProperty;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseProperty.js
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
__name(baseProperty, "baseProperty");
var baseProperty_default = baseProperty;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_basePropertyDeep.js
function basePropertyDeep(path) {
  return function(object) {
    return baseGet_default(object, path);
  };
}
__name(basePropertyDeep, "basePropertyDeep");
var basePropertyDeep_default = basePropertyDeep;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/property.js
function property(path) {
  return isKey_default(path) ? baseProperty_default(toKey_default(path)) : basePropertyDeep_default(path);
}
__name(property, "property");
var property_default = property;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIteratee.js
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_default;
  }
  if (typeof value == "object") {
    return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
  }
  return property_default(value);
}
__name(baseIteratee, "baseIteratee");
var baseIteratee_default = baseIteratee;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseForOwn.js
function baseForOwn(object, iteratee) {
  return object && baseFor_default(object, iteratee, keys_default);
}
__name(baseForOwn, "baseForOwn");
var baseForOwn_default = baseForOwn;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_createBaseEach.js
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_default(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
__name(createBaseEach, "createBaseEach");
var createBaseEach_default = createBaseEach;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseEach.js
var baseEach = createBaseEach_default(baseForOwn_default);
var baseEach_default = baseEach;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/now.js
var now = /* @__PURE__ */ __name(function() {
  return root_default.Date.now();
}, "now");
var now_default = now;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/defaults.js
var objectProto5 = Object.prototype;
var hasOwnProperty4 = objectProto5.hasOwnProperty;
var defaults = baseRest_default(function(object, sources) {
  object = Object(object);
  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : void 0;
  if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
    length = 1;
  }
  while (++index < length) {
    var source = sources[index];
    var props = keysIn_default(source);
    var propsIndex = -1;
    var propsLength = props.length;
    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];
      if (value === void 0 || eq_default(value, objectProto5[key]) && !hasOwnProperty4.call(object, key)) {
        object[key] = source[key];
      }
    }
  }
  return object;
});
var defaults_default = defaults;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayIncludesWith.js
function arrayIncludesWith(array, value, comparator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}
__name(arrayIncludesWith, "arrayIncludesWith");
var arrayIncludesWith_default = arrayIncludesWith;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/last.js
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
__name(last, "last");
var last_default = last;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_castFunction.js
function castFunction(value) {
  return typeof value == "function" ? value : identity_default;
}
__name(castFunction, "castFunction");
var castFunction_default = castFunction;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/forEach.js
function forEach(collection, iteratee) {
  var func = isArray_default(collection) ? arrayEach_default : baseEach_default;
  return func(collection, castFunction_default(iteratee));
}
__name(forEach, "forEach");
var forEach_default = forEach;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseFilter.js
function baseFilter(collection, predicate) {
  var result = [];
  baseEach_default(collection, function(value, index, collection2) {
    if (predicate(value, index, collection2)) {
      result.push(value);
    }
  });
  return result;
}
__name(baseFilter, "baseFilter");
var baseFilter_default = baseFilter;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/filter.js
function filter(collection, predicate) {
  var func = isArray_default(collection) ? arrayFilter_default : baseFilter_default;
  return func(collection, baseIteratee_default(predicate, 3));
}
__name(filter, "filter");
var filter_default = filter;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_createFind.js
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike_default(collection)) {
      var iteratee = baseIteratee_default(predicate, 3);
      collection = keys_default(collection);
      predicate = /* @__PURE__ */ __name(function(key) {
        return iteratee(iterable[key], key, iterable);
      }, "predicate");
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : void 0;
  };
}
__name(createFind, "createFind");
var createFind_default = createFind;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/findIndex.js
var nativeMax = Math.max;
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_default(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex_default(array, baseIteratee_default(predicate, 3), index);
}
__name(findIndex, "findIndex");
var findIndex_default = findIndex;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/find.js
var find = createFind_default(findIndex_default);
var find_default = find;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseMap.js
function baseMap(collection, iteratee) {
  var index = -1, result = isArrayLike_default(collection) ? Array(collection.length) : [];
  baseEach_default(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
__name(baseMap, "baseMap");
var baseMap_default = baseMap;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/map.js
function map(collection, iteratee) {
  var func = isArray_default(collection) ? arrayMap_default : baseMap_default;
  return func(collection, baseIteratee_default(iteratee, 3));
}
__name(map, "map");
var map_default = map;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/forIn.js
function forIn(object, iteratee) {
  return object == null ? object : baseFor_default(object, castFunction_default(iteratee), keysIn_default);
}
__name(forIn, "forIn");
var forIn_default = forIn;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/forOwn.js
function forOwn(object, iteratee) {
  return object && baseForOwn_default(object, castFunction_default(iteratee));
}
__name(forOwn, "forOwn");
var forOwn_default = forOwn;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseGt.js
function baseGt(value, other) {
  return value > other;
}
__name(baseGt, "baseGt");
var baseGt_default = baseGt;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseHas.js
var objectProto6 = Object.prototype;
var hasOwnProperty5 = objectProto6.hasOwnProperty;
function baseHas(object, key) {
  return object != null && hasOwnProperty5.call(object, key);
}
__name(baseHas, "baseHas");
var baseHas_default = baseHas;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/has.js
function has(object, path) {
  return object != null && hasPath_default(object, path, baseHas_default);
}
__name(has, "has");
var has_default = has;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isString.js
var stringTag4 = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray_default(value) && isObjectLike_default(value) && baseGetTag_default(value) == stringTag4;
}
__name(isString, "isString");
var isString_default = isString;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseValues.js
function baseValues(object, props) {
  return arrayMap_default(props, function(key) {
    return object[key];
  });
}
__name(baseValues, "baseValues");
var baseValues_default = baseValues;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/values.js
function values(object) {
  return object == null ? [] : baseValues_default(object, keys_default(object));
}
__name(values, "values");
var values_default = values;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isUndefined.js
function isUndefined(value) {
  return value === void 0;
}
__name(isUndefined, "isUndefined");
var isUndefined_default = isUndefined;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseLt.js
function baseLt(value, other) {
  return value < other;
}
__name(baseLt, "baseLt");
var baseLt_default = baseLt;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/mapValues.js
function mapValues(object, iteratee) {
  var result = {};
  iteratee = baseIteratee_default(iteratee, 3);
  baseForOwn_default(object, function(value, key, object2) {
    baseAssignValue_default(result, key, iteratee(value, key, object2));
  });
  return result;
}
__name(mapValues, "mapValues");
var mapValues_default = mapValues;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseExtremum.js
function baseExtremum(array, iteratee, comparator) {
  var index = -1, length = array.length;
  while (++index < length) {
    var value = array[index], current = iteratee(value);
    if (current != null && (computed === void 0 ? current === current && !isSymbol_default(current) : comparator(current, computed))) {
      var computed = current, result = value;
    }
  }
  return result;
}
__name(baseExtremum, "baseExtremum");
var baseExtremum_default = baseExtremum;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/max.js
function max(array) {
  return array && array.length ? baseExtremum_default(array, identity_default, baseGt_default) : void 0;
}
__name(max, "max");
var max_default = max;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/min.js
function min(array) {
  return array && array.length ? baseExtremum_default(array, identity_default, baseLt_default) : void 0;
}
__name(min, "min");
var min_default = min;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/minBy.js
function minBy(array, iteratee) {
  return array && array.length ? baseExtremum_default(array, baseIteratee_default(iteratee, 2), baseLt_default) : void 0;
}
__name(minBy, "minBy");
var minBy_default = minBy;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseSet.js
function baseSet(object, path, value, customizer) {
  if (!isObject_default(object)) {
    return object;
  }
  path = castPath_default(path, object);
  var index = -1, length = path.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index < length) {
    var key = toKey_default(path[index]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = isObject_default(objValue) ? objValue : isIndex_default(path[index + 1]) ? [] : {};
      }
    }
    assignValue_default(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}
__name(baseSet, "baseSet");
var baseSet_default = baseSet;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_basePickBy.js
function basePickBy(object, paths, predicate) {
  var index = -1, length = paths.length, result = {};
  while (++index < length) {
    var path = paths[index], value = baseGet_default(object, path);
    if (predicate(value, path)) {
      baseSet_default(result, castPath_default(path, object), value);
    }
  }
  return result;
}
__name(basePickBy, "basePickBy");
var basePickBy_default = basePickBy;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseSortBy.js
function baseSortBy(array, comparer) {
  var length = array.length;
  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}
__name(baseSortBy, "baseSortBy");
var baseSortBy_default = baseSortBy;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_compareAscending.js
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol_default(value);
    var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol_default(other);
    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }
    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}
__name(compareAscending, "compareAscending");
var compareAscending_default = compareAscending;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_compareMultiple.js
function compareMultiple(object, other, orders) {
  var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
  while (++index < length) {
    var result = compareAscending_default(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order2 = orders[index];
      return result * (order2 == "desc" ? -1 : 1);
    }
  }
  return object.index - other.index;
}
__name(compareMultiple, "compareMultiple");
var compareMultiple_default = compareMultiple;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseOrderBy.js
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap_default(iteratees, function(iteratee) {
      if (isArray_default(iteratee)) {
        return function(value) {
          return baseGet_default(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        };
      }
      return iteratee;
    });
  } else {
    iteratees = [identity_default];
  }
  var index = -1;
  iteratees = arrayMap_default(iteratees, baseUnary_default(baseIteratee_default));
  var result = baseMap_default(collection, function(value, key, collection2) {
    var criteria = arrayMap_default(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { "criteria": criteria, "index": ++index, "value": value };
  });
  return baseSortBy_default(result, function(object, other) {
    return compareMultiple_default(object, other, orders);
  });
}
__name(baseOrderBy, "baseOrderBy");
var baseOrderBy_default = baseOrderBy;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_asciiSize.js
var asciiSize = baseProperty_default("length");
var asciiSize_default = asciiSize;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_unicodeSize.js
var rsAstralRange2 = "\\ud800-\\udfff";
var rsComboMarksRange2 = "\\u0300-\\u036f";
var reComboHalfMarksRange2 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange2 = "\\u20d0-\\u20ff";
var rsComboRange2 = rsComboMarksRange2 + reComboHalfMarksRange2 + rsComboSymbolsRange2;
var rsVarRange2 = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange2 + "]";
var rsCombo = "[" + rsComboRange2 + "]";
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
var rsNonAstral = "[^" + rsAstralRange2 + "]";
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ2 = "\\u200d";
var reOptMod = rsModifier + "?";
var rsOptVar = "[" + rsVarRange2 + "]?";
var rsOptJoin = "(?:" + rsZWJ2 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeSize(string) {
  var result = reUnicode.lastIndex = 0;
  while (reUnicode.test(string)) {
    ++result;
  }
  return result;
}
__name(unicodeSize, "unicodeSize");
var unicodeSize_default = unicodeSize;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stringSize.js
function stringSize(string) {
  return hasUnicode_default(string) ? unicodeSize_default(string) : asciiSize_default(string);
}
__name(stringSize, "stringSize");
var stringSize_default = stringSize;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_basePick.js
function basePick(object, paths) {
  return basePickBy_default(object, paths, function(value, path) {
    return hasIn_default(object, path);
  });
}
__name(basePick, "basePick");
var basePick_default = basePick;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/pick.js
var pick = flatRest_default(function(object, paths) {
  return object == null ? {} : basePick_default(object, paths);
});
var pick_default = pick;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseRange.js
var nativeCeil = Math.ceil;
var nativeMax2 = Math.max;
function baseRange(start, end, step, fromRight) {
  var index = -1, length = nativeMax2(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}
__name(baseRange, "baseRange");
var baseRange_default = baseRange;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_createRange.js
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != "number" && isIterateeCall_default(start, end, step)) {
      end = step = void 0;
    }
    start = toFinite_default(start);
    if (end === void 0) {
      end = start;
      start = 0;
    } else {
      end = toFinite_default(end);
    }
    step = step === void 0 ? start < end ? 1 : -1 : toFinite_default(step);
    return baseRange_default(start, end, step, fromRight);
  };
}
__name(createRange, "createRange");
var createRange_default = createRange;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/range.js
var range = createRange_default();
var range_default = range;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseReduce.js
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index, collection2) {
    accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
  });
  return accumulator;
}
__name(baseReduce, "baseReduce");
var baseReduce_default = baseReduce;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/reduce.js
function reduce(collection, iteratee, accumulator) {
  var func = isArray_default(collection) ? arrayReduce_default : baseReduce_default, initAccum = arguments.length < 3;
  return func(collection, baseIteratee_default(iteratee, 4), accumulator, initAccum, baseEach_default);
}
__name(reduce, "reduce");
var reduce_default = reduce;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/size.js
var mapTag5 = "[object Map]";
var setTag5 = "[object Set]";
function size(collection) {
  if (collection == null) {
    return 0;
  }
  if (isArrayLike_default(collection)) {
    return isString_default(collection) ? stringSize_default(collection) : collection.length;
  }
  var tag = getTag_default(collection);
  if (tag == mapTag5 || tag == setTag5) {
    return collection.size;
  }
  return baseKeys_default(collection).length;
}
__name(size, "size");
var size_default = size;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/sortBy.js
var sortBy = baseRest_default(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall_default(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall_default(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy_default(collection, baseFlatten_default(iteratees, 1), []);
});
var sortBy_default = sortBy;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_createSet.js
var INFINITY4 = 1 / 0;
var createSet = !(Set_default && 1 / setToArray_default(new Set_default([, -0]))[1] == INFINITY4) ? noop_default : function(values2) {
  return new Set_default(values2);
};
var createSet_default = createSet;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseUniq.js
var LARGE_ARRAY_SIZE = 200;
function baseUniq(array, iteratee, comparator) {
  var index = -1, includes = arrayIncludes_default, length = array.length, isCommon = true, result = [], seen = result;
  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith_default;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet_default(array);
    if (set) {
      return setToArray_default(set);
    }
    isCommon = false;
    includes = cacheHas_default;
    seen = new SetCache_default();
  } else {
    seen = iteratee ? [] : result;
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
  return result;
}
__name(baseUniq, "baseUniq");
var baseUniq_default = baseUniq;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/union.js
var union = baseRest_default(function(arrays) {
  return baseUniq_default(baseFlatten_default(arrays, 1, isArrayLikeObject_default, true));
});
var union_default = union;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/uniqueId.js
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString_default(prefix) + id;
}
__name(uniqueId, "uniqueId");
var uniqueId_default = uniqueId;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseZipObject.js
function baseZipObject(props, values2, assignFunc) {
  var index = -1, length = props.length, valsLength = values2.length, result = {};
  while (++index < length) {
    var value = index < valsLength ? values2[index] : void 0;
    assignFunc(result, props[index], value);
  }
  return result;
}
__name(baseZipObject, "baseZipObject");
var baseZipObject_default = baseZipObject;

// ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/zipObject.js
function zipObject(props, values2) {
  return baseZipObject_default(props || [], values2 || [], assignValue_default);
}
__name(zipObject, "zipObject");
var zipObject_default = zipObject;

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/graphlib/graph.js
var DEFAULT_EDGE_NAME = "\0";
var GRAPH_NODE = "\0";
var EDGE_KEY_DELIM = "";
var Graph = class {
  static {
    __name(this, "Graph");
  }
  constructor(opts = {}) {
    this._isDirected = has_default(opts, "directed") ? opts.directed : true;
    this._isMultigraph = has_default(opts, "multigraph") ? opts.multigraph : false;
    this._isCompound = has_default(opts, "compound") ? opts.compound : false;
    this._label = void 0;
    this._defaultNodeLabelFn = constant_default(void 0);
    this._defaultEdgeLabelFn = constant_default(void 0);
    this._nodes = {};
    if (this._isCompound) {
      this._parent = {};
      this._children = {};
      this._children[GRAPH_NODE] = {};
    }
    this._in = {};
    this._preds = {};
    this._out = {};
    this._sucs = {};
    this._edgeObjs = {};
    this._edgeLabels = {};
  }
  /* === Graph functions ========= */
  isDirected() {
    return this._isDirected;
  }
  isMultigraph() {
    return this._isMultigraph;
  }
  isCompound() {
    return this._isCompound;
  }
  setGraph(label) {
    this._label = label;
    return this;
  }
  graph() {
    return this._label;
  }
  /* === Node functions ========== */
  setDefaultNodeLabel(newDefault) {
    if (!isFunction_default(newDefault)) {
      newDefault = constant_default(newDefault);
    }
    this._defaultNodeLabelFn = newDefault;
    return this;
  }
  nodeCount() {
    return this._nodeCount;
  }
  nodes() {
    return keys_default(this._nodes);
  }
  sources() {
    var self = this;
    return filter_default(this.nodes(), function(v) {
      return isEmpty_default(self._in[v]);
    });
  }
  sinks() {
    var self = this;
    return filter_default(this.nodes(), function(v) {
      return isEmpty_default(self._out[v]);
    });
  }
  setNodes(vs, value) {
    var args = arguments;
    var self = this;
    forEach_default(vs, function(v) {
      if (args.length > 1) {
        self.setNode(v, value);
      } else {
        self.setNode(v);
      }
    });
    return this;
  }
  setNode(v, value) {
    if (has_default(this._nodes, v)) {
      if (arguments.length > 1) {
        this._nodes[v] = value;
      }
      return this;
    }
    this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
    if (this._isCompound) {
      this._parent[v] = GRAPH_NODE;
      this._children[v] = {};
      this._children[GRAPH_NODE][v] = true;
    }
    this._in[v] = {};
    this._preds[v] = {};
    this._out[v] = {};
    this._sucs[v] = {};
    ++this._nodeCount;
    return this;
  }
  node(v) {
    return this._nodes[v];
  }
  hasNode(v) {
    return has_default(this._nodes, v);
  }
  removeNode(v) {
    var self = this;
    if (has_default(this._nodes, v)) {
      var removeEdge = /* @__PURE__ */ __name(function(e) {
        self.removeEdge(self._edgeObjs[e]);
      }, "removeEdge");
      delete this._nodes[v];
      if (this._isCompound) {
        this._removeFromParentsChildList(v);
        delete this._parent[v];
        forEach_default(this.children(v), function(child) {
          self.setParent(child);
        });
        delete this._children[v];
      }
      forEach_default(keys_default(this._in[v]), removeEdge);
      delete this._in[v];
      delete this._preds[v];
      forEach_default(keys_default(this._out[v]), removeEdge);
      delete this._out[v];
      delete this._sucs[v];
      --this._nodeCount;
    }
    return this;
  }
  setParent(v, parent) {
    if (!this._isCompound) {
      throw new Error("Cannot set parent in a non-compound graph");
    }
    if (isUndefined_default(parent)) {
      parent = GRAPH_NODE;
    } else {
      parent += "";
      for (var ancestor = parent; !isUndefined_default(ancestor); ancestor = this.parent(ancestor)) {
        if (ancestor === v) {
          throw new Error("Setting " + parent + " as parent of " + v + " would create a cycle");
        }
      }
      this.setNode(parent);
    }
    this.setNode(v);
    this._removeFromParentsChildList(v);
    this._parent[v] = parent;
    this._children[parent][v] = true;
    return this;
  }
  _removeFromParentsChildList(v) {
    delete this._children[this._parent[v]][v];
  }
  parent(v) {
    if (this._isCompound) {
      var parent = this._parent[v];
      if (parent !== GRAPH_NODE) {
        return parent;
      }
    }
  }
  children(v) {
    if (isUndefined_default(v)) {
      v = GRAPH_NODE;
    }
    if (this._isCompound) {
      var children = this._children[v];
      if (children) {
        return keys_default(children);
      }
    } else if (v === GRAPH_NODE) {
      return this.nodes();
    } else if (this.hasNode(v)) {
      return [];
    }
  }
  predecessors(v) {
    var predsV = this._preds[v];
    if (predsV) {
      return keys_default(predsV);
    }
  }
  successors(v) {
    var sucsV = this._sucs[v];
    if (sucsV) {
      return keys_default(sucsV);
    }
  }
  neighbors(v) {
    var preds = this.predecessors(v);
    if (preds) {
      return union_default(preds, this.successors(v));
    }
  }
  isLeaf(v) {
    var neighbors;
    if (this.isDirected()) {
      neighbors = this.successors(v);
    } else {
      neighbors = this.neighbors(v);
    }
    return neighbors.length === 0;
  }
  filterNodes(filter2) {
    var copy = new this.constructor({
      directed: this._isDirected,
      multigraph: this._isMultigraph,
      compound: this._isCompound
    });
    copy.setGraph(this.graph());
    var self = this;
    forEach_default(this._nodes, function(value, v) {
      if (filter2(v)) {
        copy.setNode(v, value);
      }
    });
    forEach_default(this._edgeObjs, function(e) {
      if (copy.hasNode(e.v) && copy.hasNode(e.w)) {
        copy.setEdge(e, self.edge(e));
      }
    });
    var parents = {};
    function findParent(v) {
      var parent = self.parent(v);
      if (parent === void 0 || copy.hasNode(parent)) {
        parents[v] = parent;
        return parent;
      } else if (parent in parents) {
        return parents[parent];
      } else {
        return findParent(parent);
      }
    }
    __name(findParent, "findParent");
    if (this._isCompound) {
      forEach_default(copy.nodes(), function(v) {
        copy.setParent(v, findParent(v));
      });
    }
    return copy;
  }
  /* === Edge functions ========== */
  setDefaultEdgeLabel(newDefault) {
    if (!isFunction_default(newDefault)) {
      newDefault = constant_default(newDefault);
    }
    this._defaultEdgeLabelFn = newDefault;
    return this;
  }
  edgeCount() {
    return this._edgeCount;
  }
  edges() {
    return values_default(this._edgeObjs);
  }
  setPath(vs, value) {
    var self = this;
    var args = arguments;
    reduce_default(vs, function(v, w) {
      if (args.length > 1) {
        self.setEdge(v, w, value);
      } else {
        self.setEdge(v, w);
      }
      return w;
    });
    return this;
  }
  /*
   * setEdge(v, w, [value, [name]])
   * setEdge({ v, w, [name] }, [value])
   */
  setEdge() {
    var v, w, name, value;
    var valueSpecified = false;
    var arg0 = arguments[0];
    if (typeof arg0 === "object" && arg0 !== null && "v" in arg0) {
      v = arg0.v;
      w = arg0.w;
      name = arg0.name;
      if (arguments.length === 2) {
        value = arguments[1];
        valueSpecified = true;
      }
    } else {
      v = arg0;
      w = arguments[1];
      name = arguments[3];
      if (arguments.length > 2) {
        value = arguments[2];
        valueSpecified = true;
      }
    }
    v = "" + v;
    w = "" + w;
    if (!isUndefined_default(name)) {
      name = "" + name;
    }
    var e = edgeArgsToId(this._isDirected, v, w, name);
    if (has_default(this._edgeLabels, e)) {
      if (valueSpecified) {
        this._edgeLabels[e] = value;
      }
      return this;
    }
    if (!isUndefined_default(name) && !this._isMultigraph) {
      throw new Error("Cannot set a named edge when isMultigraph = false");
    }
    this.setNode(v);
    this.setNode(w);
    this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);
    var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);
    v = edgeObj.v;
    w = edgeObj.w;
    Object.freeze(edgeObj);
    this._edgeObjs[e] = edgeObj;
    incrementOrInitEntry(this._preds[w], v);
    incrementOrInitEntry(this._sucs[v], w);
    this._in[w][e] = edgeObj;
    this._out[v][e] = edgeObj;
    this._edgeCount++;
    return this;
  }
  edge(v, w, name) {
    var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
    return this._edgeLabels[e];
  }
  hasEdge(v, w, name) {
    var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
    return has_default(this._edgeLabels, e);
  }
  removeEdge(v, w, name) {
    var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
    var edge = this._edgeObjs[e];
    if (edge) {
      v = edge.v;
      w = edge.w;
      delete this._edgeLabels[e];
      delete this._edgeObjs[e];
      decrementOrRemoveEntry(this._preds[w], v);
      decrementOrRemoveEntry(this._sucs[v], w);
      delete this._in[w][e];
      delete this._out[v][e];
      this._edgeCount--;
    }
    return this;
  }
  inEdges(v, u) {
    var inV = this._in[v];
    if (inV) {
      var edges = values_default(inV);
      if (!u) {
        return edges;
      }
      return filter_default(edges, function(edge) {
        return edge.v === u;
      });
    }
  }
  outEdges(v, w) {
    var outV = this._out[v];
    if (outV) {
      var edges = values_default(outV);
      if (!w) {
        return edges;
      }
      return filter_default(edges, function(edge) {
        return edge.w === w;
      });
    }
  }
  nodeEdges(v, w) {
    var inEdges = this.inEdges(v, w);
    if (inEdges) {
      return inEdges.concat(this.outEdges(v, w));
    }
  }
};
Graph.prototype._nodeCount = 0;
Graph.prototype._edgeCount = 0;
function incrementOrInitEntry(map2, k) {
  if (map2[k]) {
    map2[k]++;
  } else {
    map2[k] = 1;
  }
}
__name(incrementOrInitEntry, "incrementOrInitEntry");
function decrementOrRemoveEntry(map2, k) {
  if (!--map2[k]) {
    delete map2[k];
  }
}
__name(decrementOrRemoveEntry, "decrementOrRemoveEntry");
function edgeArgsToId(isDirected, v_, w_, name) {
  var v = "" + v_;
  var w = "" + w_;
  if (!isDirected && v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM + (isUndefined_default(name) ? DEFAULT_EDGE_NAME : name);
}
__name(edgeArgsToId, "edgeArgsToId");
function edgeArgsToObj(isDirected, v_, w_, name) {
  var v = "" + v_;
  var w = "" + w_;
  if (!isDirected && v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  var edgeObj = { v, w };
  if (name) {
    edgeObj.name = name;
  }
  return edgeObj;
}
__name(edgeArgsToObj, "edgeArgsToObj");
function edgeObjToId(isDirected, edgeObj) {
  return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}
__name(edgeObjToId, "edgeObjToId");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/util.js
function addDummyNode(g, type, attrs, name) {
  var v;
  do {
    v = uniqueId_default(name);
  } while (g.hasNode(v));
  attrs.dummy = type;
  g.setNode(v, attrs);
  return v;
}
__name(addDummyNode, "addDummyNode");
function simplify(g) {
  var simplified = new Graph().setGraph(g.graph());
  forEach_default(g.nodes(), function(v) {
    simplified.setNode(v, g.node(v));
  });
  forEach_default(g.edges(), function(e) {
    var simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 };
    var label = g.edge(e);
    simplified.setEdge(e.v, e.w, {
      weight: simpleLabel.weight + label.weight,
      minlen: Math.max(simpleLabel.minlen, label.minlen)
    });
  });
  return simplified;
}
__name(simplify, "simplify");
function asNonCompoundGraph(g) {
  var simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
  forEach_default(g.nodes(), function(v) {
    if (!g.children(v).length) {
      simplified.setNode(v, g.node(v));
    }
  });
  forEach_default(g.edges(), function(e) {
    simplified.setEdge(e, g.edge(e));
  });
  return simplified;
}
__name(asNonCompoundGraph, "asNonCompoundGraph");
function intersectRect(rect, point) {
  var x = rect.x;
  var y = rect.y;
  var dx = point.x - x;
  var dy = point.y - y;
  var w = rect.width / 2;
  var h = rect.height / 2;
  if (!dx && !dy) {
    throw new Error("Not possible to find intersection inside of the rectangle");
  }
  var sx, sy;
  if (Math.abs(dy) * w > Math.abs(dx) * h) {
    if (dy < 0) {
      h = -h;
    }
    sx = h * dx / dy;
    sy = h;
  } else {
    if (dx < 0) {
      w = -w;
    }
    sx = w;
    sy = w * dy / dx;
  }
  return { x: x + sx, y: y + sy };
}
__name(intersectRect, "intersectRect");
function buildLayerMatrix(g) {
  var layering = map_default(range_default(maxRank(g) + 1), function() {
    return [];
  });
  forEach_default(g.nodes(), function(v) {
    var node = g.node(v);
    var rank2 = node.rank;
    if (!isUndefined_default(rank2)) {
      layering[rank2][node.order] = v;
    }
  });
  return layering;
}
__name(buildLayerMatrix, "buildLayerMatrix");
function normalizeRanks(g) {
  var min2 = min_default(
    map_default(g.nodes(), function(v) {
      return g.node(v).rank;
    })
  );
  forEach_default(g.nodes(), function(v) {
    var node = g.node(v);
    if (has_default(node, "rank")) {
      node.rank -= min2;
    }
  });
}
__name(normalizeRanks, "normalizeRanks");
function removeEmptyRanks(g) {
  var offset = min_default(
    map_default(g.nodes(), function(v) {
      return g.node(v).rank;
    })
  );
  var layers = [];
  forEach_default(g.nodes(), function(v) {
    var rank2 = g.node(v).rank - offset;
    if (!layers[rank2]) {
      layers[rank2] = [];
    }
    layers[rank2].push(v);
  });
  var delta = 0;
  var nodeRankFactor = g.graph().nodeRankFactor;
  forEach_default(layers, function(vs, i) {
    if (isUndefined_default(vs) && i % nodeRankFactor !== 0) {
      --delta;
    } else if (delta) {
      forEach_default(vs, function(v) {
        g.node(v).rank += delta;
      });
    }
  });
}
__name(removeEmptyRanks, "removeEmptyRanks");
function addBorderNode(g, prefix, rank2, order2) {
  var node = {
    width: 0,
    height: 0
  };
  if (arguments.length >= 4) {
    node.rank = rank2;
    node.order = order2;
  }
  return addDummyNode(g, "border", node, prefix);
}
__name(addBorderNode, "addBorderNode");
function maxRank(g) {
  return max_default(
    map_default(g.nodes(), function(v) {
      var rank2 = g.node(v).rank;
      if (!isUndefined_default(rank2)) {
        return rank2;
      }
    })
  );
}
__name(maxRank, "maxRank");
function partition(collection, fn) {
  var result = { lhs: [], rhs: [] };
  forEach_default(collection, function(value) {
    if (fn(value)) {
      result.lhs.push(value);
    } else {
      result.rhs.push(value);
    }
  });
  return result;
}
__name(partition, "partition");
function time(name, fn) {
  var start = now_default();
  try {
    return fn();
  } finally {
    console.log(name + " time: " + (now_default() - start) + "ms");
  }
}
__name(time, "time");
function notime(name, fn) {
  return fn();
}
__name(notime, "notime");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/add-border-segments.js
function addBorderSegments(g) {
  function dfs3(v) {
    var children = g.children(v);
    var node = g.node(v);
    if (children.length) {
      forEach_default(children, dfs3);
    }
    if (has_default(node, "minRank")) {
      node.borderLeft = [];
      node.borderRight = [];
      for (var rank2 = node.minRank, maxRank2 = node.maxRank + 1; rank2 < maxRank2; ++rank2) {
        addBorderNode2(g, "borderLeft", "_bl", v, node, rank2);
        addBorderNode2(g, "borderRight", "_br", v, node, rank2);
      }
    }
  }
  __name(dfs3, "dfs");
  forEach_default(g.children(), dfs3);
}
__name(addBorderSegments, "addBorderSegments");
function addBorderNode2(g, prop, prefix, sg, sgNode, rank2) {
  var label = { width: 0, height: 0, rank: rank2, borderType: prop };
  var prev = sgNode[prop][rank2 - 1];
  var curr = addDummyNode(g, "border", label, prefix);
  sgNode[prop][rank2] = curr;
  g.setParent(curr, sg);
  if (prev) {
    g.setEdge(prev, curr, { weight: 1 });
  }
}
__name(addBorderNode2, "addBorderNode");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/coordinate-system.js
function adjust(g) {
  var rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === "lr" || rankDir === "rl") {
    swapWidthHeight(g);
  }
}
__name(adjust, "adjust");
function undo(g) {
  var rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === "bt" || rankDir === "rl") {
    reverseY(g);
  }
  if (rankDir === "lr" || rankDir === "rl") {
    swapXY(g);
    swapWidthHeight(g);
  }
}
__name(undo, "undo");
function swapWidthHeight(g) {
  forEach_default(g.nodes(), function(v) {
    swapWidthHeightOne(g.node(v));
  });
  forEach_default(g.edges(), function(e) {
    swapWidthHeightOne(g.edge(e));
  });
}
__name(swapWidthHeight, "swapWidthHeight");
function swapWidthHeightOne(attrs) {
  var w = attrs.width;
  attrs.width = attrs.height;
  attrs.height = w;
}
__name(swapWidthHeightOne, "swapWidthHeightOne");
function reverseY(g) {
  forEach_default(g.nodes(), function(v) {
    reverseYOne(g.node(v));
  });
  forEach_default(g.edges(), function(e) {
    var edge = g.edge(e);
    forEach_default(edge.points, reverseYOne);
    if (has_default(edge, "y")) {
      reverseYOne(edge);
    }
  });
}
__name(reverseY, "reverseY");
function reverseYOne(attrs) {
  attrs.y = -attrs.y;
}
__name(reverseYOne, "reverseYOne");
function swapXY(g) {
  forEach_default(g.nodes(), function(v) {
    swapXYOne(g.node(v));
  });
  forEach_default(g.edges(), function(e) {
    var edge = g.edge(e);
    forEach_default(edge.points, swapXYOne);
    if (has_default(edge, "x")) {
      swapXYOne(edge);
    }
  });
}
__name(swapXY, "swapXY");
function swapXYOne(attrs) {
  var x = attrs.x;
  attrs.x = attrs.y;
  attrs.y = x;
}
__name(swapXYOne, "swapXYOne");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/data/list.js
var List = class {
  static {
    __name(this, "List");
  }
  constructor() {
    var sentinel = {};
    sentinel._next = sentinel._prev = sentinel;
    this._sentinel = sentinel;
  }
  dequeue() {
    var sentinel = this._sentinel;
    var entry = sentinel._prev;
    if (entry !== sentinel) {
      unlink(entry);
      return entry;
    }
  }
  enqueue(entry) {
    var sentinel = this._sentinel;
    if (entry._prev && entry._next) {
      unlink(entry);
    }
    entry._next = sentinel._next;
    sentinel._next._prev = entry;
    sentinel._next = entry;
    entry._prev = sentinel;
  }
  toString() {
    var strs = [];
    var sentinel = this._sentinel;
    var curr = sentinel._prev;
    while (curr !== sentinel) {
      strs.push(JSON.stringify(curr, filterOutLinks));
      curr = curr._prev;
    }
    return "[" + strs.join(", ") + "]";
  }
};
function unlink(entry) {
  entry._prev._next = entry._next;
  entry._next._prev = entry._prev;
  delete entry._next;
  delete entry._prev;
}
__name(unlink, "unlink");
function filterOutLinks(k, v) {
  if (k !== "_next" && k !== "_prev") {
    return v;
  }
}
__name(filterOutLinks, "filterOutLinks");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/greedy-fas.js
var DEFAULT_WEIGHT_FN = constant_default(1);
function greedyFAS(g, weightFn) {
  if (g.nodeCount() <= 1) {
    return [];
  }
  var state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
  var results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);
  return flatten_default(
    map_default(results, function(e) {
      return g.outEdges(e.v, e.w);
    })
  );
}
__name(greedyFAS, "greedyFAS");
function doGreedyFAS(g, buckets, zeroIdx) {
  var results = [];
  var sources = buckets[buckets.length - 1];
  var sinks = buckets[0];
  var entry;
  while (g.nodeCount()) {
    while (entry = sinks.dequeue()) {
      removeNode(g, buckets, zeroIdx, entry);
    }
    while (entry = sources.dequeue()) {
      removeNode(g, buckets, zeroIdx, entry);
    }
    if (g.nodeCount()) {
      for (var i = buckets.length - 2; i > 0; --i) {
        entry = buckets[i].dequeue();
        if (entry) {
          results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
          break;
        }
      }
    }
  }
  return results;
}
__name(doGreedyFAS, "doGreedyFAS");
function removeNode(g, buckets, zeroIdx, entry, collectPredecessors) {
  var results = collectPredecessors ? [] : void 0;
  forEach_default(g.inEdges(entry.v), function(edge) {
    var weight = g.edge(edge);
    var uEntry = g.node(edge.v);
    if (collectPredecessors) {
      results.push({ v: edge.v, w: edge.w });
    }
    uEntry.out -= weight;
    assignBucket(buckets, zeroIdx, uEntry);
  });
  forEach_default(g.outEdges(entry.v), function(edge) {
    var weight = g.edge(edge);
    var w = edge.w;
    var wEntry = g.node(w);
    wEntry["in"] -= weight;
    assignBucket(buckets, zeroIdx, wEntry);
  });
  g.removeNode(entry.v);
  return results;
}
__name(removeNode, "removeNode");
function buildState(g, weightFn) {
  var fasGraph = new Graph();
  var maxIn = 0;
  var maxOut = 0;
  forEach_default(g.nodes(), function(v) {
    fasGraph.setNode(v, { v, in: 0, out: 0 });
  });
  forEach_default(g.edges(), function(e) {
    var prevWeight = fasGraph.edge(e.v, e.w) || 0;
    var weight = weightFn(e);
    var edgeWeight = prevWeight + weight;
    fasGraph.setEdge(e.v, e.w, edgeWeight);
    maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
    maxIn = Math.max(maxIn, fasGraph.node(e.w)["in"] += weight);
  });
  var buckets = range_default(maxOut + maxIn + 3).map(function() {
    return new List();
  });
  var zeroIdx = maxIn + 1;
  forEach_default(fasGraph.nodes(), function(v) {
    assignBucket(buckets, zeroIdx, fasGraph.node(v));
  });
  return { graph: fasGraph, buckets, zeroIdx };
}
__name(buildState, "buildState");
function assignBucket(buckets, zeroIdx, entry) {
  if (!entry.out) {
    buckets[0].enqueue(entry);
  } else if (!entry["in"]) {
    buckets[buckets.length - 1].enqueue(entry);
  } else {
    buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
  }
}
__name(assignBucket, "assignBucket");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/acyclic.js
function run(g) {
  var fas = g.graph().acyclicer === "greedy" ? greedyFAS(g, weightFn(g)) : dfsFAS(g);
  forEach_default(fas, function(e) {
    var label = g.edge(e);
    g.removeEdge(e);
    label.forwardName = e.name;
    label.reversed = true;
    g.setEdge(e.w, e.v, label, uniqueId_default("rev"));
  });
  function weightFn(g2) {
    return function(e) {
      return g2.edge(e).weight;
    };
  }
  __name(weightFn, "weightFn");
}
__name(run, "run");
function dfsFAS(g) {
  var fas = [];
  var stack = {};
  var visited = {};
  function dfs3(v) {
    if (has_default(visited, v)) {
      return;
    }
    visited[v] = true;
    stack[v] = true;
    forEach_default(g.outEdges(v), function(e) {
      if (has_default(stack, e.w)) {
        fas.push(e);
      } else {
        dfs3(e.w);
      }
    });
    delete stack[v];
  }
  __name(dfs3, "dfs");
  forEach_default(g.nodes(), dfs3);
  return fas;
}
__name(dfsFAS, "dfsFAS");
function undo2(g) {
  forEach_default(g.edges(), function(e) {
    var label = g.edge(e);
    if (label.reversed) {
      g.removeEdge(e);
      var forwardName = label.forwardName;
      delete label.reversed;
      delete label.forwardName;
      g.setEdge(e.w, e.v, label, forwardName);
    }
  });
}
__name(undo2, "undo");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/normalize.js
function run2(g) {
  g.graph().dummyChains = [];
  forEach_default(g.edges(), function(edge) {
    normalizeEdge(g, edge);
  });
}
__name(run2, "run");
function normalizeEdge(g, e) {
  var v = e.v;
  var vRank = g.node(v).rank;
  var w = e.w;
  var wRank = g.node(w).rank;
  var name = e.name;
  var edgeLabel = g.edge(e);
  var labelRank = edgeLabel.labelRank;
  if (wRank === vRank + 1)
    return;
  g.removeEdge(e);
  var dummy, attrs, i;
  for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
    edgeLabel.points = [];
    attrs = {
      width: 0,
      height: 0,
      edgeLabel,
      edgeObj: e,
      rank: vRank
    };
    dummy = addDummyNode(g, "edge", attrs, "_d");
    if (vRank === labelRank) {
      attrs.width = edgeLabel.width;
      attrs.height = edgeLabel.height;
      attrs.dummy = "edge-label";
      attrs.labelpos = edgeLabel.labelpos;
    }
    g.setEdge(v, dummy, { weight: edgeLabel.weight }, name);
    if (i === 0) {
      g.graph().dummyChains.push(dummy);
    }
    v = dummy;
  }
  g.setEdge(v, w, { weight: edgeLabel.weight }, name);
}
__name(normalizeEdge, "normalizeEdge");
function undo3(g) {
  forEach_default(g.graph().dummyChains, function(v) {
    var node = g.node(v);
    var origLabel = node.edgeLabel;
    var w;
    g.setEdge(node.edgeObj, origLabel);
    while (node.dummy) {
      w = g.successors(v)[0];
      g.removeNode(v);
      origLabel.points.push({ x: node.x, y: node.y });
      if (node.dummy === "edge-label") {
        origLabel.x = node.x;
        origLabel.y = node.y;
        origLabel.width = node.width;
        origLabel.height = node.height;
      }
      v = w;
      node = g.node(v);
    }
  });
}
__name(undo3, "undo");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/rank/util.js
function longestPath(g) {
  var visited = {};
  function dfs3(v) {
    var label = g.node(v);
    if (has_default(visited, v)) {
      return label.rank;
    }
    visited[v] = true;
    var rank2 = min_default(
      map_default(g.outEdges(v), function(e) {
        return dfs3(e.w) - g.edge(e).minlen;
      })
    );
    if (rank2 === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
    rank2 === void 0 || // return value of _.map([]) for Lodash 4
    rank2 === null) {
      rank2 = 0;
    }
    return label.rank = rank2;
  }
  __name(dfs3, "dfs");
  forEach_default(g.sources(), dfs3);
}
__name(longestPath, "longestPath");
function slack(g, e) {
  return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
}
__name(slack, "slack");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/rank/feasible-tree.js
function feasibleTree(g) {
  var t = new Graph({ directed: false });
  var start = g.nodes()[0];
  var size2 = g.nodeCount();
  t.setNode(start, {});
  var edge, delta;
  while (tightTree(t, g) < size2) {
    edge = findMinSlackEdge(t, g);
    delta = t.hasNode(edge.v) ? slack(g, edge) : -slack(g, edge);
    shiftRanks(t, g, delta);
  }
  return t;
}
__name(feasibleTree, "feasibleTree");
function tightTree(t, g) {
  function dfs3(v) {
    forEach_default(g.nodeEdges(v), function(e) {
      var edgeV = e.v, w = v === edgeV ? e.w : edgeV;
      if (!t.hasNode(w) && !slack(g, e)) {
        t.setNode(w, {});
        t.setEdge(v, w, {});
        dfs3(w);
      }
    });
  }
  __name(dfs3, "dfs");
  forEach_default(t.nodes(), dfs3);
  return t.nodeCount();
}
__name(tightTree, "tightTree");
function findMinSlackEdge(t, g) {
  return minBy_default(g.edges(), function(e) {
    if (t.hasNode(e.v) !== t.hasNode(e.w)) {
      return slack(g, e);
    }
  });
}
__name(findMinSlackEdge, "findMinSlackEdge");
function shiftRanks(t, g, delta) {
  forEach_default(t.nodes(), function(v) {
    g.node(v).rank += delta;
  });
}
__name(shiftRanks, "shiftRanks");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/graphlib/alg/dijkstra.js
var DEFAULT_WEIGHT_FUNC = constant_default(1);

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/graphlib/alg/floyd-warshall.js
var DEFAULT_WEIGHT_FUNC2 = constant_default(1);

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/graphlib/alg/topsort.js
topsort.CycleException = CycleException;
function topsort(g) {
  var visited = {};
  var stack = {};
  var results = [];
  function visit(node) {
    if (has_default(stack, node)) {
      throw new CycleException();
    }
    if (!has_default(visited, node)) {
      stack[node] = true;
      visited[node] = true;
      forEach_default(g.predecessors(node), visit);
      delete stack[node];
      results.push(node);
    }
  }
  __name(visit, "visit");
  forEach_default(g.sinks(), visit);
  if (size_default(visited) !== g.nodeCount()) {
    throw new CycleException();
  }
  return results;
}
__name(topsort, "topsort");
function CycleException() {
}
__name(CycleException, "CycleException");
CycleException.prototype = new Error();

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/graphlib/alg/dfs.js
function dfs(g, vs, order2) {
  if (!isArray_default(vs)) {
    vs = [vs];
  }
  var navigation = (g.isDirected() ? g.successors : g.neighbors).bind(g);
  var acc = [];
  var visited = {};
  forEach_default(vs, function(v) {
    if (!g.hasNode(v)) {
      throw new Error("Graph does not have node: " + v);
    }
    doDfs(g, v, order2 === "post", visited, navigation, acc);
  });
  return acc;
}
__name(dfs, "dfs");
function doDfs(g, v, postorder3, visited, navigation, acc) {
  if (!has_default(visited, v)) {
    visited[v] = true;
    if (!postorder3) {
      acc.push(v);
    }
    forEach_default(navigation(v), function(w) {
      doDfs(g, w, postorder3, visited, navigation, acc);
    });
    if (postorder3) {
      acc.push(v);
    }
  }
}
__name(doDfs, "doDfs");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/graphlib/alg/postorder.js
function postorder(g, vs) {
  return dfs(g, vs, "post");
}
__name(postorder, "postorder");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/graphlib/alg/preorder.js
function preorder(g, vs) {
  return dfs(g, vs, "pre");
}
__name(preorder, "preorder");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/rank/network-simplex.js
networkSimplex.initLowLimValues = initLowLimValues;
networkSimplex.initCutValues = initCutValues;
networkSimplex.calcCutValue = calcCutValue;
networkSimplex.leaveEdge = leaveEdge;
networkSimplex.enterEdge = enterEdge;
networkSimplex.exchangeEdges = exchangeEdges;
function networkSimplex(g) {
  g = simplify(g);
  longestPath(g);
  var t = feasibleTree(g);
  initLowLimValues(t);
  initCutValues(t, g);
  var e, f;
  while (e = leaveEdge(t)) {
    f = enterEdge(t, g, e);
    exchangeEdges(t, g, e, f);
  }
}
__name(networkSimplex, "networkSimplex");
function initCutValues(t, g) {
  var vs = postorder(t, t.nodes());
  vs = vs.slice(0, vs.length - 1);
  forEach_default(vs, function(v) {
    assignCutValue(t, g, v);
  });
}
__name(initCutValues, "initCutValues");
function assignCutValue(t, g, child) {
  var childLab = t.node(child);
  var parent = childLab.parent;
  t.edge(child, parent).cutvalue = calcCutValue(t, g, child);
}
__name(assignCutValue, "assignCutValue");
function calcCutValue(t, g, child) {
  var childLab = t.node(child);
  var parent = childLab.parent;
  var childIsTail = true;
  var graphEdge = g.edge(child, parent);
  var cutValue = 0;
  if (!graphEdge) {
    childIsTail = false;
    graphEdge = g.edge(parent, child);
  }
  cutValue = graphEdge.weight;
  forEach_default(g.nodeEdges(child), function(e) {
    var isOutEdge = e.v === child, other = isOutEdge ? e.w : e.v;
    if (other !== parent) {
      var pointsToHead = isOutEdge === childIsTail, otherWeight = g.edge(e).weight;
      cutValue += pointsToHead ? otherWeight : -otherWeight;
      if (isTreeEdge(t, child, other)) {
        var otherCutValue = t.edge(child, other).cutvalue;
        cutValue += pointsToHead ? -otherCutValue : otherCutValue;
      }
    }
  });
  return cutValue;
}
__name(calcCutValue, "calcCutValue");
function initLowLimValues(tree, root) {
  if (arguments.length < 2) {
    root = tree.nodes()[0];
  }
  dfsAssignLowLim(tree, {}, 1, root);
}
__name(initLowLimValues, "initLowLimValues");
function dfsAssignLowLim(tree, visited, nextLim, v, parent) {
  var low = nextLim;
  var label = tree.node(v);
  visited[v] = true;
  forEach_default(tree.neighbors(v), function(w) {
    if (!has_default(visited, w)) {
      nextLim = dfsAssignLowLim(tree, visited, nextLim, w, v);
    }
  });
  label.low = low;
  label.lim = nextLim++;
  if (parent) {
    label.parent = parent;
  } else {
    delete label.parent;
  }
  return nextLim;
}
__name(dfsAssignLowLim, "dfsAssignLowLim");
function leaveEdge(tree) {
  return find_default(tree.edges(), function(e) {
    return tree.edge(e).cutvalue < 0;
  });
}
__name(leaveEdge, "leaveEdge");
function enterEdge(t, g, edge) {
  var v = edge.v;
  var w = edge.w;
  if (!g.hasEdge(v, w)) {
    v = edge.w;
    w = edge.v;
  }
  var vLabel = t.node(v);
  var wLabel = t.node(w);
  var tailLabel = vLabel;
  var flip = false;
  if (vLabel.lim > wLabel.lim) {
    tailLabel = wLabel;
    flip = true;
  }
  var candidates = filter_default(g.edges(), function(edge2) {
    return flip === isDescendant(t, t.node(edge2.v), tailLabel) && flip !== isDescendant(t, t.node(edge2.w), tailLabel);
  });
  return minBy_default(candidates, function(edge2) {
    return slack(g, edge2);
  });
}
__name(enterEdge, "enterEdge");
function exchangeEdges(t, g, e, f) {
  var v = e.v;
  var w = e.w;
  t.removeEdge(v, w);
  t.setEdge(f.v, f.w, {});
  initLowLimValues(t);
  initCutValues(t, g);
  updateRanks(t, g);
}
__name(exchangeEdges, "exchangeEdges");
function updateRanks(t, g) {
  var root = find_default(t.nodes(), function(v) {
    return !g.node(v).parent;
  });
  var vs = preorder(t, root);
  vs = vs.slice(1);
  forEach_default(vs, function(v) {
    var parent = t.node(v).parent, edge = g.edge(v, parent), flipped = false;
    if (!edge) {
      edge = g.edge(parent, v);
      flipped = true;
    }
    g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
  });
}
__name(updateRanks, "updateRanks");
function isTreeEdge(tree, u, v) {
  return tree.hasEdge(u, v);
}
__name(isTreeEdge, "isTreeEdge");
function isDescendant(tree, vLabel, rootLabel) {
  return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
}
__name(isDescendant, "isDescendant");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/rank/index.js
function rank(g) {
  switch (g.graph().ranker) {
    case "network-simplex":
      networkSimplexRanker(g);
      break;
    case "tight-tree":
      tightTreeRanker(g);
      break;
    case "longest-path":
      longestPathRanker(g);
      break;
    default:
      networkSimplexRanker(g);
  }
}
__name(rank, "rank");
var longestPathRanker = longestPath;
function tightTreeRanker(g) {
  longestPath(g);
  feasibleTree(g);
}
__name(tightTreeRanker, "tightTreeRanker");
function networkSimplexRanker(g) {
  networkSimplex(g);
}
__name(networkSimplexRanker, "networkSimplexRanker");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/nesting-graph.js
function run3(g) {
  var root = addDummyNode(g, "root", {}, "_root");
  var depths = treeDepths(g);
  var height = max_default(values_default(depths)) - 1;
  var nodeSep = 2 * height + 1;
  g.graph().nestingRoot = root;
  forEach_default(g.edges(), function(e) {
    g.edge(e).minlen *= nodeSep;
  });
  var weight = sumWeights(g) + 1;
  forEach_default(g.children(), function(child) {
    dfs2(g, root, nodeSep, weight, height, depths, child);
  });
  g.graph().nodeRankFactor = nodeSep;
}
__name(run3, "run");
function dfs2(g, root, nodeSep, weight, height, depths, v) {
  var children = g.children(v);
  if (!children.length) {
    if (v !== root) {
      g.setEdge(root, v, { weight: 0, minlen: nodeSep });
    }
    return;
  }
  var top = addBorderNode(g, "_bt");
  var bottom = addBorderNode(g, "_bb");
  var label = g.node(v);
  g.setParent(top, v);
  label.borderTop = top;
  g.setParent(bottom, v);
  label.borderBottom = bottom;
  forEach_default(children, function(child) {
    dfs2(g, root, nodeSep, weight, height, depths, child);
    var childNode = g.node(child);
    var childTop = childNode.borderTop ? childNode.borderTop : child;
    var childBottom = childNode.borderBottom ? childNode.borderBottom : child;
    var thisWeight = childNode.borderTop ? weight : 2 * weight;
    var minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;
    g.setEdge(top, childTop, {
      weight: thisWeight,
      minlen,
      nestingEdge: true
    });
    g.setEdge(childBottom, bottom, {
      weight: thisWeight,
      minlen,
      nestingEdge: true
    });
  });
  if (!g.parent(v)) {
    g.setEdge(root, top, { weight: 0, minlen: height + depths[v] });
  }
}
__name(dfs2, "dfs");
function treeDepths(g) {
  var depths = {};
  function dfs3(v, depth) {
    var children = g.children(v);
    if (children && children.length) {
      forEach_default(children, function(child) {
        dfs3(child, depth + 1);
      });
    }
    depths[v] = depth;
  }
  __name(dfs3, "dfs");
  forEach_default(g.children(), function(v) {
    dfs3(v, 1);
  });
  return depths;
}
__name(treeDepths, "treeDepths");
function sumWeights(g) {
  return reduce_default(
    g.edges(),
    function(acc, e) {
      return acc + g.edge(e).weight;
    },
    0
  );
}
__name(sumWeights, "sumWeights");
function cleanup(g) {
  var graphLabel = g.graph();
  g.removeNode(graphLabel.nestingRoot);
  delete graphLabel.nestingRoot;
  forEach_default(g.edges(), function(e) {
    var edge = g.edge(e);
    if (edge.nestingEdge) {
      g.removeEdge(e);
    }
  });
}
__name(cleanup, "cleanup");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/order/add-subgraph-constraints.js
function addSubgraphConstraints(g, cg, vs) {
  var prev = {}, rootPrev;
  forEach_default(vs, function(v) {
    var child = g.parent(v), parent, prevChild;
    while (child) {
      parent = g.parent(child);
      if (parent) {
        prevChild = prev[parent];
        prev[parent] = child;
      } else {
        prevChild = rootPrev;
        rootPrev = child;
      }
      if (prevChild && prevChild !== child) {
        cg.setEdge(prevChild, child);
        return;
      }
      child = parent;
    }
  });
}
__name(addSubgraphConstraints, "addSubgraphConstraints");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/order/build-layer-graph.js
function buildLayerGraph(g, rank2, relationship) {
  var root = createRootNode(g), result = new Graph({ compound: true }).setGraph({ root }).setDefaultNodeLabel(function(v) {
    return g.node(v);
  });
  forEach_default(g.nodes(), function(v) {
    var node = g.node(v), parent = g.parent(v);
    if (node.rank === rank2 || node.minRank <= rank2 && rank2 <= node.maxRank) {
      result.setNode(v);
      result.setParent(v, parent || root);
      forEach_default(g[relationship](v), function(e) {
        var u = e.v === v ? e.w : e.v, edge = result.edge(u, v), weight = !isUndefined_default(edge) ? edge.weight : 0;
        result.setEdge(u, v, { weight: g.edge(e).weight + weight });
      });
      if (has_default(node, "minRank")) {
        result.setNode(v, {
          borderLeft: node.borderLeft[rank2],
          borderRight: node.borderRight[rank2]
        });
      }
    }
  });
  return result;
}
__name(buildLayerGraph, "buildLayerGraph");
function createRootNode(g) {
  var v;
  while (g.hasNode(v = uniqueId_default("_root")))
    ;
  return v;
}
__name(createRootNode, "createRootNode");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/order/cross-count.js
function crossCount(g, layering) {
  var cc = 0;
  for (var i = 1; i < layering.length; ++i) {
    cc += twoLayerCrossCount(g, layering[i - 1], layering[i]);
  }
  return cc;
}
__name(crossCount, "crossCount");
function twoLayerCrossCount(g, northLayer, southLayer) {
  var southPos = zipObject_default(
    southLayer,
    map_default(southLayer, function(v, i) {
      return i;
    })
  );
  var southEntries = flatten_default(
    map_default(northLayer, function(v) {
      return sortBy_default(
        map_default(g.outEdges(v), function(e) {
          return { pos: southPos[e.w], weight: g.edge(e).weight };
        }),
        "pos"
      );
    })
  );
  var firstIndex = 1;
  while (firstIndex < southLayer.length)
    firstIndex <<= 1;
  var treeSize = 2 * firstIndex - 1;
  firstIndex -= 1;
  var tree = map_default(new Array(treeSize), function() {
    return 0;
  });
  var cc = 0;
  forEach_default(
    // @ts-expect-error
    southEntries.forEach(function(entry) {
      var index = entry.pos + firstIndex;
      tree[index] += entry.weight;
      var weightSum = 0;
      while (index > 0) {
        if (index % 2) {
          weightSum += tree[index + 1];
        }
        index = index - 1 >> 1;
        tree[index] += entry.weight;
      }
      cc += entry.weight * weightSum;
    })
  );
  return cc;
}
__name(twoLayerCrossCount, "twoLayerCrossCount");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/order/init-order.js
function initOrder(g) {
  var visited = {};
  var simpleNodes = filter_default(g.nodes(), function(v) {
    return !g.children(v).length;
  });
  var maxRank2 = max_default(
    map_default(simpleNodes, function(v) {
      return g.node(v).rank;
    })
  );
  var layers = map_default(range_default(maxRank2 + 1), function() {
    return [];
  });
  function dfs3(v) {
    if (has_default(visited, v))
      return;
    visited[v] = true;
    var node = g.node(v);
    layers[node.rank].push(v);
    forEach_default(g.successors(v), dfs3);
  }
  __name(dfs3, "dfs");
  var orderedVs = sortBy_default(simpleNodes, function(v) {
    return g.node(v).rank;
  });
  forEach_default(orderedVs, dfs3);
  return layers;
}
__name(initOrder, "initOrder");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/order/barycenter.js
function barycenter(g, movable) {
  return map_default(movable, function(v) {
    var inV = g.inEdges(v);
    if (!inV.length) {
      return { v };
    } else {
      var result = reduce_default(
        inV,
        function(acc, e) {
          var edge = g.edge(e), nodeU = g.node(e.v);
          return {
            sum: acc.sum + edge.weight * nodeU.order,
            weight: acc.weight + edge.weight
          };
        },
        { sum: 0, weight: 0 }
      );
      return {
        v,
        barycenter: result.sum / result.weight,
        weight: result.weight
      };
    }
  });
}
__name(barycenter, "barycenter");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/order/resolve-conflicts.js
function resolveConflicts(entries, cg) {
  var mappedEntries = {};
  forEach_default(entries, function(entry, i) {
    var tmp = mappedEntries[entry.v] = {
      indegree: 0,
      in: [],
      out: [],
      vs: [entry.v],
      i
    };
    if (!isUndefined_default(entry.barycenter)) {
      tmp.barycenter = entry.barycenter;
      tmp.weight = entry.weight;
    }
  });
  forEach_default(cg.edges(), function(e) {
    var entryV = mappedEntries[e.v];
    var entryW = mappedEntries[e.w];
    if (!isUndefined_default(entryV) && !isUndefined_default(entryW)) {
      entryW.indegree++;
      entryV.out.push(mappedEntries[e.w]);
    }
  });
  var sourceSet = filter_default(mappedEntries, function(entry) {
    return !entry.indegree;
  });
  return doResolveConflicts(sourceSet);
}
__name(resolveConflicts, "resolveConflicts");
function doResolveConflicts(sourceSet) {
  var entries = [];
  function handleIn(vEntry) {
    return function(uEntry) {
      if (uEntry.merged) {
        return;
      }
      if (isUndefined_default(uEntry.barycenter) || isUndefined_default(vEntry.barycenter) || uEntry.barycenter >= vEntry.barycenter) {
        mergeEntries(vEntry, uEntry);
      }
    };
  }
  __name(handleIn, "handleIn");
  function handleOut(vEntry) {
    return function(wEntry) {
      wEntry["in"].push(vEntry);
      if (--wEntry.indegree === 0) {
        sourceSet.push(wEntry);
      }
    };
  }
  __name(handleOut, "handleOut");
  while (sourceSet.length) {
    var entry = sourceSet.pop();
    entries.push(entry);
    forEach_default(entry["in"].reverse(), handleIn(entry));
    forEach_default(entry.out, handleOut(entry));
  }
  return map_default(
    filter_default(entries, function(entry2) {
      return !entry2.merged;
    }),
    function(entry2) {
      return pick_default(entry2, ["vs", "i", "barycenter", "weight"]);
    }
  );
}
__name(doResolveConflicts, "doResolveConflicts");
function mergeEntries(target, source) {
  var sum = 0;
  var weight = 0;
  if (target.weight) {
    sum += target.barycenter * target.weight;
    weight += target.weight;
  }
  if (source.weight) {
    sum += source.barycenter * source.weight;
    weight += source.weight;
  }
  target.vs = source.vs.concat(target.vs);
  target.barycenter = sum / weight;
  target.weight = weight;
  target.i = Math.min(source.i, target.i);
  source.merged = true;
}
__name(mergeEntries, "mergeEntries");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/order/sort.js
function sort(entries, biasRight) {
  var parts = partition(entries, function(entry) {
    return has_default(entry, "barycenter");
  });
  var sortable = parts.lhs, unsortable = sortBy_default(parts.rhs, function(entry) {
    return -entry.i;
  }), vs = [], sum = 0, weight = 0, vsIndex = 0;
  sortable.sort(compareWithBias(!!biasRight));
  vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
  forEach_default(sortable, function(entry) {
    vsIndex += entry.vs.length;
    vs.push(entry.vs);
    sum += entry.barycenter * entry.weight;
    weight += entry.weight;
    vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
  });
  var result = { vs: flatten_default(vs) };
  if (weight) {
    result.barycenter = sum / weight;
    result.weight = weight;
  }
  return result;
}
__name(sort, "sort");
function consumeUnsortable(vs, unsortable, index) {
  var last2;
  while (unsortable.length && (last2 = last_default(unsortable)).i <= index) {
    unsortable.pop();
    vs.push(last2.vs);
    index++;
  }
  return index;
}
__name(consumeUnsortable, "consumeUnsortable");
function compareWithBias(bias) {
  return function(entryV, entryW) {
    if (entryV.barycenter < entryW.barycenter) {
      return -1;
    } else if (entryV.barycenter > entryW.barycenter) {
      return 1;
    }
    return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
  };
}
__name(compareWithBias, "compareWithBias");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/order/sort-subgraph.js
function sortSubgraph(g, v, cg, biasRight) {
  var movable = g.children(v);
  var node = g.node(v);
  var bl = node ? node.borderLeft : void 0;
  var br = node ? node.borderRight : void 0;
  var subgraphs = {};
  if (bl) {
    movable = filter_default(movable, function(w) {
      return w !== bl && w !== br;
    });
  }
  var barycenters = barycenter(g, movable);
  forEach_default(barycenters, function(entry) {
    if (g.children(entry.v).length) {
      var subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
      subgraphs[entry.v] = subgraphResult;
      if (has_default(subgraphResult, "barycenter")) {
        mergeBarycenters(entry, subgraphResult);
      }
    }
  });
  var entries = resolveConflicts(barycenters, cg);
  expandSubgraphs(entries, subgraphs);
  var result = sort(entries, biasRight);
  if (bl) {
    result.vs = flatten_default([bl, result.vs, br]);
    if (g.predecessors(bl).length) {
      var blPred = g.node(g.predecessors(bl)[0]), brPred = g.node(g.predecessors(br)[0]);
      if (!has_default(result, "barycenter")) {
        result.barycenter = 0;
        result.weight = 0;
      }
      result.barycenter = (result.barycenter * result.weight + blPred.order + brPred.order) / (result.weight + 2);
      result.weight += 2;
    }
  }
  return result;
}
__name(sortSubgraph, "sortSubgraph");
function expandSubgraphs(entries, subgraphs) {
  forEach_default(entries, function(entry) {
    entry.vs = flatten_default(
      entry.vs.map(function(v) {
        if (subgraphs[v]) {
          return subgraphs[v].vs;
        }
        return v;
      })
    );
  });
}
__name(expandSubgraphs, "expandSubgraphs");
function mergeBarycenters(target, other) {
  if (!isUndefined_default(target.barycenter)) {
    target.barycenter = (target.barycenter * target.weight + other.barycenter * other.weight) / (target.weight + other.weight);
    target.weight += other.weight;
  } else {
    target.barycenter = other.barycenter;
    target.weight = other.weight;
  }
}
__name(mergeBarycenters, "mergeBarycenters");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/order/index.js
function order(g) {
  var maxRank2 = maxRank(g), downLayerGraphs = buildLayerGraphs(g, range_default(1, maxRank2 + 1), "inEdges"), upLayerGraphs = buildLayerGraphs(g, range_default(maxRank2 - 1, -1, -1), "outEdges");
  var layering = initOrder(g);
  assignOrder(g, layering);
  var bestCC = Number.POSITIVE_INFINITY, best;
  for (var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
    sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);
    layering = buildLayerMatrix(g);
    var cc = crossCount(g, layering);
    if (cc < bestCC) {
      lastBest = 0;
      best = cloneDeep_default(layering);
      bestCC = cc;
    }
  }
  assignOrder(g, best);
}
__name(order, "order");
function buildLayerGraphs(g, ranks, relationship) {
  return map_default(ranks, function(rank2) {
    return buildLayerGraph(g, rank2, relationship);
  });
}
__name(buildLayerGraphs, "buildLayerGraphs");
function sweepLayerGraphs(layerGraphs, biasRight) {
  var cg = new Graph();
  forEach_default(layerGraphs, function(lg) {
    var root = lg.graph().root;
    var sorted = sortSubgraph(lg, root, cg, biasRight);
    forEach_default(sorted.vs, function(v, i) {
      lg.node(v).order = i;
    });
    addSubgraphConstraints(lg, cg, sorted.vs);
  });
}
__name(sweepLayerGraphs, "sweepLayerGraphs");
function assignOrder(g, layering) {
  forEach_default(layering, function(layer) {
    forEach_default(layer, function(v, i) {
      g.node(v).order = i;
    });
  });
}
__name(assignOrder, "assignOrder");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/parent-dummy-chains.js
function parentDummyChains(g) {
  var postorderNums = postorder2(g);
  forEach_default(g.graph().dummyChains, function(v) {
    var node = g.node(v);
    var edgeObj = node.edgeObj;
    var pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w);
    var path = pathData.path;
    var lca = pathData.lca;
    var pathIdx = 0;
    var pathV = path[pathIdx];
    var ascending = true;
    while (v !== edgeObj.w) {
      node = g.node(v);
      if (ascending) {
        while ((pathV = path[pathIdx]) !== lca && g.node(pathV).maxRank < node.rank) {
          pathIdx++;
        }
        if (pathV === lca) {
          ascending = false;
        }
      }
      if (!ascending) {
        while (pathIdx < path.length - 1 && g.node(pathV = path[pathIdx + 1]).minRank <= node.rank) {
          pathIdx++;
        }
        pathV = path[pathIdx];
      }
      g.setParent(v, pathV);
      v = g.successors(v)[0];
    }
  });
}
__name(parentDummyChains, "parentDummyChains");
function findPath(g, postorderNums, v, w) {
  var vPath = [];
  var wPath = [];
  var low = Math.min(postorderNums[v].low, postorderNums[w].low);
  var lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
  var parent;
  var lca;
  parent = v;
  do {
    parent = g.parent(parent);
    vPath.push(parent);
  } while (parent && (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
  lca = parent;
  parent = w;
  while ((parent = g.parent(parent)) !== lca) {
    wPath.push(parent);
  }
  return { path: vPath.concat(wPath.reverse()), lca };
}
__name(findPath, "findPath");
function postorder2(g) {
  var result = {};
  var lim = 0;
  function dfs3(v) {
    var low = lim;
    forEach_default(g.children(v), dfs3);
    result[v] = { low, lim: lim++ };
  }
  __name(dfs3, "dfs");
  forEach_default(g.children(), dfs3);
  return result;
}
__name(postorder2, "postorder");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/position/bk.js
function findType1Conflicts(g, layering) {
  var conflicts = {};
  function visitLayer(prevLayer, layer) {
    var k0 = 0, scanPos = 0, prevLayerLength = prevLayer.length, lastNode = last_default(layer);
    forEach_default(layer, function(v, i) {
      var w = findOtherInnerSegmentNode(g, v), k1 = w ? g.node(w).order : prevLayerLength;
      if (w || v === lastNode) {
        forEach_default(layer.slice(scanPos, i + 1), function(scanNode) {
          forEach_default(g.predecessors(scanNode), function(u) {
            var uLabel = g.node(u), uPos = uLabel.order;
            if ((uPos < k0 || k1 < uPos) && !(uLabel.dummy && g.node(scanNode).dummy)) {
              addConflict(conflicts, u, scanNode);
            }
          });
        });
        scanPos = i + 1;
        k0 = k1;
      }
    });
    return layer;
  }
  __name(visitLayer, "visitLayer");
  reduce_default(layering, visitLayer);
  return conflicts;
}
__name(findType1Conflicts, "findType1Conflicts");
function findType2Conflicts(g, layering) {
  var conflicts = {};
  function scan(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
    var v;
    forEach_default(range_default(southPos, southEnd), function(i) {
      v = south[i];
      if (g.node(v).dummy) {
        forEach_default(g.predecessors(v), function(u) {
          var uNode = g.node(u);
          if (uNode.dummy && (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
            addConflict(conflicts, u, v);
          }
        });
      }
    });
  }
  __name(scan, "scan");
  function visitLayer(north, south) {
    var prevNorthPos = -1, nextNorthPos, southPos = 0;
    forEach_default(south, function(v, southLookahead) {
      if (g.node(v).dummy === "border") {
        var predecessors = g.predecessors(v);
        if (predecessors.length) {
          nextNorthPos = g.node(predecessors[0]).order;
          scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
          southPos = southLookahead;
          prevNorthPos = nextNorthPos;
        }
      }
      scan(south, southPos, south.length, nextNorthPos, north.length);
    });
    return south;
  }
  __name(visitLayer, "visitLayer");
  reduce_default(layering, visitLayer);
  return conflicts;
}
__name(findType2Conflicts, "findType2Conflicts");
function findOtherInnerSegmentNode(g, v) {
  if (g.node(v).dummy) {
    return find_default(g.predecessors(v), function(u) {
      return g.node(u).dummy;
    });
  }
}
__name(findOtherInnerSegmentNode, "findOtherInnerSegmentNode");
function addConflict(conflicts, v, w) {
  if (v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  var conflictsV = conflicts[v];
  if (!conflictsV) {
    conflicts[v] = conflictsV = {};
  }
  conflictsV[w] = true;
}
__name(addConflict, "addConflict");
function hasConflict(conflicts, v, w) {
  if (v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  return has_default(conflicts[v], w);
}
__name(hasConflict, "hasConflict");
function verticalAlignment(g, layering, conflicts, neighborFn) {
  var root = {}, align = {}, pos = {};
  forEach_default(layering, function(layer) {
    forEach_default(layer, function(v, order2) {
      root[v] = v;
      align[v] = v;
      pos[v] = order2;
    });
  });
  forEach_default(layering, function(layer) {
    var prevIdx = -1;
    forEach_default(layer, function(v) {
      var ws = neighborFn(v);
      if (ws.length) {
        ws = sortBy_default(ws, function(w2) {
          return pos[w2];
        });
        var mp = (ws.length - 1) / 2;
        for (var i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
          var w = ws[i];
          if (align[v] === v && prevIdx < pos[w] && !hasConflict(conflicts, v, w)) {
            align[w] = v;
            align[v] = root[v] = root[w];
            prevIdx = pos[w];
          }
        }
      }
    });
  });
  return { root, align };
}
__name(verticalAlignment, "verticalAlignment");
function horizontalCompaction(g, layering, root, align, reverseSep) {
  var xs = {}, blockG = buildBlockGraph(g, layering, root, reverseSep), borderType = reverseSep ? "borderLeft" : "borderRight";
  function iterate(setXsFunc, nextNodesFunc) {
    var stack = blockG.nodes();
    var elem = stack.pop();
    var visited = {};
    while (elem) {
      if (visited[elem]) {
        setXsFunc(elem);
      } else {
        visited[elem] = true;
        stack.push(elem);
        stack = stack.concat(nextNodesFunc(elem));
      }
      elem = stack.pop();
    }
  }
  __name(iterate, "iterate");
  function pass1(elem) {
    xs[elem] = blockG.inEdges(elem).reduce(function(acc, e) {
      return Math.max(acc, xs[e.v] + blockG.edge(e));
    }, 0);
  }
  __name(pass1, "pass1");
  function pass2(elem) {
    var min2 = blockG.outEdges(elem).reduce(function(acc, e) {
      return Math.min(acc, xs[e.w] - blockG.edge(e));
    }, Number.POSITIVE_INFINITY);
    var node = g.node(elem);
    if (min2 !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
      xs[elem] = Math.max(xs[elem], min2);
    }
  }
  __name(pass2, "pass2");
  iterate(pass1, blockG.predecessors.bind(blockG));
  iterate(pass2, blockG.successors.bind(blockG));
  forEach_default(align, function(v) {
    xs[v] = xs[root[v]];
  });
  return xs;
}
__name(horizontalCompaction, "horizontalCompaction");
function buildBlockGraph(g, layering, root, reverseSep) {
  var blockGraph = new Graph(), graphLabel = g.graph(), sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);
  forEach_default(layering, function(layer) {
    var u;
    forEach_default(layer, function(v) {
      var vRoot = root[v];
      blockGraph.setNode(vRoot);
      if (u) {
        var uRoot = root[u], prevMax = blockGraph.edge(uRoot, vRoot);
        blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
      }
      u = v;
    });
  });
  return blockGraph;
}
__name(buildBlockGraph, "buildBlockGraph");
function findSmallestWidthAlignment(g, xss) {
  return minBy_default(values_default(xss), function(xs) {
    var max2 = Number.NEGATIVE_INFINITY;
    var min2 = Number.POSITIVE_INFINITY;
    forIn_default(xs, function(x, v) {
      var halfWidth = width(g, v) / 2;
      max2 = Math.max(x + halfWidth, max2);
      min2 = Math.min(x - halfWidth, min2);
    });
    return max2 - min2;
  });
}
__name(findSmallestWidthAlignment, "findSmallestWidthAlignment");
function alignCoordinates(xss, alignTo) {
  var alignToVals = values_default(alignTo), alignToMin = min_default(alignToVals), alignToMax = max_default(alignToVals);
  forEach_default(["u", "d"], function(vert) {
    forEach_default(["l", "r"], function(horiz) {
      var alignment = vert + horiz, xs = xss[alignment], delta;
      if (xs === alignTo)
        return;
      var xsVals = values_default(xs);
      delta = horiz === "l" ? alignToMin - min_default(xsVals) : alignToMax - max_default(xsVals);
      if (delta) {
        xss[alignment] = mapValues_default(xs, function(x) {
          return x + delta;
        });
      }
    });
  });
}
__name(alignCoordinates, "alignCoordinates");
function balance(xss, align) {
  return mapValues_default(xss.ul, function(ignore, v) {
    if (align) {
      return xss[align.toLowerCase()][v];
    } else {
      var xs = sortBy_default(map_default(xss, v));
      return (xs[1] + xs[2]) / 2;
    }
  });
}
__name(balance, "balance");
function positionX(g) {
  var layering = buildLayerMatrix(g);
  var conflicts = merge_default(findType1Conflicts(g, layering), findType2Conflicts(g, layering));
  var xss = {};
  var adjustedLayering;
  forEach_default(["u", "d"], function(vert) {
    adjustedLayering = vert === "u" ? layering : values_default(layering).reverse();
    forEach_default(["l", "r"], function(horiz) {
      if (horiz === "r") {
        adjustedLayering = map_default(adjustedLayering, function(inner) {
          return values_default(inner).reverse();
        });
      }
      var neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
      var align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
      var xs = horizontalCompaction(g, adjustedLayering, align.root, align.align, horiz === "r");
      if (horiz === "r") {
        xs = mapValues_default(xs, function(x) {
          return -x;
        });
      }
      xss[vert + horiz] = xs;
    });
  });
  var smallestWidth = findSmallestWidthAlignment(g, xss);
  alignCoordinates(xss, smallestWidth);
  return balance(xss, g.graph().align);
}
__name(positionX, "positionX");
function sep(nodeSep, edgeSep, reverseSep) {
  return function(g, v, w) {
    var vLabel = g.node(v);
    var wLabel = g.node(w);
    var sum = 0;
    var delta;
    sum += vLabel.width / 2;
    if (has_default(vLabel, "labelpos")) {
      switch (vLabel.labelpos.toLowerCase()) {
        case "l":
          delta = -vLabel.width / 2;
          break;
        case "r":
          delta = vLabel.width / 2;
          break;
      }
    }
    if (delta) {
      sum += reverseSep ? delta : -delta;
    }
    delta = 0;
    sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
    sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;
    sum += wLabel.width / 2;
    if (has_default(wLabel, "labelpos")) {
      switch (wLabel.labelpos.toLowerCase()) {
        case "l":
          delta = wLabel.width / 2;
          break;
        case "r":
          delta = -wLabel.width / 2;
          break;
      }
    }
    if (delta) {
      sum += reverseSep ? delta : -delta;
    }
    delta = 0;
    return sum;
  };
}
__name(sep, "sep");
function width(g, v) {
  return g.node(v).width;
}
__name(width, "width");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/position/index.js
function position(g) {
  g = asNonCompoundGraph(g);
  positionY(g);
  forOwn_default(positionX(g), function(x, v) {
    g.node(v).x = x;
  });
}
__name(position, "position");
function positionY(g) {
  var layering = buildLayerMatrix(g);
  var rankSep = g.graph().ranksep;
  var prevY = 0;
  forEach_default(layering, function(layer) {
    var maxHeight = max_default(
      map_default(layer, function(v) {
        return g.node(v).height;
      })
    );
    forEach_default(layer, function(v) {
      g.node(v).y = prevY + maxHeight / 2;
    });
    prevY += maxHeight + rankSep;
  });
}
__name(positionY, "positionY");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre/layout.js
function layout(g, opts) {
  var time2 = opts && opts.debugTiming ? time : notime;
  time2("layout", function() {
    var layoutGraph = time2("  buildLayoutGraph", function() {
      return buildLayoutGraph(g);
    });
    time2("  runLayout", function() {
      runLayout(layoutGraph, time2);
    });
    time2("  updateInputGraph", function() {
      updateInputGraph(g, layoutGraph);
    });
  });
}
__name(layout, "layout");
function runLayout(g, time2) {
  time2("    makeSpaceForEdgeLabels", function() {
    makeSpaceForEdgeLabels(g);
  });
  time2("    removeSelfEdges", function() {
    removeSelfEdges(g);
  });
  time2("    acyclic", function() {
    run(g);
  });
  time2("    nestingGraph.run", function() {
    run3(g);
  });
  time2("    rank", function() {
    rank(asNonCompoundGraph(g));
  });
  time2("    injectEdgeLabelProxies", function() {
    injectEdgeLabelProxies(g);
  });
  time2("    removeEmptyRanks", function() {
    removeEmptyRanks(g);
  });
  time2("    nestingGraph.cleanup", function() {
    cleanup(g);
  });
  time2("    normalizeRanks", function() {
    normalizeRanks(g);
  });
  time2("    assignRankMinMax", function() {
    assignRankMinMax(g);
  });
  time2("    removeEdgeLabelProxies", function() {
    removeEdgeLabelProxies(g);
  });
  time2("    normalize.run", function() {
    run2(g);
  });
  time2("    parentDummyChains", function() {
    parentDummyChains(g);
  });
  time2("    addBorderSegments", function() {
    addBorderSegments(g);
  });
  time2("    order", function() {
    order(g);
  });
  time2("    insertSelfEdges", function() {
    insertSelfEdges(g);
  });
  time2("    adjustCoordinateSystem", function() {
    adjust(g);
  });
  time2("    position", function() {
    position(g);
  });
  time2("    positionSelfEdges", function() {
    positionSelfEdges(g);
  });
  time2("    removeBorderNodes", function() {
    removeBorderNodes(g);
  });
  time2("    normalize.undo", function() {
    undo3(g);
  });
  time2("    fixupEdgeLabelCoords", function() {
    fixupEdgeLabelCoords(g);
  });
  time2("    undoCoordinateSystem", function() {
    undo(g);
  });
  time2("    translateGraph", function() {
    translateGraph(g);
  });
  time2("    assignNodeIntersects", function() {
    assignNodeIntersects(g);
  });
  time2("    reversePoints", function() {
    reversePointsForReversedEdges(g);
  });
  time2("    acyclic.undo", function() {
    undo2(g);
  });
}
__name(runLayout, "runLayout");
function updateInputGraph(inputGraph, layoutGraph) {
  forEach_default(inputGraph.nodes(), function(v) {
    var inputLabel = inputGraph.node(v);
    var layoutLabel = layoutGraph.node(v);
    if (inputLabel) {
      inputLabel.x = layoutLabel.x;
      inputLabel.y = layoutLabel.y;
      if (layoutGraph.children(v).length) {
        inputLabel.width = layoutLabel.width;
        inputLabel.height = layoutLabel.height;
      }
    }
  });
  forEach_default(inputGraph.edges(), function(e) {
    var inputLabel = inputGraph.edge(e);
    var layoutLabel = layoutGraph.edge(e);
    inputLabel.points = layoutLabel.points;
    if (has_default(layoutLabel, "x")) {
      inputLabel.x = layoutLabel.x;
      inputLabel.y = layoutLabel.y;
    }
  });
  inputGraph.graph().width = layoutGraph.graph().width;
  inputGraph.graph().height = layoutGraph.graph().height;
}
__name(updateInputGraph, "updateInputGraph");
var graphNumAttrs = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"];
var graphDefaults = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" };
var graphAttrs = ["acyclicer", "ranker", "rankdir", "align"];
var nodeNumAttrs = ["width", "height"];
var nodeDefaults = { width: 0, height: 0 };
var edgeNumAttrs = ["minlen", "weight", "width", "height", "labeloffset"];
var edgeDefaults = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
};
var edgeAttrs = ["labelpos"];
function buildLayoutGraph(inputGraph) {
  var g = new Graph({ multigraph: true, compound: true });
  var graph = canonicalize(inputGraph.graph());
  g.setGraph(
    merge_default({}, graphDefaults, selectNumberAttrs(graph, graphNumAttrs), pick_default(graph, graphAttrs))
  );
  forEach_default(inputGraph.nodes(), function(v) {
    var node = canonicalize(inputGraph.node(v));
    g.setNode(v, defaults_default(selectNumberAttrs(node, nodeNumAttrs), nodeDefaults));
    g.setParent(v, inputGraph.parent(v));
  });
  forEach_default(inputGraph.edges(), function(e) {
    var edge = canonicalize(inputGraph.edge(e));
    g.setEdge(
      e,
      merge_default({}, edgeDefaults, selectNumberAttrs(edge, edgeNumAttrs), pick_default(edge, edgeAttrs))
    );
  });
  return g;
}
__name(buildLayoutGraph, "buildLayoutGraph");
function makeSpaceForEdgeLabels(g) {
  var graph = g.graph();
  graph.ranksep /= 2;
  forEach_default(g.edges(), function(e) {
    var edge = g.edge(e);
    edge.minlen *= 2;
    if (edge.labelpos.toLowerCase() !== "c") {
      if (graph.rankdir === "TB" || graph.rankdir === "BT") {
        edge.width += edge.labeloffset;
      } else {
        edge.height += edge.labeloffset;
      }
    }
  });
}
__name(makeSpaceForEdgeLabels, "makeSpaceForEdgeLabels");
function injectEdgeLabelProxies(g) {
  forEach_default(g.edges(), function(e) {
    var edge = g.edge(e);
    if (edge.width && edge.height) {
      var v = g.node(e.v);
      var w = g.node(e.w);
      var label = { rank: (w.rank - v.rank) / 2 + v.rank, e };
      addDummyNode(g, "edge-proxy", label, "_ep");
    }
  });
}
__name(injectEdgeLabelProxies, "injectEdgeLabelProxies");
function assignRankMinMax(g) {
  var maxRank2 = 0;
  forEach_default(g.nodes(), function(v) {
    var node = g.node(v);
    if (node.borderTop) {
      node.minRank = g.node(node.borderTop).rank;
      node.maxRank = g.node(node.borderBottom).rank;
      maxRank2 = max_default(maxRank2, node.maxRank);
    }
  });
  g.graph().maxRank = maxRank2;
}
__name(assignRankMinMax, "assignRankMinMax");
function removeEdgeLabelProxies(g) {
  forEach_default(g.nodes(), function(v) {
    var node = g.node(v);
    if (node.dummy === "edge-proxy") {
      g.edge(node.e).labelRank = node.rank;
      g.removeNode(v);
    }
  });
}
__name(removeEdgeLabelProxies, "removeEdgeLabelProxies");
function translateGraph(g) {
  var minX = Number.POSITIVE_INFINITY;
  var maxX = 0;
  var minY = Number.POSITIVE_INFINITY;
  var maxY = 0;
  var graphLabel = g.graph();
  var marginX = graphLabel.marginx || 0;
  var marginY = graphLabel.marginy || 0;
  function getExtremes(attrs) {
    var x = attrs.x;
    var y = attrs.y;
    var w = attrs.width;
    var h = attrs.height;
    minX = Math.min(minX, x - w / 2);
    maxX = Math.max(maxX, x + w / 2);
    minY = Math.min(minY, y - h / 2);
    maxY = Math.max(maxY, y + h / 2);
  }
  __name(getExtremes, "getExtremes");
  forEach_default(g.nodes(), function(v) {
    getExtremes(g.node(v));
  });
  forEach_default(g.edges(), function(e) {
    var edge = g.edge(e);
    if (has_default(edge, "x")) {
      getExtremes(edge);
    }
  });
  minX -= marginX;
  minY -= marginY;
  forEach_default(g.nodes(), function(v) {
    var node = g.node(v);
    node.x -= minX;
    node.y -= minY;
  });
  forEach_default(g.edges(), function(e) {
    var edge = g.edge(e);
    forEach_default(edge.points, function(p) {
      p.x -= minX;
      p.y -= minY;
    });
    if (has_default(edge, "x")) {
      edge.x -= minX;
    }
    if (has_default(edge, "y")) {
      edge.y -= minY;
    }
  });
  graphLabel.width = maxX - minX + marginX;
  graphLabel.height = maxY - minY + marginY;
}
__name(translateGraph, "translateGraph");
function assignNodeIntersects(g) {
  forEach_default(g.edges(), function(e) {
    var edge = g.edge(e);
    var nodeV = g.node(e.v);
    var nodeW = g.node(e.w);
    var p1, p2;
    if (!edge.points) {
      edge.points = [];
      p1 = nodeW;
      p2 = nodeV;
    } else {
      p1 = edge.points[0];
      p2 = edge.points[edge.points.length - 1];
    }
    edge.points.unshift(intersectRect(nodeV, p1));
    edge.points.push(intersectRect(nodeW, p2));
  });
}
__name(assignNodeIntersects, "assignNodeIntersects");
function fixupEdgeLabelCoords(g) {
  forEach_default(g.edges(), function(e) {
    var edge = g.edge(e);
    if (has_default(edge, "x")) {
      if (edge.labelpos === "l" || edge.labelpos === "r") {
        edge.width -= edge.labeloffset;
      }
      switch (edge.labelpos) {
        case "l":
          edge.x -= edge.width / 2 + edge.labeloffset;
          break;
        case "r":
          edge.x += edge.width / 2 + edge.labeloffset;
          break;
      }
    }
  });
}
__name(fixupEdgeLabelCoords, "fixupEdgeLabelCoords");
function reversePointsForReversedEdges(g) {
  forEach_default(g.edges(), function(e) {
    var edge = g.edge(e);
    if (edge.reversed) {
      edge.points.reverse();
    }
  });
}
__name(reversePointsForReversedEdges, "reversePointsForReversedEdges");
function removeBorderNodes(g) {
  forEach_default(g.nodes(), function(v) {
    if (g.children(v).length) {
      var node = g.node(v);
      var t = g.node(node.borderTop);
      var b = g.node(node.borderBottom);
      var l = g.node(last_default(node.borderLeft));
      var r = g.node(last_default(node.borderRight));
      node.width = Math.abs(r.x - l.x);
      node.height = Math.abs(b.y - t.y);
      node.x = l.x + node.width / 2;
      node.y = t.y + node.height / 2;
    }
  });
  forEach_default(g.nodes(), function(v) {
    if (g.node(v).dummy === "border") {
      g.removeNode(v);
    }
  });
}
__name(removeBorderNodes, "removeBorderNodes");
function removeSelfEdges(g) {
  forEach_default(g.edges(), function(e) {
    if (e.v === e.w) {
      var node = g.node(e.v);
      if (!node.selfEdges) {
        node.selfEdges = [];
      }
      node.selfEdges.push({ e, label: g.edge(e) });
      g.removeEdge(e);
    }
  });
}
__name(removeSelfEdges, "removeSelfEdges");
function insertSelfEdges(g) {
  var layers = buildLayerMatrix(g);
  forEach_default(layers, function(layer) {
    var orderShift = 0;
    forEach_default(layer, function(v, i) {
      var node = g.node(v);
      node.order = i + orderShift;
      forEach_default(node.selfEdges, function(selfEdge) {
        addDummyNode(
          g,
          "selfedge",
          {
            width: selfEdge.label.width,
            height: selfEdge.label.height,
            rank: node.rank,
            order: i + ++orderShift,
            e: selfEdge.e,
            label: selfEdge.label
          },
          "_se"
        );
      });
      delete node.selfEdges;
    });
  });
}
__name(insertSelfEdges, "insertSelfEdges");
function positionSelfEdges(g) {
  forEach_default(g.nodes(), function(v) {
    var node = g.node(v);
    if (node.dummy === "selfedge") {
      var selfNode = g.node(node.e.v);
      var x = selfNode.x + selfNode.width / 2;
      var y = selfNode.y;
      var dx = node.x - x;
      var dy = selfNode.height / 2;
      g.setEdge(node.e, node.label);
      g.removeNode(v);
      node.label.points = [
        { x: x + 2 * dx / 3, y: y - dy },
        { x: x + 5 * dx / 6, y: y - dy },
        { x: x + dx, y },
        { x: x + 5 * dx / 6, y: y + dy },
        { x: x + 2 * dx / 3, y: y + dy }
      ];
      node.label.x = node.x;
      node.label.y = node.y;
    }
  });
}
__name(positionSelfEdges, "positionSelfEdges");
function selectNumberAttrs(obj, attrs) {
  return mapValues_default(pick_default(obj, attrs), Number);
}
__name(selectNumberAttrs, "selectNumberAttrs");
function canonicalize(attrs) {
  var newAttrs = {};
  forEach_default(attrs, function(v, k) {
    newAttrs[k.toLowerCase()] = v;
  });
  return newAttrs;
}
__name(canonicalize, "canonicalize");

export {
  clone_default,
  defaults_default,
  forEach_default,
  map_default,
  has_default,
  isUndefined_default,
  pick_default,
  range_default,
  uniqueId_default,
  Graph,
  layout
};
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
