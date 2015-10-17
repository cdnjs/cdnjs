"use strict";

var Dispatcher = require("flux").Dispatcher;

var EventEmitter = babelHelpers.interopRequire(require("eventemitter3"));
var Symbol = babelHelpers.interopRequire(require("es-symbol"));
var assign = babelHelpers.interopRequire(require("object-assign"));

var ACTION_HANDLER = Symbol("action creator handler");
var ACTION_KEY = Symbol("holds the actions uid symbol for listening");
var ACTION_UID = Symbol("the actions uid name");
var ALL_LISTENERS = Symbol("name of listeners");
var EE = Symbol("event emitter instance");
var INIT_SNAPSHOT = Symbol("init snapshot storage");
var LAST_SNAPSHOT = Symbol("last snapshot storage");
var LIFECYCLE = Symbol("store lifecycle listeners");
var LISTENERS = Symbol("stores action listeners storage");
var PUBLIC_METHODS = Symbol("store public method storage");
var STATE_CHANGED = Symbol();
var STATE_CONTAINER = Symbol("the state container");

var GlobalActionsNameRegistry = {};

function formatAsConstant(name) {
  return name.replace(/[a-z]([A-Z])/g, function (i) {
    return "" + i[0] + "_" + i[1].toLowerCase();
  }).toUpperCase();
}

function uid(container, name) {
  var count = 0;
  var key = name;
  while (Object.hasOwnProperty.call(container, key)) {
    key = name + String(++count);
  }
  return key;
}

function doSetState(store, storeInstance, nextState) {
  if (!nextState) {
    return;
  }

  if (!store.alt.dispatcher.isDispatching()) {
    throw new Error("You can only use setState while dispatching");
  }

  if (typeof nextState === "function") {
    assign(storeInstance[STATE_CONTAINER], nextState(storeInstance[STATE_CONTAINER]));
  } else {
    assign(storeInstance[STATE_CONTAINER], nextState);
  }

  storeInstance[STATE_CHANGED] = true;
}

/* istanbul ignore next */
function NoopClass() {}

var builtIns = Object.getOwnPropertyNames(NoopClass);
var builtInProto = Object.getOwnPropertyNames(NoopClass.prototype);

var getInternalMethods = function (obj, excluded) {
  return Object.getOwnPropertyNames(obj).reduce(function (value, m) {
    if (excluded.indexOf(m) !== -1) {
      return value;
    }

    value[m] = obj[m];
    return value;
  }, {});
};

var AltStore = (function () {
  function AltStore(dispatcher, model, state, StoreModel) {
    var _this8 = this;

    babelHelpers.classCallCheck(this, AltStore);

    this[EE] = new EventEmitter();
    this[LIFECYCLE] = {};
    this[STATE_CHANGED] = false;
    this[STATE_CONTAINER] = state || model;

    this.boundListeners = model[ALL_LISTENERS];
    this.StoreModel = StoreModel;
    if (typeof this.StoreModel === "object") {
      this.StoreModel.state = assign({}, StoreModel.state);
    }

    assign(this[LIFECYCLE], model[LIFECYCLE]);
    assign(this, model[PUBLIC_METHODS]);

    // Register dispatcher
    this.dispatchToken = dispatcher.register(function (payload) {
      if (typeof model.beforeEach === "function") {
        model.beforeEach(payload.action.toString(), payload.data, _this8[STATE_CONTAINER]);
      }

      if (model[LISTENERS][payload.action]) {
        var result = false;

        try {
          result = model[LISTENERS][payload.action](payload.data);
        } catch (e) {
          if (_this8[LIFECYCLE].error) {
            _this8[LIFECYCLE].error(e, payload.action.toString(), payload.data, _this8[STATE_CONTAINER]);
          } else {
            throw e;
          }
        }

        if (result !== false || _this8[STATE_CHANGED]) {
          _this8.emitChange();
        }

        _this8[STATE_CHANGED] = false;
      }

      if (typeof model.afterEach === "function") {
        model.afterEach(payload.action.toString(), payload.data, _this8[STATE_CONTAINER]);
      }
    });

    if (this[LIFECYCLE].init) {
      this[LIFECYCLE].init();
    }
  }

  babelHelpers.createClass(AltStore, {
    getEventEmitter: {
      value: function getEventEmitter() {
        return this[EE];
      }
    },
    emitChange: {
      value: function emitChange() {
        this[EE].emit("change", this[STATE_CONTAINER]);
      }
    },
    listen: {
      value: function listen(cb) {
        this[EE].on("change", cb);
      }
    },
    unlisten: {
      value: function unlisten(cb) {
        this[EE].removeListener("change", cb);
      }
    },
    getState: {
      value: function getState() {
        // Copy over state so it's RO.
        var state = this[STATE_CONTAINER];
        return Object.keys(state).reduce(function (obj, key) {
          obj[key] = state[key];
          return obj;
        }, {});
      }
    }
  });
  return AltStore;
})();

