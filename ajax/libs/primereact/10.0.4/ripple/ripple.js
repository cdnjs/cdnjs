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

    var styles = "\n@layer primereact {\n    .p-ripple {\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-ink {\n        display: block;\n        position: absolute;\n        background: rgba(255, 255, 255, 0.5);\n        border-radius: 100%;\n        transform: scale(0);\n    }\n    \n    .p-ink-active {\n        animation: ripple 0.4s linear;\n    }\n    \n    .p-ripple-disabled .p-ink {\n        display: none !important;\n    }\n}\n\n@keyframes ripple {\n    100% {\n        opacity: 0;\n        transform: scale(2.5);\n    }\n}\n\n";
    var RippleBase = {
      defaultProps: {
        __TYPE: 'Ripple',
        children: undefined
      },
      css: {
        styles: styles
      },
      getProps: function getProps(props) {
        return utils.ObjectUtils.getMergedProps(props, RippleBase.defaultProps);
      },
      getOtherProps: function getOtherProps(props) {
        return utils.ObjectUtils.getDiffProps(props, RippleBase.defaultProps);
      }
    };

    var Ripple = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function () {
      var inkRef = React__namespace.useRef(null);
      var targetRef = React__namespace.useRef(null);
      var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
      hooks.useStyle(RippleBase.css.styles, {
        name: 'ripple'
      });
      var getTarget = function getTarget() {
        return inkRef.current && inkRef.current.parentElement;
      };
      var bindEvents = function bindEvents() {
        if (targetRef.current) {
          targetRef.current.addEventListener('pointerdown', onPointerDown);
        }
      };
      var unbindEvents = function unbindEvents() {
        if (targetRef.current) {
          targetRef.current.removeEventListener('pointerdown', onPointerDown);
        }
      };
      var onPointerDown = function onPointerDown(event) {
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
        setDimensions();
        inkRef.current.style.top = offsetY + 'px';
        inkRef.current.style.left = offsetX + 'px';
        utils.DomHandler.addClass(inkRef.current, 'p-ink-active');
      };
      var onAnimationEnd = function onAnimationEnd(event) {
        utils.DomHandler.removeClass(event.currentTarget, 'p-ink-active');
      };
      var setDimensions = function setDimensions() {
        if (inkRef.current && !utils.DomHandler.getHeight(inkRef.current) && !utils.DomHandler.getWidth(inkRef.current)) {
          var d = Math.max(utils.DomHandler.getOuterWidth(targetRef.current), utils.DomHandler.getOuterHeight(targetRef.current));
          inkRef.current.style.height = d + 'px';
          inkRef.current.style.width = d + 'px';
        }
      };
      hooks.useMountEffect(function () {
        if (inkRef.current) {
          targetRef.current = getTarget();
          setDimensions();
          bindEvents();
        }
      });
      hooks.useUpdateEffect(function () {
        if (inkRef.current && !targetRef.current) {
          targetRef.current = getTarget();
          setDimensions();
          bindEvents();
        }
      });
      hooks.useUnmountEffect(function () {
        if (inkRef.current) {
          targetRef.current = null;
          unbindEvents();
        }
      });
      return context && context.ripple || PrimeReact__default["default"].ripple ? /*#__PURE__*/React__namespace.createElement("span", {
        role: "presentation",
        ref: inkRef,
        className: "p-ink",
        onAnimationEnd: onAnimationEnd
      }) : null;
    }));
    Ripple.displayName = 'Ripple';

    exports.Ripple = Ripple;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.api, primereact.hooks, primereact.utils);
