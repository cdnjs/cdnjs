/* Tabulator v5.2.7 (c) Oliver Folkerd 2022 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tabulator = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var defaultOptions = {
    debugEventsExternal: false,
    //flag to console log events
    debugEventsInternal: false,
    //flag to console log events
    debugInvalidOptions: true,
    //allow toggling of invalid option warnings
    debugInitialization: true,
    //allow toggling of invalid option warnings
    height: false,
    //height of tabulator
    minHeight: false,
    //minimum height of tabulator
    maxHeight: false,
    //maximum height of tabulator
    columnHeaderVertAlign: "top",
    //vertical alignment of column headers
    popupContainer: false,
    columns: [],
    //store for colum header info
    columnDefaults: {},
    //store column default props
    data: false,
    //default starting data
    autoColumns: false,
    //build columns from data row structure
    autoColumnsDefinitions: false,
    nestedFieldSeparator: ".",
    //separator for nested data
    footerElement: false,
    //hold footer element
    index: "id",
    //filed for row index
    textDirection: "auto",
    addRowPos: "bottom",
    //position to insert blank rows, top|bottom
    headerVisible: true,
    //hide header
    renderVertical: "virtual",
    renderHorizontal: "basic",
    renderVerticalBuffer: 0,
    // set virtual DOM buffer size
    scrollToRowPosition: "top",
    scrollToRowIfVisible: true,
    scrollToColumnPosition: "left",
    scrollToColumnIfVisible: true,
    rowFormatter: false,
    rowFormatterPrint: null,
    rowFormatterClipboard: null,
    rowFormatterHtmlOutput: null,
    rowHeight: null,
    placeholder: false,
    dataLoader: true,
    dataLoaderLoading: false,
    dataLoaderError: false,
    dataLoaderErrorTimeout: 3000,
    dataSendParams: {},
    dataReceiveParams: {}
  };

  var CoreFeature = /*#__PURE__*/function () {
    function CoreFeature(table) {
      _classCallCheck(this, CoreFeature);

      this.table = table;
    } //////////////////////////////////////////
    /////////////// DataLoad /////////////////
    //////////////////////////////////////////


    _createClass(CoreFeature, [{
      key: "reloadData",
      value: function reloadData(data, silent, columnsChanged) {
        return this.table.dataLoader.load(data, undefined, undefined, undefined, silent, columnsChanged);
      } //////////////////////////////////////////
      ///////////// Localization ///////////////
      //////////////////////////////////////////

    }, {
      key: "langText",
      value: function langText() {
        var _this$table$modules$l;

        return (_this$table$modules$l = this.table.modules.localize).getText.apply(_this$table$modules$l, arguments);
      }
    }, {
      key: "langBind",
      value: function langBind() {
        var _this$table$modules$l2;

        return (_this$table$modules$l2 = this.table.modules.localize).bind.apply(_this$table$modules$l2, arguments);
      }
    }, {
      key: "langLocale",
      value: function langLocale() {
        var _this$table$modules$l3;

        return (_this$table$modules$l3 = this.table.modules.localize).getLocale.apply(_this$table$modules$l3, arguments);
      } //////////////////////////////////////////
      ////////// Inter Table Comms /////////////
      //////////////////////////////////////////

    }, {
      key: "commsConnections",
      value: function commsConnections() {
        var _this$table$modules$c;

        return (_this$table$modules$c = this.table.modules.comms).getConnections.apply(_this$table$modules$c, arguments);
      }
    }, {
      key: "commsSend",
      value: function commsSend() {
        var _this$table$modules$c2;

        return (_this$table$modules$c2 = this.table.modules.comms).send.apply(_this$table$modules$c2, arguments);
      } //////////////////////////////////////////
      //////////////// Layout  /////////////////
      //////////////////////////////////////////

    }, {
      key: "layoutMode",
      value: function layoutMode() {
        return this.table.modules.layout.getMode();
      }
    }, {
      key: "layoutRefresh",
      value: function layoutRefresh() {
        return this.table.modules.layout.layout();
      } //////////////////////////////////////////
      /////////////// Event Bus ////////////////
      //////////////////////////////////////////

    }, {
      key: "subscribe",
      value: function subscribe() {
        var _this$table$eventBus;

        return (_this$table$eventBus = this.table.eventBus).subscribe.apply(_this$table$eventBus, arguments);
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe() {
        var _this$table$eventBus2;

        return (_this$table$eventBus2 = this.table.eventBus).unsubscribe.apply(_this$table$eventBus2, arguments);
      }
    }, {
      key: "subscribed",
      value: function subscribed(key) {
        return this.table.eventBus.subscribed(key);
      }
    }, {
      key: "subscriptionChange",
      value: function subscriptionChange() {
        var _this$table$eventBus3;

        return (_this$table$eventBus3 = this.table.eventBus).subscriptionChange.apply(_this$table$eventBus3, arguments);
      }
    }, {
      key: "dispatch",
      value: function dispatch() {
        var _this$table$eventBus4;

        return (_this$table$eventBus4 = this.table.eventBus).dispatch.apply(_this$table$eventBus4, arguments);
      }
    }, {
      key: "chain",
      value: function chain() {
        var _this$table$eventBus5;

        return (_this$table$eventBus5 = this.table.eventBus).chain.apply(_this$table$eventBus5, arguments);
      }
    }, {
      key: "confirm",
      value: function confirm() {
        var _this$table$eventBus6;

        return (_this$table$eventBus6 = this.table.eventBus).confirm.apply(_this$table$eventBus6, arguments);
      }
    }, {
      key: "dispatchExternal",
      value: function dispatchExternal() {
        var _this$table$externalE;

        return (_this$table$externalE = this.table.externalEvents).dispatch.apply(_this$table$externalE, arguments);
      }
    }, {
      key: "subscribedExternal",
      value: function subscribedExternal(key) {
        return this.table.externalEvents.subscribed(key);
      }
    }, {
      key: "subscriptionChangeExternal",
      value: function subscriptionChangeExternal() {
        var _this$table$externalE2;

        return (_this$table$externalE2 = this.table.externalEvents).subscriptionChange.apply(_this$table$externalE2, arguments);
      } //////////////////////////////////////////
      //////////////// Options /////////////////
      //////////////////////////////////////////

    }, {
      key: "options",
      value: function options(key) {
        return this.table.options[key];
      }
    }, {
      key: "setOption",
      value: function setOption(key, value) {
        if (typeof value !== "undefined") {
          this.table.options[key] = value;
        }

        return this.table.options[key];
      } //////////////////////////////////////////
      //////////////// Modules /////////////////
      //////////////////////////////////////////

    }, {
      key: "module",
      value: function module(key) {
        return this.table.module(key);
      }
    }]);

    return CoreFeature;
  }();

  var ColumnComponent = /*#__PURE__*/function () {
    function ColumnComponent(column) {
      _classCallCheck(this, ColumnComponent);

      this._column = column;
      this.type = "ColumnComponent";
      return new Proxy(this, {
        get: function get(target, name, receiver) {
          if (typeof target[name] !== "undefined") {
            return target[name];
          } else {
            return target._column.table.componentFunctionBinder.handle("column", target._column, name);
          }
        }
      });
    }

    _createClass(ColumnComponent, [{
      key: "getElement",
      value: function getElement() {
        return this._column.getElement();
      }
    }, {
      key: "getDefinition",
      value: function getDefinition() {
        return this._column.getDefinition();
      }
    }, {
      key: "getField",
      value: function getField() {
        return this._column.getField();
      }
    }, {
      key: "getTitleDownload",
      value: function getTitleDownload() {
        return this._column.getTitleDownload();
      }
    }, {
      key: "getCells",
      value: function getCells() {
        var cells = [];

        this._column.cells.forEach(function (cell) {
          cells.push(cell.getComponent());
        });

        return cells;
      }
    }, {
      key: "isVisible",
      value: function isVisible() {
        return this._column.visible;
      }
    }, {
      key: "show",
      value: function show() {
        if (this._column.isGroup) {
          this._column.columns.forEach(function (column) {
            column.show();
          });
        } else {
          this._column.show();
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        if (this._column.isGroup) {
          this._column.columns.forEach(function (column) {
            column.hide();
          });
        } else {
          this._column.hide();
        }
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this._column.visible) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: "delete",
      value: function _delete() {
        return this._column["delete"]();
      }
    }, {
      key: "getSubColumns",
      value: function getSubColumns() {
        var output = [];

        if (this._column.columns.length) {
          this._column.columns.forEach(function (column) {
            output.push(column.getComponent());
          });
        }

        return output;
      }
    }, {
      key: "getParentColumn",
      value: function getParentColumn() {
        return this._column.parent instanceof Column ? this._column.parent.getComponent() : false;
      }
    }, {
      key: "_getSelf",
      value: function _getSelf() {
        return this._column;
      }
    }, {
      key: "scrollTo",
      value: function scrollTo() {
        return this._column.table.columnManager.scrollToColumn(this._column);
      }
    }, {
      key: "getTable",
      value: function getTable() {
        return this._column.table;
      }
    }, {
      key: "move",
      value: function move(to, after) {
        var toColumn = this._column.table.columnManager.findColumn(to);

        if (toColumn) {
          this._column.table.columnManager.moveColumn(this._column, toColumn, after);
        } else {
          console.warn("Move Error - No matching column found:", toColumn);
        }
      }
    }, {
      key: "getNextColumn",
      value: function getNextColumn() {
        var nextCol = this._column.nextColumn();

        return nextCol ? nextCol.getComponent() : false;
      }
    }, {
      key: "getPrevColumn",
      value: function getPrevColumn() {
        var prevCol = this._column.prevColumn();

        return prevCol ? prevCol.getComponent() : false;
      }
    }, {
      key: "updateDefinition",
      value: function updateDefinition(updates) {
        return this._column.updateDefinition(updates);
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        return this._column.getWidth();
      }
    }, {
      key: "setWidth",
      value: function setWidth(width) {
        var result;

        if (width === true) {
          result = this._column.reinitializeWidth(true);
        } else {
          result = this._column.setWidth(width);
        }

        this._column.table.columnManager.renderer.rerenderColumns(true);

        return result;
      }
    }]);

    return ColumnComponent;
  }();

  var defaultColumnOptions = {
    "title": undefined,
    "field": undefined,
    "columns": undefined,
    "visible": undefined,
    "hozAlign": undefined,
    "vertAlign": undefined,
    "width": undefined,
    "minWidth": 40,
    "maxWidth": undefined,
    "maxInitialWidth": undefined,
    "cssClass": undefined,
    "variableHeight": undefined,
    "headerVertical": undefined,
    "headerHozAlign": undefined,
    "editableTitle": undefined
  };

  //public cell object
  var CellComponent = /*#__PURE__*/function () {
    function CellComponent(cell) {
      _classCallCheck(this, CellComponent);

      this._cell = cell;
      return new Proxy(this, {
        get: function get(target, name, receiver) {
          if (typeof target[name] !== "undefined") {
            return target[name];
          } else {
            return target._cell.table.componentFunctionBinder.handle("cell", target._cell, name);
          }
        }
      });
    }

    _createClass(CellComponent, [{
      key: "getValue",
      value: function getValue() {
        return this._cell.getValue();
      }
    }, {
      key: "getOldValue",
      value: function getOldValue() {
        return this._cell.getOldValue();
      }
    }, {
      key: "getInitialValue",
      value: function getInitialValue() {
        return this._cell.initialValue;
      }
    }, {
      key: "getElement",
      value: function getElement() {
        return this._cell.getElement();
      }
    }, {
      key: "getRow",
      value: function getRow() {
        return this._cell.row.getComponent();
      }
    }, {
      key: "getData",
      value: function getData() {
        return this._cell.row.getData();
      }
    }, {
      key: "getField",
      value: function getField() {
        return this._cell.column.getField();
      }
    }, {
      key: "getColumn",
      value: function getColumn() {
        return this._cell.column.getComponent();
      }
    }, {
      key: "setValue",
      value: function setValue(value, mutate) {
        if (typeof mutate == "undefined") {
          mutate = true;
        }

        this._cell.setValue(value, mutate);
      }
    }, {
      key: "restoreOldValue",
      value: function restoreOldValue() {
        this._cell.setValueActual(this._cell.getOldValue());
      }
    }, {
      key: "restoreInitialValue",
      value: function restoreInitialValue() {
        this._cell.setValueActual(this._cell.initialValue);
      }
    }, {
      key: "checkHeight",
      value: function checkHeight() {
        this._cell.checkHeight();
      }
    }, {
      key: "getTable",
      value: function getTable() {
        return this._cell.table;
      }
    }, {
      key: "_getSelf",
      value: function _getSelf() {
        return this._cell;
      }
    }]);

    return CellComponent;
  }();

  var Cell = /*#__PURE__*/function (_CoreFeature) {
    _inherits(Cell, _CoreFeature);

    var _super = _createSuper(Cell);

    function Cell(column, row) {
      var _this;

      _classCallCheck(this, Cell);

      _this = _super.call(this, column.table);
      _this.table = column.table;
      _this.column = column;
      _this.row = row;
      _this.element = null;
      _this.value = null;
      _this.initialValue;
      _this.oldValue = null;
      _this.modules = {};
      _this.height = null;
      _this.width = null;
      _this.minWidth = null;
      _this.component = null;
      _this.loaded = false; //track if the cell has been added to the DOM yet

      _this.build();

      return _this;
    } //////////////// Setup Functions /////////////////
    //generate element


    _createClass(Cell, [{
      key: "build",
      value: function build() {
        this.generateElement();
        this.setWidth();

        this._configureCell();

        this.setValueActual(this.column.getFieldValue(this.row.data));
        this.initialValue = this.value;
      }
    }, {
      key: "generateElement",
      value: function generateElement() {
        this.element = document.createElement('div');
        this.element.className = "tabulator-cell";
        this.element.setAttribute("role", "gridcell");
        this.element = this.element;
      }
    }, {
      key: "_configureCell",
      value: function _configureCell() {
        var element = this.element,
            field = this.column.getField(),
            vertAligns = {
          top: "flex-start",
          bottom: "flex-end",
          middle: "center"
        },
            hozAligns = {
          left: "flex-start",
          right: "flex-end",
          center: "center"
        }; //set text alignment

        element.style.textAlign = this.column.hozAlign;

        if (this.column.vertAlign) {
          element.style.display = "inline-flex";
          element.style.alignItems = vertAligns[this.column.vertAlign] || "";

          if (this.column.hozAlign) {
            element.style.justifyContent = hozAligns[this.column.hozAlign] || "";
          }
        }

        if (field) {
          element.setAttribute("tabulator-field", field);
        } //add class to cell if needed


        if (this.column.definition.cssClass) {
          var classNames = this.column.definition.cssClass.split(" ");
          classNames.forEach(function (className) {
            element.classList.add(className);
          });
        }

        this.dispatch("cell-init", this); //hide cell if not visible

        if (!this.column.visible) {
          this.hide();
        }
      } //generate cell contents

    }, {
      key: "_generateContents",
      value: function _generateContents() {
        var _this2 = this;

        var val;
        val = this.chain("cell-format", this, null, function () {
          return _this2.element.innerHTML = _this2.value;
        });

        switch (_typeof(val)) {
          case "object":
            if (val instanceof Node) {
              //clear previous cell contents
              while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
              }

              this.element.appendChild(val);
            } else {
              this.element.innerHTML = "";

              if (val != null) {
                console.warn("Format Error - Formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", val);
              }
            }

            break;

          case "undefined":
            this.element.innerHTML = "";
            break;

          default:
            this.element.innerHTML = val;
        }
      }
    }, {
      key: "cellRendered",
      value: function cellRendered() {
        this.dispatch("cell-rendered", this);
      } //////////////////// Getters ////////////////////

    }, {
      key: "getElement",
      value: function getElement(containerOnly) {
        if (!this.loaded) {
          this.loaded = true;

          if (!containerOnly) {
            this.layoutElement();
          }
        }

        return this.element;
      }
    }, {
      key: "getValue",
      value: function getValue() {
        return this.value;
      }
    }, {
      key: "getOldValue",
      value: function getOldValue() {
        return this.oldValue;
      } //////////////////// Actions ////////////////////

    }, {
      key: "setValue",
      value: function setValue(value, mutate, force) {
        var changed = this.setValueProcessData(value, mutate, force);

        if (changed) {
          this.dispatch("cell-value-updated", this);
          this.cellRendered();

          if (this.column.definition.cellEdited) {
            this.column.definition.cellEdited.call(this.table, this.getComponent());
          }

          this.dispatchExternal("cellEdited", this.getComponent());

          if (this.subscribedExternal("dataChanged")) {
            this.dispatchExternal("dataChanged", this.table.rowManager.getData());
          }
        }
      }
    }, {
      key: "setValueProcessData",
      value: function setValueProcessData(value, mutate, force) {
        var changed = false;

        if (this.value !== value || force) {
          changed = true;

          if (mutate) {
            value = this.chain("cell-value-changing", [this, value], null, value);
          }
        }

        this.setValueActual(value);

        if (changed) {
          this.dispatch("cell-value-changed", this);
        }

        return changed;
      }
    }, {
      key: "setValueActual",
      value: function setValueActual(value) {
        this.oldValue = this.value;
        this.value = value;
        this.dispatch("cell-value-save-before", this);
        this.column.setFieldValue(this.row.data, value);
        this.dispatch("cell-value-save-after", this);

        if (this.loaded) {
          this.layoutElement();
        }
      }
    }, {
      key: "layoutElement",
      value: function layoutElement() {
        this._generateContents();

        this.dispatch("cell-layout", this);
      }
    }, {
      key: "setWidth",
      value: function setWidth() {
        this.width = this.column.width;
        this.element.style.width = this.column.widthStyled;
      }
    }, {
      key: "clearWidth",
      value: function clearWidth() {
        this.width = "";
        this.element.style.width = "";
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        return this.width || this.element.offsetWidth;
      }
    }, {
      key: "setMinWidth",
      value: function setMinWidth() {
        this.minWidth = this.column.minWidth;
        this.element.style.minWidth = this.column.minWidthStyled;
      }
    }, {
      key: "setMaxWidth",
      value: function setMaxWidth() {
        this.maxWidth = this.column.maxWidth;
        this.element.style.maxWidth = this.column.maxWidthStyled;
      }
    }, {
      key: "checkHeight",
      value: function checkHeight() {
        // var height = this.element.css("height");
        this.row.reinitializeHeight();
      }
    }, {
      key: "clearHeight",
      value: function clearHeight() {
        this.element.style.height = "";
        this.height = null;
        this.dispatch("cell-height", this, "");
      }
    }, {
      key: "setHeight",
      value: function setHeight() {
        this.height = this.row.height;
        this.element.style.height = this.row.heightStyled;
        this.dispatch("cell-height", this, this.row.heightStyled);
      }
    }, {
      key: "getHeight",
      value: function getHeight() {
        return this.height || this.element.offsetHeight;
      }
    }, {
      key: "show",
      value: function show() {
        this.element.style.display = this.column.vertAlign ? "inline-flex" : "";
      }
    }, {
      key: "hide",
      value: function hide() {
        this.element.style.display = "none";
      }
    }, {
      key: "delete",
      value: function _delete() {
        this.dispatch("cell-delete", this);

        if (!this.table.rowManager.redrawBlock && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }

        this.element = false;
        this.column.deleteCell(this);
        this.row.deleteCell(this);
        this.calcs = {};
      }
    }, {
      key: "getIndex",
      value: function getIndex() {
        return this.row.getCellIndex(this);
      } //////////////// Object Generation /////////////////

    }, {
      key: "getComponent",
      value: function getComponent() {
        if (!this.component) {
          this.component = new CellComponent(this);
        }

        return this.component;
      }
    }]);

    return Cell;
  }(CoreFeature);

  var Column = /*#__PURE__*/function (_CoreFeature) {
    _inherits(Column, _CoreFeature);

    var _super = _createSuper(Column);

    function Column(def, parent) {
      var _this;

      _classCallCheck(this, Column);

      _this = _super.call(this, parent.table);
      _this.definition = def; //column definition

      _this.parent = parent; //hold parent object

      _this.type = "column"; //type of element

      _this.columns = []; //child columns

      _this.cells = []; //cells bound to this column

      _this.element = _this.createElement(); //column header element

      _this.contentElement = false;
      _this.titleHolderElement = false;
      _this.titleElement = false;
      _this.groupElement = _this.createGroupElement(); //column group holder element

      _this.isGroup = false;
      _this.hozAlign = ""; //horizontal text alignment

      _this.vertAlign = ""; //vert text alignment
      //multi dimensional filed handling

      _this.field = "";
      _this.fieldStructure = "";
      _this.getFieldValue = "";
      _this.setFieldValue = "";
      _this.titleDownload = null;
      _this.titleFormatterRendered = false;

      _this.mapDefinitions();

      _this.setField(_this.definition.field);

      _this.modules = {}; //hold module variables;

      _this.width = null; //column width

      _this.widthStyled = ""; //column width prestyled to improve render efficiency

      _this.maxWidth = null; //column maximum width

      _this.maxWidthStyled = ""; //column maximum prestyled to improve render efficiency

      _this.maxInitialWidth = null;
      _this.minWidth = null; //column minimum width

      _this.minWidthStyled = ""; //column minimum prestyled to improve render efficiency

      _this.widthFixed = false; //user has specified a width for this column

      _this.visible = true; //default visible state

      _this.component = null; //initialize column

      if (_this.definition.columns) {
        _this.isGroup = true;

        _this.definition.columns.forEach(function (def, i) {
          var newCol = new Column(def, _assertThisInitialized(_this));

          _this.attachColumn(newCol);
        });

        _this.checkColumnVisibility();
      } else {
        parent.registerColumnField(_assertThisInitialized(_this));
      }

      _this._initialize();

      _this.bindModuleColumns();

      return _this;
    }

    _createClass(Column, [{
      key: "createElement",
      value: function createElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-col");
        el.setAttribute("role", "columnheader");
        el.setAttribute("aria-sort", "none");
        return el;
      }
    }, {
      key: "createGroupElement",
      value: function createGroupElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-col-group-cols");
        return el;
      }
    }, {
      key: "mapDefinitions",
      value: function mapDefinitions() {
        var defaults = this.table.options.columnDefaults; //map columnDefaults onto column definitions

        if (defaults) {
          for (var key in defaults) {
            if (typeof this.definition[key] === "undefined") {
              this.definition[key] = defaults[key];
            }
          }
        }

        this.definition = this.table.columnManager.optionsList.generate(Column.defaultOptionList, this.definition);
      }
    }, {
      key: "checkDefinition",
      value: function checkDefinition() {
        var _this2 = this;

        Object.keys(this.definition).forEach(function (key) {
          if (Column.defaultOptionList.indexOf(key) === -1) {
            console.warn("Invalid column definition option in '" + (_this2.field || _this2.definition.title) + "' column:", key);
          }
        });
      }
    }, {
      key: "setField",
      value: function setField(field) {
        this.field = field;
        this.fieldStructure = field ? this.table.options.nestedFieldSeparator ? field.split(this.table.options.nestedFieldSeparator) : [field] : [];
        this.getFieldValue = this.fieldStructure.length > 1 ? this._getNestedData : this._getFlatData;
        this.setFieldValue = this.fieldStructure.length > 1 ? this._setNestedData : this._setFlatData;
      } //register column position with column manager

    }, {
      key: "registerColumnPosition",
      value: function registerColumnPosition(column) {
        this.parent.registerColumnPosition(column);
      } //register column position with column manager

    }, {
      key: "registerColumnField",
      value: function registerColumnField(column) {
        this.parent.registerColumnField(column);
      } //trigger position registration

    }, {
      key: "reRegisterPosition",
      value: function reRegisterPosition() {
        if (this.isGroup) {
          this.columns.forEach(function (column) {
            column.reRegisterPosition();
          });
        } else {
          this.registerColumnPosition(this);
        }
      }
    }, {
      key: "_mapDepricatedFunctionality",
      value: function _mapDepricatedFunctionality() {//all previously deprecated functionality removed in the 5.0 release
      } //build header element

    }, {
      key: "_initialize",
      value: function _initialize() {
        var def = this.definition;

        while (this.element.firstChild) {
          this.element.removeChild(this.element.firstChild);
        }

        if (def.headerVertical) {
          this.element.classList.add("tabulator-col-vertical");

          if (def.headerVertical === "flip") {
            this.element.classList.add("tabulator-col-vertical-flip");
          }
        }

        this.contentElement = this._buildColumnHeaderContent();
        this.element.appendChild(this.contentElement);

        if (this.isGroup) {
          this._buildGroupHeader();
        } else {
          this._buildColumnHeader();
        }

        this.dispatch("column-init", this);
      } //build header element for header

    }, {
      key: "_buildColumnHeader",
      value: function _buildColumnHeader() {
        var _this3 = this;

        var def = this.definition,
            table = this.table;
        this.dispatch("column-layout", this); //set column visibility

        if (typeof def.visible != "undefined") {
          if (def.visible) {
            this.show(true);
          } else {
            this.hide(true);
          }
        } //asign additional css classes to column header


        if (def.cssClass) {
          var classeNames = def.cssClass.split(" ");
          classeNames.forEach(function (className) {
            _this3.element.classList.add(className);
          });
        }

        if (def.field) {
          this.element.setAttribute("tabulator-field", def.field);
        } //set min width if present


        this.setMinWidth(parseInt(def.minWidth));

        if (def.maxInitialWidth) {
          this.maxInitialWidth = parseInt(def.maxInitialWidth);
        }

        if (def.maxWidth) {
          this.setMaxWidth(parseInt(def.maxWidth));
        }

        this.reinitializeWidth(); //set orizontal text alignment

        this.hozAlign = this.definition.hozAlign;
        this.vertAlign = this.definition.vertAlign;
        this.titleElement.style.textAlign = this.definition.headerHozAlign;
      }
    }, {
      key: "_buildColumnHeaderContent",
      value: function _buildColumnHeaderContent() {
        var def = this.definition,
            table = this.table;
        var contentElement = document.createElement("div");
        contentElement.classList.add("tabulator-col-content");
        this.titleHolderElement = document.createElement("div");
        this.titleHolderElement.classList.add("tabulator-col-title-holder");
        contentElement.appendChild(this.titleHolderElement);
        this.titleElement = this._buildColumnHeaderTitle();
        this.titleHolderElement.appendChild(this.titleElement);
        return contentElement;
      } //build title element of column

    }, {
      key: "_buildColumnHeaderTitle",
      value: function _buildColumnHeaderTitle() {
        var _this4 = this;

        var def = this.definition;
        var titleHolderElement = document.createElement("div");
        titleHolderElement.classList.add("tabulator-col-title");

        if (def.editableTitle) {
          var titleElement = document.createElement("input");
          titleElement.classList.add("tabulator-title-editor");
          titleElement.addEventListener("click", function (e) {
            e.stopPropagation();
            titleElement.focus();
          });
          titleElement.addEventListener("change", function () {
            def.title = titleElement.value;

            _this4.dispatchExternal("columnTitleChanged", _this4.getComponent());
          });
          titleHolderElement.appendChild(titleElement);

          if (def.field) {
            this.langBind("columns|" + def.field, function (text) {
              titleElement.value = text || def.title || "&nbsp;";
            });
          } else {
            titleElement.value = def.title || "&nbsp;";
          }
        } else {
          if (def.field) {
            this.langBind("columns|" + def.field, function (text) {
              _this4._formatColumnHeaderTitle(titleHolderElement, text || def.title || "&nbsp;");
            });
          } else {
            this._formatColumnHeaderTitle(titleHolderElement, def.title || "&nbsp;");
          }
        }

        return titleHolderElement;
      }
    }, {
      key: "_formatColumnHeaderTitle",
      value: function _formatColumnHeaderTitle(el, title) {
        var contents = this.chain("column-format", [this, title, el], null, function () {
          return title;
        });

        switch (_typeof(contents)) {
          case "object":
            if (contents instanceof Node) {
              el.appendChild(contents);
            } else {
              el.innerHTML = "";
              console.warn("Format Error - Title formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", contents);
            }

            break;

          case "undefined":
            el.innerHTML = "";
            break;

          default:
            el.innerHTML = contents;
        }
      } //build header element for column group

    }, {
      key: "_buildGroupHeader",
      value: function _buildGroupHeader() {
        var _this5 = this;

        this.element.classList.add("tabulator-col-group");
        this.element.setAttribute("role", "columngroup");
        this.element.setAttribute("aria-title", this.definition.title); //asign additional css classes to column header

        if (this.definition.cssClass) {
          var classeNames = this.definition.cssClass.split(" ");
          classeNames.forEach(function (className) {
            _this5.element.classList.add(className);
          });
        }

        this.titleElement.style.textAlign = this.definition.headerHozAlign;
        this.element.appendChild(this.groupElement);
      } //flat field lookup

    }, {
      key: "_getFlatData",
      value: function _getFlatData(data) {
        return data[this.field];
      } //nested field lookup

    }, {
      key: "_getNestedData",
      value: function _getNestedData(data) {
        var dataObj = data,
            structure = this.fieldStructure,
            length = structure.length,
            output;

        for (var i = 0; i < length; i++) {
          dataObj = dataObj[structure[i]];
          output = dataObj;

          if (!dataObj) {
            break;
          }
        }

        return output;
      } //flat field set

    }, {
      key: "_setFlatData",
      value: function _setFlatData(data, value) {
        if (this.field) {
          data[this.field] = value;
        }
      } //nested field set

    }, {
      key: "_setNestedData",
      value: function _setNestedData(data, value) {
        var dataObj = data,
            structure = this.fieldStructure,
            length = structure.length;

        for (var i = 0; i < length; i++) {
          if (i == length - 1) {
            dataObj[structure[i]] = value;
          } else {
            if (!dataObj[structure[i]]) {
              if (typeof value !== "undefined") {
                dataObj[structure[i]] = {};
              } else {
                break;
              }
            }

            dataObj = dataObj[structure[i]];
          }
        }
      } //attach column to this group

    }, {
      key: "attachColumn",
      value: function attachColumn(column) {
        if (this.groupElement) {
          this.columns.push(column);
          this.groupElement.appendChild(column.getElement());
          column.columnRendered();
        } else {
          console.warn("Column Warning - Column being attached to another column instead of column group");
        }
      } //vertically align header in column

    }, {
      key: "verticalAlign",
      value: function verticalAlign(alignment, height) {
        //calculate height of column header and group holder element
        var parentHeight = this.parent.isGroup ? this.parent.getGroupElement().clientHeight : height || this.parent.getHeadersElement().clientHeight; // var parentHeight = this.parent.isGroup ? this.parent.getGroupElement().clientHeight : this.parent.getHeadersElement().clientHeight;

        this.element.style.height = parentHeight + "px";
        this.dispatch("column-height", this, this.element.style.height);

        if (this.isGroup) {
          this.groupElement.style.minHeight = parentHeight - this.contentElement.offsetHeight + "px";
        } //vertically align cell contents


        if (!this.isGroup && alignment !== "top") {
          if (alignment === "bottom") {
            this.element.style.paddingTop = this.element.clientHeight - this.contentElement.offsetHeight + "px";
          } else {
            this.element.style.paddingTop = (this.element.clientHeight - this.contentElement.offsetHeight) / 2 + "px";
          }
        }

        this.columns.forEach(function (column) {
          column.verticalAlign(alignment);
        });
      } //clear vertical alignmenet

    }, {
      key: "clearVerticalAlign",
      value: function clearVerticalAlign() {
        this.element.style.paddingTop = "";
        this.element.style.height = "";
        this.element.style.minHeight = "";
        this.groupElement.style.minHeight = "";
        this.columns.forEach(function (column) {
          column.clearVerticalAlign();
        });
        this.dispatch("column-height", this, "");
      }
    }, {
      key: "bindModuleColumns",
      value: function bindModuleColumns() {
        //check if rownum formatter is being used on a column
        if (this.definition.formatter == "rownum") {
          this.table.rowManager.rowNumColumn = this;
        }
      } //// Retreive Column Information ////
      //return column header element

    }, {
      key: "getElement",
      value: function getElement() {
        return this.element;
      } //return colunm group element

    }, {
      key: "getGroupElement",
      value: function getGroupElement() {
        return this.groupElement;
      } //return field name

    }, {
      key: "getField",
      value: function getField() {
        return this.field;
      }
    }, {
      key: "getTitleDownload",
      value: function getTitleDownload() {
        return this.titleDownload;
      } //return the first column in a group

    }, {
      key: "getFirstColumn",
      value: function getFirstColumn() {
        if (!this.isGroup) {
          return this;
        } else {
          if (this.columns.length) {
            return this.columns[0].getFirstColumn();
          } else {
            return false;
          }
        }
      } //return the last column in a group

    }, {
      key: "getLastColumn",
      value: function getLastColumn() {
        if (!this.isGroup) {
          return this;
        } else {
          if (this.columns.length) {
            return this.columns[this.columns.length - 1].getLastColumn();
          } else {
            return false;
          }
        }
      } //return all columns in a group

    }, {
      key: "getColumns",
      value: function getColumns() {
        return this.columns;
      } //return all columns in a group

    }, {
      key: "getCells",
      value: function getCells() {
        return this.cells;
      } //retreive the top column in a group of columns

    }, {
      key: "getTopColumn",
      value: function getTopColumn() {
        if (this.parent.isGroup) {
          return this.parent.getTopColumn();
        } else {
          return this;
        }
      } //return column definition object

    }, {
      key: "getDefinition",
      value: function getDefinition(updateBranches) {
        var colDefs = [];

        if (this.isGroup && updateBranches) {
          this.columns.forEach(function (column) {
            colDefs.push(column.getDefinition(true));
          });
          this.definition.columns = colDefs;
        }

        return this.definition;
      } //////////////////// Actions ////////////////////

    }, {
      key: "checkColumnVisibility",
      value: function checkColumnVisibility() {
        var visible = false;
        this.columns.forEach(function (column) {
          if (column.visible) {
            visible = true;
          }
        });

        if (visible) {
          this.show();
          this.dispatchExternal("columnVisibilityChanged", this.getComponent(), false);
        } else {
          this.hide();
        }
      } //show column

    }, {
      key: "show",
      value: function show(silent, responsiveToggle) {
        if (!this.visible) {
          this.visible = true;
          this.element.style.display = "";

          if (this.parent.isGroup) {
            this.parent.checkColumnVisibility();
          }

          this.cells.forEach(function (cell) {
            cell.show();
          });

          if (!this.isGroup && this.width === null) {
            this.reinitializeWidth();
          }

          this.table.columnManager.verticalAlignHeaders();
          this.dispatch("column-show", this, responsiveToggle);

          if (!silent) {
            this.dispatchExternal("columnVisibilityChanged", this.getComponent(), true);
          }

          if (this.parent.isGroup) {
            this.parent.matchChildWidths();
          }

          if (!this.silent) {
            this.table.columnManager.renderer.rerenderColumns();
          }
        }
      } //hide column

    }, {
      key: "hide",
      value: function hide(silent, responsiveToggle) {
        if (this.visible) {
          this.visible = false;
          this.element.style.display = "none";
          this.table.columnManager.verticalAlignHeaders();

          if (this.parent.isGroup) {
            this.parent.checkColumnVisibility();
          }

          this.cells.forEach(function (cell) {
            cell.hide();
          });
          this.dispatch("column-hide", this, responsiveToggle);

          if (!silent) {
            this.dispatchExternal("columnVisibilityChanged", this.getComponent(), false);
          }

          if (this.parent.isGroup) {
            this.parent.matchChildWidths();
          }

          if (!this.silent) {
            this.table.columnManager.renderer.rerenderColumns();
          }
        }
      }
    }, {
      key: "matchChildWidths",
      value: function matchChildWidths() {
        var childWidth = 0;

        if (this.contentElement && this.columns.length) {
          this.columns.forEach(function (column) {
            if (column.visible) {
              childWidth += column.getWidth();
            }
          });
          this.contentElement.style.maxWidth = childWidth - 1 + "px";

          if (this.parent.isGroup) {
            this.parent.matchChildWidths();
          }
        }
      }
    }, {
      key: "removeChild",
      value: function removeChild(child) {
        var index = this.columns.indexOf(child);

        if (index > -1) {
          this.columns.splice(index, 1);
        }

        if (!this.columns.length) {
          this["delete"]();
        }
      }
    }, {
      key: "setWidth",
      value: function setWidth(width) {
        this.widthFixed = true;
        this.setWidthActual(width);
      }
    }, {
      key: "setWidthActual",
      value: function setWidthActual(width) {
        if (isNaN(width)) {
          width = Math.floor(this.table.element.clientWidth / 100 * parseInt(width));
        }

        width = Math.max(this.minWidth, width);

        if (this.maxWidth) {
          width = Math.min(this.maxWidth, width);
        }

        this.width = width;
        this.widthStyled = width ? width + "px" : "";
        this.element.style.width = this.widthStyled;

        if (!this.isGroup) {
          this.cells.forEach(function (cell) {
            cell.setWidth();
          });
        }

        if (this.parent.isGroup) {
          this.parent.matchChildWidths();
        }

        this.dispatch("column-width", this);
      }
    }, {
      key: "checkCellHeights",
      value: function checkCellHeights() {
        var rows = [];
        this.cells.forEach(function (cell) {
          if (cell.row.heightInitialized) {
            if (cell.row.getElement().offsetParent !== null) {
              rows.push(cell.row);
              cell.row.clearCellHeight();
            } else {
              cell.row.heightInitialized = false;
            }
          }
        });
        rows.forEach(function (row) {
          row.calcHeight();
        });
        rows.forEach(function (row) {
          row.setCellHeight();
        });
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        var width = 0;

        if (this.isGroup) {
          this.columns.forEach(function (column) {
            if (column.visible) {
              width += column.getWidth();
            }
          });
        } else {
          width = this.width;
        }

        return width;
      }
    }, {
      key: "getHeight",
      value: function getHeight() {
        return Math.ceil(this.element.getBoundingClientRect().height);
      }
    }, {
      key: "setMinWidth",
      value: function setMinWidth(minWidth) {
        this.minWidth = minWidth;
        this.minWidthStyled = minWidth ? minWidth + "px" : "";
        this.element.style.minWidth = this.minWidthStyled;
        this.cells.forEach(function (cell) {
          cell.setMinWidth();
        });
      }
    }, {
      key: "setMaxWidth",
      value: function setMaxWidth(maxWidth) {
        this.maxWidth = maxWidth;
        this.maxWidthStyled = maxWidth ? maxWidth + "px" : "";
        this.element.style.maxWidth = this.maxWidthStyled;
        this.cells.forEach(function (cell) {
          cell.setMaxWidth();
        });
      }
    }, {
      key: "delete",
      value: function _delete() {
        var _this6 = this;

        return new Promise(function (resolve, reject) {

          if (_this6.isGroup) {
            _this6.columns.forEach(function (column) {
              column["delete"]();
            });
          }

          _this6.dispatch("column-delete", _this6);

          var cellCount = _this6.cells.length;

          for (var i = 0; i < cellCount; i++) {
            _this6.cells[0]["delete"]();
          }

          if (_this6.element.parentNode) {
            _this6.element.parentNode.removeChild(_this6.element);
          }

          _this6.element = false;
          _this6.contentElement = false;
          _this6.titleElement = false;
          _this6.groupElement = false;

          if (_this6.parent.isGroup) {
            _this6.parent.removeChild(_this6);
          }

          _this6.table.columnManager.deregisterColumn(_this6);

          _this6.table.columnManager.renderer.rerenderColumns(true);

          resolve();
        });
      }
    }, {
      key: "columnRendered",
      value: function columnRendered() {
        if (this.titleFormatterRendered) {
          this.titleFormatterRendered();
        }

        this.dispatch("column-rendered", this);
      } //////////////// Cell Management /////////////////
      //generate cell for this column

    }, {
      key: "generateCell",
      value: function generateCell(row) {
        var cell = new Cell(this, row);
        this.cells.push(cell);
        return cell;
      }
    }, {
      key: "nextColumn",
      value: function nextColumn() {
        var index = this.table.columnManager.findColumnIndex(this);
        return index > -1 ? this._nextVisibleColumn(index + 1) : false;
      }
    }, {
      key: "_nextVisibleColumn",
      value: function _nextVisibleColumn(index) {
        var column = this.table.columnManager.getColumnByIndex(index);
        return !column || column.visible ? column : this._nextVisibleColumn(index + 1);
      }
    }, {
      key: "prevColumn",
      value: function prevColumn() {
        var index = this.table.columnManager.findColumnIndex(this);
        return index > -1 ? this._prevVisibleColumn(index - 1) : false;
      }
    }, {
      key: "_prevVisibleColumn",
      value: function _prevVisibleColumn(index) {
        var column = this.table.columnManager.getColumnByIndex(index);
        return !column || column.visible ? column : this._prevVisibleColumn(index - 1);
      }
    }, {
      key: "reinitializeWidth",
      value: function reinitializeWidth(force) {
        this.widthFixed = false; //set width if present

        if (typeof this.definition.width !== "undefined" && !force) {
          // maxInitialWidth ignored here as width specified
          this.setWidth(this.definition.width);
        }

        this.dispatch("column-width-fit-before", this);
        this.fitToData(force);
        this.dispatch("column-width-fit-after", this);
      } //set column width to maximum cell width for non group columns

    }, {
      key: "fitToData",
      value: function fitToData(force) {
        if (this.isGroup) {
          return;
        }

        if (!this.widthFixed) {
          this.element.style.width = "";
          this.cells.forEach(function (cell) {
            cell.clearWidth();
          });
        }

        var maxWidth = this.element.offsetWidth;

        if (!this.width || !this.widthFixed) {
          this.cells.forEach(function (cell) {
            var width = cell.getWidth();

            if (width > maxWidth) {
              maxWidth = width;
            }
          });

          if (maxWidth) {
            var setTo = maxWidth + 1;

            if (this.maxInitialWidth && !force) {
              setTo = Math.min(setTo, this.maxInitialWidth);
            }

            this.setWidthActual(setTo);
          }
        }
      }
    }, {
      key: "updateDefinition",
      value: function updateDefinition(updates) {
        var _this7 = this;

        var definition;

        if (!this.isGroup) {
          if (!this.parent.isGroup) {
            definition = Object.assign({}, this.getDefinition());
            definition = Object.assign(definition, updates);
            return this.table.columnManager.addColumn(definition, false, this).then(function (column) {
              if (definition.field == _this7.field) {
                _this7.field = false; //cleair field name to prevent deletion of duplicate column from arrays
              }

              return _this7["delete"]().then(function () {
                return column.getComponent();
              });
            });
          } else {
            console.error("Column Update Error - The updateDefinition function is only available on ungrouped columns");
            return Promise.reject("Column Update Error - The updateDefinition function is only available on columns, not column groups");
          }
        } else {
          console.error("Column Update Error - The updateDefinition function is only available on ungrouped columns");
          return Promise.reject("Column Update Error - The updateDefinition function is only available on columns, not column groups");
        }
      }
    }, {
      key: "deleteCell",
      value: function deleteCell(cell) {
        var index = this.cells.indexOf(cell);

        if (index > -1) {
          this.cells.splice(index, 1);
        }
      } //////////////// Object Generation /////////////////

    }, {
      key: "getComponent",
      value: function getComponent() {
        if (!this.component) {
          this.component = new ColumnComponent(this);
        }

        return this.component;
      }
    }]);

    return Column;
  }(CoreFeature);

  Column.defaultOptionList = defaultColumnOptions;

  var Helpers = /*#__PURE__*/function () {
    function Helpers() {
      _classCallCheck(this, Helpers);
    }

    _createClass(Helpers, null, [{
      key: "elVisible",
      value: function elVisible(el) {
        return !(el.offsetWidth <= 0 && el.offsetHeight <= 0);
      }
    }, {
      key: "elOffset",
      value: function elOffset(el) {
        var box = el.getBoundingClientRect();
        return {
          top: box.top + window.pageYOffset - document.documentElement.clientTop,
          left: box.left + window.pageXOffset - document.documentElement.clientLeft
        };
      }
    }, {
      key: "deepClone",
      value: function deepClone(obj, clone) {
        var _this = this;

        var list = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var objectProto = {}.__proto__,
            arrayProto = [].__proto__;

        if (!clone) {
          clone = Object.assign(Array.isArray(obj) ? [] : {}, obj);
        }

        var _loop = function _loop() {
          var subject = obj[i],
              match = void 0,
              copy = void 0;

          if (subject != null && _typeof(subject) === "object" && (subject.__proto__ === objectProto || subject.__proto__ === arrayProto)) {
            match = list.findIndex(function (item) {
              return item.subject === subject;
            });

            if (match > -1) {
              clone[i] = list[match].copy;
            } else {
              copy = Object.assign(Array.isArray(subject) ? [] : {}, subject);
              list.unshift({
                subject: subject,
                copy: copy
              });
              clone[i] = _this.deepClone(subject, copy, list);
            }
          }
        };

        for (var i in obj) {
          _loop();
        }

        return clone;
      }
    }]);

    return Helpers;
  }();

  var OptionsList = /*#__PURE__*/function () {
    function OptionsList(table, msgType) {
      var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, OptionsList);

      this.table = table;
      this.msgType = msgType;
      this.registeredDefaults = Object.assign({}, defaults);
    }

    _createClass(OptionsList, [{
      key: "register",
      value: function register(option, value) {
        this.registeredDefaults[option] = value;
      }
    }, {
      key: "generate",
      value: function generate(defaultOptions) {
        var userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var output = Object.assign({}, this.registeredDefaults);
        Object.assign(output, defaultOptions);

        if (userOptions.debugInvalidOptions !== false || this.table.options.debugInvalidOptions) {
          for (var key in userOptions) {
            if (!output.hasOwnProperty(key)) {
              console.warn("Invalid " + this.msgType + " option:", key);
            }
          }
        }

        for (var key in output) {
          if (key in userOptions) {
            output[key] = userOptions[key];
          } else {
            if (Array.isArray(output[key])) {
              output[key] = Object.assign([], output[key]);
            } else if (_typeof(output[key]) === "object" && output[key] !== null) {
              output[key] = Object.assign({}, output[key]);
            } else if (typeof output[key] === "undefined") {
              delete output[key];
            }
          }
        }

        return output;
      }
    }]);

    return OptionsList;
  }();

  var Renderer = /*#__PURE__*/function (_CoreFeature) {
    _inherits(Renderer, _CoreFeature);

    var _super = _createSuper(Renderer);

    function Renderer(table) {
      var _this;

      _classCallCheck(this, Renderer);

      _this = _super.call(this, table);
      _this.elementVertical = table.rowManager.element;
      _this.elementHorizontal = table.columnManager.element;
      _this.tableElement = table.rowManager.tableElement;
      _this.verticalFillMode = "fit"; // used by row manager to determin how to size the render area ("fit" - fits container to the contents, "fill" - fills the contianer without resizing it)

      return _this;
    } ///////////////////////////////////
    /////// Internal Bindings /////////
    ///////////////////////////////////


    _createClass(Renderer, [{
      key: "initialize",
      value: function initialize() {//initialize core functionality
      }
    }, {
      key: "clearRows",
      value: function clearRows() {//clear down existing rows layout
      }
    }, {
      key: "clearColumns",
      value: function clearColumns() {//clear down existing columns layout
      }
    }, {
      key: "reinitializeColumnWidths",
      value: function reinitializeColumnWidths(columns) {//resize columns to fit data
      }
    }, {
      key: "renderRows",
      value: function renderRows() {//render rows from a clean slate
      }
    }, {
      key: "renderColumns",
      value: function renderColumns() {//render columns from a clean slate
      }
    }, {
      key: "rerenderRows",
      value: function rerenderRows(callback) {
        // rerender rows and keep position
        if (callback) {
          callback();
        }
      }
    }, {
      key: "rerenderColumns",
      value: function rerenderColumns(update, blockRedraw) {//rerender columns
      }
    }, {
      key: "renderRowCells",
      value: function renderRowCells(row) {//render the cells in a row
      }
    }, {
      key: "rerenderRowCells",
      value: function rerenderRowCells(row, force) {//rerender the cells in a row
      }
    }, {
      key: "scrollColumns",
      value: function scrollColumns(left, dir) {//handle horizontal scrolling
      }
    }, {
      key: "scrollRows",
      value: function scrollRows(top, dir) {//handle vertical scolling
      }
    }, {
      key: "resize",
      value: function resize() {//container has rezied, carry out any needed recalculations (DO NOT RERENDER IN THIS FUNCTION)
      }
    }, {
      key: "scrollToRow",
      value: function scrollToRow(row) {//scroll to a specific row
      }
    }, {
      key: "scrollToRowNearestTop",
      value: function scrollToRowNearestTop(row) {//determine weather the row is nearest the top or bottom of the table, retur true for top or false for bottom
      }
    }, {
      key: "visibleRows",
      value: function visibleRows(includingBuffer) {
        //return the visible rows
        return [];
      } ///////////////////////////////////
      //////// Helper Functions /////////
      ///////////////////////////////////

    }, {
      key: "rows",
      value: function rows() {
        return this.table.rowManager.getDisplayRows();
      }
    }, {
      key: "styleRow",
      value: function styleRow(row, index) {
        var rowEl = row.getElement();

        if (index % 2) {
          rowEl.classList.add("tabulator-row-even");
          rowEl.classList.remove("tabulator-row-odd");
        } else {
          rowEl.classList.add("tabulator-row-odd");
          rowEl.classList.remove("tabulator-row-even");
        }
      } ///////////////////////////////////
      /////// External Triggers /////////
      /////// (DO NOT OVERRIDE) /////////
      ///////////////////////////////////

    }, {
      key: "clear",
      value: function clear() {
        //clear down existing layout
        this.clearRows();
        this.clearColumns();
      }
    }, {
      key: "render",
      value: function render() {
        //render from a clean slate
        this.renderRows();
        this.renderColumns();
      }
    }, {
      key: "rerender",
      value: function rerender(callback) {
        // rerender and keep position
        this.rerenderRows();
        this.rerenderColumns();
      }
    }, {
      key: "scrollToRowPosition",
      value: function scrollToRowPosition(row, position, ifVisible) {
        var _this2 = this;

        var rowIndex = this.rows().indexOf(row),
            rowEl = row.getElement(),
            offset = 0;
        return new Promise(function (resolve, reject) {
          if (rowIndex > -1) {
            if (typeof ifVisible === "undefined") {
              ifVisible = _this2.table.options.scrollToRowIfVisible;
            } //check row visibility


            if (!ifVisible) {
              if (Helpers.elVisible(rowEl)) {
                offset = Helpers.elOffset(rowEl).top - Helpers.elOffset(_this2.elementVertical).top;

                if (offset > 0 && offset < _this2.elementVertical.clientHeight - rowEl.offsetHeight) {
                  resolve();
                  return false;
                }
              }
            }

            if (typeof position === "undefined") {
              position = _this2.table.options.scrollToRowPosition;
            }

            if (position === "nearest") {
              position = _this2.scrollToRowNearestTop(row) ? "top" : "bottom";
            } //scroll to row


            _this2.scrollToRow(row); //align to correct position


            switch (position) {
              case "middle":
              case "center":
                if (_this2.elementVertical.scrollHeight - _this2.elementVertical.scrollTop == _this2.elementVertical.clientHeight) {
                  _this2.elementVertical.scrollTop = _this2.elementVertical.scrollTop + (rowEl.offsetTop - _this2.elementVertical.scrollTop) - (_this2.elementVertical.scrollHeight - rowEl.offsetTop) / 2;
                } else {
                  _this2.elementVertical.scrollTop = _this2.elementVertical.scrollTop - _this2.elementVertical.clientHeight / 2;
                }

                break;

              case "bottom":
                if (_this2.elementVertical.scrollHeight - _this2.elementVertical.scrollTop == _this2.elementVertical.clientHeight) {
                  _this2.elementVertical.scrollTop = _this2.elementVertical.scrollTop - (_this2.elementVertical.scrollHeight - rowEl.offsetTop) + rowEl.offsetHeight;
                } else {
                  _this2.elementVertical.scrollTop = _this2.elementVertical.scrollTop - _this2.elementVertical.clientHeight + rowEl.offsetHeight;
                }

                break;

              case "top":
                _this2.elementVertical.scrollTop = rowEl.offsetTop;
                break;
            }

            resolve();
          } else {
            console.warn("Scroll Error - Row not visible");
            reject("Scroll Error - Row not visible");
          }
        });
      }
    }]);

    return Renderer;
  }(CoreFeature);

  var BaiscHorizontal = /*#__PURE__*/function (_Renderer) {
    _inherits(BaiscHorizontal, _Renderer);

    var _super = _createSuper(BaiscHorizontal);

    function BaiscHorizontal(table) {
      _classCallCheck(this, BaiscHorizontal);

      return _super.call(this, table);
    }

    _createClass(BaiscHorizontal, [{
      key: "renderRowCells",
      value: function renderRowCells(row) {
        row.cells.forEach(function (cell) {
          row.element.appendChild(cell.getElement());
          cell.cellRendered();
        });
      }
    }, {
      key: "reinitializeColumnWidths",
      value: function reinitializeColumnWidths(columns) {
        columns.forEach(function (column) {
          column.reinitializeWidth();
        });
      }
    }]);

    return BaiscHorizontal;
  }(Renderer);

  var VirtualDomHorizontal = /*#__PURE__*/function (_Renderer) {
    _inherits(VirtualDomHorizontal, _Renderer);

    var _super = _createSuper(VirtualDomHorizontal);

    function VirtualDomHorizontal(table) {
      var _this;

      _classCallCheck(this, VirtualDomHorizontal);

      _this = _super.call(this, table);
      _this.leftCol = 0;
      _this.rightCol = 0;
      _this.scrollLeft = 0;
      _this.vDomScrollPosLeft = 0;
      _this.vDomScrollPosRight = 0;
      _this.vDomPadLeft = 0;
      _this.vDomPadRight = 0;
      _this.fitDataColAvg = 0;
      _this.windowBuffer = 200; //pixel margin to make column visible before it is shown on screen

      _this.visibleRows = null;
      _this.initialized = false;
      _this.isFitData = false;
      _this.columns = [];
      return _this;
    }

    _createClass(VirtualDomHorizontal, [{
      key: "initialize",
      value: function initialize() {
        this.compatibilityCheck();
        this.layoutCheck();
        this.vertScrollListen();
      }
    }, {
      key: "compatibilityCheck",
      value: function compatibilityCheck() {
        var columns = this.options("columns"),
            frozen = false,
            ok = true;

        if (this.options("layout") == "fitDataTable") {
          console.warn("Horizontal Virtual DOM is not compatible with fitDataTable layout mode");
          ok = false;
        }

        if (this.options("responsiveLayout")) {
          console.warn("Horizontal Virtual DOM is not compatible with responsive columns");
          ok = false;
        }

        if (this.options("rtl")) {
          console.warn("Horizontal Virtual DOM is not currently compatible with RTL text direction");
          ok = false;
        }

        if (columns) {
          frozen = columns.find(function (col) {
            return col.frozen;
          });

          if (frozen) {
            console.warn("Horizontal Virtual DOM is not compatible with frozen columns");
            ok = false;
          }
        } // if(!ok){
        // 	options.virtualDomHoz = false;
        // }


        return ok;
      }
    }, {
      key: "layoutCheck",
      value: function layoutCheck() {
        this.isFitData = this.options("layout").startsWith('fitData');
      }
    }, {
      key: "vertScrollListen",
      value: function vertScrollListen() {
        this.subscribe("scroll-vertical", this.clearVisRowCache.bind(this));
        this.subscribe("data-refreshed", this.clearVisRowCache.bind(this));
      }
    }, {
      key: "clearVisRowCache",
      value: function clearVisRowCache() {
        this.visibleRows = null;
      } //////////////////////////////////////
      ///////// Public Functions ///////////
      //////////////////////////////////////

    }, {
      key: "renderColumns",
      value: function renderColumns(row, force) {
        this.dataChange();
      }
    }, {
      key: "scrollColumns",
      value: function scrollColumns(left, dir) {
        if (this.scrollLeft != left) {
          this.scrollLeft = left;
          this.scroll(left - (this.vDomScrollPosLeft + this.windowBuffer));
        }
      }
    }, {
      key: "calcWindowBuffer",
      value: function calcWindowBuffer() {
        var buffer = this.elementVertical.clientWidth;
        this.table.columnManager.columnsByIndex.forEach(function (column) {
          if (column.visible) {
            var width = column.getWidth();

            if (width > buffer) {
              buffer = width;
            }
          }
        });
        this.windowBuffer = buffer * 2;
      }
    }, {
      key: "rerenderColumns",
      value: function rerenderColumns(update, blockRedraw) {
        var _this2 = this;

        var old = {
          cols: this.columns,
          leftCol: this.leftCol,
          rightCol: this.rightCol
        },
            colPos = 0;

        if (update && !this.initialized) {
          return;
        }

        this.clear();
        this.calcWindowBuffer();
        this.scrollLeft = this.elementVertical.scrollLeft;
        this.vDomScrollPosLeft = this.scrollLeft - this.windowBuffer;
        this.vDomScrollPosRight = this.scrollLeft + this.elementVertical.clientWidth + this.windowBuffer;
        this.table.columnManager.columnsByIndex.forEach(function (column) {
          var config = {};

          if (column.visible) {
            var width = column.getWidth();
            config.leftPos = colPos;
            config.rightPos = colPos + width;
            config.width = width;

            if (_this2.isFitData) {
              config.fitDataCheck = column.modules.vdomHoz ? column.modules.vdomHoz.fitDataCheck : true;
            }

            if (colPos + width > _this2.vDomScrollPosLeft && colPos < _this2.vDomScrollPosRight) {
              //column is visible
              if (_this2.leftCol == -1) {
                _this2.leftCol = _this2.columns.length;
                _this2.vDomPadLeft = colPos;
              }

              _this2.rightCol = _this2.columns.length;
            } else {
              // column is hidden
              if (_this2.leftCol !== -1) {
                _this2.vDomPadRight += width;
              }
            }

            _this2.columns.push(column);

            column.modules.vdomHoz = config;
            colPos += width;
          }
        });
        this.tableElement.style.paddingLeft = this.vDomPadLeft + "px";
        this.tableElement.style.paddingRight = this.vDomPadRight + "px";
        this.initialized = true;

        if (!blockRedraw) {
          if (!update || this.reinitChanged(old)) {
            this.reinitializeRows();
          }
        }

        this.elementVertical.scrollLeft = this.scrollLeft;
      }
    }, {
      key: "renderRowCells",
      value: function renderRowCells(row) {
        if (this.initialized) {
          this.initializeRow(row);
        } else {
          row.cells.forEach(function (cell) {
            row.element.appendChild(cell.getElement());
            cell.cellRendered();
          });
        }
      }
    }, {
      key: "rerenderRowCells",
      value: function rerenderRowCells(row, force) {
        this.reinitializeRow(row, force);
      }
    }, {
      key: "reinitializeColumnWidths",
      value: function reinitializeColumnWidths(columns) {
        for (var i = this.leftCol; i <= this.rightCol; i++) {
          this.columns[i].reinitializeWidth();
        }
      } //////////////////////////////////////
      //////// Internal Rendering //////////
      //////////////////////////////////////

    }, {
      key: "deinitialize",
      value: function deinitialize() {
        this.initialized = false;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.columns = [];
        this.leftCol = -1;
        this.rightCol = 0;
        this.vDomScrollPosLeft = 0;
        this.vDomScrollPosRight = 0;
        this.vDomPadLeft = 0;
        this.vDomPadRight = 0;
      }
    }, {
      key: "dataChange",
      value: function dataChange() {
        var _this3 = this;

        var change = false,
            collsWidth = 0,
            colEnd = 0,
            row,
            rowEl;

        if (this.isFitData) {
          this.table.columnManager.columnsByIndex.forEach(function (column) {
            if (!column.definition.width && column.visible) {
              change = true;
            }
          });

          if (change) {
            if (change && this.table.rowManager.getDisplayRows().length) {
              this.vDomScrollPosRight = this.scrollLeft + this.elementVertical.clientWidth + this.windowBuffer;
              var row = this.chain("rows-sample", [1], [], function () {
                return _this3.table.rowManager.getDisplayRows();
              })[0];

              if (row) {
                rowEl = row.getElement();
                row.generateCells();
                this.tableElement.appendChild(rowEl);

                for (var colEnd = 0; colEnd < row.cells.length; colEnd++) {
                  var cell = row.cells[colEnd];
                  rowEl.appendChild(cell.getElement());
                  cell.column.reinitializeWidth();
                  collsWidth += cell.column.getWidth(); // if(collsWidth > this.vDomScrollPosRight){
                  // 	break;
                  // }
                }

                rowEl.parentNode.removeChild(rowEl); // this.fitDataColAvg = Math.floor(collsWidth / (colEnd + 1));
                // for(colEnd; colEnd < this.table.columnManager.columnsByIndex.length; colEnd++){
                // 	this.table.columnManager.columnsByIndex[colEnd].setWidth(this.fitDataColAvg);
                // }

                this.rerenderColumns(false, true);
              }
            }
          }
        } else {
          if (this.options("layout") === "fitColumns") {
            this.layoutRefresh();
            this.rerenderColumns(false, true);
          }
        }
      }
    }, {
      key: "reinitChanged",
      value: function reinitChanged(old) {
        var _this4 = this;

        var match = true;

        if (old.cols.length !== this.columns.length || old.leftCol !== this.leftCol || old.rightCol !== this.rightCol) {
          return true;
        }

        old.cols.forEach(function (col, i) {
          if (col !== _this4.columns[i]) {
            match = false;
          }
        });
        return !match;
      }
    }, {
      key: "reinitializeRows",
      value: function reinitializeRows() {
        var _this5 = this;

        var rows = this.getVisibleRows();
        rows.forEach(function (row) {
          _this5.reinitializeRow(row, true);
        });
      }
    }, {
      key: "getVisibleRows",
      value: function getVisibleRows() {
        if (!this.visibleRows) {
          this.visibleRows = this.table.rowManager.getVisibleRows();
        }

        return this.visibleRows;
      }
    }, {
      key: "scroll",
      value: function scroll(diff) {
        this.vDomScrollPosLeft += diff;
        this.vDomScrollPosRight += diff;

        if (Math.abs(diff) > this.windowBuffer / 2) {
          this.rerenderColumns();
        } else {
          if (diff > 0) {
            //scroll right
            this.addColRight();
            this.removeColLeft();
          } else {
            //scroll left
            this.addColLeft();
            this.removeColRight();
          }
        }
      }
    }, {
      key: "colPositionAdjust",
      value: function colPositionAdjust(start, end, diff) {
        for (var i = start; i < end; i++) {
          var column = this.columns[i];
          column.modules.vdomHoz.leftPos += diff;
          column.modules.vdomHoz.rightPos += diff;
        }
      }
    }, {
      key: "addColRight",
      value: function addColRight() {
        var _this6 = this;

        var changes = false;

        var _loop = function _loop() {
          var column = _this6.columns[_this6.rightCol + 1];

          if (column) {
            if (column.modules.vdomHoz.leftPos <= _this6.vDomScrollPosRight) {
              changes = true;

              _this6.getVisibleRows().forEach(function (row) {
                if (row.type !== "group") {
                  var cell = row.getCell(column);
                  row.getElement().appendChild(cell.getElement());
                  cell.cellRendered();
                }
              });

              _this6.fitDataColActualWidthCheck(column);

              _this6.rightCol++; // Don't move this below the >= check below

              if (_this6.rightCol >= _this6.columns.length - 1) {
                _this6.vDomPadRight = 0;
              } else {
                _this6.vDomPadRight -= column.getWidth();
              }
            } else {
              return "break";
            }
          } else {
            return "break";
          }
        };

        while (true) {
          var _ret = _loop();

          if (_ret === "break") break;
        }

        if (changes) {
          this.tableElement.style.paddingRight = this.vDomPadRight + "px";
        }
      }
    }, {
      key: "addColLeft",
      value: function addColLeft() {
        var _this7 = this;

        var changes = false;

        var _loop2 = function _loop2() {
          var column = _this7.columns[_this7.leftCol - 1];

          if (column) {
            if (column.modules.vdomHoz.rightPos >= _this7.vDomScrollPosLeft) {
              changes = true;

              _this7.getVisibleRows().forEach(function (row) {
                if (row.type !== "group") {
                  var cell = row.getCell(column);
                  row.getElement().prepend(cell.getElement());
                  cell.cellRendered();
                }
              });

              _this7.leftCol--; // don't move this below the <= check below

              if (_this7.leftCol <= 0) {
                // replicating logic in addColRight
                _this7.vDomPadLeft = 0;
              } else {
                _this7.vDomPadLeft -= column.getWidth();
              }

              var diff = _this7.fitDataColActualWidthCheck(column);

              if (diff) {
                _this7.scrollLeft = _this7.elementVertical.scrollLeft = _this7.elementVertical.scrollLeft + diff;
                _this7.vDomPadRight -= diff;
              }
            } else {
              return "break";
            }
          } else {
            return "break";
          }
        };

        while (true) {
          var _ret2 = _loop2();

          if (_ret2 === "break") break;
        }

        if (changes) {
          this.tableElement.style.paddingLeft = this.vDomPadLeft + "px";
        }
      }
    }, {
      key: "removeColRight",
      value: function removeColRight() {
        var _this8 = this;

        var changes = false;

        var _loop3 = function _loop3() {
          var column = _this8.columns[_this8.rightCol];

          if (column) {
            if (column.modules.vdomHoz.leftPos > _this8.vDomScrollPosRight) {
              changes = true;

              _this8.getVisibleRows().forEach(function (row) {
                if (row.type !== "group") {
                  var cell = row.getCell(column);

                  try {
                    row.getElement().removeChild(cell.getElement());
                  } catch (ex) {
                    console.warn("Could not removeColRight", ex.message);
                  }
                }
              });

              _this8.vDomPadRight += column.getWidth();
              _this8.rightCol--;
            } else {
              return "break";
            }
          } else {
            return "break";
          }
        };

        while (true) {
          var _ret3 = _loop3();

          if (_ret3 === "break") break;
        }

        if (changes) {
          this.tableElement.style.paddingRight = this.vDomPadRight + "px";
        }
      }
    }, {
      key: "removeColLeft",
      value: function removeColLeft() {
        var _this9 = this;

        var changes = false;

        var _loop4 = function _loop4() {
          var column = _this9.columns[_this9.leftCol];

          if (column) {
            if (column.modules.vdomHoz.rightPos < _this9.vDomScrollPosLeft) {
              changes = true;

              _this9.getVisibleRows().forEach(function (row) {
                if (row.type !== "group") {
                  var cell = row.getCell(column);

                  try {
                    row.getElement().removeChild(cell.getElement());
                  } catch (ex) {
                    console.warn("Could not removeColLeft", ex.message);
                  }
                }
              });

              _this9.vDomPadLeft += column.getWidth();
              _this9.leftCol++;
            } else {
              return "break";
            }
          } else {
            return "break";
          }
        };

        while (true) {
          var _ret4 = _loop4();

          if (_ret4 === "break") break;
        }

        if (changes) {
          this.tableElement.style.paddingLeft = this.vDomPadLeft + "px";
        }
      }
    }, {
      key: "fitDataColActualWidthCheck",
      value: function fitDataColActualWidthCheck(column) {
        var newWidth, widthDiff;

        if (column.modules.vdomHoz.fitDataCheck) {
          column.reinitializeWidth();
          newWidth = column.getWidth();
          widthDiff = newWidth - column.modules.vdomHoz.width;

          if (widthDiff) {
            column.modules.vdomHoz.rightPos += widthDiff;
            column.modules.vdomHoz.width = newWidth;
            this.colPositionAdjust(this.columns.indexOf(column) + 1, this.columns.length, widthDiff);
          }

          column.modules.vdomHoz.fitDataCheck = false;
        }

        return widthDiff;
      }
    }, {
      key: "initializeRow",
      value: function initializeRow(row) {
        if (row.type !== "group") {
          row.modules.vdomHoz = {
            leftCol: this.leftCol,
            rightCol: this.rightCol
          };

          for (var i = this.leftCol; i <= this.rightCol; i++) {
            var column = this.columns[i];

            if (column && column.visible) {
              var cell = row.getCell(column);
              row.getElement().appendChild(cell.getElement());
              cell.cellRendered();
            }
          }
        }
      }
    }, {
      key: "reinitializeRow",
      value: function reinitializeRow(row, force) {
        if (row.type !== "group") {
          if (force || !row.modules.vdomHoz || row.modules.vdomHoz.leftCol !== this.leftCol || row.modules.vdomHoz.rightCol !== this.rightCol) {
            var rowEl = row.getElement();

            while (rowEl.firstChild) {
              rowEl.removeChild(rowEl.firstChild);
            }

            this.initializeRow(row);
          }
        }
      }
    }]);

    return VirtualDomHorizontal;
  }(Renderer);

  var ColumnManager = /*#__PURE__*/function (_CoreFeature) {
    _inherits(ColumnManager, _CoreFeature);

    var _super = _createSuper(ColumnManager);

    function ColumnManager(table) {
      var _this;

      _classCallCheck(this, ColumnManager);

      _this = _super.call(this, table);
      _this.blockHozScrollEvent = false;
      _this.headersElement = null;
      _this.element = null; //containing element

      _this.columns = []; // column definition object

      _this.columnsByIndex = []; //columns by index

      _this.columnsByField = {}; //columns by field

      _this.scrollLeft = 0;
      _this.optionsList = new OptionsList(_this.table, "column definition", defaultColumnOptions);
      _this.renderer = null;
      return _this;
    } ////////////// Setup Functions /////////////////


    _createClass(ColumnManager, [{
      key: "initialize",
      value: function initialize() {
        this.initializeRenderer();
        this.headersElement = this.createHeadersElement();
        this.element = this.createHeaderElement();
        this.element.insertBefore(this.headersElement, this.element.firstChild);
        this.subscribe("scroll-horizontal", this.scrollHorizontal.bind(this));
      }
    }, {
      key: "initializeRenderer",
      value: function initializeRenderer() {
        var renderClass;
        var renderers = {
          "virtual": VirtualDomHorizontal,
          "basic": BaiscHorizontal
        };

        if (typeof this.table.options.renderHorizontal === "string") {
          renderClass = renderers[this.table.options.renderHorizontal];
        } else {
          renderClass = this.table.options.renderHorizontal;
        }

        if (renderClass) {
          this.renderer = new renderClass(this.table, this.element, this.tableElement);
          this.renderer.initialize();
        } else {
          console.error("Unable to find matching renderer:", table.options.renderHorizontal);
        }
      }
    }, {
      key: "createHeadersElement",
      value: function createHeadersElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-headers");
        el.setAttribute("role", "row");
        return el;
      }
    }, {
      key: "createHeaderElement",
      value: function createHeaderElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-header");
        el.setAttribute("role", "rowgroup");

        if (!this.table.options.headerVisible) {
          el.classList.add("tabulator-header-hidden");
        }

        return el;
      } //return containing element

    }, {
      key: "getElement",
      value: function getElement() {
        return this.element;
      } //return header containing element

    }, {
      key: "getHeadersElement",
      value: function getHeadersElement() {
        return this.headersElement;
      } //scroll horizontally to match table body

    }, {
      key: "scrollHorizontal",
      value: function scrollHorizontal(left) {
        var hozAdjust = 0,
            scrollWidth = this.element.scrollWidth - this.table.element.clientWidth; // this.tempScrollBlock();

        this.element.scrollLeft = left; //adjust for vertical scrollbar moving table when present

        if (left > scrollWidth) {
          hozAdjust = left - scrollWidth;
          this.element.style.marginLeft = -hozAdjust + "px";
        } else {
          this.element.style.marginLeft = 0;
        }

        this.scrollLeft = left;
        this.renderer.scrollColumns(left);
      } ///////////// Column Setup Functions /////////////

    }, {
      key: "generateColumnsFromRowData",
      value: function generateColumnsFromRowData(data) {
        var cols = [],
            definitions = this.table.options.autoColumnsDefinitions,
            row,
            sorter;

        if (data && data.length) {
          row = data[0];

          for (var key in row) {
            var col = {
              field: key,
              title: key
            };
            var value = row[key];

            switch (_typeof(value)) {
              case "undefined":
                sorter = "string";
                break;

              case "boolean":
                sorter = "boolean";
                break;

              case "object":
                if (Array.isArray(value)) {
                  sorter = "array";
                } else {
                  sorter = "string";
                }

                break;

              default:
                if (!isNaN(value) && value !== "") {
                  sorter = "number";
                } else {
                  if (value.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)) {
                    sorter = "alphanum";
                  } else {
                    sorter = "string";
                  }
                }

                break;
            }

            col.sorter = sorter;
            cols.push(col);
          }

          if (definitions) {
            switch (_typeof(definitions)) {
              case "function":
                this.table.options.columns = definitions.call(this.table, cols);
                break;

              case "object":
                if (Array.isArray(definitions)) {
                  cols.forEach(function (col) {
                    var match = definitions.find(function (def) {
                      return def.field === col.field;
                    });

                    if (match) {
                      Object.assign(col, match);
                    }
                  });
                } else {
                  cols.forEach(function (col) {
                    if (definitions[col.field]) {
                      Object.assign(col, definitions[col.field]);
                    }
                  });
                }

                this.table.options.columns = cols;
                break;
            }
          } else {
            this.table.options.columns = cols;
          }

          this.setColumns(this.table.options.columns);
        }
      }
    }, {
      key: "setColumns",
      value: function setColumns(cols, row) {
        var _this2 = this;

        while (this.headersElement.firstChild) {
          this.headersElement.removeChild(this.headersElement.firstChild);
        }

        this.columns = [];
        this.columnsByIndex = [];
        this.columnsByField = {};
        this.dispatch("columns-loading");
        cols.forEach(function (def, i) {
          _this2._addColumn(def);
        });

        this._reIndexColumns();

        this.dispatch("columns-loaded");
        this.renderer.rerenderColumns(false, true);
        this.redraw(true);
      }
    }, {
      key: "_addColumn",
      value: function _addColumn(definition, before, nextToColumn) {
        var column = new Column(definition, this),
            colEl = column.getElement(),
            index = nextToColumn ? this.findColumnIndex(nextToColumn) : nextToColumn;

        if (nextToColumn && index > -1) {
          var topColumn = nextToColumn.getTopColumn();
          var parentIndex = this.columns.indexOf(topColumn);
          var nextEl = topColumn.getElement();

          if (before) {
            this.columns.splice(parentIndex, 0, column);
            nextEl.parentNode.insertBefore(colEl, nextEl);
          } else {
            this.columns.splice(parentIndex + 1, 0, column);
            nextEl.parentNode.insertBefore(colEl, nextEl.nextSibling);
          }
        } else {
          if (before) {
            this.columns.unshift(column);
            this.headersElement.insertBefore(column.getElement(), this.headersElement.firstChild);
          } else {
            this.columns.push(column);
            this.headersElement.appendChild(column.getElement());
          }
        }

        column.columnRendered();
        return column;
      }
    }, {
      key: "registerColumnField",
      value: function registerColumnField(col) {
        if (col.definition.field) {
          this.columnsByField[col.definition.field] = col;
        }
      }
    }, {
      key: "registerColumnPosition",
      value: function registerColumnPosition(col) {
        this.columnsByIndex.push(col);
      }
    }, {
      key: "_reIndexColumns",
      value: function _reIndexColumns() {
        this.columnsByIndex = [];
        this.columns.forEach(function (column) {
          column.reRegisterPosition();
        });
      } //ensure column headers take up the correct amount of space in column groups

    }, {
      key: "verticalAlignHeaders",
      value: function verticalAlignHeaders() {
        var _this3 = this;

        var minHeight = 0;
        this.columns.forEach(function (column) {
          var height;
          column.clearVerticalAlign();
          height = column.getHeight();

          if (height > minHeight) {
            minHeight = height;
          }
        });
        this.columns.forEach(function (column) {
          column.verticalAlign(_this3.table.options.columnHeaderVertAlign, minHeight);
        });
        this.table.rowManager.adjustTableSize();
      } //////////////// Column Details /////////////////

    }, {
      key: "findColumn",
      value: function findColumn(subject) {
        if (_typeof(subject) == "object") {
          if (subject instanceof Column) {
            //subject is column element
            return subject;
          } else if (subject instanceof ColumnComponent) {
            //subject is public column component
            return subject._getSelf() || false;
          } else if (typeof HTMLElement !== "undefined" && subject instanceof HTMLElement) {
            //subject is a HTML element of the column header
            var match = this.columns.find(function (column) {
              return column.element === subject;
            });
            return match || false;
          }
        } else {
          //subject should be treated as the field name of the column
          return this.columnsByField[subject] || false;
        } //catch all for any other type of input


        return false;
      }
    }, {
      key: "getColumnByField",
      value: function getColumnByField(field) {
        return this.columnsByField[field];
      }
    }, {
      key: "getColumnsByFieldRoot",
      value: function getColumnsByFieldRoot(root) {
        var _this4 = this;

        var matches = [];
        Object.keys(this.columnsByField).forEach(function (field) {
          var fieldRoot = field.split(".")[0];

          if (fieldRoot === root) {
            matches.push(_this4.columnsByField[field]);
          }
        });
        return matches;
      }
    }, {
      key: "getColumnByIndex",
      value: function getColumnByIndex(index) {
        return this.columnsByIndex[index];
      }
    }, {
      key: "getFirstVisibleColumn",
      value: function getFirstVisibleColumn(index) {
        var index = this.columnsByIndex.findIndex(function (col) {
          return col.visible;
        });
        return index > -1 ? this.columnsByIndex[index] : false;
      }
    }, {
      key: "getColumns",
      value: function getColumns() {
        return this.columns;
      }
    }, {
      key: "findColumnIndex",
      value: function findColumnIndex(column) {
        return this.columnsByIndex.findIndex(function (col) {
          return column === col;
        });
      } //return all columns that are not groups

    }, {
      key: "getRealColumns",
      value: function getRealColumns() {
        return this.columnsByIndex;
      } //travers across columns and call action

    }, {
      key: "traverse",
      value: function traverse(callback) {
        this.columnsByIndex.forEach(function (column, i) {
          callback(column, i);
        });
      } //get defintions of actual columns

    }, {
      key: "getDefinitions",
      value: function getDefinitions(active) {
        var output = [];
        this.columnsByIndex.forEach(function (column) {
          if (!active || active && column.visible) {
            output.push(column.getDefinition());
          }
        });
        return output;
      } //get full nested definition tree

    }, {
      key: "getDefinitionTree",
      value: function getDefinitionTree() {
        var output = [];
        this.columns.forEach(function (column) {
          output.push(column.getDefinition(true));
        });
        return output;
      }
    }, {
      key: "getComponents",
      value: function getComponents(structured) {
        var output = [],
            columns = structured ? this.columns : this.columnsByIndex;
        columns.forEach(function (column) {
          output.push(column.getComponent());
        });
        return output;
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        var width = 0;
        this.columnsByIndex.forEach(function (column) {
          if (column.visible) {
            width += column.getWidth();
          }
        });
        return width;
      }
    }, {
      key: "moveColumn",
      value: function moveColumn(from, to, after) {
        this.moveColumnActual(from, to, after);
        to.element.parentNode.insertBefore(from.element, to.element);

        if (after) {
          to.element.parentNode.insertBefore(to.element, from.element);
        }

        this.verticalAlignHeaders();
        this.table.rowManager.reinitialize();
      }
    }, {
      key: "moveColumnActual",
      value: function moveColumnActual(from, to, after) {
        if (from.parent.isGroup) {
          this._moveColumnInArray(from.parent.columns, from, to, after);
        } else {
          this._moveColumnInArray(this.columns, from, to, after);
        }

        this._moveColumnInArray(this.columnsByIndex, from, to, after, true);

        this.renderer.rerenderColumns(true);
        this.dispatch("column-moved", from, to, after);

        if (this.subscribedExternal("columnMoved")) {
          this.dispatchExternal("columnMoved", from.getComponent(), this.table.columnManager.getComponents());
        }
      }
    }, {
      key: "_moveColumnInArray",
      value: function _moveColumnInArray(columns, from, to, after, updateRows) {
        var fromIndex = columns.indexOf(from),
            toIndex,
            rows = [];

        if (fromIndex > -1) {
          columns.splice(fromIndex, 1);
          toIndex = columns.indexOf(to);

          if (toIndex > -1) {
            if (after) {
              toIndex = toIndex + 1;
            }
          } else {
            toIndex = fromIndex;
          }

          columns.splice(toIndex, 0, from);

          if (updateRows) {
            rows = this.chain("column-moving-rows", [from, to, after], null, []) || [];
            rows = rows.concat(this.table.rowManager.rows);
            rows.forEach(function (row) {
              if (row.cells.length) {
                var cell = row.cells.splice(fromIndex, 1)[0];
                row.cells.splice(toIndex, 0, cell);
              }
            });
          }
        }
      }
    }, {
      key: "scrollToColumn",
      value: function scrollToColumn(column, position, ifVisible) {
        var _this5 = this;

        var left = 0,
            offset = 0,
            adjust = 0,
            colEl = column.getElement();
        return new Promise(function (resolve, reject) {
          if (typeof position === "undefined") {
            position = _this5.table.options.scrollToColumnPosition;
          }

          if (typeof ifVisible === "undefined") {
            ifVisible = _this5.table.options.scrollToColumnIfVisible;
          }

          if (column.visible) {
            //align to correct position
            switch (position) {
              case "middle":
              case "center":
                adjust = -_this5.element.clientWidth / 2;
                break;

              case "right":
                adjust = colEl.clientWidth - _this5.headersElement.clientWidth;
                break;
            } //check column visibility


            if (!ifVisible) {
              offset = colEl.offsetLeft;

              if (offset > 0 && offset + colEl.offsetWidth < _this5.element.clientWidth) {
                return false;
              }
            } //calculate scroll position


            left = colEl.offsetLeft + adjust;
            left = Math.max(Math.min(left, _this5.table.rowManager.element.scrollWidth - _this5.table.rowManager.element.clientWidth), 0);

            _this5.table.rowManager.scrollHorizontal(left);

            _this5.scrollHorizontal(left);

            resolve();
          } else {
            console.warn("Scroll Error - Column not visible");
            reject("Scroll Error - Column not visible");
          }
        });
      } //////////////// Cell Management /////////////////

    }, {
      key: "generateCells",
      value: function generateCells(row) {
        var cells = [];
        this.columnsByIndex.forEach(function (column) {
          cells.push(column.generateCell(row));
        });
        return cells;
      } //////////////// Column Management /////////////////

    }, {
      key: "getFlexBaseWidth",
      value: function getFlexBaseWidth() {
        var totalWidth = this.table.element.clientWidth,
            //table element width
        fixedWidth = 0; //adjust for vertical scrollbar if present

        if (this.table.rowManager.element.scrollHeight > this.table.rowManager.element.clientHeight) {
          totalWidth -= this.table.rowManager.element.offsetWidth - this.table.rowManager.element.clientWidth;
        }

        this.columnsByIndex.forEach(function (column) {
          var width, minWidth, colWidth;

          if (column.visible) {
            width = column.definition.width || 0;
            minWidth = parseInt(column.minWidth);

            if (typeof width == "string") {
              if (width.indexOf("%") > -1) {
                colWidth = totalWidth / 100 * parseInt(width);
              } else {
                colWidth = parseInt(width);
              }
            } else {
              colWidth = width;
            }

            fixedWidth += colWidth > minWidth ? colWidth : minWidth;
          }
        });
        return fixedWidth;
      }
    }, {
      key: "addColumn",
      value: function addColumn(definition, before, nextToColumn) {
        var _this6 = this;

        return new Promise(function (resolve, reject) {
          var column = _this6._addColumn(definition, before, nextToColumn);

          _this6._reIndexColumns();

          _this6.dispatch("column-add", definition, before, nextToColumn);

          if (_this6.layoutMode() != "fitColumns") {
            column.reinitializeWidth();
          }

          _this6.redraw(true);

          _this6.table.rowManager.reinitialize();

          _this6.renderer.rerenderColumns();

          resolve(column);
        });
      } //remove column from system

    }, {
      key: "deregisterColumn",
      value: function deregisterColumn(column) {
        var field = column.getField(),
            index; //remove from field list

        if (field) {
          delete this.columnsByField[field];
        } //remove from index list


        index = this.columnsByIndex.indexOf(column);

        if (index > -1) {
          this.columnsByIndex.splice(index, 1);
        } //remove from column list


        index = this.columns.indexOf(column);

        if (index > -1) {
          this.columns.splice(index, 1);
        }

        this.verticalAlignHeaders();
        this.redraw();
      } //redraw columns

    }, {
      key: "redraw",
      value: function redraw(force) {
        if (Helpers.elVisible(this.element)) {
          this.verticalAlignHeaders();
        }

        if (force) {
          this.table.rowManager.resetScroll();
          this.table.rowManager.reinitialize();
        }

        if (!this.confirm("table-redrawing", force)) {
          this.layoutRefresh();
        }

        this.dispatch("table-redraw", force);
        this.table.footerManager.redraw();
      }
    }]);

    return ColumnManager;
  }(CoreFeature);

  //public row object
  var RowComponent$1 = /*#__PURE__*/function () {
    function RowComponent(row) {
      _classCallCheck(this, RowComponent);

      this._row = row;
      return new Proxy(this, {
        get: function get(target, name, receiver) {
          if (typeof target[name] !== "undefined") {
            return target[name];
          } else {
            return target._row.table.componentFunctionBinder.handle("row", target._row, name);
          }
        }
      });
    }

    _createClass(RowComponent, [{
      key: "getData",
      value: function getData(transform) {
        return this._row.getData(transform);
      }
    }, {
      key: "getElement",
      value: function getElement() {
        return this._row.getElement();
      }
    }, {
      key: "getCells",
      value: function getCells() {
        var cells = [];

        this._row.getCells().forEach(function (cell) {
          cells.push(cell.getComponent());
        });

        return cells;
      }
    }, {
      key: "getCell",
      value: function getCell(column) {
        var cell = this._row.getCell(column);

        return cell ? cell.getComponent() : false;
      }
    }, {
      key: "getIndex",
      value: function getIndex() {
        return this._row.getData("data")[this._row.table.options.index];
      }
    }, {
      key: "getPosition",
      value: function getPosition(active) {
        return this._row.table.rowManager.getRowPosition(this._row, active);
      }
    }, {
      key: "delete",
      value: function _delete() {
        return this._row["delete"]();
      }
    }, {
      key: "scrollTo",
      value: function scrollTo() {
        return this._row.table.rowManager.scrollToRow(this._row);
      }
    }, {
      key: "move",
      value: function move(to, after) {
        this._row.moveToRow(to, after);
      }
    }, {
      key: "update",
      value: function update(data) {
        return this._row.updateData(data);
      }
    }, {
      key: "normalizeHeight",
      value: function normalizeHeight() {
        this._row.normalizeHeight(true);
      }
    }, {
      key: "_getSelf",
      value: function _getSelf() {
        return this._row;
      }
    }, {
      key: "reformat",
      value: function reformat() {
        return this._row.reinitialize();
      }
    }, {
      key: "getTable",
      value: function getTable() {
        return this._row.table;
      }
    }, {
      key: "getNextRow",
      value: function getNextRow() {
        var row = this._row.nextRow();

        return row ? row.getComponent() : row;
      }
    }, {
      key: "getPrevRow",
      value: function getPrevRow() {
        var row = this._row.prevRow();

        return row ? row.getComponent() : row;
      }
    }]);

    return RowComponent;
  }();

  var Row = /*#__PURE__*/function (_CoreFeature) {
    _inherits(Row, _CoreFeature);

    var _super = _createSuper(Row);

    function Row(data, parent) {
      var _this;

      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "row";

      _classCallCheck(this, Row);

      _this = _super.call(this, parent.table);
      _this.parent = parent;
      _this.data = {};
      _this.type = type; //type of element

      _this.element = false;
      _this.modules = {}; //hold module variables;

      _this.cells = [];
      _this.height = 0; //hold element height

      _this.heightStyled = ""; //hold element height prestyled to improve render efficiency

      _this.manualHeight = false; //user has manually set row height

      _this.outerHeight = 0; //hold elements outer height

      _this.initialized = false; //element has been rendered

      _this.heightInitialized = false; //element has resized cells to fit

      _this.component = null;
      _this.created = false;

      _this.setData(data);

      return _this;
    }

    _createClass(Row, [{
      key: "create",
      value: function create() {
        if (!this.created) {
          this.created = true;
          this.generateElement();
        }
      }
    }, {
      key: "createElement",
      value: function createElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-row");
        el.setAttribute("role", "row");
        this.element = el;
      }
    }, {
      key: "getElement",
      value: function getElement() {
        this.create();
        return this.element;
      }
    }, {
      key: "detachElement",
      value: function detachElement() {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }
    }, {
      key: "generateElement",
      value: function generateElement() {
        this.createElement();
        this.dispatch("row-init", this);
      }
    }, {
      key: "generateCells",
      value: function generateCells() {
        this.cells = this.table.columnManager.generateCells(this);
      } //functions to setup on first render

    }, {
      key: "initialize",
      value: function initialize(force) {
        this.create();

        if (!this.initialized || force) {
          this.deleteCells();

          while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
          }

          this.dispatch("row-layout-before", this);
          this.generateCells();
          this.initialized = true;
          this.table.columnManager.renderer.renderRowCells(this);

          if (force) {
            this.normalizeHeight();
          }

          this.dispatch("row-layout", this);

          if (this.table.options.rowFormatter) {
            this.table.options.rowFormatter(this.getComponent());
          }

          this.dispatch("row-layout-after", this);
        } else {
          this.table.columnManager.renderer.rerenderRowCells(this);
        }
      }
    }, {
      key: "reinitializeHeight",
      value: function reinitializeHeight() {
        this.heightInitialized = false;

        if (this.element && this.element.offsetParent !== null) {
          this.normalizeHeight(true);
        }
      }
    }, {
      key: "deinitialize",
      value: function deinitialize() {
        this.initialized = false;
      }
    }, {
      key: "deinitializeHeight",
      value: function deinitializeHeight() {
        this.heightInitialized = false;
      }
    }, {
      key: "reinitialize",
      value: function reinitialize(children) {
        this.initialized = false;
        this.heightInitialized = false;

        if (!this.manualHeight) {
          this.height = 0;
          this.heightStyled = "";
        }

        if (this.element && this.element.offsetParent !== null) {
          this.initialize(true);
        }

        this.dispatch("row-relayout", this);
      } //get heights when doing bulk row style calcs in virtual DOM

    }, {
      key: "calcHeight",
      value: function calcHeight(force) {
        var maxHeight = 0,
            minHeight;

        if (this.table.options.rowHeight) {
          this.height = this.table.options.rowHeight;
        } else {
          minHeight = this.table.options.resizableRows ? this.element.clientHeight : 0;
          this.cells.forEach(function (cell) {
            var height = cell.getHeight();

            if (height > maxHeight) {
              maxHeight = height;
            }
          });

          if (force) {
            this.height = Math.max(maxHeight, minHeight);
          } else {
            this.height = this.manualHeight ? this.height : Math.max(maxHeight, minHeight);
          }
        }

        this.heightStyled = this.height ? this.height + "px" : "";
        this.outerHeight = this.element.offsetHeight;
      } //set of cells

    }, {
      key: "setCellHeight",
      value: function setCellHeight() {
        this.cells.forEach(function (cell) {
          cell.setHeight();
        });
        this.heightInitialized = true;
      }
    }, {
      key: "clearCellHeight",
      value: function clearCellHeight() {
        this.cells.forEach(function (cell) {
          cell.clearHeight();
        });
      } //normalize the height of elements in the row

    }, {
      key: "normalizeHeight",
      value: function normalizeHeight(force) {
        if (force && !this.table.options.rowHeight) {
          this.clearCellHeight();
        }

        this.calcHeight(force);
        this.setCellHeight();
      } //set height of rows

    }, {
      key: "setHeight",
      value: function setHeight(height, force) {
        if (this.height != height || force) {
          this.manualHeight = true;
          this.height = height;
          this.heightStyled = height ? height + "px" : "";
          this.setCellHeight(); // this.outerHeight = this.element.outerHeight();

          this.outerHeight = this.element.offsetHeight;
        }
      } //return rows outer height

    }, {
      key: "getHeight",
      value: function getHeight() {
        return this.outerHeight;
      } //return rows outer Width

    }, {
      key: "getWidth",
      value: function getWidth() {
        return this.element.offsetWidth;
      } //////////////// Cell Management /////////////////

    }, {
      key: "deleteCell",
      value: function deleteCell(cell) {
        var index = this.cells.indexOf(cell);

        if (index > -1) {
          this.cells.splice(index, 1);
        }
      } //////////////// Data Management /////////////////

    }, {
      key: "setData",
      value: function setData(data) {
        this.data = this.chain("row-data-init-before", [this, data], undefined, data);
        this.dispatch("row-data-init-after", this);
      } //update the rows data

    }, {
      key: "updateData",
      value: function updateData(updatedData) {
        var _this2 = this;

        var visible = this.element && Helpers.elVisible(this.element),
            tempData = {},
            newRowData;
        return new Promise(function (resolve, reject) {
          if (typeof updatedData === "string") {
            updatedData = JSON.parse(updatedData);
          }

          _this2.dispatch("row-data-save-before", _this2);

          if (_this2.subscribed("row-data-changing")) {
            tempData = Object.assign(tempData, _this2.data);
            tempData = Object.assign(tempData, updatedData);
          }

          newRowData = _this2.chain("row-data-changing", [_this2, tempData, updatedData], null, updatedData); //set data

          for (var attrname in newRowData) {
            _this2.data[attrname] = newRowData[attrname];
          }

          _this2.dispatch("row-data-save-after", _this2); //update affected cells only


          for (var attrname in updatedData) {
            var columns = _this2.table.columnManager.getColumnsByFieldRoot(attrname);

            columns.forEach(function (column) {
              var cell = _this2.getCell(column.getField());

              if (cell) {
                var value = column.getFieldValue(newRowData);

                if (cell.getValue() != value) {
                  cell.setValueProcessData(value);

                  if (visible) {
                    cell.cellRendered();
                  }
                }
              }
            });
          } //Partial reinitialization if visible


          if (visible) {
            _this2.normalizeHeight(true);

            if (_this2.table.options.rowFormatter) {
              _this2.table.options.rowFormatter(_this2.getComponent());
            }
          } else {
            _this2.initialized = false;
            _this2.height = 0;
            _this2.heightStyled = "";
          }

          _this2.dispatch("row-data-changed", _this2, visible, updatedData); //this.reinitialize();


          _this2.dispatchExternal("rowUpdated", _this2.getComponent());

          if (_this2.subscribedExternal("dataChanged")) {
            _this2.dispatchExternal("dataChanged", _this2.table.rowManager.getData());
          }

          resolve();
        });
      }
    }, {
      key: "getData",
      value: function getData(transform) {
        if (transform) {
          return this.chain("row-data-retrieve", [this, transform], null, this.data);
        }

        return this.data;
      }
    }, {
      key: "getCell",
      value: function getCell(column) {
        var match = false;
        column = this.table.columnManager.findColumn(column);

        if (!this.initialized) {
          this.generateCells();
        }

        match = this.cells.find(function (cell) {
          return cell.column === column;
        });
        return match;
      }
    }, {
      key: "getCellIndex",
      value: function getCellIndex(findCell) {
        return this.cells.findIndex(function (cell) {
          return cell === findCell;
        });
      }
    }, {
      key: "findCell",
      value: function findCell(subject) {
        return this.cells.find(function (cell) {
          return cell.element === subject;
        });
      }
    }, {
      key: "getCells",
      value: function getCells() {
        if (!this.initialized) {
          this.generateCells();
        }

        return this.cells;
      }
    }, {
      key: "nextRow",
      value: function nextRow() {
        var row = this.table.rowManager.nextDisplayRow(this, true);
        return row || false;
      }
    }, {
      key: "prevRow",
      value: function prevRow() {
        var row = this.table.rowManager.prevDisplayRow(this, true);
        return row || false;
      }
    }, {
      key: "moveToRow",
      value: function moveToRow(to, before) {
        var toRow = this.table.rowManager.findRow(to);

        if (toRow) {
          this.table.rowManager.moveRowActual(this, toRow, !before);
          this.table.rowManager.refreshActiveData("display", false, true);
        } else {
          console.warn("Move Error - No matching row found:", to);
        }
      } ///////////////////// Actions  /////////////////////

    }, {
      key: "delete",
      value: function _delete() {
        this.dispatch("row-delete", this);
        this.deleteActual();
        return Promise.resolve();
      }
    }, {
      key: "deleteActual",
      value: function deleteActual(blockRedraw) {
        var index = this.table.rowManager.getRowIndex(this);
        this.detatchModules();
        this.table.rowManager.deleteRow(this, blockRedraw);
        this.deleteCells();
        this.initialized = false;
        this.heightInitialized = false;
        this.element = false;
        this.dispatch("row-deleted", this);
      }
    }, {
      key: "detatchModules",
      value: function detatchModules() {
        this.dispatch("row-deleting", this);
      }
    }, {
      key: "deleteCells",
      value: function deleteCells() {
        var cellCount = this.cells.length;

        for (var i = 0; i < cellCount; i++) {
          this.cells[0]["delete"]();
        }
      }
    }, {
      key: "wipe",
      value: function wipe() {
        this.detatchModules();
        this.deleteCells();

        if (this.element) {
          while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
          }

          if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
        }

        this.element = false;
        this.modules = {};
      }
    }, {
      key: "getGroup",
      value: function getGroup() {
        return this.modules.group || false;
      } //////////////// Object Generation /////////////////

    }, {
      key: "getComponent",
      value: function getComponent() {
        if (!this.component) {
          this.component = new RowComponent$1(this);
        }

        return this.component;
      }
    }]);

    return Row;
  }(CoreFeature);

  var BaiscVertical = /*#__PURE__*/function (_Renderer) {
    _inherits(BaiscVertical, _Renderer);

    var _super = _createSuper(BaiscVertical);

    function BaiscVertical(table) {
      var _this;

      _classCallCheck(this, BaiscVertical);

      _this = _super.call(this, table);
      _this.verticalFillMode = "fill";
      _this.scrollTop = 0;
      _this.scrollLeft = 0;
      _this.scrollTop = 0;
      _this.scrollLeft = 0;
      return _this;
    }

    _createClass(BaiscVertical, [{
      key: "clearRows",
      value: function clearRows() {
        var element = this.tableElement; // element.children.detach();

        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        element.scrollTop = 0;
        element.scrollLeft = 0;
        element.style.minWidth = "";
        element.style.minHeight = "";
        element.style.display = "";
        element.style.visibility = "";
      }
    }, {
      key: "renderRows",
      value: function renderRows() {
        var _this2 = this;

        var element = this.tableElement,
            onlyGroupHeaders = true;
        this.rows().forEach(function (row, index) {
          _this2.styleRow(row, index);

          element.appendChild(row.getElement());
          row.initialize(true);

          if (row.type !== "group") {
            onlyGroupHeaders = false;
          }
        });

        if (onlyGroupHeaders) {
          element.style.minWidth = this.table.columnManager.getWidth() + "px";
        } else {
          element.style.minWidth = "";
        }
      }
    }, {
      key: "rerenderRows",
      value: function rerenderRows(callback) {
        this.clearRows();
        this.renderRows();

        if (callback) {
          callback();
        }
      }
    }, {
      key: "scrollToRowNearestTop",
      value: function scrollToRowNearestTop(row) {
        var rowTop = Helpers.elOffset(row.getElement()).top;
        return !(Math.abs(this.elementVertical.scrollTop - rowTop) > Math.abs(this.elementVertical.scrollTop + this.elementVertical.clientHeight - rowTop));
      }
    }, {
      key: "scrollToRow",
      value: function scrollToRow(row) {
        var rowEl = row.getElement();
        this.elementVertical.scrollTop = Helpers.elOffset(rowEl).top - Helpers.elOffset(this.elementVertical).top + this.elementVertical.scrollTop;
      }
    }, {
      key: "visibleRows",
      value: function visibleRows(includingBuffer) {
        return this.rows();
      }
    }]);

    return BaiscVertical;
  }(Renderer);

  var VirtualDomVertical = /*#__PURE__*/function (_Renderer) {
    _inherits(VirtualDomVertical, _Renderer);

    var _super = _createSuper(VirtualDomVertical);

    function VirtualDomVertical(table) {
      var _this;

      _classCallCheck(this, VirtualDomVertical);

      _this = _super.call(this, table);
      _this.verticalFillMode = "fill";
      _this.scrollTop = 0;
      _this.scrollLeft = 0;
      _this.vDomRowHeight = 20; //approximation of row heights for padding

      _this.vDomTop = 0; //hold position for first rendered row in the virtual DOM

      _this.vDomBottom = 0; //hold possition for last rendered row in the virtual DOM

      _this.vDomScrollPosTop = 0; //last scroll position of the vDom top;

      _this.vDomScrollPosBottom = 0; //last scroll position of the vDom bottom;

      _this.vDomTopPad = 0; //hold value of padding for top of virtual DOM

      _this.vDomBottomPad = 0; //hold value of padding for bottom of virtual DOM

      _this.vDomMaxRenderChain = 90; //the maximum number of dom elements that can be rendered in 1 go

      _this.vDomWindowBuffer = 0; //window row buffer before removing elements, to smooth scrolling

      _this.vDomWindowMinTotalRows = 20; //minimum number of rows to be generated in virtual dom (prevent buffering issues on tables with tall rows)

      _this.vDomWindowMinMarginRows = 5; //minimum number of rows to be generated in virtual dom margin

      _this.vDomTopNewRows = []; //rows to normalize after appending to optimize render speed

      _this.vDomBottomNewRows = []; //rows to normalize after appending to optimize render speed

      return _this;
    } //////////////////////////////////////
    ///////// Public Functions ///////////
    //////////////////////////////////////


    _createClass(VirtualDomVertical, [{
      key: "clearRows",
      value: function clearRows() {
        var element = this.tableElement; // element.children.detach();

        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        element.style.paddingTop = "";
        element.style.paddingBottom = ""; // element.style.minWidth = "";

        element.style.minHeight = "";
        element.style.display = "";
        element.style.visibility = "";
        this.elementVertical.scrollTop = 0;
        this.elementVertical.scrollLeft = 0;
        this.scrollTop = 0;
        this.scrollLeft = 0;
        this.vDomTop = 0;
        this.vDomBottom = 0;
        this.vDomTopPad = 0;
        this.vDomBottomPad = 0;
        this.vDomScrollPosTop = 0;
        this.vDomScrollPosBottom = 0;
      }
    }, {
      key: "renderRows",
      value: function renderRows() {
        this._virtualRenderFill();
      }
    }, {
      key: "rerenderRows",
      value: function rerenderRows(callback) {
        var scrollTop = this.elementVertical.scrollTop;
        var topRow = false;
        var topOffset = false;
        var left = this.table.rowManager.scrollLeft;
        var rows = this.rows();

        for (var i = this.vDomTop; i <= this.vDomBottom; i++) {
          if (rows[i]) {
            var diff = scrollTop - rows[i].getElement().offsetTop;

            if (topOffset === false || Math.abs(diff) < topOffset) {
              topOffset = diff;
              topRow = i;
            } else {
              break;
            }
          }
        }

        rows.forEach(function (row) {
          row.deinitializeHeight();
        });

        if (callback) {
          callback();
        }

        this._virtualRenderFill(topRow === false ? this.rows.length - 1 : topRow, true, topOffset || 0);

        this.scrollColumns(left);
      }
    }, {
      key: "scrollColumns",
      value: function scrollColumns(left) {
        this.table.rowManager.scrollHorizontal(left);
      }
    }, {
      key: "scrollRows",
      value: function scrollRows(top, dir) {
        var topDiff = top - this.vDomScrollPosTop;
        var bottomDiff = top - this.vDomScrollPosBottom;
        var margin = this.vDomWindowBuffer * 2;
        var rows = this.rows();
        this.scrollTop = top;

        if (-topDiff > margin || bottomDiff > margin) {
          //if big scroll redraw table;
          var left = this.table.rowManager.scrollLeft;

          this._virtualRenderFill(Math.floor(this.elementVertical.scrollTop / this.elementVertical.scrollHeight * rows.length));

          this.scrollColumns(left);
        } else {
          if (dir) {
            //scrolling up
            if (topDiff < 0) {
              this._addTopRow(rows, -topDiff);
            }

            if (bottomDiff < 0) {
              //hide bottom row if needed
              if (this.vDomScrollHeight - this.scrollTop > this.vDomWindowBuffer) {
                this._removeBottomRow(rows, -bottomDiff);
              } else {
                this.vDomScrollPosBottom = this.scrollTop;
              }
            }
          } else {
            if (bottomDiff >= 0) {
              this._addBottomRow(rows, bottomDiff);
            } //scrolling down


            if (topDiff >= 0) {
              //hide top row if needed
              if (this.scrollTop > this.vDomWindowBuffer) {
                this._removeTopRow(rows, topDiff);
              } else {
                this.vDomScrollPosTop = this.scrollTop;
              }
            }
          }
        }
      }
    }, {
      key: "resize",
      value: function resize() {
        this.vDomWindowBuffer = this.table.options.renderVerticalBuffer || this.elementVertical.clientHeight;
      }
    }, {
      key: "scrollToRowNearestTop",
      value: function scrollToRowNearestTop(row) {
        var rowIndex = this.rows().indexOf(row);
        return !(Math.abs(this.vDomTop - rowIndex) > Math.abs(this.vDomBottom - rowIndex));
      }
    }, {
      key: "scrollToRow",
      value: function scrollToRow(row) {
        var index = this.rows().indexOf(row);

        if (index > -1) {
          this._virtualRenderFill(index, true);
        }
      }
    }, {
      key: "visibleRows",
      value: function visibleRows(includingBuffer) {
        var topEdge = this.elementVertical.scrollTop,
            bottomEdge = this.elementVertical.clientHeight + topEdge,
            topFound = false,
            topRow = 0,
            bottomRow = 0,
            rows = this.rows();

        if (includingBuffer) {
          topRow = this.vDomTop;
          bottomRow = this.vDomBottom;
        } else {
          for (var i = this.vDomTop; i <= this.vDomBottom; i++) {
            if (rows[i]) {
              if (!topFound) {
                if (topEdge - rows[i].getElement().offsetTop >= 0) {
                  topRow = i;
                } else {
                  topFound = true;

                  if (bottomEdge - rows[i].getElement().offsetTop >= 0) {
                    bottomRow = i;
                  } else {
                    break;
                  }
                }
              } else {
                if (bottomEdge - rows[i].getElement().offsetTop >= 0) {
                  bottomRow = i;
                } else {
                  break;
                }
              }
            }
          }
        }

        return rows.slice(topRow, bottomRow + 1);
      } //////////////////////////////////////
      //////// Internal Rendering //////////
      //////////////////////////////////////
      //full virtual render

    }, {
      key: "_virtualRenderFill",
      value: function _virtualRenderFill(position, forceMove, offset) {
        var element = this.tableElement,
            holder = this.elementVertical,
            topPad = 0,
            rowsHeight = 0,
            heightOccupied = 0,
            topPadHeight = 0,
            i = 0,
            rows = this.rows(),
            rowsCount = rows.length,
            containerHeight = this.elementVertical.clientHeight;
        position = position || 0;
        offset = offset || 0;

        if (!position) {
          this.clear();
        } else {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          } //check if position is too close to bottom of table


          heightOccupied = (rowsCount - position + 1) * this.vDomRowHeight;

          if (heightOccupied < containerHeight) {
            position -= Math.ceil((containerHeight - heightOccupied) / this.vDomRowHeight);

            if (position < 0) {
              position = 0;
            }
          } //calculate initial pad


          topPad = Math.min(Math.max(Math.floor(this.vDomWindowBuffer / this.vDomRowHeight), this.vDomWindowMinMarginRows), position);
          position -= topPad;
        }

        if (rowsCount && Helpers.elVisible(this.elementVertical)) {
          this.vDomTop = position;
          this.vDomBottom = position - 1;

          while ((rowsHeight <= containerHeight + this.vDomWindowBuffer || i < this.vDomWindowMinTotalRows) && this.vDomBottom < rowsCount - 1) {
            var index = this.vDomBottom + 1,
                row = rows[index],
                rowHeight = 0;
            this.styleRow(row, index);
            element.appendChild(row.getElement());
            row.initialize();

            if (!row.heightInitialized) {
              row.normalizeHeight(true);
            }

            rowHeight = row.getHeight();

            if (i < topPad) {
              topPadHeight += rowHeight;
            } else {
              rowsHeight += rowHeight;
            }

            if (rowHeight > this.vDomWindowBuffer) {
              this.vDomWindowBuffer = rowHeight * 2;
            }

            this.vDomBottom++;
            i++;
          }

          if (!position) {
            this.vDomTopPad = 0; //adjust rowheight to match average of rendered elements

            this.vDomRowHeight = Math.floor((rowsHeight + topPadHeight) / i);
            this.vDomBottomPad = this.vDomRowHeight * (rowsCount - this.vDomBottom - 1);
            this.vDomScrollHeight = topPadHeight + rowsHeight + this.vDomBottomPad - containerHeight;
          } else {
            this.vDomTopPad = !forceMove ? this.scrollTop - topPadHeight : this.vDomRowHeight * this.vDomTop + offset;
            this.vDomBottomPad = this.vDomBottom == rowsCount - 1 ? 0 : Math.max(this.vDomScrollHeight - this.vDomTopPad - rowsHeight - topPadHeight, 0);
          }

          element.style.paddingTop = this.vDomTopPad + "px";
          element.style.paddingBottom = this.vDomBottomPad + "px";

          if (forceMove) {
            this.scrollTop = this.vDomTopPad + topPadHeight + offset - (this.elementVertical.scrollWidth > this.elementVertical.clientWidth ? this.elementVertical.offsetHeight - containerHeight : 0);
          }

          this.scrollTop = Math.min(this.scrollTop, this.elementVertical.scrollHeight - containerHeight); //adjust for horizontal scrollbar if present (and not at top of table)

          if (this.elementVertical.scrollWidth > this.elementVertical.offsetWidth && forceMove) {
            this.scrollTop += this.elementVertical.offsetHeight - containerHeight;
          }

          this.vDomScrollPosTop = this.scrollTop;
          this.vDomScrollPosBottom = this.scrollTop;
          holder.scrollTop = this.scrollTop;
          this.dispatch("render-virtual-fill");
        }
      }
    }, {
      key: "_addTopRow",
      value: function _addTopRow(rows, fillableSpace) {
        var table = this.tableElement,
            addedRows = [],
            paddingAdjust = 0,
            index = this.vDomTop - 1,
            i = 0;

        while (true) {
          if (this.vDomTop) {
            var row = rows[index],
                rowHeight = void 0,
                initialized = void 0;

            if (row && i < this.vDomMaxRenderChain) {
              rowHeight = row.getHeight() || this.vDomRowHeight;
              initialized = row.initialized;

              if (fillableSpace >= rowHeight) {
                this.styleRow(row, index);
                table.insertBefore(row.getElement(), table.firstChild);

                if (!row.initialized || !row.heightInitialized) {
                  addedRows.push(row);
                }

                row.initialize();

                if (!initialized) {
                  rowHeight = row.getElement().offsetHeight;

                  if (rowHeight > this.vDomWindowBuffer) {
                    this.vDomWindowBuffer = rowHeight * 2;
                  }
                }

                fillableSpace -= rowHeight;
                paddingAdjust += rowHeight;
                this.vDomTop--;
                index--;
                i++;
              } else {
                break;
              }
            } else {
              break;
            }
          } else {
            break;
          }
        }

        for (var _i = 0, _addedRows = addedRows; _i < _addedRows.length; _i++) {
          var _row = _addedRows[_i];

          _row.clearCellHeight();
        }

        this._quickNormalizeRowHeight(addedRows);

        if (paddingAdjust) {
          this.vDomTopPad -= paddingAdjust;

          if (this.vDomTopPad < 0) {
            this.vDomTopPad = index * this.vDomRowHeight;
          }

          if (index < 1) {
            this.vDomTopPad = 0;
          }

          table.style.paddingTop = this.vDomTopPad + "px";
          this.vDomScrollPosTop -= paddingAdjust;
        }
      }
    }, {
      key: "_removeTopRow",
      value: function _removeTopRow(rows, fillableSpace) {
        var removableRows = [],
            paddingAdjust = 0,
            i = 0;

        while (true) {
          var row = rows[this.vDomTop],
              rowHeight = void 0;

          if (row && i < this.vDomMaxRenderChain) {
            rowHeight = row.getHeight() || this.vDomRowHeight;

            if (fillableSpace >= rowHeight) {
              this.vDomTop++;
              fillableSpace -= rowHeight;
              paddingAdjust += rowHeight;
              removableRows.push(row);
              i++;
            } else {
              break;
            }
          } else {
            break;
          }
        }

        for (var _i2 = 0, _removableRows = removableRows; _i2 < _removableRows.length; _i2++) {
          var _row2 = _removableRows[_i2];

          var rowEl = _row2.getElement();

          if (rowEl.parentNode) {
            rowEl.parentNode.removeChild(rowEl);
          }
        }

        if (paddingAdjust) {
          this.vDomTopPad += paddingAdjust;
          this.tableElement.style.paddingTop = this.vDomTopPad + "px";
          this.vDomScrollPosTop += this.vDomTop ? paddingAdjust : paddingAdjust + this.vDomWindowBuffer;
        }
      }
    }, {
      key: "_addBottomRow",
      value: function _addBottomRow(rows, fillableSpace) {
        var table = this.tableElement,
            addedRows = [],
            paddingAdjust = 0,
            index = this.vDomBottom + 1,
            i = 0;

        while (true) {
          var row = rows[index],
              rowHeight = void 0,
              initialized = void 0;

          if (row && i < this.vDomMaxRenderChain) {
            rowHeight = row.getHeight() || this.vDomRowHeight;
            initialized = row.initialized;

            if (fillableSpace >= rowHeight) {
              this.styleRow(row, index);
              table.appendChild(row.getElement());

              if (!row.initialized || !row.heightInitialized) {
                addedRows.push(row);
              }

              row.initialize();

              if (!initialized) {
                rowHeight = row.getElement().offsetHeight;

                if (rowHeight > this.vDomWindowBuffer) {
                  this.vDomWindowBuffer = rowHeight * 2;
                }
              }

              fillableSpace -= rowHeight;
              paddingAdjust += rowHeight;
              this.vDomBottom++;
              index++;
              i++;
            } else {
              break;
            }
          } else {
            break;
          }
        }

        for (var _i3 = 0, _addedRows2 = addedRows; _i3 < _addedRows2.length; _i3++) {
          var _row3 = _addedRows2[_i3];

          _row3.clearCellHeight();
        }

        this._quickNormalizeRowHeight(addedRows);

        if (paddingAdjust) {
          this.vDomBottomPad -= paddingAdjust;

          if (this.vDomBottomPad < 0 || index == rows.length - 1) {
            this.vDomBottomPad = 0;
          }

          table.style.paddingBottom = this.vDomBottomPad + "px";
          this.vDomScrollPosBottom += paddingAdjust;
        }
      }
    }, {
      key: "_removeBottomRow",
      value: function _removeBottomRow(rows, fillableSpace) {
        var removableRows = [],
            paddingAdjust = 0,
            i = 0;

        while (true) {
          var row = rows[this.vDomBottom],
              rowHeight = void 0;

          if (row && i < this.vDomMaxRenderChain) {
            rowHeight = row.getHeight() || this.vDomRowHeight;

            if (fillableSpace >= rowHeight) {
              this.vDomBottom--;
              fillableSpace -= rowHeight;
              paddingAdjust += rowHeight;
              removableRows.push(row);
              i++;
            } else {
              break;
            }
          } else {
            break;
          }
        }

        for (var _i4 = 0, _removableRows2 = removableRows; _i4 < _removableRows2.length; _i4++) {
          var _row4 = _removableRows2[_i4];

          var rowEl = _row4.getElement();

          if (rowEl.parentNode) {
            rowEl.parentNode.removeChild(rowEl);
          }
        }

        if (paddingAdjust) {
          this.vDomBottomPad += paddingAdjust;

          if (this.vDomBottomPad < 0) {
            this.vDomBottomPad = 0;
          }

          this.tableElement.style.paddingBottom = this.vDomBottomPad + "px";
          this.vDomScrollPosBottom -= paddingAdjust;
        }
      }
    }, {
      key: "_quickNormalizeRowHeight",
      value: function _quickNormalizeRowHeight(rows) {
        var _iterator = _createForOfIteratorHelper(rows),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var row = _step.value;
            row.calcHeight();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var _iterator2 = _createForOfIteratorHelper(rows),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _row5 = _step2.value;

            _row5.setCellHeight();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }]);

    return VirtualDomVertical;
  }(Renderer);

  var RowManager = /*#__PURE__*/function (_CoreFeature) {
    _inherits(RowManager, _CoreFeature);

    var _super = _createSuper(RowManager);

    function RowManager(table) {
      var _this;

      _classCallCheck(this, RowManager);

      _this = _super.call(this, table);
      _this.element = _this.createHolderElement(); //containing element

      _this.tableElement = _this.createTableElement(); //table element

      _this.heightFixer = _this.createTableElement(); //table element

      _this.placeholder = null; //placeholder element

      _this.placeholderContents = null; //placeholder element

      _this.firstRender = false; //handle first render

      _this.renderMode = "virtual"; //current rendering mode

      _this.fixedHeight = false; //current rendering mode

      _this.rows = []; //hold row data objects

      _this.activeRowsPipeline = []; //hold calculation of active rows

      _this.activeRows = []; //rows currently available to on display in the table

      _this.activeRowsCount = 0; //count of active rows

      _this.displayRows = []; //rows currently on display in the table

      _this.displayRowsCount = 0; //count of display rows

      _this.scrollTop = 0;
      _this.scrollLeft = 0;
      _this.rowNumColumn = false; //hold column component for row number column

      _this.redrawBlock = false; //prevent redraws to allow multiple data manipulations before continuing

      _this.redrawBlockRestoreConfig = false; //store latest redraw function calls for when redraw is needed

      _this.redrawBlockRenderInPosition = false; //store latest redraw function calls for when redraw is needed

      _this.dataPipeline = []; //hold data pipeline tasks

      _this.displayPipeline = []; //hold data display pipeline tasks

      _this.renderer = null;
      return _this;
    } //////////////// Setup Functions /////////////////


    _createClass(RowManager, [{
      key: "createHolderElement",
      value: function createHolderElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-tableholder");
        el.setAttribute("tabindex", 0); // el.setAttribute("role", "rowgroup");

        return el;
      }
    }, {
      key: "createTableElement",
      value: function createTableElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-table");
        el.setAttribute("role", "rowgroup");
        return el;
      }
    }, {
      key: "initializePlaceholder",
      value: function initializePlaceholder() {
        //configure placeholder element
        if (typeof this.table.options.placeholder == "string") {
          var el = document.createElement("div");
          el.classList.add("tabulator-placeholder");
          var contents = document.createElement("div");
          contents.classList.add("tabulator-placeholder-contents");
          contents.innerHTML = this.table.options.placeholder;
          el.appendChild(contents);
          this.placeholderContents = contents;
          this.placeholder = el;
        }
      } //return containing element

    }, {
      key: "getElement",
      value: function getElement() {
        return this.element;
      } //return table element

    }, {
      key: "getTableElement",
      value: function getTableElement() {
        return this.tableElement;
      } //return position of row in table

    }, {
      key: "getRowPosition",
      value: function getRowPosition(row, active) {
        if (active) {
          return this.activeRows.indexOf(row);
        } else {
          return this.rows.indexOf(row);
        }
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var _this2 = this;

        this.initializePlaceholder();
        this.initializeRenderer(); //initialize manager

        this.element.appendChild(this.tableElement);
        this.firstRender = true; //scroll header along with table body

        this.element.addEventListener("scroll", function () {
          var left = _this2.element.scrollLeft,
              leftDir = _this2.scrollLeft > left,
              top = _this2.element.scrollTop,
              topDir = _this2.scrollTop > top; //handle horizontal scrolling

          if (_this2.scrollLeft != left) {
            _this2.scrollLeft = left;

            _this2.dispatch("scroll-horizontal", left, leftDir);

            _this2.dispatchExternal("scrollHorizontal", left, leftDir);

            _this2._positionPlaceholder();
          } //handle vertical scrolling


          if (_this2.scrollTop != top) {
            _this2.scrollTop = top;

            _this2.renderer.scrollRows(top, topDir);

            _this2.dispatch("scroll-vertical", top, topDir);

            _this2.dispatchExternal("scrollVertical", top, topDir);
          }
        });
      } ////////////////// Row Manipulation //////////////////

    }, {
      key: "findRow",
      value: function findRow(subject) {
        var _this3 = this;

        if (_typeof(subject) == "object") {
          if (subject instanceof Row) {
            //subject is row element
            return subject;
          } else if (subject instanceof RowComponent$1) {
            //subject is public row component
            return subject._getSelf() || false;
          } else if (typeof HTMLElement !== "undefined" && subject instanceof HTMLElement) {
            //subject is a HTML element of the row
            var match = this.rows.find(function (row) {
              return row.getElement() === subject;
            });
            return match || false;
          }
        } else if (typeof subject == "undefined" || subject === null) {
          return false;
        } else {
          //subject should be treated as the index of the row
          var _match = this.rows.find(function (row) {
            return row.data[_this3.table.options.index] == subject;
          });

          return _match || false;
        } //catch all for any other type of input


        return false;
      }
    }, {
      key: "getRowFromDataObject",
      value: function getRowFromDataObject(data) {
        var match = this.rows.find(function (row) {
          return row.data === data;
        });
        return match || false;
      }
    }, {
      key: "getRowFromPosition",
      value: function getRowFromPosition(position, active) {
        if (active) {
          return this.activeRows[position];
        } else {
          return this.rows[position];
        }
      }
    }, {
      key: "scrollToRow",
      value: function scrollToRow(row, position, ifVisible) {
        return this.renderer.scrollToRowPosition(row, position, ifVisible);
      } ////////////////// Data Handling //////////////////

    }, {
      key: "setData",
      value: function setData(data, renderInPosition, columnsChanged) {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          if (renderInPosition && _this4.getDisplayRows().length) {
            if (_this4.table.options.pagination) {
              _this4._setDataActual(data, true);
            } else {
              _this4.reRenderInPosition(function () {
                _this4._setDataActual(data);
              });
            }
          } else {
            if (_this4.table.options.autoColumns && columnsChanged && _this4.table.initialized) {
              _this4.table.columnManager.generateColumnsFromRowData(data);
            }

            _this4.resetScroll();

            _this4._setDataActual(data);
          }

          resolve();
        });
      }
    }, {
      key: "_setDataActual",
      value: function _setDataActual(data, renderInPosition) {
        var _this5 = this;

        this.dispatchExternal("dataProcessing", data);

        this._wipeElements();

        if (Array.isArray(data)) {
          this.dispatch("data-processing", data);
          data.forEach(function (def, i) {
            if (def && _typeof(def) === "object") {
              var row = new Row(def, _this5);

              _this5.rows.push(row);
            } else {
              console.warn("Data Loading Warning - Invalid row data detected and ignored, expecting object but received:", def);
            }
          });
          this.refreshActiveData(false, false, renderInPosition);
          this.dispatch("data-processed", data);
          this.dispatchExternal("dataProcessed", data);
        } else {
          console.error("Data Loading Error - Unable to process data due to invalid data type \nExpecting: array \nReceived: ", _typeof(data), "\nData:     ", data);
        }
      }
    }, {
      key: "_wipeElements",
      value: function _wipeElements() {
        this.dispatch("rows-wipe");
        this.rows.forEach(function (row) {
          row.wipe();
        });
        this.rows = [];
        this.activeRows = [];
        this.activeRowsPipeline = [];
        this.activeRowsCount = 0;
        this.displayRows = [];
        this.displayRowsCount = 0;
        this.adjustTableSize();
      }
    }, {
      key: "deleteRow",
      value: function deleteRow(row, blockRedraw) {
        var allIndex = this.rows.indexOf(row),
            activeIndex = this.activeRows.indexOf(row);

        if (activeIndex > -1) {
          this.activeRows.splice(activeIndex, 1);
        }

        if (allIndex > -1) {
          this.rows.splice(allIndex, 1);
        }

        this.setActiveRows(this.activeRows);
        this.displayRowIterator(function (rows) {
          var displayIndex = rows.indexOf(row);

          if (displayIndex > -1) {
            rows.splice(displayIndex, 1);
          }
        });

        if (!blockRedraw) {
          this.reRenderInPosition();
        }

        this.regenerateRowNumbers();
        this.dispatchExternal("rowDeleted", row.getComponent());

        if (!this.displayRowsCount) {
          this._showPlaceholder();
        }

        if (this.subscribedExternal("dataChanged")) {
          this.dispatchExternal("dataChanged", this.getData());
        }
      }
    }, {
      key: "addRow",
      value: function addRow(data, pos, index, blockRedraw) {
        var row = this.addRowActual(data, pos, index, blockRedraw);
        return row;
      } //add multiple rows

    }, {
      key: "addRows",
      value: function addRows(data, pos, index) {
        var _this6 = this;

        var rows = [];
        return new Promise(function (resolve, reject) {
          pos = _this6.findAddRowPos(pos);

          if (!Array.isArray(data)) {
            data = [data];
          }

          data.length - 1;

          if (typeof index == "undefined" && pos || typeof index !== "undefined" && !pos) {
            data.reverse();
          }

          data.forEach(function (item, i) {
            var row = _this6.addRow(item, pos, index, true);

            rows.push(row);

            _this6.dispatch("row-added", row, data, pos, index);
          });

          _this6.refreshActiveData(false, false, true);

          _this6.regenerateRowNumbers();

          if (rows.length) {
            _this6._clearPlaceholder();
          }

          resolve(rows);
        });
      }
    }, {
      key: "findAddRowPos",
      value: function findAddRowPos(pos) {
        if (typeof pos === "undefined") {
          pos = this.table.options.addRowPos;
        }

        if (pos === "pos") {
          pos = true;
        }

        if (pos === "bottom") {
          pos = false;
        }

        return pos;
      }
    }, {
      key: "addRowActual",
      value: function addRowActual(data, pos, index, blockRedraw) {
        var row = data instanceof Row ? data : new Row(data || {}, this),
            top = this.findAddRowPos(pos),
            allIndex = -1,
            activeIndex,
            chainResult;

        if (!index) {
          chainResult = this.chain("row-adding-position", [row, top], null, {
            index: index,
            top: top
          });
          index = chainResult.index;
          top = chainResult.top;
        }

        if (typeof index !== "undefined") {
          index = this.findRow(index);
        }

        index = this.chain("row-adding-index", [row, index, top], null, index);

        if (index) {
          allIndex = this.rows.indexOf(index);
        }

        if (index && allIndex > -1) {
          activeIndex = this.activeRows.indexOf(index);
          this.displayRowIterator(function (rows) {
            var displayIndex = rows.indexOf(index);

            if (displayIndex > -1) {
              rows.splice(top ? displayIndex : displayIndex + 1, 0, row);
            }
          });

          if (activeIndex > -1) {
            this.activeRows.splice(top ? activeIndex : activeIndex + 1, 0, row);
          }

          this.rows.splice(top ? allIndex : allIndex + 1, 0, row);
        } else {
          if (top) {
            this.displayRowIterator(function (rows) {
              rows.unshift(row);
            });
            this.activeRows.unshift(row);
            this.rows.unshift(row);
          } else {
            this.displayRowIterator(function (rows) {
              rows.push(row);
            });
            this.activeRows.push(row);
            this.rows.push(row);
          }
        }

        this.setActiveRows(this.activeRows);
        this.dispatchExternal("rowAdded", row.getComponent());

        if (this.subscribedExternal("dataChanged")) {
          this.dispatchExternal("dataChanged", this.table.rowManager.getData());
        }

        if (!blockRedraw) {
          this.reRenderInPosition();
        }

        return row;
      }
    }, {
      key: "moveRow",
      value: function moveRow(from, to, after) {
        this.dispatch("row-move", from, to, after);
        this.moveRowActual(from, to, after);
        this.regenerateRowNumbers();
        this.dispatch("row-moved", from, to, after);
        this.dispatchExternal("rowMoved", from.getComponent());
      }
    }, {
      key: "moveRowActual",
      value: function moveRowActual(from, to, after) {
        var _this7 = this;

        this.moveRowInArray(this.rows, from, to, after);
        this.moveRowInArray(this.activeRows, from, to, after);
        this.displayRowIterator(function (rows) {
          _this7.moveRowInArray(rows, from, to, after);
        });
        this.dispatch("row-moving", from, to, after);
      }
    }, {
      key: "moveRowInArray",
      value: function moveRowInArray(rows, from, to, after) {
        var fromIndex, toIndex, start, end;

        if (from !== to) {
          fromIndex = rows.indexOf(from);

          if (fromIndex > -1) {
            rows.splice(fromIndex, 1);
            toIndex = rows.indexOf(to);

            if (toIndex > -1) {
              if (after) {
                rows.splice(toIndex + 1, 0, from);
              } else {
                rows.splice(toIndex, 0, from);
              }
            } else {
              rows.splice(fromIndex, 0, from);
            }
          } //restyle rows


          if (rows === this.getDisplayRows()) {
            start = fromIndex < toIndex ? fromIndex : toIndex;
            end = toIndex > fromIndex ? toIndex : fromIndex + 1;

            for (var i = start; i <= end; i++) {
              if (rows[i]) {
                this.styleRow(rows[i], i);
              }
            }
          }
        }
      }
    }, {
      key: "clearData",
      value: function clearData() {
        this.setData([]);
      }
    }, {
      key: "getRowIndex",
      value: function getRowIndex(row) {
        return this.findRowIndex(row, this.rows);
      }
    }, {
      key: "getDisplayRowIndex",
      value: function getDisplayRowIndex(row) {
        var index = this.getDisplayRows().indexOf(row);
        return index > -1 ? index : false;
      }
    }, {
      key: "nextDisplayRow",
      value: function nextDisplayRow(row, rowOnly) {
        var index = this.getDisplayRowIndex(row),
            nextRow = false;

        if (index !== false && index < this.displayRowsCount - 1) {
          nextRow = this.getDisplayRows()[index + 1];
        }

        if (nextRow && (!(nextRow instanceof Row) || nextRow.type != "row")) {
          return this.nextDisplayRow(nextRow, rowOnly);
        }

        return nextRow;
      }
    }, {
      key: "prevDisplayRow",
      value: function prevDisplayRow(row, rowOnly) {
        var index = this.getDisplayRowIndex(row),
            prevRow = false;

        if (index) {
          prevRow = this.getDisplayRows()[index - 1];
        }

        if (rowOnly && prevRow && (!(prevRow instanceof Row) || prevRow.type != "row")) {
          return this.prevDisplayRow(prevRow, rowOnly);
        }

        return prevRow;
      }
    }, {
      key: "findRowIndex",
      value: function findRowIndex(row, list) {
        var rowIndex;
        row = this.findRow(row);

        if (row) {
          rowIndex = list.indexOf(row);

          if (rowIndex > -1) {
            return rowIndex;
          }
        }

        return false;
      }
    }, {
      key: "getData",
      value: function getData(active, transform) {
        var output = [],
            rows = this.getRows(active);
        rows.forEach(function (row) {
          if (row.type == "row") {
            output.push(row.getData(transform || "data"));
          }
        });
        return output;
      }
    }, {
      key: "getComponents",
      value: function getComponents(active) {
        var output = [],
            rows = this.getRows(active);
        rows.forEach(function (row) {
          output.push(row.getComponent());
        });
        return output;
      }
    }, {
      key: "getDataCount",
      value: function getDataCount(active) {
        var rows = this.getRows(active);
        return rows.length;
      }
    }, {
      key: "scrollHorizontal",
      value: function scrollHorizontal(left) {
        this.scrollLeft = left;
        this.element.scrollLeft = left;
        this.dispatch("scroll-horizontal", left);
      }
    }, {
      key: "registerDataPipelineHandler",
      value: function registerDataPipelineHandler(handler, priority) {
        if (typeof priority !== "undefined") {
          this.dataPipeline.push({
            handler: handler,
            priority: priority
          });
          this.dataPipeline.sort(function (a, b) {
            return a.priority - b.priority;
          });
        } else {
          console.error("Data pipeline handlers must have a priority in order to be registered");
        }
      }
    }, {
      key: "registerDisplayPipelineHandler",
      value: function registerDisplayPipelineHandler(handler, priority) {
        if (typeof priority !== "undefined") {
          this.displayPipeline.push({
            handler: handler,
            priority: priority
          });
          this.displayPipeline.sort(function (a, b) {
            return a.priority - b.priority;
          });
        } else {
          console.error("Display pipeline handlers must have a priority in order to be registered");
        }
      } //set active data set

    }, {
      key: "refreshActiveData",
      value: function refreshActiveData(handler, skipStage, renderInPosition) {
        var table = this.table,
            stage = "",
            index = 0,
            cascadeOrder = ["all", "dataPipeline", "display", "displayPipeline", "end"];

        if (typeof handler === "function") {
          index = this.dataPipeline.findIndex(function (item) {
            return item.handler === handler;
          });

          if (index > -1) {
            stage = "dataPipeline";

            if (skipStage) {
              if (index == this.dataPipeline.length - 1) {
                stage = "display";
              } else {
                index++;
              }
            }
          } else {
            index = this.displayPipeline.findIndex(function (item) {
              return item.handler === handler;
            });

            if (index > -1) {
              stage = "displayPipeline";

              if (skipStage) {
                if (index == this.displayPipeline.length - 1) {
                  stage = "end";
                } else {
                  index++;
                }
              }
            } else {
              console.error("Unable to refresh data, invalid handler provided", handler);
              return;
            }
          }
        } else {
          stage = handler || "all";
          index = 0;
        }

        if (this.redrawBlock) {
          if (!this.redrawBlockRestoreConfig || this.redrawBlockRestoreConfig && (this.redrawBlockRestoreConfig.stage === stage && index < this.redrawBlockRestoreConfig.index || cascadeOrder.indexOf(stage) < cascadeOrder.indexOf(this.redrawBlockRestoreConfig.stage))) {
            this.redrawBlockRestoreConfig = {
              handler: handler,
              skipStage: skipStage,
              renderInPosition: renderInPosition,
              stage: stage,
              index: index
            };
          }

          return;
        } else {
          if (Helpers.elVisible(this.element)) {
            if (renderInPosition) {
              this.reRenderInPosition(this.refreshPipelines.bind(this, handler, stage, index, renderInPosition));
            } else {
              this.refreshPipelines(handler, stage, index, renderInPosition);

              if (!handler) {
                this.table.columnManager.renderer.renderColumns();
              }

              this.renderTable();

              if (table.options.layoutColumnsOnNewData) {
                this.table.columnManager.redraw(true);
              }
            }
          } else {
            this.refreshPipelines(handler, stage, index, renderInPosition);
          }

          this.dispatch("data-refreshed");
        }
      }
    }, {
      key: "refreshPipelines",
      value: function refreshPipelines(handler, stage, index, renderInPosition) {
        this.dispatch("data-refreshing");

        if (!handler) {
          this.activeRowsPipeline[0] = this.rows.slice(0);
        } //cascade through data refresh stages


        switch (stage) {
          case "all": //handle case where alldata needs refreshing

          case "dataPipeline":
            for (var i = index; i < this.dataPipeline.length; i++) {
              var result = this.dataPipeline[i].handler(this.activeRowsPipeline[i].slice(0));
              this.activeRowsPipeline[i + 1] = result || this.activeRowsPipeline[i].slice(0);
            }

            this.setActiveRows(this.activeRowsPipeline[this.dataPipeline.length]);
            this.regenerateRowNumbers();

          case "display":
            index = 0;
            this.resetDisplayRows();

          case "displayPipeline":
            for (var _i = index; _i < this.displayPipeline.length; _i++) {
              var _result = this.displayPipeline[_i].handler((_i ? this.getDisplayRows(_i - 1) : this.activeRows).slice(0), renderInPosition);

              this.setDisplayRows(_result || this.getDisplayRows(_i - 1).slice(0), _i);
            }

        }
      } //regenerate row numbers for row number formatter if in use

    }, {
      key: "regenerateRowNumbers",
      value: function regenerateRowNumbers() {
        var _this8 = this;

        if (this.rowNumColumn) {
          this.activeRows.forEach(function (row) {
            var cell = row.getCell(_this8.rowNumColumn);

            if (cell) {
              cell._generateContents();
            }
          });
        }
      }
    }, {
      key: "setActiveRows",
      value: function setActiveRows(activeRows) {
        this.activeRows = activeRows;
        this.activeRowsCount = this.activeRows.length;
      } //reset display rows array

    }, {
      key: "resetDisplayRows",
      value: function resetDisplayRows() {
        this.displayRows = [];
        this.displayRows.push(this.activeRows.slice(0));
        this.displayRowsCount = this.displayRows[0].length;
      }
    }, {
      key: "getNextDisplayIndex",
      value: function getNextDisplayIndex() {
        return this.displayRows.length;
      } //set display row pipeline data

    }, {
      key: "setDisplayRows",
      value: function setDisplayRows(displayRows, index) {
        var output = true;

        if (index && typeof this.displayRows[index] != "undefined") {
          this.displayRows[index] = displayRows;
          output = true;
        } else {
          this.displayRows.push(displayRows);
          output = index = this.displayRows.length - 1;
        }

        if (index == this.displayRows.length - 1) {
          this.displayRowsCount = this.displayRows[this.displayRows.length - 1].length;
        }

        return output;
      }
    }, {
      key: "getDisplayRows",
      value: function getDisplayRows(index) {
        if (typeof index == "undefined") {
          return this.displayRows.length ? this.displayRows[this.displayRows.length - 1] : [];
        } else {
          return this.displayRows[index] || [];
        }
      }
    }, {
      key: "getVisibleRows",
      value: function getVisibleRows(chain, viewable) {
        var rows = Object.assign([], this.renderer.visibleRows(!viewable));

        if (chain) {
          rows = this.chain("rows-visible", [viewable], rows, rows);
        }

        return rows;
      } //repeat action accross display rows

    }, {
      key: "displayRowIterator",
      value: function displayRowIterator(callback) {
        this.activeRowsPipeline.forEach(callback);
        this.displayRows.forEach(callback);
        this.displayRowsCount = this.displayRows[this.displayRows.length - 1].length;
      } //return only actual rows (not group headers etc)

    }, {
      key: "getRows",
      value: function getRows(type) {
        var rows;

        switch (type) {
          case "active":
            rows = this.activeRows;
            break;

          case "display":
            rows = this.table.rowManager.getDisplayRows();
            break;

          case "visible":
            rows = this.getVisibleRows(false, true);
            break;

          default:
            rows = this.chain("rows-retrieve", type, null, this.rows) || this.rows;
        }

        return rows;
      } ///////////////// Table Rendering /////////////////
      //trigger rerender of table in current position

    }, {
      key: "reRenderInPosition",
      value: function reRenderInPosition(callback) {
        if (this.redrawBlock) {
          if (callback) {
            callback();
          } else {
            this.redrawBlockRenderInPosition = true;
          }
        } else {
          this.dispatchExternal("renderStarted");
          this.renderer.rerenderRows(callback);
          this.dispatchExternal("renderComplete");
        }
      }
    }, {
      key: "initializeRenderer",
      value: function initializeRenderer() {
        var renderClass;
        var renderers = {
          "virtual": VirtualDomVertical,
          "basic": BaiscVertical
        };

        if (typeof this.table.options.renderVertical === "string") {
          renderClass = renderers[this.table.options.renderVertical];
        } else {
          renderClass = this.table.options.renderVertical;
        }

        if (renderClass) {
          this.renderer = new renderClass(this.table, this.element, this.tableElement);
          this.renderer.initialize();

          if (this.table.element.clientHeight || this.table.options.height) {
            this.fixedHeight = true;
          } else {
            this.fixedHeight = false;
          }
        } else {
          console.error("Unable to find matching renderer:", table.options.renderVertical);
        }
      }
    }, {
      key: "getRenderMode",
      value: function getRenderMode() {
        return this.renderMode;
      }
    }, {
      key: "renderTable",
      value: function renderTable() {
        this.dispatchExternal("renderStarted");
        this.element.scrollTop = 0;

        this._clearTable();

        if (this.displayRowsCount) {
          this.renderer.renderRows();

          if (this.firstRender) {
            this.firstRender = false;
            this.layoutRefresh();
          }
        } else {
          this.renderEmptyScroll();
        }

        if (!this.fixedHeight) {
          this.adjustTableSize();
        }

        this.dispatch("table-layout");

        if (!this.displayRowsCount) {
          this._showPlaceholder();
        }

        this.dispatchExternal("renderComplete");
      } //show scrollbars on empty table div

    }, {
      key: "renderEmptyScroll",
      value: function renderEmptyScroll() {
        if (this.placeholder) {
          this.tableElement.style.display = "none";
        } else {
          this.tableElement.style.minWidth = this.table.columnManager.getWidth() + "px"; // this.tableElement.style.minHeight = "1px";
          // this.tableElement.style.visibility = "hidden";
        }
      }
    }, {
      key: "_clearTable",
      value: function _clearTable() {
        var element = this.tableElement;

        this._clearPlaceholder();

        this.scrollTop = 0;
        this.scrollLeft = 0;
        this.renderer.clearRows();
      }
    }, {
      key: "_showPlaceholder",
      value: function _showPlaceholder() {
        if (this.placeholder) {
          this.placeholder.setAttribute("tabulator-render-mode", this.renderMode);
          this.getElement().appendChild(this.placeholder);

          this._positionPlaceholder();
        }
      }
    }, {
      key: "_clearPlaceholder",
      value: function _clearPlaceholder() {
        if (this.placeholder && this.placeholder.parentNode) {
          this.placeholder.parentNode.removeChild(this.placeholder);
        }
      }
    }, {
      key: "_positionPlaceholder",
      value: function _positionPlaceholder() {
        if (this.placeholder && this.placeholder.parentNode) {
          this.placeholder.style.width = this.table.columnManager.getWidth() + "px";
          this.placeholderContents.style.width = this.table.rowManager.element.clientWidth + "px";
          this.placeholderContents.style.marginLeft = this.scrollLeft + "px";
        }
      }
    }, {
      key: "styleRow",
      value: function styleRow(row, index) {
        var rowEl = row.getElement();

        if (index % 2) {
          rowEl.classList.add("tabulator-row-even");
          rowEl.classList.remove("tabulator-row-odd");
        } else {
          rowEl.classList.add("tabulator-row-odd");
          rowEl.classList.remove("tabulator-row-even");
        }
      } //normalize height of active rows

    }, {
      key: "normalizeHeight",
      value: function normalizeHeight() {
        this.activeRows.forEach(function (row) {
          row.normalizeHeight();
        });
      } //adjust the height of the table holder to fit in the Tabulator element

    }, {
      key: "adjustTableSize",
      value: function adjustTableSize() {
        var initialHeight = this.element.clientHeight;

        if (this.renderer.verticalFillMode === "fill") {
          var otherHeight = Math.floor(this.table.columnManager.getElement().getBoundingClientRect().height + (this.table.footerManager && this.table.footerManager.active && !this.table.footerManager.external ? this.table.footerManager.getElement().getBoundingClientRect().height : 0));

          if (this.fixedHeight) {
            this.element.style.minHeight = "calc(100% - " + otherHeight + "px)";
            this.element.style.height = "calc(100% - " + otherHeight + "px)";
            this.element.style.maxHeight = "calc(100% - " + otherHeight + "px)";
          } else {
            this.element.style.height = "";
            this.element.style.height = this.table.element.clientHeight - otherHeight + "px";
            this.element.scrollTop = this.scrollTop;
          }

          this.renderer.resize(); //check if the table has changed size when dealing with variable height tables

          if (!this.fixedHeight && initialHeight != this.element.clientHeight) {
            if (this.subscribed("table-resize")) {
              this.dispatch("table-resize");
            } else {
              this.redraw();
            }
          }
        }

        this._positionPlaceholder();
      } //renitialize all rows

    }, {
      key: "reinitialize",
      value: function reinitialize() {
        this.rows.forEach(function (row) {
          row.reinitialize(true);
        });
      } //prevent table from being redrawn

    }, {
      key: "blockRedraw",
      value: function blockRedraw() {
        this.redrawBlock = true;
        this.redrawBlockRestoreConfig = false;
      } //restore table redrawing

    }, {
      key: "restoreRedraw",
      value: function restoreRedraw() {
        this.redrawBlock = false;

        if (this.redrawBlockRestoreConfig) {
          this.refreshActiveData(this.redrawBlockRestoreConfig.handler, this.redrawBlockRestoreConfig.skipStage, this.redrawBlockRestoreConfig.renderInPosition);
          this.redrawBlockRestoreConfig = false;
        } else {
          if (this.redrawBlockRenderInPosition) {
            this.reRenderInPosition();
          }
        }

        this.redrawBlockRenderInPosition = false;
      } //redraw table

    }, {
      key: "redraw",
      value: function redraw(force) {
        var left = this.scrollLeft;
        this.adjustTableSize();
        this.table.tableWidth = this.table.element.clientWidth;

        if (!force) {
          this.reRenderInPosition();
          this.scrollHorizontal(left);
        } else {
          this.renderTable();
        }
      }
    }, {
      key: "resetScroll",
      value: function resetScroll() {
        this.element.scrollLeft = 0;
        this.element.scrollTop = 0;

        if (this.table.browser === "ie") {
          var event = document.createEvent("Event");
          event.initEvent("scroll", false, true);
          this.element.dispatchEvent(event);
        } else {
          this.element.dispatchEvent(new Event('scroll'));
        }
      }
    }]);

    return RowManager;
  }(CoreFeature);

  var FooterManager = /*#__PURE__*/function (_CoreFeature) {
    _inherits(FooterManager, _CoreFeature);

    var _super = _createSuper(FooterManager);

    function FooterManager(table) {
      var _this;

      _classCallCheck(this, FooterManager);

      _this = _super.call(this, table);
      _this.active = false;
      _this.element = _this.createElement(); //containing element

      _this.containerElement = _this.createContainerElement(); //containing element

      _this.external = false;
      return _this;
    }

    _createClass(FooterManager, [{
      key: "initialize",
      value: function initialize() {
        this.initializeElement();
      }
    }, {
      key: "createElement",
      value: function createElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-footer");
        return el;
      }
    }, {
      key: "createContainerElement",
      value: function createContainerElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-footer-contents");
        this.element.appendChild(el);
        return el;
      }
    }, {
      key: "initializeElement",
      value: function initializeElement() {
        if (this.table.options.footerElement) {
          switch (_typeof(this.table.options.footerElement)) {
            case "string":
              if (this.table.options.footerElement[0] === "<") {
                this.containerElement.innerHTML = this.table.options.footerElement;
              } else {
                this.external = true;
                this.containerElement = document.querySelector(this.table.options.footerElement);
              }

              break;

            default:
              this.element = this.table.options.footerElement;
              break;
          }
        }
      }
    }, {
      key: "getElement",
      value: function getElement() {
        return this.element;
      }
    }, {
      key: "append",
      value: function append(element) {
        this.activate();
        this.containerElement.appendChild(element);
        this.table.rowManager.adjustTableSize();
      }
    }, {
      key: "prepend",
      value: function prepend(element) {
        this.activate();
        this.element.insertBefore(element, this.element.firstChild);
        this.table.rowManager.adjustTableSize();
      }
    }, {
      key: "remove",
      value: function remove(element) {
        element.parentNode.removeChild(element);
        this.deactivate();
      }
    }, {
      key: "deactivate",
      value: function deactivate(force) {
        if (!this.element.firstChild || force) {
          if (!this.external) {
            this.element.parentNode.removeChild(this.element);
          }

          this.active = false;
        }
      }
    }, {
      key: "activate",
      value: function activate() {
        if (!this.active) {
          this.active = true;

          if (!this.external) {
            this.table.element.appendChild(this.getElement());
            this.table.element.style.display = '';
          }
        }
      }
    }, {
      key: "redraw",
      value: function redraw() {
        this.dispatch("footer-redraw");
      }
    }]);

    return FooterManager;
  }(CoreFeature);

  var InteractionManager = /*#__PURE__*/function (_CoreFeature) {
    _inherits(InteractionManager, _CoreFeature);

    var _super = _createSuper(InteractionManager);

    function InteractionManager(table) {
      var _this;

      _classCallCheck(this, InteractionManager);

      _this = _super.call(this, table);
      _this.el = null;
      _this.abortClasses = ["tabulator-headers", "tabulator-table"];
      _this.previousTargets = {};
      _this.listeners = ["click", "dblclick", "contextmenu", "mouseenter", "mouseleave", "mouseover", "mouseout", "mousemove", "touchstart", "touchend"];
      _this.componentMap = {
        "tabulator-cell": "cell",
        "tabulator-row": "row",
        "tabulator-group": "group",
        "tabulator-col": "column"
      };
      _this.pseudoTrackers = {
        "row": {
          subscriber: null,
          target: null
        },
        "cell": {
          subscriber: null,
          target: null
        },
        "group": {
          subscriber: null,
          target: null
        },
        "column": {
          subscriber: null,
          target: null
        }
      };
      _this.pseudoTracking = false;
      return _this;
    }

    _createClass(InteractionManager, [{
      key: "initialize",
      value: function initialize() {
        this.el = this.table.element;
        this.buildListenerMap();
        this.bindSubscriptionWatchers();
      }
    }, {
      key: "buildListenerMap",
      value: function buildListenerMap() {
        var listenerMap = {};
        this.listeners.forEach(function (listener) {
          listenerMap[listener] = {
            handler: null,
            components: []
          };
        });
        this.listeners = listenerMap;
      }
    }, {
      key: "bindPseudoEvents",
      value: function bindPseudoEvents() {
        var _this2 = this;

        Object.keys(this.pseudoTrackers).forEach(function (key) {
          _this2.pseudoTrackers[key].subscriber = _this2.pseudoMouseEnter.bind(_this2, key);

          _this2.subscribe(key + "-mouseover", _this2.pseudoTrackers[key].subscriber);
        });
        this.pseudoTracking = true;
      }
    }, {
      key: "pseudoMouseEnter",
      value: function pseudoMouseEnter(key, e, target) {
        if (this.pseudoTrackers[key].target !== target) {
          if (this.pseudoTrackers[key].target) {
            this.dispatch(key + "-mouseleave", e, this.pseudoTrackers[key].target);
          }

          this.pseudoMouseLeave(key, e);
          this.pseudoTrackers[key].target = target;
          this.dispatch(key + "-mouseenter", e, target);
        }
      }
    }, {
      key: "pseudoMouseLeave",
      value: function pseudoMouseLeave(key, e) {
        var _this3 = this;

        var leaveList = Object.keys(this.pseudoTrackers),
            linkedKeys = {
          "row": ["cell"],
          "cell": ["row"]
        };
        leaveList = leaveList.filter(function (item) {
          var links = linkedKeys[key];
          return item !== key && (!links || links && !links.includes(item));
        });
        leaveList.forEach(function (key) {
          var target = _this3.pseudoTrackers[key].target;

          if (_this3.pseudoTrackers[key].target) {
            _this3.dispatch(key + "-mouseleave", e, target);

            _this3.pseudoTrackers[key].target = null;
          }
        });
      }
    }, {
      key: "bindSubscriptionWatchers",
      value: function bindSubscriptionWatchers() {
        var listeners = Object.keys(this.listeners),
            components = Object.values(this.componentMap);

        for (var _i = 0, _components = components; _i < _components.length; _i++) {
          var comp = _components[_i];

          var _iterator = _createForOfIteratorHelper(listeners),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var listener = _step.value;
              var key = comp + "-" + listener;
              this.subscriptionChange(key, this.subscriptionChanged.bind(this, comp, listener));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        this.subscribe("table-destroy", this.clearWatchers.bind(this));
      }
    }, {
      key: "subscriptionChanged",
      value: function subscriptionChanged(component, key, added) {
        var listener = this.listeners[key].components,
            index = listener.indexOf(component),
            changed = false;

        if (added) {
          if (index === -1) {
            listener.push(component);
            changed = true;
          }
        } else {
          if (!this.subscribed(component + "-" + key)) {
            if (index > -1) {
              listener.splice(index, 1);
              changed = true;
            }
          }
        }

        if ((key === "mouseenter" || key === "mouseleave") && !this.pseudoTracking) {
          this.bindPseudoEvents();
        }

        if (changed) {
          this.updateEventListeners();
        }
      }
    }, {
      key: "updateEventListeners",
      value: function updateEventListeners() {
        for (var key in this.listeners) {
          var listener = this.listeners[key];

          if (listener.components.length) {
            if (!listener.handler) {
              listener.handler = this.track.bind(this, key);
              this.el.addEventListener(key, listener.handler); // this.el.addEventListener(key, listener.handler, {passive: true})
            }
          } else {
            if (listener.handler) {
              this.el.removeEventListener(key, listener.handler);
              listener.handler = null;
            }
          }
        }
      }
    }, {
      key: "track",
      value: function track(type, e) {
        var path = e.composedPath && e.composedPath() || e.path;
        var targets = this.findTargets(path);
        targets = this.bindComponents(type, targets);
        this.triggerEvents(type, e, targets);

        if (this.pseudoTracking && (type == "mouseover" || type == "mouseleave") && !Object.keys(targets).length) {
          this.pseudoMouseLeave("none", e);
        }
      }
    }, {
      key: "findTargets",
      value: function findTargets(path) {
        var _this4 = this;

        var targets = {};
        var componentMap = Object.keys(this.componentMap);

        var _iterator2 = _createForOfIteratorHelper(path),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var el = _step2.value;
            var classList = el.classList ? _toConsumableArray(el.classList) : [];
            var abort = classList.filter(function (item) {
              return _this4.abortClasses.includes(item);
            });

            if (abort.length) {
              break;
            }

            var elTargets = classList.filter(function (item) {
              return componentMap.includes(item);
            });

            var _iterator3 = _createForOfIteratorHelper(elTargets),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var target = _step3.value;
                targets[this.componentMap[target]] = el;
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (targets.group && targets.group === targets.row) {
          delete targets.row;
        }

        return targets;
      }
    }, {
      key: "bindComponents",
      value: function bindComponents(type, targets) {
        var _this5 = this;

        //ensure row component is looked up before cell
        var keys = Object.keys(targets).reverse(),
            listener = this.listeners[type],
            targetMatches = {};

        var _iterator4 = _createForOfIteratorHelper(keys),
            _step4;

        try {
          var _loop = function _loop() {
            var key = _step4.value;
            var component = void 0;
            var target = targets[key];
            var previousTarget = _this5.previousTargets[key];

            if (previousTarget && previousTarget.target === target) {
              component = previousTarget.component;
            } else {
              switch (key) {
                case "row":
                case "group":
                  if (listener.components.includes("row") || listener.components.includes("cell") || listener.components.includes("group")) {
                    var rows = _this5.table.rowManager.getVisibleRows(true);

                    component = rows.find(function (row) {
                      return row.getElement() === target;
                    });

                    if (targets["row"] && targets["row"].parentNode && targets["row"].parentNode.closest(".tabulator-row")) {
                      targets[key] = false;
                    }
                  }

                  break;

                case "column":
                  if (listener.components.includes("column")) {
                    component = _this5.table.columnManager.findColumn(target);
                  }

                  break;

                case "cell":
                  if (listener.components.includes("cell")) {
                    if (targets["row"] instanceof Row) {
                      component = targets["row"].findCell(target);
                    } else {
                      if (targets["row"]) {
                        console.warn("Event Target Lookup Error - The row this cell is attached to cannot be found, has the table been reinitialized without being destroyed first?");
                      }
                    }
                  }

                  break;
              }
            }

            if (component) {
              targets[key] = component;
              targetMatches[key] = {
                target: target,
                component: component
              };
            }
          };

          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        this.previousTargets = targetMatches;
        return targets;
      }
    }, {
      key: "triggerEvents",
      value: function triggerEvents(type, e, targets) {
        var listener = this.listeners[type];

        for (var key in targets) {
          if (targets[key] && listener.components.includes(key)) {
            this.dispatch(key + "-" + type, e, targets[key]);
          }
        }
      }
    }, {
      key: "clearWatchers",
      value: function clearWatchers() {
        for (var key in this.listeners) {
          var listener = this.listeners[key];

          if (listener.handler) {
            this.el.removeEventListener(key, listener.handler);
            listener.handler = null;
          }
        }
      }
    }]);

    return InteractionManager;
  }(CoreFeature);

  var ComponentFunctionBinder = /*#__PURE__*/function () {
    function ComponentFunctionBinder(table) {
      _classCallCheck(this, ComponentFunctionBinder);

      this.table = table;
      this.bindings = {};
    }

    _createClass(ComponentFunctionBinder, [{
      key: "bind",
      value: function bind(type, funcName, handler) {
        if (!this.bindings[type]) {
          this.bindings[type] = {};
        }

        if (this.bindings[type][funcName]) {
          console.warn("Unable to bind component handler, a matching function name is already bound", type, funcName, handler);
        } else {
          this.bindings[type][funcName] = handler;
        }
      }
    }, {
      key: "handle",
      value: function handle(type, component, name) {
        if (this.bindings[type] && this.bindings[type][name] && typeof this.bindings[type][name].bind === 'function') {
          return this.bindings[type][name].bind(null, component);
        } else {
          if (name !== "then" && typeof name === "string" && !name.startsWith("_")) {
            console.error("The " + type + " component does not have a " + name + " function, have you checked that you have the correct Tabulator module installed?");
          }
        }
      }
    }]);

    return ComponentFunctionBinder;
  }();

  var DataLoader = /*#__PURE__*/function (_CoreFeature) {
    _inherits(DataLoader, _CoreFeature);

    var _super = _createSuper(DataLoader);

    function DataLoader(table) {
      var _this;

      _classCallCheck(this, DataLoader);

      _this = _super.call(this, table);
      _this.requestOrder = 0; //prevent requests coming out of sequence if overridden by another load request

      _this.loading = false;
      return _this;
    }

    _createClass(DataLoader, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "load",
      value: function load(data, params, config, replace, silent, columnsChanged) {
        var _this2 = this;

        var requestNo = ++this.requestOrder;
        this.dispatchExternal("dataLoading", data); //parse json data to array

        if (data && (data.indexOf("{") == 0 || data.indexOf("[") == 0)) {
          data = JSON.parse(data);
        }

        if (this.confirm("data-loading", [data, params, config, silent])) {
          this.loading = true;

          if (!silent) {
            this.alertLoader();
          } //get params for request


          params = this.chain("data-params", [data, config, silent], params || {}, params || {});
          params = this.mapParams(params, this.table.options.dataSendParams);
          var result = this.chain("data-load", [data, params, config, silent], false, Promise.resolve([]));
          return result.then(function (response) {
            if (!Array.isArray(response) && _typeof(response) == "object") {
              response = _this2.mapParams(response, _this2.objectInvert(_this2.table.options.dataReceiveParams));
            }

            var rowData = _this2.chain("data-loaded", response, null, response);

            if (requestNo == _this2.requestOrder) {
              _this2.clearAlert();

              if (rowData !== false) {
                _this2.dispatchExternal("dataLoaded", rowData);

                _this2.table.rowManager.setData(rowData, replace, typeof columnsChanged === "undefined" ? !replace : columnsChanged);
              }
            } else {
              console.warn("Data Load Response Blocked - An active data load request was blocked by an attempt to change table data while the request was being made");
            }
          })["catch"](function (error) {
            console.error("Data Load Error: ", error);

            _this2.dispatchExternal("dataLoadError", error);

            if (!silent) {
              _this2.alertError();
            }

            setTimeout(function () {
              _this2.clearAlert();
            }, _this2.table.options.dataLoaderErrorTimeout);
          })["finally"](function () {
            _this2.loading = false;
          });
        } else {
          this.dispatchExternal("dataLoaded", data);

          if (!data) {
            data = [];
          }

          this.table.rowManager.setData(data, replace, typeof columnsChanged === "undefined" ? !replace : columnsChanged);
          return Promise.resolve();
        }
      }
    }, {
      key: "mapParams",
      value: function mapParams(params, map) {
        var output = {};

        for (var key in params) {
          output[map.hasOwnProperty(key) ? map[key] : key] = params[key];
        }

        return output;
      }
    }, {
      key: "objectInvert",
      value: function objectInvert(obj) {
        var output = {};

        for (var key in obj) {
          output[obj[key]] = key;
        }

        return output;
      }
    }, {
      key: "blockActiveLoad",
      value: function blockActiveLoad() {
        this.requestOrder++;
      }
    }, {
      key: "alertLoader",
      value: function alertLoader() {
        var shouldLoad = typeof this.table.options.dataLoader === "function" ? this.table.options.dataLoader() : this.table.options.dataLoader;

        if (shouldLoad) {
          this.table.alertManager.alert(this.table.options.dataLoaderLoading || this.langText("data|loading"));
        }
      }
    }, {
      key: "alertError",
      value: function alertError() {
        this.table.alertManager.alert(this.table.options.dataLoaderError || this.langText("data|error"), "error");
      }
    }, {
      key: "clearAlert",
      value: function clearAlert() {
        this.table.alertManager.clear();
      }
    }]);

    return DataLoader;
  }(CoreFeature);

  var ExternalEventBus = /*#__PURE__*/function () {
    function ExternalEventBus(table, optionsList, debug) {
      _classCallCheck(this, ExternalEventBus);

      this.table = table;
      this.events = {};
      this.optionsList = optionsList || {};
      this.subscriptionNotifiers = {};
      this.dispatch = debug ? this._debugDispatch.bind(this) : this._dispatch.bind(this);
      this.debug = debug;
    }

    _createClass(ExternalEventBus, [{
      key: "subscriptionChange",
      value: function subscriptionChange(key, callback) {
        if (!this.subscriptionNotifiers[key]) {
          this.subscriptionNotifiers[key] = [];
        }

        this.subscriptionNotifiers[key].push(callback);

        if (this.subscribed(key)) {
          this._notifiySubscriptionChange(key, true);
        }
      }
    }, {
      key: "subscribe",
      value: function subscribe(key, callback) {
        if (!this.events[key]) {
          this.events[key] = [];
        }

        this.events[key].push(callback);

        this._notifiySubscriptionChange(key, true);
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe(key, callback) {
        var index;

        if (this.events[key]) {
          if (callback) {
            index = this.events[key].findIndex(function (item) {
              return item === callback;
            });

            if (index > -1) {
              this.events[key].splice(index, 1);
            } else {
              console.warn("Cannot remove event, no matching event found:", key, callback);
              return;
            }
          } else {
            delete this.events[key];
          }
        } else {
          console.warn("Cannot remove event, no events set on:", key);
          return;
        }

        this._notifiySubscriptionChange(key, false);
      }
    }, {
      key: "subscribed",
      value: function subscribed(key) {
        return this.events[key] && this.events[key].length;
      }
    }, {
      key: "_notifiySubscriptionChange",
      value: function _notifiySubscriptionChange(key, subscribed) {
        var notifiers = this.subscriptionNotifiers[key];

        if (notifiers) {
          notifiers.forEach(function (callback) {
            callback(subscribed);
          });
        }
      }
    }, {
      key: "_dispatch",
      value: function _dispatch() {
        var _this = this;

        var args = Array.from(arguments),
            key = args.shift(),
            result;

        if (this.events[key]) {
          this.events[key].forEach(function (callback, i) {
            var callResult = callback.apply(_this.table, args);

            if (!i) {
              result = callResult;
            }
          });
        }

        return result;
      }
    }, {
      key: "_debugDispatch",
      value: function _debugDispatch() {
        var args = Array.from(arguments),
            key = args[0];
        args[0] = "ExternalEvent:" + args[0];

        if (this.debug === true || this.debug.includes(key)) {
          var _console;

          (_console = console).log.apply(_console, _toConsumableArray(args));
        }

        return this._dispatch.apply(this, arguments);
      }
    }]);

    return ExternalEventBus;
  }();

  var InternalEventBus = /*#__PURE__*/function () {
    function InternalEventBus(debug) {
      _classCallCheck(this, InternalEventBus);

      this.events = {};
      this.subscriptionNotifiers = {};
      this.dispatch = debug ? this._debugDispatch.bind(this) : this._dispatch.bind(this);
      this.chain = debug ? this._debugChain.bind(this) : this._chain.bind(this);
      this.confirm = debug ? this._debugConfirm.bind(this) : this._confirm.bind(this);
      this.debug = debug;
    }

    _createClass(InternalEventBus, [{
      key: "subscriptionChange",
      value: function subscriptionChange(key, callback) {
        if (!this.subscriptionNotifiers[key]) {
          this.subscriptionNotifiers[key] = [];
        }

        this.subscriptionNotifiers[key].push(callback);

        if (this.subscribed(key)) {
          this._notifiySubscriptionChange(key, true);
        }
      }
    }, {
      key: "subscribe",
      value: function subscribe(key, callback) {
        var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;

        if (!this.events[key]) {
          this.events[key] = [];
        }

        this.events[key].push({
          callback: callback,
          priority: priority
        });
        this.events[key].sort(function (a, b) {
          return a.priority - b.priority;
        });

        this._notifiySubscriptionChange(key, true);
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe(key, callback) {
        var index;

        if (this.events[key]) {
          if (callback) {
            index = this.events[key].findIndex(function (item) {
              return item.callback === callback;
            });

            if (index > -1) {
              this.events[key].splice(index, 1);
            } else {
              console.warn("Cannot remove event, no matching event found:", key, callback);
              return;
            }
          }
        } else {
          console.warn("Cannot remove event, no events set on:", key);
          return;
        }

        this._notifiySubscriptionChange(key, false);
      }
    }, {
      key: "subscribed",
      value: function subscribed(key) {
        return this.events[key] && this.events[key].length;
      }
    }, {
      key: "_chain",
      value: function _chain(key, args, initialValue, fallback) {
        var _this = this;

        var value = initialValue;

        if (!Array.isArray(args)) {
          args = [args];
        }

        if (this.subscribed(key)) {
          this.events[key].forEach(function (subscriber, i) {
            value = subscriber.callback.apply(_this, args.concat([value]));
          });
          return value;
        } else {
          return typeof fallback === "function" ? fallback() : fallback;
        }
      }
    }, {
      key: "_confirm",
      value: function _confirm(key, args) {
        var _this2 = this;

        var confirmed = false;

        if (!Array.isArray(args)) {
          args = [args];
        }

        if (this.subscribed(key)) {
          this.events[key].forEach(function (subscriber, i) {
            if (subscriber.callback.apply(_this2, args)) {
              confirmed = true;
            }
          });
        }

        return confirmed;
      }
    }, {
      key: "_notifiySubscriptionChange",
      value: function _notifiySubscriptionChange(key, subscribed) {
        var notifiers = this.subscriptionNotifiers[key];

        if (notifiers) {
          notifiers.forEach(function (callback) {
            callback(subscribed);
          });
        }
      }
    }, {
      key: "_dispatch",
      value: function _dispatch() {
        var _this3 = this;

        var args = Array.from(arguments),
            key = args.shift();

        if (this.events[key]) {
          this.events[key].forEach(function (subscriber) {
            var callResult = subscriber.callback.apply(_this3, args);
          });
        }
      }
    }, {
      key: "_debugDispatch",
      value: function _debugDispatch() {
        var args = Array.from(arguments),
            key = args[0];
        args[0] = "InternalEvent:" + key;

        if (this.debug === true || this.debug.includes(key)) {
          var _console;

          (_console = console).log.apply(_console, _toConsumableArray(args));
        }

        return this._dispatch.apply(this, arguments);
      }
    }, {
      key: "_debugChain",
      value: function _debugChain() {
        var args = Array.from(arguments),
            key = args[0];
        args[0] = "InternalEvent:" + key;

        if (this.debug === true || this.debug.includes(key)) {
          var _console2;

          (_console2 = console).log.apply(_console2, _toConsumableArray(args));
        }

        return this._chain.apply(this, arguments);
      }
    }, {
      key: "_debugConfirm",
      value: function _debugConfirm() {
        var args = Array.from(arguments),
            key = args[0];
        args[0] = "InternalEvent:" + key;

        if (this.debug === true || this.debug.includes(key)) {
          var _console3;

          (_console3 = console).log.apply(_console3, _toConsumableArray(args));
        }

        return this._confirm.apply(this, arguments);
      }
    }]);

    return InternalEventBus;
  }();

  var TableRegistry = /*#__PURE__*/function () {
    function TableRegistry() {
      _classCallCheck(this, TableRegistry);
    }

    _createClass(TableRegistry, null, [{
      key: "register",
      value: function register(table) {
        TableRegistry.tables.push(table);
      }
    }, {
      key: "deregister",
      value: function deregister(table) {
        var index = TableRegistry.tables.indexOf(table);

        if (index > -1) {
          TableRegistry.tables.splice(index, 1);
        }
      }
    }, {
      key: "lookupTable",
      value: function lookupTable(query, silent) {
        var results = [],
            matches,
            match;

        if (typeof query === "string") {
          matches = document.querySelectorAll(query);

          if (matches.length) {
            for (var i = 0; i < matches.length; i++) {
              match = TableRegistry.matchElement(matches[i]);

              if (match) {
                results.push(match);
              }
            }
          }
        } else if (typeof HTMLElement !== "undefined" && query instanceof HTMLElement || query instanceof Tabulator) {
          match = TableRegistry.matchElement(query);

          if (match) {
            results.push(match);
          }
        } else if (Array.isArray(query)) {
          query.forEach(function (item) {
            results = results.concat(TableRegistry.lookupTable(item));
          });
        } else {
          if (!silent) {
            console.warn("Table Connection Error - Invalid Selector", query);
          }
        }

        return results;
      }
    }, {
      key: "matchElement",
      value: function matchElement(element) {
        return TableRegistry.tables.find(function (table) {
          return element instanceof Tabulator ? table === element : table.element === element;
        });
      }
    }]);

    return TableRegistry;
  }();

  TableRegistry.tables = [];

  var Popup = /*#__PURE__*/function (_CoreFeature) {
    _inherits(Popup, _CoreFeature);

    var _super = _createSuper(Popup);

    function Popup(table, element, parent) {
      var _this;

      _classCallCheck(this, Popup);

      _this = _super.call(this, table);
      _this.element = element;
      _this.container = _this._lookupContainer();
      _this.parent = parent;
      _this.reversedX = false;
      _this.childPopup = null;
      _this.blurable = false;
      _this.blurCallback = null;
      _this.renderedCallback = null;
      _this.visible = false;

      _this.element.classList.add("tabulator-popup-container");

      _this.blurEvent = _this.hide.bind(_assertThisInitialized(_this), false);
      _this.escEvent = _this._escapeCheck.bind(_assertThisInitialized(_this));
      _this.destroyBinding = _this.tableDestroyed;
      _this.destroyed = false;
      return _this;
    }

    _createClass(Popup, [{
      key: "tableDestroyed",
      value: function tableDestroyed() {
        this.destroyed = true;
        this.hide(true);
      }
    }, {
      key: "_lookupContainer",
      value: function _lookupContainer() {
        var container = this.table.options.popupContainer;

        if (typeof container === "string") {
          container = document.querySelector(container);

          if (!container) {
            console.warn("Menu Error - no container element found matching selector:", this.table.options.popupContainer, "(defaulting to document body)");
          }
        } else if (container === true) {
          container = this.table.element;
        }

        if (container && !this._checkContainerIsParent(container)) {
          container = false;
          console.warn("Menu Error - container element does not contain this table:", this.table.options.popupContainer, "(defaulting to document body)");
        }

        if (!container) {
          container = document.body;
        }

        return container;
      }
    }, {
      key: "_checkContainerIsParent",
      value: function _checkContainerIsParent(container) {
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.table.element;

        if (container === element) {
          return true;
        } else {
          return element.parentNode ? this._checkContainerIsParent(container, element.parentNode) : false;
        }
      }
    }, {
      key: "renderCallback",
      value: function renderCallback(callback) {
        this.renderedCallback = callback;
      }
    }, {
      key: "containerEventCoords",
      value: function containerEventCoords(e) {
        var touch = !(e instanceof MouseEvent);
        var x = touch ? e.touches[0].pageX : e.pageX;
        var y = touch ? e.touches[0].pageY : e.pageY;

        if (this.container !== document.body) {
          var parentOffset = Helpers.elOffset(this.container);
          x -= parentOffset.left;
          y -= parentOffset.top;
        }

        return {
          x: x,
          y: y
        };
      }
    }, {
      key: "elementPositionCoords",
      value: function elementPositionCoords(element) {
        var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "right";
        var offset = Helpers.elOffset(element),
            containerOffset,
            x,
            y;

        if (this.container !== document.body) {
          containerOffset = Helpers.elOffset(this.container);
          offset.left -= containerOffset.left;
          offset.top -= containerOffset.top;
        }

        switch (position) {
          case "right":
            x = offset.left + element.offsetWidth;
            y = offset.top - 1;
            break;

          case "bottom":
            x = offset.left;
            y = offset.top + element.offsetHeight;
            break;
        }

        return {
          x: x,
          y: y,
          offset: offset
        };
      }
    }, {
      key: "show",
      value: function show(origin, position) {
        var x, y, parentEl, parentOffset, coords;

        if (this.destroyed || this.table.destroyed) {
          return this;
        }

        if (origin instanceof HTMLElement) {
          parentEl = origin;
          coords = this.elementPositionCoords(origin, position);
          parentOffset = coords.offset;
          x = coords.x;
          y = coords.y;
        } else if (typeof origin === "number") {
          parentOffset = {
            top: 0,
            left: 0
          };
          x = origin;
          y = position;
        } else {
          coords = this.containerEventCoords(origin);
          x = coords.x;
          y = coords.y;
          this.reversedX = false;
        }

        this.element.style.top = y + "px";
        this.element.style.left = x + "px";
        this.container.appendChild(this.element);

        if (typeof this.renderedCallback === "function") {
          this.renderedCallback();
        }

        this._fitToScreen(x, y, parentEl, parentOffset, position);

        this.visible = true;
        this.subscribe("table-destroy", this.destroyBinding);
        this.element.addEventListener("mousedown", function (e) {
          e.stopPropagation();
        });
        return this;
      }
    }, {
      key: "_fitToScreen",
      value: function _fitToScreen(x, y, parentEl, parentOffset, position) {
        var scrollTop = this.container === document.body ? document.documentElement.scrollTop : this.container.scrollTop; //move menu to start on right edge if it is too close to the edge of the screen

        if (x + this.element.offsetWidth >= this.container.offsetWidth || this.reversedX) {
          this.element.style.left = "";

          if (parentEl) {
            this.element.style.right = this.container.offsetWidth - parentOffset.left + "px";
          } else {
            this.element.style.right = this.container.offsetWidth - x + "px";
          }

          this.reversedX = true;
        } //move menu to start on bottom edge if it is too close to the edge of the screen


        if (y + this.element.offsetHeight > Math.max(this.container.offsetHeight, scrollTop ? this.container.scrollHeight : 0)) {
          if (parentEl) {
            switch (position) {
              case "bottom":
                this.element.style.top = parseInt(this.element.style.top) - this.element.offsetHeight - parentEl.offsetHeight - 1 + "px";
                break;

              default:
                this.element.style.top = parseInt(this.element.style.top) - this.element.offsetHeight + parentEl.offsetHeight + 1 + "px";
            }
          } else {
            this.element.style.top = parseInt(this.element.style.top) - this.element.offsetHeight + "px";
          }
        }
      }
    }, {
      key: "isVisible",
      value: function isVisible() {
        return this.visible;
      }
    }, {
      key: "hideOnBlur",
      value: function hideOnBlur(callback) {
        var _this2 = this;

        this.blurable = true;

        if (this.visible) {
          setTimeout(function () {
            _this2.table.rowManager.element.addEventListener("scroll", _this2.blurEvent);

            _this2.subscribe("cell-editing", _this2.blurEvent);

            document.body.addEventListener("click", _this2.blurEvent);
            document.body.addEventListener("contextmenu", _this2.blurEvent);
            document.body.addEventListener("mousedown", _this2.blurEvent);
            window.addEventListener("resize", _this2.blurEvent);
            document.body.addEventListener("keydown", _this2.escEvent);
          }, 100);
          this.blurCallback = callback;
        }

        return this;
      }
    }, {
      key: "_escapeCheck",
      value: function _escapeCheck(e) {
        if (e.keyCode == 27) {
          this.hide();
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (this.visible) {
          if (this.blurable) {
            document.body.removeEventListener("keydown", this.escEvent);
            document.body.removeEventListener("click", this.blurEvent);
            document.body.removeEventListener("contextmenu", this.blurEvent);
            document.body.removeEventListener("mousedown", this.blurEvent);
            window.removeEventListener("resize", this.blurEvent);
            this.table.rowManager.element.removeEventListener("scroll", this.blurEvent);
            this.unsubscribe("cell-editing", this.blurEvent);
          }

          if (this.childPopup) {
            this.childPopup.hide();
          }

          if (this.parent) {
            this.parent.childPopup = null;
          }

          if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }

          this.visible = false;

          if (this.blurCallback && !silent) {
            this.blurCallback();
          }

          this.unsubscribe("table-destroy", this.destroyBinding);
        }

        return this;
      }
    }, {
      key: "child",
      value: function child(element) {
        if (this.childPopup) {
          this.childPopup.hide();
        }

        this.childPopup = new Popup(this.table, element, this);
        return this.childPopup;
      }
    }]);

    return Popup;
  }(CoreFeature);

  var Module = /*#__PURE__*/function (_CoreFeature) {
    _inherits(Module, _CoreFeature);

    var _super = _createSuper(Module);

    function Module(table, name) {
      var _this;

      _classCallCheck(this, Module);

      _this = _super.call(this, table);
      _this._handler = null;
      return _this;
    }

    _createClass(Module, [{
      key: "initialize",
      value: function initialize() {// setup module when table is initialized, to be overriden in module
      } ///////////////////////////////////
      ////// Options Registration ///////
      ///////////////////////////////////

    }, {
      key: "registerTableOption",
      value: function registerTableOption(key, value) {
        this.table.optionsList.register(key, value);
      }
    }, {
      key: "registerColumnOption",
      value: function registerColumnOption(key, value) {
        this.table.columnManager.optionsList.register(key, value);
      } ///////////////////////////////////
      /// Public Function Registration ///
      ///////////////////////////////////

    }, {
      key: "registerTableFunction",
      value: function registerTableFunction(name, func) {
        var _this2 = this;

        if (typeof this.table[name] === "undefined") {
          this.table[name] = function () {
            _this2.table.initGuard(name);

            return func.apply(void 0, arguments);
          };
        } else {
          console.warn("Unable to bind table function, name already in use", name);
        }
      }
    }, {
      key: "registerComponentFunction",
      value: function registerComponentFunction(component, func, handler) {
        return this.table.componentFunctionBinder.bind(component, func, handler);
      } ///////////////////////////////////
      ////////// Data Pipeline //////////
      ///////////////////////////////////

    }, {
      key: "registerDataHandler",
      value: function registerDataHandler(handler, priority) {
        this.table.rowManager.registerDataPipelineHandler(handler, priority);
        this._handler = handler;
      }
    }, {
      key: "registerDisplayHandler",
      value: function registerDisplayHandler(handler, priority) {
        this.table.rowManager.registerDisplayPipelineHandler(handler, priority);
        this._handler = handler;
      }
    }, {
      key: "refreshData",
      value: function refreshData(renderInPosition, handler) {
        if (!handler) {
          handler = this._handler;
        }

        if (handler) {
          this.table.rowManager.refreshActiveData(handler, false, renderInPosition);
        }
      } ///////////////////////////////////
      //////// Footer Management ////////
      ///////////////////////////////////

    }, {
      key: "footerAppend",
      value: function footerAppend(element) {
        return this.table.footerManager.append(element);
      }
    }, {
      key: "footerPrepend",
      value: function footerPrepend(element) {
        return this.table.footerManager.prepend(element);
      }
    }, {
      key: "footerRemove",
      value: function footerRemove(element) {
        return this.table.footerManager.remove(element);
      } ///////////////////////////////////
      //////// Popups Management ////////
      ///////////////////////////////////

    }, {
      key: "popup",
      value: function popup(menuEl, menuContainer) {
        return new Popup(this.table, menuEl, menuContainer);
      } ///////////////////////////////////
      //////// Alert Management ////////
      ///////////////////////////////////

    }, {
      key: "alert",
      value: function alert(content, type) {
        return this.table.alertManager.alert(content, type);
      }
    }, {
      key: "clearAlert",
      value: function clearAlert() {
        return this.table.alertManager.clear();
      }
    }]);

    return Module;
  }(CoreFeature);

  //resize columns to fit data they contain
  function fitData (columns) {
    this.table.columnManager.renderer.reinitializeColumnWidths(columns);

    if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {
      this.table.modules.responsiveLayout.update();
    }
  }

  //resize columns to fit data they contain and stretch row to fill table, also used for fitDataTable
  function fitDataGeneral (columns) {
    columns.forEach(function (column) {
      column.reinitializeWidth();
    });

    if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {
      this.table.modules.responsiveLayout.update();
    }
  }

  //resize columns to fit data the contain and stretch last column to fill table
  function fitDataStretch (columns) {
    var _this = this;

    var colsWidth = 0,
        tableWidth = this.table.rowManager.element.clientWidth,
        gap = 0,
        lastCol = false;
    columns.forEach(function (column, i) {
      if (!column.widthFixed) {
        column.reinitializeWidth();
      }

      if (_this.table.options.responsiveLayout ? column.modules.responsive.visible : column.visible) {
        lastCol = column;
      }

      if (column.visible) {
        colsWidth += column.getWidth();
      }
    });

    if (lastCol) {
      gap = tableWidth - colsWidth + lastCol.getWidth();

      if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {
        lastCol.setWidth(0);
        this.table.modules.responsiveLayout.update();
      }

      if (gap > 0) {
        lastCol.setWidth(gap);
      } else {
        lastCol.reinitializeWidth();
      }
    } else {
      if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {
        this.table.modules.responsiveLayout.update();
      }
    }
  }

  //resize columns to fit
  function fitColumns (columns) {
    var totalWidth = this.table.element.clientWidth; //table element width

    var fixedWidth = 0; //total width of columns with a defined width

    var flexWidth = 0; //total width available to flexible columns

    var flexGrowUnits = 0; //total number of widthGrow blocks accross all columns

    var flexColWidth = 0; //desired width of flexible columns

    var flexColumns = []; //array of flexible width columns

    var fixedShrinkColumns = []; //array of fixed width columns that can shrink

    var flexShrinkUnits = 0; //total number of widthShrink blocks accross all columns

    var overflowWidth = 0; //horizontal overflow width

    var gapFill = 0; //number of pixels to be added to final column to close and half pixel gaps

    function calcWidth(width) {
      var colWidth;

      if (typeof width == "string") {
        if (width.indexOf("%") > -1) {
          colWidth = totalWidth / 100 * parseInt(width);
        } else {
          colWidth = parseInt(width);
        }
      } else {
        colWidth = width;
      }

      return colWidth;
    } //ensure columns resize to take up the correct amount of space


    function scaleColumns(columns, freeSpace, colWidth, shrinkCols) {
      var oversizeCols = [],
          oversizeSpace = 0,
          remainingSpace = 0,
          nextColWidth = 0,
          remainingFlexGrowUnits = flexGrowUnits,
          gap = 0,
          changeUnits = 0,
          undersizeCols = [];

      function calcGrow(col) {
        return colWidth * (col.column.definition.widthGrow || 1);
      }

      function calcShrink(col) {
        return calcWidth(col.width) - colWidth * (col.column.definition.widthShrink || 0);
      }

      columns.forEach(function (col, i) {
        var width = shrinkCols ? calcShrink(col) : calcGrow(col);

        if (col.column.minWidth >= width) {
          oversizeCols.push(col);
        } else {
          if (col.column.maxWidth && col.column.maxWidth < width) {
            col.width = col.column.maxWidth;
            freeSpace -= col.column.maxWidth;
            remainingFlexGrowUnits -= shrinkCols ? col.column.definition.widthShrink || 1 : col.column.definition.widthGrow || 1;

            if (remainingFlexGrowUnits) {
              colWidth = Math.floor(freeSpace / remainingFlexGrowUnits);
            }
          } else {
            undersizeCols.push(col);
            changeUnits += shrinkCols ? col.column.definition.widthShrink || 1 : col.column.definition.widthGrow || 1;
          }
        }
      });

      if (oversizeCols.length) {
        oversizeCols.forEach(function (col) {
          oversizeSpace += shrinkCols ? col.width - col.column.minWidth : col.column.minWidth;
          col.width = col.column.minWidth;
        });
        remainingSpace = freeSpace - oversizeSpace;
        nextColWidth = changeUnits ? Math.floor(remainingSpace / changeUnits) : remainingSpace;
        gap = remainingSpace - nextColWidth * changeUnits;
        gap += scaleColumns(undersizeCols, remainingSpace, nextColWidth, shrinkCols);
      } else {
        gap = changeUnits ? freeSpace - Math.floor(freeSpace / changeUnits) * changeUnits : freeSpace;
        undersizeCols.forEach(function (column) {
          column.width = shrinkCols ? calcShrink(column) : calcGrow(column);
        });
      }

      return gap;
    }

    if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {
      this.table.modules.responsiveLayout.update();
    } //adjust for vertical scrollbar if present


    if (this.table.rowManager.element.scrollHeight > this.table.rowManager.element.clientHeight) {
      totalWidth -= this.table.rowManager.element.offsetWidth - this.table.rowManager.element.clientWidth;
    }

    columns.forEach(function (column) {
      var width, minWidth, colWidth;

      if (column.visible) {
        width = column.definition.width;
        minWidth = parseInt(column.minWidth);

        if (width) {
          colWidth = calcWidth(width);
          fixedWidth += colWidth > minWidth ? colWidth : minWidth;

          if (column.definition.widthShrink) {
            fixedShrinkColumns.push({
              column: column,
              width: colWidth > minWidth ? colWidth : minWidth
            });
            flexShrinkUnits += column.definition.widthShrink;
          }
        } else {
          flexColumns.push({
            column: column,
            width: 0
          });
          flexGrowUnits += column.definition.widthGrow || 1;
        }
      }
    }); //calculate available space

    flexWidth = totalWidth - fixedWidth; //calculate correct column size

    flexColWidth = Math.floor(flexWidth / flexGrowUnits); //generate column widths

    var gapFill = scaleColumns(flexColumns, flexWidth, flexColWidth, false); //increase width of last column to account for rounding errors

    if (flexColumns.length && gapFill > 0) {
      flexColumns[flexColumns.length - 1].width += +gapFill;
    } //caculate space for columns to be shrunk into


    flexColumns.forEach(function (col) {
      flexWidth -= col.width;
    });
    overflowWidth = Math.abs(gapFill) + flexWidth; //shrink oversize columns if there is no available space

    if (overflowWidth > 0 && flexShrinkUnits) {
      gapFill = scaleColumns(fixedShrinkColumns, overflowWidth, Math.floor(overflowWidth / flexShrinkUnits), true);
    } //decrease width of last column to account for rounding errors


    if (fixedShrinkColumns.length) {
      fixedShrinkColumns[fixedShrinkColumns.length - 1].width -= gapFill;
    }

    flexColumns.forEach(function (col) {
      col.column.setWidth(col.width);
    });
    fixedShrinkColumns.forEach(function (col) {
      col.column.setWidth(col.width);
    });
  }

  var defaultModes = {
    fitData: fitData,
    fitDataFill: fitDataGeneral,
    fitDataTable: fitDataGeneral,
    fitDataStretch: fitDataStretch,
    fitColumns: fitColumns
  };

  var Layout = /*#__PURE__*/function (_Module) {
    _inherits(Layout, _Module);

    var _super = _createSuper(Layout);

    function Layout(table) {
      var _this;

      _classCallCheck(this, Layout);

      _this = _super.call(this, table, "layout");
      _this.mode = null;

      _this.registerTableOption("layout", "fitData"); //layout type


      _this.registerTableOption("layoutColumnsOnNewData", false); //update column widths on setData


      _this.registerColumnOption("widthGrow");

      _this.registerColumnOption("widthShrink");

      return _this;
    } //initialize layout system


    _createClass(Layout, [{
      key: "initialize",
      value: function initialize() {
        var layout = this.table.options.layout;

        if (Layout.modes[layout]) {
          this.mode = layout;
        } else {
          console.warn("Layout Error - invalid mode set, defaulting to 'fitData' : " + layout);
          this.mode = 'fitData';
        }

        this.table.element.setAttribute("tabulator-layout", this.mode);
      }
    }, {
      key: "getMode",
      value: function getMode() {
        return this.mode;
      } //trigger table layout

    }, {
      key: "layout",
      value: function layout() {
        this.dispatch("layout-refreshing");
        Layout.modes[this.mode].call(this, this.table.columnManager.columnsByIndex);
        this.dispatch("layout-refreshed");
      }
    }]);

    return Layout;
  }(Module);

  Layout.moduleName = "layout"; //load defaults

  Layout.modes = defaultModes;

  var defaultLangs = {
    "default": {
      //hold default locale text
      "groups": {
        "item": "item",
        "items": "items"
      },
      "columns": {},
      "data": {
        "loading": "Loading",
        "error": "Error"
      },
      "pagination": {
        "page_size": "Page Size",
        "page_title": "Show Page",
        "first": "First",
        "first_title": "First Page",
        "last": "Last",
        "last_title": "Last Page",
        "prev": "Prev",
        "prev_title": "Prev Page",
        "next": "Next",
        "next_title": "Next Page",
        "all": "All",
        "counter": {
          "showing": "Showing",
          "of": "of",
          "rows": "rows",
          "pages": "pages"
        }
      },
      "headerFilters": {
        "default": "filter column...",
        "columns": {}
      }
    }
  };

  var Localize = /*#__PURE__*/function (_Module) {
    _inherits(Localize, _Module);

    var _super = _createSuper(Localize);

    function Localize(table) {
      var _this;

      _classCallCheck(this, Localize);

      _this = _super.call(this, table);
      _this.locale = "default"; //current locale

      _this.lang = false; //current language

      _this.bindings = {}; //update events to call when locale is changed

      _this.langList = {};

      _this.registerTableOption("locale", false); //current system language


      _this.registerTableOption("langs", {});

      return _this;
    }

    _createClass(Localize, [{
      key: "initialize",
      value: function initialize() {
        this.langList = Helpers.deepClone(Localize.langs);

        if (this.table.options.columnDefaults.headerFilterPlaceholder !== false) {
          this.setHeaderFilterPlaceholder(this.table.options.columnDefaults.headerFilterPlaceholder);
        }

        for (var locale in this.table.options.langs) {
          this.installLang(locale, this.table.options.langs[locale]);
        }

        this.setLocale(this.table.options.locale);
        this.registerTableFunction("setLocale", this.setLocale.bind(this));
        this.registerTableFunction("getLocale", this.getLocale.bind(this));
        this.registerTableFunction("getLang", this.getLang.bind(this));
      } //set header placehoder

    }, {
      key: "setHeaderFilterPlaceholder",
      value: function setHeaderFilterPlaceholder(placeholder) {
        this.langList["default"].headerFilters["default"] = placeholder;
      } //set header filter placeholder by column

    }, {
      key: "setHeaderFilterColumnPlaceholder",
      value: function setHeaderFilterColumnPlaceholder(column, placeholder) {
        this.langList["default"].headerFilters.columns[column] = placeholder;

        if (this.lang && !this.lang.headerFilters.columns[column]) {
          this.lang.headerFilters.columns[column] = placeholder;
        }
      } //setup a lang description object

    }, {
      key: "installLang",
      value: function installLang(locale, lang) {
        if (this.langList[locale]) {
          this._setLangProp(this.langList[locale], lang);
        } else {
          this.langList[locale] = lang;
        }
      }
    }, {
      key: "_setLangProp",
      value: function _setLangProp(lang, values) {
        for (var key in values) {
          if (lang[key] && _typeof(lang[key]) == "object") {
            this._setLangProp(lang[key], values[key]);
          } else {
            lang[key] = values[key];
          }
        }
      } //set current locale

    }, {
      key: "setLocale",
      value: function setLocale(desiredLocale) {
        desiredLocale = desiredLocale || "default"; //fill in any matching languge values

        function traverseLang(trans, path) {
          for (var prop in trans) {
            if (_typeof(trans[prop]) == "object") {
              if (!path[prop]) {
                path[prop] = {};
              }

              traverseLang(trans[prop], path[prop]);
            } else {
              path[prop] = trans[prop];
            }
          }
        } //determing correct locale to load


        if (desiredLocale === true && navigator.language) {
          //get local from system
          desiredLocale = navigator.language.toLowerCase();
        }

        if (desiredLocale) {
          //if locale is not set, check for matching top level locale else use default
          if (!this.langList[desiredLocale]) {
            var prefix = desiredLocale.split("-")[0];

            if (this.langList[prefix]) {
              console.warn("Localization Error - Exact matching locale not found, using closest match: ", desiredLocale, prefix);
              desiredLocale = prefix;
            } else {
              console.warn("Localization Error - Matching locale not found, using default: ", desiredLocale);
              desiredLocale = "default";
            }
          }
        }

        this.locale = desiredLocale; //load default lang template

        this.lang = Helpers.deepClone(this.langList["default"] || {});

        if (desiredLocale != "default") {
          traverseLang(this.langList[desiredLocale], this.lang);
        }

        this.dispatchExternal("localized", this.locale, this.lang);

        this._executeBindings();
      } //get current locale

    }, {
      key: "getLocale",
      value: function getLocale(locale) {
        return this.locale;
      } //get lang object for given local or current if none provided

    }, {
      key: "getLang",
      value: function getLang(locale) {
        return locale ? this.langList[locale] : this.lang;
      } //get text for current locale

    }, {
      key: "getText",
      value: function getText(path, value) {
        var path = value ? path + "|" + value : path,
            pathArray = path.split("|"),
            text = this._getLangElement(pathArray, this.locale); // if(text === false){
        // 	console.warn("Localization Error - Matching localized text not found for given path: ", path);
        // }


        return text || "";
      } //traverse langs object and find localized copy

    }, {
      key: "_getLangElement",
      value: function _getLangElement(path, locale) {
        var root = this.lang;
        path.forEach(function (level) {
          var rootPath;

          if (root) {
            rootPath = root[level];

            if (typeof rootPath != "undefined") {
              root = rootPath;
            } else {
              root = false;
            }
          }
        });
        return root;
      } //set update binding

    }, {
      key: "bind",
      value: function bind(path, callback) {
        if (!this.bindings[path]) {
          this.bindings[path] = [];
        }

        this.bindings[path].push(callback);
        callback(this.getText(path), this.lang);
      } //itterate through bindings and trigger updates

    }, {
      key: "_executeBindings",
      value: function _executeBindings() {
        var _this2 = this;

        var _loop = function _loop(path) {
          _this2.bindings[path].forEach(function (binding) {
            binding(_this2.getText(path), _this2.lang);
          });
        };

        for (var path in this.bindings) {
          _loop(path);
        }
      }
    }]);

    return Localize;
  }(Module);

  Localize.moduleName = "localize"; //load defaults

  Localize.langs = defaultLangs;

  var Comms = /*#__PURE__*/function (_Module) {
    _inherits(Comms, _Module);

    var _super = _createSuper(Comms);

    function Comms(table) {
      _classCallCheck(this, Comms);

      return _super.call(this, table);
    }

    _createClass(Comms, [{
      key: "initialize",
      value: function initialize() {
        this.registerTableFunction("tableComms", this.receive.bind(this));
      }
    }, {
      key: "getConnections",
      value: function getConnections(selectors) {
        var _this = this;

        var connections = [],
            connection;
        connection = TableRegistry.lookupTable(selectors);
        connection.forEach(function (con) {
          if (_this.table !== con) {
            connections.push(con);
          }
        });
        return connections;
      }
    }, {
      key: "send",
      value: function send(selectors, module, action, data) {
        var _this2 = this;

        var connections = this.getConnections(selectors);
        connections.forEach(function (connection) {
          connection.tableComms(_this2.table.element, module, action, data);
        });

        if (!connections.length && selectors) {
          console.warn("Table Connection Error - No tables matching selector found", selectors);
        }
      }
    }, {
      key: "receive",
      value: function receive(table, module, action, data) {
        if (this.table.modExists(module)) {
          return this.table.modules[module].commsReceived(table, action, data);
        } else {
          console.warn("Inter-table Comms Error - no such module:", module);
        }
      }
    }]);

    return Comms;
  }(Module);

  Comms.moduleName = "comms";

  var coreModules = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LayoutModule: Layout,
    LocalizeModule: Localize,
    CommsModule: Comms
  });

  var ModuleBinder = /*#__PURE__*/function () {
    function ModuleBinder(tabulator, modules) {
      _classCallCheck(this, ModuleBinder);

      this.bindStaticFuctionality(tabulator);
      this.bindModules(tabulator, coreModules, true);

      if (modules) {
        this.bindModules(tabulator, modules);
      }
    }

    _createClass(ModuleBinder, [{
      key: "bindStaticFuctionality",
      value: function bindStaticFuctionality(tabulator) {
        tabulator.moduleBindings = {};

        tabulator.extendModule = function (name, property, values) {
          if (tabulator.moduleBindings[name]) {
            var source = tabulator.moduleBindings[name][property];

            if (source) {
              if (_typeof(values) == "object") {
                for (var key in values) {
                  source[key] = values[key];
                }
              } else {
                console.warn("Module Error - Invalid value type, it must be an object");
              }
            } else {
              console.warn("Module Error - property does not exist:", property);
            }
          } else {
            console.warn("Module Error - module does not exist:", name);
          }
        };

        tabulator.registerModule = function (modules) {
          if (!Array.isArray(modules)) {
            modules = [modules];
          }

          modules.forEach(function (mod) {
            tabulator.registerModuleBinding(mod);
          });
        };

        tabulator.registerModuleBinding = function (mod) {
          tabulator.moduleBindings[mod.moduleName] = mod;
        };

        tabulator.findTable = function (query) {
          var results = TableRegistry.lookupTable(query, true);
          return Array.isArray(results) && !results.length ? false : results;
        }; //ensure that module are bound to instantiated function


        tabulator.prototype.bindModules = function () {
          var orderedStartMods = [],
              orderedEndMods = [],
              unOrderedMods = [];
          this.modules = {};

          for (var name in tabulator.moduleBindings) {
            var mod = tabulator.moduleBindings[name];
            var module = new mod(this);
            this.modules[name] = module;

            if (mod.prototype.moduleCore) {
              this.modulesCore.push(module);
            } else {
              if (mod.moduleInitOrder) {
                if (mod.moduleInitOrder < 0) {
                  orderedStartMods.push(module);
                } else {
                  orderedEndMods.push(module);
                }
              } else {
                unOrderedMods.push(module);
              }
            }
          }

          orderedStartMods.sort(function (a, b) {
            return a.moduleInitOrder > b.moduleInitOrder ? 1 : -1;
          });
          orderedEndMods.sort(function (a, b) {
            return a.moduleInitOrder > b.moduleInitOrder ? 1 : -1;
          });
          this.modulesRegular = orderedStartMods.concat(unOrderedMods.concat(orderedEndMods));
        };
      }
    }, {
      key: "bindModules",
      value: function bindModules(tabulator, modules, core) {
        var mods = Object.values(modules);

        if (core) {
          mods.forEach(function (mod) {
            mod.prototype.moduleCore = true;
          });
        }

        tabulator.registerModule(mods);
      }
    }]);

    return ModuleBinder;
  }();

  var Alert = /*#__PURE__*/function (_CoreFeature) {
    _inherits(Alert, _CoreFeature);

    var _super = _createSuper(Alert);

    function Alert(table) {
      var _this;

      _classCallCheck(this, Alert);

      _this = _super.call(this, table);
      _this.element = _this._createAlertElement();
      _this.msgElement = _this._createMsgElement();
      _this.type = null;

      _this.element.appendChild(_this.msgElement);

      return _this;
    }

    _createClass(Alert, [{
      key: "_createAlertElement",
      value: function _createAlertElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-alert");
        return el;
      }
    }, {
      key: "_createMsgElement",
      value: function _createMsgElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-alert-msg");
        el.setAttribute("role", "alert");
        return el;
      }
    }, {
      key: "_typeClass",
      value: function _typeClass() {
        return "tabulator-alert-state-" + this.type;
      }
    }, {
      key: "alert",
      value: function alert(content) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "msg";

        if (content) {
          this.clear();
          this.type = type;

          while (this.msgElement.firstChild) {
            this.msgElement.removeChild(this.msgElement.firstChild);
          }

          this.msgElement.classList.add(this._typeClass());

          if (typeof content === "function") {
            content = content();
          }

          if (content instanceof HTMLElement) {
            this.msgElement.appendChild(content);
          } else {
            this.msgElement.innerHTML = content;
          }

          this.table.element.appendChild(this.element);
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        if (this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }

        this.msgElement.classList.remove(this._typeClass());
      }
    }]);

    return Alert;
  }(CoreFeature);

  var Tabulator = /*#__PURE__*/function () {
    function Tabulator(element, options) {
      var _this = this;

      _classCallCheck(this, Tabulator);

      this.options = {};
      this.columnManager = null; // hold Column Manager

      this.rowManager = null; //hold Row Manager

      this.footerManager = null; //holder Footer Manager

      this.alertManager = null; //hold Alert Manager

      this.vdomHoz = null; //holder horizontal virtual dom

      this.externalEvents = null; //handle external event messaging

      this.eventBus = null; //handle internal event messaging

      this.interactionMonitor = false; //track user interaction

      this.browser = ""; //hold current browser type

      this.browserSlow = false; //handle reduced functionality for slower browsers

      this.browserMobile = false; //check if running on mobile, prevent resize cancelling edit on keyboard appearance

      this.rtl = false; //check if the table is in RTL mode

      this.originalElement = null; //hold original table element if it has been replaced

      this.componentFunctionBinder = new ComponentFunctionBinder(this); //bind component functions

      this.dataLoader = false; //bind component functions

      this.modules = {}; //hold all modules bound to this table

      this.modulesCore = []; //hold core modules bound to this table (for initialization purposes)

      this.modulesRegular = []; //hold regular modules bound to this table (for initialization purposes)

      this.optionsList = new OptionsList(this, "table constructor");
      this.initialized = false;
      this.destroyed = false;

      if (this.initializeElement(element)) {
        this.initializeCoreSystems(options); //delay table creation to allow event bindings immediately after the constructor

        setTimeout(function () {
          _this._create();
        });
      }

      TableRegistry.register(this); //register table for inter-device communication
    }

    _createClass(Tabulator, [{
      key: "initializeElement",
      value: function initializeElement(element) {
        if (typeof HTMLElement !== "undefined" && element instanceof HTMLElement) {
          this.element = element;
          return true;
        } else if (typeof element === "string") {
          this.element = document.querySelector(element);

          if (this.element) {
            return true;
          } else {
            console.error("Tabulator Creation Error - no element found matching selector: ", element);
            return false;
          }
        } else {
          console.error("Tabulator Creation Error - Invalid element provided:", element);
          return false;
        }
      }
    }, {
      key: "initializeCoreSystems",
      value: function initializeCoreSystems(options) {
        this.columnManager = new ColumnManager(this);
        this.rowManager = new RowManager(this);
        this.footerManager = new FooterManager(this);
        this.dataLoader = new DataLoader(this);
        this.alertManager = new Alert(this);
        this.bindModules();
        this.options = this.optionsList.generate(Tabulator.defaultOptions, options);

        this._clearObjectPointers();

        this._mapDeprecatedFunctionality();

        this.externalEvents = new ExternalEventBus(this, this.options, this.options.debugEventsExternal);
        this.eventBus = new InternalEventBus(this.options.debugEventsInternal);
        this.interactionMonitor = new InteractionManager(this);
        this.dataLoader.initialize(); // this.columnManager.initialize();
        // this.rowManager.initialize();

        this.footerManager.initialize();
      } //convert deprecated functionality to new functions

    }, {
      key: "_mapDeprecatedFunctionality",
      value: function _mapDeprecatedFunctionality() {//all previously deprecated functionality removed in the 5.0 release
      }
    }, {
      key: "_clearSelection",
      value: function _clearSelection() {
        this.element.classList.add("tabulator-block-select");

        if (window.getSelection) {
          if (window.getSelection().empty) {
            // Chrome
            window.getSelection().empty();
          } else if (window.getSelection().removeAllRanges) {
            // Firefox
            window.getSelection().removeAllRanges();
          }
        } else if (document.selection) {
          // IE?
          document.selection.empty();
        }

        this.element.classList.remove("tabulator-block-select");
      } //create table

    }, {
      key: "_create",
      value: function _create() {
        this.externalEvents.dispatch("tableBuilding");
        this.eventBus.dispatch("table-building");

        this._rtlCheck();

        this._buildElement();

        this._initializeTable();

        this._loadInitialData();

        this.initialized = true;
        this.externalEvents.dispatch("tableBuilt");
      }
    }, {
      key: "_rtlCheck",
      value: function _rtlCheck() {
        var style = window.getComputedStyle(this.element);

        switch (this.options.textDirection) {
          case "auto":
            if (style.direction !== "rtl") {
              break;
            }

          case "rtl":
            this.element.classList.add("tabulator-rtl");
            this.rtl = true;
            break;

          case "ltr":
            this.element.classList.add("tabulator-ltr");

          default:
            this.rtl = false;
        }
      } //clear pointers to objects in default config object

    }, {
      key: "_clearObjectPointers",
      value: function _clearObjectPointers() {
        this.options.columns = this.options.columns.slice(0);

        if (Array.isArray(this.options.data) && !this.options.reactiveData) {
          this.options.data = this.options.data.slice(0);
        }
      } //build tabulator element

    }, {
      key: "_buildElement",
      value: function _buildElement() {
        var element = this.element,
            options = this.options,
            newElement;

        if (element.tagName === "TABLE") {
          this.originalElement = this.element;
          newElement = document.createElement("div"); //transfer attributes to new element

          var attributes = element.attributes; // loop through attributes and apply them on div

          for (var i in attributes) {
            if (_typeof(attributes[i]) == "object") {
              newElement.setAttribute(attributes[i].name, attributes[i].value);
            }
          } // replace table with div element


          element.parentNode.replaceChild(newElement, element);
          this.element = element = newElement;
        }

        element.classList.add("tabulator");
        element.setAttribute("role", "grid"); //empty element

        while (element.firstChild) {
          element.removeChild(element.firstChild);
        } //set table height


        if (options.height) {
          options.height = isNaN(options.height) ? options.height : options.height + "px";
          element.style.height = options.height;
        } //set table min height


        if (options.minHeight !== false) {
          options.minHeight = isNaN(options.minHeight) ? options.minHeight : options.minHeight + "px";
          element.style.minHeight = options.minHeight;
        } //set table maxHeight


        if (options.maxHeight !== false) {
          options.maxHeight = isNaN(options.maxHeight) ? options.maxHeight : options.maxHeight + "px";
          element.style.maxHeight = options.maxHeight;
        }
      } //initialize core systems and modules

    }, {
      key: "_initializeTable",
      value: function _initializeTable() {
        var element = this.element,
            options = this.options;
        this.interactionMonitor.initialize();
        this.columnManager.initialize();
        this.rowManager.initialize();

        this._detectBrowser(); //initialize core modules


        this.modulesCore.forEach(function (mod) {
          mod.initialize();
        }); //build table elements

        element.appendChild(this.columnManager.getElement());
        element.appendChild(this.rowManager.getElement());

        if (options.footerElement) {
          this.footerManager.activate();
        }

        if (options.autoColumns && options.data) {
          this.columnManager.generateColumnsFromRowData(this.options.data);
        } //initialize regular modules


        this.modulesRegular.forEach(function (mod) {
          mod.initialize();
        });
        this.columnManager.setColumns(options.columns);
        this.eventBus.dispatch("table-built");
      }
    }, {
      key: "_loadInitialData",
      value: function _loadInitialData() {
        this.dataLoader.load(this.options.data);
      } //deconstructor

    }, {
      key: "destroy",
      value: function destroy() {
        var element = this.element;
        this.destroyed = true;
        TableRegistry.deregister(this); //deregister table from inter-device communication

        this.eventBus.dispatch("table-destroy"); //clear row data

        this.rowManager.rows.forEach(function (row) {
          row.wipe();
        });
        this.rowManager.rows = [];
        this.rowManager.activeRows = [];
        this.rowManager.displayRows = []; //clear DOM

        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        element.classList.remove("tabulator");
      }
    }, {
      key: "_detectBrowser",
      value: function _detectBrowser() {
        var ua = navigator.userAgent || navigator.vendor || window.opera;

        if (ua.indexOf("Trident") > -1) {
          this.browser = "ie";
          this.browserSlow = true;
        } else if (ua.indexOf("Edge") > -1) {
          this.browser = "edge";
          this.browserSlow = true;
        } else if (ua.indexOf("Firefox") > -1) {
          this.browser = "firefox";
          this.browserSlow = false;
        } else {
          this.browser = "other";
          this.browserSlow = false;
        }

        this.browserMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.slice(0, 4));
      }
    }, {
      key: "initGuard",
      value: function initGuard(func, msg) {
        var stack, line;

        if (this.options.debugInitialization && !this.initialized) {
          if (!func) {
            stack = new Error().stack.split("\n");
            line = stack[0] == "Error" ? stack[2] : stack[1];

            if (line[0] == " ") {
              func = line.trim().split(" ")[1].split(".")[1];
            } else {
              func = line.trim().split("@")[0];
            }
          }

          console.warn("Table Not Initialized - Calling the " + func + " function before the table is initialized may result in inconsistent behavior, Please wait for the `tableBuilt` event before calling this function." + (msg ? " " + msg : ""));
        }

        return this.initialized;
      } ////////////////// Data Handling //////////////////
      //block table redrawing

    }, {
      key: "blockRedraw",
      value: function blockRedraw() {
        this.initGuard();
        return this.rowManager.blockRedraw();
      } //restore table redrawing

    }, {
      key: "restoreRedraw",
      value: function restoreRedraw() {
        this.initGuard();
        return this.rowManager.restoreRedraw();
      } //load data

    }, {
      key: "setData",
      value: function setData(data, params, config) {
        this.initGuard(false, "To set initial data please use the 'data' property in the table constructor.");
        return this.dataLoader.load(data, params, config, false);
      } //clear data

    }, {
      key: "clearData",
      value: function clearData() {
        this.initGuard();
        this.dataLoader.blockActiveLoad();
        this.rowManager.clearData();
      } //get table data array

    }, {
      key: "getData",
      value: function getData(active) {
        return this.rowManager.getData(active);
      } //get table data array count

    }, {
      key: "getDataCount",
      value: function getDataCount(active) {
        return this.rowManager.getDataCount(active);
      } //replace data, keeping table in position with same sort

    }, {
      key: "replaceData",
      value: function replaceData(data, params, config) {
        this.initGuard();
        return this.dataLoader.load(data, params, config, true, true);
      } //update table data

    }, {
      key: "updateData",
      value: function updateData(data) {
        var _this2 = this;

        var responses = 0;
        this.initGuard();
        return new Promise(function (resolve, reject) {
          _this2.dataLoader.blockActiveLoad();

          if (typeof data === "string") {
            data = JSON.parse(data);
          }

          if (data) {
            data.forEach(function (item) {
              var row = _this2.rowManager.findRow(item[_this2.options.index]);

              if (row) {
                responses++;
                row.updateData(item).then(function () {
                  responses--;

                  if (!responses) {
                    resolve();
                  }
                });
              }
            });
          } else {
            console.warn("Update Error - No data provided");
            reject("Update Error - No data provided");
          }
        });
      }
    }, {
      key: "addData",
      value: function addData(data, pos, index) {
        var _this3 = this;

        this.initGuard();
        return new Promise(function (resolve, reject) {
          _this3.dataLoader.blockActiveLoad();

          if (typeof data === "string") {
            data = JSON.parse(data);
          }

          if (data) {
            _this3.rowManager.addRows(data, pos, index).then(function (rows) {
              var output = [];
              rows.forEach(function (row) {
                output.push(row.getComponent());
              });
              resolve(output);
            });
          } else {
            console.warn("Update Error - No data provided");
            reject("Update Error - No data provided");
          }
        });
      } //update table data

    }, {
      key: "updateOrAddData",
      value: function updateOrAddData(data) {
        var _this4 = this;

        var rows = [],
            responses = 0;
        this.initGuard();
        return new Promise(function (resolve, reject) {
          _this4.dataLoader.blockActiveLoad();

          if (typeof data === "string") {
            data = JSON.parse(data);
          }

          if (data) {
            data.forEach(function (item) {
              var row = _this4.rowManager.findRow(item[_this4.options.index]);

              responses++;

              if (row) {
                row.updateData(item).then(function () {
                  responses--;
                  rows.push(row.getComponent());

                  if (!responses) {
                    resolve(rows);
                  }
                });
              } else {
                _this4.rowManager.addRows(item).then(function (newRows) {
                  responses--;
                  rows.push(newRows[0].getComponent());

                  if (!responses) {
                    resolve(rows);
                  }
                });
              }
            });
          } else {
            console.warn("Update Error - No data provided");
            reject("Update Error - No data provided");
          }
        });
      } //get row object

    }, {
      key: "getRow",
      value: function getRow(index) {
        var row = this.rowManager.findRow(index);

        if (row) {
          return row.getComponent();
        } else {
          console.warn("Find Error - No matching row found:", index);
          return false;
        }
      } //get row object

    }, {
      key: "getRowFromPosition",
      value: function getRowFromPosition(position, active) {
        var row = this.rowManager.getRowFromPosition(position, active);

        if (row) {
          return row.getComponent();
        } else {
          console.warn("Find Error - No matching row found:", position);
          return false;
        }
      } //delete row from table

    }, {
      key: "deleteRow",
      value: function deleteRow(index) {
        var _this5 = this;

        var foundRows = [];
        this.initGuard();

        if (!Array.isArray(index)) {
          index = [index];
        } //find matching rows


        var _iterator = _createForOfIteratorHelper(index),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            var row = this.rowManager.findRow(item, true);

            if (row) {
              foundRows.push(row);
            } else {
              console.error("Delete Error - No matching row found:", item);
              return Promise.reject("Delete Error - No matching row found");
              break;
            }
          } //sort rows into correct order to ensure smooth delete from table

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        foundRows.sort(function (a, b) {
          return _this5.rowManager.rows.indexOf(a) > _this5.rowManager.rows.indexOf(b) ? 1 : -1;
        }); //delete rows

        foundRows.forEach(function (row) {
          row["delete"]();
        });
        this.rowManager.reRenderInPosition();
        return Promise.resolve();
      } //add row to table

    }, {
      key: "addRow",
      value: function addRow(data, pos, index) {
        this.initGuard();

        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        return this.rowManager.addRows(data, pos, index).then(function (rows) {
          return rows[0].getComponent();
        });
      } //update a row if it exitsts otherwise create it

    }, {
      key: "updateOrAddRow",
      value: function updateOrAddRow(index, data) {
        var row = this.rowManager.findRow(index);
        this.initGuard();

        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        if (row) {
          return row.updateData(data).then(function () {
            return row.getComponent();
          });
        } else {
          return this.rowManager.addRows(data).then(function (rows) {
            return rows[0].getComponent();
          });
        }
      } //update row data

    }, {
      key: "updateRow",
      value: function updateRow(index, data) {
        var row = this.rowManager.findRow(index);
        this.initGuard();

        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        if (row) {
          return row.updateData(data).then(function () {
            return Promise.resolve(row.getComponent());
          });
        } else {
          console.warn("Update Error - No matching row found:", index);
          return Promise.reject("Update Error - No matching row found");
        }
      } //scroll to row in DOM

    }, {
      key: "scrollToRow",
      value: function scrollToRow(index, position, ifVisible) {
        var row = this.rowManager.findRow(index);

        if (row) {
          return this.rowManager.scrollToRow(row, position, ifVisible);
        } else {
          console.warn("Scroll Error - No matching row found:", index);
          return Promise.reject("Scroll Error - No matching row found");
        }
      }
    }, {
      key: "moveRow",
      value: function moveRow(from, to, after) {
        var fromRow = this.rowManager.findRow(from);
        this.initGuard();

        if (fromRow) {
          fromRow.moveToRow(to, after);
        } else {
          console.warn("Move Error - No matching row found:", from);
        }
      }
    }, {
      key: "getRows",
      value: function getRows(active) {
        return this.rowManager.getComponents(active);
      } //get position of row in table

    }, {
      key: "getRowPosition",
      value: function getRowPosition(index, active) {
        var row = this.rowManager.findRow(index);

        if (row) {
          return this.rowManager.getRowPosition(row, active);
        } else {
          console.warn("Position Error - No matching row found:", index);
          return false;
        }
      } /////////////// Column Functions  ///////////////

    }, {
      key: "setColumns",
      value: function setColumns(definition) {
        this.initGuard(false, "To set initial columns please use the 'columns' property in the table constructor");
        this.columnManager.setColumns(definition);
      }
    }, {
      key: "getColumns",
      value: function getColumns(structured) {
        return this.columnManager.getComponents(structured);
      }
    }, {
      key: "getColumn",
      value: function getColumn(field) {
        var column = this.columnManager.findColumn(field);

        if (column) {
          return column.getComponent();
        } else {
          console.warn("Find Error - No matching column found:", field);
          return false;
        }
      }
    }, {
      key: "getColumnDefinitions",
      value: function getColumnDefinitions() {
        return this.columnManager.getDefinitionTree();
      }
    }, {
      key: "showColumn",
      value: function showColumn(field) {
        var column = this.columnManager.findColumn(field);
        this.initGuard();

        if (column) {
          column.show();
        } else {
          console.warn("Column Show Error - No matching column found:", field);
          return false;
        }
      }
    }, {
      key: "hideColumn",
      value: function hideColumn(field) {
        var column = this.columnManager.findColumn(field);
        this.initGuard();

        if (column) {
          column.hide();
        } else {
          console.warn("Column Hide Error - No matching column found:", field);
          return false;
        }
      }
    }, {
      key: "toggleColumn",
      value: function toggleColumn(field) {
        var column = this.columnManager.findColumn(field);
        this.initGuard();

        if (column) {
          if (column.visible) {
            column.hide();
          } else {
            column.show();
          }
        } else {
          console.warn("Column Visibility Toggle Error - No matching column found:", field);
          return false;
        }
      }
    }, {
      key: "addColumn",
      value: function addColumn(definition, before, field) {
        var column = this.columnManager.findColumn(field);
        this.initGuard();
        return this.columnManager.addColumn(definition, before, column).then(function (column) {
          return column.getComponent();
        });
      }
    }, {
      key: "deleteColumn",
      value: function deleteColumn(field) {
        var column = this.columnManager.findColumn(field);
        this.initGuard();

        if (column) {
          return column["delete"]();
        } else {
          console.warn("Column Delete Error - No matching column found:", field);
          return Promise.reject();
        }
      }
    }, {
      key: "updateColumnDefinition",
      value: function updateColumnDefinition(field, definition) {
        var column = this.columnManager.findColumn(field);
        this.initGuard();

        if (column) {
          return column.updateDefinition(definition);
        } else {
          console.warn("Column Update Error - No matching column found:", field);
          return Promise.reject();
        }
      }
    }, {
      key: "moveColumn",
      value: function moveColumn(from, to, after) {
        var fromColumn = this.columnManager.findColumn(from),
            toColumn = this.columnManager.findColumn(to);
        this.initGuard();

        if (fromColumn) {
          if (toColumn) {
            this.columnManager.moveColumn(fromColumn, toColumn, after);
          } else {
            console.warn("Move Error - No matching column found:", toColumn);
          }
        } else {
          console.warn("Move Error - No matching column found:", from);
        }
      } //scroll to column in DOM

    }, {
      key: "scrollToColumn",
      value: function scrollToColumn(field, position, ifVisible) {
        var _this6 = this;

        return new Promise(function (resolve, reject) {
          var column = _this6.columnManager.findColumn(field);

          if (column) {
            return _this6.columnManager.scrollToColumn(column, position, ifVisible);
          } else {
            console.warn("Scroll Error - No matching column found:", field);
            return Promise.reject("Scroll Error - No matching column found");
          }
        });
      } //////////// General Public Functions ////////////
      //redraw list without updating data

    }, {
      key: "redraw",
      value: function redraw(force) {
        this.initGuard();
        this.columnManager.redraw(force);
        this.rowManager.redraw(force);
      }
    }, {
      key: "setHeight",
      value: function setHeight(height) {
        this.options.height = isNaN(height) ? height : height + "px";
        this.element.style.height = this.options.height;
        this.rowManager.initializeRenderer();
        this.rowManager.redraw();
      } //////////////////// Event Bus ///////////////////

    }, {
      key: "on",
      value: function on(key, callback) {
        this.externalEvents.subscribe(key, callback);
      }
    }, {
      key: "off",
      value: function off(key, callback) {
        this.externalEvents.unsubscribe(key, callback);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent() {
        var _this$externalEvents;

        var args = Array.from(arguments),
            key = args.shift();

        (_this$externalEvents = this.externalEvents).dispatch.apply(_this$externalEvents, arguments);
      } //////////////////// Alerts ///////////////////

    }, {
      key: "alert",
      value: function alert(contents, type) {
        this.initGuard();
        this.alertManager.alert(contents, type);
      }
    }, {
      key: "clearAlert",
      value: function clearAlert() {
        this.initGuard();
        this.alertManager.clear();
      } ////////////// Extension Management //////////////

    }, {
      key: "modExists",
      value: function modExists(plugin, required) {
        if (this.modules[plugin]) {
          return true;
        } else {
          if (required) {
            console.error("Tabulator Module Not Installed: " + plugin);
          }

          return false;
        }
      }
    }, {
      key: "module",
      value: function module(key) {
        var mod = this.modules[key];

        if (!mod) {
          console.error("Tabulator module not installed: " + key);
        }

        return mod;
      }
    }]);

    return Tabulator;
  }(); //default setup options


  Tabulator.defaultOptions = defaultOptions; //bind modules and static functionality

  new ModuleBinder(Tabulator);

  var defautlAccessors = {};

  var Accessor = /*#__PURE__*/function (_Module) {
    _inherits(Accessor, _Module);

    var _super = _createSuper(Accessor);

    function Accessor(table) {
      var _this;

      _classCallCheck(this, Accessor);

      _this = _super.call(this, table);
      _this.allowedTypes = ["", "data", "download", "clipboard", "print", "htmlOutput"]; //list of accessor types

      _this.registerColumnOption("accessor");

      _this.registerColumnOption("accessorParams");

      _this.registerColumnOption("accessorData");

      _this.registerColumnOption("accessorDataParams");

      _this.registerColumnOption("accessorDownload");

      _this.registerColumnOption("accessorDownloadParams");

      _this.registerColumnOption("accessorClipboard");

      _this.registerColumnOption("accessorClipboardParams");

      _this.registerColumnOption("accessorPrint");

      _this.registerColumnOption("accessorPrintParams");

      _this.registerColumnOption("accessorHtmlOutput");

      _this.registerColumnOption("accessorHtmlOutputParams");

      return _this;
    }

    _createClass(Accessor, [{
      key: "initialize",
      value: function initialize() {
        this.subscribe("column-layout", this.initializeColumn.bind(this));
        this.subscribe("row-data-retrieve", this.transformRow.bind(this));
      } //initialize column accessor

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var _this2 = this;

        var match = false,
            config = {};
        this.allowedTypes.forEach(function (type) {
          var key = "accessor" + (type.charAt(0).toUpperCase() + type.slice(1)),
              accessor;

          if (column.definition[key]) {
            accessor = _this2.lookupAccessor(column.definition[key]);

            if (accessor) {
              match = true;
              config[key] = {
                accessor: accessor,
                params: column.definition[key + "Params"] || {}
              };
            }
          }
        });

        if (match) {
          column.modules.accessor = config;
        }
      }
    }, {
      key: "lookupAccessor",
      value: function lookupAccessor(value) {
        var accessor = false; //set column accessor

        switch (_typeof(value)) {
          case "string":
            if (Accessor.accessors[value]) {
              accessor = Accessor.accessors[value];
            } else {
              console.warn("Accessor Error - No such accessor found, ignoring: ", value);
            }

            break;

          case "function":
            accessor = value;
            break;
        }

        return accessor;
      } //apply accessor to row

    }, {
      key: "transformRow",
      value: function transformRow(row, type) {
        var key = "accessor" + (type.charAt(0).toUpperCase() + type.slice(1)),
            rowComponent = row.getComponent(); //clone data object with deep copy to isolate internal data from returned result

        var data = Helpers.deepClone(row.data || {});
        this.table.columnManager.traverse(function (column) {
          var value, accessor, params, colCompnent;

          if (column.modules.accessor) {
            accessor = column.modules.accessor[key] || column.modules.accessor.accessor || false;

            if (accessor) {
              value = column.getFieldValue(data);

              if (value != "undefined") {
                colCompnent = column.getComponent();
                params = typeof accessor.params === "function" ? accessor.params(value, data, type, colCompnent, rowComponent) : accessor.params;
                column.setFieldValue(data, accessor.accessor(value, data, type, params, colCompnent, rowComponent));
              }
            }
          }
        });
        return data;
      }
    }]);

    return Accessor;
  }(Module); //load defaults


  Accessor.moduleName = "accessor";
  Accessor.accessors = defautlAccessors;

  var defaultConfig = {
    method: "GET"
  };

  function generateParamsList(data, prefix) {
    var output = [];
    prefix = prefix || "";

    if (Array.isArray(data)) {
      data.forEach(function (item, i) {
        output = output.concat(generateParamsList(item, prefix ? prefix + "[" + i + "]" : i));
      });
    } else if (_typeof(data) === "object") {
      for (var key in data) {
        output = output.concat(generateParamsList(data[key], prefix ? prefix + "[" + key + "]" : key));
      }
    } else {
      output.push({
        key: prefix,
        value: data
      });
    }

    return output;
  }

  function serializeParams(params) {
    var output = generateParamsList(params),
        encoded = [];
    output.forEach(function (item) {
      encoded.push(encodeURIComponent(item.key) + "=" + encodeURIComponent(item.value));
    });
    return encoded.join("&");
  }

  function urlBuilder (url, config, params) {
    if (url) {
      if (params && Object.keys(params).length) {
        if (!config.method || config.method.toLowerCase() == "get") {
          config.method = "get";
          url += (url.includes("?") ? "&" : "?") + serializeParams(params);
        }
      }
    }

    return url;
  }

  function defaultLoaderPromise (url, config, params) {
    var _this = this;

    var contentType;
    return new Promise(function (resolve, reject) {
      //set url
      url = _this.urlGenerator.call(_this.table, url, config, params); //set body content if not GET request

      if (config.method.toUpperCase() != "GET") {
        contentType = _typeof(_this.table.options.ajaxContentType) === "object" ? _this.table.options.ajaxContentType : _this.contentTypeFormatters[_this.table.options.ajaxContentType];

        if (contentType) {
          for (var key in contentType.headers) {
            if (!config.headers) {
              config.headers = {};
            }

            if (typeof config.headers[key] === "undefined") {
              config.headers[key] = contentType.headers[key];
            }
          }

          config.body = contentType.body.call(_this, url, config, params);
        } else {
          console.warn("Ajax Error - Invalid ajaxContentType value:", _this.table.options.ajaxContentType);
        }
      }

      if (url) {
        //configure headers
        if (typeof config.headers === "undefined") {
          config.headers = {};
        }

        if (typeof config.headers.Accept === "undefined") {
          config.headers.Accept = "application/json";
        }

        if (typeof config.headers["X-Requested-With"] === "undefined") {
          config.headers["X-Requested-With"] = "XMLHttpRequest";
        }

        if (typeof config.mode === "undefined") {
          config.mode = "cors";
        }

        if (config.mode == "cors") {
          if (typeof config.headers["Origin"] === "undefined") {
            config.headers["Origin"] = window.location.origin;
          }

          if (typeof config.credentials === "undefined") {
            config.credentials = 'same-origin';
          }
        } else {
          if (typeof config.credentials === "undefined") {
            config.credentials = 'include';
          }
        } //send request


        fetch(url, config).then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              resolve(data);
            })["catch"](function (error) {
              reject(error);
              console.warn("Ajax Load Error - Invalid JSON returned", error);
            });
          } else {
            console.error("Ajax Load Error - Connection Error: " + response.status, response.statusText);
            reject(response);
          }
        })["catch"](function (error) {
          console.error("Ajax Load Error - Connection Error: ", error);
          reject(error);
        });
      } else {
        console.warn("Ajax Load Error - No URL Set");
        resolve([]);
      }
    });
  }

  function generateParamsList$1(data, prefix) {
    var output = [];
    prefix = prefix || "";

    if (Array.isArray(data)) {
      data.forEach(function (item, i) {
        output = output.concat(generateParamsList$1(item, prefix ? prefix + "[" + i + "]" : i));
      });
    } else if (_typeof(data) === "object") {
      for (var key in data) {
        output = output.concat(generateParamsList$1(data[key], prefix ? prefix + "[" + key + "]" : key));
      }
    } else {
      output.push({
        key: prefix,
        value: data
      });
    }

    return output;
  }

  var defaultContentTypeFormatters = {
    "json": {
      headers: {
        'Content-Type': 'application/json'
      },
      body: function body(url, config, params) {
        return JSON.stringify(params);
      }
    },
    "form": {
      headers: {},
      body: function body(url, config, params) {
        var output = generateParamsList$1(params),
            form = new FormData();
        output.forEach(function (item) {
          form.append(item.key, item.value);
        });
        return form;
      }
    }
  };

  var Ajax = /*#__PURE__*/function (_Module) {
    _inherits(Ajax, _Module);

    var _super = _createSuper(Ajax);

    function Ajax(table) {
      var _this;

      _classCallCheck(this, Ajax);

      _this = _super.call(this, table);
      _this.config = {}; //hold config object for ajax request

      _this.url = ""; //request URL

      _this.urlGenerator = false;
      _this.params = false; //request parameters

      _this.loaderPromise = false;

      _this.registerTableOption("ajaxURL", false); //url for ajax loading


      _this.registerTableOption("ajaxURLGenerator", false);

      _this.registerTableOption("ajaxParams", {}); //params for ajax loading


      _this.registerTableOption("ajaxConfig", "get"); //ajax request type


      _this.registerTableOption("ajaxContentType", "form"); //ajax request type


      _this.registerTableOption("ajaxRequestFunc", false); //promise function


      _this.registerTableOption("ajaxRequesting", function () {});

      _this.registerTableOption("ajaxResponse", false);

      _this.contentTypeFormatters = Ajax.contentTypeFormatters;
      return _this;
    } //initialize setup options


    _createClass(Ajax, [{
      key: "initialize",
      value: function initialize() {
        this.loaderPromise = this.table.options.ajaxRequestFunc || Ajax.defaultLoaderPromise;
        this.urlGenerator = this.table.options.ajaxURLGenerator || Ajax.defaultURLGenerator;

        if (this.table.options.ajaxURL) {
          this.setUrl(this.table.options.ajaxURL);
        }

        this.setDefaultConfig(this.table.options.ajaxConfig);
        this.registerTableFunction("getAjaxUrl", this.getUrl.bind(this));
        this.subscribe("data-loading", this.requestDataCheck.bind(this));
        this.subscribe("data-params", this.requestParams.bind(this));
        this.subscribe("data-load", this.requestData.bind(this));
      }
    }, {
      key: "requestParams",
      value: function requestParams(data, config, silent, params) {
        var ajaxParams = this.table.options.ajaxParams;

        if (ajaxParams) {
          if (typeof ajaxParams === "function") {
            ajaxParams = ajaxParams.call(this.table);
          }

          params = Object.assign(params, ajaxParams);
        }

        return params;
      }
    }, {
      key: "requestDataCheck",
      value: function requestDataCheck(data, params, config, silent) {
        return !!(!data && this.url || typeof data === "string");
      }
    }, {
      key: "requestData",
      value: function requestData(url, params, config, silent, previousData) {
        var ajaxConfig;

        if (!previousData && this.requestDataCheck(url)) {
          if (url) {
            this.setUrl(url);
          }

          ajaxConfig = this.generateConfig(config);
          return this.sendRequest(this.url, params, ajaxConfig);
        } else {
          return previousData;
        }
      }
    }, {
      key: "setDefaultConfig",
      value: function setDefaultConfig() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.config = Object.assign({}, Ajax.defaultConfig);

        if (typeof config == "string") {
          this.config.method = config;
        } else {
          Object.assign(this.config, config);
        }
      } //load config object

    }, {
      key: "generateConfig",
      value: function generateConfig() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var ajaxConfig = Object.assign({}, this.config);

        if (typeof config == "string") {
          ajaxConfig.method = config;
        } else {
          Object.assign(ajaxConfig, config);
        }

        return ajaxConfig;
      } //set request url

    }, {
      key: "setUrl",
      value: function setUrl(url) {
        this.url = url;
      } //get request url

    }, {
      key: "getUrl",
      value: function getUrl() {
        return this.url;
      } //send ajax request

    }, {
      key: "sendRequest",
      value: function sendRequest(url, params, config) {
        var _this2 = this;

        if (this.table.options.ajaxRequesting.call(this.table, url, params) !== false) {
          return this.loaderPromise(url, config, params).then(function (data) {
            if (_this2.table.options.ajaxResponse) {
              data = _this2.table.options.ajaxResponse.call(_this2.table, url, params, data);
            }

            return data;
          });
        } else {
          return Promise.reject();
        }
      }
    }]);

    return Ajax;
  }(Module);

  Ajax.moduleName = "ajax"; //load defaults

  Ajax.defaultConfig = defaultConfig;
  Ajax.defaultURLGenerator = urlBuilder;
  Ajax.defaultLoaderPromise = defaultLoaderPromise;
  Ajax.contentTypeFormatters = defaultContentTypeFormatters;

  var defaultPasteActions = {
    replace: function replace(rows) {
      return this.table.setData(rows);
    },
    update: function update(rows) {
      return this.table.updateOrAddData(rows);
    },
    insert: function insert(rows) {
      return this.table.addData(rows);
    }
  };

  var defaultPasteParsers = {
    table: function table(clipboard) {
      var data = [],
          headerFindSuccess = true,
          columns = this.table.columnManager.columns,
          columnMap = [],
          rows = []; //get data from clipboard into array of columns and rows.

      clipboard = clipboard.split("\n");
      clipboard.forEach(function (row) {
        data.push(row.split("\t"));
      });

      if (data.length && !(data.length === 1 && data[0].length < 2)) {

        data[0].forEach(function (value) {
          var column = columns.find(function (column) {
            return value && column.definition.title && value.trim() && column.definition.title.trim() === value.trim();
          });

          if (column) {
            columnMap.push(column);
          } else {
            headerFindSuccess = false;
          }
        }); //check if column headers are present by field

        if (!headerFindSuccess) {
          headerFindSuccess = true;
          columnMap = [];
          data[0].forEach(function (value) {
            var column = columns.find(function (column) {
              return value && column.field && value.trim() && column.field.trim() === value.trim();
            });

            if (column) {
              columnMap.push(column);
            } else {
              headerFindSuccess = false;
            }
          });

          if (!headerFindSuccess) {
            columnMap = this.table.columnManager.columnsByIndex;
          }
        } //remove header row if found


        if (headerFindSuccess) {
          data.shift();
        }

        data.forEach(function (item) {
          var row = {};
          item.forEach(function (value, i) {
            if (columnMap[i]) {
              row[columnMap[i].field] = value;
            }
          });
          rows.push(row);
        });
        return rows;
      } else {
        return false;
      }
    }
  };

  var Clipboard = /*#__PURE__*/function (_Module) {
    _inherits(Clipboard, _Module);

    var _super = _createSuper(Clipboard);

    function Clipboard(table) {
      var _this;

      _classCallCheck(this, Clipboard);

      _this = _super.call(this, table);
      _this.mode = true;

      _this.pasteParser = function () {};

      _this.pasteAction = function () {};

      _this.customSelection = false;
      _this.rowRange = false;
      _this.blocked = true; //block copy actions not originating from this command

      _this.registerTableOption("clipboard", false); //enable clipboard


      _this.registerTableOption("clipboardCopyStyled", true); //formatted table data


      _this.registerTableOption("clipboardCopyConfig", false); //clipboard config


      _this.registerTableOption("clipboardCopyFormatter", false); //DEPRICATED - REMOVE in 5.0


      _this.registerTableOption("clipboardCopyRowRange", "active"); //restrict clipboard to visible rows only


      _this.registerTableOption("clipboardPasteParser", "table"); //convert pasted clipboard data to rows


      _this.registerTableOption("clipboardPasteAction", "insert"); //how to insert pasted data into the table


      _this.registerColumnOption("clipboard");

      _this.registerColumnOption("titleClipboard");

      return _this;
    }

    _createClass(Clipboard, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;

        this.mode = this.table.options.clipboard;
        this.rowRange = this.table.options.clipboardCopyRowRange;

        if (this.mode === true || this.mode === "copy") {
          this.table.element.addEventListener("copy", function (e) {
            var plain, html, list;

            if (!_this2.blocked) {
              e.preventDefault();

              if (_this2.customSelection) {
                plain = _this2.customSelection;

                if (_this2.table.options.clipboardCopyFormatter) {
                  plain = _this2.table.options.clipboardCopyFormatter("plain", plain);
                }
              } else {
                var list = _this2.table.modules["export"].generateExportList(_this2.table.options.clipboardCopyConfig, _this2.table.options.clipboardCopyStyled, _this2.rowRange, "clipboard");

                html = _this2.table.modules["export"].genereateHTMLTable(list);
                plain = html ? _this2.generatePlainContent(list) : "";

                if (_this2.table.options.clipboardCopyFormatter) {
                  plain = _this2.table.options.clipboardCopyFormatter("plain", plain);
                  html = _this2.table.options.clipboardCopyFormatter("html", html);
                }
              }

              if (window.clipboardData && window.clipboardData.setData) {
                window.clipboardData.setData('Text', plain);
              } else if (e.clipboardData && e.clipboardData.setData) {
                e.clipboardData.setData('text/plain', plain);

                if (html) {
                  e.clipboardData.setData('text/html', html);
                }
              } else if (e.originalEvent && e.originalEvent.clipboardData.setData) {
                e.originalEvent.clipboardData.setData('text/plain', plain);

                if (html) {
                  e.originalEvent.clipboardData.setData('text/html', html);
                }
              }

              _this2.dispatchExternal("clipboardCopied", plain, html);

              _this2.reset();
            }
          });
        }

        if (this.mode === true || this.mode === "paste") {
          this.table.element.addEventListener("paste", function (e) {
            _this2.paste(e);
          });
        }

        this.setPasteParser(this.table.options.clipboardPasteParser);
        this.setPasteAction(this.table.options.clipboardPasteAction);
        this.registerTableFunction("copyToClipboard", this.copy.bind(this));
      }
    }, {
      key: "reset",
      value: function reset() {
        this.blocked = true;
        this.customSelection = false;
      }
    }, {
      key: "generatePlainContent",
      value: function generatePlainContent(list) {
        var output = [];
        list.forEach(function (row) {
          var rowData = [];
          row.columns.forEach(function (col) {
            var value = "";

            if (col) {
              if (row.type === "group") {
                col.value = col.component.getKey();
              }

              if (col.value === null) {
                value = "";
              } else {
                switch (_typeof(col.value)) {
                  case "object":
                    value = JSON.stringify(col.value);
                    break;

                  case "undefined":
                    value = "";
                    break;

                  default:
                    value = col.value;
                }
              }
            }

            rowData.push(value);
          });
          output.push(rowData.join("\t"));
        });
        return output.join("\n");
      }
    }, {
      key: "copy",
      value: function copy(range, internal) {
        var range, sel, textRange;
        this.blocked = false;
        this.customSelection = false;

        if (this.mode === true || this.mode === "copy") {
          this.rowRange = range || this.table.options.clipboardCopyRowRange;

          if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            range = document.createRange();
            range.selectNodeContents(this.table.element);
            sel = window.getSelection();

            if (sel.toString() && internal) {
              this.customSelection = sel.toString();
            }

            sel.removeAllRanges();
            sel.addRange(range);
          } else if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
            textRange = document.body.createTextRange();
            textRange.moveToElementText(this.table.element);
            textRange.select();
          }

          document.execCommand('copy');

          if (sel) {
            sel.removeAllRanges();
          }
        }
      } //PASTE EVENT HANDLING

    }, {
      key: "setPasteAction",
      value: function setPasteAction(action) {
        switch (_typeof(action)) {
          case "string":
            this.pasteAction = Clipboard.pasteActions[action];

            if (!this.pasteAction) {
              console.warn("Clipboard Error - No such paste action found:", action);
            }

            break;

          case "function":
            this.pasteAction = action;
            break;
        }
      }
    }, {
      key: "setPasteParser",
      value: function setPasteParser(parser) {
        switch (_typeof(parser)) {
          case "string":
            this.pasteParser = Clipboard.pasteParsers[parser];

            if (!this.pasteParser) {
              console.warn("Clipboard Error - No such paste parser found:", parser);
            }

            break;

          case "function":
            this.pasteParser = parser;
            break;
        }
      }
    }, {
      key: "paste",
      value: function paste(e) {
        var data, rowData, rows;

        if (this.checkPaseOrigin(e)) {
          data = this.getPasteData(e);
          rowData = this.pasteParser.call(this, data);

          if (rowData) {
            e.preventDefault();

            if (this.table.modExists("mutator")) {
              rowData = this.mutateData(rowData);
            }

            rows = this.pasteAction.call(this, rowData);
            this.dispatchExternal("clipboardPasted", data, rowData, rows);
          } else {
            this.dispatchExternal("clipboardPasteError", data);
          }
        }
      }
    }, {
      key: "mutateData",
      value: function mutateData(data) {
        var _this3 = this;

        var output = [];

        if (Array.isArray(data)) {
          data.forEach(function (row) {
            output.push(_this3.table.modules.mutator.transformRow(row, "clipboard"));
          });
        } else {
          output = data;
        }

        return output;
      }
    }, {
      key: "checkPaseOrigin",
      value: function checkPaseOrigin(e) {
        var valid = true;

        if (e.target.tagName != "DIV" || this.table.modules.edit.currentCell) {
          valid = false;
        }

        return valid;
      }
    }, {
      key: "getPasteData",
      value: function getPasteData(e) {
        var data;

        if (window.clipboardData && window.clipboardData.getData) {
          data = window.clipboardData.getData('Text');
        } else if (e.clipboardData && e.clipboardData.getData) {
          data = e.clipboardData.getData('text/plain');
        } else if (e.originalEvent && e.originalEvent.clipboardData.getData) {
          data = e.originalEvent.clipboardData.getData('text/plain');
        }

        return data;
      }
    }]);

    return Clipboard;
  }(Module);

  Clipboard.moduleName = "clipboard"; //load defaults

  Clipboard.pasteActions = defaultPasteActions;
  Clipboard.pasteParsers = defaultPasteParsers;

  var CalcComponent = /*#__PURE__*/function () {
    function CalcComponent(row) {
      _classCallCheck(this, CalcComponent);

      this._row = row;
      return new Proxy(this, {
        get: function get(target, name, receiver) {
          if (typeof target[name] !== "undefined") {
            return target[name];
          } else {
            return target._row.table.componentFunctionBinder.handle("row", target._row, name);
          }
        }
      });
    }

    _createClass(CalcComponent, [{
      key: "getData",
      value: function getData(transform) {
        return this._row.getData(transform);
      }
    }, {
      key: "getElement",
      value: function getElement() {
        return this._row.getElement();
      }
    }, {
      key: "getTable",
      value: function getTable() {
        return this._row.table;
      }
    }, {
      key: "getCells",
      value: function getCells() {
        var cells = [];

        this._row.getCells().forEach(function (cell) {
          cells.push(cell.getComponent());
        });

        return cells;
      }
    }, {
      key: "getCell",
      value: function getCell(column) {
        var cell = this._row.getCell(column);

        return cell ? cell.getComponent() : false;
      }
    }, {
      key: "_getSelf",
      value: function _getSelf() {
        return this._row;
      }
    }]);

    return CalcComponent;
  }();

  var defaultCalculations = {
    "avg": function avg(values, data, calcParams) {
      var output = 0,
          precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : 2;

      if (values.length) {
        output = values.reduce(function (sum, value) {
          return Number(sum) + Number(value);
        });
        output = output / values.length;
        output = precision !== false ? output.toFixed(precision) : output;
      }

      return parseFloat(output).toString();
    },
    "max": function max(values, data, calcParams) {
      var output = null,
          precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : false;
      values.forEach(function (value) {
        value = Number(value);

        if (value > output || output === null) {
          output = value;
        }
      });
      return output !== null ? precision !== false ? output.toFixed(precision) : output : "";
    },
    "min": function min(values, data, calcParams) {
      var output = null,
          precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : false;
      values.forEach(function (value) {
        value = Number(value);

        if (value < output || output === null) {
          output = value;
        }
      });
      return output !== null ? precision !== false ? output.toFixed(precision) : output : "";
    },
    "sum": function sum(values, data, calcParams) {
      var output = 0,
          precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : false;

      if (values.length) {
        values.forEach(function (value) {
          value = Number(value);
          output += !isNaN(value) ? Number(value) : 0;
        });
      }

      return precision !== false ? output.toFixed(precision) : output;
    },
    "concat": function concat(values, data, calcParams) {
      var output = 0;

      if (values.length) {
        output = values.reduce(function (sum, value) {
          return String(sum) + String(value);
        });
      }

      return output;
    },
    "count": function count(values, data, calcParams) {
      var output = 0;

      if (values.length) {
        values.forEach(function (value) {
          if (value) {
            output++;
          }
        });
      }

      return output;
    }
  };

  var ColumnCalcs = /*#__PURE__*/function (_Module) {
    _inherits(ColumnCalcs, _Module);

    var _super = _createSuper(ColumnCalcs);

    function ColumnCalcs(table) {
      var _this;

      _classCallCheck(this, ColumnCalcs);

      _this = _super.call(this, table);
      _this.topCalcs = [];
      _this.botCalcs = [];
      _this.genColumn = false;
      _this.topElement = _this.createElement();
      _this.botElement = _this.createElement();
      _this.topRow = false;
      _this.botRow = false;
      _this.topInitialized = false;
      _this.botInitialized = false;

      _this.registerTableOption("columnCalcs", true);

      _this.registerColumnOption("topCalc");

      _this.registerColumnOption("topCalcParams");

      _this.registerColumnOption("topCalcFormatter");

      _this.registerColumnOption("topCalcFormatterParams");

      _this.registerColumnOption("bottomCalc");

      _this.registerColumnOption("bottomCalcParams");

      _this.registerColumnOption("bottomCalcFormatter");

      _this.registerColumnOption("bottomCalcFormatterParams");

      return _this;
    }

    _createClass(ColumnCalcs, [{
      key: "createElement",
      value: function createElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-calcs-holder");
        return el;
      }
    }, {
      key: "initialize",
      value: function initialize() {
        this.genColumn = new Column({
          field: "value"
        }, this);
        this.subscribe("cell-value-changed", this.cellValueChanged.bind(this));
        this.subscribe("column-init", this.initializeColumnCheck.bind(this));
        this.subscribe("row-deleted", this.rowsUpdated.bind(this));
        this.subscribe("scroll-horizontal", this.scrollHorizontal.bind(this));
        this.subscribe("row-added", this.rowsUpdated.bind(this));
        this.subscribe("column-moved", this.recalcActiveRows.bind(this));
        this.subscribe("column-add", this.recalcActiveRows.bind(this));
        this.subscribe("data-refreshed", this.recalcActiveRowsRefresh.bind(this));
        this.subscribe("table-redraw", this.tableRedraw.bind(this));
        this.subscribe("rows-visible", this.visibleRows.bind(this));
        this.registerTableFunction("getCalcResults", this.getResults.bind(this));
        this.registerTableFunction("recalc", this.userRecalc.bind(this));
      }
    }, {
      key: "tableRedraw",
      value: function tableRedraw(force) {
        this.recalc(this.table.rowManager.activeRows);

        if (force) {
          this.redraw();
        }
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////

    }, {
      key: "userRecalc",
      value: function userRecalc() {
        this.recalc(this.table.rowManager.activeRows);
      } ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////

    }, {
      key: "visibleRows",
      value: function visibleRows(viewable, rows) {
        if (this.topRow) {
          rows.unshift(this.topRow);
        }

        if (this.botRow) {
          rows.push(this.botRow);
        }

        return rows;
      }
    }, {
      key: "rowsUpdated",
      value: function rowsUpdated(row) {
        if (this.table.options.groupBy) {
          this.recalcRowGroup(this);
        } else {
          this.recalcActiveRows();
        }
      }
    }, {
      key: "recalcActiveRowsRefresh",
      value: function recalcActiveRowsRefresh() {
        if (this.table.options.groupBy && this.table.options.dataTreeStartExpanded && this.table.options.dataTree) {
          this.recalcAll();
        } else {
          this.recalcActiveRows();
        }
      }
    }, {
      key: "recalcActiveRows",
      value: function recalcActiveRows() {
        this.recalc(this.table.rowManager.activeRows);
      }
    }, {
      key: "cellValueChanged",
      value: function cellValueChanged(cell) {
        if (cell.column.definition.topCalc || cell.column.definition.bottomCalc) {
          if (this.table.options.groupBy) {
            if (this.table.options.columnCalcs == "table" || this.table.options.columnCalcs == "both") {
              this.recalcActiveRows();
            }

            if (this.table.options.columnCalcs != "table") {
              this.recalcRowGroup(cell.row);
            }
          } else {
            this.recalcActiveRows();
          }
        }
      }
    }, {
      key: "initializeColumnCheck",
      value: function initializeColumnCheck(column) {
        if (column.definition.topCalc || column.definition.bottomCalc) {
          this.initializeColumn(column);
        }
      } //initialize column calcs

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var def = column.definition;
        var config = {
          topCalcParams: def.topCalcParams || {},
          botCalcParams: def.bottomCalcParams || {}
        };

        if (def.topCalc) {
          switch (_typeof(def.topCalc)) {
            case "string":
              if (ColumnCalcs.calculations[def.topCalc]) {
                config.topCalc = ColumnCalcs.calculations[def.topCalc];
              } else {
                console.warn("Column Calc Error - No such calculation found, ignoring: ", def.topCalc);
              }

              break;

            case "function":
              config.topCalc = def.topCalc;
              break;
          }

          if (config.topCalc) {
            column.modules.columnCalcs = config;
            this.topCalcs.push(column);

            if (this.table.options.columnCalcs != "group") {
              this.initializeTopRow();
            }
          }
        }

        if (def.bottomCalc) {
          switch (_typeof(def.bottomCalc)) {
            case "string":
              if (ColumnCalcs.calculations[def.bottomCalc]) {
                config.botCalc = ColumnCalcs.calculations[def.bottomCalc];
              } else {
                console.warn("Column Calc Error - No such calculation found, ignoring: ", def.bottomCalc);
              }

              break;

            case "function":
              config.botCalc = def.bottomCalc;
              break;
          }

          if (config.botCalc) {
            column.modules.columnCalcs = config;
            this.botCalcs.push(column);

            if (this.table.options.columnCalcs != "group") {
              this.initializeBottomRow();
            }
          }
        }
      } //dummy functions to handle being mock column manager

    }, {
      key: "registerColumnField",
      value: function registerColumnField() {}
    }, {
      key: "removeCalcs",
      value: function removeCalcs() {
        var changed = false;

        if (this.topInitialized) {
          this.topInitialized = false;
          this.topElement.parentNode.removeChild(this.topElement);
          changed = true;
        }

        if (this.botInitialized) {
          this.botInitialized = false;
          this.footerRemove(this.botElement);
          changed = true;
        }

        if (changed) {
          this.table.rowManager.adjustTableSize();
        }
      }
    }, {
      key: "initializeTopRow",
      value: function initializeTopRow() {
        if (!this.topInitialized) {
          this.table.columnManager.getElement().insertBefore(this.topElement, this.table.columnManager.headersElement.nextSibling);
          this.topInitialized = true;
        }
      }
    }, {
      key: "initializeBottomRow",
      value: function initializeBottomRow() {
        if (!this.botInitialized) {
          this.footerPrepend(this.botElement);
          this.botInitialized = true;
        }
      }
    }, {
      key: "scrollHorizontal",
      value: function scrollHorizontal(left) {
        if (this.botInitialized && this.botRow) {
          this.botRow.getElement().style.marginLeft = -left + "px";
        }
      }
    }, {
      key: "recalc",
      value: function recalc(rows) {
        var row;

        if (this.topInitialized || this.botInitialized) {
          this.rowsToData(rows);

          if (this.topInitialized) {
            if (this.topRow) {
              this.topRow.deleteCells();
            }

            row = this.generateRow("top", this.rowsToData(rows));
            this.topRow = row;

            while (this.topElement.firstChild) {
              this.topElement.removeChild(this.topElement.firstChild);
            }

            this.topElement.appendChild(row.getElement());
            row.initialize(true);
          }

          if (this.botInitialized) {
            if (this.botRow) {
              this.botRow.deleteCells();
            }

            row = this.generateRow("bottom", this.rowsToData(rows));
            this.botRow = row;

            while (this.botElement.firstChild) {
              this.botElement.removeChild(this.botElement.firstChild);
            }

            this.botElement.appendChild(row.getElement());
            row.initialize(true);
          }

          this.table.rowManager.adjustTableSize(); //set resizable handles

          if (this.table.modExists("frozenColumns")) {
            this.table.modules.frozenColumns.layout();
          }
        }
      }
    }, {
      key: "recalcRowGroup",
      value: function recalcRowGroup(row) {
        this.recalcGroup(this.table.modules.groupRows.getRowGroup(row));
      }
    }, {
      key: "recalcAll",
      value: function recalcAll() {
        var _this2 = this;

        if (this.topCalcs.length || this.botCalcs.length) {
          if (this.table.options.columnCalcs !== "group") {
            this.recalcActiveRows();
          }

          if (this.table.options.groupBy && this.table.options.columnCalcs !== "table") {
            var groups = this.table.modules.groupRows.getChildGroups();
            groups.forEach(function (group) {
              _this2.recalcGroup(group);
            });
          }
        }
      }
    }, {
      key: "recalcGroup",
      value: function recalcGroup(group) {
        var data, rowData;

        if (group) {
          if (group.calcs) {
            if (group.calcs.bottom) {
              data = this.rowsToData(group.rows);
              rowData = this.generateRowData("bottom", data);
              group.calcs.bottom.updateData(rowData);
              group.calcs.bottom.reinitialize();
            }

            if (group.calcs.top) {
              data = this.rowsToData(group.rows);
              rowData = this.generateRowData("top", data);
              group.calcs.top.updateData(rowData);
              group.calcs.top.reinitialize();
            }
          }
        }
      } //generate top stats row

    }, {
      key: "generateTopRow",
      value: function generateTopRow(rows) {
        return this.generateRow("top", this.rowsToData(rows));
      } //generate bottom stats row

    }, {
      key: "generateBottomRow",
      value: function generateBottomRow(rows) {
        return this.generateRow("bottom", this.rowsToData(rows));
      }
    }, {
      key: "rowsToData",
      value: function rowsToData(rows) {
        var _this3 = this;

        var data = [];
        rows.forEach(function (row) {
          data.push(row.getData());

          if (_this3.table.options.dataTree && _this3.table.options.dataTreeChildColumnCalcs) {
            if (row.modules.dataTree && row.modules.dataTree.open) {
              var children = _this3.rowsToData(_this3.table.modules.dataTree.getFilteredTreeChildren(row));

              data = data.concat(children);
            }
          }
        });
        return data;
      } //generate stats row

    }, {
      key: "generateRow",
      value: function generateRow(pos, data) {
        var _this4 = this;

        var rowData = this.generateRowData(pos, data),
            row;

        if (this.table.modExists("mutator")) {
          this.table.modules.mutator.disable();
        }

        row = new Row(rowData, this, "calc");

        if (this.table.modExists("mutator")) {
          this.table.modules.mutator.enable();
        }

        row.getElement().classList.add("tabulator-calcs", "tabulator-calcs-" + pos);
        row.component = false;

        row.getComponent = function () {
          if (!row.component) {
            row.component = new CalcComponent(row);
          }

          return row.component;
        };

        row.generateCells = function () {
          var cells = [];

          _this4.table.columnManager.columnsByIndex.forEach(function (column) {
            //set field name of mock column
            _this4.genColumn.setField(column.getField());

            _this4.genColumn.hozAlign = column.hozAlign;

            if (column.definition[pos + "CalcFormatter"] && _this4.table.modExists("format")) {
              _this4.genColumn.modules.format = {
                formatter: _this4.table.modules.format.getFormatter(column.definition[pos + "CalcFormatter"]),
                params: column.definition[pos + "CalcFormatterParams"] || {}
              };
            } else {
              _this4.genColumn.modules.format = {
                formatter: _this4.table.modules.format.getFormatter("plaintext"),
                params: {}
              };
            } //ensure css class defintion is replicated to calculation cell


            _this4.genColumn.definition.cssClass = column.definition.cssClass; //generate cell and assign to correct column

            var cell = new Cell(_this4.genColumn, row);
            cell.getElement();
            cell.column = column;
            cell.setWidth();
            column.cells.push(cell);
            cells.push(cell);

            if (!column.visible) {
              cell.hide();
            }
          });

          row.cells = cells;
        };

        return row;
      } //generate stats row

    }, {
      key: "generateRowData",
      value: function generateRowData(pos, data) {
        var rowData = {},
            calcs = pos == "top" ? this.topCalcs : this.botCalcs,
            type = pos == "top" ? "topCalc" : "botCalc",
            params,
            paramKey;
        calcs.forEach(function (column) {
          var values = [];

          if (column.modules.columnCalcs && column.modules.columnCalcs[type]) {
            data.forEach(function (item) {
              values.push(column.getFieldValue(item));
            });
            paramKey = type + "Params";
            params = typeof column.modules.columnCalcs[paramKey] === "function" ? column.modules.columnCalcs[paramKey](values, data) : column.modules.columnCalcs[paramKey];
            column.setFieldValue(rowData, column.modules.columnCalcs[type](values, data, params));
          }
        });
        return rowData;
      }
    }, {
      key: "hasTopCalcs",
      value: function hasTopCalcs() {
        return !!this.topCalcs.length;
      }
    }, {
      key: "hasBottomCalcs",
      value: function hasBottomCalcs() {
        return !!this.botCalcs.length;
      } //handle table redraw

    }, {
      key: "redraw",
      value: function redraw() {
        if (this.topRow) {
          this.topRow.normalizeHeight(true);
        }

        if (this.botRow) {
          this.botRow.normalizeHeight(true);
        }
      } //return the calculated

    }, {
      key: "getResults",
      value: function getResults() {
        var _this5 = this;

        var results = {},
            groups;

        if (this.table.options.groupBy && this.table.modExists("groupRows")) {
          groups = this.table.modules.groupRows.getGroups(true);
          groups.forEach(function (group) {
            results[group.getKey()] = _this5.getGroupResults(group);
          });
        } else {
          results = {
            top: this.topRow ? this.topRow.getData() : {},
            bottom: this.botRow ? this.botRow.getData() : {}
          };
        }

        return results;
      } //get results from a group

    }, {
      key: "getGroupResults",
      value: function getGroupResults(group) {
        var _this6 = this;

        var groupObj = group._getSelf(),
            subGroups = group.getSubGroups(),
            subGroupResults = {},
            results = {};

        subGroups.forEach(function (subgroup) {
          subGroupResults[subgroup.getKey()] = _this6.getGroupResults(subgroup);
        });
        results = {
          top: groupObj.calcs.top ? groupObj.calcs.top.getData() : {},
          bottom: groupObj.calcs.bottom ? groupObj.calcs.bottom.getData() : {},
          groups: subGroupResults
        };
        return results;
      }
    }]);

    return ColumnCalcs;
  }(Module);

  ColumnCalcs.moduleName = "columnCalcs"; //load defaults

  ColumnCalcs.calculations = defaultCalculations;

  var DataTree = /*#__PURE__*/function (_Module) {
    _inherits(DataTree, _Module);

    var _super = _createSuper(DataTree);

    function DataTree(table) {
      var _this;

      _classCallCheck(this, DataTree);

      _this = _super.call(this, table);
      _this.indent = 10;
      _this.field = "";
      _this.collapseEl = null;
      _this.expandEl = null;
      _this.branchEl = null;
      _this.elementField = false;

      _this.startOpen = function () {};

      _this.displayIndex = 0;

      _this.registerTableOption("dataTree", false); //enable data tree


      _this.registerTableOption("dataTreeFilter", true); //filter child rows


      _this.registerTableOption("dataTreeSort", true); //sort child rows


      _this.registerTableOption("dataTreeElementColumn", false);

      _this.registerTableOption("dataTreeBranchElement", true); //show data tree branch element


      _this.registerTableOption("dataTreeChildIndent", 9); //data tree child indent in px


      _this.registerTableOption("dataTreeChildField", "_children"); //data tre column field to look for child rows


      _this.registerTableOption("dataTreeCollapseElement", false); //data tree row collapse element


      _this.registerTableOption("dataTreeExpandElement", false); //data tree row expand element


      _this.registerTableOption("dataTreeStartExpanded", false);

      _this.registerTableOption("dataTreeChildColumnCalcs", false); //include visible data tree rows in column calculations


      _this.registerTableOption("dataTreeSelectPropagate", false); //seleccting a parent row selects its children
      //register component functions


      _this.registerComponentFunction("row", "treeCollapse", _this.collapseRow.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "treeExpand", _this.expandRow.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "treeToggle", _this.toggleRow.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "getTreeParent", _this.getTreeParent.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "getTreeChildren", _this.getRowChildren.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "addTreeChild", _this.addTreeChildRow.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "isTreeExpanded", _this.isRowExpanded.bind(_assertThisInitialized(_this)));

      return _this;
    }

    _createClass(DataTree, [{
      key: "initialize",
      value: function initialize() {
        if (this.table.options.dataTree) {
          var dummyEl = null,
              options = this.table.options;
          this.field = options.dataTreeChildField;
          this.indent = options.dataTreeChildIndent;

          if (options.dataTreeBranchElement) {
            if (options.dataTreeBranchElement === true) {
              this.branchEl = document.createElement("div");
              this.branchEl.classList.add("tabulator-data-tree-branch");
            } else {
              if (typeof options.dataTreeBranchElement === "string") {
                dummyEl = document.createElement("div");
                dummyEl.innerHTML = options.dataTreeBranchElement;
                this.branchEl = dummyEl.firstChild;
              } else {
                this.branchEl = options.dataTreeBranchElement;
              }
            }
          }

          if (options.dataTreeCollapseElement) {
            if (typeof options.dataTreeCollapseElement === "string") {
              dummyEl = document.createElement("div");
              dummyEl.innerHTML = options.dataTreeCollapseElement;
              this.collapseEl = dummyEl.firstChild;
            } else {
              this.collapseEl = options.dataTreeCollapseElement;
            }
          } else {
            this.collapseEl = document.createElement("div");
            this.collapseEl.classList.add("tabulator-data-tree-control");
            this.collapseEl.tabIndex = 0;
            this.collapseEl.innerHTML = "<div class='tabulator-data-tree-control-collapse'></div>";
          }

          if (options.dataTreeExpandElement) {
            if (typeof options.dataTreeExpandElement === "string") {
              dummyEl = document.createElement("div");
              dummyEl.innerHTML = options.dataTreeExpandElement;
              this.expandEl = dummyEl.firstChild;
            } else {
              this.expandEl = options.dataTreeExpandElement;
            }
          } else {
            this.expandEl = document.createElement("div");
            this.expandEl.classList.add("tabulator-data-tree-control");
            this.expandEl.tabIndex = 0;
            this.expandEl.innerHTML = "<div class='tabulator-data-tree-control-expand'></div>";
          }

          switch (_typeof(options.dataTreeStartExpanded)) {
            case "boolean":
              this.startOpen = function (row, index) {
                return options.dataTreeStartExpanded;
              };

              break;

            case "function":
              this.startOpen = options.dataTreeStartExpanded;
              break;

            default:
              this.startOpen = function (row, index) {
                return options.dataTreeStartExpanded[index];
              };

              break;
          }

          this.subscribe("row-init", this.initializeRow.bind(this));
          this.subscribe("row-layout-after", this.layoutRow.bind(this));
          this.subscribe("row-deleted", this.rowDelete.bind(this), 0);
          this.subscribe("row-data-changed", this.rowDataChanged.bind(this), 10);
          this.subscribe("cell-value-updated", this.cellValueChanged.bind(this));
          this.subscribe("edit-cancelled", this.cellValueChanged.bind(this));
          this.subscribe("column-moving-rows", this.columnMoving.bind(this));
          this.subscribe("table-built", this.initializeElementField.bind(this));
          this.subscribe("table-redrawing", this.tableRedrawing.bind(this));
          this.registerDisplayHandler(this.getRows.bind(this), 30);
        }
      }
    }, {
      key: "tableRedrawing",
      value: function tableRedrawing(force) {
        var _this2 = this;

        var rows;

        if (force) {
          rows = this.table.rowManager.getRows();
          rows.forEach(function (row) {
            _this2.reinitializeRowChildren(row);
          });
        }
      }
    }, {
      key: "initializeElementField",
      value: function initializeElementField() {
        var firstCol = this.table.columnManager.getFirstVisibleColumn();
        this.elementField = this.table.options.dataTreeElementColumn || (firstCol ? firstCol.field : false);
      }
    }, {
      key: "getRowChildren",
      value: function getRowChildren(row) {
        return this.getTreeChildren(row, true);
      }
    }, {
      key: "columnMoving",
      value: function columnMoving() {
        var _this3 = this;

        var rows = [];
        this.table.rowManager.rows.forEach(function (row) {
          rows = rows.concat(_this3.getTreeChildren(row, false, true));
        });
        return rows;
      }
    }, {
      key: "rowDataChanged",
      value: function rowDataChanged(row, visible, updatedData) {
        if (this.redrawNeeded(updatedData)) {
          this.initializeRow(row);

          if (visible) {
            this.layoutRow(row);
            this.refreshData(true);
          }
        }
      }
    }, {
      key: "cellValueChanged",
      value: function cellValueChanged(cell) {
        var field = cell.column.getField();

        if (field === this.elementField) {
          this.layoutRow(cell.row);
        }
      }
    }, {
      key: "initializeRow",
      value: function initializeRow(row) {
        var childArray = row.getData()[this.field];
        var isArray = Array.isArray(childArray);
        var children = isArray || !isArray && _typeof(childArray) === "object" && childArray !== null;

        if (!children && row.modules.dataTree && row.modules.dataTree.branchEl) {
          row.modules.dataTree.branchEl.parentNode.removeChild(row.modules.dataTree.branchEl);
        }

        if (!children && row.modules.dataTree && row.modules.dataTree.controlEl) {
          row.modules.dataTree.controlEl.parentNode.removeChild(row.modules.dataTree.controlEl);
        }

        row.modules.dataTree = {
          index: row.modules.dataTree ? row.modules.dataTree.index : 0,
          open: children ? row.modules.dataTree ? row.modules.dataTree.open : this.startOpen(row.getComponent(), 0) : false,
          controlEl: row.modules.dataTree && children ? row.modules.dataTree.controlEl : false,
          branchEl: row.modules.dataTree && children ? row.modules.dataTree.branchEl : false,
          parent: row.modules.dataTree ? row.modules.dataTree.parent : false,
          children: children
        };
      }
    }, {
      key: "reinitializeRowChildren",
      value: function reinitializeRowChildren(row) {
        var children = this.getTreeChildren(row, false, true);
        children.forEach(function (child) {
          child.reinitialize(true);
        });
      }
    }, {
      key: "layoutRow",
      value: function layoutRow(row) {
        var cell = this.elementField ? row.getCell(this.elementField) : row.getCells()[0],
            el = cell.getElement(),
            config = row.modules.dataTree;

        if (config.branchEl) {
          if (config.branchEl.parentNode) {
            config.branchEl.parentNode.removeChild(config.branchEl);
          }

          config.branchEl = false;
        }

        if (config.controlEl) {
          if (config.controlEl.parentNode) {
            config.controlEl.parentNode.removeChild(config.controlEl);
          }

          config.controlEl = false;
        }

        this.generateControlElement(row, el);
        row.getElement().classList.add("tabulator-tree-level-" + config.index);

        if (config.index) {
          if (this.branchEl) {
            config.branchEl = this.branchEl.cloneNode(true);
            el.insertBefore(config.branchEl, el.firstChild);

            if (this.table.rtl) {
              config.branchEl.style.marginRight = (config.branchEl.offsetWidth + config.branchEl.style.marginLeft) * (config.index - 1) + config.index * this.indent + "px";
            } else {
              config.branchEl.style.marginLeft = (config.branchEl.offsetWidth + config.branchEl.style.marginRight) * (config.index - 1) + config.index * this.indent + "px";
            }
          } else {
            if (this.table.rtl) {
              el.style.paddingRight = parseInt(window.getComputedStyle(el, null).getPropertyValue('padding-right')) + config.index * this.indent + "px";
            } else {
              el.style.paddingLeft = parseInt(window.getComputedStyle(el, null).getPropertyValue('padding-left')) + config.index * this.indent + "px";
            }
          }
        }
      }
    }, {
      key: "generateControlElement",
      value: function generateControlElement(row, el) {
        var _this4 = this;

        var config = row.modules.dataTree,
            el = el || row.getCells()[0].getElement(),
            oldControl = config.controlEl;

        if (config.children !== false) {
          if (config.open) {
            config.controlEl = this.collapseEl.cloneNode(true);
            config.controlEl.addEventListener("click", function (e) {
              e.stopPropagation();

              _this4.collapseRow(row);
            });
          } else {
            config.controlEl = this.expandEl.cloneNode(true);
            config.controlEl.addEventListener("click", function (e) {
              e.stopPropagation();

              _this4.expandRow(row);
            });
          }

          config.controlEl.addEventListener("mousedown", function (e) {
            e.stopPropagation();
          });

          if (oldControl && oldControl.parentNode === el) {
            oldControl.parentNode.replaceChild(config.controlEl, oldControl);
          } else {
            el.insertBefore(config.controlEl, el.firstChild);
          }
        }
      }
    }, {
      key: "setDisplayIndex",
      value: function setDisplayIndex(index) {
        this.displayIndex = index;
      }
    }, {
      key: "getDisplayIndex",
      value: function getDisplayIndex() {
        return this.displayIndex;
      }
    }, {
      key: "getRows",
      value: function getRows(rows) {
        var _this5 = this;

        var output = [];
        rows.forEach(function (row, i) {
          var config, children;
          output.push(row);

          if (row instanceof Row) {
            row.create();
            config = row.modules.dataTree.children;

            if (!config.index && config.children !== false) {
              children = _this5.getChildren(row);
              children.forEach(function (child) {
                child.create();
                output.push(child);
              });
            }
          }
        });
        return output;
      }
    }, {
      key: "getChildren",
      value: function getChildren(row, allChildren) {
        var _this6 = this;

        var config = row.modules.dataTree,
            children = [],
            output = [];

        if (config.children !== false && (config.open || allChildren)) {
          if (!Array.isArray(config.children)) {
            config.children = this.generateChildren(row);
          }

          if (this.table.modExists("filter") && this.table.options.dataTreeFilter) {
            children = this.table.modules.filter.filter(config.children);
          } else {
            children = config.children;
          }

          if (this.table.modExists("sort") && this.table.options.dataTreeSort) {
            this.table.modules.sort.sort(children);
          }

          children.forEach(function (child) {
            output.push(child);

            var subChildren = _this6.getChildren(child);

            subChildren.forEach(function (sub) {
              output.push(sub);
            });
          });
        }

        return output;
      }
    }, {
      key: "generateChildren",
      value: function generateChildren(row) {
        var _this7 = this;

        var children = [];
        var childArray = row.getData()[this.field];

        if (!Array.isArray(childArray)) {
          childArray = [childArray];
        }

        childArray.forEach(function (childData) {
          var childRow = new Row(childData || {}, _this7.table.rowManager);
          childRow.create();
          childRow.modules.dataTree.index = row.modules.dataTree.index + 1;
          childRow.modules.dataTree.parent = row;

          if (childRow.modules.dataTree.children) {
            childRow.modules.dataTree.open = _this7.startOpen(childRow.getComponent(), childRow.modules.dataTree.index);
          }

          children.push(childRow);
        });
        return children;
      }
    }, {
      key: "expandRow",
      value: function expandRow(row, silent) {
        var config = row.modules.dataTree;

        if (config.children !== false) {
          config.open = true;
          row.reinitialize();
          this.refreshData(true);
          this.dispatchExternal("dataTreeRowExpanded", row.getComponent(), row.modules.dataTree.index);
        }
      }
    }, {
      key: "collapseRow",
      value: function collapseRow(row) {
        var config = row.modules.dataTree;

        if (config.children !== false) {
          config.open = false;
          row.reinitialize();
          this.refreshData(true);
          this.dispatchExternal("dataTreeRowCollapsed", row.getComponent(), row.modules.dataTree.index);
        }
      }
    }, {
      key: "toggleRow",
      value: function toggleRow(row) {
        var config = row.modules.dataTree;

        if (config.children !== false) {
          if (config.open) {
            this.collapseRow(row);
          } else {
            this.expandRow(row);
          }
        }
      }
    }, {
      key: "isRowExpanded",
      value: function isRowExpanded(row) {
        return row.modules.dataTree.open;
      }
    }, {
      key: "getTreeParent",
      value: function getTreeParent(row) {
        return row.modules.dataTree.parent ? row.modules.dataTree.parent.getComponent() : false;
      }
    }, {
      key: "getTreeParentRoot",
      value: function getTreeParentRoot(row) {
        return row.modules.dataTree.parent ? this.getTreeParentRoot(row.modules.dataTree.parent) : row;
      }
    }, {
      key: "getFilteredTreeChildren",
      value: function getFilteredTreeChildren(row) {
        var config = row.modules.dataTree,
            output = [],
            children;

        if (config.children) {
          if (!Array.isArray(config.children)) {
            config.children = this.generateChildren(row);
          }

          if (this.table.modExists("filter") && this.table.options.dataTreeFilter) {
            children = this.table.modules.filter.filter(config.children);
          } else {
            children = config.children;
          }

          children.forEach(function (childRow) {
            if (childRow instanceof Row) {
              output.push(childRow);
            }
          });
        }

        return output;
      }
    }, {
      key: "rowDelete",
      value: function rowDelete(row) {
        var parent = row.modules.dataTree.parent,
            childIndex;

        if (parent) {
          childIndex = this.findChildIndex(row, parent);

          if (childIndex !== false) {
            parent.data[this.field].splice(childIndex, 1);
          }

          if (!parent.data[this.field].length) {
            delete parent.data[this.field];
          }

          this.initializeRow(parent);
          this.layoutRow(parent);
        }

        this.refreshData(true);
      }
    }, {
      key: "addTreeChildRow",
      value: function addTreeChildRow(row, data, top, index) {
        var childIndex = false;

        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        if (!Array.isArray(row.data[this.field])) {
          row.data[this.field] = [];
          row.modules.dataTree.open = this.startOpen(row.getComponent(), row.modules.dataTree.index);
        }

        if (typeof index !== "undefined") {
          childIndex = this.findChildIndex(index, row);

          if (childIndex !== false) {
            row.data[this.field].splice(top ? childIndex : childIndex + 1, 0, data);
          }
        }

        if (childIndex === false) {
          if (top) {
            row.data[this.field].unshift(data);
          } else {
            row.data[this.field].push(data);
          }
        }

        this.initializeRow(row);
        this.layoutRow(row);
        this.refreshData(true);
      }
    }, {
      key: "findChildIndex",
      value: function findChildIndex(subject, parent) {
        var _this8 = this;

        var match = false;

        if (_typeof(subject) == "object") {
          if (subject instanceof Row) {
            //subject is row element
            match = subject.data;
          } else if (subject instanceof RowComponent) {
            //subject is public row component
            match = subject._getSelf().data;
          } else if (typeof HTMLElement !== "undefined" && subject instanceof HTMLElement) {
            if (parent.modules.dataTree) {
              match = parent.modules.dataTree.children.find(function (childRow) {
                return childRow instanceof Row ? childRow.element === subject : false;
              });

              if (match) {
                match = match.data;
              }
            }
          }
        } else if (typeof subject == "undefined" || subject === null) {
          match = false;
        } else {
          //subject should be treated as the index of the row
          match = parent.data[this.field].find(function (row) {
            return row.data[_this8.table.options.index] == subject;
          });
        }

        if (match) {
          if (Array.isArray(parent.data[this.field])) {
            match = parent.data[this.field].indexOf(match);
          }

          if (match == -1) {
            match = false;
          }
        } //catch all for any other type of input


        return match;
      }
    }, {
      key: "getTreeChildren",
      value: function getTreeChildren(row, component, recurse) {
        var _this9 = this;

        var config = row.modules.dataTree,
            output = [];

        if (config.children) {
          if (!Array.isArray(config.children)) {
            config.children = this.generateChildren(row);
          }

          config.children.forEach(function (childRow) {
            if (childRow instanceof Row) {
              output.push(component ? childRow.getComponent() : childRow);

              if (recurse) {
                output = output.concat(_this9.getTreeChildren(childRow, component, recurse));
              }
            }
          });
        }

        return output;
      }
    }, {
      key: "getChildField",
      value: function getChildField() {
        return this.field;
      }
    }, {
      key: "redrawNeeded",
      value: function redrawNeeded(data) {
        return (this.field ? typeof data[this.field] !== "undefined" : false) || (this.elementField ? typeof data[this.elementField] !== "undefined" : false);
      }
    }]);

    return DataTree;
  }(Module);

  DataTree.moduleName = "dataTree";

  function csv (list, options, setFileContents) {
    var delimiter = options && options.delimiter ? options.delimiter : ",",
        fileContents = [],
        headers = [];
    list.forEach(function (row) {
      var item = [];

      switch (row.type) {
        case "group":
          console.warn("Download Warning - CSV downloader cannot process row groups");
          break;

        case "calc":
          console.warn("Download Warning - CSV downloader cannot process column calculations");
          break;

        case "header":
          row.columns.forEach(function (col, i) {
            if (col && col.depth === 1) {
              headers[i] = typeof col.value == "undefined" || col.value === null ? "" : '"' + String(col.value).split('"').join('""') + '"';
            }
          });
          break;

        case "row":
          row.columns.forEach(function (col) {
            if (col) {
              switch (_typeof(col.value)) {
                case "object":
                  col.value = col.value !== null ? JSON.stringify(col.value) : "";
                  break;

                case "undefined":
                  col.value = "";
                  break;
              }

              item.push('"' + String(col.value).split('"').join('""') + '"');
            }
          });
          fileContents.push(item.join(delimiter));
          break;
      }
    });

    if (headers.length) {
      fileContents.unshift(headers.join(delimiter));
    }

    fileContents = fileContents.join("\n");

    if (options.bom) {
      fileContents = "\uFEFF" + fileContents;
    }

    setFileContents(fileContents, "text/csv");
  }

  function json (list, options, setFileContents) {
    var fileContents = [];
    list.forEach(function (row) {
      var item = {};

      switch (row.type) {
        case "header":
          break;

        case "group":
          console.warn("Download Warning - JSON downloader cannot process row groups");
          break;

        case "calc":
          console.warn("Download Warning - JSON downloader cannot process column calculations");
          break;

        case "row":
          row.columns.forEach(function (col) {
            if (col) {
              item[col.component.getTitleDownload() || col.component.getField()] = col.value;
            }
          });
          fileContents.push(item);
          break;
      }
    });
    fileContents = JSON.stringify(fileContents, null, '\t');
    setFileContents(fileContents, "application/json");
  }

  function pdf (list, options, setFileContents) {
    var header = [],
        body = [],
        autoTableParams = {},
        rowGroupStyles = options.rowGroupStyles || {
      fontStyle: "bold",
      fontSize: 12,
      cellPadding: 6,
      fillColor: 220
    },
        rowCalcStyles = options.rowCalcStyles || {
      fontStyle: "bold",
      fontSize: 10,
      cellPadding: 4,
      fillColor: 232
    },
        jsPDFParams = options.jsPDF || {},
        title = options && options.title ? options.title : "";

    if (!jsPDFParams.orientation) {
      jsPDFParams.orientation = options.orientation || "landscape";
    }

    if (!jsPDFParams.unit) {
      jsPDFParams.unit = "pt";
    } //parse row list


    list.forEach(function (row) {

      switch (row.type) {
        case "header":
          header.push(parseRow(row));
          break;

        case "group":
          body.push(parseRow(row, rowGroupStyles));
          break;

        case "calc":
          body.push(parseRow(row, rowCalcStyles));
          break;

        case "row":
          body.push(parseRow(row));
          break;
      }
    });

    function parseRow(row, styles) {
      var rowData = [];
      row.columns.forEach(function (col) {
        var cell;

        if (col) {
          switch (_typeof(col.value)) {
            case "object":
              col.value = col.value !== null ? JSON.stringify(col.value) : "";
              break;

            case "undefined":
              col.value = "";
              break;
          }

          cell = {
            content: col.value,
            colSpan: col.width,
            rowSpan: col.height
          };

          if (styles) {
            cell.styles = styles;
          }

          rowData.push(cell);
        }
      });
      return rowData;
    } //configure PDF


    var doc = new jspdf.jsPDF(jsPDFParams); //set document to landscape, better for most tables

    if (options && options.autoTable) {
      if (typeof options.autoTable === "function") {
        autoTableParams = options.autoTable(doc) || {};
      } else {
        autoTableParams = options.autoTable;
      }
    }

    if (title) {
      autoTableParams.didDrawPage = function (data) {
        doc.text(title, 40, 30);
      };
    }

    autoTableParams.head = header;
    autoTableParams.body = body;
    doc.autoTable(autoTableParams);

    if (options && options.documentProcessing) {
      options.documentProcessing(doc);
    }

    setFileContents(doc.output("arraybuffer"), "application/pdf");
  }

  function xlsx (list, options, setFileContents) {
    var self = this,
        sheetName = options.sheetName || "Sheet1",
        workbook = XLSX.utils.book_new(),
        tableFeatures = new CoreFeature(this),
        output;
    workbook.SheetNames = [];
    workbook.Sheets = {};

    function generateSheet() {
      var rows = [],
          merges = [],
          worksheet = {},
          range = {
        s: {
          c: 0,
          r: 0
        },
        e: {
          c: list[0] ? list[0].columns.reduce(function (a, b) {
            return a + (b && b.width ? b.width : 1);
          }, 0) : 0,
          r: list.length
        }
      }; //parse row list

      list.forEach(function (row, i) {
        var rowData = [];
        row.columns.forEach(function (col, j) {
          if (col) {
            rowData.push(!(col.value instanceof Date) && _typeof(col.value) === "object" ? JSON.stringify(col.value) : col.value);

            if (col.width > 1 || col.height > -1) {
              if (col.height > 1 || col.width > 1) {
                merges.push({
                  s: {
                    r: i,
                    c: j
                  },
                  e: {
                    r: i + col.height - 1,
                    c: j + col.width - 1
                  }
                });
              }
            }
          } else {
            rowData.push("");
          }
        });
        rows.push(rowData);
      }); //convert rows to worksheet

      XLSX.utils.sheet_add_aoa(worksheet, rows);
      worksheet['!ref'] = XLSX.utils.encode_range(range);

      if (merges.length) {
        worksheet["!merges"] = merges;
      }

      return worksheet;
    }

    if (options.sheetOnly) {
      setFileContents(generateSheet());
      return;
    }

    if (options.sheets) {
      for (var sheet in options.sheets) {
        if (options.sheets[sheet] === true) {
          workbook.SheetNames.push(sheet);
          workbook.Sheets[sheet] = generateSheet();
        } else {
          workbook.SheetNames.push(sheet);
          tableFeatures.commsSend(options.sheets[sheet], "download", "intercept", {
            type: "xlsx",
            options: {
              sheetOnly: true
            },
            active: self.active,
            intercept: function intercept(data) {
              workbook.Sheets[sheet] = data;
            }
          });
        }
      }
    } else {
      workbook.SheetNames.push(sheetName);
      workbook.Sheets[sheetName] = generateSheet();
    }

    if (options.documentProcessing) {
      workbook = options.documentProcessing(workbook);
    } //convert workbook to binary array


    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);

      for (var i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }

      return buf;
    }

    output = XLSX.write(workbook, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'binary'
    });
    setFileContents(s2ab(output), "application/octet-stream");
  }

  function html (list, options, setFileContents) {
    if (this.modExists("export", true)) {
      setFileContents(this.modules["export"].genereateHTMLTable(list), "text/html");
    }
  }

  function jsonLines (list, options, setFileContents) {
    var fileContents = [];
    list.forEach(function (row) {
      var item = {};

      switch (row.type) {
        case "header":
          break;

        case "group":
          console.warn("Download Warning - JSON downloader cannot process row groups");
          break;

        case "calc":
          console.warn("Download Warning - JSON downloader cannot process column calculations");
          break;

        case "row":
          row.columns.forEach(function (col) {
            if (col) {
              item[col.component.getTitleDownload() || col.component.getField()] = col.value;
            }
          });
          fileContents.push(JSON.stringify(item));
          break;
      }
    });
    setFileContents(fileContents.join("\n"), "application/x-ndjson");
  }

  var defaultDownloaders = {
    csv: csv,
    json: json,
    jsonLines: jsonLines,
    pdf: pdf,
    xlsx: xlsx,
    html: html
  };

  var Download = /*#__PURE__*/function (_Module) {
    _inherits(Download, _Module);

    var _super = _createSuper(Download);

    function Download(table) {
      var _this;

      _classCallCheck(this, Download);

      _this = _super.call(this, table);

      _this.registerTableOption("downloadReady", function (data, blob) {
        return blob;
      }); //function to manipulate download data


      _this.registerTableOption("downloadConfig", {}); //download config


      _this.registerTableOption("downloadRowRange", "active"); //restrict download to active rows only


      _this.registerColumnOption("download");

      _this.registerColumnOption("titleDownload");

      return _this;
    }

    _createClass(Download, [{
      key: "initialize",
      value: function initialize() {
        this.registerTableFunction("download", this.download.bind(this));
        this.registerTableFunction("downloadToTab", this.downloadToTab.bind(this));
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////

    }, {
      key: "downloadToTab",
      value: function downloadToTab(type, filename, options, active) {
        this.download(type, filename, options, active, true);
      } ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////
      //trigger file download

    }, {
      key: "download",
      value: function download(type, filename, options, range, interceptCallback) {
        var downloadFunc = false;

        function buildLink(data, mime) {
          if (interceptCallback) {
            if (interceptCallback === true) {
              this.triggerDownload(data, mime, type, filename, true);
            } else {
              interceptCallback(data);
            }
          } else {
            this.triggerDownload(data, mime, type, filename);
          }
        }

        if (typeof type == "function") {
          downloadFunc = type;
        } else {
          if (Download.downloaders[type]) {
            downloadFunc = Download.downloaders[type];
          } else {
            console.warn("Download Error - No such download type found: ", type);
          }
        }

        if (downloadFunc) {
          var list = this.generateExportList(range);
          downloadFunc.call(this.table, list, options || {}, buildLink.bind(this));
        }
      }
    }, {
      key: "generateExportList",
      value: function generateExportList(range) {
        var list = this.table.modules["export"].generateExportList(this.table.options.downloadConfig, false, range || this.table.options.downloadRowRange, "download"); //assign group header formatter

        var groupHeader = this.table.options.groupHeaderDownload;

        if (groupHeader && !Array.isArray(groupHeader)) {
          groupHeader = [groupHeader];
        }

        list.forEach(function (row) {
          var group;

          if (row.type === "group") {
            group = row.columns[0];

            if (groupHeader && groupHeader[row.indent]) {
              group.value = groupHeader[row.indent](group.value, row.component._group.getRowCount(), row.component._group.getData(), row.component);
            }
          }
        });
        return list;
      }
    }, {
      key: "triggerDownload",
      value: function triggerDownload(data, mime, type, filename, newTab) {
        var element = document.createElement('a'),
            blob = new Blob([data], {
          type: mime
        }),
            filename = filename || "Tabulator." + (typeof type === "function" ? "txt" : type);
        blob = this.table.options.downloadReady(data, blob);

        if (blob) {
          if (newTab) {
            window.open(window.URL.createObjectURL(blob));
          } else {
            if (navigator.msSaveOrOpenBlob) {
              navigator.msSaveOrOpenBlob(blob, filename);
            } else {
              element.setAttribute('href', window.URL.createObjectURL(blob)); //set file title

              element.setAttribute('download', filename); //trigger download

              element.style.display = 'none';
              document.body.appendChild(element);
              element.click(); //remove temporary link element

              document.body.removeChild(element);
            }
          }

          this.dispatchExternal("downloadComplete");
        }
      }
    }, {
      key: "commsReceived",
      value: function commsReceived(table, action, data) {
        switch (action) {
          case "intercept":
            this.download(data.type, "", data.options, data.active, data.intercept);
            break;
        }
      }
    }]);

    return Download;
  }(Module);

  Download.moduleName = "download"; //load defaults

  Download.downloaders = defaultDownloaders;

  function maskInput(el, options) {
    var mask = options.mask,
        maskLetter = typeof options.maskLetterChar !== "undefined" ? options.maskLetterChar : "A",
        maskNumber = typeof options.maskNumberChar !== "undefined" ? options.maskNumberChar : "9",
        maskWildcard = typeof options.maskWildcardChar !== "undefined" ? options.maskWildcardChar : "*";

    function fillSymbols(index) {
      var symbol = mask[index];

      if (typeof symbol !== "undefined" && symbol !== maskWildcard && symbol !== maskLetter && symbol !== maskNumber) {
        el.value = el.value + "" + symbol;
        fillSymbols(index + 1);
      }
    }

    el.addEventListener("keydown", function (e) {
      var index = el.value.length,
          _char = e.key;

      if (e.keyCode > 46) {
        if (index >= mask.length) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        } else {
          switch (mask[index]) {
            case maskLetter:
              if (_char.toUpperCase() == _char.toLowerCase()) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }

              break;

            case maskNumber:
              if (isNaN(_char)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }

              break;

            case maskWildcard:
              break;

            default:
              if (_char !== mask[index]) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }

          }
        }
      }

      return;
    });
    el.addEventListener("keyup", function (e) {
      if (e.keyCode > 46) {
        if (options.maskAutoFill) {
          fillSymbols(el.value.length);
        }
      }
    });

    if (!el.placeholder) {
      el.placeholder = mask;
    }

    if (options.maskAutoFill) {
      fillSymbols(el.value.length);
    }
  }

  function input (cell, onRendered, success, cancel, editorParams) {
    //create and style input
    var cellValue = cell.getValue(),
        input = document.createElement("input");
    input.setAttribute("type", editorParams.search ? "search" : "text");
    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    if (editorParams.elementAttributes && _typeof(editorParams.elementAttributes) == "object") {
      for (var key in editorParams.elementAttributes) {
        if (key.charAt(0) == "+") {
          key = key.slice(1);
          input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
        } else {
          input.setAttribute(key, editorParams.elementAttributes[key]);
        }
      }
    }

    input.value = typeof cellValue !== "undefined" ? cellValue : "";
    onRendered(function () {
      input.focus({
        preventScroll: true
      });
      input.style.height = "100%";

      if (editorParams.selectContents) {
        input.select();
      }
    });

    function onChange(e) {
      if ((cellValue === null || typeof cellValue === "undefined") && input.value !== "" || input.value !== cellValue) {
        if (success(input.value)) {
          cellValue = input.value; //persist value if successfully validated incase editor is used as header filter
        }
      } else {
        cancel();
      }
    } //submit new value on blur or change


    input.addEventListener("change", onChange);
    input.addEventListener("blur", onChange); //submit new value on enter

    input.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        // case 9:
        case 13:
          onChange();
          break;

        case 27:
          cancel();
          break;

        case 35:
        case 36:
          e.stopPropagation();
          break;
      }
    });

    if (editorParams.mask) {
      maskInput(input, editorParams);
    }

    return input;
  }

  function textarea (cell, onRendered, success, cancel, editorParams) {
    var cellValue = cell.getValue(),
        vertNav = editorParams.verticalNavigation || "hybrid",
        value = String(cellValue !== null && typeof cellValue !== "undefined" ? cellValue : ""),
        count = (value.match(/(?:\r\n|\r|\n)/g) || []).length + 1,
        input = document.createElement("textarea"),
        scrollHeight = 0; //create and style input

    input.style.display = "block";
    input.style.padding = "2px";
    input.style.height = "100%";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";
    input.style.whiteSpace = "pre-wrap";
    input.style.resize = "none";

    if (editorParams.elementAttributes && _typeof(editorParams.elementAttributes) == "object") {
      for (var key in editorParams.elementAttributes) {
        if (key.charAt(0) == "+") {
          key = key.slice(1);
          input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
        } else {
          input.setAttribute(key, editorParams.elementAttributes[key]);
        }
      }
    }

    input.value = value;
    onRendered(function () {
      input.focus({
        preventScroll: true
      });
      input.style.height = "100%";
      input.scrollHeight;
      input.style.height = input.scrollHeight + "px";
      cell.getRow().normalizeHeight();

      if (editorParams.selectContents) {
        input.select();
      }
    });

    function onChange(e) {
      if ((cellValue === null || typeof cellValue === "undefined") && input.value !== "" || input.value !== cellValue) {
        if (success(input.value)) {
          cellValue = input.value; //persist value if successfully validated incase editor is used as header filter
        }

        setTimeout(function () {
          cell.getRow().normalizeHeight();
        }, 300);
      } else {
        cancel();
      }
    } //submit new value on blur or change


    input.addEventListener("change", onChange);
    input.addEventListener("blur", onChange);
    input.addEventListener("keyup", function () {
      input.style.height = "";
      var heightNow = input.scrollHeight;
      input.style.height = heightNow + "px";

      if (heightNow != scrollHeight) {
        scrollHeight = heightNow;
        cell.getRow().normalizeHeight();
      }
    });
    input.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 27:
          cancel();
          break;

        case 38:
          //up arrow
          if (vertNav == "editor" || vertNav == "hybrid" && input.selectionStart) {
            e.stopImmediatePropagation();
            e.stopPropagation();
          }

          break;

        case 40:
          //down arrow
          if (vertNav == "editor" || vertNav == "hybrid" && input.selectionStart !== input.value.length) {
            e.stopImmediatePropagation();
            e.stopPropagation();
          }

          break;

        case 35:
        case 36:
          e.stopPropagation();
          break;
      }
    });

    if (editorParams.mask) {
      maskInput(input, editorParams);
    }

    return input;
  }

  function number (cell, onRendered, success, cancel, editorParams) {
    var cellValue = cell.getValue(),
        vertNav = editorParams.verticalNavigation || "editor",
        input = document.createElement("input");
    input.setAttribute("type", "number");

    if (typeof editorParams.max != "undefined") {
      input.setAttribute("max", editorParams.max);
    }

    if (typeof editorParams.min != "undefined") {
      input.setAttribute("min", editorParams.min);
    }

    if (typeof editorParams.step != "undefined") {
      input.setAttribute("step", editorParams.step);
    } //create and style input


    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    if (editorParams.elementAttributes && _typeof(editorParams.elementAttributes) == "object") {
      for (var key in editorParams.elementAttributes) {
        if (key.charAt(0) == "+") {
          key = key.slice(1);
          input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
        } else {
          input.setAttribute(key, editorParams.elementAttributes[key]);
        }
      }
    }

    input.value = cellValue;

    var blurFunc = function blurFunc(e) {
      onChange();
    };

    onRendered(function () {
      //submit new value on blur
      input.removeEventListener("blur", blurFunc);
      input.focus({
        preventScroll: true
      });
      input.style.height = "100%"; //submit new value on blur

      input.addEventListener("blur", blurFunc);

      if (editorParams.selectContents) {
        input.select();
      }
    });

    function onChange() {
      var value = input.value;

      if (!isNaN(value) && value !== "") {
        value = Number(value);
      }

      if (value !== cellValue) {
        if (success(value)) {
          cellValue = value; //persist value if successfully validated incase editor is used as header filter
        }
      } else {
        cancel();
      }
    } //submit new value on enter


    input.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 13:
          // case 9:
          onChange();
          break;

        case 27:
          cancel();
          break;

        case 38: //up arrow

        case 40:
          //down arrow
          if (vertNav == "editor") {
            e.stopImmediatePropagation();
            e.stopPropagation();
          }

          break;

        case 35:
        case 36:
          e.stopPropagation();
          break;
      }
    });

    if (editorParams.mask) {
      maskInput(input, editorParams);
    }

    return input;
  }

  //input element with type of number
  function range (cell, onRendered, success, cancel, editorParams) {
    var cellValue = cell.getValue(),
        input = document.createElement("input");
    input.setAttribute("type", "range");

    if (typeof editorParams.max != "undefined") {
      input.setAttribute("max", editorParams.max);
    }

    if (typeof editorParams.min != "undefined") {
      input.setAttribute("min", editorParams.min);
    }

    if (typeof editorParams.step != "undefined") {
      input.setAttribute("step", editorParams.step);
    } //create and style input


    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    if (editorParams.elementAttributes && _typeof(editorParams.elementAttributes) == "object") {
      for (var key in editorParams.elementAttributes) {
        if (key.charAt(0) == "+") {
          key = key.slice(1);
          input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
        } else {
          input.setAttribute(key, editorParams.elementAttributes[key]);
        }
      }
    }

    input.value = cellValue;
    onRendered(function () {
      input.focus({
        preventScroll: true
      });
      input.style.height = "100%";
    });

    function onChange() {
      var value = input.value;

      if (!isNaN(value) && value !== "") {
        value = Number(value);
      }

      if (value != cellValue) {
        if (success(value)) {
          cellValue = value; //persist value if successfully validated incase editor is used as header filter
        }
      } else {
        cancel();
      }
    } //submit new value on blur


    input.addEventListener("blur", function (e) {
      onChange();
    }); //submit new value on enter

    input.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 13:
          // case 9:
          onChange();
          break;

        case 27:
          cancel();
          break;
      }
    });
    return input;
  }

  var Edit = /*#__PURE__*/function () {
    function Edit(editor, cell, onRendered, success, cancel, editorParams) {
      _classCallCheck(this, Edit);

      this.edit = editor;
      this.table = editor.table;
      this.cell = cell;
      this.params = this._initializeParams(editorParams);
      this.data = [];
      this.displayItems = [];
      this.currentItems = [];
      this.focusedItem = null;
      this.input = this._createInputElement();
      this.listEl = this._createListElement();
      this.initialValues = null;
      this.isFilter = !cell._getSelf;
      this.filterTimeout = null;
      this.filtered = false;
      this.typing = false;
      this.values = [];
      this.popup = null;
      this.listIteration = 0;
      this.lastAction = "";
      this.blurable = true;
      this.actions = {
        success: success,
        cancel: cancel
      };

      this._deprecationCheck();

      this._initializeValue();

      onRendered(this._onRendered.bind(this));
    }

    _createClass(Edit, [{
      key: "_deprecationCheck",
      value: function _deprecationCheck() {
        if (this.params.listItemFormatter) {
          console.warn("The listItemFormatter editor param has been deprecated, please see the latest editor documentation for updated options");
        }

        if (this.params.sortValuesList) {
          console.warn("The sortValuesList editor param has been deprecated, please see the latest editor documentation for updated options");
        }

        if (this.params.searchFunc) {
          console.warn("The searchFunc editor param has been deprecated, please see the latest editor documentation for updated options");
        }

        if (this.params.searchingPlaceholder) {
          console.warn("The searchingPlaceholder editor param has been deprecated, please see the latest editor documentation for updated options");
        }
      }
    }, {
      key: "_initializeValue",
      value: function _initializeValue() {
        var initialValue = this.cell.getValue();

        if (typeof initialValue === "undefined" && typeof this.params.defaultValue !== "undefined") {
          initialValue = this.params.defaultValue;
        }

        this.initialValues = this.params.multiselect ? initialValue : [initialValue];

        if (this.isFilter) {
          this.input.value = this.initialValues ? this.initialValues.join(",") : "";
          this.headerFilterInitialListGen();
        }
      }
    }, {
      key: "_onRendered",
      value: function _onRendered() {
        var cellEl = this.cell.getElement();

        function clickStop(e) {
          e.stopPropagation();
        }

        this.input.style.height = "100%";
        this.input.focus({
          preventScroll: true
        });
        cellEl.addEventListener("click", clickStop);
        setTimeout(function () {
          cellEl.removeEventListener("click", clickStop);
        }, 1000);
      }
    }, {
      key: "_createListElement",
      value: function _createListElement() {
        var listEl = document.createElement("div");
        listEl.classList.add("tabulator-edit-list");
        listEl.addEventListener("mousedown", this._preventBlur.bind(this));
        listEl.addEventListener("keydown", this._inputKeyDown.bind(this));
        return listEl;
      }
    }, {
      key: "_setListWidth",
      value: function _setListWidth() {
        var element = this.isFilter ? this.input : this.cell.getElement();
        this.listEl.style.minWidth = element.offsetWidth + "px";

        if (this.params.maxWidth) {
          if (this.params.maxWidth === true) {
            this.listEl.style.maxWidth = element.offsetWidth + "px";
          } else if (typeof this.params.maxWidth === "number") {
            this.listEl.style.maxWidth = this.params.maxWidth + "px";
          } else {
            this.listEl.style.maxWidth = this.params.maxWidth;
          }
        }
      }
    }, {
      key: "_createInputElement",
      value: function _createInputElement() {
        var attribs = this.params.elementAttributes;
        var input = document.createElement("input");
        input.setAttribute("type", this.params.clearable ? "search" : "text");
        input.style.padding = "4px";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";

        if (!this.params.autocomplete) {
          input.style.cursor = "default";
          input.style.caretColor = "transparent"; // input.readOnly = (this.edit.currentCell != false);
        }

        if (attribs && _typeof(attribs) == "object") {
          for (var key in attribs) {
            if (key.charAt(0) == "+") {
              key = key.slice(1);
              input.setAttribute(key, input.getAttribute(key) + attribs["+" + key]);
            } else {
              input.setAttribute(key, attribs[key]);
            }
          }
        }

        if (this.params.mask) {
          maskInput(input, this.params);
        }

        this._bindInputEvents(input);

        return input;
      }
    }, {
      key: "_initializeParams",
      value: function _initializeParams(params) {
        var valueKeys = ["values", "valuesURL", "valuesLookup"],
            valueCheck;
        params = Object.assign({}, params);
        params.verticalNavigation = params.verticalNavigation || "editor";
        params.placeholderLoading = typeof params.placeholderLoading === "undefined" ? "Searching ..." : params.placeholderLoading;
        params.placeholderEmpty = typeof params.placeholderEmpty === "undefined" ? "No Results Found" : params.placeholderEmpty;
        params.filterDelay = typeof params.filterDelay === "undefined" ? 300 : params.filterDelay;
        params.emptyValue = Object.keys(params).includes("emptyValue") ? params.emptyValue : "";
        valueCheck = Object.keys(params).filter(function (key) {
          return valueKeys.includes(key);
        }).length;

        if (!valueCheck) {
          console.warn("list editor config error - either the values, valuesURL, or valuesLookup option must be set");
        } else if (valueCheck > 1) {
          console.warn("list editor config error - only one of the values, valuesURL, or valuesLookup options can be set on the same editor");
        }

        if (params.autocomplete) {
          if (params.multiselect) {
            params.multiselect = false;
            console.warn("list editor config error - multiselect option is not available when autocomplete is enabled");
          }
        } else {
          if (params.freetext) {
            params.freetext = false;
            console.warn("list editor config error - freetext option is only available when autocomplete is enabled");
          }

          if (params.filterFunc) {
            params.filterFunc = false;
            console.warn("list editor config error - filterFunc option is only available when autocomplete is enabled");
          }

          if (params.filterRemote) {
            params.filterRemote = false;
            console.warn("list editor config error - filterRemote option is only available when autocomplete is enabled");
          }

          if (params.mask) {
            params.mask = false;
            console.warn("list editor config error - mask option is only available when autocomplete is enabled");
          }

          if (params.allowEmpty) {
            params.allowEmpty = false;
            console.warn("list editor config error - allowEmpty option is only available when autocomplete is enabled");
          }

          if (params.listOnEmpty) {
            params.listOnEmpty = false;
            console.warn("list editor config error - listOnEmpty option is only available when autocomplete is enabled");
          }
        }

        if (params.filterRemote && !(typeof params.valuesLookup === "function" || _typeof(params.valuesURL))) {
          params.filterRemote = false;
          console.warn("list editor config error - filterRemote option should only be used when values list is populated from a remote source");
        }

        return params;
      } //////////////////////////////////////
      ////////// Event Handling ////////////
      //////////////////////////////////////

    }, {
      key: "_bindInputEvents",
      value: function _bindInputEvents(input) {
        input.addEventListener("focus", this._inputFocus.bind(this));
        input.addEventListener("click", this._inputClick.bind(this));
        input.addEventListener("blur", this._inputBlur.bind(this));
        input.addEventListener("keydown", this._inputKeyDown.bind(this));
        input.addEventListener("search", this._inputSearch.bind(this));

        if (this.params.autocomplete) {
          input.addEventListener("keyup", this._inputKeyUp.bind(this));
        }
      }
    }, {
      key: "_inputFocus",
      value: function _inputFocus(e) {
        this.rebuildOptionsList();
      }
    }, {
      key: "_filter",
      value: function _filter() {
        var _this = this;

        if (this.params.filterRemote) {
          clearTimeout(this.filterTimeout);
          this.filterTimeout = setTimeout(function () {
            _this.rebuildOptionsList();
          }, this.params.filterDelay);
        } else {
          this._filterList();
        }
      }
    }, {
      key: "_inputClick",
      value: function _inputClick(e) {
        e.stopPropagation();
      }
    }, {
      key: "_inputBlur",
      value: function _inputBlur(e) {
        if (this.blurable && this.popup) {
          this.popup.hide();
        }
      }
    }, {
      key: "_inputSearch",
      value: function _inputSearch() {
        this._clearChoices();
      }
    }, {
      key: "_inputKeyDown",
      value: function _inputKeyDown(e) {
        switch (e.keyCode) {
          case 38:
            //up arrow
            this._keyUp(e);

            break;

          case 40:
            //down arrow
            this._keyDown(e);

            break;

          case 37: //left arrow

          case 39:
            //right arrow
            this._keySide(e);

            break;

          case 13:
            //enter
            this._keyEnter();

            break;

          case 27:
            //escape
            this._keyEsc();

            break;

          case 36: //home

          case 35:
            //end
            this._keyHomeEnd(e);

            break;

          case 9:
            //tab
            break;

          default:
            this._keySelectLetter(e);

        }
      }
    }, {
      key: "_inputKeyUp",
      value: function _inputKeyUp(e) {
        switch (e.keyCode) {
          case 38: //up arrow

          case 37: //left arrow

          case 39: //up arrow

          case 40: //right arrow

          case 13: //enter

          case 27:
            //escape
            break;

          default:
            this._keyAutoCompLetter(e);

        }
      }
    }, {
      key: "_preventBlur",
      value: function _preventBlur() {
        this.blurable = false;
        setTimeout(function () {
          this.blurable = true;
        }, 10);
      } //////////////////////////////////////
      //////// Keyboard Navigation /////////
      //////////////////////////////////////

    }, {
      key: "_keyUp",
      value: function _keyUp(e) {
        var index = this.displayItems.indexOf(this.focusedItem);

        if (this.params.verticalNavigation == "editor" || this.params.verticalNavigation == "hybrid" && index) {
          e.stopImmediatePropagation();
          e.stopPropagation();
          e.preventDefault();

          if (index > 0) {
            this._focusItem(this.displayItems[index - 1]);
          }
        }
      }
    }, {
      key: "_keyDown",
      value: function _keyDown(e) {
        var index = this.displayItems.indexOf(this.focusedItem);

        if (this.params.verticalNavigation == "editor" || this.params.verticalNavigation == "hybrid" && index < this.displayItems.length - 1) {
          e.stopImmediatePropagation();
          e.stopPropagation();
          e.preventDefault();

          if (index < this.displayItems.length - 1) {
            if (index == -1) {
              this._focusItem(this.displayItems[0]);
            } else {
              this._focusItem(this.displayItems[index + 1]);
            }
          }
        }
      }
    }, {
      key: "_keySide",
      value: function _keySide(e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
      }
    }, {
      key: "_keyEnter",
      value: function _keyEnter(e) {
        if (this.params.autocomplete && this.lastAction === "typing") {
          this._resolveValue(true);
        } else {
          if (this.focusedItem) {
            this._chooseItem(this.focusedItem);
          }
        }
      }
    }, {
      key: "_keyEsc",
      value: function _keyEsc(e) {
        this._cancel();
      }
    }, {
      key: "_keyHomeEnd",
      value: function _keyHomeEnd(e) {
        if (this.params.autocomplete) {
          //prevent table navigation while using input element
          e.stopImmediatePropagation();
        }
      }
    }, {
      key: "_keySelectLetter",
      value: function _keySelectLetter(e) {
        if (!this.params.autocomplete) {
          // if(this.edit.currentCell === false){
          e.preventDefault(); // }

          if (e.keyCode >= 38 && e.keyCode <= 90) {
            this._scrollToValue(e.keyCode);
          }
        }
      }
    }, {
      key: "_keyAutoCompLetter",
      value: function _keyAutoCompLetter(e) {
        this._filter();

        this.lastAction = "typing";
        this.typing = true;
      }
    }, {
      key: "_scrollToValue",
      value: function _scrollToValue(_char) {
        var _this2 = this;

        clearTimeout(this.filterTimeout);
        var character = String.fromCharCode(_char).toLowerCase();
        this.filterTerm += character.toLowerCase();
        var match = this.displayItems.find(function (item) {
          return typeof item.label !== "undefined" && item.label.toLowerCase().startsWith(_this2.filterTerm);
        });

        if (match) {
          this._focusItem(match);
        }

        this.filterTimeout = setTimeout(function () {
          _this2.filterTerm = "";
        }, 800);
      }
    }, {
      key: "_focusItem",
      value: function _focusItem(item) {
        this.lastAction = "focus";

        if (this.focusedItem && this.focusedItem.element) {
          this.focusedItem.element.classList.remove("focused");
        }

        this.focusedItem = item;

        if (item && item.element) {
          item.element.classList.add("focused");
          item.element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
          });
        }
      } //////////////////////////////////////
      /////// Data List Generation /////////
      //////////////////////////////////////

    }, {
      key: "headerFilterInitialListGen",
      value: function headerFilterInitialListGen() {
        this._generateOptions(true);
      }
    }, {
      key: "rebuildOptionsList",
      value: function rebuildOptionsList() {
        this._generateOptions().then(this._sortOptions.bind(this)).then(this._buildList.bind(this)).then(this._showList.bind(this))["catch"](function (e) {
          if (!Number.isInteger(e)) {
            console.error("List generation error", e);
          }
        });
      }
    }, {
      key: "_filterList",
      value: function _filterList() {
        this._buildList(this._filterOptions());

        this._showList();
      }
    }, {
      key: "_generateOptions",
      value: function _generateOptions(silent) {
        var _this3 = this;

        var values = [];
        var itteration = ++this.listIteration;
        this.filtered = false;

        if (this.params.values) {
          values = this.params.values;
        } else if (this.params.valuesURL) {
          values = this._ajaxRequest(this.params.valuesURL, this.input.value);
        } else {
          if (typeof this.params.valuesLookup === "function") {
            values = this.params.valuesLookup(this.cell, this.input.value);
          } else if (this.params.valuesLookup) {
            values = this._uniqueColumnValues(this.params.valuesLookupField);
          }
        }

        if (values instanceof Promise) {
          if (!silent) {
            this._addPlaceholder(this.params.placeholderLoading);
          }

          return values.then().then(function (responseValues) {
            if (_this3.listIteration === itteration) {
              return _this3._parseList(responseValues);
            } else {
              return Promise.reject(itteration);
            }
          });
        } else {
          return Promise.resolve(this._parseList(values));
        }
      }
    }, {
      key: "_addPlaceholder",
      value: function _addPlaceholder(contents) {
        var placeholder = document.createElement("div");

        if (typeof contents === "function") {
          contents = contents(cell.getComponent(), this.listEl);
        }

        if (contents) {
          this._clearList();

          if (contents instanceof HTMLElement) {
            placeholder = contents;
          } else {
            placeholder.classList.add("tabulator-edit-list-placeholder");
            placeholder.innerHTML = contents;
          }

          this.listEl.appendChild(placeholder);

          this._showList();
        }
      }
    }, {
      key: "_ajaxRequest",
      value: function _ajaxRequest(url, term) {
        var params = this.params.filterRemote ? {
          term: term
        } : {};
        url = urlBuilder(url, {}, params);
        return fetch(url).then(function (response) {
          if (response.ok) {
            return response.json()["catch"](function (error) {
              console.warn("List Ajax Load Error - Invalid JSON returned", error);
              return Promise.reject(error);
            });
          } else {
            console.error("List Ajax Load Error - Connection Error: " + response.status, response.statusText);
            return Promise.reject(response);
          }
        })["catch"](function (error) {
          console.error("List Ajax Load Error - Connection Error: ", error);
          return Promise.reject(error);
        });
      }
    }, {
      key: "_uniqueColumnValues",
      value: function _uniqueColumnValues(field) {
        var output = {},
            data = this.table.getData(this.params.valuesLookup),
            column;

        if (field) {
          column = this.table.columnManager.getColumnByField(field);
        } else {
          column = this.cell.getColumn()._getSelf();
        }

        if (column) {
          data.forEach(function (row) {
            var val = column.getFieldValue(row);

            if (val !== null && typeof val !== "undefined" && val !== "") {
              output[val] = true;
            }
          });
        } else {
          console.warn("unable to find matching column to create select lookup list:", field);
          output = [];
        }

        return Object.keys(output);
      }
    }, {
      key: "_parseList",
      value: function _parseList(inputValues) {
        var _this4 = this;

        var data = [];

        if (!Array.isArray(inputValues)) {
          inputValues = Object.entries(inputValues).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            return {
              label: value,
              value: key
            };
          });
        }

        inputValues.forEach(function (value) {
          if (_typeof(value) !== "object") {
            value = {
              label: value,
              value: value
            };
          }

          _this4._parseListItem(value, data, 0);
        });

        if (!this.currentItems.length && this.params.freetext) {
          this.input.value = this.initialValues;
          this.typing = true;
          this.lastAction = "typing";
        }

        this.data = data;
        return data;
      }
    }, {
      key: "_parseListItem",
      value: function _parseListItem(option, data, level) {
        var item = {};

        if (option.options) {
          item = this._parseListGroup(option, level + 1);
        } else {
          item = {
            label: option.label,
            value: option.value,
            itemParams: option.itemParams,
            elementAttributes: option.elementAttributes,
            element: false,
            selected: false,
            visible: true,
            level: level,
            original: option
          };

          if (this.initialValues && this.initialValues.indexOf(option.value) > -1) {
            this._chooseItem(item, true);
          }
        }

        data.push(item);
      }
    }, {
      key: "_parseListGroup",
      value: function _parseListGroup(option, level) {
        var _this5 = this;

        var item = {
          label: option.label,
          group: true,
          itemParams: option.itemParams,
          elementAttributes: option.elementAttributes,
          element: false,
          visible: true,
          level: level,
          options: [],
          original: option
        };
        option.options.forEach(function (child) {
          _this5._parseListItem(child, item.options, level);
        });
        return item;
      }
    }, {
      key: "_sortOptions",
      value: function _sortOptions(options) {
        var sorter;

        if (this.params.sort) {
          sorter = typeof this.params.sort === "function" ? this.params.sort : this._defaultSortFunction.bind(this);

          this._sortGroup(sorter, options);
        }

        return options;
      }
    }, {
      key: "_sortGroup",
      value: function _sortGroup(sorter, options) {
        var _this6 = this;

        options.sort(function (a, b) {
          return sorter(a.label, b.label, a.value, b.value, a.original, b.original);
        });
        options.forEach(function (option) {
          if (option.group) {
            _this6._sortGroup(sorter, option.options);
          }
        });
      }
    }, {
      key: "_defaultSortFunction",
      value: function _defaultSortFunction(as, bs) {
        var a,
            b,
            a1,
            b1,
            i = 0,
            L,
            rx = /(\d+)|(\D+)/g,
            rd = /\d/;
        var emptyAlign = 0;

        if (this.params.sort === "desc") {
          var _ref3 = [bs, as];
          as = _ref3[0];
          bs = _ref3[1];
        } //handle empty values


        if (!as && as !== 0) {
          emptyAlign = !bs && bs !== 0 ? 0 : -1;
        } else if (!bs && bs !== 0) {
          emptyAlign = 1;
        } else {
          if (isFinite(as) && isFinite(bs)) return as - bs;
          a = String(as).toLowerCase();
          b = String(bs).toLowerCase();
          if (a === b) return 0;
          if (!(rd.test(a) && rd.test(b))) return a > b ? 1 : -1;
          a = a.match(rx);
          b = b.match(rx);
          L = a.length > b.length ? b.length : a.length;

          while (i < L) {
            a1 = a[i];
            b1 = b[i++];

            if (a1 !== b1) {
              if (isFinite(a1) && isFinite(b1)) {
                if (a1.charAt(0) === "0") a1 = "." + a1;
                if (b1.charAt(0) === "0") b1 = "." + b1;
                return a1 - b1;
              } else return a1 > b1 ? 1 : -1;
            }
          }

          return a.length > b.length;
        }

        return emptyAlign;
      }
    }, {
      key: "_filterOptions",
      value: function _filterOptions() {
        var _this7 = this;

        var filterFunc = this.params.filterFunc || this._defaultFilterFunc;
        var term = this.input.value;

        if (term) {
          this.filtered = true;
          this.data.forEach(function (item) {
            _this7._filterItem(filterFunc, term, item);
          });
        } else {
          this.filtered = false;
        }

        return this.data;
      }
    }, {
      key: "_filterItem",
      value: function _filterItem(func, term, item) {
        var _this8 = this;

        var matches = false;

        if (!item.group) {
          item.visible = func(term, item.label, item.value, item.original);
        } else {
          item.options.forEach(function (option) {
            if (_this8._filterItem(func, term, option)) {
              matches = true;
            }
          });
          item.visible = matches;
        }

        return item.visible;
      }
    }, {
      key: "_defaultFilterFunc",
      value: function _defaultFilterFunc(term, label, value, item) {
        var term = String(term).toLowerCase();

        if (label !== null || typeof label !== "undefined") {
          if (String(label).toLowerCase().indexOf(term) > -1 || String(value).toLowerCase(term).indexOf() > -1) {
            return true;
          }
        }

        return false;
      } //////////////////////////////////////
      /////////// Display List /////////////
      //////////////////////////////////////

    }, {
      key: "_clearList",
      value: function _clearList() {
        while (this.listEl.firstChild) {
          this.listEl.removeChild(this.listEl.firstChild);
        }

        this.displayItems = [];
      }
    }, {
      key: "_buildList",
      value: function _buildList(data) {
        var _this9 = this;

        this._clearList();

        data.forEach(function (option) {
          _this9._buildItem(option);
        });

        if (!this.displayItems.length) {
          this._addPlaceholder(this.params.placeholderEmpty);
        }
      }
    }, {
      key: "_buildItem",
      value: function _buildItem(item) {
        var _this10 = this;

        var el = item.element,
            contents;

        if (!this.filtered || item.visible) {
          if (!el) {
            el = document.createElement("div");
            el.tabIndex = 0;
            contents = this.params.itemFormatter ? this.params.itemFormatter(item.label, item.value, item.original, el) : item.label;

            if (contents instanceof HTMLElement) {
              el.appendChild(contents);
            } else {
              el.innerHTML = contents;
            }

            if (item.group) {
              el.classList.add("tabulator-edit-list-group");
            } else {
              el.classList.add("tabulator-edit-list-item");
            }

            el.classList.add("tabulator-edit-list-group-level-" + item.level);

            if (item.elementAttributes && _typeof(item.elementAttributes) == "object") {
              for (var key in item.elementAttributes) {
                if (key.charAt(0) == "+") {
                  key = key.slice(1);
                  el.setAttribute(key, this.input.getAttribute(key) + item.elementAttributes["+" + key]);
                } else {
                  el.setAttribute(key, item.elementAttributes[key]);
                }
              }
            }

            if (item.group) {
              el.addEventListener("click", this._groupClick.bind(this, item));
            } else {
              el.addEventListener("click", this._itemClick.bind(this, item));
            }

            el.addEventListener("mousedown", this._preventBlur.bind(this));
            item.element = el;
          }

          this._styleItem(item);

          this.listEl.appendChild(el);

          if (item.group) {
            item.options.forEach(function (option) {
              _this10._buildItem(option);
            });
          } else {
            this.displayItems.push(item);
          }
        }
      }
    }, {
      key: "_showList",
      value: function _showList() {
        var startVis = this.popup && this.popup.isVisible();

        if (this.input.parentNode) {
          if (this.params.autocomplete && this.input.value === "" && !this.params.listOnEmpty) {
            if (this.popup) {
              this.popup.hide(true);
              return;
            }
          }

          this._setListWidth();

          if (!this.popup) {
            this.popup = this.edit.popup(this.listEl);
          }

          this.popup.show(this.cell.getElement(), "bottom");

          if (!startVis) {
            this.popup.hideOnBlur(this._resolveValue.bind(this, true));
          }
        }
      }
    }, {
      key: "_styleItem",
      value: function _styleItem(item) {
        if (item && item.element) {
          if (item.selected) {
            item.element.classList.add("active");
          } else {
            item.element.classList.remove("active");
          }
        }
      } //////////////////////////////////////
      ///////// User Interaction ///////////
      //////////////////////////////////////

    }, {
      key: "_itemClick",
      value: function _itemClick(item, e) {
        e.stopPropagation();

        this._chooseItem(item);
      }
    }, {
      key: "_groupClick",
      value: function _groupClick(item, e) {
        e.stopPropagation();
      } //////////////////////////////////////
      ////// Current Item Management ///////
      //////////////////////////////////////

    }, {
      key: "_cancel",
      value: function _cancel() {
        this.popup.hide(true);
        this.actions.cancel();
      }
    }, {
      key: "_clearChoices",
      value: function _clearChoices() {
        var _this11 = this;

        this.typing = true;
        this.currentItems.forEach(function (item) {
          item.selected = false;

          _this11._styleItem(item);
        });
        this.currentItems = [];
        this.focusedItem = null;
      }
    }, {
      key: "_chooseItem",
      value: function _chooseItem(item, silent) {
        var index;
        this.typing = false;

        if (this.params.multiselect) {
          index = this.currentItems.indexOf(item);

          if (index > -1) {
            this.currentItems.splice(index, 1);
            item.selected = false;
          } else {
            this.currentItems.push(item);
            item.selected = true;
          }

          this.input.value = this.currentItems.map(function (item) {
            return item.label;
          }).join(",");

          this._styleItem(item);
        } else {
          this.currentItems = [item];
          item.selected = true;
          console.log("choose");
          this.input.value = item.label;

          this._styleItem(item);

          if (!silent) {
            this._resolveValue();
          }
        }

        this._focusItem(item);
      }
    }, {
      key: "_resolveValue",
      value: function _resolveValue(blur) {
        var output, initialValue;
        this.popup.hide(true);

        if (this.params.multiselect) {
          output = this.currentItems.map(function (item) {
            return item.value;
          });
        } else {
          if (blur && this.params.autocomplete && this.typing) {
            if (this.params.freetext || this.params.allowEmpty && this.input.value === "") {
              output = this.input.value;
            } else {
              this.actions.cancel();
              return;
            }
          } else {
            if (this.currentItems[0]) {
              output = this.currentItems[0].value;
            } else {
              initialValue = this.initialValues[0];

              if (initialValue === null || typeof initialValue === "undefined" || initialValue === "") {
                output = initialValue;
              } else {
                output = this.params.emptyValue;
              }
            }
          }
        }

        if (output === "") {
          output = this.params.emptyValue;
        }

        this.actions.success(output);

        if (this.isFilter) {
          this.initialValues = output && !Array.isArray[output] ? [output] : output;
        }
      }
    }]);

    return Edit;
  }();

  function select (cell, onRendered, success, cancel, editorParams) {
    console.warn("The select editor has been deprecated, please use the new list editor");
    var list = new Edit(this, cell, onRendered, success, cancel, editorParams);
    return list.input;
  }

  function list (cell, onRendered, success, cancel, editorParams) {
    var list = new Edit(this, cell, onRendered, success, cancel, editorParams);
    return list.input;
  }

  function autocomplete (cell, onRendered, success, cancel, editorParams) {
    console.warn("The autocomplete editor has been deprecated, please use the new list editor with the 'autocomplete' editorParam");
    editorParams.autocomplete = true;
    var list = new Edit(this, cell, onRendered, success, cancel, editorParams);
    return list.input;
  }

  //star rating
  function star (cell, onRendered, success, cancel, editorParams) {
    var self = this,
        element = cell.getElement(),
        value = cell.getValue(),
        maxStars = element.getElementsByTagName("svg").length || 5,
        size = element.getElementsByTagName("svg")[0] ? element.getElementsByTagName("svg")[0].getAttribute("width") : 14,
        stars = [],
        starsHolder = document.createElement("div"),
        star = document.createElementNS('http://www.w3.org/2000/svg', "svg"); //change star type

    function starChange(val) {
      stars.forEach(function (star, i) {
        if (i < val) {
          if (self.table.browser == "ie") {
            star.setAttribute("class", "tabulator-star-active");
          } else {
            star.classList.replace("tabulator-star-inactive", "tabulator-star-active");
          }

          star.innerHTML = '<polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';
        } else {
          if (self.table.browser == "ie") {
            star.setAttribute("class", "tabulator-star-inactive");
          } else {
            star.classList.replace("tabulator-star-active", "tabulator-star-inactive");
          }

          star.innerHTML = '<polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';
        }
      });
    } //build stars


    function buildStar(i) {
      var starHolder = document.createElement("span");
      var nextStar = star.cloneNode(true);
      stars.push(nextStar);
      starHolder.addEventListener("mouseenter", function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        starChange(i);
      });
      starHolder.addEventListener("mousemove", function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      });
      starHolder.addEventListener("click", function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        success(i);
        element.blur();
      });
      starHolder.appendChild(nextStar);
      starsHolder.appendChild(starHolder);
    } //handle keyboard navigation value change


    function changeValue(val) {
      value = val;
      starChange(val);
    } //style cell


    element.style.whiteSpace = "nowrap";
    element.style.overflow = "hidden";
    element.style.textOverflow = "ellipsis"; //style holding element

    starsHolder.style.verticalAlign = "middle";
    starsHolder.style.display = "inline-block";
    starsHolder.style.padding = "4px"; //style star

    star.setAttribute("width", size);
    star.setAttribute("height", size);
    star.setAttribute("viewBox", "0 0 512 512");
    star.setAttribute("xml:space", "preserve");
    star.style.padding = "0 1px";

    if (editorParams.elementAttributes && _typeof(editorParams.elementAttributes) == "object") {
      for (var key in editorParams.elementAttributes) {
        if (key.charAt(0) == "+") {
          key = key.slice(1);
          starsHolder.setAttribute(key, starsHolder.getAttribute(key) + editorParams.elementAttributes["+" + key]);
        } else {
          starsHolder.setAttribute(key, editorParams.elementAttributes[key]);
        }
      }
    } //create correct number of stars


    for (var i = 1; i <= maxStars; i++) {
      buildStar(i);
    } //ensure value does not exceed number of stars


    value = Math.min(parseInt(value), maxStars); // set initial styling of stars

    starChange(value);
    starsHolder.addEventListener("mousemove", function (e) {
      starChange(0);
    });
    starsHolder.addEventListener("click", function (e) {
      success(0);
    });
    element.addEventListener("blur", function (e) {
      cancel();
    }); //allow key based navigation

    element.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 39:
          //right arrow
          changeValue(value + 1);
          break;

        case 37:
          //left arrow
          changeValue(value - 1);
          break;

        case 13:
          //enter
          success(value);
          break;

        case 27:
          //escape
          cancel();
          break;
      }
    });
    return starsHolder;
  }

  //draggable progress bar
  function progress (cell, onRendered, success, cancel, editorParams) {
    var element = cell.getElement(),
        max = typeof editorParams.max === "undefined" ? element.getElementsByTagName("div")[0] && element.getElementsByTagName("div")[0].getAttribute("max") || 100 : editorParams.max,
        min = typeof editorParams.min === "undefined" ? element.getElementsByTagName("div")[0] && element.getElementsByTagName("div")[0].getAttribute("min") || 0 : editorParams.min,
        percent = (max - min) / 100,
        value = cell.getValue() || 0,
        handle = document.createElement("div"),
        bar = document.createElement("div"),
        mouseDrag,
        mouseDragWidth; //set new value

    function updateValue() {
      var style = window.getComputedStyle(element, null);
      var calcVal = percent * Math.round(bar.offsetWidth / ((element.clientWidth - parseInt(style.getPropertyValue("padding-left")) - parseInt(style.getPropertyValue("padding-right"))) / 100)) + min;
      success(calcVal);
      element.setAttribute("aria-valuenow", calcVal);
      element.setAttribute("aria-label", value);
    } //style handle


    handle.style.position = "absolute";
    handle.style.right = "0";
    handle.style.top = "0";
    handle.style.bottom = "0";
    handle.style.width = "5px";
    handle.classList.add("tabulator-progress-handle"); //style bar

    bar.style.display = "inline-block";
    bar.style.position = "relative"; // bar.style.top = "8px";
    // bar.style.bottom = "8px";
    // bar.style.left = "4px";
    // bar.style.marginRight = "4px";

    bar.style.height = "100%";
    bar.style.backgroundColor = "#488CE9";
    bar.style.maxWidth = "100%";
    bar.style.minWidth = "0%";

    if (editorParams.elementAttributes && _typeof(editorParams.elementAttributes) == "object") {
      for (var key in editorParams.elementAttributes) {
        if (key.charAt(0) == "+") {
          key = key.slice(1);
          bar.setAttribute(key, bar.getAttribute(key) + editorParams.elementAttributes["+" + key]);
        } else {
          bar.setAttribute(key, editorParams.elementAttributes[key]);
        }
      }
    } //style cell


    element.style.padding = "4px 4px"; //make sure value is in range

    value = Math.min(parseFloat(value), max);
    value = Math.max(parseFloat(value), min); //workout percentage

    value = Math.round((value - min) / percent); // bar.style.right = value + "%";

    bar.style.width = value + "%";
    element.setAttribute("aria-valuemin", min);
    element.setAttribute("aria-valuemax", max);
    bar.appendChild(handle);
    handle.addEventListener("mousedown", function (e) {
      mouseDrag = e.screenX;
      mouseDragWidth = bar.offsetWidth;
    });
    handle.addEventListener("mouseover", function () {
      handle.style.cursor = "ew-resize";
    });
    element.addEventListener("mousemove", function (e) {
      if (mouseDrag) {
        bar.style.width = mouseDragWidth + e.screenX - mouseDrag + "px";
      }
    });
    element.addEventListener("mouseup", function (e) {
      if (mouseDrag) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        mouseDrag = false;
        mouseDragWidth = false;
        updateValue();
      }
    }); //allow key based navigation

    element.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 39:
          //right arrow
          e.preventDefault();
          bar.style.width = bar.clientWidth + element.clientWidth / 100 + "px";
          break;

        case 37:
          //left arrow
          e.preventDefault();
          bar.style.width = bar.clientWidth - element.clientWidth / 100 + "px";
          break;

        case 9: //tab

        case 13:
          //enter
          updateValue();
          break;

        case 27:
          //escape
          cancel();
          break;
      }
    });
    element.addEventListener("blur", function () {
      cancel();
    });
    return bar;
  }

  //checkbox
  function tickCross (cell, onRendered, success, cancel, editorParams) {
    var value = cell.getValue(),
        input = document.createElement("input"),
        tristate = editorParams.tristate,
        indetermValue = typeof editorParams.indeterminateValue === "undefined" ? null : editorParams.indeterminateValue,
        indetermState = false,
        trueValueSet = Object.keys(editorParams).includes("trueValue"),
        falseValueSet = Object.keys(editorParams).includes("falseValue");
    input.setAttribute("type", "checkbox");
    input.style.marginTop = "5px";
    input.style.boxSizing = "border-box";

    if (editorParams.elementAttributes && _typeof(editorParams.elementAttributes) == "object") {
      for (var key in editorParams.elementAttributes) {
        if (key.charAt(0) == "+") {
          key = key.slice(1);
          input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
        } else {
          input.setAttribute(key, editorParams.elementAttributes[key]);
        }
      }
    }

    input.value = value;

    if (tristate && (typeof value === "undefined" || value === indetermValue || value === "")) {
      indetermState = true;
      input.indeterminate = true;
    }

    if (this.table.browser != "firefox") {
      //prevent blur issue on mac firefox
      onRendered(function () {
        input.focus({
          preventScroll: true
        });
      });
    }

    input.checked = trueValueSet ? value === editorParams.trueValue : value === true || value === "true" || value === "True" || value === 1;
    onRendered(function () {
      input.focus();
    });

    function setValue(blur) {
      var checkedValue = input.checked;

      if (trueValueSet && checkedValue) {
        checkedValue = editorParams.trueValue;
      } else if (falseValueSet && !checkedValue) {
        checkedValue = editorParams.falseValue;
      } else {
        checkedValue = checkedValue;
      }

      if (tristate) {
        if (!blur) {
          if (input.checked && !indetermState) {
            input.checked = false;
            input.indeterminate = true;
            indetermState = true;
            return indetermValue;
          } else {
            indetermState = false;
            return checkedValue;
          }
        } else {
          if (indetermState) {
            return indetermValue;
          } else {
            return checkedValue;
          }
        }
      } else {
        return checkedValue;
      }
    } //submit new value on blur


    input.addEventListener("change", function (e) {
      success(setValue());
    });
    input.addEventListener("blur", function (e) {
      success(setValue(true));
    }); //submit new value on enter

    input.addEventListener("keydown", function (e) {
      if (e.keyCode == 13) {
        success(setValue());
      }

      if (e.keyCode == 27) {
        cancel();
      }
    });
    return input;
  }

  var defaultEditors = {
    input: input,
    textarea: textarea,
    number: number,
    range: range,
    select: select,
    list: list,
    autocomplete: autocomplete,
    star: star,
    progress: progress,
    tickCross: tickCross
  };

  var Edit$1 = /*#__PURE__*/function (_Module) {
    _inherits(Edit, _Module);

    var _super = _createSuper(Edit);

    function Edit(table) {
      var _this;

      _classCallCheck(this, Edit);

      _this = _super.call(this, table);
      _this.currentCell = false; //hold currently editing cell

      _this.mouseClick = false; //hold mousedown state to prevent click binding being overriden by editor opening

      _this.recursionBlock = false; //prevent focus recursion

      _this.invalidEdit = false;
      _this.editedCells = [];
      _this.editors = Edit.editors;

      _this.registerColumnOption("editable");

      _this.registerColumnOption("editor");

      _this.registerColumnOption("editorParams");

      _this.registerColumnOption("cellEditing");

      _this.registerColumnOption("cellEdited");

      _this.registerColumnOption("cellEditCancelled");

      _this.registerTableFunction("getEditedCells", _this.getEditedCells.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("clearCellEdited", _this.clearCellEdited.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("navigatePrev", _this.navigatePrev.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("navigateNext", _this.navigateNext.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("navigateLeft", _this.navigateLeft.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("navigateRight", _this.navigateRight.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("navigateUp", _this.navigateUp.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("navigateDown", _this.navigateDown.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "isEdited", _this.cellisEdited.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "clearEdited", _this.clearEdited.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "edit", _this.editCell.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "cancelEdit", _this.cellCancelEdit.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "navigatePrev", _this.navigatePrev.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "navigateNext", _this.navigateNext.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "navigateLeft", _this.navigateLeft.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "navigateRight", _this.navigateRight.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "navigateUp", _this.navigateUp.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "navigateDown", _this.navigateDown.bind(_assertThisInitialized(_this)));

      return _this;
    }

    _createClass(Edit, [{
      key: "initialize",
      value: function initialize() {
        this.subscribe("cell-init", this.bindEditor.bind(this));
        this.subscribe("cell-delete", this.clearEdited.bind(this));
        this.subscribe("column-layout", this.initializeColumnCheck.bind(this));
        this.subscribe("column-delete", this.columnDeleteCheck.bind(this));
        this.subscribe("row-deleting", this.rowDeleteCheck.bind(this));
        this.subscribe("data-refreshing", this.cancelEdit.bind(this));
        this.subscribe("keybinding-nav-prev", this.navigatePrev.bind(this, undefined));
        this.subscribe("keybinding-nav-next", this.keybindingNavigateNext.bind(this));
        this.subscribe("keybinding-nav-left", this.navigateLeft.bind(this, undefined));
        this.subscribe("keybinding-nav-right", this.navigateRight.bind(this, undefined));
        this.subscribe("keybinding-nav-up", this.navigateUp.bind(this, undefined));
        this.subscribe("keybinding-nav-down", this.navigateDown.bind(this, undefined));
      } ///////////////////////////////////
      ////// Keybinding Functions ///////
      ///////////////////////////////////

    }, {
      key: "keybindingNavigateNext",
      value: function keybindingNavigateNext(e) {
        var cell = this.currentCell,
            newRow = this.options("tabEndNewRow");

        if (cell) {
          if (!this.navigateNext(cell, e)) {
            if (newRow) {
              cell.getElement().firstChild.blur();

              if (newRow === true) {
                newRow = this.table.addRow({});
              } else {
                if (typeof newRow == "function") {
                  newRow = this.table.addRow(newRow(cell.row.getComponent()));
                } else {
                  newRow = this.table.addRow(Object.assign({}, newRow));
                }
              }

              newRow.then(function () {
                setTimeout(function () {
                  cell.getComponent().navigateNext();
                });
              });
            }
          }
        }
      } ///////////////////////////////////
      ///////// Cell Functions //////////
      ///////////////////////////////////

    }, {
      key: "cellisEdited",
      value: function cellisEdited(cell) {
        return !!cell.modules.edit && cell.modules.edit.edited;
      }
    }, {
      key: "cellCancelEdit",
      value: function cellCancelEdit(cell) {
        if (cell === this.currentCell) {
          this.table.modules.edit.cancelEdit();
        } else {
          console.warn("Cancel Editor Error - This cell is not currently being edited ");
        }
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////

    }, {
      key: "clearCellEdited",
      value: function clearCellEdited(cells) {
        var _this2 = this;

        if (!cells) {
          cells = this.table.modules.edit.getEditedCells();
        }

        if (!Array.isArray(cells)) {
          cells = [cells];
        }

        cells.forEach(function (cell) {
          _this2.table.modules.edit.clearEdited(cell._getSelf());
        });
      }
    }, {
      key: "navigatePrev",
      value: function navigatePrev() {
        var cell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentCell;
        var e = arguments.length > 1 ? arguments[1] : undefined;
        var nextCell, prevRow;

        if (cell) {
          if (e) {
            e.preventDefault();
          }

          nextCell = this.navigateLeft();

          if (nextCell) {
            return true;
          } else {
            prevRow = this.table.rowManager.prevDisplayRow(cell.row, true);

            if (prevRow) {
              nextCell = this.findNextEditableCell(prevRow, prevRow.cells.length);

              if (nextCell) {
                nextCell.getComponent().edit();
                return true;
              }
            }
          }
        }

        return false;
      }
    }, {
      key: "navigateNext",
      value: function navigateNext() {
        var cell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentCell;
        var e = arguments.length > 1 ? arguments[1] : undefined;
        var nextCell, nextRow;

        if (cell) {
          if (e) {
            e.preventDefault();
          }

          nextCell = this.navigateRight();

          if (nextCell) {
            return true;
          } else {
            nextRow = this.table.rowManager.nextDisplayRow(cell.row, true);

            if (nextRow) {
              nextCell = this.findNextEditableCell(nextRow, -1);

              if (nextCell) {
                nextCell.getComponent().edit();
                return true;
              }
            }
          }
        }

        return false;
      }
    }, {
      key: "navigateLeft",
      value: function navigateLeft() {
        var cell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentCell;
        var e = arguments.length > 1 ? arguments[1] : undefined;
        var index, nextCell;

        if (cell) {
          if (e) {
            e.preventDefault();
          }

          index = cell.getIndex();
          nextCell = this.findPrevEditableCell(cell.row, index);

          if (nextCell) {
            nextCell.getComponent().edit();
            return true;
          }
        }

        return false;
      }
    }, {
      key: "navigateRight",
      value: function navigateRight() {
        var cell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentCell;
        var e = arguments.length > 1 ? arguments[1] : undefined;
        var index, nextCell;

        if (cell) {
          if (e) {
            e.preventDefault();
          }

          index = cell.getIndex();
          nextCell = this.findNextEditableCell(cell.row, index);

          if (nextCell) {
            nextCell.getComponent().edit();
            return true;
          }
        }

        return false;
      }
    }, {
      key: "navigateUp",
      value: function navigateUp() {
        var cell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentCell;
        var e = arguments.length > 1 ? arguments[1] : undefined;
        var index, nextRow;

        if (cell) {
          if (e) {
            e.preventDefault();
          }

          index = cell.getIndex();
          nextRow = this.table.rowManager.prevDisplayRow(cell.row, true);

          if (nextRow) {
            nextRow.cells[index].getComponent().edit();
            return true;
          }
        }

        return false;
      }
    }, {
      key: "navigateDown",
      value: function navigateDown() {
        var cell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentCell;
        var e = arguments.length > 1 ? arguments[1] : undefined;
        var index, nextRow;

        if (cell) {
          if (e) {
            e.preventDefault();
          }

          index = cell.getIndex();
          nextRow = this.table.rowManager.nextDisplayRow(cell.row, true);

          if (nextRow) {
            nextRow.cells[index].getComponent().edit();
            return true;
          }
        }

        return false;
      }
    }, {
      key: "findNextEditableCell",
      value: function findNextEditableCell(row, index) {
        var nextCell = false;

        if (index < row.cells.length - 1) {
          for (var i = index + 1; i < row.cells.length; i++) {
            var cell = row.cells[i];

            if (cell.column.modules.edit && Helpers.elVisible(cell.getElement())) {
              var allowEdit = true;

              if (typeof cell.column.modules.edit.check == "function") {
                allowEdit = cell.column.modules.edit.check(cell.getComponent());
              }

              if (allowEdit) {
                nextCell = cell;
                break;
              }
            }
          }
        }

        return nextCell;
      }
    }, {
      key: "findPrevEditableCell",
      value: function findPrevEditableCell(row, index) {
        var prevCell = false;

        if (index > 0) {
          for (var i = index - 1; i >= 0; i--) {
            var cell = row.cells[i],
                allowEdit = true;

            if (cell.column.modules.edit && Helpers.elVisible(cell.getElement())) {
              if (typeof cell.column.modules.edit.check == "function") {
                allowEdit = cell.column.modules.edit.check(cell.getComponent());
              }

              if (allowEdit) {
                prevCell = cell;
                break;
              }
            }
          }
        }

        return prevCell;
      } ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////

    }, {
      key: "initializeColumnCheck",
      value: function initializeColumnCheck(column) {
        if (typeof column.definition.editor !== "undefined") {
          this.initializeColumn(column);
        }
      }
    }, {
      key: "columnDeleteCheck",
      value: function columnDeleteCheck(column) {
        if (this.currentCell && this.currentCell.column === column) {
          this.cancelEdit();
        }
      }
    }, {
      key: "rowDeleteCheck",
      value: function rowDeleteCheck(row) {
        if (this.currentCell && this.currentCell.row === row) {
          this.cancelEdit();
        }
      } //initialize column editor

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var config = {
          editor: false,
          blocked: false,
          check: column.definition.editable,
          params: column.definition.editorParams || {}
        }; //set column editor

        switch (_typeof(column.definition.editor)) {
          case "string":
            if (this.editors[column.definition.editor]) {
              config.editor = this.editors[column.definition.editor];
            } else {
              console.warn("Editor Error - No such editor found: ", column.definition.editor);
            }

            break;

          case "function":
            config.editor = column.definition.editor;
            break;

          case "boolean":
            if (column.definition.editor === true) {
              if (typeof column.definition.formatter !== "function") {
                if (this.editors[column.definition.formatter]) {
                  config.editor = this.editors[column.definition.formatter];
                } else {
                  config.editor = this.editors["input"];
                }
              } else {
                console.warn("Editor Error - Cannot auto lookup editor for a custom formatter: ", column.definition.formatter);
              }
            }

            break;
        }

        if (config.editor) {
          column.modules.edit = config;
        }
      }
    }, {
      key: "getCurrentCell",
      value: function getCurrentCell() {
        return this.currentCell ? this.currentCell.getComponent() : false;
      }
    }, {
      key: "clearEditor",
      value: function clearEditor(cancel) {
        var cell = this.currentCell,
            cellEl;
        this.invalidEdit = false;

        if (cell) {
          this.currentCell = false;
          cellEl = cell.getElement();
          this.dispatch("edit-editor-clear", cell, cancel);
          cellEl.classList.remove("tabulator-editing");

          while (cellEl.firstChild) {
            cellEl.removeChild(cellEl.firstChild);
          }

          cell.row.getElement().classList.remove("tabulator-row-editing");
        }
      }
    }, {
      key: "cancelEdit",
      value: function cancelEdit() {
        if (this.currentCell) {
          var cell = this.currentCell;
          var component = this.currentCell.getComponent();
          this.clearEditor(true);
          cell.setValueActual(cell.getValue());
          cell.cellRendered();

          if (cell.column.definition.editor == "textarea" || cell.column.definition.variableHeight) {
            cell.row.normalizeHeight(true);
          }

          if (cell.column.definition.cellEditCancelled) {
            cell.column.definition.cellEditCancelled.call(this.table, component);
          }

          this.dispatch("edit-cancelled", cell);
          this.dispatchExternal("cellEditCancelled", component);
        }
      } //return a formatted value for a cell

    }, {
      key: "bindEditor",
      value: function bindEditor(cell) {
        if (cell.column.modules.edit) {
          var self = this,
              element = cell.getElement(true);
          element.setAttribute("tabindex", 0);
          element.addEventListener("click", function (e) {
            if (!element.classList.contains("tabulator-editing")) {
              element.focus({
                preventScroll: true
              });
            }
          });
          element.addEventListener("mousedown", function (e) {
            if (e.button === 2) {
              e.preventDefault();
            } else {
              self.mouseClick = true;
            }
          });
          element.addEventListener("focus", function (e) {
            if (!self.recursionBlock) {
              self.edit(cell, e, false);
            }
          });
        }
      }
    }, {
      key: "focusCellNoEvent",
      value: function focusCellNoEvent(cell, block) {
        this.recursionBlock = true;

        if (!(block && this.table.browser === "ie")) {
          cell.getElement().focus({
            preventScroll: true
          });
        }

        this.recursionBlock = false;
      }
    }, {
      key: "editCell",
      value: function editCell(cell, forceEdit) {
        this.focusCellNoEvent(cell);
        this.edit(cell, false, forceEdit);
      }
    }, {
      key: "focusScrollAdjust",
      value: function focusScrollAdjust(cell) {
        if (this.table.rowManager.getRenderMode() == "virtual") {
          var topEdge = this.table.rowManager.element.scrollTop,
              bottomEdge = this.table.rowManager.element.clientHeight + this.table.rowManager.element.scrollTop,
              rowEl = cell.row.getElement(),
              offset = rowEl.offsetTop;

          if (rowEl.offsetTop < topEdge) {
            this.table.rowManager.element.scrollTop -= topEdge - rowEl.offsetTop;
          } else {
            if (rowEl.offsetTop + rowEl.offsetHeight > bottomEdge) {
              this.table.rowManager.element.scrollTop += rowEl.offsetTop + rowEl.offsetHeight - bottomEdge;
            }
          }

          var leftEdge = this.table.rowManager.element.scrollLeft,
              rightEdge = this.table.rowManager.element.clientWidth + this.table.rowManager.element.scrollLeft,
              cellEl = cell.getElement(),
              offset = cellEl.offsetLeft;

          if (this.table.modExists("frozenColumns")) {
            leftEdge += parseInt(this.table.modules.frozenColumns.leftMargin);
            rightEdge -= parseInt(this.table.modules.frozenColumns.rightMargin);
          }

          if (this.table.options.renderHorizontal === "virtual") {
            leftEdge -= parseInt(this.table.columnManager.renderer.vDomPadLeft);
            rightEdge -= parseInt(this.table.columnManager.renderer.vDomPadLeft);
          }

          if (cellEl.offsetLeft < leftEdge) {
            this.table.rowManager.element.scrollLeft -= leftEdge - cellEl.offsetLeft;
          } else {
            if (cellEl.offsetLeft + cellEl.offsetWidth > rightEdge) {
              this.table.rowManager.element.scrollLeft += cellEl.offsetLeft + cellEl.offsetWidth - rightEdge;
            }
          }
        }
      }
    }, {
      key: "edit",
      value: function edit(cell, e, forceEdit) {
        var self = this,
            allowEdit = true,
            rendered = function rendered() {},
            element = cell.getElement(),
            cellEditor,
            component,
            params; //prevent editing if another cell is refusing to leave focus (eg. validation fail)


        if (this.currentCell) {
          if (!this.invalidEdit) {
            this.cancelEdit();
          }

          return;
        } //handle successful value change


        function success(value) {
          if (self.currentCell === cell) {
            var valid = self.chain("edit-success", [cell, value], true, true);

            if (valid === true || self.table.options.validationMode === "highlight") {
              self.clearEditor();

              if (!cell.modules.edit) {
                cell.modules.edit = {};
              }

              cell.modules.edit.edited = true;

              if (self.editedCells.indexOf(cell) == -1) {
                self.editedCells.push(cell);
              }

              cell.setValue(value, true);
              return valid === true;
            } else {
              self.invalidEdit = true;
              self.focusCellNoEvent(cell, true);
              rendered();
              return false;
            }
          }
        } //handle aborted edit


        function cancel() {
          if (self.currentCell === cell) {
            self.cancelEdit();
          }
        }

        function onRendered(callback) {
          rendered = callback;
        }

        if (!cell.column.modules.edit.blocked) {
          if (e) {
            e.stopPropagation();
          }

          switch (_typeof(cell.column.modules.edit.check)) {
            case "function":
              allowEdit = cell.column.modules.edit.check(cell.getComponent());
              break;

            case "boolean":
              allowEdit = cell.column.modules.edit.check;
              break;
          }

          if (allowEdit || forceEdit) {
            self.cancelEdit();
            self.currentCell = cell;
            this.focusScrollAdjust(cell);
            component = cell.getComponent();

            if (this.mouseClick) {
              this.mouseClick = false;

              if (cell.column.definition.cellClick) {
                cell.column.definition.cellClick.call(this.table, e, component);
              }
            }

            if (cell.column.definition.cellEditing) {
              cell.column.definition.cellEditing.call(this.table, component);
            }

            this.dispatch("cell-editing", cell);
            this.dispatchExternal("cellEditing", component);
            params = typeof cell.column.modules.edit.params === "function" ? cell.column.modules.edit.params(component) : cell.column.modules.edit.params;
            cellEditor = cell.column.modules.edit.editor.call(self, component, onRendered, success, cancel, params); //if editor returned, add to DOM, if false, abort edit

            if (cellEditor !== false) {
              if (cellEditor instanceof Node) {
                element.classList.add("tabulator-editing");
                cell.row.getElement().classList.add("tabulator-row-editing");

                while (element.firstChild) {
                  element.removeChild(element.firstChild);
                }

                element.appendChild(cellEditor); //trigger onRendered Callback

                rendered(); //prevent editing from triggering rowClick event

                var children = element.children;

                for (var i = 0; i < children.length; i++) {
                  children[i].addEventListener("click", function (e) {
                    e.stopPropagation();
                  });
                }
              } else {
                console.warn("Edit Error - Editor should return an instance of Node, the editor returned:", cellEditor);
                element.blur();
                return false;
              }
            } else {
              element.blur();
              return false;
            }

            return true;
          } else {
            this.mouseClick = false;
            element.blur();
            return false;
          }
        } else {
          this.mouseClick = false;
          element.blur();
          return false;
        }
      }
    }, {
      key: "getEditedCells",
      value: function getEditedCells() {
        var output = [];
        this.editedCells.forEach(function (cell) {
          output.push(cell.getComponent());
        });
        return output;
      }
    }, {
      key: "clearEdited",
      value: function clearEdited(cell) {
        var editIndex;

        if (cell.modules.edit && cell.modules.edit.edited) {
          cell.modules.edit.edited = false;
          this.dispatch("edit-edited-clear", cell);
        }

        editIndex = this.editedCells.indexOf(cell);

        if (editIndex > -1) {
          this.editedCells.splice(editIndex, 1);
        }
      }
    }]);

    return Edit;
  }(Module);

  Edit$1.moduleName = "edit"; //load defaults

  Edit$1.editors = defaultEditors;

  var ExportRow = function ExportRow(type, columns, component, indent) {
    _classCallCheck(this, ExportRow);

    this.type = type;
    this.columns = columns;
    this.component = component || false;
    this.indent = indent || 0;
  };

  var ExportColumn = function ExportColumn(value, component, width, height, depth) {
    _classCallCheck(this, ExportColumn);

    this.value = value;
    this.component = component || false;
    this.width = width;
    this.height = height;
    this.depth = depth;
  };

  var Export = /*#__PURE__*/function (_Module) {
    _inherits(Export, _Module);

    var _super = _createSuper(Export);

    function Export(table) {
      var _this;

      _classCallCheck(this, Export);

      _this = _super.call(this, table);
      _this.config = {};
      _this.cloneTableStyle = true;
      _this.colVisProp = "";

      _this.registerTableOption("htmlOutputConfig", false); //html outypu config


      _this.registerColumnOption("htmlOutput");

      _this.registerColumnOption("titleHtmlOutput");

      return _this;
    }

    _createClass(Export, [{
      key: "initialize",
      value: function initialize() {
        this.registerTableFunction("getHtml", this.getHtml.bind(this));
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////

    }, {
      key: "generateExportList",
      value: function generateExportList(config, style, range, colVisProp) {
        this.cloneTableStyle = style;
        this.config = config || {};
        this.colVisProp = colVisProp;
        var headers = this.config.columnHeaders !== false ? this.headersToExportRows(this.generateColumnGroupHeaders()) : [];
        var body = this.bodyToExportRows(this.rowLookup(range));
        return headers.concat(body);
      }
    }, {
      key: "genereateTable",
      value: function genereateTable(config, style, range, colVisProp) {
        var list = this.generateExportList(config, style, range, colVisProp);
        return this.genereateTableElement(list);
      }
    }, {
      key: "rowLookup",
      value: function rowLookup(range) {
        var _this2 = this;

        var rows = [];

        if (typeof range == "function") {
          range.call(this.table).forEach(function (row) {
            row = _this2.table.rowManager.findRow(row);

            if (row) {
              rows.push(row);
            }
          });
        } else {
          switch (range) {
            case true:
            case "visible":
              rows = this.table.rowManager.getVisibleRows(false, true);
              break;

            case "all":
              rows = this.table.rowManager.rows;
              break;

            case "selected":
              rows = this.table.modules.selectRow.selectedRows;
              break;

            case "active":
            default:
              if (this.table.options.pagination) {
                rows = this.table.rowManager.getDisplayRows(this.table.rowManager.displayRows.length - 2);
              } else {
                rows = this.table.rowManager.getDisplayRows();
              }

          }
        }

        return Object.assign([], rows);
      }
    }, {
      key: "generateColumnGroupHeaders",
      value: function generateColumnGroupHeaders() {
        var _this3 = this;

        var output = [];
        var columns = this.config.columnGroups !== false ? this.table.columnManager.columns : this.table.columnManager.columnsByIndex;
        columns.forEach(function (column) {
          var colData = _this3.processColumnGroup(column);

          if (colData) {
            output.push(colData);
          }
        });
        return output;
      }
    }, {
      key: "processColumnGroup",
      value: function processColumnGroup(column) {
        var _this4 = this;

        var subGroups = column.columns,
            maxDepth = 0,
            title = column.definition["title" + (this.colVisProp.charAt(0).toUpperCase() + this.colVisProp.slice(1))] || column.definition.title;
        var groupData = {
          title: title,
          column: column,
          depth: 1
        };

        if (subGroups.length) {
          groupData.subGroups = [];
          groupData.width = 0;
          subGroups.forEach(function (subGroup) {
            var subGroupData = _this4.processColumnGroup(subGroup);

            if (subGroupData) {
              groupData.width += subGroupData.width;
              groupData.subGroups.push(subGroupData);

              if (subGroupData.depth > maxDepth) {
                maxDepth = subGroupData.depth;
              }
            }
          });
          groupData.depth += maxDepth;

          if (!groupData.width) {
            return false;
          }
        } else {
          if (this.columnVisCheck(column)) {
            groupData.width = 1;
          } else {
            return false;
          }
        }

        return groupData;
      }
    }, {
      key: "columnVisCheck",
      value: function columnVisCheck(column) {
        return column.definition[this.colVisProp] !== false && (column.visible || !column.visible && column.definition[this.colVisProp]);
      }
    }, {
      key: "headersToExportRows",
      value: function headersToExportRows(columns) {
        var headers = [],
            headerDepth = 0,
            exportRows = [];

        function parseColumnGroup(column, level) {
          var depth = headerDepth - level;

          if (typeof headers[level] === "undefined") {
            headers[level] = [];
          }

          column.height = column.subGroups ? 1 : depth - column.depth + 1;
          headers[level].push(column);

          if (column.height > 1) {
            for (var _i = 1; _i < column.height; _i++) {
              if (typeof headers[level + _i] === "undefined") {
                headers[level + _i] = [];
              }

              headers[level + _i].push(false);
            }
          }

          if (column.width > 1) {
            for (var _i2 = 1; _i2 < column.width; _i2++) {
              headers[level].push(false);
            }
          }

          if (column.subGroups) {
            column.subGroups.forEach(function (subGroup) {
              parseColumnGroup(subGroup, level + 1);
            });
          }
        } //calculate maximum header debth


        columns.forEach(function (column) {
          if (column.depth > headerDepth) {
            headerDepth = column.depth;
          }
        });
        columns.forEach(function (column) {
          parseColumnGroup(column, 0);
        });
        headers.forEach(function (header) {
          var columns = [];
          header.forEach(function (col) {
            if (col) {
              var title = typeof col.title === "undefined" ? "" : col.title;
              columns.push(new ExportColumn(title, col.column.getComponent(), col.width, col.height, col.depth));
            } else {
              columns.push(null);
            }
          });
          exportRows.push(new ExportRow("header", columns));
        });
        return exportRows;
      }
    }, {
      key: "bodyToExportRows",
      value: function bodyToExportRows(rows) {
        var _this5 = this;

        var columns = [];
        var exportRows = [];
        this.table.columnManager.columnsByIndex.forEach(function (column) {
          if (_this5.columnVisCheck(column)) {
            columns.push(column.getComponent());
          }
        });

        if (this.config.columnCalcs !== false && this.table.modExists("columnCalcs")) {
          if (this.table.modules.columnCalcs.topInitialized) {
            rows.unshift(this.table.modules.columnCalcs.topRow);
          }

          if (this.table.modules.columnCalcs.botInitialized) {
            rows.push(this.table.modules.columnCalcs.botRow);
          }
        }

        rows = rows.filter(function (row) {
          switch (row.type) {
            case "group":
              return _this5.config.rowGroups !== false;

            case "calc":
              return _this5.config.columnCalcs !== false;

            case "row":
              return !(_this5.table.options.dataTree && _this5.config.dataTree === false && row.modules.dataTree.parent);
          }

          return true;
        });
        rows.forEach(function (row, i) {
          var rowData = row.getData(_this5.colVisProp);
          var exportCols = [];
          var indent = 0;

          switch (row.type) {
            case "group":
              indent = row.level;
              exportCols.push(new ExportColumn(row.key, row.getComponent(), columns.length, 1));
              break;

            case "calc":
            case "row":
              columns.forEach(function (col) {
                exportCols.push(new ExportColumn(col._column.getFieldValue(rowData), col, 1, 1));
              });

              if (_this5.table.options.dataTree && _this5.config.dataTree !== false) {
                indent = row.modules.dataTree.index;
              }

              break;
          }

          exportRows.push(new ExportRow(row.type, exportCols, row.getComponent(), indent));
        });
        return exportRows;
      }
    }, {
      key: "genereateTableElement",
      value: function genereateTableElement(list) {
        var _this6 = this;

        var table = document.createElement("table"),
            headerEl = document.createElement("thead"),
            bodyEl = document.createElement("tbody"),
            styles = this.lookupTableStyles(),
            rowFormatter = this.table.options["rowFormatter" + (this.colVisProp.charAt(0).toUpperCase() + this.colVisProp.slice(1))],
            setup = {};
        setup.rowFormatter = rowFormatter !== null ? rowFormatter : this.table.options.rowFormatter;

        if (this.table.options.dataTree && this.config.dataTree !== false && this.table.modExists("columnCalcs")) {
          setup.treeElementField = this.table.modules.dataTree.elementField;
        } //assign group header formatter


        setup.groupHeader = this.table.options["groupHeader" + (this.colVisProp.charAt(0).toUpperCase() + this.colVisProp.slice(1))];

        if (setup.groupHeader && !Array.isArray(setup.groupHeader)) {
          setup.groupHeader = [setup.groupHeader];
        }

        table.classList.add("tabulator-print-table");
        this.mapElementStyles(this.table.columnManager.getHeadersElement(), headerEl, ["border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]);

        if (list.length > 1000) {
          console.warn("It may take a long time to render an HTML table with more than 1000 rows");
        }

        list.forEach(function (row, i) {
          switch (row.type) {
            case "header":
              headerEl.appendChild(_this6.genereateHeaderElement(row, setup, styles));
              break;

            case "group":
              bodyEl.appendChild(_this6.genereateGroupElement(row, setup, styles));
              break;

            case "calc":
              bodyEl.appendChild(_this6.genereateCalcElement(row, setup, styles));
              break;

            case "row":
              var rowEl = _this6.genereateRowElement(row, setup, styles);

              _this6.mapElementStyles(i % 2 && styles.evenRow ? styles.evenRow : styles.oddRow, rowEl, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]);

              bodyEl.appendChild(rowEl);
              break;
          }
        });

        if (headerEl.innerHTML) {
          table.appendChild(headerEl);
        }

        table.appendChild(bodyEl);
        this.mapElementStyles(this.table.element, table, ["border-top", "border-left", "border-right", "border-bottom"]);
        return table;
      }
    }, {
      key: "lookupTableStyles",
      value: function lookupTableStyles() {
        var styles = {}; //lookup row styles

        if (this.cloneTableStyle && window.getComputedStyle) {
          styles.oddRow = this.table.element.querySelector(".tabulator-row-odd:not(.tabulator-group):not(.tabulator-calcs)");
          styles.evenRow = this.table.element.querySelector(".tabulator-row-even:not(.tabulator-group):not(.tabulator-calcs)");
          styles.calcRow = this.table.element.querySelector(".tabulator-row.tabulator-calcs");
          styles.firstRow = this.table.element.querySelector(".tabulator-row:not(.tabulator-group):not(.tabulator-calcs)");
          styles.firstGroup = this.table.element.getElementsByClassName("tabulator-group")[0];

          if (styles.firstRow) {
            styles.styleCells = styles.firstRow.getElementsByClassName("tabulator-cell");
            styles.firstCell = styles.styleCells[0];
            styles.lastCell = styles.styleCells[styles.styleCells.length - 1];
          }
        }

        return styles;
      }
    }, {
      key: "genereateHeaderElement",
      value: function genereateHeaderElement(row, setup, styles) {
        var _this7 = this;

        var rowEl = document.createElement("tr");
        row.columns.forEach(function (column) {
          if (column) {
            var cellEl = document.createElement("th");
            var classNames = column.component._column.definition.cssClass ? column.component._column.definition.cssClass.split(" ") : [];
            cellEl.colSpan = column.width;
            cellEl.rowSpan = column.height;
            cellEl.innerHTML = column.value;

            if (_this7.cloneTableStyle) {
              cellEl.style.boxSizing = "border-box";
            }

            classNames.forEach(function (className) {
              cellEl.classList.add(className);
            });

            _this7.mapElementStyles(column.component.getElement(), cellEl, ["text-align", "border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]);

            _this7.mapElementStyles(column.component._column.contentElement, cellEl, ["padding-top", "padding-left", "padding-right", "padding-bottom"]);

            if (column.component._column.visible) {
              _this7.mapElementStyles(column.component.getElement(), cellEl, ["width"]);
            } else {
              if (column.component._column.definition.width) {
                cellEl.style.width = column.component._column.definition.width + "px";
              }
            }

            if (column.component._column.parent) {
              _this7.mapElementStyles(column.component._column.parent.groupElement, cellEl, ["border-top"]);
            }

            rowEl.appendChild(cellEl);
          }
        });
        return rowEl;
      }
    }, {
      key: "genereateGroupElement",
      value: function genereateGroupElement(row, setup, styles) {
        var rowEl = document.createElement("tr"),
            cellEl = document.createElement("td"),
            group = row.columns[0];
        rowEl.classList.add("tabulator-print-table-row");

        if (setup.groupHeader && setup.groupHeader[row.indent]) {
          group.value = setup.groupHeader[row.indent](group.value, row.component._group.getRowCount(), row.component._group.getData(), row.component);
        } else {
          if (setup.groupHeader === false) {
            group.value = group.value;
          } else {
            group.value = row.component._group.generator(group.value, row.component._group.getRowCount(), row.component._group.getData(), row.component);
          }
        }

        cellEl.colSpan = group.width;
        cellEl.innerHTML = group.value;
        rowEl.classList.add("tabulator-print-table-group");
        rowEl.classList.add("tabulator-group-level-" + row.indent);

        if (group.component.isVisible()) {
          rowEl.classList.add("tabulator-group-visible");
        }

        this.mapElementStyles(styles.firstGroup, rowEl, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]);
        this.mapElementStyles(styles.firstGroup, cellEl, ["padding-top", "padding-left", "padding-right", "padding-bottom"]);
        rowEl.appendChild(cellEl);
        return rowEl;
      }
    }, {
      key: "genereateCalcElement",
      value: function genereateCalcElement(row, setup, styles) {
        var rowEl = this.genereateRowElement(row, setup, styles);
        rowEl.classList.add("tabulator-print-table-calcs");
        this.mapElementStyles(styles.calcRow, rowEl, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]);
        return rowEl;
      }
    }, {
      key: "genereateRowElement",
      value: function genereateRowElement(row, setup, styles) {
        var _this8 = this;

        var rowEl = document.createElement("tr");
        rowEl.classList.add("tabulator-print-table-row");
        row.columns.forEach(function (col) {
          if (col) {
            var cellEl = document.createElement("td"),
                column = col.component._column,
                index = _this8.table.columnManager.findColumnIndex(column),
                value = col.value;

            var cellWrapper = {
              modules: {},
              getValue: function getValue() {
                return value;
              },
              getField: function getField() {
                return column.definition.field;
              },
              getElement: function getElement() {
                return cellEl;
              },
              getColumn: function getColumn() {
                return column.getComponent();
              },
              getData: function getData() {
                return row.component.getData();
              },
              getRow: function getRow() {
                return row.component;
              },
              getComponent: function getComponent() {
                return cellWrapper;
              },
              column: column
            };
            var classNames = column.definition.cssClass ? column.definition.cssClass.split(" ") : [];
            classNames.forEach(function (className) {
              cellEl.classList.add(className);
            });

            if (_this8.table.modExists("format") && _this8.config.formatCells !== false) {
              value = _this8.table.modules.format.formatExportValue(cellWrapper, _this8.colVisProp);
            } else {
              switch (_typeof(value)) {
                case "object":
                  value = value !== null ? JSON.stringify(value) : "";
                  break;

                case "undefined":
                  value = "";
                  break;

                default:
                  value = value;
              }
            }

            if (value instanceof Node) {
              cellEl.appendChild(value);
            } else {
              cellEl.innerHTML = value;
            }

            if (styles.styleCells[index] || styles.firstCell) {
              _this8.mapElementStyles(styles.styleCells[index] || styles.firstCell, cellEl, ["padding-top", "padding-left", "padding-right", "padding-bottom", "border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "text-align"]);

              if (column.definition.align) {
                cellEl.style.textAlign = column.definition.align;
              }
            }

            if (_this8.table.options.dataTree && _this8.config.dataTree !== false) {
              if (setup.treeElementField && setup.treeElementField == column.field || !setup.treeElementField && i == 0) {
                if (row.component._row.modules.dataTree.controlEl) {
                  cellEl.insertBefore(row.component._row.modules.dataTree.controlEl.cloneNode(true), cellEl.firstChild);
                }

                if (row.component._row.modules.dataTree.branchEl) {
                  cellEl.insertBefore(row.component._row.modules.dataTree.branchEl.cloneNode(true), cellEl.firstChild);
                }
              }
            }

            rowEl.appendChild(cellEl);

            if (cellWrapper.modules.format && cellWrapper.modules.format.renderedCallback) {
              cellWrapper.modules.format.renderedCallback();
            }

            if (setup.rowFormatter && _this8.config.formatCells !== false) {
              setup.rowFormatter(row.component);
            }
          }
        });
        return rowEl;
      }
    }, {
      key: "genereateHTMLTable",
      value: function genereateHTMLTable(list) {
        var holder = document.createElement("div");
        holder.appendChild(this.genereateTableElement(list));
        return holder.innerHTML;
      }
    }, {
      key: "getHtml",
      value: function getHtml(visible, style, config, colVisProp) {
        var list = this.generateExportList(config || this.table.options.htmlOutputConfig, style, visible, colVisProp || "htmlOutput");
        return this.genereateHTMLTable(list);
      }
    }, {
      key: "mapElementStyles",
      value: function mapElementStyles(from, to, props) {
        if (this.cloneTableStyle && from && to) {
          var lookup = {
            "background-color": "backgroundColor",
            "color": "fontColor",
            "width": "width",
            "font-weight": "fontWeight",
            "font-family": "fontFamily",
            "font-size": "fontSize",
            "text-align": "textAlign",
            "border-top": "borderTop",
            "border-left": "borderLeft",
            "border-right": "borderRight",
            "border-bottom": "borderBottom",
            "padding-top": "paddingTop",
            "padding-left": "paddingLeft",
            "padding-right": "paddingRight",
            "padding-bottom": "paddingBottom"
          };

          if (window.getComputedStyle) {
            var fromStyle = window.getComputedStyle(from);
            props.forEach(function (prop) {
              to.style[lookup[prop]] = fromStyle.getPropertyValue(prop);
            });
          }
        }
      }
    }]);

    return Export;
  }(Module);

  Export.moduleName = "export";

  var defaultFilters = {
    //equal to
    "=": function _(filterVal, rowVal, rowData, filterParams) {
      return rowVal == filterVal ? true : false;
    },
    //less than
    "<": function _(filterVal, rowVal, rowData, filterParams) {
      return rowVal < filterVal ? true : false;
    },
    //less than or equal to
    "<=": function _(filterVal, rowVal, rowData, filterParams) {
      return rowVal <= filterVal ? true : false;
    },
    //greater than
    ">": function _(filterVal, rowVal, rowData, filterParams) {
      return rowVal > filterVal ? true : false;
    },
    //greater than or equal to
    ">=": function _(filterVal, rowVal, rowData, filterParams) {
      return rowVal >= filterVal ? true : false;
    },
    //not equal to
    "!=": function _(filterVal, rowVal, rowData, filterParams) {
      return rowVal != filterVal ? true : false;
    },
    "regex": function regex(filterVal, rowVal, rowData, filterParams) {
      if (typeof filterVal == "string") {
        filterVal = new RegExp(filterVal);
      }

      return filterVal.test(rowVal);
    },
    //contains the string
    "like": function like(filterVal, rowVal, rowData, filterParams) {
      if (filterVal === null || typeof filterVal === "undefined") {
        return rowVal === filterVal ? true : false;
      } else {
        if (typeof rowVal !== 'undefined' && rowVal !== null) {
          return String(rowVal).toLowerCase().indexOf(filterVal.toLowerCase()) > -1;
        } else {
          return false;
        }
      }
    },
    //contains the keywords
    "keywords": function keywords(filterVal, rowVal, rowData, filterParams) {
      var keywords = filterVal.toLowerCase().split(typeof filterParams.separator === "undefined" ? " " : filterParams.separator),
          value = String(rowVal === null || typeof rowVal === "undefined" ? "" : rowVal).toLowerCase(),
          matches = [];
      keywords.forEach(function (keyword) {
        if (value.includes(keyword)) {
          matches.push(true);
        }
      });
      return filterParams.matchAll ? matches.length === keywords.length : !!matches.length;
    },
    //starts with the string
    "starts": function starts(filterVal, rowVal, rowData, filterParams) {
      if (filterVal === null || typeof filterVal === "undefined") {
        return rowVal === filterVal ? true : false;
      } else {
        if (typeof rowVal !== 'undefined' && rowVal !== null) {
          return String(rowVal).toLowerCase().startsWith(filterVal.toLowerCase());
        } else {
          return false;
        }
      }
    },
    //ends with the string
    "ends": function ends(filterVal, rowVal, rowData, filterParams) {
      if (filterVal === null || typeof filterVal === "undefined") {
        return rowVal === filterVal ? true : false;
      } else {
        if (typeof rowVal !== 'undefined' && rowVal !== null) {
          return String(rowVal).toLowerCase().endsWith(filterVal.toLowerCase());
        } else {
          return false;
        }
      }
    },
    //in array
    "in": function _in(filterVal, rowVal, rowData, filterParams) {
      if (Array.isArray(filterVal)) {
        return filterVal.length ? filterVal.indexOf(rowVal) > -1 : true;
      } else {
        console.warn("Filter Error - filter value is not an array:", filterVal);
        return false;
      }
    }
  };

  var Filter = /*#__PURE__*/function (_Module) {
    _inherits(Filter, _Module);

    var _super = _createSuper(Filter);

    function Filter(table) {
      var _this;

      _classCallCheck(this, Filter);

      _this = _super.call(this, table);
      _this.filterList = []; //hold filter list

      _this.headerFilters = {}; //hold column filters

      _this.headerFilterColumns = []; //hold columns that use header filters

      _this.prevHeaderFilterChangeCheck = "";
      _this.prevHeaderFilterChangeCheck = "{}";
      _this.changed = false; //has filtering changed since last render

      _this.tableInitialized = false;

      _this.registerTableOption("filterMode", "local"); //local or remote filtering


      _this.registerTableOption("initialFilter", false); //initial filtering criteria


      _this.registerTableOption("initialHeaderFilter", false); //initial header filtering criteria


      _this.registerTableOption("headerFilterLiveFilterDelay", 300); //delay before updating column after user types in header filter


      _this.registerColumnOption("headerFilter");

      _this.registerColumnOption("headerFilterPlaceholder");

      _this.registerColumnOption("headerFilterParams");

      _this.registerColumnOption("headerFilterEmptyCheck");

      _this.registerColumnOption("headerFilterFunc");

      _this.registerColumnOption("headerFilterFuncParams");

      _this.registerColumnOption("headerFilterLiveFilter");

      _this.registerTableFunction("searchRows", _this.searchRows.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("searchData", _this.searchData.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("setFilter", _this.userSetFilter.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("refreshFilter", _this.userRefreshFilter.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("addFilter", _this.userAddFilter.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("getFilters", _this.getFilters.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("setHeaderFilterFocus", _this.userSetHeaderFilterFocus.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("getHeaderFilterValue", _this.userGetHeaderFilterValue.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("setHeaderFilterValue", _this.userSetHeaderFilterValue.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("getHeaderFilters", _this.getHeaderFilters.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("removeFilter", _this.userRemoveFilter.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("clearFilter", _this.userClearFilter.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("clearHeaderFilter", _this.userClearHeaderFilter.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("column", "headerFilterFocus", _this.setHeaderFilterFocus.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("column", "reloadHeaderFilter", _this.reloadHeaderFilter.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("column", "getHeaderFilterValue", _this.getHeaderFilterValue.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("column", "setHeaderFilterValue", _this.setHeaderFilterValue.bind(_assertThisInitialized(_this)));

      return _this;
    }

    _createClass(Filter, [{
      key: "initialize",
      value: function initialize() {
        this.subscribe("column-init", this.initializeColumnHeaderFilter.bind(this));
        this.subscribe("column-width-fit-before", this.hideHeaderFilterElements.bind(this));
        this.subscribe("column-width-fit-after", this.showHeaderFilterElements.bind(this));
        this.subscribe("table-built", this.tableBuilt.bind(this));

        if (this.table.options.filterMode === "remote") {
          this.subscribe("data-params", this.remoteFilterParams.bind(this));
        }

        this.registerDataHandler(this.filter.bind(this), 10);
      }
    }, {
      key: "tableBuilt",
      value: function tableBuilt() {
        var _this2 = this;

        if (this.table.options.initialFilter) {
          this.setFilter(this.table.options.initialFilter);
        }

        if (this.table.options.initialHeaderFilter) {
          this.table.options.initialHeaderFilter.forEach(function (item) {
            var column = _this2.table.columnManager.findColumn(item.field);

            if (column) {
              _this2.setHeaderFilterValue(column, item.value);
            } else {
              console.warn("Column Filter Error - No matching column found:", item.field);
              return false;
            }
          });
        }

        this.tableInitialized = true;
      }
    }, {
      key: "remoteFilterParams",
      value: function remoteFilterParams(data, config, silent, params) {
        params.filter = this.getFilters(true, true);
        return params;
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////
      //set standard filters

    }, {
      key: "userSetFilter",
      value: function userSetFilter(field, type, value, params) {
        this.setFilter(field, type, value, params);
        this.refreshFilter();
      } //set standard filters

    }, {
      key: "userRefreshFilter",
      value: function userRefreshFilter() {
        this.refreshFilter();
      } //add filter to array

    }, {
      key: "userAddFilter",
      value: function userAddFilter(field, type, value, params) {
        this.addFilter(field, type, value, params);
        this.refreshFilter();
      }
    }, {
      key: "userSetHeaderFilterFocus",
      value: function userSetHeaderFilterFocus(field) {
        var column = this.table.columnManager.findColumn(field);

        if (column) {
          this.setHeaderFilterFocus(column);
        } else {
          console.warn("Column Filter Focus Error - No matching column found:", field);
          return false;
        }
      }
    }, {
      key: "userGetHeaderFilterValue",
      value: function userGetHeaderFilterValue(field) {
        var column = this.table.columnManager.findColumn(field);

        if (column) {
          return this.getHeaderFilterValue(column);
        } else {
          console.warn("Column Filter Error - No matching column found:", field);
        }
      }
    }, {
      key: "userSetHeaderFilterValue",
      value: function userSetHeaderFilterValue(field, value) {
        var column = this.table.columnManager.findColumn(field);

        if (column) {
          this.setHeaderFilterValue(column, value);
        } else {
          console.warn("Column Filter Error - No matching column found:", field);
          return false;
        }
      } //remove filter from array

    }, {
      key: "userRemoveFilter",
      value: function userRemoveFilter(field, type, value) {
        this.removeFilter(field, type, value);
        this.refreshFilter();
      } //clear filters

    }, {
      key: "userClearFilter",
      value: function userClearFilter(all) {
        this.clearFilter(all);
        this.refreshFilter();
      } //clear header filters

    }, {
      key: "userClearHeaderFilter",
      value: function userClearHeaderFilter() {
        this.clearHeaderFilter();
        this.refreshFilter();
      } //search for specific row components

    }, {
      key: "searchRows",
      value: function searchRows(field, type, value) {
        return this.search("rows", field, type, value);
      } //search for specific data

    }, {
      key: "searchData",
      value: function searchData(field, type, value) {
        return this.search("data", field, type, value);
      } ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////

    }, {
      key: "initializeColumnHeaderFilter",
      value: function initializeColumnHeaderFilter(column) {
        var def = column.definition;

        if (def.headerFilter) {
          if (typeof def.headerFilterPlaceholder !== "undefined" && def.field) {
            this.module("localize").setHeaderFilterColumnPlaceholder(def.field, def.headerFilterPlaceholder);
          }

          this.initializeColumn(column);
        }
      } //initialize column header filter

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column, value) {
        var self = this,
            field = column.getField();
   //handle successfull value change

        function success(value) {
          var filterType = column.modules.filter.tagType == "input" && column.modules.filter.attrType == "text" || column.modules.filter.tagType == "textarea" ? "partial" : "match",
              type = "",
              filterChangeCheck = "",
              filterFunc;

          if (typeof column.modules.filter.prevSuccess === "undefined" || column.modules.filter.prevSuccess !== value) {
            column.modules.filter.prevSuccess = value;

            if (!column.modules.filter.emptyFunc(value)) {
              column.modules.filter.value = value;

              switch (_typeof(column.definition.headerFilterFunc)) {
                case "string":
                  if (Filter.filters[column.definition.headerFilterFunc]) {
                    type = column.definition.headerFilterFunc;

                    filterFunc = function filterFunc(data) {
                      var params = column.definition.headerFilterFuncParams || {};
                      var fieldVal = column.getFieldValue(data);
                      params = typeof params === "function" ? params(value, fieldVal, data) : params;
                      return Filter.filters[column.definition.headerFilterFunc](value, fieldVal, data, params);
                    };
                  } else {
                    console.warn("Header Filter Error - Matching filter function not found: ", column.definition.headerFilterFunc);
                  }

                  break;

                case "function":
                  filterFunc = function filterFunc(data) {
                    var params = column.definition.headerFilterFuncParams || {};
                    var fieldVal = column.getFieldValue(data);
                    params = typeof params === "function" ? params(value, fieldVal, data) : params;
                    return column.definition.headerFilterFunc(value, fieldVal, data, params);
                  };

                  type = filterFunc;
                  break;
              }

              if (!filterFunc) {
                switch (filterType) {
                  case "partial":
                    filterFunc = function filterFunc(data) {
                      var colVal = column.getFieldValue(data);

                      if (typeof colVal !== 'undefined' && colVal !== null) {
                        return String(colVal).toLowerCase().indexOf(String(value).toLowerCase()) > -1;
                      } else {
                        return false;
                      }
                    };

                    type = "like";
                    break;

                  default:
                    filterFunc = function filterFunc(data) {
                      return column.getFieldValue(data) == value;
                    };

                    type = "=";
                }
              }

              self.headerFilters[field] = {
                value: value,
                func: filterFunc,
                type: type,
                params:  {}
              };
            } else {
              delete self.headerFilters[field];
            }

            column.modules.filter.value = value;
            filterChangeCheck = JSON.stringify(self.headerFilters);

            if (self.prevHeaderFilterChangeCheck !== filterChangeCheck) {
              self.prevHeaderFilterChangeCheck = filterChangeCheck;
              self.trackChanges();
              self.refreshFilter();
            }
          }

          return true;
        }

        column.modules.filter = {
          success: success,
          attrType: false,
          tagType: false,
          emptyFunc: false
        };
        this.generateHeaderFilterElement(column);
      }
    }, {
      key: "generateHeaderFilterElement",
      value: function generateHeaderFilterElement(column, initialValue, reinitialize) {
        var _this3 = this;

        var self = this,
            success = column.modules.filter.success,
            field = column.getField(),
            filterElement,
            editor,
            editorElement,
            cellWrapper,
            typingTimer,
            searchTrigger,
            params;
        column.modules.filter.value = initialValue; //handle aborted edit

        function cancel() {}

        if (column.modules.filter.headerElement && column.modules.filter.headerElement.parentNode) {
          column.contentElement.removeChild(column.modules.filter.headerElement.parentNode);
        }

        if (field) {
          //set empty value function
          column.modules.filter.emptyFunc = column.definition.headerFilterEmptyCheck || function (value) {
            return !value && value !== "0" && value !== 0;
          };

          filterElement = document.createElement("div");
          filterElement.classList.add("tabulator-header-filter"); //set column editor

          switch (_typeof(column.definition.headerFilter)) {
            case "string":
              if (self.table.modules.edit.editors[column.definition.headerFilter]) {
                editor = self.table.modules.edit.editors[column.definition.headerFilter];

                if ((column.definition.headerFilter === "tick" || column.definition.headerFilter === "tickCross") && !column.definition.headerFilterEmptyCheck) {
                  column.modules.filter.emptyFunc = function (value) {
                    return value !== true && value !== false;
                  };
                }
              } else {
                console.warn("Filter Error - Cannot build header filter, No such editor found: ", column.definition.editor);
              }

              break;

            case "function":
              editor = column.definition.headerFilter;
              break;

            case "boolean":
              if (column.modules.edit && column.modules.edit.editor) {
                editor = column.modules.edit.editor;
              } else {
                if (column.definition.formatter && self.table.modules.edit.editors[column.definition.formatter]) {
                  editor = self.table.modules.edit.editors[column.definition.formatter];

                  if ((column.definition.formatter === "tick" || column.definition.formatter === "tickCross") && !column.definition.headerFilterEmptyCheck) {
                    column.modules.filter.emptyFunc = function (value) {
                      return value !== true && value !== false;
                    };
                  }
                } else {
                  editor = self.table.modules.edit.editors["input"];
                }
              }

              break;
          }

          if (editor) {
            cellWrapper = {
              getValue: function getValue() {
                return typeof initialValue !== "undefined" ? initialValue : "";
              },
              getField: function getField() {
                return column.definition.field;
              },
              getElement: function getElement() {
                return filterElement;
              },
              getColumn: function getColumn() {
                return column.getComponent();
              },
              getRow: function getRow() {
                return {
                  normalizeHeight: function normalizeHeight() {}
                };
              }
            };
            params = column.definition.headerFilterParams || {};
            params = typeof params === "function" ? params.call(self.table, cellWrapper) : params;
            editorElement = editor.call(this.table.modules.edit, cellWrapper, function () {}, success, cancel, params);

            if (!editorElement) {
              console.warn("Filter Error - Cannot add filter to " + field + " column, editor returned a value of false");
              return;
            }

            if (!(editorElement instanceof Node)) {
              console.warn("Filter Error - Cannot add filter to " + field + " column, editor should return an instance of Node, the editor returned:", editorElement);
              return;
            } //set Placeholder Text


            if (field) {
              self.langBind("headerFilters|columns|" + column.definition.field, function (value) {
                editorElement.setAttribute("placeholder", typeof value !== "undefined" && value ? value : self.langText("headerFilters|default"));
              });
            } else {
              self.langBind("headerFilters|default", function (value) {
                editorElement.setAttribute("placeholder", value);
              });
            } //focus on element on click


            editorElement.addEventListener("click", function (e) {
              e.stopPropagation();
              editorElement.focus();
            });
            editorElement.addEventListener("focus", function (e) {
              var left = _this3.table.columnManager.element.scrollLeft;
              var headerPos = _this3.table.rowManager.element.scrollLeft + parseInt(_this3.table.columnManager.element.style.marginLeft);

              if (left !== headerPos) {
                _this3.table.rowManager.scrollHorizontal(left);

                _this3.table.columnManager.scrollHorizontal(left);
              }
            }); //live update filters as user types

            typingTimer = false;

            searchTrigger = function searchTrigger(e) {
              if (typingTimer) {
                clearTimeout(typingTimer);
              }

              typingTimer = setTimeout(function () {
                success(editorElement.value);
              }, self.table.options.headerFilterLiveFilterDelay);
            };

            column.modules.filter.headerElement = editorElement;
            column.modules.filter.attrType = editorElement.hasAttribute("type") ? editorElement.getAttribute("type").toLowerCase() : "";
            column.modules.filter.tagType = editorElement.tagName.toLowerCase();

            if (column.definition.headerFilterLiveFilter !== false) {
              if (!(column.definition.headerFilter === 'autocomplete' || column.definition.headerFilter === 'tickCross' || (column.definition.editor === 'autocomplete' || column.definition.editor === 'tickCross') && column.definition.headerFilter === true)) {
                editorElement.addEventListener("keyup", searchTrigger);
                editorElement.addEventListener("search", searchTrigger); //update number filtered columns on change

                if (column.modules.filter.attrType == "number") {
                  editorElement.addEventListener("change", function (e) {
                    success(editorElement.value);
                  });
                } //change text inputs to search inputs to allow for clearing of field


                if (column.modules.filter.attrType == "text" && this.table.browser !== "ie") {
                  editorElement.setAttribute("type", "search"); // editorElement.off("change blur"); //prevent blur from triggering filter and preventing selection click
                }
              } //prevent input and select elements from propegating click to column sorters etc


              if (column.modules.filter.tagType == "input" || column.modules.filter.tagType == "select" || column.modules.filter.tagType == "textarea") {
                editorElement.addEventListener("mousedown", function (e) {
                  e.stopPropagation();
                });
              }
            }

            filterElement.appendChild(editorElement);
            column.contentElement.appendChild(filterElement);

            if (!reinitialize) {
              self.headerFilterColumns.push(column);
            }
          }
        } else {
          console.warn("Filter Error - Cannot add header filter, column has no field set:", column.definition.title);
        }
      } //hide all header filter elements (used to ensure correct column widths in "fitData" layout mode)

    }, {
      key: "hideHeaderFilterElements",
      value: function hideHeaderFilterElements() {
        this.headerFilterColumns.forEach(function (column) {
          if (column.modules.filter && column.modules.filter.headerElement) {
            column.modules.filter.headerElement.style.display = 'none';
          }
        });
      } //show all header filter elements (used to ensure correct column widths in "fitData" layout mode)

    }, {
      key: "showHeaderFilterElements",
      value: function showHeaderFilterElements() {
        this.headerFilterColumns.forEach(function (column) {
          if (column.modules.filter && column.modules.filter.headerElement) {
            column.modules.filter.headerElement.style.display = '';
          }
        });
      } //programatically set focus of header filter

    }, {
      key: "setHeaderFilterFocus",
      value: function setHeaderFilterFocus(column) {
        if (column.modules.filter && column.modules.filter.headerElement) {
          column.modules.filter.headerElement.focus();
        } else {
          console.warn("Column Filter Focus Error - No header filter set on column:", column.getField());
        }
      } //programmatically get value of header filter

    }, {
      key: "getHeaderFilterValue",
      value: function getHeaderFilterValue(column) {
        if (column.modules.filter && column.modules.filter.headerElement) {
          return column.modules.filter.value;
        } else {
          console.warn("Column Filter Error - No header filter set on column:", column.getField());
        }
      } //programatically set value of header filter

    }, {
      key: "setHeaderFilterValue",
      value: function setHeaderFilterValue(column, value) {
        if (column) {
          if (column.modules.filter && column.modules.filter.headerElement) {
            this.generateHeaderFilterElement(column, value, true);
            column.modules.filter.success(value);
          } else {
            console.warn("Column Filter Error - No header filter set on column:", column.getField());
          }
        }
      }
    }, {
      key: "reloadHeaderFilter",
      value: function reloadHeaderFilter(column) {
        if (column) {
          if (column.modules.filter && column.modules.filter.headerElement) {
            this.generateHeaderFilterElement(column, column.modules.filter.value, true);
          } else {
            console.warn("Column Filter Error - No header filter set on column:", column.getField());
          }
        }
      }
    }, {
      key: "refreshFilter",
      value: function refreshFilter() {
        if (this.tableInitialized) {
          if (this.table.options.filterMode === "remote") {
            this.reloadData(null, false, false);
          } else {
            this.refreshData(true);
          }
        } //TODO - Persist left position of row manager
        // left = this.scrollLeft;
        // this.scrollHorizontal(left);

      } //check if the filters has changed since last use

    }, {
      key: "trackChanges",
      value: function trackChanges() {
        this.changed = true;
        this.dispatch("filter-changed");
      } //check if the filters has changed since last use

    }, {
      key: "hasChanged",
      value: function hasChanged() {
        var changed = this.changed;
        this.changed = false;
        return changed;
      } //set standard filters

    }, {
      key: "setFilter",
      value: function setFilter(field, type, value, params) {
        this.filterList = [];

        if (!Array.isArray(field)) {
          field = [{
            field: field,
            type: type,
            value: value,
            params: params
          }];
        }

        this.addFilter(field);
      } //add filter to array

    }, {
      key: "addFilter",
      value: function addFilter(field, type, value, params) {
        var _this4 = this;

        var changed = false;

        if (!Array.isArray(field)) {
          field = [{
            field: field,
            type: type,
            value: value,
            params: params
          }];
        }

        field.forEach(function (filter) {
          filter = _this4.findFilter(filter);

          if (filter) {
            _this4.filterList.push(filter);

            changed = true;
          }
        });

        if (changed) {
          this.trackChanges();
        }
      }
    }, {
      key: "findFilter",
      value: function findFilter(filter) {
        var column;

        if (Array.isArray(filter)) {
          return this.findSubFilters(filter);
        }

        var filterFunc = false;

        if (typeof filter.field == "function") {
          filterFunc = function filterFunc(data) {
            return filter.field(data, filter.type || {}); // pass params to custom filter function
          };
        } else {
          if (Filter.filters[filter.type]) {
            column = this.table.columnManager.getColumnByField(filter.field);

            if (column) {
              filterFunc = function filterFunc(data) {
                return Filter.filters[filter.type](filter.value, column.getFieldValue(data), data, filter.params || {});
              };
            } else {
              filterFunc = function filterFunc(data) {
                return Filter.filters[filter.type](filter.value, data[filter.field], data, filter.params || {});
              };
            }
          } else {
            console.warn("Filter Error - No such filter type found, ignoring: ", filter.type);
          }
        }

        filter.func = filterFunc;
        return filter.func ? filter : false;
      }
    }, {
      key: "findSubFilters",
      value: function findSubFilters(filters) {
        var _this5 = this;

        var output = [];
        filters.forEach(function (filter) {
          filter = _this5.findFilter(filter);

          if (filter) {
            output.push(filter);
          }
        });
        return output.length ? output : false;
      } //get all filters

    }, {
      key: "getFilters",
      value: function getFilters(all, ajax) {
        var output = [];

        if (all) {
          output = this.getHeaderFilters();
        }

        if (ajax) {
          output.forEach(function (item) {
            if (typeof item.type == "function") {
              item.type = "function";
            }
          });
        }

        output = output.concat(this.filtersToArray(this.filterList, ajax));
        return output;
      } //filter to Object

    }, {
      key: "filtersToArray",
      value: function filtersToArray(filterList, ajax) {
        var _this6 = this;

        var output = [];
        filterList.forEach(function (filter) {
          var item;

          if (Array.isArray(filter)) {
            output.push(_this6.filtersToArray(filter, ajax));
          } else {
            item = {
              field: filter.field,
              type: filter.type,
              value: filter.value
            };

            if (ajax) {
              if (typeof item.type == "function") {
                item.type = "function";
              }
            }

            output.push(item);
          }
        });
        return output;
      } //get all filters

    }, {
      key: "getHeaderFilters",
      value: function getHeaderFilters() {
        var output = [];

        for (var key in this.headerFilters) {
          output.push({
            field: key,
            type: this.headerFilters[key].type,
            value: this.headerFilters[key].value
          });
        }

        return output;
      } //remove filter from array

    }, {
      key: "removeFilter",
      value: function removeFilter(field, type, value) {
        var _this7 = this;

        if (!Array.isArray(field)) {
          field = [{
            field: field,
            type: type,
            value: value
          }];
        }

        field.forEach(function (filter) {
          var index = -1;

          if (_typeof(filter.field) == "object") {
            index = _this7.filterList.findIndex(function (element) {
              return filter === element;
            });
          } else {
            index = _this7.filterList.findIndex(function (element) {
              return filter.field === element.field && filter.type === element.type && filter.value === element.value;
            });
          }

          if (index > -1) {
            _this7.filterList.splice(index, 1);
          } else {
            console.warn("Filter Error - No matching filter type found, ignoring: ", filter.type);
          }
        });
        this.trackChanges();
      } //clear filters

    }, {
      key: "clearFilter",
      value: function clearFilter(all) {
        this.filterList = [];

        if (all) {
          this.clearHeaderFilter();
        }

        this.trackChanges();
      } //clear header filters

    }, {
      key: "clearHeaderFilter",
      value: function clearHeaderFilter() {
        var _this8 = this;

        this.headerFilters = {};
        this.prevHeaderFilterChangeCheck = "{}";
        this.headerFilterColumns.forEach(function (column) {
          if (typeof column.modules.filter.value !== "undefined") {
            delete column.modules.filter.value;
          }

          column.modules.filter.prevSuccess = undefined;

          _this8.reloadHeaderFilter(column);
        });
        this.trackChanges();
      } //search data and return matching rows

    }, {
      key: "search",
      value: function search(searchType, field, type, value) {
        var _this9 = this;

        var activeRows = [],
            filterList = [];

        if (!Array.isArray(field)) {
          field = [{
            field: field,
            type: type,
            value: value
          }];
        }

        field.forEach(function (filter) {
          filter = _this9.findFilter(filter);

          if (filter) {
            filterList.push(filter);
          }
        });
        this.table.rowManager.rows.forEach(function (row) {
          var match = true;
          filterList.forEach(function (filter) {
            if (!_this9.filterRecurse(filter, row.getData())) {
              match = false;
            }
          });

          if (match) {
            activeRows.push(searchType === "data" ? row.getData("data") : row.getComponent());
          }
        });
        return activeRows;
      } //filter row array

    }, {
      key: "filter",
      value: function filter(rowList, filters) {
        var _this10 = this;

        var activeRows = [],
            activeRowComponents = [];

        if (this.subscribedExternal("dataFiltering")) {
          this.dispatchExternal("dataFiltering", this.getFilters(true));
        }

        if (this.table.options.filterMode !== "remote" && (this.filterList.length || Object.keys(this.headerFilters).length)) {
          rowList.forEach(function (row) {
            if (_this10.filterRow(row)) {
              activeRows.push(row);
            }
          });
        } else {
          activeRows = rowList.slice(0);
        }

        if (this.subscribedExternal("dataFiltered")) {
          activeRows.forEach(function (row) {
            activeRowComponents.push(row.getComponent());
          });
          this.dispatchExternal("dataFiltered", this.getFilters(true), activeRowComponents);
        }

        return activeRows;
      } //filter individual row

    }, {
      key: "filterRow",
      value: function filterRow(row, filters) {
        var _this11 = this;

        var match = true,
            data = row.getData();
        this.filterList.forEach(function (filter) {
          if (!_this11.filterRecurse(filter, data)) {
            match = false;
          }
        });

        for (var field in this.headerFilters) {
          if (!this.headerFilters[field].func(data)) {
            match = false;
          }
        }

        return match;
      }
    }, {
      key: "filterRecurse",
      value: function filterRecurse(filter, data) {
        var _this12 = this;

        var match = false;

        if (Array.isArray(filter)) {
          filter.forEach(function (subFilter) {
            if (_this12.filterRecurse(subFilter, data)) {
              match = true;
            }
          });
        } else {
          match = filter.func(data);
        }

        return match;
      }
    }]);

    return Filter;
  }(Module);

  Filter.moduleName = "filter"; //load defaults

  Filter.filters = defaultFilters;

  function plaintext (cell, formatterParams, onRendered) {
    return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
  }

  function html$1 (cell, formatterParams, onRendered) {
    return cell.getValue();
  }

  function textarea$1 (cell, formatterParams, onRendered) {
    cell.getElement().style.whiteSpace = "pre-wrap";
    return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
  }

  function money (cell, formatterParams, onRendered) {
    var floatVal = parseFloat(cell.getValue()),
        sign = "",
        number,
        integer,
        decimal,
        rgx;
    var decimalSym = formatterParams.decimal || ".";
    var thousandSym = formatterParams.thousand || ",";
    var negativeSign = formatterParams.negativeSign || "-";
    var symbol = formatterParams.symbol || "";
    var after = !!formatterParams.symbolAfter;
    var precision = typeof formatterParams.precision !== "undefined" ? formatterParams.precision : 2;

    if (isNaN(floatVal)) {
      return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
    }

    if (floatVal < 0) {
      floatVal = Math.abs(floatVal);
      sign = negativeSign;
    }

    number = precision !== false ? floatVal.toFixed(precision) : floatVal;
    number = String(number).split(".");
    integer = number[0];
    decimal = number.length > 1 ? decimalSym + number[1] : "";

    if (formatterParams.thousand !== false) {
      rgx = /(\d+)(\d{3})/;

      while (rgx.test(integer)) {
        integer = integer.replace(rgx, "$1" + thousandSym + "$2");
      }
    }

    return after ? sign + integer + decimal + symbol : sign + symbol + integer + decimal;
  }

  function link (cell, formatterParams, onRendered) {
    var value = cell.getValue(),
        urlPrefix = formatterParams.urlPrefix || "",
        download = formatterParams.download,
        label = value,
        el = document.createElement("a"),
        data;

    function labelTraverse(path, data) {
      var item = path.shift(),
          value = data[item];

      if (path.length && _typeof(value) === "object") {
        return labelTraverse(path, value);
      }

      return value;
    }

    if (formatterParams.labelField) {
      data = cell.getData();
      label = labelTraverse(formatterParams.labelField.split(this.table.options.nestedFieldSeparator), data);
    }

    if (formatterParams.label) {
      switch (_typeof(formatterParams.label)) {
        case "string":
          label = formatterParams.label;
          break;

        case "function":
          label = formatterParams.label(cell);
          break;
      }
    }

    if (label) {
      if (formatterParams.urlField) {
        data = cell.getData();
        value = data[formatterParams.urlField];
      }

      if (formatterParams.url) {
        switch (_typeof(formatterParams.url)) {
          case "string":
            value = formatterParams.url;
            break;

          case "function":
            value = formatterParams.url(cell);
            break;
        }
      }

      el.setAttribute("href", urlPrefix + value);

      if (formatterParams.target) {
        el.setAttribute("target", formatterParams.target);
      }

      if (formatterParams.download) {
        if (typeof download == "function") {
          download = download(cell);
        } else {
          download = download === true ? "" : download;
        }

        el.setAttribute("download", download);
      }

      el.innerHTML = this.emptyToSpace(this.sanitizeHTML(label));
      return el;
    } else {
      return "&nbsp;";
    }
  }

  function image (cell, formatterParams, onRendered) {
    var el = document.createElement("img"),
        src = cell.getValue();

    if (formatterParams.urlPrefix) {
      src = formatterParams.urlPrefix + cell.getValue();
    }

    if (formatterParams.urlSuffix) {
      src = src + formatterParams.urlSuffix;
    }

    el.setAttribute("src", src);

    switch (_typeof(formatterParams.height)) {
      case "number":
        el.style.height = formatterParams.height + "px";
        break;

      case "string":
        el.style.height = formatterParams.height;
        break;
    }

    switch (_typeof(formatterParams.width)) {
      case "number":
        el.style.width = formatterParams.width + "px";
        break;

      case "string":
        el.style.width = formatterParams.width;
        break;
    }

    el.addEventListener("load", function () {
      cell.getRow().normalizeHeight();
    });
    return el;
  }

  function tickCross$1 (cell, formatterParams, onRendered) {
    var value = cell.getValue(),
        element = cell.getElement(),
        empty = formatterParams.allowEmpty,
        truthy = formatterParams.allowTruthy,
        trueValueSet = Object.keys(formatterParams).includes("trueValue"),
        tick = typeof formatterParams.tickElement !== "undefined" ? formatterParams.tickElement : '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>',
        cross = typeof formatterParams.crossElement !== "undefined" ? formatterParams.crossElement : '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';

    if (trueValueSet && value === formatterParams.trueValue || !trueValueSet && (truthy && value || value === true || value === "true" || value === "True" || value === 1 || value === "1")) {
      element.setAttribute("aria-checked", true);
      return tick || "";
    } else {
      if (empty && (value === "null" || value === "" || value === null || typeof value === "undefined")) {
        element.setAttribute("aria-checked", "mixed");
        return "";
      } else {
        element.setAttribute("aria-checked", false);
        return cross || "";
      }
    }
  }

  function datetime (cell, formatterParams, onRendered) {
    var DT = window.DateTime || luxon.DateTime;
    var inputFormat = formatterParams.inputFormat || "yyyy-MM-dd HH:mm:ss";
    var outputFormat = formatterParams.outputFormat || "dd/MM/yyyy HH:mm:ss";
    var invalid = typeof formatterParams.invalidPlaceholder !== "undefined" ? formatterParams.invalidPlaceholder : "";
    var value = cell.getValue();

    if (typeof DT != "undefined") {
      var newDatetime;

      if (DT.isDateTime(value)) {
        newDatetime = value;
      } else if (inputFormat === "iso") {
        newDatetime = DT.fromISO(String(value));
      } else {
        newDatetime = DT.fromFormat(String(value), inputFormat);
      }

      if (newDatetime.isValid) {
        if (formatterParams.timezone) {
          newDatetime = newDatetime.setZone(formatterParams.timezone);
        }

        return newDatetime.toFormat(outputFormat);
      } else {
        if (invalid === true || !value) {
          return value;
        } else if (typeof invalid === "function") {
          return invalid(value);
        } else {
          return invalid;
        }
      }
    } else {
      console.error("Format Error - 'datetime' formatter is dependant on luxon.js");
    }
  }

  function datetimediff (cell, formatterParams, onRendered) {
    var DT = window.DateTime || luxon.DateTime;
    var inputFormat = formatterParams.inputFormat || "yyyy-MM-dd HH:mm:ss";
    var invalid = typeof formatterParams.invalidPlaceholder !== "undefined" ? formatterParams.invalidPlaceholder : "";
    var suffix = typeof formatterParams.suffix !== "undefined" ? formatterParams.suffix : false;
    var unit = typeof formatterParams.unit !== "undefined" ? formatterParams.unit : "days";
    var humanize = typeof formatterParams.humanize !== "undefined" ? formatterParams.humanize : false;
    var date = typeof formatterParams.date !== "undefined" ? formatterParams.date : DT.now();
    var value = cell.getValue();

    if (typeof DT != "undefined") {
      var newDatetime;

      if (DT.isDateTime(value)) {
        newDatetime = value;
      } else if (inputFormat === "iso") {
        newDatetime = DT.fromISO(String(value));
      } else {
        newDatetime = DT.fromFormat(String(value), inputFormat);
      }

      if (newDatetime.isValid) {
        if (humanize) {
          return newDatetime.diff(date, unit).toHuman() + (suffix ? " " + suffix : "");
        } else {
          return parseInt(newDatetime.diff(date, unit)[unit]) + (suffix ? " " + suffix : "");
        }
      } else {
        if (invalid === true) {
          return value;
        } else if (typeof invalid === "function") {
          return invalid(value);
        } else {
          return invalid;
        }
      }
    } else {
      console.error("Format Error - 'datetimediff' formatter is dependant on luxon.js");
    }
  }

  function lookup (cell, formatterParams, onRendered) {
    var value = cell.getValue();

    if (typeof formatterParams[value] === "undefined") {
      console.warn('Missing display value for ' + value);
      return value;
    }

    return formatterParams[value];
  }

  function star$1 (cell, formatterParams, onRendered) {
    var value = cell.getValue(),
        element = cell.getElement(),
        maxStars = formatterParams && formatterParams.stars ? formatterParams.stars : 5,
        stars = document.createElement("span"),
        star = document.createElementNS('http://www.w3.org/2000/svg', "svg"),
        starActive = '<polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>',
        starInactive = '<polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>'; //style stars holder

    stars.style.verticalAlign = "middle"; //style star

    star.setAttribute("width", "14");
    star.setAttribute("height", "14");
    star.setAttribute("viewBox", "0 0 512 512");
    star.setAttribute("xml:space", "preserve");
    star.style.padding = "0 1px";
    value = value && !isNaN(value) ? parseInt(value) : 0;
    value = Math.max(0, Math.min(value, maxStars));

    for (var i = 1; i <= maxStars; i++) {
      var nextStar = star.cloneNode(true);
      nextStar.innerHTML = i <= value ? starActive : starInactive;
      stars.appendChild(nextStar);
    }

    element.style.whiteSpace = "nowrap";
    element.style.overflow = "hidden";
    element.style.textOverflow = "ellipsis";
    element.setAttribute("aria-label", value);
    return stars;
  }

  function traffic (cell, formatterParams, onRendered) {
    var value = this.sanitizeHTML(cell.getValue()) || 0,
        el = document.createElement("span"),
        max = formatterParams && formatterParams.max ? formatterParams.max : 100,
        min = formatterParams && formatterParams.min ? formatterParams.min : 0,
        colors = formatterParams && typeof formatterParams.color !== "undefined" ? formatterParams.color : ["red", "orange", "green"],
        color = "#666666",
        percent,
        percentValue;

    if (isNaN(value) || typeof cell.getValue() === "undefined") {
      return;
    }

    el.classList.add("tabulator-traffic-light"); //make sure value is in range

    percentValue = parseFloat(value) <= max ? parseFloat(value) : max;
    percentValue = parseFloat(percentValue) >= min ? parseFloat(percentValue) : min; //workout percentage

    percent = (max - min) / 100;
    percentValue = Math.round((percentValue - min) / percent); //set color

    switch (_typeof(colors)) {
      case "string":
        color = colors;
        break;

      case "function":
        color = colors(value);
        break;

      case "object":
        if (Array.isArray(colors)) {
          var unit = 100 / colors.length;
          var index = Math.floor(percentValue / unit);
          index = Math.min(index, colors.length - 1);
          index = Math.max(index, 0);
          color = colors[index];
          break;
        }

    }

    el.style.backgroundColor = color;
    return el;
  }

  function progress$1 (cell, formatterParams, onRendered) {
    //progress bar
    var value = this.sanitizeHTML(cell.getValue()) || 0,
        element = cell.getElement(),
        max = formatterParams && formatterParams.max ? formatterParams.max : 100,
        min = formatterParams && formatterParams.min ? formatterParams.min : 0,
        legendAlign = formatterParams && formatterParams.legendAlign ? formatterParams.legendAlign : "center",
        percent,
        percentValue,
        color,
        legend,
        legendColor;
   //make sure value is in range

    percentValue = parseFloat(value) <= max ? parseFloat(value) : max;
    percentValue = parseFloat(percentValue) >= min ? parseFloat(percentValue) : min; //workout percentage

    percent = (max - min) / 100;
    percentValue = Math.round((percentValue - min) / percent); //set bar color

    switch (_typeof(formatterParams.color)) {
      case "string":
        color = formatterParams.color;
        break;

      case "function":
        color = formatterParams.color(value);
        break;

      case "object":
        if (Array.isArray(formatterParams.color)) {
          var unit = 100 / formatterParams.color.length;
          var index = Math.floor(percentValue / unit);
          index = Math.min(index, formatterParams.color.length - 1);
          index = Math.max(index, 0);
          color = formatterParams.color[index];
          break;
        }

      default:
        color = "#2DC214";
    } //generate legend


    switch (_typeof(formatterParams.legend)) {
      case "string":
        legend = formatterParams.legend;
        break;

      case "function":
        legend = formatterParams.legend(value);
        break;

      case "boolean":
        legend = value;
        break;

      default:
        legend = false;
    } //set legend color


    switch (_typeof(formatterParams.legendColor)) {
      case "string":
        legendColor = formatterParams.legendColor;
        break;

      case "function":
        legendColor = formatterParams.legendColor(value);
        break;

      case "object":
        if (Array.isArray(formatterParams.legendColor)) {
          var unit = 100 / formatterParams.legendColor.length;
          var index = Math.floor(percentValue / unit);
          index = Math.min(index, formatterParams.legendColor.length - 1);
          index = Math.max(index, 0);
          legendColor = formatterParams.legendColor[index];
        }

        break;

      default:
        legendColor = "#000";
    }

    element.style.minWidth = "30px";
    element.style.position = "relative";
    element.setAttribute("aria-label", percentValue);
    var barEl = document.createElement("div");
    barEl.style.display = "inline-block";
    barEl.style.position = "absolute";
    barEl.style.width = percentValue + "%";
    barEl.style.backgroundColor = color;
    barEl.style.height = "100%";
    barEl.setAttribute('data-max', max);
    barEl.setAttribute('data-min', min);
    var barContainer = document.createElement("div");
    barContainer.style.position = "relative";
    barContainer.style.width = "100%";
    barContainer.style.height = "100%";

    if (legend) {
      var legendEl = document.createElement("div");
      legendEl.style.position = "absolute";
      legendEl.style.top = 0;
      legendEl.style.left = 0;
      legendEl.style.textAlign = legendAlign;
      legendEl.style.width = "100%";
      legendEl.style.color = legendColor;
      legendEl.innerHTML = legend;
    }

    onRendered(function () {
      //handle custom element needed if formatter is to be included in printed/downloaded output
      if (!(cell instanceof CellComponent)) {
        var holderEl = document.createElement("div");
        holderEl.style.position = "absolute";
        holderEl.style.top = "4px";
        holderEl.style.bottom = "4px";
        holderEl.style.left = "4px";
        holderEl.style.right = "4px";
        element.appendChild(holderEl);
        element = holderEl;
      }

      element.appendChild(barContainer);
      barContainer.appendChild(barEl);

      if (legend) {
        barContainer.appendChild(legendEl);
      }
    });
    return "";
  }

  function color (cell, formatterParams, onRendered) {
    cell.getElement().style.backgroundColor = this.sanitizeHTML(cell.getValue());
    return "";
  }

  function buttonTick (cell, formatterParams, onRendered) {
    return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
  }

  function buttonCross (cell, formatterParams, onRendered) {
    return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
  }

  function rownum (cell, formatterParams, onRendered) {
    return this.table.rowManager.activeRows.indexOf(cell.getRow()._getSelf()) + 1 || "";
  }

  function handle (cell, formatterParams, onRendered) {
    cell.getElement().classList.add("tabulator-row-handle");
    return "<div class='tabulator-row-handle-box'><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div></div>";
  }

  function responsiveCollapse (cell, formatterParams, onRendered) {
    var el = document.createElement("div"),
        config = cell.getRow()._row.modules.responsiveLayout;

    el.classList.add("tabulator-responsive-collapse-toggle");
    el.innerHTML = "<span class='tabulator-responsive-collapse-toggle-open'>+</span><span class='tabulator-responsive-collapse-toggle-close'>-</span>";
    cell.getElement().classList.add("tabulator-row-handle");

    function toggleList(isOpen) {
      var collapseEl = config.element;
      config.open = isOpen;

      if (collapseEl) {
        if (config.open) {
          el.classList.add("open");
          collapseEl.style.display = '';
        } else {
          el.classList.remove("open");
          collapseEl.style.display = 'none';
        }
      }
    }

    el.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
      toggleList(!config.open);
    });
    toggleList(config.open);
    return el;
  }

  function rowSelection (cell, formatterParams, onRendered) {
    var _this = this;

    var checkbox = document.createElement("input");
    var blocked = false;
    checkbox.type = 'checkbox';
    checkbox.setAttribute("aria-label", "Select Row");

    if (this.table.modExists("selectRow", true)) {
      checkbox.addEventListener("click", function (e) {
        e.stopPropagation();
      });

      if (typeof cell.getRow == 'function') {
        var row = cell.getRow();

        if (row instanceof RowComponent$1) {
          checkbox.addEventListener("change", function (e) {
            if (_this.table.options.selectableRangeMode === "click") {
              if (!blocked) {
                row.toggleSelect();
              } else {
                blocked = false;
              }
            } else {
              row.toggleSelect();
            }
          });

          if (this.table.options.selectableRangeMode === "click") {
            checkbox.addEventListener("click", function (e) {
              blocked = true;

              _this.table.modules.selectRow.handleComplexRowClick(row._row, e);
            });
          }

          checkbox.checked = row.isSelected && row.isSelected();
          this.table.modules.selectRow.registerRowSelectCheckbox(row, checkbox);
        } else {
          checkbox = "";
        }
      } else {
        checkbox.addEventListener("change", function (e) {
          if (_this.table.modules.selectRow.selectedRows.length) {
            _this.table.deselectRow();
          } else {
            _this.table.selectRow(formatterParams.rowRange);
          }
        });
        this.table.modules.selectRow.registerHeaderSelectCheckbox(checkbox);
      }
    }

    return checkbox;
  }

  var defaultFormatters = {
    plaintext: plaintext,
    html: html$1,
    textarea: textarea$1,
    money: money,
    link: link,
    image: image,
    tickCross: tickCross$1,
    datetime: datetime,
    datetimediff: datetimediff,
    lookup: lookup,
    star: star$1,
    traffic: traffic,
    progress: progress$1,
    color: color,
    buttonTick: buttonTick,
    buttonCross: buttonCross,
    rownum: rownum,
    handle: handle,
    responsiveCollapse: responsiveCollapse,
    rowSelection: rowSelection
  };

  var Format = /*#__PURE__*/function (_Module) {
    _inherits(Format, _Module);

    var _super = _createSuper(Format);

    function Format(table) {
      var _this;

      _classCallCheck(this, Format);

      _this = _super.call(this, table);

      _this.registerColumnOption("formatter");

      _this.registerColumnOption("formatterParams");

      _this.registerColumnOption("formatterPrint");

      _this.registerColumnOption("formatterPrintParams");

      _this.registerColumnOption("formatterClipboard");

      _this.registerColumnOption("formatterClipboardParams");

      _this.registerColumnOption("formatterHtmlOutput");

      _this.registerColumnOption("formatterHtmlOutputParams");

      _this.registerColumnOption("titleFormatter");

      _this.registerColumnOption("titleFormatterParams");

      return _this;
    }

    _createClass(Format, [{
      key: "initialize",
      value: function initialize() {
        this.subscribe("cell-format", this.formatValue.bind(this));
        this.subscribe("cell-rendered", this.cellRendered.bind(this));
        this.subscribe("column-layout", this.initializeColumn.bind(this));
        this.subscribe("column-format", this.formatHeader.bind(this));
      } //initialize column formatter

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        column.modules.format = this.lookupFormatter(column, "");

        if (typeof column.definition.formatterPrint !== "undefined") {
          column.modules.format.print = this.lookupFormatter(column, "Print");
        }

        if (typeof column.definition.formatterClipboard !== "undefined") {
          column.modules.format.clipboard = this.lookupFormatter(column, "Clipboard");
        }

        if (typeof column.definition.formatterHtmlOutput !== "undefined") {
          column.modules.format.htmlOutput = this.lookupFormatter(column, "HtmlOutput");
        }
      }
    }, {
      key: "lookupFormatter",
      value: function lookupFormatter(column, type) {
        var config = {
          params: column.definition["formatter" + type + "Params"] || {}
        },
            formatter = column.definition["formatter" + type]; //set column formatter

        switch (_typeof(formatter)) {
          case "string":
            if (Format.formatters[formatter]) {
              config.formatter = Format.formatters[formatter];
            } else {
              console.warn("Formatter Error - No such formatter found: ", formatter);
              config.formatter = Format.formatters.plaintext;
            }

            break;

          case "function":
            config.formatter = formatter;
            break;

          default:
            config.formatter = Format.formatters.plaintext;
            break;
        }

        return config;
      }
    }, {
      key: "cellRendered",
      value: function cellRendered(cell) {
        if (cell.modules.format && cell.modules.format.renderedCallback && !cell.modules.format.rendered) {
          cell.modules.format.renderedCallback();
          cell.modules.format.rendered = true;
        }
      } //return a formatted value for a column header

    }, {
      key: "formatHeader",
      value: function formatHeader(column, title, el) {
        var formatter, params, onRendered, mockCell;

        if (column.definition.titleFormatter) {
          formatter = this.getFormatter(column.definition.titleFormatter);

          onRendered = function onRendered(callback) {
            column.titleFormatterRendered = callback;
          };

          mockCell = {
            getValue: function getValue() {
              return title;
            },
            getElement: function getElement() {
              return el;
            }
          };
          params = column.definition.titleFormatterParams || {};
          params = typeof params === "function" ? params() : params;
          return formatter.call(this, mockCell, params, onRendered);
        } else {
          return title;
        }
      } //return a formatted value for a cell

    }, {
      key: "formatValue",
      value: function formatValue(cell) {
        var component = cell.getComponent(),
            params = typeof cell.column.modules.format.params === "function" ? cell.column.modules.format.params(component) : cell.column.modules.format.params;

        function onRendered(callback) {
          if (!cell.modules.format) {
            cell.modules.format = {};
          }

          cell.modules.format.renderedCallback = callback;
          cell.modules.format.rendered = false;
        }

        return cell.column.modules.format.formatter.call(this, component, params, onRendered);
      }
    }, {
      key: "formatExportValue",
      value: function formatExportValue(cell, type) {
        var formatter = cell.column.modules.format[type],
            params;

        if (formatter) {
          var onRendered = function onRendered(callback) {
            if (!cell.modules.format) {
              cell.modules.format = {};
            }

            cell.modules.format.renderedCallback = callback;
            cell.modules.format.rendered = false;
          };

          params = typeof formatter.params === "function" ? formatter.params(component) : formatter.params;
          return formatter.formatter.call(this, cell.getComponent(), params, onRendered);
        } else {
          return this.formatValue(cell);
        }
      }
    }, {
      key: "sanitizeHTML",
      value: function sanitizeHTML(value) {
        if (value) {
          var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
          };
          return String(value).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
          });
        } else {
          return value;
        }
      }
    }, {
      key: "emptyToSpace",
      value: function emptyToSpace(value) {
        return value === null || typeof value === "undefined" || value === "" ? "&nbsp;" : value;
      } //get formatter for cell

    }, {
      key: "getFormatter",
      value: function getFormatter(formatter) {
        var formatter;

        switch (_typeof(formatter)) {
          case "string":
            if (Format.formatters[formatter]) {
              formatter = Format.formatters[formatter];
            } else {
              console.warn("Formatter Error - No such formatter found: ", formatter);
              formatter = Format.formatters.plaintext;
            }

            break;

          case "function":
            formatter = formatter;
            break;

          default:
            formatter = Format.formatters.plaintext;
            break;
        }

        return formatter;
      }
    }]);

    return Format;
  }(Module);

  Format.moduleName = "format"; //load defaults

  Format.formatters = defaultFormatters;

  var FrozenColumns = /*#__PURE__*/function (_Module) {
    _inherits(FrozenColumns, _Module);

    var _super = _createSuper(FrozenColumns);

    function FrozenColumns(table) {
      var _this;

      _classCallCheck(this, FrozenColumns);

      _this = _super.call(this, table);
      _this.leftColumns = [];
      _this.rightColumns = [];
      _this.leftMargin = 0;
      _this.rightMargin = 0;
      _this.rightPadding = 0;
      _this.initializationMode = "left";
      _this.active = false;
      _this.blocked = true;

      _this.registerColumnOption("frozen");

      return _this;
    } //reset initial state


    _createClass(FrozenColumns, [{
      key: "reset",
      value: function reset() {
        this.initializationMode = "left";
        this.leftColumns = [];
        this.rightColumns = [];
        this.leftMargin = 0;
        this.rightMargin = 0;
        this.rightMargin = 0;
        this.active = false;
        this.table.columnManager.headersElement.style.marginLeft = 0;
        this.table.columnManager.element.style.paddingRight = 0;
      }
    }, {
      key: "initialize",
      value: function initialize() {
        this.subscribe("cell-layout", this.layoutCell.bind(this));
        this.subscribe("column-init", this.initializeColumn.bind(this));
        this.subscribe("column-width", this.layout.bind(this));
        this.subscribe("row-layout-after", this.layoutRow.bind(this));
        this.subscribe("table-layout", this.layout.bind(this));
        this.subscribe("scroll-horizontal", this.scrollHorizontal.bind(this));
        this.subscribe("scroll-horizontal", this.scrollHorizontal.bind(this));
        this.subscribe("columns-loading", this.reset.bind(this));
        this.subscribe("column-add", this.reinitializeColumns.bind(this));
        this.subscribe("column-delete", this.reinitializeColumns.bind(this));
        this.subscribe("table-redraw", this.layout.bind(this));
        this.subscribe("layout-refreshing", this.blockLayout.bind(this));
        this.subscribe("layout-refreshed", this.unblockLayout.bind(this));
      }
    }, {
      key: "blockLayout",
      value: function blockLayout() {
        this.blocked = true;
      }
    }, {
      key: "unblockLayout",
      value: function unblockLayout() {
        this.blocked = false;
      }
    }, {
      key: "layoutCell",
      value: function layoutCell(cell) {
        this.layoutElement(cell.element, cell.column);
      }
    }, {
      key: "reinitializeColumns",
      value: function reinitializeColumns() {
        var _this2 = this;

        this.reset();
        this.table.columnManager.columnsByIndex.forEach(function (column) {
          _this2.initializeColumn(column);
        });
      } //initialize specific column

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var config = {
          margin: 0,
          edge: false
        };

        if (!column.isGroup) {
          if (this.frozenCheck(column)) {
            config.position = this.initializationMode;

            if (this.initializationMode == "left") {
              this.leftColumns.push(column);
            } else {
              this.rightColumns.unshift(column);
            }

            this.active = true;
            column.modules.frozen = config;
          } else {
            this.initializationMode = "right";
          }
        }
      }
    }, {
      key: "frozenCheck",
      value: function frozenCheck(column) {
        if (column.parent.isGroup && column.definition.frozen) {
          console.warn("Frozen Column Error - Parent column group must be frozen, not individual columns or sub column groups");
        }

        if (column.parent.isGroup) {
          return this.frozenCheck(column.parent);
        } else {
          return column.definition.frozen;
        }
      } //quick layout to smooth horizontal scrolling

    }, {
      key: "scrollHorizontal",
      value: function scrollHorizontal() {

        if (this.active) {
          this.calcMargins(true);
          this.layoutColumnPosition();
          this.layoutCalcRows();
          this.reinitializeRows();
        }
      } //calculate margins for rows

    }, {
      key: "calcMargins",
      value: function calcMargins(scroll) {
        if (!scroll) {
          this.leftMargin = this._calcSpace(this.leftColumns, this.leftColumns.length) + "px";
          this.rightMargin = this._calcSpace(this.rightColumns, this.rightColumns.length) + "px";
          this.table.rowManager.tableElement.style.marginRight = this.rightMargin;
        } //calculate right frozen columns


        this.rightPadding = this.table.rowManager.element.clientWidth + this.table.columnManager.scrollLeft;
      } //layout calculation rows

    }, {
      key: "layoutCalcRows",
      value: function layoutCalcRows() {
        if (this.table.modExists("columnCalcs")) {
          if (this.table.modules.columnCalcs.topInitialized && this.table.modules.columnCalcs.topRow) {
            this.layoutRow(this.table.modules.columnCalcs.topRow);
          }

          if (this.table.modules.columnCalcs.botInitialized && this.table.modules.columnCalcs.botRow) {
            this.layoutRow(this.table.modules.columnCalcs.botRow);
          }

          if (this.table.modExists("groupRows")) {
            this.layoutGroupCalcs(this.table.modules.groupRows.getGroups());
          }
        }
      }
    }, {
      key: "layoutGroupCalcs",
      value: function layoutGroupCalcs(groups) {
        var _this3 = this;

        groups.forEach(function (group) {
          if (group.calcs.top) {
            _this3.layoutRow(group.calcs.top);
          }

          if (group.calcs.bottom) {
            _this3.layoutRow(group.calcs.bottom);
          }

          if (group.groupList && group.groupList.length) {
            _this3.layoutGroupCalcs(group.groupList && group.groupList);
          }
        });
      } //calculate column positions and layout headers

    }, {
      key: "layoutColumnPosition",
      value: function layoutColumnPosition(allCells) {
        var _this4 = this;

        var leftParents = [];
        var leftMargin = 0;
        var rightMargin = 0;
        this.table.columnManager.headersElement.style.marginLeft = this.leftMargin;
        this.table.columnManager.element.style.paddingRight = this.rightMargin;
        this.leftColumns.forEach(function (column, i) {
          column.modules.frozen.marginValue = leftMargin + _this4.table.columnManager.scrollLeft;
          column.modules.frozen.margin = column.modules.frozen.marginValue + "px";

          if (column.visible) {
            leftMargin += column.getWidth();
          }

          if (i == _this4.leftColumns.length - 1) {
            column.modules.frozen.edge = true;
          } else {
            column.modules.frozen.edge = false;
          }

          if (column.parent.isGroup) {
            var parentEl = _this4.getColGroupParentElement(column);

            if (!leftParents.includes(parentEl)) {
              _this4.layoutElement(parentEl, column);

              leftParents.push(parentEl);
            }

            if (column.modules.frozen.edge) {
              parentEl.classList.add("tabulator-frozen-" + column.modules.frozen.position);
            }
          } else {
            _this4.layoutElement(column.getElement(), column);
          }

          if (allCells) {
            column.cells.forEach(function (cell) {
              _this4.layoutElement(cell.getElement(true), column);
            });
          }
        });
        this.rightColumns.forEach(function (column, i) {
          if (column.visible) {
            rightMargin += column.getWidth();
          }

          column.modules.frozen.marginValue = _this4.rightPadding - rightMargin;
          column.modules.frozen.margin = column.modules.frozen.marginValue + "px";

          if (i == _this4.rightColumns.length - 1) {
            column.modules.frozen.edge = true;
          } else {
            column.modules.frozen.edge = false;
          }

          if (column.parent.isGroup) {
            _this4.layoutElement(_this4.getColGroupParentElement(column), column);
          } else {
            _this4.layoutElement(column.getElement(), column);
          }

          if (allCells) {
            column.cells.forEach(function (cell) {
              _this4.layoutElement(cell.getElement(true), column);
            });
          }
        });
      }
    }, {
      key: "getColGroupParentElement",
      value: function getColGroupParentElement(column) {
        return column.parent.isGroup ? this.getColGroupParentElement(column.parent) : column.getElement();
      } //layout columns appropriately

    }, {
      key: "layout",
      value: function layout() {
        if (this.active && !this.blocked) {
          //calculate row padding
          this.calcMargins(); //calculate left columns

          this.layoutColumnPosition();
          this.reinitializeRows();
          this.layoutCalcRows();
        }
      }
    }, {
      key: "reinitializeRows",
      value: function reinitializeRows() {
        var _this5 = this;

        var visibleRows = this.table.rowManager.getVisibleRows();
        var otherRows = this.table.rowManager.getRows().filter(function (row) {
          return !visibleRows.includes(row);
        });
        otherRows.forEach(function (row) {
          row.deinitialize();
        });
        visibleRows.forEach(function (row) {
          if (row.type === "row") {
            _this5.layoutRow(row);
          }
        });
      }
    }, {
      key: "layoutRow",
      value: function layoutRow(row) {
        var _this6 = this;

        // console.trace("row")
        var rowEl = row.getElement();
        rowEl.style.paddingLeft = this.leftMargin;

        if (this.table.options.layout === "fitDataFill" && this.rightColumns.length) {
          this.table.rowManager.getTableElement().style.minWidth = "calc(100% - " + this.rightMargin + ")";
        }

        this.leftColumns.forEach(function (column) {
          var cell = row.getCell(column);

          if (cell) {
            _this6.layoutElement(cell.getElement(true), column);
          }
        });
        this.rightColumns.forEach(function (column) {
          var cell = row.getCell(column);

          if (cell) {
            _this6.layoutElement(cell.getElement(true), column);
          }
        });
      }
    }, {
      key: "layoutElement",
      value: function layoutElement(element, column) {
        if (column.modules.frozen) {
          element.style.position = "absolute";
          element.style.left = column.modules.frozen.margin;
          element.classList.add("tabulator-frozen");

          if (column.modules.frozen.edge) {
            element.classList.add("tabulator-frozen-" + column.modules.frozen.position);
          }
        }
      }
    }, {
      key: "_calcSpace",
      value: function _calcSpace(columns, index) {
        var width = 0;

        for (var i = 0; i < index; i++) {
          if (columns[i].visible) {
            width += columns[i].getWidth();
          }
        }

        return width;
      }
    }]);

    return FrozenColumns;
  }(Module);

  FrozenColumns.moduleName = "frozenColumns";

  var FrozenRows = /*#__PURE__*/function (_Module) {
    _inherits(FrozenRows, _Module);

    var _super = _createSuper(FrozenRows);

    function FrozenRows(table) {
      var _this;

      _classCallCheck(this, FrozenRows);

      _this = _super.call(this, table);
      _this.topElement = document.createElement("div");
      _this.rows = []; //register component functions

      _this.registerComponentFunction("row", "freeze", _this.freezeRow.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "unfreeze", _this.unfreezeRow.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "isFrozen", _this.isRowFrozen.bind(_assertThisInitialized(_this)));

      return _this;
    }

    _createClass(FrozenRows, [{
      key: "initialize",
      value: function initialize() {
        this.rows = [];
        this.topElement.classList.add("tabulator-frozen-rows-holder"); // this.table.columnManager.element.append(this.topElement);

        this.table.columnManager.getElement().insertBefore(this.topElement, this.table.columnManager.headersElement.nextSibling);
        this.subscribe("row-deleting", this.detachRow.bind(this));
        this.subscribe("rows-visible", this.visibleRows.bind(this));
        this.registerDisplayHandler(this.getRows.bind(this), 10);
      }
    }, {
      key: "isRowFrozen",
      value: function isRowFrozen(row) {
        var index = this.rows.indexOf(row);
        return index > -1;
      }
    }, {
      key: "isFrozen",
      value: function isFrozen() {
        return !!this.rows.length;
      }
    }, {
      key: "visibleRows",
      value: function visibleRows(viewable, rows) {
        this.rows.forEach(function (row) {
          rows.push(row);
        });
        return rows;
      } //filter frozen rows out of display data

    }, {
      key: "getRows",
      value: function getRows(rows) {
        var output = rows.slice(0);
        this.rows.forEach(function (row) {
          var index = output.indexOf(row);

          if (index > -1) {
            output.splice(index, 1);
          }
        });
        return output;
      }
    }, {
      key: "freezeRow",
      value: function freezeRow(row) {
        if (!row.modules.frozen) {
          row.modules.frozen = true;
          this.topElement.appendChild(row.getElement());
          row.initialize();
          row.normalizeHeight();
          this.table.rowManager.adjustTableSize();
          this.rows.push(row);
          this.refreshData(false, "display");
          this.styleRows();
        } else {
          console.warn("Freeze Error - Row is already frozen");
        }
      }
    }, {
      key: "unfreezeRow",
      value: function unfreezeRow(row) {
        var index = this.rows.indexOf(row);

        if (row.modules.frozen) {
          row.modules.frozen = false;
          this.detachRow(row);
          this.table.rowManager.adjustTableSize();
          this.refreshData(false, "display");

          if (this.rows.length) {
            this.styleRows();
          }
        } else {
          console.warn("Freeze Error - Row is already unfrozen");
        }
      }
    }, {
      key: "detachRow",
      value: function detachRow(row) {
        var index = this.rows.indexOf(row);

        if (index > -1) {
          var rowEl = row.getElement();

          if (rowEl.parentNode) {
            rowEl.parentNode.removeChild(rowEl);
          }

          this.rows.splice(index, 1);
        }
      }
    }, {
      key: "styleRows",
      value: function styleRows(row) {
        var _this2 = this;

        this.rows.forEach(function (row, i) {
          _this2.table.rowManager.styleRow(row, i);
        });
      }
    }]);

    return FrozenRows;
  }(Module);

  FrozenRows.moduleName = "frozenRows";

  //public group object
  var GroupComponent = /*#__PURE__*/function () {
    function GroupComponent(group) {
      _classCallCheck(this, GroupComponent);

      this._group = group;
      this.type = "GroupComponent";
      return new Proxy(this, {
        get: function get(target, name, receiver) {
          if (typeof target[name] !== "undefined") {
            return target[name];
          } else {
            return target._group.groupManager.table.componentFunctionBinder.handle("row", target._group, name);
          }
        }
      });
    }

    _createClass(GroupComponent, [{
      key: "getKey",
      value: function getKey() {
        return this._group.key;
      }
    }, {
      key: "getField",
      value: function getField() {
        return this._group.field;
      }
    }, {
      key: "getElement",
      value: function getElement() {
        return this._group.element;
      }
    }, {
      key: "getRows",
      value: function getRows() {
        return this._group.getRows(true);
      }
    }, {
      key: "getSubGroups",
      value: function getSubGroups() {
        return this._group.getSubGroups(true);
      }
    }, {
      key: "getParentGroup",
      value: function getParentGroup() {
        return this._group.parent ? this._group.parent.getComponent() : false;
      }
    }, {
      key: "isVisible",
      value: function isVisible() {
        return this._group.visible;
      }
    }, {
      key: "show",
      value: function show() {
        this._group.show();
      }
    }, {
      key: "hide",
      value: function hide() {
        this._group.hide();
      }
    }, {
      key: "toggle",
      value: function toggle() {
        this._group.toggleVisibility();
      }
    }, {
      key: "_getSelf",
      value: function _getSelf() {
        return this._group;
      }
    }, {
      key: "getTable",
      value: function getTable() {
        return this._group.groupManager.table;
      }
    }]);

    return GroupComponent;
  }();

  var Group = /*#__PURE__*/function () {
    function Group(groupManager, parent, level, key, field, generator, oldGroup) {
      _classCallCheck(this, Group);

      this.groupManager = groupManager;
      this.parent = parent;
      this.key = key;
      this.level = level;
      this.field = field;
      this.hasSubGroups = level < groupManager.groupIDLookups.length - 1;
      this.addRow = this.hasSubGroups ? this._addRowToGroup : this._addRow;
      this.type = "group"; //type of element

      this.old = oldGroup;
      this.rows = [];
      this.groups = [];
      this.groupList = [];
      this.generator = generator;
      this.element = false;
      this.elementContents = false;
      this.height = 0;
      this.outerHeight = 0;
      this.initialized = false;
      this.calcs = {};
      this.initialized = false;
      this.modules = {};
      this.arrowElement = false;
      this.visible = oldGroup ? oldGroup.visible : typeof groupManager.startOpen[level] !== "undefined" ? groupManager.startOpen[level] : groupManager.startOpen[0];
      this.component = null;
      this.createElements();
      this.addBindings();
      this.createValueGroups();
    }

    _createClass(Group, [{
      key: "wipe",
      value: function wipe() {
        if (this.groupList.length) {
          this.groupList.forEach(function (group) {
            group.wipe();
          });
        } else {
          this.rows.forEach(function (row) {
            if (row.modules) {
              delete row.modules.group;
            }
          });
        }

        this.element = false;
        this.arrowElement = false;
        this.elementContents = false;
      }
    }, {
      key: "createElements",
      value: function createElements() {
        var arrow = document.createElement("div");
        arrow.classList.add("tabulator-arrow");
        this.element = document.createElement("div");
        this.element.classList.add("tabulator-row");
        this.element.classList.add("tabulator-group");
        this.element.classList.add("tabulator-group-level-" + this.level);
        this.element.setAttribute("role", "rowgroup");
        this.arrowElement = document.createElement("div");
        this.arrowElement.classList.add("tabulator-group-toggle");
        this.arrowElement.appendChild(arrow); //setup movable rows

        if (this.groupManager.table.options.movableRows !== false && this.groupManager.table.modExists("moveRow")) {
          this.groupManager.table.modules.moveRow.initializeGroupHeader(this);
        }
      }
    }, {
      key: "createValueGroups",
      value: function createValueGroups() {
        var _this = this;

        var level = this.level + 1;

        if (this.groupManager.allowedValues && this.groupManager.allowedValues[level]) {
          this.groupManager.allowedValues[level].forEach(function (value) {
            _this._createGroup(value, level);
          });
        }
      }
    }, {
      key: "addBindings",
      value: function addBindings() {
        var _this2 = this;

        var toggleElement;

        if (this.groupManager.table.options.groupToggleElement) {
          toggleElement = this.groupManager.table.options.groupToggleElement == "arrow" ? this.arrowElement : this.element;
          toggleElement.addEventListener("click", function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();

            _this2.toggleVisibility();
          });
        }
      }
    }, {
      key: "_createGroup",
      value: function _createGroup(groupID, level) {
        var groupKey = level + "_" + groupID;
        var group = new Group(this.groupManager, this, level, groupID, this.groupManager.groupIDLookups[level].field, this.groupManager.headerGenerator[level] || this.groupManager.headerGenerator[0], this.old ? this.old.groups[groupKey] : false);
        this.groups[groupKey] = group;
        this.groupList.push(group);
      }
    }, {
      key: "_addRowToGroup",
      value: function _addRowToGroup(row) {
        var level = this.level + 1;

        if (this.hasSubGroups) {
          var groupID = this.groupManager.groupIDLookups[level].func(row.getData()),
              groupKey = level + "_" + groupID;

          if (this.groupManager.allowedValues && this.groupManager.allowedValues[level]) {
            if (this.groups[groupKey]) {
              this.groups[groupKey].addRow(row);
            }
          } else {
            if (!this.groups[groupKey]) {
              this._createGroup(groupID, level);
            }

            this.groups[groupKey].addRow(row);
          }
        }
      }
    }, {
      key: "_addRow",
      value: function _addRow(row) {
        this.rows.push(row);
        row.modules.group = this;
      }
    }, {
      key: "insertRow",
      value: function insertRow(row, to, after) {
        var data = this.conformRowData({});
        row.updateData(data);
        var toIndex = this.rows.indexOf(to);

        if (toIndex > -1) {
          if (after) {
            this.rows.splice(toIndex + 1, 0, row);
          } else {
            this.rows.splice(toIndex, 0, row);
          }
        } else {
          if (after) {
            this.rows.push(row);
          } else {
            this.rows.unshift(row);
          }
        }

        row.modules.group = this;
        this.generateGroupHeaderContents();

        if (this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.options.columnCalcs != "table") {
          this.groupManager.table.modules.columnCalcs.recalcGroup(this);
        }

        this.groupManager.updateGroupRows(true);
      }
    }, {
      key: "scrollHeader",
      value: function scrollHeader(left) {
        if (this.arrowElement) {
          this.arrowElement.style.marginLeft = left;
          this.groupList.forEach(function (child) {
            child.scrollHeader(left);
          });
        }
      }
    }, {
      key: "getRowIndex",
      value: function getRowIndex(row) {} //update row data to match grouping contraints

    }, {
      key: "conformRowData",
      value: function conformRowData(data) {
        if (this.field) {
          data[this.field] = this.key;
        } else {
          console.warn("Data Conforming Error - Cannot conform row data to match new group as groupBy is a function");
        }

        if (this.parent) {
          data = this.parent.conformRowData(data);
        }

        return data;
      }
    }, {
      key: "removeRow",
      value: function removeRow(row) {
        var index = this.rows.indexOf(row);
        var el = row.getElement();

        if (index > -1) {
          this.rows.splice(index, 1);
        }

        if (!this.groupManager.table.options.groupValues && !this.rows.length) {
          if (this.parent) {
            this.parent.removeGroup(this);
          } else {
            this.groupManager.removeGroup(this);
          }

          this.groupManager.updateGroupRows(true);
        } else {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }

          this.generateGroupHeaderContents();

          if (this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.options.columnCalcs != "table") {
            this.groupManager.table.modules.columnCalcs.recalcGroup(this);
          }
        }
      }
    }, {
      key: "removeGroup",
      value: function removeGroup(group) {
        var groupKey = group.level + "_" + group.key,
            index;

        if (this.groups[groupKey]) {
          delete this.groups[groupKey];
          index = this.groupList.indexOf(group);

          if (index > -1) {
            this.groupList.splice(index, 1);
          }

          if (!this.groupList.length) {
            if (this.parent) {
              this.parent.removeGroup(this);
            } else {
              this.groupManager.removeGroup(this);
            }
          }
        }
      }
    }, {
      key: "getHeadersAndRows",
      value: function getHeadersAndRows(noCalc) {
        var output = [];
        output.push(this);

        this._visSet();

        if (this.visible) {
          if (this.groupList.length) {
            this.groupList.forEach(function (group) {
              output = output.concat(group.getHeadersAndRows(noCalc));
            });
          } else {
            if (!noCalc && this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.modules.columnCalcs.hasTopCalcs()) {
              if (this.calcs.top) {
                this.calcs.top.detachElement();
                this.calcs.top.deleteCells();
              }

              this.calcs.top = this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows);
              output.push(this.calcs.top);
            }

            output = output.concat(this.rows);

            if (!noCalc && this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.modules.columnCalcs.hasBottomCalcs()) {
              if (this.calcs.bottom) {
                this.calcs.bottom.detachElement();
                this.calcs.bottom.deleteCells();
              }

              this.calcs.bottom = this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows);
              output.push(this.calcs.bottom);
            }
          }
        } else {
          if (!this.groupList.length && this.groupManager.table.options.columnCalcs != "table") {
            if (this.groupManager.table.modExists("columnCalcs")) {
              if (!noCalc && this.groupManager.table.modules.columnCalcs.hasTopCalcs()) {
                if (this.calcs.top) {
                  this.calcs.top.detachElement();
                  this.calcs.top.deleteCells();
                }

                if (this.groupManager.table.options.groupClosedShowCalcs) {
                  this.calcs.top = this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows);
                  output.push(this.calcs.top);
                }
              }

              if (!noCalc && this.groupManager.table.modules.columnCalcs.hasBottomCalcs()) {
                if (this.calcs.bottom) {
                  this.calcs.bottom.detachElement();
                  this.calcs.bottom.deleteCells();
                }

                if (this.groupManager.table.options.groupClosedShowCalcs) {
                  this.calcs.bottom = this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows);
                  output.push(this.calcs.bottom);
                }
              }
            }
          }
        }

        return output;
      }
    }, {
      key: "getData",
      value: function getData(visible, transform) {
        var output = [];

        this._visSet();

        if (!visible || visible && this.visible) {
          this.rows.forEach(function (row) {
            output.push(row.getData(transform || "data"));
          });
        }

        return output;
      }
    }, {
      key: "getRowCount",
      value: function getRowCount() {
        var count = 0;

        if (this.groupList.length) {
          this.groupList.forEach(function (group) {
            count += group.getRowCount();
          });
        } else {
          count = this.rows.length;
        }

        return count;
      }
    }, {
      key: "toggleVisibility",
      value: function toggleVisibility() {
        if (this.visible) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        this.visible = false;

        if (this.groupManager.table.rowManager.getRenderMode() == "classic" && !this.groupManager.table.options.pagination) {
          this.element.classList.remove("tabulator-group-visible");

          if (this.groupList.length) {
            this.groupList.forEach(function (group) {
              var rows = group.getHeadersAndRows();
              rows.forEach(function (row) {
                row.detachElement();
              });
            });
          } else {
            this.rows.forEach(function (row) {
              var rowEl = row.getElement();
              rowEl.parentNode.removeChild(rowEl);
            });
          }

          this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(), this.groupManager.getDisplayIndex());
          this.groupManager.table.rowManager.checkClassicModeGroupHeaderWidth();
        } else {
          this.groupManager.updateGroupRows(true);
        }

        this.groupManager.table.externalEvents.dispatch("groupVisibilityChanged", this.getComponent(), false);
      }
    }, {
      key: "show",
      value: function show() {
        this.visible = true;

        if (this.groupManager.table.rowManager.getRenderMode() == "classic" && !this.groupManager.table.options.pagination) {
          this.element.classList.add("tabulator-group-visible");
          var prev = this.generateElement();

          if (this.groupList.length) {
            this.groupList.forEach(function (group) {
              var rows = group.getHeadersAndRows();
              rows.forEach(function (row) {
                var rowEl = row.getElement();
                prev.parentNode.insertBefore(rowEl, prev.nextSibling);
                row.initialize();
                prev = rowEl;
              });
            });
          } else {
            this.rows.forEach(function (row) {
              var rowEl = row.getElement();
              prev.parentNode.insertBefore(rowEl, prev.nextSibling);
              row.initialize();
              prev = rowEl;
            });
          }

          this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(), this.groupManager.getDisplayIndex());
          this.groupManager.table.rowManager.checkClassicModeGroupHeaderWidth();
        } else {
          this.groupManager.updateGroupRows(true);
        }

        this.groupManager.table.externalEvents.dispatch("groupVisibilityChanged", this.getComponent(), true);
      }
    }, {
      key: "_visSet",
      value: function _visSet() {
        var data = [];

        if (typeof this.visible == "function") {
          this.rows.forEach(function (row) {
            data.push(row.getData());
          });
          this.visible = this.visible(this.key, this.getRowCount(), data, this.getComponent());
        }
      }
    }, {
      key: "getRowGroup",
      value: function getRowGroup(row) {
        var match = false;

        if (this.groupList.length) {
          this.groupList.forEach(function (group) {
            var result = group.getRowGroup(row);

            if (result) {
              match = result;
            }
          });
        } else {
          if (this.rows.find(function (item) {
            return item === row;
          })) {
            match = this;
          }
        }

        return match;
      }
    }, {
      key: "getSubGroups",
      value: function getSubGroups(component) {
        var output = [];
        this.groupList.forEach(function (child) {
          output.push(component ? child.getComponent() : child);
        });
        return output;
      }
    }, {
      key: "getRows",
      value: function getRows(compoment) {
        var output = [];
        this.rows.forEach(function (row) {
          output.push(compoment ? row.getComponent() : row);
        });
        return output;
      }
    }, {
      key: "generateGroupHeaderContents",
      value: function generateGroupHeaderContents() {
        var data = [];
        this.rows.forEach(function (row) {
          data.push(row.getData());
        });
        this.elementContents = this.generator(this.key, this.getRowCount(), data, this.getComponent());

        while (this.element.firstChild) {
          this.element.removeChild(this.element.firstChild);
        }

        if (typeof this.elementContents === "string") {
          this.element.innerHTML = this.elementContents;
        } else {
          this.element.appendChild(this.elementContents);
        }

        this.element.insertBefore(this.arrowElement, this.element.firstChild);
      }
    }, {
      key: "getPath",
      value: function getPath() {
        var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        path.unshift(this.key);

        if (this.parent) {
          this.parent.getPath(path);
        }

        return path;
      } ////////////// Standard Row Functions //////////////

    }, {
      key: "getElement",
      value: function getElement() {
        return this.elementContents ? this.element : this.generateElement();
      }
    }, {
      key: "generateElement",
      value: function generateElement() {
        this.addBindings = false;

        this._visSet();

        if (this.visible) {
          this.element.classList.add("tabulator-group-visible");
        } else {
          this.element.classList.remove("tabulator-group-visible");
        }

        for (var i = 0; i < this.element.childNodes.length; ++i) {
          this.element.childNodes[i].parentNode.removeChild(this.element.childNodes[i]);
        }

        this.generateGroupHeaderContents(); // this.addBindings();

        return this.element;
      }
    }, {
      key: "detachElement",
      value: function detachElement() {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      } //normalize the height of elements in the row

    }, {
      key: "normalizeHeight",
      value: function normalizeHeight() {
        this.setHeight(this.element.clientHeight);
      }
    }, {
      key: "initialize",
      value: function initialize(force) {
        if (!this.initialized || force) {
          this.normalizeHeight();
          this.initialized = true;
        }
      }
    }, {
      key: "reinitialize",
      value: function reinitialize() {
        this.initialized = false;
        this.height = 0;

        if (Helpers.elVisible(this.element)) {
          this.initialize(true);
        }
      }
    }, {
      key: "setHeight",
      value: function setHeight(height) {
        if (this.height != height) {
          this.height = height;
          this.outerHeight = this.element.offsetHeight;
        }
      } //return rows outer height

    }, {
      key: "getHeight",
      value: function getHeight() {
        return this.outerHeight;
      }
    }, {
      key: "getGroup",
      value: function getGroup() {
        return this;
      }
    }, {
      key: "reinitializeHeight",
      value: function reinitializeHeight() {}
    }, {
      key: "calcHeight",
      value: function calcHeight() {}
    }, {
      key: "setCellHeight",
      value: function setCellHeight() {}
    }, {
      key: "clearCellHeight",
      value: function clearCellHeight() {}
    }, {
      key: "deinitializeHeight",
      value: function deinitializeHeight() {} //////////////// Object Generation /////////////////

    }, {
      key: "getComponent",
      value: function getComponent() {
        if (!this.component) {
          this.component = new GroupComponent(this);
        }

        return this.component;
      }
    }]);

    return Group;
  }();

  var GroupRows = /*#__PURE__*/function (_Module) {
    _inherits(GroupRows, _Module);

    var _super = _createSuper(GroupRows);

    function GroupRows(table) {
      var _this;

      _classCallCheck(this, GroupRows);

      _this = _super.call(this, table);
      _this.groupIDLookups = false; //enable table grouping and set field to group by

      _this.startOpen = [function () {
        return false;
      }]; //starting state of group

      _this.headerGenerator = [function () {
        return "";
      }];
      _this.groupList = []; //ordered list of groups

      _this.allowedValues = false;
      _this.groups = {}; //hold row groups

      _this.displayIndex = 0; //index in display pipeline

      _this.displayHandler = _this.getRows.bind(_assertThisInitialized(_this)); //register table options

      _this.registerTableOption("groupBy", false); //enable table grouping and set field to group by


      _this.registerTableOption("groupStartOpen", true); //starting state of group


      _this.registerTableOption("groupValues", false);

      _this.registerTableOption("groupUpdateOnCellEdit", false);

      _this.registerTableOption("groupHeader", false); //header generation function


      _this.registerTableOption("groupHeaderPrint", null);

      _this.registerTableOption("groupHeaderClipboard", null);

      _this.registerTableOption("groupHeaderHtmlOutput", null);

      _this.registerTableOption("groupHeaderDownload", null);

      _this.registerTableOption("groupToggleElement", "arrow");

      _this.registerTableOption("groupClosedShowCalcs", false); //register table functions


      _this.registerTableFunction("setGroupBy", _this.setGroupBy.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("setGroupValues", _this.setGroupValues.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("setGroupStartOpen", _this.setGroupStartOpen.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("setGroupHeader", _this.setGroupHeader.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("getGroups", _this.userGetGroups.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("getGroupedData", _this.userGetGroupedData.bind(_assertThisInitialized(_this))); //register component functions


      _this.registerComponentFunction("row", "getGroup", _this.rowGetGroup.bind(_assertThisInitialized(_this)));

      return _this;
    } //initialize group configuration


    _createClass(GroupRows, [{
      key: "initialize",
      value: function initialize() {
        if (this.table.options.groupBy) {
          if (this.table.options.groupUpdateOnCellEdit) {
            this.subscribe("cell-value-updated", this.cellUpdated.bind(this));
            this.subscribe("row-data-changed", this.reassignRowToGroup.bind(this), 0);
          }

          this.subscribe("table-built", this.configureGroupSetup.bind(this));
          this.subscribe("row-deleting", this.rowDeleting.bind(this));
          this.subscribe("row-deleted", this.rowsUpdated.bind(this));
          this.subscribe("scroll-horizontal", this.scrollHeaders.bind(this));
          this.subscribe("rows-wipe", this.wipe.bind(this));
          this.subscribe("rows-added", this.rowsUpdated.bind(this));
          this.subscribe("row-moving", this.rowMoving.bind(this));
          this.subscribe("row-adding-index", this.rowAddingIndex.bind(this));
          this.subscribe("rows-sample", this.rowSample.bind(this));
          this.subscribe("render-virtual-fill", this.virtualRenderFill.bind(this));
          this.registerDisplayHandler(this.displayHandler, 20);
          this.initialized = true;
        }
      }
    }, {
      key: "configureGroupSetup",
      value: function configureGroupSetup() {
        var _this2 = this;

        if (this.table.options.groupBy) {
          var groupBy = this.table.options.groupBy,
              startOpen = this.table.options.groupStartOpen,
              groupHeader = this.table.options.groupHeader;
          this.allowedValues = this.table.options.groupValues;

          if (Array.isArray(groupBy) && Array.isArray(groupHeader) && groupBy.length > groupHeader.length) {
            console.warn("Error creating group headers, groupHeader array is shorter than groupBy array");
          }

          this.headerGenerator = [function () {
            return "";
          }];
          this.startOpen = [function () {
            return false;
          }]; //starting state of group

          this.langBind("groups|item", function (langValue, lang) {
            _this2.headerGenerator[0] = function (value, count, data) {
              //header layout function
              return (typeof value === "undefined" ? "" : value) + "<span>(" + count + " " + (count === 1 ? langValue : lang.groups.items) + ")</span>";
            };
          });
          this.groupIDLookups = [];

          if (Array.isArray(groupBy) || groupBy) {
            if (this.table.modExists("columnCalcs") && this.table.options.columnCalcs != "table" && this.table.options.columnCalcs != "both") {
              this.table.modules.columnCalcs.removeCalcs();
            }
          } else {
            if (this.table.modExists("columnCalcs") && this.table.options.columnCalcs != "group") {
              var cols = this.table.columnManager.getRealColumns();
              cols.forEach(function (col) {
                if (col.definition.topCalc) {
                  _this2.table.modules.columnCalcs.initializeTopRow();
                }

                if (col.definition.bottomCalc) {
                  _this2.table.modules.columnCalcs.initializeBottomRow();
                }
              });
            }
          }

          if (!Array.isArray(groupBy)) {
            groupBy = [groupBy];
          }

          groupBy.forEach(function (group, i) {
            var lookupFunc, column;

            if (typeof group == "function") {
              lookupFunc = group;
            } else {
              column = _this2.table.columnManager.getColumnByField(group);

              if (column) {
                lookupFunc = function lookupFunc(data) {
                  return column.getFieldValue(data);
                };
              } else {
                lookupFunc = function lookupFunc(data) {
                  return data[group];
                };
              }
            }

            _this2.groupIDLookups.push({
              field: typeof group === "function" ? false : group,
              func: lookupFunc,
              values: _this2.allowedValues ? _this2.allowedValues[i] : false
            });
          });

          if (startOpen) {
            if (!Array.isArray(startOpen)) {
              startOpen = [startOpen];
            }

            startOpen.forEach(function (level) {
            });
            this.startOpen = startOpen;
          }

          if (groupHeader) {
            this.headerGenerator = Array.isArray(groupHeader) ? groupHeader : [groupHeader];
          }
        }
      }
    }, {
      key: "rowSample",
      value: function rowSample(rows, prevValue) {
        var group = this.getGroups(false)[0];
        prevValue.push(group.getRows(false)[0]);
        return prevValue;
      }
    }, {
      key: "virtualRenderFill",
      value: function virtualRenderFill() {
        var el = this.table.rowManager.tableElement;
        var rows = this.table.rowManager.getVisibleRows();
        rows = rows.filter(function (row) {
          return row.type !== "group";
        });
        el.style.minWidth = !rows.length ? this.table.columnManager.getWidth() + "px" : ""; // if(this.table.options.groupBy){
        // 	if(this.layoutMode() != "fitDataFill" && rowsCount == this.table.modules.groupRows.countGroups()){
        // 		el.style.minWidth = this.table.columnManager.getWidth() + "px";
        // 	}
        // }
      }
    }, {
      key: "rowAddingIndex",
      value: function rowAddingIndex(row, index, top) {
        this.assignRowToGroup(row);
        var groupRows = row.modules.group.rows;

        if (groupRows.length > 1) {
          if (!index || index && groupRows.indexOf(index) == -1) {
            if (top) {
              if (groupRows[0] !== row) {
                index = groupRows[0];
                this.table.rowManager.moveRowInArray(row.modules.group.rows, row, index, !top);
              }
            } else {
              if (groupRows[groupRows.length - 1] !== row) {
                index = groupRows[groupRows.length - 1];
                this.table.rowManager.moveRowInArray(row.modules.group.rows, row, index, !top);
              }
            }
          } else {
            this.table.rowManager.moveRowInArray(row.modules.group.rows, row, index, !top);
          }
        }

        return index;
      }
    }, {
      key: "trackChanges",
      value: function trackChanges() {
        this.dispatch("group-changed");
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////

    }, {
      key: "setGroupBy",
      value: function setGroupBy(groups) {
        this.table.options.groupBy = groups;

        if (!this.initialized) {
          this.initialize();
        } else {
          this.configureGroupSetup();
        }

        this.refreshData();
        this.trackChanges();
      }
    }, {
      key: "setGroupValues",
      value: function setGroupValues(groupValues) {
        this.table.options.groupValues = groupValues;
        this.configureGroupSetup();
        this.refreshData();
        this.trackChanges();
      }
    }, {
      key: "setGroupStartOpen",
      value: function setGroupStartOpen(values) {
        this.table.options.groupStartOpen = values;
        this.configureGroupSetup();

        if (this.table.options.groupBy) {
          this.refreshData();
          this.trackChanges();
        } else {
          console.warn("Grouping Update - cant refresh view, no groups have been set");
        }
      }
    }, {
      key: "setGroupHeader",
      value: function setGroupHeader(values) {
        this.table.options.groupHeader = values;
        this.configureGroupSetup();

        if (this.table.options.groupBy) {
          this.refreshData();
          this.trackChanges();
        } else {
          console.warn("Grouping Update - cant refresh view, no groups have been set");
        }
      }
    }, {
      key: "userGetGroups",
      value: function userGetGroups(values) {
        return this.getGroups(true);
      } // get grouped table data in the same format as getData()

    }, {
      key: "userGetGroupedData",
      value: function userGetGroupedData() {
        return this.table.options.groupBy ? this.getGroupedData() : this.getData();
      } ///////////////////////////////////////
      ///////// Component Functions /////////
      ///////////////////////////////////////

    }, {
      key: "rowGetGroup",
      value: function rowGetGroup(row) {
        return row.modules.group ? row.modules.group.getComponent() : false;
      } ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////

    }, {
      key: "rowMoving",
      value: function rowMoving(from, to, after) {
        if (!after && to instanceof Group) {
          to = this.table.rowManager.prevDisplayRow(from) || to;
        }

        var toGroup = to instanceof Group ? to : to.modules.group;
        var fromGroup = from instanceof Group ? from : from.modules.group;

        if (toGroup === fromGroup) {
          this.table.rowManager.moveRowInArray(toGroup.rows, from, to, after);
        } else {
          if (fromGroup) {
            fromGroup.removeRow(from);
          }

          toGroup.insertRow(from, to, after);
        }
      }
    }, {
      key: "rowDeleting",
      value: function rowDeleting(row) {
        //remove from group
        if (row.modules.group) {
          row.modules.group.removeRow(row);
        }
      }
    }, {
      key: "rowsUpdated",
      value: function rowsUpdated(row) {
        this.updateGroupRows(true);
      }
    }, {
      key: "cellUpdated",
      value: function cellUpdated(cell) {
        this.reassignRowToGroup(cell.row);
      }
    }, {
      key: "setDisplayIndex",
      value: function setDisplayIndex(index) {
        this.displayIndex = index;
      }
    }, {
      key: "getDisplayIndex",
      value: function getDisplayIndex() {
        return this.displayIndex;
      } //return appropriate rows with group headers

    }, {
      key: "getRows",
      value: function getRows(rows) {
        if (this.table.options.groupBy && this.groupIDLookups.length) {
          this.dispatchExternal("dataGrouping");
          this.generateGroups(rows);

          if (this.subscribedExternal("dataGrouped")) {
            this.dispatchExternal("dataGrouped", this.getGroups(true));
          }

          return this.updateGroupRows();
        } else {
          return rows.slice(0);
        }
      }
    }, {
      key: "getGroups",
      value: function getGroups(component) {
        var groupComponents = [];
        this.groupList.forEach(function (group) {
          groupComponents.push(component ? group.getComponent() : group);
        });
        return groupComponents;
      }
    }, {
      key: "getChildGroups",
      value: function getChildGroups(group) {
        var _this3 = this;

        var groupComponents = [];

        if (!group) {
          group = this;
        }

        group.groupList.forEach(function (child) {
          if (child.groupList.length) {
            groupComponents = groupComponents.concat(_this3.getChildGroups(child));
          } else {
            groupComponents.push(child);
          }
        });
        return groupComponents;
      }
    }, {
      key: "wipe",
      value: function wipe() {
        this.groupList.forEach(function (group) {
          group.wipe();
        });
      }
    }, {
      key: "pullGroupListData",
      value: function pullGroupListData(groupList) {
        var _this4 = this;

        var groupListData = [];
        groupList.forEach(function (group) {
          var groupHeader = {};
          groupHeader.level = 0;
          groupHeader.rowCount = 0;
          groupHeader.headerContent = "";
          var childData = [];

          if (group.hasSubGroups) {
            childData = _this4.pullGroupListData(group.groupList);
            groupHeader.level = group.level;
            groupHeader.rowCount = childData.length - group.groupList.length; // data length minus number of sub-headers

            groupHeader.headerContent = group.generator(group.key, groupHeader.rowCount, group.rows, group);
            groupListData.push(groupHeader);
            groupListData = groupListData.concat(childData);
          } else {
            groupHeader.level = group.level;
            groupHeader.headerContent = group.generator(group.key, group.rows.length, group.rows, group);
            groupHeader.rowCount = group.getRows().length;
            groupListData.push(groupHeader);
            group.getRows().forEach(function (row) {
              groupListData.push(row.getData("data"));
            });
          }
        });
        return groupListData;
      }
    }, {
      key: "getGroupedData",
      value: function getGroupedData() {
        return this.pullGroupListData(this.groupList);
      }
    }, {
      key: "getRowGroup",
      value: function getRowGroup(row) {
        var match = false;

        if (this.options("dataTree")) {
          row = this.table.modules.dataTree.getTreeParentRoot(row);
        }

        this.groupList.forEach(function (group) {
          var result = group.getRowGroup(row);

          if (result) {
            match = result;
          }
        });
        return match;
      }
    }, {
      key: "countGroups",
      value: function countGroups() {
        return this.groupList.length;
      }
    }, {
      key: "generateGroups",
      value: function generateGroups(rows) {
        var _this5 = this;

        var oldGroups = this.groups;
        this.groups = {};
        this.groupList = [];

        if (this.allowedValues && this.allowedValues[0]) {
          this.allowedValues[0].forEach(function (value) {
            _this5.createGroup(value, 0, oldGroups);
          });
          rows.forEach(function (row) {
            _this5.assignRowToExistingGroup(row, oldGroups);
          });
        } else {
          rows.forEach(function (row) {
            _this5.assignRowToGroup(row, oldGroups);
          });
        }
      }
    }, {
      key: "createGroup",
      value: function createGroup(groupID, level, oldGroups) {
        var groupKey = level + "_" + groupID,
            group;
        oldGroups = oldGroups || [];
        group = new Group(this, false, level, groupID, this.groupIDLookups[0].field, this.headerGenerator[0], oldGroups[groupKey]);
        this.groups[groupKey] = group;
        this.groupList.push(group);
      }
    }, {
      key: "assignRowToExistingGroup",
      value: function assignRowToExistingGroup(row, oldGroups) {
        var groupID = this.groupIDLookups[0].func(row.getData()),
            groupKey = "0_" + groupID;

        if (this.groups[groupKey]) {
          this.groups[groupKey].addRow(row);
        }
      }
    }, {
      key: "assignRowToGroup",
      value: function assignRowToGroup(row, oldGroups) {
        var groupID = this.groupIDLookups[0].func(row.getData()),
            newGroupNeeded = !this.groups["0_" + groupID];

        if (newGroupNeeded) {
          this.createGroup(groupID, 0, oldGroups);
        }

        this.groups["0_" + groupID].addRow(row);
        return !newGroupNeeded;
      }
    }, {
      key: "reassignRowToGroup",
      value: function reassignRowToGroup(row) {
        if (row.type === "row") {
          var oldRowGroup = row.modules.group,
              oldGroupPath = oldRowGroup.getPath(),
              newGroupPath = this.getExpectedPath(row),
              samePath = true; // figure out if new group path is the same as old group path

          var samePath = oldGroupPath.length == newGroupPath.length && oldGroupPath.every(function (element, index) {
            return element === newGroupPath[index];
          }); // refresh if they new path and old path aren't the same (aka the row's groupings have changed)

          if (!samePath) {
            oldRowGroup.removeRow(row);
            this.assignRowToGroup(row, this.groups);
            this.refreshData(true);
          }
        }
      }
    }, {
      key: "getExpectedPath",
      value: function getExpectedPath(row) {
        var groupPath = [],
            rowData = row.getData();
        this.groupIDLookups.forEach(function (groupId) {
          groupPath.push(groupId.func(rowData));
        });
        return groupPath;
      }
    }, {
      key: "updateGroupRows",
      value: function updateGroupRows(force) {
        var output = [];
        this.groupList.forEach(function (group) {
          output = output.concat(group.getHeadersAndRows());
        });

        if (force) {
          this.refreshData(true, this.displayHandler);
        }

        return output;
      }
    }, {
      key: "scrollHeaders",
      value: function scrollHeaders(left) {
        if (this.table.options.renderHorizontal === "virtual") {
          left -= this.table.columnManager.renderer.vDomPadLeft;
        }

        left = left + "px";
        this.groupList.forEach(function (group) {
          group.scrollHeader(left);
        });
      }
    }, {
      key: "removeGroup",
      value: function removeGroup(group) {
        var groupKey = group.level + "_" + group.key,
            index;

        if (this.groups[groupKey]) {
          delete this.groups[groupKey];
          index = this.groupList.indexOf(group);

          if (index > -1) {
            this.groupList.splice(index, 1);
          }
        }
      }
    }]);

    return GroupRows;
  }(Module);

  GroupRows.moduleName = "groupRows";

  var defaultUndoers = {
    cellEdit: function cellEdit(action) {
      action.component.setValueProcessData(action.data.oldValue);
      action.component.cellRendered();
    },
    rowAdd: function rowAdd(action) {
      action.component.deleteActual();
    },
    rowDelete: function rowDelete(action) {
      var newRow = this.table.rowManager.addRowActual(action.data.data, action.data.pos, action.data.index);

      if (this.table.options.groupBy && this.table.modExists("groupRows")) {
        this.table.modules.groupRows.updateGroupRows(true);
      }

      this._rebindRow(action.component, newRow);
    },
    rowMove: function rowMove(action) {
      this.table.rowManager.moveRowActual(action.component, this.table.rowManager.rows[action.data.posFrom], !action.data.after);
      this.table.rowManager.redraw();
    }
  };

  var defaultRedoers = {
    cellEdit: function cellEdit(action) {
      action.component.setValueProcessData(action.data.newValue);
      action.component.cellRendered();
    },
    rowAdd: function rowAdd(action) {
      var newRow = this.table.rowManager.addRowActual(action.data.data, action.data.pos, action.data.index);

      if (this.table.options.groupBy && this.table.modExists("groupRows")) {
        this.table.modules.groupRows.updateGroupRows(true);
      }

      this._rebindRow(action.component, newRow);
    },
    rowDelete: function rowDelete(action) {
      action.component.deleteActual();
    },
    rowMove: function rowMove(action) {
      this.table.rowManager.moveRowActual(action.component, this.table.rowManager.rows[action.data.posTo], action.data.after);
      this.table.rowManager.redraw();
    }
  };

  var History = /*#__PURE__*/function (_Module) {
    _inherits(History, _Module);

    var _super = _createSuper(History);

    function History(table) {
      var _this;

      _classCallCheck(this, History);

      _this = _super.call(this, table);
      _this.history = [];
      _this.index = -1;

      _this.registerTableOption("history", false); //enable edit history


      return _this;
    }

    _createClass(History, [{
      key: "initialize",
      value: function initialize() {
        if (this.table.options.history) {
          this.subscribe("cell-value-updated", this.cellUpdated.bind(this));
          this.subscribe("cell-delete", this.clearComponentHistory.bind(this));
          this.subscribe("row-delete", this.rowDeleted.bind(this));
          this.subscribe("rows-wipe", this.clear.bind(this));
          this.subscribe("row-added", this.rowAdded.bind(this));
          this.subscribe("row-move", this.rowMoved.bind(this));
        }

        this.registerTableFunction("undo", this.undo.bind(this));
        this.registerTableFunction("redo", this.redo.bind(this));
        this.registerTableFunction("getHistoryUndoSize", this.getHistoryUndoSize.bind(this));
        this.registerTableFunction("getHistoryRedoSize", this.getHistoryRedoSize.bind(this));
        this.registerTableFunction("clearHistory", this.clear.bind(this));
      }
    }, {
      key: "rowMoved",
      value: function rowMoved(from, to, after) {
        this.action("rowMove", from, {
          posFrom: this.table.rowManager.getRowPosition(from),
          posTo: this.table.rowManager.getRowPosition(to),
          to: to,
          after: after
        });
      }
    }, {
      key: "rowAdded",
      value: function rowAdded(row, data, pos, index) {
        this.action("rowAdd", row, {
          data: data,
          pos: pos,
          index: index
        });
      }
    }, {
      key: "rowDeleted",
      value: function rowDeleted(row) {
        var index, rows;

        if (this.table.options.groupBy) {
          rows = row.getComponent().getGroup().rows;
          index = rows.indexOf(row);

          if (index) {
            index = rows[index - 1];
          }
        } else {
          index = row.table.rowManager.getRowIndex(row);

          if (index) {
            index = row.table.rowManager.rows[index - 1];
          }
        }

        this.action("rowDelete", row, {
          data: row.getData(),
          pos: !index,
          index: index
        });
      }
    }, {
      key: "cellUpdated",
      value: function cellUpdated(cell) {
        this.action("cellEdit", cell, {
          oldValue: cell.oldValue,
          newValue: cell.value
        });
      }
    }, {
      key: "clear",
      value: function clear() {
        this.history = [];
        this.index = -1;
      }
    }, {
      key: "action",
      value: function action(type, component, data) {
        this.history = this.history.slice(0, this.index + 1);
        this.history.push({
          type: type,
          component: component,
          data: data
        });
        this.index++;
      }
    }, {
      key: "getHistoryUndoSize",
      value: function getHistoryUndoSize() {
        return this.index + 1;
      }
    }, {
      key: "getHistoryRedoSize",
      value: function getHistoryRedoSize() {
        return this.history.length - (this.index + 1);
      }
    }, {
      key: "clearComponentHistory",
      value: function clearComponentHistory(component) {
        var index = this.history.findIndex(function (item) {
          return item.component === component;
        });

        if (index > -1) {
          this.history.splice(index, 1);

          if (index <= this.index) {
            this.index--;
          }

          this.clearComponentHistory(component);
        }
      }
    }, {
      key: "undo",
      value: function undo() {
        if (this.index > -1) {
          var action = this.history[this.index];
          History.undoers[action.type].call(this, action);
          this.index--;
          this.dispatchExternal("historyUndo", action.type, action.component.getComponent(), action.data);
          return true;
        } else {
          console.warn("History Undo Error - No more history to undo");
          return false;
        }
      }
    }, {
      key: "redo",
      value: function redo() {
        if (this.history.length - 1 > this.index) {
          this.index++;
          var action = this.history[this.index];
          History.redoers[action.type].call(this, action);
          this.dispatchExternal("historyRedo", action.type, action.component.getComponent(), action.data);
          return true;
        } else {
          console.warn("History Redo Error - No more history to redo");
          return false;
        }
      } //rebind rows to new element after deletion

    }, {
      key: "_rebindRow",
      value: function _rebindRow(oldRow, newRow) {
        this.history.forEach(function (action) {
          if (action.component instanceof Row) {
            if (action.component === oldRow) {
              action.component = newRow;
            }
          } else if (action.component instanceof Cell) {
            if (action.component.row === oldRow) {
              var field = action.component.column.getField();

              if (field) {
                action.component = newRow.getCell(field);
              }
            }
          }
        });
      }
    }]);

    return History;
  }(Module);

  History.moduleName = "history"; //load defaults

  History.undoers = defaultUndoers;
  History.redoers = defaultRedoers;

  var HtmlTableImport = /*#__PURE__*/function (_Module) {
    _inherits(HtmlTableImport, _Module);

    var _super = _createSuper(HtmlTableImport);

    function HtmlTableImport(table) {
      var _this;

      _classCallCheck(this, HtmlTableImport);

      _this = _super.call(this, table);
      _this.fieldIndex = [];
      _this.hasIndex = false;
      return _this;
    }

    _createClass(HtmlTableImport, [{
      key: "initialize",
      value: function initialize() {
        this.tableElementCheck();
      }
    }, {
      key: "tableElementCheck",
      value: function tableElementCheck() {
        if (this.table.originalElement && this.table.originalElement.tagName === "TABLE") {
          if (this.table.originalElement.childNodes.length) {
            this.parseTable();
          } else {
            console.warn("Unable to parse data from empty table tag, Tabulator should be initialized on a div tag unless importing data from a table element.");
          }
        }
      }
    }, {
      key: "parseTable",
      value: function parseTable() {
        var element = this.table.originalElement,
            options = this.table.options,
            columns = options.columns,
            headers = element.getElementsByTagName("th"),
            rows = element.getElementsByTagName("tbody")[0],
            data = [];
        this.hasIndex = false;
        this.dispatchExternal("htmlImporting");
        rows = rows ? rows.getElementsByTagName("tr") : []; //check for Tabulator inline options

        this._extractOptions(element, options);

        if (headers.length) {
          this._extractHeaders(headers, rows);
        } else {
          this._generateBlankHeaders(headers, rows);
        } //iterate through table rows and build data set


        for (var index = 0; index < rows.length; index++) {
          var row = rows[index],
              cells = row.getElementsByTagName("td"),
              item = {}; //create index if the dont exist in table

          if (!this.hasIndex) {
            item[options.index] = index;
          }

          for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];

            if (typeof this.fieldIndex[i] !== "undefined") {
              item[this.fieldIndex[i]] = cell.innerHTML;
            }
          } //add row data to item


          data.push(item);
        }

        options.data = data;
        this.dispatchExternal("htmlImported");
      } //extract tabulator attribute options

    }, {
      key: "_extractOptions",
      value: function _extractOptions(element, options, defaultOptions) {
        var attributes = element.attributes;
        var optionsArr = defaultOptions ? Object.keys(defaultOptions) : Object.keys(options);
        var optionsList = {};
        optionsArr.forEach(function (item) {
          optionsList[item.toLowerCase()] = item;
        });

        for (var index in attributes) {
          var attrib = attributes[index];
          var name;

          if (attrib && _typeof(attrib) == "object" && attrib.name && attrib.name.indexOf("tabulator-") === 0) {
            name = attrib.name.replace("tabulator-", "");

            if (typeof optionsList[name] !== "undefined") {
              options[optionsList[name]] = this._attribValue(attrib.value);
            }
          }
        }
      } //get value of attribute

    }, {
      key: "_attribValue",
      value: function _attribValue(value) {
        if (value === "true") {
          return true;
        }

        if (value === "false") {
          return false;
        }

        return value;
      } //find column if it has already been defined

    }, {
      key: "_findCol",
      value: function _findCol(title) {
        var match = this.table.options.columns.find(function (column) {
          return column.title === title;
        });
        return match || false;
      } //extract column from headers

    }, {
      key: "_extractHeaders",
      value: function _extractHeaders(headers, rows) {
        for (var index = 0; index < headers.length; index++) {
          var header = headers[index],
              exists = false,
              col = this._findCol(header.textContent),
              width;

          if (col) {
            exists = true;
          } else {
            col = {
              title: header.textContent.trim()
            };
          }

          if (!col.field) {
            col.field = header.textContent.trim().toLowerCase().replace(" ", "_");
          }

          width = header.getAttribute("width");

          if (width && !col.width) {
            col.width = width;
          } //check for Tabulator inline options


          this._extractOptions(header, col, this.table.columnManager.optionsList.registeredDefaults);

          this.fieldIndex[index] = col.field;

          if (col.field == this.table.options.index) {
            this.hasIndex = true;
          }

          if (!exists) {
            this.table.options.columns.push(col);
          }
        }
      } //generate blank headers

    }, {
      key: "_generateBlankHeaders",
      value: function _generateBlankHeaders(headers, rows) {
        for (var index = 0; index < headers.length; index++) {
          var header = headers[index],
              col = {
            title: "",
            field: "col" + index
          };
          this.fieldIndex[index] = col.field;
          var width = header.getAttribute("width");

          if (width) {
            col.width = width;
          }

          this.table.options.columns.push(col);
        }
      }
    }]);

    return HtmlTableImport;
  }(Module);

  HtmlTableImport.moduleName = "htmlTableImport";

  function csvImporter(input) {
    var data = [],
        row = 0,
        col = 0,
        inQuote = false; //Iterate over each character

    for (var index = 0; index < input.length; index++) {
      var _char = input[index],
          nextChar = input[index + 1]; //Initialize empty row

      if (!data[row]) {
        data[row] = [];
      } //Initialize empty column


      if (!data[row][col]) {
        data[row][col] = "";
      } //Handle quotation mark inside string


      if (_char == '"' && inQuote && nextChar == '"') {
        data[row][col] += _char;
        index++;
        continue;
      } //Begin / End Quote


      if (_char == '"') {
        inQuote = !inQuote;
        continue;
      } //Next column (if not in quote)


      if (_char == ',' && !inQuote) {
        col++;
        continue;
      } //New row if new line and not in quote (CRLF) 


      if (_char == '\r' && nextChar == '\n' && !inQuote) {
        col = 0;
        row++;
        index++;
        continue;
      } //New row if new line and not in quote (CR or LF) 


      if ((_char == '\r' || _char == '\n') && !inQuote) {
        col = 0;
        row++;
        continue;
      } //Normal Character, append to column


      data[row][col] += _char;
    }

    return data;
  }

  function json$1 (input) {
    try {
      return JSON.parse(input);
    } catch (e) {
      console.warn("JSON Import Error - File contents is invalid JSON", e);
      return Promise.reject();
    }
  }

  var defaultImporters = {
    csv: csvImporter,
    json: json$1
  };

  var Import = /*#__PURE__*/function (_Module) {
    _inherits(Import, _Module);

    var _super = _createSuper(Import);

    function Import(table) {
      var _this;

      _classCallCheck(this, Import);

      _this = _super.call(this, table);

      _this.registerTableOption("importFormat");

      _this.registerTableOption("importReader", "text");

      return _this;
    }

    _createClass(Import, [{
      key: "initialize",
      value: function initialize() {
        this.registerTableFunction("import", this.importFromFile.bind(this));

        if (this.table.options.importFormat) {
          this.subscribe("data-loading", this.loadDataCheck.bind(this), 10);
          this.subscribe("data-load", this.loadData.bind(this), 10);
        }
      }
    }, {
      key: "loadDataCheck",
      value: function loadDataCheck(data) {
        return typeof data === "string";
      }
    }, {
      key: "loadData",
      value: function loadData(data, params, config, silent, previousData) {
        return this.importData(this.lookupImporter(), data).then(this.structureData.bind(this))["catch"](function (err) {
          console.error("Import Error:", err || "Unable to import data");
          return Promise.reject(err);
        });
      }
    }, {
      key: "lookupImporter",
      value: function lookupImporter(importFormat) {
        var importer;

        if (!importFormat) {
          importFormat = this.table.options.importFormat;
        }

        if (typeof importFormat === "string") {
          importer = Import.importers[importFormat];
        } else {
          importer = importFormat;
        }

        if (!importer) {
          console.error("Import Error - Importer not found:", importFormat);
        }

        return importer;
      }
    }, {
      key: "importFromFile",
      value: function importFromFile(importFormat, extension) {
        var importer = this.lookupImporter(importFormat);

        if (importer) {
          return this.pickFile(extension).then(this.importData.bind(this, importer)).then(this.structureData.bind(this)).then(this.setData.bind(this))["catch"](function (err) {
            console.error("Import Error:", err || "Unable to import file");
            return Promise.reject(err);
          });
        }
      }
    }, {
      key: "pickFile",
      value: function pickFile(extensions) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          var input = document.createElement("input");
          input.type = "file";
          input.accept = extensions;
          input.addEventListener("change", function (e) {
            var file = input.files[0],
                reader = new FileReader();

            switch (_this2.table.options.importReader) {
              case "buffer":
                reader.readAsArrayBuffer(file);
                break;

              case "binary":
                reader.readAsBinaryString(file);
                break;

              case "url":
                reader.readAsDataURL(file);
                break;

              case "text":
              default:
                reader.readAsText(file);
            }

            reader.onload = function (e) {
              resolve(reader.result);
            };

            reader.onerror = function (e) {
              console.warn("File Load Error - Unable to read file");
              reject();
            };
          });
          input.click();
        });
      }
    }, {
      key: "importData",
      value: function importData(importer, fileContents) {
        var data = importer.call(this.table, fileContents);

        if (data instanceof Promise) {
          return data;
        } else {
          return data ? Promise.resolve(data) : Promise.reject();
        }
      }
    }, {
      key: "structureData",
      value: function structureData(parsedData) {
        var data = [];

        if (Array.isArray(parsedData) && parsedData.length && Array.isArray(parsedData[0])) {
          if (this.table.options.autoColumns) {
            data = this.structureArrayToObject(parsedData);
          } else {
            data = this.structureArrayToColumns(parsedData);
          }

          return data;
        } else {
          return parsedData;
        }
      }
    }, {
      key: "structureArrayToObject",
      value: function structureArrayToObject(parsedData) {
        var columns = parsedData.shift();
        var data = parsedData.map(function (values) {
          var row = {};
          columns.forEach(function (key, i) {
            row[key] = values[i];
          });
          return row;
        });
        return data;
      }
    }, {
      key: "structureArrayToColumns",
      value: function structureArrayToColumns(parsedData) {
        var data = [],
            columns = this.table.getColumns(); //remove first row if it is the column names

        if (columns[0] && parsedData[0][0]) {
          if (columns[0].getDefinition().title === parsedData[0][0]) {
            parsedData.shift();
          }
        } //convert row arrays to objects


        parsedData.forEach(function (rowData) {
          var row = {};
          rowData.forEach(function (value, index) {
            var column = columns[index];

            if (column) {
              row[column.getField()] = value;
            }
          });
          data.push(row);
        });
        return data;
      }
    }, {
      key: "setData",
      value: function setData(data) {
        return this.table.setData(data);
      }
    }]);

    return Import;
  }(Module);

  Import.moduleName = "import"; //load defaults

  Import.importers = defaultImporters;

  var Interaction = /*#__PURE__*/function (_Module) {
    _inherits(Interaction, _Module);

    var _super = _createSuper(Interaction);

    function Interaction(table) {
      var _this;

      _classCallCheck(this, Interaction);

      _this = _super.call(this, table);
      _this.eventMap = {
        //row events
        rowClick: "row-click",
        rowDblClick: "row-dblclick",
        rowContext: "row-contextmenu",
        rowMouseEnter: "row-mouseenter",
        rowMouseLeave: "row-mouseleave",
        rowMouseOver: "row-mouseover",
        rowMouseOut: "row-mouseout",
        rowMouseMove: "row-mousemove",
        rowTap: "row",
        rowDblTap: "row",
        rowTapHold: "row",
        //cell events
        cellClick: "cell-click",
        cellDblClick: "cell-dblclick",
        cellContext: "cell-contextmenu",
        cellMouseEnter: "cell-mouseenter",
        cellMouseLeave: "cell-mouseleave",
        cellMouseOver: "cell-mouseover",
        cellMouseOut: "cell-mouseout",
        cellMouseMove: "cell-mousemove",
        cellTap: "cell",
        cellDblTap: "cell",
        cellTapHold: "cell",
        //column header events
        headerClick: "column-click",
        headerDblClick: "column-dblclick",
        headerContext: "column-contextmenu",
        headerMouseEnter: "column-mouseenter",
        headerMouseLeave: "column-mouseleave",
        headerMouseOver: "column-mouseover",
        headerMouseOut: "column-mouseout",
        headerMouseMove: "column-mousemove",
        headerTap: "column",
        headerDblTap: "column",
        headerTapHold: "column",
        //group header
        groupClick: "group-click",
        groupDblClick: "group-dblclick",
        groupContext: "group-contextmenu",
        groupMouseEnter: "group-mouseenter",
        groupMouseLeave: "group-mouseleave",
        groupMouseOver: "group-mouseover",
        groupMouseOut: "group-mouseout",
        groupMouseMove: "group-mousemove",
        groupTap: "group",
        groupDblTap: "group",
        groupTapHold: "group"
      };
      _this.subscribers = {};
      _this.touchSubscribers = {};
      _this.columnSubscribers = {};
      _this.touchWatchers = {
        row: {
          tap: null,
          tapDbl: null,
          tapHold: null
        },
        cell: {
          tap: null,
          tapDbl: null,
          tapHold: null
        },
        column: {
          tap: null,
          tapDbl: null,
          tapHold: null
        },
        group: {
          tap: null,
          tapDbl: null,
          tapHold: null
        }
      };

      _this.registerColumnOption("headerClick");

      _this.registerColumnOption("headerDblClick");

      _this.registerColumnOption("headerContext");

      _this.registerColumnOption("headerMouseEnter");

      _this.registerColumnOption("headerMouseLeave");

      _this.registerColumnOption("headerMouseOver");

      _this.registerColumnOption("headerMouseOut");

      _this.registerColumnOption("headerMouseMove");

      _this.registerColumnOption("headerTap");

      _this.registerColumnOption("headerDblTap");

      _this.registerColumnOption("headerTapHold");

      _this.registerColumnOption("cellClick");

      _this.registerColumnOption("cellDblClick");

      _this.registerColumnOption("cellContext");

      _this.registerColumnOption("cellMouseEnter");

      _this.registerColumnOption("cellMouseLeave");

      _this.registerColumnOption("cellMouseOver");

      _this.registerColumnOption("cellMouseOut");

      _this.registerColumnOption("cellMouseMove");

      _this.registerColumnOption("cellTap");

      _this.registerColumnOption("cellDblTap");

      _this.registerColumnOption("cellTapHold");

      return _this;
    }

    _createClass(Interaction, [{
      key: "initialize",
      value: function initialize() {
        this.initializeExternalEvents();
        this.subscribe("column-init", this.initializeColumn.bind(this));
        this.subscribe("cell-dblclick", this.cellContentsSelectionFixer.bind(this));
      }
    }, {
      key: "cellContentsSelectionFixer",
      value: function cellContentsSelectionFixer(e, cell) {
        if (this.table.modExists("edit")) {
          if (this.table.modules.edit.currentCell === this) {
            return; //prevent instant selection of editor content
          }
        }

        e.preventDefault();

        try {
          if (document.selection) {
            // IE
            var range = document.body.createTextRange();
            range.moveToElementText(this.element);
            range.select();
          } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(this.element);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
          }
        } catch (e) {}
      }
    }, {
      key: "initializeExternalEvents",
      value: function initializeExternalEvents() {
        for (var key in this.eventMap) {
          this.subscriptionChangeExternal(key, this.subscriptionChanged.bind(this, key));
        }
      }
    }, {
      key: "subscriptionChanged",
      value: function subscriptionChanged(key, added) {

        if (added) {
          if (!this.subscribers[key]) {
            if (this.eventMap[key].includes("-")) {
              this.subscribers[key] = this.handle.bind(this, key);
              this.subscribe(this.eventMap[key], this.subscribers[key]);
            } else {
              this.subscribeTouchEvents(key);
            }
          }
        } else {
          if (this.eventMap[key].includes("-")) {
            if (this.subscribers[key] && !this.columnSubscribers[key] && !this.subscribedExternal(key)) {
              this.unsubscribe(this.eventMap[key], this.subscribers[key]);
              delete this.subscribers[key];
            }
          } else {
            this.unsubscribeTouchEvents(key);
          }
        }
      }
    }, {
      key: "subscribeTouchEvents",
      value: function subscribeTouchEvents(key) {
        var type = this.eventMap[key];

        if (!this.touchSubscribers[type + "-touchstart"]) {
          this.touchSubscribers[type + "-touchstart"] = this.handleTouch.bind(this, type, "start");
          this.touchSubscribers[type + "-touchend"] = this.handleTouch.bind(this, type, "end");
          this.subscribe(type + "-touchstart", this.touchSubscribers[type + "-touchstart"]);
          this.subscribe(type + "-touchend", this.touchSubscribers[type + "-touchend"]);
        }

        this.subscribers[key] = true;
      }
    }, {
      key: "unsubscribeTouchEvents",
      value: function unsubscribeTouchEvents(key) {
        var notouch = true,
            type = this.eventMap[key];

        if (this.subscribers[key] && !this.subscribedExternal(key)) {
          delete this.subscribers[key];

          for (var i in this.eventMap) {
            if (this.eventMap[i] === type) {
              if (this.subscribers[i]) {
                notouch = false;
              }
            }
          }

          if (notouch) {
            this.unsubscribe(type + "-touchstart", this.touchSubscribers[type + "-touchstart"]);
            this.unsubscribe(type + "-touchend", this.touchSubscribers[type + "-touchend"]);
            delete this.touchSubscribers[type + "-touchstart"];
            delete this.touchSubscribers[type + "-touchend"];
          }
        }
      }
    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var def = column.definition;

        for (var key in this.eventMap) {
          if (def[key]) {
            this.subscriptionChanged(key, true);

            if (!this.columnSubscribers[key]) {
              this.columnSubscribers[key] = [];
            }

            this.columnSubscribers[key].push(column);
          }
        }
      }
    }, {
      key: "handle",
      value: function handle(action, e, component) {
        this.dispatchEvent(action, e, component);
      }
    }, {
      key: "handleTouch",
      value: function handleTouch(type, action, e, component) {
        var _this2 = this;

        var watchers = this.touchWatchers[type];

        if (type === "column") {
          type = "header";
        }

        switch (action) {
          case "start":
            watchers.tap = true;
            clearTimeout(watchers.tapHold);
            watchers.tapHold = setTimeout(function () {
              clearTimeout(watchers.tapHold);
              watchers.tapHold = null;
              watchers.tap = null;
              clearTimeout(watchers.tapDbl);
              watchers.tapDbl = null;

              _this2.dispatchEvent(type + "TapHold", e, component);
            }, 1000);
            break;

          case "end":
            if (watchers.tap) {
              watchers.tap = null;
              this.dispatchEvent(type + "Tap", e, component);
            }

            if (watchers.tapDbl) {
              clearTimeout(watchers.tapDbl);
              watchers.tapDbl = null;
              this.dispatchEvent(type + "DblTap", e, component);
            } else {
              watchers.tapDbl = setTimeout(function () {
                clearTimeout(watchers.tapDbl);
                watchers.tapDbl = null;
              }, 300);
            }

            clearTimeout(watchers.tapHold);
            watchers.tapHold = null;
            break;
        }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(action, e, component) {
        var componentObj = component.getComponent(),
            callback;

        if (this.columnSubscribers[action]) {
          if (component instanceof Cell) {
            callback = component.column.definition[action];
          } else if (component instanceof Column) {
            callback = component.definition[action];
          }

          if (callback) {
            callback(e, componentObj);
          }
        }

        this.dispatchExternal(action, e, componentObj);
      }
    }]);

    return Interaction;
  }(Module);

  Interaction.moduleName = "interaction";

  var defaultBindings = {
    navPrev: "shift + 9",
    navNext: 9,
    navUp: 38,
    navDown: 40,
    scrollPageUp: 33,
    scrollPageDown: 34,
    scrollToStart: 36,
    scrollToEnd: 35,
    undo: ["ctrl + 90", "meta + 90"],
    redo: ["ctrl + 89", "meta + 89"],
    copyToClipboard: ["ctrl + 67", "meta + 89"]
  };

  var defaultActions = {
    keyBlock: function keyBlock(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    scrollPageUp: function scrollPageUp(e) {
      var rowManager = this.table.rowManager,
          newPos = rowManager.scrollTop - rowManager.element.clientHeight,
          scrollMax = rowManager.element.scrollHeight;
      e.preventDefault();

      if (rowManager.displayRowsCount) {
        if (newPos >= 0) {
          rowManager.element.scrollTop = newPos;
        } else {
          rowManager.scrollToRow(rowManager.getDisplayRows()[0]);
        }
      }

      this.table.element.focus();
    },
    scrollPageDown: function scrollPageDown(e) {
      var rowManager = this.table.rowManager,
          newPos = rowManager.scrollTop + rowManager.element.clientHeight,
          scrollMax = rowManager.element.scrollHeight;
      e.preventDefault();

      if (rowManager.displayRowsCount) {
        if (newPos <= scrollMax) {
          rowManager.element.scrollTop = newPos;
        } else {
          rowManager.scrollToRow(rowManager.getDisplayRows()[rowManager.displayRowsCount - 1]);
        }
      }

      this.table.element.focus();
    },
    scrollToStart: function scrollToStart(e) {
      var rowManager = this.table.rowManager;
      e.preventDefault();

      if (rowManager.displayRowsCount) {
        rowManager.scrollToRow(rowManager.getDisplayRows()[0]);
      }

      this.table.element.focus();
    },
    scrollToEnd: function scrollToEnd(e) {
      var rowManager = this.table.rowManager;
      e.preventDefault();

      if (rowManager.displayRowsCount) {
        rowManager.scrollToRow(rowManager.getDisplayRows()[rowManager.displayRowsCount - 1]);
      }

      this.table.element.focus();
    },
    navPrev: function navPrev(e) {
      this.dispatch("keybinding-nav-prev", e);
    },
    navNext: function navNext(e) {
      this.dispatch("keybinding-nav-next", e);
    },
    navLeft: function navLeft(e) {
      this.dispatch("keybinding-nav-left", e);
    },
    navRight: function navRight(e) {
      this.dispatch("keybinding-nav-right", e);
    },
    navUp: function navUp(e) {
      this.dispatch("keybinding-nav-up", e);
    },
    navDown: function navDown(e) {
      this.dispatch("keybinding-nav-down", e);
    },
    undo: function undo(e) {
      var cell = false;

      if (this.table.options.history && this.table.modExists("history") && this.table.modExists("edit")) {
        cell = this.table.modules.edit.currentCell;

        if (!cell) {
          e.preventDefault();
          this.table.modules.history.undo();
        }
      }
    },
    redo: function redo(e) {
      var cell = false;

      if (this.table.options.history && this.table.modExists("history") && this.table.modExists("edit")) {
        cell = this.table.modules.edit.currentCell;

        if (!cell) {
          e.preventDefault();
          this.table.modules.history.redo();
        }
      }
    },
    copyToClipboard: function copyToClipboard(e) {
      if (!this.table.modules.edit.currentCell) {
        if (this.table.modExists("clipboard", true)) {
          this.table.modules.clipboard.copy(false, true);
        }
      }
    }
  };

  var Keybindings = /*#__PURE__*/function (_Module) {
    _inherits(Keybindings, _Module);

    var _super = _createSuper(Keybindings);

    function Keybindings(table) {
      var _this;

      _classCallCheck(this, Keybindings);

      _this = _super.call(this, table);
      _this.watchKeys = null;
      _this.pressedKeys = null;
      _this.keyupBinding = false;
      _this.keydownBinding = false;

      _this.registerTableOption("keybindings", {}); //array for keybindings


      _this.registerTableOption("tabEndNewRow", false); //create new row when tab to end of table


      return _this;
    }

    _createClass(Keybindings, [{
      key: "initialize",
      value: function initialize() {
        var bindings = this.table.options.keybindings,
            mergedBindings = {};
        this.watchKeys = {};
        this.pressedKeys = [];

        if (bindings !== false) {
          Object.assign(mergedBindings, Keybindings.bindings);
          Object.assign(mergedBindings, bindings);
          this.mapBindings(mergedBindings);
          this.bindEvents();
        }

        this.subscribe("table-destroy", this.clearBindings.bind(this));
      }
    }, {
      key: "mapBindings",
      value: function mapBindings(bindings) {
        var _this2 = this;

        var _loop = function _loop(key) {
          if (Keybindings.actions[key]) {
            if (bindings[key]) {
              if (_typeof(bindings[key]) !== "object") {
                bindings[key] = [bindings[key]];
              }

              bindings[key].forEach(function (binding) {
                var bindingList = Array.isArray(binding) ? binding : [binding];
                bindingList.forEach(function (item) {
                  _this2.mapBinding(key, item);
                });
              });
            }
          } else {
            console.warn("Key Binding Error - no such action:", key);
          }
        };

        for (var key in bindings) {
          _loop(key);
        }
      }
    }, {
      key: "mapBinding",
      value: function mapBinding(action, symbolsList) {
        var _this3 = this;

        var binding = {
          action: Keybindings.actions[action],
          keys: [],
          ctrl: false,
          shift: false,
          meta: false
        };
        var symbols = symbolsList.toString().toLowerCase().split(" ").join("").split("+");
        symbols.forEach(function (symbol) {
          switch (symbol) {
            case "ctrl":
              binding.ctrl = true;
              break;

            case "shift":
              binding.shift = true;
              break;

            case "meta":
              binding.meta = true;
              break;

            default:
              symbol = isNaN(symbol) ? symbol.toUpperCase().charCodeAt(0) : parseInt(symbol);
              binding.keys.push(symbol);

              if (!_this3.watchKeys[symbol]) {
                _this3.watchKeys[symbol] = [];
              }

              _this3.watchKeys[symbol].push(binding);

          }
        });
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        var self = this;

        this.keyupBinding = function (e) {
          var code = e.keyCode;
          var bindings = self.watchKeys[code];

          if (bindings) {
            self.pressedKeys.push(code);
            bindings.forEach(function (binding) {
              self.checkBinding(e, binding);
            });
          }
        };

        this.keydownBinding = function (e) {
          var code = e.keyCode;
          var bindings = self.watchKeys[code];

          if (bindings) {
            var index = self.pressedKeys.indexOf(code);

            if (index > -1) {
              self.pressedKeys.splice(index, 1);
            }
          }
        };

        this.table.element.addEventListener("keydown", this.keyupBinding);
        this.table.element.addEventListener("keyup", this.keydownBinding);
      }
    }, {
      key: "clearBindings",
      value: function clearBindings() {
        if (this.keyupBinding) {
          this.table.element.removeEventListener("keydown", this.keyupBinding);
        }

        if (this.keydownBinding) {
          this.table.element.removeEventListener("keyup", this.keydownBinding);
        }
      }
    }, {
      key: "checkBinding",
      value: function checkBinding(e, binding) {
        var _this4 = this;

        var match = true;

        if (e.ctrlKey == binding.ctrl && e.shiftKey == binding.shift && e.metaKey == binding.meta) {
          binding.keys.forEach(function (key) {
            var index = _this4.pressedKeys.indexOf(key);

            if (index == -1) {
              match = false;
            }
          });

          if (match) {
            binding.action.call(this, e);
          }

          return true;
        }

        return false;
      }
    }]);

    return Keybindings;
  }(Module);

  Keybindings.moduleName = "keybindings"; //load defaults

  Keybindings.bindings = defaultBindings;
  Keybindings.actions = defaultActions;

  var Menu = /*#__PURE__*/function (_Module) {
    _inherits(Menu, _Module);

    var _super = _createSuper(Menu);

    function Menu(table) {
      var _this;

      _classCallCheck(this, Menu);

      _this = _super.call(this, table);
      _this.menuContainer = null;
      _this.nestedMenuBlock = false;
      _this.currentComponent = null;
      _this.rootPopup = null;
      _this.columnSubscribers = {};

      _this.registerTableOption("menuContainer", undefined); //deprecated


      _this.registerTableOption("rowContextMenu", false);

      _this.registerTableOption("rowClickMenu", false);

      _this.registerTableOption("groupContextMenu", false);

      _this.registerTableOption("groupClickMenu", false);

      _this.registerColumnOption("headerContextMenu");

      _this.registerColumnOption("headerClickMenu");

      _this.registerColumnOption("headerMenu");

      _this.registerColumnOption("headerMenuIcon");

      _this.registerColumnOption("contextMenu");

      _this.registerColumnOption("clickMenu");

      return _this;
    }

    _createClass(Menu, [{
      key: "initialize",
      value: function initialize() {
        this.deprecationCheck();
        this.initializeRowWatchers();
        this.initializeGroupWatchers();
        this.subscribe("column-init", this.initializeColumn.bind(this));
      }
    }, {
      key: "deprecationCheck",
      value: function deprecationCheck() {
        if (typeof this.table.options.menuContainer !== "undefined") {
          console.warn("Use of the menuContainer option is now deprecated. Please use the popupContainer option instead");
          this.table.options.popupContainer = this.table.options.menuContainer;
        }
      }
    }, {
      key: "initializeRowWatchers",
      value: function initializeRowWatchers() {
        if (this.table.options.rowContextMenu) {
          this.subscribe("row-contextmenu", this.loadMenuEvent.bind(this, this.table.options.rowContextMenu));
          this.table.on("rowTapHold", this.loadMenuEvent.bind(this, this.table.options.rowContextMenu));
        }

        if (this.table.options.rowClickMenu) {
          this.subscribe("row-click", this.loadMenuEvent.bind(this, this.table.options.rowClickMenu));
        }
      }
    }, {
      key: "initializeGroupWatchers",
      value: function initializeGroupWatchers() {
        if (this.table.options.groupContextMenu) {
          this.subscribe("group-contextmenu", this.loadMenuEvent.bind(this, this.table.options.groupContextMenu));
          this.table.on("groupTapHold", this.loadMenuEvent.bind(this, this.table.options.groupContextMenu));
        }

        if (this.table.options.groupClickMenu) {
          this.subscribe("group-click", this.loadMenuEvent.bind(this, this.table.options.groupClickMenu));
        }
      }
    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var def = column.definition; //handle column events

        if (def.headerContextMenu && !this.columnSubscribers.headerContextMenu) {
          this.columnSubscribers.headerContextMenu = this.loadMenuTableColumnEvent.bind(this, "headerContextMenu");
          this.subscribe("column-contextmenu", this.columnSubscribers.headerContextMenu);
          this.table.on("headerTapHold", this.loadMenuTableColumnEvent.bind(this, "headerContextMenu"));
        }

        if (def.headerClickMenu && !this.columnSubscribers.headerClickMenu) {
          this.columnSubscribers.headerClickMenu = this.loadMenuTableColumnEvent.bind(this, "headerClickMenu");
          this.subscribe("column-click", this.columnSubscribers.headerClickMenu);
        }

        if (def.headerMenu) {
          this.initializeColumnHeaderMenu(column);
        } //handle cell events


        if (def.contextMenu && !this.columnSubscribers.contextMenu) {
          this.columnSubscribers.contextMenu = this.loadMenuTableCellEvent.bind(this, "contextMenu");
          this.subscribe("cell-contextmenu", this.columnSubscribers.contextMenu);
          this.table.on("cellTapHold", this.loadMenuTableCellEvent.bind(this, "contextMenu"));
        }

        if (def.clickMenu && !this.columnSubscribers.clickMenu) {
          this.columnSubscribers.clickMenu = this.loadMenuTableCellEvent.bind(this, "clickMenu");
          this.subscribe("cell-click", this.columnSubscribers.clickMenu);
        }
      }
    }, {
      key: "initializeColumnHeaderMenu",
      value: function initializeColumnHeaderMenu(column) {
        var _this2 = this;

        var icon = column.definition.headerMenuIcon,
            headerMenuEl;
        headerMenuEl = document.createElement("span");
        headerMenuEl.classList.add("tabulator-header-popup-button");

        if (icon) {
          if (typeof icon === "function") {
            icon = icon(column.getComponent());
          }

          if (icon instanceof HTMLElement) {
            headerMenuEl.appendChild(icon);
          } else {
            headerMenuEl.innerHTML = icon;
          }
        } else {
          headerMenuEl.innerHTML = "&vellip;";
        }

        headerMenuEl.addEventListener("click", function (e) {
          e.stopPropagation();
          e.preventDefault();

          _this2.loadMenuEvent(column.definition.headerMenu, e, column);
        });
        column.titleElement.insertBefore(headerMenuEl, column.titleElement.firstChild);
      }
    }, {
      key: "loadMenuTableCellEvent",
      value: function loadMenuTableCellEvent(option, e, cell) {
        if (cell._cell) {
          cell = cell._cell;
        }

        if (cell.column.definition[option]) {
          this.loadMenuEvent(cell.column.definition[option], e, cell);
        }
      }
    }, {
      key: "loadMenuTableColumnEvent",
      value: function loadMenuTableColumnEvent(option, e, column) {
        if (column._column) {
          column = column._column;
        }

        if (column.definition[option]) {
          this.loadMenuEvent(column.definition[option], e, column);
        }
      }
    }, {
      key: "loadMenuEvent",
      value: function loadMenuEvent(menu, e, component) {
        if (component._group) {
          component = component._group;
        } else if (component._row) {
          component = component._row;
        }

        menu = typeof menu == "function" ? menu.call(this.table, e, component.getComponent()) : menu;
        this.loadMenu(e, component, menu);
      }
    }, {
      key: "loadMenu",
      value: function loadMenu(e, component, menu, parentEl, parentPopup) {
        var _this3 = this;

        var touch = !(e instanceof MouseEvent),
            menuEl = document.createElement("div"),
            popup;
        menuEl.classList.add("tabulator-menu");

        if (!touch) {
          e.preventDefault();
        } //abort if no menu set


        if (!menu || !menu.length) {
          return;
        }

        if (!parentEl) {
          if (this.nestedMenuBlock) {
            //abort if child menu already open
            if (this.rootPopup) {
              return;
            }
          } else {
            this.nestedMenuBlock = setTimeout(function () {
              _this3.nestedMenuBlock = false;
            }, 100);
          }

          if (this.rootPopup) {
            this.rootPopup.hide();
          }

          this.rootPopup = popup = this.popup(menuEl);
        } else {
          popup = parentPopup.child(menuEl);
        }

        menu.forEach(function (item) {
          var itemEl = document.createElement("div"),
              label = item.label,
              disabled = item.disabled;

          if (item.separator) {
            itemEl.classList.add("tabulator-menu-separator");
          } else {
            itemEl.classList.add("tabulator-menu-item");

            if (typeof label == "function") {
              label = label.call(_this3.table, component.getComponent());
            }

            if (label instanceof Node) {
              itemEl.appendChild(label);
            } else {
              itemEl.innerHTML = label;
            }

            if (typeof disabled == "function") {
              disabled = disabled.call(_this3.table, component.getComponent());
            }

            if (disabled) {
              itemEl.classList.add("tabulator-menu-item-disabled");
              itemEl.addEventListener("click", function (e) {
                e.stopPropagation();
              });
            } else {
              if (item.menu && item.menu.length) {
                itemEl.addEventListener("click", function (e) {
                  e.stopPropagation();

                  _this3.loadMenu(e, component, item.menu, itemEl, popup);
                });
              } else {
                if (item.action) {
                  itemEl.addEventListener("click", function (e) {
                    item.action(e, component.getComponent());
                  });
                }
              }
            }

            if (item.menu && item.menu.length) {
              itemEl.classList.add("tabulator-menu-item-submenu");
            }
          }

          menuEl.appendChild(itemEl);
        });
        menuEl.addEventListener("click", function (e) {
          _this3.rootPopup.hide();
        });
        popup.show(parentEl || e);

        if (popup === this.rootPopup) {
          this.rootPopup.hideOnBlur(function () {
            _this3.rootPopup = null;

            if (_this3.currentComponent) {
              _this3.dispatchExternal("menuClosed", _this3.currentComponent.getComponent());

              _this3.currentComponent = null;
            }
          });
          this.currentComponent = component;
          this.dispatchExternal("menuOpened", component.getComponent());
        }
      }
    }]);

    return Menu;
  }(Module);

  Menu.moduleName = "menu";

  var MoveColumns = /*#__PURE__*/function (_Module) {
    _inherits(MoveColumns, _Module);

    var _super = _createSuper(MoveColumns);

    function MoveColumns(table) {
      var _this;

      _classCallCheck(this, MoveColumns);

      _this = _super.call(this, table);
      _this.placeholderElement = _this.createPlaceholderElement();
      _this.hoverElement = false; //floating column header element

      _this.checkTimeout = false; //click check timeout holder

      _this.checkPeriod = 250; //period to wait on mousedown to consider this a move and not a click

      _this.moving = false; //currently moving column

      _this.toCol = false; //destination column

      _this.toColAfter = false; //position of moving column relative to the desitnation column

      _this.startX = 0; //starting position within header element

      _this.autoScrollMargin = 40; //auto scroll on edge when within margin

      _this.autoScrollStep = 5; //auto scroll distance in pixels

      _this.autoScrollTimeout = false; //auto scroll timeout

      _this.touchMove = false;
      _this.moveHover = _this.moveHover.bind(_assertThisInitialized(_this));
      _this.endMove = _this.endMove.bind(_assertThisInitialized(_this));

      _this.registerTableOption("movableColumns", false); //enable movable columns


      return _this;
    }

    _createClass(MoveColumns, [{
      key: "createPlaceholderElement",
      value: function createPlaceholderElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-col");
        el.classList.add("tabulator-col-placeholder");
        return el;
      }
    }, {
      key: "initialize",
      value: function initialize() {
        if (this.table.options.movableColumns) {
          this.subscribe("column-init", this.initializeColumn.bind(this));
        }
      }
    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var self = this,
            config = {},
            colEl;

        if (!column.modules.frozen && !column.isGroup) {
          colEl = column.getElement();

          config.mousemove = function (e) {
            if (column.parent === self.moving.parent) {
              if ((self.touchMove ? e.touches[0].pageX : e.pageX) - Helpers.elOffset(colEl).left + self.table.columnManager.element.scrollLeft > column.getWidth() / 2) {
                if (self.toCol !== column || !self.toColAfter) {
                  colEl.parentNode.insertBefore(self.placeholderElement, colEl.nextSibling);
                  self.moveColumn(column, true);
                }
              } else {
                if (self.toCol !== column || self.toColAfter) {
                  colEl.parentNode.insertBefore(self.placeholderElement, colEl);
                  self.moveColumn(column, false);
                }
              }
            }
          }.bind(self);

          colEl.addEventListener("mousedown", function (e) {
            self.touchMove = false;

            if (e.which === 1) {
              self.checkTimeout = setTimeout(function () {
                self.startMove(e, column);
              }, self.checkPeriod);
            }
          });
          colEl.addEventListener("mouseup", function (e) {
            if (e.which === 1) {
              if (self.checkTimeout) {
                clearTimeout(self.checkTimeout);
              }
            }
          });
          self.bindTouchEvents(column);
        }

        column.modules.moveColumn = config;
      }
    }, {
      key: "bindTouchEvents",
      value: function bindTouchEvents(column) {
        var _this2 = this;

        var colEl = column.getElement(),
            startXMove = false,
            nextCol,
            prevCol,
            nextColWidth,
            prevColWidth,
            nextColWidthLast,
            prevColWidthLast;
        colEl.addEventListener("touchstart", function (e) {
          _this2.checkTimeout = setTimeout(function () {
            _this2.touchMove = true;
            nextCol = column.nextColumn();
            nextColWidth = nextCol ? nextCol.getWidth() / 2 : 0;
            prevCol = column.prevColumn();
            prevColWidth = prevCol ? prevCol.getWidth() / 2 : 0;
            nextColWidthLast = 0;
            prevColWidthLast = 0;
            startXMove = false;

            _this2.startMove(e, column);
          }, _this2.checkPeriod);
        }, {
          passive: true
        });
        colEl.addEventListener("touchmove", function (e) {
          var diff, moveToCol;

          if (_this2.moving) {
            _this2.moveHover(e);

            if (!startXMove) {
              startXMove = e.touches[0].pageX;
            }

            diff = e.touches[0].pageX - startXMove;

            if (diff > 0) {
              if (nextCol && diff - nextColWidthLast > nextColWidth) {
                moveToCol = nextCol;

                if (moveToCol !== column) {
                  startXMove = e.touches[0].pageX;
                  moveToCol.getElement().parentNode.insertBefore(_this2.placeholderElement, moveToCol.getElement().nextSibling);

                  _this2.moveColumn(moveToCol, true);
                }
              }
            } else {
              if (prevCol && -diff - prevColWidthLast > prevColWidth) {
                moveToCol = prevCol;

                if (moveToCol !== column) {
                  startXMove = e.touches[0].pageX;
                  moveToCol.getElement().parentNode.insertBefore(_this2.placeholderElement, moveToCol.getElement());

                  _this2.moveColumn(moveToCol, false);
                }
              }
            }

            if (moveToCol) {
              nextCol = moveToCol.nextColumn();
              nextColWidthLast = nextColWidth;
              nextColWidth = nextCol ? nextCol.getWidth() / 2 : 0;
              prevCol = moveToCol.prevColumn();
              prevColWidthLast = prevColWidth;
              prevColWidth = prevCol ? prevCol.getWidth() / 2 : 0;
            }
          }
        }, {
          passive: true
        });
        colEl.addEventListener("touchend", function (e) {
          if (_this2.checkTimeout) {
            clearTimeout(_this2.checkTimeout);
          }

          if (_this2.moving) {
            _this2.endMove(e);
          }
        });
      }
    }, {
      key: "startMove",
      value: function startMove(e, column) {
        var element = column.getElement(),
            headerElement = this.table.columnManager.getElement(),
            headersElement = this.table.columnManager.getHeadersElement();
        this.moving = column;
        this.startX = (this.touchMove ? e.touches[0].pageX : e.pageX) - Helpers.elOffset(element).left;
        this.table.element.classList.add("tabulator-block-select"); //create placeholder

        this.placeholderElement.style.width = column.getWidth() + "px";
        this.placeholderElement.style.height = column.getHeight() + "px";
        element.parentNode.insertBefore(this.placeholderElement, element);
        element.parentNode.removeChild(element); //create hover element

        this.hoverElement = element.cloneNode(true);
        this.hoverElement.classList.add("tabulator-moving");
        this.table.columnManager.getElement().appendChild(this.hoverElement);
        this.hoverElement.style.left = "0";
        this.hoverElement.style.bottom = headerElement.clientHeight - headersElement.offsetHeight + "px";

        if (!this.touchMove) {
          this._bindMouseMove();

          document.body.addEventListener("mousemove", this.moveHover);
          document.body.addEventListener("mouseup", this.endMove);
        }

        this.moveHover(e);
      }
    }, {
      key: "_bindMouseMove",
      value: function _bindMouseMove() {
        this.table.columnManager.columnsByIndex.forEach(function (column) {
          if (column.modules.moveColumn.mousemove) {
            column.getElement().addEventListener("mousemove", column.modules.moveColumn.mousemove);
          }
        });
      }
    }, {
      key: "_unbindMouseMove",
      value: function _unbindMouseMove() {
        this.table.columnManager.columnsByIndex.forEach(function (column) {
          if (column.modules.moveColumn.mousemove) {
            column.getElement().removeEventListener("mousemove", column.modules.moveColumn.mousemove);
          }
        });
      }
    }, {
      key: "moveColumn",
      value: function moveColumn(column, after) {
        var movingCells = this.moving.getCells();
        this.toCol = column;
        this.toColAfter = after;

        if (after) {
          column.getCells().forEach(function (cell, i) {
            var cellEl = cell.getElement(true);

            if (cellEl.parentNode && movingCells[i]) {
              cellEl.parentNode.insertBefore(movingCells[i].getElement(), cellEl.nextSibling);
            }
          });
        } else {
          column.getCells().forEach(function (cell, i) {
            var cellEl = cell.getElement(true);

            if (cellEl.parentNode && movingCells[i]) {
              cellEl.parentNode.insertBefore(movingCells[i].getElement(), cellEl);
            }
          });
        }
      }
    }, {
      key: "endMove",
      value: function endMove(e) {
        if (e.which === 1 || this.touchMove) {
          this._unbindMouseMove();

          this.placeholderElement.parentNode.insertBefore(this.moving.getElement(), this.placeholderElement.nextSibling);
          this.placeholderElement.parentNode.removeChild(this.placeholderElement);
          this.hoverElement.parentNode.removeChild(this.hoverElement);
          this.table.element.classList.remove("tabulator-block-select");

          if (this.toCol) {
            this.table.columnManager.moveColumnActual(this.moving, this.toCol, this.toColAfter);
          }

          this.moving = false;
          this.toCol = false;
          this.toColAfter = false;

          if (!this.touchMove) {
            document.body.removeEventListener("mousemove", this.moveHover);
            document.body.removeEventListener("mouseup", this.endMove);
          }
        }
      }
    }, {
      key: "moveHover",
      value: function moveHover(e) {
        var _this3 = this;

        var columnHolder = this.table.columnManager.getElement(),
            scrollLeft = columnHolder.scrollLeft,
            xPos = (this.touchMove ? e.touches[0].pageX : e.pageX) - Helpers.elOffset(columnHolder).left + scrollLeft,
            scrollPos;
        this.hoverElement.style.left = xPos - this.startX + "px";

        if (xPos - scrollLeft < this.autoScrollMargin) {
          if (!this.autoScrollTimeout) {
            this.autoScrollTimeout = setTimeout(function () {
              scrollPos = Math.max(0, scrollLeft - 5);
              _this3.table.rowManager.getElement().scrollLeft = scrollPos;
              _this3.autoScrollTimeout = false;
            }, 1);
          }
        }

        if (scrollLeft + columnHolder.clientWidth - xPos < this.autoScrollMargin) {
          if (!this.autoScrollTimeout) {
            this.autoScrollTimeout = setTimeout(function () {
              scrollPos = Math.min(columnHolder.clientWidth, scrollLeft + 5);
              _this3.table.rowManager.getElement().scrollLeft = scrollPos;
              _this3.autoScrollTimeout = false;
            }, 1);
          }
        }
      }
    }]);

    return MoveColumns;
  }(Module);

  MoveColumns.moduleName = "moveColumn";

  var MoveRows = /*#__PURE__*/function (_Module) {
    _inherits(MoveRows, _Module);

    var _super = _createSuper(MoveRows);

    function MoveRows(table) {
      var _this;

      _classCallCheck(this, MoveRows);

      _this = _super.call(this, table);
      _this.placeholderElement = _this.createPlaceholderElement();
      _this.hoverElement = false; //floating row header element

      _this.checkTimeout = false; //click check timeout holder

      _this.checkPeriod = 150; //period to wait on mousedown to consider this a move and not a click

      _this.moving = false; //currently moving row

      _this.toRow = false; //destination row

      _this.toRowAfter = false; //position of moving row relative to the desitnation row

      _this.hasHandle = false; //row has handle instead of fully movable row

      _this.startY = 0; //starting Y position within header element

      _this.startX = 0; //starting X position within header element

      _this.moveHover = _this.moveHover.bind(_assertThisInitialized(_this));
      _this.endMove = _this.endMove.bind(_assertThisInitialized(_this));
      _this.tableRowDropEvent = false;
      _this.touchMove = false;
      _this.connection = false;
      _this.connectionSelectorsTables = false;
      _this.connectionSelectorsElements = false;
      _this.connectionElements = [];
      _this.connections = [];
      _this.connectedTable = false;
      _this.connectedRow = false;

      _this.registerTableOption("movableRows", false); //enable movable rows


      _this.registerTableOption("movableRowsConnectedTables", false); //tables for movable rows to be connected to


      _this.registerTableOption("movableRowsConnectedElements", false); //other elements for movable rows to be connected to


      _this.registerTableOption("movableRowsSender", false);

      _this.registerTableOption("movableRowsReceiver", "insert");

      _this.registerColumnOption("rowHandle");

      return _this;
    }

    _createClass(MoveRows, [{
      key: "createPlaceholderElement",
      value: function createPlaceholderElement() {
        var el = document.createElement("div");
        el.classList.add("tabulator-row");
        el.classList.add("tabulator-row-placeholder");
        return el;
      }
    }, {
      key: "initialize",
      value: function initialize() {
        if (this.table.options.movableRows) {
          this.connectionSelectorsTables = this.table.options.movableRowsConnectedTables;
          this.connectionSelectorsElements = this.table.options.movableRowsConnectedElements;
          this.connection = this.connectionSelectorsTables || this.connectionSelectorsElements;
          this.subscribe("cell-init", this.initializeCell.bind(this));
          this.subscribe("column-init", this.initializeColumn.bind(this));
          this.subscribe("row-init", this.initializeRow.bind(this));
        }
      }
    }, {
      key: "initializeGroupHeader",
      value: function initializeGroupHeader(group) {
        var self = this,
            config = {};
   //inter table drag drop

        config.mouseup = function (e) {
          self.tableRowDrop(e, row);
        }.bind(self); //same table drag drop


        config.mousemove = function (e) {
          if (e.pageY - Helpers.elOffset(group.element).top + self.table.rowManager.element.scrollTop > group.getHeight() / 2) {
            if (self.toRow !== group || !self.toRowAfter) {
              var rowEl = group.getElement();
              rowEl.parentNode.insertBefore(self.placeholderElement, rowEl.nextSibling);
              self.moveRow(group, true);
            }
          } else {
            if (self.toRow !== group || self.toRowAfter) {
              var rowEl = group.getElement();

              if (rowEl.previousSibling) {
                rowEl.parentNode.insertBefore(self.placeholderElement, rowEl);
                self.moveRow(group, false);
              }
            }
          }
        }.bind(self);

        group.modules.moveRow = config;
      }
    }, {
      key: "initializeRow",
      value: function initializeRow(row) {
        var self = this,
            config = {},
            rowEl; //inter table drag drop

        config.mouseup = function (e) {
          self.tableRowDrop(e, row);
        }.bind(self); //same table drag drop


        config.mousemove = function (e) {
          var rowEl = row.getElement();

          if (e.pageY - Helpers.elOffset(rowEl).top + self.table.rowManager.element.scrollTop > row.getHeight() / 2) {
            if (self.toRow !== row || !self.toRowAfter) {
              rowEl.parentNode.insertBefore(self.placeholderElement, rowEl.nextSibling);
              self.moveRow(row, true);
            }
          } else {
            if (self.toRow !== row || self.toRowAfter) {
              rowEl.parentNode.insertBefore(self.placeholderElement, rowEl);
              self.moveRow(row, false);
            }
          }
        }.bind(self);

        if (!this.hasHandle) {
          rowEl = row.getElement();
          rowEl.addEventListener("mousedown", function (e) {
            if (e.which === 1) {
              self.checkTimeout = setTimeout(function () {
                self.startMove(e, row);
              }, self.checkPeriod);
            }
          });
          rowEl.addEventListener("mouseup", function (e) {
            if (e.which === 1) {
              if (self.checkTimeout) {
                clearTimeout(self.checkTimeout);
              }
            }
          });
          this.bindTouchEvents(row, row.getElement());
        }

        row.modules.moveRow = config;
      }
    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        if (column.definition.rowHandle && this.table.options.movableRows !== false) {
          this.hasHandle = true;
        }
      }
    }, {
      key: "initializeCell",
      value: function initializeCell(cell) {
        if (cell.column.definition.rowHandle && this.table.options.movableRows !== false) {
          var self = this,
              cellEl = cell.getElement(true);
          cellEl.addEventListener("mousedown", function (e) {
            if (e.which === 1) {
              self.checkTimeout = setTimeout(function () {
                self.startMove(e, cell.row);
              }, self.checkPeriod);
            }
          });
          cellEl.addEventListener("mouseup", function (e) {
            if (e.which === 1) {
              if (self.checkTimeout) {
                clearTimeout(self.checkTimeout);
              }
            }
          });
          this.bindTouchEvents(cell.row, cellEl);
        }
      }
    }, {
      key: "bindTouchEvents",
      value: function bindTouchEvents(row, element) {
        var _this2 = this;

        var startYMove = false,
            nextRow,
            prevRow,
            nextRowHeight,
            prevRowHeight,
            nextRowHeightLast,
            prevRowHeightLast;
        element.addEventListener("touchstart", function (e) {
          _this2.checkTimeout = setTimeout(function () {
            _this2.touchMove = true;
            nextRow = row.nextRow();
            nextRowHeight = nextRow ? nextRow.getHeight() / 2 : 0;
            prevRow = row.prevRow();
            prevRowHeight = prevRow ? prevRow.getHeight() / 2 : 0;
            nextRowHeightLast = 0;
            prevRowHeightLast = 0;
            startYMove = false;

            _this2.startMove(e, row);
          }, _this2.checkPeriod);
        }, {
          passive: true
        });
        this.moving, this.toRow, this.toRowAfter;
        element.addEventListener("touchmove", function (e) {
          var diff, moveToRow;

          if (_this2.moving) {
            e.preventDefault();

            _this2.moveHover(e);

            if (!startYMove) {
              startYMove = e.touches[0].pageY;
            }

            diff = e.touches[0].pageY - startYMove;

            if (diff > 0) {
              if (nextRow && diff - nextRowHeightLast > nextRowHeight) {
                moveToRow = nextRow;

                if (moveToRow !== row) {
                  startYMove = e.touches[0].pageY;
                  moveToRow.getElement().parentNode.insertBefore(_this2.placeholderElement, moveToRow.getElement().nextSibling);

                  _this2.moveRow(moveToRow, true);
                }
              }
            } else {
              if (prevRow && -diff - prevRowHeightLast > prevRowHeight) {
                moveToRow = prevRow;

                if (moveToRow !== row) {
                  startYMove = e.touches[0].pageY;
                  moveToRow.getElement().parentNode.insertBefore(_this2.placeholderElement, moveToRow.getElement());

                  _this2.moveRow(moveToRow, false);
                }
              }
            }

            if (moveToRow) {
              nextRow = moveToRow.nextRow();
              nextRowHeightLast = nextRowHeight;
              nextRowHeight = nextRow ? nextRow.getHeight() / 2 : 0;
              prevRow = moveToRow.prevRow();
              prevRowHeightLast = prevRowHeight;
              prevRowHeight = prevRow ? prevRow.getHeight() / 2 : 0;
            }
          }
        });
        element.addEventListener("touchend", function (e) {
          if (_this2.checkTimeout) {
            clearTimeout(_this2.checkTimeout);
          }

          if (_this2.moving) {
            _this2.endMove(e);

            _this2.touchMove = false;
          }
        });
      }
    }, {
      key: "_bindMouseMove",
      value: function _bindMouseMove() {
        this.table.rowManager.getDisplayRows().forEach(function (row) {
          if ((row.type === "row" || row.type === "group") && row.modules.moveRow && row.modules.moveRow.mousemove) {
            row.getElement().addEventListener("mousemove", row.modules.moveRow.mousemove);
          }
        });
      }
    }, {
      key: "_unbindMouseMove",
      value: function _unbindMouseMove() {
        this.table.rowManager.getDisplayRows().forEach(function (row) {
          if ((row.type === "row" || row.type === "group") && row.modules.moveRow && row.modules.moveRow.mousemove) {
            row.getElement().removeEventListener("mousemove", row.modules.moveRow.mousemove);
          }
        });
      }
    }, {
      key: "startMove",
      value: function startMove(e, row) {
        var element = row.getElement();
        this.setStartPosition(e, row);
        this.moving = row;
        this.table.element.classList.add("tabulator-block-select"); //create placeholder

        this.placeholderElement.style.width = row.getWidth() + "px";
        this.placeholderElement.style.height = row.getHeight() + "px";

        if (!this.connection) {
          element.parentNode.insertBefore(this.placeholderElement, element);
          element.parentNode.removeChild(element);
        } else {
          this.table.element.classList.add("tabulator-movingrow-sending");
          this.connectToTables(row);
        } //create hover element


        this.hoverElement = element.cloneNode(true);
        this.hoverElement.classList.add("tabulator-moving");

        if (this.connection) {
          document.body.appendChild(this.hoverElement);
          this.hoverElement.style.left = "0";
          this.hoverElement.style.top = "0";
          this.hoverElement.style.width = this.table.element.clientWidth + "px";
          this.hoverElement.style.whiteSpace = "nowrap";
          this.hoverElement.style.overflow = "hidden";
          this.hoverElement.style.pointerEvents = "none";
        } else {
          this.table.rowManager.getTableElement().appendChild(this.hoverElement);
          this.hoverElement.style.left = "0";
          this.hoverElement.style.top = "0";

          this._bindMouseMove();
        }

        document.body.addEventListener("mousemove", this.moveHover);
        document.body.addEventListener("mouseup", this.endMove);
        this.dispatchExternal("rowMoving", row.getComponent());
        this.moveHover(e);
      }
    }, {
      key: "setStartPosition",
      value: function setStartPosition(e, row) {
        var pageX = this.touchMove ? e.touches[0].pageX : e.pageX,
            pageY = this.touchMove ? e.touches[0].pageY : e.pageY,
            element,
            position;
        element = row.getElement();

        if (this.connection) {
          position = element.getBoundingClientRect();
          this.startX = position.left - pageX + window.pageXOffset;
          this.startY = position.top - pageY + window.pageYOffset;
        } else {
          this.startY = pageY - element.getBoundingClientRect().top;
        }
      }
    }, {
      key: "endMove",
      value: function endMove(e) {
        if (!e || e.which === 1 || this.touchMove) {
          this._unbindMouseMove();

          if (!this.connection) {
            this.placeholderElement.parentNode.insertBefore(this.moving.getElement(), this.placeholderElement.nextSibling);
            this.placeholderElement.parentNode.removeChild(this.placeholderElement);
          }

          this.hoverElement.parentNode.removeChild(this.hoverElement);
          this.table.element.classList.remove("tabulator-block-select");

          if (this.toRow) {
            this.table.rowManager.moveRow(this.moving, this.toRow, this.toRowAfter);
          } else {
            this.dispatchExternal("rowMoveCancelled", this.moving.getComponent());
          }

          this.moving = false;
          this.toRow = false;
          this.toRowAfter = false;
          document.body.removeEventListener("mousemove", this.moveHover);
          document.body.removeEventListener("mouseup", this.endMove);

          if (this.connection) {
            this.table.element.classList.remove("tabulator-movingrow-sending");
            this.disconnectFromTables();
          }
        }
      }
    }, {
      key: "moveRow",
      value: function moveRow(row, after) {
        this.toRow = row;
        this.toRowAfter = after;
      }
    }, {
      key: "moveHover",
      value: function moveHover(e) {
        if (this.connection) {
          this.moveHoverConnections.call(this, e);
        } else {
          this.moveHoverTable.call(this, e);
        }
      }
    }, {
      key: "moveHoverTable",
      value: function moveHoverTable(e) {
        var rowHolder = this.table.rowManager.getElement(),
            scrollTop = rowHolder.scrollTop,
            yPos = (this.touchMove ? e.touches[0].pageY : e.pageY) - rowHolder.getBoundingClientRect().top + scrollTop;
        this.hoverElement.style.top = yPos - this.startY + "px";
      }
    }, {
      key: "moveHoverConnections",
      value: function moveHoverConnections(e) {
        this.hoverElement.style.left = this.startX + (this.touchMove ? e.touches[0].pageX : e.pageX) + "px";
        this.hoverElement.style.top = this.startY + (this.touchMove ? e.touches[0].pageY : e.pageY) + "px";
      }
    }, {
      key: "elementRowDrop",
      value: function elementRowDrop(e, element, row) {
        this.dispatchExternal("movableRowsElementDrop", e, element, row ? row.getComponent() : false);
      } //establish connection with other tables

    }, {
      key: "connectToTables",
      value: function connectToTables(row) {
        var _this3 = this;

        var connectionTables;

        if (this.connectionSelectorsTables) {
          connectionTables = this.commsConnections(this.connectionSelectorsTables);
          this.dispatchExternal("movableRowsSendingStart", connectionTables);
          this.commsSend(this.connectionSelectorsTables, "moveRow", "connect", {
            row: row
          });
        }

        if (this.connectionSelectorsElements) {
          this.connectionElements = [];

          if (!Array.isArray(this.connectionSelectorsElements)) {
            this.connectionSelectorsElements = [this.connectionSelectorsElements];
          }

          this.connectionSelectorsElements.forEach(function (query) {
            if (typeof query === "string") {
              _this3.connectionElements = _this3.connectionElements.concat(Array.prototype.slice.call(document.querySelectorAll(query)));
            } else {
              _this3.connectionElements.push(query);
            }
          });
          this.connectionElements.forEach(function (element) {
            var dropEvent = function dropEvent(e) {
              _this3.elementRowDrop(e, element, _this3.moving);
            };

            element.addEventListener("mouseup", dropEvent);
            element.tabulatorElementDropEvent = dropEvent;
            element.classList.add("tabulator-movingrow-receiving");
          });
        }
      } //disconnect from other tables

    }, {
      key: "disconnectFromTables",
      value: function disconnectFromTables() {
        var connectionTables;

        if (this.connectionSelectorsTables) {
          connectionTables = this.commsConnections(this.connectionSelectorsTables);
          this.dispatchExternal("movableRowsSendingStop", connectionTables);
          this.commsSend(this.connectionSelectorsTables, "moveRow", "disconnect");
        }

        this.connectionElements.forEach(function (element) {
          element.classList.remove("tabulator-movingrow-receiving");
          element.removeEventListener("mouseup", element.tabulatorElementDropEvent);
          delete element.tabulatorElementDropEvent;
        });
      } //accept incomming connection

    }, {
      key: "connect",
      value: function connect(table, row) {
        if (!this.connectedTable) {
          this.connectedTable = table;
          this.connectedRow = row;
          this.table.element.classList.add("tabulator-movingrow-receiving");
          this.table.rowManager.getDisplayRows().forEach(function (row) {
            if (row.type === "row" && row.modules.moveRow && row.modules.moveRow.mouseup) {
              row.getElement().addEventListener("mouseup", row.modules.moveRow.mouseup);
            }
          });
          this.tableRowDropEvent = this.tableRowDrop.bind(this);
          this.table.element.addEventListener("mouseup", this.tableRowDropEvent);
          this.dispatchExternal("movableRowsReceivingStart", row, table);
          return true;
        } else {
          console.warn("Move Row Error - Table cannot accept connection, already connected to table:", this.connectedTable);
          return false;
        }
      } //close incomming connection

    }, {
      key: "disconnect",
      value: function disconnect(table) {
        if (table === this.connectedTable) {
          this.connectedTable = false;
          this.connectedRow = false;
          this.table.element.classList.remove("tabulator-movingrow-receiving");
          this.table.rowManager.getDisplayRows().forEach(function (row) {
            if (row.type === "row" && row.modules.moveRow && row.modules.moveRow.mouseup) {
              row.getElement().removeEventListener("mouseup", row.modules.moveRow.mouseup);
            }
          });
          this.table.element.removeEventListener("mouseup", this.tableRowDropEvent);
          this.dispatchExternal("movableRowsReceivingStop", table);
        } else {
          console.warn("Move Row Error - trying to disconnect from non connected table");
        }
      }
    }, {
      key: "dropComplete",
      value: function dropComplete(table, row, success) {
        var sender = false;

        if (success) {
          switch (_typeof(this.table.options.movableRowsSender)) {
            case "string":
              sender = this.senders[this.table.options.movableRowsSender];
              break;

            case "function":
              sender = this.table.options.movableRowsSender;
              break;
          }

          if (sender) {
            sender.call(this, this.moving.getComponent(), row ? row.getComponent() : undefined, table);
          } else {
            if (this.table.options.movableRowsSender) {
              console.warn("Mover Row Error - no matching sender found:", this.table.options.movableRowsSender);
            }
          }

          this.dispatchExternal("movableRowsSent", this.moving.getComponent(), row ? row.getComponent() : undefined, table);
        } else {
          this.dispatchExternal("movableRowsSentFailed", this.moving.getComponent(), row ? row.getComponent() : undefined, table);
        }

        this.endMove();
      }
    }, {
      key: "tableRowDrop",
      value: function tableRowDrop(e, row) {
        var receiver = false,
            success = false;
        e.stopImmediatePropagation();

        switch (_typeof(this.table.options.movableRowsReceiver)) {
          case "string":
            receiver = this.receivers[this.table.options.movableRowsReceiver];
            break;

          case "function":
            receiver = this.table.options.movableRowsReceiver;
            break;
        }

        if (receiver) {
          success = receiver.call(this, this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
        } else {
          console.warn("Mover Row Error - no matching receiver found:", this.table.options.movableRowsReceiver);
        }

        if (success) {
          this.dispatchExternal("movableRowsReceived", this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
        } else {
          this.dispatchExternal("movableRowsReceivedFailed", this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
        }

        this.commsSend(this.connectedTable, "moveRow", "dropcomplete", {
          row: row,
          success: success
        });
      }
    }, {
      key: "commsReceived",
      value: function commsReceived(table, action, data) {
        switch (action) {
          case "connect":
            return this.connect(table, data.row);

          case "disconnect":
            return this.disconnect(table);

          case "dropcomplete":
            return this.dropComplete(table, data.row, data.success);
        }
      }
    }]);

    return MoveRows;
  }(Module);

  MoveRows.prototype.receivers = {
    insert: function insert(fromRow, toRow, fromTable) {
      this.table.addRow(fromRow.getData(), undefined, toRow);
      return true;
    },
    add: function add(fromRow, toRow, fromTable) {
      this.table.addRow(fromRow.getData());
      return true;
    },
    update: function update(fromRow, toRow, fromTable) {
      if (toRow) {
        toRow.update(fromRow.getData());
        return true;
      }

      return false;
    },
    replace: function replace(fromRow, toRow, fromTable) {
      if (toRow) {
        this.table.addRow(fromRow.getData(), undefined, toRow);
        toRow["delete"]();
        return true;
      }

      return false;
    }
  };
  MoveRows.prototype.senders = {
    "delete": function _delete(fromRow, toRow, toTable) {
      fromRow["delete"]();
    }
  };
  MoveRows.moduleName = "moveRow";

  var defaultMutators = {};

  var Mutator = /*#__PURE__*/function (_Module) {
    _inherits(Mutator, _Module);

    var _super = _createSuper(Mutator);

    function Mutator(table) {
      var _this;

      _classCallCheck(this, Mutator);

      _this = _super.call(this, table);
      _this.allowedTypes = ["", "data", "edit", "clipboard"]; //list of muatation types

      _this.enabled = true;

      _this.registerColumnOption("mutator");

      _this.registerColumnOption("mutatorParams");

      _this.registerColumnOption("mutatorData");

      _this.registerColumnOption("mutatorDataParams");

      _this.registerColumnOption("mutatorEdit");

      _this.registerColumnOption("mutatorEditParams");

      _this.registerColumnOption("mutatorClipboard");

      _this.registerColumnOption("mutatorClipboardParams");

      _this.registerColumnOption("mutateLink");

      return _this;
    }

    _createClass(Mutator, [{
      key: "initialize",
      value: function initialize() {
        this.subscribe("cell-value-changing", this.transformCell.bind(this));
        this.subscribe("cell-value-changed", this.mutateLink.bind(this));
        this.subscribe("column-layout", this.initializeColumn.bind(this));
        this.subscribe("row-data-init-before", this.rowDataChanged.bind(this));
        this.subscribe("row-data-changing", this.rowDataChanged.bind(this));
      }
    }, {
      key: "rowDataChanged",
      value: function rowDataChanged(row, tempData, updatedData) {
        return this.transformRow(tempData, "data", updatedData);
      } //initialize column mutator

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var _this2 = this;

        var match = false,
            config = {};
        this.allowedTypes.forEach(function (type) {
          var key = "mutator" + (type.charAt(0).toUpperCase() + type.slice(1)),
              mutator;

          if (column.definition[key]) {
            mutator = _this2.lookupMutator(column.definition[key]);

            if (mutator) {
              match = true;
              config[key] = {
                mutator: mutator,
                params: column.definition[key + "Params"] || {}
              };
            }
          }
        });

        if (match) {
          column.modules.mutate = config;
        }
      }
    }, {
      key: "lookupMutator",
      value: function lookupMutator(value) {
        var mutator = false; //set column mutator

        switch (_typeof(value)) {
          case "string":
            if (Mutator.mutators[value]) {
              mutator = Mutator.mutators[value];
            } else {
              console.warn("Mutator Error - No such mutator found, ignoring: ", value);
            }

            break;

          case "function":
            mutator = value;
            break;
        }

        return mutator;
      } //apply mutator to row

    }, {
      key: "transformRow",
      value: function transformRow(data, type, updatedData) {
        var key = "mutator" + (type.charAt(0).toUpperCase() + type.slice(1)),
            value;

        if (this.enabled) {
          this.table.columnManager.traverse(function (column) {
            var mutator, params, component;

            if (column.modules.mutate) {
              mutator = column.modules.mutate[key] || column.modules.mutate.mutator || false;

              if (mutator) {
                value = column.getFieldValue(typeof updatedData !== "undefined" ? updatedData : data);

                if (type == "data" || typeof value !== "undefined") {
                  component = column.getComponent();
                  params = typeof mutator.params === "function" ? mutator.params(value, data, type, component) : mutator.params;
                  column.setFieldValue(data, mutator.mutator(value, data, type, params, component));
                }
              }
            }
          });
        }

        return data;
      } //apply mutator to new cell value

    }, {
      key: "transformCell",
      value: function transformCell(cell, value) {
        if (cell.column.modules.mutate) {
          var mutator = cell.column.modules.mutate.mutatorEdit || cell.column.modules.mutate.mutator || false,
              tempData = {};

          if (mutator) {
            tempData = Object.assign(tempData, cell.row.getData());
            cell.column.setFieldValue(tempData, value);
            return mutator.mutator(value, tempData, "edit", mutator.params, cell.getComponent());
          }
        }

        return value;
      }
    }, {
      key: "mutateLink",
      value: function mutateLink(cell) {
        var links = cell.column.definition.mutateLink;

        if (links) {
          if (!Array.isArray(links)) {
            links = [links];
          }

          links.forEach(function (link) {
            var linkCell = cell.row.getCell(link);

            if (linkCell) {
              linkCell.setValue(linkCell.getValue(), true, true);
            }
          });
        }
      }
    }, {
      key: "enable",
      value: function enable() {
        this.enabled = true;
      }
    }, {
      key: "disable",
      value: function disable() {
        this.enabled = false;
      }
    }]);

    return Mutator;
  }(Module);

  Mutator.moduleName = "mutator"; //load defaults

  Mutator.mutators = defaultMutators;

  function rows (pageSize, currentRow, currentPage, totalRows, totalPages) {
    var el = document.createElement("span"),
        showingEl = document.createElement("span"),
        valueEl = document.createElement("span"),
        ofEl = document.createElement("span"),
        totalEl = document.createElement("span"),
        rowsEl = document.createElement("span");
    this.table.modules.localize.langBind("pagination|counter|showing", function (value) {
      showingEl.innerHTML = value;
    });
    this.table.modules.localize.langBind("pagination|counter|of", function (value) {
      ofEl.innerHTML = value;
    });
    this.table.modules.localize.langBind("pagination|counter|rows", function (value) {
      rowsEl.innerHTML = value;
    });

    if (totalRows) {
      valueEl.innerHTML = " " + currentRow + "-" + Math.min(currentRow + pageSize - 1, totalRows) + " ";
      totalEl.innerHTML = " " + totalRows + " ";
      el.appendChild(showingEl);
      el.appendChild(valueEl);
      el.appendChild(ofEl);
      el.appendChild(totalEl);
      el.appendChild(rowsEl);
    } else {
      valueEl.innerHTML = " 0 ";
      el.appendChild(showingEl);
      el.appendChild(valueEl);
      el.appendChild(rowsEl);
    }

    return el;
  }

  function pages (pageSize, currentRow, currentPage, totalRows, totalPages) {
    var el = document.createElement("span"),
        showingEl = document.createElement("span"),
        valueEl = document.createElement("span"),
        ofEl = document.createElement("span"),
        totalEl = document.createElement("span"),
        rowsEl = document.createElement("span");
    this.table.modules.localize.langBind("pagination|counter|showing", function (value) {
      showingEl.innerHTML = value;
    });
    valueEl.innerHTML = " " + currentPage + " ";
    this.table.modules.localize.langBind("pagination|counter|of", function (value) {
      ofEl.innerHTML = value;
    });
    totalEl.innerHTML = " " + totalPages + " ";
    this.table.modules.localize.langBind("pagination|counter|pages", function (value) {
      rowsEl.innerHTML = value;
    });
    el.appendChild(showingEl);
    el.appendChild(valueEl);
    el.appendChild(ofEl);
    el.appendChild(totalEl);
    el.appendChild(rowsEl);
    return el;
  }

  var defaultPageCounters = {
    rows: rows,
    pages: pages
  };

  var Page = /*#__PURE__*/function (_Module) {
    _inherits(Page, _Module);

    var _super = _createSuper(Page);

    function Page(table) {
      var _this;

      _classCallCheck(this, Page);

      _this = _super.call(this, table);
      _this.mode = "local";
      _this.progressiveLoad = false;
      _this.element = null;
      _this.pageCounterElement = null;
      _this.pageCounter = null;
      _this.size = 0;
      _this.page = 1;
      _this.count = 5;
      _this.max = 1;
      _this.remoteRowCountEstimate = null;
      _this.displayIndex = 0; //index in display pipeline

      _this.initialLoad = true;
      _this.dataChanging = false; //flag to check if data is being changed by this module

      _this.pageSizes = [];

      _this.registerTableOption("pagination", false); //set pagination type


      _this.registerTableOption("paginationMode", "local"); //local or remote pagination


      _this.registerTableOption("paginationSize", false); //set number of rows to a page


      _this.registerTableOption("paginationInitialPage", 1); //initial page to show on load


      _this.registerTableOption("paginationCounter", false); // set pagination counter


      _this.registerTableOption("paginationCounterElement", false); // set pagination counter


      _this.registerTableOption("paginationButtonCount", 5); // set count of page button


      _this.registerTableOption("paginationSizeSelector", false); //add pagination size selector element


      _this.registerTableOption("paginationElement", false); //element to hold pagination numbers
      // this.registerTableOption("paginationDataSent", {}); //pagination data sent to the server
      // this.registerTableOption("paginationDataReceived", {}); //pagination data received from the server


      _this.registerTableOption("paginationAddRow", "page"); //add rows on table or page


      _this.registerTableOption("progressiveLoad", false); //progressive loading


      _this.registerTableOption("progressiveLoadDelay", 0); //delay between requests


      _this.registerTableOption("progressiveLoadScrollMargin", 0); //margin before scroll begins


      _this.registerTableFunction("setMaxPage", _this.setMaxPage.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("setPage", _this.setPage.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("setPageToRow", _this.userSetPageToRow.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("setPageSize", _this.userSetPageSize.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("getPageSize", _this.getPageSize.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("previousPage", _this.previousPage.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("nextPage", _this.nextPage.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("getPage", _this.getPage.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("getPageMax", _this.getPageMax.bind(_assertThisInitialized(_this))); //register component functions


      _this.registerComponentFunction("row", "pageTo", _this.setPageToRow.bind(_assertThisInitialized(_this)));

      return _this;
    }

    _createClass(Page, [{
      key: "initialize",
      value: function initialize() {
        if (this.table.options.pagination) {
          this.subscribe("row-deleted", this.rowsUpdated.bind(this));
          this.subscribe("row-added", this.rowsUpdated.bind(this));
          this.subscribe("data-processed", this.initialLoadComplete.bind(this));
          this.subscribe("table-built", this.calculatePageSizes.bind(this));
          this.subscribe("footer-redraw", this.footerRedraw.bind(this));

          if (this.table.options.paginationAddRow == "page") {
            this.subscribe("row-adding-position", this.rowAddingPosition.bind(this));
          }

          if (this.table.options.paginationMode === "remote") {
            this.subscribe("data-params", this.remotePageParams.bind(this));
            this.subscribe("data-loaded", this._parseRemoteData.bind(this));
          }

          if (this.table.options.progressiveLoad) {
            console.error("Progressive Load Error - Pagination and progressive load cannot be used at the same time");
          }

          this.registerDisplayHandler(this.restOnRenderBefore.bind(this), 40);
          this.registerDisplayHandler(this.getRows.bind(this), 50);
          this.createElements();
          this.initializePageCounter();
          this.initializePaginator();
        } else if (this.table.options.progressiveLoad) {
          this.subscribe("data-params", this.remotePageParams.bind(this));
          this.subscribe("data-loaded", this._parseRemoteData.bind(this));
          this.subscribe("table-built", this.calculatePageSizes.bind(this));
          this.subscribe("data-processed", this.initialLoadComplete.bind(this));
          this.initializeProgressive(this.table.options.progressiveLoad);

          if (this.table.options.progressiveLoad === "scroll") {
            this.subscribe("scroll-vertical", this.scrollVertical.bind(this));
          }
        }
      }
    }, {
      key: "rowAddingPosition",
      value: function rowAddingPosition(row, top) {
        var rowManager = this.table.rowManager,
            dispRows = rowManager.getDisplayRows(),
            index;

        if (top) {
          if (dispRows.length) {
            index = dispRows[0];
          } else {
            if (rowManager.activeRows.length) {
              index = rowManager.activeRows[rowManager.activeRows.length - 1];
              top = false;
            }
          }
        } else {
          if (dispRows.length) {
            index = dispRows[dispRows.length - 1];
            top = dispRows.length < this.size ? false : true;
          }
        }

        return {
          index: index,
          top: top
        };
      }
    }, {
      key: "calculatePageSizes",
      value: function calculatePageSizes() {
        var testElRow, testElCell;

        if (this.table.options.paginationSize) {
          this.size = this.table.options.paginationSize;
        } else {
          testElRow = document.createElement("div");
          testElRow.classList.add("tabulator-row");
          testElRow.style.visibility = "hidden";
          testElCell = document.createElement("div");
          testElCell.classList.add("tabulator-cell");
          testElCell.innerHTML = "Page Row Test";
          testElRow.appendChild(testElCell);
          this.table.rowManager.getTableElement().appendChild(testElRow);
          this.size = Math.floor(this.table.rowManager.getElement().clientHeight / testElRow.offsetHeight);
          this.table.rowManager.getTableElement().removeChild(testElRow);
        }

        this.dispatchExternal("pageSizeChanged", this.size);
        this.generatePageSizeSelectList();
      }
    }, {
      key: "initialLoadComplete",
      value: function initialLoadComplete() {
        this.initialLoad = false;
      }
    }, {
      key: "remotePageParams",
      value: function remotePageParams(data, config, silent, params) {
        if (!this.initialLoad) {
          if (this.progressiveLoad && !silent || !this.progressiveLoad && !this.dataChanging) {
            this.reset(true);
          }
        } //configure request params


        params.page = this.page; //set page size if defined

        if (this.size) {
          params.size = this.size;
        }

        return params;
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////

    }, {
      key: "userSetPageToRow",
      value: function userSetPageToRow(row) {
        if (this.table.options.pagination) {
          row = this.rowManager.findRow(row);

          if (row) {
            return this.setPageToRow(row);
          }
        }

        return Promise.reject();
      }
    }, {
      key: "userSetPageSize",
      value: function userSetPageSize(size) {
        if (this.table.options.pagination) {
          this.setPageSize(size);
          return this.setPage(1);
        } else {
          return false;
        }
      } ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////

    }, {
      key: "scrollVertical",
      value: function scrollVertical(top, dir) {
        var element, diff, margin;

        if (!dir && !this.table.dataLoader.loading) {
          element = this.table.rowManager.getElement();
          diff = element.scrollHeight - element.clientHeight - top;
          margin = this.table.options.progressiveLoadScrollMargin || element.clientHeight * 2;

          if (diff < margin) {
            this.nextPage()["catch"](function () {}); //consume the exception thrown when on the last page
          }
        }
      }
    }, {
      key: "restOnRenderBefore",
      value: function restOnRenderBefore(rows, renderInPosition) {
        if (!renderInPosition) {
          if (this.mode === "local") {
            this.reset();
          }
        }

        return rows;
      }
    }, {
      key: "rowsUpdated",
      value: function rowsUpdated() {
        this.refreshData(true, "all");
      }
    }, {
      key: "createElements",
      value: function createElements() {
        var button;
        this.element = document.createElement("span");
        this.element.classList.add("tabulator-paginator");
        this.pagesElement = document.createElement("span");
        this.pagesElement.classList.add("tabulator-pages");
        button = document.createElement("button");
        button.classList.add("tabulator-page");
        button.setAttribute("type", "button");
        button.setAttribute("role", "button");
        button.setAttribute("aria-label", "");
        button.setAttribute("title", "");
        this.firstBut = button.cloneNode(true);
        this.firstBut.setAttribute("data-page", "first");
        this.prevBut = button.cloneNode(true);
        this.prevBut.setAttribute("data-page", "prev");
        this.nextBut = button.cloneNode(true);
        this.nextBut.setAttribute("data-page", "next");
        this.lastBut = button.cloneNode(true);
        this.lastBut.setAttribute("data-page", "last");

        if (this.table.options.paginationSizeSelector) {
          this.pageSizeSelect = document.createElement("select");
          this.pageSizeSelect.classList.add("tabulator-page-size");
        }
      }
    }, {
      key: "generatePageSizeSelectList",
      value: function generatePageSizeSelectList() {
        var _this2 = this;

        var pageSizes = [];

        if (this.pageSizeSelect) {
          if (Array.isArray(this.table.options.paginationSizeSelector)) {
            pageSizes = this.table.options.paginationSizeSelector;
            this.pageSizes = pageSizes;

            if (this.pageSizes.indexOf(this.size) == -1) {
              pageSizes.unshift(this.size);
            }
          } else {
            if (this.pageSizes.indexOf(this.size) == -1) {
              pageSizes = [];

              for (var i = 1; i < 5; i++) {
                pageSizes.push(this.size * i);
              }

              this.pageSizes = pageSizes;
            } else {
              pageSizes = this.pageSizes;
            }
          }

          while (this.pageSizeSelect.firstChild) {
            this.pageSizeSelect.removeChild(this.pageSizeSelect.firstChild);
          }

          pageSizes.forEach(function (item) {
            var itemEl = document.createElement("option");
            itemEl.value = item;

            if (item === true) {
              _this2.langBind("pagination|all", function (value) {
                itemEl.innerHTML = value;
              });
            } else {
              itemEl.innerHTML = item;
            }

            _this2.pageSizeSelect.appendChild(itemEl);
          });
          this.pageSizeSelect.value = this.size;
        }
      }
    }, {
      key: "initializePageCounter",
      value: function initializePageCounter() {
        var counter = this.table.options.paginationCounter,
            pageCounter = null;

        if (counter) {
          if (typeof counter === "function") {
            pageCounter = counter;
          } else {
            pageCounter = Page.pageCounters[counter];
          }

          if (pageCounter) {
            this.pageCounter = pageCounter;
            this.pageCounterElement = document.createElement("span");
            this.pageCounterElement.classList.add("tabulator-page-counter");
          } else {
            console.warn("Pagination Error - No such page counter found: ", counter);
          }
        }
      } //setup pagination

    }, {
      key: "initializePaginator",
      value: function initializePaginator(hidden) {
        var _this3 = this;

        var pageSelectLabel, paginationCounterHolder;

        if (!hidden) {
          //build pagination element
          //bind localizations
          this.langBind("pagination|first", function (value) {
            _this3.firstBut.innerHTML = value;
          });
          this.langBind("pagination|first_title", function (value) {
            _this3.firstBut.setAttribute("aria-label", value);

            _this3.firstBut.setAttribute("title", value);
          });
          this.langBind("pagination|prev", function (value) {
            _this3.prevBut.innerHTML = value;
          });
          this.langBind("pagination|prev_title", function (value) {
            _this3.prevBut.setAttribute("aria-label", value);

            _this3.prevBut.setAttribute("title", value);
          });
          this.langBind("pagination|next", function (value) {
            _this3.nextBut.innerHTML = value;
          });
          this.langBind("pagination|next_title", function (value) {
            _this3.nextBut.setAttribute("aria-label", value);

            _this3.nextBut.setAttribute("title", value);
          });
          this.langBind("pagination|last", function (value) {
            _this3.lastBut.innerHTML = value;
          });
          this.langBind("pagination|last_title", function (value) {
            _this3.lastBut.setAttribute("aria-label", value);

            _this3.lastBut.setAttribute("title", value);
          }); //click bindings

          this.firstBut.addEventListener("click", function () {
            _this3.setPage(1);
          });
          this.prevBut.addEventListener("click", function () {
            _this3.previousPage();
          });
          this.nextBut.addEventListener("click", function () {
            _this3.nextPage();
          });
          this.lastBut.addEventListener("click", function () {
            _this3.setPage(_this3.max);
          });

          if (this.table.options.paginationElement) {
            this.element = this.table.options.paginationElement;
          }

          if (this.pageSizeSelect) {
            pageSelectLabel = document.createElement("label");
            this.langBind("pagination|page_size", function (value) {
              _this3.pageSizeSelect.setAttribute("aria-label", value);

              _this3.pageSizeSelect.setAttribute("title", value);

              pageSelectLabel.innerHTML = value;
            });
            this.element.appendChild(pageSelectLabel);
            this.element.appendChild(this.pageSizeSelect);
            this.pageSizeSelect.addEventListener("change", function (e) {
              _this3.setPageSize(_this3.pageSizeSelect.value == "true" ? true : _this3.pageSizeSelect.value);

              _this3.setPage(1);
            });
          } //append to DOM


          this.element.appendChild(this.firstBut);
          this.element.appendChild(this.prevBut);
          this.element.appendChild(this.pagesElement);
          this.element.appendChild(this.nextBut);
          this.element.appendChild(this.lastBut);

          if (!this.table.options.paginationElement && !hidden) {
            if (this.table.options.paginationCounter) {

              if (this.table.options.paginationCounterElement) {
                if (this.table.options.paginationCounterElement instanceof HTMLElement) {
                  this.table.options.paginationCounterElement.appendChild(this.pageCounterElement);
                } else if (typeof this.table.options.paginationCounterElement === "string") {
                  paginationCounterHolder = document.querySelector(this.table.options.paginationCounterElement);

                  if (paginationCounterHolder) {
                    paginationCounterHolder.appendChild(this.pageCounterElement);
                  } else {
                    console.warn("Pagination Error - Unable to find element matching paginationCounterElement selector:", this.table.options.paginationCounterElement);
                  }
                }
              } else {
                this.footerAppend(this.pageCounterElement);
              }
            }

            this.footerAppend(this.element);
          }

          this.page = this.table.options.paginationInitialPage;
          this.count = this.table.options.paginationButtonCount;
        } //set default values


        this.mode = this.table.options.paginationMode;
      }
    }, {
      key: "initializeProgressive",
      value: function initializeProgressive(mode) {
        this.initializePaginator(true);
        this.mode = "progressive_" + mode;
        this.progressiveLoad = true;
      }
    }, {
      key: "trackChanges",
      value: function trackChanges() {
        this.dispatch("page-changed");
      }
    }, {
      key: "setDisplayIndex",
      value: function setDisplayIndex(index) {
        this.displayIndex = index;
      }
    }, {
      key: "getDisplayIndex",
      value: function getDisplayIndex() {
        return this.displayIndex;
      } //calculate maximum page from number of rows

    }, {
      key: "setMaxRows",
      value: function setMaxRows(rowCount) {
        if (!rowCount) {
          this.max = 1;
        } else {
          this.max = this.size === true ? 1 : Math.ceil(rowCount / this.size);
        }

        if (this.page > this.max) {
          this.page = this.max;
        }
      } //reset to first page without triggering action

    }, {
      key: "reset",
      value: function reset(force) {
        if (!this.initialLoad) {
          if (this.mode == "local" || force) {
            this.page = 1;
          }
        }
      } //set the maximum page

    }, {
      key: "setMaxPage",
      value: function setMaxPage(max) {
        max = parseInt(max);
        this.max = max || 1;

        if (this.page > this.max) {
          this.page = this.max;
          this.trigger();
        }
      } //set current page number

    }, {
      key: "setPage",
      value: function setPage(page) {
        switch (page) {
          case "first":
            return this.setPage(1);

          case "prev":
            return this.previousPage();

          case "next":
            return this.nextPage();

          case "last":
            return this.setPage(this.max);
        }

        page = parseInt(page);

        if (page > 0 && page <= this.max || this.mode !== "local") {
          this.page = page;
          this.trackChanges();
          return this.trigger();
        } else {
          console.warn("Pagination Error - Requested page is out of range of 1 - " + this.max + ":", page);
          return Promise.reject();
        }
      }
    }, {
      key: "setPageToRow",
      value: function setPageToRow(row) {
        var rows = this.table.rowManager.getDisplayRows(this.displayIndex - 1);
        var index = rows.indexOf(row);

        if (index > -1) {
          var page = this.size === true ? 1 : Math.ceil((index + 1) / this.size);
          return this.setPage(page);
        } else {
          console.warn("Pagination Error - Requested row is not visible");
          return Promise.reject();
        }
      }
    }, {
      key: "setPageSize",
      value: function setPageSize(size) {
        if (size !== true) {
          size = parseInt(size);
        }

        if (size > 0) {
          this.size = size;
          this.dispatchExternal("pageSizeChanged", size);
        }

        if (this.pageSizeSelect) {
          // this.pageSizeSelect.value = size;
          this.generatePageSizeSelectList();
        }

        this.trackChanges();
      }
    }, {
      key: "_setPageCounter",
      value: function _setPageCounter(totalRows, size, currentRow) {
        var content;

        if (this.pageCounter) {
          if (this.mode === "remote") {
            size = this.size;
            currentRow = (this.page - 1) * this.size + 1;
            totalRows = this.remoteRowCountEstimate;
          }

          content = this.pageCounter.call(this, size, currentRow, this.page, totalRows, this.max);

          switch (_typeof(content)) {
            case "object":
              if (content instanceof Node) {
                //clear previous cell contents
                while (this.pageCounterElement.firstChild) {
                  this.pageCounterElement.removeChild(this.pageCounterElement.firstChild);
                }

                this.pageCounterElement.appendChild(content);
              } else {
                this.pageCounterElement.innerHTML = "";

                if (content != null) {
                  console.warn("Page Counter Error - Page Counter has returned a type of object, the only valid page counter object return is an instance of Node, the page counter returned:", content);
                }
              }

              break;

            case "undefined":
              this.pageCounterElement.innerHTML = "";
              break;

            default:
              this.pageCounterElement.innerHTML = content;
          }
        }
      } //setup the pagination buttons

    }, {
      key: "_setPageButtons",
      value: function _setPageButtons() {
        var leftSize = Math.floor((this.count - 1) / 2);
        var rightSize = Math.ceil((this.count - 1) / 2);
        var min = this.max - this.page + leftSize + 1 < this.count ? this.max - this.count + 1 : Math.max(this.page - leftSize, 1);
        var max = this.page <= rightSize ? Math.min(this.count, this.max) : Math.min(this.page + rightSize, this.max);

        while (this.pagesElement.firstChild) {
          this.pagesElement.removeChild(this.pagesElement.firstChild);
        }

        if (this.page == 1) {
          this.firstBut.disabled = true;
          this.prevBut.disabled = true;
        } else {
          this.firstBut.disabled = false;
          this.prevBut.disabled = false;
        }

        if (this.page == this.max) {
          this.lastBut.disabled = true;
          this.nextBut.disabled = true;
        } else {
          this.lastBut.disabled = false;
          this.nextBut.disabled = false;
        }

        for (var i = min; i <= max; i++) {
          if (i > 0 && i <= this.max) {
            this.pagesElement.appendChild(this._generatePageButton(i));
          }
        }

        this.footerRedraw();
      }
    }, {
      key: "_generatePageButton",
      value: function _generatePageButton(page) {
        var _this4 = this;

        var button = document.createElement("button");
        button.classList.add("tabulator-page");

        if (page == this.page) {
          button.classList.add("active");
        }

        button.setAttribute("type", "button");
        button.setAttribute("role", "button");
        this.langBind("pagination|page_title", function (value) {
          button.setAttribute("aria-label", value + " " + page);
          button.setAttribute("title", value + " " + page);
        });
        button.setAttribute("data-page", page);
        button.textContent = page;
        button.addEventListener("click", function (e) {
          _this4.setPage(page);
        });
        return button;
      } //previous page

    }, {
      key: "previousPage",
      value: function previousPage() {
        if (this.page > 1) {
          this.page--;
          this.trackChanges();
          return this.trigger();
        } else {
          console.warn("Pagination Error - Previous page would be less than page 1:", 0);
          return Promise.reject();
        }
      } //next page

    }, {
      key: "nextPage",
      value: function nextPage() {
        if (this.page < this.max) {
          this.page++;
          this.trackChanges();
          return this.trigger();
        } else {
          if (!this.progressiveLoad) {
            console.warn("Pagination Error - Next page would be greater than maximum page of " + this.max + ":", this.max + 1);
          }

          return Promise.reject();
        }
      } //return current page number

    }, {
      key: "getPage",
      value: function getPage() {
        return this.page;
      } //return max page number

    }, {
      key: "getPageMax",
      value: function getPageMax() {
        return this.max;
      }
    }, {
      key: "getPageSize",
      value: function getPageSize(size) {
        return this.size;
      }
    }, {
      key: "getMode",
      value: function getMode() {
        return this.mode;
      } //return appropriate rows for current page

    }, {
      key: "getRows",
      value: function getRows(data) {
        var actualRowPageSize = 0,
            output,
            start,
            end,
            actualStartRow;
        var actualRows = data.filter(function (row) {
          return row.type === "row";
        });

        if (this.mode == "local") {
          output = [];
          this.setMaxRows(data.length);

          if (this.size === true) {
            start = 0;
            end = data.length;
          } else {
            start = this.size * (this.page - 1);
            end = start + parseInt(this.size);
          }

          this._setPageButtons();

          for (var i = start; i < end; i++) {
            var row = data[i];

            if (row) {
              output.push(row);

              if (row.type === "row") {
                if (!actualStartRow) {
                  actualStartRow = row;
                }

                actualRowPageSize++;
              }
            }
          }

          this._setPageCounter(actualRows.length, actualRowPageSize, actualStartRow ? actualRows.indexOf(actualStartRow) + 1 : 0);

          return output;
        } else {
          this._setPageButtons();

          this._setPageCounter(actualRows.length);

          return data.slice(0);
        }
      }
    }, {
      key: "trigger",
      value: function trigger() {
        var _this5 = this;

        var left;

        switch (this.mode) {
          case "local":
            left = this.table.rowManager.scrollLeft;
            this.refreshData();
            this.table.rowManager.scrollHorizontal(left);
            this.dispatchExternal("pageLoaded", this.getPage());
            return Promise.resolve();

          case "remote":
            this.dataChanging = true;
            return this.reloadData(null)["finally"](function () {
              _this5.dataChanging = false;
            });

          case "progressive_load":
          case "progressive_scroll":
            return this.reloadData(null, true);

          default:
            console.warn("Pagination Error - no such pagination mode:", this.mode);
            return Promise.reject();
        }
      }
    }, {
      key: "_parseRemoteData",
      value: function _parseRemoteData(data) {
        var _this6 = this;

        var data, margin;

        if (typeof data.last_page === "undefined") {
          console.warn("Remote Pagination Error - Server response missing '" + (this.options("dataReceiveParams").last_page || "last_page") + "' property");
        }

        if (data.data) {
          this.max = parseInt(data.last_page) || 1;
          this.remoteRowCountEstimate = typeof data.last_row !== "undefined" ? data.last_row : data.last_page * this.size - (this.page == data.last_page ? this.size - data.data.length : 0);

          if (this.progressiveLoad) {
            switch (this.mode) {
              case "progressive_load":
                if (this.page == 1) {
                  this.table.rowManager.setData(data.data, false, this.page == 1);
                } else {
                  this.table.rowManager.addRows(data.data);
                }

                if (this.page < this.max) {
                  setTimeout(function () {
                    _this6.nextPage();
                  }, this.table.options.progressiveLoadDelay);
                }

                break;

              case "progressive_scroll":
                data = this.page === 1 ? data.data : this.table.rowManager.getData().concat(data.data);
                this.table.rowManager.setData(data, this.page !== 1, this.page == 1);
                margin = this.table.options.progressiveLoadScrollMargin || this.table.rowManager.element.clientHeight * 2;

                if (this.table.rowManager.element.scrollHeight <= this.table.rowManager.element.clientHeight + margin) {
                  if (this.page < this.max) {
                    setTimeout(function () {
                      _this6.nextPage();
                    });
                  }
                }

                break;
            }

            return false;
          } else {
            // left = this.table.rowManager.scrollLeft;
            this.dispatchExternal("pageLoaded", this.getPage()); // this.table.rowManager.scrollHorizontal(left);
            // this.table.columnManager.scrollHorizontal(left);
          }
        } else {
          console.warn("Remote Pagination Error - Server response missing '" + (this.options("dataReceiveParams").data || "data") + "' property");
        }

        return data.data;
      } //handle the footer element being redrawn

    }, {
      key: "footerRedraw",
      value: function footerRedraw() {
        var footer = this.table.footerManager.containerElement;

        if (Math.ceil(footer.clientWidth) - footer.scrollWidth < 0) {
          this.pagesElement.style.display = 'none';
        } else {
          this.pagesElement.style.display = '';

          if (Math.ceil(footer.clientWidth) - footer.scrollWidth < 0) {
            this.pagesElement.style.display = 'none';
          }
        }
      }
    }]);

    return Page;
  }(Module);

  Page.moduleName = "page"; //load defaults

  Page.pageCounters = defaultPageCounters;

  // read peristence information from storage
  var defaultReaders = {
    local: function local(id, type) {
      var data = localStorage.getItem(id + "-" + type);
      return data ? JSON.parse(data) : false;
    },
    cookie: function cookie(id, type) {
      var cookie = document.cookie,
          key = id + "-" + type,
          cookiePos = cookie.indexOf(key + "="),
          end,
          data; //if cookie exists, decode and load column data into tabulator

      if (cookiePos > -1) {
        cookie = cookie.slice(cookiePos);
        end = cookie.indexOf(";");

        if (end > -1) {
          cookie = cookie.slice(0, end);
        }

        data = cookie.replace(key + "=", "");
      }

      return data ? JSON.parse(data) : false;
    }
  };

  //write persistence information to storage
  var defaultWriters = {
    local: function local(id, type, data) {
      localStorage.setItem(id + "-" + type, JSON.stringify(data));
    },
    cookie: function cookie(id, type, data) {
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 10000);
      document.cookie = id + "-" + type + "=" + JSON.stringify(data) + "; expires=" + expireDate.toUTCString();
    }
  };

  var Persistence = /*#__PURE__*/function (_Module) {
    _inherits(Persistence, _Module);

    var _super = _createSuper(Persistence);

    function Persistence(table) {
      var _this;

      _classCallCheck(this, Persistence);

      _this = _super.call(this, table);
      _this.mode = "";
      _this.id = ""; // this.persistProps = ["field", "width", "visible"];

      _this.defWatcherBlock = false;
      _this.config = {};
      _this.readFunc = false;
      _this.writeFunc = false;

      _this.registerTableOption("persistence", false);

      _this.registerTableOption("persistenceID", ""); //key for persistent storage


      _this.registerTableOption("persistenceMode", true); //mode for storing persistence information


      _this.registerTableOption("persistenceReaderFunc", false); //function for handling persistence data reading


      _this.registerTableOption("persistenceWriterFunc", false); //function for handling persistence data writing


      return _this;
    } // Test for whether localStorage is available for use.


    _createClass(Persistence, [{
      key: "localStorageTest",
      value: function localStorageTest() {
        var testKey = "_tabulator_test";

        try {
          window.localStorage.setItem(testKey, testKey);
          window.localStorage.removeItem(testKey);
          return true;
        } catch (e) {
          return false;
        }
      } //setup parameters

    }, {
      key: "initialize",
      value: function initialize() {
        if (this.table.options.persistence) {
          //determine persistent layout storage type
          var mode = this.table.options.persistenceMode,
              id = this.table.options.persistenceID,
              retreivedData;
          this.mode = mode !== true ? mode : this.localStorageTest() ? "local" : "cookie";

          if (this.table.options.persistenceReaderFunc) {
            if (typeof this.table.options.persistenceReaderFunc === "function") {
              this.readFunc = this.table.options.persistenceReaderFunc;
            } else {
              if (Persistence.readers[this.table.options.persistenceReaderFunc]) {
                this.readFunc = Persistence.readers[this.table.options.persistenceReaderFunc];
              } else {
                console.warn("Persistence Read Error - invalid reader set", this.table.options.persistenceReaderFunc);
              }
            }
          } else {
            if (Persistence.readers[this.mode]) {
              this.readFunc = Persistence.readers[this.mode];
            } else {
              console.warn("Persistence Read Error - invalid reader set", this.mode);
            }
          }

          if (this.table.options.persistenceWriterFunc) {
            if (typeof this.table.options.persistenceWriterFunc === "function") {
              this.writeFunc = this.table.options.persistenceWriterFunc;
            } else {
              if (Persistence.writers[this.table.options.persistenceWriterFunc]) {
                this.writeFunc = Persistence.writers[this.table.options.persistenceWriterFunc];
              } else {
                console.warn("Persistence Write Error - invalid reader set", this.table.options.persistenceWriterFunc);
              }
            }
          } else {
            if (Persistence.writers[this.mode]) {
              this.writeFunc = Persistence.writers[this.mode];
            } else {
              console.warn("Persistence Write Error - invalid writer set", this.mode);
            }
          } //set storage tag


          this.id = "tabulator-" + (id || this.table.element.getAttribute("id") || "");
          this.config = {
            sort: this.table.options.persistence === true || this.table.options.persistence.sort,
            filter: this.table.options.persistence === true || this.table.options.persistence.filter,
            group: this.table.options.persistence === true || this.table.options.persistence.group,
            page: this.table.options.persistence === true || this.table.options.persistence.page,
            columns: this.table.options.persistence === true ? ["title", "width", "visible"] : this.table.options.persistence.columns
          }; //load pagination data if needed

          if (this.config.page) {
            retreivedData = this.retreiveData("page");

            if (retreivedData) {
              if (typeof retreivedData.paginationSize !== "undefined" && (this.config.page === true || this.config.page.size)) {
                this.table.options.paginationSize = retreivedData.paginationSize;
              }

              if (typeof retreivedData.paginationInitialPage !== "undefined" && (this.config.page === true || this.config.page.page)) {
                this.table.options.paginationInitialPage = retreivedData.paginationInitialPage;
              }
            }
          } //load group data if needed


          if (this.config.group) {
            retreivedData = this.retreiveData("group");

            if (retreivedData) {
              if (typeof retreivedData.groupBy !== "undefined" && (this.config.group === true || this.config.group.groupBy)) {
                this.table.options.groupBy = retreivedData.groupBy;
              }

              if (typeof retreivedData.groupStartOpen !== "undefined" && (this.config.group === true || this.config.group.groupStartOpen)) {
                this.table.options.groupStartOpen = retreivedData.groupStartOpen;
              }

              if (typeof retreivedData.groupHeader !== "undefined" && (this.config.group === true || this.config.group.groupHeader)) {
                this.table.options.groupHeader = retreivedData.groupHeader;
              }
            }
          }

          if (this.config.columns) {
            this.table.options.columns = this.load("columns", this.table.options.columns);
            this.subscribe("column-init", this.initializeColumn.bind(this));
            this.subscribe("column-show", this.save.bind(this, "columns"));
            this.subscribe("column-hide", this.save.bind(this, "columns"));
            this.subscribe("column-moved", this.save.bind(this, "columns"));
          }

          this.subscribe("table-built", this.tableBuilt.bind(this), 0);
          this.subscribe("table-redraw", this.tableRedraw.bind(this));
          this.subscribe("filter-changed", this.eventSave.bind(this, "filter"));
          this.subscribe("sort-changed", this.eventSave.bind(this, "sort"));
          this.subscribe("group-changed", this.eventSave.bind(this, "group"));
          this.subscribe("page-changed", this.eventSave.bind(this, "page"));
          this.subscribe("column-resized", this.eventSave.bind(this, "columns"));
          this.subscribe("layout-refreshed", this.eventSave.bind(this, "columns"));
        }

        this.registerTableFunction("getColumnLayout", this.getColumnLayout.bind(this));
        this.registerTableFunction("setColumnLayout", this.setColumnLayout.bind(this));
      }
    }, {
      key: "eventSave",
      value: function eventSave(type) {
        if (this.config[type]) {
          this.save(type);
        }
      }
    }, {
      key: "tableBuilt",
      value: function tableBuilt() {
        var options = this.table.options,
            sorters,
            filters;

        if (this.config.sort) {
          sorters = this.load("sort");

          if (!sorters === false) {
            this.table.options.initialSort = sorters;
          }
        }

        if (this.config.filter) {
          filters = this.load("filter");

          if (!filters === false) {
            this.table.options.initialFilter = filters;
          }
        }
      }
    }, {
      key: "tableRedraw",
      value: function tableRedraw(force) {
        if (force && this.config.columns) {
          this.save("columns");
        }
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////

    }, {
      key: "getColumnLayout",
      value: function getColumnLayout() {
        return this.parseColumns(this.table.columnManager.getColumns());
      }
    }, {
      key: "setColumnLayout",
      value: function setColumnLayout(layout) {
        this.table.columnManager.setColumns(this.mergeDefinition(this.table.options.columns, layout));
        return true;
      } ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var def, keys;

        if (this.config.columns) {
          this.defWatcherBlock = true;
          def = column.getDefinition();
          keys = this.config.columns === true ? Object.keys(def) : this.config.columns;
          keys.forEach(function (key) {
            var props = Object.getOwnPropertyDescriptor(def, key);
            var value = def[key];

            if (props) {
              Object.defineProperty(def, key, {
                set: function set(newValue) {
                  value = newValue;

                  if (!this.defWatcherBlock) {
                    this.save("columns");
                  }

                  if (props.set) {
                    props.set(newValue);
                  }
                },
                get: function get() {
                  if (props.get) {
                    props.get();
                  }

                  return value;
                }
              });
            }
          });
          this.defWatcherBlock = false;
        }
      } //load saved definitions

    }, {
      key: "load",
      value: function load(type, current) {
        var data = this.retreiveData(type);

        if (current) {
          data = data ? this.mergeDefinition(current, data) : current;
        }

        return data;
      } //retreive data from memory

    }, {
      key: "retreiveData",
      value: function retreiveData(type) {
        return this.readFunc ? this.readFunc(this.id, type) : false;
      } //merge old and new column definitions

    }, {
      key: "mergeDefinition",
      value: function mergeDefinition(oldCols, newCols) {
        var _this2 = this;

        var output = [];
        newCols = newCols || [];
        newCols.forEach(function (column, to) {
          var from = _this2._findColumn(oldCols, column),
              keys;

          if (from) {
            if (_this2.config.columns === true || _this2.config.columns == undefined) {
              keys = Object.keys(from);
              keys.push("width");
            } else {
              keys = _this2.config.columns;
            }

            keys.forEach(function (key) {
              if (key !== "columns" && typeof column[key] !== "undefined") {
                from[key] = column[key];
              }
            });

            if (from.columns) {
              from.columns = _this2.mergeDefinition(from.columns, column.columns);
            }

            output.push(from);
          }
        });
        oldCols.forEach(function (column, i) {
          var from = _this2._findColumn(newCols, column);

          if (!from) {
            if (output.length > i) {
              output.splice(i, 0, column);
            } else {
              output.push(column);
            }
          }
        });
        return output;
      } //find matching columns

    }, {
      key: "_findColumn",
      value: function _findColumn(columns, subject) {
        var type = subject.columns ? "group" : subject.field ? "field" : "object";
        return columns.find(function (col) {
          switch (type) {
            case "group":
              return col.title === subject.title && col.columns.length === subject.columns.length;

            case "field":
              return col.field === subject.field;

            case "object":
              return col === subject;
          }
        });
      } //save data

    }, {
      key: "save",
      value: function save(type) {
        var data = {};

        switch (type) {
          case "columns":
            data = this.parseColumns(this.table.columnManager.getColumns());
            break;

          case "filter":
            data = this.table.modules.filter.getFilters();
            break;

          case "sort":
            data = this.validateSorters(this.table.modules.sort.getSort());
            break;

          case "group":
            data = this.getGroupConfig();
            break;

          case "page":
            data = this.getPageConfig();
            break;
        }

        if (this.writeFunc) {
          this.writeFunc(this.id, type, data);
        }
      } //ensure sorters contain no function data

    }, {
      key: "validateSorters",
      value: function validateSorters(data) {
        data.forEach(function (item) {
          item.column = item.field;
          delete item.field;
        });
        return data;
      }
    }, {
      key: "getGroupConfig",
      value: function getGroupConfig() {
        var data = {};

        if (this.config.group) {
          if (this.config.group === true || this.config.group.groupBy) {
            data.groupBy = this.table.options.groupBy;
          }

          if (this.config.group === true || this.config.group.groupStartOpen) {
            data.groupStartOpen = this.table.options.groupStartOpen;
          }

          if (this.config.group === true || this.config.group.groupHeader) {
            data.groupHeader = this.table.options.groupHeader;
          }
        }

        return data;
      }
    }, {
      key: "getPageConfig",
      value: function getPageConfig() {
        var data = {};

        if (this.config.page) {
          if (this.config.page === true || this.config.page.size) {
            data.paginationSize = this.table.modules.page.getPageSize();
          }

          if (this.config.page === true || this.config.page.page) {
            data.paginationInitialPage = this.table.modules.page.getPage();
          }
        }

        return data;
      } //parse columns for data to store

    }, {
      key: "parseColumns",
      value: function parseColumns(columns) {
        var _this3 = this;

        var definitions = [],
            excludedKeys = ["headerContextMenu", "headerMenu", "contextMenu", "clickMenu"];
        columns.forEach(function (column) {
          var defStore = {},
              colDef = column.getDefinition(),
              keys;

          if (column.isGroup) {
            defStore.title = colDef.title;
            defStore.columns = _this3.parseColumns(column.getColumns());
          } else {
            defStore.field = column.getField();

            if (_this3.config.columns === true || _this3.config.columns == undefined) {
              keys = Object.keys(colDef);
              keys.push("width");
              keys.push("visible");
            } else {
              keys = _this3.config.columns;
            }

            keys.forEach(function (key) {
              switch (key) {
                case "width":
                  defStore.width = column.getWidth();
                  break;

                case "visible":
                  defStore.visible = column.visible;
                  break;

                default:
                  if (typeof colDef[key] !== "function" && excludedKeys.indexOf(key) === -1) {
                    defStore[key] = colDef[key];
                  }

              }
            });
          }

          definitions.push(defStore);
        });
        return definitions;
      }
    }]);

    return Persistence;
  }(Module);

  Persistence.moduleName = "persistence";
  Persistence.moduleInitOrder = -10; //load defaults

  Persistence.readers = defaultReaders;
  Persistence.writers = defaultWriters;

  var Popup$1 = /*#__PURE__*/function (_Module) {
    _inherits(Popup, _Module);

    var _super = _createSuper(Popup);

    function Popup(table) {
      var _this;

      _classCallCheck(this, Popup);

      _this = _super.call(this, table);
      _this.columnSubscribers = {};

      _this.registerTableOption("rowContextPopup", false);

      _this.registerTableOption("rowClickPopup", false);

      _this.registerTableOption("groupContextPopup", false);

      _this.registerTableOption("groupClickPopup", false);

      _this.registerColumnOption("headerContextPopup");

      _this.registerColumnOption("headerClickPopup");

      _this.registerColumnOption("headerPopup");

      _this.registerColumnOption("headerPopupIcon");

      _this.registerColumnOption("contextPopup");

      _this.registerColumnOption("clickPopup");

      return _this;
    }

    _createClass(Popup, [{
      key: "initialize",
      value: function initialize() {
        this.initializeRowWatchers();
        this.initializeGroupWatchers();
        this.subscribe("column-init", this.initializeColumn.bind(this));
      }
    }, {
      key: "initializeRowWatchers",
      value: function initializeRowWatchers() {
        if (this.table.options.rowContextPopup) {
          this.subscribe("row-contextmenu", this.loadPopupEvent.bind(this, this.table.options.rowContextPopup));
          this.table.on("rowTapHold", this.loadPopupEvent.bind(this, this.table.options.rowContextPopup));
        }

        if (this.table.options.rowClickPopup) {
          this.subscribe("row-click", this.loadPopupEvent.bind(this, this.table.options.rowClickPopup));
        }
      }
    }, {
      key: "initializeGroupWatchers",
      value: function initializeGroupWatchers() {
        if (this.table.options.groupContextPopup) {
          this.subscribe("group-contextmenu", this.loadPopupEvent.bind(this, this.table.options.groupContextPopup));
          this.table.on("groupTapHold", this.loadPopupEvent.bind(this, this.table.options.groupContextPopup));
        }

        if (this.table.options.groupClickPopup) {
          this.subscribe("group-click", this.loadPopupEvent.bind(this, this.table.options.groupClickPopup));
        }
      }
    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var def = column.definition; //handle column events

        if (def.headerContextPopup && !this.columnSubscribers.headerContextPopup) {
          this.columnSubscribers.headerContextPopup = this.loadPopupTableColumnEvent.bind(this, "headerContextPopup");
          this.subscribe("column-contextmenu", this.columnSubscribers.headerContextPopup);
          this.table.on("headerTapHold", this.loadPopupTableColumnEvent.bind(this, "headerContextPopup"));
        }

        if (def.headerClickPopup && !this.columnSubscribers.headerClickPopup) {
          this.columnSubscribers.headerClickPopup = this.loadPopupTableColumnEvent.bind(this, "headerClickPopup");
          this.subscribe("column-click", this.columnSubscribers.headerClickPopup);
        }

        if (def.headerPopup) {
          this.initializeColumnHeaderPopup(column);
        } //handle cell events


        if (def.contextPopup && !this.columnSubscribers.contextPopup) {
          this.columnSubscribers.contextPopup = this.loadPopupTableCellEvent.bind(this, "contextPopup");
          this.subscribe("cell-contextmenu", this.columnSubscribers.contextPopup);
          this.table.on("cellTapHold", this.loadPopupTableCellEvent.bind(this, "contextPopup"));
        }

        if (def.clickPopup && !this.columnSubscribers.clickPopup) {
          this.columnSubscribers.clickPopup = this.loadPopupTableCellEvent.bind(this, "clickPopup");
          this.subscribe("cell-click", this.columnSubscribers.clickPopup);
        }
      }
    }, {
      key: "initializeColumnHeaderPopup",
      value: function initializeColumnHeaderPopup(column) {
        var _this2 = this;

        var icon = column.definition.headerPopupIcon,
            headerPopupEl;
        headerPopupEl = document.createElement("span");
        headerPopupEl.classList.add("tabulator-header-popup-button");

        if (icon) {
          if (typeof icon === "function") {
            icon = icon(column.getComponent());
          }

          if (icon instanceof HTMLElement) {
            headerPopupEl.appendChild(icon);
          } else {
            headerPopupEl.innerHTML = icon;
          }
        } else {
          headerPopupEl.innerHTML = "&vellip;";
        }

        headerPopupEl.addEventListener("click", function (e) {
          e.stopPropagation();
          e.preventDefault();

          _this2.loadPopupEvent(column.definition.headerPopup, e, column);
        });
        column.titleElement.insertBefore(headerPopupEl, column.titleElement.firstChild);
      }
    }, {
      key: "loadPopupTableCellEvent",
      value: function loadPopupTableCellEvent(option, e, cell) {
        if (cell._cell) {
          cell = cell._cell;
        }

        if (cell.column.definition[option]) {
          this.loadPopupEvent(cell.column.definition[option], e, cell);
        }
      }
    }, {
      key: "loadPopupTableColumnEvent",
      value: function loadPopupTableColumnEvent(option, e, column) {
        if (column._column) {
          column = column._column;
        }

        if (column.definition[option]) {
          this.loadPopupEvent(column.definition[option], e, column);
        }
      }
    }, {
      key: "loadPopupEvent",
      value: function loadPopupEvent(contents, e, component) {
        var renderedCallback;

        function onRendered(callback) {
          renderedCallback = callback;
        }

        if (component._group) {
          component = component._group;
        } else if (component._row) {
          component = component._row;
        }

        contents = typeof contents == "function" ? contents.call(this.table, e, component.getComponent(), onRendered) : contents;
        this.loadPopup(e, component, contents, renderedCallback);
      }
    }, {
      key: "loadPopup",
      value: function loadPopup(e, component, contents, renderedCallback) {
        var _this3 = this;

        var touch = !(e instanceof MouseEvent),
            contentsEl,
            popup;

        if (contents instanceof HTMLElement) {
          contentsEl = contents;
        } else {
          contentsEl = document.createElement("div");
          contentsEl.innerHTML = contents;
        }

        contentsEl.classList.add("tabulator-popup");
        contentsEl.addEventListener("click", function (e) {
          e.stopPropagation();
        });

        if (!touch) {
          e.preventDefault();
        }

        popup = this.popup(contentsEl);

        if (typeof renderedCallback === "function") {
          popup.renderCallback(renderedCallback);
        }

        popup.show(e).hideOnBlur(function () {
          _this3.dispatchExternal("popupClosed", component.getComponent());
        });
        this.dispatchExternal("popupOpened", component.getComponent());
      }
    }]);

    return Popup;
  }(Module);

  Popup$1.moduleName = "popup";

  var Print = /*#__PURE__*/function (_Module) {
    _inherits(Print, _Module);

    var _super = _createSuper(Print);

    function Print(table) {
      var _this;

      _classCallCheck(this, Print);

      _this = _super.call(this, table);
      _this.element = false;
      _this.manualBlock = false;

      _this.registerTableOption("printAsHtml", false); //enable print as html


      _this.registerTableOption("printFormatter", false); //printing page formatter


      _this.registerTableOption("printHeader", false); //page header contents


      _this.registerTableOption("printFooter", false); //page footer contents


      _this.registerTableOption("printStyled", true); //enable print as html styling


      _this.registerTableOption("printRowRange", "visible"); //restrict print to visible rows only


      _this.registerTableOption("printConfig", {}); //print config options


      _this.registerColumnOption("print");

      _this.registerColumnOption("titlePrint");

      return _this;
    }

    _createClass(Print, [{
      key: "initialize",
      value: function initialize() {
        if (this.table.options.printAsHtml) {
          window.addEventListener("beforeprint", this.replaceTable.bind(this));
          window.addEventListener("afterprint", this.cleanup.bind(this));
        }

        this.registerTableFunction("print", this.printFullscreen.bind(this));
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////

    }, {
      key: "replaceTable",
      value: function replaceTable() {
        if (!this.manualBlock) {
          this.element = document.createElement("div");
          this.element.classList.add("tabulator-print-table");
          this.element.appendChild(this.table.modules["export"].genereateTable(this.table.options.printConfig, this.table.options.printStyled, this.table.options.printRowRange, "print"));
          this.table.element.style.display = "none";
          this.table.element.parentNode.insertBefore(this.element, this.table.element);
        }
      }
    }, {
      key: "cleanup",
      value: function cleanup() {
        document.body.classList.remove("tabulator-print-fullscreen-hide");

        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
          this.table.element.style.display = "";
        }
      }
    }, {
      key: "printFullscreen",
      value: function printFullscreen(visible, style, config) {
        var scrollX = window.scrollX,
            scrollY = window.scrollY,
            headerEl = document.createElement("div"),
            footerEl = document.createElement("div"),
            tableEl = this.table.modules["export"].genereateTable(typeof config != "undefined" ? config : this.table.options.printConfig, typeof style != "undefined" ? style : this.table.options.printStyled, visible || this.table.options.printRowRange, "print"),
            headerContent,
            footerContent;
        this.manualBlock = true;
        this.element = document.createElement("div");
        this.element.classList.add("tabulator-print-fullscreen");

        if (this.table.options.printHeader) {
          headerEl.classList.add("tabulator-print-header");
          headerContent = typeof this.table.options.printHeader == "function" ? this.table.options.printHeader.call(this.table) : this.table.options.printHeader;

          if (typeof headerContent == "string") {
            headerEl.innerHTML = headerContent;
          } else {
            headerEl.appendChild(headerContent);
          }

          this.element.appendChild(headerEl);
        }

        this.element.appendChild(tableEl);

        if (this.table.options.printFooter) {
          footerEl.classList.add("tabulator-print-footer");
          footerContent = typeof this.table.options.printFooter == "function" ? this.table.options.printFooter.call(this.table) : this.table.options.printFooter;

          if (typeof footerContent == "string") {
            footerEl.innerHTML = footerContent;
          } else {
            footerEl.appendChild(footerContent);
          }

          this.element.appendChild(footerEl);
        }

        document.body.classList.add("tabulator-print-fullscreen-hide");
        document.body.appendChild(this.element);

        if (this.table.options.printFormatter) {
          this.table.options.printFormatter(this.element, tableEl);
        }

        window.print();
        this.cleanup();
        window.scrollTo(scrollX, scrollY);
        this.manualBlock = false;
      }
    }]);

    return Print;
  }(Module);

  Print.moduleName = "print";

  var ReactiveData = /*#__PURE__*/function (_Module) {
    _inherits(ReactiveData, _Module);

    var _super = _createSuper(ReactiveData);

    function ReactiveData(table) {
      var _this;

      _classCallCheck(this, ReactiveData);

      _this = _super.call(this, table);
      _this.data = false;
      _this.blocked = false; //block reactivity while performing update

      _this.origFuncs = {}; // hold original data array functions to allow replacement after data is done with

      _this.currentVersion = 0;

      _this.registerTableOption("reactiveData", false); //enable data reactivity


      return _this;
    }

    _createClass(ReactiveData, [{
      key: "initialize",
      value: function initialize() {
        if (this.table.options.reactiveData) {
          this.subscribe("cell-value-save-before", this.block.bind(this));
          this.subscribe("cell-value-save-after", this.unblock.bind(this));
          this.subscribe("row-data-save-before", this.block.bind(this));
          this.subscribe("row-data-save-after", this.unblock.bind(this));
          this.subscribe("row-data-init-after", this.watchRow.bind(this));
          this.subscribe("data-processing", this.watchData.bind(this));
          this.subscribe("table-destroy", this.unwatchData.bind(this));
        }
      }
    }, {
      key: "watchData",
      value: function watchData(data) {
        var self = this,
            version;
        this.currentVersion++;
        version = this.currentVersion;
        this.unwatchData();
        this.data = data; //override array push function

        this.origFuncs.push = data.push;
        Object.defineProperty(this.data, "push", {
          enumerable: false,
          configurable: true,
          value: function value() {
            var args = Array.from(arguments);

            if (!self.blocked && version === self.currentVersion) {
              args.forEach(function (arg) {
                self.table.rowManager.addRowActual(arg, false);
              });
            }

            return self.origFuncs.push.apply(data, arguments);
          }
        }); //override array unshift function

        this.origFuncs.unshift = data.unshift;
        Object.defineProperty(this.data, "unshift", {
          enumerable: false,
          configurable: true,
          value: function value() {
            var args = Array.from(arguments);

            if (!self.blocked && version === self.currentVersion) {
              args.forEach(function (arg) {
                self.table.rowManager.addRowActual(arg, true);
              });
            }

            return self.origFuncs.unshift.apply(data, arguments);
          }
        }); //override array shift function

        this.origFuncs.shift = data.shift;
        Object.defineProperty(this.data, "shift", {
          enumerable: false,
          configurable: true,
          value: function value() {
            var row;

            if (!self.blocked && version === self.currentVersion) {
              if (self.data.length) {
                row = self.table.rowManager.getRowFromDataObject(self.data[0]);

                if (row) {
                  row.deleteActual();
                }
              }
            }

            return self.origFuncs.shift.call(data);
          }
        }); //override array pop function

        this.origFuncs.pop = data.pop;
        Object.defineProperty(this.data, "pop", {
          enumerable: false,
          configurable: true,
          value: function value() {
            var row;

            if (!self.blocked && version === self.currentVersion) {
              if (self.data.length) {
                row = self.table.rowManager.getRowFromDataObject(self.data[self.data.length - 1]);

                if (row) {
                  row.deleteActual();
                }
              }
            }

            return self.origFuncs.pop.call(data);
          }
        }); //override array splice function

        this.origFuncs.splice = data.splice;
        Object.defineProperty(this.data, "splice", {
          enumerable: false,
          configurable: true,
          value: function value() {
            var args = Array.from(arguments),
                start = args[0] < 0 ? data.length + args[0] : args[0],
                end = args[1],
                newRows = args[2] ? args.slice(2) : false,
                startRow;

            if (!self.blocked && version === self.currentVersion) {
              //add new rows
              if (newRows) {
                startRow = data[start] ? self.table.rowManager.getRowFromDataObject(data[start]) : false;

                if (startRow) {
                  newRows.forEach(function (rowData) {
                    self.table.rowManager.addRowActual(rowData, true, startRow, true);
                  });
                } else {
                  newRows = newRows.slice().reverse();
                  newRows.forEach(function (rowData) {
                    self.table.rowManager.addRowActual(rowData, true, false, true);
                  });
                }
              } //delete removed rows


              if (end !== 0) {
                var oldRows = data.slice(start, typeof args[1] === "undefined" ? args[1] : start + end);
                oldRows.forEach(function (rowData, i) {
                  var row = self.table.rowManager.getRowFromDataObject(rowData);

                  if (row) {
                    row.deleteActual(i !== oldRows.length - 1);
                  }
                });
              }

              if (newRows || end !== 0) {
                self.table.rowManager.reRenderInPosition();
              }
            }

            return self.origFuncs.splice.apply(data, arguments);
          }
        });
      }
    }, {
      key: "unwatchData",
      value: function unwatchData() {
        if (this.data !== false) {
          for (var key in this.origFuncs) {
            Object.defineProperty(this.data, key, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: this.origFuncs.key
            });
          }
        }
      }
    }, {
      key: "watchRow",
      value: function watchRow(row) {
        var data = row.getData();
        this.blocked = true;

        for (var key in data) {
          this.watchKey(row, data, key);
        }

        if (this.table.options.dataTree) {
          this.watchTreeChildren(row);
        }

        this.blocked = false;
      }
    }, {
      key: "watchTreeChildren",
      value: function watchTreeChildren(row) {
        var _arguments = arguments;
        var childField = row.getData()[this.table.options.dataTreeChildField],
            origFuncs = {};

        function rebuildTree() {
          this.table.modules.dataTree.initializeRow(row);
          this.table.modules.dataTree.layoutRow(row);
          this.table.rowManager.refreshActiveData("tree", false, true);
        }

        if (childField) {
          origFuncs.push = childField.push;
          Object.defineProperty(childField, "push", {
            enumerable: false,
            configurable: true,
            value: function value() {
              var result = origFuncs.push.apply(childField, _arguments);
              rebuildTree();
              return result;
            }
          });
          origFuncs.unshift = childField.unshift;
          Object.defineProperty(childField, "unshift", {
            enumerable: false,
            configurable: true,
            value: function value() {
              var result = origFuncs.unshift.apply(childField, _arguments);
              rebuildTree();
              return result;
            }
          });
          origFuncs.shift = childField.shift;
          Object.defineProperty(childField, "shift", {
            enumerable: false,
            configurable: true,
            value: function value() {
              var result = origFuncs.shift.call(childField);
              rebuildTree();
              return result;
            }
          });
          origFuncs.pop = childField.pop;
          Object.defineProperty(childField, "pop", {
            enumerable: false,
            configurable: true,
            value: function value() {
              var result = origFuncs.pop.call(childField);
              rebuildTree();
              return result;
            }
          });
          origFuncs.splice = childField.splice;
          Object.defineProperty(childField, "splice", {
            enumerable: false,
            configurable: true,
            value: function value() {
              var result = origFuncs.splice.apply(childField, _arguments);
              rebuildTree();
              return result;
            }
          });
        }
      }
    }, {
      key: "watchKey",
      value: function watchKey(row, data, key) {
        var _this2 = this;

        var props = Object.getOwnPropertyDescriptor(data, key),
            value = data[key],
            version = this.currentVersion;
        Object.defineProperty(data, key, {
          set: function set(newValue) {
            value = newValue;

            if (!_this2.blocked && version === _this2.currentVersion) {
              var update = {};
              update[key] = newValue;
              row.updateData(update);
            }

            if (props.set) {
              props.set(newValue);
            }
          },
          get: function get() {
            if (props.get) {
              props.get();
            }

            return value;
          }
        });
      }
    }, {
      key: "unwatchRow",
      value: function unwatchRow(row) {
        var data = row.getData();

        for (var key in data) {
          Object.defineProperty(data, key, {
            value: data[key]
          });
        }
      }
    }, {
      key: "block",
      value: function block() {
        this.blocked = true;
      }
    }, {
      key: "unblock",
      value: function unblock() {
        this.blocked = false;
      }
    }]);

    return ReactiveData;
  }(Module);

  ReactiveData.moduleName = "reactiveData";

  var ResizeColumns = /*#__PURE__*/function (_Module) {
    _inherits(ResizeColumns, _Module);

    var _super = _createSuper(ResizeColumns);

    function ResizeColumns(table) {
      var _this;

      _classCallCheck(this, ResizeColumns);

      _this = _super.call(this, table);
      _this.startColumn = false;
      _this.startX = false;
      _this.startWidth = false;
      _this.latestX = false;
      _this.handle = null;
      _this.initialNextColumn = null;
      _this.nextColumn = null;
      _this.initialized = false;

      _this.registerColumnOption("resizable", true);

      _this.registerTableOption("resizableColumnFit", false);

      return _this;
    }

    _createClass(ResizeColumns, [{
      key: "initialize",
      value: function initialize() {
        this.subscribe("column-rendered", this.layoutColumnHeader.bind(this));
      }
    }, {
      key: "initializeEventWatchers",
      value: function initializeEventWatchers() {
        if (!this.initialized) {
          this.subscribe("cell-rendered", this.layoutCellHandles.bind(this));
          this.subscribe("cell-delete", this.deInitializeComponent.bind(this));
          this.subscribe("cell-height", this.resizeHandle.bind(this));
          this.subscribe("column-moved", this.columnLayoutUpdated.bind(this));
          this.subscribe("column-hide", this.deInitializeColumn.bind(this));
          this.subscribe("column-show", this.columnLayoutUpdated.bind(this));
          this.subscribe("column-width", this.columnWidthUpdated.bind(this));
          this.subscribe("column-delete", this.deInitializeComponent.bind(this));
          this.subscribe("column-height", this.resizeHandle.bind(this));
          this.initialized = true;
        }
      }
    }, {
      key: "layoutCellHandles",
      value: function layoutCellHandles(cell) {
        if (cell.row.type === "row") {
          this.deInitializeComponent(cell);
          this.initializeColumn("cell", cell, cell.column, cell.element);
        }
      }
    }, {
      key: "layoutColumnHeader",
      value: function layoutColumnHeader(column) {
        if (column.definition.resizable) {
          this.initializeEventWatchers();
          this.deInitializeComponent(column);
          this.initializeColumn("header", column, column, column.element);
        }
      }
    }, {
      key: "columnLayoutUpdated",
      value: function columnLayoutUpdated(column) {
        var prev = column.prevColumn();
        this.reinitializeColumn(column);

        if (prev) {
          this.reinitializeColumn(prev);
        }
      }
    }, {
      key: "columnWidthUpdated",
      value: function columnWidthUpdated(column) {
        var _this2 = this;

        if (column.modules.frozen) {
          if (this.table.modules.frozenColumns.leftColumns.includes(column)) {
            this.table.modules.frozenColumns.leftColumns.forEach(function (col) {
              _this2.reinitializeColumn(col);
            });
          } else if (this.table.modules.frozenColumns.rightColumns.includes(column)) {
            this.table.modules.frozenColumns.rightColumns.forEach(function (col) {
              _this2.reinitializeColumn(col);
            });
          }
        }
      }
    }, {
      key: "reinitializeColumn",
      value: function reinitializeColumn(column) {
        var frozenOffset = column.modules.frozen ? column.modules.frozen.marginValue + column.getWidth() + "px" : false;
        column.cells.forEach(function (cell) {
          if (cell.modules.resize && cell.modules.resize.handleEl) {
            if (frozenOffset) {
              cell.modules.resize.handleEl.style.left = frozenOffset;
            }

            cell.element.after(cell.modules.resize.handleEl);
          }
        });

        if (column.modules.resize && column.modules.resize.handleEl) {
          if (frozenOffset) {
            column.modules.resize.handleEl.style.left = frozenOffset;
          }

          column.element.after(column.modules.resize.handleEl);
        }
      }
    }, {
      key: "initializeColumn",
      value: function initializeColumn(type, component, column, element) {
        var self = this,
            variableHeight = false,
            mode = column.definition.resizable,
            config = {},
            nearestColumn = column.getLastColumn(); //set column resize mode

        if (type === "header") {
          variableHeight = column.definition.formatter == "textarea" || column.definition.variableHeight;
          config = {
            variableHeight: variableHeight
          };
        }

        if ((mode === true || mode == type) && this._checkResizability(nearestColumn)) {
          var handle = document.createElement('span');
          handle.className = "tabulator-col-resize-handle";
          handle.addEventListener("click", function (e) {
            e.stopPropagation();
          });

          var handleDown = function handleDown(e) {
            self.startColumn = column;
            self.initialNextColumn = self.nextColumn = nearestColumn.nextColumn();

            self._mouseDown(e, nearestColumn, handle);
          };

          handle.addEventListener("mousedown", handleDown);
          handle.addEventListener("touchstart", handleDown, {
            passive: true
          }); //resize column on  double click

          handle.addEventListener("dblclick", function (e) {
            var oldWidth = nearestColumn.getWidth();
            e.stopPropagation();
            nearestColumn.reinitializeWidth(true);

            if (oldWidth !== nearestColumn.getWidth()) {
              self.dispatch("column-resized", nearestColumn);
              self.table.externalEvents.dispatch("columnResized", nearestColumn.getComponent());
            }
          });

          if (column.modules.frozen) {
            handle.style.position = "absolute";
            handle.style.left = column.modules.frozen.marginValue + column.getWidth() + "px";
          }

          config.handleEl = handle;

          if (element.parentNode && column.visible) {
            element.after(handle);
          }
        }

        component.modules.resize = config;
      }
    }, {
      key: "deInitializeColumn",
      value: function deInitializeColumn(column) {
        var _this3 = this;

        this.deInitializeComponent(column);
        column.cells.forEach(function (cell) {
          _this3.deInitializeComponent(cell);
        });
      }
    }, {
      key: "deInitializeComponent",
      value: function deInitializeComponent(component) {
        var handleEl;

        if (component.modules.resize) {
          handleEl = component.modules.resize.handleEl;

          if (handleEl && handleEl.parentElement) {
            handleEl.parentElement.removeChild(handleEl);
          }
        }
      }
    }, {
      key: "resizeHandle",
      value: function resizeHandle(component, height) {
        if (component.modules.resize && component.modules.resize.handleEl) {
          component.modules.resize.handleEl.style.height = height;
        }
      }
    }, {
      key: "_checkResizability",
      value: function _checkResizability(column) {
        return column.definition.resizable;
      }
    }, {
      key: "_mouseDown",
      value: function _mouseDown(e, column, handle) {
        var self = this;
        self.table.element.classList.add("tabulator-block-select");

        function mouseMove(e) {
          var x = typeof e.screenX === "undefined" ? e.touches[0].screenX : e.screenX,
              startDiff = x - self.startX,
              moveDiff = x - self.latestX,
              blockedBefore,
              blockedAfter;
          self.latestX = x;

          if (self.table.rtl) {
            startDiff = -startDiff;
            moveDiff = -moveDiff;
          }

          blockedBefore = column.width == column.minWidth || column.width == column.maxWidth;
          column.setWidth(self.startWidth + startDiff);
          blockedAfter = column.width == column.minWidth || column.width == column.maxWidth;

          if (moveDiff < 0) {
            self.nextColumn = self.initialNextColumn;
          }

          if (self.table.options.resizableColumnFit && self.nextColumn && !(blockedBefore && blockedAfter)) {
            var colWidth = self.nextColumn.getWidth();

            if (moveDiff > 0) {
              if (colWidth <= self.nextColumn.minWidth) {
                self.nextColumn = self.nextColumn.nextColumn();
              }
            }

            if (self.nextColumn) {
              self.nextColumn.setWidth(self.nextColumn.getWidth() - moveDiff);
            }
          }

          self.table.columnManager.renderer.rerenderColumns(true);

          if (!self.table.browserSlow && column.modules.resize && column.modules.resize.variableHeight) {
            column.checkCellHeights();
          }
        }

        function mouseUp(e) {
          //block editor from taking action while resizing is taking place
          if (self.startColumn.modules.edit) {
            self.startColumn.modules.edit.blocked = false;
          }

          if (self.table.browserSlow && column.modules.resize && column.modules.resize.variableHeight) {
            column.checkCellHeights();
          }

          document.body.removeEventListener("mouseup", mouseUp);
          document.body.removeEventListener("mousemove", mouseMove);
          handle.removeEventListener("touchmove", mouseMove);
          handle.removeEventListener("touchend", mouseUp);
          self.table.element.classList.remove("tabulator-block-select");

          if (self.startWidth !== column.getWidth()) {
            self.dispatch("column-resized", column);
            self.table.externalEvents.dispatch("columnResized", column.getComponent());
          }
        }

        e.stopPropagation(); //prevent resize from interfereing with movable columns
        //block editor from taking action while resizing is taking place

        if (self.startColumn.modules.edit) {
          self.startColumn.modules.edit.blocked = true;
        }

        self.startX = typeof e.screenX === "undefined" ? e.touches[0].screenX : e.screenX;
        self.latestX = self.startX;
        self.startWidth = column.getWidth();
        document.body.addEventListener("mousemove", mouseMove);
        document.body.addEventListener("mouseup", mouseUp);
        handle.addEventListener("touchmove", mouseMove, {
          passive: true
        });
        handle.addEventListener("touchend", mouseUp);
      }
    }]);

    return ResizeColumns;
  }(Module);

  ResizeColumns.moduleName = "resizeColumns";

  var ResizeRows = /*#__PURE__*/function (_Module) {
    _inherits(ResizeRows, _Module);

    var _super = _createSuper(ResizeRows);

    function ResizeRows(table) {
      var _this;

      _classCallCheck(this, ResizeRows);

      _this = _super.call(this, table);
      _this.startColumn = false;
      _this.startY = false;
      _this.startHeight = false;
      _this.handle = null;
      _this.prevHandle = null;

      _this.registerTableOption("resizableRows", false); //resizable rows


      return _this;
    }

    _createClass(ResizeRows, [{
      key: "initialize",
      value: function initialize() {
        if (this.table.options.resizableRows) {
          this.subscribe("row-layout-after", this.initializeRow.bind(this));
        }
      }
    }, {
      key: "initializeRow",
      value: function initializeRow(row) {
        var self = this,
            rowEl = row.getElement();
        var handle = document.createElement('div');
        handle.className = "tabulator-row-resize-handle";
        var prevHandle = document.createElement('div');
        prevHandle.className = "tabulator-row-resize-handle prev";
        handle.addEventListener("click", function (e) {
          e.stopPropagation();
        });

        var handleDown = function handleDown(e) {
          self.startRow = row;

          self._mouseDown(e, row, handle);
        };

        handle.addEventListener("mousedown", handleDown);
        handle.addEventListener("touchstart", handleDown, {
          passive: true
        });
        prevHandle.addEventListener("click", function (e) {
          e.stopPropagation();
        });

        var prevHandleDown = function prevHandleDown(e) {
          var prevRow = self.table.rowManager.prevDisplayRow(row);

          if (prevRow) {
            self.startRow = prevRow;

            self._mouseDown(e, prevRow, prevHandle);
          }
        };

        prevHandle.addEventListener("mousedown", prevHandleDown);
        prevHandle.addEventListener("touchstart", prevHandleDown, {
          passive: true
        });
        rowEl.appendChild(handle);
        rowEl.appendChild(prevHandle);
      }
    }, {
      key: "_mouseDown",
      value: function _mouseDown(e, row, handle) {
        var self = this;
        self.table.element.classList.add("tabulator-block-select");

        function mouseMove(e) {
          row.setHeight(self.startHeight + ((typeof e.screenY === "undefined" ? e.touches[0].screenY : e.screenY) - self.startY));
        }

        function mouseUp(e) {
          // //block editor from taking action while resizing is taking place
          // if(self.startColumn.modules.edit){
          // 	self.startColumn.modules.edit.blocked = false;
          // }
          document.body.removeEventListener("mouseup", mouseMove);
          document.body.removeEventListener("mousemove", mouseMove);
          handle.removeEventListener("touchmove", mouseMove);
          handle.removeEventListener("touchend", mouseUp);
          self.table.element.classList.remove("tabulator-block-select");
          self.dispatchExternal("rowResized", row.getComponent());
        }

        e.stopPropagation(); //prevent resize from interfereing with movable columns
        //block editor from taking action while resizing is taking place
        // if(self.startColumn.modules.edit){
        // 	self.startColumn.modules.edit.blocked = true;
        // }

        self.startY = typeof e.screenY === "undefined" ? e.touches[0].screenY : e.screenY;
        self.startHeight = row.getHeight();
        document.body.addEventListener("mousemove", mouseMove);
        document.body.addEventListener("mouseup", mouseUp);
        handle.addEventListener("touchmove", mouseMove, {
          passive: true
        });
        handle.addEventListener("touchend", mouseUp);
      }
    }]);

    return ResizeRows;
  }(Module);

  ResizeRows.moduleName = "resizeRows";

  var ResizeTable = /*#__PURE__*/function (_Module) {
    _inherits(ResizeTable, _Module);

    var _super = _createSuper(ResizeTable);

    function ResizeTable(table) {
      var _this;

      _classCallCheck(this, ResizeTable);

      _this = _super.call(this, table);
      _this.binding = false;
      _this.observer = false;
      _this.containerObserver = false;
      _this.tableHeight = 0;
      _this.tableWidth = 0;
      _this.containerHeight = 0;
      _this.containerWidth = 0;
      _this.autoResize = false;

      _this.registerTableOption("autoResize", true); //auto resize table


      return _this;
    }

    _createClass(ResizeTable, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;

        if (this.table.options.autoResize) {
          var table = this.table,
              tableStyle;
          this.tableHeight = table.element.clientHeight;
          this.tableWidth = table.element.clientWidth;

          if (table.element.parentNode) {
            this.containerHeight = table.element.parentNode.clientHeight;
            this.containerWidth = table.element.parentNode.clientWidth;
          }

          if (typeof ResizeObserver !== "undefined" && table.rowManager.getRenderMode() === "virtual") {
            this.autoResize = true;
            this.observer = new ResizeObserver(function (entry) {
              if (!table.browserMobile || table.browserMobile && !table.modules.edit.currentCell) {
                var nodeHeight = Math.floor(entry[0].contentRect.height);
                var nodeWidth = Math.floor(entry[0].contentRect.width);

                if (_this2.tableHeight != nodeHeight || _this2.tableWidth != nodeWidth) {
                  _this2.tableHeight = nodeHeight;
                  _this2.tableWidth = nodeWidth;

                  if (table.element.parentNode) {
                    _this2.containerHeight = table.element.parentNode.clientHeight;
                    _this2.containerWidth = table.element.parentNode.clientWidth;
                  }

                  _this2.table.columnManager.renderer.rerenderColumns(true);

                  table.redraw();
                }
              }
            });
            this.observer.observe(table.element);
            tableStyle = window.getComputedStyle(table.element);

            if (this.table.element.parentNode && !this.table.rowManager.fixedHeight && (tableStyle.getPropertyValue("max-height") || tableStyle.getPropertyValue("min-height"))) {
              this.containerObserver = new ResizeObserver(function (entry) {
                if (!table.browserMobile || table.browserMobile && !table.modules.edit.currentCell) {
                  var nodeHeight = Math.floor(entry[0].contentRect.height);
                  var nodeWidth = Math.floor(entry[0].contentRect.width);

                  if (_this2.containerHeight != nodeHeight || _this2.containerWidth != nodeWidth) {
                    _this2.containerHeight = nodeHeight;
                    _this2.containerWidth = nodeWidth;
                    _this2.tableHeight = table.element.clientHeight;
                    _this2.tableWidth = table.element.clientWidth;
                  }

                  table.columnManager.renderer.rerenderColumns(true);
                  table.redraw();
                }
              });
              this.containerObserver.observe(this.table.element.parentNode);
            }

            this.subscribe("table-resize", this.tableResized.bind(this));
          } else {
            this.binding = function () {
              if (!table.browserMobile || table.browserMobile && !table.modules.edit.currentCell) {
                table.columnManager.renderer.rerenderColumns(true);
                table.redraw();
              }
            };

            window.addEventListener("resize", this.binding);
          }

          this.subscribe("table-destroy", this.clearBindings.bind(this));
        }
      }
    }, {
      key: "tableResized",
      value: function tableResized() {
        this.table.rowManager.redraw();
      }
    }, {
      key: "clearBindings",
      value: function clearBindings() {
        if (this.binding) {
          window.removeEventListener("resize", this.binding);
        }

        if (this.observer) {
          this.observer.unobserve(this.table.element);
        }

        if (this.containerObserver) {
          this.containerObserver.unobserve(this.table.element.parentNode);
        }
      }
    }]);

    return ResizeTable;
  }(Module);

  ResizeTable.moduleName = "resizeTable";

  var ResponsiveLayout = /*#__PURE__*/function (_Module) {
    _inherits(ResponsiveLayout, _Module);

    var _super = _createSuper(ResponsiveLayout);

    function ResponsiveLayout(table) {
      var _this;

      _classCallCheck(this, ResponsiveLayout);

      _this = _super.call(this, table);
      _this.columns = [];
      _this.hiddenColumns = [];
      _this.mode = "";
      _this.index = 0;
      _this.collapseFormatter = [];
      _this.collapseStartOpen = true;
      _this.collapseHandleColumn = false;

      _this.registerTableOption("responsiveLayout", false); //responsive layout flags


      _this.registerTableOption("responsiveLayoutCollapseStartOpen", true); //start showing collapsed data


      _this.registerTableOption("responsiveLayoutCollapseUseFormatters", true); //responsive layout collapse formatter


      _this.registerTableOption("responsiveLayoutCollapseFormatter", false); //responsive layout collapse formatter


      _this.registerColumnOption("responsive");

      return _this;
    } //generate responsive columns list


    _createClass(ResponsiveLayout, [{
      key: "initialize",
      value: function initialize() {

        if (this.table.options.responsiveLayout) {
          this.subscribe("column-layout", this.initializeColumn.bind(this));
          this.subscribe("column-show", this.updateColumnVisibility.bind(this));
          this.subscribe("column-hide", this.updateColumnVisibility.bind(this));
          this.subscribe("columns-loaded", this.initializeResponsivity.bind(this));
          this.subscribe("column-moved", this.initializeResponsivity.bind(this));
          this.subscribe("column-add", this.initializeResponsivity.bind(this));
          this.subscribe("column-delete", this.initializeResponsivity.bind(this));
          this.subscribe("table-redrawing", this.tableRedraw.bind(this));

          if (this.table.options.responsiveLayout === "collapse") {
            this.subscribe("row-init", this.initializeRow.bind(this));
            this.subscribe("row-layout", this.layoutRow.bind(this));
          }
        }
      }
    }, {
      key: "tableRedraw",
      value: function tableRedraw(force) {
        if (["fitColumns", "fitDataStretch"].indexOf(this.layoutMode()) === -1) {
          if (!force) {
            this.update();
          }
        }
      }
    }, {
      key: "initializeResponsivity",
      value: function initializeResponsivity() {
        var _this2 = this;

        var columns = [];
        this.mode = this.table.options.responsiveLayout;
        this.collapseFormatter = this.table.options.responsiveLayoutCollapseFormatter || this.formatCollapsedData;
        this.collapseStartOpen = this.table.options.responsiveLayoutCollapseStartOpen;
        this.hiddenColumns = []; //determine level of responsivity for each column

        this.table.columnManager.columnsByIndex.forEach(function (column, i) {
          if (column.modules.responsive) {
            if (column.modules.responsive.order && column.modules.responsive.visible) {
              column.modules.responsive.index = i;
              columns.push(column);

              if (!column.visible && _this2.mode === "collapse") {
                _this2.hiddenColumns.push(column);
              }
            }
          }
        }); //sort list by responsivity

        columns = columns.reverse();
        columns = columns.sort(function (a, b) {
          var diff = b.modules.responsive.order - a.modules.responsive.order;
          return diff || b.modules.responsive.index - a.modules.responsive.index;
        });
        this.columns = columns;

        if (this.mode === "collapse") {
          this.generateCollapsedContent();
        } //assign collapse column


        var _iterator = _createForOfIteratorHelper(this.table.columnManager.columnsByIndex),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var col = _step.value;

            if (col.definition.formatter == "responsiveCollapse") {
              this.collapseHandleColumn = col;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (this.collapseHandleColumn) {
          if (this.hiddenColumns.length) {
            this.collapseHandleColumn.show();
          } else {
            this.collapseHandleColumn.hide();
          }
        }
      } //define layout information

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var def = column.getDefinition();
        column.modules.responsive = {
          order: typeof def.responsive === "undefined" ? 1 : def.responsive,
          visible: def.visible === false ? false : true
        };
      }
    }, {
      key: "initializeRow",
      value: function initializeRow(row) {
        var el;

        if (row.type !== "calc") {
          el = document.createElement("div");
          el.classList.add("tabulator-responsive-collapse");
          row.modules.responsiveLayout = {
            element: el,
            open: this.collapseStartOpen
          };

          if (!this.collapseStartOpen) {
            el.style.display = 'none';
          }
        }
      }
    }, {
      key: "layoutRow",
      value: function layoutRow(row) {
        var rowEl = row.getElement();

        if (row.modules.responsiveLayout) {
          rowEl.appendChild(row.modules.responsiveLayout.element);
          this.generateCollapsedRowContent(row);
        }
      } //update column visibility

    }, {
      key: "updateColumnVisibility",
      value: function updateColumnVisibility(column, responsiveToggle) {
        if (!responsiveToggle && column.modules.responsive) {
          column.modules.responsive.visible = column.visible;
          this.initializeResponsivity();
        }
      }
    }, {
      key: "hideColumn",
      value: function hideColumn(column) {
        var colCount = this.hiddenColumns.length;
        column.hide(false, true);

        if (this.mode === "collapse") {
          this.hiddenColumns.unshift(column);
          this.generateCollapsedContent();

          if (this.collapseHandleColumn && !colCount) {
            this.collapseHandleColumn.show();
          }
        }
      }
    }, {
      key: "showColumn",
      value: function showColumn(column) {
        var index;
        column.show(false, true); //set column width to prevent calculation loops on uninitialized columns

        column.setWidth(column.getWidth());

        if (this.mode === "collapse") {
          index = this.hiddenColumns.indexOf(column);

          if (index > -1) {
            this.hiddenColumns.splice(index, 1);
          }

          this.generateCollapsedContent();

          if (this.collapseHandleColumn && !this.hiddenColumns.length) {
            this.collapseHandleColumn.hide();
          }
        }
      } //redraw columns to fit space

    }, {
      key: "update",
      value: function update() {
        var self = this,
            working = true;

        while (working) {
          var width = self.table.modules.layout.getMode() == "fitColumns" ? self.table.columnManager.getFlexBaseWidth() : self.table.columnManager.getWidth();
          var diff = (self.table.options.headerVisible ? self.table.columnManager.element.clientWidth : self.table.element.clientWidth) - width;

          if (diff < 0) {
            //table is too wide
            var column = self.columns[self.index];

            if (column) {
              self.hideColumn(column);
              self.index++;
            } else {
              working = false;
            }
          } else {
            //table has spare space
            var _column = self.columns[self.index - 1];

            if (_column) {
              if (diff > 0) {
                if (diff >= _column.getWidth()) {
                  self.showColumn(_column);
                  self.index--;
                } else {
                  working = false;
                }
              } else {
                working = false;
              }
            } else {
              working = false;
            }
          }

          if (!self.table.rowManager.activeRowsCount) {
            self.table.rowManager.renderEmptyScroll();
          }
        }
      }
    }, {
      key: "generateCollapsedContent",
      value: function generateCollapsedContent() {
        var self = this,
            rows = this.table.rowManager.getDisplayRows();
        rows.forEach(function (row) {
          self.generateCollapsedRowContent(row);
        });
      }
    }, {
      key: "generateCollapsedRowContent",
      value: function generateCollapsedRowContent(row) {
        var el, contents;

        if (row.modules.responsiveLayout) {
          el = row.modules.responsiveLayout.element;

          while (el.firstChild) {
            el.removeChild(el.firstChild);
          }

          contents = this.collapseFormatter(this.generateCollapsedRowData(row));

          if (contents) {
            el.appendChild(contents);
          }
        }
      }
    }, {
      key: "generateCollapsedRowData",
      value: function generateCollapsedRowData(row) {
        var self = this,
            data = row.getData(),
            output = [],
            mockCellComponent;
        this.hiddenColumns.forEach(function (column) {
          var value = column.getFieldValue(data);

          if (column.definition.title && column.field) {
            if (column.modules.format && self.table.options.responsiveLayoutCollapseUseFormatters) {
              var onRendered = function onRendered(callback) {
                callback();
              };

              mockCellComponent = {
                value: false,
                data: {},
                getValue: function getValue() {
                  return value;
                },
                getData: function getData() {
                  return data;
                },
                getElement: function getElement() {
                  return document.createElement("div");
                },
                getRow: function getRow() {
                  return row.getComponent();
                },
                getColumn: function getColumn() {
                  return column.getComponent();
                }
              };
              output.push({
                field: column.field,
                title: column.definition.title,
                value: column.modules.format.formatter.call(self.table.modules.format, mockCellComponent, column.modules.format.params, onRendered)
              });
            } else {
              output.push({
                field: column.field,
                title: column.definition.title,
                value: value
              });
            }
          }
        });
        return output;
      }
    }, {
      key: "formatCollapsedData",
      value: function formatCollapsedData(data) {
        var list = document.createElement("table");
        data.forEach(function (item) {
          var row = document.createElement("tr");
          var titleData = document.createElement("td");
          var valueData = document.createElement("td");
          var node_content;
          var titleHighlight = document.createElement("strong");
          titleData.appendChild(titleHighlight);
          this.langBind("columns|" + item.field, function (text) {
            titleHighlight.innerHTML = text || item.title;
          });

          if (item.value instanceof Node) {
            node_content = document.createElement("div");
            node_content.appendChild(item.value);
            valueData.appendChild(node_content);
          } else {
            valueData.innerHTML = item.value;
          }

          row.appendChild(titleData);
          row.appendChild(valueData);
          list.appendChild(row);
        }, this);
        return Object.keys(data).length ? list : "";
      }
    }]);

    return ResponsiveLayout;
  }(Module);

  ResponsiveLayout.moduleName = "responsiveLayout";

  var SelectRow = /*#__PURE__*/function (_Module) {
    _inherits(SelectRow, _Module);

    var _super = _createSuper(SelectRow);

    function SelectRow(table) {
      var _this;

      _classCallCheck(this, SelectRow);

      _this = _super.call(this, table);
      _this.selecting = false; //flag selecting in progress

      _this.lastClickedRow = false; //last clicked row

      _this.selectPrev = []; //hold previously selected element for drag drop selection

      _this.selectedRows = []; //hold selected rows

      _this.headerCheckboxElement = null; // hold header select element

      _this.registerTableOption("selectable", "highlight"); //highlight rows on hover


      _this.registerTableOption("selectableRangeMode", "drag"); //highlight rows on hover


      _this.registerTableOption("selectableRollingSelection", true); //roll selection once maximum number of selectable rows is reached


      _this.registerTableOption("selectablePersistence", true); // maintain selection when table view is updated


      _this.registerTableOption("selectableCheck", function (data, row) {
        return true;
      }); //check wheather row is selectable


      _this.registerTableFunction("selectRow", _this.selectRows.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("deselectRow", _this.deselectRows.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("toggleSelectRow", _this.toggleRow.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("getSelectedRows", _this.getSelectedRows.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("getSelectedData", _this.getSelectedData.bind(_assertThisInitialized(_this))); //register component functions


      _this.registerComponentFunction("row", "select", _this.selectRows.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "deselect", _this.deselectRows.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "toggleSelect", _this.toggleRow.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "isSelected", _this.isRowSelected.bind(_assertThisInitialized(_this)));

      return _this;
    }

    _createClass(SelectRow, [{
      key: "initialize",
      value: function initialize() {
        if (this.table.options.selectable !== false) {
          this.subscribe("row-init", this.initializeRow.bind(this));
          this.subscribe("row-deleting", this.rowDeleted.bind(this));
          this.subscribe("rows-wipe", this.clearSelectionData.bind(this));
          this.subscribe("rows-retrieve", this.rowRetrieve.bind(this));

          if (this.table.options.selectable && !this.table.options.selectablePersistence) {
            this.subscribe("data-refreshing", this.deselectRows.bind(this));
          }
        }
      }
    }, {
      key: "rowRetrieve",
      value: function rowRetrieve(type, prevValue) {
        return type === "selected" ? this.selectedRows : prevValue;
      }
    }, {
      key: "rowDeleted",
      value: function rowDeleted(row) {
        this._deselectRow(row, true);
      }
    }, {
      key: "clearSelectionData",
      value: function clearSelectionData(silent) {
        this.selecting = false;
        this.lastClickedRow = false;
        this.selectPrev = [];
        this.selectedRows = [];

        if (silent !== true) {
          this._rowSelectionChanged();
        }
      }
    }, {
      key: "initializeRow",
      value: function initializeRow(row) {
        var self = this,
            element = row.getElement(); // trigger end of row selection

        var endSelect = function endSelect() {
          setTimeout(function () {
            self.selecting = false;
          }, 50);
          document.body.removeEventListener("mouseup", endSelect);
        };

        row.modules.select = {
          selected: false
        }; //set row selection class

        if (self.table.options.selectableCheck.call(this.table, row.getComponent())) {
          element.classList.add("tabulator-selectable");
          element.classList.remove("tabulator-unselectable");

          if (self.table.options.selectable && self.table.options.selectable != "highlight") {
            if (self.table.options.selectableRangeMode === "click") {
              element.addEventListener("click", this.handleComplexRowClick.bind(this, row));
            } else {
              element.addEventListener("click", function (e) {
                if (!self.table.modExists("edit") || !self.table.modules.edit.getCurrentCell()) {
                  self.table._clearSelection();
                }

                if (!self.selecting) {
                  self.toggleRow(row);
                }
              });
              element.addEventListener("mousedown", function (e) {
                if (e.shiftKey) {
                  self.table._clearSelection();

                  self.selecting = true;
                  self.selectPrev = [];
                  document.body.addEventListener("mouseup", endSelect);
                  document.body.addEventListener("keyup", endSelect);
                  self.toggleRow(row);
                  return false;
                }
              });
              element.addEventListener("mouseenter", function (e) {
                if (self.selecting) {
                  self.table._clearSelection();

                  self.toggleRow(row);

                  if (self.selectPrev[1] == row) {
                    self.toggleRow(self.selectPrev[0]);
                  }
                }
              });
              element.addEventListener("mouseout", function (e) {
                if (self.selecting) {
                  self.table._clearSelection();

                  self.selectPrev.unshift(row);
                }
              });
            }
          }
        } else {
          element.classList.add("tabulator-unselectable");
          element.classList.remove("tabulator-selectable");
        }
      }
    }, {
      key: "handleComplexRowClick",
      value: function handleComplexRowClick(row, e) {
        var _this2 = this;

        if (e.shiftKey) {
          this.table._clearSelection();

          this.lastClickedRow = this.lastClickedRow || row;
          var lastClickedRowIdx = this.table.rowManager.getDisplayRowIndex(this.lastClickedRow);
          var rowIdx = this.table.rowManager.getDisplayRowIndex(row);
          var fromRowIdx = lastClickedRowIdx <= rowIdx ? lastClickedRowIdx : rowIdx;
          var toRowIdx = lastClickedRowIdx >= rowIdx ? lastClickedRowIdx : rowIdx;
          var rows = this.table.rowManager.getDisplayRows().slice(0);
          var toggledRows = rows.splice(fromRowIdx, toRowIdx - fromRowIdx + 1);

          if (e.ctrlKey || e.metaKey) {
            toggledRows.forEach(function (toggledRow) {
              if (toggledRow !== _this2.lastClickedRow) {
                if (_this2.table.options.selectable !== true && !_this2.isRowSelected(row)) {
                  if (_this2.selectedRows.length < _this2.table.options.selectable) {
                    _this2.toggleRow(toggledRow);
                  }
                } else {
                  _this2.toggleRow(toggledRow);
                }
              }
            });
            this.lastClickedRow = row;
          } else {
            this.deselectRows(undefined, true);

            if (this.table.options.selectable !== true) {
              if (toggledRows.length > this.table.options.selectable) {
                toggledRows = toggledRows.slice(0, this.table.options.selectable);
              }
            }

            this.selectRows(toggledRows);
          }

          this.table._clearSelection();
        } else if (e.ctrlKey || e.metaKey) {
          this.toggleRow(row);
          this.lastClickedRow = row;
        } else {
          this.deselectRows(undefined, true);
          this.selectRows(row);
          this.lastClickedRow = row;
        }
      } //toggle row selection

    }, {
      key: "toggleRow",
      value: function toggleRow(row) {
        if (this.table.options.selectableCheck.call(this.table, row.getComponent())) {
          if (row.modules.select && row.modules.select.selected) {
            this._deselectRow(row);
          } else {
            this._selectRow(row);
          }
        }
      } //select a number of rows

    }, {
      key: "selectRows",
      value: function selectRows(rows) {
        var _this3 = this;

        var rowMatch;

        switch (_typeof(rows)) {
          case "undefined":
            this.table.rowManager.rows.forEach(function (row) {
              _this3._selectRow(row, true, true);
            });

            this._rowSelectionChanged();

            break;

          case "string":
            rowMatch = this.table.rowManager.findRow(rows);

            if (rowMatch) {
              this._selectRow(rowMatch, true, true);
            } else {
              this.table.rowManager.getRows(rows).forEach(function (row) {
                _this3._selectRow(row, true, true);
              });
            }

            this._rowSelectionChanged();

            break;

          default:
            if (Array.isArray(rows)) {
              rows.forEach(function (row) {
                _this3._selectRow(row, true, true);
              });

              this._rowSelectionChanged();
            } else {
              this._selectRow(rows, false, true);
            }

            break;
        }
      } //select an individual row

    }, {
      key: "_selectRow",
      value: function _selectRow(rowInfo, silent, force) {

        if (!isNaN(this.table.options.selectable) && this.table.options.selectable !== true && !force) {
          if (this.selectedRows.length >= this.table.options.selectable) {
            if (this.table.options.selectableRollingSelection) {
              this._deselectRow(this.selectedRows[0]);
            } else {
              return false;
            }
          }
        }

        var row = this.table.rowManager.findRow(rowInfo);

        if (row) {
          if (this.selectedRows.indexOf(row) == -1) {
            row.getElement().classList.add("tabulator-selected");

            if (!row.modules.select) {
              row.modules.select = {};
            }

            row.modules.select.selected = true;

            if (row.modules.select.checkboxEl) {
              row.modules.select.checkboxEl.checked = true;
            }

            this.selectedRows.push(row);

            if (this.table.options.dataTreeSelectPropagate) {
              this.childRowSelection(row, true);
            }

            this.dispatchExternal("rowSelected", row.getComponent());

            this._rowSelectionChanged(silent);
          }
        } else {
          if (!silent) {
            console.warn("Selection Error - No such row found, ignoring selection:" + rowInfo);
          }
        }
      }
    }, {
      key: "isRowSelected",
      value: function isRowSelected(row) {
        return this.selectedRows.indexOf(row) !== -1;
      } //deselect a number of rows

    }, {
      key: "deselectRows",
      value: function deselectRows(rows, silent) {
        var self = this,
            rowCount;

        if (typeof rows == "undefined") {
          rowCount = self.selectedRows.length;

          for (var i = 0; i < rowCount; i++) {
            self._deselectRow(self.selectedRows[0], true);
          }

          if (rowCount) {
            self._rowSelectionChanged(silent);
          }
        } else {
          if (Array.isArray(rows)) {
            rows.forEach(function (row) {
              self._deselectRow(row, true);
            });

            self._rowSelectionChanged(silent);
          } else {
            self._deselectRow(rows, silent);
          }
        }
      } //deselect an individual row

    }, {
      key: "_deselectRow",
      value: function _deselectRow(rowInfo, silent) {
        var self = this,
            row = self.table.rowManager.findRow(rowInfo),
            index;

        if (row) {
          index = self.selectedRows.findIndex(function (selectedRow) {
            return selectedRow == row;
          });

          if (index > -1) {
            row.getElement().classList.remove("tabulator-selected");

            if (!row.modules.select) {
              row.modules.select = {};
            }

            row.modules.select.selected = false;

            if (row.modules.select.checkboxEl) {
              row.modules.select.checkboxEl.checked = false;
            }

            self.selectedRows.splice(index, 1);

            if (this.table.options.dataTreeSelectPropagate) {
              this.childRowSelection(row, false);
            }

            this.dispatchExternal("rowDeselected", row.getComponent());

            self._rowSelectionChanged(silent);
          }
        } else {
          if (!silent) {
            console.warn("Deselection Error - No such row found, ignoring selection:" + rowInfo);
          }
        }
      }
    }, {
      key: "getSelectedData",
      value: function getSelectedData() {
        var data = [];
        this.selectedRows.forEach(function (row) {
          data.push(row.getData());
        });
        return data;
      }
    }, {
      key: "getSelectedRows",
      value: function getSelectedRows() {
        var rows = [];
        this.selectedRows.forEach(function (row) {
          rows.push(row.getComponent());
        });
        return rows;
      }
    }, {
      key: "_rowSelectionChanged",
      value: function _rowSelectionChanged(silent) {
        if (this.headerCheckboxElement) {
          if (this.selectedRows.length === 0) {
            this.headerCheckboxElement.checked = false;
            this.headerCheckboxElement.indeterminate = false;
          } else if (this.table.rowManager.rows.length === this.selectedRows.length) {
            this.headerCheckboxElement.checked = true;
            this.headerCheckboxElement.indeterminate = false;
          } else {
            this.headerCheckboxElement.indeterminate = true;
            this.headerCheckboxElement.checked = false;
          }
        }

        if (!silent) {
          this.dispatchExternal("rowSelectionChanged", this.getSelectedData(), this.getSelectedRows());
        }
      }
    }, {
      key: "registerRowSelectCheckbox",
      value: function registerRowSelectCheckbox(row, element) {
        if (!row._row.modules.select) {
          row._row.modules.select = {};
        }

        row._row.modules.select.checkboxEl = element;
      }
    }, {
      key: "registerHeaderSelectCheckbox",
      value: function registerHeaderSelectCheckbox(element) {
        this.headerCheckboxElement = element;
      }
    }, {
      key: "childRowSelection",
      value: function childRowSelection(row, select) {
        var children = this.table.modules.dataTree.getChildren(row, true);

        if (select) {
          var _iterator = _createForOfIteratorHelper(children),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var child = _step.value;

              this._selectRow(child, true);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          var _iterator2 = _createForOfIteratorHelper(children),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _child = _step2.value;

              this._deselectRow(_child, true);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    }]);

    return SelectRow;
  }(Module);

  SelectRow.moduleName = "selectRow";

  //sort numbers
  function number$1 (a, b, aRow, bRow, column, dir, params) {
    var alignEmptyValues = params.alignEmptyValues;
    var decimal = params.decimalSeparator;
    var thousand = params.thousandSeparator;
    var emptyAlign = 0;
    a = String(a);
    b = String(b);

    if (thousand) {
      a = a.split(thousand).join("");
      b = b.split(thousand).join("");
    }

    if (decimal) {
      a = a.split(decimal).join(".");
      b = b.split(decimal).join(".");
    }

    a = parseFloat(a);
    b = parseFloat(b); //handle non numeric values

    if (isNaN(a)) {
      emptyAlign = isNaN(b) ? 0 : -1;
    } else if (isNaN(b)) {
      emptyAlign = 1;
    } else {
      //compare valid values
      return a - b;
    } //fix empty values in position


    if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {
      emptyAlign *= -1;
    }

    return emptyAlign;
  }

  //sort strings
  function string (a, b, aRow, bRow, column, dir, params) {
    var alignEmptyValues = params.alignEmptyValues;
    var emptyAlign = 0;
    var locale; //handle empty values

    if (!a) {
      emptyAlign = !b ? 0 : -1;
    } else if (!b) {
      emptyAlign = 1;
    } else {
      //compare valid values
      switch (_typeof(params.locale)) {
        case "boolean":
          if (params.locale) {
            locale = this.langLocale();
          }

          break;

        case "string":
          locale = params.locale;
          break;
      }

      return String(a).toLowerCase().localeCompare(String(b).toLowerCase(), locale);
    } //fix empty values in position


    if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {
      emptyAlign *= -1;
    }

    return emptyAlign;
  }

  //sort datetime
  function datetime$1 (a, b, aRow, bRow, column, dir, params) {
    var DT = window.DateTime || luxon.DateTime;
    var format = params.format || "dd/MM/yyyy HH:mm:ss",
        alignEmptyValues = params.alignEmptyValues,
        emptyAlign = 0;

    if (typeof DT != "undefined") {
      if (DT.isDateTime(a)) {
        a = a;
      } else if (format === "iso") {
        a = DT.fromISO(String(a));
      } else {
        a = DT.fromFormat(String(a), format);
      }

      if (DT.isDateTime(b)) {
        b = b;
      } else if (format === "iso") {
        b = DT.fromISO(String(b));
      } else {
        b = DT.fromFormat(String(b), format);
      }

      if (!a.isValid) {
        emptyAlign = !b.isValid ? 0 : -1;
      } else if (!b.isValid) {
        emptyAlign = 1;
      } else {
        //compare valid values
        return a - b;
      } //fix empty values in position


      if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {
        emptyAlign *= -1;
      }

      return emptyAlign;
    } else {
      console.error("Sort Error - 'datetime' sorter is dependant on luxon.js");
    }
  }

  function date (a, b, aRow, bRow, column, dir, params) {
    if (!params.format) {
      params.format = "dd/MM/yyyy";
    }

    return datetime$1.call(this, a, b, aRow, bRow, column, dir, params);
  }

  function time (a, b, aRow, bRow, column, dir, params) {
    if (!params.format) {
      params.format = "HH:mm";
    }

    return datetime$1.call(this, a, b, aRow, bRow, column, dir, params);
  }

  //sort booleans
  function _boolean (a, b, aRow, bRow, column, dir, params) {
    var el1 = a === true || a === "true" || a === "True" || a === 1 ? 1 : 0;
    var el2 = b === true || b === "true" || b === "True" || b === 1 ? 1 : 0;
    return el1 - el2;
  }

  //sort if element contains any data
  function array (a, b, aRow, bRow, column, dir, params) {
    var el1 = 0;
    var el2 = 0;
    var type = params.type || "length";
    var alignEmptyValues = params.alignEmptyValues;
    var emptyAlign = 0;

    function calc(value) {
      switch (type) {
        case "length":
          return value.length;

        case "sum":
          return value.reduce(function (c, d) {
            return c + d;
          });

        case "max":
          return Math.max.apply(null, value);

        case "min":
          return Math.min.apply(null, value);

        case "avg":
          return value.reduce(function (c, d) {
            return c + d;
          }) / value.length;
      }
    } //handle non array values


    if (!Array.isArray(a)) {
      alignEmptyValues = !Array.isArray(b) ? 0 : -1;
    } else if (!Array.isArray(b)) {
      alignEmptyValues = 1;
    } else {
      //compare valid values
      el1 = a ? calc(a) : 0;
      el2 = b ? calc(b) : 0;
      return el1 - el2;
    } //fix empty values in position


    if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {
      emptyAlign *= -1;
    }

    return emptyAlign;
  }

  //sort if element contains any data
  function exists (a, b, aRow, bRow, column, dir, params) {
    var el1 = typeof a == "undefined" ? 0 : 1;
    var el2 = typeof b == "undefined" ? 0 : 1;
    return el1 - el2;
  }

  //sort alpha numeric strings
  function alphanum (as, bs, aRow, bRow, column, dir, params) {
    var a,
        b,
        a1,
        b1,
        i = 0,
        L,
        rx = /(\d+)|(\D+)/g,
        rd = /\d/;
    var alignEmptyValues = params.alignEmptyValues;
    var emptyAlign = 0; //handle empty values

    if (!as && as !== 0) {
      emptyAlign = !bs && bs !== 0 ? 0 : -1;
    } else if (!bs && bs !== 0) {
      emptyAlign = 1;
    } else {
      if (isFinite(as) && isFinite(bs)) return as - bs;
      a = String(as).toLowerCase();
      b = String(bs).toLowerCase();
      if (a === b) return 0;
      if (!(rd.test(a) && rd.test(b))) return a > b ? 1 : -1;
      a = a.match(rx);
      b = b.match(rx);
      L = a.length > b.length ? b.length : a.length;

      while (i < L) {
        a1 = a[i];
        b1 = b[i++];

        if (a1 !== b1) {
          if (isFinite(a1) && isFinite(b1)) {
            if (a1.charAt(0) === "0") a1 = "." + a1;
            if (b1.charAt(0) === "0") b1 = "." + b1;
            return a1 - b1;
          } else return a1 > b1 ? 1 : -1;
        }
      }

      return a.length > b.length;
    } //fix empty values in position


    if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {
      emptyAlign *= -1;
    }

    return emptyAlign;
  }

  var defaultSorters = {
    number: number$1,
    string: string,
    date: date,
    time: time,
    datetime: datetime$1,
    "boolean": _boolean,
    array: array,
    exists: exists,
    alphanum: alphanum
  };

  var Sort = /*#__PURE__*/function (_Module) {
    _inherits(Sort, _Module);

    var _super = _createSuper(Sort);

    function Sort(table) {
      var _this;

      _classCallCheck(this, Sort);

      _this = _super.call(this, table);
      _this.sortList = []; //holder current sort

      _this.changed = false; //has the sort changed since last render

      _this.registerTableOption("sortMode", "local"); //local or remote sorting


      _this.registerTableOption("initialSort", false); //initial sorting criteria


      _this.registerTableOption("columnHeaderSortMulti", true); //multiple or single column sorting


      _this.registerTableOption("sortOrderReverse", false); //reverse internal sort ordering


      _this.registerTableOption("headerSortElement", "<div class='tabulator-arrow'></div>"); //header sort element


      _this.registerColumnOption("sorter");

      _this.registerColumnOption("sorterParams");

      _this.registerColumnOption("headerSort", true);

      _this.registerColumnOption("headerSortStartingDir");

      _this.registerColumnOption("headerSortTristate");

      return _this;
    }

    _createClass(Sort, [{
      key: "initialize",
      value: function initialize() {
        this.subscribe("column-layout", this.initializeColumn.bind(this));
        this.subscribe("table-built", this.tableBuilt.bind(this));
        this.registerDataHandler(this.sort.bind(this), 20);
        this.registerTableFunction("setSort", this.userSetSort.bind(this));
        this.registerTableFunction("getSorters", this.getSort.bind(this));
        this.registerTableFunction("clearSort", this.clearSort.bind(this));

        if (this.table.options.sortMode === "remote") {
          this.subscribe("data-params", this.remoteSortParams.bind(this));
        }
      }
    }, {
      key: "tableBuilt",
      value: function tableBuilt() {
        if (this.table.options.initialSort) {
          this.setSort(this.table.options.initialSort);
        }
      }
    }, {
      key: "remoteSortParams",
      value: function remoteSortParams(data, config, silent, params) {
        var sorters = this.getSort();
        sorters.forEach(function (item) {
          delete item.column;
        });
        params.sort = sorters;
        return params;
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////

    }, {
      key: "userSetSort",
      value: function userSetSort(sortList, dir) {
        this.setSort(sortList, dir); // this.table.rowManager.sorterRefresh();

        this.refreshSort();
      }
    }, {
      key: "clearSort",
      value: function clearSort() {
        this.clear(); // this.table.rowManager.sorterRefresh();

        this.refreshSort();
      } ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////
      //initialize column header for sorting

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var _this2 = this;

        var sorter = false,
            colEl,
            arrowEl;

        switch (_typeof(column.definition.sorter)) {
          case "string":
            if (Sort.sorters[column.definition.sorter]) {
              sorter = Sort.sorters[column.definition.sorter];
            } else {
              console.warn("Sort Error - No such sorter found: ", column.definition.sorter);
            }

            break;

          case "function":
            sorter = column.definition.sorter;
            break;
        }

        column.modules.sort = {
          sorter: sorter,
          dir: "none",
          params: column.definition.sorterParams || {},
          startingDir: column.definition.headerSortStartingDir || "asc",
          tristate: column.definition.headerSortTristate
        };

        if (column.definition.headerSort !== false) {
          colEl = column.getElement();
          colEl.classList.add("tabulator-sortable");
          arrowEl = document.createElement("div");
          arrowEl.classList.add("tabulator-col-sorter");

          if (_typeof(this.table.options.headerSortElement) == "object") {
            arrowEl.appendChild(this.table.options.headerSortElement);
          } else {
            arrowEl.innerHTML = this.table.options.headerSortElement;
          } //create sorter arrow


          column.titleHolderElement.appendChild(arrowEl);
          column.modules.sort.element = arrowEl; //sort on click

          colEl.addEventListener("click", function (e) {
            var dir = "",
                sorters = [],
                match = false;

            if (column.modules.sort) {
              if (column.modules.sort.tristate) {
                if (column.modules.sort.dir == "none") {
                  dir = column.modules.sort.startingDir;
                } else {
                  if (column.modules.sort.dir == column.modules.sort.startingDir) {
                    dir = column.modules.sort.dir == "asc" ? "desc" : "asc";
                  } else {
                    dir = "none";
                  }
                }
              } else {
                switch (column.modules.sort.dir) {
                  case "asc":
                    dir = "desc";
                    break;

                  case "desc":
                    dir = "asc";
                    break;

                  default:
                    dir = column.modules.sort.startingDir;
                }
              }

              if (_this2.table.options.columnHeaderSortMulti && (e.shiftKey || e.ctrlKey)) {
                sorters = _this2.getSort();
                match = sorters.findIndex(function (sorter) {
                  return sorter.field === column.getField();
                });

                if (match > -1) {
                  sorters[match].dir = dir;

                  if (match != sorters.length - 1) {
                    match = sorters.splice(match, 1)[0];

                    if (dir != "none") {
                      sorters.push(match);
                    }
                  }
                } else {
                  if (dir != "none") {
                    sorters.push({
                      column: column,
                      dir: dir
                    });
                  }
                } //add to existing sort


                _this2.setSort(sorters);
              } else {
                if (dir == "none") {
                  _this2.clear();
                } else {
                  //sort by column only
                  _this2.setSort(column, dir);
                }
              } // this.table.rowManager.sorterRefresh(!this.sortList.length);


              _this2.refreshSort();
            }
          });
        }
      }
    }, {
      key: "refreshSort",
      value: function refreshSort() {
        if (this.table.options.sortMode === "remote") {
          this.reloadData(null, false, false);
        } else {
          this.refreshData(true);
        } //TODO - Persist left position of row manager
        // left = this.scrollLeft;
        // this.scrollHorizontal(left);

      } //check if the sorters have changed since last use

    }, {
      key: "hasChanged",
      value: function hasChanged() {
        var changed = this.changed;
        this.changed = false;
        return changed;
      } //return current sorters

    }, {
      key: "getSort",
      value: function getSort() {
        var self = this,
            sorters = [];
        self.sortList.forEach(function (item) {
          if (item.column) {
            sorters.push({
              column: item.column.getComponent(),
              field: item.column.getField(),
              dir: item.dir
            });
          }
        });
        return sorters;
      } //change sort list and trigger sort

    }, {
      key: "setSort",
      value: function setSort(sortList, dir) {
        var self = this,
            newSortList = [];

        if (!Array.isArray(sortList)) {
          sortList = [{
            column: sortList,
            dir: dir
          }];
        }

        sortList.forEach(function (item) {
          var column;
          column = self.table.columnManager.findColumn(item.column);

          if (column) {
            item.column = column;
            newSortList.push(item);
            self.changed = true;
          } else {
            console.warn("Sort Warning - Sort field does not exist and is being ignored: ", item.column);
          }
        });
        self.sortList = newSortList;
        this.dispatch("sort-changed");
      } //clear sorters

    }, {
      key: "clear",
      value: function clear() {
        this.setSort([]);
      } //find appropriate sorter for column

    }, {
      key: "findSorter",
      value: function findSorter(column) {
        var row = this.table.rowManager.activeRows[0],
            sorter = "string",
            field,
            value;

        if (row) {
          row = row.getData();
          field = column.getField();

          if (field) {
            value = column.getFieldValue(row);

            switch (_typeof(value)) {
              case "undefined":
                sorter = "string";
                break;

              case "boolean":
                sorter = "boolean";
                break;

              default:
                if (!isNaN(value) && value !== "") {
                  sorter = "number";
                } else {
                  if (value.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)) {
                    sorter = "alphanum";
                  }
                }

                break;
            }
          }
        }

        return Sort.sorters[sorter];
      } //work through sort list sorting data

    }, {
      key: "sort",
      value: function sort(data) {
        var self = this,
            sortList = this.table.options.sortOrderReverse ? self.sortList.slice().reverse() : self.sortList,
            sortListActual = [],
            rowComponents = [];

        if (this.subscribedExternal("dataSorting")) {
          this.dispatchExternal("dataSorting", self.getSort());
        }

        self.clearColumnHeaders();

        if (this.table.options.sortMode !== "remote") {
          //build list of valid sorters and trigger column specific callbacks before sort begins
          sortList.forEach(function (item, i) {
            var sortObj = item.column.modules.sort;

            if (item.column && sortObj) {
              //if no sorter has been defined, take a guess
              if (!sortObj.sorter) {
                sortObj.sorter = self.findSorter(item.column);
              }

              item.params = typeof sortObj.params === "function" ? sortObj.params(item.column.getComponent(), item.dir) : sortObj.params;
              sortListActual.push(item);
            }

            self.setColumnHeader(item.column, item.dir);
          }); //sort data

          if (sortListActual.length) {
            self._sortItems(data, sortListActual);
          }
        } else {
          sortList.forEach(function (item, i) {
            self.setColumnHeader(item.column, item.dir);
          });
        }

        if (this.subscribedExternal("dataSorted")) {
          data.forEach(function (row) {
            rowComponents.push(row.getComponent());
          });
          this.dispatchExternal("dataSorted", self.getSort(), rowComponents);
        }

        return data;
      } //clear sort arrows on columns

    }, {
      key: "clearColumnHeaders",
      value: function clearColumnHeaders() {
        this.table.columnManager.getRealColumns().forEach(function (column) {
          if (column.modules.sort) {
            column.modules.sort.dir = "none";
            column.getElement().setAttribute("aria-sort", "none");
          }
        });
      } //set the column header sort direction

    }, {
      key: "setColumnHeader",
      value: function setColumnHeader(column, dir) {
        column.modules.sort.dir = dir;
        column.getElement().setAttribute("aria-sort", dir === "asc" ? "ascending" : "descending");
      } //sort each item in sort list

    }, {
      key: "_sortItems",
      value: function _sortItems(data, sortList) {
        var _this3 = this;

        var sorterCount = sortList.length - 1;
        data.sort(function (a, b) {
          var result;

          for (var i = sorterCount; i >= 0; i--) {
            var sortItem = sortList[i];
            result = _this3._sortRow(a, b, sortItem.column, sortItem.dir, sortItem.params);

            if (result !== 0) {
              break;
            }
          }

          return result;
        });
      } //process individual rows for a sort function on active data

    }, {
      key: "_sortRow",
      value: function _sortRow(a, b, column, dir, params) {
        var el1Comp, el2Comp; //switch elements depending on search direction

        var el1 = dir == "asc" ? a : b;
        var el2 = dir == "asc" ? b : a;
        a = column.getFieldValue(el1.getData());
        b = column.getFieldValue(el2.getData());
        a = typeof a !== "undefined" ? a : "";
        b = typeof b !== "undefined" ? b : "";
        el1Comp = el1.getComponent();
        el2Comp = el2.getComponent();
        return column.modules.sort.sorter.call(this, a, b, el1Comp, el2Comp, column.getComponent(), dir, params);
      }
    }]);

    return Sort;
  }(Module);

  Sort.moduleName = "sort"; //load defaults

  Sort.sorters = defaultSorters;

  var Tooltip = /*#__PURE__*/function (_Module) {
    _inherits(Tooltip, _Module);

    var _super = _createSuper(Tooltip);

    function Tooltip(table) {
      var _this;

      _classCallCheck(this, Tooltip);

      _this = _super.call(this, table);
      _this.tooltipSubscriber = null, _this.headerSubscriber = null, _this.timeout = null;
      _this.popupInstance = null;

      _this.registerTableOption("tooltipGenerationMode", undefined); //deprecated


      _this.registerTableOption("tooltipDelay", 300);

      _this.registerColumnOption("tooltip");

      _this.registerColumnOption("headerTooltip");

      return _this;
    }

    _createClass(Tooltip, [{
      key: "initialize",
      value: function initialize() {
        this.deprecationCheck();
        this.subscribe("column-init", this.initializeColumn.bind(this));
      }
    }, {
      key: "deprecationCheck",
      value: function deprecationCheck() {
        if (typeof this.table.options.tooltipGenerationMode !== "undefined") {
          console.warn("Use of the tooltipGenerationMode option is now deprecated. This option is no longer needed as tooltips are always generated on hover now");
        }
      }
    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        if (column.definition.headerTooltip && !this.headerSubscriber) {
          this.headerSubscriber = true;
          this.subscribe("column-mousemove", this.mousemoveCheck.bind(this, "headerTooltip"));
          this.subscribe("column-mouseout", this.mouseoutCheck.bind(this, "headerTooltip"));
        }

        if (column.definition.tooltip && !this.tooltipSubscriber) {
          this.tooltipSubscriber = true;
          this.subscribe("cell-mousemove", this.mousemoveCheck.bind(this, "tooltip"));
          this.subscribe("cell-mouseout", this.mouseoutCheck.bind(this, "tooltip"));
        }
      }
    }, {
      key: "mousemoveCheck",
      value: function mousemoveCheck(action, e, component) {
        var tooltip = action === "tooltip" ? component.column.definition.tooltip : component.definition.headerTooltip;

        if (tooltip) {
          this.clearPopup();
          this.timeout = setTimeout(this.loadTooltip.bind(this, e, component, tooltip), this.table.options.tooltipDelay);
        }
      }
    }, {
      key: "mouseoutCheck",
      value: function mouseoutCheck(action, e, component) {
        if (!this.popupInstance) {
          this.clearPopup();
        }
      }
    }, {
      key: "clearPopup",
      value: function clearPopup(action, e, component) {
        clearTimeout(this.timeout);
        this.timeout = null;

        if (this.popupInstance) {
          this.popupInstance.hide();
        }
      }
    }, {
      key: "loadTooltip",
      value: function loadTooltip(e, component, tooltip) {
        var _this2 = this;

        var contentsEl, renderedCallback, coords;

        function onRendered(callback) {
          renderedCallback = callback;
        }

        if (typeof tooltip === "function") {
          tooltip = tooltip(e, component.getComponent(), onRendered);
        }

        if (tooltip instanceof HTMLElement) {
          contentsEl = tooltip;
        } else {
          contentsEl = document.createElement("div");

          if (tooltip === true) {
            if (component instanceof Cell) {
              tooltip = component.value;
            } else {
              if (component.definition.field) {
                this.langBind("columns|" + component.definition.field, function (value) {
                  contentsEl.innerHTML = tooltip = value || component.definition.title;
                });
              } else {
                tooltip = component.definition.title;
              }
            }
          }

          contentsEl.innerHTML = tooltip;
        }

        if (tooltip || tooltip === 0 || tooltip === "0" || tooltip === false) {
          contentsEl.classList.add("tabulator-tooltip");
          contentsEl.addEventListener("mousemove", function (e) {
            return e.preventDefault();
          });
          this.popupInstance = this.popup(contentsEl);

          if (typeof renderedCallback === "function") {
            this.popupInstance.renderCallback(renderedCallback);
          }

          coords = this.popupInstance.containerEventCoords(e);
          this.popupInstance.show(coords.x + 15, coords.y + 15).hideOnBlur(function () {
            _this2.dispatchExternal("TooltipClosed", component.getComponent());

            _this2.popupInstance = null;
          });
          this.dispatchExternal("TooltipOpened", component.getComponent());
        }
      }
    }]);

    return Tooltip;
  }(Module);

  Tooltip.moduleName = "tooltip";

  var defaultValidators = {
    //is integer
    integer: function integer(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      value = Number(value);
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    },
    //is float
    "float": function float(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      value = Number(value);
      return typeof value === 'number' && isFinite(value) && value % 1 !== 0;
    },
    //must be a number
    numeric: function numeric(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      return !isNaN(value);
    },
    //must be a string
    string: function string(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      return isNaN(value);
    },
    //maximum value
    max: function max(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      return parseFloat(value) <= parameters;
    },
    //minimum value
    min: function min(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      return parseFloat(value) >= parameters;
    },
    //starts with  value
    starts: function starts(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      return String(value).toLowerCase().startsWith(String(parameters).toLowerCase());
    },
    //ends with  value
    ends: function ends(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      return String(value).toLowerCase().endsWith(String(parameters).toLowerCase());
    },
    //minimum string length
    minLength: function minLength(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      return String(value).length >= parameters;
    },
    //maximum string length
    maxLength: function maxLength(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      return String(value).length <= parameters;
    },
    //in provided value list
    "in": function _in(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      if (typeof parameters == "string") {
        parameters = parameters.split("|");
      }

      return value === "" || parameters.indexOf(value) > -1;
    },
    //must match provided regex
    regex: function regex(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      var reg = new RegExp(parameters);
      return reg.test(value);
    },
    //value must be unique in this column
    unique: function unique(cell, value, parameters) {
      if (value === "" || value === null || typeof value === "undefined") {
        return true;
      }

      var unique = true;
      var cellData = cell.getData();

      var column = cell.getColumn()._getSelf();

      this.table.rowManager.rows.forEach(function (row) {
        var data = row.getData();

        if (data !== cellData) {
          if (value == column.getFieldValue(data)) {
            unique = false;
          }
        }
      });
      return unique;
    },
    //must have a value
    required: function required(cell, value, parameters) {
      return value !== "" && value !== null && typeof value !== "undefined";
    }
  };

  var Validate = /*#__PURE__*/function (_Module) {
    _inherits(Validate, _Module);

    var _super = _createSuper(Validate);

    function Validate(table) {
      var _this;

      _classCallCheck(this, Validate);

      _this = _super.call(this, table);
      _this.invalidCells = [];

      _this.registerTableOption("validationMode", "blocking");

      _this.registerColumnOption("validator");

      _this.registerTableFunction("getInvalidCells", _this.getInvalidCells.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("clearCellValidation", _this.userClearCellValidation.bind(_assertThisInitialized(_this)));

      _this.registerTableFunction("validate", _this.userValidate.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "isValid", _this.cellIsValid.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "clearValidation", _this.clearValidation.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("cell", "validate", _this.cellValidate.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("column", "validate", _this.columnValidate.bind(_assertThisInitialized(_this)));

      _this.registerComponentFunction("row", "validate", _this.rowValidate.bind(_assertThisInitialized(_this)));

      return _this;
    }

    _createClass(Validate, [{
      key: "initialize",
      value: function initialize() {
        this.subscribe("cell-delete", this.clearValidation.bind(this));
        this.subscribe("column-layout", this.initializeColumnCheck.bind(this));
        this.subscribe("edit-success", this.editValidate.bind(this));
        this.subscribe("edit-editor-clear", this.editorClear.bind(this));
        this.subscribe("edit-edited-clear", this.editedClear.bind(this));
      } ///////////////////////////////////
      ///////// Event Handling //////////
      ///////////////////////////////////

    }, {
      key: "editValidate",
      value: function editValidate(cell, value, previousValue) {
        var _this2 = this;

        var valid = this.table.options.validationMode !== "manual" ? this.validate(cell.column.modules.validate, cell, value) : true; // allow time for editor to make render changes then style cell

        if (valid !== true) {
          setTimeout(function () {
            cell.getElement().classList.add("tabulator-validation-fail");

            _this2.dispatchExternal("validationFailed", cell.getComponent(), value, valid);
          });
        }

        return valid;
      }
    }, {
      key: "editorClear",
      value: function editorClear(cell, cancelled) {
        if (cancelled) {
          if (cell.column.modules.validate) {
            this.cellValidate(cell);
          }
        }

        cell.getElement().classList.remove("tabulator-validation-fail");
      }
    }, {
      key: "editedClear",
      value: function editedClear(cell) {
        if (cell.modules.validate) {
          cell.modules.validate.invalid = false;
        }
      } ///////////////////////////////////
      ////////// Cell Functions /////////
      ///////////////////////////////////

    }, {
      key: "cellIsValid",
      value: function cellIsValid(cell) {
        return cell.modules.validate ? cell.modules.validate.invalid || true : true;
      }
    }, {
      key: "cellValidate",
      value: function cellValidate(cell) {
        return this.validate(cell.column.modules.validate, cell, cell.getValue());
      } ///////////////////////////////////
      ///////// Column Functions ////////
      ///////////////////////////////////

    }, {
      key: "columnValidate",
      value: function columnValidate(column) {
        var _this3 = this;

        var invalid = [];
        column.cells.forEach(function (cell) {
          if (_this3.cellValidate(cell) !== true) {
            invalid.push(cell.getComponent());
          }
        });
        return invalid.length ? invalid : true;
      } ///////////////////////////////////
      ////////// Row Functions //////////
      ///////////////////////////////////

    }, {
      key: "rowValidate",
      value: function rowValidate(row) {
        var _this4 = this;

        var invalid = [];
        row.cells.forEach(function (cell) {
          if (_this4.cellValidate(cell) !== true) {
            invalid.push(cell.getComponent());
          }
        });
        return invalid.length ? invalid : true;
      } ///////////////////////////////////
      ///////// Table Functions /////////
      ///////////////////////////////////

    }, {
      key: "userClearCellValidation",
      value: function userClearCellValidation(cells) {
        var _this5 = this;

        if (!cells) {
          cells = this.getInvalidCells();
        }

        if (!Array.isArray(cells)) {
          cells = [cells];
        }

        cells.forEach(function (cell) {
          _this5.clearValidation(cell._getSelf());
        });
      }
    }, {
      key: "userValidate",
      value: function userValidate(cells) {
        var output = []; //clear row data

        this.table.rowManager.rows.forEach(function (row) {
          row = row.getComponent();
          var valid = row.validate();

          if (valid !== true) {
            output = output.concat(valid);
          }
        });
        return output.length ? output : true;
      } ///////////////////////////////////
      ///////// Internal Logic //////////
      ///////////////////////////////////

    }, {
      key: "initializeColumnCheck",
      value: function initializeColumnCheck(column) {
        if (typeof column.definition.validator !== "undefined") {
          this.initializeColumn(column);
        }
      } //validate

    }, {
      key: "initializeColumn",
      value: function initializeColumn(column) {
        var self = this,
            config = [],
            validator;

        if (column.definition.validator) {
          if (Array.isArray(column.definition.validator)) {
            column.definition.validator.forEach(function (item) {
              validator = self._extractValidator(item);

              if (validator) {
                config.push(validator);
              }
            });
          } else {
            validator = this._extractValidator(column.definition.validator);

            if (validator) {
              config.push(validator);
            }
          }

          column.modules.validate = config.length ? config : false;
        }
      }
    }, {
      key: "_extractValidator",
      value: function _extractValidator(value) {
        var type, params, pos;

        switch (_typeof(value)) {
          case "string":
            pos = value.indexOf(':');

            if (pos > -1) {
              type = value.substring(0, pos);
              params = value.substring(pos + 1);
            } else {
              type = value;
            }

            return this._buildValidator(type, params);

          case "function":
            return this._buildValidator(value);

          case "object":
            return this._buildValidator(value.type, value.parameters);
        }
      }
    }, {
      key: "_buildValidator",
      value: function _buildValidator(type, params) {
        var func = typeof type == "function" ? type : Validate.validators[type];

        if (!func) {
          console.warn("Validator Setup Error - No matching validator found:", type);
          return false;
        } else {
          return {
            type: typeof type == "function" ? "function" : type,
            func: func,
            params: params
          };
        }
      }
    }, {
      key: "validate",
      value: function validate(validators, cell, value) {
        var self = this,
            failedValidators = [],
            invalidIndex = this.invalidCells.indexOf(cell);

        if (validators) {
          validators.forEach(function (item) {
            if (!item.func.call(self, cell.getComponent(), value, item.params)) {
              failedValidators.push({
                type: item.type,
                parameters: item.params
              });
            }
          });
        }

        if (!cell.modules.validate) {
          cell.modules.validate = {};
        }

        if (!failedValidators.length) {
          cell.modules.validate.invalid = false;
          cell.getElement().classList.remove("tabulator-validation-fail");

          if (invalidIndex > -1) {
            this.invalidCells.splice(invalidIndex, 1);
          }
        } else {
          cell.modules.validate.invalid = failedValidators;

          if (this.table.options.validationMode !== "manual") {
            cell.getElement().classList.add("tabulator-validation-fail");
          }

          if (invalidIndex == -1) {
            this.invalidCells.push(cell);
          }
        }

        return failedValidators.length ? failedValidators : true;
      }
    }, {
      key: "getInvalidCells",
      value: function getInvalidCells() {
        var output = [];
        this.invalidCells.forEach(function (cell) {
          output.push(cell.getComponent());
        });
        return output;
      }
    }, {
      key: "clearValidation",
      value: function clearValidation(cell) {
        var invalidIndex;

        if (cell.modules.validate && cell.modules.validate.invalid) {
          cell.getElement().classList.remove("tabulator-validation-fail");
          cell.modules.validate.invalid = false;
          invalidIndex = this.invalidCells.indexOf(cell);

          if (invalidIndex > -1) {
            this.invalidCells.splice(invalidIndex, 1);
          }
        }
      }
    }]);

    return Validate;
  }(Module);

  Validate.moduleName = "validate"; //load defaults

  Validate.validators = defaultValidators;

  var modules = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AccessorModule: Accessor,
    AjaxModule: Ajax,
    ClipboardModule: Clipboard,
    ColumnCalcsModule: ColumnCalcs,
    DataTreeModule: DataTree,
    DownloadModule: Download,
    EditModule: Edit$1,
    ExportModule: Export,
    FilterModule: Filter,
    FormatModule: Format,
    FrozenColumnsModule: FrozenColumns,
    FrozenRowsModule: FrozenRows,
    GroupRowsModule: GroupRows,
    HistoryModule: History,
    HtmlTableImportModule: HtmlTableImport,
    ImportModule: Import,
    InteractionModule: Interaction,
    KeybindingsModule: Keybindings,
    MenuModule: Menu,
    MoveColumnsModule: MoveColumns,
    MoveRowsModule: MoveRows,
    MutatorModule: Mutator,
    PageModule: Page,
    PersistenceModule: Persistence,
    PopupModule: Popup$1,
    PrintModule: Print,
    ReactiveDataModule: ReactiveData,
    ResizeColumnsModule: ResizeColumns,
    ResizeRowsModule: ResizeRows,
    ResizeTableModule: ResizeTable,
    ResponsiveLayoutModule: ResponsiveLayout,
    SelectRowModule: SelectRow,
    SortModule: Sort,
    TooltipModule: Tooltip,
    ValidateModule: Validate
  });

  var TabulatorFull = /*#__PURE__*/function (_Tabulator) {
    _inherits(TabulatorFull, _Tabulator);

    var _super = _createSuper(TabulatorFull);

    function TabulatorFull() {
      _classCallCheck(this, TabulatorFull);

      return _super.apply(this, arguments);
    }

    return TabulatorFull;
  }(Tabulator);

  new ModuleBinder(TabulatorFull, modules);

  return TabulatorFull;

})));
//# sourceMappingURL=tabulator.js.map
