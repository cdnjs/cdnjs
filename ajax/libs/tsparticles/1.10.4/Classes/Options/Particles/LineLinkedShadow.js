"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineLinkedShadow = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var LineLinkedShadow = /*#__PURE__*/function () {
  function LineLinkedShadow() {
    (0, _classCallCheck2["default"])(this, LineLinkedShadow);
    this.blur = void 0;
    this.color = void 0;
    this.enable = void 0;
    this.blur = 5;
    this.color = "lime";
    this.enable = false;
  }

  (0, _createClass2["default"])(LineLinkedShadow, [{
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
      }
    }
  }]);
  return LineLinkedShadow;
}();

exports.LineLinkedShadow = LineLinkedShadow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL0xpbmVMaW5rZWRTaGFkb3cudHMiXSwibmFtZXMiOlsiTGluZUxpbmtlZFNoYWRvdyIsImJsdXIiLCJjb2xvciIsImVuYWJsZSIsImRhdGEiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFHYUEsZ0I7QUFLVCw4QkFBYztBQUFBO0FBQUEsU0FKUEMsSUFJTztBQUFBLFNBSFBDLEtBR087QUFBQSxTQUZQQyxNQUVPO0FBQ1YsU0FBS0YsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWEsTUFBYjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxLQUFkO0FBQ0g7Ozs7eUJBRVdDLEksRUFBa0Q7QUFDMUQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0gsSUFBTCxLQUFjSSxTQUFsQixFQUE2QjtBQUN6QixlQUFLSixJQUFMLEdBQVlHLElBQUksQ0FBQ0gsSUFBakI7QUFDSDs7QUFFRCxZQUFJRyxJQUFJLENBQUNGLEtBQUwsS0FBZUcsU0FBbkIsRUFBOEI7QUFDMUIsZUFBS0gsS0FBTCxHQUFhRSxJQUFJLENBQUNGLEtBQWxCO0FBQ0g7O0FBRUQsWUFBSUUsSUFBSSxDQUFDRCxNQUFMLEtBQWdCRSxTQUFwQixFQUErQjtBQUMzQixlQUFLRixNQUFMLEdBQWNDLElBQUksQ0FBQ0QsTUFBbkI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lMaW5lTGlua2VkU2hhZG93fSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9JTGluZUxpbmtlZFNoYWRvd1wiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgTGluZUxpbmtlZFNoYWRvdyBpbXBsZW1lbnRzIElMaW5lTGlua2VkU2hhZG93IHtcbiAgICBwdWJsaWMgYmx1cjogbnVtYmVyO1xuICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nO1xuICAgIHB1YmxpYyBlbmFibGU6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ibHVyID0gNTtcbiAgICAgICAgdGhpcy5jb2xvciA9IFwibGltZVwiO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElMaW5lTGlua2VkU2hhZG93Pik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5ibHVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsdXIgPSBkYXRhLmJsdXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmNvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuZW5hYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19