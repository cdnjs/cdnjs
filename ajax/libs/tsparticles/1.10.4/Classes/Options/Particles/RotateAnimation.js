"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotateAnimation = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RotateAnimation = /*#__PURE__*/function () {
  function RotateAnimation() {
    (0, _classCallCheck2["default"])(this, RotateAnimation);
    this.enable = void 0;
    this.speed = void 0;
    this.sync = void 0;
    this.enable = false;
    this.speed = 0;
    this.sync = false;
  }

  (0, _createClass2["default"])(RotateAnimation, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.speed !== undefined) {
          this.speed = data.speed;
        }

        if (data.sync !== undefined) {
          this.sync = data.sync;
        }
      }
    }
  }]);
  return RotateAnimation;
}();

exports.RotateAnimation = RotateAnimation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1JvdGF0ZUFuaW1hdGlvbi50cyJdLCJuYW1lcyI6WyJSb3RhdGVBbmltYXRpb24iLCJlbmFibGUiLCJzcGVlZCIsInN5bmMiLCJkYXRhIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBR2FBLGU7QUFLVCw2QkFBYztBQUFBO0FBQUEsU0FKUEMsTUFJTztBQUFBLFNBSFBDLEtBR087QUFBQSxTQUZQQyxJQUVPO0FBQ1YsU0FBS0YsTUFBTCxHQUFjLEtBQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLElBQUwsR0FBWSxLQUFaO0FBQ0g7Ozs7eUJBRVdDLEksRUFBaUQ7QUFDekQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0gsTUFBTCxLQUFnQkksU0FBcEIsRUFBK0I7QUFDM0IsZUFBS0osTUFBTCxHQUFjRyxJQUFJLENBQUNILE1BQW5CO0FBQ0g7O0FBRUQsWUFBSUcsSUFBSSxDQUFDRixLQUFMLEtBQWVHLFNBQW5CLEVBQThCO0FBQzFCLGVBQUtILEtBQUwsR0FBYUUsSUFBSSxDQUFDRixLQUFsQjtBQUNIOztBQUVELFlBQUlFLElBQUksQ0FBQ0QsSUFBTCxLQUFjRSxTQUFsQixFQUE2QjtBQUN6QixlQUFLRixJQUFMLEdBQVlDLElBQUksQ0FBQ0QsSUFBakI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lSb3RhdGVBbmltYXRpb259IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lSb3RhdGVBbmltYXRpb25cIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIFJvdGF0ZUFuaW1hdGlvbiBpbXBsZW1lbnRzIElSb3RhdGVBbmltYXRpb24ge1xuICAgIHB1YmxpYyBlbmFibGU6IGJvb2xlYW47XG4gICAgcHVibGljIHNwZWVkOiBudW1iZXI7XG4gICAgcHVibGljIHN5bmM6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuc3luYyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElSb3RhdGVBbmltYXRpb24+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuc3BlZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBkYXRhLnNwZWVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5zeW5jICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmMgPSBkYXRhLnN5bmM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=