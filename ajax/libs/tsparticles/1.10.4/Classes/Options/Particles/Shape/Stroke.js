"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stroke = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Stroke = /*#__PURE__*/function () {
  function Stroke() {
    (0, _classCallCheck2["default"])(this, Stroke);
    this.color = void 0;
    this.width = void 0;
    this.color = "#ff0000";
    this.width = 0;
  }

  (0, _createClass2["default"])(Stroke, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.color !== undefined) {
          this.color = data.color;
        }

        if (data.width !== undefined) {
          this.width = data.width;
        }
      }
    }
  }]);
  return Stroke;
}();

exports.Stroke = Stroke;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1NoYXBlL1N0cm9rZS50cyJdLCJuYW1lcyI6WyJTdHJva2UiLCJjb2xvciIsIndpZHRoIiwiZGF0YSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUdhQSxNO0FBSVQsb0JBQWM7QUFBQTtBQUFBLFNBSFBDLEtBR087QUFBQSxTQUZQQyxLQUVPO0FBQ1YsU0FBS0QsS0FBTCxHQUFhLFNBQWI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNIOzs7O3lCQUVXQyxJLEVBQXdDO0FBQ2hELFVBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUNwQixZQUFJRCxJQUFJLENBQUNGLEtBQUwsS0FBZUcsU0FBbkIsRUFBOEI7QUFDMUIsZUFBS0gsS0FBTCxHQUFhRSxJQUFJLENBQUNGLEtBQWxCO0FBQ0g7O0FBRUQsWUFBSUUsSUFBSSxDQUFDRCxLQUFMLEtBQWVFLFNBQW5CLEVBQThCO0FBQzFCLGVBQUtGLEtBQUwsR0FBYUMsSUFBSSxDQUFDRCxLQUFsQjtBQUNIO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVN0cm9rZX0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvU2hhcGUvSVN0cm9rZVwiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgU3Ryb2tlIGltcGxlbWVudHMgSVN0cm9rZSB7XG4gICAgcHVibGljIGNvbG9yOiBzdHJpbmc7XG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiI2ZmMDAwMFwiO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChkYXRhPzogUmVjdXJzaXZlUGFydGlhbDxJU3Ryb2tlPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLndpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoID0gZGF0YS53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==