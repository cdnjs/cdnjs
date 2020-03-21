"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Canvas = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Constants = require("./Utils/Constants");

var _Utils = require("./Utils/Utils");

var _CanvasUtils = require("./Utils/CanvasUtils");

/**
 * Canvas manager
 */
var Canvas = /*#__PURE__*/function () {
  /**
   * The particles canvas
   */

  /**
   * The particles canvas dimension
   */

  /**
   * The parent container
   */

  /**
   * The particles canvas context
   */

  /**
   * Constructor of canvas manager
   * @param container the parent container
   */
  function Canvas(container) {
    (0, _classCallCheck2["default"])(this, Canvas);
    this.element = void 0;
    this.dimension = void 0;
    this.container = void 0;
    this.context = void 0;
    this.generatedCanvas = void 0;
    this.container = container;
    this.dimension = {
      height: 0,
      width: 0
    };
    this.context = null;
    this.generatedCanvas = false;
  }
  /* ---------- tsParticles functions - canvas ------------ */

  /**
   * Initializes the canvas element
   */


  (0, _createClass2["default"])(Canvas, [{
    key: "init",
    value: function init() {
      this.size();
      this.paint();
    }
  }, {
    key: "loadCanvas",
    value: function loadCanvas(canvas, generatedCanvas) {
      if (!canvas.className) {
        canvas.className = _Constants.Constants.canvasClass;
      }

      if (this.generatedCanvas) {
        var _this$element;

        (_this$element = this.element) === null || _this$element === void 0 ? void 0 : _this$element.remove();
      }

      this.generatedCanvas = generatedCanvas !== null && generatedCanvas !== void 0 ? generatedCanvas : false;
      this.element = canvas;
      this.dimension.height = canvas.offsetHeight;
      this.dimension.width = canvas.offsetWidth;
      this.context = this.element.getContext("2d");
      this.container.retina.init();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.generatedCanvas) {
        var _this$element2;

        (_this$element2 = this.element) === null || _this$element2 === void 0 ? void 0 : _this$element2.remove();
      }

      if (this.context) {
        _CanvasUtils.CanvasUtils.clear(this.context, this.dimension);
      }
    }
    /**
     * Calculates the size of the canvas
     */

  }, {
    key: "size",
    value: function size() {
      if (this.element) {
        this.element.width = this.dimension.width;
        this.element.height = this.dimension.height;
      }
    }
    /**
     * Paints the canvas background
     */

  }, {
    key: "paint",
    value: function paint() {
      var container = this.container;
      var options = container.options;

      if (this.context) {
        if (options.backgroundMask.enable && options.backgroundMask.cover) {
          var color = _Utils.Utils.getParticleColor(options.backgroundMask.cover);

          if (color) {
            this.paintBase(_Utils.Utils.getStyleFromColor(color));
          } else {
            this.paintBase();
          }
        } else {
          this.paintBase();
        }
      }
    }
    /**
     * Clears the canvas content
     */

  }, {
    key: "clear",
    value: function clear() {
      var container = this.container;
      var options = container.options;
      var trail = options.particles.move.trail;

      var fillColor = _Utils.Utils.hexToRgb(trail.fillColor);

      if (options.backgroundMask.enable) {
        this.paint();
      } else if (trail.enable && trail.length > 0 && fillColor) {
        this.paintBase("rgba(".concat(fillColor.r, ", ").concat(fillColor.g, ", ").concat(fillColor.b, ",").concat(1 / trail.length));
      } else {
        if (this.context) {
          _CanvasUtils.CanvasUtils.clear(this.context, this.dimension);
        }
      }
    }
  }, {
    key: "isPointInPath",
    value: function isPointInPath(path, point) {
      var _ref, _this$context;

      return (_ref = (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.isPointInPath(path, point.x, point.y)) !== null && _ref !== void 0 ? _ref : false;
    }
  }, {
    key: "drawPolygonMask",
    value: function drawPolygonMask(rawData) {
      var container = this.container;
      var options = container.options;
      var context = this.context;
      var polygonDraw = options.polygon.draw;

      if (context) {
        _CanvasUtils.CanvasUtils.drawPolygonMask(context, rawData, polygonDraw.stroke);
      }
    }
  }, {
    key: "drawLinkedLine",
    value: function drawLinkedLine(p1, p2, pos1, pos2, opacity) {
      var container = this.container;
      var options = container.options;
      var ctx = this.context;

      if (!ctx) {
        return;
      }

      var colorLine;
      /*
       * particles connecting line color:
       *
       *  random: in blink mode : in every frame refresh the color would change
       *          hence resulting blinking of lines
       *  mid: in consent mode: sample particles color and get a mid level color
       *                        from those two for the connecting line color
       */

      if (container.particles.lineLinkedColor === "random") {
        colorLine = _Utils.Utils.getRandomColorRGBA();
      } else if (container.particles.lineLinkedColor == "mid" && p1.color && p2.color) {
        var sourceColor = p1.color;
        var destColor = p2.color;
        colorLine = {
          b: Math.floor(_Utils.Utils.mixComponents(sourceColor.b, destColor.b, p1.radius, p2.radius)),
          g: Math.floor(_Utils.Utils.mixComponents(sourceColor.g, destColor.g, p1.radius, p2.radius)),
          r: Math.floor(_Utils.Utils.mixComponents(sourceColor.r, destColor.r, p1.radius, p2.radius))
        };
      } else {
        colorLine = container.particles.lineLinkedColor;
      }

      var width = container.retina.lineLinkedWidth;

      _CanvasUtils.CanvasUtils.drawLineLinked(ctx, width, pos1, pos2, options.backgroundMask.enable, colorLine, opacity, options.particles.lineLinked.shadow);
    }
  }, {
    key: "drawConnectLine",
    value: function drawConnectLine(p1, p2) {
      var lineStyle = this.lineStyle(p1, p2);

      if (!lineStyle) {
        return;
      }

      var ctx = this.context;

      if (!ctx) {
        return;
      }

      _CanvasUtils.CanvasUtils.drawConnectLine(ctx, this.container.retina.lineLinkedWidth, lineStyle, p1.position, p2.position);
    }
  }, {
    key: "drawGrabLine",
    value: function drawGrabLine(particle, opacity, mousePos) {
      var container = this.container;
      var options = container.options;
      var optColor = options.particles.lineLinked.color;

      var lineColor = container.particles.lineLinkedColor || _Utils.Utils.hexToRgb(optColor);

      if (lineColor == "random") {
        lineColor = _Utils.Utils.getRandomColorRGBA();
      }

      container.particles.lineLinkedColor = lineColor;
      var colorLine = {
        r: 127,
        g: 127,
        b: 127
      };
      var ctx = container.canvas.context;

      if (!ctx) {
        return;
      }

      if (container.particles.lineLinkedColor == "random") {
        colorLine = _Utils.Utils.getRandomColorRGBA();
      } else {
        colorLine = container.particles.lineLinkedColor || colorLine;
      }

      var beginPos = {
        x: particle.position.x + particle.offset.x,
        y: particle.position.y + particle.offset.y
      };

      _CanvasUtils.CanvasUtils.drawGrabLine(ctx, container.retina.lineLinkedWidth, beginPos, mousePos, colorLine, opacity);
    }
  }, {
    key: "drawParticle",
    value: function drawParticle(particle) {
      var container = this.container;
      var options = container.options;
      var radius;
      var opacity;
      var colorValue;

      if (particle.bubbler.radius !== undefined) {
        radius = particle.bubbler.radius;
      } else {
        radius = particle.radius;
      }

      if (particle.bubbler.opacity !== undefined) {
        opacity = particle.bubbler.opacity;
      } else {
        opacity = particle.opacity.value;
      }

      if (particle.color) {
        colorValue = "rgba(".concat(particle.color.r, ", ").concat(particle.color.g, ", ").concat(particle.color.b, ", ").concat(opacity, ")");
      }

      if (!this.context || !colorValue) {
        return;
      }

      _CanvasUtils.CanvasUtils.drawParticle(this.context, particle, colorValue, options.backgroundMask.enable, radius, options.particles.shape.stroke);
    }
  }, {
    key: "paintBase",
    value: function paintBase(baseColor) {
      if (this.context) {
        _CanvasUtils.CanvasUtils.paintBase(this.context, this.dimension, baseColor);
      }
    }
  }, {
    key: "lineStyle",
    value: function lineStyle(p1, p2) {
      if (p1.color && p2.color) {
        var sourceRgb = p1.color;
        var destRgb = p2.color;
        var rgb = {
          b: _Utils.Utils.mixComponents(sourceRgb.b, destRgb.b, p1.radius, p2.radius),
          g: _Utils.Utils.mixComponents(sourceRgb.g, destRgb.g, p1.radius, p2.radius),
          r: _Utils.Utils.mixComponents(sourceRgb.r, destRgb.r, p1.radius, p2.radius)
        };

        var midColor = _Utils.Utils.getStyleFromColor(rgb);

        if (this.context) {
          return _CanvasUtils.CanvasUtils.gradient(this.context, p1, p2, midColor);
        }
      }
    }
  }]);
  return Canvas;
}();

