/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 760:
/***/ (function(module) {

module.exports = {
  XMLSerializer: window.XMLSerializer,
  DOMParser: window.DOMParser,
  XMLDocument: window.XMLDocument
};

/***/ }),

/***/ 712:
/***/ (function(module) {

var ctXML = "[Content_Types].xml";
function collectContentTypes(overrides, defaults, zip) {
  var partNames = {};
  for (var i = 0, len = overrides.length; i < len; i++) {
    var override = overrides[i];
    var contentType = override.getAttribute("ContentType");
    var partName = override.getAttribute("PartName").substr(1);
    partNames[partName] = contentType;
  }
  var _loop = function _loop() {
    var def = defaults[_i];
    var contentType = def.getAttribute("ContentType");
    var extension = def.getAttribute("Extension");
    // eslint-disable-next-line no-loop-func
    zip.file(/./).map(function (_ref) {
      var name = _ref.name;
      if (name.slice(name.length - extension.length) === extension && !partNames[name] && name !== ctXML) {
        partNames[name] = contentType;
      }
    });
  };
  for (var _i = 0, _len = defaults.length; _i < _len; _i++) {
    _loop();
  }
  return partNames;
}
module.exports = collectContentTypes;

/***/ }),

/***/ 557:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = __webpack_require__(760),
  DOMParser = _require.DOMParser,
  XMLSerializer = _require.XMLSerializer;
var _require2 = __webpack_require__(257),
  throwXmlTagNotFound = _require2.throwXmlTagNotFound;
var _require3 = __webpack_require__(287),
  last = _require3.last,
  first = _require3.first;
function isWhiteSpace(value) {
  return /^[ \n\r\t]+$/.test(value);
}
function parser(tag) {
  return {
    get: function get(scope) {
      if (tag === ".") {
        return scope;
      }
      if (scope) {
        return scope[tag];
      }
      return scope;
    }
  };
}
var attrToRegex = {};
function setSingleAttribute(partValue, attr, attrValue) {
  var regex;
  // Stryker disable next-line all : because this is an optimisation
  if (attrToRegex[attr]) {
    regex = attrToRegex[attr];
  } else {
    regex = new RegExp("(<.* ".concat(attr, "=\")([^\"]*)(\".*)$"));
    attrToRegex[attr] = regex;
  }
  if (regex.test(partValue)) {
    return partValue.replace(regex, "$1".concat(attrValue, "$3"));
  }
  var end = partValue.lastIndexOf("/>");
  if (end === -1) {
    end = partValue.lastIndexOf(">");
  }
  return partValue.substr(0, end) + " ".concat(attr, "=\"").concat(attrValue, "\"") + partValue.substr(end);
}
function getSingleAttribute(value, attributeName) {
  var index = value.indexOf(" ".concat(attributeName, "=\""));
  if (index === -1) {
    return null;
  }
  var startIndex = value.substr(index).search(/["']/) + index;
  var endIndex = value.substr(startIndex + 1).search(/["']/) + startIndex;
  return value.substr(startIndex + 1, endIndex - startIndex);
}
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function startsWith(str, prefix) {
  return str.substring(0, prefix.length) === prefix;
}
function uniq(arr) {
  var hash = {},
    result = [];
  for (var i = 0, l = arr.length; i < l; ++i) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true;
      result.push(arr[i]);
    }
  }
  return result;
}
function chunkBy(parsed, f) {
  return parsed.reduce(function (chunks, p) {
    var currentChunk = last(chunks);
    var res = f(p);
    if (res === "start") {
      chunks.push([p]);
    } else if (res === "end") {
      currentChunk.push(p);
      chunks.push([]);
    } else {
      currentChunk.push(p);
    }
    return chunks;
  }, [[]]).filter(function (p) {
    return p.length > 0;
  });
}
var defaults = {
  errorLogging: "json",
  paragraphLoop: false,
  nullGetter: function nullGetter(part) {
    return part.module ? "" : "undefined";
  },
  xmlFileNames: ["[Content_Types].xml"],
  parser: parser,
  linebreaks: false,
  fileTypeConfig: null,
  delimiters: {
    start: "{",
    end: "}"
  }
};
function mergeObjects() {
  var resObj = {};
  var obj;
  for (var i = 0; i < arguments.length; i += 1) {
    obj = arguments[i];
    resObj = _objectSpread(_objectSpread({}, resObj), obj);
  }
  return resObj;
}
function xml2str(xmlNode) {
  var a = new XMLSerializer();
  return a.serializeToString(xmlNode).replace(/xmlns(:[a-z0-9]+)?="" ?/g, "");
}
function str2xml(str) {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}
var charMap = [["&", "&amp;"], ["<", "&lt;"], [">", "&gt;"], ['"', "&quot;"], ["'", "&apos;"]];
var charMapRegexes = charMap.map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    endChar = _ref2[0],
    startChar = _ref2[1];
  return {
    rstart: new RegExp(startChar, "g"),
    rend: new RegExp(endChar, "g"),
    start: startChar,
    end: endChar
  };
});
function wordToUtf8(string) {
  var r;
  for (var i = charMapRegexes.length - 1; i >= 0; i--) {
    r = charMapRegexes[i];
    string = string.replace(r.rstart, r.end);
  }
  return string;
}
function utf8ToWord(string) {
  // To make sure that the object given is a string (this is a noop for strings).
  string = string.toString();
  var r;
  for (var i = 0, l = charMapRegexes.length; i < l; i++) {
    r = charMapRegexes[i];
    string = string.replace(r.rend, r.start);
  }
  return string;
}

// This function is written with for loops for performance
function concatArrays(arrays) {
  var result = [];
  for (var i = 0; i < arrays.length; i++) {
    var array = arrays[i];
    for (var j = 0, len = array.length; j < len; j++) {
      result.push(array[j]);
    }
  }
  return result;
}
var spaceRegexp = new RegExp(String.fromCharCode(160), "g");
function convertSpaces(s) {
  return s.replace(spaceRegexp, " ");
}
function pregMatchAll(regex, content) {
  /* regex is a string, content is the content. It returns an array of all matches with their offset, for example:
  	 regex=la
  	 content=lolalolilala
  returns: [{array: {0: 'la'},offset: 2},{array: {0: 'la'},offset: 8},{array: {0: 'la'} ,offset: 10}]
  */
  var matchArray = [];
  var match;
  while ((match = regex.exec(content)) != null) {
    matchArray.push({
      array: match,
      offset: match.index
    });
  }
  return matchArray;
}
function isEnding(value, element) {
  return value === "</" + element + ">";
}
function isStarting(value, element) {
  return value.indexOf("<" + element) === 0 && [">", " ", "/"].indexOf(value[element.length + 1]) !== -1;
}
function getRight(parsed, element, index) {
  var val = getRightOrNull(parsed, element, index);
  if (val !== null) {
    return val;
  }
  throwXmlTagNotFound({
    position: "right",
    element: element,
    parsed: parsed,
    index: index
  });
}
function getRightOrNull(parsed, elements, index) {
  if (typeof elements === "string") {
    elements = [elements];
  }
  var level = 1;
  for (var i = index, l = parsed.length; i < l; i++) {
    var part = parsed[i];
    for (var j = 0, len = elements.length; j < len; j++) {
      var element = elements[j];
      if (isEnding(part.value, element)) {
        level--;
      }
      if (isStarting(part.value, element)) {
        level++;
      }
      if (level === 0) {
        return i;
      }
    }
  }
  return null;
}
function getLeft(parsed, element, index) {
  var val = getLeftOrNull(parsed, element, index);
  if (val !== null) {
    return val;
  }
  throwXmlTagNotFound({
    position: "left",
    element: element,
    parsed: parsed,
    index: index
  });
}
function getLeftOrNull(parsed, elements, index) {
  if (typeof elements === "string") {
    elements = [elements];
  }
  var level = 1;
  for (var i = index; i >= 0; i--) {
    var part = parsed[i];
    for (var j = 0, len = elements.length; j < len; j++) {
      var element = elements[j];
      if (isStarting(part.value, element)) {
        level--;
      }
      if (isEnding(part.value, element)) {
        level++;
      }
      if (level === 0) {
        return i;
      }
    }
  }
  return null;
}

// Stryker disable all : because those are functions that depend on the parsed
// structure based and we don't want minimal code here, but rather code that
// makes things clear.
function isTagStart(tagType, _ref3) {
  var type = _ref3.type,
    tag = _ref3.tag,
    position = _ref3.position;
  return type === "tag" && tag === tagType && (position === "start" || position === "selfclosing");
}
function isTagStartStrict(tagType, _ref4) {
  var type = _ref4.type,
    tag = _ref4.tag,
    position = _ref4.position;
  return type === "tag" && tag === tagType && position === "start";
}
function isTagEnd(tagType, _ref5) {
  var type = _ref5.type,
    tag = _ref5.tag,
    position = _ref5.position;
  return type === "tag" && tag === tagType && position === "end";
}
function isParagraphStart(part) {
  return isTagStartStrict("w:p", part) || isTagStartStrict("a:p", part);
}
function isParagraphEnd(part) {
  return isTagEnd("w:p", part) || isTagEnd("a:p", part);
}
function isTextStart(_ref6) {
  var type = _ref6.type,
    position = _ref6.position,
    text = _ref6.text;
  return type === "tag" && position === "start" && text;
}
function isTextEnd(_ref7) {
  var type = _ref7.type,
    position = _ref7.position,
    text = _ref7.text;
  return type === "tag" && position === "end" && text;
}
function isContent(_ref8) {
  var type = _ref8.type,
    position = _ref8.position;
  return type === "placeholder" || type === "content" && position === "insidetag";
}
function isModule(_ref9, modules) {
  var module = _ref9.module,
    type = _ref9.type;
  if (!(modules instanceof Array)) {
    modules = [modules];
  }
  return type === "placeholder" && modules.indexOf(module) !== -1;
}
// Stryker restore all

var corruptCharacters = /[\x00-\x08\x0B\x0C\x0E-\x1F]/;
// 00    NUL '\0' (null character)
// 01    SOH (start of heading)
// 02    STX (start of text)
// 03    ETX (end of text)
// 04    EOT (end of transmission)
// 05    ENQ (enquiry)
// 06    ACK (acknowledge)
// 07    BEL '\a' (bell)
// 08    BS  '\b' (backspace)
// 0B    VT  '\v' (vertical tab)
// 0C    FF  '\f' (form feed)
// 0E    SO  (shift out)
// 0F    SI  (shift in)
// 10    DLE (data link escape)
// 11    DC1 (device control 1)
// 12    DC2 (device control 2)
// 13    DC3 (device control 3)
// 14    DC4 (device control 4)
// 15    NAK (negative ack.)
// 16    SYN (synchronous idle)
// 17    ETB (end of trans. blk)
// 18    CAN (cancel)
// 19    EM  (end of medium)
// 1A    SUB (substitute)
// 1B    ESC (escape)
// 1C    FS  (file separator)
// 1D    GS  (group separator)
// 1E    RS  (record separator)
// 1F    US  (unit separator)
function hasCorruptCharacters(string) {
  return corruptCharacters.test(string);
}
function invertMap(map) {
  return Object.keys(map).reduce(function (invertedMap, key) {
    var value = map[key];
    invertedMap[value] = invertedMap[value] || [];
    invertedMap[value].push(key);
    return invertedMap;
  }, {});
}
function stableSort(arr, compare) {
  return arr.map(function (item, index) {
    return {
      item: item,
      index: index
    };
  }).sort(function (a, b) {
    return compare(a.item, b.item) || a.index - b.index;
  }).map(function (_ref10) {
    var item = _ref10.item;
    return item;
  });
}
module.exports = {
  endsWith: endsWith,
  startsWith: startsWith,
  isContent: isContent,
  isParagraphStart: isParagraphStart,
  isParagraphEnd: isParagraphEnd,
  isTagStart: isTagStart,
  isTagEnd: isTagEnd,
  isTextStart: isTextStart,
  isTextEnd: isTextEnd,
  isStarting: isStarting,
  isEnding: isEnding,
  isModule: isModule,
  uniq: uniq,
  chunkBy: chunkBy,
  last: last,
  first: first,
  mergeObjects: mergeObjects,
  xml2str: xml2str,
  str2xml: str2xml,
  getRightOrNull: getRightOrNull,
  getRight: getRight,
  getLeftOrNull: getLeftOrNull,
  getLeft: getLeft,
  pregMatchAll: pregMatchAll,
  convertSpaces: convertSpaces,
  charMapRegexes: charMapRegexes,
  hasCorruptCharacters: hasCorruptCharacters,
  defaults: defaults,
  wordToUtf8: wordToUtf8,
  utf8ToWord: utf8ToWord,
  concatArrays: concatArrays,
  invertMap: invertMap,
  charMap: charMap,
  getSingleAttribute: getSingleAttribute,
  setSingleAttribute: setSingleAttribute,
  isWhiteSpace: isWhiteSpace,
  stableSort: stableSort
};

/***/ }),

/***/ 380:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _excluded = ["modules"];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DocUtils = __webpack_require__(557);
DocUtils.traits = __webpack_require__(505);
DocUtils.moduleWrapper = __webpack_require__(223);
var createScope = __webpack_require__(919);
var _require = __webpack_require__(257),
  throwMultiError = _require.throwMultiError,
  throwResolveBeforeCompile = _require.throwResolveBeforeCompile,
  throwRenderInvalidTemplate = _require.throwRenderInvalidTemplate,
  throwRenderTwice = _require.throwRenderTwice;
var logErrors = __webpack_require__(567);
var collectContentTypes = __webpack_require__(712);
var ctXML = "[Content_Types].xml";
var relsFile = "_rels/.rels";
var commonModule = __webpack_require__(107);
var Lexer = __webpack_require__(303);
var defaults = DocUtils.defaults,
  str2xml = DocUtils.str2xml,
  xml2str = DocUtils.xml2str,
  moduleWrapper = DocUtils.moduleWrapper,
  concatArrays = DocUtils.concatArrays,
  uniq = DocUtils.uniq,
  stableSort = DocUtils.stableSort;
var _require2 = __webpack_require__(257),
  XTInternalError = _require2.XTInternalError,
  throwFileTypeNotIdentified = _require2.throwFileTypeNotIdentified,
  throwFileTypeNotHandled = _require2.throwFileTypeNotHandled,
  throwApiVersionError = _require2.throwApiVersionError;
