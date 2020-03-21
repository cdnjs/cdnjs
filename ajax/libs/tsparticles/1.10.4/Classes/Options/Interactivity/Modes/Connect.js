"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connect = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ConnectLineLinked = require("./ConnectLineLinked");

var _Messages = require("../../../Utils/Messages");

var Connect = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Connect, [{
    key: "line_linked",

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    get: function get() {
      _Messages.Messages.deprecated("interactivity.modes.connect.line_linked", "interactivity.modes.connect.lineLinked");

      return this.lineLinked;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("interactivity.modes.connect.line_linked", "interactivity.modes.connect.lineLinked");

      this.lineLinked = value;
    }
  }]);

  function Connect() {
    (0, _classCallCheck2["default"])(this, Connect);
    this.distance = void 0;
    this.lineLinked = void 0;
    this.radius = void 0;
    this.distance = 80;
    this.lineLinked = new _ConnectLineLinked.ConnectLineLinked();
    this.radius = 60;
  }

  (0, _createClass2["default"])(Connect, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }

        if (data.lineLinked !== undefined) {
          this.lineLinked.load(data.lineLinked);
        } else if (data.line_linked !== undefined) {
          this.line_linked.load(data.line_linked);
        }

        if (data.radius !== undefined) {
          this.radius = data.radius;
        }
      }
    }
  }]);
  return Connect;
}();

exports.Connect = Connect;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9Db25uZWN0LnRzIl0sIm5hbWVzIjpbIkNvbm5lY3QiLCJNZXNzYWdlcyIsImRlcHJlY2F0ZWQiLCJsaW5lTGlua2VkIiwidmFsdWUiLCJkaXN0YW5jZSIsInJhZGl1cyIsIkNvbm5lY3RMaW5lTGlua2VkIiwiZGF0YSIsInVuZGVmaW5lZCIsImxvYWQiLCJsaW5lX2xpbmtlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVBOztJQUdhQSxPOzs7O0FBQ1Q7Ozs7d0JBSTZDO0FBQ3pDQyx5QkFBU0MsVUFBVCxDQUFvQix5Q0FBcEIsRUFBK0Qsd0NBQS9EOztBQUVBLGFBQU8sS0FBS0MsVUFBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLdUJDLEssRUFBMkI7QUFDOUNILHlCQUFTQyxVQUFULENBQW9CLHlDQUFwQixFQUErRCx3Q0FBL0Q7O0FBRUEsV0FBS0MsVUFBTCxHQUFrQkMsS0FBbEI7QUFDSDs7O0FBTUQscUJBQWM7QUFBQTtBQUFBLFNBSlBDLFFBSU87QUFBQSxTQUhQRixVQUdPO0FBQUEsU0FGUEcsTUFFTztBQUNWLFNBQUtELFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLRixVQUFMLEdBQWtCLElBQUlJLG9DQUFKLEVBQWxCO0FBQ0EsU0FBS0QsTUFBTCxHQUFjLEVBQWQ7QUFDSDs7Ozt5QkFFV0UsSSxFQUF5QztBQUNqRCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDSCxRQUFMLEtBQWtCSSxTQUF0QixFQUFpQztBQUM3QixlQUFLSixRQUFMLEdBQWdCRyxJQUFJLENBQUNILFFBQXJCO0FBQ0g7O0FBRUQsWUFBSUcsSUFBSSxDQUFDTCxVQUFMLEtBQW9CTSxTQUF4QixFQUFtQztBQUMvQixlQUFLTixVQUFMLENBQWdCTyxJQUFoQixDQUFxQkYsSUFBSSxDQUFDTCxVQUExQjtBQUNILFNBRkQsTUFFTyxJQUFJSyxJQUFJLENBQUNHLFdBQUwsS0FBcUJGLFNBQXpCLEVBQW9DO0FBQ3ZDLGVBQUtFLFdBQUwsQ0FBaUJELElBQWpCLENBQXNCRixJQUFJLENBQUNHLFdBQTNCO0FBQ0g7O0FBRUQsWUFBSUgsSUFBSSxDQUFDRixNQUFMLEtBQWdCRyxTQUFwQixFQUErQjtBQUMzQixlQUFLSCxNQUFMLEdBQWNFLElBQUksQ0FBQ0YsTUFBbkI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lDb25uZWN0fSBmcm9tIFwiLi4vLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL0ludGVyYWN0aXZpdHkvTW9kZXMvSUNvbm5lY3RcIjtcbmltcG9ydCB7Q29ubmVjdExpbmVMaW5rZWR9IGZyb20gXCIuL0Nvbm5lY3RMaW5lTGlua2VkXCI7XG5pbXBvcnQge0lDb25uZWN0TGluZUxpbmtlZH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L01vZGVzL0lDb25uZWN0TGluZUxpbmtlZFwiO1xuaW1wb3J0IHtNZXNzYWdlc30gZnJvbSBcIi4uLy4uLy4uL1V0aWxzL01lc3NhZ2VzXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0IGltcGxlbWVudHMgSUNvbm5lY3Qge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGxpbmVMaW5rZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGxpbmVfbGlua2VkKCk6IElDb25uZWN0TGluZUxpbmtlZCB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJpbnRlcmFjdGl2aXR5Lm1vZGVzLmNvbm5lY3QubGluZV9saW5rZWRcIiwgXCJpbnRlcmFjdGl2aXR5Lm1vZGVzLmNvbm5lY3QubGluZUxpbmtlZFwiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5saW5lTGlua2VkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGxpbmVMaW5rZWRcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IGxpbmVfbGlua2VkKHZhbHVlOiBJQ29ubmVjdExpbmVMaW5rZWQpIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcImludGVyYWN0aXZpdHkubW9kZXMuY29ubmVjdC5saW5lX2xpbmtlZFwiLCBcImludGVyYWN0aXZpdHkubW9kZXMuY29ubmVjdC5saW5lTGlua2VkXCIpO1xuXG4gICAgICAgIHRoaXMubGluZUxpbmtlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXN0YW5jZTogbnVtYmVyO1xuICAgIHB1YmxpYyBsaW5lTGlua2VkOiBJQ29ubmVjdExpbmVMaW5rZWQ7XG4gICAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSA4MDtcbiAgICAgICAgdGhpcy5saW5lTGlua2VkID0gbmV3IENvbm5lY3RMaW5lTGlua2VkKCk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gNjA7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SUNvbm5lY3Q+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmRpc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gZGF0YS5kaXN0YW5jZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEubGluZUxpbmtlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lTGlua2VkLmxvYWQoZGF0YS5saW5lTGlua2VkKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5saW5lX2xpbmtlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lX2xpbmtlZC5sb2FkKGRhdGEubGluZV9saW5rZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5yYWRpdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaXVzID0gZGF0YS5yYWRpdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=