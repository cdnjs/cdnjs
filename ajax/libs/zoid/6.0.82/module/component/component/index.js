var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

import { on, send } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain, getDomainFromUrl, matchDomain } from 'cross-domain-utils/src';

import { BaseComponent } from '../base';
import { ChildComponent } from '../child';
import { ParentComponent } from '../parent';
import { DelegateComponent } from '../delegate';
import { isZoidComponentWindow, getComponentMeta } from '../window';
import { CONTEXT_TYPES, POST_MESSAGE, WILDCARD } from '../../constants';
import { angular, angular2, glimmer, react, vue, script } from '../../drivers/index';
import { info, error, warn, setLogLevel, memoize } from '../../lib';


import { validate } from './validate';
import { defaultContainerTemplate, defaultPrerenderTemplate } from './templates';
import { getInternalProps } from './props';

var drivers = { angular: angular, angular2: angular2, glimmer: glimmer, react: react, vue: vue, script: script };

/*  Component
    ---------

    This is the spec for the component. The idea is, when I call zoid.create(), it will create a new instance
    of Component with the blueprint needed to set up ParentComponents and ChildComponents.

    This is the one portion of code which is required by -- and shared to -- both the parent and child windows, and
    contains all of the configuration needed for them to set themselves up.
*/

export var Component = (_class = function (_BaseComponent) {
    _inherits(Component, _BaseComponent);

    function Component(options) {
        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, _BaseComponent.call(this));

        validate(options);

        // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
        // e.g. <my-component>

        _this.addProp(options, 'tag');

        _this.addProp(options, 'defaultLogLevel', 'info');

        _this.addProp(options, 'allowedParentDomains', WILDCARD);

        // initially set log level to default log level configured when creating component
        setLogLevel(_this.defaultLogLevel);

        if (Component.components[_this.tag]) {
            throw new Error('Can not register multiple components with the same tag');
        }

        // Name of the component, used for logging. Auto-generated from the tag name by default.

        _this.addProp(options, 'name', _this.tag.replace(/-/g, '_'));

        // A json based spec describing what kind of props the component accepts. This is used to validate any props before
        // they are passed down to the child.

        _this.builtinProps = getInternalProps();
        _this.props = options.props || {};

        if (!options.props) {
            _this.looseProps = true;
        }

        // The dimensions of the component, e.g. { width: '300px', height: '150px' }

        _this.addProp(options, 'dimensions');
        _this.addProp(options, 'scrolling');
        _this.addProp(options, 'listenForResize');

        _this.addProp(options, 'version', 'latest');

        // The default environment we should render to if none is specified in the parent

        _this.addProp(options, 'defaultEnv');

        // A mapping of env->url, used to determine which url to load for which env

        _this.addProp(options, 'buildUrl');

        _this.addProp(options, 'url');
        _this.addProp(options, 'domain');

        _this.addProp(options, 'bridgeUrl');
        _this.addProp(options, 'bridgeDomain');

        _this.addProp(options, 'attributes', {});

        // A url to use by default to render the component, if not using envs


        // The allowed contexts. For example { iframe: true, popup: false }

        _this.addProp(options, 'contexts', { iframe: true, popup: false });

        // The default context to render to

        _this.addProp(options, 'defaultContext');

        // Auto Resize option

        _this.addProp(options, 'autoResize', false);

        // Templates and styles for the parent page and the initial rendering of the component

        _this.addProp(options, 'containerTemplate', defaultContainerTemplate);
        _this.addProp(options, 'prerenderTemplate', defaultPrerenderTemplate);

        // Validation

        _this.addProp(options, 'validate');

        // Security

        _this.addProp(options, 'unsafeRenderTo', false);

        // A mapping of tag->component so we can reference components by string tag name

        Component.components[_this.tag] = _this;

        // Register all of the drivers for instantiating components. The model used is -- there's a standard javascript
        // way of rendering a component, then each other technology (e.g. react) needs to hook into that interface.
        // This makes us a little more pluggable and loosely coupled.
        _this.registerDrivers();
        _this.registerChild();
        _this.listenDelegate();
        return _this;
    }

    Component.prototype.getPropNames = function getPropNames() {
        var props = Object.keys(this.props);

        for (var _i2 = 0, _Object$keys2 = Object.keys(this.builtinProps), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
            var key = _Object$keys2[_i2];
            if (props.indexOf(key) === -1) {
                props.push(key);
            }
        }

        return props;
    };

    // $FlowFixMe


    Component.prototype.getProp = function getProp(name) {
        // $FlowFixMe
        return this.props[name] || this.builtinProps[name];
    };

    Component.prototype.registerDrivers = function registerDrivers() {
        this.driverCache = {};

        for (var _i4 = 0, _Object$keys4 = Object.keys(drivers), _length4 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
            var driverName = _Object$keys4[_i4];
            if (driverName.indexOf('_') === 0) {
                continue;
            }

            var driver = drivers[driverName];
            var glob = driver.global();
            if (glob) {
                this.driver(driverName, glob);
            }
        }
    };

    Component.prototype.driver = function driver(name, dep) {
        if (!drivers[name]) {
            throw new Error('Could not find driver for framework: ' + name);
        }

        if (!this.driverCache[name]) {
            this.driverCache[name] = drivers[name].register(this, dep);
        }

        return this.driverCache[name];
    };

    Component.prototype.registerChild = function registerChild() {
        var _this2 = this;

        return ZalgoPromise['try'](function () {
            if (_this2.isChild()) {
                return new ChildComponent(_this2);
            }
        });
    };

    Component.prototype.listenDelegate = function listenDelegate() {
        var _this3 = this;

        on(POST_MESSAGE.ALLOW_DELEGATE + '_' + this.name, function () {
            return true;
        });

        on(POST_MESSAGE.DELEGATE + '_' + this.name, function (_ref) {
            var source = _ref.source,
                origin = _ref.origin,
                data = _ref.data;


            var domain = _this3.getDomain(null, data.env || _this3.defaultEnv);

            if (!domain) {
                throw new Error('Could not determine domain to allow remote render');
            }

            if (!matchDomain(domain, origin)) {
                throw new Error('Can not render from ' + origin + ' - expected ' + domain.toString());
            }

            var delegate = _this3.delegate(source, data.options);

            return {
                overrides: delegate.getOverrides(data.context),
                destroy: function destroy() {
                    return delegate.destroy();
                }
            };
        });
    };

    Component.prototype.canRenderTo = function canRenderTo(win) {
        return send(win, POST_MESSAGE.ALLOW_DELEGATE + '_' + this.name).then(function (_ref2) {
            var data = _ref2.data;

            return data;
        })['catch'](function () {
            return false;
        });
    };

    Component.prototype.getValidDomain = function getValidDomain(url) {

        if (!url) {
            return;
        }

        var domain = getDomainFromUrl(url);

        if (typeof this.domain === 'string' && domain === this.domain) {
            return domain;
        }

        var domains = this.domain;

        if (domains && (typeof domains === 'undefined' ? 'undefined' : _typeof(domains)) === 'object' && !(domains instanceof RegExp)) {
            for (var _i6 = 0, _Object$keys6 = Object.keys(domains), _length6 = _Object$keys6 == null ? 0 : _Object$keys6.length; _i6 < _length6; _i6++) {
                var env = _Object$keys6[_i6];

                if (env === 'test') {
                    continue;
                }

                if (domain === domains[env]) {
                    return domain;
                }
            }
        }
    };

    Component.prototype.getDomain = function getDomain(url, env) {

        var domain = this.getForEnv(this.domain, env);

        if (domain) {
            return domain;
        }

        domain = this.getValidDomain(url);

        if (domain) {
            return domain;
        }

        // $FlowFixMe
        var envUrl = this.getForEnv(this.url, env);

        if (envUrl) {
            // $FlowFixMe
            return getDomainFromUrl(envUrl);
        }

        if (url) {
            return getDomainFromUrl(url);
        }
    };

    Component.prototype.getBridgeUrl = function getBridgeUrl(env) {
        // $FlowFixMe
        return this.getForEnv(this.bridgeUrl, env);
    };

    Component.prototype.getForEnv = function getForEnv(item, env) {

        if (!item) {
            return;
        }

        if (typeof item === 'string' || item instanceof RegExp) {
            return item;
        }

        if (!env) {
            env = this.defaultEnv;
        }

        if (!env) {
            return;
        }

        if (env && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item[env]) {
            return item[env];
        }
    };

    Component.prototype.getBridgeDomain = function getBridgeDomain(env) {

        // $FlowFixMe
        var bridgeDomain = this.getForEnv(this.bridgeDomain, env);

        if (bridgeDomain) {
            // $FlowFixMe
            return bridgeDomain;
        }

        var bridgeUrl = this.getBridgeUrl(env);

        if (bridgeUrl) {
            return getDomainFromUrl(bridgeUrl);
        }
    };

    Component.prototype.getUrl = function getUrl(env, props) {

        // $FlowFixMe
        var url = this.getForEnv(this.url, env);

        if (url) {
            // $FlowFixMe
            return url;
        }

        if (this.buildUrl) {
            return this.buildUrl(props);
        }

        throw new Error('Unable to get url');
    };

    Component.prototype.isZoidComponent = function isZoidComponent() {
        return isZoidComponentWindow();
    };

    Component.prototype.isChild = function isChild() {
        if (!isZoidComponentWindow()) {
            return false;
        }

        var _getComponentMeta = getComponentMeta(),
            tag = _getComponentMeta.tag,
            childDomain = _getComponentMeta.childDomain;

        if (childDomain && childDomain !== getDomain()) {
            return false;
        }

        if (tag !== this.tag) {
            return false;
        }

        return true;
    };

    Component.prototype.createError = function createError(message, tag) {
        return new Error('[' + (tag || this.tag) + '] ' + message);
    };

    /*  Init
        ----
         Shortcut to instantiate a component on a parent page, with props
    */

    Component.prototype.init = function init(props, context, element) {
        return new ParentComponent(this, this.getRenderContext(context, element), { props: props });
    };

    Component.prototype.delegate = function delegate(source, options) {
        return new DelegateComponent(this, source, options);
    };

    Component.prototype.validateRenderContext = function validateRenderContext(context, element) {
        if (context && !this.contexts[context]) {
            throw new Error('[' + this.tag + '] Can not render to ' + context);
        }

        if (!element && context === CONTEXT_TYPES.IFRAME) {
            throw new Error('[' + this.tag + '] Context type ' + CONTEXT_TYPES.IFRAME + ' requires an element selector');
        }
    };

    Component.prototype.getDefaultContext = function getDefaultContext() {
        if (this.defaultContext) {
            return this.defaultContext;
        } else if (this.contexts[CONTEXT_TYPES.IFRAME]) {
            return CONTEXT_TYPES.IFRAME;
        } else if (this.contexts[CONTEXT_TYPES.POPUP]) {
            return CONTEXT_TYPES.POPUP;
        }

        throw new Error('Can not determine default context');
    };

    Component.prototype.getRenderContext = function getRenderContext(context, element) {
        context = context || this.getDefaultContext();
        this.validateRenderContext(context, element);
        return context;
    };

    /*  Render
        ------
         Shortcut to render a parent component
    */

    Component.prototype.render = function render(props, element) {
        var _this4 = this;

        return ZalgoPromise['try'](function () {
            return new ParentComponent(_this4, _this4.getRenderContext(null, element), { props: props }).render(element);
        });
    };

    Component.prototype.renderIframe = function renderIframe(props, element) {
        var _this5 = this;

        return ZalgoPromise['try'](function () {
            return new ParentComponent(_this5, _this5.getRenderContext(CONTEXT_TYPES.IFRAME, element), { props: props }).render(element);
        });
    };

    Component.prototype.renderPopup = function renderPopup(props) {
        var _this6 = this;

        return ZalgoPromise['try'](function () {
            return new ParentComponent(_this6, _this6.getRenderContext(CONTEXT_TYPES.POPUP), { props: props }).render();
        });
    };

    Component.prototype.renderTo = function renderTo(win, props, element) {
        var _this7 = this;

        return ZalgoPromise['try'](function () {
            return new ParentComponent(_this7, _this7.getRenderContext(null, element), { props: props }).renderTo(win, element);
        });
    };

    Component.prototype.renderIframeTo = function renderIframeTo(win, props, element) {
        var _this8 = this;

        return ZalgoPromise['try'](function () {
            return new ParentComponent(_this8, _this8.getRenderContext(CONTEXT_TYPES.IFRAME, element), { props: props }).renderTo(win, element);
        });
    };

    Component.prototype.renderPopupTo = function renderPopupTo(win, props) {
        var _this9 = this;

        return ZalgoPromise['try'](function () {
            return new ParentComponent(_this9, _this9.getRenderContext(CONTEXT_TYPES.POPUP), { props: props }).renderTo(win);
        });
    };

    Component.prototype.prerender = function prerender(props, element) {
        var instance = new ParentComponent(this, this.getRenderContext(null, element), { props: props });
        instance.prefetch();

        return {
            render: function render(innerProps, innerElement) {
                if (innerProps) {
                    instance.updateProps(innerProps);
                }

                return instance.render(innerElement);
            },
            renderTo: function renderTo(win, innerProps, innerElement) {
                if (innerProps) {
                    instance.updateProps(innerProps);
                }

                return instance.renderTo(win, innerElement);
            },


            get html() {
                return instance.html;
            },

            set html(value) {
                instance.html = value;
            }
        };
    };

    /*  Log
        ---
         Log an event using the component name
    */

    Component.prototype.log = function log(event) {
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        info(this.name, event, payload);
    };

    /*  Log Warning
        -----------
         Log a warning
    */

    Component.prototype.logWarning = function logWarning(event, payload) {
        warn(this.name, event, payload);
    };

    /*  Log Error
        ---------
         Log an error
    */

    Component.prototype.logError = function logError(event, payload) {
        error(this.name, event, payload);
    };

    Component.getByTag = function getByTag(tag) {
        return Component.components[tag];
    };

    return Component;
}(BaseComponent), (_applyDecoratedDescriptor(_class.prototype, 'getPropNames', [memoize], Object.getOwnPropertyDescriptor(_class.prototype, 'getPropNames'), _class.prototype)), _class);
Component.components = {};