"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Interactivity = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _InteractivityDetect = require("../../../Enums/InteractivityDetect");

var _Events = require("./Events/Events");

var _Modes = require("./Modes/Modes");

var _Messages = require("../../Utils/Messages");

var Interactivity = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Interactivity, [{
    key: "detect_on",

    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     */
    get: function get() {
      _Messages.Messages.deprecated("interactivity.detect_on", "interactivity.detectsOn");

      return this.detectsOn;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("interactivity.detect_on", "interactivity.detectsOn");

      this.detectsOn = value;
    }
  }]);

  function Interactivity() {
    (0, _classCallCheck2["default"])(this, Interactivity);
    this.detectsOn = void 0;
    this.events = void 0;
    this.modes = void 0;
    this.detectsOn = _InteractivityDetect.InteractivityDetect.canvas;
    this.events = new _Events.Events();
    this.modes = new _Modes.Modes();
  }

  (0, _createClass2["default"])(Interactivity, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.detectsOn !== undefined) {
          this.detectsOn = data.detectsOn;
        } else if (data.detect_on !== undefined) {
          this.detect_on = data.detect_on;
        }

        this.events.load(data.events);
        this.modes.load(data.modes);
      }
    }
  }]);
  return Interactivity;
}();

exports.Interactivity = Interactivity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9JbnRlcmFjdGl2aXR5LnRzIl0sIm5hbWVzIjpbIkludGVyYWN0aXZpdHkiLCJNZXNzYWdlcyIsImRlcHJlY2F0ZWQiLCJkZXRlY3RzT24iLCJ2YWx1ZSIsImV2ZW50cyIsIm1vZGVzIiwiSW50ZXJhY3Rpdml0eURldGVjdCIsImNhbnZhcyIsIkV2ZW50cyIsIk1vZGVzIiwiZGF0YSIsInVuZGVmaW5lZCIsImRldGVjdF9vbiIsImxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFHYUEsYTs7OztBQUNUOzs7O3dCQUk0QztBQUN4Q0MseUJBQVNDLFVBQVQsQ0FBb0IseUJBQXBCLEVBQStDLHlCQUEvQzs7QUFFQSxhQUFPLEtBQUtDLFNBQVo7QUFDSDtBQUVEOzs7Ozs7c0JBS3FCQyxLLEVBQTRCO0FBQzdDSCx5QkFBU0MsVUFBVCxDQUFvQix5QkFBcEIsRUFBK0MseUJBQS9DOztBQUVBLFdBQUtDLFNBQUwsR0FBaUJDLEtBQWpCO0FBQ0g7OztBQU1ELDJCQUFjO0FBQUE7QUFBQSxTQUpQRCxTQUlPO0FBQUEsU0FIUEUsTUFHTztBQUFBLFNBRlBDLEtBRU87QUFDVixTQUFLSCxTQUFMLEdBQWlCSSx5Q0FBb0JDLE1BQXJDO0FBQ0EsU0FBS0gsTUFBTCxHQUFjLElBQUlJLGNBQUosRUFBZDtBQUNBLFNBQUtILEtBQUwsR0FBYSxJQUFJSSxZQUFKLEVBQWI7QUFDSDs7Ozt5QkFFV0MsSSxFQUErQztBQUN2RCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDUixTQUFMLEtBQW1CUyxTQUF2QixFQUFrQztBQUM5QixlQUFLVCxTQUFMLEdBQWlCUSxJQUFJLENBQUNSLFNBQXRCO0FBQ0gsU0FGRCxNQUVPLElBQUlRLElBQUksQ0FBQ0UsU0FBTCxLQUFtQkQsU0FBdkIsRUFBa0M7QUFDckMsZUFBS0MsU0FBTCxHQUFpQkYsSUFBSSxDQUFDRSxTQUF0QjtBQUNIOztBQUVELGFBQUtSLE1BQUwsQ0FBWVMsSUFBWixDQUFpQkgsSUFBSSxDQUFDTixNQUF0QjtBQUNBLGFBQUtDLEtBQUwsQ0FBV1EsSUFBWCxDQUFnQkgsSUFBSSxDQUFDTCxLQUFyQjtBQUNIO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lJbnRlcmFjdGl2aXR5fSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL0ludGVyYWN0aXZpdHkvSUludGVyYWN0aXZpdHlcIjtcbmltcG9ydCB7SW50ZXJhY3Rpdml0eURldGVjdH0gZnJvbSBcIi4uLy4uLy4uL0VudW1zL0ludGVyYWN0aXZpdHlEZXRlY3RcIjtcbmltcG9ydCB7RXZlbnRzfSBmcm9tIFwiLi9FdmVudHMvRXZlbnRzXCI7XG5pbXBvcnQge01vZGVzfSBmcm9tIFwiLi9Nb2Rlcy9Nb2Rlc1wiO1xuaW1wb3J0IHtNZXNzYWdlc30gZnJvbSBcIi4uLy4uL1V0aWxzL01lc3NhZ2VzXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcmFjdGl2aXR5IGltcGxlbWVudHMgSUludGVyYWN0aXZpdHkge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGRldGVjdHNPblxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgZGV0ZWN0X29uKCk6IEludGVyYWN0aXZpdHlEZXRlY3Qge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwiaW50ZXJhY3Rpdml0eS5kZXRlY3Rfb25cIiwgXCJpbnRlcmFjdGl2aXR5LmRldGVjdHNPblwiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5kZXRlY3RzT247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGlzIHByb3BlcnR5IGlzIG9ic29sZXRlLCBwbGVhc2UgdXNlIHRoZSBuZXcgZGV0ZWN0c09uXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHNldCBkZXRlY3Rfb24odmFsdWU6IEludGVyYWN0aXZpdHlEZXRlY3QpIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcImludGVyYWN0aXZpdHkuZGV0ZWN0X29uXCIsIFwiaW50ZXJhY3Rpdml0eS5kZXRlY3RzT25cIik7XG5cbiAgICAgICAgdGhpcy5kZXRlY3RzT24gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGV0ZWN0c09uOiBJbnRlcmFjdGl2aXR5RGV0ZWN0O1xuICAgIHB1YmxpYyBldmVudHM6IEV2ZW50cztcbiAgICBwdWJsaWMgbW9kZXM6IE1vZGVzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGV0ZWN0c09uID0gSW50ZXJhY3Rpdml0eURldGVjdC5jYW52YXM7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICAgICAgICB0aGlzLm1vZGVzID0gbmV3IE1vZGVzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SUludGVyYWN0aXZpdHk+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmRldGVjdHNPbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRlY3RzT24gPSBkYXRhLmRldGVjdHNPbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5kZXRlY3Rfb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0ZWN0X29uID0gZGF0YS5kZXRlY3Rfb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmxvYWQoZGF0YS5ldmVudHMpO1xuICAgICAgICAgICAgdGhpcy5tb2Rlcy5sb2FkKGRhdGEubW9kZXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19