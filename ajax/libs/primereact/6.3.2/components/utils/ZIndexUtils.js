"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZIndexUtils = void 0;

var _PrimeReact = _interopRequireDefault(require("../api/PrimeReact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handler() {
  var zIndexes = [];

  var generateZIndex = function generateZIndex(key, baseZIndex) {
    baseZIndex = baseZIndex || getBaseZIndex(key);
    var lastZIndex = zIndexes.length > 0 ? zIndexes[zIndexes.length - 1] : {
      key: key,
      value: baseZIndex
    };
    var newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({
      key: key,
      value: newZIndex
    });
    return newZIndex;
  };

  var revertZIndex = function revertZIndex(zIndex) {
    zIndexes = zIndexes.filter(function (obj) {
      return obj.value !== zIndex;
    });
  };

  var getBaseZIndex = function getBaseZIndex(key) {
    return _PrimeReact.default.zIndex[key] || 999;
  };

  var getCurrentZIndex = function getCurrentZIndex() {
    return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
  };

  return {
    get: function get(el) {
      return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
    },
    set: function set(key, el, baseZIndex) {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, baseZIndex));
      }
    },
    clear: function clear(el) {
      if (el) {
        revertZIndex(ZIndexUtils.get(el));
        el.style.zIndex = '';
      }
    },
    getBase: function getBase(key) {
      return getBaseZIndex(key);
    },
    getCurrent: function getCurrent() {
      return getCurrentZIndex();
    }
  };
}

var ZIndexUtils = handler();
exports.ZIndexUtils = ZIndexUtils;