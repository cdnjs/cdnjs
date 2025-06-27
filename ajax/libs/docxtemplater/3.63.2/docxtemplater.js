/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 60:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var traits = __webpack_require__(536);
var _require = __webpack_require__(207),
  isContent = _require.isContent;
var _require2 = __webpack_require__(946),
  throwRawTagShouldBeOnlyTextInParagraph = _require2.throwRawTagShouldBeOnlyTextInParagraph,
  getInvalidRawXMLValueException = _require2.getInvalidRawXMLValueException;
var wrapper = __webpack_require__(899);
var moduleName = "rawxml";
function getInner(_ref) {
  var part = _ref.part,
    left = _ref.left,
    right = _ref.right,
    postparsed = _ref.postparsed,
    index = _ref.index;
  var paragraphParts = postparsed.slice(left + 1, right);
  for (var i = 0, len = paragraphParts.length; i < len; i++) {
    if (i === index - left - 1) {
      continue;
    }
    var p = paragraphParts[i];
    if (isContent(p)) {
      throwRawTagShouldBeOnlyTextInParagraph({
        paragraphParts: paragraphParts,
        part: part
      });
    }
  }
  return part;
}
var RawXmlModule = /*#__PURE__*/function () {
  function RawXmlModule() {
    _classCallCheck(this, RawXmlModule);
    this.name = "RawXmlModule";
    this.prefix = "@";
  }
  return _createClass(RawXmlModule, [{
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
        value !== null && value !== void 0 ? value : value = options.nullGetter(part);
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
}();
module.exports = function () {
  return wrapper(new RawXmlModule());
};

/***/ }),

/***/ 183:
/***/ (function(module) {

/*
 * Convert string to array (typed, when possible)
 * Stryker disable all : because this is a utility function that was copied
 * from
 * https://github.com/open-xml-templating/pizzip/blob/34a840553c604980859dc6d0dcd1f89b6e5527b3/es6/utf8.js#L33
 */
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
  for (var _i2 = 0, _options$modules2 = options.modules; _i2 < _options$modules2.length; _i2++) {
    var _module = _options$modules2[_i2];
    parts = _module.postrender(parts, options);
  }
  var fullLength = 0;
  var newParts = options.joinUncorrupt(parts, options);
  var longStr = "";
  var lenStr = 0;
  var maxCompact = 65536;
  var uintArrays = [];
  for (var i = 0, len = newParts.length; i < len; i++) {
    var part = newParts[i];

    /*
     * This condition should be hit in the integration test at :
     * it("should not regress with long file (hit maxCompact value of 65536)", function () {
     * Stryker disable all : because this is an optimisation that won't make any tests fail
     */
    if (part.length + lenStr > maxCompact) {
      var _arr = string2buf(longStr);
      fullLength += _arr.length;
      uintArrays.push(_arr);
      longStr = "";
    }
    // Stryker restore all

    longStr += part;
    lenStr += part.length;
    delete newParts[i];
  }
  var arr = string2buf(longStr);
  fullLength += arr.length;
  uintArrays.push(arr);
  var array = new Uint8Array(fullLength);
  var j = 0;

  // Stryker disable all : because this is an optimisation that won't make any tests fail
  for (var _i4 = 0; _i4 < uintArrays.length; _i4++) {
    var buf = uintArrays[_i4];
    for (var _i5 = 0; _i5 < buf.length; ++_i5) {
      array[_i5 + j] = buf[_i5];
    }
    j += buf.length;
  } // Stryker restore all
  return array;
}
module.exports = postrender;

/***/ }),

/***/ 201:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var traitName = "expandPair";
var mergeSort = __webpack_require__(798);
var _require = __webpack_require__(207),
  getLeft = _require.getLeft,
  getRight = _require.getRight,
  pushArray = _require.pushArray;
var wrapper = __webpack_require__(899);
var _require2 = __webpack_require__(536),
  getExpandToDefault = _require2.getExpandToDefault;
var _require3 = __webpack_require__(946),
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
  for (var _i2 = 0; _i2 < traits.length; _i2++) {
    var _part = traits[_i2].part;
    errors.push(getUnmatchedLoopException(_part));
  }
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
  pushArray(transformedTraits, traits);
  while (transformedTraits.length > 0) {
    var result = transformer(transformedTraits);
    pushArray(errors, result.errors);
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
  for (var _i4 = 0; _i4 < traits.length; _i4++) {
    var currentTrait = traits[_i4];
    var part = currentTrait.part;
    var change = getOpenCountChange(part);
    countOpen += change;
    if (change === 1) {
      levelTraits[countOpen] = currentTrait;
    } else {
      var startTrait = levelTraits[countOpen + 1];
      if (countOpen === 0) {
        pairs.push([startTrait, currentTrait]);
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
  return _createClass(ExpandPairTrait, [{
    key: "optionsTransformer",
    value: function optionsTransformer(options, docxtemplater) {
      if (docxtemplater.options.paragraphLoop) {
        pushArray(docxtemplater.fileTypeConfig.expandTags, docxtemplater.fileTypeConfig.onParagraphLoop);
      }
      this.expandTags = docxtemplater.fileTypeConfig.expandTags;
      return options;
    }
  }, {
    key: "postparse",
    value: function postparse(postparsed, _ref) {
      var _this = this;
      var getTraits = _ref.getTraits,
        _postparse = _ref.postparse,
        fileType = _ref.fileType;
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
        if (expandTo === "auto" && fileType !== "text") {
          var result = getExpandToDefault(postparsed, pair, _this.expandTags);
          if (result.error) {
            errors.push(result.error);
          }
          expandTo = result.value;
        }
        if (!expandTo || fileType === "text") {
          var _left = pair[0].offset;
          var _right = pair[1].offset;
          if (_left < lastRight && !_this.docxtemplater.options.syntax.allowUnbalancedLoops) {
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
        if (left < lastRight && !_this.docxtemplater.options.syntax.allowUnbalancedLoops) {
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
        // We're inside the pair
        if (expandedPair[0] === i) {
          // Start pair
          innerParts = [];
        }
        if (pair[0].offset !== i && pair[1].offset !== i) {
          // Exclude inner pair indexes
          innerParts.push(part);
        }
        if (expandedPair[1] === i) {
          // End pair
          var basePart = postparsed[pair[0].offset];
          basePart.subparsed = _postparse(innerParts, {
            basePart: basePart
          });
          basePart.endLindex = pair[1].part.lIndex;
          delete basePart.location;
          delete basePart.expandTo;
          newParsed.push(basePart);
          currentPairIndex++;
          var _expandedPair = expandedPairs[currentPairIndex];
          while (_expandedPair && _expandedPair[0] < i) {
            /*
             * If we have :
             * expandedPairs =[[5,72],[51,67],[90,106]]
             * Then after treating [5,72], we need to treat [90,106]
             * Fixed since v3.58.4
             */
            currentPairIndex++;
            _expandedPair = expandedPairs[currentPairIndex];
          }
        }
        return newParsed;
      }, []);
      return {
        postparsed: newParsed,
        errors: errors
      };
    }
  }]);
}();
module.exports = function () {
  return wrapper(new ExpandPairTrait());
};

/***/ }),

/***/ 207:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _require = __webpack_require__(673),
  DOMParser = _require.DOMParser,
  XMLSerializer = _require.XMLSerializer;
var _require2 = __webpack_require__(946),
  throwXmlTagNotFound = _require2.throwXmlTagNotFound;
var _require3 = __webpack_require__(320),
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
function getDuplicates(arr) {
  var duplicates = [];
  var hash = {},
    result = [];
  for (var i = 0, l = arr.length; i < l; ++i) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true;
      result.push(arr[i]);
    } else {
      duplicates.push(arr[i]);
    }
  }
  return duplicates;
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
  var chunks = [[]];
  for (var _i2 = 0; _i2 < parsed.length; _i2++) {
    var p = parsed[_i2];
    var currentChunk = chunks[chunks.length - 1];
    var res = f(p);
    if (res === "start") {
      chunks.push([p]);
    } else if (res === "end") {
      currentChunk.push(p);
      chunks.push([]);
    } else {
      currentChunk.push(p);
    }
  } // Remove empty chunks
  var result = [];
  for (var _i4 = 0; _i4 < chunks.length; _i4++) {
    var chunk = chunks[_i4];
    if (chunk.length > 0) {
      result.push(chunk);
    }
  }
  return result;
}
function getDefaults() {
  return {
    errorLogging: "json",
    stripInvalidXMLChars: false,
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
    },
    syntax: {
      changeDelimiterPrefix: "="
    }
  };
}
function xml2str(xmlNode) {
  return new XMLSerializer().serializeToString(xmlNode).replace(/xmlns(:[a-z0-9]+)?="" ?/g, "");
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
  for (var i = charMapRegexes.length - 1; i >= 0; i--) {
    var r = charMapRegexes[i];
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
  for (var _i6 = 0; _i6 < arrays.length; _i6++) {
    var array = arrays[_i6];
    for (var _i8 = 0; _i8 < array.length; _i8++) {
      var el = array[_i8];
      result.push(el);
    }
  }
  return result;
}
function pushArray(array1, array2) {
  if (!array2) {
    return array1;
  }
  for (var i = 0, len = array2.length; i < len; i++) {
    array1.push(array2[i]);
  }
  return array1;
}
var spaceRegexp = new RegExp(String.fromCharCode(160), "g");
function convertSpaces(s) {
  return s.replace(spaceRegexp, " ");
}
function pregMatchAll(regex, content) {
  /*
   * Regex is a string, content is the content. It returns an array of all
   * matches with their offset, for example:
   *
   * regex=la
   * content=lolalolilala
   *
   * Returns:
   *
   * [
   *    {array: {0: 'la'}, offset: 2},
   *    {array: {0: 'la'}, offset: 8},
   *    {array: {0: 'la'}, offset: 10}
   * ]
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
    for (var _i10 = 0, _elements2 = elements; _i10 < _elements2.length; _i10++) {
      var element = _elements2[_i10];
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
    for (var _i12 = 0, _elements4 = elements; _i12 < _elements4.length; _i12++) {
      var element = _elements4[_i12];
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

/*
 * Stryker disable all : because those are functions that depend on the parsed
 * structure based and we don't want minimal code here, but rather code that
 * makes things clear.
 */
function isTagStart(tagType, _ref3) {
  var type = _ref3.type,
    tag = _ref3.tag,
    position = _ref3.position;
  return type === "tag" && tag === tagType && (position === "start" || position === "selfclosing");
}
function isTagEnd(tagType, _ref4) {
  var type = _ref4.type,
    tag = _ref4.tag,
    position = _ref4.position;
  return type === "tag" && tag === tagType && position === "end";
}
function isParagraphStart(_ref5) {
  var type = _ref5.type,
    tag = _ref5.tag,
    position = _ref5.position;
  return ["w:p", "a:p"].indexOf(tag) !== -1 && type === "tag" && position === "start";
}
function isParagraphEnd(_ref6) {
  var type = _ref6.type,
    tag = _ref6.tag,
    position = _ref6.position;
  return ["w:p", "a:p"].indexOf(tag) !== -1 && type === "tag" && position === "end";
}
function isTextStart(_ref7) {
  var type = _ref7.type,
    position = _ref7.position,
    text = _ref7.text;
  return text && type === "tag" && position === "start";
}
function isTextEnd(_ref8) {
  var type = _ref8.type,
    position = _ref8.position,
    text = _ref8.text;
  return text && type === "tag" && position === "end";
}
function isContent(_ref9) {
  var type = _ref9.type,
    position = _ref9.position;
  return type === "placeholder" || type === "content" && position === "insidetag";
}
function isModule(_ref10, modules) {
  var module = _ref10.module,
    type = _ref10.type;
  if (!(modules instanceof Array)) {
    modules = [modules];
  }
  return type === "placeholder" && modules.indexOf(module) !== -1;
}
// Stryker restore all

var corruptCharacters = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g;
/*
 * 00    NUL '\0' (null character)
 * 01    SOH (start of heading)
 * 02    STX (start of text)
 * 03    ETX (end of text)
 * 04    EOT (end of transmission)
 * 05    ENQ (enquiry)
 * 06    ACK (acknowledge)
 * 07    BEL '\a' (bell)
 * 08    BS  '\b' (backspace)
 * 0B    VT  '\v' (vertical tab)
 * 0C    FF  '\f' (form feed)
 * 0E    SO  (shift out)
 * 0F    SI  (shift in)
 * 10    DLE (data link escape)
 * 11    DC1 (device control 1)
 * 12    DC2 (device control 2)
 * 13    DC3 (device control 3)
 * 14    DC4 (device control 4)
 * 15    NAK (negative ack.)
 * 16    SYN (synchronous idle)
 * 17    ETB (end of trans. blk)
 * 18    CAN (cancel)
 * 19    EM  (end of medium)
 * 1A    SUB (substitute)
 * 1B    ESC (escape)
 * 1C    FS  (file separator)
 * 1D    GS  (group separator)
 * 1E    RS  (record separator)
 * 1F    US  (unit separator)
 */
function hasCorruptCharacters(string) {
  corruptCharacters.lastIndex = 0;
  return corruptCharacters.test(string);
}
function removeCorruptCharacters(string) {
  if (typeof string !== "string") {
    string = String(string);
  }
  return string.replace(corruptCharacters, "");
}
function invertMap(map) {
  var invertedMap = {};
  for (var key in map) {
    var value = map[key];
    invertedMap[value] || (invertedMap[value] = []);
    invertedMap[value].push(key);
  }
  return invertedMap;
}
/*
 * This ensures that the sort is stable. The default Array.sort of the browser
 * is not stable in firefox, as the JS spec does not enforce the sort to be
 * stable.
 */
function stableSort(arr, compare) {
  // Stryker disable all : in previous versions of Chrome, sort was not stable by itself, so we had to add this. This is to support older versions of JS runners.
  return arr.map(function (item, index) {
    return {
      item: item,
      index: index
    };
  }).sort(function (a, b) {
    return compare(a.item, b.item) || a.index - b.index;
  }).map(function (_ref11) {
    var item = _ref11.item;
    return item;
  });
  // Stryker restore all
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
  getDuplicates: getDuplicates,
  chunkBy: chunkBy,
  last: last,
  first: first,
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
  removeCorruptCharacters: removeCorruptCharacters,
  getDefaults: getDefaults,
  wordToUtf8: wordToUtf8,
  utf8ToWord: utf8ToWord,
  concatArrays: concatArrays,
  pushArray: pushArray,
  invertMap: invertMap,
  charMap: charMap,
  getSingleAttribute: getSingleAttribute,
  setSingleAttribute: setSingleAttribute,
  isWhiteSpace: isWhiteSpace,
  stableSort: stableSort
};

/***/ }),