var currentModuleApiVersion = [3, 36, 0];
function dropUnsupportedFileTypesModules(dx) {
  dx.modules = dx.modules.filter(function (module) {
    if (module.supportedFileTypes) {
      if (!Array.isArray(module.supportedFileTypes)) {
        throw new Error("The supportedFileTypes field of the module must be an array");
      }
      var isSupportedModule = module.supportedFileTypes.indexOf(dx.fileType) !== -1;
      if (!isSupportedModule) {
        module.on("detached");
      }
      return isSupportedModule;
    }
    return true;
  });
}
var Docxtemplater = /*#__PURE__*/function () {
  function Docxtemplater(zip) {
    var _this = this;
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$modules = _ref.modules,
      modules = _ref$modules === void 0 ? [] : _ref$modules,
      options = _objectWithoutProperties(_ref, _excluded);
    _classCallCheck(this, Docxtemplater);
    if (!Array.isArray(modules)) {
      throw new Error("The modules argument of docxtemplater's constructor must be an array");
    }
    this.targets = [];
    this.rendered = false;
    this.scopeManagers = {};
    this.compiled = {};
    this.modules = [commonModule()];
    this.setOptions(options);
    modules.forEach(function (module) {
      _this.attachModule(module);
    });
    if (arguments.length > 0) {
      if (!zip || !zip.files || typeof zip.file !== "function") {
        throw new Error("The first argument of docxtemplater's constructor must be a valid zip file (jszip v2 or pizzip v3)");
      }
      this.loadZip(zip);
      // remove the unsupported modules
      dropUnsupportedFileTypesModules(this);
      this.compile();
      this.v4Constructor = true;
    }
  }
  _createClass(Docxtemplater, [{
    key: "verifyApiVersion",
    value: function verifyApiVersion(neededVersion) {
      neededVersion = neededVersion.split(".").map(function (i) {
        return parseInt(i, 10);
      });
      if (neededVersion.length !== 3) {
        throwApiVersionError("neededVersion is not a valid version", {
          neededVersion: neededVersion,
          explanation: "the neededVersion must be an array of length 3"
        });
      }
      if (neededVersion[0] !== currentModuleApiVersion[0]) {
        throwApiVersionError("The major api version do not match, you probably have to update docxtemplater with npm install --save docxtemplater", {
          neededVersion: neededVersion,
          currentModuleApiVersion: currentModuleApiVersion,
          explanation: "moduleAPIVersionMismatch : needed=".concat(neededVersion.join("."), ", current=").concat(currentModuleApiVersion.join("."))
        });
      }
      if (neededVersion[1] > currentModuleApiVersion[1]) {
        throwApiVersionError("The minor api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater", {
          neededVersion: neededVersion,
          currentModuleApiVersion: currentModuleApiVersion,
          explanation: "moduleAPIVersionMismatch : needed=".concat(neededVersion.join("."), ", current=").concat(currentModuleApiVersion.join("."))
        });
      }
      if (neededVersion[1] === currentModuleApiVersion[1] && neededVersion[2] > currentModuleApiVersion[2]) {
        throwApiVersionError("The patch api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater", {
          neededVersion: neededVersion,
          currentModuleApiVersion: currentModuleApiVersion,
          explanation: "moduleAPIVersionMismatch : needed=".concat(neededVersion.join("."), ", current=").concat(currentModuleApiVersion.join("."))
        });
      }
      return true;
    }
  }, {
    key: "setModules",
    value: function setModules(obj) {
      this.modules.forEach(function (module) {
        module.set(obj);
      });
    }
  }, {
    key: "sendEvent",
    value: function sendEvent(eventName) {
      this.modules.forEach(function (module) {
        module.on(eventName);
      });
    }
  }, {
    key: "attachModule",
    value: function attachModule(module) {
      if (this.v4Constructor) {
        throw new XTInternalError("attachModule() should not be called manually when using the v4 constructor");
      }
      var moduleType = _typeof(module);
      if (moduleType === "function") {
        throw new XTInternalError("Cannot attach a class/function as a module. Most probably you forgot to instantiate the module by using `new` on the module.");
      }
      if (!module || moduleType !== "object") {
        throw new XTInternalError("Cannot attachModule with a falsy value");
      }
      if (module.requiredAPIVersion) {
        this.verifyApiVersion(module.requiredAPIVersion);
      }
      if (module.attached === true) {
        if (typeof module.clone === "function") {
          module = module.clone();
        } else {
          throw new Error("Cannot attach a module that was already attached : \"".concat(module.name, "\". The most likely cause is that you are instantiating the module at the root level, and using it for multiple instances of Docxtemplater"));
        }
      }
      module.attached = true;
      var wrappedModule = moduleWrapper(module);
      this.modules.push(wrappedModule);
      wrappedModule.on("attached");
      if (this.fileType) {
        dropUnsupportedFileTypesModules(this);
      }
      return this;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var _this2 = this;
      if (this.v4Constructor) {
        throw new Error("setOptions() should not be called manually when using the v4 constructor");
      }
      if (!options) {
        throw new Error("setOptions should be called with an object as first parameter");
      }
      this.options = {};
      Object.keys(defaults).forEach(function (key) {
        var defaultValue = defaults[key];
        _this2.options[key] = options[key] != null ? options[key] : defaultValue;
        _this2[key] = _this2.options[key];
      });
      this.delimiters.start = DocUtils.utf8ToWord(this.delimiters.start);
      this.delimiters.end = DocUtils.utf8ToWord(this.delimiters.end);
      return this;
    }
  }, {
    key: "loadZip",
    value: function loadZip(zip) {
      if (this.v4Constructor) {
        throw new Error("loadZip() should not be called manually when using the v4 constructor");
      }
      if (zip.loadAsync) {
        throw new XTInternalError("Docxtemplater doesn't handle JSZip version >=3, please use pizzip");
      }
      this.zip = zip;
      this.updateFileTypeConfig();
      this.modules = concatArrays([this.fileTypeConfig.baseModules.map(function (moduleFunction) {
        return moduleFunction();
      }), this.modules]);
      dropUnsupportedFileTypesModules(this);
      return this;
    }
  }, {
    key: "precompileFile",
    value: function precompileFile(fileName) {
      var currentFile = this.createTemplateClass(fileName);
      currentFile.preparse();
      this.compiled[fileName] = currentFile;
    }
  }, {
    key: "compileFile",
    value: function compileFile(fileName) {
      this.compiled[fileName].parse();
    }
  }, {
    key: "getScopeManager",
    value: function getScopeManager(to, currentFile, tags) {
      if (!this.scopeManagers[to]) {
        this.scopeManagers[to] = createScope({
          tags: tags,
          parser: this.parser,
          cachedParsers: currentFile.cachedParsers
        });
      }
      return this.scopeManagers[to];
    }
  }, {
    key: "resolveData",
    value: function resolveData(data) {
      var _this3 = this;
      var errors = [];
      if (!Object.keys(this.compiled).length) {
        throwResolveBeforeCompile();
      }
      return Promise.resolve(data).then(function (data) {
        _this3.setData(data);
        _this3.setModules({
          data: _this3.data,
          Lexer: Lexer
        });
        _this3.mapper = _this3.modules.reduce(function (value, module) {
          return module.getRenderedMap(value);
        }, {});
        return Promise.all(Object.keys(_this3.mapper).map(function (to) {
          var _this3$mapper$to = _this3.mapper[to],
            from = _this3$mapper$to.from,
            data = _this3$mapper$to.data;
          return Promise.resolve(data).then(function (data) {
            var currentFile = _this3.compiled[from];
            currentFile.filePath = to;
            currentFile.scopeManager = _this3.getScopeManager(to, currentFile, data);
            return currentFile.resolveTags(data).then(function (result) {
              currentFile.scopeManager.finishedResolving = true;
              return result;
            }, function (errs) {
              Array.prototype.push.apply(errors, errs);
            });
          });
        })).then(function (resolved) {
          if (errors.length !== 0) {
            if (_this3.options.errorLogging) {
              logErrors(errors, _this3.options.errorLogging);
            }
            throwMultiError(errors);
          }
          return concatArrays(resolved);
        });
      });
    }
  }, {
    key: "reorderModules",
    value: function reorderModules() {
      this.modules = stableSort(this.modules, function (m1, m2) {
        return (m2.priority || 0) - (m1.priority || 0);
      });
    }
  }, {
    key: "compile",
    value: function compile() {
      var _this4 = this;
      this.updateFileTypeConfig();
      this.reorderModules();
      if (Object.keys(this.compiled).length) {
        return this;
      }
      this.options = this.modules.reduce(function (options, module) {
        return module.optionsTransformer(options, _this4);
      }, this.options);
      this.options.xmlFileNames = uniq(this.options.xmlFileNames);
      this.xmlDocuments = this.options.xmlFileNames.reduce(function (xmlDocuments, fileName) {
        var content = _this4.zip.files[fileName].asText();
        xmlDocuments[fileName] = str2xml(content);
        return xmlDocuments;
      }, {});
      this.setModules({
        zip: this.zip,
        xmlDocuments: this.xmlDocuments
      });
      this.getTemplatedFiles();
      // Loop inside all templatedFiles (ie xml files with content).
      // Sometimes they don't exist (footer.xml for example)
      this.templatedFiles.forEach(function (fileName) {
        if (_this4.zip.files[fileName] != null) {
          _this4.precompileFile(fileName);
        }
      });
      this.templatedFiles.forEach(function (fileName) {
        if (_this4.zip.files[fileName] != null) {
          _this4.compileFile(fileName);
        }
      });
      this.setModules({
        compiled: this.compiled
      });
      verifyErrors(this);
      return this;
    }
  }, {
    key: "getRelsTypes",
    value: function getRelsTypes() {
      var rootRels = this.zip.files[relsFile];
      var rootRelsXml = rootRels ? str2xml(rootRels.asText()) : null;
      var rootRelationships = rootRelsXml ? rootRelsXml.getElementsByTagName("Relationship") : [];
      var relsTypes = {};
      for (var i = 0, len = rootRelationships.length; i < len; i++) {
        var r = rootRelationships[i];
        relsTypes[r.getAttribute("Target")] = r.getAttribute("Type");
      }
      return relsTypes;
    }
  }, {
    key: "getContentTypes",
    value: function getContentTypes() {
      var contentTypes = this.zip.files[ctXML];
      var contentTypeXml = contentTypes ? str2xml(contentTypes.asText()) : null;
      var overrides = contentTypeXml ? contentTypeXml.getElementsByTagName("Override") : null;
      var defaults = contentTypeXml ? contentTypeXml.getElementsByTagName("Default") : null;
      return {
        overrides: overrides,
        defaults: defaults,
        contentTypes: contentTypes,
        contentTypeXml: contentTypeXml
      };
    }
  }, {
    key: "updateFileTypeConfig",
    value: function updateFileTypeConfig() {
      var _this5 = this;
      var fileType;
      if (this.zip.files.mimetype) {
        fileType = "odt";
      }
      this.relsTypes = this.getRelsTypes();
      var _this$getContentTypes = this.getContentTypes(),
        overrides = _this$getContentTypes.overrides,
        defaults = _this$getContentTypes.defaults,
        contentTypes = _this$getContentTypes.contentTypes,
        contentTypeXml = _this$getContentTypes.contentTypeXml;
      if (contentTypeXml) {
        this.filesContentTypes = collectContentTypes(overrides, defaults, this.zip);
        this.invertedContentTypes = DocUtils.invertMap(this.filesContentTypes);
        this.setModules({
          contentTypes: this.contentTypes,
          invertedContentTypes: this.invertedContentTypes
        });
      }
      this.modules.forEach(function (module) {
        fileType = module.getFileType({
          zip: _this5.zip,
          contentTypes: contentTypes,
          contentTypeXml: contentTypeXml,
          overrides: overrides,
          defaults: defaults,
          doc: _this5
        }) || fileType;
      });
      if (fileType === "odt") {
        throwFileTypeNotHandled(fileType);
      }
      if (!fileType) {
        throwFileTypeNotIdentified();
      }
      this.fileType = fileType;
      dropUnsupportedFileTypesModules(this);
      this.fileTypeConfig = this.options.fileTypeConfig || this.fileTypeConfig || Docxtemplater.FileTypeConfig[this.fileType]();
      return this;
    }
  }, {
    key: "renderAsync",
    value: function renderAsync(data) {
      var _this6 = this;
      return this.resolveData(data).then(function () {
        return _this6.render();
      });
    }
  }, {
    key: "render",
    value: function render(data) {
      var _this7 = this;
      if (this.rendered) {
        throwRenderTwice();
      }
      this.rendered = true;
      this.compile();
      if (this.errors.length > 0) {
        throwRenderInvalidTemplate();
      }
      if (data) {
        this.setData(data);
      }
      this.setModules({
        data: this.data,
        Lexer: Lexer
      });
      this.mapper = this.mapper || this.modules.reduce(function (value, module) {
        return module.getRenderedMap(value);
      }, {});
      Object.keys(this.mapper).forEach(function (to) {
        var _this7$mapper$to = _this7.mapper[to],
          from = _this7$mapper$to.from,
          data = _this7$mapper$to.data;
        var currentFile = _this7.compiled[from];
        currentFile.scopeManager = _this7.getScopeManager(to, currentFile, data);
        currentFile.render(to);
        _this7.zip.file(to, currentFile.content, {
          createFolders: true
        });
      });
      verifyErrors(this);
      this.sendEvent("syncing-zip");
      this.syncZip();
      return this;
    }
  }, {
    key: "syncZip",
    value: function syncZip() {
      var _this8 = this;
      Object.keys(this.xmlDocuments).forEach(function (fileName) {
        _this8.zip.remove(fileName);
        var content = xml2str(_this8.xmlDocuments[fileName]);
        return _this8.zip.file(fileName, content, {
          createFolders: true
        });
      });
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
      return this;
    }
  }, {
    key: "getZip",
    value: function getZip() {
      return this.zip;
    }
  }, {
    key: "createTemplateClass",
    value: function createTemplateClass(path) {
      var content = this.zip.files[path].asText();
      return this.createTemplateClassFromContent(content, path);
    }
  }, {
    key: "createTemplateClassFromContent",
    value: function createTemplateClassFromContent(content, filePath) {
      var _this9 = this;
      var xmltOptions = {
        filePath: filePath,
        contentType: this.filesContentTypes[filePath],
        relsType: this.relsTypes[filePath]
      };
      Object.keys(defaults).concat(["filesContentTypes", "fileTypeConfig", "fileType", "modules"]).forEach(function (key) {
        xmltOptions[key] = _this9[key];
      });
      return new Docxtemplater.XmlTemplater(content, xmltOptions);
    }
  }, {
    key: "getFullText",
    value: function getFullText(path) {
      return this.createTemplateClass(path || this.fileTypeConfig.textPath(this)).getFullText();
    }
  }, {
    key: "getTemplatedFiles",
    value: function getTemplatedFiles() {
      var _this10 = this;
      this.templatedFiles = this.fileTypeConfig.getTemplatedFiles(this.zip);
      this.targets.forEach(function (target) {
        _this10.templatedFiles.push(target);
      });
      this.templatedFiles = uniq(this.templatedFiles);
      return this.templatedFiles;
    }
  }]);
  return Docxtemplater;
}();
function verifyErrors(doc) {
  var compiled = doc.compiled;
  doc.errors = concatArrays(Object.keys(compiled).map(function (name) {
    return compiled[name].allErrors;
  }));
  if (doc.errors.length !== 0) {
    if (doc.options.errorLogging) {
      logErrors(doc.errors, doc.options.errorLogging);
    }
    throwMultiError(doc.errors);
  }
}
Docxtemplater.DocUtils = DocUtils;
Docxtemplater.Errors = __webpack_require__(257);
Docxtemplater.XmlTemplater = __webpack_require__(827);
Docxtemplater.FileTypeConfig = __webpack_require__(952);
Docxtemplater.XmlMatcher = __webpack_require__(465);
module.exports = Docxtemplater;

/***/ }),

/***/ 567:
/***/ (function(module) {

// The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).concat("stack").reduce(function (error, key) {
      error[key] = value[key];
      if (key === "stack") {
        // This is used because in Firefox, stack is not an own property
        error[key] = value[key].toString();
      }
      return error;
    }, {});
  }
  return value;
}
function logger(error, logging) {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({
    error: error
  }, replaceErrors, logging === "json" ? 2 : null));
  if (error.properties && error.properties.errors instanceof Array) {
    var errorMessages = error.properties.errors.map(function (error) {
      return error.properties.explanation;
    }).join("\n");
    // eslint-disable-next-line no-console
    console.log("errorMessages", errorMessages);
    // errorMessages is a humanly readable message looking like this :
    // 'The tag beginning with "foobar" is unopened'
  }
}

module.exports = logger;

/***/ }),

/***/ 257:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = __webpack_require__(287),
  last = _require.last,
  first = _require.first;
