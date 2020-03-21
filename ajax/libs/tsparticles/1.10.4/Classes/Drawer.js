"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ShapeType = require("../Enums/ShapeType");

var Drawer = /*#__PURE__*/function () {
  function Drawer(container) {
    (0, _classCallCheck2["default"])(this, Drawer);
    this.container = void 0;
    this.container = container;
  }

  (0, _createClass2["default"])(Drawer, [{
    key: "draw",
    value: function draw(timestamp) {
      var container = this.container;
      var options = container.options; // FPS limit logic
      // If we are too fast, just draw without updating

      var fpsLimit = options.fpsLimit > 0 ? options.fpsLimit : 60;

      if (container.lastFrameTime !== undefined && timestamp < container.lastFrameTime + 1000 / fpsLimit) {
        container.play();
        return;
      }

      var delta = timestamp - container.lastFrameTime;
      container.lastFrameTime = timestamp;

      if (options.particles.shape.type === _ShapeType.ShapeType.image && container.images.every(function (img) {
        return img.error;
      })) {
        return;
      }

      container.particles.draw(delta);

      if (!options.particles.move.enable) {
        container.pause();
      } else {
        container.play();
      }
    }
  }]);
  return Drawer;
}();

exports.Drawer = Drawer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DbGFzc2VzL0RyYXdlci50cyJdLCJuYW1lcyI6WyJEcmF3ZXIiLCJjb250YWluZXIiLCJ0aW1lc3RhbXAiLCJvcHRpb25zIiwiZnBzTGltaXQiLCJsYXN0RnJhbWVUaW1lIiwidW5kZWZpbmVkIiwicGxheSIsImRlbHRhIiwicGFydGljbGVzIiwic2hhcGUiLCJ0eXBlIiwiU2hhcGVUeXBlIiwiaW1hZ2UiLCJpbWFnZXMiLCJldmVyeSIsImltZyIsImVycm9yIiwiZHJhdyIsIm1vdmUiLCJlbmFibGUiLCJwYXVzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztJQUVhQSxNO0FBR1Qsa0JBQVlDLFNBQVosRUFBa0M7QUFBQTtBQUFBLFNBRmpCQSxTQUVpQjtBQUM5QixTQUFLQSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNIOzs7O3lCQUVXQyxTLEVBQXNDO0FBQzlDLFVBQU1ELFNBQVMsR0FBRyxLQUFLQSxTQUF2QjtBQUNBLFVBQU1FLE9BQU8sR0FBR0YsU0FBUyxDQUFDRSxPQUExQixDQUY4QyxDQUk5QztBQUNBOztBQUNBLFVBQU1DLFFBQVEsR0FBR0QsT0FBTyxDQUFDQyxRQUFSLEdBQW1CLENBQW5CLEdBQXVCRCxPQUFPLENBQUNDLFFBQS9CLEdBQTBDLEVBQTNEOztBQUVBLFVBQUlILFNBQVMsQ0FBQ0ksYUFBVixLQUE0QkMsU0FBNUIsSUFBeUNKLFNBQVMsR0FBR0QsU0FBUyxDQUFDSSxhQUFWLEdBQTJCLE9BQU9ELFFBQTNGLEVBQXNHO0FBQ2xHSCxRQUFBQSxTQUFTLENBQUNNLElBQVY7QUFDQTtBQUNIOztBQUVELFVBQU1DLEtBQUssR0FBR04sU0FBUyxHQUFHRCxTQUFTLENBQUNJLGFBQXBDO0FBRUFKLE1BQUFBLFNBQVMsQ0FBQ0ksYUFBVixHQUEwQkgsU0FBMUI7O0FBRUEsVUFBSUMsT0FBTyxDQUFDTSxTQUFSLENBQWtCQyxLQUFsQixDQUF3QkMsSUFBeEIsS0FBaUNDLHFCQUFVQyxLQUEzQyxJQUFvRFosU0FBUyxDQUFDYSxNQUFWLENBQWlCQyxLQUFqQixDQUF1QixVQUFDQyxHQUFEO0FBQUEsZUFBU0EsR0FBRyxDQUFDQyxLQUFiO0FBQUEsT0FBdkIsQ0FBeEQsRUFBb0c7QUFDaEc7QUFDSDs7QUFFRGhCLE1BQUFBLFNBQVMsQ0FBQ1EsU0FBVixDQUFvQlMsSUFBcEIsQ0FBeUJWLEtBQXpCOztBQUVBLFVBQUksQ0FBQ0wsT0FBTyxDQUFDTSxTQUFSLENBQWtCVSxJQUFsQixDQUF1QkMsTUFBNUIsRUFBb0M7QUFDaENuQixRQUFBQSxTQUFTLENBQUNvQixLQUFWO0FBQ0gsT0FGRCxNQUVPO0FBQ0hwQixRQUFBQSxTQUFTLENBQUNNLElBQVY7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250YWluZXJ9IGZyb20gXCIuL0NvbnRhaW5lclwiO1xuaW1wb3J0IHtTaGFwZVR5cGV9IGZyb20gXCIuLi9FbnVtcy9TaGFwZVR5cGVcIjtcblxuZXhwb3J0IGNsYXNzIERyYXdlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb250YWluZXI6IENvbnRhaW5lcjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3KHRpbWVzdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIC8vIEZQUyBsaW1pdCBsb2dpY1xuICAgICAgICAvLyBJZiB3ZSBhcmUgdG9vIGZhc3QsIGp1c3QgZHJhdyB3aXRob3V0IHVwZGF0aW5nXG4gICAgICAgIGNvbnN0IGZwc0xpbWl0ID0gb3B0aW9ucy5mcHNMaW1pdCA+IDAgPyBvcHRpb25zLmZwc0xpbWl0IDogNjA7XG5cbiAgICAgICAgaWYgKGNvbnRhaW5lci5sYXN0RnJhbWVUaW1lICE9PSB1bmRlZmluZWQgJiYgdGltZXN0YW1wIDwgY29udGFpbmVyLmxhc3RGcmFtZVRpbWUgKyAoMTAwMCAvIGZwc0xpbWl0KSkge1xuICAgICAgICAgICAgY29udGFpbmVyLnBsYXkoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGltZXN0YW1wIC0gY29udGFpbmVyLmxhc3RGcmFtZVRpbWU7XG5cbiAgICAgICAgY29udGFpbmVyLmxhc3RGcmFtZVRpbWUgPSB0aW1lc3RhbXA7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucGFydGljbGVzLnNoYXBlLnR5cGUgPT09IFNoYXBlVHlwZS5pbWFnZSAmJiBjb250YWluZXIuaW1hZ2VzLmV2ZXJ5KChpbWcpID0+IGltZy5lcnJvcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWNsZXMuZHJhdyhkZWx0YSk7XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLnBhcnRpY2xlcy5tb3ZlLmVuYWJsZSkge1xuICAgICAgICAgICAgY29udGFpbmVyLnBhdXNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIucGxheSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19