this.primereact = this.primereact || {};
this.primereact.ripple = (function (exports, React, PrimeReact, hooks, utils) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespace(React);
    var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

    var Ripple = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function () {
      var inkRef = React__namespace.useRef(null);
      var targetRef = React__namespace.useRef(null);

      var getTarget = function getTarget() {
        return inkRef.current && inkRef.current.parentElement;
      };

      var bindEvents = function bindEvents() {
        if (targetRef.current) {
          targetRef.current.addEventListener('mousedown', onMouseDown);
          utils.DomHandler.isTouchDevice() && targetRef.current.addEventListener('touchstart', onTouchStart);
        }
      };

      var unbindEvents = function unbindEvents() {
        if (targetRef.current) {
          targetRef.current.removeEventListener('mousedown', onMouseDown);
          utils.DomHandler.isTouchDevice() && targetRef.current.removeEventListener('touchstart', onTouchStart);
        }
      };

      var onTouchStart = function onTouchStart(event) {
        var offset = utils.DomHandler.getOffset(targetRef.current);
        var offsetX = event.targetTouches[0].pageX - offset.left + document.body.scrollTop - utils.DomHandler.getWidth(inkRef.current) / 2;
        var offsetY = event.targetTouches[0].pageY - offset.top + document.body.scrollLeft - utils.DomHandler.getHeight(inkRef.current) / 2;
        activateRipple(offsetX, offsetY);
      };

      var onMouseDown = function onMouseDown(event) {
        if (utils.DomHandler.isTouchDevice()) {
          // already started ripple with onTouchStart
          return;
        }

        var offset = utils.DomHandler.getOffset(targetRef.current);
        var offsetX = event.pageX - offset.left + document.body.scrollTop - utils.DomHandler.getWidth(inkRef.current) / 2;
        var offsetY = event.pageY - offset.top + document.body.scrollLeft - utils.DomHandler.getHeight(inkRef.current) / 2;
        activateRipple(offsetX, offsetY);
      };

      var activateRipple = function activateRipple(offsetX, offsetY) {
        if (!inkRef.current || getComputedStyle(inkRef.current, null).display === 'none') {
          return;
        }

        utils.DomHandler.removeClass(inkRef.current, 'p-ink-active');

        if (!utils.DomHandler.getHeight(inkRef.current) && !utils.DomHandler.getWidth(inkRef.current)) {
          var d = Math.max(utils.DomHandler.getOuterWidth(targetRef.current), utils.DomHandler.getOuterHeight(targetRef.current));
          inkRef.current.style.height = d + 'px';
          inkRef.current.style.width = d + 'px';
        }

        inkRef.current.style.top = offsetY + 'px';
        inkRef.current.style.left = offsetX + 'px';
        utils.DomHandler.addClass(inkRef.current, 'p-ink-active');
      };

      var onAnimationEnd = function onAnimationEnd(event) {
        utils.DomHandler.removeClass(event.currentTarget, 'p-ink-active');
      };

      hooks.useMountEffect(function () {
        if (inkRef.current) {
          targetRef.current = getTarget();
          bindEvents();
        }
      });
      hooks.useUpdateEffect(function () {
        if (inkRef.current && !targetRef.current) {
          targetRef.current = getTarget();
          bindEvents();
        }
      });
      hooks.useUnmountEffect(function () {
        if (inkRef.current) {
          targetRef.current = null;
          unbindEvents();
        }
      });
      return PrimeReact__default["default"].ripple ? /*#__PURE__*/React__namespace.createElement("span", {
        role: "presentation",
        ref: inkRef,
        className: "p-ink",
        onAnimationEnd: onAnimationEnd
      }) : null;
    }));
    Ripple.displayName = 'Ripple';
    Ripple.defaultProps = {
      __TYPE: 'Ripple'
    };

    exports.Ripple = Ripple;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.api, primereact.hooks, primereact.utils);
