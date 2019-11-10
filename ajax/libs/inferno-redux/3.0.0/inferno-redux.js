
/*!
 * Inferno.Redux v3.0.0
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('hoist-non-inferno-statics'), require('inferno-component'), require('inferno-create-element'), require('redux')) :
	typeof define === 'function' && define.amd ? define(['exports', 'hoist-non-inferno-statics', 'inferno-component', 'inferno-create-element', 'redux'], factory) :
	(factory((global.Inferno = global.Inferno || {}, global.Inferno.Redux = global.Inferno.Redux || {}),global.hoistStatics,global.Inferno.Component,global.Inferno.createElement,global.redux));
}(this, (function (exports,hoistStatics,Component,createElement,redux) { 'use strict';

hoistStatics = 'default' in hoistStatics ? hoistStatics['default'] : hoistStatics;
Component = 'default' in Component ? Component['default'] : Component;
createElement = 'default' in createElement ? createElement['default'] : createElement;

var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document

function toArray(children) {
    return isArray(children) ? children : (children ? [children] : children);
}
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;


function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}

function isFunction(o) {
    return typeof o === 'function';
}


function isNull(o) {
    return o === null;
}

function isUndefined(o) {
    return o === void 0;
}

function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}

function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}

// From https://github.com/lodash/lodash/blob/es
function overArg(func, transform) {
    return function (arg) {
        return func(transform(arg));
    };
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
function isObjectLike(value) {
    return value != null && typeof value === 'object';
}
var objectTag = '[object Object]';
var funcProto = Function.prototype;
var objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
var objectToString = objectProto.toString;
function isPlainObject(value) {
    if (!isObjectLike(value) || objectToString.call(value) !== objectTag) {
        return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
        return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return (typeof Ctor === 'function' &&
        Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString);
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning$1(message) {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(message);
    }
    try {
        // This error was thrown as a convenience so that if you enable
        // "break on all exceptions" in your console,
        // it would pause the execution at this line.
        throw new Error(message);
        // tslint:disable-next-line:no-empty
    }
    catch (e) { }
}
function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    // Test for A's keys different from B.
    var hasOwn = Object.prototype.hasOwnProperty;
    for (var i = 0, len = keysA.length; i < len; i++) {
        var key = keysA[i];
        if (!hasOwn.call(objB, key) ||
            objA[key] !== objB[key]) {
            return false;
        }
    }
    return true;
}
function wrapActionCreators(actionCreators) {
    return function (dispatch) { return redux.bindActionCreators(actionCreators, dispatch); };
}

var errorObject = { value: null };
var defaultMapStateToProps = function (state) { return ({}); }; // eslint-disable-line no-unused-vars
var defaultMapDispatchToProps = function (dispatch) { return ({ dispatch: dispatch }); };
var defaultMergeProps = function (parentProps, stateProps, dispatchProps) {
    var obj = {};
    if (parentProps) {
        for (var key in parentProps) {
            obj[key] = parentProps[key];
        }
    }
    if (stateProps) {
        for (var key$1 in stateProps) {
            obj[key$1] = stateProps[key$1];
        }
    }
    if (dispatchProps) {
        for (var key$2 in dispatchProps) {
            obj[key$2] = dispatchProps[key$2];
        }
    }
    return obj;
};
function tryCatch(fn, ctx) {
    try {
        return fn.apply(ctx);
    }
    catch (e) {
        errorObject.value = e;
        return errorObject;
    }
}
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
// Helps track hot reloading.
var nextVersion = 0;
function connect(mapStateToProps, mapDispatchToProps, mergeProps, options) {
    if ( options === void 0 ) options = {};

    var shouldSubscribe = Boolean(mapStateToProps);
    var mapState = mapStateToProps || defaultMapStateToProps;
    var mapDispatch;
    if (isFunction(mapDispatchToProps)) {
        mapDispatch = mapDispatchToProps;
    }
    else if (!mapDispatchToProps) {
        mapDispatch = defaultMapDispatchToProps;
    }
    else {
        mapDispatch = wrapActionCreators(mapDispatchToProps);
    }
    var finalMergeProps = mergeProps || defaultMergeProps;
    var pure = options.pure; if ( pure === void 0 ) pure = true;
    var withRef = options.withRef; if ( withRef === void 0 ) withRef = false;
    var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;
    // Helps track hot reloading.
    var version = nextVersion++;
    return function wrapWithConnect(WrappedComponent) {
        var connectDisplayName = "Connect(" + (getDisplayName(WrappedComponent)) + ")";
        function checkStateShape(props, methodName) {
            if (!isPlainObject(props)) {
                warning$1(methodName + "() in " + connectDisplayName + " must return a plain object. " +
                    "Instead received " + props + ".");
            }
        }
        function computeMergedProps(stateProps, dispatchProps, parentProps) {
            var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
            {
                checkStateShape(mergedProps, 'mergeProps');
            }
            return mergedProps;
        }
        var Connect = (function (Component$$1) {
            function Connect(props, context) {
                Component$$1.call(this, props, context);
                this.version = version;
                this.wrappedInstance = null;
                this.store = (props && props.store) || (context && context.store);
                if (!this.store) {
                    throwError('Could not find "store" in either the context or ' +
                        "props of \"" + connectDisplayName + "\". " +
                        'Either wrap the root component in a <Provider>, ' +
                        "or explicitly pass \"store\" as a prop to \"" + connectDisplayName + "\".");
                }
                var storeState = this.store.getState();
                this.state = { storeState: storeState };
                this.clearCache();
            }

            if ( Component$$1 ) Connect.__proto__ = Component$$1;
            Connect.prototype = Object.create( Component$$1 && Component$$1.prototype );
            Connect.prototype.constructor = Connect;
            Connect.prototype.componentDidMount = function componentDidMount () {
                this.trySubscribe();
            };
            Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate () {
                return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
            };
            Connect.prototype.computeStateProps = function computeStateProps (store, props) {
                if (!this.finalMapStateToProps) {
                    return this.configureFinalMapState(store, props);
                }
                var state = store.getState();
                var stateProps = this.doStatePropsDependOnOwnProps ?
                    this.finalMapStateToProps(state, props) :
                    this.finalMapStateToProps(state);
                return stateProps;
            };
            Connect.prototype.configureFinalMapState = function configureFinalMapState (store, props) {
                var mappedState = mapState(store.getState(), props);
                var isFactory = isFunction(mappedState);
                this.finalMapStateToProps = isFactory ? mappedState : mapState;
                this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;
                if (isFactory) {
                    return this.computeStateProps(store, props);
                }
                return mappedState;
            };
            Connect.prototype.computeDispatchProps = function computeDispatchProps (store, props) {
                if (!this.finalMapDispatchToProps) {
                    return this.configureFinalMapDispatch(store, props);
                }
                var dispatch = store.dispatch;
                return this.doDispatchPropsDependOnOwnProps ?
                    this.finalMapDispatchToProps(dispatch, props) :
                    this.finalMapDispatchToProps(dispatch);
            };
            Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch (store, props) {
                var mappedDispatch = mapDispatch(store.dispatch, props);
                var isFactory = isFunction(mappedDispatch);
                this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
                this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;
                if (isFactory) {
                    return this.computeDispatchProps(store, props);
                }
                return mappedDispatch;
            };
            Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded () {
                var nextStateProps = this.computeStateProps(this.store, this.props);
                if (this.stateProps && shallowEqual(nextStateProps, this.stateProps)) {
                    return false;
                }
                this.stateProps = nextStateProps;
                return true;
            };
            Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded () {
                var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
                if (this.dispatchProps && shallowEqual(nextDispatchProps, this.dispatchProps)) {
                    return false;
                }
                this.dispatchProps = nextDispatchProps;
                return true;
            };
            Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded () {
                var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
                if (this.mergedProps && checkMergedEquals && shallowEqual(nextMergedProps, this.mergedProps)) {
                    return false;
                }
                this.mergedProps = nextMergedProps;
                return true;
            };
            Connect.prototype.isSubscribed = function isSubscribed () {
                return isFunction(this.unsubscribe);
            };
            Connect.prototype.trySubscribe = function trySubscribe () {
                if (shouldSubscribe && !this.unsubscribe) {
                    this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
                    this.handleChange();
                }
            };
            Connect.prototype.tryUnsubscribe = function tryUnsubscribe () {
                if (this.unsubscribe) {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
            };
            Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
                if (!pure || !shallowEqual(nextProps, this.props)) {
                    this.haveOwnPropsChanged = true;
                }
            };
            Connect.prototype.componentWillUnmount = function componentWillUnmount () {
                this.tryUnsubscribe();
                this.clearCache();
            };
            Connect.prototype.clearCache = function clearCache () {
                this.dispatchProps = null;
                this.stateProps = null;
                this.mergedProps = null;
                this.haveOwnPropsChanged = true;
                this.hasStoreStateChanged = true;
                this.haveStatePropsBeenPrecalculated = false;
                this.statePropsPrecalculationError = null;
                this.renderedElement = null;
                this.finalMapDispatchToProps = null;
                this.finalMapStateToProps = null;
            };
            Connect.prototype.handleChange = function handleChange () {
                if (!this.unsubscribe) {
                    return;
                }
                var storeState = this.store.getState();
                var prevStoreState = this.state.storeState;
                if (pure && prevStoreState === storeState) {
                    return;
                }
                if (pure && !this.doStatePropsDependOnOwnProps) {
                    var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
                    if (!haveStatePropsChanged) {
                        return;
                    }
                    if (haveStatePropsChanged === errorObject) {
                        this.statePropsPrecalculationError = errorObject.value;
                    }
                    this.haveStatePropsBeenPrecalculated = true;
                }
                this.hasStoreStateChanged = true;
                this.setState({ storeState: storeState });
            };
            Connect.prototype.getWrappedInstance = function getWrappedInstance () {
                return this.wrappedInstance;
            };
            Connect.prototype.render = function render () {
                var this$1 = this;

                var ref = this;
                var haveOwnPropsChanged = ref.haveOwnPropsChanged;
                var hasStoreStateChanged = ref.hasStoreStateChanged;
                var haveStatePropsBeenPrecalculated = ref.haveStatePropsBeenPrecalculated;
                var statePropsPrecalculationError = ref.statePropsPrecalculationError;
                var renderedElement = ref.renderedElement;
                this.haveOwnPropsChanged = false;
                this.hasStoreStateChanged = false;
                this.haveStatePropsBeenPrecalculated = false;
                this.statePropsPrecalculationError = null;
                if (statePropsPrecalculationError) {
                    throw statePropsPrecalculationError;
                }
                var shouldUpdateStateProps = true;
                var shouldUpdateDispatchProps = true;
                if (pure && renderedElement) {
                    shouldUpdateStateProps = hasStoreStateChanged || (haveOwnPropsChanged && this.doStatePropsDependOnOwnProps);
                    shouldUpdateDispatchProps =
                        haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
                }
                var haveStatePropsChanged = false;
                var haveDispatchPropsChanged = false;
                if (haveStatePropsBeenPrecalculated) {
                    haveStatePropsChanged = true;
                }
                else if (shouldUpdateStateProps) {
                    haveStatePropsChanged = this.updateStatePropsIfNeeded();
                }
                if (shouldUpdateDispatchProps) {
                    haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
                }
                var haveMergedPropsChanged = true;
                if (haveStatePropsChanged ||
                    haveDispatchPropsChanged ||
                    haveOwnPropsChanged) {
                    haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
                }
                else {
                    haveMergedPropsChanged = false;
                }
                if (!haveMergedPropsChanged && renderedElement) {
                    return renderedElement;
                }
                if (withRef) {
                    this.renderedElement = createElement(WrappedComponent, combineFrom(this.mergedProps, { ref: function (instance) { return this$1.wrappedInstance = instance; } }));
                }
                else {
                    this.renderedElement = createElement(WrappedComponent, this.mergedProps);
                }
                return this.renderedElement;
            };

            return Connect;
        }(Component));
        Connect.displayName = connectDisplayName;
        Connect.WrappedComponent = WrappedComponent;
        {
            Connect.prototype.componentWillUpdate = function componentWillUpdate() {
                if (this.version === version) {
                    return;
                }
                // We are hot reloading!
                this.version = version;
                this.trySubscribe();
                this.clearCache();
            };
        }
        return hoistStatics(Connect, WrappedComponent);
    };
}

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
    if (didWarnAboutReceivingStore) {
        return;
    }
    didWarnAboutReceivingStore = true;
    warning$1('<Provider> does not support changing `store` on the fly.');
}
var Provider = (function (Component$$1) {
    function Provider(props, context) {
        Component$$1.call(this, props, context);
        this.store = props.store;
    }

    if ( Component$$1 ) Provider.__proto__ = Component$$1;
    Provider.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Provider.prototype.constructor = Provider;
    Provider.prototype.getChildContext = function getChildContext () {
        return { store: this.store };
    };
    Provider.prototype.render = function render (props) {
        if (isNullOrUndef(this.props.children) || toArray(this.props.children).length !== 1) {
            throw Error('Inferno Error: Only one child is allowed within the `Provider` component');
        }
        return props.children;
    };

    return Provider;
}(Component));

{
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
        var ref = this;
        var store = ref.store;
        var nextStore = nextProps.store;
        if (store !== nextStore) {
            warnAboutReceivingStore();
        }
    };
}

var index = {
    Provider: Provider,
    connect: connect
};

exports['default'] = index;
exports.Provider = Provider;
exports.connect = connect;

Object.defineProperty(exports, '__esModule', { value: true });

})));
