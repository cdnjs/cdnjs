"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineLinked = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _LineLinkedShadow = require("./LineLinkedShadow");

var LineLinked = /*#__PURE__*/function () {
  function LineLinked() {
    (0, _classCallCheck2["default"])(this, LineLinked);
    this.blink = void 0;
    this.color = void 0;
    this.consent = void 0;
    this.distance = void 0;
    this.enable = void 0;
    this.opacity = void 0;
    this.shadow = void 0;
    this.width = void 0;
    this.blink = false;
    this.color = "#fff";
    this.consent = false;
    this.distance = 100;
    this.enable = true;
    this.opacity = 1;
    this.shadow = new _LineLinkedShadow.LineLinkedShadow();
    this.width = 1;
  }

  (0, _createClass2["default"])(LineLinked, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.blink !== undefined) {
          this.blink = data.blink;
        }

        if (data.color !== undefined) {
          this.color = data.color;
        }

        if (data.consent !== undefined) {
          this.consent = data.consent;
        }

        if (data.distance !== undefined) {
          this.distance = data.distance;
        }

        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }

        this.shadow.load(data.shadow);

        if (data.width !== undefined) {
          this.width = data.width;
        }
      }
    }
  }]);
  return LineLinked;
}();

exports.LineLinked = LineLinked;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL0xpbmVMaW5rZWQudHMiXSwibmFtZXMiOlsiTGluZUxpbmtlZCIsImJsaW5rIiwiY29sb3IiLCJjb25zZW50IiwiZGlzdGFuY2UiLCJlbmFibGUiLCJvcGFjaXR5Iiwic2hhZG93Iiwid2lkdGgiLCJMaW5lTGlua2VkU2hhZG93IiwiZGF0YSIsInVuZGVmaW5lZCIsImxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQTs7SUFHYUEsVTtBQVVULHdCQUFjO0FBQUE7QUFBQSxTQVRQQyxLQVNPO0FBQUEsU0FSUEMsS0FRTztBQUFBLFNBUFBDLE9BT087QUFBQSxTQU5QQyxRQU1PO0FBQUEsU0FMUEMsTUFLTztBQUFBLFNBSlBDLE9BSU87QUFBQSxTQUhQQyxNQUdPO0FBQUEsU0FGUEMsS0FFTztBQUNWLFNBQUtQLEtBQUwsR0FBYSxLQUFiO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLE1BQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsR0FBaEI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLElBQUlFLGtDQUFKLEVBQWQ7QUFDQSxTQUFLRCxLQUFMLEdBQWEsQ0FBYjtBQUNIOzs7O3lCQUVXRSxJLEVBQTRDO0FBQ3BELFVBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUNwQixZQUFJRCxJQUFJLENBQUNULEtBQUwsS0FBZVUsU0FBbkIsRUFBOEI7QUFDMUIsZUFBS1YsS0FBTCxHQUFhUyxJQUFJLENBQUNULEtBQWxCO0FBQ0g7O0FBRUQsWUFBSVMsSUFBSSxDQUFDUixLQUFMLEtBQWVTLFNBQW5CLEVBQThCO0FBQzFCLGVBQUtULEtBQUwsR0FBYVEsSUFBSSxDQUFDUixLQUFsQjtBQUNIOztBQUVELFlBQUlRLElBQUksQ0FBQ1AsT0FBTCxLQUFpQlEsU0FBckIsRUFBZ0M7QUFDNUIsZUFBS1IsT0FBTCxHQUFlTyxJQUFJLENBQUNQLE9BQXBCO0FBQ0g7O0FBRUQsWUFBSU8sSUFBSSxDQUFDTixRQUFMLEtBQWtCTyxTQUF0QixFQUFpQztBQUM3QixlQUFLUCxRQUFMLEdBQWdCTSxJQUFJLENBQUNOLFFBQXJCO0FBQ0g7O0FBRUQsWUFBSU0sSUFBSSxDQUFDTCxNQUFMLEtBQWdCTSxTQUFwQixFQUErQjtBQUMzQixlQUFLTixNQUFMLEdBQWNLLElBQUksQ0FBQ0wsTUFBbkI7QUFDSDs7QUFFRCxZQUFJSyxJQUFJLENBQUNKLE9BQUwsS0FBaUJLLFNBQXJCLEVBQWdDO0FBQzVCLGVBQUtMLE9BQUwsR0FBZUksSUFBSSxDQUFDSixPQUFwQjtBQUNIOztBQUVELGFBQUtDLE1BQUwsQ0FBWUssSUFBWixDQUFpQkYsSUFBSSxDQUFDSCxNQUF0Qjs7QUFFQSxZQUFJRyxJQUFJLENBQUNGLEtBQUwsS0FBZUcsU0FBbkIsRUFBOEI7QUFDMUIsZUFBS0gsS0FBTCxHQUFhRSxJQUFJLENBQUNGLEtBQWxCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJTGluZUxpbmtlZH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvSUxpbmVMaW5rZWRcIjtcbmltcG9ydCB7SUxpbmVMaW5rZWRTaGFkb3d9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lMaW5lTGlua2VkU2hhZG93XCI7XG5pbXBvcnQge0xpbmVMaW5rZWRTaGFkb3d9IGZyb20gXCIuL0xpbmVMaW5rZWRTaGFkb3dcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIExpbmVMaW5rZWQgaW1wbGVtZW50cyBJTGluZUxpbmtlZCB7XG4gICAgcHVibGljIGJsaW5rOiBib29sZWFuO1xuICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nO1xuICAgIHB1YmxpYyBjb25zZW50OiBib29sZWFuO1xuICAgIHB1YmxpYyBkaXN0YW5jZTogbnVtYmVyO1xuICAgIHB1YmxpYyBlbmFibGU6IGJvb2xlYW47XG4gICAgcHVibGljIG9wYWNpdHk6IG51bWJlcjtcbiAgICBwdWJsaWMgc2hhZG93OiBJTGluZUxpbmtlZFNoYWRvdztcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJsaW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiNmZmZcIjtcbiAgICAgICAgdGhpcy5jb25zZW50ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSAxMDA7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gMTtcbiAgICAgICAgdGhpcy5zaGFkb3cgPSBuZXcgTGluZUxpbmtlZFNoYWRvdygpO1xuICAgICAgICB0aGlzLndpZHRoID0gMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChkYXRhPzogUmVjdXJzaXZlUGFydGlhbDxJTGluZUxpbmtlZD4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGRhdGEuYmxpbmsgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmsgPSBkYXRhLmJsaW5rO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5jb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmNvbnNlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uc2VudCA9IGRhdGEuY29uc2VudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuZGlzdGFuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBkYXRhLmRpc3RhbmNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3BhY2l0eSA9IGRhdGEub3BhY2l0eTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaGFkb3cubG9hZChkYXRhLnNoYWRvdyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLndpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoID0gZGF0YS53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==