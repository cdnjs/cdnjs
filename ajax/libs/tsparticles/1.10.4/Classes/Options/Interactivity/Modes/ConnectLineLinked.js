"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectLineLinked = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var ConnectLineLinked = /*#__PURE__*/function () {
  function ConnectLineLinked() {
    (0, _classCallCheck2["default"])(this, ConnectLineLinked);
    this.opacity = void 0;
    this.opacity = 0.5;
  }

  (0, _createClass2["default"])(ConnectLineLinked, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
      }
    }
  }]);
  return ConnectLineLinked;
}();

exports.ConnectLineLinked = ConnectLineLinked;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9Db25uZWN0TGluZUxpbmtlZC50cyJdLCJuYW1lcyI6WyJDb25uZWN0TGluZUxpbmtlZCIsIm9wYWNpdHkiLCJkYXRhIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBR2FBLGlCO0FBR1QsK0JBQWM7QUFBQTtBQUFBLFNBRlBDLE9BRU87QUFDVixTQUFLQSxPQUFMLEdBQWUsR0FBZjtBQUNIOzs7O3lCQUVXQyxJLEVBQW1EO0FBQzNELFVBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUNwQixZQUFJRCxJQUFJLENBQUNELE9BQUwsS0FBaUJFLFNBQXJCLEVBQWdDO0FBQzVCLGVBQUtGLE9BQUwsR0FBZUMsSUFBSSxDQUFDRCxPQUFwQjtBQUNIO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUNvbm5lY3RMaW5lTGlua2VkfSBmcm9tIFwiLi4vLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL0ludGVyYWN0aXZpdHkvTW9kZXMvSUNvbm5lY3RMaW5lTGlua2VkXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0TGluZUxpbmtlZCBpbXBsZW1lbnRzIElDb25uZWN0TGluZUxpbmtlZCB7XG4gICAgcHVibGljIG9wYWNpdHk6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wYWNpdHkgPSAwLjU7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SUNvbm5lY3RMaW5lTGlua2VkPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5vcGFjaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wYWNpdHkgPSBkYXRhLm9wYWNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=