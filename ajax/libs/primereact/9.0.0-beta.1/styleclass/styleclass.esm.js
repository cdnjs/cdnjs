import * as React from 'react';
import { useEventListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { DomHandler, ObjectUtils } from 'primereact/utils';

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var StyleClass = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
          if (DomHandler.hasClass(targetRef.current, props.toggleClassName)) DomHandler.removeClass(targetRef.current, props.toggleClassName);else DomHandler.addClass(targetRef.current, props.toggleClassName);
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
        if (props.enterClassName) {
          DomHandler.removeClass(targetRef.current, props.enterClassName);
        }
        bindTargetEnterListener({
          target: targetRef.current
        });
      }
    } else {
      if (props.enterClassName) {
        DomHandler.removeClass(targetRef.current, props.enterClassName);
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
        if (props.leaveClassName) {
          DomHandler.removeClass(targetRef.current, props.leaveClassName);
        }
        bindTargetLeaveListener({
          target: targetRef.current
        });
      }
    } else {
      if (props.leaveClassName) {
        DomHandler.removeClass(targetRef.current, props.leaveClassName);
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
        return elementRef.current.nextElementSibling;
      case '@prev':
        return elementRef.current.previousElementSibling;
      case '@parent':
        return elementRef.current.parentElement;
      case '@grandparent':
        return elementRef.current.parentElement.parentElement;
      default:
        return document.querySelector(props.selector);
    }
  };
  var init = function init() {
    elementRef.current = ObjectUtils.getRefElement(props.nodeRef);
    bindClickListener({
      target: elementRef.current
    });
  };
  var destroy = function destroy() {
    unbindClickListener();
    unbindDocumentClickListener();
    targetRef.current = null;
  };
  var isVisible = function isVisible(target) {
    return target.offsetParent !== null;
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
StyleClass.defaultProps = {
  __TYPE: 'StyleClass',
  nodeRef: null,
  selector: null,
  enterClassName: null,
  enterActiveClassName: null,
  enterToClassName: null,
  leaveClassName: null,
  leaveActiveClassName: null,
  leaveToClassName: null,
  hideOnOutsideClick: false,
  toggleClassName: null
};

export { StyleClass };
