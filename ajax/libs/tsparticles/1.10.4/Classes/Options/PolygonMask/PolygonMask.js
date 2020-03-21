"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolygonMask = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _PolygonMaskType = require("../../../Enums/PolygonMaskType");

var _Draw = require("./Draw");

var _Move = require("./Move");

var _Messages = require("../../Utils/Messages");

var _PolygonInline = require("./PolygonInline");

var PolygonMask = /*#__PURE__*/function () {
  (0, _createClass2["default"])(PolygonMask, [{
    key: "inlineArrangement",

    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    get: function get() {
      _Messages.Messages.deprecated("polygon.inlineArrangement", "polygon.inline.arrangement");

      return this.inline.arrangement;
    }
    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("polygon.inlineArrangement", "polygon.inline.arrangement");

      this.inline.arrangement = value;
    }
  }]);

  function PolygonMask() {
    (0, _classCallCheck2["default"])(this, PolygonMask);
    this.draw = void 0;
    this.enable = void 0;
    this.inline = void 0;
    this.move = void 0;
    this.scale = void 0;
    this.type = void 0;
    this.url = void 0;
    this.draw = new _Draw.Draw();
    this.enable = false;
    this.inline = new _PolygonInline.PolygonInline();
    this.move = new _Move.Move();
    this.scale = 1;
    this.type = _PolygonMaskType.PolygonMaskType.none;
    this.url = "";
  }

  (0, _createClass2["default"])(PolygonMask, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        this.draw.load(data.draw);

        if (data.inline !== undefined) {
          this.inline.load(data.inline);
        } else if (data.inlineArrangement !== undefined) {
          this.inlineArrangement = data.inlineArrangement;
        }

        this.move.load(data.move);

        if (data.scale !== undefined) {
          this.scale = data.scale;
        }

        if (data.type !== undefined) {
          this.type = data.type;
        }

        if (data.enable !== undefined) {
          this.enable = data.enable;
        } else {
          this.enable = this.type !== _PolygonMaskType.PolygonMaskType.none;
        }

        if (data.url !== undefined) {
          this.url = data.url;
        }
      }
    }
  }]);
  return PolygonMask;
}();