function XTError(message) {
  this.name = "GenericError";
  this.message = message;
  this.stack = new Error(message).stack;
}
XTError.prototype = Error.prototype;
function XTTemplateError(message) {
  this.name = "TemplateError";
  this.message = message;
  this.stack = new Error(message).stack;
}
XTTemplateError.prototype = new XTError();
function XTRenderingError(message) {
  this.name = "RenderingError";
  this.message = message;
  this.stack = new Error(message).stack;
}
XTRenderingError.prototype = new XTError();
function XTScopeParserError(message) {
  this.name = "ScopeParserError";
  this.message = message;
  this.stack = new Error(message).stack;
}
XTScopeParserError.prototype = new XTError();
function XTInternalError(message) {
  this.name = "InternalError";
  this.properties = {
    explanation: "InternalError"
  };
  this.message = message;
  this.stack = new Error(message).stack;
}
XTInternalError.prototype = new XTError();
function XTAPIVersionError(message) {
  this.name = "APIVersionError";
  this.properties = {
    explanation: "APIVersionError"
  };
  this.message = message;
  this.stack = new Error(message).stack;
}
XTAPIVersionError.prototype = new XTError();
function throwApiVersionError(msg, properties) {
  var err = new XTAPIVersionError(msg);
  err.properties = _objectSpread({
    id: "api_version_error"
  }, properties);
  throw err;
}
function throwMultiError(errors) {
  var err = new XTTemplateError("Multi error");
  err.properties = {
    errors: errors,
    id: "multi_error",
    explanation: "The template has multiple errors"
  };
  throw err;
}
function getUnopenedTagException(options) {
  var err = new XTTemplateError("Unopened tag");
  err.properties = {
    xtag: last(options.xtag.split(" ")),
    id: "unopened_tag",
    context: options.xtag,
    offset: options.offset,
    lIndex: options.lIndex,
    explanation: "The tag beginning with \"".concat(options.xtag.substr(0, 10), "\" is unopened")
  };
  return err;
}
function getDuplicateOpenTagException(options) {
  var err = new XTTemplateError("Duplicate open tag, expected one open tag");
  err.properties = {
    xtag: first(options.xtag.split(" ")),
    id: "duplicate_open_tag",
    context: options.xtag,
    offset: options.offset,
    lIndex: options.lIndex,
    explanation: "The tag beginning with \"".concat(options.xtag.substr(0, 10), "\" has duplicate open tags")
  };
  return err;
}
function getDuplicateCloseTagException(options) {
  var err = new XTTemplateError("Duplicate close tag, expected one close tag");
  err.properties = {
    xtag: first(options.xtag.split(" ")),
    id: "duplicate_close_tag",
    context: options.xtag,
    offset: options.offset,
    lIndex: options.lIndex,
    explanation: "The tag ending with \"".concat(options.xtag.substr(0, 10), "\" has duplicate close tags")
  };
  return err;
}
function getUnclosedTagException(options) {
  var err = new XTTemplateError("Unclosed tag");
  err.properties = {
    xtag: first(options.xtag.split(" ")).substr(1),
    id: "unclosed_tag",
    context: options.xtag,
    offset: options.offset,
    lIndex: options.lIndex,
    explanation: "The tag beginning with \"".concat(options.xtag.substr(0, 10), "\" is unclosed")
  };
  return err;
}
function throwXmlTagNotFound(options) {
  var err = new XTTemplateError("No tag \"".concat(options.element, "\" was found at the ").concat(options.position));
  var part = options.parsed[options.index];
  err.properties = {
    id: "no_xml_tag_found_at_".concat(options.position),
    explanation: "No tag \"".concat(options.element, "\" was found at the ").concat(options.position),
    offset: part.offset,
    part: part,
    parsed: options.parsed,
    index: options.index,
    element: options.element
  };
  throw err;
}
function getCorruptCharactersException(_ref) {
  var tag = _ref.tag,
    value = _ref.value,
    offset = _ref.offset;
  var err = new XTRenderingError("There are some XML corrupt characters");
  err.properties = {
    id: "invalid_xml_characters",
    xtag: tag,
    value: value,
    offset: offset,
    explanation: "There are some corrupt characters for the field ".concat(tag)
  };
  return err;
}
function getInvalidRawXMLValueException(_ref2) {
  var tag = _ref2.tag,
    value = _ref2.value,
    offset = _ref2.offset;
  var err = new XTRenderingError("Non string values are not allowed for rawXML tags");
  err.properties = {
    id: "invalid_raw_xml_value",
    xtag: tag,
    value: value,
    offset: offset,
    explanation: "The value of the raw tag : '".concat(tag, "' is not a string")
  };
  return err;
}
function throwExpandNotFound(options) {
  var _options$part = options.part,
    value = _options$part.value,
    offset = _options$part.offset,
    _options$id = options.id,
    id = _options$id === void 0 ? "raw_tag_outerxml_invalid" : _options$id,
    _options$message = options.message,
    message = _options$message === void 0 ? "Raw tag not in paragraph" : _options$message;
  var part = options.part;
  var _options$explanation = options.explanation,
    explanation = _options$explanation === void 0 ? "The tag \"".concat(value, "\" is not inside a paragraph") : _options$explanation;
  if (typeof explanation === "function") {
    explanation = explanation(part);
  }
  var err = new XTTemplateError(message);
  err.properties = {
    id: id,
    explanation: explanation,
    rootError: options.rootError,
    xtag: value,
    offset: offset,
    postparsed: options.postparsed,
    expandTo: options.expandTo,
    index: options.index
  };
  throw err;
}
function throwRawTagShouldBeOnlyTextInParagraph(options) {
  var err = new XTTemplateError("Raw tag should be the only text in paragraph");
  var tag = options.part.value;
  err.properties = {
    id: "raw_xml_tag_should_be_only_text_in_paragraph",
    explanation: "The raw tag \"".concat(tag, "\" should be the only text in this paragraph. This means that this tag should not be surrounded by any text or spaces."),
    xtag: tag,
    offset: options.part.offset,
    paragraphParts: options.paragraphParts
  };
  throw err;
}
function getUnmatchedLoopException(part) {
  var location = part.location,
    offset = part.offset;
  var t = location === "start" ? "unclosed" : "unopened";
  var T = location === "start" ? "Unclosed" : "Unopened";
  var err = new XTTemplateError("".concat(T, " loop"));
  var tag = part.value;
  err.properties = {
    id: "".concat(t, "_loop"),
    explanation: "The loop with tag \"".concat(tag, "\" is ").concat(t),
    xtag: tag,
    offset: offset
  };
  return err;
}
function getUnbalancedLoopException(pair, lastPair) {
  var err = new XTTemplateError("Unbalanced loop tag");
  var lastL = lastPair[0].part.value;
  var lastR = lastPair[1].part.value;
  var l = pair[0].part.value;
  var r = pair[1].part.value;
  err.properties = {
    id: "unbalanced_loop_tags",
    explanation: "Unbalanced loop tags {#".concat(lastL, "}{/").concat(lastR, "}{#").concat(l, "}{/").concat(r, "}"),
    offset: [lastPair[0].part.offset, pair[1].part.offset],
    lastPair: {
      left: lastPair[0].part.value,
      right: lastPair[1].part.value
    },
    pair: {
      left: pair[0].part.value,
      right: pair[1].part.value
    }
  };
  return err;
}
function getClosingTagNotMatchOpeningTag(_ref3) {
  var tags = _ref3.tags;
  var err = new XTTemplateError("Closing tag does not match opening tag");
  err.properties = {
    id: "closing_tag_does_not_match_opening_tag",
    explanation: "The tag \"".concat(tags[0].value, "\" is closed by the tag \"").concat(tags[1].value, "\""),
    openingtag: first(tags).value,
    offset: [first(tags).offset, last(tags).offset],
    closingtag: last(tags).value
  };
  return err;
}
function getScopeCompilationError(_ref4) {
  var tag = _ref4.tag,
    rootError = _ref4.rootError,
    offset = _ref4.offset;
  var err = new XTScopeParserError("Scope parser compilation failed");
  err.properties = {
    id: "scopeparser_compilation_failed",
    offset: offset,
    xtag: tag,
    explanation: "The scope parser for the tag \"".concat(tag, "\" failed to compile"),
    rootError: rootError
  };
  return err;
}
function getScopeParserExecutionError(_ref5) {
  var tag = _ref5.tag,
    scope = _ref5.scope,
    error = _ref5.error,
    offset = _ref5.offset;
  var err = new XTScopeParserError("Scope parser execution failed");
  err.properties = {
    id: "scopeparser_execution_failed",
    explanation: "The scope parser for the tag ".concat(tag, " failed to execute"),
    scope: scope,
    offset: offset,
    xtag: tag,
    rootError: error
  };
  return err;
}
function getLoopPositionProducesInvalidXMLError(_ref6) {
  var tag = _ref6.tag,
    offset = _ref6.offset;
  var err = new XTTemplateError("The position of the loop tags \"".concat(tag, "\" would produce invalid XML"));
  err.properties = {
    xtag: tag,
    id: "loop_position_invalid",
    explanation: "The tags \"".concat(tag, "\" are misplaced in the document, for example one of them is in a table and the other one outside the table"),
    offset: offset
  };
  return err;
}
function throwUnimplementedTagType(part, index) {
  var errorMsg = "Unimplemented tag type \"".concat(part.type, "\"");
  if (part.module) {
    errorMsg += " \"".concat(part.module, "\"");
  }
  var err = new XTTemplateError(errorMsg);
  err.properties = {
    part: part,
    index: index,
    id: "unimplemented_tag_type"
  };
  throw err;
}
function throwMalformedXml() {
  var err = new XTInternalError("Malformed xml");
  err.properties = {
    explanation: "The template contains malformed xml",
    id: "malformed_xml"
  };
  throw err;
}
function throwResolveBeforeCompile() {
  var err = new XTInternalError("You must run `.compile()` before running `.resolveData()`");
  err.properties = {
    id: "resolve_before_compile",
    explanation: "You must run `.compile()` before running `.resolveData()`"
  };
  throw err;
}
function throwRenderInvalidTemplate() {
  var err = new XTInternalError("You should not call .render on a document that had compilation errors");
  err.properties = {
    id: "render_on_invalid_template",
    explanation: "You should not call .render on a document that had compilation errors"
  };
  throw err;
}
function throwRenderTwice() {
  var err = new XTInternalError("You should not call .render twice on the same docxtemplater instance");
  err.properties = {
    id: "render_twice",
    explanation: "You should not call .render twice on the same docxtemplater instance"
  };
  throw err;
}
function throwFileTypeNotIdentified() {
  var err = new XTInternalError("The filetype for this file could not be identified, is this file corrupted ?");
  err.properties = {
    id: "filetype_not_identified",
    explanation: "The filetype for this file could not be identified, is this file corrupted ?"
  };
  throw err;
}
function throwXmlInvalid(content, offset) {
  var err = new XTTemplateError("An XML file has invalid xml");
  err.properties = {
    id: "file_has_invalid_xml",
    content: content,
    offset: offset,
    explanation: "The docx contains invalid XML, it is most likely corrupt"
  };
  throw err;
}
function throwFileTypeNotHandled(fileType) {
  var err = new XTInternalError("The filetype \"".concat(fileType, "\" is not handled by docxtemplater"));
  err.properties = {
    id: "filetype_not_handled",
    explanation: "The file you are trying to generate is of type \"".concat(fileType, "\", but only docx and pptx formats are handled"),
    fileType: fileType
  };
  throw err;
}
module.exports = {
  XTError: XTError,
  XTTemplateError: XTTemplateError,
  XTInternalError: XTInternalError,
  XTScopeParserError: XTScopeParserError,
  XTAPIVersionError: XTAPIVersionError,
  // Remove this alias in v4
  RenderingError: XTRenderingError,
  XTRenderingError: XTRenderingError,
  getClosingTagNotMatchOpeningTag: getClosingTagNotMatchOpeningTag,
  getLoopPositionProducesInvalidXMLError: getLoopPositionProducesInvalidXMLError,
  getScopeCompilationError: getScopeCompilationError,
  getScopeParserExecutionError: getScopeParserExecutionError,
  getUnclosedTagException: getUnclosedTagException,
  getUnopenedTagException: getUnopenedTagException,
  getUnmatchedLoopException: getUnmatchedLoopException,
  getDuplicateCloseTagException: getDuplicateCloseTagException,
  getDuplicateOpenTagException: getDuplicateOpenTagException,
  getCorruptCharactersException: getCorruptCharactersException,
  getInvalidRawXMLValueException: getInvalidRawXMLValueException,
  getUnbalancedLoopException: getUnbalancedLoopException,
  throwApiVersionError: throwApiVersionError,
  throwFileTypeNotHandled: throwFileTypeNotHandled,
  throwFileTypeNotIdentified: throwFileTypeNotIdentified,
  throwMalformedXml: throwMalformedXml,
  throwMultiError: throwMultiError,
  throwExpandNotFound: throwExpandNotFound,
  throwRawTagShouldBeOnlyTextInParagraph: throwRawTagShouldBeOnlyTextInParagraph,
  throwUnimplementedTagType: throwUnimplementedTagType,
  throwXmlTagNotFound: throwXmlTagNotFound,
  throwXmlInvalid: throwXmlInvalid,
  throwResolveBeforeCompile: throwResolveBeforeCompile,
  throwRenderInvalidTemplate: throwRenderInvalidTemplate,
  throwRenderTwice: throwRenderTwice
};

/***/ }),

/***/ 952:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var loopModule = __webpack_require__(19);
var spacePreserveModule = __webpack_require__(95);
var rawXmlModule = __webpack_require__(182);
var expandPairTrait = __webpack_require__(999);
var render = __webpack_require__(163);
function DocXFileTypeConfig() {
  return {
    getTemplatedFiles: function getTemplatedFiles() {
      return [];
    },
    textPath: function textPath(doc) {
      return doc.textTarget;
    },
    tagsXmlTextArray: ["Company", "HyperlinkBase", "Manager", "cp:category", "cp:keywords", "dc:creator", "dc:description", "dc:subject", "dc:title", "cp:contentStatus", "w:t", "m:t", "vt:lpstr", "vt:lpwstr"],
    tagsXmlLexedArray: ["w:proofState", "w:tc", "w:tr", "w:tbl", "w:body", "w:document", "w:p", "w:r", "w:br", "w:rPr", "w:pPr", "w:spacing", "w:sdtContent", "w:drawing", "w:sectPr", "w:type", "w:headerReference", "w:footerReference", "w:bookmarkStart", "w:bookmarkEnd", "w:commentRangeStart", "w:commentRangeEnd", "w:commentReference"],
    droppedTagsInsidePlaceholder: ["w:p", "w:br", "w:bookmarkStart", "w:bookmarkEnd"],
    expandTags: [{
      contains: "w:tc",
      expand: "w:tr"
    }],
    onParagraphLoop: [{
      contains: "w:p",
      expand: "w:p",
      onlyTextInTag: true
    }],
    tagRawXml: "w:p",
    baseModules: [loopModule, spacePreserveModule, expandPairTrait, rawXmlModule, render],
    tagShouldContain: [{
      tag: "w:tbl",
      shouldContain: ["w:tr"],
      drop: true
    }, {
      tag: "w:tc",
      shouldContain: ["w:p"],
      value: "<w:p></w:p>"
    }, {
      tag: "w:sdtContent",
      shouldContain: ["w:p", "w:r", "w:commentRangeStart"],
      value: "<w:p></w:p>"
    }]
  };
}
function PptXFileTypeConfig() {
  return {
    getTemplatedFiles: function getTemplatedFiles() {
      return [];
    },
    textPath: function textPath(doc) {
      return doc.textTarget;
    },
    tagsXmlTextArray: ["Company", "HyperlinkBase", "Manager", "cp:category", "cp:keywords", "dc:creator", "dc:description", "dc:subject", "dc:title", "a:t", "m:t", "vt:lpstr", "vt:lpwstr"],
    tagsXmlLexedArray: ["p:sp", "a:tc", "a:tr", "a:tbl", "a:p", "a:r", "a:rPr", "p:txBody", "a:txBody", "a:off", "a:ext", "p:graphicFrame", "p:xfrm", "a16:rowId", "a:endParaRPr"],
    droppedTagsInsidePlaceholder: ["a:p", "a:endParaRPr"],
    expandTags: [{
      contains: "a:tc",
      expand: "a:tr"
    }],
    onParagraphLoop: [{
      contains: "a:p",
      expand: "a:p",
      onlyTextInTag: true
    }],
    tagRawXml: "p:sp",
    baseModules: [loopModule, expandPairTrait, rawXmlModule, render],
    tagShouldContain: [{
      tag: "a:tbl",
      shouldContain: ["a:tr"],
      drop: true
    }, {
      tag: "p:txBody",
      shouldContain: ["a:p"],
      value: "<a:p></a:p>"
    }, {
      tag: "a:txBody",
      shouldContain: ["a:p"],
      value: "<a:p></a:p>"
    }]
  };
}
module.exports = {
  docx: DocXFileTypeConfig,
  pptx: PptXFileTypeConfig
};

/***/ }),

/***/ 330:
/***/ (function(module) {

var docxContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";
var docxmContentType = "application/vnd.ms-word.document.macroEnabled.main+xml";
var dotxContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml";
var dotmContentType = "application/vnd.ms-word.template.macroEnabledTemplate.main+xml";
var headerContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml";
var footnotesContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml";
var footerContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml";
var pptxContentType = "application/vnd.openxmlformats-officedocument.presentationml.slide+xml";
var pptxSlideMaster = "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml";
var pptxSlideLayout = "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml";
var pptxPresentationContentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml";
var main = [docxContentType, docxmContentType, dotxContentType, dotmContentType];
var filetypes = {
  main: main,
  docx: [headerContentType].concat(main, [footerContentType, footnotesContentType]),
  pptx: [pptxContentType, pptxSlideMaster, pptxSlideLayout, pptxPresentationContentType]
};
module.exports = filetypes;

/***/ }),

/***/ 127:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(557),
  startsWith = _require.startsWith,
  endsWith = _require.endsWith,
  isStarting = _require.isStarting,
  isEnding = _require.isEnding,
  isWhiteSpace = _require.isWhiteSpace;
var filetypes = __webpack_require__(330);
function addEmptyParagraphAfterTable(parts) {
  var lastNonEmpty = "";
  for (var i = 0, len = parts.length; i < len; i++) {
    var p = parts[i];
    if (isWhiteSpace(p)) {
      continue;
    }
    if (endsWith(lastNonEmpty, "</w:tbl>")) {
      if (!startsWith(p, "<w:p") && !startsWith(p, "<w:tbl") && !startsWith(p, "<w:sectPr")) {
        p = "<w:p/>".concat(p);
      }
    }
    lastNonEmpty = p;
    parts[i] = p;
  }
  return parts;
}

// eslint-disable-next-line complexity
function joinUncorrupt(parts, options) {
  var contains = options.fileTypeConfig.tagShouldContain || [];
  /* Before doing this "uncorruption" method here, this was done with the
   * `part.emptyValue` trick, however, there were some corruptions that were
   * not handled, for example with a template like this :
   *
   * ------------------------------------------------
   * | {-w:p falsy}My para{/falsy}   |              |
   * | {-w:p falsy}My para{/falsy}   |              |
   */
  var collecting = "";
  var currentlyCollecting = -1;
  if (filetypes.docx.indexOf(options.contentType) !== -1) {
    parts = addEmptyParagraphAfterTable(parts);
  }
  var startIndex = -1;
  for (var i = 0, len = parts.length; i < len; i++) {
    var part = parts[i];
    for (var j = 0, len2 = contains.length; j < len2; j++) {
      var _contains$j = contains[j],
        tag = _contains$j.tag,
        shouldContain = _contains$j.shouldContain,
        value = _contains$j.value,
        drop = _contains$j.drop;
      if (currentlyCollecting === j) {
        if (isEnding(part, tag)) {
          currentlyCollecting = -1;
          if (drop) {
            for (var k = startIndex; k <= i; k++) {
              parts[k] = "";
            }
          } else {
            for (var _k = startIndex; _k < i; _k++) {
              parts[_k] = "";
            }
            parts[i] = collecting + value + part;
          }
          break;
        }
        collecting += part;
        for (var _k2 = 0, len3 = shouldContain.length; _k2 < len3; _k2++) {
          var sc = shouldContain[_k2];
          if (isStarting(part, sc)) {
            currentlyCollecting = -1;
            // parts[i] = collecting;
            break;
          }
        }
        if (currentlyCollecting > -1) {
          // parts[i] = "";
        }
        break;
      }
      if (currentlyCollecting === -1 && isStarting(part, tag) &&
      // to verify that the part doesn't have multiple tags, such as <w:tc><w:p>
      part.substr(1).indexOf("<") === -1) {
        // self-closing tag such as <w:t/>
        if (part[part.length - 2] === "/") {
          parts[i] = "";
          break;
        } else {
          startIndex = i;
          currentlyCollecting = j;
          collecting = part;
          // parts[i] = "";
          break;
        }
      }
    }
  }
  return parts;
}
module.exports = joinUncorrupt;

