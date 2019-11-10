(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno-component'), require('inferno-create-class'), require('hoist-non-inferno-statics'), require('inferno'), require('mobx')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno-component', 'inferno-create-class', 'hoist-non-inferno-statics', 'inferno', 'mobx'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.Mobx = {}),global.Inferno.Component,global.Inferno.createClass,global.hoistStatics,global.Inferno,global.mobx));
}(this, (function (exports,Component,createClass,hoistStatics,inferno,mobx) { 'use strict';

    Component = Component && Component.hasOwnProperty('default') ? Component['default'] : Component;
    createClass = createClass && createClass.hasOwnProperty('default') ? createClass['default'] : createClass;
    hoistStatics = hoistStatics && hoistStatics.hasOwnProperty('default') ? hoistStatics['default'] : hoistStatics;

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
    }
    function warning(message) {
        // tslint:disable-next-line:no-console
        console.warn(message);
    }
    function Lifecycle() {
        this.listeners = [];
    }
    Lifecycle.prototype.addListener = function addListener(callback) {
        this.listeners.push(callback);
    };
    Lifecycle.prototype.trigger = function trigger() {
        var listeners = this.listeners;
        var listener;
        // We need to remove current listener from array when calling it, because more listeners might be added
        while ((listener = listeners.shift())) {
            listener();
        }
    };

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    /**
     * Store Injection
     */
    function createStoreInjector(grabStoresFn, component, injectNames) {
        var displayName = "inject-" +
            (component.displayName ||
                component.name ||
                (component.constructor && component.constructor.name) ||
                "Unknown");
        if (injectNames) {
            displayName += "-with-" + injectNames;
        }
        var Injector = createClass({
            displayName: displayName,
            render: function render() {
                var this$1 = this;

                var newProps = {};
                for (var key in this$1.props) {
                    if (this$1.props.hasOwnProperty(key)) {
                        newProps[key] = this$1.props[key];
                    }
                }
                var additionalProps = grabStoresFn(this.context.mobxStores || {}, newProps, this.context) ||
                    {};
                for (var key$1 in additionalProps) {
                    newProps[key$1] = additionalProps[key$1];
                }
                newProps.ref = function (instance) {
                    this$1.wrappedComponent = instance;
                };
                return inferno.createVNode(16 /* ComponentUnknown */, component, null, null, newProps);
            }
        });
        Injector.contextTypes = {
            // tslint:disable-next-line:no-empty
            mobxStores: function mobxStores() { }
        };
        hoistStatics(Injector, component);
        return Injector;
    }
    var grabStoresByName = function (storeNames) {
        return function (baseStores, nextProps) {
            storeNames.forEach((function (storeName) {
                // Prefer props over stores
                if (storeName in nextProps) {
                    return;
                }
                if (!(storeName in baseStores)) {
                    throw new Error("MobX observer: Store '" + storeName + "' is not available! " +
                        "Make sure it is provided by some Provider");
                }
                nextProps[storeName] = baseStores[storeName];
            }));
            return nextProps;
        };
    };
    /**
     * Higher order component that injects stores to a child.
     * takes either a varargs list of strings, which are stores read from the context,
     * or a function that manually maps the available stores from the context to props:
     * storesToProps(mobxStores, props, context) => newProps
     */
    function inject(grabStoresFn) {
        var arguments$1 = arguments;

        if (typeof grabStoresFn !== "function") {
            var storesNames = [];
            for (var i = 0, len = arguments.length; i < len; i++) {
                storesNames[i] = arguments$1[i];
            }
            grabStoresFn = grabStoresByName(storesNames);
        }
        return function (componentClass) { return createStoreInjector(grabStoresFn, componentClass); };
    }

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    var EventEmitter = function EventEmitter() {
        this.listeners = [];
    };
    EventEmitter.prototype.on = function on (cb) {
            var this$1 = this;

        this.listeners.push(cb);
        return function () {
            var index = this$1.listeners.indexOf(cb);
            if (index !== -1) {
                this$1.listeners.splice(index, 1);
            }
        };
    };
    EventEmitter.prototype.emit = function emit (data) {
        var listeners = this.listeners;
        for (var i = 0, len = listeners.length; i < len; i++) {
            listeners[i](data);
        }
    };
    EventEmitter.prototype.getTotalListeners = function getTotalListeners () {
        return this.listeners.length;
    };
    EventEmitter.prototype.clearListeners = function clearListeners () {
        this.listeners = [];
    };

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    /**
     * Dev tools support
     */
    var isDevtoolsEnabled = false;
    var isUsingStaticRendering = false;
    var componentByNodeRegistery = new WeakMap();
    var renderReporter = new EventEmitter();
    function reportRendering(component) {
        var node = component._vNode.dom;
        if (node && componentByNodeRegistery) {
            componentByNodeRegistery.set(node, component);
        }
        renderReporter.emit({
            component: component,
            event: "render",
            node: node,
            renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
            totalTime: Date.now() - component.__$mobRenderStart
        });
    }
    function trackComponents() {
        if (typeof WeakMap === "undefined") {
            throwError("[inferno-mobx] tracking components is not supported in this browser.");
        }
        if (!isDevtoolsEnabled) {
            isDevtoolsEnabled = true;
        }
    }
    function useStaticRendering(boolean) {
        isUsingStaticRendering = boolean;
    }
    function scuMobx(nextProps, nextState) {
        var this$1 = this;

        if (isUsingStaticRendering) {
            warning("[inferno-mobx] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
        }
        // Update on any state changes (as is the default)
        if (this.state !== nextState) {
            return true;
        }
        // Update if props are shallowly not equal, inspired by PureRenderMixin
        var keys = Object.keys(this.props);
        if (keys.length !== Object.keys(nextProps).length) {
            return true;
        }
        for (var i = keys.length - 1; i >= 0; i--) {
            var key = keys[i];
            var newValue = nextProps[key];
            if (newValue !== this$1.props[key]) {
                return true;
            }
            else if (newValue &&
                typeof newValue === "object" &&
                !mobx.isObservable(newValue)) {
                // If the newValue is still the same object, but that object is not observable,
                // fallback to the default behavior: update, because the object *might* have changed.
                return true;
            }
        }
        return false;
    }
    function makeReactive(componentClass) {
        var target = componentClass.prototype || componentClass;
        var baseDidMount = target.componentDidMount;
        var baseWillMount = target.componentWillMount;
        var baseUnmount = target.componentWillUnmount;
        target.componentWillMount = function () {
            var this$1 = this;

            if (isUsingStaticRendering === true) {
                return;
            }
            // Call original
            if (baseWillMount) {
                baseWillMount.call(this);
            }
            var reaction;
            var isRenderingPending = false;
            var initialName = this.displayName ||
                this.name ||
                (this.constructor &&
                    (this.constructor.displayName || this.constructor.name)) ||
                "<component>";
            var baseRender = this.render.bind(this);
            var initialRender = function (nextProps, nextContext) {
                reaction = new mobx.Reaction((initialName + ".render()"), function () {
                    if (!isRenderingPending) {
                        isRenderingPending = true;
                        if (this$1.__$mobxIsUnmounted !== true) {
                            var hasError = true;
                            try {
                                Component.prototype.forceUpdate.call(this$1);
                                hasError = false;
                            }
                            finally {
                                if (hasError) {
                                    reaction.dispose();
                                }
                            }
                        }
                    }
                });
                reactiveRender.$mobx = reaction;
                this$1.render = reactiveRender;
                return reactiveRender(nextProps, nextContext);
            };
            var reactiveRender = function (nextProps, nextContext) {
                isRenderingPending = false;
                var rendering;
                reaction.track((function () {
                    if (isDevtoolsEnabled) {
                        this$1.__$mobRenderStart = Date.now();
                    }
                    rendering = mobx.extras.allowStateChanges(false, baseRender.bind(this$1, nextProps, nextContext));
                    if (isDevtoolsEnabled) {
                        this$1.__$mobRenderEnd = Date.now();
                    }
                }));
                return rendering;
            };
            this.render = initialRender;
        };
        target.componentDidMount = function () {
            if (isDevtoolsEnabled) {
                reportRendering(this);
            }
            // Call original
            if (baseDidMount) {
                baseDidMount.call(this);
            }
        };
        target.componentWillUnmount = function () {
            if (isUsingStaticRendering === true) {
                return;
            }
            // Call original
            if (baseUnmount) {
                baseUnmount.call(this);
            }
            // Dispose observables
            if (this.render.$mobx) {
                this.render.$mobx.dispose();
            }
            this.__$mobxIsUnmounted = true;
            if (isDevtoolsEnabled) {
                var node = this._vNode.dom;
                if (node && componentByNodeRegistery) {
                    componentByNodeRegistery.delete(node);
                }
                renderReporter.emit({
                    component: this,
                    event: "destroy",
                    node: node
                });
            }
        };
        if (!target.shouldComponentUpdate) {
            target.shouldComponentUpdate = scuMobx;
        }
        return componentClass;
    }

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    /**
     * Wraps a component and provides stores as props
     */
    function connect(arg1, arg2) {
        if (typeof arg1 === "string") {
            throwError("Store names should be provided as array");
        }
        if (Array.isArray(arg1)) {
            // component needs stores
            if (!arg2) {
                // invoked as decorator
                return function (_componentClass) { return connect(arg1, _componentClass); };
            }
            else {
                // TODO: deprecate this invocation style
                return inject.apply(null, arg1)(connect(arg2));
            }
        }
        var componentClass = arg1;
        // Stateless function component:
        // If it is function but doesn't seem to be a Inferno class constructor,
        // wrap it to a Inferno class automatically
        if (typeof componentClass === "function" &&
            (!componentClass.prototype || !componentClass.prototype.render) &&
            !componentClass.isReactClass &&
            !Component.isPrototypeOf(componentClass)) {
            var newClass = createClass({
                contextTypes: componentClass.contextTypes,
                displayName: componentClass.displayName || componentClass.name,
                getDefaultProps: function () { return componentClass.defaultProps; },
                propTypes: componentClass.propTypes,
                render: function render() {
                    return componentClass.call(this, this.props, this.context);
                }
            });
            return connect(newClass);
        }
        if (!componentClass) {
            throwError('Please pass a valid component to "connect"');
        }
        componentClass.isMobXReactObserver = true;
        return makeReactive(componentClass);
    }

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    var specialKeys = {
        children: true,
        key: true,
        ref: true
    };
    var Provider = (function (Component$$1) {
        function Provider(props, context) {
            Component$$1.call(this, props, context);
            this.contextTypes = {
                // tslint:disable-next-line:no-empty
                mobxStores: function mobxStores() { }
            };
            this.childContextTypes = {
                // tslint:disable-next-line:no-empty
                mobxStores: function mobxStores() { }
            };
            this.store = props.store;
        }

        if ( Component$$1 ) Provider.__proto__ = Component$$1;
        Provider.prototype = Object.create( Component$$1 && Component$$1.prototype );
        Provider.prototype.constructor = Provider;
        Provider.prototype.render = function render () {
            return this.props.children;
        };
        Provider.prototype.getChildContext = function getChildContext () {
            var this$1 = this;

            var stores = {};
            // inherit stores
            var baseStores = this.context.mobxStores;
            if (baseStores) {
                for (var key in baseStores) {
                    stores[key] = baseStores[key];
                }
            }
            // add own stores
            for (var key$1 in this$1.props) {
                if (!specialKeys[key$1] && key$1 !== "suppressChangedStoreWarning") {
                    stores[key$1] = this$1.props[key$1];
                }
            }
            return {
                mobxStores: stores
            };
        };

        return Provider;
    }(Component));

    {
        Provider.prototype.componentWillReceiveProps = function (nextProps) {
            var this$1 = this;

            // Maybe this warning is to aggressive?
            if (Object.keys(nextProps).length !== Object.keys(this.props).length) {
                warning("MobX Provider: The set of provided stores has changed. " +
                    "Please avoid changing stores as the change might not propagate to all children");
            }
            if (!nextProps.suppressChangedStoreWarning) {
                for (var key in nextProps) {
                    if (!specialKeys[key] && this$1.props[key] !== nextProps[key]) {
                        warning("MobX Provider: Provided store '" + key + "' has changed. " +
                            "Please avoid replacing stores as the change might not propagate to all children");
                    }
                }
            }
        };
    }

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    var index = {
        EventEmitter: EventEmitter,
        Provider: Provider,
        componentByNodeRegistery: componentByNodeRegistery,
        connect: connect,
        inject: inject,
        observer: connect,
        renderReporter: renderReporter,
        trackComponents: trackComponents,
        useStaticRendering: useStaticRendering
    };

    exports['default'] = index;
    exports.EventEmitter = EventEmitter;
    exports.Provider = Provider;
    exports.componentByNodeRegistery = componentByNodeRegistery;
    exports.observer = connect;
    exports.connect = connect;
    exports.inject = inject;
    exports.renderReporter = renderReporter;
    exports.trackComponents = trackComponents;
    exports.useStaticRendering = useStaticRendering;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
