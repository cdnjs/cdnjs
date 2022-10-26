import * as React from 'react';
import { ObjectUtils, classNames, IconUtils } from 'primereact/utils';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
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

var Chip = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(null);

  var _React$useState = React.useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];

  var onKeyDown = function onKeyDown(event) {
    if (event.keyCode === 13) {
      // enter
      close(event);
    }
  };

  var close = function close(event) {
    setVisibleState(false);

    if (props.onRemove) {
      props.onRemove(event);
    }
  };

  var createContent = function createContent() {
    var content = [];

    if (props.image) {
      content.push( /*#__PURE__*/React.createElement("img", {
        key: "image",
        src: props.image,
        alt: props.imageAlt,
        onError: props.onImageError
      }));
    } else if (props.icon) {
      content.push(IconUtils.getJSXIcon(props.icon, {
        key: 'icon',
        className: 'p-chip-icon'
      }, {
        props: props
      }));
    }

    if (props.label) {
      content.push( /*#__PURE__*/React.createElement("span", {
        key: "label",
        className: "p-chip-text"
      }, props.label));
    }

    if (props.removable) {
      content.push(IconUtils.getJSXIcon(props.removeIcon, {
        key: 'removeIcon',
        tabIndex: 0,
        className: 'p-chip-remove-icon',
        onClick: close,
        onKeyDown: onKeyDown
      }, {
        props: props
      }));
    }

    return content;
  };

  var createElement = function createElement() {
    var otherProps = ObjectUtils.findDiffKeys(props, Chip.defaultProps);
    var className = classNames('p-chip p-component', {
      'p-chip-image': props.image != null
    }, props.className);
    var content = props.template ? ObjectUtils.getJSXElement(props.template, props) : createContent();
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: elementRef,
      className: className,
      style: props.style
    }, otherProps), content);
  };

  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return visibleState && createElement();
}));
Chip.displayName = 'Chip';
Chip.defaultProps = {
  __TYPE: 'Chip',
  label: null,
  icon: null,
  image: null,
  removable: false,
  removeIcon: 'pi pi-times-circle',
  className: null,
  style: null,
  template: null,
  imageAlt: 'chip',
  onImageError: null,
  onRemove: null
};

export { Chip };
