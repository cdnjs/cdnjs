"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * Particle draw manager
 */
var Drawer = /*#__PURE__*/function () {
  function Drawer(container, particle) {
    (0, _classCallCheck2["default"])(this, Drawer);
    this.particle = void 0;
    this.container = void 0;
    this.text = void 0;
    this.container = container;
    this.particle = particle;
  }

  (0, _createClass2["default"])(Drawer, [{
    key: "draw",
    value: function draw() {
      var container = this.container;
      var particle = this.particle;
      container.canvas.drawParticle(particle);
    }
  }]);
  return Drawer;
}();

exports.Drawer = Drawer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL1BhcnRpY2xlL0RyYXdlci50cyJdLCJuYW1lcyI6WyJEcmF3ZXIiLCJjb250YWluZXIiLCJwYXJ0aWNsZSIsInRleHQiLCJjYW52YXMiLCJkcmF3UGFydGljbGUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0FBS0E7OztJQUdhQSxNO0FBS1Qsa0JBQVlDLFNBQVosRUFBa0NDLFFBQWxDLEVBQXNEO0FBQUE7QUFBQSxTQUpyQ0EsUUFJcUM7QUFBQSxTQUhyQ0QsU0FHcUM7QUFBQSxTQUZyQ0UsSUFFcUM7QUFDbEQsU0FBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNIOzs7OzJCQUVtQjtBQUNoQixVQUFNRCxTQUFTLEdBQUcsS0FBS0EsU0FBdkI7QUFDQSxVQUFNQyxRQUFRLEdBQUcsS0FBS0EsUUFBdEI7QUFFQUQsTUFBQUEsU0FBUyxDQUFDRyxNQUFWLENBQWlCQyxZQUFqQixDQUE4QkgsUUFBOUI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge0NvbnRhaW5lcn0gZnJvbSBcIi4uL0NvbnRhaW5lclwiO1xuaW1wb3J0IHtQYXJ0aWNsZX0gZnJvbSBcIi4uL1BhcnRpY2xlXCI7XG5cbi8qKlxuICogUGFydGljbGUgZHJhdyBtYW5hZ2VyXG4gKi9cbmV4cG9ydCBjbGFzcyBEcmF3ZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFydGljbGU6IFBhcnRpY2xlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29udGFpbmVyOiBDb250YWluZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSB0ZXh0Pzogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyOiBDb250YWluZXIsIHBhcnRpY2xlOiBQYXJ0aWNsZSkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZSA9IHBhcnRpY2xlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcnRpY2xlO1xuXG4gICAgICAgIGNvbnRhaW5lci5jYW52YXMuZHJhd1BhcnRpY2xlKHBhcnRpY2xlKTtcbiAgICB9XG59XG4iXX0=