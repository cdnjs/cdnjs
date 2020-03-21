"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrabLineLinked = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var GrabLineLinked = /*#__PURE__*/function () {
  function GrabLineLinked() {
    (0, _classCallCheck2["default"])(this, GrabLineLinked);
    this.opacity = void 0;
    this.opacity = 1;
  }

  (0, _createClass2["default"])(GrabLineLinked, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
      }
    }
  }]);
  return GrabLineLinked;
}();

exports.GrabLineLinked = GrabLineLinked;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9HcmFiTGluZUxpbmtlZC50cyJdLCJuYW1lcyI6WyJHcmFiTGluZUxpbmtlZCIsIm9wYWNpdHkiLCJkYXRhIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBR2FBLGM7QUFHVCw0QkFBYztBQUFBO0FBQUEsU0FGUEMsT0FFTztBQUNWLFNBQUtBLE9BQUwsR0FBZSxDQUFmO0FBQ0g7Ozs7eUJBRVdDLEksRUFBZ0Q7QUFDeEQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0QsT0FBTCxLQUFpQkUsU0FBckIsRUFBZ0M7QUFDNUIsZUFBS0YsT0FBTCxHQUFlQyxJQUFJLENBQUNELE9BQXBCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJR3JhYkxpbmVMaW5rZWR9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JR3JhYkxpbmVMaW5rZWRcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIEdyYWJMaW5lTGlua2VkIGltcGxlbWVudHMgSUdyYWJMaW5lTGlua2VkIHtcbiAgICBwdWJsaWMgb3BhY2l0eTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SUdyYWJMaW5lTGlua2VkPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5vcGFjaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wYWNpdHkgPSBkYXRhLm9wYWNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=