"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundMask = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var BackgroundMask = /*#__PURE__*/function () {
  function BackgroundMask() {
    (0, _classCallCheck2["default"])(this, BackgroundMask);
    this.cover = void 0;
    this.enable = void 0;
    this.enable = false;
  }

  (0, _createClass2["default"])(BackgroundMask, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.cover !== undefined) {
          this.cover = data.cover;
        }

        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
      }
    }
  }]);
  return BackgroundMask;
}();

exports.BackgroundMask = BackgroundMask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvQmFja2dyb3VuZE1hc2svQmFja2dyb3VuZE1hc2sudHMiXSwibmFtZXMiOlsiQmFja2dyb3VuZE1hc2siLCJjb3ZlciIsImVuYWJsZSIsImRhdGEiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFJYUEsYztBQUlULDRCQUFjO0FBQUE7QUFBQSxTQUhQQyxLQUdPO0FBQUEsU0FGUEMsTUFFTztBQUNWLFNBQUtBLE1BQUwsR0FBYyxLQUFkO0FBQ0g7Ozs7eUJBRVdDLEksRUFBZ0Q7QUFDeEQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0YsS0FBTCxLQUFlRyxTQUFuQixFQUE4QjtBQUMxQixlQUFLSCxLQUFMLEdBQWFFLElBQUksQ0FBQ0YsS0FBbEI7QUFDSDs7QUFFRCxZQUFJRSxJQUFJLENBQUNELE1BQUwsS0FBZ0JFLFNBQXBCLEVBQStCO0FBQzNCLGVBQUtGLE1BQUwsR0FBY0MsSUFBSSxDQUFDRCxNQUFuQjtBQUNIO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUJhY2tncm91bmRNYXNrfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL0JhY2tncm91bmRNYXNrL0lCYWNrZ3JvdW5kTWFza1wiO1xuaW1wb3J0IHtJUGFydGljbGVzQ29sb3J9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lQYXJ0aWNsZXNDb2xvclwiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZE1hc2sgaW1wbGVtZW50cyBJQmFja2dyb3VuZE1hc2sge1xuICAgIHB1YmxpYyBjb3Zlcj86IElQYXJ0aWNsZXNDb2xvcjtcbiAgICBwdWJsaWMgZW5hYmxlOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SUJhY2tncm91bmRNYXNrPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5jb3ZlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3ZlciA9IGRhdGEuY292ZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==