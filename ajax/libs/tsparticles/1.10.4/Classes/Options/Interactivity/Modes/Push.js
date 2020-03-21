"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Push = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Messages = require("../../../Utils/Messages");

var Push = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Push, [{
    key: "particles_nb",

    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    get: function get() {
      _Messages.Messages.deprecated("interactivity.modes.push.particles_nb", "interactivity.modes.push.quantity");

      return this.quantity;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("interactivity.modes.push.particles_nb", "interactivity.modes.push.quantity");

      this.quantity = value;
    }
  }]);

  function Push() {
    (0, _classCallCheck2["default"])(this, Push);
    this.quantity = void 0;
    this.quantity = 4;
  }

  (0, _createClass2["default"])(Push, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.quantity !== undefined) {
          this.quantity = data.quantity;
        } else if (data.particles_nb !== undefined) {
          this.particles_nb = data.particles_nb;
        }
      }
    }
  }]);
  return Push;
}();

exports.Push = Push;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9QdXNoLnRzIl0sIm5hbWVzIjpbIlB1c2giLCJNZXNzYWdlcyIsImRlcHJlY2F0ZWQiLCJxdWFudGl0eSIsInZhbHVlIiwiZGF0YSIsInVuZGVmaW5lZCIsInBhcnRpY2xlc19uYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztJQUdhQSxJOzs7O0FBQ1Q7Ozs7d0JBSWtDO0FBQzlCQyx5QkFBU0MsVUFBVCxDQUFvQix1Q0FBcEIsRUFBNkQsbUNBQTdEOztBQUVBLGFBQU8sS0FBS0MsUUFBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLd0JDLEssRUFBZTtBQUNuQ0gseUJBQVNDLFVBQVQsQ0FBb0IsdUNBQXBCLEVBQTZELG1DQUE3RDs7QUFFQSxXQUFLQyxRQUFMLEdBQWdCQyxLQUFoQjtBQUNIOzs7QUFJRCxrQkFBYztBQUFBO0FBQUEsU0FGUEQsUUFFTztBQUNWLFNBQUtBLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDSDs7Ozt5QkFFV0UsSSxFQUFzQztBQUM5QyxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDRixRQUFMLEtBQWtCRyxTQUF0QixFQUFpQztBQUM3QixlQUFLSCxRQUFMLEdBQWdCRSxJQUFJLENBQUNGLFFBQXJCO0FBQ0gsU0FGRCxNQUVPLElBQUlFLElBQUksQ0FBQ0UsWUFBTCxLQUFzQkQsU0FBMUIsRUFBcUM7QUFDeEMsZUFBS0MsWUFBTCxHQUFvQkYsSUFBSSxDQUFDRSxZQUF6QjtBQUNIO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVB1c2h9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JUHVzaFwiO1xuaW1wb3J0IHtNZXNzYWdlc30gZnJvbSBcIi4uLy4uLy4uL1V0aWxzL01lc3NhZ2VzXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBQdXNoIGltcGxlbWVudHMgSVB1c2gge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IHF1YW50aXR5XG4gICAgICovXG4gICAgcHVibGljIGdldCBwYXJ0aWNsZXNfbmIoKTogbnVtYmVyIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcImludGVyYWN0aXZpdHkubW9kZXMucHVzaC5wYXJ0aWNsZXNfbmJcIiwgXCJpbnRlcmFjdGl2aXR5Lm1vZGVzLnB1c2gucXVhbnRpdHlcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucXVhbnRpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGlzIHByb3BlcnR5IGlzIG9ic29sZXRlLCBwbGVhc2UgdXNlIHRoZSBuZXcgcXVhbnRpdHlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IHBhcnRpY2xlc19uYih2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJpbnRlcmFjdGl2aXR5Lm1vZGVzLnB1c2gucGFydGljbGVzX25iXCIsIFwiaW50ZXJhY3Rpdml0eS5tb2Rlcy5wdXNoLnF1YW50aXR5XCIpO1xuXG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcXVhbnRpdHk6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnF1YW50aXR5ID0gNDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChkYXRhPzogUmVjdXJzaXZlUGFydGlhbDxJUHVzaD4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGRhdGEucXVhbnRpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSBkYXRhLnF1YW50aXR5O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnBhcnRpY2xlc19uYiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNfbmIgPSBkYXRhLnBhcnRpY2xlc19uYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==