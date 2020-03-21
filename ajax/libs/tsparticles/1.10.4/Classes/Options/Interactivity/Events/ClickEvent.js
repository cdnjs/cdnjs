"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickEvent = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ClickMode = require("../../../../Enums/Modes/ClickMode");

var ClickEvent = /*#__PURE__*/function () {
  function ClickEvent() {
    (0, _classCallCheck2["default"])(this, ClickEvent);
    this.enable = void 0;
    this.mode = void 0;
    this.enable = true;
    this.mode = _ClickMode.ClickMode.push;
  }

  (0, _createClass2["default"])(ClickEvent, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.mode !== undefined) {
          this.mode = data.mode;
        }
      }
    }
  }]);
  return ClickEvent;
}();

exports.ClickEvent = ClickEvent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9FdmVudHMvQ2xpY2tFdmVudC50cyJdLCJuYW1lcyI6WyJDbGlja0V2ZW50IiwiZW5hYmxlIiwibW9kZSIsIkNsaWNrTW9kZSIsInB1c2giLCJkYXRhIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBR2FBLFU7QUFJVCx3QkFBYztBQUFBO0FBQUEsU0FIUEMsTUFHTztBQUFBLFNBRlBDLElBRU87QUFDVixTQUFLRCxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLElBQUwsR0FBWUMscUJBQVVDLElBQXRCO0FBQ0g7Ozs7eUJBRVdDLEksRUFBNEM7QUFDcEQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0osTUFBTCxLQUFnQkssU0FBcEIsRUFBK0I7QUFDM0IsZUFBS0wsTUFBTCxHQUFjSSxJQUFJLENBQUNKLE1BQW5CO0FBQ0g7O0FBRUQsWUFBSUksSUFBSSxDQUFDSCxJQUFMLEtBQWNJLFNBQWxCLEVBQTZCO0FBQ3pCLGVBQUtKLElBQUwsR0FBWUcsSUFBSSxDQUFDSCxJQUFqQjtBQUNIO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUNsaWNrRXZlbnR9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSUNsaWNrRXZlbnRcIjtcbmltcG9ydCB7Q2xpY2tNb2RlfSBmcm9tIFwiLi4vLi4vLi4vLi4vRW51bXMvTW9kZXMvQ2xpY2tNb2RlXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBDbGlja0V2ZW50IGltcGxlbWVudHMgSUNsaWNrRXZlbnQge1xuICAgIHB1YmxpYyBlbmFibGU6IGJvb2xlYW47XG4gICAgcHVibGljIG1vZGU6IENsaWNrTW9kZSB8IENsaWNrTW9kZVtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tb2RlID0gQ2xpY2tNb2RlLnB1c2g7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SUNsaWNrRXZlbnQ+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEubW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gZGF0YS5tb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19