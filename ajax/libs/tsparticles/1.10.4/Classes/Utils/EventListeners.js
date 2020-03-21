"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventListeners = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ClickMode = require("../../Enums/Modes/ClickMode");

var _InteractivityDetect = require("../../Enums/InteractivityDetect");

var _PolygonMaskType = require("../../Enums/PolygonMaskType");

/**
 * Particles container event listeners manager
 */
var EventListeners = /*#__PURE__*/function () {
  /**
   * Events listener constructor
   * @param container the calling container
   */
  function EventListeners(container) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, EventListeners);
    this.container = void 0;
    this.mouseMoveHandler = void 0;
    this.touchStartHandler = void 0;
    this.touchMoveHandler = void 0;
    this.touchEndHandler = void 0;
    this.mouseLeaveHandler = void 0;
    this.touchCancelHandler = void 0;
    this.touchEndClickHandler = void 0;
    this.mouseUpHandler = void 0;
    this.visibilityChangeHandler = void 0;
    this.resizeHandler = void 0;
    this.container = container;

    this.mouseMoveHandler = function (e) {
      return _this.mouseTouchMove(e);
    };

    this.touchStartHandler = function (e) {
      return _this.mouseTouchMove(e);
    };

    this.touchMoveHandler = function (e) {
      return _this.mouseTouchMove(e);
    };

    this.touchEndHandler = function () {
      return _this.mouseTouchFinish();
    };

    this.mouseLeaveHandler = function () {
      return _this.mouseTouchFinish();
    };

    this.touchCancelHandler = function () {
      return _this.mouseTouchFinish();
    };

    this.touchEndClickHandler = function (e) {
      return _this.mouseTouchClick(e);
    };

    this.mouseUpHandler = function (e) {
      return _this.mouseTouchClick(e);
    };

    this.visibilityChangeHandler = function () {
      return _this.handleVisibilityChange();
    };

    this.resizeHandler = function () {
      return _this.handleWindowResize();
    };
  }
  /**
   * Initializing event listeners
   */


  (0, _createClass2["default"])(EventListeners, [{
    key: "addEventsListeners",
    value: function addEventsListeners() {
      var _document;

      var container = this.container;
      var options = container.options;
      /* events target element */

      if (options.interactivity.detectsOn === _InteractivityDetect.InteractivityDetect.window) {
        container.interactivity.element = window;
      } else if (options.interactivity.detectsOn === _InteractivityDetect.InteractivityDetect.parent && container.canvas.element) {
        container.interactivity.element = container.canvas.element.parentNode;
      } else {
        container.interactivity.element = container.canvas.element;
      }

      var interactivityEl = container.interactivity.element;
      /* detect mouse pos - on hover / click event */

      if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
        if (interactivityEl) {
          /* el on mousemove */
          interactivityEl.addEventListener("mousemove", this.mouseMoveHandler);
          /* el on touchstart */

          interactivityEl.addEventListener("touchstart", this.touchStartHandler);
          /* el on touchmove */

          interactivityEl.addEventListener("touchmove", this.touchMoveHandler);

          if (!options.interactivity.events.onClick.enable) {
            /* el on touchend */
            interactivityEl.addEventListener("touchend", this.touchEndHandler);
          }
          /* el on onmouseleave */


          interactivityEl.addEventListener("mouseleave", this.mouseLeaveHandler);
          /* el on touchcancel */

          interactivityEl.addEventListener("touchcancel", this.touchCancelHandler);
        }
      }
      /* on click event */


      if (options.interactivity.events.onClick.enable) {
        if (interactivityEl) {
          interactivityEl.addEventListener("touchend", this.touchEndClickHandler);
          interactivityEl.addEventListener("mouseup", this.mouseUpHandler);
        }
      }

      if (options.interactivity.events.resize) {
        window.addEventListener("resize", this.resizeHandler);
      }

      (_document = document) === null || _document === void 0 ? void 0 : _document.addEventListener("visibilitychange", this.visibilityChangeHandler, false);
    }
  }, {
    key: "removeEventsListeners",
    value: function removeEventsListeners() {
      var _document2;

      var container = this.container;
      var options = container.options;
      /* events target element */

      if (options.interactivity.detectsOn === _InteractivityDetect.InteractivityDetect.window) {
        container.interactivity.element = window;
      } else if (options.interactivity.detectsOn === _InteractivityDetect.InteractivityDetect.parent && container.canvas.element) {
        container.interactivity.element = container.canvas.element.parentNode;
      } else {
        container.interactivity.element = container.canvas.element;
      }

      var interactivityEl = container.interactivity.element;
      /* detect mouse pos - on hover / click event */

      if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
        if (interactivityEl) {
          /* el on mousemove */
          interactivityEl.removeEventListener("mousemove", this.mouseMoveHandler);
          /* el on touchstart */

          interactivityEl.removeEventListener("touchstart", this.touchStartHandler);
          /* el on touchmove */

          interactivityEl.removeEventListener("touchmove", this.touchMoveHandler);

          if (!options.interactivity.events.onClick.enable) {
            /* el on touchend */
            interactivityEl.removeEventListener("touchend", this.touchEndHandler);
          }
          /* el on onmouseleave */


          interactivityEl.removeEventListener("mouseleave", this.mouseLeaveHandler);
          /* el on touchcancel */

          interactivityEl.removeEventListener("touchcancel", this.touchCancelHandler);
        }
      }
      /* on click event */


      if (options.interactivity.events.onClick.enable) {
        if (interactivityEl) {
          interactivityEl.removeEventListener("touchend", this.touchEndClickHandler);
          interactivityEl.removeEventListener("mouseup", this.mouseUpHandler);
        }
      }

      if (options.interactivity.events.resize) {
        window.removeEventListener("resize", this.resizeHandler);
      }

      (_document2 = document) === null || _document2 === void 0 ? void 0 : _document2.removeEventListener("visibilitychange", this.visibilityChangeHandler);
    }
  }, {
    key: "handleWindowResize",
    value: function handleWindowResize() {
      var container = this.container;
      var options = container.options;

      if (!container.canvas.element) {
        return;
      }

      container.canvas.dimension.width = container.canvas.element.offsetWidth;
      container.canvas.dimension.height = container.canvas.element.offsetHeight;
      /* resize canvas */

      if (container.retina.isRetina) {
        container.canvas.dimension.width *= container.retina.pxRatio;
        container.canvas.dimension.height *= container.retina.pxRatio;
      }

      container.canvas.element.width = container.canvas.dimension.width;
      container.canvas.element.height = container.canvas.dimension.height;
      /* repaint canvas on anim disabled */

      if (!options.particles.move.enable) {
        container.particles.clear();
        container.particles.init();
        container.particles.draw(0);
      }
      /* density particles enabled */


      container.densityAutoParticles();

      if (options.polygon.enable && options.polygon.type !== _PolygonMaskType.PolygonMaskType.none) {
        if (container.polygon.redrawTimeout) {
          clearTimeout(container.polygon.redrawTimeout);
        }

        container.polygon.redrawTimeout = setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return container.polygon.parseSvgPathToPolygon();

                case 2:
                  container.polygon.raw = _context.sent;
                  container.particles.clear();
                  container.particles.init();
                  container.particles.draw(0);

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        })), 250);
      }
    }
  }, {
    key: "handleVisibilityChange",
    value: function handleVisibilityChange() {
      var _document3;

      var container = this.container;
      var options = container.options;

      if (!options.pauseOnBlur) {
        return;
      }

      if ((_document3 = document) === null || _document3 === void 0 ? void 0 : _document3.hidden) {
        container.pageHidden = true;
        container.pause();
      } else {
        container.pageHidden = false;
        container.play();
      }
    }
    /**
     * Mouse/Touch move event
     * @param e the event arguments
     */

  }, {
    key: "mouseTouchMove",
    value: function mouseTouchMove(e) {
      var container = this.container;
      var options = container.options;
      var pos;

      if (e.type.startsWith("mouse")) {
        var mouseEvent = e;

        if (container.interactivity.element === window && container.canvas.element) {
          var clientRect = container.canvas.element.getBoundingClientRect();
          pos = {
            x: mouseEvent.clientX - clientRect.left,
            y: mouseEvent.clientY - clientRect.top
          };
        } else if (options.interactivity.detectsOn === _InteractivityDetect.InteractivityDetect.parent) {
          var source = mouseEvent.target;
          var target = mouseEvent.currentTarget;

          if (source && target) {
            var sourceRect = source.getBoundingClientRect();
            var targetRect = target.getBoundingClientRect();
            pos = {
              x: mouseEvent.offsetX + sourceRect.left - targetRect.left,
              y: mouseEvent.offsetY + sourceRect.top - targetRect.top
            };
          } else {
            pos = {
              x: mouseEvent.offsetX || mouseEvent.clientX,
              y: mouseEvent.offsetY || mouseEvent.clientY
            };
          }
        } else {
          pos = {
            x: mouseEvent.offsetX || mouseEvent.clientX,
            y: mouseEvent.offsetY || mouseEvent.clientY
          };
        }
      } else {
        var touchEvent = e;
        var lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
        pos = {
          x: lastTouch.clientX,
          y: lastTouch.clientY
        };
      }

      container.interactivity.mouse.position = pos;

      if (container.retina.isRetina) {
        container.interactivity.mouse.position.x *= container.retina.pxRatio;
        container.interactivity.mouse.position.y *= container.retina.pxRatio;
      }

      container.interactivity.status = "mousemove";
    }
    /**
     * Mouse/Touch event finish
     */

  }, {
    key: "mouseTouchFinish",
    value: function mouseTouchFinish() {
      var container = this.container;
      container.interactivity.mouse.position = null;
      container.interactivity.status = "mouseleave";
    }
    /**
     * Mouse/Touch click/tap event
     * @param e the click event arguments
     */

  }, {
    key: "mouseTouchClick",
    value: function mouseTouchClick(e) {
      var container = this.container;
      var options = container.options;

      if (options.polygon.enable && options.polygon.type !== _PolygonMaskType.PolygonMaskType.none && options.polygon.type !== _PolygonMaskType.PolygonMaskType.inline) {
        if (container.polygon.checkInsidePolygon(container.interactivity.mouse.position)) {
          this.doMouseTouchClick(e);
        }
      } else {
        this.doMouseTouchClick(e);
      }
    }
    /**
     * Mouse/Touch click/tap event implementation
     * @param e the click event arguments
     */

  }, {
    key: "doMouseTouchClick",
    value: function doMouseTouchClick(e) {
      var _this2 = this;

      var container = this.container;
      var options = container.options;

      if (container.interactivity.mouse.position) {
        container.interactivity.mouse.clickPosition = {
          x: container.interactivity.mouse.position.x,
          y: container.interactivity.mouse.position.y
        };
      }

      container.interactivity.mouse.clickTime = new Date().getTime();
      var pushNb = options.interactivity.modes.push.quantity;
      var removeNb = options.interactivity.modes.remove.quantity;

      switch (options.interactivity.events.onClick.mode) {
        case _ClickMode.ClickMode.push:
          if (options.particles.move.enable) {
            container.particles.push(pushNb, container.interactivity.mouse);
          } else {
            if (options.interactivity.modes.push.quantity === 1) {
              container.particles.push(pushNb, container.interactivity.mouse);
            } else if (options.interactivity.modes.push.quantity > 1) {
              container.particles.push(pushNb);
            }
          }

          break;

        case _ClickMode.ClickMode.remove:
          container.particles.remove(removeNb);
          break;

        case _ClickMode.ClickMode.bubble:
          container.bubble.clicking = true;
          break;

        case _ClickMode.ClickMode.repulse:
          container.repulse.clicking = true;
          container.repulse.count = 0;
          container.repulse.finish = false;
          setTimeout(function () {
            container.repulse.clicking = false;
          }, options.interactivity.modes.repulse.duration * 1000);
          break;
      }

      e.preventDefault();

      if (e.type === "touchend") {
        setTimeout(function () {
          return _this2.mouseTouchFinish();
        }, 500);
      }

      e.preventDefault();
    }
  }]);
  return EventListeners;
}();

