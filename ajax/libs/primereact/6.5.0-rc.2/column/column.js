this.primereact = this.primereact || {};
this.primereact.column = (function (exports, react) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var propTypes = {exports: {}};

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = ReactPropTypesSecret_1;

  function emptyFunction() {}
  function emptyFunctionWithReset() {}
  emptyFunctionWithReset.resetWarningCache = emptyFunction;

  var factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        // It is still safe when called from React.
        return;
      }
      var err = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
        'Use PropTypes.checkPropTypes() to call them. ' +
        'Read more at http://fb.me/use-check-prop-types'
      );
      err.name = 'Invariant Violation';
      throw err;
    }  shim.isRequired = shim;
    function getShim() {
      return shim;
    }  // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,

      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,

      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };

    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    propTypes.exports = factoryWithThrowingShims();
  }

  var PropTypes = propTypes.exports;

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Column = /*#__PURE__*/function (_Component) {
    _inherits(Column, _Component);

    var _super = _createSuper(Column);

    function Column() {
      _classCallCheck(this, Column);

      return _super.apply(this, arguments);
    }

    return Column;
  }(react.Component);

  _defineProperty(Column, "defaultProps", {
    columnKey: null,
    field: null,
    sortField: null,
    filterField: null,
    header: null,
    body: null,
    loadingBody: null,
    footer: null,
    sortable: false,
    sortableDisabled: false,
    sortFunction: null,
    filter: false,
    filterMatchMode: 'startsWith',
    filterPlaceholder: null,
    filterType: 'text',
    filterMaxLength: null,
    filterElement: null,
    filterFunction: null,
    filterHeaderStyle: null,
    filterHeaderClassName: null,
    style: null,
    className: null,
    headerStyle: null,
    headerClassName: null,
    bodyStyle: null,
    bodyClassName: null,
    footerStyle: null,
    footerClassName: null,
    expander: false,
    frozen: false,
    selectionMode: null,
    colSpan: null,
    rowSpan: null,
    editor: null,
    editorValidator: null,
    editorValidatorEvent: 'click',
    onBeforeEditorHide: null,
    onBeforeEditorShow: null,
    onEditorInit: null,
    onEditorSubmit: null,
    onEditorCancel: null,
    excludeGlobalFilter: false,
    rowReorder: false,
    rowReorderIcon: 'pi pi-bars',
    rowEditor: false,
    exportable: true,
    reorderable: true
  });

  _defineProperty(Column, "propTypes", {
    columnKey: PropTypes.string,
    field: PropTypes.string,
    sortField: PropTypes.string,
    filterField: PropTypes.string,
    header: PropTypes.any,
    body: PropTypes.any,
    loadingBody: PropTypes.func,
    footer: PropTypes.any,
    sortable: PropTypes.bool,
    sortableDisabled: PropTypes.bool,
    sortFunction: PropTypes.func,
    filter: PropTypes.bool,
    filterMatchMode: PropTypes.string,
    filterPlaceholder: PropTypes.string,
    filterType: PropTypes.string,
    filterMaxLength: PropTypes.number,
    filterElement: PropTypes.object,
    filterFunction: PropTypes.func,
    filterHeaderStyle: PropTypes.object,
    filterHeaderClassName: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    headerStyle: PropTypes.object,
    headerClassName: PropTypes.string,
    bodyStyle: PropTypes.object,
    bodyClassName: PropTypes.string,
    footerStyle: PropTypes.object,
    footerClassName: PropTypes.string,
    expander: PropTypes.bool,
    frozen: PropTypes.bool,
    selectionMode: PropTypes.string,
    colSpan: PropTypes.number,
    rowSpan: PropTypes.number,
    editor: PropTypes.func,
    editorValidator: PropTypes.func,
    editorValidatorEvent: PropTypes.string,
    onBeforeEditorHide: PropTypes.func,
    onBeforeEditorShow: PropTypes.func,
    onEditorInit: PropTypes.func,
    onEditorSubmit: PropTypes.func,
    onEditorCancel: PropTypes.func,
    excludeGlobalFilter: PropTypes.bool,
    rowReorder: PropTypes.bool,
    rowReorderIcon: PropTypes.string,
    rowEditor: PropTypes.bool,
    exportable: PropTypes.bool,
    reorderable: PropTypes.bool
  });

  exports.Column = Column;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React));
