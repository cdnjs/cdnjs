"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Draw = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Messages = require("../../Utils/Messages");

var _PolygonMaskDrawStroke = require("./PolygonMaskDrawStroke");

var Draw = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Draw, [{
    key: "lineWidth",

    /**
     * @deprecated the property lineWidth is deprecated, please use the new stroke.width
     */
    get: function get() {
      _Messages.Messages.deprecated("polygon.draw.lineWidth", "polygon.draw.stroke.width");

      return this.stroke.width;
    }
    /**
     * @deprecated the property lineWidth is deprecated, please use the new stroke.width
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("polygon.draw.lineWidth", "polygon.draw.stroke.width");

      this.stroke.width = value;
    }
    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */

  }, {
    key: "lineColor",
    get: function get() {
      _Messages.Messages.deprecated("polygon.draw.lineColor", "polygon.draw.stroke.color");

      return this.stroke.color;
    }
    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("polygon.draw.lineColor", "polygon.draw.stroke.color");

      this.stroke.color = value;
    }
  }]);

  function Draw() {
    (0, _classCallCheck2["default"])(this, Draw);
    this.enable = void 0;
    this.stroke = void 0;
    this.enable = false;
    this.stroke = new _PolygonMaskDrawStroke.PolygonMaskDrawStroke();
  }

  (0, _createClass2["default"])(Draw, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.stroke !== undefined) {
          this.stroke.load(data.stroke);
        } else {
          if (data.lineColor !== undefined) {
            this.lineColor = data.lineColor;
          }

          if (data.lineWidth !== undefined) {
            this.lineWidth = data.lineWidth;
          }
        }
      }
    }
  }]);
  return Draw;
}();

