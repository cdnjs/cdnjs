"use strict";

var Dispatcher = require("flux").Dispatcher;
var EventEmitter = babelHelpers.interopRequire(require("eventemitter3"));

var Symbol = babelHelpers.interopRequire(require("es-symbol"));

var assign = babelHelpers.interopRequire(require("object-assign"));

var now = Date.now();
var VariableSymbol = function (desc) {
  return Symbol("" + now + "" + desc);
};

var ACTION_HANDLER = Symbol("action creator handler");
var ACTION_KEY = Symbol("holds the actions uid symbol for listening");
var ACTION_UID = Symbol("the actions uid name");
var EE = Symbol("event emitter instance");
var INIT_SNAPSHOT = Symbol("init snapshot storage");
var LAST_SNAPSHOT = Symbol("last snapshot storage");
var LIFECYCLE = Symbol("store lifecycle listeners");
var LISTENERS = Symbol("stores action listeners storage");
var STATE_CONTAINER = VariableSymbol("the state container");

var formatAsConstant = function (name) {
  return name.replace(/[a-z]([A-Z])/g, function (i) {
    return "" + i[0] + "_" + i[1].toLowerCase();
  }).toUpperCase();
};

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
  function AltStore(dispatcher, state) {
    var _this6 = this;
    babelHelpers.classCallCheck(this, AltStore);

    this[EE] = new EventEmitter();
    this[LIFECYCLE] = {};
    this[STATE_CONTAINER] = state;

    assign(this[LIFECYCLE], state[LIFECYCLE]);

    // Register dispatcher
    this.dispatchToken = dispatcher.register(function (payload) {
      if (state[LISTENERS][payload.action]) {
        var result = state[LISTENERS][payload.action](payload.data);
        result !== false && _this6.emitChange();
      }
    });

    if (this[LIFECYCLE].init) {
      this[LIFECYCLE].init();
    }
  }

  babelHelpers.prototypeProperties(AltStore, null, {
    emitChange: {
      value: function emitChange() {
        this[EE].emit("change", this[STATE_CONTAINER]);
      },
      writable: true,
      configurable: true
    },
    listen: {
      value: function listen(cb) {
        this[EE].on("change", cb);
      },
      writable: true,
      configurable: true
    },
    unlisten: {
      value: function unlisten(cb) {
        this[EE].removeListener("change", cb);
      },
      writable: true,
      configurable: true
    },
    getState: {
      value: function getState() {
        // Copy over state so it's RO.
        return assign({}, this[STATE_CONTAINER]);
      },
      writable: true,
      configurable: true
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

  babelHelpers.prototypeProperties(ActionCreator, null, {
    dispatch: {
      value: function dispatch(data) {
        this.alt.dispatch(this[ACTION_UID], data);
      },
      writable: true,
      configurable: true
    }
  });

  return ActionCreator;
})();

var StoreMixin = {
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
    if (symbol[ACTION_KEY]) {
      this[LISTENERS][symbol[ACTION_KEY]] = handler.bind(this);
    } else {
      this[LISTENERS][symbol] = handler.bind(this);
    }
  },

  bindActions: function bindActions(actions) {
    var _this6 = this;
    Object.keys(actions).forEach(function (action) {
      var symbol = actions[action];
      var matchFirstCharacter = /./;
      var assumedEventHandler = action.replace(matchFirstCharacter, function (x) {
        return "on" + x[0].toUpperCase();
      });
      var handler = null;

      if (_this6[action] && _this6[assumedEventHandler]) {
        // If you have both action and onAction
        throw new ReferenceError("You have multiple action handlers bound to an action: " + ("" + action + " and " + assumedEventHandler));
      } else if (_this6[action]) {
        // action
        handler = _this6[action];
      } else if (_this6[assumedEventHandler]) {
        // onAction
        handler = _this6[assumedEventHandler];
      }

      if (handler) {
        _this6.bindAction(symbol, handler);
      }
    });
  },

  bindListeners: function bindListeners(obj) {
    var _this6 = this;
    Object.keys(obj).forEach(function (methodName) {
      var symbol = obj[methodName];
      var listener = _this6[methodName];

      if (!listener) {
        throw new ReferenceError("" + methodName + " defined but does not exist in " + _this6._storeName);
      }

      if (Array.isArray(symbol)) {
        symbol.forEach(function (action) {
          return _this6.bindAction(action, listener);
        });
      } else {
        _this6.bindAction(symbol, listener);
      }
    });
  },

  waitFor: function waitFor(tokens) {
    if (!tokens) {
      throw new ReferenceError("Dispatch tokens not provided");
    }
    tokens = Array.isArray(tokens) ? tokens : [tokens];
    this.dispatcher.waitFor(tokens);
  }
};

