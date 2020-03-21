"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Opacity = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _OpacityAnimation = require("./OpacityAnimation");

var _Messages = require("../../Utils/Messages");

var Opacity = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Opacity, [{
    key: "anim",

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.opacity.anim", "particles.opacity.animation");

      return this.animation;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.opacity.anim", "particles.opacity.animation");

      this.animation = value;
    }
  }]);

  function Opacity() {
    (0, _classCallCheck2["default"])(this, Opacity);
    this.animation = void 0;
    this.random = void 0;
    this.value = void 0;
    this.animation = new _OpacityAnimation.OpacityAnimation();
    this.random = false;
    this.value = 1;
  }

  (0, _createClass2["default"])(Opacity, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.animation !== undefined) {
          this.animation.load(data.animation);
        } else if (data.anim !== undefined) {
          this.anim.load(data.anim);
        }

        if (data.random !== undefined) {
          this.random = data.random;
        }

        if (data.value !== undefined) {
          this.value = data.value;
        }
      }
    }
  }]);
  return Opacity;
}();

exports.Opacity = Opacity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL09wYWNpdHkudHMiXSwibmFtZXMiOlsiT3BhY2l0eSIsIk1lc3NhZ2VzIiwiZGVwcmVjYXRlZCIsImFuaW1hdGlvbiIsInZhbHVlIiwicmFuZG9tIiwiT3BhY2l0eUFuaW1hdGlvbiIsImRhdGEiLCJ1bmRlZmluZWQiLCJsb2FkIiwiYW5pbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVBOztJQUdhQSxPOzs7O0FBQ1Q7Ozs7d0JBSXFDO0FBQ2pDQyx5QkFBU0MsVUFBVCxDQUFvQix3QkFBcEIsRUFBOEMsNkJBQTlDOztBQUVBLGFBQU8sS0FBS0MsU0FBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLZ0JDLEssRUFBMEI7QUFDdENILHlCQUFTQyxVQUFULENBQW9CLHdCQUFwQixFQUE4Qyw2QkFBOUM7O0FBRUEsV0FBS0MsU0FBTCxHQUFpQkMsS0FBakI7QUFDSDs7O0FBTUQscUJBQWM7QUFBQTtBQUFBLFNBSlBELFNBSU87QUFBQSxTQUhQRSxNQUdPO0FBQUEsU0FGUEQsS0FFTztBQUNWLFNBQUtELFNBQUwsR0FBaUIsSUFBSUcsa0NBQUosRUFBakI7QUFDQSxTQUFLRCxNQUFMLEdBQWMsS0FBZDtBQUNBLFNBQUtELEtBQUwsR0FBYSxDQUFiO0FBQ0g7Ozs7eUJBRVdHLEksRUFBeUM7QUFDakQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0osU0FBTCxLQUFtQkssU0FBdkIsRUFBa0M7QUFDOUIsZUFBS0wsU0FBTCxDQUFlTSxJQUFmLENBQW9CRixJQUFJLENBQUNKLFNBQXpCO0FBQ0gsU0FGRCxNQUVPLElBQUlJLElBQUksQ0FBQ0csSUFBTCxLQUFjRixTQUFsQixFQUE2QjtBQUNoQyxlQUFLRSxJQUFMLENBQVVELElBQVYsQ0FBZUYsSUFBSSxDQUFDRyxJQUFwQjtBQUNIOztBQUVELFlBQUlILElBQUksQ0FBQ0YsTUFBTCxLQUFnQkcsU0FBcEIsRUFBK0I7QUFDM0IsZUFBS0gsTUFBTCxHQUFjRSxJQUFJLENBQUNGLE1BQW5CO0FBQ0g7O0FBRUQsWUFBSUUsSUFBSSxDQUFDSCxLQUFMLEtBQWVJLFNBQW5CLEVBQThCO0FBQzFCLGVBQUtKLEtBQUwsR0FBYUcsSUFBSSxDQUFDSCxLQUFsQjtBQUNIO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SU9wYWNpdHl9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lPcGFjaXR5XCI7XG5pbXBvcnQge09wYWNpdHlBbmltYXRpb259IGZyb20gXCIuL09wYWNpdHlBbmltYXRpb25cIjtcbmltcG9ydCB7SU9wYWNpdHlBbmltYXRpb259IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lPcGFjaXR5QW5pbWF0aW9uXCI7XG5pbXBvcnQge01lc3NhZ2VzfSBmcm9tIFwiLi4vLi4vVXRpbHMvTWVzc2FnZXNcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIE9wYWNpdHkgaW1wbGVtZW50cyBJT3BhY2l0eSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGlzIHByb3BlcnR5IGlzIG9ic29sZXRlLCBwbGVhc2UgdXNlIHRoZSBuZXcgYW5pbWF0aW9uXG4gICAgICovXG4gICAgcHVibGljIGdldCBhbmltKCk6IElPcGFjaXR5QW5pbWF0aW9uIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBhcnRpY2xlcy5vcGFjaXR5LmFuaW1cIiwgXCJwYXJ0aWNsZXMub3BhY2l0eS5hbmltYXRpb25cIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGFuaW1hdGlvblxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgYW5pbSh2YWx1ZTogSU9wYWNpdHlBbmltYXRpb24pIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBhcnRpY2xlcy5vcGFjaXR5LmFuaW1cIiwgXCJwYXJ0aWNsZXMub3BhY2l0eS5hbmltYXRpb25cIik7XG5cbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYW5pbWF0aW9uOiBJT3BhY2l0eUFuaW1hdGlvbjtcbiAgICBwdWJsaWMgcmFuZG9tOiBib29sZWFuO1xuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IE9wYWNpdHlBbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5yYW5kb20gPSBmYWxzZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDE7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SU9wYWNpdHk+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ubG9hZChkYXRhLmFuaW1hdGlvbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYW5pbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltLmxvYWQoZGF0YS5hbmltKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEucmFuZG9tICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmRvbSA9IGRhdGEucmFuZG9tO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=