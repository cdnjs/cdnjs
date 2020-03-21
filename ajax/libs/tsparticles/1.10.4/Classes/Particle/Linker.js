"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Linker = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Utils = require("../Utils/Utils");

var Linker = /*#__PURE__*/function () {
  function Linker(container, particle) {
    (0, _classCallCheck2["default"])(this, Linker);
    this.container = void 0;
    this.particle = void 0;
    this.container = container;
    this.particle = particle;
  }

  (0, _createClass2["default"])(Linker, [{
    key: "link",
    value: function link(p2) {
      var container = this.container;
      var options = container.options;
      var particle = this.particle;
      var x1 = particle.position.x + particle.offset.x;
      var x2 = p2.position.x + p2.offset.x;
      var dx = x1 - x2;
      var y1 = particle.position.y + particle.offset.y;
      var y2 = p2.position.y + p2.offset.y;
      var dy = y1 - y2;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var optOpacity = options.particles.lineLinked.opacity;
      var optDistance = container.retina.lineLinkedDistance;
      /* draw a line between p1 and p2 if the distance between them is under the config distance */

      if (dist <= optDistance) {
        var opacityLine = optOpacity - dist * optOpacity / optDistance;

        if (opacityLine > 0) {
          /* style */
          if (!container.particles.lineLinkedColor) {
            var color = options.particles.lineLinked.color;
            /* particles.line_linked - convert hex colors to rgb */
            //  check for the color profile requested and
            //  then return appropriate value

            if (color === "random") {
              if (options.particles.lineLinked.consent) {
                container.particles.lineLinkedColor = _Utils.Utils.hexToRgb(color);
              } else if (options.particles.lineLinked.blink) {
                container.particles.lineLinkedColor = "random";
              } else {
                container.particles.lineLinkedColor = "mid";
              }
            } else {
              container.particles.lineLinkedColor = _Utils.Utils.hexToRgb(color);
            }
          }

          container.canvas.drawLinkedLine(particle, p2, {
            x: x1,
            y: y1
          }, {
            x: x2,
            y: y2
          }, opacityLine);
        }
      }
    }
  }]);
  return Linker;
}();

