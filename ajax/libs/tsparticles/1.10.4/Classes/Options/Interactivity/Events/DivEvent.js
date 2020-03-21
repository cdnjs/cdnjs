"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DivEvent = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _DivMode = require("../../../../Enums/Modes/DivMode");

var _Messages = require("../../../Utils/Messages");

var DivEvent = /*#__PURE__*/function () {
  (0, _createClass2["default"])(DivEvent, [{
    key: "el",

    /**
     *
     * @deprecated this property is obsolete, please use the new elementId
     */
    get: function get() {
      _Messages.Messages.deprecated("interactivity.events.onDiv.detect_on", "interactivity.events.onDiv.detectsOn");

      return this.elementId;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new elementId
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("interactivity.events.onDiv.detect_on", "interactivity.events.onDiv.detectsOn");

      this.elementId = value;
    }
  }]);

  function DivEvent() {
    (0, _classCallCheck2["default"])(this, DivEvent);
    this.elementId = void 0;
    this.enable = void 0;
    this.mode = void 0;
    this.elementId = "repulse-div";
    this.enable = false;
    this.mode = _DivMode.DivMode.repulse;
  }

  (0, _createClass2["default"])(DivEvent, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.elementId !== undefined) {
          this.elementId = data.elementId;
        } else if (data.el !== undefined) {
          this.el = data.el;
        }

        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.mode !== undefined) {
          this.mode = data.mode;
        }
      }
    }
  }]);
  return DivEvent;
}();

exports.DivEvent = DivEvent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9FdmVudHMvRGl2RXZlbnQudHMiXSwibmFtZXMiOlsiRGl2RXZlbnQiLCJNZXNzYWdlcyIsImRlcHJlY2F0ZWQiLCJlbGVtZW50SWQiLCJ2YWx1ZSIsImVuYWJsZSIsIm1vZGUiLCJEaXZNb2RlIiwicmVwdWxzZSIsImRhdGEiLCJ1bmRlZmluZWQiLCJlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztJQUdhQSxROzs7O0FBQ1Q7Ozs7d0JBSXdCO0FBQ3BCQyx5QkFBU0MsVUFBVCxDQUFvQixzQ0FBcEIsRUFBNEQsc0NBQTVEOztBQUVBLGFBQU8sS0FBS0MsU0FBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLY0MsSyxFQUFlO0FBQ3pCSCx5QkFBU0MsVUFBVCxDQUFvQixzQ0FBcEIsRUFBNEQsc0NBQTVEOztBQUVBLFdBQUtDLFNBQUwsR0FBaUJDLEtBQWpCO0FBQ0g7OztBQU1ELHNCQUFjO0FBQUE7QUFBQSxTQUpQRCxTQUlPO0FBQUEsU0FIUEUsTUFHTztBQUFBLFNBRlBDLElBRU87QUFDVixTQUFLSCxTQUFMLEdBQWlCLGFBQWpCO0FBQ0EsU0FBS0UsTUFBTCxHQUFjLEtBQWQ7QUFDQSxTQUFLQyxJQUFMLEdBQVlDLGlCQUFRQyxPQUFwQjtBQUNIOzs7O3lCQUVXQyxJLEVBQTBDO0FBQ2xELFVBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUNwQixZQUFJRCxJQUFJLENBQUNOLFNBQUwsS0FBbUJPLFNBQXZCLEVBQWtDO0FBQzlCLGVBQUtQLFNBQUwsR0FBaUJNLElBQUksQ0FBQ04sU0FBdEI7QUFDSCxTQUZELE1BRU8sSUFBSU0sSUFBSSxDQUFDRSxFQUFMLEtBQVlELFNBQWhCLEVBQTJCO0FBQzlCLGVBQUtDLEVBQUwsR0FBVUYsSUFBSSxDQUFDRSxFQUFmO0FBQ0g7O0FBRUQsWUFBSUYsSUFBSSxDQUFDSixNQUFMLEtBQWdCSyxTQUFwQixFQUErQjtBQUMzQixlQUFLTCxNQUFMLEdBQWNJLElBQUksQ0FBQ0osTUFBbkI7QUFDSDs7QUFFRCxZQUFJSSxJQUFJLENBQUNILElBQUwsS0FBY0ksU0FBbEIsRUFBNkI7QUFDekIsZUFBS0osSUFBTCxHQUFZRyxJQUFJLENBQUNILElBQWpCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJRGl2RXZlbnR9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSURpdkV2ZW50XCI7XG5pbXBvcnQge0Rpdk1vZGV9IGZyb20gXCIuLi8uLi8uLi8uLi9FbnVtcy9Nb2Rlcy9EaXZNb2RlXCI7XG5pbXBvcnQge01lc3NhZ2VzfSBmcm9tIFwiLi4vLi4vLi4vVXRpbHMvTWVzc2FnZXNcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIERpdkV2ZW50IGltcGxlbWVudHMgSURpdkV2ZW50IHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyBlbGVtZW50SWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGVsKCk6IHN0cmluZyB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJpbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkRpdi5kZXRlY3Rfb25cIiwgXCJpbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkRpdi5kZXRlY3RzT25cIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudElkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGVsZW1lbnRJZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgZWwodmFsdWU6IHN0cmluZykge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwiaW50ZXJhY3Rpdml0eS5ldmVudHMub25EaXYuZGV0ZWN0X29uXCIsIFwiaW50ZXJhY3Rpdml0eS5ldmVudHMub25EaXYuZGV0ZWN0c09uXCIpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudElkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGVsZW1lbnRJZDogc3RyaW5nO1xuICAgIHB1YmxpYyBlbmFibGU6IGJvb2xlYW47XG4gICAgcHVibGljIG1vZGU6IERpdk1vZGUgfCBEaXZNb2RlW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50SWQgPSBcInJlcHVsc2UtZGl2XCI7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW9kZSA9IERpdk1vZGUucmVwdWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChkYXRhPzogUmVjdXJzaXZlUGFydGlhbDxJRGl2RXZlbnQ+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmVsZW1lbnRJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50SWQgPSBkYXRhLmVsZW1lbnRJZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5lbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbCA9IGRhdGEuZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEubW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gZGF0YS5tb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19