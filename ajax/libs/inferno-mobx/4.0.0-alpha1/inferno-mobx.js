(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('hoist-non-inferno-statics'), require('inferno'), require('inferno-component'), require('mobx')) :
    typeof define === 'function' && define.amd ? define(['exports', 'hoist-non-inferno-statics', 'inferno', 'inferno-component', 'mobx'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.Mobx = global.Inferno.Mobx || {}),global.hoistStatics,global.Inferno,global.Inferno.Component,global.mobx));
}(this, (function (exports,hoistStatics,inferno,Component,mobx) { 'use strict';

    hoistStatics = hoistStatics && 'default' in hoistStatics ? hoistStatics['default'] : hoistStatics;
    Component = Component && 'default' in Component ? Component['default'] : Component;

    var isUsingStaticRendering = false;
    var warnedAboutObserverInjectDeprecation = false;
    function useStaticRendering(useStaticRendering) {
        isUsingStaticRendering = useStaticRendering;
    }
    /**
     * Utilities
     */
    function patch(target, funcName, runMixinFirst) {
        var base = target[funcName];
        var mixinFunc = reactiveMixin[funcName];
        // MWE: ideally we freeze here to protect against accidental overwrites in component instances, see #195
        // ...but that breaks react-hot-loader, see #231...
        target[funcName] = !base
            ? mixinFunc
            : runMixinFirst === true
                ? function () {
                    mixinFunc.apply(this, arguments);
                    base.apply(this, arguments);
                }
                : function () {
                    base.apply(this, arguments);
                    mixinFunc.apply(this, arguments);
                };
    }
    function isObjectShallowModified(prev, next) {
        if (null == prev || null == next || typeof prev !== 'object' || typeof next !== 'object') {
            return prev !== next;
        }
        var keys = Object.keys(prev);
        if (keys.length !== Object.keys(next).length) {
            return true;
        }
        for (var i = keys.length - 1; i >= 0; i--) {
            var key = keys[i];
            if (next[key] !== prev[key]) {
                return true;
            }
        }
        return false;
        // // Update if props are shallowly not equal, inspired by PureRenderMixin
        // const keys = Object.keys(this.props);
        // if (keys.length !== Object.keys(nextProps).length) {
        // 	return true;
        // }
        //
        // for (let i = keys.length - 1; i >= 0; i--) {
        // 	const key = keys[ i ];
        // 	const newValue = nextProps[ key ];
        // 	if (newValue !== this.props[ key ]) {
        // 		return true;
        // 	} else if (newValue && typeof newValue === 'object' && !isObservable(newValue)) {
        // 		// If the newValue is still the same object, but that object is not observable,
        // 		// fallback to the default behavior: update, because the object *might* have changed.
        // 		return true;
        // 	}
        // }
        // return false;
    }
    /**
     * ReactiveMixin
     */
    var reactiveMixin = {
        componentWillMount: function componentWillMount() {
            var this$1 = this;

            if (isUsingStaticRendering === true) {
                return;
            }
            // Generate friendly name for debugging
            var initialName = this.displayName
                || this.name
                || (this.constructor && (this.constructor.displayName || this.constructor.name))
                || '<component>';
            var rootNodeID = this._reactInternalInstance && this._reactInternalInstance._rootNodeID;
            /**
             * If props are shallowly modified, react will render anyway,
             * so atom.reportChanged() should not result in yet another re-render
             */
            var skipRender = false;
            /**
             * forceUpdate will re-assign this.props. We don't want that to cause a loop,
             * so detect these changes
             */
            var isForcingUpdate = false;
            function makePropertyObservableReference(propName) {
                var valueHolder = this[propName];
                var atom = new mobx.Atom('reactive ' + propName);
                Object.defineProperty(this, propName, {
                    configurable: true, enumerable: true,
                    get: function get() {
                        atom.reportObserved();
                        return valueHolder;
                    },
                    set: function set(v) {
                        if (!isForcingUpdate && isObjectShallowModified(valueHolder, v)) {
                            valueHolder = v;
                            skipRender = true;
                            atom.reportChanged();
                            skipRender = false;
                        }
                        else {
                            valueHolder = v;
                        }
                    }
                });
            }
            // make this.props an observable reference, see #124
            makePropertyObservableReference.call(this, 'props');
            // make state an observable reference
            makePropertyObservableReference.call(this, 'state');
            // wire up reactive render
            var baseRender = this.render.bind(this);
            var reaction;
            var isRenderingPending = false;
            var initialRender = function () {
                reaction = new mobx.Reaction((initialName + "#" + rootNodeID + ".render()"), function () {
                    if (!isRenderingPending) {
                        // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
                        // This unidiomatic React usage but React will correctly warn about this so we continue as usual
                        // See #85 / Pull #44
                        isRenderingPending = true;
                        if (typeof this$1.componentWillReact === 'function') {
                            this$1.componentWillReact(); // TODO: wrap in action?
                        }
                        if (this$1.__$mobxIsUnmounted !== true) {
                            // If we are unmounted at this point, componentWillReact() had a side effect causing the component to unmounted
                            // TODO: remove this check? Then react will properly warn about the fact that this should not happen? See #73
                            // However, people also claim this migth happen during unit tests..
                            var hasError = true;
                            try {
                                isForcingUpdate = true;
                                if (!skipRender) {
                                    Component.prototype.forceUpdate.call(this$1);
                                }
                                hasError = false;
                            }
                            finally {
                                isForcingUpdate = false;
                                if (hasError) {
                                    reaction.dispose();
                                }
                            }
                        }
                    }
                });
                reactiveRender.$mobx = reaction;
                this$1.render = reactiveRender;
                return reactiveRender(this$1.props, this$1.state, this$1.context);
            };
            var reactiveRender = function (props, state, context) {
                isRenderingPending = false;
                var rendering;
                reaction.track((function () {
                    rendering = mobx.extras.allowStateChanges(false, (function () {
                        return baseRender(props, state, context);
                    }));
                }));
                return rendering;
            };
            this.render = initialRender;
        },
        componentWillUnmount: function componentWillUnmount() {
            if (isUsingStaticRendering === true) {
                return;
            }
            if (this.render.$mobx) {
                this.render.$mobx.dispose();
            }
            this.__$mobxIsUnmounted = true;
        },
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            if (isUsingStaticRendering) {
                console.warn('[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.');
            }
            // update on any state changes (as is the default)
            if (this.state !== nextState) {
                return true;
            }
            // update if props are shallowly not equal, inspired by PureRenderMixin
            // we could return just 'false' here, and avoid the `skipRender` checks etc
            // however, it is nicer if lifecycle events are triggered like usually,
            // so we return true here if props are shallowly modified.
            return isObjectShallowModified(this.props, nextProps);
        }
    };
    /**
     * Observer function / decorator
     */
    function observer(arg1, arg2) {
        if (typeof arg1 === 'string') {
            throw new Error('Store names should be provided as array');
        }
        if (Array.isArray(arg1)) {
            // component needs stores
            if (!warnedAboutObserverInjectDeprecation) {
                warnedAboutObserverInjectDeprecation = true;
                console.warn('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`');
            }
            if (!arg2) {
                // invoked as decorator
                return function (componentClass) { return observer(arg1, componentClass); };
            }
            else {
                return inject.apply(null, arg1)(observer(arg2));
            }
        }
        var componentClass = arg1;
        if (!componentClass) {
            throw new Error('Please pass a valid component');
        }
        if (componentClass.isMobxInjector === true) {
            console.warn('Mobx observer: You are trying to use \'observer\' on a component that already has \'inject\'. Please apply \'observer\' before applying \'inject\'');
        }
        // Stateless function component:
        // If it is function but doesn't seem to be a react class constructor,
        // wrap it to a react class automatically
        if (typeof componentClass === 'function' &&
            (!componentClass.prototype || !componentClass.prototype.render) && !componentClass.isReactClass && !Component.isPrototypeOf(componentClass)) {
            return observer((_a = (function (Component$$1) {
                function _a () {
                    Component$$1.apply(this, arguments);
                }

                if ( Component$$1 ) _a.__proto__ = Component$$1;
                _a.prototype = Object.create( Component$$1 && Component$$1.prototype );
                _a.prototype.constructor = _a;

                _a.prototype.render = function render (props, state, context) { return componentClass(props, context); };

                return _a;
            }(Component)),
                _a.displayName = componentClass.displayName || componentClass.name,
                // TODO: PropTypes
                // public static contextTypes = componentClass.contextTypes;
                // public static propTypes = componentClass.propTypes;
                _a.defaultProps = componentClass.defaultProps,
                _a));
        }
        var target = componentClass.prototype || componentClass;
        mixinLifecycleEvents(target);
        componentClass.isMobXReactObserver = true;
        return componentClass;
        var _a;
    }
    function mixinLifecycleEvents(target) {
        patch(target, 'componentWillMount', true);
        [
            'componentDidMount',
            'componentWillUnmount',
            'componentDidUpdate'
        ].forEach((function (funcName) {
            patch(target, funcName);
        }));
        if (!target.shouldComponentUpdate) {
            target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
        }
    }
    // TODO: support injection somehow as well?
    var Observer = observer((function (ref) {
        var children = ref.children;

        return children();
    }));

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    /**
     * Store Injection
     */
    function createStoreInjector(grabStoresFn, component, injectNames) {
        var displayName = 'inject-' + (component.displayName || component.name || (component.constructor && component.constructor.name) || 'Unknown');
        if (injectNames) {
            displayName += '-with-' + injectNames;
        }
        var Injector = (function (Component$$1) {
            function Injector() {
                var this$1 = this;

                Component$$1.apply(this, arguments);
                this.wrappedInstance = null;
                this.storeRef = function (instance) { this$1.wrappedInstance = instance; };
            }

            if ( Component$$1 ) Injector.__proto__ = Component$$1;
            Injector.prototype = Object.create( Component$$1 && Component$$1.prototype );
            Injector.prototype.constructor = Injector;
            Injector.prototype.render = function render (props, state, context) {
                // Optimization: it might be more efficient to apply the mapper function *outside* the render method
                // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
                // See this test: 'using a custom injector is not too reactive' in inject.js
                var newProps = {};
                for (var key in props) {
                    if (props.hasOwnProperty(key)) {
                        newProps[key] = props[key];
                    }
                }
                var additionalProps = grabStoresFn(context.mobxStores || {}, newProps, context) || {};
                for (var key$1 in additionalProps) {
                    newProps[key$1] = additionalProps[key$1];
                }
                return inferno.createVNode(8 /* Unknown Component */, component, null, null, newProps, props.key, this.storeRef);
            };

            return Injector;
        }(Component));
        Injector.wrappedComponent = component;
        Injector.displayName = displayName;
        Injector.isMobxInjector = true;
        // Static fields from component should be visible on the generated Injector
        hoistStatics(Injector, component);
        return Injector;
    }
    function grabStoresByName(storeNames) {
        return function (baseStores, nextProps) {
            storeNames.forEach((function (storeName) {
                if (storeName in nextProps) {
                    return; // prefer props over stores
                }
                if (!(storeName in baseStores)) {
                    throw new Error('MobX observer: Store "' + storeName + '" is not available! Make sure it is provided by some Provider');
                }
                nextProps[storeName] = baseStores[storeName];
            }));
            return nextProps;
        };
    }
    /**
     * higher order component that injects stores to a child.
     * takes either a varargs list of strings, which are stores read from the context,
     * or a function that manually maps the available stores from the context to props:
     * storesToProps(mobxStores, props, context) => newProps
     */
    function inject(arg /* fn(stores, nextProps) or ...storeNames */) {
        var arguments$1 = arguments;

        var grabStoresFn;
        if (typeof arg === 'function') {
            grabStoresFn = arg;
            return function (componentClass) {
                var injected = createStoreInjector(grabStoresFn, componentClass);
                injected.isMobxInjector = false; // supress warning
                // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
                // see #111
                injected = observer(injected);
                injected.isMobxInjector = true; // restore warning
                return injected;
            };
        }
        else {
            var storeNames = [];
            for (var i = 0; i < arguments.length; i++) {
                storeNames[i] = arguments$1[i];
            }
            grabStoresFn = grabStoresByName(storeNames);
            return function (componentClass) {
                return createStoreInjector(grabStoresFn, componentClass, storeNames.join('-'));
            };
        }
    }

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */ function warning(message) {
        // tslint:disable-next-line:no-console
        console.warn(message);
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
                if (!specialKeys[key$1] && key$1 !== 'suppressChangedStoreWarning') {
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

            // Maybe this warning is too aggressive?
            if (Object.keys(nextProps).length !== Object.keys(this.props).length) {
                warning('MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children');
            }
            if (!nextProps.suppressChangedStoreWarning) {
                for (var key in nextProps) {
                    if (!specialKeys[key] && this$1.props[key] !== nextProps[key]) {
                        warning('MobX Provider: Provided store "' + key + '" has changed. Please avoid replacing stores as the change might not propagate to all children');
                    }
                }
            }
        };
    }

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

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    var index = {
        EventEmitter: EventEmitter,
        Observer: Observer,
        Provider: Provider,
        inject: inject,
        observer: observer,
        renderReporter: EventEmitter,
        useStaticRendering: useStaticRendering
    };

    exports.EventEmitter = EventEmitter;
    exports.Observer = Observer;
    exports.Provider = Provider;
    exports.inject = inject;
    exports.observer = observer;
    exports.renderReporter = EventEmitter;
    exports.useStaticRendering = useStaticRendering;
    exports['default'] = index;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
