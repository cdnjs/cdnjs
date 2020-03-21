"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionManager = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Linker = require("./Linker");

var _Attracter = require("./Attracter");

var _Collider = require("./Collider");

var InteractionManager = /*#__PURE__*/function () {
  function InteractionManager(container, particle) {
    (0, _classCallCheck2["default"])(this, InteractionManager);
    this.container = void 0;
    this.particle = void 0;
    this.linker = void 0;
    this.attracter = void 0;
    this.collider = void 0;
    this.container = container;
    this.particle = particle;
    this.linker = new _Linker.Linker(container, particle);
    this.attracter = new _Attracter.Attracter(container, particle);
    this.collider = new _Collider.Collider(container, particle);
  }

  (0, _createClass2["default"])(InteractionManager, [{
    key: "interact",
    value: function interact(p2) {
      var container = this.container;
      var options = container.options;
      /* link particles */

      if (options.particles.lineLinked.enable) {
        this.linker.link(p2);
      }
      /* attract particles */


      if (options.particles.move.attract.enable) {
        this.attracter.attract(p2);
      }
      /* bounce particles */


      if (options.particles.move.collisions) {
        this.collider.collide(p2);
      }
    }
  }]);
  return InteractionManager;
}();

exports.InteractionManager = InteractionManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL1BhcnRpY2xlL0ludGVyYWN0aW9uTWFuYWdlci50cyJdLCJuYW1lcyI6WyJJbnRlcmFjdGlvbk1hbmFnZXIiLCJjb250YWluZXIiLCJwYXJ0aWNsZSIsImxpbmtlciIsImF0dHJhY3RlciIsImNvbGxpZGVyIiwiTGlua2VyIiwiQXR0cmFjdGVyIiwiQ29sbGlkZXIiLCJwMiIsIm9wdGlvbnMiLCJwYXJ0aWNsZXMiLCJsaW5lTGlua2VkIiwiZW5hYmxlIiwibGluayIsIm1vdmUiLCJhdHRyYWN0IiwiY29sbGlzaW9ucyIsImNvbGxpZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7SUFFYUEsa0I7QUFPVCw4QkFBWUMsU0FBWixFQUFrQ0MsUUFBbEMsRUFBc0Q7QUFBQTtBQUFBLFNBTnJDRCxTQU1xQztBQUFBLFNBTHJDQyxRQUtxQztBQUFBLFNBSnJDQyxNQUlxQztBQUFBLFNBSHJDQyxTQUdxQztBQUFBLFNBRnJDQyxRQUVxQztBQUNsRCxTQUFLSixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLElBQUlHLGNBQUosQ0FBV0wsU0FBWCxFQUFzQkMsUUFBdEIsQ0FBZDtBQUNBLFNBQUtFLFNBQUwsR0FBaUIsSUFBSUcsb0JBQUosQ0FBY04sU0FBZCxFQUF5QkMsUUFBekIsQ0FBakI7QUFDQSxTQUFLRyxRQUFMLEdBQWdCLElBQUlHLGtCQUFKLENBQWFQLFNBQWIsRUFBd0JDLFFBQXhCLENBQWhCO0FBQ0g7Ozs7NkJBRWVPLEUsRUFBb0I7QUFDaEMsVUFBTVIsU0FBUyxHQUFHLEtBQUtBLFNBQXZCO0FBQ0EsVUFBTVMsT0FBTyxHQUFHVCxTQUFTLENBQUNTLE9BQTFCO0FBRUE7O0FBQ0EsVUFBSUEsT0FBTyxDQUFDQyxTQUFSLENBQWtCQyxVQUFsQixDQUE2QkMsTUFBakMsRUFBeUM7QUFDckMsYUFBS1YsTUFBTCxDQUFZVyxJQUFaLENBQWlCTCxFQUFqQjtBQUNIO0FBRUQ7OztBQUNBLFVBQUlDLE9BQU8sQ0FBQ0MsU0FBUixDQUFrQkksSUFBbEIsQ0FBdUJDLE9BQXZCLENBQStCSCxNQUFuQyxFQUEyQztBQUN2QyxhQUFLVCxTQUFMLENBQWVZLE9BQWYsQ0FBdUJQLEVBQXZCO0FBQ0g7QUFFRDs7O0FBQ0EsVUFBSUMsT0FBTyxDQUFDQyxTQUFSLENBQWtCSSxJQUFsQixDQUF1QkUsVUFBM0IsRUFBdUM7QUFDbkMsYUFBS1osUUFBTCxDQUFjYSxPQUFkLENBQXNCVCxFQUF0QjtBQUNIO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnRhaW5lcn0gZnJvbSBcIi4uL0NvbnRhaW5lclwiO1xuaW1wb3J0IHtQYXJ0aWNsZX0gZnJvbSBcIi4uL1BhcnRpY2xlXCI7XG5pbXBvcnQge0xpbmtlcn0gZnJvbSBcIi4vTGlua2VyXCI7XG5pbXBvcnQge0F0dHJhY3Rlcn0gZnJvbSBcIi4vQXR0cmFjdGVyXCI7XG5pbXBvcnQge0NvbGxpZGVyfSBmcm9tIFwiLi9Db2xsaWRlclwiO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJhY3Rpb25NYW5hZ2VyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRhaW5lcjogQ29udGFpbmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFydGljbGU6IFBhcnRpY2xlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbGlua2VyOiBMaW5rZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBhdHRyYWN0ZXI6IEF0dHJhY3RlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbGxpZGVyOiBDb2xsaWRlcjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogQ29udGFpbmVyLCBwYXJ0aWNsZTogUGFydGljbGUpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMucGFydGljbGUgPSBwYXJ0aWNsZTtcbiAgICAgICAgdGhpcy5saW5rZXIgPSBuZXcgTGlua2VyKGNvbnRhaW5lciwgcGFydGljbGUpO1xuICAgICAgICB0aGlzLmF0dHJhY3RlciA9IG5ldyBBdHRyYWN0ZXIoY29udGFpbmVyLCBwYXJ0aWNsZSk7XG4gICAgICAgIHRoaXMuY29sbGlkZXIgPSBuZXcgQ29sbGlkZXIoY29udGFpbmVyLCBwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGludGVyYWN0KHAyOiBQYXJ0aWNsZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIC8qIGxpbmsgcGFydGljbGVzICovXG4gICAgICAgIGlmIChvcHRpb25zLnBhcnRpY2xlcy5saW5lTGlua2VkLmVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5saW5rZXIubGluayhwMik7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBhdHRyYWN0IHBhcnRpY2xlcyAqL1xuICAgICAgICBpZiAob3B0aW9ucy5wYXJ0aWNsZXMubW92ZS5hdHRyYWN0LmVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5hdHRyYWN0ZXIuYXR0cmFjdChwMik7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBib3VuY2UgcGFydGljbGVzICovXG4gICAgICAgIGlmIChvcHRpb25zLnBhcnRpY2xlcy5tb3ZlLmNvbGxpc2lvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZXIuY29sbGlkZShwMik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=