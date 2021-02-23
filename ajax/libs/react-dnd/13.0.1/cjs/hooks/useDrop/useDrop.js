"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDrop = useDrop;

var _react = require("react");

var _invariant = require("@react-dnd/invariant");

var _useMonitorOutput = require("../useMonitorOutput");

var _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");

var _useRegisteredDropTarget = require("./useRegisteredDropTarget");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
function useDrop(specFn, deps) {
  (0, _invariant.invariant)(typeof specFn === 'function', 'useDrop expects a function that returns a spec object');
  var spec = (0, _react.useMemo)(specFn, deps || []);
  (0, _invariant.invariant)(spec.accept != null, 'accept must be defined');

  var _useRegisteredDropTar = (0, _useRegisteredDropTarget.useRegisteredDropTarget)(spec),
      _useRegisteredDropTar2 = _slicedToArray(_useRegisteredDropTar, 2),
      monitor = _useRegisteredDropTar2[0],
      connector = _useRegisteredDropTar2[1];

  var collected = (0, _useMonitorOutput.useMonitorOutput)(monitor, spec.collect || function () {
    return {};
  }, function () {
    return connector.reconnect();
  });
  var connectDropTarget = (0, _react.useMemo)(function () {
    return connector.hooks.dropTarget();
  }, [connector]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    connector.dropTargetOptions = spec.options || null;
    connector.reconnect();
  }, [spec.options]);
  return [collected, connectDropTarget];
}