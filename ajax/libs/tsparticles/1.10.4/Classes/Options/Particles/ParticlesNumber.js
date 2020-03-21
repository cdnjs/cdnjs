"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticlesNumber = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Density = require("./Density");

var _Messages = require("../../Utils/Messages");

var ParticlesNumber = /*#__PURE__*/function () {
  (0, _createClass2["default"])(ParticlesNumber, [{
    key: "max",

    /**
     * @deprecated the max property is deprecated, please use the new limit
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.max", "particles.limit");

      return this.limit;
    }
    /**
     * @deprecated the max property is deprecated, please use the new limit
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.max", "particles.limit");

      this.limit = value;
    }
  }]);

  function ParticlesNumber() {
    (0, _classCallCheck2["default"])(this, ParticlesNumber);
    this.density = void 0;
    this.limit = void 0;
    this.value = void 0;
    this.density = new _Density.Density();
    this.limit = 0;
    this.value = 400;
  }

  (0, _createClass2["default"])(ParticlesNumber, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        this.density.load(data.density);

        if (data.max !== undefined) {
          this.max = data.max;
        } else if (data.limit !== undefined) {
          this.limit = data.limit;
        }

        if (data.value !== undefined) {
          this.value = data.value;
        }
      }
    }
  }]);
  return ParticlesNumber;
}();

exports.ParticlesNumber = ParticlesNumber;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1BhcnRpY2xlc051bWJlci50cyJdLCJuYW1lcyI6WyJQYXJ0aWNsZXNOdW1iZXIiLCJNZXNzYWdlcyIsImRlcHJlY2F0ZWQiLCJsaW1pdCIsInZhbHVlIiwiZGVuc2l0eSIsIkRlbnNpdHkiLCJkYXRhIiwidW5kZWZpbmVkIiwibG9hZCIsIm1heCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztJQUdhQSxlOzs7O0FBQ1Q7Ozt3QkFHa0I7QUFDZEMseUJBQVNDLFVBQVQsQ0FBb0IsZUFBcEIsRUFBcUMsaUJBQXJDOztBQUVBLGFBQU8sS0FBS0MsS0FBWjtBQUNIO0FBRUQ7Ozs7c0JBR1FDLEssRUFBZTtBQUNuQkgseUJBQVNDLFVBQVQsQ0FBb0IsZUFBcEIsRUFBcUMsaUJBQXJDOztBQUVBLFdBQUtDLEtBQUwsR0FBYUMsS0FBYjtBQUNIOzs7QUFNRCw2QkFBYztBQUFBO0FBQUEsU0FKUEMsT0FJTztBQUFBLFNBSFBGLEtBR087QUFBQSxTQUZQQyxLQUVPO0FBQ1YsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGdCQUFKLEVBQWY7QUFDQSxTQUFLSCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxHQUFiO0FBQ0g7Ozs7eUJBRVdHLEksRUFBaUQ7QUFDekQsVUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQ3BCLGFBQUtILE9BQUwsQ0FBYUksSUFBYixDQUFrQkYsSUFBSSxDQUFDRixPQUF2Qjs7QUFFQSxZQUFJRSxJQUFJLENBQUNHLEdBQUwsS0FBYUYsU0FBakIsRUFBNEI7QUFDeEIsZUFBS0UsR0FBTCxHQUFXSCxJQUFJLENBQUNHLEdBQWhCO0FBQ0gsU0FGRCxNQUVPLElBQUlILElBQUksQ0FBQ0osS0FBTCxLQUFlSyxTQUFuQixFQUE4QjtBQUNqQyxlQUFLTCxLQUFMLEdBQWFJLElBQUksQ0FBQ0osS0FBbEI7QUFDSDs7QUFFRCxZQUFJSSxJQUFJLENBQUNILEtBQUwsS0FBZUksU0FBbkIsRUFBOEI7QUFDMUIsZUFBS0osS0FBTCxHQUFhRyxJQUFJLENBQUNILEtBQWxCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUGFydGljbGVzTnVtYmVyfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9JUGFydGljbGVzTnVtYmVyXCI7XG5pbXBvcnQge0lEZW5zaXR5fSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9JRGVuc2l0eVwiO1xuaW1wb3J0IHtEZW5zaXR5fSBmcm9tIFwiLi9EZW5zaXR5XCI7XG5pbXBvcnQge01lc3NhZ2VzfSBmcm9tIFwiLi4vLi4vVXRpbHMvTWVzc2FnZXNcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uLy4uLy4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcblxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlc051bWJlciBpbXBsZW1lbnRzIElQYXJ0aWNsZXNOdW1iZXIge1xuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHRoZSBtYXggcHJvcGVydHkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB0aGUgbmV3IGxpbWl0XG4gICAgICovXG4gICAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwicGFydGljbGVzLm1heFwiLCBcInBhcnRpY2xlcy5saW1pdFwiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5saW1pdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCB0aGUgbWF4IHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdGhlIG5ldyBsaW1pdFxuICAgICAqL1xuICAgIHNldCBtYXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwicGFydGljbGVzLm1heFwiLCBcInBhcnRpY2xlcy5saW1pdFwiKTtcblxuICAgICAgICB0aGlzLmxpbWl0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbnNpdHk6IElEZW5zaXR5O1xuICAgIHB1YmxpYyBsaW1pdDogbnVtYmVyO1xuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGVuc2l0eSA9IG5ldyBEZW5zaXR5KCk7XG4gICAgICAgIHRoaXMubGltaXQgPSAwO1xuICAgICAgICB0aGlzLnZhbHVlID0gNDAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElQYXJ0aWNsZXNOdW1iZXI+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVuc2l0eS5sb2FkKGRhdGEuZGVuc2l0eSk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXggPSBkYXRhLm1heDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5saW1pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW1pdCA9IGRhdGEubGltaXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==