"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grabber = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Utils = require("../Utils/Utils");

/**
 * Particle grab manager
 */
var Grabber = /*#__PURE__*/function () {
  function Grabber(container, particle) {
    (0, _classCallCheck2["default"])(this, Grabber);
    this.container = void 0;
    this.particle = void 0;
    this.container = container;
    this.particle = particle;
  }

  (0, _createClass2["default"])(Grabber, [{
    key: "grab",
    value: function grab() {
      var container = this.container;
      var options = container.options;
      var particle = this.particle;

      if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
        var mousePos = container.interactivity.mouse.position || {
          x: 0,
          y: 0
        };

        var distMouse = _Utils.Utils.getDistanceBetweenCoordinates(particle.position, mousePos);
        /*
           draw a line between the cursor and the particle
           if the distance between them is under the config distance
        */


        if (distMouse <= container.retina.grabModeDistance) {
          var lineOpacity = options.interactivity.modes.grab.lineLinked.opacity;
          var grabDistance = container.retina.grabModeDistance;
          var opacityLine = lineOpacity - distMouse / (1 / lineOpacity) / grabDistance;

          if (opacityLine > 0) {
            /* style */
            container.canvas.drawGrabLine(particle, opacityLine, mousePos);
          }
        }
      }
    }
  }]);
  return Grabber;
}();

