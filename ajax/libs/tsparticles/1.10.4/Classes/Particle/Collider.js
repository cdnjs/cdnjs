"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collider = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Utils = require("../Utils/Utils");

var Collider = /*#__PURE__*/function () {
  function Collider(container, particle) {
    (0, _classCallCheck2["default"])(this, Collider);
    this.container = void 0;
    this.particle = void 0;
    this.container = container;
    this.particle = particle;
  }

  (0, _createClass2["default"])(Collider, [{
    key: "collide",
    value: function collide(p2) {
      var p1 = this.particle;

      if (p1 === p2) {
        return;
      }

      var dist = _Utils.Utils.getDistanceBetweenCoordinates(p1.position, p2.position);

      var distP = (p1.bubbler.radius || p1.radius) + (p2.bubbler.radius || p2.radius);

      if (dist <= distP) {
        p1.resetVelocity();
        p2.resetVelocity();
      }
    }
  }]);
  return Collider;
}();

exports.Collider = Collider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL1BhcnRpY2xlL0NvbGxpZGVyLnRzIl0sIm5hbWVzIjpbIkNvbGxpZGVyIiwiY29udGFpbmVyIiwicGFydGljbGUiLCJwMiIsInAxIiwiZGlzdCIsIlV0aWxzIiwiZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRpbmF0ZXMiLCJwb3NpdGlvbiIsImRpc3RQIiwiYnViYmxlciIsInJhZGl1cyIsInJlc2V0VmVsb2NpdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQTs7SUFFYUEsUTtBQUlULG9CQUFZQyxTQUFaLEVBQWtDQyxRQUFsQyxFQUFzRDtBQUFBO0FBQUEsU0FIckNELFNBR3FDO0FBQUEsU0FGckNDLFFBRXFDO0FBQ2xELFNBQUtELFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDs7Ozs0QkFFY0MsRSxFQUFvQjtBQUMvQixVQUFNQyxFQUFFLEdBQUcsS0FBS0YsUUFBaEI7O0FBRUEsVUFBSUUsRUFBRSxLQUFLRCxFQUFYLEVBQWU7QUFDWDtBQUNIOztBQUVELFVBQU1FLElBQUksR0FBR0MsYUFBTUMsNkJBQU4sQ0FBb0NILEVBQUUsQ0FBQ0ksUUFBdkMsRUFBaURMLEVBQUUsQ0FBQ0ssUUFBcEQsQ0FBYjs7QUFDQSxVQUFNQyxLQUFLLEdBQUcsQ0FBQ0wsRUFBRSxDQUFDTSxPQUFILENBQVdDLE1BQVgsSUFBcUJQLEVBQUUsQ0FBQ08sTUFBekIsS0FBb0NSLEVBQUUsQ0FBQ08sT0FBSCxDQUFXQyxNQUFYLElBQXFCUixFQUFFLENBQUNRLE1BQTVELENBQWQ7O0FBRUEsVUFBSU4sSUFBSSxJQUFJSSxLQUFaLEVBQW1CO0FBQ2ZMLFFBQUFBLEVBQUUsQ0FBQ1EsYUFBSDtBQUNBVCxRQUFBQSxFQUFFLENBQUNTLGFBQUg7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250YWluZXJ9IGZyb20gXCIuLi9Db250YWluZXJcIjtcbmltcG9ydCB7UGFydGljbGV9IGZyb20gXCIuLi9QYXJ0aWNsZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4uL1V0aWxzL1V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaWRlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb250YWluZXI6IENvbnRhaW5lcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhcnRpY2xlOiBQYXJ0aWNsZTtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogQ29udGFpbmVyLCBwYXJ0aWNsZTogUGFydGljbGUpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMucGFydGljbGUgPSBwYXJ0aWNsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29sbGlkZShwMjogUGFydGljbGUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcDEgPSB0aGlzLnBhcnRpY2xlO1xuXG4gICAgICAgIGlmIChwMSA9PT0gcDIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpc3QgPSBVdGlscy5nZXREaXN0YW5jZUJldHdlZW5Db29yZGluYXRlcyhwMS5wb3NpdGlvbiwgcDIucG9zaXRpb24pO1xuICAgICAgICBjb25zdCBkaXN0UCA9IChwMS5idWJibGVyLnJhZGl1cyB8fCBwMS5yYWRpdXMpICsgKHAyLmJ1YmJsZXIucmFkaXVzIHx8IHAyLnJhZGl1cyk7XG5cbiAgICAgICAgaWYgKGRpc3QgPD0gZGlzdFApIHtcbiAgICAgICAgICAgIHAxLnJlc2V0VmVsb2NpdHkoKTtcbiAgICAgICAgICAgIHAyLnJlc2V0VmVsb2NpdHkoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==