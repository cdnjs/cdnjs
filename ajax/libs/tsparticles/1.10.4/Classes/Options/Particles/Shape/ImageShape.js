"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageShape = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Messages = require("../../../Utils/Messages");

var ImageShape = /*#__PURE__*/function () {
  (0, _createClass2["default"])(ImageShape, [{
    key: "replace_color",

    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.shape.image.replace_color", "particles.shape.image.replaceColor");

      return this.replaceColor;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.shape.image.replace_color", "particles.shape.image.replaceColor");

      this.replaceColor = value;
    }
  }]);

  function ImageShape() {
    (0, _classCallCheck2["default"])(this, ImageShape);
    this.height = void 0;
    this.replaceColor = void 0;
    this.src = void 0;
    this.width = void 0;
    this.height = 100;
    this.replaceColor = true;
    this.src = "";
    this.width = 100;
  }

  (0, _createClass2["default"])(ImageShape, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.height !== undefined) {
          this.height = data.height;
        }

        if (data.replaceColor !== undefined) {
          this.replaceColor = data.replaceColor;
        } else if (data.replace_color !== undefined) {
          this.replace_color = data.replace_color;
        }

        if (data.src !== undefined) {
          this.src = data.src;
        }

        if (data.width !== undefined) {
          this.width = data.width;
        }
      }
    }
  }]);
  return ImageShape;
}();

exports.ImageShape = ImageShape;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1NoYXBlL0ltYWdlU2hhcGUudHMiXSwibmFtZXMiOlsiSW1hZ2VTaGFwZSIsIk1lc3NhZ2VzIiwiZGVwcmVjYXRlZCIsInJlcGxhY2VDb2xvciIsInZhbHVlIiwiaGVpZ2h0Iiwic3JjIiwid2lkdGgiLCJkYXRhIiwidW5kZWZpbmVkIiwicmVwbGFjZV9jb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztJQUdhQSxVOzs7O0FBQ1Q7Ozs7d0JBSW9DO0FBQ2hDQyx5QkFBU0MsVUFBVCxDQUFvQixxQ0FBcEIsRUFBMkQsb0NBQTNEOztBQUVBLGFBQU8sS0FBS0MsWUFBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLeUJDLEssRUFBZ0I7QUFDckNILHlCQUFTQyxVQUFULENBQW9CLHFDQUFwQixFQUEyRCxvQ0FBM0Q7O0FBRUEsV0FBS0MsWUFBTCxHQUFvQkMsS0FBcEI7QUFDSDs7O0FBT0Qsd0JBQWM7QUFBQTtBQUFBLFNBTFBDLE1BS087QUFBQSxTQUpQRixZQUlPO0FBQUEsU0FIUEcsR0FHTztBQUFBLFNBRlBDLEtBRU87QUFDVixTQUFLRixNQUFMLEdBQWMsR0FBZDtBQUNBLFNBQUtGLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxTQUFLRyxHQUFMLEdBQVcsRUFBWDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxHQUFiO0FBQ0g7Ozs7eUJBRVdDLEksRUFBNEM7QUFDcEQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0gsTUFBTCxLQUFnQkksU0FBcEIsRUFBK0I7QUFDM0IsZUFBS0osTUFBTCxHQUFjRyxJQUFJLENBQUNILE1BQW5CO0FBQ0g7O0FBRUQsWUFBSUcsSUFBSSxDQUFDTCxZQUFMLEtBQXNCTSxTQUExQixFQUFxQztBQUNqQyxlQUFLTixZQUFMLEdBQW9CSyxJQUFJLENBQUNMLFlBQXpCO0FBQ0gsU0FGRCxNQUVPLElBQUlLLElBQUksQ0FBQ0UsYUFBTCxLQUF1QkQsU0FBM0IsRUFBc0M7QUFDekMsZUFBS0MsYUFBTCxHQUFxQkYsSUFBSSxDQUFDRSxhQUExQjtBQUNIOztBQUVELFlBQUlGLElBQUksQ0FBQ0YsR0FBTCxLQUFhRyxTQUFqQixFQUE0QjtBQUN4QixlQUFLSCxHQUFMLEdBQVdFLElBQUksQ0FBQ0YsR0FBaEI7QUFDSDs7QUFFRCxZQUFJRSxJQUFJLENBQUNELEtBQUwsS0FBZUUsU0FBbkIsRUFBOEI7QUFDMUIsZUFBS0YsS0FBTCxHQUFhQyxJQUFJLENBQUNELEtBQWxCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJSW1hZ2VTaGFwZX0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvU2hhcGUvSUltYWdlU2hhcGVcIjtcbmltcG9ydCB7TWVzc2FnZXN9IGZyb20gXCIuLi8uLi8uLi9VdGlscy9NZXNzYWdlc1wiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgSW1hZ2VTaGFwZSBpbXBsZW1lbnRzIElJbWFnZVNoYXBlIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyByZXBsYWNlQ29sb3JcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJlcGxhY2VfY29sb3IoKTogYm9vbGVhbiB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJwYXJ0aWNsZXMuc2hhcGUuaW1hZ2UucmVwbGFjZV9jb2xvclwiLCBcInBhcnRpY2xlcy5zaGFwZS5pbWFnZS5yZXBsYWNlQ29sb3JcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZUNvbG9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IHJlcGxhY2VDb2xvclxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgcmVwbGFjZV9jb2xvcih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwicGFydGljbGVzLnNoYXBlLmltYWdlLnJlcGxhY2VfY29sb3JcIiwgXCJwYXJ0aWNsZXMuc2hhcGUuaW1hZ2UucmVwbGFjZUNvbG9yXCIpO1xuXG4gICAgICAgIHRoaXMucmVwbGFjZUNvbG9yID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuICAgIHB1YmxpYyByZXBsYWNlQ29sb3I6IGJvb2xlYW47XG4gICAgcHVibGljIHNyYzogc3RyaW5nO1xuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTAwO1xuICAgICAgICB0aGlzLnJlcGxhY2VDb2xvciA9IHRydWU7XG4gICAgICAgIHRoaXMuc3JjID0gXCJcIjtcbiAgICAgICAgdGhpcy53aWR0aCA9IDEwMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChkYXRhPzogUmVjdXJzaXZlUGFydGlhbDxJSW1hZ2VTaGFwZT4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IGRhdGEuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXBsYWNlQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVwbGFjZUNvbG9yID0gZGF0YS5yZXBsYWNlQ29sb3I7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmVwbGFjZV9jb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXBsYWNlX2NvbG9yID0gZGF0YS5yZXBsYWNlX2NvbG9yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5zcmMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3JjID0gZGF0YS5zcmM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLndpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoID0gZGF0YS53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==