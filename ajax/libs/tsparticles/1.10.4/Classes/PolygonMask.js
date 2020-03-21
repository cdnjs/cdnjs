"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolygonMask = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _PolygonMaskType = require("../Enums/PolygonMaskType");

var _Particle = require("./Particle");

var _PolygonMaskInlineArrangement = require("../Enums/PolygonMaskInlineArrangement");

/**
 * Polygon Mask manager
 */
var PolygonMask = /*#__PURE__*/function () {
  function PolygonMask(container) {
    (0, _classCallCheck2["default"])(this, PolygonMask);
    this.redrawTimeout = void 0;
    this.raw = void 0;
    this.svg = void 0;
    this.path = void 0;
    this.container = void 0;
    this.path2DSupported = void 0;
    this.polygonPath = void 0;
    this.polygonPathLength = void 0;
    this.width = void 0;
    this.height = void 0;
    this.offset = void 0;
    this.container = container;
    this.width = 0;
    this.height = 0;
    this.polygonPathLength = 0;
    this.path2DSupported = window.hasOwnProperty("Path2D");
  }

  (0, _createClass2["default"])(PolygonMask, [{
    key: "checkInsidePolygon",
    value: function checkInsidePolygon(position) {
      var container = this.container;
      var options = container.options;

      if (!options.polygon.enable || options.polygon.type === _PolygonMaskType.PolygonMaskType.none || options.polygon.type === _PolygonMaskType.PolygonMaskType.inline) {
        return true;
      } // https://github.com/substack/point-in-polygon
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html


      if (!this.raw) {
        console.error('No polygon found, you need to specify SVG url in config.');
        return true;
      }

      var x = position ? position.x : Math.random() * container.canvas.dimension.width;
      var y = position ? position.y : Math.random() * container.canvas.dimension.height;
      var inside = false;

      if (this.path2DSupported && this.polygonPath && position) {
        inside = container.canvas.isPointInPath(this.polygonPath, position);
      } else {
        for (var i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
          var xi = this.raw[i].x;
          var yi = this.raw[i].y;
          var xj = this.raw[j].x;
          var yj = this.raw[j].y;
          var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;

          if (intersect) {
            inside = !inside;
          }
        }
      }

      if (options.polygon.type === _PolygonMaskType.PolygonMaskType.inside) {
        return inside;
      } else if (options.polygon.type === _PolygonMaskType.PolygonMaskType.outside) {
        return !inside;
      }

      return false;
    }
  }, {
    key: "randomPointInPolygon",
    value: function randomPointInPolygon() {
      var container = this.container;
      var options = container.options;
      var position;

      if (options.polygon.type === _PolygonMaskType.PolygonMaskType.inline) {
        switch (options.polygon.inline.arrangement) {
          case _PolygonMaskInlineArrangement.PolygonMaskInlineArrangement.randomPoint:
            position = this.getRandomPointOnPolygonPath();
            break;

          case _PolygonMaskInlineArrangement.PolygonMaskInlineArrangement.randomLength:
            position = this.getRandomPointOnPolygonPathByLength();
            break;

          case _PolygonMaskInlineArrangement.PolygonMaskInlineArrangement.equidistant:
            position = this.getEquidistantPointOnPolygonPathByIndex(container.particles.array.length);
            break;

          case _PolygonMaskInlineArrangement.PolygonMaskInlineArrangement.onePerPoint:
          default:
            position = this.getPoingOnPolygonPathByIndex(container.particles.array.length);
        }
      } else {
        position = {
          x: Math.random() * container.canvas.dimension.width,
          y: Math.random() * container.canvas.dimension.height
        };
      }

      if (this.checkInsidePolygon(position)) {
        return position;
      } else {
        return this.randomPointInPolygon();
      }
    }
    /**
     * Depends on SVGPathSeg API polyfill https://github.com/progers/pathseg for Chrome
     * Deprecate SVGPathElement.getPathSegAtLength removed in:
     * Chrome for desktop release 62
     * Chrome for Android release 62
     * Android WebView release 62
     * Opera release 49
     * Opera for Android release 49
     */

  }, {
    key: "parseSvgPathToPolygon",
    value: function () {
      var _parseSvgPathToPolygon = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(svgUrl) {
        var container, options, url, req, xml, parser, doc, scale, len, polygonRaw, p, i, segment, absSeg, relSeg;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                container = this.container;
                options = container.options;
                url = svgUrl || options.polygon.url; // Load SVG from file on server

                if (!(!this.path || !this.svg)) {
                  _context.next = 21;
                  break;
                }

                _context.next = 6;
                return fetch(url);

              case 6:
                req = _context.sent;

                if (!req.ok) {
                  _context.next = 19;
                  break;
                }

                _context.next = 10;
                return req.text();

              case 10:
                xml = _context.sent;
                parser = new DOMParser();
                doc = parser.parseFromString(xml, "image/svg+xml");
                this.svg = doc.getElementsByTagName("svg")[0];
                this.path = doc.getElementsByTagName("path")[0];

                if (this.path) {
                  this.polygonPathLength = this.path.getTotalLength();
                }

                this.createPath2D();
                _context.next = 21;
                break;

              case 19:
                console.error("tsParticles Error - during polygon mask download");
                return _context.abrupt("return");

              case 21:
                scale = options.polygon.scale;
                this.width = parseFloat(this.svg.getAttribute("width") || "0") * scale;
                this.height = parseFloat(this.svg.getAttribute("height") || "0") * scale;
                /* centering of the polygon mask */

                this.offset = {
                  x: container.canvas.dimension.width / 2 - this.width / 2,
                  y: container.canvas.dimension.height / 2 - this.height / 2
                };
                len = this.path.pathSegList.numberOfItems;
                polygonRaw = [];
                p = {
                  x: 0,
                  y: 0
                };
                i = 0;

              case 29:
                if (!(i < len)) {
                  _context.next = 55;
                  break;
                }

                segment = this.path.pathSegList.getItem(i);
                _context.t0 = segment.pathSegType;
                _context.next = _context.t0 === window.SVGPathSeg.PATHSEG_MOVETO_ABS ? 34 : _context.t0 === window.SVGPathSeg.PATHSEG_LINETO_ABS ? 34 : _context.t0 === window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS ? 34 : _context.t0 === window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS ? 34 : _context.t0 === window.SVGPathSeg.PATHSEG_ARC_ABS ? 34 : _context.t0 === window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS ? 34 : _context.t0 === window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS ? 34 : _context.t0 === window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS ? 38 : _context.t0 === window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS ? 40 : _context.t0 === window.SVGPathSeg.PATHSEG_LINETO_REL ? 42 : _context.t0 === window.SVGPathSeg.PATHSEG_MOVETO_REL ? 42 : _context.t0 === window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL ? 42 : _context.t0 === window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL ? 42 : _context.t0 === window.SVGPathSeg.PATHSEG_ARC_REL ? 42 : _context.t0 === window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL ? 42 : _context.t0 === window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL ? 42 : _context.t0 === window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL ? 46 : _context.t0 === window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL ? 48 : _context.t0 === window.SVGPathSeg.PATHSEG_UNKNOWN ? 50 : _context.t0 === window.SVGPathSeg.PATHSEG_CLOSEPATH ? 50 : 51;
                break;

              case 34:
                absSeg = segment;
                p.x = absSeg.x;
                p.y = absSeg.y;
                return _context.abrupt("break", 51);

              case 38:
                p.x = segment.x;
                return _context.abrupt("break", 51);

              case 40:
                p.y = segment.y;
                return _context.abrupt("break", 51);

              case 42:
                relSeg = segment;
                p.x += relSeg.x;
                p.y += relSeg.y;
                return _context.abrupt("break", 51);

              case 46:
                p.x += segment.x;
                return _context.abrupt("break", 51);

              case 48:
                p.y += segment.y;
                return _context.abrupt("break", 51);

              case 50:
                return _context.abrupt("continue", 52);

              case 51:
                polygonRaw.push({
                  x: p.x * scale + this.offset.x,
                  y: p.y * scale + this.offset.y
                });

              case 52:
                i++;
                _context.next = 29;
                break;

              case 55:
                return _context.abrupt("return", polygonRaw);

              case 56:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function parseSvgPathToPolygon(_x) {
        return _parseSvgPathToPolygon.apply(this, arguments);
      }

      return parseSvgPathToPolygon;
    }()
  }, {
    key: "drawPolygon",
    value: function drawPolygon() {
      var container = this.container;

      if (this.raw) {
        container.canvas.drawPolygonMask(this.raw);
      }
    }
  }, {
    key: "drawPointsOnPolygonPath",
    value: function drawPointsOnPolygonPath() {
      var container = this.container;

      if (this.raw) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.raw[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;
            var position = {
              x: item.x,
              y: item.y
            };
            var particle = new _Particle.Particle(container, position);
            container.particles.array.push(particle);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: "getRandomPointOnPolygonPath",
    value: function getRandomPointOnPolygonPath() {
      if (!this.raw || !this.raw.length) throw new Error("No polygon data loaded.");
      var coords = this.raw[Math.floor(Math.random() * this.raw.length)];
      return {
        x: coords.x,
        y: coords.y
      };
    }
  }, {
    key: "getRandomPointOnPolygonPathByLength",
    value: function getRandomPointOnPolygonPathByLength() {
      var _this$offset, _this$offset2;

      var container = this.container;
      var options = container.options;
      if (!this.raw || !this.raw.length || !this.path) throw new Error("No polygon data loaded.");
      var distance = Math.floor(Math.random() * this.polygonPathLength) + 1;
      var point = this.path.getPointAtLength(distance);
      return {
        x: point.x * options.polygon.scale + (((_this$offset = this.offset) === null || _this$offset === void 0 ? void 0 : _this$offset.x) || 0),
        y: point.y * options.polygon.scale + (((_this$offset2 = this.offset) === null || _this$offset2 === void 0 ? void 0 : _this$offset2.y) || 0)
      };
    }
  }, {
    key: "getEquidistantPointOnPolygonPathByIndex",
    value: function getEquidistantPointOnPolygonPathByIndex(index) {
      var _this$offset3, _this$offset4;

      var container = this.container;
      var options = container.options;
      if (!this.raw || !this.raw.length || !this.path) throw new Error("No polygon data loaded.");
      var distance = this.polygonPathLength / options.particles.number.value * index;
      var point = this.path.getPointAtLength(distance);
      return {
        x: point.x * options.polygon.scale + (((_this$offset3 = this.offset) === null || _this$offset3 === void 0 ? void 0 : _this$offset3.x) || 0),
        y: point.y * options.polygon.scale + (((_this$offset4 = this.offset) === null || _this$offset4 === void 0 ? void 0 : _this$offset4.y) || 0)
      };
    }
  }, {
    key: "getPoingOnPolygonPathByIndex",
    value: function getPoingOnPolygonPathByIndex(index) {
      if (!this.raw || !this.raw.length) throw new Error("No polygon data loaded.");
      var coords = this.raw[index % this.raw.length];
      return {
        x: coords.x,
        y: coords.y
      };
    }
  }, {
    key: "createPath2D",
    value: function createPath2D() {
      var _this = this;

      if (!this.path2DSupported || !this.raw) {
        return;
      }

      this.polygonPath = new Path2D();
      this.polygonPath.moveTo(this.raw[0].x, this.raw[0].y);
      this.raw.forEach(function (pos, i) {
        if (i > 0) {
          var _this$polygonPath;

          (_this$polygonPath = _this.polygonPath) === null || _this$polygonPath === void 0 ? void 0 : _this$polygonPath.lineTo(pos.x, pos.y);
        }
      });
      this.polygonPath.closePath();
    }
  }]);
  return PolygonMask;
}();

exports.PolygonMask = PolygonMask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DbGFzc2VzL1BvbHlnb25NYXNrLnRzIl0sIm5hbWVzIjpbIlBvbHlnb25NYXNrIiwiY29udGFpbmVyIiwicmVkcmF3VGltZW91dCIsInJhdyIsInN2ZyIsInBhdGgiLCJwYXRoMkRTdXBwb3J0ZWQiLCJwb2x5Z29uUGF0aCIsInBvbHlnb25QYXRoTGVuZ3RoIiwid2lkdGgiLCJoZWlnaHQiLCJvZmZzZXQiLCJ3aW5kb3ciLCJoYXNPd25Qcm9wZXJ0eSIsInBvc2l0aW9uIiwib3B0aW9ucyIsInBvbHlnb24iLCJlbmFibGUiLCJ0eXBlIiwiUG9seWdvbk1hc2tUeXBlIiwibm9uZSIsImlubGluZSIsImNvbnNvbGUiLCJlcnJvciIsIngiLCJNYXRoIiwicmFuZG9tIiwiY2FudmFzIiwiZGltZW5zaW9uIiwieSIsImluc2lkZSIsImlzUG9pbnRJblBhdGgiLCJpIiwiaiIsImxlbmd0aCIsInhpIiwieWkiLCJ4aiIsInlqIiwiaW50ZXJzZWN0Iiwib3V0c2lkZSIsImFycmFuZ2VtZW50IiwiUG9seWdvbk1hc2tJbmxpbmVBcnJhbmdlbWVudCIsInJhbmRvbVBvaW50IiwiZ2V0UmFuZG9tUG9pbnRPblBvbHlnb25QYXRoIiwicmFuZG9tTGVuZ3RoIiwiZ2V0UmFuZG9tUG9pbnRPblBvbHlnb25QYXRoQnlMZW5ndGgiLCJlcXVpZGlzdGFudCIsImdldEVxdWlkaXN0YW50UG9pbnRPblBvbHlnb25QYXRoQnlJbmRleCIsInBhcnRpY2xlcyIsImFycmF5Iiwib25lUGVyUG9pbnQiLCJnZXRQb2luZ09uUG9seWdvblBhdGhCeUluZGV4IiwiY2hlY2tJbnNpZGVQb2x5Z29uIiwicmFuZG9tUG9pbnRJblBvbHlnb24iLCJzdmdVcmwiLCJ1cmwiLCJmZXRjaCIsInJlcSIsIm9rIiwidGV4dCIsInhtbCIsInBhcnNlciIsIkRPTVBhcnNlciIsImRvYyIsInBhcnNlRnJvbVN0cmluZyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0VG90YWxMZW5ndGgiLCJjcmVhdGVQYXRoMkQiLCJzY2FsZSIsInBhcnNlRmxvYXQiLCJnZXRBdHRyaWJ1dGUiLCJsZW4iLCJwYXRoU2VnTGlzdCIsIm51bWJlck9mSXRlbXMiLCJwb2x5Z29uUmF3IiwicCIsInNlZ21lbnQiLCJnZXRJdGVtIiwicGF0aFNlZ1R5cGUiLCJTVkdQYXRoU2VnIiwiUEFUSFNFR19NT1ZFVE9fQUJTIiwiUEFUSFNFR19MSU5FVE9fQUJTIiwiUEFUSFNFR19DVVJWRVRPX0NVQklDX0FCUyIsIlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfQUJTIiwiUEFUSFNFR19BUkNfQUJTIiwiUEFUSFNFR19DVVJWRVRPX0NVQklDX1NNT09USF9BQlMiLCJQQVRIU0VHX0NVUlZFVE9fUVVBRFJBVElDX1NNT09USF9BQlMiLCJQQVRIU0VHX0xJTkVUT19IT1JJWk9OVEFMX0FCUyIsIlBBVEhTRUdfTElORVRPX1ZFUlRJQ0FMX0FCUyIsIlBBVEhTRUdfTElORVRPX1JFTCIsIlBBVEhTRUdfTU9WRVRPX1JFTCIsIlBBVEhTRUdfQ1VSVkVUT19DVUJJQ19SRUwiLCJQQVRIU0VHX0NVUlZFVE9fUVVBRFJBVElDX1JFTCIsIlBBVEhTRUdfQVJDX1JFTCIsIlBBVEhTRUdfQ1VSVkVUT19DVUJJQ19TTU9PVEhfUkVMIiwiUEFUSFNFR19DVVJWRVRPX1FVQURSQVRJQ19TTU9PVEhfUkVMIiwiUEFUSFNFR19MSU5FVE9fSE9SSVpPTlRBTF9SRUwiLCJQQVRIU0VHX0xJTkVUT19WRVJUSUNBTF9SRUwiLCJQQVRIU0VHX1VOS05PV04iLCJQQVRIU0VHX0NMT1NFUEFUSCIsImFic1NlZyIsInJlbFNlZyIsInB1c2giLCJkcmF3UG9seWdvbk1hc2siLCJpdGVtIiwicGFydGljbGUiLCJQYXJ0aWNsZSIsIkVycm9yIiwiY29vcmRzIiwiZmxvb3IiLCJkaXN0YW5jZSIsInBvaW50IiwiZ2V0UG9pbnRBdExlbmd0aCIsImluZGV4IiwibnVtYmVyIiwidmFsdWUiLCJQYXRoMkQiLCJtb3ZlVG8iLCJmb3JFYWNoIiwicG9zIiwibGlu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LEVBQVc7QUFBQTs7QUFDUCwrQkFBQSxLQUFJLENBQUN6QixXQUFMLHdFQUFrQmtILE1BQWxCLENBQXlCRCxHQUFHLENBQUNoRyxDQUE3QixFQUFnQ2dHLEdBQUcsQ0FBQzNGLENBQXBDO0FBQ0g7QUFDSixPQUpEO0FBTUEsV0FBS3RCLFdBQUwsQ0FBaUJtSCxTQUFqQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7Q29udGFpbmVyfSBmcm9tIFwiLi9Db250YWluZXJcIjtcbmltcG9ydCB7SUNvb3JkaW5hdGVzfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9JQ29vcmRpbmF0ZXNcIjtcbmltcG9ydCB7UG9seWdvbk1hc2tUeXBlfSBmcm9tIFwiLi4vRW51bXMvUG9seWdvbk1hc2tUeXBlXCI7XG5pbXBvcnQge1BhcnRpY2xlfSBmcm9tIFwiLi9QYXJ0aWNsZVwiO1xuaW1wb3J0IHtQb2x5Z29uTWFza0lubGluZUFycmFuZ2VtZW50fSBmcm9tIFwiLi4vRW51bXMvUG9seWdvbk1hc2tJbmxpbmVBcnJhbmdlbWVudFwiO1xuXG50eXBlIFN2Z0Fic29sdXRlQ29vcmRpbmF0ZXNUeXBlcyA9XG4gICAgfCBTVkdQYXRoU2VnQXJjQWJzXG4gICAgfCBTVkdQYXRoU2VnQ3VydmV0b0N1YmljQWJzXG4gICAgfCBTVkdQYXRoU2VnQ3VydmV0b0N1YmljU21vb3RoQWJzXG4gICAgfCBTVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY0Fic1xuICAgIHwgU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNTbW9vdGhBYnNcbiAgICB8IFNWR1BhdGhTZWdMaW5ldG9BYnNcbiAgICB8IFNWR1BhdGhTZWdNb3ZldG9BYnM7XG5cbnR5cGUgU3ZnUmVsYXRpdmVDb29yZGluYXRlc1R5cGVzID1cbiAgICB8IFNWR1BhdGhTZWdBcmNSZWxcbiAgICB8IFNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWxcbiAgICB8IFNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhSZWxcbiAgICB8IFNWR1BhdGhTZWdDdXJ2ZXRvUXVhZHJhdGljUmVsXG4gICAgfCBTVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1Ntb290aFJlbFxuICAgIHwgU1ZHUGF0aFNlZ0xpbmV0b1JlbFxuICAgIHwgU1ZHUGF0aFNlZ01vdmV0b1JlbDtcblxuLyoqXG4gKiBQb2x5Z29uIE1hc2sgbWFuYWdlclxuICovXG5leHBvcnQgY2xhc3MgUG9seWdvbk1hc2sge1xuICAgIHB1YmxpYyByZWRyYXdUaW1lb3V0PzogbnVtYmVyO1xuICAgIHB1YmxpYyByYXc/OiBJQ29vcmRpbmF0ZXNbXTtcbiAgICBwdWJsaWMgc3ZnPzogU1ZHU1ZHRWxlbWVudDtcbiAgICBwdWJsaWMgcGF0aD86IFNWR1BhdGhFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb250YWluZXI6IENvbnRhaW5lcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhdGgyRFN1cHBvcnRlZDogYm9vbGVhbjtcbiAgICBwcml2YXRlIHBvbHlnb25QYXRoPzogUGF0aDJEO1xuICAgIHByaXZhdGUgcG9seWdvblBhdGhMZW5ndGg6IG51bWJlcjtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIG9mZnNldD86IElDb29yZGluYXRlcztcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLnBvbHlnb25QYXRoTGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5wYXRoMkRTdXBwb3J0ZWQgPSB3aW5kb3cuaGFzT3duUHJvcGVydHkoXCJQYXRoMkRcIik7XG4gICAgfVxuXG4gICAgcHVibGljIGNoZWNrSW5zaWRlUG9seWdvbihwb3NpdGlvbjogSUNvb3JkaW5hdGVzIHwgdW5kZWZpbmVkIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIGlmICghb3B0aW9ucy5wb2x5Z29uLmVuYWJsZSB8fFxuICAgICAgICAgICAgb3B0aW9ucy5wb2x5Z29uLnR5cGUgPT09IFBvbHlnb25NYXNrVHlwZS5ub25lIHx8XG4gICAgICAgICAgICBvcHRpb25zLnBvbHlnb24udHlwZSA9PT0gUG9seWdvbk1hc2tUeXBlLmlubGluZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc3Vic3RhY2svcG9pbnQtaW4tcG9seWdvblxuICAgICAgICAvLyByYXktY2FzdGluZyBhbGdvcml0aG0gYmFzZWQgb25cbiAgICAgICAgLy8gaHR0cDovL3d3dy5lY3NlLnJwaS5lZHUvSG9tZXBhZ2VzL3dyZi9SZXNlYXJjaC9TaG9ydF9Ob3Rlcy9wbnBvbHkuaHRtbFxuICAgICAgICBpZiAoIXRoaXMucmF3KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBwb2x5Z29uIGZvdW5kLCB5b3UgbmVlZCB0byBzcGVjaWZ5IFNWRyB1cmwgaW4gY29uZmlnLicpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4ID0gcG9zaXRpb24gPyBwb3NpdGlvbi54IDogTWF0aC5yYW5kb20oKSAqIGNvbnRhaW5lci5jYW52YXMuZGltZW5zaW9uLndpZHRoO1xuICAgICAgICBjb25zdCB5ID0gcG9zaXRpb24gPyBwb3NpdGlvbi55IDogTWF0aC5yYW5kb20oKSAqIGNvbnRhaW5lci5jYW52YXMuZGltZW5zaW9uLmhlaWdodDtcbiAgICAgICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLnBhdGgyRFN1cHBvcnRlZCAmJiB0aGlzLnBvbHlnb25QYXRoICYmIHBvc2l0aW9uKSB7XG4gICAgICAgICAgICBpbnNpZGUgPSBjb250YWluZXIuY2FudmFzLmlzUG9pbnRJblBhdGgodGhpcy5wb2x5Z29uUGF0aCwgcG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSB0aGlzLnJhdy5sZW5ndGggLSAxOyBpIDwgdGhpcy5yYXcubGVuZ3RoOyBqID0gaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeGkgPSB0aGlzLnJhd1tpXS54O1xuICAgICAgICAgICAgICAgIGNvbnN0IHlpID0gdGhpcy5yYXdbaV0ueTtcbiAgICAgICAgICAgICAgICBjb25zdCB4aiA9IHRoaXMucmF3W2pdLng7XG4gICAgICAgICAgICAgICAgY29uc3QgeWogPSB0aGlzLnJhd1tqXS55O1xuICAgICAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdCA9ICgoeWkgPiB5KSAhPT0gKHlqID4geSkpICYmICh4IDwgKHhqIC0geGkpICogKHkgLSB5aSkgLyAoeWogLSB5aSkgKyB4aSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJzZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2lkZSA9ICFpbnNpZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucG9seWdvbi50eXBlID09PSBQb2x5Z29uTWFza1R5cGUuaW5zaWRlKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5zaWRlO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMucG9seWdvbi50eXBlID09PSBQb2x5Z29uTWFza1R5cGUub3V0c2lkZSkge1xuICAgICAgICAgICAgcmV0dXJuICFpbnNpZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHJhbmRvbVBvaW50SW5Qb2x5Z29uKCk6IElDb29yZGluYXRlcyB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGFpbmVyLm9wdGlvbnM7XG5cbiAgICAgICAgbGV0IHBvc2l0aW9uOiBJQ29vcmRpbmF0ZXM7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucG9seWdvbi50eXBlID09PSBQb2x5Z29uTWFza1R5cGUuaW5saW5lKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvbnMucG9seWdvbi5pbmxpbmUuYXJyYW5nZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFBvbHlnb25NYXNrSW5saW5lQXJyYW5nZW1lbnQucmFuZG9tUG9pbnQ6XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5nZXRSYW5kb21Qb2ludE9uUG9seWdvblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBQb2x5Z29uTWFza0lubGluZUFycmFuZ2VtZW50LnJhbmRvbUxlbmd0aDpcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLmdldFJhbmRvbVBvaW50T25Qb2x5Z29uUGF0aEJ5TGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgUG9seWdvbk1hc2tJbmxpbmVBcnJhbmdlbWVudC5lcXVpZGlzdGFudDpcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLmdldEVxdWlkaXN0YW50UG9pbnRPblBvbHlnb25QYXRoQnlJbmRleChjb250YWluZXIucGFydGljbGVzLmFycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgUG9seWdvbk1hc2tJbmxpbmVBcnJhbmdlbWVudC5vbmVQZXJQb2ludDpcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9pbmdPblBvbHlnb25QYXRoQnlJbmRleChcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wYXJ0aWNsZXMuYXJyYXkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLnJhbmRvbSgpICogY29udGFpbmVyLmNhbnZhcy5kaW1lbnNpb24ud2lkdGgsXG4gICAgICAgICAgICAgICAgeTogTWF0aC5yYW5kb20oKSAqIGNvbnRhaW5lci5jYW52YXMuZGltZW5zaW9uLmhlaWdodCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja0luc2lkZVBvbHlnb24ocG9zaXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5kb21Qb2ludEluUG9seWdvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVwZW5kcyBvbiBTVkdQYXRoU2VnIEFQSSBwb2x5ZmlsbCBodHRwczovL2dpdGh1Yi5jb20vcHJvZ2Vycy9wYXRoc2VnIGZvciBDaHJvbWVcbiAgICAgKiBEZXByZWNhdGUgU1ZHUGF0aEVsZW1lbnQuZ2V0UGF0aFNlZ0F0TGVuZ3RoIHJlbW92ZWQgaW46XG4gICAgICogQ2hyb21lIGZvciBkZXNrdG9wIHJlbGVhc2UgNjJcbiAgICAgKiBDaHJvbWUgZm9yIEFuZHJvaWQgcmVsZWFzZSA2MlxuICAgICAqIEFuZHJvaWQgV2ViVmlldyByZWxlYXNlIDYyXG4gICAgICogT3BlcmEgcmVsZWFzZSA0OVxuICAgICAqIE9wZXJhIGZvciBBbmRyb2lkIHJlbGVhc2UgNDlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcGFyc2VTdmdQYXRoVG9Qb2x5Z29uKHN2Z1VybD86IHN0cmluZyk6IFByb21pc2U8SUNvb3JkaW5hdGVzW10gfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIub3B0aW9ucztcbiAgICAgICAgY29uc3QgdXJsID0gc3ZnVXJsIHx8IG9wdGlvbnMucG9seWdvbi51cmw7XG5cbiAgICAgICAgLy8gTG9hZCBTVkcgZnJvbSBmaWxlIG9uIHNlcnZlclxuICAgICAgICBpZiAoIXRoaXMucGF0aCB8fCAhdGhpcy5zdmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgICAgICBpZiAocmVxLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeG1sID0gYXdhaXQgcmVxLnRleHQoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoeG1sLCBcImltYWdlL3N2Zyt4bWxcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN2ZyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN2Z1wiKVswXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGggPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwYXRoXCIpWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGF0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb25QYXRoTGVuZ3RoID0gdGhpcy5wYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQYXRoMkQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInRzUGFydGljbGVzIEVycm9yIC0gZHVyaW5nIHBvbHlnb24gbWFzayBkb3dubG9hZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzY2FsZSA9IG9wdGlvbnMucG9seWdvbi5zY2FsZTtcblxuICAgICAgICB0aGlzLndpZHRoID0gcGFyc2VGbG9hdCh0aGlzLnN2Zy5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKSB8fCBcIjBcIikgKiBzY2FsZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBwYXJzZUZsb2F0KHRoaXMuc3ZnLmdldEF0dHJpYnV0ZShcImhlaWdodFwiKSB8fCBcIjBcIikgKiBzY2FsZTtcblxuICAgICAgICAvKiBjZW50ZXJpbmcgb2YgdGhlIHBvbHlnb24gbWFzayAqL1xuICAgICAgICB0aGlzLm9mZnNldCA9IHtcbiAgICAgICAgICAgIHg6IGNvbnRhaW5lci5jYW52YXMuZGltZW5zaW9uLndpZHRoIC8gMiAtIHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgeTogY29udGFpbmVyLmNhbnZhcy5kaW1lbnNpb24uaGVpZ2h0IC8gMiAtIHRoaXMuaGVpZ2h0IC8gMixcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLnBhdGgucGF0aFNlZ0xpc3QubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgY29uc3QgcG9seWdvblJhdzogSUNvb3JkaW5hdGVzW10gPSBbXTtcbiAgICAgICAgY29uc3QgcCA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQ6IFNWR1BhdGhTZWcgPSB0aGlzLnBhdGgucGF0aFNlZ0xpc3QuZ2V0SXRlbShpKTtcblxuICAgICAgICAgICAgc3dpdGNoIChzZWdtZW50LnBhdGhTZWdUeXBlKSB7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBBYnNvbHV0ZVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX01PVkVUT19BQlM6XG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19BQlM6XG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fQ1VCSUNfQUJTOlxuICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX1FVQURSQVRJQ19BQlM6XG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0FSQ19BQlM6XG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fQ1VCSUNfU01PT1RIX0FCUzpcbiAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfU01PT1RIX0FCUzpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWJzU2VnID0gc2VnbWVudCBhcyBTdmdBYnNvbHV0ZUNvb3JkaW5hdGVzVHlwZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgcC54ID0gYWJzU2VnLng7XG4gICAgICAgICAgICAgICAgICAgIHAueSA9IGFic1NlZy55O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fSE9SSVpPTlRBTF9BQlM6XG4gICAgICAgICAgICAgICAgICAgIHAueCA9IChzZWdtZW50IGFzIFNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsQWJzKS54O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19MSU5FVE9fVkVSVElDQUxfQUJTOlxuICAgICAgICAgICAgICAgICAgICBwLnkgPSAoc2VnbWVudCBhcyBTVkdQYXRoU2VnTGluZXRvVmVydGljYWxBYnMpLnk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBSZWxhdGl2ZVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19SRUw6XG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX01PVkVUT19SRUw6XG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fQ1VCSUNfUkVMOlxuICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93LlNWR1BhdGhTZWcuUEFUSFNFR19DVVJWRVRPX1FVQURSQVRJQ19SRUw6XG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0FSQ19SRUw6XG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0NVUlZFVE9fQ1VCSUNfU01PT1RIX1JFTDpcbiAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ1VSVkVUT19RVUFEUkFUSUNfU01PT1RIX1JFTDpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsU2VnID0gc2VnbWVudCBhcyBTdmdSZWxhdGl2ZUNvb3JkaW5hdGVzVHlwZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgcC54ICs9IHJlbFNlZy54O1xuICAgICAgICAgICAgICAgICAgICBwLnkgKz0gcmVsU2VnLnk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuU1ZHUGF0aFNlZy5QQVRIU0VHX0xJTkVUT19IT1JJWk9OVEFMX1JFTDpcbiAgICAgICAgICAgICAgICAgICAgcC54ICs9IChzZWdtZW50IGFzIFNWR1BhdGhTZWdMaW5ldG9Ib3Jpem9udGFsUmVsKS54O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfTElORVRPX1ZFUlRJQ0FMX1JFTDpcbiAgICAgICAgICAgICAgICAgICAgcC55ICs9IChzZWdtZW50IGFzIFNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbFJlbCkueTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfVU5LTk9XTjpcbiAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5TVkdQYXRoU2VnLlBBVEhTRUdfQ0xPU0VQQVRIOlxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGUgY2xvc2luZyBwYXRoIChhbmQgdGhlIFVOS05PV04pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBvbHlnb25SYXcucHVzaCh7XG4gICAgICAgICAgICAgICAgeDogcC54ICogc2NhbGUgKyB0aGlzLm9mZnNldC54LFxuICAgICAgICAgICAgICAgIHk6IHAueSAqIHNjYWxlICsgdGhpcy5vZmZzZXQueSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBvbHlnb25SYXc7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdQb2x5Z29uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICBpZiAodGhpcy5yYXcpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jYW52YXMuZHJhd1BvbHlnb25NYXNrKHRoaXMucmF3KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3UG9pbnRzT25Qb2x5Z29uUGF0aCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgaWYgKHRoaXMucmF3KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5yYXcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogaXRlbS54LFxuICAgICAgICAgICAgICAgICAgICB5OiBpdGVtLnksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZShjb250YWluZXIsIHBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wYXJ0aWNsZXMuYXJyYXkucHVzaChwYXJ0aWNsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmRvbVBvaW50T25Qb2x5Z29uUGF0aCgpOiBJQ29vcmRpbmF0ZXMge1xuICAgICAgICBpZiAoIXRoaXMucmF3IHx8ICF0aGlzLnJhdy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihgTm8gcG9seWdvbiBkYXRhIGxvYWRlZC5gKTtcblxuICAgICAgICBjb25zdCBjb29yZHMgPSB0aGlzLnJhd1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnJhdy5sZW5ndGgpXTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogY29vcmRzLngsXG4gICAgICAgICAgICB5OiBjb29yZHMueSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmRvbVBvaW50T25Qb2x5Z29uUGF0aEJ5TGVuZ3RoKCk6IElDb29yZGluYXRlcyB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGFpbmVyLm9wdGlvbnM7XG5cbiAgICAgICAgaWYgKCF0aGlzLnJhdyB8fCAhdGhpcy5yYXcubGVuZ3RoIHx8ICF0aGlzLnBhdGgpIHRocm93IG5ldyBFcnJvcihgTm8gcG9seWdvbiBkYXRhIGxvYWRlZC5gKTtcblxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMucG9seWdvblBhdGhMZW5ndGgpICsgMTtcbiAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLnBhdGguZ2V0UG9pbnRBdExlbmd0aChkaXN0YW5jZSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHBvaW50LnggKiBvcHRpb25zLnBvbHlnb24uc2NhbGUgKyAodGhpcy5vZmZzZXQ/LnggfHwgMCksXG4gICAgICAgICAgICB5OiBwb2ludC55ICogb3B0aW9ucy5wb2x5Z29uLnNjYWxlICsgKHRoaXMub2Zmc2V0Py55IHx8IDApLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RXF1aWRpc3RhbnRQb2ludE9uUG9seWdvblBhdGhCeUluZGV4KGluZGV4OiBudW1iZXIpOiBJQ29vcmRpbmF0ZXMge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIGlmICghdGhpcy5yYXcgfHwgIXRoaXMucmF3Lmxlbmd0aCB8fCAhdGhpcy5wYXRoKSB0aHJvdyBuZXcgRXJyb3IoYE5vIHBvbHlnb24gZGF0YSBsb2FkZWQuYCk7XG5cbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSAodGhpcy5wb2x5Z29uUGF0aExlbmd0aCAvIG9wdGlvbnMucGFydGljbGVzLm51bWJlci52YWx1ZSkgKiBpbmRleDtcbiAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLnBhdGguZ2V0UG9pbnRBdExlbmd0aChkaXN0YW5jZSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHBvaW50LnggKiBvcHRpb25zLnBvbHlnb24uc2NhbGUgKyAodGhpcy5vZmZzZXQ/LnggfHwgMCksXG4gICAgICAgICAgICB5OiBwb2ludC55ICogb3B0aW9ucy5wb2x5Z29uLnNjYWxlICsgKHRoaXMub2Zmc2V0Py55IHx8IDApLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UG9pbmdPblBvbHlnb25QYXRoQnlJbmRleChpbmRleDogbnVtYmVyKTogSUNvb3JkaW5hdGVzIHtcbiAgICAgICAgaWYgKCF0aGlzLnJhdyB8fCAhdGhpcy5yYXcubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoYE5vIHBvbHlnb24gZGF0YSBsb2FkZWQuYCk7XG5cbiAgICAgICAgY29uc3QgY29vcmRzID0gdGhpcy5yYXdbaW5kZXggJSB0aGlzLnJhdy5sZW5ndGhdO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBjb29yZHMueCxcbiAgICAgICAgICAgIHk6IGNvb3Jkcy55LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUGF0aDJEKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucGF0aDJEU3VwcG9ydGVkIHx8ICF0aGlzLnJhdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb2x5Z29uUGF0aCA9IG5ldyBQYXRoMkQoKTtcbiAgICAgICAgdGhpcy5wb2x5Z29uUGF0aC5tb3ZlVG8odGhpcy5yYXdbMF0ueCwgdGhpcy5yYXdbMF0ueSk7XG5cbiAgICAgICAgdGhpcy5yYXcuZm9yRWFjaCgocG9zLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb25QYXRoPy5saW5lVG8ocG9zLngsIHBvcy55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wb2x5Z29uUGF0aC5jbG9zZVBhdGgoKTtcbiAgICB9XG59XG4iXX0=