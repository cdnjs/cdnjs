"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Remove = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Messages = require("../../../Utils/Messages");

var Remove = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Remove, [{
    key: "particles_nb",

    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    get: function get() {
      _Messages.Messages.deprecated("interactivity.modes.remove.particles_nb", "interactivity.modes.remove.quantity");

      return this.quantity;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("interactivity.modes.remove.particles_nb", "interactivity.modes.remove.quantity");

      this.quantity = value;
    }
  }]);

  function Remove() {
    (0, _classCallCheck2["default"])(this, Remove);
    this.quantity = void 0;
    this.quantity = 2;
  }

  (0, _createClass2["default"])(Remove, [{
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
  return Remove;
}();

exports.Remove = Remove;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9SZW1vdmUudHMiXSwibmFtZXMiOlsiUmVtb3ZlIiwiTWVzc2FnZXMiLCJkZXByZWNhdGVkIiwicXVhbnRpdHkiLCJ2YWx1ZSIsImRhdGEiLCJ1bmRlZmluZWQiLCJwYXJ0aWNsZXNfbmIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7SUFHYUEsTTs7OztBQUNUOzs7O3dCQUlrQztBQUM5QkMseUJBQVNDLFVBQVQsQ0FBb0IseUNBQXBCLEVBQStELHFDQUEvRDs7QUFFQSxhQUFPLEtBQUtDLFFBQVo7QUFDSDtBQUVEOzs7Ozs7c0JBS3dCQyxLLEVBQWU7QUFDbkNILHlCQUFTQyxVQUFULENBQW9CLHlDQUFwQixFQUErRCxxQ0FBL0Q7O0FBRUEsV0FBS0MsUUFBTCxHQUFnQkMsS0FBaEI7QUFDSDs7O0FBSUQsb0JBQWM7QUFBQTtBQUFBLFNBRlBELFFBRU87QUFDVixTQUFLQSxRQUFMLEdBQWdCLENBQWhCO0FBQ0g7Ozs7eUJBRVdFLEksRUFBd0M7QUFDaEQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlELElBQUksQ0FBQ0YsUUFBTCxLQUFrQkcsU0FBdEIsRUFBaUM7QUFDN0IsZUFBS0gsUUFBTCxHQUFnQkUsSUFBSSxDQUFDRixRQUFyQjtBQUNILFNBRkQsTUFFTyxJQUFJRSxJQUFJLENBQUNFLFlBQUwsS0FBc0JELFNBQTFCLEVBQXFDO0FBQ3hDLGVBQUtDLFlBQUwsR0FBb0JGLElBQUksQ0FBQ0UsWUFBekI7QUFDSDtBQUNKO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lSZW1vdmV9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JUmVtb3ZlXCI7XG5pbXBvcnQge01lc3NhZ2VzfSBmcm9tIFwiLi4vLi4vLi4vVXRpbHMvTWVzc2FnZXNcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIFJlbW92ZSBpbXBsZW1lbnRzIElSZW1vdmUge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IHF1YW50aXR5XG4gICAgICovXG4gICAgcHVibGljIGdldCBwYXJ0aWNsZXNfbmIoKTogbnVtYmVyIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcImludGVyYWN0aXZpdHkubW9kZXMucmVtb3ZlLnBhcnRpY2xlc19uYlwiLCBcImludGVyYWN0aXZpdHkubW9kZXMucmVtb3ZlLnF1YW50aXR5XCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnF1YW50aXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IHF1YW50aXR5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHNldCBwYXJ0aWNsZXNfbmIodmFsdWU6IG51bWJlcikge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwiaW50ZXJhY3Rpdml0eS5tb2Rlcy5yZW1vdmUucGFydGljbGVzX25iXCIsIFwiaW50ZXJhY3Rpdml0eS5tb2Rlcy5yZW1vdmUucXVhbnRpdHlcIik7XG5cbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBxdWFudGl0eTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSAyO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElSZW1vdmU+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnF1YW50aXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1YW50aXR5ID0gZGF0YS5xdWFudGl0eTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5wYXJ0aWNsZXNfbmIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVzX25iID0gZGF0YS5wYXJ0aWNsZXNfbmI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=