/***/ }),

/***/ 303:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _require = __webpack_require__(257),
  getUnclosedTagException = _require.getUnclosedTagException,
  getUnopenedTagException = _require.getUnopenedTagException,
  getDuplicateOpenTagException = _require.getDuplicateOpenTagException,
  getDuplicateCloseTagException = _require.getDuplicateCloseTagException,
  throwMalformedXml = _require.throwMalformedXml,
  throwXmlInvalid = _require.throwXmlInvalid,
  XTTemplateError = _require.XTTemplateError;
var _require2 = __webpack_require__(557),
  isTextStart = _require2.isTextStart,
  isTextEnd = _require2.isTextEnd,
  wordToUtf8 = _require2.wordToUtf8;
var DELIMITER_NONE = 0,
  DELIMITER_EQUAL = 1,
  DELIMITER_START = 2,
  DELIMITER_END = 3;
function inRange(range, match) {
  return range[0] <= match.offset && match.offset < range[1];
}
function updateInTextTag(part, inTextTag) {
  if (isTextStart(part)) {
    if (inTextTag) {
      throwMalformedXml();
    }
    return true;
  }
  if (isTextEnd(part)) {
    if (!inTextTag) {
      throwMalformedXml();
    }
    return false;
  }
  return inTextTag;
}
function getTag(tag) {
  var position = "";
  var start = 1;
  var end = tag.indexOf(" ");
  if (tag[tag.length - 2] === "/") {
    position = "selfclosing";
    if (end === -1) {
      end = tag.length - 2;
    }
  } else if (tag[1] === "/") {
    start = 2;
    position = "end";
    if (end === -1) {
      end = tag.length - 1;
    }
  } else {
    position = "start";
    if (end === -1) {
      end = tag.length - 1;
    }
  }
  return {
    tag: tag.slice(start, end),
    position: position
  };
}
function tagMatcher(content, textMatchArray, othersMatchArray) {
  var cursor = 0;
  var contentLength = content.length;
  var allMatches = {};
  for (var i = 0, len = textMatchArray.length; i < len; i++) {
    allMatches[textMatchArray[i]] = true;
  }
  for (var _i = 0, _len = othersMatchArray.length; _i < _len; _i++) {
    allMatches[othersMatchArray[_i]] = false;
  }
  var totalMatches = [];
  while (cursor < contentLength) {
    cursor = content.indexOf("<", cursor);
    if (cursor === -1) {
      break;
    }
    var offset = cursor;
    var nextOpening = content.indexOf("<", cursor + 1);
    cursor = content.indexOf(">", cursor);
    if (cursor === -1 || nextOpening !== -1 && cursor > nextOpening) {
      throwXmlInvalid(content, offset);
    }
    var tagText = content.slice(offset, cursor + 1);
    var _getTag = getTag(tagText),
      tag = _getTag.tag,
      position = _getTag.position;
    var text = allMatches[tag];
    if (text == null) {
      continue;
    }
    totalMatches.push({
      type: "tag",
      position: position,
      text: text,
      offset: offset,
      value: tagText,
      tag: tag
    });
  }
  return totalMatches;
}
function getDelimiterErrors(delimiterMatches, fullText) {
  var errors = [];
  var inDelimiter = false;
  var lastDelimiterMatch = {
    offset: 0
  };
  var xtag;
  delimiterMatches.forEach(function (delimiterMatch) {
    xtag = fullText.substr(lastDelimiterMatch.offset, delimiterMatch.offset - lastDelimiterMatch.offset);
    if (delimiterMatch.position === "start" && inDelimiter || delimiterMatch.position === "end" && !inDelimiter) {
      if (delimiterMatch.position === "start") {
        if (lastDelimiterMatch.offset + lastDelimiterMatch.length === delimiterMatch.offset) {
          xtag = fullText.substr(lastDelimiterMatch.offset, delimiterMatch.offset - lastDelimiterMatch.offset + lastDelimiterMatch.length + 4);
          errors.push(getDuplicateOpenTagException({
            xtag: xtag,
            offset: lastDelimiterMatch.offset
          }));
        } else {
          errors.push(getUnclosedTagException({
            xtag: wordToUtf8(xtag),
            offset: lastDelimiterMatch.offset
          }));
        }
        delimiterMatch.error = true;
      } else {
        if (lastDelimiterMatch.offset + lastDelimiterMatch.length === delimiterMatch.offset) {
          xtag = fullText.substr(lastDelimiterMatch.offset - 4, delimiterMatch.offset - lastDelimiterMatch.offset + 4 + lastDelimiterMatch.length);
          errors.push(getDuplicateCloseTagException({
            xtag: xtag,
            offset: lastDelimiterMatch.offset
          }));
        } else {
          errors.push(getUnopenedTagException({
            xtag: xtag,
            offset: delimiterMatch.offset
          }));
        }
        delimiterMatch.error = true;
      }
    } else {
      inDelimiter = !inDelimiter;
    }
    lastDelimiterMatch = delimiterMatch;
  });
  var delimiterMatch = {
    offset: fullText.length
  };
  xtag = fullText.substr(lastDelimiterMatch.offset, delimiterMatch.offset - lastDelimiterMatch.offset);
  if (inDelimiter) {
    errors.push(getUnclosedTagException({
      xtag: wordToUtf8(xtag),
      offset: lastDelimiterMatch.offset
    }));
    delimiterMatch.error = true;
  }
  return errors;
}
function compareOffsets(startOffset, endOffset) {
  if (startOffset === -1 && endOffset === -1) {
    return DELIMITER_NONE;
  }
  if (startOffset === endOffset) {
    return DELIMITER_EQUAL;
  }
  if (startOffset === -1 || endOffset === -1) {
    return endOffset < startOffset ? DELIMITER_START : DELIMITER_END;
  }
  return startOffset < endOffset ? DELIMITER_START : DELIMITER_END;
}
function splitDelimiters(inside) {
  var newDelimiters = inside.split(" ");
  if (newDelimiters.length !== 2) {
    var err = new XTTemplateError("New Delimiters cannot be parsed");
    err.properties = {
      id: "change_delimiters_invalid",
      explanation: "Cannot parser delimiters"
    };
    throw err;
  }
  var _newDelimiters = _slicedToArray(newDelimiters, 2),
    start = _newDelimiters[0],
    end = _newDelimiters[1];
  if (start.length === 0 || end.length === 0) {
    var _err = new XTTemplateError("New Delimiters cannot be parsed");
    _err.properties = {
      id: "change_delimiters_invalid",
      explanation: "Cannot parser delimiters"
    };
    throw _err;
  }
  return [start, end];
}
function getAllDelimiterIndexes(fullText, delimiters) {
  var indexes = [];
  var start = delimiters.start,
    end = delimiters.end;
  var offset = -1;
  var insideTag = false;
  while (true) {
    var startOffset = fullText.indexOf(start, offset + 1);
    var endOffset = fullText.indexOf(end, offset + 1);
    var position = null;
    var len = void 0;
    var compareResult = compareOffsets(startOffset, endOffset);
    if (compareResult === DELIMITER_EQUAL) {
      compareResult = insideTag ? DELIMITER_END : DELIMITER_START;
    }
    switch (compareResult) {
      case DELIMITER_NONE:
        return indexes;
      case DELIMITER_END:
        insideTag = false;
        offset = endOffset;
        position = "end";
        len = end.length;
        break;
      case DELIMITER_START:
        insideTag = true;
        offset = startOffset;
        position = "start";
        len = start.length;
        break;
    }
    // if tag starts with =, such as {=[ ]=}
    if (compareResult === DELIMITER_START && fullText[offset + start.length] === "=") {
      indexes.push({
        offset: startOffset,
        position: "start",
        length: start.length,
        changedelimiter: true
      });
      var nextEqual = fullText.indexOf("=", offset + start.length + 1);
      var nextEndOffset = fullText.indexOf(end, nextEqual + 1);
      indexes.push({
        offset: nextEndOffset,
        position: "end",
        length: end.length,
        changedelimiter: true
      });
      var _insideTag = fullText.substr(offset + start.length + 1, nextEqual - offset - start.length - 1);
      var _splitDelimiters = splitDelimiters(_insideTag);
      var _splitDelimiters2 = _slicedToArray(_splitDelimiters, 2);
      start = _splitDelimiters2[0];
      end = _splitDelimiters2[1];
      offset = nextEndOffset;
      continue;
    }
    indexes.push({
      offset: offset,
      position: position,
      length: len
    });
  }
}
function parseDelimiters(innerContentParts, delimiters) {
  var full = innerContentParts.map(function (p) {
    return p.value;
  }).join("");
  var delimiterMatches = getAllDelimiterIndexes(full, delimiters);
  var offset = 0;
  var ranges = innerContentParts.map(function (part) {
    offset += part.value.length;
    return {
      offset: offset - part.value.length,
      lIndex: part.lIndex
    };
  });
  var errors = getDelimiterErrors(delimiterMatches, full, ranges);
  var cutNext = 0;
  var delimiterIndex = 0;
  var parsed = ranges.map(function (p, i) {
    var offset = p.offset;
    var range = [offset, offset + innerContentParts[i].value.length];
    var partContent = innerContentParts[i].value;
    var delimitersInOffset = [];
    while (delimiterIndex < delimiterMatches.length && inRange(range, delimiterMatches[delimiterIndex])) {
      delimitersInOffset.push(delimiterMatches[delimiterIndex]);
      delimiterIndex++;
    }
    var parts = [];
    var cursor = 0;
    if (cutNext > 0) {
      cursor = cutNext;
      cutNext = 0;
    }
    delimitersInOffset.forEach(function (delimiterInOffset) {
      var value = partContent.substr(cursor, delimiterInOffset.offset - offset - cursor);
      if (delimiterInOffset.changedelimiter) {
        if (delimiterInOffset.position === "start") {
          if (value.length > 0) {
            parts.push({
              type: "content",
              value: value
            });
          }
        } else {
          cursor = delimiterInOffset.offset - offset + delimiterInOffset.length;
        }
        return;
      }
      if (value.length > 0) {
        parts.push({
          type: "content",
          value: value
        });
        cursor += value.length;
      }
      var delimiterPart = {
        type: "delimiter",
        position: delimiterInOffset.position,
        offset: cursor + offset
      };
      parts.push(delimiterPart);
      cursor = delimiterInOffset.offset - offset + delimiterInOffset.length;
    });
    cutNext = cursor - partContent.length;
    var value = partContent.substr(cursor);
    if (value.length > 0) {
      parts.push({
        type: "content",
        value: value
      });
    }
    return parts;
  }, this);
  return {
    parsed: parsed,
    errors: errors
  };
}
function isInsideContent(part) {
  // Stryker disable all : because the part.position === "insidetag" would be enough but we want to make the API future proof
  return part.type === "content" && part.position === "insidetag";
  // Stryker restore all
}

function getContentParts(xmlparsed) {
  return xmlparsed.filter(isInsideContent);
}
function decodeContentParts(xmlparsed) {
  var inTextTag = false;
  xmlparsed.forEach(function (part) {
    inTextTag = updateInTextTag(part, inTextTag);
    if (part.type === "content") {
      part.position = inTextTag ? "insidetag" : "outsidetag";
    }
    if (isInsideContent(part)) {
      part.value = part.value.replace(/>/g, "&gt;");
    }
  });
}
module.exports = {
  parseDelimiters: parseDelimiters,
  parse: function parse(xmlparsed, delimiters) {
    decodeContentParts(xmlparsed);
    var _parseDelimiters = parseDelimiters(getContentParts(xmlparsed), delimiters),
      delimiterParsed = _parseDelimiters.parsed,
      errors = _parseDelimiters.errors;
    var lexed = [];
    var index = 0;
    var lIndex = 0;
    xmlparsed.forEach(function (part) {
      if (isInsideContent(part)) {
        Array.prototype.push.apply(lexed, delimiterParsed[index].map(function (p) {
          if (p.type === "content") {
            p.position = "insidetag";
          }
          p.lIndex = lIndex++;
          return p;
        }));
        index++;
      } else {
        part.lIndex = lIndex++;
        lexed.push(part);
      }
    });
    return {
      errors: errors,
      lexed: lexed
    };
  },
  xmlparse: function xmlparse(content, xmltags) {
    var matches = tagMatcher(content, xmltags.text, xmltags.other);
    var cursor = 0;
    var parsed = matches.reduce(function (parsed, match) {
      var value = content.substr(cursor, match.offset - cursor);
      if (value.length > 0) {
        parsed.push({
          type: "content",
          value: value
        });
      }
      cursor = match.offset + match.value.length;
      delete match.offset;
      parsed.push(match);
      return parsed;
    }, []);
    var value = content.substr(cursor);
    if (value.length > 0) {
      parsed.push({
        type: "content",
        value: value
      });
    }
    return parsed;
  }
};

/***/ }),

/***/ 509:
/***/ (function(module) {

function getMinFromArrays(arrays, state) {
  var minIndex = -1;
  for (var i = 0, l = arrays.length; i < l; i++) {
    if (state[i] >= arrays[i].length) {
      continue;
    }
    if (minIndex === -1 || arrays[i][state[i]].offset < arrays[minIndex][state[minIndex]].offset) {
      minIndex = i;
    }
  }
  return minIndex;
}
module.exports = function (arrays) {
  var totalLength = arrays.reduce(function (sum, array) {
    return sum + array.length;
  }, 0);
  arrays = arrays.filter(function (array) {
    return array.length > 0;
  });
  var resultArray = new Array(totalLength);
  var state = arrays.map(function () {
    return 0;
  });
  for (var i = 0; i < totalLength; i++) {
    var arrayIndex = getMinFromArrays(arrays, state);
    resultArray[i] = arrays[arrayIndex][state[arrayIndex]];
    state[arrayIndex]++;
  }
  return resultArray;
};

/***/ }),

/***/ 223:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(257),
  XTInternalError = _require.XTInternalError;
function emptyFun() {}
function identity(i) {
  return i;
}
module.exports = function (module) {
  var defaults = {
    set: emptyFun,
    matchers: function matchers() {
      return [];
    },
    parse: emptyFun,
    render: emptyFun,
    getTraits: emptyFun,
    getFileType: emptyFun,
    nullGetter: emptyFun,
    optionsTransformer: identity,
    postrender: identity,
    errorsTransformer: identity,
    getRenderedMap: identity,
    preparse: identity,
    postparse: identity,
    on: emptyFun,
    resolve: emptyFun
  };
  if (Object.keys(defaults).every(function (key) {
    return !module[key];
  })) {
    var err = new XTInternalError("This module cannot be wrapped, because it doesn't define any of the necessary functions");
    err.properties = {
      id: "module_cannot_be_wrapped",
      explanation: "This module cannot be wrapped, because it doesn't define any of the necessary functions"
    };
    throw err;
  }
  Object.keys(defaults).forEach(function (key) {
    module[key] = module[key] || defaults[key];
  });
  return module;
};

/***/ }),

/***/ 107:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var wrapper = __webpack_require__(223);
var filetypes = __webpack_require__(330);
var coreContentType = "application/vnd.openxmlformats-package.core-properties+xml";
var appContentType = "application/vnd.openxmlformats-officedocument.extended-properties+xml";
var customContentType = "application/vnd.openxmlformats-officedocument.custom-properties+xml";
var settingsContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml";
var commonContentTypes = [settingsContentType, coreContentType, appContentType, customContentType];
var Common = /*#__PURE__*/function () {
  function Common() {
    _classCallCheck(this, Common);
    this.name = "Common";
  }
  _createClass(Common, [{
    key: "getFileType",
    value: function getFileType(_ref) {
      var doc = _ref.doc;
      var invertedContentTypes = doc.invertedContentTypes;
      if (!invertedContentTypes) {
        return;
      }
      for (var j = 0, len2 = commonContentTypes.length; j < len2; j++) {
        var ct = commonContentTypes[j];
        if (invertedContentTypes[ct]) {
          Array.prototype.push.apply(doc.targets, invertedContentTypes[ct]);
        }
      }
      var keys = ["docx", "pptx"];
      var ftCandidate;
      for (var i = 0, len = keys.length; i < len; i++) {
        var contentTypes = filetypes[keys[i]];
        for (var _j = 0, _len = contentTypes.length; _j < _len; _j++) {
          var _ct = contentTypes[_j];
          if (invertedContentTypes[_ct]) {
            for (var k = 0, _len2 = invertedContentTypes[_ct].length; k < _len2; k++) {
              var target = invertedContentTypes[_ct][k];
              if (doc.relsTypes[target] && ["http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"].indexOf(doc.relsTypes[target]) === -1) {
                continue;
              }
              ftCandidate = keys[i];
              if (filetypes.main.indexOf(_ct) !== -1 || _ct === filetypes.pptx[0]) {
                doc.textTarget || (doc.textTarget = target);
              }
              doc.targets.push(target);
            }
          }
        }
        if (ftCandidate) {
          return ftCandidate;
        }
      }
      return ftCandidate;
    }
  }]);
  return Common;
}();
module.exports = function () {
  return wrapper(new Common());
};

