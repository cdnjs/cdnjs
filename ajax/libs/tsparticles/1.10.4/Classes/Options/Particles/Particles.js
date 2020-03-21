"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Particles = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Color = require("./Color");

var _LineLinked = require("./LineLinked");

var _Move = require("./Move");

var _ParticlesNumber = require("./ParticlesNumber");

var _Opacity = require("./Opacity");

var _Shape = require("./Shape/Shape");

var _ParticlesSize = require("./ParticlesSize");

var _Messages = require("../../Utils/Messages");

var _Rotate = require("./Rotate");

var Particles = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Particles, [{
    key: "line_linked",

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.line_linked", "particles.lineLinked");

      return this.lineLinked;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.line_linked", "particles.lineLinked");

      this.lineLinked = value;
    }
  }]);

  // public shadow: IShadow;
  function Particles() {
    (0, _classCallCheck2["default"])(this, Particles);
    this.color = void 0;
    this.lineLinked = void 0;
    this.move = void 0;
    this.number = void 0;
    this.opacity = void 0;
    this.rotate = void 0;
    this.shape = void 0;
    this.size = void 0;
    this.color = new _Color.Color();
    this.lineLinked = new _LineLinked.LineLinked();
    this.move = new _Move.Move();
    this.number = new _ParticlesNumber.ParticlesNumber();
    this.opacity = new _Opacity.Opacity();
    this.rotate = new _Rotate.Rotate();
    this.shape = new _Shape.Shape();
    this.size = new _ParticlesSize.ParticlesSize(); //this.shadow = new Shadow();
  }

  (0, _createClass2["default"])(Particles, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        this.color.load(data.color);

        if (data.lineLinked !== undefined) {
          this.lineLinked.load(data.lineLinked);
        } else if (data.line_linked !== undefined) {
          this.line_linked.load(data.line_linked);
        }

        this.move.load(data.move);
        this.number.load(data.number);
        this.opacity.load(data.opacity);
        this.rotate.load(data.rotate);
        this.shape.load(data.shape);
        this.size.load(data.size);
      }
    }
  }]);
  return Particles;
}();

