"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoverEvent = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _HoverMode = require("../../../../Enums/Modes/HoverMode");

var _Parallax = require("./Parallax");

var HoverEvent = /*#__PURE__*/function () {
  function HoverEvent() {
    (0, _classCallCheck2["default"])(this, HoverEvent);
    this.enable = void 0;
    this.mode = void 0;
    this.parallax = void 0;
    this.enable = true;
    this.mode = _HoverMode.HoverMode.grab;
    this.parallax = new _Parallax.Parallax();
  }

  (0, _createClass2["default"])(HoverEvent, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.mode !== undefined) {
          this.mode = data.mode;
        }

        this.parallax.load(data.parallax);
      }
    }
  }]);
  return HoverEvent;
}();

exports.HoverEvent = HoverEvent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSG92ZXJFdmVudC50cyJdLCJuYW1lcyI6WyJIb3ZlckV2ZW50IiwiZW5hYmxlIiwibW9kZSIsInBhcmFsbGF4IiwiSG92ZXJNb2RlIiwiZ3JhYiIsIlBhcmFsbGF4IiwiZGF0YSIsInVuZGVmaW5lZCIsImxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7SUFJYUEsVTtBQUtULHdCQUFjO0FBQUE7QUFBQSxTQUpQQyxNQUlPO0FBQUEsU0FIUEMsSUFHTztBQUFBLFNBRlBDLFFBRU87QUFDVixTQUFLRixNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLElBQUwsR0FBWUUscUJBQVVDLElBQXRCO0FBQ0EsU0FBS0YsUUFBTCxHQUFnQixJQUFJRyxrQkFBSixFQUFoQjtBQUNIOzs7O3lCQUVXQyxJLEVBQTRDO0FBQ3BELFVBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUNwQixZQUFJRCxJQUFJLENBQUNOLE1BQUwsS0FBZ0JPLFNBQXBCLEVBQStCO0FBQzNCLGVBQUtQLE1BQUwsR0FBY00sSUFBSSxDQUFDTixNQUFuQjtBQUNIOztBQUVELFlBQUlNLElBQUksQ0FBQ0wsSUFBTCxLQUFjTSxTQUFsQixFQUE2QjtBQUN6QixlQUFLTixJQUFMLEdBQVlLLElBQUksQ0FBQ0wsSUFBakI7QUFDSDs7QUFFRCxhQUFLQyxRQUFMLENBQWNNLElBQWQsQ0FBbUJGLElBQUksQ0FBQ0osUUFBeEI7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJSG92ZXJFdmVudH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9JSG92ZXJFdmVudFwiO1xuaW1wb3J0IHtIb3Zlck1vZGV9IGZyb20gXCIuLi8uLi8uLi8uLi9FbnVtcy9Nb2Rlcy9Ib3Zlck1vZGVcIjtcbmltcG9ydCB7UGFyYWxsYXh9IGZyb20gXCIuL1BhcmFsbGF4XCI7XG5pbXBvcnQge0lQYXJhbGxheH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9JUGFyYWxsYXhcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIEhvdmVyRXZlbnQgaW1wbGVtZW50cyBJSG92ZXJFdmVudCB7XG4gICAgcHVibGljIGVuYWJsZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgbW9kZTogSG92ZXJNb2RlIHwgSG92ZXJNb2RlW107XG4gICAgcHVibGljIHBhcmFsbGF4OiBJUGFyYWxsYXg7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1vZGUgPSBIb3Zlck1vZGUuZ3JhYjtcbiAgICAgICAgdGhpcy5wYXJhbGxheCA9IG5ldyBQYXJhbGxheCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElIb3ZlckV2ZW50Pik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLm1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9IGRhdGEubW9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wYXJhbGxheC5sb2FkKGRhdGEucGFyYWxsYXgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19