/***/ }),

/***/ 999:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var traitName = "expandPair";
var mergeSort = __webpack_require__(509);
var _require = __webpack_require__(557),
  getLeft = _require.getLeft,
  getRight = _require.getRight;
var wrapper = __webpack_require__(223);
var _require2 = __webpack_require__(505),
  getExpandToDefault = _require2.getExpandToDefault;
var _require3 = __webpack_require__(257),
  getUnmatchedLoopException = _require3.getUnmatchedLoopException,
  getClosingTagNotMatchOpeningTag = _require3.getClosingTagNotMatchOpeningTag,
  getUnbalancedLoopException = _require3.getUnbalancedLoopException;
function getOpenCountChange(part) {
  switch (part.location) {
    case "start":
      return 1;
    case "end":
      return -1;
  }
}
function match(start, end) {
  return start != null && end != null && (start.part.location === "start" && end.part.location === "end" && start.part.value === end.part.value || end.part.value === "");
}
function transformer(traits) {
  var i = 0;
  var errors = [];
  while (i < traits.length) {
    var part = traits[i].part;
    if (part.location === "end") {
      if (i === 0) {
        traits.splice(0, 1);
        errors.push(getUnmatchedLoopException(part));
        return {
          traits: traits,
          errors: errors
        };
      }
      var endIndex = i;
      var startIndex = i - 1;
      var offseter = 1;
      if (match(traits[startIndex], traits[endIndex])) {
        traits.splice(endIndex, 1);
        traits.splice(startIndex, 1);
        return {
          errors: errors,
          traits: traits
        };
      }
      while (offseter < 50) {
        var startCandidate = traits[startIndex - offseter];
        var endCandidate = traits[endIndex + offseter];
        if (match(startCandidate, traits[endIndex])) {
          traits.splice(endIndex, 1);
          traits.splice(startIndex - offseter, 1);
          return {
            errors: errors,
            traits: traits
          };
        }
        if (match(traits[startIndex], endCandidate)) {
          traits.splice(endIndex + offseter, 1);
          traits.splice(startIndex, 1);
          return {
            errors: errors,
            traits: traits
          };
        }
        offseter++;
      }
      errors.push(getClosingTagNotMatchOpeningTag({
        tags: [traits[startIndex].part, traits[endIndex].part]
      }));
      traits.splice(endIndex, 1);
      traits.splice(startIndex, 1);
      return {
        traits: traits,
        errors: errors
      };
    }
    i++;
  }
  traits.forEach(function (_ref) {
    var part = _ref.part;
    errors.push(getUnmatchedLoopException(part));
  });
  return {
    traits: [],
    errors: errors
  };
}
function getPairs(traits) {
  var levelTraits = {};
  var errors = [];
  var pairs = [];
  var transformedTraits = [];
  for (var i = 0; i < traits.length; i++) {
    transformedTraits.push(traits[i]);
  }
  while (transformedTraits.length > 0) {
    var result = transformer(transformedTraits);
    errors = errors.concat(result.errors);
    transformedTraits = result.traits;
  }

  // Stryker disable all : because this check makes the function return quicker
  if (errors.length > 0) {
    return {
      pairs: pairs,
      errors: errors
    };
  }
  // Stryker restore all
  var countOpen = 0;
  for (var _i = 0; _i < traits.length; _i++) {
    var currentTrait = traits[_i];
    var part = currentTrait.part;
    var change = getOpenCountChange(part);
    countOpen += change;
    if (change === 1) {
      levelTraits[countOpen] = currentTrait;
    } else {
      var startTrait = levelTraits[countOpen + 1];
      if (countOpen === 0) {
        pairs = pairs.concat([[startTrait, currentTrait]]);
      }
    }
    countOpen = countOpen >= 0 ? countOpen : 0;
  }
  return {
    pairs: pairs,
    errors: errors
  };
}
var ExpandPairTrait = /*#__PURE__*/function () {
  function ExpandPairTrait() {
    _classCallCheck(this, ExpandPairTrait);
    this.name = "ExpandPairTrait";
  }
  _createClass(ExpandPairTrait, [{
    key: "clone",
    value: function clone() {
      return new ExpandPairTrait();
    }
  }, {
    key: "optionsTransformer",
    value: function optionsTransformer(options, docxtemplater) {
      this.expandTags = docxtemplater.fileTypeConfig.expandTags.concat(docxtemplater.options.paragraphLoop ? docxtemplater.fileTypeConfig.onParagraphLoop : []);
      return options;
    }
  }, {
    key: "postparse",
    value: function postparse(postparsed, _ref2) {
      var _this = this;
      var getTraits = _ref2.getTraits,
        _postparse = _ref2.postparse;
      var traits = getTraits(traitName, postparsed);
      traits = traits.map(function (trait) {
        return trait || [];
      });
      traits = mergeSort(traits);
      var _getPairs = getPairs(traits),
        pairs = _getPairs.pairs,
        errors = _getPairs.errors;
      var lastRight = 0;
      var lastPair = null;
      var expandedPairs = pairs.map(function (pair) {
        var expandTo = pair[0].part.expandTo;
        if (expandTo === "auto") {
          var result = getExpandToDefault(postparsed, pair, _this.expandTags);
          if (result.error) {
            errors.push(result.error);
          }
          expandTo = result.value;
        }
        if (!expandTo) {
          var _left = pair[0].offset;
          var _right = pair[1].offset;
          if (_left < lastRight) {
            errors.push(getUnbalancedLoopException(pair, lastPair));
          }
          lastPair = pair;
          lastRight = _right;
          return [_left, _right];
        }
        var left, right;
        try {
          left = getLeft(postparsed, expandTo, pair[0].offset);
        } catch (e) {
          errors.push(e);
        }
        try {
          right = getRight(postparsed, expandTo, pair[1].offset);
        } catch (e) {
          errors.push(e);
        }
        if (left < lastRight) {
          errors.push(getUnbalancedLoopException(pair, lastPair));
        }
        lastRight = right;
        lastPair = pair;
        return [left, right];
      });

      // Stryker disable all : because this check makes the function return quicker
      if (errors.length > 0) {
        return {
          postparsed: postparsed,
          errors: errors
        };
      }
      // Stryker restore all

      var currentPairIndex = 0;
      var innerParts;
      var newParsed = postparsed.reduce(function (newParsed, part, i) {
        var inPair = currentPairIndex < pairs.length && expandedPairs[currentPairIndex][0] <= i && i <= expandedPairs[currentPairIndex][1];
        var pair = pairs[currentPairIndex];
        var expandedPair = expandedPairs[currentPairIndex];
        if (!inPair) {
          newParsed.push(part);
          return newParsed;
        }
        if (expandedPair[0] === i) {
          innerParts = [];
        }
        if (pair[0].offset !== i && pair[1].offset !== i) {
          innerParts.push(part);
        }
        if (expandedPair[1] === i) {
          var basePart = postparsed[pair[0].offset];
          basePart.subparsed = _postparse(innerParts, {
            basePart: basePart
          });
          basePart.endLindex = pair[1].part.lIndex;
          delete basePart.location;
          delete basePart.expandTo;
          newParsed.push(basePart);
          currentPairIndex++;
        }
        return newParsed;
      }, []);
      return {
        postparsed: newParsed,
        errors: errors
      };
    }
  }]);
  return ExpandPairTrait;
}();
module.exports = function () {
  return wrapper(new ExpandPairTrait());
};

/***/ }),

/***/ 19:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = __webpack_require__(557),
  chunkBy = _require.chunkBy,
  last = _require.last,
  isParagraphStart = _require.isParagraphStart,
  isModule = _require.isModule,
  isParagraphEnd = _require.isParagraphEnd,
  isContent = _require.isContent,
  startsWith = _require.startsWith,
  isTagEnd = _require.isTagEnd,
  isTagStart = _require.isTagStart,
  getSingleAttribute = _require.getSingleAttribute,
  setSingleAttribute = _require.setSingleAttribute;
var filetypes = __webpack_require__(330);
var wrapper = __webpack_require__(223);
var moduleName = "loop";
function hasContent(parts) {
  return parts.some(function (part) {
    return isContent(part);
  });
}
function getFirstMeaningFulPart(parsed) {
  for (var i = 0, len = parsed.length; i < len; i++) {
    if (parsed[i].type !== "content") {
      return parsed[i];
    }
  }
  return null;
}
function isInsideParagraphLoop(part) {
  var firstMeaningfulPart = getFirstMeaningFulPart(part.subparsed);
  return firstMeaningfulPart != null && firstMeaningfulPart.tag !== "w:t";
}
function getPageBreakIfApplies(part) {
  return part.hasPageBreak && isInsideParagraphLoop(part) ? '<w:p><w:r><w:br w:type="page"/></w:r></w:p>' : "";
}
function isEnclosedByParagraphs(parsed) {
  return parsed.length && isParagraphStart(parsed[0]) && isParagraphEnd(last(parsed));
}
function getOffset(chunk) {
  return hasContent(chunk) ? 0 : chunk.length;
}
function addPageBreakAtEnd(subRendered) {
  var j = subRendered.parts.length - 1;
  if (subRendered.parts[j] === "</w:p>") {
    subRendered.parts.splice(j, 0, '<w:r><w:br w:type="page"/></w:r>');
  } else {
    subRendered.parts.push('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
  }
}
function addPageBreakAtBeginning(subRendered) {
  subRendered.parts.unshift('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
}
function isContinuous(parts) {
  return parts.some(function (part) {
    return isTagStart("w:type", part) && part.value.indexOf("continuous") !== -1;
  });
}
function isNextPage(parts) {
  return parts.some(function (part) {
    return isTagStart("w:type", part) && part.value.indexOf('w:val="nextPage"') !== -1;
  });
}
function addSectionBefore(parts, sect) {
  return ["<w:p><w:pPr>".concat(sect.map(function (_ref) {
    var value = _ref.value;
    return value;
  }).join(""), "</w:pPr></w:p>")].concat(parts);
}
function addContinuousType(parts) {
  var stop = false;
  var inSectPr = false;
  return parts.reduce(function (result, part) {
    if (stop === false && startsWith(part, "<w:sectPr")) {
      inSectPr = true;
    }
    if (inSectPr) {
      if (startsWith(part, "<w:type")) {
        stop = true;
      }
      if (stop === false && startsWith(part, "</w:sectPr")) {
        result.push('<w:type w:val="continuous"/>');
      }
    }
    result.push(part);
    return result;
  }, []);
}
function dropHeaderFooterRefs(parts) {
  return parts.filter(function (text) {
    return !startsWith(text, "<w:headerReference") && !startsWith(text, "<w:footerReference");
  });
}
function hasPageBreak(chunk) {
  return chunk.some(function (part) {
    return part.tag === "w:br" && part.value.indexOf('w:type="page"') !== -1;
  });
}
function hasImage(chunk) {
  return chunk.some(function (_ref2) {
    var tag = _ref2.tag;
    return tag === "w:drawing";
  });
}
function getSectPr(chunks) {
  var collectSectPr = false;
  var sectPrs = [];
  chunks.forEach(function (part) {
    if (isTagStart("w:sectPr", part)) {
      sectPrs.push([]);
      collectSectPr = true;
    }
    if (collectSectPr) {
      sectPrs[sectPrs.length - 1].push(part);
    }
    if (isTagEnd("w:sectPr", part)) {
      collectSectPr = false;
    }
  });
  return sectPrs;
}
function getSectPrHeaderFooterChangeCount(chunks) {
  var collectSectPr = false;
  var sectPrCount = 0;
  chunks.forEach(function (part) {
    if (isTagStart("w:sectPr", part)) {
      collectSectPr = true;
    }
    if (collectSectPr) {
      if (part.tag === "w:headerReference" || part.tag === "w:footerReference") {
        sectPrCount++;
        collectSectPr = false;
      }
    }
    if (isTagEnd("w:sectPr", part)) {
      collectSectPr = false;
    }
  });
  return sectPrCount;
}
function getLastSectPr(parsed) {
  var sectPr = [];
  var inSectPr = false;
  for (var i = parsed.length - 1; i >= 0; i--) {
    var part = parsed[i];
    if (isTagEnd("w:sectPr", part)) {
      inSectPr = true;
    }
    if (isTagStart("w:sectPr", part)) {
      sectPr.unshift(part.value);
      inSectPr = false;
    }
    if (inSectPr) {
      sectPr.unshift(part.value);
    }
    if (isParagraphStart(part)) {
      if (sectPr.length > 0) {
        return sectPr.join("");
      }
      break;
    }
  }
  return "";
}
var LoopModule = /*#__PURE__*/function () {
  function LoopModule() {
    _classCallCheck(this, LoopModule);
    this.name = "LoopModule";
    this.inXfrm = false;
    this.totalSectPr = 0;
    this.prefix = {
      start: "#",
      end: "/",
      dash: /^-([^\s]+)\s(.+)/,
      inverted: "^"
    };
  }
  _createClass(LoopModule, [{
    key: "optionsTransformer",
    value: function optionsTransformer(opts, docxtemplater) {
      this.docxtemplater = docxtemplater;
      return opts;
    }
  }, {
    key: "preparse",
    value: function preparse(parsed, _ref3) {
      var contentType = _ref3.contentType;
      if (filetypes.main.indexOf(contentType) !== -1) {
        this.sects = getSectPr(parsed);
      }
    }
  }, {
    key: "matchers",
    value: function matchers() {
      var module = moduleName;
      return [[this.prefix.start, module, {
        expandTo: "auto",
        location: "start",
        inverted: false
      }], [this.prefix.inverted, module, {
        expandTo: "auto",
        location: "start",
        inverted: true
      }], [this.prefix.end, module, {
        location: "end"
      }], [this.prefix.dash, module, function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 3),
          expandTo = _ref5[1],
          value = _ref5[2];
        return {
          location: "start",
          inverted: false,
          expandTo: expandTo,
          value: value
        };
      }]];
    }
  }, {
    key: "getTraits",
    value: function getTraits(traitName, parsed) {
      // Stryker disable all : because getTraits should disappear in v4
      if (traitName !== "expandPair") {
        return;
      }
      // Stryker restore all

      return parsed.reduce(function (tags, part, offset) {
        if (isModule(part, moduleName) && part.subparsed == null) {
          tags.push({
            part: part,
            offset: offset
          });
        }
        return tags;
      }, []);
    }
  }, {
    key: "postparse",
    value: function postparse(parsed, _ref6) {
      var basePart = _ref6.basePart;
      if (basePart && this.docxtemplater.fileType === "docx" && parsed.length > 0) {
        basePart.sectPrCount = getSectPrHeaderFooterChangeCount(parsed);
        this.totalSectPr += basePart.sectPrCount;
        var sects = this.sects;
        sects.some(function (sect, index) {
          if (basePart.lIndex < sect[0].lIndex) {
            if (index + 1 < sects.length && isContinuous(sects[index + 1])) {
              basePart.addContinuousType = true;
            }
            return true;
          }
          if (parsed[0].lIndex < sect[0].lIndex && sect[0].lIndex < basePart.lIndex) {
            if (isNextPage(sects[index])) {
              basePart.addNextPage = {
                index: index
              };
            }
            return true;
          }
        });
        basePart.lastParagrapSectPr = getLastSectPr(parsed);
      }
      if (!basePart || basePart.expandTo !== "auto" || basePart.module !== moduleName || !isEnclosedByParagraphs(parsed)) {
        return parsed;
      }
      basePart.paragraphLoop = true;
      var level = 0;
      var chunks = chunkBy(parsed, function (p) {
        if (isParagraphStart(p)) {
          level++;
          if (level === 1) {
            return "start";
          }
        }
        if (isParagraphEnd(p)) {
          level--;
          if (level === 0) {
            return "end";
          }
        }
        return null;
      });
      var firstChunk = chunks[0];
      var lastChunk = last(chunks);
      var firstOffset = getOffset(firstChunk);
      var lastOffset = getOffset(lastChunk);
      basePart.hasPageBreakBeginning = hasPageBreak(firstChunk);
      basePart.hasPageBreak = hasPageBreak(lastChunk);
      if (hasImage(firstChunk)) {
        firstOffset = 0;
      }
      if (hasImage(lastChunk)) {
        lastOffset = 0;
      }
      return parsed.slice(firstOffset, parsed.length - lastOffset);
    }
  }, {
    key: "resolve",
    value: function resolve(part, options) {
      if (!isModule(part, moduleName)) {
        return null;
      }
      var sm = options.scopeManager;
      var promisedValue = sm.getValueAsync(part.value, {
        part: part
      });
      var promises = [];
      function loopOver(scope, i, length) {
        var scopeManager = sm.createSubScopeManager(scope, part.value, i, part, length);
        promises.push(options.resolve({
          filePath: options.filePath,
          modules: options.modules,
          baseNullGetter: options.baseNullGetter,
          resolve: options.resolve,
          compiled: part.subparsed,
          tags: {},
          scopeManager: scopeManager
        }));
      }
      var errorList = [];
      return promisedValue.then(function (values) {
        return new Promise(function (resolve) {
          if (values instanceof Array) {
            Promise.all(values).then(resolve);
          } else {
            resolve(values);
          }
        }).then(function (values) {
          sm.loopOverValue(values, loopOver, part.inverted);
          return Promise.all(promises).then(function (r) {
            return r.map(function (_ref7) {
              var resolved = _ref7.resolved,
                errors = _ref7.errors;
              errorList.push.apply(errorList, _toConsumableArray(errors));
              return resolved;
            });
          }).then(function (value) {
            if (errorList.length > 0) {
              throw errorList;
            }
            return value;
          });
        });
      });
    }
    // eslint-disable-next-line complexity
  }, {
    key: "render",
    value: function render(part, options) {
      if (part.tag === "p:xfrm") {
        this.inXfrm = part.position === "start";
      }
      if (part.tag === "a:ext" && this.inXfrm) {
        this.lastExt = part;
        return part;
      }
      if (!isModule(part, moduleName)) {
        return null;
      }
      var totalValue = [];
      var errors = [];
      var heightOffset = 0;
      var self = this;
      var firstTag = part.subparsed[0];
      var tagHeight = 0;
      if ((firstTag === null || firstTag === void 0 ? void 0 : firstTag.tag) === "a:tr") {
        tagHeight = +getSingleAttribute(firstTag.value, "h");
      }
      heightOffset -= tagHeight;
      var a16RowIdOffset = 0;
      var insideParagraphLoop = isInsideParagraphLoop(part);

      // eslint-disable-next-line complexity
      function loopOver(scope, i, length) {
        heightOffset += tagHeight;
        var scopeManager = options.scopeManager.createSubScopeManager(scope, part.value, i, part, length);
        part.subparsed.forEach(function (pp) {
          if (isTagStart("a16:rowId", pp)) {
            var val = +getSingleAttribute(pp.value, "val") + a16RowIdOffset;
            a16RowIdOffset = 1;
            pp.value = setSingleAttribute(pp.value, "val", val);
          }
        });
        var subRendered = options.render(_objectSpread(_objectSpread({}, options), {}, {
          compiled: part.subparsed,
          tags: {},
          scopeManager: scopeManager
        }));
        if (part.hasPageBreak && i === length - 1 && insideParagraphLoop) {
          addPageBreakAtEnd(subRendered);
        }
        var isNotFirst = scopeManager.scopePathItem.some(function (i) {
          return i !== 0;
        });
        if (isNotFirst) {
          if (part.sectPrCount === 1) {
            subRendered.parts = dropHeaderFooterRefs(subRendered.parts);
          }
          if (part.addContinuousType) {
            subRendered.parts = addContinuousType(subRendered.parts);
          }
        } else if (part.addNextPage) {
          subRendered.parts = addSectionBefore(subRendered.parts, self.sects[part.addNextPage.index]);
        }
        if (part.addNextPage) {
          addPageBreakAtEnd(subRendered);
        }
        if (part.hasPageBreakBeginning && insideParagraphLoop) {
          addPageBreakAtBeginning(subRendered);
        }
        for (var _i2 = 0, len = subRendered.parts.length; _i2 < len; _i2++) {
          totalValue.push(subRendered.parts[_i2]);
        }
        Array.prototype.push.apply(errors, subRendered.errors);
      }
      var result = options.scopeManager.loopOver(part.value, loopOver, part.inverted, {
        part: part
      });
      // if the loop is showing empty content
      if (result === false) {
        if (part.lastParagrapSectPr) {
          if (part.paragraphLoop) {
            return {
              value: "<w:p><w:pPr>".concat(part.lastParagrapSectPr, "</w:pPr></w:p>")
            };
          }
          return {
            value: "</w:t></w:r></w:p><w:p><w:pPr>".concat(part.lastParagrapSectPr, "</w:pPr><w:r><w:t>")
          };
        }
        return {
          value: getPageBreakIfApplies(part) || "",
          errors: errors
        };
      }
      if (heightOffset !== 0) {
        var cy = +getSingleAttribute(this.lastExt.value, "cy");
        this.lastExt.value = setSingleAttribute(this.lastExt.value, "cy", cy + heightOffset);
      }
      return {
        value: options.joinUncorrupt(totalValue, _objectSpread(_objectSpread({}, options), {}, {
          basePart: part
        })),
        errors: errors
      };
    }
  }]);
  return LoopModule;
}();
module.exports = function () {
  return wrapper(new LoopModule());
};

