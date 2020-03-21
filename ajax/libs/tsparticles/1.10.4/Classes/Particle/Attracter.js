"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Attracter = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Attracter = /*#__PURE__*/function () {
  function Attracter(container, particle) {
    (0, _classCallCheck2["default"])(this, Attracter);
    this.container = void 0;
    this.particle = void 0;
    this.container = container;
    this.particle = particle;
  }

  (0, _createClass2["default"])(Attracter, [{
    key: "attract",
    value: function attract(p2) {
      var container = this.container;
      var options = container.options;
      var particle = this.particle;
      /* condensed particles */

      var dx = particle.position.x - p2.position.x;
      var dy = particle.position.y - p2.position.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= container.retina.lineLinkedDistance) {
        var ax = dx / (options.particles.move.attract.rotate.x * 1000);
        var ay = dy / (options.particles.move.attract.rotate.y * 1000);
        particle.velocity.horizontal -= ax;
        particle.velocity.vertical -= ay;
        p2.velocity.horizontal += ax;
        p2.velocity.vertical += ay;
      }
    }
  }]);
  return Attracter;
}();

exports.Attracter = Attracter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL1BhcnRpY2xlL0F0dHJhY3Rlci50cyJdLCJuYW1lcyI6WyJBdHRyYWN0ZXIiLCJjb250YWluZXIiLCJwYXJ0aWNsZSIsInAyIiwib3B0aW9ucyIsImR4IiwicG9zaXRpb24iLCJ4IiwiZHkiLCJ5IiwiZGlzdCIsIk1hdGgiLCJzcXJ0IiwicmV0aW5hIiwibGluZUxpbmtlZERpc3RhbmNlIiwiYXgiLCJwYXJ0aWNsZXMiLCJtb3ZlIiwiYXR0cmFjdCIsInJvdGF0ZSIsImF5IiwidmVsb2NpdHkiLCJob3Jpem9udGFsIiwidmVydGljYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFHYUEsUztBQUlULHFCQUFZQyxTQUFaLEVBQWtDQyxRQUFsQyxFQUFzRDtBQUFBO0FBQUEsU0FIckNELFNBR3FDO0FBQUEsU0FGckNDLFFBRXFDO0FBQ2xELFNBQUtELFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDs7Ozs0QkFFY0MsRSxFQUFvQjtBQUMvQixVQUFNRixTQUFTLEdBQUcsS0FBS0EsU0FBdkI7QUFDQSxVQUFNRyxPQUFPLEdBQUdILFNBQVMsQ0FBQ0csT0FBMUI7QUFDQSxVQUFNRixRQUFRLEdBQUcsS0FBS0EsUUFBdEI7QUFFQTs7QUFDQSxVQUFNRyxFQUFFLEdBQUdILFFBQVEsQ0FBQ0ksUUFBVCxDQUFrQkMsQ0FBbEIsR0FBc0JKLEVBQUUsQ0FBQ0csUUFBSCxDQUFZQyxDQUE3QztBQUNBLFVBQU1DLEVBQUUsR0FBR04sUUFBUSxDQUFDSSxRQUFULENBQWtCRyxDQUFsQixHQUFzQk4sRUFBRSxDQUFDRyxRQUFILENBQVlHLENBQTdDO0FBQ0EsVUFBTUMsSUFBSSxHQUFHQyxJQUFJLENBQUNDLElBQUwsQ0FBVVAsRUFBRSxHQUFHQSxFQUFMLEdBQVVHLEVBQUUsR0FBR0EsRUFBekIsQ0FBYjs7QUFFQSxVQUFJRSxJQUFJLElBQUlULFNBQVMsQ0FBQ1ksTUFBVixDQUFpQkMsa0JBQTdCLEVBQWlEO0FBQzdDLFlBQU1DLEVBQUUsR0FBR1YsRUFBRSxJQUFJRCxPQUFPLENBQUNZLFNBQVIsQ0FBa0JDLElBQWxCLENBQXVCQyxPQUF2QixDQUErQkMsTUFBL0IsQ0FBc0NaLENBQXRDLEdBQTBDLElBQTlDLENBQWI7QUFDQSxZQUFNYSxFQUFFLEdBQUdaLEVBQUUsSUFBSUosT0FBTyxDQUFDWSxTQUFSLENBQWtCQyxJQUFsQixDQUF1QkMsT0FBdkIsQ0FBK0JDLE1BQS9CLENBQXNDVixDQUF0QyxHQUEwQyxJQUE5QyxDQUFiO0FBRUFQLFFBQUFBLFFBQVEsQ0FBQ21CLFFBQVQsQ0FBa0JDLFVBQWxCLElBQWdDUCxFQUFoQztBQUNBYixRQUFBQSxRQUFRLENBQUNtQixRQUFULENBQWtCRSxRQUFsQixJQUE4QkgsRUFBOUI7QUFDQWpCLFFBQUFBLEVBQUUsQ0FBQ2tCLFFBQUgsQ0FBWUMsVUFBWixJQUEwQlAsRUFBMUI7QUFDQVosUUFBQUEsRUFBRSxDQUFDa0IsUUFBSCxDQUFZRSxRQUFaLElBQXdCSCxFQUF4QjtBQUNIO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnRhaW5lcn0gZnJvbSBcIi4uL0NvbnRhaW5lclwiO1xuaW1wb3J0IHtQYXJ0aWNsZX0gZnJvbSBcIi4uL1BhcnRpY2xlXCI7XG5cbmV4cG9ydCBjbGFzcyBBdHRyYWN0ZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29udGFpbmVyOiBDb250YWluZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYXJ0aWNsZTogUGFydGljbGU7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IENvbnRhaW5lciwgcGFydGljbGU6IFBhcnRpY2xlKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnBhcnRpY2xlID0gcGFydGljbGU7XG4gICAgfVxuXG4gICAgcHVibGljIGF0dHJhY3QocDI6IFBhcnRpY2xlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGFpbmVyLm9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZTtcblxuICAgICAgICAvKiBjb25kZW5zZWQgcGFydGljbGVzICovXG4gICAgICAgIGNvbnN0IGR4ID0gcGFydGljbGUucG9zaXRpb24ueCAtIHAyLnBvc2l0aW9uLng7XG4gICAgICAgIGNvbnN0IGR5ID0gcGFydGljbGUucG9zaXRpb24ueSAtIHAyLnBvc2l0aW9uLnk7XG4gICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgICAgIGlmIChkaXN0IDw9IGNvbnRhaW5lci5yZXRpbmEubGluZUxpbmtlZERpc3RhbmNlKSB7XG4gICAgICAgICAgICBjb25zdCBheCA9IGR4IC8gKG9wdGlvbnMucGFydGljbGVzLm1vdmUuYXR0cmFjdC5yb3RhdGUueCAqIDEwMDApO1xuICAgICAgICAgICAgY29uc3QgYXkgPSBkeSAvIChvcHRpb25zLnBhcnRpY2xlcy5tb3ZlLmF0dHJhY3Qucm90YXRlLnkgKiAxMDAwKTtcblxuICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHkuaG9yaXpvbnRhbCAtPSBheDtcbiAgICAgICAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnZlcnRpY2FsIC09IGF5O1xuICAgICAgICAgICAgcDIudmVsb2NpdHkuaG9yaXpvbnRhbCArPSBheDtcbiAgICAgICAgICAgIHAyLnZlbG9jaXR5LnZlcnRpY2FsICs9IGF5O1xuICAgICAgICB9XG4gICAgfVxufVxuIl19