var ActionCreator = (function () {
  function ActionCreator(alt, name, action, actions) {
    babelHelpers.classCallCheck(this, ActionCreator);

    this[ACTION_UID] = name;
    this[ACTION_HANDLER] = action.bind(this);
    this.actions = actions;
    this.alt = alt;
  }

  babelHelpers.createClass(ActionCreator, {
    dispatch: {
      value: function dispatch(data) {
        this.alt.dispatch(this[ACTION_UID], data);
      }
    }
  });
  return ActionCreator;
})();

var StoreMixinListeners = {
  on: function on(lifecycleEvent, handler) {
    this[LIFECYCLE][lifecycleEvent] = handler.bind(this);
  },

  bindAction: function bindAction(symbol, handler) {
    if (!symbol) {
      throw new ReferenceError("Invalid action reference passed in");
    }
    if (typeof handler !== "function") {
      throw new TypeError("bindAction expects a function");
    }

    if (handler.length > 1) {
      throw new TypeError("Action handler in store " + this._storeName + " for " + ("" + (symbol[ACTION_KEY] || symbol).toString() + " was defined with 2 ") + "parameters. Only a single parameter is passed through the " + "dispatcher, did you mean to pass in an Object instead?");
    }

    // You can pass in the constant or the function itself
    var key = symbol[ACTION_KEY] ? symbol[ACTION_KEY] : symbol;
    this[LISTENERS][key] = handler.bind(this);
    this[ALL_LISTENERS].push(Symbol.keyFor(key));
  },

  bindActions: function bindActions(actions) {
    var _this8 = this;

    Object.keys(actions).forEach(function (action) {
      var symbol = actions[action];
      var matchFirstCharacter = /./;
      var assumedEventHandler = action.replace(matchFirstCharacter, function (x) {
        return "on" + x[0].toUpperCase();
      });
      var handler = null;

      if (_this8[action] && _this8[assumedEventHandler]) {
        // If you have both action and onAction
        throw new ReferenceError("You have multiple action handlers bound to an action: " + ("" + action + " and " + assumedEventHandler));
      } else if (_this8[action]) {
        // action
        handler = _this8[action];
      } else if (_this8[assumedEventHandler]) {
        // onAction
        handler = _this8[assumedEventHandler];
      }

      if (handler) {
        _this8.bindAction(symbol, handler);
      }
    });
  },

  bindListeners: function bindListeners(obj) {
    var _this8 = this;

    Object.keys(obj).forEach(function (methodName) {
      var symbol = obj[methodName];
      var listener = _this8[methodName];

      if (!listener) {
        throw new ReferenceError("" + methodName + " defined but does not exist in " + _this8._storeName);
      }

      if (Array.isArray(symbol)) {
        symbol.forEach(function (action) {
          _this8.bindAction(action, listener);
        });
      } else {
        _this8.bindAction(symbol, listener);
      }
    });
  }

};

