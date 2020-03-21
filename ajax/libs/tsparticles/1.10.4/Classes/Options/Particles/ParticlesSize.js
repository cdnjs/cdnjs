"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticlesSize = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ParticlesSizeAnimation = require("./ParticlesSizeAnimation");

var _Messages = require("../../Utils/Messages");

var ParticlesSize = /*#__PURE__*/function () {
  (0, _createClass2["default"])(ParticlesSize, [{
    key: "anim",

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.size.anim", "particles.size.animation");

      return this.animation;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.size.anim", "particles.size.animation");

      this.animation = value;
    }
  }]);

  function ParticlesSize() {
    (0, _classCallCheck2["default"])(this, ParticlesSize);
    this.animation = void 0;
    this.random = void 0;
    this.value = void 0;
    this.animation = new _ParticlesSizeAnimation.ParticlesSizeAnimation();
    this.random = false;
    this.value = 20;
  }

  (0, _createClass2["default"])(ParticlesSize, [{
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
  return ParticlesSize;
}();

exports.ParticlesSize = ParticlesSize;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1BhcnRpY2xlc1NpemUudHMiXSwibmFtZXMiOlsiUGFydGljbGVzU2l6ZSIsIk1lc3NhZ2VzIiwiZGVwcmVjYXRlZCIsImFuaW1hdGlvbiIsInZhbHVlIiwicmFuZG9tIiwiUGFydGljbGVzU2l6ZUFuaW1hdGlvbiIsImRhdGEiLCJ1bmRlZmluZWQiLCJsb2FkIiwiYW5pbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVBOztJQUdhQSxhOzs7O0FBQ1Q7Ozs7d0JBSWtDO0FBQzlCQyx5QkFBU0MsVUFBVCxDQUFvQixxQkFBcEIsRUFBMkMsMEJBQTNDOztBQUVBLGFBQU8sS0FBS0MsU0FBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLZ0JDLEssRUFBdUI7QUFDbkNILHlCQUFTQyxVQUFULENBQW9CLHFCQUFwQixFQUEyQywwQkFBM0M7O0FBRUEsV0FBS0MsU0FBTCxHQUFpQkMsS0FBakI7QUFDSDs7O0FBTUQsMkJBQWM7QUFBQTtBQUFBLFNBSlBELFNBSU87QUFBQSxTQUhQRSxNQUdPO0FBQUEsU0FGUEQsS0FFTztBQUNWLFNBQUtELFNBQUwsR0FBaUIsSUFBSUcsOENBQUosRUFBakI7QUFDQSxTQUFLRCxNQUFMLEdBQWMsS0FBZDtBQUNBLFNBQUtELEtBQUwsR0FBYSxFQUFiO0FBQ0g7Ozs7eUJBRVdHLEksRUFBc0M7QUFDOUMsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0osU0FBTCxLQUFtQkssU0FBdkIsRUFBa0M7QUFDOUIsZUFBS0wsU0FBTCxDQUFlTSxJQUFmLENBQW9CRixJQUFJLENBQUNKLFNBQXpCO0FBQ0gsU0FGRCxNQUVPLElBQUlJLElBQUksQ0FBQ0csSUFBTCxLQUFjRixTQUFsQixFQUE2QjtBQUNoQyxlQUFLRSxJQUFMLENBQVVELElBQVYsQ0FBZUYsSUFBSSxDQUFDRyxJQUFwQjtBQUNIOztBQUVELFlBQUlILElBQUksQ0FBQ0YsTUFBTCxLQUFnQkcsU0FBcEIsRUFBK0I7QUFDM0IsZUFBS0gsTUFBTCxHQUFjRSxJQUFJLENBQUNGLE1BQW5CO0FBQ0g7O0FBRUQsWUFBSUUsSUFBSSxDQUFDSCxLQUFMLEtBQWVJLFNBQW5CLEVBQThCO0FBQzFCLGVBQUtKLEtBQUwsR0FBYUcsSUFBSSxDQUFDSCxLQUFsQjtBQUNIO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNpemV9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lTaXplXCI7XG5pbXBvcnQge1BhcnRpY2xlc1NpemVBbmltYXRpb259IGZyb20gXCIuL1BhcnRpY2xlc1NpemVBbmltYXRpb25cIjtcbmltcG9ydCB7SVNpemVBbmltYXRpb259IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lTaXplQW5pbWF0aW9uXCI7XG5pbXBvcnQge01lc3NhZ2VzfSBmcm9tIFwiLi4vLi4vVXRpbHMvTWVzc2FnZXNcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlc1NpemUgaW1wbGVtZW50cyBJU2l6ZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGlzIHByb3BlcnR5IGlzIG9ic29sZXRlLCBwbGVhc2UgdXNlIHRoZSBuZXcgYW5pbWF0aW9uXG4gICAgICovXG4gICAgcHVibGljIGdldCBhbmltKCk6IElTaXplQW5pbWF0aW9uIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBhcnRpY2xlcy5zaXplLmFuaW1cIiwgXCJwYXJ0aWNsZXMuc2l6ZS5hbmltYXRpb25cIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGFuaW1hdGlvblxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgYW5pbSh2YWx1ZTogSVNpemVBbmltYXRpb24pIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBhcnRpY2xlcy5zaXplLmFuaW1cIiwgXCJwYXJ0aWNsZXMuc2l6ZS5hbmltYXRpb25cIik7XG5cbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYW5pbWF0aW9uOiBJU2l6ZUFuaW1hdGlvbjtcbiAgICBwdWJsaWMgcmFuZG9tOiBib29sZWFuO1xuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IFBhcnRpY2xlc1NpemVBbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5yYW5kb20gPSBmYWxzZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDIwO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElTaXplPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5hbmltYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmxvYWQoZGF0YS5hbmltYXRpb24pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmFuaW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbS5sb2FkKGRhdGEuYW5pbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnJhbmRvbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5kb20gPSBkYXRhLnJhbmRvbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19