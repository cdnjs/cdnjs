"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grab = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _GrabLineLinked = require("./GrabLineLinked");

var _Messages = require("../../../Utils/Messages");

var Grab = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Grab, [{
    key: "line_linked",

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    get: function get() {
      _Messages.Messages.deprecated("interactivity.modes.grab.line_linked", "interactivity.modes.grab.lineLinked");

      return this.lineLinked;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("interactivity.modes.grab.line_linked", "interactivity.modes.grab.lineLinked");

      this.lineLinked = value;
    }
  }]);

  function Grab() {
    (0, _classCallCheck2["default"])(this, Grab);
    this.distance = void 0;
    this.lineLinked = void 0;
    this.distance = 100;
    this.lineLinked = new _GrabLineLinked.GrabLineLinked();
  }

  (0, _createClass2["default"])(Grab, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }

        if (data.lineLinked !== undefined) {
          this.lineLinked.load(data.lineLinked);
        } else if (data.line_linked !== undefined) {
          this.line_linked.load(data.line_linked);
        }
      }
    }
  }]);
  return Grab;
}();

exports.Grab = Grab;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9HcmFiLnRzIl0sIm5hbWVzIjpbIkdyYWIiLCJNZXNzYWdlcyIsImRlcHJlY2F0ZWQiLCJsaW5lTGlua2VkIiwidmFsdWUiLCJkaXN0YW5jZSIsIkdyYWJMaW5lTGlua2VkIiwiZGF0YSIsInVuZGVmaW5lZCIsImxvYWQiLCJsaW5lX2xpbmtlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztJQUdhQSxJOzs7O0FBQ1Q7Ozs7d0JBSTBDO0FBQ3RDQyx5QkFBU0MsVUFBVCxDQUFvQixzQ0FBcEIsRUFBNEQscUNBQTVEOztBQUVBLGFBQU8sS0FBS0MsVUFBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLdUJDLEssRUFBd0I7QUFDM0NILHlCQUFTQyxVQUFULENBQW9CLHNDQUFwQixFQUE0RCxxQ0FBNUQ7O0FBRUEsV0FBS0MsVUFBTCxHQUFrQkMsS0FBbEI7QUFDSDs7O0FBS0Qsa0JBQWM7QUFBQTtBQUFBLFNBSFBDLFFBR087QUFBQSxTQUZQRixVQUVPO0FBQ1YsU0FBS0UsUUFBTCxHQUFnQixHQUFoQjtBQUNBLFNBQUtGLFVBQUwsR0FBa0IsSUFBSUcsOEJBQUosRUFBbEI7QUFDSDs7Ozt5QkFFV0MsSSxFQUFzQztBQUM5QyxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDRixRQUFMLEtBQWtCRyxTQUF0QixFQUFpQztBQUM3QixlQUFLSCxRQUFMLEdBQWdCRSxJQUFJLENBQUNGLFFBQXJCO0FBQ0g7O0FBRUQsWUFBSUUsSUFBSSxDQUFDSixVQUFMLEtBQW9CSyxTQUF4QixFQUFtQztBQUMvQixlQUFLTCxVQUFMLENBQWdCTSxJQUFoQixDQUFxQkYsSUFBSSxDQUFDSixVQUExQjtBQUNILFNBRkQsTUFFTyxJQUFJSSxJQUFJLENBQUNHLFdBQUwsS0FBcUJGLFNBQXpCLEVBQW9DO0FBQ3ZDLGVBQUtFLFdBQUwsQ0FBaUJELElBQWpCLENBQXNCRixJQUFJLENBQUNHLFdBQTNCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJR3JhYn0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L01vZGVzL0lHcmFiXCI7XG5pbXBvcnQge0lHcmFiTGluZUxpbmtlZH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L01vZGVzL0lHcmFiTGluZUxpbmtlZFwiO1xuaW1wb3J0IHtHcmFiTGluZUxpbmtlZH0gZnJvbSBcIi4vR3JhYkxpbmVMaW5rZWRcIjtcbmltcG9ydCB7TWVzc2FnZXN9IGZyb20gXCIuLi8uLi8uLi9VdGlscy9NZXNzYWdlc1wiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgR3JhYiBpbXBsZW1lbnRzIElHcmFiIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyBsaW5lTGlua2VkXG4gICAgICovXG4gICAgcHVibGljIGdldCBsaW5lX2xpbmtlZCgpOiBJR3JhYkxpbmVMaW5rZWQge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwiaW50ZXJhY3Rpdml0eS5tb2Rlcy5ncmFiLmxpbmVfbGlua2VkXCIsIFwiaW50ZXJhY3Rpdml0eS5tb2Rlcy5ncmFiLmxpbmVMaW5rZWRcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubGluZUxpbmtlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyBsaW5lTGlua2VkXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHNldCBsaW5lX2xpbmtlZCh2YWx1ZTogSUdyYWJMaW5lTGlua2VkKSB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJpbnRlcmFjdGl2aXR5Lm1vZGVzLmdyYWIubGluZV9saW5rZWRcIiwgXCJpbnRlcmFjdGl2aXR5Lm1vZGVzLmdyYWIubGluZUxpbmtlZFwiKTtcblxuICAgICAgICB0aGlzLmxpbmVMaW5rZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzdGFuY2U6IG51bWJlcjtcbiAgICBwdWJsaWMgbGluZUxpbmtlZDogSUdyYWJMaW5lTGlua2VkO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSAxMDA7XG4gICAgICAgIHRoaXMubGluZUxpbmtlZCA9IG5ldyBHcmFiTGluZUxpbmtlZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElHcmFiPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5kaXN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGRhdGEuZGlzdGFuY2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVMaW5rZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluZUxpbmtlZC5sb2FkKGRhdGEubGluZUxpbmtlZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGluZV9saW5rZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluZV9saW5rZWQubG9hZChkYXRhLmxpbmVfbGlua2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==