/***/ 208:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(207),
  startsWith = _require.startsWith,
  endsWith = _require.endsWith,
  isStarting = _require.isStarting,
  isEnding = _require.isEnding,
  isWhiteSpace = _require.isWhiteSpace;
var filetypes = __webpack_require__(322);
function addEmptyParagraphAfterTable(parts) {
  var lastNonEmpty = "";
  for (var i = 0, len = parts.length; i < len; i++) {
    var p = parts[i];
    if (isWhiteSpace(p) || startsWith(p, "<w:bookmarkEnd")) {
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
  /*
   * Before doing this "uncorruption" method here, this was done with the
   * `part.emptyValue` trick, however, there were some corruptions that were
   * not handled, for example with a template like this :
   *
   * ------------------------------------------------
   * | {-w:p falsy}My para{/falsy}   |              |
   * | {-w:p falsy}My para{/falsy}   |              |
   * ------------------------------------------------
   */
  var collecting = "";
  var currentlyCollecting = -1;
  if (filetypes.docx.indexOf(options.contentType) !== -1) {
    parts = addEmptyParagraphAfterTable(parts);
  }
  var startIndex = -1;
  for (var j = 0, len2 = contains.length; j < len2; j++) {
    var _contains$j = contains[j],
      tag = _contains$j.tag,
      shouldContain = _contains$j.shouldContain,
      value = _contains$j.value,
      drop = _contains$j.drop,
      dropParent = _contains$j.dropParent;
    for (var i = 0, len = parts.length; i < len; i++) {
      var part = parts[i];
      if (currentlyCollecting === j) {
        if (isEnding(part, tag)) {
          currentlyCollecting = -1;
          if (dropParent) {
            var start = -1;
            for (var k = startIndex; k > 0; k--) {
              if (isStarting(parts[k], dropParent)) {
                start = k;
                break;
              }
            }
            for (var _k = start; _k <= parts.length; _k++) {
              if (isEnding(parts[_k], dropParent)) {
                parts[_k] = "";
                break;
              }
              parts[_k] = "";
            }
          } else {
            for (var _k2 = startIndex; _k2 <= i; _k2++) {
              parts[_k2] = "";
            }
            if (!drop) {
              parts[i] = collecting + value + part;
            }
          }
        }
        collecting += part;
        for (var _k3 = 0, len3 = shouldContain.length; _k3 < len3; _k3++) {
          var sc = shouldContain[_k3];
          if (isStarting(part, sc)) {
            currentlyCollecting = -1;
            break;
          }
        }
      }
      if (currentlyCollecting === -1 && isStarting(part, tag) &&
      /*
       * To verify that the part doesn't have multiple tags,
       * such as <w:tc><w:p>
       */
      part.substr(1).indexOf("<") === -1) {
        // self-closing tag such as <w:t/>
        if (part[part.length - 2] === "/") {
          parts[i] = "";
        } else {
          startIndex = i;
          currentlyCollecting = j;
          collecting = part;
        }
      }
    }
  }
  return parts;
}
module.exports = joinUncorrupt;

/***/ }),

/***/ 245:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = __webpack_require__(207),
  pushArray = _require.pushArray,
  wordToUtf8 = _require.wordToUtf8,
  convertSpaces = _require.convertSpaces;
var xmlMatcher = __webpack_require__(367);
var Lexer = __webpack_require__(263);
var Parser = __webpack_require__(690);
var _render = __webpack_require__(789);
var postrender = __webpack_require__(183);
var resolve = __webpack_require__(945);
var joinUncorrupt = __webpack_require__(208);
function _getFullText(content, tagsXmlArray) {
  var matcher = xmlMatcher(content, tagsXmlArray);
  var result = matcher.matches.map(function (match) {
    return match.array[2];
  });
  return wordToUtf8(convertSpaces(result.join("")));
}
module.exports = /*#__PURE__*/function () {
  function XmlTemplater(content, options) {
    _classCallCheck(this, XmlTemplater);
    this.cachedParsers = {};
    this.content = content;
    for (var key in options) {
      this[key] = options[key];
    }
    this.setModules({
      inspect: {
        filePath: options.filePath
      }
    });
  }
  return _createClass(XmlTemplater, [{
    key: "resolveTags",
    value: function resolveTags(tags) {
      var _this = this;
      this.tags = tags;
      var options = this.getOptions();
      var filePath = this.filePath;
      options.scopeManager = this.scopeManager;
      options.resolve = resolve;
      var errors = [];
      return Promise.all(this.modules.map(function (module) {
        return Promise.resolve(module.preResolve(options))["catch"](function (e) {
          errors.push(e);
        });
      })).then(function () {
        if (errors.length !== 0) {
          throw errors;
        }
        return resolve(options).then(function (_ref) {
          var resolved = _ref.resolved,
            errors = _ref.errors;
          errors = errors.map(function (error) {
            var _error;
            // If a string is thrown, convert it to a real Error
            if (!(error instanceof Error)) {
              error = new Error(error);
            }
            /*
             * error properties might not be defined if some foreign error
             * (unhandled error not thrown by docxtemplater willingly) is
             * thrown.
             */
            (_error = error).properties || (_error.properties = {});
            error.properties.file = filePath;
            return error;
          });
          if (errors.length !== 0) {
            throw errors;
          }
          return Promise.all(resolved).then(function (resolved) {
            options.scopeManager.root.finishedResolving = true;
            options.scopeManager.resolved = resolved;
            _this.setModules({
              inspect: {
                resolved: resolved,
                filePath: filePath
              }
            });
            return resolved;
          });
        })["catch"](function (error) {
          _this.errorChecker(error);
          throw error;
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
      for (var _i2 = 0, _this$modules2 = this.modules; _i2 < _this$modules2.length; _i2++) {
        var _module = _this$modules2[_i2];
        _module.set(obj);
      }
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
          filePath: this.filePath,
          xmllexed: this.xmllexed
        }
      });
      var _Lexer$parse = Lexer.parse(this.xmllexed, this.delimiters, this.syntax, this.fileType),
        lexed = _Lexer$parse.lexed,
        lexerErrors = _Lexer$parse.errors;
      pushArray(this.allErrors, lexerErrors);
      this.lexed = lexed;
      this.setModules({
        inspect: {
          filePath: this.filePath,
          lexed: this.lexed
        }
      });
      var options = this.getOptions();
      this.lexed = Parser.preparse(this.lexed, this.modules, options);
    }
  }, {
    key: "parse",
    value: function parse() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        noPostParse = _ref2.noPostParse;
      this.setModules({
        inspect: {
          filePath: this.filePath
        }
      });
      var options = this.getOptions();
      this.parsed = Parser.parse(this.lexed, this.modules, options);
      this.setModules({
        inspect: {
          filePath: this.filePath,
          parsed: this.parsed
        }
      });
      if (noPostParse) {
        return this;
      }
      // In v4, we could remove this "this.postparse()" so that users have to call this manually.
      return this.postparse();
    }
  }, {
    key: "postparse",
    value: function postparse() {
      var options = this.getOptions();
      var _Parser$postparse = Parser.postparse(this.parsed, this.modules, options),
        postparsed = _Parser$postparse.postparsed,
        postparsedErrors = _Parser$postparse.errors;
      this.postparsed = postparsed;
      this.setModules({
        inspect: {
          filePath: this.filePath,
          postparsed: this.postparsed
        }
      });
      pushArray(this.allErrors, postparsedErrors);
      this.errorChecker(this.allErrors);
      return this;
    }
  }, {
    key: "errorChecker",
    value: function errorChecker(errors) {
      for (var _i4 = 0, _errors2 = errors; _i4 < _errors2.length; _i4++) {
        var error = _errors2[_i4];
        /*
         * error properties might not be defined if some foreign
         * (unhandled error not thrown by docxtemplater willingly) is
         * thrown.
         */
        error.properties || (error.properties = {});
        error.properties.file = this.filePath;
      }
      for (var _i6 = 0, _this$modules4 = this.modules; _i6 < _this$modules4.length; _i6++) {
        var _module2 = _this$modules4[_i6];
        errors = _module2.errorsTransformer(errors);
      }
    }
  }, {
    key: "baseNullGetter",
    value: function baseNullGetter(part, sm) {
      var _this2 = this;
      var value = this.modules.reduce(function (value, module) {
        if (value != null) {
          return value;
        }
        return module.nullGetter(part, sm, _this2);
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
        linebreaks: this.linebreaks,
        stripInvalidXMLChars: this.stripInvalidXMLChars
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
          filePath: this.filePath,
          content: this.content
        }
      });
      return this;
    }
  }]);
}();

