"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slow = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Slow = /*#__PURE__*/function () {
  function Slow() {
    (0, _classCallCheck2["default"])(this, Slow);
    this.active = void 0;
    this.factor = void 0;
    this.radius = void 0;
    this.active = false;
    this.factor = 1;
    this.radius = 0;
  }

  (0, _createClass2["default"])(Slow, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.active !== undefined) {
          this.active = data.active;
        }

        if (data.factor !== undefined) {
          this.factor = data.factor;
        }

        if (data.radius !== undefined) {
          this.radius = data.radius;
        }
      }
    }
  }]);
  return Slow;
}();

exports.Slow = Slow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9TbG93LnRzIl0sIm5hbWVzIjpbIlNsb3ciLCJhY3RpdmUiLCJmYWN0b3IiLCJyYWRpdXMiLCJkYXRhIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBR2FBLEk7QUFLVCxrQkFBYztBQUFBO0FBQUEsU0FKUEMsTUFJTztBQUFBLFNBSFBDLE1BR087QUFBQSxTQUZQQyxNQUVPO0FBQ1YsU0FBS0YsTUFBTCxHQUFjLEtBQWQ7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0g7Ozs7eUJBRVdDLEksRUFBc0M7QUFDOUMsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0gsTUFBTCxLQUFnQkksU0FBcEIsRUFBK0I7QUFDM0IsZUFBS0osTUFBTCxHQUFjRyxJQUFJLENBQUNILE1BQW5CO0FBQ0g7O0FBRUQsWUFBSUcsSUFBSSxDQUFDRixNQUFMLEtBQWdCRyxTQUFwQixFQUErQjtBQUMzQixlQUFLSCxNQUFMLEdBQWNFLElBQUksQ0FBQ0YsTUFBbkI7QUFDSDs7QUFFRCxZQUFJRSxJQUFJLENBQUNELE1BQUwsS0FBZ0JFLFNBQXBCLEVBQStCO0FBQzNCLGVBQUtGLE1BQUwsR0FBY0MsSUFBSSxDQUFDRCxNQUFuQjtBQUNIO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNsb3d9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JU2xvd1wiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgU2xvdyBpbXBsZW1lbnRzIElTbG93IHtcbiAgICBwdWJsaWMgYWN0aXZlOiBib29sZWFuO1xuICAgIHB1YmxpYyBmYWN0b3I6IG51bWJlcjtcbiAgICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mYWN0b3IgPSAxO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SVNsb3c+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmFjdGl2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBkYXRhLmFjdGl2ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuZmFjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY3RvciA9IGRhdGEuZmFjdG9yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5yYWRpdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaXVzID0gZGF0YS5yYWRpdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=