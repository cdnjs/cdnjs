"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messages = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
var Messages = /*#__PURE__*/function () {
  function Messages() {
    (0, _classCallCheck2["default"])(this, Messages);
  }

  (0, _createClass2["default"])(Messages, null, [{
    key: "deprecated",
    value: function deprecated(oldProperty, newProperty) {
      if (console) {
        var obsolete = "The property ".concat(oldProperty, " is obsolete and will be removed in a future release.");
        var useNew = "Please use the new property ".concat(newProperty, ".");
        console.warn("".concat(obsolete, " ").concat(useNew));
      }
    }
  }]);
  return Messages;
}();

exports.Messages = Messages;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL1V0aWxzL01lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbIk1lc3NhZ2VzIiwib2xkUHJvcGVydHkiLCJuZXdQcm9wZXJ0eSIsImNvbnNvbGUiLCJvYnNvbGV0ZSIsInVzZU5ldyIsIndhcm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUVhQSxROzs7Ozs7OytCQUNnQkMsVyxFQUFxQkMsVyxFQUEyQjtBQUNyRSxVQUFJQyxPQUFKLEVBQWE7QUFDVCxZQUFNQyxRQUFRLDBCQUFrQkgsV0FBbEIsMERBQWQ7QUFDQSxZQUFNSSxNQUFNLHlDQUFrQ0gsV0FBbEMsTUFBWjtBQUNBQyxRQUFBQSxPQUFPLENBQUNHLElBQVIsV0FBZ0JGLFFBQWhCLGNBQTRCQyxNQUE1QjtBQUNIO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQgbm8tY29uc29sZTogW1wiZXJyb3JcIiwgeyBhbGxvdzogW1wid2FyblwiLCBcImVycm9yXCJdIH1dICovXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlcyB7XG4gICAgcHVibGljIHN0YXRpYyBkZXByZWNhdGVkKG9sZFByb3BlcnR5OiBzdHJpbmcsIG5ld1Byb3BlcnR5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNvbnNvbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG9ic29sZXRlID1gVGhlIHByb3BlcnR5ICR7b2xkUHJvcGVydHl9IGlzIG9ic29sZXRlIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZS5gO1xuICAgICAgICAgICAgY29uc3QgdXNlTmV3ID0gYFBsZWFzZSB1c2UgdGhlIG5ldyBwcm9wZXJ0eSAke25ld1Byb3BlcnR5fS5gO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke29ic29sZXRlfSAke3VzZU5ld31gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==