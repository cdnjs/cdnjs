/*!
 * DevExtreme-Quill Editor v.1.6.2
 * https://js.devexpress.com/
 * Copyright (c) 2020, Developer Express Inc.
 * Copyright (c) 2017, Slab
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DevExpress"] = factory();
	else
		root["DevExpress"] = root["DevExpress"] || {}, root["DevExpress"]["Quill"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1674:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ OverriddenAttributor)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3866);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3398);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var OverriddenAttributor = /*#__PURE__*/function (_Attributor) {
  _inherits(OverriddenAttributor, _Attributor);
  var _super = _createSuper(OverriddenAttributor);
  function OverriddenAttributor(attrName, keyName) {
    var _options$allowedTags;
    var _this;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      allowedTags: []
    };
    _classCallCheck(this, OverriddenAttributor);
    _this = _super.call(this, attrName, keyName, options);
    _this.allowedTags = (_options$allowedTags = options.allowedTags) !== null && _options$allowedTags !== void 0 ? _options$allowedTags : [];
    return _this;
  }
  _createClass(OverriddenAttributor, [{
    key: "add",
    value: function add(node, value) {
      return _decorators__WEBPACK_IMPORTED_MODULE_1__/* .decorateMethodWithKeyName.call */ .Mx.call(this, _get(_getPrototypeOf(OverriddenAttributor.prototype), "add", this), node, value);
    }
  }, {
    key: "remove",
    value: function remove(node) {
      return _decorators__WEBPACK_IMPORTED_MODULE_1__/* .decorateMethodWithKeyName.call */ .Mx.call(this, _get(_getPrototypeOf(OverriddenAttributor.prototype), "remove", this), node);
    }
  }, {
    key: "value",
    value: function value(node) {
      return _decorators__WEBPACK_IMPORTED_MODULE_1__/* .decorateMethodWithKeyName.call */ .Mx.call(this, _get(_getPrototypeOf(OverriddenAttributor.prototype), "value", this), node);
    }
  }, {
    key: "canAdd",
    value: function canAdd(node, value) {
      return _decorators__WEBPACK_IMPORTED_MODULE_1__/* .decorateCanAdd.call */ .ud.call(this, _get(_getPrototypeOf(OverriddenAttributor.prototype), "canAdd", this), node, value);
    }
  }], [{
    key: "keys",
    value: function keys(node) {
      return (0,_decorators__WEBPACK_IMPORTED_MODULE_1__/* .decorateKeys */ .dj)(_get(_getPrototypeOf(OverriddenAttributor), "keys", this), node, _utils__WEBPACK_IMPORTED_MODULE_2__/* .KeyNameType.attribute */ .WT.attribute);
    }
  }]);
  return OverriddenAttributor;
}(parchment__WEBPACK_IMPORTED_MODULE_0__.Attributor);


/***/ }),

/***/ 3866:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mx": () => (/* binding */ decorateMethodWithKeyName),
/* harmony export */   "dj": () => (/* binding */ decorateKeys),
/* harmony export */   "ud": () => (/* binding */ decorateCanAdd)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3398);

function decorateMethodWithKeyName(method) {
  var originalKeyName = this.keyName;
  this.keyName = (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .removeCustomPrefixFromKeyName */ .mQ)(this.keyName);
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var result = method.call.apply(method, [this].concat(args));
  this.keyName = originalKeyName;
  return result;
}
function decorateCanAdd(originCanAdd, node, value) {
  var isNodeAllowed = this.allowedTags.indexOf(node.tagName) > -1;
  return isNodeAllowed && originCanAdd.call(this, node, value);
}
function decorateKeys(originKeys, node, keyType) {
  return originKeys(node).map(function (keyName) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .getKeyNameWithCustomPrefix */ .jf)(node.tagName, keyName, keyType);
  });
}

/***/ }),

/***/ 4569:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ OverriddenStyleAttributor)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3866);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3398);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var OverriddenStyleAttributor = /*#__PURE__*/function (_StyleAttributor) {
  _inherits(OverriddenStyleAttributor, _StyleAttributor);
  var _super = _createSuper(OverriddenStyleAttributor);
  function OverriddenStyleAttributor(attrName, keyName) {
    var _options$allowedTags;
    var _this;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      allowedTags: []
    };
    _classCallCheck(this, OverriddenStyleAttributor);
    _this = _super.call(this, attrName, keyName, options);
    _this.allowedTags = (_options$allowedTags = options.allowedTags) !== null && _options$allowedTags !== void 0 ? _options$allowedTags : [];
    return _this;
  }
  _createClass(OverriddenStyleAttributor, [{
    key: "add",
    value: function add(node, value) {
      return _decorators__WEBPACK_IMPORTED_MODULE_1__/* .decorateMethodWithKeyName.call */ .Mx.call(this, _get(_getPrototypeOf(OverriddenStyleAttributor.prototype), "add", this), node, value);
    }
  }, {
    key: "remove",
    value: function remove(node) {
      return _decorators__WEBPACK_IMPORTED_MODULE_1__/* .decorateMethodWithKeyName.call */ .Mx.call(this, _get(_getPrototypeOf(OverriddenStyleAttributor.prototype), "remove", this), node);
    }
  }, {
    key: "value",
    value: function value(node) {
      return _decorators__WEBPACK_IMPORTED_MODULE_1__/* .decorateMethodWithKeyName.call */ .Mx.call(this, _get(_getPrototypeOf(OverriddenStyleAttributor.prototype), "value", this), node);
    }
  }, {
    key: "canAdd",
    value: function canAdd(node, value) {
      return _decorators__WEBPACK_IMPORTED_MODULE_1__/* .decorateCanAdd.call */ .ud.call(this, _get(_getPrototypeOf(OverriddenStyleAttributor.prototype), "canAdd", this), node, value);
    }
  }], [{
    key: "keys",
    value: function keys(node) {
      return (0,_decorators__WEBPACK_IMPORTED_MODULE_1__/* .decorateKeys */ .dj)(_get(_getPrototypeOf(OverriddenStyleAttributor), "keys", this), node, _utils__WEBPACK_IMPORTED_MODULE_2__/* .KeyNameType.style */ .WT.style);
    }
  }]);
  return OverriddenStyleAttributor;
}(parchment__WEBPACK_IMPORTED_MODULE_0__.StyleAttributor);


/***/ }),

/***/ 3398:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WT": () => (/* binding */ KeyNameType),
/* harmony export */   "jf": () => (/* binding */ getKeyNameWithCustomPrefix),
/* harmony export */   "mQ": () => (/* binding */ removeCustomPrefixFromKeyName)
/* harmony export */ });
/* harmony import */ var _formats_table_attributors_table_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _formats_table_attributors_cell_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8252);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var KeyNameType = {
  attribute: 'attr',
  style: 'style'
};
var OVERRIDDEN_ATTRIBUTORS_TAG_INFO = _objectSpread(_objectSpread({}, _formats_table_attributors_table_config__WEBPACK_IMPORTED_MODULE_0__/* .tableConfig.allowedTags.reduce */ .Sp.allowedTags.reduce(function (result, tag) {
  result[tag] = {
    name: _formats_table_attributors_table_config__WEBPACK_IMPORTED_MODULE_0__/* .tableConfig.name */ .Sp.name,
    keyNamesSet: _formats_table_attributors_table_config__WEBPACK_IMPORTED_MODULE_0__/* .TABLE_KEY_NAME_SET */ .bc
  };
  return result;
}, {})), _formats_table_attributors_cell_config__WEBPACK_IMPORTED_MODULE_1__/* .cellConfig.allowedTags.reduce */ .Pw.allowedTags.reduce(function (result, tag) {
  result[tag] = {
    name: _formats_table_attributors_cell_config__WEBPACK_IMPORTED_MODULE_1__/* .cellConfig.name */ .Pw.name,
    keyNamesSet: _formats_table_attributors_cell_config__WEBPACK_IMPORTED_MODULE_1__/* .TABLE_CELL_KEY_NAME_SET */ .fU
  };
  return result;
}, {}));
function getKeyNameWithCustomPrefix(tagName, keyName, keyType) {
  var tagInfo = OVERRIDDEN_ATTRIBUTORS_TAG_INFO[tagName];
  if (!tagInfo) {
    return keyName;
  }
  return tagInfo.keyNamesSet.has(keyName) ? "".concat(keyType).concat(tagInfo.name, "_").concat(keyName) : keyName;
}
function removeCustomPrefixFromKeyName(keyNameWithPrefix) {
  return keyNameWithPrefix.replace(/([^]*_)/, '');
}

/***/ }),

/***/ 6446:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "i2": () => (/* binding */ BlockEmbed),
  "qz": () => (/* binding */ blockDelta),
  "E2": () => (/* binding */ bubbleFormats),
  "ZP": () => (/* binding */ Block)
});

// EXTERNAL MODULE: ./node_modules/quill-delta/dist/Delta.js
var Delta = __webpack_require__(9098);
var Delta_default = /*#__PURE__*/__webpack_require__.n(Delta);
// EXTERNAL MODULE: ./node_modules/parchment/src/parchment.ts + 17 modules
var parchment = __webpack_require__(1233);
// EXTERNAL MODULE: ./blots/break.js
var blots_break = __webpack_require__(6192);
// EXTERNAL MODULE: ./blots/inline.js
var inline = __webpack_require__(6603);
// EXTERNAL MODULE: ./blots/text.js
var blots_text = __webpack_require__(8222);
// EXTERNAL MODULE: ./attributors/utils.js
var utils = __webpack_require__(3398);
;// CONCATENATED MODULE: ./parchment/override.js



function fillAttributes(tagName, blot, keyNames, keyType) {
  return keyNames.map((keyName) => {
    const normalizedKeyName = keyType
      ? (0,utils/* getKeyNameWithCustomPrefix */.jf)(tagName, keyName, keyType)
      : keyName;
    return blot.scroll.query(normalizedKeyName, parchment.Scope.ATTRIBUTE);
  }).filter((attributor) => attributor instanceof parchment.Attributor)
    .reduce((result, attributor) => {
      result[attributor.attrName] = attributor;
      return result;
    }, {});
}

function overrideParchment() {
  // eslint-disable-next-line no-undef, func-names
  parchment.AttributorStore.prototype.build = function () {
    const { tagName } = this.domNode;
    const blot = parchment.Registry.find(this.domNode);
    if (blot == null) {
      return;
    }

    const attributes = parchment.Attributor.keys(this.domNode);
    const classes = parchment.ClassAttributor.keys(this.domNode);
    const styles = parchment.StyleAttributor.keys(this.domNode);

    this.attributes = {
      ...fillAttributes(tagName, blot, attributes, utils/* KeyNameType.attribute */.WT.attribute),
      ...fillAttributes(tagName, blot, classes),
      ...fillAttributes(tagName, blot, styles, utils/* KeyNameType.style */.WT.style),
    };
  };
}

;// CONCATENATED MODULE: ./blots/block.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






overrideParchment();
var NEWLINE_LENGTH = 1;
var Block = /*#__PURE__*/function (_BlockBlot) {
  _inherits(Block, _BlockBlot);
  var _super = _createSuper(Block);
  function Block(scroll, domNode) {
    var _this;
    _classCallCheck(this, Block);
    _this = _super.call(this, scroll, domNode);
    _this.cache = {};
    return _this;
  }
  _createClass(Block, [{
    key: "delta",
    value: function delta() {
      if (this.cache.delta == null) {
        this.cache.delta = blockDelta(this);
      }
      return this.cache.delta;
    }
  }, {
    key: "deleteAt",
    value: function deleteAt(index, length) {
      _get(_getPrototypeOf(Block.prototype), "deleteAt", this).call(this, index, length);
      this.cache = {};
    }
  }, {
    key: "formatAt",
    value: function formatAt(index, length, name, value) {
      if (length <= 0) return;
      if (this.scroll.query(name, parchment.Scope.BLOCK)) {
        if (index + length === this.length()) {
          this.format(name, value);
        }
      } else {
        _get(_getPrototypeOf(Block.prototype), "formatAt", this).call(this, index, Math.min(length, this.length() - index - 1), name, value);
      }
      this.cache = {};
    }
  }, {
    key: "insertAt",
    value: function insertAt(index, value, def) {
      if (def != null) {
        _get(_getPrototypeOf(Block.prototype), "insertAt", this).call(this, index, value, def);
        this.cache = {};
        return;
      }
      if (value.length === 0) return;
      var lines = value.split('\n');
      var text = lines.shift();
      if (text.length > 0) {
        if (index < this.length() - 1 || this.children.tail == null) {
          _get(_getPrototypeOf(Block.prototype), "insertAt", this).call(this, Math.min(index, this.length() - 1), text);
        } else {
          this.children.tail.insertAt(this.children.tail.length(), text);
        }
        this.cache = {};
      }
      var block = this;
      lines.reduce(function (lineIndex, line) {
        block = block.split(lineIndex, true);
        block.insertAt(0, line);
        return line.length;
      }, index + text.length);
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(blot, ref) {
      var head = this.children.head;
      _get(_getPrototypeOf(Block.prototype), "insertBefore", this).call(this, blot, ref);
      if (head instanceof blots_break/* default */.Z) {
        head.remove();
      }
      this.cache = {};
    }
  }, {
    key: "length",
    value: function length() {
      if (this.cache.length == null) {
        this.cache.length = _get(_getPrototypeOf(Block.prototype), "length", this).call(this) + NEWLINE_LENGTH;
      }
      return this.cache.length;
    }
  }, {
    key: "moveChildren",
    value: function moveChildren(target, ref) {
      _get(_getPrototypeOf(Block.prototype), "moveChildren", this).call(this, target, ref);
      this.cache = {};
    }
  }, {
    key: "optimize",
    value: function optimize(context) {
      _get(_getPrototypeOf(Block.prototype), "optimize", this).call(this, context);
      this.cache = {};
    }
  }, {
    key: "path",
    value: function path(index) {
      return _get(_getPrototypeOf(Block.prototype), "path", this).call(this, index, true);
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      _get(_getPrototypeOf(Block.prototype), "removeChild", this).call(this, child);
      this.cache = {};
    }
  }, {
    key: "split",
    value: function split(index) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (force && (index === 0 || index >= this.length() - NEWLINE_LENGTH)) {
        var clone = this.clone();
        if (index === 0) {
          this.parent.insertBefore(clone, this);
          return this;
        }
        this.parent.insertBefore(clone, this.next);
        return clone;
      }
      var next = _get(_getPrototypeOf(Block.prototype), "split", this).call(this, index, force);
      this.cache = {};
      return next;
    }
  }]);
  return Block;
}(parchment.BlockBlot);
Block.blotName = 'block';
Block.tagName = 'P';
Block.defaultChild = blots_break/* default */.Z;
Block.allowedChildren = [blots_break/* default */.Z, inline/* default */.Z, parchment.EmbedBlot, blots_text/* default */.Z];
var BlockEmbed = /*#__PURE__*/function (_EmbedBlot) {
  _inherits(BlockEmbed, _EmbedBlot);
  var _super2 = _createSuper(BlockEmbed);
  function BlockEmbed() {
    _classCallCheck(this, BlockEmbed);
    return _super2.apply(this, arguments);
  }
  _createClass(BlockEmbed, [{
    key: "attach",
    value: function attach() {
      _get(_getPrototypeOf(BlockEmbed.prototype), "attach", this).call(this);
      this.attributes = new parchment.AttributorStore(this.domNode);
    }
  }, {
    key: "delta",
    value: function delta() {
      return new (Delta_default())().insert(this.value(), _objectSpread(_objectSpread({}, this.formats()), this.attributes.values()));
    }
  }, {
    key: "format",
    value: function format(name, value) {
      var attribute = this.scroll.query(name, parchment.Scope.BLOCK_ATTRIBUTE);
      if (attribute != null) {
        this.attributes.attribute(attribute, value);
      }
    }
  }, {
    key: "formatAt",
    value: function formatAt(index, length, name, value) {
      this.format(name, value);
    }
  }, {
    key: "insertAt",
    value: function insertAt(index, value, def) {
      if (typeof value === 'string' && value.endsWith('\n')) {
        var block = this.scroll.create(Block.blotName);
        this.parent.insertBefore(block, index === 0 ? this : this.next);
        block.insertAt(0, value.slice(0, -1));
      } else {
        _get(_getPrototypeOf(BlockEmbed.prototype), "insertAt", this).call(this, index, value, def);
      }
    }
  }]);
  return BlockEmbed;
}(parchment.EmbedBlot);
BlockEmbed.scope = parchment.Scope.BLOCK_BLOT;
// It is important for cursor behavior BlockEmbeds use tags that are block level elements

function blockDelta(blot) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return blot.descendants(parchment.LeafBlot).reduce(function (delta, leaf) {
    if (leaf.length() === 0) {
      return delta;
    }
    return delta.insert(leaf.value(), bubbleFormats(leaf, {}, filter));
  }, new (Delta_default())()).insert('\n', bubbleFormats(blot));
}
function bubbleFormats(blot) {
  var formats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (blot == null) return formats;
  if (typeof blot.formats === 'function') {
    formats = _objectSpread(_objectSpread({}, formats), blot.formats());
    if (filter) {
      // exclude syntax highlighting from deltas and getFormat()
      delete formats['code-token'];
    }
  }
  if (blot.parent == null || blot.parent.statics.blotName === 'scroll' || blot.parent.statics.scope !== blot.statics.scope) {
    return formats;
  }
  return bubbleFormats(blot.parent, formats, filter);
}


/***/ }),

/***/ 6192:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Break = /*#__PURE__*/function (_EmbedBlot) {
  _inherits(Break, _EmbedBlot);
  var _super = _createSuper(Break);
  function Break() {
    _classCallCheck(this, Break);
    return _super.apply(this, arguments);
  }
  _createClass(Break, [{
    key: "optimize",
    value: function optimize() {
      if (this.prev || this.next) {
        this.remove();
      }
    }
  }, {
    key: "length",
    value: function length() {
      return 0;
    }
  }, {
    key: "value",
    value: function value() {
      return '';
    }
  }], [{
    key: "value",
    value: function value() {
      return undefined;
    }
  }]);
  return Break;
}(parchment__WEBPACK_IMPORTED_MODULE_0__.EmbedBlot);
Break.blotName = 'break';
Break.tagName = 'BR';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Break);

/***/ }),

/***/ 3553:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Container = /*#__PURE__*/function (_ContainerBlot) {
  _inherits(Container, _ContainerBlot);
  var _super = _createSuper(Container);
  function Container() {
    _classCallCheck(this, Container);
    return _super.apply(this, arguments);
  }
  return _createClass(Container);
}(parchment__WEBPACK_IMPORTED_MODULE_0__.ContainerBlot);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Container);

/***/ }),

/***/ 3657:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8222);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var Cursor = /*#__PURE__*/function (_EmbedBlot) {
  _inherits(Cursor, _EmbedBlot);
  var _super = _createSuper(Cursor);
  function Cursor(scroll, domNode, selection) {
    var _this;
    _classCallCheck(this, Cursor);
    _this = _super.call(this, scroll, domNode);
    _this.selection = selection;
    _this.textNode = document.createTextNode(Cursor.CONTENTS);
    _this.domNode.appendChild(_this.textNode);
    _this.savedLength = 0;
    return _this;
  }
  _createClass(Cursor, [{
    key: "detach",
    value: function detach() {
      // super.detach() will also clear domNode.__blot
      if (this.parent != null) this.parent.removeChild(this);
    }
  }, {
    key: "format",
    value: function format(name, value) {
      if (this.savedLength !== 0) {
        _get(_getPrototypeOf(Cursor.prototype), "format", this).call(this, name, value);
        return;
      }
      var target = this;
      var index = 0;
      while (target != null && target.statics.scope !== parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.BLOCK_BLOT) {
        index += target.offset(target.parent);
        target = target.parent;
      }
      if (target != null) {
        this.savedLength = Cursor.CONTENTS.length;
        target.optimize();
        target.formatAt(index, Cursor.CONTENTS.length, name, value);
        this.savedLength = 0;
      }
    }
  }, {
    key: "index",
    value: function index(node, offset) {
      if (node === this.textNode) return 0;
      return _get(_getPrototypeOf(Cursor.prototype), "index", this).call(this, node, offset);
    }
  }, {
    key: "length",
    value: function length() {
      return this.savedLength;
    }
  }, {
    key: "position",
    value: function position() {
      return [this.textNode, this.textNode.data.length];
    }
  }, {
    key: "remove",
    value: function remove() {
      _get(_getPrototypeOf(Cursor.prototype), "remove", this).call(this);
      this.parent = null;
    }
  }, {
    key: "restore",
    value: function restore() {
      if (this.selection.composing || this.parent == null) return null;
      var range = this.selection.getNativeRange();
      // Link format will insert text outside of anchor tag
      while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {
        this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
      }
      var prevTextBlot = this.prev instanceof _text__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z ? this.prev : null;
      var prevTextLength = prevTextBlot ? prevTextBlot.length() : 0;
      var nextTextBlot = this.next instanceof _text__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z ? this.next : null;
      var nextText = nextTextBlot ? nextTextBlot.text : '';
      var textNode = this.textNode;
      // take text from inside this blot and reset it
      var newText = textNode.data.split(Cursor.CONTENTS).join('');
      textNode.data = Cursor.CONTENTS;

      // proactively merge TextBlots around cursor so that optimization
      // doesn't lose the cursor.  the reason we are here in cursor.restore
      // could be that the user clicked in prevTextBlot or nextTextBlot, or
      // the user typed something.
      var mergedTextBlot;
      if (prevTextBlot) {
        mergedTextBlot = prevTextBlot;
        if (newText || nextTextBlot) {
          prevTextBlot.insertAt(prevTextBlot.length(), newText + nextText);
          if (nextTextBlot) {
            nextTextBlot.remove();
          }
        }
      } else if (nextTextBlot) {
        mergedTextBlot = nextTextBlot;
        nextTextBlot.insertAt(0, newText);
      } else {
        var newTextNode = document.createTextNode(newText);
        mergedTextBlot = this.scroll.create(newTextNode);
        this.parent.insertBefore(mergedTextBlot, this);
      }
      this.remove();
      if (range) {
        // calculate selection to restore
        var remapOffset = function remapOffset(node, offset) {
          if (prevTextBlot && node === prevTextBlot.domNode) {
            return offset;
          }
          if (node === textNode) {
            return prevTextLength + offset - 1;
          }
          if (nextTextBlot && node === nextTextBlot.domNode) {
            return prevTextLength + newText.length + offset;
          }
          return null;
        };
        var start = remapOffset(range.start.node, range.start.offset);
        var end = remapOffset(range.end.node, range.end.offset);
        if (start !== null && end !== null) {
          return {
            startNode: mergedTextBlot.domNode,
            startOffset: start,
            endNode: mergedTextBlot.domNode,
            endOffset: end
          };
        }
      }
      return null;
    }
  }, {
    key: "update",
    value: function update(mutations, context) {
      var _this2 = this;
      if (mutations.some(function (mutation) {
        return mutation.type === 'characterData' && mutation.target === _this2.textNode;
      })) {
        var range = this.restore();
        if (range) context.range = range;
      }
    }
  }, {
    key: "value",
    value: function value() {
      return '';
    }
  }], [{
    key: "value",
    value: function value() {
      return undefined;
    }
  }]);
  return Cursor;
}(parchment__WEBPACK_IMPORTED_MODULE_0__.EmbedBlot);
Cursor.blotName = 'cursor';
Cursor.className = 'ql-cursor';
Cursor.tagName = 'span';
Cursor.CONTENTS = "\uFEFF"; // Zero width no break space

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cursor);

/***/ }),

/***/ 7452:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8222);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var GUARD_TEXT = "\uFEFF";
var Embed = /*#__PURE__*/function (_EmbedBlot) {
  _inherits(Embed, _EmbedBlot);
  var _super = _createSuper(Embed);
  function Embed(scroll, node) {
    var _this;
    _classCallCheck(this, Embed);
    _this = _super.call(this, scroll, node);
    _this.contentNode = document.createElement('span');
    _this.contentNode.setAttribute('contenteditable', false);
    Array.from(_this.domNode.childNodes).forEach(function (childNode) {
      _this.contentNode.appendChild(childNode);
    });
    _this.leftGuard = document.createTextNode(GUARD_TEXT);
    _this.rightGuard = document.createTextNode(GUARD_TEXT);
    _this.domNode.appendChild(_this.leftGuard);
    _this.domNode.appendChild(_this.contentNode);
    _this.domNode.appendChild(_this.rightGuard);
    return _this;
  }
  _createClass(Embed, [{
    key: "index",
    value: function index(node, offset) {
      if (node === this.leftGuard) return 0;
      if (node === this.rightGuard) return 1;
      return _get(_getPrototypeOf(Embed.prototype), "index", this).call(this, node, offset);
    }
  }, {
    key: "restore",
    value: function restore(node) {
      var range;
      var textNode;
      var text = node.data.split(GUARD_TEXT).join('');
      if (node === this.leftGuard) {
        if (this.prev instanceof _text__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z) {
          var prevLength = this.prev.length();
          this.prev.insertAt(prevLength, text);
          range = {
            startNode: this.prev.domNode,
            startOffset: prevLength + text.length
          };
        } else {
          textNode = document.createTextNode(text);
          this.parent.insertBefore(this.scroll.create(textNode), this);
          range = {
            startNode: textNode,
            startOffset: text.length
          };
        }
      } else if (node === this.rightGuard) {
        if (this.next instanceof _text__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z) {
          this.next.insertAt(0, text);
          range = {
            startNode: this.next.domNode,
            startOffset: text.length
          };
        } else {
          textNode = document.createTextNode(text);
          this.parent.insertBefore(this.scroll.create(textNode), this.next);
          range = {
            startNode: textNode,
            startOffset: text.length
          };
        }
      }
      node.data = GUARD_TEXT;
      return range;
    }
  }, {
    key: "update",
    value: function update(mutations, context) {
      var _this2 = this;
      mutations.forEach(function (mutation) {
        if (mutation.type === 'characterData' && (mutation.target === _this2.leftGuard || mutation.target === _this2.rightGuard)) {
          var range = _this2.restore(mutation.target);
          if (range) context.range = range;
        }
      });
    }
  }]);
  return Embed;
}(parchment__WEBPACK_IMPORTED_MODULE_0__.EmbedBlot);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Embed);

/***/ }),

/***/ 6603:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
/* harmony import */ var _break__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6192);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8222);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Inline = /*#__PURE__*/function (_InlineBlot) {
  _inherits(Inline, _InlineBlot);
  var _super = _createSuper(Inline);
  function Inline() {
    _classCallCheck(this, Inline);
    return _super.apply(this, arguments);
  }
  _createClass(Inline, [{
    key: "formatAt",
    value: function formatAt(index, length, name, value) {
      if (Inline.compare(this.statics.blotName, name) < 0 && this.scroll.query(name, parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.BLOT)) {
        var blot = this.isolate(index, length);
        if (value) {
          blot.wrap(name, value);
        }
      } else {
        _get(_getPrototypeOf(Inline.prototype), "formatAt", this).call(this, index, length, name, value);
      }
    }
  }, {
    key: "optimize",
    value: function optimize(context) {
      _get(_getPrototypeOf(Inline.prototype), "optimize", this).call(this, context);
      if (this.parent instanceof Inline && Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
        var parent = this.parent.isolate(this.offset(), this.length());
        this.moveChildren(parent);
        parent.wrap(this);
      }
    }
  }], [{
    key: "compare",
    value: function compare(self, other) {
      var selfIndex = Inline.order.indexOf(self);
      var otherIndex = Inline.order.indexOf(other);
      if (selfIndex >= 0 || otherIndex >= 0) {
        return selfIndex - otherIndex;
      }
      if (self === other) {
        return 0;
      }
      if (self < other) {
        return -1;
      }
      return 1;
    }
  }]);
  return Inline;
}(parchment__WEBPACK_IMPORTED_MODULE_0__.InlineBlot);
Inline.allowedChildren = [Inline, _break__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, parchment__WEBPACK_IMPORTED_MODULE_0__.EmbedBlot, _text__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z];
// Lower index means deeper in the DOM tree, since not found (-1) is for embeds
Inline.order = ['cursor', 'inline',
// Must be lower
'link',
// Chrome wants <a> to be lower
'underline', 'strike', 'italic', 'bold', 'script', 'code' // Must be higher
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inline);

/***/ }),

/***/ 3272:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2069);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6446);
/* harmony import */ var _break__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6192);
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3553);
/* harmony import */ var _formats_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1969);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






function isLine(blot) {
  return blot instanceof _block__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP || blot instanceof _block__WEBPACK_IMPORTED_MODULE_2__/* .BlockEmbed */ .i2;
}
var Scroll = /*#__PURE__*/function (_ScrollBlot) {
  _inherits(Scroll, _ScrollBlot);
  var _super = _createSuper(Scroll);
  function Scroll(registry, domNode, _ref) {
    var _this;
    var emitter = _ref.emitter,
      toggleBlankClass = _ref.toggleBlankClass;
    _classCallCheck(this, Scroll);
    _this = _super.call(this, registry, domNode);
    _this.emitter = emitter;
    _this.toggleBlankClass = toggleBlankClass;
    _this.batch = false;
    _this.optimize();
    _this.enable();
    _this.domNode.addEventListener('dragstart', function (e) {
      return _this.handleDragStart(e);
    });
    return _this;
  }
  _createClass(Scroll, [{
    key: "batchStart",
    value: function batchStart() {
      if (!Array.isArray(this.batch)) {
        this.batch = [];
      }
    }
  }, {
    key: "batchEnd",
    value: function batchEnd() {
      var mutations = this.batch;
      this.batch = false;
      this.update(mutations);
    }
  }, {
    key: "emitMount",
    value: function emitMount(blot) {
      this.emitter.emit(_core_emitter__WEBPACK_IMPORTED_MODULE_1__/* ["default"].events.SCROLL_BLOT_MOUNT */ .Z.events.SCROLL_BLOT_MOUNT, blot);
    }
  }, {
    key: "emitUnmount",
    value: function emitUnmount(blot) {
      this.emitter.emit(_core_emitter__WEBPACK_IMPORTED_MODULE_1__/* ["default"].events.SCROLL_BLOT_UNMOUNT */ .Z.events.SCROLL_BLOT_UNMOUNT, blot);
    }
  }, {
    key: "deleteAt",
    value: function deleteAt(index, length) {
      var _this$line = this.line(index),
        _this$line2 = _slicedToArray(_this$line, 2),
        first = _this$line2[0],
        offset = _this$line2[1];
      var _this$line3 = this.line(index + length),
        _this$line4 = _slicedToArray(_this$line3, 1),
        last = _this$line4[0];
      _get(_getPrototypeOf(Scroll.prototype), "deleteAt", this).call(this, index, length);
      if (last != null && first !== last && offset > 0) {
        var isCrossCellDelete = (first instanceof _formats_table__WEBPACK_IMPORTED_MODULE_5__/* .CellLine */ .zW || last instanceof _formats_table__WEBPACK_IMPORTED_MODULE_5__/* .CellLine */ .zW) && first.parent !== last.parent;
        var includesEmbedBlock = first instanceof _block__WEBPACK_IMPORTED_MODULE_2__/* .BlockEmbed */ .i2 || last instanceof _block__WEBPACK_IMPORTED_MODULE_2__/* .BlockEmbed */ .i2;
        if (!includesEmbedBlock && !isCrossCellDelete) {
          var ref = last.children.head instanceof _break__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z ? null : last.children.head;
          first.moveChildren(last, ref);
          first.remove();
        }
      }
      this.optimize();
    }
  }, {
    key: "enable",
    value: function enable() {
      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.domNode.setAttribute('contenteditable', enabled);
    }
  }, {
    key: "formatAt",
    value: function formatAt(index, length, format, value) {
      _get(_getPrototypeOf(Scroll.prototype), "formatAt", this).call(this, index, length, format, value);
      this.optimize();
    }
  }, {
    key: "handleDragStart",
    value: function handleDragStart(event) {
      event.preventDefault();
    }
  }, {
    key: "insertAt",
    value: function insertAt(index, value, def) {
      if (index >= this.length()) {
        if (def == null || this.scroll.query(value, parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.BLOCK) == null) {
          var blot = this.scroll.create(this.statics.defaultChild.blotName);
          this.appendChild(blot);
          if (def == null && value.endsWith('\n')) {
            blot.insertAt(0, value.slice(0, -1), def);
          } else {
            blot.insertAt(0, value, def);
          }
        } else {
          var embed = this.scroll.create(value, def);
          this.appendChild(embed);
        }
      } else {
        _get(_getPrototypeOf(Scroll.prototype), "insertAt", this).call(this, index, value, def);
      }
      this.optimize();
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(blot, ref) {
      if (blot.statics.scope === parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.INLINE_BLOT) {
        var wrapper = this.scroll.create(this.statics.defaultChild.blotName);
        wrapper.appendChild(blot);
        _get(_getPrototypeOf(Scroll.prototype), "insertBefore", this).call(this, wrapper, ref);
      } else {
        _get(_getPrototypeOf(Scroll.prototype), "insertBefore", this).call(this, blot, ref);
      }
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return this.domNode.getAttribute('contenteditable') === 'true';
    }
  }, {
    key: "leaf",
    value: function leaf(index) {
      return this.path(index).pop() || [null, -1];
    }
  }, {
    key: "line",
    value: function line(index) {
      if (index === this.length()) {
        return this.line(index - 1);
      }
      return this.descendant(isLine, index);
    }
  }, {
    key: "lines",
    value: function lines() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;
      var getLines = function getLines(blot, blotIndex, blotLength) {
        var lines = [];
        var lengthLeft = blotLength;
        blot.children.forEachAt(blotIndex, blotLength, function (child, childIndex, childLength) {
          if (isLine(child)) {
            lines.push(child);
          } else if (child instanceof parchment__WEBPACK_IMPORTED_MODULE_0__.ContainerBlot) {
            lines = lines.concat(getLines(child, childIndex, lengthLeft));
          }
          lengthLeft -= childLength;
        });
        return lines;
      };
      return getLines(this, index, length);
    }
  }, {
    key: "optimize",
    value: function optimize() {
      var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.batch) return;
      _get(_getPrototypeOf(Scroll.prototype), "optimize", this).call(this, mutations, context);
      if (mutations.length > 0) {
        this.emitter.emit(_core_emitter__WEBPACK_IMPORTED_MODULE_1__/* ["default"].events.SCROLL_OPTIMIZE */ .Z.events.SCROLL_OPTIMIZE, mutations, context);
      }
    }
  }, {
    key: "path",
    value: function path(index) {
      return _get(_getPrototypeOf(Scroll.prototype), "path", this).call(this, index).slice(1); // Exclude self
    }
  }, {
    key: "remove",
    value: function remove() {
      // Never remove self
    }
  }, {
    key: "update",
    value: function update(mutations) {
      var _this2 = this;
      if (this.batch) {
        if (Array.isArray(mutations)) {
          this.batch = this.batch.concat(mutations);
          this.toggleBlankClass();
        }
        return;
      }
      var source = _core_emitter__WEBPACK_IMPORTED_MODULE_1__/* ["default"].sources.USER */ .Z.sources.USER;
      if (typeof mutations === 'string') {
        source = mutations;
      }
      if (!Array.isArray(mutations)) {
        mutations = this.observer.takeRecords();
      }
      mutations = mutations.filter(function (_ref2) {
        var target = _ref2.target;
        var blot = _this2.find(target, true);
        return blot && blot.scroll === _this2;
      });
      if (mutations.length > 0) {
        this.emitter.emit(_core_emitter__WEBPACK_IMPORTED_MODULE_1__/* ["default"].events.SCROLL_BEFORE_UPDATE */ .Z.events.SCROLL_BEFORE_UPDATE, source, mutations);
      }
      _get(_getPrototypeOf(Scroll.prototype), "update", this).call(this, mutations.concat([])); // pass copy
      if (mutations.length > 0) {
        this.emitter.emit(_core_emitter__WEBPACK_IMPORTED_MODULE_1__/* ["default"].events.SCROLL_UPDATE */ .Z.events.SCROLL_UPDATE, source, mutations);
      }
    }
  }]);
  return Scroll;
}(parchment__WEBPACK_IMPORTED_MODULE_0__.ScrollBlot);
Scroll.blotName = 'scroll';
Scroll.className = 'ql-editor';
Scroll.tagName = 'DIV';
Scroll.defaultChild = _block__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP;
Scroll.allowedChildren = [_block__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP, _block__WEBPACK_IMPORTED_MODULE_2__/* .BlockEmbed */ .i2, _container__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scroll);

/***/ }),

/***/ 8222:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Text),
/* harmony export */   "b": () => (/* binding */ escapeText)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Text = /*#__PURE__*/function (_TextBlot) {
  _inherits(Text, _TextBlot);
  var _super = _createSuper(Text);
  function Text() {
    _classCallCheck(this, Text);
    return _super.apply(this, arguments);
  }
  return _createClass(Text);
}(parchment__WEBPACK_IMPORTED_MODULE_0__.TextBlot);
function escapeText(text) {
  return text.replace(/[&<>"']/g, function (s) {
    // https://lodash.com/docs#escape
    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entityMap[s];
  });
}

// eslint-disable-next-line no-restricted-exports


/***/ }),

/***/ 2432:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(281);
/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6446);
/* harmony import */ var _blots_break__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6192);
/* harmony import */ var _blots_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3553);
/* harmony import */ var _blots_cursor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3657);
/* harmony import */ var _blots_embed__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7452);
/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6603);
/* harmony import */ var _blots_scroll__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3272);
/* harmony import */ var _blots_text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8222);
/* harmony import */ var _modules_clipboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5635);
/* harmony import */ var _modules_history__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2215);
/* harmony import */ var _modules_keyboard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3071);
/* harmony import */ var _modules_uploader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3859);













_core_quill__WEBPACK_IMPORTED_MODULE_0__/* ["default"].register */ .ZP.register({
  'blots/block': _blots_block__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP,
  'blots/block/embed': _blots_block__WEBPACK_IMPORTED_MODULE_1__/* .BlockEmbed */ .i2,
  'blots/break': _blots_break__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
  'blots/container': _blots_container__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
  'blots/cursor': _blots_cursor__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,
  'blots/embed': _blots_embed__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z,
  'blots/inline': _blots_inline__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z,
  'blots/scroll': _blots_scroll__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z,
  'blots/text': _blots_text__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z,
  'modules/clipboard': _modules_clipboard__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .ZP,
  'modules/history': _modules_history__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z,
  'modules/keyboard': _modules_keyboard__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .ZP,
  'modules/uploader': _modules_uploader__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_core_quill__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);

/***/ }),

/***/ 2861:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ editor)
});

// EXTERNAL MODULE: ./node_modules/lodash.clonedeep/index.js
var lodash_clonedeep = __webpack_require__(8805);
var lodash_clonedeep_default = /*#__PURE__*/__webpack_require__.n(lodash_clonedeep);
// EXTERNAL MODULE: ./node_modules/lodash.isequal/index.js
var lodash_isequal = __webpack_require__(2722);
var lodash_isequal_default = /*#__PURE__*/__webpack_require__.n(lodash_isequal);
// EXTERNAL MODULE: ./node_modules/lodash.merge/index.js
var lodash_merge = __webpack_require__(732);
var lodash_merge_default = /*#__PURE__*/__webpack_require__.n(lodash_merge);
// EXTERNAL MODULE: ./node_modules/quill-delta/dist/Delta.js
var Delta = __webpack_require__(9098);
var Delta_default = /*#__PURE__*/__webpack_require__.n(Delta);
// EXTERNAL MODULE: ./node_modules/parchment/src/parchment.ts + 17 modules
var parchment = __webpack_require__(1233);
// EXTERNAL MODULE: ./core/selection.js
var selection = __webpack_require__(2539);
// EXTERNAL MODULE: ./blots/cursor.js
var cursor = __webpack_require__(3657);
// EXTERNAL MODULE: ./blots/block.js + 1 modules
var blots_block = __webpack_require__(6446);
// EXTERNAL MODULE: ./blots/break.js
var blots_break = __webpack_require__(6192);
// EXTERNAL MODULE: ./blots/text.js
var blots_text = __webpack_require__(8222);
;// CONCATENATED MODULE: ./utils/remove_class.js
function removeClass(node, className) {
  node.classList.remove(className);
  if (node.classList.length === 0) {
    node.removeAttribute('class');
  }
}
;// CONCATENATED MODULE: ./core/editor.js
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }











var ASCII = /^[ -~]*$/;
var Editor = /*#__PURE__*/function () {
  function Editor(scroll) {
    _classCallCheck(this, Editor);
    this.scroll = scroll;
    this.delta = this.getDelta();
    this.immediateFormats = new Set();
  }
  _createClass(Editor, [{
    key: "addImmediateFormat",
    value: function addImmediateFormat(name) {
      this.immediateFormats.add(name);
    }
  }, {
    key: "applyDelta",
    value: function applyDelta(delta) {
      var _this = this;
      this.scroll.update();
      var scrollLength = this.scroll.length();
      this.scroll.batchStart();
      var normalizedDelta = normalizeDelta(delta);
      var deleteDelta = new (Delta_default())();
      normalizedDelta.reduce(function (index, op) {
        var length = Delta.Op.length(op);
        var attributes = op.attributes || {};
        var addedNewline = false;
        if (op.insert != null) {
          deleteDelta.retain(length);
          if (typeof op.insert === 'string') {
            var text = op.insert;
            addedNewline = !text.endsWith('\n') && (scrollLength <= index || _this.scroll.descendant(blots_block/* BlockEmbed */.i2, index)[0]);
            _this.scroll.insertAt(index, text);
            var _this$scroll$line = _this.scroll.line(index),
              _this$scroll$line2 = _slicedToArray(_this$scroll$line, 2),
              line = _this$scroll$line2[0],
              offset = _this$scroll$line2[1];
            var formats = lodash_merge_default()({}, (0,blots_block/* bubbleFormats */.E2)(line));
            if (line instanceof blots_block/* default */.ZP) {
              var _line$descendant = line.descendant(parchment.LeafBlot, offset),
                _line$descendant2 = _slicedToArray(_line$descendant, 1),
                leaf = _line$descendant2[0];
              formats = lodash_merge_default()(formats, (0,blots_block/* bubbleFormats */.E2)(leaf));
            }
            attributes = Delta.AttributeMap.diff(formats, attributes) || {};
          } else if (_typeof(op.insert) === 'object') {
            var key = Object.keys(op.insert)[0]; // There should only be one key
            if (key == null) return index;
            addedNewline = _this.scroll.query(key, parchment.Scope.INLINE) != null && (scrollLength <= index || _this.scroll.descendant(blots_block/* BlockEmbed */.i2, index)[0]);
            _this.scroll.insertAt(index, key, op.insert[key]);
          }
          scrollLength += length;
        } else {
          deleteDelta.push(op);
        }
        var keys = Object.keys(attributes);
        _this.immediateFormats.forEach(function (format) {
          if (keys.indexOf(format) > -1) {
            _this.scroll.formatAt(index, length, format, attributes[format]);
            delete attributes[format];
          }
        });
        Object.keys(attributes).forEach(function (name) {
          _this.scroll.formatAt(index, length, name, attributes[name]);
        });
        var addedLength = addedNewline ? 1 : 0;
        scrollLength += addedLength;
        deleteDelta.delete(addedLength);
        return index + length + addedLength;
      }, 0);
      deleteDelta.reduce(function (index, op) {
        if (typeof op.delete === 'number') {
          _this.scroll.deleteAt(index, op.delete);
          return index;
        }
        return index + Delta.Op.length(op);
      }, 0);
      this.scroll.batchEnd();
      this.scroll.optimize();
      return this.update(normalizedDelta);
    }
  }, {
    key: "deleteText",
    value: function deleteText(index, length) {
      this.scroll.deleteAt(index, length);
      return this.update(new (Delta_default())().retain(index).delete(length));
    }
  }, {
    key: "formatLine",
    value: function formatLine(index, length) {
      var _this2 = this;
      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.scroll.update();
      Object.keys(formats).forEach(function (format) {
        _this2.scroll.lines(index, Math.max(length, 1)).forEach(function (line) {
          line.format(format, formats[format]);
        });
      });
      this.scroll.optimize();
      var delta = new (Delta_default())().retain(index).retain(length, lodash_clonedeep_default()(formats));
      return this.update(delta);
    }
  }, {
    key: "formatText",
    value: function formatText(index, length) {
      var _this3 = this;
      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Object.keys(formats).forEach(function (format) {
        _this3.scroll.formatAt(index, length, format, formats[format]);
      });
      var delta = new (Delta_default())().retain(index).retain(length, lodash_clonedeep_default()(formats));
      return this.update(delta);
    }
  }, {
    key: "getContents",
    value: function getContents(index, length) {
      return this.delta.slice(index, index + length);
    }
  }, {
    key: "getDelta",
    value: function getDelta() {
      return this.scroll.lines().reduce(function (delta, line) {
        return delta.concat(line.delta());
      }, new (Delta_default())());
    }
  }, {
    key: "getFormat",
    value: function getFormat(index) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var lines = [];
      var leaves = [];
      if (length === 0) {
        this.scroll.path(index).forEach(function (path) {
          var _path = _slicedToArray(path, 1),
            blot = _path[0];
          if (blot instanceof blots_block/* default */.ZP) {
            lines.push(blot);
          } else if (blot instanceof parchment.LeafBlot) {
            leaves.push(blot);
          }
        });
      } else {
        lines = this.scroll.lines(index, length);
        leaves = this.scroll.descendants(parchment.LeafBlot, index, length);
      }
      var _map = [lines, leaves].map(function (blots) {
        if (blots.length === 0) return {};
        var formats = (0,blots_block/* bubbleFormats */.E2)(blots.shift());
        while (Object.keys(formats).length > 0) {
          var blot = blots.shift();
          if (blot == null) return formats;
          formats = combineFormats((0,blots_block/* bubbleFormats */.E2)(blot), formats);
        }
        return formats;
      });
      var _map2 = _slicedToArray(_map, 2);
      lines = _map2[0];
      leaves = _map2[1];
      return _objectSpread(_objectSpread({}, lines), leaves);
    }
  }, {
    key: "getHTML",
    value: function getHTML(index, length) {
      var _this$scroll$line3 = this.scroll.line(index),
        _this$scroll$line4 = _slicedToArray(_this$scroll$line3, 2),
        line = _this$scroll$line4[0],
        lineOffset = _this$scroll$line4[1];
      if (line.length() > lineOffset + length) {
        return convertHTML(line, lineOffset, length, true);
      }
      return convertHTML(this.scroll, index, length, true);
    }
  }, {
    key: "getText",
    value: function getText(index, length) {
      return this.getContents(index, length).filter(function (op) {
        return typeof op.insert === 'string';
      }).map(function (op) {
        return op.insert;
      }).join('');
    }
  }, {
    key: "insertEmbed",
    value: function insertEmbed(index, embed, value) {
      this.scroll.insertAt(index, embed, value);
      return this.update(new (Delta_default())().retain(index).insert(_defineProperty({}, embed, value)));
    }
  }, {
    key: "insertText",
    value: function insertText(index, text) {
      var _this4 = this;
      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      this.scroll.insertAt(index, text);
      Object.keys(formats).forEach(function (format) {
        _this4.scroll.formatAt(index, text.length, format, formats[format]);
      });
      return this.update(new (Delta_default())().retain(index).insert(text, lodash_clonedeep_default()(formats)));
    }
  }, {
    key: "isBlank",
    value: function isBlank() {
      var isComposing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.scroll.children.length === 0) return true;
      if (isComposing) return false;
      if (this.scroll.children.length > 1) return false;
      var block = this.scroll.children.head;
      if (block.statics.blotName !== blots_block/* default.blotName */.ZP.blotName) return false;
      if (block.children.length > 1) return false;
      return block.children.head instanceof blots_break/* default */.Z;
    }
  }, {
    key: "removeFormat",
    value: function removeFormat(index, length) {
      var text = this.getText(index, length);
      var _this$scroll$line5 = this.scroll.line(index + length),
        _this$scroll$line6 = _slicedToArray(_this$scroll$line5, 2),
        line = _this$scroll$line6[0],
        offset = _this$scroll$line6[1];
      var suffixLength = 0;
      var suffix = new (Delta_default())();
      if (line != null) {
        suffixLength = line.length() - offset;
        suffix = line.delta().slice(offset, offset + suffixLength - 1).insert('\n');
      }
      var contents = this.getContents(index, length + suffixLength);
      var diff = contents.diff(new (Delta_default())().insert(text).concat(suffix));
      var delta = new (Delta_default())().retain(index).concat(diff);
      return this.applyDelta(delta);
    }
  }, {
    key: "update",
    value: function update(change) {
      var mutations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var selectionInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var oldDelta = this.delta;
      if (mutations.length === 1 && mutations[0].type === 'characterData' && mutations[0].target.data.match(ASCII) && this.scroll.find(mutations[0].target)) {
        // Optimization for character changes
        var textBlot = this.scroll.find(mutations[0].target);
        var formats = (0,blots_block/* bubbleFormats */.E2)(textBlot);
        var index = textBlot.offset(this.scroll);
        var oldValue = mutations[0].oldValue.replace(cursor/* default.CONTENTS */.Z.CONTENTS, '');
        var oldText = new (Delta_default())().insert(oldValue);
        var newText = new (Delta_default())().insert(textBlot.value());
        var relativeSelectionInfo = selectionInfo && {
          oldRange: shiftRange(selectionInfo.oldRange, -index),
          newRange: shiftRange(selectionInfo.newRange, -index)
        };
        var diffDelta = new (Delta_default())().retain(index).concat(oldText.diff(newText, relativeSelectionInfo));
        change = diffDelta.reduce(function (delta, op) {
          if (op.insert) {
            return delta.insert(op.insert, formats);
          }
          return delta.push(op);
        }, new (Delta_default())());
        this.delta = oldDelta.compose(change);
      } else {
        this.delta = this.getDelta();
        if (!change || !lodash_isequal_default()(oldDelta.compose(change), this.delta)) {
          change = oldDelta.diff(this.delta, selectionInfo);
        }
      }
      return change;
    }
  }]);
  return Editor;
}();
function convertListHTML(items, lastIndent, types) {
  if (items.length === 0) {
    var _getListType = getListType(types.pop()),
      _getListType2 = _slicedToArray(_getListType, 1),
      _endTag = _getListType2[0];
    if (lastIndent <= 0) {
      return "</li></".concat(_endTag, ">");
    }
    return "</li></".concat(_endTag, ">").concat(convertListHTML([], lastIndent - 1, types));
  }
  var _items = _toArray(items),
    _items$ = _items[0],
    child = _items$.child,
    offset = _items$.offset,
    length = _items$.length,
    indent = _items$.indent,
    type = _items$.type,
    rest = _items.slice(1);
  var _getListType3 = getListType(type, child),
    _getListType4 = _slicedToArray(_getListType3, 2),
    tag = _getListType4[0],
    attribute = _getListType4[1];
  if (indent > lastIndent) {
    types.push(type);
    if (indent === lastIndent + 1) {
      return "<".concat(tag, "><li").concat(attribute, ">").concat(convertHTML(child, offset, length)).concat(convertListHTML(rest, indent, types));
    }
    return "<".concat(tag, "><li>").concat(convertListHTML(items, lastIndent + 1, types));
  }
  var previousType = types[types.length - 1];
  if (indent === lastIndent && type === previousType) {
    return "</li><li".concat(attribute, ">").concat(convertHTML(child, offset, length)).concat(convertListHTML(rest, indent, types));
  }
  var _getListType5 = getListType(types.pop()),
    _getListType6 = _slicedToArray(_getListType5, 1),
    endTag = _getListType6[0];
  return "</li></".concat(endTag, ">").concat(convertListHTML(items, lastIndent - 1, types));
}
function convertHTML(blot, index, length) {
  var isRoot = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (typeof blot.html === 'function') {
    return blot.html(index, length);
  }
  if (blot instanceof blots_text/* default */.Z) {
    return (0,blots_text/* escapeText */.b)(blot.value().slice(index, index + length));
  }
  if (blot.children) {
    // TODO fix API
    if (blot.statics.blotName === 'list-container') {
      var items = [];
      blot.children.forEachAt(index, length, function (child, offset, childLength) {
        var formats = child.formats();
        items.push({
          child: child,
          offset: offset,
          length: childLength,
          indent: formats.indent || 0,
          type: formats.list
        });
      });
      return convertListHTML(items, -1, []);
    }
    var parts = [];
    blot.children.forEachAt(index, length, function (child, offset, childLength) {
      parts.push(convertHTML(child, offset, childLength));
    });
    handleBreakLine(blot.children, parts);
    if (isRoot || blot.statics.blotName === 'list') {
      return parts.join('');
    }
    var domNode = extractNodeFromBlot(blot);
    var outerHTML = domNode.outerHTML,
      innerHTML = domNode.innerHTML;
    var _outerHTML$split = outerHTML.split(">".concat(innerHTML, "<")),
      _outerHTML$split2 = _slicedToArray(_outerHTML$split, 2),
      start = _outerHTML$split2[0],
      end = _outerHTML$split2[1];
    if (start.indexOf('<table') === 0) {
      return "".concat(start.replace(/(\sdata-.+?=["'].*?["'])/g, ''), ">").concat(parts.join('').replace(/(\sdata-table.+?=["'].*?["'])/g, ''), "<").concat(end);
    }
    return "".concat(start, ">").concat(parts.join(''), "<").concat(end);
  }
  return blot.domNode.outerHTML;
}
function handleBreakLine(linkedList, parts) {
  if (linkedList.length === 1 && linkedList.head instanceof blots_break/* default */.Z) {
    parts.push('<br>');
  }
}
function extractNodeFromBlot(blot) {
  var domNode = blot.domNode.cloneNode(true);
  return removeTableServiceClasses(blot, domNode);
}
function removeTableServiceClasses(blot, domNode) {
  var BLOTS_WITH_SERVICE_CLASS = ['tableCellLine', 'tableHeaderCellLine', 'tableCell', 'tableHeaderCell'];
  if (BLOTS_WITH_SERVICE_CLASS.includes(blot.statics.blotName)) {
    removeClass(domNode, blot.statics.className);
  }
  return domNode;
}
function combineFormats(formats, combined) {
  return Object.keys(combined).reduce(function (merged, name) {
    if (formats[name] == null) return merged;
    if (combined[name] === formats[name]) {
      merged[name] = combined[name];
    } else if (Array.isArray(combined[name])) {
      if (combined[name].indexOf(formats[name]) < 0) {
        merged[name] = combined[name].concat([formats[name]]);
      }
    } else {
      merged[name] = [combined[name], formats[name]];
    }
    return merged;
  }, {});
}
function getListType(type, child) {
  var tag = type === 'ordered' ? 'ol' : 'ul';
  var attributes = child ? "".concat(getBlotNodeAttributes(child)) : '';
  switch (type) {
    case 'checked':
      return [tag, "".concat(attributes, " data-list=\"checked\"")];
    case 'unchecked':
      return [tag, "".concat(attributes, " data-list=\"unchecked\"")];
    default:
      return [tag, attributes];
  }
}
function getBlotNodeAttributes(_ref) {
  var domNode = _ref.domNode;
  if (!domNode.hasAttributes()) {
    return '';
  }
  var attributes = domNode.attributes;
  var attributesString = ' ';
  for (var i = 0; i < attributes.length; i += 1) {
    var name = attributes[i].name;
    var value = attributes[i].value;
    if (name === 'class') {
      value = removeIndentClass(value);
    }
    if (value.length && name.indexOf('data-') === -1) {
      attributesString += "".concat(name, "=\"").concat(value, "\"");
    }
  }
  return attributesString.length > 1 ? attributesString : '';
}
function removeIndentClass(classString) {
  return classString.replace(/ql-indent-\d/g, '').trim();
}
function normalizeDelta(delta) {
  return delta.reduce(function (normalizedDelta, op) {
    if (typeof op.insert === 'string') {
      var text = op.insert.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      return normalizedDelta.insert(text, op.attributes);
    }
    return normalizedDelta.push(op);
  }, new (Delta_default())());
}
function shiftRange(_ref2, amount) {
  var index = _ref2.index,
    length = _ref2.length;
  return new selection/* Range */.e(index + amount, length);
}
/* harmony default export */ const editor = (Editor);

/***/ }),

/***/ 2069:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3034);
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_has_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8034);
/* harmony import */ var _instances__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2598);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3122);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var debug = (0,_logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)('quill:events');
var EVENTS = ['selectionchange', 'mousedown', 'mouseup', 'click'];
if ((0,_utils_has_window__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)()) {
  EVENTS.forEach(function (eventName) {
    document.addEventListener(eventName, function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      Array.from(document.querySelectorAll('.ql-container')).forEach(function (node) {
        var quill = _instances__WEBPACK_IMPORTED_MODULE_1__/* ["default"].get */ .Z.get(node);
        if (quill && quill.emitter) {
          var _quill$emitter;
          (_quill$emitter = quill.emitter).handleDOM.apply(_quill$emitter, args);
        }
      });
    });
  });
}
var Emitter = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Emitter, _EventEmitter);
  var _super = _createSuper(Emitter);
  function Emitter() {
    var _this;
    _classCallCheck(this, Emitter);
    _this = _super.call(this);
    _this.listeners = {};
    _this.on('error', debug.error);
    return _this;
  }
  _createClass(Emitter, [{
    key: "emit",
    value: function emit() {
      var _debug$log, _get2;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      (_debug$log = debug.log).call.apply(_debug$log, [debug].concat(args));
      (_get2 = _get(_getPrototypeOf(Emitter.prototype), "emit", this)).call.apply(_get2, [this].concat(args));
    }
  }, {
    key: "handleDOM",
    value: function handleDOM(event) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      (this.listeners[event.type] || []).forEach(function (_ref) {
        var node = _ref.node,
          handler = _ref.handler;
        if (event.target === node || node.contains(event.target)) {
          handler.apply(void 0, [event].concat(args));
        }
      });
    }
  }, {
    key: "listenDOM",
    value: function listenDOM(eventName, node, handler) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push({
        node: node,
        handler: handler
      });
    }
  }]);
  return Emitter;
}((eventemitter3__WEBPACK_IMPORTED_MODULE_0___default()));
Emitter.events = {
  EDITOR_CHANGE: 'editor-change',
  SCROLL_BEFORE_UPDATE: 'scroll-before-update',
  SCROLL_BLOT_MOUNT: 'scroll-blot-mount',
  SCROLL_BLOT_UNMOUNT: 'scroll-blot-unmount',
  SCROLL_OPTIMIZE: 'scroll-optimize',
  SCROLL_UPDATE: 'scroll-update',
  SELECTION_CHANGE: 'selection-change',
  TEXT_CHANGE: 'text-change',
  CONTENT_SETTED: 'content-setted'
};
Emitter.sources = {
  API: 'api',
  SILENT: 'silent',
  USER: 'user'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Emitter);

/***/ }),

/***/ 2598:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new WeakMap());

/***/ }),

/***/ 3122:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var levels = ['error', 'warn', 'log', 'info'];
var level = 'warn';
function debug(method) {
  if (levels.indexOf(method) <= levels.indexOf(level)) {
    var _console;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    (_console = console)[method].apply(_console, args); // eslint-disable-line no-console
  }
}

function namespace(ns) {
  return levels.reduce(function (logger, method) {
    logger[method] = debug.bind(console, method, ns);
    return logger;
  }, {});
}
namespace.level = function (newLevel) {
  level = newLevel;
};
debug.level = namespace.level;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (namespace);

/***/ }),

/***/ 7094:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Module = /*#__PURE__*/_createClass(function Module(quill) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  _classCallCheck(this, Module);
  this.quill = quill;
  this.options = options;
});
Module.DEFAULTS = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Module);

/***/ }),

/***/ 281:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (/* binding */ Quill)
/* harmony export */ });
/* unused harmony exports globalRegistry, expandConfig, overload */
/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9098);
/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8805);
/* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_clonedeep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(732);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1233);
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2861);
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2069);
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7094);
/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2539);
/* harmony import */ var _instances__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2598);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3122);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1690);
/* harmony import */ var _utils_is_defined__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5874);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }












var debug = (0,_logger__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)('quill');
var globalRegistry = new parchment__WEBPACK_IMPORTED_MODULE_3__.Registry();
parchment__WEBPACK_IMPORTED_MODULE_3__.ParentBlot.uiClass = 'ql-ui';
var Quill = /*#__PURE__*/function () {
  function Quill(container) {
    var _this = this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Quill);
    this.options = expandConfig(container, options);
    this.container = this.options.container;
    if (this.container == null) {
      // eslint-disable-next-line no-constructor-return
      return debug.error('Invalid Quill container', container);
    }
    if (this.options.debug) {
      Quill.debug(this.options.debug);
    }
    var html = this.container.innerHTML.trim();
    this.container.classList.add('ql-container');
    this.container.innerHTML = '';
    _instances__WEBPACK_IMPORTED_MODULE_8__/* ["default"].set */ .Z.set(this.container, this);
    this.root = this.addContainer('ql-editor');
    this.root.classList.add('ql-blank');
    this.scrollingContainer = this.options.scrollingContainer || this.root;
    this.emitter = new _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z();
    var ScrollBlot = this.options.registry.query(parchment__WEBPACK_IMPORTED_MODULE_3__.ScrollBlot.blotName);
    this.scroll = new ScrollBlot(this.options.registry, this.root, {
      emitter: this.emitter,
      toggleBlankClass: this.toggleBlankClass.bind(this)
    });
    this.editor = new _editor__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(this.scroll);
    this.selection = new _selection__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z(this.scroll, this.emitter);
    this.theme = new this.options.theme(this, this.options); // eslint-disable-line new-cap
    this.keyboard = this.theme.addModule('keyboard');
    this.clipboard = this.theme.addModule('clipboard');
    this.history = this.theme.addModule('history');
    this.uploader = this.theme.addModule('uploader');
    this.theme.init();
    this.emitter.on(_emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].events.EDITOR_CHANGE */ .Z.events.EDITOR_CHANGE, function (type) {
      if (type === _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].events.TEXT_CHANGE */ .Z.events.TEXT_CHANGE) {
        _this.toggleBlankClass();
      }
    });
    this.emitter.on(_emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].events.SCROLL_UPDATE */ .Z.events.SCROLL_UPDATE, function (source, mutations) {
      var oldRange = _this.selection.lastRange;
      var _this$selection$getRa = _this.selection.getRange(),
        _this$selection$getRa2 = _slicedToArray(_this$selection$getRa, 1),
        newRange = _this$selection$getRa2[0];
      var selectionInfo = oldRange && newRange ? {
        oldRange: oldRange,
        newRange: newRange
      } : undefined;
      modify.call(_this, function () {
        return _this.editor.update(null, mutations, selectionInfo);
      }, source);
    });
    this.setContents(this.getInitialContent(html));
    this.history.clear();
    if (this.options.placeholder) {
      this.root.setAttribute('data-placeholder', this.options.placeholder);
    }
    if (this.options.readOnly) {
      this.disable();
    }
    this.allowReadOnlyEdits = false;
  }
  _createClass(Quill, [{
    key: "getInitialContent",
    value: function getInitialContent(html) {
      return this.clipboard.convert({
        html: "".concat(html, "<p><br></p>"),
        text: '\n'
      });
    }
  }, {
    key: "toggleBlankClass",
    value: function toggleBlankClass() {
      var isComposing = this.selection.composing;
      this.root.classList.toggle('ql-blank', this.editor.isBlank(isComposing));
    }
  }, {
    key: "addContainer",
    value: function addContainer(container) {
      var refNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (typeof container === 'string') {
        var className = container;
        container = document.createElement('div');
        container.classList.add(className);
      }
      this.container.insertBefore(container, refNode);
      return container;
    }
  }, {
    key: "blur",
    value: function blur() {
      this.selection.setRange(null);
    }
  }, {
    key: "deleteText",
    value: function deleteText(index, length, source) {
      var _this2 = this;
      var _overload = overload(index, length, source);
      var _overload2 = _slicedToArray(_overload, 4);
      index = _overload2[0];
      length = _overload2[1];
      source = _overload2[3];
      return modify.call(this, function () {
        return _this2.editor.deleteText(index, length);
      }, source, index, -1 * length);
    }
  }, {
    key: "disable",
    value: function disable() {
      this.enable(false);
    }
  }, {
    key: "editReadOnly",
    value: function editReadOnly(modifier) {
      this.allowReadOnlyEdits = true;
      var value = modifier();
      this.allowReadOnlyEdits = false;
      return value;
    }
  }, {
    key: "enable",
    value: function enable() {
      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.scroll.enable(enabled);
      this.container.classList.toggle('ql-disabled', !enabled);
    }
  }, {
    key: "focus",
    value: function focus() {
      var scrollTop = this.scrollingContainer.scrollTop;
      this.selection.focus();
      this.scrollingContainer.scrollTop = scrollTop;
      this.scrollIntoView();
    }
  }, {
    key: "format",
    value: function format(name, value) {
      var _this3 = this;
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.API */ .Z.sources.API;
      return modify.call(this, function () {
        var range = _this3.getSelection(true);
        var change = new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())();
        if (range == null) return change;
        if (_this3.scroll.query(name, parchment__WEBPACK_IMPORTED_MODULE_3__.Scope.BLOCK)) {
          change = _this3.editor.formatLine(range.index, range.length, _defineProperty({}, name, value));
        } else if (range.length === 0) {
          _this3.selection.format(name, value);
          return change;
        } else {
          change = _this3.editor.formatText(range.index, range.length, _defineProperty({}, name, value));
        }
        _this3.setSelection(range, _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.SILENT */ .Z.sources.SILENT);
        return change;
      }, source);
    }
  }, {
    key: "formatLine",
    value: function formatLine(index, length, name, value, source) {
      var _this4 = this;
      var formats;
      // eslint-disable-next-line prefer-const
      var _overload3 = overload(index, length, name, value, source);
      var _overload4 = _slicedToArray(_overload3, 4);
      index = _overload4[0];
      length = _overload4[1];
      formats = _overload4[2];
      source = _overload4[3];
      return modify.call(this, function () {
        return _this4.editor.formatLine(index, length, formats);
      }, source, index, 0);
    }
  }, {
    key: "formatText",
    value: function formatText(index, length, name, value, source) {
      var _this5 = this;
      var formats;
      // eslint-disable-next-line prefer-const
      var _overload5 = overload(index, length, name, value, source);
      var _overload6 = _slicedToArray(_overload5, 4);
      index = _overload6[0];
      length = _overload6[1];
      formats = _overload6[2];
      source = _overload6[3];
      return modify.call(this, function () {
        return _this5.editor.formatText(index, length, formats);
      }, source, index, 0);
    }
  }, {
    key: "getBounds",
    value: function getBounds(index) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var bounds;
      if (typeof index === 'number') {
        bounds = this.selection.getBounds(index, length);
      } else {
        bounds = this.selection.getBounds(index.index, index.length);
      }
      var containerBounds = this.container.getBoundingClientRect();
      return {
        bottom: bounds.bottom - containerBounds.top,
        height: bounds.height,
        left: bounds.left - containerBounds.left,
        right: bounds.right - containerBounds.left,
        top: bounds.top - containerBounds.top,
        width: bounds.width
      };
    }
  }, {
    key: "getContents",
    value: function getContents() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;
      var _overload7 = overload(index, length);
      var _overload8 = _slicedToArray(_overload7, 2);
      index = _overload8[0];
      length = _overload8[1];
      return this.editor.getContents(index, length);
    }
  }, {
    key: "getFormat",
    value: function getFormat() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getSelection(true);
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)(index)) {
        return {};
      }
      if (typeof index === 'number') {
        return this.editor.getFormat(index, length);
      }
      return this.editor.getFormat(index.index, index.length);
    }
  }, {
    key: "getIndex",
    value: function getIndex(blot) {
      return blot.offset(this.scroll);
    }
  }, {
    key: "getLength",
    value: function getLength() {
      return this.scroll.length();
    }
  }, {
    key: "getLeaf",
    value: function getLeaf(index) {
      return this.scroll.leaf(index);
    }
  }, {
    key: "getLine",
    value: function getLine(index) {
      return this.scroll.line(index);
    }
  }, {
    key: "getLines",
    value: function getLines() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;
      if (typeof index !== 'number') {
        return this.scroll.lines(index.index, index.length);
      }
      return this.scroll.lines(index, length);
    }
  }, {
    key: "getModule",
    value: function getModule(name) {
      return this.theme.modules[name];
    }
  }, {
    key: "getSelection",
    value: function getSelection() {
      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (focus) this.focus();
      this.update(); // Make sure we access getRange with editor in consistent state
      return this.selection.getRange()[0];
    }
  }, {
    key: "getSemanticHTML",
    value: function getSemanticHTML() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;
      var _overload9 = overload(index, length);
      var _overload10 = _slicedToArray(_overload9, 2);
      index = _overload10[0];
      length = _overload10[1];
      return this.editor.getHTML(index, length);
    }
  }, {
    key: "getText",
    value: function getText() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;
      var _overload11 = overload(index, length);
      var _overload12 = _slicedToArray(_overload11, 2);
      index = _overload12[0];
      length = _overload12[1];
      return this.editor.getText(index, length);
    }
  }, {
    key: "hasFocus",
    value: function hasFocus() {
      return this.selection.hasFocus();
    }
  }, {
    key: "insertEmbed",
    value: function insertEmbed(index, embed, value) {
      var _this6 = this;
      var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Quill.sources.API;
      return modify.call(this, function () {
        return _this6.editor.insertEmbed(index, embed, value);
      }, source, index);
    }
  }, {
    key: "insertText",
    value: function insertText(index, text, name, value, source) {
      var _this7 = this;
      var formats;
      // eslint-disable-next-line prefer-const
      var _overload13 = overload(index, 0, name, value, source);
      var _overload14 = _slicedToArray(_overload13, 4);
      index = _overload14[0];
      formats = _overload14[2];
      source = _overload14[3];
      return modify.call(this, function () {
        return _this7.editor.insertText(index, text, formats);
      }, source, index, text.length);
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return this.scroll.isEnabled();
    }
  }, {
    key: "off",
    value: function off() {
      var _this$emitter;
      return (_this$emitter = this.emitter).off.apply(_this$emitter, arguments);
    }
  }, {
    key: "on",
    value: function on() {
      var _this$emitter2;
      return (_this$emitter2 = this.emitter).on.apply(_this$emitter2, arguments);
    }
  }, {
    key: "once",
    value: function once() {
      var _this$emitter3;
      return (_this$emitter3 = this.emitter).once.apply(_this$emitter3, arguments);
    }
  }, {
    key: "removeFormat",
    value: function removeFormat(index, length, source) {
      var _this8 = this;
      var _overload15 = overload(index, length, source);
      var _overload16 = _slicedToArray(_overload15, 4);
      index = _overload16[0];
      length = _overload16[1];
      source = _overload16[3];
      return modify.call(this, function () {
        return _this8.editor.removeFormat(index, length);
      }, source, index);
    }
  }, {
    key: "scrollIntoView",
    value: function scrollIntoView() {
      this.selection.scrollIntoView(this.scrollingContainer);
    }
  }, {
    key: "setContents",
    value: function setContents(delta) {
      var _this9 = this;
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.API */ .Z.sources.API;
      return modify.call(this, function () {
        delta = new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())(delta);
        var length = _this9.getLength();
        // Quill will set empty editor to \n
        var delete1 = _this9.editor.deleteText(0, length);
        // delta always applied before existing content
        var applied = _this9.editor.applyDelta(delta);
        // Remove extra \n from empty editor initialization
        var delete2 = _this9.editor.deleteText(_this9.getLength() - 1, 1);
        _this9.emitter.emit(Quill.events.CONTENT_SETTED);
        return delete1.compose(applied).compose(delete2);
      }, source);
    }
  }, {
    key: "setSelection",
    value: function setSelection(index, length, source) {
      if (index == null) {
        this.selection.setRange(null, length || Quill.sources.API);
      } else {
        var _overload17 = overload(index, length, source);
        var _overload18 = _slicedToArray(_overload17, 4);
        index = _overload18[0];
        length = _overload18[1];
        source = _overload18[3];
        this.selection.setRange(new _selection__WEBPACK_IMPORTED_MODULE_7__/* .Range */ .e(Math.max(0, index), length), source);
        if (source !== _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.SILENT */ .Z.sources.SILENT) {
          this.selection.scrollIntoView(this.scrollingContainer);
        }
      }
    }
  }, {
    key: "setText",
    value: function setText(text) {
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.API */ .Z.sources.API;
      var delta = new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().insert(text);
      return this.setContents(delta, source);
    }
  }, {
    key: "update",
    value: function update() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.USER */ .Z.sources.USER;
      // Will update selection before selection.update() does if text changes
      var change = this.scroll.update(source);
      this.selection.update(source);
      // TODO this is usually undefined
      return change;
    }
  }, {
    key: "updateContents",
    value: function updateContents(delta) {
      var _this10 = this;
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.API */ .Z.sources.API;
      return modify.call(this, function () {
        delta = new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())(delta);
        return _this10.editor.applyDelta(delta, source);
      }, source, true);
    }
  }], [{
    key: "debug",
    value: function debug(limit) {
      if (limit === true) {
        limit = 'log';
      }
      _logger__WEBPACK_IMPORTED_MODULE_9__/* ["default"].level */ .Z.level(limit);
    }
  }, {
    key: "find",
    value: function find(node) {
      return _instances__WEBPACK_IMPORTED_MODULE_8__/* ["default"].get */ .Z.get(node) || globalRegistry.find(node);
    }
  }, {
    key: "import",
    value: function _import(name) {
      if (this.imports[name] == null) {
        debug.error("Cannot import ".concat(name, ". Are you sure it was registered?"));
      }
      return this.imports[name];
    }
  }, {
    key: "register",
    value: function register(path, target) {
      var _this11 = this;
      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (typeof path !== 'string') {
        var name = path.attrName || path.blotName;
        if (typeof name === 'string') {
          // register(Blot | Attributor, overwrite)
          this.register("formats/".concat(name), path, target);
        } else {
          Object.keys(path).forEach(function (key) {
            _this11.register(key, path[key], target);
          });
        }
      } else {
        if (this.imports[path] != null && !overwrite) {
          debug.warn("Overwriting ".concat(path, " with"), target);
        }
        this.imports[path] = target;
        if ((path.indexOf('blots/') === 0 || path.indexOf('formats/') === 0) && target.blotName !== 'abstract') {
          globalRegistry.register(target);
        }
        if (typeof target.register === 'function') {
          target.register(globalRegistry);
        }
      }
    }
  }]);
  return Quill;
}();
Quill.DEFAULTS = {
  bounds: null,
  modules: {},
  placeholder: '',
  readOnly: false,
  registry: globalRegistry,
  scrollingContainer: null,
  theme: 'default'
};
Quill.events = _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].events */ .Z.events;
Quill.sources = _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources */ .Z.sources;
// eslint-disable-next-line no-undef
Quill.version =  false ? 0 : "1.6.2";
Quill.imports = {
  delta: (quill_delta__WEBPACK_IMPORTED_MODULE_0___default()),
  parchment: parchment__WEBPACK_IMPORTED_MODULE_3__,
  'core/module': _module__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z,
  'core/theme': _theme__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z
};
function expandConfig(container, userConfig) {
  userConfig = lodash_merge__WEBPACK_IMPORTED_MODULE_2___default()({
    container: container,
    modules: {
      clipboard: true,
      keyboard: true,
      history: true,
      uploader: true
    }
  }, userConfig);
  if (!userConfig.theme || userConfig.theme === Quill.DEFAULTS.theme) {
    userConfig.theme = _theme__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z;
  } else {
    userConfig.theme = Quill.import("themes/".concat(userConfig.theme));
    if (userConfig.theme == null) {
      throw new Error("Invalid theme ".concat(userConfig.theme, ". Did you register it?"));
    }
  }
  var themeConfig = lodash_clonedeep__WEBPACK_IMPORTED_MODULE_1___default()(userConfig.theme.DEFAULTS);
  [themeConfig, userConfig].forEach(function (config) {
    config.modules = config.modules || {};
    Object.keys(config.modules).forEach(function (module) {
      if (config.modules[module] === true) {
        config.modules[module] = {};
      }
    });
  });
  var moduleNames = Object.keys(themeConfig.modules).concat(Object.keys(userConfig.modules));
  var moduleConfig = moduleNames.reduce(function (config, name) {
    var moduleClass = Quill.import("modules/".concat(name));
    if (moduleClass == null) {
      debug.error("Cannot load ".concat(name, " module. Are you sure you registered it?"));
    } else {
      config[name] = moduleClass.DEFAULTS || {};
    }
    return config;
  }, {});
  // Special case toolbar shorthand
  if (userConfig.modules != null && userConfig.modules.toolbar && userConfig.modules.toolbar.constructor !== Object) {
    userConfig.modules.toolbar = {
      container: userConfig.modules.toolbar
    };
  }
  userConfig = lodash_merge__WEBPACK_IMPORTED_MODULE_2___default()({}, Quill.DEFAULTS, {
    modules: moduleConfig
  }, themeConfig, userConfig);
  ['bounds', 'container', 'scrollingContainer'].forEach(function (key) {
    if (typeof userConfig[key] === 'string') {
      userConfig[key] = document.querySelector(userConfig[key]);
    }
  });
  userConfig.modules = Object.keys(userConfig.modules).reduce(function (config, name) {
    if (userConfig.modules[name]) {
      config[name] = userConfig.modules[name];
    }
    return config;
  }, {});
  return userConfig;
}

// Handle selection preservation and TEXT_CHANGE emission
// common to modification APIs
function modify(modifier, source, index, shift) {
  if (!this.isEnabled() && source === _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.USER */ .Z.sources.USER && !this.allowReadOnlyEdits) {
    return new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())();
  }
  var range = index == null ? null : this.getSelection();
  var oldDelta = this.editor.delta;
  var change = modifier();
  if (range != null) {
    if (index === true) {
      index = range.index; // eslint-disable-line prefer-destructuring
    }

    if (shift == null) {
      range = shiftRange(range, change, source);
    } else if (shift !== 0) {
      range = shiftRange(range, index, shift, source);
    }
    this.setSelection(range, _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.SILENT */ .Z.sources.SILENT);
  }
  if (change.length() > 0) {
    var _this$emitter4;
    var args = [_emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].events.TEXT_CHANGE */ .Z.events.TEXT_CHANGE, change, oldDelta, source];
    (_this$emitter4 = this.emitter).emit.apply(_this$emitter4, [_emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].events.EDITOR_CHANGE */ .Z.events.EDITOR_CHANGE].concat(args));
    if (source !== _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.SILENT */ .Z.sources.SILENT) {
      var _this$emitter5;
      (_this$emitter5 = this.emitter).emit.apply(_this$emitter5, args);
    }
  }
  return change;
}
function overload(index, length, name, value, source) {
  var formats = {};
  if (typeof index.index === 'number' && typeof index.length === 'number') {
    // Allow for throwaway end (used by insertText/insertEmbed)
    if (typeof length !== 'number') {
      source = value;
      value = name;
      name = length;
      length = index.length; // eslint-disable-line prefer-destructuring
      index = index.index; // eslint-disable-line prefer-destructuring
    } else {
      length = index.length; // eslint-disable-line prefer-destructuring
      index = index.index; // eslint-disable-line prefer-destructuring
    }
  } else if (typeof length !== 'number') {
    source = value;
    value = name;
    name = length;
    length = 0;
  }
  // Handle format being object, two format name/value strings or excluded
  if (_typeof(name) === 'object') {
    formats = name;
    source = value;
  } else if (typeof name === 'string') {
    if (value != null) {
      formats[name] = value;
    } else {
      source = name;
    }
  }
  // Handle optional source
  source = source || _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.API */ .Z.sources.API;
  return [index, length, formats, source];
}
function shiftRange(range, index, length, source) {
  if (range == null) return null;
  var start;
  var end;
  if (index instanceof (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())) {
    var _map = [range.index, range.index + range.length].map(function (pos) {
      return index.transformPosition(pos, source !== _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.USER */ .Z.sources.USER);
    });
    var _map2 = _slicedToArray(_map, 2);
    start = _map2[0];
    end = _map2[1];
  } else {
    var _map3 = [range.index, range.index + range.length].map(function (pos) {
      if (pos < index || pos === index && source === _emitter__WEBPACK_IMPORTED_MODULE_5__/* ["default"].sources.USER */ .Z.sources.USER) return pos;
      if (length >= 0) {
        return pos + length;
      }
      return Math.max(index, pos + length);
    });
    var _map4 = _slicedToArray(_map3, 2);
    start = _map4[0];
    end = _map4[1];
  }
  return new _selection__WEBPACK_IMPORTED_MODULE_7__/* .Range */ .e(start, end - start);
}


/***/ }),

/***/ 2539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Selection),
/* harmony export */   "e": () => (/* binding */ Range)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
/* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8805);
/* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_clonedeep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2722);
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isequal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2069);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3122);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var debug = (0,_logger__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)('quill:selection');
var Range = /*#__PURE__*/_createClass(function Range(index) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  _classCallCheck(this, Range);
  this.index = index;
  this.length = length;
});
var Selection = /*#__PURE__*/function () {
  function Selection(scroll, emitter) {
    var _this = this;
    _classCallCheck(this, Selection);
    this.emitter = emitter;
    this.scroll = scroll;
    this.composing = false;
    this.mouseDown = false;
    this.root = this.scroll.domNode;
    this.cursor = this.scroll.create('cursor', this);
    // savedRange is last non-null range
    this.savedRange = new Range(0, 0);
    this.lastRange = this.savedRange;
    this.lastNative = null;
    this.handleComposition();
    this.handleDragging();
    this.emitter.listenDOM('selectionchange', document, function () {
      if (!_this.mouseDown && !_this.composing) {
        setTimeout(_this.update.bind(_this, _emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.USER */ .Z.sources.USER), 1);
      }
    });
    this.emitter.on(_emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].events.SCROLL_BEFORE_UPDATE */ .Z.events.SCROLL_BEFORE_UPDATE, function () {
      if (!_this.hasFocus()) return;
      var native = _this.getNativeRange();
      if (native == null) return;
      if (native.start.node === _this.cursor.textNode) return; // cursor.restore() will handle
      _this.emitter.once(_emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].events.SCROLL_UPDATE */ .Z.events.SCROLL_UPDATE, function () {
        try {
          if (_this.root.contains(native.start.node) && _this.root.contains(native.end.node)) {
            _this.setNativeRange(native.start.node, native.start.offset, native.end.node, native.end.offset);
          }
          _this.update(_emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.SILENT */ .Z.sources.SILENT);
        } catch (ignored) {
          // ignore
        }
      });
    });
    this.emitter.on(_emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].events.SCROLL_OPTIMIZE */ .Z.events.SCROLL_OPTIMIZE, function (mutations, context) {
      if (context.range) {
        var _context$range = context.range,
          startNode = _context$range.startNode,
          startOffset = _context$range.startOffset,
          endNode = _context$range.endNode,
          endOffset = _context$range.endOffset;
        _this.setNativeRange(startNode, startOffset, endNode, endOffset);
        _this.update(_emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.SILENT */ .Z.sources.SILENT);
      }
    });
    this.update(_emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.SILENT */ .Z.sources.SILENT);
  }
  _createClass(Selection, [{
    key: "handleComposition",
    value: function handleComposition() {
      var _this2 = this;
      this.root.addEventListener('compositionstart', function () {
        _this2.composing = true;
        _this2.scroll.batchStart();
      });
      this.root.addEventListener('compositionend', function () {
        _this2.scroll.batchEnd();
        _this2.composing = false;
        if (_this2.cursor.parent) {
          var range = _this2.cursor.restore();
          if (!range) return;
          setTimeout(function () {
            _this2.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);
          }, 1);
        }
      });
    }
  }, {
    key: "handleDragging",
    value: function handleDragging() {
      var _this3 = this;
      this.emitter.listenDOM('mousedown', document.body, function () {
        _this3.mouseDown = true;
      });
      this.emitter.listenDOM('mouseup', document.body, function () {
        _this3.mouseDown = false;
        _this3.update(_emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.USER */ .Z.sources.USER);
      });
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.hasFocus()) return;
      this.root.focus();
      this.setRange(this.savedRange);
    }
  }, {
    key: "format",
    value: function format(_format, value) {
      this.scroll.update();
      var nativeRange = this.getNativeRange();
      if (nativeRange == null || !nativeRange.native.collapsed || this.scroll.query(_format, parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.BLOCK)) return;
      if (nativeRange.start.node !== this.cursor.textNode) {
        var blot = this.scroll.find(nativeRange.start.node, false);
        if (blot == null) return;
        // TODO Give blot ability to not split
        if (blot instanceof parchment__WEBPACK_IMPORTED_MODULE_0__.LeafBlot) {
          var after = blot.split(nativeRange.start.offset);
          blot.parent.insertBefore(this.cursor, after);
        } else {
          blot.insertBefore(this.cursor, nativeRange.start.node); // Should never happen
        }

        this.cursor.attach();
      }
      this.cursor.format(_format, value);
      this.scroll.optimize();
      this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length);
      this.update();
    }
  }, {
    key: "getBounds",
    value: function getBounds(index) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var scrollLength = this.scroll.length();
      index = Math.min(index, scrollLength - 1);
      length = Math.min(index + length, scrollLength - 1) - index;
      var node;
      var _this$scroll$leaf = this.scroll.leaf(index),
        _this$scroll$leaf2 = _slicedToArray(_this$scroll$leaf, 2),
        leaf = _this$scroll$leaf2[0],
        offset = _this$scroll$leaf2[1];
      if (leaf == null) return null;
      var _this$getPositionData = this.getPositionData(leaf, offset, true);
      var _this$getPositionData2 = _slicedToArray(_this$getPositionData, 2);
      node = _this$getPositionData2[0];
      offset = _this$getPositionData2[1];
      var range = document.createRange();
      if (length > 0) {
        range.setStart(node, offset);
        var _this$scroll$leaf3 = this.scroll.leaf(index + length);
        var _this$scroll$leaf4 = _slicedToArray(_this$scroll$leaf3, 2);
        leaf = _this$scroll$leaf4[0];
        offset = _this$scroll$leaf4[1];
        if (leaf == null) return null;
        var _this$getPositionData3 = this.getPositionData(leaf, offset, true);
        var _this$getPositionData4 = _slicedToArray(_this$getPositionData3, 2);
        node = _this$getPositionData4[0];
        offset = _this$getPositionData4[1];
        range.setEnd(node, offset);
        return range.getBoundingClientRect();
      }
      var side = 'left';
      var rect;
      if (node instanceof Text) {
        if (offset < node.data.length) {
          range.setStart(node, offset);
          range.setEnd(node, offset + 1);
        } else {
          range.setStart(node, offset - 1);
          range.setEnd(node, offset);
          side = 'right';
        }
        rect = range.getBoundingClientRect();
      } else {
        rect = leaf.domNode.getBoundingClientRect();
        if (offset > 0) side = 'right';
      }
      return {
        bottom: rect.top + rect.height,
        height: rect.height,
        left: rect[side],
        right: rect[side],
        top: rect.top,
        width: 0
      };
    }
  }, {
    key: "getNativeRange",
    value: function getNativeRange() {
      var _ownerDocument$getSel, _ownerDocument$getSel2;
      var ownerDocument = this.root.getRootNode();
      var selection = (_ownerDocument$getSel = (_ownerDocument$getSel2 = ownerDocument.getSelection) === null || _ownerDocument$getSel2 === void 0 ? void 0 : _ownerDocument$getSel2.call(ownerDocument)) !== null && _ownerDocument$getSel !== void 0 ? _ownerDocument$getSel : document.getSelection();
      if (selection == null || selection.rangeCount <= 0) return null;
      var nativeRange = selection.getRangeAt(0);
      if (nativeRange == null) return null;
      var range = this.normalizeNative(nativeRange);
      debug.info('getNativeRange', range);
      return range;
    }
  }, {
    key: "getRange",
    value: function getRange() {
      var normalized = this.getNativeRange();
      if (normalized == null) return [null, null];
      var range = this.normalizedToRange(normalized);
      return [range, normalized];
    }
  }, {
    key: "hasFocus",
    value: function hasFocus() {
      var ownerDocument = this.root.getRootNode();
      return ownerDocument.activeElement === this.root || contains(this.root, ownerDocument.activeElement);
    }
  }, {
    key: "normalizedToRange",
    value: function normalizedToRange(range) {
      var _this4 = this;
      var positions = [[range.start.node, range.start.offset]];
      if (!range.native.collapsed) {
        positions.push([range.end.node, range.end.offset]);
      }
      var indexes = positions.map(function (position) {
        var _position = _slicedToArray(position, 2),
          node = _position[0],
          offset = _position[1];
        var blot = _this4.scroll.find(node, true);
        var index = blot.offset(_this4.scroll);
        if (offset === 0) {
          return index;
        }
        if (blot instanceof parchment__WEBPACK_IMPORTED_MODULE_0__.LeafBlot) {
          return index + blot.index(node, offset);
        }
        return index + blot.length();
      });
      var end = Math.min(Math.max.apply(Math, _toConsumableArray(indexes)), this.scroll.length() - 1);
      var start = Math.min.apply(Math, [end].concat(_toConsumableArray(indexes)));
      return new Range(start, end - start);
    }
  }, {
    key: "normalizeNative",
    value: function normalizeNative(nativeRange) {
      if (!contains(this.root, nativeRange.startContainer) || !nativeRange.collapsed && !contains(this.root, nativeRange.endContainer)) {
        return null;
      }
      var range = {
        start: {
          node: nativeRange.startContainer,
          offset: nativeRange.startOffset
        },
        end: {
          node: nativeRange.endContainer,
          offset: nativeRange.endOffset
        },
        native: nativeRange
      };
      [range.start, range.end].forEach(function (position) {
        var node = position.node,
          offset = position.offset;
        while (!(node instanceof Text) && node.childNodes.length > 0) {
          if (node.childNodes.length > offset) {
            node = node.childNodes[offset];
            offset = 0;
          } else if (node.childNodes.length === offset) {
            node = node.lastChild;
            if (node instanceof Text) {
              offset = node.data.length;
            } else if (node.childNodes.length > 0) {
              // Container case
              offset = node.childNodes.length;
            } else {
              // Embed case
              offset = node.childNodes.length + 1;
            }
          } else {
            break;
          }
        }
        position.node = node;
        position.offset = offset;
      });
      return range;
    }
  }, {
    key: "rangeToNative",
    value: function rangeToNative(range) {
      var _this5 = this;
      var indexes = range.collapsed ? [range.index] : [range.index, range.index + range.length];
      var args = [];
      var scrollLength = this.scroll.length();
      indexes.forEach(function (index, i) {
        index = Math.min(scrollLength - 1, index);
        var _this5$scroll$leaf = _this5.scroll.leaf(index),
          _this5$scroll$leaf2 = _slicedToArray(_this5$scroll$leaf, 2),
          leaf = _this5$scroll$leaf2[0],
          leafOffset = _this5$scroll$leaf2[1];
        var _this5$getPositionDat = _this5.getPositionData(leaf, leafOffset, i !== 0),
          _this5$getPositionDat2 = _slicedToArray(_this5$getPositionDat, 2),
          node = _this5$getPositionDat2[0],
          offset = _this5$getPositionDat2[1];
        args.push(node, offset);
      });
      if (args.length < 2) {
        return args.concat(args);
      }
      return args;
    }
  }, {
    key: "getPositionData",
    value: function getPositionData(leaf, offset, inclusive) {
      if (leaf instanceof parchment__WEBPACK_IMPORTED_MODULE_0__.LeafBlot) {
        return leaf.position(offset, inclusive);
      }
      return [leaf.domNode, offset];
    }
  }, {
    key: "scrollIntoView",
    value: function scrollIntoView(scrollingContainer) {
      var range = this.lastRange;
      if (range == null) return;
      var bounds = this.getBounds(range.index, range.length);
      if (bounds == null) return;
      var limit = this.scroll.length() - 1;
      var _this$scroll$line = this.scroll.line(Math.min(range.index, limit)),
        _this$scroll$line2 = _slicedToArray(_this$scroll$line, 1),
        first = _this$scroll$line2[0];
      var last = first;
      if (range.length > 0) {
        var _this$scroll$line3 = this.scroll.line(Math.min(range.index + range.length, limit));
        var _this$scroll$line4 = _slicedToArray(_this$scroll$line3, 1);
        last = _this$scroll$line4[0];
      }
      if (first == null || last == null) return;
      var scrollBounds = scrollingContainer.getBoundingClientRect();
      if (bounds.top < scrollBounds.top) {
        scrollingContainer.scrollTop -= scrollBounds.top - bounds.top;
      } else if (bounds.bottom > scrollBounds.bottom) {
        scrollingContainer.scrollTop += bounds.bottom - scrollBounds.bottom;
      }
    }
  }, {
    key: "setNativeRange",
    value: function setNativeRange(startNode, startOffset) {
      var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : startNode;
      var endOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : startOffset;
      var force = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      debug.info('setNativeRange', startNode, startOffset, endNode, endOffset);
      if (startNode != null && (this.root.parentNode == null || startNode.parentNode == null || endNode.parentNode == null)) {
        return;
      }
      var selection = document.getSelection();
      if (selection == null) return;
      if (startNode != null) {
        if (!this.hasFocus()) this.root.focus();
        var _ref = this.getNativeRange() || {},
          native = _ref.native;
        if (native == null || force || startNode !== native.startContainer || startOffset !== native.startOffset || endNode !== native.endContainer || endOffset !== native.endOffset) {
          if (startNode.tagName === 'BR') {
            startOffset = Array.from(startNode.parentNode.childNodes).indexOf(startNode);
            startNode = startNode.parentNode;
          }
          if (endNode.tagName === 'BR') {
            endOffset = Array.from(endNode.parentNode.childNodes).indexOf(endNode);
            endNode = endNode.parentNode;
          }
          var range = document.createRange();
          range.setStart(startNode, startOffset);
          range.setEnd(endNode, endOffset);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        selection.removeAllRanges();
        this.root.blur();
        document.body.focus(); // root.blur() not enough for IE11
      }
    }
  }, {
    key: "setRange",
    value: function setRange(range) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.API */ .Z.sources.API;
      if (typeof force === 'string') {
        source = force;
        force = false;
      }
      debug.info('setRange', range);
      if (range != null) {
        var args = this.rangeToNative(range);
        this.setNativeRange.apply(this, _toConsumableArray(args).concat([force]));
      } else {
        this.setNativeRange(null);
      }
      this.update(source);
    }
  }, {
    key: "update",
    value: function update() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.USER */ .Z.sources.USER;
      var oldRange = this.lastRange;
      var _this$getRange = this.getRange(),
        _this$getRange2 = _slicedToArray(_this$getRange, 2),
        lastRange = _this$getRange2[0],
        nativeRange = _this$getRange2[1];
      this.lastRange = lastRange;
      this.lastNative = nativeRange;
      if (this.lastRange != null) {
        this.savedRange = this.lastRange;
      }
      if (!lodash_isequal__WEBPACK_IMPORTED_MODULE_2___default()(oldRange, this.lastRange)) {
        var _this$emitter;
        if (!this.composing && nativeRange != null && nativeRange.native.collapsed && nativeRange.start.node !== this.cursor.textNode) {
          var range = this.cursor.restore();
          if (range) {
            this.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);
          }
        }
        var args = [_emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].events.SELECTION_CHANGE */ .Z.events.SELECTION_CHANGE, lodash_clonedeep__WEBPACK_IMPORTED_MODULE_1___default()(this.lastRange), lodash_clonedeep__WEBPACK_IMPORTED_MODULE_1___default()(oldRange), source];
        (_this$emitter = this.emitter).emit.apply(_this$emitter, [_emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].events.EDITOR_CHANGE */ .Z.events.EDITOR_CHANGE].concat(args));
        if (source !== _emitter__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.SILENT */ .Z.sources.SILENT) {
          var _this$emitter2;
          (_this$emitter2 = this.emitter).emit.apply(_this$emitter2, args);
        }
      }
    }
  }]);
  return Selection;
}();
function contains(parent, descendant) {
  try {
    // Firefox inserts inaccessible nodes around video elements
    descendant.parentNode; // eslint-disable-line no-unused-expressions
  } catch (e) {
    return false;
  }

  // IE11 has bug with Text nodes
  // https://connect.microsoft.com/IE/feedback/details/780874/node-contains-is-incorrect
  if (descendant instanceof Text) {
    descendant = descendant.parentNode;
  }
  return parent.contains(descendant);
}

// eslint-disable-next-line no-restricted-exports


/***/ }),

/***/ 1690:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Theme = /*#__PURE__*/function () {
  function Theme(quill, options) {
    _classCallCheck(this, Theme);
    this.quill = quill;
    this.options = options;
    this.modules = {};
  }
  _createClass(Theme, [{
    key: "init",
    value: function init() {
      var _this = this;
      Object.keys(this.options.modules).forEach(function (name) {
        if (_this.modules[name] == null) {
          _this.addModule(name);
        }
      });
    }
  }, {
    key: "addModule",
    value: function addModule(name) {
      var ModuleClass = this.quill.constructor.import("modules/".concat(name));
      this.modules[name] = new ModuleClass(this.quill, this.options.modules[name] || {});
      return this.modules[name];
    }
  }]);
  return Theme;
}();
Theme.DEFAULTS = {
  modules: {}
};
Theme.themes = {
  default: Theme
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Theme);

/***/ }),

/***/ 715:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HE": () => (/* binding */ AlignStyle),
/* harmony export */   "dk": () => (/* binding */ AlignClass),
/* harmony export */   "if": () => (/* binding */ AlignAttribute)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);

var config = {
  scope: parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.BLOCK,
  whitelist: ['right', 'center', 'justify']
};
var AlignAttribute = new parchment__WEBPACK_IMPORTED_MODULE_0__.Attributor('align', 'align', config);
var AlignClass = new parchment__WEBPACK_IMPORTED_MODULE_0__.ClassAttributor('align', 'ql-align', config);
var AlignStyle = new parchment__WEBPACK_IMPORTED_MODULE_0__.StyleAttributor('align', 'text-align', config);


/***/ }),

/***/ 7898:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ BackgroundClass),
/* harmony export */   "w": () => (/* binding */ BackgroundStyle)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6039);


var BackgroundClass = new parchment__WEBPACK_IMPORTED_MODULE_0__.ClassAttributor('background', 'ql-bg', {
  scope: parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.INLINE
});
var BackgroundStyle = new _color__WEBPACK_IMPORTED_MODULE_1__/* .ColorAttributor */ .OO('background', 'background-color', {
  scope: parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.INLINE
});


/***/ }),

/***/ 3991:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6603);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Bold = /*#__PURE__*/function (_Inline) {
  _inherits(Bold, _Inline);
  var _super = _createSuper(Bold);
  function Bold() {
    _classCallCheck(this, Bold);
    return _super.apply(this, arguments);
  }
  _createClass(Bold, [{
    key: "optimize",
    value: function optimize(context) {
      _get(_getPrototypeOf(Bold.prototype), "optimize", this).call(this, context);
      if (this.domNode.tagName !== this.statics.tagName[0]) {
        this.replaceWith(this.statics.blotName);
      }
    }
  }], [{
    key: "create",
    value: function create() {
      return _get(_getPrototypeOf(Bold), "create", this).call(this);
    }
  }, {
    key: "formats",
    value: function formats() {
      return true;
    }
  }]);
  return Bold;
}(_blots_inline__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);
Bold.blotName = 'bold';
Bold.tagName = ['STRONG', 'B'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bold);

/***/ }),

/***/ 7309:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EK": () => (/* binding */ Code),
/* harmony export */   "ZP": () => (/* binding */ CodeBlock),
/* harmony export */   "se": () => (/* binding */ CodeBlockContainer)
/* harmony export */ });
/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6446);
/* harmony import */ var _blots_break__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6192);
/* harmony import */ var _blots_cursor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3657);
/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6603);
/* harmony import */ var _blots_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8222);
/* harmony import */ var _blots_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3553);
/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(281);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var CodeBlockContainer = /*#__PURE__*/function (_Container) {
  _inherits(CodeBlockContainer, _Container);
  var _super = _createSuper(CodeBlockContainer);
  function CodeBlockContainer() {
    _classCallCheck(this, CodeBlockContainer);
    return _super.apply(this, arguments);
  }
  _createClass(CodeBlockContainer, [{
    key: "code",
    value: function code(index, length) {
      var text = this.children.map(function (child) {
        return child.length() <= 1 ? '' : child.domNode.textContent;
      }).join('\n').slice(index, index + length);
      return (0,_blots_text__WEBPACK_IMPORTED_MODULE_4__/* .escapeText */ .b)(text);
    }
  }, {
    key: "html",
    value: function html(index, length) {
      // `\n`s are needed in order to support empty lines at the beginning and the end.
      // https://html.spec.whatwg.org/multipage/syntax.html#element-restrictions
      return "<pre>\n".concat(this.code(index, length), "\n</pre>");
    }
  }], [{
    key: "create",
    value: function create(value) {
      var domNode = _get(_getPrototypeOf(CodeBlockContainer), "create", this).call(this, value);
      domNode.setAttribute('spellcheck', false);
      return domNode;
    }
  }]);
  return CodeBlockContainer;
}(_blots_container__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z);
var CodeBlock = /*#__PURE__*/function (_Block) {
  _inherits(CodeBlock, _Block);
  var _super2 = _createSuper(CodeBlock);
  function CodeBlock() {
    _classCallCheck(this, CodeBlock);
    return _super2.apply(this, arguments);
  }
  _createClass(CodeBlock, null, [{
    key: "register",
    value: function register() {
      _core_quill__WEBPACK_IMPORTED_MODULE_6__/* ["default"].register */ .ZP.register(CodeBlockContainer);
    }
  }]);
  return CodeBlock;
}(_blots_block__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);
var Code = /*#__PURE__*/function (_Inline) {
  _inherits(Code, _Inline);
  var _super3 = _createSuper(Code);
  function Code() {
    _classCallCheck(this, Code);
    return _super3.apply(this, arguments);
  }
  return _createClass(Code);
}(_blots_inline__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
Code.blotName = 'code';
Code.tagName = 'CODE';
CodeBlock.blotName = 'code-block';
CodeBlock.className = 'ql-code-block';
CodeBlock.tagName = 'DIV';
CodeBlockContainer.blotName = 'code-block-container';
CodeBlockContainer.className = 'ql-code-block-container';
CodeBlockContainer.tagName = 'DIV';
CodeBlockContainer.allowedChildren = [CodeBlock];
CodeBlock.allowedChildren = [_blots_text__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, _blots_break__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, _blots_cursor__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z];
CodeBlock.requiredContainer = CodeBlockContainer;
CodeBlock.TAB = '  ';

// eslint-disable-next-line no-restricted-exports


/***/ }),

/***/ 6039:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HQ": () => (/* binding */ ColorStyle),
/* harmony export */   "Hn": () => (/* binding */ ColorClass),
/* harmony export */   "OO": () => (/* binding */ ColorAttributor)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ColorAttributor = /*#__PURE__*/function (_StyleAttributor) {
  _inherits(ColorAttributor, _StyleAttributor);
  var _super = _createSuper(ColorAttributor);
  function ColorAttributor() {
    _classCallCheck(this, ColorAttributor);
    return _super.apply(this, arguments);
  }
  _createClass(ColorAttributor, [{
    key: "value",
    value: function value(domNode) {
      var value = _get(_getPrototypeOf(ColorAttributor.prototype), "value", this).call(this, domNode);
      if (value.indexOf('rgb(') !== 0) return value;
      value = value.replace(/^[^\d]+/, '').replace(/[^\d]+$/, '');
      var hex = value.split(',').map(function (component) {
        return "00".concat(parseInt(component, 10).toString(16)).slice(-2);
      }).join('');
      return "#".concat(hex);
    }
  }]);
  return ColorAttributor;
}(parchment__WEBPACK_IMPORTED_MODULE_0__.StyleAttributor);
var ColorClass = new parchment__WEBPACK_IMPORTED_MODULE_0__.ClassAttributor('color', 'ql-color', {
  scope: parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.INLINE
});
var ColorStyle = new ColorAttributor('color', 'color', {
  scope: parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.INLINE
});


/***/ }),

/***/ 4048:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H8": () => (/* binding */ DirectionStyle),
/* harmony export */   "IF": () => (/* binding */ DirectionAttribute),
/* harmony export */   "hY": () => (/* binding */ DirectionClass)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);

var config = {
  scope: parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.BLOCK,
  whitelist: ['rtl']
};
var DirectionAttribute = new parchment__WEBPACK_IMPORTED_MODULE_0__.Attributor('direction', 'dir', config);
var DirectionClass = new parchment__WEBPACK_IMPORTED_MODULE_0__.ClassAttributor('direction', 'ql-direction', config);
var DirectionStyle = new parchment__WEBPACK_IMPORTED_MODULE_0__.StyleAttributor('direction', 'direction', config);


/***/ }),

/***/ 5832:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ FontStyle),
/* harmony export */   "_": () => (/* binding */ FontClass)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var config = {
  scope: parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.INLINE,
  whitelist: ['serif', 'monospace']
};
var FontClass = new parchment__WEBPACK_IMPORTED_MODULE_0__.ClassAttributor('font', 'ql-font', config);
var FontStyleAttributor = /*#__PURE__*/function (_StyleAttributor) {
  _inherits(FontStyleAttributor, _StyleAttributor);
  var _super = _createSuper(FontStyleAttributor);
  function FontStyleAttributor() {
    _classCallCheck(this, FontStyleAttributor);
    return _super.apply(this, arguments);
  }
  _createClass(FontStyleAttributor, [{
    key: "value",
    value: function value(node) {
      return _get(_getPrototypeOf(FontStyleAttributor.prototype), "value", this).call(this, node).replace(/["']/g, '');
    }
  }]);
  return FontStyleAttributor;
}(parchment__WEBPACK_IMPORTED_MODULE_0__.StyleAttributor);
var FontStyle = new FontStyleAttributor('font', 'font-family', config);


/***/ }),

/***/ 7256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ _sanitize),
/* harmony export */   "Z": () => (/* binding */ Link)
/* harmony export */ });
/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6603);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Link = /*#__PURE__*/function (_Inline) {
  _inherits(Link, _Inline);
  var _super = _createSuper(Link);
  function Link() {
    _classCallCheck(this, Link);
    return _super.apply(this, arguments);
  }
  _createClass(Link, [{
    key: "format",
    value: function format(name, value) {
      if (name !== this.statics.blotName || !value) {
        _get(_getPrototypeOf(Link.prototype), "format", this).call(this, name, value);
      } else {
        this.domNode.setAttribute('href', this.constructor.sanitize(value));
      }
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(Link), "create", this).call(this, value);
      node.setAttribute('href', this.sanitize(value));
      node.setAttribute('rel', 'noopener noreferrer');
      node.setAttribute('target', '_blank');
      return node;
    }
  }, {
    key: "formats",
    value: function formats(domNode) {
      return domNode.getAttribute('href');
    }
  }, {
    key: "sanitize",
    value: function sanitize(url) {
      return _sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
    }
  }]);
  return Link;
}(_blots_inline__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);
Link.blotName = 'link';
Link.tagName = 'A';
Link.SANITIZED_URL = 'about:blank';
Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];
function _sanitize(url, protocols) {
  var anchor = document.createElement('a');
  anchor.href = url;
  var protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}

// eslint-disable-next-line no-restricted-exports


/***/ }),

/***/ 1629:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SizeStyle),
/* harmony export */   "m": () => (/* binding */ SizeClass)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);

var SizeClass = new parchment__WEBPACK_IMPORTED_MODULE_0__.ClassAttributor('size', 'ql-size', {
  scope: parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.INLINE,
  whitelist: ['small', 'large', 'huge']
});
var SizeStyle = new parchment__WEBPACK_IMPORTED_MODULE_0__.StyleAttributor('size', 'font-size', {
  scope: parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.INLINE,
  whitelist: ['10px', '18px', '32px']
});


/***/ }),

/***/ 1342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Du": () => (/* binding */ CELL_FORMATS),
/* harmony export */   "h6": () => (/* binding */ CELL_ATTRIBUTORS),
/* harmony export */   "kk": () => (/* binding */ TABLE_CELL_STYLE_ATTRIBUTORS),
/* harmony export */   "yA": () => (/* binding */ TABLE_CELL_ATTR_ATTRIBUTORS)
/* harmony export */ });
/* harmony import */ var _prepare_attributor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6062);
/* harmony import */ var _prepare_style_attributor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1801);
/* harmony import */ var _cell_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8252);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var TABLE_CELL_ATTR_ATTRIBUTORS = _cell_config__WEBPACK_IMPORTED_MODULE_2__/* .TABLE_CELL_ATTRIBUTES.map */ .F1.map(function (attrName) {
  return (0,_prepare_attributor__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(_cell_config__WEBPACK_IMPORTED_MODULE_2__/* .cellConfig */ .Pw, attrName);
});
var TABLE_CELL_STYLE_ATTRIBUTORS = _cell_config__WEBPACK_IMPORTED_MODULE_2__/* .TABLE_CELL_STYLES.map */ .Mu.map(function (styleName) {
  return (0,_prepare_style_attributor__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(_cell_config__WEBPACK_IMPORTED_MODULE_2__/* .cellConfig */ .Pw, styleName);
});
var CELL_FORMATS = TABLE_CELL_STYLE_ATTRIBUTORS.reduce(function (result, attributor) {
  result[attributor.attrName] = attributor;
  return result;
}, {});
var CELL_ATTRIBUTORS = [].concat(_toConsumableArray(TABLE_CELL_ATTR_ATTRIBUTORS), _toConsumableArray(TABLE_CELL_STYLE_ATTRIBUTORS)).reduce(function (result, attributor) {
  result[attributor.keyName] = attributor;
  return result;
}, {});

/***/ }),

/***/ 8252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F1": () => (/* binding */ TABLE_CELL_ATTRIBUTES),
/* harmony export */   "Mu": () => (/* binding */ TABLE_CELL_STYLES),
/* harmony export */   "Pw": () => (/* binding */ cellConfig),
/* harmony export */   "fU": () => (/* binding */ TABLE_CELL_KEY_NAME_SET)
/* harmony export */ });
var cellConfig = {
  name: 'cell',
  allowedTags: ['TH', 'TD', 'TR']
};
var TABLE_CELL_ATTRIBUTES = ['height', 'width'];
var TABLE_CELL_STYLES = ['height', 'width', 'vertical-align', 'text-align', 'background-color', 'border', 'border-style', 'border-width', 'border-color', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'];
var TABLE_CELL_KEY_NAME_SET = new Set([].concat(TABLE_CELL_ATTRIBUTES, TABLE_CELL_STYLES));

/***/ }),

/***/ 6062:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ prepareAttributor)
/* harmony export */ });
/* harmony import */ var _attributors_attributor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1674);
/* harmony import */ var _utils_capitalize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2141);
/* harmony import */ var _attributors_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3398);
var _excluded = ["name"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



function prepareAttributor(_ref, domAttrName) {
  var name = _ref.name,
    elementConfig = _objectWithoutProperties(_ref, _excluded);
  var attrName = "".concat(name).concat((0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(domAttrName));
  var keyName = "".concat(_attributors_utils__WEBPACK_IMPORTED_MODULE_1__/* .KeyNameType.attribute */ .WT.attribute).concat(name, "_").concat(domAttrName);
  return new _attributors_attributor__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(attrName, keyName, elementConfig);
}

/***/ }),

/***/ 1801:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ prepareStyleAttributor)
/* harmony export */ });
/* harmony import */ var _attributors_style_attributor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4569);
/* harmony import */ var _utils_capitalize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2141);
/* harmony import */ var _attributors_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3398);
var _excluded = ["name", "formatName"];
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



function prepareStyleAttributor(_ref, prop) {
  var name = _ref.name,
    formatName = _ref.formatName,
    elementConfig = _objectWithoutProperties(_ref, _excluded);
  var _prop$split = prop.split('-'),
    _prop$split2 = _slicedToArray(_prop$split, 2),
    propName = _prop$split2[0],
    propSubName = _prop$split2[1];
  var attrName = "".concat(name).concat((0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(formatName !== null && formatName !== void 0 ? formatName : propName)).concat(propSubName ? (0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(propSubName) : '');
  var keyName = "".concat(_attributors_utils__WEBPACK_IMPORTED_MODULE_1__/* .KeyNameType.style */ .WT.style).concat(name, "_").concat(prop);
  return new _attributors_style_attributor__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(attrName, keyName, elementConfig);
}

/***/ }),

/***/ 319:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Qu": () => (/* binding */ TABLE_ATTR_ATTRIBUTORS),
/* harmony export */   "VT": () => (/* binding */ TABLE_STYLE_ATTRIBUTORS),
/* harmony export */   "Zt": () => (/* binding */ TABLE_ATTRIBUTORS),
/* harmony export */   "li": () => (/* binding */ TABLE_FORMATS)
/* harmony export */ });
/* harmony import */ var _prepare_attributor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6062);
/* harmony import */ var _prepare_style_attributor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1801);
/* harmony import */ var _table_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var TABLE_ATTR_ATTRIBUTORS = _table_config__WEBPACK_IMPORTED_MODULE_2__/* .TABLE_ATTRIBUTES.map */ .N2.map(function (attrName) {
  return (0,_prepare_attributor__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(_table_config__WEBPACK_IMPORTED_MODULE_2__/* .tableConfig */ .Sp, attrName);
});
var TABLE_STYLE_ATTRIBUTORS = _table_config__WEBPACK_IMPORTED_MODULE_2__/* .TABLE_STYLES.map */ .GX.map(function (styleName) {
  return (0,_prepare_style_attributor__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(_table_config__WEBPACK_IMPORTED_MODULE_2__/* .tableConfig */ .Sp, styleName);
});
var TABLE_FORMATS = TABLE_STYLE_ATTRIBUTORS.reduce(function (result, attributor) {
  result[attributor.attrName] = attributor;
  return result;
}, {});
var TABLE_ATTRIBUTORS = [].concat(_toConsumableArray(TABLE_ATTR_ATTRIBUTORS), _toConsumableArray(TABLE_STYLE_ATTRIBUTORS)).reduce(function (result, attributor) {
  result[attributor.keyName] = attributor;
  return result;
}, {});

/***/ }),

/***/ 19:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GX": () => (/* binding */ TABLE_STYLES),
/* harmony export */   "N2": () => (/* binding */ TABLE_ATTRIBUTES),
/* harmony export */   "Sp": () => (/* binding */ tableConfig),
/* harmony export */   "bc": () => (/* binding */ TABLE_KEY_NAME_SET)
/* harmony export */ });
var tableConfig = {
  name: 'table',
  allowedTags: ['TABLE']
};
var TABLE_ATTRIBUTES = ['height', 'width'];
var TABLE_STYLES = ['height', 'width', 'text-align', 'background-color', 'border', 'border-style', 'border-width', 'border-color'];
var TABLE_KEY_NAME_SET = new Set([].concat(TABLE_ATTRIBUTES, TABLE_STYLES));

/***/ }),

/***/ 8536:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ getId)
/* harmony export */ });
function getId() {
  return Math.random().toString(36).slice(2, 6);
}

/***/ }),

/***/ 1969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KA": () => (/* binding */ TableHeaderRow),
/* harmony export */   "Lv": () => (/* binding */ tableId),
/* harmony export */   "RM": () => (/* binding */ TableBody),
/* harmony export */   "SC": () => (/* binding */ TableRow),
/* harmony export */   "iD": () => (/* binding */ HeaderCellLine),
/* harmony export */   "pj": () => (/* binding */ TableCell),
/* harmony export */   "xD": () => (/* binding */ TableHeader),
/* harmony export */   "xJ": () => (/* binding */ TableContainer),
/* harmony export */   "xs": () => (/* binding */ TableHeaderCell),
/* harmony export */   "zW": () => (/* binding */ CellLine)
/* harmony export */ });
/* unused harmony export TABLE_TAGS */
/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6446);
/* harmony import */ var _blots_break__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6192);
/* harmony import */ var _blots_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3553);
/* harmony import */ var _utils_is_defined__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5874);
/* harmony import */ var _attributors_cell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1342);
/* harmony import */ var _attributors_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(319);
/* harmony import */ var _get_id__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8536);
/* harmony import */ var _toggle_attribute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2795);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








var CELL_IDENTITY_KEYS = ['row', 'cell'];
var TABLE_TAGS = (/* unused pure expression or super */ null && (['TD', 'TH', 'TR', 'TBODY', 'THEAD', 'TABLE']));
var DATA_PREFIX = 'data-table-';
function deleteChildrenAt(children, index, length) {
  children.forEachAt(index, length, function (child, offset, childLength) {
    child.deleteAt(offset, childLength);
  });
}
var CellLine = /*#__PURE__*/function (_Block) {
  _inherits(CellLine, _Block);
  var _super = _createSuper(CellLine);
  function CellLine() {
    _classCallCheck(this, CellLine);
    return _super.apply(this, arguments);
  }
  _createClass(CellLine, [{
    key: "optimize",
    value: function optimize() {
      var _get2;
      var rowId = this.domNode.getAttribute("".concat(DATA_PREFIX, "row"));
      if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
        var domNode = this.domNode;
        var formats = {
          row: rowId
        };
        Object.keys(_attributors_cell__WEBPACK_IMPORTED_MODULE_3__/* .CELL_FORMATS */ .Du).forEach(function (format) {
          var value = domNode.dataset[format.toLowerCase()];
          if (value) {
            formats[format] = value;
          }
        });
        this.wrap(this.statics.requiredContainer.blotName, formats);
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      (_get2 = _get(_getPrototypeOf(CellLine.prototype), "optimize", this)).call.apply(_get2, [this].concat(args));
    }
  }, {
    key: "format",
    value: function format(name, value) {
      var isCellLine = name === 'tableCellLine';
      if (isCellLine && value === null) {
        value = this.formats().tableCellLine;
      }
      var isCell = CELL_IDENTITY_KEYS.indexOf(name) > -1;
      if (isCell || _attributors_table__WEBPACK_IMPORTED_MODULE_4__/* .TABLE_FORMATS */ .li[name] || _attributors_cell__WEBPACK_IMPORTED_MODULE_3__/* .CELL_FORMATS */ .Du[name]) {
        var attrName = "data-".concat(isCell ? 'table-' : '').concat(name.toLowerCase());
        (0,_toggle_attribute__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(this.domNode, attrName, value);
        if (_attributors_cell__WEBPACK_IMPORTED_MODULE_3__/* .CELL_FORMATS */ .Du[name]) {
          var _this$cell;
          (_this$cell = this.cell()) === null || _this$cell === void 0 ? void 0 : _this$cell.format(name, value);
        }
        if (_attributors_table__WEBPACK_IMPORTED_MODULE_4__/* .TABLE_FORMATS */ .li[name]) {
          var _this$cell2, _this$cell2$table;
          (_this$cell2 = this.cell()) === null || _this$cell2 === void 0 ? void 0 : (_this$cell2$table = _this$cell2.table()) === null || _this$cell2$table === void 0 ? void 0 : _this$cell2$table.format(name, value);
        }
      } else {
        _get(_getPrototypeOf(CellLine.prototype), "format", this).call(this, name, value);
      }
    }
  }, {
    key: "cell",
    value: function cell() {
      return 'row' in this.parent ? this.parent : null;
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(CellLine), "create", this).call(this, value);
      CELL_IDENTITY_KEYS.forEach(function (key) {
        var _value$key;
        var identityMarker = key === 'row' ? tableId : cellId;
        node.setAttribute("".concat(DATA_PREFIX).concat(key), (_value$key = value === null || value === void 0 ? void 0 : value[key]) !== null && _value$key !== void 0 ? _value$key : identityMarker());
      });
      return node;
    }
  }, {
    key: "formats",
    value: function formats(domNode) {
      return CELL_IDENTITY_KEYS.reduce(function (formats, attribute) {
        var attrName = "".concat(DATA_PREFIX).concat(attribute);
        if (domNode.hasAttribute(attrName)) {
          formats[attribute] = domNode.getAttribute(attrName) || undefined;
        }
        return formats;
      }, {});
    }
  }]);
  return CellLine;
}(_blots_block__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);
CellLine.blotName = 'tableCellLine';
CellLine.className = 'ql-table-cell-line';
CellLine.tagName = 'P';
var HeaderCellLine = /*#__PURE__*/function (_CellLine) {
  _inherits(HeaderCellLine, _CellLine);
  var _super2 = _createSuper(HeaderCellLine);
  function HeaderCellLine() {
    _classCallCheck(this, HeaderCellLine);
    return _super2.apply(this, arguments);
  }
  return _createClass(HeaderCellLine);
}(CellLine);
HeaderCellLine.blotName = 'tableHeaderCellLine';
HeaderCellLine.className = 'ql-table-header-cell-line';
var BaseCell = /*#__PURE__*/function (_Container) {
  _inherits(BaseCell, _Container);
  var _super3 = _createSuper(BaseCell);
  function BaseCell() {
    _classCallCheck(this, BaseCell);
    return _super3.apply(this, arguments);
  }
  _createClass(BaseCell, [{
    key: "format",
    value: function format(name, value) {
      var _CELL_FORMATS$name;
      (_CELL_FORMATS$name = _attributors_cell__WEBPACK_IMPORTED_MODULE_3__/* .CELL_FORMATS */ .Du[name]) === null || _CELL_FORMATS$name === void 0 ? void 0 : _CELL_FORMATS$name.add(this.domNode, value);
    }
  }, {
    key: "checkMerge",
    value: function checkMerge() {
      if (_get(_getPrototypeOf(BaseCell.prototype), "checkMerge", this).call(this) && this.next.children.head != null) {
        var thisHead = this.children.head.formats()[this.children.head.statics.blotName];
        var thisTail = this.children.tail.formats()[this.children.tail.statics.blotName];
        var nextHead = this.next.children.head.formats()[this.next.children.head.statics.blotName];
        var nextTail = this.next.children.tail.formats()[this.next.children.tail.statics.blotName];
        return thisHead.cell === thisTail.cell && thisHead.cell === nextHead.cell && thisHead.cell === nextTail.cell;
      }
      return false;
    }
  }, {
    key: "formats",
    value: function formats() {
      return BaseCell.cellFormats(this.domNode);
    }
  }, {
    key: "cellOffset",
    value: function cellOffset() {
      if (this.parent) {
        return this.parent.children.indexOf(this);
      }
      return -1;
    }
  }, {
    key: "row",
    value: function row() {
      return 'table' in this.parent ? this.parent : null;
    }
  }, {
    key: "rowOffset",
    value: function rowOffset() {
      if (this.row()) {
        return this.row().rowOffset();
      }
      return -1;
    }
  }, {
    key: "table",
    value: function table() {
      var _this$row;
      return (_this$row = this.row()) === null || _this$row === void 0 ? void 0 : _this$row.table();
    }
  }, {
    key: "optimize",
    value: function optimize() {
      var _this$domNode$getAttr, _get3;
      var rowId = (_this$domNode$getAttr = this.domNode.getAttribute("".concat(DATA_PREFIX, "row"))) !== null && _this$domNode$getAttr !== void 0 ? _this$domNode$getAttr : this.domNode.getAttribute("".concat(DATA_PREFIX, "header-row"));
      if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
        this.wrap(this.statics.requiredContainer.blotName, {
          row: rowId
        });
      }
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      (_get3 = _get(_getPrototypeOf(BaseCell.prototype), "optimize", this)).call.apply(_get3, [this].concat(args));
    }
  }, {
    key: "deleteAt",
    value: function deleteAt(index, length) {
      deleteChildrenAt(this.children, index, length);
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(BaseCell), "create", this).call(this, value);
      if (value) {
        Object.keys(value).forEach(function (format) {
          var _CELL_FORMATS$format;
          (_CELL_FORMATS$format = _attributors_cell__WEBPACK_IMPORTED_MODULE_3__/* .CELL_FORMATS */ .Du[format]) === null || _CELL_FORMATS$format === void 0 ? void 0 : _CELL_FORMATS$format.add(node, value[format]);
        });
      }
      return node;
    }
  }, {
    key: "cellFormats",
    value: function cellFormats(domNode) {
      var formats = {};
      if (domNode.hasAttribute("".concat(DATA_PREFIX, "row")) || domNode.hasAttribute("".concat(DATA_PREFIX, "header-row"))) {
        var _domNode$getAttribute;
        formats.row = (_domNode$getAttribute = domNode.getAttribute("".concat(DATA_PREFIX, "row"))) !== null && _domNode$getAttribute !== void 0 ? _domNode$getAttribute : domNode.getAttribute("".concat(DATA_PREFIX, "header-row"));
      }
      Object.keys(_attributors_cell__WEBPACK_IMPORTED_MODULE_3__/* .CELL_FORMATS */ .Du).forEach(function (format) {
        var _domNode$firstElement;
        var value = (_domNode$firstElement = domNode.firstElementChild) === null || _domNode$firstElement === void 0 ? void 0 : _domNode$firstElement.dataset[format.toLowerCase()];
        if (value) {
          formats[format] = value;
        }
      });
      return formats;
    }
  }]);
  return BaseCell;
}(_blots_container__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
BaseCell.tagName = ['TD', 'TH'];
var TableCell = /*#__PURE__*/function (_BaseCell) {
  _inherits(TableCell, _BaseCell);
  var _super4 = _createSuper(TableCell);
  function TableCell() {
    _classCallCheck(this, TableCell);
    return _super4.apply(this, arguments);
  }
  _createClass(TableCell, [{
    key: "format",
    value: function format(name, value) {
      if (name === 'row') {
        this.domNode.setAttribute("".concat(DATA_PREFIX).concat(name), value);
        this.children.forEach(function (child) {
          child.format(name, value);
        });
      } else {
        _get(_getPrototypeOf(TableCell.prototype), "format", this).call(this, name, value);
      }
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(TableCell), "create", this).call(this, value);
      var attrName = "".concat(DATA_PREFIX, "row");
      if (value !== null && value !== void 0 && value.row) {
        node.setAttribute(attrName, value.row);
      }
      return node;
    }
  }]);
  return TableCell;
}(BaseCell);
TableCell.blotName = 'tableCell';
TableCell.className = 'ql-table-data-cell';
TableCell.dataAttribute = "".concat(DATA_PREFIX, "row");
TableCell.defaultChild = CellLine;
var TableHeaderCell = /*#__PURE__*/function (_BaseCell2) {
  _inherits(TableHeaderCell, _BaseCell2);
  var _super5 = _createSuper(TableHeaderCell);
  function TableHeaderCell() {
    _classCallCheck(this, TableHeaderCell);
    return _super5.apply(this, arguments);
  }
  _createClass(TableHeaderCell, [{
    key: "format",
    value: function format(name, value) {
      if (name === 'row') {
        this.domNode.setAttribute("".concat(DATA_PREFIX).concat(name), value);
        this.children.forEach(function (child) {
          child.format(name, value);
        });
      } else {
        _get(_getPrototypeOf(TableHeaderCell.prototype), "format", this).call(this, name, value);
      }
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(TableHeaderCell), "create", this).call(this, value);
      var attrName = "".concat(DATA_PREFIX, "header-row");
      if (value && value.row) {
        node.setAttribute(attrName, value.row);
      }
      return node;
    }
  }]);
  return TableHeaderCell;
}(BaseCell);
TableHeaderCell.tagName = ['TH', 'TD'];
TableHeaderCell.className = 'ql-table-header-cell';
TableHeaderCell.blotName = 'tableHeaderCell';
TableHeaderCell.dataAttribute = "".concat(DATA_PREFIX, "header-row");
TableHeaderCell.defaultChild = HeaderCellLine;
var BaseRow = /*#__PURE__*/function (_Container2) {
  _inherits(BaseRow, _Container2);
  var _super6 = _createSuper(BaseRow);
  function BaseRow() {
    _classCallCheck(this, BaseRow);
    return _super6.apply(this, arguments);
  }
  _createClass(BaseRow, [{
    key: "checkMerge",
    value: function checkMerge() {
      if (_get(_getPrototypeOf(BaseRow.prototype), "checkMerge", this).call(this) && (0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this.next.children.head)) {
        var formatName = 'row';
        var thisHead = this.children.head.formats();
        var thisTail = this.children.tail.formats();
        var nextHead = this.next.children.head.formats();
        var nextTail = this.next.children.tail.formats();
        return thisHead[formatName] === thisTail[formatName] && thisHead[formatName] === nextHead[formatName] && thisHead[formatName] === nextTail[formatName];
      }
      return false;
    }
  }, {
    key: "optimize",
    value: function optimize() {
      var _get4,
        _this = this;
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      (_get4 = _get(_getPrototypeOf(BaseRow.prototype), "optimize", this)).call.apply(_get4, [this].concat(args));
      var formatName = this.childFormatName;
      this.children.forEach(function (child) {
        if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(child.next)) {
          return;
        }
        var childFormats = child.formats();
        var nextFormats = child.next.formats();
        if (childFormats[formatName] !== nextFormats[formatName]) {
          var next = _this.splitAfter(child);
          if (next) {
            next.optimize();
          }
          if (_this.prev) {
            _this.prev.optimize();
          }
        }
      });
    }
  }, {
    key: "rowOffset",
    value: function rowOffset() {
      if (this.parent) {
        return this.parent.children.indexOf(this);
      }
      return -1;
    }
  }, {
    key: "table",
    value: function table() {
      var _this$parent;
      return (_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.parent;
    }
  }, {
    key: "formats",
    value: function formats() {
      var formats = {};
      var attrName = "".concat(DATA_PREFIX, "row");
      if (this.domNode.hasAttribute(attrName)) {
        formats[attrName] = this.domNode.getAttribute(attrName);
      }
      return formats;
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(BaseRow), "create", this).call(this, value);
      if (value !== null && value !== void 0 && value.row) {
        node.setAttribute("".concat(DATA_PREFIX, "row"), value.row);
      }
      return node;
    }
  }]);
  return BaseRow;
}(_blots_container__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
BaseRow.tagName = 'TR';
var TableRow = /*#__PURE__*/function (_BaseRow) {
  _inherits(TableRow, _BaseRow);
  var _super7 = _createSuper(TableRow);
  function TableRow(scroll, domNode) {
    var _this2;
    _classCallCheck(this, TableRow);
    _this2 = _super7.call(this, scroll, domNode);
    _this2.childFormatName = 'table';
    return _this2;
  }
  _createClass(TableRow, [{
    key: "deleteAt",
    value: function deleteAt(index, length) {
      deleteChildrenAt(this.children, index, length);
    }
  }]);
  return TableRow;
}(BaseRow);
TableRow.blotName = 'tableRow';
var TableHeaderRow = /*#__PURE__*/function (_BaseRow2) {
  _inherits(TableHeaderRow, _BaseRow2);
  var _super8 = _createSuper(TableHeaderRow);
  function TableHeaderRow(scroll, domNode) {
    var _this3;
    _classCallCheck(this, TableHeaderRow);
    _this3 = _super8.call(this, scroll, domNode);
    _this3.childFormatName = 'tableHeaderCell';
    return _this3;
  }
  return _createClass(TableHeaderRow);
}(BaseRow);
TableHeaderRow.blotName = 'tableHeaderRow';
var RowContainer = /*#__PURE__*/function (_Container3) {
  _inherits(RowContainer, _Container3);
  var _super9 = _createSuper(RowContainer);
  function RowContainer() {
    _classCallCheck(this, RowContainer);
    return _super9.apply(this, arguments);
  }
  _createClass(RowContainer, [{
    key: "optimize",
    value: function optimize() {
      var _get5;
      if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
        var domNode = this.children.head.children.head.children.head.domNode;
        var formats = {};
        Object.keys(_attributors_table__WEBPACK_IMPORTED_MODULE_4__/* .TABLE_FORMATS */ .li).forEach(function (format) {
          var value = domNode.dataset[format.toLowerCase()];
          if (value) {
            formats[format] = value;
          }
        });
        this.wrap(this.statics.requiredContainer.blotName, formats);
      }
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      (_get5 = _get(_getPrototypeOf(RowContainer.prototype), "optimize", this)).call.apply(_get5, [this].concat(args));
    }
  }]);
  return RowContainer;
}(_blots_container__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
var TableBody = /*#__PURE__*/function (_RowContainer) {
  _inherits(TableBody, _RowContainer);
  var _super10 = _createSuper(TableBody);
  function TableBody() {
    _classCallCheck(this, TableBody);
    return _super10.apply(this, arguments);
  }
  return _createClass(TableBody);
}(RowContainer);
TableBody.blotName = 'tableBody';
TableBody.tagName = 'TBODY';
var TableHeader = /*#__PURE__*/function (_RowContainer2) {
  _inherits(TableHeader, _RowContainer2);
  var _super11 = _createSuper(TableHeader);
  function TableHeader() {
    _classCallCheck(this, TableHeader);
    return _super11.apply(this, arguments);
  }
  return _createClass(TableHeader);
}(RowContainer);
TableHeader.blotName = 'tableHeader';
TableHeader.tagName = 'THEAD';
var TableContainer = /*#__PURE__*/function (_Container4) {
  _inherits(TableContainer, _Container4);
  var _super12 = _createSuper(TableContainer);
  function TableContainer() {
    _classCallCheck(this, TableContainer);
    return _super12.apply(this, arguments);
  }
  _createClass(TableContainer, [{
    key: "balanceCells",
    value: function balanceCells() {
      var headerRows = this.descendants(TableHeaderRow);
      var bodyRows = this.descendants(TableRow);
      var maxColCount = this.getMaxTableColCount(headerRows, bodyRows);
      this.balanceRows(maxColCount, headerRows, TableHeaderCell);
      this.balanceRows(maxColCount, bodyRows, TableCell);
    }
  }, {
    key: "getMaxTableColCount",
    value: function getMaxTableColCount(headerRows, bodyRows) {
      return Math.max(this.getMaxRowColCount(headerRows), this.getMaxRowColCount(bodyRows));
    }
  }, {
    key: "getMaxRowColCount",
    value: function getMaxRowColCount(rows) {
      return Math.max.apply(Math, _toConsumableArray(rows.map(function (row) {
        return row.children.length;
      })));
    }
  }, {
    key: "balanceRows",
    value: function balanceRows(maxColCount, rows, CellClass) {
      var _this4 = this;
      rows.forEach(function (row) {
        new Array(maxColCount - row.children.length).fill(0).forEach(function () {
          var value;
          if ((0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(row.children.head)) {
            value = CellClass.cellFormats(row.children.head.domNode);
          }
          var blot = _this4.scroll.create(CellClass.blotName, value);
          var cellLine = _this4.scroll.create(CellClass.allowedChildren[0].blotName, value);
          blot.appendChild(cellLine);
          row.appendChild(blot);
          blot.optimize(); // Add break blot
        });
      });
    }
  }, {
    key: "cells",
    value: function cells(column) {
      return this.rows().map(function (row) {
        return row.children.at(column);
      });
    }
  }, {
    key: "deleteColumn",
    value: function deleteColumn(index) {
      var _this5 = this;
      [TableHeader, TableBody].forEach(function (blot) {
        var _this5$descendants = _this5.descendants(blot),
          _this5$descendants2 = _slicedToArray(_this5$descendants, 1),
          tablePart = _this5$descendants2[0];
        if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(tablePart) || !(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(tablePart.children.head)) {
          return;
        }
        tablePart.children.forEach(function (row) {
          var cell = row.children.at(index);
          if ((0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(cell)) {
            cell.remove();
          }
        });
      });
    }
  }, {
    key: "insertColumn",
    value: function insertColumn(index) {
      var _this6 = this;
      [TableHeader, TableBody].forEach(function (blot) {
        var _this6$descendants = _this6.descendants(blot),
          _this6$descendants2 = _slicedToArray(_this6$descendants, 1),
          tablePart = _this6$descendants2[0];
        if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(tablePart) || !(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(tablePart.children.head)) {
          return;
        }
        var CellBlot = blot === TableHeader ? TableHeaderCell : TableCell;
        var CellLineBlot = blot === TableHeader ? HeaderCellLine : CellLine;
        tablePart.children.forEach(function (row) {
          var ref = row.children.at(index);
          var value = CellLineBlot.formats(row.children.head.children.head.domNode);
          var cell = _this6.scroll.create(CellBlot.blotName, {
            row: value.row
          });
          var cellLine = _this6.scroll.create(CellLineBlot.blotName, {
            row: value.row
          });
          var emptyLine = _this6.scroll.create(_blots_break__WEBPACK_IMPORTED_MODULE_1__/* ["default"].blotName */ .Z.blotName);
          cellLine.appendChild(emptyLine);
          cell.appendChild(cellLine);
          row.insertBefore(cell, ref);
        });
      });
    }
  }, {
    key: "insertRow",
    value: function insertRow(index) {
      var _this7 = this;
      var _this$descendants = this.descendants(TableBody),
        _this$descendants2 = _slicedToArray(_this$descendants, 1),
        body = _this$descendants2[0];
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(body) || !(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(body.children.head)) {
        return;
      }
      var id = tableId();
      var row = this.scroll.create(TableRow.blotName, {
        row: id
      });
      body.children.head.children.forEach(function () {
        var cell = _this7.scroll.create(TableCell.blotName, {
          row: id
        });
        var cellLine = _this7.scroll.create(CellLine.blotName, {
          row: id
        });
        var emptyLine = _this7.scroll.create(_blots_break__WEBPACK_IMPORTED_MODULE_1__/* ["default"].blotName */ .Z.blotName);
        cellLine.appendChild(emptyLine);
        cell.appendChild(cellLine);
        row.appendChild(cell);
      });
      var ref = body.children.at(index);
      body.insertBefore(row, ref);
    }
  }, {
    key: "insertHeaderRow",
    value: function insertHeaderRow() {
      var _this8 = this;
      var _this$descendants3 = this.descendants(TableHeader),
        _this$descendants4 = _slicedToArray(_this$descendants3, 1),
        header = _this$descendants4[0];
      var _this$descendants5 = this.descendants(TableBody),
        _this$descendants6 = _slicedToArray(_this$descendants5, 1),
        body = _this$descendants6[0];
      if ((0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(header) || !(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(body) || !(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(body.children.head)) {
        return;
      }
      var id = tableId();
      var newHeader = this.scroll.create(TableHeader.blotName);
      var row = this.scroll.create(TableHeaderRow.blotName);
      var ref = this.children.at(0);
      newHeader.appendChild(row);
      body.children.head.children.forEach(function () {
        var cell = _this8.scroll.create(TableHeaderCell.blotName, {
          row: id
        });
        var cellLine = _this8.scroll.create(HeaderCellLine.blotName, {
          row: id
        });
        var emptyLine = _this8.scroll.create(_blots_break__WEBPACK_IMPORTED_MODULE_1__/* ["default"].blotName */ .Z.blotName);
        cellLine.appendChild(emptyLine);
        cell.appendChild(cellLine);
        row.appendChild(cell);
        cell.optimize();
      });
      this.insertBefore(newHeader, ref);
    }
  }, {
    key: "rows",
    value: function rows() {
      var body = this.children.head;
      return (0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(body) ? body.children.map(function (row) {
        return row;
      }) : [];
    }
  }, {
    key: "formats",
    value: function formats() {
      var formats = {};
      var childElem = this.cells()[0].domNode.firstElementChild;
      Object.keys(_attributors_table__WEBPACK_IMPORTED_MODULE_4__/* .TABLE_FORMATS */ .li).forEach(function (format) {
        var value = childElem.dataset[format.toLowerCase()];
        if (value) {
          formats[format] = value;
        }
      });
      return formats;
    }
  }, {
    key: "format",
    value: function format(name, value) {
      var tableFormat = _attributors_table__WEBPACK_IMPORTED_MODULE_4__/* .TABLE_FORMATS */ .li[name];
      if (tableFormat) {
        var attrName = "data-".concat(name.toLowerCase());
        this.cells().forEach(function (cell) {
          (0,_toggle_attribute__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(cell.children.head.domNode, attrName, value);
        });
        tableFormat.add(this.domNode, value);
      }
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(TableContainer), "create", this).call(this, value);
      if (value) {
        Object.keys(value).forEach(function (format) {
          var _TABLE_FORMATS$format;
          (_TABLE_FORMATS$format = _attributors_table__WEBPACK_IMPORTED_MODULE_4__/* .TABLE_FORMATS */ .li[format]) === null || _TABLE_FORMATS$format === void 0 ? void 0 : _TABLE_FORMATS$format.add(node, value[format]);
        });
      }
      return node;
    }
  }]);
  return TableContainer;
}(_blots_container__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
TableContainer.blotName = 'tableContainer';
TableContainer.tagName = 'TABLE';
TableContainer.allowedChildren = [TableHeader, TableBody];
TableBody.requiredContainer = TableContainer;
TableHeader.requiredContainer = TableContainer;
TableBody.allowedChildren = [TableRow];
TableRow.requiredContainer = TableBody;
TableRow.allowedChildren = [TableCell];
TableCell.requiredContainer = TableRow;
CellLine.requiredContainer = TableCell;
TableCell.allowedChildren = [CellLine];
TableHeader.allowedChildren = [TableHeaderRow];
TableHeaderRow.requiredContainer = TableHeader;
HeaderCellLine.requiredContainer = TableHeaderCell;
TableHeaderCell.allowedChildren = [HeaderCellLine];
TableHeaderRow.allowedChildren = [TableHeaderCell];
TableHeaderCell.requiredContainer = TableHeaderRow;
function tableId() {
  return "row-".concat((0,_get_id__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)());
}
function cellId() {
  return "cell-".concat((0,_get_id__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)());
}


/***/ }),

/***/ 2795:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ toggleAttribute)
/* harmony export */ });
function toggleAttribute(domNode, attrName, value) {
  if (value) {
    domNode.setAttribute(attrName, value);
  } else {
    domNode.removeAttribute(attrName);
  }
}

/***/ }),

/***/ 5635:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HI": () => (/* binding */ applyFormat),
/* harmony export */   "PF": () => (/* binding */ deltaEndsWith),
/* harmony export */   "ZP": () => (/* binding */ Clipboard),
/* harmony export */   "fw": () => (/* binding */ traverse)
/* harmony export */ });
/* unused harmony exports matchAttributor, matchBlot, matchNewline, matchText */
/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9098);
/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1233);
/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6446);
/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(281);
/* harmony import */ var _core_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3122);
/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7094);
/* harmony import */ var _formats_align__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(715);
/* harmony import */ var _formats_background__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7898);
/* harmony import */ var _formats_code__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7309);
/* harmony import */ var _formats_color__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6039);
/* harmony import */ var _formats_direction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4048);
/* harmony import */ var _formats_font__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5832);
/* harmony import */ var _formats_size__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1629);
/* harmony import */ var _keyboard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3071);
/* harmony import */ var _utils_capitalize__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(2141);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }















var debug = (0,_core_logger__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)('quill:clipboard');
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var CLIPBOARD_CONFIG = [[TEXT_NODE, matchText], [TEXT_NODE, matchNewline], ['br', matchBreak], [ELEMENT_NODE, matchNewline], [ELEMENT_NODE, matchBlot], [ELEMENT_NODE, matchAttributor], [ELEMENT_NODE, matchStyles], ['li', matchIndent], ['ol, ul', matchList], ['pre', matchCodeBlock], ['b', matchAlias.bind(matchAlias, 'bold')], ['i', matchAlias.bind(matchAlias, 'italic')], ['strike', matchAlias.bind(matchAlias, 'strike')], ['style', matchIgnore]];
var HTML_TEXT_MATCHERS = [matchText, matchNewline];
var ATTRIBUTE_ATTRIBUTORS = [_formats_align__WEBPACK_IMPORTED_MODULE_6__/* .AlignAttribute */ ["if"], _formats_direction__WEBPACK_IMPORTED_MODULE_10__/* .DirectionAttribute */ .IF].reduce(function (memo, attr) {
  memo[attr.keyName] = attr;
  return memo;
}, {});
var STYLE_ATTRIBUTORS = [_formats_align__WEBPACK_IMPORTED_MODULE_6__/* .AlignStyle */ .HE, _formats_background__WEBPACK_IMPORTED_MODULE_7__/* .BackgroundStyle */ .w, _formats_color__WEBPACK_IMPORTED_MODULE_9__/* .ColorStyle */ .HQ, _formats_direction__WEBPACK_IMPORTED_MODULE_10__/* .DirectionStyle */ .H8, _formats_font__WEBPACK_IMPORTED_MODULE_11__/* .FontStyle */ .H, _formats_size__WEBPACK_IMPORTED_MODULE_12__/* .SizeStyle */ .Z].reduce(function (memo, attr) {
  memo[attr.keyName] = attr;
  return memo;
}, {});
var Clipboard = /*#__PURE__*/function (_Module) {
  _inherits(Clipboard, _Module);
  var _super = _createSuper(Clipboard);
  function Clipboard(quill, options) {
    var _options$tableBlots;
    var _this;
    _classCallCheck(this, Clipboard);
    _this = _super.call(this, quill, options);
    _this.quill.root.addEventListener('copy', function (e) {
      return _this.onCaptureCopy(e, false);
    });
    _this.quill.root.addEventListener('cut', function (e) {
      return _this.onCaptureCopy(e, true);
    });
    _this.quill.root.addEventListener('paste', _this.onCapturePaste.bind(_assertThisInitialized(_this)));
    _this.matchers = [];
    _this.tableBlots = (_options$tableBlots = options.tableBlots) !== null && _options$tableBlots !== void 0 ? _options$tableBlots : [];
    CLIPBOARD_CONFIG.concat(_this.options.matchers).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        selector = _ref2[0],
        matcher = _ref2[1];
      _this.addMatcher(selector, matcher);
    });
    return _this;
  }
  _createClass(Clipboard, [{
    key: "addMatcher",
    value: function addMatcher(selector, matcher) {
      this.matchers.push([selector, matcher]);
    }
  }, {
    key: "addTableBlot",
    value: function addTableBlot(blotName) {
      this.tableBlots.push(blotName);
    }
  }, {
    key: "convert",
    value: function convert(_ref3) {
      var html = _ref3.html,
        text = _ref3.text,
        keepLastNewLine = _ref3.keepLastNewLine;
      var formats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (formats[_formats_code__WEBPACK_IMPORTED_MODULE_8__/* ["default"].blotName */ .ZP.blotName]) {
        return new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().insert(text, _defineProperty({}, _formats_code__WEBPACK_IMPORTED_MODULE_8__/* ["default"].blotName */ .ZP.blotName, formats[_formats_code__WEBPACK_IMPORTED_MODULE_8__/* ["default"].blotName */ .ZP.blotName]));
      }
      return html ? this.applyMatchers(html, keepLastNewLine, formats) : this.applyTextMatchers(text);
    }
  }, {
    key: "applyTextMatchers",
    value: function applyTextMatchers() {
      var _this2 = this;
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (text.length === 0) {
        return new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())();
      }
      var matchers = this.prepareTextMatching();
      var element = this.quill.root.ownerDocument.createElement('div');
      element.textContent = text;
      var node = element.childNodes[0];
      return matchers.reduce(function (delta, matcher) {
        return matcher(node, delta, _this2.quill.scroll);
      }, new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())());
    }
  }, {
    key: "applyMatchers",
    value: function applyMatchers(html, keepLastNewLine) {
      var _this3 = this;
      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var container = doc.body;
      var nodeMatches = new WeakMap();
      var _this$prepareMatching = this.prepareMatching(container, nodeMatches),
        _this$prepareMatching2 = _slicedToArray(_this$prepareMatching, 2),
        elementMatchers = _this$prepareMatching2[0],
        textMatchers = _this$prepareMatching2[1];
      var delta = traverse(this.quill.scroll, container, elementMatchers, textMatchers, nodeMatches);
      // Remove trailing newline
      if (!keepLastNewLine && deltaEndsWith(delta, '\n') && (delta.ops[delta.ops.length - 1].attributes == null || Object.values(formats).some(function (blotName) {
        return _this3.tableBlots.includes(blotName);
      }))) {
        return delta.compose(new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().retain(delta.length() - 1).delete(1));
      }
      return delta;
    }
  }, {
    key: "dangerouslyPasteHTML",
    value: function dangerouslyPasteHTML(index, html) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.API */ .ZP.sources.API;
      if (typeof index === 'string') {
        var delta = this.convert({
          html: index,
          text: ''
        });
        this.quill.setContents(delta, html);
        this.quill.setSelection(0, _core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
      } else {
        var paste = this.convert({
          html: html,
          text: ''
        });
        this.quill.updateContents(new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().retain(index).concat(paste), source);
        this.quill.setSelection(index + paste.length(), _core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
      }
    }
  }, {
    key: "onCaptureCopy",
    value: function onCaptureCopy(e) {
      var isCut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (e.defaultPrevented) return;
      if (e.clipboardData) {
        e.preventDefault();
      } else {
        return;
      }
      var _this$quill$selection = this.quill.selection.getRange(),
        _this$quill$selection2 = _slicedToArray(_this$quill$selection, 1),
        range = _this$quill$selection2[0];
      if (range == null) return;
      var _this$onCopy = this.onCopy(range, isCut),
        html = _this$onCopy.html,
        text = _this$onCopy.text;
      e.clipboardData.setData('text/plain', text);
      e.clipboardData.setData('text/html', html);
      if (isCut) {
        this.raiseCallback('onCut', e);
        (0,_keyboard__WEBPACK_IMPORTED_MODULE_13__/* .deleteRange */ .WQ)({
          range: range,
          quill: this.quill
        });
      }
    }
  }, {
    key: "onCapturePaste",
    value: function onCapturePaste(e) {
      if (e.defaultPrevented || !this.quill.isEnabled()) {
        return;
      }
      this.raiseCallback('onPaste', e);
      if (e.clipboardData) {
        e.preventDefault();
      } else {
        return;
      }
      var range = this.quill.getSelection(true);
      if (range == null) {
        return;
      }
      var html = e.clipboardData.getData('text/html');
      var files = Array.from(e.clipboardData.files || []);
      if (!html && files.length > 0) {
        this.quill.uploader.upload(range, files);
        return;
      }
      if (html && files.length > 0) {
        var _DOMParser$parseFromS = new DOMParser().parseFromString(html, 'text/html'),
          body = _DOMParser$parseFromS.body;
        var documentContainsImage = body.childElementCount === 1 && body.firstElementChild.tagName === 'IMG';
        if (documentContainsImage) {
          this.quill.uploader.upload(range, files);
          return;
        }
      }
      var text = e.clipboardData.getData('text/plain');
      this.onPaste(range, {
        html: html,
        text: text,
        keepLastNewLine: true
      });
    }
  }, {
    key: "raiseCallback",
    value: function raiseCallback(name, event) {
      var callback = this.options[name];
      if (callback && typeof callback === 'function') {
        callback(event);
      }
    }
  }, {
    key: "onCopy",
    value: function onCopy(_ref4) {
      var index = _ref4.index,
        length = _ref4.length;
      var text = this.quill.getText(index, length);
      var html = this.quill.getSemanticHTML(index, length);
      return {
        html: html,
        text: text
      };
    }
  }, {
    key: "onPaste",
    value: function onPaste(range, _ref5) {
      var text = _ref5.text,
        html = _ref5.html,
        keepLastNewLine = _ref5.keepLastNewLine;
      var formats = this.quill.getFormat(range.index);
      var pastedDelta = this.convert({
        text: text,
        html: html,
        keepLastNewLine: keepLastNewLine
      }, formats);
      debug.log('onPaste', pastedDelta, {
        text: text,
        html: html
      });
      var delta = new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().retain(range.index).delete(range.length).concat(pastedDelta);
      this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.USER */ .ZP.sources.USER);
      // range.length contributes to delta.length()
      this.quill.setSelection(delta.length() - range.length, _core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
      this.quill.scrollIntoView();
    }
  }, {
    key: "prepareMatching",
    value: function prepareMatching(container, nodeMatches) {
      var elementMatchers = [];
      var textMatchers = [];
      this.matchers.forEach(function (pair) {
        var _pair = _slicedToArray(pair, 2),
          selector = _pair[0],
          matcher = _pair[1];
        switch (selector) {
          case TEXT_NODE:
            textMatchers.push(matcher);
            break;
          case ELEMENT_NODE:
            elementMatchers.push(matcher);
            break;
          default:
            Array.from(container.querySelectorAll(selector)).forEach(function (node) {
              if (nodeMatches.has(node)) {
                var matches = nodeMatches.get(node);
                matches.push(matcher);
              } else {
                nodeMatches.set(node, [matcher]);
              }
            });
            break;
        }
      });
      return [elementMatchers, textMatchers];
    }
  }, {
    key: "prepareTextMatching",
    value: function prepareTextMatching() {
      var textMatchers = [matchPlainText];
      this.matchers.forEach(function (pair) {
        var _pair2 = _slicedToArray(pair, 2),
          selector = _pair2[0],
          matcher = _pair2[1];
        if (HTML_TEXT_MATCHERS.indexOf(matcher) === -1 && selector === TEXT_NODE) {
          textMatchers.push(matcher);
        }
      });
      return textMatchers;
    }
  }]);
  return Clipboard;
}(_core_module__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z);
Clipboard.DEFAULTS = {
  matchers: []
};
function applyFormat(delta, format, value) {
  if (_typeof(format) === 'object') {
    return Object.keys(format).reduce(function (newDelta, key) {
      return applyFormat(newDelta, key, format[key]);
    }, delta);
  }
  return delta.reduce(function (newDelta, op) {
    if (op.attributes && op.attributes[format]) {
      return newDelta.push(op);
    }
    var formats = value ? _defineProperty({}, format, value) : {};
    return newDelta.insert(op.insert, _objectSpread(_objectSpread({}, formats), op.attributes));
  }, new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())());
}
function deltaEndsWith(delta, text) {
  var endText = '';
  for (var i = delta.ops.length - 1; i >= 0 && endText.length < text.length; --i // eslint-disable-line no-plusplus
  ) {
    var op = delta.ops[i];
    if (typeof op.insert !== 'string') break;
    endText = op.insert + endText;
  }
  return endText.slice(-1 * text.length) === text;
}
function isLine(node) {
  if (node.childNodes.length === 0) return false; // Exclude embed blocks
  return ['address', 'article', 'blockquote', 'canvas', 'dd', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'iframe', 'li', 'main', 'nav', 'ol', 'output', 'p', 'pre', 'section', 'table', 'td', 'tr', 'ul', 'video'].indexOf(node.tagName.toLowerCase()) !== -1;
}
var preNodes = new WeakMap();
function isPre(node) {
  if (node == null) return false;
  if (!preNodes.has(node)) {
    if (node.tagName === 'PRE') {
      preNodes.set(node, true);
    } else {
      preNodes.set(node, isPre(node.parentNode));
    }
  }
  return preNodes.get(node);
}
function traverse(scroll, node, elementMatchers, textMatchers, nodeMatches) {
  // Post-order
  if (node.nodeType === node.TEXT_NODE) {
    return textMatchers.reduce(function (delta, matcher) {
      return matcher(node, delta, scroll);
    }, new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())());
  }
  if (node.nodeType === node.ELEMENT_NODE) {
    return Array.from(node.childNodes || []).reduce(function (delta, childNode) {
      var childrenDelta = traverse(scroll, childNode, elementMatchers, textMatchers, nodeMatches);
      if (childNode.nodeType === node.ELEMENT_NODE) {
        childrenDelta = elementMatchers.reduce(function (reducedDelta, matcher) {
          return matcher(childNode, reducedDelta, scroll);
        }, childrenDelta);
        childrenDelta = (nodeMatches.get(childNode) || []).reduce(function (reducedDelta, matcher) {
          return matcher(childNode, reducedDelta, scroll);
        }, childrenDelta);
      }
      return delta.concat(childrenDelta);
    }, new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())());
  }
  return new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())();
}
function matchAlias(format, node, delta) {
  return applyFormat(delta, format, true);
}
function matchAttributor(node, delta, scroll) {
  if (['TD', 'TH', 'TR', 'TABLE'].indexOf(node.tagName) === -1) {
    var attributes = parchment__WEBPACK_IMPORTED_MODULE_1__.Attributor.keys(node);
    var classes = parchment__WEBPACK_IMPORTED_MODULE_1__.ClassAttributor.keys(node);
    var styles = parchment__WEBPACK_IMPORTED_MODULE_1__.StyleAttributor.keys(node);
    var formats = {};
    attributes.concat(classes).concat(styles).forEach(function (name) {
      var attr = scroll.query(name, parchment__WEBPACK_IMPORTED_MODULE_1__.Scope.ATTRIBUTE);
      if (attr != null) {
        formats[attr.attrName] = attr.value(node);
        if (formats[attr.attrName]) return;
      }
      attr = ATTRIBUTE_ATTRIBUTORS[name];
      if (attr != null && (attr.attrName === name || attr.keyName === name)) {
        formats[attr.attrName] = attr.value(node) || undefined;
      }
      attr = STYLE_ATTRIBUTORS[name];
      if (attr != null && (attr.attrName === name || attr.keyName === name)) {
        attr = STYLE_ATTRIBUTORS[name];
        formats[attr.attrName] = attr.value(node) || undefined;
      }
    });
    if (Object.keys(formats).length > 0) {
      return applyFormat(delta, formats);
    }
  }
  return delta;
}
function matchBlot(node, delta, scroll) {
  var match = scroll.query(node);
  if (match == null) return delta;
  if (match.prototype instanceof parchment__WEBPACK_IMPORTED_MODULE_1__.EmbedBlot) {
    var embed = {};
    var value = match.value(node);
    if (value != null) {
      embed[match.blotName] = value;
      return new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().insert(embed, match.formats(node, scroll));
    }
  } else {
    if (match.prototype instanceof parchment__WEBPACK_IMPORTED_MODULE_1__.BlockBlot && !deltaEndsWith(delta, '\n')) {
      delta.insert('\n');
    }
    if (typeof match.formats === 'function') {
      return applyFormat(delta, match.blotName, match.formats(node, scroll));
    }
  }
  return delta;
}
function matchBreak(node, delta) {
  if (!deltaEndsWith(delta, '\n')) {
    delta.insert('\n');
  }
  return delta;
}
function matchCodeBlock(node, delta, scroll) {
  var match = scroll.query('code-block');
  var language = match ? match.formats(node, scroll) : true;
  return applyFormat(delta, 'code-block', language);
}
function matchIgnore() {
  return new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())();
}
function matchIndent(node, delta, scroll) {
  var match = scroll.query(node);
  if (match == null || match.blotName !== 'list' || !deltaEndsWith(delta, '\n')) {
    return delta;
  }
  var indent = -1;
  var parent = node.parentNode;
  while (parent != null) {
    if (['OL', 'UL'].indexOf(parent.tagName) !== -1) {
      indent += 1;
    }
    parent = parent.parentNode;
  }
  if (indent <= 0) return delta;
  return delta.reduce(function (composed, op) {
    if (op.attributes && typeof op.attributes.indent === 'number') {
      return composed.push(op);
    }
    return composed.insert(op.insert, _objectSpread({
      indent: indent
    }, op.attributes || {}));
  }, new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())());
}
function matchList(node, delta) {
  var list = node.tagName === 'OL' ? 'ordered' : 'bullet';
  return applyFormat(delta, 'list', list);
}
function matchNewline(node, delta, scroll) {
  if (!deltaEndsWith(delta, '\n')) {
    if (isLine(node)) {
      return delta.insert('\n');
    }
    if (delta.length() > 0 && node.nextSibling) {
      var nextSibling = node.nextSibling;
      while (nextSibling != null) {
        if (isLine(nextSibling)) {
          return delta.insert('\n');
        }
        var match = scroll.query(nextSibling);
        if ((match === null || match === void 0 ? void 0 : match.prototype) instanceof _blots_block__WEBPACK_IMPORTED_MODULE_2__/* .BlockEmbed */ .i2) {
          return delta.insert('\n');
        }
        nextSibling = nextSibling.firstChild;
      }
    }
  }
  return delta;
}
function matchStyles(node, delta) {
  var formats = {};
  var style = node.style || {};
  ['height', 'width'].forEach(function (dimension) {
    var isCell = ['TD', 'TH'].indexOf(node.tagName) !== -1;
    var isTable = node.tagName === 'TABLE';
    if ((isCell || isTable) && style[dimension]) {
      var name = "".concat(isTable ? 'table' : 'cell').concat((0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(dimension));
      formats[name] = style[dimension];
    }
  });
  if (style.fontStyle === 'italic') {
    formats.italic = true;
  }
  if (style.textDecoration.indexOf('underline') !== -1) {
    formats.underline = true;
  }
  if (style.textDecoration.indexOf('line-through') !== -1) {
    formats.strike = true;
  }
  if (style.fontWeight.indexOf('bold') === 0 || parseInt(style.fontWeight, 10) >= 700) {
    formats.bold = true;
  }
  if (Object.keys(formats).length > 0) {
    delta = applyFormat(delta, formats);
  }
  if (parseFloat(style.textIndent || 0) > 0) {
    // Could be 0.5in
    return new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().insert('\t').concat(delta);
  }
  return delta;
}
function matchPlainText(node, delta) {
  var text = node.data || '';
  text = text.replace(/\r\n/g, '\n');
  return delta.insert(text);
}
function matchText(node, delta) {
  var text = node.data;
  // Word represents empty line with <o:p>&nbsp;</o:p>
  if (node.parentNode.tagName === 'O:P') {
    return delta.insert(text.trim());
  }
  if (text.trim().length === 0 && text.indexOf('\n') !== -1) {
    return delta;
  }
  if (!isPre(node)) {
    var replacer = function replacer(collapse, match) {
      var replaced = match.replace(/[^\u00a0]/g, ''); // \u00a0 is nbsp;
      return replaced.length < 1 && collapse ? ' ' : replaced;
    };
    text = text.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
    text = text.replace(/\s\s+/g, replacer.bind(replacer, true)); // collapse whitespace
    if (node.previousSibling == null && isLine(node.parentNode) || node.previousSibling != null && isLine(node.previousSibling)) {
      text = text.replace(/^\s+/, replacer.bind(replacer, false));
    }
    if (node.nextSibling == null && isLine(node.parentNode) || node.nextSibling != null && isLine(node.nextSibling)) {
      text = text.replace(/\s+$/, replacer.bind(replacer, false));
    }
  }
  return delta.insert(text);
}


/***/ }),

/***/ 2215:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ History)
/* harmony export */ });
/* unused harmony export getLastChangeIndex */
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(281);
/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7094);
/* harmony import */ var _utils_has_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8034);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var History = /*#__PURE__*/function (_Module) {
  _inherits(History, _Module);
  var _super = _createSuper(History);
  function History(quill, options) {
    var _this;
    _classCallCheck(this, History);
    _this = _super.call(this, quill, options);
    _this.lastRecorded = 0;
    _this.ignoreChange = false;
    _this.clear();
    _this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_1__/* ["default"].events.EDITOR_CHANGE */ .ZP.events.EDITOR_CHANGE, function (eventName, delta, oldDelta, source) {
      if (eventName !== _core_quill__WEBPACK_IMPORTED_MODULE_1__/* ["default"].events.TEXT_CHANGE */ .ZP.events.TEXT_CHANGE || _this.ignoreChange) return;
      if (!_this.options.userOnly || source === _core_quill__WEBPACK_IMPORTED_MODULE_1__/* ["default"].sources.USER */ .ZP.sources.USER) {
        _this.record(delta, oldDelta);
      } else {
        _this.transform(delta);
      }
    });
    _this.quill.keyboard.addBinding({
      key: 'z',
      shortKey: true
    }, _this.undo.bind(_assertThisInitialized(_this)));
    _this.quill.keyboard.addBinding({
      key: 'z',
      shortKey: true,
      shiftKey: true
    }, _this.redo.bind(_assertThisInitialized(_this)));
    if ((0,_utils_has_window__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)() && /Win/i.test(navigator.platform)) {
      _this.quill.keyboard.addBinding({
        key: 'y',
        shortKey: true
      }, _this.redo.bind(_assertThisInitialized(_this)));
    }
    _this.quill.root.addEventListener('beforeinput', function (event) {
      if (event.inputType === 'historyUndo') {
        _this.undo();
        event.preventDefault();
      } else if (event.inputType === 'historyRedo') {
        _this.redo();
        event.preventDefault();
      }
    });
    return _this;
  }
  _createClass(History, [{
    key: "change",
    value: function change(source, dest) {
      if (this.stack[source].length === 0) return;
      var delta = this.stack[source].pop();
      var base = this.quill.getContents();
      var inverseDelta = delta.invert(base);
      this.stack[dest].push(inverseDelta);
      this.lastRecorded = 0;
      this.ignoreChange = true;
      this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_1__/* ["default"].sources.USER */ .ZP.sources.USER);
      this.ignoreChange = false;
      var index = getLastChangeIndex(this.quill.scroll, delta);
      this.quill.setSelection(index);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.stack = {
        undo: [],
        redo: []
      };
    }
  }, {
    key: "cutoff",
    value: function cutoff() {
      this.lastRecorded = 0;
    }
  }, {
    key: "record",
    value: function record(changeDelta, oldDelta) {
      if (changeDelta.ops.length === 0) return;
      this.stack.redo = [];
      var undoDelta = changeDelta.invert(oldDelta);
      var timestamp = Date.now();
      if (this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0) {
        var delta = this.stack.undo.pop();
        undoDelta = undoDelta.compose(delta);
      } else {
        this.lastRecorded = timestamp;
      }
      if (undoDelta.length() === 0) return;
      this.stack.undo.push(undoDelta);
      if (this.stack.undo.length > this.options.maxStack) {
        this.stack.undo.shift();
      }
    }
  }, {
    key: "redo",
    value: function redo() {
      this.change('redo', 'undo');
    }
  }, {
    key: "transform",
    value: function transform(delta) {
      transformStack(this.stack.undo, delta);
      transformStack(this.stack.redo, delta);
    }
  }, {
    key: "undo",
    value: function undo() {
      this.change('undo', 'redo');
    }
  }]);
  return History;
}(_core_module__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
History.DEFAULTS = {
  delay: 1000,
  maxStack: 100,
  userOnly: false
};
function transformStack(stack, delta) {
  var remoteDelta = delta;
  for (var i = stack.length - 1; i >= 0; i -= 1) {
    var oldDelta = stack[i];
    stack[i] = remoteDelta.transform(oldDelta, true);
    remoteDelta = oldDelta.transform(remoteDelta);
    if (stack[i].length() === 0) {
      stack.splice(i, 1);
    }
  }
}
function endsWithNewlineChange(scroll, delta) {
  var lastOp = delta.ops[delta.ops.length - 1];
  if (lastOp == null) return false;
  if (lastOp.insert != null) {
    return typeof lastOp.insert === 'string' && lastOp.insert.endsWith('\n');
  }
  if (lastOp.attributes != null) {
    return Object.keys(lastOp.attributes).some(function (attr) {
      return scroll.query(attr, parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.BLOCK) != null;
    });
  }
  return false;
}
function getLastChangeIndex(scroll, delta) {
  var deleteLength = delta.reduce(function (length, op) {
    return length + (op.delete || 0);
  }, 0);
  var changeIndex = delta.length() - deleteLength;
  if (endsWithNewlineChange(scroll, delta)) {
    changeIndex -= 1;
  }
  return changeIndex;
}

// eslint-disable-next-line no-restricted-exports


/***/ }),

/***/ 3071:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ZP": () => (/* binding */ Keyboard),
  "WQ": () => (/* binding */ deleteRange)
});

// UNUSED EXPORTS: SHORTKEY, normalize

// EXTERNAL MODULE: ./node_modules/lodash.clonedeep/index.js
var lodash_clonedeep = __webpack_require__(8805);
var lodash_clonedeep_default = /*#__PURE__*/__webpack_require__.n(lodash_clonedeep);
// EXTERNAL MODULE: ./node_modules/lodash.isequal/index.js
var lodash_isequal = __webpack_require__(2722);
var lodash_isequal_default = /*#__PURE__*/__webpack_require__.n(lodash_isequal);
// EXTERNAL MODULE: ./node_modules/quill-delta/dist/Delta.js
var Delta = __webpack_require__(9098);
var Delta_default = /*#__PURE__*/__webpack_require__.n(Delta);
// EXTERNAL MODULE: ./node_modules/parchment/src/parchment.ts + 17 modules
var parchment = __webpack_require__(1233);
// EXTERNAL MODULE: ./core/quill.js
var core_quill = __webpack_require__(281);
// EXTERNAL MODULE: ./core/logger.js
var logger = __webpack_require__(3122);
// EXTERNAL MODULE: ./core/module.js
var core_module = __webpack_require__(7094);
// EXTERNAL MODULE: ./utils/has_window.js
var has_window = __webpack_require__(8034);
;// CONCATENATED MODULE: ./utils/get_scroll_into_view_config.js
function getScrollIntoViewConfig(element) {
  var _window = window,
    windowHeight = _window.innerHeight;
  var _element$getBoundingC = element.getBoundingClientRect(),
    elemTop = _element$getBoundingC.y,
    elemBottom = _element$getBoundingC.bottom;
  if (elemTop < 0) {
    return true; // scroll to the top
  }

  if (elemBottom >= windowHeight) {
    return false; // scroll to the bottom
  }

  return null;
}
;// CONCATENATED MODULE: ./modules/keyboard.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }









var debug = (0,logger/* default */.Z)('quill:keyboard');
var KEY_NAMES = {
  backspace: 'backspace',
  tab: 'tab',
  enter: 'enter',
  escape: 'escape',
  pageup: 'pageUp',
  pagedown: 'pageDown',
  end: 'end',
  home: 'home',
  arrowleft: 'leftArrow',
  arrowup: 'upArrow',
  arrowright: 'rightArrow',
  arrowdown: 'downArrow',
  delete: 'del',
  ' ': 'space',
  '*': 'asterisk',
  '-': 'minus',
  alt: 'alt',
  control: 'control',
  shift: 'shift',
  // IE11:
  left: 'leftArrow',
  up: 'upArrow',
  right: 'rightArrow',
  down: 'downArrow',
  multiply: 'asterisk',
  spacebar: 'space',
  del: 'del',
  subtract: 'minus',
  esc: 'escape'
};
var KEY_CODES = {
  // iOS 10.2 and lower didn't supports KeyboardEvent.key
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  27: 'escape',
  33: 'pageUp',
  34: 'pageDown',
  35: 'end',
  36: 'home',
  37: 'leftArrow',
  38: 'upArrow',
  39: 'rightArrow',
  40: 'downArrow',
  46: 'del',
  32: 'space',
  106: 'asterisk',
  109: 'minus',
  189: 'minus',
  173: 'minus',
  16: 'shift',
  17: 'control',
  18: 'alt'
};
var SHORTKEY = (0,has_window/* default */.Z)() && /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';
var Keyboard = /*#__PURE__*/function (_Module) {
  _inherits(Keyboard, _Module);
  var _super = _createSuper(Keyboard);
  function Keyboard(quill, options) {
    var _this;
    _classCallCheck(this, Keyboard);
    _this = _super.call(this, quill, options);
    _this.bindings = {};
    Object.keys(_this.options.bindings).forEach(function (name) {
      if (_this.options.bindings[name]) {
        _this.addBinding(_this.options.bindings[name]);
      }
    });
    _this.addInternalBindings();
    _this.listen();
    return _this;
  }
  _createClass(Keyboard, [{
    key: "addInternalBindings",
    value: function addInternalBindings() {
      var _this2 = this;
      this.quill.once(core_quill/* default.events.CONTENT_SETTED */.ZP.events.CONTENT_SETTED, function () {
        _this2.addBinding({
          key: 'enter',
          shiftKey: null
        }, _this2.handleEnter);
        _this2.addBinding({
          key: 'enter',
          metaKey: null,
          ctrlKey: null,
          altKey: null
        }, function () {});
        if ((0,has_window/* default */.Z)() && /Firefox/i.test(navigator.userAgent)) {
          // Need to handle delete and backspace for Firefox in the general case #1171
          _this2.addBinding({
            key: 'backspace'
          }, {
            collapsed: true
          }, _this2.handleBackspace);
          _this2.addBinding({
            key: 'del'
          }, {
            collapsed: true
          }, _this2.handleDelete);
        } else {
          _this2.addBinding({
            key: 'backspace'
          }, {
            collapsed: true,
            prefix: /^.?$/
          }, _this2.handleBackspace);
          _this2.addBinding({
            key: 'del'
          }, {
            collapsed: true,
            suffix: /^.?$/
          }, _this2.handleDelete);
        }
        _this2.addBinding({
          key: 'backspace'
        }, {
          collapsed: false
        }, _this2.handleDeleteRange);
        _this2.addBinding({
          key: 'del'
        }, {
          collapsed: false
        }, _this2.handleDeleteRange);
        _this2.addBinding({
          key: 'backspace',
          altKey: null,
          ctrlKey: null,
          metaKey: null,
          shiftKey: null
        }, {
          collapsed: true,
          offset: 0
        }, _this2.handleBackspace);
      });
    }
  }, {
    key: "addBinding",
    value: function addBinding(keyBinding) {
      var _this3 = this;
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var handler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var binding = normalize(keyBinding);
      if (binding == null) {
        debug.warn('Attempted to add invalid keyboard binding', binding);
        return;
      }
      if (typeof context === 'function') {
        context = {
          handler: context
        };
      }
      if (typeof handler === 'function') {
        handler = {
          handler: handler
        };
      }
      var keyPropery = binding.which ? 'which' : 'key';
      var keys = Array.isArray(binding[keyPropery]) ? binding[keyPropery] : [binding[keyPropery]];
      keys.forEach(function (key) {
        var singleBinding = _objectSpread(_objectSpread(_objectSpread({}, binding), {}, {
          key: key
        }, context), handler);
        _this3.bindings[singleBinding.key] = _this3.bindings[singleBinding.key] || [];
        _this3.bindings[singleBinding.key].push(singleBinding);
      });
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this4 = this;
      this.quill.root.addEventListener('keydown', function (evt) {
        if (evt.defaultPrevented || evt.isComposing) return;
        _this4.raiseOnKeydownCallback(evt);
        var keyName = Keyboard.normalizeKeyName(evt);
        var bindings = (_this4.bindings[keyName] || []).concat(_this4.bindings[evt.which] || []);
        var matches = bindings.filter(function (binding) {
          return Keyboard.match(evt, binding);
        });
        if (matches.length === 0) return;
        var range = _this4.quill.getSelection();
        if (range == null || !_this4.quill.hasFocus()) return;
        var _this4$quill$getLine = _this4.quill.getLine(range.index),
          _this4$quill$getLine2 = _slicedToArray(_this4$quill$getLine, 2),
          line = _this4$quill$getLine2[0],
          offset = _this4$quill$getLine2[1];
        var _this4$quill$getLeaf = _this4.quill.getLeaf(range.index),
          _this4$quill$getLeaf2 = _slicedToArray(_this4$quill$getLeaf, 2),
          leafStart = _this4$quill$getLeaf2[0],
          offsetStart = _this4$quill$getLeaf2[1];
        var _ref = range.length === 0 ? [leafStart, offsetStart] : _this4.quill.getLeaf(range.index + range.length),
          _ref2 = _slicedToArray(_ref, 2),
          leafEnd = _ref2[0],
          offsetEnd = _ref2[1];
        var prefixText = leafStart instanceof parchment.TextBlot ? leafStart.value().slice(0, offsetStart) : '';
        var suffixText = leafEnd instanceof parchment.TextBlot ? leafEnd.value().slice(offsetEnd) : '';
        var curContext = {
          collapsed: range.length === 0,
          empty: range.length === 0 && line.length() <= 1,
          format: _this4.quill.getFormat(range),
          line: line,
          offset: offset,
          prefix: prefixText,
          suffix: suffixText,
          event: evt
        };
        var prevented = false;
        matches.some(function (binding) {
          if (binding.collapsed != null && binding.collapsed !== curContext.collapsed) {
            return false;
          }
          if (binding.empty != null && binding.empty !== curContext.empty) {
            return false;
          }
          if (binding.offset != null && binding.offset !== curContext.offset) {
            return false;
          }
          if (Array.isArray(binding.format)) {
            // any format is present
            if (binding.format.every(function (name) {
              return curContext.format[name] == null;
            })) {
              return false;
            }
          } else if (_typeof(binding.format) === 'object') {
            // all formats must match
            if (!Object.keys(binding.format).every(function (name) {
              if (binding.format[name] === true) return curContext.format[name] != null;
              if (binding.format[name] === false) return curContext.format[name] == null;
              return lodash_isequal_default()(binding.format[name], curContext.format[name]);
            })) {
              return false;
            }
          }
          if (binding.prefix != null && !binding.prefix.test(curContext.prefix)) {
            return false;
          }
          if (binding.suffix != null && !binding.suffix.test(curContext.suffix)) {
            return false;
          }
          var handlerResult = binding.handler.call(_this4, range, curContext, binding);
          var preventAfterAllMatches = handlerResult === null || handlerResult === void 0 ? void 0 : handlerResult.preventAfterAllMatches;
          prevented = handlerResult !== true || preventAfterAllMatches;
          return prevented && !preventAfterAllMatches;
        });
        if (prevented) {
          evt.preventDefault();
        }
      });
    }
  }, {
    key: "raiseOnKeydownCallback",
    value: function raiseOnKeydownCallback(event) {
      var callback = this.options.onKeydown;
      if (callback && typeof callback === 'function') {
        callback(event);
      }
    }
  }, {
    key: "handleBackspace",
    value: function handleBackspace(range, context) {
      // Check for astral symbols
      var length = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix) ? 2 : 1;
      if (range.index === 0 || this.quill.getLength() <= 1) return;
      var formats = {};
      var _this$quill$getLine = this.quill.getLine(range.index),
        _this$quill$getLine2 = _slicedToArray(_this$quill$getLine, 1),
        line = _this$quill$getLine2[0];
      var delta = new (Delta_default())().retain(range.index - length).delete(length);
      if (context.offset === 0) {
        // Always deleting newline here, length always 1
        var _this$quill$getLine3 = this.quill.getLine(range.index - 1),
          _this$quill$getLine4 = _slicedToArray(_this$quill$getLine3, 1),
          prev = _this$quill$getLine4[0];
        if (prev) {
          var isPrevLineEmpty = prev.statics.blotName === 'block' && prev.length() <= 1;
          var isPrevLineTable = prev.statics.blotName.startsWith('table');
          var isLineEmpty = line.statics.blotName === 'block' && line.length() <= 1;
          if (isPrevLineTable) {
            if (isLineEmpty) {
              line.remove();
            }
            this.quill.setSelection(range.index - 1);
          }
          if (!isPrevLineEmpty && !isPrevLineTable) {
            var curFormats = line.formats();
            var prevFormats = this.quill.getFormat(range.index - 1, 1);
            formats = Delta.AttributeMap.diff(curFormats, prevFormats) || {};
            if (Object.keys(formats).length > 0) {
              // line.length() - 1 targets \n in line, another -1 for newline being deleted
              var formatDelta = new (Delta_default())().retain(range.index + line.length() - 2).retain(1, formats);
              delta = delta.compose(formatDelta);
            }
          }
        }
      }
      this.quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
      this.quill.focus();
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(range, context) {
      // Check for astral symbols
      var length = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(context.suffix) ? 2 : 1;
      if (range.index >= this.quill.getLength() - length) return;
      var formats = {};
      var _this$quill$getLine5 = this.quill.getLine(range.index),
        _this$quill$getLine6 = _slicedToArray(_this$quill$getLine5, 1),
        line = _this$quill$getLine6[0];
      var delta = new (Delta_default())().retain(range.index).delete(length);
      if (context.offset >= line.length() - 1) {
        var _this$quill$getLine7 = this.quill.getLine(range.index + 1),
          _this$quill$getLine8 = _slicedToArray(_this$quill$getLine7, 1),
          next = _this$quill$getLine8[0];
        if (next) {
          var curFormats = line.formats();
          var nextFormats = this.quill.getFormat(range.index, 1);
          formats = Delta.AttributeMap.diff(curFormats, nextFormats) || {};
          if (Object.keys(formats).length > 0) {
            delta = delta.retain(next.length() - 1).retain(1, formats);
          }
        }
      }
      this.quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
      this.quill.focus();
    }
  }, {
    key: "handleDeleteRange",
    value: function handleDeleteRange(range, context) {
      this.raiseOnKeydownCallback(context.event);
      deleteRange({
        range: range,
        quill: this.quill
      });
      this.quill.focus();
    }
  }, {
    key: "handleEnter",
    value: function handleEnter(range, context) {
      var _this5 = this;
      var lineFormats = Object.keys(context.format).reduce(function (formats, format) {
        if (_this5.quill.scroll.query(format, parchment.Scope.BLOCK) && !Array.isArray(context.format[format])) {
          formats[format] = context.format[format];
        }
        return formats;
      }, {});
      var delta = new (Delta_default())().retain(range.index).delete(range.length).insert('\n', lineFormats);
      this.quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
      this.quill.setSelection(range.index + 1, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
      this.quill.focus();
      var _this$quill$getLine9 = this.quill.getLine(range.index + 1),
        _this$quill$getLine10 = _slicedToArray(_this$quill$getLine9, 1),
        line = _this$quill$getLine10[0];
      var scrollConfig = getScrollIntoViewConfig(line.domNode);
      if (scrollConfig !== null) {
        line.domNode.scrollIntoView(scrollConfig);
      }
      Object.keys(context.format).forEach(function (name) {
        if (lineFormats[name] != null) return;
        if (Array.isArray(context.format[name])) return;
        if (name === 'code' || name === 'link') return;
        _this5.raiseOnKeydownCallback(context.event);
        _this5.quill.format(name, context.format[name], core_quill/* default.sources.USER */.ZP.sources.USER);
      });
    }
  }], [{
    key: "match",
    value: function match(evt, binding) {
      if (['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some(function (key) {
        return !!binding[key] !== evt[key] && binding[key] !== null;
      })) {
        return false;
      }
      return binding.key === Keyboard.normalizeKeyName(evt) || binding.key === evt.which;
    }
  }, {
    key: "normalizeKeyName",
    value: function normalizeKeyName(_ref3) {
      var key = _ref3.key,
        which = _ref3.which;
      var isKeySupported = !!key;
      var normalizedKey = isKeySupported ? key : which;
      if (normalizedKey) {
        if (isKeySupported) {
          normalizedKey = KEY_NAMES[normalizedKey.toLowerCase()] || normalizedKey;
        } else {
          normalizedKey = KEY_CODES[normalizedKey] || String.fromCharCode(normalizedKey);
        }
      }
      return normalizedKey;
    }
  }]);
  return Keyboard;
}(core_module/* default */.Z);
Keyboard.DEFAULTS = {
  bindings: {
    bold: makeFormatHandler('bold', 66),
    italic: makeFormatHandler('italic', 73),
    underline: makeFormatHandler('underline', 85),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: 'tab',
      format: ['blockquote', 'indent', 'list'],
      handler: function handler(range, context) {
        if (context.collapsed && context.offset !== 0) return true;
        this.quill.format('indent', '+1', core_quill/* default.sources.USER */.ZP.sources.USER);
        return false;
      }
    },
    outdent: {
      key: 'tab',
      shiftKey: true,
      format: ['blockquote', 'indent', 'list'],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler: function handler(range, context) {
        if (context.collapsed && context.offset !== 0) return true;
        this.quill.format('indent', '-1', core_quill/* default.sources.USER */.ZP.sources.USER);
        return false;
      }
    },
    'outdent backspace': {
      key: 'backspace',
      collapsed: true,
      shiftKey: null,
      metaKey: null,
      ctrlKey: null,
      altKey: null,
      format: ['indent', 'list'],
      offset: 0,
      handler: function handler(range, context) {
        if (context.format.indent != null) {
          this.quill.format('indent', '-1', core_quill/* default.sources.USER */.ZP.sources.USER);
        } else if (context.format.list != null) {
          this.quill.format('list', false, core_quill/* default.sources.USER */.ZP.sources.USER);
        }
      }
    },
    'indent code-block': makeCodeBlockHandler(true),
    'outdent code-block': makeCodeBlockHandler(false),
    'remove tab': {
      key: 'tab',
      shiftKey: true,
      collapsed: true,
      prefix: /\t$/,
      handler: function handler(range) {
        this.quill.deleteText(range.index - 1, 1, core_quill/* default.sources.USER */.ZP.sources.USER);
      }
    },
    tab: {
      key: 'tab',
      handler: function handler(range, context) {
        if (context.format.table) return true;
        this.quill.history.cutoff();
        var delta = new (Delta_default())().retain(range.index).delete(range.length).insert('\t');
        this.quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
        this.quill.history.cutoff();
        this.quill.setSelection(range.index + 1, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
        return false;
      }
    },
    'blockquote empty enter': {
      key: 'enter',
      collapsed: true,
      format: ['blockquote'],
      empty: true,
      handler: function handler() {
        this.quill.format('blockquote', false, core_quill/* default.sources.USER */.ZP.sources.USER);
      }
    },
    'list empty enter': {
      key: 'enter',
      collapsed: true,
      format: ['list'],
      empty: true,
      handler: function handler(range, context) {
        var formats = {
          list: false
        };
        if (context.format.indent) {
          formats.indent = false;
        }
        this.quill.formatLine(range.index, range.length, formats, core_quill/* default.sources.USER */.ZP.sources.USER);
      }
    },
    'checklist enter': {
      key: 'enter',
      collapsed: true,
      format: {
        list: 'checked'
      },
      handler: function handler(range) {
        var _this$quill$getLine11 = this.quill.getLine(range.index),
          _this$quill$getLine12 = _slicedToArray(_this$quill$getLine11, 2),
          line = _this$quill$getLine12[0],
          offset = _this$quill$getLine12[1];
        var formats = _objectSpread(_objectSpread({}, line.formats()), {}, {
          list: 'checked'
        });
        var delta = new (Delta_default())().retain(range.index).insert('\n', formats).retain(line.length() - offset - 1).retain(1, {
          list: 'unchecked'
        });
        this.quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
        this.quill.setSelection(range.index + 1, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
        this.quill.scrollIntoView();
      }
    },
    'header enter': {
      key: 'enter',
      collapsed: true,
      format: ['header'],
      suffix: /^$/,
      handler: function handler(range, context) {
        var _this$quill$getLine13 = this.quill.getLine(range.index),
          _this$quill$getLine14 = _slicedToArray(_this$quill$getLine13, 2),
          line = _this$quill$getLine14[0],
          offset = _this$quill$getLine14[1];
        var delta = new (Delta_default())().retain(range.index).insert('\n', context.format).retain(line.length() - offset - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
        this.quill.setSelection(range.index + 1, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
        this.quill.scrollIntoView();
      }
    },
    'list autofill': {
      key: 'space',
      shiftKey: null,
      collapsed: true,
      format: {
        'code-block': false,
        blockquote: false,
        table: false
      },
      prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
      handler: function handler(range, context) {
        if (this.quill.scroll.query('list') == null) return true;
        var length = context.prefix.length;
        var _this$quill$getLine15 = this.quill.getLine(range.index),
          _this$quill$getLine16 = _slicedToArray(_this$quill$getLine15, 2),
          line = _this$quill$getLine16[0],
          offset = _this$quill$getLine16[1];
        if (offset > length) return true;
        var value;
        switch (context.prefix.trim()) {
          case '[]':
          case '[ ]':
            value = 'unchecked';
            break;
          case '[x]':
            value = 'checked';
            break;
          case '-':
          case '*':
            value = 'bullet';
            break;
          default:
            value = 'ordered';
        }
        this.quill.insertText(range.index, ' ', core_quill/* default.sources.USER */.ZP.sources.USER);
        this.quill.history.cutoff();
        var delta = new (Delta_default())().retain(range.index - offset).delete(length + 1).retain(line.length() - 2 - offset).retain(1, {
          list: value
        });
        this.raiseOnKeydownCallback(context.event);
        this.quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
        this.quill.history.cutoff();
        this.quill.setSelection(range.index - length, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
        return false;
      }
    },
    'code exit': {
      key: 'enter',
      collapsed: true,
      format: ['code-block'],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler: function handler(range) {
        var _this$quill$getLine17 = this.quill.getLine(range.index),
          _this$quill$getLine18 = _slicedToArray(_this$quill$getLine17, 2),
          line = _this$quill$getLine18[0],
          offset = _this$quill$getLine18[1];
        var numLines = 2;
        var cur = line;
        while (cur != null && cur.length() <= 1 && cur.formats()['code-block']) {
          cur = cur.prev;
          numLines -= 1;
          // Requisite prev lines are empty
          if (numLines <= 0) {
            var delta = new (Delta_default())().retain(range.index + line.length() - offset - 2).retain(1, {
              'code-block': null
            }).delete(1);
            this.quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
            this.quill.setSelection(range.index - 1, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
            return false;
          }
        }
        return true;
      }
    },
    'embed left': makeEmbedArrowHandler('leftArrow', false),
    'embed left shift': makeEmbedArrowHandler('leftArrow', true),
    'embed right': makeEmbedArrowHandler('rightArrow', false),
    'embed right shift': makeEmbedArrowHandler('rightArrow', true)
  }
};
function makeCodeBlockHandler(indent) {
  return {
    key: 'tab',
    shiftKey: !indent,
    format: {
      'code-block': true
    },
    handler: function handler(range) {
      var CodeBlock = this.quill.scroll.query('code-block');
      var lines = range.length === 0 ? this.quill.getLines(range.index, 1) : this.quill.getLines(range);
      var index = range.index,
        length = range.length;
      lines.forEach(function (line, i) {
        if (indent) {
          line.insertAt(0, CodeBlock.TAB);
          if (i === 0) {
            index += CodeBlock.TAB.length;
          } else {
            length += CodeBlock.TAB.length;
          }
        } else if (line.domNode.textContent.indexOf(CodeBlock.TAB) === 0) {
          line.deleteAt(0, CodeBlock.TAB.length);
          if (i === 0) {
            index -= CodeBlock.TAB.length;
          } else {
            length -= CodeBlock.TAB.length;
          }
        }
      });
      this.quill.update(core_quill/* default.sources.USER */.ZP.sources.USER);
      this.quill.setSelection(index, length, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
    }
  };
}
function makeEmbedArrowHandler(key, shiftKey) {
  var _ref4;
  var where = key === 'leftArrow' ? 'prefix' : 'suffix';
  return _ref4 = {
    key: key,
    shiftKey: shiftKey,
    altKey: null
  }, _defineProperty(_ref4, where, /^$/), _defineProperty(_ref4, "handler", function handler(range) {
    var index = range.index;
    if (key === 'rightArrow') {
      index += range.length + 1;
    }
    var _this$quill$getLeaf = this.quill.getLeaf(index),
      _this$quill$getLeaf2 = _slicedToArray(_this$quill$getLeaf, 1),
      leaf = _this$quill$getLeaf2[0];
    if (!(leaf instanceof parchment.EmbedBlot)) return true;
    if (key === 'leftArrow') {
      if (shiftKey) {
        this.quill.setSelection(range.index - 1, range.length + 1, core_quill/* default.sources.USER */.ZP.sources.USER);
      } else {
        this.quill.setSelection(range.index - 1, core_quill/* default.sources.USER */.ZP.sources.USER);
      }
    } else if (shiftKey) {
      this.quill.setSelection(range.index, range.length + 1, core_quill/* default.sources.USER */.ZP.sources.USER);
    } else {
      this.quill.setSelection(range.index + range.length + 1, core_quill/* default.sources.USER */.ZP.sources.USER);
    }
    return false;
  }), _ref4;
}
function makeFormatHandler(format, which) {
  return {
    key: format[0],
    which: which,
    shortKey: true,
    handler: function handler(range, context) {
      this.quill.format(format, !context.format[format], core_quill/* default.sources.USER */.ZP.sources.USER);
      return {
        preventAfterAllMatches: true
      };
    }
  };
}
function normalize(binding) {
  if (typeof binding === 'string' || typeof binding === 'number') {
    binding = {
      key: binding
    };
  } else if (_typeof(binding) === 'object') {
    binding = lodash_clonedeep_default()(binding);
  } else {
    return null;
  }
  if (binding.shortKey) {
    binding[SHORTKEY] = binding.shortKey;
    delete binding.shortKey;
  }
  return binding;
}
function deleteRange(_ref5) {
  var quill = _ref5.quill,
    range = _ref5.range;
  var lines = quill.getLines(range);
  var formats = {};
  if (lines.length > 1) {
    var firstFormats = lines[0].formats();
    var lastFormats = lines[lines.length - 1].formats();
    formats = Delta.AttributeMap.diff(lastFormats, firstFormats) || {};
  }
  quill.deleteText(range, core_quill/* default.sources.USER */.ZP.sources.USER);
  if (Object.keys(formats).length > 0) {
    quill.formatLine(range.index, 1, formats, core_quill/* default.sources.USER */.ZP.sources.USER);
  }
  quill.setSelection(range.index, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
}


/***/ }),

/***/ 9072:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (/* binding */ Syntax)
/* harmony export */ });
/* unused harmony exports CodeBlock, CodeToken */
/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9098);
/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1233);
/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6603);
/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(281);
/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7094);
/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6446);
/* harmony import */ var _blots_break__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6192);
/* harmony import */ var _blots_cursor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3657);
/* harmony import */ var _blots_text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8222);
/* harmony import */ var _formats_code__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7309);
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5635);
/* harmony import */ var _utils_has_window__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8034);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }












var TokenAttributor = new parchment__WEBPACK_IMPORTED_MODULE_1__.ClassAttributor('code-token', 'hljs', {
  scope: parchment__WEBPACK_IMPORTED_MODULE_1__.Scope.INLINE
});
var CodeToken = /*#__PURE__*/function (_Inline) {
  _inherits(CodeToken, _Inline);
  var _super = _createSuper(CodeToken);
  function CodeToken(scroll, domNode, value) {
    var _this;
    _classCallCheck(this, CodeToken);
    _this = _super.call(this, scroll, domNode, value);
    TokenAttributor.add(_this.domNode, value);
    return _this;
  }
  _createClass(CodeToken, [{
    key: "format",
    value: function format(_format, value) {
      if (_format !== CodeToken.blotName) {
        _get(_getPrototypeOf(CodeToken.prototype), "format", this).call(this, _format, value);
      } else if (value) {
        TokenAttributor.add(this.domNode, value);
      } else {
        TokenAttributor.remove(this.domNode);
        this.domNode.classList.remove(this.statics.className);
      }
    }
  }, {
    key: "optimize",
    value: function optimize() {
      var _get2;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      (_get2 = _get(_getPrototypeOf(CodeToken.prototype), "optimize", this)).call.apply(_get2, [this].concat(args));
      if (!TokenAttributor.value(this.domNode)) {
        this.unwrap();
      }
    }
  }], [{
    key: "formats",
    value: function formats(node, scroll) {
      while (node != null && node !== scroll.domNode) {
        if (node.classList && node.classList.contains(_formats_code__WEBPACK_IMPORTED_MODULE_9__/* ["default"].className */ .ZP.className)) {
          return _get(_getPrototypeOf(CodeToken), "formats", this).call(this, node, scroll);
        }
        node = node.parentNode;
      }
      return undefined;
    }
  }]);
  return CodeToken;
}(_blots_inline__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
CodeToken.blotName = 'code-token';
CodeToken.className = 'ql-token';
var SyntaxCodeBlock = /*#__PURE__*/function (_CodeBlock) {
  _inherits(SyntaxCodeBlock, _CodeBlock);
  var _super2 = _createSuper(SyntaxCodeBlock);
  function SyntaxCodeBlock() {
    _classCallCheck(this, SyntaxCodeBlock);
    return _super2.apply(this, arguments);
  }
  _createClass(SyntaxCodeBlock, [{
    key: "format",
    value:
    // Syntax module will register

    function format(name, value) {
      if (name === this.statics.blotName && value) {
        this.domNode.setAttribute('data-language', value);
      } else {
        _get(_getPrototypeOf(SyntaxCodeBlock.prototype), "format", this).call(this, name, value);
      }
    }
  }, {
    key: "replaceWith",
    value: function replaceWith(name, value) {
      this.formatAt(0, this.length(), CodeToken.blotName, false);
      return _get(_getPrototypeOf(SyntaxCodeBlock.prototype), "replaceWith", this).call(this, name, value);
    }
  }], [{
    key: "create",
    value: function create(value) {
      var domNode = _get(_getPrototypeOf(SyntaxCodeBlock), "create", this).call(this, value);
      if (typeof value === 'string') {
        domNode.setAttribute('data-language', value);
      }
      return domNode;
    }
  }, {
    key: "formats",
    value: function formats(domNode) {
      return domNode.getAttribute('data-language') || 'plain';
    }
  }, {
    key: "register",
    value: function register() {}
  }]);
  return SyntaxCodeBlock;
}(_formats_code__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .ZP);
var SyntaxCodeBlockContainer = /*#__PURE__*/function (_CodeBlockContainer) {
  _inherits(SyntaxCodeBlockContainer, _CodeBlockContainer);
  var _super3 = _createSuper(SyntaxCodeBlockContainer);
  function SyntaxCodeBlockContainer() {
    _classCallCheck(this, SyntaxCodeBlockContainer);
    return _super3.apply(this, arguments);
  }
  _createClass(SyntaxCodeBlockContainer, [{
    key: "attach",
    value: function attach() {
      _get(_getPrototypeOf(SyntaxCodeBlockContainer.prototype), "attach", this).call(this);
      this.forceNext = false;
      this.scroll.emitMount(this);
    }
  }, {
    key: "format",
    value: function format(name, value) {
      if (name === SyntaxCodeBlock.blotName) {
        this.forceNext = true;
        this.children.forEach(function (child) {
          child.format(name, value);
        });
      }
    }
  }, {
    key: "formatAt",
    value: function formatAt(index, length, name, value) {
      if (name === SyntaxCodeBlock.blotName) {
        this.forceNext = true;
      }
      _get(_getPrototypeOf(SyntaxCodeBlockContainer.prototype), "formatAt", this).call(this, index, length, name, value);
    }
  }, {
    key: "highlight",
    value: function highlight(_highlight) {
      var _this2 = this;
      var forced = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.children.head == null) return;
      var nodes = Array.from(this.domNode.childNodes).filter(function (node) {
        return node !== _this2.uiNode;
      });
      var text = "".concat(nodes.map(function (node) {
        return node.textContent;
      }).join('\n'), "\n");
      var language = SyntaxCodeBlock.formats(this.children.head.domNode);
      if (forced || this.forceNext || this.cachedText !== text) {
        if (text.trim().length > 0 || this.cachedText == null) {
          var oldDelta = this.children.reduce(function (delta, child) {
            return delta.concat((0,_blots_block__WEBPACK_IMPORTED_MODULE_5__/* .blockDelta */ .qz)(child, false));
          }, new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())());
          var delta = _highlight(text, language);
          oldDelta.diff(delta).reduce(function (index, _ref) {
            var retain = _ref.retain,
              attributes = _ref.attributes;
            // Should be all retains
            if (!retain) return index;
            if (attributes) {
              Object.keys(attributes).forEach(function (format) {
                if ([SyntaxCodeBlock.blotName, CodeToken.blotName].indexOf(format) !== -1) {
                  _this2.formatAt(index, retain, format, attributes[format]);
                }
              });
            }
            return index + retain;
          }, 0);
        }
        this.cachedText = text;
        this.forceNext = false;
      }
    }
  }, {
    key: "html",
    value: function html(index, length) {
      var _this$children$find = this.children.find(index),
        _this$children$find2 = _slicedToArray(_this$children$find, 1),
        codeBlock = _this$children$find2[0];
      var language = codeBlock ? SyntaxCodeBlock.formats(codeBlock.domNode) : 'plain';
      return "<pre data-language=\"".concat(language, "\">\n").concat(this.code(index, length), "\n</pre>");
    }
  }, {
    key: "optimize",
    value: function optimize(context) {
      _get(_getPrototypeOf(SyntaxCodeBlockContainer.prototype), "optimize", this).call(this, context);
      if (this.parent != null && this.children.head != null && this.uiNode != null) {
        var language = SyntaxCodeBlock.formats(this.children.head.domNode);
        if (language !== this.uiNode.value) {
          this.uiNode.value = language;
        }
      }
    }
  }]);
  return SyntaxCodeBlockContainer;
}(_formats_code__WEBPACK_IMPORTED_MODULE_9__/* .CodeBlockContainer */ .se);
SyntaxCodeBlockContainer.allowedChildren = [SyntaxCodeBlock];
SyntaxCodeBlock.requiredContainer = SyntaxCodeBlockContainer;
SyntaxCodeBlock.allowedChildren = [CodeToken, _blots_cursor__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, _blots_text__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, _blots_break__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z];
var Syntax = /*#__PURE__*/function (_Module) {
  _inherits(Syntax, _Module);
  var _super4 = _createSuper(Syntax);
  function Syntax(quill, options) {
    var _this3;
    _classCallCheck(this, Syntax);
    _this3 = _super4.call(this, quill, options);
    if (_this3.options.hljs == null) {
      throw new Error('Syntax module requires highlight.js. Please include the library on the page before Quill.');
    }
    _this3.languages = _this3.options.languages.reduce(function (memo, _ref2) {
      var key = _ref2.key;
      memo[key] = true;
      return memo;
    }, {});
    _this3.highlightBlot = _this3.highlightBlot.bind(_assertThisInitialized(_this3));
    _this3.initListener();
    _this3.initTimer();
    return _this3;
  }
  _createClass(Syntax, [{
    key: "initListener",
    value: function initListener() {
      var _this4 = this;
      this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].events.SCROLL_BLOT_MOUNT */ .ZP.events.SCROLL_BLOT_MOUNT, function (blot) {
        if (!(blot instanceof SyntaxCodeBlockContainer)) return;
        var select = _this4.quill.root.ownerDocument.createElement('select');
        _this4.options.languages.forEach(function (_ref3) {
          var key = _ref3.key,
            label = _ref3.label;
          var option = select.ownerDocument.createElement('option');
          option.textContent = label;
          option.setAttribute('value', key);
          select.appendChild(option);
        });
        select.addEventListener('change', function () {
          blot.format(SyntaxCodeBlock.blotName, select.value);
          _this4.quill.root.focus(); // Prevent scrolling
          _this4.highlight(blot, true);
        });
        if (blot.uiNode == null) {
          blot.attachUI(select);
          if (blot.children.head) {
            select.value = SyntaxCodeBlock.formats(blot.children.head.domNode);
          }
        }
      });
    }
  }, {
    key: "initTimer",
    value: function initTimer() {
      var _this5 = this;
      var timer = null;
      this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].events.SCROLL_OPTIMIZE */ .ZP.events.SCROLL_OPTIMIZE, function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          _this5.highlight();
          timer = null;
        }, _this5.options.interval);
      });
    }
  }, {
    key: "highlight",
    value: function highlight() {
      var _this6 = this;
      var blot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.quill.selection.composing) return;
      this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.USER */ .ZP.sources.USER);
      var range = this.quill.getSelection();
      var blots = blot == null ? this.quill.scroll.descendants(SyntaxCodeBlockContainer) : [blot];
      blots.forEach(function (container) {
        container.highlight(_this6.highlightBlot, force);
      });
      this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
      if (range != null) {
        this.quill.setSelection(range, _core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
      }
    }
  }, {
    key: "highlightBlot",
    value: function highlightBlot(text) {
      var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'plain';
      language = this.languages[language] ? language : 'plain';
      if (language === 'plain') {
        return (0,_blots_text__WEBPACK_IMPORTED_MODULE_8__/* .escapeText */ .b)(text).split('\n').reduce(function (delta, line, i) {
          if (i !== 0) {
            delta.insert('\n', _defineProperty({}, _formats_code__WEBPACK_IMPORTED_MODULE_9__/* ["default"].blotName */ .ZP.blotName, language));
          }
          return delta.insert(line);
        }, new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())());
      }
      var container = this.quill.root.ownerDocument.createElement('div');
      container.classList.add(_formats_code__WEBPACK_IMPORTED_MODULE_9__/* ["default"].className */ .ZP.className);
      container.innerHTML = this.options.hljs.highlight(language, text).value;
      return (0,_clipboard__WEBPACK_IMPORTED_MODULE_10__/* .traverse */ .fw)(this.quill.scroll, container, [function (node, delta) {
        var value = TokenAttributor.value(node);
        if (value) {
          return delta.compose(new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().retain(delta.length(), _defineProperty({}, CodeToken.blotName, value)));
        }
        return delta;
      }], [function (node, delta) {
        return node.data.split('\n').reduce(function (memo, nodeText, i) {
          if (i !== 0) memo.insert('\n', _defineProperty({}, _formats_code__WEBPACK_IMPORTED_MODULE_9__/* ["default"].blotName */ .ZP.blotName, language));
          return memo.insert(nodeText);
        }, delta);
      }], new WeakMap());
    }
  }], [{
    key: "register",
    value: function register() {
      _core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].register */ .ZP.register(CodeToken, true);
      _core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].register */ .ZP.register(SyntaxCodeBlock, true);
      _core_quill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].register */ .ZP.register(SyntaxCodeBlockContainer, true);
    }
  }]);
  return Syntax;
}(_core_module__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);
Syntax.DEFAULTS = {
  hljs: function () {
    if ((0,_utils_has_window__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)()) {
      return window.hljs;
    }
    return null;
  }(),
  interval: 1000,
  languages: [{
    key: 'plain',
    label: 'Plain'
  }, {
    key: 'bash',
    label: 'Bash'
  }, {
    key: 'cpp',
    label: 'C++'
  }, {
    key: 'cs',
    label: 'C#'
  }, {
    key: 'css',
    label: 'CSS'
  }, {
    key: 'diff',
    label: 'Diff'
  }, {
    key: 'xml',
    label: 'HTML/XML'
  }, {
    key: 'java',
    label: 'Java'
  }, {
    key: 'javascript',
    label: 'Javascript'
  }, {
    key: 'markdown',
    label: 'Markdown'
  }, {
    key: 'php',
    label: 'PHP'
  }, {
    key: 'python',
    label: 'Python'
  }, {
    key: 'ruby',
    label: 'Ruby'
  }, {
    key: 'sql',
    label: 'SQL'
  }]
};

// eslint-disable-next-line no-restricted-exports


/***/ }),

/***/ 867:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9098);
/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1233);
/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(281);
/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7094);
/* harmony import */ var _formats_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1969);
/* harmony import */ var _utils_is_defined__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5874);
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5635);
/* harmony import */ var _utils_make_table_arrow_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9466);
/* harmony import */ var _utils_prepare_attr_matcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7896);
/* harmony import */ var _formats_table_attributors_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(319);
/* harmony import */ var _formats_table_attributors_cell__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1342);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }











var EMPTY_RESULT = [null, null, null, -1];
var Table = /*#__PURE__*/function (_Module) {
  _inherits(Table, _Module);
  var _super = _createSuper(Table);
  function Table() {
    var _this;
    _classCallCheck(this, Table);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.tableBlots = [_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .CellLine.blotName */ .zW.blotName, _formats_table__WEBPACK_IMPORTED_MODULE_4__/* .HeaderCellLine.blotName */ .iD.blotName];
    _this.tableBlots.forEach(function (blotName) {
      _this.quill.editor.addImmediateFormat(blotName);
    });
    _this.integrateClipboard();
    _this.addKeyboardHandlers();
    _this.listenBalanceCells();
    return _this;
  }
  _createClass(Table, [{
    key: "integrateClipboard",
    value: function integrateClipboard() {
      var _this2 = this;
      this.tableBlots.forEach(function (blotName) {
        _this2.quill.clipboard.addTableBlot(blotName);
      });
      this.quill.clipboard.addMatcher('td, th', matchCell);
      this.quill.clipboard.addMatcher('table', (0,_utils_prepare_attr_matcher__WEBPACK_IMPORTED_MODULE_7__/* .prepareAttributeMatcher */ .F)(_formats_table_attributors_table__WEBPACK_IMPORTED_MODULE_8__/* .TABLE_ATTRIBUTORS */ .Zt));
      this.quill.clipboard.addMatcher('td, th', (0,_utils_prepare_attr_matcher__WEBPACK_IMPORTED_MODULE_7__/* .prepareCellAttributeMatcher */ .a)(_formats_table_attributors_cell__WEBPACK_IMPORTED_MODULE_9__/* .CELL_ATTRIBUTORS */ .h6));
    }
  }, {
    key: "addKeyboardHandlers",
    value: function addKeyboardHandlers() {
      var _this3 = this;
      var bindings = Table.keyboardBindings;
      Object.keys(bindings).forEach(function (name) {
        if (bindings[name]) {
          _this3.quill.keyboard.addBinding(bindings[name]);
        }
      });
    }
  }, {
    key: "balanceTables",
    value: function balanceTables() {
      this.quill.scroll.descendants(_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .TableContainer */ .xJ).forEach(function (table) {
        table.balanceCells();
      });
    }
  }, {
    key: "deleteColumn",
    value: function deleteColumn() {
      var _this$getTable = this.getTable(),
        _this$getTable2 = _slicedToArray(_this$getTable, 3),
        table = _this$getTable2[0],
        cell = _this$getTable2[2];
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(cell)) {
        return;
      }
      table.deleteColumn(cell.cellOffset());
      this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
    }
  }, {
    key: "deleteRow",
    value: function deleteRow() {
      var _this$getTable3 = this.getTable(),
        _this$getTable4 = _slicedToArray(_this$getTable3, 2),
        row = _this$getTable4[1];
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(row)) {
        return;
      }
      row.remove();
      this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
    }
  }, {
    key: "deleteTable",
    value: function deleteTable() {
      var _this$getTable5 = this.getTable(),
        _this$getTable6 = _slicedToArray(_this$getTable5, 1),
        table = _this$getTable6[0];
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(table)) {
        return;
      }
      var offset = table.offset();
      table.remove();
      this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
      this.quill.setSelection(offset, _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
    }
  }, {
    key: "getTable",
    value: function getTable() {
      var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.quill.getSelection();
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(range)) {
        return EMPTY_RESULT;
      }
      var _this$quill$getLine = this.quill.getLine(range.index),
        _this$quill$getLine2 = _slicedToArray(_this$quill$getLine, 2),
        cellLine = _this$quill$getLine2[0],
        offset = _this$quill$getLine2[1];
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(cellLine) || this.tableBlots.indexOf(cellLine.statics.blotName) === -1) {
        return EMPTY_RESULT;
      }
      var cell = cellLine.parent;
      var row = cell.parent;
      var table = row.parent.parent;
      return [table, row, cell, offset];
    }
  }, {
    key: "insertColumn",
    value: function insertColumn(offset) {
      var range = this.quill.getSelection();
      var _this$getTable7 = this.getTable(range),
        _this$getTable8 = _slicedToArray(_this$getTable7, 3),
        table = _this$getTable8[0],
        row = _this$getTable8[1],
        cell = _this$getTable8[2];
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(cell)) {
        return;
      }
      var column = cell.cellOffset();
      table.insertColumn(column + offset);
      this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
      var shift = row.rowOffset();
      if (offset === 0) {
        shift += 1;
      }
      this.quill.setSelection(range.index + shift, range.length, _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
    }
  }, {
    key: "insertColumnLeft",
    value: function insertColumnLeft() {
      this.insertColumn(0);
    }
  }, {
    key: "insertColumnRight",
    value: function insertColumnRight() {
      this.insertColumn(1);
    }
  }, {
    key: "insertRow",
    value: function insertRow(offset) {
      var range = this.quill.getSelection();
      var _this$getTable9 = this.getTable(range),
        _this$getTable10 = _slicedToArray(_this$getTable9, 3),
        table = _this$getTable10[0],
        row = _this$getTable10[1],
        cell = _this$getTable10[2];
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(cell)) {
        return;
      }
      var index = row.rowOffset();
      table.insertRow(index + offset);
      this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
      if (offset > 0) {
        this.quill.setSelection(range, _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
      } else {
        this.quill.setSelection(range.index + row.children.length, range.length, _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
      }
    }
  }, {
    key: "insertRowAbove",
    value: function insertRowAbove() {
      this.insertRow(0);
    }
  }, {
    key: "insertRowBelow",
    value: function insertRowBelow() {
      this.insertRow(1);
    }
  }, {
    key: "insertHeaderRow",
    value: function insertHeaderRow() {
      var range = this.quill.getSelection();
      var _this$getTable11 = this.getTable(range),
        _this$getTable12 = _slicedToArray(_this$getTable11, 3),
        table = _this$getTable12[0],
        cell = _this$getTable12[2];
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(cell)) {
        return;
      }
      table.insertHeaderRow();
      this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
    }
  }, {
    key: "insertTable",
    value: function insertTable(rows, columns) {
      var range = this.quill.getSelection();
      if (!(0,_utils_is_defined__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(range)) {
        return;
      }
      var delta = new Array(rows).fill(0).reduce(function (memo) {
        var rowId = (0,_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .tableId */ .Lv)();
        new Array(columns).fill('\n').forEach(function (text) {
          memo.insert(text, {
            tableCellLine: {
              row: rowId,
              cell: (0,_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .tableId */ .Lv)()
            }
          });
        });
        return memo;
      }, new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().retain(range.index));
      this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
      this.quill.setSelection(range.index, _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
      this.balanceTables();
    }
  }, {
    key: "tableFormats",
    value: function tableFormats() {
      return this.tableBlots;
    }
  }, {
    key: "listenBalanceCells",
    value: function listenBalanceCells() {
      var _this4 = this;
      this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].events.SCROLL_OPTIMIZE */ .ZP.events.SCROLL_OPTIMIZE, function (mutations) {
        mutations.some(function (mutation) {
          if (['TD', 'TH', 'TR', 'TBODY', 'THEAD', 'TABLE'].indexOf(mutation.target.tagName) !== -1) {
            _this4.quill.once(_core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].events.TEXT_CHANGE */ .ZP.events.TEXT_CHANGE, function (delta, old, source) {
              if (source !== _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER) return;
              _this4.balanceTables();
            });
            return true;
          }
          return false;
        });
      });
      this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].events.CONTENT_SETTED */ .ZP.events.CONTENT_SETTED, function () {
        _this4.quill.once(_core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].events.TEXT_CHANGE */ .ZP.events.TEXT_CHANGE, function () {
          _this4.balanceTables();
        });
      });
    }
  }], [{
    key: "register",
    value: function register() {
      _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].register */ .ZP.register(_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .CellLine */ .zW, true);
      _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].register */ .ZP.register(_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .HeaderCellLine */ .iD, true);
      _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].register */ .ZP.register(_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .TableHeaderCell */ .xs, true);
      _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].register */ .ZP.register(_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .TableCell */ .pj, true);
      _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].register */ .ZP.register(_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .TableHeaderRow */ .KA, true);
      _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].register */ .ZP.register(_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .TableRow */ .SC, true);
      _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].register */ .ZP.register(_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .TableBody */ .RM, true);
      _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].register */ .ZP.register(_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .TableHeader */ .xD, true);
      _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].register */ .ZP.register(_formats_table__WEBPACK_IMPORTED_MODULE_4__/* .TableContainer */ .xJ, true);
      [_formats_table_attributors_table__WEBPACK_IMPORTED_MODULE_8__/* .TABLE_FORMATS */ .li, _formats_table_attributors_cell__WEBPACK_IMPORTED_MODULE_9__/* .CELL_FORMATS */ .Du].forEach(function (formats) {
        Object.keys(formats).forEach(function (name) {
          _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].register */ .ZP.register(_defineProperty({}, "formats/".concat(name), formats[name]), true);
        });
      });
    }
  }]);
  return Table;
}(_core_module__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
Table.keyboardBindings = {
  'table backspace': {
    key: 'backspace',
    format: ['tableCellLine', 'tableHeaderCellLine'],
    collapsed: true,
    offset: 0,
    handler: function handler(range) {
      var _this$quill$getLine3 = this.quill.getLine(range.index),
        _this$quill$getLine4 = _slicedToArray(_this$quill$getLine3, 1),
        line = _this$quill$getLine4[0];
      if (!line.prev || ['tableCellLine', 'tableHeaderCellLine'].indexOf(line.prev.statics.blotName) === -1) {
        return false;
      }
      return true;
    }
  },
  'table delete': {
    key: 'del',
    format: ['tableCellLine', 'tableHeaderCellLine'],
    collapsed: true,
    suffix: /^$/,
    handler: function handler() {}
  },
  'table cell enter': {
    key: 'enter',
    shiftKey: null,
    format: ['tableCellLine', 'tableHeaderCellLine'],
    handler: function handler(range, context) {
      var _this$quill$selection,
        _this5 = this;
      if ((_this$quill$selection = this.quill.selection) !== null && _this$quill$selection !== void 0 && _this$quill$selection.composing) return;
      if (range.length > 0) {
        this.quill.scroll.deleteAt(range.index, range.length);
      }
      var lineFormats = Object.keys(context.format).reduce(function (formats, format) {
        if (_this5.quill.scroll.query(format, parchment__WEBPACK_IMPORTED_MODULE_1__.Scope.BLOCK) && !Array.isArray(context.format[format])) {
          formats[format] = context.format[format];
        }
        return formats;
      }, {});
      this.quill.insertText(range.index, '\n', lineFormats.tableCellLine, _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
      this.quill.setSelection(range.index + 1, _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.SILENT */ .ZP.sources.SILENT);
      this.quill.focus();
      Object.keys(context.format).forEach(function (name) {
        if (lineFormats[name] != null) return;
        if (Array.isArray(context.format[name])) return;
        if (name === 'link') return;
        _this5.quill.format(name, context.format[name], _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
      });
    }
  },
  'table tab': {
    key: 'tab',
    shiftKey: null,
    format: ['tableCellLine', 'tableHeaderCellLine'],
    handler: function handler(range, context) {
      var event = context.event,
        cell = context.line;
      var offset = cell.offset(this.quill.scroll);
      if (event.shiftKey) {
        this.quill.setSelection(offset - 1, _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
      } else {
        this.quill.setSelection(offset + cell.length(), _core_quill__WEBPACK_IMPORTED_MODULE_2__/* ["default"].sources.USER */ .ZP.sources.USER);
      }
    }
  },
  'table down': (0,_utils_make_table_arrow_handler__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(false, ['tableCellLine', 'tableHeaderCellLine']),
  'table up': (0,_utils_make_table_arrow_handler__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(true, ['tableCellLine', 'tableHeaderCellLine'])
};
function matchCell(node, delta) {
  var row = node.parentNode;
  var table = row.parentNode.tagName === 'TABLE' ? row.parentNode : row.parentNode.parentNode;
  var isHeaderRow = row.parentNode.tagName === 'THEAD' ? true : null;
  var rows = Array.from(table.querySelectorAll('tr'));
  var cells = Array.from(row.querySelectorAll('th,td'));
  var rowId = rows.indexOf(row) + 1;
  var cellId = cells.indexOf(node) + 1;
  var cellLineBlotName = isHeaderRow ? 'tableHeaderCellLine' : 'tableCellLine';
  if (delta.length() === 0) {
    delta = new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().insert('\n', _defineProperty({}, cellLineBlotName, {
      row: rowId,
      cell: cellId
    }));
    return delta;
  }
  if (!(0,_clipboard__WEBPACK_IMPORTED_MODULE_5__/* .deltaEndsWith */ .PF)(delta, '\n')) {
    delta.insert('\n');
  }
  return (0,_clipboard__WEBPACK_IMPORTED_MODULE_5__/* .applyFormat */ .HI)(delta, cellLineBlotName, {
    row: rowId,
    cell: cellId
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);

/***/ }),

/***/ 7215:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ lite)
});

// EXTERNAL MODULE: ./node_modules/quill-delta/dist/Delta.js
var Delta = __webpack_require__(9098);
var Delta_default = /*#__PURE__*/__webpack_require__.n(Delta);
// EXTERNAL MODULE: ./core/quill.js
var core_quill = __webpack_require__(281);
// EXTERNAL MODULE: ./core/module.js
var core_module = __webpack_require__(7094);
// EXTERNAL MODULE: ./blots/block.js + 1 modules
var block = __webpack_require__(6446);
// EXTERNAL MODULE: ./blots/container.js
var container = __webpack_require__(3553);
// EXTERNAL MODULE: ./utils/is_defined.js
var is_defined = __webpack_require__(5874);
// EXTERNAL MODULE: ./formats/table/attributors/table.js
var table = __webpack_require__(319);
// EXTERNAL MODULE: ./formats/table/get_id.js
var get_id = __webpack_require__(8536);
// EXTERNAL MODULE: ./formats/table/toggle_attribute.js
var toggle_attribute = __webpack_require__(2795);
;// CONCATENATED MODULE: ./formats/table/lite.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var TABLE_TAGS = (/* unused pure expression or super */ null && (['TD', 'TH', 'TR', 'TBODY', 'THEAD', 'TABLE']));
var DATA_PREFIX = 'data-tablelite-';
var BaseCell = /*#__PURE__*/function (_Block) {
  _inherits(BaseCell, _Block);
  var _super = _createSuper(BaseCell);
  function BaseCell() {
    _classCallCheck(this, BaseCell);
    return _super.apply(this, arguments);
  }
  _createClass(BaseCell, [{
    key: "format",
    value: function format(name, value) {
      if (table/* TABLE_FORMATS */.li[name]) {
        var _this$row, _this$row$table;
        var attrName = "data-".concat(name.toLowerCase());
        (0,toggle_attribute/* default */.Z)(this.domNode, attrName, value);
        (_this$row = this.row()) === null || _this$row === void 0 ? void 0 : (_this$row$table = _this$row.table()) === null || _this$row$table === void 0 ? void 0 : _this$row$table.format(name, value);
      } else {
        _get(_getPrototypeOf(BaseCell.prototype), "format", this).call(this, name, value);
      }
    }
  }, {
    key: "cellOffset",
    value: function cellOffset() {
      if (this.parent) {
        return this.parent.children.indexOf(this);
      }
      return -1;
    }
  }, {
    key: "row",
    value: function row() {
      return 'table' in this.parent ? this.parent : null;
    }
  }, {
    key: "rowOffset",
    value: function rowOffset() {
      if (this.row()) {
        return this.row().rowOffset();
      }
      return -1;
    }
  }, {
    key: "table",
    value: function table() {
      var _this$row2;
      return (_this$row2 = this.row()) === null || _this$row2 === void 0 ? void 0 : _this$row2.table();
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(BaseCell), "create", this).call(this);
      var attrName = this.dataAttribute;
      (0,toggle_attribute/* default */.Z)(node, attrName, value !== null && value !== void 0 ? value : tableId());
      return node;
    }
  }, {
    key: "formats",
    value: function formats(domNode) {
      var attrName = this.dataAttribute;
      if (domNode.hasAttribute(attrName)) {
        return domNode.getAttribute(attrName);
      }
      return undefined;
    }
  }]);
  return BaseCell;
}(block/* default */.ZP);
BaseCell.tagName = ['TD', 'TH'];
var TableCell = /*#__PURE__*/function (_BaseCell) {
  _inherits(TableCell, _BaseCell);
  var _super2 = _createSuper(TableCell);
  function TableCell() {
    _classCallCheck(this, TableCell);
    return _super2.apply(this, arguments);
  }
  _createClass(TableCell, [{
    key: "format",
    value: function format(name, value) {
      if (name === TableCell.blotName && value) {
        this.domNode.setAttribute(TableCell.dataAttribute, value);
      } else {
        _get(_getPrototypeOf(TableCell.prototype), "format", this).call(this, name, value);
      }
    }
  }]);
  return TableCell;
}(BaseCell);
TableCell.blotName = 'table';
TableCell.dataAttribute = "".concat(DATA_PREFIX, "row");
var TableHeaderCell = /*#__PURE__*/function (_BaseCell2) {
  _inherits(TableHeaderCell, _BaseCell2);
  var _super3 = _createSuper(TableHeaderCell);
  function TableHeaderCell() {
    _classCallCheck(this, TableHeaderCell);
    return _super3.apply(this, arguments);
  }
  _createClass(TableHeaderCell, [{
    key: "format",
    value: function format(name, value) {
      if (name === TableHeaderCell.blotName && value) {
        this.domNode.setAttribute(TableHeaderCell.dataAttribute, value);
      } else {
        _get(_getPrototypeOf(TableHeaderCell.prototype), "format", this).call(this, name, value);
      }
    }
  }]);
  return TableHeaderCell;
}(BaseCell);
TableHeaderCell.tagName = ['TH', 'TD'];
TableHeaderCell.blotName = 'tableHeaderCell';
TableHeaderCell.dataAttribute = "".concat(DATA_PREFIX, "header-row");
var BaseRow = /*#__PURE__*/function (_Container) {
  _inherits(BaseRow, _Container);
  var _super4 = _createSuper(BaseRow);
  function BaseRow() {
    _classCallCheck(this, BaseRow);
    return _super4.apply(this, arguments);
  }
  _createClass(BaseRow, [{
    key: "checkMerge",
    value: function checkMerge() {
      if (_get(_getPrototypeOf(BaseRow.prototype), "checkMerge", this).call(this) && (0,is_defined/* default */.Z)(this.next.children.head)) {
        var formatName = this.childFormatName;
        var thisHead = this.children.head.formats();
        var thisTail = this.children.tail.formats();
        var nextHead = this.next.children.head.formats();
        var nextTail = this.next.children.tail.formats();
        return thisHead[formatName] === thisTail[formatName] && thisHead[formatName] === nextHead[formatName] && thisHead[formatName] === nextTail[formatName];
      }
      return false;
    }
  }, {
    key: "optimize",
    value: function optimize() {
      var _get2,
        _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      (_get2 = _get(_getPrototypeOf(BaseRow.prototype), "optimize", this)).call.apply(_get2, [this].concat(args));
      var formatName = this.childFormatName;
      this.children.forEach(function (child) {
        if (!(0,is_defined/* default */.Z)(child.next)) {
          return;
        }
        var childFormats = child.formats();
        var nextFormats = child.next.formats();
        if (childFormats[formatName] !== nextFormats[formatName]) {
          var next = _this.splitAfter(child);
          if (next) {
            next.optimize();
          }
          // We might be able to merge with prev now
          if (_this.prev) {
            _this.prev.optimize();
          }
        }
      });
    }
  }, {
    key: "rowOffset",
    value: function rowOffset() {
      if (this.parent) {
        return this.parent.children.indexOf(this);
      }
      return -1;
    }
  }, {
    key: "table",
    value: function table() {
      var _this$parent;
      return (_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.parent;
    }
  }]);
  return BaseRow;
}(container/* default */.Z);
BaseRow.tagName = 'TR';
var TableRow = /*#__PURE__*/function (_BaseRow) {
  _inherits(TableRow, _BaseRow);
  var _super5 = _createSuper(TableRow);
  function TableRow(scroll, domNode) {
    var _this2;
    _classCallCheck(this, TableRow);
    _this2 = _super5.call(this, scroll, domNode);
    _this2.childFormatName = 'table';
    return _this2;
  }
  return _createClass(TableRow);
}(BaseRow);
TableRow.blotName = 'tableRow';
var TableHeaderRow = /*#__PURE__*/function (_BaseRow2) {
  _inherits(TableHeaderRow, _BaseRow2);
  var _super6 = _createSuper(TableHeaderRow);
  function TableHeaderRow(scroll, domNode) {
    var _this3;
    _classCallCheck(this, TableHeaderRow);
    _this3 = _super6.call(this, scroll, domNode);
    _this3.childFormatName = 'tableHeaderCell';
    return _this3;
  }
  return _createClass(TableHeaderRow);
}(BaseRow);
TableHeaderRow.blotName = 'tableHeaderRow';
var RowContainer = /*#__PURE__*/function (_Container2) {
  _inherits(RowContainer, _Container2);
  var _super7 = _createSuper(RowContainer);
  function RowContainer() {
    _classCallCheck(this, RowContainer);
    return _super7.apply(this, arguments);
  }
  _createClass(RowContainer, [{
    key: "optimize",
    value: function optimize() {
      var _get3;
      if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
        var domNode = this.children.head.children.head.domNode;
        var formats = {};
        Object.keys(table/* TABLE_FORMATS */.li).forEach(function (format) {
          var value = domNode.dataset[format.toLowerCase()];
          if (value) {
            formats[format] = value;
          }
        });
        this.wrap(this.statics.requiredContainer.blotName, formats);
      }
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      (_get3 = _get(_getPrototypeOf(RowContainer.prototype), "optimize", this)).call.apply(_get3, [this].concat(args));
    }
  }]);
  return RowContainer;
}(container/* default */.Z);
var TableBody = /*#__PURE__*/function (_RowContainer) {
  _inherits(TableBody, _RowContainer);
  var _super8 = _createSuper(TableBody);
  function TableBody() {
    _classCallCheck(this, TableBody);
    return _super8.apply(this, arguments);
  }
  return _createClass(TableBody);
}(RowContainer);
TableBody.blotName = 'tableBody';
TableBody.tagName = ['TBODY'];
var TableHeader = /*#__PURE__*/function (_RowContainer2) {
  _inherits(TableHeader, _RowContainer2);
  var _super9 = _createSuper(TableHeader);
  function TableHeader() {
    _classCallCheck(this, TableHeader);
    return _super9.apply(this, arguments);
  }
  return _createClass(TableHeader);
}(RowContainer);
TableHeader.blotName = 'tableHeader';
TableHeader.tagName = ['THEAD'];
var TableContainer = /*#__PURE__*/function (_Container3) {
  _inherits(TableContainer, _Container3);
  var _super10 = _createSuper(TableContainer);
  function TableContainer() {
    _classCallCheck(this, TableContainer);
    return _super10.apply(this, arguments);
  }
  _createClass(TableContainer, [{
    key: "balanceCells",
    value: function balanceCells() {
      var headerRows = this.descendants(TableHeaderRow);
      var bodyRows = this.descendants(TableRow);
      var maxColCount = this.getMaxTableColCount(headerRows, bodyRows);
      this.balanceRows(maxColCount, headerRows, TableHeaderCell);
      this.balanceRows(maxColCount, bodyRows, TableCell);
    }
  }, {
    key: "getMaxTableColCount",
    value: function getMaxTableColCount(headerRows, bodyRows) {
      return Math.max(this.getMaxRowColCount(headerRows), this.getMaxRowColCount(bodyRows));
    }
  }, {
    key: "getMaxRowColCount",
    value: function getMaxRowColCount(rows) {
      return Math.max.apply(Math, _toConsumableArray(rows.map(function (row) {
        return row.children.length;
      })));
    }
  }, {
    key: "balanceRows",
    value: function balanceRows(maxColCount, rows, CellClass) {
      var _this4 = this;
      rows.forEach(function (row) {
        new Array(maxColCount - row.children.length).fill(0).forEach(function () {
          var value;
          if ((0,is_defined/* default */.Z)(row.children.head)) {
            value = CellClass.formats(row.children.head.domNode);
          }
          var blot = _this4.scroll.create(CellClass.blotName, value);
          row.appendChild(blot);
          blot.optimize(); // Add break blot
        });
      });
    }
  }, {
    key: "cells",
    value: function cells(column) {
      return this.rows().map(function (row) {
        return row.children.at(column);
      });
    }
  }, {
    key: "deleteColumn",
    value: function deleteColumn(index) {
      var _this5 = this;
      [TableHeader, TableBody].forEach(function (blot) {
        var _this5$descendants = _this5.descendants(blot),
          _this5$descendants2 = _slicedToArray(_this5$descendants, 1),
          tablePart = _this5$descendants2[0];
        if (!(0,is_defined/* default */.Z)(tablePart) || !(0,is_defined/* default */.Z)(tablePart.children.head)) {
          return;
        }
        tablePart.children.forEach(function (row) {
          var cell = row.children.at(index);
          if ((0,is_defined/* default */.Z)(cell)) {
            cell.remove();
          }
        });
      });
    }
  }, {
    key: "insertColumn",
    value: function insertColumn(index) {
      var _this6 = this;
      [TableHeader, TableBody].forEach(function (blot) {
        var _this6$descendants = _this6.descendants(blot),
          _this6$descendants2 = _slicedToArray(_this6$descendants, 1),
          tablePart = _this6$descendants2[0];
        if (!(0,is_defined/* default */.Z)(tablePart) || !(0,is_defined/* default */.Z)(tablePart.children.head)) {
          return;
        }
        var CellBlot = blot === TableHeader ? TableHeaderCell : TableCell;
        tablePart.children.forEach(function (row) {
          var ref = row.children.at(index);
          var value = CellBlot.formats(row.children.head.domNode);
          var cell = _this6.scroll.create(CellBlot.blotName, value);
          row.insertBefore(cell, ref);
        });
      });
    }
  }, {
    key: "insertRow",
    value: function insertRow(index) {
      var _this7 = this;
      var _this$descendants = this.descendants(TableBody),
        _this$descendants2 = _slicedToArray(_this$descendants, 1),
        body = _this$descendants2[0];
      if (!(0,is_defined/* default */.Z)(body) || !(0,is_defined/* default */.Z)(body.children.head)) {
        return;
      }
      var id = tableId();
      var row = this.scroll.create(TableRow.blotName);
      body.children.head.children.forEach(function () {
        var cell = _this7.scroll.create(TableCell.blotName, id);
        row.appendChild(cell);
      });
      var ref = body.children.at(index);
      body.insertBefore(row, ref);
    }
  }, {
    key: "insertHeaderRow",
    value: function insertHeaderRow() {
      var _this8 = this;
      var _this$descendants3 = this.descendants(TableHeader),
        _this$descendants4 = _slicedToArray(_this$descendants3, 1),
        header = _this$descendants4[0];
      var _this$descendants5 = this.descendants(TableBody),
        _this$descendants6 = _slicedToArray(_this$descendants5, 1),
        body = _this$descendants6[0];
      if ((0,is_defined/* default */.Z)(header) || !(0,is_defined/* default */.Z)(body) || !(0,is_defined/* default */.Z)(body.children.head)) {
        return;
      }
      var id = tableId();
      var newHeader = this.scroll.create(TableHeader.blotName);
      var row = this.scroll.create(TableHeaderRow.blotName);
      var ref = this.children.at(0);
      newHeader.appendChild(row);
      body.children.head.children.forEach(function () {
        var cell = _this8.scroll.create(TableHeaderCell.blotName, id);
        row.appendChild(cell);
        cell.optimize();
      });
      this.insertBefore(newHeader, ref);
    }
  }, {
    key: "rows",
    value: function rows() {
      var body = this.children.head;
      return (0,is_defined/* default */.Z)(body) ? body.children.map(function (row) {
        return row;
      }) : [];
    }
  }, {
    key: "formats",
    value: function formats() {
      var formats = {};
      var childElem = this.cells()[0].domNode;
      Object.keys(table/* TABLE_FORMATS */.li).forEach(function (format) {
        var value = childElem.dataset[format.toLowerCase()];
        if (value) {
          formats[format] = value;
        }
      });
      return formats;
    }
  }, {
    key: "format",
    value: function format(name, value) {
      var tableFormat = table/* TABLE_FORMATS */.li[name];
      if (tableFormat) {
        var attrName = "data-".concat(name.toLowerCase());
        this.cells().forEach(function (cell) {
          (0,toggle_attribute/* default */.Z)(cell.domNode, attrName, value);
        });
        tableFormat.add(this.domNode, value);
      }
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(TableContainer), "create", this).call(this, value);
      if (value) {
        Object.keys(value).forEach(function (format) {
          var _TABLE_FORMATS$format;
          (_TABLE_FORMATS$format = table/* TABLE_FORMATS */.li[format]) === null || _TABLE_FORMATS$format === void 0 ? void 0 : _TABLE_FORMATS$format.add(node, value[format]);
        });
      }
      return node;
    }
  }]);
  return TableContainer;
}(container/* default */.Z);
TableContainer.blotName = 'tableContainer';
TableContainer.tagName = 'TABLE';
TableContainer.allowedChildren = [TableHeader, TableBody];
TableBody.requiredContainer = TableContainer;
TableHeader.requiredContainer = TableContainer;
TableBody.allowedChildren = [TableRow];
TableRow.requiredContainer = TableBody;
TableRow.allowedChildren = [TableCell];
TableCell.requiredContainer = TableRow;
TableHeader.allowedChildren = [TableHeaderRow];
TableHeaderRow.requiredContainer = TableHeader;
TableHeaderRow.allowedChildren = [TableHeaderCell];
TableHeaderCell.requiredContainer = TableHeaderRow;
function tableId() {
  return "row-".concat((0,get_id/* default */.Z)());
}

// EXTERNAL MODULE: ./modules/clipboard.js
var clipboard = __webpack_require__(5635);
// EXTERNAL MODULE: ./modules/table/utils/make_table_arrow_handler.js
var make_table_arrow_handler = __webpack_require__(9466);
;// CONCATENATED MODULE: ./modules/table/utils/insert_pr_below.js


function insertParagraphAbove(_ref) {
  var quill = _ref.quill,
    index = _ref.index,
    range = _ref.range;
  var insertIndex = index - 1;
  var delta = new (Delta_default())().retain(insertIndex).insert('\n');
  quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
  quill.setSelection(range.index + 1, range.length, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
}
;// CONCATENATED MODULE: ./modules/table/utils/insert_pr_above.js


function insertParagraphBelow(_ref) {
  var quill = _ref.quill,
    index = _ref.index,
    table = _ref.table;
  var insertIndex = index + table.length();
  var delta = new (Delta_default())().retain(insertIndex).insert('\n');
  quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
  quill.setSelection(insertIndex, core_quill/* default.sources.USER */.ZP.sources.USER);
}
;// CONCATENATED MODULE: ./modules/table/utils/table_side.js
function tableSide(row, cell, offset) {
  if (row.prev == null && row.next == null) {
    if (cell.prev == null && cell.next == null) {
      return offset === 0 ? -1 : 1;
    }
    return cell.prev == null ? -1 : 1;
  }
  if (row.prev == null) {
    return -1;
  }
  if (row.next == null) {
    return 1;
  }
  return null;
}
// EXTERNAL MODULE: ./modules/table/utils/prepare_attr_matcher.js
var prepare_attr_matcher = __webpack_require__(7896);
// EXTERNAL MODULE: ./formats/table/attributors/cell.js
var cell = __webpack_require__(1342);
;// CONCATENATED MODULE: ./modules/table/lite.js
function lite_typeof(obj) { "@babel/helpers - typeof"; return lite_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, lite_typeof(obj); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function lite_slicedToArray(arr, i) { return lite_arrayWithHoles(arr) || lite_iterableToArrayLimit(arr, i) || lite_unsupportedIterableToArray(arr, i) || lite_nonIterableRest(); }
function lite_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function lite_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return lite_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return lite_arrayLikeToArray(o, minLen); }
function lite_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function lite_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function lite_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function lite_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function lite_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function lite_createClass(Constructor, protoProps, staticProps) { if (protoProps) lite_defineProperties(Constructor.prototype, protoProps); if (staticProps) lite_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function lite_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) lite_setPrototypeOf(subClass, superClass); }
function lite_setPrototypeOf(o, p) { lite_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return lite_setPrototypeOf(o, p); }
function lite_createSuper(Derived) { var hasNativeReflectConstruct = lite_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = lite_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = lite_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return lite_possibleConstructorReturn(this, result); }; }
function lite_possibleConstructorReturn(self, call) { if (call && (lite_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return lite_assertThisInitialized(self); }
function lite_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function lite_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function lite_getPrototypeOf(o) { lite_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return lite_getPrototypeOf(o); }













var EMPTY_RESULT = [null, null, null, -1];
var TableLite = /*#__PURE__*/function (_Module) {
  lite_inherits(TableLite, _Module);
  var _super = lite_createSuper(TableLite);
  function TableLite() {
    var _this;
    lite_classCallCheck(this, TableLite);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.tableBlots = [TableCell.blotName, TableHeaderCell.blotName];
    _this.tableBlots.forEach(function (blotName) {
      _this.quill.editor.addImmediateFormat(blotName);
    });
    _this.integrateClipboard();
    _this.addKeyboardHandlers();
    _this.listenBalanceCells();
    return _this;
  }
  lite_createClass(TableLite, [{
    key: "integrateClipboard",
    value: function integrateClipboard() {
      var _this2 = this;
      this.tableBlots.forEach(function (blotName) {
        return _this2.quill.clipboard.addTableBlot(blotName);
      });
      this.quill.clipboard.addMatcher('tr', matchTable);
      this.quill.clipboard.addMatcher('table', (0,prepare_attr_matcher/* prepareAttributeMatcher */.F)(table/* TABLE_ATTRIBUTORS */.Zt));
      this.quill.clipboard.addMatcher('td, th', (0,prepare_attr_matcher/* prepareCellAttributeMatcher */.a)(cell/* CELL_ATTRIBUTORS */.h6));
    }
  }, {
    key: "addKeyboardHandlers",
    value: function addKeyboardHandlers() {
      var _this3 = this;
      var bindings = TableLite.keyboardBindings;
      Object.keys(bindings).forEach(function (name) {
        if (bindings[name]) {
          _this3.quill.keyboard.addBinding(bindings[name]);
        }
      });
    }
  }, {
    key: "balanceTables",
    value: function balanceTables() {
      this.quill.scroll.descendants(TableContainer).forEach(function (table) {
        table.balanceCells();
      });
    }
  }, {
    key: "deleteColumn",
    value: function deleteColumn() {
      var _this$getTable = this.getTable(),
        _this$getTable2 = lite_slicedToArray(_this$getTable, 3),
        table = _this$getTable2[0],
        cell = _this$getTable2[2];
      if (!(0,is_defined/* default */.Z)(cell)) {
        return;
      }
      table.deleteColumn(cell.cellOffset());
      this.quill.update(core_quill/* default.sources.USER */.ZP.sources.USER);
    }
  }, {
    key: "deleteRow",
    value: function deleteRow() {
      var _this$getTable3 = this.getTable(),
        _this$getTable4 = lite_slicedToArray(_this$getTable3, 2),
        row = _this$getTable4[1];
      if (!(0,is_defined/* default */.Z)(row)) {
        return;
      }
      row.remove();
      this.quill.update(core_quill/* default.sources.USER */.ZP.sources.USER);
    }
  }, {
    key: "deleteTable",
    value: function deleteTable() {
      var _this$getTable5 = this.getTable(),
        _this$getTable6 = lite_slicedToArray(_this$getTable5, 1),
        table = _this$getTable6[0];
      if (!(0,is_defined/* default */.Z)(table)) {
        return;
      }
      var offset = table.offset();
      table.remove();
      this.quill.update(core_quill/* default.sources.USER */.ZP.sources.USER);
      this.quill.setSelection(offset, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
    }
  }, {
    key: "getTable",
    value: function getTable() {
      var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.quill.getSelection();
      if (!(0,is_defined/* default */.Z)(range)) {
        return EMPTY_RESULT;
      }
      var _this$quill$getLine = this.quill.getLine(range.index),
        _this$quill$getLine2 = lite_slicedToArray(_this$quill$getLine, 2),
        cell = _this$quill$getLine2[0],
        offset = _this$quill$getLine2[1];
      if (!(0,is_defined/* default */.Z)(cell) || this.tableBlots.indexOf(cell.statics.blotName) === -1) {
        return EMPTY_RESULT;
      }
      var row = cell.parent;
      var table = row.parent.parent;
      return [table, row, cell, offset];
    }
  }, {
    key: "insertColumn",
    value: function insertColumn(offset) {
      var range = this.quill.getSelection();
      var _this$getTable7 = this.getTable(range),
        _this$getTable8 = lite_slicedToArray(_this$getTable7, 3),
        table = _this$getTable8[0],
        row = _this$getTable8[1],
        cell = _this$getTable8[2];
      if (!(0,is_defined/* default */.Z)(cell)) {
        return;
      }
      var column = cell.cellOffset();
      table.insertColumn(column + offset);
      this.quill.update(core_quill/* default.sources.USER */.ZP.sources.USER);
      var shift = row.rowOffset();
      if (offset === 0) {
        shift += 1;
      }
      this.quill.setSelection(range.index + shift, range.length, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
    }
  }, {
    key: "insertColumnLeft",
    value: function insertColumnLeft() {
      this.insertColumn(0);
    }
  }, {
    key: "insertColumnRight",
    value: function insertColumnRight() {
      this.insertColumn(1);
    }
  }, {
    key: "insertRow",
    value: function insertRow(offset) {
      var range = this.quill.getSelection();
      var _this$getTable9 = this.getTable(range),
        _this$getTable10 = lite_slicedToArray(_this$getTable9, 3),
        table = _this$getTable10[0],
        row = _this$getTable10[1],
        cell = _this$getTable10[2];
      if (!(0,is_defined/* default */.Z)(cell)) {
        return;
      }
      var index = row.rowOffset();
      table.insertRow(index + offset);
      this.quill.update(core_quill/* default.sources.USER */.ZP.sources.USER);
      if (offset > 0) {
        this.quill.setSelection(range, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
      } else {
        this.quill.setSelection(range.index + row.children.length, range.length, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
      }
    }
  }, {
    key: "insertRowAbove",
    value: function insertRowAbove() {
      this.insertRow(0);
    }
  }, {
    key: "insertRowBelow",
    value: function insertRowBelow() {
      this.insertRow(1);
    }
  }, {
    key: "insertHeaderRow",
    value: function insertHeaderRow() {
      var range = this.quill.getSelection();
      var _this$getTable11 = this.getTable(range),
        _this$getTable12 = lite_slicedToArray(_this$getTable11, 3),
        table = _this$getTable12[0],
        cell = _this$getTable12[2];
      if (!(0,is_defined/* default */.Z)(cell)) {
        return;
      }
      table.insertHeaderRow();
      this.quill.update(core_quill/* default.sources.USER */.ZP.sources.USER);
    }
  }, {
    key: "insertTable",
    value: function insertTable(rows, columns) {
      var range = this.quill.getSelection();
      if (!(0,is_defined/* default */.Z)(range)) {
        return;
      }
      var delta = new Array(rows).fill(0).reduce(function (memo) {
        var text = new Array(columns).fill('\n').join('');
        return memo.insert(text, {
          table: tableId()
        });
      }, new (Delta_default())().retain(range.index));
      this.quill.updateContents(delta, core_quill/* default.sources.USER */.ZP.sources.USER);
      this.quill.setSelection(range.index, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
      this.balanceTables();
    }
  }, {
    key: "tableFormats",
    value: function tableFormats() {
      return this.tableBlots;
    }
  }, {
    key: "listenBalanceCells",
    value: function listenBalanceCells() {
      var _this4 = this;
      this.quill.on(core_quill/* default.events.SCROLL_OPTIMIZE */.ZP.events.SCROLL_OPTIMIZE, function (mutations) {
        mutations.some(function (mutation) {
          if (['TD', 'TH', 'TR', 'TBODY', 'THEAD', 'TABLE'].indexOf(mutation.target.tagName) !== -1) {
            _this4.quill.once(core_quill/* default.events.TEXT_CHANGE */.ZP.events.TEXT_CHANGE, function (delta, old, source) {
              if (source !== core_quill/* default.sources.USER */.ZP.sources.USER) return;
              _this4.balanceTables();
            });
            return true;
          }
          return false;
        });
      });
      this.quill.on(core_quill/* default.events.CONTENT_SETTED */.ZP.events.CONTENT_SETTED, function () {
        _this4.quill.once(core_quill/* default.events.TEXT_CHANGE */.ZP.events.TEXT_CHANGE, function () {
          _this4.balanceTables();
        });
      });
    }
  }], [{
    key: "register",
    value: function register() {
      core_quill/* default.register */.ZP.register(TableHeaderCell, true);
      core_quill/* default.register */.ZP.register(TableCell, true);
      core_quill/* default.register */.ZP.register(TableHeaderRow, true);
      core_quill/* default.register */.ZP.register(TableRow, true);
      core_quill/* default.register */.ZP.register(TableBody, true);
      core_quill/* default.register */.ZP.register(TableHeader, true);
      core_quill/* default.register */.ZP.register(TableContainer, true);
      [table/* TABLE_FORMATS */.li, cell/* CELL_FORMATS */.Du].forEach(function (formats) {
        Object.keys(formats).forEach(function (name) {
          core_quill/* default.register */.ZP.register(_defineProperty({}, "formats/".concat(name), formats[name]), true);
        });
      });
    }
  }]);
  return TableLite;
}(core_module/* default */.Z);
TableLite.keyboardBindings = {
  'table backspace': {
    key: 'backspace',
    format: ['table', 'tableHeaderCell'],
    collapsed: true,
    offset: 0,
    handler: function handler() {}
  },
  'table delete': {
    key: 'del',
    format: ['table', 'tableHeaderCell'],
    collapsed: true,
    suffix: /^$/,
    handler: function handler() {}
  },
  'table enter': {
    key: 'enter',
    shiftKey: null,
    format: ['table'],
    handler: function handler(range) {
      var module = this.quill.getModule('table');
      if (module) {
        var quill = this.quill;
        var _module$getTable = module.getTable(range),
          _module$getTable2 = lite_slicedToArray(_module$getTable, 4),
          table = _module$getTable2[0],
          row = _module$getTable2[1],
          cell = _module$getTable2[2],
          offset = _module$getTable2[3];
        var shift = tableSide(row, cell, offset);
        var hasHead = table.children.length > 1 && table.children.head;
        if (shift == null || shift < 0 && hasHead) {
          return;
        }
        var index = table.offset();
        if (shift < 0) {
          insertParagraphAbove({
            quill: quill,
            index: index,
            range: range
          });
        } else {
          insertParagraphBelow({
            quill: quill,
            index: index,
            table: table
          });
        }
      }
    }
  },
  'table header enter': {
    key: 'enter',
    shiftKey: null,
    format: ['tableHeaderCell'],
    handler: function handler(range) {
      var module = this.quill.getModule('table');
      if (module) {
        var quill = this.quill;
        var _module$getTable3 = module.getTable(range),
          _module$getTable4 = lite_slicedToArray(_module$getTable3, 4),
          table = _module$getTable4[0],
          row = _module$getTable4[1],
          cell = _module$getTable4[2],
          offset = _module$getTable4[3];
        var shift = tableSide(row, cell, offset);
        if (shift == null) {
          return;
        }
        var index = table.offset();
        var hasBody = table.children.length > 1 && table.children.tail;
        if (shift < 0 || shift > 0 && hasBody) {
          insertParagraphAbove({
            quill: quill,
            index: index,
            range: range
          });
        } else {
          insertParagraphBelow({
            quill: quill,
            index: index,
            table: table
          });
        }
      }
    }
  },
  'table tab': {
    key: 'tab',
    shiftKey: null,
    format: ['table', 'tableHeaderCell'],
    handler: function handler(range, context) {
      var event = context.event,
        cell = context.line;
      var offset = cell.offset(this.quill.scroll);
      if (event.shiftKey) {
        this.quill.setSelection(offset - 1, core_quill/* default.sources.USER */.ZP.sources.USER);
      } else {
        this.quill.setSelection(offset + cell.length(), core_quill/* default.sources.USER */.ZP.sources.USER);
      }
    }
  },
  'table down': (0,make_table_arrow_handler/* default */.Z)(false, ['table', 'tableHeaderCell']),
  'table up': (0,make_table_arrow_handler/* default */.Z)(true, ['table', 'tableHeaderCell'])
};
function matchTable(node, delta) {
  var table = node.parentNode.tagName === 'TABLE' ? node.parentNode : node.parentNode.parentNode;
  var isHeaderRow = node.parentNode.tagName === 'THEAD' ? true : null;
  var rows = Array.from(table.querySelectorAll('tr'));
  var row = rows.indexOf(node) + 1;
  return (0,clipboard/* applyFormat */.HI)(delta, isHeaderRow ? 'tableHeaderCell' : 'table', row);
}
/* harmony default export */ const lite = (TableLite);

/***/ }),

/***/ 9466:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ makeTableArrowHandler)
/* harmony export */ });
/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(281);

function makeTableArrowHandler(up, formats) {
  return {
    key: up ? 'upArrow' : 'downArrow',
    collapsed: true,
    format: formats,
    handler: function handler(range, context) {
      var key = up ? 'prev' : 'next';
      var line = context.line;
      var cell = line.statics.blotName.indexOf('Line') > -1 ? line.parent : line;
      var targetTablePart = cell.parent.parent[key];
      var targetRow = cell.parent[key] || (targetTablePart === null || targetTablePart === void 0 ? void 0 : targetTablePart.children.head);
      if (targetRow != null) {
        if (targetRow.statics.blotName === 'tableRow' || targetRow.statics.blotName === 'tableHeaderRow') {
          var targetCell = targetRow.children.head;
          var cur = cell;
          while (cur.prev != null) {
            cur = cur.prev;
            targetCell = targetCell.next;
          }
          var index = targetCell.offset(this.quill.scroll) + Math.min(context.offset, targetCell.length() - 1);
          this.quill.setSelection(index, 0, _core_quill__WEBPACK_IMPORTED_MODULE_0__/* ["default"].sources.USER */ .ZP.sources.USER);
        }
      } else {
        var targetLine = cell.table()[key];
        if (targetLine != null) {
          if (up) {
            this.quill.setSelection(targetLine.offset(this.quill.scroll) + targetLine.length() - 1, 0, _core_quill__WEBPACK_IMPORTED_MODULE_0__/* ["default"].sources.USER */ .ZP.sources.USER);
          } else {
            this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, _core_quill__WEBPACK_IMPORTED_MODULE_0__/* ["default"].sources.USER */ .ZP.sources.USER);
          }
        }
      }
      return false;
    }
  };
}

/***/ }),

/***/ 7896:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ prepareAttributeMatcher),
/* harmony export */   "a": () => (/* binding */ prepareCellAttributeMatcher)
/* harmony export */ });
/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1233);
/* harmony import */ var _attributors_attributor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1674);
/* harmony import */ var _attributors_style_attributor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4569);
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5635);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function writeToRecord(record, key, value, override) {
  record[key] = !override && record[key] ? record[key] : value;
}
function fillFormats(attributes, node, scroll, attributors, result, override) {
  attributes.filter(function (name) {
    return !!name;
  }).forEach(function (name) {
    var queryAttr = scroll.query(name, parchment__WEBPACK_IMPORTED_MODULE_0__.Scope.ATTRIBUTE);
    if (queryAttr !== null) {
      var queryAttrValue = queryAttr.value(node);
      if (queryAttrValue) {
        writeToRecord(result, queryAttr.attrName, queryAttrValue, override);
        return;
      }
    }
    var attr = attributors[name];
    if (attr != null && (attr.attrName === name || attr.keyName === name)) {
      var attrValue = attr.value(node) || undefined;
      writeToRecord(result, attr.attrName, attrValue, override);
    }
  });
  return result;
}
function prepareAttributeMatcher(attributors) {
  return function (node, delta, scroll) {
    var attributes = _attributors_attributor__WEBPACK_IMPORTED_MODULE_1__/* ["default"].keys */ .Z.keys(node);
    var styles = _attributors_style_attributor__WEBPACK_IMPORTED_MODULE_2__/* ["default"].keys */ .Z.keys(node);
    var formats = _objectSpread(_objectSpread({}, fillFormats(attributes, node, scroll, attributors, {}, true)), fillFormats(styles, node, scroll, attributors, {}, true));
    if (Object.keys(formats).length > 0) {
      return (0,_clipboard__WEBPACK_IMPORTED_MODULE_3__/* .applyFormat */ .HI)(delta, formats);
    }
    return delta;
  };
}
function prepareCellAttributeMatcher(attributors) {
  return function (node, delta, scroll) {
    var _node$parentNode;
    var attributes = _attributors_attributor__WEBPACK_IMPORTED_MODULE_1__/* ["default"].keys */ .Z.keys(node);
    var styles = _attributors_style_attributor__WEBPACK_IMPORTED_MODULE_2__/* ["default"].keys */ .Z.keys(node);
    var parentTrNode = ((_node$parentNode = node.parentNode) === null || _node$parentNode === void 0 ? void 0 : _node$parentNode.tagName) === 'TR' ? node.parentNode : undefined;
    var formats = _objectSpread(_objectSpread({}, fillFormats(attributes, node, scroll, attributors, {}, true)), fillFormats(styles, node, scroll, attributors, {}, true));
    if (parentTrNode) {
      var parentStyles = _attributors_style_attributor__WEBPACK_IMPORTED_MODULE_2__/* ["default"].keys */ .Z.keys(parentTrNode);
      formats = fillFormats(parentStyles, parentTrNode, scroll, attributors, formats, false);
    }
    if (Object.keys(formats).length > 0) {
      return (0,_clipboard__WEBPACK_IMPORTED_MODULE_3__/* .applyFormat */ .HI)(delta, formats);
    }
    return delta;
  };
}

/***/ }),

/***/ 3859:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9098);
/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2069);
/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7094);
/* harmony import */ var _utils_has_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8034);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Uploader = /*#__PURE__*/function (_Module) {
  _inherits(Uploader, _Module);
  var _super = _createSuper(Uploader);
  function Uploader(quill, options) {
    var _this;
    _classCallCheck(this, Uploader);
    _this = _super.call(this, quill, options);
    _this.preventImageUploading(false);
    _this.addDragOverHandler();
    _this.addDropHandler();
    return _this;
  }
  _createClass(Uploader, [{
    key: "addDragOverHandler",
    value: function addDragOverHandler() {
      if ((0,_utils_has_window__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)()) {
        var ua = window.navigator.userAgent.toLowerCase();
        var isMsIe = ua.indexOf('msie ') !== -1 || ua.indexOf('trident/') !== -1 || ua.indexOf('edge/') !== -1;
        if (isMsIe) {
          this.quill.root.addEventListener('dragover', function (e) {
            e.preventDefault();
          });
        }
      }
    }
  }, {
    key: "addDropHandler",
    value: function addDropHandler() {
      var _this2 = this;
      this.quill.root.addEventListener('drop', function (e) {
        var noFiles = e.dataTransfer.files.length === 0;
        var onDrop = _this2.options.onDrop;
        if (onDrop && typeof onDrop === 'function') {
          onDrop(e);
        }
        if (noFiles || _this2.preventImageUpload) {
          return;
        }
        e.preventDefault();
        var native;
        if (document.caretRangeFromPoint) {
          native = document.caretRangeFromPoint(e.clientX, e.clientY);
        } else if (document.caretPositionFromPoint) {
          var position = document.caretPositionFromPoint(e.clientX, e.clientY);
          native = document.createRange();
          native.setStart(position.offsetNode, position.offset);
          native.setEnd(position.offsetNode, position.offset);
        } else {
          return;
        }
        var normalized = _this2.quill.selection.normalizeNative(native);
        var range = _this2.quill.selection.normalizedToRange(normalized);
        _this2.upload(range, e.dataTransfer.files);
      });
    }
  }, {
    key: "preventImageUploading",
    value: function preventImageUploading(value) {
      if (typeof value !== 'undefined') {
        this.preventImageUpload = value;
      }
      return this.preventImageUpload;
    }
  }, {
    key: "upload",
    value: function upload(range, files, force) {
      var _this3 = this;
      if (this.preventImageUpload && !force) {
        return;
      }
      var uploads = [];
      Array.from(files).forEach(function (file) {
        if (file && _this3.options.mimetypes.indexOf(file.type) !== -1) {
          uploads.push(file);
        }
      });
      if (uploads.length > 0) {
        this.options.handler.call(this, range, uploads, this.options.imageBlot);
      }
    }
  }]);
  return Uploader;
}(_core_module__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
Uploader.DEFAULTS = {
  mimetypes: ['image/png', 'image/jpeg', 'image/pjpeg', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml', 'image/vnd.microsoft.icon'],
  imageBlot: 'image',
  handler: function handler(range, files, blotName) {
    var _this4 = this;
    var promises = files.map(function (file) {
      return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.onload = function (e) {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(function (images) {
      var update = images.reduce(function (delta, image) {
        return delta.insert(_defineProperty({}, blotName, image));
      }, new (quill_delta__WEBPACK_IMPORTED_MODULE_0___default())().retain(range.index).delete(range.length));
      _this4.quill.updateContents(update, _core_emitter__WEBPACK_IMPORTED_MODULE_1__/* ["default"].sources.USER */ .Z.sources.USER);
      _this4.quill.setSelection(range.index + images.length, _core_emitter__WEBPACK_IMPORTED_MODULE_1__/* ["default"].sources.SILENT */ .Z.sources.SILENT);
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Uploader);

/***/ }),

/***/ 2141:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ capitalize)
/* harmony export */ });
function capitalize(text) {
  return text ? text.substring(0, 1).toUpperCase() + text.substring(1) : '';
}

/***/ }),

/***/ 8034:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var hasWindow = function hasWindow() {
  return typeof window !== 'undefined';
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hasWindow);

/***/ }),

/***/ 5874:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ isDefined)
/* harmony export */ });
function isDefined(object) {
  return object !== null && object !== undefined;
}

/***/ }),

/***/ 1233:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Attributor": () => (/* reexport */ attributor),
  "AttributorStore": () => (/* reexport */ store),
  "BlockBlot": () => (/* reexport */ block),
  "ClassAttributor": () => (/* reexport */ attributor_class),
  "ContainerBlot": () => (/* reexport */ container),
  "EmbedBlot": () => (/* reexport */ blot_embed),
  "InlineBlot": () => (/* reexport */ inline),
  "LeafBlot": () => (/* reexport */ leaf),
  "ParentBlot": () => (/* reexport */ abstract_parent),
  "Registry": () => (/* reexport */ registry),
  "Scope": () => (/* reexport */ src_scope),
  "ScrollBlot": () => (/* reexport */ blot_scroll),
  "StyleAttributor": () => (/* reexport */ style),
  "TextBlot": () => (/* reexport */ blot_text)
});

;// CONCATENATED MODULE: ./node_modules/parchment/src/scope.ts
var Scope;
(function (Scope) {
  Scope[Scope["TYPE"] = 3] = "TYPE";
  Scope[Scope["LEVEL"] = 12] = "LEVEL";
  Scope[Scope["ATTRIBUTE"] = 13] = "ATTRIBUTE";
  Scope[Scope["BLOT"] = 14] = "BLOT";
  Scope[Scope["INLINE"] = 7] = "INLINE";
  Scope[Scope["BLOCK"] = 11] = "BLOCK";
  Scope[Scope["BLOCK_BLOT"] = 10] = "BLOCK_BLOT";
  Scope[Scope["INLINE_BLOT"] = 6] = "INLINE_BLOT";
  Scope[Scope["BLOCK_ATTRIBUTE"] = 9] = "BLOCK_ATTRIBUTE";
  Scope[Scope["INLINE_ATTRIBUTE"] = 5] = "INLINE_ATTRIBUTE";
  Scope[Scope["ANY"] = 15] = "ANY";
})(Scope || (Scope = {}));
/* harmony default export */ const src_scope = (Scope);
;// CONCATENATED MODULE: ./node_modules/parchment/src/collection/linked-list.ts
var LinkedList = /** @class */function () {
  function LinkedList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  LinkedList.prototype.append = function () {
    var nodes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      nodes[_i] = arguments[_i];
    }
    this.insertBefore(nodes[0], null);
    if (nodes.length > 1) {
      var rest = nodes.slice(1);
      this.append.apply(this, rest);
    }
  };
  LinkedList.prototype.at = function (index) {
    var next = this.iterator();
    var cur = next();
    while (cur && index > 0) {
      index -= 1;
      cur = next();
    }
    return cur;
  };
  LinkedList.prototype.contains = function (node) {
    var next = this.iterator();
    var cur = next();
    while (cur) {
      if (cur === node) {
        return true;
      }
      cur = next();
    }
    return false;
  };
  LinkedList.prototype.indexOf = function (node) {
    var next = this.iterator();
    var cur = next();
    var index = 0;
    while (cur) {
      if (cur === node) {
        return index;
      }
      index += 1;
      cur = next();
    }
    return -1;
  };
  LinkedList.prototype.insertBefore = function (node, refNode) {
    if (node == null) {
      return;
    }
    this.remove(node);
    node.next = refNode;
    if (refNode != null) {
      node.prev = refNode.prev;
      if (refNode.prev != null) {
        refNode.prev.next = node;
      }
      refNode.prev = node;
      if (refNode === this.head) {
        this.head = node;
      }
    } else if (this.tail != null) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      node.prev = null;
      this.head = this.tail = node;
    }
    this.length += 1;
  };
  LinkedList.prototype.offset = function (target) {
    var index = 0;
    var cur = this.head;
    while (cur != null) {
      if (cur === target) {
        return index;
      }
      index += cur.length();
      cur = cur.next;
    }
    return -1;
  };
  LinkedList.prototype.remove = function (node) {
    if (!this.contains(node)) {
      return;
    }
    if (node.prev != null) {
      node.prev.next = node.next;
    }
    if (node.next != null) {
      node.next.prev = node.prev;
    }
    if (node === this.head) {
      this.head = node.next;
    }
    if (node === this.tail) {
      this.tail = node.prev;
    }
    this.length -= 1;
  };
  LinkedList.prototype.iterator = function (curNode) {
    if (curNode === void 0) {
      curNode = this.head;
    }
    // TODO use yield when we can
    return function () {
      var ret = curNode;
      if (curNode != null) {
        curNode = curNode.next;
      }
      return ret;
    };
  };
  LinkedList.prototype.find = function (index, inclusive) {
    if (inclusive === void 0) {
      inclusive = false;
    }
    var next = this.iterator();
    var cur = next();
    while (cur) {
      var length = cur.length();
      if (index < length || inclusive && index === length && (cur.next == null || cur.next.length() !== 0)) {
        return [cur, index];
      }
      index -= length;
      cur = next();
    }
    return [null, 0];
  };
  LinkedList.prototype.forEach = function (callback) {
    var next = this.iterator();
    var cur = next();
    while (cur) {
      callback(cur);
      cur = next();
    }
  };
  LinkedList.prototype.forEachAt = function (index, length, callback) {
    if (length <= 0) {
      return;
    }
    var _a = this.find(index),
      startNode = _a[0],
      offset = _a[1];
    var curIndex = index - offset;
    var next = this.iterator(startNode);
    var cur = next();
    while (cur && curIndex < index + length) {
      var curLength = cur.length();
      if (index > curIndex) {
        callback(cur, index - curIndex, Math.min(length, curIndex + curLength - index));
      } else {
        callback(cur, 0, Math.min(curLength, index + length - curIndex));
      }
      curIndex += curLength;
      cur = next();
    }
  };
  LinkedList.prototype.map = function (callback) {
    return this.reduce(function (memo, cur) {
      memo.push(callback(cur));
      return memo;
    }, []);
  };
  LinkedList.prototype.reduce = function (callback, memo) {
    var next = this.iterator();
    var cur = next();
    while (cur) {
      memo = callback(memo, cur);
      cur = next();
    }
    return memo;
  };
  return LinkedList;
}();
/* harmony default export */ const linked_list = (LinkedList);
;// CONCATENATED MODULE: ./node_modules/parchment/src/error.ts
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var ParchmentError = /** @class */function (_super) {
  __extends(ParchmentError, _super);
  function ParchmentError(message) {
    var _this = this;
    message = '[Parchment] ' + message;
    _this = _super.call(this, message) || this;
    _this.message = message;
    _this.name = _this.constructor.name;
    return _this;
  }
  return ParchmentError;
}(Error);
/* harmony default export */ const error = (ParchmentError);
;// CONCATENATED MODULE: ./node_modules/parchment/src/registry.ts


var Registry = /** @class */function () {
  function Registry() {
    this.attributes = {};
    this.classes = {};
    this.tags = {};
    this.types = {};
  }
  Registry.find = function (node, bubble) {
    if (bubble === void 0) {
      bubble = false;
    }
    if (node == null) {
      return null;
    }
    if (this.blots.has(node)) {
      return this.blots.get(node) || null;
    }
    if (bubble) {
      var parentNode = null;
      try {
        parentNode = node.parentNode;
      } catch (err) {
        // Probably hit a permission denied error.
        // A known case is in Firefox, event targets can be anonymous DIVs
        // inside an input element.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=208427
        return null;
      }
      return this.find(parentNode, bubble);
    }
    return null;
  };
  Registry.prototype.create = function (scroll, input, value) {
    var match = this.query(input);
    if (match == null) {
      throw new error("Unable to create ".concat(input, " blot"));
    }
    var blotClass = match;
    var node =
    // @ts-expect-error
    input instanceof Node || input.nodeType === Node.TEXT_NODE ? input : blotClass.create(value);
    var blot = new blotClass(scroll, node, value);
    Registry.blots.set(blot.domNode, blot);
    return blot;
  };
  Registry.prototype.find = function (node, bubble) {
    if (bubble === void 0) {
      bubble = false;
    }
    return Registry.find(node, bubble);
  };
  Registry.prototype.query = function (query, scope) {
    var _this = this;
    if (scope === void 0) {
      scope = src_scope.ANY;
    }
    var match;
    if (typeof query === 'string') {
      match = this.types[query] || this.attributes[query];
      // @ts-expect-error
    } else if (query instanceof Text || query.nodeType === Node.TEXT_NODE) {
      match = this.types.text;
    } else if (typeof query === 'number') {
      if (query & src_scope.LEVEL & src_scope.BLOCK) {
        match = this.types.block;
      } else if (query & src_scope.LEVEL & src_scope.INLINE) {
        match = this.types.inline;
      }
    } else if (query instanceof Element) {
      var names = (query.getAttribute('class') || '').split(/\s+/);
      names.some(function (name) {
        match = _this.classes[name];
        if (match) {
          return true;
        }
        return false;
      });
      match = match || this.tags[query.tagName];
    }
    if (match == null) {
      return null;
    }
    // @ts-expect-error
    if (scope & src_scope.LEVEL & match.scope && scope & src_scope.TYPE & match.scope) {
      return match;
    }
    return null;
  };
  Registry.prototype.register = function () {
    var _this = this;
    var definitions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      definitions[_i] = arguments[_i];
    }
    if (definitions.length > 1) {
      return definitions.map(function (d) {
        return _this.register(d);
      });
    }
    var definition = definitions[0];
    if (typeof definition.blotName !== 'string' && typeof definition.attrName !== 'string') {
      throw new error('Invalid definition');
    } else if (definition.blotName === 'abstract') {
      throw new error('Cannot register abstract class');
    }
    this.types[definition.blotName || definition.attrName] = definition;
    if (typeof definition.keyName === 'string') {
      this.attributes[definition.keyName] = definition;
    } else {
      if (definition.className != null) {
        this.classes[definition.className] = definition;
      }
      if (definition.tagName != null) {
        if (Array.isArray(definition.tagName)) {
          definition.tagName = definition.tagName.map(function (tagName) {
            return tagName.toUpperCase();
          });
        } else {
          definition.tagName = definition.tagName.toUpperCase();
        }
        var tagNames = Array.isArray(definition.tagName) ? definition.tagName : [definition.tagName];
        tagNames.forEach(function (tag) {
          if (_this.tags[tag] == null || definition.className == null) {
            _this.tags[tag] = definition;
          }
        });
      }
    }
    return definition;
  };
  Registry.blots = new WeakMap();
  return Registry;
}();
/* harmony default export */ const registry = (Registry);
;// CONCATENATED MODULE: ./node_modules/parchment/src/blot/abstract/shadow.ts



var ShadowBlot = /** @class */function () {
  function ShadowBlot(scroll, domNode) {
    this.scroll = scroll;
    this.domNode = domNode;
    registry.blots.set(domNode, this);
    this.prev = null;
    this.next = null;
  }
  ShadowBlot.create = function (value) {
    if (this.tagName == null) {
      throw new error('Blot definition missing tagName');
    }
    var node;
    if (Array.isArray(this.tagName)) {
      if (typeof value === 'string') {
        value = value.toUpperCase();
        if (parseInt(value, 10).toString() === value) {
          value = parseInt(value, 10);
        }
      }
      if (typeof value === 'number') {
        node = document.createElement(this.tagName[value - 1]);
      } else if (this.tagName.indexOf(value) > -1) {
        node = document.createElement(value);
      } else {
        node = document.createElement(this.tagName[0]);
      }
    } else {
      node = document.createElement(this.tagName);
    }
    if (this.className) {
      node.classList.add(this.className);
    }
    return node;
  };
  Object.defineProperty(ShadowBlot.prototype, "statics", {
    // Hack for accessing inherited static methods
    get: function get() {
      return this.constructor;
    },
    enumerable: false,
    configurable: true
  });
  ShadowBlot.prototype.attach = function () {
    // Nothing to do
  };
  ShadowBlot.prototype.clone = function () {
    var domNode = this.domNode.cloneNode(false);
    return this.scroll.create(domNode);
  };
  ShadowBlot.prototype.detach = function () {
    if (this.parent != null) {
      this.parent.removeChild(this);
    }
    registry.blots["delete"](this.domNode);
  };
  ShadowBlot.prototype.deleteAt = function (index, length) {
    var blot = this.isolate(index, length);
    blot.remove();
  };
  ShadowBlot.prototype.formatAt = function (index, length, name, value) {
    var blot = this.isolate(index, length);
    if (this.scroll.query(name, src_scope.BLOT) != null && value) {
      blot.wrap(name, value);
    } else if (this.scroll.query(name, src_scope.ATTRIBUTE) != null) {
      var parent = this.scroll.create(this.statics.scope);
      blot.wrap(parent);
      parent.format(name, value);
    }
  };
  ShadowBlot.prototype.insertAt = function (index, value, def) {
    var blot = def == null ? this.scroll.create('text', value) : this.scroll.create(value, def);
    var ref = this.split(index);
    this.parent.insertBefore(blot, ref || undefined);
  };
  ShadowBlot.prototype.isolate = function (index, length) {
    var target = this.split(index);
    if (target == null) {
      throw new Error('Attempt to isolate at end');
    }
    target.split(length);
    return target;
  };
  ShadowBlot.prototype.length = function () {
    return 1;
  };
  ShadowBlot.prototype.offset = function (root) {
    if (root === void 0) {
      root = this.parent;
    }
    if (this.parent == null || this === root) {
      return 0;
    }
    return this.parent.children.offset(this) + this.parent.offset(root);
  };
  ShadowBlot.prototype.optimize = function (_context) {
    if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
      this.wrap(this.statics.requiredContainer.blotName);
    }
  };
  ShadowBlot.prototype.remove = function () {
    if (this.domNode.parentNode != null) {
      this.domNode.parentNode.removeChild(this.domNode);
    }
    this.detach();
  };
  ShadowBlot.prototype.replaceWith = function (name, value) {
    var replacement = typeof name === 'string' ? this.scroll.create(name, value) : name;
    if (this.parent != null) {
      this.parent.insertBefore(replacement, this.next || undefined);
      this.remove();
    }
    return replacement;
  };
  ShadowBlot.prototype.split = function (index, _force) {
    return index === 0 ? this : this.next;
  };
  ShadowBlot.prototype.update = function (_mutations, _context) {
    // Nothing to do by default
  };
  ShadowBlot.prototype.wrap = function (name, value) {
    var wrapper = typeof name === 'string' ? this.scroll.create(name, value) : name;
    if (this.parent != null) {
      this.parent.insertBefore(wrapper, this.next || undefined);
    }
    if (typeof wrapper.appendChild !== 'function') {
      throw new error("Cannot wrap ".concat(name));
    }
    wrapper.appendChild(this);
    return wrapper;
  };
  ShadowBlot.blotName = 'abstract';
  return ShadowBlot;
}();
/* harmony default export */ const shadow = (ShadowBlot);
;// CONCATENATED MODULE: ./node_modules/parchment/src/blot/abstract/parent.ts
var parent_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();




function makeAttachedBlot(node, scroll) {
  var blot = scroll.find(node);
  if (blot == null) {
    try {
      blot = scroll.create(node);
    } catch (e) {
      blot = scroll.create(src_scope.INLINE);
      Array.from(node.childNodes).forEach(function (child) {
        // @ts-expect-error
        blot.domNode.appendChild(child);
      });
      if (node.parentNode) {
        node.parentNode.replaceChild(blot.domNode, node);
      }
      blot.attach();
    }
  }
  return blot;
}
var ParentBlot = /** @class */function (_super) {
  parent_extends(ParentBlot, _super);
  function ParentBlot(scroll, domNode) {
    var _this = _super.call(this, scroll, domNode) || this;
    _this.uiNode = null;
    _this.build();
    return _this;
  }
  ParentBlot.prototype.appendChild = function (other) {
    this.insertBefore(other);
  };
  ParentBlot.prototype.attach = function () {
    _super.prototype.attach.call(this);
    this.children.forEach(function (child) {
      child.attach();
    });
  };
  ParentBlot.prototype.attachUI = function (node) {
    if (this.uiNode != null) {
      this.uiNode.remove();
    }
    this.uiNode = node;
    if (ParentBlot.uiClass) {
      this.uiNode.classList.add(ParentBlot.uiClass);
    }
    this.uiNode.setAttribute('contenteditable', 'false');
    this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  };
  ParentBlot.prototype.build = function () {
    var _this = this;
    this.children = new linked_list();
    // Need to be reversed for if DOM nodes already in order
    Array.from(this.domNode.childNodes).filter(function (node) {
      return node !== _this.uiNode;
    }).reverse().forEach(function (node) {
      try {
        var child = makeAttachedBlot(node, _this.scroll);
        _this.insertBefore(child, _this.children.head || undefined);
      } catch (err) {
        if (err instanceof error) {
          return;
        } else {
          throw err;
        }
      }
    });
  };
  ParentBlot.prototype.deleteAt = function (index, length) {
    if (index === 0 && length === this.length()) {
      return this.remove();
    }
    this.children.forEachAt(index, length, function (child, offset, childLength) {
      child.deleteAt(offset, childLength);
    });
  };
  ParentBlot.prototype.descendant = function (criteria, index) {
    if (index === void 0) {
      index = 0;
    }
    var _a = this.children.find(index),
      child = _a[0],
      offset = _a[1];
    if (criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria) {
      return [child, offset];
    } else if (child instanceof ParentBlot) {
      return child.descendant(criteria, offset);
    } else {
      return [null, -1];
    }
  };
  ParentBlot.prototype.descendants = function (criteria, index, length) {
    if (index === void 0) {
      index = 0;
    }
    if (length === void 0) {
      length = Number.MAX_VALUE;
    }
    var descendants = [];
    var lengthLeft = length;
    this.children.forEachAt(index, length, function (child, childIndex, childLength) {
      if (criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria) {
        descendants.push(child);
      }
      if (child instanceof ParentBlot) {
        descendants = descendants.concat(child.descendants(criteria, childIndex, lengthLeft));
      }
      lengthLeft -= childLength;
    });
    return descendants;
  };
  ParentBlot.prototype.detach = function () {
    this.children.forEach(function (child) {
      child.detach();
    });
    _super.prototype.detach.call(this);
  };
  ParentBlot.prototype.enforceAllowedChildren = function () {
    var _this = this;
    var done = false;
    this.children.forEach(function (child) {
      if (done) {
        return;
      }
      var allowed = _this.statics.allowedChildren.some(function (def) {
        return child instanceof def;
      });
      if (allowed) {
        return;
      }
      if (child.statics.scope === src_scope.BLOCK_BLOT) {
        if (child.next != null) {
          _this.splitAfter(child);
        }
        if (child.prev != null) {
          _this.splitAfter(child.prev);
        }
        child.parent.unwrap();
        done = true;
      } else if (child instanceof ParentBlot) {
        child.unwrap();
      } else {
        child.remove();
      }
    });
  };
  ParentBlot.prototype.formatAt = function (index, length, name, value) {
    this.children.forEachAt(index, length, function (child, offset, childLength) {
      child.formatAt(offset, childLength, name, value);
    });
  };
  ParentBlot.prototype.insertAt = function (index, value, def) {
    var _a = this.children.find(index),
      child = _a[0],
      offset = _a[1];
    if (child) {
      child.insertAt(offset, value, def);
    } else {
      var blot = def == null ? this.scroll.create('text', value) : this.scroll.create(value, def);
      this.appendChild(blot);
    }
  };
  ParentBlot.prototype.insertBefore = function (childBlot, refBlot) {
    if (childBlot.parent != null) {
      childBlot.parent.children.remove(childBlot);
    }
    var refDomNode = null;
    this.children.insertBefore(childBlot, refBlot || null);
    childBlot.parent = this;
    if (refBlot != null) {
      refDomNode = refBlot.domNode;
    }
    if (this.domNode.parentNode !== childBlot.domNode || this.domNode.nextSibling !== refDomNode) {
      this.domNode.insertBefore(childBlot.domNode, refDomNode);
    }
    childBlot.attach();
  };
  ParentBlot.prototype.length = function () {
    return this.children.reduce(function (memo, child) {
      return memo + child.length();
    }, 0);
  };
  ParentBlot.prototype.moveChildren = function (targetParent, refNode) {
    this.children.forEach(function (child) {
      targetParent.insertBefore(child, refNode);
    });
  };
  ParentBlot.prototype.optimize = function (context) {
    _super.prototype.optimize.call(this, context);
    this.enforceAllowedChildren();
    if (this.uiNode != null && this.uiNode !== this.domNode.firstChild) {
      this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
    }
    if (this.children.length === 0) {
      if (this.statics.defaultChild != null) {
        var child = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(child);
        // TODO double check if necessary
        // child.optimize(context);
      } else {
        this.remove();
      }
    }
  };
  ParentBlot.prototype.path = function (index, inclusive) {
    if (inclusive === void 0) {
      inclusive = false;
    }
    var _a = this.children.find(index, inclusive),
      child = _a[0],
      offset = _a[1];
    var position = [[this, index]];
    if (child instanceof ParentBlot) {
      return position.concat(child.path(offset, inclusive));
    } else if (child != null) {
      position.push([child, offset]);
    }
    return position;
  };
  ParentBlot.prototype.removeChild = function (child) {
    this.children.remove(child);
  };
  ParentBlot.prototype.replaceWith = function (name, value) {
    var replacement = typeof name === 'string' ? this.scroll.create(name, value) : name;
    if (replacement instanceof ParentBlot) {
      this.moveChildren(replacement);
    }
    return _super.prototype.replaceWith.call(this, replacement);
  };
  ParentBlot.prototype.split = function (index, force) {
    if (force === void 0) {
      force = false;
    }
    if (!force) {
      if (index === 0) {
        return this;
      }
      if (index === this.length()) {
        return this.next;
      }
    }
    var after = this.clone();
    if (this.parent) {
      this.parent.insertBefore(after, this.next || undefined);
    }
    this.children.forEachAt(index, this.length(), function (child, offset, _length) {
      var split = child.split(offset, force);
      if (split != null) {
        after.appendChild(split);
      }
    });
    return after;
  };
  ParentBlot.prototype.splitAfter = function (child) {
    var after = this.clone();
    while (child.next != null) {
      after.appendChild(child.next);
    }
    if (this.parent) {
      this.parent.insertBefore(after, this.next || undefined);
    }
    return after;
  };
  ParentBlot.prototype.unwrap = function () {
    if (this.parent) {
      this.moveChildren(this.parent, this.next || undefined);
    }
    this.remove();
  };
  ParentBlot.prototype.update = function (mutations, _context) {
    var _this = this;
    var addedNodes = [];
    var removedNodes = [];
    mutations.forEach(function (mutation) {
      if (mutation.target === _this.domNode && mutation.type === 'childList') {
        addedNodes.push.apply(addedNodes, mutation.addedNodes);
        removedNodes.push.apply(removedNodes, mutation.removedNodes);
      }
    });
    removedNodes.forEach(function (node) {
      // Check node has actually been removed
      // One exception is Chrome does not immediately remove IFRAMEs
      // from DOM but MutationRecord is correct in its reported removal
      if (node.parentNode != null &&
      // @ts-expect-error
      node.tagName !== 'IFRAME' && document.body.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        return;
      }
      var blot = _this.scroll.find(node);
      if (blot == null) {
        return;
      }
      if (blot.domNode.parentNode == null || blot.domNode.parentNode === _this.domNode) {
        blot.detach();
      }
    });
    addedNodes.filter(function (node) {
      return node.parentNode === _this.domNode || node === _this.uiNode;
    }).sort(function (a, b) {
      if (a === b) {
        return 0;
      }
      if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {
        return 1;
      }
      return -1;
    }).forEach(function (node) {
      var refBlot = null;
      if (node.nextSibling != null) {
        refBlot = _this.scroll.find(node.nextSibling);
      }
      var blot = makeAttachedBlot(node, _this.scroll);
      if (blot.next !== refBlot || blot.next == null) {
        if (blot.parent != null) {
          blot.parent.removeChild(_this);
        }
        _this.insertBefore(blot, refBlot || undefined);
      }
    });
    this.enforceAllowedChildren();
  };
  ParentBlot.uiClass = '';
  return ParentBlot;
}(shadow);
/* harmony default export */ const abstract_parent = (ParentBlot);
;// CONCATENATED MODULE: ./node_modules/parchment/src/blot/abstract/container.ts
var container_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();


var ContainerBlot = /** @class */function (_super) {
  container_extends(ContainerBlot, _super);
  function ContainerBlot() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ContainerBlot.prototype.checkMerge = function () {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  };
  ContainerBlot.prototype.deleteAt = function (index, length) {
    _super.prototype.deleteAt.call(this, index, length);
    this.enforceAllowedChildren();
  };
  ContainerBlot.prototype.formatAt = function (index, length, name, value) {
    _super.prototype.formatAt.call(this, index, length, name, value);
    this.enforceAllowedChildren();
  };
  ContainerBlot.prototype.insertAt = function (index, value, def) {
    _super.prototype.insertAt.call(this, index, value, def);
    this.enforceAllowedChildren();
  };
  ContainerBlot.prototype.optimize = function (context) {
    _super.prototype.optimize.call(this, context);
    if (this.children.length > 0 && this.next != null && this.checkMerge()) {
      this.next.moveChildren(this);
      this.next.remove();
    }
  };
  ContainerBlot.blotName = 'container';
  ContainerBlot.scope = src_scope.BLOCK_BLOT;
  return ContainerBlot;
}(abstract_parent);
/* harmony default export */ const container = (ContainerBlot);
;// CONCATENATED MODULE: ./node_modules/parchment/src/blot/abstract/leaf.ts
var leaf_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();


var LeafBlot = /** @class */function (_super) {
  leaf_extends(LeafBlot, _super);
  function LeafBlot() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  LeafBlot.value = function (_domNode) {
    return true;
  };
  LeafBlot.prototype.index = function (node, offset) {
    if (this.domNode === node || this.domNode.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      return Math.min(offset, 1);
    }
    return -1;
  };
  LeafBlot.prototype.position = function (index, _inclusive) {
    var childNodes = Array.from(this.parent.domNode.childNodes);
    var offset = childNodes.indexOf(this.domNode);
    if (index > 0) {
      offset += 1;
    }
    return [this.parent.domNode, offset];
  };
  LeafBlot.prototype.value = function () {
    var _a;
    return _a = {}, _a[this.statics.blotName] = this.statics.value(this.domNode) || true, _a;
  };
  LeafBlot.scope = src_scope.INLINE_BLOT;
  return LeafBlot;
}(shadow);
/* harmony default export */ const leaf = (LeafBlot);
;// CONCATENATED MODULE: ./node_modules/parchment/src/attributor/attributor.ts

var Attributor = /** @class */function () {
  function Attributor(attrName, keyName, options) {
    if (options === void 0) {
      options = {};
    }
    this.attrName = attrName;
    this.keyName = keyName;
    var attributeBit = src_scope.TYPE & src_scope.ATTRIBUTE;
    this.scope = options.scope != null ?
    // Ignore type bits, force attribute bit
    options.scope & src_scope.LEVEL | attributeBit : src_scope.ATTRIBUTE;
    if (options.whitelist != null) {
      this.whitelist = options.whitelist;
    }
  }
  Attributor.keys = function (node) {
    return Array.from(node.attributes).map(function (item) {
      return item.name;
    });
  };
  Attributor.prototype.add = function (node, value) {
    if (!this.canAdd(node, value)) {
      return false;
    }
    node.setAttribute(this.keyName, value);
    return true;
  };
  Attributor.prototype.canAdd = function (_node, value) {
    if (this.whitelist == null) {
      return true;
    }
    if (typeof value === 'string') {
      return this.whitelist.indexOf(value.replace(/["']/g, '')) > -1;
    } else {
      return this.whitelist.indexOf(value) > -1;
    }
  };
  Attributor.prototype.remove = function (node) {
    node.removeAttribute(this.keyName);
  };
  Attributor.prototype.value = function (node) {
    var value = node.getAttribute(this.keyName);
    if (this.canAdd(node, value) && value) {
      return value;
    }
    return '';
  };
  return Attributor;
}();
/* harmony default export */ const attributor = (Attributor);
;// CONCATENATED MODULE: ./node_modules/parchment/src/attributor/class.ts
var class_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

function match(node, prefix) {
  var className = node.getAttribute('class') || '';
  return className.split(/\s+/).filter(function (name) {
    return name.indexOf("".concat(prefix, "-")) === 0;
  });
}
var ClassAttributor = /** @class */function (_super) {
  class_extends(ClassAttributor, _super);
  function ClassAttributor() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ClassAttributor.keys = function (node) {
    return (node.getAttribute('class') || '').split(/\s+/).map(function (name) {
      return name.split('-').slice(0, -1).join('-');
    });
  };
  ClassAttributor.prototype.add = function (node, value) {
    if (!this.canAdd(node, value)) {
      return false;
    }
    this.remove(node);
    node.classList.add("".concat(this.keyName, "-").concat(value));
    return true;
  };
  ClassAttributor.prototype.remove = function (node) {
    var matches = match(node, this.keyName);
    matches.forEach(function (name) {
      node.classList.remove(name);
    });
    if (node.classList.length === 0) {
      node.removeAttribute('class');
    }
  };
  ClassAttributor.prototype.value = function (node) {
    var result = match(node, this.keyName)[0] || '';
    var value = result.slice(this.keyName.length + 1); // +1 for hyphen
    return this.canAdd(node, value) ? value : '';
  };
  return ClassAttributor;
}(attributor);
/* harmony default export */ const attributor_class = (ClassAttributor);
;// CONCATENATED MODULE: ./node_modules/parchment/src/attributor/style.ts
var style_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

function camelize(name) {
  var parts = name.split('-');
  var rest = parts.slice(1).map(function (part) {
    return part[0].toUpperCase() + part.slice(1);
  }).join('');
  return parts[0] + rest;
}
var StyleAttributor = /** @class */function (_super) {
  style_extends(StyleAttributor, _super);
  function StyleAttributor() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  StyleAttributor.keys = function (node) {
    return (node.getAttribute('style') || '').split(';').map(function (value) {
      var arr = value.split(':');
      return arr[0].trim();
    });
  };
  StyleAttributor.prototype.add = function (node, value) {
    if (!this.canAdd(node, value)) {
      return false;
    }
    // @ts-expect-error
    node.style[camelize(this.keyName)] = value;
    return true;
  };
  StyleAttributor.prototype.remove = function (node) {
    // @ts-expect-error
    node.style[camelize(this.keyName)] = '';
    if (!node.getAttribute('style')) {
      node.removeAttribute('style');
    }
  };
  StyleAttributor.prototype.value = function (node) {
    // @ts-expect-error
    var value = node.style[camelize(this.keyName)];
    return this.canAdd(node, value) ? value : '';
  };
  return StyleAttributor;
}(attributor);
/* harmony default export */ const style = (StyleAttributor);
;// CONCATENATED MODULE: ./node_modules/parchment/src/attributor/store.ts





var AttributorStore = /** @class */function () {
  function AttributorStore(domNode) {
    this.attributes = {};
    this.domNode = domNode;
    this.build();
  }
  AttributorStore.prototype.attribute = function (attribute, value) {
    // verb
    if (value) {
      if (attribute.add(this.domNode, value)) {
        if (attribute.value(this.domNode) != null) {
          this.attributes[attribute.attrName] = attribute;
        } else {
          delete this.attributes[attribute.attrName];
        }
      }
    } else {
      attribute.remove(this.domNode);
      delete this.attributes[attribute.attrName];
    }
  };
  AttributorStore.prototype.build = function () {
    var _this = this;
    this.attributes = {};
    var blot = registry.find(this.domNode);
    if (blot == null) {
      return;
    }
    var attributes = attributor.keys(this.domNode);
    var classes = attributor_class.keys(this.domNode);
    var styles = style.keys(this.domNode);
    attributes.concat(classes).concat(styles).forEach(function (name) {
      var attr = blot.scroll.query(name, src_scope.ATTRIBUTE);
      if (attr instanceof attributor) {
        _this.attributes[attr.attrName] = attr;
      }
    });
  };
  AttributorStore.prototype.copy = function (target) {
    var _this = this;
    Object.keys(this.attributes).forEach(function (key) {
      var value = _this.attributes[key].value(_this.domNode);
      target.format(key, value);
    });
  };
  AttributorStore.prototype.move = function (target) {
    var _this = this;
    this.copy(target);
    Object.keys(this.attributes).forEach(function (key) {
      _this.attributes[key].remove(_this.domNode);
    });
    this.attributes = {};
  };
  AttributorStore.prototype.values = function () {
    var _this = this;
    return Object.keys(this.attributes).reduce(function (attributes, name) {
      attributes[name] = _this.attributes[name].value(_this.domNode);
      return attributes;
    }, {});
  };
  return AttributorStore;
}();
/* harmony default export */ const store = (AttributorStore);
;// CONCATENATED MODULE: ./node_modules/parchment/src/blot/inline.ts
var inline_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();





// Shallow object comparison
function isEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (var prop in obj1) {
    // @ts-expect-error
    if (obj1[prop] !== obj2[prop]) {
      return false;
    }
  }
  return true;
}
var InlineBlot = /** @class */function (_super) {
  inline_extends(InlineBlot, _super);
  function InlineBlot(scroll, domNode) {
    var _this = _super.call(this, scroll, domNode) || this;
    _this.attributes = new store(_this.domNode);
    return _this;
  }
  InlineBlot.formats = function (domNode, scroll) {
    var match = scroll.query(InlineBlot.blotName);
    if (match != null && domNode.tagName === match.tagName) {
      return undefined;
    } else if (typeof this.tagName === 'string') {
      return true;
    } else if (Array.isArray(this.tagName)) {
      return domNode.tagName.toLowerCase();
    }
    return undefined;
  };
  InlineBlot.prototype.format = function (name, value) {
    var _this = this;
    if (name === this.statics.blotName && !value) {
      this.children.forEach(function (child) {
        if (!(child instanceof InlineBlot)) {
          child = child.wrap(InlineBlot.blotName, true);
        }
        _this.attributes.copy(child);
      });
      this.unwrap();
    } else {
      var format = this.scroll.query(name, src_scope.INLINE);
      if (format == null) {
        return;
      }
      if (format instanceof attributor) {
        this.attributes.attribute(format, value);
      } else if (value && (name !== this.statics.blotName || this.formats()[name] !== value)) {
        this.replaceWith(name, value);
      }
    }
  };
  InlineBlot.prototype.formats = function () {
    var formats = this.attributes.values();
    var format = this.statics.formats(this.domNode, this.scroll);
    if (format != null) {
      formats[this.statics.blotName] = format;
    }
    return formats;
  };
  InlineBlot.prototype.formatAt = function (index, length, name, value) {
    if (this.formats()[name] != null || this.scroll.query(name, src_scope.ATTRIBUTE)) {
      var blot = this.isolate(index, length);
      blot.format(name, value);
    } else {
      _super.prototype.formatAt.call(this, index, length, name, value);
    }
  };
  InlineBlot.prototype.optimize = function (context) {
    _super.prototype.optimize.call(this, context);
    var formats = this.formats();
    if (Object.keys(formats).length === 0) {
      return this.unwrap(); // unformatted span
    }

    var next = this.next;
    if (next instanceof InlineBlot && next.prev === this && isEqual(formats, next.formats())) {
      next.moveChildren(this);
      next.remove();
    }
  };
  InlineBlot.prototype.replaceWith = function (name, value) {
    var replacement = _super.prototype.replaceWith.call(this, name, value);
    this.attributes.copy(replacement);
    return replacement;
  };
  InlineBlot.prototype.update = function (mutations, context) {
    var _this = this;
    _super.prototype.update.call(this, mutations, context);
    var attributeChanged = mutations.some(function (mutation) {
      return mutation.target === _this.domNode && mutation.type === 'attributes';
    });
    if (attributeChanged) {
      this.attributes.build();
    }
  };
  InlineBlot.prototype.wrap = function (name, value) {
    var wrapper = _super.prototype.wrap.call(this, name, value);
    if (wrapper instanceof InlineBlot) {
      this.attributes.move(wrapper);
    }
    return wrapper;
  };
  InlineBlot.allowedChildren = [InlineBlot, leaf];
  InlineBlot.blotName = 'inline';
  InlineBlot.scope = src_scope.INLINE_BLOT;
  InlineBlot.tagName = 'SPAN';
  return InlineBlot;
}(abstract_parent);
/* harmony default export */ const inline = (InlineBlot);
;// CONCATENATED MODULE: ./node_modules/parchment/src/blot/block.ts
var block_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();






var BlockBlot = /** @class */function (_super) {
  block_extends(BlockBlot, _super);
  function BlockBlot(scroll, domNode) {
    var _this = _super.call(this, scroll, domNode) || this;
    _this.attributes = new store(_this.domNode);
    return _this;
  }
  BlockBlot.formats = function (domNode, scroll) {
    var match = scroll.query(BlockBlot.blotName);
    if (match != null && domNode.tagName === match.tagName) {
      return undefined;
    } else if (typeof this.tagName === 'string') {
      return true;
    } else if (Array.isArray(this.tagName)) {
      return domNode.tagName.toLowerCase();
    }
  };
  BlockBlot.prototype.format = function (name, value) {
    var format = this.scroll.query(name, src_scope.BLOCK);
    if (format == null) {
      return;
    } else if (format instanceof attributor) {
      this.attributes.attribute(format, value);
    } else if (name === this.statics.blotName && !value) {
      this.replaceWith(BlockBlot.blotName);
    } else if (value && (name !== this.statics.blotName || this.formats()[name] !== value)) {
      this.replaceWith(name, value);
    }
  };
  BlockBlot.prototype.formats = function () {
    var formats = this.attributes.values();
    var format = this.statics.formats(this.domNode, this.scroll);
    if (format != null) {
      formats[this.statics.blotName] = format;
    }
    return formats;
  };
  BlockBlot.prototype.formatAt = function (index, length, name, value) {
    if (this.scroll.query(name, src_scope.BLOCK) != null) {
      this.format(name, value);
    } else {
      _super.prototype.formatAt.call(this, index, length, name, value);
    }
  };
  BlockBlot.prototype.insertAt = function (index, value, def) {
    if (def == null || this.scroll.query(value, src_scope.INLINE) != null) {
      // Insert text or inline
      _super.prototype.insertAt.call(this, index, value, def);
    } else {
      var after = this.split(index);
      if (after != null) {
        var blot = this.scroll.create(value, def);
        after.parent.insertBefore(blot, after);
      } else {
        throw new Error('Attempt to insertAt after block boundaries');
      }
    }
  };
  BlockBlot.prototype.replaceWith = function (name, value) {
    var replacement = _super.prototype.replaceWith.call(this, name, value);
    this.attributes.copy(replacement);
    return replacement;
  };
  BlockBlot.prototype.update = function (mutations, context) {
    var _this = this;
    _super.prototype.update.call(this, mutations, context);
    var attributeChanged = mutations.some(function (mutation) {
      return mutation.target === _this.domNode && mutation.type === 'attributes';
    });
    if (attributeChanged) {
      this.attributes.build();
    }
  };
  BlockBlot.blotName = 'block';
  BlockBlot.scope = src_scope.BLOCK_BLOT;
  BlockBlot.tagName = 'P';
  BlockBlot.allowedChildren = [inline, BlockBlot, leaf];
  return BlockBlot;
}(abstract_parent);
/* harmony default export */ const block = (BlockBlot);
;// CONCATENATED MODULE: ./node_modules/parchment/src/blot/embed.ts
var embed_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var EmbedBlot = /** @class */function (_super) {
  embed_extends(EmbedBlot, _super);
  function EmbedBlot() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  EmbedBlot.formats = function (_domNode, _scroll) {
    return undefined;
  };
  EmbedBlot.prototype.format = function (name, value) {
    // super.formatAt wraps, which is what we want in general,
    // but this allows subclasses to overwrite for formats
    // that just apply to particular embeds
    _super.prototype.formatAt.call(this, 0, this.length(), name, value);
  };
  EmbedBlot.prototype.formatAt = function (index, length, name, value) {
    if (index === 0 && length === this.length()) {
      this.format(name, value);
    } else {
      _super.prototype.formatAt.call(this, index, length, name, value);
    }
  };
  EmbedBlot.prototype.formats = function () {
    return this.statics.formats(this.domNode, this.scroll);
  };
  return EmbedBlot;
}(leaf);
/* harmony default export */ const blot_embed = (EmbedBlot);
;// CONCATENATED MODULE: ./node_modules/parchment/src/blot/scroll.ts
var scroll_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();




var OBSERVER_CONFIG = {
  attributes: true,
  characterData: true,
  characterDataOldValue: true,
  childList: true,
  subtree: true
};
var MAX_OPTIMIZE_ITERATIONS = 100;
var ScrollBlot = /** @class */function (_super) {
  scroll_extends(ScrollBlot, _super);
  function ScrollBlot(registry, node) {
    var _this =
    // @ts-expect-error
    _super.call(this, null, node) || this;
    _this.registry = registry;
    _this.scroll = _this;
    _this.build();
    _this.observer = new MutationObserver(function (mutations) {
      _this.update(mutations);
    });
    _this.observer.observe(_this.domNode, OBSERVER_CONFIG);
    _this.attach();
    return _this;
  }
  ScrollBlot.prototype.create = function (input, value) {
    return this.registry.create(this, input, value);
  };
  ScrollBlot.prototype.find = function (node, bubble) {
    if (bubble === void 0) {
      bubble = false;
    }
    var blot = this.registry.find(node, bubble);
    if (!blot) {
      return null;
    }
    if (blot.scroll === this) {
      return blot;
    }
    return bubble ? this.find(blot.scroll.domNode.parentNode, true) : null;
  };
  ScrollBlot.prototype.query = function (query, scope) {
    if (scope === void 0) {
      scope = src_scope.ANY;
    }
    return this.registry.query(query, scope);
  };
  ScrollBlot.prototype.register = function () {
    var _a;
    var definitions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      definitions[_i] = arguments[_i];
    }
    return (_a = this.registry).register.apply(_a, definitions);
  };
  ScrollBlot.prototype.build = function () {
    if (this.scroll == null) {
      return;
    }
    _super.prototype.build.call(this);
  };
  ScrollBlot.prototype.detach = function () {
    _super.prototype.detach.call(this);
    this.observer.disconnect();
  };
  ScrollBlot.prototype.deleteAt = function (index, length) {
    this.update();
    if (index === 0 && length === this.length()) {
      this.children.forEach(function (child) {
        child.remove();
      });
    } else {
      _super.prototype.deleteAt.call(this, index, length);
    }
  };
  ScrollBlot.prototype.formatAt = function (index, length, name, value) {
    this.update();
    _super.prototype.formatAt.call(this, index, length, name, value);
  };
  ScrollBlot.prototype.insertAt = function (index, value, def) {
    this.update();
    _super.prototype.insertAt.call(this, index, value, def);
  };
  ScrollBlot.prototype.optimize = function (mutations, context) {
    var _this = this;
    if (mutations === void 0) {
      mutations = [];
    }
    if (context === void 0) {
      context = {};
    }
    _super.prototype.optimize.call(this, context);
    var mutationsMap = context.mutationsMap || new WeakMap();
    // We must modify mutations directly, cannot make copy and then modify
    var records = Array.from(this.observer.takeRecords());
    // Array.push currently seems to be implemented by a non-tail recursive function
    // so we cannot just mutations.push.apply(mutations, this.observer.takeRecords());
    while (records.length > 0) {
      mutations.push(records.pop());
    }
    var mark = function mark(blot, markParent) {
      if (markParent === void 0) {
        markParent = true;
      }
      if (blot == null || blot === _this) {
        return;
      }
      if (blot.domNode.parentNode == null) {
        return;
      }
      if (!mutationsMap.has(blot.domNode)) {
        mutationsMap.set(blot.domNode, []);
      }
      if (markParent) {
        mark(blot.parent);
      }
    };
    var optimize = function optimize(blot) {
      // Post-order traversal
      if (!mutationsMap.has(blot.domNode)) {
        return;
      }
      if (blot instanceof abstract_parent) {
        blot.children.forEach(optimize);
      }
      mutationsMap.delete(blot.domNode);
      blot.optimize(context);
    };
    var remaining = mutations;
    for (var i = 0; remaining.length > 0; i += 1) {
      if (i >= MAX_OPTIMIZE_ITERATIONS) {
        throw new Error('[Parchment] Maximum optimize iterations reached');
      }
      remaining.forEach(function (mutation) {
        var blot = _this.find(mutation.target, true);
        if (blot == null) {
          return;
        }
        if (blot.domNode === mutation.target) {
          if (mutation.type === 'childList') {
            mark(_this.find(mutation.previousSibling, false));
            Array.from(mutation.addedNodes).forEach(function (node) {
              var child = _this.find(node, false);
              mark(child, false);
              if (child instanceof abstract_parent) {
                child.children.forEach(function (grandChild) {
                  mark(grandChild, false);
                });
              }
            });
          } else if (mutation.type === 'attributes') {
            mark(blot.prev);
          }
        }
        mark(blot);
      });
      this.children.forEach(optimize);
      remaining = Array.from(this.observer.takeRecords());
      records = remaining.slice();
      while (records.length > 0) {
        mutations.push(records.pop());
      }
    }
  };
  ScrollBlot.prototype.update = function (mutations, context) {
    var _this = this;
    if (context === void 0) {
      context = {};
    }
    mutations = mutations || this.observer.takeRecords();
    var mutationsMap = new WeakMap();
    mutations.map(function (mutation) {
      var blot = _this.find(mutation.target, true);
      if (blot == null) {
        return null;
      }
      if (mutationsMap.has(blot.domNode)) {
        mutationsMap.get(blot.domNode).push(mutation);
        return null;
      } else {
        mutationsMap.set(blot.domNode, [mutation]);
        return blot;
      }
    }).forEach(function (blot) {
      if (blot != null && blot !== _this && mutationsMap.has(blot.domNode)) {
        blot.update(mutationsMap.get(blot.domNode) || [], context);
      }
    });
    context.mutationsMap = mutationsMap;
    if (mutationsMap.has(this.domNode)) {
      _super.prototype.update.call(this, mutationsMap.get(this.domNode), context);
    }
    this.optimize(mutations, context);
  };
  ScrollBlot.blotName = 'scroll';
  ScrollBlot.defaultChild = block;
  ScrollBlot.allowedChildren = [block, container];
  ScrollBlot.scope = src_scope.BLOCK_BLOT;
  ScrollBlot.tagName = 'DIV';
  return ScrollBlot;
}(abstract_parent);
/* harmony default export */ const blot_scroll = (ScrollBlot);
;// CONCATENATED MODULE: ./node_modules/parchment/src/blot/text.ts
var text_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();


var TextBlot = /** @class */function (_super) {
  text_extends(TextBlot, _super);
  function TextBlot(scroll, node) {
    var _this = _super.call(this, scroll, node) || this;
    _this.text = _this.statics.value(_this.domNode);
    return _this;
  }
  TextBlot.create = function (value) {
    return document.createTextNode(value);
  };
  TextBlot.value = function (domNode) {
    return domNode.data;
  };
  TextBlot.prototype.deleteAt = function (index, length) {
    this.domNode.data = this.text = this.text.slice(0, index) + this.text.slice(index + length);
  };
  TextBlot.prototype.index = function (node, offset) {
    if (this.domNode === node) {
      return offset;
    }
    return -1;
  };
  TextBlot.prototype.insertAt = function (index, value, def) {
    if (def == null) {
      this.text = this.text.slice(0, index) + value + this.text.slice(index);
      this.domNode.data = this.text;
    } else {
      _super.prototype.insertAt.call(this, index, value, def);
    }
  };
  TextBlot.prototype.length = function () {
    return this.text.length;
  };
  TextBlot.prototype.optimize = function (context) {
    _super.prototype.optimize.call(this, context);
    this.text = this.statics.value(this.domNode);
    if (this.text.length === 0) {
      this.remove();
    } else if (this.next instanceof TextBlot && this.next.prev === this) {
      this.insertAt(this.length(), this.next.value());
      this.next.remove();
    }
  };
  TextBlot.prototype.position = function (index, _inclusive) {
    if (_inclusive === void 0) {
      _inclusive = false;
    }
    return [this.domNode, index];
  };
  TextBlot.prototype.split = function (index, force) {
    if (force === void 0) {
      force = false;
    }
    if (!force) {
      if (index === 0) {
        return this;
      }
      if (index === this.length()) {
        return this.next;
      }
    }
    var after = this.scroll.create(this.domNode.splitText(index));
    this.parent.insertBefore(after, this.next || undefined);
    this.text = this.statics.value(this.domNode);
    return after;
  };
  TextBlot.prototype.update = function (mutations, _context) {
    var _this = this;
    if (mutations.some(function (mutation) {
      return mutation.type === 'characterData' && mutation.target === _this.domNode;
    })) {
      this.text = this.statics.value(this.domNode);
    }
  };
  TextBlot.prototype.value = function () {
    return this.text;
  };
  TextBlot.blotName = 'text';
  TextBlot.scope = src_scope.INLINE_BLOT;
  return TextBlot;
}(leaf);
/* harmony default export */ const blot_text = (TextBlot);
;// CONCATENATED MODULE: ./node_modules/parchment/src/parchment.ts
















/***/ }),

/***/ 1122:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(293);

module.exports = parent;


/***/ }),

/***/ 6562:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(4165);

module.exports = parent;


/***/ }),

/***/ 8128:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(4648);

module.exports = parent;


/***/ }),

/***/ 5875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(4968);

module.exports = parent;


/***/ }),

/***/ 9684:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(3382);
var entryUnbind = __webpack_require__(3145);

module.exports = entryUnbind('Array', 'fill');


/***/ }),

/***/ 7331:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(5007);
__webpack_require__(4845);
var path = __webpack_require__(7290);

module.exports = path.Array.from;


/***/ }),

/***/ 7367:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9457);
var path = __webpack_require__(7290);

module.exports = path.Object.values;


/***/ }),

/***/ 5199:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(4797);
var entryUnbind = __webpack_require__(3145);

module.exports = entryUnbind('String', 'endsWith');


/***/ }),

/***/ 1667:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(6717);


/***/ }),

/***/ 8483:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(8941);


/***/ }),

/***/ 6143:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(8675);


/***/ }),

/***/ 9013:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(6198);


/***/ }),

/***/ 6717:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(1122);

module.exports = parent;


/***/ }),

/***/ 8941:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(6562);

module.exports = parent;


/***/ }),

/***/ 8675:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(8128);

module.exports = parent;


/***/ }),

/***/ 6198:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(5875);

module.exports = parent;


/***/ }),

/***/ 7676:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(5277);
var tryToString = __webpack_require__(8768);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 5017:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(5277);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 6677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(2280);
var create = __webpack_require__(1569);
var defineProperty = (__webpack_require__(6385).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 3875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(2786);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 5522:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(744);
var toAbsoluteIndex = __webpack_require__(2565);
var lengthOfArrayLike = __webpack_require__(7046);

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ 4899:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(8166);
var call = __webpack_require__(9611);
var toObject = __webpack_require__(744);
var callWithSafeIterationClosing = __webpack_require__(9637);
var isArrayIteratorMethod = __webpack_require__(8089);
var isConstructor = __webpack_require__(1536);
var lengthOfArrayLike = __webpack_require__(7046);
var createProperty = __webpack_require__(5039);
var getIterator = __webpack_require__(1805);
var getIteratorMethod = __webpack_require__(7193);

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ 7190:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(9580);
var toAbsoluteIndex = __webpack_require__(2565);
var lengthOfArrayLike = __webpack_require__(7046);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 9637:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(3875);
var iteratorClose = __webpack_require__(8744);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ 8662:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(2280);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 9159:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThisRaw = __webpack_require__(1896);

var toString = uncurryThisRaw({}.toString);
var stringSlice = uncurryThisRaw(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 6994:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(7301);
var isCallable = __webpack_require__(5277);
var classofRaw = __webpack_require__(9159);
var wellKnownSymbol = __webpack_require__(2280);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 3870:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(4792);
var ownKeys = __webpack_require__(1561);
var getOwnPropertyDescriptorModule = __webpack_require__(6012);
var definePropertyModule = __webpack_require__(6385);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 5454:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(2280);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ 5115:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(9044);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 6145:
/***/ ((module) => {

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),

/***/ 5899:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(7493);
var definePropertyModule = __webpack_require__(6385);
var createPropertyDescriptor = __webpack_require__(9199);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9199:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 5039:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(383);
var definePropertyModule = __webpack_require__(6385);
var createPropertyDescriptor = __webpack_require__(9199);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 403:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(5277);
var definePropertyModule = __webpack_require__(6385);
var makeBuiltIn = __webpack_require__(833);
var defineGlobalProperty = __webpack_require__(2359);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 2359:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8363);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 7493:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(9044);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 3966:
/***/ ((module) => {

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ 2750:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8363);
var isObject = __webpack_require__(2786);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 2647:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(2773);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 1197:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8363);
var userAgent = __webpack_require__(2647);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 3145:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8363);
var uncurryThis = __webpack_require__(8697);

module.exports = function (CONSTRUCTOR, METHOD) {
  return uncurryThis(global[CONSTRUCTOR].prototype[METHOD]);
};


/***/ }),

/***/ 8869:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 9882:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8363);
var getOwnPropertyDescriptor = (__webpack_require__(6012).f);
var createNonEnumerableProperty = __webpack_require__(5899);
var defineBuiltIn = __webpack_require__(403);
var defineGlobalProperty = __webpack_require__(2359);
var copyConstructorProperties = __webpack_require__(3870);
var isForced = __webpack_require__(6291);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 9044:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 8166:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(8697);
var aCallable = __webpack_require__(7676);
var NATIVE_BIND = __webpack_require__(3996);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 3996:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(9044);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 9611:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(3996);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 5316:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(7493);
var hasOwn = __webpack_require__(4792);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1896:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(3996);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 8697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classofRaw = __webpack_require__(9159);
var uncurryThisRaw = __webpack_require__(1896);

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThisRaw(fn);
};


/***/ }),

/***/ 2773:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8363);
var isCallable = __webpack_require__(5277);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 7193:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(6994);
var getMethod = __webpack_require__(7219);
var isNullOrUndefined = __webpack_require__(9903);
var Iterators = __webpack_require__(4818);
var wellKnownSymbol = __webpack_require__(2280);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 1805:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(9611);
var aCallable = __webpack_require__(7676);
var anObject = __webpack_require__(3875);
var tryToString = __webpack_require__(8768);
var getIteratorMethod = __webpack_require__(7193);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ 7219:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(7676);
var isNullOrUndefined = __webpack_require__(9903);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 8363:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 4792:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(8697);
var toObject = __webpack_require__(744);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 7505:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 7055:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(2773);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 7548:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(7493);
var fails = __webpack_require__(9044);
var createElement = __webpack_require__(2750);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8609:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(8697);
var fails = __webpack_require__(9044);
var classof = __webpack_require__(9159);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 6429:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(8697);
var isCallable = __webpack_require__(5277);
var store = __webpack_require__(9415);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 821:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(2512);
var global = __webpack_require__(8363);
var isObject = __webpack_require__(2786);
var createNonEnumerableProperty = __webpack_require__(5899);
var hasOwn = __webpack_require__(4792);
var shared = __webpack_require__(9415);
var sharedKey = __webpack_require__(466);
var hiddenKeys = __webpack_require__(7505);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 8089:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(2280);
var Iterators = __webpack_require__(4818);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 5277:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $documentAll = __webpack_require__(3966);

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 1536:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(8697);
var fails = __webpack_require__(9044);
var isCallable = __webpack_require__(5277);
var classof = __webpack_require__(6994);
var getBuiltIn = __webpack_require__(2773);
var inspectSource = __webpack_require__(6429);

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ 6291:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(9044);
var isCallable = __webpack_require__(5277);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 9903:
/***/ ((module) => {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 2786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(5277);
var $documentAll = __webpack_require__(3966);

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1178:
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ 2622:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(2786);
var classof = __webpack_require__(9159);
var wellKnownSymbol = __webpack_require__(2280);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 6681:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(2773);
var isCallable = __webpack_require__(5277);
var isPrototypeOf = __webpack_require__(2010);
var USE_SYMBOL_AS_UID = __webpack_require__(189);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 8744:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(9611);
var anObject = __webpack_require__(3875);
var getMethod = __webpack_require__(7219);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 9952:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = (__webpack_require__(7022).IteratorPrototype);
var create = __webpack_require__(1569);
var createPropertyDescriptor = __webpack_require__(9199);
var setToStringTag = __webpack_require__(878);
var Iterators = __webpack_require__(4818);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 8150:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(9882);
var call = __webpack_require__(9611);
var IS_PURE = __webpack_require__(1178);
var FunctionName = __webpack_require__(5316);
var isCallable = __webpack_require__(5277);
var createIteratorConstructor = __webpack_require__(9952);
var getPrototypeOf = __webpack_require__(2654);
var setPrototypeOf = __webpack_require__(2412);
var setToStringTag = __webpack_require__(878);
var createNonEnumerableProperty = __webpack_require__(5899);
var defineBuiltIn = __webpack_require__(403);
var wellKnownSymbol = __webpack_require__(2280);
var Iterators = __webpack_require__(4818);
var IteratorsCore = __webpack_require__(7022);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ 7022:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(9044);
var isCallable = __webpack_require__(5277);
var isObject = __webpack_require__(2786);
var create = __webpack_require__(1569);
var getPrototypeOf = __webpack_require__(2654);
var defineBuiltIn = __webpack_require__(403);
var wellKnownSymbol = __webpack_require__(2280);
var IS_PURE = __webpack_require__(1178);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 4818:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 7046:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(5108);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 833:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(9044);
var isCallable = __webpack_require__(5277);
var hasOwn = __webpack_require__(4792);
var DESCRIPTORS = __webpack_require__(7493);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(5316).CONFIGURABLE);
var inspectSource = __webpack_require__(6429);
var InternalStateModule = __webpack_require__(821);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 8300:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 1049:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isRegExp = __webpack_require__(2622);

var $TypeError = TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw $TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ 1569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(3875);
var definePropertiesModule = __webpack_require__(7840);
var enumBugKeys = __webpack_require__(8869);
var hiddenKeys = __webpack_require__(7505);
var html = __webpack_require__(7055);
var documentCreateElement = __webpack_require__(2750);
var sharedKey = __webpack_require__(466);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 7840:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(7493);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(1010);
var definePropertyModule = __webpack_require__(6385);
var anObject = __webpack_require__(3875);
var toIndexedObject = __webpack_require__(9580);
var objectKeys = __webpack_require__(667);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 6385:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(7493);
var IE8_DOM_DEFINE = __webpack_require__(7548);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(1010);
var anObject = __webpack_require__(3875);
var toPropertyKey = __webpack_require__(383);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 6012:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(7493);
var call = __webpack_require__(9611);
var propertyIsEnumerableModule = __webpack_require__(1513);
var createPropertyDescriptor = __webpack_require__(9199);
var toIndexedObject = __webpack_require__(9580);
var toPropertyKey = __webpack_require__(383);
var hasOwn = __webpack_require__(4792);
var IE8_DOM_DEFINE = __webpack_require__(7548);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 7994:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8794);
var enumBugKeys = __webpack_require__(8869);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 9612:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 2654:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(4792);
var isCallable = __webpack_require__(5277);
var toObject = __webpack_require__(744);
var sharedKey = __webpack_require__(466);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(5115);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 2010:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(8697);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 8794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(8697);
var hasOwn = __webpack_require__(4792);
var toIndexedObject = __webpack_require__(9580);
var indexOf = (__webpack_require__(7190).indexOf);
var hiddenKeys = __webpack_require__(7505);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 667:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8794);
var enumBugKeys = __webpack_require__(8869);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 1513:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 2412:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(8697);
var anObject = __webpack_require__(3875);
var aPossiblePrototype = __webpack_require__(5017);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 8765:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(7493);
var uncurryThis = __webpack_require__(8697);
var objectKeys = __webpack_require__(667);
var toIndexedObject = __webpack_require__(9580);
var $propertyIsEnumerable = (__webpack_require__(1513).f);

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push);

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};


/***/ }),

/***/ 7141:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(9611);
var isCallable = __webpack_require__(5277);
var isObject = __webpack_require__(2786);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 1561:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(2773);
var uncurryThis = __webpack_require__(8697);
var getOwnPropertyNamesModule = __webpack_require__(7994);
var getOwnPropertySymbolsModule = __webpack_require__(9612);
var anObject = __webpack_require__(3875);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 7290:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8363);

module.exports = global;


/***/ }),

/***/ 6411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isNullOrUndefined = __webpack_require__(9903);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 878:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = (__webpack_require__(6385).f);
var hasOwn = __webpack_require__(4792);
var wellKnownSymbol = __webpack_require__(2280);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 466:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(3580);
var uid = __webpack_require__(4524);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 9415:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8363);
var defineGlobalProperty = __webpack_require__(2359);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 3580:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(1178);
var store = __webpack_require__(9415);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.26.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.26.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 1140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(8697);
var toIntegerOrInfinity = __webpack_require__(4229);
var toString = __webpack_require__(8967);
var requireObjectCoercible = __webpack_require__(6411);

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(1197);
var fails = __webpack_require__(9044);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 2565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(4229);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 9580:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8609);
var requireObjectCoercible = __webpack_require__(6411);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 4229:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trunc = __webpack_require__(8300);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 5108:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(4229);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 744:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(6411);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 1893:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(9611);
var isObject = __webpack_require__(2786);
var isSymbol = __webpack_require__(6681);
var getMethod = __webpack_require__(7219);
var ordinaryToPrimitive = __webpack_require__(7141);
var wellKnownSymbol = __webpack_require__(2280);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(1893);
var isSymbol = __webpack_require__(6681);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 7301:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(2280);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 8967:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(6994);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 8768:
/***/ ((module) => {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 4524:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(8697);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(746);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 1010:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(7493);
var fails = __webpack_require__(9044);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 2512:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8363);
var isCallable = __webpack_require__(5277);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 2280:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8363);
var shared = __webpack_require__(3580);
var hasOwn = __webpack_require__(4792);
var uid = __webpack_require__(4524);
var NATIVE_SYMBOL = __webpack_require__(746);
var USE_SYMBOL_AS_UID = __webpack_require__(189);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 3382:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(9882);
var fill = __webpack_require__(5522);
var addToUnscopables = __webpack_require__(6677);

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ 4845:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(9882);
var from = __webpack_require__(4899);
var checkCorrectnessOfIteration = __webpack_require__(8662);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ 9457:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(9882);
var $values = (__webpack_require__(8765).values);

// `Object.values` method
// https://tc39.es/ecma262/#sec-object.values
$({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});


/***/ }),

/***/ 4797:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(9882);
var uncurryThis = __webpack_require__(8697);
var getOwnPropertyDescriptor = (__webpack_require__(6012).f);
var toLength = __webpack_require__(5108);
var toString = __webpack_require__(8967);
var notARegExp = __webpack_require__(1049);
var requireObjectCoercible = __webpack_require__(6411);
var correctIsRegExpLogic = __webpack_require__(5454);
var IS_PURE = __webpack_require__(1178);

// eslint-disable-next-line es/no-string-prototype-endswith -- safe
var nativeEndsWith = uncurryThis(''.endsWith);
var slice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = that.length;
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = toString(searchString);
    return nativeEndsWith
      ? nativeEndsWith(that, search, end)
      : slice(that, end - search.length, end) === search;
  }
});


/***/ }),

/***/ 5007:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = (__webpack_require__(1140).charAt);
var toString = __webpack_require__(8967);
var InternalStateModule = __webpack_require__(821);
var defineIterator = __webpack_require__(8150);
var createIterResultObject = __webpack_require__(6145);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});


/***/ }),

/***/ 293:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(9684);

module.exports = parent;


/***/ }),

/***/ 4165:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7331);

module.exports = parent;


/***/ }),

/***/ 4648:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7367);

module.exports = parent;


/***/ }),

/***/ 4968:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(5199);

module.exports = parent;


/***/ }),

/***/ 3034:
/***/ (function(module, exports) {

'use strict';

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ 1456:
/***/ ((module) => {

/**
 * This library modifies the diff-patch-match library by Neil Fraser
 * by removing the patch and match functionality and certain advanced
 * options in the diff function. The original license is as follows:
 *
 * ===
 *
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;


/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {Int|Object} [cursor_pos] Edit position in text1 or object with more info
 * @return {Array} Array of diff tuples.
 */
function diff_main(text1, text2, cursor_pos, _fix_unicode) {
  // Check for equality
  if (text1 === text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  if (cursor_pos != null) {
    var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);
    if (editdiff) {
      return editdiff;
    }
  }

  // Trim off common prefix (speedup).
  var commonlength = diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = diff_compute_(text1, text2);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  diff_cleanupMerge(diffs, _fix_unicode);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 */
function diff_compute_(text1, text2) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i !== -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [
      [DIFF_INSERT, longtext.substring(0, i)],
      [DIFF_EQUAL, shorttext],
      [DIFF_INSERT, longtext.substring(i + shorttext.length)]
    ];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length === 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  // Check to see if the problem can be split in two.
  var hm = diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = diff_main(text1_a, text2_a);
    var diffs_b = diff_main(text1_b, text2_b);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  return diff_bisect_(text1, text2);
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 * @private
 */
function diff_bisect_(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 !== 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 === -d || (k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (
        x1 < text1_length && y1 < text2_length &&
        text1.charAt(x1) === text2.charAt(y1)
      ) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 === -d || (k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (
        x2 < text1_length && y2 < text2_length &&
        text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)
      ) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @return {Array} Array of diff tuples.
 */
function diff_bisectSplit_(text1, text2, x, y) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = diff_main(text1a, text2a);
  var diffsb = diff_main(text1b, text2b);

  return diffs.concat(diffsb);
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
function diff_commonPrefix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (
      text1.substring(pointerstart, pointermid) ==
      text2.substring(pointerstart, pointermid)
    ) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }

  if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) {
    pointermid--;
  }

  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
function diff_commonSuffix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (
      text1.substring(text1.length - pointermid, text1.length - pointerend) ==
      text2.substring(text2.length - pointermid, text2.length - pointerend)
    ) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }

  if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) {
    pointermid--;
  }

  return pointermid;
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 */
function diff_halfMatch_(text1, text2) {
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {
      var prefixLength = diff_commonPrefix(
        longtext.substring(i), shorttext.substring(j));
      var suffixLength = diff_commonSuffix(
        longtext.substring(0, i), shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(
          j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [
        best_longtext_a, best_longtext_b,
        best_shorttext_a, best_shorttext_b, best_common
      ];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {Array} diffs Array of diff tuples.
 * @param {boolean} fix_unicode Whether to normalize to a unicode-correct diff
 */
function diff_cleanupMerge(diffs, fix_unicode) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
      diffs.splice(pointer, 1);
      continue;
    }
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:

        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        var previous_equality = pointer - count_insert - count_delete - 1;
        if (fix_unicode) {
          // prevent splitting of unicode surrogate pairs.  when fix_unicode is true,
          // we assume that the old and new text in the diff are complete and correct
          // unicode-encoded JS strings, but the tuple boundaries may fall between
          // surrogate pairs.  we fix this by shaving off stray surrogates from the end
          // of the previous equality and the beginning of this equality.  this may create
          // empty equalities or a common prefix or suffix.  for example, if AB and AC are
          // emojis, `[[0, 'A'], [-1, 'BA'], [0, 'C']]` would turn into deleting 'ABAC' and
          // inserting 'AC', and then the common suffix 'AC' will be eliminated.  in this
          // particular case, both equalities go away, we absorb any previous inequalities,
          // and we keep scanning for the next equality before rewriting the tuples.
          if (previous_equality >= 0 && ends_with_pair_start(diffs[previous_equality][1])) {
            var stray = diffs[previous_equality][1].slice(-1);
            diffs[previous_equality][1] = diffs[previous_equality][1].slice(0, -1);
            text_delete = stray + text_delete;
            text_insert = stray + text_insert;
            if (!diffs[previous_equality][1]) {
              // emptied out previous equality, so delete it and include previous delete/insert
              diffs.splice(previous_equality, 1);
              pointer--;
              var k = previous_equality - 1;
              if (diffs[k] && diffs[k][0] === DIFF_INSERT) {
                count_insert++;
                text_insert = diffs[k][1] + text_insert;
                k--;
              }
              if (diffs[k] && diffs[k][0] === DIFF_DELETE) {
                count_delete++;
                text_delete = diffs[k][1] + text_delete;
                k--;
              }
              previous_equality = k;
            }
          }
          if (starts_with_pair_end(diffs[pointer][1])) {
            var stray = diffs[pointer][1].charAt(0);
            diffs[pointer][1] = diffs[pointer][1].slice(1);
            text_delete += stray;
            text_insert += stray;
          }
        }
        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
          // for empty equality not at end, wait for next equality
          diffs.splice(pointer, 1);
          break;
        }
        if (text_delete.length > 0 || text_insert.length > 0) {
          // note that diff_commonPrefix and diff_commonSuffix are unicode-aware
          if (text_delete.length > 0 && text_insert.length > 0) {
            // Factor out any common prefixes.
            commonlength = diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if (previous_equality >= 0) {
                diffs[previous_equality][1] += text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixes.
            commonlength = diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] =
                text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length - commonlength);
              text_delete = text_delete.substring(0, text_delete.length - commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          var n = count_insert + count_delete;
          if (text_delete.length === 0 && text_insert.length === 0) {
            diffs.splice(pointer - n, n);
            pointer = pointer - n;
          } else if (text_delete.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert]);
            pointer = pointer - n + 1;
          } else if (text_insert.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete]);
            pointer = pointer - n + 1;
          } else {
            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
            pointer = pointer - n + 2;
          }
        }
        if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] === DIFF_EQUAL &&
      diffs[pointer + 1][0] === DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
        diffs[pointer - 1][1].length) === diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
          diffs[pointer][1].substring(0, diffs[pointer][1].length -
            diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
        diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
          diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
          diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    diff_cleanupMerge(diffs, fix_unicode);
  }
};

function is_surrogate_pair_start(charCode) {
  return charCode >= 0xD800 && charCode <= 0xDBFF;
}

function is_surrogate_pair_end(charCode) {
  return charCode >= 0xDC00 && charCode <= 0xDFFF;
}

function starts_with_pair_end(str) {
  return is_surrogate_pair_end(str.charCodeAt(0));
}

function ends_with_pair_start(str) {
  return is_surrogate_pair_start(str.charCodeAt(str.length - 1));
}

function remove_empty_tuples(tuples) {
  var ret = [];
  for (var i = 0; i < tuples.length; i++) {
    if (tuples[i][1].length > 0) {
      ret.push(tuples[i]);
    }
  }
  return ret;
}

function make_edit_splice(before, oldMiddle, newMiddle, after) {
  if (ends_with_pair_start(before) || starts_with_pair_end(after)) {
    return null;
  }
  return remove_empty_tuples([
    [DIFF_EQUAL, before],
    [DIFF_DELETE, oldMiddle],
    [DIFF_INSERT, newMiddle],
    [DIFF_EQUAL, after]
  ]);
}

function find_cursor_edit_diff(oldText, newText, cursor_pos) {
  // note: this runs after equality check has ruled out exact equality
  var oldRange = typeof cursor_pos === 'number' ?
    { index: cursor_pos, length: 0 } : cursor_pos.oldRange;
  var newRange = typeof cursor_pos === 'number' ?
    null : cursor_pos.newRange;
  // take into account the old and new selection to generate the best diff
  // possible for a text edit.  for example, a text change from "xxx" to "xx"
  // could be a delete or forwards-delete of any one of the x's, or the
  // result of selecting two of the x's and typing "x".
  var oldLength = oldText.length;
  var newLength = newText.length;
  if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
    // see if we have an insert or delete before or after cursor
    var oldCursor = oldRange.index;
    var oldBefore = oldText.slice(0, oldCursor);
    var oldAfter = oldText.slice(oldCursor);
    var maybeNewCursor = newRange ? newRange.index : null;
    editBefore: {
      // is this an insert or delete right before oldCursor?
      var newCursor = oldCursor + newLength - oldLength;
      if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
        break editBefore;
      }
      if (newCursor < 0 || newCursor > newLength) {
        break editBefore;
      }
      var newBefore = newText.slice(0, newCursor);
      var newAfter = newText.slice(newCursor);
      if (newAfter !== oldAfter) {
        break editBefore;
      }
      var prefixLength = Math.min(oldCursor, newCursor);
      var oldPrefix = oldBefore.slice(0, prefixLength);
      var newPrefix = newBefore.slice(0, prefixLength);
      if (oldPrefix !== newPrefix) {
        break editBefore;
      }
      var oldMiddle = oldBefore.slice(prefixLength);
      var newMiddle = newBefore.slice(prefixLength);
      return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);
    }
    editAfter: {
      // is this an insert or delete right after oldCursor?
      if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
        break editAfter;
      }
      var cursor = oldCursor;
      var newBefore = newText.slice(0, cursor);
      var newAfter = newText.slice(cursor);
      if (newBefore !== oldBefore) {
        break editAfter;
      }
      var suffixLength = Math.min(oldLength - cursor, newLength - cursor);
      var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);
      var newSuffix = newAfter.slice(newAfter.length - suffixLength);
      if (oldSuffix !== newSuffix) {
        break editAfter;
      }
      var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);
      var newMiddle = newAfter.slice(0, newAfter.length - suffixLength);
      return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);
    }
  }
  if (oldRange.length > 0 && newRange && newRange.length === 0) {
    replaceRange: {
      // see if diff could be a splice of the old selection range
      var oldPrefix = oldText.slice(0, oldRange.index);
      var oldSuffix = oldText.slice(oldRange.index + oldRange.length);
      var prefixLength = oldPrefix.length;
      var suffixLength = oldSuffix.length;
      if (newLength < prefixLength + suffixLength) {
        break replaceRange;
      }
      var newPrefix = newText.slice(0, prefixLength);
      var newSuffix = newText.slice(newLength - suffixLength);
      if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {
        break replaceRange;
      }
      var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);
      var newMiddle = newText.slice(prefixLength, newLength - suffixLength);
      return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
    }
  }

  return null;
}

function diff(text1, text2, cursor_pos) {
  // only pass fix_unicode=true at the top level, not when diff_main is
  // recursively invoked
  return diff_main(text1, text2, cursor_pos, true);
}

diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;

module.exports = diff;


/***/ }),

/***/ 8805:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = cloneDeep;


/***/ }),

/***/ 2722:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;


/***/ }),

/***/ 732:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeMax = Math.max,
    nativeNow = Date.now;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = merge;


/***/ }),

/***/ 5143:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const cloneDeep = __webpack_require__(8805);
const isEqual = __webpack_require__(2722);
var AttributeMap;
(function (AttributeMap) {
    function compose(a = {}, b = {}, keepNull = false) {
        if (typeof a !== 'object') {
            a = {};
        }
        if (typeof b !== 'object') {
            b = {};
        }
        let attributes = cloneDeep(b);
        if (!keepNull) {
            attributes = Object.keys(attributes).reduce((copy, key) => {
                if (attributes[key] != null) {
                    copy[key] = attributes[key];
                }
                return copy;
            }, {});
        }
        for (const key in a) {
            if (a[key] !== undefined && b[key] === undefined) {
                attributes[key] = a[key];
            }
        }
        return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
    AttributeMap.compose = compose;
    function diff(a = {}, b = {}) {
        if (typeof a !== 'object') {
            a = {};
        }
        if (typeof b !== 'object') {
            b = {};
        }
        const attributes = Object.keys(a)
            .concat(Object.keys(b))
            .reduce((attrs, key) => {
            if (!isEqual(a[key], b[key])) {
                attrs[key] = b[key] === undefined ? null : b[key];
            }
            return attrs;
        }, {});
        return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
    AttributeMap.diff = diff;
    function invert(attr = {}, base = {}) {
        attr = attr || {};
        const baseInverted = Object.keys(base).reduce((memo, key) => {
            if (base[key] !== attr[key] && attr[key] !== undefined) {
                memo[key] = base[key];
            }
            return memo;
        }, {});
        return Object.keys(attr).reduce((memo, key) => {
            if (attr[key] !== base[key] && base[key] === undefined) {
                memo[key] = null;
            }
            return memo;
        }, baseInverted);
    }
    AttributeMap.invert = invert;
    function transform(a, b, priority = false) {
        if (typeof a !== 'object') {
            return b;
        }
        if (typeof b !== 'object') {
            return undefined;
        }
        if (!priority) {
            return b; // b simply overwrites us without priority
        }
        const attributes = Object.keys(b).reduce((attrs, key) => {
            if (a[key] === undefined) {
                attrs[key] = b[key]; // null is a valid value
            }
            return attrs;
        }, {});
        return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
    AttributeMap.transform = transform;
})(AttributeMap || (AttributeMap = {}));
exports["default"] = AttributeMap;


/***/ }),

/***/ 9098:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeMap = exports.OpIterator = exports.Op = void 0;
const diff = __webpack_require__(1456);
const cloneDeep = __webpack_require__(8805);
const isEqual = __webpack_require__(2722);
const AttributeMap_1 = __webpack_require__(5143);
exports.AttributeMap = AttributeMap_1.default;
const Op_1 = __webpack_require__(6237);
exports.Op = Op_1.default;
const OpIterator_1 = __webpack_require__(2849);
exports.OpIterator = OpIterator_1.default;
const NULL_CHARACTER = String.fromCharCode(0); // Placeholder char for embed in diff()
const getEmbedTypeAndData = (a, b) => {
    if (typeof a !== 'object' || a === null) {
        throw new Error(`cannot retain a ${typeof a}`);
    }
    if (typeof b !== 'object' || b === null) {
        throw new Error(`cannot retain a ${typeof b}`);
    }
    const embedType = Object.keys(a)[0];
    if (!embedType || embedType !== Object.keys(b)[0]) {
        throw new Error(`embed types not matched: ${embedType} != ${Object.keys(b)[0]}`);
    }
    return [embedType, a[embedType], b[embedType]];
};
class Delta {
    constructor(ops) {
        // Assume we are given a well formed ops
        if (Array.isArray(ops)) {
            this.ops = ops;
        }
        else if (ops != null && Array.isArray(ops.ops)) {
            this.ops = ops.ops;
        }
        else {
            this.ops = [];
        }
    }
    static registerEmbed(embedType, handler) {
        this.handlers[embedType] = handler;
    }
    static unregisterEmbed(embedType) {
        delete this.handlers[embedType];
    }
    static getHandler(embedType) {
        const handler = this.handlers[embedType];
        if (!handler) {
            throw new Error(`no handlers for embed type "${embedType}"`);
        }
        return handler;
    }
    insert(arg, attributes) {
        const newOp = {};
        if (typeof arg === 'string' && arg.length === 0) {
            return this;
        }
        newOp.insert = arg;
        if (attributes != null &&
            typeof attributes === 'object' &&
            Object.keys(attributes).length > 0) {
            newOp.attributes = attributes;
        }
        return this.push(newOp);
    }
    delete(length) {
        if (length <= 0) {
            return this;
        }
        return this.push({ delete: length });
    }
    retain(length, attributes) {
        if (typeof length === 'number' && length <= 0) {
            return this;
        }
        const newOp = { retain: length };
        if (attributes != null &&
            typeof attributes === 'object' &&
            Object.keys(attributes).length > 0) {
            newOp.attributes = attributes;
        }
        return this.push(newOp);
    }
    push(newOp) {
        let index = this.ops.length;
        let lastOp = this.ops[index - 1];
        newOp = cloneDeep(newOp);
        if (typeof lastOp === 'object') {
            if (typeof newOp.delete === 'number' &&
                typeof lastOp.delete === 'number') {
                this.ops[index - 1] = { delete: lastOp.delete + newOp.delete };
                return this;
            }
            // Since it does not matter if we insert before or after deleting at the same index,
            // always prefer to insert first
            if (typeof lastOp.delete === 'number' && newOp.insert != null) {
                index -= 1;
                lastOp = this.ops[index - 1];
                if (typeof lastOp !== 'object') {
                    this.ops.unshift(newOp);
                    return this;
                }
            }
            if (isEqual(newOp.attributes, lastOp.attributes)) {
                if (typeof newOp.insert === 'string' &&
                    typeof lastOp.insert === 'string') {
                    this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
                    if (typeof newOp.attributes === 'object') {
                        this.ops[index - 1].attributes = newOp.attributes;
                    }
                    return this;
                }
                else if (typeof newOp.retain === 'number' &&
                    typeof lastOp.retain === 'number') {
                    this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
                    if (typeof newOp.attributes === 'object') {
                        this.ops[index - 1].attributes = newOp.attributes;
                    }
                    return this;
                }
            }
        }
        if (index === this.ops.length) {
            this.ops.push(newOp);
        }
        else {
            this.ops.splice(index, 0, newOp);
        }
        return this;
    }
    chop() {
        const lastOp = this.ops[this.ops.length - 1];
        if (lastOp && typeof lastOp.retain === 'number' && !lastOp.attributes) {
            this.ops.pop();
        }
        return this;
    }
    filter(predicate) {
        return this.ops.filter(predicate);
    }
    forEach(predicate) {
        this.ops.forEach(predicate);
    }
    map(predicate) {
        return this.ops.map(predicate);
    }
    partition(predicate) {
        const passed = [];
        const failed = [];
        this.forEach((op) => {
            const target = predicate(op) ? passed : failed;
            target.push(op);
        });
        return [passed, failed];
    }
    reduce(predicate, initialValue) {
        return this.ops.reduce(predicate, initialValue);
    }
    changeLength() {
        return this.reduce((length, elem) => {
            if (elem.insert) {
                return length + Op_1.default.length(elem);
            }
            else if (elem.delete) {
                return length - elem.delete;
            }
            return length;
        }, 0);
    }
    length() {
        return this.reduce((length, elem) => {
            return length + Op_1.default.length(elem);
        }, 0);
    }
    slice(start = 0, end = Infinity) {
        const ops = [];
        const iter = new OpIterator_1.default(this.ops);
        let index = 0;
        while (index < end && iter.hasNext()) {
            let nextOp;
            if (index < start) {
                nextOp = iter.next(start - index);
            }
            else {
                nextOp = iter.next(end - index);
                ops.push(nextOp);
            }
            index += Op_1.default.length(nextOp);
        }
        return new Delta(ops);
    }
    compose(other) {
        const thisIter = new OpIterator_1.default(this.ops);
        const otherIter = new OpIterator_1.default(other.ops);
        const ops = [];
        const firstOther = otherIter.peek();
        if (firstOther != null &&
            typeof firstOther.retain === 'number' &&
            firstOther.attributes == null) {
            let firstLeft = firstOther.retain;
            while (thisIter.peekType() === 'insert' &&
                thisIter.peekLength() <= firstLeft) {
                firstLeft -= thisIter.peekLength();
                ops.push(thisIter.next());
            }
            if (firstOther.retain - firstLeft > 0) {
                otherIter.next(firstOther.retain - firstLeft);
            }
        }
        const delta = new Delta(ops);
        while (thisIter.hasNext() || otherIter.hasNext()) {
            if (otherIter.peekType() === 'insert') {
                delta.push(otherIter.next());
            }
            else if (thisIter.peekType() === 'delete') {
                delta.push(thisIter.next());
            }
            else {
                const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
                const thisOp = thisIter.next(length);
                const otherOp = otherIter.next(length);
                if (otherOp.retain) {
                    const newOp = {};
                    if (typeof thisOp.retain === 'number') {
                        newOp.retain =
                            typeof otherOp.retain === 'number' ? length : otherOp.retain;
                    }
                    else {
                        if (typeof otherOp.retain === 'number') {
                            if (thisOp.retain == null) {
                                newOp.insert = thisOp.insert;
                            }
                            else {
                                newOp.retain = thisOp.retain;
                            }
                        }
                        else {
                            const action = thisOp.retain == null ? 'insert' : 'retain';
                            const [embedType, thisData, otherData] = getEmbedTypeAndData(thisOp[action], otherOp.retain);
                            const handler = Delta.getHandler(embedType);
                            newOp[action] = {
                                [embedType]: handler.compose(thisData, otherData, action === 'retain'),
                            };
                        }
                    }
                    // Preserve null when composing with a retain, otherwise remove it for inserts
                    const attributes = AttributeMap_1.default.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
                    if (attributes) {
                        newOp.attributes = attributes;
                    }
                    delta.push(newOp);
                    // Optimization if rest of other is just retain
                    if (!otherIter.hasNext() &&
                        isEqual(delta.ops[delta.ops.length - 1], newOp)) {
                        const rest = new Delta(thisIter.rest());
                        return delta.concat(rest).chop();
                    }
                    // Other op should be delete, we could be an insert or retain
                    // Insert + delete cancels out
                }
                else if (typeof otherOp.delete === 'number' &&
                    (typeof thisOp.retain === 'number' ||
                        (typeof thisOp.retain === 'object' && thisOp.retain !== null))) {
                    delta.push(otherOp);
                }
            }
        }
        return delta.chop();
    }
    concat(other) {
        const delta = new Delta(this.ops.slice());
        if (other.ops.length > 0) {
            delta.push(other.ops[0]);
            delta.ops = delta.ops.concat(other.ops.slice(1));
        }
        return delta;
    }
    diff(other, cursor) {
        if (this.ops === other.ops) {
            return new Delta();
        }
        const strings = [this, other].map((delta) => {
            return delta
                .map((op) => {
                if (op.insert != null) {
                    return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;
                }
                const prep = delta === other ? 'on' : 'with';
                throw new Error('diff() called ' + prep + ' non-document');
            })
                .join('');
        });
        const retDelta = new Delta();
        const diffResult = diff(strings[0], strings[1], cursor);
        const thisIter = new OpIterator_1.default(this.ops);
        const otherIter = new OpIterator_1.default(other.ops);
        diffResult.forEach((component) => {
            let length = component[1].length;
            while (length > 0) {
                let opLength = 0;
                switch (component[0]) {
                    case diff.INSERT:
                        opLength = Math.min(otherIter.peekLength(), length);
                        retDelta.push(otherIter.next(opLength));
                        break;
                    case diff.DELETE:
                        opLength = Math.min(length, thisIter.peekLength());
                        thisIter.next(opLength);
                        retDelta.delete(opLength);
                        break;
                    case diff.EQUAL:
                        opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
                        const thisOp = thisIter.next(opLength);
                        const otherOp = otherIter.next(opLength);
                        if (isEqual(thisOp.insert, otherOp.insert)) {
                            retDelta.retain(opLength, AttributeMap_1.default.diff(thisOp.attributes, otherOp.attributes));
                        }
                        else {
                            retDelta.push(otherOp).delete(opLength);
                        }
                        break;
                }
                length -= opLength;
            }
        });
        return retDelta.chop();
    }
    eachLine(predicate, newline = '\n') {
        const iter = new OpIterator_1.default(this.ops);
        let line = new Delta();
        let i = 0;
        while (iter.hasNext()) {
            if (iter.peekType() !== 'insert') {
                return;
            }
            const thisOp = iter.peek();
            const start = Op_1.default.length(thisOp) - iter.peekLength();
            const index = typeof thisOp.insert === 'string'
                ? thisOp.insert.indexOf(newline, start) - start
                : -1;
            if (index < 0) {
                line.push(iter.next());
            }
            else if (index > 0) {
                line.push(iter.next(index));
            }
            else {
                if (predicate(line, iter.next(1).attributes || {}, i) === false) {
                    return;
                }
                i += 1;
                line = new Delta();
            }
        }
        if (line.length() > 0) {
            predicate(line, {}, i);
        }
    }
    invert(base) {
        const inverted = new Delta();
        this.reduce((baseIndex, op) => {
            if (op.insert) {
                inverted.delete(Op_1.default.length(op));
            }
            else if (typeof op.retain === 'number' && op.attributes == null) {
                inverted.retain(op.retain);
                return baseIndex + op.retain;
            }
            else if (op.delete || typeof op.retain === 'number') {
                const length = (op.delete || op.retain);
                const slice = base.slice(baseIndex, baseIndex + length);
                slice.forEach((baseOp) => {
                    if (op.delete) {
                        inverted.push(baseOp);
                    }
                    else if (op.retain && op.attributes) {
                        inverted.retain(Op_1.default.length(baseOp), AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
                    }
                });
                return baseIndex + length;
            }
            else if (typeof op.retain === 'object' && op.retain !== null) {
                const slice = base.slice(baseIndex, baseIndex + 1);
                const baseOp = new OpIterator_1.default(slice.ops).next();
                const [embedType, opData, baseOpData] = getEmbedTypeAndData(op.retain, baseOp.insert);
                const handler = Delta.getHandler(embedType);
                inverted.retain({ [embedType]: handler.invert(opData, baseOpData) }, AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
                return baseIndex + 1;
            }
            return baseIndex;
        }, 0);
        return inverted.chop();
    }
    transform(arg, priority = false) {
        priority = !!priority;
        if (typeof arg === 'number') {
            return this.transformPosition(arg, priority);
        }
        const other = arg;
        const thisIter = new OpIterator_1.default(this.ops);
        const otherIter = new OpIterator_1.default(other.ops);
        const delta = new Delta();
        while (thisIter.hasNext() || otherIter.hasNext()) {
            if (thisIter.peekType() === 'insert' &&
                (priority || otherIter.peekType() !== 'insert')) {
                delta.retain(Op_1.default.length(thisIter.next()));
            }
            else if (otherIter.peekType() === 'insert') {
                delta.push(otherIter.next());
            }
            else {
                const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
                const thisOp = thisIter.next(length);
                const otherOp = otherIter.next(length);
                if (thisOp.delete) {
                    // Our delete either makes their delete redundant or removes their retain
                    continue;
                }
                else if (otherOp.delete) {
                    delta.push(otherOp);
                }
                else {
                    const thisData = thisOp.retain;
                    const otherData = otherOp.retain;
                    let transformedData = typeof otherData === 'object' && otherData !== null
                        ? otherData
                        : length;
                    if (typeof thisData === 'object' &&
                        thisData !== null &&
                        typeof otherData === 'object' &&
                        otherData !== null) {
                        const embedType = Object.keys(thisData)[0];
                        if (embedType === Object.keys(otherData)[0]) {
                            const handler = Delta.getHandler(embedType);
                            if (handler) {
                                transformedData = {
                                    [embedType]: handler.transform(thisData[embedType], otherData[embedType], priority),
                                };
                            }
                        }
                    }
                    // We retain either their retain or insert
                    delta.retain(transformedData, AttributeMap_1.default.transform(thisOp.attributes, otherOp.attributes, priority));
                }
            }
        }
        return delta.chop();
    }
    transformPosition(index, priority = false) {
        priority = !!priority;
        const thisIter = new OpIterator_1.default(this.ops);
        let offset = 0;
        while (thisIter.hasNext() && offset <= index) {
            const length = thisIter.peekLength();
            const nextType = thisIter.peekType();
            thisIter.next();
            if (nextType === 'delete') {
                index -= Math.min(length, index - offset);
                continue;
            }
            else if (nextType === 'insert' && (offset < index || !priority)) {
                index += length;
            }
            offset += length;
        }
        return index;
    }
}
Delta.Op = Op_1.default;
Delta.OpIterator = OpIterator_1.default;
Delta.AttributeMap = AttributeMap_1.default;
Delta.handlers = {};
exports["default"] = Delta;
if (true) {
    module.exports = Delta;
    module.exports["default"] = Delta;
}


/***/ }),

/***/ 6237:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Op;
(function (Op) {
    function length(op) {
        if (typeof op.delete === 'number') {
            return op.delete;
        }
        else if (typeof op.retain === 'number') {
            return op.retain;
        }
        else if (typeof op.retain === 'object' && op.retain !== null) {
            return 1;
        }
        else {
            return typeof op.insert === 'string' ? op.insert.length : 1;
        }
    }
    Op.length = length;
})(Op || (Op = {}));
exports["default"] = Op;


/***/ }),

/***/ 2849:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Op_1 = __webpack_require__(6237);
class Iterator {
    constructor(ops) {
        this.ops = ops;
        this.index = 0;
        this.offset = 0;
    }
    hasNext() {
        return this.peekLength() < Infinity;
    }
    next(length) {
        if (!length) {
            length = Infinity;
        }
        const nextOp = this.ops[this.index];
        if (nextOp) {
            const offset = this.offset;
            const opLength = Op_1.default.length(nextOp);
            if (length >= opLength - offset) {
                length = opLength - offset;
                this.index += 1;
                this.offset = 0;
            }
            else {
                this.offset += length;
            }
            if (typeof nextOp.delete === 'number') {
                return { delete: length };
            }
            else {
                const retOp = {};
                if (nextOp.attributes) {
                    retOp.attributes = nextOp.attributes;
                }
                if (typeof nextOp.retain === 'number') {
                    retOp.retain = length;
                }
                else if (typeof nextOp.retain === 'object' &&
                    nextOp.retain !== null) {
                    // offset should === 0, length should === 1
                    retOp.retain = nextOp.retain;
                }
                else if (typeof nextOp.insert === 'string') {
                    retOp.insert = nextOp.insert.substr(offset, length);
                }
                else {
                    // offset should === 0, length should === 1
                    retOp.insert = nextOp.insert;
                }
                return retOp;
            }
        }
        else {
            return { retain: Infinity };
        }
    }
    peek() {
        return this.ops[this.index];
    }
    peekLength() {
        if (this.ops[this.index]) {
            // Should never return 0 if our index is being managed correctly
            return Op_1.default.length(this.ops[this.index]) - this.offset;
        }
        else {
            return Infinity;
        }
    }
    peekType() {
        const op = this.ops[this.index];
        if (op) {
            if (typeof op.delete === 'number') {
                return 'delete';
            }
            else if (typeof op.retain === 'number' ||
                (typeof op.retain === 'object' && op.retain !== null)) {
                return 'retain';
            }
            else {
                return 'insert';
            }
        }
        return 'retain';
    }
    rest() {
        if (!this.hasNext()) {
            return [];
        }
        else if (this.offset === 0) {
            return this.ops.slice(this.index);
        }
        else {
            const offset = this.offset;
            const index = this.index;
            const next = this.next();
            const rest = this.ops.slice(this.index);
            this.offset = offset;
            this.index = index;
            return [next].concat(rest);
        }
    }
}
exports["default"] = Iterator;


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ quill)
});

// EXTERNAL MODULE: ./node_modules/core-js/features/array/from.js
var from = __webpack_require__(8483);
// EXTERNAL MODULE: ./node_modules/core-js/features/array/fill.js
var fill = __webpack_require__(1667);
// EXTERNAL MODULE: ./node_modules/core-js/features/object/values.js
var values = __webpack_require__(6143);
// EXTERNAL MODULE: ./node_modules/core-js/features/string/ends-with.js
var ends_with = __webpack_require__(9013);
;// CONCATENATED MODULE: ./polyfills.js
// IE11 support





// EXTERNAL MODULE: ./core.js
var core = __webpack_require__(2432);
// EXTERNAL MODULE: ./formats/align.js
var align = __webpack_require__(715);
// EXTERNAL MODULE: ./formats/direction.js
var direction = __webpack_require__(4048);
// EXTERNAL MODULE: ./node_modules/parchment/src/parchment.ts + 17 modules
var parchment = __webpack_require__(1233);
;// CONCATENATED MODULE: ./formats/indent.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var IndentAttributor = /*#__PURE__*/function (_ClassAttributor) {
  _inherits(IndentAttributor, _ClassAttributor);
  var _super = _createSuper(IndentAttributor);
  function IndentAttributor() {
    _classCallCheck(this, IndentAttributor);
    return _super.apply(this, arguments);
  }
  _createClass(IndentAttributor, [{
    key: "add",
    value: function add(node, value) {
      if (value === '+1' || value === '-1') {
        var indent = this.value(node) || 0;
        value = value === '+1' ? indent + 1 : indent - 1;
      }
      if (value === 0) {
        this.remove(node);
        return true;
      }
      return _get(_getPrototypeOf(IndentAttributor.prototype), "add", this).call(this, node, value);
    }
  }, {
    key: "canAdd",
    value: function canAdd(node, value) {
      return _get(_getPrototypeOf(IndentAttributor.prototype), "canAdd", this).call(this, node, value) || _get(_getPrototypeOf(IndentAttributor.prototype), "canAdd", this).call(this, node, parseInt(value, 10));
    }
  }, {
    key: "value",
    value: function value(node) {
      return parseInt(_get(_getPrototypeOf(IndentAttributor.prototype), "value", this).call(this, node), 10) || undefined; // Don't return NaN
    }
  }]);
  return IndentAttributor;
}(parchment.ClassAttributor);
var IndentClass = new IndentAttributor('indent', 'ql-indent', {
  scope: parchment.Scope.BLOCK,
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
/* harmony default export */ const indent = (IndentClass);
// EXTERNAL MODULE: ./blots/block.js + 1 modules
var block = __webpack_require__(6446);
;// CONCATENATED MODULE: ./formats/blockquote.js
function blockquote_typeof(obj) { "@babel/helpers - typeof"; return blockquote_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, blockquote_typeof(obj); }
function blockquote_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function blockquote_createClass(Constructor, protoProps, staticProps) { if (protoProps) blockquote_defineProperties(Constructor.prototype, protoProps); if (staticProps) blockquote_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function blockquote_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function blockquote_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) blockquote_setPrototypeOf(subClass, superClass); }
function blockquote_setPrototypeOf(o, p) { blockquote_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return blockquote_setPrototypeOf(o, p); }
function blockquote_createSuper(Derived) { var hasNativeReflectConstruct = blockquote_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = blockquote_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = blockquote_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return blockquote_possibleConstructorReturn(this, result); }; }
function blockquote_possibleConstructorReturn(self, call) { if (call && (blockquote_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return blockquote_assertThisInitialized(self); }
function blockquote_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function blockquote_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function blockquote_getPrototypeOf(o) { blockquote_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return blockquote_getPrototypeOf(o); }

var Blockquote = /*#__PURE__*/function (_Block) {
  blockquote_inherits(Blockquote, _Block);
  var _super = blockquote_createSuper(Blockquote);
  function Blockquote() {
    blockquote_classCallCheck(this, Blockquote);
    return _super.apply(this, arguments);
  }
  return blockquote_createClass(Blockquote);
}(block/* default */.ZP);
Blockquote.blotName = 'blockquote';
Blockquote.tagName = 'blockquote';
/* harmony default export */ const blockquote = (Blockquote);
;// CONCATENATED MODULE: ./formats/header.js
function header_typeof(obj) { "@babel/helpers - typeof"; return header_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, header_typeof(obj); }
function header_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function header_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function header_createClass(Constructor, protoProps, staticProps) { if (protoProps) header_defineProperties(Constructor.prototype, protoProps); if (staticProps) header_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function header_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) header_setPrototypeOf(subClass, superClass); }
function header_setPrototypeOf(o, p) { header_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return header_setPrototypeOf(o, p); }
function header_createSuper(Derived) { var hasNativeReflectConstruct = header_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = header_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = header_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return header_possibleConstructorReturn(this, result); }; }
function header_possibleConstructorReturn(self, call) { if (call && (header_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return header_assertThisInitialized(self); }
function header_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function header_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function header_getPrototypeOf(o) { header_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return header_getPrototypeOf(o); }

var Header = /*#__PURE__*/function (_Block) {
  header_inherits(Header, _Block);
  var _super = header_createSuper(Header);
  function Header() {
    header_classCallCheck(this, Header);
    return _super.apply(this, arguments);
  }
  header_createClass(Header, null, [{
    key: "formats",
    value: function formats(domNode) {
      return this.tagName.indexOf(domNode.tagName) + 1;
    }
  }]);
  return Header;
}(block/* default */.ZP);
Header.blotName = 'header';
Header.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
/* harmony default export */ const header = (Header);
// EXTERNAL MODULE: ./blots/container.js
var container = __webpack_require__(3553);
// EXTERNAL MODULE: ./core/quill.js
var core_quill = __webpack_require__(281);
;// CONCATENATED MODULE: ./formats/list.js
function list_typeof(obj) { "@babel/helpers - typeof"; return list_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, list_typeof(obj); }
function list_get() { if (typeof Reflect !== "undefined" && Reflect.get) { list_get = Reflect.get.bind(); } else { list_get = function _get(target, property, receiver) { var base = list_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return list_get.apply(this, arguments); }
function list_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = list_getPrototypeOf(object); if (object === null) break; } return object; }
function list_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function list_createClass(Constructor, protoProps, staticProps) { if (protoProps) list_defineProperties(Constructor.prototype, protoProps); if (staticProps) list_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function list_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function list_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) list_setPrototypeOf(subClass, superClass); }
function list_setPrototypeOf(o, p) { list_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return list_setPrototypeOf(o, p); }
function list_createSuper(Derived) { var hasNativeReflectConstruct = list_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = list_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = list_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return list_possibleConstructorReturn(this, result); }; }
function list_possibleConstructorReturn(self, call) { if (call && (list_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return list_assertThisInitialized(self); }
function list_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function list_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function list_getPrototypeOf(o) { list_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return list_getPrototypeOf(o); }



var ListContainer = /*#__PURE__*/function (_Container) {
  list_inherits(ListContainer, _Container);
  var _super = list_createSuper(ListContainer);
  function ListContainer() {
    list_classCallCheck(this, ListContainer);
    return _super.apply(this, arguments);
  }
  return list_createClass(ListContainer);
}(container/* default */.Z);
ListContainer.blotName = 'list-container';
ListContainer.tagName = 'OL';
var ListItem = /*#__PURE__*/function (_Block) {
  list_inherits(ListItem, _Block);
  var _super2 = list_createSuper(ListItem);
  function ListItem(scroll, domNode) {
    var _this;
    list_classCallCheck(this, ListItem);
    _this = _super2.call(this, scroll, domNode);
    var ui = domNode.ownerDocument.createElement('span');
    var listEventHandler = function listEventHandler(e) {
      if (!scroll.isEnabled()) return;
      var format = _this.statics.formats(domNode, scroll);
      if (format === 'checked') {
        _this.format('list', 'unchecked');
        e.preventDefault();
      } else if (format === 'unchecked') {
        _this.format('list', 'checked');
        e.preventDefault();
      }
    };
    ui.addEventListener('mousedown', listEventHandler);
    ui.addEventListener('touchstart', listEventHandler);
    _this.attachUI(ui);
    return _this;
  }
  list_createClass(ListItem, [{
    key: "format",
    value: function format(name, value) {
      if (name === this.statics.blotName && value) {
        this.domNode.setAttribute('data-list', value);
      } else {
        list_get(list_getPrototypeOf(ListItem.prototype), "format", this).call(this, name, value);
      }
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = list_get(list_getPrototypeOf(ListItem), "create", this).call(this);
      node.setAttribute('data-list', value);
      return node;
    }
  }, {
    key: "formats",
    value: function formats(domNode) {
      return domNode.getAttribute('data-list') || undefined;
    }
  }, {
    key: "register",
    value: function register() {
      core_quill/* default.register */.ZP.register(ListContainer);
    }
  }]);
  return ListItem;
}(block/* default */.ZP);
ListItem.blotName = 'list';
ListItem.tagName = 'LI';
ListContainer.allowedChildren = [ListItem];
ListItem.requiredContainer = ListContainer;

// eslint-disable-next-line no-restricted-exports

// EXTERNAL MODULE: ./formats/background.js
var background = __webpack_require__(7898);
// EXTERNAL MODULE: ./formats/color.js
var color = __webpack_require__(6039);
// EXTERNAL MODULE: ./formats/font.js
var font = __webpack_require__(5832);
// EXTERNAL MODULE: ./formats/size.js
var size = __webpack_require__(1629);
// EXTERNAL MODULE: ./formats/bold.js
var bold = __webpack_require__(3991);
;// CONCATENATED MODULE: ./formats/italic.js
function italic_typeof(obj) { "@babel/helpers - typeof"; return italic_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, italic_typeof(obj); }
function italic_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function italic_createClass(Constructor, protoProps, staticProps) { if (protoProps) italic_defineProperties(Constructor.prototype, protoProps); if (staticProps) italic_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function italic_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function italic_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) italic_setPrototypeOf(subClass, superClass); }
function italic_setPrototypeOf(o, p) { italic_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return italic_setPrototypeOf(o, p); }
function italic_createSuper(Derived) { var hasNativeReflectConstruct = italic_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = italic_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = italic_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return italic_possibleConstructorReturn(this, result); }; }
function italic_possibleConstructorReturn(self, call) { if (call && (italic_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return italic_assertThisInitialized(self); }
function italic_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function italic_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function italic_getPrototypeOf(o) { italic_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return italic_getPrototypeOf(o); }

var Italic = /*#__PURE__*/function (_Bold) {
  italic_inherits(Italic, _Bold);
  var _super = italic_createSuper(Italic);
  function Italic() {
    italic_classCallCheck(this, Italic);
    return _super.apply(this, arguments);
  }
  return italic_createClass(Italic);
}(bold/* default */.Z);
Italic.blotName = 'italic';
Italic.tagName = ['EM', 'I'];
/* harmony default export */ const italic = (Italic);
// EXTERNAL MODULE: ./formats/link.js
var formats_link = __webpack_require__(7256);
// EXTERNAL MODULE: ./blots/inline.js
var inline = __webpack_require__(6603);
;// CONCATENATED MODULE: ./formats/script.js
function script_typeof(obj) { "@babel/helpers - typeof"; return script_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, script_typeof(obj); }
function script_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function script_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function script_createClass(Constructor, protoProps, staticProps) { if (protoProps) script_defineProperties(Constructor.prototype, protoProps); if (staticProps) script_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function script_get() { if (typeof Reflect !== "undefined" && Reflect.get) { script_get = Reflect.get.bind(); } else { script_get = function _get(target, property, receiver) { var base = script_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return script_get.apply(this, arguments); }
function script_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = script_getPrototypeOf(object); if (object === null) break; } return object; }
function script_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) script_setPrototypeOf(subClass, superClass); }
function script_setPrototypeOf(o, p) { script_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return script_setPrototypeOf(o, p); }
function script_createSuper(Derived) { var hasNativeReflectConstruct = script_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = script_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = script_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return script_possibleConstructorReturn(this, result); }; }
function script_possibleConstructorReturn(self, call) { if (call && (script_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return script_assertThisInitialized(self); }
function script_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function script_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function script_getPrototypeOf(o) { script_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return script_getPrototypeOf(o); }

var Script = /*#__PURE__*/function (_Inline) {
  script_inherits(Script, _Inline);
  var _super = script_createSuper(Script);
  function Script() {
    script_classCallCheck(this, Script);
    return _super.apply(this, arguments);
  }
  script_createClass(Script, null, [{
    key: "create",
    value: function create(value) {
      if (value === 'super') {
        return document.createElement('sup');
      }
      if (value === 'sub') {
        return document.createElement('sub');
      }
      return script_get(script_getPrototypeOf(Script), "create", this).call(this, value);
    }
  }, {
    key: "formats",
    value: function formats(domNode) {
      if (domNode.tagName === 'SUB') return 'sub';
      if (domNode.tagName === 'SUP') return 'super';
      return undefined;
    }
  }]);
  return Script;
}(inline/* default */.Z);
Script.blotName = 'script';
Script.tagName = ['SUB', 'SUP'];
/* harmony default export */ const script = (Script);
;// CONCATENATED MODULE: ./formats/strike.js
function strike_typeof(obj) { "@babel/helpers - typeof"; return strike_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, strike_typeof(obj); }
function strike_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function strike_createClass(Constructor, protoProps, staticProps) { if (protoProps) strike_defineProperties(Constructor.prototype, protoProps); if (staticProps) strike_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function strike_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function strike_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) strike_setPrototypeOf(subClass, superClass); }
function strike_setPrototypeOf(o, p) { strike_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return strike_setPrototypeOf(o, p); }
function strike_createSuper(Derived) { var hasNativeReflectConstruct = strike_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = strike_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = strike_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return strike_possibleConstructorReturn(this, result); }; }
function strike_possibleConstructorReturn(self, call) { if (call && (strike_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return strike_assertThisInitialized(self); }
function strike_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function strike_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function strike_getPrototypeOf(o) { strike_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return strike_getPrototypeOf(o); }

var Strike = /*#__PURE__*/function (_Bold) {
  strike_inherits(Strike, _Bold);
  var _super = strike_createSuper(Strike);
  function Strike() {
    strike_classCallCheck(this, Strike);
    return _super.apply(this, arguments);
  }
  return strike_createClass(Strike);
}(bold/* default */.Z);
Strike.blotName = 'strike';
Strike.tagName = ['S', 'STRIKE'];
/* harmony default export */ const strike = (Strike);
;// CONCATENATED MODULE: ./formats/underline.js
function underline_typeof(obj) { "@babel/helpers - typeof"; return underline_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, underline_typeof(obj); }
function underline_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function underline_createClass(Constructor, protoProps, staticProps) { if (protoProps) underline_defineProperties(Constructor.prototype, protoProps); if (staticProps) underline_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function underline_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function underline_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) underline_setPrototypeOf(subClass, superClass); }
function underline_setPrototypeOf(o, p) { underline_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return underline_setPrototypeOf(o, p); }
function underline_createSuper(Derived) { var hasNativeReflectConstruct = underline_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = underline_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = underline_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return underline_possibleConstructorReturn(this, result); }; }
function underline_possibleConstructorReturn(self, call) { if (call && (underline_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return underline_assertThisInitialized(self); }
function underline_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function underline_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function underline_getPrototypeOf(o) { underline_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return underline_getPrototypeOf(o); }

var Underline = /*#__PURE__*/function (_Inline) {
  underline_inherits(Underline, _Inline);
  var _super = underline_createSuper(Underline);
  function Underline() {
    underline_classCallCheck(this, Underline);
    return _super.apply(this, arguments);
  }
  return underline_createClass(Underline);
}(inline/* default */.Z);
Underline.blotName = 'underline';
Underline.tagName = 'U';
/* harmony default export */ const underline = (Underline);
// EXTERNAL MODULE: ./blots/embed.js
var blots_embed = __webpack_require__(7452);
// EXTERNAL MODULE: ./utils/has_window.js
var has_window = __webpack_require__(8034);
;// CONCATENATED MODULE: ./formats/formula.js
function formula_typeof(obj) { "@babel/helpers - typeof"; return formula_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, formula_typeof(obj); }
function formula_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function formula_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function formula_createClass(Constructor, protoProps, staticProps) { if (protoProps) formula_defineProperties(Constructor.prototype, protoProps); if (staticProps) formula_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function formula_get() { if (typeof Reflect !== "undefined" && Reflect.get) { formula_get = Reflect.get.bind(); } else { formula_get = function _get(target, property, receiver) { var base = formula_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return formula_get.apply(this, arguments); }
function formula_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = formula_getPrototypeOf(object); if (object === null) break; } return object; }
function formula_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) formula_setPrototypeOf(subClass, superClass); }
function formula_setPrototypeOf(o, p) { formula_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return formula_setPrototypeOf(o, p); }
function formula_createSuper(Derived) { var hasNativeReflectConstruct = formula_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = formula_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = formula_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return formula_possibleConstructorReturn(this, result); }; }
function formula_possibleConstructorReturn(self, call) { if (call && (formula_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return formula_assertThisInitialized(self); }
function formula_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function formula_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function formula_getPrototypeOf(o) { formula_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return formula_getPrototypeOf(o); }


var Formula = /*#__PURE__*/function (_Embed) {
  formula_inherits(Formula, _Embed);
  var _super = formula_createSuper(Formula);
  function Formula() {
    formula_classCallCheck(this, Formula);
    return _super.apply(this, arguments);
  }
  formula_createClass(Formula, [{
    key: "html",
    value: function html() {
      var _this$value = this.value(),
        formula = _this$value.formula;
      return "<span>".concat(formula, "</span>");
    }
  }], [{
    key: "create",
    value: function create(value) {
      var katex = null;
      if ((0,has_window/* default */.Z)()) {
        katex = window.katex;
      }
      if (katex == null) {
        throw new Error('Formula module requires KaTeX.');
      }
      var node = formula_get(formula_getPrototypeOf(Formula), "create", this).call(this, value);
      if (typeof value === 'string') {
        katex.render(value, node, {
          throwOnError: false,
          errorColor: '#f00'
        });
        node.setAttribute('data-value', value);
      }
      return node;
    }
  }, {
    key: "value",
    value: function value(domNode) {
      return domNode.getAttribute('data-value');
    }
  }]);
  return Formula;
}(blots_embed/* default */.Z);
Formula.blotName = 'formula';
Formula.className = 'ql-formula';
Formula.tagName = 'SPAN';
/* harmony default export */ const formula = (Formula);
;// CONCATENATED MODULE: ./formats/image.js
function image_typeof(obj) { "@babel/helpers - typeof"; return image_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, image_typeof(obj); }
function image_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function image_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function image_createClass(Constructor, protoProps, staticProps) { if (protoProps) image_defineProperties(Constructor.prototype, protoProps); if (staticProps) image_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function image_get() { if (typeof Reflect !== "undefined" && Reflect.get) { image_get = Reflect.get.bind(); } else { image_get = function _get(target, property, receiver) { var base = image_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return image_get.apply(this, arguments); }
function image_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = image_getPrototypeOf(object); if (object === null) break; } return object; }
function image_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) image_setPrototypeOf(subClass, superClass); }
function image_setPrototypeOf(o, p) { image_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return image_setPrototypeOf(o, p); }
function image_createSuper(Derived) { var hasNativeReflectConstruct = image_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = image_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = image_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return image_possibleConstructorReturn(this, result); }; }
function image_possibleConstructorReturn(self, call) { if (call && (image_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return image_assertThisInitialized(self); }
function image_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function image_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function image_getPrototypeOf(o) { image_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return image_getPrototypeOf(o); }



var ATTRIBUTES = ['alt', 'height', 'width'];
var Image = /*#__PURE__*/function (_EmbedBlot) {
  image_inherits(Image, _EmbedBlot);
  var _super = image_createSuper(Image);
  function Image() {
    image_classCallCheck(this, Image);
    return _super.apply(this, arguments);
  }
  image_createClass(Image, [{
    key: "format",
    value: function format(name, value) {
      if (ATTRIBUTES.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        image_get(image_getPrototypeOf(Image.prototype), "format", this).call(this, name, value);
      }
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = image_get(image_getPrototypeOf(Image), "create", this).call(this, value);
      if (typeof value === 'string') {
        node.setAttribute('src', this.sanitize(value));
      }
      return node;
    }
  }, {
    key: "formats",
    value: function formats(domNode) {
      return ATTRIBUTES.reduce(function (formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      }, {});
    }
  }, {
    key: "match",
    value: function match(url) {
      return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
    }
  }, {
    key: "register",
    value: function register() {
      if ((0,has_window/* default */.Z)() && /Firefox/i.test(navigator.userAgent)) {
        setTimeout(function () {
          // Disable image resizing in Firefox
          document.execCommand('enableObjectResizing', false, false);
        }, 1);
      }
    }
  }, {
    key: "sanitize",
    value: function sanitize(url) {
      return (0,formats_link/* sanitize */.N)(url, ['http', 'https', 'data']) ? url : '//:0';
    }
  }, {
    key: "value",
    value: function value(domNode) {
      return domNode.getAttribute('src');
    }
  }]);
  return Image;
}(parchment.EmbedBlot);
Image.blotName = 'image';
Image.tagName = 'IMG';
/* harmony default export */ const formats_image = (Image);
;// CONCATENATED MODULE: ./formats/video.js
function video_typeof(obj) { "@babel/helpers - typeof"; return video_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, video_typeof(obj); }
function video_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function video_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function video_createClass(Constructor, protoProps, staticProps) { if (protoProps) video_defineProperties(Constructor.prototype, protoProps); if (staticProps) video_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function video_get() { if (typeof Reflect !== "undefined" && Reflect.get) { video_get = Reflect.get.bind(); } else { video_get = function _get(target, property, receiver) { var base = video_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return video_get.apply(this, arguments); }
function video_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = video_getPrototypeOf(object); if (object === null) break; } return object; }
function video_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) video_setPrototypeOf(subClass, superClass); }
function video_setPrototypeOf(o, p) { video_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return video_setPrototypeOf(o, p); }
function video_createSuper(Derived) { var hasNativeReflectConstruct = video_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = video_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = video_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return video_possibleConstructorReturn(this, result); }; }
function video_possibleConstructorReturn(self, call) { if (call && (video_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return video_assertThisInitialized(self); }
function video_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function video_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function video_getPrototypeOf(o) { video_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return video_getPrototypeOf(o); }


var video_ATTRIBUTES = ['height', 'width'];
var Video = /*#__PURE__*/function (_BlockEmbed) {
  video_inherits(Video, _BlockEmbed);
  var _super = video_createSuper(Video);
  function Video() {
    video_classCallCheck(this, Video);
    return _super.apply(this, arguments);
  }
  video_createClass(Video, [{
    key: "format",
    value: function format(name, value) {
      if (video_ATTRIBUTES.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        video_get(video_getPrototypeOf(Video.prototype), "format", this).call(this, name, value);
      }
    }
  }, {
    key: "html",
    value: function html() {
      var _this$value = this.value(),
        video = _this$value.video;
      return "<a href=\"".concat(video, "\">").concat(video, "</a>");
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = video_get(video_getPrototypeOf(Video), "create", this).call(this, value);
      node.setAttribute('frameborder', '0');
      node.setAttribute('allowfullscreen', true);
      node.setAttribute('src', this.sanitize(value));
      return node;
    }
  }, {
    key: "formats",
    value: function formats(domNode) {
      return video_ATTRIBUTES.reduce(function (formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      }, {});
    }
  }, {
    key: "sanitize",
    value: function sanitize(url) {
      return formats_link/* default.sanitize */.Z.sanitize(url); // eslint-disable-line import/no-named-as-default-member
    }
  }, {
    key: "value",
    value: function value(domNode) {
      return domNode.getAttribute('src');
    }
  }]);
  return Video;
}(block/* BlockEmbed */.i2);
Video.blotName = 'video';
Video.className = 'ql-video';
Video.tagName = 'IFRAME';
/* harmony default export */ const video = (Video);
// EXTERNAL MODULE: ./formats/code.js
var code = __webpack_require__(7309);
// EXTERNAL MODULE: ./modules/syntax.js
var syntax = __webpack_require__(9072);
// EXTERNAL MODULE: ./modules/table/index.js
var table = __webpack_require__(867);
// EXTERNAL MODULE: ./node_modules/quill-delta/dist/Delta.js
var Delta = __webpack_require__(9098);
var Delta_default = /*#__PURE__*/__webpack_require__.n(Delta);
;// CONCATENATED MODULE: ./blots/multiline_break.js
function multiline_break_typeof(obj) { "@babel/helpers - typeof"; return multiline_break_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, multiline_break_typeof(obj); }
function multiline_break_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function multiline_break_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function multiline_break_createClass(Constructor, protoProps, staticProps) { if (protoProps) multiline_break_defineProperties(Constructor.prototype, protoProps); if (staticProps) multiline_break_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function multiline_break_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) multiline_break_setPrototypeOf(subClass, superClass); }
function multiline_break_setPrototypeOf(o, p) { multiline_break_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return multiline_break_setPrototypeOf(o, p); }
function multiline_break_createSuper(Derived) { var hasNativeReflectConstruct = multiline_break_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = multiline_break_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = multiline_break_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return multiline_break_possibleConstructorReturn(this, result); }; }
function multiline_break_possibleConstructorReturn(self, call) { if (call && (multiline_break_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return multiline_break_assertThisInitialized(self); }
function multiline_break_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function multiline_break_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function multiline_break_getPrototypeOf(o) { multiline_break_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return multiline_break_getPrototypeOf(o); }

var MultilineBreak = /*#__PURE__*/function (_EmbedBlot) {
  multiline_break_inherits(MultilineBreak, _EmbedBlot);
  var _super = multiline_break_createSuper(MultilineBreak);
  function MultilineBreak() {
    multiline_break_classCallCheck(this, MultilineBreak);
    return _super.apply(this, arguments);
  }
  multiline_break_createClass(MultilineBreak, [{
    key: "length",
    value: function length() {
      return 1;
    }
  }, {
    key: "value",
    value: function value() {
      return '\n';
    }
  }, {
    key: "optimize",
    value: function optimize() {
      if (!this.prev && !this.next) {
        this.remove();
      }
    }
  }], [{
    key: "value",
    value: function value() {
      return '\n';
    }
  }]);
  return MultilineBreak;
}(parchment.EmbedBlot);
MultilineBreak.blotName = 'multilineBreak';
MultilineBreak.tagName = 'BR';
/* harmony default export */ const multiline_break = (MultilineBreak);
// EXTERNAL MODULE: ./core/module.js
var core_module = __webpack_require__(7094);
;// CONCATENATED MODULE: ./modules/multiline.js
function multiline_typeof(obj) { "@babel/helpers - typeof"; return multiline_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, multiline_typeof(obj); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function multiline_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function multiline_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function multiline_createClass(Constructor, protoProps, staticProps) { if (protoProps) multiline_defineProperties(Constructor.prototype, protoProps); if (staticProps) multiline_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function multiline_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) multiline_setPrototypeOf(subClass, superClass); }
function multiline_setPrototypeOf(o, p) { multiline_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return multiline_setPrototypeOf(o, p); }
function multiline_createSuper(Derived) { var hasNativeReflectConstruct = multiline_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = multiline_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = multiline_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return multiline_possibleConstructorReturn(this, result); }; }
function multiline_possibleConstructorReturn(self, call) { if (call && (multiline_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return multiline_assertThisInitialized(self); }
function multiline_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function multiline_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function multiline_getPrototypeOf(o) { multiline_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return multiline_getPrototypeOf(o); }




function breakMatcher(node) {
  if (!node.nextSibling && !node.previousSibling) {
    return new (Delta_default())().insert('\n');
  }
  return new (Delta_default())().insert({
    multilineBreak: ''
  });
}
var Multiline = /*#__PURE__*/function (_Module) {
  multiline_inherits(Multiline, _Module);
  var _super = multiline_createSuper(Multiline);
  function Multiline(quill, options) {
    var _this;
    multiline_classCallCheck(this, Multiline);
    var path = 'blots/multilineBreak';
    _this = _super.call(this, quill, options);
    core_quill/* default.register */.ZP.register(_defineProperty({}, path, multiline_break), true);
    quill.keyboard.addBinding({
      key: 'enter',
      shiftKey: true
    }, _this.enterHandler.bind(multiline_assertThisInitialized(_this)));
    quill.keyboard.bindings.enter.unshift(quill.keyboard.bindings.enter.pop());
    quill.clipboard.addMatcher('BR', breakMatcher);
    return _this;
  }
  multiline_createClass(Multiline, [{
    key: "enterHandler",
    value: function enterHandler(range) {
      var currentLeaf = this.quill.getLeaf(range.index)[0];
      var nextLeaf = this.quill.getLeaf(range.index + 1)[0];
      this.quill.insertEmbed(range.index, 'multilineBreak', true, 'user');
      if (nextLeaf === null || currentLeaf.parent !== nextLeaf.parent) {
        this.quill.insertEmbed(range.index, 'multilineBreak', true, 'user');
      }
      this.quill.setSelection(range.index + 1, core_quill/* default.sources.SILENT */.ZP.sources.SILENT);
    }
  }]);
  return Multiline;
}(core_module/* default */.Z);
/* harmony default export */ const multiline = (Multiline);
// EXTERNAL MODULE: ./modules/table/lite.js + 4 modules
var lite = __webpack_require__(7215);
// EXTERNAL MODULE: ./formats/table/attributors/cell.js
var cell = __webpack_require__(1342);
// EXTERNAL MODULE: ./formats/table/attributors/table.js
var attributors_table = __webpack_require__(319);
;// CONCATENATED MODULE: ./quill.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { quill_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function quill_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




























function registerAttributorArray(path, attributorArray) {
  return attributorArray.reduce(function (result, attributor) {
    var key = "".concat(path).concat(attributor.attrName);
    result[key] = attributor;
    return result;
  }, {});
}
core["default"].register(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
  'attributors/attribute/direction': direction/* DirectionAttribute */.IF
}, registerAttributorArray('attributors/attribute/', attributors_table/* TABLE_ATTR_ATTRIBUTORS */.Qu)), registerAttributorArray('attributors/attribute/', cell/* TABLE_CELL_ATTR_ATTRIBUTORS */.yA)), {}, {
  'attributors/class/align': align/* AlignClass */.dk,
  'attributors/class/background': background/* BackgroundClass */.Y,
  'attributors/class/color': color/* ColorClass */.Hn,
  'attributors/class/direction': direction/* DirectionClass */.hY,
  'attributors/class/font': font/* FontClass */._,
  'attributors/class/size': size/* SizeClass */.m,
  'attributors/style/align': align/* AlignStyle */.HE,
  'attributors/style/background': background/* BackgroundStyle */.w,
  'attributors/style/color': color/* ColorStyle */.HQ,
  'attributors/style/direction': direction/* DirectionStyle */.H8,
  'attributors/style/font': font/* FontStyle */.H,
  'attributors/style/size': size/* SizeStyle */.Z
}, registerAttributorArray('attributors/style/', attributors_table/* TABLE_STYLE_ATTRIBUTORS */.VT)), registerAttributorArray('attributors/style/', cell/* TABLE_CELL_STYLE_ATTRIBUTORS */.kk)), true);
core["default"].register({
  'formats/align': align/* AlignClass */.dk,
  'formats/direction': direction/* DirectionClass */.hY,
  'formats/indent': indent,
  'formats/background': background/* BackgroundStyle */.w,
  'formats/color': color/* ColorStyle */.HQ,
  'formats/font': font/* FontClass */._,
  'formats/size': size/* SizeClass */.m,
  'formats/blockquote': blockquote,
  'formats/code-block': code/* default */.ZP,
  'formats/header': header,
  'formats/list': ListItem,
  'formats/bold': bold/* default */.Z,
  'formats/code': code/* Code */.EK,
  'formats/italic': italic,
  'formats/link': formats_link/* default */.Z,
  'formats/script': script,
  'formats/strike': strike,
  'formats/underline': underline,
  'formats/formula': formula,
  'formats/image': formats_image,
  'formats/video': video,
  'tableModules/lite': lite/* default */.Z,
  'tableModules/main': table/* default */.Z,
  'modules/syntax': syntax/* default */.ZP,
  'modules/multiline': multiline,
  'modules/table': table/* default */.Z
}, true);
/* harmony default export */ const quill = (core["default"]);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});