exports.Draw = Draw;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUG9seWdvbk1hc2svRHJhdy50cyJdLCJuYW1lcyI6WyJEcmF3IiwiTWVzc2FnZXMiLCJkZXByZWNhdGVkIiwic3Ryb2tlIiwid2lkdGgiLCJ2YWx1ZSIsImNvbG9yIiwiZW5hYmxlIiwiUG9seWdvbk1hc2tEcmF3U3Ryb2tlIiwiZGF0YSIsInVuZGVmaW5lZCIsImxvYWQiLCJsaW5lQ29sb3IiLCJsaW5lV2lkdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7SUFHYUEsSTs7OztBQUNUOzs7d0JBR3dCO0FBQ3BCQyx5QkFBU0MsVUFBVCxDQUFvQix3QkFBcEIsRUFBOEMsMkJBQTlDOztBQUVBLGFBQU8sS0FBS0MsTUFBTCxDQUFZQyxLQUFuQjtBQUNIO0FBRUQ7Ozs7c0JBR2NDLEssRUFBZTtBQUN6QkoseUJBQVNDLFVBQVQsQ0FBb0Isd0JBQXBCLEVBQThDLDJCQUE5Qzs7QUFFQSxXQUFLQyxNQUFMLENBQVlDLEtBQVosR0FBb0JDLEtBQXBCO0FBQ0g7QUFFRDs7Ozs7O3dCQUd3QjtBQUNwQkoseUJBQVNDLFVBQVQsQ0FBb0Isd0JBQXBCLEVBQThDLDJCQUE5Qzs7QUFFQSxhQUFPLEtBQUtDLE1BQUwsQ0FBWUcsS0FBbkI7QUFDSDtBQUVEOzs7O3NCQUdjRCxLLEVBQWU7QUFDekJKLHlCQUFTQyxVQUFULENBQW9CLHdCQUFwQixFQUE4QywyQkFBOUM7O0FBRUEsV0FBS0MsTUFBTCxDQUFZRyxLQUFaLEdBQW9CRCxLQUFwQjtBQUNIOzs7QUFLRCxrQkFBYztBQUFBO0FBQUEsU0FIUEUsTUFHTztBQUFBLFNBRlBKLE1BRU87QUFDVixTQUFLSSxNQUFMLEdBQWMsS0FBZDtBQUNBLFNBQUtKLE1BQUwsR0FBYyxJQUFJSyw0Q0FBSixFQUFkO0FBQ0g7Ozs7eUJBRVdDLEksRUFBaUQ7QUFDekQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0YsTUFBTCxLQUFnQkcsU0FBcEIsRUFBK0I7QUFDM0IsZUFBS0gsTUFBTCxHQUFjRSxJQUFJLENBQUNGLE1BQW5CO0FBQ0g7O0FBRUQsWUFBSUUsSUFBSSxDQUFDTixNQUFMLEtBQWdCTyxTQUFwQixFQUErQjtBQUMzQixlQUFLUCxNQUFMLENBQVlRLElBQVosQ0FBaUJGLElBQUksQ0FBQ04sTUFBdEI7QUFDSCxTQUZELE1BRU87QUFDSCxjQUFJTSxJQUFJLENBQUNHLFNBQUwsS0FBbUJGLFNBQXZCLEVBQWtDO0FBQzlCLGlCQUFLRSxTQUFMLEdBQWlCSCxJQUFJLENBQUNHLFNBQXRCO0FBQ0g7O0FBRUQsY0FBSUgsSUFBSSxDQUFDSSxTQUFMLEtBQW1CSCxTQUF2QixFQUFrQztBQUM5QixpQkFBS0csU0FBTCxHQUFpQkosSUFBSSxDQUFDSSxTQUF0QjtBQUNIO0FBQ0o7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUG9seWdvbk1hc2tEcmF3fSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BvbHlnb25NYXNrL0lQb2x5Z29uTWFza0RyYXdcIjtcbmltcG9ydCB7SVBvbHlnb25NYXNrRHJhd1N0cm9rZX0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9Qb2x5Z29uTWFzay9JUG9seWdvbk1hc2tEcmF3U3Ryb2tlXCI7XG5pbXBvcnQge01lc3NhZ2VzfSBmcm9tIFwiLi4vLi4vVXRpbHMvTWVzc2FnZXNcIjtcbmltcG9ydCB7UG9seWdvbk1hc2tEcmF3U3Ryb2tlfSBmcm9tIFwiLi9Qb2x5Z29uTWFza0RyYXdTdHJva2VcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIERyYXcgaW1wbGVtZW50cyBJUG9seWdvbk1hc2tEcmF3IHtcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGUgcHJvcGVydHkgbGluZVdpZHRoIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdGhlIG5ldyBzdHJva2Uud2lkdGhcbiAgICAgKi9cbiAgICBnZXQgbGluZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJwb2x5Z29uLmRyYXcubGluZVdpZHRoXCIsIFwicG9seWdvbi5kcmF3LnN0cm9rZS53aWR0aFwiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zdHJva2Uud2lkdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhlIHByb3BlcnR5IGxpbmVXaWR0aCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIHRoZSBuZXcgc3Ryb2tlLndpZHRoXG4gICAgICovXG4gICAgc2V0IGxpbmVXaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJwb2x5Z29uLmRyYXcubGluZVdpZHRoXCIsIFwicG9seWdvbi5kcmF3LnN0cm9rZS53aWR0aFwiKTtcblxuICAgICAgICB0aGlzLnN0cm9rZS53aWR0aCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHRoZSBwcm9wZXJ0eSBsaW5lQ29sb3IgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB0aGUgbmV3IHN0cm9rZS5jb2xvclxuICAgICAqL1xuICAgIGdldCBsaW5lQ29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBvbHlnb24uZHJhdy5saW5lQ29sb3JcIiwgXCJwb2x5Z29uLmRyYXcuc3Ryb2tlLmNvbG9yXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnN0cm9rZS5jb2xvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGUgcHJvcGVydHkgbGluZUNvbG9yIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdGhlIG5ldyBzdHJva2UuY29sb3JcbiAgICAgKi9cbiAgICBzZXQgbGluZUNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBvbHlnb24uZHJhdy5saW5lQ29sb3JcIiwgXCJwb2x5Z29uLmRyYXcuc3Ryb2tlLmNvbG9yXCIpO1xuXG4gICAgICAgIHRoaXMuc3Ryb2tlLmNvbG9yID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgc3Ryb2tlOiBJUG9seWdvbk1hc2tEcmF3U3Ryb2tlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3Ryb2tlID0gbmV3IFBvbHlnb25NYXNrRHJhd1N0cm9rZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElQb2x5Z29uTWFza0RyYXc+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuc3Ryb2tlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cm9rZS5sb2FkKGRhdGEuc3Ryb2tlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGluZUNvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lQ29sb3IgPSBkYXRhLmxpbmVDb2xvcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmVXaWR0aCA9IGRhdGEubGluZVdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==