import * as React from 'react';
import { localeOption } from 'primereact/api';
import { useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ObjectUtils, classNames } from 'primereact/utils';

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var DataScroller = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dataToRenderState = _React$useState2[0],
      setDataToRenderState = _React$useState2[1];

  var elementRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var value = React.useRef(props.value);
  var dataToRender = React.useRef([]);
  var first = React.useRef(0);
  var scrollFunction = React.useRef(null);

  var handleDataChange = function handleDataChange() {
    if (props.lazy) {
      dataToRender.current = value.current;
      setDataToRenderState(_toConsumableArray(dataToRender.current));
    } else {
      load();
    }
  };

  var load = function load() {
    if (props.lazy) {
      if (props.onLazyLoad) {
        props.onLazyLoad(createLazyLoadMetadata());
      }

      first.current += props.rows;
    } else {
      if (value.current) {
        for (var i = first.current; i < first.current + props.rows; i++) {
          if (i >= value.current.length) {
            break;
          }

          dataToRender.current.push(value.current[i]);
        }

        if (value.current.length !== 0) {
          first.current += props.rows;
        }

        setDataToRenderState(_toConsumableArray(dataToRender.current));
      }
    }
  };

  var reset = function reset() {
    first.current = 0;
    dataToRender.current = [];
    setDataToRenderState(_toConsumableArray(dataToRender.current));
    load();
  };

  var createLazyLoadMetadata = function createLazyLoadMetadata() {
    return {
      first: first.current,
      rows: props.rows
    };
  };

  var bindScrollListener = function bindScrollListener() {
    if (props.inline) {
      scrollFunction.current = function () {
        var scrollTop = contentRef.current.scrollTop,
            scrollHeight = contentRef.current.scrollHeight,
            viewportHeight = contentRef.current.clientHeight;

        if (scrollTop >= scrollHeight * props.buffer - viewportHeight) {
          load();
        }
      };

      contentRef.current.addEventListener('scroll', scrollFunction.current);
    } else {
      scrollFunction.current = function () {
        var docBody = document.body,
            docElement = document.documentElement,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop,
            winHeight = docElement.clientHeight,
            docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);

        if (scrollTop >= docHeight * props.buffer - winHeight) {
          load();
        }
      };

      window.addEventListener('scroll', scrollFunction.current);
    }
  };

  var unbindScrollListener = function unbindScrollListener() {
    if (scrollFunction.current) {
      if (props.inline && contentRef.current) {
        contentRef.current.removeEventListener('scroll', scrollFunction.current);
      } else if (!props.loader) {
        window.removeEventListener('scroll', scrollFunction.current);
      }
    }

    scrollFunction.current = null;
  };

  useMountEffect(function () {
    load();

    if (!props.loader) {
      bindScrollListener();
    }
  });
  useUpdateEffect(function () {
    if (props.value) {
      value.current = props.value;

      if (!props.lazy) {
        first.current = 0;
      }

      dataToRender.current = [];
      handleDataChange();
    }
  }, [props.value]);
  useUpdateEffect(function () {
    if (props.loader) {
      unbindScrollListener();
    }
  }, [props.loader]);
  useUnmountEffect(function () {
    if (scrollFunction.current) {
      unbindScrollListener();
    }
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      load: load,
      reset: reset,
      getElement: function getElement() {
        return elementRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      }
    };
  });

  var createHeader = function createHeader() {
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", {
        className: "p-datascroller-header"
      }, props.header);
    }

    return null;
  };

  var createFooter = function createFooter() {
    if (props.footer) {
      return /*#__PURE__*/React.createElement("div", {
        className: "p-datascroller-footer"
      }, props.footer);
    }

    return null;
  };

  var createItem = function createItem(_value, index) {
    var content = props.itemTemplate ? props.itemTemplate(_value) : _value;
    return /*#__PURE__*/React.createElement("li", {
      key: index + '_datascrollitem'
    }, content);
  };

  var createEmptyMessage = function createEmptyMessage() {
    var content = ObjectUtils.getJSXElement(props.emptyMessage, props) || localeOption('emptyMessage');
    return /*#__PURE__*/React.createElement("li", null, content);
  };

  var createContent = function createContent() {
    var content = ObjectUtils.isNotEmpty(dataToRenderState) ? dataToRenderState.map(createItem) : createEmptyMessage();
    return /*#__PURE__*/React.createElement("div", {
      ref: contentRef,
      className: "p-datascroller-content",
      style: {
        maxHeight: props.scrollHeight
      }
    }, /*#__PURE__*/React.createElement("ul", {
      className: "p-datascroller-list"
    }, content));
  };

  var otherProps = ObjectUtils.findDiffKeys(props, DataScroller.defaultProps);
  var className = classNames('p-datascroller p-component', props.className, {
    'p-datascroller-inline': props.inline
  });
  var header = createHeader();
  var footer = createFooter();
  var content = createContent();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: className
  }, otherProps), header, content, footer);
}));
DataScroller.displayName = 'DataScroller';
DataScroller.defaultProps = {
  __TYPE: 'DataScroller',
  id: null,
  value: null,
  rows: 0,
  inline: false,
  scrollHeight: null,
  loader: false,
  buffer: 0.9,
  style: null,
  className: null,
  onLazyLoad: null,
  emptyMessage: null,
  itemTemplate: null,
  header: null,
  footer: null,
  lazy: false
};

export { DataScroller };
