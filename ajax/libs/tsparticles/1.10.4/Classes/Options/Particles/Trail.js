"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trail = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Trail = /*#__PURE__*/function () {
  function Trail() {
    (0, _classCallCheck2["default"])(this, Trail);
    this.enable = void 0;
    this.length = void 0;
    this.fillColor = void 0;
    this.enable = false;
    this.length = 10;
    this.fillColor = "#000000";
  }

  (0, _createClass2["default"])(Trail, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.fillColor !== undefined) {
          this.fillColor = data.fillColor;
        }

        if (data.length !== undefined) {
          this.length = data.length;
        }
      }
    }
  }]);
  return Trail;
}();

exports.Trail = Trail;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1RyYWlsLnRzIl0sIm5hbWVzIjpbIlRyYWlsIiwiZW5hYmxlIiwibGVuZ3RoIiwiZmlsbENvbG9yIiwiZGF0YSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUdhQSxLO0FBS1QsbUJBQWM7QUFBQTtBQUFBLFNBSlBDLE1BSU87QUFBQSxTQUhQQyxNQUdPO0FBQUEsU0FGUEMsU0FFTztBQUNWLFNBQUtGLE1BQUwsR0FBYyxLQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0g7Ozs7eUJBRVdDLEksRUFBdUM7QUFDL0MsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0gsTUFBTCxLQUFnQkksU0FBcEIsRUFBK0I7QUFDM0IsZUFBS0osTUFBTCxHQUFjRyxJQUFJLENBQUNILE1BQW5CO0FBQ0g7O0FBRUQsWUFBSUcsSUFBSSxDQUFDRCxTQUFMLEtBQW1CRSxTQUF2QixFQUFrQztBQUM5QixlQUFLRixTQUFMLEdBQWlCQyxJQUFJLENBQUNELFNBQXRCO0FBQ0g7O0FBRUQsWUFBSUMsSUFBSSxDQUFDRixNQUFMLEtBQWdCRyxTQUFwQixFQUErQjtBQUMzQixlQUFLSCxNQUFMLEdBQWNFLElBQUksQ0FBQ0YsTUFBbkI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lUcmFpbH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvSVRyYWlsXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBUcmFpbCBpbXBsZW1lbnRzIElUcmFpbCB7XG4gICAgcHVibGljIGVuYWJsZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XG4gICAgcHVibGljIGZpbGxDb2xvcjogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMTA7XG4gICAgICAgIHRoaXMuZmlsbENvbG9yID0gXCIjMDAwMDAwXCI7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SVRyYWlsPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGxDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxsQ29sb3IgPSBkYXRhLmZpbGxDb2xvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19