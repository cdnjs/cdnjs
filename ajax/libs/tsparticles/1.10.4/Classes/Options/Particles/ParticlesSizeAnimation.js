"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticlesSizeAnimation = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Messages = require("../../Utils/Messages");

var ParticlesSizeAnimation = /*#__PURE__*/function () {
  (0, _createClass2["default"])(ParticlesSizeAnimation, [{
    key: "size_min",

    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.size.animation.size_min", "particles.size.animation.minimumValue");

      return this.minimumValue;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.size.animation.size_min", "particles.size.animation.minimumValue");

      this.minimumValue = value;
    }
  }]);

  function ParticlesSizeAnimation() {
    (0, _classCallCheck2["default"])(this, ParticlesSizeAnimation);
    this.enable = void 0;
    this.minimumValue = void 0;
    this.speed = void 0;
    this.sync = void 0;
    this.enable = false;
    this.minimumValue = 0;
    this.speed = 20;
    this.sync = false;
  }

  (0, _createClass2["default"])(ParticlesSizeAnimation, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.minimumValue !== undefined) {
          this.minimumValue = data.minimumValue;
        } else if (data.size_min !== undefined) {
          this.size_min = data.size_min;
        }

        if (data.speed !== undefined) {
          this.speed = data.speed;
        }

        if (data.sync !== undefined) {
          this.sync = data.sync;
        }
      }
    }
  }]);
  return ParticlesSizeAnimation;
}();

exports.ParticlesSizeAnimation = ParticlesSizeAnimation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1BhcnRpY2xlc1NpemVBbmltYXRpb24udHMiXSwibmFtZXMiOlsiUGFydGljbGVzU2l6ZUFuaW1hdGlvbiIsIk1lc3NhZ2VzIiwiZGVwcmVjYXRlZCIsIm1pbmltdW1WYWx1ZSIsInZhbHVlIiwiZW5hYmxlIiwic3BlZWQiLCJzeW5jIiwiZGF0YSIsInVuZGVmaW5lZCIsInNpemVfbWluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBR2FBLHNCOzs7O0FBQ1Q7Ozs7d0JBSThCO0FBQzFCQyx5QkFBU0MsVUFBVCxDQUFvQixtQ0FBcEIsRUFBeUQsdUNBQXpEOztBQUVBLGFBQU8sS0FBS0MsWUFBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLb0JDLEssRUFBZTtBQUMvQkgseUJBQVNDLFVBQVQsQ0FBb0IsbUNBQXBCLEVBQXlELHVDQUF6RDs7QUFFQSxXQUFLQyxZQUFMLEdBQW9CQyxLQUFwQjtBQUNIOzs7QUFPRCxvQ0FBYztBQUFBO0FBQUEsU0FMUEMsTUFLTztBQUFBLFNBSlBGLFlBSU87QUFBQSxTQUhQRyxLQUdPO0FBQUEsU0FGUEMsSUFFTztBQUNWLFNBQUtGLE1BQUwsR0FBYyxLQUFkO0FBQ0EsU0FBS0YsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFNBQUtHLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEtBQVo7QUFDSDs7Ozt5QkFFV0MsSSxFQUErQztBQUN2RCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDSCxNQUFMLEtBQWdCSSxTQUFwQixFQUErQjtBQUMzQixlQUFLSixNQUFMLEdBQWNHLElBQUksQ0FBQ0gsTUFBbkI7QUFDSDs7QUFFRCxZQUFJRyxJQUFJLENBQUNMLFlBQUwsS0FBc0JNLFNBQTFCLEVBQXFDO0FBQ2pDLGVBQUtOLFlBQUwsR0FBb0JLLElBQUksQ0FBQ0wsWUFBekI7QUFDSCxTQUZELE1BRU8sSUFBSUssSUFBSSxDQUFDRSxRQUFMLEtBQWtCRCxTQUF0QixFQUFpQztBQUNwQyxlQUFLQyxRQUFMLEdBQWdCRixJQUFJLENBQUNFLFFBQXJCO0FBQ0g7O0FBRUQsWUFBSUYsSUFBSSxDQUFDRixLQUFMLEtBQWVHLFNBQW5CLEVBQThCO0FBQzFCLGVBQUtILEtBQUwsR0FBYUUsSUFBSSxDQUFDRixLQUFsQjtBQUNIOztBQUVELFlBQUlFLElBQUksQ0FBQ0QsSUFBTCxLQUFjRSxTQUFsQixFQUE2QjtBQUN6QixlQUFLRixJQUFMLEdBQVlDLElBQUksQ0FBQ0QsSUFBakI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lTaXplQW5pbWF0aW9ufSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9JU2l6ZUFuaW1hdGlvblwiO1xuaW1wb3J0IHtNZXNzYWdlc30gZnJvbSBcIi4uLy4uL1V0aWxzL01lc3NhZ2VzXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZXNTaXplQW5pbWF0aW9uIGltcGxlbWVudHMgSVNpemVBbmltYXRpb24ge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IG1pbmltdW1WYWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2l6ZV9taW4oKTogbnVtYmVyIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBhcnRpY2xlcy5zaXplLmFuaW1hdGlvbi5zaXplX21pblwiLCBcInBhcnRpY2xlcy5zaXplLmFuaW1hdGlvbi5taW5pbXVtVmFsdWVcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWluaW11bVZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IG1pbmltdW1WYWx1ZVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgc2l6ZV9taW4odmFsdWU6IG51bWJlcikge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwicGFydGljbGVzLnNpemUuYW5pbWF0aW9uLnNpemVfbWluXCIsIFwicGFydGljbGVzLnNpemUuYW5pbWF0aW9uLm1pbmltdW1WYWx1ZVwiKTtcblxuICAgICAgICB0aGlzLm1pbmltdW1WYWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGU6IGJvb2xlYW47XG4gICAgcHVibGljIG1pbmltdW1WYWx1ZTogbnVtYmVyO1xuICAgIHB1YmxpYyBzcGVlZDogbnVtYmVyO1xuICAgIHB1YmxpYyBzeW5jOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWluaW11bVZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDIwO1xuICAgICAgICB0aGlzLnN5bmMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChkYXRhPzogUmVjdXJzaXZlUGFydGlhbDxJU2l6ZUFuaW1hdGlvbj4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGRhdGEuZW5hYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGRhdGEuZW5hYmxlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5taW5pbXVtVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWluaW11bVZhbHVlID0gZGF0YS5taW5pbXVtVmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuc2l6ZV9taW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZV9taW4gPSBkYXRhLnNpemVfbWluO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5zcGVlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IGRhdGEuc3BlZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN5bmMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3luYyA9IGRhdGEuc3luYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==