var StoreMixinEssentials = {
  waitFor: function waitFor(sources) {
    if (!sources) {
      throw new ReferenceError("Dispatch tokens not provided");
    }

    if (arguments.length === 1) {
      sources = Array.isArray(sources) ? sources : [sources];
    } else {
      sources = Array.prototype.slice.call(arguments);
    }

    var tokens = sources.map(function (source) {
      return source.dispatchToken || source;
    });

    this.dispatcher.waitFor(tokens);
  },

  exportPublicMethods: function exportPublicMethods(methods) {
    var _this8 = this;

    Object.keys(methods).forEach(function (methodName) {
      if (typeof methods[methodName] !== "function") {
        throw new TypeError("exportPublicMethods expects a function");
      }

      _this8[PUBLIC_METHODS][methodName] = methods[methodName];
    });
  },

  emitChange: function emitChange() {
    this.getInstance().emitChange();
  }
};

var setAppState = function (instance, data, onStore) {
  var obj = instance.deserialize(data);
  Object.keys(obj).forEach(function (key) {
    var store = instance.stores[key];
    if (store) {
      if (store[LIFECYCLE].deserialize) {
        obj[key] = store[LIFECYCLE].deserialize(obj[key]) || obj[key];
      }
      assign(store[STATE_CONTAINER], obj[key]);
      onStore(store);
    }
  });
};

var snapshot = function (instance) {
  for (var _len = arguments.length, storeNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    storeNames[_key - 1] = arguments[_key];
  }

  var stores = storeNames.length ? storeNames : Object.keys(instance.stores);
  return stores.reduce(function (obj, key) {
    var store = instance.stores[key];
    if (store[LIFECYCLE].snapshot) {
      store[LIFECYCLE].snapshot();
    }
    var customSnapshot = store[LIFECYCLE].serialize && store[LIFECYCLE].serialize();
    obj[key] = customSnapshot ? customSnapshot : store.getState();
    return obj;
  }, {});
};

var saveInitialSnapshot = function (instance, key) {
  var state = instance.stores[key][STATE_CONTAINER];
  var initial = instance.deserialize(instance[INIT_SNAPSHOT]);
  initial[key] = state;
  instance[INIT_SNAPSHOT] = instance.serialize(initial);
  instance[LAST_SNAPSHOT] = instance[INIT_SNAPSHOT];
};

var filterSnapshotOfStores = function (instance, serializedSnapshot, storeNames) {
  var stores = instance.deserialize(serializedSnapshot);
  var storesToReset = storeNames.reduce(function (obj, name) {
    if (!stores[name]) {
      throw new ReferenceError("" + name + " is not a valid store");
    }
    obj[name] = stores[name];
    return obj;
  }, {});
  return instance.serialize(storesToReset);
};

var createStoreFromObject = function (alt, StoreModel, key, saveStore) {
  var storeInstance = undefined;

  var StoreProto = {};
  StoreProto[ALL_LISTENERS] = [];
  StoreProto[LIFECYCLE] = {};
  StoreProto[LISTENERS] = {};

  assign(StoreProto, {
    _storeName: key,
    alt: alt,
    dispatcher: alt.dispatcher,
    getInstance: function getInstance() {
      return storeInstance;
    },
    setState: function setState(nextState) {
      doSetState(this, storeInstance, nextState);
    }
  }, StoreMixinListeners, StoreMixinEssentials, StoreModel);

  // bind the store listeners
  /* istanbul ignore else */
  if (StoreProto.bindListeners) {
    StoreMixinListeners.bindListeners.call(StoreProto, StoreProto.bindListeners);
  }

  // bind the lifecycle events
  /* istanbul ignore else */
  if (StoreProto.lifecycle) {
    Object.keys(StoreProto.lifecycle).forEach(function (event) {
      StoreMixinListeners.on.call(StoreProto, event, StoreProto.lifecycle[event]);
    });
  }

  // create the instance and assign the public methods to the instance
  storeInstance = assign(new AltStore(alt.dispatcher, StoreProto, StoreProto.state, StoreModel), StoreProto.publicMethods);

  /* istanbul ignore else */
  if (saveStore) {
    alt.stores[key] = storeInstance;
    saveInitialSnapshot(alt, key);
  }

  return storeInstance;
};

var Alt = (function () {
  function Alt() {
    var config = arguments[0] === undefined ? {} : arguments[0];
    babelHelpers.classCallCheck(this, Alt);

    this.serialize = config.serialize || JSON.stringify;
    this.deserialize = config.deserialize || JSON.parse;
    this.dispatcher = config.dispatcher || new Dispatcher();
    this.actions = {};
    this.stores = {};
    this[LAST_SNAPSHOT] = this[INIT_SNAPSHOT] = "{}";
  }

  babelHelpers.createClass(Alt, {
    dispatch: {
      value: function dispatch(action, data) {
        this.dispatcher.dispatch({ action: action, data: data });
      }
    },
    createStore: {
      value: function createStore(StoreModel, iden) {
        var saveStore = arguments[2] === undefined ? true : arguments[2];

        var storeInstance = undefined;
        var key = iden || StoreModel.name || StoreModel.displayName || "";

        if (saveStore && (this.stores[key] || !key)) {
          /* istanbul ignore else */
          if (typeof console !== "undefined") {
            if (this.stores[key]) {
              console.warn(new ReferenceError("A store named " + key + " already exists, double check your store " + "names or pass in your own custom identifier for each store"));
            } else {
              console.warn(new ReferenceError("Store name was not specified"));
            }
          }

          key = uid(this.stores, key);
        }

        if (typeof StoreModel === "object") {
          return createStoreFromObject(this, StoreModel, key, saveStore);
        }

        // Creating a class here so we don't overload the provided store's
        // prototype with the mixin behaviour and I'm extending from StoreModel
        // so we can inherit any extensions from the provided store.

        var Store = (function (_StoreModel) {
          function Store(alt) {
            babelHelpers.classCallCheck(this, Store);

            babelHelpers.get(Object.getPrototypeOf(Store.prototype), "constructor", this).call(this, alt);
          }

          babelHelpers.inherits(Store, _StoreModel);
          return Store;
        })(StoreModel);

        assign(Store.prototype, StoreMixinListeners, StoreMixinEssentials, {
          _storeName: key,
          alt: this,
          dispatcher: this.dispatcher,
          getInstance: function getInstance() {
            return storeInstance;
          },
          setState: function setState(nextState) {
            doSetState(this, storeInstance, nextState);
          }
        });

        Store.prototype[ALL_LISTENERS] = [];
        Store.prototype[LIFECYCLE] = {};
        Store.prototype[LISTENERS] = {};
        Store.prototype[PUBLIC_METHODS] = {};

        var store = new Store(this);

        storeInstance = assign(new AltStore(this.dispatcher, store, null, StoreModel), getInternalMethods(StoreModel, builtIns));

        if (saveStore) {
          this.stores[key] = storeInstance;
          saveInitialSnapshot(this, key);
        }

        return storeInstance;
      }
    },
    generateActions: {
      value: function generateActions() {
        for (var _len = arguments.length, actionNames = Array(_len), _key = 0; _key < _len; _key++) {
          actionNames[_key] = arguments[_key];
        }

        return this.createActions(function () {
          this.generateActions.apply(this, actionNames);
        });
      }
    },
    createAction: {
      value: function createAction(name, implementation, obj) {
        var actionId = uid(GlobalActionsNameRegistry, name);
        GlobalActionsNameRegistry[actionId] = 1;
        var actionName = Symbol["for"](actionId);

        // Wrap the action so we can provide a dispatch method
        var newAction = new ActionCreator(this, actionName, implementation, obj);

        var action = newAction[ACTION_HANDLER];
        action.defer = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          setTimeout(function () {
            newAction[ACTION_HANDLER].apply(null, args);
          });
        };
        action[ACTION_KEY] = actionName;
        return action;
      }
    },
    createActions: {
      value: function createActions(ActionsClass) {
        var _this8 = this;

        var exportObj = arguments[1] === undefined ? {} : arguments[1];

        var actions = {};
        var key = ActionsClass.name || ActionsClass.displayName || "";

        if (typeof ActionsClass === "function") {
          (function () {
            assign(actions, getInternalMethods(ActionsClass.prototype, builtInProto));

            var ActionsGenerator = (function (_ActionsClass) {
              function ActionsGenerator(alt) {
                babelHelpers.classCallCheck(this, ActionsGenerator);

                babelHelpers.get(Object.getPrototypeOf(ActionsGenerator.prototype), "constructor", this).call(this, alt);
              }

              babelHelpers.inherits(ActionsGenerator, _ActionsClass);
              babelHelpers.createClass(ActionsGenerator, {
                generateActions: {
                  value: function generateActions() {
                    for (var _len = arguments.length, actionNames = Array(_len), _key = 0; _key < _len; _key++) {
                      actionNames[_key] = arguments[_key];
                    }

                    actionNames.forEach(function (actionName) {
                      // This is a function so we can later bind this to ActionCreator
                      actions[actionName] = function (x) {
                        for (var _len2 = arguments.length, a = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                          a[_key2 - 1] = arguments[_key2];
                        }

                        this.dispatch(a.length ? [x].concat(a) : x);
                      };
                    });
                  }
                }
              });
              return ActionsGenerator;
            })(ActionsClass);

            new ActionsGenerator(_this8);
          })();
        } else {
          assign(actions, ActionsClass);
        }

        return Object.keys(actions).reduce(function (obj, action) {
          obj[action] = _this8.createAction("" + key + "#" + action, actions[action], obj);
          var constant = formatAsConstant(action);
          obj[constant] = obj[action][ACTION_KEY];
          return obj;
        }, exportObj);
      }
    },
    takeSnapshot: {
      value: function takeSnapshot() {
        for (var _len = arguments.length, storeNames = Array(_len), _key = 0; _key < _len; _key++) {
          storeNames[_key] = arguments[_key];
        }

        var state = snapshot.apply(undefined, [this].concat(storeNames));
        this[LAST_SNAPSHOT] = this.serialize(assign(this.deserialize(this[LAST_SNAPSHOT]), state));
        return this.serialize(state);
      }
    },
    rollback: {
      value: function rollback() {
        setAppState(this, this[LAST_SNAPSHOT], function (store) {
          if (store[LIFECYCLE].rollback) {
            store[LIFECYCLE].rollback();
          }
          store.emitChange();
        });
      }
    },
    recycle: {
      value: function recycle() {
        for (var _len = arguments.length, storeNames = Array(_len), _key = 0; _key < _len; _key++) {
          storeNames[_key] = arguments[_key];
        }

        var initialSnapshot = storeNames.length ? filterSnapshotOfStores(this, this[INIT_SNAPSHOT], storeNames) : this[INIT_SNAPSHOT];

        setAppState(this, initialSnapshot, function (store) {
          if (store[LIFECYCLE].init) {
            store[LIFECYCLE].init();
          }
          store.emitChange();
        });
      }
    },
    flush: {
      value: function flush() {
        var state = this.serialize(snapshot(this));
        this.recycle();
        return state;
      }
    },
    bootstrap: {
      value: function bootstrap(data) {
        setAppState(this, data, function (store) {
          if (store[LIFECYCLE].bootstrap) {
            store[LIFECYCLE].bootstrap();
          }
          store.emitChange();
        });
      }
    },
    addActions: {

      // Instance type methods for injecting alt into your application as context

      value: function addActions(name, ActionsClass) {
        this.actions[name] = Array.isArray(ActionsClass) ? this.generateActions.apply(this, ActionsClass) : this.createActions(ActionsClass);
      }
    },
    addStore: {
      value: function addStore(name, StoreModel, saveStore) {
        this.createStore(StoreModel, name, saveStore);
      }
    },
    getActions: {
      value: function getActions(name) {
        return this.actions[name];
      }
    },
    getStore: {
      value: function getStore(name) {
        return this.stores[name];
      }
    }
  });
  return Alt;
})();

module.exports = Alt;

