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
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/evented-state", "../../globals/js/mixins/handles", "../../globals/js/misc/event-matches", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/evented-state"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/event-matches"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.eventedState, global.handles, global.eventMatches, global.on);
    global.fileUploader = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _eventedState, _handles, _eventMatches, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);
  _eventedState = _interopRequireDefault(_eventedState);
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

  var FileUploader = /*#__PURE__*/function (_mixin) {
    _inherits(FileUploader, _mixin);

    var _super = _createSuper(FileUploader);
    /**
     * File uploader.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends eventedState
     * @extends Handles
     * @param {HTMLElement} element The element working as a file uploader.
     * @param {object} [options] The component options. See static options.
     */


    /**
     * File uploader.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends eventedState
     * @extends Handles
     * @param {HTMLElement} element The element working as a file uploader.
     * @param {object} [options] The component options. See static options.
     */
    function FileUploader(element) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, FileUploader);

      _this = _super.call(this, element, options);

      _this._changeState = function (state, detail, callback) {
        if (state === 'delete-filename-fileuploader') {
          _this.container.removeChild(detail.filenameElement);
        }

        if (typeof callback === 'function') {
          callback();
        }
      };

      _this._handleDeleteButton = function (evt) {
        var target = (0, _eventMatches.default)(evt, _this.options.selectorCloseButton);

        if (target) {
          _this.changeState('delete-filename-fileuploader', {
            initialEvt: evt,
            filenameElement: target.closest(_this.options.selectorSelectedFile)
          });
        }
      };

      _this._handleDragDrop = function (evt) {
        var isOfSelf = _this.element.contains(evt.target); // In IE11 `evt.dataTransfer.types` is a `DOMStringList` instead of an array


        // In IE11 `evt.dataTransfer.types` is a `DOMStringList` instead of an array
        if (Array.prototype.indexOf.call(evt.dataTransfer.types, 'Files') >= 0 && !(0, _eventMatches.default)(evt, _this.options.selectorOtherDropContainers)) {
          var inArea = isOfSelf && (0, _eventMatches.default)(evt, _this.options.selectorDropContainer);

          if (evt.type === 'dragover') {
            evt.preventDefault();
            var dropEffect = inArea ? 'copy' : 'none';

            if (Array.isArray(evt.dataTransfer.types)) {
              // IE11 throws a "permission denied" error accessing `.effectAllowed`
              evt.dataTransfer.effectAllowed = dropEffect;
            }

            evt.dataTransfer.dropEffect = dropEffect;

            _this.dropContainer.classList.toggle(_this.options.classDragOver, Boolean(inArea));
          }

          if (evt.type === 'dragleave') {
            _this.dropContainer.classList.toggle(_this.options.classDragOver, false);
          }

          if (inArea && evt.type === 'drop') {
            evt.preventDefault();

            _this._displayFilenames(evt.dataTransfer.files);

            _this.dropContainer.classList.remove(_this.options.classDragOver);
          }
        }
      };

      _this.input = _this.element.querySelector(_this.options.selectorInput);
      _this.container = _this.element.querySelector(_this.options.selectorContainer);
      _this.dropContainer = _this.element.querySelector(_this.options.selectorDropContainer);

      if (!_this.input) {
        throw new TypeError('Cannot find the file input box.');
      }

      if (!_this.container) {
        throw new TypeError('Cannot find the file names container.');
      }

      _this.inputId = _this.input.getAttribute('id');

      _this.manage((0, _on.default)(_this.input, 'change', function () {
        return _this._displayFilenames();
      }));

      _this.manage((0, _on.default)(_this.container, 'click', _this._handleDeleteButton));

      _this.manage((0, _on.default)(_this.element.ownerDocument, 'dragleave', _this._handleDragDrop));

      _this.manage((0, _on.default)(_this.dropContainer, 'dragover', _this._handleDragDrop));

      _this.manage((0, _on.default)(_this.dropContainer, 'drop', _this._handleDragDrop));

      return _this;
    }

    _createClass(FileUploader, [{
      key: "_filenamesHTML",
      value: function _filenamesHTML(name, id) {
        return "<span class=\"".concat(this.options.classSelectedFile, "\">\n      <p class=\"").concat(this.options.classFileName, "\">").concat(name, "</p>\n      <span data-for=\"").concat(id, "\" class=\"").concat(this.options.classStateContainer, "\"></span>\n    </span>");
      }
    }, {
      key: "_uploadHTML",
      value: function _uploadHTML() {
        return "\n      <div class=\"".concat(this.options.classLoadingAnimation, "\">\n        <div data-inline-loading-spinner class=\"").concat(this.options.classLoading, "\">\n          <svg class=\"").concat(this.options.classLoadingSvg, "\" viewBox=\"-75 -75 150 150\">\n            <circle class=\"").concat(this.options.classLoadingBackground, "\" cx=\"0\" cy=\"0\" r=\"37.5\" />\n            <circle class=\"").concat(this.options.classLoadingStroke, "\" cx=\"0\" cy=\"0\" r=\"37.5\" />\n          </svg>\n        </div>\n      </div>");
      }
    }, {
      key: "_closeButtonHTML",
      value: function _closeButtonHTML() {
        return "\n      <button class=\"".concat(this.options.classFileClose, "\" type=\"button\" aria-label=\"close\">\n      <svg aria-hidden=\"true\" viewBox=\"0 0 16 16\" width=\"16\" height=\"16\">\n      <path fill=\"#231F20\" d=\"M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z\"/>\n      </svg>\n      </button>");
      }
    }, {
      key: "_checkmarkHTML",
      value: function _checkmarkHTML() {
        return "\n      <svg focusable=\"false\"\n        preserveAspectRatio=\"xMidYMid meet\"\n        style=\"will-change: transform;\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        class=\"".concat(this.options.classFileComplete, "\"\n        width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"\n        aria-hidden=\"true\">\n        <path d=\"M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zM7 11L4.3 8.3l.9-.8L7 9.3l4-3.9.9.8L7 11z\"></path>\n        <path d=\"M7 11L4.3 8.3l.9-.8L7 9.3l4-3.9.9.8L7 11z\" data-icon-path=\"inner-path\" opacity=\"0\"></path>\n      </svg>\n    ");
      }
    }, {
      key: "_getStateContainers",
      value: function _getStateContainers() {
        var stateContainers = toArray(this.element.querySelectorAll("[data-for=".concat(this.inputId, "]")));

        if (stateContainers.length === 0) {
          throw new TypeError('State container elements not found; invoke _displayFilenames() first');
        }

        if (stateContainers[0].dataset.for !== this.inputId) {
          throw new TypeError('File input id must equal [data-for] attribute');
        }

        return stateContainers;
      }
      /**
       * Inject selected files into DOM. Invoked on change event.
       * @param {File[]} files The files to upload.
       */

    }, {
      key: "_displayFilenames",
      value: function _displayFilenames() {
        var _this2 = this;

        var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.input.files;
        var container = this.element.querySelector(this.options.selectorContainer);
        var HTMLString = toArray(files).map(function (file) {
          return _this2._filenamesHTML(file.name, _this2.inputId);
        }).join('');
        container.insertAdjacentHTML('afterbegin', HTMLString);
      }
    }, {
      key: "_removeState",
      value: function _removeState(element) {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          throw new TypeError('DOM element should be given to initialize this widget.');
        }

        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    }, {
      key: "_handleStateChange",
      value: function _handleStateChange(elements, selectIndex, html) {
        var _this3 = this;

        if (selectIndex === undefined) {
          elements.forEach(function (el) {
            _this3._removeState(el);

            el.insertAdjacentHTML('beforeend', html);
          });
        } else {
          elements.forEach(function (el, index) {
            if (index === selectIndex) {
              _this3._removeState(el);

              el.insertAdjacentHTML('beforeend', html);
            }
          });
        }
      }
      /**
       * Handles delete button.
       * @param {Event} evt The event triggering this action.
       * @private
       */

    }, {
      key: "setState",
      value: function setState(state, selectIndex) {
        var stateContainers = this._getStateContainers();

        if (state === 'edit') {
          this._handleStateChange(stateContainers, selectIndex, this._closeButtonHTML());
        }

        if (state === 'upload') {
          this._handleStateChange(stateContainers, selectIndex, this._uploadHTML());
        }

        if (state === 'complete') {
          this._handleStateChange(stateContainers, selectIndex, this._checkmarkHTML());
        }
      }
      /**
       * The map associating DOM element and file uploader instance.
       * @member FileUploader.components
       * @type {WeakMap}
       */

    }], [{
      key: "options",
      get: function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-file]',
          selectorInput: "input[type=\"file\"].".concat(prefix, "--file-input"),
          selectorContainer: '[data-file-container]',
          selectorCloseButton: ".".concat(prefix, "--file-close"),
          selectorSelectedFile: ".".concat(prefix, "--file__selected-file"),
          selectorDropContainer: "[data-file-drop-container]",
          selectorOtherDropContainers: '[data-drop-container]',
          classLoading: "".concat(prefix, "--loading ").concat(prefix, "--loading--small"),
          classLoadingAnimation: "".concat(prefix, "--inline-loading__animation"),
          classLoadingSvg: "".concat(prefix, "--loading__svg"),
          classLoadingBackground: "".concat(prefix, "--loading__background"),
          classLoadingStroke: "".concat(prefix, "--loading__stroke"),
          classFileName: "".concat(prefix, "--file-filename"),
          classFileClose: "".concat(prefix, "--file-close"),
          classFileComplete: "".concat(prefix, "--file-complete"),
          classSelectedFile: "".concat(prefix, "--file__selected-file"),
          classStateContainer: "".concat(prefix, "--file__state-container"),
          classDragOver: "".concat(prefix, "--file__drop-container--drag-over"),
          eventBeforeDeleteFilenameFileuploader: 'fileuploader-before-delete-filename',
          eventAfterDeleteFilenameFileuploader: 'fileuploader-after-delete-filename'
        };
      }
    }]);

    FileUploader.components = new WeakMap();
    return FileUploader;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _eventedState.default, _handles.default));

  var _default = FileUploader;
  _exports.default = _default;
});