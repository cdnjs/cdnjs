"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utils = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _MoveDirection = require("../../Enums/MoveDirection");

/* ---------- global functions - vendors ------------ */
var Utils = /*#__PURE__*/function () {
  function Utils() {
    (0, _classCallCheck2["default"])(this, Utils);
  }

  (0, _createClass2["default"])(Utils, null, [{
    key: "hexToRgb",

    /**
     * Converts hexadecimal string (HTML color code) in a [[IRgb]] object
     * @param hex the hexadecimal string (#f70 or #ff7700)
     */
    value: function hexToRgb(hex) {
      // By Tim Down - http://stackoverflow.com/a/5624139/3493650
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      var hexFixed = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexFixed);
      return result ? {
        b: parseInt(result[3], 16),
        g: parseInt(result[2], 16),
        r: parseInt(result[1], 16)
      } : undefined;
    }
    /**
     * Converts a Hue Saturation Lightness ([[IHsl]]) object in a [[IRgb]] object
     * @param hsl
     */

  }, {
    key: "hslToRgb",
    value: function hslToRgb(hsl) {
      var result = {
        b: 0,
        g: 0,
        r: 0
      };

      if (hsl.s == 0) {
        result.b = hsl.l; // achromatic

        result.g = hsl.l;
        result.r = hsl.l;
      } else {
        var q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
        var p = 2 * hsl.l - q;
        result.r = Utils.hue2rgb(p, q, hsl.h + 1 / 3);
        result.g = Utils.hue2rgb(p, q, hsl.h);
        result.b = Utils.hue2rgb(p, q, hsl.h - 1 / 3);
      }

      result.r = Math.round(result.r * 255);
      result.g = Math.round(result.g * 255);
      result.b = Math.round(result.b * 255);
      return result;
    }
    /**
     * Generate a random RGBA color
     * @param min a minimum seed value for all 3 values
     */

  }, {
    key: "getRandomColorRGBA",
    value: function getRandomColorRGBA(min) {
      var fixedMin = min || 0;
      return {
        b: Math.floor(Math.random() * (255 * fixedMin) + fixedMin),
        g: Math.floor(Math.random() * (255 * fixedMin) + fixedMin),
        r: Math.floor(Math.random() * (255 * fixedMin) + fixedMin)
      };
    }
    /**
     * Clamps a number between a minimum and maximum value
     * @param num the source number
     * @param min the minimum value
     * @param max the maximum value
     */

  }, {
    key: "clamp",
    value: function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }
    /**
     * Check if a value is equal to the destination, if same type, or is in the provided array
     * @param value the value to check
     * @param array the data array or single value
     */

  }, {
    key: "isInArray",
    value: function isInArray(value, array) {
      return value === array || array.indexOf(value) > -1;
    }
    /**
     *
     * @param comp1
     * @param comp2
     * @param weight1
     * @param weight2
     */

  }, {
    key: "mixComponents",
    value: function mixComponents(comp1, comp2, weight1, weight2) {
      return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }
    /**
     * Prepares a rgba() css function from a [[IRgb]] object
     * @param color the [[IRgb]] color to convert
     */

  }, {
    key: "getStyleFromColor",
    value: function getStyleFromColor(color) {
      return "rgba(".concat(Math.floor(color.r), ", ").concat(Math.floor(color.g), ", ").concat(Math.floor(color.b), ", 0.4)");
    }
    /**
     * Get Particle base velocity
     * @param options the options to use for calculating the velocity
     */

  }, {
    key: "getParticleBaseVelocity",
    value: function getParticleBaseVelocity(options) {
      var velocityBase;

      switch (options.particles.move.direction) {
        case _MoveDirection.MoveDirection.top:
          velocityBase = {
            x: 0,
            y: -1
          };
          break;

        case _MoveDirection.MoveDirection.topRight:
          velocityBase = {
            x: 0.5,
            y: -0.5
          };
          break;

        case _MoveDirection.MoveDirection.right:
          velocityBase = {
            x: 1,
            y: -0
          };
          break;

        case _MoveDirection.MoveDirection.bottomRight:
          velocityBase = {
            x: 0.5,
            y: 0.5
          };
          break;

        case _MoveDirection.MoveDirection.bottom:
          velocityBase = {
            x: 0,
            y: 1
          };
          break;

        case _MoveDirection.MoveDirection.bottomLeft:
          velocityBase = {
            x: -0.5,
            y: 1
          };
          break;

        case _MoveDirection.MoveDirection.left:
          velocityBase = {
            x: -1,
            y: 0
          };
          break;

        case _MoveDirection.MoveDirection.topLeft:
          velocityBase = {
            x: -0.5,
            y: -0.5
          };
          break;

        default:
          velocityBase = {
            x: 0,
            y: 0
          };
          break;
      }

      return velocityBase;
    }
    /**
     * Gets the particles color
     * @param color the input color to convert in [[IRgb]] object
     */

  }, {
    key: "getParticleColor",
    value: function getParticleColor(color) {
      var res;

      if ((0, _typeof2["default"])(color.value) === "object") {
        if (color.value instanceof Array) {
          var arr = color.value;
          var colorSelected = color.value[Math.floor(Math.random() * arr.length)];
          res = Utils.hexToRgb(colorSelected);
        } else {
          var rgbColor = color.value;

          if (rgbColor.r !== undefined) {
            res = rgbColor;
          }

          var hslColor = color.value;

          if (hslColor.h !== undefined) {
            res = Utils.hslToRgb(hslColor);
          }
        }
      } else {
        if (color.value === "random") {
          res = {
            b: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            r: Math.floor(Math.random() * 256)
          };
        } else {
          res = Utils.hexToRgb(color.value);
        }
      }

      return res;
    }
    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */

  }, {
    key: "getDistanceBetweenCoordinates",
    value: function getDistanceBetweenCoordinates(pointA, pointB) {
      var dx = pointA.x - pointB.x;
      var dy = pointA.y - pointB.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }, {
    key: "loadFont",
    value: function () {
      var _loadFont = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(character) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return document.fonts.load("".concat(character.weight, " 36px '").concat(character.font, "'"));

              case 3:
                _context.next = 7;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 5]]);
      }));

      function loadFont(_x) {
        return _loadFont.apply(this, arguments);
      }

      return loadFont;
    }()
    /**
     *
     * @param p
     * @param q
     * @param t
     */

  }, {
    key: "hue2rgb",
    value: function hue2rgb(p, q, t) {
      var tCalc = t;

      if (tCalc < 0) {
        tCalc += 1;
      }

      if (tCalc > 1) {
        tCalc -= 1;
      }

      if (tCalc < 1 / 6) {
        return p + (q - p) * 6 * tCalc;
      }

      if (tCalc < 1 / 2) {
        return q;
      }

      if (tCalc < 2 / 3) {
        return p + (q - p) * (2 / 3 - tCalc) * 6;
      }

      return p;
    }
  }]);
  return Utils;
}();

