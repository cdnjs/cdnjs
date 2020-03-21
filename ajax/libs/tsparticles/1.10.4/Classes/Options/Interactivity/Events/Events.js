"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ClickEvent = require("./ClickEvent");

var _DivEvent = require("./DivEvent");

var _HoverEvent = require("./HoverEvent");

var _Messages = require("../../../Utils/Messages");

var Events = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Events, [{
    key: "onclick",

    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     */
    get: function get() {
      _Messages.Messages.deprecated("interactivity.events.onclick", "interactivity.events.onClick");

      return this.onClick;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("interactivity.events.onclick", "interactivity.events.onClick");

      this.onClick = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     */

  }, {
    key: "ondiv",
    get: function get() {
      _Messages.Messages.deprecated("interactivity.events.ondiv", "interactivity.events.onDiv");

      return this.onDiv;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("interactivity.events.ondiv", "interactivity.events.onDiv");

      this.onDiv = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     */

  }, {
    key: "onhover",
    get: function get() {
      _Messages.Messages.deprecated("interactivity.events.onhover", "interactivity.events.onHover");

      return this.onHover;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("interactivity.events.onhover", "interactivity.events.onHover");

      this.onHover = value;
    }
  }]);

  function Events() {
    (0, _classCallCheck2["default"])(this, Events);
    this.onClick = void 0;
    this.onDiv = void 0;
    this.onHover = void 0;
    this.resize = void 0;
    this.onClick = new _ClickEvent.ClickEvent();
    this.onDiv = new _DivEvent.DivEvent();
    this.onHover = new _HoverEvent.HoverEvent();
    this.resize = true;
  }

  (0, _createClass2["default"])(Events, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.onClick !== undefined) {
          this.onClick.load(data.onClick);
        } else if (data.onclick !== undefined) {
          this.onclick.load(data.onclick);
        }

        if (data.onDiv !== undefined) {
          this.onDiv.load(data.onDiv);
        } else if (data.ondiv !== undefined) {
          this.ondiv.load(data.ondiv);
        }

        if (data.onHover !== undefined) {
          this.onHover.load(data.onHover);
        } else if (data.onhover !== undefined) {
          this.onhover.load(data.onhover);
        }

        if (data.resize !== undefined) {
          this.resize = data.resize;
        }
      }
    }
  }]);
  return Events;
}();

