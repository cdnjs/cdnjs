"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dateParser;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function dateParser(date) {
  var parsed = new Date(date);

  if (!Number.isNaN(parsed.valueOf())) {
    return parsed;
  }

  var parts = String(date).match(/\d+/g);

  if (parts == null || parts.length <= 2) {
    return parsed;
  } else {
    var _parts$map = parts.map(function (x) {
      return parseInt(x);
    }),
        _parts$map2 = _toArray(_parts$map),
        firstP = _parts$map2[0],
        secondP = _parts$map2[1],
        restPs = _parts$map2.slice(2);

    var correctedParts = [firstP, secondP - 1].concat(_toConsumableArray(restPs));
    var isoDate = new Date(Date.UTC.apply(Date, _toConsumableArray(correctedParts)));
    return isoDate;
  }
}