exports.PolygonMask = PolygonMask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUG9seWdvbk1hc2svUG9seWdvbk1hc2sudHMiXSwibmFtZXMiOlsiUG9seWdvbk1hc2siLCJNZXNzYWdlcyIsImRlcHJlY2F0ZWQiLCJpbmxpbmUiLCJhcnJhbmdlbWVudCIsInZhbHVlIiwiZHJhdyIsImVuYWJsZSIsIm1vdmUiLCJzY2FsZSIsInR5cGUiLCJ1cmwiLCJEcmF3IiwiUG9seWdvbklubGluZSIsIk1vdmUiLCJQb2x5Z29uTWFza1R5cGUiLCJub25lIiwiZGF0YSIsInVuZGVmaW5lZCIsImxvYWQiLCJpbmxpbmVBcnJhbmdlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUtBOztBQUNBOztJQUdhQSxXOzs7O0FBQ1Q7Ozt3QkFHc0Q7QUFDbERDLHlCQUFTQyxVQUFULENBQW9CLDJCQUFwQixFQUFpRCw0QkFBakQ7O0FBRUEsYUFBTyxLQUFLQyxNQUFMLENBQVlDLFdBQW5CO0FBQ0g7QUFFRDs7OztzQkFHc0JDLEssRUFBcUM7QUFDdkRKLHlCQUFTQyxVQUFULENBQW9CLDJCQUFwQixFQUFpRCw0QkFBakQ7O0FBRUEsV0FBS0MsTUFBTCxDQUFZQyxXQUFaLEdBQTBCQyxLQUExQjtBQUNIOzs7QUFVRCx5QkFBYztBQUFBO0FBQUEsU0FSUEMsSUFRTztBQUFBLFNBUFBDLE1BT087QUFBQSxTQU5QSixNQU1PO0FBQUEsU0FMUEssSUFLTztBQUFBLFNBSlBDLEtBSU87QUFBQSxTQUhQQyxJQUdPO0FBQUEsU0FGUEMsR0FFTztBQUNWLFNBQUtMLElBQUwsR0FBWSxJQUFJTSxVQUFKLEVBQVo7QUFDQSxTQUFLTCxNQUFMLEdBQWMsS0FBZDtBQUNBLFNBQUtKLE1BQUwsR0FBYyxJQUFJVSw0QkFBSixFQUFkO0FBQ0EsU0FBS0wsSUFBTCxHQUFZLElBQUlNLFVBQUosRUFBWjtBQUNBLFNBQUtMLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsSUFBTCxHQUFZSyxpQ0FBZ0JDLElBQTVCO0FBQ0EsU0FBS0wsR0FBTCxHQUFXLEVBQVg7QUFDSDs7Ozt5QkFFV00sSSxFQUE2QztBQUNyRCxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsYUFBS1osSUFBTCxDQUFVYSxJQUFWLENBQWVGLElBQUksQ0FBQ1gsSUFBcEI7O0FBRUEsWUFBSVcsSUFBSSxDQUFDZCxNQUFMLEtBQWdCZSxTQUFwQixFQUErQjtBQUMzQixlQUFLZixNQUFMLENBQVlnQixJQUFaLENBQWlCRixJQUFJLENBQUNkLE1BQXRCO0FBQ0gsU0FGRCxNQUVPLElBQUljLElBQUksQ0FBQ0csaUJBQUwsS0FBMkJGLFNBQS9CLEVBQTBDO0FBQzdDLGVBQUtFLGlCQUFMLEdBQXlCSCxJQUFJLENBQUNHLGlCQUE5QjtBQUNIOztBQUVELGFBQUtaLElBQUwsQ0FBVVcsSUFBVixDQUFlRixJQUFJLENBQUNULElBQXBCOztBQUVBLFlBQUlTLElBQUksQ0FBQ1IsS0FBTCxLQUFlUyxTQUFuQixFQUE4QjtBQUMxQixlQUFLVCxLQUFMLEdBQWFRLElBQUksQ0FBQ1IsS0FBbEI7QUFDSDs7QUFFRCxZQUFJUSxJQUFJLENBQUNQLElBQUwsS0FBY1EsU0FBbEIsRUFBNkI7QUFDekIsZUFBS1IsSUFBTCxHQUFZTyxJQUFJLENBQUNQLElBQWpCO0FBQ0g7O0FBRUQsWUFBSU8sSUFBSSxDQUFDVixNQUFMLEtBQWdCVyxTQUFwQixFQUErQjtBQUMzQixlQUFLWCxNQUFMLEdBQWNVLElBQUksQ0FBQ1YsTUFBbkI7QUFDSCxTQUZELE1BRU87QUFDSCxlQUFLQSxNQUFMLEdBQWMsS0FBS0csSUFBTCxLQUFjSyxpQ0FBZ0JDLElBQTVDO0FBQ0g7O0FBRUQsWUFBSUMsSUFBSSxDQUFDTixHQUFMLEtBQWFPLFNBQWpCLEVBQTRCO0FBQ3hCLGVBQUtQLEdBQUwsR0FBV00sSUFBSSxDQUFDTixHQUFoQjtBQUNIO0FBQ0o7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVBvbHlnb25NYXNrfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BvbHlnb25NYXNrL0lQb2x5Z29uTWFza1wiO1xuaW1wb3J0IHtQb2x5Z29uTWFza1R5cGV9IGZyb20gXCIuLi8uLi8uLi9FbnVtcy9Qb2x5Z29uTWFza1R5cGVcIjtcbmltcG9ydCB7RHJhd30gZnJvbSBcIi4vRHJhd1wiO1xuaW1wb3J0IHtNb3ZlfSBmcm9tIFwiLi9Nb3ZlXCI7XG5pbXBvcnQge0lQb2x5Z29uTWFza0RyYXd9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUG9seWdvbk1hc2svSVBvbHlnb25NYXNrRHJhd1wiO1xuaW1wb3J0IHtJUG9seWdvbk1hc2tNb3ZlfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BvbHlnb25NYXNrL0lQb2x5Z29uTWFza01vdmVcIjtcbmltcG9ydCB7UG9seWdvbk1hc2tJbmxpbmVBcnJhbmdlbWVudH0gZnJvbSBcIi4uLy4uLy4uL0VudW1zL1BvbHlnb25NYXNrSW5saW5lQXJyYW5nZW1lbnRcIjtcbmltcG9ydCB7SVBvbHlnb25JbmxpbmV9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUG9seWdvbk1hc2svSVBvbHlnb25JbmxpbmVcIjtcbmltcG9ydCB7TWVzc2FnZXN9IGZyb20gXCIuLi8uLi9VdGlscy9NZXNzYWdlc1wiO1xuaW1wb3J0IHtQb2x5Z29uSW5saW5lfSBmcm9tIFwiLi9Qb2x5Z29uSW5saW5lXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBQb2x5Z29uTWFzayBpbXBsZW1lbnRzIElQb2x5Z29uTWFzayB7XG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhlIHByb3BlcnR5IGlubGluZUFycmFuZ2VtZW50IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdGhlIG5ldyBpbmxpbmUuYXJyYW5nZW1lbnRcbiAgICAgKi9cbiAgICBnZXQgaW5saW5lQXJyYW5nZW1lbnQoKTogUG9seWdvbk1hc2tJbmxpbmVBcnJhbmdlbWVudCB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJwb2x5Z29uLmlubGluZUFycmFuZ2VtZW50XCIsIFwicG9seWdvbi5pbmxpbmUuYXJyYW5nZW1lbnRcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5saW5lLmFycmFuZ2VtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHRoZSBwcm9wZXJ0eSBpbmxpbmVBcnJhbmdlbWVudCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIHRoZSBuZXcgaW5saW5lLmFycmFuZ2VtZW50XG4gICAgICovXG4gICAgc2V0IGlubGluZUFycmFuZ2VtZW50KHZhbHVlOiBQb2x5Z29uTWFza0lubGluZUFycmFuZ2VtZW50KSB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJwb2x5Z29uLmlubGluZUFycmFuZ2VtZW50XCIsIFwicG9seWdvbi5pbmxpbmUuYXJyYW5nZW1lbnRcIik7XG5cbiAgICAgICAgdGhpcy5pbmxpbmUuYXJyYW5nZW1lbnQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhdzogSVBvbHlnb25NYXNrRHJhdztcbiAgICBwdWJsaWMgZW5hYmxlOiBib29sZWFuO1xuICAgIHB1YmxpYyBpbmxpbmU6IElQb2x5Z29uSW5saW5lO1xuICAgIHB1YmxpYyBtb3ZlOiBJUG9seWdvbk1hc2tNb3ZlO1xuICAgIHB1YmxpYyBzY2FsZTogbnVtYmVyO1xuICAgIHB1YmxpYyB0eXBlOiBQb2x5Z29uTWFza1R5cGU7XG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZHJhdyA9IG5ldyBEcmF3KCk7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5saW5lID0gbmV3IFBvbHlnb25JbmxpbmUoKTtcbiAgICAgICAgdGhpcy5tb3ZlID0gbmV3IE1vdmUoKTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMudHlwZSA9IFBvbHlnb25NYXNrVHlwZS5ub25lO1xuICAgICAgICB0aGlzLnVybCA9IFwiXCI7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoZGF0YT86IFJlY3Vyc2l2ZVBhcnRpYWw8SVBvbHlnb25NYXNrPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXcubG9hZChkYXRhLmRyYXcpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5pbmxpbmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5saW5lLmxvYWQoZGF0YS5pbmxpbmUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmlubGluZUFycmFuZ2VtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlubGluZUFycmFuZ2VtZW50ID0gZGF0YS5pbmxpbmVBcnJhbmdlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tb3ZlLmxvYWQoZGF0YS5tb3ZlKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc2NhbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSBkYXRhLnNjYWxlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmVuYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUgPSBkYXRhLmVuYWJsZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUgPSB0aGlzLnR5cGUgIT09IFBvbHlnb25NYXNrVHlwZS5ub25lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS51cmwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXJsID0gZGF0YS51cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=