/***/ }),

/***/ 182:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var traits = __webpack_require__(505);
var _require = __webpack_require__(557),
  isContent = _require.isContent;
var _require2 = __webpack_require__(257),
  throwRawTagShouldBeOnlyTextInParagraph = _require2.throwRawTagShouldBeOnlyTextInParagraph,
  getInvalidRawXMLValueException = _require2.getInvalidRawXMLValueException;
var moduleName = "rawxml";
var wrapper = __webpack_require__(223);
function getInner(_ref) {
  var part = _ref.part,
    left = _ref.left,
    right = _ref.right,
    postparsed = _ref.postparsed,
    index = _ref.index;
  var paragraphParts = postparsed.slice(left + 1, right);
  paragraphParts.forEach(function (p, i) {
    if (i === index - left - 1) {
      return;
    }
    if (isContent(p)) {
      throwRawTagShouldBeOnlyTextInParagraph({
        paragraphParts: paragraphParts,
        part: part
      });
    }
  });
  return part;
}
var RawXmlModule = /*#__PURE__*/function () {
  function RawXmlModule() {
    _classCallCheck(this, RawXmlModule);
    this.name = "RawXmlModule";
    this.prefix = "@";
  }
  _createClass(RawXmlModule, [{
    key: "optionsTransformer",
    value: function optionsTransformer(options, docxtemplater) {
      this.fileTypeConfig = docxtemplater.fileTypeConfig;
      return options;
    }
  }, {
    key: "matchers",
    value: function matchers() {
      return [[this.prefix, moduleName]];
    }
  }, {
    key: "postparse",
    value: function postparse(postparsed) {
      return traits.expandToOne(postparsed, {
        moduleName: moduleName,
        getInner: getInner,
        expandTo: this.fileTypeConfig.tagRawXml,
        error: {
          message: "Raw tag not in paragraph",
          id: "raw_tag_outerxml_invalid",
          explanation: function explanation(part) {
            return "The tag \"".concat(part.value, "\" is not inside a paragraph, putting raw tags inside an inline loop is disallowed.");
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render(part, options) {
      if (part.module !== moduleName) {
        return null;
      }
      var value;
      var errors = [];
      try {
        value = options.scopeManager.getValue(part.value, {
          part: part
        });
        if (value == null) {
          value = options.nullGetter(part);
        }
      } catch (e) {
        errors.push(e);
        return {
          errors: errors
        };
      }
      value = value ? value : "";
      if (typeof value === "string") {
        return {
          value: value
        };
      }
      return {
        errors: [getInvalidRawXMLValueException({
          tag: part.value,
          value: value,
          offset: part.offset
        })]
      };
    }
  }]);
  return RawXmlModule;
}();
module.exports = function () {
  return wrapper(new RawXmlModule());
};

/***/ }),

/***/ 163:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var wrapper = __webpack_require__(223);
var _require = __webpack_require__(257),
  getScopeCompilationError = _require.getScopeCompilationError;
var _require2 = __webpack_require__(557),
  utf8ToWord = _require2.utf8ToWord,
  hasCorruptCharacters = _require2.hasCorruptCharacters;
var _require3 = __webpack_require__(257),
  getCorruptCharactersException = _require3.getCorruptCharactersException;
var ftprefix = {
  docx: "w",
  pptx: "a"
};
var Render = /*#__PURE__*/function () {
  function Render() {
    _classCallCheck(this, Render);
    this.name = "Render";
    this.recordRun = false;
    this.recordedRun = [];
  }
  _createClass(Render, [{
    key: "optionsTransformer",
    value: function optionsTransformer(options, docxtemplater) {
      this.parser = docxtemplater.parser;
      this.fileType = docxtemplater.fileType;
      return options;
    }
  }, {
    key: "set",
    value: function set(obj) {
      if (obj.compiled) {
        this.compiled = obj.compiled;
      }
      if (obj.data != null) {
        this.data = obj.data;
      }
    }
  }, {
    key: "getRenderedMap",
    value: function getRenderedMap(mapper) {
      var _this = this;
      return Object.keys(this.compiled).reduce(function (mapper, from) {
        mapper[from] = {
          from: from,
          data: _this.data
        };
        return mapper;
      }, mapper);
    }
  }, {
    key: "postparse",
    value: function postparse(postparsed, options) {
      var _this2 = this;
      var errors = [];
      postparsed.forEach(function (p) {
        if (p.type === "placeholder") {
          var tag = p.value;
          try {
            options.cachedParsers[p.lIndex] = _this2.parser(tag, {
              tag: p
            });
          } catch (rootError) {
            errors.push(getScopeCompilationError({
              tag: tag,
              rootError: rootError,
              offset: p.offset
            }));
          }
        }
      });
      return {
        postparsed: postparsed,
        errors: errors
      };
    }
  }, {
    key: "render",
    value: function render(part, _ref) {
      var scopeManager = _ref.scopeManager,
        linebreaks = _ref.linebreaks,
        nullGetter = _ref.nullGetter;
      if (linebreaks) {
        this.recordRuns(part);
      }
      if (part.type !== "placeholder" || part.module) {
        return;
      }
      var value;
      try {
        value = scopeManager.getValue(part.value, {
          part: part
        });
      } catch (e) {
        return {
          errors: [e]
        };
      }
      if (value == null) {
        value = nullGetter(part);
      }
      if (hasCorruptCharacters(value)) {
        return {
          errors: [getCorruptCharactersException({
            tag: part.value,
            value: value,
            offset: part.offset
          })]
        };
      }
      return {
        value: linebreaks && typeof value === "string" ? this.renderLineBreaks(value) : utf8ToWord(value)
      };
    }
  }, {
    key: "recordRuns",
    value: function recordRuns(part) {
      if (part.tag === "".concat(ftprefix[this.fileType], ":r")) {
        this.recordedRun = [];
      } else if (part.tag === "".concat(ftprefix[this.fileType], ":rPr")) {
        if (part.position === "start") {
          this.recordRun = true;
          this.recordedRun = [part.value];
        }
        if (part.position === "end" || part.position === "selfclosing") {
          this.recordedRun.push(part.value);
          this.recordRun = false;
        }
      } else if (this.recordRun) {
        this.recordedRun.push(part.value);
      }
    }
  }, {
    key: "renderLineBreaks",
    value: function renderLineBreaks(value) {
      var _this3 = this;
      var p = ftprefix[this.fileType];
      var br = this.fileType === "docx" ? "<w:r><w:br/></w:r>" : "<a:br/>";
      var lines = value.split("\n");
      var runprops = this.recordedRun.join("");
      return lines.map(function (line) {
        return utf8ToWord(line);
      }).reduce(function (result, line, i) {
        result.push(line);
        if (i < lines.length - 1) {
          result.push("</".concat(p, ":t></").concat(p, ":r>").concat(br, "<").concat(p, ":r>").concat(runprops, "<").concat(p, ":t").concat(_this3.fileType === "docx" ? ' xml:space="preserve"' : "", ">"));
        }
        return result;
      }, []);
    }
  }]);
  return Render;
}();
module.exports = function () {
  return wrapper(new Render());
};

/***/ }),

/***/ 95:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var wrapper = __webpack_require__(223);
var _require = __webpack_require__(557),
  isTextStart = _require.isTextStart,
  isTextEnd = _require.isTextEnd,
  endsWith = _require.endsWith,
  startsWith = _require.startsWith;
var wTpreserve = '<w:t xml:space="preserve">';
var wTpreservelen = wTpreserve.length;
var wtEnd = "</w:t>";
var wtEndlen = wtEnd.length;
function isWtStart(part) {
  return isTextStart(part) && part.tag === "w:t";
}
function addXMLPreserve(chunk, index) {
  var tag = chunk[index].value;
  if (chunk[index + 1].value === "</w:t>") {
    return tag;
  }
  if (tag.indexOf('xml:space="preserve"') !== -1) {
    return tag;
  }
  return tag.substr(0, tag.length - 1) + ' xml:space="preserve">';
}
function isInsideLoop(meta, chunk) {
  return meta && meta.basePart && chunk.length > 1;
}
var SpacePreserve = /*#__PURE__*/function () {
  function SpacePreserve() {
    _classCallCheck(this, SpacePreserve);
    this.name = "SpacePreserveModule";
  }
  _createClass(SpacePreserve, [{
    key: "clone",
    value: function clone() {
      return new SpacePreserve();
    }
  }, {
    key: "postparse",
    value: function postparse(postparsed, meta) {
      var chunk = [],
        inTextTag = false,
        endLindex = 0,
        lastTextTag = 0;
      function isStartingPlaceHolder(part, chunk) {
        return part.type === "placeholder" && chunk.length > 1;
      }
      var result = postparsed.reduce(function (postparsed, part) {
        if (isWtStart(part)) {
          inTextTag = true;
          lastTextTag = chunk.length;
        }
        if (!inTextTag) {
          postparsed.push(part);
          return postparsed;
        }
        chunk.push(part);
        if (isInsideLoop(meta, chunk)) {
          endLindex = meta.basePart.endLindex;
          chunk[0].value = addXMLPreserve(chunk, 0);
        }
        if (isStartingPlaceHolder(part, chunk)) {
          chunk[lastTextTag].value = addXMLPreserve(chunk, lastTextTag);
          endLindex = part.endLindex;
        }
        if (isTextEnd(part) && part.lIndex > endLindex) {
          if (endLindex !== 0) {
            chunk[lastTextTag].value = addXMLPreserve(chunk, lastTextTag);
          }
          Array.prototype.push.apply(postparsed, chunk);
          chunk = [];
          inTextTag = false;
          endLindex = 0;
          lastTextTag = 0;
        }
        return postparsed;
      }, []);
      Array.prototype.push.apply(result, chunk);
      return result;
    }
  }, {
    key: "postrender",
    value: function postrender(parts) {
      var lastNonEmpty = "";
      var lastNonEmptyIndex = 0;
      for (var i = 0, len = parts.length; i < len; i++) {
        var index = i;
        var p = parts[i];
        if (p === "") {
          continue;
        }
        if (endsWith(lastNonEmpty, wTpreserve) && startsWith(p, wtEnd)) {
          parts[lastNonEmptyIndex] = lastNonEmpty.substr(0, lastNonEmpty.length - wTpreservelen) + "<w:t/>";
          p = p.substr(wtEndlen);
        }
        lastNonEmpty = p;
        lastNonEmptyIndex = index;
        parts[i] = p;
      }
      return parts;
    }
  }]);
  return SpacePreserve;
}();
module.exports = function () {
  return wrapper(new SpacePreserve());
};

/***/ }),

/***/ 190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var _require = __webpack_require__(557),
  wordToUtf8 = _require.wordToUtf8;
var _require2 = __webpack_require__(3),
  match = _require2.match,
  getValue = _require2.getValue,
  getValues = _require2.getValues;
