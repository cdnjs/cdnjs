"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Move = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Attract = require("./Attract");

var _MoveDirection = require("../../../Enums/MoveDirection");

var _OutMode = require("../../../Enums/OutMode");

var _Messages = require("../../Utils/Messages");

var _Trail = require("./Trail");

var Move = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Move, [{
    key: "bounce",

    /**
     *
     * @deprecated this property is obsolete, please use the new collisions
     */
    get: function get() {
      _Messages.Messages.deprecated("particles.move.bounce", "particles.move.collisions");

      return this.collisions;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new collisions
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.move.collisions", "particles.move.collisions");

      this.collisions = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     */

  }, {
    key: "out_mode",
    get: function get() {
      _Messages.Messages.deprecated("particles.move.out_mode", "particles.move.outMode");

      return this.outMode;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("particles.move.out_mode", "particles.move.outMode");

      this.outMode = value;
    }
  }]);

  function Move() {
    (0, _classCallCheck2["default"])(this, Move);
    this.attract = void 0;
    this.collisions = void 0;
    this.direction = void 0;
    this.enable = void 0;
    this.outMode = void 0;
    this.random = void 0;
    this.speed = void 0;
    this.straight = void 0;
    this.trail = void 0;
    this.attract = new _Attract.Attract();
    this.collisions = false;
    this.direction = _MoveDirection.MoveDirection.none;
    this.enable = true;
    this.outMode = _OutMode.OutMode.out;
    this.random = false;
    this.speed = 2;
    this.straight = false;
    this.trail = new _Trail.Trail();
  }

  (0, _createClass2["default"])(Move, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        this.attract.load(data.attract);

        if (data.collisions !== undefined) {
          this.collisions = data.collisions;
        } else if (data.bounce !== undefined) {
          this.bounce = data.bounce;
        }

        if (data.direction !== undefined) {
          this.direction = data.direction;
        }

        if (data.enable !== undefined) {
          this.enable = data.enable;
        }

        if (data.outMode !== undefined) {
          this.outMode = data.outMode;
        } else if (data.out_mode !== undefined) {
          this.out_mode = data.out_mode;
        }

        if (data.random !== undefined) {
          this.random = data.random;
        }

        if (data.speed !== undefined) {
          this.speed = data.speed;
        }

        if (data.straight !== undefined) {
          this.straight = data.straight;
        }

        this.trail.load(data.trail);
      }
    }
  }]);
  return Move;
}();

