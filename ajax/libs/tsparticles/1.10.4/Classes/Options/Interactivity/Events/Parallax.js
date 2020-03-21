"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parallax = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Parallax = /*#__PURE__*/function () {
  function Parallax() {
    (0, _classCallCheck2["default"])(this, Parallax);
    this.enable = void 0;
    this.force = void 0;
    this.smooth = void 0;
    this.enable = false;
    this.force = 2;
    this.smooth = 10;
  }

  (0, _createClass2["default"])(Parallax, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.force !== undefined) {
          this.force = data.force;
        }

        if (data.smooth !== undefined) {
          this.smooth = data.smooth;
        }
      }
    }
  }]);
  return Parallax;
}();

exports.Parallax = Parallax;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9FdmVudHMvUGFyYWxsYXgudHMiXSwibmFtZXMiOlsiUGFyYWxsYXgiLCJlbmFibGUiLCJmb3JjZSIsInNtb290aCIsImRhdGEiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFHYUEsUTtBQUtULHNCQUFjO0FBQUE7QUFBQSxTQUpQQyxNQUlPO0FBQUEsU0FIUEMsS0FHTztBQUFBLFNBRlBDLE1BRU87QUFDVixTQUFLRixNQUFMLEdBQWMsS0FBZDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDSDs7Ozt5QkFFV0MsSSxFQUEwQztBQUNsRCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDSCxNQUFMLEtBQWdCSSxTQUFwQixFQUErQjtBQUMzQixlQUFLSixNQUFMLEdBQWNHLElBQUksQ0FBQ0gsTUFBbkI7QUFDSDs7QUFFRCxZQUFJRyxJQUFJLENBQUNGLEtBQUwsS0FBZUcsU0FBbkIsRUFBOEI7QUFDMUIsZUFBS0gsS0FBTCxHQUFhRSxJQUFJLENBQUNGLEtBQWxCO0FBQ0g7O0FBRUQsWUFBSUUsSUFBSSxDQUFDRCxNQUFMLEtBQWdCRSxTQUFwQixFQUErQjtBQUMzQixlQUFLRixNQUFMLEdBQWNDLElBQUksQ0FBQ0QsTUFBbkI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lQYXJhbGxheH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9JUGFyYWxsYXhcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIFBhcmFsbGF4IGltcGxlbWVudHMgSVBhcmFsbGF4IHtcbiAgICBwdWJsaWMgZW5hYmxlOiBib29sZWFuO1xuICAgIHB1YmxpYyBmb3JjZTogbnVtYmVyO1xuICAgIHB1YmxpYyBzbW9vdGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvcmNlID0gMjtcbiAgICAgICAgdGhpcy5zbW9vdGggPSAxMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChkYXRhPzogUmVjdXJzaXZlUGFydGlhbDxJUGFyYWxsYXg+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuZm9yY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yY2UgPSBkYXRhLmZvcmNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5zbW9vdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc21vb3RoID0gZGF0YS5zbW9vdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=