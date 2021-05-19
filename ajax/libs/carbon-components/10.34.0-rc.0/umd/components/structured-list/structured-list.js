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

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/handles", "../../globals/js/misc/event-matches", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/event-matches"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.handles, global.eventMatches, global.on);
    global.structuredList = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _handles, _eventMatches, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);
  _handles = _interopRequireDefault(_handles);
  _eventMatches = _interopRequireDefault(_eventMatches);
  _on = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var toArray = function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };

  var StructuredList = /*#__PURE__*/function (_mixin) {
    _inherits(StructuredList, _mixin);

    var _super = _createSuper(StructuredList);
    /**
     * StructuredList
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The root element of tables
     * @param {object} [options] the... options
     * @param {string} [options.selectorInit] selector initialization
     * @param {string} [options.selectorRow] css selector for selected row
     */


    /**
     * StructuredList
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The root element of tables
     * @param {object} [options] the... options
     * @param {string} [options.selectorInit] selector initialization
     * @param {string} [options.selectorRow] css selector for selected row
     */
    function StructuredList(element, options) {
      var _this;

      _classCallCheck(this, StructuredList);

      _this = _super.call(this, element, options);

      _this.manage((0, _on.default)(_this.element, 'keydown', function (evt) {
        if (evt.which === 37 || evt.which === 38 || evt.which === 39 || evt.which === 40) {
          _this._handleKeydownArrow(evt);
        }

        if (evt.which === 13 || evt.which === 32) {
          _this._handleKeydownChecked(evt);
        }
      }));

      _this.manage((0, _on.default)(_this.element, 'click', function (evt) {
        _this._handleClick(evt);
      }));

      return _this;
    }

    _createClass(StructuredList, [{
      key: "_direction",
      value: function _direction(evt) {
        return {
          37: -1,
          // backward
          38: -1,
          // backward
          39: 1,
          // forward
          40: 1 // forward

        }[evt.which];
      }
    }, {
      key: "_nextIndex",
      value: function _nextIndex(array, arrayItem, direction) {
        return array.indexOf(arrayItem) + direction; // returns -1, 0, 1, 2, 3, 4...
      }
    }, {
      key: "_getInput",
      value: function _getInput(index) {
        var rows = toArray(this.element.querySelectorAll(this.options.selectorRow));
        return this.element.ownerDocument.querySelector(this.options.selectorListInput(rows[index].getAttribute('for')));
      }
    }, {
      key: "_handleInputChecked",
      value: function _handleInputChecked(index) {
        var rows = this.element.querySelectorAll(this.options.selectorRow);
        var input = this.getInput(index) || rows[index].querySelector('input');
        input.checked = true;
      }
    }, {
      key: "_handleClick",
      value: function _handleClick(evt) {
        var _this2 = this;

        var selectedRow = (0, _eventMatches.default)(evt, this.options.selectorRow);
        toArray(this.element.querySelectorAll(this.options.selectorRow)).forEach(function (row) {
          return row.classList.remove(_this2.options.classActive);
        });

        if (selectedRow) {
          selectedRow.classList.add(this.options.classActive);
        }
      } // Handle Enter or Space keydown events for selecting <label> rows

    }, {
      key: "_handleKeydownChecked",
      value: function _handleKeydownChecked(evt) {
        var _this3 = this;

        evt.preventDefault(); // prevent spacebar from scrolling page

        // prevent spacebar from scrolling page
        var selectedRow = (0, _eventMatches.default)(evt, this.options.selectorRow);
        toArray(this.element.querySelectorAll(this.options.selectorRow)).forEach(function (row) {
          return row.classList.remove(_this3.options.classActive);
        });

        if (selectedRow) {
          selectedRow.classList.add(this.options.classActive);
          var input = selectedRow.querySelector(this.options.selectorListInput(selectedRow.getAttribute('for'))) || selectedRow.querySelector('input');
          input.checked = true;
        }
      } // Handle up and down keydown events for selecting <label> rows

    }, {
      key: "_handleKeydownArrow",
      value: function _handleKeydownArrow(evt) {
        var _this4 = this;

        evt.preventDefault(); // prevent arrow keys from scrolling

        // prevent arrow keys from scrolling
        var selectedRow = (0, _eventMatches.default)(evt, this.options.selectorRow);

        var direction = this._direction(evt);

        if (direction && selectedRow !== undefined) {
          var rows = toArray(this.element.querySelectorAll(this.options.selectorRow));
          rows.forEach(function (row) {
            return row.classList.remove(_this4.options.classActive);
          });
          var firstIndex = 0;

          var nextIndex = this._nextIndex(rows, selectedRow, direction);

          var lastIndex = rows.length - 1;

          var getSelectedIndex = function getSelectedIndex() {
            switch (nextIndex) {
              case -1:
                return lastIndex;

              case rows.length:
                return firstIndex;

              default:
                return nextIndex;
            }
          };

          var selectedIndex = getSelectedIndex();
          rows[selectedIndex].classList.add(this.options.classActive);
          rows[selectedIndex].focus();

          this._handleInputChecked(selectedIndex);
        }
      }
    }], [{
      key: "options",
      get: function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-structured-list]',
          selectorRow: "[data-structured-list] .".concat(prefix, "--structured-list-tbody > label.").concat(prefix, "--structured-list-row"),
          selectorListInput: function selectorListInput(id) {
            return "#".concat(id, ".").concat(prefix, "--structured-list-input");
          },
          classActive: "".concat(prefix, "--structured-list-row--selected")
        };
      }
    }]);

    StructuredList.components = new WeakMap();
    return StructuredList;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _handles.default));

  var _default = StructuredList;
  _exports.default = _default;
});