exports.EventListeners = EventListeners;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL1V0aWxzL0V2ZW50TGlzdGVuZXJzLnRzIl0sIm5hbWVzIjpbIkV2ZW50TGlzdGVuZXJzIiwiY29udGFpbmVyIiwibW91c2VNb3ZlSGFuZGxlciIsInRvdWNoU3RhcnRIYW5kbGVyIiwidG91Y2hNb3ZlSGFuZGxlciIsInRvdWNoRW5kSGFuZGxlciIsIm1vdXNlTGVhdmVIYW5kbGVyIiwidG91Y2hDYW5jZWxIYW5kbGVyIiwidG91Y2hFbmRDbGlja0hhbmRsZXIiLCJtb3VzZVVwSGFuZGxlciIsInZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyIiwicmVzaXplSGFuZGxlciIsImUiLCJtb3VzZVRvdWNoTW92ZSIsIm1vdXNlVG91Y2hGaW5pc2giLCJtb3VzZVRvdWNoQ2xpY2siLCJoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlIiwiaGFuZGxlV2luZG93UmVzaXplIiwib3B0aW9ucyIsImludGVyYWN0aXZpdHkiLCJkZXRlY3RzT24iLCJJbnRlcmFjdGl2aXR5RGV0ZWN0Iiwid2luZG93IiwiZWxlbWVudCIsInBhcmVudCIsImNhbnZhcyIsInBhcmVudE5vZGUiLCJpbnRlcmFjdGl2aXR5RWwiLCJldmVudHMiLCJvbkhvdmVyIiwiZW5hYmxlIiwib25DbGljayIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaW1lbnNpb24iLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwicmV0aW5hIiwiaXNSZXRpbmEiLCJweFJhdGlvIiwicGFydGljbGVzIiwibW92ZSIsImNsZWFyIiwiaW5pdCIsImRyYXciLCJkZW5zaXR5QXV0b1BhcnRpY2xlcyIsInBvbHlnb24iLCJ0eXBlIiwiUG9seWdvbk1hc2tUeXBlIiwibm9uZSIsInJlZHJhd1RpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwicGFyc2VTdmdQYXRoVG9Qb2x5Z29uIiwicmF3IiwicGF1c2VPbkJsdXIiLCJoaWRkZW4iLCJwYWdlSGlkZGVuIiwicGF1c2UiLCJwbGF5IiwicG9zIiwic3RhcnRzV2l0aCIsIm1vdXNlRXZlbnQiLCJjbGllbnRSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwieCIsImNsaWVudFgiLCJsZWZ0IiwieSIsImNsaWVudFkiLCJ0b3AiLCJzb3VyY2UiLCJ0YXJnZXQiLCJjdXJyZW50VGFyZ2V0Iiwic291cmNlUmVjdCIsInRhcmdldFJlY3QiLCJvZmZzZXRYIiwib2Zmc2V0WSIsInRvdWNoRXZlbnQiLCJsYXN0VG91Y2giLCJ0b3VjaGVzIiwibGVuZ3RoIiwibW91c2UiLCJwb3NpdGlvbiIsInN0YXR1cyIsImlubGluZSIsImNoZWNrSW5zaWRlUG9seWdvbiIsImRvTW91c2VUb3VjaENsaWNrIiwiY2xpY2tQb3NpdGlvbiIsImNsaWNrVGltZSIsIkRhdGUiLCJnZXRUaW1lIiwicHVzaE5iIiwibW9kZXMiLCJwdXNoIiwicXVhbnRpdHkiLCJyZW1vdmVOYiIsInJlbW92ZSIsIm1vZGUiLCJDbGlja01vZGUiLCJidWJibGUiLCJjbGlja2luZyIsInJlcHVsc2UiLCJjb3VudCIsImZpbmlzaCIsImR1cmF0aW9uIiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUVBOztBQUVBOztBQUVBOzs7SUFHYUEsYztBQWNUOzs7O0FBSUEsMEJBQVlDLFNBQVosRUFBa0M7QUFBQTs7QUFBQTtBQUFBLFNBakJqQkEsU0FpQmlCO0FBQUEsU0FmakJDLGdCQWVpQjtBQUFBLFNBZGpCQyxpQkFjaUI7QUFBQSxTQWJqQkMsZ0JBYWlCO0FBQUEsU0FaakJDLGVBWWlCO0FBQUEsU0FYakJDLGlCQVdpQjtBQUFBLFNBVmpCQyxrQkFVaUI7QUFBQSxTQVRqQkMsb0JBU2lCO0FBQUEsU0FSakJDLGNBUWlCO0FBQUEsU0FQakJDLHVCQU9pQjtBQUFBLFNBTmpCQyxhQU1pQjtBQUM5QixTQUFLVixTQUFMLEdB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Q0FBQ2tHLGNBQUY7O0FBRUEsVUFBSWxHLENBQUMsQ0FBQ3VDLElBQUYsS0FBVyxVQUFmLEVBQTJCO0FBQ3ZCSyxRQUFBQSxVQUFVLENBQUM7QUFBQSxpQkFBTSxNQUFJLENBQUMxQyxnQkFBTCxFQUFOO0FBQUEsU0FBRCxFQUFnQyxHQUFoQyxDQUFWO0FBQ0g7O0FBRURGLE1BQUFBLENBQUMsQ0FBQ2tHLGNBQUY7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge0NsaWNrTW9kZX0gZnJvbSBcIi4uLy4uL0VudW1zL01vZGVzL0NsaWNrTW9kZVwiO1xuaW1wb3J0IHtDb250YWluZXJ9IGZyb20gXCIuLi9Db250YWluZXJcIjtcbmltcG9ydCB7SW50ZXJhY3Rpdml0eURldGVjdH0gZnJvbSBcIi4uLy4uL0VudW1zL0ludGVyYWN0aXZpdHlEZXRlY3RcIjtcbmltcG9ydCB7SUNvb3JkaW5hdGVzfSBmcm9tIFwiLi4vLi4vSW50ZXJmYWNlcy9JQ29vcmRpbmF0ZXNcIjtcbmltcG9ydCB7UG9seWdvbk1hc2tUeXBlfSBmcm9tIFwiLi4vLi4vRW51bXMvUG9seWdvbk1hc2tUeXBlXCI7XG5cbi8qKlxuICogUGFydGljbGVzIGNvbnRhaW5lciBldmVudCBsaXN0ZW5lcnMgbWFuYWdlclxuICovXG5leHBvcnQgY2xhc3MgRXZlbnRMaXN0ZW5lcnMge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29udGFpbmVyOiBDb250YWluZXI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IG1vdXNlTW92ZUhhbmRsZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q7XG4gICAgcHJpdmF0ZSByZWFkb25seSB0b3VjaFN0YXJ0SGFuZGxlcjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvdWNoTW92ZUhhbmRsZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q7XG4gICAgcHJpdmF0ZSByZWFkb25seSB0b3VjaEVuZEhhbmRsZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q7XG4gICAgcHJpdmF0ZSByZWFkb25seSBtb3VzZUxlYXZlSGFuZGxlcjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvdWNoQ2FuY2VsSGFuZGxlcjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvdWNoRW5kQ2xpY2tIYW5kbGVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbW91c2VVcEhhbmRsZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q7XG4gICAgcHJpdmF0ZSByZWFkb25seSB2aXNpYmlsaXR5Q2hhbmdlSGFuZGxlcjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc2l6ZUhhbmRsZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudHMgbGlzdGVuZXIgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gY29udGFpbmVyIHRoZSBjYWxsaW5nIGNvbnRhaW5lclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgICAgIHRoaXMubW91c2VNb3ZlSGFuZGxlciA9IChlOiBFdmVudCkgPT4gdGhpcy5tb3VzZVRvdWNoTW92ZShlKTtcbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0SGFuZGxlciA9IChlOiBFdmVudCkgPT4gdGhpcy5tb3VzZVRvdWNoTW92ZShlKTtcbiAgICAgICAgdGhpcy50b3VjaE1vdmVIYW5kbGVyID0gKGU6IEV2ZW50KSA9PiB0aGlzLm1vdXNlVG91Y2hNb3ZlKGUpO1xuICAgICAgICB0aGlzLnRvdWNoRW5kSGFuZGxlciA9ICgpID0+IHRoaXMubW91c2VUb3VjaEZpbmlzaCgpO1xuICAgICAgICB0aGlzLm1vdXNlTGVhdmVIYW5kbGVyID0gKCkgPT4gdGhpcy5tb3VzZVRvdWNoRmluaXNoKCk7XG4gICAgICAgIHRoaXMudG91Y2hDYW5jZWxIYW5kbGVyID0gKCkgPT4gdGhpcy5tb3VzZVRvdWNoRmluaXNoKCk7XG4gICAgICAgIHRoaXMudG91Y2hFbmRDbGlja0hhbmRsZXIgPSAoZTogRXZlbnQpID0+IHRoaXMubW91c2VUb3VjaENsaWNrKGUpO1xuICAgICAgICB0aGlzLm1vdXNlVXBIYW5kbGVyID0gKGU6IEV2ZW50KSA9PiB0aGlzLm1vdXNlVG91Y2hDbGljayhlKTtcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5Q2hhbmdlSGFuZGxlciA9ICgpID0+IHRoaXMuaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSgpO1xuICAgICAgICB0aGlzLnJlc2l6ZUhhbmRsZXIgPSAoKSA9PiB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemluZyBldmVudCBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkRXZlbnRzTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIC8qIGV2ZW50cyB0YXJnZXQgZWxlbWVudCAqL1xuICAgICAgICBpZiAob3B0aW9ucy5pbnRlcmFjdGl2aXR5LmRldGVjdHNPbiA9PT0gSW50ZXJhY3Rpdml0eURldGVjdC53aW5kb3cpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5LmVsZW1lbnQgPSB3aW5kb3c7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5pbnRlcmFjdGl2aXR5LmRldGVjdHNPbiA9PT0gSW50ZXJhY3Rpdml0eURldGVjdC5wYXJlbnQgJiYgY29udGFpbmVyLmNhbnZhcy5lbGVtZW50KSB7XG4gICAgICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5lbGVtZW50ID0gY29udGFpbmVyLmNhbnZhcy5lbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5lbGVtZW50ID0gY29udGFpbmVyLmNhbnZhcy5lbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW50ZXJhY3Rpdml0eUVsID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkuZWxlbWVudDtcblxuICAgICAgICAvKiBkZXRlY3QgbW91c2UgcG9zIC0gb24gaG92ZXIgLyBjbGljayBldmVudCAqL1xuICAgICAgICBpZiAob3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkhvdmVyLmVuYWJsZSB8fCBvcHRpb25zLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uQ2xpY2suZW5hYmxlKSB7XG4gICAgICAgICAgICBpZiAoaW50ZXJhY3Rpdml0eUVsKSB7XG4gICAgICAgICAgICAgICAgLyogZWwgb24gbW91c2Vtb3ZlICovXG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpdml0eUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmVIYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgIC8qIGVsIG9uIHRvdWNoc3RhcnQgKi9cbiAgICAgICAgICAgICAgICBpbnRlcmFjdGl2aXR5RWwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50b3VjaFN0YXJ0SGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICAvKiBlbCBvbiB0b3VjaG1vdmUgKi9cbiAgICAgICAgICAgICAgICBpbnRlcmFjdGl2aXR5RWwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNoTW92ZUhhbmRsZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uQ2xpY2suZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIGVsIG9uIHRvdWNoZW5kICovXG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aXZpdHlFbC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy50b3VjaEVuZEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIGVsIG9uIG9ubW91c2VsZWF2ZSAqL1xuICAgICAgICAgICAgICAgIGludGVyYWN0aXZpdHlFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLm1vdXNlTGVhdmVIYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgIC8qIGVsIG9uIHRvdWNoY2FuY2VsICovXG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpdml0eUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLnRvdWNoQ2FuY2VsSGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBvbiBjbGljayBldmVudCAqL1xuICAgICAgICBpZiAob3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkNsaWNrLmVuYWJsZSkge1xuICAgICAgICAgICAgaWYgKGludGVyYWN0aXZpdHlFbCkge1xuICAgICAgICAgICAgICAgIGludGVyYWN0aXZpdHlFbC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy50b3VjaEVuZENsaWNrSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpdml0eUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2VVcEhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMucmVzaXplKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIHRoaXMudmlzaWJpbGl0eUNoYW5nZUhhbmRsZXIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRzTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIC8qIGV2ZW50cyB0YXJnZXQgZWxlbWVudCAqL1xuICAgICAgICBpZiAob3B0aW9ucy5pbnRlcmFjdGl2aXR5LmRldGVjdHNPbiA9PT0gSW50ZXJhY3Rpdml0eURldGVjdC53aW5kb3cpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5LmVsZW1lbnQgPSB3aW5kb3c7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5pbnRlcmFjdGl2aXR5LmRldGVjdHNPbiA9PT0gSW50ZXJhY3Rpdml0eURldGVjdC5wYXJlbnQgJiYgY29udGFpbmVyLmNhbnZhcy5lbGVtZW50KSB7XG4gICAgICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5lbGVtZW50ID0gY29udGFpbmVyLmNhbnZhcy5lbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5lbGVtZW50ID0gY29udGFpbmVyLmNhbnZhcy5lbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW50ZXJhY3Rpdml0eUVsID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkuZWxlbWVudDtcblxuICAgICAgICAvKiBkZXRlY3QgbW91c2UgcG9zIC0gb24gaG92ZXIgLyBjbGljayBldmVudCAqL1xuICAgICAgICBpZiAob3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkhvdmVyLmVuYWJsZSB8fCBvcHRpb25zLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uQ2xpY2suZW5hYmxlKSB7XG4gICAgICAgICAgICBpZiAoaW50ZXJhY3Rpdml0eUVsKSB7XG4gICAgICAgICAgICAgICAgLyogZWwgb24gbW91c2Vtb3ZlICovXG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpdml0eUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmVIYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgIC8qIGVsIG9uIHRvdWNoc3RhcnQgKi9cbiAgICAgICAgICAgICAgICBpbnRlcmFjdGl2aXR5RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50b3VjaFN0YXJ0SGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICAvKiBlbCBvbiB0b3VjaG1vdmUgKi9cbiAgICAgICAgICAgICAgICBpbnRlcmFjdGl2aXR5RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNoTW92ZUhhbmRsZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uQ2xpY2suZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIGVsIG9uIHRvdWNoZW5kICovXG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aXZpdHlFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy50b3VjaEVuZEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIGVsIG9uIG9ubW91c2VsZWF2ZSAqL1xuICAgICAgICAgICAgICAgIGludGVyYWN0aXZpdHlFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLm1vdXNlTGVhdmVIYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgIC8qIGVsIG9uIHRvdWNoY2FuY2VsICovXG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpdml0eUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLnRvdWNoQ2FuY2VsSGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBvbiBjbGljayBldmVudCAqL1xuICAgICAgICBpZiAob3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkNsaWNrLmVuYWJsZSkge1xuICAgICAgICAgICAgaWYgKGludGVyYWN0aXZpdHlFbCkge1xuICAgICAgICAgICAgICAgIGludGVyYWN0aXZpdHlFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy50b3VjaEVuZENsaWNrSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpdml0eUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2VVcEhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMucmVzaXplKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIHRoaXMudmlzaWJpbGl0eUNoYW5nZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlV2luZG93UmVzaXplKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIGlmICghY29udGFpbmVyLmNhbnZhcy5lbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIuY2FudmFzLmRpbWVuc2lvbi53aWR0aCA9IGNvbnRhaW5lci5jYW52YXMuZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29udGFpbmVyLmNhbnZhcy5kaW1lbnNpb24uaGVpZ2h0ID0gY29udGFpbmVyLmNhbnZhcy5lbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgICAgICAvKiByZXNpemUgY2FudmFzICovXG4gICAgICAgIGlmIChjb250YWluZXIucmV0aW5hLmlzUmV0aW5hKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2FudmFzLmRpbWVuc2lvbi53aWR0aCAqPSBjb250YWluZXIucmV0aW5hLnB4UmF0aW87XG4gICAgICAgICAgICBjb250YWluZXIuY2FudmFzLmRpbWVuc2lvbi5oZWlnaHQgKj0gY29udGFpbmVyLnJldGluYS5weFJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyLmNhbnZhcy5lbGVtZW50LndpZHRoID0gY29udGFpbmVyLmNhbnZhcy5kaW1lbnNpb24ud2lkdGg7XG4gICAgICAgIGNvbnRhaW5lci5jYW52YXMuZWxlbWVudC5oZWlnaHQgPSBjb250YWluZXIuY2FudmFzLmRpbWVuc2lvbi5oZWlnaHQ7XG5cbiAgICAgICAgLyogcmVwYWludCBjYW52YXMgb24gYW5pbSBkaXNhYmxlZCAqL1xuICAgICAgICBpZiAoIW9wdGlvbnMucGFydGljbGVzLm1vdmUuZW5hYmxlKSB7XG4gICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLmNsZWFyKCk7XG4gICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLmluaXQoKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5wYXJ0aWNsZXMuZHJhdygwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGRlbnNpdHkgcGFydGljbGVzIGVuYWJsZWQgKi9cbiAgICAgICAgY29udGFpbmVyLmRlbnNpdHlBdXRvUGFydGljbGVzKCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucG9seWdvbi5lbmFibGUgJiYgb3B0aW9ucy5wb2x5Z29uLnR5cGUgIT09IFBvbHlnb25NYXNrVHlwZS5ub25lKSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLnBvbHlnb24ucmVkcmF3VGltZW91dCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChjb250YWluZXIucG9seWdvbi5yZWRyYXdUaW1lb3V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGFpbmVyLnBvbHlnb24ucmVkcmF3VGltZW91dCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wb2x5Z29uLnJhdyA9IGF3YWl0IGNvbnRhaW5lci5wb2x5Z29uLnBhcnNlU3ZnUGF0aFRvUG9seWdvbigpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wYXJ0aWNsZXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLmluaXQoKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLmRyYXcoMCk7XG4gICAgICAgICAgICB9LCAyNTApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIGlmICghb3B0aW9ucy5wYXVzZU9uQmx1cikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50Py5oaWRkZW4pIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5wYWdlSGlkZGVuID0gdHJ1ZTtcblxuICAgICAgICAgICAgY29udGFpbmVyLnBhdXNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIucGFnZUhpZGRlbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICBjb250YWluZXIucGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UvVG91Y2ggbW92ZSBldmVudFxuICAgICAqIEBwYXJhbSBlIHRoZSBldmVudCBhcmd1bWVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdXNlVG91Y2hNb3ZlKGU6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGFpbmVyLm9wdGlvbnM7XG5cbiAgICAgICAgbGV0IHBvczogSUNvb3JkaW5hdGVzO1xuXG4gICAgICAgIGlmIChlLnR5cGUuc3RhcnRzV2l0aChcIm1vdXNlXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBtb3VzZUV2ZW50ID0gZSBhcyBNb3VzZUV2ZW50O1xuXG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmludGVyYWN0aXZpdHkuZWxlbWVudCA9PT0gd2luZG93ICYmIGNvbnRhaW5lci5jYW52YXMuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaWVudFJlY3QgPSBjb250YWluZXIuY2FudmFzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICBwb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IG1vdXNlRXZlbnQuY2xpZW50WCAtIGNsaWVudFJlY3QubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgeTogbW91c2VFdmVudC5jbGllbnRZIC0gY2xpZW50UmVjdC50b3AsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5pbnRlcmFjdGl2aXR5LmRldGVjdHNPbiA9PT0gSW50ZXJhY3Rpdml0eURldGVjdC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBtb3VzZUV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBtb3VzZUV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoc291cmNlICYmIHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VSZWN0ID0gc291cmNlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRSZWN0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IG1vdXNlRXZlbnQub2Zmc2V0WCArIHNvdXJjZVJlY3QubGVmdCAtIHRhcmdldFJlY3QubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IG1vdXNlRXZlbnQub2Zmc2V0WSArIHNvdXJjZVJlY3QudG9wIC0gdGFyZ2V0UmVjdC50b3AsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogbW91c2VFdmVudC5vZmZzZXRYIHx8IG1vdXNlRXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IG1vdXNlRXZlbnQub2Zmc2V0WSB8fCBtb3VzZUV2ZW50LmNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IG1vdXNlRXZlbnQub2Zmc2V0WCB8fCBtb3VzZUV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIHk6IG1vdXNlRXZlbnQub2Zmc2V0WSB8fCBtb3VzZUV2ZW50LmNsaWVudFksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHRvdWNoRXZlbnQgPSBlIGFzIFRvdWNoRXZlbnQ7XG5cbiAgICAgICAgICAgIGNvbnN0IGxhc3RUb3VjaCA9IHRvdWNoRXZlbnQudG91Y2hlc1t0b3VjaEV2ZW50LnRvdWNoZXMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICAgIHBvcyA9IHtcbiAgICAgICAgICAgICAgICB4OiBsYXN0VG91Y2guY2xpZW50WCxcbiAgICAgICAgICAgICAgICB5OiBsYXN0VG91Y2guY2xpZW50WSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbiA9IHBvcztcblxuICAgICAgICBpZiAoY29udGFpbmVyLnJldGluYS5pc1JldGluYSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UucG9zaXRpb24ueCAqPSBjb250YWluZXIucmV0aW5hLnB4UmF0aW87XG4gICAgICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbi55ICo9IGNvbnRhaW5lci5yZXRpbmEucHhSYXRpbztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5LnN0YXR1cyA9IFwibW91c2Vtb3ZlXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UvVG91Y2ggZXZlbnQgZmluaXNoXG4gICAgICovXG4gICAgcHJpdmF0ZSBtb3VzZVRvdWNoRmluaXNoKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5LnN0YXR1cyA9IFwibW91c2VsZWF2ZVwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlL1RvdWNoIGNsaWNrL3RhcCBldmVudFxuICAgICAqIEBwYXJhbSBlIHRoZSBjbGljayBldmVudCBhcmd1bWVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdXNlVG91Y2hDbGljayhlOiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnBvbHlnb24uZW5hYmxlICYmIG9wdGlvbnMucG9seWdvbi50eXBlICE9PSBQb2x5Z29uTWFza1R5cGUubm9uZSAmJlxuICAgICAgICAgICAgb3B0aW9ucy5wb2x5Z29uLnR5cGUgIT09IFBvbHlnb25NYXNrVHlwZS5pbmxpbmUpIHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIucG9seWdvbi5jaGVja0luc2lkZVBvbHlnb24oY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UucG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb01vdXNlVG91Y2hDbGljayhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZG9Nb3VzZVRvdWNoQ2xpY2soZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZS9Ub3VjaCBjbGljay90YXAgZXZlbnQgaW1wbGVtZW50YXRpb25cbiAgICAgKiBAcGFyYW0gZSB0aGUgY2xpY2sgZXZlbnQgYXJndW1lbnRzXG4gICAgICovXG4gICAgcHJpdmF0ZSBkb01vdXNlVG91Y2hDbGljayhlOiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIGlmIChjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbikge1xuICAgICAgICAgICAgY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgIHk6IGNvbnRhaW5lci5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc2l0aW9uLnksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgY29uc3QgcHVzaE5iID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLnB1c2gucXVhbnRpdHk7XG4gICAgICAgIGNvbnN0IHJlbW92ZU5iID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLnJlbW92ZS5xdWFudGl0eTtcblxuICAgICAgICBzd2l0Y2ggKG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMub25DbGljay5tb2RlKSB7XG4gICAgICAgICAgICBjYXNlIENsaWNrTW9kZS5wdXNoOlxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnBhcnRpY2xlcy5tb3ZlLmVuYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLnB1c2gocHVzaE5iLCBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5tb2Rlcy5wdXNoLnF1YW50aXR5ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLnB1c2gocHVzaE5iLCBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLnB1c2gucXVhbnRpdHkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLnB1c2gocHVzaE5iKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2xpY2tNb2RlLnJlbW92ZTpcbiAgICAgICAgICAgICAgICBjb250YWluZXIucGFydGljbGVzLnJlbW92ZShyZW1vdmVOYik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENsaWNrTW9kZS5idWJibGU6XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmJ1YmJsZS5jbGlja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENsaWNrTW9kZS5yZXB1bHNlOlxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5yZXB1bHNlLmNsaWNraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVwdWxzZS5jb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnJlcHVsc2UuZmluaXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5yZXB1bHNlLmNsaWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgb3B0aW9ucy5pbnRlcmFjdGl2aXR5Lm1vZGVzLnJlcHVsc2UuZHVyYXRpb24gKiAxMDAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoZS50eXBlID09PSBcInRvdWNoZW5kXCIpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5tb3VzZVRvdWNoRmluaXNoKCksIDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuIl19