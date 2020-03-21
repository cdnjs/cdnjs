"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolygonMaskDrawStroke = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var PolygonMaskDrawStroke = /*#__PURE__*/function () {
  function PolygonMaskDrawStroke() {
    (0, _classCallCheck2["default"])(this, PolygonMaskDrawStroke);
    this.color = void 0;
    this.width = void 0;
    this.color = "#ffffff";
    this.width = 0.5;
  }

  (0, _createClass2["default"])(PolygonMaskDrawStroke, [{
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
  return PolygonMaskDrawStroke;
}();

exports.PolygonMaskDrawStroke = PolygonMaskDrawStroke;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUG9seWdvbk1hc2svUG9seWdvbk1hc2tEcmF3U3Ryb2tlLnRzIl0sIm5hbWVzIjpbIlBvbHlnb25NYXNrRHJhd1N0cm9rZSIsImNvbG9yIiwid2lkdGgiLCJkYXRhIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBR2FBLHFCO0FBSVQsbUNBQWM7QUFBQTtBQUFBLFNBSFBDLEtBR087QUFBQSxTQUZQQyxLQUVPO0FBQ1YsU0FBS0QsS0FBTCxHQUFhLFNBQWI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsR0FBYjtBQUNIOzs7O3lCQUVXQyxJLEVBQXVEO0FBQy9ELFVBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUNwQixZQUFJRCxJQUFJLENBQUNGLEtBQUwsS0FBZUcsU0FBbkIsRUFBOEI7QUFDMUIsZUFBS0gsS0FBTCxHQUFhRSxJQUFJLENBQUNGLEtBQWxCO0FBQ0g7O0FBRUQsWUFBSUUsSUFBSSxDQUFDRCxLQUFMLEtBQWVFLFNBQW5CLEVBQThCO0FBQzFCLGVBQUtGLEtBQUwsR0FBYUMsSUFBSSxDQUFDRCxLQUFsQjtBQUNIO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVBvbHlnb25NYXNrRHJhd1N0cm9rZX0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9Qb2x5Z29uTWFzay9JUG9seWdvbk1hc2tEcmF3U3Ryb2tlXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBQb2x5Z29uTWFza0RyYXdTdHJva2UgaW1wbGVtZW50cyBJUG9seWdvbk1hc2tEcmF3U3Ryb2tlIHtcbiAgICBwdWJsaWMgY29sb3I6IHN0cmluZztcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIHRoaXMud2lkdGggPSAwLjU7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SVBvbHlnb25NYXNrRHJhd1N0cm9rZT4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGRhdGEuY29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS53aWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=