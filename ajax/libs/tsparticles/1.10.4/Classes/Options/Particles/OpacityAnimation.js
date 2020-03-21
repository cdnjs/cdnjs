"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpacityAnimation = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Messages = require("../../Utils/Messages");

var OpacityAnimation = /*#__PURE__*/function () {
  (0, _createClass2["default"])(OpacityAnimation, [{
    key: "opacity_min",

    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.opacity.animation.opacity_min", "particles.opacity.animation.minimumValue");

      return this.minimumValue;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.opacity.animation.opacity_min", "particles.opacity.animation.minimumValue");

      this.minimumValue = value;
    }
  }]);

  function OpacityAnimation() {
    (0, _classCallCheck2["default"])(this, OpacityAnimation);
    this.enable = void 0;
    this.minimumValue = void 0;
    this.speed = void 0;
    this.sync = void 0;
    this.enable = false;
    this.minimumValue = 0;
    this.speed = 2;
    this.sync = false;
  }

  (0, _createClass2["default"])(OpacityAnimation, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.minimumValue !== undefined) {
          this.minimumValue = data.minimumValue;
        } else if (data.opacity_min !== undefined) {
          this.opacity_min = data.opacity_min;
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
  return OpacityAnimation;
}();

exports.OpacityAnimation = OpacityAnimation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL09wYWNpdHlBbmltYXRpb24udHMiXSwibmFtZXMiOlsiT3BhY2l0eUFuaW1hdGlvbiIsIk1lc3NhZ2VzIiwiZGVwcmVjYXRlZCIsIm1pbmltdW1WYWx1ZSIsInZhbHVlIiwiZW5hYmxlIiwic3BlZWQiLCJzeW5jIiwiZGF0YSIsInVuZGVmaW5lZCIsIm9wYWNpdHlfbWluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBR2FBLGdCOzs7O0FBQ1Q7Ozs7d0JBSWlDO0FBQzdCQyx5QkFBU0MsVUFBVCxDQUFvQix5Q0FBcEIsRUFBK0QsMENBQS9EOztBQUVBLGFBQU8sS0FBS0MsWUFBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLdUJDLEssRUFBZTtBQUNsQ0gseUJBQVNDLFVBQVQsQ0FBb0IseUNBQXBCLEVBQStELDBDQUEvRDs7QUFFQSxXQUFLQyxZQUFMLEdBQW9CQyxLQUFwQjtBQUNIOzs7QUFPRCw4QkFBYztBQUFBO0FBQUEsU0FMUEMsTUFLTztBQUFBLFNBSlBGLFlBSU87QUFBQSxTQUhQRyxLQUdPO0FBQUEsU0FGUEMsSUFFTztBQUNWLFNBQUtGLE1BQUwsR0FBYyxLQUFkO0FBQ0EsU0FBS0YsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFNBQUtHLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEtBQVo7QUFDSDs7Ozt5QkFFV0MsSSxFQUFrRDtBQUMxRCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDSCxNQUFMLEtBQWdCSSxTQUFwQixFQUErQjtBQUMzQixlQUFLSixNQUFMLEdBQWNHLElBQUksQ0FBQ0gsTUFBbkI7QUFDSDs7QUFFRCxZQUFJRyxJQUFJLENBQUNMLFlBQUwsS0FBc0JNLFNBQTFCLEVBQXFDO0FBQ2pDLGVBQUtOLFlBQUwsR0FBb0JLLElBQUksQ0FBQ0wsWUFBekI7QUFDSCxTQUZELE1BRU8sSUFBSUssSUFBSSxDQUFDRSxXQUFMLEtBQXFCRCxTQUF6QixFQUFvQztBQUN2QyxlQUFLQyxXQUFMLEdBQW1CRixJQUFJLENBQUNFLFdBQXhCO0FBQ0g7O0FBRUQsWUFBSUYsSUFBSSxDQUFDRixLQUFMLEtBQWVHLFNBQW5CLEVBQThCO0FBQzFCLGVBQUtILEtBQUwsR0FBYUUsSUFBSSxDQUFDRixLQUFsQjtBQUNIOztBQUVELFlBQUlFLElBQUksQ0FBQ0QsSUFBTCxLQUFjRSxTQUFsQixFQUE2QjtBQUN6QixlQUFLRixJQUFMLEdBQVlDLElBQUksQ0FBQ0QsSUFBakI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lPcGFjaXR5QW5pbWF0aW9ufSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9JT3BhY2l0eUFuaW1hdGlvblwiO1xuaW1wb3J0IHtNZXNzYWdlc30gZnJvbSBcIi4uLy4uL1V0aWxzL01lc3NhZ2VzXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBPcGFjaXR5QW5pbWF0aW9uIGltcGxlbWVudHMgSU9wYWNpdHlBbmltYXRpb24ge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IG1pbmltdW1WYWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgb3BhY2l0eV9taW4oKTogbnVtYmVyIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBhcnRpY2xlcy5vcGFjaXR5LmFuaW1hdGlvbi5vcGFjaXR5X21pblwiLCBcInBhcnRpY2xlcy5vcGFjaXR5LmFuaW1hdGlvbi5taW5pbXVtVmFsdWVcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWluaW11bVZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IG1pbmltdW1WYWx1ZVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgb3BhY2l0eV9taW4odmFsdWU6IG51bWJlcikge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwicGFydGljbGVzLm9wYWNpdHkuYW5pbWF0aW9uLm9wYWNpdHlfbWluXCIsIFwicGFydGljbGVzLm9wYWNpdHkuYW5pbWF0aW9uLm1pbmltdW1WYWx1ZVwiKTtcblxuICAgICAgICB0aGlzLm1pbmltdW1WYWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGU6IGJvb2xlYW47XG4gICAgcHVibGljIG1pbmltdW1WYWx1ZTogbnVtYmVyO1xuICAgIHB1YmxpYyBzcGVlZDogbnVtYmVyO1xuICAgIHB1YmxpYyBzeW5jOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWluaW11bVZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG4gICAgICAgIHRoaXMuc3luYyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElPcGFjaXR5QW5pbWF0aW9uPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLm1pbmltdW1WYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5taW5pbXVtVmFsdWUgPSBkYXRhLm1pbmltdW1WYWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5vcGFjaXR5X21pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGFjaXR5X21pbiA9IGRhdGEub3BhY2l0eV9taW47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gZGF0YS5zcGVlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuc3luYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jID0gZGF0YS5zeW5jO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19