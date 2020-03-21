"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bubble = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Bubble = /*#__PURE__*/function () {
  function Bubble() {
    (0, _classCallCheck2["default"])(this, Bubble);
    this.distance = void 0;
    this.duration = void 0;
    this.opacity = void 0;
    this.size = void 0;
    this.distance = 200;
    this.duration = 0.4;
    this.opacity = 1;
    this.size = 80;
  }

  (0, _createClass2["default"])(Bubble, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }

        if (data.duration !== undefined) {
          this.duration = data.duration;
        }

        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }

        if (data.size !== undefined) {
          this.size = data.size;
        }
      }
    }
  }]);
  return Bubble;
}();

exports.Bubble = Bubble;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9CdWJibGUudHMiXSwibmFtZXMiOlsiQnViYmxlIiwiZGlzdGFuY2UiLCJkdXJhdGlvbiIsIm9wYWNpdHkiLCJzaXplIiwiZGF0YSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUdhQSxNO0FBTVQsb0JBQWM7QUFBQTtBQUFBLFNBTFBDLFFBS087QUFBQSxTQUpQQyxRQUlPO0FBQUEsU0FIUEMsT0FHTztBQUFBLFNBRlBDLElBRU87QUFDVixTQUFLSCxRQUFMLEdBQWdCLEdBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixHQUFoQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDSDs7Ozt5QkFFV0MsSSxFQUF3QztBQUNoRCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDSixRQUFMLEtBQWtCSyxTQUF0QixFQUFpQztBQUM3QixlQUFLTCxRQUFMLEdBQWdCSSxJQUFJLENBQUNKLFFBQXJCO0FBQ0g7O0FBRUQsWUFBSUksSUFBSSxDQUFDSCxRQUFMLEtBQWtCSSxTQUF0QixFQUFpQztBQUM3QixlQUFLSixRQUFMLEdBQWdCRyxJQUFJLENBQUNILFFBQXJCO0FBQ0g7O0FBRUQsWUFBSUcsSUFBSSxDQUFDRixPQUFMLEtBQWlCRyxTQUFyQixFQUFnQztBQUM1QixlQUFLSCxPQUFMLEdBQWVFLElBQUksQ0FBQ0YsT0FBcEI7QUFDSDs7QUFFRCxZQUFJRSxJQUFJLENBQUNELElBQUwsS0FBY0UsU0FBbEIsRUFBNkI7QUFDekIsZUFBS0YsSUFBTCxHQUFZQyxJQUFJLENBQUNELElBQWpCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJQnViYmxlfSBmcm9tIFwiLi4vLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL0ludGVyYWN0aXZpdHkvTW9kZXMvSUJ1YmJsZVwiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgQnViYmxlIGltcGxlbWVudHMgSUJ1YmJsZSB7XG4gICAgcHVibGljIGRpc3RhbmNlOiBudW1iZXI7XG4gICAgcHVibGljIGR1cmF0aW9uOiBudW1iZXI7XG4gICAgcHVibGljIG9wYWNpdHk6IG51bWJlcjtcbiAgICBwdWJsaWMgc2l6ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSAyMDA7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAwLjQ7XG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDE7XG4gICAgICAgIHRoaXMuc2l6ZSA9IDgwO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElCdWJibGU+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmRpc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gZGF0YS5kaXN0YW5jZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuZHVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5vcGFjaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wYWNpdHkgPSBkYXRhLm9wYWNpdHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==