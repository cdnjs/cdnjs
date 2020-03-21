"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Canvas = require("./Canvas");

var _EventListeners = require("./Utils/EventListeners");

var _Particles = require("./Particles");

var _Retina = require("./Retina");

var _ShapeType = require("../Enums/ShapeType");

var _PolygonMask = require("./PolygonMask");

var _Drawer = require("./Drawer");

var _Options = require("./Options/Options");

var _Utils = require("./Utils/Utils");

/* ---------- global functions - vendors ------------ */
window.customRequestAnimationFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  };
}();

window.customCancelRequestAnimationFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
}();
/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 */


var Container = /*#__PURE__*/function () {
  function Container(id, params) {
    (0, _classCallCheck2["default"])(this, Container);
    this.sourceOptions = void 0;
    this.id = void 0;
    this.interactivity = void 0;
    this.options = void 0;
    this.retina = void 0;
    this.canvas = void 0;
    this.particles = void 0;
    this.polygon = void 0;
    this.bubble = void 0;
    this.repulse = void 0;
    this.images = void 0;
    this.lastFrameTime = void 0;
    this.pageHidden = void 0;
    this.drawer = void 0;
    this.started = void 0;
    this.paused = void 0;
    this.drawAnimationFrame = void 0;
    this.eventListeners = void 0;
    this.started = false;
    this.id = id;
    this.paused = true;
    this.sourceOptions = params;
    this.lastFrameTime = 0;
    this.pageHidden = false;
    this.retina = new _Retina.Retina(this);
    this.canvas = new _Canvas.Canvas(this);
    this.particles = new _Particles.Particles(this);
    this.polygon = new _PolygonMask.PolygonMask(this);
    this.drawer = new _Drawer.Drawer(this);
    this.interactivity = {
      mouse: {}
    };
    this.images = [];
    this.bubble = {};
    this.repulse = {};
    /* tsParticles variables with default values */

    this.options = new _Options.Options();
    /* params settings */

    if (this.sourceOptions) {
      this.options.load(this.sourceOptions);
    }
    /* ---------- tsParticles - start ------------ */


    this.eventListeners = new _EventListeners.EventListeners(this);
  }

  (0, _createClass2["default"])(Container, [{
    key: "play",
    value: function play() {
      var _this = this;

      if (this.paused) {
        this.lastFrameTime = performance.now();
        this.paused = false;
      }

      this.drawAnimationFrame = Container.requestFrame(function (t) {
        return _this.update(t);
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.drawAnimationFrame !== undefined) {
        Container.cancelAnimation(this.drawAnimationFrame);
        delete this.drawAnimationFrame;
        this.paused = true;
      }
    }
    /* ---------- tsParticles functions - vendors ------------ */

  }, {
    key: "densityAutoParticles",
    value: function densityAutoParticles() {
      if (!(this.canvas.element && this.options.particles.number.density.enable)) {
        return;
      }

      var area = this.canvas.element.width * this.canvas.element.height / 1000;

      if (this.retina.isRetina) {
        area /= this.retina.pxRatio * 2;
      } //const area = this.retina.particlesDensityArea;


      var optParticlesNumber = this.options.particles.number.value;
      var density = this.options.particles.number.density.area;
      var particlesNumber = area * optParticlesNumber / density;
      var missingParticles = this.particles.array.length - particlesNumber;

      if (missingParticles < 0) {
        this.particles.push(Math.abs(missingParticles));
      } else {
        this.particles.remove(missingParticles);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
      this.retina.reset();
      this.canvas.destroy();
      delete this.interactivity;
      delete this.options;
      delete this.retina;
      delete this.canvas;
      delete this.particles;
      delete this.polygon;
      delete this.bubble;
      delete this.repulse;
      delete this.images;
      delete this.drawer;
      delete this.eventListeners;
    }
  }, {
    key: "exportImg",
    value: function exportImg() {
      if (this.canvas.element) {
        window.open(this.canvas.element.toDataURL("image/png"), "_blank");
      }
    }
  }, {
    key: "loadImg",
    value: function () {
      var _loadImg = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(image, optionsImage) {
        var _this2 = this;

        var img;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                image.error = false;

                if (optionsImage.src) {
                  img = new Image();
                  img.addEventListener("load", function () {
                    image.obj = img;

                    _this2.checkBeforeDraw();
                  });
                  img.src = optionsImage.src;
                } else {
                  console.error("Error tsParticles - No image.src");
                  image.error = true;
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function loadImg(_x, _x2) {
        return _loadImg.apply(this, arguments);
      }

      return loadImg;
    }()
  }, {
    key: "refresh",
    value: function () {
      var _refresh = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                /* init all */
                //if (this.checkAnimationFrame) {
                //    Container.cancelAnimation(this.checkAnimationFrame);
                //}

                /* restart */
                this.stop();
                _context2.next = 3;
                return this.start();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function refresh() {
        return _refresh.apply(this, arguments);
      }

      return refresh;
    }()
  }, {
    key: "stop",
    value: function stop() {
      if (!this.started) {
        return;
      }

      this.started = false;
      this.eventListeners.removeEventsListeners();
      this.pause();
      this.images = [];
      this.particles.clear();
      this.retina.reset();
      this.canvas.clear();
      delete this.particles.lineLinkedColor;
      delete this.polygon.raw;
      delete this.polygon.path;
      delete this.polygon.svg;
    }
  }, {
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, character, _character, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, optionsImage, src, image, _optionsImage, _src, _image;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.started) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                this.started = true;
                this.eventListeners.addEventsListeners();
                /* If is set the url of svg element, load it and parse into raw polygon data,
                 * works only with single path SVG
                 */

                if (!(this.options.polygon.enable && this.options.polygon.url)) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 7;
                return this.polygon.parseSvgPathToPolygon(this.options.polygon.url);

              case 7:
                this.polygon.raw = _context3.sent;

              case 8:
                if (!(_Utils.Utils.isInArray(_ShapeType.ShapeType["char"], this.options.particles.shape.type) || _Utils.Utils.isInArray(_ShapeType.ShapeType.character, this.options.particles.shape.type))) {
                  _context3.next = 41;
                  break;
                }

                if (!(this.options.particles.shape.character instanceof Array)) {
                  _context3.next = 38;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 13;
                _iterator = this.options.particles.shape.character[Symbol.iterator]();

              case 15:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 22;
                  break;
                }

                character = _step.value;
                _context3.next = 19;
                return _Utils.Utils.loadFont(character);

              case 19:
                _iteratorNormalCompletion = true;
                _context3.next = 15;
                break;

              case 22:
                _context3.next = 28;
                break;

              case 24:
                _context3.prev = 24;
                _context3.t0 = _context3["catch"](13);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 28:
                _context3.prev = 28;
                _context3.prev = 29;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 31:
                _context3.prev = 31;

                if (!_didIteratorError) {
                  _context3.next = 34;
                  break;
                }

                throw _iteratorError;

              case 34:
                return _context3.finish(31);

              case 35:
                return _context3.finish(28);

              case 36:
                _context3.next = 41;
                break;

              case 38:
                _character = this.options.particles.shape.character;
                _context3.next = 41;
                return _Utils.Utils.loadFont(_character);

              case 41:
                if (!(this.options.particles.shape.type === _ShapeType.ShapeType.image)) {
                  _context3.next = 84;
                  break;
                }

                if (!(this.options.particles.shape.image instanceof Array)) {
                  _context3.next = 75;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context3.prev = 46;
                _iterator2 = this.options.particles.shape.image[Symbol.iterator]();

              case 48:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context3.next = 59;
                  break;
                }

                optionsImage = _step2.value;
                src = optionsImage.src;
                image = {
                  error: false
                };
                image.type = src.substr(src.length - 3);
                _context3.next = 55;
                return this.loadImg(image, optionsImage);

              case 55:
                this.images.push(image);

              case 56:
                _iteratorNormalCompletion2 = true;
                _context3.next = 48;
                break;

              case 59:
                _context3.next = 65;
                break;

              case 61:
                _context3.prev = 61;
                _context3.t1 = _context3["catch"](46);
                _didIteratorError2 = true;
                _iteratorError2 = _context3.t1;

              case 65:
                _context3.prev = 65;
                _context3.prev = 66;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 68:
                _context3.prev = 68;

                if (!_didIteratorError2) {
                  _context3.next = 71;
                  break;
                }

                throw _iteratorError2;

              case 71:
                return _context3.finish(68);

              case 72:
                return _context3.finish(65);

              case 73:
                _context3.next = 82;
                break;

              case 75:
                _optionsImage = this.options.particles.shape.image;
                _src = _optionsImage.src;
                _image = {
                  error: false
                };
                _image.type = _src.substr(_src.length - 3);
                _context3.next = 81;
                return this.loadImg(_image, _optionsImage);

              case 81:
                this.images.push(_image);

              case 82:
                _context3.next = 85;
                break;

              case 84:
                this.checkBeforeDraw();

              case 85:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[13, 24, 28, 36], [29,, 31, 35], [46, 61, 65, 73], [66,, 68, 72]]);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "update",
    value: function update(timestamp) {
      this.drawer.draw(timestamp);
    }
  }, {
    key: "init",
    value: function init() {
      /* init canvas + particles */
      this.retina.init();
      this.canvas.init();
      this.particles.init();
      this.densityAutoParticles();
    }
  }, {
    key: "checkBeforeDraw",
    value: function checkBeforeDraw() {
      if (this.options.particles.shape.type === _ShapeType.ShapeType.image) {
        //if (this.checkAnimationFrame) {
        //    Container.cancelAnimation(this.checkAnimationFrame);
        //}
        if (this.images.every(function (img) {
          return img.error;
        })) {
          return;
        }
      }

      this.init();
      this.play();
    }
  }], [{
    key: "requestFrame",
    value: function requestFrame(callback) {
      return window.customRequestAnimationFrame(callback);
    }
  }, {
    key: "cancelAnimation",
    value: function cancelAnimation(handle) {
      window.cancelAnimationFrame(handle);
    }
  }]);
  return Container;
}();

exports.Container = Container;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DbGFzc2VzL0NvbnRhaW5lci50cyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJjdXN0b21SZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNldFRpbWVvdXQiLCJjdXN0b21DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm9DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNsZWFyVGltZW91dCIsIkNvbnRhaW5lciIsImlkIiwicGFyYW1zIiwic291cmNlT3B0aW9ucyIsImludGVyYWN0aXZpdHkiLCJvcHRpb25zIiwicmV0aW5hIiwiY2FudmFzIiwicGFydGljbGVzIiwicG9seWdvbiIsImJ1YmJsZSIsInJlcHVsc2UiLCJpbWFnZXMiLCJsYXN0RnJhbWVUaW1lIiwicGFnZUhpZGRlbiIsImRyYXdlciIsInN0YXJ0ZWQiLCJwYXVzZWQiLCJkcmF3QW5pbWF0aW9uRnJhbWUiLCJldmVudExpc3RlbmVycyIsIlJldGluYSIsIkNhbnZhcyIsIlBhcnRpY2xlcyIsIlBvbHlnb25NYXNrIiwiRHJhd2VyIiwibW91c2UiLCJPcHRpb25zIiwibG9hZCIsIkV2ZW50TGlzdGVuZXJzIiwicGVyZm9ybWFuY2UiLCJub3ciLCJyZXF1ZXN0RnJhbWUiLCJ0IiwidXBkYXRlIiwidW5kZWZpbmVkIiwiY2FuY2VsQW5pbWF0aW9uIiwiZWxlbWVudCIsIm51bWJlciIsImRlbnNpdHkiLCJlbmFibGUiLCJhcmVhIiwid2lkdGgiLCJoZWlnaHQiLCJpc1JldGluYSIsInB4UmF0aW8iLCJvcHRQYXJ0aWNsZXNOdW1iZXIiLCJ2YWx1ZSIsInBhcnRpY2xlc051bWJlciIsIm1pc3NpbmdQYXJ0aWNsZXMiLCJhcnJheSIsImxlbmd0aCIsInB1c2giLCJNYXRoIiwiYWJzIiwicmVtb3ZlIiwic3RvcCIsInJlc2V0IiwiZGVzdHJveSIsIm9wZW4iLCJ0b0RhdGFVUkwiLCJpbWFnZSIsIm9wdGlvbnNJbWFnZSIsImVycm9yIiwic3JjIiwiaW1nIiwiSW1hZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwib2JqIiwiY2hlY2tCZWZvcmVEcmF3IiwiY29uc29sZSIsInN0YXJ0IiwicmVtb3ZlRXZlbnRzTGlzdGVuZXJzIiwicGF1c2UiLCJjbGVhciIsImxpbmVMaW5rZWRDb2xvciIsInJhdyIsInBhdGgiLCJzdmciLCJhZGRFdmVudHNMaXN0ZW5lcnMiLCJ1cmwiLCJwYXJzZVN2Z1BhdGhUb1BvbHlnb24iLCJVdGlscyIsImlzSW5BcnJheSIsIlNoYXBlVHlwZSIsInNoYXBlIiwidHlwZSIsImNoYXJhY3RlciIsIkFycmF5IiwibG9hZEZvbnQiLCJzdWJzdHIiLCJsb2FkSW1nIiwidGltZXN0YW1wIiwiZHJhdyIsImluaXQiLCJkZW5zaXR5QXV0b1BhcnRpY2xlcyIsImV2ZXJ5IiwicGxheSIsImhhbmRsZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBS0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBRUE7O0FBQ0E7O0FBZ0JBO0FBRUFBLE1BQU0sQ0FBQ0MsMkJBQVAsR0FBc0MsWUFBTTtBQUN4QyxTQUFPRCxNQUFNLENBQUNFLHFCQUFQLElBQ0hGLE1BQU0sQ0FBQ0csMkJBREosSUFFSEgsTUFBTSxDQUFDSSx3QkFGSixJQUdISixNQUFNLENBQUNLLHNCQUhKLElBSUhMLE1BQU0sQ0FBQ00sdUJBSkosSUFLRixVQUFDQyxRQUFEO0FBQUEsV0FBY1AsTUFB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O29DQUU2QjBHLE0sRUFBc0I7QUFDaERqSCxNQUFBQSxNQUFNLENBQUNVLG9CQUFQLENBQTRCdUcsTUFBNUI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge0NhbnZhc30gZnJvbSBcIi4vQ2FudmFzXCI7XG5pbXBvcnQge0V2ZW50TGlzdGVuZXJzfSBmcm9tIFwiLi9VdGlscy9FdmVudExpc3RlbmVyc1wiO1xuaW1wb3J0IHtJUmVwdWxzZX0gZnJvbSBcIi4uL0ludGVyZmFjZXMvSVJlcHVsc2VcIjtcbmltcG9ydCB7SUJ1YmJsZX0gZnJvbSBcIi4uL0ludGVyZmFjZXMvSUJ1YmJsZVwiO1xuaW1wb3J0IHtJSW1hZ2V9IGZyb20gXCIuLi9JbnRlcmZhY2VzL0lJbWFnZVwiO1xuaW1wb3J0IHtJQ29udGFpbmVySW50ZXJhY3Rpdml0eX0gZnJvbSBcIi4uL0ludGVyZmFjZXMvSUNvbnRhaW5lckludGVyYWN0aXZpdHlcIjtcbmltcG9ydCB7UGFydGljbGVzfSBmcm9tIFwiLi9QYXJ0aWNsZXNcIjtcbmltcG9ydCB7UmV0aW5hfSBmcm9tIFwiLi9SZXRpbmFcIjtcbmltcG9ydCB7U2hhcGVUeXBlfSBmcm9tIFwiLi4vRW51bXMvU2hhcGVUeXBlXCI7XG5pbXBvcnQge1BvbHlnb25NYXNrfSBmcm9tIFwiLi9Qb2x5Z29uTWFza1wiO1xuaW1wb3J0IHtJbWFnZVNoYXBlfSBmcm9tIFwiLi9PcHRpb25zL1BhcnRpY2xlcy9TaGFwZS9JbWFnZVNoYXBlXCI7XG5pbXBvcnQge0lPcHRpb25zfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9PcHRpb25zL0lPcHRpb25zXCI7XG5pbXBvcnQge0RyYXdlcn0gZnJvbSBcIi4vRHJhd2VyXCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL09wdGlvbnMvT3B0aW9uc1wiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vVXRpbHMvVXRpbHNcIjtcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBjdXN0b21SZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IChjYWxsYmFjazogRnJhbWVSZXF1ZXN0Q2FsbGJhY2spID0+IG51bWJlcjtcbiAgICAgICAgbW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lOiAoY2FsbGJhY2s6IEZyYW1lUmVxdWVzdENhbGxiYWNrKSA9PiBudW1iZXI7XG4gICAgICAgIG9SZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IChjYWxsYmFjazogRnJhbWVSZXF1ZXN0Q2FsbGJhY2spID0+IG51bWJlcjtcbiAgICAgICAgbXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IChjYWxsYmFjazogRnJhbWVSZXF1ZXN0Q2FsbGJhY2spID0+IG51bWJlcjtcbiAgICAgICAgY3VzdG9tQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lOiAoaGFuZGxlOiBudW1iZXIpID0+IHZvaWQ7XG4gICAgICAgIHdlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZTogKGhhbmRsZTogbnVtYmVyKSA9PiB2b2lkO1xuICAgICAgICBtb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IChoYW5kbGU6IG51bWJlcikgPT4gdm9pZDtcbiAgICAgICAgb0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZTogKGhhbmRsZTogbnVtYmVyKSA9PiB2b2lkO1xuICAgICAgICBtc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZTogKGhhbmRsZTogbnVtYmVyKSA9PiB2b2lkO1xuICAgIH1cbn1cblxuLyogLS0tLS0tLS0tLSBnbG9iYWwgZnVuY3Rpb25zIC0gdmVuZG9ycyAtLS0tLS0tLS0tLS0gKi9cblxud2luZG93LmN1c3RvbVJlcXVlc3RBbmltYXRpb25GcmFtZSA9ICgoKSA9PiB7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAoKGNhbGxiYWNrKSA9PiB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKSk7XG59KSgpO1xuXG53aW5kb3cuY3VzdG9tQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gKCgpID0+IHtcbiAgICByZXR1cm4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgY2xlYXJUaW1lb3V0XG59KSgpO1xuXG4vKipcbiAqIFRoZSBvYmplY3QgbG9hZGVkIGludG8gYW4gSFRNTCBlbGVtZW50LCBpdCdsbCBjb250YWluIG9wdGlvbnMgbG9hZGVkIGFuZCBhbGwgZGF0YSB0byBsZXQgZXZlcnl0aGluZyB3b3JraW5nXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250YWluZXIge1xuICAgIHB1YmxpYyByZWFkb25seSBzb3VyY2VPcHRpb25zPzogUmVjdXJzaXZlUGFydGlhbDxJT3B0aW9ucz47XG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG4gICAgcHVibGljIGludGVyYWN0aXZpdHk6IElDb250YWluZXJJbnRlcmFjdGl2aXR5O1xuICAgIHB1YmxpYyBvcHRpb25zOiBJT3B0aW9ucztcbiAgICBwdWJsaWMgcmV0aW5hOiBSZXRpbmE7XG4gICAgcHVibGljIGNhbnZhczogQ2FudmFzO1xuICAgIHB1YmxpYyBwYXJ0aWNsZXM6IFBhcnRpY2xlcztcbiAgICBwdWJsaWMgcG9seWdvbjogUG9seWdvbk1hc2s7XG4gICAgcHVibGljIGJ1YmJsZTogSUJ1YmJsZTtcbiAgICBwdWJsaWMgcmVwdWxzZTogSVJlcHVsc2U7XG4gICAgcHVibGljIGltYWdlczogSUltYWdlW107XG4gICAgcHVibGljIGxhc3RGcmFtZVRpbWU6IG51bWJlcjtcbiAgICBwdWJsaWMgcGFnZUhpZGRlbjogYm9vbGVhbjtcbiAgICBwdWJsaWMgZHJhd2VyOiBEcmF3ZXI7XG4gICAgcHVibGljIHN0YXJ0ZWQ6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIHBhdXNlZDogYm9vbGVhbjtcbiAgICBwcml2YXRlIGRyYXdBbmltYXRpb25GcmFtZT86IG51bWJlcjtcbiAgICBwcml2YXRlIGV2ZW50TGlzdGVuZXJzOiBFdmVudExpc3RlbmVycztcblxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHBhcmFtcz86IFJlY3Vyc2l2ZVBhcnRpYWw8SU9wdGlvbnM+KSB7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zb3VyY2VPcHRpb25zID0gcGFyYW1zO1xuICAgICAgICB0aGlzLmxhc3RGcmFtZVRpbWUgPSAwO1xuICAgICAgICB0aGlzLnBhZ2VIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXRpbmEgPSBuZXcgUmV0aW5hKHRoaXMpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IG5ldyBDYW52YXModGhpcyk7XG4gICAgICAgIHRoaXMucGFydGljbGVzID0gbmV3IFBhcnRpY2xlcyh0aGlzKTtcbiAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb25NYXNrKHRoaXMpO1xuICAgICAgICB0aGlzLmRyYXdlciA9IG5ldyBEcmF3ZXIodGhpcyk7XG4gICAgICAgIHRoaXMuaW50ZXJhY3Rpdml0eSA9IHtcbiAgICAgICAgICAgIG1vdXNlOiB7fSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5idWJibGUgPSB7fTtcbiAgICAgICAgdGhpcy5yZXB1bHNlID0ge307XG5cbiAgICAgICAgLyogdHNQYXJ0aWNsZXMgdmFyaWFibGVzIHdpdGggZGVmYXVsdCB2YWx1ZXMgKi9cbiAgICAgICAgdGhpcy5vcHRpb25zID0gbmV3IE9wdGlvbnMoKTtcblxuICAgICAgICAvKiBwYXJhbXMgc2V0dGluZ3MgKi9cbiAgICAgICAgaWYgKHRoaXMuc291cmNlT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxvYWQodGhpcy5zb3VyY2VPcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIC0tLS0tLS0tLS0gdHNQYXJ0aWNsZXMgLSBzdGFydCAtLS0tLS0tLS0tLS0gKi9cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycyA9IG5ldyBFdmVudExpc3RlbmVycyh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlcXVlc3RGcmFtZShjYWxsYmFjazogRnJhbWVSZXF1ZXN0Q2FsbGJhY2spOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gd2luZG93LmN1c3RvbVJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjYW5jZWxBbmltYXRpb24oaGFuZGxlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXkoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0RnJhbWVUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3QW5pbWF0aW9uRnJhbWUgPSBDb250YWluZXIucmVxdWVzdEZyYW1lKCh0KSA9PiB0aGlzLnVwZGF0ZSh0KSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBhdXNlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kcmF3QW5pbWF0aW9uRnJhbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgQ29udGFpbmVyLmNhbmNlbEFuaW1hdGlvbih0aGlzLmRyYXdBbmltYXRpb25GcmFtZSk7XG5cbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRyYXdBbmltYXRpb25GcmFtZTtcbiAgICAgICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLS0gdHNQYXJ0aWNsZXMgZnVuY3Rpb25zIC0gdmVuZG9ycyAtLS0tLS0tLS0tLS0gKi9cblxuICAgIHB1YmxpYyBkZW5zaXR5QXV0b1BhcnRpY2xlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy5jYW52YXMuZWxlbWVudCAmJiB0aGlzLm9wdGlvbnMucGFydGljbGVzLm51bWJlci5kZW5zaXR5LmVuYWJsZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhcmVhID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAqIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0IC8gMTAwMDtcbiAgICAgICAgaWYgKHRoaXMucmV0aW5hLmlzUmV0aW5hKSB7XG4gICAgICAgICAgICBhcmVhIC89IHRoaXMucmV0aW5hLnB4UmF0aW8gKiAyO1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc3QgYXJlYSA9IHRoaXMucmV0aW5hLnBhcnRpY2xlc0RlbnNpdHlBcmVhO1xuICAgICAgICBjb25zdCBvcHRQYXJ0aWNsZXNOdW1iZXIgPSB0aGlzLm9wdGlvbnMucGFydGljbGVzLm51bWJlci52YWx1ZTtcbiAgICAgICAgY29uc3QgZGVuc2l0eSA9IHRoaXMub3B0aW9ucy5wYXJ0aWNsZXMubnVtYmVyLmRlbnNpdHkuYXJlYTtcbiAgICAgICAgY29uc3QgcGFydGljbGVzTnVtYmVyID0gYXJlYSAqIG9wdFBhcnRpY2xlc051bWJlciAvIGRlbnNpdHk7XG4gICAgICAgIGNvbnN0IG1pc3NpbmdQYXJ0aWNsZXMgPSB0aGlzLnBhcnRpY2xlcy5hcnJheS5sZW5ndGggLSBwYXJ0aWNsZXNOdW1iZXI7XG5cbiAgICAgICAgaWYgKG1pc3NpbmdQYXJ0aWNsZXMgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKE1hdGguYWJzKG1pc3NpbmdQYXJ0aWNsZXMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzLnJlbW92ZShtaXNzaW5nUGFydGljbGVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3AoKTtcblxuICAgICAgICB0aGlzLnJldGluYS5yZXNldCgpO1xuICAgICAgICB0aGlzLmNhbnZhcy5kZXN0cm95KCk7XG5cbiAgICAgICAgZGVsZXRlIHRoaXMuaW50ZXJhY3Rpdml0eTtcbiAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucztcbiAgICAgICAgZGVsZXRlIHRoaXMucmV0aW5hO1xuICAgICAgICBkZWxldGUgdGhpcy5jYW52YXM7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBhcnRpY2xlcztcbiAgICAgICAgZGVsZXRlIHRoaXMucG9seWdvbjtcbiAgICAgICAgZGVsZXRlIHRoaXMuYnViYmxlO1xuICAgICAgICBkZWxldGUgdGhpcy5yZXB1bHNlO1xuICAgICAgICBkZWxldGUgdGhpcy5pbWFnZXM7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmRyYXdlcjtcbiAgICAgICAgZGVsZXRlIHRoaXMuZXZlbnRMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgcHVibGljIGV4cG9ydEltZygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHRoaXMuY2FudmFzLmVsZW1lbnQudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpLCBcIl9ibGFua1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBsb2FkSW1nKGltYWdlOiBJSW1hZ2UsIG9wdGlvbnNJbWFnZTogSW1hZ2VTaGFwZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpbWFnZS5lcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChvcHRpb25zSW1hZ2Uuc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpbWFnZS5vYmogPSBpbWc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQmVmb3JlRHJhdygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGltZy5zcmMgPSBvcHRpb25zSW1hZ2Uuc3JjO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHRzUGFydGljbGVzIC0gTm8gaW1hZ2Uuc3JjXCIpO1xuXG4gICAgICAgICAgICBpbWFnZS5lcnJvciA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVmcmVzaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLyogaW5pdCBhbGwgKi9cbiAgICAgICAgLy9pZiAodGhpcy5jaGVja0FuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIC8vICAgIENvbnRhaW5lci5jYW5jZWxBbmltYXRpb24odGhpcy5jaGVja0FuaW1hdGlvbkZyYW1lKTtcbiAgICAgICAgLy99XG5cbiAgICAgICAgLyogcmVzdGFydCAqL1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zdGFydCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycy5yZW1vdmVFdmVudHNMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW107XG4gICAgICAgIHRoaXMucGFydGljbGVzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMucmV0aW5hLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY2FudmFzLmNsZWFyKCk7XG5cbiAgICAgICAgZGVsZXRlIHRoaXMucGFydGljbGVzLmxpbmVMaW5rZWRDb2xvcjtcbiAgICAgICAgZGVsZXRlIHRoaXMucG9seWdvbi5yYXc7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBvbHlnb24ucGF0aDtcbiAgICAgICAgZGVsZXRlIHRoaXMucG9seWdvbi5zdmc7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMuYWRkRXZlbnRzTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgLyogSWYgaXMgc2V0IHRoZSB1cmwgb2Ygc3ZnIGVsZW1lbnQsIGxvYWQgaXQgYW5kIHBhcnNlIGludG8gcmF3IHBvbHlnb24gZGF0YSxcbiAgICAgICAgICogd29ya3Mgb25seSB3aXRoIHNpbmdsZSBwYXRoIFNWR1xuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wb2x5Z29uLmVuYWJsZSAmJiB0aGlzLm9wdGlvbnMucG9seWdvbi51cmwpIHtcbiAgICAgICAgICAgIHRoaXMucG9seWdvbi5yYXcgPSBhd2FpdCB0aGlzLnBvbHlnb24ucGFyc2VTdmdQYXRoVG9Qb2x5Z29uKHRoaXMub3B0aW9ucy5wb2x5Z29uLnVybCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVXRpbHMuaXNJbkFycmF5KFNoYXBlVHlwZS5jaGFyLCB0aGlzLm9wdGlvbnMucGFydGljbGVzLnNoYXBlLnR5cGUpIHx8XG4gICAgICAgICAgICBVdGlscy5pc0luQXJyYXkoU2hhcGVUeXBlLmNoYXJhY3RlciwgdGhpcy5vcHRpb25zLnBhcnRpY2xlcy5zaGFwZS50eXBlKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXJ0aWNsZXMuc2hhcGUuY2hhcmFjdGVyIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoYXJhY3RlciBvZiB0aGlzLm9wdGlvbnMucGFydGljbGVzLnNoYXBlLmNoYXJhY3Rlcikge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBVdGlscy5sb2FkRm9udChjaGFyYWN0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gdGhpcy5vcHRpb25zLnBhcnRpY2xlcy5zaGFwZS5jaGFyYWN0ZXI7XG4gICAgICAgICAgICAgICAgYXdhaXQgVXRpbHMubG9hZEZvbnQoY2hhcmFjdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFydGljbGVzLnNoYXBlLnR5cGUgPT09IFNoYXBlVHlwZS5pbWFnZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXJ0aWNsZXMuc2hhcGUuaW1hZ2UgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uc0ltYWdlIG9mIHRoaXMub3B0aW9ucy5wYXJ0aWNsZXMuc2hhcGUuaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gb3B0aW9uc0ltYWdlLnNyYztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2U6IElJbWFnZSA9IHtlcnJvcjogZmFsc2V9O1xuXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLnR5cGUgPSBzcmMuc3Vic3RyKHNyYy5sZW5ndGggLSAzKTtcblxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRJbWcoaW1hZ2UsIG9wdGlvbnNJbWFnZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChpbWFnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zSW1hZ2UgPSB0aGlzLm9wdGlvbnMucGFydGljbGVzLnNoYXBlLmltYWdlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IG9wdGlvbnNJbWFnZS5zcmM7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2U6IElJbWFnZSA9IHtlcnJvcjogZmFsc2V9O1xuXG4gICAgICAgICAgICAgICAgaW1hZ2UudHlwZSA9IHNyYy5zdWJzdHIoc3JjLmxlbmd0aCAtIDMpO1xuXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkSW1nKGltYWdlLCBvcHRpb25zSW1hZ2UpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChpbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrQmVmb3JlRHJhdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGUodGltZXN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXcodGltZXN0YW1wKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qIGluaXQgY2FudmFzICsgcGFydGljbGVzICovXG4gICAgICAgIHRoaXMucmV0aW5hLmluaXQoKTtcbiAgICAgICAgdGhpcy5jYW52YXMuaW5pdCgpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5pbml0KCk7XG4gICAgICAgIHRoaXMuZGVuc2l0eUF1dG9QYXJ0aWNsZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrQmVmb3JlRHJhdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXJ0aWNsZXMuc2hhcGUudHlwZSA9PT0gU2hhcGVUeXBlLmltYWdlKSB7XG4gICAgICAgICAgICAvL2lmICh0aGlzLmNoZWNrQW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgICAgIC8vICAgIENvbnRhaW5lci5jYW5jZWxBbmltYXRpb24odGhpcy5jaGVja0FuaW1hdGlvbkZyYW1lKTtcbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5pbWFnZXMuZXZlcnkoKGltZykgPT4gaW1nLmVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICB9XG59XG4iXX0=