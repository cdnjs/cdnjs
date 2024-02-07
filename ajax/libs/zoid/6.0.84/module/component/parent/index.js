var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/* eslint max-lines: 0 */

import { flush } from 'beaver-logger/client';
import { send, bridge } from 'post-robot/src';
import { isSameDomain, isWindowClosed as _isWindowClosed, isTop, isSameTopWindow, matchDomain, getDistanceFromTop, onCloseWindow, getDomain, assertSameDomain } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getElementSafe, onResize, isShadowElement, insertShadowSlot } from 'belter/src';

import { BaseComponent } from '../base';
import { buildChildWindowName as _buildChildWindowName, getParentDomain, getParentComponentWindow } from '../window';
import { addEventListener, uniqueID, elementReady as _elementReady, writeElementToWindow, noop, showAndAnimate, animateAndHide, showElement, hideElement, addClass, extend, serializeFunctions, extendUrl, jsxDom, getElement, memoized, appendChild, global, writeToWindow, setLogLevel, once, prefetchPage, awaitFrameLoad, stringify, stringifyError } from '../../lib';
import { POST_MESSAGE, CONTEXT_TYPES, CLASS_NAMES, ANIMATION_NAMES, CLOSE_REASONS, DELEGATE, INITIAL_PROPS, WINDOW_REFERENCES, EVENTS, DEFAULT_DIMENSIONS } from '../../constants';
import { RenderError } from '../../error';


import { RENDER_DRIVERS } from './drivers';
import { validateProps } from './validate';
import { propsToQuery, normalizeProps } from './props';

global.props = global.props || {};
global.windows = global.windows || {};

/*  Parent Component
    ----------------

    This manages the state of the component on the parent window side - i.e. the window the component is being rendered into.

    It handles opening the necessary windows/iframes, launching the component's url, and listening for messages back from the component.
*/

export var ParentComponent = (_class = function (_BaseComponent) {
    _inherits(ParentComponent, _BaseComponent);

    // eslint-disable-line no-undef

    function ParentComponent(component, context, _ref) {
        var props = _ref.props;

        _classCallCheck(this, ParentComponent);

        var _this = _possibleConstructorReturn(this, _BaseComponent.call(this));

        _this.component = component;

        _this.validateParentDomain();

        _this.context = context;

        try {
            _this.setProps(props);
        } catch (err) {
            if (props.onError) {
                props.onError(err);
            }
            throw err;
        }

        if (_this.props.logLevel) {
            setLogLevel(_this.props.logLevel);
        }

        _this.childWindowName = _this.buildChildWindowName({ renderTo: window });

        _this.registerActiveComponent();

        // Options passed during renderTo. We would not ordinarily expect a user to pass these, since we depend on
        // them only when we're trying to render from a sibling to a sibling

        _this.component.log('construct_parent');

        _this.watchForUnload();

        _this.onInit = new ZalgoPromise();

        _this.onInit['catch'](function (err) {
            return _this.error(err);
        });
        return _this;
    }

    ParentComponent.prototype.render = function render(element) {
        var _this2 = this;

        var loadUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        return this.tryInit(function () {

            _this2.component.log('render_' + _this2.context, { context: _this2.context, element: element, loadUrl: stringify(loadUrl) });

            var tasks = {};

            tasks.onRender = _this2.props.onRender();

            tasks.getDomain = _this2.getDomain();

            tasks.elementReady = ZalgoPromise['try'](function () {
                if (element) {
                    return _this2.elementReady(element);
                }
            });

            tasks.openContainer = tasks.elementReady.then(function () {
                return _this2.openContainer(element);
            });

            tasks.showContainer = tasks.openContainer.then(function () {
                return _this2.showContainer();
            });

            tasks.openPrerender = tasks.openContainer.then(function () {
                return _this2.openPrerender();
            });

            tasks.switchPrerender = ZalgoPromise.all([tasks.openPrerender, _this2.onInit]).then(function () {
                return _this2.switchPrerender();
            });

            // $FlowFixMe
            tasks.open = _this2.driver.openOnClick ? _this2.open() : tasks.openContainer.then(function () {
                return _this2.open();
            });

            tasks.listen = ZalgoPromise.hash({ domain: tasks.getDomain, open: tasks.open }).then(function (_ref2) {
                var domain = _ref2.domain;

                _this2.listen(_this2.window, domain);
            });

            tasks.watchForClose = tasks.open.then(function () {
                return _this2.watchForClose();
            });

            tasks.linkDomain = ZalgoPromise.all([tasks.getDomain, tasks.open]).then(function (_ref3) {
                var domain = _ref3[0];

                if (bridge && typeof domain === 'string') {
                    return bridge.linkUrl(_this2.window, domain);
                }
            });

            if (!_this2.html) {
                tasks.createPrerenderTemplate = tasks.openPrerender.then(function () {
                    return _this2.createPrerenderTemplate();
                });

                tasks.showComponent = tasks.createPrerenderTemplate.then(function () {
                    return _this2.showComponent();
                });
            }

            tasks.openBridge = ZalgoPromise.all([tasks.getDomain, tasks.open]).then(function (_ref4) {
                var domain = _ref4[0];

                return _this2.openBridge(typeof domain === 'string' ? domain : null);
            });

            if (_this2.html) {
                tasks.loadHTML = tasks.open.then(function () {
                    return _this2.loadHTML();
                });
            } else if (loadUrl) {
                tasks.buildUrl = _this2.buildUrl();

                tasks.loadUrl = ZalgoPromise.all([tasks.buildUrl, tasks.open, tasks.linkDomain, tasks.listen, tasks.open, tasks.openBridge, tasks.createPrerenderTemplate]).then(function (_ref5) {
                    var url = _ref5[0];

                    return _this2.loadUrl(url);
                });

                tasks.runTimeout = tasks.loadUrl.then(function () {
                    return _this2.runTimeout();
                });
            }

            return ZalgoPromise.hash(tasks);
        }).then(function () {
            return _this2.props.onEnter();
        }).then(function () {
            return _this2;
        });
    };

    ParentComponent.prototype.getOutlet = function getOutlet() {
        var outlet = document.createElement('div');
        addClass(outlet, CLASS_NAMES.OUTLET);
        return outlet;
    };

    ParentComponent.prototype.validateParentDomain = function validateParentDomain() {
        var domain = getDomain();
        if (!matchDomain(this.component.allowedParentDomains, domain)) {
            throw new RenderError('Can not be rendered by domain: ' + domain);
        }
    };

    ParentComponent.prototype.renderTo = function renderTo(win, element) {
        var _this3 = this;

        return this.tryInit(function () {

            if (win === window) {
                return _this3.render(element);
            }

            if (!isSameTopWindow(window, win)) {
                throw new Error('Can only renderTo an adjacent frame');
            }

            if (element && typeof element !== 'string') {
                throw new Error('Element passed to renderTo must be a string selector, got ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + ' ' + element);
            }

            _this3.checkAllowRenderTo(win);

            _this3.component.log('render_' + _this3.context + '_to_win', { element: stringify(element), context: _this3.context });

            _this3.childWindowName = _this3.buildChildWindowName({ renderTo: win });

            _this3.delegate(win);

            return _this3.render(element);
        });
    };

    ParentComponent.prototype.prefetch = function prefetch() {
        var _this4 = this;

        return ZalgoPromise['try'](function () {
            _this4.html = _this4.buildUrl().then(function (url) {
                return prefetchPage(url).then(function (html) {

                    var host = '' + url.split('/').slice(0, 3).join('/');
                    var uri = '/' + url.split('/').slice(3).join('/');

                    return '\n                        <base href="' + host + '">\n\n                        ' + html + '\n\n                        <script>\n                            if (window.history && window.history.pushState) {\n                                window.history.pushState({}, \'\', \'' + uri + '\');\n                            }\n                        </script>\n                    ';
                });
            });
        });
    };

    ParentComponent.prototype.loadHTML = function loadHTML() {
        var _this5 = this;

        return ZalgoPromise['try'](function () {
            if (!_this5.html) {
                throw new Error('Html not prefetched');
            }

            return _this5.html.then(function (html) {
                // $FlowFixMe
                return writeToWindow(_this5.window, html);
            });
        });
    };

    ParentComponent.prototype.checkAllowRenderTo = function checkAllowRenderTo(win) {

        if (!win) {
            throw this.component.createError('Must pass window to renderTo');
        }

        if (isSameDomain(win)) {
            return;
        }

        var origin = getDomain();
        var domain = this.component.getDomain(null, this.props.env);

        if (!domain) {
            throw new Error('Could not determine domain to allow remote render');
        }

        if (matchDomain(domain, origin)) {
            return;
        }

        throw new Error('Can not render remotely to ' + domain.toString() + ' - can only render to ' + origin);
    };

    ParentComponent.prototype.registerActiveComponent = function registerActiveComponent() {
        var _this6 = this;

        ParentComponent.activeComponents.push(this);

        this.clean.register(function () {
            ParentComponent.activeComponents.splice(ParentComponent.activeComponents.indexOf(_this6), 1);
        });
    };

    ParentComponent.prototype.getComponentParentRef = function getComponentParentRef() {
        var domain = this.component.getDomain(null, this.props.env);

        if (domain === getDomain(window)) {
            var _uid = uniqueID();
            global.windows = global.windows || {};
            global.windows[_uid] = window;
            this.clean.register(function () {
                delete global.windows[_uid];
            });

            return { ref: WINDOW_REFERENCES.GLOBAL, uid: _uid };
        }

        if (this.context === CONTEXT_TYPES.POPUP) {
            return { ref: WINDOW_REFERENCES.OPENER };
        }

        if (isTop(window)) {
            return { ref: WINDOW_REFERENCES.TOP };
        }

        return { ref: WINDOW_REFERENCES.PARENT, distance: getDistanceFromTop(window) };
    };

    ParentComponent.prototype.getRenderParentRef = function getRenderParentRef() {
        var renderToWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;


        if (renderToWindow === window) {
            return this.getComponentParentRef();
        }

        var uid = uniqueID();
        global.windows[uid] = renderToWindow;

        this.clean.register(function () {
            delete global.windows[uid];
        });

        return { ref: WINDOW_REFERENCES.GLOBAL, uid: uid };
    };

    ParentComponent.prototype.buildChildWindowName = function buildChildWindowName() {
        var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref6$renderTo = _ref6.renderTo,
            renderTo = _ref6$renderTo === undefined ? window : _ref6$renderTo;

        var childDomain = this.component.getDomain(null, this.props.env);
        var sameDomain = isSameDomain(renderTo);

        var uid = uniqueID();
        var tag = this.component.tag;
        var sProps = serializeFunctions(this.getPropsForChild());

        var componentParent = this.getComponentParentRef();
        var renderParent = this.getRenderParentRef(renderTo);

        var secureProps = !sameDomain && !this.component.unsafeRenderTo;

        var props = secureProps ? { type: INITIAL_PROPS.UID, uid: uid } : { type: INITIAL_PROPS.RAW, value: sProps };

        if (props.type === INITIAL_PROPS.UID) {
            global.props[uid] = JSON.stringify(sProps);

            this.clean.register(function () {
                delete global.props[uid];
            });
        }

        return _buildChildWindowName(this.component.name, this.component.version, { uid: uid, tag: tag, componentParent: componentParent, renderParent: renderParent, props: props, childDomain: childDomain });
    };

    /*  Send to Parent
        --------------
         Send a post message to our parent window.
    */

    ParentComponent.prototype.sendToParent = function sendToParent(name, data) {
        var parentWindow = getParentComponentWindow();

        if (!parentWindow) {
            throw new Error('Can not find parent component window to message');
        }

        this.component.log('send_to_parent_' + name);

        return send(getParentComponentWindow(), name, data, { domain: getParentDomain() });
    };

    /*  Set Props
        ---------
         Normalize props and generate the url we'll use to render the component
    */

    ParentComponent.prototype.setProps = function setProps(props) {
        var required = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


        validateProps(this.component, props, required);
        if (this.component.validate) {
            this.component.validate(this.component, props);
        }

        // $FlowFixMe
        this.props = this.props || {};

        extend(this.props, normalizeProps(this.component, this, props));
    };

    /*  Build Url
        ---------
         We build the props we're passed into the initial url. This means the component server-side can start rendering
        itself based on whatever props the merchant provides.
    */

    ParentComponent.prototype.buildUrl = function buildUrl() {
        var _this7 = this;

        var propUrl = this.props.url;

        return ZalgoPromise.all([propUrl,
        // $FlowFixMe
        propsToQuery(_extends({}, this.component.props, this.component.builtinProps), this.props)]).then(function (_ref7) {
            var url = _ref7[0],
                query = _ref7[1];


            // Do not extend the url if it is for a different domain

            if (url && !_this7.component.getValidDomain(url)) {
                return url;
            }

            return ZalgoPromise['try'](function () {

                return url || _this7.component.getUrl(_this7.props.env, _this7.props);
            }).then(function (finalUrl) {

                query.xcomponent = '1';
                return extendUrl(finalUrl, { query: query });
            });
        });
    };

    ParentComponent.prototype.getDomain = function getDomain() {
        var _this8 = this;

        return ZalgoPromise['try'](function () {
            return _this8.props.url;
        }).then(function (url) {

            var domain = _this8.component.getDomain(url, _this8.props.env);

            if (domain) {
                return domain;
            }

            if (_this8.component.buildUrl) {
                return ZalgoPromise['try'](function () {
                    return _this8.component.buildUrl(_this8.props);
                }).then(function (builtUrl) {
                    return _this8.component.getDomain(builtUrl, _this8.props.env);
                });
            }
        }).then(function (domain) {

            if (!domain) {
                throw new Error('Could not determine domain');
            }

            return domain;
        });
    };

    ParentComponent.prototype.getPropsForChild = function getPropsForChild() {

        var result = {};

        for (var _i2 = 0, _Object$keys2 = Object.keys(this.props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
            var key = _Object$keys2[_i2];
            var prop = this.component.getProp(key);

            if (!prop || prop.sendToChild !== false) {
                result[key] = this.props[key];
            }
        }

        // $FlowFixMe


        return result;
    };

    /*  Update Props
        ------------
         Send new props down to the child
    */

    ParentComponent.prototype.updateProps = function updateProps(props) {
        var _this9 = this;

        this.setProps(props, false);

        return this.onInit.then(function () {
            if (_this9.childExports) {
                return _this9.childExports.updateProps(_this9.getPropsForChild());
            } else {
                throw new Error('Child exports were not available');
            }
        });
    };

    ParentComponent.prototype.openBridge = function openBridge(domain) {
        var _this10 = this;

        return ZalgoPromise['try'](function () {
            if (!bridge || !_this10.driver.needsBridge) {
                return;
            }

            var needsBridgeParams = { win: _this10.window };
            if (domain) {
                needsBridgeParams.domain = domain;
            }

            var needsBridge = bridge.needsBridge(needsBridgeParams);

            var bridgeUrl = _this10.component.getBridgeUrl(_this10.props.env);

            if (!bridgeUrl) {

                if (needsBridge && domain && !bridge.hasBridge(domain, domain)) {
                    throw new Error('Bridge url needed to render ' + _this10.context);
                }

                return;
            }

            bridgeUrl = extendUrl(bridgeUrl, { query: { version: _this10.component.version } });

            var bridgeDomain = _this10.component.getBridgeDomain(_this10.props.env);

            if (!bridgeDomain) {
                throw new Error('Can not determine domain for bridge');
            }

            if (needsBridge) {
                return bridge.openBridge(bridgeUrl, bridgeDomain).then(function (result) {
                    if (result) {
                        return result;
                    }
                });
            }
        });
    };

    /*  Open
        ----
         Open a new window in the desired context
    */

    ParentComponent.prototype.open = function open() {
        var _this11 = this;

        return ZalgoPromise['try'](function () {
            _this11.component.log('open_' + _this11.context, { windowName: _this11.childWindowName });
            var win = _this11.props.win;

            if (win) {
                _this11.clean.set('window', win);
                window.addEventListener('beforeunload', function () {
                    return win.close();
                });
                window.addEventListener('unload', function () {
                    return win.close();
                });
                assertSameDomain(_this11.window).name = _this11.childWindowName;
                return;
            }
            return _this11.driver.open.call(_this11);
        });
    };

    ParentComponent.prototype.openPrerender = function openPrerender() {
        var _this12 = this;

        return ZalgoPromise['try'](function () {
            if (_this12.component.prerenderTemplate) {
                return _this12.driver.openPrerender.call(_this12);
            }
        });
    };

    ParentComponent.prototype.switchPrerender = function switchPrerender() {
        var _this13 = this;

        return ZalgoPromise['try'](function () {
            if (_this13.prerenderWindow && _this13.driver.switchPrerender) {
                return _this13.driver.switchPrerender.call(_this13);
            }
        });
    };

    ParentComponent.prototype.elementReady = function elementReady(element) {
        return _elementReady(element).then(noop);
    };

    ParentComponent.prototype.delegate = function delegate(win) {
        var _this14 = this;

        this.component.log('delegate_' + this.context);

        var props = {
            uid: this.props.uid,
            dimensions: this.props.dimensions,
            onClose: this.props.onClose,
            onDisplay: this.props.onDisplay
        };

        for (var _i4 = 0, _component$getPropNam2 = this.component.getPropNames(), _length4 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
            var propName = _component$getPropNam2[_i4];
            var prop = this.component.getProp(propName);

            if (prop.allowDelegate) {
                props[propName] = this.props[propName];
            }
        }

        var delegate = send(win, POST_MESSAGE.DELEGATE + '_' + this.component.name, {

            context: this.context,
            env: this.props.env,

            options: {

                context: this.context,

                childWindowName: this.childWindowName,
                isWindowClosed: function isWindowClosed() {
                    return _isWindowClosed(_this14.window);
                },

                props: props,

                overrides: {
                    focus: function focus() {
                        return _this14.focus();
                    },
                    userClose: function userClose() {
                        return _this14.userClose();
                    },
                    getDomain: function getDomain() {
                        return _this14.getDomain();
                    },

                    error: function error(err) {
                        return _this14.error(err);
                    },
                    on: function on(eventName, handler) {
                        return _this14.on(eventName, handler);
                    }
                }
            }

        }).then(function (_ref8) {
            var data = _ref8.data;


            _this14.clean.register(data.destroy);
            return data;
        })['catch'](function (err) {

            throw new Error('Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n' + stringifyError(err));
        });

        var overrides = this.driver.delegateOverrides;

        var _loop = function _loop(_i6, _Object$keys4, _length6) {
            var key = _Object$keys4[_i6];
            var val = overrides[key];

            if (val === DELEGATE.CALL_ORIGINAL) {
                return 'continue';
            }

            // $FlowFixMe
            var original = _this14[key];

            // $FlowFixMe
            _this14[key] = function overridenFunction() {
                var _this15 = this,
                    _arguments = arguments;

                return delegate.then(function (data) {

                    var override = data.overrides[key];

                    if (val === DELEGATE.CALL_DELEGATE) {
                        return override.apply(_this15, _arguments);
                    }

                    if (typeof val === 'function') {
                        return val(original, override).apply(_this15, _arguments);
                    }

                    throw new Error('Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method');
                });
            };
        };

        for (var _i6 = 0, _Object$keys4 = Object.keys(overrides), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
            var _ret = _loop(_i6, _Object$keys4, _length6);

            if (_ret === 'continue') continue;
        }
    };

    /*  Watch For Close
        ---------------
         Watch for the child window closing, so we can cleanup.
        Also watch for this window changing location, so we can close the component.
    */

    ParentComponent.prototype.watchForClose = function watchForClose() {
        var _this16 = this;

        var closeWindowListener = onCloseWindow(this.window, function () {
            _this16.component.log('detect_close_child');

            return ZalgoPromise['try'](function () {
                return _this16.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
            })['finally'](function () {
                return _this16.destroy();
            });
        }, 3000);

        this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);
    };

    ParentComponent.prototype.watchForUnload = function watchForUnload() {
        var _this17 = this;

        // Our child has no way of knowing if we navigated off the page. So we have to listen for unload
        // and close the child manually if that happens.

        var onunload = once(function () {
            _this17.component.log('navigate_away');
            flush();
            _this17.destroyComponent();
        });

        var unloadWindowListener = addEventListener(window, 'unload', onunload);

        this.clean.register('destroyUnloadWindowListener', unloadWindowListener.cancel);
    };

    /*  Load Url
        --------
         Load url into the child window. This is separated out because it's quite common for us to have situations
        where opening the child window and loading the url happen at different points.
    */

    ParentComponent.prototype.loadUrl = function loadUrl(url) {
        var _this18 = this;

        return ZalgoPromise['try'](function () {
            _this18.component.log('load_url');

            if (window.location.href.split('#')[0] === url.split('#')[0]) {
                var _query;

                url = extendUrl(url, {
                    query: (_query = {}, _query[uniqueID()] = '1', _query)
                });
            }

            return _this18.driver.loadUrl.call(_this18, url);
        });
    };

    ParentComponent.prototype.hijack = function hijack(targetElement) {
        targetElement.target = this.childWindowName;
    };

    /*  Run Timeout
        -----------
         Set a timeout on the initial render, and call this.props.onTimeout if we don't get an init call in time.
    */

    ParentComponent.prototype.runTimeout = function runTimeout() {
        var _this19 = this;

        var timeout = this.props.timeout;

        if (timeout) {
            var _id = this.timeout = setTimeout(function () {

                _this19.component.log('timed_out', { timeout: timeout.toString() });

                var error = _this19.component.createError('Loading component timed out after ' + timeout + ' milliseconds');

                _this19.onInit.reject(error);
                _this19.props.onTimeout(error);
            }, timeout);

            this.clean.register(function () {
                clearTimeout(_id);
                delete _this19.timeout;
            });
        }
    };

    /*  Listeners
        ---------
         Post-robot listeners to the child component window
    */

    ParentComponent.prototype.listeners = function listeners() {
        var _ref9;

        return _ref9 = {}, _ref9[POST_MESSAGE.INIT] = function (source, data) {

            this.childExports = data.exports;

            this.onInit.resolve(this);

            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            return {
                props: this.getPropsForChild(),
                context: this.context
            };
        }, _ref9[POST_MESSAGE.CLOSE] = function (source, data) {
            this.close(data.reason);
        }, _ref9[POST_MESSAGE.CHECK_CLOSE] = function () {
            this.checkClose();
        }, _ref9[POST_MESSAGE.RESIZE] = function (source, data) {
            var _this20 = this;

            return ZalgoPromise['try'](function () {
                if (_this20.driver.allowResize) {
                    return _this20.resize(data.width, data.height);
                }
            });
        }, _ref9[POST_MESSAGE.HIDE] = function () {
            this.hide();
        }, _ref9[POST_MESSAGE.SHOW] = function () {
            this.show();
        }, _ref9[POST_MESSAGE.ERROR] = function (source, data) {
            this.error(new Error(data.error));
        }, _ref9;
    };

    /*  Resize
        ------
         Resize the child component window
    */

    ParentComponent.prototype.resize = function resize(width, height) {
        var _this21 = this;

        return ZalgoPromise['try'](function () {
            _this21.component.log('resize', { height: stringify(height), width: stringify(width) });
            _this21.driver.resize.call(_this21, width, height);
            if (_this21.props.onResize) {
                _this21.props.onResize();
            }
        });
    };

    /*  Hide
        ----
         Hide the component and any parent template
    */

    ParentComponent.prototype.hide = function hide() {

        if (this.container) {
            hideElement(this.container);
        }

        return this.driver.hide.call(this);
    };

    ParentComponent.prototype.show = function show() {

        if (this.container) {
            showElement(this.container);
        }

        return this.driver.show.call(this);
    };

    ParentComponent.prototype.checkClose = function checkClose() {
        var _this22 = this;

        var closeWindowListener = onCloseWindow(this.window, function () {
            _this22.userClose();
        }, 50, 500);

        this.clean.register(closeWindowListener.cancel);
    };

    ParentComponent.prototype.userClose = function userClose() {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    };

    /*  Close
        -----
         Close the child component
    */

    ParentComponent.prototype.close = function close() {
        var _this23 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;

        return ZalgoPromise['try'](function () {

            _this23.component.log('close', { reason: reason });

            _this23.event.triggerOnce(EVENTS.CLOSE);
            return _this23.props.onClose(reason);
        }).then(function () {

            return ZalgoPromise.all([_this23.closeComponent(), _this23.closeContainer()]);
        }).then(function () {

            return _this23.destroy();
        });
    };

    ParentComponent.prototype.closeContainer = function closeContainer() {
        var _this24 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;

        return ZalgoPromise['try'](function () {

            _this24.event.triggerOnce(EVENTS.CLOSE);
            return _this24.props.onClose(reason);
        }).then(function () {

            return ZalgoPromise.all([_this24.closeComponent(reason), _this24.hideContainer()]);
        }).then(function () {

            return _this24.destroyContainer();
        });
    };

    ParentComponent.prototype.destroyContainer = function destroyContainer() {
        var _this25 = this;

        return ZalgoPromise['try'](function () {
            _this25.clean.run('destroyContainerEvents');
            _this25.clean.run('destroyContainerTemplate');
        });
    };

    ParentComponent.prototype.closeComponent = function closeComponent() {
        var _this26 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;


        var win = this.window;

        return ZalgoPromise['try'](function () {

            return _this26.cancelContainerEvents();
        }).then(function () {

            _this26.event.triggerOnce(EVENTS.CLOSE);
            return _this26.props.onClose(reason);
        }).then(function () {

            return _this26.hideComponent();
        }).then(function () {

            return _this26.destroyComponent();
        }).then(function () {

            // IE in metro mode -- child window needs to close itself, or close will hang

            if (_this26.childExports && _this26.context === CONTEXT_TYPES.POPUP && !_isWindowClosed(win)) {
                _this26.childExports.close()['catch'](noop);
            }
        });
    };

    ParentComponent.prototype.destroyComponent = function destroyComponent() {
        this.clean.run('destroyUnloadWindowListener');
        this.clean.run('destroyCloseWindowListener');
        this.clean.run('destroyContainerEvents');
        this.clean.run('destroyWindow');
    };

    ParentComponent.prototype.showContainer = function showContainer() {
        var _this27 = this;

        return ZalgoPromise['try'](function () {
            if (_this27.props.onDisplay) {
                return _this27.props.onDisplay();
            }
        }).then(function () {
            if (_this27.container) {
                return showAndAnimate(_this27.container, ANIMATION_NAMES.SHOW_CONTAINER, _this27.clean.register);
            }
        });
    };

    ParentComponent.prototype.showComponent = function showComponent() {
        var _this28 = this;

        return ZalgoPromise['try'](function () {
            if (_this28.props.onDisplay) {
                return _this28.props.onDisplay();
            }
        }).then(function () {
            if (_this28.element) {
                return showAndAnimate(_this28.element, ANIMATION_NAMES.SHOW_COMPONENT, _this28.clean.register);
            }
        });
    };

    ParentComponent.prototype.hideContainer = function hideContainer() {
        var _this29 = this;

        return ZalgoPromise['try'](function () {
            if (_this29.container) {
                return animateAndHide(_this29.container, ANIMATION_NAMES.HIDE_CONTAINER, _this29.clean.register);
            } else {
                return ZalgoPromise.resolve();
            }
        });
    };

    ParentComponent.prototype.hideComponent = function hideComponent() {
        var _this30 = this;

        return ZalgoPromise['try'](function () {
            if (_this30.element) {
                return animateAndHide(_this30.element, ANIMATION_NAMES.HIDE_COMPONENT, _this30.clean.register);
            } else {
                return ZalgoPromise.resolve();
            }
        });
    };

    /*  Focus
        -----
         Focus the child component window
    */

    ParentComponent.prototype.focus = function focus() {

        if (this.window && !_isWindowClosed(this.window)) {
            this.component.log('focus');
            this.window.focus();
        } else {

            throw new Error('No window to focus');
        }
    };

    /*  Create Component Template
        -------------------------
         Creates an initial template and stylesheet which are loaded into the child window, to be displayed before the url is loaded
    */

    ParentComponent.prototype.createPrerenderTemplate = function createPrerenderTemplate() {
        var _this31 = this;

        return ZalgoPromise['try'](function () {
            if (!_this31.component.prerenderTemplate) {
                return ZalgoPromise.resolve();
            }

            return ZalgoPromise['try'](function () {

                if (_this31.prerenderIframe) {
                    return awaitFrameLoad(_this31.prerenderIframe).then(function () {
                        return _this31.prerenderWindow;
                    });
                } else {
                    return _this31.prerenderWindow;
                }
            }).then(function (win) {

                var doc = void 0;

                try {
                    doc = win.document;
                } catch (err) {
                    return;
                }

                var el = void 0;

                try {
                    el = _this31.renderTemplate(_this31.component.prerenderTemplate, {
                        jsxDom: jsxDom.bind(doc),
                        document: doc
                    });
                } catch (err) {
                    _this31.component.logError('preprender_error', { err: err.stack ? err.stack : err.toString() });
                    console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
                    return;
                }

                try {
                    writeElementToWindow(win, el);
                } catch (err) {
                    _this31.component.logError('preprender_error', { err: err.stack ? err.stack : err.toString() });
                    console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
                }

                var _ref10 = _typeof(_this31.component.autoResize) === 'object' && _this31.component.autoResize !== null ? _this31.component.autoResize : {},
                    _ref10$width = _ref10.width,
                    width = _ref10$width === undefined ? false : _ref10$width,
                    _ref10$height = _ref10.height,
                    height = _ref10$height === undefined ? false : _ref10$height,
                    _ref10$element = _ref10.element,
                    element = _ref10$element === undefined ? 'body' : _ref10$element;

                element = getElementSafe(element, doc);

                if (element && (width || height)) {
                    onResize(element, function (_ref11) {
                        var newWidth = _ref11.width,
                            newHeight = _ref11.height;

                        _this31.resize(width ? newWidth : undefined, height ? newHeight : undefined);
                    }, { width: width, height: height, win: win });
                }
            });
        });
    };

    /*  Create Parent Template
        ----------------------
         Create a template and stylesheet for the parent template behind the element
    */

    ParentComponent.prototype.renderTemplate = function renderTemplate(renderer) {
        var _this32 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _ref12 = this.component.dimensions || {},
            _ref12$width = _ref12.width,
            width = _ref12$width === undefined ? DEFAULT_DIMENSIONS.WIDTH + 'px' : _ref12$width,
            _ref12$height = _ref12.height,
            height = _ref12$height === undefined ? DEFAULT_DIMENSIONS.HEIGHT + 'px' : _ref12$height;

        return renderer.call(this, _extends({
            id: CLASS_NAMES.ZOID + '-' + this.component.tag + '-' + this.props.uid,
            props: renderer.__xdomain__ ? null : this.props,
            tag: this.component.tag,
            context: this.context,
            outlet: this.getOutlet(),
            CLASS: CLASS_NAMES,
            ANIMATION: ANIMATION_NAMES,
            CONTEXT: CONTEXT_TYPES,
            EVENT: EVENTS,
            actions: {
                close: function close() {
                    return _this32.userClose();
                },
                focus: function focus() {
                    return _this32.focus();
                }
            },
            on: function on(eventName, handler) {
                return _this32.on(eventName, handler);
            },
            jsxDom: jsxDom,
            document: document,
            dimensions: { width: width, height: height }
        }, options));
    };

    ParentComponent.prototype.openContainer = function openContainer(element) {
        var _this33 = this;

        return ZalgoPromise['try'](function () {
            var el = void 0;

            if (element) {
                el = getElement(element);
            } else {
                el = document.body;
            }

            if (!el) {
                throw new Error('Could not find element to open container into');
            }

            if (isShadowElement(el)) {
                el = insertShadowSlot(el);
            }

            if (!_this33.component.containerTemplate) {
                if (_this33.driver.renderedIntoContainerTemplate) {
                    throw new Error('containerTemplate needed to render ' + _this33.context);
                }

                return;
            }

            var container = _this33.renderTemplate(_this33.component.containerTemplate, {
                container: el
            });

            _this33.container = container;
            hideElement(_this33.container);
            appendChild(el, _this33.container);

            if (_this33.driver.renderedIntoContainerTemplate) {
                _this33.element = _this33.getOutlet();
                hideElement(_this33.element);

                if (!_this33.element) {
                    throw new Error('Could not find element to render component into');
                }

                hideElement(_this33.element);
            }

            _this33.clean.register('destroyContainerTemplate', function () {

                if (_this33.container && _this33.container.parentNode) {
                    _this33.container.parentNode.removeChild(_this33.container);
                }

                delete _this33.container;
            });
        });
    };

    ParentComponent.prototype.cancelContainerEvents = function cancelContainerEvents() {
        this.clean.run('destroyContainerEvents');
    };

    /*  Destroy
        -------
         Close the component and clean up any listeners and state
    */

    ParentComponent.prototype.destroy = function destroy() {
        var _this34 = this;

        return ZalgoPromise['try'](function () {
            if (_this34.clean.hasTasks()) {
                _this34.component.log('destroy');
                flush();
                return _this34.clean.all();
            }
        }).then(function () {
            if (_this34.props && _this34.props.onDestroy) {
                return _this34.props.onDestroy();
            }
        });
    };

    ParentComponent.prototype.tryInit = function tryInit(method) {
        var _this35 = this;

        return ZalgoPromise['try'](method)['catch'](function (err) {
            _this35.onInit.reject(err);
        }).then(function () {
            return _this35.onInit;
        });
    };

    /*  Error
        -----
         Handle an error
    */

    ParentComponent.prototype.error = function error(err) {
        var _this36 = this;

        // eslint-disable-next-line promise/no-promise-in-callback
        return ZalgoPromise['try'](function () {

            _this36.handledErrors = _this36.handledErrors || [];

            if (_this36.handledErrors.indexOf(err) !== -1) {
                // $FlowFixMe
                return;
            }

            _this36.handledErrors.push(err);

            _this36.onInit.reject(err);

            return _this36.destroy();
        }).then(function () {

            if (_this36.props.onError) {
                return _this36.props.onError(err);
            }
        })['catch'](function (errErr) {
            // eslint-disable-line unicorn/catch-error-name

            throw new Error('An error was encountered while handling error:\n\n ' + stringifyError(err) + '\n\n' + stringifyError(errErr));
        }).then(function () {

            if (!_this36.props.onError) {
                throw err;
            }
        });
    };

    ParentComponent.destroyAll = function destroyAll() {
        var results = [];

        while (ParentComponent.activeComponents.length) {
            results.push(ParentComponent.activeComponents[0].destroy());
        }

        return ZalgoPromise.all(results).then(noop);
    };

    _createClass(ParentComponent, [{
        key: 'driver',
        get: function get() {

            if (!this.context) {
                throw new Error('Context not set');
            }

            return RENDER_DRIVERS[this.context];
        }
    }]);

    return ParentComponent;
}(BaseComponent), (_applyDecoratedDescriptor(_class.prototype, 'getOutlet', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'getOutlet'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'prefetch', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'prefetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadHTML', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'loadHTML'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildUrl', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'buildUrl'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'open', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'open'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'openPrerender', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'openPrerender'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'switchPrerender', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'switchPrerender'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'close', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'close'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'closeContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'destroyContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'destroyContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'closeComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'showContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'showComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'hideContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'hideComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'createPrerenderTemplate', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'createPrerenderTemplate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'openContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'openContainer'), _class.prototype)), _class);
ParentComponent.activeComponents = [];