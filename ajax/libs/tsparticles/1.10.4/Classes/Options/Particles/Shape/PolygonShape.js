"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolygonShape = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Messages = require("../../../Utils/Messages");

var PolygonShape = /*#__PURE__*/function () {
  (0, _createClass2["default"])(PolygonShape, [{
    key: "nb_sides",

    /**
     *
     * @deprecated this property is obsolete, please use the new sides
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.shape.polygon.nb_sides", "particles.shape.polygon.sides");

      return this.sides;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new sides
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.shape.polygon.nb_sides", "particles.shape.polygon.sides");

      this.sides = value;
    }
  }]);

  function PolygonShape() {
    (0, _classCallCheck2["default"])(this, PolygonShape);
    this.sides = void 0;
    this.sides = 5;
  }

  (0, _createClass2["default"])(PolygonShape, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.sides !== undefined) {
          this.sides = data.sides;
        } else if (data.nb_sides !== undefined) {
          this.nb_sides = data.nb_sides;
        }
      }
    }
  }]);
  return PolygonShape;
}();

exports.PolygonShape = PolygonShape;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1NoYXBlL1BvbHlnb25TaGFwZS50cyJdLCJuYW1lcyI6WyJQb2x5Z29uU2hhcGUiLCJNZXNzYWdlcyIsImRlcHJlY2F0ZWQiLCJzaWRlcyIsInZhbHVlIiwiZGF0YSIsInVuZGVmaW5lZCIsIm5iX3NpZGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBR2FBLFk7Ozs7QUFDVDs7Ozt3QkFJOEI7QUFDMUJDLHlCQUFTQyxVQUFULENBQW9CLGtDQUFwQixFQUF3RCwrQkFBeEQ7O0FBRUEsYUFBTyxLQUFLQyxLQUFaO0FBQ0g7QUFFRDs7Ozs7O3NCQUtvQkMsSyxFQUFlO0FBQy9CSCx5QkFBU0MsVUFBVCxDQUFvQixrQ0FBcEIsRUFBd0QsK0JBQXhEOztBQUVBLFdBQUtDLEtBQUwsR0FBYUMsS0FBYjtBQUNIOzs7QUFJRCwwQkFBYztBQUFBO0FBQUEsU0FGUEQsS0FFTztBQUNWLFNBQUtBLEtBQUwsR0FBYSxDQUFiO0FBQ0g7Ozs7eUJBRVdFLEksRUFBOEM7QUFDdEQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0YsS0FBTCxLQUFlRyxTQUFuQixFQUE4QjtBQUMxQixlQUFLSCxLQUFMLEdBQWFFLElBQUksQ0FBQ0YsS0FBbEI7QUFDSCxTQUZELE1BRU8sSUFBSUUsSUFBSSxDQUFDRSxRQUFMLEtBQWtCRCxTQUF0QixFQUFpQztBQUNwQyxlQUFLQyxRQUFMLEdBQWdCRixJQUFJLENBQUNFLFFBQXJCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUG9seWdvblNoYXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9TaGFwZS9JUG9seWdvblNoYXBlXCI7XG5pbXBvcnQge01lc3NhZ2VzfSBmcm9tIFwiLi4vLi4vLi4vVXRpbHMvTWVzc2FnZXNcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIFBvbHlnb25TaGFwZSBpbXBsZW1lbnRzIElQb2x5Z29uU2hhcGUge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IHNpZGVzXG4gICAgICovXG4gICAgcHVibGljIGdldCBuYl9zaWRlcygpOiBudW1iZXIge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwicGFydGljbGVzLnNoYXBlLnBvbHlnb24ubmJfc2lkZXNcIiwgXCJwYXJ0aWNsZXMuc2hhcGUucG9seWdvbi5zaWRlc1wiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zaWRlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyBzaWRlc1xuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgbmJfc2lkZXModmFsdWU6IG51bWJlcikge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwicGFydGljbGVzLnNoYXBlLnBvbHlnb24ubmJfc2lkZXNcIiwgXCJwYXJ0aWNsZXMuc2hhcGUucG9seWdvbi5zaWRlc1wiKTtcblxuICAgICAgICB0aGlzLnNpZGVzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNpZGVzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zaWRlcyA9IDU7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SVBvbHlnb25TaGFwZT4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGRhdGEuc2lkZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2lkZXMgPSBkYXRhLnNpZGVzO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLm5iX3NpZGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5iX3NpZGVzID0gZGF0YS5uYl9zaWRlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==