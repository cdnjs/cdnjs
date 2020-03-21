"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shape = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ShapeType = require("../../../../Enums/ShapeType");

var _CharacterShape = require("./CharacterShape");

var _ImageShape = require("./ImageShape");

var _PolygonShape = require("./PolygonShape");

var _Stroke = require("./Stroke");

var Shape = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Shape, [{
    key: "images",

    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    get: function get() {
      if (this.image instanceof Array) {
        return this.image;
      }

      return [];
    }
    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    ,
    set: function set(value) {
      this.image = value;
    }
  }]);

  function Shape() {
    (0, _classCallCheck2["default"])(this, Shape);
    this.character = void 0;
    this.image = void 0;
    this.polygon = void 0;
    this.stroke = void 0;
    this.type = void 0;
    this.character = new _CharacterShape.CharacterShape();
    this.image = new _ImageShape.ImageShape();
    this.polygon = new _PolygonShape.PolygonShape();
    this.stroke = new _Stroke.Stroke();
    this.type = _ShapeType.ShapeType.circle;
  }

  (0, _createClass2["default"])(Shape, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.character !== undefined) {
          if (data.character instanceof Array) {
            this.character = data.character.map(function (s) {
              var tmp = new _CharacterShape.CharacterShape();
              tmp.load(s);
              return tmp;
            });
          } else {
            this.character = new _CharacterShape.CharacterShape();
            this.character.load(data.character);
          }
        }

        if (data.image !== undefined) {
          if (data.image instanceof Array) {
            this.image = data.image.map(function (s) {
              var tmp = new _ImageShape.ImageShape();
              tmp.load(s);
              return tmp;
            });
          } else {
            this.image = new _ImageShape.ImageShape();
            this.image.load(data.image);
          }
        }

        this.stroke.load(data.stroke);
        this.polygon.load(data.polygon);

        if (data.type !== undefined) {
          this.type = data.type;
        }
      }
    }
  }]);
  return Shape;
}();

