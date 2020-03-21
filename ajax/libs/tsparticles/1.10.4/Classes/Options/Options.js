"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Options = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Interactivity = require("./Interactivity/Interactivity");

var _Particles = require("./Particles/Particles");

var _PolygonMask = require("./PolygonMask/PolygonMask");

var _Messages = require("../Utils/Messages");

var _BackgroundMask = require("./BackgroundMask/BackgroundMask");

var Options = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Options, [{
    key: "fps_limit",

    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     */
    get: function get() {
      _Messages.Messages.deprecated("fps_limit", "fpsLimit");

      return this.fpsLimit;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("fps_limit", "fpsLimit");

      this.fpsLimit = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new retinaDetect
     */

  }, {
    key: "retina_detect",
    get: function get() {
      _Messages.Messages.deprecated("retina_detect", "detectsRetina");

      return this.detectRetina;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new retinaDetect
     * @param value
     */
    ,
    set: function set(value) {
      _Messages.Messages.deprecated("retina_detect", "detectsRetina");

      this.detectRetina = value;
    }
  }]);

  function Options() {
    (0, _classCallCheck2["default"])(this, Options);
    this.detectRetina = void 0;
    this.fpsLimit = void 0;
    this.interactivity = void 0;
    this.particles = void 0;
    this.polygon = void 0;
    this.backgroundMask = void 0;
    this.pauseOnBlur = void 0;
    this.detectRetina = false;
    this.fpsLimit = 60;
    this.interactivity = new _Interactivity.Interactivity();
    this.particles = new _Particles.Particles();
    this.polygon = new _PolygonMask.PolygonMask();
    this.backgroundMask = new _BackgroundMask.BackgroundMask();
    this.pauseOnBlur = true;
  }

  (0, _createClass2["default"])(Options, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        if (data.detectRetina !== undefined) {
          this.detectRetina = data.detectRetina;
        } else if (data.retina_detect !== undefined) {
          this.retina_detect = data.retina_detect;
        }

        if (data.fpsLimit !== undefined) {
          this.fpsLimit = data.fpsLimit;
        } else if (data.fps_limit !== undefined) {
          this.fps_limit = data.fps_limit;
        }

        if (data.pauseOnBlur !== undefined) {
          this.pauseOnBlur = data.pauseOnBlur;
        }

        this.interactivity.load(data.interactivity);
        this.particles.load(data.particles);
        this.polygon.load(data.polygon);
        this.backgroundMask.load(data.backgroundMask);
      }
    }
  }]);
  return Options;
}();