exports.Linker = Linker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL1BhcnRpY2xlL0xpbmtlci50cyJdLCJuYW1lcyI6WyJMaW5rZXIiLCJjb250YWluZXIiLCJwYXJ0aWNsZSIsInAyIiwib3B0aW9ucyIsIngxIiwicG9zaXRpb24iLCJ4Iiwib2Zmc2V0IiwieDIiLCJkeCIsInkxIiwieSIsInkyIiwiZHkiLCJkaXN0IiwiTWF0aCIsInNxcnQiLCJvcHRPcGFjaXR5IiwicGFydGljbGVzIiwibGluZUxpbmtlZCIsIm9wYWNpdHkiLCJvcHREaXN0YW5jZSIsInJldGluYSIsImxpbmVMaW5rZWREaXN0YW5jZSIsIm9wYWNpdHlMaW5lIiwibGluZUxpbmtlZENvbG9yIiwiY29sb3IiLCJjb25zZW50IiwiVXRpbHMiLCJoZXhUb1JnYiIsImJsaW5rIiwiY2FudmFzIiwiZHJhd0xpbmtlZExpbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7SUFHYUEsTTtBQUlULGtCQUFZQyxTQUFaLEVBQWtDQyxRQUFsQyxFQUFzRDtBQUFBO0FBQUEsU0FIckNELFNBR3FDO0FBQUEsU0FGckNDLFFBRXFDO0FBQ2xELFNBQUtELFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDs7Ozt5QkFFV0MsRSxFQUFvQjtBQUM1QixVQUFNRixTQUFTLEdBQUcsS0FBS0EsU0FBdkI7QUFDQSxVQUFNRyxPQUFPLEdBQUdILFNBQVMsQ0FBQ0csT0FBMUI7QUFDQSxVQUFNRixRQUFRLEdBQUcsS0FBS0EsUUFBdEI7QUFDQSxVQUFNRyxFQUFFLEdBQUdILFFBQVEsQ0FBQ0ksUUFBVCxDQUFrQkMsQ0FBbEIsR0FBc0JMLFFBQVEsQ0FBQ00sTUFBVCxDQUFnQkQsQ0FBakQ7QUFDQSxVQUFNRSxFQUFFLEdBQUdOLEVBQUUsQ0FBQ0csUUFBSCxDQUFZQyxDQUFaLEdBQWdCSixFQUFFLENBQUNLLE1BQUgsQ0FBVUQsQ0FBckM7QUFDQSxVQUFNRyxFQUFFLEdBQUdMLEVBQUUsR0FBR0ksRUFBaEI7QUFDQSxVQUFNRSxFQUFFLEdBQUdULFFBQVEsQ0FBQ0ksUUFBVCxDQUFrQk0sQ0FBbEIsR0FBc0JWLFFBQVEsQ0FBQ00sTUFBVCxDQUFnQkksQ0FBakQ7QUFDQSxVQUFNQyxFQUFFLEdBQUdWLEVBQUUsQ0FBQ0csUUFBSCxDQUFZTSxDQUFaLEdBQWdCVCxFQUFFLENBQUNLLE1BQUgsQ0FBVUksQ0FBckM7QUFDQSxVQUFNRSxFQUFFLEdBQUdILEVBQUUsR0FBR0UsRUFBaEI7QUFDQSxVQUFNRSxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsSUFBTCxDQUFVUCxFQUFFLEdBQUdBLEVBQUwsR0FBVUksRUFBRSxHQUFHQSxFQUF6QixDQUFiO0FBQ0EsVUFBTUksVUFBVSxHQUFHZCxPQUFPLENBQUNlLFNBQVIsQ0FBa0JDLFVBQWxCLENBQTZCQyxPQUFoRDtBQUNBLFVBQU1DLFdBQVcsR0FBR3JCLFNBQVMsQ0FBQ3NCLE1BQVYsQ0FBaUJDLGtCQUFyQztBQUVBOztBQUNBLFVBQUlULElBQUksSUFBSU8sV0FBWixFQUF5QjtBQUNyQixZQUFNRyxXQUFXLEdBQUdQLFVBQVUsR0FBSUgsSUFBSSxHQUFHRyxVQUFSLEdBQXNCSSxXQUF2RDs7QUFFQSxZQUFJRyxXQUFXLEdBQUcsQ0FBbEIsRUFBcUI7QUFDakI7QUFDQSxjQUFJLENBQUN4QixTQUFTLENBQUNrQixTQUFWLENBQW9CTyxlQUF6QixFQUEwQztBQUN0QyxnQkFBTUMsS0FBSyxHQUFHdkIsT0FBTyxDQUFDZSxTQUFSLENBQWtCQyxVQUFsQixDQUE2Qk8sS0FBM0M7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQUlBLEtBQUssS0FBSyxRQUFkLEVBQXdCO0FBQ3BCLGtCQUFJdkIsT0FBTyxDQUFDZSxTQUFSLENBQWtCQyxVQUFsQixDQUE2QlEsT0FBakMsRUFBMEM7QUFDdEMzQixnQkFBQUEsU0FBUyxDQUFDa0IsU0FBVixDQUFvQk8sZUFBcEIsR0FBc0NHLGFBQU1DLFFBQU4sQ0FBZUgsS0FBZixDQUF0QztBQUNILGVBRkQsTUFFTyxJQUFJdkIsT0FBTyxDQUFDZSxTQUFSLENBQWtCQyxVQUFsQixDQUE2QlcsS0FBakMsRUFBd0M7QUFDM0M5QixnQkFBQUEsU0FBUyxDQUFDa0IsU0FBVixDQUFvQk8sZUFBcEIsR0FBc0MsUUFBdEM7QUFDSCxlQUZNLE1BRUE7QUFDSHpCLGdCQUFBQSxTQUFTLENBQUNrQixTQUFWLENBQW9CTyxlQUFwQixHQUFzQyxLQUF0QztBQUNIO0FBQ0osYUFSRCxNQVFPO0FBQ0h6QixjQUFBQSxTQUFTLENBQUNrQixTQUFWLENBQW9CTyxlQUFwQixHQUFzQ0csYUFBTUMsUUFBTixDQUFlSCxLQUFmLENBQXRDO0FBQ0g7QUFDSjs7QUFFRDFCLFVBQUFBLFNBQVMsQ0FBQytCLE1BQVYsQ0FBaUJDLGNBQWpCLENBQWdDL0IsUUFBaEMsRUFBMENDLEVBQTFDLEVBQThDO0FBQUNJLFlBQUFBLENBQUMsRUFBRUYsRUFBSjtBQUFRTyxZQUFBQSxDQUFDLEVBQUVEO0FBQVgsV0FBOUMsRUFBOEQ7QUFBQ0osWUFBQUEsQ0FBQyxFQUFFRSxFQUFKO0FBQVFHLFlBQUFBLENBQUMsRUFBRUM7QUFBWCxXQUE5RCxFQUE4RVksV0FBOUU7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BhcnRpY2xlfSBmcm9tIFwiLi4vUGFydGljbGVcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuLi9VdGlscy9VdGlsc1wiO1xuaW1wb3J0IHtDb250YWluZXJ9IGZyb20gXCIuLi9Db250YWluZXJcIjtcblxuZXhwb3J0IGNsYXNzIExpbmtlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb250YWluZXI6IENvbnRhaW5lcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhcnRpY2xlOiBQYXJ0aWNsZTtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogQ29udGFpbmVyLCBwYXJ0aWNsZTogUGFydGljbGUpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMucGFydGljbGUgPSBwYXJ0aWNsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGluayhwMjogUGFydGljbGUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIub3B0aW9ucztcbiAgICAgICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcnRpY2xlO1xuICAgICAgICBjb25zdCB4MSA9IHBhcnRpY2xlLnBvc2l0aW9uLnggKyBwYXJ0aWNsZS5vZmZzZXQueDtcbiAgICAgICAgY29uc3QgeDIgPSBwMi5wb3NpdGlvbi54ICsgcDIub2Zmc2V0Lng7XG4gICAgICAgIGNvbnN0IGR4ID0geDEgLSB4MjtcbiAgICAgICAgY29uc3QgeTEgPSBwYXJ0aWNsZS5wb3NpdGlvbi55ICsgcGFydGljbGUub2Zmc2V0Lnk7XG4gICAgICAgIGNvbnN0IHkyID0gcDIucG9zaXRpb24ueSArIHAyLm9mZnNldC55O1xuICAgICAgICBjb25zdCBkeSA9IHkxIC0geTI7XG4gICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICBjb25zdCBvcHRPcGFjaXR5ID0gb3B0aW9ucy5wYXJ0aWNsZXMubGluZUxpbmtlZC5vcGFjaXR5O1xuICAgICAgICBjb25zdCBvcHREaXN0YW5jZSA9IGNvbnRhaW5lci5yZXRpbmEubGluZUxpbmtlZERpc3RhbmNlO1xuXG4gICAgICAgIC8qIGRyYXcgYSBsaW5lIGJldHdlZW4gcDEgYW5kIHAyIGlmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZW0gaXMgdW5kZXIgdGhlIGNvbmZpZyBkaXN0YW5jZSAqL1xuICAgICAgICBpZiAoZGlzdCA8PSBvcHREaXN0YW5jZSkge1xuICAgICAgICAgICAgY29uc3Qgb3BhY2l0eUxpbmUgPSBvcHRPcGFjaXR5IC0gKGRpc3QgKiBvcHRPcGFjaXR5KSAvIG9wdERpc3RhbmNlO1xuXG4gICAgICAgICAgICBpZiAob3BhY2l0eUxpbmUgPiAwKSB7XG4gICAgICAgICAgICAgICAgLyogc3R5bGUgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lci5wYXJ0aWNsZXMubGluZUxpbmtlZENvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gb3B0aW9ucy5wYXJ0aWNsZXMubGluZUxpbmtlZC5jb2xvcjtcblxuICAgICAgICAgICAgICAgICAgICAvKiBwYXJ0aWNsZXMubGluZV9saW5rZWQgLSBjb252ZXJ0IGhleCBjb2xvcnMgdG8gcmdiICovXG4gICAgICAgICAgICAgICAgICAgIC8vICBjaGVjayBmb3IgdGhlIGNvbG9yIHByb2ZpbGUgcmVxdWVzdGVkIGFuZFxuICAgICAgICAgICAgICAgICAgICAvLyAgdGhlbiByZXR1cm4gYXBwcm9wcmlhdGUgdmFsdWVcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnBhcnRpY2xlcy5saW5lTGlua2VkLmNvbnNlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLmxpbmVMaW5rZWRDb2xvciA9IFV0aWxzLmhleFRvUmdiKGNvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wYXJ0aWNsZXMubGluZUxpbmtlZC5ibGluaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wYXJ0aWNsZXMubGluZUxpbmtlZENvbG9yID0gXCJyYW5kb21cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnBhcnRpY2xlcy5saW5lTGlua2VkQ29sb3IgPSBcIm1pZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnBhcnRpY2xlcy5saW5lTGlua2VkQ29sb3IgPSBVdGlscy5oZXhUb1JnYihjb2xvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2FudmFzLmRyYXdMaW5rZWRMaW5lKHBhcnRpY2xlLCBwMiwge3g6IHgxLCB5OiB5MX0sIHt4OiB4MiwgeTogeTJ9LCBvcGFjaXR5TGluZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=