/***/ }),

/***/ 263:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = __webpack_require__(946),
  getUnclosedTagException = _require.getUnclosedTagException,
  getUnopenedTagException = _require.getUnopenedTagException,
  getDuplicateOpenTagException = _require.getDuplicateOpenTagException,
  getDuplicateCloseTagException = _require.getDuplicateCloseTagException,
  throwMalformedXml = _require.throwMalformedXml,
  throwXmlInvalid = _require.throwXmlInvalid,
  XTTemplateError = _require.XTTemplateError;
var _require2 = __webpack_require__(207),
  isTextStart = _require2.isTextStart,
  isTextEnd = _require2.isTextEnd,
  wordToUtf8 = _require2.wordToUtf8,
  pushArray = _require2.pushArray;
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
  for (var _i2 = 0; _i2 < textMatchArray.length; _i2++) {
    var m = textMatchArray[_i2];
    allMatches[m] = true;
  }
  for (var _i4 = 0; _i4 < othersMatchArray.length; _i4++) {
    var _m = othersMatchArray[_i4];
    allMatches[_m] = false;
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
function getDelimiterErrors(delimiterMatches, fullText, syntaxOptions) {
  var errors = [];
  var inDelimiter = false;
  var lastDelimiterMatch = {
    offset: 0
  };
  var xtag;
  var delimiterWithErrors = delimiterMatches.reduce(function (delimiterAcc, currDelimiterMatch) {
    var position = currDelimiterMatch.position;
    var delimiterOffset = currDelimiterMatch.offset;
    var lastDelimiterOffset = lastDelimiterMatch.offset;
    var lastDelimiterLength = lastDelimiterMatch.length;
    xtag = fullText.substr(lastDelimiterOffset, delimiterOffset - lastDelimiterOffset);
    if (inDelimiter && position === "start") {
      if (lastDelimiterOffset + lastDelimiterLength === delimiterOffset) {
        xtag = fullText.substr(lastDelimiterOffset, delimiterOffset - lastDelimiterOffset + lastDelimiterLength + 4);
        if (!syntaxOptions.allowUnclosedTag) {
          errors.push(getDuplicateOpenTagException({
            xtag: xtag,
            offset: lastDelimiterOffset
          }));
          lastDelimiterMatch = currDelimiterMatch;
          delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
            error: true
          }));
          return delimiterAcc;
        }
      }
      if (!syntaxOptions.allowUnclosedTag) {
        errors.push(getUnclosedTagException({
          xtag: wordToUtf8(xtag),
          offset: lastDelimiterOffset
        }));
        lastDelimiterMatch = currDelimiterMatch;
        delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
          error: true
        }));
        return delimiterAcc;
      }
      delimiterAcc.pop();
    }
    if (!inDelimiter && position === "end") {
      if (syntaxOptions.allowUnopenedTag) {
        return delimiterAcc;
      }
      if (lastDelimiterOffset + lastDelimiterLength === delimiterOffset) {
        xtag = fullText.substr(lastDelimiterOffset - 4, delimiterOffset - lastDelimiterOffset + lastDelimiterLength + 4);
        errors.push(getDuplicateCloseTagException({
          xtag: xtag,
          offset: lastDelimiterOffset
        }));
        lastDelimiterMatch = currDelimiterMatch;
        delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
          error: true
        }));
        return delimiterAcc;
      }
      errors.push(getUnopenedTagException({
        xtag: xtag,
        offset: delimiterOffset
      }));
      lastDelimiterMatch = currDelimiterMatch;
      delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
        error: true
      }));
      return delimiterAcc;
    }
    inDelimiter = position === "start";
    lastDelimiterMatch = currDelimiterMatch;
    delimiterAcc.push(currDelimiterMatch);
    return delimiterAcc;
  }, []);
  if (inDelimiter) {
    var lastDelimiterOffset = lastDelimiterMatch.offset;
    xtag = fullText.substr(lastDelimiterOffset, fullText.length - lastDelimiterOffset);
    if (!syntaxOptions.allowUnclosedTag) {
      errors.push(getUnclosedTagException({
        xtag: wordToUtf8(xtag),
        offset: lastDelimiterOffset
      }));
    } else {
      delimiterWithErrors.pop();
    }
  }
  return {
    delimiterWithErrors: delimiterWithErrors,
    errors: errors
  };
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
function getAllDelimiterIndexes(fullText, delimiters, syntaxOptions) {
  var indexes = [];
  var start = delimiters.start,
    end = delimiters.end;
  var offset = -1;
  var insideTag = false;
  if (start == null && end == null) {
    // Special case of delimiter set to null/null, no templating is done
    return [];
  }
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
    /*
     * If tag starts with =, such as {=[ ]=}
     * then the delimiters will change right after that tag.
     *
     * For example, with the following template :
     *
     * Hello {foo}, {=[ ]=}what's up with [name] ?
     *
     * The "foo" tag is a normal tag, the "=[ ]=" is a tag to change the
     * delimiters to "[" and "]", and the last "name" is a tag with the new
     * delimiters
     */
    if (syntaxOptions.changeDelimiterPrefix && compareResult === DELIMITER_START && fullText[offset + start.length] === syntaxOptions.changeDelimiterPrefix) {
      indexes.push({
        offset: startOffset,
        position: "start",
        length: start.length,
        changedelimiter: true
      });
      var nextEqual = fullText.indexOf(syntaxOptions.changeDelimiterPrefix, offset + start.length + 1);
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
function parseDelimiters(innerContentParts, delimiters, syntaxOptions) {
  var full = innerContentParts.map(function (p) {
    return p.value;
  }).join("");
  var delimiterMatches = getAllDelimiterIndexes(full, delimiters, syntaxOptions);
  var offset = 0;
  var ranges = innerContentParts.map(function (part) {
    offset += part.value.length;
    return {
      offset: offset - part.value.length,
      lIndex: part.lIndex
    };
  });
  var _getDelimiterErrors = getDelimiterErrors(delimiterMatches, full, syntaxOptions),
    delimiterWithErrors = _getDelimiterErrors.delimiterWithErrors,
    errors = _getDelimiterErrors.errors;
  var cutNext = 0;
  var delimiterIndex = 0;
  var parsed = ranges.map(function (p, i) {
    var offset = p.offset;
    var range = [offset, offset + innerContentParts[i].value.length];
    var partContent = innerContentParts[i].value;
    var delimitersInOffset = [];
    while (delimiterIndex < delimiterWithErrors.length && inRange(range, delimiterWithErrors[delimiterIndex])) {
      delimitersInOffset.push(delimiterWithErrors[delimiterIndex]);
      delimiterIndex++;
    }
    var parts = [];
    var cursor = 0;
    if (cutNext > 0) {
      cursor = cutNext;
      cutNext = 0;
    }
    for (var _i6 = 0; _i6 < delimitersInOffset.length; _i6++) {
      var delimiterInOffset = delimitersInOffset[_i6];
      var _value = partContent.substr(cursor, delimiterInOffset.offset - offset - cursor);
      if (delimiterInOffset.changedelimiter) {
        if (delimiterInOffset.position === "start") {
          if (_value.length > 0) {
            parts.push({
              type: "content",
              value: _value
            });
          }
        } else {
          cursor = delimiterInOffset.offset - offset + delimiterInOffset.length;
        }
        continue;
      }
      if (_value.length > 0) {
        parts.push({
          type: "content",
          value: _value
        });
        cursor += _value.length;
      }
      var delimiterPart = {
        type: "delimiter",
        position: delimiterInOffset.position,
        offset: cursor + offset
      };
      parts.push(delimiterPart);
      cursor = delimiterInOffset.offset - offset + delimiterInOffset.length;
    }
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
function decodeContentParts(xmlparsed, fileType) {
  var inTextTag = false;
  for (var _i8 = 0; _i8 < xmlparsed.length; _i8++) {
    var part = xmlparsed[_i8];
    inTextTag = updateInTextTag(part, inTextTag);
    if (part.type === "content") {
      part.position = inTextTag ? "insidetag" : "outsidetag";
    }
    if (fileType !== "text" && isInsideContent(part)) {
      part.value = part.value.replace(/>/g, "&gt;");
    }
  }
}
module.exports = {
  parseDelimiters: parseDelimiters,
  parse: function parse(xmllexed, delimiters, syntax, fileType) {
    decodeContentParts(xmllexed, fileType);
    var _parseDelimiters = parseDelimiters(getContentParts(xmllexed), delimiters, syntax),
      delimiterParsed = _parseDelimiters.parsed,
      errors = _parseDelimiters.errors;
    var lexed = [];
    var index = 0;
    var lIndex = 0;
    for (var _i10 = 0; _i10 < xmllexed.length; _i10++) {
      var part = xmllexed[_i10];
      if (isInsideContent(part)) {
        for (var _i12 = 0, _delimiterParsed$inde2 = delimiterParsed[index]; _i12 < _delimiterParsed$inde2.length; _i12++) {
          var p = _delimiterParsed$inde2[_i12];
          if (p.type === "content") {
            p.position = "insidetag";
          }
          p.lIndex = lIndex++;
        }
        pushArray(lexed, delimiterParsed[index]);
        index++;
      } else {
        part.lIndex = lIndex++;
        lexed.push(part);
      }
    }
    return {
      errors: errors,
      lexed: lexed
    };
  },
  xmlparse: function xmlparse(content, xmltags) {
    var matches = tagMatcher(content, xmltags.text, xmltags.other);
    var cursor = 0;
    var parsed = matches.reduce(function (parsed, match) {
      if (content.length > cursor && match.offset - cursor > 0) {
        parsed.push({
          type: "content",
          value: content.substr(cursor, match.offset - cursor)
        });
      }
      cursor = match.offset + match.value.length;
      delete match.offset;
      parsed.push(match);
      return parsed;
    }, []);
    if (content.length > cursor) {
      parsed.push({
        type: "content",
        value: content.substr(cursor)
      });
    }
    return parsed;
  }
};

/***/ }),

/***/ 271:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var loopModule = __webpack_require__(885);
var spacePreserveModule = __webpack_require__(522);
var rawXmlModule = __webpack_require__(60);
var expandPairTrait = __webpack_require__(201);
var render = __webpack_require__(307);
function DocXFileTypeConfig() {
  return {
    getTemplatedFiles: function getTemplatedFiles() {
      return [];
    },
    textPath: function textPath(doc) {
      return doc.textTarget;
    },
    tagsXmlTextArray: ["Company", "HyperlinkBase", "Manager", "cp:category", "cp:keywords", "dc:creator", "dc:description", "dc:subject", "dc:title", "cp:contentStatus", "w:t", "a:t", "m:t", "vt:lpstr", "vt:lpwstr"],
    tagsXmlLexedArray: ["w:proofState", "w:tc", "w:tr", "w:tbl", "w:body", "w:document", "w:p", "w:r", "w:br", "w:rPr", "w:pPr", "w:spacing", "w:sdtContent", "w:sdt", "w:drawing", "w:sectPr", "w:type", "w:headerReference", "w:footerReference", "w:bookmarkStart", "w:bookmarkEnd", "w:commentRangeStart", "w:commentRangeEnd", "w:commentReference"],
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
      tag: "w:sdtContent",
      shouldContain: ["w:p", "w:r", "w:commentRangeStart", "w:sdt"],
      value: "<w:p></w:p>"
    }, {
      tag: "w:tc",
      shouldContain: ["w:p"],
      value: "<w:p></w:p>"
    }, {
      tag: "w:tr",
      shouldContain: ["w:tc"],
      drop: true
    }, {
      tag: "w:tbl",
      shouldContain: ["w:tr"],
      drop: true
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
    tagsXmlLexedArray: ["p:sp", "a:tc", "a:tr", "a:tbl", "a:graphicData", "a:p", "a:r", "a:rPr", "p:txBody", "a:txBody", "a:off", "a:ext", "p:graphicFrame", "p:xfrm", "a16:rowId", "a:endParaRPr"],
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
      dropParent: "p:graphicFrame"
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

/***/ 307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var wrapper = __webpack_require__(899);
var _require = __webpack_require__(946),
  getScopeCompilationError = _require.getScopeCompilationError,
  getCorruptCharactersException = _require.getCorruptCharactersException;
var _require2 = __webpack_require__(207),
  utf8ToWord = _require2.utf8ToWord,
  hasCorruptCharacters = _require2.hasCorruptCharacters,
  removeCorruptCharacters = _require2.removeCorruptCharacters;
var _require3 = __webpack_require__(356),
  settingsContentType = _require3.settingsContentType,
  coreContentType = _require3.coreContentType,
  appContentType = _require3.appContentType,
  customContentType = _require3.customContentType;
var NON_LINE_BREAKS_CONTENT_TYPE = [settingsContentType, coreContentType, appContentType, customContentType];
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
  return _createClass(Render, [{
    key: "optionsTransformer",
    value: function optionsTransformer(options, docxtemplater) {
      this.docxtemplater = docxtemplater;
      this.brTag = docxtemplater.fileType === "docx" ? "<w:r><w:br/></w:r>" : "<a:br/>";
      this.prefix = ftprefix[docxtemplater.fileType];
      this.runStartTag = "".concat(this.prefix, ":r");
      this.runPropsStartTag = "".concat(this.prefix, ":rPr");
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
      for (var from in this.compiled) {
        mapper[from] = {
          from: from,
          data: this.data
        };
      }
      return mapper;
    }
  }, {
    key: "postparse",
    value: function postparse(postparsed, options) {
      var errors = [];
      for (var _i2 = 0; _i2 < postparsed.length; _i2++) {
        var p = postparsed[_i2];
        if (p.type === "placeholder") {
          var tag = p.value;
          try {
            options.cachedParsers[p.lIndex] = this.docxtemplater.parser(tag, {
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
      }
      return {
        postparsed: postparsed,
        errors: errors
      };
    }
  }, {
    key: "render",
    value: function render(part, _ref) {
      var contentType = _ref.contentType,
        scopeManager = _ref.scopeManager,
        linebreaks = _ref.linebreaks,
        nullGetter = _ref.nullGetter,
        fileType = _ref.fileType,
        stripInvalidXMLChars = _ref.stripInvalidXMLChars;
      if (NON_LINE_BREAKS_CONTENT_TYPE.indexOf(contentType) !== -1) {
        // Fixes issue tested in #docprops-linebreak
        linebreaks = false;
      }
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
      value !== null && value !== void 0 ? value : value = nullGetter(part);
      if (typeof value === "string") {
        if (stripInvalidXMLChars) {
          value = removeCorruptCharacters(value);
        } else if (["docx", "pptx", "xlsx"].indexOf(fileType) !== -1 && hasCorruptCharacters(value)) {
          return {
            errors: [getCorruptCharactersException({
              tag: part.value,
              value: value,
              offset: part.offset
            })]
          };
        }
      }
      if (fileType === "text") {
        return {
          value: value
        };
      }
      return {
        value: linebreaks && typeof value === "string" ? this.renderLineBreaks(value) : utf8ToWord(value)
      };
    }
  }, {
    key: "recordRuns",
    value: function recordRuns(part) {
      if (part.tag === this.runStartTag) {
        this.recordedRun = "";
      } else if (part.tag === this.runPropsStartTag) {
        if (part.position === "start") {
          this.recordRun = true;
          this.recordedRun += part.value;
        }
        if (part.position === "end" || part.position === "selfclosing") {
          this.recordedRun += part.value;
          this.recordRun = false;
        }
      } else if (this.recordRun) {
        this.recordedRun += part.value;
      }
    }
  }, {
    key: "renderLineBreaks",
    value: function renderLineBreaks(value) {
      var result = [];
      var lines = value.split("\n");
      for (var i = 0, len = lines.length; i < len; i++) {
        result.push(utf8ToWord(lines[i]));
        if (i < lines.length - 1) {
          result.push("</".concat(this.prefix, ":t></").concat(this.prefix, ":r>").concat(this.brTag, "<").concat(this.prefix, ":r>").concat(this.recordedRun, "<").concat(this.prefix, ":t").concat(this.docxtemplater.fileType === "docx" ? ' xml:space="preserve"' : "", ">"));
        }
      }
      return result;
    }
  }]);
}();
module.exports = function () {
  return wrapper(new Render());
};

/***/ }),

/***/ 320:
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

/***/ 322:
/***/ (function(module) {

var docxContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";
var docxmContentType = "application/vnd.ms-word.document.macroEnabled.main+xml";
var dotxContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml";
var dotmContentType = "application/vnd.ms-word.template.macroEnabledTemplate.main+xml";
var headerContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml";
var footnotesContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml";
var commentsContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml";
var footerContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml";
var pptxContentType = "application/vnd.openxmlformats-officedocument.presentationml.slide+xml";
var pptxSlideMaster = "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml";
var pptxSlideLayout = "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml";
var pptxPresentationContentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml";
var xlsxContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml";
var xlsmContentType = "application/vnd.ms-excel.sheet.macroEnabled.main+xml";
var xlsxWorksheetContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml";
/*
 * This is used for the main part of the document, ie usually that would be the
 * type of word/document.xml
 */
var main = [docxContentType, docxmContentType, dotxContentType, dotmContentType];
var filetypes = {
  main: main,
  docx: [headerContentType].concat(main, [footerContentType, footnotesContentType, commentsContentType]),
  pptx: [pptxContentType, pptxSlideMaster, pptxSlideLayout, pptxPresentationContentType],
  xlsx: [xlsxContentType, xlsmContentType, xlsxWorksheetContentType]
};
module.exports = filetypes;

/***/ }),

/***/ 356:
/***/ (function(module) {

var coreContentType = "application/vnd.openxmlformats-package.core-properties+xml";
var appContentType = "application/vnd.openxmlformats-officedocument.extended-properties+xml";
var customContentType = "application/vnd.openxmlformats-officedocument.custom-properties+xml";
var settingsContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml";
var diagramDataContentType = "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml";
var diagramDrawingContentType = "application/vnd.ms-office.drawingml.diagramDrawing+xml";
module.exports = {
  settingsContentType: settingsContentType,
  coreContentType: coreContentType,
  appContentType: appContentType,
  customContentType: customContentType,
  diagramDataContentType: diagramDataContentType,
  diagramDrawingContentType: diagramDrawingContentType
};

/***/ }),

/***/ 367:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(207),
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

/***/ 438:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = __webpack_require__(207),
  pushArray = _require.pushArray;
var wrapper = __webpack_require__(899);
var filetypes = __webpack_require__(322);
var _require2 = __webpack_require__(356),
  settingsContentType = _require2.settingsContentType,
  coreContentType = _require2.coreContentType,
  appContentType = _require2.appContentType,
  customContentType = _require2.customContentType,
  diagramDataContentType = _require2.diagramDataContentType,
  diagramDrawingContentType = _require2.diagramDrawingContentType;
var commonContentTypes = [settingsContentType, coreContentType, appContentType, customContentType, diagramDataContentType, diagramDrawingContentType];
var Common = /*#__PURE__*/function () {
  function Common() {
    _classCallCheck(this, Common);
    this.name = "Common";
  }
  return _createClass(Common, [{
    key: "getFileType",
    value: function getFileType(_ref) {
      var doc = _ref.doc;
      var invertedContentTypes = doc.invertedContentTypes;
      if (!invertedContentTypes) {
        return;
      }
      for (var _i2 = 0; _i2 < commonContentTypes.length; _i2++) {
        var ct = commonContentTypes[_i2];
        if (invertedContentTypes[ct]) {
          pushArray(doc.targets, invertedContentTypes[ct]);
        }
      }
      var keys = ["docx", "pptx", "xlsx"];
      var ftCandidate;
      for (var _i4 = 0; _i4 < keys.length; _i4++) {
        var key = keys[_i4];
        var contentTypes = filetypes[key];
        for (var _i6 = 0; _i6 < contentTypes.length; _i6++) {
          var _ct = contentTypes[_i6];
          if (invertedContentTypes[_ct]) {
            for (var _i8 = 0, _invertedContentTypes2 = invertedContentTypes[_ct]; _i8 < _invertedContentTypes2.length; _i8++) {
              var target = _invertedContentTypes2[_i8];
              if (doc.relsTypes[target] && ["http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"].indexOf(doc.relsTypes[target]) === -1) {
                continue;
              }
              ftCandidate = key;
              if (filetypes.main.indexOf(_ct) !== -1 || _ct === filetypes.pptx[0]) {
                doc.textTarget || (doc.textTarget = target);
              }
              if (ftCandidate === "xlsx") {
                continue;
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
}();
module.exports = function () {
  return wrapper(new Common());
};

/***/ }),

/***/ 460:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(207),
  pushArray = _require.pushArray;
// The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
function replaceErrors(key, value) {
  if (value instanceof Error) {
    return pushArray(Object.getOwnPropertyNames(value), ["stack"]).reduce(function (error, key) {
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
    /*
     * errorMessages is a humanly readable message looking like this :
     * 'The tag beginning with "foobar" is unopened'
     */
  }
}
module.exports = logger;

/***/ }),

/***/ 522:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var wrapper = __webpack_require__(899);
var _require = __webpack_require__(207),
  isTextStart = _require.isTextStart,
  isTextEnd = _require.isTextEnd,
  endsWith = _require.endsWith,
  startsWith = _require.startsWith,
  pushArray = _require.pushArray;
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

// This module is used only for `docx` files
var SpacePreserve = /*#__PURE__*/function () {
  function SpacePreserve() {
    _classCallCheck(this, SpacePreserve);
    this.name = "SpacePreserveModule";
  }
  return _createClass(SpacePreserve, [{
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
          pushArray(postparsed, chunk);
          chunk = [];
          inTextTag = false;
          endLindex = 0;
          lastTextTag = 0;
        }
        return postparsed;
      }, []);
      pushArray(result, chunk);
      return result;
    }
  }, {
    key: "postrender",
    value: function postrender(parts) {
      var lastNonEmpty = "";
      var lastNonEmptyIndex = 0;
      for (var i = 0, len = parts.length; i < len; i++) {
        var p = parts[i];
        if (p === "") {
          continue;
        }
        if (endsWith(lastNonEmpty, wTpreserve) && startsWith(p, wtEnd)) {
          parts[lastNonEmptyIndex] = lastNonEmpty.substr(0, lastNonEmpty.length - wTpreservelen) + "<w:t/>";
          p = p.substr(wtEndlen);
        }
        lastNonEmpty = p;
        lastNonEmptyIndex = i;
        parts[i] = p;
      }
      return parts;
    }
  }]);
}();
module.exports = function () {
  return wrapper(new SpacePreserve());
};

/***/ }),

/***/ 536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = __webpack_require__(207),
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
var _require2 = __webpack_require__(946),
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
   * Gets the list of closing and opening tags between two texts. It doesn't take
   * into account tags that are opened then closed. Those that are closed then
   * opened are kept
   *
   * Example input :
   *
   * [
   * 	{
   * 		"type": "placeholder",
   * 		"value": "table1",
   * 		...
   * 	},
   * 	{
   * 		"type": "placeholder",
   * 		"value": "t1data1",
   * 	},
   * 	{
   * 		"type": "tag",
   * 		"position": "end",
   * 		"text": true,
   * 		"value": "</w:t>",
   * 		"tag": "w:t",
   * 		"lIndex": 112
   * 	},
   * 	{
   * 		"type": "tag",
   * 		"value": "</w:r>",
   * 	},
   * 	{
   * 		"type": "tag",
   * 		"value": "</w:p>",
   * 	},
   * 	{
   * 		"type": "tag",
   * 		"value": "</w:tc>",
   * 	},
   * 	{
   * 		"type": "tag",
   * 		"value": "<w:tc>",
   * 	},
   * 	{
   * 		"type": "content",
   * 		"value": "<w:tcPr><w:tcW w:w="2444" w:type="dxa"/><w:tcBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/></w:tcBorders><w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/></w:tcPr>",
   * 	},
   * 	...
   * 	{
   * 		"type": "tag",
   * 		"value": "<w:r>",
   * 	},
   * 	{
   * 		"type": "tag",
   * 		"value": "<w:t xml:space="preserve">",
   * 	},
   * 	{
   * 		"type": "placeholder",
   * 		"value": "t1data4",
   * 	}
   * ]
   *
   * Returns
   *
   * 	[
   * 		{
   * 			"tag": "</w:t>",
   * 		},
   * 		{
   * 			"tag": "</w:r>",
   * 		},
   * 		{
   * 			"tag": "</w:p>",
   * 		},
   * 		{
   * 			"tag": "</w:tc>",
   * 		},
   * 		{
   * 			"tag": "<w:tc>",
   * 		},
   * 		{
   * 			"tag": "<w:p>",
   * 		},
   * 		{
   * 			"tag": "<w:r>",
   * 		},
   * 		{
   * 			"tag": "<w:t>",
   * 		},
   * 	]
   */

  var result = [];
  for (var _i2 = 0; _i2 < parts.length; _i2++) {
    var _parts$_i = parts[_i2],
      position = _parts$_i.position,
      value = _parts$_i.value,
      tag = _parts$_i.tag;
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
  for (var _i4 = 0; _i4 < xmlElements.length; _i4++) {
    var xmlElement = xmlElements[_i4];
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
      var _expandTags$_i = expandTags[_i6],
        contains = _expandTags$_i.contains,
        expand = _expandTags$_i.expand,
        onlyTextInTag = _expandTags$_i.onlyTextInTag;
      if (has(contains, xmlElements)) {
        if (onlyTextInTag) {
          var left = getLeftOrNull(postparsed, contains, pair[0].offset);
          var right = getRightOrNull(postparsed, contains, pair[1].offset);
          if (left === null || right === null) {
            return 0; // continue
          }
          var chunks = chunkBy(postparsed.slice(left, right), function (p) {
            return isTagStart(contains, p) ? "start" : isTagEnd(contains, p) ? "end" : null;
          });
          var firstChunk = first(chunks);
          var lastChunk = last(chunks);
          var firstContent = firstChunk.filter(isContent);
          var lastContent = lastChunk.filter(isContent);
          if (firstContent.length !== 1 || lastContent.length !== 1) {
            return 0; // continue
          }
        }
        return {
          v: {
            value: expand
          }
        };
      }
    },
    _ret;
  for (var _i6 = 0; _i6 < expandTags.length; _i6++) {
    _ret = _loop();
    if (_ret === 0) continue;
    if (_ret) return _ret.v;
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
    var errProps = _objectSpread({
      part: part,
      rootError: rootError,
      postparsed: postparsed,
      expandTo: expandTo,
      index: index
    }, options.error);
    if (options.onError) {
      var errorResult = options.onError(errProps);
      if (errorResult === "ignore") {
        return;
      }
    }
    throwExpandNotFound(errProps);
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

/* eslint-disable-next-line complexity */
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
    /*
     * The part.subparsed check is used to fix this github issue :
     * https://github.com/open-xml-templating/docxtemplater/issues/671
     */
    !part.subparsed && !part.expanded) {
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
        // The Error can only be a
        errors.push(error);
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
  for (var _i7 = 0, _len = limits.length; _i7 < _len; _i7++) {
    var _postparsed;
    var _limit2 = limits[_i7];
    maxRight = Math.max(maxRight, _i7 > 0 ? limits[_i7 - 1].right : 0);
    if (_limit2.left < maxRight) {
      continue;
    }
    var result = void 0;
    try {
      result = expandOne([_limit2.left + offset, _limit2.right + offset], _limit2.part, postparsed, options);
    } catch (error) {
      if (options.onError) {
        var errorResult = options.onError(_objectSpread({
          part: _limit2.part,
          rootError: error,
          postparsed: postparsed,
          expandOne: expandOne
        }, options.errors));
        if (errorResult === "ignore") {
          continue;
        }
      }
      if (error instanceof XTTemplateError) {
        errors.push(error);
      } else {
        throw error;
      }
    }
    if (!result) {
      continue;
    }
    offset += result.inner.length - (result.right + 1 - result.left);
    (_postparsed = postparsed).splice.apply(_postparsed, [result.left, result.right + 1 - result.left].concat(_toConsumableArray(result.inner)));
  }
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

/***/ 650:
/***/ (function(module) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var nbspRegex = new RegExp(String.fromCharCode(160), "g");
function replaceNbsps(str) {
  return str.replace(nbspRegex, " ");
}
function match(condition, placeHolderContent) {
  var type = _typeof(condition);
  if (type === "string") {
    return replaceNbsps(placeHolderContent.substr(0, condition.length)) === condition;
  }
  if (condition instanceof RegExp) {
    return condition.test(replaceNbsps(placeHolderContent));
  }
  if (type === "function") {
    return !!condition(placeHolderContent);
  }
}
function getValue(condition, placeHolderContent) {
  var type = _typeof(condition);
  if (type === "string") {
    return replaceNbsps(placeHolderContent).substr(condition.length);
  }
  if (condition instanceof RegExp) {
    return replaceNbsps(placeHolderContent).match(condition)[1];
  }
  if (type === "function") {
    return condition(placeHolderContent);
  }
}
function getValues(condition, placeHolderContent) {
  var type = _typeof(condition);
  if (type === "string") {
    return [placeHolderContent, replaceNbsps(placeHolderContent).substr(condition.length)];
  }
  if (condition instanceof RegExp) {
    return replaceNbsps(placeHolderContent).match(condition);
  }
  if (type === "function") {
    return [placeHolderContent, condition(placeHolderContent)];
  }
}
module.exports = {
  match: match,
  getValue: getValue,
  getValues: getValues
};

/***/ }),

/***/ 673:
/***/ (function(module) {

module.exports = {
  XMLSerializer: window.XMLSerializer,
  DOMParser: window.DOMParser,
  XMLDocument: window.XMLDocument
};

/***/ }),

/***/ 690:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _require = __webpack_require__(207),
  wordToUtf8 = _require.wordToUtf8,
  pushArray = _require.pushArray;
var _require2 = __webpack_require__(650),
  match = _require2.match,
  getValue = _require2.getValue,
  getValues = _require2.getValues;
function getMatchers(modules, options) {
  var allMatchers = [];
  for (var _i2 = 0; _i2 < modules.length; _i2++) {
    var _module = modules[_i2];
    if (_module.matchers) {
      var matchers = _module.matchers(options);
      if (!(matchers instanceof Array)) {
        throw new Error("module matcher returns a non array");
      }
      pushArray(allMatchers, matchers);
    }
  }
  return allMatchers;
}
function getMatches(matchers, placeHolderContent, options) {
  var matches = [];
  for (var _i4 = 0; _i4 < matchers.length; _i4++) {
    var matcher = matchers[_i4];
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
    for (var _i6 = 0; _i6 < matches.length; _i6++) {
      var _match = matches[_i6];
      _match.priority || (_match.priority = -_match.value.length);
      if (!bestMatch || _match.priority > bestMatch.priority) {
        bestMatch = _match;
      }
    }
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
  for (var _i8 = 0; _i8 < modules.length; _i8++) {
    var _module3 = modules[_i8];
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
      for (var _i10 = 0; _i10 < modules.length; _i10++) {
        var _module4 = modules[_i10];
        parsed = _module4.preparse(parsed, options) || parsed;
      }
      return parsed;
    }
    return preparse(parsed, options);
  },
  parse: function parse(lexed, modules, options) {
    var inPlaceHolder = false;
    var placeHolderContent = "";
    var startOffset;
    var tailParts = [];
    var droppedTags = options.fileTypeConfig.droppedTagsInsidePlaceholder || [];
    return lexed.reduce(function (parsed, token) {
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
          pushArray(parsed, tailParts);
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
          pushArray(errors, r.errors);
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

/***/ 779:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = __webpack_require__(946),
  getScopeParserExecutionError = _require.getScopeParserExecutionError;
var _require2 = __webpack_require__(320),
  last = _require2.last;
var _require3 = __webpack_require__(207),
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
      tag: meta.part,
      scopePath: this.scopePath
    });
  } else if (this.cachedParsers[meta.part.lIndex]) {
    parser = this.cachedParsers[meta.part.lIndex];
  } else {
    parser = this.cachedParsers[meta.part.lIndex] = this.parser(tag, {
      tag: meta.part,
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
      tag: meta.part,
      scopePath: this.scopePath
    });
  } else if (this.cachedParsers[meta.part.lIndex]) {
    parser = this.cachedParsers[meta.part.lIndex];
  } else {
    parser = this.cachedParsers[meta.part.lIndex] = this.parser(tag, {
      tag: meta.part,
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
  return _createClass(ScopeManager, [{
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

/***/ 789:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(946),
  throwUnimplementedTagType = _require.throwUnimplementedTagType,
  XTScopeParserError = _require.XTScopeParserError;
var _require2 = __webpack_require__(207),
  pushArray = _require2.pushArray;
var getResolvedId = __webpack_require__(830);
function moduleRender(part, options) {
  for (var _i2 = 0, _options$modules2 = options.modules; _i2 < _options$modules2.length; _i2++) {
    var _module = _options$modules2[_i2];
    var moduleRendered = _module.render(part, options);
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
  var parts = [];
  for (var i = 0, len = compiled.length; i < len; i++) {
    var part = compiled[i];
    options.index = i;
    options.resolvedId = getResolvedId(part, options);
    var moduleRendered = void 0;
    try {
      moduleRendered = moduleRender(part, options);
    } catch (e) {
      if (e instanceof XTScopeParserError) {
        errors.push(e);
        parts.push(part);
        continue;
      }
      throw e;
    }
    if (moduleRendered) {
      if (moduleRendered.errors) {
        pushArray(errors, moduleRendered.errors);
      }
      parts.push(moduleRendered);
      continue;
    }
    if (part.type === "content" || part.type === "tag") {
      parts.push(part);
      continue;
    }
    throwUnimplementedTagType(part, i);
  }

  // This is done in two steps because for some files, it is possible to #edit-value-backwards
  var totalParts = [];
  for (var _i4 = 0; _i4 < parts.length; _i4++) {
    var value = parts[_i4].value;
    if (value instanceof Array) {
      pushArray(totalParts, value);
    } else if (value) {
      totalParts.push(value);
    }
  }
  return {
    errors: errors,
    parts: totalParts
  };
}
module.exports = render;

/***/ }),

/***/ 798:
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

/***/ 807:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _excluded = ["modules"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DocUtils = __webpack_require__(207);
DocUtils.traits = __webpack_require__(536);
DocUtils.moduleWrapper = __webpack_require__(899);
var commonModule = __webpack_require__(438);
var createScope = __webpack_require__(779);
var Lexer = __webpack_require__(263);
var _require = __webpack_require__(903),
  _getTags = _require.getTags;
var logErrors = __webpack_require__(460);
var collectContentTypes = __webpack_require__(891);
var _require2 = __webpack_require__(946),
  throwMultiError = _require2.throwMultiError,
  throwResolveBeforeCompile = _require2.throwResolveBeforeCompile,
  throwRenderInvalidTemplate = _require2.throwRenderInvalidTemplate,
  throwRenderTwice = _require2.throwRenderTwice,
  XTInternalError = _require2.XTInternalError,
  XTTemplateError = _require2.XTTemplateError,
  throwFileTypeNotIdentified = _require2.throwFileTypeNotIdentified,
  throwFileTypeNotHandled = _require2.throwFileTypeNotHandled,
  throwApiVersionError = _require2.throwApiVersionError;
var getDefaults = DocUtils.getDefaults,
  str2xml = DocUtils.str2xml,
  xml2str = DocUtils.xml2str,
  moduleWrapper = DocUtils.moduleWrapper,
  concatArrays = DocUtils.concatArrays,
  uniq = DocUtils.uniq,
  getDuplicates = DocUtils.getDuplicates,
  stableSort = DocUtils.stableSort,
  pushArray = DocUtils.pushArray;
var ctXML = "[Content_Types].xml";
var relsFile = "_rels/.rels";
var currentModuleApiVersion = [3, 46, 0];
function zipFileOrder(files) {
  var allFiles = [];
  for (var name in files) {
    allFiles.push(name);
  }
  /*
   * The first files that need to be put in the zip file are :
   * [Content_Types].xml and _rels/.rels
   */
  var resultFiles = [ctXML, relsFile];

  /*
   * The next files that should be in the zip file are :
   *
   * - word/* (ie word/document.xml, word/header1.xml, ...)
   * - xl/* (ie xl/worksheets/sheet1.xml)
   * - ppt/* (ie ppt/slides/slide1.xml)
   */
  var prefixes = ["word/", "xl/", "ppt/"];
  for (var _i2 = 0; _i2 < allFiles.length; _i2++) {
    var _name = allFiles[_i2];
    for (var _i4 = 0; _i4 < prefixes.length; _i4++) {
      var prefix = prefixes[_i4];
      if (_name.indexOf("".concat(prefix)) === 0) {
        resultFiles.push(_name);
      }
    }
  }
  /*
   * Push the rest of files, such as docProps/core.xml and docProps/app.xml
   */
  for (var _i6 = 0; _i6 < allFiles.length; _i6++) {
    var _name2 = allFiles[_i6];
    if (resultFiles.indexOf(_name2) === -1) {
      resultFiles.push(_name2);
    }
  }
  return resultFiles;
}
function deprecatedMessage(obj, message) {
  if (obj.hideDeprecations === true) {
    return;
  }
  // eslint-disable-next-line no-console
  console.warn(message);
}
function deprecatedMethod(obj, method) {
  if (obj.hideDeprecations === true) {
    return;
  }
  return deprecatedMessage(obj, "Deprecated method \".".concat(method, "\", view upgrade guide : https://docxtemplater.com/docs/api/#upgrade-guide, stack : ").concat(new Error().stack));
}
function dropUnsupportedFileTypesModules(doc) {
  doc.modules = doc.modules.filter(function (module) {
    if (!module.supportedFileTypes) {
      return true;
    }
    if (!Array.isArray(module.supportedFileTypes)) {
      throw new Error("The supportedFileTypes field of the module must be an array");
    }
    var isSupportedModule = module.supportedFileTypes.includes(doc.fileType);
    if (!isSupportedModule) {
      module.on("detached");
    }
    return isSupportedModule;
  });
}
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
var Docxtemplater = /*#__PURE__*/function () {
  function Docxtemplater(zip) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$modules = _ref.modules,
      modules = _ref$modules === void 0 ? [] : _ref$modules,
      options = _objectWithoutProperties(_ref, _excluded);
    _classCallCheck(this, Docxtemplater);
    this.targets = [];
    this.rendered = false;
    this.scopeManagers = {};
    this.compiled = {};
    this.modules = [commonModule()];
    this.xmlDocuments = {};
    if (arguments.length === 0) {
      deprecatedMessage(this, "Deprecated docxtemplater constructor with no arguments, view upgrade guide : https://docxtemplater.com/docs/api/#upgrade-guide, stack : ".concat(new Error().stack));
      this.hideDeprecations = true;
      this.setOptions(options);
    } else {
      this.hideDeprecations = true;
      this.setOptions(options);
      if (!zip || !zip.files || typeof zip.file !== "function") {
        throw new Error("The first argument of docxtemplater's constructor must be a valid zip file (jszip v2 or pizzip v3)");
      }
      if (!Array.isArray(modules)) {
        throw new Error("The modules argument of docxtemplater's constructor must be an array");
      }
      for (var _i8 = 0; _i8 < modules.length; _i8++) {
        var _module = modules[_i8];
        this.attachModule(_module);
      }
      this.loadZip(zip);
      this.compile();
      this.v4Constructor = true;
    }
    this.hideDeprecations = false;
  }
  return _createClass(Docxtemplater, [{
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
      for (var _i10 = 0, _this$modules2 = this.modules; _i10 < _this$modules2.length; _i10++) {
        var _module2 = _this$modules2[_i10];
        _module2.set(obj);
      }
    }
  }, {
    key: "sendEvent",
    value: function sendEvent(eventName) {
      for (var _i12 = 0, _this$modules4 = this.modules; _i12 < _this$modules4.length; _i12++) {
        var _module3 = _this$modules4[_i12];
        _module3.on(eventName);
      }
    }
  }, {
    key: "attachModule",
    value: function attachModule(module) {
      if (this.v4Constructor) {
        throw new XTInternalError("attachModule() should not be called manually when using the v4 constructor");
      }
      deprecatedMethod(this, "attachModule");
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
      var _this$delimiters, _this$delimiters2;
      if (this.v4Constructor) {
        throw new Error("setOptions() should not be called manually when using the v4 constructor");
      }
      deprecatedMethod(this, "setOptions");
      if (!options) {
        throw new Error("setOptions should be called with an object as first parameter");
      }
      this.options = {};
      var defaults = getDefaults();
      for (var key in defaults) {
        var defaultValue = defaults[key];
        this.options[key] = options[key] != null ? options[key] : this[key] || defaultValue;
        this[key] = this.options[key];
      }
      (_this$delimiters = this.delimiters).start && (_this$delimiters.start = DocUtils.utf8ToWord(this.delimiters.start));
      (_this$delimiters2 = this.delimiters).end && (_this$delimiters2.end = DocUtils.utf8ToWord(this.delimiters.end));
      return this;
    }
  }, {
    key: "loadZip",
    value: function loadZip(zip) {
      if (this.v4Constructor) {
        throw new Error("loadZip() should not be called manually when using the v4 constructor");
      }
      deprecatedMethod(this, "loadZip");
      if (zip.loadAsync) {
        throw new XTInternalError("Docxtemplater doesn't handle JSZip version >=3, please use pizzip");
      }
      this.zip = zip;
      this.updateFileTypeConfig();
      this.modules = concatArrays([this.fileTypeConfig.baseModules.map(function (moduleFunction) {
        return moduleFunction();
      }), this.modules]);
      for (var _i14 = 0, _this$modules6 = this.modules; _i14 < _this$modules6.length; _i14++) {
        var _module4 = _this$modules6[_i14];
        _module4.zip = this.zip;
        _module4.docxtemplater = this;
      }
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
      var _this$scopeManagers;
      (_this$scopeManagers = this.scopeManagers)[to] || (_this$scopeManagers[to] = createScope({
        tags: tags,
        parser: this.parser,
        cachedParsers: currentFile.cachedParsers
      }));
      return this.scopeManagers[to];
    }
  }, {
    key: "resolveData",
    value: function resolveData(data) {
      var _this = this;
      deprecatedMethod(this, "resolveData");
      var errors = [];
      if (!Object.keys(this.compiled).length) {
        throwResolveBeforeCompile();
      }
      return Promise.resolve(data).then(function (data) {
        _this.data = data;
        _this.setModules({
          data: _this.data,
          Lexer: Lexer
        });
        _this.mapper = _this.modules.reduce(function (value, module) {
          return module.getRenderedMap(value);
        }, {});
        return Promise.all(Object.keys(_this.mapper).map(function (to) {
          var _this$mapper$to = _this.mapper[to],
            from = _this$mapper$to.from,
            data = _this$mapper$to.data;
          return Promise.resolve(data).then(function (data) {
            var currentFile = _this.compiled[from];
            currentFile.filePath = to;
            currentFile.scopeManager = _this.getScopeManager(to, currentFile, data);
            return currentFile.resolveTags(data).then(function (result) {
              currentFile.scopeManager.finishedResolving = true;
              return result;
            }, function (errs) {
              pushArray(errors, errs);
            });
          });
        })).then(function (resolved) {
          if (errors.length !== 0) {
            if (_this.options.errorLogging) {
              logErrors(errors, _this.options.errorLogging);
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
      /**
       * Modules will be sorted according to priority.
       *
       * Input example:
       * [
       *   { priority: 1, name: "FooMod" },
       *   { priority: -1, name: "XMod" },
       *   { priority: 4, name: "OtherMod" }
       * ]
       *
       * Output example (sorted by priority in descending order):
       * [
       *   { priority: 4, name: "OtherMod" },
       *   { priority: 1, name: "FooMod" },
       *   { priority: -1, name: "XMod" }
       * ]
       * Tested in #test-reorder-modules
       */
      this.modules = stableSort(this.modules, function (m1, m2) {
        return (m2.priority || 0) - (m1.priority || 0);
      });
    }
  }, {
    key: "throwIfDuplicateModules",
    value: function throwIfDuplicateModules() {
      var duplicates = getDuplicates(this.modules.map(function (_ref2) {
        var name = _ref2.name;
        return name;
      }));
      if (duplicates.length > 0) {
        throw new XTInternalError("Detected duplicate module \"".concat(duplicates[0], "\""));
      }
    }
  }, {
    key: "compile",
    value: function compile() {
      var _this2 = this;
      deprecatedMethod(this, "compile");
      this.updateFileTypeConfig();
      this.throwIfDuplicateModules();
      this.reorderModules();
      if (Object.keys(this.compiled).length) {
        return this;
      }
      this.options = this.modules.reduce(function (options, module) {
        return module.optionsTransformer(options, _this2);
      }, this.options);
      this.options.xmlFileNames = uniq(this.options.xmlFileNames);
      for (var _i16 = 0, _this$options$xmlFile2 = this.options.xmlFileNames; _i16 < _this$options$xmlFile2.length; _i16++) {
        var fileName = _this$options$xmlFile2[_i16];
        var content = this.zip.files[fileName].asText();
        this.xmlDocuments[fileName] = str2xml(content);
      }
      this.setModules({
        zip: this.zip,
        xmlDocuments: this.xmlDocuments
      });
      this.getTemplatedFiles();
      /*
       * Loop inside all templatedFiles (ie xml files with content).
       * Sometimes they don't exist (footer.xml for example)
       */
      this.sendEvent("before-preparse");
      for (var _i18 = 0, _this$templatedFiles2 = this.templatedFiles; _i18 < _this$templatedFiles2.length; _i18++) {
        var _fileName = _this$templatedFiles2[_i18];
        if (this.zip.files[_fileName] != null) {
          this.precompileFile(_fileName);
        }
      }
      this.sendEvent("after-preparse");
      for (var _i20 = 0, _this$templatedFiles4 = this.templatedFiles; _i20 < _this$templatedFiles4.length; _i20++) {
        var _fileName2 = _this$templatedFiles4[_i20];
        if (this.zip.files[_fileName2] != null) {
          this.compiled[_fileName2].parse({
            noPostParse: true
          });
        }
      }
      this.sendEvent("after-parse");
      for (var _i22 = 0, _this$templatedFiles6 = this.templatedFiles; _i22 < _this$templatedFiles6.length; _i22++) {
        var _fileName3 = _this$templatedFiles6[_i22];
        if (this.zip.files[_fileName3] != null) {
          this.compiled[_fileName3].postparse();
        }
      }
      this.sendEvent("after-postparse");
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
      for (var _i24 = 0; _i24 < rootRelationships.length; _i24++) {
        var relation = rootRelationships[_i24];
        relsTypes[relation.getAttribute("Target")] = relation.getAttribute("Type");
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
      var fileType;
      if (this.zip.files.mimetype) {
        fileType = "odt";
      }
      for (var _i26 = 0, _this$modules8 = this.modules; _i26 < _this$modules8.length; _i26++) {
        var _module5 = _this$modules8[_i26];
        fileType = _module5.getFileType({
          zip: this.zip,
          contentTypes: contentTypes,
          contentTypeXml: contentTypeXml,
          overrides: overrides,
          defaults: defaults,
          doc: this
        }) || fileType;
      }
      if (fileType === "odt") {
        throwFileTypeNotHandled(fileType);
      }
      if (!fileType) {
        throwFileTypeNotIdentified(this.zip);
      }
      for (var _i28 = 0, _this$modules10 = this.modules; _i28 < _this$modules10.length; _i28++) {
        var _module6 = _this$modules10[_i28];
        for (var _i30 = 0, _ref4 = _module6.xmlContentTypes || []; _i30 < _ref4.length; _i30++) {
          var contentType = _ref4[_i30];
          pushArray(this.options.xmlFileNames, this.invertedContentTypes[contentType] || []);
        }
      }
      this.fileType = fileType;
      dropUnsupportedFileTypesModules(this);
      this.fileTypeConfig = this.options.fileTypeConfig || this.fileTypeConfig;
      if (!this.fileTypeConfig) {
        if (Docxtemplater.FileTypeConfig[this.fileType]) {
          this.fileTypeConfig = Docxtemplater.FileTypeConfig[this.fileType]();
        } else {
          /*
           * Error case handled since v3.60.2
           * Throw specific error when trying to template xlsx file without xlsxmodule
           */
          var message = "Filetype \"".concat(this.fileType, "\" is not supported");
          var id = "filetype_not_supported";
          if (this.fileType === "xlsx") {
            message = "Filetype \"".concat(this.fileType, "\" is supported only with the paid XlsxModule");
            id = "xlsx_filetype_needs_xlsx_module";
          }
          var err = new XTTemplateError(message);
          err.properties = {
            id: id,
            explanation: message
          };
          throw err;
        }
      }
      return this;
    }
  }, {
    key: "renderAsync",
    value: function renderAsync(data) {
      var _this3 = this;
      this.hideDeprecations = true;
      var promise = this.resolveData(data);
      this.hideDeprecations = false;
      return promise.then(function () {
        return _this3.render();
      });
    }
  }, {
    key: "render",
    value: function render(data) {
      if (this.rendered) {
        throwRenderTwice();
      }
      this.rendered = true;
      if (Object.keys(this.compiled).length === 0) {
        this.compile();
      }
      if (this.errors.length > 0) {
        throwRenderInvalidTemplate();
      }
      if (arguments.length > 0) {
        this.data = data;
      }
      this.setModules({
        data: this.data,
        Lexer: Lexer
      });
      this.mapper || (this.mapper = this.modules.reduce(function (value, module) {
        return module.getRenderedMap(value);
      }, {}));
      var output = [];
      for (var to in this.mapper) {
        var _this$mapper$to2 = this.mapper[to],
          from = _this$mapper$to2.from,
          _data = _this$mapper$to2.data;
        var currentFile = this.compiled[from];
        currentFile.scopeManager = this.getScopeManager(to, currentFile, _data);
        currentFile.render(to);
        output.push([to, currentFile.content, currentFile]);
        delete currentFile.content;
      }
      for (var _i32 = 0; _i32 < output.length; _i32++) {
        var outputPart = output[_i32];
        var _outputPart = _slicedToArray(outputPart, 3),
          content = _outputPart[1],
          _currentFile = _outputPart[2];
        for (var _i34 = 0, _this$modules12 = this.modules; _i34 < _this$modules12.length; _i34++) {
          var _module7 = _this$modules12[_i34];
          if (_module7.preZip) {
            var result = _module7.preZip(content, _currentFile);
            if (typeof result === "string") {
              outputPart[1] = result;
            }
          }
        }
      }
      for (var _i36 = 0; _i36 < output.length; _i36++) {
        var _output$_i = _slicedToArray(output[_i36], 2),
          _to = _output$_i[0],
          _content = _output$_i[1];
        this.zip.file(_to, _content, {
          createFolders: true
        });
      }
      verifyErrors(this);
      this.sendEvent("syncing-zip");
      this.syncZip();
      // The synced-zip event is used in the subtemplate module for example
      this.sendEvent("synced-zip");
      return this;
    }
  }, {
    key: "syncZip",
    value: function syncZip() {
      for (var fileName in this.xmlDocuments) {
        this.zip.remove(fileName);
        var content = xml2str(this.xmlDocuments[fileName]);
        this.zip.file(fileName, content, {
          createFolders: true
        });
      }
    }
  }, {
    key: "setData",
    value: function setData(data) {
      deprecatedMethod(this, "setData");
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
      var xmltOptions = {
        filePath: filePath,
        contentType: this.filesContentTypes[filePath],
        relsType: this.relsTypes[filePath]
      };
      var defaults = getDefaults();
      var defaultKeys = pushArray(Object.keys(defaults), ["filesContentTypes", "fileTypeConfig", "fileType", "modules"]);
      for (var _i38 = 0; _i38 < defaultKeys.length; _i38++) {
        var key = defaultKeys[_i38];
        xmltOptions[key] = this[key];
      }
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
      this.templatedFiles = this.fileTypeConfig.getTemplatedFiles(this.zip);
      pushArray(this.templatedFiles, this.targets);
      this.templatedFiles = uniq(this.templatedFiles);
      return this.templatedFiles;
    }
  }, {
    key: "getTags",
    value: function getTags() {
      var result = {
        headers: [],
        footers: []
      };
      for (var key in this.compiled) {
        var contentType = this.filesContentTypes[key];
        if (contentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml") {
          result.document = {
            target: key,
            tags: _getTags(this.compiled[key].postparsed)
          };
        }
        if (contentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml") {
          result.headers.push({
            target: key,
            tags: _getTags(this.compiled[key].postparsed)
          });
        }
        if (contentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml") {
          result.footers.push({
            target: key,
            tags: _getTags(this.compiled[key].postparsed)
          });
        }
      }
      return result;
    }

    /* Export functions, present since 3.62.0 */
  }, {
    key: "toBuffer",
    value: function toBuffer(options) {
      return this.getZip().generate(_objectSpread(_objectSpread({
        compression: "DEFLATE",
        fileOrder: zipFileOrder
      }, options), {}, {
        type: "nodebuffer"
      }));
    }
  }, {
    key: "toBlob",
    value: function toBlob(options) {
      return this.getZip().generate(_objectSpread(_objectSpread({
        compression: "DEFLATE",
        fileOrder: zipFileOrder
      }, options), {}, {
        type: "blob"
      }));
    }
  }, {
    key: "toBase64",
    value: function toBase64(options) {
      return this.getZip().generate(_objectSpread(_objectSpread({
        compression: "DEFLATE",
        fileOrder: zipFileOrder
      }, options), {}, {
        type: "base64"
      }));
    }
  }, {
    key: "toUint8Array",
    value: function toUint8Array(options) {
      return this.getZip().generate(_objectSpread(_objectSpread({
        compression: "DEFLATE",
        fileOrder: zipFileOrder
      }, options), {}, {
        type: "uint8array"
      }));
    }
  }, {
    key: "toArrayBuffer",
    value: function toArrayBuffer(options) {
      return this.getZip().generate(_objectSpread(_objectSpread({
        compression: "DEFLATE",
        fileOrder: zipFileOrder
      }, options), {}, {
        type: "arraybuffer"
      }));
    }
  }]);
}();
Docxtemplater.DocUtils = DocUtils;
Docxtemplater.Errors = __webpack_require__(946);
Docxtemplater.XmlTemplater = __webpack_require__(245);
Docxtemplater.FileTypeConfig = __webpack_require__(271);
Docxtemplater.XmlMatcher = __webpack_require__(367);
module.exports = Docxtemplater;
module.exports["default"] = Docxtemplater;

/***/ }),

/***/ 830:
/***/ (function(module) {

function getResolvedId(part, options) {
  if (part.lIndex == null) {
    return null;
  }
  var path = options.scopeManager.scopePathItem;
  if (part.parentPart) {
    path = path.slice(0, path.length - 1);
  }
  var res = options.filePath + "@" + part.lIndex.toString() + "-" + path.join("-");
  return res;
}
module.exports = getResolvedId;

/***/ }),

/***/ 885:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = __webpack_require__(207),
  chunkBy = _require.chunkBy,
  last = _require.last,
  isParagraphStart = _require.isParagraphStart,
  isModule = _require.isModule,
  pushArray = _require.pushArray,
  isParagraphEnd = _require.isParagraphEnd,
  isContent = _require.isContent,
  startsWith = _require.startsWith,
  isTagEnd = _require.isTagEnd,
  isTagStart = _require.isTagStart,
  getSingleAttribute = _require.getSingleAttribute,
  setSingleAttribute = _require.setSingleAttribute;
var filetypes = __webpack_require__(322);
var wrapper = __webpack_require__(899);
var moduleName = "loop";
function hasContent(parts) {
  return parts.some(function (part) {
    return isContent(part);
  });
}
function getFirstMeaningFulPart(parsed) {
  for (var _i2 = 0; _i2 < parsed.length; _i2++) {
    var part = parsed[_i2];
    if (part.type !== "content") {
      return part;
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
  return pushArray(["<w:p><w:pPr>".concat(sect.map(function (_ref) {
    var value = _ref.value;
    return value;
  }).join(""), "</w:pPr></w:p>")], parts);
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
  for (var _i4 = 0; _i4 < chunks.length; _i4++) {
    var part = chunks[_i4];
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
  }
  return sectPrs;
}
function getSectPrHeaderFooterChangeCount(chunks) {
  var collectSectPr = false;
  var sectPrCount = 0;
  for (var _i6 = 0; _i6 < chunks.length; _i6++) {
    var part = chunks[_i6];
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
  }
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
  return _createClass(LoopModule, [{
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
        promises.push(options.resolve(_objectSpread(_objectSpread({}, options), {}, {
          compiled: part.subparsed,
          tags: {},
          scopeManager: scopeManager
        })));
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
              pushArray(errorList, errors);
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
      function loopOver(scope, i, length) {
        heightOffset += tagHeight;
        var scopeManager = options.scopeManager.createSubScopeManager(scope, part.value, i, part, length);
        for (var _i8 = 0, _part$subparsed2 = part.subparsed; _i8 < _part$subparsed2.length; _i8++) {
          var pp = _part$subparsed2[_i8];
          if (isTagStart("a16:rowId", pp)) {
            var val = +getSingleAttribute(pp.value, "val") + a16RowIdOffset;
            a16RowIdOffset = 1;
            pp.value = setSingleAttribute(pp.value, "val", val);
          }
        }
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
        for (var _i10 = 0, _subRendered$parts2 = subRendered.parts; _i10 < _subRendered$parts2.length; _i10++) {
          var _val = _subRendered$parts2[_i10];
          totalValue.push(_val);
        }
        pushArray(errors, subRendered.errors);
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
        /*
         * We do edit the value of a previous result here
         * #edit-value-backwards
         */
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
}();
module.exports = function () {
  return wrapper(new LoopModule());
};

/***/ }),

/***/ 891:
/***/ (function(module) {

var ctXML = "[Content_Types].xml";
function collectContentTypes(overrides, defaults, zip) {
  var partNames = {};
  for (var _i2 = 0; _i2 < overrides.length; _i2++) {
    var override = overrides[_i2];
    var contentType = override.getAttribute("ContentType");
    var partName = override.getAttribute("PartName").substr(1);
    partNames[partName] = contentType;
  }
  var _loop = function _loop() {
    var def = defaults[_i4];
    var contentType = def.getAttribute("ContentType");
    var extension = def.getAttribute("Extension");
    zip.file(/./).map(function (_ref) {
      var name = _ref.name;
      if (name.slice(name.length - extension.length) === extension && !partNames[name] && name !== ctXML) {
        partNames[name] = contentType;
      }
    });
  };
  for (var _i4 = 0; _i4 < defaults.length; _i4++) {
    _loop();
  }
  return partNames;
}
module.exports = collectContentTypes;

/***/ }),

/***/ 899:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(946),
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
    resolve: emptyFun,
    preResolve: emptyFun
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
  for (var key in defaults) {
    module[key] || (module[key] = defaults[key]);
  }
  return module;
};

/***/ }),

/***/ 903:
/***/ (function(module) {

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function isPlaceholder(part) {
  return part.type === "placeholder";
}

/* eslint-disable-next-line complexity */
function getTags(postParsed) {
  var tags = {};
  var stack = [{
    items: postParsed.filter(isPlaceholder),
    parents: [],
    path: []
  }];
  function processFiltered(part, current, filtered) {
    if (filtered.length) {
      stack.push({
        items: filtered,
        parents: [].concat(_toConsumableArray(current.parents), [part]),
        path: part.dataBound !== false && !part.attrParsed && part.value && !part.attrParsed ? [].concat(_toConsumableArray(current.path), [part.value]) : _toConsumableArray(current.path)
      });
    }
  }
  function getLocalTags(tags, path) {
    var sizeScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : path.length;
    var localTags = tags;
    for (var i = 0; i < sizeScope; i++) {
      localTags = localTags[path[i]];
    }
    return localTags;
  }
  function getScopeSize(part, parents) {
    return parents.reduce(function (size, parent) {
      var lIndexLoop = typeof parent.lIndex === "number" ? parent.lIndex : parseInt(parent.lIndex.split("-")[0], 10);
      return lIndexLoop > part.lIndex ? size - 1 : size;
    }, parents.length);
  }
  while (stack.length > 0) {
    var current = stack.pop();
    var localTags = getLocalTags(tags, current.path);
    for (var _i2 = 0, _current$items2 = current.items; _i2 < _current$items2.length; _i2++) {
      var _localTags4, _part$value2;
      var part = _current$items2[_i2];
      if (part.attrParsed) {
        for (var key in part.attrParsed) {
          processFiltered(part, current, part.attrParsed[key].filter(isPlaceholder));
        }
        continue;
      }
      if (part.subparsed) {
        if (part.dataBound !== false) {
          var _localTags, _part$value;
          (_localTags = localTags)[_part$value = part.value] || (_localTags[_part$value] = {});
        }
        processFiltered(part, current, part.subparsed.filter(isPlaceholder));
        continue;
      }
      if (part.cellParsed) {
        for (var _i4 = 0, _part$cellPostParsed2 = part.cellPostParsed; _i4 < _part$cellPostParsed2.length; _i4++) {
          var cp = _part$cellPostParsed2[_i4];
          if (cp.type === "placeholder") {
            if (cp.module === "pro-xml-templating/xls-module-loop") {
              continue;
            } else if (cp.subparsed) {
              var _localTags2, _cp$value;
              (_localTags2 = localTags)[_cp$value = cp.value] || (_localTags2[_cp$value] = {});
              processFiltered(cp, current, cp.subparsed.filter(isPlaceholder));
            } else {
              var _localTags3, _cp$value2;
              var sizeScope = getScopeSize(part, current.parents);
              localTags = getLocalTags(tags, current.path, sizeScope);
              (_localTags3 = localTags)[_cp$value2 = cp.value] || (_localTags3[_cp$value2] = {});
            }
          }
        }
        continue;
      }
      if (part.dataBound === false) {
        continue;
      }
      (_localTags4 = localTags)[_part$value2 = part.value] || (_localTags4[_part$value2] = {});
    }
  }
  return tags;
}
module.exports = {
  getTags: getTags,
  isPlaceholder: isPlaceholder
};

/***/ }),

/***/ 945:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = __webpack_require__(207),
  pushArray = _require.pushArray;
var getResolvedId = __webpack_require__(830);
function moduleResolve(part, options) {
  for (var _i2 = 0, _options$modules2 = options.modules; _i2 < _options$modules2.length; _i2++) {
    var _module = _options$modules2[_i2];
    var moduleResolved = _module.resolve(part, options);
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
    var moduleResolved = moduleResolve(part, _objectSpread(_objectSpread({}, options), {}, {
      resolvedId: getResolvedId(part, options)
    }));
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
        pushArray(errors, e);
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

/***/ 946:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = __webpack_require__(320),
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
    offset = part.offset,
    square = part.square;
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
  if (square) {
    err.properties.square = square;
  }
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
function throwFileTypeNotIdentified(zip) {
  var files = Object.keys(zip.files).slice(0, 10);
  var msg = "";
  if (files.length === 0) {
    msg = "Empty zip file";
  } else {
    msg = "Zip file contains : ".concat(files.join(","));
  }
  var err = new XTInternalError("The filetype for this file could not be identified, is this file corrupted ? ".concat(msg));
  err.properties = {
    id: "filetype_not_identified",
    explanation: "The filetype for this file could not be identified, is this file corrupted ? ".concat(msg)
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
/******/ 	var __webpack_exports__ = __webpack_require__(807);
/******/ 	window.docxtemplater = __webpack_exports__;
/******/ 	
/******/ })()
;