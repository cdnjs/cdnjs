"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragSourceImpl = void 0;

var _invariant = require("@react-dnd/invariant");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DragSourceImpl = /*#__PURE__*/function () {
  function DragSourceImpl(spec, monitor, connector) {
    _classCallCheck(this, DragSourceImpl);

    this.spec = spec;
    this.monitor = monitor;
    this.connector = connector;
  }

  _createClass(DragSourceImpl, [{
    key: "beginDrag",
    value: function beginDrag() {
      var spec = this.spec;
      var monitor = this.monitor;
      var begin = spec.begin,
          item = spec.item;

      if (begin) {
        var _ref;

        var beginResult = begin(monitor);
        (0, _invariant.invariant)(beginResult == null || _typeof(beginResult) === 'object', 'dragSpec.begin() must either return an object, undefined, or null');
        return (_ref = beginResult !== null && beginResult !== void 0 ? beginResult : item) !== null && _ref !== void 0 ? _ref : {};
      }

      return item !== null && item !== void 0 ? item : {};
    }
  }, {
    key: "canDrag",
    value: function canDrag() {
      var spec = this.spec;
      var monitor = this.monitor;

      if (typeof spec.canDrag === 'boolean') {
        return spec.canDrag;
      } else if (typeof spec.canDrag === 'function') {
        return spec.canDrag(monitor);
      } else {
        return true;
      }
    }
  }, {
    key: "isDragging",
    value: function isDragging(globalMonitor, target) {
      var spec = this.spec;
      var monitor = this.monitor;
      var isDragging = spec.isDragging;
      return isDragging ? isDragging(monitor) : target === globalMonitor.getSourceId();
    }
  }, {
    key: "endDrag",
    value: function endDrag() {
      var spec = this.spec;
      var monitor = this.monitor;
      var connector = this.connector;
      var end = spec.end;

      if (end) {
        end(monitor.getItem(), monitor);
      }

      connector.reconnect();
    }
  }]);

  return DragSourceImpl;
}();

exports.DragSourceImpl = DragSourceImpl;