var setAppState = function (instance, data, onStore) {
  var obj = JSON.parse(data);
  Object.keys(obj).forEach(function (key) {
    assign(instance.stores[key][STATE_CONTAINER], obj[key]);
    onStore(instance.stores[key]);
  });
};

var snapshot = function (instance) {
  return JSON.stringify(Object.keys(instance.stores).reduce(function (obj, key) {
    if (instance.stores[key][LIFECYCLE].snapshot) {
      instance.stores[key][LIFECYCLE].snapshot();
    }
    obj[key] = instance.stores[key].getState();
    return obj;
  }, {}));
};

var saveInitialSnapshot = function (instance, key) {
  var state = instance.stores[key][STATE_CONTAINER];
  var initial = JSON.parse(instance[INIT_SNAPSHOT]);
  initial[key] = state;
  instance[INIT_SNAPSHOT] = JSON.stringify(initial);
};

var filterSnapshotOfStores = function (snapshot, storeNames) {
  var stores = JSON.parse(snapshot);
  var storesToReset = storeNames.reduce(function (obj, name) {
    if (!stores[name]) {
      throw new ReferenceError("" + name + " is not a valid store");
    }
    obj[name] = stores[name];
    return obj;
  }, {});
  return JSON.stringify(storesToReset);
};

var Alt = (function () {
  function Alt() {
    babelHelpers.classCallCheck(this, Alt);

    this.dispatcher = new Dispatcher();
    this.actions = {};
    this.stores = {};
    this[LAST_SNAPSHOT] = null;
    this[INIT_SNAPSHOT] = "{}";
  }

  babelHelpers.prototypeProperties(Alt, null, {
    dispatch: {
      value: function dispatch(action, data) {
        this.dispatcher.dispatch({ action: action, data: data });
      },
      writable: true,
      configurable: true
    },
    createStore: {
      value: function createStore(StoreModel, iden) {
        var saveStore = arguments[2] === undefined ? true : arguments[2];
        var storeInstance = undefined;
        var key = iden || StoreModel.displayName || StoreModel.name;

        if (saveStore && this.stores[key]) {
          throw new ReferenceError("A store named " + key + " already exists, double check your store names or pass in\nyour own custom identifier for each store");
        }

        // Creating a class here so we don't overload the provided store's
        // prototype with the mixin behaviour and I'm extending from StoreModel
        // so we can inherit any extensions from the provided store.
        var Store = (function (StoreModel) {
          function Store() {
            babelHelpers.classCallCheck(this, Store);

            this[LIFECYCLE] = {};
            this[LISTENERS] = {};
            babelHelpers.get(Object.getPrototypeOf(Store.prototype), "constructor", this).call(this);
          }

          babelHelpers.inherits(Store, StoreModel);

          return Store;
        })(StoreModel);

        assign(Store.prototype, StoreMixin, {
          _storeName: key,
          alt: this,
          dispatcher: this.dispatcher,
          getInstance: function () {
            return storeInstance;
          }
        });

        var store = new Store();

        storeInstance = assign(new AltStore(this.dispatcher, store), getInternalMethods(StoreModel, builtIns));

        if (saveStore) {
          this.stores[key] = storeInstance;
          saveInitialSnapshot(this, key);
        }

        return storeInstance;
      },
      writable: true,
      configurable: true
    },
    generateActions: {
      value: function generateActions() {
        for (var _len = arguments.length, actionNames = Array(_len), _key = 0; _key < _len; _key++) {
          actionNames[_key] = arguments[_key];
        }

        return this.createActions(function () {
          var _ref;
          (_ref = this).generateActions.apply(_ref, actionNames);
        });
      },
      writable: true,
      configurable: true
    },
    createActions: {
      value: function createActions(ActionsClass) {
        var _this6 = this;
        var exportObj = arguments[1] === undefined ? {} : arguments[1];
        var actions = assign({}, getInternalMethods(ActionsClass.prototype, builtInProto));
        var key = ActionsClass.displayName || ActionsClass.name;

        var ActionsGenerator = (function (ActionsClass) {
          function ActionsGenerator() {
            babelHelpers.classCallCheck(this, ActionsGenerator);

            babelHelpers.get(Object.getPrototypeOf(ActionsGenerator.prototype), "constructor", this).call(this);
          }

          babelHelpers.inherits(ActionsGenerator, ActionsClass);

          babelHelpers.prototypeProperties(ActionsGenerator, null, {
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
              },
              writable: true,
              configurable: true
            }
          });

          return ActionsGenerator;
        })(ActionsClass);

        new ActionsGenerator();

        return Object.keys(actions).reduce(function (obj, action) {
          var constant = formatAsConstant(action);
          var actionName = Symbol("" + key + "#" + action);

          // Wrap the action so we can provide a dispatch method
          var newAction = new ActionCreator(_this6, actionName, actions[action], obj);

          // Set all the properties on action
          obj[action] = newAction[ACTION_HANDLER];
          obj[action].defer = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            setTimeout(function () {
              return newAction[ACTION_HANDLER].apply(null, args);
            });
          };
          obj[action][ACTION_KEY] = actionName;
          obj[constant] = actionName;

          return obj;
        }, exportObj);
      },
      writable: true,
      configurable: true
    },
    takeSnapshot: {
      value: function takeSnapshot() {
        var state = snapshot(this);
        this[LAST_SNAPSHOT] = state;
        return state;
      },
      writable: true,
      configurable: true
    },
    rollback: {
      value: function rollback() {
        setAppState(this, this[LAST_SNAPSHOT], function (store) {
          if (store[LIFECYCLE].rollback) {
            store[LIFECYCLE].rollback();
          }
        });
      },
      writable: true,
      configurable: true
    },
    recycle: {
      value: function recycle() {
        for (var _len = arguments.length, storeNames = Array(_len), _key = 0; _key < _len; _key++) {
          storeNames[_key] = arguments[_key];
        }

        var snapshot = storeNames.length ? filterSnapshotOfStores(this[INIT_SNAPSHOT], storeNames) : this[INIT_SNAPSHOT];

        setAppState(this, snapshot, function (store) {
          if (store[LIFECYCLE].init) {
            store[LIFECYCLE].init();
          }
        });
      },
      writable: true,
      configurable: true
    },
    flush: {
      value: function flush() {
        var state = snapshot(this);
        this.recycle();
        return state;
      },
      writable: true,
      configurable: true
    },
    bootstrap: {
      value: function bootstrap(data) {
        setAppState(this, data, function (store) {
          if (store[LIFECYCLE].bootstrap) {
            store[LIFECYCLE].bootstrap();
          }
        });
      },
      writable: true,
      configurable: true
    },
    addActions: {

      // Instance type methods for injecting alt into your application as context

      value: function addActions(name, ActionsClass) {
        this.actions[name] = this.createActions(ActionsClass);
      },
      writable: true,
      configurable: true
    },
    addStore: {
      value: function addStore(name, StoreModel) {
        this.createStore(StoreModel, name);
      },
      writable: true,
      configurable: true
    },
    getActions: {
      value: function getActions(name) {
        return this.actions[name];
      },
      writable: true,
      configurable: true
    },
    getStore: {
      value: function getStore(name) {
        return this.stores[name];
      },
      writable: true,
      configurable: true
    }
  });

  return Alt;
})();

module.exports = Alt;

