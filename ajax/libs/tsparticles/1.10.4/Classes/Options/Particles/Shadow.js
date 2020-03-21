"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shadow = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Shadow = /*#__PURE__*/function () {
  function Shadow() {
    (0, _classCallCheck2["default"])(this, Shadow);
    this.blur = void 0;
    this.color = void 0;
    this.enable = void 0;
    this.offset = void 0;
    this.blur = 0;
    this.color = "#000000";
    this.enable = false;
    this.offset = {
      x: 0,
      y: 0
    };
  }

  (0, _createClass2["default"])(Shadow, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.blur !== undefined) {
          this.blur = data.blur;
        }

        if (data.color !== undefined) {
          this.color = data.color;
        }

        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.offset !== undefined) {
          if (data.offset.x !== undefined) {
            this.offset.x = data.offset.x;
          }

          if (data.offset.y !== undefined) {
            this.offset.y = data.offset.y;
          }
        }
      }
    }
  }]);
  return Shadow;
}();

exports.Shadow = Shadow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1NoYWRvdy50cyJdLCJuYW1lcyI6WyJTaGFkb3ciLCJibHVyIiwiY29sb3IiLCJlbmFibGUiLCJvZmZzZXQiLCJ4IiwieSIsImRhdGEiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFJYUEsTTtBQU1ULG9CQUFjO0FBQUE7QUFBQSxTQUxQQyxJQUtPO0FBQUEsU0FKUEMsS0FJTztBQUFBLFNBSFBDLE1BR087QUFBQSxTQUZQQyxNQUVPO0FBQ1YsU0FBS0gsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWEsU0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxLQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjO0FBQ1ZDLE1BQUFBLENBQUMsRUFBRSxDQURPO0FBRVZDLE1BQUFBLENBQUMsRUFBRTtBQUZPLEtBQWQ7QUFJSDs7Ozt5QkFFV0MsSSxFQUF3QztBQUNoRCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDTixJQUFMLEtBQWNPLFNBQWxCLEVBQTZCO0FBQ3pCLGVBQUtQLElBQUwsR0FBWU0sSUFBSSxDQUFDTixJQUFqQjtBQUNIOztBQUVELFlBQUlNLElBQUksQ0FBQ0wsS0FBTCxLQUFlTSxTQUFuQixFQUE4QjtBQUMxQixlQUFLTixLQUFMLEdBQWFLLElBQUksQ0FBQ0wsS0FBbEI7QUFDSDs7QUFFRCxZQUFJSyxJQUFJLENBQUNKLE1BQUwsS0FBZ0JLLFNBQXBCLEVBQStCO0FBQzNCLGVBQUtMLE1BQUwsR0FBY0ksSUFBSSxDQUFDSixNQUFuQjtBQUNIOztBQUVELFlBQUlJLElBQUksQ0FBQ0gsTUFBTCxLQUFnQkksU0FBcEIsRUFBK0I7QUFDM0IsY0FBSUQsSUFBSSxDQUFDSCxNQUFMLENBQVlDLENBQVosS0FBa0JHLFNBQXRCLEVBQWlDO0FBQzdCLGlCQUFLSixNQUFMLENBQVlDLENBQVosR0FBZ0JFLElBQUksQ0FBQ0gsTUFBTCxDQUFZQyxDQUE1QjtBQUNIOztBQUVELGNBQUlFLElBQUksQ0FBQ0gsTUFBTCxDQUFZRSxDQUFaLEtBQWtCRSxTQUF0QixFQUFpQztBQUM3QixpQkFBS0osTUFBTCxDQUFZRSxDQUFaLEdBQWdCQyxJQUFJLENBQUNILE1BQUwsQ0FBWUUsQ0FBNUI7QUFDSDtBQUNKO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNoYWRvd30gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvSVNoYWRvd1wiO1xuaW1wb3J0IHtJQ29vcmRpbmF0ZXN9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL0lDb29yZGluYXRlc1wiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgU2hhZG93IGltcGxlbWVudHMgSVNoYWRvdyB7XG4gICAgcHVibGljIGJsdXI6IG51bWJlcjtcbiAgICBwdWJsaWMgY29sb3I6IHN0cmluZztcbiAgICBwdWJsaWMgZW5hYmxlOiBib29sZWFuO1xuICAgIHB1YmxpYyBvZmZzZXQ6IElDb29yZGluYXRlcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJsdXIgPSAwO1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwMDAwXCI7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SVNoYWRvdz4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGRhdGEuYmx1ciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibHVyID0gZGF0YS5ibHVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5jb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEub2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5vZmZzZXQueCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0LnggPSBkYXRhLm9mZnNldC54O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm9mZnNldC55ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQueSA9IGRhdGEub2Zmc2V0Lnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19