function getMatchers(modules, options) {
  var matchers = [];
  for (var i = 0, l = modules.length; i < l; i++) {
    var _module = modules[i];
    if (_module.matchers) {
      var mmm = _module.matchers(options);
      if (!(mmm instanceof Array)) {
        throw new Error("module matcher returns a non array");
      }
      matchers.push.apply(matchers, _toConsumableArray(mmm));
    }
  }
  return matchers;
}
function getMatches(matchers, placeHolderContent, options) {
  var matches = [];
  for (var i = 0, len = matchers.length; i < len; i++) {
    var matcher = matchers[i];
    var _matcher = _slicedToArray(matcher, 2),
      prefix = _matcher[0],
      _module2 = _matcher[1];
    var properties = matcher[2] || {};
    if (options.match(prefix, placeHolderContent)) {
      var values = options.getValues(prefix, placeHolderContent);
      if (typeof properties === "function") {
        properties = properties(values);
      }
      if (!properties.value) {
        var _values = _slicedToArray(values, 2);
        properties.value = _values[1];
      }
      matches.push(_objectSpread({
        type: "placeholder",
        prefix: prefix,
        module: _module2,
        onMatch: properties.onMatch,
        priority: properties.priority
      }, properties));
    }
  }
  return matches;
}
function moduleParse(placeHolderContent, options) {
  var modules = options.modules;
  var startOffset = options.startOffset;
  var endLindex = options.lIndex;
  var moduleParsed;
  options.offset = startOffset;
  options.match = match;
  options.getValue = getValue;
  options.getValues = getValues;
  var matchers = getMatchers(modules, options);
  var matches = getMatches(matchers, placeHolderContent, options);
  if (matches.length > 0) {
    var bestMatch = null;
    matches.forEach(function (match) {
      match.priority = match.priority || -match.value.length;
      if (!bestMatch || match.priority > bestMatch.priority) {
        bestMatch = match;
      }
    });
    bestMatch.offset = startOffset;
    delete bestMatch.priority;
    bestMatch.endLindex = endLindex;
    bestMatch.lIndex = endLindex;
    bestMatch.raw = placeHolderContent;
    if (bestMatch.onMatch) {
      bestMatch.onMatch(bestMatch);
    }
    delete bestMatch.onMatch;
    delete bestMatch.prefix;
    return bestMatch;
  }
  for (var i = 0, l = modules.length; i < l; i++) {
    var _module3 = modules[i];
    moduleParsed = _module3.parse(placeHolderContent, options);
    if (moduleParsed) {
      moduleParsed.offset = startOffset;
      moduleParsed.endLindex = endLindex;
      moduleParsed.lIndex = endLindex;
      moduleParsed.raw = placeHolderContent;
      return moduleParsed;
    }
  }
  return {
    type: "placeholder",
    value: placeHolderContent,
    offset: startOffset,
    endLindex: endLindex,
    lIndex: endLindex
  };
}
var parser = {
  preparse: function preparse(parsed, modules, options) {
    function preparse(parsed, options) {
      return modules.forEach(function (module) {
        module.preparse(parsed, options);
      });
    }
    return {
      preparsed: preparse(parsed, options)
    };
  },
  parse: function parse(lexed, modules, options) {
    var inPlaceHolder = false;
    var placeHolderContent = "";
    var startOffset;
    var tailParts = [];
    var droppedTags = options.fileTypeConfig.droppedTagsInsidePlaceholder || [];
    return lexed.reduce(function lexedToParsed(parsed, token) {
      if (token.type === "delimiter") {
        inPlaceHolder = token.position === "start";
        if (token.position === "end") {
          options.parse = function (placeHolderContent) {
            return moduleParse(placeHolderContent, _objectSpread(_objectSpread(_objectSpread({}, options), token), {}, {
              startOffset: startOffset,
              modules: modules
            }));
          };
          parsed.push(options.parse(wordToUtf8(placeHolderContent)));
          Array.prototype.push.apply(parsed, tailParts);
          tailParts = [];
        }
        if (token.position === "start") {
          tailParts = [];
          startOffset = token.offset;
        }
        placeHolderContent = "";
        return parsed;
      }
      if (!inPlaceHolder) {
        parsed.push(token);
        return parsed;
      }
      if (token.type !== "content" || token.position !== "insidetag") {
        if (droppedTags.indexOf(token.tag) !== -1) {
          return parsed;
        }
        tailParts.push(token);
        return parsed;
      }
      placeHolderContent += token.value;
      return parsed;
    }, []);
  },
  postparse: function postparse(postparsed, modules, options) {
    function getTraits(traitName, postparsed) {
      return modules.map(function (module) {
        return module.getTraits(traitName, postparsed);
      });
    }
    var errors = [];
    function _postparse(postparsed, options) {
      return modules.reduce(function (postparsed, module) {
        var r = module.postparse(postparsed, _objectSpread(_objectSpread({}, options), {}, {
          postparse: function postparse(parsed, opts) {
            return _postparse(parsed, _objectSpread(_objectSpread({}, options), opts));
          },
          getTraits: getTraits
        }));
        if (r == null) {
          return postparsed;
        }
        if (r.errors) {
          Array.prototype.push.apply(errors, r.errors);
          return r.postparsed;
        }
        return r;
      }, postparsed);
    }
    return {
      postparsed: _postparse(postparsed, options),
      errors: errors
    };
  }
};
module.exports = parser;

/***/ }),

/***/ 393:
/***/ (function(module) {

// convert string to array (typed, when possible)
// Stryker disable all : because this is a utility function that was copied
// from
// https://github.com/open-xml-templating/pizzip/blob/34a840553c604980859dc6d0dcd1f89b6e5527b3/es6/utf8.js#L33
// eslint-disable-next-line complexity
function string2buf(str) {
  var c,
    c2,
    mPos,
    i,
    bufLen = 0;
  var strLen = str.length;

  // count binary size
  for (mPos = 0; mPos < strLen; mPos++) {
    c = str.charCodeAt(mPos);
    if ((c & 0xfc00) === 0xd800 && mPos + 1 < strLen) {
      c2 = str.charCodeAt(mPos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
        mPos++;
      }
    }
    bufLen += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  var buf = new Uint8Array(bufLen);

  // convert
  for (i = 0, mPos = 0; i < bufLen; mPos++) {
    c = str.charCodeAt(mPos);
    if ((c & 0xfc00) === 0xd800 && mPos + 1 < strLen) {
      c2 = str.charCodeAt(mPos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
        mPos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xc0 | c >>> 6;
      buf[i++] = 0x80 | c & 0x3f;
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xe0 | c >>> 12;
      buf[i++] = 0x80 | c >>> 6 & 0x3f;
      buf[i++] = 0x80 | c & 0x3f;
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | c >>> 18;
      buf[i++] = 0x80 | c >>> 12 & 0x3f;
      buf[i++] = 0x80 | c >>> 6 & 0x3f;
      buf[i++] = 0x80 | c & 0x3f;
    }
  }
  return buf;
}
// Stryker restore all

function postrender(parts, options) {
  for (var i = 0, l = options.modules.length; i < l; i++) {
    var _module = options.modules[i];
    parts = _module.postrender(parts, options);
  }
  var fullLength = 0;
  var newParts = options.joinUncorrupt(parts, options);
  var longStr = "";
  var lenStr = 0;
  var maxCompact = 65536;
  var uintArrays = [];
  for (var _i = 0, len = newParts.length; _i < len; _i++) {
    var part = newParts[_i];

    // This condition should be hit in the integration test at :
    // it("should not regress with long file (hit maxCompact value of 65536)", function () {
    // Stryker disable all : because this is an optimisation that won't make any tests fail
    if (part.length + lenStr > maxCompact) {
      var _arr = string2buf(longStr);
      fullLength += _arr.length;
      uintArrays.push(_arr);
      longStr = "";
    }
    // Stryker restore all

    longStr += part;
    lenStr += part.length;
    delete newParts[_i];
  }
  var arr = string2buf(longStr);
  fullLength += arr.length;
  uintArrays.push(arr);
  var array = new Uint8Array(fullLength);
  var j = 0;

  // Stryker disable all : because this is an optimisation that won't make any tests fail
  uintArrays.forEach(function (buf) {
    for (var _i2 = 0; _i2 < buf.length; ++_i2) {
      array[_i2 + j] = buf[_i2];
    }
    j += buf.length;
  });
  // Stryker restore all
  return array;
}
module.exports = postrender;

/***/ }),

/***/ 3:
/***/ (function(module) {

var nbspRegex = new RegExp(String.fromCharCode(160), "g");
function replaceNbsps(str) {
  return str.replace(nbspRegex, " ");
}
function match(condition, placeHolderContent) {
  if (typeof condition === "string") {
    return replaceNbsps(placeHolderContent.substr(0, condition.length)) === condition;
  }
  if (condition instanceof RegExp) {
    return condition.test(replaceNbsps(placeHolderContent));
  }
}
function getValue(condition, placeHolderContent) {
  if (typeof condition === "string") {
    return replaceNbsps(placeHolderContent).substr(condition.length);
  }
  if (condition instanceof RegExp) {
    return replaceNbsps(placeHolderContent).match(condition)[1];
  }
}
function getValues(condition, placeHolderContent) {
  if (typeof condition === "string") {
    return [placeHolderContent, replaceNbsps(placeHolderContent).substr(condition.length)];
  }
  if (condition instanceof RegExp) {
    return replaceNbsps(placeHolderContent).match(condition);
  }
}
module.exports = {
  match: match,
  getValue: getValue,
  getValues: getValues
};

/***/ }),

/***/ 89:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(257),
  throwUnimplementedTagType = _require.throwUnimplementedTagType;
function moduleRender(part, options) {
  var moduleRendered;
  for (var i = 0, l = options.modules.length; i < l; i++) {
    var _module = options.modules[i];
    moduleRendered = _module.render(part, options);
    if (moduleRendered) {
      return moduleRendered;
    }
  }
  return false;
}
function render(options) {
  var baseNullGetter = options.baseNullGetter;
  var compiled = options.compiled,
    scopeManager = options.scopeManager;
  options.nullGetter = function (part, sm) {
    return baseNullGetter(part, sm || scopeManager);
  };
  var errors = [];
  var parts = compiled.map(function (part, i) {
    options.index = i;
    var moduleRendered = moduleRender(part, options);
    if (moduleRendered) {
      if (moduleRendered.errors) {
        Array.prototype.push.apply(errors, moduleRendered.errors);
      }
      return moduleRendered;
    }
    if (part.type === "content" || part.type === "tag") {
      return part;
    }
    throwUnimplementedTagType(part, i);
  }).reduce(function (parts, _ref) {
    var value = _ref.value;
    if (value instanceof Array) {
      for (var i = 0, len = value.length; i < len; i++) {
        parts.push(value[i]);
      }
    } else if (value) {
      parts.push(value);
    }
    return parts;
  }, []);
  return {
    errors: errors,
    parts: parts
  };
}
module.exports = render;

/***/ }),

/***/ 207:
/***/ (function(module) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function moduleResolve(part, options) {
  var moduleResolved;
  for (var i = 0, l = options.modules.length; i < l; i++) {
    var _module = options.modules[i];
    moduleResolved = _module.resolve(part, options);
    if (moduleResolved) {
      return moduleResolved;
    }
  }
  return false;
}
function resolve(options) {
  var resolved = [];
  var baseNullGetter = options.baseNullGetter;
  var compiled = options.compiled,
    scopeManager = options.scopeManager;
  options.nullGetter = function (part, sm) {
    return baseNullGetter(part, sm || scopeManager);
  };
  options.resolved = resolved;
  var errors = [];
  return Promise.all(compiled.filter(function (part) {
    return ["content", "tag"].indexOf(part.type) === -1;
  }).reduce(function (promises, part) {
    var moduleResolved = moduleResolve(part, options);
    var result;
    if (moduleResolved) {
      result = moduleResolved.then(function (value) {
        resolved.push({
          tag: part.value,
          lIndex: part.lIndex,
          value: value
        });
      });
    } else if (part.type === "placeholder") {
      result = scopeManager.getValueAsync(part.value, {
        part: part
      }).then(function (value) {
        return value == null ? options.nullGetter(part) : value;
      }).then(function (value) {
        resolved.push({
          tag: part.value,
          lIndex: part.lIndex,
          value: value
        });
        return value;
      });
    } else {
      return;
    }
    promises.push(result["catch"](function (e) {
      if (e instanceof Array) {
        errors.push.apply(errors, _toConsumableArray(e));
      } else {
        errors.push(e);
      }
    }));
    return promises;
  }, [])).then(function () {
    return {
      errors: errors,
      resolved: resolved
    };
  });
}
module.exports = resolve;

/***/ }),

/***/ 919:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = __webpack_require__(257),
  getScopeParserExecutionError = _require.getScopeParserExecutionError;
var _require2 = __webpack_require__(287),
  last = _require2.last;
var _require3 = __webpack_require__(557),
  concatArrays = _require3.concatArrays;
function find(list, fn) {
  var length = list.length >>> 0;
  var value;
  for (var i = 0; i < length; i++) {
    value = list[i];
    if (fn.call(this, value, i, list)) {
      return value;
    }
  }
  return undefined;
}
function _getValue(tag, meta, num) {
  var _this = this;
  var scope = this.scopeList[num];
  if (this.root.finishedResolving) {
    var w = this.resolved;
    var _loop = function _loop() {
      var lIndex = _this.scopeLindex[i];
      w = find(w, function (r) {
        return r.lIndex === lIndex;
      });
      w = w.value[_this.scopePathItem[i]];
    };
    for (var i = this.resolveOffset, len = this.scopePath.length; i < len; i++) {
      _loop();
    }
    return find(w, function (r) {
      return meta.part.lIndex === r.lIndex;
    }).value;
  }
  // search in the scopes (in reverse order) and keep the first defined value
  var result;
  var parser;
  if (!this.cachedParsers || !meta.part) {
    parser = this.parser(tag, {
      scopePath: this.scopePath
    });
  } else if (this.cachedParsers[meta.part.lIndex]) {
    parser = this.cachedParsers[meta.part.lIndex];
  } else {
    parser = this.cachedParsers[meta.part.lIndex] = this.parser(tag, {
      scopePath: this.scopePath
    });
  }
  try {
    result = parser.get(scope, this.getContext(meta, num));
  } catch (error) {
    throw getScopeParserExecutionError({
      tag: tag,
      scope: scope,
      error: error,
      offset: meta.part.offset
    });
  }
  if (result == null && num > 0) {
    return _getValue.call(this, tag, meta, num - 1);
  }
  return result;
}
function _getValueAsync(tag, meta, num) {
  var _this2 = this;
  var scope = this.scopeList[num];
  // search in the scopes (in reverse order) and keep the first defined value
  var parser;
  if (!this.cachedParsers || !meta.part) {
    parser = this.parser(tag, {
      scopePath: this.scopePath
    });
  } else if (this.cachedParsers[meta.part.lIndex]) {
    parser = this.cachedParsers[meta.part.lIndex];
  } else {
    parser = this.cachedParsers[meta.part.lIndex] = this.parser(tag, {
      scopePath: this.scopePath
    });
  }
  return Promise.resolve().then(function () {
    return parser.get(scope, _this2.getContext(meta, num));
  })["catch"](function (error) {
    throw getScopeParserExecutionError({
      tag: tag,
      scope: scope,
      error: error,
      offset: meta.part.offset
    });
  }).then(function (result) {
    if (result == null && num > 0) {
      return _getValueAsync.call(_this2, tag, meta, num - 1);
    }
    return result;
  });
}
var ScopeManager = /*#__PURE__*/function () {
  function ScopeManager(options) {
    _classCallCheck(this, ScopeManager);
    this.root = options.root || this;
    this.resolveOffset = options.resolveOffset || 0;
    this.scopePath = options.scopePath;
    this.scopePathItem = options.scopePathItem;
    this.scopePathLength = options.scopePathLength;
    this.scopeList = options.scopeList;
    this.scopeType = "";
    this.scopeTypes = options.scopeTypes;
    this.scopeLindex = options.scopeLindex;
    this.parser = options.parser;
    this.resolved = options.resolved;
    this.cachedParsers = options.cachedParsers;
  }
  _createClass(ScopeManager, [{
    key: "loopOver",
    value: function loopOver(tag, functor, inverted, meta) {
      return this.loopOverValue(this.getValue(tag, meta), functor, inverted);
    }
  }, {
    key: "functorIfInverted",
    value: function functorIfInverted(inverted, functor, value, i, length) {
      if (inverted) {
        functor(value, i, length);
      }
      return inverted;
    }
  }, {
    key: "isValueFalsy",
    value: function isValueFalsy(value, type) {
      return value == null || !value || type === "[object Array]" && value.length === 0;
    }
  }, {
    key: "loopOverValue",
    value: function loopOverValue(value, functor, inverted) {
      if (this.root.finishedResolving) {
        inverted = false;
      }
      var type = Object.prototype.toString.call(value);
      if (this.isValueFalsy(value, type)) {
        this.scopeType = false;
        return this.functorIfInverted(inverted, functor, last(this.scopeList), 0, 1);
      }
      if (type === "[object Array]") {
        this.scopeType = "array";
        for (var i = 0; i < value.length; i++) {
          this.functorIfInverted(!inverted, functor, value[i], i, value.length);
        }
        return true;
      }
      if (type === "[object Object]") {
        this.scopeType = "object";
        return this.functorIfInverted(!inverted, functor, value, 0, 1);
      }
      return this.functorIfInverted(!inverted, functor, last(this.scopeList), 0, 1);
    }
  }, {
    key: "getValue",
    value: function getValue(tag, meta) {
      var result = _getValue.call(this, tag, meta, this.scopeList.length - 1);
      if (typeof result === "function") {
        return result(this.scopeList[this.scopeList.length - 1], this);
      }
      return result;
    }
  }, {
    key: "getValueAsync",
    value: function getValueAsync(tag, meta) {
      var _this3 = this;
      return _getValueAsync.call(this, tag, meta, this.scopeList.length - 1).then(function (result) {
        if (typeof result === "function") {
          return result(_this3.scopeList[_this3.scopeList.length - 1], _this3);
        }
        return result;
      });
    }
  }, {
    key: "getContext",
    value: function getContext(meta, num) {
      return {
        num: num,
        meta: meta,
        scopeList: this.scopeList,
        resolved: this.resolved,
        scopePath: this.scopePath,
        scopeTypes: this.scopeTypes,
        scopePathItem: this.scopePathItem,
        scopePathLength: this.scopePathLength
      };
    }
  }, {
    key: "createSubScopeManager",
    value: function createSubScopeManager(scope, tag, i, part, length) {
      return new ScopeManager({
        root: this.root,
        resolveOffset: this.resolveOffset,
        resolved: this.resolved,
        parser: this.parser,
        cachedParsers: this.cachedParsers,
        scopeTypes: concatArrays([this.scopeTypes, [this.scopeType]]),
        scopeList: concatArrays([this.scopeList, [scope]]),
        scopePath: concatArrays([this.scopePath, [tag]]),
        scopePathItem: concatArrays([this.scopePathItem, [i]]),
        scopePathLength: concatArrays([this.scopePathLength, [length]]),
        scopeLindex: concatArrays([this.scopeLindex, [part.lIndex]])
      });
    }
  }]);
  return ScopeManager;
}();
module.exports = function (options) {
  options.scopePath = [];
  options.scopePathItem = [];
  options.scopePathLength = [];
  options.scopeTypes = [];
  options.scopeLindex = [];
  options.scopeList = [options.tags];
  return new ScopeManager(options);
};

