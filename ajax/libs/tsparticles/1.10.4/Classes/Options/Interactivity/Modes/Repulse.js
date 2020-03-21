"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repulse = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Repulse = /*#__PURE__*/function () {
  function Repulse() {
    (0, _classCallCheck2["default"])(this, Repulse);
    this.distance = void 0;
    this.duration = void 0;
    this.distance = 200;
    this.duration = 0.4;
  }

  (0, _createClass2["default"])(Repulse, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }

        if (data.duration !== undefined) {
          this.duration = data.duration;
        }
      }
    }
  }]);
  return Repulse;
}();

exports.Repulse = Repulse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9SZXB1bHNlLnRzIl0sIm5hbWVzIjpbIlJlcHVsc2UiLCJkaXN0YW5jZSIsImR1cmF0aW9uIiwiZGF0YSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUdhQSxPO0FBSVQscUJBQWM7QUFBQTtBQUFBLFNBSFBDLFFBR087QUFBQSxTQUZQQyxRQUVPO0FBQ1YsU0FBS0QsUUFBTCxHQUFnQixHQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsR0FBaEI7QUFDSDs7Ozt5QkFFV0MsSSxFQUF5QztBQUNqRCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDRixRQUFMLEtBQWtCRyxTQUF0QixFQUFpQztBQUM3QixlQUFLSCxRQUFMLEdBQWdCRSxJQUFJLENBQUNGLFFBQXJCO0FBQ0g7O0FBRUQsWUFBSUUsSUFBSSxDQUFDRCxRQUFMLEtBQWtCRSxTQUF0QixFQUFpQztBQUM3QixlQUFLRixRQUFMLEdBQWdCQyxJQUFJLENBQUNELFFBQXJCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUmVwdWxzZX0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L01vZGVzL0lSZXB1bHNlXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBSZXB1bHNlIGltcGxlbWVudHMgSVJlcHVsc2Uge1xuICAgIHB1YmxpYyBkaXN0YW5jZTogbnVtYmVyO1xuICAgIHB1YmxpYyBkdXJhdGlvbjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSAyMDA7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAwLjQ7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SVJlcHVsc2U+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmRpc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gZGF0YS5kaXN0YW5jZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuZHVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19