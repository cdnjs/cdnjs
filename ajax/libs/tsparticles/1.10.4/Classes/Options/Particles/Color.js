"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Color = /*#__PURE__*/function () {
  function Color() {
    (0, _classCallCheck2["default"])(this, Color);
    this.value = void 0;
    this.value = "#fff";
  }

  (0, _createClass2["default"])(Color, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.value !== undefined) {
          this.value = data.value;
        }
      }
    }
  }]);
  return Color;
}();

exports.Color = Color;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL0NvbG9yLnRzIl0sIm5hbWVzIjpbIkNvbG9yIiwidmFsdWUiLCJkYXRhIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBSWFBLEs7QUFHVCxtQkFBYztBQUFBO0FBQUEsU0FGUEMsS0FFTztBQUNWLFNBQUtBLEtBQUwsR0FBYSxNQUFiO0FBQ0g7Ozs7eUJBRVdDLEksRUFBZ0Q7QUFDeEQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0QsS0FBTCxLQUFlRSxTQUFuQixFQUE4QjtBQUMxQixlQUFLRixLQUFMLEdBQWFDLElBQUksQ0FBQ0QsS0FBbEI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lQYXJ0aWNsZXNDb2xvcn0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvSVBhcnRpY2xlc0NvbG9yXCI7XG5pbXBvcnQge0lDb2xvcn0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvSUNvbG9yXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBDb2xvciBpbXBsZW1lbnRzIElQYXJ0aWNsZXNDb2xvciB7XG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmcgfCBJQ29sb3IgfCBzdHJpbmdbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gXCIjZmZmXCI7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SVBhcnRpY2xlc0NvbG9yPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=