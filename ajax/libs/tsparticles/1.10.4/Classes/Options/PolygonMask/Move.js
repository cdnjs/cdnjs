"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Move = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _PolygonMaskMoveType = require("../../../Enums/PolygonMaskMoveType");

var Move = /*#__PURE__*/function () {
  function Move() {
    (0, _classCallCheck2["default"])(this, Move);
    this.radius = void 0;
    this.type = void 0;
    this.radius = 10;
    this.type = _PolygonMaskMoveType.PolygonMaskMoveType.path;
  }

  (0, _createClass2["default"])(Move, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.radius !== undefined) {
          this.radius = data.radius;
        }

        if (data.type !== undefined) {
          this.type = data.type;
        }
      }
    }
  }]);
  return Move;
}();

exports.Move = Move;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUG9seWdvbk1hc2svTW92ZS50cyJdLCJuYW1lcyI6WyJNb3ZlIiwicmFkaXVzIiwidHlwZSIsIlBvbHlnb25NYXNrTW92ZVR5cGUiLCJwYXRoIiwiZGF0YSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztJQUdhQSxJO0FBSVQsa0JBQWM7QUFBQTtBQUFBLFNBSFBDLE1BR087QUFBQSxTQUZQQyxJQUVPO0FBQ1YsU0FBS0QsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxJQUFMLEdBQVlDLHlDQUFvQkMsSUFBaEM7QUFDSDs7Ozt5QkFFV0MsSSxFQUFpRDtBQUN6RCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDSixNQUFMLEtBQWdCSyxTQUFwQixFQUErQjtBQUMzQixlQUFLTCxNQUFMLEdBQWNJLElBQUksQ0FBQ0osTUFBbkI7QUFDSDs7QUFFRCxZQUFJSSxJQUFJLENBQUNILElBQUwsS0FBY0ksU0FBbEIsRUFBNkI7QUFDekIsZUFBS0osSUFBTCxHQUFZRyxJQUFJLENBQUNILElBQWpCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUG9seWdvbk1hc2tNb3ZlfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BvbHlnb25NYXNrL0lQb2x5Z29uTWFza01vdmVcIjtcbmltcG9ydCB7UG9seWdvbk1hc2tNb3ZlVHlwZX0gZnJvbSBcIi4uLy4uLy4uL0VudW1zL1BvbHlnb25NYXNrTW92ZVR5cGVcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIE1vdmUgaW1wbGVtZW50cyBJUG9seWdvbk1hc2tNb3ZlIHtcbiAgICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG4gICAgcHVibGljIHR5cGU6IFBvbHlnb25NYXNrTW92ZVR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSAxMDtcbiAgICAgICAgdGhpcy50eXBlID0gUG9seWdvbk1hc2tNb3ZlVHlwZS5wYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElQb2x5Z29uTWFza01vdmU+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnJhZGl1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSBkYXRhLnJhZGl1cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gZGF0YS50eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19