exports.Utils = Utils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL1V0aWxzL1V0aWxzLnRzIl0sIm5hbWVzIjpbIlV0aWxzIiwiaGV4Iiwic2hvcnRoYW5kUmVnZXgiLCJoZXhGaXhlZCIsInJlcGxhY2UiLCJtIiwiciIsImciLCJiIiwicmVzdWx0IiwiZXhlYyIsInBhcnNlSW50IiwidW5kZWZpbmVkIiwiaHNsIiwicyIsImwiLCJxIiwicCIsImh1ZTJyZ2IiLCJoIiwiTWF0aCIsInJvdW5kIiwibWluIiwiZml4ZWRNaW4iLCJmbG9vciIsInJhbmRvbSIsIm51bSIsIm1heCIsInZhbHVlIiwiYXJyYXkiLCJpbmRleE9mIiwiY29tcDEiLCJjb21wMiIsIndlaWdodDEiLCJ3ZWlnaHQyIiwiY29sb3IiLCJvcHRpb25zIiwidmVsb2NpdHlCYXNlIiwicGFydGljbGVzIiwibW92ZSIsImRpcmVjdGlvbiIsIk1vdmVEaXJlY3Rpb24iLCJ0b3AiLCJ4IiwieSIsInRvcFJpZ2h0IiwicmlnaHQiLCJib3R0b21SaWdodCIsImJvdHRvbSIsImJvdHRvbUxlZnQiLCJsZWZ0IiwidG9wTGVmdCIsInJlcyIsIkFycmF5IiwiYXJyIiwiY29sb3JTZWxlY3RlZCIsImxlbmd0aCIsImhleFRvUmdiIiwicmdiQ29sb3IiLCJoc2xDb2xvciIsImhzbFRvUmdiIiwicG9pbnRBIiwicG9pbnRCIiwiZHgiLCJkeSIsInNxcnQiLCJjaGFyYWN0ZXIiLCJkb2N1bWVudCIsImZvbnRzIiwibG9hZCIsIndlaWdodCIsImZvbnQiLCJ0IiwidENhbGMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7O0FBd0NBO0lBQ2FBLEs7Ozs7Ozs7O0FBQ1Q7Ozs7NkJBSXVCQyxHLEVBQStCO0FBQ2xEO0FBQ0E7QUFDQSxVQUFNQyxjQUFjLEdBQUcsa0NBQXZCO0FBRUEsVUFBTUMsUUFBUSxHQUFHRixHQUFHLENBQUNHLE9BQUosQ0FBWUYsY0FBWixFQUE0QixVQUFDRyxDQUFELEVBQUlDLENBQUosRUFB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SUFBSSxDQUFUO0FBQ0g7O0FBRUQsVUFBSUEsS0FBSyxHQUFHLENBQVosRUFBZTtBQUNYQSxRQUFBQSxLQUFLLElBQUksQ0FBVDtBQUNIOztBQUVELFVBQUlBLEtBQUssR0FBRyxJQUFJLENBQWhCLEVBQW1CO0FBQ2YsZUFBT3hELENBQUMsR0FBRyxDQUFDRCxDQUFDLEdBQUdDLENBQUwsSUFBVSxDQUFWLEdBQWN3RCxLQUF6QjtBQUNIOztBQUVELFVBQUlBLEtBQUssR0FBRyxJQUFJLENBQWhCLEVBQW1CO0FBQ2YsZUFBT3pELENBQVA7QUFDSDs7QUFFRCxVQUFJeUQsS0FBSyxHQUFHLElBQUksQ0FBaEIsRUFBbUI7QUFDZixlQUFPeEQsQ0FBQyxHQUFHLENBQUNELENBQUMsR0FBR0MsQ0FBTCxLQUFXLElBQUksQ0FBSixHQUFRd0QsS0FBbkIsSUFBNEIsQ0FBdkM7QUFDSDs7QUFFRCxhQUFPeEQsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7SUNvb3JkaW5hdGVzfSBmcm9tIFwiLi4vLi4vSW50ZXJmYWNlcy9JQ29vcmRpbmF0ZXNcIjtcbmltcG9ydCB7SUhzbH0gZnJvbSBcIi4uLy4uL0ludGVyZmFjZXMvSUhzbFwiO1xuaW1wb3J0IHtJUmdifSBmcm9tIFwiLi4vLi4vSW50ZXJmYWNlcy9JUmdiXCI7XG5pbXBvcnQge01vdmVEaXJlY3Rpb259IGZyb20gXCIuLi8uLi9FbnVtcy9Nb3ZlRGlyZWN0aW9uXCI7XG5pbXBvcnQge0lPcHRpb25zfSBmcm9tIFwiLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL0lPcHRpb25zXCI7XG5pbXBvcnQge0lQYXJ0aWNsZXNDb2xvcn0gZnJvbSBcIi4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvSVBhcnRpY2xlc0NvbG9yXCI7XG5pbXBvcnQge0lDaGFyYWN0ZXJTaGFwZX0gZnJvbSBcIi4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9QYXJ0aWNsZXMvU2hhcGUvSUNoYXJhY3RlclNoYXBlXCI7XG5cbnR5cGUgQ1NTT01TdHJpbmcgPSBzdHJpbmc7XG50eXBlIEZvbnRGYWNlTG9hZFN0YXR1cyA9ICd1bmxvYWRlZCcgfCAnbG9hZGluZycgfCAnbG9hZGVkJyB8ICdlcnJvcic7XG50eXBlIEZvbnRGYWNlU2V0U3RhdHVzID0gJ2xvYWRpbmcnIHwgJ2xvYWRlZCc7XG5cbmludGVyZmFjZSBGb250RmFjZSB7XG4gICAgZmFtaWx5OiBDU1NPTVN0cmluZztcbiAgICBzdHlsZTogQ1NTT01TdHJpbmc7XG4gICAgd2VpZ2h0OiBDU1NPTVN0cmluZztcbiAgICBzdHJldGNoOiBDU1NPTVN0cmluZztcbiAgICB1bmljb2RlUmFuZ2U6IENTU09NU3RyaW5nO1xuICAgIHZhcmlhbnQ6IENTU09NU3RyaW5nO1xuICAgIGZlYXR1cmVTZXR0aW5nczogQ1NTT01TdHJpbmc7XG4gICAgdmFyaWF0aW9uU2V0dGluZ3M6IENTU09NU3RyaW5nO1xuICAgIGRpc3BsYXk6IENTU09NU3RyaW5nO1xuICAgIHJlYWRvbmx5IHN0YXR1czogRm9udEZhY2VMb2FkU3RhdHVzO1xuICAgIHJlYWRvbmx5IGxvYWRlZDogUHJvbWlzZTxGb250RmFjZT47XG5cbiAgICBsb2FkKCk6IFByb21pc2U8Rm9udEZhY2U+O1xufVxuXG5pbnRlcmZhY2UgRm9udEZhY2VTZXQge1xuICAgIHJlYWRvbmx5IHN0YXR1czogRm9udEZhY2VTZXRTdGF0dXM7XG4gICAgcmVhZG9ubHkgcmVhZHk6IFByb21pc2U8Rm9udEZhY2VTZXQ+O1xuXG4gICAgY2hlY2soZm9udDogc3RyaW5nLCB0ZXh0Pzogc3RyaW5nKTogQm9vbGVhbjtcblxuICAgIGxvYWQoZm9udDogc3RyaW5nLCB0ZXh0Pzogc3RyaW5nKTogUHJvbWlzZTxGb250RmFjZVtdPlxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIERvY3VtZW50IHtcbiAgICAgICAgZm9udHM6IEZvbnRGYWNlU2V0XG4gICAgfVxufVxuXG4vKiAtLS0tLS0tLS0tIGdsb2JhbCBmdW5jdGlvbnMgLSB2ZW5kb3JzIC0tLS0tLS0tLS0tLSAqL1xuZXhwb3J0IGNsYXNzIFV0aWxzIHtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBoZXhhZGVjaW1hbCBzdHJpbmcgKEhUTUwgY29sb3IgY29kZSkgaW4gYSBbW0lSZ2JdXSBvYmplY3RcbiAgICAgKiBAcGFyYW0gaGV4IHRoZSBoZXhhZGVjaW1hbCBzdHJpbmcgKCNmNzAgb3IgI2ZmNzcwMClcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGhleFRvUmdiKGhleDogc3RyaW5nKTogSVJnYiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIC8vIEJ5IFRpbSBEb3duIC0gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTYyNDEzOS8zNDkzNjUwXG4gICAgICAgIC8vIEV4cGFuZCBzaG9ydGhhbmQgZm9ybSAoZS5nLiBcIjAzRlwiKSB0byBmdWxsIGZvcm0gKGUuZy4gXCIwMDMzRkZcIilcbiAgICAgICAgY29uc3Qgc2hvcnRoYW5kUmVnZXggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuXG4gICAgICAgIGNvbnN0IGhleEZpeGVkID0gaGV4LnJlcGxhY2Uoc2hvcnRoYW5kUmVnZXgsIChtLCByLCBnLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gciArIHIgKyBnICsgZyArIGIgKyBiO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4Rml4ZWQpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQgPyB7XG4gICAgICAgICAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDE2KSxcbiAgICAgICAgICAgIGc6IHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgICAgICAgICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgICAgIH0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBIdWUgU2F0dXJhdGlvbiBMaWdodG5lc3MgKFtbSUhzbF1dKSBvYmplY3QgaW4gYSBbW0lSZ2JdXSBvYmplY3RcbiAgICAgKiBAcGFyYW0gaHNsXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBoc2xUb1JnYihoc2w6IElIc2wpOiBJUmdiIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBJUmdiID0ge2I6IDAsIGc6IDAsIHI6IDB9O1xuXG4gICAgICAgIGlmIChoc2wucyA9PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQuYiA9IGhzbC5sOyAvLyBhY2hyb21hdGljXG4gICAgICAgICAgICByZXN1bHQuZyA9IGhzbC5sO1xuICAgICAgICAgICAgcmVzdWx0LnIgPSBoc2wubDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHEgPSBoc2wubCA8IDAuNSA/IGhzbC5sICogKDEgKyBoc2wucykgOiBoc2wubCArIGhzbC5zIC0gaHNsLmwgKiBoc2wucztcbiAgICAgICAgICAgIGNvbnN0IHAgPSAyICogaHNsLmwgLSBxO1xuXG4gICAgICAgICAgICByZXN1bHQuciA9IFV0aWxzLmh1ZTJyZ2IocCwgcSwgaHNsLmggKyAxIC8gMyk7XG4gICAgICAgICAgICByZXN1bHQuZyA9IFV0aWxzLmh1ZTJyZ2IocCwgcSwgaHNsLmgpO1xuICAgICAgICAgICAgcmVzdWx0LmIgPSBVdGlscy5odWUycmdiKHAsIHEsIGhzbC5oIC0gMSAvIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnIgPSBNYXRoLnJvdW5kKHJlc3VsdC5yICogMjU1KTtcbiAgICAgICAgcmVzdWx0LmcgPSBNYXRoLnJvdW5kKHJlc3VsdC5nICogMjU1KTtcbiAgICAgICAgcmVzdWx0LmIgPSBNYXRoLnJvdW5kKHJlc3VsdC5iICogMjU1KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgcmFuZG9tIFJHQkEgY29sb3JcbiAgICAgKiBAcGFyYW0gbWluIGEgbWluaW11bSBzZWVkIHZhbHVlIGZvciBhbGwgMyB2YWx1ZXNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFJhbmRvbUNvbG9yUkdCQShtaW4/OiBudW1iZXIpOiBJUmdiIHtcbiAgICAgICAgY29uc3QgZml4ZWRNaW4gPSBtaW4gfHwgMDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGI6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgyNTUgKiBmaXhlZE1pbikgKyBmaXhlZE1pbiksXG4gICAgICAgICAgICBnOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMjU1ICogZml4ZWRNaW4pICsgZml4ZWRNaW4pLFxuICAgICAgICAgICAgcjogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDI1NSAqIGZpeGVkTWluKSArIGZpeGVkTWluKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGFtcHMgYSBudW1iZXIgYmV0d2VlbiBhIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gbnVtIHRoZSBzb3VyY2UgbnVtYmVyXG4gICAgICogQHBhcmFtIG1pbiB0aGUgbWluaW11bSB2YWx1ZVxuICAgICAqIEBwYXJhbSBtYXggdGhlIG1heGltdW0gdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNsYW1wKG51bTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobnVtLCBtaW4pLCBtYXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgdmFsdWUgaXMgZXF1YWwgdG8gdGhlIGRlc3RpbmF0aW9uLCBpZiBzYW1lIHR5cGUsIG9yIGlzIGluIHRoZSBwcm92aWRlZCBhcnJheVxuICAgICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAgICAgKiBAcGFyYW0gYXJyYXkgdGhlIGRhdGEgYXJyYXkgb3Igc2luZ2xlIHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc0luQXJyYXk8VD4odmFsdWU6IFQsIGFycmF5OiBUW10gfCBUKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gYXJyYXkgfHwgKGFycmF5IGFzIFRbXSkuaW5kZXhPZih2YWx1ZSkgPiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb21wMVxuICAgICAqIEBwYXJhbSBjb21wMlxuICAgICAqIEBwYXJhbSB3ZWlnaHQxXG4gICAgICogQHBhcmFtIHdlaWdodDJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG1peENvbXBvbmVudHMoY29tcDE6IG51bWJlciwgY29tcDI6IG51bWJlciwgd2VpZ2h0MTogbnVtYmVyLCB3ZWlnaHQyOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKGNvbXAxICogd2VpZ2h0MSArIGNvbXAyICogd2VpZ2h0MikgLyAod2VpZ2h0MSArIHdlaWdodDIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZXBhcmVzIGEgcmdiYSgpIGNzcyBmdW5jdGlvbiBmcm9tIGEgW1tJUmdiXV0gb2JqZWN0XG4gICAgICogQHBhcmFtIGNvbG9yIHRoZSBbW0lSZ2JdXSBjb2xvciB0byBjb252ZXJ0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRTdHlsZUZyb21Db2xvcihjb2xvcjogSVJnYik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgcmdiYSgke01hdGguZmxvb3IoY29sb3Iucil9LCAke01hdGguZmxvb3IoY29sb3IuZyl9LCAke01hdGguZmxvb3IoY29sb3IuYil9LCAwLjQpYDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgUGFydGljbGUgYmFzZSB2ZWxvY2l0eVxuICAgICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIHRvIHVzZSBmb3IgY2FsY3VsYXRpbmcgdGhlIHZlbG9jaXR5XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRQYXJ0aWNsZUJhc2VWZWxvY2l0eShvcHRpb25zOiBJT3B0aW9ucyk6IElDb29yZGluYXRlcyB7XG4gICAgICAgIGxldCB2ZWxvY2l0eUJhc2U6IElDb29yZGluYXRlcztcblxuICAgICAgICBzd2l0Y2ggKG9wdGlvbnMucGFydGljbGVzLm1vdmUuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIE1vdmVEaXJlY3Rpb24udG9wOlxuICAgICAgICAgICAgICAgIHZlbG9jaXR5QmFzZSA9IHt4OiAwLCB5OiAtMX07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1vdmVEaXJlY3Rpb24udG9wUmlnaHQ6XG4gICAgICAgICAgICAgICAgdmVsb2NpdHlCYXNlID0ge3g6IDAuNSwgeTogLTAuNX07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1vdmVEaXJlY3Rpb24ucmlnaHQ6XG4gICAgICAgICAgICAgICAgdmVsb2NpdHlCYXNlID0ge3g6IDEsIHk6IC0wfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTW92ZURpcmVjdGlvbi5ib3R0b21SaWdodDpcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eUJhc2UgPSB7eDogMC41LCB5OiAwLjV9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNb3ZlRGlyZWN0aW9uLmJvdHRvbTpcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eUJhc2UgPSB7eDogMCwgeTogMX07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1vdmVEaXJlY3Rpb24uYm90dG9tTGVmdDpcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eUJhc2UgPSB7eDogLTAuNSwgeTogMX07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1vdmVEaXJlY3Rpb24ubGVmdDpcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eUJhc2UgPSB7eDogLTEsIHk6IDB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNb3ZlRGlyZWN0aW9uLnRvcExlZnQ6XG4gICAgICAgICAgICAgICAgdmVsb2NpdHlCYXNlID0ge3g6IC0wLjUsIHk6IC0wLjV9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eUJhc2UgPSB7eDogMCwgeTogMH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmVsb2NpdHlCYXNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhcnRpY2xlcyBjb2xvclxuICAgICAqIEBwYXJhbSBjb2xvciB0aGUgaW5wdXQgY29sb3IgdG8gY29udmVydCBpbiBbW0lSZ2JdXSBvYmplY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFBhcnRpY2xlQ29sb3IoY29sb3I6IElQYXJ0aWNsZXNDb2xvcik6IElSZ2IgfCB1bmRlZmluZWQge1xuICAgICAgICBsZXQgcmVzOiBJUmdiIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh0eXBlb2YgKGNvbG9yLnZhbHVlKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgaWYgKGNvbG9yLnZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcnIgPSBjb2xvci52YWx1ZSBhcyBzdHJpbmdbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvclNlbGVjdGVkID0gY29sb3IudmFsdWVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuXG4gICAgICAgICAgICAgICAgcmVzID0gVXRpbHMuaGV4VG9SZ2IoY29sb3JTZWxlY3RlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJnYkNvbG9yID0gY29sb3IudmFsdWUgYXMgSVJnYjtcblxuICAgICAgICAgICAgICAgIGlmIChyZ2JDb2xvci5yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gcmdiQ29sb3I7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgaHNsQ29sb3IgPSBjb2xvci52YWx1ZSBhcyBJSHNsO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhzbENvbG9yLmggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSBVdGlscy5oc2xUb1JnYihoc2xDb2xvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbG9yLnZhbHVlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICAgICAgICAgICAgcmVzID0ge1xuICAgICAgICAgICAgICAgICAgICBiOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpLFxuICAgICAgICAgICAgICAgICAgICBnOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpLFxuICAgICAgICAgICAgICAgICAgICByOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcyA9IFV0aWxzLmhleFRvUmdiKGNvbG9yLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gY29vcmRpbmF0ZXNcbiAgICAgKiBAcGFyYW0gcG9pbnRBIHRoZSBmaXJzdCBjb29yZGluYXRlXG4gICAgICogQHBhcmFtIHBvaW50QiB0aGUgc2Vjb25kIGNvb3JkaW5hdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldERpc3RhbmNlQmV0d2VlbkNvb3JkaW5hdGVzKHBvaW50QTogSUNvb3JkaW5hdGVzLCBwb2ludEI6IElDb29yZGluYXRlcyk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGR4ID0gcG9pbnRBLnggLSBwb2ludEIueDtcbiAgICAgICAgY29uc3QgZHkgPSBwb2ludEEueSAtIHBvaW50Qi55O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGxvYWRGb250KGNoYXJhY3RlcjogSUNoYXJhY3RlclNoYXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBkb2N1bWVudC5mb250cy5sb2FkKGAke2NoYXJhY3Rlci53ZWlnaHR9IDM2cHggJyR7Y2hhcmFjdGVyLmZvbnR9J2ApO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHBcbiAgICAgKiBAcGFyYW0gcVxuICAgICAqIEBwYXJhbSB0XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgaHVlMnJnYihwOiBudW1iZXIsIHE6IG51bWJlciwgdDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHRDYWxjID0gdDtcblxuICAgICAgICBpZiAodENhbGMgPCAwKSB7XG4gICAgICAgICAgICB0Q2FsYyArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRDYWxjID4gMSkge1xuICAgICAgICAgICAgdENhbGMgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0Q2FsYyA8IDEgLyA2KSB7XG4gICAgICAgICAgICByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdENhbGM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodENhbGMgPCAxIC8gMikge1xuICAgICAgICAgICAgcmV0dXJuIHE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodENhbGMgPCAyIC8gMykge1xuICAgICAgICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdENhbGMpICogNjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbn1cbiJdfQ==