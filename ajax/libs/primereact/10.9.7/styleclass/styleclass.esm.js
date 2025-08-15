'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { useEventListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ObjectUtils, DomHandler } from 'primereact/utils';

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

var StyleClassBase = {
  defaultProps: {
    __TYPE: 'StyleClass',
    nodeRef: null,
    selector: null,
    enterClassName: null,
    enterFromClassName: null,
    enterActiveClassName: null,
    enterToClassName: null,
    leaveClassName: null,
    leaveFromClassName: null,
    leaveActiveClassName: null,
    leaveToClassName: null,
    hideOnOutsideClick: false,
    toggleClassName: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, StyleClassBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, StyleClassBase.defaultProps);
  }
};

var StyleClass = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = StyleClassBase.getProps(inProps, context);
  var targetRef = React.useRef(null);
  var animating = React.useRef(false);
  var elementRef = React.useRef(null);
  var _useEventListener = useEventListener({
      type: 'animationend',
      listener: function listener() {
        DomHandler.removeClass(targetRef.current, props.enterActiveClassName);
        if (props.enterToClassName) {
          DomHandler.addClass(targetRef.current, props.enterToClassName);
        }
        unbindTargetEnterListener();
        if (props.enterActiveClassName === 'slidedown') {
          targetRef.current.style.maxHeight = '';
        }
        animating.current = false;
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindTargetEnterListener = _useEventListener2[0],
    unbindTargetEnterListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'animationend',
      listener: function listener() {
        DomHandler.removeClass(targetRef.current, props.leaveActiveClassName);
        if (props.leaveToClassName) {
          DomHandler.addClass(targetRef.current, props.leaveToClassName);
        }
        unbindTargetLeaveListener();
        animating.current = false;
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindTargetLeaveListener = _useEventListener4[0],
    unbindTargetLeaveListener = _useEventListener4[1];
  var _useEventListener5 = useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (!isVisible(targetRef.current) || getComputedStyle(targetRef.current).getPropertyValue('position') === 'static') {
          unbindDocumentClickListener();
        } else if (isOutsideClick(event)) {
          leave();
        }
      },
      when: props.hideOnOutsideClick
    }),
    _useEventListener6 = _slicedToArray(_useEventListener5, 2),
    bindDocumentClickListener = _useEventListener6[0],
    unbindDocumentClickListener = _useEventListener6[1];
  var _useEventListener7 = useEventListener({
      type: 'click',
      listener: function listener() {
        targetRef.current = resolveTarget();
        if (props.toggleClassName) {
          if (DomHandler.hasClass(targetRef.current, props.toggleClassName)) {
            DomHandler.removeClass(targetRef.current, props.toggleClassName);
          } else {
            DomHandler.addClass(targetRef.current, props.toggleClassName);
          }
        } else {
          DomHandler.isVisible(targetRef.current) ? leave() : enter();
        }
      }
    }),
    _useEventListener8 = _slicedToArray(_useEventListener7, 2),
    bindClickListener = _useEventListener8[0],
    unbindClickListener = _useEventListener8[1];
  var enter = function enter() {
    if (props.enterActiveClassName) {
      if (!animating.current) {
        animating.current = true;
        if (props.enterActiveClassName === 'slidedown') {
          targetRef.current.style.height = '0px';
          DomHandler.removeClass(targetRef.current, 'hidden');
          targetRef.current.style.maxHeight = targetRef.current.scrollHeight + 'px';
          DomHandler.addClass(targetRef.current, 'hidden');
          targetRef.current.style.height = '';
        }
        DomHandler.addClass(targetRef.current, props.enterActiveClassName);

        // enterClassName will be deprecated, use enterFromClassName
        if (props.enterClassName) {
          DomHandler.removeClass(targetRef.current, props.enterClassName);
        }
        if (props.enterFromClassName) {
          DomHandler.removeClass(targetRef.current, props.enterFromClassName);
        }
        bindTargetEnterListener({
          target: targetRef.current
        });
      }
    } else {
      // enterClassName will be deprecated, use enterFromClassName
      if (props.enterClassName) {
        DomHandler.removeClass(targetRef.current, props.enterClassName);
      }
      if (props.enterFromClassName) {
        DomHandler.removeClass(targetRef.current, props.enterFromClassName);
      }
      if (props.enterToClassName) {
        DomHandler.addClass(targetRef.current, props.enterToClassName);
      }
    }
    bindDocumentClickListener({
      target: elementRef.current && elementRef.current.ownerDocument
    });
  };
  var leave = function leave() {
    if (props.leaveActiveClassName) {
      if (!animating.current) {
        animating.current = true;
        DomHandler.addClass(targetRef.current, props.leaveActiveClassName);

        // leaveClassName will be deprecated, use leaveFromClassName
        if (props.leaveClassName) {
          DomHandler.removeClass(targetRef.current, props.leaveClassName);
        }
        if (props.leaveFromClassName) {
          DomHandler.removeClass(targetRef.current, props.leaveFromClassName);
        }
        bindTargetLeaveListener({
          target: targetRef.current
        });
      }
    } else {
      // leaveClassName will be deprecated, use leaveFromClassName
      if (props.leaveClassName) {
        DomHandler.removeClass(targetRef.current, props.leaveClassName);
      }
      if (props.leaveFromClassName) {
        DomHandler.removeClass(targetRef.current, props.leaveFromClassName);
      }
      if (props.leaveToClassName) {
        DomHandler.addClass(targetRef.current, props.leaveToClassName);
      }
    }
    if (props.hideOnOutsideClick) {
      unbindDocumentClickListener();
    }
  };
  var resolveTarget = function resolveTarget() {
    if (targetRef.current) {
      return targetRef.current;
    }
    switch (props.selector) {
      case '@next':
        return elementRef.current && elementRef.current.nextElementSibling;
      case '@prev':
        return elementRef.current && elementRef.current.previousElementSibling;
      case '@parent':
        return elementRef.current && elementRef.current.parentElement;
      case '@grandparent':
        return elementRef.current && elementRef.current.parentElement.parentElement;
      default:
        return document.querySelector(props.selector);
    }
  };
  var init = function init() {
    Promise.resolve().then(function () {
      elementRef.current = ObjectUtils.getRefElement(props.nodeRef);
      bindClickListener({
        target: elementRef.current
      });
    });
  };
  var destroy = function destroy() {
    unbindClickListener();
    unbindDocumentClickListener();
    targetRef.current = null;
  };
  var isVisible = function isVisible(target) {
    return target && target.offsetParent !== null;
  };
  var isOutsideClick = function isOutsideClick(event) {
    return !elementRef.current.isSameNode(event.target) && !elementRef.current.contains(event.target) && !targetRef.current.contains(event.target);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      },
      getTarget: function getTarget() {
        return targetRef.current;
      }
    };
  });
  useMountEffect(function () {
    init();
  });
  useUpdateEffect(function () {
    init();
    return function () {
      unbindClickListener();
    };
  });
  useUnmountEffect(function () {
    destroy();
  });
  return props.children;
});
StyleClass.displayName = 'StyleClass';

export { StyleClass };