/***/ }),

/***/ 505:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _require = __webpack_require__(557),
  getRightOrNull = _require.getRightOrNull,
  getRight = _require.getRight,
  getLeft = _require.getLeft,
  getLeftOrNull = _require.getLeftOrNull,
  chunkBy = _require.chunkBy,
  isTagStart = _require.isTagStart,
  isTagEnd = _require.isTagEnd,
  isContent = _require.isContent,
  last = _require.last,
  first = _require.first;
var _require2 = __webpack_require__(257),
  XTTemplateError = _require2.XTTemplateError,
  throwExpandNotFound = _require2.throwExpandNotFound,
  getLoopPositionProducesInvalidXMLError = _require2.getLoopPositionProducesInvalidXMLError;
function lastTagIsOpenTag(tags, tag) {
  if (tags.length === 0) {
    return false;
  }
  var innerLastTag = last(tags).substr(1);
  return innerLastTag.indexOf(tag) === 0;
}
function getListXmlElements(parts) {
  /*
  Gets the list of closing and opening tags between two texts. It doesn't take
  into account tags that are opened then closed. Those that are closed then
  opened are kept
  	Example input :
  	[
  	{
  		"type": "placeholder",
  		"value": "table1",
  		...
  	},
  	{
  		"type": "placeholder",
  		"value": "t1data1",
  	},
  	{
  		"type": "tag",
  		"position": "end",
  		"text": true,
  		"value": "</w:t>",
  		"tag": "w:t",
  		"lIndex": 112
  	},
  	{
  		"type": "tag",
  		"value": "</w:r>",
  	},
  	{
  		"type": "tag",
  		"value": "</w:p>",
  	},
  	{
  		"type": "tag",
  		"value": "</w:tc>",
  	},
  	{
  		"type": "tag",
  		"value": "<w:tc>",
  	},
  	{
  		"type": "content",
  		"value": "<w:tcPr><w:tcW w:w="2444" w:type="dxa"/><w:tcBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/></w:tcBorders><w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/></w:tcPr>",
  	},
  	...
  	{
  		"type": "tag",
  		"value": "<w:r>",
  	},
  	{
  		"type": "tag",
  		"value": "<w:t xml:space="preserve">",
  	},
  	{
  		"type": "placeholder",
  		"value": "t1data4",
  	}
  ]
  	returns
  	[
  		{
  			"tag": "</w:t>",
  		},
  		{
  			"tag": "</w:r>",
  		},
  		{
  			"tag": "</w:p>",
  		},
  		{
  			"tag": "</w:tc>",
  		},
  		{
  			"tag": "<w:tc>",
  		},
  		{
  			"tag": "<w:p>",
  		},
  		{
  			"tag": "<w:r>",
  		},
  		{
  			"tag": "<w:t>",
  		},
  	]
  */

  var result = [];
  for (var i = 0; i < parts.length; i++) {
    var _parts$i = parts[i],
      position = _parts$i.position,
      value = _parts$i.value,
      tag = _parts$i.tag;
    // Stryker disable all : because removing this condition would also work but we want to make the API future proof
    if (!tag) {
      continue;
    }
    // Stryker restore all
    if (position === "end") {
      if (lastTagIsOpenTag(result, tag)) {
        result.pop();
      } else {
        result.push(value);
      }
    } else if (position === "start") {
      result.push(value);
    }
    // ignore position === "selfclosing"
  }

  return result;
}
function has(name, xmlElements) {
  for (var i = 0; i < xmlElements.length; i++) {
    var xmlElement = xmlElements[i];
    if (xmlElement.indexOf("<".concat(name)) === 0) {
      return true;
    }
  }
  return false;
}
function getExpandToDefault(postparsed, pair, expandTags) {
  var parts = postparsed.slice(pair[0].offset, pair[1].offset);
  var xmlElements = getListXmlElements(parts);
  var closingTagCount = xmlElements.filter(function (tag) {
    return tag[1] === "/";
  }).length;
  var startingTagCount = xmlElements.filter(function (tag) {
    return tag[1] !== "/" && tag[tag.length - 2] !== "/";
  }).length;
  if (closingTagCount !== startingTagCount) {
    return {
      error: getLoopPositionProducesInvalidXMLError({
        tag: first(pair).part.value,
        offset: [first(pair).part.offset, last(pair).part.offset]
      })
    };
  }
  var _loop = function _loop() {
    var _expandTags$i = expandTags[i],
      contains = _expandTags$i.contains,
      expand = _expandTags$i.expand,
      onlyTextInTag = _expandTags$i.onlyTextInTag;
    if (has(contains, xmlElements)) {
      if (onlyTextInTag) {
        var left = getLeftOrNull(postparsed, contains, pair[0].offset);
        var right = getRightOrNull(postparsed, contains, pair[1].offset);
        if (left === null || right === null) {
          return "continue";
        }
        var chunks = chunkBy(postparsed.slice(left, right), function (p) {
          return isTagStart(contains, p) ? "start" : isTagEnd(contains, p) ? "end" : null;
        });
        var firstChunk = first(chunks);
        var lastChunk = last(chunks);
        var firstContent = firstChunk.filter(isContent);
        var lastContent = lastChunk.filter(isContent);
        if (firstContent.length !== 1 || lastContent.length !== 1) {
          return "continue";
        }
      }
      return {
        v: {
          value: expand
        }
      };
    }
  };
  for (var i = 0, len = expandTags.length; i < len; i++) {
    var _ret = _loop();
    if (_ret === "continue") continue;
    if (_typeof(_ret) === "object") return _ret.v;
  }
  return {};
}
function getExpandLimit(part, index, postparsed, options) {
  var expandTo = part.expandTo || options.expandTo;
  // Stryker disable all : because this condition can be removed in v4 (the only usage was the image module before version 3.12.3 of the image module
  if (!expandTo) {
    return;
  }
  // Stryker restore all
  var right, left;
  try {
    left = getLeft(postparsed, expandTo, index);
    right = getRight(postparsed, expandTo, index);
  } catch (rootError) {
    if (rootError instanceof XTTemplateError) {
      throwExpandNotFound(_objectSpread({
        part: part,
        rootError: rootError,
        postparsed: postparsed,
        expandTo: expandTo,
        index: index
      }, options.error));
    }
    throw rootError;
  }
  return [left, right];
}
function expandOne(_ref, part, postparsed, options) {
  var _ref2 = _slicedToArray(_ref, 2),
    left = _ref2[0],
    right = _ref2[1];
  var index = postparsed.indexOf(part);
  var leftParts = postparsed.slice(left, index);
  var rightParts = postparsed.slice(index + 1, right + 1);
  var inner = options.getInner({
    postparse: options.postparse,
    index: index,
    part: part,
    leftParts: leftParts,
    rightParts: rightParts,
    left: left,
    right: right,
    postparsed: postparsed
  });
  if (!inner.length) {
    inner.expanded = [leftParts, rightParts];
    inner = [inner];
  }
  return {
    left: left,
    right: right,
    inner: inner
  };
}
function expandToOne(postparsed, options) {
  var errors = [];
  if (postparsed.errors) {
    errors = postparsed.errors;
    postparsed = postparsed.postparsed;
  }
  var limits = [];
  for (var i = 0, len = postparsed.length; i < len; i++) {
    var part = postparsed[i];
    if (part.type === "placeholder" && part.module === options.moduleName &&
    // The part.subparsed check is used to fix this github issue :
    // https://github.com/open-xml-templating/docxtemplater/issues/671
    !part.subparsed) {
      try {
        var limit = getExpandLimit(part, i, postparsed, options);
        if (!limit) {
          continue;
        }
        var _limit = _slicedToArray(limit, 2),
          left = _limit[0],
          right = _limit[1];
        limits.push({
          left: left,
          right: right,
          part: part,
          i: i,
          leftPart: postparsed[left],
          rightPart: postparsed[right]
        });
      } catch (error) {
        if (error instanceof XTTemplateError) {
          errors.push(error);
        } else {
          throw error;
        }
      }
    }
  }
  limits.sort(function (l1, l2) {
    if (l1.left === l2.left) {
      return l2.part.lIndex < l1.part.lIndex ? 1 : -1;
    }
    return l2.left < l1.left ? 1 : -1;
  });
  var maxRight = -1;
  var offset = 0;
  limits.forEach(function (limit, i) {
    var _postparsed;
    maxRight = Math.max(maxRight, i > 0 ? limits[i - 1].right : 0);
    if (limit.left < maxRight) {
      return;
    }
    var result;
    try {
      result = expandOne([limit.left + offset, limit.right + offset], limit.part, postparsed, options);
    } catch (error) {
      if (error instanceof XTTemplateError) {
        errors.push(error);
      } else {
        throw error;
      }
    }
    if (!result) {
      return;
    }
    offset += result.inner.length - (result.right + 1 - result.left);
    (_postparsed = postparsed).splice.apply(_postparsed, [result.left, result.right + 1 - result.left].concat(_toConsumableArray(result.inner)));
  });
  return {
    postparsed: postparsed,
    errors: errors
  };
}
module.exports = {
  expandToOne: expandToOne,
  getExpandToDefault: getExpandToDefault
};

/***/ }),

/***/ 287:
/***/ (function(module) {

function last(a) {
  return a[a.length - 1];
}
function first(a) {
  return a[0];
}
module.exports = {
  last: last,
  first: first
};

/***/ }),

/***/ 465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(557),
  pregMatchAll = _require.pregMatchAll;
module.exports = function xmlMatcher(content, tagsXmlArray) {
  var res = {
    content: content
  };
  var taj = tagsXmlArray.join("|");
  var regexp = new RegExp("(?:(<(?:".concat(taj, ")[^>]*>)([^<>]*)</(?:").concat(taj, ")>)|(<(?:").concat(taj, ")[^>]*/>)"), "g");
  res.matches = pregMatchAll(regexp, res.content);
  return res;
};

/***/ }),

/***/ 827:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = __webpack_require__(557),
  wordToUtf8 = _require.wordToUtf8,
  convertSpaces = _require.convertSpaces;
var xmlMatcher = __webpack_require__(465);
var Lexer = __webpack_require__(303);
var Parser = __webpack_require__(190);
var _render = __webpack_require__(89);
var postrender = __webpack_require__(393);
var resolve = __webpack_require__(207);
var joinUncorrupt = __webpack_require__(127);
function _getFullText(content, tagsXmlArray) {
  var matcher = xmlMatcher(content, tagsXmlArray);
  var result = matcher.matches.map(function (match) {
    return match.array[2];
  });
  return wordToUtf8(convertSpaces(result.join("")));
}
module.exports = /*#__PURE__*/function () {
  function XmlTemplater(content, options) {
    var _this = this;
    _classCallCheck(this, XmlTemplater);
    this.cachedParsers = {};
    this.content = content;
    Object.keys(options).forEach(function (key) {
      _this[key] = options[key];
    });
    this.setModules({
      inspect: {
        filePath: options.filePath
      }
    });
  }
  _createClass(XmlTemplater, [{
    key: "resolveTags",
    value: function resolveTags(tags) {
      var _this2 = this;
      this.tags = tags;
      var options = this.getOptions();
      var filePath = this.filePath;
      options.scopeManager = this.scopeManager;
      options.resolve = resolve;
      return resolve(options).then(function (_ref) {
        var resolved = _ref.resolved,
          errors = _ref.errors;
        errors.forEach(function (error) {
          // error properties might not be defined if some foreign error
          // (unhandled error not thrown by docxtemplater willingly) is
          // thrown.
          error.properties = error.properties || {};
          error.properties.file = filePath;
        });
        if (errors.length !== 0) {
          throw errors;
        }
        return Promise.all(resolved).then(function (resolved) {
          options.scopeManager.root.finishedResolving = true;
          options.scopeManager.resolved = resolved;
          _this2.setModules({
            inspect: {
              resolved: resolved,
              filePath: filePath
            }
          });
          return resolved;
        });
      });
    }
  }, {
    key: "getFullText",
    value: function getFullText() {
      return _getFullText(this.content, this.fileTypeConfig.tagsXmlTextArray);
    }
  }, {
    key: "setModules",
    value: function setModules(obj) {
      this.modules.forEach(function (module) {
        module.set(obj);
      });
    }
  }, {
    key: "preparse",
    value: function preparse() {
      this.allErrors = [];
      this.xmllexed = Lexer.xmlparse(this.content, {
        text: this.fileTypeConfig.tagsXmlTextArray,
        other: this.fileTypeConfig.tagsXmlLexedArray
      });
      this.setModules({
        inspect: {
          xmllexed: this.xmllexed
        }
      });
      var _Lexer$parse = Lexer.parse(this.xmllexed, this.delimiters),
        lexed = _Lexer$parse.lexed,
        lexerErrors = _Lexer$parse.errors;
      this.allErrors = this.allErrors.concat(lexerErrors);
      this.lexed = lexed;
      this.setModules({
        inspect: {
          lexed: this.lexed
        }
      });
      var options = this.getOptions();
      Parser.preparse(this.lexed, this.modules, options);
    }
  }, {
    key: "parse",
    value: function parse() {
      this.setModules({
        inspect: {
          filePath: this.filePath
        }
      });
      var options = this.getOptions();
      this.parsed = Parser.parse(this.lexed, this.modules, options);
      this.setModules({
        inspect: {
          parsed: this.parsed
        }
      });
      var _Parser$postparse = Parser.postparse(this.parsed, this.modules, options),
        postparsed = _Parser$postparse.postparsed,
        postparsedErrors = _Parser$postparse.errors;
      this.postparsed = postparsed;
      this.setModules({
        inspect: {
          postparsed: this.postparsed
        }
      });
      this.allErrors = this.allErrors.concat(postparsedErrors);
      this.errorChecker(this.allErrors);
      return this;
    }
  }, {
    key: "errorChecker",
    value: function errorChecker(errors) {
      var _this3 = this;
      errors.forEach(function (error) {
        // error properties might not be defined if some foreign
        // (unhandled error not thrown by docxtemplater willingly) is
        // thrown.
        error.properties = error.properties || {};
        error.properties.file = _this3.filePath;
      });
      this.modules.forEach(function (module) {
        errors = module.errorsTransformer(errors);
      });
    }
  }, {
    key: "baseNullGetter",
    value: function baseNullGetter(part, sm) {
      var _this4 = this;
      var value = this.modules.reduce(function (value, module) {
        if (value != null) {
          return value;
        }
        return module.nullGetter(part, sm, _this4);
      }, null);
      if (value != null) {
        return value;
      }
      return this.nullGetter(part, sm);
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return {
        compiled: this.postparsed,
        cachedParsers: this.cachedParsers,
        tags: this.tags,
        modules: this.modules,
        parser: this.parser,
        contentType: this.contentType,
        relsType: this.relsType,
        baseNullGetter: this.baseNullGetter.bind(this),
        filePath: this.filePath,
        fileTypeConfig: this.fileTypeConfig,
        fileType: this.fileType,
        linebreaks: this.linebreaks
      };
    }
  }, {
    key: "render",
    value: function render(to) {
      this.filePath = to;
      var options = this.getOptions();
      options.resolved = this.scopeManager.resolved;
      options.scopeManager = this.scopeManager;
      options.render = _render;
      options.joinUncorrupt = joinUncorrupt;
      var _render2 = _render(options),
        errors = _render2.errors,
        parts = _render2.parts;
      if (errors.length > 0) {
        this.allErrors = errors;
        this.errorChecker(errors);
        return this;
      }
      this.content = postrender(parts, options);
      this.setModules({
        inspect: {
          content: this.content
        }
      });
      return this;
    }
  }]);
  return XmlTemplater;
}();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(380);
/******/ 	window.docxtemplater = __webpack_exports__;
/******/ 	
/******/ })()
;