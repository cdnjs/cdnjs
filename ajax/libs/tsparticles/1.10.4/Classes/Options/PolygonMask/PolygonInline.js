"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolygonInline = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _PolygonMaskInlineArrangement = require("../../../Enums/PolygonMaskInlineArrangement");

var PolygonInline = /*#__PURE__*/function () {
  function PolygonInline() {
    (0, _classCallCheck2["default"])(this, PolygonInline);
    this.arrangement = void 0;
    this.arrangement = _PolygonMaskInlineArrangement.PolygonMaskInlineArrangement.onePerPoint;
  }

  (0, _createClass2["default"])(PolygonInline, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.arrangement !== undefined) {
          this.arrangement = data.arrangement;
        }
      }
    }
  }]);
  return PolygonInline;
}();

exports.PolygonInline = PolygonInline;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUG9seWdvbk1hc2svUG9seWdvbklubGluZS50cyJdLCJuYW1lcyI6WyJQb2x5Z29uSW5saW5lIiwiYXJyYW5nZW1lbnQiLCJQb2x5Z29uTWFza0lubGluZUFycmFuZ2VtZW50Iiwib25lUGVyUG9pbnQiLCJkYXRhIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBR2FBLGE7QUFHVCwyQkFBYztBQUFBO0FBQUEsU0FGUEMsV0FFTztBQUNWLFNBQUtBLFdBQUwsR0FBbUJDLDJEQUE2QkMsV0FBaEQ7QUFDSDs7Ozt5QkFFV0MsSSxFQUErQztBQUN2RCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDSCxXQUFMLEtBQXFCSSxTQUF6QixFQUFvQztBQUNoQyxlQUFLSixXQUFMLEdBQW1CRyxJQUFJLENBQUNILFdBQXhCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUG9seWdvbklubGluZX0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9Qb2x5Z29uTWFzay9JUG9seWdvbklubGluZVwiO1xuaW1wb3J0IHtQb2x5Z29uTWFza0lubGluZUFycmFuZ2VtZW50fSBmcm9tIFwiLi4vLi4vLi4vRW51bXMvUG9seWdvbk1hc2tJbmxpbmVBcnJhbmdlbWVudFwiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgUG9seWdvbklubGluZSBpbXBsZW1lbnRzIElQb2x5Z29uSW5saW5lIHtcbiAgICBwdWJsaWMgYXJyYW5nZW1lbnQ6IFBvbHlnb25NYXNrSW5saW5lQXJyYW5nZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hcnJhbmdlbWVudCA9IFBvbHlnb25NYXNrSW5saW5lQXJyYW5nZW1lbnQub25lUGVyUG9pbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SVBvbHlnb25JbmxpbmU+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmFycmFuZ2VtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmFuZ2VtZW50ID0gZGF0YS5hcnJhbmdlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==