exports.Particles = Particles;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1BhcnRpY2xlcy50cyJdLCJuYW1lcyI6WyJQYXJ0aWNsZXMiLCJNZXNzYWdlcyIsImRlcHJlY2F0ZWQiLCJsaW5lTGlua2VkIiwidmFsdWUiLCJjb2xvciIsIm1vdmUiLCJudW1iZXIiLCJvcGFjaXR5Iiwicm90YXRlIiwic2hhcGUiLCJzaXplIiwiQ29sb3IiLCJMaW5lTGlua2VkIiwiTW92ZSIsIlBhcnRpY2xlc051bWJlciIsIk9wYWNpdHkiLCJSb3RhdGUiLCJTaGFwZSIsIlBhcnRpY2xlc1NpemUiLCJkYXRhIiwidW5kZWZpbmVkIiwibG9hZCIsImxpbmVfbGlua2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBUUE7O0FBRUE7O0lBR2FBLFM7Ozs7QUFDVDs7Ozt3QkFJc0M7QUFDbENDLHlCQUFTQyxVQUFULENBQW9CLHVCQUFwQixFQUE2QyxzQkFBN0M7O0FBRUEsYUFBTyxLQUFLQyxVQUFaO0FBQ0g7QUFFRDs7Ozs7O3NCQUt1QkMsSyxFQUFvQjtBQUN2Q0gseUJBQVNDLFVBQVQsQ0FBb0IsdUJBQXBCLEVBQTZDLHNCQUE3Qzs7QUFFQSxXQUFLQyxVQUFMLEdBQWtCQyxLQUFsQjtBQUNIOzs7QUFXRDtBQUVBLHVCQUFjO0FBQUE7QUFBQSxTQVhQQyxLQVdPO0FBQUEsU0FWUEYsVUFVTztBQUFBLFNBVFBHLElBU087QUFBQSxTQVJQQyxNQVFPO0FBQUEsU0FQUEMsT0FPTztBQUFBLFNBTlBDLE1BTU87QUFBQSxTQUxQQyxLQUtPO0FBQUEsU0FKUEMsSUFJTztBQUNWLFNBQUtOLEtBQUwsR0FBYSxJQUFJTyxZQUFKLEVBQWI7QUFDQSxTQUFLVCxVQUFMLEdBQWtCLElBQUlVLHNCQUFKLEVBQWxCO0FBQ0EsU0FBS1AsSUFBTCxHQUFZLElBQUlRLFVBQUosRUFBWjtBQUNBLFNBQUtQLE1BQUwsR0FBYyxJQUFJUSxnQ0FBSixFQUFkO0FBQ0EsU0FBS1AsT0FBTCxHQUFlLElBQUlRLGdCQUFKLEVBQWY7QUFDQSxTQUFLUCxNQUFMLEdBQWMsSUFBSVEsY0FBSixFQUFkO0FBQ0EsU0FBS1AsS0FBTCxHQUFhLElBQUlRLFlBQUosRUFBYjtBQUNBLFNBQUtQLElBQUwsR0FBWSxJQUFJUSw0QkFBSixFQUFaLENBUlUsQ0FTVjtBQUNIOzs7O3lCQUVXQyxJLEVBQTJDO0FBQ25ELFVBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUNwQixhQUFLaEIsS0FBTCxDQUFXaUIsSUFBWCxDQUFnQkYsSUFBSSxDQUFDZixLQUFyQjs7QUFFQSxZQUFJZSxJQUFJLENBQUNqQixVQUFMLEtBQW9Ca0IsU0FBeEIsRUFBbUM7QUFDL0IsZUFBS2xCLFVBQUwsQ0FBZ0JtQixJQUFoQixDQUFxQkYsSUFBSSxDQUFDakIsVUFBMUI7QUFDSCxTQUZELE1BRU8sSUFBSWlCLElBQUksQ0FBQ0csV0FBTCxLQUFxQkYsU0FBekIsRUFBb0M7QUFDdkMsZUFBS0UsV0FBTCxDQUFpQkQsSUFBakIsQ0FBc0JGLElBQUksQ0FBQ0csV0FBM0I7QUFDSDs7QUFFRCxhQUFLakIsSUFBTCxDQUFVZ0IsSUFBVixDQUFlRixJQUFJLENBQUNkLElBQXBCO0FBQ0EsYUFBS0MsTUFBTCxDQUFZZSxJQUFaLENBQWlCRixJQUFJLENBQUNiLE1BQXRCO0FBQ0EsYUFBS0MsT0FBTCxDQUFhYyxJQUFiLENBQWtCRixJQUFJLENBQUNaLE9BQXZCO0FBQ0EsYUFBS0MsTUFBTCxDQUFZYSxJQUFaLENBQWlCRixJQUFJLENBQUNYLE1BQXRCO0FBQ0EsYUFBS0MsS0FBTCxDQUFXWSxJQUFYLENBQWdCRixJQUFJLENBQUNWLEtBQXJCO0FBQ0EsYUFBS0MsSUFBTCxDQUFVVyxJQUFWLENBQWVGLElBQUksQ0FBQ1QsSUFBcEI7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUGFydGljbGVzfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9JUGFydGljbGVzXCI7XG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9Db2xvclwiO1xuaW1wb3J0IHtMaW5lTGlua2VkfSBmcm9tIFwiLi9MaW5lTGlua2VkXCI7XG5pbXBvcnQge01vdmV9IGZyb20gXCIuL01vdmVcIjtcbmltcG9ydCB7UGFydGljbGVzTnVtYmVyfSBmcm9tIFwiLi9QYXJ0aWNsZXNOdW1iZXJcIjtcbmltcG9ydCB7T3BhY2l0eX0gZnJvbSBcIi4vT3BhY2l0eVwiO1xuaW1wb3J0IHtTaGFwZX0gZnJvbSBcIi4vU2hhcGUvU2hhcGVcIjtcbmltcG9ydCB7UGFydGljbGVzU2l6ZX0gZnJvbSBcIi4vUGFydGljbGVzU2l6ZVwiO1xuaW1wb3J0IHtJUGFydGljbGVzQ29sb3J9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lQYXJ0aWNsZXNDb2xvclwiO1xuaW1wb3J0IHtJTGluZUxpbmtlZH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvSUxpbmVMaW5rZWRcIjtcbmltcG9ydCB7SU1vdmV9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lNb3ZlXCI7XG5pbXBvcnQge0lQYXJ0aWNsZXNOdW1iZXJ9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lQYXJ0aWNsZXNOdW1iZXJcIjtcbmltcG9ydCB7SU9wYWNpdHl9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lPcGFjaXR5XCI7XG5pbXBvcnQge0lTaGFwZX0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvU2hhcGUvSVNoYXBlXCI7XG5pbXBvcnQge0lTaXplfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9JU2l6ZVwiO1xuaW1wb3J0IHtNZXNzYWdlc30gZnJvbSBcIi4uLy4uL1V0aWxzL01lc3NhZ2VzXCI7XG5pbXBvcnQge0lSb3RhdGV9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lSb3RhdGVcIjtcbmltcG9ydCB7Um90YXRlfSBmcm9tIFwiLi9Sb3RhdGVcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlcyBpbXBsZW1lbnRzIElQYXJ0aWNsZXMge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGxpbmVMaW5rZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGxpbmVfbGlua2VkKCk6IElMaW5lTGlua2VkIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBhcnRpY2xlcy5saW5lX2xpbmtlZFwiLCBcInBhcnRpY2xlcy5saW5lTGlua2VkXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmxpbmVMaW5rZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGlzIHByb3BlcnR5IGlzIG9ic29sZXRlLCBwbGVhc2UgdXNlIHRoZSBuZXcgbGluZUxpbmtlZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgbGluZV9saW5rZWQodmFsdWU6IElMaW5lTGlua2VkKSB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJwYXJ0aWNsZXMubGluZV9saW5rZWRcIiwgXCJwYXJ0aWNsZXMubGluZUxpbmtlZFwiKTtcblxuICAgICAgICB0aGlzLmxpbmVMaW5rZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29sb3I6IElQYXJ0aWNsZXNDb2xvcjtcbiAgICBwdWJsaWMgbGluZUxpbmtlZDogSUxpbmVMaW5rZWQ7XG4gICAgcHVibGljIG1vdmU6IElNb3ZlO1xuICAgIHB1YmxpYyBudW1iZXI6IElQYXJ0aWNsZXNOdW1iZXI7XG4gICAgcHVibGljIG9wYWNpdHk6IElPcGFjaXR5O1xuICAgIHB1YmxpYyByb3RhdGU6IElSb3RhdGU7XG4gICAgcHVibGljIHNoYXBlOiBJU2hhcGU7XG4gICAgcHVibGljIHNpemU6IElTaXplO1xuXG4gICAgLy8gcHVibGljIHNoYWRvdzogSVNoYWRvdztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbG9yID0gbmV3IENvbG9yKCk7XG4gICAgICAgIHRoaXMubGluZUxpbmtlZCA9IG5ldyBMaW5lTGlua2VkKCk7XG4gICAgICAgIHRoaXMubW92ZSA9IG5ldyBNb3ZlKCk7XG4gICAgICAgIHRoaXMubnVtYmVyID0gbmV3IFBhcnRpY2xlc051bWJlcigpO1xuICAgICAgICB0aGlzLm9wYWNpdHkgPSBuZXcgT3BhY2l0eSgpO1xuICAgICAgICB0aGlzLnJvdGF0ZSA9IG5ldyBSb3RhdGUoKTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IG5ldyBTaGFwZSgpO1xuICAgICAgICB0aGlzLnNpemUgPSBuZXcgUGFydGljbGVzU2l6ZSgpO1xuICAgICAgICAvL3RoaXMuc2hhZG93ID0gbmV3IFNoYWRvdygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElQYXJ0aWNsZXM+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IubG9hZChkYXRhLmNvbG9yKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEubGluZUxpbmtlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lTGlua2VkLmxvYWQoZGF0YS5saW5lTGlua2VkKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5saW5lX2xpbmtlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lX2xpbmtlZC5sb2FkKGRhdGEubGluZV9saW5rZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1vdmUubG9hZChkYXRhLm1vdmUpO1xuICAgICAgICAgICAgdGhpcy5udW1iZXIubG9hZChkYXRhLm51bWJlcik7XG4gICAgICAgICAgICB0aGlzLm9wYWNpdHkubG9hZChkYXRhLm9wYWNpdHkpO1xuICAgICAgICAgICAgdGhpcy5yb3RhdGUubG9hZChkYXRhLnJvdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLmxvYWQoZGF0YS5zaGFwZSk7XG4gICAgICAgICAgICB0aGlzLnNpemUubG9hZChkYXRhLnNpemUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=