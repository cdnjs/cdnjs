"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRegisteredDragSource = useRegisteredDragSource;

var _internals = require("../../internals");

var _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");

var _useDragSource = require("./useDragSource");

var _useDragDropManager = require("../useDragDropManager");

var _useDragType = require("./useDragType");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useRegisteredDragSource(spec, monitor, connector) {
  var manager = (0, _useDragDropManager.useDragDropManager)();
  var handler = (0, _useDragSource.useDragSource)(spec, monitor, connector);
  var itemType = (0, _useDragType.useDragType)(spec);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function registerDragSource() {
    if (itemType != null) {
      var _registerSource = (0, _internals.registerSource)(itemType, handler, manager),
          _registerSource2 = _slicedToArray(_registerSource, 2),
          handlerId = _registerSource2[0],
          unregister = _registerSource2[1];

      monitor.receiveHandlerId(handlerId);
      connector.receiveHandlerId(handlerId);
      return unregister;
    }
  }, [manager, monitor, connector, handler, itemType]);
}