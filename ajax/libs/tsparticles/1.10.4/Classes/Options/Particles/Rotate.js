"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rotate = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _RotateAnimation = require("./RotateAnimation");

var _RotateDirection = require("../../../Enums/RotateDirection");

var Rotate = /*#__PURE__*/function () {
  function Rotate() {
    (0, _classCallCheck2["default"])(this, Rotate);
    this.animation = void 0;
    this.direction = void 0;
    this.random = void 0;
    this.value = void 0;
    this.animation = new _RotateAnimation.RotateAnimation();
    this.direction = _RotateDirection.RotateDirection.clockwise;
    this.random = false;
    this.value = 0;
  }

  (0, _createClass2["default"])(Rotate, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        this.animation.load(data.animation);

        if (data.random !== undefined) {
          this.random = data.random;
        }

        if (data.direction !== undefined) {
          this.direction = data.direction;
        }

        if (data.value !== undefined) {
          this.value = data.value;
        }
      }
    }
  }]);
  return Rotate;
}();

exports.Rotate = Rotate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1JvdGF0ZS50cyJdLCJuYW1lcyI6WyJSb3RhdGUiLCJhbmltYXRpb24iLCJkaXJlY3Rpb24iLCJyYW5kb20iLCJ2YWx1ZSIsIlJvdGF0ZUFuaW1hdGlvbiIsIlJvdGF0ZURpcmVjdGlvbiIsImNsb2Nrd2lzZSIsImRhdGEiLCJ1bmRlZmluZWQiLCJsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0lBR2FBLE07QUFNVCxvQkFBYztBQUFBO0FBQUEsU0FMUEMsU0FLTztBQUFBLFNBSlBDLFNBSU87QUFBQSxTQUhQQyxNQUdPO0FBQUEsU0FGUEMsS0FFTztBQUNWLFNBQUtILFNBQUwsR0FBaUIsSUFBSUksZ0NBQUosRUFBakI7QUFDQSxTQUFLSCxTQUFMLEdBQWlCSSxpQ0FBZ0JDLFNBQWpDO0FBQ0EsU0FBS0osTUFBTCxHQUFjLEtBQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNIOzs7O3lCQUVXSSxJLEVBQXdDO0FBQ2hELFVBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUNwQixhQUFLUixTQUFMLENBQWVTLElBQWYsQ0FBb0JGLElBQUksQ0FBQ1AsU0FBekI7O0FBRUEsWUFBSU8sSUFBSSxDQUFDTCxNQUFMLEtBQWdCTSxTQUFwQixFQUErQjtBQUMzQixlQUFLTixNQUFMLEdBQWNLLElBQUksQ0FBQ0wsTUFBbkI7QUFDSDs7QUFFRCxZQUFJSyxJQUFJLENBQUNOLFNBQUwsS0FBbUJPLFNBQXZCLEVBQWtDO0FBQzlCLGVBQUtQLFNBQUwsR0FBaUJNLElBQUksQ0FBQ04sU0FBdEI7QUFDSDs7QUFFRCxZQUFJTSxJQUFJLENBQUNKLEtBQUwsS0FBZUssU0FBbkIsRUFBOEI7QUFDMUIsZUFBS0wsS0FBTCxHQUFhSSxJQUFJLENBQUNKLEtBQWxCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUm90YXRlfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9JUm90YXRlXCI7XG5pbXBvcnQge0lSb3RhdGVBbmltYXRpb259IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lSb3RhdGVBbmltYXRpb25cIjtcbmltcG9ydCB7Um90YXRlQW5pbWF0aW9ufSBmcm9tIFwiLi9Sb3RhdGVBbmltYXRpb25cIjtcbmltcG9ydCB7Um90YXRlRGlyZWN0aW9ufSBmcm9tIFwiLi4vLi4vLi4vRW51bXMvUm90YXRlRGlyZWN0aW9uXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBSb3RhdGUgaW1wbGVtZW50cyBJUm90YXRlIHtcbiAgICBwdWJsaWMgYW5pbWF0aW9uOiBJUm90YXRlQW5pbWF0aW9uO1xuICAgIHB1YmxpYyBkaXJlY3Rpb246IFJvdGF0ZURpcmVjdGlvbjtcbiAgICBwdWJsaWMgcmFuZG9tOiBib29sZWFuO1xuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IFJvdGF0ZUFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IFJvdGF0ZURpcmVjdGlvbi5jbG9ja3dpc2U7XG4gICAgICAgIHRoaXMucmFuZG9tID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmFsdWUgPSAwXG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SVJvdGF0ZT4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ubG9hZChkYXRhLmFuaW1hdGlvbik7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnJhbmRvbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5kb20gPSBkYXRhLnJhbmRvbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuZGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRhdGEuZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=