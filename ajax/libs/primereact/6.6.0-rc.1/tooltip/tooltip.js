this.primereact = this.primereact || {};
this.primereact.tooltip = (function (exports, React, ReactDOM, core) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
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

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  function tip(props) {
    var appendTo = props.appendTo || document.body;
    var tooltipWrapper = document.createDocumentFragment();
    core.DomHandler.appendChild(tooltipWrapper, appendTo);
    props = _objectSpread(_objectSpread({}, props), props.options);
    var tooltipEl = /*#__PURE__*/React__default['default'].createElement(Tooltip, props);
    ReactDOM__default['default'].render(tooltipEl, tooltipWrapper);

    var updateTooltip = function updateTooltip(newProps) {
      props = _objectSpread(_objectSpread({}, props), newProps);
      ReactDOM__default['default'].render( /*#__PURE__*/React__default['default'].cloneElement(tooltipEl, props), tooltipWrapper);
    };

    return {
      destroy: function destroy() {
        ReactDOM__default['default'].unmountComponentAtNode(tooltipWrapper);
      },
      updateContent: function updateContent(newContent) {
        console.warn("The 'updateContent' method has been deprecated on Tooltip. Use update(newProps) method.");
        updateTooltip({
          content: newContent
        });
      },
      update: function update(newProps) {
        updateTooltip(newProps);
      }
    };
  }
  var Tooltip = /*#__PURE__*/function (_Component) {
    _inherits(Tooltip, _Component);

    var _super = _createSuper(Tooltip);

    function Tooltip(props) {
      var _this;

      _classCallCheck(this, Tooltip);

      _this = _super.call(this, props);
      _this.state = {
        visible: false,
        position: _this.props.position
      };
      _this.show = _this.show.bind(_assertThisInitialized(_this));
      _this.hide = _this.hide.bind(_assertThisInitialized(_this));
      _this.onMouseEnter = _this.onMouseEnter.bind(_assertThisInitialized(_this));
      _this.onMouseLeave = _this.onMouseLeave.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Tooltip, [{
      key: "isTargetContentEmpty",
      value: function isTargetContentEmpty(target) {
        return !(this.props.content || this.getTargetOption(target, 'tooltip'));
      }
    }, {
      key: "isContentEmpty",
      value: function isContentEmpty(target) {
        return !(this.props.content || this.getTargetOption(target, 'tooltip') || this.props.children);
      }
    }, {
      key: "isMouseTrack",
      value: function isMouseTrack(target) {
        return this.getTargetOption(target, 'mousetrack') || this.props.mouseTrack;
      }
    }, {
      key: "isDisabled",
      value: function isDisabled(target) {
        return this.getTargetOption(target, 'disabled') === 'true' || this.hasTargetOption(target, 'disabled') || this.props.disabled;
      }
    }, {
      key: "isAutoHide",
      value: function isAutoHide() {
        return this.getTargetOption(this.currentTarget, 'autohide') || this.props.autoHide;
      }
    }, {
      key: "getTargetOption",
      value: function getTargetOption(target, option) {
        if (this.hasTargetOption(target, "data-pr-".concat(option))) {
          return target.getAttribute("data-pr-".concat(option));
        }

        return null;
      }
    }, {
      key: "hasTargetOption",
      value: function hasTargetOption(target, option) {
        return target && target.hasAttribute(option);
      }
    }, {
      key: "getEvents",
      value: function getEvents(target) {
        var showEvent = this.getTargetOption(target, 'showevent') || this.props.showEvent;
        var hideEvent = this.getTargetOption(target, 'hideevent') || this.props.hideEvent;

        if (this.isMouseTrack(target)) {
          showEvent = 'mousemove';
          hideEvent = 'mouseleave';
        } else {
          var event = this.getTargetOption(target, 'event') || this.props.event;

          if (event === 'focus') {
            showEvent = 'focus';
            hideEvent = 'blur';
          }
        }

        return {
          showEvent: showEvent,
          hideEvent: hideEvent
        };
      }
    }, {
      key: "getPosition",
      value: function getPosition(target) {
        return this.getTargetOption(target, 'position') || this.state.position;
      }
    }, {
      key: "getMouseTrackPosition",
      value: function getMouseTrackPosition(target) {
        var top = this.getTargetOption(target, 'mousetracktop') || this.props.mouseTrackTop;
        var left = this.getTargetOption(target, 'mousetrackleft') || this.props.mouseTrackLeft;
        return {
          top: top,
          left: left
        };
      }
    }, {
      key: "updateText",
      value: function updateText(target, callback) {
        if (this.tooltipTextEl) {
          var content = this.getTargetOption(target, 'tooltip') || this.props.content;

          if (content) {
            this.tooltipTextEl.innerHTML = ''; // remove children

            this.tooltipTextEl.appendChild(document.createTextNode(content));
            callback();
          } else if (this.props.children) {
            callback();
          }
        }
      }
    }, {
      key: "show",
      value: function show(e) {
        var _this2 = this;

        this.currentTarget = e.currentTarget;

        if (this.isContentEmpty(this.currentTarget) || this.isDisabled(this.currentTarget)) {
          return;
        }

        var updateTooltipState = function updateTooltipState() {
          _this2.updateText(_this2.currentTarget, function () {
            if (_this2.props.autoZIndex && !core.ZIndexUtils.get(_this2.containerEl)) {
              core.ZIndexUtils.set('tooltip', _this2.containerEl, _this2.props.baseZIndex);
            }

            _this2.containerEl.style.left = '';
            _this2.containerEl.style.top = '';

            if (_this2.isMouseTrack(_this2.currentTarget) && !_this2.containerSize) {
              _this2.containerSize = {
                width: core.DomHandler.getOuterWidth(_this2.containerEl),
                height: core.DomHandler.getOuterHeight(_this2.containerEl)
              };
            }

            _this2.align(_this2.currentTarget, {
              x: e.pageX,
              y: e.pageY
            });
          });
        };

        if (this.state.visible) {
          this.applyDelay('updateDelay', updateTooltipState);
        } else {
          this.sendCallback(this.props.onBeforeShow, {
            originalEvent: e,
            target: this.currentTarget
          });
          this.applyDelay('showDelay', function () {
            _this2.setState({
              visible: true,
              position: _this2.getPosition(_this2.currentTarget)
            }, function () {
              updateTooltipState();

              _this2.sendCallback(_this2.props.onShow, {
                originalEvent: e,
                target: _this2.currentTarget
              });
            });

            _this2.bindDocumentResizeListener();

            _this2.bindScrollListener();

            core.DomHandler.addClass(_this2.currentTarget, _this2.getTargetOption(_this2.currentTarget, 'classname'));
          });
        }
      }
    }, {
      key: "hide",
      value: function hide(e) {
        var _this3 = this;

        this.clearTimeouts();

        if (this.state.visible) {
          core.DomHandler.removeClass(this.currentTarget, this.getTargetOption(this.currentTarget, 'classname'));
          this.sendCallback(this.props.onBeforeHide, {
            originalEvent: e,
            target: this.currentTarget
          });
          this.applyDelay('hideDelay', function () {
            core.ZIndexUtils.clear(_this3.containerEl);
            core.DomHandler.removeClass(_this3.containerEl, 'p-tooltip-active');

            if (!_this3.isAutoHide() && _this3.allowHide === false) {
              return;
            }

            _this3.setState({
              visible: false,
              position: _this3.props.position
            }, function () {
              if (_this3.tooltipTextEl) {
                ReactDOM__default['default'].unmountComponentAtNode(_this3.tooltipTextEl);
              }

              _this3.unbindDocumentResizeListener();

              _this3.unbindScrollListener();

              _this3.currentTarget = null;
              _this3.scrollHandler = null;
              _this3.containerSize = null;
              _this3.allowHide = true;

              _this3.sendCallback(_this3.props.onHide, {
                originalEvent: e,
                target: _this3.currentTarget
              });
            });
          });
        }
      }
    }, {
      key: "align",
      value: function align(target, coordinate) {
        var _this4 = this;

        var left = 0,
            top = 0;

        if (this.isMouseTrack(target) && coordinate) {
          var containerSize = {
            width: core.DomHandler.getOuterWidth(this.containerEl),
            height: core.DomHandler.getOuterHeight(this.containerEl)
          };
          left = coordinate.x;
          top = coordinate.y;

          var _this$getMouseTrackPo = this.getMouseTrackPosition(target),
              mouseTrackTop = _this$getMouseTrackPo.top,
              mouseTrackLeft = _this$getMouseTrackPo.left;

          switch (this.state.position) {
            case 'left':
              left -= containerSize.width + mouseTrackLeft;
              top -= containerSize.height / 2 - mouseTrackTop;
              break;

            case 'right':
              left += mouseTrackLeft;
              top -= containerSize.height / 2 - mouseTrackTop;
              break;

            case 'top':
              left -= containerSize.width / 2 - mouseTrackLeft;
              top -= containerSize.height + mouseTrackTop;
              break;

            case 'bottom':
              left -= containerSize.width / 2 - mouseTrackLeft;
              top += mouseTrackTop;
              break;
          }

          if (left <= 0 || this.containerSize.width > containerSize.width) {
            this.containerEl.style.left = '0px';
            this.containerEl.style.right = window.innerWidth - containerSize.width - left + 'px';
          } else {
            this.containerEl.style.right = '';
            this.containerEl.style.left = left + 'px';
          }

          this.containerEl.style.top = top + 'px';
          core.DomHandler.addClass(this.containerEl, 'p-tooltip-active');
        } else {
          var pos = core.DomHandler.findCollisionPosition(this.state.position);
          var my = this.getTargetOption(target, 'my') || this.props.my || pos.my;
          var at = this.getTargetOption(target, 'at') || this.props.at || pos.at;
          this.containerEl.style.padding = '0px';
          core.DomHandler.flipfitCollision(this.containerEl, target, my, at, function (currentPosition) {
            var _currentPosition$at = currentPosition.at,
                atX = _currentPosition$at.x,
                atY = _currentPosition$at.y;
            var myX = currentPosition.my.x;
            var position = _this4.props.at ? atX !== 'center' && atX !== myX ? atX : atY : currentPosition.at["".concat(pos.axis)];
            _this4.containerEl.style.padding = '';

            _this4.setState({
              position: position
            }, function () {
              _this4.updateContainerPosition();

              core.DomHandler.addClass(_this4.containerEl, 'p-tooltip-active');
            });
          });
        }
      }
    }, {
      key: "updateContainerPosition",
      value: function updateContainerPosition() {
        if (this.containerEl) {
          var style = getComputedStyle(this.containerEl);
          if (this.state.position === 'left') this.containerEl.style.left = parseFloat(style.left) - parseFloat(style.paddingLeft) * 2 + 'px';else if (this.state.position === 'top') this.containerEl.style.top = parseFloat(style.top) - parseFloat(style.paddingTop) * 2 + 'px';
        }
      }
    }, {
      key: "onMouseEnter",
      value: function onMouseEnter() {
        if (!this.isAutoHide()) {
          this.allowHide = false;
        }
      }
    }, {
      key: "onMouseLeave",
      value: function onMouseLeave(e) {
        if (!this.isAutoHide()) {
          this.allowHide = true;
          this.hide(e);
        }
      }
    }, {
      key: "bindDocumentResizeListener",
      value: function bindDocumentResizeListener() {
        var _this5 = this;

        this.documentResizeListener = function (e) {
          if (!core.DomHandler.isAndroid()) {
            _this5.hide(e);
          }
        };

        window.addEventListener('resize', this.documentResizeListener);
      }
    }, {
      key: "unbindDocumentResizeListener",
      value: function unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
          window.removeEventListener('resize', this.documentResizeListener);
          this.documentResizeListener = null;
        }
      }
    }, {
      key: "bindScrollListener",
      value: function bindScrollListener() {
        var _this6 = this;

        if (!this.scrollHandler) {
          this.scrollHandler = new core.ConnectedOverlayScrollHandler(this.currentTarget, function (e) {
            if (_this6.state.visible) {
              _this6.hide(e);
            }
          });
        }

        this.scrollHandler.bindScrollListener();
      }
    }, {
      key: "unbindScrollListener",
      value: function unbindScrollListener() {
        if (this.scrollHandler) {
          this.scrollHandler.unbindScrollListener();
        }
      }
    }, {
      key: "bindTargetEvent",
      value: function bindTargetEvent(target) {
        if (target) {
          var _this$getEvents = this.getEvents(target),
              showEvent = _this$getEvents.showEvent,
              hideEvent = _this$getEvents.hideEvent;

          target.addEventListener(showEvent, this.show);
          target.addEventListener(hideEvent, this.hide);
        }
      }
    }, {
      key: "unbindTargetEvent",
      value: function unbindTargetEvent(target) {
        if (target) {
          var _this$getEvents2 = this.getEvents(target),
              showEvent = _this$getEvents2.showEvent,
              hideEvent = _this$getEvents2.hideEvent;

          target.removeEventListener(showEvent, this.show);
          target.removeEventListener(hideEvent, this.hide);
        }
      }
    }, {
      key: "applyDelay",
      value: function applyDelay(delayProp, callback) {
        this.clearTimeouts();
        var delay = this.getTargetOption(this.currentTarget, delayProp.toLowerCase()) || this.props[delayProp];

        if (!!delay) {
          this["".concat(delayProp, "Timeout")] = setTimeout(function () {
            return callback();
          }, delay);
        } else {
          callback();
        }
      }
    }, {
      key: "sendCallback",
      value: function sendCallback(callback) {
        if (callback) {
          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          callback.apply(void 0, params);
        }
      }
    }, {
      key: "clearTimeouts",
      value: function clearTimeouts() {
        clearTimeout(this.showDelayTimeout);
        clearTimeout(this.updateDelayTimeout);
        clearTimeout(this.hideDelayTimeout);
      }
    }, {
      key: "updateTargetEvents",
      value: function updateTargetEvents(target) {
        this.unloadTargetEvents(target);
        this.loadTargetEvents(target);
      }
    }, {
      key: "loadTargetEvents",
      value: function loadTargetEvents(target) {
        this.setTargetEventOperations(target || this.props.target, 'bindTargetEvent');
      }
    }, {
      key: "unloadTargetEvents",
      value: function unloadTargetEvents(target) {
        this.setTargetEventOperations(target || this.props.target, 'unbindTargetEvent');
      }
    }, {
      key: "setTargetEventOperations",
      value: function setTargetEventOperations(target, operation) {
        var _this7 = this;

        if (target) {
          if (core.DomHandler.isElement(target)) {
            this[operation](target);
          } else {
            var setEvent = function setEvent(target) {
              var element = core.DomHandler.find(document, target);
              element.forEach(function (el) {
                _this7[operation](el);
              });
            };

            if (target instanceof Array) {
              target.forEach(function (t) {
                setEvent(t);
              });
            } else {
              setEvent(target);
            }
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.target) {
          this.loadTargetEvents();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this8 = this;

        if (prevProps.target !== this.props.target) {
          this.unloadTargetEvents(prevProps.target);
          this.loadTargetEvents();
        }

        if (this.state.visible) {
          if (prevProps.content !== this.props.content) {
            this.applyDelay('updateDelay', function () {
              _this8.updateText(_this8.currentTarget, function () {
                _this8.align(_this8.currentTarget);
              });
            });
          }

          if (this.currentTarget && this.isDisabled(this.currentTarget)) {
            this.hide();
          }
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearTimeouts();
        this.unbindDocumentResizeListener();
        this.unloadTargetEvents();

        if (this.scrollHandler) {
          this.scrollHandler.destroy();
          this.scrollHandler = null;
        }

        core.ZIndexUtils.clear(this.containerEl);
      }
    }, {
      key: "renderElement",
      value: function renderElement() {
        var _this9 = this;

        var tooltipClassName = core.classNames('p-tooltip p-component', _defineProperty({}, "p-tooltip-".concat(this.state.position), true), this.props.className);
        var isTargetContentEmpty = this.isTargetContentEmpty(this.currentTarget);
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          ref: function ref(el) {
            return _this9.containerEl = el;
          },
          className: tooltipClassName,
          style: this.props.style,
          role: "tooltip",
          "aria-hidden": this.state.visible,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-tooltip-arrow"
        }), /*#__PURE__*/React__default['default'].createElement("div", {
          ref: function ref(el) {
            return _this9.tooltipTextEl = el;
          },
          className: "p-tooltip-text"
        }, isTargetContentEmpty && this.props.children));
      }
    }, {
      key: "render",
      value: function render() {
        if (this.state.visible) {
          var element = this.renderElement();
          return /*#__PURE__*/React__default['default'].createElement(core.Portal, {
            element: element,
            appendTo: this.props.appendTo,
            visible: true
          });
        }

        return null;
      }
    }]);

    return Tooltip;
  }(React.Component);

  _defineProperty(Tooltip, "defaultProps", {
    id: null,
    target: null,
    content: null,
    disabled: false,
    className: null,
    style: null,
    appendTo: null,
    position: 'right',
    my: null,
    at: null,
    event: null,
    showEvent: 'mouseenter',
    hideEvent: 'mouseleave',
    autoZIndex: true,
    baseZIndex: 0,
    mouseTrack: false,
    mouseTrackTop: 5,
    mouseTrackLeft: 5,
    showDelay: 0,
    updateDelay: 0,
    hideDelay: 0,
    autoHide: true,
    onBeforeShow: null,
    onBeforeHide: null,
    onShow: null,
    onHide: null
  });

  exports.Tooltip = Tooltip;
  exports.tip = tip;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, ReactDOM, primereact.core));
