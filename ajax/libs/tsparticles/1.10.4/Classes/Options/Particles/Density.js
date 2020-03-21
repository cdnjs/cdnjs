"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Density = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Messages = require("../../Utils/Messages");

var Density = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Density, [{
    key: "value_area",

    /**
     *
     * @deprecated this property is obsolete, please use the new area
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.number.density.value_area", "particles.number.density.area");

      return this.area;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new area
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.number.density.value_area", "particles.number.density.area");

      this.area = value;
    }
  }]);

  function Density() {
    (0, _classCallCheck2["default"])(this, Density);
    this.enable = void 0;
    this.area = void 0;
    this.enable = true;
    this.area = 800;
  }

  (0, _createClass2["default"])(Density, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.area !== undefined) {
          this.area = data.area;
        } else if (data.value_area !== undefined) {
          this.value_area = data.value_area;
        }
      }
    }
  }]);
  return Density;
}();

exports.Density = Density;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL0RlbnNpdHkudHMiXSwibmFtZXMiOlsiRGVuc2l0eSIsIk1lc3NhZ2VzIiwiZGVwcmVjYXRlZCIsImFyZWEiLCJ2YWx1ZSIsImVuYWJsZSIsImRhdGEiLCJ1bmRlZmluZWQiLCJ2YWx1ZV9hcmVhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBR2FBLE87Ozs7QUFDVDs7Ozt3QkFJZ0M7QUFDNUJDLHlCQUFTQyxVQUFULENBQW9CLHFDQUFwQixFQUEyRCwrQkFBM0Q7O0FBRUEsYUFBTyxLQUFLQyxJQUFaO0FBQ0g7QUFFRDs7Ozs7O3NCQUtzQkMsSyxFQUFlO0FBQ2pDSCx5QkFBU0MsVUFBVCxDQUFvQixxQ0FBcEIsRUFBMkQsK0JBQTNEOztBQUVBLFdBQUtDLElBQUwsR0FBWUMsS0FBWjtBQUNIOzs7QUFLRCxxQkFBYztBQUFBO0FBQUEsU0FIUEMsTUFHTztBQUFBLFNBRlBGLElBRU87QUFDVixTQUFLRSxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtGLElBQUwsR0FBWSxHQUFaO0FBQ0g7Ozs7eUJBRVdHLEksRUFBeUM7QUFDakQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0QsTUFBTCxLQUFnQkUsU0FBcEIsRUFBK0I7QUFDM0IsZUFBS0YsTUFBTCxHQUFjQyxJQUFJLENBQUNELE1BQW5CO0FBQ0g7O0FBRUQsWUFBSUMsSUFBSSxDQUFDSCxJQUFMLEtBQWNJLFNBQWxCLEVBQTZCO0FBQ3pCLGVBQUtKLElBQUwsR0FBWUcsSUFBSSxDQUFDSCxJQUFqQjtBQUNILFNBRkQsTUFFTyxJQUFJRyxJQUFJLENBQUNFLFVBQUwsS0FBb0JELFNBQXhCLEVBQW1DO0FBQ3RDLGVBQUtDLFVBQUwsR0FBa0JGLElBQUksQ0FBQ0UsVUFBdkI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lEZW5zaXR5fSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9JRGVuc2l0eVwiO1xuaW1wb3J0IHtNZXNzYWdlc30gZnJvbSBcIi4uLy4uL1V0aWxzL01lc3NhZ2VzXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBEZW5zaXR5IGltcGxlbWVudHMgSURlbnNpdHkge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGFyZWFcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHZhbHVlX2FyZWEoKTogbnVtYmVyIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBhcnRpY2xlcy5udW1iZXIuZGVuc2l0eS52YWx1ZV9hcmVhXCIsIFwicGFydGljbGVzLm51bWJlci5kZW5zaXR5LmFyZWFcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXJlYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyBhcmVhXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHNldCB2YWx1ZV9hcmVhKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBhcnRpY2xlcy5udW1iZXIuZGVuc2l0eS52YWx1ZV9hcmVhXCIsIFwicGFydGljbGVzLm51bWJlci5kZW5zaXR5LmFyZWFcIik7XG5cbiAgICAgICAgdGhpcy5hcmVhID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgYXJlYTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hcmVhID0gODAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElEZW5zaXR5Pik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmFyZWEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJlYSA9IGRhdGEuYXJlYTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS52YWx1ZV9hcmVhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlX2FyZWEgPSBkYXRhLnZhbHVlX2FyZWE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=