exports.Canvas = Canvas;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DbGFzc2VzL0NhbnZhcy50cyJdLCJuYW1lcyI6WyJDYW52YXMiLCJjb250YWluZXIiLCJlbGVtZW50IiwiZGltZW5zaW9uIiwiY29udGV4dCIsImdlbmVyYXRlZENhbnZhcyIsImhlaWdodCIsIndpZHRoIiwic2l6ZSIsInBhaW50IiwiY2FudmFzIiwiY2xhc3NOYW1lIiwiQ29uc3RhbnRzIiwiY2FudmFzQ2xhc3MiLCJyZW1vdmUiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRXaWR0aCIsImdldENvbnRleHQiLCJyZXRpbmEiLCJpbml0IiwiQ2FudmFzVXRpbHMiLCJjbGVhciIsIm9wdGlvbnMiLCJiYWNrZ3JvdW5kTWFzayIsImVuYWJsZSIsImNvdmVyIiwiY29sb3IiLCJVdGlscyIsImdldFBhcnRpY2xlQ29sb3IiLCJwYWludEJhc2UiLCJnZXRTdHlsZUZyb21Db2xvciIsInRyYWlsIiwicGFydGljbGVzIiwibW92ZSIsImZpbGxDb2xvciIsImhleFRvUmdiIiwibGVuZ3RoIiwiciIsImciLCJiIiwicGF0aCIsInBvaW50IiwiaXNQb2ludEluUGF0aCIsIngiLCJ5IiwicmF3RGF0YSIsInBvbHlnb25EcmF3IiwicG9seWdvbiIsImRyYXciLCJkcmF3UG9seWdvbk1hc2siLCJzdHJva2UiLCJwMSIsInAyIiwicG9zMSIsInBvczIiLCJvcGFjaXR5IiwiY3R4IiwiY29sb3JMaW5lIiwibGluZUxpbmtlZENvbG9yIiwiZ2V0UmFuZG9tQ29sb3JSR0JBIiwic291cmNlQ29sb3IiLCJkZXN0Q29sb3IiLCJNYXRoIiwiZmxvb3IiLCJtaXhDb21wb25lbnRzIiwicmFkaXVzIiwibGluZUxpbmtlZFdpZHRoIiwiZHJhd0xpbmVMaW5rZWQiLCJsaW5lTGlua2VkIiwic2hhZG93IiwibGluZVN0eWxlIiwiZHJhd0Nvbm5lY3RMaW5lIiwicG9zaXRpb24iLCJwYXJ0aWNsZSIsIm1vdXNlUG9zIiwib3B0Q29sb3IiLCJsaW5lQ29sb3IiLCJiZWdpblBvcyIsIm9mZnNldCIsImRyYXdHcmFiTGluZSIsImNvbG9yVmFsdWUiLCJidWJibGVyIiwidW5kZWZpbmVkIiwidmFsdWUiLCJkcmF3UGFydGljbGUiLCJzaGFwZSIsImJhc2VDb2xvciIsInNvdXJjZVJnYiIsImRlc3RSZ2IiLCJyZ2IiLCJtaWRDb2xvciIsImdyYWRpZW50Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztBQUVBOztBQUdBOztBQUlBOztBQUVBOzs7SUFHYUEsTTtBQUNUOzs7O0FBSUE7Ozs7QUFLQTs7OztBQUtBOzs7O0FBT0E7Ozs7QUFJQSxrQkFBWUMsU0FBWixFQUFrQztBQUFBO0FBQUEsU0F0QjNCQyxPQXNCMkI7QUFBQSxTQWxCbEJDLFNBa0JrQjtBQUFBLFNBYmpCRixTQWFpQjtBQUFBLFNBUjFCRyxPQVEwQjtBQUFBLFNBTjFCQyxlQU0wQjtBQUM5QixTQUFLSixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtFLFNBQUwsR0FBaUI7QUFDYkcsTUFBQUEsTUFBTSxFQUFFLENBREs7QUFFYkMsTUFBQUEsS0FBSyxFQUFFO0FBRk0sS0FBakI7QUFLQSxTQUFLSCxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsS0FBdkI7QUFDSDtBQUVEOztBQUNBOzs7Ozs7OzJCQUdvQjtBQUNoQixXQUFLRyxJQUFMO0FBQ0EsV0FBS0MsS0FBTDtBQUNIOzs7K0JBRWlCQyxNLEVBQTJCTCxlLEVBQWlDO0FBQzFFLFVBQUksQ0FBQ0ssTUFBTSxDQUFDQyxTQUFaLEVBQXVCO0FBQ25CRCxRQUFBQSxNQUFNLENBQUNDLFNBQVAsR0FBbUJDLHFCQUFVQyxXQUE3QjtBQUNIOztBQUVELFVBQUksS0FBS1IsZUFBVCxFQUEwQjtBQUFBOztBQUN0Qiw4QkFBS0gsT0FBTCxnRUFBY1ksTUFBZDtBQUNIOztBQUVELFdBQUtULGVBQUwsR0FBdUJBLGVBQXZCLGFBQXVCQSxlQUF2QixjQUF1QkEsZUFBdkIsR0FBMEMsS0FBMUM7QUFDQSxXQUFLSCxPQUFMLEdBQWVRLE1BQWY7QUFDQSxXQUFLUCxTQUFMLENBQWVHLE1BQWYsR0FBd0JJLE1BQU0sQ0FBQ0ssWUFBL0I7QUFDQSxXQUFLWixTQUFMLENBQWVJLEtBQWYsR0FBdUJHLE1BQU0sQ0FBQ00sV0FBOUI7QUFDQSxXQUFLWixPQUFMLEdBQWUsS0FBS0YsT0FBTCxDQUFhZSxVQUFiLENBQXdCLElBQXhCLENBQWY7QUFDQSxXQUFLaEIsU0FBTCxDQUFlaUIsTUFBZixDQUFzQkMsSUFBdEI7QUFDSDs7OzhCQUVzQjtBQUNuQixVQUFJLEtBQUtkLGVBQVQsRUFBMEI7QUFBQTs7QUFDdEIsK0JBQUtILE9BQUwsa0VBQWNZLE1BQWQ7QUFDSDs7QUFFRCxVQUFJLEtBQUtWLE9BQVQsRUFBa0I7QUFDZGdCLGlDQUFZQyxLQUFaLENBQWtCLEtBQUtqQixPQUF2QixFQUFnQyxLQUFLRCxTQUFyQztBQUNIO0FBQ0o7QUFFRDs7Ozs7OzJCQUdvQjtBQUNoQixVQUFJLEtBQUtELE9BQVQsRUFBa0I7QUFDZCxhQUFLQSxPQUFMLENBQWFLLEtBQWIsR0FBcUIsS0FBS0osU0FBTCxDQUFlSSxLQUFwQztBQUNBLGFBQUtMLE9BQUwsQ0FBYUksTUFBYixHQUFzQixLQUFLSCxTQUFMLENBQWVHLE1BQXJDO0FBQ0g7QUFDSjtBQUVEOzs7Ozs7NEJBR3FCO0FBQ2pCLFVBQU1MLFNBQVMsR0FBRyxLQUFLQSxTQUF2QjtBQUNBLFVBQU1xQixPQUFPLEdBQUdyQixTQUFTLENBQUNxQixPQUExQjs7QUFFQSxVQUFJLEtBQUtsQixPQUFULEVBQWtCO0FBQ2QsWUFBSWtCLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsTUFBdkIsSUFBaUNGLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkUsS0FBNUQsRUFBbUU7QUFDL0QsY0FBTUMsS0FBSyxHQUFHQyxhQUFNQyxnQkFBTixDQUF1Qk4sT0FBTyxDQUFDQyxjQUFSLENBQXVCRSxLQUE5QyxDQUFkOztBQUVBLGNBQUlDLEtBQUosRUFBVztBQUNQLGlCQUFLRyxTQUFMLENBQWVGLGFBQU1HLGlCQUFOLENBQXdCSixLQUF4QixDQUFmO0FBQ0gsV0FGRCxNQUVPO0FBQ0gsaUJBQUtHLFNBQUw7QUFDSDtBQUNKLFNBUkQsTUFRTztBQUNILGVBQUtBLFNBQUw7QUFDSDtBQUNKO0FBQ0o7QUFFRDs7Ozs7OzRCQUdxQjtBQUNqQixVQUFNNUIsU0FBUyxHQUFHLEtBQUtBLFNBQXZCO0FBQ0EsVUFBTXFCLE9BQU8sR0FBR3JCLFNBQVMsQ0FBQ3FCLE9BQTFCO0FBQ0EsVUFBTVMsS0FBSyxHQUFHVCxPQUFPLENBQUNVLFNBQVIsQ0FBa0JDLElBQWxCLENBQXVCRixLQUFyQzs7QUFDQSxVQUFNRyxTQUFTLEdBQUdQLGFBQU1RLFFBQU4sQ0FBZUosS0FBSyxDQUFDRyxTQUFyQixDQUFsQjs7QUFFQSxVQUFJWixPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLE1BQTNCLEVBQW1DO0FBQy9CLGFBQUtmLEtBQUw7QUFDSCxPQUZELE1BRU8sSUFBSXNCLEtBQUssQ0FBQ1AsTUFBTixJQUFnQk8sS0FBSyxDQUFDSyxNQUFOLEdBQWUsQ0FBL0IsSUFBb0NGLFNBQXhDLEVBQW1EO0FBQ3RELGFBQUtMLFNBQUwsZ0JBQXVCSyxTQUFTLENBQUNHLENBQWpDLGVBQXVDSCxTQUFTLENBQUNJLENBQWpELGVBQXVESixTQUFTLENBQUNLLENBQWpFLGNBQXNFLElBQUlSLEtBQUssQ0FBQ0ssTUFBaEY7QUFDSCxPQUZNLE1BRUE7QUFDSCxZQUFJLEtBQUtoQyxPQUFULEVBQWtCO0FBQ2RnQixtQ0FBWUMsS0FBWixDQUFrQixLQUFLakIsT0FBdkIsRUFBZ0MsS0FBS0QsU0FBckM7QUFDSDtBQUNKO0FBQ0o7OztrQ0FFb0JxQyxJLEVBQWNDLEssRUFBOEI7QUFBQTs7QUFDN0Qsc0NBQU8sS0FBS3JDLE9BQVosa0RBQU8sY0FBY3NDLGFBQWQsQ0FBNEJGLElBQTVCLEVBQWtDQyxLQUFLLENBQUNFLENBQXhDLEVBQTJDRixLQUFLLENBQUNHLENBQWpELENBQVAsdUNBQThELEtBQTlEO0FBQ0g7OztvQ0FFc0JDLE8sRUFBK0I7QUFDbEQsVUFBTTVDLFNBQVMsR0FBRyxLQUFLQSxTQUF2QjtBQUNBLFVBQU1xQixPQUFPLEdBQUdyQixTQUFTLENBQUNxQixPQUExQjtBQUNBLFVBQU1sQixPQUFPLEdBQUcsS0FBS0EsT0FBckI7QUFDQSxVQUFNMEMsV0FBVyxHQUFHeEIsT0FBTyxDQUFDeUIsT0FBUixDQUFnQkMsSUFBcEM7O0FBRUEsVUFBSTVDLE9BQUosRUFBYTtBQUNUZ0IsaUNBQVk2QixlQUFaLENBQTRCN0MsT0FBNUIsRUFBcUN5QyxPQUFyQyxFQUE4Q0MsV0FBVyxDQUFDSSxNQUExRDtBQUNIO0FBQ0o7OzttQ0FFcUJDLEUsRUFBY0MsRSxFQUFjQyxJLEVBQW9CQyxJLEVBQW9CQyxPLEVBQXVCO0FBQzdHLFVBQU10RCxTQUFTLEdBQUcsS0FBS0EsU0FBdkI7QUFDQSxVQUFNcUIsT0FBTyxHQUFHckIsU0FBUyxDQUFDcUIsT0FBMUI7QUFFQSxVQUFNa0MsR0FBRyxHQUFHLEtBQUtwRCxPQUFqQjs7QUFFQSxVQUFJLENBQUNvRCxHQUFMLEVBQVU7QUFDTjtBQUNIOztBQUVELFVBQUlDLFNBQUo7QUFFQTs7Ozs7Ozs7O0FBU0EsVUFBSXhELFNBQVMsQ0FBQytCLFNBQVYsQ0FBb0IwQixlQUFwQixLQUF3QyxRQUE1QyxFQUFzRDtBQUNsREQsUUFBQUEsU0FBUyxHQUFHOUIsYUFBTWdDLGtCQUFOLEVBQVo7QUFDSCxPQUZELE1BRU8sSUFBSTFELFNBQVMsQ0FBQytCLFNBQVYsQ0FBb0IwQixlQUFwQixJQUF1QyxLQUF2QyxJQUFnRFAsRUFBRSxDQUFDekIsS0FBbkQsSUFBNEQwQixFQUFFLENBQUMxQixLQUFuRSxFQUEwRTtBQUM3RSxZQUFNa0MsV0FBVyxHQUFHVCxFQUFFLENBQUN6QixLQUF2QjtBQUNBLFlBQU1tQyxTQUFTLEdBQUdULEVBQUUsQ0FBQzFCLEtBQXJCO0FBRUErQixRQUFBQSxTQUFTLEdBQUc7QUFDUmxCLFVBQUFBLENBQUMsRUFBRXVCLElBQUksQ0FBQ0MsS0FBTCxDQUFXcEMsYUFBTXFDLGFBQU4sQ0FBb0JKLFdBQVcsQ0FBQ3JCLENBQWhDLEVBQW1Dc0IsU0FBUyxDQUFDdEIsQ0FBN0MsRUFBZ0RZLEVBQUUsQ0FBQ2MsTUFBbkQsRUFBMkRiLEVBQUUsQ0FBQ2EsTUFBOUQsQ0FBWCxDQURLO0FBRVIzQixVQUFBQSxDQUFDLEVBQUV3QixJQUFJLENBQUNDLEtBQUwsQ0FBV3BDLGFBQU1xQyxhQUFOLENBQW9CSixXQUFXLENBQUN0QixDQUFoQyxFQUFtQ3VCLFNBQVMsQ0FBQ3ZCLENBQTdDLEVBQWdEYSxFQUFFLENBQUNjLE1BQW5ELEVBQTJEYixFQUFFLENBQUNhLE1BQTlELENBQVgsQ0FGSztBQUdSNUIsVUFBQUEsQ0FBQyxFQUFFeUIsSUFBSSxDQUFDQyxLQUFMLENBQVdwQyxhQUFNcUMsYUFBTixDQUFvQkosV0FBVyxDQUFDdkIsQ0FBaEMsRUFBbUN3QixTQUFTLENBQUN4QixDQUE3QyxFQUFnRGMsRUFBRSxDQUFDYyxNQUFuRCxFQUEyRGIsRUFBRSxDQUFDYSxNQUE5RCxDQUFYO0FBSEssU0FBWjtBQUtILE9BVE0sTUFTQTtBQUNIUixRQUFBQSxTQUFTLEdBQUd4RCxTQUFTLENBQUMrQixTQUFWLENBQW9CMEIsZUFBaEM7QUFDSDs7QUFFRCxVQUFNbkQsS0FBSyxHQUFHTixTQUFTLENBQUNpQixNQUFWLENBQWlCZ0QsZUFBL0I7O0FBRUE5QywrQkFBWStDLGNBQVosQ0FBMkJYLEdBQTNCLEVBQ0lqRCxLQURKLEVBRUk4QyxJQUZKLEVBR0lDLElBSEosRUFJSWhDLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsTUFKM0IsRUFLSWlDLFNBTEosRUFNSUYsT0FOSixFQU9JakMsT0FBTyxDQUFDVSxTQUFSLENBQWtCb0MsVUFBbEIsQ0FBNkJDLE1BUGpDO0FBUUg7OztvQ0FFc0JsQixFLEVBQWNDLEUsRUFBb0I7QUFDckQsVUFBTWtCLFNBQVMsR0FBRyxLQUFLQSxTQUFMLENBQWVuQixFQUFmLEVBQW1CQyxFQUFuQixDQUFsQjs7QUFFQSxVQUFJLENBQUNrQixTQUFMLEVBQWdCO0FBQ1o7QUFDSDs7QUFFRCxVQUFNZCxHQUFHLEdBQUcsS0FBS3BELE9BQWpCOztBQUVBLFVBQUksQ0FBQ29ELEdBQUwsRUFBVTtBQUNOO0FBQ0g7O0FBRURwQywrQkFBWW1ELGVBQVosQ0FBNEJmLEdBQTVCLEVBQWlDLEtBQUt2RCxTQUFMLENBQWVpQixNQUFmLENBQXNCZ0QsZUFBdkQsRUFBd0VJLFNBQXhFLEVBQW1GbkIsRUFBRSxDQUFDcUIsUUFBdEYsRUFBZ0dwQixFQUFFLENBQUNvQixRQUFuRztBQUNIOzs7aUNBRW1CQyxRLEVBQW9CbEIsTyxFQUFpQm1CLFEsRUFBOEI7QUFDbkYsVUFBTXpFLFNBQVMsR0FBRyxLQUFLQSxTQUF2QjtBQUNBLFVBQU1xQixPQUFPLEdBQUdyQixTQUFTLENBQUNxQixPQUExQjtBQUNBLFVBQU1xRCxRQUFRLEdBQUdyRCxPQUFPLENBQUNVLFNBQVIsQ0FBa0JvQyxVQUFsQixDQUE2QjFDLEtBQTlDOztBQUVBLFVBQUlrRCxTQUFTLEdBQUczRSxTQUFTLENBQUMrQixTQUFWLENBQW9CMEIsZUFBcEIsSUFBdUMvQixhQUFNUSxRQUFOLENBQWV3QyxRQUFmLENBQXZEOztBQUVBLFVBQUlDLFNBQVMsSUFBSSxRQUFqQixFQUEyQjtBQUN2QkEsUUFBQUEsU0FBUyxHQUFHakQsYUFBTWdDLGtCQUFOLEVBQVo7QUFDSDs7QUFFRDFELE1BQUFBLFNBQVMsQ0FBQytCLFNBQVYsQ0FBb0IwQixlQUFwQixHQUFzQ2tCLFNBQXRDO0FBRUEsVUFBSW5CLFNBQWUsR0FBRztBQUFDcEIsUUFBQUEsQ0FBQyxFQUFFLEdBQUo7QUFBU0MsUUFBQUEsQ0FBQyxFQUFFLEdBQVo7QUFBaUJDLFFBQUFBLENBQUMsRUFBRTtBQUFwQixPQUF0QjtBQUNBLFVBQU1pQixHQUFHLEdBQUd2RCxTQUFTLENBQUNTLE1BQVYsQ0FBaUJOLE9BQTdCOztBQUVBLFVBQUksQ0FBQ29ELEdBQUwsRUFBVTtBQUNOO0FBQ0g7O0FBRUQsVUFBSXZELFNBQVMsQ0FBQytCLFNBQVYsQ0FBb0IwQixlQUFwQixJQUF1QyxRQUEzQyxFQUFxRDtBQUNqREQsUUFBQUEsU0FBUyxHQUFHOUIsYUFBTWdDLGtCQUFOLEVBQVo7QUFDSCxPQUZELE1BRU87QUFDSEYsUUFBQUEsU0FBUyxHQUFHeEQsU0FBUyxDQUFDK0IsU0FBVixDQUFvQjBCLGVBQXBCLElBQStDRCxTQUEzRDtBQUNIOztBQUVELFVBQU1vQixRQUFRLEdBQUc7QUFDYmxDLFFBQUFBLENBQUMsRUFBRThCLFFBQVEsQ0FBQ0QsUUFBVCxDQUFrQjdCLENBQWxCLEdBQXNCOEIsUUFBUSxDQUFDSyxNQUFULENBQWdCbkMsQ0FENUI7QUFFYkMsUUFBQUEsQ0FBQyxFQUFFNkIsUUFBUSxDQUFDRCxRQUFULENBQWtCNUIsQ0FBbEIsR0FBc0I2QixRQUFRLENBQUNLLE1BQVQsQ0FBZ0JsQztBQUY1QixPQUFqQjs7QUFLQXhCLCtCQUFZMkQsWUFBWixDQUF5QnZCLEdBQXpCLEVBQThCdkQsU0FBUyxDQUFDaUIsTUFBVixDQUFpQmdELGVBQS9DLEVBQWdFVyxRQUFoRSxFQUEwRUgsUUFBMUUsRUFBb0ZqQixTQUFwRixFQUErRkYsT0FBL0Y7QUFDSDs7O2lDQUVtQmtCLFEsRUFBMEI7QUFDMUMsVUFBTXhFLFNBQVMsR0FBRyxLQUFLQSxTQUF2QjtBQUNBLFVBQU1xQixPQUFPLEdBQUdyQixTQUFTLENBQUNxQixPQUExQjtBQUVBLFVBQUkyQyxNQUFKO0FBQ0EsVUFBSVYsT0FBSjtBQUNBLFVBQUl5QixVQUFKOztBQUVBLFVBQUlQLFFBQVEsQ0FBQ1EsT0FBVCxDQUFpQmhCLE1BQWpCLEtBQTRCaUIsU0FBaEMsRUFBMkM7QUFDdkNqQixRQUFBQSxNQUFNLEdBQUdRLFFBQVEsQ0FBQ1EsT0FBVCxDQUFpQmhCLE1BQTFCO0FBQ0gsT0FGRCxNQUVPO0FBQ0hBLFFBQUFBLE1BQU0sR0FBR1EsUUFBUSxDQUFDUixNQUFsQjtBQUNIOztBQUVELFVBQUlRLFFBQVEsQ0FBQ1EsT0FBVCxDQUFpQjFCLE9BQWpCLEtBQTZCMkIsU0FBakMsRUFBNEM7QUFDeEMzQixRQUFBQSxPQUFPLEdBQUdrQixRQUFRLENBQUNRLE9BQVQsQ0FBaUIxQixPQUEzQjtBQUNILE9BRkQsTUFFTztBQUNIQSxRQUFBQSxPQUFPLEdBQUdrQixRQUFRLENBQUNsQixPQUFULENBQWlCNEIsS0FBM0I7QUFDSDs7QUFFRCxVQUFJVixRQUFRLENBQUMvQyxLQUFiLEVBQW9CO0FBQ2hCc0QsUUFBQUEsVUFBVSxrQkFBV1AsUUFBUSxDQUFDL0MsS0FBVCxDQUFlVyxDQUExQixlQUFnQ29DLFFBQVEsQ0FBQy9DLEtBQVQsQ0FBZVksQ0FBL0MsZUFBcURtQyxRQUFRLENBQUMvQyxLQUFULENBQWVhLENBQXBFLGVBQTBFZ0IsT0FBMUUsTUFBVjtBQUNIOztBQUVELFVBQUksQ0FBQyxLQUFLbkQsT0FBTixJQUFpQixDQUFDNEUsVUFBdEIsRUFBa0M7QUFDOUI7QUFDSDs7QUFFRDVELCtCQUFZZ0UsWUFBWixDQUF5QixLQUFLaEYsT0FBOUIsRUFDSXFFLFFBREosRUFFSU8sVUFGSixFQUdJMUQsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxNQUgzQixFQUlJeUMsTUFKSixFQUlZM0MsT0FBTyxDQUFDVSxTQUFSLENBQWtCcUQsS0FBbEIsQ0FBd0JuQyxNQUpwQztBQUtIOzs7OEJBRWlCb0MsUyxFQUEwQjtBQUN4QyxVQUFJLEtBQUtsRixPQUFULEVBQWtCO0FBQ2RnQixpQ0FBWVMsU0FBWixDQUFzQixLQUFLekIsT0FBM0IsRUFBb0MsS0FBS0QsU0FBekMsRUFBb0RtRixTQUFwRDtBQUNIO0FBQ0o7Ozs4QkFFaUJuQyxFLEVBQWNDLEUsRUFBMEM7QUFDdEUsVUFBSUQsRUFBRSxDQUFDekIsS0FBSCxJQUFZMEIsRUFBRSxDQUFDMUIsS0FBbkIsRUFBMEI7QUFDdEIsWUFBTTZELFNBQVMsR0FBR3BDLEVBQUUsQ0FBQ3pCLEtBQXJCO0FBQ0EsWUFBTThELE9BQU8sR0FBR3BDLEVBQUUsQ0FBQzFCLEtBQW5CO0FBRUEsWUFBTStELEdBQUcsR0FBRztBQUNSbEQsVUFBQUEsQ0FBQyxFQUFFWixhQUFNcUMsYUFBTixDQUFvQnVCLFNBQVMsQ0FBQ2hELENBQTlCLEVBQWlDaUQsT0FBTyxDQUFDakQsQ0FBekMsRUFBNENZLEVBQUUsQ0FBQ2MsTUFBL0MsRUFBdURiLEVBQUUsQ0FBQ2EsTUFBMUQsQ0FESztBQUVSM0IsVUFBQUEsQ0FBQyxFQUFFWCxhQUFNcUMsYUFBTixDQUFvQnVCLFNBQVMsQ0FBQ2pELENBQTlCLEVBQWlDa0QsT0FBTyxDQUFDbEQsQ0FBekMsRUFBNENhLEVBQUUsQ0FBQ2MsTUFBL0MsRUFBdURiLEVBQUUsQ0FBQ2EsTUFBMUQsQ0FGSztBQUdSNUIsVUFBQUEsQ0FBQyxFQUFFVixhQUFNcUMsYUFBTixDQUFvQnVCLFNBQVMsQ0FBQ2xELENBQTlCLEVBQWlDbUQsT0FBTyxDQUFDbkQsQ0FBekMsRUFBNENjLEVBQUUsQ0FBQ2MsTUFBL0MsRUFBdURiLEVBQUUsQ0FBQ2EsTUFBMUQ7QUFISyxTQUFaOztBQU1BLFlBQU15QixRQUFRLEdBQUcvRCxhQUFNRyxpQkFBTixDQUF3QjJELEdBQXhCLENBQWpCOztBQUVBLFlBQUksS0FBS3JGLE9BQVQsRUFBa0I7QUFDZCxpQkFBT2dCLHlCQUFZdUUsUUFBWixDQUFxQixLQUFLdkYsT0FBMUIsRUFBbUMrQyxFQUFuQyxFQUF1Q0MsRUFBdkMsRUFBMkNzQyxRQUEzQyxDQUFQO0FBQ0g7QUFDSjtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7Q29uc3RhbnRzfSBmcm9tIFwiLi9VdGlscy9Db25zdGFudHNcIjtcbmltcG9ydCB7Q29udGFpbmVyfSBmcm9tIFwiLi9Db250YWluZXJcIjtcbmltcG9ydCB7SURpbWVuc2lvbn0gZnJvbSBcIi4uL0ludGVyZmFjZXMvSURpbWVuc2lvblwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vVXRpbHMvVXRpbHNcIjtcbmltcG9ydCB7SVJnYn0gZnJvbSBcIi4uL0ludGVyZmFjZXMvSVJnYlwiO1xuaW1wb3J0IHtQYXJ0aWNsZX0gZnJvbSBcIi4vUGFydGljbGVcIjtcbmltcG9ydCB7SUNvb3JkaW5hdGVzfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9JQ29vcmRpbmF0ZXNcIjtcbmltcG9ydCB7Q2FudmFzVXRpbHN9IGZyb20gXCIuL1V0aWxzL0NhbnZhc1V0aWxzXCI7XG5cbi8qKlxuICogQ2FudmFzIG1hbmFnZXJcbiAqL1xuZXhwb3J0IGNsYXNzIENhbnZhcyB7XG4gICAgLyoqXG4gICAgICogVGhlIHBhcnRpY2xlcyBjYW52YXNcbiAgICAgKi9cbiAgICBwdWJsaWMgZWxlbWVudD86IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIC8qKlxuICAgICAqIFRoZSBwYXJ0aWNsZXMgY2FudmFzIGRpbWVuc2lvblxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBkaW1lbnNpb246IElEaW1lbnNpb247XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGFyZW50IGNvbnRhaW5lclxuICAgICAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29udGFpbmVyOiBDb250YWluZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGFydGljbGVzIGNhbnZhcyBjb250ZXh0XG4gICAgICovXG4gICAgcHJpdmF0ZSBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsO1xuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZWRDYW52YXM6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvciBvZiBjYW52YXMgbWFuYWdlclxuICAgICAqIEBwYXJhbSBjb250YWluZXIgdGhlIHBhcmVudCBjb250YWluZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IENvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5kaW1lbnNpb24gPSB7XG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLmdlbmVyYXRlZENhbnZhcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLS0gdHNQYXJ0aWNsZXMgZnVuY3Rpb25zIC0gY2FudmFzIC0tLS0tLS0tLS0tLSAqL1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqL1xuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNpemUoKTtcbiAgICAgICAgdGhpcy5wYWludCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkQ2FudmFzKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGdlbmVyYXRlZENhbnZhcz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFjYW52YXMuY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBjYW52YXMuY2xhc3NOYW1lID0gQ29uc3RhbnRzLmNhbnZhc0NsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdGVkQ2FudmFzKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQ/LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZWRDYW52YXMgPSBnZW5lcmF0ZWRDYW52YXMgPz8gZmFsc2U7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5kaW1lbnNpb24uaGVpZ2h0ID0gY2FudmFzLm9mZnNldEhlaWdodDtcbiAgICAgICAgdGhpcy5kaW1lbnNpb24ud2lkdGggPSBjYW52YXMub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJldGluYS5pbml0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmdlbmVyYXRlZENhbnZhcykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Py5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgICAgICAgIENhbnZhc1V0aWxzLmNsZWFyKHRoaXMuY29udGV4dCwgdGhpcy5kaW1lbnNpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgc2l6ZSBvZiB0aGUgY2FudmFzXG4gICAgICovXG4gICAgcHVibGljIHNpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHRoaXMuZGltZW5zaW9uLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IHRoaXMuZGltZW5zaW9uLmhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhaW50cyB0aGUgY2FudmFzIGJhY2tncm91bmRcbiAgICAgKi9cbiAgICBwdWJsaWMgcGFpbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGFpbmVyLm9wdGlvbnM7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYmFja2dyb3VuZE1hc2suZW5hYmxlICYmIG9wdGlvbnMuYmFja2dyb3VuZE1hc2suY292ZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IFV0aWxzLmdldFBhcnRpY2xlQ29sb3Iob3B0aW9ucy5iYWNrZ3JvdW5kTWFzay5jb3Zlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWludEJhc2UoVXRpbHMuZ2V0U3R5bGVGcm9tQ29sb3IoY29sb3IpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhaW50QmFzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWludEJhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgY2FudmFzIGNvbnRlbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGFpbmVyLm9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHRyYWlsID0gb3B0aW9ucy5wYXJ0aWNsZXMubW92ZS50cmFpbDtcbiAgICAgICAgY29uc3QgZmlsbENvbG9yID0gVXRpbHMuaGV4VG9SZ2IodHJhaWwuZmlsbENvbG9yKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5iYWNrZ3JvdW5kTWFzay5lbmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucGFpbnQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0cmFpbC5lbmFibGUgJiYgdHJhaWwubGVuZ3RoID4gMCAmJiBmaWxsQ29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMucGFpbnRCYXNlKGByZ2JhKCR7ZmlsbENvbG9yLnJ9LCAke2ZpbGxDb2xvci5nfSwgJHtmaWxsQ29sb3IuYn0sJHsxIC8gdHJhaWwubGVuZ3RofWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgICAgIENhbnZhc1V0aWxzLmNsZWFyKHRoaXMuY29udGV4dCwgdGhpcy5kaW1lbnNpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzUG9pbnRJblBhdGgocGF0aDogUGF0aDJELCBwb2ludDogSUNvb3JkaW5hdGVzKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQ/LmlzUG9pbnRJblBhdGgocGF0aCwgcG9pbnQueCwgcG9pbnQueSkgPz8gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdQb2x5Z29uTWFzayhyYXdEYXRhOiBJQ29vcmRpbmF0ZXNbXSk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBwb2x5Z29uRHJhdyA9IG9wdGlvbnMucG9seWdvbi5kcmF3O1xuXG4gICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICBDYW52YXNVdGlscy5kcmF3UG9seWdvbk1hc2soY29udGV4dCwgcmF3RGF0YSwgcG9seWdvbkRyYXcuc3Ryb2tlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3TGlua2VkTGluZShwMTogUGFydGljbGUsIHAyOiBQYXJ0aWNsZSwgcG9zMTogSUNvb3JkaW5hdGVzLCBwb3MyOiBJQ29vcmRpbmF0ZXMsIG9wYWNpdHk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY29udGV4dDtcblxuICAgICAgICBpZiAoIWN0eCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvbG9yTGluZTogSVJnYiB8IHVuZGVmaW5lZDtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBwYXJ0aWNsZXMgY29ubmVjdGluZyBsaW5lIGNvbG9yOlxuICAgICAgICAgKlxuICAgICAgICAgKiAgcmFuZG9tOiBpbiBibGluayBtb2RlIDogaW4gZXZlcnkgZnJhbWUgcmVmcmVzaCB0aGUgY29sb3Igd291bGQgY2hhbmdlXG4gICAgICAgICAqICAgICAgICAgIGhlbmNlIHJlc3VsdGluZyBibGlua2luZyBvZiBsaW5lc1xuICAgICAgICAgKiAgbWlkOiBpbiBjb25zZW50IG1vZGU6IHNhbXBsZSBwYXJ0aWNsZXMgY29sb3IgYW5kIGdldCBhIG1pZCBsZXZlbCBjb2xvclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gdGhvc2UgdHdvIGZvciB0aGUgY29ubmVjdGluZyBsaW5lIGNvbG9yXG4gICAgICAgICAqL1xuXG4gICAgICAgIGlmIChjb250YWluZXIucGFydGljbGVzLmxpbmVMaW5rZWRDb2xvciA9PT0gXCJyYW5kb21cIikge1xuICAgICAgICAgICAgY29sb3JMaW5lID0gVXRpbHMuZ2V0UmFuZG9tQ29sb3JSR0JBKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLnBhcnRpY2xlcy5saW5lTGlua2VkQ29sb3IgPT0gXCJtaWRcIiAmJiBwMS5jb2xvciAmJiBwMi5jb2xvcikge1xuICAgICAgICAgICAgY29uc3Qgc291cmNlQ29sb3IgPSBwMS5jb2xvcjtcbiAgICAgICAgICAgIGNvbnN0IGRlc3RDb2xvciA9IHAyLmNvbG9yO1xuXG4gICAgICAgICAgICBjb2xvckxpbmUgPSB7XG4gICAgICAgICAgICAgICAgYjogTWF0aC5mbG9vcihVdGlscy5taXhDb21wb25lbnRzKHNvdXJjZUNvbG9yLmIsIGRlc3RDb2xvci5iLCBwMS5yYWRpdXMsIHAyLnJhZGl1cykpLFxuICAgICAgICAgICAgICAgIGc6IE1hdGguZmxvb3IoVXRpbHMubWl4Q29tcG9uZW50cyhzb3VyY2VDb2xvci5nLCBkZXN0Q29sb3IuZywgcDEucmFkaXVzLCBwMi5yYWRpdXMpKSxcbiAgICAgICAgICAgICAgICByOiBNYXRoLmZsb29yKFV0aWxzLm1peENvbXBvbmVudHMoc291cmNlQ29sb3IuciwgZGVzdENvbG9yLnIsIHAxLnJhZGl1cywgcDIucmFkaXVzKSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sb3JMaW5lID0gY29udGFpbmVyLnBhcnRpY2xlcy5saW5lTGlua2VkQ29sb3IgYXMgSVJnYjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gY29udGFpbmVyLnJldGluYS5saW5lTGlua2VkV2lkdGg7XG5cbiAgICAgICAgQ2FudmFzVXRpbHMuZHJhd0xpbmVMaW5rZWQoY3R4LFxuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBwb3MxLFxuICAgICAgICAgICAgcG9zMixcbiAgICAgICAgICAgIG9wdGlvbnMuYmFja2dyb3VuZE1hc2suZW5hYmxlLFxuICAgICAgICAgICAgY29sb3JMaW5lLFxuICAgICAgICAgICAgb3BhY2l0eSxcbiAgICAgICAgICAgIG9wdGlvbnMucGFydGljbGVzLmxpbmVMaW5rZWQuc2hhZG93KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhd0Nvbm5lY3RMaW5lKHAxOiBQYXJ0aWNsZSwgcDI6IFBhcnRpY2xlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxpbmVTdHlsZSA9IHRoaXMubGluZVN0eWxlKHAxLCBwMik7XG5cbiAgICAgICAgaWYgKCFsaW5lU3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY29udGV4dDtcblxuICAgICAgICBpZiAoIWN0eCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgQ2FudmFzVXRpbHMuZHJhd0Nvbm5lY3RMaW5lKGN0eCwgdGhpcy5jb250YWluZXIucmV0aW5hLmxpbmVMaW5rZWRXaWR0aCwgbGluZVN0eWxlLCBwMS5wb3NpdGlvbiwgcDIucG9zaXRpb24pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3R3JhYkxpbmUocGFydGljbGU6IFBhcnRpY2xlLCBvcGFjaXR5OiBudW1iZXIsIG1vdXNlUG9zOiBJQ29vcmRpbmF0ZXMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIub3B0aW9ucztcbiAgICAgICAgY29uc3Qgb3B0Q29sb3IgPSBvcHRpb25zLnBhcnRpY2xlcy5saW5lTGlua2VkLmNvbG9yO1xuXG4gICAgICAgIGxldCBsaW5lQ29sb3IgPSBjb250YWluZXIucGFydGljbGVzLmxpbmVMaW5rZWRDb2xvciB8fCBVdGlscy5oZXhUb1JnYihvcHRDb2xvcik7XG5cbiAgICAgICAgaWYgKGxpbmVDb2xvciA9PSBcInJhbmRvbVwiKSB7XG4gICAgICAgICAgICBsaW5lQ29sb3IgPSBVdGlscy5nZXRSYW5kb21Db2xvclJHQkEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWNsZXMubGluZUxpbmtlZENvbG9yID0gbGluZUNvbG9yO1xuXG4gICAgICAgIGxldCBjb2xvckxpbmU6IElSZ2IgPSB7cjogMTI3LCBnOiAxMjcsIGI6IDEyN307XG4gICAgICAgIGNvbnN0IGN0eCA9IGNvbnRhaW5lci5jYW52YXMuY29udGV4dDtcblxuICAgICAgICBpZiAoIWN0eCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRhaW5lci5wYXJ0aWNsZXMubGluZUxpbmtlZENvbG9yID09IFwicmFuZG9tXCIpIHtcbiAgICAgICAgICAgIGNvbG9yTGluZSA9IFV0aWxzLmdldFJhbmRvbUNvbG9yUkdCQSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sb3JMaW5lID0gY29udGFpbmVyLnBhcnRpY2xlcy5saW5lTGlua2VkQ29sb3IgYXMgSVJnYiB8fCBjb2xvckxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiZWdpblBvcyA9IHtcbiAgICAgICAgICAgIHg6IHBhcnRpY2xlLnBvc2l0aW9uLnggKyBwYXJ0aWNsZS5vZmZzZXQueCxcbiAgICAgICAgICAgIHk6IHBhcnRpY2xlLnBvc2l0aW9uLnkgKyBwYXJ0aWNsZS5vZmZzZXQueSxcbiAgICAgICAgfTtcblxuICAgICAgICBDYW52YXNVdGlscy5kcmF3R3JhYkxpbmUoY3R4LCBjb250YWluZXIucmV0aW5hLmxpbmVMaW5rZWRXaWR0aCwgYmVnaW5Qb3MsIG1vdXNlUG9zLCBjb2xvckxpbmUsIG9wYWNpdHkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3UGFydGljbGUocGFydGljbGU6IFBhcnRpY2xlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGFpbmVyLm9wdGlvbnM7XG5cbiAgICAgICAgbGV0IHJhZGl1czogbnVtYmVyO1xuICAgICAgICBsZXQgb3BhY2l0eTogbnVtYmVyO1xuICAgICAgICBsZXQgY29sb3JWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChwYXJ0aWNsZS5idWJibGVyLnJhZGl1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByYWRpdXMgPSBwYXJ0aWNsZS5idWJibGVyLnJhZGl1cztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0aWNsZS5idWJibGVyLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3BhY2l0eSA9IHBhcnRpY2xlLmJ1YmJsZXIub3BhY2l0eTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wYWNpdHkgPSBwYXJ0aWNsZS5vcGFjaXR5LnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnRpY2xlLmNvbG9yKSB7XG4gICAgICAgICAgICBjb2xvclZhbHVlID0gYHJnYmEoJHtwYXJ0aWNsZS5jb2xvci5yfSwgJHtwYXJ0aWNsZS5jb2xvci5nfSwgJHtwYXJ0aWNsZS5jb2xvci5ifSwgJHtvcGFjaXR5fSlgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbnRleHQgfHwgIWNvbG9yVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIENhbnZhc1V0aWxzLmRyYXdQYXJ0aWNsZSh0aGlzLmNvbnRleHQsXG4gICAgICAgICAgICBwYXJ0aWNsZSxcbiAgICAgICAgICAgIGNvbG9yVmFsdWUsXG4gICAgICAgICAgICBvcHRpb25zLmJhY2tncm91bmRNYXNrLmVuYWJsZSxcbiAgICAgICAgICAgIHJhZGl1cywgb3B0aW9ucy5wYXJ0aWNsZXMuc2hhcGUuc3Ryb2tlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhaW50QmFzZShiYXNlQ29sb3I/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgQ2FudmFzVXRpbHMucGFpbnRCYXNlKHRoaXMuY29udGV4dCwgdGhpcy5kaW1lbnNpb24sIGJhc2VDb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxpbmVTdHlsZShwMTogUGFydGljbGUsIHAyOiBQYXJ0aWNsZSk6IENhbnZhc0dyYWRpZW50IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHAxLmNvbG9yICYmIHAyLmNvbG9yKSB7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VSZ2IgPSBwMS5jb2xvcjtcbiAgICAgICAgICAgIGNvbnN0IGRlc3RSZ2IgPSBwMi5jb2xvcjtcblxuICAgICAgICAgICAgY29uc3QgcmdiID0ge1xuICAgICAgICAgICAgICAgIGI6IFV0aWxzLm1peENvbXBvbmVudHMoc291cmNlUmdiLmIsIGRlc3RSZ2IuYiwgcDEucmFkaXVzLCBwMi5yYWRpdXMpLFxuICAgICAgICAgICAgICAgIGc6IFV0aWxzLm1peENvbXBvbmVudHMoc291cmNlUmdiLmcsIGRlc3RSZ2IuZywgcDEucmFkaXVzLCBwMi5yYWRpdXMpLFxuICAgICAgICAgICAgICAgIHI6IFV0aWxzLm1peENvbXBvbmVudHMoc291cmNlUmdiLnIsIGRlc3RSZ2IuciwgcDEucmFkaXVzLCBwMi5yYWRpdXMpLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgbWlkQ29sb3IgPSBVdGlscy5nZXRTdHlsZUZyb21Db2xvcihyZ2IpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENhbnZhc1V0aWxzLmdyYWRpZW50KHRoaXMuY29udGV4dCwgcDEsIHAyLCBtaWRDb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=