exports.Options = Options;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvT3B0aW9ucy50cyJdLCJuYW1lcyI6WyJPcHRpb25zIiwiTWVzc2FnZXMiLCJkZXByZWNhdGVkIiwiZnBzTGltaXQiLCJ2YWx1ZSIsImRldGVjdFJldGluYSIsImludGVyYWN0aXZpdHkiLCJwYXJ0aWNsZXMiLCJwb2x5Z29uIiwiYmFja2dyb3VuZE1hc2siLCJwYXVzZU9uQmx1ciIsIkludGVyYWN0aXZpdHkiLCJQYXJ0aWNsZXMiLCJQb2x5Z29uTWFzayIsIkJhY2tncm91bmRNYXNrIiwiZGF0YSIsInVuZGVmaW5lZCIsInJldGluYV9kZXRlY3QiLCJmcHNfbGltaXQiLCJsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7O0FBRUE7O0lBR2FBLE87Ozs7QUFDVDs7Ozt3QkFJK0I7QUFDM0JDLHlCQUFTQyxVQUFULENBQW9CLFdBQXBCLEVBQWlDLFVBQWpDOztBQUVBLGFBQU8sS0FBS0MsUUFBWjtBQUNIO0FBRUQ7Ozs7OztzQkFLcUJDLEssRUFBZTtBQUNoQ0gseUJBQVNDLFVBQVQsQ0FBb0IsV0FBcEIsRUFBaUMsVUFBakM7O0FBRUEsV0FBS0MsUUFBTCxHQUFnQkMsS0FBaEI7QUFDSDtBQUVEOzs7Ozs7O3dCQUlvQztBQUNoQ0gseUJBQVNDLFVBQVQsQ0FBb0IsZUFBcEIsRUFBcUMsZUFBckM7O0FBRUEsYUFBTyxLQUFLRyxZQUFaO0FBQ0g7QUFFRDs7Ozs7O3NCQUt5QkQsSyxFQUFnQjtBQUNyQ0gseUJBQVNDLFVBQVQsQ0FBb0IsZUFBcEIsRUFBcUMsZUFBckM7O0FBRUEsV0FBS0csWUFBTCxHQUFvQkQsS0FBcEI7QUFDSDs7O0FBVUQscUJBQWM7QUFBQTtBQUFBLFNBUlBDLFlBUU87QUFBQSxTQVBQRixRQU9PO0FBQUEsU0FOUEcsYUFNTztBQUFBLFNBTFBDLFNBS087QUFBQSxTQUpQQyxPQUlPO0FBQUEsU0FIUEMsY0FHTztBQUFBLFNBRlBDLFdBRU87QUFDVixTQUFLTCxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsU0FBS0YsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtHLGFBQUwsR0FBcUIsSUFBSUssNEJBQUosRUFBckI7QUFDQSxTQUFLSixTQUFMLEdBQWlCLElBQUlLLG9CQUFKLEVBQWpCO0FBQ0EsU0FBS0osT0FBTCxHQUFlLElBQUlLLHdCQUFKLEVBQWY7QUFDQSxTQUFLSixjQUFMLEdBQXNCLElBQUlLLDhCQUFKLEVBQXRCO0FBQ0EsU0FBS0osV0FBTCxHQUFtQixJQUFuQjtBQUNIOzs7O3lCQUVXSyxJLEVBQXdDO0FBQ2hELFVBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUNwQixZQUFJRCxJQUFJLENBQUNWLFlBQUwsS0FBc0JXLFNBQTFCLEVBQXFDO0FBQ2pDLGVBQUtYLFlBQUwsR0FBb0JVLElBQUksQ0FBQ1YsWUFBekI7QUFDSCxTQUZELE1BRU8sSUFBSVUsSUFBSSxDQUFDRSxhQUFMLEtBQXVCRCxTQUEzQixFQUFzQztBQUN6QyxlQUFLQyxhQUFMLEdBQXFCRixJQUFJLENBQUNFLGFBQTFCO0FBQ0g7O0FBRUQsWUFBSUYsSUFBSSxDQUFDWixRQUFMLEtBQWtCYSxTQUF0QixFQUFpQztBQUM3QixlQUFLYixRQUFMLEdBQWdCWSxJQUFJLENBQUNaLFFBQXJCO0FBQ0gsU0FGRCxNQUVPLElBQUlZLElBQUksQ0FBQ0csU0FBTCxLQUFtQkYsU0FBdkIsRUFBa0M7QUFDckMsZUFBS0UsU0FBTCxHQUFpQkgsSUFBSSxDQUFDRyxTQUF0QjtBQUNIOztBQUVELFlBQUlILElBQUksQ0FBQ0wsV0FBTCxLQUFxQk0sU0FBekIsRUFBb0M7QUFDaEMsZUFBS04sV0FBTCxHQUFtQkssSUFBSSxDQUFDTCxXQUF4QjtBQUNIOztBQUVELGFBQUtKLGFBQUwsQ0FBbUJhLElBQW5CLENBQXdCSixJQUFJLENBQUNULGFBQTdCO0FBQ0EsYUFBS0MsU0FBTCxDQUFlWSxJQUFmLENBQW9CSixJQUFJLENBQUNSLFNBQXpCO0FBQ0EsYUFBS0MsT0FBTCxDQUFhVyxJQUFiLENBQWtCSixJQUFJLENBQUNQLE9BQXZCO0FBQ0EsYUFBS0MsY0FBTCxDQUFvQlUsSUFBcEIsQ0FBeUJKLElBQUksQ0FBQ04sY0FBOUI7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJT3B0aW9uc30gZnJvbSBcIi4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JT3B0aW9uc1wiO1xuaW1wb3J0IHtJbnRlcmFjdGl2aXR5fSBmcm9tIFwiLi9JbnRlcmFjdGl2aXR5L0ludGVyYWN0aXZpdHlcIjtcbmltcG9ydCB7UGFydGljbGVzfSBmcm9tIFwiLi9QYXJ0aWNsZXMvUGFydGljbGVzXCI7XG5pbXBvcnQge1BvbHlnb25NYXNrfSBmcm9tIFwiLi9Qb2x5Z29uTWFzay9Qb2x5Z29uTWFza1wiO1xuaW1wb3J0IHtJSW50ZXJhY3Rpdml0eX0gZnJvbSBcIi4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L0lJbnRlcmFjdGl2aXR5XCI7XG5pbXBvcnQge0lQYXJ0aWNsZXN9IGZyb20gXCIuLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvUGFydGljbGVzL0lQYXJ0aWNsZXNcIjtcbmltcG9ydCB7SVBvbHlnb25NYXNrfSBmcm9tIFwiLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BvbHlnb25NYXNrL0lQb2x5Z29uTWFza1wiO1xuaW1wb3J0IHtNZXNzYWdlc30gZnJvbSBcIi4uL1V0aWxzL01lc3NhZ2VzXCI7XG5pbXBvcnQge0lCYWNrZ3JvdW5kTWFza30gZnJvbSBcIi4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9CYWNrZ3JvdW5kTWFzay9JQmFja2dyb3VuZE1hc2tcIjtcbmltcG9ydCB7QmFja2dyb3VuZE1hc2t9IGZyb20gXCIuL0JhY2tncm91bmRNYXNrL0JhY2tncm91bmRNYXNrXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBPcHRpb25zIGltcGxlbWVudHMgSU9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGZwc0xpbWl0XG4gICAgICovXG4gICAgcHVibGljIGdldCBmcHNfbGltaXQoKTogbnVtYmVyIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcImZwc19saW1pdFwiLCBcImZwc0xpbWl0XCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZwc0xpbWl0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IGZwc0xpbWl0XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHNldCBmcHNfbGltaXQodmFsdWU6IG51bWJlcikge1xuICAgICAgICBNZXNzYWdlcy5kZXByZWNhdGVkKFwiZnBzX2xpbWl0XCIsIFwiZnBzTGltaXRcIik7XG5cbiAgICAgICAgdGhpcy5mcHNMaW1pdCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgdGhpcyBwcm9wZXJ0eSBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IHJldGluYURldGVjdFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcmV0aW5hX2RldGVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInJldGluYV9kZXRlY3RcIiwgXCJkZXRlY3RzUmV0aW5hXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRldGVjdFJldGluYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHRoaXMgcHJvcGVydHkgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyByZXRpbmFEZXRlY3RcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IHJldGluYV9kZXRlY3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgTWVzc2FnZXMuZGVwcmVjYXRlZChcInJldGluYV9kZXRlY3RcIiwgXCJkZXRlY3RzUmV0aW5hXCIpO1xuXG4gICAgICAgIHRoaXMuZGV0ZWN0UmV0aW5hID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGRldGVjdFJldGluYTogYm9vbGVhbjtcbiAgICBwdWJsaWMgZnBzTGltaXQ6IG51bWJlcjtcbiAgICBwdWJsaWMgaW50ZXJhY3Rpdml0eTogSUludGVyYWN0aXZpdHk7XG4gICAgcHVibGljIHBhcnRpY2xlczogSVBhcnRpY2xlcztcbiAgICBwdWJsaWMgcG9seWdvbjogSVBvbHlnb25NYXNrO1xuICAgIHB1YmxpYyBiYWNrZ3JvdW5kTWFzazogSUJhY2tncm91bmRNYXNrO1xuICAgIHB1YmxpYyBwYXVzZU9uQmx1cjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRldGVjdFJldGluYSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZwc0xpbWl0ID0gNjA7XG4gICAgICAgIHRoaXMuaW50ZXJhY3Rpdml0eSA9IG5ldyBJbnRlcmFjdGl2aXR5KCk7XG4gICAgICAgIHRoaXMucGFydGljbGVzID0gbmV3IFBhcnRpY2xlcygpO1xuICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbk1hc2soKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kTWFzayA9IG5ldyBCYWNrZ3JvdW5kTWFzaygpO1xuICAgICAgICB0aGlzLnBhdXNlT25CbHVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChkYXRhOiBSZWN1cnNpdmVQYXJ0aWFsPElPcHRpb25zPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5kZXRlY3RSZXRpbmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0ZWN0UmV0aW5hID0gZGF0YS5kZXRlY3RSZXRpbmE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmV0aW5hX2RldGVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXRpbmFfZGV0ZWN0ID0gZGF0YS5yZXRpbmFfZGV0ZWN0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5mcHNMaW1pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcHNMaW1pdCA9IGRhdGEuZnBzTGltaXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuZnBzX2xpbWl0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZwc19saW1pdCA9IGRhdGEuZnBzX2xpbWl0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5wYXVzZU9uQmx1ciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZU9uQmx1ciA9IGRhdGEucGF1c2VPbkJsdXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW50ZXJhY3Rpdml0eS5sb2FkKGRhdGEuaW50ZXJhY3Rpdml0eSk7XG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcy5sb2FkKGRhdGEucGFydGljbGVzKTtcbiAgICAgICAgICAgIHRoaXMucG9seWdvbi5sb2FkKGRhdGEucG9seWdvbik7XG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmRNYXNrLmxvYWQoZGF0YS5iYWNrZ3JvdW5kTWFzayk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=