exports.Events = Events;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9FdmVudHMvRXZlbnRzLnRzIl0sIm5hbWVzIjpbIkV2ZW50cyIsIk1lc3NhZ2VzIiwiZGVwcmVjYXRlZCIsIm9uQ2xpY2siLCJ2YWx1ZSIsIm9uRGl2Iiwib25Ib3ZlciIsInJlc2l6ZSIsIkNsaWNrRXZlbnQiLCJEaXZFdmVudCIsIkhvdmVyRXZlbnQiLCJkYXRhIiwidW5kZWZpbmVkIiwibG9hZCIsIm9uY2xpY2siLCJvbmRpdiIsIm9uaG92ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFHQTs7QUFDQTs7QUFFQTs7SUFHYUEsTTs7OztBQUNUOzs7O3dCQUlrQztBQUM5QkMseUJBQVNDLFVBQVQsQ0FBb0IsOEJBQXBCLEVBQW9ELDhCQUFwRDs7QUFFQSxhQUFPLEtBQUtDLE9BQVo7QUFDSDtBQUVEOzs7Ozs7c0JBS21CQyxLLEVBQW9CO0FBQ25DSCx5QkFBU0MsVUFBVCxDQUFvQiw4QkFBcEIsRUFBb0QsOEJBQXBEOztBQUVBLFdBQUtDLE9BQUwsR0FBZUMsS0FBZjtBQUNIO0FBRUQ7Ozs7Ozs7d0JBSThCO0FBQzFCSCx5QkFBU0MsVUFBVCxDQUFvQiw0QkFBcEIsRUFBa0QsNEJBQWxEOztBQUVBLGFBQU8sS0FBS0csS0FBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLaUJELEssRUFBa0I7QUFDL0JILHlCQUFTQyxVQUFULENBQW9CLDRCQUFwQixFQUFrRCw0QkFBbEQ7O0FBRUEsV0FBS0csS0FBTCxHQUFhRCxLQUFiO0FBQ0g7QUFFRDs7Ozs7Ozt3QkFJa0M7QUFDOUJILHlCQUFTQyxVQUFULENBQW9CLDhCQUFwQixFQUFvRCw4QkFBcEQ7O0FBRUEsYUFBTyxLQUFLSSxPQUFaO0FBQ0g7QUFFRDs7Ozs7O3NCQUttQkYsSyxFQUFvQjtBQUNuQ0gseUJBQVNDLFVBQVQsQ0FBb0IsOEJBQXBCLEVBQW9ELDhCQUFwRDs7QUFFQSxXQUFLSSxPQUFMLEdBQWVGLEtBQWY7QUFDSDs7O0FBT0Qsb0JBQWM7QUFBQTtBQUFBLFNBTFBELE9BS087QUFBQSxTQUpQRSxLQUlPO0FBQUEsU0FIUEMsT0FHTztBQUFBLFNBRlBDLE1BRU87QUFDVixTQUFLSixPQUFMLEdBQWUsSUFBSUssc0JBQUosRUFBZjtBQUNBLFNBQUtILEtBQUwsR0FBYSxJQUFJSSxrQkFBSixFQUFiO0FBQ0EsU0FBS0gsT0FBTCxHQUFlLElBQUlJLHNCQUFKLEVBQWY7QUFDQSxTQUFLSCxNQUFMLEdBQWMsSUFBZDtBQUNIOzs7O3lCQUVXSSxJLEVBQXdDO0FBQ2hELFVBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUNwQixZQUFJRCxJQUFJLENBQUNSLE9BQUwsS0FBaUJTLFNBQXJCLEVBQWdDO0FBQzVCLGVBQUtULE9BQUwsQ0FBYVUsSUFBYixDQUFrQkYsSUFBSSxDQUFDUixPQUF2QjtBQUNILFNBRkQsTUFFTyxJQUFJUSxJQUFJLENBQUNHLE9BQUwsS0FBaUJGLFNBQXJCLEVBQWdDO0FBQ25DLGVBQUtFLE9BQUwsQ0FBYUQsSUFBYixDQUFrQkYsSUFBSSxDQUFDRyxPQUF2QjtBQUNIOztBQUVELFlBQUlILElBQUksQ0FBQ04sS0FBTCxLQUFlTyxTQUFuQixFQUE4QjtBQUMxQixlQUFLUCxLQUFMLENBQVdRLElBQVgsQ0FBZ0JGLElBQUksQ0FBQ04sS0FBckI7QUFDSCxTQUZELE1BRU8sSUFBSU0sSUFBSSxDQUFDSSxLQUFMLEtBQWVILFNBQW5CLEVBQThCO0FBQ2pDLGVBQUtHLEtBQUwsQ0FBV0YsSUFBWCxDQUFnQkYsSUFBSSxDQUFDSSxLQUFyQjtBQUNIOztBQUVELFlBQUlKLElBQUksQ0FBQ0wsT0FBTCxLQUFpQk0sU0FBckIsRUFBZ0M7QUFDNUIsZUFBS04sT0FBTCxDQUFhTyxJQUFiLENBQWtCRixJQUFJLENBQUNMLE9BQXZCO0FBQ0gsU0FGRCxNQUVPLElBQUlLLElBQUksQ0FBQ0ssT0FBTCxLQUFpQkosU0FBckIsRUFBZ0M7QUFDbkMsZUFBS0ksT0FBTCxDQUFhSCxJQUFiLENBQWtCRixJQUFJLENBQUNLLE9BQXZCO0FBQ0g7O0FBRUQsWUFBSUwsSUFBSSxDQUFDSixNQUFMLEtBQWdCSyxTQUFwQixFQUErQjtBQUMzQixlQUFLTCxNQUFMLEdBQWNJLElBQUksQ0FBQ0osTUFBbkI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lFdmVudHN9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSUV2ZW50c1wiO1xuaW1wb3J0IHtDbGlja0V2ZW50fSBmcm9tIFwiLi9DbGlja0V2ZW50XCI7XG5pbXBvcnQge0lEaXZFdmVudH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L0V2ZW50cy9JRGl2RXZlbnRcIjtcbmltcG9ydCB7SUhvdmVyRXZlbnR9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSUhvdmVyRXZlbnRcIjtcbmltcG9ydCB7RGl2RXZlbnR9IGZyb20gXCIuL0RpdkV2ZW50XCI7XG5pbXBvcnQge0hvdmVyRXZlbnR9IGZyb20gXCIuL0hvdmVyRXZlbnRcIjtcbmltcG9ydCB7SUNsaWNrRXZlbnR9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9FdmVudHMvSUNsaWNrRXZlbnRcIjtcbmltcG9ydCB7TWVzc2FnZXN9IGZyb20gXCIuLi8uLi8uLi9VdGlscy9NZXNzYWdlc1wiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgRXZlbnRzIGltcGxlbWVudHMgSUV2ZW50cyB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGlzIHByb3BlcnR5IGlzIG9ic29sZXRlLCBwbGVhc2UgdXNlIHRoZSBuZXcgb25DbGlja1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgb25jbGljaygpOiBJQ2xpY2tFdmVudCB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJpbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrXCIsIFwiaW50ZXJhY3Rpdml0eS5ldmVudHMub25DbGlja1wiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5vbkNsaWNrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IG9uQ2xpY2tcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IG9uY2xpY2sodmFsdWU6IElDbGlja0V2ZW50KSB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJpbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrXCIsIFwiaW50ZXJhY3Rpdml0eS5ldmVudHMub25DbGlja1wiKTtcblxuICAgICAgICB0aGlzLm9uQ2xpY2sgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyBvbkRpdlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgb25kaXYoKTogSURpdkV2ZW50IHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcImludGVyYWN0aXZpdHkuZXZlbnRzLm9uZGl2XCIsIFwiaW50ZXJhY3Rpdml0eS5ldmVudHMub25EaXZcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub25EaXY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGlzIHByb3BlcnR5IGlzIG9ic29sZXRlLCBwbGVhc2UgdXNlIHRoZSBuZXcgb25EaXZcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IG9uZGl2KHZhbHVlOiBJRGl2RXZlbnQpIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcImludGVyYWN0aXZpdHkuZXZlbnRzLm9uZGl2XCIsIFwiaW50ZXJhY3Rpdml0eS5ldmVudHMub25EaXZcIik7XG5cbiAgICAgICAgdGhpcy5vbkRpdiA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IG9uSG92ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IG9uaG92ZXIoKTogSUhvdmVyRXZlbnQge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwiaW50ZXJhY3Rpdml0eS5ldmVudHMub25ob3ZlclwiLCBcImludGVyYWN0aXZpdHkuZXZlbnRzLm9uSG92ZXJcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub25Ib3ZlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyBvbkhvdmVyXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHNldCBvbmhvdmVyKHZhbHVlOiBJSG92ZXJFdmVudCkge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwiaW50ZXJhY3Rpdml0eS5ldmVudHMub25ob3ZlclwiLCBcImludGVyYWN0aXZpdHkuZXZlbnRzLm9uSG92ZXJcIik7XG5cbiAgICAgICAgdGhpcy5vbkhvdmVyID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2s6IElDbGlja0V2ZW50O1xuICAgIHB1YmxpYyBvbkRpdjogSURpdkV2ZW50O1xuICAgIHB1YmxpYyBvbkhvdmVyOiBJSG92ZXJFdmVudDtcbiAgICBwdWJsaWMgcmVzaXplOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub25DbGljayA9IG5ldyBDbGlja0V2ZW50KCk7XG4gICAgICAgIHRoaXMub25EaXYgPSBuZXcgRGl2RXZlbnQoKTtcbiAgICAgICAgdGhpcy5vbkhvdmVyID0gbmV3IEhvdmVyRXZlbnQoKTtcbiAgICAgICAgdGhpcy5yZXNpemUgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElFdmVudHM+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLm9uQ2xpY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DbGljay5sb2FkKGRhdGEub25DbGljayk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEub25jbGljayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNsaWNrLmxvYWQoZGF0YS5vbmNsaWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEub25EaXYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25EaXYubG9hZChkYXRhLm9uRGl2KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5vbmRpdiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmRpdi5sb2FkKGRhdGEub25kaXYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5vbkhvdmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG92ZXIubG9hZChkYXRhLm9uSG92ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLm9uaG92ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25ob3Zlci5sb2FkKGRhdGEub25ob3Zlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnJlc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUgPSBkYXRhLnJlc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==