exports.Move = Move;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvUGFydGljbGVzL01vdmUudHMiXSwibmFtZXMiOlsiTW92ZSIsIk1lc3NhZ2VzIiwiZGVwcmVjYXRlZCIsImNvbGxpc2lvbnMiLCJ2YWx1ZSIsIm91dE1vZGUiLCJhdHRyYWN0IiwiZGlyZWN0aW9uIiwiZW5hYmxlIiwicmFuZG9tIiwic3BlZWQiLCJzdHJhaWdodCIsInRyYWlsIiwiQXR0cmFjdCIsIk1vdmVEaXJlY3Rpb24iLCJub25lIiwiT3V0TW9kZSIsIm91dCIsIlRyYWlsIiwiZGF0YSIsInVuZGVmaW5lZCIsImxvYWQiLCJib3VuY2UiLCJvdXRfbW9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztJQUlhQSxJOzs7O0FBQ1Q7Ozs7d0JBSXNCO0FBQ2xCQyx5QkFBU0MsVUFBVCxDQUFvQix1QkFBcEIsRUFBNkMsMkJBQTdDOztBQUVBLGFBQU8sS0FBS0MsVUFBWjtBQUNIO0FBRUQ7Ozs7O3NCQUlXQyxLLEVBQWdCO0FBQ3ZCSCx5QkFBU0MsVUFBVCxDQUFvQiwyQkFBcEIsRUFBaUQsMkJBQWpEOztBQUVBLFdBQUtDLFVBQUwsR0FBa0JDLEtBQWxCO0FBQ0g7QUFFRDs7Ozs7Ozt3QkFJK0I7QUFDM0JILHlCQUFTQyxVQUFULENBQW9CLHlCQUFwQixFQUErQyx3QkFBL0M7O0FBRUEsYUFBTyxLQUFLRyxPQUFaO0FBQ0g7QUFFRDs7Ozs7O3NCQUtvQkQsSyxFQUFnQjtBQUNoQ0gseUJBQVNDLFVBQVQsQ0FBb0IseUJBQXBCLEVBQStDLHdCQUEvQzs7QUFFQSxXQUFLRyxPQUFMLEdBQWVELEtBQWY7QUFDSDs7O0FBWUQsa0JBQWM7QUFBQTtBQUFBLFNBVlBFLE9BVU87QUFBQSxTQVRQSCxVQVNPO0FBQUEsU0FSUEksU0FRTztBQUFBLFNBUFBDLE1BT087QUFBQSxTQU5QSCxPQU1PO0FBQUEsU0FMUEksTUFLTztBQUFBLFNBSlBDLEtBSU87QUFBQSxTQUhQQyxRQUdPO0FBQUEsU0FGUEMsS0FFTztBQUNWLFNBQUtOLE9BQUwsR0FBZSxJQUFJTyxnQkFBSixFQUFmO0FBQ0EsU0FBS1YsVUFBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUtJLFNBQUwsR0FBaUJPLDZCQUFjQyxJQUEvQjtBQUNBLFNBQUtQLE1BQUwsR0FBYyxJQUFkO0FBQ0EsU0FBS0gsT0FBTCxHQUFlVyxpQkFBUUMsR0FBdkI7QUFDQSxTQUFLUixNQUFMLEdBQWMsS0FBZDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFJTSxZQUFKLEVBQWI7QUFDSDs7Ozt5QkFFV0MsSSxFQUFzQztBQUM5QyxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsYUFBS2QsT0FBTCxDQUFhZSxJQUFiLENBQWtCRixJQUFJLENBQUNiLE9BQXZCOztBQUVBLFlBQUlhLElBQUksQ0FBQ2hCLFVBQUwsS0FBb0JpQixTQUF4QixFQUFtQztBQUMvQixlQUFLakIsVUFBTCxHQUFrQmdCLElBQUksQ0FBQ2hCLFVBQXZCO0FBQ0gsU0FGRCxNQUVPLElBQUlnQixJQUFJLENBQUNHLE1BQUwsS0FBZ0JGLFNBQXBCLEVBQStCO0FBQ2xDLGVBQUtFLE1BQUwsR0FBY0gsSUFBSSxDQUFDRyxNQUFuQjtBQUNIOztBQUVELFlBQUlILElBQUksQ0FBQ1osU0FBTCxLQUFtQmEsU0FBdkIsRUFBa0M7QUFDOUIsZUFBS2IsU0FBTCxHQUFpQlksSUFBSSxDQUFDWixTQUF0QjtBQUNIOztBQUVELFlBQUlZLElBQUksQ0FBQ1gsTUFBTCxLQUFnQlksU0FBcEIsRUFBK0I7QUFDM0IsZUFBS1osTUFBTCxHQUFjVyxJQUFJLENBQUNYLE1BQW5CO0FBQ0g7O0FBRUQsWUFBSVcsSUFBSSxDQUFDZCxPQUFMLEtBQWlCZSxTQUFyQixFQUFnQztBQUM1QixlQUFLZixPQUFMLEdBQWVjLElBQUksQ0FBQ2QsT0FBcEI7QUFDSCxTQUZELE1BRU8sSUFBSWMsSUFBSSxDQUFDSSxRQUFMLEtBQWtCSCxTQUF0QixFQUFpQztBQUNwQyxlQUFLRyxRQUFMLEdBQWdCSixJQUFJLENBQUNJLFFBQXJCO0FBQ0g7O0FBRUQsWUFBSUosSUFBSSxDQUFDVixNQUFMLEtBQWdCVyxTQUFwQixFQUErQjtBQUMzQixlQUFLWCxNQUFMLEdBQWNVLElBQUksQ0FBQ1YsTUFBbkI7QUFDSDs7QUFFRCxZQUFJVSxJQUFJLENBQUNULEtBQUwsS0FBZVUsU0FBbkIsRUFBOEI7QUFDMUIsZUFBS1YsS0FBTCxHQUFhUyxJQUFJLENBQUNULEtBQWxCO0FBQ0g7O0FBRUQsWUFBSVMsSUFBSSxDQUFDUixRQUFMLEtBQWtCUyxTQUF0QixFQUFpQztBQUM3QixlQUFLVCxRQUFMLEdBQWdCUSxJQUFJLENBQUNSLFFBQXJCO0FBQ0g7O0FBRUQsYUFBS0MsS0FBTCxDQUFXUyxJQUFYLENBQWdCRixJQUFJLENBQUNQLEtBQXJCO0FBQ0g7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SU1vdmV9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lNb3ZlXCI7XG5pbXBvcnQge0F0dHJhY3R9IGZyb20gXCIuL0F0dHJhY3RcIjtcbmltcG9ydCB7TW92ZURpcmVjdGlvbn0gZnJvbSBcIi4uLy4uLy4uL0VudW1zL01vdmVEaXJlY3Rpb25cIjtcbmltcG9ydCB7T3V0TW9kZX0gZnJvbSBcIi4uLy4uLy4uL0VudW1zL091dE1vZGVcIjtcbmltcG9ydCB7SUF0dHJhY3R9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lBdHRyYWN0XCI7XG5pbXBvcnQge01lc3NhZ2VzfSBmcm9tIFwiLi4vLi4vVXRpbHMvTWVzc2FnZXNcIjtcbmltcG9ydCB7VHJhaWx9IGZyb20gXCIuL1RyYWlsXCI7XG5pbXBvcnQge0lUcmFpbH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvSVRyYWlsXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBNb3ZlIGltcGxlbWVudHMgSU1vdmUge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGNvbGxpc2lvbnNcbiAgICAgKi9cbiAgICBnZXQgYm91bmNlKCk6IGJvb2xlYW4ge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwicGFydGljbGVzLm1vdmUuYm91bmNlXCIsIFwicGFydGljbGVzLm1vdmUuY29sbGlzaW9uc1wiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGNvbGxpc2lvbnNcbiAgICAgKi9cbiAgICBzZXQgYm91bmNlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJwYXJ0aWNsZXMubW92ZS5jb2xsaXNpb25zXCIsIFwicGFydGljbGVzLm1vdmUuY29sbGlzaW9uc1wiKTtcblxuICAgICAgICB0aGlzLmNvbGxpc2lvbnMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyBvdXRNb2RlXG4gICAgICovXG4gICAgcHVibGljIGdldCBvdXRfbW9kZSgpOiBPdXRNb2RlIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInBhcnRpY2xlcy5tb3ZlLm91dF9tb2RlXCIsIFwicGFydGljbGVzLm1vdmUub3V0TW9kZVwiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5vdXRNb2RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IG91dE1vZGVcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IG91dF9tb2RlKHZhbHVlOiBPdXRNb2RlKSB7XG4gICAgICAgIE1lc3NhZ2VzLmRlcHJlY2F0ZWQoXCJwYXJ0aWNsZXMubW92ZS5vdXRfbW9kZVwiLCBcInBhcnRpY2xlcy5tb3ZlLm91dE1vZGVcIik7XG5cbiAgICAgICAgdGhpcy5vdXRNb2RlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGF0dHJhY3Q6IElBdHRyYWN0O1xuICAgIHB1YmxpYyBjb2xsaXNpb25zOiBib29sZWFuO1xuICAgIHB1YmxpYyBkaXJlY3Rpb246IE1vdmVEaXJlY3Rpb247XG4gICAgcHVibGljIGVuYWJsZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgb3V0TW9kZTogT3V0TW9kZTtcbiAgICBwdWJsaWMgcmFuZG9tOiBib29sZWFuO1xuICAgIHB1YmxpYyBzcGVlZDogbnVtYmVyO1xuICAgIHB1YmxpYyBzdHJhaWdodDogYm9vbGVhbjtcbiAgICBwdWJsaWMgdHJhaWw6IElUcmFpbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmF0dHJhY3QgPSBuZXcgQXR0cmFjdCgpO1xuICAgICAgICB0aGlzLmNvbGxpc2lvbnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBNb3ZlRGlyZWN0aW9uLm5vbmU7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vdXRNb2RlID0gT3V0TW9kZS5vdXQ7XG4gICAgICAgIHRoaXMucmFuZG9tID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAyO1xuICAgICAgICB0aGlzLnN0cmFpZ2h0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhaWwgPSBuZXcgVHJhaWwoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChkYXRhPzogUmVjdXJzaXZlUGFydGlhbDxJTW92ZT4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hdHRyYWN0LmxvYWQoZGF0YS5hdHRyYWN0KTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuY29sbGlzaW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gZGF0YS5jb2xsaXNpb25zO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvdW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuY2UgPSBkYXRhLmJvdW5jZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuZGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRhdGEuZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5lbmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gZGF0YS5lbmFibGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLm91dE1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3V0TW9kZSA9IGRhdGEub3V0TW9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5vdXRfbW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRfbW9kZSA9IGRhdGEub3V0X21vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnJhbmRvbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5kb20gPSBkYXRhLnJhbmRvbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuc3BlZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBkYXRhLnNwZWVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdHJhaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJhaWdodCA9IGRhdGEuc3RyYWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudHJhaWwubG9hZChkYXRhLnRyYWlsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==