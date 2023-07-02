var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint max-lines: 0 */

import { flush } from 'beaver-logger/client';
import { isSameDomain, matchDomain, getDomain } from 'cross-domain-utils/src';
import { send } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { onResize } from 'belter/src';

import { BaseComponent } from '../base';
import { getParentComponentWindow as _getParentComponentWindow, getComponentMeta, getParentDomain as _getParentDomain, getParentRenderWindow as _getParentRenderWindow } from '../window';
import { extend, deserializeFunctions, get, stringify, globalFor, setLogLevel, getElement, noop, stringifyError } from '../../lib';
import { POST_MESSAGE, CONTEXT_TYPES, CLOSE_REASONS, INITIAL_PROPS } from '../../constants';
import { RenderError } from '../../error';


import { normalizeChildProps } from './props';

/*  Child Component
    ---------------

    This is the portion of code which runs inside the frame or popup window containing the component's implementation.

    When the component author calls myComponent.attach(), it creates a new instance of ChildComponent, which is then
    responsible for managing the state and messaging back up to the parent, and providing props for the component to
    utilize.
*/

export var ChildComponent = function (_BaseComponent) {
    _inherits(ChildComponent, _BaseComponent);

    function ChildComponent(component) {
        _classCallCheck(this, ChildComponent);

        var _this = _possibleConstructorReturn(this, _BaseComponent.call(this));

        _this.component = component;

        if (!_this.hasValidParentDomain()) {
            _this.error(new RenderError('Can not be rendered by domain: ' + _this.getParentDomain()));
            return _possibleConstructorReturn(_this);
        }

        _this.component.log('construct_child');

        // The child can specify some default props if none are passed from the parent. This often makes integrations
        // a little more seamless, as applicaiton code can call props.foo() without worrying about whether the parent
        // has provided them or not, and fall-back to some default behavior.

        _this.onPropHandlers = [];

        var _loop = function _loop(_i2, _ref2, _length2) {
            var item = _ref2[_i2];
            var _loop2 = function _loop2(_i4, _ref4, _length4) {
                var _ref4$_i = _ref4[_i4],
                    name = _ref4$_i[0],
                    getter = _ref4$_i[1];

                // $FlowFixMe
                Object.defineProperty(item, name, {
                    configurable: true,
                    get: function get() {
                        if (!_this.props) {
                            _this.setProps(_this.getInitialProps(), _getParentDomain());
                        }
                        // $FlowFixMe
                        delete item[name];
                        // $FlowFixMe
                        item[name] = getter();
                        // $FlowFixMe
                        return item[name];
                    }
                });
            };

            for (var _i4 = 0, _ref4 = [['xchild', function () {
                return _this;
            }], ['xprops', function () {
                return _this.props;
            }]], _length4 = _ref4 == null ? 0 : _ref4.length; _i4 < _length4; _i4++) {
                _loop2(_i4, _ref4, _length4);
            }
        };

        for (var _i2 = 0, _ref2 = [_this.component, window], _length2 = _ref2 == null ? 0 : _ref2.length; _i2 < _length2; _i2++) {
            _loop(_i2, _ref2, _length2);
        }

        _this.component.log('init_child');

        _this.setWindows();

        // Send an init message to our parent. This gives us an initial set of data to use that we can use to function.
        //
        // For example:
        //
        // - What context are we
        // - What props has the parent specified

        _this.onInit = _this.sendToParent(POST_MESSAGE.INIT, {

            exports: _this.exports()

        }).then(function (_ref5) {
            var origin = _ref5.origin,
                data = _ref5.data;


            _this.context = data.context;
            _this.setProps(data.props, origin);

            _this.watchForResize();

            return _this;
        })['catch'](function (err) {

            _this.error(err);
            throw err;
        });
        return _this;
    }

    ChildComponent.prototype.hasValidParentDomain = function hasValidParentDomain() {
        return matchDomain(this.component.allowedParentDomains, this.getParentDomain());
    };

    ChildComponent.prototype.init = function init() {
        return this.onInit;
    };

    ChildComponent.prototype.getParentDomain = function getParentDomain() {
        return _getParentDomain();
    };

    ChildComponent.prototype.onProps = function onProps(handler) {
        this.onPropHandlers.push(handler);
    };

    ChildComponent.prototype.getParentComponentWindow = function getParentComponentWindow() {
        return _getParentComponentWindow();
    };

    ChildComponent.prototype.getParentRenderWindow = function getParentRenderWindow() {
        return _getParentRenderWindow();
    };

    ChildComponent.prototype.getInitialProps = function getInitialProps() {
        var _this2 = this;

        var componentMeta = getComponentMeta();

        var props = componentMeta.props;

        if (props.type === INITIAL_PROPS.RAW) {
            props = props.value;
        } else if (props.type === INITIAL_PROPS.UID) {

            var parentComponentWindow = _getParentComponentWindow();

            if (!isSameDomain(parentComponentWindow)) {

                if (window.location.protocol === 'file:') {
                    throw new Error('Can not get props from file:// domain');
                }

                throw new Error('Parent component window is on a different domain - expected ' + getDomain() + ' - can not retrieve props');
            }

            var global = globalFor(parentComponentWindow);

            if (!global) {
                throw new Error('Can not find global for parent component - can not retrieve props');
            }

            props = JSON.parse(global.props[componentMeta.uid]);
        } else {
            throw new Error('Unrecognized props type: ' + props.type);
        }

        if (!props) {
            throw new Error('Initial props not found');
        }

        return deserializeFunctions(props, function (_ref6) {
            var fullKey = _ref6.fullKey,
                self = _ref6.self,
                args = _ref6.args;

            return _this2.onInit.then(function () {
                var func = get(_this2.props, fullKey);

                if (typeof func !== 'function') {
                    throw new TypeError('Expected ' + fullKey + ' to be function, got ' + (typeof func === 'undefined' ? 'undefined' : _typeof(func)));
                }

                return func.apply(self, args);
            });
        });
    };

    ChildComponent.prototype.setProps = function setProps(props, origin) {
        var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        // $FlowFixMe
        this.props = this.props || {};
        var normalizedProps = normalizeChildProps(this.component, props, origin, required);
        extend(this.props, normalizedProps);
        if (this.props.logLevel) {
            setLogLevel(this.props.logLevel);
        }

        for (var _i6 = 0, _onPropHandlers2 = this.onPropHandlers, _length6 = _onPropHandlers2 == null ? 0 : _onPropHandlers2.length; _i6 < _length6; _i6++) {
            var handler = _onPropHandlers2[_i6];
            handler.call(this, this.props);
        }
    };

    /*  Send to Parent
        --------------
         Send a post message to our parent window.
    */

    ChildComponent.prototype.sendToParent = function sendToParent(name) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var parentWindow = _getParentComponentWindow();

        if (!parentWindow) {
            throw new Error('Can not find parent component window to message');
        }

        this.component.log('send_to_parent_' + name);

        return send(parentWindow, name, data, _extends({ domain: _getParentDomain() }, options));
    };

    /*  Set Windows
        -----------
         Determine the parent window, and the parent component window. Note -- these may be different, if we were
        rendered using renderTo.
    */

    ChildComponent.prototype.setWindows = function setWindows() {

        // Ensure we do not try to .attach() multiple times for the same component on the same page

        if (window.__activeZoidComponent__) {
            throw this.component.createError('Can not attach multiple components to the same window');
        }

        window.__activeZoidComponent__ = this;

        // Get the direct parent window

        if (!_getParentComponentWindow()) {
            throw this.component.createError('Can not find parent window');
        }

        var componentMeta = getComponentMeta();

        if (componentMeta.tag !== this.component.tag) {
            throw this.component.createError('Parent is ' + componentMeta.tag + ' - can not attach ' + this.component.tag);
        }

        // Note -- getting references to other windows is probably one of the hardest things to do. There's basically
        // only a few ways of doing it:
        //
        // - The window is a direct parent, in which case you can use window.parent or window.opener
        // - The window is an iframe owned by you or one of your parents, in which case you can use window.frames
        // - The window sent you a post-message, in which case you can use event.source
        //
        // If we didn't rely on winProps.parent here from the window name, we'd have to relay all of our messages through
        // our actual parent. Which is no fun at all, and pretty error prone even with the help of post-robot. So this
        // is the lesser of two evils until browsers give us something like getWindowByName(...)

        // If the parent window closes, we need to close ourselves. There's no point continuing to run our component
        // if there's no parent to message to.

        this.watchForClose();
    };

    ChildComponent.prototype.watchForClose = function watchForClose() {
        var _this3 = this;

        window.addEventListener('unload', function () {
            return _this3.checkClose();
        });
    };

    ChildComponent.prototype.enableAutoResize = function enableAutoResize() {
        var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref7$width = _ref7.width,
            width = _ref7$width === undefined ? true : _ref7$width,
            _ref7$height = _ref7.height,
            height = _ref7$height === undefined ? true : _ref7$height;

        this.autoResize = { width: width, height: height };
        this.watchForResize();
    };

    ChildComponent.prototype.getAutoResize = function getAutoResize() {

        var width = false;
        var height = false;

        var autoResize = this.autoResize || this.component.autoResize;

        if ((typeof autoResize === 'undefined' ? 'undefined' : _typeof(autoResize)) === 'object') {
            width = Boolean(autoResize.width);
            height = Boolean(autoResize.height);
        } else if (autoResize) {
            width = true;
            height = true;
        }

        var element = void 0;

        if (autoResize.element) {
            element = getElement(autoResize.element);
        } else {
            element = document.body;
        }

        // $FlowFixMe
        return { width: width, height: height, element: element };
    };

    ChildComponent.prototype.watchForResize = function watchForResize() {
        var _this4 = this;

        var _getAutoResize = this.getAutoResize(),
            width = _getAutoResize.width,
            height = _getAutoResize.height,
            element = _getAutoResize.element;

        if (!width && !height) {
            return;
        }

        if (this.context === CONTEXT_TYPES.POPUP) {
            return;
        }

        if (this.watchingForResize) {
            return;
        }

        this.watchingForResize = true;

        onResize(element, function (_ref8) {
            var newWidth = _ref8.width,
                newHeight = _ref8.height;

            _this4.resize(width ? newWidth : undefined, height ? newHeight : undefined);
        }, { width: width, height: height });
    };

    ChildComponent.prototype.exports = function exports() {

        var self = this;

        return {
            updateProps: function updateProps(props) {
                var _this5 = this;

                return ZalgoPromise['try'](function () {
                    return self.setProps(props, _this5.origin, false);
                });
            },
            close: function close() {
                return ZalgoPromise['try'](function () {
                    return self.destroy();
                });
            }
        };
    };

    /*  Resize
        ------
         Resize the child window. Must be done on a user action like a click if we're in a popup
    */

    ChildComponent.prototype.resize = function resize(width, height) {
        var _this6 = this;

        return ZalgoPromise.resolve().then(function () {

            _this6.component.log('resize', { width: stringify(width), height: stringify(height) });

            if (_this6.context === CONTEXT_TYPES.POPUP) {
                return;
            }

            return _this6.sendToParent(POST_MESSAGE.RESIZE, { width: width, height: height }).then(noop);
        });
    };

    /*  Hide
        ----
         Hide the window and any parent template
    */

    ChildComponent.prototype.hide = function hide() {
        return this.sendToParent(POST_MESSAGE.HIDE).then(noop);
    };

    ChildComponent.prototype.show = function show() {
        return this.sendToParent(POST_MESSAGE.SHOW).then(noop);
    };

    ChildComponent.prototype.userClose = function userClose() {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    };

    /*  Close
        -----
         Close the child window
    */

    ChildComponent.prototype.close = function close() {
        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.CHILD_CALL;


        this.component.log('close_child');

        // Ask our parent window to close us

        this.sendToParent(POST_MESSAGE.CLOSE, { reason: reason });
    };

    ChildComponent.prototype.checkClose = function checkClose() {
        this.sendToParent(POST_MESSAGE.CHECK_CLOSE, {}, { fireAndForget: true });
    };

    ChildComponent.prototype.destroy = function destroy() {
        return flush().then(function () {
            window.close();
        });
    };

    /*  Focus
        -----
         Focus the child window. Must be done on a user action like a click
    */

    ChildComponent.prototype.focus = function focus() {
        this.component.log('focus');

        window.focus();
    };

    /*  Error
        -----
         Send an error back to the parent
    */

    ChildComponent.prototype.error = function error(err) {

        var stringifiedError = stringifyError(err);

        this.component.logError('error', { error: stringifiedError });

        return this.sendToParent(POST_MESSAGE.ERROR, {
            error: stringifiedError
        }).then(noop);
    };

    return ChildComponent;
}(BaseComponent);