exports.Grabber = Grabber;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL1BhcnRpY2xlL0dyYWJiZXIudHMiXSwibmFtZXMiOlsiR3JhYmJlciIsImNvbnRhaW5lciIsInBhcnRpY2xlIiwib3B0aW9ucyIsImludGVyYWN0aXZpdHkiLCJldmVudHMiLCJvbkhvdmVyIiwiZW5hYmxlIiwic3RhdHVzIiwibW91c2VQb3MiLCJtb3VzZSIsInBvc2l0aW9uIiwieCIsInkiLCJkaXN0TW91c2UiLCJVdGlscyIsImdldERpc3RhbmNlQmV0d2VlbkNvb3JkaW5hdGVzIiwicmV0aW5hIiwiZ3JhYk1vZGVEaXN0YW5jZSIsImxpbmVPcGFjaXR5IiwibW9kZXMiLCJncmFiIiwibGluZUxpbmtlZCIsIm9wYWNpdHkiLCJncmFiRGlzdGFuY2UiLCJvcGFjaXR5TGluZSIsImNhbnZhcyIsImRyYXdHcmFiTGluZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFFQTs7O0lBR2FBLE87QUFJVCxtQkFBWUMsU0FBWixFQUFrQ0MsUUFBbEMsRUFBc0Q7QUFBQTtBQUFBLFNBSHJDRCxTQUdxQztBQUFBLFNBRnJDQyxRQUVxQztBQUNsRCxTQUFLRCxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0g7Ozs7MkJBRW1CO0FBQ2hCLFVBQU1ELFNBQVMsR0FBRyxLQUFLQSxTQUF2QjtBQUNBLFVBQU1FLE9BQU8sR0FBR0YsU0FBUyxDQUFDRSxPQUExQjtBQUNBLFVBQU1ELFFBQVEsR0FBRyxLQUFLQSxRQUF0Qjs7QUFFQSxVQUFJQyxPQUFPLENBQUNDLGFBQVIsQ0FBc0JDLE1BQXRCLENBQTZCQyxPQUE3QixDQUFxQ0MsTUFBckMsSUFBK0NOLFNBQVMsQ0FBQ0csYUFBVixDQUF3QkksTUFBeEIsS0FBbUMsV0FBdEYsRUFBbUc7QUFDL0YsWUFBTUMsUUFBUSxHQUFHUixTQUFTLENBQUNHLGFBQVYsQ0FBd0JNLEtBQXhCLENBQThCQyxRQUE5QixJQUEwQztBQUFDQyxVQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPQyxVQUFBQSxDQUFDLEVBQUU7QUFBVixTQUEzRDs7QUFDQSxZQUFNQyxTQUFTLEdBQUdDLGFBQU1DLDZCQUFOLENBQW9DZCxRQUFRLENBQUNTLFFBQTdDLEVBQXVERixRQUF2RCxDQUFsQjtBQUNBOzs7Ozs7QUFJQSxZQUFJSyxTQUFTLElBQUliLFNBQVMsQ0FBQ2dCLE1BQVYsQ0FBaUJDLGdCQUFsQyxFQUFvRDtBQUNoRCxjQUFNQyxXQUFXLEdBQUdoQixPQUFPLENBQUNDLGFBQVIsQ0FBc0JnQixLQUF0QixDQUE0QkMsSUFBNUIsQ0FBaUNDLFVBQWpDLENBQTRDQyxPQUFoRTtBQUNBLGNBQU1DLFlBQVksR0FBR3ZCLFNBQVMsQ0FBQ2dCLE1BQVYsQ0FBaUJDLGdCQUF0QztBQUNBLGNBQU1PLFdBQVcsR0FBR04sV0FBVyxHQUFJTCxTQUFTLElBQUksSUFBSUssV0FBUixDQUFWLEdBQWtDSyxZQUFwRTs7QUFFQSxjQUFJQyxXQUFXLEdBQUcsQ0FBbEIsRUFBcUI7QUFDakI7QUFFQXhCLFlBQUFBLFNBQVMsQ0FBQ3lCLE1BQVYsQ0FBaUJDLFlBQWpCLENBQThCekIsUUFBOUIsRUFBd0N1QixXQUF4QyxFQUFxRGhCLFFBQXJEO0FBQ0g7QUFDSjtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHtDb250YWluZXJ9IGZyb20gXCIuLi9Db250YWluZXJcIjtcbmltcG9ydCB7UGFydGljbGV9IGZyb20gXCIuLi9QYXJ0aWNsZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4uL1V0aWxzL1V0aWxzXCI7XG5cbi8qKlxuICogUGFydGljbGUgZ3JhYiBtYW5hZ2VyXG4gKi9cbmV4cG9ydCBjbGFzcyBHcmFiYmVyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRhaW5lcjogQ29udGFpbmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFydGljbGU6IFBhcnRpY2xlO1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyOiBDb250YWluZXIsIHBhcnRpY2xlOiBQYXJ0aWNsZSkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZSA9IHBhcnRpY2xlO1xuICAgIH1cblxuICAgIHB1YmxpYyBncmFiKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuICAgICAgICBjb25zdCBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGU7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMub25Ib3Zlci5lbmFibGUgJiYgY29udGFpbmVyLmludGVyYWN0aXZpdHkuc3RhdHVzID09PSBcIm1vdXNlbW92ZVwiKSB7XG4gICAgICAgICAgICBjb25zdCBtb3VzZVBvcyA9IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc2l0aW9uIHx8IHt4OiAwLCB5OiAwfTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RNb3VzZSA9IFV0aWxzLmdldERpc3RhbmNlQmV0d2VlbkNvb3JkaW5hdGVzKHBhcnRpY2xlLnBvc2l0aW9uLCBtb3VzZVBvcyk7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgZHJhdyBhIGxpbmUgYmV0d2VlbiB0aGUgY3Vyc29yIGFuZCB0aGUgcGFydGljbGVcbiAgICAgICAgICAgICAgIGlmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZW0gaXMgdW5kZXIgdGhlIGNvbmZpZyBkaXN0YW5jZVxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmIChkaXN0TW91c2UgPD0gY29udGFpbmVyLnJldGluYS5ncmFiTW9kZURpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZU9wYWNpdHkgPSBvcHRpb25zLmludGVyYWN0aXZpdHkubW9kZXMuZ3JhYi5saW5lTGlua2VkLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JhYkRpc3RhbmNlID0gY29udGFpbmVyLnJldGluYS5ncmFiTW9kZURpc3RhbmNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wYWNpdHlMaW5lID0gbGluZU9wYWNpdHkgLSAoZGlzdE1vdXNlIC8gKDEgLyBsaW5lT3BhY2l0eSkpIC8gZ3JhYkRpc3RhbmNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wYWNpdHlMaW5lID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvKiBzdHlsZSAqL1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jYW52YXMuZHJhd0dyYWJMaW5lKHBhcnRpY2xlLCBvcGFjaXR5TGluZSwgbW91c2VQb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==