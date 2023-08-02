this.primereact = this.primereact || {};
this.primereact.datascroller = (function (exports, React, api, hooks, utils, componentbase) {
  'use strict';

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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var DataScrollerBase = componentbase.ComponentBase.extend({
    defaultProps: {
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
      lazy: false,
      children: undefined
    }
  });

  var DataScroller = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = DataScrollerBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dataToRenderState = _React$useState2[0],
      setDataToRenderState = _React$useState2[1];
    var _DataScrollerBase$set = DataScrollerBase.setMetaData({
        props: props
      }),
      ptm = _DataScrollerBase$set.ptm;
    var elementRef = React__namespace.useRef(null);
    var contentRef = React__namespace.useRef(null);
    var value = React__namespace.useRef(props.value);
    var dataToRender = React__namespace.useRef([]);
    var first = React__namespace.useRef(0);
    var scrollFunction = React__namespace.useRef(null);
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
    hooks.useMountEffect(function () {
      load();
      if (!props.loader) {
        bindScrollListener();
      }
    });
    hooks.useUpdateEffect(function () {
      if (props.value) {
        value.current = props.value;
        if (!props.lazy) {
          first.current = 0;
        }
        dataToRender.current = [];
        handleDataChange();
      }
    }, [props.value]);
    hooks.useUpdateEffect(function () {
      if (props.loader) {
        unbindScrollListener();
      }
    }, [props.loader]);
    hooks.useUnmountEffect(function () {
      if (scrollFunction.current) {
        unbindScrollListener();
      }
    });
    React__namespace.useImperativeHandle(ref, function () {
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
      var headerProps = utils.mergeProps({
        className: 'p-datascroller-header'
      }, ptm('header'));
      if (props.header) {
        return /*#__PURE__*/React__namespace.createElement("div", headerProps, props.header);
      }
      return null;
    };
    var createFooter = function createFooter() {
      var footerProps = utils.mergeProps({
        className: 'p-datascroller-footer'
      }, ptm('footer'));
      if (props.footer) {
        return /*#__PURE__*/React__namespace.createElement("div", footerProps, props.footer);
      }
      return null;
    };
    var createItem = function createItem(_value, index) {
      var itemProps = utils.mergeProps({
        key: index + '_datascrollitem'
      }, ptm('item'));
      var content = props.itemTemplate ? props.itemTemplate(_value) : _value;
      return /*#__PURE__*/React__namespace.createElement("li", itemProps, content);
    };
    var createEmptyMessage = function createEmptyMessage() {
      var emptyMessageProps = utils.mergeProps(ptm('emptyMessage'));
      var content = utils.ObjectUtils.getJSXElement(props.emptyMessage, props) || api.localeOption('emptyMessage');
      return /*#__PURE__*/React__namespace.createElement("li", emptyMessageProps, content);
    };
    var createContent = function createContent() {
      var contentProps = utils.mergeProps({
        ref: contentRef,
        className: 'p-datascroller-content',
        style: {
          maxHeight: props.scrollHeight
        }
      }, ptm('content'));
      var listProps = utils.mergeProps({
        className: 'p-datascroller-list'
      }, ptm('list'));
      var content = utils.ObjectUtils.isNotEmpty(dataToRenderState) ? dataToRenderState.map(createItem) : createEmptyMessage();
      return /*#__PURE__*/React__namespace.createElement("div", contentProps, /*#__PURE__*/React__namespace.createElement("ul", listProps, content));
    };
    var className = utils.classNames('p-datascroller p-component', props.className, {
      'p-datascroller-inline': props.inline
    });
    var header = createHeader();
    var footer = createFooter();
    var content = createContent();
    var rootProps = utils.mergeProps({
      id: props.id,
      ref: elementRef,
      className: className
    }, DataScrollerBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, header, content, footer);
  }));
  DataScroller.displayName = 'DataScroller';

  exports.DataScroller = DataScroller;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.utils, primereact.componentbase);