exports.Shape = Shape;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL1NoYXBlL1NoYXBlLnRzIl0sIm5hbWVzIjpbIlNoYXBlIiwiaW1hZ2UiLCJBcnJheSIsInZhbHVlIiwiY2hhcmFjdGVyIiwicG9seWdvbiIsInN0cm9rZSIsInR5cGUiLCJDaGFyYWN0ZXJTaGFwZSIsIkltYWdlU2hhcGUiLCJQb2x5Z29uU2hhcGUiLCJTdHJva2UiLCJTaGFwZVR5cGUiLCJjaXJjbGUiLCJkYXRhIiwidW5kZWZpbmVkIiwibWFwIiwicyIsInRtcCIsImxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFPYUEsSzs7OztBQUNUOzs7d0JBRzRCO0FBQ3hCLFVBQUksS0FBS0MsS0FBTCxZQUFzQkMsS0FBMUIsRUFBaUM7QUFDN0IsZUFBTyxLQUFLRCxLQUFaO0FBQ0g7O0FBRUQsYUFBTyxFQUFQO0FBQ0g7QUFFRDs7OztzQkFHV0UsSyxFQUFzQjtBQUM3QixXQUFLRixLQUFMLEdBQWFFLEtBQWI7QUFDSDs7O0FBUUQsbUJBQWM7QUFBQTtBQUFBLFNBTlBDLFNBTU87QUFBQSxTQUxQSCxLQUtPO0FBQUEsU0FKUEksT0FJTztBQUFBLFNBSFBDLE1BR087QUFBQSxTQUZQQyxJQUVPO0FBQ1YsU0FBS0gsU0FBTCxHQUFpQixJQUFJSSw4QkFBSixFQUFqQjtBQUNBLFNBQUtQLEtBQUwsR0FBYSxJQUFJUSxzQkFBSixFQUFiO0FBQ0EsU0FBS0osT0FBTCxHQUFlLElBQUlLLDBCQUFKLEVBQWY7QUFDQSxTQUFLSixNQUFMLEdBQWMsSUFBSUssY0FBSixFQUFkO0FBQ0EsU0FBS0osSUFBTCxHQUFZSyxxQkFBVUMsTUFBdEI7QUFDSDs7Ozt5QkFFV0MsSSxFQUF1QztBQUMvQyxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsWUFBSUQsSUFBSSxDQUFDVixTQUFMLEtBQW1CVyxTQUF2QixFQUFrQztBQUM5QixjQUFJRCxJQUFJLENBQUNWLFNBQUwsWUFBMEJGLEtBQTlCLEVBQXFDO0FBQ2pDLGlCQUFLRSxTQUFMLEdBQWlCVSxJQUFJLENBQUNWLFNBQUwsQ0FBZVksR0FBZixDQUFtQixVQUFDQyxDQUFELEVBQU87QUFDdkMsa0JBQU1DLEdBQUcsR0FBRyxJQUFJViw4QkFBSixFQUFaO0FBRUFVLGNBQUFBLEdBQUcsQ0FBQ0MsSUFBSixDQUFTRixDQUFUO0FBRUEscUJBQU9DLEdBQVA7QUFDSCxhQU5nQixDQUFqQjtBQU9ILFdBUkQsTUFRTztBQUNILGlCQUFLZCxTQUFMLEdBQWlCLElBQUlJLDhCQUFKLEVBQWpCO0FBQ0EsaUJBQUtKLFNBQUwsQ0FBZWUsSUFBZixDQUFvQkwsSUFBSSxDQUFDVixTQUF6QjtBQUNIO0FBQ0o7O0FBRUQsWUFBSVUsSUFBSSxDQUFDYixLQUFMLEtBQWVjLFNBQW5CLEVBQThCO0FBQzFCLGNBQUlELElBQUksQ0FBQ2IsS0FBTCxZQUFzQkMsS0FBMUIsRUFBaUM7QUFDN0IsaUJBQUtELEtBQUwsR0FBYWEsSUFBSSxDQUFDYixLQUFMLENBQVdlLEdBQVgsQ0FBZSxVQUFDQyxDQUFELEVBQU87QUFDL0Isa0JBQU1DLEdBQUcsR0FBRyxJQUFJVCxzQkFBSixFQUFaO0FBRUFTLGNBQUFBLEdBQUcsQ0FBQ0MsSUFBSixDQUFTRixDQUFUO0FBRUEscUJBQU9DLEdBQVA7QUFDSCxhQU5ZLENBQWI7QUFPSCxXQVJELE1BUU87QUFDSCxpQkFBS2pCLEtBQUwsR0FBYSxJQUFJUSxzQkFBSixFQUFiO0FBQ0EsaUJBQUtSLEtBQUwsQ0FBV2tCLElBQVgsQ0FBZ0JMLElBQUksQ0FBQ2IsS0FBckI7QUFDSDtBQUNKOztBQUVELGFBQUtLLE1BQUwsQ0FBWWEsSUFBWixDQUFpQkwsSUFBSSxDQUFDUixNQUF0QjtBQUNBLGFBQUtELE9BQUwsQ0FBYWMsSUFBYixDQUFrQkwsSUFBSSxDQUFDVCxPQUF2Qjs7QUFFQSxZQUFJUyxJQUFJLENBQUNQLElBQUwsS0FBY1EsU0FBbEIsRUFBNkI7QUFDekIsZUFBS1IsSUFBTCxHQUFZTyxJQUFJLENBQUNQLElBQWpCO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJU2hhcGV9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL1NoYXBlL0lTaGFwZVwiO1xuaW1wb3J0IHtTaGFwZVR5cGV9IGZyb20gXCIuLi8uLi8uLi8uLi9FbnVtcy9TaGFwZVR5cGVcIjtcbmltcG9ydCB7Q2hhcmFjdGVyU2hhcGV9IGZyb20gXCIuL0NoYXJhY3RlclNoYXBlXCI7XG5pbXBvcnQge0ltYWdlU2hhcGV9IGZyb20gXCIuL0ltYWdlU2hhcGVcIjtcbmltcG9ydCB7UG9seWdvblNoYXBlfSBmcm9tIFwiLi9Qb2x5Z29uU2hhcGVcIjtcbmltcG9ydCB7U3Ryb2tlfSBmcm9tIFwiLi9TdHJva2VcIjtcbmltcG9ydCB7SUltYWdlU2hhcGV9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL1NoYXBlL0lJbWFnZVNoYXBlXCI7XG5pbXBvcnQge0lDaGFyYWN0ZXJTaGFwZX0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvU2hhcGUvSUNoYXJhY3RlclNoYXBlXCI7XG5pbXBvcnQge0lQb2x5Z29uU2hhcGV9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL1NoYXBlL0lQb2x5Z29uU2hhcGVcIjtcbmltcG9ydCB7SVN0cm9rZX0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvU2hhcGUvSVN0cm9rZVwiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwZXMvUmVjdXJzaXZlUGFydGlhbFwiO1xuXG5leHBvcnQgY2xhc3MgU2hhcGUgaW1wbGVtZW50cyBJU2hhcGUge1xuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHRoZSBwcm9wZXJ0eSBpbWFnZXMgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB0aGUgaW1hZ2UgcHJvcGVydHksIGl0IHdvcmtzIHdpdGggb25lIGFuZCBtYW55XG4gICAgICovXG4gICAgZ2V0IGltYWdlcygpOiBJSW1hZ2VTaGFwZVtdIHtcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhlIHByb3BlcnR5IGltYWdlcyBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIHRoZSBpbWFnZSBwcm9wZXJ0eSwgaXQgd29ya3Mgd2l0aCBvbmUgYW5kIG1hbnlcbiAgICAgKi9cbiAgICBzZXQgaW1hZ2VzKHZhbHVlOiBJSW1hZ2VTaGFwZVtdKSB7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hhcmFjdGVyOiBJQ2hhcmFjdGVyU2hhcGUgfCBJQ2hhcmFjdGVyU2hhcGVbXTtcbiAgICBwdWJsaWMgaW1hZ2U6IElJbWFnZVNoYXBlIHwgSUltYWdlU2hhcGVbXTtcbiAgICBwdWJsaWMgcG9seWdvbjogSVBvbHlnb25TaGFwZTtcbiAgICBwdWJsaWMgc3Ryb2tlOiBJU3Ryb2tlO1xuICAgIHB1YmxpYyB0eXBlOiBTaGFwZVR5cGUgfCBTaGFwZVR5cGVbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IG5ldyBDaGFyYWN0ZXJTaGFwZSgpO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlU2hhcGUoKTtcbiAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb25TaGFwZSgpO1xuICAgICAgICB0aGlzLnN0cm9rZSA9IG5ldyBTdHJva2UoKTtcbiAgICAgICAgdGhpcy50eXBlID0gU2hhcGVUeXBlLmNpcmNsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChkYXRhPzogUmVjdXJzaXZlUGFydGlhbDxJU2hhcGU+KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmNoYXJhY3RlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY2hhcmFjdGVyIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBkYXRhLmNoYXJhY3Rlci5tYXAoKHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IG5ldyBDaGFyYWN0ZXJTaGFwZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAubG9hZChzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBuZXcgQ2hhcmFjdGVyU2hhcGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXIubG9hZChkYXRhLmNoYXJhY3Rlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5pbWFnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaW1hZ2UgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlID0gZGF0YS5pbWFnZS5tYXAoKHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IG5ldyBJbWFnZVNoYXBlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5sb2FkKHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlU2hhcGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZS5sb2FkKGRhdGEuaW1hZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdHJva2UubG9hZChkYXRhLnN0cm9rZSk7XG4gICAgICAgICAgICB0aGlzLnBvbHlnb24ubG9hZChkYXRhLnBvbHlnb24pO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==